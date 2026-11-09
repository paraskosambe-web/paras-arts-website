import { useEffect, useState } from "react";
import logoMark from "@/assets/logo.png";

/** Brand loading veil shown on the first page load. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 620);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`studio-loader pointer-events-none fixed inset-0 z-[200] grid place-items-center overflow-hidden transition-[opacity,visibility] duration-500 ${
        done ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <div className="studio-loader__glow" />

      <div className="studio-loader__content flex flex-col items-center">
        <div className="studio-loader__seal relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32">
          <span className="studio-loader__orbit studio-loader__orbit--outer" />
          <span className="studio-loader__orbit studio-loader__orbit--inner" />
          <span className="studio-loader__seal-glow" />
          <img
            src={logoMark}
            alt=""
            className="studio-loader__logo relative z-10 h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </div>

        <div className="mt-7 text-center">
          <div className="studio-loader__wordmark font-display text-xl tracking-[0.28em] text-gold-light sm:text-2xl">
            PARAS ARTS
          </div>
          <div className="mt-2 text-[9px] tracking-[0.38em] text-white/45 uppercase sm:text-[10px]">
            Where every frame remembers
          </div>
        </div>

        <div className="studio-loader__track mt-8 h-px w-40 overflow-hidden bg-white/10 sm:w-48">
          <span className="studio-loader__progress block h-full w-1/2" />
        </div>
        <span className="mt-3 text-[9px] tracking-[0.3em] text-gold-light/55 uppercase">
          Opening the studio
        </span>
      </div>
    </div>
  );
}
