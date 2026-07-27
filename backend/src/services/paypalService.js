const paypal = require('@paypal/checkout-server-sdk');

function environment() {
  return process.env.PAYPAL_MODE === 'live'
    ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
    : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

async function createOrder(amount, description) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: amount },
      description: description
    }],
    application_context: {
      return_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`
    }
  });
  const response = await client().execute(request);
  return response.result;
}

async function captureOrder(orderId) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client().execute(request);
  return response.result;
}

module.exports = { createOrder, captureOrder };
