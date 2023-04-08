import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private servise: MovieApiServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  trailerUrl: SafeResourceUrl = '';

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  getMovie(id: any) {
    this.servise.getMovieDetails(id).subscribe((result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id: any) {
    this.servise.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getmovievideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + element.key
          );
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.servise.getMovieCast(id).subscribe((result) => {
      console.log(result, 'getMovieCast#');
      this.getMovieCastResult = result.cast;
    });
  }
}
