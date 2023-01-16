/* eslint-disable @typescript-eslint/no-namespace */
import { MapType, Marker, LatLng, CameraConfig } from './definitions';
import { CreateMapArgs } from './implementation';
import { GoogleMap } from './map';

export { GoogleMap, MapType, Marker, LatLng, CameraConfig, CreateMapArgs };

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      'capacitor-google-map': any;
    }
  }
}
