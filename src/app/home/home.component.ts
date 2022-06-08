import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { arrayUtil } from 'st-utils';

import { RouteDataEnum } from '@model/route-data.enum';
import { User } from '@model/user';
import { UserWithValues } from '@model/user-with-values';
import { trackById } from '@shared/utils/track-by';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cards-container' },
})
export class HomeComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  readonly trackByUser = trackById<UserWithValues>();
  users: readonly UserWithValues[] = this.activatedRoute.snapshot.data[RouteDataEnum.usersWithValues];

  onUserCreated($event: User): void {
    this.users = arrayUtil(this.users, 'id')
      .append({ ...$event, total: 0, totalReceived: 0, totalToReceive: 0 })
      .toArray();
  }

  onUserDeleted($event: User): void {
    this.users = arrayUtil(this.users, 'id').remove($event.id).toArray();
  }

  onUserEdited(idUser: string, user: User): void {
    this.users = arrayUtil(this.users, 'id').update(idUser, user).toArray();
  }
}
