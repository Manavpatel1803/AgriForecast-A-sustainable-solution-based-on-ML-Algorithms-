import React,{useState, useEffect} from 'react'
import {useRef} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

import Footer from '../footer/Footer';
import gsap from 'gsap';
import { average } from 'firebase/firestore';


const  Area = ['Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia',
       'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
       'Bangladesh', 'Belarus', 'Belgium', 'Botswana', 'Brazil',
       'Bulgaria', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada',
       'Central African Republic', 'Chile', 'Colombia', 'Croatia',
       'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
       'Eritrea', 'Estonia', 'Finland', 'France', 'Germany', 'Ghana',
       'Greece', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras',
       'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Italy',
       'Jamaica', 'Japan', 'Kazakhstan', 'Kenya', 'Latvia', 'Lebanon',
       'Lesotho', 'Libya', 'Lithuania', 'Madagascar', 'Malawi',
       'Malaysia', 'Mali', 'Mauritania', 'Mauritius', 'Mexico',
       'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal',
       'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Norway',
       'Pakistan', 'Papua New Guinea', 'Peru', 'Poland', 'Portugal',
       'Qatar', 'Romania', 'Rwanda', 'Saudi Arabia', 'Senegal',
       'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan',
       'Suriname', 'Sweden', 'Switzerland', 'Tajikistan', 'Thailand',
       'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Kingdom',
       'Uruguay', 'Zambia', 'Zimbabwe'];

const items=['Maize', 'Potatoes', 'Rice, paddy', 'Sorghum', 'Soybeans', 'Wheat',
'Cassava', 'Sweet potatoes', 'Plantains and others', 'Yams'];
    
const Predict =({name}) => {

    

const [selectedCountry, setSelectedCountry] = useState('');
const handleChangeCountry = (e) => {
    setSelectedCountry(e.target.value);
    console.log('Selected Country:', e.target.value);
};
const [selectedItem, setSelectedItem] = useState('');
const handleChangeItem = (e) => {   
    setSelectedItem(e.target.value);
    console.log('Selected Item:', e.target.value);
};

    const [formData, setFormData] = useState({
        Year: '',
        average_rain_fall_mm_per_year: '',
        pesticides_tonnes: '',
        avg_temp: '',
        Area: '',
        Item: ''
    });

    const [errors, setErrors] = useState({
        Year: '',
        avg_temp:'',
        average_rain_fall_mm_per_year:''

    });
    const [prediction, setPrediction] = useState(null); 



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (name === 'Year') {
            if(value < 0)
            {
                setErrors({ ...errors, Year: 'Year must be a positive integer' });
            }
            else if(value.includes('.')){
                setErrors({ ...errors, Year: 'Year must be an integer' });
            } 
            else if (value < 1960 || value > 2100 ) {
                setErrors({ ...errors, Year: 'Year must be between 1960 and 2100' });
            } else {
                setErrors({ ...errors, Year: '' });
            }
        }
        if( name ==='average_rain_fall_mm_per_year'){
            if(value < 0)
            {
                setErrors({ ...errors, average_rain_fall_mm_per_year: 'Rainfall must be a positive integer' });
            }
            else if (value < 0 || value > 3500) {
                setErrors({ ...errors, average_rain_fall_mm_per_year: 'Rainfall must be between 0 and 3500 mm' });
            } else {
                setErrors({ ...errors, average_rain_fall_mm_per_year: '' });
            }
        }
        if ( name ==='avg_temp'){
            if(value < 0)
            {
                setErrors({ ...errors, avg_temp: 'Temperature must be a positive integer' });
            }
            else if (value < -10 || value > 50) {
                setErrors({ ...errors, avg_temp: 'Temperature must be between -10 and 50 C' });
            } else {
                setErrors({ ...errors, avg_temp: '' });
            }
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        try {
            console.log('Form data:', formData);
            const response = await axios.post('http://localhost:5000/predict', formData); // Adjust the endpoint URL accordingly
            console.log('Response',response.data); // Handle the response as needed
            const prediction = response.data.prediction;
            setPrediction(prediction);
        } catch (error) {
            console.error('Error occurred while making the request:', error);
        }
    };



      return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar userName={name} />
            <div className="container mx-auto px-4 pt-16 flex justify-center">
                <div className="max-w-md w-full mb-8"> {/* Add margin bottom here */}
                    <h1 className="text-4xl font-bold mb-8 text-center">AgriForecast</h1>
                    <h2 className="text-2xl mb-4">Calculate the yield </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div class="form-group">
                            <label htmlFor="Year" className="block text-md font-medium text-gray-700">Enter the Year to be predicted</label>
                            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Year ? 'border-red-500' : ''}`} name="Year" step="any" placeholder="Enter the Year" onChange={handleChange} required />
                            {/* Add validation error message */}
                             {/* Add validation error message */}
                             {errors.Year && (
                                <p className="text-red-500 text-sm">{errors.Year}</p>
                            )}
                    
                        </div>
                        <div class="form-group">
                            <label htmlFor="average_rain_fall_mm_per_year" className="block text-md font-medium text-gray-700">Enter the Rainfall (in mm)</label>
                            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.average_rain_fall_mm_per_year ? 'border-red-500' : ''}`} name="average_rain_fall_mm_per_year" step="any" placeholder="Enter the Rainfall per mm" onChange={handleChange} required />
                            {errors.average_rain_fall_mm_per_year && (
                                <p className="text-red-500 text-sm">{errors.average_rain_fall_mm_per_year}</p>
                            )}
                        </div>
                        <div class="form-group">
                            <label htmlFor="pesticides_tonnes" className="block text-md font-medium text-gray-700">Amount of pesticides used (in tones)</label>
                            <input type="number" className="form-input mt-1 py-1 block w-full" name="pesticides_tonnes" step="any" placeholder="Enter the pesticides used around the year" onChange={handleChange} required />
                            
                        </div>
                        <div class="form-group">
                            <label htmlFor="avg_temp" className="block text-md font-medium text-gray-700">Average temperature around the year</label>
                            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.avg_temp ? 'border-red-500' : ''}`} name="avg_temp" step="any" placeholder="Enter the Temperature" onChange={handleChange}  required/>
                            {errors.avg_temp && (
                                <p className="text-red-500 text-sm">{errors.avg_temp}</p>
                            )}
                            
                        </div>
                        <div class="form-group">
                            <label htmlFor="Area" className="block text-md font-medium text-gray-700">Select the country from the list : </label>
                            <select id="Area" name="Area" value={formData.Area} onChange={handleChange}  required className="form-select mt-1 py-1 block w-full">
                                <option value="">Select from the list of countries</option>
                                {Area.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-group">
                            <label htmlFor="Item" className="block text-md font-medium text-gray-700">Select the items from the list : </label>
                            <select id="Item" name="Item" value={formData.Item} onChange={handleChange}  required className="form-select mt-1 py-1 block w-full">
                                <option>---Choose from the List---</option>
                                {items.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-group">
                            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 ">Predict</button>
                        </div>
                    </form>
                    {prediction && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900 bg-opacity-75 absolute inset-0"></div>
        <div className="relative bg-white rounded-lg px-8 py-6 shadow-xl z-10">
            <div className="flex items-center justify-center mb-4">
                
                <h2 className="text-lg font-bold">Prediction</h2>
            </div>
            <p className="text-gray-700 mb-4">Congratulations !!! The predicted value is {prediction}  hectare per year </p>
            <button onClick={() => setPrediction(null)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Close</button>
        </div>
    </div>
)}
                </div>
            </div>
            <Footer />
        </div>
    )

}



export default Predict;
