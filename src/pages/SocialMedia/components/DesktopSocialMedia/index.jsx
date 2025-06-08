import "./desktop_social_media.scss";
import EditDesktopSocialMedia from './components/EditDesktopSocialMedia';
import DesktopSocialMediaView from './components/DesktopSocialMediaView';

const DesktopSocialMedia = ({isUpdated}) => {
  return (
    <>
        {
            isUpdated ? <EditDesktopSocialMedia /> : <DesktopSocialMediaView />
        }
    </>
  )
}

export default DesktopSocialMedia