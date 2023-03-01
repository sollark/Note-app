import { NewNote, Note } from '../models/note'
import { httpService } from './http.service'

const URL = 'note/'

//  exports
export const noteService = {
  query,
  save,
  //   get,
  remove,
}

async function query(): Promise<Note[]> {
  return await httpService.get(URL)
}

async function save(note: NewNote): Promise<Note | undefined> {
  const response = await httpService.post(URL, note)
  if (response.success) return response.data

  console.log('Cannot save note:', response.message)
}

async function remove(noteId: string) {
  const response = await httpService.delete(URL + noteId)
  if (response.success) console.log(response.message)
  else console.log('Cannot remove note:', response.message)
}