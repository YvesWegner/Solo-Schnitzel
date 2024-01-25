import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { Router } from '@angular/router';
import {AlertController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-quests-info',
  templateUrl: './quests-info.page.html',
  styleUrls: ['./quests-info.page.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
})
export class QuestsInfoPage {
  constructor(private router: Router) {}
  goToQuest1() {
    this.router.navigateByUrl('/quest1');
  }
  goToQuest2() {
    this.router.navigateByUrl('/quest2');
  }
  goToQuest3() {
    this.router.navigateByUrl('/quest3');
  }
  goToQuest4() {
    this.router.navigateByUrl('/quest4');
  }
}
