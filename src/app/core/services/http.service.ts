import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "@environment/environment";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {
    }

    get apiUrl(): string {
        return environment.apiURL;
    }

    get<T>(endpoint: string, options?: any) {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
    }

    post<T>(endpoint: string, data: any, options?: any): Observable<any> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, options);
    }

    put<T>(endpoint: string, data: any, options?: any): Observable<any> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, options);
    }

    delete<T>(endpoint: string, options?: any): Observable<any> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, options);
    }
}