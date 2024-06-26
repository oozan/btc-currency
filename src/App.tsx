import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Wrapper } from './styles/App.styles';

type BitcoinData = {
  '15m': number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
}

type Currencies = {
  [key: string]: BitcoinData;
}

const getBCData = async (): Promise<Currencies> => 
  await (await fetch('https://blockchain.info/ticker')).json();

const INTERVAL_TIME = 30000;

const App = () => {
  const [currency, setCurrency] = useState('EUR')
  const { data, isLoading, error, refetch } = useQuery<Currencies>('btc-data', getBCData)

  const handleCurrency = (e: any) => {
    setCurrency(e.currentTarget.value)
  }

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch])

  if (isLoading) return <div>Loading ---</div>
  if (error) return <div>Some error have occured ---</div>
  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrency}>
          {data && Object.keys(data).map(currency => (
            <option key={currency} value={currency}>
                {currency}
            </option>
          ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  );
}

export default App;
