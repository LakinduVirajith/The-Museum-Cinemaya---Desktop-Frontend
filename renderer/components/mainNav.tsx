'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MainNav({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedTag, setSelectedTag] = useState('filmNumber');
    let autoSearchTimer: NodeJS.Timeout;

    /* EFFECT TO TRIGGER AUTO SEARCH AFTER 5 SECONDS OF INACTIVITY */
    useEffect(() => {
        if (searchValue.trim() !== '') {
            autoSearchTimer  = setTimeout(() => {
            searchTrigger();
          }, 5000);
        }
    
        return () => clearTimeout(autoSearchTimer );
    }, [searchValue]);

    /* HANDLEE FOR PRESSING ENTER KEY IN SEARCH INPUT */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          clearTimeout(autoSearchTimer);
          searchTrigger();
        }
      };

    /* HANDLER FOR CLICKING THE SERCH ICON */
    const handleSearchIconClick = () => {
        clearTimeout(autoSearchTimer);
        searchTrigger();
    };

    /* HANDLER FOR CLICKING THE CROSS ICON TO CLEAR SEARCH */
    const cleanSearch = () => {
        setSearchValue('');
        onSearch('x', 'x');
    }

    /* HANDLER FUNCTION TO UPDATE SELECTED VALUE */
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedTag(event.target.value);
    };

    /* FUNCTION TO TRIGGER SEARCH */
    const searchTrigger = async () => {
        onSearch(searchValue, selectedTag);
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
                <section className='flex py-2 px-3 h-fit w-fit items-center gap-1.5 bg-white rounded-lg'>
                    <input type="text" className='outline-none w-72 min-w-64' value={searchValue} placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>

                    <select name="tag" id="tag" className='select-style' value={selectedTag} onChange={handleChange}>
                        <option className='option-style' value="filmNumber">Film Number</option>
                        <option className='option-style' value="reference">Reference</option>
                        <option className='option-style' value="releaseDate">Release Date</option>
                        <option className='option-style' value="filmTitle">Film Title</option>
                        <option className='option-style' value="synopsis">Synopsis</option>
                        <option className='option-style' value="production">Production</option>
                        <option className='option-style' value="director">Director</option>
                        <option className='option-style' value="producer">Producer</option>
                    </select>
                    <hr className='h-7 w-0.5 mr-1 ml-2 bg-gray-800'/>

                    {searchValue.trim() !== '' && 
                        <Image src="/icons/cross-icon.png" className='cursor-pointer' width={32} height={32} alt="cross-icon" onClick={cleanSearch} />
                    }
                    <Image src="/icons/search-icon.png" className='cursor-pointer' width={32} height={32} alt="search-icon" onClick={handleSearchIconClick} />
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
