import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'
import './main.css';


export default function Text() {
    const { article, subarticle } = useParams();
    const [ text, setText ] = useState('')
    useEffect(() => { (async () => {
        const r = await fetch(`${subarticle?subarticle:'README'}.md`);
        const t = await r.text()
        setText(t)
    })() })
    return <div className="main">
        {subarticle && <a href={'index.html'}>Volver</a>}
        <ReactMarkdown source={text} />
    </div>
}
