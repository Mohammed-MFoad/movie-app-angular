import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styles: [
  ]
})
export class MoviesComponent implements OnInit {

  topRated: any[]=[]; //movies   movies: any[] = [];
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string;
  
  // movies: any[] = [];
  img: string = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getTopRatedMovies(1);
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    },
    error => console.log(error));
  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

}