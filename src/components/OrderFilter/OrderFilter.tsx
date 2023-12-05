import { Filter, SearchInput, TextInput } from "react-admin";

const OrderFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
    <TextInput label="Phone" source="phone" />
    <TextInput label="City" source="city" />
  </Filter>
);

export default OrderFilter;
