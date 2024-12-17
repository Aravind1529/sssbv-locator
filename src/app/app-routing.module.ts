import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBvComponent } from './search-bv/search-bv.component';

const routes: Routes = [
  { path: '', component: SearchBvComponent },
  { path: 'search', component: SearchBvComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }