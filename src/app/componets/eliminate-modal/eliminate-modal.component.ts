import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private dialogRef: MatDialogRef<EliminateModalComponent>,
    private toasterService: ToastrService
  ) {}

  close() {
    this.dialogRef.close();
  }

  eliminateStudent() {
    this.apiService.deleteStudent(this.data.id).subscribe({
      error: (err) =>
        this.toasterService.error(
          'Ha ocurrido un error, por favor contacte a soporte',
          'Error'
        ),
      complete: () =>
        this.toasterService.success('Se ha eliminado correctamente', 'Éxito'),
    });
    this.dialogRef.close();
  }
}
