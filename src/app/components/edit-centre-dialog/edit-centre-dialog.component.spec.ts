import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCentreDialogComponent } from './edit-centre-dialog.component';

describe('EditCentreDialogComponent', () => {
  let component: EditCentreDialogComponent;
  let fixture: ComponentFixture<EditCentreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCentreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCentreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
