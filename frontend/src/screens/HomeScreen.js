import { Heading, Grid, IconButton, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMessage } from "react-icons/fa6";

import { listProducts } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Chatwindow from "../components/Chatwindow";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [chatOpen, setChatOpen] = useState(false);
 

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleChatIconClick = () => {
    console.log("Chat icon clicked");
    setChatOpen(!chatOpen);
  }

  return (
    <>
      <Heading as="h2" mb="8" fontSize="3xl">
        Latest Products
      </Heading>

      {loading ? (
        <p><Loader /></p>
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          }}
          gap="8"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}

      {/* Chat window */}
      <Box position="fixed" bottom="20px" right="20px" zIndex="1000">
        <IconButton
          icon={<FaMessage />}
          colorScheme="teal"
          isRound
          size="lg"
          onClick={handleChatIconClick}
        />
      </Box>
      <Chatwindow isOpen={chatOpen} onClose={() => setChatOpen(false)}  />
    </>
  );
};

export default HomeScreen;
