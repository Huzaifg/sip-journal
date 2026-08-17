import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { EntryPage } from './pages/Entry'
import { GuidePage } from './pages/Guide'
import { HomePage } from './pages/Home'
import { JournalPage } from './pages/Journal'
import { LearnPage } from './pages/Learn'
import { PalatePage } from './pages/Palate'
import { TastePage } from './pages/Taste'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:slug" element={<GuidePage />} />
          <Route path="/taste" element={<TastePage />} />
          <Route path="/taste/:id" element={<TastePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/sip/:id" element={<EntryPage />} />
          <Route path="/palate" element={<PalatePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
