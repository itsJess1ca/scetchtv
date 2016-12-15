import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdometerComponent } from './odometer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OdometerComponent],
  exports: [OdometerComponent]
})
export class OdometerModule { }
