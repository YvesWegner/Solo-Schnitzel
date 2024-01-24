import { Component } from '@angular/core';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Camera, CameraPermissionType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAlert],
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'HALLO',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'ACCEPT',
          cssClass: 'alert-button-accept',
          handler: async () => {
            console.log('Checking camera permissions');
            const status = await Camera.checkPermissions();
            if (status.camera !== 'granted') {
              await Camera.requestPermissions();
            }
            await this.presentGeolocationPermissionAlert();
          },
        },
        {
          text: 'DECLINE',
          cssClass: 'alert-button-decline',
          handler: () => {
            console.log('Camera access declined');
          },
        },
      ],
    });

    await alert.present();
  }
  async presentGeolocationPermissionAlert() {
    const alert = await this.alertController.create({
      header: 'Geolocation Permission',
      message: "Allow app to access this device's location?",
      buttons: [
        {
          text: 'Accept',
          handler: async () => {
            console.log('Checking geolocation permissions');
            const status = await Geolocation.checkPermissions();
            if (status.location !== 'granted') {
              await Geolocation.requestPermissions();
            }
          },
        },
        {
          text: 'Decline',
          role: 'cancel',
          handler: () => {
            console.log('Geolocation permission declined');
          },
        },
      ],
    });
    await alert.present();
  }
}
