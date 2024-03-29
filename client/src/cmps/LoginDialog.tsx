import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { User, UserLogin } from '../models/user'
import { userService } from '../services/user.service'
import TextInput from './form/TextInput'

interface LoginDialogProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

export function LoginDialog({
  onDismiss,
  onLoginSuccessful,
}: LoginDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(credentials: UserLogin) {
    try {
      const user = await userService.login(credentials)
      if (user) {
        onLoginSuccessful(user)
        onDismiss()
      }
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          <TextInput
            name='username'
            label='Username'
            type='text'
            placeholder='Enter username'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInput
            name='password'
            label='Password'
            type='password'
            placeholder='Enter password'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting} className='w-100 mt-3'>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
