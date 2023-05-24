import { Component, EventEmitter, Output } from '@angular/core';
import { DataStroageService } from '../shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStroageService){}
  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

  onSaveDAta(){
this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
