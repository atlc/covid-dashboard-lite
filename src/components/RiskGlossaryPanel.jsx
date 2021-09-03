import React from "react";

const RiskGlossaryPanel = () => {
    return (
        <div className="row justify-content-center text-center bg-light">
            <h3>The risk metrics are defined as:</h3>
            <p>
                <a target="_blank" rel="noreferrer" href="https://apidocs.covidactnow.org/data-definitions#test-positivity-ratio">
                    Test Positivity
                </a>
                : Ratio of people who test positive calculated using a 7-day rolling average.
            </p>
            <p>
                <a target="_blank" rel="noreferrer" href="https://apidocs.covidactnow.org/data-definitions#case-density">
                    Case Density
                </a>
                : The number of cases per 100k population calculated using a 7-day rolling average.
            </p>
            <p>
                <a target="_blank" rel="noreferrer" href="https://apidocs.covidactnow.org/data-definitions#infection-rate">
                    Infection Rate
                </a>
                : R_t, or the estimated number of infections arising from a typical case.
            </p>
            <p>
                <a target="_blank" rel="noreferrer" href="https://apidocs.covidactnow.org/data-definitions#icu-capacity-ratio">
                    ICU Capacity Ratio
                </a>
                : Ratio of staffed intensive care unit (ICU) beds that are currently in use.
            </p>
        </div>
    );
};

export default RiskGlossaryPanel;
