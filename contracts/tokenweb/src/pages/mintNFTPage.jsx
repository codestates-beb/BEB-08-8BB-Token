import styled from 'styled-components';
import { Box, TextField, Button, } from "@mui/material";
import { useEffect, useState } from 'react';
import React from 'react';

import NFTArtifact from '../artifacts/Article.json';
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';



export function MintNFTPage() {

    const [signer, setSigner] = useState(); // 서명 
    const { active, library } = useWeb3React(); // 계정 활성화

    useEffect(() => { // 계정의 변화가 있을 경우 signer를 변동시킴
        if (!library) {
            setSigner(undefined);
            return;
        }

        setSigner(library.getSigner());
    }, [library])


    const [title, settitle] = useState('');
    const [description, setDescription] = useState('');

    const [FTContract, setFTContract] = useState();
    const [titleD, setDtitle] = useState('');
    const [FTContractAddr, setFTContractAddr] = useState('');
    const [contentD, setDcontent] = useState('');

    const handleDeployContract = (event) => { // 배포 
        event.preventDefault();

        if (FTContract) {
            return;
        }

        async function deployFTContract(){
            const Deploying = new ethers.ContractFactory(
                NFTArtifact.abi,
                NFTArtifact.bytecode,
                signer
            );

            try {
                const FTContract = await Deploying.deploy(title, description) // 컨트랙트에 들어갈 내용
                await FTContract.deployed(); // 배포
                
                // 여기에 사용자에게 입력 받은 내용 들을 넣어보자 
                console.log("Deploying a NFT with title: ", title);
                console.log("Deploying a NFT with description: ", description);

                const deployedTitle = await FTContract.getArticleTitle(); // 어떤 내용을 확인할 것인가
                const deployedContent = await FTContract.getArticleContent();
                setFTContract(FTContract); // update contract deployed
                setDtitle(deployedTitle);
                setDcontent(deployedContent);
                setFTContractAddr(FTContract.address); // get contact addr deployed
                window.alert(`NFT deployed to : ${FTContract.address}`)

            } catch (error) {
                window.alert('Error: ' + (error && error.message? `${error.message}` : ''))
            }
        }

        deployFTContract();
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        settitle(event.target.value);
    }

    const handleDesciptionChange = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    }

    return(
        <div>
            <CreatePageWrapper>
                <CreateView>
                <Title>Create New Article</Title>

                <Box>

                <FieldTitle>Title</FieldTitle>
                <TextField required fullWidth margin="dense" id="token-name" onChange={handleNameChange}/>

                <FieldTitle>Contents</FieldTitle>
                <TextField required multiline rows={4} fullWidth margin="dense" id="description" onChange = {handleDesciptionChange}/>

                <CreateButtonView>
                <Button variant='contained' fullWidth size="large" onClick={handleDeployContract}>Upload</Button> 
                {/* 위의 최소 조건을 만족시켰을 때 활성화 될 수 있도록 한다. */}
                </CreateButtonView>
                <UriHelper>Contract Address: {FTContractAddr ? FTContractAddr : <>Article not yet deployed</>}</UriHelper>
                <UriHelper>Deployed Article title: {titleD ? titleD : <>Article not yet deployed</>}</UriHelper>
                <UriHelper>Deployed Article contents: {contentD ? contentD : <>Article not yet deployed</>}</UriHelper>
                </Box>
                </CreateView>
            </CreatePageWrapper> 
        </div>
    )
}

const CreatePageWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const CreateView = styled.div`
    width: 100%;
    max-width: 640px;
    padding: 24px;
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 800;
    margin-top: 70px;
`
const FieldTitle = styled.div`
    font-size: 18px;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 4px;
`;

const UriHelper = styled.div`
    font-size: 15px;
    font-weight: 800;
`;

const CreateButtonView=styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
`;