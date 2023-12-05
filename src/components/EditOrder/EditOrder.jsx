import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  ListBase,
} from "react-admin";

import "./EditOrder.css";

const paymentMethod = [
  { id: "Передоплата", name: "Передоплата" },
  { id: "Післяоплата", name: "Післяоплата" },
];

const ballColor = [
  { id: "Зелений", name: "Зелений" },
  { id: "Рожевий", name: "Рожевий" },
];

const EditOrder = (props) => (
  <Edit {...props}>
    <ListBase>
      <SimpleForm>
        <div className="form-container">
          <TextInput source="name" multiline />
          <TextInput source="phone" />
          <TextInput source="city" />
          <TextInput source="department" />
          <SelectInput source="paymentMethod" choices={paymentMethod} />
          <SelectInput source="ballColor" choices={ballColor} />
          <TextInput source="moreInfo" multiline />
          <BooleanInput source="status" />
          {/* <DateInput source="updatedAt" /> */}
        </div>
      </SimpleForm>
    </ListBase>
  </Edit>
);

export default EditOrder;
