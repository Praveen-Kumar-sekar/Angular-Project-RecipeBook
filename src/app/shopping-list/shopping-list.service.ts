import { Subject } from "rxjs";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged =  new Subject<Ingredient[]>();
   private ingredients: Ingredient[]= [
        new Ingredient ('apple',100),
        new Ingredient ('tomato',50)
        
        
        ];
        
        getIngredients(){
            return this.ingredients.slice();
        }

        addIngredient(ingredient:Ingredient){
            this.ingredients.push(ingredient);
            this.ingredientsChanged.next(this.ingredients.slice());
        }

        addIngredients(ingredients: Ingredient[]){
            /* for(let ingredient of ingredients){
                this.addIngredient(ingredient);
            } */

            this.ingredients.push(...ingredients);
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    
}