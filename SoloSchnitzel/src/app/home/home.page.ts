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
import { Camera, CameraResultType } from '@capacitor/camera';

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
          handler: () => {
            // Aktion für "Accept"
            this.accessCamera();
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
  async accessCamera() {
    try {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // oder 'base64', 'dataUrl'
        quality: 90, // Bildqualität
      });
      console.log(cameraPhoto);
    } catch (e) {
      console.error('Camera issue: ', e);
    }
  }
}
