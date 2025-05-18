import { reportMapper } from '../../data/api-mapper';

export default class DetailPresenter {
  #reportId;
  #view;
  #apiModel;
  constructor(reportId, { view, apiModel }) {
    this.#reportId = reportId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

async showDetailMap(){
  this.#view.showMapLoading();

  try {
       const lihat = await  this.#view.initialMap();
console.log('initialmap log',lihat)

  }catch{
    console.error('showDetailMap: error:', error);
  }finally{
    this.#view.hideMapLoading()
  }
}

async showStoryDetail() {
  // this.#view.showLoading();
  try{
    const response = await this.#apiModel.getStoryById(this.#reportId);
    console.log('response',response)
    if(!response.ok){
      console.error('showStoryDetail: error:', response.message)
      return
    }

  } catch{
    console.error('showStoryDetail: error:', error);
  }finally{
    // this.#view.hideLoading();
  }
}



}
