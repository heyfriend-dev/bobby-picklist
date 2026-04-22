exports.handler = async (event) => {
  const { store, token, start, end } = event.queryStringParameters;
  
  const url = `https://${store}/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&created_at_min=${start}&created_at_max=${end}&limit=250`;
  
  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};
