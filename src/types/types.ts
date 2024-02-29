export type Page = "Home" | "History";
export type HistoryKeywords = string[];

export type GalleryState = {
    currentPage: Page,
    currentlySearchingFor: string,
    searchHistoryKeywords: HistoryKeywords

}