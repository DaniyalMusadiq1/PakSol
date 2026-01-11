import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import walletReducer from "./walletSlice";
import airdropReducer from "./airdropSlice";
import taskCategoryReducer from "./taskCategorySlice";
import tasksReducer from "./taskSlice"; // NEW
import mineReducer from "./miningSlice"; // NEW

const rootReducer = combineReducers({
  users: usersReducer,
  wallet: walletReducer,
  airdrop: airdropReducer,
  taskCategories: taskCategoryReducer,
  tasks: tasksReducer, 
  mining: mineReducer, 
});

export default rootReducer;
