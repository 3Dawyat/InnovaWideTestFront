import { Component, OnInit } from '@angular/core';
import { HearingListDto } from '../../../Core/Models/hearing.model';
import { HearingService } from '../../../Core/Services/hearing.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hearing-list',
  templateUrl: './hearing-list.component.html',
  styleUrl: './hearing-list.component.css',
})
export class HearingListComponent implements OnInit {
  hearings: HearingListDto[] = [];
  constructor(
    private hearingService: HearingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.hearingService.getHearings().subscribe((data) => {
      this.hearings = data;
    });
  }

  deleteHearing(id: number): void {
    this.hearingService.deleteHearing(id).subscribe(
      (response) => {
        console.log(response);
        if (response.ok) {
          this.toastr.success('Removed Sacssfully', 'Success');
          this.hearings = this.hearings.filter((c) => c.id !== id);
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
