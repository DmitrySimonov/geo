import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class Scrollbar extends React.Component {
    getClassName(){
        return "search-result " + 
        (this.props.className ? this.props.className : "");
    }
    render() {
        return (
            <Scrollbars
                autoHeight
                autoHeightMin={0}
                autoHeightMax={0}
                universal
                renderTrackHorizontal={props => <div {...props} className={this.props.renderTrackHorizontal ? this.props.renderTrackHorizontal : "table-view"} />}
                renderTrackVertical={props => <div {...props} className={this.props.renderTrackVertical ? this.props.renderTrackVertical : "table-view"}/>}
                renderView={props => <div {...props} className={this.props.renderView ? this.props.renderView : "table-view"}/>}>
                    {this.props.children}
            </Scrollbars>
        );
    }
}

export default Scrollbar;