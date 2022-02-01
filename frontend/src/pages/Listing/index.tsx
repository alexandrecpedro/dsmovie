import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    // ERROR METHOD - REQUERING API DATA (UNLINKED WITH LIFETIME CYCLE OF REACT COMPONENTS)
    // axios.get(`${BASE_URL}/movies?size=12&page=0`)
    //     .then(response => {
    //         console.log(response.data);
    //     })

    // REACT HOOKS (useState e useEffect)
    // Hooks são funções cujo comportamento está vinculado ao estado e ao ciclo de vida do React a partir de componentes funcionais.
    // https://pt-br.reactjs.org/docs/hooks-overview.html

    // ITEM A - Hook: useState
    // Manter estado no componente

    // ITEM B - Hook: useEffect
    // Executar algo na instanciação ou destruição do componente, observar estado

    const [pageNumber, setPageNumber] = useState(0);

    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=title`)
            .then(response => {
                const data = response.data as MoviePage;
                setPage(data);
            });
    }, [pageNumber]);

    const handlePageChange = (newPageNumber : number) => {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <Pagination page={page} onChange={handlePageChange} />
            <div className="container">
                <div className="row">
                    {page.content.map(movie => (
                        <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Listing;