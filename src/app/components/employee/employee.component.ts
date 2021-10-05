
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Employee } from 'src/app/models/employee';

import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    
  }

  getEmployees() {
    console.log(this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      err =>  console.log(err)
    ));
  }

  addEmployee(form: NgForm){
    console.log(form.value);

    if(form.value._id){
      console.log('actualizando registro');
      this.employeeService.putEmployee(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      );

    } else {

      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          console.log(res);
          this.getEmployees();
          form.reset();
        },
        err => console.log(err)
      );
  
    }

  }

  deleteEmployee(id: string) {
    //alert('deleting');
    if (confirm('Are you sure you want to delete it')){
      this.employeeService.deleteEmployee(id).subscribe(
        (res)  => {
          console.log(res);
          this.getEmployees();
        },
        (err) => console.log(err)
      );
    }
    //console.log(res);

  }

  editEmployee(employee: Employee){
    console.log(employee);
    this.employeeService.selectedEmployee= employee;

  }

  resetForm(form: NgForm){
    form.reset();

  }
 


}
