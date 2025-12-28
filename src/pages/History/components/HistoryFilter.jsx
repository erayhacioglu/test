import React, { useState } from 'react';
import { EVENT_CATEGORIES, getEventTypesByCategory, getAllEventTypes } from '../../../constants/historyTypes';
import './history_filter.scss';

const HistoryFilter = ({ activeFilters, onFilterChange, onClearFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryToggle = (category) => {
        const categoryEvents = getEventTypesByCategory(category);
        const categoryEventValues = categoryEvents.map(e => e.value);
        
        // Check if all events from this category are selected
        const allSelected = categoryEventValues.every(v => activeFilters.includes(v));
        
        if (allSelected) {
            // Deselect all from this category
            const newFilters = activeFilters.filter(f => !categoryEventValues.includes(f));
            onFilterChange(newFilters);
        } else {
            // Select all from this category
            const newFilters = [...new Set([...activeFilters, ...categoryEventValues])];
            onFilterChange(newFilters);
        }
    };

    const isCategoryActive = (category) => {
        const categoryEvents = getEventTypesByCategory(category);
        const categoryEventValues = categoryEvents.map(e => e.value);
        return categoryEventValues.some(v => activeFilters.includes(v));
    };

    const isCategoryFullyActive = (category) => {
        const categoryEvents = getEventTypesByCategory(category);
        const categoryEventValues = categoryEvents.map(e => e.value);
        return categoryEventValues.every(v => activeFilters.includes(v));
    };

    return (
        <div className="history-filter">
            <div className="history-filter__header">
                <button 
                    className="history-filter__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>Filtrele</span>
                    <span className={`history-filter__icon ${isOpen ? 'active' : ''}`}>▼</span>
                </button>

                {activeFilters.length > 0 && (
                    <button 
                        className="history-filter__clear"
                        onClick={onClearFilters}
                    >
                        Temizle ({activeFilters.length})
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="history-filter__content">
                    <div className="history-filter__categories">
                        {Object.entries(EVENT_CATEGORIES).map(([key, category]) => {
                            const isActive = isCategoryActive(key);
                            const isFullyActive = isCategoryFullyActive(key);
                            
                            return (
                                <button
                                    key={key}
                                    className={`history-filter__category ${isFullyActive ? 'active' : ''} ${isActive && !isFullyActive ? 'partial' : ''}`}
                                    onClick={() => handleCategoryToggle(key)}
                                    style={{
                                        '--category-color': category.color
                                    }}
                                >
                                    <span className="history-filter__category-dot" />
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryFilter;
