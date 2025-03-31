import React, { useState } from 'react'
import axios from 'axios'
import { SelectBudgetOptions } from '@/constants/options'
import { SelectTravelersList } from '@/constants/options'
import { Button } from '../components/ui/button'

function CreateTrip() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [days, setDays] = useState('')

  const handleInputChange = async (e) => {
    const input = e.target.value
    setQuery(input)

    if (input.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: input,
            format: 'json',
            addressdetails: 1,
            limit: 5,
          },
        })
        setSuggestions(response.data || [])
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name)
    setSuggestions([])
  }

  return (
    <div className='max-w-4xl mx-auto sm:px-10 px-5'>
      <h2 className='font-large text-3xl '>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl font'>What is your destination of choice?</h2>
          <input
            type='text'
            value={query}
            onChange={handleInputChange}
            placeholder='Enter a destination'
            className='border border-gray-300 rounded-md p-4 w-1/2 text-center text-lg'
          />
          {suggestions.length > 0 && (
            <ul className='border border-gray-300 rounded-md mt-2 bg-white text-center'>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className='p-3 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <input
          type='number'
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder='Ex. 3'
          className='border border-gray-300 rounded-md p-2 w-1/2 text-center'
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
                <div key={index} className='p-2 border cursor-pointer rounded-lg'>
                    <h2 className='text-4xl'>{item.icon} </h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelersList.map((item,index)=>(
            <div key={index} className='p-2 border cursor-pointer rounded-lg'>
                <h2 className='text-4xl'>{item.icon} </h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-30'><Button> Generate Trip </Button></div>
      
    </div>
  )
}

export default CreateTrip