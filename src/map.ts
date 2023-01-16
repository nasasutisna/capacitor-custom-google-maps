import { Capacitor } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

import type {
  CameraConfig,
  Marker,
  MapPadding,
  MapType,
  MapListenerCallback,
  MapReadyCallbackData,
  CameraIdleCallbackData,
  CameraMoveStartedCallbackData,
  ClusterClickCallbackData,
  MapClickCallbackData,
  MarkerClickCallbackData,
  MyLocationButtonClickCallbackData,
  LatLngBounds,
  CircleOptions,
} from './definitions';
import type { CreateMapArgs, } from './implementation';
import { CapacitorCustomGoogleMaps } from './implementation';

export interface GoogleMapInterface {
  create(
    options: CreateMapArgs,
    callback?: MapListenerCallback<MapReadyCallbackData>,
  ): Promise<GoogleMap>;
  enableClustering(): Promise<void>;
  disableClustering(): Promise<void>;
  addCircle(options: CircleOptions): Promise<void>;
  addMarker(marker: Marker): Promise<string>;
  addMarkers(markers: Marker[]): Promise<string[]>;
  removeMarker(id: string): Promise<void>;
  removeMarkers(ids: string[]): Promise<void>;
  destroy(): Promise<void>;
  setCamera(config: CameraConfig): Promise<void>;
  setMapType(mapType: MapType): Promise<void>;
  enableIndoorMaps(enabled: boolean): Promise<void>;
  enableTrafficLayer(enabled: boolean): Promise<void>;
  enableAccessibilityElements(enabled: boolean): Promise<void>;
  enableCurrentLocation(enabled: boolean): Promise<void>;
  setPadding(padding: MapPadding): Promise<void>;
  setOnBoundsChangedListener(
    callback?: MapListenerCallback<CameraIdleCallbackData>,
  ): Promise<void>;
  setOnCameraIdleListener(
    callback?: MapListenerCallback<CameraIdleCallbackData>,
  ): Promise<void>;
  setOnCameraMoveStartedListener(
    callback?: MapListenerCallback<CameraMoveStartedCallbackData>,
  ): Promise<void>;
  setOnClusterClickListener(
    callback?: MapListenerCallback<ClusterClickCallbackData>,
  ): Promise<void>;
  setOnClusterInfoWindowClickListener(
    callback?: MapListenerCallback<ClusterClickCallbackData>,
  ): Promise<void>;
  setOnInfoWindowClickListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void>;
  setOnMapClickListener(
    callback?: MapListenerCallback<MapClickCallbackData>,
  ): Promise<void>;
  setOnMarkerClickListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void>;
  setOnMarkerDragStartListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void>;
  setOnMarkerDragListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void>;
  setOnMarkerDragEndListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void>;
  setOnMyLocationButtonClickListener(
    callback?: MapListenerCallback<MyLocationButtonClickCallbackData>,
  ): Promise<void>;
  setOnMyLocationClickListener(
    callback?: MapListenerCallback<MapClickCallbackData>,
  ): Promise<void>;
}

class MapCustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (Capacitor.getPlatform() == 'ios') {
      this.style.overflow = 'scroll';
      (this.style as any)['-webkit-overflow-scrolling'] = 'touch';

      const overflowDiv = document.createElement('div');
      overflowDiv.style.height = '200%';

      this.appendChild(overflowDiv);
    }
  }
}

customElements.define('capacitor-google-map', MapCustomElement);

export class GoogleMap {
  private id: string;
  private element: HTMLElement | null = null;

  private onBoundsChangedListener?: PluginListenerHandle;
  private onCameraIdleListener?: PluginListenerHandle;
  private onCameraMoveStartedListener?: PluginListenerHandle;
  private onClusterClickListener?: PluginListenerHandle;
  private onClusterInfoWindowClickListener?: PluginListenerHandle;
  private onInfoWindowClickListener?: PluginListenerHandle;
  private onMapClickListener?: PluginListenerHandle;
  private onMarkerClickListener?: PluginListenerHandle;
  private onMarkerDragStartListener?: PluginListenerHandle;
  private onMarkerDragListener?: PluginListenerHandle;
  private onMarkerDragEndListener?: PluginListenerHandle;
  private onMyLocationButtonClickListener?: PluginListenerHandle;
  private onMyLocationClickListener?: PluginListenerHandle;

