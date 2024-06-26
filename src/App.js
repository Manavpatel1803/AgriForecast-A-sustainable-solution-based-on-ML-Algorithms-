import {React,useState,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { auth } from './firebase';
import Navbar from './components/Navbar/Navbar';
import Predict from './components/Predict/Predict';
import CropRecommend from './components/Recommend/CropRecommend';
import './App.css';
import Footer from './components/footer/Footer';
import NewsPage from './components/NewsPage/NewsPage';
import WeatherForecast from './components/Weather/WeatherForecast';


function App() {
  const[userName,setUserName]= useState("");
  useEffect(
    ()=>
    {
      auth.onAuthStateChanged((user)=>
      {
        if(user)
        {
          setUserName(user.displayName);
        }
        else setUserName("");
      });
    },[]
    );
const [username, setUsername] = useState('');


  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home name={userName}/>} />
          <Route path='/Navbar' element={<Navbar name={userName}/>} />
          <Route path='/predict' element={<Predict name={userName}/>} />
          <Route path='/CropRecommend' element={<CropRecommend name={userName}/>} />
          <Route path='/footer' element={<Footer name={userName}/>} />
          <Route path='/NewsPage' element={<NewsPage name={userName}/>} />
          <Route path='/WeatherForecast' element={<WeatherForecast name={userName}/>} />

        </Routes>
      </Router>
      </div>
   
  );
}

export default App;
