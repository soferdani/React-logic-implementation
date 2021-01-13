let previousRootComponent
let previousMountPoint

export function render(rootComponent = previousRootComponent, mountPoint = previousMountPoint) {

    const realDOM = renderElement(rootComponent())

    if (previousRootComponent) {
        mountPoint.replaceChild(realDOM, mountPoint.children[0])

    } else {
        mountPoint.appendChild(realDOM)
    }

    previousRootComponent = rootComponent
    previousMountPoint = mountPoint
}

let state = [] // support multiplied states !
let numberOfTimesUseStateIsUsed = 0

export function useState(initial) {
    console.log(state)

    if (numberOfTimesUseStateIsUsed === 0) {
        state[0] = initial
        numberOfTimesUseStateIsUsed += 1 // why not index ++ ??
    } else {
        state[numberOfTimesUseStateIsUsed] = initial
        // numberOfTimesUseStateIsUsed += 1  //seems reusable to increase here as well

    }

    const setState = function (newValue) {
        // how do i know what witch is the right state to change?? at the moment its hard coded...
        state[0] = newValue // FIXME: state[0] is not ok!
        render()
    }

    return [state[numberOfTimesUseStateIsUsed - 1], setState]
}


export function renderElement(vDomElement) { // should i call it createDomElement instead of renderElement?
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') {
        return renderElement(type(props))
    }

    if (typeof type === 'string') {
        const domElement = document.createElement(type)


        children.forEach(child => {
            if (typeof child === 'string' || typeof child === 'number' || Array.isArray(child)) {

                Object.keys(props || {}).forEach(propName => {
                    if (propName.startsWith('on')) {
                        // FIXME: need to support all on action!
                        domElement.addEventListener('click', props.onClick) // very stupid
                    } else {
                        domElement[propName] = props[propName]
                    }
                })

                domElement.appendChild(document.createTextNode(child))
            } else if (!child) {
                domElement.appendChild(document.createTextNode("false value"))
            } else {
                domElement.appendChild(renderElement(child))
            }
        })


        return domElement
    }

}