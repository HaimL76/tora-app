import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Person {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/DoWork').subscribe( data => {
      this.items.push({name: data.toString(), phone: data.toString()});
    });
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: Person[] = [{name: "HaimL", phone: "0525868060"}, {name: "Einatush", phone: "0525868070"}];
}
