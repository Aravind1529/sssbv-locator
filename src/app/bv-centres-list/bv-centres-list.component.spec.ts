import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BvCentresListComponent } from './bv-centres-list.component';

describe('BvCentresListComponent', () => {
  let component: BvCentresListComponent;
  let fixture: ComponentFixture<BvCentresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BvCentresListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BvCentresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
