import { SwitchStatusType } from '././../../../constants';
import Marker from './../googleMap/Marker';

const ICON_NORMAL = 0;
const ICON_SMALL = 1;

var smallIconText = null;
var normalIconText = null;

const getSvg = (responseText, color, opacity = '1', strokeWidth = '0') => {
    var rText = responseText.replace(/\{{ bg-color }}/g, color).
                replace(/\{{ opacity }}/g, opacity).
                replace(/\{{ stroke-width }}/g, strokeWidth );
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(rText);
};

const switchColors = {
    good: {
        selected: '#00b5a9',
        hovered: '#00bfb3'
    },
    warning: {
        selected: '#ffa661',
        hovered: '#ffa661'
    },
    error: {
        selected: '#ee6668',
        hovered: '#ff6e70'
    },
    inactive: {
        selected: '#adb3be',
        hovered: '#adb3be'
    }
};

const getColor = (status, selected = false) => {
    return switchColors[status][(selected) ? 'selected' : 'hovered'];
};

class Switch extends Marker {
    constructor(map, data, switchClick, switchOver, switchOut, icons){
        super(map, data);
        this.switchClick = switchClick;
        this.switchOver = switchOver;
        this.switchOut = switchOut;
        
        this.status = 'inactive';

        this.iconType = ICON_NORMAL;

        var loadPaths = [];

        smallIconText = icons.switch.dot || null;
        normalIconText = icons.switch.selected || null;
    }

    checkState(){

        if (smallIconText && normalIconText) {
            this.setIconSmall();
            this.setIconNormal();
        }

        var icon = this.iconType === ICON_SMALL ? this.iconSmall : this.iconNormal;
        if(!icon) {
            return;
        }

        let alpha = 1;
        if(this.selected){
            this.setIcon(icon.selected);
        } else if(this.hovered) {
            this.setIcon(icon.hovered);
        } else if (this.activated) {
            this.setIcon(icon.normal);
        } else if (icon.normal){
            this.setIcon(icon.normal);
            alpha = 0.4;
        } else {
            alpha = 0.4;
        }

        this.setOpacity(alpha);
    }
    onIconSmallLoaded(event){
        smallIconText = event.srcElement.responseText;
    }
    onIconNormalLoaded(event){
        normalIconText = event.srcElement.responseText;
    }
    setData(data){
        super.setData(data);

        if (data.thresholds && data.healthStatus) {
            this.setStatus(data.thresholds, data.healthStatus);
        }

        this.checkState();
    }
    setStatus(thresholds, healthStatus){
        thresholds.forEach(threshold => {
            if (healthStatus >= threshold.minValue 
                && healthStatus <= threshold.maxValue) {
                this.status = threshold.severity;
            }
        });
    }
    setIconNormal(){
        this.iconNormal = this.generateIcon(normalIconText, ICON_NORMAL, this.status);
    }
    setIconSmall(){
        this.iconSmall = this.generateIcon(smallIconText, ICON_SMALL, this.status);
    }
    setType(value){
        if(this.iconType !== value) {
            this.iconType = value;
            this.checkState();
        }
    }
    onClick(swtch, switchData, map){
        this.select(!this.selected);
        this.checkState();
        this.switchClick(this, switchData, map);
    }
    generateIcon(responseText, iconType, status) {
        var mapIconTemplate = {
            anchor: new google.maps.Point(iconType === ICON_NORMAL ? 37 : 8, 
                                            iconType === ICON_NORMAL ? 37 : 8)
        };
        var icon ={
            responseText:responseText,
            selected:Object.assign({},mapIconTemplate,{
                    url:getSvg(responseText, getColor(status,true), '1', iconType === 0 ? '40' : '20')
            }),
            hovered:Object.assign({},mapIconTemplate,{
                    url: getSvg(responseText, getColor(status,false), '1'),
            }),
            normal:Object.assign({},mapIconTemplate,{
                    url: getSvg(responseText, getColor(status), '1'),
            })
        };
        return icon;
    }
    onMouseOut(swtch, swtchData, map){
        this.hover(false);
        this.checkState();
        if (this.switchOut) {
            this.switchOut(this, swtchData, map);
        }
    }
    onMouseOver(swtch, swtchData, map){
        this.hover(true);
        this.checkState();
        if (this.switchOver) {
            this.switchOver(this, swtchData, map);
        }
    }
    loadIconByUrl(url, callback){
        return new Promise(resolve => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.overrideMimeType("image/svg+xml");
            xhr.send("");
            xhr.onload = (event) => {
                callback(event);
                resolve();
            };
        });
    }
    setIcon(icon){
        if(this.icon !== icon){
            super.setIcon(icon);
        }
    }
}

export default Switch;