

const dataPrefs = [...document.scripts].find(
  s => s.src && new URL(s.src, document.baseURI).href === import.meta.url
)?.dataset?.prefs || '{}';

const prefs = {
  ...{
    fix: 'nigz',
    svgNS: 'http://www.w3.org/2000/svg'
  },
  ...JSON.parse(dataPrefs)
};

const allDs = {
  dots: 'M.5 1a.5 .5 0 1 1 0 0.01Z',
  cross: 'M0 0V2H2V1.75H.25V0Z',
  hatch: 'M0 0 V2H1V0Z',
  check: 'M0 0H1V2H2V1H0Z',
  strip: 'M.5 0H1.5L0 1.5V.5ZM2 .5V1.5L1.5 2H.5Z',
  love: 'M1.5 1.5 h-.8 a.3 .3 0 0 1 0 -.8 a.3 .3 0 0 1 .8 0 z',
  stix: 'M.375 .375h.25v.5h.25v-.5h.75v.25h-.5v.25h.5v.75h-.25v-.5h-.25v.5h-.75v-.25h.5v-.25h-.5',
  hound: 'M0 1l.2 -.2v-.6l.3 .3l.3 -.3v.6l.2 .2z M0 2l.2 -.2v-.6l.3 .3l.3 -.3v.6l.2 .2v-1h-1z M1 2l.2 -.2v-.6l.3 .3l.3 -.3v.6l.2 .2z M1 1l.2 -.2v-.6l.3 .3l.3 -.3v.6l.2 .2v-1h-1z',
  stars: 'M0.45 0.45l0.50 0.25l0.41 -0.40l-0.09 0.57l0.51 0.26l-0.57 0.08l-0.08 0.57l-0.26 -0.51l-0.57 0.09l0.40 -0.41 z',
  scales: 'M0 2V1.8A1.5 1.5 0 0 1 1.6 1.6A1.5 1.5 0 0 1 1.8 0H2V.2A1.3 1.3 0 0 0 2 1.8V2H1.8A1.3 1.3 0 0 0 .2 2ZM0 .2A1.3 1.3 0 0 1 .2 0H0Z',
  plaid: 'M0 0h1v.2l.2 -.2h.2l-.4 .4v.2l.6 -.6h.2l-.8 .8 v.2l1 -1v.2l-.8 .8h-.2 l-1 1v-.2l.8 -.8h-.2l-.6 .6v-.2l.4 -.4h-.2l-.2 .2zM.4 2h-.2l.8 -.8v.2zM.8 2h-.2l.4 -.4v.2zM1.6 1h-.2l.6 -.6v.2zM2 .8v.2h-.2z',
  clueless: `
     M.8 .8h.1l-.1 -.1v-.1l.2 .2h.1l-.3 -.3v-.1l.4 .4
     h.1l.4 .4h-.1l-.4 -.4v.1l.3 .3h-.1l-.2 -.2v.1l.1 .1h-.1
     v.1l-.1 -.1h-.1l.2 .2v.1l-.3 -.3h-.1l.4 .4v.1l-.4 -.4v-.1
     l-.4 -.4h.1l.3 .3v-.1l-.2 -.2h.1l.1 .1z

     M.1 .1h.7l.4 .4v-.1l-.3 -.3h.1l.2 .2v-.1l-.1 -.1h.8 
     v.7h-.1l.1 .1v.1l-.2 -.2h-.1l.3 .3v.1l-.4 -.4h-.1l.4 .4h.1v.7
     h-.7v-.1l-.4 -.4v.1l.4 .4h-.1l-.3 -.3v.1l.2 .2h-.1l-.1 -.1v.1h-.7v-.8
     l.1 .1h.1l-.2 -.2v-.1l.3 .3h.1l-.4 -.4
     L.1 .1L0 0V2H2V0H0z

     M.2 .8h.1l.4 .4h-.1z
     M.8 .3v-.1l.4 .4v.1z

  `
};

const makePath = (d, f) => `<path d="${d}" fill="${f}" fill-rule="evenodd" />`;

const MIG = (defs, [id, url, scl]) => defs.insertAdjacentHTML('beforeend',
  `<pattern id="${id}" width="1" height="1">
    <image href="${url}" transform="scale(${scl || 1})" />
   </pattern>`
);

const PAT = (
  defs, [id, typ, ...opts],
  [scl = 1.3, rot = 45] = [...opts.filter(a => !isNaN(Number(a)))],
  [col = 'currentColor', bak] = [...opts.filter(a => CSS.supports('color', a))]
) => defs.insertAdjacentHTML('beforeend',
  `<pattern id="${id}" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(${rot}) scale(${scl})">` +
  (bak ? makePath("M0 0H2V2H0Z", bak) : '') +
  makePath(
    (/^x/i.test(typ) ? (typ = typ.replace(/^x/i, ''), 'M0 0H2V2H0Z') : '') +
    (allDs[typ] || typ), col
  ) +
  `</pattern>`
);

const makeURL = (defs, id, fill) => (/^ima?g\w*\(/.test(fill) ? (MIG(defs, [id, ...(fill.match(/\((.*)\)$/)[1].split(/,/))]), `url(#${id})`) : /^pat\w*\(/.test(fill) ? (PAT(defs, [id, ...(fill.match(/\((.*)\)$/)[1].split(/,(?![^(]*\))/))]), `url(#${id})`) : fill);
const makeID = v => btoa(encodeURIComponent(v)).replace(/[+/=]/g, '_');

const handleFill = obj => {

  const fill = obj.getAttribute('fill');

  const defs = obj.closest?.('svg')?.querySelector(`[data-${prefs.fix}]`);

  if (!/^(?:pat|ima?g)\w*\(/i.test(fill) || !defs) return;

  const id = obj.localName === 'pattern' ? obj.id : makeID(fill);

  obj.setAttribute('fill',
    defs.querySelector(`#${id}`)
      ? `url(#${id})`
      : makeURL(defs, id, fill)
  );

  if (id === obj.id) obj.remove();

};

const handleNode = n => {
  if (n.nodeType !== 1) return;
  if (n.localName === 'svg') processSVG(n);
  n.querySelectorAll?.('svg').forEach(processSVG);
  if (n.getAttribute('fill')) handleFill(n);
};

const processSVG = svg => {

  const defs = svg.querySelector(`[data-${prefs.fix}]`) ||
    svg.appendChild(document.createElementNS(prefs.svgNS, 'defs'));

  defs.setAttribute(`data-${prefs.fix}`, '');

  svg.querySelectorAll('[fill]').forEach(handleFill);
};

document.querySelectorAll('svg, object[type="image/svg+xml"]').forEach(obj => {
  obj.addEventListener('load', () => {
    processSVG(obj.contentDocument?.querySelector('svg') || obj);
  });
});

const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'attributes') handleFill(m.target);
    else m.addedNodes.forEach(handleNode);
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['fill']
});

