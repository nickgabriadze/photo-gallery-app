import unsplashApiInstance from "../axios.ts";
import {AxiosResponse} from "axios";
import {UnsplashPhoto} from "../types.ts";

export async function getPopularPictures(page: number):Promise<AxiosResponse<UnsplashPhoto[]>> {

    return await unsplashApiInstance.get('/photos',{
        params:{
            page: page,
            per_page: 20,
            order_by: 'popular'
        }
    })
}

export default getPopularPictures;