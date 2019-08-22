import { Component, OnInit, ViewChild } from '@angular/core';


import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-updated-dish',
  templateUrl: './updated-dish.component.html',
  styleUrls: ['./updated-dish.component.scss']
})
export class UpdatedDishComponent implements OnInit {

  // form
  @ViewChild('ndForm') newdishFormDirective;
  newdishForm: FormGroup;
  submitted = null;
  showForm = true;
  dish: Dish;
  dishIds: string[];
  errMess: string;
  color = 'accent';

  // image
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;



  formErrors = {
    'name': '',
    'category': ''
  };
  validationMessages = {
    'name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'category': {
      'required':      'Last Categorie is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    }
  };
  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

    // Update
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap( (params: Params) => this.dishservice.getDish(params['id']) ) )
    .subscribe(dish => {
      this.dish = dish;
      console.log( this.dish);
    },
     errmess => this.errMess = <any>errmess);
  }

  // Update
  createForm() {

    this.newdishForm = this.fb.group({
      _id: '',
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      price: '',
      label: '',
      image: '',
      featured: false,
      description: ''
    });

    this.newdishForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
console.log(this.newdishForm);
}

onSubmit( value ) {

  /*   if ( this.fileUrl && this.fileUrl !== '') {
     value.image = this.fileUrl;
   } */
 console.log('toto updated : ', this.dish._id , value);

   this.dishservice.updateDish(this.dish._id, value)
   .then(
     res => {
       // reset
       this.newdishForm.reset({
         name: '',
         category: '',
         price: '',
         label: '',
         description: '',
         image: '',
         featured: false
       });
       this.router.navigate(['/admin']);
     }
   );
 }

 // Image
 detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}

onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.dishservice.uploadFile(file).then(
    (url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  );
}

//
  goBack(): void {
    this.location.back();
  }

 onValueChanged(data?: any) {
  if (!this.newdishForm) { return; }
  const form = this.newdishForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}

}
