import {Homepage} from "./pages/home/Home.tsx";
import History from "./pages/history/History.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return <Routes>
        <Route path={'/'} element={<Homepage/>}></Route>
        <Route path={'/history'} element={<History/>}></Route>
    </Routes>
}

export default App
