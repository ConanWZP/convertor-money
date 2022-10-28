import React, {useEffect, useState} from 'react';
import './styles.scss'
import Block from './components/Block';
import axios from 'axios';

const App = () => {
    const [rates, setRates] = useState<any>({})

    const [fromCurrency, setFromCurrency] = useState('RUB')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState("")
    const [toPrice, setToPrice] = useState("")



    const getCurrencies = async () => {
        await axios.get('https://cdn.cur.su/api/latest.json')
            .then((res) => {
                setRates(res.data.rates)

                console.log(typeof res.data.rates)
        })
    }


    useEffect(() => {
        getCurrencies()
    }, [])

    const onChangeFromPrice = (value: string) => {
        const price = Number(value) / rates[fromCurrency]
        const conclusionPrice = price * rates[toCurrency]
        setToPrice(String(conclusionPrice))
        setFromPrice(value)
    }

    const onChangeToPrice = (value: string) => {
        const price = Number(value) / rates[toCurrency]
        const conclusionPrice = price * rates[fromCurrency]
        setFromPrice(String(conclusionPrice))
        setToPrice(value)
    }

    return (
        <div className="App">
          <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
          <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
        </div>
    );
};

export default App;