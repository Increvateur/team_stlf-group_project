/**
 * Created by JFCS on 5/3/16.
 */
myApp.factory("MoneyRaisedService", ["$http", function($http) {

    var data = {};
    var forceresponse  = {};
    var forceData = {};
    var arrResults = [];
    var arrSql = [];
    var sqlIndex = 0;
    var myKey = "";
    var strSql = "";
    var accountArray = [];

    // TODO for each strSql, make an object, with label: label, and soql: strSql

    //end date
    // for ytd, fiscal year start date until end date for fiscal year end date is in, plus 2 previous.
    // full fiscal years for the 2 fiscal years PRIOR to the fiscal year end date is in.
    // ytd - fiscal year start to end date of fiscal year containing end date
    // ytd-1
    // ytd-2
    // fy-1
    // fy-2

    // fiscal year is 1 sep to aug 31
    // current fiscal year start is 1 sep before end date, and aug 31 after end date
    // ytd is 1 sep before end date until end date
    // ytd is 1 sep before end date -1 year



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

    fyM1Start = new Date(ytdM1Start);
    fyM2Start = new Date(ytdM2Start);

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




    var moneyRaised = function () {

        // new query first with new dates
        myKey = "a1";
        strSql = "SELECT Donation_SubCategory__c, SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdStart + " AND CloseDate <=" + ytdEnd + "  GROUP BY Donation_SubCategory__c ";

        sqlObj = {key: myKey, query: "money raised YTD START AND END RATE this is NEW SPARTA", sql: strSql};

        arrSql.push(sqlObj);


        // new query first with new dates PREV YEAR
        myKey = "a2";
        strSql = "SELECT Donation_SubCategory__c, SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM1Start + " AND CloseDate <=" + ytdM1End + "  GROUP BY Donation_SubCategory__c ";

        sqlObj = {key: myKey, query: "year -1 money raised YTD START AND END RATE this is NEW SPARTA", sql: strSql};

        arrSql.push(sqlObj);

        // new query first with new dates PREV YEAR 2 back
        myKey = "a3";
        strSql = "SELECT Donation_SubCategory__c, SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM2Start + " AND CloseDate <=" + ytdM2End + "  GROUP BY Donation_SubCategory__c ";

        sqlObj = {key: myKey, query: "year -2 money raised YTD START AND END RATE this is NEW SPARTA", sql: strSql};

        arrSql.push(sqlObj);

        // new query first with new dates First Fiscal YEar before select date
        myKey = "a4";
        strSql = "SELECT Donation_SubCategory__c, SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM1Start + " AND CloseDate <=" + fyM1End + "  GROUP BY Donation_SubCategory__c ";

        sqlObj = {key: myKey, query: "First Fiscal YEar before select date", sql: strSql};

        arrSql.push(sqlObj);

        // second fiscal year before select date
        myKey = "a5";
        strSql = "SELECT Donation_SubCategory__c, SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM2Start + " AND CloseDate <=" + fyM2End + "  GROUP BY Donation_SubCategory__c ";

        sqlObj = {key: myKey, query: "SECOND Fiscal YEar before select date", sql: strSql};

        arrSql.push(sqlObj);

        //// TODO Now I need to get the TOTALS
        //
        //// total for ytd selected
        //myKey = "b1";
        //strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdStart + " AND CloseDate <=" + ytdEnd;
        //
        //sqlObj = {key: myKey, query: "TOTAL amount for ytd selected", sql: strSql};
        //
        //arrSql.push(sqlObj);
        //
        //// total for ytd selected -1
        //myKey = "b2";
        //strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM1Start + " AND CloseDate <=" + ytdM1End;
        //
        //sqlObj = {key: myKey, query: "TOTAL amount for ytd selected -1", sql: strSql};
        //
        //arrSql.push(sqlObj);
        //
        //// total for ytd selected -2
        //myKey = "b3";
        //strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM2Start + " AND CloseDate <=" + ytdM2End;
        //
        //sqlObj = {key: myKey, query: "TOTAL amount for ytd selected -2", sql: strSql};
        //
        //arrSql.push(sqlObj);
        //
        //// total for FY before selected
        //myKey = "b4";
        //strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM1Start + " AND CloseDate <=" + fyM1End;
        //
        //sqlObj = {key: myKey, query: "TOTAL amount for First full fiscal year before selected", sql: strSql};
        //
        //arrSql.push(sqlObj);
        //
        //// total for second FY before selected
        //myKey = "b5";
        //strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM2Start + " AND CloseDate <=" + fyM2End;
        //
        //sqlObj = {key: myKey, query: "TOTAL amount for Second full fiscal year before selected", sql: strSql};
        //
        //arrSql.push(sqlObj);

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
                 //pullData();
                fetchForce();

            });



        }else {
            console.log("DID NOT reauthroize");
            // pullData();
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
                //console.log("Hey! In fetchForce in queryService, I think we are done!", arrResults);
                forceData.arrResults = arrResults;
                sortResults(arrResults);
                //parseResults();
                return;
            }
            // do a call where the index of the sql array = the length of the arrResults array
            // if forceResult.length < arrSql then all again else return
        }

        console.log("getting ready to get in fetch. sqlIndex=", sqlIndex);
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
            fetchForce(response);
        });
    };


    // Sort results is a function that takes the salesforce information and creates new objects that are formatted properly to fit on our tables
    var sortResults = function(resultsArrays){

        // account is a holder object for properly sorted information
        var account = {};
        account.total = [];

        // this loop goes through and makes sure that we dont have any null category values and removes them before we create new objects
        for(var i = 0; i < resultsArrays.length; i++) {
            //resultsArrays[0].result.records.shift();
            if(resultsArrays[i].result.records.length > 12){
                for(var m = 0; m < resultsArrays[i].result.records.length; m++){
                    if(resultsArrays[i].result.records[m].Donation_SubCategory__c === null){
                        resultsArrays[i].result.records.splice(m,1);
                    }
                }
            }
        }
        //console.log(resultsArrays);
       // loops through the saleforce results and rebuilds them into properly formatted objects
       // pushs those objects into the accounts array which is then used in the controller to make the money raised table.

        for (var j = 0 ; j < resultsArrays[0].result.records.length ; j++){

            account.type = resultsArrays[0].result.records[j].Donation_SubCategory__c;
            account.total[0] = resultsArrays[0].result.records[j].expr0;
            account.total[1] = resultsArrays[1].result.records[j].expr0;
            account.total[2] = resultsArrays[2].result.records[j].expr0;
            account.total[3] = resultsArrays[3].result.records[j].expr0;
            account.total[4] = resultsArrays[4].result.records[j].expr0;
       new Account(account.type, account.total[0], account.total[1], account.total[2], account.total[3], account.total[4]);
      }
        console.log("did this actually work?!?!?", accountArray);

    };
    function Account (type,ytd,ytdM1,ytdM2,tfyM1,tfyM2){
        this.type = type;
        this.ytd = ytd;
        this.ytdM1=ytdM1;
        this.ytdM2=ytdM2;
        this.tfyM1=tfyM1;
        this.tfyM2=tfyM2;

        accountArray.push(this);

    }


    return{

        getSalesforce : getSalesforce,
        moneyRaised : moneyRaised,
        data : data,
        forceData : forceData,
        forceresponse : forceresponse,
        arrResults : arrResults,
        fetchForce : fetchForce,
        accountArray:accountArray
    };


}]);

