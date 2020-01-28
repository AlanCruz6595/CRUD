import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';

const routes: Routes = [
  {
    path : 'peliculas', component: PeliculasComponent
  },
  {
    path : 'pelicula/:id' , component: PeliculaComponent
  },
  {
    path : '**', pathMatch: 'full', redirectTo: 'peliculas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
