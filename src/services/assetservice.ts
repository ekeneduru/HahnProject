
import {inject} from 'aurelia-framework';
import { AssetModel } from 'models/assetmodel';
import { AppService } from "./appservice";

@inject(AppService)
export class AssetService {

    constructor(private appService:AppService) {}

    savePost=(asset:AssetModel)=>{
        return fetch(this.appService.createPostUrl, {
            method: 'POST',
            body: JSON.stringify(asset),
            headers: {
                "Content-type": "application/json",
            },
        }).then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
            }));

        })
    }
}