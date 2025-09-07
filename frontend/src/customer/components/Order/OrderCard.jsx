import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ item, order }) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/account/order/${order?._id}`)} className='p-5 shadow-md shadow-gray hover:shadow-2xl border '>
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            <Grid item xs={6}>
                <div className='flex cursor-pointer'>
                    <img className='w-[5rem] h-[5rem] object-cover object-top' src={item?.product?.imageUrl || "https://via.placeholder.com/150"} alt={item?.product?.title || "Product"} />
                    <div className='ml-5 space-y-2'>
                        <p>{item?.product?.title || "Product Title"}</p>
                        <p className='opacity-50 text-xs font-semibold'>Size: {item?.size || "N/A"}</p>
                        <p className='opacity-50 text-xs font-semibold'>Color: {item?.product?.color || "N/A"}</p>
                    </div>
                </div>

            </Grid>
            <Grid item xs={2}>
                    <p>₹{item?.discountedPrice || item?.price || 0}</p>
            </Grid>
            <Grid item xs={4}>
                {order?.orderStatus === "DELIVERED" && <div> 
                    <p>
                    <AdjustIcon sx={{width:"15px", height:"15px"}} className='text-green-600 mr-2 text-sm'/>
                    <span>Delivered</span>
                    </p>
                    <p>
                        Your item has been Delivered
                    </p>
                    </div>
                }
                {order?.orderStatus !== "DELIVERED" && <p>
                    <span>Status: {order?.orderStatus || "PENDING"}</span>
                    </p>
                }
            </Grid>
        </Grid>
    </div>
  )
}

export default OrderCard
