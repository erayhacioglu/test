import React, { useState } from 'react'
import PageTitle from '../../../components/PageTitle'
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import copyIcon from "../../../assets/img/icons/copy.svg";

const BankInfo = ({companyData,setCompanyData}) => {
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
  return (
    <div className='col-md-6'>
        <PageTitle title="Banka Bilgileri" />
        <div className="section_container">
            {
                        pathname === updatedPage ? "Güncelleme" : (
                                            companyData?.banks?.map((item, idx) => (
                                                <div style={{marginBottom:"30px"}}>
                                                <div className="info_line" key={idx}>
                                                    <div className="info_line_content">
                                                        <span className="info_line_content_text">{item?.bankName}</span>
                                                    </div>
                                                    <button
                                                        className="info_line_copy_button"
                                                        onClick={() => handleCopy(`${idx}0`, item?.bankName)}
                                                    >
                                                        {copied === `${idx}0` ? (
                                                            <FaCheck color="#70C094" />
                                                        ) : (
                                                            <img src={copyIcon} alt="" />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="info_line" key={idx}>
                                                    <div className="info_line_content">
                                                        <span className="info_line_content_text">{item?.iban}</span>
                                                    </div>
                                                    <button
                                                        className="info_line_copy_button"
                                                        onClick={() => handleCopy(`${idx}1`, item?.iban)}
                                                    >
                                                        {copied === `${idx}1` ? (
                                                            <FaCheck color="#70C094" />
                                                        ) : (
                                                            <img src={copyIcon} alt="" />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="info_line" key={idx}>
                                                    <div className="info_line_content">
                                                        <span className="info_line_content_text">{item?.accountHolder}</span>
                                                    </div>
                                                    <button
                                                        className="info_line_copy_button"
                                                        onClick={() => handleCopy(`${idx}2`, item?.accountHolder)}
                                                    >
                                                        {copied === `${idx}2` ? (
                                                            <FaCheck color="#70C094" />
                                                        ) : (
                                                            <img src={copyIcon} alt="" />
                                                        )}
                                                    </button>
                                                </div>
                                                </div>
                                            ))
                                        )
                    }
        </div>
    </div>
  )
}

export default BankInfo