import homeStyling from "../home.module.css";
import {UnsplashPhoto} from "../../../types.ts";
import {forwardRef, LegacyRef} from "react";

const UnsplashPicture = forwardRef(function UnsplashPicture({eachPicture}: { eachPicture: UnsplashPhoto | undefined }, ref:LegacyRef<HTMLDivElement> | null) {


    return (
        <div className={homeStyling['unsplash-pic-wrapper']} ref={ref}>
            <img src={eachPicture?.urls.regular}
                 width={Number(eachPicture?.width) / 10}
                 height={Number(eachPicture?.height) / 10}
                 alt={eachPicture?.alt_description}></img>
        </div>
    )
});

export default UnsplashPicture