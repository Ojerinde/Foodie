import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered(e.g. recipe)
   * @param {Boolean} [render=true] if false, create markut string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View instance
   * @author Joel Ojerinde
   * @todo FInish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup; // This will only be false for the for the bookmarksView and resultsView. Where the second parameter is passed. and so, markup will be returned to where the function is called
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); // This will convert the string (newMarkup) to real virtual DOM node objects that lives in the memory but not on the page.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Looping over two arrays
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //   console.log(curEl, newEl.isEqualNode(curEl)); // isEqualNode compares the contents and not the node of newEl and curEl.
      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attri =>
          curEl.setAttribute(attri.name, attri.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
              <div>
                <svg>
                  <use href="${icons}icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
