import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'createemployee', component: CreateEmployeeComponent},
  { path: 'list', component: ListEmployeeComponent },
  // { path: 'delete',   component: DeleteEmployeeComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent },
  //{ path: '**',   component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }


