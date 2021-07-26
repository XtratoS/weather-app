import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { City } from '../utils/types';

export default function CitySearchResults(props: { cities: City[], clear: Function, setCity: Function}) {
  let { cities, clear, setCity} = props;

  return (<>
    <MenuList
      id="city-menu"
    >
      {cities.length > 0 && cities.map(city => (
        <MenuItem
          style={{display: 'flex', margin: 'auto', textAlign: 'center'}}
          key={city.id}
          onClick={()=>{
            setCity(city);
            clear();
          }}
          divider={true}
        >
          <div>
            <img src={`https://www.countryflags.io/${city.country}/shiny/64.png`} alt={`Flag of ${city.country}`}/>
          </div>
          <div style={{paddingLeft: '1rem', textAlign: 'left'}}>
            <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{`${city.name}, ${city.country}`}</div>
            <div>{`Coordinates: [${city.coord.lat.toFixed(4)}, ${city.coord.lon.toFixed(4)}]`}</div>
          </div>
        </MenuItem>
      ))}
      {cities.length === 0 &&
        <div style={{marginTop: '4rem'}}>
          No Results Found...
        </div>
      }
    </MenuList>
  </>)
}