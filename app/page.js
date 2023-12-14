"use client"; // This is a client component 👈🏽

import Image from 'next/image'
import { useState, Component, useEffect } from 'react'
import { Chart } from "chart.js";

export default function Home() {

  const [savings, setSavings] = useState(20000)
  const [monIncome, setMonIncome] = useState(1000)
  const [down, setDown] = useState(20)
  const [term, setTerm] = useState(30)
  const [interest, setInterest] = useState(10) // interest compounded monthely
  //const [propertyTaxes, setPropertyTaxes] = useState('') // interest compounded monthely
  const [houseCost, setHouseCost] = useState(100000) // interest compounded monthely
  const [compoundRate, setCompoundRate] = useState('month') // interest compounded monthely
  const [extraMon, setExtraMon] = useState(0) // interest compounded monthely
  const [pmtState, setPmtState] = useState(0) // interest compounded monthely
  const [pmtState2, setPmtState2] = useState(0) // interest compounded monthely
  const [prinState, setPrinState] = useState(0) // interest compounded monthely
  const [intState, setIntState] = useState(0) // interest compounded monthely
  const [indexState, setIndexState] = useState(0) // interest compounded monthely
 //const [loanType, setLoanType] = useState('adj')

 const [remainingArrState, setRemainingArrState] = useState([]) // interest compounded monthely
 const [princArrState, setPrincArrState] = useState([]) // interest compounded monthely
 const [intArrState, setIntArrState] = useState([]) // interest compounded monthely
 const [monrrState, setMonArrState] = useState([]) // interest compounded monthely
 const [monsubarrState, setMonSubArrState] = useState([]) // interest compounded monthely
 const [pmtArrState, setPmtArrState] = useState([]) // interest compounded monthely


  useEffect(() => {
    let found = false
    const remainingMort = mainCalc()[1]
    const princAmt = mainCalc()[2]
    const pmtAmt = mainCalc()[0]
    const intAmt = mainCalc()[3]
    const monAmt = mainCalc()[4]
    const monSubAmt = mainCalc()[5]
    const totalInt = mainCalc()[7]
    const totalPrin = mainCalc()[8]
    const totalPmt = mainCalc()[9]
   console.log(totalInt + "dd" + mainCalc()[7])
   setIntState(totalInt)
   setPrinState(totalPrin)
   setPmtState2(totalPmt)

   setRemainingArrState(remainingMort)
   setPrincArrState(princAmt)
   setPmtArrState(pmtAmt)
   setIntArrState(intAmt)
   setMonArrState(monAmt)
   setMonSubArrState(monSubAmt)

   for (let i = 0; i < remainingMort.length; i++){
    if (remainingMort[i] == 0 && found == false){
        setIndexState(i)
        found = true;
    }
   }
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from(Array(term*12).keys())        ,
        datasets: [{
          data: remainingMort,
          label: "Remaining Mortgage ($)", //how much principle aka money for the innitial loan is left to be payed off, excluding interest how much of the house is payed off
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }, {
          data: pmtAmt,
          label: "Amount of Money Already Payed (to Principle + Interest)",
          borderColor: "#ffa500",
          backgroundColor: "#ffc04d",
          fill: false,
        }, {
          data: monAmt,
          label: "Amount of Money Pre-subtraction (excluding others costs)",
          borderColor: "#c45850",
          backgroundColor: "#d78f89",
          fill: false,
        }, {
          data: monSubAmt,
          label: "Amount of Money Subtracted from Mortgage Costs (excluding others costs)",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        }
        ]
      },
    });

    var ctv = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctv, {
      type: 'line',
      data: {
        labels: Array.from(Array(term*12).keys())        ,
        datasets: [{
          data: princAmt,
          label: "Monthly Payment Going to Paying Principle", //how much principle aka money for the innitial loan is left to be payed off, excluding interest how much of the house is payed off
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }, {
          data: intAmt,
          label: "Monthly Payment Going to Paying Interest",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        }]
      },
    });

    var ctz = document.getElementById('myChart3').getContext('2d');
    var myChart3 = new Chart(ctz, {
        type: 'pie',
        data: {
            labels: ["Interest", "Principle"],
            datasets: [{
                data: [totalInt, totalPrin],
                borderColor: [
                    "#3cba9f",
                    "#ffa500",
                ],
                backgroundColor: [
                    "rgb(60,186,159,0.1)",
                    "rgb(255,165,0,0.1)",
                ],
                borderWidth: 2,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }],
            }
        },
    });

  }, [savings, down, monIncome, term, interest, houseCost, compoundRate, extraMon])





  function mainCalc(){
    let interestAnn = 12
    let mortgageLeft = []
    let princArray = []
    let interArray = []
    let pmtArray = []
    let savingsSubArray = []
    let totalPrin = 0
    let totalInt = 0
    let totalPmt = 0
    let savingsArray = [savings - ((houseCost*down)/100)]
    //console.log(savingsArray)
   // let savingsAmt = savings - ((houseCost*down)/100)
    

    if (compoundRate == 'month'){
      interestAnn = 12
    } else if (compoundRate == 'week'){
      interestAnn = 52
    } else if (compoundRate == 'biyear'){
      interestAnn = 2
    } else if (interestAnn == 'year'){
      interestAnn = 1
    }

    let mortgageSize = houseCost - ((houseCost*down)/100)
    let monthlyPrinc = mortgageSize/(term * 12)
    let PMT = (mortgageSize*(interest/100/interestAnn)) / (1 - Math.pow((1 + (interest/100/interestAnn)), -1 * (term * interestAnn)))
    console.log(PMT)
    pmtArray.push(PMT)
    setPmtState(PMT)
    let tempmortgageSize = mortgageSize
    for (let i = 0; i < (term * 12)-1; i++){
      let monthlyInt = tempmortgageSize*(interest/100)/12
      if (tempmortgageSize < 0){
        monthlyInt = 0;
      }
      let monthlyPrin = PMT - monthlyInt + parseInt(extraMon)
      tempmortgageSize = tempmortgageSize - monthlyPrin
    //  console.log("monthly principle payment: " + monthlyPrin + " - monthly interest payment: " + monthlyInt + " - amount of mortgage left: " +  tempmortgageSize)
      totalInt = totalInt + monthlyInt
      totalPrin = totalPrin + monthlyPrin
      totalPmt = totalPmt + PMT
      //console.log(totalPmt)
      setPmtState2(totalPmt)
 

    princArray.push(monthlyPrin)
      interArray.push(monthlyInt)
      savingsArray.push(savingsArray[savingsArray.length - 1] + parseInt(monIncome) - parseInt(extraMon)) //parseInt(extraMon)
     // console.log(savingsArray[i])
      savingsSubArray.push(savingsArray[i] - pmtArray[i])
      mortgageLeft.push(tempmortgageSize)
      if (tempmortgageSize < 0){
          pmtArray.push(pmtArray[pmtArray.length - 1])
          mortgageLeft[i] = 0
        } else {
          pmtArray.push(pmtArray[pmtArray.length - 1] + PMT + parseInt(extraMon)) //parseInt(extraMon)
      }

     

    }

    return ([pmtArray, mortgageLeft, princArray, interArray, savingsArray, savingsSubArray, extraMon, totalInt, totalPrin, totalPmt])
  }

  return (
   <div className='bg-white '>
   <main className=" flex h-full items-center justify-between p-5 bg-slate-900">
 
 <div className='w-3/12 h-full rounded-xl bg-gradient-to-b from-slate-200 to-slate-100 p-10 border-2 border-white border-opacity-50 text-gray-700 text-md'>
  <div>How much money do you currently have in savings? ($)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='100000'
                defaultValue={savings} onChange={event => setSavings(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>How much does the house cost? ($)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='200000'
                defaultValue={houseCost} onChange={event => setHouseCost(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>Whats your monthly income? ($)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='$5000'
                defaultValue={monIncome} onChange={event => setMonIncome(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>Whats your down payment? (%)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='20'
                defaultValue={down} onChange={event => setDown(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>How long is your mortgage term? (years)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='30'
                defaultValue={term} onChange={event => setTerm(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>Whats your fixed interest rate? (%)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='7.2'
                defaultValue={interest} onChange={event => setInterest(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
          <div>How often is your interest compounded?</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
         
              <select defaultValue={compoundRate} onChange={event => setCompoundRate(event.target.value)}  className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>
  <option value="week">Each Weak</option>
  <option value="month">Each Month</option>
  <option value="biyear">Twice a Year</option>
  <option value="year">Yearly</option>
</select>

            </div>
          </div>

          <div>How much extra money will you be paying each month? ($)</div>
  <div className='pb-5'>
           
            <div className="mt-2.5">
              <input
                placeholder='0'
                defaultValue={extraMon} onChange={event => setExtraMon(event.target.value)} 
                className=" text-md bg-slate-100 leading-6 text-gray-900 w-full rounded-md border-0 p-3   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>











          
          <button onClick={mainCalc} className=" text-md bg-indigo-600  text-white text-opacity-90 w-full rounded-md border-0 p-3  sm:text-sm ">Enter Data</button>

 </div>
 <div className='w-9/12 h-screen px-10 '>
 <div className='text-2xl font-semibold text-slate-300 -mt-24 pb-2'>Interactive Mortgage Payment Calculator</div>
 <div className='text-md  text-slate-400 pb-4'> <div>The following graph represents a couple of statistical values. The <span style={{color: '#3E95CD'}}>blue line</span> is how much mortgage you have remaining, which starts at the house cost minus the downpayment, and decreases as you make your mortgage payments. </div>
  <div>The <span style={{color: '#FFA503'}}>orange line</span> depicts how much money you have payed overall to both principle and interest. The <span style={{color: '#C45950'}}>red line</span> is the theoretical maximum amount of money you should have each month based on <b>savings + salary - down payment</b>. The amount of money you should have subtracted by the amount of money spent on house payments is the <span style={{color: '#3CBA9F'}}>teal line</span>, the remaining maximum money you would have after subtracting house payments. </div>
 <div className='font-bold bg-slate-800 p-5 my-5 text-slate-300'>You will pay off the loan by month {indexState}, rather than month {term*12} by paying ${extraMon} extra each month.</div>
 </div>

            <canvas id='myChart' className='pr-10 '></canvas>

            <div className='text-md  text-slate-400 pt-6 pb-4'> <div>This graph illistrates your payment delegation for the lenght of the term. The <span style={{color: '#3E95CD'}}>blue line</span> shows how much of your monthly payment of {pmtState} is going to paying off your principle (cost of house - down payment), and the <span style={{color: '#3CBA9F'}}>green line</span> is how much money is going to paying interest each month. Initially, the amount going to interest each month is much higher than the amount going to principle, but as the amount of money remaing, <b>the amount of money being multiplied by interst</b>, goes down, so does the cost of interest.</div>
            </div>

            <canvas id='myChart2' className='pr-10 pt-5'></canvas>
            <div className='mx-5 mt-10 p-5 mb-10 bg-white rounded-xl bg-opacity-10'>
              <div className='text-lg text-slate-300'>You will be paying <b>${Math.round(pmtState * 100) / 100}</b> a month for {term} years. Your interest is {Math.round((intState/prinState) * 100) / 100} times your principle.</div>
             <div className='flex w-full'>
              <div className='w-1/2'><canvas id='myChart3' className='w-full pr-10 pt-5'></canvas></div>
              <div className='w-1/2'>
              <div className='text-md  text-slate-400 pb-4'>Principle (Mortgage Size): <b>${Math.round(prinState * 100) / 100}</b></div>
              <div className='text-md  text-slate-400 pb-4'>Interest: <b>${Math.round(intState * 100) / 100}</b></div>
              <div className='text-md  text-slate-400 pb-4'>Total Mortgage Paid: <b>${Math.round(pmtState2 * 100) / 100}</b></div>
              </div>
             </div>
            </div>


   <div className='mx-5  p-5 mb-10 bg-white rounded-xl bg-opacity-10'>
   <div className='text-slate-300 text-sm items-center rounded-lg mb-2 w-full flex bg-white bg-opacity-10'>
          <div className='p-3 w-1/8'>Month</div>
          <div className='p-3 w-1/8'>Remaining Mortgage</div>
          <div className='p-3 w-1/8'>Interest</div>
          <div className='p-3 w-1/8'>Principle</div>
          <div className='p-3 w-1/8'>Money</div>
          <div className='p-3 w-1/8'>Money Minus Payments</div>
          <div className='p-3 w-1/8'>Mortgage Costs</div>
          <div className='p-3 w-1/8'>Base Payment</div>
        </div>
   {Array.from(Array(parseInt(term*12)).keys()).map(function(i) {
      return (
        <div key={i+"sdscd"} className='text-slate-300 border-b-2 border-white border-opacity-10 items-center text-sm w-full flex bg-white bg-opacity-5'>
          <div className='p-2 w-1/8'>{i}</div>
          <div className='p-2 w-1/8'>{Math.round(remainingArrState[i+3] * 100) / 100}</div>
          <div className='p-2 w-1/8'>{Math.round(intArrState[i+3] * 100) / 100}</div>
          <div className='p-2 w-1/8'>{Math.round(princArrState[i+3] * 100) / 100}</div>
          <div className='p-2 w-1/8'>{Math.round(monrrState[i+3] * 100) / 100 + savings}</div>
          <div className='p-2 w-1/8'>{Math.round(monsubarrState[i+3] * 100) / 100 + savings}</div>
          <div className='p-2 w-1/8'>{Math.round(pmtArrState[i+3] * 100) / 100}</div>
          <div className='p-2 w-1/8'>{Math.round(pmtState * 100) / 100}</div>
          <div className='p-2 w-1/8'>{extraMon}</div>
        </div>
      )
    })}
   </div>
 </div>

     
    </main> </div>
  )
}
