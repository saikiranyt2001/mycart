(function () {
  const DEFAULT_REMOTE = 'https://mycart-1-4ws8.onrender.com/api';
  const LOCAL_PORTS = [10000, 5000];
  const DEFAULT_LOCAL = `http://localhost:${LOCAL_PORTS[0]}/api`;

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

    if (stored && stored.trim()) {
      candidates.push(stored.trim());
    }

    if (isLocalHost) {
      // Try multiple local ports then remote
      candidates.push(...LOCAL_PORTS.map(p => `http://localhost:${p}/api`), DEFAULT_REMOTE);
    } else {
      candidates.push(DEFAULT_LOCAL);
      if (typeof window !== 'undefined' && window.location && /^https?:/.test(window.location.origin)) {
        candidates.push(`${window.location.origin}/api`);
      }
      candidates.push(DEFAULT_REMOTE);
    }

    for (const c of candidates) {
      if (await probe(c)) {
        console.info('[api] using', c);
        return c;
      }
    }

    // If nothing responded, prefer remote when running on localhost to avoid stale ports
    const fallback = isLocalHost ? DEFAULT_REMOTE : (candidates[0] || DEFAULT_REMOTE);
    console.warn('[api] falling back to', fallback);
    return fallback;
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
