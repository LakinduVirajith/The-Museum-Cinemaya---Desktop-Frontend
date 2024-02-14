import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import toast from 'react-hot-toast'
import MainNav from '../components/mainNav'
import Card from '../components/card'
import Loader from '../components/loader'

export default function HomePage() {
  const sampleData: Film[] = [
    { id: 1, filmNumber: '001', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 2, filmNumber: '002', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 3, filmNumber: '003', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 4, filmNumber: '004', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 5, filmNumber: '005', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 6, filmNumber: '006', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 7, filmNumber: '007', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 8, filmNumber: '008', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 9, filmNumber: '009', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 10, filmNumber: '010', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 11, filmNumber: '011', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 12, filmNumber: '012', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 13, filmNumber: '013', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 14, filmNumber: '014', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 15, filmNumber: '015', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 16, filmNumber: '016', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 17, filmNumber: '017', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 18, filmNumber: '018', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 19, filmNumber: '019', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
    { id: 20, filmNumber: '020', filmTitle: 'No Title', releaseDate: '2024.02.06', synopsis: 'English', production: 'Sample', director: 'Sample', producer: 'Sample', reference: '0000/00'},
  ];

  const [films, setFilms] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/films');

        if (response.ok) {
          const data = await response.json();
          setFilms(data);
        } else {
          const errorText = await response.text();
          toast.error(`${response.status}: ${errorText}`);
        }
      } catch (error) {
        toast.error('404: failed to load data. please check your internet connection');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <React.Fragment>
      <Head>
        <title>Home - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <MainNav />

        {/* FILM DATA */}
        {isLoading ? (
          <Loader />
        ) : (
          films && (
            <div className="card-style">
              {films.map(component => (
                <div key={component.id}>
                  <Card film={component}/>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </React.Fragment>
  )
}
