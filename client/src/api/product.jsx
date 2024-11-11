import axios from "axios"

export const createProduct = async (token, form) =>{
    return axios.post('http://localhost:5001/api/product',form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (count=20) =>{
    return axios.get('http://localhost:5001/api//products/'+count)
}

export const readProduct = async (token, id) =>{
    return axios.get('http://localhost:5001/api//product/'+id,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) =>{
    return axios.delete('http://localhost:5001/api//product/'+id,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
 
export const updateProduct = async (token, id, form) =>{
    return axios.put('http://localhost:5001/api//product/'+id, form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) =>{
    // console.log('Form api frontend',form);
    return axios.post('http://localhost:5001/api/images',{
        image: form
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) =>{
    // console.log('Form api frontend',form);
    return axios.post('http://localhost:5001/api/removeImage',{
        public_id
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) =>{
    return axios.post('http://localhost:5001/api/search/filters',arg)
}

export const listProductBy = async (sort,order,limit) =>{
    return axios.post('http://localhost:5001/api/productby',
        {
            sort,
            order,
            limit
        }
    )
}



 
