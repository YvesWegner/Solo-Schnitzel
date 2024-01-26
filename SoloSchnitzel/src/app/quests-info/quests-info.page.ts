import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { QuestService } from '../services/quest.service';

@Component({
  selector: 'app-quests-info',
  templateUrl: './quests-info.page.html',
  styleUrls: ['./quests-info.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class QuestsInfoPage {
  questStatus: boolean[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private questService: QuestService
  ) {}

  ngOnInit() {
    this.questStatus = this.questService.getQuestStatus();
  }

  checkAndNavigate(questNumber: number) {
    if (this.questStatus[questNumber - 1]) {
      this.router.navigateByUrl(`/quest${questNumber}`);
    } else {
      this.showLockedAlert();
    }
  }

  completeQuest(questNumber: number) {
    this.questService.completeQuest(questNumber);
    this.questStatus = this.questService.getQuestStatus();
  }

  private async showLockedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'Questlockedalert',
      header: 'Quest gesperrt',
      message: 'Diese Quest ist noch nicht freigeschaltet. Beende die vorherigen Quests, um fortzufahren.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
