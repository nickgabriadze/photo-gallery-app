import React, {useCallback} from "react";

export function useLastPictureObserver({loading, observingPicture, setPageNumber, error, pageNumber, totalPages}
    :{loading: boolean, observingPicture:  React.MutableRefObject<IntersectionObserver | null>, setPageNumber: React.Dispatch<React.SetStateAction<number>>, error: boolean,pageNumber:number, totalPages: number}
) {
    
    
   const lastPictureFetch =  useCallback((lastPicture: HTMLDivElement | null) => {


        if (!lastPicture) return;
        if (loading) return;
        if(error) return;
        if(pageNumber > totalPages) return;
        if (observingPicture.current) observingPicture.current.disconnect();
        observingPicture.current = new IntersectionObserver((e) => {
            if (e[0].isIntersecting) {
                setPageNumber(prev => prev + 1)
            }
        });
        observingPicture.current?.observe(lastPicture);


    }, [loading, observingPicture, setPageNumber, error])

    
    return {lastPictureFetch}
}