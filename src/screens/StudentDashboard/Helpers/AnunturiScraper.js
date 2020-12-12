import rp from 'request-promise';

const getAnunturi=()=>{

    rp("https://cors-anywhere.herokuapp.com/https://news.ubbcluj.ro/category/comunicate-de-presa/")
        .then(html => console.log(html))
};

export default getAnunturi;