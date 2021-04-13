import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies/:dept', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id',component: MovieDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
