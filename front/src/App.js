import AddNewProduct from "./components/addNewProduct/AddNewProduct";
import Content from "./components/content/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SingleGuitarPage from "./components/singleGuitarPage/SingleGuitarPage"
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div style={{display: "grid"}}>
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/:page" element={<Content></Content>}/>
        <Route path="/add" element={<AddNewProduct></AddNewProduct>}/>
        <Route path="/guitar/:id" element={<SingleGuitarPage></SingleGuitarPage>}/>
      </Routes>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
