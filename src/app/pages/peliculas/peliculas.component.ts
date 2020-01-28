import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { PeliculaModelo } from 'src/app/models/pelicula.model';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit{

  // elements: any = [
  //   {id: 1, titulo: 'Pulp Fiction', director: 'Otto', estreno: '1995'},
    
  // ];

  headElements = ['ID', 'Titulo', 'Director', 'Año'];

  peliculas: PeliculaModelo[] = [];

  constructor(private peliculasService: PeliculasService){

  }

  ngOnInit(){
    
    this.peliculasService.getPeliculas().subscribe(resp => this.peliculas = resp);
  }
}
