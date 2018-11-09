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
				date: date,
				startMs: date.setHours(20, 0, 0),
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
				date: dateEnd,
				startMs: dateEnd.setHours(24, 0, 0),
				oBtn: null,
				dBtn: 0,
				oSliderCount: null,
				styleObj: {
					left: '225px'
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
	},
	mounted: function() {

		this.$data.oBgLineOut = this.$el.querySelector('.slider__br-line--out');
		this.$data.oBgLine = this.$el.querySelector('.slider__br-line');		
		this.$data.btnStart.oBtn = this.$el.querySelector('.slider__btn');
		this.$data.btnStart.oSliderCount = this.$el.querySelector('.slider__count');
		this.$data.btnStart.dBtn = parseInt(getComputedStyle(this.$data.btnStart.oBtn).width, 10)/2;
		this.$data.btnStart.styleObj.left = "-" + this.$data.btnStart.dBtn + "px";
		this.$data.btnStart.xClient = this.$data.btnStart.oBtn.getClientRects()[0].x;

		this.$data.btnEnd.oBtn = this.$el.querySelector('.slider__btn-end');
		this.$data.btnEnd.oSliderCount = this.$el.querySelector('.slider__count-end');
		this.$data.btnEnd.dBtn = parseInt(getComputedStyle(this.$data.btnEnd.oBtn).width, 10)/2;
		//this.$data.btnEnd.styleObj.left = "225px";
		this.$data.btnEnd.xClient = this.$data.btnStart.oBtn.getClientRects()[0].x;
		this.$data.btnEnd.cClient = this.$data.btnEnd.oBtn.getClientRects()[0].x;
		this.$data.btnEnd.dClient = this.$data.btnEnd.cClient - this.$data.btnEnd.xClient;

		console.log("Mounted");
	},
	methods: {
		sliderMDown(btn) {
			this.moveEventFlag = true;
			this.btnFlag = btn;
			//this[this.btnFlag].xClient === 0 && (this[this.btnFlag].xClient = this["btnStart"].oBtn.getClientRects()[0].x);
		},
		sliderMUp(btn) {
			this.moveEventFlag = false;
			this.btnFlag = btn;
		},
		sliderMLeave(btn) {
			this.moveEventFlag = false;
			this.btnFlag = btn;
		},
		sliderMMove: function(e) {
			if (!this.moveEventFlag) return;					
				
				var microDelta = -this[this.btnFlag].dBtn;
				var max = parseInt(getComputedStyle(this.$el).width, 10);
				var cBgLineWidth, cBgLineLeft;

				if (e.changedTouches) {
					this[this.btnFlag].cClient = e.changedTouches[0].clientX;
				} else {
					this[this.btnFlag].cClient = e.clientX;	
				}				

			//if (dClient < (cClient - xClient)) microDelta = -microDelta;
				this[this.btnFlag].dClient = this[this.btnFlag].cClient - this[this.btnFlag].xClient;
				/*console.log("COORDS xClient", this[this.btnFlag].xClient);
				console.log("COORDS dClient", this[this.btnFlag].dClient);
				console.log("COORDS cClient", this[this.btnFlag].cClient);*/

				if (this[this.btnFlag].dClient < 0) {
					this[this.btnFlag].dClient = 0;
					this[this.btnFlag].styleObj.left = "-" + this[this.btnFlag].dBtn + "px";
				} else if (this[this.btnFlag].dClient >= 240) {
					this[this.btnFlag].dClient = 240;
					this[this.btnFlag].styleObj.left = "225px";
				} else {
					this[this.btnFlag].styleObj.left = this[this.btnFlag].dClient + microDelta + "px";
				}


				if (this.btnFlag === 'btnStart') {
					timeMs = this[this.btnFlag].startMs + this[this.btnFlag].dClient * 60 * 1000;
				} else {
					timeMs = this[this.btnFlag].startMs - (240 - this[this.btnFlag].dClient) * 60 * 1000;
				}

				this[this.btnFlag].date.setTime(timeMs);
				this[this.btnFlag].oSliderCount = this[this.btnFlag].date.toLocaleString().split(" ")[1].substr(0,5);

				cBgLineWidth = this.btnEnd.dClient - this.btnStart.dClient;				
				this.bgLineStyle.width = cBgLineWidth + "px";
				this.bgLineStyle.left = this.btnStart.dClient + "px";	

				console.log("BG LINE Width", cBgLineWidth);
				console.log("BG LINE Left", cBgLineLeft);				
		}
	},
	template: `
		<div class="slider" v-on:mousemove="sliderMMove"
							v-on:touchmove="sliderMMove">
		<div class="slider__count">{{ btnStart.date.toLocaleString().split(" ")[1].substr(0,5) }}</div>
		<div class="slider__count-end">{{ btnEnd.date.toLocaleString().split(" ")[1].substr(0,5) }}</div>
		<div class="slider__bg-line--out"></div>
		<div class="slider__bg-line" v-bind:style="bgLineStyle"></div>		
		<button class="slider__btn" v-bind:style="btnStart.styleObj"
				v-on:mousedown="sliderMDown('btnStart')"
				v-on:mouseup="sliderMUp('btnStart')"
				v-on:mouseleave="sliderMLeave('btnStart')"
				v-on:touchstart="sliderMDown('btnStart')"
				v-on:touchend="sliderMUp('btnStart')"
				v-on:touchcancel="sliderMLeave('btnStart')"></button>
		<button class="slider__btn-end" v-bind:style="btnEnd.styleObj"
				v-on:mousedown="sliderMDown('btnEnd')"
				v-on:mouseup="sliderMUp('btnEnd')"
				v-on:mouseleave="sliderMLeave('btnEnd')"
				v-on:touchstart="sliderMDown('btnEnd')"
				v-on:touchend="sliderMUp('btnEnd')"
				v-on:touchcancel="sliderMLeave('btnEnd')"></button>
		<div class="slider__user-name">{{ params.name }}</div>
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
		costOneH: 1250,
		peopleFlagShow: false,
		localhost: window.location.hostname === "localhost",
		newPeopleFlagShow: false
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