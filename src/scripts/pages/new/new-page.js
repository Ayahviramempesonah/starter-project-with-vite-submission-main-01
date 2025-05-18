// // import Map from '../../utils/map';
// // import NewPresenter from './new-presenter';
// // import * as StoryApi from '../../data/api';
// // // import { generateLoaderAbsoluteTemplate } from '../../utils/template';

// // export default class AddStoryPage {
// //   #presenter;
// //   #form;
// //   #videoStream = null;

// //   async render() {
// //     return `
// //       <section class="add-story-container">
// //         <h1>Add New Story</h1>
// //         <form id="add-story-form">
// //           <div class="form-group">
// //             <label for="description">Description:</label>
// //             <textarea id="description" name="description" required
// //               placeholder="Describe your story" rows="5"></textarea>
// //           </div>

// //           <div class="form-control">
// //             <label class="new-form__documentations__title">Photo</label>
// //             <div id="documentations-more-info">You can upload photos or take pictures using your camera.</div>

// //             <div class="new-form__documentations__container">
// //               <div class="new-form__documentations__buttons">
// //                 <button id="upload-photo-button" class="btn btn-outline" type="button">
// //                   Upload Photo
// //                 </button>
// //                 <input id="photo-input" name="photo" type="file" accept="image/*" hidden required>
// //                 <button id="open-camera-button" class="btn btn-outline" type="button">
// //                   Open Camera
// //                 </button>
// //               </div>

// //               <div id="camera-container" class="new-form__camera__container" style="display: none;">
// //                 <video id="camera-video" class="new-form__camera__video" autoplay playsinline>
// //                   Video stream not available.
// //                 </video>
// //                 <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>

// //                 <div class="new-form__camera__tools">
// //                   <select id="camera-select" class="form-select"></select>
// //                   <div class="new-form__camera__tools_buttons">
// //                     <button id="take-photo-button" class="btn" type="button">
// //                       Take Picture
// //                     </button>
// //                     <button id="cancel-camera-button" class="btn btn-outline" type="button">
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div id="photo-preview" class="photo-preview-container"></div>
// //             </div>
// //           </div>

// //           <div class="form-group">
// //             <div class="new-form__location__title">Location</div>
// //             <div class="new-form__location__container">
// //               <div class="new-form__location__map__container">
// //                 <div id="map" class="new-form__location__map"></div>
// //                 <div id="map-loading-container" class="map-loading-overlay">
// //                   <div class="loading-spinner"></div>
// //                   <p>Loading map...</p>
// //                 </div>
// //               </div>
// //               <div class="new-form__location__lat-lng">
// //                 <input type="number" id="latitude" name="latitude" class="form-control" readonly>
// //                 <input type="number" id="longitude" name="longitude" class="form-control" readonly>
// //               </div>
// //             </div>
// //           </div>

// //           <button type="submit" class="btn btn-primary">Submit</button>
// //         </form>
// //         <p id="form-message" class="form-message"></p>
// //       </section>
// //     `;
// //   }

// //   async afterRender() {
// //     this.#presenter = new NewPresenter({
// //       view: this,
// //       model: StoryApi,
// //     });

// //     this.#initializeForm();
// //     this.#initializeCamera();

// //     // Initialize map through presenter
// //     await this.#presenter.initMap();
// //   }

// //  // In AddStoryPage class
// // #initializeForm() {
// //     this.#form = document.getElementById('add-story-form');
// //     this.#form.addEventListener('submit', async (e) => {
// //       e.preventDefault();

// //       // Manually validate file input
// //       const fileInput = document.getElementById('photo-input');
// //       if (!fileInput.files || fileInput.files.length === 0) {
// //         this.#showMessage('Please upload a photo', 'error');
// //         fileInput.focus();
// //         return;
// //       }

// //       await this.#handleFormSubmit();
// //     });
// //   }
// //   #initializeCamera() {
// //     const uploadButton = document.getElementById('upload-photo-button');
// //     const photoInput = document.getElementById('photo-input');
// //     const openCameraButton = document.getElementById('open-camera-button');
// //     const cancelCameraButton = document.getElementById('cancel-camera-button');
// //     const takePhotoButton = document.getElementById('take-photo-button');
// //     const cameraContainer = document.getElementById('camera-container');
// //     const videoElement = document.getElementById('camera-video');
// //     const photoPreview = document.getElementById('photo-preview');

// //     uploadButton.addEventListener('click', () => photoInput.click());

