import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {
  drive: any;
  newDrive = { date: '', vaccine: '', dosesAvailable: null };

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDrive();
  }

  fetchDrive() {
    this.http.get<any>('http://localhost:5000/api/drive').subscribe(data => this.drive = data);
  }

  createDrive() {
    this.http.post('http://localhost:5000/api/drive', this.newDrive).subscribe(() => {
      this.fetchDrive();
      this.newDrive = { date: '', vaccine: '', dosesAvailable: null };
    });
  }
}
