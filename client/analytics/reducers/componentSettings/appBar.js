let initialState = {
    enabled: true,
    items: [
    {
        buttonTitle: "Overview",
        items:[
            {
                title:"Overview",
                link:'overview',
            },
            {
                title:"Tile overview",
                link:'tile-overview',
            },
            {
                title:"Group Report",
                link:'group-report',
            },
            {
                title:"Asset Report",
                link:'asset-report',
            }
        ]
    },
    {
        buttonTitle: "Analytics",
        items: [
            {
                title:"Asset Analytics",
                link:'asset-analytics',
            },
            {
                title:"Group Analytics",
                link:'group-analytics',
            }
        ]
    },
    {
        buttonTitle: "Data",
        items: [
            {
                title:"Sensor Log",
                link:'/sensor-log',
            },
            {
                title:"Event Log",
                link:'/event-log',
            }
        ]
    },
    {
        buttonTitle: "Alerts",
        items:[
            {
                title:"ALERTS",
                link:'alerts',
            }
        ]
    }    
]
};

function appBar(state = initialState, action) {
    return state;
}

export default appBar;