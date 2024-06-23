((
 D=document,
 O=Object,
 J=JSON.parse,
 NS='http://www.w3.org/2000/svg',
 M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 defs = O.assign(
    {
        selector: 'nutz',
        hole: 0.5,
        init: 0
    },
    J(O.values(D.currentScript.dataset)[0]||'{}')
 ),
 sel = defs.selector
)=>D.querySelectorAll(`svg[data-${sel}]`).forEach(nut=>{
    
    let opts = O.assign({},
        defs, J(nut.dataset[sel+'Opts']||'{}')
    ),
    
    [c1,s1,c2,s2] = [0,0,...M(opts.init)];
    
    nut.setAttribute('viewBox','-20 -20 40 40');
    g = nut.appendChild(D.createElementNS(NS,'g'));
    g.classList.add(sel+'-group');
    
    J(nut.dataset[sel]||'[]').forEach((
        arc, i, _, __ =
        [c1,s1,c2,s2] = [
            c2,s2,...M(opts.init+=arc[0])
        ],
        big = arc[0] > 50 ? 1 : 0,
        x = opts.hole * 20,
        p = nut.appendChild(D.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        ))
    ) => [
        ['fill', arc[1]],
        [
         'data-'+sel+'-center',
         M(opts.init-(arc[0]/2)).map(v=>v*(20+x)/2)
        ],
        ['class',sel+'-path'],
        ['d',
`
M${20*c1} ${20*s1}
A20 20 0 ${big} 1 ${20*c2} ${20*s2}
L ${x*c2} ${x*s2}
A ${x} ${x} 0 ${big} 0 ${x*c1} ${x*s1} Z
`
    ]].forEach(a => p.setAttribute(...a)));
    
}))();