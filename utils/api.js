module.exports.api = () => {
  let api = {
    state_wise: "https://api.covid19india.org/csv/latest/state_wise.csv",
    state_wise_daily:
      "https://api.covid19india.org/csv/latest/state_wise_daily.csv",
    districts: "https://api.covid19india.org/csv/latest/districts.csv",
    vaccine:
      "http://api.covid19india.org/csv/latest/vaccine_doses_statewise.csv",
    cowin_vaccine_data_statewise:
      "http://api.covid19india.org/csv/latest/cowin_vaccine_data_statewise.csv",
  };
  return api;
};
