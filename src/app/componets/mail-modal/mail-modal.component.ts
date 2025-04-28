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
import { StepsModalComponent } from '../steps-modal/steps-modal.component';
import { EmailPayload } from '../../models/student';

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
      asunto: [],
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

  openStepsModal(): void {
    this.dialog
      .open(StepsModalComponent, {
        width: '75%',
        height: '85%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: { steps: this.getPasos() },
      })
      .afterClosed()
      .subscribe((obs) => {
        this.getPasos().updateValueAndValidity();
      });
  }

  sendEmail(): void {
    if (this.form.invalid) {
      console.log('form: ', this.form);
      return;
    }

    const emailData: EmailPayload = {
      to: this.form.get('para')?.value,
      subject: this.form.get('asunto')?.value,
      greeting: this.form.get('saludo')?.value,
      message: this.form.get('mensaje')?.value,
      actionDetails: this.form.get('detalles')?.value,
      steps: this.form.get('pasos')?.value,
      recipientName: this.data.completeName,
      senderName: this.form.get('nombreRemitente')?.value,
      senderTitle: this.form.get('tituloRemitente')?.value,
    };

    this.apiService.sendEmail(emailData).subscribe({
      complete: () => {
        this.toastService.success(
          'Se ha enviado el correo electrónico correctamente.',
          'Enviado'
        );
      },
      error: (err) => {
        console.log('Error', err);
        this.toastService.error(
          'Algo salio mal por favor hable con soporte técnico',
          'Error'
        );
      },
    });
  }
}
