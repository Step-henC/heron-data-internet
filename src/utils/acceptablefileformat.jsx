export const ACCEPTABLE_FILE_FORMATS = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

export const BAD_RUNS_PLACEHOLDER =
  "Please make sure the EXACT names are provided. Copy and paste name for certainty. Format samples in same group in parenthesis, separated by commas. If single sample, place in parenthesis alone";

export const EXPECTED_FIELD_NAMES = [
  "Replicate",
  "Peptide",
  "Peptide Peak Found Ratio",
  "Peptide Retention Time",
  "Protein",
  "Quantification",
  "Ratio To Standard",
];

export const BAD_LIST_PATTERN =
  /^(?:[(][a-zA-Z0-9_-]+((,\s)?[a-zA-Z0-9_-])*[)]\s?)+$/g;

  export const EMAIL_PATTERN = /^\S+[@]\S+[.](com|edu|net|org)$/g;