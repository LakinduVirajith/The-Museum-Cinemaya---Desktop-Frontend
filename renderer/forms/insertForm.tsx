'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface FormFields {
  [key: string]: string;
}

function useFormFields(initialState: FormFields) {
  const [fields, setFields] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const resetFields = () => {
    setFields(initialState);
  };

  return { fields, handleChange, resetFields };
}

function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  }).replace(/([A-Z])/g, ' $1').trim();
}

export default function InsertForm() {

  const initialState = {
    filmNumber: '',
    referance: '',
    releaseDate: '',
    filmTitle: '',
    synopsis: '',
    production: '',
    director: '',
    producer: '',
    cast: '',
    script: '',
    camera: '',
    editor: '',
    music: '',
    story: '',
    dialogue: '',
    assistantDirector: '',
    lyrics: '',
    songs: '',
    mekeUp: '',
    artDirector: '',
    audioController: '',
    title: '',
    theaters: '',
    awardPresidential: '',
    awardsSarasaviya: '',
    awardsOcic: '',
    awardOthers: '',
    festivals: '',
    article: '',
    critics: '',
    others: ''
  };

  const { fields, handleChange, resetFields } = useFormFields(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => {
    setIsLocked(!isLocked);
    const message = isLocked ? 'Film data successfully unlocked' : 'Film data successfully locked';
    const icon = isLocked ? '🟧' : '🟥';
    toast(message, { icon });
  };

  const handleSubmit = async (e) => {    
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/film', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        toast.success('record added successfully');
        resetFields();
      } else {
        const errorText = await res.text();
        toast.error(`${res.status}: ${errorText}`);
      }
    } catch (error) {
      toast.error('404: failed to store data. please ensure your connection is stable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-wapper'>
        {Object.entries(fields).map(([name, value]) => (
          <section key={name} className="flex justify-between items-center">
            <label className="label-style">{capitalizeEachWord(name)}</label>&nbsp;&nbsp;
            <input
              type="text"
              className="input-style"
              name={name}
              value={value}
              onChange={handleChange}
            />
          </section>
        ))}
      </div>

      <div className='button-wapper'>
        <button className={`button-style ${isLocked ? 'ring-orange' : 'ring-red'}`} onClick={toggleLock} type="button">
          <Image src={`/icons/${isLocked ? 'unlock' : 'lock'}-icon.png`} width={24} height={24} alt="lock-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">{`Set as ${isLocked ? 'Unlock' : 'Lock'}`}</h1>
        </button>
          
        <button className="button-style ring-black" onClick={resetFields} type="button">
          <Image src="/icons/clear-icon.png" width={22} height={22} alt="clear-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">Clean Form</h1>
        </button>
        <button className="button-style ring-green" type="submit" disabled={isLoading}>
          <Image src="/icons/upload-icon.png" width={22} height={22} alt="upload-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">Save Data</h1>
        </button>
      </div>
    </form>
  )
}
