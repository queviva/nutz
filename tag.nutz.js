// uses custome html tags and parameters
((
    
 D=document,
 O=Object,
 A=O.assign,
 J=v=>{try{return JSON.parse(v)}catch(t){return null}},
 P=A({
    tag:'nut-tag',
    radius:100,
    hole:55,
    gaps:'0,0,0,0',
    toggle: 'toggle'
 },J(`{${D.currentScript.innerHTML}}`)),
 NUT = P.tag.match(/(^.*)-(?=[^-]*$)/)[1],
 M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 E=(a,v,p={},q={})=>{
    j = a.appendChild(A(D.createElement(v),p));
    O.entries(q).forEach(
        x => j.style.setProperty(...x)
    );
    return j;
 },
 NS=(a,v,p={},q={})=>{
    j = a.appendChild(D.createElementNS(
        'http://www.w3.org/2000/svg', v
    ));
    O.entries(p).forEach(x => j.setAttribute(...x));
    O.entries(q).forEach(
        x => j.style.setProperty(...x)
    );
    return j;
 },
 H=(d,f)=>`<path d="${d}" fill="${f}" />`,
 CED = v => customElements.define(v, class extends HTMLElement{}),
 ATTS = a => O.fromEntries(a.getAttributeNames().map(v=>[v,a.getAttribute(v)])),
 MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`,
 PAT=(def,[id,typ,col,y=1.3,z],[bak,scl]=CSS.supports('color',y)?[y,z||1.3]:[z,y])=>def.innerHTML+=`<pattern id=${id} width=2 height=2 patternUnits=userSpaceOnUse patternTransform="rotate(45) scale(${scl})">${(bak?H("M0 0H2V2H0Z",bak):'')+H({
 dots:'M0 1A.5 .5 0 1 1 0 1.1Z',
 xdots:'M0 1A.5 .5 0 1 1 0 1.1V2H2V0H0Z',
 cross:'M0 0V2H2V1.75H.25V0Z',
 xcross:'M2 0V1.75H.25V0Z',
 hatch:'M0 0 V2H1V0Z',
 check:'M0 0H1V2H2V1H0Z',
 strip:'M.5 0H1.5L0 1.5V.5ZM2 .5V1.5L1.5 2H.5Z',
 love:'M2 2H1.2A.3 .3 0 0 1 1.2 1.2A.3 .3 0 0 1 2 1.2Z',
 stix:'M0 0H.25V.5H1.25V1.25H1V.75H0ZM.5 0H1.25V.25H.75V1.25H0V1H.5Z',
 xstix:'M2 2H0V1.25H.75V.75H1V1.25H1.25V.5H.75V.25H1.25V0H2ZM0 .75H.5V1H0ZM.25 0V.5H.5V0Z',
 ostars:`M.13 .13L1.8 1L0 1.23L1.23 0L1 1.8Z`,
 pstars:`M.06 .06L.9 .5L0 .615L.615 0L.5 .9Z`,
 ystars:`M.1 .1L.71 0L.99 .55L.55 .99L0 .71Z`,
 zstars:`M.1 .1L.99 .55L0 .71L.71 0L.55 .99Z`,
 stars:`M.15 .15L1.48 .83L0 1.06L1.06 0L.83 1.48Z`,
 xstars:`M0 0L.15 .15L.65 .41L1.06 0L.97 .56L1.47 .82L.91 .91L.82 1.47L.56 .97L0 1.06L.41 .65 L.15 .15L0 0V2H2V0Z`
     
 }[typ]||typ,col)}</pattern>`
 
 //DEBUGG
 ,log = console.log

) => {
 
 CED(`${NUT}-arc`);
 CED(`${NUT}-cap`);
 CED(P.tag);
    
 D.querySelectorAll(P.tag).forEach((n,j)=>{
    
    let
    
    NUTj = NUT+j;
    G=-25,
    Q=A({},{radius:P.radius,hole:P.hole,gaps:P.gaps},ATTS(n)),
    [w,x,y,z]=[0,0,...M(G)];
    svg=NS(n,'svg',{
        'viewBox' : '-100 -100 200 200'
    },{
        height : '100%',
        width  : '100%',
        overflow : 'visible',
       'user-select' : 'none'
    }),
    defs=NS(svg,'defs'),
    arcsG=NS(svg,'g'),
    capsG=NS(svg,'g'),
    sty=window.getComputedStyle(n),
    styleTag = E(n,'style',{ 'innerHTML': `
      .${NUTj}-label {
          opacity: 0;
          transform: scale(0.3);
          transition: all linear 300ms;
          fill:${sty.color};
          font-family:${sty['font-family']};
      }
      .${NUT}-label-hover {
          opacity: 1;
          transform: scale(1);
      }
    `});
    
    n.querySelectorAll(`${NUT}-arc`).forEach((
        
        arc,i,_,
        attrs = ATTS(arc),
        v=A({},{
            
            id: NUTj+'arc'+i,
            radius:Q.radius,
            hole:Q.hole,
            gaps:Q.gaps
            
        },attrs),
        q=parseFloat(v.radius),
        k=parseFloat(v.hole),
        c=parseFloat(v.perc),
        X=[w,x,y,z]=[y,z,...M(G+=c)],
        f=c>50?1:0,
        Z=(a,b,D=[0,0,0,0],[r1,r2]=[a-D[0],b+D[3]])=>{return `M${r2*w-D[1]*x} ${r2*x+D[1]*w}A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y}L${r1*y+D[2]*z} ${r1*z-D[2]*y}A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w}Z`}
    
    ) => {

        if (attrs.skip !== undefined) {
            n.removeChild(arc);
            return;
        }
        
        
        attrs.id = v.id;
        
        const arcObj = NS(arcsG,'path',A(attrs,{
            'd' : Z(q,k,v.gaps?.split(',').map(v=>Number(v))||undefined),
            'fill': (/^ima?g/.test(v.fill)?(MIG(defs,[v.id+'mig',...(v.fill.match(/\((.*)\)$/)[1].split(/,/))]),`url(#${v.id}mig)`):/^pat/.test(v.fill)?(PAT(defs,[v.id+'pat',...(v.fill.match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]),`url(#${v.id}pat)`):v.fill)
            
        }),O.fromEntries(J(Q.sizes)?.map(v=>[v[0],`"${Z(v[1],v[2],v[3])}"`])||[],
        ));
        
        arcObj.classList.add(`${NUT}-arc`);
            
        const labelObj = NS(capsG,'g',{
           id : v.id+'-label',
           'class' : `${NUTj}-label ${NUT}-label`
        });
     
        let percObj = NS(labelObj,'text',{
            'id' : v.id+'-percent',
            'class' : `${NUT}-percent`,
            'text-anchor' : 'middle',
            'dominant-baseline' : 'middle',
            'font-size' : 1.25 * v.hole
        },{
            'user-select' : 'none',
            'pointer-events' : 'none'
        });
        
        percObj.innerHTML =
        
        `<tspan dx="0.05em">${c}</tspan>` +
        `<tspan id="${v.id}-symbol" class="${NUT}-symbol" font-size="0.2em" dx="-0.2em" dy="-1.3em">%</tspan>` ;
        
        let capObj, werds =
            arc.querySelectorAll(
                `${NUT}-cap,${NUT}-caption`
            )[0] ||
            (v.cap ? (styleTag.innerHTML += `
            .${v.id}-caption {
                top: 0px;
                font-size: ${0.3*v.hole}px;
            }
            `,
            E(n,'div',{
                id : `${v.id}-caption`,
                innerHTML : v.cap
            },{
                'position': 'absolute',
                'text-align': 'center',
                'white-space': 'nowrap'
            })):'');
        
        if (werds) {
            
            werds.classList.add(
                `${NUT}-caption`,
                `${NUTj}-caption`,
                `${v.id}-caption`
            );
            
            capObj = NS(labelObj, 'foreignObject', {
                x: -10,
                y: 20,
                height: 20,
                width: 20,
                overflow: 'visible'
            }, {
                'pointer-events': 'none'
            });
        
            E(capObj, 'div', {}, {
                
                'position' : 'absolute',
                'display' : 'flex',
                'align-items' : 'center',
                'justify-content' : 'center',
                'width'  : '20px',
                'pointer-events': 'none'
                
            }).append(werds);
            
        }

        arcObj.over = () => labelObj.classList.add(`${NUT}-label-hover`);
        arcObj.out = () => labelObj.classList.remove(`${NUT}-label-hover`)

        arcObj.addLizzers = () => {
            arcObj.addEventListener('mouseover', arcObj.over);
            arcObj.addEventListener('mouseout', arcObj.out);
        };

        arcObj.removeLizzers = () => {
            arcObj.removeEventListener('mouseover', arcObj.over);
            arcObj.removeEventListener('mouseout', arcObj.out);
        }

        

        arcObj[P.toggle] = val => {
            let a = {
                label: capsG,
                percent: labelObj,
                caption: labelObj
            },
            b = {
                label: labelObj,
                percent: percObj,
                caption: capObj
            };
            
            if (a[val].contains(b[val])) {
                a[val].removeChild(b[val]);
            } else {
                a[val].appendChild(b[val]);
            }
        };
        
        ['label','percent','caption'].forEach(t=>{
            if (v[`no${t}`]!==undefined) {
                 arcObj[P.toggle](t);
            }
        });
        
        n.removeChild(arc);
        
    });
     
 })

})();