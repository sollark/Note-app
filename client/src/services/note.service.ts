import { Note } from '../models/note'
import { httpService } from './http.service'

//  exports
export const noteService = {
  query,
  //   save,
  //   get,
  //   remove,
  //   getEmptyTodo,
}

async function query(): Promise<Note[]> {
  return await httpService.get('note')
}
