import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quest3Page } from './quest3.page';

describe('Quest3Page', () => {
  let component: Quest3Page;
  let fixture: ComponentFixture<Quest3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Quest3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
