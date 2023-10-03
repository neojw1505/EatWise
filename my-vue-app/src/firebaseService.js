// this file will contain methods to fetch data from firebase
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig'; // Import your Firebase configuration

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const baseURL = 'allSuperMarketsGroceries'

// Fetch all products with optional ascending sorting by price
export const fetchAllProducts = async (ascending = true) => {
  const path = `/${baseURL}`; // Set the path to the root
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const allProductsArray = [];

      // Iterate through the supermarkets and collect all products into one array
      for (const supermarketName in allProducts) {
        if (allProducts.hasOwnProperty(supermarketName)) {
          allProductsArray.push(...allProducts[supermarketName]);
        }
      }

      // Sort the products based on product_price in ascending or descending order
      allProductsArray.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace('$', ''));
        const priceB = parseFloat(b.product_price.replace('$', ''));
        const comparison = ascending ? priceA - priceB : priceB - priceA;
        return comparison;
      });

      return allProductsArray;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to fetch all products from a specific supermarket sorted by price (ascending or descending)
export const fetchProductsBySupermarket = async (supermarketName, ascending = true) => {
  const path = `${baseURL}/${supermarketName}`;
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let products = Object.values(snapshot.val());

      // Sort products by price
      products = products.sort((a, b) => {
        const priceA = parseFloat(a.product_price.match(/\$([\d.]+)/)[1]);
        const priceB = parseFloat(b.product_price.match(/\$([\d.]+)/)[1]);
        return ascending ? priceA - priceB : priceB - priceA;
      });

      return products;
    } else {
      console.log(`No data available for ${supermarketName}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to fetch products by product title with sorting by price
export const fetchProductsByTitle = async (title, ascending = true) => {
  const path = `/${baseURL}`;
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allSupermarkets = snapshot.val();
      const matchingProducts = [];

      for (const supermarketName in allSupermarkets) {
        if (allSupermarkets.hasOwnProperty(supermarketName)) {
          const products = allSupermarkets[supermarketName];
          for (const product of products) {
            if (product.product_title.toLowerCase().includes(title.toLowerCase())) {
              // Use a regular expression to extract the price in the format '$X.XX'
              const priceMatch = product.product_price.match(/\$([\d.]+)/);
              if (priceMatch) {
                const productPrice = parseFloat(priceMatch[1]);
                // Create a new object with the original data and an additional parsed_price field
                const productWithParsedPrice = { ...product, parsed_price: productPrice };
                matchingProducts.push(productWithParsedPrice);
              }
            }
          }
        }
      }

      // Sort matching products by parsed_price (price extracted from the format '$X.XX')
      matchingProducts.sort((a, b) => {
        return ascending ? a.parsed_price - b.parsed_price : b.parsed_price - a.parsed_price;
      });

      return matchingProducts;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to fetch products by product price with optional ascending sorting
export const fetchProductsByPrice = async (price, ascending = true) => {
  const path = `/${baseURL}`;
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const filteredProducts = [];

      for (const supermarketName in allProducts) {
        if (allProducts.hasOwnProperty(supermarketName)) {
          const products = allProducts[supermarketName];
          const matchingProducts = products.filter((product) => {
            // Parse the product price and user input price to numbers
            const productPrice = parseFloat(product.product_price.replace('$', ''));
            const userInputPrice = parseFloat(price);
            // Compare the parsed prices based on ascending or descending sorting
            return productPrice <= userInputPrice;
          });

          filteredProducts.push(...matchingProducts);
        }
      }

      // Sort the filtered products based on product_price in descending order
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace('$', ''));
        const priceB = parseFloat(b.product_price.replace('$', ''));
        return ascending ? priceA - priceB : priceB - priceA;
      });

      return filteredProducts;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to fetch products with promotions and optional sorting by price
export const fetchProductsByPromo = async (ascending = true) => {
  const path = `/${baseURL}`;
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const promotedProducts = [];

      for (const supermarketName in allProducts) {
        if (allProducts.hasOwnProperty(supermarketName)) {
          const products = allProducts[supermarketName];
          const matchingProducts = products.filter((product) =>
            product.product_promo && product.product_promo !== 'No promotion available'
          );

          promotedProducts.push(...matchingProducts);
        }
      }

      // Sort promoted products by price if specified
      if (ascending) {
        promotedProducts.sort((a, b) => {
          const priceA = parseFloat(a.product_price.match(/\$([\d.]+)/)[1]);
          const priceB = parseFloat(b.product_price.match(/\$([\d.]+)/)[1]);
          return priceA - priceB;
        });
      } else {
        promotedProducts.sort((a, b) => {
          const priceA = parseFloat(a.product_price.match(/\$([\d.]+)/)[1]);
          const priceB = parseFloat(b.product_price.match(/\$([\d.]+)/)[1]);
          return priceB - priceA;
        });
      }

      return promotedProducts;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Function to fetch products by title, price, and sorting order
export const fetchProductsByTitleAndPrice = async (title, maxPrice, ascending = true) => {
  const path = `/${baseURL}`; // Set the path to the root
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const matchingProducts = [];

      // Iterate through the supermarkets and filter products by title and price
      for (const supermarketName in allProducts) {
        if (allProducts.hasOwnProperty(supermarketName)) {
          const products = allProducts[supermarketName];

          const filteredProducts = products.filter((product) =>
            product.product_title.toLowerCase().includes(title.toLowerCase()) &&
            parseFloat(product.product_price.replace('$', '')) <= maxPrice
          );

          matchingProducts.push(...filteredProducts);
        }
      }

      // Sort the matching products based on sorting order
      matchingProducts.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace('$', ''));
        const priceB = parseFloat(b.product_price.replace('$', ''));
        const comparison = ascending ? priceA - priceB : priceB - priceA;
        return comparison;
      });

      return matchingProducts;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};