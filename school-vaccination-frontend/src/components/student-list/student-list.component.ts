import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  drive: any;
  driveId: string = '';
  students: any[] = [];
  newStudent: {
    name: string;
    class: string;
    dateOfBirth: string;
    vaccinations: string[];
  } = {
    name: '',
    class: '',
    dateOfBirth: '',
    vaccinations: []
  };

  vaccinationOptions = ['TT', 'Measles', 'None'];

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'info' | 'warning' = 'success';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.http.get<any>('http://localhost:5000/api/drive').subscribe((data) => {
      this.drive = data;
      this.driveId = data._id;
    });
  }

  fetchStudents() {
    this.http
      .get<any[]>('http://localhost:5000/api/students')
      .subscribe((data) => (this.students = data));
  }

  showAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = null), 3000);
  }

  addStudent() {
    const vaccinations = this.newStudent.vaccinations.includes('None')
      ? []
      : this.newStudent.vaccinations;

    const studentPayload = { ...this.newStudent, vaccinations };

    this.http
      .post('http://localhost:5000/api/students', studentPayload)
      .subscribe(() => {
        this.fetchStudents();
        this.newStudent = {
          name: '',
          class: '',
          dateOfBirth: '',
          vaccinations: [],
        };
        this.showAlert('Student added successfully !', 'success');
      });
  }

  deleteStudent(id: string) {
    this.http
      .delete(`http://localhost:5000/api/students/${id}`)
      .subscribe(() => {
        this.fetchStudents();
        this.showAlert('Student deleted.', 'danger');
      });
  }

  enrollStudent(studentId: string) {
    const alreadyEnrolled = this.drive?.enrolledStudents?.includes(studentId);

    if (alreadyEnrolled) {
      this.showAlert('Student is already enrolled in the drive.', 'info');
      return;
    }

    this.http
      .put(`http://localhost:5000/api/drive/${this.driveId}/enroll`, {
        studentId,
      })
      .subscribe({
        next: () => {
          this.showAlert('Student enrolled in drive!', 'success');
          this.fetchStudents();

          // Refresh the drive data to update enrolled students
          this.http
            .get<any>('http://localhost:5000/api/drive')
            .subscribe((data) => {
              this.drive = data;
            });
        },
        error: () => this.showAlert('Student is already enrolled in the drive !', 'warning'),
      });
  }
}
