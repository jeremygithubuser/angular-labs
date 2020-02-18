import { delay, take, switchMap, map } from 'rxjs/operators';
import { of, forkJoin, interval } from 'rxjs';

// Straight Jasmine testing without Angular's testing support

describe('obs', () => {

    let propOne: string;
    let propTwo: string;
    let propThree: string;

    const makeRequest = (value: string, delayDuration: number) => {
        // simulate http request
        return of(`Complete: ${value}`).pipe(
            delay(delayDuration)
        );
    };

    it('ForkJoin and SwitchMap can work together', (done) => {

        forkJoin(
            interval(100).pipe(
                take(3),
                switchMap(int =>
                    makeRequest(int.toString(), 200),
                  ),
            ),        
            makeRequest('Request Two', 100),
            makeRequest('Request Three', 300)
          )
          .subscribe(([res1, res2, res3]) => {
            propOne = res1;
            propTwo = res2;
            propThree = res3;
            expect(propOne).toEqual("Complete: 2");
            done();
          });

    });

    it('ForkJoin and SwitchMap can work together abd the observable returned by fork join can be piped', (done) => {

        forkJoin(
            interval(100).pipe(
                take(3),
                switchMap(int =>
                    makeRequest(int.toString(), 200),
                  ),
            ),        
            makeRequest('Request Two', 100),
            makeRequest('Request Three', 300)
          )
          .pipe(
              map(result=>{
                return {
                    r1:result[0].toUpperCase(),
                    r2:result[1].toUpperCase(),
                    r3:result[2].toUpperCase(),
                };
              })
          )
          .subscribe((finalResult) => {
            propOne = finalResult.r1;
            propTwo = finalResult.r2;
            propThree = finalResult.r3;
            expect(propOne).toEqual("COMPLETE: 2");
            expect(propTwo).toEqual("COMPLETE: REQUEST TWO");
            expect(propThree).toEqual("COMPLETE: REQUEST THREE");
            done();
          });

    });
});






