import axios from 'axios';

const hasSignedIn = async () => {
    const res = await axios.get('/hasSignedIn');
    return res;
}
export default hasSignedIn;