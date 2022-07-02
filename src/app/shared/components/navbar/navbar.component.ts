import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { NgLetDirective } from '@shared/directives/let.directive';
import { globalConstantsToken, IGlobalConstants } from 'src/app/settings';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'shared-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetDirective, RouterModule],
})
export class NavbarComponent {
    constructor(
        @Inject(globalConstantsToken) public globalConstants: IGlobalConstants,
    ){}
}
