import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {
 recipe!: Recipes;
 id!:number;

 constructor(private recipeService:RecipeService,
  private route:ActivatedRoute,
  private router:Router){

 }

 ngOnInit(){
this.route.params
  .subscribe(
(params: Params) =>{

  this.id =+params['id'];
  this.recipe= this.recipeService.getRecipe(this.id);
}

  );

 }
 onAddToShoppingList(){
  this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

 }

 onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo:this.route});
  /* this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route}); */

 }

 onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['/recipes'  ]);
 }
}
