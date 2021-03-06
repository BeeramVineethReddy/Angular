import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from  '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  commentForm: FormGroup;
  comment: Comment;
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;


  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author':{
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be atleast 2 characters long'
    },
    'comment':{
      'required': 'Comment is required.'
    },
  };

  constructor(private dishService: DishService,private route: ActivatedRoute, private location: Location,
    private fb: FormBuilder) {this.createForm(); }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish)=>{this.dish=dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createForm(){
    this.commentForm=this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['',[Validators.required]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  this.onValueChanged();//reset form validation


  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author:'',
      rating: 5,
      comment:''
    });
    
  }
 

  onValueChanged(data?: any){
    if(!this.commentForm) { return; }
    const form=this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+ ' ';
            }
          }
        }
      }
    }
  }



}