import React, { Component } from "react";
import GoogleMap from './googleMap/GoogleMap';
import uuid from 'uuid';
import { common } from './../../actions';

//zoom:int
//center:Object = {lat: 41.876, lng: -87.624}

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.id = uuid();
    }
    componentDidMount() {

        let props = {
            zoom:this.props.zoom,
            listeners:{
                    onZoom:this.onZoom.bind(this)
                },
            pathsFactory:this.createRouteMap.bind(this),
            areasFactory:this.createRegion.bind(this),
            styles:this.props.mapStyles, 
            markersFactory:this.props.createSwitch
        };

        this.map = new (GoogleMap(google.maps.Map))(document.getElementById(this.id + '-map-wrapper'), props);

        this.props.mapLoaded(this.map);
        let {switches, regions, routes}  = this.props;
        this.map.init(switches, regions, routes);
    }
    createRouteMap(map, data) {
        return this.props.createRoute(map, data);
    }
    createRegion(map, data) {
        return this.props.createRegion(map, data, this.regionClick.bind(this));
    }
    onZoom(map, zoom) {
        if(this.map && this.map.markers) {
            for (let marker in this.map.markers) {
                this.map.markers[marker].setType(zoom < 10 ? 1 : 0);
            };
        }
    }
    regionClick(region) {
        this.props.regionClick(region.activated ? [region.data] : null);
    }
    componentWillReceiveProps(nextProps){

        let {switches, regions, routes} = nextProps;
        if (switches){
            this.map.createMarkers(switches);
        }
        if (regions){
            this.map.createAreas(regions);
        }
        if (routes){
            this.map.createPaths(routes);
        }

        this.unselectMapElements();
    }
    componentDidUpdate(){
        this.selectMapElements();
    }
    unselectMapElements(){

        this.unselectRegions(this.map.areas, this.props.activeRegions);

        if (this.props.activeSwitches) {
            this.props.activeSwitches.forEach( swtch => {
                this.map.markers[swtch.name].active(false);
                this.map.markers[swtch.name].checkState();
            });
        }
        if (this.props.selectedSwitches) {
            this.props.selectedSwitches.forEach( swtch => {
                this.map.markers[swtch.name].select(false);
                this.map.markers[swtch.name].checkState();
            });
        }

        if (this.props.selectedRoutes) {
            this.unselectRoutes(this.map.paths, this.props.selectedRoutes);
        }

        if (this.props.activeRoutes) {
            this.unselectRoutes(this.map.paths, this.props.activeRoutes);
        }
    }
    selectMapElements(){
        if(this.map) {
            let {switches, regions, selectedRoutes, activeSwitches, selectedSwitches, activeRegions, activeRoutes}  = this.props;
            
            this.map.updateMarkersData(switches);

            if (selectedRoutes) {
                this.selectRoutes(activeRegions || regions, selectedRoutes);
            }
            else if (activeRoutes) {
                this.selectRoutes(activeRegions || regions, activeRoutes);
            }

            if (activeRegions && activeRegions.length > 0) {
                activeRegions.forEach(data => {
                    let region = this.map.areas[data.name];
                    region.active(true);
                    region.checkState();
                });
            }

            if (selectedSwitches && selectedSwitches.length > 0) {
                let firstSelectedSwitch = selectedSwitches[0];
                this.map.markers[firstSelectedSwitch.name].centerMap();
                this.map.markers[firstSelectedSwitch.name].select(true);
                this.map.markers[firstSelectedSwitch.name].checkState();
                this.map.setZoom(12);
            } else {
                if(activeSwitches && activeSwitches.length > 0) {
                    activeSwitches.forEach(data => {
                        this.map.markers[data.name].active(true);
                    });
                }
                
                if (this.map.areas) {
                    let areaValues = Object.values(this.map.areas);
                    if (areaValues.length > 0) {
                        let bounds = new google.maps.LatLngBounds();
                        
                        if (activeRegions && activeRegions.length > 0){
                            activeRegions.forEach(data => bounds.union(this.map.areas[data.name].bounds));
                        } else {
                            areaValues.forEach(area => bounds.union(area.bounds));
                        }
                        
                        this.map.fitBounds(bounds);
                    }
                }
            }
        }
    }
    selectRoutes(regions, routes) {
        regions.forEach(data => {
            let region = this.map.areas[data.name].component;
            routes.forEach(routeData => {
                let pathName = routeData.name;
                let path = this.map.paths[pathName];
                path.forEach( placemarks => {
                    for (let j = 0; j < placemarks.length; j++) {
                        let route = placemarks[j];
                        let inRegion = this.regionContainsPath(region, route);
                        route.active(inRegion);
                    }
                });
            });
        });
    }
    regionContainsPath(region, route){
        let routePoints = route.component.getPath().getArray();

        for (let i = 0; i < routePoints.length; i++){
            let point = routePoints[i];
            if(!google.maps.geometry.poly.containsLocation(point, region)){
                return false;
            }
        }

        return true;
    }
    unselectRegions(areas, activeRegions){
        if (activeRegions && activeRegions.length > 0){
            activeRegions.forEach(data => {
                let region = areas[data.name];
                region.active(false);
                region.checkState();
            });
        }
    }
    unselectRoutes(routes, selectedRoutes) {
        selectedRoutes.forEach(data => {
            let path  = routes[data.name];
            path.forEach(placemarks => {
                for (let j = 0; j < placemarks.length; j++) {
                    let route = placemarks[j];
                    route.active(false);
                }
            });
        });
    }
    render() {
        return (
            <div className="map-wrapper" id={this.id + "-map-wrapper"}></div>
        );
    }
}

export default MapComponent;