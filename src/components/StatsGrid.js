import createElement from "../lib/createElement.js";
import StatsCard from "./StatsCard.js";
export default class StatsGrid {
  #statsData = []

  constructor(statsData) {
    this.#statsData = statsData || this.#statsData;
    this.#render();
  }

  #render() {
    this.elem = createElement(`
      <div class="stats-grid">
        <div class="stats-grid__inner"></div>
      </div>
      `)
    this.#updateStatsGrid();
  }

  #updateStatsGrid() {
    const statsGridHolder = document.querySelector('[data-stats-grid-holder');
    const statsGridInner = this.elem.querySelector(".stats-grid__inner");
    statsGridHolder.innerHTML = '';
  
    this.#statsData.forEach((stats) => {
      const card = new StatsCard(stats); // Создаем карточку для каждого элемента
      statsGridInner.append(card.elem);
    });
  }

}