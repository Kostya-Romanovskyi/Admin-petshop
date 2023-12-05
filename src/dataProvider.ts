import { fetchUtils } from "react-admin";

const apiUrl = "https://pet-shop-36ob.onrender.com/api";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: async (
    resource: any,
    params: {
      pagination: { page: any; perPage: any };
      sort: { field: any; order: any };
      filter: any;
    }
  ) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    // Проверка наличия фильтра и его наличия значений
    const filterQuery =
      params.filter && Object.keys(params.filter).length
        ? `&filter=${JSON.stringify(params.filter)}`
        : "";

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      page: JSON.stringify(1),
      perPage: JSON.stringify(20),
    };

    console.log(query);
    console.log(params);

    const url = `${apiUrl}/${resource}?${new URLSearchParams(
      query
    )}${filterQuery}`;

    const response = await httpClient(url);
    console.log(response);

    const newData = {
      json: response.json.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })),
    };

    return {
      data: newData.json.reverse(),
      total: newData.json.totalPages,
    };
  },

  getOne: async (
    resource: any,
    params: {
      id: any;
    }
  ) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url);

    console.log(response);

    const updatedData = {
      ...response.json,
      id: response.json._id,
    };

    delete updatedData._id;

    return {
      data: updatedData,
    };
  },

  update: async (
    resource: any,
    params: {
      id: any;
      data: any;
    }
  ) => {
    const updateData = { ...params.data, _id: params.id };

    delete updateData.id;
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });

    return {
      data: {
        id: response.json._id,
        ...response.json,
      },
    };
  },

  delete: async (resource: any, params: any) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: "DELETE",
    });
    console.log(response);
    return response;
  },

  deleteMany: async (resource: any, params: any) => {
    const { ids } = params;
    console.log(ids);

    const url = `${apiUrl}/${resource}`;

    try {
      const response = await httpClient(url, {
        method: "DELETE",
        body: JSON.stringify({ orderIds: ids }),
      });

      console.log(response);

      return {
        data: response.json.fullResult.orderIds,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting records");
    }
  },
};

export default dataProvider;
