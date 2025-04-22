import { Component } from '@angular/core';

@Component({
  selector: 'app-student-modal',
  imports: [],
  templateUrl: './student-modal.component.html',
  styleUrl: './student-modal.component.css',
})
export class StudentModalComponent {
  isEdit: boolean = false;
}
