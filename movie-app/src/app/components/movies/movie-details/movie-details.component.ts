import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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

  constructor( private activatedRoute: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.movieService.getMovie(id) )
    )
    .subscribe( (movie: any) => {
      this.movie = movie;
    })

  }

}
