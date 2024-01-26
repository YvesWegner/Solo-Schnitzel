import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private questStatus: boolean[] = [true, true, true, false];

  getQuestStatus(): boolean[] {
    return this.questStatus;
  }

  completeQuest(questNumber: number) {
    this.questStatus[questNumber - 1] = true;
  }
}
