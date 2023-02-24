import { NewNote, Note } from '../models/note'
import { httpService } from './http.service'

//  exports
export const noteService = {
  query,
  save,
  //   get,
  //   remove,
  //   getEmptyTodo,
}

async function query(): Promise<Note[]> {
  return await httpService.get('note')
}

async function save(note: NewNote): Promise<Note | undefined> {
  const response = await httpService.post('note', note)
  if (response.success) return response.data

  console.log('Cannot save note:', response.message)
}
