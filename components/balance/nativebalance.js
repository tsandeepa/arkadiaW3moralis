import Moralis from 'moralis';

const NativeBalance = ({ nativeBalance, address }) => {

  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'uwSpXjZpqdrH75XITXzUfrqSinnb59LdBa2UMK7ZCBOTOU3wWMeGkEGY7iC4oro2' } };
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  );
}

export async function getServerSideProps(context) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = '0xC60303DF3B05309708470aC6e5328d9f8A60041f';

  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
  });

  return {
    props: { address, nativeBalance: nativeBalance.result.balance.ether },
  };
}

export default NativeBalance;