let obj={
    islogin:0,
}

export function appReducer(state=obj,action){
    
    if(action.type=="setLogin"){
        return {...state,islogin:action.value}
    }
    else{
        return state;
    }
}