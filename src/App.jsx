import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './components/Shell'

const Home = lazy(() => import('./routes/Home'))
const Platform = lazy(() => import('./routes/Platform'))
const Framework = lazy(() => import('./routes/Framework'))
const Solutions = lazy(() => import('./routes/Solutions'))
const Security = lazy(() => import('./routes/Security'))
const Demo = lazy(() => import('./routes/Demo'))

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="framework" element={<Framework />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="security" element={<Security />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
