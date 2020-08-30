import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface Person {
  id: number;
  first: string;
  last: string;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      //this.items.push({first: JSON.stringify(params), last: "aaa" });
    });

    const First = 'first';
    const Last = 'last';

    this.http.get('http://localhost:3000/people').subscribe(
      data => {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (First in item && Last in item)
              this.items.push(item);
          }
        }
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: Person[] = [];//{first: "HaimL", last: "0525868060"}, {first: "Einatush", last: "0525868070"}];
}
