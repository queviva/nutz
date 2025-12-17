// ======= utilities & prefs (unchanged) =======
const log = console.log;

const default_prefs = {
  prefix : 'nutz',
  fill: 'hsla(40,100%,50%,1)',
  stroke: 'purple',
  'stroke-width' : '3px'
};

const NS = "http://www.w3.org/2000/svg";
const JPAR = v => JSON.parse(`{${v||''}}`);

const script_element = [...document.scripts].find(
  s => s.src && new URL(s.src, document.baseURI).href === import.meta.url
);

const app_prefs = {
  ...default_prefs,
  ...JPAR(script_element?.dataset?.prefs)
};

const createNS = (tag, attrs = {}, styles = {}) => {
  const el = document.createElementNS(NS, tag);
  for (const [key, val] of Object.entries(attrs)) el.setAttribute(key, val);
  for (const [key, val] of Object.entries(styles)) el.style.setProperty(key, val);
  return el;
};

// ======= base class =======
class NutClass extends HTMLElement {
  #prefs = {};

  constructor() {
    super();
    // start with app prefs overridden by attributes of the same name
    for (const [key, val] of Object.entries(app_prefs)) {
      this.#prefs[key] = this.hasAttribute(key) ? this.getAttribute(key) : val;
    }
  }

  connectedCallback() {
    // Defer to let styles settle; prevents empty computed values on slow CSS load.
    queueMicrotask(() => this._mergeComputedVarsIntoPrefs());
  }

  _mergeComputedVarsIntoPrefs() {
    const cs = getComputedStyle(this);
    // Only consider keys defined in app_prefs (you can change this list)
    for (const key of Object.keys(app_prefs)) {
      const varName = `--${key}`;
      const cssVal = cs.getPropertyValue(varName).trim();
      if (cssVal) {
        // CSS variable present on this element (via page stylesheet or inline)
        this.#prefs[key] = cssVal;
      }
      // ensure final value is set inline so it's explicit and accessible
      if (this.#prefs[key] != null) this.style.setProperty(varName, this.#prefs[key]);
    }
    // hook for subclasses
    if (typeof this.onPrefsReady === 'function') this.onPrefsReady();
  }

  // helper to let subclasses update a single pref and write the inline var
  _setPrefAndVar(name, value) {
    this.#prefs[name] = value;
    this.style.setProperty(`--${name}`, value);
  }

  get prefs() { return this.#prefs; }
}

// ======= NutTag =======
class NutTag extends NutClass {
  #svg;
  #arcs = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback?.();

    // build shadow DOM (style uses CSS vars)
    this.#svg = createNS('svg', {
      viewBox: '-100 -100 200 200',
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'none'
    });

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; }
      :host([disabled]) { pointer-events: none; }
      svg { overflow: visible; width:100%; height:100%; }
      path {
        fill: var(--fill, ${this.prefs.fill});
        stroke: var(--stroke, ${this.prefs.stroke});
        stroke-width: var(--stroke-width, ${this.prefs['stroke-width']});
      }
    `;

    // append once
    if (!this.shadowRoot.querySelector('svg')) {
      this.shadowRoot.append(style, this.#svg);
    }
  }

  addArc(arc) {
    if (!arc.path || this.#arcs.has(arc)) return;
    // copy current inline --vars from arc to path (fast loop over arc.style)
    for (let i = 0; i < arc.style.length; i++) {
      const prop = arc.style[i];
      if (prop.startsWith('--')) {
        const val = arc.style.getPropertyValue(prop);
        arc.path.style.setProperty(prop, val);
      }
    }
    this.#arcs.set(arc, arc.path);
    this.#svg.appendChild(arc.path);
  }

  removeArc(arc) {
    const path = this.#arcs.get(arc);
    if (!path) return;
    path.remove();
    this.#arcs.delete(arc);
  }

  // optional: allow arc to notify parent that one of its vars changed
  updateArcVars(arc, name, value) {
    const path = this.#arcs.get(arc);
    if (!path) return;
    path.style.setProperty(`--${name}`, value);
  }
}

// ======= NutArc =======
class NutArc extends NutClass {
  #path;

  static get observedAttributes() { return ['fill', 'stroke', 'stroke-width']; }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback?.();

    // create path (no fill yet)
    this.#path = createNS('path', { d: 'M0 0H100V100Z' });

    // ensure inline vars exist (base class wrote them; if not, write from prefs)
    for (const key of Object.keys(app_prefs)) {
      const varName = `--${key}`;
      const existing = this.style.getPropertyValue(varName).trim();
      if (!existing && this.prefs[key] != null) {
        this.style.setProperty(varName, this.prefs[key]);
      }
    }

    // copy the inline vars onto the path before handing to parent
    for (let i = 0; i < this.style.length; i++) {
      const prop = this.style[i];
      if (prop.startsWith('--')) {
        const val = this.style.getPropertyValue(prop);
        this.#path.style.setProperty(prop, val);
      }
    }

    // ask parent to adopt this path
    const parent = this.closest(`${this.prefs.prefix}-tag`);
    parent?.addArc(this);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    // attributes overwrite prefs for this instance
    const v = newVal ?? oldVal;
    this._setPrefAndVar(name, v); // writes this.prefs and inline --var

    // update path inline var right away
    if (this.#path) {
      this.#path.style.setProperty(`--${name}`, v);
    }

    // notify parent to update its copy if needed
    const parent = this.closest(`${this.prefs.prefix}-tag`);
    parent?.updateArcVars?.(this, name, v);
  }

  get path() { return this.#path; }
}

// ======= register =======
try {
  customElements.define(`${app_prefs.prefix}-tag`, NutTag);
  customElements.define(`${app_prefs.prefix}-arc`, NutArc);
} catch (err) {
  console.warn(err);
}
