import Polyline from './../googleMap/Polyline';
import raf from 'raf';

class Route extends Polyline {
    constructor(map, data, regionClick){
        super(map, data);
        this.active(false);
    }
    onMouseOut(region, regionData, map){

    }
    onMouseOver(region, regionData, map){

    }
    active(value){
        super.active(value);
        this.setOpacity(value ? 1 : 0.2);
    }

    onClick(region, regionData, map){
        
    }
}
export default Route;