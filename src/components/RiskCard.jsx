import { useNavigate } from "react-router-dom";

const RiskCard = ({ riskLevels, state }) => {
    const nav = useNavigate();
    const { overall, testPositivityRatio, caseDensity, infectionRate, icuCapacityRatio } = riskLevels;

    const severity = grade => {
        switch (grade) {
            case 1:
                return `text-success fw-bold`;
            case 2:
                return `text-success`;
            case 3:
                return `text-warning fw-bold`;
            case 4:
                return `text-danger fw-bold`;
            case 5:
                return `text-danger fw-bold fs-5`;
            default:
                return `text-success fw-bold`;
        }
    };

    return (
        <div onClick={() => nav(`/state-data/${state}`)} className="col-11 col-md-3 card shadow m-2">
            <div className="card-header bg-dark text-center text-white">{state}</div>
            <div className="card-body">
                <ul className="list-unstyled">
                    <li>
                        Overall: <span className={severity(overall)}>{overall}/5</span>
                    </li>
                    <li>
                        Test Positivity: <span className={severity(testPositivityRatio)}>{testPositivityRatio}/5</span>
                    </li>
                    <li>
                        Case Density: <span className={severity(caseDensity)}>{caseDensity}/5</span>
                    </li>
                    <li>
                        Infection Rate: <span className={severity(infectionRate)}>{infectionRate}/5</span>
                    </li>
                    <li>
                        ICU Capacity: <span className={severity(icuCapacityRatio)}>{icuCapacityRatio}/5</span>
                    </li>
                </ul>
                <p className="border-top pt-2 text-muted">Click anywhere to see my full details</p>
            </div>
        </div>
    );
};

export default RiskCard;
