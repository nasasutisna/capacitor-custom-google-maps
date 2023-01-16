import type { Plugin } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type {
  CameraConfig,
  GoogleMapConfig,
  LatLngBounds,
  MapPadding,
  MapType,
  Marker,
  LatLng
} from './definitions';


/**
 * An interface containing the options used when creating a map.
 */
export interface CreateMapArgs {
  /**
   * A unique identifier for the map instance.
   */
  id: string;
  /**
   * The Google Maps SDK API Key.
   */
  apiKey: string;
  /**
   * The initial configuration settings for the map.
   */
  config: GoogleMapConfig;
  /**
   * The DOM element that the Google Map View will be mounted on which determines size and positioning.
   */
  element: HTMLElement;
  /**
   * Destroy and re-create the map instance if a map with the supplied id already exists
   * @default false
   */
  forceCreate?: boolean;
}

export interface DestroyMapArgs {
  id: string;
}

export interface RemoveMarkerArgs {
  id: string;
  markerId: string;
}

export interface RemoveMarkersArgs {
  id: string;
  markerIds: string[];
}

export interface AddMarkerArgs {
  id: string;
  marker: Marker;
}

export interface CameraArgs {
  id: string;
  config: CameraConfig;
}

export interface MapTypeArgs {
  id: string;
  mapType: MapType;
}

export interface IndoorMapArgs {
  id: string;
  enabled: boolean;
}

export interface TrafficLayerArgs {
  id: string;
  enabled: boolean;
}

export interface AccElementsArgs {
  id: string;
  enabled: boolean;
}

export interface PaddingArgs {
  id: string;
  padding: MapPadding;
}

export interface CurrentLocArgs {
  id: string;
  enabled: boolean;
}
export interface AddMarkersArgs {
  id: string;
  markers: Marker[];
}

export interface OnScrollArgs {
  id: string;
  mapBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface CircleOptions {
  radius: string;
  mapId: string;
  center: LatLng;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface CapacitorCustomGoogleMapsPlugin extends Plugin {
  create(options: CreateMapArgs): Promise<void>;
  addCircle(args: CircleOptions): Promise<void>;
  addMarker(args: AddMarkerArgs): Promise<{ id: string }>;
  addMarkers(args: AddMarkersArgs): Promise<{ ids: string[] }>;
  removeMarker(args: RemoveMarkerArgs): Promise<void>;
  removeMarkers(args: RemoveMarkersArgs): Promise<void>;
  enableClustering(args: { id: string }): Promise<void>;
  disableClustering(args: { id: string }): Promise<void>;
  destroy(args: DestroyMapArgs): Promise<void>;
  setCamera(args: CameraArgs): Promise<void>;
  setMapType(args: MapTypeArgs): Promise<void>;
  enableIndoorMaps(args: IndoorMapArgs): Promise<void>;
  enableTrafficLayer(args: TrafficLayerArgs): Promise<void>;
  enableAccessibilityElements(args: AccElementsArgs): Promise<void>;
  enableCurrentLocation(args: CurrentLocArgs): Promise<void>;
  setPadding(args: PaddingArgs): Promise<void>;
  onScroll(args: OnScrollArgs): Promise<void>;
  dispatchMapEvent(args: { id: string; focus: boolean }): Promise<void>;
  getMapBounds(args: { id: string }): Promise<LatLngBounds>;
}

const CapacitorCustomGoogleMaps = registerPlugin<CapacitorCustomGoogleMapsPlugin>(
  'CapacitorCustomGoogleMaps',
  {
    web: () => import('./web').then(m => new m.CapacitorCustomGoogleMapsWeb()),
  },
);

CapacitorCustomGoogleMaps.addListener('isMapInFocus', data => {
  const x = data.x;
  const y = data.y;

  const elem = document.elementFromPoint(x, y) as HTMLElement | null;
  const internalId = elem?.dataset?.internalId;
  const mapInFocus = internalId === data.mapId;

  CapacitorCustomGoogleMaps.dispatchMapEvent({ id: data.mapId, focus: mapInFocus });
});

export { CapacitorCustomGoogleMaps };
