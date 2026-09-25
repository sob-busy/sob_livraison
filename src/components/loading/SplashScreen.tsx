// Inline script run before the page is displayed: the splash screen is shown
// only once per browser session (see .splash rules in globals.css)
export const splashScript = `try{var s=sessionStorage;if(s.getItem("sob-splash")){document.documentElement.dataset.splash="seen"}else{s.setItem("sob-splash","1")}}catch(e){}`;

// Decorative first-load screen: pure CSS animation (≤ 2 s), never blocks clicks
export function SplashScreen() {
  return (
    <div aria-hidden className="splash">
      {/* Inline copy of public/logo.svg: visible instantly, no download */}
      <svg
        viewBox="0 0 250 48"
        width="250"
        height="48"
        className="h-12 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="11" fill="#0B2545" />
        <rect x="4.5" y="18" width="9" height="2.6" rx="1.3" className="fill-accent" opacity="0.6" />
        <rect x="6.75" y="26.25" width="6.75" height="2.6" rx="1.3" className="fill-accent" opacity="0.6" />
        <text x="28.5" y="35.25" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="33" fontWeight="700" className="fill-accent">
          S
        </text>
        <text x="60" y="32" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" fontWeight="700" className="fill-primary">
          Sob <tspan className="fill-accent">Livraison</tspan>
        </text>
      </svg>
      <div className="splash-track">
        <svg
          className="splash-moto"
          viewBox="0 0 80 44"
          width="80"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* speed lines */}
          <rect x="0" y="18" width="10" height="3" rx="1.5" className="fill-accent" opacity="0.5" />
          <rect x="3" y="26" width="7" height="3" rx="1.5" className="fill-accent" opacity="0.5" />
          {/* delivery box */}
          <rect x="14" y="8" width="16" height="14" rx="2" className="fill-accent" />
          {/* body */}
          <path d="M16 24h22l8-10h7l6 12H16z" className="fill-primary" />
          {/* handlebar */}
          <path d="M53 14l5-8h6" className="stroke-primary" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* wheels */}
          <circle cx="24" cy="34" r="7" className="fill-background stroke-primary" strokeWidth="3.5" />
          <circle cx="62" cy="34" r="7" className="fill-background stroke-primary" strokeWidth="3.5" />
        </svg>
      </div>
    </div>
  );
}