// //     photoInput.addEventListener('change', (e) => {
// //       if (e.target.files && e.target.files[0]) {
// //         this.#displayPhotoPreview(e.target.files[0], photoPreview);
// //       }
// //     });

// //     openCameraButton.addEventListener('click', async () => {
// //       try {
// //         this.#videoStream = await navigator.mediaDevices.getUserMedia({
// //           video: { facingMode: 'environment' },
// //           audio: false
// //         });
// //         videoElement.srcObject = this.#videoStream;
// //         cameraContainer.style.display = 'block';
// //       } catch (err) {
// //         console.error('Camera error:', err);
// //         this.#showMessage('Could not access the camera. Please check permissions.', 'error');
// //       }
// //     });

// //     cancelCameraButton.addEventListener('click', () => {
// //       this.#stopCameraStream();
// //       cameraContainer.style.display = 'none';
// //     });

// //     takePhotoButton.addEventListener('click', () => {
// //       const canvas = document.getElementById('camera-canvas');
// //       const context = canvas.getContext('2d');

// //       canvas.width = videoElement.videoWidth;
// //       canvas.height = videoElement.videoHeight;
// //       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

// //       canvas.toBlob((blob) => {
// //         const file = new File([blob], 'camera-photo.png', { type: 'image/png' });
// //         const dataTransfer = new DataTransfer();
// //         dataTransfer.items.add(file);
// //         photoInput.files = dataTransfer.files;

// //         this.#displayPhotoPreview(URL.createObjectURL(blob), photoPreview);
// //         this.#stopCameraStream();
// //         cameraContainer.style.display = 'none';
// //       }, 'image/png', 0.9); // 0.9 quality
// //     });
// //   }

// //   #displayPhotoPreview(imageSrc, container) {
// //     container.innerHTML = '';

// //     if (typeof imageSrc === 'string') {
// //       const img = document.createElement('img');
// //       img.src = imageSrc;
// //       img.classList.add('uploaded-photo');
// //       container.appendChild(img);
// //     } else if (imageSrc instanceof File) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         const img = document.createElement('img');
// //         img.src = e.target.result;
// //         img.classList.add('uploaded-photo');
// //         container.appendChild(img);
// //       };
// //       reader.readAsDataURL(imageSrc);
// //     }
// //   }

// //   #stopCameraStream() {
// //     if (this.#videoStream) {
// //       this.#videoStream.getTracks().forEach(track => track.stop());
// //       this.#videoStream = null;
// //     }
// //   }

// //   async #handleFormSubmit() {
// //     const formData = new FormData(this.#form);

// //     try {
// //       this.#showMessage('Submitting your story...', 'info');
// //       await this.#presenter.addNewStory(formData);
// //       this.#showMessage('Story submitted successfully!', 'success');
// //       this.#form.reset();

// //       setTimeout(() => {
// //         location.hash = '/';
// //       }, 1500);
// //     } catch (error) {
// //       console.error('Submission error:', error);
// //       this.#showMessage(`Failed to submit story: ${error.message}`, 'error');
// //     }
// //   }

// //   #showMessage(message, type = 'info') {
// //     const messageElement = document.getElementById('form-message');
// //     messageElement.textContent = message;
// //     messageElement.className = `form-message ${type}`;
// //   }

// //   showMapLoading() {
// //     const container = document.getElementById('map-loading-container');
// //     container.style.display = 'flex';
// //     container.innerHTML = `
// //       <div class="loading-spinner"></div>
// //       <p>Loading map...</p>
// //     `;
// //   }

// //   hideMapLoading() {
// //     const container = document.getElementById('map-loading-container');
// //     container.style.display = 'none';
// //     container.innerHTML = '';
// //   }

// //   showMapError(message) {
// //     const container = document.getElementById('map-loading-container');
// //     container.innerHTML = `<div class="error-message">${message}</div>`;
// //   }

// //   updateCoordinates(latitude, longitude) {
// //     document.getElementById('latitude').value = latitude;
// //     document.getElementById('longitude').value = longitude;
// //   }
// // }

// //baru
// import Map from '../../utils/map';
// import NewPresenter from './new-presenter';
// import * as StoryApi from '../../data/api';

// export default class NewPage {
//     #presenter;
//     #form;
//     #camera;
//     #isCameraOpen = false;
//     #takenDocumentations = [];
//     //  #updateLatLngInput
//     #map=null

