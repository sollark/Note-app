import { Button } from 'react-bootstrap'

const backgroundImage = {
  backgroundImage: 'url(src/assets/bg.jpg)',
  backgroundSize: 'cover',
  height: 'calc(100vh - 90px)',
}

interface WelcomePageProps {
  onTry: () => void
}

export default function WelcomePage({ onTry }: WelcomePageProps) {
  return (
    <div
      className='bg-image d-flex align-items-center justify-content-center'
      style={backgroundImage}>
      <article className='content'>
        <h1>Take a note. </h1>
        <Button variant='primary' onClick={onTry}>
          Give a try.
        </Button>
      </article>
    </div>
  )
}
