import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './router/custome-serializer';

export const NGRX_MODULES: any[] = [
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
        serializer: CustomSerializer,
    }),
];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...NGRX_MODULES],
    exports: [],
})
export class StateModule {}
