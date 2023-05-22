import { Subject } from "rxjs";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged =  new Subject<Ingredient[]>();
    startedEditting = new Subject<Number>();

   private ingredients: Ingredient[]= [
        new Ingredient ('apple',100),
        new Ingredient ('tomato',50)
        
        
        ];
        
        getIngredients(){
            return this.ingredients.slice();
        }


        getIngredient(index:number){
            return this.ingredients[index];
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

        updateIngredient(index: number,newIngredient: Ingredient){
            this.ingredients[index] = newIngredient;
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    
}