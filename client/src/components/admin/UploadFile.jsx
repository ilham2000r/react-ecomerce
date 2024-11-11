import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from "react-image-file-resizer"
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';

const UploadFile = ({form,setForm}) => {
    const token = useEcomStore((state)=> state.token)
    const [isLoading, setIsloading ] = useState(false)

    const handleOnchange = (e) => {
        setIsloading(true)
        const files = e.target.files
        if(files) {
            setIsloading(true)
            let allFiles = form.images
            for(let i=0; i<files.length; i++){
                console.log(files[i]);
                const file = files[i] // empty array
                if(!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not image`)
                    continue
                }
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data)=>{
                        // endpoit backend
                        uploadFiles(token, data)
                        .then((res) => {
                            console.log(res);
                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images:allFiles
                            })
                            setIsloading(false)
                            toast.success(`Upload image success`)
                        }).catch((err) => {
                            console.log(err);
                            setIsloading(false)
                        });
                    },
                    "base64"
                )
                
            }
        }
    }

    const handleDelete = (public_id)=>{
        const image = form.images
        removeFiles(token, public_id)
        .then((res)=>{
            
            const filterImages = image.filter((item, index)=>{
                console.log(item);
                return item.public_id !== public_id
            })
            console.log('filterImages', filterImages)
            setForm({
                ...form,
                images: filterImages
            })
            toast.error(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className='flex gap-4 my-4' >
            {
                isLoading && <Loader className='w-16 h-16 animate-spin' />
            }
            
            { /* image */}
            {
                form.images.map((item, index)=>
                        <div className='relative' key={index}>
                           <img 
                            className='w-24 h-24 hover:scale-105'
                            src={item.url}/>
                            <span
                                onClick={()=>handleDelete(item.public_id)} 
                                className='absolute top-0 right-0 px-1 bg-zinc-200 rounded-md cursor-pointer'>
                                X
                            </span> 
                        </div>
                )
            }
        </div>
        <input 
            onChange={handleOnchange}
            name='image'
            type='file'
            multiple
            />
    </div>
  )
}

export default UploadFile