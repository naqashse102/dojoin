import { NgModule } from '@angular/core';

import { MaterialModule } from './modules/material.modules';
import { DigitOnly } from './directives/digitOnly.directive';

@NgModule({
  imports: [
    MaterialModule,
  ],
  declarations: [
    // OnlyNumeric
  ],
  exports: [
    MaterialModule,
  ]
})

export class SharedModule {
}
