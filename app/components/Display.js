"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";


const API_key = process.env.NEXT_PUBLIC_API_KEY;



const Display = () => {

    const [icon,setIcon] = useState("https://openweathermap.org/img/wn/${myIcon}@4x.png");
    const [weatherData,setWeatherData] = useState({});
    const inputRef = useRef();

    const fetchData = async (inputCity) => {

        if (!API_key) {
            setErrorMessage("API key is missing or not set!");
            console.error("API key is missing or undefined.");
            return;
        }

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${API_key}`;
        let details = await fetch(URL);
        let data = await details.json();

        setWeatherData({
            city : data.name,
            country : data.sys.country,
            temp : data.main.temp,
            desc : data.weather[0].description,
            wind : data.wind.speed,
            humidity : data.main.humidity
        })

        console.log(weatherData)
        console.log(data.weather[0].icon)
        
        let myIcon = data.weather[0].icon
        setIcon(`https://openweathermap.org/img/wn/${myIcon}@4x.png`)
    }
    
    useEffect(() => {
        fetchData("London")
    },[])

  return (
    <div className='flex flex-col justify-center items-center mt-6'>
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input ref={inputRef} type="email" placeholder="Enter the city name..." />
      <Button onClick={() => fetchData(inputRef.current.value)} type="submit"><FaSearch></FaSearch></Button>
      </div>
     
      <div className='border rounded-xl border-teal-50 border-8 mt-8'>
         <div className='flex flex-col justify-center items-center py-2'>
            <img src={icon}></img><span>{weatherData.desc}</span>
            <p className='text-4xl leading-7 [&:not(:first-child)]:mt-6'>{weatherData.temp}°<sup>C</sup></p>
            <p className='text-5xl mt-2'>{weatherData.city}</p>
         </div>
         <div className='flex flex-row justify-between gap-40 my-10'>
        <div className='flex flex-row gap-2 ml-5'>
         <FaWind size={40}/>
         <div className='mt-6'>
            <p className='text-3xl'>{weatherData.wind}km/h</p>
            <p >Wind-Speed</p>
         </div>
         <div>

         </div>
            </div>

            <div className='flex flex-row gap-1 mr-4'>
         <WiHumidity size={50}/>
         <div>
         <p className='text-3xl mt-3'>{weatherData.humidity}%</p>
         <p>Humidity</p>
         </div>

            </div>
         </div>
      </div>
    </div>
  )
}

export default Display