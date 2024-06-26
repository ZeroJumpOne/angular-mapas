import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN6am8iLCJhIjoiY2x4aXFiMGg1MXNwZzJrcHJtbTBrOG13dCJ9.GOSnQUozYMIxqQXSC1PR1w';

if ( !navigator.geolocation ) {
  alert('avegador no soporta Geolocalizacion');
  throw new Error('Navegador no soporta Geolocalizacion');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
