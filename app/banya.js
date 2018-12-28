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
//import Vue from 'vue'
//import NewUserForm from '../components/NewUser.vue'


const titles = ["Имя", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 24:00", "Итог"];
/*const rows = [
	{name: "Ilya", hourPrice: ["Ilya",false, false, false, false, 0], start: "20:00", end: "24:00"}, 
	{name: "Ivan", hourPrice: ["Ivan",false, false, false, false, 0], start: "20:00", end: "24:00"},
	{name: "Dmitry", hourPrice: ["Dmitry",false, false, false, false, 0], start: "20:00", end: "24:00"}
];*/

/*let rows = [
	["Ilya",false, false, false, false, 0],  
	["Ivan",false, false, false, false, 0],
	["Dmitry",false, false, false, false, 0],
	["Nikolay",false, false, false, false, 0],
	["Evgeny N.",false, false, false, false, 0],
	["Ilya N.",false, false, false, false, 0],
	["Oleg",false, false, false, false, 0],
	["Dmitry A.",false, false, false, false, 0]
];
*/
const peoplesData = ["Ставровский Илья", "Гордеев Иван", "Прохоров Дмитрий", "Казанцев Николай", "Пустовойт Андрей", "Авсянкин Дмитрий", "Николаев Евгений", "Николаев Илья", "Гордеев Максим", "Заботин Денис", "Дорошенков Леонид", "Егоров Максим", "Давид Михаилян"].sort();

function People(oParams) {
	//var d1 = new Date().setHours(20, 0, 0, 0);
	//var d2 = new Date().setHours(24, 0, 0, 0);
	this.name = oParams.name;
	this.id = oParams.id;
	this.row = oParams.row || [oParams.id, false, false, false, false, 0];
	this.checked = oParams.checked || false;
	this.idx = oParams.idx || -1;
	this.dateStart = /*parseInt(d1.toString().substr(0,9) + "0000", 10)*/new Date().setHours(20, 0, 0, 0);
	this.dateEnd = /*parseInt(d2.toString().substr(0,9) + "0000", 10)*/new Date().setHours(24, 0, 0, 0);
	this.interval = (this.dateEnd - this.dateStart)/1000/60 - 60 // в минутах;
	this.sum = 0;
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


Vue.component('app-newuserform', {
	data() {
		console.log("C DATA", this);
		return { 
			newfio: ""}
	},
	props: ['showform'],
	template: `<div class="form-group" :class="{'hide': !showform, 'new-user-form': showform}">			
		<label class="new-user-form__lbl" for="FIO">Банная погремуха</label>
		<input v-model="newfio" type="text" class="form-control" id="FIO" placeholder="Введите погремуху">
		<button class="new-user-form__btn--insert" v-on:click="$emit('insert-people', newfio)">Добавить участника</button>
	</div>`
});

Vue.component('app-slider', {
	data: function() {
		console.log("APP-SLIDER");
		let date = new Date();
		let dateEnd = new Date();
		//let oBtn = this.$el.querySelector(".slider__btn");

		return {
			btnStart: {
				xClient: 0,
				dClient: 0,
				cClient: 0,
				hour: 20,
				date: null/*date*/,
				startMs: 0/*date.setHours(20, 0, 0)*/,
				oBtn: null,
				dBtn: 0,
				oSliderCount: null,
					styleObj: {
					left: ''
				}
			},
			btnEnd: {
				xClient: 0,
				dClient: 0,
				cClient: 0,
				hour: 20,
				date: null/*dateEnd*/,
				startMs: 0/*dateEnd.setHours(24, 0, 0)*/,
				oBtn: null,
				dBtn: 0,
				oSliderCount: null,
				styleObj: {
					left: '227.5px'
				}
			},				
			moveEventFlag: false,
			btnFlag: 0,
			bgLineStyle: {
				width: "100%",
				left: "0"
			},
		}
	},
	props: ['params'],
	created: function() {
		console.log("Created");
		this.btnStart.date = new Date(this.params.dateStart);
		this.btnStart.startMs = this.params.dateStart;
		this.btnEnd.date = new Date(this.params.dateEnd);
		this.btnEnd.startMs = this.params.dateEnd;
	},
	mounted: function() {

		if (!this.$el.getClientRects()[0]) return;

		this.$data.oBgLineOut = this.$el.querySelector('.slider__br-line--out');
		this.$data.oBgLine = this.$el.querySelector('.slider__br-line');		
		this.$data.btnStart.oBtn = this.$el.querySelector('.slider__btn');
		this.$data.btnStart.oSliderCount = this.$el.querySelector('.slider__count');
		this.$data.btnStart.dBtn = parseInt(getComputedStyle(this.$data.btnStart.oBtn).width, 10)/2;
		this.$data.btnStart.styleObj.left = "-" + this.$data.btnStart.dBtn + "px";
		this.$data.btnStart.xClient = this.$el.getClientRects()[0].x;

		this.$data.btnEnd.oBtn = this.$el.querySelector('.slider__btn-end');
		this.$data.btnEnd.oSliderCount = this.$el.querySelector('.slider__count-end');
		this.$data.btnEnd.dBtn = parseInt(getComputedStyle(this.$data.btnEnd.oBtn).width, 10)/2;
		//this.$data.btnEnd.styleObj.left = "225px";
		this.$data.btnEnd.xClient = this.$el.getClientRects()[0].x;
		this.$data.btnEnd.cClient = this.$data.btnEnd.oBtn.getClientRects()[0].x;
		this.$data.btnEnd.dClient = this.params.interval/*this.$data.btnEnd.cClient - this.$data.btnEnd.xClient*/;	

		this._setMoveParams('btnEnd', this.params.interval);

		console.log("Mounted");
	},
	methods: {
		sliderMDown(btn, e) {

			var that = this;
			var coords = this._getCoords(this[btn].oBtn);
			var pageX = this._getPageX(e);			
			this[btn].dBtn = pageX - coords.left;
			this.btnFlag = btn;
			console.log("DELTA BTN", this[btn].dBtn);
			console.log("DELTA BTN x", pageX);
			console.log("DELTA BTN l", coords.left);
			
			this._moveAt.call(this, e);
			
			document.onmousemove = function(e) {
				that._moveAt.call(that, e);
			}
			document.ontouchmove = function(e) {
				that._moveAt.call(that, e);
			}
			
		},
		_moveAt(e) {
			var btn = this.btnFlag;
			
			var pageX = this._getPageX(e);					
			this[btn].dClient = pageX - this.$el.getClientRects()[0].x;
			//this[btn].dClient -= this[btn].dBtn;			

			this._setMoveParams(btn, this[btn].dClient);
		},
		_setMoveParams(btn, interval) {
			var timeMs;

			this[btn].styleObj.left = interval - this[btn].dBtn + 'px';
			var left = parseInt(this[btn].styleObj.left, 10);

			if (btn === 'btnStart') {
				timeMs = this[btn].startMs + (interval) * 60 * 1000;
				this.params.dateStart = /*new Date(parseInt(timeMs.toString().substr(0,9) + "0000", 10))*/new Date(timeMs).setSeconds(0, 0);
			} else {
				timeMs = this[btn].startMs - (240 - interval) * 60 * 1000;
				this.params.dateEnd = /*new Date(parseInt(timeMs.toString().substr(0,9) + "0000", 10))*/new Date(timeMs).setSeconds(0, 0);
			}

			this[btn].date.setTime(timeMs);
			this[btn].oSliderCount = this[btn].date.toLocaleString().split(" ")[1].substr(0,5);

			var cBgLineWidth = this.btnEnd.dClient - this.btnStart.dClient;				
			this.bgLineStyle.width = cBgLineWidth + "px";
			this.bgLineStyle.left = this.btnStart.dClient + "px";
			this.params.interval = cBgLineWidth;

		},
		_getPageX(e) {
			if (e.changedTouches) {
				return e.changedTouches[0].pageX;
			} else {
				return e.pageX;	
			}		
		},
		sliderMUp(btn) {

			document.onmousemove = null;
			document.ontouchmove = null;
			
			this.btnFlag = btn;
		},
		_getCoords(el) {
			var box = el.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		},
		onLeftArrowClick(btn) {
			this[btn].dClient = this[btn].dClient - 1;
			this._setMoveParams(btn, this[btn].dClient);
		}
		,
		onRightArrowClick(btn) {
			//this[btn].dBtn = 0;
			this[btn].dClient = this[btn].dClient + 1;
			this._setMoveParams(btn, this[btn].dClient);
		}
	},
	template: `
	<div class="slider">
		<div class="slider__count">{{ btnStart.date.toLocaleString().split(" ")[1].substr(0,5) }}</div>
		<div class="slider__count-end">{{ btnEnd.date.toLocaleString().split(" ")[1].substr(0,5) }}</div>
		<div class="slider__bg-line--out"></div>
		<div class="slider__bg-line" v-bind:style="bgLineStyle"></div>		
		<button class="slider__btn" v-bind:style="btnStart.styleObj"
				v-on:mousedown="sliderMDown('btnStart', $event)"
				v-on:mouseup="sliderMUp('btnStart', $event)"
				v-on:dragstart.prevent
				v-on:touchstart="sliderMDown('btnStart', $event)"
				v-on:touchend="sliderMUp('btnStart', $event)"
				v-on:touchcancel="sliderMLeave('btnStart', $event)"></button>
		<button class="slider__btn-end" v-bind:style="btnEnd.styleObj"
				v-on:mousedown="sliderMDown('btnEnd', $event)"
				v-on:mouseup="sliderMUp('btnEnd', $event)"
				v-on:dragstart.prevent
				v-on:touchstart="sliderMDown('btnEnd', $event)"
				v-on:touchend="sliderMUp('btnEnd', $event)"
				v-on:touchcancel="sliderMLeave('btnEnd', $event)"></button>
		<div class="slider__user-name">{{ params.name }}</div>		
		<div class="slider__user-sum" :class="{'hide': params.sum === 0}">
			<span class="user-sum__text">{{ params.sum }}</span>
			<span class="user-sum__text-rub">&#8381</span>
		</div>
		<div class="slider__panel">
			<div class="slider__panel__start">
				<div class="left-arrow__section" v-on:click="onLeftArrowClick('btnStart')"
										v-on:tap="onLeftArrowClick('btnStart')">
										<span class="arrow">&#9001</span>
										</div>
				<div class="right-arrow__section" v-on:click="onRightArrowClick('btnStart')"
										v-on:tap="onRightArrowClick('btnStart')">
										<span class="arrow">&#9002</span>
										</div>
			</div>
			<div class="slider__panel__end">
				<div class="left-arrow__section" v-on:click="onLeftArrowClick('btnEnd')"
										v-on:tap="onLeftArrowClick('btnEnd')">
										<span class="arrow">&#9001</span>
										</div>
				<div class="right-arrow__section" v-on:click="onRightArrowClick('btnEnd')"
										v-on:tap="onRightArrowClick('btnEnd')">
										<span class="arrow">&#9002</span>
										</div>
			</div>
		</div>
	</div>`
});

let vm = new Vue({
	el: '#banya',
	data: {
		rows: [],
		peoples: peoples,
		titles: titles,
		sum: 0,
		countPeople: 0,
		oHour: {},
		hourPrice: 1250,
		peopleFlagShow: false,
		localhost: window.location.hostname === "localhost",
		newPeopleFlagShow: false,
		statuses: {
			0: 'Всех подвел',
			59: 'Ниочем вообще',
			60: 'Дрищавый хлюпик',
			120: 'Славный парниша',
			180: 'Настоящий мужик',
			240: 'Банщик',
			300: 'Банщик-йог'
		}
	},
	methods: {
		toggleNewUserForm() {
			this.newPeopleFlagShow = !this.newPeopleFlagShow;
			//console.log("newPeopleFlagShow", this.newPeopleFlagShow);
		},
		onMainCnt(e) {
			console.log("main click");
			var trg = e.target;
			var parentLiPeople = trg.closest("div[id='id-divPeopleLists']");
			if (!parentLiPeople && trg.id !== "id-btnPeopleLists" && this.peopleFlagShow) {
				this.peopleFlagShow = false;
			}
			if (trg.id === "id-btnPeopleLists") {
				this.peopleFlagShow = !this.peopleFlagShow;
			}
			
		},
		// Добавление нового участника
		insertPeople(newPeopleFIO) {
			console.log("Insert people", newPeopleFIO);
			if (newPeopleFIO) {
				let id = +String(Math.random()).substr(2);
				peoples[id] = new People({name: newPeopleFIO, id: id});
				this.newPeopleFlagShow = false;
			}
		},
		// Добавление пользователей из списка в таблицу расчетов
		addPeople(user) {
			if (!user.checked) {
				//this.rows.push(user.id);
				Vue.set(this.rows, this.rows.length - 1 > 0 ? this.rows.length - 1 > 0 : this.rows.length, user.id);
				user.idx = this.rows.length - 1;
				this.countPeople++;
			} else {
				this._setNewIdxs(user.idx);
				//this.rows.splice(user.idx, 1);
				Vue.set(this.rows, user.idx, false);
				user.idx = -1;
				user.dateStart = new Date().setHours(20,0,0,0);
				user.dateEnd = new Date().setHours(24,0,0,0);
				user.interval = (user.dateEnd - user.dateStart)/1000/60 - 60
				this.countPeople--;
			}

			user.checked = !user.checked;			
			
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
		getOrderOld() {
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
		getOrder() {
			var minDate, maxDate, aMinDates = [], aMaxDates = [], curPeoples = {};
			var hourPrice = this.hourPrice;
			for (var user in this.peoples) {
				/*Обнуляем итоговое значение суммы*/
				peoples[user].sum = 0;
				peoples[user].idx > -1 && (curPeoples[user] = peoples[user]);
				peoples[user].idx > -1 && aMinDates.push(peoples[user].dateStart);
				peoples[user].idx > -1 && aMaxDates.push(peoples[user].dateEnd);
			}
			minDate = Math.min(...aMinDates);
			maxDate = Math.max(...aMaxDates);

			var H2000 = new Date().setHours(20,0,0,0);
			aMinDates.push(H2000);
			/*var H2100 = new Date().setHours(21,0,0);
			aMinDates.push(parseInt(H2100.toString().substr(0,9) + "0000", 10));
			var H2200 = new Date().setHours(22,0,0);
			aMinDates.push(parseInt(H2200.toString().substr(0,9) + "0000", 10));			*/

			/*Адская хрень*/
			var aAllDates = [...new Set([...new Set(aMinDates.sort()), ...new Set(aMaxDates.sort())].sort())];

			var p = {};
			var prop = 1;
			var sum = {};
			var result = 0;

			aAllDates.forEach(function(dateStart, i, arr) {
				p[i] = [];

				//if (i === 0) continue;
				for (var id in curPeoples) {
					var user = curPeoples[id];
					if (i !== 0 && user.dateStart < dateStart && user.dateEnd >= dateStart) {
						p[i].push(user.id);
					}
				}

				if (i > 0) {
					var min;
					if (p[i].length === 0) {
						min = 0;
					} else {
						min = hourPrice/p[i].length/60;
					}

					sum[i] = {
						users: p[i], 
						min: min, 
						period: Math.ceil((dateStart-arr[i-1])/1000/60) < 0 ? 0 : Math.ceil((dateStart-arr[i-1])/1000/60)
					};

					for (var id in curPeoples) {
						var user = curPeoples[id];
						if (~p[i].indexOf(user.id)) {

							if (sum[i].period < 0) {
								user.sum = 0;	
							} else {
								//user.sum += Math.ceil(sum[i].period * sum[i].min);
								user.sum += sum[i].period * sum[i].min;
							}
							
						}
					}

					
					var cSum = sum[i].period * sum[i].min * sum[i].users.length;
					console.log("SUM", i, sum[i]);
					console.log("SUM for period", cSum);
					result += cSum;
				} 

				/*if (dateStart === H2100) {
						
				}*/
			});
			console.log("Results", result);
			var trueResult = 0;
			for (var id in curPeoples) {
				var user = curPeoples[id];
				trueResult += user.sum;
				
			}
			console.log("Results true", trueResult);
			this.sum = Math.round(result);
			//var periods = new Set(aMinDates.sort());
			//console.log("Period start", periods);
			
			/*var user;
			for (var i = minDate; i <= maxDate; i = i + 60000) {

				for (var id in this.peoples) {
					user = peoples[user];
					if (i >= user.dateStart && i <= user.dateEnd && user.idx > -1) {
						//console.log(user.name);


					}
				}
			}*/
		},
		getClearOld() {
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
		getClear() {
			var that = this;
			var user;
			this.oHour = {};
			this.sum = 0;
			/*var oHour = this.oHour;*/

			for (var id in this.peoples) {
				user = this.peoples[id];
				user.sum = 0;				
			}
		},
		setAll(i) {
			var row = this.rows[i];
			row.forEach((el, idx, arr) => {
				if (idx > 0 && idx < (arr.length - 1)) {					
					Vue.set(row, idx, !el);													
				}
			});
			this.getHours();
		},
		setAllV(i) {
			var rows = this.rows;
			rows.forEach((row, idx, arr) => {
				if (i > 0 && i < (row.length - 1)) {
					Vue.set(row, i, !row[i]);													
				}
			});
			this.getHours();
		},
		getStatus(interval) {
			if (interval <= 0) {
				return this.statuses[0]
			} else if (interval > 0 && interval < 60) {
				return this.statuses[59];
			} else if (interval >= 60 && interval < 120) {
				return this.statuses[60];
			} else if (interval >= 120 && interval < 180) {
				return this.statuses[120];
			} else if (interval >= 180 && interval < 240) {
				return this.statuses[180];
			} else if (interval >= 240 && interval < 300) {
				return this.statuses[240];
			} else if (interval >= 300) {
				return this.statuses[300];
			}
		}
	},	
	filters: {
		getCeil: function(num) {
			return Math.ceil(num);
		}		
	}
});


var Slider = (function(g, doc) {

})(window, document);
