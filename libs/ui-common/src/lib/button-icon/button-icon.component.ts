import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class ButtonIcon {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary'
  @Input() iconPosition: 'before' | 'after' = 'after';
}
