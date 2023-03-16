
import "../style/Header.css";
import React, { useState } from "react";


import { useWeb3React } from '@web3-react/core' // 계정 받아오기

import { Connect } from './Connect'; // 연결되어 있는 것에 대한 정보 받아오기


export default function Header(){
    const [search, setSearch] = useState("")

    const handleChange = event => {
        setSearch(event.target.value)
    }

    const { account } = useWeb3React(); // web3 Lib을 통해 계정 저장


    
    const mypageUrl = `/mypage/${account}`;
    const requestLogin = () => {
        alert("메타마스크 연동 및 로그인이 필요합니다.")
    }



    return(
        <div id="navbar">
                <Connect />
        </div>
    )
}