import {useState} from "react";
import {FaCheck} from "react-icons/fa6";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import PageTitle from "../../../components/PageTitle";
import plusIcon from "../../../assets/img/icons/plus.svg";
import linkIcon from "../../../assets/img/icons/link.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";
import deleteIcon from "../../../assets/img/icons/trash.svg";

const Links = ({profileData, setProfileData}) => {
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];
    const {updatedPage} = useSelector(state => state?.updateData);

    const [copied, setCopied] = useState(false);

    const handleCopy = async (idx, textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(idx);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Kopyalama hatası:', err);
        }
    };

    const handleAddLink = () => {
        setProfileData((prev) => ({
            ...prev,
            links: [...prev.links, ""]
        }));
    };

    const handleClickDeleteItem = (index) => {
        setProfileData((prev) => ({
            ...prev,
            links: prev.links?.filter((_, idx) => idx !== index)
        }));
    };

    const handleUpdateLink = (index, newValue) => {
        setProfileData((prev) => {
            const updatedLinks = [...prev.links];
            updatedLinks[index] = newValue;
            return {
                ...prev,
                links: updatedLinks
            };
        });
    };

    return (
        <>
            <PageTitle title="Linkler" />
            <div className="section_container">
                {pathname === updatedPage ? (
                    <>
                        <div className="add_info_container">
                            <button className="add_info" onClick={handleAddLink}>
                                Link&nbsp;<img src={plusIcon} alt="" />
                            </button>
                        </div>

                        <div style={{marginTop: profileData?.links?.length > 0 ? "30px" : "0"}}>
                            {profileData?.links?.map((item, idx) => (
                                <div className="editable_container" key={idx}>
                                    <div className="editable_input_group">
                                        <img src={linkIcon} alt="" className="editable_input_icon" />
                                        <input
                                            type="text"
                                            className="editable_input"
                                            value={item}
                                            onChange={(e) => handleUpdateLink(idx, e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="editable_input_delete_button"
                                        onClick={() => handleClickDeleteItem(idx)}
                                    >
                                        <img src={deleteIcon} alt="" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    profileData?.links?.map((item, idx) => (
                        <div className="info_line" key={idx}>
                            <div className="info_line_content">
                                <img src={linkIcon} alt="" />
                                <span className="info_line_content_text">{item}</span>
                            </div>
                            <button
                                className="info_line_copy_button"
                                onClick={() => handleCopy(idx, item)}
                            >
                                {copied === idx ? (
                                    <FaCheck color="#70C094" />
                                ) : (
                                    <img src={copyIcon} alt="" />
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Links;
