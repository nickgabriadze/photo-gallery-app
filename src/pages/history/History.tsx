import historyStyle from '../history.module.css';
import {useAppSelector} from "../../store/hooks.ts";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import homeStyling from '../home/home.module.css';
import getPhotosUsingSearchKeyword from "../../api/getPhotosUsingSearchKeyword.ts";
import {UnsplashPhoto} from "../../types.ts"
import UnsplashPicture from "../home/components/unsplashPicture.tsx";
import {useLastPictureObserver} from "../useLastPictureObserver.ts";
import {UnsplashPictureBoxModel} from "../components/UnsplashPictureBoxModel.tsx";

export default function History() {
    document.title = "Gallery / History";
    const inCurrentView = useAppSelector(s => s.galleryState.inCurrentView);
    const [chosenKeyword, setChosenKeyword] = useState<number>(-1);
    const historyKeywords = useAppSelector(s => s.galleryState.searchHistoryKeywords);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [historyPictures, setHistoryPictures] = useState<UnsplashPhoto[]>([]);
    const observingPicture = useRef<null | IntersectionObserver>(null)

    const {lastPictureFetch} = useLastPictureObserver({loading, observingPicture, setPageNumber})

    useEffect(() => {
        const getImagesUsingKeyword = async () => {
            try {
                setLoading(true)
                const request = await getPhotosUsingSearchKeyword(historyKeywords[chosenKeyword], pageNumber)
                const data = request.data.results;
                if(request.status === 200) {
                    setHistoryPictures((prev) => [...prev, ...data])
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        if(chosenKeyword !== -1) getImagesUsingKeyword();
        else setHistoryPictures([])

    }, [chosenKeyword, historyKeywords, historyKeywords.length, pageNumber]);

    useEffect(() => {
        setHistoryPictures([])
    }, [chosenKeyword]);

    return <main>

        {inCurrentView !== null && <UnsplashPictureBoxModel/>}

        <Link className={historyStyle['go-back-link']} to={'/'}>Go Home</Link>
        <h3>Recently searched</h3>
        <div className={historyStyle['history-keywords']}>

            {historyKeywords.length === 0 ? <h4>you haven't searched for anything</h4> :historyKeywords.map((eachWord, i) => {
                return <button
                    onClick={() => {
                        if (chosenKeyword === i) {
                            setChosenKeyword(-1)
                        } else {
                            setChosenKeyword(i)
                        }
                    }}
                    style={chosenKeyword === i ? {
                        backgroundColor: '#a7a7a7',
                        color: 'white'
                    } : {backgroundColor: 'white', color: 'black'}}
                    className={historyStyle['each-keyword']}
                    key={i}>{eachWord}</button>
            })}
        </div>


        <div className={homeStyling['unsplash-pictures']}>
            {historyPictures.map((eachPicture, i) => {

                return <UnsplashPicture eachPicture={eachPicture}
                                        key={eachPicture.id}
                                        ref={historyPictures.length - 1 == i ? lastPictureFetch : null}/>

            })}
        </div>


    </main>
}