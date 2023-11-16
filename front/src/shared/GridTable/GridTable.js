import { useEffect, useState } from 'react'
import TableHeaderCell from './components/TableHeaderCell/TableHeaderCell'
import './GridTable.scss'


const GridTable = ({ 
    reloadTrigger,
    columns, 
    onRowClick,  
    load, 
}) => {
    const [innerValues, setInnerValues] = useState([])
    const [loading, setLoading] = useState(false)

    const innerLoad = () => {
        load()
            .then(data=>{
                setInnerValues(data.data)
            })
    }

    useEffect(() => innerLoad(), [reloadTrigger])

    return (
        <div id={`grid`} className='grid-table'>

            <div 
            className='grid-table-wrapper'>
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map(header => <TableHeaderCell
                                title={header.title} 
                                style={header.style ?? null}
                                    />)}
                        </tr>
                    </thead>
                    <tbody>
                        {innerValues.map((value) => 
                            <tr>
                                {columns.map(col => 
                                    <td>
                                        {
                                            col.content(value, ()=>{
                                                if(onRowClick != undefined) 
                                                    onRowClick(value)
                                            })
                                        }
                                    </td>)}
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GridTable