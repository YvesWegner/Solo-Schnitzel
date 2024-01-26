
  import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
  import { Network, ConnectionStatus } from '@capacitor/network';
  import {IonContent, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
  import {CommonModule} from "@angular/common";
  import { Router } from '@angular/router';
  import { AlertController } from '@ionic/angular/standalone';
  import { QuestService } from '../services/quest.service';
  import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
    constructor(
      private router: Router,
      private alertController: AlertController,
      private questService: QuestService,
      private cd: ChangeDetectorRef
    ) {
    }

    tasks: NetworkTask[] = [
      {description: 'Trenne dich vom WLAN', completed: false, shouldBeConnected: false},
      {description: 'Verbinde dich zum WLAN', completed: false, shouldBeConnected: true},
      {description: 'Trenne dich vom WLAN', completed: false, shouldBeConnected: false},
      {description: 'Verbinde dich zum WLAN', completed: false, shouldBeConnected: true}
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
        this.cd.detectChanges();
        this.currentTaskIndex++;
        this.completeQuest();
      }
    }

    ngOnDestroy() {
      Network.removeAllListeners();
    }

    private async completeQuest() {
      if (this.tasks.every(task => task.completed)) {
        await Haptics.impact({ style: ImpactStyle.Light });
        // Markieren Sie Quest 4 als freigeschaltet
        this.questService.completeQuest(4);

        // Zeigen Sie den Alert an
        const alert = await this.alertController.create({
          header: 'Quest abgeschlossen',
          message: 'Quest 3 abgeschlossen! Quest 4 ist jetzt freigeschaltet.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl('/quests-info');
              }
            }
          ]
        });
        await alert.present();
      }
    }
  }
