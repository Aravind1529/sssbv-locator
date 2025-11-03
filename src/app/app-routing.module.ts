import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './services/auth.guard';
import { SearchFormComponent } from './components/search-form/search-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //main content - locator form 
  { path: 'home', component: AppComponent },
  { path: 'search', component: SearchFormComponent },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }