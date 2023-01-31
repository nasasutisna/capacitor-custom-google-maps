# capacitor-custom-google-maps

capacitor custom plugin google maps 
- add function for create circle on the maps (support for android & ios)

## Install

```bash
npm install capacitor-custom-google-maps
npx cap sync
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`addCircle(...)`](#addcircle)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering(...)`](#disableclustering)
* [`destroy(...)`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`onScroll(...)`](#onscroll)
* [`dispatchMapEvent(...)`](#dispatchmapevent)
* [`getMapBounds(...)`](#getmapbounds)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(options: CreateMapArgs) => Promise<void>
```

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#createmapargs">CreateMapArgs</a></code> |

--------------------


### addCircle(...)

```typescript
addCircle(args: CircleOptions) => Promise<void>
```

| Param      | Type                                                    |
| ---------- | ------------------------------------------------------- |
| **`args`** | <code><a href="#circleoptions">CircleOptions</a></code> |

--------------------


### addMarker(...)

```typescript
addMarker(args: AddMarkerArgs) => Promise<{ id: string; }>
```

| Param      | Type                                                    |
| ---------- | ------------------------------------------------------- |
| **`args`** | <code><a href="#addmarkerargs">AddMarkerArgs</a></code> |

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(args: AddMarkersArgs) => Promise<{ ids: string[]; }>
```

| Param      | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`args`** | <code><a href="#addmarkersargs">AddMarkersArgs</a></code> |

**Returns:** <code>Promise&lt;{ ids: string[]; }&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(args: RemoveMarkerArgs) => Promise<void>
```

| Param      | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`args`** | <code><a href="#removemarkerargs">RemoveMarkerArgs</a></code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(args: RemoveMarkersArgs) => Promise<void>
```

| Param      | Type                                                            |
| ---------- | --------------------------------------------------------------- |
| **`args`** | <code><a href="#removemarkersargs">RemoveMarkersArgs</a></code> |

--------------------


### enableClustering(...)

```typescript
enableClustering(args: { id: string; }) => Promise<void>
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

--------------------


### disableClustering(...)

```typescript
disableClustering(args: { id: string; }) => Promise<void>
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

--------------------


### destroy(...)

```typescript
destroy(args: DestroyMapArgs) => Promise<void>
```

| Param      | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`args`** | <code><a href="#destroymapargs">DestroyMapArgs</a></code> |

--------------------


### setCamera(...)

```typescript
setCamera(args: CameraArgs) => Promise<void>
```

| Param      | Type                                              |
| ---------- | ------------------------------------------------- |
| **`args`** | <code><a href="#cameraargs">CameraArgs</a></code> |

--------------------


### setMapType(...)

```typescript
setMapType(args: MapTypeArgs) => Promise<void>
```

| Param      | Type                                                |
| ---------- | --------------------------------------------------- |
| **`args`** | <code><a href="#maptypeargs">MapTypeArgs</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(args: IndoorMapArgs) => Promise<void>
```

| Param      | Type                                                    |
| ---------- | ------------------------------------------------------- |
| **`args`** | <code><a href="#indoormapargs">IndoorMapArgs</a></code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(args: TrafficLayerArgs) => Promise<void>
```

| Param      | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`args`** | <code><a href="#trafficlayerargs">TrafficLayerArgs</a></code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(args: AccElementsArgs) => Promise<void>
```

| Param      | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| **`args`** | <code><a href="#accelementsargs">AccElementsArgs</a></code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(args: CurrentLocArgs) => Promise<void>
```

| Param      | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`args`** | <code><a href="#currentlocargs">CurrentLocArgs</a></code> |

--------------------


### setPadding(...)

```typescript
setPadding(args: PaddingArgs) => Promise<void>
```

| Param      | Type                                                |
| ---------- | --------------------------------------------------- |
| **`args`** | <code><a href="#paddingargs">PaddingArgs</a></code> |

--------------------


### onScroll(...)

```typescript
onScroll(args: OnScrollArgs) => Promise<void>
```

| Param      | Type                                                  |
| ---------- | ----------------------------------------------------- |
| **`args`** | <code><a href="#onscrollargs">OnScrollArgs</a></code> |

--------------------


### dispatchMapEvent(...)

```typescript
dispatchMapEvent(args: { id: string; focus: boolean; }) => Promise<void>
```

| Param      | Type                                         |
| ---------- | -------------------------------------------- |
| **`args`** | <code>{ id: string; focus: boolean; }</code> |

--------------------


### getMapBounds(...)

```typescript
getMapBounds(args: { id: string; }) => Promise<LatLngBounds>
```

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#latlngbounds">LatLngBounds</a>&gt;</code>

--------------------


### Interfaces


#### CreateMapArgs

An interface containing the options used when creating a map.

| Prop              | Type                                                        | Description                                                                                        | Default            |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**          | <code>string</code>                                         | A unique identifier for the map instance.                                                          |                    |
| **`apiKey`**      | <code>string</code>                                         | The Google Maps SDK API Key.                                                                       |                    |
| **`config`**      | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | The initial configuration settings for the map.                                                    |                    |
| **`element`**     | <code>HTMLElement</code>                                    | The DOM element that the Google Map View will be mounted on which determines size and positioning. |                    |
| **`forceCreate`** | <code>boolean</code>                                        | Destroy and re-create the map instance if a map with the supplied id already exists                | <code>false</code> |


#### GoogleMapConfig

For web, all the javascript Google Maps options are available as
GoogleMapConfig extends google.maps.MapOptions.
For iOS and Android only the config options declared on <a href="#googlemapconfig">GoogleMapConfig</a> are available.

| Prop                   | Type                                      | Description                                                                                                                                               | Default            | Since |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`width`**            | <code>number</code>                       | Override width for native map.                                                                                                                            |                    |       |
| **`height`**           | <code>number</code>                       | Override height for native map.                                                                                                                           |                    |       |
| **`x`**                | <code>number</code>                       | Override absolute x coordinate position for native map.                                                                                                   |                    |       |
| **`y`**                | <code>number</code>                       | Override absolute y coordinate position for native map.                                                                                                   |                    |       |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | Default location on the Earth towards which the camera points.                                                                                            |                    |       |
| **`zoom`**             | <code>number</code>                       | Sets the zoom of the map.                                                                                                                                 |                    |       |
| **`androidLiteMode`**  | <code>boolean</code>                      | Enables image-based lite mode on Android.                                                                                                                 | <code>false</code> |       |
| **`devicePixelRatio`** | <code>number</code>                       | Override pixel ratio for native map.                                                                                                                      |                    |       |
| **`styles`**           | <code>MapTypeStyle[] \| null</code>       | Styles to apply to each of the default map types. Note that for satellite, hybrid and terrain modes, these styles will only apply to labels and geometry. |                    | 4.3.0 |


#### LatLng

An interface representing a pair of latitude and longitude coordinates.

| Prop      | Type                | Description                                                               |
| --------- | ------------------- | ------------------------------------------------------------------------- |
| **`lat`** | <code>number</code> | Coordinate latitude, in degrees. This value is in the range [-90, 90].    |
| **`lng`** | <code>number</code> | Coordinate longitude, in degrees. This value is in the range [-180, 180]. |


#### CircleOptions

An interface representing the viewports latitude and longitude bounds.

| Prop              | Type                                      |
| ----------------- | ----------------------------------------- |
| **`radius`**      | <code>number</code>                       |
| **`mapId`**       | <code>string</code>                       |
| **`center`**      | <code><a href="#latlng">LatLng</a></code> |
| **`fillColor`**   | <code>string</code>                       |
| **`strokeColor`** | <code>string</code>                       |
| **`strokeWidth`** | <code>number</code>                       |


#### AddMarkerArgs

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`id`**     | <code>string</code>                       |
| **`marker`** | <code><a href="#marker">Marker</a></code> |


#### Marker

A marker is an icon placed at a particular point on the map's surface.

| Prop             | Type                                                         | Description                                                                                                                                                                               | Default            | Since |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`coordinate`** | <code><a href="#latlng">LatLng</a></code>                    | <a href="#marker">Marker</a> position                                                                                                                                                     |                    |       |
| **`opacity`**    | <code>number</code>                                          | Sets the opacity of the marker, between 0 (completely transparent) and 1 inclusive.                                                                                                       | <code>1</code>     |       |
| **`title`**      | <code>string</code>                                          | Title, a short description of the overlay.                                                                                                                                                |                    |       |
| **`snippet`**    | <code>string</code>                                          | Snippet text, shown beneath the title in the info window when selected.                                                                                                                   |                    |       |
| **`isFlat`**     | <code>boolean</code>                                         | Controls whether this marker should be flat against the Earth's surface or a billboard facing the camera.                                                                                 | <code>false</code> |       |
| **`iconUrl`**    | <code>string</code>                                          | Path to a marker icon to render. It can be relative to the web app public directory, or a https url of a remote marker icon. **SVGs are not supported on native platforms.**              |                    | 4.2.0 |
| **`iconSize`**   | <code><a href="#size">Size</a></code>                        | Controls the scaled size of the marker image set in `iconUrl`.                                                                                                                            |                    | 4.2.0 |
| **`iconOrigin`** | <code><a href="#point">Point</a></code>                      | The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image .                                                                |                    | 4.2.0 |
| **`iconAnchor`** | <code><a href="#point">Point</a></code>                      | The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image. |                    | 4.2.0 |
| **`tintColor`**  | <code>{ r: number; g: number; b: number; a: number; }</code> | Customizes the color of the default marker image. Each value must be between 0 and 255. Only for iOS and Android.                                                                         |                    | 4.2.0 |
| **`draggable`**  | <code>boolean</code>                                         | Controls whether this marker can be dragged interactively                                                                                                                                 | <code>false</code> |       |


#### Size

| Prop         | Type                |
| ------------ | ------------------- |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### Point

| Prop    | Type                |
| ------- | ------------------- |
| **`x`** | <code>number</code> |
| **`y`** | <code>number</code> |


#### AddMarkersArgs

| Prop          | Type                  |
| ------------- | --------------------- |
| **`id`**      | <code>string</code>   |
| **`markers`** | <code>Marker[]</code> |


#### RemoveMarkerArgs

| Prop           | Type                |
| -------------- | ------------------- |
| **`id`**       | <code>string</code> |
| **`markerId`** | <code>string</code> |


#### RemoveMarkersArgs

| Prop            | Type                  |
| --------------- | --------------------- |
| **`id`**        | <code>string</code>   |
| **`markerIds`** | <code>string[]</code> |


#### DestroyMapArgs

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


#### CameraArgs

| Prop         | Type                                                  |
| ------------ | ----------------------------------------------------- |
| **`id`**     | <code>string</code>                                   |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |


#### CameraConfig

Configuration properties for a Google Map Camera

| Prop                    | Type                                      | Description                                                                                                            | Default            |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**        | <code><a href="#latlng">LatLng</a></code> | Location on the Earth towards which the camera points.                                                                 |                    |
| **`zoom`**              | <code>number</code>                       | Sets the zoom of the map.                                                                                              |                    |
| **`bearing`**           | <code>number</code>                       | Bearing of the camera, in degrees clockwise from true north.                                                           | <code>0</code>     |
| **`angle`**             | <code>number</code>                       | The angle, in degrees, of the camera from the nadir (directly facing the Earth). The only allowed values are 0 and 45. | <code>0</code>     |
| **`animate`**           | <code>boolean</code>                      | Animate the transition to the new Camera properties.                                                                   | <code>false</code> |
| **`animationDuration`** | <code>number</code>                       | This configuration option is not being used.                                                                           |                    |


#### MapTypeArgs

| Prop          | Type                                        |
| ------------- | ------------------------------------------- |
| **`id`**      | <code>string</code>                         |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |


#### IndoorMapArgs

| Prop          | Type                 |
| ------------- | -------------------- |
| **`id`**      | <code>string</code>  |
| **`enabled`** | <code>boolean</code> |


#### TrafficLayerArgs

| Prop          | Type                 |
| ------------- | -------------------- |
| **`id`**      | <code>string</code>  |
| **`enabled`** | <code>boolean</code> |


#### AccElementsArgs

| Prop          | Type                 |
| ------------- | -------------------- |
| **`id`**      | <code>string</code>  |
| **`enabled`** | <code>boolean</code> |


#### CurrentLocArgs

| Prop          | Type                 |
| ------------- | -------------------- |
| **`id`**      | <code>string</code>  |
| **`enabled`** | <code>boolean</code> |


#### PaddingArgs

| Prop          | Type                                              |
| ------------- | ------------------------------------------------- |
| **`id`**      | <code>string</code>                               |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |


#### MapPadding

Controls for setting padding on the 'visible' region of the view.

| Prop         | Type                |
| ------------ | ------------------- |
| **`top`**    | <code>number</code> |
| **`left`**   | <code>number</code> |
| **`right`**  | <code>number</code> |
| **`bottom`** | <code>number</code> |


#### OnScrollArgs

| Prop            | Type                                                                  |
| --------------- | --------------------------------------------------------------------- |
| **`id`**        | <code>string</code>                                                   |
| **`mapBounds`** | <code>{ x: number; y: number; width: number; height: number; }</code> |


#### LatLngBounds

An interface representing the viewports latitude and longitude bounds.

| Prop            | Type                                      |
| --------------- | ----------------------------------------- |
| **`southwest`** | <code><a href="#latlng">LatLng</a></code> |
| **`center`**    | <code><a href="#latlng">LatLng</a></code> |
| **`northeast`** | <code><a href="#latlng">LatLng</a></code> |


### Enums


#### MapType

| Members         | Value                    | Description                              |
| --------------- | ------------------------ | ---------------------------------------- |
| **`Normal`**    | <code>'Normal'</code>    | Basic map.                               |
| **`Hybrid`**    | <code>'Hybrid'</code>    | Satellite imagery with roads and labels. |
| **`Satellite`** | <code>'Satellite'</code> | Satellite imagery with no labels.        |
| **`Terrain`**   | <code>'Terrain'</code>   | Topographic data.                        |
| **`None`**      | <code>'None'</code>      | No base map tiles.                       |

</docgen-api>
# capacitor-custom-google-maps
