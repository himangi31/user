import React, { useEffect } from "react";
import {AppBar,Toolbar,Button,Typography,Container,Grid,Card,CardContent,CardMedia, Box, List, ListItem,ListItemIcon,ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import { Paper } from "@mui/material";
import { Verified, FlashOn, Security, ThumbUp } from "@mui/icons-material";
import AOS from "aos";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import "aos/dist/aos.css";

const Homescreen = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
    const navigate = useNavigate();
 
const reasons = [
  {
    icon: <Verified fontSize="large" color="primary" />,
    title: "Trusted Brand",
    desc: "Recognized for delivering quality and reliable energy solutions worldwide.",
  },
  {
    icon: <FlashOn fontSize="large" color="primary" />,
    title: "Cutting-Edge Technology",
    desc: "We integrate the latest innovations to maximize performance and efficiency.",
  },
  {
    icon: <Security fontSize="large" color="primary" />,
    title: "Reliable & Secure",
    desc: "All our systems are designed with safety, durability, and reliability in mind.",
  },
  {
    icon: <ThumbUp fontSize="large" color="primary" />,
    title: "Customer Satisfaction",
    desc: "Our top priority is ensuring customer happiness and long-term relationships.",
  },
];


  return (
      <>
     <Box
     
  sx={{
    backgroundColor: "#000",  // ✅ पूरे app का default background black
    minHeight: "10vh",
  }}
>
  <Navbar />
  {/* बाकी content */}


      {/* Hero Section */}
      <Box
  sx={{
    position: "relative",
      minHeight: "70vh",  // ✅ Full screen height
    width: "100%", 
    backgroundImage:
      "url('https://www.rightpowerups.com.my/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-01-at-17.49.35.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  
    color: "white",
    py: 15,
    textAlign: "center",
  }}
>
  {/* Overlay only on top of image */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      bgcolor: "rgba(0,0,0,0.5)", // 👈 dark overlay
      zIndex: 3,
    }}
  />

  {/* Content on top of overlay */}
  <Container sx={{ position: "relative", zIndex: 5 }}>
    <Typography
      variant="subtitle1"
      sx={{
        backgroundColor: "success.main",
        display: "inline-block",
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
      data-aos="fade-down"
    >
    Sustainability is not an option, it is our Responsibility
    </Typography>

    <Typography
      variant="h3"
      fontWeight="bold"
      gutterBottom
      data-aos="fade-up"
      sx={{ mt: 3 }}
    >
      Smart Power. Smart Solutions.
    </Typography>

    <Typography
      variant="h6"
      data-aos="fade-up"
      data-aos-delay="200"
      sx={{ maxWidth: "800px", margin: "0 auto" }}
    >
    From Modular UPS to Lithium-Ion BESS, Solar, and Smart Racks — 
    delivering innovative power solutions for businesses, data centers, and industries worldwide..
    </Typography>
      {/* Quick Stats */}
    <Box
      display="flex"
      justifyContent="center"
      gap={4}
      mt={4}
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">2M+</Typography>
        <Typography variant="body2">Satisfied Customers</Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">3500+</Typography>
        <Typography variant="body2">Partners Globally</Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">5M+</Typography>
        <Typography variant="body2">Installations</Typography>
      </Box>
    </Box>
    <Box mt={3}>
      <Button
        variant="contained"
        color="success"
        sx={{ mr: 2 }}
        data-aos="zoom-in"
          onClick={() => navigate("/productview")} // Navigate on click
      >
        Explore Products
      </Button>
      <Button
        variant="outlined"
        color="inherit"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        Learn About Us
      </Button>
    </Box>
  </Container>
</Box>

</Box>
      {/* Solutions Section */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h3"
          align="center"
          color="success.main"
          fontWeight="medium"
          gutterBottom
          data-aos="fade-up"
        >
         Our Products & Solutions
        </Typography>
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          gutterBottom
          data-aos="fade-up"
        >
          Powering businesses with reliable, scalable, and sustainable energy solutions.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              title: "Data Center Solutions",
              text: "Complete range of smart power, cooling, and monitoring solutions for reliable and energy-efficient data centers..",
              btn: "Explore More",
              icon: <BusinessIcon sx={{ color: "success.main" }} />,
              img: "https://www.shutterstock.com/image-photo/data-centers-filled-rows-servers-600nw-2502153963.jpg"
               , path: "/datacenter",
            },
            {
              title: "Power Solutions",
              text: ". Advanced UPS power solutions with DSP technology, 3-level IGBT design, high efficiency, wide input range, and modular scalability up to 8MW..",
              btn: "Explore More",
              icon: <DirectionsCarIcon sx={{ color: "success.main" }} />,
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-rDaQbklXNKKNNHSa9BluFVy6evjdiYyhQ&s"
            },
            {
              title: "Drivers & Personal Use",
              text: "We provide reliable and affordable home and public charging solutions for EV drivers everywhere.",
              btn: "Explore More",
              icon: <PersonIcon sx={{ color: "success.main" }} />,
              img: "https://media.istockphoto.com/id/521106845/photo/sustainable-energy-concept.jpg?s=612x612&w=0&k=20&c=nud9e2tkX2JhLb1kKhQmEani-sv6cM5RQ8WBN9KS6hs="
            }
          ].map((item, i) => (
            <Grid
              item
              xs={12}
              md={4}
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  maxWidth: 360,
                  mx: "auto"
                }}
              >
                {/* Top Image */}
                <CardMedia
                  component="img"
                  image={item.img}
                  alt={item.title}
                  sx={{
                    height: 200,
                    objectFit: "cover"
                  }}
                />

                <CardContent
                  sx={{
                    textAlign: "center",
                    position: "relative",
                    pt: 6 // extra padding to make space for floating icon
                  }}
                >
                  {/* Floating Green Icon */}
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "16px",
                      backgroundColor: "#e6f4ea",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      position: "absolute",
                      top: -30, // overlap effect
                      left: 0,
                      right: 0,
                      boxShadow: 2
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ minHeight: 60 }}
                  >
                    {item.text}
                  </Typography>
                  <Button variant="contained" color="success"  onClick={() => navigate(item.path)}>
                    {item.btn}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

