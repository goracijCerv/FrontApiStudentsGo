import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Student } from './models/student';
import { StudentModalComponent } from './componets/student-modal/student-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ApiGoFront';
  data: Student[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe({
      next: (data) => (this.data = data),
      error: (err) => console.log('Error: ', err),
      complete: () => console.log('Se ha completado con éxito'),
    });
  }

  studentModal(id: number) {}
}
