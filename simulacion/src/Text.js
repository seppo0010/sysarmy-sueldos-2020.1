import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom'
import './main.css';


export default function Text() {
    const { subarticle } = useParams();
    const [ text, setText ] = useState('')
    useEffect(() => { (async () => {
        const r = await fetch(`${subarticle?subarticle:'README'}.md`);
        const t = await r.text()
        setText(t)
    })() })
    return <div className="main">
        {subarticle && <Link to={'index.html'}>Volver</Link>}
        <ReactMarkdown source={text} />
    </div>
}
