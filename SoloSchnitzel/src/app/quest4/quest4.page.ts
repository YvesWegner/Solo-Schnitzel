import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-quest4',
  templateUrl: './quest4.page.html',
  styleUrls: ['./quest4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest4Page implements OnInit {
  isCharging: boolean = false;
  batteryLevel: number = 0;

  constructor() {}

  async ngOnInit() {
    await this.checkBatteryStatus();
  }

  async checkBatteryStatus() {
    const batteryInfo = await Device.getBatteryInfo();
    this.isCharging = batteryInfo.isCharging ?? false; // Setzt false, wenn isCharging undefined ist
    this.batteryLevel = Math.round((batteryInfo.batteryLevel ?? 0) * 100); // Setzt 0, wenn batteryLevel undefined ist
    console.log(`Das Gerät ist ${this.isCharging ? '' : 'nicht '}am Laden. Batterieladung: ${this.batteryLevel}%`);
  }
}
