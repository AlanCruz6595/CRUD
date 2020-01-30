import { Component, OnInit } from '@angular/core';
import { PeliculaModelo } from 'src/app/models/pelicula.model';
import { NgForm } from '@angular/forms';
import { PeliculasService } from 'src/app/services/peliculas.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  pelicula = new PeliculaModelo();

  constructor(private peliculasService: PeliculasService, private route:ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !==  'nuevo'){
      this.peliculasService.getMovie(id).subscribe( (resp: PeliculaModelo)=>{
        this.pelicula = resp;
        this.pelicula.id = id;
      });
    }
    
  }

  guardar( form: NgForm){

    if (form.invalid) {
      console.log('formulario no valido');  
      return;
    }

    Swal.fire({
      icon: 'success',
      title:'Espere un momento',
      text: 'Guardar la información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.pelicula.id) {
      peticion =  this.peliculasService.updatePeli(this.pelicula);
    } else {
      peticion = this.peliculasService.crearPelicula(this.pelicula)
    }

    peticion.subscribe( resp =>{
      Swal.fire({
        title: this.pelicula.titulo,
        text:'Actualizado correctamente',
        icon:'success'
      })
    });
  }
}
