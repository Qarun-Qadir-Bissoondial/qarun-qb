import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIcon } from './button-icon/button-icon.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ButtonIcon],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [ButtonIcon]
})
export class UiCommonModule {}
