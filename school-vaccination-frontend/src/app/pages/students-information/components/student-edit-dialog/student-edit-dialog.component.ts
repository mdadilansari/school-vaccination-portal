import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
})
export class StudentEditDialogComponent {
  editForm: FormGroup;

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'info' = 'success';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<StudentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      studentId: [data.studentId, Validators.required],
      name: [data.name, Validators.required],
      age: [data.age, Validators.required],
      class: [data.class, Validators.required],
      dateOfBirth: [data.dateOfBirth, Validators.required],
    });
  }

  onSave() {
  const formValue = this.editForm.value;
  this.http.put(`http://localhost:5000/api/students/${this.data.studentId}`, formValue).subscribe({
    next: (res) => {
      this.dialogRef.close(res);
      this.showAlert('Student updated successfully.', 'success');
    },
    error: (err) => {
      this.showAlert('Update failed: ' + err.error.message, 'danger');
    }
  });
}

showAlert(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => (this.alertMessage = null), 3000);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
