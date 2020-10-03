import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaticLazyComponent } from './static-lazy/static-lazy.component';

const lazyRoutes: Routes = [
  { path: '', component: StaticLazyComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(lazyRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class LazyRoutingModule {
}
