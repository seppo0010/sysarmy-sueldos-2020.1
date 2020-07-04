export default class Model {
    constructor() {
        this.tree = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                this.treeSync = xhr.responseXML;
                resolve(xhr.responseXML)
            };
            xhr.onerror = reject;
            xhr.open("GET", "decision_tree.xml");
            xhr.responseType = "document";
            xhr.send();
        })
    }

    xpathSync = (node, path) => {
        const ns = () => 'http://www.dmg.org/PMML-4_4';
        const ret = [];
        let els = this.treeSync.evaluate(path, node, ns, XPathResult.ANY_TYPE, null);
        let el;
        while ((el = els.iterateNext())) {
            ret.push(el)
        }
        return ret;
    }

    xpath = async (node, path) => {
        await this.tree
        return this.xpathSync(node, path)
    }

    features = async () => {
        return (await this.xpath(await this.tree, '/pmml:PMML/pmml:DataDictionary/pmml:DataField')).map((node) => node.attributes.name.value)
    }

    predict = async (row) => {
        const segments = this.xpathSync(await this.tree, '/pmml:PMML/pmml:MiningModel/pmml:Segmentation/pmml:Segment');
        const runSimplePredicate = (predicate) => {
            const fv = parseFloat(row[predicate.attributes.field.value] || 0.0);
            const cv = parseFloat(predicate.attributes.value.value);
            switch (predicate.attributes.operator.value) {
                case 'lessThan': return fv < cv;
                case 'lessOrEqual': return fv <= cv;
                case 'greaterThan': return fv > cv;
                case 'greaterOrEqual': return fv >= cv;
                case 'equal': return fv === cv;
                default: throw new Error('Unsupported operator: ' + predicate.attributes.operator.value);
            }
        }
        const findScore = (node) => {
            const condition = this.xpathSync(node, 'pmml:True|pmml:SimplePredicate')
            if (condition.length !== 1) {
                throw new Error('Unsupported number of conditions: ' + condition.length)
            }
            if (condition[0].nodeName === 'SimplePredicate' && !runSimplePredicate(condition[0])) {
                return 0.0;
            }
            const children = this.xpathSync(node, 'pmml:Node');
            return children.map(findScore).reduce((acc, v) => acc + v, parseFloat(node.attributes.score ? node.attributes.score.value : 0.0))
        };
        return (await Promise.all(segments.map(async (segment) => {
            await new Promise((resolve) => setTimeout(resolve, 0))
            const weight = parseFloat(segment.attributes.weight.value)
            const root = this.xpathSync(segment, 'pmml:TreeModel/pmml:Node')[0]
            const score = findScore(root);
            return weight * score;
        }))).reduce((acc, v) => acc + v, 0.0)
    }
}
