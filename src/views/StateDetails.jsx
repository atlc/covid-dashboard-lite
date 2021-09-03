import { useState, useEffect } from "react";
import { useParams } from "react-router";
import LoaderSkeletonCard from "../components/LoaderSkeletonCard";
import StateDataCard from "../components/StateDataCard";

const envars = {
    prefix: process.env.REACT_APP_KEY_PREFIX || process.env.KEY_PREFIX,
    key: process.env.REACT_APP_API_KEY || process.env.API_KEY
};

const State = () => {
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);

    const { state } = useParams();

    useEffect(() => {
        document.title = state + " Data";
        fetch(`https://api.covidactnow.org/v2/state/${state}${envars.prefix}${envars.key}`)
            .then(res => res.json())
            .then(data => {
                setLoaded(true);
                setData(data);
            });
    }, [state]);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">{!loaded ? <LoaderSkeletonCard lines={20} /> : data && <StateDataCard {...data} />}</div>
            </div>
        </div>
    );
};

export default State;
