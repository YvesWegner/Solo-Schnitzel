import {Component, OnInit} from '@angular/core';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-quest3',
  templateUrl: './quest3.page.html',
  styleUrls: ['./quest3.page.scss'],
  imports: [
    IonicModule
  ], // Importieren Sie hier das IonicModule
  standalone: true
})
export class Quest3Page implements OnInit {
  motionData: string = '';
  private motionHandler: PluginListenerHandle | null = null;
  private intervalId: any;

  async ngOnInit() {
    this.startMotionListener();
  }

  async startMotionListener() {
    this.motionHandler = await Motion.addListener('accel', event => {
      // Hier verarbeiten Sie das Bewegungsereignis
      this.motionData = `X: ${event.acceleration.x.toFixed(3)}, Y: ${event.acceleration.y.toFixed(3)}, Z: ${event.acceleration.z.toFixed(3)}`;
    });

    // Starten Sie das Intervall, um die Funktion alle 3 Sekunden auszuführen
    this.intervalId = setInterval(() => {
      if (this.motionData) {
        console.log(this.motionData);
        // Hier könnten Sie weitere Logik implementieren
      }
    }, 3000);
  }

  ngOnDestroy() {
    // Listener entfernen, wenn die Komponente zerstört wird
    this.motionHandler?.remove();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
