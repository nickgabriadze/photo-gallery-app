import unsplashApiInstance from "../axios.ts";

export async function getPhotoByID(id: string) {


    return await unsplashApiInstance.get(`/photos/:${id}`, {
        params: {
            stats: 'true'
        }
    })
}
export default getPhotoByID;