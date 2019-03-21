import { Component, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { filter, tap, switchMap, map, take } from 'rxjs/operators';
import { OfflineBannerService } from './offline-banner.service';

@Component({
  selector: 'offline-banner',
  template: `
    <div class="container">
      <p class="banner offline-banner" *ngIf="(network$ | async) === 'OFFLINE'">
        You are offline. Retrying in {{ countdown$ | async }}sec.
      </p>
      <p class="banner online-banner" *ngIf="(network$ | async) === 'ONLINE' && (onlineMessage$ | async)">
        You are online
      </p>
    </div>
  `,
  styles: [
    `
      .container {
        position: fixed;
        left: 42%;
        right: 23%;
        max-width: 260px;
      }

      .banner {
        margin: auto;
        padding: 8px;
        text-align: center;
      }

      .offline-banner {
        background-color: #f8ecad;
        color: #7c6d1f;
      }

      .online-banner {
        background-color: #d6e9c6;
        color: #468847;
      }
    `
  ]
})
export class OfflineBannerComponent implements OnInit {
  network$ = this.service.networkSubject;
  countdown$: Observable<number>;
  timer = 10;
  onlineMessage$: Observable<boolean> = of(false);
  wentOffline = false;

  constructor(private service: OfflineBannerService) {}

  ngOnInit() {
    this.service.checkHealth();

    this.countdown$ = this.network$.pipe(
      filter(e => e === 'OFFLINE'),
      tap(_ => (this.wentOffline = true)),
      switchMap(e => timer(0, 1000)),
      map(e => this.timer - e)
    );

    this.onlineMessage$ = this.network$.pipe(
      filter(e => e === 'ONLINE' && this.wentOffline),
      switchMap(e => timer(0, 1000).pipe(take(3))),
      tap(_ => (this.wentOffline = false)),
      map(e => (e < 2 ? true : false))
    );
  }
}
