import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {

      const [services, setServices] = useState([]);
      const fetchServices = async () => {
        const res = await axios.get("http://localhost:8088/api/services");
        setServices(res.data);
      };
      useEffect(() => {
          fetchServices();
        }, []);
    
  return (
    <div id="services" className="section lb">
    <div className="container">
        <div className="section-title text-center">
            <h3>Services</h3>
            <p>Capture every moment with precision and creativity through our expert photography and editing solutions.</p>
        </div>

        <div className="row">
        {services.map((service, index) => (
            <div className="col-md-4" key={index}>
                <div className="effect-new">
                    <div className="services-inner-box">
                        <div style={{ width: '100px', height: '100px', margin: '0 110px' }}>
                            <img src={`http://localhost:8088/images/${service.image}`}
                    alt={service.name}/>
                        </div>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default Services