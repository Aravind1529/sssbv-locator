import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  area: string = '';
  pincode: string = '';
  @Output() search = new EventEmitter<{area: string, pincode: string}>();

  onSearch() {
    if (this.area?.trim() || this.pincode.trim()) {
      this.search.emit({ area: this.area?.trim(), pincode: this.pincode.trim() });
    }
  }
}