import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

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

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/dowork').subscribe( data => {
      this.items.push({name: data.json(), phone: data.json()});
    });
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: Person[] = [{name: "HaimL", phone: "0525868060"}, {name: "Einatush", phone: "0525868070"}];
}
