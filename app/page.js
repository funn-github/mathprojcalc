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
 //const [loanType, setLoanType] = useState('adj')


  useEffect(() => {
    const remainingMort = mainCalc()[1]
    const princAmt = mainCalc()[2]
    const pmtAmt = mainCalc()[0]
    const intAmt = mainCalc()[3]
    const monAmt = mainCalc()[4]
    const monSubAmt = mainCalc()[5]
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from(Array(term*12).keys())        ,
        datasets: [{
          data: remainingMort,
          label: "Remaming Mortgage ($)", //how much principle aka money for the innitial loan is left to be payed off, excluding interest how much of the house is payed off
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
            labels: ["Accepted", "Pending", "Rejected"],
            datasets: [{
                data: [70, 10, 6],
                borderColor: [
                    "#3cba9f",
                    "#ffa500",
                    "#c45850",
                ],
                backgroundColor: [
                    "rgb(60,186,159,0.1)",
                    "rgb(255,165,0,0.1)",
                    "rgb(196,88,80,0.1)",
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
    let savingsArray = [savings - ((houseCost*down)/100)]
    console.log(savingsArray)
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
    let tempmortgageSize = mortgageSize
    for (let i = 0; i < (term * 12)-1; i++){
      let monthlyInt = tempmortgageSize*(interest/100)/12
      let monthlyPrin = PMT - monthlyInt + parseInt(extraMon)
      tempmortgageSize = tempmortgageSize - monthlyPrin
    //  console.log("monthly principle payment: " + monthlyPrin + " - monthly interest payment: " + monthlyInt + " - amount of mortgage left: " +  tempmortgageSize)
 
    princArray.push(monthlyPrin)
      interArray.push(monthlyInt)
      pmtArray.push(pmtArray[pmtArray.length - 1] + PMT + parseInt(extraMon))
      savingsArray.push(savingsArray[savingsArray.length - 1] + parseInt(monIncome) - parseInt(extraMon))
      console.log(savingsArray[i])
      savingsSubArray.push(savingsArray[i] - pmtArray[i])
      mortgageLeft.push(tempmortgageSize)

     

    }

    return ([pmtArray, mortgageLeft, princArray, interArray, savingsArray, savingsSubArray, extraMon])
  }

  return (
   <div className='bg-white '>
   <main className=" flex h-full items-center justify-between p-5 bg-slate-900">
 
 <div className='w-1/3 h-full rounded-xl bg-gradient-to-b from-slate-200 to-slate-100 p-10 border-2 border-white border-opacity-50 text-gray-700 text-md'>
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











          
          <button onClick={mainCalc} className=" text-md bg-indigo-600  text-white text-opacity-90 w-full rounded-md border-0 p-3  sm:text-sm ">Enter Data</button>

 </div>
 <div className='w-2/3 h-screen px-10'>
 <div className='text-2xl font-semibold text-slate-200 pb-2'>Interactive Mortgage Payment Calculator</div>
 <div className='text-md  text-slate-300 pb-4'>The following graph represents a couple of statistical values. The <span style={{color: '#3E95CD'}}>blue line</span></div>
  
            <canvas id='myChart' className='pr-10 '></canvas>
            <canvas id='myChart2' className='pr-10 pt-5'></canvas>
            <canvas id='myChart3' className='pr-10 pt-5'></canvas>

 </div>

    
     
    </main> </div>
  )
}
