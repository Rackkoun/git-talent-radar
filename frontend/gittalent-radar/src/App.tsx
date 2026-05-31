import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import UserPage from "@/pages/UserPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/users/:username" element={<UserPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
