/**
 * Background decoration and gentle motion, in the same ink-and-watercolour hand as ink.tsx:
 * coloured-glass lanterns, jasmine strings and flower clusters, a drifting star lattice,
 * falling petals, and sprays of roses, marigolds and jasmine.
 */
import { EMERALD, FLAME, INK, INK_SOFT, MAGENTA, MARIGOLD, OCHRE, PEACOCK, ROSE, SAGE, TERRACOTTA } from '@/components/ink';

const JASMINE = '#fffcf3';

/* ------------------------------------------------------------------ */
/* Flowers                                                             */
/* ------------------------------------------------------------------ */

const LEAF = 'M0 0 C6 -5 16 -5 22 0 C16 5 6 5 0 0 Z';

function SprayLeaf({ x, y, rot, s = 1, tint = SAGE }: { x: number; y: number; rot: number; s?: number; tint?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={LEAF} fill={tint} stroke="none" opacity="0.75" filter="url(#wash)" transform="translate(1.5 1.5)" />
      <path d={LEAF} fill="none" />
      <path d="M2 0 C8 -0.6 14 -0.6 19 0" fill="none" strokeWidth="0.5" />
    </g>
  );
}

/** Sketched garden rose: a loose spiral inside a cupped outline. */
export function SketchRose({ x, y, s = 1, tint = ROSE }: { x: number; y: number; s?: number; tint?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="13" fill={tint} stroke="none" opacity="0.8" filter="url(#wash)" transform="translate(2 2)" />
      <circle r="6" fill={MAGENTA} stroke="none" opacity="0.45" filter="url(#wash)" />
      <path d="M0 -3 C3 -3 4 0 2 2 C0 4 -4 3 -4 0 C-4 -5 2 -8 6 -5 C10 -2 9 5 4 8 C-2 11 -10 7 -10 0 C-10 -8 -3 -13 5 -12" fill="none" />
      <path d="M-11 2 C-12 8 -6 13 0 13 C7 13 12 8 11 1" fill="none" />
    </g>
  );
}

