import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import {
  switchMap,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
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

  constructor(private service: LivroService) {}

  bookFounder$ = this.fieldSearch.valueChanges.pipe(
    debounceTime(PAUSE),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) => this.service.search(value)),
    map((result) => (this.bookResult = result)),
    map((result) => result.items ?? []),
    map((items) => this.bookListRender(items))
  );

  private bookListRender(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
}
