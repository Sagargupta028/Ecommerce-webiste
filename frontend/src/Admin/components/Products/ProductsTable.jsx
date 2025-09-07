import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { dressPage1 } from "../../../Data/dress/page1";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct,findProducts } from "../../../State/Product/Action";
import { getCategoriesByLevel } from "../../../State/Category/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access products slice from Redux store\n  
  const customersProduct = useSelector((store) => store);
  const { categories } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // query 
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");


  console.log('Products State:', customersProduct.products);
  console.log('Current page from URL:', page);
  console.log('Products State:', customersProduct.products);
  console.log('Products content:', customersProduct.products?.content);
  
  useEffect(() => {
    dispatch(getCategoriesByLevel(3)); // Get third level categories for filtering
  }, [dispatch]);
  
  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category:category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000000,
      minDiscount: 0,
      sort: sort || "price_low",
      stock: availability || "",
      pageNumber: page-1 || 0,
      pageSize: 10,
    };
    console.log('Fetching all products with data:', data);
    dispatch(findProducts(data));
  }, [availability, category, sort, customersProduct.products.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleClearFilters = () => {
    setFilterValue({
      availability: "",
      category: "",
      sort: "",
    });
    // Clear all URL parameters
    navigate({ search: "" });
  };

  const handleDeleteProduct=(productId)=>{
    console.log("delete producttt ",productId)
    dispatch(deleteProduct(productId))
  }

  const handleEditProduct=(productId)=>{
    console.log("edit product ",productId)
    navigate(`/admin/product/edit/${productId}`)
  }

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                {categories.categoriesByLevel[3]?.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Heigh - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - Heigh</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="mt-3 flex justify-end">
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleClearFilters}
            sx={{ textTransform: 'none' }}
          >
            Clear All Filters
          </Button>
        </div>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Products"
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
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Size-wise Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Total Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.title} src={item.imageUrl} />{" "}
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
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.category?.name || 'N/A'}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>₹{item.discountedPrice}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {item.sizes && item.sizes.length > 0 ? (
                        item.sizes.map((size, index) => (
                          <Typography key={index} variant="body2" sx={{ fontSize: "0.75rem" }}>
                            <strong>{size.name}:</strong> {size.quantity || 0}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                          No sizes available
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
              
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>handleEditProduct(item._id)}>Edit</Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>handleDeleteProduct(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ProductsTable;
