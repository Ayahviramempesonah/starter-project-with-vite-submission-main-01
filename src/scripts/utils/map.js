import { map, tileLayer, Icon, icon, marker, popup, latLng } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import { MAP_SERVICE_API_KEY } from '../config';
import CONFIG from '../config';

export default class Map {
  #zoom = 5;
  #map = null;
  // tesh push merge

  /**
   * Mengambil nama tempat berdasarkan koordinat menggunakan reverse geocoding.
   * @param {number} latitude - Latitude lokasi.
   * @param {number} longitude - Longitude lokasi.
   * @returns {Promise<string>} Nama tempat atau koordinat jika gagal.
   */
  static async getPlaceNameByCoordinate(latitude, longitude) {
    // Validasi input
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      throw new Error('Latitude and longitude must be numbers');
    }

    try {
      // Membuat URL API
      const url = new URL(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json`);
      url.searchParams.set('key', CONFIG.MAP_SERVICE_API_KEY);
      url.searchParams.set('language', 'id');
      url.searchParams.set('limit', '1');

      // Mengirim permintaan ke API
      const response = await fetch(url);

      // Memeriksa apakah respons berhasil
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      // Parsing respons JSON
      const json = await response.json();

      // Memastikan data features tersedia
      if (!Array.isArray(json.features) || json.features.length === 0) {
        throw new Error('No features found in the API response');
      }

      // Mengambil nama tempat
      const placeName = json.features[0].place_name;
      if (!placeName) {
        throw new Error('Place name not available in the API response');
      }

      // Memecah nama tempat menjadi komponen-komponennya
      const placeParts = placeName.split(', ');
      return [placeParts.at(-2), placeParts.at(-1)].join(', ');
    } catch (error) {
      console.error('getPlaceNameByCoordinate: error:', error.message);
      return `${latitude}, ${longitude}`;
    }
  }

  static isGeolocationAvailable() {
    return 'geolocation' in navigator;
  }

  static getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!Map.isGeolocationAvailable()) {
        reject('Geolocation API unsupported');
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  /**
   * Reference of using this static method:
   * https://stackoverflow.com/questions/43431550/how-can-i-invoke-asynchronous-code-within-a-constructor
   * */
  static async build(selector, options = {}) {
    if ('center' in options && options.center) {
      return new Map(selector, options);
    }

    const jakartaCoordinate = [-6.2, 106.816666];

    // Using Geolocation API
    if ('locate' in options && options.locate) {
      try {
        const position = await Map.getCurrentPosition();
        const coordinate = [position.coords.latitude, position.coords.longitude];

        return new Map(selector, {
          ...options,
          center: coordinate,
        });
      } catch (error) {
        console.error('build: error:', error);

        return new Map(selector, {
          ...options,
          center: jakartaCoordinate,
        });
      }
    }

    return new Map(selector, {
      ...options,
      center: jakartaCoordinate,
    });
  }

  constructor(selector, options = {}) {
    this.#zoom = options.zoom ?? this.#zoom;

    const tileOsm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });

    this.#map = map(document.querySelector(selector), {
      zoom: this.#zoom,
      scrollWheelZoom: false,
      layers: [tileOsm],
      ...options,
    });
  }

  changeCamera(coordinate, zoomLevel = null) {
    if (!zoomLevel) {
      this.#map.setView(latLng(coordinate), this.#zoom);
      return;
    }

    this.#map.setView(latLng(coordinate), zoomLevel);
  }

  getCenter() {
    const { lat, lng } = this.#map.getCenter();
    return {
      latitude: lat,
      longitude: lng,
    };
  }

  createIcon(options = {}) {
    return icon({
      ...Icon.Default.prototype.options,
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      ...options,
    });
  }

  addMarker(coordinates, markerOptions = {}, popupOptions = null) {
    if (typeof markerOptions !== 'object') {
      throw new Error('markerOptions must be an object');
    }

    const newMarker = marker(coordinates, {
      icon: this.createIcon(),
      alt: 'Marker',
      draggable: true,
      ...markerOptions,
    });

    if (popupOptions) {
      if (typeof popupOptions !== 'object') {
        throw new Error('popupOptions must be an object');
      }

      const newPopup = popup(popupOptions);
      newPopup.setLatLng(coordinates);
      newPopup.setContent((layer) => {
        return layer.options.alt;
      });
      newMarker.bindPopup(newPopup);
    }

    newMarker.addTo(this.#map);

    return newMarker;
  }

  addMapEventListener(eventName, callback) {
    this.#map.addEventListener(eventName, callback);
  }
}


//baru

// import { map, tileLayer, marker, circle, popup } from 'leaflet';

// export default class Map {
//   constructor(selector, center = [-6.2088, 106.8456], zoom = 13) {
//     this.map = map(document.querySelector(selector), {
//       center,
//       zoom,
//     });

//     // Tambahkan tile layer OpenStreetMap
//     tileLayer('https://tile.openstreetmap.org/ {z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(this.map);
//   }

//   /**
//    * Menambahkan marker ke peta
//    * @param {Array} coordinates [lat, lng]
//    * @param {String} text Konten popup
//    * @param {Boolean} openPopup Apakah popup langsung dibuka?
//    */
//   addMarker(coordinates, text = '', openPopup = false) {
//     const newMarker = marker(coordinates).addTo(this.map);
//     if (text) {
//       newMarker.bindPopup(text);
//       if (openPopup) {
//         newMarker.openPopup();
//       }
//     }
//     return newMarker;
//   }

//   /**
//    * Menambahkan lingkaran ke peta
//    * @param {Array} coordinates [lat, lng]
//    * @param {Number} radius Radius dalam meter
//    * @param {Object} options Opsi styling
//    * @param {String} popupText Konten popup
//    */
//   addCircle(coordinates, radius = 500, options = {}, popupText = '') {
//     const defaultOptions = {
//       color: 'red',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       ...options,
//     };

//     const newCircle = circle(coordinates, defaultOptions).addTo(this.map);

//     if (popupText) {
//       newCircle.bindPopup(popupText);
//     }

//     return newCircle;
//   }

//   /**
//    * Menambahkan event click pada peta
//    * @param {Function} callback Fungsi yang dipanggil saat klik
//    */
//   onMapClick(callback) {
//     this.map.on('click', (e) => {
//       if (typeof callback === 'function') {
//         callback(e);
//       } else {
//         const pop = popup()
//           .setLatLng(e.latlng)
//           .setContent(`You clicked the map at ${e.latlng.toString()}`)
//           .openOn(this.map);
//       }
//     });
//   }

//   /**
//    * Memindahkan kamera ke koordinat tertentu
//    * @param {Array} coordinates [lat, lng]
//    * @param {Number} zoomLevel Level zoom
//    */
//   setView(coordinates, zoomLevel = this.map.getZoom()) {
//     this.map.setView(coordinates, zoomLevel);
//   }
// }