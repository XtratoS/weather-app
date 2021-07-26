import { useState } from 'react'
import { getSuggestions } from '../utils/api';
import { City } from '../utils/types';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CitySearchResults from './CitySearchResults';

export default function CitySearch(props : {setCity: Function, loading: boolean, setLoading: Function}) {
  const { setLoading } = props;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const updateSuggestions = async () => {
    if (inputValue === '') return;
    setLoading(true);
    let newSuggestions = await getSuggestions(inputValue);
    setSuggestions(newSuggestions);
    setLoading(false);
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid lightgrey',
          borderRight: 0,
          borderRadius: '.15rem 0 0 .15rem',
          padding: '.2rem 1rem',
          height: '2rem'
        }}>
          <SearchIcon style={{color: 'white', marginRight: '.75rem'}}></SearchIcon>
          <input
            placeholder='Weather in...' style={{
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              outline: 'none',
              border: 'none',
              fontSize: '1rem',
              marginTop: '.2rem',
              backgroundColor: 'transparent',
              color: 'white',
            }}
            value={inputValue}
            onChange={(event) => {setInputValue(event.target.value)}}
            onKeyPress={(event) => {
              if (event.code === 'Enter') {
                updateSuggestions();
              }
            }}
          ></input>
        </div>
        <Button
          style={{
            height: '2.5rem',
            border: '1px solid lightgrey',
            backgroundColor: 'grey',
            color: '#fff',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: 0,
          }}
          onClick={updateSuggestions}
        >
          Search
        </Button>
      </div>
      <CitySearchResults
        cities={suggestions}
        clear={() => {setSuggestions([])}}
        setCity={props.setCity}
      />
    </div>
  )
}