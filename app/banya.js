/*
*
*
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

const peoples = [
	{name: "Ставровский Илья", id: "Ilya", row: ["Ilya",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Гордеев Иван", id: "Ivan", row: ["Ivan",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Прохоров Дмитрий", id: "Dmitry", row: ["Dmitry",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Казанцев Николай", id: "Nikolay", row: ["Nikolay",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Пустовойт Андрей", id: "Andrey", row: ["Andrey",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Авсянкин Дмитрий", id: "DmitryA", row: ["DmitryA",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Николаев Евгений", id: "Evgeny", row: ["Evgeny",false, false, false, false, 0], checked: false, idx: -1},
	{name: "Николаев Илья", id: "Ilya", row: ["Ilya",false, false, false, false, 0], checked: false, idx: -1},

];


new Vue({
	el: '#banya',
	data: {
		rows: [],
		peoples: peoples,
		titles: titles,
		sum: 0,
		countPeople: rows.length,
		oHour: {},
		costOneH: 1250,
		peopleFlagShow: false
	},
	methods: {
		addPeople(people) {
			if (!people.checked) {
				this.rows.push(people.row);
				people.idx = this.rows.length - 1;
			} else {
				this._setNewIdxs(people.idx);
				this.rows.splice(people.idx, 1);
				people.idx = -1;
			}

			people.checked = !people.checked;			
			
		},
		_setNewIdxs(idx) {
			var peoples = this.peoples;
			peoples.forEach(prop => {
				
					if (prop.idx  > idx) {
						//console.log("DO", peoples.name, peoples.idx);
						prop.idx--;
					}	//console.log("POSLE", peoples.name, peoples.idx);
				});
			
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
			console.log("ROWS", rows);
			//that.rows = rows;
			/*изменение модели с итоговыми данными*/

		},
		getClear() {
			var that = this;
			this.oHour = {};
			this.sum = 0;
			/*var oHour = this.oHour;*/

			rows.forEach((row, i) => {
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
		}
	},
	filters: {
		getCeil: function(num) {
			return Math.ceil(num);
		}
	}
});