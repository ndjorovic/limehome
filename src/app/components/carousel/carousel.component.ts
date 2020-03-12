import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChild('card') card: ElementRef;

  @Output() private selectedItems = new EventEmitter<number>();

  @Input()
  public carouselItems: string;

  public cardMarginRight: number;
  public cardCount: number;
  public offset: number;
  public maxX: number;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const carouselWidth = this.carousel.nativeElement.offsetWidth;
    const cardStyle = this.card.nativeElement.currentStyle || window.getComputedStyle(this.card.nativeElement)
    this.cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

    this.cardCount = this.carouselItems.length;

    this.offset = 0;
    this.maxX = -((this.cardCount) * this.card.nativeElement.offsetWidth +
      (this.cardMarginRight * (this.cardCount)) -
      carouselWidth - this.cardMarginRight);
  }


  rightButton() {
    if (this.offset > this.maxX) {
      this.offset -= this.card.nativeElement.offsetWidth + this.cardMarginRight;
      this.carousel.nativeElement.style.transform = `translateX(${this.offset}px)`;
    }
  }

  leftButton() {
    if (this.offset !== 0) {
      this.offset += this.card.nativeElement.offsetWidth + this.cardMarginRight;
      this.carousel.nativeElement.style.transform = `translateX(${this.offset}px)`;
    }
  }

}
