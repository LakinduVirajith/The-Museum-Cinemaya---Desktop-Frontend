'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MainNav() {
    return (
        <nav className='h-24 w-full px-12 flex justify-between items-center gap-12 bg-nav shadow-lg'>
            {/* LOGO */}
            <section className='cursor-pointer'>
                <Image src="/images/logo.png" width={60} height={75} alt="logo"/>
            </section>

            {/* SEARCH BAR */}
            <section className='w-full'>
                <div className='flex py-1.5 px-3 w-fit bg-white rounded-lg'>
                    <input type="text" className='outline-none w-96 min-w-64' placeholder='Search'/>
                    <Image src="/images/search-icon.png" className='cursor-pointer' width={28} height={28} alt="search-icon"/>
                </div>
            </section>

            {/* BUTTONS */}
            <section className='cursor-pointer'>
                <Link href="/insert">
                    <button className='flex items-center w-24 p-2.5 gap-2.5 bg-white rounded-lg'>
                        <Image src="/images/plus-icon.png" width={18} height={18} alt="insert-icon" />
                        <h1 className='text-buttonBlue font-medium text-lg'>Insert</h1>
                    </button>
                </Link>
            </section>
        </nav>
    )
}
