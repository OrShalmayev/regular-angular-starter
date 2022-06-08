import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersWithValuesResolver } from '../user/users-with-values.resolver';

import { HomeComponent } from './home.component';

import { RouteDataEnum } from '@model/route-data.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      [RouteDataEnum.usersWithValues]: UsersWithValuesResolver,
    },
    title: 'Home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
