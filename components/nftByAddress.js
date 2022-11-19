import { useEffect, useState } from 'react';
import Moralis from 'moralis';
import logo from "../public/default.png";
import { EvmChain } from '@moralisweb3/evm-utils';
import { Col, Container, Row } from 'react-bootstrap';


const NftByAddress = () => {

  const [nftcollection, setNftcollection] = useState(null);
  const [pageLimit, setPageLimit] = useState(12);

  useEffect(() => {
    const fetchNftData = async () => {
      // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
      await Moralis.start({
        apiKey: 'uwSpXjZpqdrH75XITXzUfrqSinnb59LdBa2UMK7ZCBOTOU3wWMeGkEGY7iC4oro2',
        // ...and any other configuration
      });
      //poly collection
      const address = '0x06ba631541b8ff2a6e8208b5c0d5f4c47ba2567e'

      const chain = EvmChain.POLYGON;


      // Collection NFTS
      const collectionResponse = await Moralis.EvmApi.nft.getContractNFTs({
        address,
        chain,
        normalizedMetadata: true,
        limit: pageLimit
      });

      console.log(collectionResponse);
      setNftcollection(collectionResponse.data.result)
      console.log(collectionResponse.data.result);
      // collectionResponse.data.result.map((item) => {

      //   const response =  Moralis.EvmApi.nft.getNFTMetadata({
      //     address,
      //     chain,
      //     tokenId,
      // });
      // })

    }

    fetchNftData()
  }, [pageLimit]);

  const hanldeLoadMore = () => {
    setPageLimit(pageLimit + 12)
  }

  function getImgUrl(metadata) {
    if (!metadata) return logo;
    // console.log(JSON.parse(metadata));
    let meta = JSON.parse(metadata);
    if (!meta.image) return logo;

    if (!meta?.image.includes("ipfs://")) {
      return meta?.image;
    } else {
      return "https://ipfs.io/ipfs/" + meta?.image.substring(7);
    }
  }


  return (
    <div className="nfts">
      <Container>
        <Row>
          <Col>
            <div className='nft-sub-eading'>
              <h2>Arkadia Ogs</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolorum repellat perspiciatis corporis veritatis odit reprehenderit assumenda consequuntur minus facere.</p>
            </div>
          </Col>
        </Row>

      </Container>



      <div>
        <div className='nft-list'>
          <Container>
            <Row>

              {
                nftcollection &&
                nftcollection.map((item, i) => (
                  <Col xs="2" key={i}>
                    <div className='nft-item'>
                      <img className='nft-img'
                        loading="lazy"

                        src={getImgUrl(item.metadata)}
                        alt={`${i}image`}
                        style={{ borderRadius: "5px", marginTop: "10px" }}
                      />
                      <label htmlFor="">{item.name}#{item.token_id}</label>
                    </div>
                  </Col>
                ))
              }
            </Row>

            <Row>
              <Col>
                <div className='load-more'>
                  <button onClick={() => hanldeLoadMore()}>Load More</button>
                </div>
              </Col>
            </Row>
          </Container>


        </div>

      </div>
    </div>
  );
}

export default NftByAddress;