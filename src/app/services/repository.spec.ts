// Straight Jasmine testing without Angular's testing support
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Repository } from './repository';
import { Subject } from 'rxjs';
import { Post } from '../models/post';
describe('Repository', () => {

  const posts = [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat',
      body: 'quia et suscipit'
    } as Post,
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore'
    } as Post,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Repository]
    });
  });

  it('getPosts should return the posts',
    inject(
      [HttpTestingController, Repository],
      (
        httpMock: HttpTestingController,
        repository: Repository
      ) => {

        const expected = posts;

        const  observable = repository.getPosts();

        observable.subscribe((p: Post[]) => {
          expect(p).toEqual(expected);
        });

        const mockReq = httpMock.expectOne(repository.postUrl);

        expect(mockReq.cancelled).toBeFalsy();

        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(posts);

        httpMock.verify();
      }
    )
  );

  it('getPostsWithTitlesInCapitalLetters should return the posts with the titles in capital letters',
    inject(
      [HttpTestingController, Repository],
      (
        httpMock: HttpTestingController,
        repository: Repository
      ) => {

        const expected = posts.map(p => {
         p.title = p.title.toUpperCase();
         return p;
        });

        const  observable = repository.getPostsWithTitlesInCapitalLetters();

        observable.subscribe((p: Post[]) => {
          expect(p).toEqual(expected);
        });

        observable.subscribe((p: Post[]) => {
          console.log('with the pipe share the observable uses the same stream');
        });

        const mockReq = httpMock.expectOne(repository.postUrl);

        expect(mockReq.cancelled).toBeFalsy();

        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(posts);

        httpMock.verify();
      }
    )
  );

  it('getPosts should return the posts and raise a notification when post are loaded',
    inject(
      [HttpTestingController, Repository],
      (
        httpMock: HttpTestingController,
        repository: Repository
      ) => {

        const subject = new Subject();

        let isLoaded = false;

        const expected = posts;

        const  observable = repository.getPosts();

        observable.subscribe((p: Post[]) => {
          expect(p).toEqual(expected);
          expect(isLoaded).toBeFalsy();
          subject.complete();
        });

        subject.subscribe({
          complete: () => {
            isLoaded = true;
            expect(isLoaded).toBeTruthy();
          }
        });

        const mockReq = httpMock.expectOne(repository.postUrl);

        expect(mockReq.cancelled).toBeFalsy();

        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(posts);

        httpMock.verify();
      }
    )
  );

});






