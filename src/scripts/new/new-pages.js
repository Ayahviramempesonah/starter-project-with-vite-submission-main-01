// import { addNewStory } from '../data/api';
// export default class AddStoryPage {
//   async render() {
//     return `
//       <section class="add-story-container">
//         <h1>Add New Story</h1>
//         <form id="add-story-form">
//           <div>
//             <label for="description">Description:</label>
//             <textarea id="description" name="description" required></textarea>
//           </div>
//           <div>
//             <label for="photo">Photo:</label>
//             <input type="file" id="photo" name="photo" accept="image/*" required />
//           </div>
//           <div>
//             <label for="lat">Latitude (optional):</label>
//             <input type="number" id="lat" name="lat" step="any" />
//           </div>
//           <div>
//             <label for="lon">Longitude (optional):</label>
//             <input type="number" id="lon" name="lon" step="any" />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//         <p id="form-message"></p>
//       </section>
//     `;
//   }

//   async afterRender() {
//     const form = document.getElementById('add-story-form');
//     const formMessage = document.getElementById('form-message');

//     form.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       try {
//         // Ambil nilai dari form
//         const description = form.description.value;
//         const photoFile = form.photo.files[0];
//         const lat = parseFloat(form.lat.value) || null;
//         const lon = parseFloat(form.lon.value) || null;

//         // Validasi ukuran file (maksimal 1MB)
//         if (photoFile.size > 1024 * 1024) {
//           throw new Error('File size must not exceed 1MB.');
//         }

//         // Kirim data ke API
//         await addNewStory(description, photoFile, lat, lon);

//         // Tampilkan pesan sukses
//         formMessage.textContent = 'Story added successfully!';
//         formMessage.style.color = 'green';
//         form.reset();
//       } catch (error) {
//         console.error('Error adding story:', error.message);
//         formMessage.textContent = error.message;
//         formMessage.style.color = 'red';
//       }
//     });
//   }
// }

//baru

// import Map from '../../utils/map'; // Pastikan path benar
import { addNewStory } from '../data/api';
import Map from '../utils/map';

export default class AddStoryPage {
  #map;
  #marker = null;
  #videoStream = null;

  async render() {
    return `
      <section class="add-story-container">
        <h1>Add New Story</h1>
        
        <form id="add-story-form">
          <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea>
          </div>
  
          <!-- Area Kamera -->
          <div style="margin-top: 20px;">
            <h3>Camera Preview</h3>
            <video id="video" autoplay playsinline style="width: 100%; height: auto; border-radius: 8px;"></video>
            <button type="button" id="capture-btn" style="margin-top: 10px;">Capture Photo</button>
            <canvas id="canvas" style="display: none;"></canvas>
          </div>
  
          <!-- Gambar Hasil Tangkapan -->
          <div style="margin-top: 15px;" id="image-preview"></div>
  
          <!-- Peta dan Lokasi -->
          <div style="margin-top: 20px;">
            <h3>Set Location</h3>
            <div id="map" style="height: 400px; border-radius: 8px;"></div>
          </div>
  
          <div style="display: flex; gap: 10px;">
            <div style="flex:1;">
              <label for="lat">Latitude:</label>
              <input type="number" id="lat" name="lat" step="any" readonly />
            </div>
            <div style="flex:1;">
              <label for="lon">Longitude:</label>
              <input type="number" id="lon" name="lon" step="any" readonly />
            </div>
          </div>
  
          <button type="submit">Submit</button>
        </form>
        <p id="form-message"></p>
      </section>
    `;
  }

  async afterRender() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureBtn = document.getElementById('capture-btn');
    const imagePreview = document.getElementById('image-preview');
    const form = document.getElementById('add-story-form');
    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');
    const formMessage = document.getElementById('form-message');

    let photoBlob = null;

    // Aktifkan kamera
    try {
      this.#videoStream = await navigator.mediaDevices.getUserMedia({ video:{facingMode: "environment"}});
      video.srcObject = this.#videoStream;
    } catch (err) {
      console.error('Tidak dapat mengakses kamera:', err);
      alert('Kamera tidak dapat diakses.');
    }

    // Ambil foto saat tombol ditekan
    captureBtn.addEventListener('click', () => {
      if (!video.srcObject) {
        alert('Kamera belum aktif.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        photoBlob = blob;

        // Tampilkan preview gambar
        const imageUrl = URL.createObjectURL(blob);
        imagePreview.innerHTML = `
          <img src="${imageUrl}" alt="Foto Terkini" style="max-width: 100%; border-radius: 8px;" />
        `;
      }, 'image/jpeg');
    });

    // Inisialisasi peta
    try {
      this.#map = await Map.build('#map', {
        zoom: 12,
        center: [-6.2, 106.816666], // Default Jakarta
      });

      this.#marker = this.#map.addMarker([-6.2, 106.816666], {
        alt: 'Drag me to set location',
        draggable: true,
      });

      this.#marker.bindPopup('Move this marker to set the location.');

      this.#marker.on('dragend', () => {
        const position = this.#marker.getLatLng();
        latInput.value = position.lat;
        lonInput.value = position.lng;
      });
    } catch (error) {
      console.error('Failed to initialize map:', error.message);
      formMessage.textContent = 'Peta tidak dapat dimuat.';
      formMessage.style.color = 'red';
    }

    // Submit form
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const description = form.description.value;
        const lat = parseFloat(latInput.value) || null;
        const lon = parseFloat(lonInput.value) || null;

        if (!photoBlob) {
          throw new Error('Silakan ambil foto terlebih dahulu.');
        }

        // Buat file dari blob
        const photoFile = new File([photoBlob], 'captured-photo.jpg', { type: 'image/jpeg' });

        await addNewStory(description, photoFile, lat, lon);

        formMessage.textContent = 'Cerita berhasil ditambahkan!';
        formMessage.style.color = 'green';

        // Reset form dan preview
        imagePreview.innerHTML = '';
        photoBlob = null;
        form.reset();
        latInput.value = '';
        lonInput.value = '';

        // Reset marker
        if (this.#marker) {
          this.#marker.setLatLng([-6.2, 106.816666]);
        }
      } catch (error) {
        console.error('Error adding story:', error.message);
        formMessage.textContent = error.message;
        formMessage.style.color = 'red';
      }
    });
  }

  // Matikan stream kamera saat halaman diubah
  destroy() {
    if (this.#videoStream) {
      this.#videoStream.getTracks().forEach((track) => track.stop());
      this.#videoStream = null;
    }
  }
}
