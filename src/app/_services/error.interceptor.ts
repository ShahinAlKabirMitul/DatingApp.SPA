import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest , HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(error => {
            if (error instanceof HttpErrorResponse) {
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    return Observable.throw(applicationError);
                }
                const serverError = error.error;
                let modelStateError = '';
                if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            modelStateError += serverError[key] + '\n';
                        }
                    }
                }
                return Observable.throw(
                    modelStateError || serverError || 'Server Error '
                );
            }
        });
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
