const iniciarDatos = (dataPago) => {
  if (window.Data) {
    window.Data.init(dataPago);
  }
};

const reload = (data) => {
  if (window.Data) {
    window.Data.reload(data);
  }
};

export { iniciarDatos, reload };