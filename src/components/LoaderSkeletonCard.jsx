import Skeleton from "react-loading-skeleton";

const LoaderSkeletonCard = ({ lines }) => {
    return (
        <div className="col-11 col-md-3 card shadow m-2">
            <div className="card-header">
                <h1 className="m-1">
                    <Skeleton />
                </h1>
            </div>
            <div className="p-3">
                <Skeleton count={lines} />
            </div>
        </div>
    );
};

export default LoaderSkeletonCard;
