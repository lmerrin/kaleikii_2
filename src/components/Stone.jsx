import { IMAGES } from "../data/content";

// Photos show in the real site; the claude.ai preview can't load outside images, so it falls back to drawn stones.
const SHOW_PHOTOS = typeof window === "undefined" || !window.__ARTIFACT;

const SHAPES = {
  toki: "M38 10 L62 10 C66 10,72 40,74 76 C75 88,66 94,50 94 C34 94,25 88,26 76 C28 40,34 10,38 10Z",
  roimata: "M50 6 C62 30,80 50,80 68 C80 86,66 96,50 96 C34 96,20 86,20 68 C20 50,38 30,50 6Z",
  koru: "M50 8 C76 8,94 28,92 52 C90 76,70 92,48 90 C28 88,16 72,18 56 C20 40,34 30,48 32 C60 34,66 44,64 54 C62 62,54 66,48 63 C43 60,43 54,47 52 L40 46 C30 52,30 66,42 72 C56 79,74 70,76 54 C78 36,64 22,48 22 C30 22,10 38,8 58 L6 50 C8 26,26 8,50 8Z",
  matau: "M30 10 C50 6,66 16,64 36 L60 70 C58 84,70 88,76 76 L72 66 L84 70 C86 86,74 98,58 96 C42 94,38 80,40 68 L44 36 C45 26,40 22,30 24Z",
  makau: "M28 8 C48 4,62 14,60 32 L56 66 C55 80,68 84,74 72 L70 60 L84 64 C86 84,72 98,56 96 C40 94,36 80,38 66 L42 32 C43 24,38 20,28 22Z",
  manaia: "M30 14 C52 4,76 14,80 34 C84 52,72 62,60 60 C70 70,72 84,60 92 C46 100,28 92,28 78 L40 78 C42 86,54 84,54 74 C54 64,40 60,30 52 C18 42,16 22,30 14Z",
  earrings: "M30 20 L38 20 L40 86 C40 92,28 92,28 86Z M62 20 L70 20 L72 86 C72 92,60 92,60 86Z",
  tiki: "M50 6 C70 6,82 18,82 34 C82 46,74 54,72 62 C70 74,76 88,64 94 L36 94 C24 88,30 74,28 62 C26 54,18 46,18 34 C18 18,30 6,50 6Z",
  honu: "M50 22 C68 22,80 36,80 52 C80 70,66 82,50 82 C34 82,20 70,20 52 C20 36,32 22,50 22Z M44 8 C48 4,52 4,56 8 L56 22 L44 22Z M12 40 L24 44 L22 56 L8 50Z M88 40 L76 44 L78 56 L92 50Z M20 74 L30 72 L28 88 L18 86Z M80 74 L70 72 L72 88 L82 86Z",
  niho: "M30 30 C30 14,70 14,70 30 L72 58 C76 82,62 96,50 96 C38 96,24 82,28 58Z",
  other: "M50 10 C72 12,88 30,86 54 C84 78,66 92,46 90 C26 88,12 70,14 50 C16 28,30 8,50 10Z",
};

export function Stone({ k, bone }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d={SHAPES[k] || SHAPES.other} fillRule="evenodd" fill={bone ? "url(#boneGrad)" : "url(#stoneGrad)"}
        stroke={bone ? "var(--line)" : undefined} />
    </svg>
  );
}

// A photo when available, otherwise a drawn stone on a soft panel.
export function Photo({ name, alt, shape, bone, className }) {
  const src = name && IMAGES[name];
  if (SHOW_PHOTOS && src) return <img className={"photo " + (className || "")} src={src} alt={alt || ""} loading="lazy" />;
  return (
    <div className={"photo photo-fallback " + (className || "")} role="img" aria-label={alt || ""}>
      <Stone k={shape || name || "other"} bone={bone} />
    </div>
  );
}

export function Gradients() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--stone1)" />
          <stop offset=".55" stopColor="var(--stone2)" />
          <stop offset="1" stopColor="var(--stone3)" />
        </linearGradient>
        <linearGradient id="boneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F4EA" />
          <stop offset="1" stopColor="#D8D1BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function copyText(text) {
  try {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  } catch (e) {
    return Promise.resolve(false);
  }
}
