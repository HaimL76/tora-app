import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person/person.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonUpdateComponent } from './person-update/person-update.component';

const routes: Routes = [
  { path: 'person-component', component: PersonComponent },
  { path: 'person-details-component/:id', component: PersonDetailsComponent },
  { path: 'person-update-component/:id', component: PersonUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
