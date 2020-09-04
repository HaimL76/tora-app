import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person/person.component';

export class Book {
  constructor() { }

  title: string;
  quantity: number = 0;
}

export class BookQuantity extends Book {
  p_quantity: number = 0;
  prog_percent: number;

  initProgPercent() {
    var val = 0;

    //alert(this.quantity);

    if (this.quantity > 0)
      val = ((this.quantity / 2) / this.quantity) * 100;

    this.prog_percent = val;
  }
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
    const title = 'title';
    const quantity = 'quantity';

    var url = 'http://localhost:3000/person/' + this.id.toString();

    this.http.get(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (first in item && last in item && title in item && quantity in item) {
              //alert(JSON.stringify(item));
              this.person = item;
              var b = new BookQuantity();
              b.title = item.title;
              b.quantity = item.quantity;
              b.initProgPercent();
              this.books.push(b);
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

  onClickMe() {
    //alert('Hello, World!');
    var url = 'http://localhost:3000/person/' + this.id.toString();
    //var url = 'http://localhost:3000/luli';

    
    var body = { person: this.id, book: 3 };
    this.http.post(url, body).subscribe(
      data => {},
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(TJ)}))
  }
}