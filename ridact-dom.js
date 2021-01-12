

export function useState (initial = '') {
    // must work with array!!!!!!
    let stateHistory = []
    stateHistory.push(initial)
    const set = function (newVal= '') {
        stateHistory[0] = newVal
    }

    return [stateHistory, set]
}


export function renderElement(vDomElement) {
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') { //support functional components
        return renderElement(type(props))
    }

    if (typeof type === 'string') {
        const domElement = document.createElement(type)


        children.forEach(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                Object.keys(props || {}).forEach(propName => {
                    domElement[propName] = props[propName]
                })

                domElement.appendChild(document.createTextNode(child))
            } else if (!child) {
                domElement.appendChild(document.createTextNode("false value"))
            }  else {
                domElement.appendChild(renderElement(child))
            }
        })

        return domElement
    }

}