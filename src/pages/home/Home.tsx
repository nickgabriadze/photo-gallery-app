import {CustomInput} from "./components/CustomInput.tsx";
import homeStyling from './home.module.css';
import UnsplashIcon from '../../icons/unsplash-icon.png'
import {Link} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import getPopularPictures from "../../api/getPopularPictures.ts";
import {UnsplashPhoto} from "../../types.ts";
import {useAppSelector} from "../../store/hooks.ts";
import getPhotosUsingSearchKeyword from "../../api/getPhotosUsingSearchKeyword.ts";
import UnsplashPicture from "./components/unsplashPicture.tsx";

export function Homepage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [picturesData, setPicturesData] = useState<UnsplashPhoto[]>([])
    document.title = "Gallery / Homepage"
    const currentlySearching = useAppSelector(s => s.galleryState.currentlySearchingFor);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const observingPicture = useRef<null | IntersectionObserver>(null);


    const getPicturesByKeyword = async (currentlySearching: string, pageNumber: number) => {
        try {
            setLoading(true)
            const request = await getPhotosUsingSearchKeyword(currentlySearching, pageNumber);
            const data = request.data.results;
            setPicturesData((prev) => [...prev, ...data])


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
            if(pageNumber > 1){
                setPicturesData((prev) => [...prev, ...data])
            }else{
                setPicturesData(data)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    const lastPictureFetch = useCallback((lastPicture: HTMLDivElement | null) => {


        if (!lastPicture) return;
        if (loading) return;
        if (observingPicture.current) observingPicture.current?.disconnect();
        observingPicture.current = new IntersectionObserver((e) => {
            if (e[0].isIntersecting) {
                setPageNumber(prev => prev + 1)
            }
        });
        observingPicture.current?.observe(lastPicture);


    }, [loading])

    useEffect(() => {
        if (currentlySearching.trim().length !== 0) {
            getPicturesByKeyword(currentlySearching, pageNumber)
        }else{
            getPictures(pageNumber)
        }
    }, [pageNumber, currentlySearching]);


    useEffect(() => {
        setPicturesData([])
    }, [currentlySearching]);

    return <main>

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