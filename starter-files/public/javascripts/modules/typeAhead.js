import axios from 'axios';
import dompurify from 'dompurify'

function searchResultsHTML(stores) {
  return stores.map(store => {
    return `
      <a href="/stores/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `
  }).join('');
};

function typeAhead(search) {
  if (!search) return;
  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');
  searchInput.on('input', function() {
    if (!this.value) {
      // if there is not value, quit it!
      searchResults.style.display = 'none';
      return; // stop;
    }
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';
    axios
      .get(`/api/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          searchResults.innerHTML = searchResultsHTML(res.data);;
          return;
        }
        // tell them nothing came back
        searchResults.innerHTML = `<div className="search__result">
        No results for ${this.value}</div>`
      }).catch(err => {
        console.error(err);
      });
  })

  searchInput.on('keyup', (e) => {
    // console.log(e.keyCode);
    // if they aren't clicking up, down or up
    if (![38, 40, 13].includes(e.keyCode)) {
      return;
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
    }
    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  })
};

export default typeAhead;
