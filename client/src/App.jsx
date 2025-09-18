import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import Login from "./pages/Login"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Login/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App