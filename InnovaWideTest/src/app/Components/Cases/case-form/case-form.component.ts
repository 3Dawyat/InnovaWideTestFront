import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from '../../../Core/Services/case.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseDto } from '../../../Core/Models/case.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrl: './case-form.component.css',
})
export class CaseFormComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    number: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    year: new FormControl(null, [Validators.minLength(3), Validators.required]),
    litigationDegree: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    finalVerdict: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  id: number = 0;
  constructor(
    private caseService: CaseService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      if (params['id']) {
        this.id = params['id'];
        this.caseService.getCase(this.id).subscribe((data) => {
          this.formData.patchValue(data);
        });
      }
    });
  }
  onSubmit(formData: FormGroup) {
    var caseDto: CaseDto = {
      id: this.id,
      name: formData.value.name,
      number: formData.value.number,
      year: formData.value.year,
      litigationDegree: formData.value.litigationDegree,
      finalVerdict: formData.value.finalVerdict,
    };
    if (this.id > 0) {
      this.caseService.updateCase(this.id, caseDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Updates Sacssfully', 'Success');
            this.router.navigate(['/cases']);
          } else {
            this.toastr.error('An Error Has Occured', 'Error');
          }
        },
        (error) => {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      );
    } else {
      this.caseService.createCase(caseDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Added Sacssfully', 'Success');
            this.router.navigate(['/cases']);
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
