import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBvComponent } from './search-bv.component';

describe('SearchBvComponent', () => {
  let component: SearchBvComponent;
  let fixture: ComponentFixture<SearchBvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
