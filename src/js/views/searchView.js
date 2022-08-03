class SearchView {
  _parentEL = document.querySelector('.search');

  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEL.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    }); // The parentEL so we can listen to submit.
  }
}
export default new SearchView();
