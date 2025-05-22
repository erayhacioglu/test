import React, { useState } from 'react'
import PageTitle from '../../../components/PageTitle'
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import copyIcon from "../../../assets/img/icons/copy.svg";
import { FaCheck } from 'react-icons/fa';

const CompanyInfo = ({companyData,setCompanyData}) => {
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
    <div className="col-md-6">
        <PageTitle title="Şirket Bilgileri"/>
        <div className="section_container">

        
        {
            pathname === updatedPage ? "Güncelleme" : (
                                companyData?.companies?.map((item, idx) => (
                                    <>
                                    <div className="info_line" key={idx}>
                                        <div className="info_line_content">
                                            <span className="info_line_content_text">{item?.companyName}</span>
                                        </div>
                                        <button
                                            className="info_line_copy_button"
                                            onClick={() => handleCopy(`${idx}0`, item?.companyName)}
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
                                            <span className="info_line_content_text">{item?.taxNumber}</span>
                                        </div>
                                        <button
                                            className="info_line_copy_button"
                                            onClick={() => handleCopy(`${idx}1`, item?.taxNumber)}
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
                                            <span className="info_line_content_text">{item?.taxOffice}</span>
                                        </div>
                                        <button
                                            className="info_line_copy_button"
                                            onClick={() => handleCopy(`${idx}2`, item?.taxOffice)}
                                        >
                                            {copied === `${idx}2` ? (
                                                <FaCheck color="#70C094" />
                                            ) : (
                                                <img src={copyIcon} alt="" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="info_line" key={idx}>
                                        <div className="info_line_content">
                                            <span className="info_line_content_text">{item?.address}</span>
                                        </div>
                                        <button
                                            className="info_line_copy_button"
                                            onClick={() => handleCopy(`${idx}3`, item?.address)}
                                        >
                                            {copied === `${idx}3` ? (
                                                <FaCheck color="#70C094" />
                                            ) : (
                                                <img src={copyIcon} alt="" />
                                            )}
                                        </button>
                                    </div>
                                    </>
                                ))
                            )
        }
        </div>
    </div>
  )
}

export default CompanyInfo