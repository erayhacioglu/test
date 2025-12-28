// History Event Type Constants with Turkish descriptions
export const HISTORY_EVENT_TYPES = {
    // Connection Events
    CONNECTION_CREATED: {
        value: 'CONNECTION_CREATED',
        label: 'Bağlantı Oluşturuldu',
        category: 'CONNECTION',
        color: '#3B82F6',
        icon: 'link'
    },
    CONNECTION_ACCEPTED: {
        value: 'CONNECTION_ACCEPTED',
        label: 'Bağlantı Kabul Edildi',
        category: 'CONNECTION',
        color: '#3B82F6',
        icon: 'check'
    },
    CONNECTION_REJECTED: {
        value: 'CONNECTION_REJECTED',
        label: 'Bağlantı Reddedildi',
        category: 'CONNECTION',
        color: '#3B82F6',
        icon: 'x'
    },
    CONNECTION_REMOVED: {
        value: 'CONNECTION_REMOVED',
        label: 'Bağlantı Kaldırıldı',
        category: 'CONNECTION',
        color: '#3B82F6',
        icon: 'trash'
    },

    // Social Media Events
    SOCIAL_MEDIA_ADDED: {
        value: 'SOCIAL_MEDIA_ADDED',
        label: 'Sosyal Medya Eklendi',
        category: 'SOCIAL_MEDIA',
        color: '#8B5CF6',
        icon: 'plus'
    },
    SOCIAL_MEDIA_BULK_UPDATED: {
        value: 'SOCIAL_MEDIA_BULK_UPDATED',
        label: 'Sosyal Medya Güncellendi',
        category: 'SOCIAL_MEDIA',
        color: '#8B5CF6',
        icon: 'edit'
    },
    SOCIAL_MEDIA_UPDATED: {
        value: 'SOCIAL_MEDIA_UPDATED',
        label: 'Sosyal Medya Güncellendi',
        category: 'SOCIAL_MEDIA',
        color: '#8B5CF6',
        icon: 'edit'
    },
    SOCIAL_MEDIA_REMOVED: {
        value: 'SOCIAL_MEDIA_REMOVED',
        label: 'Sosyal Medya Kaldırıldı',
        category: 'SOCIAL_MEDIA',
        color: '#8B5CF6',
        icon: 'trash'
    },

    // Profile Picture Events
    PROFILE_PICTURE_UPDATED: {
        value: 'PROFILE_PICTURE_UPDATED',
        label: 'Profil Resmi Güncellendi',
        category: 'PROFILE',
        color: '#10B981',
        icon: 'image'
    },
    PROFILE_PICTURE_REMOVED: {
        value: 'PROFILE_PICTURE_REMOVED',
        label: 'Profil Resmi Kaldırıldı',
        category: 'PROFILE',
        color: '#10B981',
        icon: 'image'
    },

    // Banner Picture Events
    BANNER_PICTURE_UPDATED: {
        value: 'BANNER_PICTURE_UPDATED',
        label: 'Banner Güncellendi',
        category: 'BANNER',
        color: '#10B981',
        icon: 'image'
    },
    BANNER_PICTURE_REMOVED: {
        value: 'BANNER_PICTURE_REMOVED',
        label: 'Banner Kaldırıldı',
        category: 'BANNER',
        color: '#10B981',
        icon: 'image'
    },

    // Catalog Events
    CATALOG_ADDED: {
        value: 'CATALOG_ADDED',
        label: 'Katalog Eklendi',
        category: 'CATALOG',
        color: '#F59E0B',
        icon: 'book'
    },
    CATALOG_UPDATED: {
        value: 'CATALOG_UPDATED',
        label: 'Katalog Güncellendi',
        category: 'CATALOG',
        color: '#F59E0B',
        icon: 'book'
    },
    CATALOG_REMOVED: {
        value: 'CATALOG_REMOVED',
        label: 'Katalog Kaldırıldı',
        category: 'CATALOG',
        color: '#F59E0B',
        icon: 'book'
    },

    // Link Events
    LINK_ADDED: {
        value: 'LINK_ADDED',
        label: 'Link Eklendi',
        category: 'LINK',
        color: '#06B6D4',
        icon: 'link'
    },
    LINK_UPDATED: {
        value: 'LINK_UPDATED',
        label: 'Link Güncellendi',
        category: 'LINK',
        color: '#06B6D4',
        icon: 'link'
    },
    LINK_BULK_UPDATED: {
        value: 'LINK_BULK_UPDATED',
        label: 'Link Güncellendi',
        category: 'LINK',
        color: '#06B6D4',
        icon: 'link'
    },
    LINK_REMOVED: {
        value: 'LINK_REMOVED',
        label: 'Link Kaldırıldı',
        category: 'LINK',
        color: '#06B6D4',
        icon: 'link'
    },

    // Bank Account Info Events
    BANK_ACCOUNT_INFO_ADDED: {
        value: 'BANK_ACCOUNT_INFO_ADDED',
        label: 'Banka Hesabı Eklendi',
        category: 'BANK',
        color: '#059669',
        icon: 'credit-card'
    },
    BANK_ACCOUNT_INFO_BULK_UPDATED: {
        value: 'BANK_ACCOUNT_INFO_BULK_UPDATED',
        label: 'Banka Hesabı Güncellendi',
        category: 'BANK',
        color: '#059669',
        icon: 'credit-card'
    },
    BANK_ACCOUNT_INFO_UPDATED: {
        value: 'BANK_ACCOUNT_INFO_UPDATED',
        label: 'Banka Hesabı Güncellendi',
        category: 'BANK',
        color: '#059669',
        icon: 'credit-card'
    },
    BANK_ACCOUNT_INFO_REMOVED: {
        value: 'BANK_ACCOUNT_INFO_REMOVED',
        label: 'Banka Hesabı Kaldırıldı',
        category: 'BANK',
        color: '#059669',
        icon: 'credit-card'
    },

    // Company Info Events
    COMPANY_INFO_ADDED: {
        value: 'COMPANY_INFO_ADDED',
        label: 'Şirket Bilgisi Eklendi',
        category: 'COMPANY',
        color: '#6366F1',
        icon: 'building'
    },
    COMPANY_INFO_UPDATED: {
        value: 'COMPANY_INFO_UPDATED',
        label: 'Şirket Bilgisi Güncellendi',
        category: 'COMPANY',
        color: '#6366F1',
        icon: 'building'
    },
    COMPANY_INFO_REMOVED: {
        value: 'COMPANY_INFO_REMOVED',
        label: 'Şirket Bilgisi Kaldırıldı',
        category: 'COMPANY',
        color: '#6366F1',
        icon: 'building'
    },

    // Crypto Wallet Info Events
    CRYPTO_WALLET_INFO_ADDED: {
        value: 'CRYPTO_WALLET_INFO_ADDED',
        label: 'Kripto Cüzdan Eklendi',
        category: 'CRYPTO',
        color: '#059669',
        icon: 'wallet'
    },
    CRYPTO_WALLET_INFO_UPDATED: {
        value: 'CRYPTO_WALLET_INFO_UPDATED',
        label: 'Kripto Cüzdan Güncellendi',
        category: 'CRYPTO',
        color: '#059669',
        icon: 'wallet'
    },
    CRYPTO_WALLET_INFO_REMOVED: {
        value: 'CRYPTO_WALLET_INFO_REMOVED',
        label: 'Kripto Cüzdan Kaldırıldı',
        category: 'CRYPTO',
        color: '#059669',
        icon: 'wallet'
    },

    // User Information Events
    CONTACT_INFO_CREATED: {
        value: 'CONTACT_INFO_CREATED',
        label: 'İletişim Bilgisi Eklendi',
        category: 'CONTACT',
        color: '#EC4899',
        icon: 'user'
    },
    CONTACT_INFO_UPDATED: {
        value: 'CONTACT_INFO_UPDATED',
        label: 'İletişim Bilgisi Güncellendi',
        category: 'CONTACT',
        color: '#EC4899',
        icon: 'user'
    },
    CONTACT_INFO_BULK_UPDATED: {
        value: 'CONTACT_INFO_BULK_UPDATED',
        label: 'İletişim Bilgisi Güncellendi',
        category: 'CONTACT',
        color: '#EC4899',
        icon: 'user'
    },
    CONTACT_INFO_DELETED: {
        value: 'CONTACT_INFO_DELETED',
        label: 'İletişim Bilgisi Silindi',
        category: 'CONTACT',
        color: '#EC4899',
        icon: 'user'
    },

    USER_INFO_UPDATED: {
        value: 'USER_INFO_UPDATED',
        label: 'Kullanıcı Bilgisi Güncellendi',
        category: 'USER',
        color: '#EC4899',
        icon: 'user'
    },

    // Card Events
    CARD_CREATED: {
        value: 'CARD_CREATED',
        label: 'Kart Oluşturuldu',
        category: 'CARD',
        color: '#EF4444',
        icon: 'credit-card'
    },
    CARD_ACTIVATED: {
        value: 'CARD_ACTIVATED',
        label: 'Kart Aktif Edildi',
        category: 'CARD',
        color: '#EF4444',
        icon: 'check-circle'
    },
    CARD_DEACTIVATED: {
        value: 'CARD_DEACTIVATED',
        label: 'Kart Deaktif Edildi',
        category: 'CARD',
        color: '#EF4444',
        icon: 'x-circle'
    }
};

