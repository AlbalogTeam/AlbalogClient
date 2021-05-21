import React, { useState } from 'react';
import './DashboardAccount.scss'
import { IoIosArrowForward } from 'react-icons/io';
import {BsPerson} from 'react-icons/bs';


const DashboardAccount = () => {

    const [account, setAccount] = useState({
        name:'직원이름',
        age:'99',
        id:'accountid1'
      });
    
    const {name, age, id} = account;

    
    return (
        <div className="frame">
            <h2>Dashboard</h2>
            <div className="accountBox" >
                <div className="textLine">
                    <span>계정정보</span>
                    <span className="moreBtn">더보기<IoIosArrowForward /></span>
                </div>
                <div className="informBox">
                    <div className="imgBox">
                    <BsPerson />
                    </div>
                    <div className="table">
                        <div className="tr">
                            <p>이름</p>
                            <p>{name}</p>
                        </div>
                        <div className="tr">
                            <p>나이</p>
                            <p>{age}</p>
                        </div>
                        <div className="tr">
                            <p>아이디</p>
                            <p>{id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardAccount;