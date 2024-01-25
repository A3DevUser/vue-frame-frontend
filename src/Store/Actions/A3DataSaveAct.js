import axios from "axios";

const A3SaveReq = (val) =>{
    return {
        type : 'A3SaveReq',
        payload : val
    }
};

const A3SaveSuccess = (val) =>{
    return {
        type : 'A3SaveSuccess',
        payload : val 
    }
};

const A3SaveErr = (val) =>{
    return {
        type : 'A3SaveErr',
        payload : val
    }
};

export const PostA3SaveData = (data,token) =>{
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` , 
      };
    return (dispatch)=>{
        dispatch(A3SaveReq());
        axios.post(`http://192.168.100.236:8443/VueFrame-ver2-0.0.1-SNAPSHOT/SubmitOnBoardingData`,data,{headers})
        .then((res)=>{
            dispatch(A3SaveSuccess(res.data))
            return alert('Data Saved successfull !!!')
        })
        .catch((err)=>{
            dispatch(A3SaveErr(err))
        })
    }
}


