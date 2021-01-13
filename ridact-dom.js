let _rootComponent = null
let _mountPoint = null

let _currentApp = null
let index = 0
let hooks = [] // support multiplied states !



export function render(rootComponent = _rootComponent, mountPoint = _mountPoint) {
    const app = renderElement(rootComponent())



    if (_currentApp) {
        mountPoint.replaceChild(app, mountPoint.children[0]) // why children 0 ?

    } else {
        mountPoint.appendChild(app)  // actually push the tree to the real doom
    }

    _rootComponent = rootComponent
    _mountPoint = mountPoint
    _currentApp = app
    index = 0
}



export function useState(initial) {
    console.log(hooks)
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

    index+=1

    return [state, setState]
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
                        if (propName === 'onClick'){
                            domElement.onclick = props.onClick // now there is no lack here..
                        } // can add onChange etc..

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