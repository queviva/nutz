((
 // vars and methods {
 D = document,
 O = Object,
 J = JSON.parse,
 A = O.assign,
 M = v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS = (a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 P = A({
    selector: 'nutz',
    radius: 100,
    hole: 55
 },
 J(`{${D.currentScript.innerHTML}}`)),
 R = P.selector
 
 // DEBUGG
 ,log = console.log,
 
 //}
) => D.querySelectorAll('svg[data-'+R+']').forEach((
    // vars for each nut {
    nut, k, _,
    G = -25,
    opts = A({},P,J(`{${nut.innerHTML}}`)),
    [w,x,y,z] = [0,0,...M(G)],
    d=NS(nut,'defs')
    //}
) => {
    
    nut.setAttribute('viewBox','-100 -100 200 200');
      
    // create images ??? {
    opts.images?.forEach(mig => {
        d.innerHTML += `
        <pattern id=${mig[0]} width=1 height=1>
        <image href="${mig[1]}"
         transform="scale(${mig[2]||1})"
        /></pattern>`;
    });
    //}
            
    // create patterns ??? {
    opts.patterns?.forEach((
        p,i,_,[id, typ, col, scl=1.3, bak] = p
    ) => {
        
        if (CSS.supports('color',scl)) [bak,scl] = [scl,1.3];
        
        d.innerHTML += `
        <pattern id=${id} width=2 height=2
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(45) scale(${scl})"
        >`
        + (bak?H("M0 0H2V2H0Z",bak):'')+H({
            dots: 'M0 1A.5 .5 0 1 1 0 1.1Z',
            hatch: 'M0 0 V2H1V0Z',
            cross: 'M0 0V2H2V1.75H.25V0Z',
            check: 'M0 0H1V2H2V1H0Z',
            zigzag: 'M 0 1H.5V0H2V.5H1V1.5H0ZM2 1V2H1.5V1Z',
            xwave:`M1 0Q1.5 .5 2 0V1Q1.5 1.5 1 1 .5 .5 0 1V0ZM0 2Q.5 1.5 1 2Z`,
            wave: `M0 1C .8 .8 .2 .2 1 0H2C 1.8 .8 1.2 .2 1 1S.2 1.2 0 2ZM1 2C1.8 1.8 1.2 1.2 2 1V2Z`
            
        }[typ],col)+'</pattern>';
    
    });
    //}

    // create arcs {
    opts.arcs?.forEach((
        arc,i,_,X=
        [w,x,y,z] = [y,z,...M(G+=arc[0])],
        f = arc[0] > 50 ? 1 : 0,
        Z = (a,b, D = [0, 0, 0, 0],
            [r1,r2] = [a-D[0], b+D[3]]
        ) => `M${r2*w-D[1]*x} ${r2*x+D[1]*w} A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y} L${r1*y+D[2]*z} ${r1*z-D[2]*y} A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w} Z`,
        vals = A({}, opts, arc[2]),
        p = arc[1]?NS(nut,'path'):0
    ) => !p||[
        ...O.entries(A({
            fill: arc[1],
            d: Z(vals.radius, vals.hole, vals.gaps),
            ['data-'+R]: JSON.stringify(A({
                perc: arc[0],
                start: G-arc[0]
            }, arc[2]))
        }, arc[2])),
        ...vals.sizes?.map(v =>
          [v[0],`"${Z(v[1],v[2],v[3])}"`]
        )||[]
        ].forEach(a =>
            /--/.test(a[0]) ?
            p.style.setProperty(...a) :
            /radius|hole/.test(a[0]) ?
            '' : p.setAttribute(...a)
        )
        
    );
    //}

}))();