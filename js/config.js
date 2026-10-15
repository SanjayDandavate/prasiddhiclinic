/* =========================================================
   CLINIC DETAILS used by the Call, WhatsApp, Directions
   buttons and the map. Confirmed by the doctor (Oct 2026).
   If a detail changes, update it here AND in the HTML pages.
   ========================================================= */
window.CLINIC = {
  // Phone as shown to patients
  phoneDisplay: "+91 99208 22425",
  // Same number, international format, digits only
  phoneDigits: "919920822425",

  // WhatsApp number, digits only (same as phone)
  whatsappDigits: "919920822425",

  // Address (used for display)
  address: "Shop No. 204, Cornerstone, Yogidham, Kalyan (West)",

  // "Get directions" link. For an exact pin, open Google Maps on the clinic,
  // tap Share > Copy link, and paste it here instead.
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Cornerstone%2C+Yogidham%2C+Gauripada+Road%2C+Kalyan+West",

  // Map shown on the Clinic page. For an exact pin: Google Maps > Share >
  // Embed a map > copy only the src="..." value and paste it here.
  mapsEmbed: "https://maps.google.com/maps?q=Cornerstone%2C+Yogidham%2C+Gauripada+Road%2C+Kalyan+West&z=16&output=embed",

  // The website form was removed: patients contact by phone and WhatsApp.
  formMode: "none"
};
