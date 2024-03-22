import React, {useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from '../Navbar/Navbar';
import * as d3 from 'd3';
import {Chart,Bars, XAxis,YAxis} from 'react-d3-components';


const data = [
  {name :'Nitrogen',value:400},
  {name: 'Phosphorus',value:300},
  {name: 'Potassium',value:200}
];  

const scatterData = [
  { x: 20, y: 30 },
  { x: 40, y: 50 },
  { x: 60, y: 20 },
  // Add more data points as needed
]

const api =
{
  key:"",
  base:"https://api.openweathermap.org/data/2.5/weather/"
}

function Home({name}) {

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Bar Chart
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, 300])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([150, 0]);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 150 - yScale(d.value))
      .attr('fill', 'steelblue');

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0, 150)`)
      .call(d3.axisBottom(xScale));

    // Y Axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Scatter Plot
    svg.selectAll('circle')
      .data(scatterData)
      .enter().append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 5)
      .attr('fill', 'orange');

  }, []);

  const[weather,setWeather]= useState(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=f2ed928b7b749efc1e46ae99b4c8d0bf');
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          console.error('Failed to fetch weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  
  return (
    <div >
      <Navbar userName={name}/>
      <br />
      <br />
      <br />
      <br/>
      <br/>
      <br/>

      <div>
        <h1>AgriForecast</h1>


      {weather && (
          <div className="weather-info">
            <h3>Weather in {weather.name}</h3>
            <div>
              <span>{weather.weather[0].main}</span> {/* Cloudy, rainy, sunny, etc. */}
              {/* Use weather icons or emojis based on the weather condition */}
              {weather.weather[0].main === 'Clouds' && <i className="fas fa-cloud"></i>}
              {weather.weather[0].main === 'Rain' && <i className="fas fa-cloud-showers-heavy"></i>}
              {weather.weather[0].main === 'Clear' && <i className="fas fa-sun"></i>}
              {/* Add more conditions and icons as needed */}
            </div>
          </div>
        )}
<br/>
<br/>

<svg ref={svgRef} width={400} height={200}>
      {/* Add axis components here if needed */}
    </svg>
      </div>
    </div>
  );
}

export default Home
