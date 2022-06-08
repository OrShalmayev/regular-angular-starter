import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UserService } from '../../user/user.service';

import { catchAndThrow } from '@shared/utils/catch-and-throw';
import { UniqueUserIdValidatorFactory } from '@shared/validation/unique-user-id-validator-factory';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
})
export class NewUserModalComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<NewUserModalComponent>,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly uniqueUserIdValidatorFactory: UniqueUserIdValidatorFactory,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

  readonly form = this.formBuilder.group({
    name: this.formBuilder.control('', {
      asyncValidators: [this.uniqueUserIdValidatorFactory.create(this.changeDetectorRef)],
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z][-_a-zA-Z\d]{1,28}[a-zA-Z\d]$/),
      ],
    }),
  });
  readonly nameControl = this.form.controls.name;

  saving = false;

  onSave(): void {
    if (this.form.invalid) {
      return;
    }
    this.matDialogRef.disableClose = true;
    this.saving = true;
    this.form.disable();
    const formValue = this.form.getRawValue();
    this.userService
      .create({ id: formValue.name })
      .pipe(
        catchAndThrow(() => {
          this.matDialogRef.disableClose = false;
          this.saving = false;
          this.form.enable();
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe(user => {
        this.matDialogRef.close(user);
      });
  }
}
