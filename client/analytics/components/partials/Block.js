import React from 'react';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import { Row, Col} from 'react-bootstrap';

class Block extends React.Component {
    constructor(props){
        super(props);
    }
    _getClassName(){
        return "block " +
            (this.props.className ? this.props.className : "");
    }
    render(){
        return(
                <div className={this._getClassName()}>
                    {this.props.children}
                </div>
        );
    }
};

export default Block;
