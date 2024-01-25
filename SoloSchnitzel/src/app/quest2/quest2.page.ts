import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quest2',
  templateUrl: './quest2.page.html',
  styleUrls: ['./quest2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Quest2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
