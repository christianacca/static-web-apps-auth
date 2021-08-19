import { Injectable } from '@angular/core';

/**
 * Abstracts browser sessionStorage api so that it can be replaced as necessary
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(key: string, value: string) {
    window.sessionStorage.setItem(key, value);
  }

  /**
   * Remove the entry associated with the `key` and return it's value
   * @param key
   */
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
