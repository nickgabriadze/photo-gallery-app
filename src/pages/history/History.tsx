import {useAppSelector} from "../../store/hooks.ts";

export default function History(){
    document.title = "Gallery / History";

    const historyKeywords = useAppSelector(s => s.galleryState.searchHistoryKeywords);

    console.log(historyKeywords)
    return <main>{historyKeywords.map((w, i) => <h1 key={i}>{w}</h1>)}</main>
}