// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

import { getDashboardAnalytics } from '../../State/Analytics/Action'

const TotalEarning = () => {
  const dispatch = useDispatch();
  const { analytics } = useSelector(store => store);
  
  useEffect(() => {
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  const analyticsData = analytics.analytics;
  const categoryEarnings = analyticsData?.categoryEarnings || [];
  
  // Calculate total earnings
  const totalEarnings = categoryEarnings.reduce((sum, category) => sum + category.totalEarnings, 0);
  
  // Map category earnings to display data
  const data = categoryEarnings.map((category, index) => {
    const colors = ['primary', 'info', 'secondary', 'warning', 'success'];
    const images = [
      'https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/z/3/7/xl-r-dark-grey-stoneberg-original-imaghghn2vcf5euv.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/612/612/xif0q/dress/l/z/r/s-na-awd-23-yellow-aarvia-original-imagpbvvzpbzfhfz.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/612/612/xif0q/kids-dress/w/h/y/18-24-months-sleeveless-a-line-frock-yellow-kbkidswear-original-imagqcygqgg4zrka.jpeg?q=70'
    ];
    
    const progress = totalEarnings > 0 ? Math.round((category.totalEarnings / totalEarnings) * 100) : 0;
    
    return {
      progress: progress,
      imgHeight: 20,
      title: category._id || 'Unknown',
      color: colors[index % colors.length],
      amount: `₹${Math.round(category.totalEarnings).toLocaleString()}`,
      subtitle: 'Category Earnings',
      imgSrc: images[index % images.length]
    };
  });

  return (
    <Card>
      <CardHeader
        title='Total Earning'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            ₹{Math.round(totalEarnings).toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              {analyticsData?.revenueGrowth || 0}%
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          Compared to last month
        </Typography>

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <img width={item.imgHeight} src={item.imgSrc} alt={item.title} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <LinearProgress
                    color={item.color}
                    value={item.progress}
                    variant='determinate'
                    sx={{
                      height: 4,
                      borderRadius: '5px',
                      '& .MuiLinearProgress-dashed': { display: 'none' },
                      '& .MuiLinearProgress-bar': { borderRadius: '5px' }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
