import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quest4',
  templateUrl: './quest4.page.html',
  styleUrls: ['./quest4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest4Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
