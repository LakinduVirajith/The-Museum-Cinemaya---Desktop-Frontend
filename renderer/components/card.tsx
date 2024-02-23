import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
    film: Films;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ film }, ref) => {
  return (
    <Link href={`/view/${film.filmNumber}`}>
      <div ref={ref} className="p-2.5 cursor-pointer bg-white rounded-lg">
        <Image src="/images/card-title.jpg" className="rounded-lg" width={1060} height={605} alt="card-title" />
        <h1 className="mt-1">
          <span className='font-semibold text-zinc-800'>Film Number:</span>&nbsp; 
          {film.filmNumber.toString().padStart(5, '0')}
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Reference:</span>&nbsp;  
          <span className='break-words'>{film.reference.length > 25 ? film.reference.substring(0, 25) + '...' : film.reference}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Release Date:</span>&nbsp;  
          <span className='break-words'>{film.releaseDate.length > 25 ? film.releaseDate.substring(0, 25) + '...' : film.releaseDate}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Film Title:</span>&nbsp;  
          <span className='break-words'>{film.filmTitle.length > 25 ? film.filmTitle.substring(0, 25) + '...' : film.filmTitle}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Synopsis:</span>&nbsp;  
          <span className='break-words'>{film.synopsis.length > 25 ? film.synopsis.substring(0, 25) + '...' : film.synopsis}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Production:</span>&nbsp;  
          <span className='break-words'>{film.production.length > 25 ? film.production.substring(0, 25) + '...' : film.production}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Director:</span>&nbsp;  
          <span className='break-words'>{Array.isArray(film.director) ? film.director.join(' | ') : film.director}</span>
        </h1>
        <h1>
          <span className='font-semibold text-zinc-800'>Producer:</span>&nbsp;   
          <span className='break-words'>{Array.isArray(film.producer) ? film.producer.join(' | ') : film.producer}</span>
        </h1>
      </div>
    </Link>
  );
});

export default Card;
