// this file will contain methods to fetch data from firebase
import { getDatabase, ref, get, set, remove, update, runTransaction } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig"; // Import your Firebase configuration
import spoonacularObj from './api/spoonacular';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  deleteUser,
  updateEmail,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth();
export { auth };

export const createUser = async (
  email,
  password,
  displayName,
  age,
  profilePhotoURL,
  dob,
  gender,
  userWeight,
  userHeight,
  goals,
  activityLevel,
  ingredientRemove,
  DailyCalories,
  dietType
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Set the displayName for the user
    await updateProfile(user, {
      displayName: displayName,
      photoURL: profilePhotoURL,
    });

    console.log("Display name and profile photo set");

    // Create a user node in the Realtime Database under the "users" node
    const userRef = ref(database, "users/" + user.uid);
    set(userRef, {
      dob: dob,
      gender: gender,
      fullName: user.displayName,
      age: age,
      weight: userWeight,
      height: userHeight,
      goals: goals,
      activityLevel: activityLevel,
      profilePhoto: user.photoURL,
      email: user.email,
      isEmailVerified: user.emailVerified,
      ingredientRemove: ingredientRemove,
      DailyCalories:DailyCalories,
      dietType:dietType
    });

    console.log("User data stored in Realtime Database");
    // Send email verification
    sendEmailVerification(user)
      .then(() => {
        // Email verification sent successfully
        console.log("Email verification sent");
      })
      .catch((error) => {
        console.error("Email verification error:", error);
      });

    return userCredential.user; // Return the user object
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("User creation error:", errorCode, errorMessage);
    throw error;
  }
};

// This function will be called whenever the authentication state changes.
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in. You can access user properties here.
    if (user.emailVerified) {
      // Get the user's UID
      const userUid = user.uid;

      // Update the email verification status in the Realtime Database
      const userRef = ref(database, "users/" + userUid);
      update(userRef, { isEmailVerified: true });

      console.log("User is signed in and verified.");
      // You can also update your app's UI or perform other actions here.
    } else {
      console.log("User is signed in but email is not verified.");
      // Log out unverified users
      signOut(auth).then(() => {
        console.log("User logged out due to unverified email.");
      });
    }
  } else {
    // User is signed out.
    console.log("User is signed out.");
    // Handle UI changes for logged-out users if necessary.
  }
});

// sign in with email and password but check if user has verified, if not verified cannot login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // No need to check email verification here. onAuthStateChanged will handle it.
    return userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Login error:", errorCode, errorMessage);
    throw error;
  }
};

