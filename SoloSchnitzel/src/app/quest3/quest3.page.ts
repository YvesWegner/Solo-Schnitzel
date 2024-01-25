import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quest3',
  templateUrl: './quest3.page.html',
  styleUrls: ['./quest3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
