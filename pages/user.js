import { getSession, signOut } from 'next-auth/react';
import Moralis from 'moralis';
import Native from './native';
import logo from "../public/default.png";
import { EvmChain } from '@moralisweb3/evm-utils';
// gets a prop from getServerSideProps
import axios from 'axios';
import { useEffect, useState } from 'react';



function User({
  user,
  nativeBalance,
  nftResponse,
  nftCollectionResponse,
  metaDataResponse,
  walletNftsResponse,
  address
}) {

  // console.log(address);
  // console.log(nftResponse);
  // console.log(nftCollectionResponse);
  // console.log(metaDataResponse);
  console.log(walletNftsResponse);







  return (
    <div className='user'>
      <button className='btn-sign-out' onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
      <h2>Your Wallet</h2>
      <div className='wallet-ico'>
        <img src="./digital-wallet.png" alt="" />
      </div>
      <h4>Address</h4>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <h3>{user.address}</h3>
      <div className='coins'>
        <div className='coin-type'>
          <div className='coin-view'>
            <img src="./ethereum.png" alt="" />
            <label htmlFor="">Ethereum</label>
          </div>
          <p> {nativeBalance}</p>
        </div>

      </div>
      <br></br>
      <div className='user-nft'>
        <h4>NFTs</h4>
      </div>





    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  //get balance

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const address = session.user.address;

  //eth collection
  // const address = '0xC60303DF3B05309708470aC6e5328d9f8A60041f';

  //poly collection
  // const address = '0x06ba631541b8ff2a6e8208b5c0d5f4c47ba2567e'

  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
  });

  // NFT owned by address 
  // const chain = EvmChain.ETHEREUM;
  const chain = EvmChain.POLYGON;

  //wallet NFTS
  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  // Collection NFTS
  const collectionResponse = await Moralis.EvmApi.nft.getContractNFTs({
    address,
    chain,
  });
  const tokenId = 10;
  const metaDataResponse = await Moralis.EvmApi.nft.getNFTMetadata({
    address,
    chain,
    tokenId,
  });

  //Get NFTs by wallet
  const walletNftsResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });

  // console.log(response);

  return {
    props: {
      user: session.user,
      nativeBalance: nativeBalance.result.balance.ether,
      nftResponse: JSON.parse(JSON.stringify(response)),
      nftCollectionResponse: JSON.parse(JSON.stringify(collectionResponse)),
      metaDataResponse: JSON.parse(JSON.stringify(metaDataResponse)),
      walletNftsResponse: JSON.parse(JSON.stringify(walletNftsResponse)),
      address,
    },
  };
}

export default User;