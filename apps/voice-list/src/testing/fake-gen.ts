import { List } from '../app/list.reducer';

export const generateFakeList = (listName: string): List => {
  return {
      listName,
      completed: 0,
      pending: 0,
      total: 0
  };
}