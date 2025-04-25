import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Student } from './models/student';
import { StudentModalComponent } from './componets/student-modal/student-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminateModalComponent } from './componets/eliminate-modal/eliminate-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MailModalComponent } from './componets/mail-modal/mail-modal.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ApiGoFront';
  data: Student[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe({
      next: (data) => (this.data = data),
      error: (err) => {
        console.log('Error: ', err);
        this.toasterService.error(
          'Algo salio mal por favor contacta a servicio técnico',
          'Error'
        );
      },
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
          error: (err) => {
            console.log('Error: ', err);
            this.toasterService.error(
              'Algo salio mal por favor contacta a servicio técnico',
              'Error'
            );
          },
        });
      });
  }

  eliminateModal(name: string, lastname: string, id: number) {
    this.dialog
      .open(EliminateModalComponent, {
        width: '70%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          completeName: name + ' ' + lastname,
          id: id,
        },
      })
      .afterClosed()
      .subscribe((obs) => {
        this.apiService.getStudents().subscribe({
          next: (data) => (this.data = data),
          error: (err) => {
            console.log('Error: ', err);
            this.toasterService.error(
              'Algo salio mal por favor contacta a servicio técnico',
              'Error'
            );
          },
        });
      });
  }
  emailModal(name: string, lastname: string, email: string) {
    this.dialog.open(MailModalComponent, {
      width: '75%',
      height: '85%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        completeName: name + ' ' + lastname,
        email: email,
      },
    });
  }
}
