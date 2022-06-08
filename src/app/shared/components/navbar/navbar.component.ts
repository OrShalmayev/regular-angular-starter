import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';

import { RouteParamEnum } from '@model/route-param.enum';
import { NgLetDirective } from '@shared/directives/let.directive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetDirective, RouterModule],
})
export class NavbarComponent {
    constructor(private readonly activatedRoute: ActivatedRoute) {}

    readonly idUser$ = this.activatedRoute.params.pipe(
        tap(_ => {
            debugger;
        }),
        map(params => params[RouteParamEnum.idUser])
    );
    isMouseOver = false;
}
