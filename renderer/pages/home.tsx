import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import toast from 'react-hot-toast'
import MainNav from '../components/mainNav'
import Card from '../components/card'
import Loader from '../components/loader'

export default function HomePage() {
  const [films, setFilms] = useState<Films[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  /* PAGINATION PARAMETERS */
  const pageSize = 60;
  const [pageNumber, setPageNumber] = useState(0);

  /* DEFAULT SEARCH ENTITY NAME FOR SEARCH */
  const [entityName, setEntityName] = useState('filmNumber');

  /* LOADING STATES */
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  /* EFFECT TO FETCH DATA BASED ON PAGE NUMBER, SEARCH QUERY, AND HOME LOADING STATE */
  useEffect(() => {
    if(isHomeLoading) {
      fetchData();
    } 
    else {
      fetchSearch();
    }
  }, [pageNumber, searchQuery, isHomeLoading]);

  /* FUNCTION TO FETCH HOME DATA */
  const fetchData = async () => {
    try {
      setIsHomeLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/scroll?page=${pageNumber}&size=${pageSize}`);
      
      if (response.ok) {
        const data = await response.json();
        setFilms(prev => [...prev, ...data.content]);
        
        if(data.last) setIsLastPage(true);
      } else if(response.status === 500){
        toast.error('500: Internal server error occurred. Please try again later.');
      } else{
        const errorText = await response.text();
        toast.error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      toast.error('503: Failed to load data. Please check your internet connection is stable');
    } finally {
      setIsScrollLoading(false);
      setIsPageLoading(false);
    }
  };

  /* EFFERCT TO HANDLE INFINITE SCROLL */
  useEffect(() => {
    if(!isLastPage && !isScrollLoading) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLastPage, isScrollLoading])
  
  /* FUNCTION TO HANDLE SCROLL EVENT */
  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){      
      setIsScrollLoading(true);
      setPageNumber(prev => prev + 1);
    }
  }

  /* FUNCTION TO HANDLE SEARCH */
  const handleSearch = async (query: string, entity: string) => {    
    setSearchQuery(query);
    setEntityName(entity);
    setPageNumber(0);    
    setIsLastPage(false);
    
    if(query === 'x' || query === ''){
      setFilms([]);
      setIsHomeLoading(true);
    }else{
      setIsHomeLoading(false);
    }
  };

  /* FUNCTION TO FERCH SEARCH DATA */
  const fetchSearch = async () => {
    if(pageNumber == 0) {
      setIsPageLoading(true);
      setFilms([]);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/search?entityName=${entityName}&searchValue=${searchQuery}&page=${pageNumber}&size=${pageSize}`);

      if (response.ok) {
        const data = await response.json();
        setFilms(prev => [...prev, ...data.content]);

        if(data.last) setIsLastPage(true);
      } else if(response.status === 500){
        toast.error('500: Internal server error occurred. Please try again later.');
      } else {
        const errorText = await response.text();
        toast.error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      toast.error('503: Failed to search data. Please check your internet connection is stable');
    } finally {
      setIsScrollLoading(false);
      setIsPageLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - The Museum Cinemaya</title>
      </Head>
      <div className="page-style pb-32">
        <MainNav onSearch={handleSearch}/>

        {/* FILM DATA */}
        {isPageLoading ? (
          <Loader />
        ) : (
          films && (
            <div className="card-style">
              {films.map((component, index) => (
                <div key={index}>
                  <Card film={component}/>
                </div>
              ))}
            </div>
          )
        )}

        {isScrollLoading && <span className="loader"></span>}
      </div>
    </React.Fragment>
  )
}
