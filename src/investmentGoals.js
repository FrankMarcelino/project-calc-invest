function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1/12)
}


function generateReturnArrays(
  startingAmount = 0, 
  timeHorizon = 0 , 
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate  = 0,
  returnTimeFrame = "monthly"
) {

}