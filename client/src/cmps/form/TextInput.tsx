import { Form } from 'react-bootstrap'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface TextInputProps {
  name: string
  label: string
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions<any>
  error?: FieldError
  [key: string]: any // allow any other prop that is not explicitly defined
}

export default function TextInput({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputProps) {
  return (
    <Form.Group className='mb-3' controlId={name + '-input'}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type='invalid'>
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  )
}
