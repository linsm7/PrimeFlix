import { useEffect, useState} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

function Home(){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: '512af7a3d751c70ebd3edbb460559a20',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            setMovies(response.data.results.slice(0,10))
            setLoading(false)
        }
        loadMovies()

    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='list-movies'>
                {movies.map((mov)=>{
                    return(
                        <article key={mov.id}>
                            <strong>{mov.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`} alt={mov.title}/>
                            <Link to={`/movie/${mov.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;