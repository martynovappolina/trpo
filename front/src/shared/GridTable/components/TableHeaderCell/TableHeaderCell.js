import './TableHeaderCell.scss'

const TableHeaderCell = ({ title, style}) => {
    return (
        <th style={style ?? null}>
            <div className='grid-table-theader-cell'>
                <div>{ title }</div>
            </div>
        </th>
    )
}

export default TableHeaderCell