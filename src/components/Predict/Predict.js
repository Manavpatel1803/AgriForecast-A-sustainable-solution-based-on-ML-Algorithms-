import React,{useState} from 'react'
import {useRef} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import './predict.css';


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
    return (
        <div>
             <Navbar userName={name} />
        <h1 class="first">AgriForecast</h1>
    <div class="container">

        <h2>Calculate the yield </h2>

        <form  onSubmit={handleSubmit}>
        <div class="form-group">
                <label htmlFor="Year">Enter the Year to be predicted</label>
                <input type="number" class="form-control" name="Year" step="any" placeholder="Enter the Year" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="average_rain_fall_mm_per_year">Enter the estimated rainfall per year</label>
            <input type="number" class="form-control" name="average_rain_fall_mm_per_year" step="any"  placeholder="Enter the Rainfall per mm" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="pesticides_tonnes">Amount of pesticides used (in tones)</label>
            <input type="number" class="form-control" name="pesticides_tonnes" step="any"  placeholder="Enter the pesticides used around the year" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="avg_temp">Average temperature around the year</label>
            <input type="number" class="form-control" name="avg_temp" step="any" placeholder="Enter the Temperature" onChange={handleChange} />
        </div>
    <div class="form-group">
        <label htmlFor="Area">Select the country from the list : </label>
        <select id="Area" name="Area" value={formData.Area} onChange={handleChange}>
          <option value="">Select from the list of countries</option>
          {Area.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
         
        </select>
    </div>
    <div class="form-group">
        <label htmlFor="Item">Select the items from the list : </label>
         <select id="Item" name="Item" value={formData.Item}onChange={handleChange}>
          <option>---Choose from the List---</option>
          {items.map(items => (
                    <option key={items} value={items}>{items}</option>
                ))}
         </select>
        <br/>
    </div>
    <br/>
    <button type="submit" class="button">Predict</button>

</form>


    
</div>
</div>

  )
}



export default Predict;
