import React from 'react';
import Table from './../../analytics/components/partials/tables/Table';
import PuginationButtons from './PuginationButtons';
class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            dataProvider: this.props.dataProvider || [],
            pageSize: this.props.pageSize || 5,
        };
        this.onClick = this.onClick.bind(this);
    }
    getPage(currentPage,pageSize) {
        let rows = this.getPageArray(currentPage,pageSize,this.state.dataProvider);
        return <Table
                headers={['name','date','type','event','coordinates']}
                rows={rows}>
            </Table>;
        // return this.state.dataProvider[this.state.currentPage];
    }
    getPageArray(currentPage, pageSize, arr) {
        return arr.slice( (currentPage - 1) * pageSize, currentPage * pageSize );
    }
    getPagesNumber() {
        return Math.ceil(this.state.dataProvider.length / this.state.pageSize);
    }
    onClick(page){
        let pageNumber = this.getPagesNumber();
        // console.log(page);
        if(page >= 1 && page <= pageNumber ){
            this.setState({'currentPage': page});
        }
    }
    render(){
        return (
            <div>
                {React.cloneElement(React.Children.only(this.props.children), { rows:this.getPageArray(this.state.currentPage, this.state.pageSize, this.props.dataProvider)})}
                <PuginationButtons 
                    currentPage={this.state.currentPage} 
                    onClick={this.onClick}
                    prev={this.prevPage}
                    next={this.nextPage}
                    pageNumber={this.getPagesNumber()}
                />
            </div>
        );
    }
}

export default Pager;