import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {

  constructor(public dialogRef: MatDialogRef<ModelComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onLogout(): void {
    this.dialogRef.close(true);
  }
}
