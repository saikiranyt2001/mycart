(function () {
  const DEFAULT_REMOTE = 'https://mycart-1-4ws8.onrender.com/api';
  const DEFAULT_LOCAL = 'http://localhost:5000/api';

  function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), ms);
      promise.then(v => { clearTimeout(t); resolve(v); })
             .catch(e => { clearTimeout(t); reject(e); });
    });
  }

  async function probe(base) {
    try {
      const res = await withTimeout(fetch(`${base}/health`, { method: 'GET' }), 1500);
      return res.ok;
    } catch {
      return false;
    }
  }

  async function resolveBase() {
    const stored = (typeof window !== 'undefined') ? window.localStorage.getItem('apiBaseUrl') : null;
    const candidates = [];
    const isLocalHost = (typeof window !== 'undefined') && ['localhost', '127.0.0.1'].includes(window.location.hostname);

    // On localhost/127 force local backend without probing to avoid hitting remote
    if (isLocalHost) {
      console.info('[api] forcing local base', DEFAULT_LOCAL);
      return DEFAULT_LOCAL;
    }

    if (stored && stored.trim()) {
      candidates.push(stored.trim());
    }

    candidates.push(DEFAULT_LOCAL);

    if (typeof window !== 'undefined' && window.location && /^https?:/.test(window.location.origin)) {
      candidates.push(`${window.location.origin}/api`);
    }

    candidates.push(DEFAULT_REMOTE);

    for (const c of candidates) {
      if (await probe(c)) {
        console.info('[api] using', c);
        return c;
      }
    }
    console.warn('[api] falling back to', candidates[0]);
    return candidates[0] || DEFAULT_LOCAL;
  }

  const ready = (async () => {
    const base = await resolveBase();
    window.API_BASE_URL = base;
    console.info('[api] ready base', base);
  })();

  window.apiConfig = {
    ready,
    getBase: () => window.API_BASE_URL || DEFAULT_LOCAL,
    setBase: (url) => {
      if (!url || typeof url !== 'string') return;
      localStorage.setItem('apiBaseUrl', url.trim());
      window.API_BASE_URL = url.trim();
    },
    resetBase: () => {
      localStorage.removeItem('apiBaseUrl');
      window.API_BASE_URL = DEFAULT_LOCAL;
    }
  };

  window.apiFetch = async (path, options) => {
    await ready;
    const base = window.API_BASE_URL || DEFAULT_LOCAL;
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
    return fetch(url, options);
  };
})();
