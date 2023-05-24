import { Injectable, resolveForwardRef } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStroageService } from "src/app/shared/data-storage-service";
import {Recipes} from '../recipes.model';
@Injectable({providedIn :'root'})
export class RecipeResolverService implements Resolve<Recipes[]> {

    constructor (private datastroageservice :  DataStroageService){

        
    }
    resolve(route : ActivatedRouteSnapshot,state :RouterStateSnapshot ){

        return this.datastroageservice.fetchRecipes();
    }
}