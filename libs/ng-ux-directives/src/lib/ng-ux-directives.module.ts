import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandOnHoverDirective } from './expand-on-hover.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ExpandOnHoverDirective],
  exports: [ExpandOnHoverDirective]
})
export class NgUxDirectivesModule {}
