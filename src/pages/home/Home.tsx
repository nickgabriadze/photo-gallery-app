import {CustomInput} from "./components/CustomInput.tsx";
import homeStyling from './home.module.css';

export function Homepage(){


    return <main className={homeStyling['home-wrapper']}>

        <div className={homeStyling['searching-field']}>
            <h1>Browse millions of pictures</h1>
            <CustomInput />
        </div>

    </main>
}