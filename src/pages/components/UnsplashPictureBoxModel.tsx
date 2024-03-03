import pictureBoxStyling from './unsplashpicture.module.css';
import {useEffect, useState} from "react";
import getPhotoByID from "../../api/getPhotoByID.ts";
import {useAppDispatch, useAppSelector} from "../../store/toolkitHooks.ts";
import DownloadsIcon from './icons/downloads.svg'
import LikesIcon from './icons/likes.svg'
import ViewsIcon from './icons/views.svg'
import LoadingIcon from './icons/loading.svg';
import {UnsplashPhotoStats} from "../../types.ts";
import CloseIcon from './icons/close.svg';
import {setInCurrentView} from "../../store/features/galleryStateReducer.ts";

export function UnsplashPictureBoxModel() {
    const dispatch = useAppDispatch();
    const inCurrentViewID = useAppSelector(s => s.galleryState.inCurrentView);
    const [picStats, setPicStats] = useState<UnsplashPhotoStats>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const getPictureById = async () => {

            try {
                setLoading(true)
                const request = await getPhotoByID(String(inCurrentViewID?.id));
                const data = request.data;
                if (request.status === 200) {
                    setPicStats(data)
                }
            } catch (e:any) {
                if (e.response.status === 403) {
                    setError('Rate Limitation')
                }
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        if (inCurrentViewID?.id) getPictureById();
    }, [inCurrentViewID?.id]);

    if (inCurrentViewID === null) return



        return <div className={pictureBoxStyling['unsplash-pic-modal']}>
        <div className={pictureBoxStyling['unsplash-pic-outer-wrapper']}>
            <div className={pictureBoxStyling['title-close']}>
                <h3>{inCurrentViewID.description[0].toUpperCase().concat(inCurrentViewID.description.slice(1,))}</h3>
                <button
                    onClick={() => dispatch(setInCurrentView([]))}
                ><img alt={'Close Icon'} src={CloseIcon} width={30} height={30}/>
                </button>
            </div>
            <div className={pictureBoxStyling['unsplash-pic-wrapper']}>
                <div className={pictureBoxStyling['unsplash-pic']}><img
                    title={inCurrentViewID.description}
                    src={inCurrentViewID.img_url} alt={inCurrentViewID.description}/>
                </div>

                {loading  ? <div className={pictureBoxStyling['stats-loading']}><img
                        alt={'Loading Icon'}

                        src={LoadingIcon}
                    ></img></div> :
                    error.trim().length !== 0 ? <p className={pictureBoxStyling['loading-error']}>Rate Limitation</p> :
                        <div className={pictureBoxStyling['unsplash-pic-stats']}>
                            <div>
                                <img alt={'Likes Icon'} src={LikesIcon} width={20} height={20}></img>
                                <p>{Number(inCurrentViewID?.n_likes)}</p>
                            </div>
                            <div>
                                <img alt={'Views Icon'} src={ViewsIcon} width={20} height={20}></img>
                                <p>{Number(picStats?.views.total)}</p>
                            </div>
                            <div>
                                <img alt={'Downloads Icon'} src={DownloadsIcon} width={20} height={20}></img>
                                <p>{Number(picStats?.downloads.total)}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
        </div>
}