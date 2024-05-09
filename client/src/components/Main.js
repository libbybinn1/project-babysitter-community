import NavBar from "./Nav/NavBar";
import { Routes, Route } from 'react-router-dom'
import LogOut from "./Log/logOut";
import Error from "./Error/Error";

function Main() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route exact="true" element={<></>} path="/" />
                <Route exact="true" element={<LogOut />} path="/logOut" />
                <Route exact="true" element={<Error />} path="/*" />
            </Routes>

        </div>
    );
}

export default Main;

