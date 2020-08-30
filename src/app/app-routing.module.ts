import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person/person.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  { path: 'person-component', component: PersonComponent },
  { path: 'person-details-component/:id', component: PersonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
