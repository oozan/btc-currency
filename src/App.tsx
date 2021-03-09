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
  const { data, isLoading, error, refetch } = useQuery<Currencies>('btc-data', getBCData)

  console.log(data);

  if (isLoading) return <div>Loading ---</div>
  if (error) return <div>Some error have occured ---</div>
  return (
    <div className="App">
     Start
    </div>
  );
}

export default App;
