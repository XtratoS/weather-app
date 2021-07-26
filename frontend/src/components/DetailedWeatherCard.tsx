import { useState, useEffect } from 'react';
import { currentWeatherOpenWeatherAPIResponse as weatherData } from '../utils/types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SunriseIcon from './icons/SunriseIcon';
import SunsetIcon from './icons/SunsetIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';
import HumidityIcon from './icons/HumidityIcon';

const get2DigitMinutes = (minutes: number): string => {
  let minuteString = minutes.toString();
  while (minuteString.length < 2) {
    minuteString = '0' + minuteString;
  }
  return minuteString;
}

const dateToString = (date: Date): string => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const normalizedHour = hour % 12;
  const dayNight = hour > 12 ? 'PM' : 'AM';
  const minute = get2DigitMinutes(date.getMinutes());
  return `${month} ${day}, ${normalizedHour}:${minute} ${dayNight}`;
}

const timestampToTimeString = (timestamp: number): string => {
  let date = new Date(timestamp);
  console.log(date);
  const hour = date.getHours();
  const normalizedHour = hour % 12;
  const dayNight = hour > 12 ? 'PM' : 'AM';
  const minute = get2DigitMinutes(date.getMinutes());
  return `${normalizedHour}:${minute} ${dayNight}`;
}

const lcFirst = (s: string):string => {
  return [s[0].toUpperCase(), s.slice(1)].join('');
}

const getWindDirectionAbbreviation = (deg: number) => {
  const windDirectionNames = [
    {
      name: "N",
      degreeRange: [
        0, 22.5
      ]
    },
    {
      name: "NE",
      degreeRange: [
        22.5, 67.5
      ]
    },
    {
      name: "E",
      degreeRange: [
        67.5, 112.5
      ]
    },
    {
      name: "SE",
      degreeRange: [
        112.5, 157.5
      ]
    },
    {
      name: "S",
      degreeRange: [
        157.5, 202.5
      ]
    },
    {
      name: "SW",
      degreeRange: [
        202.5, 247.5
      ]
    },
    {
      name: "W",
      degreeRange: [
        247.5, 292.5
      ]
    },
    {
      name: "NW",
      degreeRange: [
        292.5, 337.5
      ]
    },
    {
      name: "N",
      degreeRange: [
        337.5, 360
      ]
    }
  ];
  let direction = null;
  let l = windDirectionNames.length;
  let i = 0;
  while((!direction) && i < l) {
    let [start, end] = windDirectionNames[i].degreeRange;
    direction = ((deg > start && deg <= end) && windDirectionNames[i].name) || null;
    i++;
  }
  return direction;
}

export default function DetailedWeatherCard(props: {weatherData: weatherData}) {
  const { weatherData } = props;
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  useEffect(() => {
    let cityTimezoneOffsetInMinutes = new Date().getTimezoneOffset() + weatherData.timezone!/60;
    setTimezoneOffset(cityTimezoneOffsetInMinutes * 60 * 1000);
  }, [weatherData]);

  let cityDateNow = new Date(Date.now() + timezoneOffset);
  let timeNow = dateToString(cityDateNow);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#558B2F',
      color: '#000',
      padding: '1rem',
      borderRadius: '0.5rem',
    }}>
      <div style={{
        textAlign: 'left',
        display: 'grid',
        gridTemplateRows: '1fr 2fr 1fr 1fr',
        flexBasis: '200px',
        flexGrow: 1,
      }}>
        <div style={{color: 'rgba(0, 0, 0, 0.8)'}}>
          {timeNow}
        </div>
        <div style={{
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
          <span style={{paddingTop: '0.4rem', marginRight: '0.5rem'}}>{weatherData.name}, {weatherData.sys!.country}</span> <img src={`https://www.countryflags.io/${weatherData.sys!.country}/shiny/32.png`} alt={`Flag of ${weatherData.sys!.country}`}/>
        </div>
        <div style={{
          
        }}>
          [{weatherData.coord!.lat}, {weatherData.coord!.lon}]
        </div>
      </div>
      <div style={{
        flexGrow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img alt={weatherData.weather![0].description} src={`http://openweathermap.org/img/wn/${weatherData.weather![0].icon}.png`} />
          <div style={{paddingTop: '0.5rem', fontSize: '2rem'}}>{Math.round(weatherData.main!.temp)}°C</div>
        </div>
        <div>
          <span>Feels like {Math.round(weatherData.main!.feels_like)}°C.</span>
          &nbsp;
          <span>{lcFirst(weatherData.weather![0].description)}</span>
        </div>
        <div style={{
          paddingLeft: '1rem',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}>
          <div style={{
            height: '24px',
            display: 'flex',
            alignItems: 'flex-start',
          }}>
            <span style={{
              height: '24px',
              width: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <WindDirectionIcon
                size="16"
                style={{
                  transform: `rotate(${weatherData.wind!.deg}deg)`
                }}
              />
            </span>
            &nbsp;&nbsp;
            <span style={{alignSelf: 'center'}}>
              {weatherData.wind?.speed.toFixed(1)}m/s
            </span>
            &nbsp;
            <span style={{alignSelf: 'center'}}>
              {getWindDirectionAbbreviation(weatherData.wind!.deg)}
            </span>
          </div>
          <div style={{
            height: '24px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <HumidityIcon />
            &nbsp;&nbsp;
            {weatherData.main!.humidity}%
          </div>
          <div style={{
            minHeight: '24px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <VisibilityIcon style={{color: '#000'}}/>
            &nbsp;&nbsp;
            <span style={{alignSelf: 'flex-end'}}>
              {weatherData.visibility! > 1000 ? ((weatherData.visibility! / 1000).toFixed(1) + 'km') : weatherData.visibility! + 'm'}
            </span>
          </div>
        </div>
      </div>
      <div style={{
        flexGrow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
          <SunriseIcon />
          &nbsp;
          {timestampToTimeString(weatherData.sys!.sunrise * 1000 + timezoneOffset)}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
          <SunsetIcon />
          &nbsp;
          {timestampToTimeString(weatherData.sys!.sunset * 1000 + timezoneOffset)}
        </div>
      </div>
    </div>
  )
}
