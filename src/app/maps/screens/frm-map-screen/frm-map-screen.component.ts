import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'frm-map-screen',
  templateUrl: './frm-map-screen.component.html',
  styleUrl: './frm-map-screen.component.css'
})
export class FrmMapScreenComponent {

   constructor( private placesService: PlacesService) {}

   get isUserLocationReady() {

      return this.placesService.isUserLocationReady;

   }

}
