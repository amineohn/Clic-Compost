export const form = {
  send: {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    collectTime: /^[0-9]{1,2}:[0-9]{2}$/,
    address: /^[a-zA-Z0-9\s,'-]{1,}$/,
    phone: /^[0-9]{10}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\s]{1,}$/,
    frequency: /^[0-9]{1,2}$/,
  },
};
