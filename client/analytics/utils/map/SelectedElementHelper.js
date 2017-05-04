class SelectedElementHelper {
  static isSelected(stateActive, element) {
    let selected = false;

    if (stateActive.length === 0) {
      selected = true;
    } else if (stateActive.indexOf(element) === -1){
      selected = true;
    }

    return selected;
  }
}
export default SelectedElementHelper;
