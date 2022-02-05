const claimBtn = document.querySelector('.search_icon');
const invalidLink = document.querySelector('.invalid_link');
const searchResult = document.querySelector('.search_result');
const searchBar = document.querySelector('.searchbar');
claimBtn.addEventListener('click', e => {
    e.preventDefault();
    const walletAddress = document.querySelector('.search_input').value;
    if (walletAddress.match(/([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}/)) {
        invalidLink.style.display = 'none';
        searchResult.style.display = 'block';
        searchBar.style.display = "none";

    } else {
        invalidLink.style.display = 'block';
        searchResult.style.display = 'none';
        searchBar.style.display = 'block';


    }
})