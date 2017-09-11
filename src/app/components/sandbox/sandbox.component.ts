import { Component, Input } from '@angular/core';

@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.component.html',
})
export class SandboxComponent {
  title = 'Sandbox';
  @Input() type = 'danger';
}
