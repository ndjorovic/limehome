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
    // return new Observable(
    //   (observer) => observer.next(
    //     'https://places.download.vcdn.data.here.com/public/convert?uri=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F08%2Fbc%2F75%2F2f%2Fholiday-inn-express-belgrade.jpg&key=25CC05976F83417569AA318184B7EDCB&height=600&width=600'
    //   )
    // );
  }

  getSelectedItem(): Observable<any> {
    return this.placeItem.asObservable();
  }

  selectItems(item) {
    this.placeItem.next(item);
  }
}
