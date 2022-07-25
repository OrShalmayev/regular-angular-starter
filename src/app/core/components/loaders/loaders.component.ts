import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { isThisSecond } from 'date-fns';

@Component({
    selector: 'app-loaders',
    templateUrl: './loaders.component.html',
    styleUrls: ['./loaders.component.scss'],
})
export class LoadersComponent implements OnInit, AfterViewInit {
    @ViewChild('loader1') loader1!: TemplateRef<any>;
    @ViewChild('loader2') loader2!: TemplateRef<any>;
    @ViewChild('default') default!: TemplateRef<any>;
    @Input('loaderToActivate') loaderToActivate: any;

    constructor(
        private vcRef: ViewContainerRef,
    ) {}
    ngAfterViewInit(): void {
        switch (this.loaderToActivate) {
            case 'loader1':
                this.vcRef.createEmbeddedView(this.loader1)
                break;
            case 'loader2':
                this.vcRef.createEmbeddedView(this.loader2)
                break;
            default:
                this.vcRef.createEmbeddedView(this.default)
                break;
        }
    }

    ngOnInit(): void {

    }
}
