import React,{ useState, useEffect } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../util/Number'
import { dateFormat } from '../../util/DateFormat'

const TableOrders = () => {
  const token = useEcomStore((state)=>state.token)
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    handleGetOrder(token)
  },[])

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
    .then((res)=>{
      console.log(res);
      setOrders(res.data)
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
    .then((res)=>{
      console.log(res);
      toast.success('Update success')
      handleGetOrder(token)
      
    })
    .catch((err)=>{
      console.log(err);
    }) 
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Not Process":
        return 'bg-gray-200'
      case "In Process":
        return 'bg-sky-200'
      case "Completed":
        return 'bg-green-200'
      case "Cancle":
        return 'bg-red-200'
    }
  }


  return (
    <div className='container mx-auto bg-white shadow-md rounded-md p-5'>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className='bg-gray-200 rounded-md'>
              <th className='w-1/12 '>No</th>
              <th className='w-1/12'>User</th>
              <th className='w-4/12'>Product</th>
              <th className='w-2/12'>Date</th>
              <th className='w-1/12'>Total</th>
              <th className='w-1/12'>Status</th>
              <th className='w-1/12'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((item, index)=>{
                console.log(item);
                
                return (
                  <tr key={index} className='border'>
                    <td className='text-center'>{index+1}</td>
                    <td >
                      <p>{item.orderedBy.email}</p>
                      <p>{item.orderedBy.address}</p>
                    </td>
                    <td>
                        {
                          item.products?.map((product,index)=>
                            <div key={index}>
                              <p className=''>{product.product.title}</p>
                              <span className='text-gray-400'>Amount {product.count} pcs. x {numberFormat(product.product.price)} ฿</span>
                            </div>
                          )
                        }
                    </td>
                    <td className='text-center'>{dateFormat(item.createdAt)}</td>
                    <td className='text-end pr-5'>{numberFormat(item.cartTotal)} ฿</td>
                    <td className='text-center'>
                      <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 border-gray-200 border-2 rounded-full`}>
                        {item.orderStatus}
                      </span>
                    </td>
                    <td className='text-center'>
                      <select 
                        value={item.orderStatus}
                        onChange={(e)=>handleChangeOrderStatus(token, item.id, e.target.value)}
                        className='rounded-sm'>
                        <option >Not Process</option>
                        <option >In Process</option>
                        <option >Completed</option>
                        <option >Cancle</option>
                      </select>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOrders