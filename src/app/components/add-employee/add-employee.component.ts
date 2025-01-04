import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,MatInputModule,
    MatButtonModule, MatSelectModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  constructor(private service:EmployeeService, private ref:MatDialogRef<AddEmployeeComponent>){}

  title='Add Employee';
  empForm= new FormGroup({
    id:new FormControl(0),
    name:new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    email:new FormControl('', Validators.required),
    role:new FormControl('', Validators.required),
    pipi:new FormControl(0, Validators.required),
  })

  SaveEmployee(){
    if(this.empForm.valid){
        let _data: Employee={
          id: this.empForm.value.id as number,
          name: this.empForm.value.name as string,
          surname: this.empForm.value.surname as string,
          email: this.empForm.value.email as string,
          role: this.empForm.value.role as string,
          pipi: this.empForm.value.pipi as number,
        }
        this.service.Create(_data).subscribe(item=>{
          alert('saved');
          this.closepopup();
        });
    }
  }

  closepopup(){
    this.ref.close();
  }

}
