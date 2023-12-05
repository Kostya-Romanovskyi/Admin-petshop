import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import { OrderList } from "./components/OrderList/OrdersList";
// import { OrderForm } from "./components/wordList";
import EditOrder from "./components/EditOrder/EditOrder";

// const dataProvider = simpleRestProvider(
//   "https://vocabulary-back.onrender.com/api"
// );

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="orders" list={OrderList} edit={EditOrder} />
    {/* <Resource name="show" list={OrderList} /> */}
  </Admin>
);

export default App;
