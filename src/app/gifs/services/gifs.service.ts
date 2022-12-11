import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient){
    
    this.History = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('data')!) || [];
  }

  private apiKey: string = 'hwF8VPaiuBtEP0Y80r3w6NGBA5Bm4RNt';
  private History: string[] = [];
  public results: Gif [] = [];

  get historial() {
    return [...this.History]
  }

  buscarGifs( query: string ) {
    query = query.trim().toLowerCase();

    if(!this.History.includes( query )){
      this.History.unshift(query);
      this.History = this.History.splice(0,10)
      localStorage.setItem('historial', JSON.stringify(this.History));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`)
    .subscribe( (response ) => {
      this.results = response.data;
      localStorage.setItem('data', JSON.stringify(this.results));
    })
  }
}
