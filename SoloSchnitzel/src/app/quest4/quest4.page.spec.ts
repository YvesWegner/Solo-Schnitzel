import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quest4Page } from './quest4.page';

describe('Quest4Page', () => {
  let component: Quest4Page;
  let fixture: ComponentFixture<Quest4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Quest4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
