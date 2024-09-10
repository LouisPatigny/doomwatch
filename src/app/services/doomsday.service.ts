import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoomsdayService {

  private apiUrl = 'https://prod4-back.isservers.be/louis/';  // Backend URL

  constructor(private http: HttpClient) { }

  getDoomsdayClock(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
