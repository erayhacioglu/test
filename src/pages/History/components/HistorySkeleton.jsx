import React from 'react';
import './history_skeleton.scss';

const HistorySkeleton = () => {
    return (
        <div className="history-skeleton">
            {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="history-skeleton__item">
                    <div className="history-skeleton__indicator" />
                    <div className="history-skeleton__content">
                        <div className="history-skeleton__header">
                            <div className="history-skeleton__title" />
                            <div className="history-skeleton__time" />
                        </div>
                        <div className="history-skeleton__detail" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistorySkeleton;
