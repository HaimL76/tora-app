import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person/person.component';

export interface Book {
  title: string;
  quantity: number;
}

export interface BookQuantity extends Book {
  p_quantity: number;
}

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  id: number;
  person: Person;
  books: BookQuantity[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const first = 'first';
    const last = 'last';

    var url = 'http://localhost:3000/person/' + this.id.toString();

    this.http.get(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (first in item && last in item) {
              this.person = item;
              this.books.push(item);
            }
          }
        }
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
  }
  
  // Method in component class
  trackByFn(index, item) {
    return item.title;
  }
}
