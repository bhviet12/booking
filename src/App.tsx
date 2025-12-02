import christmasBg from './assets/christmas-christmaslights_KOAMLMIPSY.webp'
import MusicControl from './components/MusicControl'
import ChristmasHero from './components/ChristmasHero'
import ScheduleInfo from './components/ScheduleInfo'

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${christmasBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Music control */}
      <MusicControl autoPlay={true} />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
        <ChristmasHero />
        <ScheduleInfo />
      </div>
    </div>
  )
}

export default App
