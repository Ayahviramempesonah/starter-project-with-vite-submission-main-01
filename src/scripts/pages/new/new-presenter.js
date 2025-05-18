// import Map from "../../utils/map";

// export default class NewPresenter {
//     #view;
//     #model;
//     #map = null;
//     #marker = null;

//     constructor({ view, model }) {
//         this.#view = view;
//         this.#model = model;
//     }

//     async initialMap() {
//         this.#map = await Map.build('#map', {
//           zoom: 15,
//           locate: true,
//         });

//         // Preparing marker for select coordinate
//         const centerCoordinate = this.#map.getCenter();

//          this.#updateLatLngInput(centerCoordinate.latitude, centerCoordinate.longitude);

//         const draggableMarker = this.#map.addMarker(
//           [centerCoordinate.latitude, centerCoordinate.longitude],
//           { draggable: 'true' },
//         );

//         draggableMarker.addEventListener('move', (event) => {
//           const coordinate = event.target.getLatLng();
//            this.#updateLatLngInput(coordinate.lat, coordinate.lng);
//         });

//         this.#map.addMapEventListener('click', (event) => {
//           draggableMarker.setLatLng(event.latlng);

//           // Keep center
//           event.sourceTarget.flyTo(event.latlng);
//         });

//       }
//     //   #updateLatLngInput(latitude, longitude,) {
//     //     this.#form.elements.namedItem('latitude').value = latitude;
//     //     this.#form.elements.namedItem('longitude').value = longitude;
//     //   }
//     #getDefaultCenter() {
//         return [-6.2088, 106.8457]; // Jakarta
//     }

//     #getUserLocation() {
//         return new Promise((resolve, reject) => {
//             if (!navigator.geolocation) {
//                 return reject(new Error("Browser tidak mendukung geolocation."));
//             }

//             navigator.geolocation.getCurrentPosition(
//                 (position) => resolve([position.coords.latitude, position.coords.longitude]),
//                 (error) => reject(error),
//                 {
//                     enableHighAccuracy: true,
//                     timeout: 10000,
//                     maximumAge: 0
//                 }
//             );
//         });
//     }

//     #setupMapInteractions(lat, lng) {
//         // Hapus marker lama jika ada
//         if (this.#marker) {
//             this.#map.removeMarker(this.#marker);
//         }

//         // Tambah marker baru
//         this.#marker = this.#map.addMarker([lat, lng], {
//             draggable: true,
//             alt: 'Lokasi laporan Anda'
//         });

//         // Update koordinat ketika marker dipindahkan
//         this.#marker.addEventListener('move', (event) => {
//             const coord = event.target.getLatLng();
//             this.#view.updateCoordinates(coord.lat, coord.lng);
//         });

//         // Update marker ke lokasi klik
//         this.#map.addMapEventListener('click', (event) => {
//             this.#marker.setLatLng(event.latlng);
//             this.#view.updateCoordinates(event.latlng.lat, event.latlng.lng);
//             this.#map.changeCamera(event.latlng);
//         });
//     }

//     async addNewStory(formData) {
//         try {
//             const response = await this.#model.addNewStory({
//                 description: formData.get('description'),
//                 photo: formData.get('photo'),
//                 lat: formData.get('latitude'),
//                 lon: formData.get('longitude')
//             });

//             if (!response.ok) {
//                 throw new Error(response.message || 'Gagal mengirim cerita');
//             }

//             return response;
//         } catch (error) {
//             console.error('Submission error:', error);
//             throw error;
//         }
//     }
// }

export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      const lihat = await this.#view.initialMap();
      return lihat;
    } catch (error) {
      console.error('showNewFormMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async addNewStory(storyDataFromView) {
    this.#view.showSubmitLoadingButton();
    try {
      // Extract data from the view's payload
      const { description, photoFile, latitude, longitude } = storyDataFromView;

      // The API likely expects a single photo file.
      // If photoFile is an array of blobs from the view, take the first one.
      const photoToSubmit =
        Array.isArray(photoFile) && photoFile.length > 0
          ? photoFile[0]
          : photoFile instanceof Blob || photoFile instanceof File
            ? photoFile
            : null;
      const parsedLat = parseFloat(latitude);
      const parsedLon = parseFloat(longitude);

      const modelPayload = {
        description: description,

        lat: latitude !== undefined && latitude !== null ? parseFloat(latitude) : undefined,
        lon: longitude !== undefined && longitude !== null ? parseFloat(longitude) : undefined,
        photo: photoToSubmit,
        lat: !isNaN(parsedLat) ? parsedLat : undefined,
        lon: !isNaN(parsedLon) ? parsedLon : undefined,
      };

      const response = await this.#model.addNewStory(modelPayload);
      //  console.log('log response',response)
      if (!response.ok) {
        console.log('response : error :', response);
        this.#view.storeFailed(response.message);
        return;
      }
      // this.#view.storeSuccesFully(response.message, response.data);
    } catch (error) {
      console.error('addNewStory (Presenter): error:', error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
