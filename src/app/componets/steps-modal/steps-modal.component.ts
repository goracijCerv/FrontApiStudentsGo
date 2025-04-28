import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-steps-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './steps-modal.component.html',
  styleUrl: './steps-modal.component.css',
})
export class StepsModalComponent implements OnInit {
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StepsModalComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      steps: this.data.steps, // <-- wrap FormArray inside FormGroup
    });
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }
  addStep(): void {
    this.steps.push(this.fb.control(''));
  }

  removeSteps(index: number): void {
    this.steps.removeAt(index);
  }

  close() {
    this.dialogRef.close();
  }
}
