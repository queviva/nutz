// 517 chars
// must use [data-nutz] as selector
// takes optional hole % as third value:
//  [perc, fill-color, optional-hole%]
//  [ 30,    "#fff",         0.5     ]
// {
/*
((D=document,M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)))=>D.querySelectorAll('[data-nutz]').forEach(n=>{let G=-25,[w,x,y,z]=[0,0,...M(G)];n.setAttribute('viewBox','-1 -1 2 2');JSON.parse(`[${n.innerHTML}]`).forEach((r,i,_,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,p=r[1]?n.appendChild(D.createElementNS('http://www.w3.org/2000/svg','path')):0,k=r[2]||.55)=>!p||[['d',`M${w} ${x}A1 1 0 ${f} 1 ${y} ${z}L${k*y} ${k*z}A${k} ${k} 0 ${f} 0 ${k*w} ${k*x}Z`],['fill',r[1]]].forEach(a=>p.setAttribute(...a)))}))();
//*/
//}


// 815 chars is minimum to include images
// no customization
// must use [data-nutz] as selector
// can load images img(urlOfMig.ext,scale)
// takes optional hole % as third value:
//  [perc, fill-color, optional-hole%]
//  [ 30,    "#fff",         0.5     ]
// {
/*
((D=document,M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`)=>D.querySelectorAll('[data-nutz]').forEach((n,j)=>{let G=-25,d=NS(n,'defs'),[w,x,y,z]=[0,0,...M(G)];n.setAttribute('viewBox','-1 -1 2 2');JSON.parse(`[${n.childNodes[0].textContent}]`).forEach((r,i,_,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,p=r[1]?NS(n,'path'):0,id='nut'+j+'arc'+i,k=r[2]||.55)=>!p||[['d',`M${w} ${x}A1 1 0 ${f} 1 ${y} ${z}L${k*y} ${k*z}A${k} ${k} 0 ${f} 0 ${k*w} ${k*x}Z`],['fill',/^img/.test(r[1])?(MIG(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${id})`):r[1]]].forEach(a=>p.setAttribute(...a)))}))();
//*/
//}

// 707 characters allows for customize selector
// takes optional third configuration object
//  [perc,   fill-col,     opt-obj  ]
//  [30,   "var(--red)", {"opt":val}]
// {
/*
((D=document,O=Object,A=O.assign,J=JSON.parse,P=A({selector:'[data-nutz]',radius:1,hole:.55},J(`{${D.currentScript.innerHTML}}`)),M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)))=>D.querySelectorAll(P.selector).forEach(n=>{let G=-25,[w,x,y,z]=[0,0,...M(G)];n.setAttribute('viewBox','-1 -1 2 2');J(`[${n.innerHTML}]`).forEach((r,i,_,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,p=r[1]?n.appendChild(D.createElementNS('http://www.w3.org/2000/svg','path')):0,v=A({},P,r[2]),q=v.radius,k=v.hole)=>!p||[...O.entries(r[2]||[]),['d',`M${q*w} ${q*x}A${q} ${q} 0 ${f} 1 ${q*y} ${q*z}L${k*y} ${k*z}A${k} ${k} 0 ${f} 0 ${k*w} ${k*x}Z`],['fill',r[1]]].forEach(a=>/radius|hole/.test(a[0])||p.setAttribute(...a)))}))();
//*/
//}

// 1090 characters allows all customization
// and options as well as loading images
// takes "arcs":[...] or just list of []'s
//  [%,        color|image,          opts   ]
//  [30, img(urlOfMig.ext,scale),{"hole":10}]
// {
/*
((D=document,O=Object,A=O.assign,J=v=>{try{return JSON.parse(v)}catch(t){return null}},P=A({selector:'[data-nutz]',radius:100,hole:55},J(`{${D.currentScript.innerHTML}}`)),M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`)=>D.querySelectorAll(P.selector).forEach((n,j)=>{let G=-25,[w,x,y,z]=[0,0,...M(G)],Q=A({},P,J(`{${n.innerHTML}}`)||J(`{"arcs":[${n.innerHTML}]}`)),d=NS(n,'defs');n.setAttribute('viewBox','-100 -100 200 200');Q.arcs?.forEach((r,i,_,id='nut'+j+'arc'+i,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,p=r[1]?NS(n,'path'):0,v=A({},Q,r[2]),q=v.radius,k=v.hole)=>!p||[...O.entries(r[2]||[]),['d',`M${q*w} ${q*x}A${q} ${q} 0 ${f} 1 ${q*y} ${q*z}L${k*y} ${k*z}A${k} ${k} 0 ${f} 0 ${k*w} ${k*x}Z`],['fill',/^img/.test(r[1])?(MIG(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${id})`):r[1]]].forEach(a=>/radius|hole/.test(a[0])||p.setAttribute(...a)))}))();
//*/
//}

