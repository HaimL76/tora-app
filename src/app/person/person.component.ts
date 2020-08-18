import { Component, OnInit } from '@angular/core';
import { PersonDetailsComponent } from '../person-details/person-details.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Method in component class
  trackByFn(index, item) {
    return item.id;
  }

  items: PersonDetailsComponent[] = [new PersonDetailsComponent()];
}
