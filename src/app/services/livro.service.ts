import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { BookResult, Item } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) {}

  search(value: string): Observable<Item[]> {
    const params = new HttpParams().append('q', value);
    return this.httpClient.get<BookResult>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Fluxo do tap', retornoAPI)),
      map((resultado) => resultado.items),
      tap((resultado) => console.log('Fluxo após o map', resultado))
    );
  }
}
