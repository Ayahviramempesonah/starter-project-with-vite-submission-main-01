import { fetchStoryById } from '../../data/api';
import { generateItemDetailTemplate } from '../../template';
import Map from '../../utils/map';
import { parseActivePathname } from '../../routes/url-parser';

export default class DetailPage {
  #map;
  #presenter;

  async render() {
    return `
      <section class="detail-container">
        <h1>Story Detail</h1>
        <div id="story-detail"></div>
      </section>
    `;
  }

  async afterRender() {
    try {
      // Dapatkan ID cerita dari URL
      const urlParts = window.location.hash.slice(2).split('/');
      const storyId = urlParts[1]; // Ambil bagian kedua dari path

      if (!storyId) {
        throw new Error('Invalid story ID.');
      }
      // Panggil API untuk mendapatkan detail cerita
      const response = await fetchStoryById(storyId);

      // Render detail cerita ke halaman
      this.renderStoryDetail(response.story);

      // inisialisasi map
      if (response.story.lat !== null && response.story.lon !== null) {
        await this.initialMap();
        const coordinate = [response.story.lat, response.story.lon];
        const markerOptions = { alt: response.story.name };
        const popupOptions = { content: response.story.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
    } catch (error) {
      console.error('Error fetching story details:', error.message);
      document.getElementById('story-detail').innerHTML =
        `<p style="color: red;">${error.message}</p>`;
    }
  }

  renderStoryDetail(story) {
    const storyDetailElement = document.getElementById('story-detail');

    if (!story) {
      storyDetailElement.innerHTML = '<p>No story details available.</p>';
      return;
    }

    const storyDetailHTML = generateItemDetailTemplate(story);

    // Tambahkan detail cerita ke halaman
    storyDetailElement.innerHTML = storyDetailHTML;
  }

  async initialMap() {
    try {
      this.#map = await Map.build('#map', {
        zoom: 10,
      });
    } catch (error) {
      console.error('Error initializing map:', error.message);
    }
  }
}
