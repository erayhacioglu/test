// Utility functions for history data processing

/**
 * Filter out events where oldValue === newValue (no actual change)
 */
export const filterValidEvents = (events) => {
    return events.filter(event => {
        // If both are null/undefined, it's valid (like CONNECTION_REMOVED)
        if (!event.oldValue && !event.newValue) return true;
        
        // If values are different, it's valid
        if (event.oldValue !== event.newValue) return true;
        
        // Otherwise filter out
        return false;
    });
};

/**
 * Parse array string from backend
 * "[[A,B], [C,D]]" → [["A","B"], ["C","D"]]
 */
export const parseArrayString = (str) => {
    if (!str) return null;
    
    try {
        // Remove outer brackets and split by ], [
        const cleaned = str.replace(/^\[+/, '').replace(/\]+$/, '');
        const items = cleaned.split('], [');
        
        return items.map(item => {
            const values = item.replace(/\[/g, '').replace(/\]/g, '').split(', ');
            return values;
        });
    } catch (error) {
        console.error('Error parsing array string:', error);
        return str;
    }
};

/**
 * Calculate diff between old and new array values
 * Improved to handle duplicate prevention
 */
export const calculateArrayDiff = (oldValue, newValue) => {
    const oldArray = parseArrayString(oldValue) || [];
    const newArray = parseArrayString(newValue) || [];
    
    const added = [];
    const removed = [];
    const changed = [];
    
    // Create a map for easier comparison
    const oldMap = new Map();
    oldArray.forEach((item, index) => {
        const key = JSON.stringify(item);
        if (!oldMap.has(key)) {
            oldMap.set(key, item);
        }
    });
    
    const newMap = new Map();
    newArray.forEach((item, index) => {
        const key = JSON.stringify(item);
        if (!newMap.has(key)) {
            newMap.set(key, item);
        }
    });
    
    // Find added items (in new but not in old)
    newMap.forEach((item, key) => {
        if (!oldMap.has(key)) {
            added.push(item);
        }
    });
    
    // Find removed items (in old but not in new)
    oldMap.forEach((item, key) => {
        if (!newMap.has(key)) {
            removed.push(item);
        }
    });
    
    // For company info and similar data, check for updates based on first element (ID/key)
    if (added.length > 0 || removed.length > 0) {
        const potentialChanges = [];
        
        removed.forEach(removedItem => {
            const removedKey = removedItem[0]; // First element as identifier
            
            added.forEach(addedItem => {
                const addedKey = addedItem[0]; // First element as identifier
                
                // If keys match but values differ, it's a change not add+remove
                if (removedKey === addedKey && JSON.stringify(removedItem) !== JSON.stringify(addedItem)) {
                    potentialChanges.push({
                        old: removedItem,
                        new: addedItem
                    });
                }
            });
        });
        
        // Remove changed items from added/removed
        potentialChanges.forEach(change => {
            const oldIndex = removed.findIndex(item => JSON.stringify(item) === JSON.stringify(change.old));
            const newIndex = added.findIndex(item => JSON.stringify(item) === JSON.stringify(change.new));
            
            if (oldIndex !== -1) removed.splice(oldIndex, 1);
            if (newIndex !== -1) added.splice(newIndex, 1);
            
            changed.push(change);
        });
    }
    
    return { added, removed, changed };
};

/**
 * Group events by date
 */
export const groupEventsByDate = (events) => {
    const grouped = {};
    
    events.forEach(event => {
        const date = new Date(event.createdAt);
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        grouped[dateKey].push(event);
    });
    
    return grouped;
};

/**
 * Format date for display
 */
export const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateKey = date.toISOString().split('T')[0];
    const todayKey = today.toISOString().split('T')[0];
    const yesterdayKey = yesterday.toISOString().split('T')[0];
    
    if (dateKey === todayKey) {
        return 'Bugün';
    } else if (dateKey === yesterdayKey) {
        return 'Dün';
    } else {
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }
};

/**
 * Format time (HH:MM)
 */
export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

/**
 * Format company info for display
 * [Kavio, Kartal İstanbul, 11111111111111, Abc] → Formatted view
 */
export const formatCompanyInfo = (item) => {
    if (!Array.isArray(item)) return item;
    
    const [companyName, address, taxNumber, taxOffice] = item;
    
    return {
        companyName: companyName || '-',
        address: address || '-',
        taxNumber: taxNumber || '-',
        taxOffice: taxOffice || '-'
    };
};

/**
 * Format bank info for display
 * [Yapı Kredi, Yağız Dijital Dönüşüm Yazılım A.Ş, Tr 1111111111111] → Formatted view
 */
export const formatBankInfo = (item) => {
    if (!Array.isArray(item)) return item;
    
    const [bankName, accountHolder, iban] = item;
    
    return {
        bankName: bankName || '-',
        accountHolder: accountHolder || '-',
        iban: iban || '-'
    };
};

/**
 * Format contact info for display
 * [phone, 05445934945] → Formatted view
 */
export const formatContactInfo = (item) => {
    if (!Array.isArray(item)) return item;
    
    const [type, value] = item;
    
    const typeLabels = {
        phone: 'Telefon',
        email: 'E-posta',
        whatsapp: 'WhatsApp',
        location: 'Konum',
        fax: 'Fax'
    };
    
    return {
        type: typeLabels[type] || type,
        value: value || '-'
    };
};

/**
 * Format social media info for display
 * [LINKEDIN, www.linkedin.com/...] → Formatted view
 */
export const formatSocialMediaInfo = (item) => {
    if (!Array.isArray(item)) return item;
    
    const [platform, url] = item;
    
    return {
        platform: platform || '-',
        url: url || '-'
    };
};

/**
 * Format link info for display
 * [UNKNOWN, Kavio.co, 1] → Formatted view
 */
export const formatLinkInfo = (item) => {
    if (!Array.isArray(item)) return item;
    
    const [type, title, order] = item;
    
    return {
        type: type === 'UNKNOWN' ? 'Link' : type,
        title: title || '-',
        order: order || '-'
    };
};

/**
 * Format value display based on event type
 */
export const formatValueDisplay = (value, eventType) => {
    if (!value) return '-';
    
    // If it's an array string, parse and format nicely
    const parsed = parseArrayString(value);
    if (Array.isArray(parsed)) {
        // Format based on event type
        if (eventType.includes('COMPANY_INFO')) {
            return parsed.map(item => {
                const formatted = formatCompanyInfo(item);
                return `${formatted.companyName}`;
            }).join(', ');
        } else if (eventType.includes('BANK_ACCOUNT')) {
            return parsed.map(item => {
                const formatted = formatBankInfo(item);
                return `${formatted.bankName} - ${formatted.accountHolder}`;
            }).join(', ');
        } else if (eventType.includes('CONTACT_INFO')) {
            return parsed.map(item => {
                const formatted = formatContactInfo(item);
                return `${formatted.type}: ${formatted.value}`;
            }).join(', ');
        } else if (eventType.includes('SOCIAL_MEDIA')) {
            return parsed.map(item => {
                const formatted = formatSocialMediaInfo(item);
                return `${formatted.platform}`;
            }).join(', ');
        } else if (eventType.includes('LINK')) {
            return parsed.map(item => {
                const formatted = formatLinkInfo(item);
                return `${formatted.title}`;
            }).join(', ');
        } else {
            return parsed.map(item => {
                if (Array.isArray(item)) {
                    return item.join(': ');
                }
                return item;
            }).join(', ');
        }
    }
    
    return value;
};
