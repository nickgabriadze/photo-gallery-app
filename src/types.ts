export type Page = "Home" | "History";
export type HistoryKeywords = string[];

export type GalleryState = {
    currentPage: Page,
    currentlySearchingFor: string,
    searchHistoryKeywords: HistoryKeywords

}

export type UnsplashPhoto = {
    alt_description: string,
    blur_hash: string,
    breadcrumbs: [],
    color: string,
    created_at: string,
    description: string,
    height: number,
    width: string,
    id: string,
    liked_by_user: boolean,
    likes: number,
    updated_at: string,
    urls:{
        full: string,
        raw: string,
        regular: string,
        small: string,
        small_s3: string,
        thumb: string
    }

}