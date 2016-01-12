import React from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';

export class Pagination extends React.Component{

    loadPage(target){
        var {clickCallback} = this.props;
        clickCallback(target.selected + 1);
    }
    render(){
        var {pageNum, className, initialSelected} = this.props;
        pageNum = pageNum || 0;

        return (
            <div className={classNames("rc-pagination", className, {'hidden': pageNum < 2})}>
                <ReactPaginate
                    containerClassName={"pagination"}
                    subContainerClassName={"pages"}
                    activeClassName={"active"}
                    nextLabel={<span className="icon next-icon"></span>}
                    previousLabel={<span className="icon previous-icon"></span>}
                    pageNum={pageNum}
                    clickCallback={this.loadPage.bind(this)}
                    breakLabel={<li className="break"><a>...</a></li>}
                    initialSelected={initialSelected}
                    >

                </ReactPaginate>
            </div>
        );
    }


}