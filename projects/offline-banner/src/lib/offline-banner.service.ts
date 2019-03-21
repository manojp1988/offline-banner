import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UrlConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineBannerService {
  public networkSubject = new BehaviorSubject<string>('TRYING');
  interval$ = timer(0, 10000);

  constructor(private http: HttpClient, @Inject(UrlConfigService) private url) {}

  checkHealth() {
    this.interval$
      .pipe(
        tap(() => this.networkSubject.next('TRYING')),
        switchMap(_ =>
          this.http.get(this.url, { responseType: 'text' }).pipe(
            catchError(err => {
              return of('Offline');
            })
          )
        )
      )
      .subscribe(e => {
        if (e === 'Offline') {
          this.networkSubject.next('OFFLINE');
        } else {
          this.networkSubject.next('ONLINE');
        }
      });
  }
}
