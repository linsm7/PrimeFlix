import './favorites.css'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Favorites(){
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const myList = localStorage.getItem('@primeFlix')
        setMovies(JSON.parse(myList) || [])

    }, []);

    function deleteMovie(id){
        let filterMovies = movies.filter((item) => {
            return (item.id !== id)
        })
        setMovies(filterMovies)
        localStorage.setItem('@primeFlix', JSON.stringify(filterMovies))
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className="my-favorites">
            <h1>Meus filmes</h1>

            {movies.length === 0 && <span>Você não possui nenhum filme favorito :(</span>}

            <ul>
                {movies.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;