import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Risks from "./views/Risks";
import StateDetails from "./views/StateDetails";
import About from "./views/About";

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<StateDetails />} path="/state-data/:state" />
                <Route element={<About />} path="/about" />
                <Route element={<Risks />} path="/risks" />
            </Routes>
        </HashRouter>
    );
};

export default App;
