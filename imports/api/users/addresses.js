import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// https://schema.org/PostalAddress
export const AddressSchema = new SimpleSchema({
  streetAddress: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 30
  },
  state: {
    type: String,
    max: 30
  },
  zipCode: {
    type: String,
    max: 10
  }
});

export const AddressTemplate = {
  streetAddress: '',
  city: '',
  state: '',
  zipCode: ''
};