  private constructor(id: string) {
    this.id = id;
  }

  /**
   * Creates a new instance of a Google Map
   * @param options
   * @param callback
   * @returns GoogleMap
   */
  public static async create(
    options: CreateMapArgs,
    callback?: MapListenerCallback<MapReadyCallbackData>,
  ): Promise<GoogleMap> {
    const newMap = new GoogleMap(options.id);

    if (!options.element) {
      throw new Error('container element is required');
    }

    if (options.config.androidLiteMode === undefined) {
      options.config.androidLiteMode = false;
    }

    newMap.element = options.element;
    newMap.element.dataset.internalId = options.id;

    const elementBounds = await GoogleMap.getElementBounds(options.element);
    options.config.width = elementBounds.width;
    options.config.height = elementBounds.height;
    options.config.x = elementBounds.x;
    options.config.y = elementBounds.y;
    options.config.devicePixelRatio = window.devicePixelRatio;

    if (Capacitor.getPlatform() == 'android') {
      newMap.initScrolling();
    }

    if (Capacitor.isNativePlatform()) {
      (options.element as any) = {};
    }

    await CapacitorCustomGoogleMaps.create(options);

    if (callback) {
      const onMapReadyListener = await CapacitorCustomGoogleMaps.addListener(
        'onMapReady',
        (data: MapReadyCallbackData) => {
          if (data.mapId == newMap.id) {
            callback(data);
            onMapReadyListener.remove();
          }
        },
      );
    }

    return newMap;
  }

  private static async getElementBounds(
    element: HTMLElement,
  ): Promise<DOMRect> {
    return new Promise(resolve => {
      let elementBounds = element.getBoundingClientRect();
      if (elementBounds.width == 0) {
        let retries = 0;
        const boundsInterval = setInterval(function () {
          if (elementBounds.width == 0 && retries < 30) {
            elementBounds = element.getBoundingClientRect();
            retries++;
          } else {
            if (retries == 30) {
              console.warn('Map size could not be determined');
            }
            clearInterval(boundsInterval);
            resolve(elementBounds);
          }
        }, 100);
      } else {
        resolve(elementBounds);
      }
    });
  }

  /**
   * Enable marker clustering
   *
   * @returns void
   */
  async enableClustering(): Promise<void> {
    return CapacitorCustomGoogleMaps.enableClustering({
      id: this.id,
    });
  }

  /**
   * Disable marker clustering
   *
   * @returns void
   */
  async disableClustering(): Promise<void> {
    return CapacitorCustomGoogleMaps.disableClustering({
      id: this.id,
    });
  }

  /**
   * Adds a marker to the map
   *
   * @param marker
   * @returns created marker id
   */
  async addMarker(marker: Marker): Promise<string> {
    const res = await CapacitorCustomGoogleMaps.addMarker({
      id: this.id,
      marker,
    });

    return res.id;
  }

  /**
   * Adds multiple markers to the map
   *
   * @param markers
   * @returns array of created marker IDs
   */
  async addMarkers(markers: Marker[]): Promise<string[]> {
    const res = await CapacitorCustomGoogleMaps.addMarkers({
      id: this.id,
      markers,
    });

    return res.ids;
  }

  /**
   * Remove marker from the map
   *
   * @param id id of the marker to remove from the map
   * @returns
   */
  async removeMarker(id: string): Promise<void> {
    return CapacitorCustomGoogleMaps.removeMarker({
      id: this.id,
      markerId: id,
    });
  }

  /**
   * Remove markers from the map
   *
   * @param ids array of ids to remove from the map
   * @returns
   */
  async removeMarkers(ids: string[]): Promise<void> {
    return CapacitorCustomGoogleMaps.removeMarkers({
      id: this.id,
      markerIds: ids,
    });
  }

  /**
   * Destroy the current instance of the map
   */
  async destroy(): Promise<void> {
    if (Capacitor.getPlatform() == 'android') {
      this.disableScrolling();
    }

    this.removeAllMapListeners();

    return CapacitorCustomGoogleMaps.destroy({
      id: this.id,
    });
  }

