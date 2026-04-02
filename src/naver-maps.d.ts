declare namespace naver.maps {
  class Map {
    constructor(el: HTMLElement, options?: MapOptions);
    getCenter(): LatLng;
  }
  class LatLng {
    constructor(lat: number, lng: number);
  }
  class Marker {
    constructor(options: { position: LatLng; map: Map });
  }
  interface MapOptions {
    center?: LatLng;
    zoom?: number;
    zoomControl?: boolean;
    mapDataControl?: boolean;
    scaleControl?: boolean;
  }
}

interface Window {
  naver: typeof naver;
}
