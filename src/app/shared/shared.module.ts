import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './directives/loading.directive';

const components: any[] = [];
const directives: any[] = [
    LoadingDirective
];
const pipes: any[] = [];
const modules: any[] = [];
const exports: any[] = [
    // Components
    ...components,
    // Directives
    ...directives,
    // Pipes
    ...pipes,
    // Modules
    ...modules,
];

@NgModule({
    declarations: [...components, ...directives, ...pipes],
    exports,
    imports: [CommonModule, ...modules],
    providers: []
})
export class SharedModule {}
