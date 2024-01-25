import { Component, OnInit } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import {IonicModule, IonicSlides} from "@ionic/angular";
import {IonContent, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";

interface NetworkTask {
  description: string;
  completed: boolean;
  shouldBeConnected: boolean;
}
@Component({
  selector: 'app-quest3',
  templateUrl: './quest3.page.html',
  styleUrls: ['./quest3.page.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonContent,
    IonList,
    CommonModule
  ],
  standalone: true
})
export class Quest3Page implements OnInit {
  tasks: NetworkTask[] = [
    { description: 'Trenne dich vom WLAN', completed: false, shouldBeConnected: false },
    { description: 'Verbinde dich zum WLAN', completed: false, shouldBeConnected: true },
    { description: 'Trenne dich vom WLAN', completed: false, shouldBeConnected: false },
    { description: 'Verbinde dich zum WLAN', completed: false, shouldBeConnected: true }
  ];

  currentTaskIndex: number = 0;

  async ngOnInit() {
    Network.addListener('networkStatusChange', this.handleNetworkChange);

    const status = await Network.getStatus();
    this.updateTaskCompletion(status);
  }

  private handleNetworkChange = (status: ConnectionStatus) => {
    console.log('Network status changed', status);
    this.updateTaskCompletion(status);
  };

  private updateTaskCompletion(status: ConnectionStatus) {
    const currentTask = this.tasks[this.currentTaskIndex];

    if (currentTask && ((status.connected && currentTask.shouldBeConnected) || (!status.connected && !currentTask.shouldBeConnected))) {
      currentTask.completed = true;
      this.currentTaskIndex++;
    }
  }

  ngOnDestroy() {
    Network.removeAllListeners();
  }
}
