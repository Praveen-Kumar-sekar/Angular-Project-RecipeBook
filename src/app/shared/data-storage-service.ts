import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipes } from "../recipes/recipes.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";


@Injectable({ providedIn: "root" })


export class DataStroageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-205fb-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);


            });


        ;

    }

    fetchRecipes() {
        return this.http.get<Recipes[]>('https://recipe-book-205fb-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {

                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });


                    
                }), tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                }))




            ;

    }

}