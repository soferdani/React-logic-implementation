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

let state
let index = 0

export function useState(initial) {
    console.log(initial)
    if (index === 0) {
        state = initial
    }

    const setState = function (newValue) {
        state = newValue
        index++
        render()
    }


    return [state, setState]

}


export function renderElement(vDomElement) {
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') { //support functional components
        return renderElement(type(props))
    }

    if (typeof type === 'string') {
        const domElement = document.createElement(type)


        children.forEach(child => {
            if (typeof child === 'string' || typeof child === 'number' || Array.isArray(child)) {

                Object.keys(props || {}).forEach(propName => {
                    if (propName.startsWith('on')) {
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