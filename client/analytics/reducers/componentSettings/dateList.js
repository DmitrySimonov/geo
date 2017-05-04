import moment from 'moment';
let today = moment();

const arr = [
    {
        id: 1,
        name:'Today',
        value:{
            startDate:today,
            endDate: null
        }
    },
    {
        id: 2,
        name:'Last 3 days',
        value:{
            startDate: today,
            endDate: moment().add(-3,'days')
        }
    },
    {
        id: 3,
        name:'Last 7 days',
        value:{
            startDate:today,
            endDate: moment().add(-7,'days')
        }
    },
    /*
    {
        id: 4,
        name:'This Month',
        value:{
            startDate:today,
            endDate: moment().add(-1,'M')
        }
    },*/
    {
        id: 5,
        name:'Last 3 Month',
        value:{
            startDate:today,
            endDate: moment().add(-3,'M')
        }
    }
];

let initialState = {
    list: arr
};

export default function dateList(state = initialState, action) {
	switch(action.type){
        default:
            return state;
  	}
};