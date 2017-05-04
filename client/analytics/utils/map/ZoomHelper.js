export const ELEMENT_TYPE_ASSET = 1;
export const ELEMENT_TYPE_REGION = 2;

const ZOOM_FACTOR_ASSET = 12;
const ZOOM_FACTOR_REGION = 7;
const ZOOM_FACTOR_DEFAULT = 6;

class ZoomHelper {
  static getZoom(elementType, assetSelected, multiple) {
    let zoom = ZOOM_FACTOR_DEFAULT;
    switch (elementType) {
      case ELEMENT_TYPE_ASSET:
        zoom = (assetSelected) ? ZOOM_FACTOR_ASSET : zoom;
      break;
      case ELEMENT_TYPE_REGION:
        zoom = (assetSelected && !multiple) ? ZOOM_FACTOR_REGION : zoom;
      break;
    }
    return zoom;
  }
}

export default ZoomHelper;
