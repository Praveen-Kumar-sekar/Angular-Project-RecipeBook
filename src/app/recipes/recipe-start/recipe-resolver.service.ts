import { Injectable, resolveForwardRef } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStroageService } from "src/app/shared/data-storage-service";
import { RecipeService } from "../recipe.service";
import {Recipes} from '../recipes.model';
@Injectable({providedIn :'root'})
export class RecipeResolverService implements Resolve<Recipes[]> {

    constructor (private datastroageservice :  DataStroageService, private recipeService : RecipeService){

        
    }
    resolve(route : ActivatedRouteSnapshot,state :RouterStateSnapshot ){
        const recipes = this.recipeService.getRecipes();
if(recipes.length ===0){
        return this.datastroageservice.fetchRecipes();
    }
else 
return recipes;    }
}