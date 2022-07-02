// MODULES
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

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
