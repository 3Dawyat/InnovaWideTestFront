import { Component, OnInit } from '@angular/core';
import { LawyerDto } from '../../Core/Models/lawyer.model';
import { LawyerService } from '../../Core/Services/lawyer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lawyer-list',
  templateUrl: './lawyer-list.component.html',
  styleUrl: './lawyer-list.component.css',
})
export class LawyerListComponent implements OnInit {
  lawyers: LawyerDto[] = [];

  constructor(
    private lawyerService: LawyerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.lawyerService.getLawyers().subscribe((data) => {
      this.lawyers = data;
    });
  }

  deleteLawyer(id: number): void {
    this.lawyerService.deleteLawyer(id).subscribe(
      (response) => {
        console.log(response);
        if (response.ok) {
          this.toastr.success('Removed Sacssfully', 'Success');
          this.lawyers = this.lawyers.filter((c) => c.id !== id);
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