//   async render() {

//     return `
//       <section class="add-story-container">
//         <h1>Add New Story</h1>
//         <form id="add-story-form">
//           <div class="form-group">
//             <label for="description">Description:</label>
//             <textarea id="description" name="description" required
//               placeholder="Describe your story" rows="5"></textarea>
//           </div>

//           <div class="form-control">
//             <label class="new-form__documentations__title">Photo</label>
//             <div id="documentations-more-info">You can upload photos or take pictures using your camera.</div>

//             <div class="new-form__documentations__container">
//               <div class="new-form__documentations__buttons">
//                 <button id="upload-photo-button" class="btn btn-outline" type="button">
//                   Upload Photo
//                 </button>
//                 <input id="photo-input" name="photo" type="file" accept="image/*" hidden required>
//                 <button id="open-camera-button" class="btn btn-outline" type="button">
//                   Open Camera
//                 </button>
//               </div>

//               <div id="camera-container" class="new-form__camera__container" style="display: none;">
//                 <video id="camera-video" class="new-form__camera__video" autoplay playsinline>
//                   Video stream not available.
//                 </video>
//                 <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>

//                 <div class="new-form__camera__tools">
//                   <select id="camera-select" class="form-select"></select>
//                   <div class="new-form__camera__tools_buttons">
//                     <button id="take-photo-button" class="btn" type="button">
//                       Take Picture
//                     </button>
//                     <button id="cancel-camera-button" class="btn btn-outline" type="button">
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div id="photo-preview" class="photo-preview-container"></div>
//             </div>
//           </div>

//           <div class="form-group">
//             <div class="new-form__location__title">Location</div>
//             <div class="new-form__location__container">
//               <div class="new-form__location__map__container">
//                 <div id="map" class="new-form__location__map"></div>
//                 <div id="map-loading-container" class="map-loading-overlay">
//                   <div class="loading-spinner"></div>
//                   <p>Loading map...</p>
//                 </div>
//               </div>
//               <div class="new-form__location__lat-lng">
//                 <input type="number" id="latitude" name="latitude" class="form-control" readonly>
//                 <input type="number" id="longitude" name="longitude" class="form-control" readonly>
//               </div>
//             </div>
//           </div>

//           <button type="submit" class="btn btn-primary">Submit</button>
//         </form>
//         <p id="form-message" class="form-message"></p>
//       </section>
//     `;
//   }

// //   async afterRender() {
// //     this.#presenter = new NewPresenter({
// //       view: this,
// //       model: StoryApi,
// //     });

// //     this.#initializeForm();
// //     this.#initializeCamera();

// //     // Initialize map and location handling
// //     await this.#presenter.initMap({
// //       onLocationSelected: (lat, lon) => this.updateCoordinates(lat, lon),
// //       onError: (err) => this.showMapError(err.message || 'Failed to load map')
// //     });

// //     // Attach unload listener
// //     window.addEventListener('beforeunload', () => {
// //       this.#stopCameraStream();
// //     });
// //   }

// //   // Di new-page.js
// // // Di AddStoryPage class
// // #initializeForm() {
// //     this.#form = document.getElementById('add-story-form');
// //     const submitBtn = this.#form.querySelector('button[type="submit"]');

// //     this.#form.addEventListener('submit', async (e) => {
// //       e.preventDefault();
// //       submitBtn.disabled = true;

// //       try {
// //         // Clear previous messages
// //         this.#showMessage('', '');

// //         // Validasi input
// //         const description = document.getElementById('description').value.trim();
// //         const photoInput = document.getElementById('photo-input');
// //         const latInput = document.getElementById('latitude');
// //         const lonInput = document.getElementById('longitude');

// //         // Validasi description
// //         if (!description || description.length < 10) {
// //           throw new Error('Description must be at least 10 characters');
// //         }

// //         // Validasi photo
// //         if (!photoInput.files?.[0]) {
// //           throw new Error('Please upload a photo');
// //         }

// //         // Validasi dan konversi koordinat
// //         const lat = latInput.value ? parseFloat(latInput.value) : null;
// //         const lon = lonInput.value ? parseFloat(lonInput.value) : null;

// //         if (latInput.value && isNaN(lat)) {
// //           throw new Error('Latitude must be a valid number');
// //         }
// //         if (lonInput.value && isNaN(lon)) {
// //           throw new Error('Longitude must be a valid number');
// //         }

