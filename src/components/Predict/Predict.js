import React,{useState, useEffect} from 'react'
import {useRef} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

import Footer from '../footer/Footer';


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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        try {
            console.log('Form data:', formData);
            const response = await axios.post('http://localhost:5000/predict', formData); // Adjust the endpoint URL accordingly
            console.log('Response',response.data); // Handle the response as needed

      
            const prediction = response.data.prediction;
        alert(`The predicted value is ${prediction}`);
        } catch (error) {
            console.error('Error occurred while making the request:', error);
        }
    };
    useEffect(() => {
        const colors = ['#FFD700', '#ADD8E6', '#98FB98']; // Gold, Light Blue, Pale Green
        let index = 0;
    
        const interval = setInterval(() => {
          document.body.style.backgroundColor = colors[index];
          index = (index + 1) % colors.length;
        }, 5000); // Change background color every 5 seconds
    
        return () => clearInterval(interval);
      }, []);


    return (
        <div className="bg-gray-100 min-h-screen">
             <Navbar userName={name} />
             <div className="container mx-auto px-4 pt-16">
        <h1 className="text-4xl font-bold mb-8">AgriForecast</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <h2 className="text-2xl mb-4">Calculate the yield </h2>

        <form  onSubmit={handleSubmit} className="space-y-4">
        <div class="form-group">
                <label htmlFor="Year" className="block text-lg font-medium text-gray-700">Enter the Year to be predicted</label>
                <input type="number"className="form-input mt-1 block w-full" name="Year" step="any" placeholder="Enter the Year" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="average_rain_fall_mm_per_year" className="block text-lg font-medium text-gray-700">Enter the estimated rainfall per year</label>
            <input type="number" className="form-input mt-1 block w-full" name="average_rain_fall_mm_per_year" step="any"  placeholder="Enter the Rainfall per mm" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="pesticides_tonnes" className="block text-lg font-medium text-gray-700">Amount of pesticides used (in tones)</label>
            <input type="number" className="form-input mt-1 block w-full" name="pesticides_tonnes" step="any"  placeholder="Enter the pesticides used around the year" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="avg_temp" className="block text-lg font-medium text-gray-700">Average temperature around the year</label>
            <input type="number" className="form-input mt-1 block w-full" name="avg_temp" step="any" placeholder="Enter the Temperature" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="Area" className="block text-lg font-medium text-gray-700">Select the country from the list : </label>
        <select id="Area" name="Area" value={formData.Area} onChange={handleChange} className="form-select mt-1 block w-full">
          <option value="">Select from the list of countries</option>
          {Area.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
         
        </select>
    </div>
    <div class="form-group">
        <label htmlFor="Item" className="block text-lg font-medium text-gray-700">Select the items from the list : </label>
         <select id="Item" name="Item" value={formData.Item}onChange={handleChange} className="form-select mt-1 block w-full">
          <option>---Choose from the List---</option>
          {items.map(items => (
                    <option key={items} value={items}>{items}</option>
                ))}
         </select>
        <br/>
    </div>
    <br/>
    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Predict</button>

</form>


    
</div>


</div>
<Footer />
</div>

  )
}



export default Predict;
