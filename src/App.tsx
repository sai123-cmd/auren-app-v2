import { Routes, Route } from 'react-router'
import Today from './pages/Today'
import Memory from './pages/Memory'
import TA from './pages/TA'
import Community from './pages/Community'
import Onboarding from './pages/Onboarding'
import Settings from './pages/Settings'
import FindPet from './pages/FindPet'
import Chat from './pages/Chat'
import Auth from './pages/Auth'
import DevicePairing from './pages/DevicePairing'
import PetInfo from './pages/PetInfo'
import PhotoCapture from './pages/PhotoCapture'
import AvatarSelect from './pages/AvatarSelect'
import AhaMoment from './pages/AhaMoment'
import FindPetDetail from './pages/FindPetDetail'
import Growth from './pages/Growth'
import Costume from './pages/Costume'
import TaMore from './pages/TaMore'
import SharePage from './pages/SharePage'
import StoryDetail from './pages/StoryDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Today />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/ta" element={<TA />} />
      <Route path="/community" element={<Community />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/find-pet" element={<FindPet />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/device-pairing" element={<DevicePairing />} />
      <Route path="/pet-info" element={<PetInfo />} />
      <Route path="/photo-capture" element={<PhotoCapture />} />
      <Route path="/avatar-select" element={<AvatarSelect />} />
      <Route path="/aha-moment" element={<AhaMoment />} />
      <Route path="/find-pet-detail" element={<FindPetDetail />} />
      <Route path="/growth" element={<Growth />} />
      <Route path="/costume" element={<Costume />} />
      <Route path="/ta-more" element={<TaMore />} />
      <Route path="/share" element={<SharePage />} />
      <Route path="/story-detail" element={<StoryDetail />} />
    </Routes>
  )
}