// //         // Submit form
// //         const formData = new FormData();
// //         formData.append('description', description);
// //         formData.append('photo', photoInput.files[0]);
// //         if (lat !== null) formData.append('lat', lat.toString());
// //         if (lon !== null) formData.append('lon', lon.toString());

// //         this.#showMessage('Submitting your story...', 'info');
// //         await this.#presenter.addNewStory(formData);
// //         this.#showMessage('Story submitted successfully!', 'success');

// //         setTimeout(() => {
// //           location.hash = '/';
// //         }, 1500);

// //       } catch (error) {
// //         console.error('Submission error:', error);
// //         this.#showMessage(error.message, 'error');
// //       } finally {
// //         submitBtn.disabled = false;
// //       }
// //     });
// //   }

// //   #initializeCamera() {
// //     const uploadButton = document.getElementById('upload-photo-button');
// //     const photoInput = document.getElementById('photo-input');
// //     const openCameraButton = document.getElementById('open-camera-button');
// //     const cancelCameraButton = document.getElementById('cancel-camera-button');
// //     const takePhotoButton = document.getElementById('take-photo-button');
// //     const cameraContainer = document.getElementById('camera-container');
// //     const videoElement = document.getElementById('camera-video');
// //     const photoPreview = document.getElementById('photo-preview');

// //     uploadButton.addEventListener('click', () => photoInput.click());

// //     photoInput.addEventListener('change', (e) => {
// //       if (e.target.files && e.target.files[0]) {
// //         this.#displayPhotoPreview(e.target.files[0], photoPreview);
// //       }
// //     });

// //     openCameraButton.addEventListener('click', async () => {
// //       try {
// //         this.#videoStream = await navigator.mediaDevices.getUserMedia({
// //           video: { facingMode: 'environment' },
// //           audio: false
// //         });
// //         videoElement.srcObject = this.#videoStream;
// //         cameraContainer.style.display = 'block';
// //       } catch (err) {
// //         console.error('Camera error:', err);
// //         this.#showMessage('Could not access the camera. Please check permissions.', 'error');
// //       }
// //     });

// //     cancelCameraButton.addEventListener('click', () => {
// //       this.#stopCameraStream();
// //       cameraContainer.style.display = 'none';
// //     });

// //     takePhotoButton.addEventListener('click', () => {
// //       const canvas = document.getElementById('camera-canvas');
// //       const context = canvas.getContext('2d');

// //       canvas.width = videoElement.videoWidth;
// //       canvas.height = videoElement.videoHeight;
// //       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

// //       canvas.toBlob((blob) => {
// //         const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
// //         const dataTransfer = new DataTransfer();
// //         dataTransfer.items.add(file);
// //         photoInput.files = dataTransfer.files;

// //         this.#displayPhotoPreview(URL.createObjectURL(blob), photoPreview);
// //         this.#stopCameraStream();
// //         cameraContainer.style.display = 'none';
// //       }, 'image/jpeg', 0.8); // Kompresi 80%
// //     });
// //   }

// //   // Di new-page.js
// // async #handleFormSubmit() {
// //     const formData = new FormData(this.#form);

// //     try {
// //       const response = await this.#presenter.addNewStory(formData);
// //       this.#showMessage('Story submitted successfully!', 'success');
// //       setTimeout(() => location.hash = '/', 1500);
// //     } catch (error) {
// //       this.#showMessage(`Error: ${error.message}`, 'error');
// //     }
// //   }

// //   #displayPhotoPreview(imageSrc, container) {
// //     container.innerHTML = '';

// //     if (typeof imageSrc === 'string') {
// //       const img = document.createElement('img');
// //       img.src = imageSrc;
// //       img.classList.add('uploaded-photo');
// //       container.appendChild(img);
// //     } else if (imageSrc instanceof File) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         const img = document.createElement('img');
// //         img.src = e.target.result;
// //         img.classList.add('uploaded-photo');
// //         container.appendChild(img);
// //       };
// //       reader.readAsDataURL(imageSrc);
// //     }
// //   }

// //   #stopCameraStream() {
// //     if (this.#videoStream) {
// //       this.#videoStream.getTracks().forEach(track => track.stop());
// //       this.#videoStream = null;
// //     }
// //   }

// //   #showMessage(message, type = 'info') {
// //     const messageElement = document.getElementById('form-message');
// //     messageElement.textContent = message;
// //     messageElement.className = `form-message ${type}`;
// //   }

