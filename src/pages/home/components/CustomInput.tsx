import homeStyling from '../home.module.css';
import {useAppDispatch} from "../../../store/toolkitHooks.ts";
import React, {useEffect, useState} from "react";
import {updateCurrentlySearchingFor} from "../../../store/features/galleryStateReducer.ts";


export function CustomInput({setPageNumberFunction}: {
    setPageNumberFunction: React.Dispatch<React.SetStateAction<number>>
}) {
    const dispatch = useAppDispatch();
    const [placeHolderValue, setPlaceholderValue] = useState<string>('');
    useEffect(() => {

        const timeOut = setTimeout(() => {
            if (placeHolderValue.trim().length !== 0) {
                setPageNumberFunction(1)
                dispatch(updateCurrentlySearchingFor(placeHolderValue))
            }
        }, 500)

        return () => clearTimeout(timeOut);
    }, [placeHolderValue, dispatch, setPageNumberFunction]);

    return <input className={homeStyling['custom-input']} type={"Text"}
                  value={placeHolderValue}
                  placeholder={'ideas are unlimited...'}
                  onChange={(e) => {
                      setPlaceholderValue(e.target.value)
                  }}
    />
}