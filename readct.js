export function createElement (type, props, ...children) {
     const Element = {type,props,children}
    //For prevent bugs we can freeze the object in order it to be styble
    // Object.freeze(Element.props)
    // Object.freeze(Element)

    return Element
}