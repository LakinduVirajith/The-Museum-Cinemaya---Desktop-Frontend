import React from 'react'
import Head from 'next/head'
import SecondaryNav from '../../components/secondaryNav'
import { useRouter } from 'next/router';

export default function ViewPage() {
    const router = useRouter();
    const { id } = router.query;

  return (
    <React.Fragment>
      <Head>
        <title>View - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <SecondaryNav />

        {/* FILM DATA */}
        <div className='py-12'>
            <h1 className='text-white'>View Page for Movie ID: {id}</h1>
        </div>
      </div>
    </React.Fragment>
  )
}