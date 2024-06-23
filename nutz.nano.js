((

 D = document,
 O = Object,
 J = JSON.parse,
 A = O.assign,
 M = v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS = (a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 P = A({
    selector: 'nutz',
    hole: 0.5
 },J(O.values(D.currentScript.dataset)[0]||'{}')),
 R = P.selector
 
 // DEBUGG
 ,log = console.log
    

) => D.querySelectorAll('svg[data-'+R+']').forEach((
    
    nut, k, _,
    ang = -25,
    opts = A({},P,J(nut.dataset[R+'Opts']||'{}')),
    [c1,s1,c2,s2] = [0,0,...M(ang)],
    g = NS(nut, 'g'),
    d = NS(nut,'defs')
    
) => {
    
    // create patterns ??? {
    opts.patterns?.forEach((p,i) => ((
            typ, col, id, scl=0.3, bak
    ) => {
    
        if (CSS.supports('color',scl)) {
            [bak, scl] = [scl, 0.3];
        }
        
        d.innerHTML += `
        <pattern id=${id} width=2 height=2
         patternTransform="rotate(45) scale(${scl})"
         patternUnits="userSpaceOnUse">`;
        
        d.children[i].innerHTML += (bak?
        H("M0 0H2V2H0Z",bak):'')+{
            dots: H('M0 1A.5 .5 0 1 1 0 1.1Z', col),
            hatch: H('M0 0 V2H1V0Z', col),
            cross: H('M0 0V2H2V1.75H.25V0Z', col),
            check: H('M0 0H1V2H2V1H0Z', col),
            wave: H(`M 0 1H.5V0H2V.5H1V1.5H0ZM2 1V2H1.5V1Z`, col),
        }[typ]+'</pattern>';
    
    })(...p));
       
    //}
    
    nut.setAttribute('viewBox','-20 -20 40 40');
    
    J(nut.dataset[R]||'[]').forEach((
        
        arc, i, _, __ =
        [c1,s1,c2,s2] = [c2,s2,...M(ang+=arc[0])],
        big = arc[0] > 50 ? 1 : 0,
        vals = A({},{
            id: R+k+'arc'+i,
            hole: opts.hole
        }, opts, arc[2]),
        x = vals.hole * 20,
        p = arc[1] ? NS(g,'path') : 0,
        
        Z = (r1,r2) => `M${r1*c1} ${r1*s1}A${r1} ${r1} 0 ${big} 1 ${r1*c2} ${r1*s2}L${r2*c2} ${r2*s2}A${r2} ${r2} 0 ${big} 0 ${r2*c1} ${r2*s1}Z`
        
    ) => !p||[
        ['id', vals.id],
        ['fill', arc[1]],
        ['class', R + '-path'],
        ['d', Z(20,x)],
     ...vals.sizes?.map(v =>
        [v[2],'"'+Z(...v)+'"'])||[]
    ].forEach((a, j) =>
        j < 4 ? p.setAttribute(...a) :
        p.style.setProperty(...a)
    ));
    
}))();