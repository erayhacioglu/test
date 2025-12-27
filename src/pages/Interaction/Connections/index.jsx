import "./connections.scss";
import { Ban, UserRoundX, Mail, Phone, Briefcase, User } from "lucide-react";
import useWindowSize from "../../../hooks/useWindow";
import PageTitle from "../../../components/PageTitle";
import InteractionSkeleton from "../InteractionSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnections, removeConnection, blockConnection } from "../../../redux/slices/ConnectionSlice";
import toast from "react-hot-toast";
import NoRecord from "../../../components/NoRecord";
import { useNavigate } from "react-router";

const Connections = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { connections, isLoading } = useSelector(state => state.connection);

  useEffect(() => {
    if (user?.cardId) {
      const controller = new AbortController();
      dispatch(getConnections({ cardId: user.cardId, signal: controller.signal }));
      return () => controller.abort();
    }
  }, [dispatch, user?.cardId]);

  const handleRemove = async (id, e) => {
    e.stopPropagation();
    try {
      await dispatch(removeConnection({ id })).unwrap();
      toast.success("Bağlantı kaldırıldı");
      if (user?.cardId) {
        dispatch(getConnections({ cardId: user.cardId, signal: new AbortController().signal }));
      }
    } catch (error) {
      toast.error(error || "Beklenmeyen bir hata oluştu");
    }
  };

  const handleBlock = async (id, e) => {
    e.stopPropagation();
    try {
      await dispatch(blockConnection({ id })).unwrap();
      toast.success("Kullanıcı engellendi");
      if (user?.cardId) {
        dispatch(getConnections({ cardId: user.cardId, signal: new AbortController().signal }));
      }
    } catch (error) {
      toast.error(error || "Beklenmeyen bir hata oluştu");
    }
  };

  const getConnectionInfo = (connection) => {
    const isSender = connection.sender?.id === user?.cardId;
    const otherCard = isSender ? connection.receiver : connection.sender;
    
    const otherUser = otherCard?.user;
    const firstName = otherUser?.firstName || '';
    const lastName = otherUser?.lastName || '';
    
    const fullName = firstName && lastName 
      ? `${firstName} ${lastName}`.trim()
      : firstName || lastName || otherCard?.cardName || 'İsimsiz Kullanıcı';
    
    const phoneContact = otherCard?.contactInfo?.find(c => c.contactType === 'phone');
    const emailContact = otherCard?.contactInfo?.find(c => c.contactType === 'email');
    
    const phone = phoneContact?.value || '';
    const email = emailContact?.value || otherUser?.email || '';
    const company = otherCard?.company?.name || '';
    const profileImage = otherUser?.profileImageUrl || '';
    const uniqueCode = otherUser?.card?.uniqueCode || '';

    return { fullName, email, phone, company, profileImage, uniqueCode };
  };

  const handleCardClick = (uniqueCode) => {
    if (uniqueCode) {
      navigate(`/user/${uniqueCode}/profile`);
    }
  };

  if (isLoading) {
    return (
      <div className="page_container">
        <div className="section_container">
          <InteractionSkeleton cardControlSize={2} />
        </div>
      </div>
    );
  }

  return (
    <div className="page_container">
      <PageTitle title="Bağlantılarım" />
      <div
        className="section_container"
        style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}
      >
        {connections && connections?.length === 0 ? (
          <NoRecord />
        ) : (
          <div className="connections_container">
            {connections?.map((item, idx) => {
              const contact = getConnectionInfo(item);
              const hasImage = contact.profileImage && contact.profileImage.trim() !== '';
              
              return (
                <div className="connection_card_container" key={idx}>
                  <div 
                    className="connection_card"
                    onClick={() => handleCardClick(contact.uniqueCode)}
                  >
                    <div className="connection_avatar">
                      {hasImage ? (
                        <>
                          <img
                            src={contact.profileImage}
                            alt={contact.fullName}
                            className="connection_avatar_img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const wrapper = e.target.parentElement.querySelector('.connection_icon_wrapper');
                              if (wrapper) wrapper.style.display = 'flex';
                            }}
                          />
                          <div className="connection_icon_wrapper" style={{ display: 'none' }}>
                            <User />
                          </div>
                        </>
                      ) : (
                        <div className="connection_icon_wrapper">
                          <User />
                        </div>
                      )}
                    </div>

                    <div className="connection_content">
                      <h2 className="connection_fullname">{contact.fullName}</h2>
                      
                      {contact.company && (
                        <div className="connection_info">
                          <Briefcase size={12} color="var(--labelColor)" />
                          <p>{contact.company}</p>
                        </div>
                      )}

                      {contact.email && (
                        <div className="connection_info">
                          <Mail size={12} color="var(--labelColor)" />
                          <p>{contact.email}</p>
                        </div>
                      )}

                      {contact.phone && (
                        <div className="connection_info">
                          <Phone size={12} color="var(--labelColor)" />
                          <p>{contact.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="connection_controls">
                    <button 
                      className="connection_btn"
                      onClick={(e) => handleRemove(item?.id, e)}
                      title="Bağlantıyı Kaldır"
                    >
                      <UserRoundX size="12" />
                    </button>
                    <button 
                      className="connection_btn"
                      onClick={(e) => handleBlock(item?.id, e)}
                      title="Engelle"
                    >
                      <Ban size="12" />
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

export default Connections;
