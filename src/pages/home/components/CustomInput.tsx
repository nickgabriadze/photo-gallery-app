import homeStyling from '../home.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useEffect, useState} from "react";
import {updateCurrentlySearchingFor} from "../../../store/features/galleryStateReducer.ts";


export function CustomInput() {
    const dispatch = useAppDispatch();
    const currentlySearchingValue = useAppSelector(s => s.galleryState.currentlySearchingFor);
    console.log(currentlySearchingValue)
    const [placeHolderValue, setPlaceholderValue] = useState<string>('');
    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(updateCurrentlySearchingFor(placeHolderValue))
        }, 200)

        return () => clearTimeout(timeOut);
    }, [placeHolderValue, dispatch]);

    return <input className={homeStyling['custom-input']} type={"Text"}
                  value={placeHolderValue}
                  placeholder={'ideas are unlimited...'}
                  onChange={(e) => {
                      setPlaceholderValue(e.target.value)
                  }}
    />
}