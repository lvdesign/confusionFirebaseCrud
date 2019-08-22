import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';   // toute la librairie firebase pour avoir : storage, auth, firestore et app

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishes: Observable<Dish[]>;
  dishesCollection: AngularFirestoreCollection<Dish>;

  private currentUser: firebase.User = null;

  private basePath = '/images';
  private uploadTask: firebase.storage.UploadTask;

  constructor(
        private afs: AngularFirestore
      , private authService: AuthService ) {

      this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.currentUser = user;
        } else {
          this.currentUser = null;
        }
      });
  }

  // GET all dishes
  getDishes(): Observable<Dish[]> {
    return this.afs.collection<Dish>('dishes').snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Dish;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }

 // GET one dish
  getDish(id: string): Observable<Dish> {
    return this.afs.doc<Dish>('dishes/' + id).snapshotChanges()
    .pipe(map(action => {
        const data = action.payload.data() as Dish;
        const _id = action.payload.id;
        return { _id, ...data };
      }));
  }

  // Get to specific Didh -> ref featured is true
  getFeaturedDish(): Observable<Dish> {
    return this.afs.collection<Dish>('dishes', ref => ref.where('featured', '==', true)).snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Dish;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      })[0];
    }));
  }

  // Retrouve le getDishIds
  getDishIds(): Observable<String[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish._id)))
      .pipe(catchError(error => error ));
  }


// CRUD operation
 /*

    Dish structure :
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()

 */

// Create  -> action to admin.component

createDish(value: any): Promise<any> {

    if ( this.currentUser) {
        return this.afs.collection('dishes').add({
          name: value.name,
          image: value.image,
          category: value.category,
          label: value.label,
          price: value.price,
          featured: value.featured,
          description: value.description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

    } else {
      return Promise.reject(new Error('Create--No User Logged In!'));
  }
}

// Update -> action with set
  updateDish(dishId: string, dish: Dish): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('dishes').doc(dishId).update(dish);
    } else {
      return Promise.reject(new Error('Update--No User Logged In!'));
    }
  }

// deleteDish(id)
  deleteDish(dishId: string): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('dishes').doc(dishId).delete();
    } else {
      return Promise.reject(new Error('Delete--No User Logged In!'));
    }
  }


// add photo
  uploadFile(file: File): Promise<any> {
    if (this.currentUser ) {
      return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref().child('images/' + almostUniqueFileName + file.name).put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
              console.log('Chargement…');
            },
            (error) => {
              console.log('Erreur de chargement ! : ' + error);
              reject();
            },
            () => {
              resolve(upload.snapshot.ref.getDownloadURL());
            }
          );
        }
      );
    } else {
      return Promise.reject(new Error('Image--No User Logged In!'));
    }
  }



  postComment(dishId: string, comment: any): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('dishes').doc(dishId).collection('comments')
        .add({
          author: {
            '_id': this.currentUser.uid,
            'firstname' : this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email
          },
          rating: comment.rating,
          comment: comment.comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  getComments(dishId: string): Observable<any> {
    return this.afs.collection('dishes').doc(dishId).collection('comments').valueChanges();
  }
}