// Function to delete a user and their data
export const deleteAccount = async () => {
  try {
    // Delete the user from Firebase Authentication
    await deleteUser(auth.currentUser);

    // Delete the user's data from the Realtime Database
    const userRef = ref(database, "users/" + auth.uid);
    await remove(userRef);

    console.log("User and data deleted successfully.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("User deletion error:", errorCode, errorMessage);
    throw error;
  }
};

// get login user data from the users node using uid
export const getLoginUserProfile = async () => {
  try {
    if (auth.currentUser){
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const dataRef = ref(database, '/users/' + userUid);
      const snapshot = await get(dataRef);
      if (snapshot.exists()){
        console.log('Retrieved user data successfully');
        return snapshot.val();
      } else {
        console.log('User data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
  await signOut(auth);
}


export const updateUserProfile = async (
  userUID,
  newDisplayName,
  newProfilePhotoURL,
  newDOB,
  newGender,
  newWeight,
  newHeight,
  newGoal,
  activityLevel,
  ingredientRemove,
  dietType
) => {
  try {
    // Update the current user node in the Realtime Database
    const userRef = ref(database, "/users/" + userUID);
    await update(userRef, {
      dob: newDOB,
      gender: newGender,
      fullName: newDisplayName,
      weight: newWeight,
      height: newHeight,
      goals: newGoal,
      activityLevel: activityLevel,
      profilePhoto: newProfilePhotoURL,
      ingredientRemove:ingredientRemove,
      dietType:dietType
    });

    // Update the Authentication side data for the user
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
      photoURL: newProfilePhotoURL,
    });

    console.log("Profile successfully updated!");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Update profile error:", errorCode, errorMessage);
    throw error;
  }
};

export const updateUserPassword = async (currentPassword,newPassword) => {
  try {
    // Reauthenticate the user to confirm their identity
    const user = auth.currentUser;
    console.log();
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(auth.currentUser, credentials);

    // Update the password using auth.currentUser
    await updatePassword(auth.currentUser, newPassword);

    console.log("Password updated successfully.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Password update error:", errorCode, errorMessage);
    throw error;
  }
};

// Function to send a password reset email
export const passwordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Password reset email error:", errorCode, errorMessage);
    throw error;
  }
};
// Reference to the "users" node

// Remove the "users" node
// const usersRef = ref(database, "users");
// remove(usersRef)
//   .then(() => {
//     console.log("Users node removed successfully.");
//   })
//   .catch((error) => {
//     console.error("Error removing users node:", error);
//   });

// ##################################################################################################//

// ##### Breakfast ###### //
export const setBreakfastRecipeInFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/breakfast');
      const snapshot = await get(userRef);
      const breakfastRecipeObj = await spoonacularObj.getBreakfastRecipe();
      const breakfastRecipeNutrition = await spoonacularObj.getSelectedRecipeNutritions(
        breakfastRecipeObj[0].id
      );

      if (!snapshot.exists()) {
        // Create the path if it doesn't exist
        await set(userRef, {
          recipe: breakfastRecipeObj,
          nutrition: breakfastRecipeNutrition
        });

        console.log('created breakfast recipe successfully');
        
        const snapshot = await get(userRef)
        return snapshot.val();
      } else {
        // Update the data if the path exists
        await update(userRef, {
          recipe: breakfastRecipeObj,
          nutrition: breakfastRecipeNutrition
        });
        console.log('updated breakfast recipe successfully');
      }
      
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBreakfastRecipeFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/breakfast');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If the data exists, return it
        console.log('Retrieved breakfast recipe successfully');
        return snapshot.val();
      } else {
        // If the data doesn't exist, you may want to handle this case, e.g., set the breakfast recipe
        console.log('Breakfast recipe data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ##### Lunch ###### //
export const setLunchRecipeInFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/lunch');
      const snapshot = await get(userRef);
      const lunchRecipeObj = await spoonacularObj.getLunchRecipe();
      const lunchRecipeNutrition = await spoonacularObj.getSelectedRecipeNutritions(
        lunchRecipeObj[0].id
      );

      if (!snapshot.exists()) {
        // Create the path if it doesn't exist
        await set(userRef, {
          recipe: lunchRecipeObj,
          nutrition: lunchRecipeNutrition
        });
        console.log('created lunch recipe successfully');

        const snapshot = await get(userRef)
        return snapshot.val();
      } else {
        // Update the data if the path exists
        await update(userRef, {
          recipe: lunchRecipeObj,
          nutrition: lunchRecipeNutrition
        });
        console.log('updated lunch recipe successfully');
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
  }
};

export const getLunchRecipeFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/lunch');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If the data exists, return it
        console.log('Retrieved lunch recipe successfully');
        return snapshot.val();
      } else {
        // If the data doesn't exist, you may want to handle this case, e.g., set the lunch recipe
        console.log('lunch recipe data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// #### DINNER ######## //
export const setDinnerRecipeInFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/dinner');
      const snapshot = await get(userRef);
      const dinnerRecipeObj = await spoonacularObj.getDinnerRecipe();
      const dinnerRecipeNutrition = await spoonacularObj.getSelectedRecipeNutritions(
        dinnerRecipeObj[0].id
      );

      if (!snapshot.exists()) {
        // Create the path if it doesn't exist
        await set(userRef, {
          recipe: dinnerRecipeObj,
          nutrition: dinnerRecipeNutrition
        });
        console.log('created dinner recipe successfully');
        const snapshot = await get(userRef)
        return snapshot.val();
      } else {
        // Update the data if the path exists
        await update(userRef, {
          recipe: dinnerRecipeObj,
          nutrition: dinnerRecipeNutrition
        });
        console.log('updated dinner recipe successfully');
      }

      return snapshot.val();
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
  }
};

