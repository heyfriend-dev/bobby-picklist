export async function onRequest(context) {
  const url = new URL(context.request.url);
  const storeUrl = url.searchParams.get('storeUrl');
  const token = url.searchParams.get('token');

  if (!storeUrl || !token) {
    return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 });
  }

  const shopifyUrl = `https://${storeUrl}/admin/api/2024-01/orders.json?status=open&fulfillment_status=unfulfilled&limit=250`;

  const res = await fetch(shopifyUrl, {
    headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' }
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
