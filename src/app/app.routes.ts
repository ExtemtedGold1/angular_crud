import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    { path:'', redirectTo: 'employee', pathMatch: 'full' },
    { path:'employee', component:EmployeeComponent },
];