// //   showMapLoading() {
// //     const container = document.getElementById('map-loading-container');
// //     container.style.display = 'flex';
// //     container.innerHTML = `
// //       <div class="loading-spinner"></div>
// //       <p>Loading map...</p>
// //     `;
// //   }

// //   hideMapLoading() {
// //     const container = document.getElementById('map-loading-container');
// //     container.style.display = 'none';
// //     container.innerHTML = '';
// //   }

// //   showMapError(message) {
// //     const container = document.getElementById('map-loading-container');
// //     container.innerHTML = `<div class="error-message">${message}</div>`;
// //   }

// //   updateCoordinates(latitude, longitude) {
// //     document.getElementById('latitude').value = latitude;
// //     document.getElementById('longitude').value = longitude;
// //   }
// //   showSubmitLoading() {
// //     const submitBtn = this.#form.querySelector('button[type="submit"]');
// //     submitBtn.disabled = true;
// //     submitBtn.textContent = 'Submitting...';
// //   }

// //   hideSubmitLoading() {
// //     const submitBtn = this.#form.querySelector('button[type="submit"]');
// //     submitBtn.disabled = false;
// //     submitBtn.textContent = 'Submit';
// //   }

// //   showSuccessMessage(message) {
// //     document.getElementById('form-message').textContent = message;
// //     document.getElementById('form-message').className = 'form-message success';
// //   }

// //   showErrorMessage(message) {
// //     document.getElementById('form-message').textContent = message;
// //     document.getElementById('form-message').className = 'form-message error';
// //   }

// async afterRender(){

//     this.#presenter = new NewPresenter({
//       view: this,
//       model: StoryApi,
//     });
//    const lihat =  this.#presenter.showNewFormMap()

//   console.log('lihat',lihat);
// }

// // inisialisasi map
// async initialMap() {
//     this.#map = await Map.build('#map', {
//       zoom: 15,
//       locate: true,
//     });

//     // Preparing marker for select coordinate
//     const centerCoordinate = this.#map.getCenter();

//      this.#updateLatLngInput(centerCoordinate.latitude, centerCoordinate.longitude);

//     const draggableMarker = this.#map.addMarker(
//       [centerCoordinate.latitude, centerCoordinate.longitude],
//       { draggable: 'true' },
//     );

//     draggableMarker.addEventListener('move', (event) => {
//       const coordinate = event.target.getLatLng();
//        this.#updateLatLngInput(coordinate.lat, coordinate.lng);
//     });

//     this.#map.addMapEventListener('click', (event) => {
//       draggableMarker.setLatLng(event.latlng);

//       // Keep center
//       event.sourceTarget.flyTo(event.latlng);
//     });

//   }

//   #updateLatLngInput(latitude, longitude,) {
//     this.#form.elements.namedItem('latitude').value = latitude;
//     this.#form.elements.namedItem('longitude').value = longitude;
//   }

//   clearForm() {
//     this.#form.reset();
//   }

//   showMapLoading() {
//     document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
//   }

//   hideMapLoading() {
//     document.getElementById('map-loading-container').innerHTML = '';
//   }

//   showSubmitLoadingButton() {
//     document.getElementById('submit-button-container').innerHTML = `
//       <button class="btn" type="submit" disabled>
//         <i class="fas fa-spinner loader-button"></i> Buat Laporan
//       </button>
//     `;
//   }

//   hideSubmitLoadingButton() {
//     document.getElementById('submit-button-container').innerHTML = `
//       <button class="btn" type="submit">Buat Laporan</button>
//     `;
//   }

// }

//batas

import Map from '../../utils/map';
import NewPresenter from './new-presenter';
import * as StoryApi from '../../data/api';
import { generateLoaderAbsoluteTemplate } from '../../template';
import Camera from '../../utils/camera';
// import { addNewStory } from '../../data/api';

export default class AddStoryPage {
  #presenter;
  #form;
  #camera;
  #videoStream = null;
  #isCameraOpen = false;
  #takenDocumentations = [];
  // #updateLatLngInput
  #map = null;

