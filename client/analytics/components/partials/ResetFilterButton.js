import React from 'react';
import Button from 'konux/common/components/Button';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {filter} from './../../actions';
import { translate } from 'react-i18next';

class ResetFilterButton  extends React.Component {
    onClick(){
        this.props.resetFilter();
    }
    render(){
        let {t} = this.props;
        return(
            <Button className="btn-4"  onClick={this.onClick.bind(this)}>{t('reset')}</Button>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFilter: bindActionCreators(filter.resetFilter, dispatch)
    };
};
        
const ConnectedResetFilterButton = connect(null, mapDispatchToProps)(ResetFilterButton);

export default translate(['common'])(ConnectedResetFilterButton);