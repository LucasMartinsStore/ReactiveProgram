import { VolumeInfo, Book, Item } from './../../interface/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookVolumeInfo } from 'src/app/interface/bookVolumeInfo';

import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Book[];
  fieldSearch: string = '';
  subscription: Subscription;
  book: Book;

  constructor(private livroService: LivroService) {}

  searchBook() {
    this.subscription = this.livroService.search(this.fieldSearch).subscribe({
      next: (items) => {
        this.listaLivros = this.BookListRender(items);
      },
      error: (errorAPI) => console.error(errorAPI),
    });
  }

  private BookListRender(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => {
      return new BookVolumeInfo(item);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
