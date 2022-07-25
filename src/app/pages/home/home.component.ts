import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { loaderTypesToken } from '@shared/tokens/loaders.token';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    loaderType = inject(loaderTypesToken);
    constructor() {}
    ngOnInit(): void {
    }
}
