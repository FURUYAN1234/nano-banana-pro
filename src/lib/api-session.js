const EMPTY_SESSION = Object.freeze({
  provider: null,
  status: 'disconnected',
  credential: '',
});

const restoredSession = import.meta.hot?.data.apiSession;
let currentSession = restoredSession?.credential
  ? { ...restoredSession }
  : { ...EMPTY_SESSION };

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data.apiSession = { ...currentSession };
  });
}

const isProvider = (provider) => provider === 'gemini' || provider === 'openai';

export const setApiSession = (provider, credential) => {
  const normalizedCredential = String(credential || '');
  if (!isProvider(provider) || !normalizedCredential) {
    throw new TypeError('A supported provider and non-empty credential are required.');
  }

  currentSession = {
    provider,
    status: 'connected',
    credential: normalizedCredential,
  };
};

export const clearApiSession = (provider = null) => {
  if (provider && currentSession.provider !== provider) return;
  currentSession = { ...EMPTY_SESSION };
};

export const getApiCredential = (provider) => (
  currentSession.status === 'connected' && currentSession.provider === provider
    ? currentSession.credential
    : ''
);

export const getApiSessionSnapshot = () => ({
  provider: currentSession.provider,
  status: currentSession.status,
  credentialPresent: Boolean(currentSession.credential),
});
