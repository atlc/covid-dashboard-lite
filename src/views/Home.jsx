import { useEffect, useState } from "react";
import LoaderSkeletonCard from "../components/LoaderSkeletonCard";
import StateDataCard from "../components/StateDataCard";
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const envars = {
    prefix: process.env.REACT_APP_KEY_PREFIX || process.env.KEY_PREFIX,
    key: process.env.REACT_APP_API_KEY || process.env.API_KEY
};

const Up = () => <BsFillArrowUpSquareFill />;
const Down = () => <BsFillArrowDownSquareFill />;
const COMMAS = str => (str ? str.toLocaleString() : "Data Not Currently Available");
const PERCENT = num => (num ? (num * 100).toFixed(1) + "%" : "Data Not Currently Available");

const sortables = [
    { name: "Vaccine Completion", type: "vc" },
    { name: "Death Rate", type: "dr" },
    { name: "A-Z", type: "alph" },
    { name: "ICU Availability", type: "icuav" }
];

const Home = () => {
    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState(new Array(54).fill(null));
    const [totals, setTotals] = useState({ population: 0, completed: 0, deaths: 0, states: 0 });
    const [loaded, setLoaded] = useState(false);
    const [showSortables, setShowSortables] = useState(false);
    const [currentSort, setCurrentSort] = useState({ metric: "", direction: 0 });

    const Buttons = ({ type }) => {
        return (
            <>
                <span className="mx-1" onClick={() => sort(type, 0)}>
                    <Up />
                </span>
                <span className="mx-1" onClick={() => sort(type, 1)}>
                    <Down />
                </span>
            </>
        );
    };

    useEffect(() => {
        document.title = "COVID Dashboard-Lite";
        fetch("https://api.covidactnow.org/v2/states" + envars.prefix + envars.key)
            .then(res => res.json())
            .then(data => {
                setLoaded(true);
                setData(data);
                setSorted(data);

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

    const sort = (metric, direction) => {
        if (currentSort.metric === metric && currentSort.direction === direction) return;
        setCurrentSort({ metric, direction });
        setShowSortables(false);

        const temp = data.slice();

        const completion = state => state.actuals.vaccinationsCompleted / state.population;
        const deathrate = state => state.actuals.deaths / state.population;
        const icu_availability = state => 1 - state.metrics.icuCapacityRatio;

        const sorter = fn => temp.sort((a, b) => (direction ? fn(a) - fn(b) : fn(b) - fn(a)));

        switch (metric) {
            case "vc":
                sorter(completion);
                break;
            case "dr":
                sorter(deathrate);
                break;
            case "alph":
                temp.sort((a, b) => (direction ? a.state.localeCompare(b.state) : b.state.localeCompare(a.state)));
                break;
            case "icuav":
                sorter(icu_availability);
                break;
            default:
                break;
        }

        console.log(temp.map(st => st.state));

        setSorted(temp);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="bg-dark col-11 text-light rounded-3 p-2 mx-1">
                    <h4 onClick={() => setShowSortables(!showSortables)} className="display-4 mx-2 text-center">
                        {showSortables ? (
                            "Sort by:"
                        ) : (
                            <>
                                Sort Options <GiHamburgerMenu />
                            </>
                        )}
                    </h4>
                    {showSortables &&
                        sortables.map(s => (
                            <div key={s.name} className="row mx-2">
                                <h5 className="text-end text-md-center">
                                    {s.name} <Buttons type={s.type} />
                                </h5>
                            </div>
                        ))}
                </div>
            </div>

            <div className="row justify-content-center">
                {!loaded && sorted.map((placeholder, i) => <LoaderSkeletonCard key={`state-preview-loader-${i}`} lines={5} />)}

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

                {loaded && sorted.map(state => state && <StateDataCard key={`state-data-card-${state.state}`} {...state} isPreview />)}
            </div>
        </div>
    );
};

export default Home;
