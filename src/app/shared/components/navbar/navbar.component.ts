import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RouterQuery } from '@stlmpp/router';
import { NgLetModule } from '@stlmpp/utils';

import { RouteParamEnum } from '@model/route-param.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetModule, RouterModule],
})
export class NavbarComponent {
  constructor(private readonly routerQuery: RouterQuery) {}

  readonly idUser$ = this.routerQuery.selectParams(RouteParamEnum.idUser);
  isMouseOver = false;
}
