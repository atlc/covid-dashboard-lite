import React from "react";
import { useHistory } from "react-router";

const StateDataCard = ({ population, metrics, actuals, url, state, isPreview }) => {
    const { push, goBack } = useHistory();
    const COMMAS = str => str.toLocaleString();
    const PERCENT = num => (num * 100).toFixed(1) + "%";

    const name = url.split("-")[0].replace("https://covidactnow.org/us/", "").split("_").join(" ");
    const icu_cap = 1 - metrics.icuCapacityRatio;

    return (
        <div onClick={() => isPreview && push("/state-data/" + state)} className="col-11 col-md-5 card shadow-lg m-2">
            <div className="card-header bg-dark text-center text-white text-capitalize">{name}</div>
            <div className="card-body">
                <ul className="list-unstyled">
                    {!isPreview && (
                        <li>
                            <h4>Base Metrics:</h4>
                        </li>
                    )}
                    <li>Population: {COMMAS(population)}</li>
                    <li>Total Cases: {COMMAS(actuals.cases)}</li>
                    {!isPreview && <li>Cases per 1M: {COMMAS(Math.floor((actuals.cases / (population / 1e6)).toFixed(2)))}</li>}
                    {!isPreview && <li>Person per cases: 1 in {Math.round(1 / (actuals.cases / population))}</li>}
                    <li>Total Deaths: {COMMAS(actuals.deaths)}</li>
                    {!isPreview && <li>Deaths per 1M: {COMMAS(Math.floor((actuals.deaths / (population / 1e6)).toFixed(2)))}</li>}
                    {!isPreview && <li>Person per deaths: 1 in {Math.round(1 / (actuals.deaths / population))}</li>}
                    {!isPreview && (
                        <>
                            <hr />
                            <li>
                                <h4>ICU:</h4>
                            </li>
                        </>
                    )}
                    <li>
                        ICU Availability:{" "}
                        <span
                            className={
                                icu_cap <= 0
                                    ? "text-danger fw-bold"
                                    : icu_cap <= 0.1
                                    ? "text-danger"
                                    : icu_cap <= 0.2
                                    ? "text-warning fw-bold"
                                    : icu_cap < 0.5
                                    ? "text-success"
                                    : "text-success fw-bold"
                            }>
                            {PERCENT(icu_cap)}
                        </span>
                    </li>
                    {!isPreview && (
                        <>
                            <li>ICU Capacity: {COMMAS(actuals.icuBeds.capacity)}</li>
                            <li>ICU Current Usage: {COMMAS(actuals.icuBeds.currentUsageTotal)}</li>
                            <li>ICU Non-COVID Beds: {COMMAS(metrics.icuHeadroomDetails.currentIcuNonCovid)}</li>
                            <li>ICU COVID-Positive: {COMMAS(metrics.icuHeadroomDetails.currentIcuCovid)}</li>
                        </>
                    )}
                    {!isPreview && (
                        <>
                            <hr />
                            <li>
                                <h4>Vaccination:</h4>
                            </li>
                        </>
                    )}
                    <li>Vaccinations Completed Percent: {PERCENT(metrics.vaccinationsCompletedRatio)}</li>
                    {!isPreview && (
                        <>
                            <li>Vaccinations Completed: {COMMAS(actuals.vaccinationsCompleted)}</li>
                            <li>Vaccinations Initiated Percent: {PERCENT(metrics.vaccinationsInitiatedRatio)}</li>
                            <li>Vaccinations Initiated: {COMMAS(actuals.vaccinationsInitiated)}</li>
                        </>
                    )}
                    {!isPreview && (
                        <div>
                            <hr />
                            <div>
                                <a href={url}>See charts and in-depth details</a>
                            </div>
                            <div onClick={goBack} className=" mt-2 btn btn-outline-dark">
                                Go back
                            </div>
                        </div>
                    )}
                </ul>
                {isPreview && <hr />}
                {isPreview && <p className="text-muted">Click anywhere to see my full details</p>}
            </div>
        </div>
    );
};

export default StateDataCard;
