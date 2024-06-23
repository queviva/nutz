((
    
 // nutz script vars & methods {
 D = document,
 O = Object,
 J = JSON.parse,
 A = O.assign,
 E = (a,v,p) => a.appendChild(A(
    D.createElement(v),p
 )),
 M = v => ['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS = (a,v) => a.insertBefore(D.createElementNS('http://www.w3.org/2000/svg',v),a.children[0]),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 P = A({
    selector: 'nutz',
    hole: 0.5
 },J(O.values(D.currentScript.dataset)[0]||'{}')),
 R = P.selector
 
 //DEBUGG
 ,log=console.log
 
 //}

) => D.querySelectorAll(`svg[data-${R}]`).forEach((
    
    // nut vars {
    nut, k, _, g,
    ang = -25,
    opts = A({},P,J(nut.dataset[R+'Opts']||'{}')),
    [c1,s1,c2,s2] = [0,0,...M(ang)],
    capsDiv = E(nut.parentElement,'div',{
        id : R+'capsdiv'+k
    })
    //}
    
) => {
    
    // create patterns {
    if (opts.patterns?.length) {
    
        let defs = NS(nut,'defs');
    
        opts.patterns.forEach(p => ((
            typ, col, id, scl=0.3, bak
        ) => {
            
            if (CSS.supports('color', scl)) {
                [bak, scl] = [scl, 0.3];
            }
        
            let n = NS(defs,'pattern');
            [
                ['id', id],
                ['width', 2],
                ['height', 2],
                ['patternTransform', `rotate(45) scale(${scl})`],
                ['patternUnits', 'userSpaceOnUse']
            ].forEach(a => n.setAttribute(...a));
            
            n.innerHTML =
            (bak?H("M0 0H4V4H0Z",bak):'') +
            {
                //dots: `<circle r="0.5" cx="1" cy="1" fill="${col}">`,
                dots: H('M0 1A.5 .5 0 1 1 0 1.1Z',col),
                hatch: H('M0 0 V2H1V0Z',col),
                check: H('M0 0V2H2V1.75H.25V0Z',col),
            }[typ];
        
        })(...p));
    }
    //}
    
    // setup group for arcs {
    nut.setAttribute('viewBox','-20 -20 40 40');
    (g = NS(nut,'g')).classList.add(R+'-group');
    //}
    
    J(nut.dataset[R]||'[]').forEach((
        
        // arc vars {
        arc, i, _, __ =
        [c1,s1,c2,s2] = [c2,s2,...M(ang+=arc[0])],
        big = arc[0] > 50 ? 1 : 0,
        vals = A({},{
            id: 'nutz'+k+'arc'+i,
            hole: opts.hole
        }, arc[2]),
        x = vals.hole * 20,
        p = arc[1] ? NS(g,'path') : 0
        //}
        
    ) => {if(p){
        
        // lizzer and shorthand {
        let L = (e,h) => p.addEventListener(e,h);
        L('mouseover', () => { g.append(p) });
        
        let Z = (r1,r2) => `M${r1*c1} ${r1*s1} A${r1} ${r1}  0 ${big} 1 ${r1*c2} ${r1*s2} L ${r2*c2} ${r2*s2} A ${r2} ${r2} 0 ${big} 0 ${r2*c1} ${r2*s1}Z`;
        
        //}
        
        // setup arc paths {
        [
            ['id', vals.id],
            ['fill', arc[1]],
            ['d', Z(20,x)],
            ['class', R + '-path'],
            ['data-vals', JSON.stringify(A(vals, {
                center: M(ang - (arc[0] / 2))
                    .map(v => v * (20 + x) / 2)
            }))],
            ['--norm-arc', Z(20,x)],
            ['--zero-arc', Z( 2,0)],
            ['--big-arc',  Z(22,x)],
            ['--full-arc', Z(20,0)]
        ].forEach((a,j) =>
            j<5 ?
            p.setAttribute(...a):
            p.style.setProperty(a[0],'"'+a[1]+'"')
        );
        
        //}
        
        // create necessary captions {
        if (vals.cap) {
            
            let cap = E(capsDiv, 'div', {
                id: vals.id+'cap',
                className: R+'-cap',
                innerHTML: vals.cap
            });
            
            ['mouseover', 'mouseout'].forEach(e =>
                L(e,()=>cap.classList.toggle(R+'-cap-over')
            ));
            
            // random picker for multi-caps
            if(vals.cap.match(/\|/)) {
                
                let slurs = vals.cap.split('|');
            
                L('mouseover', e => {
                    cap.innerHTML = (
                    slurs = [
                      slurs.splice(
                        1+~~(Math.random()*(slurs.length-1)),1
                      ),
                      ...slurs
                    ])[0];
            
                });
            }
        }
        //}

    }});
    
    
}))();