import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Person {
  first: string;
  last: string;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const First = 'first';
    const Last = 'last';

    this.http.get('http://localhost:3000/DoWork').subscribe(
      data => {
        if (Array.isArray(data)) {
          this.items.push({first: data.length.toString(), last: "aaa"});
          this.items.push({first: JSON.stringify(data), last: "aaa"});
          data.forEach(function(item) {
            this.items.push({first: "bbb", last: "aaa"});
            if (First in item && Last in item)
              this.items.push({first: item[First], last: item[Last]});
          });
        }
      },
      error => this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: Person[] = [{first: "HaimL", last: "0525868060"}, {first: "Einatush", last: "0525868070"}];
}
