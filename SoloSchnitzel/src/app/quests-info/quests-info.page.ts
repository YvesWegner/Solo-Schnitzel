import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-quests-info',
  templateUrl: './quests-info.page.html',
  styleUrls: ['./quests-info.page.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  // Wichtig, wenn Sie Standalone-Komponenten verwenden
})
export class QuestsInfoPage {
  // Logik für die QuestsInfo-Seite
}
