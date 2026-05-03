import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 1000);
    const exitTimer = setTimeout(() => setPhase('exit'), 3400);
    const doneTimer = setTimeout(onComplete, 4000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
        phase === 'exit' ? 'splash-exit' : ''
      }`}
      style={{ background: 'hsl(20, 14%, 7%)' }}
    >
      <div className="relative flex flex-col items-center px-6">
        <img
          src="/brand/korbz-logo.png"
          alt="Korbz Solutions"
          className={`h-32 sm:h-48 md:h-64 w-auto max-w-full ${phase === 'enter' || phase === 'hold' ? 'splash-logo-animate' : ''}`}
        />

        <div
          className={`mt-6 overflow-hidden transition-all duration-700 ${
            phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <p
            className="splash-shimmer font-display text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold text-center"
          >
            Premium Event Curation
          </p>
        </div>

        <div
          className={`mt-10 flex gap-1.5 transition-all duration-500 ${
            phase === 'enter' ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: `hsl(var(--color-coral))`,
                animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
