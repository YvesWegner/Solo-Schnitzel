import { Component } from '@angular/core';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { Camera, CameraPermissionType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAlert, IonIcon],
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
            console.log(status)
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
          handler: async () => { // Markiert als async
            console.log('Checking geolocation permissions');
            const status = await Geolocation.checkPermissions();
            if (status.location !== 'granted') {
              const permissionStatus = await Geolocation.requestPermissions({ permissions: ["location"] });
              if (permissionStatus.location === 'granted') {
                console.log('Geolocation access granted');
                await this.presentNamePrompt();
              } else {
                console.log('Geolocation access denied');
              }
            } else {
              console.log('Geolocation access already granted');
              await this.presentNamePrompt();
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

  async presentNamePrompt() {

    const alert = await this.alertController.create({
      header: 'Spielerinformation',
      inputs: [
        {
          name: 'playerName',
          type: 'text',
          placeholder: 'Spielername'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Abbrechen geklickt');
          }
        },
        {
          text: 'Bestätigen',
          handler: (data) => {
            console.log('Bestätigen geklickt mit:', data.playerName);
          }
        }
      ]
    });

    await alert.present();
  }
}
