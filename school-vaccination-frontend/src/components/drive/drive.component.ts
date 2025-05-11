import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'],
})
export class DriveComponent implements OnInit {
  drive: any;
  newDrive = { date: '', vaccine: '', dosesAvailable: null };

  constructor(private readonly http: HttpClient) {}

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'info' = 'success';

  ngOnInit(): void {
    this.fetchDrive();
  }

  fetchDrive() {
    this.http
      .get<any>('http://localhost:5000/api/drive')
      .subscribe((data) => (this.drive = data));
  }

  createDrive() {
    this.http
      .post('http://localhost:5000/api/drive', this.newDrive)
      .subscribe(() => {
        this.fetchDrive();
        this.newDrive = { date: '', vaccine: '', dosesAvailable: null };
        this.showAlert('Drive created successfully!', 'success');
      });
  }

  deleteDrive(driveId: string) {
    this.http
      .delete(`http://localhost:5000/api/drive/${driveId}`)
      .subscribe(() => {
        this.fetchDrive();
        this.showAlert('Drive deleted.', 'danger');
      });
  }

  showAlert(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = null), 3000);
  }
}
