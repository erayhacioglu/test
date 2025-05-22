import './user_header.scss';
import avatar from "../../../assets/img/avatar.png";
import editIcon from "../../../assets/img/icons/edit.svg";
import qrIcon from "../../../assets/img/icons/qr.svg";
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedPage } from '../../../redux/slices/UpdateDataSlice';
import { useEffect } from 'react';

const UserHeader = () => {
    const dispatch = useDispatch();
    const {updatedPage} = useSelector(state => state.updateData);
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];

    const handleClickUpdate = () => {
        if(pathname){
            dispatch(setUpdatedPage(pathname))
        }
    }

    useEffect(() => {
        if(pathname !== updatedPage){
            dispatch(setUpdatedPage(""));
        }
    },[pathname,updatedPage,dispatch]);

    return(
        <div className="user_header">
                <div className="user_profile_info">
                    <div className="avatar">
                        <img src={avatar} alt="" className="avatar_img" />
                    </div>
                    <div className="user_info">
                        <h2 className="fullname">Eray Hacıoğlu</h2>
                        <p className="job">Frontend Developer</p>
                    </div>
                </div>
                <div className="user_actions">
                    {
                        pathname && updatedPage && pathname === updatedPage  ? <><button className='user_action_submit_button'>Kaydet</button><button className='user_action_submit_button cancel'>İptal</button></> : <>
                    <button className="user_action_button" onClick={handleClickUpdate}>
                        <img src={editIcon} alt="" className="user_action_button_icon"/>
                        <span className="user_action_button_text">Düzenle</span>
                    </button>
                    <button className="user_action_button">
                        <img src={qrIcon} alt="" className="user_action_button_icon"/>
                        <span className="user_action_button_text">QR Oluştur</span>
                    </button>
                        
                        </>
                    }
                </div>
            </div>
    );
}

export default UserHeader;