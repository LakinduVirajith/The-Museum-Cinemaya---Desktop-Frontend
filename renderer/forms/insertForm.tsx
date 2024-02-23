'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

/* DEFINE THE INTERFACE FOR FORM FIELDS */
interface FormFields {
  [key: string]: string |string[];
}

/* CUSTOM HOOK TO MANAGE FORM FIELDS */
function useFormFields(initialState: FormFields) {
  const [fields, setFields] = useState(initialState);

  /* HANDLE CHANGE IN FORM FIELDS */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  /* HANDLE CHANGE IN ARRAY FORM FIELDS */
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value } = e.target;
    const separator = ',';
    const values = value.split(separator).map((v) => v.trim());
    setFields({ ...fields, [name]: values });
  };

  /* RESET FORM FIELDS TO INITIAL STATE */
  const resetFields = () => {
    setFields(initialState);
  };

  return { fields, handleChange, handleArrayChange, resetFields };
}

/* FUNCTION TO CAPITALIZE EACH WORD IN A STRING */
function capitalizeEachWord(str: string) {
  return str.replace(/\b\w/g, function(char: any) {
    return char.toUpperCase();
  }).replace(/([A-Z])/g, ' $1').trim();
}

/* MAIN COMPONENT FOR THE INSERT FORM */
export default function InsertForm() {

  /* DEFINE INITIAL STATE FOR FORM FIELDS */
  const initialState = {
    filmNumber: '',
    reference: '',
    releaseDate: '',
    filmTitle: '',
    synopsis: '',
    production: '',
    director: [],
    producer: [],
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
    makeup: '',
    artDirector: '',
    audioController: '',
    title: '',
    theaters: '',
    awardsPresidential: '',
    awardsSarasaviya: '',
    awardsOcic: '',
    awardsOthers: '',
    festivals: '',
    article: '',
    critics: '',
    others: '',
    special: '',
    poster: '',
    image: '',
    acknowledgement: '',
    payOffLine: '',
    lastUpDate: '',
  };

  /* INITIALIZE FORM DIELDS USING CUSTOM HOOK */
  const { fields, handleChange, handleArrayChange, resetFields } = useFormFields(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  /* FUNCTION TO TOGGLE LOCK STATUS */
  const toggleLock = () => {
    setIsLocked(!isLocked);
    const message = isLocked ? 'Film data successfully unlocked' : 'Film data successfully locked';
    const icon = isLocked ? '🟧' : '🟥';
    toast(message, { icon });
  };

  /* FUNCTION TO HANDLE FORM SUBMISSION */
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = { ...fields, isLocked };
    setIsLoading(true);    
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/film/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('record added successfully');
        resetFields();
      } else if(response.status === 500){
        toast.error('500: Internal server error occurred. Please try again later.');
      } else {
        const errorText = await response.text();
        toast.error(`${response.status}: ${errorText}`);
      }
    } catch (error) {
      toast.error('503: Failed to store data. Please ensure your connection is stable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-wapper'>
        {Object.entries(fields).map(([name, value]) => (
          <section key={name} className="flex justify-between items-center">
            {/* RENDER NUMBER FIELDS */}
            {name === 'filmNumber' && (
              <>
                <label className="label-style">{capitalizeEachWord(name)}</label>&nbsp;&nbsp;
                <input type="number" className="input-style" name={name} value={value} onChange={handleChange}/>
              </>
            )}
            {/* RENDER ARRAY FIELDS */}
            {(name === 'director' || name === 'producer') && (
              <>
                <label className="label-style">{capitalizeEachWord(name)}</label>&nbsp;&nbsp;
                <input type="text" className="input-style" value={Array.isArray(value) ? value.join(', ') : value} onChange={(e) => handleArrayChange(e, name)} />
              </>
            )}
            {/* RENDER OTHER FIELDS */}
            {(name !== 'filmNumber' && name !== 'director' && name !== 'producer') && (
              <>
                <label className="label-style">{capitalizeEachWord(name)}</label>&nbsp;&nbsp;
                <input type="text" className="input-style" name={name} value={value} onChange={handleChange}/>
              </>
            )}
          </section>
        ))}
      </div>

      {/* FORM BUTTONS */}
      <div className='button-wapper'>
        <button className={`button-style ${isLocked ? 'ring-orange' : 'ring-red'}`} onClick={toggleLock} type="button">
          <Image src={`/icons/${isLocked ? 'unlock' : 'lock'}-icon.png`} width={24} height={24} alt="lock-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">{`set as ${isLocked ? 'unlock' : 'lock'}`}</h1>
        </button>
          
        <button className="button-style ring-black" onClick={resetFields} type="button">
          <Image src="/icons/clear-icon.png" width={20} height={20} alt="clear-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">clean form</h1>
        </button>

        <button className="button-style ring-green" type="submit" disabled={isLoading}>
          <Image src="/icons/upload-icon.png" width={22} height={22} alt="upload-icon" />
          <h1 className="text-buttonBlack font-medium text-lg">save data</h1>
        </button>
      </div>
    </form>
  )
}
