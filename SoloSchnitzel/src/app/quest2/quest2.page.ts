import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-quest2',
  templateUrl: './quest2.page.html',
  styleUrls: ['./quest2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest2Page implements OnInit {
  taskDone = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.installGoogleBarcodeScannerModule();
  }

  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      await this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // Überprüfen Sie hier den gescannten Wert des QR-Codes
    if (this.barcodes[this.barcodes.length - 1].rawValue == 'IhrQRCodeWert') {
      console.log("Erfolg");
      this.taskDone = true;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Berechtigung verweigert',
      message: 'Bitte erteilen Sie die Kameraberechtigung, um den Barcode-Scanner zu nutzen.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
