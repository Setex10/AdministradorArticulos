
/**
 * Creates HTML elements based on the provided objectTag.
 * @param {Object|Array} objectTag - The object or array of objects containing the tag and attributes of the HTML elements to be created.
 * @returns {HTMLElement|Array<HTMLElement>} - The created HTML element(s).
 */


const createTags = (objectTag) => {
  const createTag = (objectTag) => {
    const element = document.createElement(objectTag.tag)
    delete objectTag.tag
    Object.keys(objectTag).forEach(key => {
      if(key == 'subTag') {
        if(!Array.isArray(objectTag[key])) return element.appendChild(createTag(objectTag[key]))
        objectTag[key].forEach(tag =>
          element.appendChild(createTag(tag))
        )
        return
      }
      if(key === 'textContent') return element.textContent = objectTag[key]
      if(key === 'addEventListener') return element.addEventListener(...objectTag[key])
      element.setAttribute(key, objectTag[key])

    })
    return element
  }
  if(Array.isArray(objectTag)){
    const arrayElement = objectTag.map(tag => {
      return createTag(tag)
    })
    return arrayElement
  } else if(typeof objectTag == 'object'){
    return createTag(objectTag)
  }
}
export default createTags;