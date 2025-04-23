import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student';
@Component({
  selector: 'app-student-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-modal.component.html',
  styleUrl: './student-modal.component.css',
})
export class StudentModalComponent implements OnInit {
  isEdit: boolean = false;
  form: FormGroup = new FormGroup({});
  data = inject<{ id: number }>(MAT_DIALOG_DATA);
  constructor(
    private dialogRef: MatDialogRef<StudentModalComponent>,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: [, Validators.required],
      lastname: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      number: [
        ,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      age: [, [Validators.required]],
    });

    if (this.data.id != 0) {
      this.isEdit = true;
      this.apiService.getStudentById(this.data.id).subscribe({
        next: (data) =>
          this.form.setValue({
            id: data.id,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            number: data.number,
            age: data.age,
          }),
        error: (err) => console.log('Error: ', err),
        complete: () => console.log('Se ha completado con éxito'),
      });
    }
  }

  close() {
    console.log(this.form.value);
    this.dialogRef.close();
  }

  saveOperation() {
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }

    if (!this.isEdit) {
      const data: Student = {
        id: 0,
        name: this.form.get('name')?.value,
        lastname: this.form.get('lastname')?.value,
        email: this.form.get('email')?.value,
        number: Number(this.form.get('number')?.value),
        age: Number(this.form.get('age')?.value),
      };
      console.log('data, ', data);
      this.apiService.createStudent(data).subscribe({
        next: (data) => console.log('next', data),
        error: (err) => console.log('Error: ', err),
        complete: () => console.log('Se ha completado con éxito'),
      });
      this.dialogRef.close();
    } else {
      const data: Student = {
        id: 0,
        name: this.form.get('name')?.value,
        lastname: this.form.get('lastname')?.value,
        email: this.form.get('email')?.value,
        number: Number(this.form.get('number')?.value),
        age: Number(this.form.get('age')?.value),
      };

      this.apiService.updateStudent(this.data.id, data).subscribe({
        next: (data) => console.log('next', data),
        error: (err) => console.log('Error: ', err),
        complete: () => console.log('Se ha completado con éxito'),
      });
      this.dialogRef.close();
    }
  }
}
