import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++)
      this.items.push({name: i.toString(), phone: i.toString()});
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: Person[] = [{name: "HaimL", phone: "0525868060"}, {name: "Einatush", phone: "0525868070"}];
}
