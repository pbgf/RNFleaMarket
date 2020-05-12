import { base_path } from '../api/'
export const guid = ():string => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}

export function _get<T = ''>(obj:any, path:string, defaultVal:any = ''):T {
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


export const isnullOrUndefined = (target:any):boolean => {
  return target === null || target === undefined
}

export const isnoop = (target:any) => {
  return target === ''
}

export const autoAlert = (succCb:() => string, failCb:() => string):Promise<void> => {
  let msg:string
  const toast_ref = global.toast_ref 
  return new Promise((resolve, reject) => {
    if(msg=failCb()){
      toast_ref.current.show(msg, () => reject())
    }else{
      toast_ref.current.show(succCb(), () => resolve())
    }
  })
}

export const getFile = (url:string):string => {
  if(url.includes('http')){
    return url
  }
  return `${base_path}/file/${url}`
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
