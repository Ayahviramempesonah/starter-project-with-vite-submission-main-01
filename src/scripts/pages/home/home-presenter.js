import { generateItemStories } from '../../template';
import * as API from '../../data/api';

export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  //buat fungsi show map
  // async showMap() {
  //   try {
  //     await this.#view.initialMap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async showReportsListMap() {
  //   try {
  //     await this.#view.initialMap();
  //   } catch (error) {
  //     console.error('showReportsListMap: error:', error);
  //   }
  // }

  // async initialGalleryAndMap() {
  //   this.#view.showLoading();

  //   try {
  //     await this.showMap();
  //     // const reports = await this.showReportsListMap();
  //     // console.log('reports', reports);
  //     // Ambil data cerita dari model
  //     const response = await this.#model.fetchStories({ page: 1, size: 10, location: 0 });

  //     // Kirim data cerita ke view untuk dirender
  //     this.#view.storyList(response.listStory);
  //   } catch (error) {
  //     console.error('initialGalleryAndMap: error:', error);
  //     this.#view.populateReportsListError(error.message || 'An error occurred.');
  //   } finally {
  //     this.#view.hideLoading();
  //   }
  // }

  //perbaikan
  async initialGalleryAndMap() {
    this.#view.showLoading();

    try {
      const response = await this.#model.fetchStories({ page: 1, size: 10, location: 0 });
      this.#view.storyList(response.listStory);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateReportsListError(error.message || 'An error occurred.');
    } finally {
      this.#view.hideLoading();
    }
  }
}
