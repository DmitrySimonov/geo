import Polygon from './../googleMap/Polygon';
import raf from 'raf';

class Region extends Polygon {
    constructor(map, data, regionClick, style){
        super(map, data, style);
        this.regionClick = regionClick;
    }
    onMouseOut(region, regionData, map){
        if (!this.activated && this.hovered) {      
            this.style = Object.assign({},this.style,{
                fillOpacity: 0.1
            });
            this.setOptions(this.style);      
            this.hover(false);
            /*this.fadeRegion(0.1, -0.04, this.style, (opacity,to) => opacity > to)
            .then((region)=>{

            });*/
        }
    }
    onMouseOver(){
        if (!this.activated && !this.hovered) {
            this.style = Object.assign({},this.style,{
                fillOpacity: 0.2
            });
            this.setOptions(this.style);
            this.hover(true);
            /*this.fadeRegion(0.2, 0.04, this.style, (opacity,to) => opacity < to)
            .then((region)=>{

            });*/
        }
    }
    onClick(){
        this.active(!this.activated);
        this.regionClick(this);
    }
    checkState(){
        if (this.activated) {
            this.style = Object.assign({},this.style,{
                fillOpacity: 0.3
            });
            this.setOptions(this.style);
            /*this.fadeRegion(0.3, 0.04, this.style, (opacity,to) => opacity < to)
            .then((region) =>{
                
            });*/
        } else if (this.hovered) {
            this.style = Object.assign({},this.style,{
                fillOpacity: 0.1
            });
            this.setOptions(this.style);
           /* this.fadeRegion(0.1, -0.04, this.style, (opacity,to) => opacity > to)
            .then((region) =>{
                
            });*/
        } else {
            this.hover(false);
            this.style = Object.assign({},this.style,{
                fillOpacity: 0.1
            });
            this.setOptions(this.style);
            /* this.fadeRegion(0.1, -0.04, this.style, (opacity,to) => opacity > to)
            .then((region)=>{

            });*/
        }
    }
    fadeRegion(to, step, style, condition) {
        return new Promise((resolve, reject) => {
            style = Object.assign({},style,{
                fillOpacity: to
            });

            this.setOptions(style);
            resolve(this);
            /*
            var opacity = this.style.fillOpacity;
            let tick = () => {
                
                if (condition(opacity, to)) {
                    raf(tick);
                } else {
                    if(resolve){
                        resolve(this);
                    }
                    opacity = to;
                }

                style = Object.assign({},style,{
                        fillOpacity: opacity
                    });

                this.setOptions(style);
                opacity += step;
            };
            /
            raf(tick);
            */
        });
    };
}
export default Region;