let _rootComponent = null
let _mountPoint = null

let _currentApp = null
let index = 0 // represent the number of hooks i have
let hooks = [] // support multiplied states !


export function render(rootComponent = _rootComponent, mountPoint = _mountPoint) {
    const app = renderElement(rootComponent())


    if (_currentApp) {
        mountPoint.replaceChild(app, mountPoint.children[0])

    } else {
        mountPoint.appendChild(app)
    }

    _rootComponent = rootComponent
    _mountPoint = mountPoint
    _currentApp = app
    index = 0 // every render we make index 0 again then each hook remember what
}


export function useState(initial) {
    let state
    let _index = index


    if (hooks[_index]) {
        state = hooks[_index]
    } else {
        hooks[_index] = initial
        state = initial
    }


    const setState = function (newValue) {
        hooks[_index] = newValue
        render()
    }

    index += 1 // only when we use the useState we increase the index

    return [state, setState]
}


export function renderElement(vDomElement) { // should i call it createDomElement instead of renderElement?
    const {type, props, children} = vDomElement;

    if (typeof type === 'function') {
        return renderElement(type(props))
    }

    if (typeof type === 'string') {
        const domElement = document.createElement(type)

        Object.keys(props || {}).forEach(propName => {
            domElement[propName] = props[propName]
        })

        children.forEach(child => {
            if (child == null || typeof child === "undefined") { // good
                return;
            }

            if (Array.isArray(child)) {
                child.forEach(childVDom => {
                    domElement.appendChild(renderElement(childVDom))
                });
                return;
            }
            if (typeof child === 'string' || typeof child === 'number' ) {
                domElement.appendChild(document.createTextNode(child))
            } else { // good
                domElement.appendChild(renderElement(child))
            }
        })


        return domElement
    }

}