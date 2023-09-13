import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [Text, setText] = useState('');
  const [Data, setData] = useState({});
  const [IsLoaded, setIsLoaded] = useState(false);

  useEffect(() => { sessionStorage.clear() }, [])

  const handleInputChange = (data) => {
    setText(data);
  }

  const handleBtClick = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Text}&appid=41a938c1f7e115f960c57094da67834e&units=metric`).then((response) => { setData(response.data); setIsLoaded(true) }).catch((error) => { console.error(error.data); setIsLoaded(false) });
  }

  return (
    <div className="App">
      <div className="input-group mb-3">
        <div className='border-secondary border w-100 d-flex rounded'>
          <input list='cities' type="text" className="form-control input" onChange={(e) => { handleInputChange(e.target.value) }} placeholder='Please enter your city name' />
          <button className='btn border-start' onClick={() => { handleBtClick() }}><i className="bi bi-search"></i></button>
        </div>
      </div>
      <div className='w-100 border rounded-3 position-relative' style={{ height: '86%' }}>
        {!IsLoaded ? (
          <p className='text-center h-100 fs-3 text-secondary' style={{ margin: '22.5% auto' }}>No Data Found . . .</p>
        ) : (
          <>
            <div className='fs-2 ms-2 mb-2 border-bottom' style={{ width: 'max-content' }}>
              <span className='pe-2'>{Data.name}, {Data.sys.country}</span>
              <img src={`http://openweathermap.org/img/w/${Data.weather[0].icon}.png`} alt={`${Data.weather[0].description}`}></img>
              <span className='fs-6 text-secondary'>({Data.weather[0].description})</span>
            </div>
            <div className='row'>
              <div className='col-5 ms-2 '>
                <span className=' mt-3 row'><span className='col-7'>Temperature  </span>:<span className='col'>{Data.main.temp} °C</span></span>
                <span className=' mt-3 row'><span className='col-7'>Feels Like </span>:<span className='col'>{Data.main.feels_like} °C</span></span>
                <span className=' mt-3 row'><span className='col-7'>Maximum temp </span>:<span className='col'>{Data.main.temp_max} °C</span></span>
                <span className=' mt-3 row'><span className='col-7'>Minimum temp  </span>:<span className='col'>{Data.main.temp_min} °C</span></span>
              </div>
              <div className='col border-secondary border-start d-flex justify-content-center flex-wrap fs-4'>
             <span className='box'><i className="bi bi-wind"></i><div className='m-0 fs-5'>{Data.main.pressure} hPa<div className='fs-6'>Pressure  </div></div></span>
             <span className='box'><i className="bi bi-eye"></i><div>{Data.visibility / 1000} km<div className='fs-6'>Visibility</div></div></span>
             <span className='box'><i className="bi bi-clouds"></i><div>{Data.clouds.all}%<div className='fs-6'>Clouds</div></div></span>
             <span className='box'><i className="bi bi-speedometer"></i><div>{Data.wind.speed}<div className='fs-6'>Speed (km)</div></div></span>
              </div>
            </div>
            <button className='btn btn-danger position-absolute bottom-0 end-0 me-2 mb-2 rounded-none' onClick={() => { setIsLoaded(false) }}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
