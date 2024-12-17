import { Component, Input } from '@angular/core';
import { EducationCentre } from '../../models/education-centre.model';

@Component({
  selector: 'app-centre-card',
  standalone: true,
  template: `
    <div class="card education-centre-card">
      <div class="header">
        <h3>{{ centre.name }}</h3>
        <div class="rating">
          <i class="fas fa-star"></i>
          <span>{{ centre.rating.toFixed(1) }}</span>
        </div>
      </div>
      <div class="details">
        <p class="detail-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ centre.address }}</span>
        </p>
        <p class="detail-item">
          <i class="fas fa-tag"></i>
          <span>{{ centre.type }}</span>
        </p>
        <p class="detail-item">
          <i class="fas fa-phone"></i>
          <span>{{ centre.contact }}</span>
        </p>
        <p class="detail-item">
          <i class="fas fa-location-dot"></i>
          <span>{{ centre.area }} - {{ centre.pincode }}</span>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .education-centre-card {
      border-left: 4px solid var(--primary-color);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background-color: #fff9e6;
      border-radius: 16px;
      font-weight: bold;
    }

    .rating i {
      color: #ffd700;
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--text-color);
    }

    .detail-item i {
      min-width: 20px;
      color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .rating {
        align-self: flex-end;
      }
    }
  `]
})
export class CentreCardComponent {
  @Input() centre!: EducationCentre;
}