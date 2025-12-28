import React from 'react';
import HistoryCard from './HistoryCard';
import { groupEventsByDate, formatDateHeader } from '../../../helpers/historyHelpers';
import './history_timeline.scss';

const HistoryTimeline = ({ events }) => {
    if (!events || events.length === 0) {
        return (
            <div className="history-timeline__empty">
                <p>Henüz geçmiş kaydı bulunmuyor.</p>
            </div>
        );
    }

    const groupedEvents = groupEventsByDate(events);
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
        new Date(b) - new Date(a)
    );

    return (
        <div className="history-timeline">
            {sortedDates.map((dateKey) => (
                <div key={dateKey} className="history-timeline__group">
                    <div className="history-timeline__date-header">
                        <time dateTime={dateKey}>
                            {formatDateHeader(dateKey)}
                        </time>
                    </div>
                    
                    <div className="history-timeline__events">
                        {groupedEvents[dateKey].map((event) => (
                            <HistoryCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryTimeline;
