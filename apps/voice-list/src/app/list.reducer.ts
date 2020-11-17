import { Action, createReducer, on } from '@ngrx/store';
import { generateFakeList } from '../testing/fake-gen';
import * as ListActions from './list.actions';

function cloneObject<T> (obj: T, mode: 'shallow' | 'deep' = 'deep'): T {
    return mode === 'shallow' ? Object.assign({}, obj) : JSON.parse(JSON.stringify(obj));
}

export interface List {
    listName: string;
    total: number;
    completed: number;
    pending: number;
}

export interface Item {
    name: string;
    listName: string;
    completed: boolean;
}

export interface ListWithItems extends List {
    items: Item[];
}

export interface ListsInStore {
    byId: { [listName: string]: List },
    allIds: string[];
}

export interface ItemsInStore {
    byId: { [itemName: string]: Item };
    allIds: string[]
}

export interface State {
    lists: ListsInStore;
    items: ItemsInStore
}

export const initialState: State = {
    lists: {
        byId: {
            'Dummy List 1': generateFakeList('Dummy List 1')
        },
        allIds: ['Dummy List 1']
    },
    items: {
        byId: {},
        allIds: []
    }
};

const createDefaultList = (listName: string): List => ({ listName, total: 0, pending: 0, completed: 0 });
const createDefaultItem = (name: string, listName: string): Item => ({name, listName, completed: false });

const storeReducer = createReducer(
    initialState,
    on(ListActions.createList, (state, meta) => {
        const { listName } = meta;

        return {
            lists: {
                allIds: state.lists.allIds.concat(listName),                
                byId: {
                    ...state.lists.byId,
                    [listName]: createDefaultList(listName)
                }
            },
            items: {...state.items}
        }
    }),

    on(ListActions.deleteList, (state, meta) => {

        console.log(state);
        
        // delete all items associated with the list
        const itemsOfList = state.items.allIds.filter(id => { state.items.byId[id].listName === meta.listName });
        console.log(itemsOfList);

        const newState = cloneObject(state);

        for (const item of itemsOfList) {
            newState.items.allIds.splice(newState.items.allIds.indexOf(item), 1);
            delete newState.items.byId[item];
        }
    
        const allListIds = Array.from(newState.lists.allIds);
        allListIds.splice(allListIds.indexOf(meta.listName), 1);
        
        delete newState.lists.byId[meta.listName]
        newState.lists.allIds = allListIds;

        console.log(newState);

        return newState;
    }),

    on(ListActions.editListName, (state, meta) => {

        const newState = cloneObject(state);
        const { allIds, byId } = newState.lists;
        const { oldListName, newListName } = meta;

        // update allIds array in lists
        allIds.splice(allIds.indexOf(oldListName), 1);
        allIds.push(newListName);
        
        // update byId key in lists
        byId[newListName] = {...cloneObject(byId[oldListName]), listName: newListName}; 
        delete byId[oldListName];

        newState.lists = {
            byId,
            allIds
        }

        console.log(newState);
        return newState;

    }),

    on(ListActions.createListItem, (state, meta) => {

        const { itemName, listName } = meta;
        const newItems = cloneObject(state.items);
        
        newItems.allIds = newItems.allIds.concat(itemName);
        newItems.byId = { ...newItems.byId, [itemName]: createDefaultItem(itemName, listName) };
        
        const newState = cloneObject(state);
        newState.items = Object.assign({}, newItems);
        newState.lists.byId[listName].total++;
        newState.lists.byId[listName].pending++;

        return newState;
    }),

    on(ListActions.deleteListItem, (state, meta) => {
        
        const { listName, itemName } = meta;
        const newState = cloneObject(state);
        const item = newState.items.byId[itemName];

        // updated list item count
        const list = newState.lists.byId[listName];
        list.total--;
        item.completed
        ? list.completed--
        : list.pending--;

        // remove item from state
        newState.items.allIds.splice(newState.items.allIds.indexOf(itemName));
        delete newState.items.byId[itemName];

        return newState;
    }),

    on(ListActions.markItemIncomplete, (state, meta) => {

        const { listName, itemName } = meta;
        const newState = cloneObject(state);
        newState.lists.byId[listName].completed--;
        newState.lists.byId[listName].pending++;
        newState.items.byId[itemName].completed = false;
        return newState;
    }),

    on(ListActions.markItemComplete, (state, meta) => {

        const { listName, itemName } = meta;
        const newState = cloneObject(state);

        const updatedList =  newState.lists.byId[listName];
        updatedList.completed++;
        updatedList.pending--;

        const updatedItem = newState.items.byId[itemName];
        updatedItem.completed = true;

        return newState;
    })

);

export function reducer(state: State | undefined, action: Action) {
    return storeReducer(state, action)
}
