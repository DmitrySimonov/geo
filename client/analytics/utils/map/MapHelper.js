import { Base64 } from 'js-base64';
import BigIcon from './../../../../public/assets/map/icons/bigIcon.svg';
import SmallIcon from './../../../../public/assets/map/icons/smallIcon.svg';

export default class MapHelper {
    static preparePosition(position){
        return new google.maps.LatLng(position);
    }
    static getIconWithColor(smallIcon, hovered, selected, color){
        let icon = smallIcon ? SmallIcon : BigIcon;
        let base64IconIndex = icon.indexOf(';base64,') + 8;
        let base64 = icon.slice(base64IconIndex);
        let iconPrefix = icon.slice(0, base64IconIndex);
        let iconDecoded = Base64.decode(base64);
        let preparedIcon = iconDecoded.replace(/\{{ color }}/g, color)
                                        .replace(/\{{ hover }}/g, (hovered && !selected) ? 'visible' : 'hidden')
                                        .replace(/\{{ selected }}/g, selected ? 'visible' : 'hidden');
        return {
                anchor: new google.maps.Point(!smallIcon ? 22 : 0, !smallIcon ? 22 : 0),
                url : iconPrefix + Base64.encode(preparedIcon)
            };
    }
    static getCoordinatesCenter(coordinates){
        let bounds = new google.maps.LatLngBounds();
        let i;

        for (i = 0; i < coordinates.length; i++) {
            let _coord = coordinates[i];
            let coord = new google.maps.LatLng(_coord.lat, _coord.lng);
            bounds.extend(coord);
        }
        let _center = bounds.getCenter();
        return {lat:_center.lat(), lng:_center.lng()};
    }
    static getAssetMatchInRegion(regions,assets){
        let poligon = new google.maps.Polygon({paths: regions.coordinates});
        var list = [];
        Object.values(assets).forEach( (asset, i) => {
            var curPosition = new google.maps.LatLng({lat: asset.latitude, lng: asset.longitude});
            if(google.maps.geometry.poly.containsLocation(curPosition, poligon)){
                list[i] = asset;
            }
        });
        return list;
    }
}