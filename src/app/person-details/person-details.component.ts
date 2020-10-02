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

  book_id: number;
  title: string;
  quantity: number = 0;
}

export class BookQuantity extends Book {
  p_quantity: number = 0;
  prog_percent: number;
  person_id: number;
  //pbook_id: number;

  initProgPercent() {
    var val = 0;

    if (this.quantity > 0)
      val = (this.p_quantity / this.quantity) * 100;

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
    const id = 'id';
    const book_id = 'book_id';
    const person_id = 'person_id';
    const first = 'first';
    const last = 'last';
    const title = 'title';
    const quantity = 'quantity';

    const category = 'category';
    const name = 'name';

    this.person_books = [];
    this.categories = [];

    var url = 'http://localhost:3000/person/' + this.id.toString();

    this.http.get(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (person_id in item && book_id in item && first in item && last in item && title in item && quantity in item) {
              //alert(JSON.stringify(item));
              this.person = item;
              var b = new BookQuantity();
              //b.book_id = item.
              b.title = item.title;
              b.quantity = item.quantity;
              b.p_quantity = item.p_quantity;
              b.initProgPercent();
              b.book_id = item.book_id;
              b.person_id = item.person_id;
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

              if (this.selCateg) {
                const value = 'value';

                const sel = this.form.get('categories');
          
                if (sel && value in sel) 
                  sel.setValue(this.selCateg);

                this.onCategorySelected();
              }
            }
          }
        },
        error => {});
  }

  formatLabel(value: number) {
    return value + '%';
  }

  setSliderValue(event, book) {
    const value = 'value';
    const book_id = 'book_id';
    const person_id = 'person_id';
    const initProgPercent = 'initProgPercent';
    const p_quantity = 'p_quantity';

    if (book && book_id in book && person_id in book && p_quantity in book && event && value in event) {
      const val = event[value];
      const b_id = book.book_id;

      if (val && b_id) {
        book.p_quantity = (val / 100) * book.quantity;

        if (initProgPercent in book)
          book.initProgPercent();
      }
    }
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

              if (this.selBook) {
                const value = 'value';

                const sel = this.form.get('books');
          
                if (sel && value in sel) 
                  sel.setValue(this.selBook);
              }
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
      data => {        
        this.ngOnInit();
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(TJ)}))
  }

  onClickSave(e, book_quantity) {
    const person_id = 'person_id';
    const book_id = 'book_id';

    if (book_quantity && book_id in book_quantity && person_id in book_quantity) {
      var b_id = book_quantity.book_id;
      var p_id = book_quantity.person_id;
      
      if (p_id && b_id) {
        var body = { p_book: book_quantity };

        var url = 'http://localhost:3000/person/' + p_id.toString();
        url += '/books/' + b_id.toString();

        this.http.post(url, body).subscribe(
          data => {        
            this.ngOnInit();
          },
          error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(TJ)}))
        }
      }
  }

  onClickRemove(e, book_quantity) {
    const person_id = 'person_id';
    const book_id = 'book_id';

    if (book_quantity && book_id in book_quantity && person_id in book_quantity) {
      var b_id = book_quantity.book_id;
      var p_id = book_quantity.person_id;
      
      if (p_id && b_id) {
        var url = 'http://localhost:3000/person/' + p_id.toString();
        url += '/books/' + b_id.toString();

        this.http.delete(url).subscribe(
          data => {        
            this.ngOnInit();
          },
          error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(TJ)}))
        }
      }
  }

  onChangeCateg() {
    const value = 'value';

    const sel = this.form.get('categories');

    if (sel && value in sel) {
      this.selCateg = sel.value;

      if (this.selCateg)
        this.onCategorySelected();
    }
  }

  onChangeBook() {    
    const value = 'value';

    const sel = this.form.get('books');

    if (sel && value in sel) 
      this.selBook = sel.value;
  }
}