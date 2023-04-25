import cookie from 'js-cookie';
import { memo } from 'react';
const useCookie = (todo,key,value,path,expiry) =>{
if(todo == 'set'){
cookie.set(key,value,{path: path, expires: expiry});
}
else if(todo == 'get') {
return cookie.get(key);
}
else if(todo == 'clear'){
cookie.remove(key);
}
}

export default useCookie;