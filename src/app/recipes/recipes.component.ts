import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipes } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent {
  selectedRecipe!: Recipes;

  constructor(private recipeService:RecipeService){}

  ngOnInit(){
    this.recipeService.recipeSelected
    .subscribe(
      (recipe:Recipes)=>{
this.selectedRecipe = recipe;
      }
    );

  }
}
