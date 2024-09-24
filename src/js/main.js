import StatsGrid from '../components/StatsGrid.js';
export default class Main {  
  constructor() {
    this.defaultStat = "weekly"; // Инициализируем стандартное значение
    this.onClick();
  }

  async render() {     
    this.getNewStat();
  }   

  async toggleStat() {     
    const data = await this.getDashboardData();     

    // Создаем новый массив с отфильтрованными данными     
    const newData = data.map((stat) => {       
      const { timeframes, ...rest } = stat; // Получаем timeframes и остальные данные       

      // Оставляем только defaultStat       
      const filteredTimeframes = {         
        [this.defaultStat]: timeframes[this.defaultStat],       
      };       

      // Возвращаем новый объект с отфильтрованными временными рамками       
      return {         
        ...rest,         
        timeframes: filteredTimeframes,       
      };     
    });     

    const statsGrid = new StatsGrid(newData);     
    const statsGridHolder = document.querySelector("[data-stats-grid-holder]");     
    statsGridHolder.append(statsGrid.elem);   
  }   

  async getDashboardData() {     
    const response = await fetch("data.json");     
    const statsData = await response.json();     
    return statsData;   
  }   

  onClick() {     
    const dashboardButtonAll = document.querySelectorAll(".dashboard__time-period .button");     
    let currentStat = this.defaultStat; // Используем this.defaultStat для хранения состояния
     
    dashboardButtonAll.forEach((button) => {       
      button.addEventListener("click", (evt) => {         
        currentStat = evt.target.dataset.timePeriodId;
        
        let currentButton = document.querySelector('.button--current');
        currentButton.classList.remove('button--current');
        currentButton = evt.target.classList.add('button--current');


        this.getNewStat(currentStat); // Вызываем getNewStat при нажатии кнопки       
      });     
    });     

    return currentStat;   
  }


  getNewStat(newStat = 'weekly') {
    this.defaultStat = newStat; // Обновляем значение defaultStat
    this.toggleStat(); // Перерисовываем данные с новым defaultStat
  }
}
