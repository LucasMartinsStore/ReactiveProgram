import { FormControl } from '@angular/forms';
import { VolumeInfo, Book, Item } from './../../interface/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, switchMap, map, tap } from 'rxjs';
import { BookVolumeInfo } from 'src/app/interface/bookVolumeInfo';

import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  fieldSearch = new FormControl();

  constructor(private livroService: LivroService) {}

  bookFounder$ = this.fieldSearch.valueChanges.pipe(
    /* A ideia desse operador é troca os valores e passar ao servidor só o último valor (B) , desconsiderando os valores anteriores (A) */
    tap(() => console.log('Fluxo inicial')),
    switchMap((value) => this.livroService.search(value)),
    tap(() => console.log('Requisições ao servidor')),
    map((items) => {
      console.log('Requisições ao servidor');
      this.BookListRender(items);
    })
  );

  private BookListRender(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }
}
