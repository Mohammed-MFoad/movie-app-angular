import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { MoviesService } from '../../../shared/services/movies/movies.service';

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

  comments:any =  []
  emailSignedIn:string;
  comment:string;
  movieId:string;

  constructor( private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    public authService: AuthService,
    private modalService: ModalService) { 

     
      
    }

  ngOnInit() {
    if (JSON.parse( localStorage.getItem("user"))) {
      this.authService.user.subscribe(user => {this.emailSignedIn = user.email
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
  getComments(){
    
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
  open(content):void{
    this.modalService.open(content)
   }
}
