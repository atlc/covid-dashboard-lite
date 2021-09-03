import { useEffect, useState } from "react";
import LoaderSkeletonCard from "../components/LoaderSkeletonCard";
import StateDataCard from "../components/StateDataCard";

const envars = {
    prefix: process.env.REACT_APP_KEY_PREFIX || process.env.KEY_PREFIX,
    key: process.env.REACT_APP_API_KEY || process.env.API_KEY
};

const Home = () => {
    const [data, setData] = useState(new Array(52).fill(null));
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "COVID Dashboard-Lite";
        fetch("https://api.covidactnow.org/v2/states" + envars.prefix + envars.key)
            .then(res => res.json())
            .then(data => {
                setLoaded(true);
                setData(data);
            });
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {!loaded && data.map((placeholder, i) => <LoaderSkeletonCard key={`state-preview-loader-${i}`} lines={5} />)}
                {loaded && data.map(state => state && <StateDataCard key={`state-data-card-${state.state}`} {...state} isPreview />)}
            </div>
        </div>
    );
};

export default Home;
