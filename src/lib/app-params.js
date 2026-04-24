export const appParams = {
    appId: 'local-app',
    token: 'local-token',
    fromUrl: typeof window !== 'undefined' ? window.location.href : '',
    functionsVersion: 'v1',
    appBaseUrl: typeof window !== 'undefined' ? window.location.origin : '',
};
