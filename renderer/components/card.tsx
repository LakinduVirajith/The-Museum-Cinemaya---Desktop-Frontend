'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Card({ movie }) {
    return (
        <Link href={`/view/${movie.id}`}>
            <section className='p-2.5 cursor-pointer bg-white rounded-lg'>
                <Image src="/images/card-title.jpg" className='rounded-lg' width={1060} height={605} alt="card-title"/>
                <h1 className='mt-1'>Film Number: 000{movie.id}</h1>
                <h1>Film Title: No Title</h1>
                <h1>Release Date: 2024.02.06</h1>
                <h1>Synopsis: English</h1>
                <h1>Production: Sample</h1>
                <h1>Director: Sample</h1>
                <h1>Producer: Sample</h1>
                <h1>Reference: 0000/00</h1>
            </section>
        </Link>
    )
}

