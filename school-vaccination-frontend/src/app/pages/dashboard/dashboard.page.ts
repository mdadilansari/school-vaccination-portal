import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
 totalStudents: number = 0;
  registeredStudents: number = 0;
  upcomingDrives: any[] = [];
  drive: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.fetchDrive();
  }

  // Function to get dashboard data
  getDashboardData(): void {
    // Fetch all students data from the API
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(response => {
      this.totalStudents = response.length;

      // Count the number of students who are registered for drives (enrolledInDrive = true)
      this.registeredStudents = response.filter(student => student.enrolledInDrive).length;

      // Assuming that an upcoming drive is indicated by the date of vaccination or a scheduled drive date (if present)
      // this.upcomingDrives = response.filter(student => student.vaccinations.some(vaccine => new Date(vaccine.dateAdministered) > new Date())).length;
    });
  }

  // fetchUpcomingDrives() {
  //   this.http
  //     .get<any>('http://localhost:5000/api/drive')
  //     .subscribe((data) => (this.upcomingDrives = data));
  // }

  fetchDrive() {
    this.http
      .get<any>('http://localhost:5000/api/drive')
      .subscribe((data) => (this.drive = data));
  }

  //  fetchUpcomingDrives(): void {
  //   this.http.get<any[]>('http://localhost:5000/api/drive').subscribe(
  //     (drives) => {
  //       this.upcomingDrives = drives;
  //     },
  //     (error) => {
  //       console.error('Error fetching upcoming drives', error);
  //     }
  //   );
  // }


}
