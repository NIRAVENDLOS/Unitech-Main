import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloowroomComponent } from './bloowroom/bloowroom.component';
import { CardingComponent } from './carding/carding.component';
import { DrawframesComponent } from './drawframes/drawframes.component';
import { FinisherComponent } from './finisher/finisher.component';
import { SimplexComponent } from './simplex/simplex.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bloowroom',
    pathMatch: 'full',
  },
  {
    path: 'bloowroom',
    component: BloowroomComponent
  },
  {
    path: 'carding',
    component: CardingComponent
  },
  {
    path: 'drawframes',
    component: DrawframesComponent
  },
  {
    path: 'finisher',
    component: FinisherComponent
  },
  {
    path: 'simplex',
    component: SimplexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreprateryRoutingModule { }
