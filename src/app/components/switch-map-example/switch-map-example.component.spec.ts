import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SwitchMapExampleComponent } from './switch-map-example.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Repository } from 'src/app/services/repository';
import { DebugElement } from '@angular/core';
import { Post } from 'src/app/models/post';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('SwitchMapExampleComponent', () => {

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

  let component: SwitchMapExampleComponent;
  let fixture: ComponentFixture<SwitchMapExampleComponent>;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchMapExampleComponent],
      imports: [HttpClientTestingModule],
      providers: [Repository]
    }).compileComponents();
    fixture = TestBed.createComponent(SwitchMapExampleComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the SwitchMapExampleComponent ',
    inject(
      [HttpTestingController, Repository],
      (
        httpMock: HttpTestingController,
        repository: Repository
      ) => {
        expect(component).toBeTruthy();
      })
  );

  it('should call the repository less times than the button is clicked thanks to switch map',
  (done) => 
    inject(
      [HttpTestingController, Repository],
      (
        httpMock: HttpTestingController,
        repository: Repository,
      ) => {

        const button = fixture.debugElement.nativeElement.querySelector('button');
        const expected = posts;
        button.click();
        button.click();
        button.click();
        button.click();

        const delayedObservable = of(true).pipe(delay(500));

        delayedObservable.subscribe(b=>{

          const mockReq = httpMock.expectOne(repository.postUrl);
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(posts);     
          fixture.detectChanges();
          expect(fixture.componentInstance.posts).toEqual(expected);
          done();
        })
        
      })()
      
  );




});
