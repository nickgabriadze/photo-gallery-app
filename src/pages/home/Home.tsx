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
import {setInCurrentView} from "../../store/features/galleryStateReducer.ts";

export function Homepage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [picturesData, setPicturesData] = useState<UnsplashPhoto[]>([])
    document.title = "Gallery / Homepage"
    const currentlySearching = useAppSelector(s => s.galleryState.currentlySearchingFor);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const observingPicture = useRef<null | IntersectionObserver>(null);
    const dispatch = useAppDispatch();
    const inCurrentView = useAppSelector(s => s.galleryState.inCurrentView);

    const getPicturesByKeyword = async (currentlySearching: string, pageNumber: number) => {
        try {
            setLoading(true)
            const request = await getPhotosUsingSearchKeyword(currentlySearching, pageNumber);
            const data = request.data.results;
            if (request.status === 200) {
                if (pageNumber > 1) {
                    setPicturesData((prev) => [...prev, ...data])
                } else {
                    setPicturesData(data)
                }
            }
        } catch (e) {
            console.log(e)
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
                if (pageNumber > 1) {
                    setPicturesData((prev) => [...prev, ...data])
                } else {
                    setPicturesData(data)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    const {lastPictureFetch} = useLastPictureObserver({loading, observingPicture, setPageNumber})

    useEffect(() => {
        if (currentlySearching.trim().length !== 0) {
            getPicturesByKeyword(currentlySearching, pageNumber)
        } else {
            getPictures(pageNumber)
        }
    }, [pageNumber, currentlySearching]);


    useEffect(() => {
        setPicturesData([])
        setPageNumber(1)
        dispatch(setInCurrentView([]))

    }, [dispatch, currentlySearching]);


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
                                        key={eachPicture.id}
                                        ref={picturesData.length - 1 === i ? lastPictureFetch : null}/>

            })}
        </div>

    </main>
}