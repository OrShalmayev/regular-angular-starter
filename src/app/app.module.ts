// MODULES
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { StateModule } from '@state/state.module';

// COMPONENTS
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
