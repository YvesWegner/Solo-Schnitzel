import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { Router } from '@angular/router';
import {AlertController} from "@ionic/angular/standalone";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-quests-info',
  templateUrl: './quests-info.page.html',
  styleUrls: ['./quests-info.page.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
})
export class QuestsInfoPage implements OnInit{
  //erstes true weil quest 1 von anfang an Frei ist
  questStatus: boolean[] = [true , false, false, false];
  private storage: Storage | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
  async ngOnInit() {
    await this.initStorage();
    await this.loadQuestStatus();
  }
  async initStorage() {
    const storage = new Storage();
    await storage.create();
    this.storage = storage;
  }

  async loadQuestStatus() {
    const savedStatus = await this.storage?.get('questStatus');
    if (savedStatus) {
      this.questStatus = savedStatus;
    } else {
      this.questStatus = [true, false, false, false];
    }
  }
  async checkAndNavigate(questNumber: number) {
    await this.loadQuestStatus();
    if (this.questStatus[questNumber - 1]) {
      this.router.navigateByUrl(`/quest${questNumber}`);
    } else {
      const alert = await this.alertController.create({
        cssClass: "Questlockedalert",
        header: 'Quest gesperrt',
        message: 'Diese Quest ist noch nicht freigeschaltet. Beende die vorherigen Quests, um fortzufahren.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
  async completeQuest(questNumber: number) {
    this.questStatus[questNumber - 1] = true;
    await this.storage?.set('questStatus', this.questStatus);
  }
}
