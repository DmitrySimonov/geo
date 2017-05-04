import React from 'react';
import Image from './Image';

class PuginationButtons extends React.Component {
    getPaginationButtons(){
        if(this.props.pageNumber === this.props.currentPage || 1 === this.props.currentPage){
            return(
                <span> .... </span>
            );
        }else{
            return(
                <span> 
                    {this.props.currentPage === 2 ? null : <span> .... </span>}
                    {this.props.currentPage === 2 ? ' ' :<button onClick={() => this.props.onClick(this.props.currentPage - 1)} > {this.props.currentPage - 1 }</button>}
                    <button onClick={() => this.props.onClick(this.props.currentPage)} className="active">{this.props.currentPage}</button>
                    {this.props.currentPage === this.props.pageNumber - 1  ? ' ' : <button onClick={() => this.props.onClick(this.props.currentPage + 1)}> {this.props.currentPage + 1}</button> }
                    {this.props.currentPage === this.props.pageNumber - 1 ? null : <span> .... </span>}
                </span>
            );
        }
    }
    render() {
        return (
            <div className="pugination-buttons ">
                <button onClick={() => this.props.onClick(this.props.currentPage - 1)} ><Image src="assets/img/left.svg" /></button>
                <button onClick={() => this.props.onClick(1)} className={this.props.currentPage === 1? 'active' : ''}>1</button>
                {this.getPaginationButtons()}
                <button onClick={() => this.props.onClick(this.props.pageNumber)} className={this.props.currentPage === this.props.pageNumber ? 'active' : ''}>{this.props.pageNumber}</button>
                <button onClick={() => this.props.onClick(this.props.currentPage + 1)} ><Image src="assets/img/right.svg" /></button>
            </div>
        );
    }
}

export default PuginationButtons;