// 1668 chars custom opts for script/nut/arc
// takes "arcs":[...] or just list of []'s
// takes img(url.ext,scale)
// or pat(pattern|path,color,scale|back-col,back-col)
// {
/*
((D=document,O=Object,A=O.assign,J=v=>{try{return JSON.parse(v)}catch(t){return null}},P=A({selector:'[data-nutz]',radius:100,hole:55},J(`{${D.currentScript.innerHTML}}`)),M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),H=(d,f)=>`<path d="${d}" fill="${f}" />`,MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`,PAT=(def,[id,typ,col,y=1.3,z],[bak,scl]=CSS.supports('color',y)?[y,1.3]:[z,y])=>def.innerHTML+=`<pattern id=${id} width=2 height=2 patternUnits=userSpaceOnUse patternTransform="rotate(45) scale(${scl})">${(bak?H("M0 0H2V2H0Z",bak):'')+H({dots:'M0 1A.5 .5 0 1 1 0 1.1Z',xdots:'M0 1A.5 .5 0 1 1 0 1.1V2H2V0H0Z',hatch:'M0 0 V2H1V0Z',cross:'M0 0V2H2V1.75H.25V0Z',xcross:'M2 0V1.75H.25V0Z',check:'M0 0H1V2H2V1H0Z'}[typ]||typ,col)}</pattern>`)=>D.querySelectorAll(P.selector).forEach((n,j)=>{let G=-25,[w,x,y,z]=[0,0,...M(G)],Q=A({},P,J(`{${n.innerHTML}}`)||J(`{"arcs":[${n.innerHTML}]}`)),d=NS(n,'defs');n.setAttribute('viewBox','-100 -100 200 200');Q.arcs?.forEach((r,i,_,id='nut'+j+'arc'+i,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,p=r[1]?NS(n,'path'):0,v=A({},Q,r[2]),q=v.radius,k=v.hole)=>!p||[...O.entries(r[2]||[]),['d',`M${q*w} ${q*x}A${q} ${q} 0 ${f} 1 ${q*y} ${q*z}L${k*y} ${k*z}A${k} ${k} 0 ${f} 0 ${k*w} ${k*x}Z`],['fill',/^img/.test(r[1])?(MIG(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${id})`):/^pat/.test(r[1])?(PAT(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]),`url(#${id})`):r[1]]].forEach(a=>/radius|hole/.test(a[0])||p.setAttribute(...a)))}))();
//*/
//}

// 1800 chars
// custom opts for script/nut/arc
// takes "arcs":[...] or just list of []'s
// takes img(url.ext,scale)
// or pat(pattern|path,color,scale|back-col,back-col)
// takes "gaps":[...]
// {
/*
((D=document,O=Object,A=O.assign,J=v=>{try{return JSON.parse(v)}catch(t){return null}},P=A({selector:'[data-nutz]',radius:100,hole:55},J(`{${D.currentScript.innerHTML}}`)),M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),H=(d,f)=>`<path d="${d}" fill="${f}" />`,MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`,PAT=(def,[id,typ,col,y=1.3,z],[bak,scl]=CSS.supports('color',y)?[y,1.3]:[z,y])=>def.innerHTML+=`<pattern id=${id} width=2 height=2 patternUnits=userSpaceOnUse patternTransform="rotate(45) scale(${scl})">${(bak?H("M0 0H2V2H0Z",bak):'')+H({dots:'M0 1A.5 .5 0 1 1 0 1.1Z',xdots:'M0 1A.5 .5 0 1 1 0 1.1V2H2V0H0Z',hatch:'M0 0 V2H1V0Z',cross:'M0 0V2H2V1.75H.25V0Z',xcross:'M2 0V1.75H.25V0Z',check:'M0 0H1V2H2V1H0Z'}[typ]||typ,col)}</pattern>`)=>D.querySelectorAll(P.selector).forEach((n,j)=>{let G=-25,[w,x,y,z]=[0,0,...M(G)],Q=A({},P,J(`{${n.innerHTML}}`)||J(`{"arcs":[${n.innerHTML}]}`)),d=NS(n,'defs');n.setAttribute('viewBox','-100 -100 200 200');Q.arcs?.forEach((r,i,_,id='nut'+j+'arc'+i,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,Z=(a,b,D=[0, 0, 0, 0],[r1,r2]=[a-D[0],b+D[3]])=>`M${r2*w-D[1]*x} ${r2*x+D[1]*w}A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y}L${r1*y+D[2]*z} ${r1*z-D[2]*y}A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w}Z`,p=r[1]?NS(n,'path'):0,v=A({},Q,r[2]),q=v.radius,k=v.hole)=>!p||[...O.entries(r[2]||[]),['d',Z(q,k,v.gaps)],['fill',/^img/.test(r[1])?(MIG(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${id})`):/^pat/.test(r[1])?(PAT(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]),`url(#${id})`):r[1]]].forEach(a=>/radius|hole/.test(a[0])||p.setAttribute(...a)))}))();
//*/
//}

