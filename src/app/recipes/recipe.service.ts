import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipes } from "./recipes.model";
@Injectable()
export class RecipeService{
  
  recipesChanged = new Subject<Recipes[]>();
  private recipes: Recipes[] = [

        new Recipes(
          'Briyani',
        'chicken briyani with boiler',
        'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
        [

new Ingredient('sakthi masala packet',1),
new Ingredient('rice',2),
new Ingredient('chicken',3),
new Ingredient('ghee',4)

        ]),

        new Recipes(
          'Curry',
        'Chetinad chicken curry',
        'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg',
        [
new Ingredient('chicken',1),
new Ingredient('masala', 2),
new Ingredient('chetinad',3),
new Ingredient('curry leaves',4)

        ])
        
        
          ];
constructor(private slService: ShoppingListService){}


setRecipes(recipes : Recipes[]){
this.recipes = recipes;
this.recipesChanged.next(this.recipes.slice());
}

          getRecipes(){
            return this.recipes.slice();
          }


          getRecipe(index:number){
return this.recipes[index];


          }
          addIngredientsToShoppingList(ingredients: Ingredient[]){
            this.slService.addIngredients(ingredients);

          }
          addRecipe(recipe: Recipes){
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
          }

          updateRecipe(index: any, newRecipe: Recipes){
this.recipes[index] = newRecipe;
this.recipesChanged.next(this.recipes.slice());

          }
          deleteRecipe(index: any){
            this.recipes.splice(index,1);
            this.recipesChanged.next(this.recipes.slice());

          }

}