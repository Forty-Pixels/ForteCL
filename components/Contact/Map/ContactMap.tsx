'use client';

export default function ContactMap() {
    const address = "Forte Clinical Laboratory, Al Garhoud Business Centre, Dubai";
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_API_KEY&q=${encodeURIComponent(address)}`;

    // Exact embed URL provided by the user to ensure the marker is visible
    const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.5725705685054!2d55.33663677538361!3d25.25131757767615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dc493f1e96b%3A0x1f7cf27e212b52f1!2sForte%20Clinical%20Laboratory!5e0!3m2!1sen!2slk!4v1772875819624!5m2!1sen!2slk";

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
            {/* Google Map Iframe */}
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Forte Clinical Laboratory Location"
                className="grayscale-[20%] contrast-[1.1]"
            ></iframe>
        </section>
    );
}
