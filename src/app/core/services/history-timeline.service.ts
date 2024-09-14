import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoomsdayHistoryService {

  private historyUrl = '/json/doomsday-history.json';  // Path to the JSON file

  constructor(private http: HttpClient) {}

  // Method to fetch the history of the Doomsday Clock
  getDoomsdayHistory(): Observable<any> {
    return this.http.get<any>(this.historyUrl);
  }
}
