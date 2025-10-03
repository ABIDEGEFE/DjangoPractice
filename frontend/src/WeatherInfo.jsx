import React,  { useState } from "react";

import { TextField, Button } from '@mui/material';
export const WeatherInfo = () => {
    const [city, setCity] = useState(null);
    const [data, setData] = useState(null);
    
    const handleSearchCity = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city }),
        });
        const data = await response.json();
        setData(data); 
    }

    const handleInputChange = (e) => {
        setCity(e.target.value);
    }

  
    return (
        <div>
            <form onSubmit={handleSearchCity}>
                <TextField 
                    label="City" 
                    variant="outlined" 
                    value={city}
                    onChange={handleInputChange} 
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>

            {/* I want to display the weather information in the form of table here */}
            <div>{data && (
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.city}</td>
                            <td>{data.temperature}</td>
                            <td>{data.humidity}</td>
                            <td>{data.condition}</td>
                        </tr>
                    </tbody>
                </table>
            )}</div>
        </div>
        
    );
};