// Event categories for filtering
export const EVENT_CATEGORIES = {
    CONNECTION: {
        label: 'Bağlantılar',
        color: '#3B82F6'
    },
    SOCIAL_MEDIA: {
        label: 'Sosyal Medya',
        color: '#8B5CF6'
    },
    PROFILE: {
        label: 'Profil',
        color: '#10B981'
    },
    BANNER: {
        label: 'Banner',
        color: '#10B981'
    },
    CATALOG: {
        label: 'Katalog',
        color: '#F59E0B'
    },
    LINK: {
        label: 'Linkler',
        color: '#06B6D4'
    },
    BANK: {
        label: 'Banka Hesabı',
        color: '#059669'
    },
    COMPANY: {
        label: 'Şirket Bilgisi',
        color: '#6366F1'
    },
    CRYPTO: {
        label: 'Kripto Cüzdan',
        color: '#059669'
    },
    CONTACT: {
        label: 'İletişim Bilgisi',
        color: '#EC4899'
    },
    USER: {
        label: 'Kullanıcı',
        color: '#EC4899'
    },
    CARD: {
        label: 'Kart',
        color: '#EF4444'
    }
};

// Helper function to get event type details
export const getEventTypeDetails = (eventType) => {
    return HISTORY_EVENT_TYPES[eventType] || {
        value: eventType,
        label: eventType,
        category: 'OTHER',
        color: '#6B7280',
        icon: 'info'
    };
};

// Get all event types as array for filters
export const getAllEventTypes = () => {
    return Object.values(HISTORY_EVENT_TYPES);
};

// Get event types by category
export const getEventTypesByCategory = (category) => {
    return Object.values(HISTORY_EVENT_TYPES).filter(
        event => event.category === category
    );
};
