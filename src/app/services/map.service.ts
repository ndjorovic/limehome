import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public placeItem = new BehaviorSubject(null);

  constructor(
    private _http: HttpClient
  ) { }

  public discoverPlace(lat: number, lng: number) {

    const parameters = {
      at: `${lat},${lng}`,
      cat: 'accommodation',
      pois: 'true',
      apiKey: `${environment.apiKey}`
    };
    return this._http.get(`${environment.apiUrl}/discover/explore`, { params: parameters });
  }

  public getImage(item) {
    return this._http.get(`${item.href}`);
  }

  getSelectedItem(): Observable<any> {
    return this.placeItem.asObservable();
  }

  selectItems(item) {
    this.placeItem.next(item);
  }
}
