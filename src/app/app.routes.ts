import { Routes } from '@angular/router';
import {  PokedexComponent} from './dashboard/pokedex/pokedex.component';
export const APP_ROUTES: Routes = [
   { path: 'pokemon/:id', component: PokedexComponent },
   { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
    { path: '**', component: PokedexComponent }
  ];