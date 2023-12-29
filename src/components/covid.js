import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './covid.css';

const Covid = () => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    getCovidData();
  }, []);

  const getCovidData = async () => {
    try {
      const res = await fetch('https://data.covid19india.org/data.json');
      const actualData = await res.json();
      setData(actualData.statewise[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      recovered: data.recovered || '',
    },
    onSubmit: (values) => {
      // Handle form submission, you can make an API call here
      setData({ ...data, recovered: values.recovered });
    },
  });

  return (
    <>
      <section className='covid-container'>
        <h1 className='header'>LIVE</h1>
        <h2 className='sub-header'>Coronavirus Tracker</h2>

        <ul className='card-container'>
          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Our Country</p>
              <p className='card-total card-small'>INDIA</p>
            </div>
          </li>

          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Total Recovered</p>
              <p className='card-total card-small'>{data.recovered}</p>
            </div>
          </li>

          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Total Confirmed</p>
              <p className='card-total card-small'>{data.confirmed}</p>
            </div>
          </li>

          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Total Deaths</p>
              <p className='card-total card-small'>{data.deaths}</p>
            </div>
          </li>

          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Total Active</p>
              <p className='card-total card-small'>{data.active}</p>
            </div>
          </li>

          <li className='card'>
            <div className='card-inner'>
              <p className='card-name'>Last Updated</p>
              <p className='card-total card-small'>{data.lastupdatedtime}</p>
            </div>
          </li>
        </ul>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="recoveredInput">Update Recovered Cases:</label>
          <input
            id="recoveredInput"
            name="recovered"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recovered}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
};

export default Covid;
