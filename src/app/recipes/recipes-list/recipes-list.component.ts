import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../recipes.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit , OnDestroy {

  recipes: Recipes[] | undefined;
subscription!: Subscription;

constructor(private recipeService: RecipeService,
  private router:Router,
  private route:ActivatedRoute ){

}

ngOnInit(){
this.subscription = this.recipeService.recipesChanged.subscribe(
(recipes:Recipes[])=>{
  this.recipes = recipes;
}

);
this.recipes = this.recipeService.getRecipes();

}
onNewRecipe(){
  console.log("on new recipe working")
this.router.navigate(['new'],{relativeTo:this.route});
}
ngOnDestroy(){

  this.subscription.unsubscribe();
}


}
