import fs from 'fs';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { City } from './types';
require('dotenv').config();

const app: Application = express();
const PORT = process.env.EXPRESS_PORT || 5000;

const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions));

const cities: City[] = JSON.parse(
  fs.readFileSync('./data/city.list.json', 'utf8')
).map((city: City) => ({
  ...city,
  fullName: `${city.name},${city.country}`
}));

app.get('/cities', (req: Request, res: Response) => {
  res.status(200).json(cities.map(city => ({
    id: city.id,
    name: `${city.name}, ${city.country}`
  })));
  return;
})

app.get('/suggestions', (req: Request, res: Response) => {
  let { name, limit } = req.query;
  let missingParameters = [];
  if (!name) {
    missingParameters.push('name');
  }
  if (!limit) {
    missingParameters.push('limit');
  }
  if (missingParameters.length > 0) {
    res.status(400);
    res.json({'Missing Parameters': missingParameters});
    return;
  }

  let suggestedCitiesLimit = parseInt(limit!.toString());
  let requestCityFullName = name!.toString().toLowerCase()
    .split(',')
    .map(s => s.trim())
    .join(',');
  
  let suggestedCities = cities.filter(city => city.fullName!.toLowerCase().includes(requestCityFullName));
  
  //TODO sort results
  suggestedCities.sort((a, b) => {
    return a.id - b.id;
  });

  if (suggestedCities.length === 0) {
    res.sendStatus(204);
    return;
  }

  res.status(200).json(suggestedCities.slice(0, suggestedCitiesLimit));
  return;
});

app.get('/cityByFullName', (req: Request, res: Response) => {
  let { name } = req.query;
  if (!name) {
    res.status(400).json({'Missing Parameter': 'name'});
    return;
  }

  let cityName = name.toString()
    .split(',')
    .map(s => s.trim())
    .join(',');
  let city = cities.find(city => city.fullName === cityName);
  if (city) {
    res.status(200).json(city);
    return;
  }
  
  res.sendStatus(404);
  return;
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
