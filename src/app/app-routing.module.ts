import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-start/recipe-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {path:'',redirectTo:'/recipes',pathMatch:'full'},
{path: 'recipes',component:RecipesComponent,children:[

  {path:'',component: RecipeStartComponent},
  {path:':id',component:RecipesDetailComponent, resolve : [RecipeResolverService]},
  {path:'new',component: RecipeEditComponent, resolve : [RecipeResolverService]},
{path:':id/edit',component: RecipeEditComponent},

]},
{path: 'shopping-list',component:ShoppingListComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