  /**
   * Update the map camera configuration
   *
   * @param config
   * @returns
   */
  async setCamera(config: CameraConfig): Promise<void> {
    return CapacitorCustomGoogleMaps.setCamera({
      id: this.id,
      config,
    });
  }

  /**
   * Sets the type of map tiles that should be displayed.
   *
   * @param mapType
   * @returns
   */
  async setMapType(mapType: MapType): Promise<void> {
    return CapacitorCustomGoogleMaps.setMapType({
      id: this.id,
      mapType,
    });
  }

  /**
   * Sets whether indoor maps are shown, where available.
   *
   * @param enabled
   * @returns
   */
  async enableIndoorMaps(enabled: boolean): Promise<void> {
    return CapacitorCustomGoogleMaps.enableIndoorMaps({
      id: this.id,
      enabled,
    });
  }

  /**
   * Controls whether the map is drawing traffic data, if available.
   *
   * @param enabled
   * @returns
   */
  async enableTrafficLayer(enabled: boolean): Promise<void> {
    return CapacitorCustomGoogleMaps.enableTrafficLayer({
      id: this.id,
      enabled,
    });
  }

  /**
   * Show accessibility elements for overlay objects, such as Marker and Polyline.
   *
   * Only available on iOS.
   *
   * @param enabled
   * @returns
   */
  async enableAccessibilityElements(enabled: boolean): Promise<void> {
    return CapacitorCustomGoogleMaps.enableAccessibilityElements({
      id: this.id,
      enabled,
    });
  }

  /**
   * Set whether the My Location dot and accuracy circle is enabled.
   *
   * @param enabled
   * @returns
   */
  async enableCurrentLocation(enabled: boolean): Promise<void> {
    return CapacitorCustomGoogleMaps.enableCurrentLocation({
      id: this.id,
      enabled,
    });
  }

  /**
   * Set padding on the 'visible' region of the view.
   *
   * @param padding
   * @returns
   */
  async setPadding(padding: MapPadding): Promise<void> {
    return CapacitorCustomGoogleMaps.setPadding({
      id: this.id,
      padding,
    });
  }

  /**
   * Get the map's current viewport latitude and longitude bounds.
   *
   * @returns {LatLngBounds}
   */
  async getMapBounds(): Promise<LatLngBounds> {
    return CapacitorCustomGoogleMaps.getMapBounds({
      id: this.id,
    });
  }

  initScrolling(): void {
    const ionContents = document.getElementsByTagName('ion-content');

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < ionContents.length; i++) {
      (ionContents[i] as any).scrollEvents = true;
    }

