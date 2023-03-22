const backgroundImage = {
  backgroundImage: 'url(src/assets/bg.jpg)',
  backgroundSize: 'cover',
  height: 'calc(100vh - 90px)',
}

export default function WelcomePage() {
  return (
    <div
      className='bg-image d-flex align-items-center justify-content-center'
      style={backgroundImage}>
      <h1>Take a note. It is free.</h1>
    </div>
  )
}
