import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person/person.component';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {
  id: number;
  person: Person;
  form: FormGroup;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { 
    this.id = this.route.snapshot.params.id;

    this.form = this.formBuilder.group({
//      books: [''],
      //categories: ['']
    });
  }

  ngOnInit(): void {
    const id = 'id';
    const book_id = 'book_id';
    const person_id = 'person_id';
    const first = 'first';
    const last = 'last';
    const title = 'title';
    const quantity = 'quantity';

    const category = 'category';
    const name = 'name';

    var url = 'http://localhost:3000/person/' + this.id.toString();

    this.http.get(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (person_id in item && book_id in item && first in item && last in item && title in item && quantity in item) {
              //alert(JSON.stringify(item));
              this.person = item;
            }
          }
        }
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))

  }

  submit() {

  }

  getFirst() {
    if (this.person)
      return this.person.first;
  }

  getLast() {
    if (this.person)
      return this.person.last;
  }
}
