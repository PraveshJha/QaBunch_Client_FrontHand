"use strict";(self.webpackChunkqaautomater=self.webpackChunkqaautomater||[]).push([[794],{8794:function(e,t,r){r.r(t);var n=r(3433),s=r(4165),a=r(5861),i=r(5671),c=r(3144),l=r(136),o=r(7277),u=r(6075),d=r(7313),f=r(106),h=r(6782),x=r(5399),m=r(238),v=r(2527),y=r(3516),C=r(6597),p=r(308),T=r(4209),Z=r(1781),b=r(9327),N=r(4660),g=r(5002),w=r(8758),U=r(2610),k=r(3701),j=(r(4100),r(44),r(758)),S=r(8944),E=r(6939),L=r.n(E),M=r(207),O=r(4104),R=r(8390),D=r(2738),P=r(6417),F=function(e){(0,l.Z)(r,e);var t=(0,o.Z)(r);function r(){var e;(0,i.Z)(this,r);for(var c=arguments.length,l=new Array(c),o=0;o<c;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).notificationSystem=d.createRef(),e.state={isPageLoading:!1,listOfTestCycle:g.M.ListOfTestCycle,currentTestCycle:g.M.CurrentTestCycle,isErrorOnCurrentTestCycle:g.M.IsErrorOnCurrentTestCycle,isErrorOnNewTestCycle:g.M.IsErrorOnNewTestCycle,newTestCycle:g.M.NewTestCycle,envUrlList:g.M.EnvUrlList,selectedRowFromUrlTable:g.M.SelectedRowFromUrlTable,isNameValidforUrlTable:g.M.IsNameValidforUrlTable},e.selectTestCycle=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({isErrorOnCurrentTestCycle:!1}),t.next=3,r.target.value;case 3:return n=t.sent,t.next=6,e.state.currentTestCycle;case 6:return t.t0=t.sent,t.next=9,n;case 9:if(t.t1=t.sent,t.t0===t.t1){t.next=20;break}return t.next=13,n;case 13:return g.M.CurrentTestCycle=t.sent,t.t2=e,t.next=17,n;case 17:t.t3=t.sent,t.t4={currentTestCycle:t.t3},t.t2.setState.call(t.t2,t.t4);case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.addNewTestCycle=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n,a;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({isErrorOnNewTestCycle:!1}),t.next=3,r.target.value;case 3:return n=t.sent,t.next=6,e.state.newTestCycle;case 6:return t.t0=t.sent,t.next=9,n;case 9:if(t.t1=t.sent,t.t0===t.t1){t.next=30;break}return t.next=13,n;case 13:return g.M.NewTestCycle=t.sent,t.t2=e,t.next=17,n;case 17:return t.t3=t.sent,t.t4={newTestCycle:t.t3},t.t2.setState.call(t.t2,t.t4),a=/[^A-Za-z0-9-. ]/gi,t.t5=a,t.next=24,n;case 24:return t.t6=t.sent,t.next=27,t.t5.test.call(t.t5,t.t6);case 27:if(!t.sent){t.next=30;break}g.M.IsErrorOnNewTestCycle=!0,e.setState({isErrorOnNewTestCycle:!0});case 30:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.saveNewCycle=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n,a;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.preventDefault();case 2:return n=e.state.newTestCycle,t.next=5,n.toString().trim();case 5:if(t.t0=t.sent,""!==t.t0){t.next=11;break}return e.setState({isErrorOnNewTestCycle:!0}),t.next=10,e.getNotification("error","New Test Cycle Name can not be blank.");case 10:case 17:case 31:case 40:case 45:return t.abrupt("return",t.sent);case 11:return t.next=13,e.state.isErrorOnNewTestCycle;case 13:if(!t.sent){t.next=18;break}return e.setState({isErrorOnNewTestCycle:!0}),t.next=17,e.getNotification("error","Please add the correct test cycle name.");case 18:return t.t1=D.Z,t.next=21,g.M.ListOfTestCycle;case 21:return t.t2=t.sent,t.next=24,n.toString().trim();case 24:return t.t3=t.sent,t.next=27,t.t1.isValuePresentInArray.call(t.t1,t.t2,t.t3);case 27:if(!t.sent){t.next=32;break}return e.setState({isErrorOnNewTestCycle:!0}),t.next=31,e.getNotification("error","Test Cycle is already exist on server.");case 32:return e.setState({isPageLoading:!0}),t.next=35,w.Z.saveNewTestCycle();case 35:if(a=t.sent,e.setState({isPageLoading:!1}),!a){t.next=43;break}return t.next=40,e.getNotification("success","New Test Cycle is successfully added.");case 43:return t.next=45,e.getNotification("error","Unable to save new Test Cycle because of "+R.D.ErrorMessage);case 46:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.saveCurrentCycle=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n,a;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.preventDefault();case 2:return n=e.state.currentTestCycle,t.next=5,n.toString().trim();case 5:if(t.t0=t.sent,""!==t.t0){t.next=11;break}return e.setState({isErrorOnNewTestCycle:!0}),t.next=10,e.getNotification("error","Current Test Cycle Name can not be blank.");case 10:case 19:case 24:return t.abrupt("return",t.sent);case 11:return e.setState({isPageLoading:!0}),t.next=14,w.Z.saveCurrentTestCycle();case 14:if(a=t.sent,e.setState({isPageLoading:!1}),!a){t.next=22;break}return t.next=19,e.getNotification("success","Current Test Cycle is successfully added.");case 22:return t.next=24,e.getNotification("error","Unable to save Current Test Cycle because of "+R.D.ErrorMessage);case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.addNewUrlForEnvironment=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var a,i,c,l,o;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.preventDefault();case 2:if(!((a=e.state.envUrlList).length>0)){t.next=11;break}if(i=a[a.length-1].name,c=a[a.length-1].url,""!==i.toString().trim()&&""!==c.toString().trim()){t.next=11;break}return e.setState({isNameValidforUrlTable:!1}),t.next=10,e.getNotification("error","Please add the correct Env name and Url from 'ADD NEW ENVIRONMENT' section");case 10:return t.abrupt("return",t.sent);case 11:e.setState({isNameValidforUrlTable:!0}),l=a.length+1,o={id:l,name:"",url:""},e.setState({envUrlList:[].concat((0,n.Z)(e.state.envUrlList),[o])}),g.M.EnvUrlList.push(o);case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.deleteUrlFromUrlTable=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n,a;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.preventDefault();case 2:if(0!==(n=e.state.envUrlList).length){t.next=7;break}return t.next=6,e.getNotification("error","No Environment is found under 'ADD NEW ENVIRONMENT' section");case 6:case 18:return t.abrupt("return",t.sent);case 7:if(!(Number(e.state.selectedRowFromUrlTable)>0&&Number(e.state.selectedRowFromUrlTable)<=n.length)){t.next=15;break}return t.next=10,w.Z.updateRowIdAfterDelete(n,e.state.selectedRowFromUrlTable);case 10:a=t.sent,e.setState({envUrlList:[]},(function(){e.setState({envUrlList:a})})),g.M.EnvUrlList=a,t.next=19;break;case 15:return e.setState({isNameValidforUrlTable:!1}),t.next=18,e.getNotification("error","No Environment is selected for delete.");case 19:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.saveUrlTableData=function(){var t=(0,a.Z)((0,s.Z)().mark((function t(r){var n,a,i,c;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.preventDefault();case 2:if(n=e.state.envUrlList,!e.state.isNameValidforUrlTable){t.next=28;break}if(!(n.length>0)){t.next=11;break}if(a=n[n.length-1].name,i=n[n.length-1].url,""!==a.trim()&&""!==i.trim()){t.next=11;break}return t.next=10,e.getNotification("error","Please add the correct environment and URL in 'ADD NEW ENVIRONMENTs' table");case 10:case 20:case 25:case 30:return t.abrupt("return",t.sent);case 11:return g.M.EnvUrlList=n,e.setState({isPageLoading:!0}),t.next=15,w.Z.saveURLDetails();case 15:if(c=t.sent,e.setState({isPageLoading:!1}),!c){t.next=23;break}return t.next=20,e.getNotification("success","Environment and Url information is successfully saved.");case 23:return t.next=25,e.getNotification("error","Unable to save Environment and Url information because of "+R.D.ErrorMessage);case 26:t.next=31;break;case 28:return t.next=30,e.getNotification("error","Please add the correct value in Environment and URL column");case 31:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.selectRadioButtonFromURlTable=function(t,r){r&&(g.M.SelectedRowFromUrlTable=t.id,e.setState({selectedRowFromUrlTable:t.id}))},e}return(0,c.Z)(r,[{key:"componentDidMount",value:function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.scrollTo(0,0),e.next=3,w.Z.manualConfigPageLoad();case 3:this.setState({listOfTestCycle:g.M.ListOfTestCycle}),this.setState({currentTestCycle:g.M.CurrentTestCycle}),this.setState({isErrorOnCurrentTestCycle:g.M.IsErrorOnCurrentTestCycle}),this.setState({isErrorOnNewTestCycle:g.M.IsErrorOnNewTestCycle}),this.setState({newTestCycle:g.M.NewTestCycle}),this.setState({envUrlList:g.M.EnvUrlList}),this.setState({selectedRowFromUrlTable:g.M.SelectedRowFromUrlTable}),this.setState({isNameValidforUrlTable:g.M.IsNameValidforUrlTable});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getNotification",value:function(){var e=(0,a.Z)((0,s.Z)().mark((function e(t,r){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.notificationSystem.current.addNotification({message:r,level:t});case 2:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e={mode:"radio",onSelect:this.selectRadioButtonFromURlTable,selected:[this.state.selectedRowFromUrlTable]};return(0,P.jsxs)(u.Z,{className:"ConfigurationPage",title:"Test Configuration",children:[this.state.isPageLoading&&(0,P.jsx)(M.Z,{sentences:O.b,height:"150%",color:"black"}),(0,P.jsxs)(f.Z,{in:!this.state.isPageLoading,children:[(0,P.jsx)(L(),{ref:this.notificationSystem}),(0,P.jsxs)(h.Z,{children:[(0,P.jsx)(x.Z,{lg:6,md:6,sm:6,xs:12,children:(0,P.jsxs)(m.Z,{children:[(0,P.jsx)(v.Z,{children:(0,P.jsx)("div",{className:"d-flex justify-content-between align-items-center",children:"Test Configuration"})}),(0,P.jsx)(y.Z,{children:(0,P.jsx)(C.Z,{children:(0,P.jsxs)(p.Z,{col:!0,children:[(0,P.jsxs)(p.Z,{row:!0,children:[(0,P.jsx)(T.Z,{sm:4,children:"Current Test Cycle"}),(0,P.jsx)(x.Z,{sm:6,children:(0,P.jsx)(Z.Z,{type:"select",invalid:this.state.isErrorOnCurrentTestCycle,onChange:this.selectTestCycle.bind(this),name:"testCycle",value:this.state.currentTestCycle,children:(0,P.jsx)(S.Z,{options:this.state.listOfTestCycle})})}),(0,P.jsx)(x.Z,{children:(0,P.jsx)(b.Z,{size:"sm",color:"dark",onClick:this.saveCurrentCycle.bind(this),children:(0,P.jsx)("small",{children:"Save"})})})]}),(0,P.jsxs)(p.Z,{row:!0,children:[(0,P.jsx)(T.Z,{sm:4,children:"Add New Test Cycle"}),(0,P.jsx)(x.Z,{sm:6,children:(0,P.jsx)(Z.Z,{type:"input",invalid:this.state.isErrorOnNewTestCycle,onChange:this.addNewTestCycle.bind(this),name:"newCycle",value:this.state.newTestCycle})}),(0,P.jsx)(x.Z,{children:(0,P.jsx)(b.Z,{color:"dark",size:"sm",onClick:this.saveNewCycle.bind(this),children:(0,P.jsx)("small",{children:"Save"})})})]})]})})})]})}),(0,P.jsx)(x.Z,{lg:6,md:12,sm:12,xs:12,children:(0,P.jsxs)(m.Z,{children:[(0,P.jsx)(v.Z,{children:(0,P.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:["Add new environment",(0,P.jsxs)(N.Z,{size:"sm",children:[(0,P.jsx)(b.Z,{color:"dark",onClick:this.addNewUrlForEnvironment.bind(this),children:(0,P.jsx)("small",{children:"Add"})}),(0,P.jsx)(b.Z,{color:"info",onClick:this.saveUrlTableData.bind(this),children:(0,P.jsx)("small",{children:"Save"})}),(0,P.jsx)(b.Z,{color:"dark",onClick:this.deleteUrlFromUrlTable.bind(this),children:(0,P.jsx)("small",{children:"Delete"})})]})]})}),(0,P.jsx)(y.Z,{children:(0,P.jsx)(x.Z,{children:(0,P.jsx)(k.Z,{keyField:"id",data:this.state.envUrlList,columns:U.D7,wrapperClasses:"table-responsive",striped:!0,hover:!0,condensed:!0,selectRow:e,cellEdit:(0,j.ZP)({mode:"click",blurToSave:!0})})})})]})})]})]})]})}}]),r}(d.Component);t.default=F},6075:function(e,t,r){var n=r(1413),s=r(5987),a=(r(7313),r(6982),r(9174)),i=r(3476),c=r(1583),l=r(5277),o=r(6417),u=["title","breadcrumbs","tag","className","children"],d=a.ZP.create("page"),f=function(e){var t=e.title,r=e.breadcrumbs,a=e.tag,f=e.className,h=e.children,x=(0,s.Z)(e,u),m=d.b("px-3",f);return(0,o.jsxs)(a,(0,n.Z)((0,n.Z)({className:m},x),{},{children:[(0,o.jsxs)("div",{className:d.e("header"),children:[t&&"string"===typeof t?(0,o.jsx)(l.Z,{type:"h1",className:d.e("title"),children:t}):t,r&&(0,o.jsxs)(i.Z,{className:d.e("breadcrumb"),children:[(0,o.jsx)(c.Z,{children:"Home"}),r.length&&r.map((function(e,t){var r=e.name,n=e.active;return(0,o.jsx)(c.Z,{active:n,children:r},t)}))]})]}),h]}))};f.defaultProps={tag:"div",title:""},t.Z=f},5277:function(e,t,r){var n=r(1413),s=r(4942),a=r(5987),i=r(6123),c=r.n(i),l=(r(7313),r(6982),r(6417)),o=["tag","className","type"],u={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"},d=function(e){var t,r=e.tag,i=e.className,d=e.type,f=(0,a.Z)(e,o),h=c()((0,s.Z)({},d,!!d),i);return t=r||(!r&&u[d]?u[d]:"p"),(0,l.jsx)(t,(0,n.Z)((0,n.Z)({},f),{},{className:h}))};d.defaultProps={type:"p"},t.Z=d}}]);