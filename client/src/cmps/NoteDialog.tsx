import { Button, Form, Modal } from 'react-bootstrap'
import { NewNote as NewNoteModal, Note as NoteModel } from '../models/note'
import { useForm } from 'react-hook-form'
import { noteService } from '../services/note.service'
import TextInput from './form/TextInput'

interface NoteDialogProps {
  noteToEdit?: NoteModel
  onDismiss: () => void
  onNoteSave: (note: NoteModel) => void
}

export function NoteDialog({
  noteToEdit,
  onDismiss,
  onNoteSave,
}: NoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewNoteModal>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  })

  async function onSubmit(input: NewNoteModal | NoteModel) {
    console.log('Saving note', input)

    try {
      let noteResponse: NoteModel | void
      if (noteToEdit) {
        noteResponse = await noteService.save({ ...input, _id: noteToEdit._id })
      } else {
        noteResponse = await noteService.save(input)
      }

      if (noteResponse) onNoteSave(noteResponse)
    } catch (error) {
      console.log('Error saving note', error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit a note' : 'Add a note'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='NoteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name='title'
            label='Title'
            type='text'
            placeholder='Enter title'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />

          <TextInput
            name='text'
            label='Text'
            as='textarea'
            placeholder='Write a note'
            rows={5}
            register={register}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='NoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
