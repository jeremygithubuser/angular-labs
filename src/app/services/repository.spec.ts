// Straight Jasmine testing without Angular's testing support
import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import { Repository } from './repository';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { post } from 'selenium-webdriver/http';
describe('Repository', () => {
    let service: Repository;

    /*beforeEach(() => { service = new Repository(new HttpClient()); });*/

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [Repository]
        });
      });
  
    it('#getValue should return real value',
    inject(
        [HttpTestingController, Repository],
        (
          httpMock: HttpTestingController,
          repository: Repository
        ) => {
            const posts = [
                { userId: 1, id: 1 ,title: 'title01',body:'body01'} as Post,
                { userId: 2, id: 2 ,title: 'title02',body:'body02'} as Post,
              ];
              
              repository.getPosts().subscribe((_posts:Post[]) => {
                    expect(_posts).toEqual(posts);            
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






