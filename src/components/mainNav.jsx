'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function MainNav() {
    const router = useRouter()

    const insertNavHandle = () => {
        router.push("/insert")
    }

    return (
        <nav className='h-24 w-full flex flex-row items-center gap-12 bg-nav shadow-lg'>
            {/* LOGO */}
            <section className='ml-12 cursor-pointer'>
                <Image src="/logo.png" width={60} height={60} alt={'logo'}/>
            </section>

            {/* SEARCH BAR */}
            <section className='w-full'>
                <div className='flex flex-row w-fit bg-white rounded-lg py-1.5 px-3'>
                    <input type="text" className='outline-none w-96 min-w-64' placeholder='Search'/>
                    <Image src="/search-icon.png" className='cursor-pointer' width={30} height={30} alt={'search'}/>
                </div>
            </section>

            {/* BUTTONS */}
            <section className='mr-12'> 
                <button className='flex flex-row w-full items-center gap-2.5 bg-white rounded-lg p-2.5 pr-10' onClick={insertNavHandle}>
                    <Image src="/plus-icon.png" width={22} height={22} alt={'insert'} />
                    <h1 className='text-buttonBlue font-bold text-xl'>Insert</h1>
                </button>
            </section>
        </nav>
    )
}
