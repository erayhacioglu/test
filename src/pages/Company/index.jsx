import { useDispatch, useSelector } from "react-redux";
import "./company.scss"
import BankInfo from "./components/BankInfo";
import CompanyInfo from "./components/CompanyInfo";
import { useLocation } from "react-router";
import { useState } from "react";

const Company = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];
    const {updatedPage} = useSelector(state => state?.updateData);

    const [companyData,setCompanyData] = useState({
        companies:[
            {
                companyName:"Kavio",
                taxNumber:"2353465346346535",
                taxOffice:"İstanbul",
                address:"7654 sk. Baran Cad. Kartal İstanbul"
            }
        ],
        banks:[
            {
                bankName:"Ziraat Bankası",
                iban:"TR00 7546 8473 0000 7473 1234",
                accountHolder:"Eray Hacıoğlu"
            },
            {
                bankName:"Is Bankası",
                iban:"TR00 7546 8473 0000 7473 1234",
                accountHolder:"Eray Hacıoğlu"
            }
        ]
    });

    return(
        <div className="page_container">
            <div className="row">
            <CompanyInfo companyData={companyData} setCompanyData={setCompanyData}/>
            <BankInfo companyData={companyData} setCompanyData={setCompanyData}/>
            </div>
            {
                            pathname === updatedPage && 
                        <div className="section_container">
                            <div className="d-flex align-items-center justify-content-end"><button className="user_action_submit_button cancel mobile" onClick={() => dispatch(setUpdatedPage(""))}>İptal</button><button className="user_action_submit_button mobile ms-3">Kaydet</button></div>
                        </div>
                        }
        </div>
    );
}

export default Company;