import { NgModule } from '@angular/core';

import { LazyRoutingModule } from './lazy-routing.module';
import { StaticLazyComponent } from './static-lazy/static-lazy.component';

@NgModule({
    imports: [
        LazyRoutingModule
    ],
    declarations: [
        StaticLazyComponent
    ],
})

export class LazyModule {
}
