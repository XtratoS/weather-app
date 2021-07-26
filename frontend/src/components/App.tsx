import { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { City, currentWeatherOpenWeatherAPIResponse } from '../utils/types';
import CitySearch from './CitySearch';
import DetailedWeatherCard from './DetailedWeatherCard'
import { getCurrentWeather } from '../utils/api';

function App() {
  const [city, setCity] = useState<City|null>(null);
  const [weatherData, setWeatherData] = useState<currentWeatherOpenWeatherAPIResponse|null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      (async () => {
        let currentWeather = await getCurrentWeather(city.id);
        setWeatherData(currentWeather);
        setLoading(false);
      })();
    }
  }, [city]);

  return (
    <div className='App' style={{width: '65%', margin: 'auto', textAlign: 'center'}}>
      <CitySearch setCity={setCity} loading={loading} setLoading={setLoading}/>
      {loading && <CircularProgress style={{marginTop: '3rem', color: '#fff'}} />}
      {!loading && weatherData && <DetailedWeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;