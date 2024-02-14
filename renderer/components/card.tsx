import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
    film: Film;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ film }, ref) => {
  return (
    <Link href={`/view/${film.id}`}>
      <div ref={ref} className="p-2.5 cursor-pointer bg-white rounded-lg">
        <Image src="/images/card-title.jpg" className="rounded-lg" width={1060} height={605} alt="card-title" />
        <h1 className="mt-1">Film Number: {film.filmNumber}</h1>
        <h1>Film Title: {film.filmTitle}</h1>
        <h1>Release Date: {film.releaseDate}</h1>
        <h1>Synopsis: {film.synopsis}</h1>
        <h1>Production: {film.production}</h1>
        <h1>Director: {film.director}</h1>
        <h1>Producer: {film.producer}</h1>
        <h1>Reference: {film.reference}</h1>
      </div>
    </Link>
  );
});

export default Card;
