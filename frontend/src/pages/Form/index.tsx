import FormCard from 'components/FormCard';
import { useParams } from 'react-router-dom';

function Form() {
    // useParams - get a url parameter
    const params = useParams();

    return (
        <FormCard movieId={`${params.movieId}`} />
    );
}

export default Form;
