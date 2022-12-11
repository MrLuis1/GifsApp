import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @ViewChild('txtSearching') txtSearching!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  buscar() {
    let value = this.txtSearching.nativeElement.value;
    
    if(value.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs(value);

    this.txtSearching.nativeElement.value = '';
  }

}
