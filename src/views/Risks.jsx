import { useEffect, useState } from "react";
import LoaderSkeletonCard from "../components/LoaderSkeletonCard";
import RiskCard from "../components/RiskCard";
import RiskGlossaryPanel from "../components/RiskGlossaryPanel";

const envars = {
    prefix: process.env.REACT_APP_KEY_PREFIX || process.env.KEY_PREFIX,
    key: process.env.REACT_APP_API_KEY || process.env.API_KEY
};

const Risks = () => {
    const [data, setData] = useState(new Array(52).fill(null));
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "Risk Metrics";
        fetch("https://api.covidactnow.org/v2/states" + envars.prefix + envars.key)
            .then(res => res.json())
            .then(data => {
                setLoaded(true);
                setData(data);
            });
    }, []);

    return (
        <div className="container">
            <RiskGlossaryPanel />
            <div className="row justify-content-center">
                {!loaded && data.map((placeholder, i) => <LoaderSkeletonCard key={`risk-loader-${i}`} lines={5} />)}
                {loaded && data.map(state => state && <RiskCard key={`risk-card-${state.state}`} {...state} />)}
            </div>
        </div>
    );
};

export default Risks;
