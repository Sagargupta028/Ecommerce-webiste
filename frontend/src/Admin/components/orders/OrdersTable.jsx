import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { dressPage1 } from "../../../Data/dress/page1";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../State/Admin/Orders/Action";
import { configure } from "@testing-library/react";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderStatus, setOrderStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {
    dispatch(getOrders({ jwt, status: formData.status, sort: formData.sort }));
  }, [jwt, adminOrder?.delivered, adminOrder?.shipped, adminOrder?.confirmed]);
  console.log('Admin Orders', adminOrder);
  console.log('Admin Orders Structure:', JSON.stringify(adminOrder, null, 2));
  

  // useEffect(()=>{
  //   dispatch(getOrders({jwt}))
  // },[])

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
    
    // Trigger API call with new filter
    dispatch(getOrders({ jwt, status: name === 'status' ? value : formData.status, sort: name === 'sort' ? value : formData.sort }));
  };
  const handleClearFilters = () => {
    setFormData({ status: "", sort: "" });
    dispatch(getOrders({ jwt, status: "", sort: "" }));
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED")
  };

  const handleShippedOrder = (orderId,index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId))
    setOrderStatus("ShIPPED")
  };

  const handleDeliveredOrder = (orderId,index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId))
    setOrderStatus("DELIVERED")
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };

  //   useEffect(()=>{
  // setUpdateOrderStatus(item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED")
  //   },[adminsOrder.orders])

  return (
    <Box>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.sort}
                label="Sort By"
                name="sort"
                onChange={handleChange}
              >
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClearFilters}
              sx={{ textTransform: 'none', height: '56px' }}
            >
              Clear All Filters
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
         
         
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Id</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders && Array.isArray(adminOrder.orders) ? adminOrder.orders.map((item, index) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell sx={{}}>
                  <AvatarGroup max={4} sx={{justifyContent: 'start'}}>
      {item.orderItems.map((orderItem)=><Avatar  alt={item.title} src={orderItem.product?.imageUrl} /> )}
    </AvatarGroup>
                    {" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item?.orderItems.map((order) => (
                          <span className=""> {order.product?.title},</span>
                        ))}
                      </Typography>
                      <Typography variant="caption">
                        {item?.orderItems.map((order) => (
                          <span className="opacity-60">
                            {" "}
                            {order.product?.brand},
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {item?.orderItems.map((order, idx) => (
                      <div key={idx}>{order.size || "N/A"}</div>
                    ))}
                  </TableCell>

                  <TableCell>
                    {item?.orderItems.map((order, idx) => (
                      <div key={idx}>{order.quantity || 0}</div>
                    ))}
                  </TableCell>

                  <TableCell>₹{item?.totalDiscountedPrice || item?.totalPrice || 0}</TableCell>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell className="text-white">
                    <Chip
                      sx={{
                        color: "white !important",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      label={item?.orderStatus}
                      size="small"
                      color={
                        item.orderStatus === "PLACED" ? "secondary" :
                        item.orderStatus === "CONFIRMED" ? "info" :
                        item.orderStatus === "SHIPPED" ? "warning" :
                        item.orderStatus === "DELIVERED" ? "success" :
                        item.orderStatus === "CANCELLED" ? "error" :
                        "default"
                      }
                      className="text-white"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    {/* <Button>{item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED"}</Button> */}
                    <div>
                      <Button
                        id={`basic-button-${item?._id}`}
                        aria-controls={`basic-menu-${item._id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item?._id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item._id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item?._id, index)}
                          disabled={item.orderStatus==="DELEVERED" || item.orderStatus==="SHIPPED" || item.orderStatus==="CONFIRMED"}
                        >
                          CONFIRMED ORDER
                          
                        </MenuItem>
                        <MenuItem
                        disabled={item.orderStatus==="DELIVERED" || item.orderStatus==="SHIPPED"}
                          onClick={() => handleShippedOrder(item._id, index)}
                        >
                          SHIPPED ORDER
                        </MenuItem>
                        <MenuItem onClick={() => handleDeliveredOrder(item._id)}>
                          DELIVERED ORDER
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDeleteOrder(item._id)}
                      variant="text"
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={9} sx={{ textAlign: "center", py: 4 }}>
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrdersTable;
