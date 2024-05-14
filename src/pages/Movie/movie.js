import {useEffect, useState} from "react";
import {useParams, useNavigation, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './movies.css'
import { toast } from 'react-toastify'

function Movie(){
    const { id } = useParams()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadMovie(){
            await api.get(`movie/${id}`, {
                params:{
                    api_key: '512af7a3d751c70ebd3edbb460559a20',
                    language: 'pt-BR',
                }
            })
                .then((response) => {
                    setMovies(response.data)
                    setLoading(false)
                })
                .catch(() => {
                    console.log('filme nao encontrado')
                    navigate('*', {replace: true})
                    return
                })

        }

        loadMovie()

        return() => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    function saveMovie(){
        const myList = localStorage.getItem('@primeFlix')

        let savedMovies = JSON.parse(myList) || []

        const hasMovies = savedMovies.some((savedMovies) => savedMovies.id === movies.id)

        if(hasMovies){
            toast.error("Este filme já está salvo")
            return
        }

        savedMovies.push(movies)
        localStorage.setItem('@primeFlix', JSON.stringify(savedMovies))
        toast.success("Filme salvo com sucesso")
    }

    if(loading){
        return(
            <div className="movie-info">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="movie-info">
            <h1>{movies.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt={movies.title}/>
            <h3>Sinopse</h3>
            <span>{movies.overview}</span>
            <strong>Avaliação: {movies.vote_average} / 10</strong>

            <div className='buttons'>
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https:youtube.com/results?search_query=${movies.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Movie;