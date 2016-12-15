/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OdometerComponent } from './odometer.component';

describe('OdometerComponent', () => {
  let component: OdometerComponent;
  let fixture: ComponentFixture<OdometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
