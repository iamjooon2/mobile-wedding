import { useState } from 'react';

const PASSWORD = import.meta.env.VITE_ACCESS_PASSWORD;

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('wedding_unlocked') === 'true'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem('wedding_unlocked', 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#333',
      color: '#fff',
      fontFamily: 'var(--font-sans), var(--font-kr)',
      zIndex: 99999,
    }}>
      <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '2rem', opacity: 0.6 }}>
        ENTER PASSWORD
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <input
          type="password"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={{
            width: '200px',
            padding: '0.75rem 1rem',
            fontSize: '1.2rem',
            textAlign: 'center',
            letterSpacing: '0.3em',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.6rem 2rem',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ENTER
        </button>
        {error && (
          <p style={{ fontSize: '0.8rem', color: '#ff6b6b', marginTop: '0.5rem' }}>
            비밀번호가 올바르지 않습니다
          </p>
        )}
      </form>
    </div>
  );
}
