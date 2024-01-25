import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useBlockLayout, useRowSelect } from 'react-table'
import GlobalFilter from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Styles } from './AddTableStyles'
import './AddTable.css'
import AddHead from './AddHead'
import { Checkbox } from './Checkbox'
import { addRow,removeRows } from './AddTableFunctions'


const AddTab = ({columnData, reportData }) => {

    const calculateColumnWidth = (tableWidth, totalColumns) => {
        return Math.floor(tableWidth / totalColumns);
    };



    const [columns, setcolumns] = useState(
        columnData
        // [...columnData.map((res) => { return { Header: res.rptColLabel, accessor: res.rptColName, Filter: ColumnFilter, width: res.rptColWidth ? res.rptColWidth : calculateColumnWidth(1.0 * window.innerWidth, columnData.length) } })]
    );

    // useEffect(()=>{console.log('NewNav FormIdRed',ReportTitleDataRed.val.length)})

    const [data, setdata] = useState([...reportData])


    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])



    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        //   footerGroups, 
        page,
        selectedFlatRows,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter } = useTable({
            columns,
            data,
            defaultColumn
        }, useFilters, useBlockLayout, useGlobalFilter, useSortBy, usePagination,useRowSelect,(hooks) => {
            hooks.visibleColumns.push((columns) => {
              return [{
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => {
                  return <Checkbox {...getToggleAllRowsSelectedProps()} />
                },
                Cell: ({ row }) => {
                  return <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                width: '50',
                sticky: 'left'
              },
              ...columns]
            })
          })



    const { globalFilter } = state
    const { pageIndex } = state
    return (
        <>
            <div style={{ padding: 'auto 1px' }} >
                <AddHead addRow={addRow} removeRows={removeRows} columnData={columnData} selectedFlatRows={selectedFlatRows} setdata={setdata}/>
                <Styles>
                    <div {...getTableProps()} className="table sticky mx-3 my-1 tableCont " style={{ maxHeight: '80vh', maxWidth: '97.3vw', overflow: 'scroll', border: 'none' }} >
                        <div className='header'>
                            {
                                headerGroups.map((headerGroup) => (
                                    <>
                                        <div className='tr' {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map((column) => (
                                                    <div className='th' {...column.getHeaderProps()}>{column.render('Header')}
                                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                        <div className='body' {...getTableBodyProps()}>
                            {
                                page.map((row) => {
                                    prepareRow(row)
                                    return <div className='tr' {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => (
                                                <div className='td' {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </div>
                                            ))
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </Styles>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', paddingLeft: '18px' }}>
                    <div>
                        <span>
                            page: {' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        {/* <button onClick={() => previousPage()} disabled={!canPreviousPage}><TbPlayerTrackNextFilled /> Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>Next </button> */}
                        <button className='btn btn-outline-secondary btn-sm mx-2' title='Previous page' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button className='btn btn-outline-secondary btn-sm' title='Next page' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        {/* <Pagination><Pagination.Next /></Pagination> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddTab