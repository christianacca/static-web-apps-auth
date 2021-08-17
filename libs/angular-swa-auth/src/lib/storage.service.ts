import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: string) {
    window.sessionStorage.setItem(key, value);
  }

  popItem(key: string): string | null {
    const value = this.getItem(key);
    this.removeItem(key);
    return value;
  }

  getItem(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    window.sessionStorage.removeItem(key);
  }
}
