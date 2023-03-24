import React from "react";
import { useNavigate } from "react-router-dom";
import MintForm from "../components/forms/mintForm";
// import useMintContract from "../hooks/useMintContract";
// import useWeb3 from "../hooks/useWeb3";
import { uploadFile } from "../utils/imageStorage";
import Box from "@mui/material/Box";

export default function NFTSale() {
  // const { account } = useWeb3();
  const navigate = useNavigate();
  // const { onMintToken } = useMintContract();

  const handleSubmit = async (formData: any) => {
    const imageUri = await uploadFile(formData.image);
    const metaData = {
      name: formData.name,
      description: formData.description,
      image: imageUri,
    };
    const tokenUri = await uploadFile(metaData);
    // const tokenId = await onMintToken(account, tokenUri);

    // if (tokenId) {
    //   alert(`NFT-#${0}가 발행되었습니다.`);
    //   navigate("/");
    // }
  };

  return (
    <Box>
      <MintForm onSubmit={handleSubmit} />
    </Box>
  );
}
