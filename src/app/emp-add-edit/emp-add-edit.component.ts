import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  
  empForm:FormGroup;

  education : string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]
  constructor(
    private fb:FormBuilder,
    private empService:EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private _coreService : CoreService
    ) { 
    this.empForm = this.fb.group({
     firstName:'',
     lastName:'',
     email:'',
     dob:'',
     gender:'',
     education:'',
     company:'',
    });

  }
  onFormSubmit(){
    if(this.data){
      if(this.empForm.valid){
        this.empService.editEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee updated', 'done')
            this.dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        })
    }
    }else{
      if(this.empForm.valid){
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee added', 'done')
            this.dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        })
    }
    
  }
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

}
