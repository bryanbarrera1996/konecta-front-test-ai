import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }
  private url = environment.URL_POKEAPI;
  private icon = environment.URL_POKEAPI_ICONS;
  private artwork = environment.URL_POKEAPI_ARTWORK;
  private default = environment.POKEMON_DEFAULT;
  private url_info = environment.URL_POKEAPI_INFO;
  headers(){
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getIcon(pokemon = this.default){
    return this.url+this.icon+pokemon+'.png';
   }

  getArtWork(pokemon = this.default){
   return this.url+this.artwork+pokemon+'.png';
  }

  getInfo(pokemon = this.default){
     let options = { headers: this.headers() }
     return this.http.get<any>(this.url_info+pokemon, options); 
  
  }

}
