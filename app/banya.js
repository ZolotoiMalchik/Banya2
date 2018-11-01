/*
*
*
статус текущих задач

сделать отображение результатов: имя - сумма, без чекбоксов, отдельно, либо заместо экрана с чекбоксами
сделать git репозиторий
Добавить интервал посещения бани
Добавить расчет времени по минутам
Добавить профиль пользователей
Вынести приложение в отдельный проект
Опция Добавить нового пользователя
*
*
*/


const titles = ["Имя", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 24:00", "Итог"];
/*const rows = [
	{name: "Ilya", hourPrice: ["Ilya",false, false, false, false, 0], start: "20:00", end: "24:00"}, 
	{name: "Ivan", hourPrice: ["Ivan",false, false, false, false, 0], start: "20:00", end: "24:00"},
	{name: "Dmitry", hourPrice: ["Dmitry",false, false, false, false, 0], start: "20:00", end: "24:00"}
];*/

let rows = [
	["Ilya",false, false, false, false, 0],  
	["Ivan",false, false, false, false, 0],
	["Dmitry",false, false, false, false, 0],
	["Nikolay",false, false, false, false, 0],
	["Evgeny N.",false, false, false, false, 0],
	["Ilya N.",false, false, false, false, 0],
	["Oleg",false, false, false, false, 0],
	["Dmitry A.",false, false, false, false, 0]
];

const peoplesData = ["Ставровский Илья", "Гордеев Иван", "Прохоров Дмитрий", "Казанцев Николай", "Пустовойт Андрей", "Авсянкин Дмитрий", "Николаев Евгений", "Николаев Илья"];

function People(oParams) {
	this.name = oParams.name;
	this.id = oParams.id;
	this.row = oParams.row || [oParams.id, false, false, false, false, 0];
	this.checked = oParams.checked || false;
	this.idx = oParams.idx || -1;
}

/*const peoples = {
	{name: "Ставровский Илья", id: "Ilya", row: ["Ilya",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Гордеев Иван", id: "Ivan", row: ["Ivan",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Прохоров Дмитрий", id: "Dmitry", row: ["Dmitry",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Казанцев Николай", id: "Nikolay", row: ["Nikolay",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Пустовойт Андрей", id: "Andrey", row: ["Andrey",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Авсянкин Дмитрий", id: "DmitryA", row: ["DmitryA",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Николаев Евгений", id: "Evgeny", row: ["Evgeny",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Николаев Илья", id: "Ilya", row: ["Ilya",false, false, false, false, 0], checked: false, idx: -1},

};*/
let peoples = {};
peoplesData.forEach(name => {
	let id = +String(Math.random()).substr(2);
	peoples[id] = new People({name: name, id: id});
});


new Vue({
	el: '#banya',
	data: {
		rows: [],
		peoples: peoples,
		titles: titles,
		sum: 0,
		countPeople: 0,
		oHour: {},
		costOneH: 1250,
		peopleFlagShow: false,
		localhost: window.location.hostname === "localhost",
		newPeopleFIO: ""
	},
	methods: {
		// Добавление нового участника
		insertPeople() {
			if (this.newPeopleFIO) {
				let id = +String(Math.random()).substr(2);
				peoples[id] = new People({name: this.newPeopleFIO, id: id});
			}
		},
		// Добавление пользователей из списка в таблицу расчетов
		addPeople(id) {
			if (!id.checked) {
				this.rows.push(id.row);
				id.idx = this.rows.length - 1;
				this.countPeople++;
			} else {
				this._setNewIdxs(id.idx);
				this.rows.splice(id.idx, 1);
				id.idx = -1;
				this.countPeople--;
			}

			id.checked = !id.checked;			
			
		},
		_setNewIdxs(idx) {
			var peoples = this.peoples;
			for (let id in peoples) {
				if (peoples[id].idx > idx) {
					peoples[id].idx--;
				}
			}
			/*peoples.forEach(prop => {
				
					if (prop.idx  > idx) {
						
						prop.idx--;
					}	
				});*/
			
		},
		getHours() {
			var that = this;
			this.oHour = {};
			var rows = this.rows;
			/*var oHour = this.oHour;*/

			rows.forEach((row, i) => {
				row.forEach((el, idx, arr) => {
					if (idx > 0 && idx < (arr.length - 1) && el ) {

						if (!this.oHour[idx]) {
							this.oHour[idx] = 0;
							this.oHour[idx] ++;
						} else {
							this.oHour[idx] ++;
						}
						
						//console.log(idx, this.oHour[idx]);
					}
				});

			});
			//return this.oHour;
		},
		getOrder() {
			var that = this;
			console.log("START ORDER", this.oHour);
			var allHours = Object.keys(this.oHour).length;
			var result = 0;

			/*обнуление итоговых сумм перед расчетом*/
			/*this.rows.forEach((row, i) => {				
					row[row.length-1] = 0;
			});*/
			console.log("ROWS", this.rows);
			for (var i = 0; i < this.rows.length; i ++) {
				var row = this.rows[i];
				Vue.set(row, row.length - 1, 0);
			}

			
			/*расчет суммы за час на человека*/
			for (var count in this.oHour) {
				
				var res = this.costOneH/this.oHour[count];
				console.log("RES FOR H", count, res);
				
				this.rows.forEach(function(row, i, arr) {
					if (row[count]) {
						
						//that.rows[i][row.length-1] = row[row.length-1] + res;
						result += res;
						Vue.set(row, row.length - 1, row[row.length-1] + res);

						console.log("ORDER", i, row[0], row[row.length-1]);
					}
				});
			}

			this.sum = Math.ceil(result);
			//console.log("ROWS", rows);
			//that.rows = rows;
			/*изменение модели с итоговыми данными*/

		},
		getClear() {
			var that = this;
			this.oHour = {};
			this.sum = 0;
			/*var oHour = this.oHour;*/

			this.rows.forEach((row, i) => {
				row.forEach((el, idx, arr) => {
					if (idx > 0 && idx < (arr.length - 1)) {
						Vue.set(row, idx, false);													
					}
				});

			});
		},
		setAll(i) {
			var row = this.rows[i];
			row.forEach((el, idx, arr) => {
				if (idx > 0 && idx < (arr.length - 1)) {
					Vue.set(row, idx, true);													
				}
			});
			this.getHours();
		},
		setAllV(i) {
			var rows = this.rows;
			rows.forEach((row, idx, arr) => {
				if (i > 0 && i < (row.length - 1)) {
					Vue.set(row, i, true);													
				}
			});
			this.getHours();
		}
	},
	filters: {
		getCeil: function(num) {
			return Math.ceil(num);
		}
	}
});