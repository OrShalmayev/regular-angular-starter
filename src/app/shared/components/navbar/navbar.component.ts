import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';

import { NgLetDirective } from '@shared/directives/let.directive';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'shared-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetDirective, RouterModule],
})
export class NavbarComponent {
}
