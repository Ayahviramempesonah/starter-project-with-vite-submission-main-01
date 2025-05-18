// import { fetchStoryById } from '../../data/api';
import { generateItemDetailTemplate, generateLoaderAbsoluteTemplate } from '../../template';
import Map from '../../utils/map';
import * as STORYAPI from '../../data/api';
// import { parseActivePathname } from '../../routes/url-parser';
import DetailPresenter from './detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
// import  generateLoaderAbsoluteTemplate  from '../../template';
// console.log('fetchstory', fetchStoryById)
export default class DetailPage {
  #presenter;
  #model;
  #map = null;

  async render() {
    return `
      <section class="detail-container">
        <h1>Story Detail</h1>
        <div id="story-detail-loadiing"></div>
        <div id="story-detail"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: STORYAPI,
    });

    await this.#presenter.showStoryDetail(); //fungsi dari presenter

    // const showStory = await this.#presenter.showStoryDetail(); //fungsi dari presenter
    // console.log('showStory', showStory);

    // try {
    //   // Dapatkan ID cerita dari URL
    //   const urlParts = window.location.hash.slice(2).split('/');
    //   const storyId = urlParts[1]; // Ambil bagian kedua dari path

    //   if (!storyId) {
    //     throw new Error('Invalid story ID.');
    //   }
    //   // Panggil API untuk mendapatkan detail cerita
    //   const response = await fetchStoryById(storyId);

    //   // Render detail cerita ke halaman
    //   this.renderStoryDetail(response.story);

    //   // inisialisasi map
    //   if (response.story.lat !== null && response.story.lon !== null) {
    //     await this.initialMap();
    //     const coordinate = [response.story.lat, response.story.lon];
    //     const markerOptions = { alt: response.story.name };
    //     const popupOptions = { content: response.story.description };
    //     this.#map.addMarker(coordinate, markerOptions, popupOptions);
    //   }
    // } catch (error) {
    //   console.error('Error fetching story details:', error.message);
    //   document.getElementById('story-detail').innerHTML =
    //     `<p style="color: red;">${error.message}</p>`;
    // }
  }

  // renderStoryDetail(story) {
  //   const storyDetailElement = document.getElementById('story-detail');

  //   if (!story) {
  //     storyDetailElement.innerHTML = '<p>No story details available.</p>';
  //     return;
  //   }

  //   const storyDetailHTML = generateItemDetailTemplate(story);

  //   // Tambahkan detail cerita ke halaman
  //   storyDetailElement.innerHTML = storyDetailHTML;
  // }

  async populateStoryAndInitailMap(message, report) {
    document.getElementById('story-detail').innerHTML = generateItemDetailTemplate({
      title: report.title,
      name: report.name,
      description: report.description,
      photoUrl: report.photoUrl,
      createdAt: report.createdAt,
      // lat: report.lat,
      // lon: report.lon,
      lat: report.location.latitude,
      lon: report.location.longitude,
    });
    //map
    await this.#presenter.showDetailMap();
    if (this.#map) {
      const reportCoordinate = [report.location.latitude, report.location.longitude];
      const markerOptions = { alt: report.name };
      const popupOptions = { content: report.name };
      this.#map.changeCamera(reportCoordinate);
      this.#map.addMarker(reportCoordinate, markerOptions, popupOptions);
    }
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 15,
      locate: true,
    });
  }

  //loading item

  showLoadingItem() {
    document.getElementById('story-detail-loadiing').innerHTML = 'Memuat..';
  }

  hideLoadingItem() {
    document.getElementById('story-detail-loadiing').innerHTML = '';
  }

  // show loading component
  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }
}
