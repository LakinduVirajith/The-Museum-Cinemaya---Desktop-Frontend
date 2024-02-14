'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MainNav({ onSearch }) {
    const [search, setSearch] = useState('');
    let autoSearchTimer: NodeJS.Timeout;

    /* AUTO SEARCH */
    useEffect(() => {
        if (search.trim() !== '') {
            autoSearchTimer  = setTimeout(() => {
            searchTrigger();
          }, 5000);
        }
    
        return () => clearTimeout(autoSearchTimer );
    }, [search]);

    /* PRESS ENTER */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          clearTimeout(autoSearchTimer);
          searchTrigger();
        }
      };

    /* SEARCH ICON */
    const handleSearchIconClick = () => {
        clearTimeout(autoSearchTimer);
        searchTrigger();
    };

    const searchTrigger = async () => {
        if(search.trim() !== ''){
            onSearch(search);
        }
    }
    
    /* CROSS ICON */
    const cleanSearch = () => {
        setSearch('');
        onSearch('cl');
    }

    return (
        <nav className='flex justify-between items-center h-24 w-full px-12 bg-nav shadow-lg'>
            <div className='flex items-center gap-12'>
                {/* LOGO */}
                <section className='cursor-pointer'>
                    <Link href="/home">
                        <Image src="/images/logo.png" width={50} height={50} alt="logo"/>
                    </Link>
                </section>

                {/* SEARCH BAR */}
                <section className='flex py-2 px-3 h-fit w-fit gap-1.5 bg-white rounded-lg'>
                    <input type="text" className='outline-none w-96 min-w-64' value={search} placeholder='Search' onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                    {search.trim() !== '' && 
                        <Image src="/icons/cross-icon.png" className='cursor-pointer' width={28} height={28} alt="cross-icon" onClick={cleanSearch} />
                    }
                    <Image src="/icons/search-icon.png" className='cursor-pointer' width={28} height={28} alt="search-icon" onClick={handleSearchIconClick} />
                </section>
            </div>

            {/* BUTTONS */}
            <section className='cursor-pointer'>
                <Link href="/insert">
                    <button className='w-24 button-style ring-buttonBlue'>
                        <Image src="/icons/plus-icon.png" width={34} height={34} alt="insert-icon" />
                        <h1 className='text-buttonBlack font-medium text-lg'>Insert</h1>
                    </button>
                </Link>
            </section>
        </nav>
    )
}
