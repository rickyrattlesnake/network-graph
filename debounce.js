function debounce(funcToDebounce, debounceTimeMs, immediate){
    let timeout = null;

    if (typeof debounceTimeMs !== 'number'){
        throw new Error('debounceTimeMs must be defined.');
    }
    if (typeof funcToDebounce !== 'function'){
        throw new Error('funcToDebounce must be a function to debounce.');
    }

    return () => {
        let context = this;
        let args = arguments;

        let executeFn = function() {
            timeout = null;
            if (!immediate) {
                funcToDebounce.apply(context, args);
            }

        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(executeFn, debounceTimeMs);
        if (callNow) {
            funcToDebounce.apply(context, args);
        }
    }
}