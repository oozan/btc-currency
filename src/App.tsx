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


const App = () => {
  return (
    <div className="App">
     Start
    </div>
  );
}

export default App;
