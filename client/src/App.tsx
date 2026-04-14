import MainRoute from "./routes/MainRoute"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <MainRoute/>
      <Toaster position="top-center"/>
    </div>
  )
}

export default App
