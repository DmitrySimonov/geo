var fs = require('fs'),
    xml2js = require('xml2js');

const buildPath = '/public/assets/map/';

var parser = new xml2js.Parser();
function parseRouteFile(path, routeList, cb){
    fs.readFile(__dirname + buildPath + path, function(err, data) {
        
        parser.parseString(data, function (err, result) {
            var _route = result.kml.Document[0];
            for (var i = 0; i < _route.Placemark.length; i++){

                var routePlacemark = _route.Placemark[i];
                var route = getRouteByName(routeList, routePlacemark.name[0]);
                
                var placemark = [];

                var routeString = routePlacemark.LineString;
                for (var j = 0; j< routeString.length; j++) {
                    var coordinates = routeString[j].coordinates[0];
                    coordinates = coordinates.split(',0.0 ').map(item => {
                        let routeNode  = item.split(',');
                        placemark.push({lng:parseFloat(routeNode[0]),lat:parseFloat(routeNode[1])});
                    });
                }

                route.placemarks.push(placemark);
            }
            
            cb(routeList);
        });
    });
}

function getRouteByName(routeList, name)
{
    var result = null;
    var route = null;

    for (var i = 0; i < routeList.length; i++)
    {
        route = routeList[i];
        if (route.name === name) {
            result = route;
            break;
        }
    }

    if (result === null) {
        result = {
            name:name,
            placemarks:[]
        };
        routeList.push(result);
    }

    return result;
}

function saveFile(path, data){
    fs.writeFile(__dirname + buildPath + path.replace('.kml','.json'), JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

function parseSwitchFile(path){
    
    fs.readFile(__dirname + buildPath + path, function(err, data) {
        parser.parseString(data, function (err, result) {
            var _route = result.kml.Document[0];
            var route = [];
            var coordinatesMap = null;
            for (var i = 0; i < _route.Placemark.length; i++){
                var routePlacemark = _route.Placemark[i];
                if(!routePlacemark.name[0] && routePlacemark.name[0].length <= 0)
                {
                    continue;
                }
                var placemark = {
                    name:routePlacemark.name[0],
                    coordinates:[]
                };

                var coordinates = routePlacemark.Point[0].coordinates[0].split(',');

                var lng = parseFloat(coordinates[0]);
                var lat = parseFloat(coordinates[1]);

                if (coordinatesMap !== null && coordinatesMap[lng] && coordinatesMap[lng].indexOf(lat) !== -1){
                        
                } else {
                   
                    if(coordinatesMap === null)
                    {
                        coordinatesMap = {};
                    }

                    if (!coordinatesMap[lng]) {
                        coordinatesMap[lng] = [];
                    }

                    coordinatesMap[lng].push(lat);
                    placemark.coordinates.push({lng:lng,lat:lat});
                    route.push(placemark);
                }

                console.log(coordinatesMap);
            }
            saveFile(path, route);
        });
    });
};
function parseSwitchFileWithStatus(path){
    
    fs.readFile(__dirname + buildPath + path, function(err, data) {
        parser.parseString(data, function (err, result) {
            var _route = result.kml.Document[0];
            var route = {};
            var coordinatesMap = null;
            for (var i = 0; i < _route.Placemark.length; i++){
                var routePlacemark = _route.Placemark[i];
                var placemark = {
                    healthStatus: 0,
                    currentWsh: null,
                    daysToKpiThresholds:{},
                    trainsNo: null,
                    lastTrainAt: null,
                    load: null
                };

                var coordinates = routePlacemark.Point[0].coordinates[0].split(',');

                var lng = parseFloat(coordinates[0]);
                var lat = parseFloat(coordinates[1]);

                if (coordinatesMap !== null && coordinatesMap[lng] && coordinatesMap[lng].indexOf(lat) !== -1){
                        
                } else {
                   
                    if(coordinatesMap === null)
                    {
                        coordinatesMap = {};
                    }

                    if (!coordinatesMap[lng]) {
                        coordinatesMap[lng] = [];
                    }

                    coordinatesMap[lng].push(lat);
                    // placemark.coordinates.push({lng:lng,lat:lat});
                    route[routePlacemark.name[0]] = placemark;
                }

                console.log(coordinatesMap);
            }
            saveFile(path + 'status', route);
        });
    });
}

function parseRegionFile(path){
  fs.readFile(__dirname + buildPath + path, function(err, data) {
        parser.parseString(data, function (err, result) {
            var _route = result.kml.Document[0];
            var region = [];
            for (var i = 0; i < _route.Placemark.length; i++){
                var routePlacemark = _route.Placemark[i];
                var placemark = {
                    name:routePlacemark.name[0],
                    coordinates:[]
                };
                var coordinates = routePlacemark.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0];
                coordinates = coordinates.split(',0.0 ').map(item => {
                        let routeNode  = item.split(',');
                        placemark.coordinates.push({lng:parseFloat(routeNode[0]),lat:parseFloat(routeNode[1])});
                    });

                region.push(placemark);
            }
            
            saveFile(path, region);
            
        });
    });  
}
//parseSwitchFileWithStatus('switches.kml');
/*
parseSwitchFile('switches.kml');

parseRegionFile('regions.kml');

*/
parseRouteFile('route1.kml',[],(route)=>{
    parseRouteFile('route2.kml',route,(route)=>{   
        parseRouteFile('route3.kml',route,(route)=>{
            parseRouteFile('route4.kml',route,(route)=>{
                parseRouteFile('route5.kml',route, (route)=>{
                    parseRouteFile('route6.kml',route,(routes)=>{
                        //console.log(routes.length);
                        saveFile('routes.kml', routes);
                    });
                });
            });
        });
    });
});

/*
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
*/