/** Marigold (genda): a frilly ball of ruffled petals. */
export function Marigold({ x, y, s = 1, tint = MARIGOLD }: { x: number; y: number; s?: number; tint?: string }) {
  const frill = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const r = i % 2 ? 9 : 11;
    return `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="11.5" fill={tint} stroke="none" opacity="0.9" filter="url(#wash)" transform="translate(1.5 1.5)" />
      <circle r="6" fill="#ffc542" stroke="none" opacity="0.8" filter="url(#wash)" />
      <path d={`M${frill.join(' L')} Z`} fill="none" />
      <path d="M-5 -2 q2 -3 5 -2 q3 -1 5 2 M-4 3 q2 2 4 1 q2 1 4 -1" fill="none" strokeWidth="0.5" />
    </g>
  );
}

/** Five narrow petals, white: a jasmine (mogra) flower. */
function Jasmine({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M0 0 C2 -2 2.4 -6 0 -8.5 C-2.4 -6 -2 -2 0 0 Z" transform={`rotate(${a})`} fill={JASMINE} strokeWidth="0.5" />
      ))}
      <circle r="1.2" fill={MARIGOLD} stroke="none" />
    </g>
  );
}

/** A loose spray of roses, marigolds and jasmine, drawn for the top-left corner. Flip with CSS for other corners. */
export function FloralSpray({ className = '', ink = INK }: { className?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g fill="none" stroke={ink} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d="M-4 8 C40 30 70 62 88 108 C98 136 102 168 98 212" />
        <path d="M8 -4 C50 18 110 30 172 24" />
        <path d="M52 44 C70 40 84 44 100 56 M78 84 C60 92 48 104 42 122 M94 150 C108 156 118 166 124 182 M130 27 C140 40 146 50 150 64 M20 12 C26 30 34 44 46 54" strokeWidth="0.6" />
        <SprayLeaf x={22} y={20} rot={30} s={0.9} />
        <SprayLeaf x={60} y={54} rot={60} s={0.8} tint={EMERALD} />
        <SprayLeaf x={94} y={128} rot={80} s={0.9} />
        <SprayLeaf x={98} y={182} rot={100} s={0.7} tint={EMERALD} />
        <SprayLeaf x={70} y={22} rot={-10} s={0.75} />
        <SprayLeaf x={140} y={24} rot={0} s={0.8} tint={EMERALD} />
        <SprayLeaf x={42} y={122} rot={120} s={0.7} />
        <SprayLeaf x={112} y={36} rot={-30} s={0.6} />
        <g stroke={ink === INK ? INK_SOFT : ink}>
          <Jasmine x={100} y={56} s={1.1} rot={10} />
          <Jasmine x={110} y={62} s={0.8} rot={40} />
          <Jasmine x={150} y={66} s={0.9} />
          <Jasmine x={124} y={182} s={1} rot={20} />
          <Jasmine x={36} y={32} s={0.8} rot={-20} />
          <ellipse cx="46" cy="126" rx="2" ry="3.4" fill={JASMINE} transform="rotate(30 46 126)" strokeWidth="0.5" />
          <ellipse cx="116" cy="170" rx="2" ry="3.4" fill={JASMINE} transform="rotate(-20 116 170)" strokeWidth="0.5" />
        </g>
        <Marigold x={46} y={56} s={0.8} />
        <Marigold x={98} y={212} s={0.7} tint={TERRACOTTA} />
        <SketchRose x={88} y={108} tint={MAGENTA} />
        <SketchRose x={172} y={24} s={0.75} />
        <SketchRose x={148} y={70} s={0.5} tint={ROSE} />
      </g>
    </svg>
  );
}

/** A low bush of flowers, to sit at the foot of a minaret or building. */
export function FlowerBush({ className = '', ink = INK }: { className?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 160 70" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g fill="none" stroke={ink} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d="M6 68 C40 62 120 62 154 68" />
        <path d="M30 66 C28 50 32 40 40 30 M60 66 C60 50 58 36 62 20 M92 66 C94 50 98 38 108 28 M124 66 C126 54 130 46 138 40 M76 66 C74 56 70 50 64 44" strokeWidth="0.6" />
        <SprayLeaf x={20} y={58} rot={-30} s={0.8} />
        <SprayLeaf x={44} y={52} rot={-60} s={0.7} tint={EMERALD} />
        <SprayLeaf x={70} y={50} rot={-120} s={0.7} />
        <SprayLeaf x={100} y={54} rot={-50} s={0.8} tint={EMERALD} />
        <SprayLeaf x={134} y={58} rot={-150} s={0.75} />
        <SprayLeaf x={118} y={46} rot={-100} s={0.6} />
        <SketchRose x={40} y={30} s={0.8} tint={MAGENTA} />
        <Marigold x={62} y={20} s={0.9} />
        <SketchRose x={108} y={28} s={0.85} />
        <Marigold x={138} y={40} s={0.65} tint={TERRACOTTA} />
        <g stroke={ink === INK ? INK_SOFT : ink}>
          <Jasmine x={64} y={44} s={0.9} />
          <Jasmine x={86} y={40} s={0.8} rot={30} />
          <Jasmine x={16} y={48} s={0.7} />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hanging decor                                                       */
/* ------------------------------------------------------------------ */

const GLASS = [
  [MAGENTA, MARIGOLD, PEACOCK, EMERALD],
  [PEACOCK, MAGENTA, EMERALD, MARIGOLD],
  [MARIGOLD, EMERALD, MAGENTA, PEACOCK],
];

/** Pierced brass lantern with coloured glass panes and a bright flickering flame. */
export function InkLantern({ chain = 40, className = '', ink = INK, glass = 0 }: { chain?: number; className?: string; ink?: string; glass?: number }) {
  const panes = GLASS[glass % GLASS.length];
  return (
    <svg viewBox={`0 0 50 ${chain + 106}`} className={`overflow-visible ${className}`} aria-hidden="true">
      <g transform={`translate(0 ${chain})`}>
        {/* The flicker animates opacity, so each glow sits inside a group that sets its strength */}
        <g opacity="0.45">
          <ellipse cx="25" cy="50" rx="30" ry="36" fill={FLAME} filter="url(#wash)" className="animate-glow" />
        </g>
        <path d="M12 24 C6 40 8 62 16 74 H20 C17 60 16 42 19 24 Z" fill={panes[0]} opacity="0.75" />
        <path d="M19 24 C16 42 17 60 20 74 H25 V24 Z" fill={panes[1]} opacity="0.75" />
        <path d="M25 24 V74 H30 C33 60 34 42 31 24 Z" fill={panes[2]} opacity="0.75" />
        <path d="M31 24 C34 42 33 60 30 74 H34 C42 62 44 40 38 24 Z" fill={panes[3]} opacity="0.75" />
        <g opacity="0.85">
          <ellipse cx="25" cy="50" rx="9" ry="14" fill={FLAME} filter="url(#wash)" className="animate-glow" />
        </g>
        <ellipse cx="25" cy="52" rx="4" ry="7" fill="#fffbe6" className="animate-glow" />
        <path d="M14 20 C16 10 22 8 25 6 C28 8 34 10 36 20 Z" fill={OCHRE} opacity="0.7" />
        <path d="M11 20 H39 V24 H11 Z M15 74 H35 V78 H15 Z M18 78 L25 92 L32 78 Z" fill={OCHRE} opacity="0.7" />
      </g>
      <g fill="none" stroke={ink} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" filter="url(#ink)">
        <path d={`M25 0 V${chain}`} strokeDasharray="2.5 2" strokeWidth="0.8" />
        <g transform={`translate(0 ${chain})`}>
          <circle cx="25" cy="3" r="3" />
          <path d="M14 20 C16 10 22 8 25 6 C28 8 34 10 36 20 Z" />
          <path d="M11 20 H39 V24 H11 Z" />
          <path d="M12 24 C6 40 8 62 16 74 H34 C42 62 44 40 38 24" />
          <path d="M19 24 C16 42 17 60 20 74 M25 24 V74 M31 24 C34 42 33 60 30 74" strokeWidth="0.6" />
          <path d="M10 44 Q25 52 40 44 M12 60 Q25 66 38 60" strokeWidth="0.6" />
          <path d="M15 74 H35 V78 H15 Z" />
          <path d="M18 78 L25 92 L32 78 M25 92 V100" />
          <circle cx="25" cy="102" r="1.6" fill={MAGENTA} />
        </g>
      </g>
    </svg>
  );
}

/** A string of jasmine buds with roses woven in, ending in a marigold, like a phoolon ki ladi. */
export function JasmineStrand({ length = 160, className = '' }: { length?: number; className?: string }) {
  const buds = [];
  for (let y = 6, i = 0; y < length - 16; y += 8.5, i++) buds.push({ y, i });
  return (
    <svg viewBox={`0 0 24 ${length + 18}`} className={`overflow-visible ${className}`} aria-hidden="true">
      <g stroke={INK_SOFT} strokeWidth="0.5" filter="url(#ink)">
        <path d={`M12 0 V${length}`} fill="none" strokeWidth="0.6" />
        {buds.map(({ y, i }) =>
          i % 5 === 4 ? (
            <circle key={y} cx="12" cy={y} r="3.2" fill={i % 10 === 4 ? MAGENTA : MARIGOLD} fillOpacity="0.9" />
          ) : (
            <ellipse key={y} cx={i % 2 ? 13.2 : 10.8} cy={y} rx="2.6" ry="3.8" fill={JASMINE} transform={`rotate(${i % 2 ? 14 : -14} ${i % 2 ? 13.2 : 10.8} ${y})`} />
          ),
        )}
        <Marigold x={12} y={length + 4} s={0.7} />
      </g>
    </svg>
  );
}

/** A bunch of flowers tied onto the cord where each lantern or strand hangs. */
function CordKnot() {
  return (
    <svg viewBox="-16 -8 32 22" className="absolute -top-1 left-1/2 w-10 -translate-x-1/2 overflow-visible sm:w-12" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="0.6" filter="url(#ink)">
        <SprayLeaf x={-4} y={4} rot={160} s={0.55} />
        <SprayLeaf x={4} y={4} rot={20} s={0.55} tint={EMERALD} />
        <Marigold x={-6} y={2} s={0.45} />
        <SketchRose x={6} y={2} s={0.4} tint={MAGENTA} />
      </g>
    </svg>
  );
}

const hanging = [
  { kind: 'lantern', pos: 'left-[4%]', len: 30, w: 'w-8 sm:w-11', delay: '0s', dur: '7s', hide: '' },
  { kind: 'strand', pos: 'left-[11%]', len: 150, w: 'w-4 sm:w-5', delay: '-2s', dur: '6s', hide: 'hidden sm:block' },
  { kind: 'lantern', pos: 'left-[17%]', len: 110, w: 'w-8 sm:w-10', delay: '-3.5s', dur: '8s', hide: 'hidden md:block' },
  { kind: 'strand', pos: 'left-[24%]', len: 90, w: 'w-4 sm:w-5', delay: '-1s', dur: '5.5s', hide: 'hidden lg:block' },
  { kind: 'strand', pos: 'right-[24%]', len: 120, w: 'w-4 sm:w-5', delay: '-4s', dur: '6.5s', hide: 'hidden lg:block' },
  { kind: 'lantern', pos: 'right-[17%]', len: 70, w: 'w-8 sm:w-10', delay: '-1.5s', dur: '7.5s', hide: 'hidden md:block' },
  { kind: 'strand', pos: 'right-[11%]', len: 180, w: 'w-4 sm:w-5', delay: '-3s', dur: '6s', hide: 'hidden sm:block' },
  { kind: 'lantern', pos: 'right-[4%]', len: 50, w: 'w-8 sm:w-11', delay: '-5s', dur: '7s', hide: '' },
] as const;

/** Lanterns and jasmine strings hanging from a flower-tied cord across the top of a section. */
export function HangingDecor({ ink = INK, lanternsOnly = false }: { ink?: string; lanternsOnly?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72" aria-hidden="true">
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-4 w-full">
        <path d="M0 1 Q12.5 7 25 1.5 T50 1.5 T75 1.5 T100 1" fill="none" stroke={ink} strokeWidth="0.8" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
      </svg>
      {hanging
        .filter((h) => !lanternsOnly || h.kind === 'lantern')
        .map((h, i) => (
          <div key={i} className={`absolute top-0 ${h.pos} ${h.w} ${h.hide}`}>
            <CordKnot />
            <div className="origin-top animate-sway" style={{ animationDelay: h.delay, animationDuration: h.dur }}>
              {h.kind === 'lantern' ? (
                <InkLantern chain={h.len} className="w-full drop-shadow-[0_0_16px_rgba(255,200,80,0.7)]" ink={ink} glass={i} />
              ) : (
                <JasmineStrand length={h.len} className="w-full" />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Star-and-cross lattice                                              */
/* ------------------------------------------------------------------ */

const TILE = 40;
const R_TIP = TILE / 2;
// Inner vertex radius of a regular {8/2} star
const R_NOTCH = (R_TIP * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 8);

function starAt(cx: number, cy: number) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 === 0 ? R_TIP : R_NOTCH;
    const a = (i * 22.5 * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join(' L')} Z`;
}

