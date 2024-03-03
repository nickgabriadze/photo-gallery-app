import homeStyling from "../home.module.css";
import {UnsplashPhoto} from "../../../types.ts";
import {forwardRef, LegacyRef} from "react";
import {useAppDispatch} from "../../../store/toolkitHooks.ts";
import {setInCurrentView} from "../../../store/features/galleryStateReducer.ts";

const UnsplashPicture = forwardRef(function UnsplashPicture({eachPicture}: { eachPicture: UnsplashPhoto | undefined }, ref:LegacyRef<HTMLDivElement> | null) {
    const dispatch = useAppDispatch();

    return (
        <div className={homeStyling['unsplash-pic-wrapper']} ref={ref}
        onClick={() => dispatch(setInCurrentView([String(eachPicture?.id), String(eachPicture?.urls.regular), String(eachPicture?.alt_description), String(eachPicture?.likes)]))}
        >
            <img src={eachPicture?.urls.regular}
                 width={Number(eachPicture?.width) / 10}
                 height={Number(eachPicture?.height) / 10}
                 alt={eachPicture?.alt_description}></img>
        </div>
    )
});

export default UnsplashPicture