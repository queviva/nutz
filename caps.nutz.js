// custom opts for script/nut/arc
// takes "arcs":[...] or just list of []'s
// takes img(url.ext,scale)
// takes pat(type|path,color,col|scale,col|scale)
// takes "gaps":[...]
// takes "sizes":[...]
// creates data-selector parameter
((
// doc vars & methods {
 D=document,
 O=Object,
 A=O.assign,
 J=v=>{try{return JSON.parse(v)}catch(t){return null}},
 P=A({
    selector:'nutz',
    radius:100,
    hole:55
 },J(`{${D.currentScript.innerHTML}}`)),
 R=P.selector,
 M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),
 H=(d,f)=>`<path d="${d}" fill="${f}" />`,
 // img loader {
 MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`,
 //}
 // pattern matcher {
 PAT=(def,[id,typ,col,y=1.3,z],[bak,scl]=CSS.supports('color',y)?[y,z||1.3]:[z,y])=>def.innerHTML+=`<pattern id=${id} width=2 height=2 patternUnits=userSpaceOnUse patternTransform="rotate(45) scale(${scl})">${(bak?H("M0 0H2V2H0Z",bak):'')+H({dots:'M0 1A.5 .5 0 1 1 0 1.1Z',xdots:'M0 1A.5 .5 0 1 1 0 1.1V2H2V0H0Z',cross:'M0 0V2H2V1.75H.25V0Z',xcross:'M2 0V1.75H.25V0Z',hatch:'M0 0 V2H1V0Z',check:'M0 0H1V2H2V1H0Z'}[typ]||typ,col)}</pattern>`
 //}
 
 //DEBUGG
 ,log = console.log

//}
)=>D.querySelectorAll(`[data-${R}]`).forEach((n,j)=>{
    // nut init {
    let G=-25,
    [w,x,y,z]=[0,0,...M(G)],
    Q=A({},P,J(`{${n.innerHTML}}`)||J(`{"arcs":[${n.innerHTML}]}`)),
    pathG=NS(n,'g');
    capG=NS(n,'g');
    d=NS(n,'defs');
    n.setAttribute('viewBox','-100 -100 200 200');
    //}
    Q.arcs?.forEach((
        //arc vars & methods {
        r,i,_,
        v=A({},Q,{id:'nutz'+j+'arc'+i},r[2]),
        X=[w,x,y,z]=[y,z,...M(G+=r[0])],
        f=r[0]>50?1:0,
        Z=(a,b,D=[0,0,0,0],[r1,r2]=[a-D[0],b+D[3]])=>`M${r2*w-D[1]*x} ${r2*x+D[1]*w}A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y}L${r1*y+D[2]*z} ${r1*z-D[2]*y}A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w}Z`,
        p=r[1]?NS(pathG,'path'):0,
        cap=r[1]?NS(capG,'text'):0,
        q=v.radius,
        k=v.hole
        //}
    )=>{
        
        // create arcs {
        if(!p) return;
        [...O.entries(r[2]||[]),['class',R+'-arc'],['d',Z(q,k,v.gaps)],['fill',/^ima?g/.test(r[1])?(MIG(d,[v.id+'mig',...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${v.id}mig)`):/^pat/.test(r[1])?(PAT(d,[v.id+'pat',...(r[1].match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]),`url(#${v.id}pat)`):r[1]],...v.sizes?.map(v=>[v[0],`"${Z(v[1],v[2],v[3])}"`])||[],['data-nutz',JSON.stringify(A({id:v.id,perc:r[0],start:G-r[0],radius:v.radius,hole:v.hole},r[2]))]
        ].forEach(a=>/^--/.test(a[0])?p.style.setProperty(...a):/radius|hole|sizes|gaps/.test(a[0])?'':p.setAttribute(...a));
        //}
     
        // create captions|percents {
        cap.innerHTML =
        
        `<tspan class="${R}-caption-percent" dx="0.05em">${r[0]}</tspan>` +
        `<tspan class="${R}-caption-symbol" font-size="0.2em" dx="-0.2em" dy="-1.3em">%</tspan>` +
        `<tspan class="${R}-caption-title" font-size="0.3em" x="0" dy="2.3em">${v.cap||''}</tspan>`;
        
        [
            ['id',v.id+'cap'],
            ['class',R+'-caption'],
            ['text-anchor','middle'],
            ['dominant-baseline','middle'],
            ['font-size',v.hole],
            ['user-select','none'],
            ['pointer-events','none'],
            ['opacity',0]
        ].forEach((a,b) => {
            cap.setAttribute(a[0],a[1]);
        });
        //}
        
        // swap caption-over class on mouseover {
        p.addEventListener('mouseover', ()=>{
            cap.style.opacity = 1;
            cap.classList.add(R+'-caption-over');
        });
        p.addEventListener('mouseout', ()=>{
            cap.style.opacity = 0;
            cap.classList.remove(R+'-caption-over');
        });
        //}
     
    });
}))();
