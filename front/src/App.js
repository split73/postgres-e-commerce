import AddNewProduct from "./components/addNewProduct/AddNewProduct";
import Content from "./components/content/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SingleGuitarPage from "./components/singleGuitarPage/SingleGuitarPage"
import MainPage from "./components/mainPage/MainPage";

function App() {
  return (
    <div style={{display: "grid"}}>
      <BrowserRouter>
   
      <Routes>
        <Route path="/:page" element={<Content></Content>}/>
        <Route path="/add" element={<AddNewProduct></AddNewProduct>}/>
        <Route path="/guitar/:id" element={<SingleGuitarPage></SingleGuitarPage>}/>
        <Route path="/" element={<MainPage></MainPage>}/>
      </Routes>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
