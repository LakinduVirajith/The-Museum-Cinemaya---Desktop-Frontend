import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import toast from 'react-hot-toast'
import SecondaryNav from '../../components/secondaryNav'
import Loader from '../../components/loader'
import { useRouter } from 'next/router';

export default function ViewPage() {
    const router = useRouter();
    const { id } = router.query;

    const sampleData: SingleFilm = { 
      filmNumber: '12345',
      referance: 'REF123',
      releaseDate: '2023-05-15',
      filmTitle: 'The Great Adventure',
      synopsis: 'A thrilling adventure of a group of explorers in search of a lost treasure.',
      production: 'Adventure Studios',
      director: 'John Smith',
      producer: 'Jane Doe',
      cast: 'Tom Cruise, Emily Blunt, Samuel L. Jackson',
      script: 'Mark Johnson',
      camera: 'Michael Johnson',
      editor: 'Sarah Johnson',
      music: 'David Williams',
      story: 'Adventure, Drama',
      dialogue: 'English',
      assistantDirector: 'Alex Brown',
      lyrics: 'Jane Smith',
      songs: 'The Great Adventure Theme Song',
      makeUp: 'Anna Johnson',
      artDirector: 'Robert Smith',
      audioController: 'Chris Evans',
      title: 'The Great Adventure',
      theaters: 'CinemaPlex, AMC Theaters',
      awardPresidential: 'Best Adventure Film Award 2023',
      awardsSarasaviya: 'Best Film Editing Award 2023',
      awardsOcic: 'Best Visual Effects Award 2023',
      awardOthers: 'Best Soundtrack Award 2023',
      festivals: 'Cannes Film Festival, Toronto International Film Festival',
      article: 'The Making of The Great Adventure',
      critics: 'Highly acclaimed by critics worldwide',
      others: 'Box office hit, loved by audiences of all ages'
    };

    const [film, setFilm] = useState(sampleData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:8000/film/${id}`);
  
          if (response.ok) {
            const data = await response.json();
            setFilm(data);
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
        <title>View - The Museum Cinemaya</title>
      </Head>
      <div className="page-style">
        <SecondaryNav />

        {/* FILM DATA */}
        {isLoading ? (
          <Loader />
        ) : (
          film && (
            <div className='form-wapper pb-12'>
              <h1 className='view-style'>Film Number:&nbsp;&nbsp; 
                <span className='span-style'>{film.filmNumber}</span></h1>
              <h1 className='view-style'>Referance:&nbsp;&nbsp; 
                <span className='span-style'>{film.referance}</span></h1>
              <h1 className='view-style'>Release Date:&nbsp;&nbsp; 
                <span className='span-style'>{film.releaseDate}</span></h1>
              <h1 className='view-style'>Film Title:&nbsp;&nbsp; 
                <span className='span-style'>{film.filmTitle}</span></h1>
              <h1 className='view-style'>Synopsis:&nbsp;&nbsp; 
                <span className='span-style'>{film.synopsis}</span></h1>
              <h1 className='view-style'>Production:&nbsp;&nbsp; 
                <span className='span-style'>{film.production}</span></h1>
              <h1 className='view-style'>Director:&nbsp;&nbsp; 
                <span className='span-style'>{film.director}</span></h1>
              <h1 className='view-style'>Producer:&nbsp;&nbsp; 
                <span className='span-style'>{film.producer}</span></h1>
              <h1 className='view-style'>Cast:&nbsp;&nbsp; 
                <span className='span-style'>{film.cast}</span></h1>
              <h1 className='view-style'>Script:&nbsp;&nbsp; 
                <span className='span-style'>{film.script}</span></h1>
              <h1 className='view-style'>Camera:&nbsp;&nbsp; 
                <span className='span-style'>{film.camera}</span></h1>
              <h1 className='view-style'>Editor:&nbsp;&nbsp; 
                <span className='span-style'>{film.editor}</span></h1>
              <h1 className='view-style'>Music:&nbsp;&nbsp; 
                <span className='span-style'>{film.music}</span></h1>
              <h1 className='view-style'>Story:&nbsp;&nbsp; 
                <span className='span-style'>{film.story}</span></h1>
              <h1 className='view-style'>Dialogue:&nbsp;&nbsp; 
                <span className='span-style'>{film.dialogue}</span></h1>
              <h1 className='view-style'>Assistant Director:&nbsp;&nbsp; 
                <span className='span-style'>{film.assistantDirector}</span></h1>
              <h1 className='view-style'>Lyrics:&nbsp;&nbsp; 
                <span className='span-style'>{film.lyrics}</span></h1>
              <h1 className='view-style'>Songs:&nbsp;&nbsp; 
                <span className='span-style'>{film.songs}</span></h1>
              <h1 className='view-style'>Meke Up:&nbsp;&nbsp; 
                <span className='span-style'>{film.makeUp}</span></h1>
              <h1 className='view-style'>Art Director:&nbsp;&nbsp; 
                <span className='span-style'>{film.artDirector}</span></h1>
              <h1 className='view-style'>Audio Controller:&nbsp;&nbsp; 
                <span className='span-style'>{film.audioController}</span></h1>
              <h1 className='view-style'>Title:&nbsp;&nbsp; 
                <span className='span-style'>{film.title}</span></h1>
              <h1 className='view-style'>Theaters:&nbsp;&nbsp; 
                <span className='span-style'>{film.theaters}</span></h1>
              <h1 className='view-style'>Award Presidential:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardPresidential}</span></h1>
              <h1 className='view-style'>Awards Sarasaviya:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsSarasaviya}</span></h1>
              <h1 className='view-style'>Awards Ocic:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsOcic}</span></h1>
              <h1 className='view-style'>Award Others:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardOthers}</span></h1>
              <h1 className='view-style'>Festivals:&nbsp;&nbsp; 
                <span className='span-style'>{film.festivals}</span></h1>
              <h1 className='view-style'>Article:&nbsp;&nbsp; 
                <span className='span-style'>{film.article}</span></h1>
              <h1 className='view-style'>Critics:&nbsp;&nbsp; 
                <span className='span-style'>{film.critics}</span></h1>
              <h1 className='view-style'>Others:&nbsp;&nbsp; 
                <span className='span-style'>{film.others}</span></h1>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  )
}