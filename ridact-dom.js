

export function useState (initial = '') {
    // must work with array!!!!!!
    let state = []
    state.push(initial)
    const set = function (newVal= '') {
        state[0] = newVal
        // needs to render all again
    }

    return [state, set]
}


export function renderElement(vDomElement) {
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') { //support functional components
        return renderElement(type(props))
    }

    if (typeof type === 'string') {
        const domElement = document.createElement(type)


        children.forEach(child => {
            console.log(child)
            if (typeof child === 'string' || typeof child === 'number' || Array.isArray(child)) {

                Object.keys(props || {}).forEach(propName => {
                    if (propName.startsWith('on')){
                        domElement.addEventListener('click',props.onClick) // very stupid
                    } else {
                        domElement[propName] = props[propName]
                    }
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