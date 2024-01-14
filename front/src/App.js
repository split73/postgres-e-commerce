import Tst from "./components/Tst";
import AddNewProduct from "./components/addNewProduct/AddNewProduct";
import Content from "./components/content/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SingleGuitarPage from "./components/singleGuitarPage/SingleGuitarPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:page" element={<Content></Content>}/>
        <Route path="/add" element={<AddNewProduct></AddNewProduct>}/>
        <Route path="/guitar/:id" element={<SingleGuitarPage></SingleGuitarPage>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
