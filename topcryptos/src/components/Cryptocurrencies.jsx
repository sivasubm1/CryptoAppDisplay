import React, {useState, useEffect} from 'react'
import millify from 'millify';
import {Link} from "react-router-dom";
import {Card , Col, Row, Input} from "antd";

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [crytos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        
        
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData);
   
    }, [cryptosList, searchTerm])

    if (isFetching) return "Loading...";
     
    return (
        <div>
            {!simplified && (
    <div className='seacrh-crypto'>
    <Input placeholder = "Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
 </div>
            )}
        
            <Row gutter={[32,32]} className='cryto-card-container'>
                 {
                     crytos?.map((currency) => (
                     <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                         <Link to={`/crypto/${currency.id}`}>
                          <Card title={`${currency.rank}.${currency.name}`} 
                          extra={<img className='crypto-image' src={currency.iconUrl}/>}
                          hoverable>

                              <p>Price: {millify(currency.price)}</p>
                              <p>Price: {millify(currency.marketCap)}</p>
                              <p>Price: {millify(currency.change)}%</p>

                          </Card>

                         </Link>
                     </Col>))
                 }
            </Row>
        </div>
    )
}

export default Cryptocurrencies;
