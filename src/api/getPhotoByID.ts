import unsplashApiInstance from "../axios.ts";
import {AxiosResponse} from "axios";
import {UnsplashPhotoStats} from "../types.ts";

export async function getPhotoByID(id: string):Promise<AxiosResponse<UnsplashPhotoStats>> {


    return await unsplashApiInstance.get(`/photos/${id}/statistics`)
}
export default getPhotoByID;