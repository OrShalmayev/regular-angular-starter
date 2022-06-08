import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { UserService } from '../../user/user.service';
import type { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';

import { User } from '@model/user';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  constructor(
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly modalService: ModalService
  ) {}

  @Input() name!: string;
  @Input() totalToReceive!: number;

  @Output() readonly deleted = new EventEmitter<void>();
  @Output() readonly edited = new EventEmitter<User>();

  loadingDeleteModal = false;
  loadingEditModal = false;

  async onEdit($event: MouseEvent): Promise<void> {
    this.loadingEditModal = true;
    $event.preventDefault();
    $event.stopPropagation();
    const dialogRef = await this.modalService.openLazy<EditUserModalComponent, string, User>(
      () => import('../edit-user-modal/edit-user-modal.component').then(m => m.EditUserModalComponent),
      { data: this.name }
    );
    dialogRef.afterClosed().subscribe(edited => {
      if (edited) {
        this.edited.emit(edited);
      }
    });
    this.loadingEditModal = false;
    this.changeDetectorRef.markForCheck();
  }

  async onDelete($event: MouseEvent): Promise<void> {
    this.loadingDeleteModal = true;
    $event.preventDefault();
    $event.stopPropagation();
    const dialogRef = await this.confirmDialogService.confirm({
      title: `Delete user ${this.name}`,
      content: `This action can't be undone`,
      buttons: ['Close', { title: 'Delete', action: () => this.userService.delete(this.name) }],
    });
    dialogRef.afterClosed().subscribe(deleted => {
      if (deleted) {
        this.deleted.emit();
      }
    });
    this.loadingDeleteModal = false;
    this.changeDetectorRef.markForCheck();
  }
}
