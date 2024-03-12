import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import toast from 'react-hot-toast'
import SecondaryNav from '../../components/secondaryNav'
import Loader from '../../components/loader'
import { useRouter } from 'next/router';

export default function ViewPage() {
    const router = useRouter();
    const { id } = router.query;

    const [film, setFilm] = useState<Film>();

    // LOADING AND LOCK STATES */
    const [isLoading, setIsLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    /* FUNCTION TO TOGGLE LOCK STATUS */
    const toggleLock = async () => {
      const action = isLocked ? 'unlocked' : 'locked';
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/set/${action}/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          setIsLocked(!isLocked);
          const message = `Film data successfully ${isLocked ? 'unlocked' : 'locked'}`;
          const icon = isLocked ? '🟧' : '🟥';
          toast(message, { icon });
        } else if(response.status === 500){
          toast.error('500: Internal server error occurred. Please try again later.');
        } else {
          const errorText = await response.text();
          toast.error(`${response.status}: ${errorText}`);
        }
      } catch (error) {
        toast.error('503: An unexpected error occurred. please ensure your connection is stable.');
      }
    };

    /* EFFECT TO FETCH FILM DATA ON COMPONENT MOUNT */
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/${id}`);
  
          if (response.ok) {
            const data = await response.json();            
            setFilm(data);
            setIsLocked(data.isLocked);
          } else if(response.status === 500){
            toast.error('500: Internal server error occurred. Please try again later.');
          } else {
            const errorText = await response.text();
            toast.error(`${response.status}: ${errorText}`);
          }
        } catch (error) {
          toast.error('503: An unexpected error occurred. Please check your internet connection is stable');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const deleteHandler = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const successText = await response.text();
          toast.success(`${response.status}: ${successText}`);
        } else if(response.status === 500){
          toast.error('500: Internal server error occurred. Please try again later.');
        } else {
          const errorText = await response.text();
          toast.error(`${response.status}: ${errorText}`);
        }
      } catch (error) {
        toast.error('503: An unexpected error occurred. Please check your internet connection is stable');
      } finally {
        router.push("/home");
      }
    }

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
            <div className='form-wapper pb-4'>
              <h1 className='view-style'>Film Number:&nbsp;&nbsp; 
                <span className='span-style'>{film.filmNumber}</span></h1>
              <h1 className='view-style'>Referance:&nbsp;&nbsp; 
                <span className='span-style'>{film.reference}</span></h1>
              <h1 className='view-style'>Release Date:&nbsp;&nbsp; 
                <span className='span-style'>{film.releaseDate}</span></h1>
              <h1 className='view-style'>Film Title:&nbsp;&nbsp; 
                <span className='span-style'>{film.filmTitle}</span></h1>
              <h1 className='view-style'>Synopsis:&nbsp;&nbsp; 
                <span className='span-style'>{film.synopsis}</span></h1>
              <h1 className='view-style'>Production:&nbsp;&nbsp; 
                <span className='span-style'>{film.production}</span></h1>
              <h1 className='view-style'>Director:&nbsp;&nbsp; 
                <span className='span-style'>{Array.isArray(film.director) ? film.director.join(', ') : film.director}</span></h1>
              <h1 className='view-style'>Producer:&nbsp;&nbsp; 
                <span className='span-style'>{Array.isArray(film.producer) ? film.producer.join(', ') : film.producer}</span></h1>
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
              <h1 className='view-style'>Mekeup:&nbsp;&nbsp; 
                <span className='span-style'>{film.makeup}</span></h1>
              <h1 className='view-style'>Art Director:&nbsp;&nbsp; 
                <span className='span-style'>{film.artDirector}</span></h1>
              <h1 className='view-style'>Audio Controller:&nbsp;&nbsp; 
                <span className='span-style'>{film.audioController}</span></h1>
              <h1 className='view-style'>Title:&nbsp;&nbsp; 
                <span className='span-style'>{film.title}</span></h1>
              <h1 className='view-style'>Theaters:&nbsp;&nbsp; 
                <span className='span-style'>{film.theaters}</span></h1>
              <h1 className='view-style'>Award Presidential:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsPresidential}</span></h1>
              <h1 className='view-style'>Awards Sarasaviya:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsSarasaviya}</span></h1>
              <h1 className='view-style'>Awards Ocic:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsOcic}</span></h1>
              <h1 className='view-style'>Award Others:&nbsp;&nbsp; 
                <span className='span-style'>{film.awardsOthers}</span></h1>
              <h1 className='view-style'>Festivals:&nbsp;&nbsp; 
                <span className='span-style'>{film.festivals}</span></h1>
              <h1 className='view-style'>Article:&nbsp;&nbsp; 
                <span className='span-style'>{film.article}</span></h1>
              <h1 className='view-style'>Critics:&nbsp;&nbsp; 
                <span className='span-style'>{film.critics}</span></h1>
              <h1 className='view-style'>Others:&nbsp;&nbsp; 
                <span className='span-style'>{film.others}</span></h1>
              <h1 className='view-style'>Special:&nbsp;&nbsp; 
                <span className='span-style'>{film.special}</span></h1>
              <h1 className='view-style'>Poster:&nbsp;&nbsp; 
                <span className='span-style'>{film.poster}</span></h1>
              <h1 className='view-style'>Image:&nbsp;&nbsp; 
                <span className='span-style'>{film.image}</span></h1>
              <h1 className='view-style'>Acknowledgement:&nbsp;&nbsp; 
                <span className='span-style'>{film.acknowledgement}</span></h1>
              <h1 className='view-style'>Pay Off Line:&nbsp;&nbsp; 
                <span className='span-style'>{film.payOffLine}</span></h1>
              <h1 className='view-style'>Last Up-Date:&nbsp;&nbsp; 
                <span className='span-style'>{film.lastUpDate}</span></h1>
            </div>
          )
        )}

        {(!isLoading && film) && (
          <div className='button-wapper'>
            <button className={`button-style ${isLocked ? 'ring-orange' : 'ring-red'}`} onClick={toggleLock} type="button">
              <Image src={`/icons/${isLocked ? 'unlock' : 'lock'}-icon.png`} width={24} height={24} alt="lock-icon" />
              <h1 className="text-buttonBlack font-medium text-lg">{`set as ${isLocked ? 'unlock' : 'lock'}`}</h1>
            </button>

            <button className="button-style ring-black" onClick={deleteHandler} type="button">
              <Image src="/icons/bin-icon.png" width={20} height={20} alt="clear-icon" />
              <h1 className="text-buttonBlack font-medium text-lg">delete data</h1>
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}