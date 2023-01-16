import { WebPlugin } from '@capacitor/core';

import type { CapacitorCustomGoogleMapsPlugin } from './definitions';

export class CapacitorCustomGoogleMapsWeb
  extends WebPlugin
  implements CapacitorCustomGoogleMapsPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