function octagonAt(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 + 22.5) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join(' L')} Z`;
}

/**
 * The classic Islamic star-and-cross tiling: eight-point stars whose gaps form crosses,
 * as carved in Mughal jali screens. It draws itself in ink from the centre outwards,
 * then drifts slowly by one tile at a time so the loop is seamless.
 */
export function StarLattice({ cols = 8, rows = 8, className = '' }: { cols?: number; rows?: number; className?: string }) {
  // One extra tile in each direction so the drift never shows an edge.
  const c = cols + 1;
  const r = rows + 1;
  const mid = [(c * TILE) / 2, (r * TILE) / 2];
  const maxDist = Math.hypot(mid[0], mid[1]);
  const tiles = [];
  for (let y = 0; y <= r; y++) {
    for (let x = 0; x <= c; x++) {
      const cx = x * TILE;
      const cy = y * TILE;
      const delay = (Math.hypot(cx - mid[0], cy - mid[1]) / maxDist) * 2.8;
      tiles.push({ key: `${x}-${y}`, cx, cy, delay });
    }
  }
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        maskImage: 'radial-gradient(closest-side, #000 35%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(closest-side, #000 35%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${c * TILE} ${r * TILE}`}
        className="ink-draw animate-lattice-drift"
        style={{
          width: `${(c / cols) * 100}%`,
          ['--drift-x' as string]: `${(-100 / c).toFixed(3)}%`,
          ['--drift-y' as string]: `${(-100 / r).toFixed(3)}%`,
        }}
      >
        <g fill="none" stroke="currentColor" strokeLinejoin="round" filter="url(#ink-fine)">
          {tiles.map((t) => (
            <g key={t.key}>
              <path d={starAt(t.cx, t.cy)} strokeWidth="0.9" pathLength={1} style={{ animationDelay: `${t.delay}s` }} />
              <path d={octagonAt(t.cx, t.cy, R_NOTCH * 0.62)} strokeWidth="0.5" pathLength={1} style={{ animationDelay: `${t.delay + 0.8}s` }} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drifting petals                                                     */
/* ------------------------------------------------------------------ */

const PETAL = 'M0 5 C3 -1 11 -1 15 5 C11 10 3 10 0 5 Z';

// left %, fall duration, delay, size, colour. Negative delays so petals are already mid-air on load.
const PETALS = [
  [6, 22, -3, 24, ROSE], [15, 28, -17, 18, JASMINE], [24, 19, -8, 20, MARIGOLD], [33, 26, -21, 16, MAGENTA],
  [44, 24, -12, 22, JASMINE], [55, 30, -2, 19, ROSE], [63, 21, -15, 17, MARIGOLD], [72, 27, -6, 24, MAGENTA],
  [81, 23, -19, 16, JASMINE], [90, 25, -10, 21, ROSE], [96, 29, -24, 18, TERRACOTTA], [38, 32, -27, 15, MAGENTA],
  [49, 20, -5, 17, MARIGOLD], [10, 31, -14, 15, MAGENTA], [86, 18, -9, 19, MARIGOLD], [68, 34, -30, 16, ROSE],
] as const;

/** Rose, marigold and jasmine petals slowly falling through a section. */
export function Petals({ count = PETALS.length, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PETALS.slice(0, count).map(([left, dur, delay, size, fill], i) => (
        <div
          key={i}
          className="absolute top-0 h-full animate-petal-fall"
          style={{ left: `${left}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        >
          <div className="animate-petal-sway" style={{ animationDelay: `${(i % 5) * -0.8}s`, animationDuration: `${3.5 + (i % 3)}s` }}>
            <svg viewBox="-2 -2 19 14" style={{ width: size, height: size * 0.7 }}>
              <path d={PETAL} fill={fill} opacity={fill === JASMINE ? 0.95 : 0.85} filter="url(#wash)" />
              <path d={PETAL} fill="none" stroke={INK_SOFT} strokeWidth="0.4" strokeOpacity="0.4" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
