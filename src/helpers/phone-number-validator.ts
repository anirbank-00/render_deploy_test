// Returns Boolean
export default function isValidPhoneNumber(phoneNumber: string): boolean {
  const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
  return indianPhoneNumberRegex.test(phoneNumber);
}
