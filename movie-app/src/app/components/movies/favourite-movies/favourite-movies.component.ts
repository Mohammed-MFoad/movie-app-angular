import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MoviesService } from 'src/app/shared/services/movies/movies.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.scss'],
})
export class FavouriteMoviesComponent implements OnInit {
  favourites: any = [];
  movies: any = [];
  emailSignedIn: string;
  loader:boolean = true
  img: string = "https://www.themoviedb.org/t/p/w220_and_h330_face/"
  constructor(
    private movieService: MoviesService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.emailSignedIn = '';
    if (JSON.parse(localStorage.getItem('user'))) {
      this.authService.user.subscribe((user) => {
        this.emailSignedIn = user.email;
        
        if (this.emailSignedIn !== '' && this.emailSignedIn) {
          this.favourites = JSON.parse(
            localStorage.getItem('FavouriteFor' + this.emailSignedIn)
            );
        }
        if (this.favourites && this.favourites !== []) {
          this.favourites.forEach(element => {
            let movie = this.movieService.getMovie(element.id)
            movie.subscribe((mo)=>{
              this.movies.push(mo);
              console.log(mo.poster_path)
            });
            
          });
          this.loader = false;
        }
      });
    }
    
  }
  removeFromFavourites(movieId){
    let tempArr = [];
    if (this.favourites && this.favourites !==[]) {
      this.favourites.forEach(element => {
        (element.id != movieId)? tempArr.push(element):false;
      });
    }
    this.favourites = tempArr;
    localStorage.setItem(("FavouriteFor"+this.emailSignedIn), (JSON.stringify(this.favourites)))
    window.location.reload(true);
  }
}
