import historyStyle from './history.module.css';
import {useAppDispatch, useAppSelector} from "../../store/toolkitHooks.ts";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import homeStyling from '../home/home.module.css';
import getPhotosUsingSearchKeyword from "../../api/getPhotosUsingSearchKeyword.ts";
import {UnsplashPhoto} from "../../types.ts"
import UnsplashPicture from "../home/components/unsplashPicture.tsx";
import {useLastPictureObserver} from "../useLastPictureObserver.ts";
import {UnsplashPictureBoxModel} from "../components/UnsplashPictureBoxModel.tsx";
import {setInCurrentView} from "../../store/features/galleryStateReducer.ts";
import {v4} from "uuid";

export default function History() {
    document.title = "Gallery / History";
    const [chosenKeyword, setChosenKeyword] = useState<number>(-1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [historyPictures, setHistoryPictures] = useState<UnsplashPhoto[]>([]);
    const observingPicture = useRef<null | IntersectionObserver>(null)
    const [error, setError] = useState<boolean>(false);
    const {lastPictureFetch} = useLastPictureObserver({loading, observingPicture, setPageNumber, error})
    const dispatch = useAppDispatch();

    const {cache, inCurrentView, searchHistoryKeywords} = useAppSelector(s => s.galleryState);
    useEffect(() => {
        setHistoryPictures([])
        dispatch(setInCurrentView([]))
        setPageNumber(1)
    }, [dispatch, chosenKeyword]);


    useEffect(() => {
        const getImagesUsingKeyword = async () => {
            if (pageNumber > 1) {
                try {
                    setLoading(true)
                    const request = await getPhotosUsingSearchKeyword(searchHistoryKeywords[chosenKeyword], pageNumber)
                    const data = request.data.results;
                    if (request.status === 200) {
                        setHistoryPictures((prev) => [...prev, ...data])
                    }
                } catch (e) {
                    setError(true)
                } finally {
                    setLoading(false)
                }
            } else {
                setHistoryPictures(cache[searchHistoryKeywords[chosenKeyword]])
                setLoading(false)
            }
        }

        if (chosenKeyword !== -1) {
            getImagesUsingKeyword()
        } else setHistoryPictures([])

    }, [chosenKeyword, searchHistoryKeywords.length, pageNumber]);


    return <main>

        {inCurrentView !== null && <UnsplashPictureBoxModel/>}

        <Link className={historyStyle['go-back-link']} to={'/'}>Go Home</Link>
        <h3>Recently searched</h3>
        <div className={historyStyle['history-keywords']}>

            {searchHistoryKeywords.length === 0 ?
                <h4>you haven't searched for anything</h4> : searchHistoryKeywords.map((eachWord, i) => {
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
                        key={i}>{eachWord} <hr /></button>
                })}
        </div>



        <div className={homeStyling['unsplash-pictures']}>
            {historyPictures && historyPictures.map((eachPicture, i) => {

                return <UnsplashPicture eachPicture={eachPicture}
                                        key={v4()}
                                        ref={historyPictures.length - 1 == i ? lastPictureFetch : null}/>

            })
            }
        </div>


    </main>
}