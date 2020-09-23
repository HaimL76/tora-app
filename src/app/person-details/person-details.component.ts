import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person/person.component';
import { 
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
 } from '@angular/forms';

export class BookCategory {
  constructor() { }

  name: string;
}

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
      val = ((this.p_quantity / 2) / this.quantity) * 100;

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
  person_books: BookQuantity[] = [];
  books: BookQuantity[] = [];
  categories: BookCategory[] = [];

  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) { 
    this.id = this.route.snapshot.params.id;

    this.form = this.formBuilder.group({
      books: [''],
      categories: ['']
    });
  }

  getFirst() {
    if (this.person)
      return this.person.first;
  }

  getLast() {
    if (this.person)
      return this.person.last;
  }

  submit() {

  }

  ngOnInit(): void {
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

            if (first in item && last in item && title in item && quantity in item) {
              //alert(JSON.stringify(item));
              this.person = item;
              var b = new BookQuantity();
              b.title = item.title;
              b.quantity = item.quantity;
              b.p_quantity = item.p_quantity;
              b.initProgPercent();
              this.person_books.push(b);
            }
          }
        }
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))

      url = 'http://localhost:3000/books';

      this.http.get(url).subscribe(
        data => {
          if (Array.isArray(data) && data.length > 0) {
            data.map((value, index, data) => {
              if (category in value && name in value) {
                const categId = value[category];
                const categName = value[name];

                if (categId > 0 && categName && !(categId in this.categories)) 
                  this.categories.push(value);
              }
            });

            if (this.categories.length > 0) {
              this.selCateg = this.categories[0];

              this.onCategorySelected();
            }
          }
        },
        error => {});//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
  }

  onCategorySelected() {
    const category = "category";

    if (this.selCateg && category in this.selCateg) {
      var categId = this.selCateg[category];

      if (categId) {
        var url = 'http://localhost:3000/books/' + categId.toString();

        this.http.get(url).subscribe(
          data => {
            if (Array.isArray(data) && data.length > 0) {
              this.books = data;

              this.selBook = this.books[0];
            }
          },
          error => {});//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
      }
    }
  }
  
  // Method in component class
  trackByFn(index, item) {
    return item.title;
  }

  selBook: any;// = {Id:4,title:"בבא בתרא",quantity:1250}
  selCateg: any;

  onClickMe() {
    //alert(JSON.stringify(this.selBook));
    //alert('Hello, World!');
    var url = 'http://localhost:3000/person/' + this.id.toString();
    //var url = 'http://localhost:3000/luli';

    
    var body = { person: this.id, book: this.selBook.id };
    //alert(JSON.stringify(body));
    this.http.post(url, body).subscribe(
      data => {},
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(TJ)}))
  }

  onChange(newValue) {
    //console.log(newValue);
    //this.selCateg = newValue;

    this.onCategorySelected();
    // ... do other stuff here ...
  }
}