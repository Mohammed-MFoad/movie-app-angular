import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { MoviesService } from '../../../shared/services/movies/movies.service';
import { element } from 'protractor';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie!: any;
  related: any[] = []
  img: string = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"
  img2: string = "https://www.themoviedb.org/t/p/w250_and_h141_face/"
  public smth$ = interval(100);
  comments:any =  []
  favourites:any =  []
  emailSignedIn:string;
  comment:string;
  movieId:string;
  addedToFavourite: boolean= false;

  constructor( private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    public authService: AuthService,
    private modalService: ModalService) { 

     
      
    }

  ngOnInit() {
    this.emailSignedIn= "";
    if (JSON.parse( localStorage.getItem("user"))) {
      this.authService.user.subscribe(user => {
        this.emailSignedIn = user.email

      if (this.emailSignedIn !== "" && this.emailSignedIn) {
        this.favourites = JSON.parse( localStorage.getItem("FavouriteFor"+this.emailSignedIn))
        if (this.favourites && this.favourites !==[]) {
          this.favourites.forEach(element => {
            (element.id == this.movieId)? this.addedToFavourite =true : this.addedToFavourite = false;
          });
        }
      }



        // if (this.emailSignedIn !== "" && this.emailSignedIn) {
        //   this.addedToFavourite = true;
        //   console.log(this.emailSignedIn);
        // }
        // else{
        //   this.addedToFavourite = true;
        //   console.log(this.emailSignedIn);
        // }

      })
    }
    
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.movieService.getMovie(id)  )
      )
      .subscribe( (movie: any) => {
        this.movie = movie;
        this.movieId = movie.id
        this.comments =JSON.parse( localStorage.getItem("commentsFor"+this.movieId));
        console.log(this.movieId);
        console.log(this.comments);
      });
    
  }
  appendComment()
  {
    console.log(this.movieId);
    console.log(this.comments);
    console.log(this.emailSignedIn);
    console.log(this.comment);
    
    let newComment = {
      email:this.emailSignedIn,
      comment:this.comment
    }
    if(this.comments){
      this.comments.push(newComment)
       console.log(this.comments);
      localStorage.setItem(("commentsFor"+this.movieId), (JSON.stringify(this.comments)))
    }
    else{
      this.comments=[]
      this.comments.push(newComment)
      console.log(this.comments);
      localStorage.setItem(("commentsFor"+this.movieId), (JSON.stringify(this.comments)))
    }
    this.comment = ""
  }
  addToFavourite(){
    let newFavourite = {
      id:this.movieId,
    }
    if(this.favourites){
      this.favourites.push(newFavourite)
       console.log(this.favourites);
      localStorage.setItem(("FavouriteFor"+this.emailSignedIn), (JSON.stringify(this.favourites)))
    }
    else{
      this.favourites=[]
      this.favourites.push(newFavourite)
      console.log(this.favourites);
      localStorage.setItem(("FavouriteFor"+this.emailSignedIn), (JSON.stringify(this.favourites)))
    }
    window.location.reload(true);
  }
  removeFromFavourite(){
    let deletedFavourite = {
      id:this.movieId,
    }
    let tempArr = [];
    if (this.favourites && this.favourites !==[]) {
      this.favourites.forEach(element => {
        (element.id != this.movieId)? tempArr.push(element) : this.addedToFavourite = false;
      });
    }
    this.favourites = tempArr;
    localStorage.setItem(("FavouriteFor"+this.emailSignedIn), (JSON.stringify(this.favourites)))
  }
  open(content):void{
    this.modalService.open(content)
   }
}
