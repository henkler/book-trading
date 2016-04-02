// https://schema.org/PostalAddress
export const AddressSchema = new SimpleSchema({
  addressCountry: {
    type: String,
    max: 30
  },
  addressLocality: {
    type: String,
    max: 30
  },
  addressRegion: {
    type: String,
    max: 30
  },
  postalCode: {
    type: String,
    max: 10
  },
  streetAddress: {
    type: String,
    max: 100
  }
});

export const AddressTemplate = {
  addressCountry: '',
  addressLocality: '',
  addressRegion: '',
  postalCode: '',
  streetAddress: ''
};
