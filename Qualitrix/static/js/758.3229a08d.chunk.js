"use strict";(self.webpackChunkqaautomater=self.webpackChunkqaautomater||[]).push([[758],{758:function(e,t,n){t.Dy=void 0;var r=i(n(5648)),o=i(n(7663)),a=i(n(2481)),u=n(274);function i(e){return e&&e.__esModule?e:{default:e}}t.ZP=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{createContext:r.default,createEditingCell:a.default,withRowLevelCellEdit:o.default,DBCLICK_TO_CELL_EDIT:u.DBCLICK_TO_CELL_EDIT,DELAY_FOR_DBCLICK:u.DELAY_FOR_DBCLICK,options:e}};t.Dy=u.EDITTYPE},6547:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(l){o=!0,a=l}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(7313),i=c(u),l=c(n(6123)),s=c(n(5192));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={checked:e.defaultValue.toString()===e.value.split(":")[0]},n.handleChange=n.handleChange.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this.props.didMount;this.checkbox.focus(),e&&e()}},{key:"getValue",value:function(){var e=this.props.value.split(":"),t=o(e,2),n=t[0],r=t[1];return this.checkbox.checked?n:r}},{key:"handleChange",value:function(e){this.props.onChange&&this.props.onChange(e);var t=e.target;this.setState((function(){return{checked:t.checked}}))}},{key:"render",value:function(){var e=this,t=this.props,n=(t.defaultValue,t.didMount,t.className),o=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["defaultValue","didMount","className"]),a=(0,l.default)("editor edit-chseckbox checkbox",n);return i.default.createElement("input",r({ref:function(t){return e.checkbox=t},type:"checkbox",className:a},o,{checked:this.state.checked,onChange:this.handleChange}))}}]),t}(u.Component);f.propTypes={className:s.default.oneOfType([s.default.string,s.default.object]),value:s.default.string,defaultValue:s.default.any,onChange:s.default.func,didMount:s.default.func},f.defaultProps={className:"",value:"on:off",defaultValue:!1,onChange:void 0,didMount:void 0},t.default=f},274:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.TIME_TO_CLOSE_MESSAGE=3e3,t.DELAY_FOR_DBCLICK=200,t.CLICK_TO_CELL_EDIT="click",t.DBCLICK_TO_CELL_EDIT="dbclick",t.EDITTYPE={TEXT:"text",SELECT:"select",TEXTAREA:"textarea",CHECKBOX:"checkbox",DATE:"date"}},5648:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.Consumer=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=l(n(7313)),u=l(n(5192)),i=n(274);function l(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var c=a.default.createContext();t.default=function(e,t,n,l){var f=function(u){function i(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e));return t.doUpdate=t.doUpdate.bind(t),t.startEditing=t.startEditing.bind(t),t.escapeEditing=t.escapeEditing.bind(t),t.completeEditing=t.completeEditing.bind(t),t.handleCellUpdate=t.handleCellUpdate.bind(t),t.state={ridx:null,cidx:null,message:null},t}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,u),o(i,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.cellEdit&&n()&&(e.cellEdit.options.errorMessage?this.setState((function(){return{message:e.cellEdit.options.errorMessage}})):this.escapeEditing())}},{key:"handleCellUpdate",value:function(n,r,o){var a=this,u=t.typeConvert(r.type,o),i=this.props.cellEdit.options.beforeSaveCell,l=e.get(n,r.dataField);if(e.isFunction(i)){var s=i(l,u,n,r,(function(){arguments.length>0&&void 0!==arguments[0]&&!arguments[0]?a.escapeEditing():a.doUpdate(n,r,u)}));if(e.isObject(s)&&s.async)return}this.doUpdate(n,r,u)}},{key:"doUpdate",value:function(r,o,a){var u=this.props,i=u.keyField,s=u.cellEdit,c=u.data,f=s.options.afterSaveCell,d=e.get(r,i),p=e.get(r,o.dataField);n()?l(d,o.dataField,a):(t.editCell(c,i,d,o.dataField,a),e.isFunction(f)&&f(p,a,r,o),this.completeEditing())}},{key:"completeEditing",value:function(){this.setState((function(){return{ridx:null,cidx:null,message:null}}))}},{key:"startEditing",value:function(e,t){var n=this,r=this.props.selectRow;r&&!r.clickToEdit&&r.clickToSelect||n.setState((function(){return{ridx:e,cidx:t}}))}},{key:"escapeEditing",value:function(){this.setState((function(){return{ridx:null,cidx:null}}))}},{key:"render",value:function(){var t=this.props.cellEdit,n=t.options,o=n.nonEditableRows,u=(n.errorMessage,s(n,["nonEditableRows","errorMessage"])),i=s(t,["options"]),l=r({},u,i,this.state,{nonEditableRows:e.isDefined(o)?o():[],onStart:this.startEditing,onEscape:this.escapeEditing,onUpdate:this.handleCellUpdate});return a.default.createElement(c.Provider,{value:r({},l)},this.props.children)}}]),i}(a.default.Component);return f.propTypes={data:u.default.array.isRequired,selectRow:u.default.object,options:u.default.shape({mode:u.default.oneOf([i.CLICK_TO_CELL_EDIT,i.DBCLICK_TO_CELL_EDIT]).isRequired,onErrorMessageDisappear:u.default.func,blurToSave:u.default.bool,beforeSaveCell:u.default.func,afterSaveCell:u.default.func,onStartEdit:u.default.func,nonEditableRows:u.default.func,timeToCloseMessage:u.default.number,errorMessage:u.default.any})},{Provider:f}};t.Consumer=c.Consumer},8038:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7313),u=s(a),i=s(n(6123)),l=s(n(5192));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.defaultValue,n=e.didMount;this.date.valueAsDate=new Date(t),this.date.focus(),n&&n()}},{key:"getValue",value:function(){return this.date.value}},{key:"render",value:function(){var e=this,t=this.props,n=(t.defaultValue,t.didMount,t.className),o=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["defaultValue","didMount","className"]),a=(0,i.default)("form-control editor edit-date",n);return u.default.createElement("input",r({ref:function(t){return e.date=t},type:"date",className:a},o))}}]),t}(a.Component);c.propTypes={className:l.default.oneOfType([l.default.string,l.default.object]),defaultValue:l.default.string,didMount:l.default.func},c.defaultProps={className:"",defaultValue:"",didMount:void 0},t.default=c},9529:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7313),u=s(a),i=s(n(6123)),l=s(n(5192));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=e.options;return e.getOptions&&(r=e.getOptions(n.setOptions.bind(n),{row:e.row,column:e.column})||[]),n.state={options:r},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.defaultValue,n=e.didMount;this.select.value=t,this.select.focus(),n&&n()}},{key:"setOptions",value:function(e){this.setState({options:e})}},{key:"getValue",value:function(){return this.select.value}},{key:"render",value:function(){var e=this,t=this.props,n=t.defaultValue,o=(t.didMount,t.getOptions,t.className),a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["defaultValue","didMount","getOptions","className"]),l=(0,i.default)("form-control editor edit-select",o),s=r({},a,{className:l});return u.default.createElement("select",r({},s,{ref:function(t){return e.select=t},defaultValue:n}),this.state.options.map((function(e){var t=e.label,n=e.value;return u.default.createElement("option",{key:n,value:n},t)})))}}]),t}(a.Component);c.propTypes={row:l.default.object.isRequired,column:l.default.object.isRequired,defaultValue:l.default.oneOfType([l.default.string,l.default.number]),className:l.default.string,style:l.default.object,options:l.default.oneOfType([l.default.arrayOf(l.default.shape({label:l.default.string,value:l.default.any}))]),didMount:l.default.func,getOptions:l.default.func},c.defaultProps={className:"",defaultValue:"",style:{},options:[],didMount:void 0,getOptions:void 0},t.default=c},2481:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=i(n(7313)),a=n(5648),u=i(n(9827));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){var n=(0,u.default)(e,t);return function(t){return o.default.createElement(a.Consumer,null,(function(a){return function(t,a){var u=e.get(t.row,t.column.dataField),i=t.column.editCellStyle||{},l=t.column.editCellClasses;return e.isFunction(t.column.editCellStyle)&&(i=t.column.editCellStyle(u,t.row,t.rowIndex,t.columnIndex)),e.isFunction(t.column.editCellClasses)&&(l=t.column.editCellClasses(u,t.row,t.rowIndex,t.columnIndex)),o.default.createElement(n,r({},t,{className:l,style:i},a))}(t,a)}))}}},9827:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7313),u=v(a),i=v(n(6123)),l=v(n(5192)),s=v(n(9529)),c=v(n(9330)),f=v(n(6547)),d=v(n(8038)),p=v(n(7385)),y=v(n(3938)),h=n(274);function v(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t){var n,v;return v=n=function(n){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.indicatorTimer=null,t.clearTimer=t.clearTimer.bind(t),t.handleBlur=t.handleBlur.bind(t),t.handleClick=t.handleClick.bind(t),t.handleKeyDown=t.handleKeyDown.bind(t),t.beforeComplete=t.beforeComplete.bind(t),t.asyncbeforeCompete=t.asyncbeforeCompete.bind(t),t.displayErrorMessage=t.displayErrorMessage.bind(t),t.state={invalidMessage:null},t}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,n),o(a,[{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"UNSAFE_componentWillReceiveProps",value:function(t){var n=t.message;e.isDefined(n)&&(this.createTimer(),this.setState((function(){return{invalidMessage:n}})))}},{key:"clearTimer",value:function(){this.indicatorTimer&&clearTimeout(this.indicatorTimer)}},{key:"createTimer",value:function(){var t=this;this.clearTimer();var n=this.props,r=n.timeToCloseMessage,o=n.onErrorMessageDisappear;this.indicatorTimer=e.sleep((function(){t.setState((function(){return{invalidMessage:null}})),e.isFunction(o)&&o()}),r)}},{key:"displayErrorMessage",value:function(e){this.setState((function(){return{invalidMessage:e}})),this.createTimer()}},{key:"asyncbeforeCompete",value:function(e){var t=this;return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{valid:!0},r=n.valid,o=n.message,a=t.props,u=a.onUpdate,i=a.row,l=a.column;r?u(i,l,e):t.displayErrorMessage(o)}}},{key:"beforeComplete",value:function(t){var n=this.props,r=n.onUpdate,o=n.row,a=n.column;if(e.isFunction(a.validator)){var u=a.validator(t,o,a,this.asyncbeforeCompete(t));if(e.isObject(u)){if(u.async)return;if(!u.valid)return void this.displayErrorMessage(u.message)}}r(o,a,t)}},{key:"handleBlur",value:function(){var e=this.props,t=e.onEscape;e.blurToSave?this.beforeComplete(this.editor.getValue()):t()}},{key:"handleKeyDown",value:function(e){var t=this.props.onEscape;27===e.keyCode?t():13===e.keyCode&&this.beforeComplete(this.editor.getValue())}},{key:"handleClick",value:function(e){"TD"!==e.target.tagName&&e.stopPropagation()}},{key:"render",value:function(){var n=this,o=void 0,a=this.props,l=a.row,v=a.column,b=a.className,m=a.style,O=a.rowIndex,g=a.columnIndex,_=a.autoSelectText,E=v.dataField,C=e.get(l,E),w=e.isDefined(this.state.invalidMessage),T=v.editorClasses||"";e.isFunction(v.editorClasses)&&(T=v.editorClasses(C,l,O,g));var j=v.editorStyle||{};e.isFunction(v.editorStyle)&&(j=v.editorStyle(C,l,O,g));var M={ref:function(e){return n.editor=e},defaultValue:C,style:j,className:(0,i.default)({animated:w,shake:w},T),onKeyDown:this.handleKeyDown,onBlur:this.handleBlur};t&&(M.didMount=function(){return t(l,v,O,g)});var k=e.isObject(v.editor);return k?M=r({},M,v.editor):e.isFunction(v.editorRenderer)&&(M=r({},M,{onUpdate:this.beforeComplete})),o=e.isFunction(v.editorRenderer)?v.editorRenderer(M,C,l,v,O,g):k&&v.editor.type===h.EDITTYPE.SELECT?u.default.createElement(s.default,r({},M,{row:l,column:v})):k&&v.editor.type===h.EDITTYPE.TEXTAREA?u.default.createElement(c.default,r({},M,{autoSelectText:_})):k&&v.editor.type===h.EDITTYPE.CHECKBOX?u.default.createElement(f.default,M):k&&v.editor.type===h.EDITTYPE.DATE?u.default.createElement(d.default,M):u.default.createElement(p.default,r({},M,{autoSelectText:_})),u.default.createElement("td",{className:(0,i.default)("react-bootstrap-table-editing-cell",b),style:m,onClick:this.handleClick},o,w?u.default.createElement(y.default,{invalidMessage:this.state.invalidMessage}):null)}}]),a}(a.Component),n.propTypes={row:l.default.object.isRequired,rowIndex:l.default.number.isRequired,column:l.default.object.isRequired,columnIndex:l.default.number.isRequired,onUpdate:l.default.func.isRequired,onEscape:l.default.func.isRequired,timeToCloseMessage:l.default.number,autoSelectText:l.default.bool,className:l.default.string,style:l.default.object},n.defaultProps={timeToCloseMessage:h.TIME_TO_CLOSE_MESSAGE,className:null,autoSelectText:!1,style:{}},v}},3938:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(7313)),o=a(n(5192));function a(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=e.invalidMessage;return r.default.createElement("div",{className:"alert alert-danger in",role:"alert"},r.default.createElement("strong",null,t))};u.propTypes={invalidMessage:o.default.string},u.defaultProps={invalidMessage:null},t.default=u},7663:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(7313),u=(r=a)&&r.__esModule?r:{default:r},i=n(274),l=n(5648);t.default=function(e,t){function n(n){return u.default.createElement(l.Consumer,null,(function(r){return function(n,r){var a=n.value,l=!(r.nonEditableRows.length>0&&r.nonEditableRows.indexOf(a)>-1),s={};return t&&r.mode===i.DBCLICK_TO_CELL_EDIT&&(s.DELAY_FOR_DBCLICK=i.DELAY_FOR_DBCLICK),u.default.createElement(e,o({},n,s,{editingRowIdx:r.ridx,editingColIdx:r.cidx,editable:l,onStart:r.onStart,clickToEdit:r.mode===i.CLICK_TO_CELL_EDIT,dbclickToEdit:r.mode===i.DBCLICK_TO_CELL_EDIT}))}(n,r)}))}return n.displayName="WithCellEditingRowConsumer",n}},7385:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7313),u=s(a),i=s(n(6123)),l=s(n(5192));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.defaultValue,n=e.didMount,r=e.autoSelectText;this.text.value=t,this.text.focus(),r&&this.text.select(),n&&n()}},{key:"getValue",value:function(){return this.text.value}},{key:"render",value:function(){var e=this,t=this.props,n=(t.defaultValue,t.didMount,t.className),o=(t.autoSelectText,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["defaultValue","didMount","className","autoSelectText"])),a=(0,i.default)("form-control editor edit-text",n);return u.default.createElement("input",r({ref:function(t){return e.text=t},type:"text",className:a},o))}}]),t}(a.Component);c.propTypes={className:l.default.oneOfType([l.default.string,l.default.object]),defaultValue:l.default.oneOfType([l.default.string,l.default.number]),autoSelectText:l.default.bool,didMount:l.default.func},c.defaultProps={className:null,defaultValue:"",autoSelectText:!1,didMount:void 0},t.default=c},9330:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7313),u=s(a),i=s(n(6123)),l=s(n(5192));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleKeyDown=n.handleKeyDown.bind(n),n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.defaultValue,n=e.didMount,r=e.autoSelectText;this.text.value=t,this.text.focus(),r&&this.text.select(),n&&n()}},{key:"getValue",value:function(){return this.text.value}},{key:"handleKeyDown",value:function(e){(13!==e.keyCode||e.shiftKey)&&this.props.onKeyDown&&this.props.onKeyDown(e)}},{key:"render",value:function(){var e=this,t=this.props,n=(t.defaultValue,t.didMount,t.className),o=(t.autoSelectText,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["defaultValue","didMount","className","autoSelectText"])),a=(0,i.default)("form-control editor edit-textarea",n);return u.default.createElement("textarea",r({ref:function(t){return e.text=t},type:"textarea",className:a},o,{onKeyDown:this.handleKeyDown}))}}]),t}(a.Component);c.propTypes={className:l.default.oneOfType([l.default.string,l.default.object]),defaultValue:l.default.oneOfType([l.default.string,l.default.number]),onKeyDown:l.default.func,autoSelectText:l.default.bool,didMount:l.default.func},c.defaultProps={className:"",defaultValue:"",autoSelectText:!1,onKeyDown:void 0,didMount:void 0},t.default=c}}]);