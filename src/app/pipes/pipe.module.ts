import { NgModule } from '@angular/core';

import { CleanAndCapitalizePipe } from './clean-capitalize.pipe';

@NgModule({
  declarations: [CleanAndCapitalizePipe],
  exports: [CleanAndCapitalizePipe]
})
export class PipeModule { }
