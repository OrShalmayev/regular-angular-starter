import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadersComponent } from '@core/components/loaders/loaders.component';

export enum ELoaderTypes {
    default = 'default',
    table = 'table',
    loader1 = 'loader1',
}

export type TLoaderTypes = ELoaderTypes;

@Directive({
    selector: '[ifNotLoading]',
})
export class LoadingDirective implements OnChanges, OnInit {
    @Input('ifNotLoadingLoaderType') loaderType!: TLoaderTypes;
    @Input('ifNotLoading') loading!: boolean;
    private isInitialized = false;

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.isInitialized) {
            return;
        }
        this.handleCreateAndDestroyByLoadingState();
    }

    ngOnInit(): void {
        this.isInitialized = true;
        this.handleCreateAndDestroyByLoadingState();
    }

    private handleCreateAndDestroyByLoadingState() {
        this.vcRef.clear();

        if (this.loading) {
            this.vcRef.createComponent(LoadersComponent).instance.loaderToActivate = this.loaderType;
        } else {
            // embed the contents of the host template
            this.vcRef.createEmbeddedView(this.templateRef);
        }
    }
}
