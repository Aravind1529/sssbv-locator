import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private expiryKey = 'token_expiry';
  private sessionDuration = 15 * 60 * 1000; // 15 minutes in ms
  private logoutTimer?: Subscription;

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());
  constructor(private http: HttpClient, private router: Router) {
    this.startSessionWatcher();
  }

  setSession(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const expiry = Date.now() + this.sessionDuration;
    localStorage.setItem(this.expiryKey, expiry.toString());
    this.startSessionWatcher();
  }

  private startSessionWatcher() {
    if (this.logoutTimer) this.logoutTimer.unsubscribe();

    this.logoutTimer = interval(1000 * 60).subscribe(() => { // check every 1 min
      const expiry = Number(localStorage.getItem(this.expiryKey));
      if (expiry && Date.now() > expiry) {
        this.logout();
      }
    });
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expiry = Number(localStorage.getItem(this.expiryKey));
    return !!token && Date.now() < expiry;
  }

  logout() {
    this.clearLocalStorage();
    this.isLoggedIn$.next(false);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  clearLocalStorage() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiryKey);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }
}
