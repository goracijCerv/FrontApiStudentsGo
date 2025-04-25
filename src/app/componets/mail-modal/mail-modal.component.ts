import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mail-modal',
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './mail-modal.component.html',
  styleUrl: './mail-modal.component.css',
})
export class MailModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  data = inject<{ completeName: string; email: string }>(MAT_DIALOG_DATA);
  constructor(
    private dialogRef: MatDialogRef<MailModalComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      para: [this.data.email],
      asunto: [, Validators.required],
      saludo: [],
      mensaje: [, Validators.required],
      detalles: [],
      pasos: this.fb.array([]),
      nombreRemitente: [],
      tituloRemitente: [],
    });
  }

  getPasos() {
    return this.form.get('pasos') as FormArray;
  }

  close() {
    this.dialogRef.close();
  }

  // openStepsModal(): void {
  //   this.dialog.open( ,{

  //   })
  // }
}
