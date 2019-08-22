import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';

import {AdminComponent} from '../admin/admin.component';
import {DishFormComponent} from '../admin/dish-form/dish-form.component';
import {UpdatedDishComponent } from '../admin/updated-dish/updated-dish.component';


export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'admin/new' ,  component: DishFormComponent },
  { path: 'admin/view/:id' ,  component: UpdatedDishComponent },

  { path: 'aboutus', component: AboutComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'favorites',     component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent }

];
