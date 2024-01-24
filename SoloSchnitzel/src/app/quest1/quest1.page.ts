import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.page.html',
  styleUrls: ['./quest1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest1Page implements OnInit {

  constructor() { }

  async getCurrentDistance() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Permission status: ', permissionStatus.location);
      if(permissionStatus?. location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if(requestStatus.location != 'granted') {
          return null;
        }
      }
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
      };
      return await Geolocation.getCurrentPosition(options);
    } catch (e) {

    }
  }
  ngOnInit() {
  }

}
