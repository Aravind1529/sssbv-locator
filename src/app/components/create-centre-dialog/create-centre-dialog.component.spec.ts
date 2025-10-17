import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCentreDialogComponent } from './create-centre-dialog.component';

describe('CreateCentreDialogComponent', () => {
  let component: CreateCentreDialogComponent;
  let fixture: ComponentFixture<CreateCentreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCentreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCentreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
