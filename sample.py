import http.client

conn = http.client.HTTPSConnection("www.nseindia.com")
payload = ''
headers = {
  'authority': 'www.nseindia.com',
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
  'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36',
  'sec-ch-ua-platform': '"Windows"',
  'accept': '*/*',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY',
  'accept-language': 'en-US,en;q=0.9',
  'cookie': '_ga=GA1.2.152256297.1631170680; nsit=6Gx0ExXO_Byx8Bpc2rn_F5bb; AKA_A2=A; _gid=GA1.2.754609402.1632388932; _gat_UA-143761337-1=1; ak_bmsc=E90B50E5C6791E795B5286555EA7472F~000000000000000000000000000000~YAAQVjZ8aOGDNwZ8AQAAT2T2EQ30UJ4huAyDYNg/CaZCYlk25BOVkmG7tyz3EcsEs2A5CCuQNAMS/a1W5zQn0Zbw+HcDVUb4q5D1IdrT9M660W42U84ecplmJwIwOQI9GZwbkz8fDd9nlC/iOaDr+vYGoFFTwCeE52rAx2JB25w4nVjNiaM8frofk8HUd05i7E7W6X7YYaQhb69SEKnXiXzgiWvcFmK7SOIqrKONZyEshcdOpmj4/JNkJVWhZYX8+8qdZ7ansywM/Nnr84MORjN0FtZxF3V1fMAQ40TXp9MbZwLGmhD0ZS8Ykxln8Q37TZeiw+UUePhxVHL/6x76UDZ14PtqSEITZpwUR7xIpUGFDydyDe6v+W7U92ToXbjJslnpb3aZ8tYWRJCznNKjMoSBhobyBoOK+jbxmkkIs4W7siUZKixieMMXE0GtwbS1o+zFKkiHAnI19jbXIwkyc1tCClm9MxZqShV4sdgavR1+7liqYHeEvOLArLD35w==; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTYzMjM4ODk3NCwiZXhwIjoxNjMyMzkyNTc0fQ.YyMl_67RkkMgMCX34XiyQy6kvOv-vyiLFOwsqBmO9SY; RT="z=1&dm=nseindia.com&si=9528b9b1-1327-461a-a7a9-a2aacb3037fb&ss=ktwq803k&sl=2&tt=2bw&bcn=%2F%2F684d0d38.akstat.io%2F&nu=73e64fcfbc7d56d25ffa15b047e3cab2&cl=12xk"; bm_sv=6E74A495236FC44ECD6E745120A038A3~QdOKnvG0j+gLkcmAZHut3qPIBuM8mS56L8aN+erQpTq4gMvFxAUKTvTyjEk/+uJhs76HErnIjHxdKuJA11CJgERouSckvKNh7zES3kdoEtKVmT/d2gl9GqSGZk8JyshmTLq4dTl3+dAeC8EDiZ3ahmvcLankVjx9GtItAksmOR0='
}
conn.request("GET", "/api/option-chain-indices?symbol=NIFTY", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))