export const getDinnerRecipeFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/mealplan/dinner');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If the data exists, return it
        console.log('Retrieved dinner recipe successfully');
        return snapshot.val();
      } else {
        // If the data doesn't exist, you may want to handle this case, e.g., set the dinner recipe
        console.log('dinner recipe data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// #### Recipe of the Day ####### // 
export const setRecipeOfDayInFB = async () => {
  try {
    if (auth.currentUser){
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/recipeOfDay');
      const snapshot = await get(userRef);
      const RecipeOfDayObj = await spoonacularObj.getRandomRecipe()
     
      if (!snapshot.exists()){
        await set(userRef, {
          recipes: RecipeOfDayObj,
        });
        console.log('updated recipe of day recipe successfully');
        
        const snapshot = await get(userRef)
        return snapshot.val();

      } else {
        await update(userRef, {
          recipes: RecipeOfDayObj,
        })
        console.log("updated recipe of day");
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
  }
}

export const getRecipeOfDayFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/recipeOfDay');
      const snapshot = await get(userRef);

      return snapshot.val()
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ###### Random Food Joke ############## //
export const setRandomFoodJokeInFB = async () => {
  try {
    if (auth.currentUser){
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/randomFoodJoke');
      const snapshot = await get(userRef);
      const RandomFoodJokeObj = await spoonacularObj.getRandomFoodJoke()

      if (!snapshot.exists()){
        await set(userRef, {
          joke: RandomFoodJokeObj,
        });
        console.log('updated RandomFoodJokeObj successfully');
        const snapshot = await get(userRef);
        return snapshot.val();
      } else {
        await update(userRef, {
          joke: RandomFoodJokeObj,
        });
      } 
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
  }
}

export const getRandomFoodJokeFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/randomFoodJoke');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If the data exists, return it
        console.log('Retrieved randomFoodJoke successfully');
        return snapshot.val();
      } else {
        // If the data doesn't exist, you may want to handle this case, e.g., set the dinner recipe
        console.log('randomFoodJoke data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ###### Random Food Fact ############## //
export const setRandomFoodFactInFB = async () => {
  try {
    if (auth.currentUser){
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/randomFoodFact');
      const snapshot = await get(userRef);
      const RandomFoodFactObj = await spoonacularObj.getRandomFoodFact()

      if (!snapshot.exists()){
        console.log('updated RandomFoodFactObj successfully');
        await set(userRef, {
          Fact: RandomFoodFactObj,
        });
        const snapshot = await get(userRef);
        return snapshot.val();
      } else {
        await update(userRef, {
          Fact: RandomFoodFactObj,
        });
        console.log('updated fact successfully');
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
  }
}

export const getRandomFoodFactFromFB = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/randomFoodFact');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If the data exists, return it
        console.log('Retrieved randomFoodFact successfully');
        return snapshot.val();
      } else {
        // If the data doesn't exist, you may want to handle this case, e.g., set the dinner recipe
        console.log('randomFoodFact data not found.');
        return null; // Return null if data doesn't exist
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ####### Saved Recipes ######## //
export const addSavedRecipesInFB = async (recipeId, newSavedRecipe, nutritionData) => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID
      const userRef = ref(database, '/users/' + userUid + '/savedRecipes');

      await runTransaction(userRef, (currentData) => {
        if (!currentData) {
          currentData = {};
        }
        // Modify the currentData with your updates
        currentData[recipeId] = newSavedRecipe;
        currentData[recipeId]['nutrition'] = nutritionData;
        return currentData; // Return the updated data
      });

      console.log('Added savedRecipes successfully');
    } else {
      console.log('User is not authenticated.');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const removeSavedRecipeInFB = async (recipeId) => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/savedRecipes');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const savedRecipes = snapshot.val();

        // Check if the recipeId exists in the savedRecipes object
        if (savedRecipes.hasOwnProperty(recipeId)) {
          // Remove the specific recipeId from savedRecipes
          delete savedRecipes[recipeId];

          // Update the data in Firebase with the updated savedRecipes
          await set(userRef, savedRecipes);

          console.log('Recipe removed from savedRecipes successfully');
        } else {
          console.log('Recipe not found in savedRecipes.');
        }
      } else {
        console.log('User has no saved recipes.');
      }
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isRecipeAlreadyBookmarked = async (recipeId) => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/savedRecipes');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const savedRecipes = snapshot.val();
        
        // Check if the recipeId is a key in the savedRecipes object
        const isBookmarked = savedRecipes.hasOwnProperty(recipeId);

        return isBookmarked;
      } else {
        console.log('recipeId not bookmarked.');
        return false; // Return false if there are no saved recipes
      }
    } else {
      console.log('User is not authenticated.');
      return false; // Return false if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getUserSavedRecipes = async () => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID

      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/savedRecipes');
      const snapshot = await get(userRef);
      if (snapshot.exists()) { 
        return snapshot.val()
      } else {
        await set(userRef, {})
        return {}
      }
    }
  } catch (error){
    console.log(error);
    throw error
  }
}

export const addIngredientToExclude = async (ingredient) => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID
      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/ingredientRemove');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If ingredientRemove exists, retrieve its current value
        let currentIngredientRemove = snapshot.val();
        
        // Check if it's an array and not already containing the ingredient
        if (Array.isArray(currentIngredientRemove) && !currentIngredientRemove.includes(ingredient)) {
          currentIngredientRemove.push(ingredient);
          
          // Update the ingredientRemove key with the updated list
          await set(userRef, currentIngredientRemove);
          const snapshot = await get(userRef)
          return snapshot.val()
        }
        return snapshot.val()
      } else {
        // If ingredientRemove doesn't exist, create a new array with the ingredient
        await set(userRef, [ingredient]);
        const snapshot =  await get(userRef)
        return snapshot.val()
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const removeIngredientFromExclude = async (ingredient) => {
  try {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid; // Get the user's UID
      // Form a reference to the user's data in the database
      const userRef = ref(database, '/users/' + userUid + '/ingredientRemove');
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // If ingredientRemove exists, retrieve its current value
        let currentIngredientRemove = snapshot.val();

        // Check if it's an array and if it contains the ingredient
        if (Array.isArray(currentIngredientRemove) && currentIngredientRemove.includes(ingredient)) {
          // Remove the ingredient from the list
          currentIngredientRemove = currentIngredientRemove.filter(item => item !== ingredient);

          // Update the ingredientRemove key with the updated list
          await set(userRef, currentIngredientRemove);
          const updatedSnapshot = await get(userRef);
          return updatedSnapshot.val();
        }
      }
      return snapshot.val(); // Return the existing list (unchanged)
    } else {
      console.log('User is not authenticated.');
      return null; // Return null if the user is not authenticated
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// ######################################################################################## //
const baseURL = "allSuperMarketsGroceries";

export const fetchProducts = async (
  searchQuery = "",
  minPrice = 0,
  maxPrice = Number.POSITIVE_INFINITY,
  onPromotion = false,
  ascending = true,
  supermarketNames = []
) => {
  const path = `/${baseURL}`;
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const matchingProducts = [];

      for (const superName in allProducts) {
        if (
          allProducts.hasOwnProperty(superName) &&
          (supermarketNames.length === 0 ||
            supermarketNames.includes(superName))
        ) {
          const products = allProducts[superName];

          const filteredProducts = products.filter((product) => {
            const productTitle = product.product_title.toLowerCase();
            const productPrice = parseFloat(
              product.product_price.replace("$", "")
            );
            const productPromotion =
              product.product_promo &&
              product.product_promo !== "No promotion available";

            return (
              (productTitle.includes(searchQuery.toLowerCase()) ||
                searchQuery === "") &&
              productPrice >= minPrice &&
              productPrice <= maxPrice &&
              (!onPromotion || (onPromotion && productPromotion))
            );
          });

          matchingProducts.push(...filteredProducts);
        }
      }

      matchingProducts.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace("$", ""));
        const priceB = parseFloat(b.product_price.replace("$", ""));
        const comparison = ascending ? priceA - priceB : priceB - priceA;
        return comparison;
      });

      return matchingProducts;
    } else {
      console.log("No data available");
      return matchingProducts;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

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
        const priceA = parseFloat(a.product_price.replace("$", ""));
        const priceB = parseFloat(b.product_price.replace("$", ""));
        const comparison = ascending ? priceA - priceB : priceB - priceA;
        return comparison;
      });

      return allProductsArray;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to fetch all products from a specific supermarket sorted by price (ascending or descending)
