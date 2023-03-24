import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { UserSignup } from '../models/user'
import { userService } from '../services/user.service'
import TextInput from './form/TextInput'

interface SignUpProps {
  onDismiss: () => void
  onSignUpSuccessful: (user: User) => void
}

export function SignUpDialog({ onDismiss, onSignUpSuccessful }: SignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSignup>()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(credentials: UserSignup) {
    try {
      const user = await userService.signup(credentials)
      if (user) {
        onSignUpSuccessful(user)
        onDismiss()
      }
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && <p>{errorMessage}</p>}
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
            name='email'
            label='Email'
            type='email'
            placeholder='Enter your email'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
