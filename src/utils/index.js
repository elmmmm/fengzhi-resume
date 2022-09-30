// 防抖-回城被打断
export function debounce(fn, delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(this) //事件的回调，使用call让this指向当前的dom（如input）
        }, delay)
    }
}

//生成json文件
export function downloadTxtFile(str, filename) {
    const blob = new Blob([`\ufeff${str}`], { type: 'text/txt,charset=UTF-8' })
    const href = URL.createObjectURL(blob) // 创建blob地址
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    a.click()
}