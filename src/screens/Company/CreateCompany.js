
import React from 'react'
import { url } from 'src/helpers/Helpers';
import { fetchContext } from '../../context/FetchContext'
import { userContext } from '../../context/UserContext'


export default function CreateCompany() {
    const { user } = React.useContext(userContext);
    console.log(user)
    const [companyName, setCompanyName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [countryId, setCountryId] = React.useState('');
    const [stateId, setStateId] = React.useState('');
    const [cityId, setCityId] = React.useState('');
    const [matchStates, setMatchStates] = React.useState([])
    const [matchCities, setMatchCities] = React.useState([])
    const [address, setAddress] = React.useState('')


    const { allCountries, getStates, getCities } = React.useContext(fetchContext)

    const setStatefunc = value => {
        setStateId(value)
        setMatchCities(getCities(value))
    }

    const setcountryfunc = (value) => {
        setCountryId(value);
        setMatchStates(getStates(value))
        setStateId('')
        setCityId('')
        setMatchCities([])
    }

    const handleSubmit = e => {
        e.preventDefault();
        async function submitCompany() {
            const formData = new FormData();
            formData.append('name', companyName)
            formData.append('mobile', mobile)
            formData.append('email', email)
            formData.append('country_id', countryId)
            formData.append('state_id', stateId)
            formData.append('city_id', cityId)
            formData.append('address', address)

            const response = await fetch(url + 'create/company', {
                method: 'POST',
                headers: {
                    'Authorization': user.token,
                },
                body: formData
            })

            if (response.ok == true) {
                const data = await response.json()
                console.log(data)
            }
        }
        submitCompany()
    }


    return (
        <section>

            <div className="container">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="">Company Name</label>
                                <input value={companyName} onChange={e => setCompanyName(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="">Mobile No.</label>
                                <input value={mobile} onChange={e => setMobile(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="">Country</label>
                            <select className='form-control' value={countryId} onChange={e => setcountryfunc(e.target.value)} >
                                <option>Select Country</option>
                                {allCountries?.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">State</label>
                            <select className='form-control' value={stateId} onChange={e => setStatefunc(e.target.value)}>
                                <option>Select States</option>
                                {matchStates?.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="">City</label>
                            <select className='form-control' value={cityId} onChange={e => setCityId(e.target.value)}>
                                <option>Select Cities</option>
                                {matchCities?.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            <label htmlFor="">Address</label>
                            <textarea value={address} onChange={e => setAddress(e.target.value)} className='form-control' cols="137" rows="10"></textarea>
                        </div>
                    </div>

                    <div className="row mt-4 big-btn-div">
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>


        </section>
    )
}