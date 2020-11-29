import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'qarun-qb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QarunQB';
  largeScreen$: Observable<boolean>;

  constructor(private breakpoint: BreakpointObserver) {
    this.largeScreen$ = this.breakpoint.observe('(min-width: 768px)').pipe(map(bp => bp.matches));
  }

  scroll(selector: string) {
    const { top, left } = document.querySelector(selector).getBoundingClientRect();
    window.scroll({
      top,
      left,
      behavior: 'smooth'
    });
  }
}
