import { useEffect, useState } from 'react'
import PageHeader from '../PageHeader/PageHeader'
import TableHeaderCell from './components/TableHeaderCell/TableHeaderCell'
import './GridTable.scss'
import { uuidv4 } from '../../utils/uuidv4'
import Loader from '../Loader/Loader'
import toast from '../../utils/toast'
import moment from 'moment'
import { getSelectedText } from '../../utils/getSelectedText'

let getInitFilter = (columns, savedFilterIndex)=>{
    let filterColumns = columns.filter(c => c.filter != undefined)
    let filter = {}
    filterColumns.map(c => c.filter.init(filter))
    if(savedFilterIndex != null){
        let savedFilter = localStorage.getItem(savedFilterIndex)
        if(savedFilter)
            filter = JSON.parse(savedFilter)    
    }

    return filter
}

const GridTable = ({ 
    reloadTrigger,
    modal,
    csvFilePrefixName, 
    title, 
    columns, 
    defaultSort,
    onRowClick, 
    pageHeader=false, 
    buttons, 
    load, 
    values, 
    messageForEmpty, 
    outFullTextSearch,
    outFilter, 
    setOutFilter, 
    downloadable ,
    rowColorRules=[]
}) => {
    const [mouseDownStartTime, setMouseDownStartTime] = useState(null)
    const hashCode = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    const columnsStringDescription = JSON.stringify(columns, function(key, val) {
        if (typeof val === 'function') {
          return val + ''; // implicitly `toString` it
        }
        return val;
      })

    const columnsHashCode = hashCode(columnsStringDescription)

    let savedFilterIndex = load != undefined ? 'saved-filter-' + load.name + columnsHashCode.toString() : null
    const [innerFilter, setInnerFilter] = useState(getInitFilter(columns, savedFilterIndex))
    let filter = outFilter == undefined ? innerFilter : outFilter

    let setFilter = (val)=>{
        let filterSetter = outFilter == undefined ? setInnerFilter : setOutFilter
        filterSetter(val)
        if (savedFilterIndex != null && val != null)
            localStorage.setItem(savedFilterIndex, JSON.stringify(val))
    }

    const [fullTextSearchInner, setFullTextSearchInner] = useState('')
    let fullTextSearch = outFullTextSearch == undefined ? fullTextSearchInner : outFullTextSearch
    let setFullTextSearch = outFullTextSearch == undefined ? setFullTextSearchInner : (val)=>{outFullTextSearch(val)} 
    const [loading, setLoading] = useState(false)
    const [innerValues, setInnerValues] = useState([]) 
    const [totalCount, setTotalCount] = useState(0)
    const [currentSortFieldName, setCurrentSortFieldName] = useState(defaultSort ? defaultSort.field : null)
    const [currentSortType, setCurrentSortType] = useState(defaultSort ? defaultSort.order : null)
    const [page, setPage] = useState(0)
    const [resetFilterIsDisabled, setResetFilterIsDisabled] = useState(true)
    const [currentOpenedFilter, setCurrentOpenedFilter] = useState(null)
    const [isCreateCsv, setIsCreateCsv] = useState(false)
    const [edit, setEdit] = useState({})
    
    const onDownloadCsv = () => {
        if(isCreateCsv)
            return
        setIsCreateCsv(true)
        toast.success('Формирование документа началось...') 
        load(0, fullTextSearch, filter, currentSortType, currentSortFieldName, true)
        .then( blob => { 
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = `${csvFilePrefixName} ${moment(new Date()).format('DD.MM.YYYY')}.csv`;
            a.click();
            setIsCreateCsv(false)
            toast.success('Документ сформирован!') 
          });
    }


    const innerLoad = (newPage, isAppend) => {
        if(isAppend == undefined)
            setLoading(true)
        load(newPage ?? page, fullTextSearch, filter, currentSortType, currentSortFieldName)
            .then(data=>{
                if(isAppend == undefined)
                    setInnerValues(data.rows)
                else{
                    setInnerValues(innerValues => {return [...innerValues, ...data.rows]})
                }
                setTotalCount(data.totalCount)
                if(title != undefined)
                    title(data.totalCount)
                if(isAppend == undefined)
                    setLoading(false)
                isFethingDataByScrollSetter(false)
            })
    }

    const onOpen = ()=>{
        if (values != undefined) {
            setInnerValues(values)
        } else {
            innerLoad()
        }
    }
    useEffect(()=>{
        if(outFilter !== undefined && setOutFilter != undefined){
            setOutFilter(getInitFilter(columns, savedFilterIndex))
        }
        onOpen()
    }, [])
    useEffect(()=>{
        if (savedFilterIndex != null && outFilter != undefined && setOutFilter != undefined)
            localStorage.setItem(savedFilterIndex, JSON.stringify(outFilter))
    }, [outFilter])

    useEffect(()=>{
        onOpen()
    }, [values])

    useEffect(()=>{
        setPage(0)
        onSearch(0)
        
        const tableWrapper = document.querySelector(`#grid-${id} .grid-table-wrapper`)
        if(tableWrapper)
            tableWrapper.scrollTo(0, 0)

    }, [filter, currentSortType])

    useEffect(()=>{
        setPage(0)
        onSearch(0)        
    }, [reloadTrigger])


    let onScrollDown = () => {
        setPage(page => {page++; return page;})
        if (values != undefined) {
            setInnerValues(values)
        } else {
            innerLoad(page+1, true)
        }
    }
    
    let onResetFilterClick = () => {
        setFilter(getInitFilter(columns))
        setFullTextSearch('')
        setCurrentSortType(defaultSort == null ? null : defaultSort.order)
        setCurrentSortFieldName(defaultSort == null ? null : defaultSort.field)
    }
    
    let onSearch = (newPage=page) => {
        if(values != undefined)
            return

        innerLoad(newPage)
        let keys = []
        for(let key in filter) {
            keys.push(key)
        } 
        keys = keys.filter(x => x != undefined)
        if(columns.filter(x=>x.filter != undefined).every(x=>!x.filter.isFiltered(filter)) && fullTextSearch === '' &&
        (defaultSort == null ? (currentSortFieldName === null && !currentSortType) : (currentSortFieldName === defaultSort.field && currentSortType == defaultSort.order)))
            setResetFilterIsDisabled(true)
        else
            setResetFilterIsDisabled(false)
    }
    
    const [id] = useState(uuidv4())
    const isFethingDataByScrollGetter = ()=>{return window[`isFethingDataByScroll${id}`]}
    const isFethingDataByScrollSetter = (val)=>{window[`isFethingDataByScroll${id}`] = val}
    
    const handleScroll = () => {
        const tableWrapper = document.querySelector(`#grid-${id} .grid-table-wrapper`)
        const table = tableWrapper.childNodes[0]
        
        if (
            tableWrapper.offsetHeight + tableWrapper.scrollTop <
            table.offsetHeight
        )
          return;
          if(!isFethingDataByScrollGetter()){
            isFethingDataByScrollSetter(true)
            if (onScrollDown !== undefined) onScrollDown()
          }
    };

    const clearEdit = ()=>{
        setEdit({})
    }
    
    useEffect(()=>{
        const tableWrapper = document.querySelector(`#grid-${id} .grid-table-wrapper`)
        if(tableWrapper) isFethingDataByScrollSetter(false)
    }, [])

    if(messageForEmpty != undefined && messageForEmpty != null && (values == undefined || values.length == 0) && (innerValues.length == 0) && !loading)
        return <div className="container empty-message">{messageForEmpty}</div>

    return (
        <div id={`grid-${id}`} className='grid-table'>
            {
                pageHeader && 
                <PageHeader 
                count={title(totalCount)} 
                fullTextSearch={fullTextSearch}
                setFullTextSearch={setFullTextSearch}
                onSearch={()=>{onSearch(0)}}
                buttons={buttons} 
                downloadable={downloadable}
                isCreateCsv={isCreateCsv}
                onDownloadCsv={onDownloadCsv}
                onResetFilterClick={onResetFilterClick} 
                resetFilterIsDisabled={resetFilterIsDisabled} />
            }

            <div 
            style={{maxHeight: modal ? '40vh': 'auto'}}
            onScroll={handleScroll}
            className='grid-table-wrapper'>
                {/* {JSON.stringify(filter)} */}
                <table className="table">
                    <thead>
                        <tr>
                            <th></th> 
                            {columns.map(header => <TableHeaderCell
                                    title={header.title} 
                                    filter={header.filter != undefined }
                                    isFiltered={header.filter == undefined ? false : header.filter.isFiltered(filter) ?? false}
                                    onFilterClick={header.filter == undefined ? false : ()=>{
                                        setCurrentOpenedFilter(header.title)
                                    }}
                                    sort={header.sort ?? null}
                                    sortType={header.sort == currentSortFieldName ? currentSortType : null}
                                    style={header.style ?? null}
                                    search={header.search ?? false}
                                    onSortClick={()=>{
                                        let type = ''
                                        if(currentSortFieldName != header.sort)
                                            type = 'asc'
                                        else
                                            if(currentSortType == 'asc')
                                                type = 'desc'
                                            else 
                                                type = null
                                        setCurrentSortType(type)
                                        if(type == null)
                                            setCurrentSortFieldName(null)
                                        else
                                            setCurrentSortFieldName(header.sort)
                                    }}
                                     />)}
                        </tr>
                    </thead>
                    <tbody>
                        {innerValues.map((value, ind) => 
                            <tr style={{backgroundColor: (rowColorRules.filter(x=> x.rule(value)).length > 0 ? rowColorRules.filter(x=> x.rule(value))[0].color : '') }}>
                                <td style={{backgroundColor: 'rgb(235 235 235)', textAlign: 'center'}}>{ind + 1}</td>
                                {columns.map(col => 
                                    <td 
                                    onMouseDown={(e) => {if((!col.ignoreClick || col.content(value) == '') && e.button == 0){setMouseDownStartTime(new Date())}}}
                                    onMouseUp={(e)=>{
                                        if((!col.ignoreClick || col.content(value) == '') && e.button == 0 && !((new Date() - mouseDownStartTime) > 150 && getSelectedText() != '')) {
                                            if (col.edit) {
                                                if (!(edit.editField === col.edit && value.id === edit.id))
                                                setEdit({editField: col.edit, id: value.id, value: value[col.edit]})
                                            } 
                                            else if(onRowClick != undefined) onRowClick(value)
                                        }}} className={col.copy ? 'td-copy': ''} style={col.style}>
                                        {
                                            (edit.editField === col.edit && value.id === edit.id && col.editContent != undefined) ?
                                            <>{col.editContent(value, clearEdit)}</>:
                                            col.content(value, ()=>{
                                                if(onRowClick != undefined && col.edit == undefined) 
                                                    onRowClick(value)
                                            })
                                        }
                                    </td>)}
                            </tr>
                            )}
                        {loading ? <Loader /> :''} 
                    </tbody>
                </table>
            </div>
            {(()=>{
                return columns.filter(c => c.filter != undefined).map(x=> x.filter.control(currentOpenedFilter == x.title, (val)=>{
                    setCurrentOpenedFilter(currentOpenedFilter=>{
                        currentOpenedFilter = null
                    return currentOpenedFilter
                })}, filter, setFilter))
            })()}
        </div>
    )
}

export default GridTable