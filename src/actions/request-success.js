export const requestSuccess = (data) => { console.log(data);
  return { type: 'REQUESTED_SUCCEEDED', url: data[1].phone, users:data }
};
