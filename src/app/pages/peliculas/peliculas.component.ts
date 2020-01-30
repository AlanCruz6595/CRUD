import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { PeliculaModelo } from 'src/app/models/pelicula.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit{

  // elements: any = [
  //   {id: 1, titulo: 'Pulp Fiction', director: 'Otto', estreno: '1995'},
    
  // ];

  headElements = ['ID', 'Titulo', 'Director', 'Año', 'Herramientas'];

  peliculas: PeliculaModelo[] = [];
  
  cargando = false;

  constructor(private peliculasService: PeliculasService){

  }

  ngOnInit(){

    this.cargando = true;
    
    this.peliculasService.getPeliculas().subscribe(resp =>{ this.peliculas = resp;
    this.cargando = false;
    });
  }

  borrarPeli( pelicula: PeliculaModelo, i:number){

    Swal.fire({
      title: '¿Seguro deseas borrarlo',
      text: `Se borrara el elemento ${pelicula.titulo}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if(resp.value){
        
      this.peliculas.splice(i, 1);
      this.peliculasService.suprimirPeli(pelicula.id).subscribe();
      }
    });
  }
}
