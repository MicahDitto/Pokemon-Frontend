import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pages/home',
  templateUrl: './pages/home.component.html',
  styleUrls: ['./pages/home.component.css']
})
export class homeComponent implements OnInit {

  pokemonNameOrId = "";
  pokemonData: any; // This will hold the data received from the backend
  private subscription: Subscription = new Subscription; // Store the subscription to unsubscribe later


  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getPokemonData() {
    // If there is an existing subscription, unsubscribe before making a new request
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Make an HTTP GET request to your backend API
    this.subscription = this.http
      .get<any>(`http://localhost:3000/pokemon/${this.pokemonNameOrId}`)
      .subscribe({
        next: (data) => {
          // Update the frontend with the received data
          this.pokemonData = data;
        },
        error: (error) => {
          console.error(error);
          // Handle errors, such as displaying an error message to the user
        },
      });
  }
}