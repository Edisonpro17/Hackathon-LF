let data = {
  /* ========== DATOS DEL COMERCIO ========== */
  // Email registrado en PagoPlux del comercio
  PayboxRemail: "jhanira1806@gmail.com",
  
  // Nombre del establecimiento en PagoPlux
  PayboxRename: "Mi Tienda",

  /* ========== DATOS DEL CLIENTE ========== */
  // Email del usuario que realiza el pago
  PayboxSendmail: "cliente@ejemplo.com",
  
  // Nombre del usuario que realiza el pago
  PayboxSendname: "Juan Pérez",
  
  // Dirección del tarjetahabiente
  PayboxDirection: "Av. Principal 123, Quito",
  
  // Teléfono del tarjetahabiente
  PayBoxClientPhone: "0987654321",
  
  // Identificación del tarjetahabiente (cédula ecuatoriana)
  PayBoxClientIdentification: "1234567890",

  /* ========== MONTOS ========== */
  // Monto sin impuestos (máximo 2 decimales)
  PayboxBase0: "0.00",
  
  // Monto con impuestos incluidos (máximo 2 decimales)
  PayboxBase12: "100.00",
  
  // Descripción del pago
  PayboxDescription: "Compra de productos en línea",

  /* ========== CONFIGURACIÓN DEL AMBIENTE ========== */
  // true = Producción (cobros reales), false = Pruebas
  PayboxProduction: false,
  
  // "sandbox" = Pruebas, "prod" = Producción
  PayboxEnvironment: "sandbox",
  
  // Idioma del Paybox ("es" para español)
  PayboxLanguage: "es",
  
  // Identifica el tipo de iframe de PagoPlux
  PayboxPagoPlux: true,

  /* ========== PAGOS RECURRENTES (Opcional) ========== */
  // true = pago recurrente, false = pago normal
  PayboxRecurrent: false,
  
  // ID o nombre del plan (solo si PayboxRecurrent es true)
  PayboxIdPlan: "",
  
  // true = cobros automáticos según frecuencia del plan
  PayboxPermitirCalendarizar: false,
  
  // true = débito inmediato, false = débito en fecha de corte
  PayboxPagoInmediato: false,
  
  // true = pago de prueba de $1 con reverso automático
  PayboxCobroPrueba: false,

  /* ========== CALLBACK DE RESPUESTA ========== */
  onAuthorize: (response) => {
    if (response.status === "succeeded") {
      console.log("✅ Pago exitoso:", response);
      
      // Aquí puedes extraer la información del pago
      const infoPago = {
        monto: response.amount,
        diferidos: response.deferred,
        tieneIntereses: response.interest,
        montoIntereses: response.interestValue,
        montoImpuestos: response.amountWoTaxes,
        tarjeta: response.cardInfo,
        marcaTarjeta: response.cardIssuer, // Ej: Visa, Mastercard
        tipoTarjeta: response.cardType, // Ej: Crédito, Débito
        identificacion: response.clientID,
        nombreCliente: response.clientName,
        fecha: response.fecha,
        idTransaccion: response.id_transaccion,
        estado: response.state,
        voucher: response.token,
        tipoPago: response.tipoPago
      };

      console.table(infoPago);
      
      alert(`¡Pago completado exitosamente!\nID Transacción: ${response.id_transaccion}`);
      
      // AQUÍ PUEDES AGREGAR TU LÓGICA:
      // - Guardar en base de datos
      // - Enviar a tu backend
      // - Actualizar el estado de React
      // - Redirigir a página de confirmación
      // Ejemplo:
      // fetch('/api/guardar-pago', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(infoPago)
      // });
    } else {
      console.error("❌ Error en el pago:", response);
      alert("Hubo un error al procesar el pago. Por favor intenta nuevamente.");
    }
  }
};

export { data };