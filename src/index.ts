import { registerPlugin } from '@capacitor/core';

import type { CapacitorCustomGoogleMapsPlugin } from './definitions';

const CapacitorCustomGoogleMaps =
  registerPlugin<CapacitorCustomGoogleMapsPlugin>('CapacitorCustomGoogleMaps', {
    web: () => import('./web').then(m => new m.CapacitorCustomGoogleMapsWeb()),
  });

export * from './definitions';
export { CapacitorCustomGoogleMaps };
