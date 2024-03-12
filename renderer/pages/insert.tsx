import React from 'react'
import Head from 'next/head'
import SecondaryNav from '../components/secondaryNav'
import InsertForm from '../forms/insertForm'

export default function InsertPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Insert - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <SecondaryNav />
        <InsertForm />
      </div>
    </React.Fragment>
  )
}
