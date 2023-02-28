import { Button, Form, Modal } from 'react-bootstrap'
import { NewNote, Note as NoteModel } from '../models/note'
import { useForm } from 'react-hook-form'
import { noteService } from '../services/note.service'

interface AddNoteDialogProps {
  onDismiss: () => void
  onNoteSave: (note: NoteModel) => void
}

export function AddNoteDialog({ onDismiss, onNoteSave }: AddNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewNote>()

  async function onSubmit(input: NewNote) {
    console.log('Saving note', input)
    try {
      const noteResponse = await noteService.save(input)
      if (noteResponse) onNoteSave(noteResponse)
    } catch (error) {
      console.log('Error saving note', error)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='AddNoteForm' onSubmit={handleSubmit(onSubmit)}>
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
        <Button type='submit' form='AddNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
