
myApp.factory("GiftRangeService", ["$http", function($http) {

    var data = {};
    var forceresponse  = {};
    var forceData = {};
    var arrResults = [];
    var arrSql = [];
    var sqlIndex = 0;
    var strSql = "";
    var myKey = "";
    var giftArray = [];


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




var giftRange = function() {
    // base selected YTD
    myKey = "m1";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >=" + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY AccountId HAVING ( SUM(Amount) <= 95 )  ";


    sqlObj = {key: myKey, query: "BASE donors Selected YTD", sql: strSql};

    arrSql.push(sqlObj);

    // base selected YTD -1
    myKey = "m2";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND CloseDate >= " + ytdM1Start + " AND CloseDate < =" + ytdM1End + " GROUP BY AccountId HAVING ( SUM(Amount) <= 95  )  ";


    sqlObj = {key: myKey, query: "BASE donors Selected YTD -1", sql: strSql};

    arrSql.push(sqlObj);

    // base selected YTD -2
    myKey = "m3";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM2Start + " AND CloseDate < =" + ytdM2End + " GROUP BY AccountId HAVING ( SUM(Amount) <= 95 )  ";


    sqlObj = {key: myKey, query: "BASE donors Selected YTD -2", sql: strSql};

    arrSql.push(sqlObj);

    // base selected FY -1
    myKey = "m4";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM1Start + " AND CloseDate < =" + fyM1End + " GROUP BY AccountId HAVING ( SUM(Amount) <= 95 )  ";


    sqlObj = {key: myKey, query: "BASE donors first FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // base selected FY -2
    myKey = "m5";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM2End + " GROUP BY AccountId HAVING ( SUM(Amount) <= 95 )  ";


    sqlObj = {key: myKey, query: "BASE donors SECOND FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // intermediate

    // intermediate selected YTD
    myKey = "n1";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY AccountId HAVING ( SUM(Amount) < 400 AND SUM(Amount) > 95 )  ";

    // strSql = "SELECT  COUNT(Id), SUM(Amount), Account.Name FROM Opportunity WHERE CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY Account.Name HAVING ( SUM(Amount) < 400 AND SUM(Amount) >= 95 )  ORDER BY Account.Name ";


    sqlObj = {key: myKey, query: "INTERMEDIATE donors Selected YTD", sql: strSql};

    arrSql.push(sqlObj);

    // intermediate selected YTD -1
    myKey = "n2";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM1Start + " AND CloseDate < =" + ytdM1End + " GROUP BY AccountId HAVING ( SUM(Amount) < 400 AND SUM(Amount) > 95 )  ";


    sqlObj = {key: myKey, query: "INTERMEDIATE donors Selected YTD -1", sql: strSql};

    arrSql.push(sqlObj);

    // intermediate selected YTD -2
    myKey = "n3";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM2Start + " AND CloseDate < =" + ytdM2End + " GROUP BY AccountId HAVING ( SUM(Amount) < 400 AND SUM(Amount) > 95 )  ";


    sqlObj = {key: myKey, query: "INTERMEDIATE donors Selected YTD -2", sql: strSql};

    arrSql.push(sqlObj);

    // intermediate selected FY -1
    myKey = "n4";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM1Start + " AND CloseDate < =" + fyM1End + " GROUP BY AccountId HAVING ( SUM(Amount) < 400 AND SUM(Amount) > 95 ) ";


    sqlObj = {key: myKey, query: "INTERMEDIATE donors first FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // intermediate selected FY -2
    myKey = "n5";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM2End + " GROUP BY AccountId HAVING ( SUM(Amount) < 400 AND SUM(Amount) > 95 )  ";


    sqlObj = {key: myKey, query: "INTERMEDIATE donors SECOND FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // large >= 400 < 1000

    // large selected YTD
    myKey = "o1";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY AccountId HAVING ( SUM(Amount) < 1000 AND SUM(Amount) >= 400 )  ";

    // strSql = "SELECT  COUNT(Id), SUM(Amount), Account.Name FROM Opportunity WHERE CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY Account.Name HAVING ( SUM(Amount) < 400 AND SUM(Amount) >= 95 )  ORDER BY Account.Name ";


    sqlObj = {key: myKey, query: "LARGE donors Selected YTD", sql: strSql};

    arrSql.push(sqlObj);

    // large selected YTD -1
    myKey = "o2";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM1Start + " AND CloseDate < =" + ytdM1End + " GROUP BY AccountId HAVING ( SUM(Amount) < 1000 AND SUM(Amount) >= 400 )  ";


    sqlObj = {key: myKey, query: "LARGE donors Selected YTD -1", sql: strSql};

    arrSql.push(sqlObj);

    // large selected YTD -2
    myKey = "o3";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM2Start + " AND CloseDate < =" + ytdM2End + " GROUP BY AccountId HAVING ( SUM(Amount) < 1000 AND SUM(Amount) >= 400 )  ";


    sqlObj = {key: myKey, query: "LARGE donors Selected YTD -2", sql: strSql};

    arrSql.push(sqlObj);

    // large selected FY -1
    myKey = "o4";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM1Start + " AND CloseDate < =" + fyM1End + " GROUP BY AccountId HAVING ( SUM(Amount) < 1000 AND SUM(Amount) >= 400 ) ";


    sqlObj = {key: myKey, query: "LARGE donors first FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // large selected FY -2
    myKey = "o5";
    strSql = "SELECT   COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM2End + " GROUP BY AccountId HAVING ( SUM(Amount) < 1000 AND SUM(Amount) >= 400 )  ";


    sqlObj = {key: myKey, query: "LARGE donors SECOND FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // major > 1000

    // major selected YTD
    myKey = "p1";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY AccountId HAVING (  SUM(Amount) >= 1000 )  ";

    // strSql = "SELECT  COUNT(Id), SUM(Amount), Account.Name FROM Opportunity WHERE CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY Account.Name HAVING ( SUM(Amount) < 400 AND SUM(Amount) >= 95 )  ORDER BY Account.Name ";


    sqlObj = {key: myKey, query: "MAJOR donors Selected YTD", sql: strSql};

    arrSql.push(sqlObj);

    // major selected YTD -1
    myKey = "p2";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM1Start + " AND CloseDate < =" + ytdM1End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 1000 )  ";


    sqlObj = {key: myKey, query: "MAJOR donors Selected YTD -1", sql: strSql};

    arrSql.push(sqlObj);

    // major selected YTD -2
    myKey = "p3";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM2Start + " AND CloseDate < =" + ytdM2End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 1000 )  ";


    sqlObj = {key: myKey, query: "MAJOR donors Selected YTD -2", sql: strSql};

    arrSql.push(sqlObj);

    // major selected FY -1
    myKey = "p4";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM1Start + " AND CloseDate < =" + fyM1End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 1000 )  ";


    sqlObj = {key: myKey, query: "MAJOR donors first FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // major selected FY -2
    myKey = "p5";
    strSql = "SELECT   COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM2End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 1000 )  ";


    sqlObj = {key: myKey, query: "MAJOR donors SECOND FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // total > 0

    // total selected YTD
    myKey = "q1";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY AccountId HAVING (  SUM(Amount) >= 0 )  ";

    // strSql = "SELECT  COUNT(Id), SUM(Amount), Account.Name FROM Opportunity WHERE CloseDate >= " + ytdStart + " AND CloseDate < =" + ytdEnd + " GROUP BY Account.Name HAVING ( SUM(Amount) < 400 AND SUM(Amount) >= 95 )  ORDER BY Account.Name ";


    sqlObj = {key: myKey, query: "TOTAL donors Selected YTD", sql: strSql};

    arrSql.push(sqlObj);

    // total selected YTD -1
    myKey = "q2";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM1Start + " AND CloseDate < =" + ytdM1End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 0 )  ";


    sqlObj = {key: myKey, query: "TOTAL donors Selected YTD -1", sql: strSql};

    arrSql.push(sqlObj);

    // total selected YTD -2
    myKey = "q3";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + ytdM2Start + " AND CloseDate < =" + ytdM2End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 0 )  ";


    sqlObj = {key: myKey, query: "TOTAL donors Selected YTD -2", sql: strSql};

    arrSql.push(sqlObj);

    // total selected FY -1
    myKey = "q4";
    strSql = "SELECT  COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM1Start + " AND CloseDate < =" + fyM1End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 0 )  ";


    sqlObj = {key: myKey, query: "TOTAL donors first FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    // total selected FY -2
    myKey = "q5";
    strSql = "SELECT   COUNT(Id), SUM(Amount) FROM Opportunity WHERE  StageName = 'Posted' AND RecordTypeID = '012800000002KPtAAM' AND  CloseDate >= " + fyM2Start + " AND CloseDate < =" + fyM2End + " GROUP BY AccountId HAVING (  SUM(Amount) >= 0 )  ";


    sqlObj = {key: myKey, query: "TOTAL donors SECOND FY before selected", sql: strSql};

    arrSql.push(sqlObj);

    getSalesforce();

};


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

        //console.log("in fetch force, forceResult=", forceResult);
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
                console.log(forceData);
                sortResults(forceData.arrResults);
                return;
            }
            // do a call where the index of the sql array = the length of the arrResults array
            // if forceResult.length < arrSql then all again else return
        }

        //console.log("getting ready to get in fetch. sqlIndex=", sqlIndex, "arrSql[sqlIndex]=", arrSql[sqlIndex].sql);
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


        // gift range chart
        console.log("Gift Range Chart");
        console.log("Donors at each level");
        console.log("Base");

        // Base
        var baseYTD = getCount("m1");
        var baseYTDm1 = getCount("m2");
        var baseYTDm2 = getCount("m3");
        var baseFym1 = getCount("m4");
        var baseFym2 = getCount("m5");

        console.log("baseYTD",baseYTD );
        console.log("baseYTDm1",baseYTDm1 );
        console.log("baseYTDm2",baseYTDm2 );
        console.log("baseFym1",baseFym1 );
        console.log("baseFym2",baseFym2 );

        // Inter
        console.log("Inter");

        var interYTD = getCount("n1");
        var interYTDm1 = getCount("n2");
        var interYTDm2 = getCount("n3");
        var interFym1 = getCount("n4");
        var interFym2 = getCount("n5");

        console.log("interYTD",interYTD );
        console.log("interYTDm1",interYTDm1 );
        console.log("interYTDm2",interYTDm2 );
        console.log("interFym1",interFym1 );
        console.log("interFym2",interFym2 );

        // Large
        console.log("Large");
        var largeYTD = getCount("o1");
        var largeYTDm1 = getCount("o2");
        var largeYTDm2 = getCount("o3");
        var largeFym1 = getCount("o4");
        var largeFym2 = getCount("o5");

        console.log("largeYTD",largeYTD );
        console.log("largeYTDm1",largeYTDm1 );
        console.log("largeYTDm2",largeYTDm2 );
        console.log("largeFym1",largeFym1 );
        console.log("largeFym2",largeFym2 );

        // Major
        console.log("Major");
        var majorYTD = getCount("p1");
        var majorYTDm1 = getCount("p2");
        var majorYTDm2 = getCount("p3");
        var majorFym1 = getCount("p4");
        var majorFym2 = getCount("p5");

        console.log("majorYTD",majorYTD );
        console.log("majorYTDm1",majorYTDm1 );
        console.log("majorYTDm2",majorYTDm2 );
        console.log("majorFym1",majorFym1 );
        console.log("majorFym2",majorFym2 );

        // total donors
        console.log("Total Donors");
        var totDonYTD = baseYTD + interYTD + largeYTD + majorYTD;
        var totDonYTDm1 = baseYTDm1 + interYTDm1 + largeYTDm1 + majorYTDm1;
        var totDonYTDm2 = baseYTDm2 + interYTDm2 + largeYTDm2 + majorYTDm2;
        var totDonFym1 = baseFym1 + interFym1 + largeFym1 + majorFym1;
        var totDonFym2 = baseFym2 + interFym2 + largeFym2 + majorFym2;


        console.log("totDonYTD", totDonYTD);
        console.log("totDonYTDm1", totDonYTDm1);
        console.log("totDonYTDm2", totDonYTDm2);
        console.log("totDonFym1", totDonFym1);
        console.log("totDonFym2", totDonFym2);


        // gift range amounts
        console.log("gift range amounts");


        console.log("Base");

        //base
        var totalBaseSelYTD = totalResults("m1");
        var totalBaseSelYTDm1 = totalResults("m2");
        var totalBaseSelYTDm2 = totalResults("m3");
        var totalBaseFYm1 = totalResults("m4");
        var totalBaseFYm2 = totalResults("m5");

        console.log("totalBaseSelYTD =", totalBaseSelYTD);
        console.log("totalBaseSelYTDm1 =", totalBaseSelYTDm1);
        console.log("totalBaseSelYTDm2 =", totalBaseSelYTDm2);
        console.log("totalBaseFYm1 =", totalBaseFYm1);
        console.log("totalBaseFYm2 =", totalBaseFYm2);

        console.log("intermediate");
        // intermediate

        var totalInterSelYTD = totalResults("n1");
        var totalInterSelYTDm1 = totalResults("n2");
        var totalInterSelYTDm2 = totalResults("n3");
        var totalInterFYm1 = totalResults("n4");
        var totalInterFYm2 = totalResults("n5");

        console.log("totalInterSelYTD =", totalInterSelYTD);
        console.log("totalInterSelYTDm1 =", totalInterSelYTDm1);
        console.log("totalInterSelYTDm2 =", totalInterSelYTDm2);
        console.log("totalInterFYm1 =", totalInterFYm1);
        console.log("totalInterFYm2 =", totalInterFYm2);


        console.log("Large");
        // large

        var totalLargeSelYTD = totalResults("o1");
        var totalLargeSelYTDm1 = totalResults("o2");
        var totalLargeSelYTDm2 = totalResults("o3");
        var totalLargeFYm1 = totalResults("o4");
        var totalLargeFYm2 = totalResults("o5");

        console.log("totalLargeSelYTD =", totalLargeSelYTD);
        console.log("totalLargeSelYTDm1 =", totalLargeSelYTDm1);
        console.log("totalLargeSelYTDm2 =", totalLargeSelYTDm2);
        console.log("totalLargeFYm1 =", totalLargeFYm1);
        console.log("totalLargeFYm2 =", totalLargeFYm2);

        console.log("major");
        // major

        var totalMajorSelYTD = totalResults("p1");
        var totalMajorSelYTDm1 = totalResults("p2");
        var totalMajorSelYTDm2 = totalResults("p3");
        var totalMajorFYm1 = totalResults("p4");
        var totalMajorFYm2 = totalResults("p5");

        console.log("totalMajorSelYTD =", totalMajorSelYTD);
        console.log("totalMajorSelYTDm1 =", totalMajorSelYTDm1);
        console.log("totalMajorSelYTDm2 =", totalMajorSelYTDm2);
        console.log("totalMajorFYm1 =", totalMajorFYm1);
        console.log("totalMajorFYm2 =", totalMajorFYm2);
        //
        console.log("Total");
        // total
        var totalAllSelYTD = totalResults("q1");
        var totalAllSelYTDm1 = totalResults("q2");
        var totalAllSelYTDm2 = totalResults("q3");
        var totalAllFYm1 = totalResults("q4");
        var totalAllFYm2 = totalResults("q5");


        console.log("totalAllSelYTD =", totalAllSelYTD);
        console.log("totalAllSelYTDm1 =", totalAllSelYTDm1);
        console.log("totalAllSelYTDm2 =", totalAllSelYTDm2);
        console.log("totalAllFYm1 =", totalAllFYm1);
        console.log("totalAllFYm2 =", totalAllFYm2);


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


    var getCount = function(key){
        // console.log("WOW we are in GETCOUNT");

        var myCount = 0;
        // loop through results and do manual calculations
        for(var i=0; i<arrResults.length; i++){
            if (arrResults[i].myKey == key){
                // console.log("HEY I am in GETCOUNT, looking at", arrResults[i].count);
                myCount = arrResults[i].count;
            }
        }
        return myCount;

    };

    var sortResults = function(resultsArrays){
        arrResults = [];
        arrSql = [];
        Sqlobj = {};
        sqlIndex = 0;
        myKey = "";
        strSql = "";
        console.log('hit sort results', resultsArrays);
        // account is a holder object for properly sorted information
        if(giftArray.length > 0){
            return console.log('all done.');
        }

        for(var i = 0; i < resultsArrays.length; i = i + 5) {
            new Gift( resultsArrays[i].queryInfo ,resultsArrays[i].count, resultsArrays[i+1].count, resultsArrays[i+2].count, resultsArrays[i+3].count, resultsArrays[i+4].count);
        }

        console.log("did this actually work?!?!?", giftArray);

    };

    function Gift (type,ytd,ytdM1,ytdM2,tfyM1,tfyM2){
        this.type = type;
        this.ytd = ytd;
        this.ytdM1=ytdM1;
        this.ytdM2=ytdM2;
        this.tfyM1=tfyM1;
        this.tfyM2=tfyM2;
        giftArray.push(this);

    }


    return{

        getSalesforce : getSalesforce,
        giftRange : giftRange,
        data : data,
        forceData : forceData,
        forceresponse : forceresponse,
        arrResults : arrResults,
        fetchForce : fetchForce,
        giftArray : giftArray
    };

}]);