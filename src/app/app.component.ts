import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'films';
  isVisible: boolean = false;
  hasDescriptionMore: boolean = false;
  isShowError: boolean = false;
  apiKey: string = '9617cb9d';
  movieTitle: string = '';
  year: string = '';
  srcImg: string | undefined = '';
  name: string = 'qwerty';
  released: string = 'qwerty';
  rating: string = 'qwerty';
  runTime: string = 'qwerty';
  director: string = 'qwerty';
  actors: string = 'qwerty';
  description: string = '';
  shortDescription: string = '';
  tempDescription: string = '';
  error: string = '';
  

  send(): void{
    if (this.movieTitle == '') return;

    this.shortDescription = '';
    this.hasDescriptionMore = false;
    this.isShowError = false;

    let url: string = `http://www.omdbapi.com/?i=tt3896198&apikey=${this.apiKey}&t=${this.movieTitle}`;

    if (this.year != ''){
      url += `&y=${this.year}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data["Response"].localeCompare("False") == 0){
        this.error = data["Error"];
        this.isShowError = true;
        this.isVisible = false;
        return;
      }

      this.srcImg = data["Poster"];
      this.name = data["Title"];
      this.released = data["Released"];
      this.rating = data["imdbRating"];
      this.runTime = data["Runtime"];
      this.director = data["Director"];
      this.actors = data["Actors"];
      this.tempDescription = data["Plot"];      

      let words: Array<string> = this.tempDescription.split(' ');
      let length: number = words.length < 20 ? words.length : 20;

      for (let i: number = 0; i < length; i++){
        this.shortDescription = this.shortDescription + ' ' + words[i];
      }

      this.description = this.shortDescription;
      this.isVisible = true;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  }
  more(): void{
    this.hasDescriptionMore = !this.hasDescriptionMore;

    if (this.hasDescriptionMore){
      this.description = this.tempDescription;
    }
    else{
      this.description = this.shortDescription;
    }
  }
}