  async render() {
    return `
    <section class="add-story-container">
        <h2>Add New Story</h2>
        <form id="add-story-form" >

        <!-- title-->
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required placeholder="Story title">
          </div>

          <!-- description -->
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" name="description" required placeholder="Describe your story" rows="5"></textarea>
          </div>

          <div class="new-form__documentations__container">
                <div class="new-form__documentations__buttons">
                  <button id="documentations-input-button" class="btn btn-outline" type="button">
                    Ambil Gambar
                  </button>
                  <input
                    id="documentations-input"
                    name="documentations"
                    type="file"
                    accept="image/*"
                    multiple
                    hidden="hidden"
                    aria-multiline="true"
                    aria-describedby="documentations-more-info"
                  >
                  <button id="open-documentations-camera-button" class="btn btn-outline" type="button">
                    Buka Kamera
                  </button>
                </div>
                <div id="camera-container" class="new-form__camera__container">
                  <video id="camera-video" class="new-form__camera__video">
                    Video stream not available.
                  </video>
                  <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas> 
  
                  <div class="new-form__camera__tools">
                    <select id="camera-select"></select>
                    <div class="new-form__camera__tools_buttons">
                                    <ul id="documentations-taken-list" class="new-form__documentations__outputs"></ul>

                      <button id="camera-take-button" class="btn" type="button">
                        Ambil Gambar
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          <div class="form-group">
            <div class="new-form__location__title">Location</div>
            <div class="new-form__location__container">
              <div class="new-form__location__map__container">
                <div id="map" class="new-form__location__map"></div>
                <div id="map-loading-container" class="map-loading-overlay">
                  <div class="loading-spinner"></div>
                  <p>Loading map...</p>
                </div>
              </div>
              <div class="new-form__location__lat-lng">
                <input type="number" id="latitude" name="latitude" class="form-control" readonly>
                <input type="number" id="longitude" name="longitude" class="form-control" readonly>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p id="form-message" class="form-message"></p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new NewPresenter({
      view: this,
      model: StoryApi,
    });
    this.#takenDocumentations = [];
    this.#presenter.showNewFormMap();
    this.#setupForm();
  }

  // setup form
  #setupForm() {
    // Ambil elemen form
    this.#form = document.getElementById('add-story-form');
    if (!this.#form) {
      console.error('Form with ID "add-story-form" not found.');
      return;
    }

    // Handle submit form
    this.#form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        title: this.#form.elements.namedItem('title').value,
        description: this.#form.elements.namedItem('description').value,
        photoFile: this.#takenDocumentations.map((picture) => picture.blob),
        latitude: this.#form.elements.namedItem('latitude').value,
        longitude: this.#form.elements.namedItem('longitude').value,
      };

      // await this.#presenter.addNewStory(data);
      try {
        await this.#presenter.addNewStory(data);
        this.storeSuccesFully('Story submitted successfully!');
      } catch (err) {
        console.error('Error adding story:', err);
      }
    });

    // Handle input file (upload photo)
    document.getElementById('documentations-input').addEventListener('change', async (event) => {
      const insertingPicturesPromises = Object.values(event.target.files).map(async (file) => {
        return await this.#addTakenPicture(file);
      });
      await Promise.all(insertingPicturesPromises);

      await this.#populateTakenPictures();
    });

    // Handle button camera
    document.getElementById('documentations-input-button').addEventListener('click', () => {
      document.getElementById('documentations-input').click();
    });

    // camera container
    const cameraContainer = document.getElementById('camera-container');
    document
      .getElementById('open-documentations-camera-button')
      .addEventListener('click', async (event) => {
        cameraContainer.classList.toggle('open');
        this.#isCameraOpen = cameraContainer.classList.contains('open');

        if (this.#isCameraOpen) {
          event.currentTarget.textContent = 'Tutup Kamera';
          this.#setupCamera();
          await this.#camera.launch();
          this.#videoStream = null;

          return;
        }

        event.currentTarget.textContent = 'Buka Kamera';
        this.#camera.stop();
      });
  }

  //setup camera
  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById('camera-video'),
        canvas: document.getElementById('camera-canvas'),
        cameraSelect: document.getElementById('camera-select'),
      });
    }

    this.#camera.addCheeseButtonListener('#camera-take-button', async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPictures();
    });
  }

  async #populateTakenPictures() {
    const html = this.#takenDocumentations.reduce((accumulator, picture, currentIndex) => {
      const imageUrl = URL.createObjectURL(picture.blob);
      return accumulator.concat(`
        <li class="new-form__documentations__outputs-item">
          <button type="button" data-deletepictureid="${picture.id}" class="new-form__documentations__outputs-item__delete-btn">
            <img src="${imageUrl}" alt="Dokumentasi ke-${currentIndex + 1}">
          </button>
        </li>
      `);
    }, '');

    const listElement = document.getElementById('documentations-taken-list');
    listElement.innerHTML = html;

    // Pasang event listener untuk tombol delete
    listElement.querySelectorAll('button[data-deletepictureid]').forEach((button) => {
      // Now listElement is defined
      button.addEventListener('click', (event) => {
        const pictureId = event.currentTarget.dataset.deletepictureid;

        const deleted = this.#removePicture(pictureId);
        if (!deleted) {
          console.warn(`Picture with id ${pictureId} was not found`);
        }

        // Refresh tampilan setelah penghapusan
        this.#populateTakenPictures();
      });
    });
  }

  // hapus gambar
  #removePicture(id) {
    const selectedPicture = this.#takenDocumentations.find((picture) => {
      return picture.id == id;
    });

    // Check if founded selectedPicture is available
    if (!selectedPicture) {
      return null;
    }

    // Deleting selected selectedPicture from takenPictures
    this.#takenDocumentations = this.#takenDocumentations.filter((picture) => {
      return picture.id != selectedPicture.id;
    });

    return selectedPicture;
  }

  //menyimpan gambar dengan nilai string dan id
  async #addTakenPicture(image) {
    let blob = image;

    // Assuming convertBase64ToBlob is defined elsewhere
    if (typeof image === 'string') {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
    this.#takenDocumentations = [...this.#takenDocumentations, newDocumentation];
  }

  //inisialisasi map
  // async initialMap() {
  //   this.#map = await Map.build('#map', {
  //     zoom: 15,
  //     locate: true,
  //   });

  //   // Preparing marker for select coordinate
  //   const centerCoordinate = this.#map.getCenter();

  //   this.#updateLatLngInput(centerCoordinate.latitude, centerCoordinate.longitude);

  //   const draggableMarker = this.#map.addMarker(
  //     [centerCoordinate.latitude, centerCoordinate.longitude],
  //     { draggable: 'true' },
  //   );

  //   draggableMarker.addEventListener('move', (event) => {
  //     const coordinate = event.target.getLatLng();
  //     this.#updateLatLngInput(coordinate.lat, coordinate.lng);
  //   });

  //   this.#map.addMapEventListener('click', (event) => {
  //     draggableMarker.setLatLng(event.latlng);

  //     // Keep center
  //     event.sourceTarget.flyTo(event.latlng);
  //   });
  //   return this.#map; // Or return true, or an object indicating success
  // }
  // baru
  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 15,
      locate: true,
    });

    // Preparing marker for select coordinate
    const centerCoordinate = this.#map.getCenter();

    this.#updateLatLngInput(centerCoordinate.latitude, centerCoordinate.longitude);

    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: 'true' },
    );

    // Bind popup to marker
    draggableMarker.bindPopup('Lokasi Kamu').openPopup();

    // Update popup content when marker is moved
    draggableMarker.addEventListener('move', (event) => {
      const coordinate = event.target.getLatLng();
      this.#updateLatLngInput(coordinate.lat, coordinate.lng);

      // Update popup content with new coordinates
      draggableMarker.setPopupContent(`: ${coordinate.lat}, ${coordinate.lng}`);
    });

    // Handle map click event
    this.#map.addMapEventListener('click', (event) => {
      // Move marker to clicked location
      draggableMarker.setLatLng(event.latlng);

      // Update popup content with clicked coordinates
      draggableMarker
        .setPopupContent(` kamoh ada dsini Lat: ${event.latlng.lat}, Lng: ${event.latlng.lng}`)
        .openPopup();

      // Keep the map centered on the clicked location
      event.sourceTarget.flyTo(event.latlng);
    });

    return this.#map; // Or return true, or an object indicating success
  }

  #updateLatLngInput(latitude, longitude) {
    this.#form.elements.namedItem('latitude').value = latitude;
    this.#form.elements.namedItem('longitude').value = longitude;
  }

  storeFailed(message) {
    alert(message);
  }

  storeSuccesFully(message) {
    // alert(message);
    this.clearForm();
    location.hash = '/';
  }

  clearForm() {
    this.#form.reset();
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showSubmitLoadingButton() {
    const submitButton = this.#form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      // You can add a loading spinner or change text, e.g.:
      // submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...`;
      submitButton.textContent = 'Submitting...';
    }
  }

  hideSubmitLoadingButton() {
    const submitButton = this.#form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    }
  }
}
