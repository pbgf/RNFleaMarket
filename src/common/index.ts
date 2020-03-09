export const guid = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}

export const _get = (obj:any,path:string,defaultVal:any = "") => {
  let paths = path.split('.')
  let len = paths.length
  for(let i=0;i<len;i++){
    if(isnullOrUndefined(obj[paths[i]])){
      return defaultVal
    }else{
      obj = obj[paths[i]]
    }
  }
  return obj
}
  
export const isnullOrUndefined = (target:any) => {
  return target === null || target === undefined
}

// export const $global = {
//   toast_ref: '',
//   setRef: function (ref:any) {
//     this.toast_ref = ref
//   },
//   getRef: function () {
//     return this.toast_ref
//   }
// }
