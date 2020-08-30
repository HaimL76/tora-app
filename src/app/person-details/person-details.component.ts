import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
