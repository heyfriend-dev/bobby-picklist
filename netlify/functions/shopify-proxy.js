exports.handler = async (event) => {
  const { storeUrl, token } = event.queryStringParameters;

  if (!storeUrl || !token) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing storeUrl or token' }) };
  }

  const url = `https://${storeUrl}/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&limit=250`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
