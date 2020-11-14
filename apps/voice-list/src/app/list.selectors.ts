import { createSelector } from '@ngrx/store';
import { ItemsInStore, ListsInStore, ListWithItems, State } from './list.reducer';

export const getLists = (state: {appState: State}): ListsInStore => { return state.appState.lists }
export const selectItems = (state: State): ItemsInStore => state.items;

export const selectLists = createSelector(
    getLists,
    (state: ListsInStore) => state.allIds.map(id => state.byId[id])
);

export const selectSingleList = createSelector(
    (state: { appState: State }) => state.appState,
    (state: State, props: { listName: string }): ListWithItems => {
        console.log(state);
        const listMeta = state.lists.byId[props.listName];
        const items = Object.values(state.items.byId).filter(item => item.listName === props.listName);

        return {
            ...listMeta,
            items
        }
    }
)
