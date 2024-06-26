import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places.interface';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

   public selectedId: string = '';

   constructor(
      private placesService: PlacesService,
      private mapService: MapService,
   ) {}

   get isLoadingPlaces(): boolean {
      return this.placesService.isLoadingPlaces;
   }

   get places(): Feature[] {
      return this.placesService.places;
   }

   flyTo( place: Feature) {
      const{ longitude, latitude } = place.properties.coordinates;

      this.selectedId = place.id;

      this.mapService.flyTo([longitude, latitude]);
   }

   getDirections( place: Feature ) {
      if ( !this.placesService.userLocation ) throw Error('Falta userLocation');

      this.placesService.deletePlaces();

      const start = this.placesService.userLocation;
      const { longitude, latitude } = place.properties.coordinates;
      const end = [ longitude, latitude ] as [number, number];

      // console.log({start, end});

      this.mapService.getRouteBetweenPoints( start, end);

   }



}
