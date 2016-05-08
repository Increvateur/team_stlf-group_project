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
    var goals = {};
    var totalarrSql = [];
    var totalarrResults = [];
    var totalsqlIndex = 0;
    var totalforceData = {};
    var ytdStart = new Date();
    var ytdEnd = new Date();
    var ytdM1Start = new Date();
    var ytdM1End = new Date();
    var ytdM2Start = new Date();
    var ytdM2End = new Date();
    //var ytdM3Start = new Date();
    //var ytdM3End = new Date();
    //var ytdM4Start = new Date();
    //var ytdM4End = new Date();
    var fyM1Start = new Date();
    var fyM1End = new Date();
    var fyM2Start = new Date();
    var fyM2End = new Date();
    var endDate = {};
    endDate.date = new Date();
    var totalObject = {};

    // TODO for each strSql, make an object, with label: label, and soql: strSql

    //////////
    // function that accepts new date input from the datepicker, changes all the date variables and calls salesfore
    // for the updated date ranges.
    //////////
     var setEndDate = function(date){
        //console.log(date);
         endDate.date = date;
         setDates(endDate);
         moneyRaised();
         getTotals();

    };


    ////////////
    // sets all the dates for the salesforce queries.
    ////////////

var setDates = function(endDate) {
    console.log('enddate object in set dates',endDate);
    date = endDate.date;
    var selEndDate = new Date(date);

    console.log('date in query', selEndDate);

    ytdEnd = new Date(selEndDate);

    // ytd start - figure out fiscal year start previous to this date
    ytdStart = new Date("09/01/" + selEndDate.getFullYear());


    if (ytdStart > ytdEnd) {
        ytdStart = new Date("09/01/" + (selEndDate.getFullYear() - 1));
    }

    ytdM1Start = new Date(ytdStart);
    ytdM1Start.add({"years": -1});

    ytdM2Start = new Date(ytdStart);
    ytdM2Start.add({"years": -2});

    //ytdM3Start = new Date(ytdStart);
    //ytdM3Start.add({"years": -3});
    //
    //ytdM4Start = new Date(ytdStart);
    //ytdM4Start.add({"years": -4});


    ytdM1End = new Date(ytdEnd);
    ytdM1End.add({"years": -1});

    ytdM2End = new Date(ytdEnd);
    ytdM2End.add({"years": -2});

    //ytdM3End = new Date(ytdEnd);
    //ytdM3End.add({"years": -3});
    //
    //ytdM4End = new Date(ytdEnd);
    //ytdM4End.add({"years": -4});

    //fiscal year start and end, first full fiscal year before end date

    fyM1End = new Date("08/31/" + selEndDate.getFullYear());

    if (fyM1End > selEndDate) {
        fyM1End = new Date("08/31/" + (selEndDate.getFullYear() - 1));

    }
    // one year PRIOR
    fyM2End = new Date(fyM1End);
    fyM2End.add({"years": -1});

    fyM1Start = new Date(ytdM1Start);
    fyM2Start = new Date(ytdM2Start);

    selEndDate = selEndDate.toFormat("YYYY-MM-DD");
    ytdStart = ytdStart.toFormat("YYYY-MM-DD");
    ytdEnd = ytdEnd.toFormat("YYYY-MM-DD");
    ytdM1Start = ytdM1Start.toFormat("YYYY-MM-DD");
    ytdM1End = ytdM1End.toFormat("YYYY-MM-DD");
    ytdM2Start = ytdM2Start.toFormat("YYYY-MM-DD");
    ytdM2End = ytdM2End.toFormat("YYYY-MM-DD");

    //ytdM3Start = ytdM3Start.toFormat("YYYY-MM-DD");
    //ytdM3End = ytdM3End.toFormat("YYYY-MM-DD");
    //
    //ytdM4Start = ytdM4Start.toFormat("YYYY-MM-DD");
    //ytdM4End = ytdM4End.toFormat("YYYY-MM-DD");

    fyM1Start = fyM1Start.toFormat("YYYY-MM-DD");
    fyM1End = fyM1End.toFormat("YYYY-MM-DD");
    fyM2Start = fyM2Start.toFormat("YYYY-MM-DD");
    fyM2End = fyM2End.toFormat("YYYY-MM-DD");


    //console.log("selEndDate", selEndDate);

    //console.log("ytdStart", ytdStart);
    //console.log("ytdEnd", ytdEnd);
    //console.log("ytdM1Start", ytdM1Start);
    //console.log("ytdM1End", ytdM1End);
    //console.log("ytdM2Start", ytdM2Start);
    //console.log("ytdM2End", ytdM2End);
    //console.log("ytdM3Start", ytdM3Start);
    //console.log("ytdM3End", ytdM3End);
    //console.log("ytdM4Start", ytdM4Start);
    //console.log("ytdM4End", ytdM4End);
    //console.log("fyM1Start", fyM1Start);
    //console.log("fyM1End", fyM1End);
    //console.log("fyM2Start", fyM2Start);
    //console.log("fyM2End", fyM2End);

};

    /////
    // sets the initial date on page load.
    /////
    setDates(endDate);


    ///////////
    // these are the queries for the money raised table.
    ////////////
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

        getSalesforce();

    };


    //////////////
    // these are the queries for the totals of the money raised tables.
    //////////////
    var getTotals = function(){
        // total for ytd selected
        myKey = "b1";
        strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdStart + " AND CloseDate <=" + ytdEnd;

        sqlObj = {key: myKey, query: "TOTAL amount for ytd selected", sql: strSql};

        totalarrSql.push(sqlObj);

        // total for ytd selected -1
        myKey = "b2";
        strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM1Start + " AND CloseDate <=" + ytdM1End;

        sqlObj = {key: myKey, query: "TOTAL amount for ytd selected -1", sql: strSql};

        totalarrSql.push(sqlObj);

        // total for ytd selected -2
        myKey = "b3";
        strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + ytdM2Start + " AND CloseDate <=" + ytdM2End;

        sqlObj = {key: myKey, query: "TOTAL amount for ytd selected -2", sql: strSql};

        totalarrSql.push(sqlObj);

        // total for FY before selected
        myKey = "b4";
        strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM1Start + " AND CloseDate <=" + fyM1End;

        sqlObj = {key: myKey, query: "TOTAL amount for First full fiscal year before selected", sql: strSql};

        totalarrSql.push(sqlObj);

        // total for second FY before selected
        myKey = "b5";
        strSql = "SELECT  SUM(Amount) FROM  Opportunity WHERE StageName = 'Posted' AND Amount != null AND CloseDate >= " + fyM2Start + " AND CloseDate <=" + fyM2End;

        sqlObj = {key: myKey, query: "TOTAL amount for Second full fiscal year before selected", sql: strSql};

        totalarrSql.push(sqlObj);

        getTotalsSalesforce();

    };


    ///////////////////
    // function to check and see if we have logged into salesforce. this is for the totals of the money raised table.
    // if we havent authenticated go grab our tokens and then start our queries,
    // if we have authenticated, go right to sending out queries to salesfoce.
    //////////////////

    var getTotalsSalesforce = function(data){

        if (!forceresponse.accessToken){
            //console.log("I want to do a check in getSalesforce to see if I need to auth. ", forceresponse.accessToken);
            $http.get("/salesforce/force").then(function(response){
                // console.log("get force", response.data);
                forceresponse.response = response.data;
                forceresponse.accessToken = response.data.accessToken;
                forceresponse.instanceUrl = response.data.instanceUrl;
                fetchTotalForce();

            });



        }else {
            console.log("DID NOT reauthroize");
            fetchTotalForce();
        }


    };

    ////////////////
    //  function for money raised totals.
    // this function first checks to see if we have a result coming back from saleforce, if we do push it into a results array
    // and set the sql query index to the number of results we have.
    // then it checks to see if the number of results we have is the same as the number of queries we were suppose to make
    // if it is, we are done. if we are not done, we move to the next portion of the function and perform a salesforce query
    // with the current index of the salesforce query array. then it calls the function again passsing in the response from
    // salesforce rinse repeat until the queries are done.
    ///////////////

    var fetchTotalForce = function(forceResult){

        //console.log("in total force, forceResult=", forceResult);
        if(forceResult){

            totalarrResults.push(forceResult.data);

            totalsqlIndex = totalarrResults.length;
            //console.log("total sql index", totalsqlIndex);


            if (totalarrResults.length == totalarrSql.length){
                // we are done
                totalforceData.totalarrResults = totalarrResults;

                updateTotalObject();


                return;
            }

        }

        //console.log("getting ready to get totals. totalsqlIndex=", totalsqlIndex);
        $http.get("/salesforce/fetch", {
            params: {
                accessToken: forceresponse.accessToken,
                instanceUrl: forceresponse.instanceUrl,
                key: totalarrSql[totalsqlIndex].key,
                strSql: totalarrSql[totalsqlIndex].sql,
                queryInfo: totalarrSql[totalsqlIndex].query
            }
        }).then(function(response){
            // console.log("Hey I got something", response.data.records);
            fetchTotalForce(response);
        });
    };



    /////////////
    // same as the totals authentication function above
    ////////////

    var getSalesforce = function(data){

        if (!forceresponse.accessToken){
            //console.log("I want to do a check in getSalesforce to see if I need to auth. ", forceresponse.accessToken);
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


    /////////////
    // same as the fetch totals function above.
    /////////////


    var fetchForce = function(forceResult){

        //console.log("in fetch force, forceResult=", forceResult);
        if(forceResult){

            arrResults.push(forceResult.data);

            sqlIndex = arrResults.length;
            //console.log("sql index", sqlIndex);


            if (arrResults.length == arrSql.length){
                // we are done
                forceData.arrResults = arrResults;
                getGoals(endDate);
                sortResults(arrResults);
                return;
            }

        }

        //console.log("getting ready to get in fetch. sqlIndex=", sqlIndex);
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


    // Sort results is a function that takes the salesforce information and creates new objects that are
    // formatted properly to fit on our tables
    var sortResults = function(resultsArrays){
        arrResults = [];
        arrSql = [];
        Sqlobj = {};
        sqlIndex = 0;
        myKey = "";
        strSql = "";
        // account is a holder object for properly sorted information
        var account = {};
        account.total = [];

        // this loop goes through and makes sure that we dont have any null category values and removes them before we create new objects
        for(var i = 0; i < resultsArrays.length; i++) {
                for(var m = 0; m < resultsArrays[i].result.records.length; m++){
                    if(resultsArrays[i].result.records[m].Donation_SubCategory__c === null){
                        resultsArrays[i].result.records.splice(m,1);
                }
            }
        }
        //console.log(resultsArrays);
        // loops through the saleforce results and rebuilds them into properly formatted objects
        // assigns those objects in the correct position of the array to display on the view.
        for (var j = 0 ; j < resultsArrays[0].result.records.length ; j++){
            account.type = resultsArrays[0].result.records[j].Donation_SubCategory__c;
            account.total[0] = resultsArrays[0].result.records[j].expr0;
            account.total[1] = resultsArrays[1].result.records[j].expr0;
            account.total[2] = resultsArrays[2].result.records[j].expr0;
            account.total[3] = resultsArrays[3].result.records[j].expr0;
            account.total[4] = resultsArrays[4].result.records[j].expr0;
            accountArray[j]= new Account(account.type, account.total[0], account.total[1], account.total[2], account.total[3], account.total[4]);
      }

        console.log("did this actually work?!?!?", accountArray);

    };

    ////////
    // object constructor for building the money raised table objects.
    ///////
    function Account (type,ytd,ytdM1,ytdM2,tfyM1,tfyM2){
        this.type = type;
        this.ytd = ytd;
        this.ytdM1=ytdM1;
        this.ytdM2=ytdM2;
        this.tfyM1=tfyM1;
        this.tfyM2=tfyM2;
        this.goal = 0;
        this.percentOfGoal = 0;
        this.percentToGoal = 0;

    }

    //////////////
    // make a call to the goals collection and grab the yearly goals for that specific year.
    ////////////
    var getGoals = function(endDate) {
        var date = endDate.date;
        date = new Date(date);
        console.log('date in get goals', date);
        var month = date.getMonth();
        var year = new Date();

        if(month < 8) {
          year = date.getFullYear();
        } else {
            year= date.getFullYear() + 1 ;
        }
        console.log('year in goals get call' , year);

        $http.get('/goals/getYear/'+ year).then(function(response){
            //console.log('getting goals in money raised ', response.data);
            goals.object = response.data;
            setGoals();
        });
    };


    //////////////
    // assign the goals returned from our database.
    // then calls functions to set up the rest of the table.
    //////////////

    var setGoals = function(){
        //console.log('goals in set goals function',goals);
        accountArray[0].goal = goals.object[0].yearly_totals.staff_year;
        accountArray[1].goal = goals.object[0].yearly_totals.board_year;
        accountArray[2].goal = goals.object[0].yearly_totals.committee_year;
        accountArray[3].goal = goals.object[0].yearly_totals.parent_year;
        accountArray[4].goal = goals.object[0].yearly_totals.alum_year;
        accountArray[5].goal = goals.object[0].yearly_totals.participant_year;
        accountArray[6].goal = goals.object[0].yearly_totals.community_year;
        accountArray[7].goal = goals.object[0].yearly_totals.corporate_organization_year;
        accountArray[8].goal = goals.object[0].yearly_totals.corporate_match_year;
        accountArray[9].goal = goals.object[0].yearly_totals.corporate_foundation_year;
        accountArray[10].goal = goals.object[0].yearly_totals.family_foundation_year;
        accountArray[11].goal = goals.object[0].yearly_totals.general_foundation_year;
        buildTotalObject();
        setPercentToGoal(accountArray);
        setPercentOfGoal(accountArray);
    };


    /////////////
    // sets the percent to goal column in the array of objects to be displayed on the view.
    //////////////
    var setPercentToGoal = function(accountArray){
        for(var i = 0; i < accountArray.length; i++){
            var total = accountArray[i].ytd;
            //console.log('ytd total',total);
            var goal = accountArray[i].goal;
            //console.log('current goal',goal);
            var percentToGoal = total/goal;
            percentToGoal = percentToGoal * 100;
            percentToGoal = Math.round(percentToGoal);
            //console.log(percentToGoal);
            accountArray[i].percentToGoal = percentToGoal;
        }

    };

    //////////////////
    // sets the percent of goal column in the array of objects to be displayed on the view.
    /////////////////


    var setPercentOfGoal = function(accountArray){
        //console.log('totalforcedata',totalforceData);
      //console.log('ytd total',totalforceData.totalarrResults[0].result.records[0].expr0);
        var total = totalforceData.totalarrResults[0].result.records[0].expr0;
        total = Math.round(total);
        //console.log(total);
        var goal = 0;
        for(var i = 0; i < accountArray.length; i++){
            goal = accountArray[i].ytd;
            //console.log('current goal',goal);
            var percentOfGoal = goal/total;
            percentOfGoal = percentOfGoal * 100;
            percentOfGoal = Math.round(percentOfGoal);
            //console.log(percentOfGoal);
            accountArray[i].percentOfGoal = percentOfGoal;
        }
            //buildTotalObject();
            clearTotals();

    };

    //////////////
    // builds the object that contains the totals for each column and then makes sure it is in the last position
    // of the array that is displayed in the view.
    /////////////

    var buildTotalObject = function (){
        //console.log("in build object");
        totalObject = {
            type :"Totals",
            ytd : totalforceData.totalarrResults[0].result.records[0].expr0,
            ytdM1 : totalforceData.totalarrResults[1].result.records[0].expr0,
            ytdM2 :totalforceData.totalarrResults[2].result.records[0].expr0 ,
            tfyM1 : totalforceData.totalarrResults[3].result.records[0].expr0,
            tfyM2 : totalforceData.totalarrResults[4].result.records[0].expr0,
            goal : goals.object[0].yearly_totals.year_total,
            percentOfGoal : 0,
            percentToGoal : 0
        };
        var index = accountArray.length;
        if (index >= 12) {
            index = 12;
        }
        accountArray[index] = totalObject;
        //console.log('array with totals',accountArray);

        //clearTotals();
    };

    /////////////////
    // needed another function to handle async issues between the two different salesforce calls being made
    // this one creates the total object the first time through before the goals have returned, in future calls
    // to salesforce this updates the totals correctly and allows the goals and totals to change in sync with
    // the other data.
    //
    /////////////////
    var updateTotalObject = function(){
        //console.log('in update totals');
        //console.log(goals.object[0].yearly_totals.year_total);
        totalObject = {
            type :"Totals",
            ytd : totalforceData.totalarrResults[0].result.records[0].expr0,
            ytdM1 : totalforceData.totalarrResults[1].result.records[0].expr0,
            ytdM2 :totalforceData.totalarrResults[2].result.records[0].expr0 ,
            tfyM1 : totalforceData.totalarrResults[3].result.records[0].expr0,
            tfyM2 : totalforceData.totalarrResults[4].result.records[0].expr0,
            goal : goals.object[0].yearly_totals.year_total ,
            percentOfGoal : 0,
            percentToGoal : 0
        };
        var index = accountArray.length;
        if (index >= 12) {
            index = 12;
        }
        //console.log("totals",totalObject);
        accountArray[index] = totalObject;
        //console.log('array with totals',accountArray);
        setPercentToGoal(accountArray);
        setPercentOfGoal(accountArray);
    };

    //////
    // resets the variables needed to preform the totals queries.
    ///////
    var clearTotals = function(){
        totalarrResults = [];
        totalarrSql = [];
        totalsqlIndex = 0;

    };


    return{

        getSalesforce : getSalesforce,
        moneyRaised : moneyRaised,
        data : data,
        forceData : forceData,
        forceresponse : forceresponse,
        arrResults : arrResults,
        fetchForce : fetchForce,
        accountArray:accountArray,
        getTotals:getTotals,
        setEndDate:setEndDate,
        endDate : endDate
    };


}]);
