import React from 'react';
import ButtonList from 'konux/common/components/ButtonList';
import ButtonItem from 'konux/common/components/ButtonItem';
import Button from 'konux/common/components/Button';

class FilterList extends React.Component {
    render() {
        return (
            <div className="filter-button-list">
                {
                    this.props.list ? 
                        <ButtonList list={this.props.list} onApply={this.props.onApply}>
                        {React.Children.map(this.props.children, (child) => {
                            return <ButtonItem {...child.props}>{child}</ButtonItem>;
                        })}
                        </ButtonList> : null
                }
            </div>
        );
    }
}

export default FilterList;