/* import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {

  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;


  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }
  ngOnInit() {
    this.route.params
      .subscribe(

        (params: Params) => {

          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          console.log(this.editMode);

        }
      );




  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridents = new FormArray([]);



    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngridents.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)

        })
          );

        }
      }
    }


    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngridents
    });



  }
}
 */

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.editMode);
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    /* let newRecipe = new Recipes(
this.recipeForm.value['name'],
this.recipeForm.value['description'],
this.recipeForm.value['imagePath'],
this.recipeForm.value['ingredients']); */
   if(this.editMode){
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
   }
   else{
    this.recipeService.addRecipe(this.recipeForm.value);
   }

   this.onCancel();
  }
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
new FormGroup({
  'name':new FormControl(null, Validators.required),
  'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]
  )
})

    )
  }

  onCancel(){
console.log("cancel clicked");
this.router.navigate(['../'], {relativeTo: this.route})
  }
  onDeleteIngredient(index: any){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);


  }




  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients: FormGroup[] = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.formBuilder.group({
              name: this.formBuilder.control(ingredient.name, Validators.required),
              amount: this.formBuilder.control(ingredient.amount,
                [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]

                )
            })
          );
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: this.formBuilder.control(recipeName, Validators.required),
      imagePath: this.formBuilder.control(recipeImagePath, Validators.required),
      description: this.formBuilder.control(recipeDescription, Validators.required),
      ingredients: this.formBuilder.array(recipeIngredients)
    });
  }
}
