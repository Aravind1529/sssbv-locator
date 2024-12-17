import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <input
        type="text"
        [(ngModel)]="area"
        placeholder="Enter Area"
        class="input-field"
        (keyup.enter)="onSearch()"
      />
      <input
        type="text"
        [(ngModel)]="pincode"
        placeholder="Enter Pincode"
        class="input-field"
        (keyup.enter)="onSearch()"
      />
      <button (click)="onSearch()" class="btn">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </button>
    </div>
  `,
  styles: [`
    .search-container {
      margin: 20px 0;
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class SearchFormComponent {
  area: string = '';
  pincode: string = '';
  @Output() search = new EventEmitter<{area: string, pincode: string}>();

  onSearch() {
    if (this.area.trim() || this.pincode.trim()) {
      this.search.emit({ area: this.area.trim(), pincode: this.pincode.trim() });
    }
  }
}