import createElement from "../lib/createElement.js";
export default class StatsCard {

  elem = null;
  #data = []

  constructor(data) {
    this.#data = data || this.#data;
    this.elem = this.#render();
  }
  #template() {
    const { id, title, svg, timeframes } = this.#data;

    let timeframe = null;
    for (const key in timeframes) {
      timeframe = timeframes[key];
    }

    const { current, previous } = timeframe;

  
    return `
        <div class="card  card--${id}">
          <div class="card__top">
            <img class="card__image" src='./images/${svg}' alt="${title}">
          </div>
          <div class="card__body">
            <div class="card__body-inner">
              <div class="card__title">${title}</div>
              <svg class="ellipsis" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
            </div>
            <div class="card__hours">${current}hrs</div>
            <div class="card__comparison">Last Week - ${previous}hrs</div>
          </div>
        </div>
    `;
  }
  

  #render() {
    this.elem = createElement(this.#template());
    return this.elem
  }
}
