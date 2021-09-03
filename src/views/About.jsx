import React from "react";

const About = () => {
    return (
        <div className="container mb-5">
            <div className="row justify-content-center text-center">
                <div className="col-11 col-md-8 card shadow-lg p-4 mt-5">
                    <h5>
                        This site is built utilizing the API from{" "}
                        <a target="_blank" rel="noreferrer" className="text-decoration-none" href="https://covidactnow.org/">
                            COVID Act Now.
                        </a>
                    </h5>
                    <hr />
                    <h6>
                        The data is refreshed continuously, with each page load making a request to the API to get the most up-to-date information. All{" "}
                        <a className="text-decoration-none" target="_blank" rel="noreferrer" href="https://covidactnow.org/data-api#faq">
                            their data is sourced from
                        </a>{" "}
                        various reliable sources, including:
                    </h6>
                    <ul className="mt-2 list-unstyled text-start text-md-center">
                        <li>
                            <a className="text-decoration-none" target="_blank" rel="noreferrer" href="https://www.hhs.gov/coronavirus/index.html">
                                U.S. Dept of Health and Human Services
                            </a>
                            ,
                        </li>
                        <li>
                            <a
                                className="text-decoration-none"
                                target="_blank"
                                rel="noreferrer"
                                href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">
                                Centers for Disease Control and Prevention
                            </a>
                            ,
                        </li>
                        <li>
                            <a className="text-decoration-none" target="_blank" rel="noreferrer" href="https://developer.nytimes.com/covid">
                                The New York Times
                            </a>
                            ,
                        </li>
                        <li>Official state and county COVID dashboards</li>
                    </ul>
                    <hr />
                    <a target="_blank" rel="noreferrer" href="https://github.com/atlc/covid-dashboard-lite/">
                        Source code, suggestions, bugs, etc.
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
