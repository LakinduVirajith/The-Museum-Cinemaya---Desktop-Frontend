import React from 'react'
import Head from 'next/head'
import MainNav from '../components/mainNav'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <MainNav />
      </div>
    </React.Fragment>
  )
}
