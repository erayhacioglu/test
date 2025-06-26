import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import copy from "../../../assets/img/icons/copy.svg";
import { FaCheck } from "react-icons/fa6";
import plus from "../../../assets/img/icons/plus.svg";
import trash from "../../../assets/img/icons/trash.svg";
import { setCompanyData } from "../../../redux/slices/CompanySlice";
import CopiedLineSkeleton from "../../../components/SkeletonLoading/CopiedLineSkeleton";

const BankInfo = ({ isUpdated }) => {
  const dispatch = useDispatch();
  const { isLoading,data } = useSelector((state) => state.company);
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


const handleBankInfoChange = (idx, field, value) => {
  const updated = data.bankAccounts.map((item, i) =>
    i === idx ? { ...item, [field]: value } : item
  );

  dispatch(setCompanyData({ ...data, bankAccounts: updated }));
};


  const handleDeleteItem = (index) => {
    const updated = [...data.bankAccounts];
    updated.splice(index, 1);
    dispatch(setCompanyData({ ...data, bankAccounts: updated }));
  };
  
  const handleAddItem = () => {
    const newItem = {
      iban: "",
      holderName: "",
      bankName: "",
    };
  
    dispatch(
      setCompanyData({
        ...data,
        bankAccounts: [...(data.bankAccounts || []), newItem],
      })
    );
  };

  if(isLoading){
    return(
      <div className="section_container">
       <CopiedLineSkeleton copied={3}/>
      </div>
    )
  }

  return (
    <>
      <PageTitle title={t("companyPage.bankInfo.pageTitle")} />
      <div className="section_container">
        {isUpdated ? (
          <>
            {data?.bankAccounts &&
              data?.bankAccounts?.length > 0 &&
              data?.bankAccounts?.map((item, idx) => (
                <>
                  <div className="item_margin_bottom" key={idx}>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.bankName")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.bankName}
                        onChange={(e) =>
          handleBankInfoChange(idx, "bankName", e.target.value)
        }
                      />
                    </div>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.iban")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.iban}
                        onChange={(e) =>
          handleBankInfoChange(idx, "iban", e.target.value)
        }
                      />
                    </div>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.accountHolder")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.holderName}
                        onChange={(e) =>
          handleBankInfoChange(idx, "holderName", e.target.value)
        }
                      />
                    </div>
                    <div className="form_delete_button_container">
                      <button
                        className="form_delete_button"
                        onClick={() => handleDeleteItem(idx)}
                      >
                        <img src={trash} alt="" />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            <div className="add_company_button" onClick={handleAddItem}>
              <img src={plus} alt="" />
              &nbsp;{t("companyPage.bankInfo.addBankInfoButton")}
            </div>
          </>
        ) : (
          data?.bankAccounts &&
          data?.bankAccounts?.length > 0 &&
          data?.bankAccounts?.map((item, idx) => (
            <div key={idx} className="item_margin_bottom">
              <div className="copied_line_container">
                <div className="copied_line_group">
                  <span className="copied_line_text">{item?.bankName}</span>
                </div>
                <button
                  className="copied_button"
                  onClick={() => handleCopy(item?.bankName, item?.bankName)}
                >
                  {copied && copied === item?.bankName ? (
                    <FaCheck color="#70C094" />
                  ) : (
                    <img src={copy} alt="" />
                  )}
                </button>
              </div>
              <div className="copied_line_container">
                <div className="copied_line_group">
                  <span className="copied_line_text">{item?.iban}</span>
                </div>
                <button
                  className="copied_button"
                  onClick={() => handleCopy(item?.iban, item?.iban)}
                >
                  {copied && copied === item?.iban ? (
                    <FaCheck color="#70C094" />
                  ) : (
                    <img src={copy} alt="" />
                  )}
                </button>
              </div>
              <div className="copied_line_container">
                <div className="copied_line_group">
                  <span className="copied_line_text">
                    {item?.holderName}
                  </span>
                </div>
                <button
                  className="copied_button"
                  onClick={() =>
                    handleCopy(item?.holderName, item?.holderName)
                  }
                >
                  {copied && copied === item?.holderName ? (
                    <FaCheck color="#70C094" />
                  ) : (
                    <img src={copy} alt="" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BankInfo;
