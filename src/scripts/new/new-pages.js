import { addNewStory } from '../data/api';
export default class AddStoryPage {
  async render() {
    return `
      <section class="add-story-container">
        <h1>Add New Story</h1>
        <form id="add-story-form">
          <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div>
            <label for="photo">Photo:</label>
            <input type="file" id="photo" name="photo" accept="image/*" required />
          </div>
          <div>
            <label for="lat">Latitude (optional):</label>
            <input type="number" id="lat" name="lat" step="any" />
          </div>
          <div>
            <label for="lon">Longitude (optional):</label>
            <input type="number" id="lon" name="lon" step="any" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p id="form-message"></p>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('add-story-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        // Ambil nilai dari form
        const description = form.description.value;
        const photoFile = form.photo.files[0];
        const lat = parseFloat(form.lat.value) || null;
        const lon = parseFloat(form.lon.value) || null;

        // Validasi ukuran file (maksimal 1MB)
        if (photoFile.size > 1024 * 1024) {
          throw new Error('File size must not exceed 1MB.');
        }

        // Kirim data ke API
        await addNewStory(description, photoFile, lat, lon);

        // Tampilkan pesan sukses
        formMessage.textContent = 'Story added successfully!';
        formMessage.style.color = 'green';
        form.reset();
      } catch (error) {
        console.error('Error adding story:', error.message);
        formMessage.textContent = error.message;
        formMessage.style.color = 'red';
      }
    });
  }
}
