import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CaseDto } from '../../../Core/Models/case.model';
import { CaseService } from '../../../Core/Services/case.service';
import { HearingService } from '../../../Core/Services/hearing.service';
import { HearingDto } from '../../../Core/Models/hearing.model';
import { LawyerDto } from '../../../Core/Models/lawyer.model';
import { LawyerService } from '../../../Core/Services/lawyer.service';

@Component({
  selector: 'app-hearing-form',
  templateUrl: './hearing-form.component.html',
  styleUrl: './hearing-form.component.css',
})
export class HearingFormComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.minLength(3), Validators.required]),
    decision: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    caseId: new FormControl(null, [Validators.required]),
    lawyerId: new FormControl(null, [Validators.required]),
  });

  id: number = 0;
  cases: CaseDto[] = [];
  lawyers: LawyerDto[] = [];
  date=new Date(); ;

  constructor(
    private caseService: CaseService,
    private lawyerService: LawyerService,

    private hearingService: HearingService,

    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    var data: any = this.caseService.getCases().subscribe((data) => {
      this.cases = data;
    });
    var data: any = this.lawyerService.getLawyers().subscribe((data) => {
      this.lawyers = data;
    });

    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      if (params['id']) {
        this.id = params['id'];
        this.hearingService.getHearing(this.id).subscribe((data) => {
          this.formData.patchValue(data);
          this.date=data.date;
          console.log(this.formData);
        });
      }
    });
  }
  onSubmit(formData: FormGroup) {
    var hearingDto: HearingDto = {
      caseId: formData.value.caseId,
      lawyerId: formData.value.lawyerId,
      date: formData.value.date,
      decision: formData.value.decision,
    };
    if (this.id > 0) {
      this.hearingService.updateHearing(this.id, hearingDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Updates Sacssfully', 'Success');
            this.router.navigate(['/hearings']);
          } else {
            this.toastr.error('An Error Has Occured', 'Error');
          }
        },
        (error) => {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      );
    } else {
      this.hearingService.createHearing(hearingDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Added Sacssfully', 'Success');
            this.router.navigate(['/hearings']);
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
