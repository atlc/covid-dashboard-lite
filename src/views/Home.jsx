import { useEffect, useState } from "react";
import LoaderSkeletonCard from "../components/LoaderSkeletonCard";
import StateDataCard from "../components/StateDataCard";

const envars = {
    prefix: process.env.REACT_APP_KEY_PREFIX || process.env.KEY_PREFIX,
    key: process.env.REACT_APP_API_KEY || process.env.API_KEY
};

const COMMAS = str => (str ? str.toLocaleString() : "Data Not Currently Available");
const PERCENT = num => (num ? (num * 100).toFixed(1) + "%" : "Data Not Currently Available");

const Home = () => {
    const [data, setData] = useState(new Array(54).fill(null));
    const [totals, setTotals] = useState({ population: 0, completed: 0, deaths: 0, states: 0 });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "COVID Dashboard-Lite";
        fetch("https://api.covidactnow.org/v2/states" + envars.prefix + envars.key)
            .then(res => res.json())
            .then(data => {
                setLoaded(true);
                setData(data);

                const temp_totals = {
                    population: 0,
                    completed: 0,
                    deaths: 0,
                    states: 0
                };

                data.forEach(state => {
                    const completed = Number(state.actuals.vaccinationsCompleted);
                    const population = Number(state.population);
                    const deaths = Number(state.actuals.deaths);

                    if (isNaN(completed) || isNaN(population)) return;

                    temp_totals.completed += completed;
                    temp_totals.population += population;
                    temp_totals.deaths += deaths;
                    ++temp_totals.states;
                });

                setTotals(temp_totals);
            });
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {!loaded && data.map((placeholder, i) => <LoaderSkeletonCard key={`state-preview-loader-${i}`} lines={5} />)}

                {loaded && (
                    <div className="col-11 col-md-5 bg-light card shadow-lg m-3">
                        <div className="card-header rounded-3 bg-dark text-center text-white display-6 text-capitalize">US Totals</div>
                        <div className="card-body">
                            <ul className="list-unstyled text-center fw-bold">
                                <li>Population: {COMMAS(totals.population)}</li>
                                <li>Total Deaths: {COMMAS(totals.deaths)}</li>
                                <li>People who have died from COVID: 1 in {Math.round(1 / (totals.deaths / totals.population))}</li>
                                <li>People with completed vaccine series: {PERCENT(totals.completed / totals.population)}</li>
                            </ul>
                        </div>
                    </div>
                )}

                {loaded && data.map(state => state && <StateDataCard key={`state-data-card-${state.state}`} {...state} isPreview />)}
            </div>
        </div>
    );
};

export default Home;
