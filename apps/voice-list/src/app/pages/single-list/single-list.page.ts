import { Component, OnDestroy, ViewChild, TemplateRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { VoiceService } from '../../services/voice.service';
import { MatRipple } from '@angular/material/core';
import { ListWithItems, State } from '../../list.reducer';
import { select, Store } from '@ngrx/store';
import { createListItem, deleteList, deleteListItem, editListName, markItemComplete, markItemIncomplete } from '../../list.actions';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectSingleList } from '../../list.selectors';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.page.html',
  styleUrls: ['./single-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleListPage implements OnDestroy {
  @ViewChild(MatRipple) ripple: MatRipple;
  @ViewChild('help') helpTemplate: TemplateRef<any>;

  list$: Observable<ListWithItems>;
  listName: string;
  listening: BehaviorSubject<boolean> = new BehaviorSubject(true);
  listeningTrigger;

  constructor(
    private voice: VoiceService,
    private store: Store<{appState: State}>,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<SingleListPage>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { listName: string }) {

      this.listName = this.data.listName;
      this.list$ = this.store.pipe(select(selectSingleList, { listName: this.listName }));
      this.toggleListening(true);
  }

  toggleListening(checked: boolean) {
    this.listening.next(checked);

    if (checked) {
      this.listeningTrigger = setInterval(() => {
          const rippleRef = this.ripple.launch({
            centered: true,
          });
    
          rippleRef.fadeOut();
        }, 2000);

      this.startListening();
    } else {
      clearInterval(this.listeningTrigger);
      this.voice.teardown();
    }
  }

  openAddListDialog(addItemTemplate: TemplateRef<any>) {
    this.dialog.open(addItemTemplate)
      .afterClosed()
      .pipe(filter(response => !!response))
      .subscribe(itemName => {

        this.store.dispatch(createListItem({ listName: this.listName, itemName }));

      });
  }

  toggleCompletion(status: boolean, itemName: string) {
    status
      ? this.markAsCompleted(itemName)
      : this.markAsIncomplete(itemName)
  }

  markAsCompleted(itemName: string) {
    this.store.dispatch(markItemComplete({listName: this.listName, itemName}))
  }

  markAsIncomplete(itemName: string) {
    this.store.dispatch(markItemIncomplete({listName: this.listName, itemName}));
  }

  deleteList(deleteTemplate: TemplateRef<any>, listName: string) {
    this.dialog.open(deleteTemplate)
      .afterClosed()
      .pipe(filter(response => !!response))
      .subscribe(() => {
        this.store.dispatch(deleteList({listName}));
        this.bottomSheetRef.dismiss();
      });
  }

  editList(editTemplate: TemplateRef<any>, oldListName: string) {
    this.dialog.open(editTemplate)
      .afterClosed()
      .pipe(filter(response => (!!response) && (response !== oldListName) ))
      .subscribe((listName: string) => {
        this.listName = listName;
        this.store.dispatch(editListName({oldListName, newListName: listName}));
        this.list$ = this.store.pipe(select(selectSingleList, { listName }));
      })
  }

  deleteItem(itemName: string) {
    this.store.dispatch(deleteListItem({listName: this.listName, itemName}))
  }

  closeList() {
    this.bottomSheetRef.dismiss();
  }

  startListening() {
    const add = (itemName: string) => {  this.store.dispatch(createListItem({listName: this.listName, itemName })); };
    const remove = (itemName: string) => { this.store.dispatch(deleteListItem({listName: this.listName, itemName})) };
    const markComplete = (item: string) => { this.markAsCompleted(item) };
    const markIncomplete = (item: string) => { this.markAsIncomplete(item) };
    const stop = () => { 
      this.toggleListening(false);
    }
    const closeList = () => { this.bottomSheetRef.dismiss(); } 

    const commands = [
      {
        'stop listening': stop
      },
      {
        'close': closeList,
        'exit': closeList
      },
      {
        'add :item': add,
        'we need :item': add
      },
      {
        'remove :item': remove,
        'delete :item': remove
      },
      {
        'check :item': markComplete,
        'we got :item': markComplete,
        'we have :item': markComplete
      },
      {
        'uncheck :item': markIncomplete
      }
    ];

    // @ts-ignore
    this.voice.addCommands(commands).init();
    console.log('added commands...');
  }

  openHelp() {
    this.dialog.open(this.helpTemplate);
  }

  ngOnDestroy(): void {
    this.toggleListening(false);
  }
  
}