import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../recipes.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {

  recipes: Recipes[] | undefined;
constructor(private recipeService: RecipeService,
  private router:Router,
  private route:ActivatedRoute ){

}

ngOnInit(){

this.recipes = this.recipeService.getRecipes();

}
onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
}

}
