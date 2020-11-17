export const DEFAULT_STORE = {
    lists: {
        byId: {
            'list1': {
                name: 'list1',
                completed: 0,
                pending: 2,
                total: 2
            }
        },
        allIds: ['list1']
    },
    items: {
        byId: {
            'item1': {
                name: 'item1',
                listName: 'list1',
                completed: false
            },
            'item2': {
                name: 'item2',
                listName: 'list1',
                completed: false
            }
        },
        allIds: ['item1', 'item2']
    }
}