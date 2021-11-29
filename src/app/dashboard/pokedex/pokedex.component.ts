import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokedexService } from './../../services/pokedex.service';
import { Infopokemon } from './../../interfaces/infopokemon'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  id: number = 0;
  detailId: string = '';
  name: string | undefined = '';
  types: any = [];
  weight: number | undefined = 0;
  base_experience: number | undefined = 0;
  height: number | undefined = 0;
  id1: number = 0;
  id2: number = 0;
  id3: number = 0;
  id4: number = 0;
  poke1: string = '';
  poke2: string = '';
  poke3: string = '';
  poke4: string = '';
  filterPokemon: string = '';
  hideSearch: number = 0;
  constructor(elementRef: ElementRef, private pokedexservice: PokedexService, private route: ActivatedRoute, private router: Router) { }
  public icon = '';
  public artwork = '';
  public infopokemon?: Infopokemon;
  @ViewChild('pokesearch') pokesearch!: ElementRef;
  @ViewChild('containersearch') containersearch!: ElementRef;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const reg = new RegExp('^[0-9]+$');
      
      if (this.id != undefined && !reg.test(this.id.toString())) {
        alert('Parametro invalido');
        this.id = 6;
      }
      this.pokemonIcon(this.id);
      this.pokemonArtWork(this.id);
      this.pokemonInfo(this.id);

    });
  }



  pokemonIcon(pokemon: any) {
    this.icon = this.pokedexservice.getIcon(pokemon);
  }

  pokemonArtWork(pokemon: any) {
    this.artwork = this.pokedexservice.getArtWork(pokemon);
  }

  pokemonInfo(pokemon: any) {
    this.types = [];
    this.pokedexservice.getInfo(pokemon).subscribe((response) => {
      this.infopokemon = response;
      this.id = (this.infopokemon?.id != undefined) ? this.infopokemon?.id : 0;
      this.detailId = (this.id < 10) ? '00' + this.id : (this.id < 100) ? '0' + this.id : this.id.toString();
      this.name = this.infopokemon?.name;
      this.weight = (this.infopokemon?.weight != undefined) ? this.infopokemon?.weight / 10 : 0;
      this.base_experience = this.infopokemon?.base_experience;
      this.height = (this.infopokemon?.height != undefined) ? this.infopokemon?.height / 10 : 0;
      this.infopokemon?.types?.forEach((i, j) => {
        let type = (i.type?.name != undefined) ? i.type?.name : '';
        this.types.push(type);
        this.getReferences();
      });
    })
  }

  getReferences() {
    let vid1: number = (this.id != undefined) ? this.id - 2 : 0;
    this.id1 = (vid1 <= 0) ? Math.floor(Math.random() * 898) : vid1;
    let vid2 = (this.id != undefined) ? this.id - 1 : 0;
    this.id2 = (vid2 <= 0) ? Math.floor(Math.random() * 898) : vid2;
    this.id3 = (this.id != undefined) ? this.id + 1 : 0;
    this.id4 = (this.id != undefined) ? this.id + 2 : 0;
    this.poke1 = this.pokedexservice.getArtWork(this.id1);
    this.poke2 = this.pokedexservice.getArtWork(this.id2);
    this.poke3 = this.pokedexservice.getArtWork(this.id3);
    this.poke4 = this.pokedexservice.getArtWork(this.id4);
  }

  loadPokemon(poke: number) {

    if (poke === 1) {
      this.id = this.id1;
    } else if (poke === 2) {
      this.id = this.id2;
    } else if (poke === 3) {
      this.id = this.id3;
    } else {
      this.id = this.id4;
    }
    this.router.navigate(['/pokemon', this.id]);
  }

  prev_pokemon() {
    let id = (this.id != undefined) ? this.id : 0;
    this.id = (id <= 1) ? Math.floor(Math.random() * 898) : id - 1;
    this.router.navigate(['/pokemon', this.id]);
  }

  next_pokemon() {
    let id = (this.id != undefined) ? this.id : 0;
    this.id = (id >= 898) ? Math.floor(Math.random() * 898) : id + 1;
    this.router.navigate(['/pokemon', this.id]);
  }

  enableSearch() {
    if (this.hideSearch == 0) {
      this.hideSearch = 1;
      this.pokesearch.nativeElement.focus();
    } else {
      this.hideSearch = 0;
    }
  }

  searchPokemon(){
    this.id = parseInt(this.filterPokemon);
    this.router.navigate(['/pokemon', this.id]);
  }

}
