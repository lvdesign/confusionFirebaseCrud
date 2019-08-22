import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  dish: Dish;
  dishes: Dish[];
  errMess: string;

  constructor(
      private dishService: DishService
    , private router: Router) { }

  ngOnInit() {

    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess =  errmess as any);
  }



// Link vers pages
  onNewDish() {
    this.router.navigate(['/admin', 'new']);
  }
  onViewThisDish(id: number) {
    this.router.navigate(['/admin', 'view', id ]);
  }


// Delete
  deleteThisDish(value: string) {
    console.log( 'deleteDish:  ' + value);
    this.dishService.deleteDish(value)
    .then(
      res => {
        this.router.navigate(['/admin']);
      },
      err => {
        console.log(err);
      }
    );
  }



}
