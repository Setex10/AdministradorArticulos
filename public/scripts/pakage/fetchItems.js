const fetchToApi = async(url) => {
    try {
        let items = await fetch(url)
        items = await items.json()
        return items
    }
    catch(error){
        console.log(error);
    }

}

const fetchItems = async(params={}) => {
    let url = "https://manageitems.onrender.com/items"
    if(Object.keys(params).length > 0){
        url += "?" + new URLSearchParams(params).toString()
    }
    return await fetchToApi(url)
}


export {
    fetchItems
};