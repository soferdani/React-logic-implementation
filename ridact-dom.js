export function renderElement (element) {
    const {type, props, children} = element;
    // console.log(type)

    if(typeof type === 'function') { //soport functional components
        return renderElement(type(props))
    }


    if (typeof type === 'string') {

        const element = document.createElement(type);
        children.forEach(child => {
            if (typeof child === 'string') {
                if (props) {
                    let propsKeys = Object.keys(props)
                    let propsValues = Object.values(props)
                    for (let i in propsKeys) {
                        element.setAttribute(propsKeys[i],propsValues[i])
                    }
                    // console.log(Object.keys(props))
                    // console.log(Object.values(props))
                }
                // Object.keys(props).forEach(name => {
                    // element.setAttribute([name],)
                    // console.log(name.id)
                // })

                element.appendChild(document.createTextNode(child))
            } else {
                element.appendChild(renderElement(child))
            }
        })
        return element
    }









        // Object.keys(props).forEach(prop=> {
        //
        // })
}