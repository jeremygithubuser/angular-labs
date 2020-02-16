import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Repository } from 'src/app/services/repository';
import { fromEvent, Observable, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-switch-map-example',
  templateUrl: './switch-map-example.component.html',
  styleUrls: ['./switch-map-example.component.css']
})
@Injectable()
export class SwitchMapExampleComponent implements OnInit , OnDestroy {

  public subscription;

  public delay: number;

  public posts: Post[];

  constructor(private repository: Repository) { }

  ngOnInit() {
    const button = document.querySelector('button');

    const clicks$ = fromEvent(button, 'click');

    const delayedObservable = of(true).pipe(delay(100));

    this.subscription = clicks$
      .pipe(
        switchMap(e =>
          delayedObservable
        ),
        switchMap(bool =>
          this.repository.getPosts()
        ),
      )
      .subscribe(posts =>
        this.posts = posts
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
