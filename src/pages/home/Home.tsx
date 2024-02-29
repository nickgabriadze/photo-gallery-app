import {CustomInput} from "./components/CustomInput.tsx";
import homeStyling from './home.module.css';
import UnsplashIcon from '../../icons/unsplash-icon.png'
import {Link} from "react-router-dom";

export function Homepage(){

    document.title = "Gallery / Homepage"

    return <main>

        <div className={homeStyling['searching-field']}>
            <div className={homeStyling["icon-input-field"]}>
                <img src={UnsplashIcon} width={40} height={40} alt={"Unsplash icon"}/>
                <CustomInput/>
            </div>
            <nav>
                <Link to={'/history'}>HISTORY</Link>
            </nav>
        </div>


    </main>
}