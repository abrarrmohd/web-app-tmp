/**
 * Hand-drawn illustrations: pen-and-ink line work with loose watercolour washes.
 *
 * Every drawing is routed through the SVG filters in <InkFilters />, which wobble the
 * lines slightly and bleed the washes, so nothing looks machine-perfect. Washes are
 * deliberately offset from their outlines, the way colour lands when painted by hand.
 */

export const INK = '#2b3a2f';
export const INK_SOFT = '#5d6b5f';
export const OXBLOOD = '#8f1d3f';
export const TERRACOTTA = '#ec6f45';
export const ROSE = '#ef7f95';
export const SAGE = '#6fb277';
export const OCHRE = '#f2a52b';
export const SAND = '#f3d9a8';
// Festive accents
export const MAGENTA = '#d6337a';
export const MARIGOLD = '#f89a1c';
export const PEACOCK = '#1b8e94';
export const EMERALD = '#2f9a62';
export const FLAME = '#ffd66b';

/** Rendered once in the layout; referenced by id from every drawing. */
export function InkFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {/* Pen line: a gentle tremor */}
        <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Finer tremor for long thin rules, so they don't break apart */}
        <filter id="ink-fine" x="-5%" y="-2%" width="110%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Watercolour: blotchy, bleeding edges */}
        <filter id="wash" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="11" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="22" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" />
        </filter>
        {/* Torn cotton-paper edge */}
        <filter id="deckle" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="4" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Wax: soft, uneven pour */}
        <filter id="wax" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="21" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function Wash({ d, fill, opacity = 0.45, dx = 2, dy = 2 }: { d: string; fill: string; opacity?: number; dx?: number; dy?: number }) {
  return <path d={d} fill={fill} stroke="none" opacity={opacity} filter="url(#wash)" transform={`translate(${dx} ${dy})`} />;
}

const LEAF = 'M0 0 C6 -5 16 -5 22 0 C16 5 6 5 0 0 Z';

function Leaf({ x, y, rot, s = 1, tint = SAGE }: { x: number; y: number; rot: number; s?: number; tint?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={LEAF} fill={tint} stroke="none" opacity="0.5" filter="url(#wash)" transform="translate(1.5 1)" />
      <path d={LEAF} fill="none" />
      <path d="M2 0 C8 -0.6 14 -0.6 19 0" fill="none" strokeWidth="0.6" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Arch geometry                                                       */
/* ------------------------------------------------------------------ */

type Pt = [number, number];
type Bez = [Pt, Pt, Pt, Pt];
const f = ([x, y]: Pt) => `${x.toFixed(1)} ${y.toFixed(1)}`;

function bezier(t: number, [p0, c1, c2, p3]: Bez): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1],
  ];
}

function pointedArch(b: Bez, width: number, base: number) {
  const m = ([x, y]: Pt): Pt => [width - x, y];
  const [p0, c1, c2, p3] = b;
  return `M${f([p0[0], base])} L${f(p0)} C${f(c1)} ${f(c2)} ${f(p3)} C${f(m(c2))} ${f(m(c1))} ${f(m(p0))} L${f([width - p0[0], base])}`;
}

/** Multifoil arch: lobes of equal length along the curve, deep like Shah Jahan's arches. */
function cuspedArch(b: Bez, width: number, base: number, lobes: number) {
  const m = ([x, y]: Pt): Pt => [width - x, y];
  const samples = Array.from({ length: 161 }, (_, k) => bezier(k / 160, b));
  const len = [0];
  for (let k = 1; k < samples.length; k++) {
    len.push(len[k - 1] + Math.hypot(samples[k][0] - samples[k - 1][0], samples[k][1] - samples[k - 1][1]));
  }
  const left: Pt[] = [];
  for (let j = 0, k = 0; j <= lobes; j++) {
    const target = (len[len.length - 1] * j) / lobes;
    while (k < len.length - 1 && len[k] < target) k++;
    left.push(samples[k]);
  }
  const pts = [...left, ...left.slice(0, -1).reverse().map(m)];
  let d = `M${f([b[0][0], base])} L${f(pts[0])}`;
  for (let k = 1; k < pts.length; k++) {
    const r = (Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]) * 0.54).toFixed(1);
    d += ` A${r} ${r} 0 0 1 ${f(pts[k])}`;
  }
  return `${d} L${f([width - b[0][0], base])}`;
}