export const fetchProductsBySupermarket = async (
  supermarketName,
  ascending = true
) => {
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
    console.error("Error fetching data:", error);
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
            if (
              product.product_title.toLowerCase().includes(title.toLowerCase())
            ) {
              // Use a regular expression to extract the price in the format '$X.XX'
              const priceMatch = product.product_price.match(/\$([\d.]+)/);
              if (priceMatch) {
                const productPrice = parseFloat(priceMatch[1]);
                // Create a new object with the original data and an additional parsed_price field
                const productWithParsedPrice = {
                  ...product,
                  parsed_price: productPrice,
                };
                matchingProducts.push(productWithParsedPrice);
              }
            }
          }
        }
      }

      // Sort matching products by parsed_price (price extracted from the format '$X.XX')
      matchingProducts.sort((a, b) => {
        return ascending
          ? a.parsed_price - b.parsed_price
          : b.parsed_price - a.parsed_price;
      });

      return matchingProducts;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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
            const productPrice = parseFloat(
              product.product_price.replace("$", "")
            );
            const userInputPrice = parseFloat(price);
            // Compare the parsed prices based on ascending or descending sorting
            return productPrice <= userInputPrice;
          });

          filteredProducts.push(...matchingProducts);
        }
      }

      // Sort the filtered products based on product_price in descending order
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace("$", ""));
        const priceB = parseFloat(b.product_price.replace("$", ""));
        return ascending ? priceA - priceB : priceB - priceA;
      });

      return filteredProducts;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to fetch products by title, price, and sorting order
