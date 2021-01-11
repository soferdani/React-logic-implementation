export function useState (theValue = '') {
    console.log(theValue)
    const set = function (something) {
        theValue = something
    }
    console.log(theValue)

    return {
        set,
        theValue
    }
}





export function renderElement(vDomElement) {
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') { //soport functional components
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