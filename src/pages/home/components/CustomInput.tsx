import homeStyling from '../home.module.css';
import {useAppDispatch} from "../../../store/toolkitHooks.ts";
import {useEffect, useState} from "react";
import {updateCurrentlySearchingFor} from "../../../store/features/galleryStateReducer.ts";


export function CustomInput() {
    const dispatch = useAppDispatch();
    const [placeHolderValue, setPlaceholderValue] = useState<string>('');
    useEffect(() => {

        const timeOut = setTimeout(() => {
          if(placeHolderValue.trim().length !== 0){
              dispatch(updateCurrentlySearchingFor(placeHolderValue))
          }
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