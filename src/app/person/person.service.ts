import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '@model/person';

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private readonly httpClient: HttpClient) {}

  readonly path = (idUser: string): string => `user/${idUser}/person`;

  searchByName(idUser: string, name: string): Observable<Person[]> {
    const params = new HttpParams({ fromObject: { name } });
    return this.httpClient.get<Person[]>(`${this.path(idUser)}/search/name`, { params });
  }
}
