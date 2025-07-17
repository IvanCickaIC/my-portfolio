import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var Typed: any;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [],
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('typedElement', { static: false }) typedElement!: ElementRef;

  ngAfterViewInit(): void {
    const typedStrings = this.typedElement.nativeElement.getAttribute('data-typed-items').split(',');
    new Typed(this.typedElement.nativeElement, {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
}
