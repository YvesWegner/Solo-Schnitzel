import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Geolocation} from '@capacitor/geolocation';

@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.page.html',
  styleUrls: ['./quest1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class Quest1Page {
  distance?: number;
  isAlertOpen = false;
  alertButtons = ['OK'];
  async printCurrentPosition() {
    try {
      const coords1 = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      });

      const coords2 = { latitude: 47.071945403994924, longitude: 8.348885173299777 };

      const distance = this.haversineDistance(coords1.coords, coords2);

      console.log('Current distance:', distance);
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  }

  haversineDistance(
    coords1: { latitude: number; longitude: number },
    coords2: { latitude: number; longitude: number }
  ) {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = coords1.latitude * (Math.PI / 180);
    const lat2Rad = coords2.latitude * (Math.PI / 180);
    const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
    const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // in meters
  }
  async finishQuest() {

  }

  async alert(isOpen: boolean) {
     if (this.distance !== undefined && this.distance <= 2) {
      this.isAlertOpen = isOpen;
    }
  }
}

