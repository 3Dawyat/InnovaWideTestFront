import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerFormComponent } from './lawyer-form.component';

describe('LawyerFormComponent', () => {
  let component: LawyerFormComponent;
  let fixture: ComponentFixture<LawyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawyerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
