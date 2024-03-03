import unsplashApiInstance from "../axios.ts";
import {AxiosResponse} from "axios";
import {UnsplashPhoto} from "../types.ts";

export async function getPhotosUsingSearchKeyword(keyword: string, page: number):Promise<AxiosResponse<{total_pages: number,results: UnsplashPhoto[]}>> {

    return await unsplashApiInstance.get('/search/photos', {
        params: {
            query: keyword.toString(),
            page: page,
            per_page: 20,
        }
    })
}
export default getPhotosUsingSearchKeyword;