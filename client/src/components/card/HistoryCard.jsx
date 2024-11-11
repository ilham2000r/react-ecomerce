import React,{ useState, useEffect} from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../util/Number'
import { dateFormat } from '../../util/DateFormat'


const HistoryCard = () => {
    const token = useEcomStore((state)=>state.token)
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        handleGetOrder(token)
    },[])

    const handleGetOrder = (token)=>{
        getOrders(token)
        .then((res)=>{
            console.log('response',res);
            setOrders(res.data.orders)
        })
        .catch((err)=>{
            console.log('err',err);
            
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
    <div  className='space-y-4'>
        <h1 className='text-xl font-bold'>Ordered List</h1>
        {/* Table cover */}
        <div  className='space-y-4'>
            {/* Card */}
            {
                orders?.map((item,index)=>{
                    // console.log(item);
                    
                    return (
                        <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                            {/* Header */}
                            <div className='flex justify-between'>
                                {/* left */}
                                <div>
                                    <p className='text-sm'>Order Date</p>
                                    <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                </div>
                                {/* right */}
                                <div>
                                    <span className={`${getStatusColor(item.orderStatus)} rounded-full px-2 py-1`}>
                                        {item.orderStatus}
                                    </span>
                                    
                                </div>
                            </div>
                            {/* Table */}
                            <div>
                                <table className="table-auto border w-full">
                                    <thead>
                                        <tr className='bg-gray-200'>
                                        <th>PRODUCT</th>
                                        <th>PRICE</th>
                                        <th>QTY.</th>
                                        <th>TATAL</th>
                                        </tr>
                                    </thead>
                                    {
                                        item.products?.map((product,index)=>{
                                            console.log(product);
                                            
                                            return (
                                                <tbody>
                                                    <tr>
                                                    <td>{product.product.title}</td>
                                                    <td>{numberFormat(product.product.price)}</td>
                                                    <td>{product.count}</td>
                                                    <td>{numberFormat(product.count*product.product.price)}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                            {/* Footer */}
                            <div>
                                <div className='text-right'>
                                    <p>
                                        Net Price
                                    </p>
                                    <p>
                                        {numberFormat(item.cartTotal)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    </div>
  )
}

export default HistoryCard