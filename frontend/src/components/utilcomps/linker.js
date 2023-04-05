import {useNavigate} from 'react-router-dom';
const Linker = ({beauty,to,val}) =>{
    let navigate = useNavigate();
return(
<>
<div style={beauty} onClick={()=> navigate('/'+to)}>{val}</div>
</>
)
}