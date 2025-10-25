import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBvComponent } from './components/search-bv/search-bv.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //main content - locator form 
  { path: 'home', component: AppComponent },
  { path: 'search', component: SearchBvComponent },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }