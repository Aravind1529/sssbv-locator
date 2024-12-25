import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBvComponent } from './components/search-bv/search-bv.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent }, //main content - locator form 
  // { path: 'home', component: SearchBvComponent },
  { path: 'search', component: SearchBvComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }