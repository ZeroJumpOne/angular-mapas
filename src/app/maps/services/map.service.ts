import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
   providedIn: 'root'
})
export class MapService {

   private map: Map | undefined;
   private markers: Marker[] = [];

   constructor(private directionsApi: DirectionsApiClient) { }

   get isMapReady() {
      return !!this.map;
   }

   setMap(map: Map) {
      this.map = map;
   }

   flyTo(coords: LngLatLike) {
      if (!this.isMapReady) throw Error('El mapa no esta inicializado');

      this.map?.flyTo({
         zoom: 14,
         center: coords
      })

   }

   createMarkersFromPlaces(places: Feature[]) {
      if (!this.map) throw Error('Mapa no inicializado');

      this.markers.forEach(marker => marker.remove());
      const newMarkers = [];
      for (const place of places) {
         const { longitude, latitude } = place.properties.coordinates;
         const popup = new Popup()
            .setHTML(`
               <h6>${place.properties.name}</h6>
               <h6>${place.properties.full_address}</h6>
            `);

         const newMarker = new Marker()
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(this.map);

         newMarkers.push(newMarker);
      }

      this.markers = newMarkers;

      if (places.length === 0) return;

      //Limites del mapa
      const bounds = new LngLatBounds();
      newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ));


      this.map.fitBounds(bounds, {
         padding: 200
      });
   }

   getRouteBetweenPoints( start: [number, number], end: [number, number]) {

      this.directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',')} `)
         .subscribe( resp => this.drawPolyLine( resp.routes[0] ) );

   }

   private drawPolyLine( route: Route ) {
      // console.log({ kms: route.distance / 1000, duration: route.duration / 60});

      if(!this.map) throw Error('Mapa no inicializado');
      const coords = route.geometry.coordinates;
      const start = coords[0] as [number, number];
      const bounds = new LngLatBounds();

      coords.forEach( ([lng, lat]) => {
         bounds.extend([lng, lat]);
      });

      this.map.fitBounds( bounds, {
         padding: 200
      });

      const sourceData: AnySourceData = {
         type: 'geojson',
         data: {
            type: 'FeatureCollection',
            features: [
               {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                     type: 'LineString',
                     coordinates: coords,
                  }
               }
            ]

         }

      }

      if ( this.map.getLayer('RouteString' ) ) {
         this.map.removeLayer('RouteString');
         this.map.removeSource('RouteString');
      }

      this.map.addSource('RouteString', sourceData);
      this.map.addLayer({
         id: 'RouteString',
         type: 'line',
         source: 'RouteString',
         layout: {
            'line-cap': 'round',
            'line-join': 'round',
         },
         paint: {
            'line-color': 'black',
            'line-width': 3,
         }
      });
   }



}
