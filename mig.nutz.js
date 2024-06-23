((
 // vars for page {
 D = document,
 O = Object,
 A = O.assign,
 J = v=>{try{return JSON.parse(v)}catch(t){return null}},
 M = v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),
 NS = (a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),
 H = (d,f) => `<path d="${d}" fill="${f}" />`,
 P = A({
   selector: 'nutz',
   radius: 100,
   hole: 55
 },J(`{${D.currentScript.innerHTML}}`)),
 R = P.selector,
 
 // image method {
 MIG = (def, [id,url,scl]) => def.innerHTML += `
  <pattern id=${id} width=1 height=1>
  <image href="${url}"
  transform="scale(${scl||1})"/></pattern>`,
 //}
 
 // pattern method {
 PAT = (
   def, [id, typ, col, y=1.3, z],
   [bak,scl]=CSS.supports('color',y)?[y,1.3]:[z,y]
 ) => def.innerHTML += `
   <pattern id=${id} width=2 height=2
   patternUnits=userSpaceOnUse
   patternTransform="rotate(45) scale(${scl})"
   >${(bak?H("M0 0H2V2H0Z",bak):'')+H({
        dots: 'M0 1A.5 .5 0 1 0 0 .9Z',
       xdots: 'M0 1A.5 .5 0 1 0 0 .9V0H2V2H0Z',
       hatch: 'M0 0 V2H1V0Z',
       cross: 'M0 0V2H2V1.75H.25V0Z',
      xcross: 'M2 0V1.75H.25V0Z',
       check: 'M0 0H1V2H2V1H0Z',
       zigzag: 'M 0 1H.5V0H2V.5H1V1.5H0ZM2 1V2H1.5V1Z',
       xwave:`M1 0Q1.5 .5 2 0V1Q1.5 1.5 1 1 .5 .5 0 1V0ZM0 2Q.5 1.5 1 2Z`,
       wave: `M0 1C .8 .8 .2 .2 1 0H2C 1.8 .8 1.2 .2 1 1S.2 1.2 0 2ZM1 2C1.8 1.8 1.2 1.2 2 1V2Z`
    }[typ],col)}</pattern>`
 //}
 
 // DEBUGG
 ,log = console.log,
 
 //}
) => D.querySelectorAll(`svg[data-${R}]`).forEach((
 // vars for this nut {
 nut, k, _,
 G = -25,
 iHTML = nut.innerHTML,
 opts = A({},P,
   J(`{${iHTML}}`)||J(`{"arcs":[${iHTML}]}`)
 ),
 [w,x,y,z] = [0,0,...M(G)],
 d=(
   nut.setAttribute('viewBox','-100 -100 200 200'),
   NS(nut,'defs')
 )
 //}
) => opts.arcs?.forEach((
 // vars for this arc {
 arc,i,_,X=
 [w,x,y,z] = [y,z,...M(G+=arc[0])],
 f = arc[0] > 50 ? 1 : 0,
 Z = (
   a,b, D = [0, 0, 0, 0],
   [r1,r2] = [a-D[0], b+D[3]]
 ) => `M${r2*w-D[1]*x} ${r2*x+D[1]*w} A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y} L${r1*y+D[2]*z} ${r1*z-D[2]*y} A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w}Z`,
 vals = A({}, opts, arc[2]),
 p = arc[1]?NS(nut,'path'):0,
 id = 'nut'+k+'arc'+i,
 mat = arc[1]?.match(/(^img|^pat)[^(]*\((.*)\)$/),
 fill = mat?(({img:MIG,pat:PAT}[mat[1]](d,[
     id,...mat[2].split(/,(?![^(]*\))/)
 ])),`url(#${id})`):arc[1]
 //}
) => !p||[
    ...O.entries(A({
        fill: fill,
        d: Z(vals.radius, vals.hole, vals.gaps),
        ['data-'+R]: JSON.stringify(A({
            id: id,
            perc: arc[0],
            start: G-arc[0],
            radius: vals.radius,
            hole: vals.hole
        }, arc[2]))
    }, arc[2])),
    ...vals.sizes?.map(v =>
      [v[0],`"${Z(v[1],v[2],v[3])}"`]
    )||[]
].forEach(a =>
    /^--/.test(a[0]) ?
    p.style.setProperty(...a) :
    /radius|hole|sizes|gaps/.test(a[0]) ?
    '' : p.setAttribute(...a)
))))();