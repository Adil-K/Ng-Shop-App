import { Component, Input } from '@angular/core';

@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.component.html',
})
export class SandboxComponent {
  @Input() type = 'danger';

  title = 'Sandbox';
  model: any = {};
  types: any = ['standard', 'advanced'];
  onSubmit() {
    console.log('submit', this.model);
  }
}
