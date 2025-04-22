import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Student } from './models/student';
import { StudentModalComponent } from './componets/student-modal/student-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ApiGoFront';
  data: Student[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe({
      next: (data) => (this.data = data),
      error: (err) => console.log('Error: ', err),
      complete: () => console.log('Se ha completado con éxito'),
    });
  }

  studentModal(id: number) {
    this.dialog
      .open(StudentModalComponent, {
        width: '70%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          id: id,
        },
      })
      .afterClosed()
      .subscribe((obs) => {
        this.apiService.getStudents().subscribe({
          next: (data) => (this.data = data),
          error: (err) => console.log('Error: ', err),
          complete: () => console.log('Se ha completado con éxito'),
        });
      });
  }
}
