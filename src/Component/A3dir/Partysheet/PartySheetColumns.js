import { EditableAttachCell, EditableCell, EditableDateCell, EditableDdCell, EditableMixCell, EditableNumCell } from "./EditableCellPartySheet"

const calculateColumnWidth = (tableWidth, totalColumns) => {
    return Math.floor(tableWidth / totalColumns);
};

export const PartysheetColumns = (col,accountData,updateMyData) =>{
  return[  {
        Header : 'Test Details',
        accessor : 'test',
        columns : col.filter((fil)=>{return fil.parentCell =='test'}).sort((a,b)=> a.orderBy-b.orderBy).map((cres)=>{
            return {
                Header : cres.fieldName,
                accessor : cres.accessor,
                width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)
            }
        }),
        sticky:'left'
        
    }
    ,...accountData.map((res)=>{
    return {
        Header : res,
        accessor : res,
        columns : col.filter((fil)=>{return fil.parentCell !=='test'}).sort((a,b)=> a.orderBy-b.orderBy).map((cres)=>{
            if(cres.cellType=='textArea'){
                return {
                    Header : cres.fieldName,
                    accessor : cres.accessor+'#'+res,
                    Cell : ({cell}) =>{return <EditableCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} colObj={cell.column} parentId={cell} />},
                    width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)

                }
            }else if(cres.cellType=='attach'){
                return{
                    Header : cres.fieldName,
                    accessor : cres.accessor+'#'+res,
                    Cell : ({cell}) =>{return <EditableAttachCell  column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} colObj={cell.column}/>},
                    width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)

                }
            }else if(cres.cellType=='mix'){
                return{
                    Header : cres.fieldName,
                    accessor : cres.accessor+'#'+res,
                    Cell : ({cell}) =>{return <EditableMixCell rowObj={cell.row}  column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} colObj={cell.column}/>},
                    width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)
                }
            }else if(cres.cellType=='dropDown'){
                return{
                    Header : cres.fieldName,
                    accessor : cres.accessor+'#'+res,
                    Cell : ({cell}) =>{return <EditableDdCell rowObj={cell.row}  column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} colObj={cell.column}/>},
                    width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)
                }
            }
            else{
                return {
                    Header : cres.fieldName,
                    accessor : cres.accessor+'#'+res,
                    width : cres.width !== null ? cres.width : calculateColumnWidth( 0.97 * window.innerWidth, col.length)
                }
            }

        })
    }
  })]
}