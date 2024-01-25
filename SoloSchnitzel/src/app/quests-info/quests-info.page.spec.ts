import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestsInfoPage } from './quests-info.page';

describe('QuestsInfoPage', () => {
  let component: QuestsInfoPage;
  let fixture: ComponentFixture<QuestsInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
