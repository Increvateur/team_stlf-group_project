/**
 * Created by JFCS on 5/4/16.
 */
myApp.factory("DonorRetentionService", ["$http", function($http) {

    var data = {};
    var forceresponse  = {};
    var forceData = {};
    var arrResults = [];
    var arrSql = [];
    var sqlIndex = 0;
    var strSql = "";


    // TODO for each strSql, make an object, with label: label, and soql: strSql



    var selEndDate = new Date("12-31-2015");

    var ytdStart = new Date();
    var ytdEnd = new Date();
    var ytdM1Start = new Date();
    var ytdM1End = new Date();
    var ytdM2Start = new Date();
    var ytdM2End = new Date();
    var ytdM3Start = new Date();
    var ytdM3End = new Date();
    var ytdM4Start = new Date();
    var ytdM4End = new Date();
    var fyM1Start = new Date();
    var fyM1End = new Date();
    var fyM2Start = new Date();
    var fyM2End = new Date();
    var fyM3Start = new Date();
    var fyM3End = new Date();
    var fyM4Start = new Date();
    var fyM4End = new Date();

    var fyM5End = new Date();

    var myKey = "";




    ytdEnd = new Date(selEndDate);


    // ytd start - figure out fiscal year start previous to this date
    ytdStart =  new Date("09/01/" + selEndDate.getFullYear());



    if (ytdStart > ytdEnd){
        ytdStart = new Date("09/01/" + (selEndDate.getFullYear()-1));
    }



    ytdM1Start = new Date(ytdStart);
    ytdM1Start.add({"years":-1});

    ytdM2Start = new Date(ytdStart);
    ytdM2Start.add({"years":-2});

    ytdM3Start = new Date(ytdStart);
    ytdM3Start.add({"years":-3});

    ytdM4Start = new Date(ytdStart);
    ytdM4Start.add({"years":-4});


    ytdM1End = new Date(ytdEnd);
    ytdM1End.add({"years":-1});

    ytdM2End = new Date(ytdEnd);
    ytdM2End.add({"years":-2});

    ytdM3End = new Date(ytdEnd);
    ytdM3End.add({"years":-3});

    ytdM4End = new Date(ytdEnd);
    ytdM4End.add({"years":-4});





    //fiscal year start and end, first full fiscal year before end date

    fyM1End = new Date("08/31/" + selEndDate.getFullYear());

    if (fyM1End > selEndDate){
        fyM1End = new Date("08/31/" + (selEndDate.getFullYear()-1));

    }
    // one year PRIOR
    fyM2End = new Date(fyM1End);
    fyM2End.add({"years":-1});
    fyM3End = new Date(fyM1End);
    fyM3End.add({"years":-2});
    fyM4End = new Date(fyM1End);
    fyM4End.add({"years":-3});
    fyM5End = new Date(fyM1End);
    fyM5End.add({"years":-4});

    fyM1Start = new Date(ytdM1Start);
    fyM2Start = new Date(ytdM2Start);
    fyM3Start = new Date(ytdM3Start);
    fyM4Start = new Date(ytdM4Start);

    selEndDate = selEndDate.toFormat("YYYY-MM-DD");
    ytdStart = ytdStart.toFormat("YYYY-MM-DD");
    ytdEnd = ytdEnd.toFormat("YYYY-MM-DD");
    ytdM1Start = ytdM1Start.toFormat("YYYY-MM-DD");
    ytdM1End = ytdM1End.toFormat("YYYY-MM-DD");
    ytdM2Start = ytdM2Start.toFormat("YYYY-MM-DD");
    ytdM2End = ytdM2End.toFormat("YYYY-MM-DD");

    ytdM3Start = ytdM3Start.toFormat("YYYY-MM-DD");
    ytdM3End = ytdM3End.toFormat("YYYY-MM-DD");

    ytdM4Start = ytdM4Start.toFormat("YYYY-MM-DD");
    ytdM4End = ytdM4End.toFormat("YYYY-MM-DD");

    fyM1Start = fyM1Start.toFormat("YYYY-MM-DD");
    fyM1End = fyM1End.toFormat("YYYY-MM-DD");
    fyM2Start = fyM2Start.toFormat("YYYY-MM-DD");
    fyM2End = fyM2End.toFormat("YYYY-MM-DD");
    fyM3Start = fyM3Start.toFormat("YYYY-MM-DD");
    fyM3End = fyM3End.toFormat("YYYY-MM-DD");
    fyM4Start = fyM4Start.toFormat("YYYY-MM-DD");
    fyM4End = fyM4End.toFormat("YYYY-MM-DD");

    fyM5End = fyM5End.toFormat("YYYY-MM-DD");






    // first time donors ytd
    myKey = "c1";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MIN(CloseDate) >= " + ytdStart + " AND MIN(CloseDate) <= " + ytdEnd ;

    sqlObj = {key: myKey, query:"first time donors  YTD SELECTED", sql: strSql};

    arrSql.push(sqlObj);

    // first time donors ytd-1
    myKey = "c2";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MIN(CloseDate) >= " + ytdM1Start + " AND MIN(CloseDate) <= " + ytdM1End ;

    sqlObj = {key: myKey, query:"first time donors  YTD SELECTED -1", sql: strSql};

    arrSql.push(sqlObj);

    // first time donors ytd-2
    myKey = "c3";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MIN(CloseDate) >= " + ytdM2Start + " AND MIN(CloseDate) <= " + ytdM2End ;

    sqlObj = {key: myKey, query:"first time donors  YTD SELECTED -2", sql: strSql};

    arrSql.push(sqlObj);

    // first time donors first fy
    myKey = "c4";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MIN(CloseDate) >= " + fyM1Start + " AND MIN(CloseDate) <= " + fyM1End ;

    sqlObj = {key: myKey, query:"first time donors  First FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // first time donors second fy
    myKey = "c5";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MIN(CloseDate) >= " + fyM2Start + " AND MIN(CloseDate) <= " + fyM2End ;

    sqlObj = {key: myKey, query:"first time donors  Second FY before selected", sql: strSql};

    arrSql.push(sqlObj);



    // TODO current retained donors. They donated this fiscal year and either of the previous two.

    // current retained YTD
    // donated ytd and within fym2 start and fym1end

    myKey = "d1";

    strSql = "SELECT Id, Name FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > =" + fyM2Start + " AND CloseDate < =" + fyM1End +") ";

    sqlObj = {key: myKey, query:"CURRENT RETAINED YTD new def", sql: strSql};

    arrSql.push(sqlObj);

    // current retained YTDM1
    // donated ytdm1 and within fym3 start and fyM2End

    myKey = "d2";

    strSql = "SELECT Id, Name FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdM1Start + " AND CloseDate <= " + ytdM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM3Start + " AND CloseDate <= " + fyM2End +") ";

    sqlObj = {key: myKey, query:"CURRENT RETAINED YTD-1 new def", sql: strSql};

    arrSql.push(sqlObj);

    // current retained YTDM2
    // donated ytdm2 and within fym4 start and fym3end

    myKey = "d3";

    strSql = "SELECT Id, Name FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdM2Start + " AND CloseDate <= " + ytdM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM4Start + " AND CloseDate <= " + fyM3End +") ";

    sqlObj = {key: myKey, query:"CURRENT RETAINED YTD-2 new def", sql: strSql};

    arrSql.push(sqlObj);

    // current retained fym1
    // donated fym1 and within fym3start and fyM2End

    myKey = "d4";

    strSql = "SELECT Id, Name FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM1Start + " AND CloseDate <= " + fyM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > =" + fyM3Start + " AND CloseDate <= " + fyM2End +") ";

    sqlObj = {key: myKey, query:"CURRENT RETAINED FYM1", sql: strSql};

    arrSql.push(sqlObj);

    // current retained fym2
    // donated fym2 and within fyM4Start and fyM3End

    myKey = "d5";

    strSql = "SELECT Id, Name FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM2Start + " AND CloseDate <= " + fyM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > =" + fyM4Start + " AND CloseDate <= " + fyM3End +") ";

    sqlObj = {key: myKey, query:"CURRENT RETAINED FYM2", sql: strSql};

    arrSql.push(sqlObj);

    // l2ybnty ytd
    // NOTdonated ytd and within fym2 start and fym1end

    myKey = "e1";

    strSql = "SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdStart + " AND CloseDate <= " + ytdEnd +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM1End +") ";

    sqlObj = {key: myKey, query:"l2ybnty YTD new def", sql: strSql};

    arrSql.push(sqlObj);

    //  l2ybnty ytdm1
    // not donated ytdm1 and within fym3 start and fyM2End

    myKey = "e2";

    strSql = "SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdM1Start + " AND CloseDate <= " + ytdM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM3Start + " AND CloseDate <= " + fyM2End +") ";

    sqlObj = {key: myKey, query:"l2ybnty YTD-1 new def", sql: strSql};

    arrSql.push(sqlObj);

    // l2ybnty YTDM2
    // not donated ytdm2 and within fym4 start and fym3end

    myKey = "e3";

    strSql = "SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdM2Start + " AND CloseDate <= " + ytdM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM4Start + " AND CloseDate <= " + fyM3End +") ";

    sqlObj = {key: myKey, query:"l2ybnty YTD-2 new def", sql: strSql};

    arrSql.push(sqlObj);

    // l2ybnty fym1
    // not donated fym1 and within fym3start and fyM2End

    myKey = "e4";

    strSql = "SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM1Start + " AND CloseDate <= " + fyM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM3Start + " AND CloseDate <= " + fyM2End +") ";

    sqlObj = {key: myKey, query:"l2ybnty FYM1", sql: strSql};

    arrSql.push(sqlObj);

    // l2ybnty fym2
    // not donated fym2 and within fyM4Start and fyM3End

    myKey = "e5";

    strSql = "SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM2Start + " AND CloseDate <= " + fyM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + fyM4Start + " AND CloseDate <= " + fyM3End +") ";

    sqlObj = {key: myKey, query:"l2ybnty FYM2", sql: strSql};

    arrSql.push(sqlObj);


    // RECOVERED ytdsel

    myKey = "f1a";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + ytdStart + " AND CloseDate < " + ytdEnd +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate < " + fyM3End +") ";

    sqlObj = {key: myKey, query:"donated in sel yetd, AND  sometime prior to the previous two fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    myKey = "f1b";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + fyM2Start + " AND CloseDate < " + fyM1End +")";


    sqlObj = {key: myKey, query:"donated in the previous 2 fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    // RECOVERED ytdM1

    myKey = "f2a";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + ytdM1Start + " AND CloseDate < " + ytdM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate < " + fyM4End +") ";

    sqlObj = {key: myKey, query:"donated in sel yetd-1, AND  sometime prior to the previous two fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    myKey = "f2b";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + fyM3Start + " AND CloseDate < " + fyM2End +")";


    sqlObj = {key: myKey, query:"donated in the previous 2 fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    // RECOVERED ytdM2

    myKey = "f3a";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + ytdM2Start + " AND CloseDate < " + ytdM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate < " + fyM5End +") ";

    sqlObj = {key: myKey, query:"donated in sel yetd-1, AND  sometime prior to the previous two fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    myKey = "f3b";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + fyM4Start + " AND CloseDate < " + fyM3End +")";


    sqlObj = {key: myKey, query:"donated in the previous 2 fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    // RECOVERED fym1

    myKey = "f4a";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + fyM1Start + " AND CloseDate < " + fyM1End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate < " + fyM3Start +") ";

    sqlObj = {key: myKey, query:"donated in sel yetd-1, AND  sometime prior to the previous two fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    // RECOVERED fym2

    myKey = "f5a";

    strSql = "SELECT Id, Name FROM Account WHERE Id  IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate > " + fyM2Start + " AND CloseDate < " + fyM2End +")";

    strSql += "AND  Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate < " + fyM4Start +") ";

    sqlObj = {key: myKey, query:"donated in sel yetd-1, AND  sometime prior to the previous two fiscal years", sql: strSql};

    arrSql.push(sqlObj);

    // lost ytd
    myKey = "g1";
    // TODO*** this is the current working version
    strSql = "SELECT AccountId,  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MAX(CloseDate) <= " + fyM3End;

    sqlObj = {key: myKey, query:"lost ytd (how is this yeartd)", sql: strSql};

    arrSql.push(sqlObj);

    // lost ytd-1
    myKey = "g2";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MAX(CloseDate) <= " + fyM4End;

    sqlObj = {key: myKey, query:"lost ytd-1 (how is this yeartd)", sql: strSql};

    arrSql.push(sqlObj);

    // lost ytd-2
    myKey = "g3";
    strSql = "SELECT  COUNT(Id) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' GROUP BY AccountId HAVING MAX(CloseDate) <= " + fyM5End;

    sqlObj = {key: myKey, query:"lost ytd-2 (how is this yeartd)", sql: strSql};

    arrSql.push(sqlObj);



    var getSalesforce = function(data){

        if (!forceresponse.accessToken){
            console.log("I want to do a check in getSalesforce to see if I need to auth. ", forceresponse.accessToken);
            $http.get("/salesforce/force").then(function(response){
                // console.log("get force", response.data);
                forceresponse.response = response.data;
                forceresponse.accessToken = response.data.accessToken;
                forceresponse.instanceUrl = response.data.instanceUrl;
                fetchForce();

            });



        }else {
            console.log("DID NOT reauthroize");
            fetchForce();
        }


    };

    var fetchForce = function(forceResult){

        console.log("in fetch force, forceResult=", forceResult);
        if(forceResult){
            // we got a result. Push it into arrResults, increment counter, call the next
            // sql statement in the queue.
            // if counter less than sql array length, push it up, else done.

            // arrResults.push(forceResult.data.records);
            arrResults.push(forceResult.data);

            sqlIndex = arrResults.length;
            console.log("sql index", sqlIndex);


            if (arrResults.length == arrSql.length){
                // we are done
                console.log("Hey! In fetchForce in queryService, I think we are done!");
                forceData.arrResults = arrResults;
                parseResults();
                return;
            }
            // do a call where the index of the sql array = the length of the arrResults array
            // if forceResult.length < arrSql then all again else return
        }

        console.log("getting ready to get in fetch. sqlIndex=", sqlIndex, "arrSql[sqlIndex]=", arrSql[sqlIndex].sql);
        $http.get("/salesforce/fetch", {
            params: {
                accessToken: forceresponse.accessToken,
                instanceUrl: forceresponse.instanceUrl,
                key: arrSql[sqlIndex].key,
                strSql: arrSql[sqlIndex].sql,
                queryInfo: arrSql[sqlIndex].query
            }
        }).then(function(response){
            // console.log("Hey I got something", response.data.records);
            // forceData.response  = response.data.records;
            fetchForce(response);
        });
    };

    var parseResults = function(){

        console.log("Hey we are totally in parseResults");




        //Donor	Acquistion	&	Retention
        // first time donors
        console.log("Donor	Acquistion	&	Retention");
        console.log("first time donors");
        var ftdYTD = getCount("c1");
        var ftdYTDm1 = getCount("c2");
        var ftdYTDm2 = getCount("c3");
        var ftdFym1 = getCount("c4");
        var ftdFym2 = getCount("c5");


        console.log("ftdYTD", ftdYTD);
        console.log("ftdYTDm1", ftdYTDm1);
        console.log("ftdYTDm2", ftdYTDm2);
        console.log("ftdFym1", ftdFym1);
        console.log("ftdFym2", ftdFym2);

        console.log("Current retained donors");

        // current retained donors
        var crdSelYTD = getCount("d1");
        var crdSelYTDm1 = getCount("d2");
        var crdSelYTDm2 = getCount("d3");
        var crdFym1 = getCount("d4");
        var crdFym2 = getCount("d5");

        console.log("crdSelYTD", crdSelYTD);
        console.log("crdSelYTDm1", crdSelYTDm1);
        console.log("crdSelYTDm1", crdSelYTDm2);
        console.log("crdFym1", crdFym1);
        console.log("crdFym2", crdFym2);

        console.log("L2YBNTY");

        var l2ybntyYTD = getCount("e1");
        var l2ybntyYTDM1 = getCount("e2");
        var l2ybntyYTDM2 = getCount("e3");
        var l2ybntyFym1 = getCount("e4");
        var l2ybntyFym2 = getCount("e5");


        console.log("l2ybntyYTD", l2ybntyYTD);
        console.log("l2ybntyYTDM1", l2ybntyYTDM1);
        console.log("l2ybntyYTDM2", l2ybntyYTDM2);
        console.log("l2ybntyFym1", l2ybntyFym1);
        console.log("l2ybntyFym2", l2ybntyFym2);

        // total current donor pool
        console.log("Total current donor pool");

        var tcdpYTD = ftdYTD + crdSelYTD + l2ybntyYTD;
        var tcdpYTDm1 = ftdYTDm1 + crdSelYTDm1 + l2ybntyYTDM1;
        var tcdpYTDm2 = ftdYTDm2 + crdSelYTDm2 + l2ybntyYTDM2;
        var tcdpFym1 = ftdFym1 + crdFym1 + l2ybntyFym1;
        var tcdpFym2 = ftdFym2 + crdFym2 + l2ybntyFym2;

        console.log("tcdpYTD", tcdpYTD);
        console.log("tcdpYTDm1", tcdpYTDm1);
        console.log("tcdpYTDm2", tcdpYTDm2);
        console.log("tcdpFym1", tcdpFym1);
        console.log("tcdpFym2", tcdpFym2);

        // perect current retained donors
        console.log("Current retained donors percentage");

        var pctCrdSelYTD = crdSelYTD / tcdpYTD;
        var pctCrdSelYTDm1 = crdSelYTDm1 / tcdpYTDm1;
        var pctCrdSelYTDm2 = crdSelYTDm2 / tcdpYTDm2;
        var pctCrdFym1 = crdFym1 / tcdpFym1;
        var pctCrdFym2 = crdFym2 / tcdpFym2;

        console.log("pctCrdSelYTD", pctCrdSelYTD);
        console.log("pctCrdSelYTDm1", pctCrdSelYTDm1);
        console.log("pctCrdSelYTDm2", pctCrdSelYTDm2);
        console.log("pctCrdFym1", pctCrdFym1);
        console.log("pctCrdFym2", pctCrdFym2);




        console.log("Recovered Donors");

        var recYTD = nukeBfromA("f1a","f1b");
        var recYTDm1 = nukeBfromA("f2a","f2b");
        var recYTDm2 = nukeBfromA("f3a","f3b");
        var recFym1 = nukeBfromA("f4a","f2b");
        var recFym2 = nukeBfromA("f5a","f3b");

        console.log("recYTD", recYTD);
        console.log("recYTDm1", recYTDm1);
        console.log("recYTDm2", recYTDm2);
        console.log("recFym1", recFym1);
        console.log("recFym2", recFym2);

        console.log("Lost Donors");

        var lostYTD = getCount("g1");
        var lostYTDm1 = getCount("g2");
        var lostYTDm2 = getCount("g3");
        var lostFym1 = getCount("g1");
        var lostFym2 = getCount("g2");

        console.log("lostYTD", lostYTD);
        console.log("lostYTDm1", lostYTDm1);
        console.log("lostYTDm2", lostYTDm2);
        console.log("lostFym1", lostFym1);
        console.log("lostFym2", lostFym2);

        // total lost recovery pool
        console.log("Total lost recovery  pool");
        var poolYTD = recYTD + lostYTD;
        var poolYTDm1 = recYTDm1 + lostYTDm1;
        var poolYTDm2 = recYTDm2 + lostYTDm2;
        var poolFym1 = recFym1 + lostFym1;
        var poolFym2 = recFym2 + lostFym2;

        console.log("poolYTD",poolYTD);
        console.log("poolYTDm1",poolYTDm1);
        console.log("poolYTDm2",poolYTDm2);
        console.log("poolFym1",poolFym1);
        console.log("poolFym2",poolFym2);

        //TODO percentage donors Recovered
        console.log("Percentage donors recovered");

        var pctRecYTD = recYTD / lostYTD;
        var pctRecYTDm1 = recYTDm1 / lostYTDm1;
        var pctRecYTDm2 = recYTDm2  / lostYTDm2;
        var pctRecFym1 = recFym1 / lostFym1;
        var pctRecFym2 = recFym2 / lostFym2;

        console.log("pctRecYTD", pctRecYTD);
        console.log("pctRecYTDm1", pctRecYTDm1);
        console.log("pctRecYTDm2", pctRecYTDm2);
        console.log("pctRecFym1", pctRecFym1);
        console.log("pctRecFym2", pctRecFym2);

        // donor universe
        console.log("Donor Universe");
        var duYTD = tcdpYTD + poolYTD;
        var duYTDm1 = tcdpYTDm1 + poolYTDm1;
        var duYTDm2 = tcdpYTDm2 + poolYTDm2;
        var duFym1 = tcdpFym1 + poolFym1;
        var duFym2 = tcdpFym2 + poolFym2;

        console.log("duYTD", duYTD);
        console.log("duYTDm1", duYTDm1);
        console.log("duYTDm2", duYTDm2);
        console.log("duFym1", duFym1);
        console.log("duFym2", duFym2);

        // percentage retained donors
        console.log("Percentage retained donors");

        var prdYTD = duYTD / crdSelYTD;
        var prdYTDm1 = duYTDm1 / crdSelYTDm1;
        var prdYTDm2 = duYTDm2 / crdSelYTDm2;
        var prdFym1 = duFym1 / crdFym1;
        var prdFym2 = duFym2 / crdFym2;

        console.log("prdYTD", prdYTD);
        console.log("prdYTDm1", prdYTDm1);
        console.log("prdYTDm2", prdYTDm2);
        console.log("prdFym1", prdFym1);
        console.log("prdFym2", prdFym2);


    };

    var totalResults = function(myKey){

        // loop through results and do manual calculations

        for(var i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey == myKey){
                // total results
                // console.log("HEY THERE! ");
                var mySet = arrResults[i].result.records;
                var myCash = 0;
                // console.log("myset length", mySet.length);
                for (x=0; x<mySet.length; x++)
                {
                    // console.log("myset ", x, mySet[x]);
                    myCash = myCash + mySet[x].expr1;
                }
                // console.log("myCash = ", myCash);
                return myCash;

            }
        }


    };

    var countInEither2 = function(key1, key2){
        var arr1 = [];
        var arr2 = [];
        var count = 0;
        var total = 0;
        for(var i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey ==key1){
                arr1 = arrResults[i].result.records;
            }
            if (arrResults[i].myKey ==key2){
                arr2 = arrResults[i].result.records;
            }
        }
        for (i=0; i<arr1.length; i++){
            for(j=0; j<arr2.length; j++){
                if (arr1[i].Name == arr2[j].Name){
                    count ++;

                }
            }
        }
        console.log("Count of dupes", count);
        total = arr1.length + arr2.length -count;
        return total;

    };

    var countInEither = function(key1, key2){

        var arrComp = [];
        var mySet = {};

        // loop through results and do manual calculations

        for(var i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey == key1){
                // total results
                // console.log("HEY THERE! ");
                mySet = arrResults[i].result.records;

                // console.log("myset length", mySet.length);
                for (x=0; x<mySet.length; x++)
                {
                    // console.log("myset ", x, mySet[x]);
                    arrComp.push(mySet[x].Id);
                }


            }
        }
        for(i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey == key2){
                // total results
                // console.log("HEY THERE! ");
                mySet = arrResults[i].result.records;

                // console.log("myset length", mySet.length);
                for (x=0; x<mySet.length; x++)
                {
                    // console.log("myset ", x, mySet[x]);
                    arrComp.push(mySet[x].Id);
                }


            }
        }
        // got both loaded in new array

        // this counts unique members of arrComp

        var o = {},  l = arrComp.length, r = [];
        for(i=0; i<l;i+=1) o[arrComp[i]] = arrComp[i];
        for(i in o) r.push(o[i]);
        // console.log("count",r.length);
        return r.length;


        // console.log("Hoping for a total of records unique to these two arrays", counts);


    };

    var nukeBfromA = function(keyA, keyB){



        var arrA =[];
        var arrB = [];

        // console.log("IN nukeBfromA, keys", keyA, keyB);

        for(var i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey == keyA){
                arrA = arrResults[i].result.records;
            }
            if (arrResults[i].myKey == keyB){
                arrB = arrResults[i].result.records;
            }
        }

        // console.log("In Nuke b from a, START length of a=", arrA.length);
        // console.log("In Nuke b from a, START length of b=", arrB.length);

        // both arrays assigned
        // remove b from a
        for (i=0; i<arrB.length; i++){
            for (var j=0; j<arrA.length; j++){
                if (arrA[j].Id == arrB[i].Id){
                    // console.log("Match nuking!");
                    arrA.splice(j,1);
                }
            }
        }
        // console.log("In Nuke b from a, AFTER length of a=", arrA.length);
        return arrA.length;
    };

    var getCount = function(key){
        // console.log("WOW we are in GETCOUNT and key, arrResults.length = ",key,arrResults.length);

        var myCount = 0;
        // loop through results and do manual calculations
        for(var i=0; i<arrResults.length; i++){
            // console.log("hmmm key =", arrResults[i].myKey);
            if (arrResults[i].myKey == key){
                // console.log("HEY I Matched  in GETCOUNT, looking at", arrResults[i].count);
                myCount = arrResults[i].count;
            }
        }
        return myCount;



    };





    return{

        getSalesforce : getSalesforce,

        data : data,
        forceData : forceData,
        forceresponse : forceresponse,
        arrResults : arrResults,
        fetchForce : fetchForce
    };

}]);
