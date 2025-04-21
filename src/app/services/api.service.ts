import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl + `/api/student`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + `/api/student/${id}`);
  }

  createStudent(data: Student): Observable<any> {
    return this.http.post(environment.apiUrl + `/api/student`, data);
  }

  updateStudent(id: number, data: Student): Observable<any> {
    return this.http.put(environment.apiUrl + `/api/student/${id}`, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `/api/student/${id}`);
  }
}
