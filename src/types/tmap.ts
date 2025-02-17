export type MapOptions = {
  zoomControl?: boolean;
};

export type NewAddress = {
  centerLat: string;
  centerLon: string;
  frontLat: string;
  frontLon: string;
  fullAddressRoad: string;
};

export type NewAddressList = {
  newAddress: NewAddress[];
};

export type Poi = {
  newAddressList: NewAddressList;
  id: string;
  pkey: string;
  name: string;
  noorLat: string;
  noorLon: string;
};

export type Pois = {
  poi: Poi[];
};

export type SearchPoiInfo = {
  totalCount: string;
  count: string;
  page: string;
  pois: Pois;
};

export type TMap = {
  setCenter: (latLng: TMapLatLng) => void;
  setZoomLimit: (minZoom: number, maxZoom: number) => void;
  setZoom: (zoomLevel: number) => void;
  setOptions: ({ zoomControl }: MapOptions) => void;
  destroy: () => void;
  on: (eventType: EventType, listener: (event: TMapEvent) => void) => void;
  off: (eventType: EventType) => void;
  fitBounds: (
    latLngBounds: TMapLatLngBounds,
    margin:
      | number
      | {
          left: number;
          right: number;
          top: number;
          bottom: number;
        }
  ) => void;
};
type EventType = "Click";
export type TMapEvent = {
  data: {
    lngLat: TMapLatLng;
  };
};
export type TMapLatLng = {
  lat: () => number;
  lng: () => number;
  _lat: number;
  _lng: number;
};

export type TMapPolyline = {
  getPath: () => TMapLatLng[];
  setMap: (map: TMap | null) => void;
};

export type TMapLatLngBounds = {
  toString: () => string;
  contains: (latLng: TMapLatLng) => boolean;
  extend: (latLng: TMapLatLng) => void;
};

export type TMapMarker = {
  setMap: (map: TMap | null) => void;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  setLabel: (HTML: string) => void;
};
export type TMapSize = {
  _width: number;
  _height: number;
};
export type TmapAddressInfo = {
  fullAddress: string;
};
export type TmapResponse = {
  searchPoiInfo: SearchPoiInfo;
};
export type TmapReverseGeocodingResponse = {
  addressInfo: TmapAddressInfo;
};

export type TMapInfoWindow = {
  getOffset: () => TMapSize;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  getContent: () => string;
  setMap: (map: TMap | null) => void;
};