// 1910 chars
// custom opts for script/nut/arc
// takes "arcs":[...] or just list of []'s
// takes img(url.ext,scale)
// takes pat(type|path,color,col|scale,col|scale)
// takes "gaps":[...]
// takes "sizes":[...]
// 2011 chars to include data-param
// {
//*
((D=document,O=Object,A=O.assign,J=v=>{try{return JSON.parse(v)}catch(t){return null}},P=A({selector:'[data-nutz]',radius:100,hole:55},J(`{${D.currentScript.innerHTML}}`)),M=v=>['cos','sin'].map(t=>Math[t](Math.PI*v/50)),NS=(a,v)=>a.appendChild(D.createElementNS('http://www.w3.org/2000/svg',v)),H=(d,f)=>`<path d="${d}" fill="${f}" />`,MIG=(def,[id,url,scl])=>def.innerHTML+=`<pattern id=${id} width=1 height=1><image href="${url}" transform="scale(${scl||1})"/></pattern>`,PAT=(def,[id,typ,col,y=1.3,z],[bak,scl]=CSS.supports('color',y)?[y,z||1.3]:[z,y])=>def.innerHTML+=`<pattern id=${id} width=2 height=2 patternUnits=userSpaceOnUse patternTransform="rotate(45) scale(${scl})">${(bak?H("M0 0H2V2H0Z",bak):'')+H({dots:'M0 1A.5 .5 0 1 1 0 1.1Z',xdots:'M0 1A.5 .5 0 1 1 0 1.1V2H2V0H0Z',cross:'M0 0V2H2V1.75H.25V0Z',xcross:'M2 0V1.75H.25V0Z',hatch:'M0 0 V2H1V0Z',check:'M0 0H1V2H2V1H0Z'}[typ]||typ,col)}</pattern>`)=>D.querySelectorAll(P.selector).forEach((n,j)=>{let G=-25,[w,x,y,z]=[0,0,...M(G)],Q=A({},P,J(`{${n.innerHTML}}`)||J(`{"arcs":[${n.innerHTML}]}`)),d=NS(n,'defs');n.setAttribute('viewBox','-100 -100 200 200');Q.arcs?.forEach((r,i,_,id='nutz'+j+'arc'+i,X=[w,x,y,z]=[y,z,...M(G+=r[0])],f=r[0]>50?1:0,Z=(a,b,D=[0, 0, 0, 0],[r1,r2]=[a-D[0],b+D[3]])=>`M${r2*w-D[1]*x} ${r2*x+D[1]*w}A${r2} ${r2} 0 ${f} 1 ${r2*y+D[2]*z} ${r2*z-D[2]*y}L${r1*y+D[2]*z} ${r1*z-D[2]*y}A${r1} ${r1} 0 ${f} 0 ${r1*w-D[1]*x} ${r1*x+D[1]*w}Z`,p=r[1]?NS(n,'path'):0,v=A({},Q,r[2]),q=v.radius,k=v.hole)=>!p||[...O.entries(r[2]||[]),['d',Z(q,k,v.gaps)],['fill',/^img/.test(r[1])?(MIG(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,/))]),`url(#${id})`):/^pat/.test(r[1])?(PAT(d,[id,...(r[1].match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]),`url(#${id})`):r[1]],...v.sizes?.map(v=>[v[0],`"${Z(v[1],v[2],v[3])}"`])||[],['data-nutz',JSON.stringify(A({id:id,perc:r[0],start:G-r[0],radius:v.radius,hole:v.hole},r[2]))]].forEach(a=>/^--/.test(a[0])?p.style.setProperty(...a):/radius|hole|sizes|gaps/.test(a[0])?'':p.setAttribute(...a)))}))();
//*/
//}
