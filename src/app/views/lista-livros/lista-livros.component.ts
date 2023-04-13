import { VolumeInfo, Book } from './../../interface/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  private BookListRender(items): Book[] {
    const books: Book[] = [];
    items.forEach((item) => {
      books.push(
        (this.book = {
          title: item.volumeInfo?.title,
          authors: item.volumeInfo?.authors,
          publisher: item.volumeInfo?.publisher,
          publishedDate: item.volumeInfo?.publishedDate,
          description: item.volumeInfo?.description,
          previewLink: item.volumeInfo?.previewLink,
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        })
      );
    });
    return books;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
