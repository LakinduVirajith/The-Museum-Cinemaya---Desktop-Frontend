import React from 'react'
import Head from 'next/head'
import MainNav from '../components/mainNav'
import Card from '../components/card'

export default function HomePage() {
  const componentsData = [
    { id: 1, name: 'Component 1' }, { id: 2, name: 'Component 2' }, { id: 3, name: 'Component 3' }, { id: 4, name: 'Component 4' },
    { id: 5, name: 'Component 5' }, { id: 6, name: 'Component 6' }, { id: 7, name: 'Component 7' }, { id: 8, name: 'Component 8' },
    { id: 9, name: 'Component 9' }, { id: 10, name: 'Component 10' }, { id: 11, name: 'Component 11' }, { id: 12, name: 'Component 12' },
    { id: 13, name: 'Component 13' }, { id: 14, name: 'Component 14' }, { id: 15, name: 'Component 15' }, { id: 16, name: 'Component 16' },
    { id: 17, name: 'Component 17' }, { id: 18, name: 'Component 18' }, { id: 19, name: 'Component 19' }, { id: 20, name: 'Component 20' },
  ];

  return (
    <React.Fragment>
      <Head>
        <title>Home - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <MainNav />

        {/* FILM DATA */}
        <div className="card-style">
          {componentsData.map(component => (
            <div key={component.id}>
              <Card movie={component}/>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
