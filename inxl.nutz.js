((
 // all vars & methods {
 D = document,
 O = Object,
 J = JSON.parse,
 A = O.assign,
 M = v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 E =(a,v,p)=>a.appendChild(A(D.createElement(v),p)),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 NZ = (a,v,p={}) => {
     j = a.appendChild(D.createElementNS(
        'http://www.w3.org/2000/svg',v
     ));
     O.entries(p).forEach(x=>j.setAttribute(...x));
     return j;
 },
 calcArc = (rad2, rad1, startAng, endAng, D) => {
 
    const [cos1, sin1, cos2, sin2] = [...M(startAng), ...M(endAng)];
    const flag = (endAng - startAng) > 50 ? 1 : 0;
    
    /*
    D = D ?? {
        outr : 1,
        left : 0.5,
        rite : 0.5,
        innr : 1
    };
    */
    
    return !D ?
        `M${rad1*cos1} ${rad1*sin1}
         A${rad1} ${rad1} 0 ${flag} 1
          ${rad1*cos2} ${rad1*sin2}
         L${rad2*cos2} ${rad2*sin2}
         A${rad2} ${rad2} 0 ${flag} 0
          ${rad2*cos1} ${rad2*sin1}
         Z`
        :
        `M${((rad2-D.outr)*cos1)-(D.left*sin1)}
          ${((rad2-D.outr)*sin1)+(D.left*cos1)}
         A${rad2-D.outr} ${rad2-D.outr} 0 ${flag} 1
          ${((rad2-D.outr)*cos2)+(D.rite*sin2)}
          ${((rad2-D.outr)*sin2)-(D.rite*cos2)}
         L${((rad1+D.innr)*cos2)+(D.rite*sin2)}
          ${((rad1+D.innr)*sin2)-(D.rite*cos2)}
         A${rad1+D.innr} ${rad1+D.innr} 0 ${flag} 0
          ${((rad1+D.innr)*cos1)-(D.left*sin1)}
          ${((rad1+D.innr)*sin1)+(D.left*cos1)}
         Z`;
         //*/
 },
 P = A({
    selector: 'nutz',
    hole: 0.55,
    radius: 100,
    aniRate : 20
 },J(O.values(D.currentScript.dataset)[0]||'{}')),
 R = P.selector
 
 // DEBUGG
 ,log = console.log
    
 //}

) => D.querySelectorAll(R+'-area').forEach((
    // individual nutz vars {
    nut, k, _,
    ang = -25,
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
    
    // create poster {
    const poster = E(nutHolder, 'div', {
        id : R+k+'poster',
        className : 'topper',
        innerHTML : 'IN.XL'
    });
    [
        ['font-size', data.radius+'px']
    ].forEach(p => poster.style.setProperty(...p));
    
    //}
    
    // make the svg tag {
    const svg = NZ(nutHolder,'svg', {
        id : R+k+'svg',
       'data-nose' : '#' + nut.id,
        viewBox : '-20 -20 40 40'
    });
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
        H('M0 0H2V2H0Z',bak):'')+{
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
            id: R+k+'arc'+i
        }, arc[2]),
        subang = ang - arc[0]
        //}
    ) => { if (arc[1]) {
    
        // create g holder for arc {
        const g = NZ(svg, 'g', {
            id : R+k+'g'+i,
           'class' : R+'-g '+R+'-g-over'
        });
        //}
        
        // create path for this arc {
        const path = NZ(g, 'path', {
            is : 'nutz-path',
            id : vals.id,
            fill : arc[1],
           'class' : R+'-arc',
           'data-cg' : JSON.stringify(M(ang-arc[0]/2).map(v=>v*((20 + 20*vals.hole)/2))),
            d : calcArc (
                20, 20 * vals.hole,
                ang - arc[0], ang
            )
            
        });
        //}
        
        // create captions holder {
        const capHolder = E(nutHolder, 'div', {
            id: R + k + 'captions' + i,
            className: 'cap-holder',
        });
        const capMouseOver = () => {
            capHolder.classList.add('cap-over');
        };
        const capMouseOut = () => {
            capHolder.classList.remove('cap-over');
        };
        g.inableCaps = v => {
            g[(v?'add':'remove')+'EventListener'](
                'mouseover', capMouseOver
            );
            g[(v?'add':'remove')+'EventListener'](
                'mouseout', capMouseOut
            );
            v || capHolder.classList.remove('cap-over');
        }
        //}
        
        // create caption percent {
        let perc = E(capHolder, 'div', {
            id : vals.id+'perc',
            className : 'perc',
            innerHTML : arc[0]+'<sup>%</sup>'
        });
        [
            ['font-size',data.radius+'px']
        ].forEach(p=>perc.style.setProperty(...p));
        //}
        
        // create caption title {
        let tit = E(capHolder, 'div', {
            id : vals.id+'tit',
            className : 'title',
            innerHTML : vals.cap
        });
        [
            ['font-size', 0.2 * data.radius+'px']
        ].forEach(p=>tit.style.setProperty(...p));
        //}
    
        // animation for arc {
        const arcAni = new function() {
            
            let startTime, fromArc = ang-arc[0],
            dur = P.aniRate*arc[0], per = 0;
            this.duration = arc[0];
            
            this.ani = () => {
                
                per = (Date.now()-startTime)/dur;
                per = per >= 1 ? 1 : per;
                
                path.style.setProperty('d',
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
        
        path.shit = arcAni;
        path.percent = arc[0];
       
        //}
        
        // if there are sub values {
        if (vals.subvals) {
            
            // create mask for sub-group {
            let mask = NZ(g, 'mask', {
                id : R+k+'mask'+i
            });
            NZ(mask, 'path', {
               'class' : R+'-mask-outer',
               d : path.getAttribute('d')
            });
            //}
            
            // create the sub-group {
            let subG = NZ(g, 'g', {
                id : R+k+'sub-g'+i,
                xxxmask : 'url(#'+R+k+'mask'+i+')'
            });
            //}
            
            // loop through sub-arcs {
            
            vals.subvals.forEach((
                // sub-arc vars {
                sub, j, _,
                frac = (sub[0]/100)*arc[0],
                __  = subang += frac,
                suvals = A({},data,{
                    id: R+k+'arc'+i+'sub'+j
                }, sub[2])
                //}
            ) => { if (sub[1]) {

                log(
                    vals.subvals.length,j
                );
                
                // create the sub-arc {
                NZ(subG, 'path', {
                    id : suvals.id,
                    d : calcArc(
                        20, 20*vals.hole,
                        subang - frac,
                        subang, {
                            outr: 0.5,
                            left: j===0? 0.5 : 0.25,
                            rite: j===
                                vals.subvals.length
                                -1 ? 0.5 : 0.25,
                            innr: 0.5
                        }
                    ),
                   'class' : R+'-sub',
                });
                //}
                
                // add line to the mask {
                let trig = M(subang);
                NZ(mask, 'path', {
                   'class' : R+'-mask-inner',
                    d : `M
                    ${trig[0]*20*vals.hole}
                    ${trig[1]*20*vals.hole}
                    L
                    ${trig[0]*20}
                    ${trig[1]*20}
                    `
                });
                //}
                
            }});
            //}
            
        }
        //}
        
    }});
        
    //}

    
}))();