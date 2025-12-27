import "../interaction.scss";
import { Trash2, Mail, Phone, MapPin, MessageSquare, User, Calendar, X, Filter } from "lucide-react";
import useWindowSize from "../../../hooks/useWindow";
import PageTitle from "../../../components/PageTitle";
import InteractionSkeleton from "../InteractionSkeleton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Axios from "../../../api/axiosInstance";
import NoRecord from "../../../components/NoRecord";

const Contact = () => {
  const windowSize = useWindowSize();
  const [contactDataLoading, setContactDataLoading] = useState(false);
  const [allContactData, setAllContactData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { user } = useSelector(state => state.user);

  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`/guest-contact/${id}`);
      if (res?.status === 200) {
        toast.success("Mesaj silindi");
        fetchAllContactData();
      }
    } catch (error) {
      const msg = error?.response?.data?.detail || "Beklenmeyen Bir Hata Oluştu";
      toast.error(msg);
    }
  };

  const fetchAllContactData = async () => {
    try {
      setContactDataLoading(true);
      const res = await Axios.get(`/guest-contact/card/${user?.cardId}`);
      
      if (res?.status === 200) {
        const data = Array.isArray(res?.data) ? res?.data : (res?.data?.PENDING || []);
        setAllContactData(data);
        applyDateFilter(data, selectedDate);
      }
    } catch (error) {
      const msg = error?.response?.data?.detail || "Beklenmeyen Bir Hata Oluştu";
      toast.error(msg);
    } finally {
      setContactDataLoading(false);
    }
  };

  const applyDateFilter = (data, startDate) => {
    if (!startDate) {
      setFilteredData(data);
      return;
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const filtered = data.filter(item => {
      const createdDate = new Date(item.createdAt);
      return createdDate >= start && createdDate <= end;
    });

    setFilteredData(filtered);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    applyDateFilter(allContactData, date);
    setShowDatePicker(false);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    applyDateFilter(allContactData, null);
    setShowDatePicker(false);
  };

  const formatDateRange = () => {
    if (!selectedDate) return "Tüm Tarihler";
    
    const start = new Date(selectedDate);
    const end = new Date();
    
    const startFormatted = start.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
    
    const endFormatted = end.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  useEffect(() => {
    if (user?.cardId) {
      fetchAllContactData();
    }
  }, [user?.cardId]);

  if (contactDataLoading) {
    return (
      <div className="page_container">
        <div className="section_container">
          <InteractionSkeleton cardControlSize={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="page_container">
      <PageTitle title="İletişim Talepleri" />
      
      {/* Filter Section */}
      <div style={{ 
        marginBottom: '25px',
        marginTop: '30px',
        paddingLeft: windowSize?.width > 768 ? '0' : '35px',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--menuBackgroundColor)',
          padding: '12px 20px',
          borderRadius: '10px',
          border: '1px solid var(--linkBackgroundColor)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: showDatePicker ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
        }}
        onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <Filter size={18} color="var(--primaryColor)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--labelColor)',
              fontWeight: '500'
            }}>
              Tarih Aralığı
            </span>
            <span style={{ 
              fontSize: '14px', 
              color: 'var(--textColor)',
              fontWeight: '600'
            }}>
              {formatDateRange()}
            </span>
          </div>
          
          {selectedDate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearDate();
              }}
              style={{
                marginLeft: '8px',
                padding: '6px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'var(--linkBackgroundColor)',
                color: 'var(--textColor)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primaryColor)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--linkBackgroundColor)'}
            >
              <X size={14} />
            </button>
          )}
          
          <Calendar size={18} color="var(--labelColor)" style={{ marginLeft: '4px' }} />
        </div>

        {/* Date Picker Dropdown */}
        {showDatePicker && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: windowSize?.width > 768 ? '0' : '35px',
            marginTop: '8px',
            backgroundColor: 'var(--menuBackgroundColor)',
            border: '1px solid var(--linkBackgroundColor)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 100,
            minWidth: '300px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                fontSize: '12px', 
                color: 'var(--labelColor)',
                fontWeight: '500',
                display: 'block',
                marginBottom: '8px'
              }}>
                Başlangıç Tarihi Seçin
              </label>
              <input
                type="date"
                value={selectedDate || ''}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--linkBackgroundColor)',
                  backgroundColor: 'var(--backgroundColor)',
                  color: 'var(--textColor)',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primaryColor)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--linkBackgroundColor)'}
              />
            </div>

            <div style={{
              fontSize: '11px',
              color: 'var(--labelColor)',
              padding: '8px 12px',
              backgroundColor: 'var(--backgroundColor)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Calendar size={12} />
              Seçilen tarihten bugüne kadar olan kayıtlar gösterilecek
            </div>
          </div>
        )}

        {/* Backdrop */}
        {showDatePicker && (
          <div 
            onClick={() => setShowDatePicker(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99
            }}
          />
        )}
      </div>

      <div
        className="section_container"
        style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}
      >
        {filteredData && filteredData?.length === 0 ? (
          <NoRecord />
        ) : (
          <div className="interaction_container">
            {filteredData?.map((item, idx) => {
              const createdDate = new Date(item.createdAt);
              const formattedDate = createdDate.toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div className="mini_user_card_container" key={idx}>
                  <div className="mini_user_card">
                    <div className="mini_user_card_avatar">
                      <User className="mini_user_card_icon" />
                    </div>
                    <div className="mini_user_card_content">
                      <h2 className="mini_user_card_fullname">{item?.nameSurname}</h2>

                      {item?.email && (
                        <div className="mini_user_card_info">
                          <Mail size={12} color="var(--labelColor)" />
                          <p>{item?.email}</p>
                        </div>
                      )}

                      {item?.phone && (
                        <div className="mini_user_card_info">
                          <Phone size={12} color="var(--labelColor)" />
                          <p>{item?.phone}</p>
                        </div>
                      )}

                      {item?.location && (
                        <div className="mini_user_card_info">
                          <MapPin size={12} color="var(--labelColor)" />
                          <p>{item?.location?.district}, {item?.location?.province}</p>
                        </div>
                      )}

                      {item?.note && (
                        <div className="mini_user_card_note">
                          <MessageSquare size={12} color="var(--labelColor)" />
                          <p>{item?.note}</p>
                        </div>
                      )}

                      <div style={{ 
                        marginTop: '8px', 
                        fontSize: '10px', 
                        color: 'var(--labelColor)', 
                        opacity: 0.7,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        <Calendar size={10} />
                        {formattedDate}
                      </div>
                    </div>
                  </div>
                  <div className="mini_user_card_controls">
                    <button
                      className="mini_user_card_btn"
                      onClick={() => handleDelete(item?.id)}
                      title="Sil"
                      style={{ 
                        width: '100%',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size="14" />
                      <span style={{ fontSize: '12px' }}>Sil</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
