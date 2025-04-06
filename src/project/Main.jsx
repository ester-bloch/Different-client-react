import { BrowserRouter } from "react-router-dom"
import { Routing } from "./routing/Routing"
import { Provider } from "react-redux"
import { Nav } from "./routing/Nav"
import "../fontawesome/css/all.min.css"
import { myStore } from "./Data-Redux/store"

export const Main= () => {
return <>
<Provider store={myStore}>
<BrowserRouter>
    <Nav></Nav>
    <Routing></Routing>
</BrowserRouter>
</Provider>
</>
}

 