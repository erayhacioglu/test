import React, { useState } from 'react';
import { getEventTypeDetails } from '../../../constants/historyTypes';
import { 
    formatTime, 
    calculateArrayDiff, 
    formatCompanyInfo,
    formatBankInfo,
    formatContactInfo,
    formatSocialMediaInfo,
    formatLinkInfo
} from '../../../helpers/historyHelpers';
import { 
    User, Link, Trash2, Plus, Edit, 
    Check, X, Building, CreditCard, 
    Image, Book, Wallet, Mail, Phone 
} from 'lucide-react';
import './history_card.scss';

const iconMap = {
    'link': Link,
    'trash': Trash2,
    'plus': Plus,
    'edit': Edit,
    'check': Check,
    'x': X,
    'building': Building,
    'credit-card': CreditCard,
    'image': Image,
    'book': Book,
    'wallet': Wallet,
    'user': User,
    'check-circle': Check,
    'x-circle': X,
    'mail': Mail,
    'phone': Phone
};

const HistoryCard = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const eventDetails = getEventTypeDetails(event.eventType);
    const IconComponent = iconMap[eventDetails.icon] || User;
    
    // Check if this is a BULK_UPDATED event with array data
    const isBulkUpdate = event.eventType.includes('BULK_UPDATED') || 
                         event.eventType.includes('COMPANY_INFO') ||
                         event.eventType.includes('BANK_ACCOUNT');
    const hasChanges = event.oldValue || event.newValue;
    
    let diff = null;
    if (isBulkUpdate && hasChanges) {
        diff = calculateArrayDiff(event.oldValue, event.newValue);
    }

    // Format item based on event type
    const formatItem = (item) => {
        if (!Array.isArray(item)) return item;

        if (event.eventType.includes('COMPANY_INFO')) {
            const info = formatCompanyInfo(item);
            return (
                <div className="history-card__formatted-item">
                    <div><strong>Şirket:</strong> {info.companyName}</div>
                    <div><strong>Adres:</strong> {info.address}</div>
                    <div><strong>Vergi No:</strong> {info.taxNumber}</div>
                    <div><strong>Vergi Dairesi:</strong> {info.taxOffice}</div>
                </div>
            );
        } else if (event.eventType.includes('BANK_ACCOUNT')) {
            const info = formatBankInfo(item);
            return (
                <div className="history-card__formatted-item">
                    <div><strong>Banka:</strong> {info.bankName}</div>
                    <div><strong>Hesap Sahibi:</strong> {info.accountHolder}</div>
                    <div><strong>IBAN:</strong> {info.iban}</div>
                </div>
            );
        } else if (event.eventType.includes('CONTACT_INFO')) {
            const info = formatContactInfo(item);
            return `${info.type}: ${info.value}`;
        } else if (event.eventType.includes('SOCIAL_MEDIA')) {
            const info = formatSocialMediaInfo(item);
            return `${info.platform}: ${info.url}`;
        } else if (event.eventType.includes('LINK')) {
            const info = formatLinkInfo(item);
            return `${info.title}`;
        }
        
        return Array.isArray(item) ? item.join(': ') : item;
    };

    const renderSimpleChanges = () => {
        if (!event.oldValue && !event.newValue) return null;

        return (
            <div className="history-card__simple-changes">
                {event.oldValue && event.newValue && (
                    <>
                        <div className="history-card__change-item history-card__change-item--removed">
                            <span className="history-card__change-label">Eski:</span>
                            <span className="history-card__change-value">{event.oldValue}</span>
                        </div>
                        <div className="history-card__change-item history-card__change-item--added">
                            <span className="history-card__change-label">Yeni:</span>
                            <span className="history-card__change-value">{event.newValue}</span>
                        </div>
                    </>
                )}
                {!event.oldValue && event.newValue && (
                    <div className="history-card__change-item history-card__change-item--added">
                        <Plus size={14} />
                        <span>{event.newValue}</span>
                    </div>
                )}
                {event.oldValue && !event.newValue && (
                    <div className="history-card__change-item history-card__change-item--removed">
                        <Trash2 size={14} />
                        <span>{event.oldValue}</span>
                    </div>
                )}
            </div>
        );
    };

    const renderBulkChanges = () => {
        if (!diff || (!diff.added.length && !diff.removed.length && !diff.changed.length)) {
            return null;
        }

        return (
            <div className="history-card__bulk-changes">
                {diff.added.length > 0 && (
                    <div className="history-card__diff-section">
                        <div className="history-card__diff-header history-card__diff-header--added">
                            <Plus size={14} />
                            <span>Eklenen ({diff.added.length})</span>
                        </div>
                        {diff.added.map((item, idx) => (
                            <div key={idx} className="history-card__diff-item history-card__diff-item--added">
                                {formatItem(item)}
                            </div>
                        ))}
                    </div>
                )}

                {diff.changed.length > 0 && (
                    <div className="history-card__diff-section">
                        <div className="history-card__diff-header history-card__diff-header--changed">
                            <Edit size={14} />
                            <span>Güncellenen ({diff.changed.length})</span>
                        </div>
                        {diff.changed.map((item, idx) => (
                            <div key={idx} className="history-card__diff-item history-card__diff-item--changed">
                                <div className="history-card__diff-old">
                                    {formatItem(item.old)}
                                </div>
                                <div className="history-card__diff-arrow">→</div>
                                <div className="history-card__diff-new">
                                    {formatItem(item.new)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {diff.removed.length > 0 && (
                    <div className="history-card__diff-section">
                        <div className="history-card__diff-header history-card__diff-header--removed">
                            <Trash2 size={14} />
                            <span>Silinen ({diff.removed.length})</span>
                        </div>
                        {diff.removed.map((item, idx) => (
                            <div key={idx} className="history-card__diff-item history-card__diff-item--removed">
                                {formatItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const hasExpandableContent = isBulkUpdate && diff && 
        (diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0);

    return (
        <div className="history-card">
            <div className="history-card__time">
                {formatTime(event.createdAt)}
            </div>
            
            <div 
                className="history-card__indicator" 
                style={{ backgroundColor: eventDetails.color }}
            >
                <IconComponent size={14} color="#FFFFFF" />
            </div>
            
            <div className="history-card__content">
                <div className="history-card__main">
                    <div className="history-card__header">
                        <h4 className="history-card__title">{eventDetails.label}</h4>
                    </div>

                    {event.eventDetail && event.eventDetail !== event.eventType && (
                        <p className="history-card__detail">{event.eventDetail}</p>
                    )}

                    {event.actorUser && event.actorUser !== 'null null' && (
                        <div className="history-card__actor">
                            <User size={12} />
                            <span>{event.actorUser} tarafından</span>
                        </div>
                    )}
                </div>

                {hasExpandableContent && (
                    <button 
                        className="history-card__expand-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Daha Az' : 'Detayları Gör'}
                    </button>
                )}

                {isExpanded && hasExpandableContent && renderBulkChanges()}
                {!isBulkUpdate && hasChanges && renderSimpleChanges()}
            </div>
        </div>
    );
};

export default HistoryCard;
