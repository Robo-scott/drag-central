import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function MemberLogin() {
  const showLogin = useStore((s) => s.showLogin);
  const setShowLogin = useStore((s) => s.setShowLogin);
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!showLogin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    // Demo login - any credentials work
    login();
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(11,11,11,0.92)' }}>
      <div className="bg-asphalt rounded-lg w-full max-w-sm border border-smoke p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-track-silver hover:text-white"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <path d="M15 20 L35 80" stroke="#C4161C" strokeWidth="6" strokeLinecap="round"/>
            <path d="M30 20 L50 80" stroke="#A0A0A0" strokeWidth="6" strokeLinecap="round"/>
          </svg>
          <div>
            <span className="font-montserrat font-bold text-white text-base tracking-wider">DRAG</span>
            <span className="font-montserrat font-bold text-drag-red text-base tracking-wider ml-1">CENTRAL</span>
          </div>
        </div>

        <h2 className="font-rajdhani font-bold text-white text-xl uppercase tracking-[0.04em] text-center mb-1">
          Member Login
        </h2>
        <p className="text-track-silver text-xs font-inter text-center mb-6">
          Access your driver profile, entries, and classifieds
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-track-silver text-[0.65rem] font-inter uppercase tracking-wider mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-sm font-inter outline-none focus:border-drag-red transition-colors placeholder:text-track-silver/50"
            />
          </div>

          <div>
            <label className="text-track-silver text-[0.65rem] font-inter uppercase tracking-wider mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-carbon border border-smoke rounded-sm px-3 py-2 text-white text-sm font-inter outline-none focus:border-drag-red transition-colors placeholder:text-track-silver/50"
            />
          </div>

          {error && (
            <p className="text-drag-red text-xs font-inter">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-drag-red text-white py-2.5 rounded-sm font-montserrat font-bold text-xs uppercase tracking-wider hover:bg-drag-red/80 transition-colors"
          >
            Log In
          </button>

          <p className="text-track-silver text-[0.6rem] font-inter text-center">
            Not a member yet? Contact info@dragcentral.co.nz to register.
          </p>
        </form>
      </div>
    </div>
  );
}
