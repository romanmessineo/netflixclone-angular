import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private servise:MovieApiServiceService,private router:ActivatedRoute){}
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;

  ngOnInit(): void { 
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getparamid#');

    this.getMovie(getParamId); 
    this.getVideo(getParamId); 
    this.getMovieCast(getParamId); 
  }

  getMovie(id:any){
      this.servise.getMovieDetails(id).subscribe((result)=>{
        console.log(result, 'getmoviedetails#');
        this.getMovieDetailResult = result;
      })
  }

  getVideo(id:any){
    this.servise.getMovieVideo(id).subscribe((result)=> {
      console.log(result,'getmovievideo#');
      result.results.forEach((element:any) => {
        if(element.type=="Trailer")
        {

          this.getMovieVideoResult = element.key;
        }
        
      });
    })
  }

  getMovieCast(id:any)
  {
    this.servise.getMovieCast(id).subscribe((result)=> {
      console.log(result,'getMovieCast#');
      this.getMovieCast = result.cast;
    })
  }

}
