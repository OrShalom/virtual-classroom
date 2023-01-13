import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer,userRegisterReducer,userUpdateReducer} from "./reducers/userReducers";
import { patientsReporsReducer,patientsListReducer,patientStartScreenReducer,patientsCreateReducer,patientsUpdateReducer,patientDeleteReducer} from "./reducers/patientReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  patientList:patientsListReducer,
  patientCreate: patientsCreateReducer,
  patientUpdate: patientsUpdateReducer,
  patientDelete: patientDeleteReducer,
  startScreen: patientStartScreenReducer,
  patientReports:patientsReporsReducer,
  });
  const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const startSceen = localStorage.getItem("startSceen")
  ? JSON.parse(localStorage.getItem("startSceen"))
  : null;
  
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  startScreen:{success: startSceen}
  };
  
  const middleware = [thunk];
  
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;