import React from 'react';
import TresholdItem from './TresholdItem';

const ConditionItems = (props) =>{
    return(
        <div>
            {
                props.selectedTreshold.conditions ? props.selectedTreshold.conditions.map((conditon,i) => {
                    return <TresholdItem
                                    item={conditon}
                                    onInit={props.onInit}
                                    itemsNames={props.itemsNames}
                                    itemsComparison={props.itemsComparison}
                                    length={conditon.length}
                                    handleSelect={props.handleSelect}
                                    deleteDropDownList={props.deleteDropDownList}
                                    deleteDropDownItem={props.deleteDropDownItem}
                                    addTresholdItem={props.addTresholdItem}
                                    selectTresholdID={props.selectTresholdID}
                                    selectAlertID={i}
                                    addDropDownList={props.addDropDownList}
                                    key={"treshold-item=" + i}
                                    treshloadItemId={i}
                                    id={i}
                                    onKeyUp={props.onKeyUp}
                                    value={props.value}
                            />;
                }) : null
            }
        </div>
    );
};

export default ConditionItems;