export function debounce(func, delay = 500) {
    let timer = null

    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            // func.apply(this,args)
            func(args)
                // console.log(this);
        }, delay)
    }
}