/* ------------------------------------------------------------------ */
/* The mihrab                                                          */
/* ------------------------------------------------------------------ */

const HEAD_W = 400;
const HEAD_H = 230;
const INTRADOS: Bez = [[34, 168], [34, 104], [140, 62], [200, 46]];
const EXTRADOS: Bez = [[24, 168], [24, 94], [134, 46], [200, 28]];

/** Upper part of the mihrab: frame, cusped arch, spandrel flowers and the hanging lamp. */
export function MihrabHead({ className = '' }: { className?: string }) {
  // Wash stops short of the head's bottom edge and curves off, so it bleeds out naturally.
  const opening = `${pointedArch(INTRADOS, HEAD_W, 196)} Q200 214 ${INTRADOS[0][0]} 196 Z`;
  return (
    <svg viewBox={`0 0 ${HEAD_W} ${HEAD_H}`} className={className} aria-hidden="true">
      {/* washes first so ink sits on top */}
      <Wash d={opening} fill={SAGE} opacity={0.15} dx={5} dy={4} />
      <g opacity="0.45">
        <circle cx="203" cy="142" r="32" fill={FLAME} filter="url(#wash)" className="animate-glow" />
      </g>
      <g opacity="0.8">
        <circle cx="203" cy="140" r="13" fill="#fff3c4" filter="url(#wash)" className="animate-glow" />
      </g>

      <g fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        {/* alfiz frame and cornice */}
        <path d="M3 230 V9 H397 V230" />
        <path d="M9 230 V15 H391 V230" strokeWidth="0.6" />
        <path d="M20 9 V15 M44 9 V15 M68 9 V15 M92 9 V15 M116 9 V15 M140 9 V15 M164 9 V15 M188 9 V15 M212 9 V15 M236 9 V15 M260 9 V15 M284 9 V15 M308 9 V15 M332 9 V15 M356 9 V15 M380 9 V15" strokeWidth="0.5" />

        {/* arch: smooth extrados, cusped intrados */}
        <path d={pointedArch(EXTRADOS, HEAD_W, HEAD_H)} strokeWidth="1" />
        <path d={cuspedArch(INTRADOS, HEAD_W, HEAD_H, 5)} strokeWidth="1.3" />
        <path d="M200 28 C197 22 197 18 200 13 C203 18 203 22 200 28 Z" strokeWidth="0.8" />

        {/* left spandrel: iris and buds */}
        <path d="M13 158 C18 112 30 74 68 48 C98 28 132 21 170 20" strokeWidth="0.8" />
        <path d="M44 72 C40 60 42 50 50 44" strokeWidth="0.7" />
        <path d="M112 25 C118 32 122 36 128 38" strokeWidth="0.7" />
      </g>

      <g fill="none" stroke={INK} strokeWidth="0.8" filter="url(#ink)">
        <Leaf x={20} y={124} rot={-72} s={0.9} />
        <Leaf x={32} y={92} rot={-40} s={0.8} />
        <Leaf x={92} y={31} rot={-16} s={0.85} />
        <Leaf x={140} y={22} rot={12} s={0.7} />
        {/* iris */}
        <g transform="translate(68 48)">
          <path d="M-7 -2 C-12 -12 -8 -22 0 -26 C8 -22 12 -12 7 -2" fill={ROSE} fillOpacity="0.45" filter="url(#wash)" transform="translate(2 1)" stroke="none" />
          <path d="M0 0 C-4 -8 -3 -18 0 -24 C3 -18 4 -8 0 0 Z" />
          <path d="M0 -2 C-8 -6 -14 -4 -16 2 C-10 4 -4 2 0 -2 Z" />
          <path d="M0 -2 C8 -6 14 -4 16 2 C10 4 4 2 0 -2 Z" />
        </g>
        {/* buds and berries */}
        <path d="M170 20 C174 16 180 16 182 20 C178 23 173 23 170 20 Z" fill={TERRACOTTA} fillOpacity="0.35" />
        <circle cx="50" cy="42" r="2.2" fill={TERRACOTTA} fillOpacity="0.4" />
        <circle cx="54" cy="46" r="1.6" />
        <circle cx="130" cy="39" r="2" fill={ROSE} fillOpacity="0.5" />
      </g>

      {/* right spandrel: a poppy on a different stem, not a mirror of the left */}
      <g fill="none" stroke={INK} strokeWidth="0.8" strokeLinecap="round" filter="url(#ink)">
        <path d="M388 160 C385 120 372 86 338 60 C310 40 276 27 236 22" />
        <path d="M358 84 C366 76 372 70 380 70" strokeWidth="0.7" />
        <path d="M290 33 C286 40 284 44 278 48" strokeWidth="0.7" />
        <Leaf x={384} y={128} rot={-108} s={0.85} />
        <Leaf x={366} y={100} rot={-140} s={0.75} />
        <Leaf x={300} y={36} rot={188} s={0.8} />
        <Leaf x={256} y={23} rot={176} s={0.6} />
        <g transform="translate(334 58)">
          <circle r="11" fill={TERRACOTTA} opacity="0.4" filter="url(#wash)" transform="translate(2 2)" stroke="none" />
          <path d="M0 -10 C6 -12 11 -6 9 0 C12 5 6 11 0 9 C-6 12 -11 6 -9 0 C-12 -5 -6 -11 0 -10 Z" />
          <circle r="3" fill={INK} fillOpacity="0.7" />
          <path d="M-1.5 -1.5 L-4 -4 M1.5 -1.5 L4 -4 M0 2 V5" strokeWidth="0.5" />
        </g>
        <circle cx="382" cy="70" r="2.4" fill={ROSE} fillOpacity="0.5" />
        <path d="M278 48 C274 46 272 50 274 53 C277 54 279 51 278 48 Z" fill={SAGE} fillOpacity="0.5" />
        <path d="M236 22 C232 18 226 19 225 23 C229 26 234 26 236 22 Z" />
      </g>

      {/* hanging mosque lamp: "a niche within which is a lamp" (24:35) */}
      <g fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d="M200 50 V104" strokeDasharray="3 2.2" strokeWidth="0.8" />
        <path d="M193 104 H207" />
        <path d="M195 104 C195 112 191 116 186 120 H214 C209 116 205 112 205 104" />
        <path d="M186 120 C170 125 169 146 184 156 H216 C231 146 230 125 214 120" fill={SAND} fillOpacity="0.5" />
        <path d="M176 136 H224" strokeWidth="0.6" />
        <path d="M188 136 v4 M196 136 v4 M204 136 v4 M212 136 v4" strokeWidth="0.5" />
        <path d="M190 156 C192 162 196 164 200 167 C204 164 208 162 210 156" />
        <path d="M186 124 C178 126 178 134 184 137 M214 124 C222 126 222 134 216 137" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

/** Capital of a Shah Jahani baluster column: leafy bracket under an abacus. */
export function ColumnCapital({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 40" className={className} aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="0.9" strokeLinecap="round" filter="url(#ink)">
        <path d="M1 1 H33 V6 H1 Z" />
        <path d="M12 40 C12 30 6 24 3 6 M22 40 C22 30 28 24 31 6" />
        <path d="M12 30 C8 26 7 20 9 14 M22 30 C26 26 27 20 25 14" strokeWidth="0.6" />
        <path d="M17 36 C14 28 14 18 17 8 C20 18 20 28 17 36 Z" strokeWidth="0.6" fill={SAGE} fillOpacity="0.35" />
      </g>
    </svg>
  );
}

/** Vase-shaped column base with a ring of leaves. */
export function ColumnBase({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 58" className={className} aria-hidden="true">
      <path d="M12 2 C10 12 3 18 4 30 C5 38 9 42 11 46 H23 C25 42 29 38 30 30 C31 18 24 12 22 2 Z" fill={SAND} opacity="0.55" filter="url(#wash)" />
      <g fill="none" stroke={INK} strokeWidth="0.9" strokeLinecap="round" filter="url(#ink)">
        <path d="M12 0 C10 12 3 18 4 30 C5 38 9 42 11 46 M22 0 C24 12 31 18 30 30 C29 38 25 42 23 46" />
        <path d="M8 22 C11 28 14 30 17 30 C20 30 23 28 26 22" strokeWidth="0.6" />
        <path d="M17 30 C14 24 14 18 17 12 C20 18 20 24 17 30 Z M9 30 C8 25 9 21 12 18 M25 30 C26 25 25 21 22 18" strokeWidth="0.6" />
        <path d="M7 46 H27 V50 H7 Z M2 50 H32 V57 H2 Z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Flowers                                                             */
/* ------------------------------------------------------------------ */

/** Flowering plant from the Taj Mahal dado panels: tulip, poppy and a bud on a small mound. */
export function FloweringPlant({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 112" className={className} aria-hidden="true">
      <circle cx="92" cy="22" r="13" fill={ROSE} opacity="0.5" filter="url(#wash)" />
      <circle cx="58" cy="50" r="8" fill={TERRACOTTA} opacity="0.4" filter="url(#wash)" />
      <path d="M88 100 C70 90 58 78 52 70 C66 76 80 84 88 96 Z M92 100 C112 92 124 82 132 72 C118 78 104 86 92 96 Z" fill={SAGE} opacity="0.5" filter="url(#wash)" transform="translate(2 2)" />
      <g fill="none" stroke={INK} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d="M22 106 C50 97 128 97 158 106" />
        <path d="M34 106 C60 102 120 102 146 106" strokeWidth="0.5" />
        <path d="M90 101 C91 80 88 58 90 34" />
        <path d="M90 34 C79 30 77 15 84 7 C86 15 88 21 90 24 C92 21 94 15 96 7 C103 15 101 30 90 34 Z" />
        <path d="M86 13 C88 5 92 5 94 13" strokeWidth="0.6" />
        <path d="M89 88 C77 80 64 70 58 54" />
        <path d="M58 44 C63 44 66 49 63 53 C60 57 54 56 53 52 C50 49 53 43 58 44 Z" />
        <circle cx="58" cy="49" r="1.6" fill={INK} />
        <path d="M91 80 C103 72 116 64 123 50" />
        <path d="M123 50 C119 46 120 40 125 38 C129 41 128 47 123 50 Z" fill={OCHRE} fillOpacity="0.35" />
        <path d="M88 100 C70 90 58 78 52 70 C66 76 80 84 88 96" />
        <path d="M92 100 C112 92 124 82 132 72 C118 78 104 86 92 96" />
        <path d="M89 64 C80 60 74 60 70 64 C76 67 84 67 89 64 Z" strokeWidth="0.7" />
        <path d="M91 56 C99 50 106 50 110 53 C104 57 97 58 91 56 Z" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

/** A loose sprig used between sections. Deliberately asymmetric. */
export function SprigDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 34" className="h-8 w-52 sm:h-9 sm:w-60">
        <circle cx="72" cy="15" r="7" fill={ROSE} opacity="0.5" filter="url(#wash)" />
        <circle cx="156" cy="18" r="4" fill={TERRACOTTA} opacity="0.4" filter="url(#wash)" />
        <g fill="none" stroke={INK} strokeWidth="0.8" strokeLinecap="round" filter="url(#ink)">
          <path d="M6 20 C30 14 50 22 72 17 C100 11 128 22 156 18 C176 15 196 12 214 16" />
          <Leaf x={34} y={17} rot={-28} s={0.7} />
          <Leaf x={48} y={20} rot={30} s={0.6} />
          <Leaf x={112} y={16} rot={-20} s={0.75} />
          <Leaf x={126} y={21} rot={24} s={0.55} />
          <Leaf x={186} y={14} rot={-12} s={0.55} />
          <path d="M72 17 C68 12 68 7 72 4 C76 7 76 12 72 17 Z M72 17 C66 15 62 11 63 7 C67 8 70 12 72 17 Z M72 17 C78 15 82 11 81 7 C77 8 74 12 72 17 Z" />
          <path d="M156 18 C153 15 154 11 157 10 C160 12 159 16 156 18 Z" />
          <circle cx="214" cy="16" r="1.4" fill={INK} />
          <circle cx="6" cy="20" r="1" fill={INK} />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

/** Line drawing of a minaret: three tiers, bracketed balconies, crowned by a chhatri. */
export function Minaret({ className = '', tilt = 0 }: { className?: string; tilt?: number }) {
  const brackets = (y: number, x0: number, x1: number) => {
    const n = 4;
    const step = (x1 - x0) / n;
    return Array.from({ length: n }, (_, i) => `M${x0 + i * step} ${y} Q${x0 + (i + 0.5) * step} ${y + 7} ${x0 + (i + 1) * step} ${y}`).join(' ');
  };
  return (
    <svg viewBox="0 0 70 560" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
      <g transform={`rotate(${tilt} 35 560)`}>
        <path d="M18 100 L52 100 L55 220 L15 220 Z M16 234 L54 234 L57 380 L13 380 Z M14 394 L56 394 L60 540 L10 540 Z" fill={SAND} opacity="0.5" filter="url(#wash)" transform="translate(3 2)" />
        <path d="M20 58 C14 44 28 34 35 22 C42 34 56 44 50 58 Z" fill={ROSE} opacity="0.35" filter="url(#wash)" />
        <g fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
          <path d="M35 2 V22" />
          <circle cx="35" cy="9" r="2.2" />
          <circle cx="35" cy="16" r="1.6" />
          <path d="M20 58 C14 44 28 34 35 22 C42 34 56 44 50 58 Z" />
          <path d="M14 58 H56 V63 H14 Z" />
          <path d="M18 63 V86 M35 63 V86 M52 63 V86" />
          <path d="M19 86 V76 Q26.5 66 34 76 V86 M36 86 V76 Q43.5 66 51 76 V86" strokeWidth="0.6" />
          <path d="M10 86 H60 V92 H10 Z" />
          <path d={brackets(92, 14, 56)} strokeWidth="0.7" />
          <path d="M18 100 L52 100 L55 220 L15 220 Z" />
          <path d="M19 134 H27 M42 150 H52 M17 188 H24 M45 200 H54" strokeWidth="0.5" />
          <path d="M31 172 V160 Q35 152 39 160 V172" strokeWidth="0.7" />
          <path d="M8 220 H62 V226 H8 Z" />
          <path d={brackets(226, 12, 58)} strokeWidth="0.7" />
          <path d="M16 234 L54 234 L57 380 L13 380 Z" />
          <path d="M16 270 H24 M44 290 H55 M15 336 H22 M46 352 H56" strokeWidth="0.5" />
          <path d="M30 318 V304 Q35 295 40 304 V318" strokeWidth="0.7" />
          <path d="M6 380 H64 V386 H6 Z" />
          <path d={brackets(386, 10, 60)} strokeWidth="0.7" />
          <path d="M14 394 L56 394 L60 540 L10 540 Z" />
          <path d="M14 430 H22 M46 452 H57 M12 494 H20 M48 510 H58" strokeWidth="0.5" />
          <path d="M29 480 V464 Q35 454 41 464 V480" strokeWidth="0.7" />
          <path d="M4 540 H66 V559 H4 Z" />
          <path d="M4 548 H66" strokeWidth="0.5" />
        </g>
      </g>
    </svg>
  );
}

/** Pen sketch of the Taj Mahal with a watercolour sky and a few strokes of water. */
export function TajSketch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 330" className={className} aria-hidden="true">
      <ellipse cx="300" cy="110" rx="190" ry="80" fill={ROSE} opacity="0.28" filter="url(#wash)" />
      <ellipse cx="380" cy="80" rx="90" ry="40" fill={OCHRE} opacity="0.18" filter="url(#wash)" />
      <path d="M40 290 H560 V300 H40 Z" fill={SAGE} opacity="0.4" filter="url(#wash)" />
      <path d="M256 128 C212 92 250 52 300 30 C350 52 388 92 344 128 Z" fill={SAND} opacity="0.6" filter="url(#wash)" transform="translate(4 3)" />

      <g fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink-fine)">
        {[
          [64, -0.6],
          [536, 0.5],
        ].map(([x, tilt]) => (
          <g key={x} transform={`rotate(${tilt} ${x} 270)`}>
            <path d={`M${x - 6} 270 L${x - 4.5} 118 L${x + 4.5} 118 L${x + 6} 270`} />
            <path d={`M${x - 8} 112 H${x + 8} V116 H${x - 8} Z M${x - 8} 165 H${x + 8} M${x - 9} 218 H${x + 9}`} />
            <path d={`M${x - 5} 112 V102 M${x + 5} 112 V102`} />
            <path d={`M${x - 7} 102 C${x - 8} 94 ${x - 2} 90 ${x} 84 C${x + 2} 90 ${x + 8} 94 ${x + 7} 102 Z M${x} 84 V76`} />
          </g>
        ))}
        <path d="M30 270 H570 M30 280 H570" />
        {[208, 392].map((x) => (
          <g key={x}>
            <path d={`M${x - 11} 150 V134 M${x + 11} 150 V134 M${x} 150 V134`} />
            <path d={`M${x - 13} 131 H${x + 13} V134 H${x - 13} Z`} />
            <path d={`M${x - 12} 131 C${x - 14} 118 ${x - 3} 112 ${x} 104 C${x + 3} 112 ${x + 14} 118 ${x + 12} 131 Z M${x} 104 V96`} />
          </g>
        ))}
        <path d="M252 128 H348 V150 H252 Z" />
        <path d="M256 128 C212 92 250 52 300 30 C350 52 388 92 344 128" />
        <path d="M300 30 V10" />
        <path d="M296 10 A5 5 0 1 0 304 10" />
        <path d="M180 270 V156 L194 150 H406 L420 156 V270" />
        <path d="M258 270 V150 M342 270 V150" />
        <path d="M270 270 V206 C270 186 290 176 300 162 C310 176 330 186 330 206 V270" />
        {[204, 232, 368, 396].map((x) => (
          <path
            key={x}
            d={`M${x - 10} 208 V184 C${x - 10} 176 ${x - 3} 172 ${x} 166 C${x + 3} 172 ${x + 10} 176 ${x + 10} 184 V208 M${x - 10} 264 V242 C${x - 10} 234 ${x - 3} 230 ${x} 224 C${x + 3} 230 ${x + 10} 234 ${x + 10} 242 V264`}
            strokeWidth="0.8"
          />
        ))}
        {/* water */}
        <path d="M120 300 H200 M260 306 H360 M410 300 H470 M180 314 H240 M330 318 H420 M280 326 H320" strokeWidth="0.6" />
        {/* birds */}
        <path d="M120 60 q5 -5 10 0 q5 -5 10 0 M150 44 q4 -4 8 0 q4 -4 8 0 M468 70 q4 -4 8 0 q4 -4 8 0" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stationery                                                          */
/* ------------------------------------------------------------------ */

// Irregular pour: a few mismatched harmonics so no two edges repeat.
const SEAL_PATH = (() => {
  const pts: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const t = (deg * Math.PI) / 180;
    const r = 45 + 3.2 * Math.sin(t * 3 + 0.7) + 2.1 * Math.sin(t * 7 + 2.1) + 1.2 * Math.sin(t * 13);
    pts.push(`${(50 + r * Math.cos(t)).toFixed(1)} ${(50 + r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
})();

/** Matte oxblood wax seal pressed with the couple's initials. */
export function WaxSeal({ initials, className = '' }: { initials: [string, string]; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g filter="url(#wax)">
        <path d={SEAL_PATH} fill="#6e2222" />
        <path d={SEAL_PATH} fill="#8a3030" transform="translate(50 50) scale(0.93) translate(-50 -50) translate(-1 -1.5)" />
        <circle cx="50" cy="51" r="31" fill="#6a2020" />
        <circle cx="49.5" cy="50" r="30" fill="#7f2b2b" />
        <circle cx="49.5" cy="50" r="26" fill="none" stroke="#5e1b1b" strokeWidth="0.8" strokeDasharray="2 1.6" />
      </g>
      <text x="49.5" y="58" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="23" fill="#551818">
        {initials[0]}
        <tspan fontSize="13" dy="-3" dx="1">&amp;</tspan>
        <tspan dy="3" dx="1">{initials[1]}</tspan>
      </text>
      <text x="49" y="57.2" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="23" fill="#a24a45" opacity="0.5">
        {initials[0]}
        <tspan fontSize="13" dy="-3" dx="1">&amp;</tspan>
        <tspan dy="3" dx="1">{initials[1]}</tspan>
      </text>
      <path d="M26 30 C30 24 36 20 42 19" stroke="#c9716b" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.35" />
    </svg>
  );
}

/** A dried sprig of baby's breath tucked under the seal. */
export function DriedSprig({ className = '' }: { className?: string }) {
  const buds: Pt[] = [[56, 10], [62, 16], [48, 14], [70, 8], [66, 24], [40, 20], [76, 18], [58, 28], [52, 4]];
  return (
    <svg viewBox="0 0 90 70" className={className} aria-hidden="true">
      <g fill="none" stroke="#8a7a58" strokeWidth="0.8" strokeLinecap="round" filter="url(#ink)">
        <path d="M4 66 C20 52 36 38 56 20" />
        <path d="M30 44 C36 34 42 26 48 14 M40 34 C50 30 58 26 70 8 M46 28 C56 28 64 26 76 18 M36 40 C44 38 52 34 66 24 M50 24 C52 18 52 10 52 4" strokeWidth="0.6" />
        <Leaf x={18} y={56} rot={-40} s={0.6} tint={SAGE} />
        <Leaf x={24} y={50} rot={-80} s={0.5} tint={SAGE} />
      </g>
      {buds.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.8} fill="#f4ecdc" stroke="#b9a882" strokeWidth="0.5" />
      ))}
    </svg>
  );
}

/** Postage stamp with perforated edges and a tiny minaret. */
export function PostageStamp({ className = '' }: { className?: string }) {
  const holes: Pt[] = [];
  for (let x = 4; x <= 66; x += 6.2) holes.push([x, 0], [x, 84]);
  for (let y = 4; y <= 80; y += 6.2) holes.push([0, y], [70, y]);
  return (
    <svg viewBox="0 0 70 84" className={className} aria-hidden="true">
      <defs>
        <mask id="stamp-perf">
          <rect width="70" height="84" fill="#fff" />
          {holes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill="#000" />
          ))}
        </mask>
      </defs>
      <rect width="70" height="84" fill="#f6efe2" mask="url(#stamp-perf)" />
      <rect x="7" y="7" width="56" height="70" fill={SAGE} opacity="0.35" filter="url(#wash)" />
      <g fill="none" stroke={OXBLOOD} strokeWidth="0.8" strokeLinecap="round" filter="url(#ink)">
        <rect x="7" y="7" width="56" height="70" />
        <path d="M22 62 V36 C22 26 30 22 35 14 C40 22 48 26 48 36 V62" />
        <path d="M28 62 V42 C28 36 32 33 35 29 C38 33 42 36 42 42 V62" strokeWidth="0.6" />
        <path d="M14 62 H56" />
      </g>
      <text x="35" y="72" textAnchor="middle" fontFamily="EB Garamond, serif" fontSize="6.5" letterSpacing="1.2" fill={OXBLOOD}>
        INDIA
      </text>
      <text x="14" y="18" fontFamily="EB Garamond, serif" fontSize="7" fill={OXBLOOD}>
        ₹25
      </text>
    </svg>
  );
}

/** Circular postmark with wavy cancellation lines. */
export function Postmark({ className = '', text }: { className?: string; text: string }) {
  return (
    <svg viewBox="0 0 130 70" className={className} aria-hidden="true">
      <defs>
        <path id="postmark-ring" d="M35 35 m-21 0 a21 21 0 1 1 42 0 a21 21 0 1 1 -42 0" />
      </defs>
      <g fill="none" stroke={INK_SOFT} strokeWidth="1" opacity="0.65" filter="url(#ink)">
        <circle cx="35" cy="35" r="28" />
        <circle cx="35" cy="35" r="15" />
        <path d="M66 22 q8 -5 16 0 t16 0 t16 0 t16 0 M66 31 q8 -5 16 0 t16 0 t16 0 t16 0 M66 40 q8 -5 16 0 t16 0 t16 0 t16 0 M66 49 q8 -5 16 0 t16 0 t16 0 t16 0" />
      </g>
      <text fontFamily="EB Garamond, serif" fontSize="6.4" letterSpacing="1.3" fill={INK_SOFT} opacity="0.75">
        <textPath href="#postmark-ring">{text}</textPath>
      </text>
      <text x="35" y="38" textAnchor="middle" fontFamily="EB Garamond, serif" fontSize="7.5" fill={INK_SOFT} opacity="0.75">
        2026
      </text>
    </svg>
  );
}

/** Small cusped arch window, printed at the top of each invitation card. */
export function SmallArch({ className = '', stroke = INK, tint = SAGE }: { className?: string; stroke?: string; tint?: string }) {
  const intra: Bez = [[18, 62], [18, 36], [52, 22], [70, 14]];
  const extra: Bez = [[10, 62], [10, 30], [48, 12], [70, 4]];
  return (
    <svg viewBox="0 0 140 100" className={className} aria-hidden="true">
      <Wash d={`${pointedArch(intra, 140, 80)} Q70 92 18 80 Z`} fill={tint} opacity={0.3} dx={4} dy={2} />
      <g fill="none" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" filter="url(#ink)">
        <path d={pointedArch(extra, 140, 100)} />
        <path d={cuspedArch(intra, 140, 100, 4)} strokeWidth="1.1" />
        <path d="M70 4 C68 0 68 -2 70 -5" />
        <path d="M2 100 H138" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
