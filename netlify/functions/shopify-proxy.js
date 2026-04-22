exports.handler = async (event) => {
  const { storeUrl, token, createdAtMin, createdAtMax } = event.queryStringParameters;
  
  const url = `https://${storeUrl}/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&created_at_min=${createdAtMin}&created_at_max=${createdAtMax}&limit=250`;
  
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
