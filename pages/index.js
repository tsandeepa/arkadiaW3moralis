import Head from 'next/head'
import Image from 'next/image'
import NftByAddress from '../components/nftByAddress'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <NftByAddress />
    </div>
  )
}
