import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminate-modal',
  imports: [],
  templateUrl: './eliminate-modal.component.html',
  styleUrl: './eliminate-modal.component.css',
})
export class EliminateModalComponent {
  data = inject<{ completeName: string; id: number }>(MAT_DIALOG_DATA);
  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EliminateModalComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  eliminateStudent() {
    this.apiService.deleteStudent(this.data.id).subscribe({
      next: (data) => console.log('next', data),
      error: (err) => console.log('Error: ', err),
      complete: () => console.log('Se ha completado con éxito'),
    });
    this.dialogRef.close();
  }
}
