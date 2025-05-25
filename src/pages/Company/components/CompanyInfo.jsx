import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../../../../../../Documents/GitHub/kavio-profile/src/components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import copy from "../../../assets/img/icons/copy.svg";
import {FaCheck} from "react-icons/fa6"
import plus from "../../../assets/img/icons/plus.svg";
import trash from "../../../assets/img/icons/trash.svg";
import { setCompanyInfo } from "../../../redux/slices/CompanySlice";

const CompanyInfo = ({ isUpdated }) => {
  const dispatch = useDispatch();
  const { companyInfo } = useSelector((state) => state.company);
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text, textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(text);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };

  const handleDeleteItem = (index) => {
    dispatch(setCompanyInfo(companyInfo?.filter((_,i) => i !== index)));
  }

  const handleAddItem = () => {
    dispatch(setCompanyInfo([
        ...companyInfo,
        {
          name: "",
          taxNo: "",
          taxBody: "",
          address: "",
        }
    ]));
  }

  return (
    <>
      <PageTitle title={t("companyPage.companyInfo.pageTitle")} />
      <div className="section_container">
        {isUpdated
          ? <>
            {
                companyInfo &&
            companyInfo?.length > 0 &&
            companyInfo?.map((item,idx) => (
                <>
            <div className="item_margin_bottom" key={idx}>
                <div className="form_group">
                    <label className="form_label wide">{t("companyPage.companyInfo.name")}</label>
                    <input type="text" className="form_input" value={item?.name}/>
                </div>
                <div className="form_group">
                    <label className="form_label wide">{t("companyPage.companyInfo.taxNo")}</label>
                    <input type="text" className="form_input" value={item?.taxNo}/>
                </div>
                <div className="form_group">
                    <label className="form_label wide">{t("companyPage.companyInfo.taxBody")}</label>
                    <input type="text" className="form_input" value={item?.taxBody}/>
                </div>
                <div className="form_group">
                    <label className="form_label wide">{t("companyPage.companyInfo.address")}</label>
                    <input type="text" className="form_input" value={item?.address}/>
                </div>
                <div className="form_delete_button_container">
                    <button className="form_delete_button" onClick={() => handleDeleteItem(idx)}><img src={trash} alt=""/></button>
                </div>
            </div>
            </>
            ))
        }
        <div className="add_company_button" onClick={handleAddItem}><img src={plus} alt=""/>&nbsp;{t("companyPage.companyInfo.addCompanyInfoButton")}</div>
          </>
          : companyInfo &&
            companyInfo?.length > 0 &&
            companyInfo?.map((item, idx) => (
              <div key={idx} className="item_margin_bottom">
                <div className="copied_line_container">
                  <div className="copied_line_group">
                    <span className="copied_line_text">{item?.name}</span>
                  </div>
                  <button
                    className="copied_button"
                    onClick={() => handleCopy(item?.name, item?.name)}
                  >
                    {copied && copied === item?.name ? (
                      <FaCheck color="#70C094" />
                    ) : (
                      <img src={copy} alt="" />
                    )}
                  </button>
                </div>
                <div className="copied_line_container">
                  <div className="copied_line_group">
                    <span className="copied_line_text">{item?.taxNo}</span>
                  </div>
                  <button
                    className="copied_button"
                    onClick={() => handleCopy(item?.taxNo, item?.taxNo)}
                  >
                    {copied && copied === item?.taxNo ? (
                      <FaCheck color="#70C094" />
                    ) : (
                      <img src={copy} alt="" />
                    )}
                  </button>
                </div>
                <div className="copied_line_container">
                  <div className="copied_line_group">
                    <span className="copied_line_text">{item?.taxBody}</span>
                  </div>
                  <button
                    className="copied_button"
                    onClick={() => handleCopy(item?.taxBody, item?.taxBody)}
                  >
                    {copied && copied === item?.taxBody ? (
                      <FaCheck color="#70C094" />
                    ) : (
                      <img src={copy} alt="" />
                    )}
                  </button>
                </div>
                <div className="copied_line_container">
                  <div className="copied_line_group">
                    <span className="copied_line_text">{item?.address}</span>
                  </div>
                  <button
                    className="copied_button"
                    onClick={() => handleCopy(item?.address, item?.address)}
                  >
                    {copied && copied === item?.address ? (
                      <FaCheck color="#70C094" />
                    ) : (
                      <img src={copy} alt="" />
                    )}
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default CompanyInfo;
