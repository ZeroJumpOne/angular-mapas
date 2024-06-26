import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

   constructor(
      private mapService: MapService,
      private placesService: PlacesService,
   ) {}

   public goToMyLocation() {
      if( !this.placesService.isUserLocationReady ) throw Error('No hay ubicacion de usuario')
      if( !this.mapService.isMapReady ) throw Error('No hay mapa disponible')
      // console.log('Ir a mi ubicación');

      this.mapService.flyTo( this.placesService.userLocation! );
   }

}
