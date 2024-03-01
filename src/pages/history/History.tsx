import historyStyle from '../history.module.css';
import {useAppSelector} from "../../store/hooks.ts";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function History(){
    document.title = "Gallery / History";
    const [chosenKeyword, setChosenKeyword] = useState<number>(-1);
    const historyKeywords = useAppSelector(s => s.galleryState.searchHistoryKeywords);

    console.log(historyKeywords)
    return <main>
        <Link className={historyStyle['go-back-link']} to={'/'}>Go Home</Link>
        <h3>Recently searched</h3>
        <div className={historyStyle['history-keywords']}>

            {historyKeywords.map((eachWord, i) => {
                return <button
                    onClick={() => setChosenKeyword(i)}
                    style={chosenKeyword === i ? {backgroundColor: '#a7a7a7', color:'white'} : {backgroundColor:'white', color:'black'}}
                    className={historyStyle['each-keyword']}
                    key={i}>{eachWord}</button>
            })}
        </div>

    </main>
}