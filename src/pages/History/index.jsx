import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { 
    fetchHistory, 
    setCurrentPage, 
    clearFilters 
} from '../../redux/slices/HistorySlice';
import { filterValidEvents } from '../../helpers/historyHelpers';
import PageTitle from '../../components/PageTitle';
import HistoryTimeline from './components/HistoryTimeline';
import HistoryFilter from './components/HistoryFilter';
import HistoryPagination from './components/HistoryPagination';
import HistorySkeleton from './components/HistorySkeleton';
import NoRecord from '../../components/NoRecord';
import './history.scss';

const History = () => {
    const dispatch = useDispatch();
    const { cardId: urlCardId } = useParams();
    const { user } = useSelector((state) => state.user);
    
    // URL'den gelen cardId varsa onu kullan, yoksa user'ın kendi cardId'si
    const cardId = urlCardId || user?.card?.id;
    
    const { 
        historyData, 
        currentPage, 
        pageSize, 
        loading, 
        error 
    } = useSelector((state) => state.history);

    // Local state for frontend filtering
    const [localFilters, setLocalFilters] = useState([]);

    // Filter out duplicate events (oldValue === newValue)
    const validEvents = useMemo(() => 
        filterValidEvents(historyData.content),
        [historyData.content]
    );

    // Apply frontend filters
    const filteredEvents = useMemo(() => {
        if (localFilters.length === 0) {
            return validEvents;
        }
        
        return validEvents.filter(event => 
            localFilters.includes(event.eventType)
        );
    }, [validEvents, localFilters]);

    useEffect(() => {
        if (cardId) {
            // Fetch all data without backend filtering
            dispatch(fetchHistory({ 
                cardId, 
                page: currentPage, 
                size: pageSize,
                eventType: null // Don't filter on backend
            }));
        }
    }, [dispatch, cardId, currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleFilterChange = (newFilters) => {
        setLocalFilters(newFilters);
    };

    const handleClearFilters = () => {
        setLocalFilters([]);
        dispatch(clearFilters());
    };

    if (error) {
        return (
            <div className="history">
                <PageTitle title="Geçmiş" />
                <div className="history__error">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="history">
            <PageTitle title="Geçmiş" />

            <div className="history__container">
                <HistoryFilter 
                    activeFilters={localFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                {loading ? (
                    <HistorySkeleton />
                ) : filteredEvents.length === 0 ? (
                    <NoRecord message="Henüz geçmiş kaydı bulunmuyor" />
                ) : (
                    <>
                        <HistoryTimeline events={filteredEvents} />
                        
                        <HistoryPagination 
                            currentPage={currentPage}
                            totalPages={historyData.totalPages}
                            totalElements={filteredEvents.length}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default History;
