import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quest1Page } from './quest1.page';

describe('Quest1Page', () => {
  let component: Quest1Page;
  let fixture: ComponentFixture<Quest1Page>;

  beforeEach((() => {
    fixture = TestBed.createComponent(Quest1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
