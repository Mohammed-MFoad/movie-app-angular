import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies/movies.service';
import { delay } from 'rxjs/internal/operators/delay';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styles: [
  ]
})
export class MoviesComponent implements OnInit {

  movies: any[]=[]; //movies   movies: any[] = [];
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;
  topRated : boolean;
  upcoming:boolean;
  nowPlaying:boolean;
  department:string;
  
  // movies: any[] = [];
  img: string = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

  constructor(private movieService: MoviesService,private activatedRoute: ActivatedRoute,) {
   }

  ngOnInit(): void {
    // this.topRated = this.movieService.topRated;
    // this.upcoming = this.movieService.upcoming;
    // this.nowPlaying = this.movieService.nowPlaying;
    this.activatedRoute.params
    // .pipe(
      // switchMap( ({dept}) => this.setMoviesDepartment(dept)  )
      // )
      .subscribe( (dept: any) => {
        // this.movie = movie;
        // this.movieId = movie.id
        // this.comments =JSON.parse( localStorage.getItem("commentsFor"+this.movieId));
        this.department = dept
        this.setMoviesDepartment(this.department["dept"] );
        console.log(this.department["dept"] );
        // this.nowPlaying = true
        // this.getNowPlaying(1);
        
        // console.log(this.comments);
      });
  }

  setMoviesDepartment(dept:string){
    switch (dept) {
      case "nowPlaying":
        this.nowPlaying = true
        this.upcoming = false
        this.topRated = false
        this.getNowPlaying(1);
        break;
      case "upcoming":
        this.upcoming = true
        this.nowPlaying = false
        this.topRated = false
        this.getUpComingMovies(1);
        break;
      default:
        this.topRated = true
        this.nowPlaying = false
        this.upcoming = false
        this.getTopRatedMovies(1);
        break;
    }
  }
  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(1000)).subscribe((res: any) => {
      this.movies = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }
  getUpComingMovies(page: number) {
    this.movieService.getUpComingMovies(page).pipe(delay(1000)).subscribe((res: any) => {
      this.movies = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }
  getNowPlaying(page: number) {
    this.movieService.getNowPlaying(page).pipe(delay(1000)).subscribe((res: any) => {
      this.movies = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }
  changePage(event) {
    this.loader = true;
    if (this.nowPlaying) {
      this.getNowPlaying(event.pageIndex + 1);
    }
    else if(this.upcoming){
      this.getUpComingMovies(event.pageIndex + 1);
    }
    else{
      this.getTopRatedMovies(event.pageIndex + 1);
    }
  }

}