import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@model/user';
import { UserCreateDto } from '@model/user-create.dto';
import { UserUpdateDto } from '@model/user-update.dto';
import { UserWithValues } from '@model/user-with-values';
import { CacheService } from '@shared/cache/cache.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly httpClient: HttpClient, private readonly cacheService: CacheService) {}

  private readonly _cache = this.cacheService.create();

  readonly path = '/user';

  getAllWithValues(): Observable<UserWithValues[]> {
    return this.httpClient.get<UserWithValues[]>(`${this.path}/values`).pipe(this._cache.use());
  }

  create(dto: UserCreateDto): Observable<User> {
    return this.httpClient.post<User>(this.path, dto).pipe(this._cache.burst());
  }

  update(id: string, dto: UserUpdateDto): Observable<User> {
    return this.httpClient.patch<User>(`${this.path}/${id}`, dto).pipe(this._cache.burstMultiple([[id], []]));
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.path}/${id}`).pipe(this._cache.burstMultiple([[id], []]));
  }

  exists(id: string, exclude?: string[]): Observable<boolean> {
    const params = new HttpParams({ fromObject: { exclude: exclude ?? [] } });
    return this.httpClient.get<boolean>(`${this.path}/${id}/exists`, { params });
  }

  getById(idUser: string): Observable<User> {
    return this.httpClient.get<User>(`${this.path}/${idUser}`).pipe(this._cache.use(idUser));
  }
}
