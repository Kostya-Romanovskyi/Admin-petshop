import {
  useRecordContext,
  Datagrid,
  DateField,
  List,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
import OrderFilter from "../OrderFilter/OrderFilter";
import "./OrderList.css";

export const OrderList = () => (
  <List filters={<OrderFilter />}>
    <Datagrid optimized rowClick="edit" expand={<PostPanel />}>
      <TextField source="name" />
      <TextField source="phone" />
      <TextField source="city" />

      <TextField source="paymentMethod" />
      <TextField source="ballColor" />

      <DateField source="createdAt" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const PostPanel = () => {
  const record = useRecordContext();

  return (
    <>
      <p>
        <span className="text"> id:</span> {record.id}
      </p>
      <p>
        <span className="text"> Відділення:</span> {record.department}
      </p>
      <p>
        <span className="text">Додаткова інформація:</span> {record.moreInfo}
      </p>
      <p>Коли оновлено: {record.updatedAt}</p>
      <p>
        <span className="text">Коли оновлено: </span>
        {<DateField source="updatedAt" />}
      </p>
    </>
  );
};
