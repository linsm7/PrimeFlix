import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/home'
import Movie from './pages/Movie/movie'
import Erro from './pages/Erro/erro'
import Favorites from "./pages/Favorites/favorites";

import Header from './components/Header/header'

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/movie/:id' element={ <Movie/> } />
                <Route path='/favorites' element={ <Favorites/> } />

                <Route path='*' element={ <Erro/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;