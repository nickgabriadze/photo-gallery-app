import {CustomInput} from "./components/CustomInput.tsx";
import homeStyling from './home.module.css';
import UnsplashIcon from '../../icons/unsplash-icon.png'
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import getPopularPictures from "../../api/getPopularPictures.ts";
import {UnsplashPhoto} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../store/toolkitHooks.ts";
import getPhotosUsingSearchKeyword from "../../api/getPhotosUsingSearchKeyword.ts";
import UnsplashPicture from "./components/unsplashPicture.tsx";
import {useLastPictureObserver} from "../useLastPictureObserver.ts";
import {UnsplashPictureBoxModel} from "../components/UnsplashPictureBoxModel.tsx";
import {setCache, setInCurrentView} from "../../store/features/galleryStateReducer.ts";
import {v4} from "uuid"

export function Homepage() {
    document.title = "Gallery / Homepage"
    const [loading, setLoading] = useState<boolean>(true);
    const [picturesData, setPicturesData] = useState<UnsplashPhoto[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1);
    const observingPicture = useRef<null | IntersectionObserver>(null);
    const dispatch = useAppDispatch();
    const [error, setError] = useState<boolean>(false);
    const {inCurrentView, cache, currentlySearchingFor} = useAppSelector(s => s.galleryState)
    useEffect(() => {
        setPicturesData([])
        setPageNumber(1)
        dispatch(setInCurrentView([]))
    }, [dispatch, currentlySearchingFor]);

    const getPicturesByKeyword = async (currentlySearching: string, pageNumber: number) => {
        try {
            setLoading(true)
            const request = await getPhotosUsingSearchKeyword(currentlySearching, pageNumber);
            const data = request.data.results;
            if (request.status === 200) {
                if (pageNumber > 1 && !error) {
                    setPicturesData((prev) => [...prev, ...data])
                } else {
                    setPicturesData(data)
                    dispatch(setCache({
                        keyword: currentlySearching,
                        data: data
                    }))
                }
            }
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    const getPictures = async (pageNumber: number) => {
        try {
            setLoading(true)
            const request = await getPopularPictures(pageNumber);
            const data = request.data;

            if (request.status === 200) {
                if (pageNumber > 1 && !error) {
                    setPicturesData((prev) => [...prev, ...data])
                } else {
                    setPicturesData(data)
                }
            }
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }
    const {lastPictureFetch} = useLastPictureObserver({loading, observingPicture, setPageNumber, error})

    useEffect(() => {
        if (currentlySearchingFor.trim().length !== 0) {
            if (cache[currentlySearchingFor] && pageNumber === 1) {
                setPicturesData(cache[currentlySearchingFor])
                setLoading(false)
            } else {
                getPicturesByKeyword(currentlySearchingFor, pageNumber)
            }
        } else {
            getPictures(pageNumber)
        }
    }, [pageNumber, currentlySearchingFor]);

    return <main>

        {inCurrentView !== null && <UnsplashPictureBoxModel/>}

        <div className={homeStyling['searching-field']}>
            <div className={homeStyling["icon-input-field"]}>
                <img src={UnsplashIcon} width={40} height={40} alt={"Unsplash icon"}/>
                <CustomInput/>
            </div>
            <nav>
                <Link to={'/history'} className={homeStyling['go-to-history-link']}>HISTORY</Link>
            </nav>

        </div>
        <div className={homeStyling['unsplash-pictures']}>
            {picturesData.map((eachPicture, i) => {

                return <UnsplashPicture eachPicture={eachPicture}
                                        key={v4()}
                                        ref={picturesData.length - 1 === i ? lastPictureFetch : null}/>

            })}
        </div>

    </main>
}