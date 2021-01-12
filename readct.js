export function createElement (type, props, ...children) {
     const element = {type,props,children}

    // console.log(element)
    //For prevent bugs we can freeze the object in order it to be styble
    // Object.freeze(Element.props)
    // Object.freeze(Element)

    return element
}