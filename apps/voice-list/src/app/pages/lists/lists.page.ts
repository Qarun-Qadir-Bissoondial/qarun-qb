import { Component, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import {  select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createList } from '../../list.actions';
import { List, State } from '../../list.reducer';
import { selectLists } from '../../list.selectors';
import { SingleListPage } from '../single-list/single-list.page';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.css']
})
export class ListsPage {

  lists$: Observable<List[]>;

  constructor(
    private store: Store<{appState: State}>,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) {
    this.lists$ = this.store.pipe(select(selectLists));
  }

  createList(addListTemplate: TemplateRef<any>) {
    this.dialog
      .open(addListTemplate)
      .afterClosed()
      .pipe(filter(response => !!response))
      .subscribe((newListName: string) => {
        this.store.dispatch(createList({listName: newListName}));
      })
  }

  openListDetais(listName: string) {
    this.bottomSheet.open(SingleListPage, {
      data: {
        listName,
      },
      panelClass: 'fullscreen',
      
    })
  }

}
