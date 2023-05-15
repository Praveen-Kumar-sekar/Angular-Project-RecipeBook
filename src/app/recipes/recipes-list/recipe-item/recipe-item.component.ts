import { Component, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipes } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input()
  recipe!: Recipes;

  @Input() index!:number;

  constructor(private recipeService: RecipeService){}
 


}
