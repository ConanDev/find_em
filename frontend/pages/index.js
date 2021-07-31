import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Input from '../input_range'

export default function Home() {
  return (
    <div className="App">
      <h1>Welcome back, Chief!</h1>
      <p align="left">Please enter the desired maximum range in kilometers. <br/>
      This will be used to select the partners of our company falling in this range,
      and only display the in-range offices of the former.
      </p>
      <Input/>
    </div>
  )
}
