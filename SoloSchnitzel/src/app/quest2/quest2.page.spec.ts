import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quest2Page } from './quest2.page';

describe('Quest2Page', () => {
  let component: Quest2Page;
  let fixture: ComponentFixture<Quest2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Quest2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
