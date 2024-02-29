import {CustomInput} from "./components/CustomInput.tsx";
import homeStyling from './home.module.css';
import {Link} from "react-router-dom";

export function Homepage(){

    document.title = "Gallery / Homepage"

    return <main className={homeStyling['home-wrapper']}>
        <nav>

            <Link to={'/history'}>HISTORY</Link>
        </nav>
        <div className={homeStyling['searching-field']}>
            <h1>Browse millions of pictures</h1>
            <CustomInput />
        </div>

    </main>
}