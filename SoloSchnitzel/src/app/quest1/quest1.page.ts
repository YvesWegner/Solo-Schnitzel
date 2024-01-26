import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, Routes} from '@angular/router';
import {Geolocation} from '@capacitor/geolocation';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.page.html',
  styleUrls: ['./quest1.page.scss'],
  standalone: true,
  imports: [IonHeader, CommonModule, FormsModule, IonContent, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, IonAlert]
})

export class Quest1Page implements OnInit{
  distance?: number;
  isAlertOpen = false;
  alertButtons = ['OK'];
  btndissabled = true;


  constructor(private router: Router, private cd: ChangeDetectorRef) {
  }
  async ngOnInit() {
    //await this.printCurrentPosition()
    await this.startPositionTracking()
  }
  async startPositionTracking() {
    try {
      await Geolocation.watchPosition(
        { enableHighAccuracy: true, timeout: 15000 },
        (position, err) => {
          if (err) {
            console.error('Error getting current position:', err);
            return;
          }
          if (position) {
            const coords1 = position.coords;
            const coords2 = { latitude: 47.071945403994924, longitude: 8.348885173299777 };
            this.distance = this.haversineDistance(coords1, coords2);
            console.log('Current distance:', this.distance);
            this.alert(this.isAlertOpen);
            this.cd.detectChanges()
          }
        }
      );
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
    this.router.navigateByUrl('/quests-info');
  }

  async alert(isOpen: boolean) {
    try {
      if (this.distance !== undefined && this.distance <= 2) {
        this.isAlertOpen = true;
        console.log("Showing alert because distance is within 2 meters");
        if (this.isAlertOpen === true) {
          this.btndissabled = false;
        }
        // Trigger your alert here
      } else {
        this.isAlertOpen = false;
        console.log("Distance is not within 2 meters");
      }
    } catch (error) {
      console.error('Error with alert:', error);
    }
  }

}
