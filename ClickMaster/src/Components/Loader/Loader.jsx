import React,{ useState, useEffect } from 'react'

const Loader = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Hide the spinner after 3 seconds (or adjust the time as needed)
    }, 3000);
  }, []);
  return (
    <>
      {loading && (
        <div id="preloader">
		<div className="loader-rd"></div>
		<div className="loader-rd"></div>
		<div className="loader-rd"></div>
		<div className="loader-rd"></div>
    </div>
      )}
      {/* Rest of your component or webpage content */}
    </>
  )
}

export default Loader