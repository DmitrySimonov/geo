import React from 'react';
import ToggleButton from './ToggleButton';

class ToggleButtonList extends React.Component {
    getChecked(data) {
        if (!this.props.selectedList) return false;
        return this.props.selectedList.indexOf(data.id) > -1;
    }
    render()
    {
        return(
            <div>
                {
                    this.props.list ? this.props.list.map((data, i)=> {
                              return <ToggleButton {...this.props} 
                                        checked={this.getChecked(data)} 
                                        key={i}
                                        label={data.name} 
                                        onClick={() => this.props.onApply(data)} />;
                            }) : null
                }
            </div>
        );
    }
}

export default ToggleButtonList;