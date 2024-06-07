import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../../Core/Services/case.service';
import { CaseDto } from '../../../Core/Models/case.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css'],
})
export class CaseListComponent implements OnInit {
  cases: CaseDto[] = [];

  constructor(
    private caseService: CaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.caseService.getCases().subscribe((data) => {
      this.cases = data;
    });
  }

  deleteCase(id: number): void {
    this.caseService.deleteCase(id).subscribe(
      (response) => {
        console.log(response);
        if (response.ok) {
          this.toastr.success('Removed Sacssfully', 'Success');
          this.cases = this.cases.filter((c) => c.id !== id);
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
