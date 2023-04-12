import { Component } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: [];
  fieldSearch: string = '';

  constructor(private livroService: LivroService) {}

  searchBook() {
    this.livroService.search(this.fieldSearch).subscribe((returnAPI) => {
      console.log(returnAPI);
    });
  }
}
