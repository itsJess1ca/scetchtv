import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-odometer',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OdometerComponent {
  @HostBinding('class') classList: string = 'odometer odometer-theme-minimal';
  @HostBinding('innerText')
  @Input() value: string;
}
