import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy{

  empList:Employee[]=[];
  dataSource!:MatTableDataSource<Employee>;
  displayedColumns:string[]=['id','name','surname','email', 'role', 'pipi', 'action']
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private service:EmployeeService){

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.GetAllEmployee();
  }

  GetAllEmployee(){
    let sub = this.service.GetAll().subscribe(item=>{
      this.empList=item;
      this.dataSource=new MatTableDataSource(this.empList);
    })
    this.subscription.add(sub);
  }

  addemployee(){
    this.openpopup(0);
  }

  DeleteEmployee(empId: number){
    if(confirm('Are you sure?')){
      let sub = this.service.Delete(empId).subscribe(item => {
        this.GetAllEmployee();
      })
      this.subscription.add(sub)
    }
  }

  EditEmployee(empId:number){
    this.openpopup(empId);
  }

  openpopup(empid:number){
    this.dialog.open(AddEmployeeComponent,{
      width: '50%',
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '300ms',
      data:{
        'code': empid
      }
    }).afterClosed().subscribe(o=>{
      this.GetAllEmployee();
    });
  }

}
