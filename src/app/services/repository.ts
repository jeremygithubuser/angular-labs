import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap, share, delay } from 'rxjs/operators';
import { Post } from '../models/post';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class Repository {

    readonly postUrl = 'posts';  // URL to web api

    constructor(private http: HttpClient) { }

    /** GET Posts from the server */
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl)
            .pipe(
                tap(post => this.log(`fetched posts`)),
                catchError(this.handleError('getPosts'))
            ) as Observable<Post[]>;
    }

    getPostsWithTitlesInCapitalLetters(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl)
            .pipe(
                share(),
                tap(posts => this.log(`fetched posts`)),
                map(
                    posts => posts.map(
                        post => {
                            post.title = post.title.toUpperCase();
                            return post;
                        }
                    )
                ),
                catchError(this.handleError('getPosts'))
            ) as Observable<Post[]>;
    }


    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param operation - name of the operation that failed
     */
    private handleError<T>(operation = 'operation') {
        return (error: HttpErrorResponse): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            // TODO: better job of transforming error for user consumption
            throw new Error(`${operation} failed: ${message}`);
        };

    }

    private log(message: string) {
        console.log('PostService: ' + message);
    }
}
