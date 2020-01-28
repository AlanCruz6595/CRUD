import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculaModelo } from '../models/pelicula.model';

// Import operdor Map
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private urlData = 'https://cursocompleto-30905.firebaseio.com';

  constructor(private http: HttpClient) { 
   }

   crearPelicula( pelicula: PeliculaModelo){
    return this.http.post(`${this.urlData}/peliculas.json`,pelicula)
    .pipe(
      map( (resp:any) =>{
        pelicula.id = resp.name;
        return pelicula;
      })
    );
   }

   updatePeli( pelicula: PeliculaModelo){

    const peliculaTemp = {
      ...pelicula
    };

    delete peliculaTemp.id;

    return this.http.put(`${this.urlData}/peliculas/${pelicula.id}.json`, peliculaTemp);
   }

   getPeliculas(){
     return this.http.get(`${this.urlData}/peliculas.json`)
     .pipe(
      map(this.crearArreglo)
     );
   }
   private crearArreglo( peliculasObj: object){

    const peliculas: PeliculaModelo[] = [];

    Object.keys(peliculasObj).forEach(Key =>{

      const pelicula: PeliculaModelo = peliculasObj [Key];
      pelicula.id = Key;

      peliculas.push(pelicula);
    });
    
    if (peliculasObj === null) {
      return [];
    }
     return peliculas;
   }
}
