"use strict";(self.webpackChunkqaautomater=self.webpackChunkqaautomater||[]).push([[295],{5295:function(e,t,s){s.r(t);var n=s(3433),r=s(4165),a=s(5861),i=s(5671),o=s(3144),l=s(136),c=s(7277),d=s(7313),u=s(6075),p=s(6782),h=s(5399),x=s(238),m=s(2527),f=s(3516),b=s(6597),S=s(308),v=s(4209),g=s(1781),T=s(4660),Z=s(9327),C=s(5977),y=s(5374),j=s(8944),E=s(6518),w=s(3701),F=(s(4100),s(44),s(4118)),D=s(9370),O=s(8731),L=s(6939),R=s.n(L),P=s(6620),k=s(580),I=s.n(k),A=s(207),N=s(4104),X=s(3536),B=s(6417),G=function(e){(0,l.Z)(s,e);var t=(0,c.Z)(s);function s(){var e;(0,i.Z)(this,s);for(var o=arguments.length,l=new Array(o),c=0;c<o;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).notificationSystem=d.createRef(),e.state={isPageLoading:!1,environmentList:y.p.EnvironmentList,selectedEnv:y.p.SelectedEnvironment,componentList:y.p.ComponentList,selectedComponent:y.p.SelectedComponent,showErrorOnEnvironment:!1,showErrorOnComponent:!1,threadList:y.p.ThreadList,threadCount:y.p.ThreadCount,testingType:y.p.TestingType,reportingInDashboard:y.p.ReportingInDashboard,listOfTestScripts:y.p.ListOfTestScripts,selectedTestScripts:y.p.SelectedTestScripts,executionProgressBar:!1,totalPassFailInLastXResults:y.p.TotalPassFailInLastXResults,barChartDataForComponent:y.p.BarChartDataForComponent,assertionResultsForAllResults:y.p.AssertionResultsForAllResults,responseDataForAllResults:y.p.ResponseDataForAllResults,executionTimeGraphXaxis:y.p.ExecutionTimeGraphXaxis,executionTimeGraphYaxis:y.p.ExecutionTimeGraphYaxis,executionTimeColor:y.p.ExecutionTimeColor},e.selectEnv=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({showErrorOnEnvironment:!1}),t.next=3,s.target.value;case 3:return n=t.sent,t.t0=e.state.selectedEnv,t.next=7,n;case 7:if(t.t1=t.sent,t.t0===t.t1){t.next=18;break}return t.t2=e,t.next=12,n;case 12:return t.t3=t.sent,t.t4={selectedEnv:t.t3},t.t2.setState.call(t.t2,t.t4),t.next=17,n;case 17:y.p.SelectedEnvironment=t.sent;case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.selectComponent=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({showErrorOnComponent:!1}),t.next=3,s.target.value;case 3:return n=t.sent,t.t0=e.state.selectedComponent,t.next=7,n;case 7:if(t.t1=t.sent,t.t0===t.t1){t.next=18;break}return t.t2=e,t.next=12,n;case 12:return t.t3=t.sent,t.t4={selectedComponent:t.t3},t.t2.setState.call(t.t2,t.t4),t.next=17,n;case 17:y.p.SelectedComponent=t.sent;case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.selectThreadCount=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.target.value;case 2:return n=t.sent,t.t0=e.state.threadCount,t.next=6,n;case 6:if(t.t1=t.sent,t.t0===t.t1){t.next=17;break}return t.t2=e,t.next=11,n;case 11:return t.t3=t.sent,t.t4={threadCount:t.t3},t.t2.setState.call(t.t2,t.t4),t.next=16,n;case 16:y.p.ThreadCount=t.sent;case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.selectTestingType=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.target.value;case 2:return n=t.sent,t.t0=e.state.testingType,t.next=6,n;case 6:if(t.t1=t.sent,t.t0===t.t1){t.next=17;break}return t.t2=e,t.next=11,n;case 11:return t.t3=t.sent,t.t4={testingType:t.t3},t.t2.setState.call(t.t2,t.t4),t.next=16,n;case 16:y.p.TestingType=t.sent;case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.selectReportingInDashBoard=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.target.value;case 2:return n=t.sent,t.t0=e.state.reportingInDashboard,t.next=6,n;case 6:if(t.t1=t.sent,t.t0===t.t1){t.next=19;break}return t.t2=e,t.next=11,n;case 11:return t.t3=t.sent,t.t4={reportingInDashboard:t.t3},t.t2.setState.call(t.t2,t.t4),t.next=16,n;case 16:return t.next=18,t.sent;case 18:y.p.ReportingInDashboard=t.sent;case 19:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleOnSelect=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s,a){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a;case 2:if(!t.sent){t.next=6;break}e.setState((function(){return{selectedTestScripts:[].concat((0,n.Z)(e.state.selectedTestScripts),[s.id])}})),t.next=7;break;case 6:e.setState((function(){return{selectedTestScripts:e.state.selectedTestScripts.filter((function(e){return e!==s.id}))}}));case 7:y.p.SelectedTestScripts=e.state.selectedTestScripts;case 8:case"end":return t.stop()}}),t)})));return function(e,s){return t.apply(this,arguments)}}(),e.handleOnSelectAll=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state.listOfTestScripts.map((function(e){return e.id})),s?e.setState((function(){return{selectedTestScripts:n}})):e.setState((function(){return{selectedTestScripts:[]}})),y.p.SelectedTestScripts=e.state.selectedTestScripts;case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.ExecuteAPIScripts=(0,a.Z)((0,r.Z)().mark((function t(){var s,n,a,i,o;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==(s=e.state.selectedEnv)&&void 0!==s){t.next=6;break}return e.setState({showErrorOnEnvironment:!0}),t.next=5,e.getNotification("error","Please select Environment before test script execution.");case 5:return t.abrupt("return",t.sent);case 6:if(n=e.state.threadCount,a=e.state.testingType,i=e.state.reportingInDashboard,0!==(o=e.state.selectedTestScripts).length){t.next=16;break}return t.next=13,e.getNotification("error","Please select atleast one test script for execution");case 13:return t.abrupt("return",t.sent);case 16:return e.setState({executionProgressBar:!0}),t.t0=E.Z,t.next=20,s;case 20:return t.t1=t.sent,t.t2=n,t.t3=a,t.t4=i,t.t5=o,t.next=27,t.t0.executeAPITestScripts.call(t.t0,t.t1,t.t2,t.t3,t.t4,t.t5);case 27:return e.setState({listOfTestScripts:[]},(function(){e.setState({listOfTestScripts:y.p.ListOfTestScripts})})),e.setState({totalPassFailInLastXResults:y.p.TotalPassFailInLastXResults}),e.setState({barChartDataForComponent:y.p.BarChartDataForComponent}),e.setState({executionTimeGraphXaxis:y.p.ExecutionTimeGraphXaxis}),e.setState({executionTimeGraphYaxis:y.p.ExecutionTimeGraphYaxis}),t.next=34,X.Z.gerHexaColorCodeForArray(1);case 34:y.p.ExecutionTimeColor=t.sent,e.setState({executionTimeColor:y.p.ExecutionTimeColor}),e.setState({executionProgressBar:!1});case 37:case"end":return t.stop()}}),t)}))),e}return(0,o.Z)(s,[{key:"componentDidMount",value:function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.scrollTo(0,0),e.next=3,E.Z.apiExecutionLabPageLoadData();case 3:return this.setState({environmentList:y.p.EnvironmentList}),this.setState({selectedEnv:y.p.SelectedEnvironment}),this.setState({componentList:y.p.ComponentList}),this.setState({selectedComponent:y.p.SelectedComponent}),this.setState({threadList:y.p.ThreadList}),this.setState({threadCount:y.p.ThreadCount}),this.setState({testingType:y.p.TestingType}),this.setState({reportingInDashboard:y.p.ReportingInDashboard}),this.setState({executionProgressBar:!1}),this.setState({listOfTestScripts:y.p.ListOfTestScripts}),this.setState({selectedTestScripts:y.p.SelectedTestScripts}),this.setState({totalPassFailInLastXResults:y.p.TotalPassFailInLastXResults}),this.setState({barChartDataForComponent:y.p.BarChartDataForComponent}),this.setState({executionTimeGraphXaxis:y.p.ExecutionTimeGraphXaxis}),this.setState({executionTimeGraphYaxis:y.p.ExecutionTimeGraphYaxis}),e.next=20,X.Z.gerHexaColorCodeForArray(1);case 20:y.p.ExecutionTimeColor=e.sent,this.setState({executionTimeColor:y.p.ExecutionTimeColor});case 22:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getNotification",value:function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,s){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.notificationSystem.current.addNotification({message:s,level:t});case 2:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()},{key:"LoadTestScripts",value:function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({selectedTestScripts:[]}),y.p.SelectedTestScripts=[],this.setState({listOfTestScripts:[]}),y.p.ListOfTestScripts=[],""!==(t=this.state.selectedComponent)&&void 0!==t){e.next=10;break}return this.setState({showErrorOnComponent:!0}),e.next=9,this.getNotification("error","Component can not be left blank.");case 9:return e.abrupt("return",e.sent);case 10:return e.next=12,this.setState({isPageLoading:!0});case 12:return e.next=14,E.Z.getAllTestScriptsfromComponent(y.p.SelectedComponent);case 14:return e.next=16,this.setState({isPageLoading:!1});case 16:this.setState({listOfTestScripts:y.p.ListOfTestScripts});case 17:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"showTestResults",value:function(e){var t="default",s=[];void 0!==y.p.AssertionResultsForAllResults[e.id]&&(s=y.p.AssertionResultsForAllResults[e.id]);var n={};return void 0!==y.p.ResponseDataForAllResults[e.id]&&(n=y.p.ResponseDataForAllResults[e.id]),"Pass"===y.p.ListOfTestScripts[Number(e.id)-1].status&&(t="#17E798"),"Fail"===y.p.ListOfTestScripts[Number(e.id)-1].status&&(t="#FF5733"),(0,B.jsxs)(p.Z,{children:[(0,B.jsx)(h.Z,{lg:6,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{style:{borderColor:t},children:[(0,B.jsx)(m.Z,{children:"Expected vs Actual"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(h.Z,{children:(0,B.jsx)(w.Z,{keyField:"id",data:s,columns:D.Fp,wrapperClasses:"table-responsive",striped:!0,hover:!0,condensed:!0})})})]})}),(0,B.jsx)(h.Z,{lg:6,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{style:{borderColor:t},children:[(0,B.jsx)(m.Z,{children:"Test results data"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(h.Z,{children:(0,B.jsx)(I(),{name:!1,collapsed:!0,collapseStringsAfterLength:25,displayDataTypes:!1,indentWidth:0,iconStyle:"circle",src:n})})})]})})]})}},{key:"render",value:function(){var e={mode:"checkbox",selected:this.state.selectedTestScripts,onSelect:this.handleOnSelect,onSelectAll:this.handleOnSelectAll},t={showExpandColumn:!0,expandByColumnOnly:!1,renderer:this.showTestResults};return(0,B.jsxs)(u.Z,{className:"ExecutionLabPage",title:"Api Test Execution Lab",children:[(0,B.jsx)(R(),{ref:this.notificationSystem}),this.state.isPageLoading&&(0,B.jsx)(A.Z,{sentences:N.b,height:"150%",color:"black"}),(0,B.jsxs)(p.Z,{children:[(0,B.jsx)(h.Z,{lg:6,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:"select Environment and component*"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(b.Z,{children:(0,B.jsxs)(S.Z,{row:!0,children:[(0,B.jsx)(v.Z,{sm:6,children:"Environment*"}),(0,B.jsx)(h.Z,{children:(0,B.jsx)(g.Z,{type:"select",invalid:this.state.showErrorOnEnvironment,onChange:this.selectEnv.bind(this),name:"envList",value:this.state.selectedEnv,children:(0,B.jsx)(j.Z,{options:this.state.environmentList})})}),(0,B.jsx)(v.Z,{sm:6,children:"Component*"}),(0,B.jsx)(h.Z,{children:(0,B.jsx)(g.Z,{invalid:this.state.showErrorOnComponent,type:"select",onChange:this.selectComponent.bind(this),name:"componentList",value:this.state.selectedComponent,children:(0,B.jsx)(j.Z,{options:this.state.componentList})})})]})})})]})}),(0,B.jsx)(h.Z,{lg:6,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:"Execution parameter"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(b.Z,{children:(0,B.jsxs)(S.Z,{row:!0,children:[(0,B.jsx)(v.Z,{sm:6,children:"Thread count*"}),(0,B.jsx)(h.Z,{children:(0,B.jsx)(g.Z,{type:"select",name:"threadCount",value:this.state.threadCount,onChange:this.selectThreadCount.bind(this),children:(0,B.jsx)(j.Z,{options:this.state.threadList})})}),(0,B.jsx)(v.Z,{sm:6,children:"Testing type*"}),(0,B.jsx)(h.Z,{children:(0,B.jsxs)(g.Z,{type:"select",name:"testingType",value:this.state.testingType,onChange:this.selectTestingType.bind(this),children:[(0,B.jsx)("option",{children:"Unit Testing"}),(0,B.jsx)("option",{children:"Integration Testing"})]})}),(0,B.jsx)(v.Z,{sm:6,children:"Want to add report in Dashboard*"}),(0,B.jsx)(h.Z,{children:(0,B.jsxs)(g.Z,{type:"select",name:"reportingInDashBoard",value:this.state.reportingInDashboard,onChange:this.selectReportingInDashBoard.bind(this),children:[(0,B.jsx)("option",{children:"Yes"}),(0,B.jsx)("option",{children:"No"})]})})]})})})]})})]}),(0,B.jsx)(p.Z,{children:(0,B.jsx)(h.Z,{lg:12,md:12,sm:12,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:(0,B.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:["API Test Scripts",(0,B.jsxs)(T.Z,{size:"sm",children:[(0,B.jsx)(Z.Z,{color:"dark",name:"loadTestScript",onClick:this.LoadTestScripts.bind(this),children:(0,B.jsx)("small",{children:"Load"})}),(0,B.jsx)(Z.Z,{color:"info",onClick:this.ExecuteAPIScripts.bind(this),children:(0,B.jsx)("small",{children:"Run"})})]})]})}),(0,B.jsxs)(f.Z,{children:[(0,B.jsx)(h.Z,{children:(0,B.jsx)(C.Z,{style:{visibility:this.state.executionProgressBar?"visible":"hidden"},animated:!0,color:"dark",value:100,className:"mb-3"},0)}),(0,B.jsx)(h.Z,{children:(0,B.jsx)(w.Z,{keyField:"id",data:this.state.listOfTestScripts,columns:D.r$,wrapperClasses:"table-responsive",striped:!0,hover:!0,condensed:!0,selectRow:e,filter:(0,F.ZP)(),pagination:(0,P.ZP)(),expandRow:t})})]})]})})}),(0,B.jsxs)(p.Z,{children:[(0,B.jsx)(h.Z,{lg:3,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:"Pass fail count"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(h.Z,{children:(0,B.jsx)(O.LD,{color:["#17E798","#F38295"],labels:["Pass","Fail"],data:this.state.totalPassFailInLastXResults})})})]})}),(0,B.jsx)(h.Z,{lg:5,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:"Component Test Results"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(h.Z,{children:(0,B.jsx)(O.vz,{color:["#17E798","#F38295"],labels:this.state.executionTimeGraphXaxis,data:this.state.barChartDataForComponent})})})]})}),(0,B.jsx)(h.Z,{lg:4,md:6,sm:6,xs:12,children:(0,B.jsxs)(x.Z,{children:[(0,B.jsx)(m.Z,{children:"Execution time in seconds"}),(0,B.jsx)(f.Z,{children:(0,B.jsx)(h.Z,{children:(0,B.jsx)(O.wW,{labels:this.state.executionTimeGraphXaxis,data:this.state.executionTimeGraphYaxis,color:this.state.executionTimeColor})})})]})})]})]})}}]),s}(d.Component);t.default=G},9370:function(e,t,s){s.d(t,{Fp:function(){return o},Rh:function(){return c},dI:function(){return l},r$:function(){return i}});var n=s(4118),r=(s(44),s(4501)),a=s(6417),i=[{dataField:"id",text:"#",headerStyle:{width:"50px"}},{dataField:"component",text:"Component",headerStyle:{width:"110px"},filter:(0,n.DN)({placeholder:"Search",caseSensitive:!1})},{dataField:"testid",text:"Test Id",headerStyle:{width:"80px"},filter:(0,n.DN)({delay:1e3,className:"test-classname",placeholder:"Search"})},{dataField:"testname",text:"Test name",headerStyle:{width:"150px"},filter:(0,n.DN)({delay:1e3,className:"test-classname",placeholder:"Search"})},{dataField:"status",text:"Status",headerStyle:{width:"80px"},style:function(e){return"Fail"===e?{backgroundColor:"#F38295"}:"Pass"===e?{backgroundColor:"#17E798"}:void 0},filter:(0,n.DN)({className:"test-classname",placeholder:"Status"})}],o=[{dataField:"id",text:"#",headerStyle:{width:"30px"}},{dataField:"expression",text:"Expression",headerStyle:{width:"140px"}},{dataField:"function",text:"Function",headerStyle:{width:"100px"}},{dataField:"expected",text:"Expected",headerStyle:{width:"100px"}},{dataField:"actual",text:"Actual",headerStyle:{width:"100px"}}],l=[{dataField:"id",text:"#",headerStyle:{width:"50px"}},{dataField:"component",text:"Component",headerStyle:{width:"110px"},filter:(0,n.DN)({placeholder:"Search",caseSensitive:!1})},{dataField:"testid",text:"Test Id",headerStyle:{width:"80px"},filter:(0,n.DN)({delay:1e3,className:"test-classname",placeholder:"Search"})},{dataField:"testname",text:"Test name",headerStyle:{width:"150px"},filter:(0,n.DN)({delay:1e3,className:"test-classname",placeholder:"Search"})}],c=[{dataField:"id",text:"#",headerStyle:{width:"30px"}},{dataField:"stepdefinition",text:"Step Definition",headerStyle:{width:"200px"},editable:!1},{dataField:"action",text:"Action",headerStyle:{width:"100px"},editable:!1},{dataField:"testdata",text:"Test Data/Error",headerStyle:{width:"200px"},editable:!1},{dataField:"status",text:"Status",headerStyle:{width:"60px"},style:function(e){return"Fail"===e?{backgroundColor:"#F38295"}:"Pass"===e?{backgroundColor:"#17E798"}:void 0},editable:!1},{dataField:"screenshot",text:"Screenshot",headerStyle:{width:"100px"},formatter:function(e){var t="data:image/png;base64, "+e;return(0,a.jsx)("img",{alt:"screenshot",width:"100",height:"50",src:t})},events:{onClick:function(e,t,s,n,a){if(""!==n.screenshot){r.W.IsScreenshotModalOpen=!0;var i="data:image/png;base64, "+n.screenshot;r.W.ImageData=i,r.W.StepsDetailsForScreenshot=n.stepdefinition}}}}]},4501:function(e,t,s){s.d(t,{W:function(){return n}});var n={TotalTestScripts:0,TotalComponents:0,TotalTestScriptsOnLastExecution:0,PassPercentageInLastExecution:0,ModuleScriptCountXaxis:[],ModuleScriptCountYaxis:[],ComponentScriptCountColorCode:["#0E24DE"],EnvironmentList:[],SelectedEnvironment:"",ReportHistoryCounter:10,TotalPassFailInLastXResults:[],TotalPassFailColorCode:["#0C84EF","#EF0C7E"],ExecutionXaxisInLastXResults:[],ExecutionYaxisInLastXResults:[],ExecutionHistoryColorCode:["#186A3B","#CB4335"],ExecutionTimeXaxisInLastXResults:[],ExecutionTimeYaxisInLastXResults:[],ExecutionTimeColorCode:["#0E24DE"],FailedComponentInLastXResults:[],ComponentFailedCountColorCode:["#DA0F25"],PastDateList:[],DayWiseTestScriptDevelopment:[],DayWiseTestExecutionData:[],TestScriptDevelopmentColorCode:["#5A1D75"],TestScriptExecutionColorCode:["#0000FF"],SelectedExecutionDate:"",ListOfExecutionTimeForaDay:[],SelectedExecutionTime:"",TableDataforDetailedReports:[],SelectedTab:"Web",DefaultSaveDaysToReport:10,DefaultSaveDaysToDevelopment:30,ListOfPastDateforDaysToDevelopment:[],IsViewResultButtonDisabled:!0,SelectedReportTotalPassFailData:[[]],SelectedReportListOfTestScripts:[{}],SelectedReportExecutionTimeGraphXaxis:[],SelectedReportExecutionTimeGraphYaxis:[[]],SelectedReportExecutionTimeColor:["#F39C12"],SelectedReportComponentPassFailData:[[]],AssertionResultsForAllResults:{},ResponseDataForAllResults:{},TestingMethod:"Unit Testing",IsScreenshotModalOpen:!1,ImageData:"",StepsDetailsForScreenshot:"",ExecutionTimeForUITestScripts:{},ExistingReportTestExecutionTime:"10 Seconds",ExistingReportExecutionStartFrom:"QAautoMATER",ExistingReportExecutionPlatform:"",ExistingReportExecutionDevice:""}},8731:function(e,t,s){s.d(t,{vz:function(){return h},LD:function(){return u},wW:function(){return m}});var n=s(1413),r=s(6459),a=(s(7313),s(6982),s(788)),i=s(2123),o=s(5743),l=s(3536),c=s(6417);a.kL.register(a.qi,a.u,a.De),a.kL.register(i.Z);var d=function(e){var t=Object.assign({},((0,r.Z)(e),e)),s=(0,n.Z)({},t).labels,a=(0,n.Z)({},t).data,i=(0,n.Z)({},t).color,d=[];if(void 0===i||0===i.length)for(var u=0;u<a.length;u++){Promise.resolve(l.Z.gerHexaColorCode()).then((function(e){d.push(e)}))}else d=i;var p={labels:s,datasets:[{data:a,backgroundColor:d,borderColor:d,borderWidth:2,cutout:"80%",borderRadius:10}]};return(0,c.jsx)(o.$I,{data:p,options:{responsive:!0,plugins:{legend:{position:"bottom",display:!0},datalabels:{color:"white",labels:{title:{font:{weight:"bold"}}},formatter:function(e,t){return e}}}}})};d.defaultProps={labels:[],data:[],color:[]};var u=d;s(3551).ZP.register(i.Z);var p=function(e){for(var t=Object.assign({},((0,r.Z)(e),e)),s=!1,a=(0,n.Z)({},t).labels,i=(0,n.Z)({},t).data,d=(0,n.Z)({},t).color,u=(0,n.Z)({},t).label,p=[],h=0;h<i.length;h++){var x={label:""};x.data=i[h],x.borderColor="#000000",x.borderWidth=2,p.push(x)}if(u.length>0){s=!0;for(var m=0;m<p.length;m++)p[m].label=u[m]}if(void 0===d||0===d.length)for(var f=function(e){Promise.resolve(l.Z.gerHexaColorCode()).then((function(t){p[e].borderColor=t}))},b=0;b<p.length;b++)f(b);else for(var S=0;S<p.length;S++)p[S].borderColor=d[S];var v={labels:a,datasets:p},g={responsive:!0,plugins:{legend:{position:"bottom",display:s}},datalabels:{color:"black",labels:{title:{font:{weight:"bold"}}},formatter:function(e,t){return e}}};return(0,c.jsx)(o.$Q,{options:g,data:v})};p.defaultProps={labels:[],data:[],color:[],label:[]};var h=p,x=function(e){for(var t=Object.assign({},((0,r.Z)(e),e)),s=!1,a=(0,n.Z)({},t).labels,i=(0,n.Z)({},t).data,d=(0,n.Z)({},t).color,u=(0,n.Z)({},t).label,p=[],h=0;h<i.length;h++){var x={label:""};x.data=i[h],x.borderColor="#000000",x.borderWidth=3,x.tension=.1,p.push(x)}if(u.length>0){s=!0;for(var m=0;m<p.length;m++)p[m].label=u[m]}if(void 0===d||0===d.length)for(var f=function(e){Promise.resolve(l.Z.gerHexaColorCode()).then((function(t){p[e].borderColor=t}))},b=0;b<p.length;b++)f(b);else for(var S=0;S<p.length;S++)p[S].borderColor=d[S];var v={responsive:!0,plugins:{legend:{position:"bottom",display:s},datalabels:{color:"black",labels:{title:{font:{weight:"bold"}}},formatter:function(e){return"\n\n"+e}}}},g={labels:a,datasets:p};return(0,c.jsx)(o.x1,{data:g,options:v})};x.defaultProps={labels:[],data:[],color:[],label:[]};var m=x},5977:function(e,t,s){var n=s(7313),r=s(5192),a=s.n(r),i=s(6123),o=s.n(i),l=s(986),c=["children","className","barClassName","cssModule","value","min","max","animated","striped","color","bar","multi","tag","style","barStyle","barAriaValueText","barAriaLabelledBy"];function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},d.apply(this,arguments)}function u(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function p(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?u(Object(s),!0).forEach((function(t){h(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function h(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function x(e,t){if(null==e)return{};var s,n,r=function(e,t){if(null==e)return{};var s,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)s=a[n],t.indexOf(s)>=0||(r[s]=e[s]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)s=a[n],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(r[s]=e[s])}return r}var m={animated:a().bool,bar:a().bool,barAriaLabelledBy:a().string,barAriaValueText:a().string,barClassName:a().string,barStyle:a().object,children:a().node,className:a().string,cssModule:a().object,color:a().string,max:a().oneOfType([a().string,a().number]),min:a().oneOfType([a().string,a().number]),multi:a().bool,striped:a().bool,style:a().object,tag:l.iC,value:a().oneOfType([a().string,a().number])};function f(e){var t=e.children,s=e.className,r=e.barClassName,a=e.cssModule,i=e.value,u=void 0===i?0:i,h=e.min,m=void 0===h?0:h,f=e.max,b=void 0===f?100:f,S=e.animated,v=e.striped,g=e.color,T=e.bar,Z=e.multi,C=e.tag,y=void 0===C?"div":C,j=e.style,E=void 0===j?{}:j,w=e.barStyle,F=void 0===w?{}:w,D=e.barAriaValueText,O=e.barAriaLabelledBy,L=x(e,c),R=(0,l.He)(u)/(0,l.He)(b)*100,P=(0,l.mx)(o()(s,"progress"),a),k={className:(0,l.mx)(o()("progress-bar",T&&s||r,S?"progress-bar-animated":null,g?"bg-".concat(g):null,v||S?"progress-bar-striped":null),a),style:p(p(p({},T?E:{}),F),{},{width:"".concat(R,"%")}),role:"progressbar","aria-valuenow":u,"aria-valuemin":m,"aria-valuemax":b,"aria-valuetext":D,"aria-labelledby":O,children:t};return T?n.createElement(y,d({},L,k)):n.createElement(y,d({},L,{style:E,className:P}),Z?t:n.createElement("div",k))}f.propTypes=m,t.Z=f}}]);