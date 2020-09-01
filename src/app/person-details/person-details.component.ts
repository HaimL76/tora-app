import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person/person.component';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  id: number;
  person: Person;

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const First = 'first';
    const Last = 'last';

    var url = 'http://localhost:3000/person/' + this.id.toString();

    this.http.get(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.person = data[0];
        }
      },
      error => {})//this.items.push({first: JSON.stringify(error), last: JSON.stringify(error)}))
  }

}
