import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import {
  switchMap,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  catchError,
  throwError,
  EMPTY,
  tap,
  of,
} from 'rxjs';

import { BookVolumeInfo } from 'src/app/interface/bookVolumeInfo';
import { Item, BookResult } from './../../interface/interfaces';
import { LivroService } from 'src/app/services/livro.service';

const PAUSE = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  fieldSearch = new FormControl();
  bookResult: BookResult;
  messageError = '';

  constructor(private service: LivroService) {}

  totalBook$ = this.fieldSearch.valueChanges.pipe(
    debounceTime(PAUSE),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap((value) => this.service.search(value)),
    map((result) => (this.bookResult = result)),
    catchError((error) => {
      console.log(error);
      return of();
    })
  );

  bookFounder$ = this.fieldSearch.valueChanges.pipe(
    debounceTime(PAUSE),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) => this.service.search(value)),
    map((result) => (this.bookResult = result)),
    map((result) => result.items ?? []),
    map((items) => this.bookListRender(items)),
    catchError((error) => {
      // this.messageError = 'Ops, ocorreu um erro. Recarregue a aplicação!';
      //return EMPTY;
      console.log(error);
      return throwError(
        () =>
          new Error(
            (this.messageError =
              'Ops, ocorreu um erro. Recarregue a aplicação!')
          )
      );
    })
  );

  private bookListRender(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
}
