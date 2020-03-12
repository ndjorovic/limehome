import { Component, OnInit, Input } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss']
})
export class CarouselCardComponent implements OnInit {

  @Input()
  public cardItem: any;
  public imgHref: string;
  constructor(
    private service: MapService,
  ) { }

  ngOnInit() {
    this.service.getImage(this.cardItem).subscribe((res: any) => {
      if (res && res.media.images.available > 0) {
        this.imgHref = res.media.images.items[0].src;
      } else {
        this.imgHref = 'https://download.vcdn.data.here.com/p/d/UGCprod/places/a04fdf7b-14ef-42c1-8591-8602fecc5fc3.jpeg';
      }
    });
  }

  clickOnCard(item) {
    this.service.selectItems(item);
  }

}
