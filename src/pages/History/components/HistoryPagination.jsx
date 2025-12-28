import React from 'react';
import './history_pagination.scss';

const HistoryPagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    totalElements 
}) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        // First page
        if (startPage > 0) {
            pages.push(
                <button
                    key={0}
                    onClick={() => onPageChange(0)}
                    className="history-pagination__page"
                >
                    1
                </button>
            );
            if (startPage > 1) {
                pages.push(<span key="dots-start" className="history-pagination__dots">...</span>);
            }
        }

        // Middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`history-pagination__page ${i === currentPage ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push(<span key="dots-end" className="history-pagination__dots">...</span>);
            }
            pages.push(
                <button
                    key={totalPages - 1}
                    onClick={() => onPageChange(totalPages - 1)}
                    className="history-pagination__page"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="history-pagination">
            <div className="history-pagination__info">
                Toplam {totalElements} kayıt
            </div>

            <div className="history-pagination__controls">
                <button
                    className="history-pagination__nav"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    ←
                </button>

                {renderPageNumbers()}

                <button
                    className="history-pagination__nav"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default HistoryPagination;
