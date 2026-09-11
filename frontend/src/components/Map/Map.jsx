import "./Map.css";

function Map() {
  return (
    <section className="map-section" id="map">
      <div className="map-container">
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4989465989006!2d77.56846927405113!3d13.003867314172115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17fc76df0253:0x2c1abba1d416217b!2sUniheal+Robust+Private+Limited!5e0!3m2!1sen!2sin!4v1764138731367!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="UniHeal Office Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Map;