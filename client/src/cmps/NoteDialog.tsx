import { Button, Form, Modal } from 'react-bootstrap'
import { NewNote as NewNoteModal, Note as NoteModel } from '../models/note'
import { useForm } from 'react-hook-form'
import { noteService } from '../services/note.service'

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
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Write a note'
              rows={5}
              {...register('text')}
            />
          </Form.Group>
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
