import { reportMapper } from "../../data/api-mapper";


export class DetailPresenter{
    #reportId
    #view
    #apiModel
    constructor(reportId,{view,apiModel}){
        this.#reportId = reportId
        this.#view = view
        this.#apiModel = apiModel
    }

    

}