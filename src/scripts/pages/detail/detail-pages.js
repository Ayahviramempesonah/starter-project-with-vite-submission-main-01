import { fetchStoryById } from '../../data/api';

export default class DetailPage {
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

    // Buat HTML untuk detail cerita
    const storyDetailHTML = `
      <div class="story-detail">
        <img src="${story.photoUrl}" alt="${story.name}" width="300">
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <p><strong>Date:</strong> ${new Date(story.createdAt).toLocaleString()}</p>
        <p><strong>Location:</strong> Latitude: ${story.lat}, Longitude: ${story.lon}</p>
      </div>
    `;

    // Tambahkan detail cerita ke halaman
    storyDetailElement.innerHTML = storyDetailHTML;
  }
}


// import { DetailPresenter } from "./detail-presenter";
// import Map from "../../utils/map";
// import * as API from "../../data/api";
// import { parseActivePathname } from "../../routes/url-parser";

// export class DetailPage {
//   #presenter
//   #map
//   async render() {
//     return `
//       <section class="detail-container">
//         <h1> Detail Story  </h1>
//         <div id="story-detail"></div>
//       </section>
//     `;
//   }

//   async afterRender() {
      
// this.#presenter = new DetailPresenter({
//       view: this,
//       model: API,
//     });

//   }

// }