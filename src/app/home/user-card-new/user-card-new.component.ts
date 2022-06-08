import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

import type { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';

import { User } from '@model/user';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-user-card-new',
  templateUrl: './user-card-new.component.html',
  styleUrls: ['../user-card/user-card.component.scss', './user-card-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardNewComponent {
  constructor(private readonly modalService: ModalService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Output() readonly userCreated = new EventEmitter<User>();

  loadingModal = false;

  async openModalNewUser(): Promise<void> {
    this.loadingModal = true;
    const dialogRef = await this.modalService.openLazy<NewUserModalComponent, void, User>(
      () => import('../new-user-modal/new-user-modal.component').then(m => m.NewUserModalComponent),
      {
        width: '300px',
      }
    );
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.userCreated.emit(user);
      }
    });
    this.loadingModal = false;
    this.changeDetectorRef.markForCheck();
  }
}
