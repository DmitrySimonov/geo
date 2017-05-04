function GoogleMap(SuperClass) {
    return class extends SuperClass
    {
        constructor(domEl, args){
            var { markersFactory, areasFactory, pathsFactory, zoom, styles } = args;
            var opts = {
                zoom:zoom,
                disableDefaultUI: true,
                disableDoubleClickZoom: true, 
                center: {lat:50.9860988, lng:9.5581054},
                styles
            };
            super(domEl, opts);
            this.areasFactory = areasFactory;
            this.markersFactory = markersFactory;
            this.pathsFactory = pathsFactory;
            this.subscribe(args.listeners);
        }
        init(markers, areas, paths){
            if (markers) {
                this.createMarkers(markers);
            }
            if (areas) {
                this.createAreas(areas);
            }
            if (paths) {
                this.createPaths(paths);
            }
            //this.addKmlLayer();
        }
        createMarkers(markers){

            if (this.markers) {
                Object.keys(this.markers).forEach( key => {
                    this.markers[key].component.setMap(null);
                    delete this.markers[key];
                });
            }

            let aMarkers = [];
            if ("object" == typeof markers) {
                Object.keys(markers).forEach(function(key) {
                    aMarkers.push(markers[key]);
                });
            }
            else {
                aMarkers = markers;
            }


            var markerMap = null;
            if (aMarkers) {
                markerMap = {};

                aMarkers.forEach(data => {
                    if (data == null || !data.name || markerMap[data.name]){
                        var {name} = data;
                        return null;
                    }
                    markerMap[data.name] = this.markersFactory(this, data);
                });
            }
            
            this.markers = markerMap;
        }
        updateMarkersData(markerData){
            var markerMap = null;
            if (markerData) {

                let aMarkers = [];
                if ("object" == typeof markerData) {
                    Object.keys(markerData).forEach(function(key) {
                        aMarkers.push(markerData[key]);
                    });
                }
                else {
                    aMarkers = markerData;
                }

                aMarkers.forEach(data => {
                    if (data && this.markers[data.name]) {
                        this.markers[data.name].setData(data);
                    }
                });
            }
        }
        createAreas(areas){

            if (this.areas) {
                Object.keys(this.areas).forEach( key =>{
                    this.areas[key].setMap(null);
                    delete this.areas[key];
                });
            }

            var areasMap = null;
            if (areas) {
                areasMap = {};

                areas.forEach(data => {
                    if (data == null){
                        return null;
                    }
                    var area = this.areasFactory(this, data);
                    areasMap[data.name] = area;
                });
            }
            this.areas = areasMap;
        }
        createPaths(paths){

            if (this.paths) {
                Object.keys(this.paths).forEach( key =>{
                    this.paths[key].forEach( path => path.forEach( el => el.setMap(null)));
                    delete this.paths[key];
                });
            }

            var pathsMap = null;
            if (paths) {
                pathsMap = {};
                paths.forEach(data => {
                    if (data == null){
                        return null;
                    }
                    var path = [];
                    for (var i = 0; i < data.placemarks.length; i++){
                        path.push(this.pathsFactory(this, data.placemarks[i]));
                    }

                    if (pathsMap[data.name]){
                        pathsMap[data.name].push(path);
                    } else {
                        pathsMap[data.name] = [path];
                    }
                });
            }
            this.paths = pathsMap;
        }
        subscribe(listeners){
            if (listeners.onZoom) {
                this.onZoom = listeners.onZoom;
                this.addListener('zoom_changed', function(){
                        this.onZoom(this, this.getZoom());
                    }.bind(this));
            }
        }
        addKmlLayer() {
            if (this.kmlSourceUrl) {
                this.kmlLayer = new google.maps.KmlLayer({
                    url: this.kmlSourceUrl,
                    suppressInfoWindows: true,
                    map: this
                });
            }
        }
    };
}

export default GoogleMap;