<Box sx={{ mt: 4 }} /> {/* yeh gap banayega */}
      
    {/* Stats Grid */}
    <Grid container spacing={4} justifyContent="center">
      {[
        { number: "2M+", label: "Satisfied Customers" },
        { number: "3500+", label: "Partners Globally" },
        { number: "5M+", label: "Installation Base" },
      
        { number: "25+", label: "Years of Expertise" }
      ].map((stat, i) => (
        <Grid item xs={6} sm={4} md={2} key={i}>
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 3,
              bgcolor: "grey.50",
              boxShadow: 2,
              height: "100%"
            }}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
          >
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {stat.number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
<Box sx={{ mt: 8 }} /> {/* yeh gap banayega */}

<Box sx={{ py: 10, bgcolor: "grey.50" }}>
  <Container>
    {/* Heading */}
    <Typography
      variant="h4"
      fontWeight="bold"
      align="center"
      gutterBottom
      data-aos="fade-up"
    >
      Industries We Serve
    </Typography>
    <Typography
      variant="h6"
      align="center"
      color="text.secondary"
      sx={{ mb: 6 }}
      data-aos="fade-up"
      data-aos-delay="200"
    >
      Powering businesses across diverse industries with reliable and sustainable solutions.
    </Typography>

    {/* Industry Grid */}
    <Grid container spacing={4}>
      {[
        { title: "Data Centers", img: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png" },
        { title: "Renewable Energy", img: "https://cdn-icons-png.flaticon.com/512/2907/2907484.png" },
        { title: "Telecom", img: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png" },
        { title: "Manufacturing", img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" },
        { title: "Oil & Gas", img: "https://cdn-icons-png.flaticon.com/512/1047/1047636.png" },
        { title: "Electric Vehicles", img: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png" },
      ].map((industry, i) => (
        <Grid item xs={12} sm={6} md={2} key={i}>  {/* 🔥 sab width fix */}
          <Box
            sx={{
                
              textAlign: "center",
              p: 3,
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: 2,
              height: "100%",       // 🔥 sab equal height
              minHeight: 130,
              minWidth:100,       // optional fix height
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
          >
            <img
              src={industry.img}
              alt={industry.title}
              style={{ width: 60, height: 60, marginBottom: "12px" }}
            />
            <Typography variant="body1" fontWeight="bold">
              {industry.title}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

<Container maxWidth="xl" sx={{ mt: 4 }}>
  {/* Header Section */}
  <Typography
    variant="h3"
    color="success.main"
    data-aos="fade-down"
  sx={{ fontWeight: "bold", mb: 4 }}
  >
    Our Global Presence
  </Typography>

  {/* Main Hero Section */}
  <Grid container spacing={4}>
    {/* Left Content */}
    <Grid item xs={12} md={7}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: "bold", mb: 4 }}
        data-aos="fade-right"
      >
        Delivering innovative power & energy solutions trusted worldwide.
      </Typography>

      {/* Image and Stats Card Section */}
      <Box sx={{ width: "60%", position: "relative", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {/* Left Image */}
          <Grid item xs={12}>
            <Box
              component="img"
              src="https://www.lbspower.com/hubfs/Blog/ingeniero-en-centro-de-datos.jpg" 
              alt="Power Solutions"
              sx={{
                width: "100%",
                borderRadius: "15px",
                height: "100%",
                objectFit: "cover",
              }}
              data-aos="fade-up"
            />
          </Grid>
        </Grid>

        {/* Stats Card Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            backgroundColor: "success.main",
            color: "white",
            p: 3,
            borderRadius: "15px",
            width: "220px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
          data-aos="fade-up"
          data-aos-delay="400"
        >
             <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            2M+
          </Typography>
          <Typography variant="body1">Satisfied Customers</Typography>
            <Typography variant="body1">5 Million+ Installation base</Typography>
               <Typography variant="body1">    3500+ Global Partners</Typography> 
        </Box>
      </Box>
    </Grid>

    {/* Right CTA Section */}
    <Grid item xs={12} md={5}>
      <Box
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        data-aos="fade-left"
      >
        <Typography variant="body1">
          We serve diverse industries worldwide — Data Centers, Telecom, Renewable Energy, Oil & Gas, and more. 
          Our mission is to deliver reliable, efficient, and sustainable power solutions.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          From UPS systems to Li-ion Batteries, Modular Energy Storage, Smart Racks, and complete Data Center Infrastructure — 
          we power the world’s most critical operations.
        </Typography>

        {/* Features List */}
        <List sx={{ mt: 3 }}>
          <ListItem data-aos="fade-left" data-aos-delay="300">
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="UPS range from 600VA to 8MW" />
          </ListItem>
          <ListItem data-aos="fade-left" data-aos-delay="400">
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="Lithium-ion & Modular Energy Storage Solutions" />
          </ListItem>
          <ListItem data-aos="fade-left" data-aos-delay="500">
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="24/7 Global Service & Support Network" />
          </ListItem>
        </List>

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 , alignItems:"center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
            }}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Explore Products ➡️
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "black", color: "black" }}
            data-aos="fade-up"
            data-aos-delay="700"
          >
            About Us
          </Button>
        </Box>
      </Box>
    </Grid>
  </Grid>
</Container>
<Box sx={{ mt: 8 }} /> {/* yeh gap banayega */}
{/* Global Power Solutions Section */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: { xs: 3, md: 10 },
    py: { xs: 6, md: 10 },
    background: "linear-gradient(135deg, #0c0f0a 0%, #1b1f1a 100%)",
    color: "#fff",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
  }}
>
  {/* Left Images */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flexShrink: 0,
    }}
    data-aos="fade-right"
  >
    <Box
      component="img"
      src="https://bpee.com//upload/product/11082023053720mfp.webp"
      alt="Modular UPS"
      sx={{
        width: { xs: "100%", md: "280px" },
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      }}
    />
    <Box
      component="img"
      src="https://bpee.com//upload/product/05102023023647bpi.webp"
      alt="Battery & Smart Racks"
      sx={{
        width: { xs: "100%", md: "280px" },
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      }}
    />
  </Box>

  {/* Right Text */}
  <Box sx={{ maxWidth: "600px" }} data-aos="fade-left">
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 3,
        lineHeight: 1.4,
      }}
    >
      Sustainability is Not an Option, It Is Our Responsibility
    </Typography>
    <Typography
      variant="body1"
      sx={{
        mb: 3,
        lineHeight: 1.8,
        color: "#ccc",
      }}
    >
      We provide customized power solutions including Modular UPS, Li-ion Batteries, Smart Racks, ESS/BESS, Isolation Transformers, IoT, and Solar. Serving over 2 million satisfied customers with 3500+ partners globally and 5 million installations.
    </Typography>

    <List sx={{ color: "#ddd", mb: 3 }}>
      {[
        "✔ UPS Range from 600VA to 8MW",
        "✔ Smart Rack & IDU Solutions",
        "✔ Lithium-Ion Battery Compatible",
        "✔ High Efficiency up to 97%",
        "✔ Modular & Scalable BESS",
      ].map((point, i) => (
        <ListItem key={i} sx={{ py: 0 }}>
          <ListItemText primary={point} />
        </ListItem>
      ))}
    </List>

    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        color="success"
        sx={{
          borderRadius: "30px",
          px: 3,
          py: 1.2,
          fontSize: "16px",
        }}
      >
        Explore Products
      </Button>
      <Button
        variant="outlined"
        color="success"
        sx={{
          borderRadius: "30px",
          px: 3,
          py: 1.2,
          fontSize: "16px",
          borderWidth: "2px",
        }}
      >
        Contact Sales
      </Button>
    </Box>
  </Box>
</Box>











 <Container sx={{ py: 10, textAlign: "center" }}>
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Why Choose Us
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={6}>
        We stand out from the competition with unmatched expertise and dedication.
      </Typography>

      {/* Reasons Grid */}
      <Grid container spacing={4}>
        {reasons.map((reason, index) => (
          <Grid item xs={8} sm={4} md={3} key={index} data-aos="zoom-in" data-aos-delay={index * 200}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "auto",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                },
              }}
            >
              {reason.icon}
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {reason.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {reason.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>




{/* Events Section */}
<Container sx={{ py: 9 }}>
  <Typography
    variant="h3"
    align="center"
    color="success.main"
    fontWeight="medium"
    gutterBottom
    data-aos="fade-up"
  >
    Our Events
  </Typography>

  <Typography
    variant="h6"
    align="center"
    fontWeight="bold"
    gutterBottom
    data-aos="fade-up"
  >
    Stay Updated with Our Latest Events & Webinars
  </Typography>

  <Grid container spacing={4} sx={{ mt: 4 }}>
    {[
      {
        title: "Annual Tech Expo 2025",
        date: "August 25, 2025",
        location: "New York, USA",
        img: "https://media.assettype.com/digitalterminal%2F2025-07-25%2Fh17ob1h8%2FBPE-DT-3-1.jpg",
      },
      {
        title: "Smart Energy Webinar",
        date: "September 10, 2025",
        location: "Online Event",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Uut77S3E7LSoaR1VYR1mqToflu-VqA5Itw&s",
      },
      {
        title: "Green Energy Summit",
        date: "October 5, 2025",
        location: "London, UK",
        img: "https://www.hopwood.ac.uk/wp-content/smush-webp/2025/03/Web-Banners-2022_GREEN-SUMMIT.jpg.webp",
      },
    ].map((event, i) => (
      <Grid item xs={12} md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" , }}>
          <CardMedia
            component="img"
            image={event.img}
            alt={event.title}
            sx={{  width: 360,       // fixed width
    height: 250, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date} | {event.location}
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>










{/* Footer Section */}
<Box
  sx={{
    backgroundColor: "#111",
    color: "#ccc",
    mt: 8,
    py: { xs: 6, md: 10 },
    px: { xs: 3, md: 10 },
  }}
>
  <Grid container spacing={6}>
    {/* Brand Info */}
    <Grid item xs={12} md={4}>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="success.main"
        gutterBottom
      >
        Best Power Equipments
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Driving the future of power with smart and scalable power solutions
      </Typography>
      <Typography variant="body2">
        © {new Date().getFullYear()} BPE. All Rights Reserved.
      </Typography>
    </Grid>

    {/* Quick Links */}
    <Grid item xs={12} md={2}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="white"
        gutterBottom
      >
        Quick Links
      </Typography>
      <List sx={{ p: 0 }}>
        {["Home", "Company", "Charging Solutions", "Industries"].map(
          (link, i) => (
            <ListItem
              key={i}
              sx={{ py: 0.5, px: 0, cursor: "pointer" }}
            >
              <ListItemText
                primary={link}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { color: "#ccc" },
                }}
              />
            </ListItem>
          )
        )}
      </List>
    </Grid>

    {/* Resources */}
    <Grid item xs={12} md={3}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="white"
        gutterBottom
      >
        Resources
      </Typography>
      <List sx={{ p: 0 }}>
        {["Blog", "FAQs", "Support", "Contact Us"].map((item, i) => (
          <ListItem
            key={i}
            sx={{ py: 0.5, px: 0, cursor: "pointer" }}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: "body2",
                sx: { color: "#ccc" },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Grid>

    {/* Newsletter Signup */}
    <Grid item xs={12} md={3}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="white"
        gutterBottom
      >
        Stay Updated
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Subscribe to our newsletter and get the latest updates on EV
        charging solutions.
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />
        <Button variant="contained" color="success">
          Subscribe
        </Button>
      </Box>
    </Grid>
  </Grid>
</Box>

    </>
  );
};

export default Homescreen;
