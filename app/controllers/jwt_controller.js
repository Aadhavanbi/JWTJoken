const { MacModel } = require('../models')
const {logMsg} = require('../services/logger')
const secretKeyJwt = process.env.SECRETKEY;
const { info } = require('winston');
const moment = require('moment');



module.exports.addMacValue= async(req, res, next)=>{
    try {
        const today = moment().format('YYYY/MM/DD');
        const one_year = moment().add(1, 'year');
        const nextFiscalYearEndDate = one_year.format('YYYY/MM/DD');
        
        const mac =await MacModel.findOne({where:{licency_key:req.body.key}});
        console.log(mac);
        if (mac.dataValues.licency_key == req.body.key) {
            if (mac.dataValues.isActive == false) {
                
                const info={
                    licency_key:req.body.key,
                    mac_id: JSON.stringify(req.body.mac_id),
                    mail: req.body.mail,
                    company_name:req.body.company_name,
                    isActive:true,
                    activation_date:today,
                    expiry_date:nextFiscalYearEndDate,
                }
                const macUpdate = await MacModel.update(info, {where:{id: mac.dataValues.id}});
                if (macUpdate) {
                    logMsg.info({status:200,message:"Update Success!", data: info});
                    res.send({status:200,message:" Update Success!", data: info})
                }
            } else {

                const info={
                    licency_key:req.body.key,
                    mail: req.body.mail,
                    company_name:req.body.company_name,
                    activation_date:today,
                    expiry_date:nextFiscalYearEndDate,
                }
                logMsg.info({status:200,message:" Your Mac is Already Activated!", data: info});
                res.send({status:200,message:" Your Mac is Already Activated!", data: info});

                //     const macId = JSON.parse(mac.mac_id);
                //     var DBData= [];
                //     macId.forEach(function(macid) {
                //         DBData.push(macid.mac)
                //     });
                //     var BodyData = [];
                //     var BodyValue = req.body.mac_id;
                //     BodyValue.forEach(function(body) {
                //         BodyData.push(body.mac)
                //     });

                //     function hasCommonElement(arr1, arr2) {
                //         for (let element of arr1) {
                //             if (arr2.includes(element)) {
                //                 return true;
                //             }
                //         }
                //         return false;
                //     }

                //     const isMatch = hasCommonElement(DBData, BodyData);

                //     if (isMatch) {
                //         const info={
                //             licency_key:req.body.key,
                //             mail: req.body.mail,
                //             company_name:req.body.company_name,
                //             activation_date:today,
                //             expiry_date:nextFiscalYearEndDate,
                //         }
                //         logMsg.info({status:200,message:" Your Mac is Already Activated!", data: info});
                //         res.send({status:200,message:" Your Mac is Already Activated!", data: info});
                //     } else {
                //         logMsg.info({status:404,message:" Your Mac is Not Match!", data: "No Data!"});
                //         res.send({status:404,message:" Your Mac is Not Match!", data: "No Data!"});
                //    }
            }
        }else{
            logMsg.info({status:404,message:" Licency Key is No Match DB!", data: "No Data"});
            res.send({status:404,message:" Licency Key is No Match DB!", data: "No Data"})
        }
    } catch (error) {
        logMsg.info("addMacValue ->Internal Server Error!", error);
        console.error(error);
        res.status(404).send('addMacValue ->Internal Server Error!', error);    
    }
}
