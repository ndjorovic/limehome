import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';


declare var H: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public contactListSubs: Subscription;

  @ViewChild('map')
  public mapElement: ElementRef;

  @Input()
  public width: string;

  @Input()
  public height: string;

  public lat: number;
  public lng: number;


  public map: any;
  public carouselItems;
  public selectedItem: any;
  public markers = {};
  public inactiveIcon = new H.map.Icon('../../../assets/icons/home.svg');
  public activeIcon = new H.map.Icon('../../../assets/icons/home_active.svg');


  public constructor(
    private service: MapService
  ) {
    this.contactListSubs = this.service.getSelectedItem().subscribe(res => {
      if (res) {
        const oldSelected = this.selectedItem;
        this.selectedItem = res;
        if (this.carouselItems) {
          this.updateSelectedMarker(this.map, oldSelected, res);
        }
      }
    });
  }

  public ngOnInit() {
    this.lat = 52.51833;
    this.lng = 13.415862;
    this.writeMap();
    this.service.discoverPlace(this.lat, this.lng).subscribe((res: any) => {
      if (res) {
        this.carouselItems = res.results.items;
        this.addMarkersToMap(this.map, this.carouselItems);
      }
    });
  }

  public writeMap() {
    const platform = new H.service.Platform({
      apikey: `${environment.apiKey}`,
    });
    const defaultLayers = platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center: { lat: this.lat, lng: this.lng },
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

  }

  public updateSelectedMarker(map, oldSelected, selected) {
    if (oldSelected) {
      this.markers[oldSelected.id].setIcon(this.inactiveIcon);
    }
    this.markers[selected.id].setIcon(this.activeIcon);
  }

  public addMarkersToMap(map, items) {
    this.markers = [];

    items.forEach((element, index) => {
      if (!this.markers[element.id]) {
        let icon = this.inactiveIcon;
        if (this.selectedItem && this.selectedItem.id === element.id) {
          icon = this.activeIcon;
        }
        const marker = new H.map.Marker({ lat: element.position[0], lng: element.position[1] }, { icon });
        map.addObject(marker);
        this.markers[element.id] = marker;
      }
    });

    for (let id in this.markers) {
      if (items.filter((item) => item.id === id).length === 0) {
        map.removeObject(this.markers[id]);
        delete this.markers[id];
      }
    }
  }

}
