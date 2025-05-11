import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'students-information-page',
  templateUrl: './students-information.page.html',
  styleUrls: ['./students-information.page.scss']
})
export class StudentsInformationPage {

  drive: any;
  driveId: string = '';
  students: any[] = [];
  vaccinationOptions = ['TT', 'Measles'];

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'info' | 'warning' = 'success';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.http.get<any>('http://localhost:5000/api/drive').subscribe(data => {
      this.drive = data;
      this.driveId = data._id;
    });
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(data => {
      this.students = data;
    });
  }

  addStudent(student: any) {
    const vaccinations = student.vaccinations.includes('None') ? [] : student.vaccinations;
    const payload = { ...student, vaccinations };

    this.http.post('http://localhost:5000/api/students', payload).subscribe(() => {
      this.fetchStudents();
      this.showAlert('Student added successfully!', 'success');
    });
  }

  deleteStudent(studentId: string) {
    this.http.delete(`http://localhost:5000/api/students/${studentId}`).subscribe(() => {
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

    this.http.put(`http://localhost:5000/api/drive/${this.driveId}/enroll`, { studentId })
      .subscribe({
        next: () => {
          this.showAlert('Student enrolled in drive!', 'success');
          this.fetchStudents();
          this.http.get<any>('http://localhost:5000/api/drive').subscribe((data) => {
            this.drive = data;
          });
        },
        error: () => this.showAlert('Student is already enrolled in the drive!', 'warning'),
      });
  }

  showAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = null), 3000);
  }

  handleExcelUpload(formData: FormData) {

    this.http.post('http://localhost:5000/api/students/import', formData).subscribe({
      next: (res: any) => {
        this.showAlert('Students imported successfully!', 'info');
        this.fetchStudents();
      },
      error: (err) => {
       this.showAlert('Upload failed', 'danger');
      }
    });
  }

}
