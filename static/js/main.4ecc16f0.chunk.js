(this.webpackJsonpsimulacion=this.webpackJsonpsimulacion||[]).push([[0],{67:function(e,a,t){e.exports=t(78)},72:function(e,a,t){},74:function(e,a,t){},78:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(9),s=t.n(l),o=(t(72),t(15)),c=t(10),i=t.n(c),u=t(11),m=t(20),d=t(30),p=t(23),h=t(52),E=t(51),v=(t(74),t(119)),g=t(122),f=t(124),b=t(111),C=t(113),y=t(80),w=t(114),S=t(125),A=t(121),O=t(123),x=t(117),N=t(126),P=function e(){var a=this;Object(d.a)(this,e),this.xpathSync=function(e,t){for(var n,r=[],l=a.treeSync.evaluate(t,e,(function(){return"http://www.dmg.org/PMML-4_4"}),XPathResult.ANY_TYPE,null);n=l.iterateNext();)r.push(n);return r},this.xpath=function(){var e=Object(m.a)(i.a.mark((function e(t,n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.tree;case 2:return e.abrupt("return",a.xpathSync(t,n));case 3:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),this.features=Object(m.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,a.tree;case 3:return e.t1=e.sent,e.next=6,e.t0.xpath.call(e.t0,e.t1,"/pmml:PMML/pmml:DataDictionary/pmml:DataField");case 6:return e.abrupt("return",e.sent.map((function(e){return e.attributes.name.value})));case 7:case"end":return e.stop()}}),e)}))),this.predict=function(){var e=Object(m.a)(i.a.mark((function e(t){var n,r,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,a.tree;case 3:return e.t1=e.sent,n=e.t0.xpathSync.call(e.t0,e.t1,"/pmml:PMML/pmml:MiningModel/pmml:Segmentation/pmml:Segment"),r=function(e){var a=parseFloat(t[e.attributes.field.value]||0),n=parseFloat(e.attributes.value.value);switch(e.attributes.operator.value){case"lessThan":return a<n;case"lessOrEqual":return a<=n;case"greaterThan":return a>n;case"greaterOrEqual":return a>=n;case"equal":return a===n;default:throw new Error("Unsupported operator: "+e.attributes.operator.value)}},l=function e(t){var n=a.xpathSync(t,"pmml:True|pmml:SimplePredicate");if(1!==n.length)throw new Error("Unsupported number of conditions: "+n.length);return"SimplePredicate"!==n[0].nodeName||r(n[0])?a.xpathSync(t,"pmml:Node").map(e).reduce((function(e,a){return e+a}),parseFloat(t.attributes.score?t.attributes.score.value:0)):0},e.next=9,Promise.all(n.map(function(){var e=Object(m.a)(i.a.mark((function e(t){var n,r,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,0)}));case 2:return n=parseFloat(t.attributes.weight.value),r=a.xpathSync(t,"pmml:TreeModel/pmml:Node")[0],s=l(r),e.abrupt("return",n*s);case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()));case 9:return e.abrupt("return",e.sent.reduce((function(e,a){return e+a}),0));case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),this.tree=new Promise((function(e,t){var n=new XMLHttpRequest;n.onload=function(){a.treeSync=n.responseXML,e(n.responseXML)},n.onerror=t,n.open("GET","decision_tree.xml"),n.responseType="document",n.send()}))},j={"Ciudad Aut\xf3noma de Buenos Aires":"AMBA",GBA:"AMBA",Catamarca:"NOA",Chaco:"NEA",Chubut:"Patagonia",Corrientes:"NEA","Entre R\xedos":"NEA",Formosa:"NEA",Jujuy:"NOA","La Pampa":"Pampa","La Rioja":"NOA",Mendoza:"Cuyo",Misiones:"NEA","Neuqu\xe9n":"Patagonia","R\xedo Negro":"Patagonia",Salta:"NOA","San Juan":"Cuyo","San Luis":"Cuyo","Santa Cruz":"Patagonia","Santa Fe":"Pampa","Santiago del Estero":"NOA","Tucum\xe1n":"NOA","C\xf3rdoba":"Pampa","Provincia de Buenos Aires":"Pampa","Tierra del Fuego":"Patagonia"},T=function(e){Object(h.a)(t,e);var a=Object(E.a)(t);function t(){var e;return Object(d.a)(this,t),(e=a.call(this)).state={changedSinceSubmitted:!0,salary:null,answers:{"Me identifico":"",Carrera:"",Universidad:"","Tipo de contrato":"","Orientaci\xf3n sexual":"","\xbfSufriste o presenciaste situaciones de violencia laboral?":"","\xbfTen\xe9s alg\xfan tipo de discapacidad?":"",Tengo:18,"D\xf3nde est\xe1s trabajando":"Ciudad Aut\xf3noma de Buenos Aires","A\xf1os de experiencia":0,"A\xf1os en la empresa actual":0,"Nivel de estudios alcanzado":"",Estado:"","Cantidad de empleados":"","Actividad principal":"","\xbfTen\xe9s guardias?":"","\xbfGente a cargo?":0,"\xbfContribu\xeds a proyectos open source?":"","\xbfProgram\xe1s como hobbie?":"","Trabajo de":"","\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?":"","\xbfY en tu celular?":"","Realizaste cursos de especializaci\xf3n":"",Plataformas:[],"Lenguajes de programaci\xf3n":[],"Frameworks, herramientas y librer\xedas":[],"Bases de datos":[],IDEs:[],"Beneficios extra":[],"\xbfA qu\xe9 eventos de tecnolog\xeda asististe en el \xfaltimo a\xf1o?":[]},options:{degree:[],specialization:[],occupation:[],duty:[],contractType:[],sexualOrientation:[],os:[],events:[],benefits:[],universities:[],tech:{Plataformas:[],"Lenguajes de programaci\xf3n":[],"Bases de datos":[],IDEs:[]}},results:[]},e.handleChange=function(){var a=Object(m.a)(i.a.mark((function a(t){var n,r,l,s;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e.setState({changedSinceSubmitted:!0}),n=t.target.name,r=t.target.value,Array.isArray(e.state.answers[n])?(l=e.state.answers[n].indexOf(r))>=0?((s=e.state.answers[n].concat([])).splice(l,1),e.setState({answers:Object.assign({},e.state.answers,Object(u.a)({},n,s))})):e.setState({answers:Object.assign({},e.state.answers,Object(u.a)({},n,e.state.answers[n].concat([r]).sort()))}):e.setState({answers:Object.assign({},e.state.answers,Object(u.a)({},n,r))}),a.next=6,e.updateSalary();case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.updateSalary=Object(m.a)(i.a.mark((function a(){var t;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.setState({salary:null});case 2:return a.next=4,e.model.predict(Object.fromEntries(Object.entries(e.state.answers).map((function(e){var a=Object(o.a)(e,2),t=a[0],n=a[1];return"D\xf3nde est\xe1s trabajando"===t?["provincia="+j[n],1]:-1===["\xbfGente a cargo?","A\xf1os de experiencia","Tengo"].indexOf(t)?[t+"="+n,1]:[t,n]}))));case 4:return t=a.sent,a.next=7,e.setState({salary:t});case 7:case"end":return a.stop()}}),a)}))),e.enc=function(e){return Array.isArray(e)&&(e=e.join(", ")),encodeURIComponent(e)},e.model=new P,e.formatter=new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",minimumFractionDigits:2}),e}return Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(m.a)(i.a.mark((function e(){var a,t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.model.features();case 2:a=e.sent,t=function(e){return a.filter((function(a){return a.startsWith(e+"=")})).map((function(a){return a.substr(e.length+1)}))},this.setState({options:{degree:t("Carrera").sort().concat(["Otra"]),universities:t("Universidad").sort().concat(["Otra"]),specialization:t("Realizaste cursos de especializaci\xf3n"),occupation:t("Trabajo de").sort().concat(["Otra"]),duty:t("\xbfTen\xe9s guardias?").sort().concat(["Otra"]),contractType:t("Tipo de contrato").sort().concat(["Otro"]),sexualOrientation:t("Orientaci\xf3n sexual").sort().concat(["Otra"]),os:t("\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?").sort().concat(["Otra"]),events:t("\xbfA qu\xe9 eventos de tecnolog\xeda asististe en el \xfaltimo a\xf1o?").sort(),benefits:t("Beneficios extra").sort(),tech:{Plataformas:t("Plataformas").sort(),"Lenguajes de programaci\xf3n":t("Lenguajes de programaci\xf3n").sort(),"Bases de datos":t("Bases de datos").sort(),IDEs:t("IDEs").sort()}}}),this.updateSalary();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,a=this.state.salary,t=this.state.options,n=t.os,l=t.sexualOrientation,s=t.contractType,o=t.duty,c=t.occupation,i=t.specialization,u=t.benefits,m=t.events,d=t.tech,p=t.degree,h=t.universities;return r.a.createElement("div",{className:"App"},a&&r.a.createElement(v.a,{bgcolor:"grey.700",color:"white",p:2,position:"fixed",top:40,right:40,zIndex:"tooltip"},this.formatter.format(a)),r.a.createElement("p",null,"Complet\xe1 el formulario siguiente y obten\xe9 una estimaci\xf3n del sueldo bruto que podr\xedas estar ganando."),r.a.createElement("p",null,"El sueldo se estima de acuerdo a un modelo armado de datos recolectados en la encuesta an\xf3nima."),r.a.createElement("p",null,"Si te interesa saber c\xf3mo est\xe1n armados, pod\xe9s leer el paso a paso ",r.a.createElement("a",{href:"https://github.com/seppo0010/sysarmy-sueldos-2020.1/blob/master/text/prediccion-de-sueldo/README.md",target:"_blank",rel:"noopener noreferrer"},"aqu\xed"),"."),r.a.createElement("p",null,"Los modelos se armaron con datos recolectados en la ",r.a.createElement("a",{href:"https://sysarmy.com/blog/posts/resultados-de-la-encuesta-de-sueldos-2020-1/",target:"_blank",rel:"noopener noreferrer"},"encuesta de sysarmy")," llevada entre diciembre de 2019 y febrero de 2020."),r.a.createElement("hr",null),r.a.createElement("div",null,r.a.createElement(b.a,{component:"fieldset",required:!0,className:"form-element"},r.a.createElement(y.a,{component:"legend"},"Me identifico"),r.a.createElement(O.a,{"aria-label":"Me identifico",name:"Me identifico",value:this.state.answers["Me identifico"],onChange:this.handleChange},r.a.createElement(f.a,{value:"Hombre",control:r.a.createElement(A.a,null),label:"Hombre"}),r.a.createElement(f.a,{value:"Mujer",control:r.a.createElement(A.a,null),label:"Mujer"}),r.a.createElement(f.a,{value:"Otros",control:r.a.createElement(A.a,null),label:"Otros"})))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Tengo"},"Tengo"),r.a.createElement(x.a,{value:this.state.answers.Tengo,onChange:this.handleChange,inputProps:{name:"Tengo",id:"Tengo"}},r.a.createElement(S.a,{value:"1"},"1 a\xf1o"),Array.from(Array(100).keys()).slice(2).map((function(e){return r.a.createElement(S.a,{value:e,key:e},e," a\xf1os")}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"D\xf3nde est\xe1s trabajando"},"D\xf3nde est\xe1s trabajando"),r.a.createElement(x.a,{value:this.state.answers["D\xf3nde est\xe1s trabajando"],onChange:this.handleChange,inputProps:{name:"D\xf3nde est\xe1s trabajando",id:"D\xf3nde est\xe1s trabajando"}},r.a.createElement(S.a,{value:"Catamarca"},"Catamarca"),r.a.createElement(S.a,{value:"Chaco"},"Chaco"),r.a.createElement(S.a,{value:"Chubut"},"Chubut"),r.a.createElement(S.a,{value:"Ciudad Aut\xf3noma de Buenos Aires"},"Ciudad Aut\xf3noma de Buenos Aires"),r.a.createElement(S.a,{value:"Corrientes"},"Corrientes"),r.a.createElement(S.a,{value:"C\xf3rdoba"},"C\xf3rdoba"),r.a.createElement(S.a,{value:"Entre R\xedos"},"Entre R\xedos"),r.a.createElement(S.a,{value:"Formosa"},"Formosa"),r.a.createElement(S.a,{value:"GBA"},"GBA"),r.a.createElement(S.a,{value:"Jujuy"},"Jujuy"),r.a.createElement(S.a,{value:"La Pampa"},"La Pampa"),r.a.createElement(S.a,{value:"La Rioja"},"La Rioja"),r.a.createElement(S.a,{value:"Mendoza"},"Mendoza"),r.a.createElement(S.a,{value:"Misiones"},"Misiones"),r.a.createElement(S.a,{value:"Neuqu\xe9n"},"Neuqu\xe9n"),r.a.createElement(S.a,{value:"Provincia de Buenos Aires"},"Provincia de Buenos Aires"),r.a.createElement(S.a,{value:"R\xedo Negro"},"R\xedo Negro"),r.a.createElement(S.a,{value:"Salta"},"Salta"),r.a.createElement(S.a,{value:"San Juan"},"San Juan"),r.a.createElement(S.a,{value:"San Luis"},"San Luis"),r.a.createElement(S.a,{value:"Santa Cruz"},"Santa Cruz"),r.a.createElement(S.a,{value:"Santa Fe"},"Santa Fe"),r.a.createElement(S.a,{value:"Santiago del Estero"},"Santiago del Estero"),r.a.createElement(S.a,{value:"Tierra del Fuego"},"Tierra del Fuego"),r.a.createElement(S.a,{value:"Tucum\xe1n"},"Tucum\xe1n")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"A\xf1os de experiencia"},"A\xf1os de experiencia"),r.a.createElement(x.a,{value:this.state.answers["A\xf1os de experiencia"],onChange:this.handleChange,inputProps:{name:"A\xf1os de experiencia",id:"A\xf1os de experiencia"}},r.a.createElement(S.a,{value:0},"Menos de un a\xf1o"),Array.from(Array(100).keys()).slice(1).map((function(e){return r.a.createElement(S.a,{value:e,key:e},e," a\xf1os")}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"A\xf1os en la empresa actual"},"A\xf1os en la empresa actual"),r.a.createElement(x.a,{value:this.state.answers["A\xf1os en la empresa actual"],onChange:this.handleChange,inputProps:{name:"A\xf1os en la empresa actual",id:"A\xf1os en la empresa actual"}},r.a.createElement(S.a,{value:0},"Menos de un a\xf1o"),Array.from(Array(100).keys()).slice(1).map((function(e){return r.a.createElement(S.a,{value:e,key:e},e," a\xf1os")}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Nivel de estudios alcanzado"},"Nivel de estudios alcanzado"),r.a.createElement(x.a,{value:this.state.answers["Nivel de estudios alcanzado"],onChange:this.handleChange,inputProps:{name:"Nivel de estudios alcanzado",id:"Nivel de estudios alcanzado"}},r.a.createElement(S.a,{value:"Primario"},"Primario"),r.a.createElement(S.a,{value:"Secundario"},"Secundario"),r.a.createElement(S.a,{value:"Terciario"},"Terciario"),r.a.createElement(S.a,{value:"Universitario"},"Universitario"),r.a.createElement(S.a,{value:"Posgrado"},"Posgrado"),r.a.createElement(S.a,{value:"Doctorado"},"Doctorado")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Estado"},"Estado"),r.a.createElement(x.a,{value:this.state.answers.Estado,onChange:this.handleChange,inputProps:{name:"Estado",id:"Estado"}},r.a.createElement(S.a,{value:"En curso"},"En curso"),r.a.createElement(S.a,{value:"Incompleto"},"Incompleto"),r.a.createElement(S.a,{value:"Completado"},"Completado")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Carrera"},"Carrera"),r.a.createElement(x.a,{"aria-label":"Carrera",name:"Carrera",value:this.state.answers.Carrera,onChange:this.handleChange},p.map((function(e){return r.a.createElement(S.a,{key:"degree-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Universidad"},"Universidad"),r.a.createElement(x.a,{"aria-label":"Universidad",name:"Universidad",value:this.state.answers.Universidad,onChange:this.handleChange},h.map((function(e){return r.a.createElement(S.a,{key:"university-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Realizaste cursos de especializaci\xf3n"},"Realizaste cursos de especializaci\xf3n"),r.a.createElement(x.a,{"aria-label":"Realizaste cursos de especializaci\xf3n",name:"Realizaste cursos de especializaci\xf3n",value:this.state.answers["Realizaste cursos de especializaci\xf3n"],onChange:this.handleChange},i.map((function(e){return r.a.createElement(S.a,{key:"specialization-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Cantidad de empleados"},"Cantidad de empleados en tu trabajo actual"),r.a.createElement(x.a,{value:this.state.answers["Cantidad de empleados"],onChange:this.handleChange,inputProps:{name:"Cantidad de empleados",id:"Cantidad de empleados"}},r.a.createElement(S.a,{value:"1-10"},"1-10"),r.a.createElement(S.a,{value:"11-50"},"11-50"),r.a.createElement(S.a,{value:"51-100"},"51-100"),r.a.createElement(S.a,{value:"101-200"},"101-200"),r.a.createElement(S.a,{value:"201-500"},"201-500"),r.a.createElement(S.a,{value:"501-1000"},"501-1000"),r.a.createElement(S.a,{value:"1001-2000"},"1001-2000"),r.a.createElement(S.a,{value:"2001-5000"},"2001-5000"),r.a.createElement(S.a,{value:"5001-10000"},"5001-10000"),r.a.createElement(S.a,{value:"10001+"},"10001+")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Actividad principal"},"Actividad principal"),r.a.createElement(x.a,{value:this.state.answers["Actividad principal"],onChange:this.handleChange,inputProps:{name:"Actividad principal",id:"Actividad principal"}},r.a.createElement(S.a,{value:"Servicios / Consultor\xeda de Software / Digital"},"Servicios / Consultor\xeda de Software / Digital"),r.a.createElement(S.a,{value:"Producto basado en Software"},"Producto basado en Software"),r.a.createElement(S.a,{value:"Otras industrias"},"Otras industrias")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(N.a,{id:"\xbfGente a cargo?",name:"\xbfGente a cargo?",label:"\xbfCu\xe1nta gente a cargo? (si no ten\xe9s, pon\xe9 0)",value:this.state.answers["\xbfGente a cargo?"],onChange:this.handleChange,type:"number",InputLabelProps:{shrink:!0},inputProps:{min:0},margin:"normal"}))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"\xbfContribu\xeds a proyectos open source?"},"\xbfContribu\xeds a proyectos open source?"),r.a.createElement(x.a,{"aria-label":"\xbfContribu\xeds a proyectos open source?",name:"\xbfContribu\xeds a proyectos open source?",value:this.state.answers["\xbfContribu\xeds a proyectos open source?"],onChange:this.handleChange},r.a.createElement(S.a,{value:"S\xed"},"S\xed"),r.a.createElement(S.a,{value:"No"},"No")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"\xbfProgram\xe1s como hobbie?"},"\xbfProgram\xe1s como hobbie?"),r.a.createElement(x.a,{"aria-label":"\xbfProgram\xe1s como hobbie?",name:"\xbfProgram\xe1s como hobbie?",value:this.state.answers["\xbfProgram\xe1s como hobbie?"],onChange:this.handleChange},r.a.createElement(S.a,{value:"S\xed"},"S\xed"),r.a.createElement(S.a,{value:"No"},"No")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"\xbfTen\xe9s guardias?"},"\xbfTen\xe9s guardias?"),r.a.createElement(x.a,{"aria-label":"\xbfTen\xe9s guardias?",name:"\xbfTen\xe9s guardias?",value:this.state.answers["\xbfTen\xe9s guardias?"],onChange:this.handleChange},o.map((function(e){return r.a.createElement(S.a,{key:"duty-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Trabajo de"},"Trabajo de"),r.a.createElement(x.a,{value:this.state.answers["Trabajo de"],onChange:this.handleChange,inputProps:{name:"Trabajo de",id:"Trabajo de"}},c.map((function(e){return r.a.createElement(S.a,{key:"occupation-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?"},"\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?"),r.a.createElement(x.a,{"aria-label":"\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?",name:"\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?",value:this.state.answers["\xbfQu\xe9 SO us\xe1s en tu laptop/PC para trabajar?"],onChange:this.handleChange},n.map((function(e){return r.a.createElement(S.a,{key:"os-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"\xbfY en tu celular?"},"\xbfY en tu celular?"),r.a.createElement(x.a,{"aria-label":"\xbfY en tu celular?",name:"\xbfY en tu celular?",value:this.state.answers["\xbfY en tu celular?"],onChange:this.handleChange},r.a.createElement(S.a,{value:"Android"},"Android"),r.a.createElement(S.a,{value:"iOS"},"iOS"),r.a.createElement(S.a,{value:"Windows"},"Windows"),r.a.createElement(S.a,{value:"No tengo celular / no es Smartphone"},"No tengo celular / no es Smartphone")))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Tipo de contrato"},"Tipo de contrato"),r.a.createElement(x.a,{"aria-label":"Tipo de contrato",name:"Tipo de contrato",value:this.state.answers["Tipo de contrato"],onChange:this.handleChange},s.map((function(e){return r.a.createElement(S.a,{key:"contractType-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(w.a,{htmlFor:"Orientaci\xf3n sexual"},"Orientaci\xf3n sexual"),r.a.createElement(x.a,{"aria-label":"Orientaci\xf3n sexual",name:"Orientaci\xf3n sexual",value:this.state.answers["Orientaci\xf3n sexual"],onChange:this.handleChange},l.map((function(e){return r.a.createElement(S.a,{key:"sexualOrientation-".concat(e),value:e},e)}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(y.a,{component:"legend"},"\xbfA qu\xe9 eventos de tecnolog\xeda asististe en el \xfaltimo a\xf1o?"),r.a.createElement(C.a,{style:{flexDirection:"column"}},m.map((function(a){return r.a.createElement(f.a,{key:"events-".concat(a),control:r.a.createElement(g.a,{checked:e.state.answers["\xbfA qu\xe9 eventos de tecnolog\xeda asististe en el \xfaltimo a\xf1o?"].indexOf(a)>=0,onChange:e.handleChange,name:"\xbfA qu\xe9 eventos de tecnolog\xeda asististe en el \xfaltimo a\xf1o?",value:a}),label:a})}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(y.a,{component:"legend"},"Tecnolog\xedas que utiliz\xe1s"),r.a.createElement(C.a,{style:{height:"820px",flexDirection:"column"}},Object.keys(d).map((function(a){return d[a].map((function(t){return r.a.createElement(f.a,{key:"technology-".concat(a,"-").concat(t),control:r.a.createElement(g.a,{checked:e.state.answers[a].indexOf(t)>=0,onChange:e.handleChange,name:a,value:t}),label:t})}))}))))),r.a.createElement("div",null,r.a.createElement(b.a,{className:"form-element"},r.a.createElement(y.a,{component:"legend"},"Beneficios extra"),r.a.createElement(C.a,{style:{height:"620px",flexDirection:"column"}},u.map((function(a){return r.a.createElement(f.a,{key:"benefits-".concat(a),control:r.a.createElement(g.a,{checked:e.state.answers["Beneficios extra"].indexOf(a)>=0,onChange:e.handleChange,name:"Beneficios extra",value:a}),label:a})}))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[67,1,2]]]);
//# sourceMappingURL=main.4ecc16f0.chunk.js.map