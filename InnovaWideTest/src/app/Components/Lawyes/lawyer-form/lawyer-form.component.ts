import { Component, OnInit } from '@angular/core';
import { LawyerService } from '../../../Core/Services/lawyer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyerDto } from '../../../Core/Models/lawyer.model';

@Component({
  selector: 'app-lawyer-form',
  templateUrl: './lawyer-form.component.html',
  styleUrl: './lawyer-form.component.css',
})
export class LawyerFormComponent {
  formData: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.required]),
    position: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    mobile: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    address: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  id: number = 0;
  constructor(
    private lawyerService: LawyerService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(formData: FormGroup) {
    var caseDto: LawyerDto = {
      id: this.id,
      name: formData.value.name,
      position: formData.value.position,
      mobile: formData.value.mobile,
      address: formData.value.address,
    };
    if (this.id > 0) {
      this.lawyerService.updateLawyer(this.id, caseDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Updates Sacssfully', 'Success');
            this.router.navigate(['/lawyers']);
          } else {
            this.toastr.error('An Error Has Occured', 'Error');
          }
        },
        (error) => {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      );
    } else {
      this.lawyerService.createLawyer(caseDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Added Sacssfully', 'Success');
            this.router.navigate(['/lawyers']);
          } else {
            this.toastr.error('An Error Has Occured', 'Error');
          }
        },
        (error) => {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      );
    }
  }
}
