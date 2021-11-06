import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Risks from "./views/Risks";
import StateDetails from "./views/StateDetails";
import About from "./views/About";

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/state-data/:state">
                    <StateDetails />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default App;
