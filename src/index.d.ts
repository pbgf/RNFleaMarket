declare var global:{
	toast_ref:current
}
declare interface current{
	current: toastMethod
}
declare interface toastMethod{
	show: (text:string, callback?:() => void) => {}
}