export const fetchProductsByTitleAndPrice = async (
  title,
  maxPrice,
  ascending = true
) => {
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

          const filteredProducts = products.filter(
            (product) =>
              product.product_title
                .toLowerCase()
                .includes(title.toLowerCase()) &&
              parseFloat(product.product_price.replace("$", "")) <= maxPrice
          );

          matchingProducts.push(...filteredProducts);
        }
      }

      // Sort the matching products based on sorting order
      matchingProducts.sort((a, b) => {
        const priceA = parseFloat(a.product_price.replace("$", ""));
        const priceB = parseFloat(b.product_price.replace("$", ""));
        const comparison = ascending ? priceA - priceB : priceB - priceA;
        return comparison;
      });

      return matchingProducts;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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
          const matchingProducts = products.filter(
            (product) =>
              product.product_promo &&
              product.product_promo !== "No promotion available"
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
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchProductsByPromoAndSupermarket = async (
  supermarketName = "",
  ascending = true
) => {
  try {
    const path = `/${baseURL}`;
    const dataRef = ref(database, path);

    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const allProducts = snapshot.val();
      const promotedProducts = [];

      for (const superName in allProducts) {
        if (allProducts.hasOwnProperty(superName)) {
          const products = allProducts[superName];
          const matchingProducts = products.filter(
            (product) =>
              product.product_promo &&
              product.product_promo !== "No promotion available" &&
              (supermarketName === "" || supermarketName === superName)
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
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
