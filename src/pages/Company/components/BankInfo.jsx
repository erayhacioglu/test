import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import copy from "../../../assets/img/icons/copy.svg";
import { FaCheck } from "react-icons/fa6";
import { setBankInfo } from "../../../redux/slices/CompanySlice";
import plus from "../../../assets/img/icons/plus.svg";
import trash from "../../../assets/img/icons/trash.svg";

const BankInfo = ({ isUpdated }) => {
  const dispatch = useDispatch();
  const { bankInfo } = useSelector((state) => state.company);
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
    dispatch(setBankInfo(bankInfo?.filter((_, i) => i !== index)));
  };

  const handleAddItem = () => {
    dispatch(
      setBankInfo([
        ...bankInfo,
        {
          bankName: "",
          iban: "",
          accountHolder: "",
        },
      ])
    );
  };

  return (
    <>
      <PageTitle title={t("companyPage.bankInfo.pageTitle")} />
      <div className="section_container">
        {isUpdated ? (
          <>
            {bankInfo &&
              bankInfo?.length > 0 &&
              bankInfo?.map((item, idx) => (
                <>
                  <div className="item_margin_bottom" key={idx}>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.bankName")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.bankName}
                      />
                    </div>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.iban")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.iban}
                      />
                    </div>
                    <div className="form_group">
                      <label className="form_label wide">{t("companyPage.bankInfo.accountHolder")}</label>
                      <input
                        type="text"
                        className="form_input"
                        value={item?.accountHolder}
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
          bankInfo &&
          bankInfo?.length > 0 &&
          bankInfo?.map((item, idx) => (
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
                    {item?.accountHolder}
                  </span>
                </div>
                <button
                  className="copied_button"
                  onClick={() =>
                    handleCopy(item?.accountHolder, item?.accountHolder)
                  }
                >
                  {copied && copied === item?.accountHolder ? (
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
