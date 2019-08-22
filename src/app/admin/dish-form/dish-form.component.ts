import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { visibility, flyInOut, expand } from '../../animations/app.animation';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss']
})
export class DishFormComponent implements OnInit {

  @ViewChild('dishForm') dishFormDirective;
  dishForm: FormGroup;
  dish: Dish;
  dishIds: string[];
  submitted = null;
  showForm = true;
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
    private fb: FormBuilder
    , private dishservice: DishService
    , private route: ActivatedRoute
    , private router: Router
    , private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.dishForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      price: '',
      label: '',
      image: '',
      featured: false,
      description: ''
    });

    this.dishForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }


  onSubmit(value) {
    if ( this.fileUrl && this.fileUrl !== '') {
      value.image = this.fileUrl;
    }
    console.log(value);
    this.dishservice.createDish(value)
    .then(
      res => {
        // reset
        this.dishForm.reset({
          name: '',
          category: '',
          price: '',
          label: '',
          description: '',
          image: '',
          featured: false
        });
      }
    );

    // redirection
    this.router.navigate(['/admin']);
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


  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }


  onValueChanged(data?: any) {
    if (!this.dishForm) { return; }
    const form = this.dishForm;
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
