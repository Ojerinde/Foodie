import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultViews extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Pleae try again';
  _message = ' ';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultViews();
