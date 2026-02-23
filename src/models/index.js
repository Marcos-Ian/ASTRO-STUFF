import BlackHole from './BlackHole'
import Cancri55System from './Cancri55System'
import GlassJupiter from './GlassJupiter'
import Hr8799System from './Hr8799System'
import Kepler10System from './Kepler10System'
import Kepler90System from './Kepler90System'
import MagnetarSystem from './MagnetarSystem'
import PulsarSystem from './PulsarSystem'
import ProximaCentauriSystem from './ProximaCentauriSystem'
import SolarSystem from './SolarSystem'
import StarSphere from './StarSphere'
import TrappistSystem from './TrappistSystem'
import WhiteDwarf from './WhiteDwarf'
import Wasp121System from './Wasp121System'

export const modelRegistry = {
  blackHole: BlackHole,
  cancri55System: Cancri55System,
  glassJupiter: GlassJupiter,
  hr8799System: Hr8799System,
  kepler10System: Kepler10System,
  kepler90System: Kepler90System,
  magnetarSystem: MagnetarSystem,
  pulsarSystem: PulsarSystem,
  proximaCentauri: ProximaCentauriSystem,
  trappistSystem: TrappistSystem,
  whiteDwarf: WhiteDwarf,
  wasp121System: Wasp121System,
  solarSystem: SolarSystem,
  starSphere: StarSphere,
}
