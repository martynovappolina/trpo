import './TableHeaderCell.scss'

const TableHeaderCell = ({ title, filter=false, onFilterClick, search=false, sort=null, style=null, isFiltered=false, sortType, onSortClick=null}) => {
    return (
        <th style={style ?? null}>
            <div className='grid-table-theader-cell'>
                <div>{ title }</div>
                {
                    search && <div className='grid-table-theader-search-icon' /> 
                }
                {
                    filter && 
                    <div 
                    onClick={onFilterClick}
                    className={'grid-table-theader-filter-icon' + (isFiltered ? ' filtered':'')} />
                }
                {
                    sort && <div className={`grid-table-theader-sort-icon${sortType == null ? '' : `-${sortType}`}`} onClick={()=>{if(onSortClick != null) onSortClick()}} />
                }
            </div>
        </th>
    )
}

export default TableHeaderCell