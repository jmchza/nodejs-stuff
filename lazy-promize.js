'use strict';

const fs = require('fs')
const Promise = require('lazy-promise')

let createEmployeePromises = path => {
          console.log(path)
          return new Promise((resolve, reject)=>{
                    fs.readdir(path, (err, files) => {
                              if(!files){
                                        reject(new Error('NO files provided'))
                              }
                              let output = files.reduce(function (output, employee) {
                                        output[employee] = {
                                                  name: employee,
                                                  getBoss: getManagerForEmployee(path, employee)
                                        }
                                        return output
                              }, {})
                              resolve(output)
                    })
          });
}


let getManagerForEmployee = (path, employee) =>{
          if(!employee){
                    return new Promise((resolve, reject) => {
                              resolve([])
                    })
          }
          return new Promise((resolve, reject) => {
                    console.log('-> Reading data', employee);
                    fs.readFile(path + '/' + employee, {encoding: 'utf-8'}, (err, data) => {
                              if(err){
                                        return reject(new Error('FailToREadFile'))
                              }
                              let boss = data.replace(/[^A-Za-z]/, '')
                              resolve(boss)
                    })
          })
}

let reportBoss = (employees, employee) => {
          return employees[employee].getBoss.then(boss => {
                    if(boss){
                              console.log(employees[employee].name, 'reports to ', boss)
                              return reportBoss(employees, boss)
                    }
                    return undefined
          })
}

createEmployeePromises(__dirname + '/data')
          .then(employees => {
                    console.log('Employee Data Readed ')
                    process.argv.slice(2).forEach(employee =>{
                              reportBoss(employees, employee)
                    })
          })