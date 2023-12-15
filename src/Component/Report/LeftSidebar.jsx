import React, { useEffect, useState } from 'react';
import './LeftSidebar.css'
import { IoReorderThreeOutline } from "react-icons/io5";
import "rsuite/dist/rsuite.css";
import { useDispatch, useSelector } from 'react-redux';
import { FetchReportTitleFilterData } from '../../Store/Actions/ReportTitleFilter';
import { MainObject } from '../Elements/commonFun';


const LeftSidebar = () => {
    const [isExpanded, setExpanded] = useState(true);

    const toggleSidebar = () => {
        setExpanded(!isExpanded);
    };
    const dispatch = useDispatch()
    const FormIdRed = useSelector((state) => state.FormIdRed)
    const GridRed = useSelector((state) => state.GridRed)
    const ColumnRed = useSelector((state) => state.ColumnRed)
    const AuthRed = useSelector((state) => state.AuthRed)
    const FormDatRed = useSelector((state) => state.FormDatRed)
    const ReportTitleFilterRed = useSelector((state) => state.ReportTitleFilterRed)
    const ReportTitleDataRed = useSelector((state) => state.ReportTitleDataRed)

    useEffect(() => {
        dispatch(FetchReportTitleFilterData(FormIdRed, AuthRed.val))
    }, [FormIdRed])

    useEffect(() => {
        console.log('LNav FormIdRed', ReportTitleFilterRed.val)
        console.log('LNav FormIdRed', ReportTitleDataRed.val)
    }, [ReportTitleDataRed])

    return (
        <>
            {ReportTitleFilterRed.loading ? MainObject.loader() : <>
                <div className={`left-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    <div className="sidebar-header" onClick={toggleSidebar}>
                        {isExpanded ? (
                            <div  >
                                <h4 className='FilterHeader' style={{ display: 'inline-block', fontFamily:'Palatino Linotype' }} >Filter</h4>
                                <IoReorderThreeOutline style={{ fontSize: '2.5em', marginLeft: '4vw' }} />
                                <hr style={{marginTop:'2px' }} />
                            </div>
                        ) : (
                            <IoReorderThreeOutline style={{ fontSize: '2.5em' }} />
                        )}
                    </div>
                    {ReportTitleFilterRed.val.map((res, i) => {
                        return <>
                            <div style={{ display: isExpanded ? 'block' : 'none' }}>
                                <h6 style={{ paddingLeft: '10px', fontFamily:'Palatino Linotype' }}>{res.colFilLabel}</h6>

                            </div>
                            <div className="sidebar-content" style={{ display: isExpanded ? 'block' : 'none', overflowY: 'auto', maxHeight: '65vh', overflowX: 'hidden' }}>
                                <input list='list' className='form-control form-control-sm' style={{fontSize:'12px',fontFamily:'Palatino Linotype'}} type={res.colFilTyp} placeholder={`Enter ${res.colFilLabel}...`} />
                                {/* <datalist id='list'>
                                    {
                                    ReportTitleDataRed.loading ? <option value={'loading'}/> : ReportTitleDataRed.val.map((rres)=>{console.log('NewNav FormIdRed',rres[res.colFilLabel]);})
                                    }
                                </datalist> */}
                            </div>
                        </>
                    })}
                </div>
                <div className="sidebar-footer" style={{ display: isExpanded ? 'block' : 'none' }}>
                    <hr />
                    <button className="btn btn-secondary" style={{ marginLeft: '2em',fontFamily:'Palatino Linotype' }} >Apply Filter</button>
                </div>
            </>

            }

        </>
    );
};

export default LeftSidebar;
