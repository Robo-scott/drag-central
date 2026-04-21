import { useStore } from '@/store/useStore';

export default function LoginButton() {
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const setShowLogin = useStore((s) => s.setShowLogin);
  const navigate = useStore((s) => s.navigate);

  if (isLoggedIn) {
    return (
      <button
        onClick={() => navigate('memberPortal')}
        className="fixed top-[72px] right-3 z-40 bg-drag-red text-white px-3 py-1.5 rounded-sm font-montserrat font-bold text-[0.6rem] uppercase tracking-wider shadow-lg hover:bg-drag-red/80 transition-colors flex items-center gap-1.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        My Account
      </button>
    );
  }

  return (
    <button
      onClick={() => setShowLogin(true)}
      className="fixed top-[72px] right-3 z-40 bg-asphalt border border-drag-red text-drag-red px-3 py-1.5 rounded-sm font-montserrat font-bold text-[0.6rem] uppercase tracking-wider hover:bg-drag-red hover:text-white transition-colors flex items-center gap-1.5"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      Member Login
    </button>
  );
}
