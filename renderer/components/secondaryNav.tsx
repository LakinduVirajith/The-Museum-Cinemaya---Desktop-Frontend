'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SecondaryNav() {
    return (
        <nav className='h-24 w-full px-12 flex justify-between items-center gap-12 bg-nav shadow-lg'>
            {/* LOGO */}
            <section className='cursor-pointer'>
                <Image src="/images/logo.png" width={50} height={50} alt="logo"/>
            </section>

            {/* BUTTONS */}
            <section className='cursor-pointer'>
                <Link href="/home">
                    <button className='flex items-center h-12 w-24 bg-white rounded-lg'>
                        <Image src="/images/left-arrow-icon.png" width={34} height={34} alt="left-arrow-icon" />
                        <h1 className='text-buttonBlack font-medium text-lg'>Home</h1>
                    </button>
                </Link>
            </section>
        </nav>
    )
}
