const backgroundImage = {
  backgroundImage: 'url(src/assets/bg.jpg)',
  backgroundSize: 'cover',
  height: 'calc(100vh - 90px)',
}

export default function WelcomePage() {
  return (
    <div className='bg-image' style={backgroundImage}>
      WelcomePage
    </div>
  )
}
