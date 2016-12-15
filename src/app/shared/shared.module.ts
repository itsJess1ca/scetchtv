import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdometerModule } from './odometer/odometer.module';
import { Twitch } from './twitch/twitch.model';

@NgModule({
  imports: [
    CommonModule,
    OdometerModule
  ],
  exports: [
    CommonModule,
    OdometerModule
  ],
  providers: [
    Twitch
  ]
})
export class SharedModule { }
