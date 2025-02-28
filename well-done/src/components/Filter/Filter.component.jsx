import React, {useState, useEffect} from 'react'
import {countries} from '../../data/countries'
import './Filter.styles.scss'
import Toggle from '../Toggle/Toggle.component'
import AxiosWithAuth from '../AxiosWithAuth/axiosWithAuth'

const Filter = props => {
    const [pumps, setPumps] = useState([])
    
    useEffect(() => {
        AxiosWithAuth()
            .get("https://welldone-db.herokuapp.com/api/pumps")
            .then(res => {
                // console.log(res)
                setPumps(res.data)
            })
    }, [ ])

    const handleChange = event => {
        console.log('handleChange in filter', event.target.value)
        if (event.target.value.length !== 0){
            let filtered = pumps.filter(pump => pump.country_name.toLowerCase().includes(event.target.value.toLowerCase()))
            props.setSearchFiltered(filtered)
        }
    }

    return (
        <div class="filter">
            <h4>Country</h4>
            <select name="countries" onChange={handleChange}> 
                {pumps.map(pump => 
                    (<option value={pump.country_name}>{pump.country_name}</option>)
                )} 
            </select>

            <h4>Status</h4>
            <div class="pump-type">
                <p>Functional</p>
                <Toggle/>
            </div>
            <div class="pump-type">
                <p>Unknown</p>
                <Toggle/>
            </div>
            <div class="pump-type">
                <p>Non-Functional</p>
                <Toggle/>
            </div>
        </div>
    )
}

export default Filter
