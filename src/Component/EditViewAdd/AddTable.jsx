import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostFormExcelData } from '../../Store/Actions/FormExcelPostAct'
import { FetchWFCommonData } from '../../Store/Actions/WorkFlowCommon'
import { FetchColumnData } from '../../Store/Actions/Column'
import { FetchGridData } from '../../Store/Actions/GridAct'
import { MainObject } from '../../Component/Elements/commonFun'
import GridFormSub from '../../Component/GridFormSub'
import { FormDataAct } from '../../Store/Actions/GeneralStates'
import swal from 'sweetalert'

const AddTable = () => {
    const dispatch = useDispatch()


    const ColumnRed = useSelector((state)=>state.ColumnRed)
    const FormIdRed = useSelector((state)=>state.FormIdRed)
    const GridRed = useSelector((state)=>state.GridRed)
    const FormDatRed = useSelector((state)=>state.FormDatRed)
    const EmdRed = useSelector((state)=>state.EmdRed)
    const ExcelDataRed = useSelector((state)=>state.ExcelDataRed)
    const AuthRed = useSelector((state)=>state.AuthRed)
    const UserDataStateRed = useSelector((state)=>state.UserDataStateRed)

    const [disBtn,setDisBtn] = useState(false)
    // const [dataObj,setDataObj] = useState({})
    const [dataValidation,setDataValidation] = useState(false)

    useEffect(()=>{
    dispatch(FetchGridData(FormIdRed,AuthRed.val))
    dispatch(FetchColumnData(FormIdRed,EmdRed,AuthRed.val))  
    },[FormIdRed])

    const handleSave = (gridData,setdata,data) =>{
        // console.log('FormDatRed',Object.values(FormDatRed).filter((fil)=>{return fil.length > 0})) 
        // console.log('FormDatRed',ExcelDataRed)
       console.log('newFormDataRed',FormDatRed)
          // dispatch(PostFormExcelData(res)) 

          // console.log('FormDatRedData',FormDatRed)

          // Object.values(FormDatRed).forEach((res)=>{
          //   dispatch(PostFormExcelData(res,AuthRed.val)) 
          // })

          // Object.keys(FormDatRed).forEach((res)=>{
          //   dispatch(FetchWFCommonData(res,AuthRed.val))
          // })

            if(data.some(res => (res.VF_ACTION == '' || res.VF_ACTION == null || res.VF_ORGANISATION_ID == '' || res.VF_ORGANISATION_ID == null))){
              swal({
                title :'Alert',
                text : 'Action OR Organization Field cant be empty, Kindly select one!',
                icon: "warning",
            })
            }else{
                // setDataValidation(true)
                Object.keys(FormDatRed).forEach((res)=>{
                  if(Array.isArray(FormDatRed[res])){
                    // console.log('UPDATEUSERDATA',FormDatRed[res].forEach(obj => obj["VF_CREATED_BY"] = UserDataStateRed))
                    // let finData = FormDatRed[res].forEach(obj => obj["VF_CREATED_BY"] = UserDataStateRed)
                    // console.log('UPDATEUSERDATA',finData)
                    dispatch(PostFormExcelData(FormDatRed[res],AuthRed.val,setdata)) 
                    // setDataValidation(false)
                    // console.log('FormDatRedDatanew',FormDatRed[res])
                  }else{
                    Object.values(FormDatRed[res]).forEach((fres)=>{
                      dispatch(PostFormExcelData(fres,AuthRed.val,setdata))
                      // setDataValidation(false)
                    })
      
                  }
                })
            }
      }
      // useEffect(()=>{
      //   console.log('FormDatRedData',FormDatRed)
      // },[FormDatRed])

  return (
<div style={{marginTop:'3vh', paddingLeft:'1.3rem',paddingRight:'1rem'}}>
      {/* <div style={{ display:'none', justifyContent : 'flex-end'}} className='mx-5 my-2'>
        <ImpExp columnData={ColumnRed.val} gridData={GridRed.val}/>
        <div>
      {MainObject.button({classNameVal:'btn btn-primary', widthVal:'', heightVal:'',btnName:'Submit'},handleSave)}
      </div>
      </div> */}
      {
        GridRed.loading&&GridRed.val.length == 0 ? MainObject.loader() :
        ColumnRed.loading&&GridRed.val.length == 0  ? MainObject.loader() :
        GridRed.val.filter((fil)=>{return fil.isMain }).map((res,i)=>{
          let dataObj = {}
          ColumnRed.val.filter((fil)=>{return fil.gridId == res.gridId}).forEach((fres)=>{
            return dataObj[fres.accessor] = ''
          })
          // let dataObj = {}
          // ColumnRed.val.filter((fil)=>{
          //   return fil.gridId == res.gridId
          // }).forEach((fe)=>{return dataObj[fe.accessor]=''})
          // console.log('GridFormSubobj',Object.keys(FormDatRed).includes(res.gridId),res.gridId,Object.keys(FormDatRed).includes(res.gridId) ? FormDatRed[res.gridId] : dataObj)   
          console.log('dataObjGridID',res.gridId)
          let gridIdArr = ['GID-902','GID-752']
         return FormDatRed&&ColumnRed&&<GridFormSub column={ColumnRed.val.sort((a,b)=>{return a.number-b.number})} data=
        {gridIdArr.includes(res.gridId)  ?  [dataObj] :  []}
        //  {res.gridId == 'GID-902' ? (Object.keys(FormDatRed).includes(res.gridId) ? FormDatRed[res.gridId] : [dataObj]) : []}
        //  {window.location.pathname == '/addTable' ? [dataObj] : [] }
        //  {[]}
        //  {Object.keys(FormDatRed).includes(res.gridId) ? FormDatRed[res.gridId] : [dataObj]} 
         gridData={res} key={i} handleSave={handleSave} disBtn={disBtn}/>
        })
      }
    </div>
  )
}

export default AddTable
