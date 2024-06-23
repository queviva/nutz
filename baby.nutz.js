((
 // all vars & methods {
 D = document,
 O = Object,
 J = JSON.parse,
 A = O.assign,
 E =(a,v,p)=>a.appendChild(A(D.createElement(v),p)),
 M = v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS = v => D.createElementNS('http://www.w3.org/2000/svg',v),
 NZ = (a,v) => a.appendChild(NS(v)),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 L = (a,b) => a.addEventListener('mouseover',_=>b.append(a)),
 P = A({
    selector: 'nutz-area',
    hole: 0.55,
    radius: 100
 },J(O.values(D.currentScript.dataset)[0]||'{}')),
 R = P.selector,
    
 calcArc = (rad2, rad1, startAng, endAng, hax) => {
 
    const [cos1, sin1, cos2, sin2] = [...M(startAng), ...M(endAng)];
    let flag = (endAng - startAng) > 50 ? 1 : 0;
    let pieflag = hax?.pieflag ?
    `1 ${-1*flag+1} 0`:
    `0 ${flag} 1`;
    return `M${rad1*cos1} ${rad1*sin1}A${rad1} ${rad1} ${pieflag} ${rad1*cos2} ${rad1*sin2}L${rad2*cos2} ${rad2*sin2}A${rad2} ${rad2} 0 ${flag} 0 ${rad2*cos1} ${rad2*sin1}Z`;
 },
 
 createArc = (arc, vs, r1, r2, a1, a2) => {
     
     p = NS('path');
     
     [
         ['id', vs.id],
         ['fill', arc[1]],
         ['class', vs.cls],
         ['d', calcArc(r1, r2, a1, a2, vs)]
     ].forEach(a => p.setAttribute(...a));
     
     return p;
 
 }
 
 // DEBUGG
 ,log = console.log
    
 //}

) => D.querySelectorAll(R).forEach((
    // individual nutz vars {
    nut, k, _,
    ang = -25,
    aniRate = (50/5),
    data = A({},P,J('{'+nut.innerHTML+'}'))
    //}
) => {
    
    // blank out then display the div {
    nut.innerHTML = '';
    nut.id = data.id||R+k
    nut.style.display = 'block';
    nut.style.setProperty(`--${nut.id}-col`,
    'var(--nose-h)'
    );
    //}

    // create the nutz holder {
    const nutHolder = E(nut,'div',{
        className: 'nutz-holder'
    });
    nutHolder.style.height =
    nutHolder.style.width = 2*data.radius +'px';
    //}
    
    // make the svg tag {
    const svg = NZ(nutHolder,'svg');
    svg.setAttribute('data-nutz','');
    [
        ['id', R+'svg'+k],
        ['data-nose', '#'+nut.id],
        ['viewBox','-20 -20 40 40']
    ].forEach(a => svg.setAttribute(...a));
    //}
    
    // create any patterns {
    let defTag = NZ(svg,'defs');
    data.patterns?.forEach((p,i) => ((
            typ, col, id, scl=0.3, bak
    ) => {
    
        // reverse values
        if (CSS.supports('color',scl)) {
            [bak, scl] = [scl, 0.3];
        }
        
        // make the def tag
        defTag.innerHTML += `
        <pattern id=${id} width=2 height=2
         patternTransform="rotate(45) scale(${scl})"
         patternUnits="userSpaceOnUse">`;
         
        defTag.children[i].innerHTML += (bak?
        H("M0 0H2V2H0Z",bak):'')+{
            dots: H('M0 1A.5 .5 0 1 1 0 1.1Z', col),
            hatch: H('M0 0 V2H1V0Z', col),
            cross: H('M0 0V2H2V1.75H.25V0Z', col),
            check: H('M0 0H1V2H2V1H0Z', col),
            wave: H(`M 0 1H.5V0H2V.5H1V1.5H0ZM2 1V2H1.5V1Z`, col),
        }[typ]+'</pattern>';
    
    })(...p));
       
    //}

    // loop through arcs {
    
    data.arcs?.forEach((
        // arc vars {
        arc, i, _, __ =
        ang += arc[0],
        vals = A({},data,{
            id: R+k+'arc'+i,
            cls: 'nutz-path'
        }, arc[2])
        //}
    ) => { if (arc[1]){
    
        // create arc {
        const g = NZ(svg, 'g');
        
        const dik = g.appendChild(createArc(
            arc, vals,
            20, 20 * vals.hole,
            ang - arc[0], ang
        ));
        //}
        
        // animation for arc {
        const arcAni = new function() {
            
            let startTime, fromArc = ang-arc[0],
            dur = aniRate*arc[0], per = 0;
            
            this.ani = () => {
                
                per = (Date.now()-startTime)/dur;
                per = per >= 1 ? 1 : per;
                
                dik.style.setProperty('d',
                    'path("'+calcArc(
                            20, 20 * vals.hole,
                            fromArc,
                            fromArc + per*arc[0]
                    )+'")'
                );
                
                if(per<1) setTimeout(this.ani,0);
                
            }
            this.start = () => {
                startTime = Date.now();
                this.ani();
            }
        }();
        
        dik.shit = arcAni;
       
        //}
        
        
        // if there are sub valuses {
        if (vals.subvals) {
            
            // ground stuff {
            g.classList.add('subby');
            g.prepend(createArc(
                [0,'hsla(0,0%,0%,0)'],
                {
                    id:'ground'+i,
                    cls:'ground',
                    pieflag:'1'
                },
                26, vals.hole*20,
                ang-arc[0], ang
            ));
            //}
            
            let subang = ang - arc[0];
            let pieang = -25;
            
            vals.subvals.forEach((
                // subarc vars {
                subarc, j, _,
                frac = (subarc[0]/100)*arc[0],
                __  = subang += frac,
                ___ = pieang += subarc[0],
                suvals = A({},data,{
                    id:R+k+'arc'+i+'sub'+j,
                    cls: 'nutz-sub-path'
                }, subarc[2])
                //}
            ) => { if (subarc[1]) {
                
                // create subarc {
                sp = createArc(
                    subarc, suvals,
                    20, 20,
                    subang - frac,
                    subang
                    //0.85*20*vals.hole,0,
                    //22, 50,
                    //pieang-subarc[0],
                    //pieang
                );
                //}
                
                // subarc styles {
                [
                    ['--flat-arc','"'+
                    calcArc(
                        20, 20,
                        subang - frac,
                        subang
                    )+'"'],
                    ['--full-arc','"'+
                    calcArc(
                        27, 21,
                        subang - frac,
                        subang
                    )+'"'],
                    ['--pie-arc','"'+
                    calcArc(
                        0.85*vals.hole*20,
                        0.20*vals.hole*20,
                        pieang - subarc[0],
                        pieang
                    )+'"'],
                    ['transition-property','transform, d'],
                    ['transition-duration','300ms, 500ms'],
                    ['transition-delay','0ms, '+
                    (100+50*j) +'ms']
                ].forEach(a=>
                    sp.style.setProperty(...a)
                );
                g.append(sp);
                //}

            }});
            
        }
        //}
        
    }})
        
    //}
   
    // initilization animation {
    const initAni = () => {
        let KK =
        svg.querySelectorAll('g>.nutz-path');
        KK.forEach(path => {
            path.style.pointerEvents = 'none';
        });
        nut.querySelectorAll('.nutz-sub-path')
        .forEach(sp => {
            sp.style.display = 'none';
        });
        let arcsum = 0;
        data.arcs.forEach((arc, z) => {
        
            KK[z]?.style.setProperty(
                'd', 'path(var(--zero-arc))'
            );
            if (KK[z]?.shit) {
                setTimeout(
                    KK[z].shit.start,
                    aniRate * arcsum
                )
            }
            arcsum += arc[0];
        });
        setTimeout(()=>{
            
            KK.forEach(path => {
                path.style.pointerEvents = 'auto';
            });
        nut.querySelectorAll('.nutz-sub-path')
        .forEach(sp => {
            sp.style.display = 'block';
        },0);
        
    svg.addEventListener('dblclick',initAni,{ once: true });
    
        },aniRate*arcsum)
    };
    initAni();
    //}
    
}))();