    window.addEventListener('ionScroll', this.handleScrollEvent);
    window.addEventListener('scroll', this.handleScrollEvent);
    window.addEventListener('resize', this.handleScrollEvent);
    if (screen.orientation) {
      screen.orientation.addEventListener('change', () => {
        setTimeout(this.updateMapBounds, 500);
      });
    } else {
      window.addEventListener('orientationchange', () => {
        setTimeout(this.updateMapBounds, 500);
      });
    }
  }

  disableScrolling(): void {
    window.removeEventListener('ionScroll', this.handleScrollEvent);
    window.removeEventListener('scroll', this.handleScrollEvent);
    window.removeEventListener('resize', this.handleScrollEvent);
    if (screen.orientation) {
      screen.orientation.removeEventListener('change', () => {
        setTimeout(this.updateMapBounds, 1000);
      });
    } else {
      window.removeEventListener('orientationchange', () => {
        setTimeout(this.updateMapBounds, 1000);
      });
    }
  }

  handleScrollEvent = (): void => this.updateMapBounds();

  private updateMapBounds(): void {
    if (this.element) {
      const mapRect = this.element.getBoundingClientRect();

      CapacitorCustomGoogleMaps.onScroll({
        id: this.id,
        mapBounds: {
          x: mapRect.x,
          y: mapRect.y,
          width: mapRect.width,
          height: mapRect.height,
        },
      });
    }
  }

  /*
  private findContainerElement(): HTMLElement | null {
    if (!this.element) {
      return null;
    }

    let parentElement = this.element.parentElement;
    while (parentElement !== null) {
      if (window.getComputedStyle(parentElement).overflowY !== 'hidden') {
        return parentElement;
      }

      parentElement = parentElement.parentElement;
    }

    return null;
  }
  */

  /**
   * Set the event listener on the map for 'onCameraIdle' events.
   *
   * @param callback
   * @returns
   */
  async setOnCameraIdleListener(
    callback?: MapListenerCallback<CameraIdleCallbackData>,
  ): Promise<void> {
    if (this.onCameraIdleListener) {
      this.onCameraIdleListener.remove();
    }

    if (callback) {
      this.onCameraIdleListener = await CapacitorCustomGoogleMaps.addListener(
        'onCameraIdle',
        this.generateCallback(callback),
      );
    } else {
      this.onCameraIdleListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onBoundsChanged' events.
   *
   * @param callback
   * @returns
   */
  async setOnBoundsChangedListener(
    callback?: MapListenerCallback<CameraIdleCallbackData>,
  ): Promise<void> {
    if (this.onBoundsChangedListener) {
      this.onBoundsChangedListener.remove();
    }

    if (callback) {
      this.onBoundsChangedListener = await CapacitorCustomGoogleMaps.addListener(
        'onBoundsChanged',
        this.generateCallback(callback),
      );
    } else {
      this.onBoundsChangedListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onCameraMoveStarted' events.
   *
   * @param callback
   * @returns
   */
  async setOnCameraMoveStartedListener(
    callback?: MapListenerCallback<CameraMoveStartedCallbackData>,
  ): Promise<void> {
    if (this.onCameraMoveStartedListener) {
      this.onCameraMoveStartedListener.remove();
    }

    if (callback) {
      this.onCameraMoveStartedListener = await CapacitorCustomGoogleMaps.addListener(
        'onCameraMoveStarted',
        this.generateCallback(callback),
      );
    } else {
      this.onCameraMoveStartedListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onClusterClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnClusterClickListener(
    callback?: MapListenerCallback<ClusterClickCallbackData>,
  ): Promise<void> {
    if (this.onClusterClickListener) {
      this.onClusterClickListener.remove();
    }

    if (callback) {
      this.onClusterClickListener = await CapacitorCustomGoogleMaps.addListener(
        'onClusterClick',
        this.generateCallback(callback),
      );
    } else {
      this.onClusterClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onClusterInfoWindowClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnClusterInfoWindowClickListener(
    callback?: MapListenerCallback<ClusterClickCallbackData>,
  ): Promise<void> {
    if (this.onClusterInfoWindowClickListener) {
      this.onClusterInfoWindowClickListener.remove();
    }

    if (callback) {
      this.onClusterInfoWindowClickListener =
        await CapacitorCustomGoogleMaps.addListener(
          'onClusterInfoWindowClick',
          this.generateCallback(callback),
        );
    } else {
      this.onClusterInfoWindowClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onInfoWindowClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnInfoWindowClickListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void> {
    if (this.onInfoWindowClickListener) {
      this.onInfoWindowClickListener.remove();
    }

    if (callback) {
      this.onInfoWindowClickListener = await CapacitorCustomGoogleMaps.addListener(
        'onInfoWindowClick',
        this.generateCallback(callback),
      );
    } else {
      this.onInfoWindowClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMapClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnMapClickListener(
    callback?: MapListenerCallback<MapClickCallbackData>,
  ): Promise<void> {
    if (this.onMapClickListener) {
      this.onMapClickListener.remove();
    }

    if (callback) {
      this.onMapClickListener = await CapacitorCustomGoogleMaps.addListener(
        'onMapClick',
        this.generateCallback(callback),
      );
    } else {
      this.onMapClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMarkerClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnMarkerClickListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void> {
    if (this.onMarkerClickListener) {
      this.onMarkerClickListener.remove();
    }

    if (callback) {
      this.onMarkerClickListener = await CapacitorCustomGoogleMaps.addListener(
        'onMarkerClick',
        this.generateCallback(callback),
      );
    } else {
      this.onMarkerClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMarkerDragStart' events.
   *
   * @param callback
   * @returns
   */
  async setOnMarkerDragStartListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void> {
    if (this.onMarkerDragStartListener) {
      this.onMarkerDragStartListener.remove();
    }

    if (callback) {
      this.onMarkerDragStartListener = await CapacitorCustomGoogleMaps.addListener(
        'onMarkerDragStart',
        this.generateCallback(callback),
      );
    } else {
      this.onMarkerDragStartListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMarkerDrag' events.
   *
   * @param callback
   * @returns
   */
  async setOnMarkerDragListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void> {
    if (this.onMarkerDragListener) {
      this.onMarkerDragListener.remove();
    }

    if (callback) {
      this.onMarkerDragListener = await CapacitorCustomGoogleMaps.addListener(
        'onMarkerDrag',
        this.generateCallback(callback),
      );
    } else {
      this.onMarkerDragListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMarkerDragEnd' events.
   *
   * @param callback
   * @returns
   */
  async setOnMarkerDragEndListener(
    callback?: MapListenerCallback<MarkerClickCallbackData>,
  ): Promise<void> {
    if (this.onMarkerDragEndListener) {
      this.onMarkerDragEndListener.remove();
    }

    if (callback) {
      this.onMarkerDragEndListener = await CapacitorCustomGoogleMaps.addListener(
        'onMarkerDragEnd',
        this.generateCallback(callback),
      );
    } else {
      this.onMarkerDragEndListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMyLocationButtonClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnMyLocationButtonClickListener(
    callback?: MapListenerCallback<MyLocationButtonClickCallbackData>,
  ): Promise<void> {
    if (this.onMyLocationButtonClickListener) {
      this.onMyLocationButtonClickListener.remove();
    }

    if (callback) {
      this.onMyLocationButtonClickListener =
        await CapacitorCustomGoogleMaps.addListener(
          'onMyLocationButtonClick',
          this.generateCallback(callback),
        );
    } else {
      this.onMyLocationButtonClickListener = undefined;
    }
  }

  /**
   * Set the event listener on the map for 'onMyLocationClick' events.
   *
   * @param callback
   * @returns
   */
  async setOnMyLocationClickListener(
    callback?: MapListenerCallback<MapClickCallbackData>,
  ): Promise<void> {
    if (this.onMyLocationClickListener) {
      this.onMyLocationClickListener.remove();
    }

    if (callback) {
      this.onMyLocationClickListener = await CapacitorCustomGoogleMaps.addListener(
        'onMyLocationClick',
        this.generateCallback(callback),
      );
    } else {
      this.onMyLocationClickListener = undefined;
    }
  }

  /**
   * Remove all event listeners on the map.
   *
   * @param callback
   * @returns
   */
  async removeAllMapListeners(): Promise<void> {
    if (this.onBoundsChangedListener) {
      this.onBoundsChangedListener.remove();
      this.onBoundsChangedListener = undefined;
    }
    if (this.onCameraIdleListener) {
      this.onCameraIdleListener.remove();
      this.onCameraIdleListener = undefined;
    }
    if (this.onCameraMoveStartedListener) {
      this.onCameraMoveStartedListener.remove();
      this.onCameraMoveStartedListener = undefined;
    }

    if (this.onClusterClickListener) {
      this.onClusterClickListener.remove();
      this.onClusterClickListener = undefined;
    }

    if (this.onClusterInfoWindowClickListener) {
      this.onClusterInfoWindowClickListener.remove();
      this.onClusterInfoWindowClickListener = undefined;
    }

    if (this.onInfoWindowClickListener) {
      this.onInfoWindowClickListener.remove();
      this.onInfoWindowClickListener = undefined;
    }

    if (this.onMapClickListener) {
      this.onMapClickListener.remove();
      this.onMapClickListener = undefined;
    }

    if (this.onMarkerClickListener) {
      this.onMarkerClickListener.remove();
      this.onMarkerClickListener = undefined;
    }

    if (this.onMyLocationButtonClickListener) {
      this.onMyLocationButtonClickListener.remove();
      this.onMyLocationButtonClickListener = undefined;
    }

    if (this.onMyLocationClickListener) {
      this.onMyLocationClickListener.remove();
      this.onMyLocationClickListener = undefined;
    }
  }

  private generateCallback(
    callback: MapListenerCallback<any>,
  ): MapListenerCallback<any> {
    const mapId = this.id;
    return (data: any) => {
      if (data.mapId == mapId) {
        callback(data);
      }
    };
  }
}
