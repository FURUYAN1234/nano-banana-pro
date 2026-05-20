(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function qy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Dh={exports:{}},gc={};var Wx;function $y(){if(Wx)return gc;Wx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return gc.Fragment=e,gc.jsx=i,gc.jsxs=i,gc}var qx;function Ky(){return qx||(qx=1,Dh.exports=$y()),Dh.exports}var x=Ky(),Lh={exports:{}},wt={};var $x;function Zy(){if($x)return wt;$x=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function E(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,S={};function y(P,J,ye){this.props=P,this.context=J,this.refs=S,this.updater=ye||T}y.prototype.isReactComponent={},y.prototype.setState=function(P,J){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,J,"setState")},y.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=y.prototype;function I(P,J,ye){this.props=P,this.context=J,this.refs=S,this.updater=ye||T}var D=I.prototype=new N;D.constructor=I,C(D,y.prototype),D.isPureReactComponent=!0;var V=Array.isArray;function L(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,J,ye){var Oe=ye.ref;return{$$typeof:r,type:P,key:J,ref:Oe!==void 0?Oe:null,props:ye}}function $(P,J){return F(P.type,J,P.props)}function k(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function W(P){var J={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(ye){return J[ye]})}var he=/\/+/g;function oe(P,J){return typeof P=="object"&&P!==null&&P.key!=null?W(""+P.key):J.toString(36)}function Y(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(J){P.status==="pending"&&(P.status="fulfilled",P.value=J)},function(J){P.status==="pending"&&(P.status="rejected",P.reason=J)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function U(P,J,ye,Oe,Fe){var ae=typeof P;(ae==="undefined"||ae==="boolean")&&(P=null);var Me=!1;if(P===null)Me=!0;else switch(ae){case"bigint":case"string":case"number":Me=!0;break;case"object":switch(P.$$typeof){case r:case e:Me=!0;break;case _:return Me=P._init,U(Me(P._payload),J,ye,Oe,Fe)}}if(Me)return Fe=Fe(P),Me=Oe===""?"."+oe(P,0):Oe,V(Fe)?(ye="",Me!=null&&(ye=Me.replace(he,"$&/")+"/"),U(Fe,J,ye,"",function(st){return st})):Fe!=null&&(k(Fe)&&(Fe=$(Fe,ye+(Fe.key==null||P&&P.key===Fe.key?"":(""+Fe.key).replace(he,"$&/")+"/")+Me)),J.push(Fe)),1;Me=0;var Ee=Oe===""?".":Oe+":";if(V(P))for(var We=0;We<P.length;We++)Oe=P[We],ae=Ee+oe(Oe,We),Me+=U(Oe,J,ye,ae,Fe);else if(We=E(P),typeof We=="function")for(P=We.call(P),We=0;!(Oe=P.next()).done;)Oe=Oe.value,ae=Ee+oe(Oe,We++),Me+=U(Oe,J,ye,ae,Fe);else if(ae==="object"){if(typeof P.then=="function")return U(Y(P),J,ye,Oe,Fe);throw J=String(P),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return Me}function G(P,J,ye){if(P==null)return P;var Oe=[],Fe=0;return U(P,Oe,"","",function(ae){return J.call(ye,ae,Fe++)}),Oe}function ee(P){if(P._status===-1){var J=P._result;J=J(),J.then(function(ye){(P._status===0||P._status===-1)&&(P._status=1,P._result=ye)},function(ye){(P._status===0||P._status===-1)&&(P._status=2,P._result=ye)}),P._status===-1&&(P._status=0,P._result=J)}if(P._status===1)return P._result.default;throw P._result}var ge=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Ae={map:G,forEach:function(P,J,ye){G(P,function(){J.apply(this,arguments)},ye)},count:function(P){var J=0;return G(P,function(){J++}),J},toArray:function(P){return G(P,function(J){return J})||[]},only:function(P){if(!k(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return wt.Activity=v,wt.Children=Ae,wt.Component=y,wt.Fragment=i,wt.Profiler=l,wt.PureComponent=I,wt.StrictMode=s,wt.Suspense=m,wt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,wt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},wt.cache=function(P){return function(){return P.apply(null,arguments)}},wt.cacheSignal=function(){return null},wt.cloneElement=function(P,J,ye){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Oe=C({},P.props),Fe=P.key;if(J!=null)for(ae in J.key!==void 0&&(Fe=""+J.key),J)!A.call(J,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&J.ref===void 0||(Oe[ae]=J[ae]);var ae=arguments.length-2;if(ae===1)Oe.children=ye;else if(1<ae){for(var Me=Array(ae),Ee=0;Ee<ae;Ee++)Me[Ee]=arguments[Ee+2];Oe.children=Me}return F(P.type,Fe,Oe)},wt.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},wt.createElement=function(P,J,ye){var Oe,Fe={},ae=null;if(J!=null)for(Oe in J.key!==void 0&&(ae=""+J.key),J)A.call(J,Oe)&&Oe!=="key"&&Oe!=="__self"&&Oe!=="__source"&&(Fe[Oe]=J[Oe]);var Me=arguments.length-2;if(Me===1)Fe.children=ye;else if(1<Me){for(var Ee=Array(Me),We=0;We<Me;We++)Ee[We]=arguments[We+2];Fe.children=Ee}if(P&&P.defaultProps)for(Oe in Me=P.defaultProps,Me)Fe[Oe]===void 0&&(Fe[Oe]=Me[Oe]);return F(P,ae,Fe)},wt.createRef=function(){return{current:null}},wt.forwardRef=function(P){return{$$typeof:h,render:P}},wt.isValidElement=k,wt.lazy=function(P){return{$$typeof:_,_payload:{_status:-1,_result:P},_init:ee}},wt.memo=function(P,J){return{$$typeof:p,type:P,compare:J===void 0?null:J}},wt.startTransition=function(P){var J=B.T,ye={};B.T=ye;try{var Oe=P(),Fe=B.S;Fe!==null&&Fe(ye,Oe),typeof Oe=="object"&&Oe!==null&&typeof Oe.then=="function"&&Oe.then(L,ge)}catch(ae){ge(ae)}finally{J!==null&&ye.types!==null&&(J.types=ye.types),B.T=J}},wt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},wt.use=function(P){return B.H.use(P)},wt.useActionState=function(P,J,ye){return B.H.useActionState(P,J,ye)},wt.useCallback=function(P,J){return B.H.useCallback(P,J)},wt.useContext=function(P){return B.H.useContext(P)},wt.useDebugValue=function(){},wt.useDeferredValue=function(P,J){return B.H.useDeferredValue(P,J)},wt.useEffect=function(P,J){return B.H.useEffect(P,J)},wt.useEffectEvent=function(P){return B.H.useEffectEvent(P)},wt.useId=function(){return B.H.useId()},wt.useImperativeHandle=function(P,J,ye){return B.H.useImperativeHandle(P,J,ye)},wt.useInsertionEffect=function(P,J){return B.H.useInsertionEffect(P,J)},wt.useLayoutEffect=function(P,J){return B.H.useLayoutEffect(P,J)},wt.useMemo=function(P,J){return B.H.useMemo(P,J)},wt.useOptimistic=function(P,J){return B.H.useOptimistic(P,J)},wt.useReducer=function(P,J,ye){return B.H.useReducer(P,J,ye)},wt.useRef=function(P){return B.H.useRef(P)},wt.useState=function(P){return B.H.useState(P)},wt.useSyncExternalStore=function(P,J,ye){return B.H.useSyncExternalStore(P,J,ye)},wt.useTransition=function(){return B.H.useTransition()},wt.version="19.2.3",wt}var Kx;function mm(){return Kx||(Kx=1,Lh.exports=Zy()),Lh.exports}var Ce=mm();const Qy=qy(Ce);var Ih={exports:{}},xc={},Uh={exports:{}},Ph={};var Zx;function Jy(){return Zx||(Zx=1,(function(r){function e(U,G){var ee=U.length;U.push(G);e:for(;0<ee;){var ge=ee-1>>>1,Ae=U[ge];if(0<l(Ae,G))U[ge]=G,U[ee]=Ae,ee=ge;else break e}}function i(U){return U.length===0?null:U[0]}function s(U){if(U.length===0)return null;var G=U[0],ee=U.pop();if(ee!==G){U[0]=ee;e:for(var ge=0,Ae=U.length,P=Ae>>>1;ge<P;){var J=2*(ge+1)-1,ye=U[J],Oe=J+1,Fe=U[Oe];if(0>l(ye,ee))Oe<Ae&&0>l(Fe,ye)?(U[ge]=Fe,U[Oe]=ee,ge=Oe):(U[ge]=ye,U[J]=ee,ge=J);else if(Oe<Ae&&0>l(Fe,ee))U[ge]=Fe,U[Oe]=ee,ge=Oe;else break e}}return G}function l(U,G){var ee=U.sortIndex-G.sortIndex;return ee!==0?ee:U.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],_=1,v=null,g=3,E=!1,T=!1,C=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function D(U){for(var G=i(p);G!==null;){if(G.callback===null)s(p);else if(G.startTime<=U)s(p),G.sortIndex=G.expirationTime,e(m,G);else break;G=i(p)}}function V(U){if(C=!1,D(U),!T)if(i(m)!==null)T=!0,L||(L=!0,W());else{var G=i(p);G!==null&&Y(V,G.startTime-U)}}var L=!1,B=-1,A=5,F=-1;function $(){return S?!0:!(r.unstable_now()-F<A)}function k(){if(S=!1,L){var U=r.unstable_now();F=U;var G=!0;try{e:{T=!1,C&&(C=!1,N(B),B=-1),E=!0;var ee=g;try{t:{for(D(U),v=i(m);v!==null&&!(v.expirationTime>U&&$());){var ge=v.callback;if(typeof ge=="function"){v.callback=null,g=v.priorityLevel;var Ae=ge(v.expirationTime<=U);if(U=r.unstable_now(),typeof Ae=="function"){v.callback=Ae,D(U),G=!0;break t}v===i(m)&&s(m),D(U)}else s(m);v=i(m)}if(v!==null)G=!0;else{var P=i(p);P!==null&&Y(V,P.startTime-U),G=!1}}break e}finally{v=null,g=ee,E=!1}G=void 0}}finally{G?W():L=!1}}}var W;if(typeof I=="function")W=function(){I(k)};else if(typeof MessageChannel<"u"){var he=new MessageChannel,oe=he.port2;he.port1.onmessage=k,W=function(){oe.postMessage(null)}}else W=function(){y(k,0)};function Y(U,G){B=y(function(){U(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(U){U.callback=null},r.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<U?Math.floor(1e3/U):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(U){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var ee=g;g=G;try{return U()}finally{g=ee}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(U,G){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var ee=g;g=U;try{return G()}finally{g=ee}},r.unstable_scheduleCallback=function(U,G,ee){var ge=r.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?ge+ee:ge):ee=ge,U){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=ee+Ae,U={id:_++,callback:G,priorityLevel:U,startTime:ee,expirationTime:Ae,sortIndex:-1},ee>ge?(U.sortIndex=ee,e(p,U),i(m)===null&&U===i(p)&&(C?(N(B),B=-1):C=!0,Y(V,ee-ge))):(U.sortIndex=Ae,e(m,U),T||E||(T=!0,L||(L=!0,W()))),U},r.unstable_shouldYield=$,r.unstable_wrapCallback=function(U){var G=g;return function(){var ee=g;g=G;try{return U.apply(this,arguments)}finally{g=ee}}}})(Ph)),Ph}var Qx;function eE(){return Qx||(Qx=1,Uh.exports=Jy()),Uh.exports}var Fh={exports:{}},Pi={};var Jx;function tE(){if(Jx)return Pi;Jx=1;var r=mm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Pi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Pi.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,_)},Pi.flushSync=function(m){var p=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=_,s.d.f()}},Pi.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Pi.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Pi.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,v=h(_,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,E=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:E}):_==="script"&&s.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:E,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Pi.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Pi.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,v=h(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Pi.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Pi.requestFormReset=function(m){s.d.r(m)},Pi.unstable_batchedUpdates=function(m,p){return m(p)},Pi.useFormState=function(m,p,_){return f.H.useFormState(m,p,_)},Pi.useFormStatus=function(){return f.H.useHostTransitionStatus()},Pi.version="19.2.3",Pi}var e_;function nE(){if(e_)return Fh.exports;e_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Fh.exports=tE(),Fh.exports}var t_;function iE(){if(t_)return xc;t_=1;var r=eE(),e=mm(),i=nE();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var b=!1,R=u.child;R;){if(R===a){b=!0,a=u,o=d;break}if(R===o){b=!0,o=u,a=d;break}R=R.sibling}if(!b){for(R=d.child;R;){if(R===a){b=!0,a=d,o=u;break}if(R===o){b=!0,o=d,a=u;break}R=R.sibling}if(!b)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),I=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var he=Symbol.for("react.client.reference");function oe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===he?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case y:return"Profiler";case S:return"StrictMode";case V:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case T:return"Portal";case I:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case D:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:oe(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return oe(t(n))}catch{}}return null}var Y=Array.isArray,U=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},ge=[],Ae=-1;function P(t){return{current:t}}function J(t){0>Ae||(t.current=ge[Ae],ge[Ae]=null,Ae--)}function ye(t,n){Ae++,ge[Ae]=t.current,t.current=n}var Oe=P(null),Fe=P(null),ae=P(null),Me=P(null);function Ee(t,n){switch(ye(ae,n),ye(Fe,t),ye(Oe,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?gx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=gx(n),t=xx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}J(Oe),ye(Oe,t)}function We(){J(Oe),J(Fe),J(ae)}function st(t){t.memoizedState!==null&&ye(Me,t);var n=Oe.current,a=xx(n,t.type);n!==a&&(ye(Fe,t),ye(Oe,a))}function ut(t){Fe.current===t&&(J(Oe),J(Fe)),Me.current===t&&(J(Me),dc._currentValue=ee)}var kt,Lt;function Xt(t){if(kt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);kt=n&&n[1]||"",Lt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+kt+t+Lt}var rn=!1;function Rt(t,n){if(!t||rn)return"";rn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ve=function(){throw Error()};if(Object.defineProperty(ve.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ve,[])}catch(ce){var le=ce}Reflect.construct(t,[],ve)}else{try{ve.call()}catch(ce){le=ce}t.call(ve.prototype)}}else{try{throw Error()}catch(ce){le=ce}(ve=t())&&typeof ve.catch=="function"&&ve.catch(function(){})}}catch(ce){if(ce&&le&&typeof ce.stack=="string")return[ce.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),b=d[0],R=d[1];if(b&&R){var z=b.split(`
`),re=R.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<re.length&&!re[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===re.length)for(o=z.length-1,u=re.length-1;1<=o&&0<=u&&z[o]!==re[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==re[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==re[u]){var xe=`
`+z[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=u);break}}}finally{rn=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Xt(a):""}function on(t,n){switch(t.tag){case 26:case 27:case 5:return Xt(t.type);case 16:return Xt("Lazy");case 13:return t.child!==n&&n!==null?Xt("Suspense Fallback"):Xt("Suspense");case 19:return Xt("SuspenseList");case 0:case 15:return Rt(t.type,!1);case 11:return Rt(t.type.render,!1);case 1:return Rt(t.type,!0);case 31:return Xt("Activity");default:return""}}function vn(t){try{var n="",a=null;do n+=on(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Vt=Object.prototype.hasOwnProperty,X=r.unstable_scheduleCallback,Jt=r.unstable_cancelCallback,Ut=r.unstable_shouldYield,dn=r.unstable_requestPaint,Ie=r.unstable_now,In=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,M=r.unstable_UserBlockingPriority,Q=r.unstable_NormalPriority,pe=r.unstable_LowPriority,Te=r.unstable_IdlePriority,Ue=r.log,ze=r.unstable_setDisableYieldValue,ue=null,me=null;function Re(t){if(typeof Ue=="function"&&ze(t),me&&typeof me.setStrictMode=="function")try{me.setStrictMode(ue,t)}catch{}}var Ge=Math.clz32?Math.clz32:vt,Be=Math.log,Ne=Math.LN2;function vt(t){return t>>>=0,t===0?32:31-(Be(t)/Ne|0)|0}var lt=256,Bt=262144,H=4194304;function De(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function fe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,b=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=De(o):(b&=R,b!==0?u=De(b):a||(a=R&~t,a!==0&&(u=De(a))))):(R=o&~d,R!==0?u=De(R):b!==0?u=De(b):a||(a=o&~t,a!==0&&(u=De(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Xe(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Le(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function we(){var t=H;return H<<=1,(H&62914560)===0&&(H=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function gt(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Un(t,n,a,o,u,d){var b=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,z=t.expirationTimes,re=t.hiddenUpdates;for(a=b&~a;0<a;){var xe=31-Ge(a),ve=1<<xe;R[xe]=0,z[xe]=-1;var le=re[xe];if(le!==null)for(re[xe]=null,xe=0;xe<le.length;xe++){var ce=le[xe];ce!==null&&(ce.lane&=-536870913)}a&=~ve}o!==0&&en(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(b&~n))}function en(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Ge(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Wn(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Ge(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Li(t,n){var a=n&-n;return a=(a&42)!==0?1:bs(a),(a&(t.suspendedLanes|n))!==0?0:a}function bs(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ai(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ja(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:Gx(t.type))}function Hr(t,n){var a=G.p;try{return G.p=t,n()}finally{G.p=a}}var Xn=Math.random().toString(36).slice(2),Pn="__reactFiber$"+Xn,tn="__reactProps$"+Xn,aa="__reactContainer$"+Xn,Rn="__reactEvents$"+Xn,es="__reactListeners$"+Xn,nr="__reactHandles$"+Xn,ys="__reactResources$"+Xn,Es="__reactMarker$"+Xn;function yo(t){delete t[Pn],delete t[tn],delete t[Rn],delete t[es],delete t[nr]}function ba(t){var n=t[Pn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[aa]||a[Pn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Mx(t);t!==null;){if(a=t[Pn])return a;t=Mx(t)}return n}t=a,a=t.parentNode}return null}function za(t){if(t=t[Pn]||t[aa]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Ga(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ha(t){var n=t[ys];return n||(n=t[ys]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ln(t){t[Es]=!0}var kr=new Set,w={};function q(t,n){K(t,n),K(t+"Capture",n)}function K(t,n){for(w[t]=n,t=0;t<n.length;t++)kr.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),te={},je={};function be(t){return Vt.call(je,t)?!0:Vt.call(te,t)?!1:ne.test(t)?je[t]=!0:(te[t]=!0,!1)}function He(t,n,a){if(be(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function tt(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ze(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function ft(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ct(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ot(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(b){a=""+b,d.call(this,b)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(b){a=""+b},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function nn(t){if(!t._valueTracker){var n=Ct(t)?"checked":"value";t._valueTracker=ot(t,n,""+t[n])}}function pt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=Ct(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function xn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var ln=/[\n"\\]/g;function an(t){return t.replace(ln,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function ke(t,n,a,o,u,d,b,R){t.name="",b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.type=b:t.removeAttribute("type"),n!=null?b==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ft(n)):t.value!==""+ft(n)&&(t.value=""+ft(n)):b!=="submit"&&b!=="reset"||t.removeAttribute("value"),n!=null?Pt(t,b,ft(n)):a!=null?Pt(t,b,ft(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+ft(R):t.removeAttribute("name")}function oi(t,n,a,o,u,d,b,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){nn(t);return}a=a!=null?""+ft(a):"",n=n!=null?""+ft(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"&&(t.name=b),nn(t)}function Pt(t,n,a){n==="number"&&xn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Cn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+ft(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Gn(t,n,a){if(n!=null&&(n=""+ft(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ft(a):""}function Hn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(Y(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ft(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),nn(t)}function hi(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var hn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||hn.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function pi(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Nn(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&Nn(t,d,n[d])}function Nt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ka=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ss=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ts(t){return Ss.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function sa(){}var ki=null;function Va(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ii=null,Ms=null;function Nl(t){var n=za(t);if(n&&(t=n.stateNode)){var a=t[tn]||null;e:switch(t=n.stateNode,n.type){case"input":if(ke(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+an(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[tn]||null;if(!u)throw Error(s(90));ke(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&pt(o)}break e;case"textarea":Gn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&Cn(t,!!a.multiple,n,!1)}}}var Ol=!1;function Dl(t,n,a){if(Ol)return t(n,a);Ol=!0;try{var o=t(n);return o}finally{if(Ol=!1,(Ii!==null||Ms!==null)&&(Tu(),Ii&&(n=Ii,t=Ms,Ms=Ii=null,Nl(n),t)))for(n=0;n<t.length;n++)Nl(t[n])}}function ns(t,n){var a=t.stateNode;if(a===null)return null;var o=a[tn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var yi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ya=!1;if(yi)try{var Ts={};Object.defineProperty(Ts,"passive",{get:function(){ya=!0}}),window.addEventListener("test",Ts,Ts),window.removeEventListener("test",Ts,Ts)}catch{ya=!1}var ra=null,Ll=null,bt=null;function Eo(){if(bt)return bt;var t,n=Ll,a=n.length,o,u="value"in ra?ra.value:ra.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var b=a-t;for(o=1;o<=b&&n[a-o]===u[d-o];o++);return bt=u.slice(t,1<o?1-o:void 0)}function So(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Mo(){return!0}function Il(){return!1}function Ei(t){function n(a,o,u,d,b){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=b,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Mo:Il,this.isPropagationStopped=Il,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Mo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Mo)},persist:function(){},isPersistent:Mo}),n}var As={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},To=Ei(As),ws=v({},As,{view:0,detail:0}),Gc=Ei(ws),Vr,Ao,Ea,Rs=v({},ws,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Se,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ea&&(Ea&&t.type==="mousemove"?(Vr=t.screenX-Ea.screenX,Ao=t.screenY-Ea.screenY):Ao=Vr=0,Ea=t),Vr)},movementY:function(t){return"movementY"in t?t.movementY:Ao}}),Ul=Ei(Rs),Hc=v({},Rs,{dataTransfer:0}),kf=Ei(Hc),kc=v({},ws,{relatedTarget:0}),Pl=Ei(kc),Vf=v({},As,{animationName:0,elapsedTime:0,pseudoElement:0}),zt=Ei(Vf),de=v({},As,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ct=Ei(de),at=v({},As,{data:0}),yt=Ei(at),St={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Je={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pe={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ve(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Pe[t])?!!n[t]:!1}function Se(){return Ve}var dt=v({},ws,{key:function(t){if(t.key){var n=St[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=So(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Je[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Se,charCode:function(t){return t.type==="keypress"?So(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?So(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),_n=Ei(dt),pn=v({},Rs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vi=Ei(pn),wo=v({},ws,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Se}),Jn=Ei(wo),jt=v({},As,{propertyName:0,elapsedTime:0,pseudoElement:0}),ji=Ei(jt),qi=v({},Rs,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),$i=Ei(qi),Fn=v({},As,{newState:0,oldState:0}),ei=Ei(Fn),ti=[9,13,27,32],qn=yi&&"CompositionEvent"in window,kn=null;yi&&"documentMode"in document&&(kn=document.documentMode);var Ui=yi&&"TextEvent"in window&&!kn,Si=yi&&(!qn||kn&&8<kn&&11>=kn),Vn=" ",oa=!1;function ni(t,n){switch(t){case"keyup":return ti.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function la(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var At=!1;function On(t,n){switch(t){case"compositionend":return la(n);case"keypress":return n.which!==32?null:(oa=!0,Vn);case"textInput":return t=n.data,t===Vn&&oa?null:t;default:return null}}function Xi(t,n){if(At)return t==="compositionend"||!qn&&ni(t,n)?(t=Eo(),bt=Ll=ra=null,At=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Si&&n.locale!=="ko"?null:n.data;default:return null}}var wi={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mi(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!wi[t.type]:n==="textarea"}function ja(t,n,a,o){Ii?Ms?Ms.push(o):Ms=[o]:Ii=o,n=Du(n,"onChange"),0<n.length&&(a=new To("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Sa=null,Cs=null;function Vc(t){ux(t,0)}function ir(t){var n=Ga(t);if(pt(n))return t}function jc(t,n){if(t==="change")return n}var Fl=!1;if(yi){var Ro;if(yi){var Co="oninput"in document;if(!Co){var ar=document.createElement("div");ar.setAttribute("oninput","return;"),Co=typeof ar.oninput=="function"}Ro=Co}else Ro=!1;Fl=Ro&&(!document.documentMode||9<document.documentMode)}function jr(){Sa&&(Sa.detachEvent("onpropertychange",mt),Cs=Sa=null)}function mt(t){if(t.propertyName==="value"&&ir(Cs)){var n=[];ja(n,Cs,t,Va(t)),Dl(Vc,n)}}function Mt(t,n,a){t==="focusin"?(jr(),Sa=n,Cs=a,Sa.attachEvent("onpropertychange",mt)):t==="focusout"&&jr()}function Qe(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ir(Cs)}function Ot(t,n){if(t==="click")return ir(n)}function $e(t,n){if(t==="input"||t==="change")return ir(n)}function et(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Ke=typeof Object.is=="function"?Object.is:et;function nt(t,n){if(Ke(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Vt.call(n,u)||!Ke(t[u],n[u]))return!1}return!0}function Tt(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function $n(t,n){var a=Tt(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Tt(a)}}function cn(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?cn(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function xt(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=xn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=xn(t.document)}return n}function mn(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Kn=yi&&"documentMode"in document&&11>=document.documentMode,Yn=null,Ma=null,Ta=null,is=!1;function Bm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;is||Yn==null||Yn!==xn(o)||(o=Yn,"selectionStart"in o&&mn(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Ta&&nt(Ta,o)||(Ta=o,o=Du(Ma,"onSelect"),0<o.length&&(n=new To("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Yn)))}function Xr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var No={animationend:Xr("Animation","AnimationEnd"),animationiteration:Xr("Animation","AnimationIteration"),animationstart:Xr("Animation","AnimationStart"),transitionrun:Xr("Transition","TransitionRun"),transitionstart:Xr("Transition","TransitionStart"),transitioncancel:Xr("Transition","TransitionCancel"),transitionend:Xr("Transition","TransitionEnd")},jf={},zm={};yi&&(zm=document.createElement("div").style,"AnimationEvent"in window||(delete No.animationend.animation,delete No.animationiteration.animation,delete No.animationstart.animation),"TransitionEvent"in window||delete No.transitionend.transition);function Yr(t){if(jf[t])return jf[t];if(!No[t])return t;var n=No[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in zm)return jf[t]=n[a];return t}var Gm=Yr("animationend"),Hm=Yr("animationiteration"),km=Yr("animationstart"),Rb=Yr("transitionrun"),Cb=Yr("transitionstart"),Nb=Yr("transitioncancel"),Vm=Yr("transitionend"),jm=new Map,Xf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Xf.push("scrollEnd");function Xa(t,n){jm.set(t,n),q(n,[t])}var Xc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Aa=[],Oo=0,Yf=0;function Yc(){for(var t=Oo,n=Yf=Oo=0;n<t;){var a=Aa[n];Aa[n++]=null;var o=Aa[n];Aa[n++]=null;var u=Aa[n];Aa[n++]=null;var d=Aa[n];if(Aa[n++]=null,o!==null&&u!==null){var b=o.pending;b===null?u.next=u:(u.next=b.next,b.next=u),o.pending=u}d!==0&&Xm(a,u,d)}}function Wc(t,n,a,o){Aa[Oo++]=t,Aa[Oo++]=n,Aa[Oo++]=a,Aa[Oo++]=o,Yf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Wf(t,n,a,o){return Wc(t,n,a,o),qc(t)}function Wr(t,n){return Wc(t,null,null,n),qc(t)}function Xm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-Ge(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function qc(t){if(50<sc)throw sc=0,nh=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Do={};function Ob(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ca(t,n,a,o){return new Ob(t,n,a,o)}function qf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ns(t,n){var a=t.alternate;return a===null?(a=ca(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Ym(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function $c(t,n,a,o,u,d){var b=0;if(o=t,typeof t=="function")qf(t)&&(b=1);else if(typeof t=="string")b=Py(t,a,Oe.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=ca(31,a,n,u),t.elementType=F,t.lanes=d,t;case C:return qr(a.children,u,d,n);case S:b=8,u|=24;break;case y:return t=ca(12,a,n,u|2),t.elementType=y,t.lanes=d,t;case V:return t=ca(13,a,n,u),t.elementType=V,t.lanes=d,t;case L:return t=ca(19,a,n,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case I:b=10;break e;case N:b=9;break e;case D:b=11;break e;case B:b=14;break e;case A:b=16,o=null;break e}b=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=ca(b,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function qr(t,n,a,o){return t=ca(7,t,o,n),t.lanes=a,t}function $f(t,n,a){return t=ca(6,t,null,n),t.lanes=a,t}function Wm(t){var n=ca(18,null,null,0);return n.stateNode=t,n}function Kf(t,n,a){return n=ca(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var qm=new WeakMap;function wa(t,n){if(typeof t=="object"&&t!==null){var a=qm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:vn(n)},qm.set(t,n),n)}return{value:t,source:n,stack:vn(n)}}var Lo=[],Io=0,Kc=null,Bl=0,Ra=[],Ca=0,sr=null,as=1,ss="";function Os(t,n){Lo[Io++]=Bl,Lo[Io++]=Kc,Kc=t,Bl=n}function $m(t,n,a){Ra[Ca++]=as,Ra[Ca++]=ss,Ra[Ca++]=sr,sr=t;var o=as;t=ss;var u=32-Ge(o)-1;o&=~(1<<u),a+=1;var d=32-Ge(n)+u;if(30<d){var b=u-u%5;d=(o&(1<<b)-1).toString(32),o>>=b,u-=b,as=1<<32-Ge(n)+u|a<<u|o,ss=d+t}else as=1<<d|a<<u|o,ss=t}function Zf(t){t.return!==null&&(Os(t,1),$m(t,1,0))}function Qf(t){for(;t===Kc;)Kc=Lo[--Io],Lo[Io]=null,Bl=Lo[--Io],Lo[Io]=null;for(;t===sr;)sr=Ra[--Ca],Ra[Ca]=null,ss=Ra[--Ca],Ra[Ca]=null,as=Ra[--Ca],Ra[Ca]=null}function Km(t,n){Ra[Ca++]=as,Ra[Ca++]=ss,Ra[Ca++]=sr,as=n.id,ss=n.overflow,sr=t}var Ri=null,Bn=null,Zt=!1,rr=null,Na=!1,Jf=Error(s(519));function or(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw zl(wa(n,t)),Jf}function Zm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Pn]=t,n[tn]=o,a){case"dialog":Wt("cancel",n),Wt("close",n);break;case"iframe":case"object":case"embed":Wt("load",n);break;case"video":case"audio":for(a=0;a<oc.length;a++)Wt(oc[a],n);break;case"source":Wt("error",n);break;case"img":case"image":case"link":Wt("error",n),Wt("load",n);break;case"details":Wt("toggle",n);break;case"input":Wt("invalid",n),oi(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Wt("invalid",n);break;case"textarea":Wt("invalid",n),Hn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||px(n.textContent,a)?(o.popover!=null&&(Wt("beforetoggle",n),Wt("toggle",n)),o.onScroll!=null&&Wt("scroll",n),o.onScrollEnd!=null&&Wt("scrollend",n),o.onClick!=null&&(n.onclick=sa),n=!0):n=!1,n||or(t,!0)}function Qm(t){for(Ri=t.return;Ri;)switch(Ri.tag){case 5:case 31:case 13:Na=!1;return;case 27:case 3:Na=!0;return;default:Ri=Ri.return}}function Uo(t){if(t!==Ri)return!1;if(!Zt)return Qm(t),Zt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||xh(t.type,t.memoizedProps)),a=!a),a&&Bn&&or(t),Qm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Bn=Sx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Bn=Sx(t)}else n===27?(n=Bn,yr(t.type)?(t=Eh,Eh=null,Bn=t):Bn=n):Bn=Ri?Da(t.stateNode.nextSibling):null;return!0}function $r(){Bn=Ri=null,Zt=!1}function ed(){var t=rr;return t!==null&&(Ji===null?Ji=t:Ji.push.apply(Ji,t),rr=null),t}function zl(t){rr===null?rr=[t]:rr.push(t)}var td=P(null),Kr=null,Ds=null;function lr(t,n,a){ye(td,n._currentValue),n._currentValue=a}function Ls(t){t._currentValue=td.current,J(td)}function nd(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function id(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var b=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var z=0;z<n.length;z++)if(R.context===n[z]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),nd(d.return,a,t),o||(b=null);break e}d=R.next}}else if(u.tag===18){if(b=u.return,b===null)throw Error(s(341));b.lanes|=a,d=b.alternate,d!==null&&(d.lanes|=a),nd(b,a,t),b=null}else b=u.child;if(b!==null)b.return=u;else for(b=u;b!==null;){if(b===t){b=null;break}if(u=b.sibling,u!==null){u.return=b.return,b=u;break}b=b.return}u=b}}function Po(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var b=u.alternate;if(b===null)throw Error(s(387));if(b=b.memoizedProps,b!==null){var R=u.type;Ke(u.pendingProps.value,b.value)||(t!==null?t.push(R):t=[R])}}else if(u===Me.current){if(b=u.alternate,b===null)throw Error(s(387));b.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(dc):t=[dc])}u=u.return}t!==null&&id(n,t,a,o),n.flags|=262144}function Zc(t){for(t=t.firstContext;t!==null;){if(!Ke(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Zr(t){Kr=t,Ds=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ci(t){return Jm(Kr,t)}function Qc(t,n){return Kr===null&&Zr(t),Jm(t,n)}function Jm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ds===null){if(t===null)throw Error(s(308));Ds=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Ds=Ds.next=n;return a}var Db=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Lb=r.unstable_scheduleCallback,Ib=r.unstable_NormalPriority,li={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ad(){return{controller:new Db,data:new Map,refCount:0}}function Gl(t){t.refCount--,t.refCount===0&&Lb(Ib,function(){t.controller.abort()})}var Hl=null,sd=0,Fo=0,Bo=null;function Ub(t,n){if(Hl===null){var a=Hl=[];sd=0,Fo=lh(),Bo={status:"pending",value:void 0,then:function(o){a.push(o)}}}return sd++,n.then(eg,eg),n}function eg(){if(--sd===0&&Hl!==null){Bo!==null&&(Bo.status="fulfilled");var t=Hl;Hl=null,Fo=0,Bo=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Pb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var tg=U.S;U.S=function(t,n){B0=Ie(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ub(t,n),tg!==null&&tg(t,n)};var Qr=P(null);function rd(){var t=Qr.current;return t!==null?t:Dn.pooledCache}function Jc(t,n){n===null?ye(Qr,Qr.current):ye(Qr,n.pool)}function ng(){var t=rd();return t===null?null:{parent:li._currentValue,pool:t}}var zo=Error(s(460)),od=Error(s(474)),eu=Error(s(542)),tu={then:function(){}};function ig(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ag(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(sa,sa),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,rg(t),t;default:if(typeof n.status=="string")n.then(sa,sa);else{if(t=Dn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,rg(t),t}throw eo=n,zo}}function Jr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(eo=a,zo):a}}var eo=null;function sg(){if(eo===null)throw Error(s(459));var t=eo;return eo=null,t}function rg(t){if(t===zo||t===eu)throw Error(s(483))}var Go=null,kl=0;function nu(t){var n=kl;return kl+=1,Go===null&&(Go=[]),ag(Go,t,n)}function Vl(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function iu(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function og(t){function n(Z,j){if(t){var se=Z.deletions;se===null?(Z.deletions=[j],Z.flags|=16):se.push(j)}}function a(Z,j){if(!t)return null;for(;j!==null;)n(Z,j),j=j.sibling;return null}function o(Z){for(var j=new Map;Z!==null;)Z.key!==null?j.set(Z.key,Z):j.set(Z.index,Z),Z=Z.sibling;return j}function u(Z,j){return Z=Ns(Z,j),Z.index=0,Z.sibling=null,Z}function d(Z,j,se){return Z.index=se,t?(se=Z.alternate,se!==null?(se=se.index,se<j?(Z.flags|=67108866,j):se):(Z.flags|=67108866,j)):(Z.flags|=1048576,j)}function b(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function R(Z,j,se,_e){return j===null||j.tag!==6?(j=$f(se,Z.mode,_e),j.return=Z,j):(j=u(j,se),j.return=Z,j)}function z(Z,j,se,_e){var ht=se.type;return ht===C?xe(Z,j,se.props.children,_e,se.key):j!==null&&(j.elementType===ht||typeof ht=="object"&&ht!==null&&ht.$$typeof===A&&Jr(ht)===j.type)?(j=u(j,se.props),Vl(j,se),j.return=Z,j):(j=$c(se.type,se.key,se.props,null,Z.mode,_e),Vl(j,se),j.return=Z,j)}function re(Z,j,se,_e){return j===null||j.tag!==4||j.stateNode.containerInfo!==se.containerInfo||j.stateNode.implementation!==se.implementation?(j=Kf(se,Z.mode,_e),j.return=Z,j):(j=u(j,se.children||[]),j.return=Z,j)}function xe(Z,j,se,_e,ht){return j===null||j.tag!==7?(j=qr(se,Z.mode,_e,ht),j.return=Z,j):(j=u(j,se),j.return=Z,j)}function ve(Z,j,se){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=$f(""+j,Z.mode,se),j.return=Z,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case E:return se=$c(j.type,j.key,j.props,null,Z.mode,se),Vl(se,j),se.return=Z,se;case T:return j=Kf(j,Z.mode,se),j.return=Z,j;case A:return j=Jr(j),ve(Z,j,se)}if(Y(j)||W(j))return j=qr(j,Z.mode,se,null),j.return=Z,j;if(typeof j.then=="function")return ve(Z,nu(j),se);if(j.$$typeof===I)return ve(Z,Qc(Z,j),se);iu(Z,j)}return null}function le(Z,j,se,_e){var ht=j!==null?j.key:null;if(typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint")return ht!==null?null:R(Z,j,""+se,_e);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case E:return se.key===ht?z(Z,j,se,_e):null;case T:return se.key===ht?re(Z,j,se,_e):null;case A:return se=Jr(se),le(Z,j,se,_e)}if(Y(se)||W(se))return ht!==null?null:xe(Z,j,se,_e,null);if(typeof se.then=="function")return le(Z,j,nu(se),_e);if(se.$$typeof===I)return le(Z,j,Qc(Z,se),_e);iu(Z,se)}return null}function ce(Z,j,se,_e,ht){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return Z=Z.get(se)||null,R(j,Z,""+_e,ht);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case E:return Z=Z.get(_e.key===null?se:_e.key)||null,z(j,Z,_e,ht);case T:return Z=Z.get(_e.key===null?se:_e.key)||null,re(j,Z,_e,ht);case A:return _e=Jr(_e),ce(Z,j,se,_e,ht)}if(Y(_e)||W(_e))return Z=Z.get(se)||null,xe(j,Z,_e,ht,null);if(typeof _e.then=="function")return ce(Z,j,se,nu(_e),ht);if(_e.$$typeof===I)return ce(Z,j,se,Qc(j,_e),ht);iu(j,_e)}return null}function it(Z,j,se,_e){for(var ht=null,un=null,rt=j,Ft=j=0,Kt=null;rt!==null&&Ft<se.length;Ft++){rt.index>Ft?(Kt=rt,rt=null):Kt=rt.sibling;var fn=le(Z,rt,se[Ft],_e);if(fn===null){rt===null&&(rt=Kt);break}t&&rt&&fn.alternate===null&&n(Z,rt),j=d(fn,j,Ft),un===null?ht=fn:un.sibling=fn,un=fn,rt=Kt}if(Ft===se.length)return a(Z,rt),Zt&&Os(Z,Ft),ht;if(rt===null){for(;Ft<se.length;Ft++)rt=ve(Z,se[Ft],_e),rt!==null&&(j=d(rt,j,Ft),un===null?ht=rt:un.sibling=rt,un=rt);return Zt&&Os(Z,Ft),ht}for(rt=o(rt);Ft<se.length;Ft++)Kt=ce(rt,Z,Ft,se[Ft],_e),Kt!==null&&(t&&Kt.alternate!==null&&rt.delete(Kt.key===null?Ft:Kt.key),j=d(Kt,j,Ft),un===null?ht=Kt:un.sibling=Kt,un=Kt);return t&&rt.forEach(function(Ar){return n(Z,Ar)}),Zt&&Os(Z,Ft),ht}function _t(Z,j,se,_e){if(se==null)throw Error(s(151));for(var ht=null,un=null,rt=j,Ft=j=0,Kt=null,fn=se.next();rt!==null&&!fn.done;Ft++,fn=se.next()){rt.index>Ft?(Kt=rt,rt=null):Kt=rt.sibling;var Ar=le(Z,rt,fn.value,_e);if(Ar===null){rt===null&&(rt=Kt);break}t&&rt&&Ar.alternate===null&&n(Z,rt),j=d(Ar,j,Ft),un===null?ht=Ar:un.sibling=Ar,un=Ar,rt=Kt}if(fn.done)return a(Z,rt),Zt&&Os(Z,Ft),ht;if(rt===null){for(;!fn.done;Ft++,fn=se.next())fn=ve(Z,fn.value,_e),fn!==null&&(j=d(fn,j,Ft),un===null?ht=fn:un.sibling=fn,un=fn);return Zt&&Os(Z,Ft),ht}for(rt=o(rt);!fn.done;Ft++,fn=se.next())fn=ce(rt,Z,Ft,fn.value,_e),fn!==null&&(t&&fn.alternate!==null&&rt.delete(fn.key===null?Ft:fn.key),j=d(fn,j,Ft),un===null?ht=fn:un.sibling=fn,un=fn);return t&&rt.forEach(function(Wy){return n(Z,Wy)}),Zt&&Os(Z,Ft),ht}function Tn(Z,j,se,_e){if(typeof se=="object"&&se!==null&&se.type===C&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case E:e:{for(var ht=se.key;j!==null;){if(j.key===ht){if(ht=se.type,ht===C){if(j.tag===7){a(Z,j.sibling),_e=u(j,se.props.children),_e.return=Z,Z=_e;break e}}else if(j.elementType===ht||typeof ht=="object"&&ht!==null&&ht.$$typeof===A&&Jr(ht)===j.type){a(Z,j.sibling),_e=u(j,se.props),Vl(_e,se),_e.return=Z,Z=_e;break e}a(Z,j);break}else n(Z,j);j=j.sibling}se.type===C?(_e=qr(se.props.children,Z.mode,_e,se.key),_e.return=Z,Z=_e):(_e=$c(se.type,se.key,se.props,null,Z.mode,_e),Vl(_e,se),_e.return=Z,Z=_e)}return b(Z);case T:e:{for(ht=se.key;j!==null;){if(j.key===ht)if(j.tag===4&&j.stateNode.containerInfo===se.containerInfo&&j.stateNode.implementation===se.implementation){a(Z,j.sibling),_e=u(j,se.children||[]),_e.return=Z,Z=_e;break e}else{a(Z,j);break}else n(Z,j);j=j.sibling}_e=Kf(se,Z.mode,_e),_e.return=Z,Z=_e}return b(Z);case A:return se=Jr(se),Tn(Z,j,se,_e)}if(Y(se))return it(Z,j,se,_e);if(W(se)){if(ht=W(se),typeof ht!="function")throw Error(s(150));return se=ht.call(se),_t(Z,j,se,_e)}if(typeof se.then=="function")return Tn(Z,j,nu(se),_e);if(se.$$typeof===I)return Tn(Z,j,Qc(Z,se),_e);iu(Z,se)}return typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint"?(se=""+se,j!==null&&j.tag===6?(a(Z,j.sibling),_e=u(j,se),_e.return=Z,Z=_e):(a(Z,j),_e=$f(se,Z.mode,_e),_e.return=Z,Z=_e),b(Z)):a(Z,j)}return function(Z,j,se,_e){try{kl=0;var ht=Tn(Z,j,se,_e);return Go=null,ht}catch(rt){if(rt===zo||rt===eu)throw rt;var un=ca(29,rt,null,Z.mode);return un.lanes=_e,un.return=Z,un}}}var to=og(!0),lg=og(!1),cr=!1;function ld(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function cd(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ur(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function fr(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(gn&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=qc(t),Xm(t,null,a),n}return Wc(t,o,n,a),qc(t)}function jl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Wn(t,a)}}function ud(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var b={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=b:d=d.next=b,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var fd=!1;function Xl(){if(fd){var t=Bo;if(t!==null)throw t}}function Yl(t,n,a,o){fd=!1;var u=t.updateQueue;cr=!1;var d=u.firstBaseUpdate,b=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var z=R,re=z.next;z.next=null,b===null?d=re:b.next=re,b=z;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,R=xe.lastBaseUpdate,R!==b&&(R===null?xe.firstBaseUpdate=re:R.next=re,xe.lastBaseUpdate=z))}if(d!==null){var ve=u.baseState;b=0,xe=re=z=null,R=d;do{var le=R.lane&-536870913,ce=le!==R.lane;if(ce?($t&le)===le:(o&le)===le){le!==0&&le===Fo&&(fd=!0),xe!==null&&(xe=xe.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var it=t,_t=R;le=n;var Tn=a;switch(_t.tag){case 1:if(it=_t.payload,typeof it=="function"){ve=it.call(Tn,ve,le);break e}ve=it;break e;case 3:it.flags=it.flags&-65537|128;case 0:if(it=_t.payload,le=typeof it=="function"?it.call(Tn,ve,le):it,le==null)break e;ve=v({},ve,le);break e;case 2:cr=!0}}le=R.callback,le!==null&&(t.flags|=64,ce&&(t.flags|=8192),ce=u.callbacks,ce===null?u.callbacks=[le]:ce.push(le))}else ce={lane:le,tag:R.tag,payload:R.payload,callback:R.callback,next:null},xe===null?(re=xe=ce,z=ve):xe=xe.next=ce,b|=le;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;ce=R,R=ce.next,ce.next=null,u.lastBaseUpdate=ce,u.shared.pending=null}}while(!0);xe===null&&(z=ve),u.baseState=z,u.firstBaseUpdate=re,u.lastBaseUpdate=xe,d===null&&(u.shared.lanes=0),gr|=b,t.lanes=b,t.memoizedState=ve}}function cg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function ug(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)cg(a[t],n)}var Ho=P(null),au=P(0);function fg(t,n){t=ks,ye(au,t),ye(Ho,n),ks=t|n.baseLanes}function dd(){ye(au,ks),ye(Ho,Ho.current)}function hd(){ks=au.current,J(Ho),J(au)}var ua=P(null),Oa=null;function dr(t){var n=t.alternate;ye(ii,ii.current&1),ye(ua,t),Oa===null&&(n===null||Ho.current!==null||n.memoizedState!==null)&&(Oa=t)}function pd(t){ye(ii,ii.current),ye(ua,t),Oa===null&&(Oa=t)}function dg(t){t.tag===22?(ye(ii,ii.current),ye(ua,t),Oa===null&&(Oa=t)):hr()}function hr(){ye(ii,ii.current),ye(ua,ua.current)}function fa(t){J(ua),Oa===t&&(Oa=null),J(ii)}var ii=P(0);function su(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||bh(a)||yh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Is=0,It=null,Sn=null,ci=null,ru=!1,ko=!1,no=!1,ou=0,Wl=0,Vo=null,Fb=0;function Zn(){throw Error(s(321))}function md(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Ke(t[a],n[a]))return!1;return!0}function gd(t,n,a,o,u,d){return Is=d,It=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,U.H=t===null||t.memoizedState===null?$g:Od,no=!1,d=a(o,u),no=!1,ko&&(d=pg(n,a,o,u)),hg(t),d}function hg(t){U.H=Kl;var n=Sn!==null&&Sn.next!==null;if(Is=0,ci=Sn=It=null,ru=!1,Wl=0,Vo=null,n)throw Error(s(300));t===null||ui||(t=t.dependencies,t!==null&&Zc(t)&&(ui=!0))}function pg(t,n,a,o){It=t;var u=0;do{if(ko&&(Vo=null),Wl=0,ko=!1,25<=u)throw Error(s(301));if(u+=1,ci=Sn=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=Kg,d=n(a,o)}while(ko);return d}function Bb(){var t=U.H,n=t.useState()[0];return n=typeof n.then=="function"?ql(n):n,t=t.useState()[0],(Sn!==null?Sn.memoizedState:null)!==t&&(It.flags|=1024),n}function xd(){var t=ou!==0;return ou=0,t}function _d(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function vd(t){if(ru){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ru=!1}Is=0,ci=Sn=It=null,ko=!1,Wl=ou=0,Vo=null}function Yi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ci===null?It.memoizedState=ci=t:ci=ci.next=t,ci}function ai(){if(Sn===null){var t=It.alternate;t=t!==null?t.memoizedState:null}else t=Sn.next;var n=ci===null?It.memoizedState:ci.next;if(n!==null)ci=n,Sn=t;else{if(t===null)throw It.alternate===null?Error(s(467)):Error(s(310));Sn=t,t={memoizedState:Sn.memoizedState,baseState:Sn.baseState,baseQueue:Sn.baseQueue,queue:Sn.queue,next:null},ci===null?It.memoizedState=ci=t:ci=ci.next=t}return ci}function lu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(t){var n=Wl;return Wl+=1,Vo===null&&(Vo=[]),t=ag(Vo,t,n),n=It,(ci===null?n.memoizedState:ci.next)===null&&(n=n.alternate,U.H=n===null||n.memoizedState===null?$g:Od),t}function cu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ql(t);if(t.$$typeof===I)return Ci(t)}throw Error(s(438,String(t)))}function bd(t){var n=null,a=It.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=It.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=lu(),It.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=$;return n.index++,a}function Us(t,n){return typeof n=="function"?n(t):n}function uu(t){var n=ai();return yd(n,Sn,t)}function yd(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var b=u.next;u.next=d.next,d.next=b}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=b=null,z=null,re=n,xe=!1;do{var ve=re.lane&-536870913;if(ve!==re.lane?($t&ve)===ve:(Is&ve)===ve){var le=re.revertLane;if(le===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),ve===Fo&&(xe=!0);else if((Is&le)===le){re=re.next,le===Fo&&(xe=!0);continue}else ve={lane:0,revertLane:re.revertLane,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=ve,b=d):z=z.next=ve,It.lanes|=le,gr|=le;ve=re.action,no&&a(d,ve),d=re.hasEagerState?re.eagerState:a(d,ve)}else le={lane:ve,revertLane:re.revertLane,gesture:re.gesture,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=le,b=d):z=z.next=le,It.lanes|=ve,gr|=ve;re=re.next}while(re!==null&&re!==n);if(z===null?b=d:z.next=R,!Ke(d,t.memoizedState)&&(ui=!0,xe&&(a=Bo,a!==null)))throw a;t.memoizedState=d,t.baseState=b,t.baseQueue=z,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Ed(t){var n=ai(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var b=u=u.next;do d=t(d,b.action),b=b.next;while(b!==u);Ke(d,n.memoizedState)||(ui=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function mg(t,n,a){var o=It,u=ai(),d=Zt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var b=!Ke((Sn||u).memoizedState,a);if(b&&(u.memoizedState=a,ui=!0),u=u.queue,Td(_g.bind(null,o,u,t),[t]),u.getSnapshot!==n||b||ci!==null&&ci.memoizedState.tag&1){if(o.flags|=2048,jo(9,{destroy:void 0},xg.bind(null,o,u,a,n),null),Dn===null)throw Error(s(349));d||(Is&127)!==0||gg(o,n,a)}return a}function gg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=It.updateQueue,n===null?(n=lu(),It.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function xg(t,n,a,o){n.value=a,n.getSnapshot=o,vg(n)&&bg(t)}function _g(t,n,a){return a(function(){vg(n)&&bg(t)})}function vg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Ke(t,a)}catch{return!0}}function bg(t){var n=Wr(t,2);n!==null&&ea(n,t,2)}function Sd(t){var n=Yi();if(typeof t=="function"){var a=t;if(t=a(),no){Re(!0);try{a()}finally{Re(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Us,lastRenderedState:t},n}function yg(t,n,a,o){return t.baseState=a,yd(t,Sn,typeof o=="function"?o:Us)}function zb(t,n,a,o,u){if(hu(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(b){d.listeners.push(b)}};U.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,Eg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function Eg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=U.T,b={};U.T=b;try{var R=a(u,o),z=U.S;z!==null&&z(b,R),Sg(t,n,R)}catch(re){Md(t,n,re)}finally{d!==null&&b.types!==null&&(d.types=b.types),U.T=d}}else try{d=a(u,o),Sg(t,n,d)}catch(re){Md(t,n,re)}}function Sg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Mg(t,n,o)},function(o){return Md(t,n,o)}):Mg(t,n,a)}function Mg(t,n,a){n.status="fulfilled",n.value=a,Tg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Eg(t,a)))}function Md(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Tg(n),n=n.next;while(n!==o)}t.action=null}function Tg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Ag(t,n){return n}function wg(t,n){if(Zt){var a=Dn.formState;if(a!==null){e:{var o=It;if(Zt){if(Bn){t:{for(var u=Bn,d=Na;u.nodeType!==8;){if(!d){u=null;break t}if(u=Da(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Bn=Da(u.nextSibling),o=u.data==="F!";break e}}or(o)}o=!1}o&&(n=a[0])}}return a=Yi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ag,lastRenderedState:n},a.queue=o,a=Yg.bind(null,It,o),o.dispatch=a,o=Sd(!1),d=Nd.bind(null,It,!1,o.queue),o=Yi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=zb.bind(null,It,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Rg(t){var n=ai();return Cg(n,Sn,t)}function Cg(t,n,a){if(n=yd(t,n,Ag)[0],t=uu(Us)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ql(n)}catch(b){throw b===zo?eu:b}else o=n;n=ai();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(It.flags|=2048,jo(9,{destroy:void 0},Gb.bind(null,u,a),null)),[o,d,t]}function Gb(t,n){t.action=n}function Ng(t){var n=ai(),a=Sn;if(a!==null)return Cg(n,a,t);ai(),n=n.memoizedState,a=ai();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function jo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=It.updateQueue,n===null&&(n=lu(),It.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Og(){return ai().memoizedState}function fu(t,n,a,o){var u=Yi();It.flags|=t,u.memoizedState=jo(1|n,{destroy:void 0},a,o===void 0?null:o)}function du(t,n,a,o){var u=ai();o=o===void 0?null:o;var d=u.memoizedState.inst;Sn!==null&&o!==null&&md(o,Sn.memoizedState.deps)?u.memoizedState=jo(n,d,a,o):(It.flags|=t,u.memoizedState=jo(1|n,d,a,o))}function Dg(t,n){fu(8390656,8,t,n)}function Td(t,n){du(2048,8,t,n)}function Hb(t){It.flags|=4;var n=It.updateQueue;if(n===null)n=lu(),It.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Lg(t){var n=ai().memoizedState;return Hb({ref:n,nextImpl:t}),function(){if((gn&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Ig(t,n){return du(4,2,t,n)}function Ug(t,n){return du(4,4,t,n)}function Pg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Fg(t,n,a){a=a!=null?a.concat([t]):null,du(4,4,Pg.bind(null,n,t),a)}function Ad(){}function Bg(t,n){var a=ai();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&md(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function zg(t,n){var a=ai();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&md(n,o[1]))return o[0];if(o=t(),no){Re(!0);try{t()}finally{Re(!1)}}return a.memoizedState=[o,n],o}function wd(t,n,a){return a===void 0||(Is&1073741824)!==0&&($t&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=G0(),It.lanes|=t,gr|=t,a)}function Gg(t,n,a,o){return Ke(a,n)?a:Ho.current!==null?(t=wd(t,a,o),Ke(t,n)||(ui=!0),t):(Is&42)===0||(Is&1073741824)!==0&&($t&261930)===0?(ui=!0,t.memoizedState=a):(t=G0(),It.lanes|=t,gr|=t,n)}function Hg(t,n,a,o,u){var d=G.p;G.p=d!==0&&8>d?d:8;var b=U.T,R={};U.T=R,Nd(t,!1,n,a);try{var z=u(),re=U.S;if(re!==null&&re(R,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var xe=Pb(z,o);$l(t,n,xe,pa(t))}else $l(t,n,o,pa(t))}catch(ve){$l(t,n,{then:function(){},status:"rejected",reason:ve},pa())}finally{G.p=d,b!==null&&R.types!==null&&(b.types=R.types),U.T=b}}function kb(){}function Rd(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=kg(t).queue;Hg(t,u,n,ee,a===null?kb:function(){return Vg(t),a(o)})}function kg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Us,lastRenderedState:ee},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Us,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Vg(t){var n=kg(t);n.next===null&&(n=t.alternate.memoizedState),$l(t,n.next.queue,{},pa())}function Cd(){return Ci(dc)}function jg(){return ai().memoizedState}function Xg(){return ai().memoizedState}function Vb(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=pa();t=ur(a);var o=fr(n,t,a);o!==null&&(ea(o,n,a),jl(o,n,a)),n={cache:ad()},t.payload=n;return}n=n.return}}function jb(t,n,a){var o=pa();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},hu(t)?Wg(n,a):(a=Wf(t,n,a,o),a!==null&&(ea(a,t,o),qg(a,n,o)))}function Yg(t,n,a){var o=pa();$l(t,n,a,o)}function $l(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(hu(t))Wg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var b=n.lastRenderedState,R=d(b,a);if(u.hasEagerState=!0,u.eagerState=R,Ke(R,b))return Wc(t,n,u,0),Dn===null&&Yc(),!1}catch{}if(a=Wf(t,n,u,o),a!==null)return ea(a,t,o),qg(a,n,o),!0}return!1}function Nd(t,n,a,o){if(o={lane:2,revertLane:lh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},hu(t)){if(n)throw Error(s(479))}else n=Wf(t,a,o,2),n!==null&&ea(n,t,2)}function hu(t){var n=t.alternate;return t===It||n!==null&&n===It}function Wg(t,n){ko=ru=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function qg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Wn(t,a)}}var Kl={readContext:Ci,use:cu,useCallback:Zn,useContext:Zn,useEffect:Zn,useImperativeHandle:Zn,useLayoutEffect:Zn,useInsertionEffect:Zn,useMemo:Zn,useReducer:Zn,useRef:Zn,useState:Zn,useDebugValue:Zn,useDeferredValue:Zn,useTransition:Zn,useSyncExternalStore:Zn,useId:Zn,useHostTransitionStatus:Zn,useFormState:Zn,useActionState:Zn,useOptimistic:Zn,useMemoCache:Zn,useCacheRefresh:Zn};Kl.useEffectEvent=Zn;var $g={readContext:Ci,use:cu,useCallback:function(t,n){return Yi().memoizedState=[t,n===void 0?null:n],t},useContext:Ci,useEffect:Dg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,fu(4194308,4,Pg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return fu(4194308,4,t,n)},useInsertionEffect:function(t,n){fu(4,2,t,n)},useMemo:function(t,n){var a=Yi();n=n===void 0?null:n;var o=t();if(no){Re(!0);try{t()}finally{Re(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Yi();if(a!==void 0){var u=a(n);if(no){Re(!0);try{a(n)}finally{Re(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=jb.bind(null,It,t),[o.memoizedState,t]},useRef:function(t){var n=Yi();return t={current:t},n.memoizedState=t},useState:function(t){t=Sd(t);var n=t.queue,a=Yg.bind(null,It,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Ad,useDeferredValue:function(t,n){var a=Yi();return wd(a,t,n)},useTransition:function(){var t=Sd(!1);return t=Hg.bind(null,It,t.queue,!0,!1),Yi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=It,u=Yi();if(Zt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Dn===null)throw Error(s(349));($t&127)!==0||gg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Dg(_g.bind(null,o,d,t),[t]),o.flags|=2048,jo(9,{destroy:void 0},xg.bind(null,o,d,a,n),null),a},useId:function(){var t=Yi(),n=Dn.identifierPrefix;if(Zt){var a=ss,o=as;a=(o&~(1<<32-Ge(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ou++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Fb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Cd,useFormState:wg,useActionState:wg,useOptimistic:function(t){var n=Yi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Nd.bind(null,It,!0,a),a.dispatch=n,[t,n]},useMemoCache:bd,useCacheRefresh:function(){return Yi().memoizedState=Vb.bind(null,It)},useEffectEvent:function(t){var n=Yi(),a={impl:t};return n.memoizedState=a,function(){if((gn&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Od={readContext:Ci,use:cu,useCallback:Bg,useContext:Ci,useEffect:Td,useImperativeHandle:Fg,useInsertionEffect:Ig,useLayoutEffect:Ug,useMemo:zg,useReducer:uu,useRef:Og,useState:function(){return uu(Us)},useDebugValue:Ad,useDeferredValue:function(t,n){var a=ai();return Gg(a,Sn.memoizedState,t,n)},useTransition:function(){var t=uu(Us)[0],n=ai().memoizedState;return[typeof t=="boolean"?t:ql(t),n]},useSyncExternalStore:mg,useId:jg,useHostTransitionStatus:Cd,useFormState:Rg,useActionState:Rg,useOptimistic:function(t,n){var a=ai();return yg(a,Sn,t,n)},useMemoCache:bd,useCacheRefresh:Xg};Od.useEffectEvent=Lg;var Kg={readContext:Ci,use:cu,useCallback:Bg,useContext:Ci,useEffect:Td,useImperativeHandle:Fg,useInsertionEffect:Ig,useLayoutEffect:Ug,useMemo:zg,useReducer:Ed,useRef:Og,useState:function(){return Ed(Us)},useDebugValue:Ad,useDeferredValue:function(t,n){var a=ai();return Sn===null?wd(a,t,n):Gg(a,Sn.memoizedState,t,n)},useTransition:function(){var t=Ed(Us)[0],n=ai().memoizedState;return[typeof t=="boolean"?t:ql(t),n]},useSyncExternalStore:mg,useId:jg,useHostTransitionStatus:Cd,useFormState:Ng,useActionState:Ng,useOptimistic:function(t,n){var a=ai();return Sn!==null?yg(a,Sn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:bd,useCacheRefresh:Xg};Kg.useEffectEvent=Lg;function Dd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Ld={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=pa(),u=ur(o);u.payload=n,a!=null&&(u.callback=a),n=fr(t,u,o),n!==null&&(ea(n,t,o),jl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=pa(),u=ur(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=fr(t,u,o),n!==null&&(ea(n,t,o),jl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=pa(),o=ur(a);o.tag=2,n!=null&&(o.callback=n),n=fr(t,o,a),n!==null&&(ea(n,t,a),jl(n,t,a))}};function Zg(t,n,a,o,u,d,b){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,b):n.prototype&&n.prototype.isPureReactComponent?!nt(a,o)||!nt(u,d):!0}function Qg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Ld.enqueueReplaceState(n,n.state,null)}function io(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=v({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Jg(t){Xc(t)}function e0(t){console.error(t)}function t0(t){Xc(t)}function pu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function n0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Id(t,n,a){return a=ur(a),a.tag=3,a.payload={element:null},a.callback=function(){pu(t,n)},a}function i0(t){return t=ur(t),t.tag=3,t}function a0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){n0(n,a,o)}}var b=a.stateNode;b!==null&&typeof b.componentDidCatch=="function"&&(t.callback=function(){n0(n,a,o),typeof u!="function"&&(xr===null?xr=new Set([this]):xr.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function Xb(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Po(n,a,u,!0),a=ua.current,a!==null){switch(a.tag){case 31:case 13:return Oa===null?Au():a.alternate===null&&Qn===0&&(Qn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===tu?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),sh(t,o,u)),!1;case 22:return a.flags|=65536,o===tu?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),sh(t,o,u)),!1}throw Error(s(435,a.tag))}return sh(t,o,u),Au(),!1}if(Zt)return n=ua.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Jf&&(t=Error(s(422),{cause:o}),zl(wa(t,a)))):(o!==Jf&&(n=Error(s(423),{cause:o}),zl(wa(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=wa(o,a),u=Id(t.stateNode,o,u),ud(t,u),Qn!==4&&(Qn=2)),!1;var d=Error(s(520),{cause:o});if(d=wa(d,a),ac===null?ac=[d]:ac.push(d),Qn!==4&&(Qn=2),n===null)return!0;o=wa(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Id(a.stateNode,o,t),ud(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(xr===null||!xr.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=i0(u),a0(u,t,a,o),ud(a,u),!1}a=a.return}while(a!==null);return!1}var Ud=Error(s(461)),ui=!1;function Ni(t,n,a,o){n.child=t===null?lg(n,null,a,o):to(n,t.child,a,o)}function s0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var b={};for(var R in o)R!=="ref"&&(b[R]=o[R])}else b=o;return Zr(n),o=gd(t,n,a,b,d,u),R=xd(),t!==null&&!ui?(_d(t,n,u),Ps(t,n,u)):(Zt&&R&&Zf(n),n.flags|=1,Ni(t,n,o,u),n.child)}function r0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!qf(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,o0(t,n,d,o,u)):(t=$c(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Vd(t,u)){var b=d.memoizedProps;if(a=a.compare,a=a!==null?a:nt,a(b,o)&&t.ref===n.ref)return Ps(t,n,u)}return n.flags|=1,t=Ns(d,o),t.ref=n.ref,t.return=n,n.child=t}function o0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(nt(d,o)&&t.ref===n.ref)if(ui=!1,n.pendingProps=o=d,Vd(t,u))(t.flags&131072)!==0&&(ui=!0);else return n.lanes=t.lanes,Ps(t,n,u)}return Pd(t,n,a,o,u)}function l0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return c0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Jc(n,d!==null?d.cachePool:null),d!==null?fg(n,d):dd(),dg(n);else return o=n.lanes=536870912,c0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Jc(n,d.cachePool),fg(n,d),hr(),n.memoizedState=null):(t!==null&&Jc(n,null),dd(),hr());return Ni(t,n,u,a),n.child}function Zl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function c0(t,n,a,o,u){var d=rd();return d=d===null?null:{parent:li._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&Jc(n,null),dd(),dg(n),t!==null&&Po(t,n,o,!0),n.childLanes=u,null}function mu(t,n){return n=xu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function u0(t,n,a){return to(n,t.child,null,a),t=mu(n,n.pendingProps),t.flags|=2,fa(n),n.memoizedState=null,t}function Yb(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Zt){if(o.mode==="hidden")return t=mu(n,o),n.lanes=536870912,Zl(null,t);if(pd(n),(t=Bn)?(t=Ex(t,Na),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:sr!==null?{id:as,overflow:ss}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=n,n.child=a,Ri=n,Bn=null)):t=null,t===null)throw or(n);return n.lanes=536870912,null}return mu(n,o)}var d=t.memoizedState;if(d!==null){var b=d.dehydrated;if(pd(n),u)if(n.flags&256)n.flags&=-257,n=u0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(ui||Po(t,n,a,!1),u=(a&t.childLanes)!==0,ui||u){if(o=Dn,o!==null&&(b=Li(o,a),b!==0&&b!==d.retryLane))throw d.retryLane=b,Wr(t,b),ea(o,t,b),Ud;Au(),n=u0(t,n,a)}else t=d.treeContext,Bn=Da(b.nextSibling),Ri=n,Zt=!0,rr=null,Na=!1,t!==null&&Km(n,t),n=mu(n,o),n.flags|=4096;return n}return t=Ns(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function gu(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Pd(t,n,a,o,u){return Zr(n),a=gd(t,n,a,o,void 0,u),o=xd(),t!==null&&!ui?(_d(t,n,u),Ps(t,n,u)):(Zt&&o&&Zf(n),n.flags|=1,Ni(t,n,a,u),n.child)}function f0(t,n,a,o,u,d){return Zr(n),n.updateQueue=null,a=pg(n,o,a,u),hg(t),o=xd(),t!==null&&!ui?(_d(t,n,d),Ps(t,n,d)):(Zt&&o&&Zf(n),n.flags|=1,Ni(t,n,a,d),n.child)}function d0(t,n,a,o,u){if(Zr(n),n.stateNode===null){var d=Do,b=a.contextType;typeof b=="object"&&b!==null&&(d=Ci(b)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Ld,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},ld(n),b=a.contextType,d.context=typeof b=="object"&&b!==null?Ci(b):Do,d.state=n.memoizedState,b=a.getDerivedStateFromProps,typeof b=="function"&&(Dd(n,a,b,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(b=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),b!==d.state&&Ld.enqueueReplaceState(d,d.state,null),Yl(n,o,d,u),Xl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,z=io(a,R);d.props=z;var re=d.context,xe=a.contextType;b=Do,typeof xe=="object"&&xe!==null&&(b=Ci(xe));var ve=a.getDerivedStateFromProps;xe=typeof ve=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,xe||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||re!==b)&&Qg(n,d,o,b),cr=!1;var le=n.memoizedState;d.state=le,Yl(n,o,d,u),Xl(),re=n.memoizedState,R||le!==re||cr?(typeof ve=="function"&&(Dd(n,a,ve,o),re=n.memoizedState),(z=cr||Zg(n,a,z,o,le,re,b))?(xe||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=re),d.props=o,d.state=re,d.context=b,o=z):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,cd(t,n),b=n.memoizedProps,xe=io(a,b),d.props=xe,ve=n.pendingProps,le=d.context,re=a.contextType,z=Do,typeof re=="object"&&re!==null&&(z=Ci(re)),R=a.getDerivedStateFromProps,(re=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(b!==ve||le!==z)&&Qg(n,d,o,z),cr=!1,le=n.memoizedState,d.state=le,Yl(n,o,d,u),Xl();var ce=n.memoizedState;b!==ve||le!==ce||cr||t!==null&&t.dependencies!==null&&Zc(t.dependencies)?(typeof R=="function"&&(Dd(n,a,R,o),ce=n.memoizedState),(xe=cr||Zg(n,a,xe,o,le,ce,z)||t!==null&&t.dependencies!==null&&Zc(t.dependencies))?(re||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,ce,z),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,ce,z)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ce),d.props=o,d.state=ce,d.context=z,o=xe):(typeof d.componentDidUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,gu(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=to(n,t.child,null,u),n.child=to(n,null,a,u)):Ni(t,n,a,u),n.memoizedState=d.state,t=n.child):t=Ps(t,n,u),t}function h0(t,n,a,o){return $r(),n.flags|=256,Ni(t,n,a,o),n.child}var Fd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bd(t){return{baseLanes:t,cachePool:ng()}}function zd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ha),t}function p0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,b;if((b=d)||(b=t!==null&&t.memoizedState===null?!1:(ii.current&2)!==0),b&&(u=!0,n.flags&=-129),b=(n.flags&32)!==0,n.flags&=-33,t===null){if(Zt){if(u?dr(n):hr(),(t=Bn)?(t=Ex(t,Na),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:sr!==null?{id:as,overflow:ss}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=n,n.child=a,Ri=n,Bn=null)):t=null,t===null)throw or(n);return yh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(hr(),u=n.mode,R=xu({mode:"hidden",children:R},u),o=qr(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Bd(a),o.childLanes=zd(t,b,a),n.memoizedState=Fd,Zl(null,o)):(dr(n),Gd(n,R))}var z=t.memoizedState;if(z!==null&&(R=z.dehydrated,R!==null)){if(d)n.flags&256?(dr(n),n.flags&=-257,n=Hd(t,n,a)):n.memoizedState!==null?(hr(),n.child=t.child,n.flags|=128,n=null):(hr(),R=o.fallback,u=n.mode,o=xu({mode:"visible",children:o.children},u),R=qr(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,to(n,t.child,null,a),o=n.child,o.memoizedState=Bd(a),o.childLanes=zd(t,b,a),n.memoizedState=Fd,n=Zl(null,o));else if(dr(n),yh(R)){if(b=R.nextSibling&&R.nextSibling.dataset,b)var re=b.dgst;b=re,o=Error(s(419)),o.stack="",o.digest=b,zl({value:o,source:null,stack:null}),n=Hd(t,n,a)}else if(ui||Po(t,n,a,!1),b=(a&t.childLanes)!==0,ui||b){if(b=Dn,b!==null&&(o=Li(b,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,Wr(t,o),ea(b,t,o),Ud;bh(R)||Au(),n=Hd(t,n,a)}else bh(R)?(n.flags|=192,n.child=t.child,n=null):(t=z.treeContext,Bn=Da(R.nextSibling),Ri=n,Zt=!0,rr=null,Na=!1,t!==null&&Km(n,t),n=Gd(n,o.children),n.flags|=4096);return n}return u?(hr(),R=o.fallback,u=n.mode,z=t.child,re=z.sibling,o=Ns(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,re!==null?R=Ns(re,R):(R=qr(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Zl(null,o),o=n.child,R=t.child.memoizedState,R===null?R=Bd(a):(u=R.cachePool,u!==null?(z=li._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=ng(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=zd(t,b,a),n.memoizedState=Fd,Zl(t.child,o)):(dr(n),a=t.child,t=a.sibling,a=Ns(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(b=n.deletions,b===null?(n.deletions=[t],n.flags|=16):b.push(t)),n.child=a,n.memoizedState=null,a)}function Gd(t,n){return n=xu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function xu(t,n){return t=ca(22,t,null,n),t.lanes=0,t}function Hd(t,n,a){return to(n,t.child,null,a),t=Gd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function m0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),nd(t.return,n,a)}function kd(t,n,a,o,u,d){var b=t.memoizedState;b===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(b.isBackwards=n,b.rendering=null,b.renderingStartTime=0,b.last=o,b.tail=a,b.tailMode=u,b.treeForkCount=d)}function g0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var b=ii.current,R=(b&2)!==0;if(R?(b=b&1|2,n.flags|=128):b&=1,ye(ii,b),Ni(t,n,o,a),o=Zt?Bl:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&m0(t,a,n);else if(t.tag===19)m0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&su(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),kd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&su(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}kd(n,!0,a,null,d,o);break;case"together":kd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ps(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),gr|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Po(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Ns(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Ns(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Vd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Zc(t)))}function Wb(t,n,a){switch(n.tag){case 3:Ee(n,n.stateNode.containerInfo),lr(n,li,t.memoizedState.cache),$r();break;case 27:case 5:st(n);break;case 4:Ee(n,n.stateNode.containerInfo);break;case 10:lr(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,pd(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(dr(n),n.flags|=128,null):(a&n.child.childLanes)!==0?p0(t,n,a):(dr(n),t=Ps(t,n,a),t!==null?t.sibling:null);dr(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Po(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return g0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ye(ii,ii.current),o)break;return null;case 22:return n.lanes=0,l0(t,n,a,n.pendingProps);case 24:lr(n,li,t.memoizedState.cache)}return Ps(t,n,a)}function x0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)ui=!0;else{if(!Vd(t,a)&&(n.flags&128)===0)return ui=!1,Wb(t,n,a);ui=(t.flags&131072)!==0}else ui=!1,Zt&&(n.flags&1048576)!==0&&$m(n,Bl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Jr(n.elementType),n.type=t,typeof t=="function")qf(t)?(o=io(t,o),n.tag=1,n=d0(null,n,t,o,a)):(n.tag=0,n=Pd(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===D){n.tag=11,n=s0(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=r0(null,n,t,o,a);break e}}throw n=oe(t)||t,Error(s(306,n,""))}}return n;case 0:return Pd(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=io(o,n.pendingProps),d0(t,n,o,u,a);case 3:e:{if(Ee(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,cd(t,n),Yl(n,o,null,a);var b=n.memoizedState;if(o=b.cache,lr(n,li,o),o!==d.cache&&id(n,[li],a,!0),Xl(),o=b.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:b.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=h0(t,n,o,a);break e}else if(o!==u){u=wa(Error(s(424)),n),zl(u),n=h0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Bn=Da(t.firstChild),Ri=n,Zt=!0,rr=null,Na=!0,a=lg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if($r(),o===u){n=Ps(t,n,a);break e}Ni(t,n,o,a)}n=n.child}return n;case 26:return gu(t,n),t===null?(a=Rx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Zt||(a=n.type,t=n.pendingProps,o=Lu(ae.current).createElement(a),o[Pn]=n,o[tn]=t,Oi(o,a,t),Ln(o),n.stateNode=o):n.memoizedState=Rx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return st(n),t===null&&Zt&&(o=n.stateNode=Tx(n.type,n.pendingProps,ae.current),Ri=n,Na=!0,u=Bn,yr(n.type)?(Eh=u,Bn=Da(o.firstChild)):Bn=u),Ni(t,n,n.pendingProps.children,a),gu(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Zt&&((u=o=Bn)&&(o=Sy(o,n.type,n.pendingProps,Na),o!==null?(n.stateNode=o,Ri=n,Bn=Da(o.firstChild),Na=!1,u=!0):u=!1),u||or(n)),st(n),u=n.type,d=n.pendingProps,b=t!==null?t.memoizedProps:null,o=d.children,xh(u,d)?o=null:b!==null&&xh(u,b)&&(n.flags|=32),n.memoizedState!==null&&(u=gd(t,n,Bb,null,null,a),dc._currentValue=u),gu(t,n),Ni(t,n,o,a),n.child;case 6:return t===null&&Zt&&((t=a=Bn)&&(a=My(a,n.pendingProps,Na),a!==null?(n.stateNode=a,Ri=n,Bn=null,t=!0):t=!1),t||or(n)),null;case 13:return p0(t,n,a);case 4:return Ee(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=to(n,null,o,a):Ni(t,n,o,a),n.child;case 11:return s0(t,n,n.type,n.pendingProps,a);case 7:return Ni(t,n,n.pendingProps,a),n.child;case 8:return Ni(t,n,n.pendingProps.children,a),n.child;case 12:return Ni(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,lr(n,n.type,o.value),Ni(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Zr(n),u=Ci(u),o=o(u),n.flags|=1,Ni(t,n,o,a),n.child;case 14:return r0(t,n,n.type,n.pendingProps,a);case 15:return o0(t,n,n.type,n.pendingProps,a);case 19:return g0(t,n,a);case 31:return Yb(t,n,a);case 22:return l0(t,n,a,n.pendingProps);case 24:return Zr(n),o=Ci(li),t===null?(u=rd(),u===null&&(u=Dn,d=ad(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},ld(n),lr(n,li,u)):((t.lanes&a)!==0&&(cd(t,n),Yl(n,null,null,a),Xl()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),lr(n,li,o)):(o=d.cache,lr(n,li,o),o!==u.cache&&id(n,[li],a,!0))),Ni(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Fs(t){t.flags|=4}function jd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(j0())t.flags|=8192;else throw eo=tu,od}else t.flags&=-16777217}function _0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Lx(n))if(j0())t.flags|=8192;else throw eo=tu,od}function _u(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?we():536870912,t.lanes|=n,qo|=n)}function Ql(t,n){if(!Zt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function zn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function qb(t,n,a){var o=n.pendingProps;switch(Qf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zn(n),null;case 1:return zn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Ls(li),We(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Uo(n)?Fs(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,ed())),zn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(Fs(n),d!==null?(zn(n),_0(n,d)):(zn(n),jd(n,u,null,o,a))):d?d!==t.memoizedState?(Fs(n),zn(n),_0(n,d)):(zn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Fs(n),zn(n),jd(n,u,t,o,a)),null;case 27:if(ut(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Fs(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return zn(n),null}t=Oe.current,Uo(n)?Zm(n):(t=Tx(u,o,a),n.stateNode=t,Fs(n))}return zn(n),null;case 5:if(ut(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Fs(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return zn(n),null}if(d=Oe.current,Uo(n))Zm(n);else{var b=Lu(ae.current);switch(d){case 1:d=b.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=b.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=b.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=b.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=b.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?b.createElement("select",{is:o.is}):b.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?b.createElement(u,{is:o.is}):b.createElement(u)}}d[Pn]=n,d[tn]=o;e:for(b=n.child;b!==null;){if(b.tag===5||b.tag===6)d.appendChild(b.stateNode);else if(b.tag!==4&&b.tag!==27&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===n)break e;for(;b.sibling===null;){if(b.return===null||b.return===n)break e;b=b.return}b.sibling.return=b.return,b=b.sibling}n.stateNode=d;e:switch(Oi(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Fs(n)}}return zn(n),jd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Fs(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=ae.current,Uo(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Ri,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Pn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||px(t.nodeValue,a)),t||or(n,!0)}else t=Lu(t).createTextNode(o),t[Pn]=n,n.stateNode=t}return zn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Uo(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Pn]=n}else $r(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;zn(n),t=!1}else a=ed(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(fa(n),n):(fa(n),null);if((n.flags&128)!==0)throw Error(s(558))}return zn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Uo(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Pn]=n}else $r(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;zn(n),u=!1}else u=ed(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(fa(n),n):(fa(n),null)}return fa(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),_u(n,n.updateQueue),zn(n),null);case 4:return We(),t===null&&dh(n.stateNode.containerInfo),zn(n),null;case 10:return Ls(n.type),zn(n),null;case 19:if(J(ii),o=n.memoizedState,o===null)return zn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)Ql(o,!1);else{if(Qn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=su(t),d!==null){for(n.flags|=128,Ql(o,!1),t=d.updateQueue,n.updateQueue=t,_u(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Ym(a,t),a=a.sibling;return ye(ii,ii.current&1|2),Zt&&Os(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ie()>Su&&(n.flags|=128,u=!0,Ql(o,!1),n.lanes=4194304)}else{if(!u)if(t=su(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,_u(n,t),Ql(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Zt)return zn(n),null}else 2*Ie()-o.renderingStartTime>Su&&a!==536870912&&(n.flags|=128,u=!0,Ql(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ie(),t.sibling=null,a=ii.current,ye(ii,u?a&1|2:a&1),Zt&&Os(n,o.treeForkCount),t):(zn(n),null);case 22:case 23:return fa(n),hd(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(zn(n),n.subtreeFlags&6&&(n.flags|=8192)):zn(n),a=n.updateQueue,a!==null&&_u(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&J(Qr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Ls(li),zn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function $b(t,n){switch(Qf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Ls(li),We(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return ut(n),null;case 31:if(n.memoizedState!==null){if(fa(n),n.alternate===null)throw Error(s(340));$r()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(fa(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));$r()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return J(ii),null;case 4:return We(),null;case 10:return Ls(n.type),null;case 22:case 23:return fa(n),hd(),t!==null&&J(Qr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Ls(li),null;case 25:return null;default:return null}}function v0(t,n){switch(Qf(n),n.tag){case 3:Ls(li),We();break;case 26:case 27:case 5:ut(n);break;case 4:We();break;case 31:n.memoizedState!==null&&fa(n);break;case 13:fa(n);break;case 19:J(ii);break;case 10:Ls(n.type);break;case 22:case 23:fa(n),hd(),t!==null&&J(Qr);break;case 24:Ls(li)}}function Jl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,b=a.inst;o=d(),b.destroy=o}a=a.next}while(a!==u)}}catch(R){yn(n,n.return,R)}}function pr(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var b=o.inst,R=b.destroy;if(R!==void 0){b.destroy=void 0,u=n;var z=a,re=R;try{re()}catch(xe){yn(u,z,xe)}}}o=o.next}while(o!==d)}}catch(xe){yn(n,n.return,xe)}}function b0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{ug(n,a)}catch(o){yn(t,t.return,o)}}}function y0(t,n,a){a.props=io(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){yn(t,n,o)}}function ec(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){yn(t,n,u)}}function rs(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){yn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){yn(t,n,u)}else a.current=null}function E0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){yn(t,t.return,u)}}function Xd(t,n,a){try{var o=t.stateNode;xy(o,t.type,a,n),o[tn]=n}catch(u){yn(t,t.return,u)}}function S0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&yr(t.type)||t.tag===4}function Yd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||S0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&yr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Wd(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=sa));else if(o!==4&&(o===27&&yr(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Wd(t,n,a),t=t.sibling;t!==null;)Wd(t,n,a),t=t.sibling}function vu(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&yr(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(vu(t,n,a),t=t.sibling;t!==null;)vu(t,n,a),t=t.sibling}function M0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Oi(n,o,a),n[Pn]=t,n[tn]=a}catch(d){yn(t,t.return,d)}}var Bs=!1,fi=!1,qd=!1,T0=typeof WeakSet=="function"?WeakSet:Set,Mi=null;function Kb(t,n){if(t=t.containerInfo,mh=Gu,t=xt(t),mn(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var b=0,R=-1,z=-1,re=0,xe=0,ve=t,le=null;t:for(;;){for(var ce;ve!==a||u!==0&&ve.nodeType!==3||(R=b+u),ve!==d||o!==0&&ve.nodeType!==3||(z=b+o),ve.nodeType===3&&(b+=ve.nodeValue.length),(ce=ve.firstChild)!==null;)le=ve,ve=ce;for(;;){if(ve===t)break t;if(le===a&&++re===u&&(R=b),le===d&&++xe===o&&(z=b),(ce=ve.nextSibling)!==null)break;ve=le,le=ve.parentNode}ve=ce}a=R===-1||z===-1?null:{start:R,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(gh={focusedElem:t,selectionRange:a},Gu=!1,Mi=n;Mi!==null;)if(n=Mi,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Mi=t;else for(;Mi!==null;){switch(n=Mi,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var it=io(a.type,u);t=o.getSnapshotBeforeUpdate(it,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(_t){yn(a,a.return,_t)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)vh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":vh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Mi=t;break}Mi=n.return}}function A0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Gs(t,a),o&4&&Jl(5,a);break;case 1:if(Gs(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(b){yn(a,a.return,b)}else{var u=io(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(b){yn(a,a.return,b)}}o&64&&b0(a),o&512&&ec(a,a.return);break;case 3:if(Gs(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ug(t,n)}catch(b){yn(a,a.return,b)}}break;case 27:n===null&&o&4&&M0(a);case 26:case 5:Gs(t,a),n===null&&o&4&&E0(a),o&512&&ec(a,a.return);break;case 12:Gs(t,a);break;case 31:Gs(t,a),o&4&&C0(t,a);break;case 13:Gs(t,a),o&4&&N0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=sy.bind(null,a),Ty(t,a))));break;case 22:if(o=a.memoizedState!==null||Bs,!o){n=n!==null&&n.memoizedState!==null||fi,u=Bs;var d=fi;Bs=o,(fi=n)&&!d?Hs(t,a,(a.subtreeFlags&8772)!==0):Gs(t,a),Bs=u,fi=d}break;case 30:break;default:Gs(t,a)}}function w0(t){var n=t.alternate;n!==null&&(t.alternate=null,w0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&yo(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var jn=null,Ki=!1;function zs(t,n,a){for(a=a.child;a!==null;)R0(t,n,a),a=a.sibling}function R0(t,n,a){if(me&&typeof me.onCommitFiberUnmount=="function")try{me.onCommitFiberUnmount(ue,a)}catch{}switch(a.tag){case 26:fi||rs(a,n),zs(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:fi||rs(a,n);var o=jn,u=Ki;yr(a.type)&&(jn=a.stateNode,Ki=!1),zs(t,n,a),cc(a.stateNode),jn=o,Ki=u;break;case 5:fi||rs(a,n);case 6:if(o=jn,u=Ki,jn=null,zs(t,n,a),jn=o,Ki=u,jn!==null)if(Ki)try{(jn.nodeType===9?jn.body:jn.nodeName==="HTML"?jn.ownerDocument.body:jn).removeChild(a.stateNode)}catch(d){yn(a,n,d)}else try{jn.removeChild(a.stateNode)}catch(d){yn(a,n,d)}break;case 18:jn!==null&&(Ki?(t=jn,bx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),nl(t)):bx(jn,a.stateNode));break;case 4:o=jn,u=Ki,jn=a.stateNode.containerInfo,Ki=!0,zs(t,n,a),jn=o,Ki=u;break;case 0:case 11:case 14:case 15:pr(2,a,n),fi||pr(4,a,n),zs(t,n,a);break;case 1:fi||(rs(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&y0(a,n,o)),zs(t,n,a);break;case 21:zs(t,n,a);break;case 22:fi=(o=fi)||a.memoizedState!==null,zs(t,n,a),fi=o;break;default:zs(t,n,a)}}function C0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{nl(t)}catch(a){yn(n,n.return,a)}}}function N0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{nl(t)}catch(a){yn(n,n.return,a)}}function Zb(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new T0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new T0),n;default:throw Error(s(435,t.tag))}}function bu(t,n){var a=Zb(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=ry.bind(null,t,o);o.then(u,u)}})}function Zi(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,b=n,R=b;e:for(;R!==null;){switch(R.tag){case 27:if(yr(R.type)){jn=R.stateNode,Ki=!1;break e}break;case 5:jn=R.stateNode,Ki=!1;break e;case 3:case 4:jn=R.stateNode.containerInfo,Ki=!0;break e}R=R.return}if(jn===null)throw Error(s(160));R0(d,b,u),jn=null,Ki=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)O0(n,t),n=n.sibling}var Ya=null;function O0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Zi(n,t),Qi(t),o&4&&(pr(3,t,t.return),Jl(3,t),pr(5,t,t.return));break;case 1:Zi(n,t),Qi(t),o&512&&(fi||a===null||rs(a,a.return)),o&64&&Bs&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ya;if(Zi(n,t),Qi(t),o&512&&(fi||a===null||rs(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Es]||d[Pn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Oi(d,o,a),d[Pn]=t,Ln(d),o=d;break e;case"link":var b=Ox("link","href",u).get(o+(a.href||""));if(b){for(var R=0;R<b.length;R++)if(d=b[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){b.splice(R,1);break t}}d=u.createElement(o),Oi(d,o,a),u.head.appendChild(d);break;case"meta":if(b=Ox("meta","content",u).get(o+(a.content||""))){for(R=0;R<b.length;R++)if(d=b[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){b.splice(R,1);break t}}d=u.createElement(o),Oi(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[Pn]=t,Ln(d),o=d}t.stateNode=o}else Dx(u,t.type,t.stateNode);else t.stateNode=Nx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Dx(u,t.type,t.stateNode):Nx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Xd(t,t.memoizedProps,a.memoizedProps)}break;case 27:Zi(n,t),Qi(t),o&512&&(fi||a===null||rs(a,a.return)),a!==null&&o&4&&Xd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Zi(n,t),Qi(t),o&512&&(fi||a===null||rs(a,a.return)),t.flags&32){u=t.stateNode;try{hi(u,"")}catch(it){yn(t,t.return,it)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Xd(t,u,a!==null?a.memoizedProps:u)),o&1024&&(qd=!0);break;case 6:if(Zi(n,t),Qi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(it){yn(t,t.return,it)}}break;case 3:if(Pu=null,u=Ya,Ya=Iu(n.containerInfo),Zi(n,t),Ya=u,Qi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{nl(n.containerInfo)}catch(it){yn(t,t.return,it)}qd&&(qd=!1,D0(t));break;case 4:o=Ya,Ya=Iu(t.stateNode.containerInfo),Zi(n,t),Qi(t),Ya=o;break;case 12:Zi(n,t),Qi(t);break;case 31:Zi(n,t),Qi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 13:Zi(n,t),Qi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Eu=Ie()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 22:u=t.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,re=Bs,xe=fi;if(Bs=re||u,fi=xe||z,Zi(n,t),fi=xe,Bs=re,Qi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||Bs||fi||ao(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(d=z.stateNode,u)b=d.style,typeof b.setProperty=="function"?b.setProperty("display","none","important"):b.display="none";else{R=z.stateNode;var ve=z.memoizedProps.style,le=ve!=null&&ve.hasOwnProperty("display")?ve.display:null;R.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(it){yn(z,z.return,it)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(it){yn(z,z.return,it)}}}else if(n.tag===18){if(a===null){z=n;try{var ce=z.stateNode;u?yx(ce,!0):yx(z.stateNode,!1)}catch(it){yn(z,z.return,it)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,bu(t,a))));break;case 19:Zi(n,t),Qi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 30:break;case 21:break;default:Zi(n,t),Qi(t)}}function Qi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(S0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Yd(t);vu(t,d,u);break;case 5:var b=a.stateNode;a.flags&32&&(hi(b,""),a.flags&=-33);var R=Yd(t);vu(t,R,b);break;case 3:case 4:var z=a.stateNode.containerInfo,re=Yd(t);Wd(t,re,z);break;default:throw Error(s(161))}}catch(xe){yn(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function D0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;D0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Gs(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)A0(t,n.alternate,n),n=n.sibling}function ao(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:pr(4,n,n.return),ao(n);break;case 1:rs(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&y0(n,n.return,a),ao(n);break;case 27:cc(n.stateNode);case 26:case 5:rs(n,n.return),ao(n);break;case 22:n.memoizedState===null&&ao(n);break;case 30:ao(n);break;default:ao(n)}t=t.sibling}}function Hs(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,b=d.flags;switch(d.tag){case 0:case 11:case 15:Hs(u,d,a),Jl(4,d);break;case 1:if(Hs(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(re){yn(o,o.return,re)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)cg(z[u],R)}catch(re){yn(o,o.return,re)}}a&&b&64&&b0(d),ec(d,d.return);break;case 27:M0(d);case 26:case 5:Hs(u,d,a),a&&o===null&&b&4&&E0(d),ec(d,d.return);break;case 12:Hs(u,d,a);break;case 31:Hs(u,d,a),a&&b&4&&C0(u,d);break;case 13:Hs(u,d,a),a&&b&4&&N0(u,d);break;case 22:d.memoizedState===null&&Hs(u,d,a),ec(d,d.return);break;case 30:break;default:Hs(u,d,a)}n=n.sibling}}function $d(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Gl(a))}function Kd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Gl(t))}function Wa(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)L0(t,n,a,o),n=n.sibling}function L0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Wa(t,n,a,o),u&2048&&Jl(9,n);break;case 1:Wa(t,n,a,o);break;case 3:Wa(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Gl(t)));break;case 12:if(u&2048){Wa(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,b=d.id,R=d.onPostCommit;typeof R=="function"&&R(b,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(z){yn(n,n.return,z)}}else Wa(t,n,a,o);break;case 31:Wa(t,n,a,o);break;case 13:Wa(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,b=n.alternate,n.memoizedState!==null?d._visibility&2?Wa(t,n,a,o):tc(t,n):d._visibility&2?Wa(t,n,a,o):(d._visibility|=2,Xo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&$d(b,n);break;case 24:Wa(t,n,a,o),u&2048&&Kd(n.alternate,n);break;default:Wa(t,n,a,o)}}function Xo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,b=n,R=a,z=o,re=b.flags;switch(b.tag){case 0:case 11:case 15:Xo(d,b,R,z,u),Jl(8,b);break;case 23:break;case 22:var xe=b.stateNode;b.memoizedState!==null?xe._visibility&2?Xo(d,b,R,z,u):tc(d,b):(xe._visibility|=2,Xo(d,b,R,z,u)),u&&re&2048&&$d(b.alternate,b);break;case 24:Xo(d,b,R,z,u),u&&re&2048&&Kd(b.alternate,b);break;default:Xo(d,b,R,z,u)}n=n.sibling}}function tc(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:tc(a,o),u&2048&&$d(o.alternate,o);break;case 24:tc(a,o),u&2048&&Kd(o.alternate,o);break;default:tc(a,o)}n=n.sibling}}var nc=8192;function Yo(t,n,a){if(t.subtreeFlags&nc)for(t=t.child;t!==null;)I0(t,n,a),t=t.sibling}function I0(t,n,a){switch(t.tag){case 26:Yo(t,n,a),t.flags&nc&&t.memoizedState!==null&&Fy(a,Ya,t.memoizedState,t.memoizedProps);break;case 5:Yo(t,n,a);break;case 3:case 4:var o=Ya;Ya=Iu(t.stateNode.containerInfo),Yo(t,n,a),Ya=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=nc,nc=16777216,Yo(t,n,a),nc=o):Yo(t,n,a));break;default:Yo(t,n,a)}}function U0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function ic(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mi=o,F0(o,t)}U0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)P0(t),t=t.sibling}function P0(t){switch(t.tag){case 0:case 11:case 15:ic(t),t.flags&2048&&pr(9,t,t.return);break;case 3:ic(t);break;case 12:ic(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,yu(t)):ic(t);break;default:ic(t)}}function yu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Mi=o,F0(o,t)}U0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:pr(8,n,n.return),yu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,yu(n));break;default:yu(n)}t=t.sibling}}function F0(t,n){for(;Mi!==null;){var a=Mi;switch(a.tag){case 0:case 11:case 15:pr(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Gl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Mi=o;else e:for(a=t;Mi!==null;){o=Mi;var u=o.sibling,d=o.return;if(w0(o),o===a){Mi=null;break e}if(u!==null){u.return=d,Mi=u;break e}Mi=d}}}var Qb={getCacheForType:function(t){var n=Ci(li),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Ci(li).controller.signal}},Jb=typeof WeakMap=="function"?WeakMap:Map,gn=0,Dn=null,Yt=null,$t=0,bn=0,da=null,mr=!1,Wo=!1,Zd=!1,ks=0,Qn=0,gr=0,so=0,Qd=0,ha=0,qo=0,ac=null,Ji=null,Jd=!1,Eu=0,B0=0,Su=1/0,Mu=null,xr=null,gi=0,_r=null,$o=null,Vs=0,eh=0,th=null,z0=null,sc=0,nh=null;function pa(){return(gn&2)!==0&&$t!==0?$t&-$t:U.T!==null?lh():Ja()}function G0(){if(ha===0)if(($t&536870912)===0||Zt){var t=Bt;Bt<<=1,(Bt&3932160)===0&&(Bt=262144),ha=t}else ha=536870912;return t=ua.current,t!==null&&(t.flags|=32),ha}function ea(t,n,a){(t===Dn&&(bn===2||bn===9)||t.cancelPendingCommit!==null)&&(Ko(t,0),vr(t,$t,ha,!1)),gt(t,a),((gn&2)===0||t!==Dn)&&(t===Dn&&((gn&2)===0&&(so|=a),Qn===4&&vr(t,$t,ha,!1)),os(t))}function H0(t,n,a){if((gn&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Xe(t,n),u=o?ny(t,n):ah(t,n,!0),d=o;do{if(u===0){Wo&&!o&&vr(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!ey(a)){u=ah(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var b=0;else b=t.pendingLanes&-536870913,b=b!==0?b:b&536870912?536870912:0;if(b!==0){n=b;e:{var R=t;u=ac;var z=R.current.memoizedState.isDehydrated;if(z&&(Ko(R,b).flags|=256),b=ah(R,b,!1),b!==2){if(Zd&&!z){R.errorRecoveryDisabledLanes|=d,so|=d,u=4;break e}d=Ji,Ji=u,d!==null&&(Ji===null?Ji=d:Ji.push.apply(Ji,d))}u=b}if(d=!1,u!==2)continue}}if(u===1){Ko(t,0),vr(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:vr(o,n,ha,!mr);break e;case 2:Ji=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Eu+300-Ie(),10<u)){if(vr(o,n,ha,!mr),fe(o,0,!0)!==0)break e;Vs=n,o.timeoutHandle=_x(k0.bind(null,o,a,Ji,Mu,Jd,n,ha,so,qo,mr,d,"Throttled",-0,0),u);break e}k0(o,a,Ji,Mu,Jd,n,ha,so,qo,mr,d,null,-0,0)}}break}while(!0);os(t)}function k0(t,n,a,o,u,d,b,R,z,re,xe,ve,le,ce){if(t.timeoutHandle=-1,ve=n.subtreeFlags,ve&8192||(ve&16785408)===16785408){ve={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sa},I0(n,d,ve);var it=(d&62914560)===d?Eu-Ie():(d&4194048)===d?B0-Ie():0;if(it=By(ve,it),it!==null){Vs=d,t.cancelPendingCommit=it(K0.bind(null,t,n,d,a,o,u,b,R,z,xe,ve,null,le,ce)),vr(t,d,b,!re);return}}K0(t,n,d,a,o,u,b,R,z)}function ey(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Ke(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function vr(t,n,a,o){n&=~Qd,n&=~so,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-Ge(u),b=1<<d;o[d]=-1,u&=~b}a!==0&&en(t,a,n)}function Tu(){return(gn&6)===0?(rc(0),!1):!0}function ih(){if(Yt!==null){if(bn===0)var t=Yt.return;else t=Yt,Ds=Kr=null,vd(t),Go=null,kl=0,t=Yt;for(;t!==null;)v0(t.alternate,t),t=t.return;Yt=null}}function Ko(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,by(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Vs=0,ih(),Dn=t,Yt=a=Ns(t.current,null),$t=n,bn=0,da=null,mr=!1,Wo=Xe(t,n),Zd=!1,qo=ha=Qd=so=gr=Qn=0,Ji=ac=null,Jd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Ge(o),d=1<<u;n|=t[u],o&=~d}return ks=n,Yc(),a}function V0(t,n){It=null,U.H=Kl,n===zo||n===eu?(n=sg(),bn=3):n===od?(n=sg(),bn=4):bn=n===Ud?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,da=n,Yt===null&&(Qn=1,pu(t,wa(n,t.current)))}function j0(){var t=ua.current;return t===null?!0:($t&4194048)===$t?Oa===null:($t&62914560)===$t||($t&536870912)!==0?t===Oa:!1}function X0(){var t=U.H;return U.H=Kl,t===null?Kl:t}function Y0(){var t=U.A;return U.A=Qb,t}function Au(){Qn=4,mr||($t&4194048)!==$t&&ua.current!==null||(Wo=!0),(gr&134217727)===0&&(so&134217727)===0||Dn===null||vr(Dn,$t,ha,!1)}function ah(t,n,a){var o=gn;gn|=2;var u=X0(),d=Y0();(Dn!==t||$t!==n)&&(Mu=null,Ko(t,n)),n=!1;var b=Qn;e:do try{if(bn!==0&&Yt!==null){var R=Yt,z=da;switch(bn){case 8:ih(),b=6;break e;case 3:case 2:case 9:case 6:ua.current===null&&(n=!0);var re=bn;if(bn=0,da=null,Zo(t,R,z,re),a&&Wo){b=0;break e}break;default:re=bn,bn=0,da=null,Zo(t,R,z,re)}}ty(),b=Qn;break}catch(xe){V0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,Ds=Kr=null,gn=o,U.H=u,U.A=d,Yt===null&&(Dn=null,$t=0,Yc()),b}function ty(){for(;Yt!==null;)W0(Yt)}function ny(t,n){var a=gn;gn|=2;var o=X0(),u=Y0();Dn!==t||$t!==n?(Mu=null,Su=Ie()+500,Ko(t,n)):Wo=Xe(t,n);e:do try{if(bn!==0&&Yt!==null){n=Yt;var d=da;t:switch(bn){case 1:bn=0,da=null,Zo(t,n,d,1);break;case 2:case 9:if(ig(d)){bn=0,da=null,q0(n);break}n=function(){bn!==2&&bn!==9||Dn!==t||(bn=7),os(t)},d.then(n,n);break e;case 3:bn=7;break e;case 4:bn=5;break e;case 7:ig(d)?(bn=0,da=null,q0(n)):(bn=0,da=null,Zo(t,n,d,7));break;case 5:var b=null;switch(Yt.tag){case 26:b=Yt.memoizedState;case 5:case 27:var R=Yt;if(b?Lx(b):R.stateNode.complete){bn=0,da=null;var z=R.sibling;if(z!==null)Yt=z;else{var re=R.return;re!==null?(Yt=re,wu(re)):Yt=null}break t}}bn=0,da=null,Zo(t,n,d,5);break;case 6:bn=0,da=null,Zo(t,n,d,6);break;case 8:ih(),Qn=6;break e;default:throw Error(s(462))}}iy();break}catch(xe){V0(t,xe)}while(!0);return Ds=Kr=null,U.H=o,U.A=u,gn=a,Yt!==null?0:(Dn=null,$t=0,Yc(),Qn)}function iy(){for(;Yt!==null&&!Ut();)W0(Yt)}function W0(t){var n=x0(t.alternate,t,ks);t.memoizedProps=t.pendingProps,n===null?wu(t):Yt=n}function q0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=f0(a,n,n.pendingProps,n.type,void 0,$t);break;case 11:n=f0(a,n,n.pendingProps,n.type.render,n.ref,$t);break;case 5:vd(n);default:v0(a,n),n=Yt=Ym(n,ks),n=x0(a,n,ks)}t.memoizedProps=t.pendingProps,n===null?wu(t):Yt=n}function Zo(t,n,a,o){Ds=Kr=null,vd(n),Go=null,kl=0;var u=n.return;try{if(Xb(t,u,n,a,$t)){Qn=1,pu(t,wa(a,t.current)),Yt=null;return}}catch(d){if(u!==null)throw Yt=u,d;Qn=1,pu(t,wa(a,t.current)),Yt=null;return}n.flags&32768?(Zt||o===1?t=!0:Wo||($t&536870912)!==0?t=!1:(mr=t=!0,(o===2||o===9||o===3||o===6)&&(o=ua.current,o!==null&&o.tag===13&&(o.flags|=16384))),$0(n,t)):wu(n)}function wu(t){var n=t;do{if((n.flags&32768)!==0){$0(n,mr);return}t=n.return;var a=qb(n.alternate,n,ks);if(a!==null){Yt=a;return}if(n=n.sibling,n!==null){Yt=n;return}Yt=n=t}while(n!==null);Qn===0&&(Qn=5)}function $0(t,n){do{var a=$b(t.alternate,t);if(a!==null){a.flags&=32767,Yt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Yt=t;return}Yt=t=a}while(t!==null);Qn=6,Yt=null}function K0(t,n,a,o,u,d,b,R,z){t.cancelPendingCommit=null;do Ru();while(gi!==0);if((gn&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Yf,Un(t,a,d,b,R,z),t===Dn&&(Yt=Dn=null,$t=0),$o=n,_r=t,Vs=a,eh=d,th=u,z0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,oy(Q,function(){return tx(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=U.T,U.T=null,u=G.p,G.p=2,b=gn,gn|=4;try{Kb(t,n,a)}finally{gn=b,G.p=u,U.T=o}}gi=1,Z0(),Q0(),J0()}}function Z0(){if(gi===1){gi=0;var t=_r,n=$o,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=U.T,U.T=null;var o=G.p;G.p=2;var u=gn;gn|=4;try{O0(n,t);var d=gh,b=xt(t.containerInfo),R=d.focusedElem,z=d.selectionRange;if(b!==R&&R&&R.ownerDocument&&cn(R.ownerDocument.documentElement,R)){if(z!==null&&mn(R)){var re=z.start,xe=z.end;if(xe===void 0&&(xe=re),"selectionStart"in R)R.selectionStart=re,R.selectionEnd=Math.min(xe,R.value.length);else{var ve=R.ownerDocument||document,le=ve&&ve.defaultView||window;if(le.getSelection){var ce=le.getSelection(),it=R.textContent.length,_t=Math.min(z.start,it),Tn=z.end===void 0?_t:Math.min(z.end,it);!ce.extend&&_t>Tn&&(b=Tn,Tn=_t,_t=b);var Z=$n(R,_t),j=$n(R,Tn);if(Z&&j&&(ce.rangeCount!==1||ce.anchorNode!==Z.node||ce.anchorOffset!==Z.offset||ce.focusNode!==j.node||ce.focusOffset!==j.offset)){var se=ve.createRange();se.setStart(Z.node,Z.offset),ce.removeAllRanges(),_t>Tn?(ce.addRange(se),ce.extend(j.node,j.offset)):(se.setEnd(j.node,j.offset),ce.addRange(se))}}}}for(ve=[],ce=R;ce=ce.parentNode;)ce.nodeType===1&&ve.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ve.length;R++){var _e=ve[R];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}Gu=!!mh,gh=mh=null}finally{gn=u,G.p=o,U.T=a}}t.current=n,gi=2}}function Q0(){if(gi===2){gi=0;var t=_r,n=$o,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=U.T,U.T=null;var o=G.p;G.p=2;var u=gn;gn|=4;try{A0(t,n.alternate,n)}finally{gn=u,G.p=o,U.T=a}}gi=3}}function J0(){if(gi===4||gi===3){gi=0,dn();var t=_r,n=$o,a=Vs,o=z0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?gi=5:(gi=0,$o=_r=null,ex(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(xr=null),Ai(a),n=n.stateNode,me&&typeof me.onCommitFiberRoot=="function")try{me.onCommitFiberRoot(ue,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=U.T,u=G.p,G.p=2,U.T=null;try{for(var d=t.onRecoverableError,b=0;b<o.length;b++){var R=o[b];d(R.value,{componentStack:R.stack})}}finally{U.T=n,G.p=u}}(Vs&3)!==0&&Ru(),os(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===nh?sc++:(sc=0,nh=t):sc=0,rc(0)}}function ex(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Gl(n)))}function Ru(){return Z0(),Q0(),J0(),tx()}function tx(){if(gi!==5)return!1;var t=_r,n=eh;eh=0;var a=Ai(Vs),o=U.T,u=G.p;try{G.p=32>a?32:a,U.T=null,a=th,th=null;var d=_r,b=Vs;if(gi=0,$o=_r=null,Vs=0,(gn&6)!==0)throw Error(s(331));var R=gn;if(gn|=4,P0(d.current),L0(d,d.current,b,a),gn=R,rc(0,!1),me&&typeof me.onPostCommitFiberRoot=="function")try{me.onPostCommitFiberRoot(ue,d)}catch{}return!0}finally{G.p=u,U.T=o,ex(t,n)}}function nx(t,n,a){n=wa(a,n),n=Id(t.stateNode,n,2),t=fr(t,n,2),t!==null&&(gt(t,2),os(t))}function yn(t,n,a){if(t.tag===3)nx(t,t,a);else for(;n!==null;){if(n.tag===3){nx(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(xr===null||!xr.has(o))){t=wa(a,t),a=i0(2),o=fr(n,a,2),o!==null&&(a0(a,o,n,t),gt(o,2),os(o));break}}n=n.return}}function sh(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new Jb;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Zd=!0,u.add(a),t=ay.bind(null,t,n,a),n.then(t,t))}function ay(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Dn===t&&($t&a)===a&&(Qn===4||Qn===3&&($t&62914560)===$t&&300>Ie()-Eu?(gn&2)===0&&Ko(t,0):Qd|=a,qo===$t&&(qo=0)),os(t)}function ix(t,n){n===0&&(n=we()),t=Wr(t,n),t!==null&&(gt(t,n),os(t))}function sy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),ix(t,a)}function ry(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),ix(t,a)}function oy(t,n){return X(t,n)}var Cu=null,Qo=null,rh=!1,Nu=!1,oh=!1,br=0;function os(t){t!==Qo&&t.next===null&&(Qo===null?Cu=Qo=t:Qo=Qo.next=t),Nu=!0,rh||(rh=!0,cy())}function rc(t,n){if(!oh&&Nu){oh=!0;do for(var a=!1,o=Cu;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var b=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-Ge(42|t)+1)-1,d&=u&~(b&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,ox(o,d))}else d=$t,d=fe(o,o===Dn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Xe(o,d)||(a=!0,ox(o,d));o=o.next}while(a);oh=!1}}function ly(){ax()}function ax(){Nu=rh=!1;var t=0;br!==0&&vy()&&(t=br);for(var n=Ie(),a=null,o=Cu;o!==null;){var u=o.next,d=sx(o,n);d===0?(o.next=null,a===null?Cu=u:a.next=u,u===null&&(Qo=a)):(a=o,(t!==0||(d&3)!==0)&&(Nu=!0)),o=u}gi!==0&&gi!==5||rc(t),br!==0&&(br=0)}function sx(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var b=31-Ge(d),R=1<<b,z=u[b];z===-1?((R&a)===0||(R&o)!==0)&&(u[b]=Le(R,n)):z<=n&&(t.expiredLanes|=R),d&=~R}if(n=Dn,a=$t,a=fe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(bn===2||bn===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Jt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Xe(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Jt(o),Ai(a)){case 2:case 8:a=M;break;case 32:a=Q;break;case 268435456:a=Te;break;default:a=Q}return o=rx.bind(null,t),a=X(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Jt(o),t.callbackPriority=2,t.callbackNode=null,2}function rx(t,n){if(gi!==0&&gi!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ru()&&t.callbackNode!==a)return null;var o=$t;return o=fe(t,t===Dn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(H0(t,o,n),sx(t,Ie()),t.callbackNode!=null&&t.callbackNode===a?rx.bind(null,t):null)}function ox(t,n){if(Ru())return null;H0(t,n,!0)}function cy(){yy(function(){(gn&6)!==0?X(O,ly):ax()})}function lh(){if(br===0){var t=Fo;t===0&&(t=lt,lt<<=1,(lt&261888)===0&&(lt=256)),br=t}return br}function lx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ts(""+t)}function cx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function uy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=lx((u[tn]||null).action),b=o.submitter;b&&(n=(n=b[tn]||null)?lx(n.formAction):b.getAttribute("formAction"),n!==null&&(d=n,b=null));var R=new To("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(br!==0){var z=b?cx(u,b):new FormData(u);Rd(a,{pending:!0,data:z,method:u.method,action:d},null,z)}}else typeof d=="function"&&(R.preventDefault(),z=b?cx(u,b):new FormData(u),Rd(a,{pending:!0,data:z,method:u.method,action:d},d,z))},currentTarget:u}]})}}for(var ch=0;ch<Xf.length;ch++){var uh=Xf[ch],fy=uh.toLowerCase(),dy=uh[0].toUpperCase()+uh.slice(1);Xa(fy,"on"+dy)}Xa(Gm,"onAnimationEnd"),Xa(Hm,"onAnimationIteration"),Xa(km,"onAnimationStart"),Xa("dblclick","onDoubleClick"),Xa("focusin","onFocus"),Xa("focusout","onBlur"),Xa(Rb,"onTransitionRun"),Xa(Cb,"onTransitionStart"),Xa(Nb,"onTransitionCancel"),Xa(Vm,"onTransitionEnd"),K("onMouseEnter",["mouseout","mouseover"]),K("onMouseLeave",["mouseout","mouseover"]),K("onPointerEnter",["pointerout","pointerover"]),K("onPointerLeave",["pointerout","pointerover"]),q("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),q("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),q("onBeforeInput",["compositionend","keypress","textInput","paste"]),q("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(oc));function ux(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var b=o.length-1;0<=b;b--){var R=o[b],z=R.instance,re=R.currentTarget;if(R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(xe){Xc(xe)}u.currentTarget=null,d=z}else for(b=0;b<o.length;b++){if(R=o[b],z=R.instance,re=R.currentTarget,R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(xe){Xc(xe)}u.currentTarget=null,d=z}}}}function Wt(t,n){var a=n[Rn];a===void 0&&(a=n[Rn]=new Set);var o=t+"__bubble";a.has(o)||(fx(n,t,2,!1),a.add(o))}function fh(t,n,a){var o=0;n&&(o|=4),fx(a,t,o,n)}var Ou="_reactListening"+Math.random().toString(36).slice(2);function dh(t){if(!t[Ou]){t[Ou]=!0,kr.forEach(function(a){a!=="selectionchange"&&(hy.has(a)||fh(a,!1,t),fh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Ou]||(n[Ou]=!0,fh("selectionchange",!1,n))}}function fx(t,n,a,o){switch(Gx(n)){case 2:var u=Hy;break;case 8:u=ky;break;default:u=wh}a=u.bind(null,n,a,t),u=void 0,!ya||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function hh(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var b=o.tag;if(b===3||b===4){var R=o.stateNode.containerInfo;if(R===u)break;if(b===4)for(b=o.return;b!==null;){var z=b.tag;if((z===3||z===4)&&b.stateNode.containerInfo===u)return;b=b.return}for(;R!==null;){if(b=ba(R),b===null)return;if(z=b.tag,z===5||z===6||z===26||z===27){o=d=b;continue e}R=R.parentNode}}o=o.return}Dl(function(){var re=d,xe=Va(a),ve=[];e:{var le=jm.get(t);if(le!==void 0){var ce=To,it=t;switch(t){case"keypress":if(So(a)===0)break e;case"keydown":case"keyup":ce=_n;break;case"focusin":it="focus",ce=Pl;break;case"focusout":it="blur",ce=Pl;break;case"beforeblur":case"afterblur":ce=Pl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ce=Ul;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ce=kf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ce=Jn;break;case Gm:case Hm:case km:ce=zt;break;case Vm:ce=ji;break;case"scroll":case"scrollend":ce=Gc;break;case"wheel":ce=$i;break;case"copy":case"cut":case"paste":ce=ct;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ce=Vi;break;case"toggle":case"beforetoggle":ce=ei}var _t=(n&4)!==0,Tn=!_t&&(t==="scroll"||t==="scrollend"),Z=_t?le!==null?le+"Capture":null:le;_t=[];for(var j=re,se;j!==null;){var _e=j;if(se=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||se===null||Z===null||(_e=ns(j,Z),_e!=null&&_t.push(lc(j,_e,se))),Tn)break;j=j.return}0<_t.length&&(le=new ce(le,it,null,a,xe),ve.push({event:le,listeners:_t}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",ce=t==="mouseout"||t==="pointerout",le&&a!==ki&&(it=a.relatedTarget||a.fromElement)&&(ba(it)||it[aa]))break e;if((ce||le)&&(le=xe.window===xe?xe:(le=xe.ownerDocument)?le.defaultView||le.parentWindow:window,ce?(it=a.relatedTarget||a.toElement,ce=re,it=it?ba(it):null,it!==null&&(Tn=c(it),_t=it.tag,it!==Tn||_t!==5&&_t!==27&&_t!==6)&&(it=null)):(ce=null,it=re),ce!==it)){if(_t=Ul,_e="onMouseLeave",Z="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&(_t=Vi,_e="onPointerLeave",Z="onPointerEnter",j="pointer"),Tn=ce==null?le:Ga(ce),se=it==null?le:Ga(it),le=new _t(_e,j+"leave",ce,a,xe),le.target=Tn,le.relatedTarget=se,_e=null,ba(xe)===re&&(_t=new _t(Z,j+"enter",it,a,xe),_t.target=se,_t.relatedTarget=Tn,_e=_t),Tn=_e,ce&&it)t:{for(_t=py,Z=ce,j=it,se=0,_e=Z;_e;_e=_t(_e))se++;_e=0;for(var ht=j;ht;ht=_t(ht))_e++;for(;0<se-_e;)Z=_t(Z),se--;for(;0<_e-se;)j=_t(j),_e--;for(;se--;){if(Z===j||j!==null&&Z===j.alternate){_t=Z;break t}Z=_t(Z),j=_t(j)}_t=null}else _t=null;ce!==null&&dx(ve,le,ce,_t,!1),it!==null&&Tn!==null&&dx(ve,Tn,it,_t,!0)}}e:{if(le=re?Ga(re):window,ce=le.nodeName&&le.nodeName.toLowerCase(),ce==="select"||ce==="input"&&le.type==="file")var un=jc;else if(mi(le))if(Fl)un=$e;else{un=Qe;var rt=Mt}else ce=le.nodeName,!ce||ce.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?re&&Nt(re.elementType)&&(un=jc):un=Ot;if(un&&(un=un(t,re))){ja(ve,un,a,xe);break e}rt&&rt(t,le,re),t==="focusout"&&re&&le.type==="number"&&re.memoizedProps.value!=null&&Pt(le,"number",le.value)}switch(rt=re?Ga(re):window,t){case"focusin":(mi(rt)||rt.contentEditable==="true")&&(Yn=rt,Ma=re,Ta=null);break;case"focusout":Ta=Ma=Yn=null;break;case"mousedown":is=!0;break;case"contextmenu":case"mouseup":case"dragend":is=!1,Bm(ve,a,xe);break;case"selectionchange":if(Kn)break;case"keydown":case"keyup":Bm(ve,a,xe)}var Ft;if(qn)e:{switch(t){case"compositionstart":var Kt="onCompositionStart";break e;case"compositionend":Kt="onCompositionEnd";break e;case"compositionupdate":Kt="onCompositionUpdate";break e}Kt=void 0}else At?ni(t,a)&&(Kt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Kt="onCompositionStart");Kt&&(Si&&a.locale!=="ko"&&(At||Kt!=="onCompositionStart"?Kt==="onCompositionEnd"&&At&&(Ft=Eo()):(ra=xe,Ll="value"in ra?ra.value:ra.textContent,At=!0)),rt=Du(re,Kt),0<rt.length&&(Kt=new yt(Kt,t,null,a,xe),ve.push({event:Kt,listeners:rt}),Ft?Kt.data=Ft:(Ft=la(a),Ft!==null&&(Kt.data=Ft)))),(Ft=Ui?On(t,a):Xi(t,a))&&(Kt=Du(re,"onBeforeInput"),0<Kt.length&&(rt=new yt("onBeforeInput","beforeinput",null,a,xe),ve.push({event:rt,listeners:Kt}),rt.data=Ft)),uy(ve,t,re,a,xe)}ux(ve,n)})}function lc(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Du(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=ns(t,a),u!=null&&o.unshift(lc(t,u,d)),u=ns(t,n),u!=null&&o.push(lc(t,u,d))),t.tag===3)return o;t=t.return}return[]}function py(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function dx(t,n,a,o,u){for(var d=n._reactName,b=[];a!==null&&a!==o;){var R=a,z=R.alternate,re=R.stateNode;if(R=R.tag,z!==null&&z===o)break;R!==5&&R!==26&&R!==27||re===null||(z=re,u?(re=ns(a,d),re!=null&&b.unshift(lc(a,re,z))):u||(re=ns(a,d),re!=null&&b.push(lc(a,re,z)))),a=a.return}b.length!==0&&t.push({event:n,listeners:b})}var my=/\r\n?/g,gy=/\u0000|\uFFFD/g;function hx(t){return(typeof t=="string"?t:""+t).replace(my,`
`).replace(gy,"")}function px(t,n){return n=hx(n),hx(t)===n}function Mn(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||hi(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&hi(t,""+o);break;case"className":tt(t,"class",o);break;case"tabIndex":tt(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":tt(t,a,o);break;case"style":pi(t,o,d);break;case"data":if(n!=="object"){tt(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=ts(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&Mn(t,n,"name",u.name,u,null),Mn(t,n,"formEncType",u.formEncType,u,null),Mn(t,n,"formMethod",u.formMethod,u,null),Mn(t,n,"formTarget",u.formTarget,u,null)):(Mn(t,n,"encType",u.encType,u,null),Mn(t,n,"method",u.method,u,null),Mn(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=ts(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=sa);break;case"onScroll":o!=null&&Wt("scroll",t);break;case"onScrollEnd":o!=null&&Wt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=ts(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Wt("beforetoggle",t),Wt("toggle",t),He(t,"popover",o);break;case"xlinkActuate":Ze(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ze(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ze(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ze(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ze(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ze(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":He(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ka.get(a)||a,He(t,a,o))}}function ph(t,n,a,o,u,d){switch(a){case"style":pi(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?hi(t,o):(typeof o=="number"||typeof o=="bigint")&&hi(t,""+o);break;case"onScroll":o!=null&&Wt("scroll",t);break;case"onScrollEnd":o!=null&&Wt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=sa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[tn]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):He(t,a,o)}}}function Oi(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Wt("error",t),Wt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var b=a[d];if(b!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Mn(t,n,d,b,a,null)}}u&&Mn(t,n,"srcSet",a.srcSet,a,null),o&&Mn(t,n,"src",a.src,a,null);return;case"input":Wt("invalid",t);var R=d=b=u=null,z=null,re=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":u=xe;break;case"type":b=xe;break;case"checked":z=xe;break;case"defaultChecked":re=xe;break;case"value":d=xe;break;case"defaultValue":R=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(s(137,n));break;default:Mn(t,n,o,xe,a,null)}}oi(t,d,R,z,re,b,u,!1);return;case"select":Wt("invalid",t),o=b=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":b=R;break;case"multiple":o=R;default:Mn(t,n,u,R,a,null)}n=d,a=b,t.multiple=!!o,n!=null?Cn(t,!!o,n,!1):a!=null&&Cn(t,!!o,a,!0);return;case"textarea":Wt("invalid",t),d=u=o=null;for(b in a)if(a.hasOwnProperty(b)&&(R=a[b],R!=null))switch(b){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:Mn(t,n,b,R,a,null)}Hn(t,o,u,d);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":Mn(t,n,z,o,a,null));return;case"dialog":Wt("beforetoggle",t),Wt("toggle",t),Wt("cancel",t),Wt("close",t);break;case"iframe":case"object":Wt("load",t);break;case"video":case"audio":for(o=0;o<oc.length;o++)Wt(oc[o],t);break;case"image":Wt("error",t),Wt("load",t);break;case"details":Wt("toggle",t);break;case"embed":case"source":case"link":Wt("error",t),Wt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(re in a)if(a.hasOwnProperty(re)&&(o=a[re],o!=null))switch(re){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Mn(t,n,re,o,a,null)}return;default:if(Nt(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&ph(t,n,xe,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&Mn(t,n,R,o,a,null))}function xy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,b=null,R=null,z=null,re=null,xe=null;for(ce in a){var ve=a[ce];if(a.hasOwnProperty(ce)&&ve!=null)switch(ce){case"checked":break;case"value":break;case"defaultValue":z=ve;default:o.hasOwnProperty(ce)||Mn(t,n,ce,null,o,ve)}}for(var le in o){var ce=o[le];if(ve=a[le],o.hasOwnProperty(le)&&(ce!=null||ve!=null))switch(le){case"type":d=ce;break;case"name":u=ce;break;case"checked":re=ce;break;case"defaultChecked":xe=ce;break;case"value":b=ce;break;case"defaultValue":R=ce;break;case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:ce!==ve&&Mn(t,n,le,ce,o,ve)}}ke(t,b,R,z,re,xe,d,u);return;case"select":ce=b=R=le=null;for(d in a)if(z=a[d],a.hasOwnProperty(d)&&z!=null)switch(d){case"value":break;case"multiple":ce=z;default:o.hasOwnProperty(d)||Mn(t,n,d,null,o,z)}for(u in o)if(d=o[u],z=a[u],o.hasOwnProperty(u)&&(d!=null||z!=null))switch(u){case"value":le=d;break;case"defaultValue":R=d;break;case"multiple":b=d;default:d!==z&&Mn(t,n,u,d,o,z)}n=R,a=b,o=ce,le!=null?Cn(t,!!a,le,!1):!!o!=!!a&&(n!=null?Cn(t,!!a,n,!0):Cn(t,!!a,a?[]:"",!1));return;case"textarea":ce=le=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:Mn(t,n,R,null,o,u)}for(b in o)if(u=o[b],d=a[b],o.hasOwnProperty(b)&&(u!=null||d!=null))switch(b){case"value":le=u;break;case"defaultValue":ce=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&Mn(t,n,b,u,o,d)}Gn(t,le,ce);return;case"option":for(var it in a)le=a[it],a.hasOwnProperty(it)&&le!=null&&!o.hasOwnProperty(it)&&(it==="selected"?t.selected=!1:Mn(t,n,it,null,o,le));for(z in o)le=o[z],ce=a[z],o.hasOwnProperty(z)&&le!==ce&&(le!=null||ce!=null)&&(z==="selected"?t.selected=le&&typeof le!="function"&&typeof le!="symbol":Mn(t,n,z,le,o,ce));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _t in a)le=a[_t],a.hasOwnProperty(_t)&&le!=null&&!o.hasOwnProperty(_t)&&Mn(t,n,_t,null,o,le);for(re in o)if(le=o[re],ce=a[re],o.hasOwnProperty(re)&&le!==ce&&(le!=null||ce!=null))switch(re){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(s(137,n));break;default:Mn(t,n,re,le,o,ce)}return;default:if(Nt(n)){for(var Tn in a)le=a[Tn],a.hasOwnProperty(Tn)&&le!==void 0&&!o.hasOwnProperty(Tn)&&ph(t,n,Tn,void 0,o,le);for(xe in o)le=o[xe],ce=a[xe],!o.hasOwnProperty(xe)||le===ce||le===void 0&&ce===void 0||ph(t,n,xe,le,o,ce);return}}for(var Z in a)le=a[Z],a.hasOwnProperty(Z)&&le!=null&&!o.hasOwnProperty(Z)&&Mn(t,n,Z,null,o,le);for(ve in o)le=o[ve],ce=a[ve],!o.hasOwnProperty(ve)||le===ce||le==null&&ce==null||Mn(t,n,ve,le,o,ce)}function mx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _y(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,b=u.initiatorType,R=u.duration;if(d&&R&&mx(b)){for(b=0,R=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],re=z.startTime;if(re>R)break;var xe=z.transferSize,ve=z.initiatorType;xe&&mx(ve)&&(z=z.responseEnd,b+=xe*(z<R?1:(R-re)/(z-re)))}if(--o,n+=8*(d+b)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var mh=null,gh=null;function Lu(t){return t.nodeType===9?t:t.ownerDocument}function gx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function xx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function xh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var _h=null;function vy(){var t=window.event;return t&&t.type==="popstate"?t===_h?!1:(_h=t,!0):(_h=null,!1)}var _x=typeof setTimeout=="function"?setTimeout:void 0,by=typeof clearTimeout=="function"?clearTimeout:void 0,vx=typeof Promise=="function"?Promise:void 0,yy=typeof queueMicrotask=="function"?queueMicrotask:typeof vx<"u"?function(t){return vx.resolve(null).then(t).catch(Ey)}:_x;function Ey(t){setTimeout(function(){throw t})}function yr(t){return t==="head"}function bx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),nl(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")cc(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,cc(a);for(var d=a.firstChild;d;){var b=d.nextSibling,R=d.nodeName;d[Es]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=b}}else a==="body"&&cc(t.ownerDocument.body);a=u}while(a);nl(n)}function yx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function vh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":vh(a),yo(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Sy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Es])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=Da(t.nextSibling),t===null)break}return null}function My(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Da(t.nextSibling),t===null))return null;return t}function Ex(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Da(t.nextSibling),t===null))return null;return t}function bh(t){return t.data==="$?"||t.data==="$~"}function yh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Ty(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Da(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Eh=null;function Sx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Da(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Mx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Tx(t,n,a){switch(n=Lu(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function cc(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);yo(t)}var La=new Map,Ax=new Set;function Iu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var js=G.d;G.d={f:Ay,r:wy,D:Ry,C:Cy,L:Ny,m:Oy,X:Ly,S:Dy,M:Iy};function Ay(){var t=js.f(),n=Tu();return t||n}function wy(t){var n=za(t);n!==null&&n.tag===5&&n.type==="form"?Vg(n):js.r(t)}var Jo=typeof document>"u"?null:document;function wx(t,n,a){var o=Jo;if(o&&typeof n=="string"&&n){var u=an(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Ax.has(u)||(Ax.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Oi(n,"link",t),Ln(n),o.head.appendChild(n)))}}function Ry(t){js.D(t),wx("dns-prefetch",t,null)}function Cy(t,n){js.C(t,n),wx("preconnect",t,n)}function Ny(t,n,a){js.L(t,n,a);var o=Jo;if(o&&t&&n){var u='link[rel="preload"][as="'+an(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+an(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+an(a.imageSizes)+'"]')):u+='[href="'+an(t)+'"]';var d=u;switch(n){case"style":d=el(t);break;case"script":d=tl(t)}La.has(d)||(t=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),La.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(uc(d))||n==="script"&&o.querySelector(fc(d))||(n=o.createElement("link"),Oi(n,"link",t),Ln(n),o.head.appendChild(n)))}}function Oy(t,n){js.m(t,n);var a=Jo;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+an(o)+'"][href="'+an(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=tl(t)}if(!La.has(d)&&(t=v({rel:"modulepreload",href:t},n),La.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(fc(d)))return}o=a.createElement("link"),Oi(o,"link",t),Ln(o),a.head.appendChild(o)}}}function Dy(t,n,a){js.S(t,n,a);var o=Jo;if(o&&t){var u=Ha(o).hoistableStyles,d=el(t);n=n||"default";var b=u.get(d);if(!b){var R={loading:0,preload:null};if(b=o.querySelector(uc(d)))R.loading=5;else{t=v({rel:"stylesheet",href:t,"data-precedence":n},a),(a=La.get(d))&&Sh(t,a);var z=b=o.createElement("link");Ln(z),Oi(z,"link",t),z._p=new Promise(function(re,xe){z.onload=re,z.onerror=xe}),z.addEventListener("load",function(){R.loading|=1}),z.addEventListener("error",function(){R.loading|=2}),R.loading|=4,Uu(b,n,o)}b={type:"stylesheet",instance:b,count:1,state:R},u.set(d,b)}}}function Ly(t,n){js.X(t,n);var a=Jo;if(a&&t){var o=Ha(a).hoistableScripts,u=tl(t),d=o.get(u);d||(d=a.querySelector(fc(u)),d||(t=v({src:t,async:!0},n),(n=La.get(u))&&Mh(t,n),d=a.createElement("script"),Ln(d),Oi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Iy(t,n){js.M(t,n);var a=Jo;if(a&&t){var o=Ha(a).hoistableScripts,u=tl(t),d=o.get(u);d||(d=a.querySelector(fc(u)),d||(t=v({src:t,async:!0,type:"module"},n),(n=La.get(u))&&Mh(t,n),d=a.createElement("script"),Ln(d),Oi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Rx(t,n,a,o){var u=(u=ae.current)?Iu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=el(a.href),a=Ha(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=el(a.href);var d=Ha(u).hoistableStyles,b=d.get(t);if(b||(u=u.ownerDocument||u,b={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,b),(d=u.querySelector(uc(t)))&&!d._p&&(b.instance=d,b.state.loading=5),La.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},La.set(t,a),d||Uy(u,t,a,b.state))),n&&o===null)throw Error(s(528,""));return b}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=tl(a),a=Ha(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function el(t){return'href="'+an(t)+'"'}function uc(t){return'link[rel="stylesheet"]['+t+"]"}function Cx(t){return v({},t,{"data-precedence":t.precedence,precedence:null})}function Uy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Oi(n,"link",a),Ln(n),t.head.appendChild(n))}function tl(t){return'[src="'+an(t)+'"]'}function fc(t){return"script[async]"+t}function Nx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+an(a.href)+'"]');if(o)return n.instance=o,Ln(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),Ln(o),Oi(o,"style",u),Uu(o,a.precedence,t),n.instance=o;case"stylesheet":u=el(a.href);var d=t.querySelector(uc(u));if(d)return n.state.loading|=4,n.instance=d,Ln(d),d;o=Cx(a),(u=La.get(u))&&Sh(o,u),d=(t.ownerDocument||t).createElement("link"),Ln(d);var b=d;return b._p=new Promise(function(R,z){b.onload=R,b.onerror=z}),Oi(d,"link",o),n.state.loading|=4,Uu(d,a.precedence,t),n.instance=d;case"script":return d=tl(a.src),(u=t.querySelector(fc(d)))?(n.instance=u,Ln(u),u):(o=a,(u=La.get(d))&&(o=v({},a),Mh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),Ln(u),Oi(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Uu(o,a.precedence,t));return n.instance}function Uu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,b=0;b<o.length;b++){var R=o[b];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Sh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Pu=null;function Ox(t,n,a){if(Pu===null){var o=new Map,u=Pu=new Map;u.set(a,o)}else u=Pu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Es]||d[Pn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var b=d.getAttribute(n)||"";b=t+b;var R=o.get(b);R?R.push(d):o.set(b,[d])}}return o}function Dx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Py(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Lx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Fy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=el(o.href),d=n.querySelector(uc(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Fu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,Ln(d);return}d=n.ownerDocument||n,o=Cx(o),(u=La.get(u))&&Sh(o,u),d=d.createElement("link"),Ln(d);var b=d;b._p=new Promise(function(R,z){b.onload=R,b.onerror=z}),Oi(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Fu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Th=0;function By(t,n){return t.stylesheets&&t.count===0&&zu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&zu(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&Th===0&&(Th=62500*_y());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&zu(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>Th?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Fu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Bu=null;function zu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Bu=new Map,n.forEach(zy,t),Bu=null,Fu.call(t))}function zy(t,n){if(!(n.state.loading&4)){var a=Bu.get(t);if(a)var o=a.get(null);else{a=new Map,Bu.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var b=u[d];(b.nodeName==="LINK"||b.getAttribute("media")!=="not all")&&(a.set(b.dataset.precedence,b),o=b)}o&&a.set(null,o)}u=n.instance,b=u.getAttribute("data-precedence"),d=a.get(b)||o,d===o&&a.set(null,u),a.set(b,u),this.count++,o=Fu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var dc={$$typeof:I,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function Gy(t,n,a,o,u,d,b,R,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=b,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function Ix(t,n,a,o,u,d,b,R,z,re,xe,ve){return t=new Gy(t,n,a,b,z,re,xe,ve,R),n=1,d===!0&&(n|=24),d=ca(3,null,null,n),t.current=d,d.stateNode=t,n=ad(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},ld(d),t}function Ux(t){return t?(t=Do,t):Do}function Px(t,n,a,o,u,d){u=Ux(u),o.context===null?o.context=u:o.pendingContext=u,o=ur(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=fr(t,o,n),a!==null&&(ea(a,t,n),jl(a,t,n))}function Fx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Ah(t,n){Fx(t,n),(t=t.alternate)&&Fx(t,n)}function Bx(t){if(t.tag===13||t.tag===31){var n=Wr(t,67108864);n!==null&&ea(n,t,67108864),Ah(t,67108864)}}function zx(t){if(t.tag===13||t.tag===31){var n=pa();n=bs(n);var a=Wr(t,n);a!==null&&ea(a,t,n),Ah(t,n)}}var Gu=!0;function Hy(t,n,a,o){var u=U.T;U.T=null;var d=G.p;try{G.p=2,wh(t,n,a,o)}finally{G.p=d,U.T=u}}function ky(t,n,a,o){var u=U.T;U.T=null;var d=G.p;try{G.p=8,wh(t,n,a,o)}finally{G.p=d,U.T=u}}function wh(t,n,a,o){if(Gu){var u=Rh(o);if(u===null)hh(t,n,o,Hu,a),Hx(t,o);else if(jy(u,t,n,a,o))o.stopPropagation();else if(Hx(t,o),n&4&&-1<Vy.indexOf(t)){for(;u!==null;){var d=za(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var b=De(d.pendingLanes);if(b!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;b;){var z=1<<31-Ge(b);R.entanglements[1]|=z,b&=~z}os(d),(gn&6)===0&&(Su=Ie()+500,rc(0))}}break;case 31:case 13:R=Wr(d,2),R!==null&&ea(R,d,2),Tu(),Ah(d,2)}if(d=Rh(o),d===null&&hh(t,n,o,Hu,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else hh(t,n,o,null,a)}}function Rh(t){return t=Va(t),Ch(t)}var Hu=null;function Ch(t){if(Hu=null,t=ba(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Hu=t,null}function Gx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(In()){case O:return 2;case M:return 8;case Q:case pe:return 32;case Te:return 268435456;default:return 32}default:return 32}}var Nh=!1,Er=null,Sr=null,Mr=null,hc=new Map,pc=new Map,Tr=[],Vy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Hx(t,n){switch(t){case"focusin":case"focusout":Er=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":Mr=null;break;case"pointerover":case"pointerout":hc.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":pc.delete(n.pointerId)}}function mc(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=za(n),n!==null&&Bx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function jy(t,n,a,o,u){switch(n){case"focusin":return Er=mc(Er,t,n,a,o,u),!0;case"dragenter":return Sr=mc(Sr,t,n,a,o,u),!0;case"mouseover":return Mr=mc(Mr,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return hc.set(d,mc(hc.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,pc.set(d,mc(pc.get(d)||null,t,n,a,o,u)),!0}return!1}function kx(t){var n=ba(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,Hr(t.priority,function(){zx(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Hr(t.priority,function(){zx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ku(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Rh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);ki=o,a.target.dispatchEvent(o),ki=null}else return n=za(a),n!==null&&Bx(n),t.blockedOn=a,!1;n.shift()}return!0}function Vx(t,n,a){ku(t)&&a.delete(n)}function Xy(){Nh=!1,Er!==null&&ku(Er)&&(Er=null),Sr!==null&&ku(Sr)&&(Sr=null),Mr!==null&&ku(Mr)&&(Mr=null),hc.forEach(Vx),pc.forEach(Vx)}function Vu(t,n){t.blockedOn===n&&(t.blockedOn=null,Nh||(Nh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Xy)))}var ju=null;function jx(t){ju!==t&&(ju=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){ju===t&&(ju=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Ch(o||a)===null)continue;break}var d=za(a);d!==null&&(t.splice(n,3),n-=3,Rd(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function nl(t){function n(z){return Vu(z,t)}Er!==null&&Vu(Er,t),Sr!==null&&Vu(Sr,t),Mr!==null&&Vu(Mr,t),hc.forEach(n),pc.forEach(n);for(var a=0;a<Tr.length;a++){var o=Tr[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Tr.length&&(a=Tr[0],a.blockedOn===null);)kx(a),a.blockedOn===null&&Tr.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],b=u[tn]||null;if(typeof d=="function")b||jx(a);else if(b){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,b=d[tn]||null)R=b.formAction;else if(Ch(u)!==null)continue}else R=b.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),jx(a)}}}function Xx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(b){return u=b})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Oh(t){this._internalRoot=t}Xu.prototype.render=Oh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=pa();Px(a,o,t,n,null,null)},Xu.prototype.unmount=Oh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Px(t.current,2,null,t,null,null),Tu(),n[aa]=null}};function Xu(t){this._internalRoot=t}Xu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Ja();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Tr.length&&n!==0&&n<Tr[a].priority;a++);Tr.splice(a,0,t),a===0&&kx(t)}};var Yx=e.version;if(Yx!=="19.2.3")throw Error(s(527,Yx,"19.2.3"));G.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var Yy={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yu.isDisabled&&Yu.supportsFiber)try{ue=Yu.inject(Yy),me=Yu}catch{}}return xc.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Jg,d=e0,b=t0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(b=n.onRecoverableError)),n=Ix(t,1,!1,null,null,a,o,null,u,d,b,Xx),t[aa]=n.current,dh(t),new Oh(n)},xc.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Jg,b=e0,R=t0,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(b=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=Ix(t,1,!0,n,a??null,o,u,z,d,b,R,Xx),n.context=Ux(null),a=n.current,o=pa(),o=bs(o),u=ur(o),u.callback=null,fr(a,u,o),a=o,n.current.lanes=a,gt(n,a),os(n),t[aa]=n.current,dh(t),new Xu(n)},xc.version="19.2.3",xc}var n_;function aE(){if(n_)return Ih.exports;n_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ih.exports=iE(),Ih.exports}var sE=aE();const rE=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),oE=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),i_=r=>{const e=oE(r);return e.charAt(0).toUpperCase()+e.slice(1)},Iv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),lE=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var cE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const uE=Ce.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>Ce.createElement("svg",{ref:m,...cE,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:Iv("lucide",l),...!c&&!lE(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,_])=>Ce.createElement(p,_)),...Array.isArray(c)?c:[c]]));const ri=(r,e)=>{const i=Ce.forwardRef(({className:s,...l},c)=>Ce.createElement(uE,{ref:c,iconNode:e,className:Iv(`lucide-${rE(i_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=i_(r),i};const fE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],_c=ri("arrow-right",fE);const dE=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],Ep=ri("brain-circuit",dE);const hE=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],pE=ri("camera",hE);const mE=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],il=ri("check",mE);const gE=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],a_=ri("chevron-down",gE);const xE=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ma=ri("circle-check",xE);const _E=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],vc=ri("copy",_E);const vE=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],s_=ri("download",vE);const bE=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],yE=ri("file-text",bE);const EE=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],bc=ri("globe",EE);const SE=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],r_=ri("image",SE);const ME=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ia=ri("loader-circle",ME);const TE=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],AE=ri("log-out",TE);const wE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],RE=ri("plus",wE);const CE=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],o_=ri("refresh-cw",CE);const NE=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],l_=ri("sparkles",NE);const OE=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],DE=ri("square",OE);const LE=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Bh=ri("trash-2",LE);const IE=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],c_=ri("triangle-alert",IE);const UE=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],zh=ri("wand-sparkles",UE);const PE=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],vf=ri("zap",PE);var u_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(u_||(u_={}));var f_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(f_||(f_={}));var d_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(d_||(d_={}));const h_=["user","model","function","system"];var p_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(p_||(p_={}));var m_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(m_||(m_={}));var g_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(g_||(g_={}));var x_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(x_||(x_={}));var Nc;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(Nc||(Nc={}));var __;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(__||(__={}));var v_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(v_||(v_={}));var b_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(b_||(b_={}));class zi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class al extends zi{constructor(e,i){super(e),this.response=i}}class Uv extends zi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class Fr extends zi{}class Pv extends zi{}const FE="https://generativelanguage.googleapis.com",BE="v1beta",zE="0.24.1",GE="genai-js";var xo;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(xo||(xo={}));class HE{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||BE;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||FE}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function kE(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${GE}/${zE}`),e.join(" ")}async function VE(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",kE(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new Fr(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new Fr(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new Fr(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function jE(r,e,i,s,l,c){const f=new HE(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},qE(c)),{method:"POST",headers:await VE(f),body:l})}}async function Pc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await jE(r,e,i,s,l,c);return XE(h,m,f)}async function XE(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){YE(l,r)}return s.ok||await WE(s,r),s}function YE(r,e){let i=r;throw i.name==="AbortError"?(i=new Pv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Uv||r instanceof Fr||(i=new zi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function WE(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Uv(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function qE(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function gm(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),bf(r.candidates[0]))throw new al(`${Lr(r)}`,r);return $E(r)}else if(r.promptFeedback)throw new al(`Text not available. ${Lr(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),bf(r.candidates[0]))throw new al(`${Lr(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),y_(r)[0]}else if(r.promptFeedback)throw new al(`Function call not available. ${Lr(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),bf(r.candidates[0]))throw new al(`${Lr(r)}`,r);return y_(r)}else if(r.promptFeedback)throw new al(`Function call not available. ${Lr(r)}`,r)},r}function $E(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function y_(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const KE=[Nc.RECITATION,Nc.SAFETY,Nc.LANGUAGE];function bf(r){return!!r.finishReason&&KE.includes(r.finishReason)}function Lr(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];bf(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Oc(r){return this instanceof Oc?(this.v=r,this):new Oc(r)}function ZE(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(E){return new Promise(function(T,C){c.push([g,E,T,C])>1||h(g,E)})})}function h(g,E){try{m(s[g](E))}catch(T){v(c[0][3],T)}}function m(g){g.value instanceof Oc?Promise.resolve(g.value.v).then(p,_):v(c[0][2],g)}function p(g){h("next",g)}function _(g){h("throw",g)}function v(g,E){g(E),c.shift(),c.length&&h(c[0][0],c[0][1])}}const E_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function QE(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=tS(e),[s,l]=i.tee();return{stream:eS(s),response:JE(l)}}async function JE(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return gm(nS(e));e.push(l)}}function eS(r){return ZE(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Oc(i.read());if(l)break;yield yield Oc(gm(s))}})}function tS(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new zi("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(E_),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new zi(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(E_)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new Pv("Request aborted when reading from the stream"):h=new zi("Error reading from the stream"),h})}}})}function nS(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Fv(r,e,i,s){const l=await Pc(e,xo.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return QE(l)}async function Bv(r,e,i,s){const c=await(await Pc(e,xo.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:gm(c)}}function zv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Dc(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return iS(e)}function iS(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new zi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new zi("No content is provided for sending chat message.");return s?e:i}function aS(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new Fr("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=Dc(r);s.contents=[c]}return{generateContentRequest:s}}function S_(r){let e;return r.contents?e=r:e={contents:[Dc(r)]},r.systemInstruction&&(e.systemInstruction=zv(r.systemInstruction)),e}function sS(r){return typeof r=="string"||Array.isArray(r)?{content:Dc(r)}:r}const M_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],rS={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function oS(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new zi(`First content should be with role 'user', got ${s}`);if(!h_.includes(s))throw new zi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(h_)}`);if(!Array.isArray(l))throw new zi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new zi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of M_)m in h&&(c[m]+=1);const f=rS[s];for(const h of M_)if(!f.includes(h)&&c[h]>0)throw new zi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function T_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const A_="SILENT_ERROR";class lS{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(oS(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Dc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},v=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>Bv(this._apiKey,this.model,_,v)).then(E=>{var T;if(T_(E.response)){this._history.push(p);const C=Object.assign({parts:[],role:"model"},(T=E.response.candidates)===null||T===void 0?void 0:T[0].content);this._history.push(C)}else{const C=Lr(E.response);C&&console.warn(`sendMessage() was unsuccessful. ${C}. Inspect response object for details.`)}g=E}).catch(E=>{throw this._sendPromise=Promise.resolve(),E}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Dc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},v=Object.assign(Object.assign({},this._requestOptions),i),g=Fv(this._apiKey,this.model,_,v);return this._sendPromise=this._sendPromise.then(()=>g).catch(E=>{throw new Error(A_)}).then(E=>E.response).then(E=>{if(T_(E)){this._history.push(p);const T=Object.assign({},E.candidates[0].content);T.role||(T.role="model"),this._history.push(T)}else{const T=Lr(E);T&&console.warn(`sendMessageStream() was unsuccessful. ${T}. Inspect response object for details.`)}}).catch(E=>{E.message!==A_&&console.error(E)}),g}}async function cS(r,e,i,s){return(await Pc(e,xo.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function uS(r,e,i,s){return(await Pc(e,xo.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function fS(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await Pc(e,xo.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class w_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=zv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=S_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Bv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=S_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Fv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new lS(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=aS(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return cS(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=sS(e),l=Object.assign(Object.assign({},this._requestOptions),i);return uS(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return fS(this.apiKey,this.model,e,s)}}class dS{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new zi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new w_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new Fr("Cached content must contain a `name` field.");if(!e.model)throw new Fr("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new Fr(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new w_(this.apiKey,c,s)}}const Gv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",hS=["gemini-3.5-flash","gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],pS=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3.5-flash","gemini-3-flash-preview","gemini-2.5-flash-lite"];let Ml="";const yf=r=>{Ml=r},xm=()=>Ml,Hv=async()=>{if(!Ml)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Gv}/v1beta/models?key=${Ml}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},kv=async(r,e=null,i=null,s)=>{if(!Ml)throw new Error("API Key is initialized.");const l=new dS(Ml),c=e&&e.length>0?pS:hS;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let _=[];i&&_.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&_.push(...e),_.push({text:r});const v={model:p},g=l.getGenerativeModel(v,{apiVersion:"v1beta",baseUrl:Gv}),E=new Promise((L,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),T=e&&e.length>0?[]:[{googleSearch:{}}];let C;try{C=await Promise.race([g.generateContent({contents:[{role:"user",parts:_}],tools:T,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),E])}catch(L){if(T.length>0)console.warn(`[API] Grounding failed for ${p} (${L.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),C=await g.generateContent({contents:[{role:"user",parts:_}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw L}const S=C.response,y=S.candidates||[];if(!y.length)throw S.promptFeedback&&(console.warn("Prompt Feedback:",S.promptFeedback),S.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${S.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=y[0];let I="";try{I=S.text()}catch(L){console.warn(L)}const D=N.content?.parts||[];let V="";if(D.forEach(L=>{L.thought&&(V+=L.thought)}),!I){const L=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${L}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${L})`),new Error(`Empty response (FinishReason: ${L}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:I,thought:V||"通常処理が完了しました。",model:p}}catch(_){console.warn(`Model ${p} failed:`,_.message),_.message.includes("429")||_.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!_.message.includes("フィルター検知")&&!_.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${_.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Hv();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},mS=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:kv,diagnoseConnection:Hv,getApiKey:xm,setApiKey:yf},Symbol.toStringTag,{value:"Module"})),gS="modulepreload",xS=function(r,e){return new URL(r,e).href},R_={},_S=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(_){return Promise.all(_.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(_=>{if(_=xS(_,s),_ in R_)return;R_[_]=!0;const v=_.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(s)for(let T=f.length-1;T>=0;T--){const C=f[T];if(C.href===_&&(!v||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${g}`))return;const E=document.createElement("link");if(E.rel=v?"stylesheet":gS,v||(E.as="script"),E.crossOrigin="",E.href=_,m&&E.setAttribute("nonce",m),document.head.appendChild(E),v)return new Promise((T,C)=>{E.addEventListener("load",T),E.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${_}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},vS=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],bS=async(r,e,i=[])=>{const s=xm();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of vS)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,_;if(f.startsWith("gemini")){const v=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(E=>{const T=E.includes(",")?E.split(",")[1]:E,C=E.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:C?C[1]:"image/png",data:T}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:v}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.candidates&&_.candidates.length>0&&_.candidates[0].content&&_.candidates[0].content.parts){const E=_.candidates[0].content.parts.find(T=>T.inlineData);if(E&&E.inlineData&&E.inlineData.data)return{base64Img:E.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.predictions&&_.predictions[0]&&_.predictions[0].bytesBase64Encoded)return{base64Img:_.predictions[0].bytesBase64Encoded,usedModel:f};if(_.predictions&&_.predictions[0]&&typeof _.predictions[0]=="string")return{base64Img:_.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await _S(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>mS);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let Vv="";const Gh=r=>{Vv=r},Nf=()=>Vv,yS=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=Nf();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},ES=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],SS=["gpt-4.1","gpt-4o","gpt-4.1-mini"],MS=async(r,e=null,i=null,s)=>{const l=Nf();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?SS:ES;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0)for(const S of e)S.inlineData&&(p.push({type:"image_url",image_url:{url:`data:${S.inlineData.mimeType};base64,${S.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const _=new AbortController,v=setTimeout(()=>_.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:_.signal})}catch(S){throw S.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):S}finally{clearTimeout(v)}if(!g.ok){const y=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${y}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const T=(await g.json()).choices?.[0];if(!T||!T.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const C=T.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:C,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let Sp="gemini";const Hh=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),Sp="gemini";return}Sp=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},ro=async(r,e=null,i=null,s)=>Sp==="openai"?MS(r,e,i,s):kv(r,e,i,s),TS={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},AS={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},wS=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],RS=r=>{const e=AS[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...wS].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},CS=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(TS)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r},fo="v3.77-alpha",C_=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},NS=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],OS=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,kh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},DS=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},LS=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},IS=(r,e,i,s,l=640,c=480)=>new Promise((f,h)=>{const m=new Image;m.onload=()=>{try{const p=document.createElement("canvas");p.width=l,p.height=c;const _=p.getContext("2d"),v=m.width,g=m.height,T=(e%360+360)%360/360*v,C=s/360*v,S=g/2-i/180*g,y=C*(c/l),N=T-C/2,I=Math.max(0,Math.min(g-y,S-y/2)),D=Math.min(y,g);if(N>=0&&N+C<=v)_.drawImage(m,N,I,C,D,0,0,l,c);else if(N<0){const V=-N,L=C-V,B=L/C;_.drawImage(m,v-V,I,V,D,0,0,l*(1-B),c),_.drawImage(m,0,I,L,D,l*(1-B),0,l*B,c)}else{const V=v-N,L=C-V,B=V/C;_.drawImage(m,N,I,V,D,0,0,l*B,c),_.drawImage(m,0,I,L,D,l*B,0,l*(1-B),c)}f(p.toDataURL("image/jpeg",.85))}catch(p){h(p)}},m.onerror=()=>h(new Error("画像の読み込みに失敗しました")),m.src=r}),US=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,PS=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},FS=()=>`
        /* SYSTEM: ABSOLUTE CONTEXT RESET. FORGET ALL PREVIOUS CHARACTERS. */
        /* TARGET: Analyze ALL currently uploaded images. Do not recall past sessions. */
        
        あなたはプロの漫画家兼キャラクターデザイナー（解析特化）です。
        以下の「絶対厳守ルール」に従い、現在の全ての画像を解析してください。

        【0. 画像スタイル判定 (Style Detection)】
        ・**最初に必ず「STYLE_TAG: MONOCHROME」または「STYLE_TAG: COLOR」と出力せよ。**

        【1. キャラクター数と同一性の完全一致 (Count & Identity)】
        ・画像内の**「固有名を持つキャラ」**を全てリストアップせよ。入力画像が複数ある場合、**全ての画像を確認し、全キャラクターを抽出せよ**。絶対に1人で止まるな。

        【2. 特徴の超精密分解 (High-Fidelity Decomposition)】

        A. **【性別と年齢 (Gender & Age)】**:
           - **最重要**: 性別を間違えるな。ショートカットの女性を男性と誤認するな。
           - 女性なら (female:1.6), (woman:1.4)、男性なら (male:1.6), (man:1.4) を必ず付与せよ。
           - 年齢感も記述せよ (young adult, adult, elderly)。"girl", "boy", "teenager", "child" は使用禁止。

        B. **髪の完全構造化 (Strict Hair Analysis)**:
           - **【ハゲ/坊主 (Bald/Buzz)】**: 
             - 髪が無い場合は**「Bald」**、坊主なら**「Buzz Cut」**とせよ。
           - **【色 (Tone/Color)】**: 
             - 白黒の場合: 「ベタ(黒)→Black」「トーン(灰)→Brown/Dirty Blonde」「白→Silver/Blonde」。
             - カラーの場合: 「赤(Red)」「茶(Brown)」「オレンジ(Ginger)」を厳密区別せよ。
           - **【構造 (Structure) - 重要】**: 
             - **髪のトポロジー解析 (Hair Topology Vectors)**:
               - **毛先座標 (End Points)**: 毛先がどこにあるか？(顎ライン、肩ライン、鎖骨下、腰)。
               - **重要 (Black Hair Warning)**: **黒髪は制服やアウトラインと同化して短く見えやすい。**
             - 「肩に掛かっているか？」「背中に線があるか？」を凝視せよ。
             - **姫カット(Sidelocks/Hime-cut)**がある場合、後ろ髪が長い確率が極めて高い。**安易にBobと判定するな。**
           - **絶対長 (Absolute Length)**: 
             - **Bob**: 毛先が「顎〜首」で止まっている。完全に宙に浮いている。
             - **Medium**: 毛先が「肩」に触れている。
             - **Long**: 毛先が「鎖骨」より下。**黒髪の場合は特に注意して探せ。**
           - **アカリの判定**: もし毛先が内側にカールの軌跡を描いているなら「Internal Round Bob」。外に跳ねているなら「Flicked Bob」。断定せよ。
         - **シルエット (Volume)**:
           - 頭頂部のボリューム、サイドの膨らみを記述せよ。
         - 単なる「Short」は禁止。「Chin-length Bob」や「Shoulder-length Layered」など具体的に。
       - **【前髪 (Bangs)】**: Hime, Parted, Blunt, Asymmetric.
       - **【アレンジ (Arrangement)】**: 
         - **重要**: 後ろ髪が見えなくても、**Ponytail, Twintails, Bun, Braid**の兆候を見逃すな。
         - 結っている＝**Long Hair**タグ必須。

        C. **顔・アクセサリー (Face & Accessories)】**:
           - **【アイウェア (Eyewear)】**: 
             - **サングラスを絶対に見逃すな**。レンズが黒/不透明なら (black sunglasses:1.5)。
             - 透明レンズなら (glasses:1.2)。形状(Under-rim, Round)も特定せよ。
             - **【最重要リスク】** 眼鏡をかけていない場合は、他のキャラの眼鏡が伝染するハルシネーションを防ぐため、必ず **(no glasses:1.5)** と出力せよ。
           - **【髭 (Facial Hair)】**: 
             - **絶対に髭を見逃すな**。(white beard:1.5), (mustache:1.5), (stubble:1.2).
             - 老人キャラは髭がある確率が高い。
           - **【目 (Eyes)】**: ツリ目(Tsurime)、タレ目(Tareme)、瞳の色。
           - **【特徴 (Charm Points)】**: 
             - ホクロ(Mole under eye/mouth)、八重歯(Snaggletooth)、そばかす(Freckles)等の個性を絶対に見逃すな。
           - **【肌 (Skin)】**: Tanned, Pale, Dark skinを正確に記述。

        D. **服装・テキスト (Outfit & Text)**:
            - **服の文字**: 服に書かれている文字（例: "FURU"）は **(shirt with text "FURU":1.4)** のようにタグ化せよ。
            - 制服(Sailor/Blazer)、私服(Hoodie/T-shirt)の形状を特定せよ。

        【3. OCR情報の反映と性格のタグ化】
        ・読み取った名前、年齢、性格、社会的役割を正確に反映せよ。
        ・**【最重要】**：画像生成AIにキャラクターの内面や立ち振る舞いを伝えるため、「性格(Mind)」の項目には**必ず英語の重み付きタグ**（例: (tsundere:1.2), (cheerful:1.3), (student council president:1.1) 等）を付与せよ。これを怠るとキャラクターの演技が死ぬ。

        【出力フォーマット】
        
        ## 1. [OCRで読み取った正確な名前]

        | カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |
        | :--- | :--- | :--- |
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** （※眼鏡無しなら **(no glasses:1.5)** を絶対付与） |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (formal outfit:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | **[WEIGHTS]: (cheerful:1.3), (energetic:1.2)** （※英語の性格タグを必須で記述） |
      `,BS=(r,e)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${e.join(`

`)}

【Guard C: AI定型文の絶対排除】
以下のAI特有の退屈な表現をシナリオ（ト書き・セリフ）から完全に排除・書き換えよ:
- 感想・まとめのナレーション（「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等は絶対禁止。綺麗にまとめず余韻をぶった斬れ）
- 汎用的で弱い感嘆（「ふふっ」「やれやれ」「まあいいか」等は絶対禁止。キャラに合った鋭いリアクションにせよ）
- 状況をそのまま口で説明するセリフ（「〇〇が××してしまったぞ！」等は禁止。絵で状況は見せ, セリフは感情やツッコミに特化せよ）

【笑い構造の検証チェック — 出力前に必ず自己検証せよ】
以下のチェックリストを出力前に確認し、不合格項目があればシナリオを修正してから出力すること:
□ フリ→オチ構造: 1コマ目が「読者の予想を作るフリ」として機能しているか？ 1コマ目でいきなりボケていないか？
□ オチ集中: 4コマ目に笑いのエネルギーが最も集中しているか？ 2〜3コマ目にオチを消費して4コマ目が弱くなっていないか？
□ ズレの大きさ: 予想（E）と実際（R）のギャップは十分に大きいか？ 「ちょっと変」ではなく「完全に予想外」になっているか？
□ 天丼チェック: 天丼を使っている場合、1コマ目の仕込み→3コマ目の変奏→4コマ目の爆発が正しく配置されているか？
□ ビジュアルギャグ: 各コマの「状況」欄に、ズレ技法に対応した視覚的ギャグ演出（身体変形、背景の異物、EMOTIONタグの急変等）が含まれているか？ テキストだけで笑いを作っていないか？
□ セリフとビジュアルの連携: ボケのセリフに対応するビジュアルリアクション（ツッコミ役の表情崩壊、周囲の硬直等）が状況欄に書かれているか？

【絶対に守るルール】
- シナリオの形式・構造（Topic:, Location:, [1コマ目]〜[4コマ目]の書式）は一切変えない
- セリフ（「」内の台詞）の文言は変えない（ただし「セリフ・ギャグの強化」カテゴリが指定されている場合はセリフの変更を許可する）
- キャラクター名は変えない
- 新しいキャラクターを追加しない
- コマ数は4コマのまま
- 出力は元のシナリオと完全に同じテキスト形式で返す（余計な説明や前置きは不要）
- 上記チェックリストの検証結果は出力に含めない（内部処理として実行し、修正後のシナリオのみ出力せよ）

【元のシナリオ】
${r}

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`,Wu=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=Ce.useRef(null);Ce.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:x.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[x.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),x.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[x.jsx(Ep,{size:16})," Neural Process (Thinking Mode)"]}),x.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&x.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};const _m="184",yl={ROTATE:0,DOLLY:1,PAN:2},bl={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zS=0,N_=1,GS=2,Ef=1,HS=2,Rc=3,Br=0,ia=1,Ks=2,Qs=0,El=1,O_=2,D_=3,L_=4,kS=5,ho=100,VS=101,jS=102,XS=103,YS=104,WS=200,qS=201,$S=202,KS=203,Mp=204,Tp=205,ZS=206,QS=207,JS=208,eM=209,tM=210,nM=211,iM=212,aM=213,sM=214,Ap=0,wp=1,Rp=2,Tl=3,Cp=4,Np=5,Op=6,Dp=7,jv=0,rM=1,oM=2,hs=0,Xv=1,Yv=2,Wv=3,qv=4,$v=5,Kv=6,Zv=7,Qv=300,_o=301,Al=302,Sf=303,Vh=304,Ff=306,Lp=1e3,Zs=1001,Ip=1002,Di=1003,lM=1004,qu=1005,Gi=1006,jh=1007,mo=1008,Fa=1009,Jv=1010,eb=1011,Lc=1012,vm=1013,gs=1014,fs=1015,er=1016,bm=1017,ym=1018,Ic=1020,tb=35902,nb=35899,ib=1021,ab=1022,Qa=1023,tr=1026,go=1027,sb=1028,Em=1029,vo=1030,Sm=1031,Mm=1033,Mf=33776,Tf=33777,Af=33778,wf=33779,Up=35840,Pp=35841,Fp=35842,Bp=35843,zp=36196,Gp=37492,Hp=37496,kp=37488,Vp=37489,Of=37490,jp=37491,Xp=37808,Yp=37809,Wp=37810,qp=37811,$p=37812,Kp=37813,Zp=37814,Qp=37815,Jp=37816,em=37817,tm=37818,nm=37819,im=37820,am=37821,sm=36492,rm=36494,om=36495,lm=36283,cm=36284,Df=36285,um=36286,cM=3200,I_=0,uM=1,Ur="",_a="srgb",Lf="srgb-linear",If="linear",En="srgb",sl=7680,U_=519,fM=512,dM=513,hM=514,Tm=515,pM=516,mM=517,Am=518,gM=519,P_=35044,F_="300 es",ds=2e3,Uf=2001;function xM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Uc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _M(){const r=Uc("canvas");return r.style.display="block",r}const B_={};function z_(...r){const e="THREE."+r.shift();console.log(e,...r)}function rb(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Et(...r){r=rb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function sn(...r){r=rb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function fm(...r){const e=r.join(" ");e in B_||(B_[e]=!0,Et(...r))}function vM(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const bM={[Ap]:wp,[Rp]:Op,[Cp]:Dp,[Tl]:Np,[wp]:Ap,[Op]:Rp,[Dp]:Cp,[Np]:Tl};class Gr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const Fi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rf=Math.PI/180,dm=180/Math.PI;function Fc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Fi[r&255]+Fi[r>>8&255]+Fi[r>>16&255]+Fi[r>>24&255]+"-"+Fi[e&255]+Fi[e>>8&255]+"-"+Fi[e>>16&15|64]+Fi[e>>24&255]+"-"+Fi[i&63|128]+Fi[i>>8&255]+"-"+Fi[i>>16&255]+Fi[i>>24&255]+Fi[s&255]+Fi[s>>8&255]+Fi[s>>16&255]+Fi[s>>24&255]).toLowerCase()}function qt(r,e,i){return Math.max(e,Math.min(i,r))}function yM(r,e){return(r%e+e)%e}function Xh(r,e,i){return(1-i)*r+i*e}function yc(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ta(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const EM={DEG2RAD:Rf},Lm=class Lm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=qt(this.x,e.x,i.x),this.y=qt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=qt(this.x,e,i),this.y=qt(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(qt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(qt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Lm.prototype.isVector2=!0;let Ht=Lm;class zr{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],_=s[l+2],v=s[l+3],g=c[f+0],E=c[f+1],T=c[f+2],C=c[f+3];if(v!==C||m!==g||p!==E||_!==T){let S=m*g+p*E+_*T+v*C;S<0&&(g=-g,E=-E,T=-T,C=-C,S=-S);let y=1-h;if(S<.9995){const N=Math.acos(S),I=Math.sin(N);y=Math.sin(y*N)/I,h=Math.sin(h*N)/I,m=m*y+g*h,p=p*y+E*h,_=_*y+T*h,v=v*y+C*h}else{m=m*y+g*h,p=p*y+E*h,_=_*y+T*h,v=v*y+C*h;const N=1/Math.sqrt(m*m+p*p+_*_+v*v);m*=N,p*=N,_*=N,v*=N}}e[i]=m,e[i+1]=p,e[i+2]=_,e[i+3]=v}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],_=s[l+3],v=c[f],g=c[f+1],E=c[f+2],T=c[f+3];return e[i]=h*T+_*v+m*E-p*g,e[i+1]=m*T+_*g+p*v-h*E,e[i+2]=p*T+_*E+h*g-m*v,e[i+3]=_*T-h*v-m*g-p*E,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),_=h(l/2),v=h(c/2),g=m(s/2),E=m(l/2),T=m(c/2);switch(f){case"XYZ":this._x=g*_*v+p*E*T,this._y=p*E*v-g*_*T,this._z=p*_*T+g*E*v,this._w=p*_*v-g*E*T;break;case"YXZ":this._x=g*_*v+p*E*T,this._y=p*E*v-g*_*T,this._z=p*_*T-g*E*v,this._w=p*_*v+g*E*T;break;case"ZXY":this._x=g*_*v-p*E*T,this._y=p*E*v+g*_*T,this._z=p*_*T+g*E*v,this._w=p*_*v-g*E*T;break;case"ZYX":this._x=g*_*v-p*E*T,this._y=p*E*v+g*_*T,this._z=p*_*T-g*E*v,this._w=p*_*v+g*E*T;break;case"YZX":this._x=g*_*v+p*E*T,this._y=p*E*v+g*_*T,this._z=p*_*T-g*E*v,this._w=p*_*v-g*E*T;break;case"XZY":this._x=g*_*v-p*E*T,this._y=p*E*v-g*_*T,this._z=p*_*T+g*E*v,this._w=p*_*v+g*E*T;break;default:Et("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],_=i[6],v=i[10],g=s+h+v;if(g>0){const E=.5/Math.sqrt(g+1);this._w=.25/E,this._x=(_-m)*E,this._y=(c-p)*E,this._z=(f-l)*E}else if(s>h&&s>v){const E=2*Math.sqrt(1+s-h-v);this._w=(_-m)/E,this._x=.25*E,this._y=(l+f)/E,this._z=(c+p)/E}else if(h>v){const E=2*Math.sqrt(1+h-s-v);this._w=(c-p)/E,this._x=(l+f)/E,this._y=.25*E,this._z=(m+_)/E}else{const E=2*Math.sqrt(1+v-s-h);this._w=(f-l)/E,this._x=(c+p)/E,this._y=(m+_)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qt(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,_=i._w;return this._x=s*_+f*h+l*p-c*m,this._y=l*_+f*m+c*h-s*p,this._z=c*_+f*p+s*m-l*h,this._w=f*_-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),_=Math.sin(p);m=Math.sin(m*p)/_,i=Math.sin(i*p)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Im=class Im{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(G_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(G_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),_=2*(h*i-c*l),v=2*(c*s-f*i);return this.x=i+m*p+f*v-h*_,this.y=s+m*_+h*p-c*v,this.z=l+m*v+c*_-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=qt(this.x,e.x,i.x),this.y=qt(this.y,e.y,i.y),this.z=qt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=qt(this.x,e,i),this.y=qt(this.y,e,i),this.z=qt(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(qt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Yh.copy(this).projectOnVector(e),this.sub(Yh)}reflect(e){return this.sub(Yh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(qt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Im.prototype.isVector3=!0;let ie=Im;const Yh=new ie,G_=new zr,Um=class Um{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],_=s[4],v=s[7],g=s[2],E=s[5],T=s[8],C=l[0],S=l[3],y=l[6],N=l[1],I=l[4],D=l[7],V=l[2],L=l[5],B=l[8];return c[0]=f*C+h*N+m*V,c[3]=f*S+h*I+m*L,c[6]=f*y+h*D+m*B,c[1]=p*C+_*N+v*V,c[4]=p*S+_*I+v*L,c[7]=p*y+_*D+v*B,c[2]=g*C+E*N+T*V,c[5]=g*S+E*I+T*L,c[8]=g*y+E*D+T*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8];return i*f*_-i*h*p-s*c*_+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],v=_*f-h*p,g=h*m-_*c,E=p*c-f*m,T=i*v+s*g+l*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=v*C,e[1]=(l*p-_*s)*C,e[2]=(h*s-l*f)*C,e[3]=g*C,e[4]=(_*i-l*m)*C,e[5]=(l*c-h*i)*C,e[6]=E*C,e[7]=(s*m-p*i)*C,e[8]=(f*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Wh.makeScale(e,i)),this}rotate(e){return this.premultiply(Wh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Wh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Um.prototype.isMatrix3=!0;let Dt=Um;const Wh=new Dt,H_=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),k_=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function SM(){const r={enabled:!0,workingColorSpace:Lf,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===En&&(l.r=Js(l.r),l.g=Js(l.g),l.b=Js(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===En&&(l.r=Sl(l.r),l.g=Sl(l.g),l.b=Sl(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ur?If:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return fm("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return fm("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Lf]:{primaries:e,whitePoint:s,transfer:If,toXYZ:H_,fromXYZ:k_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:_a},outputColorSpaceConfig:{drawingBufferColorSpace:_a}},[_a]:{primaries:e,whitePoint:s,transfer:En,toXYZ:H_,fromXYZ:k_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:_a}}}),r}const Qt=SM();function Js(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Sl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let rl;class MM{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{rl===void 0&&(rl=Uc("canvas")),rl.width=e.width,rl.height=e.height;const l=rl.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=rl}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Uc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Js(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Js(i[s]/255)*255):i[s]=Js(i[s]);return{data:i,width:e.width,height:e.height}}else return Et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let TM=0;class wm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:TM++}),this.uuid=Fc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(qh(l[f].image)):c.push(qh(l[f]))}else c=qh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function qh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?MM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Et("Texture: Unable to serialize Texture."),{})}let AM=0;const $h=new ie;class Hi extends Gr{constructor(e=Hi.DEFAULT_IMAGE,i=Hi.DEFAULT_MAPPING,s=Zs,l=Zs,c=Gi,f=mo,h=Qa,m=Fa,p=Hi.DEFAULT_ANISOTROPY,_=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:AM++}),this.uuid=Fc(),this.name="",this.source=new wm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($h).x}get height(){return this.source.getSize($h).y}get depth(){return this.source.getSize($h).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){Et(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){Et(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lp:e.x=e.x-Math.floor(e.x);break;case Zs:e.x=e.x<0?0:1;break;case Ip:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Lp:e.y=e.y-Math.floor(e.y);break;case Zs:e.y=e.y<0?0:1;break;case Ip:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Hi.DEFAULT_IMAGE=null;Hi.DEFAULT_MAPPING=Qv;Hi.DEFAULT_ANISOTROPY=1;const Pm=class Pm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],_=m[4],v=m[8],g=m[1],E=m[5],T=m[9],C=m[2],S=m[6],y=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-C)<.01&&Math.abs(T-S)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+C)<.1&&Math.abs(T+S)<.1&&Math.abs(p+E+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(p+1)/2,D=(E+1)/2,V=(y+1)/2,L=(_+g)/4,B=(v+C)/4,A=(T+S)/4;return I>D&&I>V?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=L/s,c=B/s):D>V?D<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(D),s=L/l,c=A/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=B/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((S-T)*(S-T)+(v-C)*(v-C)+(g-_)*(g-_));return Math.abs(N)<.001&&(N=1),this.x=(S-T)/N,this.y=(v-C)/N,this.z=(g-_)/N,this.w=Math.acos((p+E+y-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=qt(this.x,e.x,i.x),this.y=qt(this.y,e.y,i.y),this.z=qt(this.z,e.z,i.z),this.w=qt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=qt(this.x,e,i),this.y=qt(this.y,e,i),this.z=qt(this.z,e,i),this.w=qt(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(qt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Pm.prototype.isVector4=!0;let si=Pm;class wM extends Gr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new si(0,0,e,i),this.scissorTest=!1,this.viewport=new si(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new Hi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Gi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new wm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends wM{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class ob extends Hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Di,this.minFilter=Di,this.wrapR=Zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class RM extends Hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Di,this.minFilter=Di,this.wrapR=Zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pf=class Pf{constructor(e,i,s,l,c,f,h,m,p,_,v,g,E,T,C,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,_,v,g,E,T,C,S)}set(e,i,s,l,c,f,h,m,p,_,v,g,E,T,C,S){const y=this.elements;return y[0]=e,y[4]=i,y[8]=s,y[12]=l,y[1]=c,y[5]=f,y[9]=h,y[13]=m,y[2]=p,y[6]=_,y[10]=v,y[14]=g,y[3]=E,y[7]=T,y[11]=C,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pf().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/ol.setFromMatrixColumn(e,0).length(),c=1/ol.setFromMatrixColumn(e,1).length(),f=1/ol.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(e.order==="XYZ"){const g=f*_,E=f*v,T=h*_,C=h*v;i[0]=m*_,i[4]=-m*v,i[8]=p,i[1]=E+T*p,i[5]=g-C*p,i[9]=-h*m,i[2]=C-g*p,i[6]=T+E*p,i[10]=f*m}else if(e.order==="YXZ"){const g=m*_,E=m*v,T=p*_,C=p*v;i[0]=g+C*h,i[4]=T*h-E,i[8]=f*p,i[1]=f*v,i[5]=f*_,i[9]=-h,i[2]=E*h-T,i[6]=C+g*h,i[10]=f*m}else if(e.order==="ZXY"){const g=m*_,E=m*v,T=p*_,C=p*v;i[0]=g-C*h,i[4]=-f*v,i[8]=T+E*h,i[1]=E+T*h,i[5]=f*_,i[9]=C-g*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const g=f*_,E=f*v,T=h*_,C=h*v;i[0]=m*_,i[4]=T*p-E,i[8]=g*p+C,i[1]=m*v,i[5]=C*p+g,i[9]=E*p-T,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,E=f*p,T=h*m,C=h*p;i[0]=m*_,i[4]=C-g*v,i[8]=T*v+E,i[1]=v,i[5]=f*_,i[9]=-h*_,i[2]=-p*_,i[6]=E*v+T,i[10]=g-C*v}else if(e.order==="XZY"){const g=f*m,E=f*p,T=h*m,C=h*p;i[0]=m*_,i[4]=-v,i[8]=p*_,i[1]=g*v+C,i[5]=f*_,i[9]=E*v-T,i[2]=T*v-E,i[6]=h*_,i[10]=C*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(CM,e,NM)}lookAt(e,i,s){const l=this.elements;return ga.subVectors(e,i),ga.lengthSq()===0&&(ga.z=1),ga.normalize(),wr.crossVectors(s,ga),wr.lengthSq()===0&&(Math.abs(s.z)===1?ga.x+=1e-4:ga.z+=1e-4,ga.normalize(),wr.crossVectors(s,ga)),wr.normalize(),$u.crossVectors(ga,wr),l[0]=wr.x,l[4]=$u.x,l[8]=ga.x,l[1]=wr.y,l[5]=$u.y,l[9]=ga.y,l[2]=wr.z,l[6]=$u.z,l[10]=ga.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],_=s[1],v=s[5],g=s[9],E=s[13],T=s[2],C=s[6],S=s[10],y=s[14],N=s[3],I=s[7],D=s[11],V=s[15],L=l[0],B=l[4],A=l[8],F=l[12],$=l[1],k=l[5],W=l[9],he=l[13],oe=l[2],Y=l[6],U=l[10],G=l[14],ee=l[3],ge=l[7],Ae=l[11],P=l[15];return c[0]=f*L+h*$+m*oe+p*ee,c[4]=f*B+h*k+m*Y+p*ge,c[8]=f*A+h*W+m*U+p*Ae,c[12]=f*F+h*he+m*G+p*P,c[1]=_*L+v*$+g*oe+E*ee,c[5]=_*B+v*k+g*Y+E*ge,c[9]=_*A+v*W+g*U+E*Ae,c[13]=_*F+v*he+g*G+E*P,c[2]=T*L+C*$+S*oe+y*ee,c[6]=T*B+C*k+S*Y+y*ge,c[10]=T*A+C*W+S*U+y*Ae,c[14]=T*F+C*he+S*G+y*P,c[3]=N*L+I*$+D*oe+V*ee,c[7]=N*B+I*k+D*Y+V*ge,c[11]=N*A+I*W+D*U+V*Ae,c[15]=N*F+I*he+D*G+V*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],_=e[2],v=e[6],g=e[10],E=e[14],T=e[3],C=e[7],S=e[11],y=e[15],N=m*E-p*g,I=h*E-p*v,D=h*g-m*v,V=f*E-p*_,L=f*g-m*_,B=f*v-h*_;return i*(C*N-S*I+y*D)-s*(T*N-S*V+y*L)+l*(T*I-C*V+y*B)-c*(T*D-C*L+S*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],v=e[9],g=e[10],E=e[11],T=e[12],C=e[13],S=e[14],y=e[15],N=i*h-s*f,I=i*m-l*f,D=i*p-c*f,V=s*m-l*h,L=s*p-c*h,B=l*p-c*m,A=_*C-v*T,F=_*S-g*T,$=_*y-E*T,k=v*S-g*C,W=v*y-E*C,he=g*y-E*S,oe=N*he-I*W+D*k+V*$-L*F+B*A;if(oe===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/oe;return e[0]=(h*he-m*W+p*k)*Y,e[1]=(l*W-s*he-c*k)*Y,e[2]=(C*B-S*L+y*V)*Y,e[3]=(g*L-v*B-E*V)*Y,e[4]=(m*$-f*he-p*F)*Y,e[5]=(i*he-l*$+c*F)*Y,e[6]=(S*D-T*B-y*I)*Y,e[7]=(_*B-g*D+E*I)*Y,e[8]=(f*W-h*$+p*A)*Y,e[9]=(s*$-i*W-c*A)*Y,e[10]=(T*L-C*D+y*N)*Y,e[11]=(v*D-_*L-E*N)*Y,e[12]=(h*F-f*k-m*A)*Y,e[13]=(i*k-s*F+l*A)*Y,e[14]=(C*I-T*V-S*N)*Y,e[15]=(_*V-v*I+g*N)*Y,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,_=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,_*h+s,_*m-l*f,0,p*m-l*h,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,_=f+f,v=h+h,g=c*p,E=c*_,T=c*v,C=f*_,S=f*v,y=h*v,N=m*p,I=m*_,D=m*v,V=s.x,L=s.y,B=s.z;return l[0]=(1-(C+y))*V,l[1]=(E+D)*V,l[2]=(T-I)*V,l[3]=0,l[4]=(E-D)*L,l[5]=(1-(g+y))*L,l[6]=(S+N)*L,l[7]=0,l[8]=(T+I)*B,l[9]=(S-N)*B,l[10]=(1-(g+C))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=ol.set(l[0],l[1],l[2]).length();const h=ol.set(l[4],l[5],l[6]).length(),m=ol.set(l[8],l[9],l[10]).length();c<0&&(f=-f),qa.copy(this);const p=1/f,_=1/h,v=1/m;return qa.elements[0]*=p,qa.elements[1]*=p,qa.elements[2]*=p,qa.elements[4]*=_,qa.elements[5]*=_,qa.elements[6]*=_,qa.elements[8]*=v,qa.elements[9]*=v,qa.elements[10]*=v,i.setFromRotationMatrix(qa),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=ds,m=!1){const p=this.elements,_=2*c/(i-e),v=2*c/(s-l),g=(i+e)/(i-e),E=(s+l)/(s-l);let T,C;if(m)T=c/(f-c),C=f*c/(f-c);else if(h===ds)T=-(f+c)/(f-c),C=-2*f*c/(f-c);else if(h===Uf)T=-f/(f-c),C=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=E,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=C,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=ds,m=!1){const p=this.elements,_=2/(i-e),v=2/(s-l),g=-(i+e)/(i-e),E=-(s+l)/(s-l);let T,C;if(m)T=1/(f-c),C=f/(f-c);else if(h===ds)T=-2/(f-c),C=-(f+c)/(f-c);else if(h===Uf)T=-1/(f-c),C=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=v,p[9]=0,p[13]=E,p[2]=0,p[6]=0,p[10]=T,p[14]=C,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};Pf.prototype.isMatrix4=!0;let _i=Pf;const ol=new ie,qa=new _i,CM=new ie(0,0,0),NM=new ie(1,1,1),wr=new ie,$u=new ie,ga=new ie,V_=new _i,j_=new zr;class bo{constructor(e=0,i=0,s=0,l=bo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],_=l[9],v=l[2],g=l[6],E=l[10];switch(i){case"XYZ":this._y=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,E),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,E),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(qt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,E),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-qt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,E),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(qt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(h,E));break;case"XZY":this._z=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,E),this._y=0);break;default:Et("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return V_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(V_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return j_.setFromEuler(this),this.setFromQuaternion(j_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bo.DEFAULT_ORDER="XYZ";class lb{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let OM=0;const X_=new ie,ll=new zr,Xs=new _i,Ku=new ie,Ec=new ie,DM=new ie,LM=new zr,Y_=new ie(1,0,0),W_=new ie(0,1,0),q_=new ie(0,0,1),$_={type:"added"},IM={type:"removed"},cl={type:"childadded",child:null},Kh={type:"childremoved",child:null};class va extends Gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:OM++}),this.uuid=Fc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=va.DEFAULT_UP.clone();const e=new ie,i=new bo,s=new zr,l=new ie(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new _i},normalMatrix:{value:new Dt}}),this.matrix=new _i,this.matrixWorld=new _i,this.matrixAutoUpdate=va.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=va.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lb,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return ll.setFromAxisAngle(e,i),this.quaternion.multiply(ll),this}rotateOnWorldAxis(e,i){return ll.setFromAxisAngle(e,i),this.quaternion.premultiply(ll),this}rotateX(e){return this.rotateOnAxis(Y_,e)}rotateY(e){return this.rotateOnAxis(W_,e)}rotateZ(e){return this.rotateOnAxis(q_,e)}translateOnAxis(e,i){return X_.copy(e).applyQuaternion(this.quaternion),this.position.add(X_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Y_,e)}translateY(e){return this.translateOnAxis(W_,e)}translateZ(e){return this.translateOnAxis(q_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xs.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Ku.copy(e):Ku.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Ec.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xs.lookAt(Ec,Ku,this.up):Xs.lookAt(Ku,Ec,this.up),this.quaternion.setFromRotationMatrix(Xs),l&&(Xs.extractRotation(l.matrixWorld),ll.setFromRotationMatrix(Xs),this.quaternion.premultiply(ll.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(sn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($_),cl.child=e,this.dispatchEvent(cl),cl.child=null):sn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(IM),Kh.child=e,this.dispatchEvent(Kh),Kh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xs.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($_),cl.child=e,this.dispatchEvent(cl),cl.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ec,e,DM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ec,LM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const v=m[p];c(e.shapes,v)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),_=f(e.images),v=f(e.shapes),g=f(e.skeletons),E=f(e.animations),T=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),v.length>0&&(s.shapes=v),g.length>0&&(s.skeletons=g),E.length>0&&(s.animations=E),T.length>0&&(s.nodes=T)}return s.object=l,s;function f(h){const m=[];for(const p in h){const _=h[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}va.DEFAULT_UP=new ie(0,1,0);va.DEFAULT_MATRIX_AUTO_UPDATE=!0;va.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zu extends va{constructor(){super(),this.isGroup=!0,this.type="Group"}}const UM={type:"move"};class Zh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ie,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ie),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ie,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ie,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const C of e.hand.values()){const S=i.getJointPose(C,s),y=this._getHandJoint(p,C);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const _=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],g=_.position.distanceTo(v.position),E=.02,T=.005;p.inputState.pinching&&g>E+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=E-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(UM)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Zu;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const cb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rr={h:0,s:0,l:0},Qu={h:0,s:0,l:0};function Qh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class wn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=_a){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Qt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Qt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Qt.workingColorSpace){if(e=yM(e,1),i=qt(i,0,1),s=qt(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Qh(f,c,e+1/3),this.g=Qh(f,c,e),this.b=Qh(f,c,e-1/3)}return Qt.colorSpaceToWorking(this,l),this}setStyle(e,i=_a){function s(c){c!==void 0&&parseFloat(c)<1&&Et("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:Et("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);Et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=_a){const s=cb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):Et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}copyLinearToSRGB(e){return this.r=Sl(e.r),this.g=Sl(e.g),this.b=Sl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_a){return Qt.workingToColorSpace(Bi.copy(this),e),Math.round(qt(Bi.r*255,0,255))*65536+Math.round(qt(Bi.g*255,0,255))*256+Math.round(qt(Bi.b*255,0,255))}getHexString(e=_a){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Qt.workingColorSpace){Qt.workingToColorSpace(Bi.copy(this),i);const s=Bi.r,l=Bi.g,c=Bi.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const _=(h+f)/2;if(h===f)m=0,p=0;else{const v=f-h;switch(p=_<=.5?v/(f+h):v/(2-f-h),f){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,i=Qt.workingColorSpace){return Qt.workingToColorSpace(Bi.copy(this),i),e.r=Bi.r,e.g=Bi.g,e.b=Bi.b,e}getStyle(e=_a){Qt.workingToColorSpace(Bi.copy(this),e);const i=Bi.r,s=Bi.g,l=Bi.b;return e!==_a?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(Rr),this.setHSL(Rr.h+e,Rr.s+i,Rr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(Rr),e.getHSL(Qu);const s=Xh(Rr.h,Qu.h,i),l=Xh(Rr.s,Qu.s,i),c=Xh(Rr.l,Qu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bi=new wn;wn.NAMES=cb;class PM extends va{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bo,this.environmentIntensity=1,this.environmentRotation=new bo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const $a=new ie,Ys=new ie,Jh=new ie,Ws=new ie,ul=new ie,fl=new ie,K_=new ie,ep=new ie,tp=new ie,np=new ie,ip=new si,ap=new si,sp=new si;class Za{constructor(e=new ie,i=new ie,s=new ie){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),$a.subVectors(e,i),l.cross($a);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){$a.subVectors(l,i),Ys.subVectors(s,i),Jh.subVectors(e,i);const f=$a.dot($a),h=$a.dot(Ys),m=$a.dot(Jh),p=Ys.dot(Ys),_=Ys.dot(Jh),v=f*p-h*h;if(v===0)return c.set(0,0,0),null;const g=1/v,E=(p*m-h*_)*g,T=(f*_-h*m)*g;return c.set(1-E-T,T,E)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Ws)===null?!1:Ws.x>=0&&Ws.y>=0&&Ws.x+Ws.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,Ws)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ws.x),m.addScaledVector(f,Ws.y),m.addScaledVector(h,Ws.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return ip.setScalar(0),ap.setScalar(0),sp.setScalar(0),ip.fromBufferAttribute(e,i),ap.fromBufferAttribute(e,s),sp.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(ip,c.x),f.addScaledVector(ap,c.y),f.addScaledVector(sp,c.z),f}static isFrontFacing(e,i,s,l){return $a.subVectors(s,i),Ys.subVectors(e,i),$a.cross(Ys).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $a.subVectors(this.c,this.b),Ys.subVectors(this.a,this.b),$a.cross(Ys).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Za.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Za.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return Za.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return Za.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Za.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;ul.subVectors(l,s),fl.subVectors(c,s),ep.subVectors(e,s);const m=ul.dot(ep),p=fl.dot(ep);if(m<=0&&p<=0)return i.copy(s);tp.subVectors(e,l);const _=ul.dot(tp),v=fl.dot(tp);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*p;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(ul,f);np.subVectors(e,c);const E=ul.dot(np),T=fl.dot(np);if(T>=0&&E<=T)return i.copy(c);const C=E*p-m*T;if(C<=0&&p>=0&&T<=0)return h=p/(p-T),i.copy(s).addScaledVector(fl,h);const S=_*T-E*v;if(S<=0&&v-_>=0&&E-T>=0)return K_.subVectors(c,l),h=(v-_)/(v-_+(E-T)),i.copy(l).addScaledVector(K_,h);const y=1/(S+C+g);return f=C*y,h=g*y,i.copy(s).addScaledVector(ul,f).addScaledVector(fl,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Bc{constructor(e=new ie(1/0,1/0,1/0),i=new ie(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Ka.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Ka.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Ka.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Ka):Ka.fromBufferAttribute(c,f),Ka.applyMatrix4(e.matrixWorld),this.expandByPoint(Ka);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ju.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Ju.copy(s.boundingBox)),Ju.applyMatrix4(e.matrixWorld),this.union(Ju)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ka),Ka.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sc),ef.subVectors(this.max,Sc),dl.subVectors(e.a,Sc),hl.subVectors(e.b,Sc),pl.subVectors(e.c,Sc),Cr.subVectors(hl,dl),Nr.subVectors(pl,hl),oo.subVectors(dl,pl);let i=[0,-Cr.z,Cr.y,0,-Nr.z,Nr.y,0,-oo.z,oo.y,Cr.z,0,-Cr.x,Nr.z,0,-Nr.x,oo.z,0,-oo.x,-Cr.y,Cr.x,0,-Nr.y,Nr.x,0,-oo.y,oo.x,0];return!rp(i,dl,hl,pl,ef)||(i=[1,0,0,0,1,0,0,0,1],!rp(i,dl,hl,pl,ef))?!1:(tf.crossVectors(Cr,Nr),i=[tf.x,tf.y,tf.z],rp(i,dl,hl,pl,ef))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ka).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ka).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qs=[new ie,new ie,new ie,new ie,new ie,new ie,new ie,new ie],Ka=new ie,Ju=new Bc,dl=new ie,hl=new ie,pl=new ie,Cr=new ie,Nr=new ie,oo=new ie,Sc=new ie,ef=new ie,tf=new ie,lo=new ie;function rp(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){lo.fromArray(r,c);const h=l.x*Math.abs(lo.x)+l.y*Math.abs(lo.y)+l.z*Math.abs(lo.z),m=e.dot(lo),p=i.dot(lo),_=s.dot(lo);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>h)return!1}return!0}const di=new ie,nf=new Ht;let FM=0;class ms extends Gr{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:FM++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=P_,this.updateRanges=[],this.gpuType=fs,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)nf.fromBufferAttribute(this,i),nf.applyMatrix3(e),this.setXY(i,nf.x,nf.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)di.fromBufferAttribute(this,i),di.applyMatrix3(e),this.setXYZ(i,di.x,di.y,di.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)di.fromBufferAttribute(this,i),di.applyMatrix4(e),this.setXYZ(i,di.x,di.y,di.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)di.fromBufferAttribute(this,i),di.applyNormalMatrix(e),this.setXYZ(i,di.x,di.y,di.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)di.fromBufferAttribute(this,i),di.transformDirection(e),this.setXYZ(i,di.x,di.y,di.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=yc(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=ta(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=yc(i,this.array)),i}setX(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=yc(i,this.array)),i}setY(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=yc(i,this.array)),i}setZ(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=yc(i,this.array)),i}setW(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array),l=ta(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array),l=ta(l,this.array),c=ta(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==P_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ub extends ms{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class fb extends ms{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Ba extends ms{constructor(e,i,s){super(new Float32Array(e),i,s)}}const BM=new Bc,Mc=new ie,op=new ie;class Rm{constructor(e=new ie,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):BM.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mc.subVectors(e,this.center);const i=Mc.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Mc,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(op.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mc.copy(e.center).add(op)),this.expandByPoint(Mc.copy(e.center).sub(op))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let zM=0;const Ua=new _i,lp=new va,ml=new ie,xa=new Bc,Tc=new Bc,Ti=new ie;class vs extends Gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zM++}),this.uuid=Fc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xM(e)?fb:ub)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new Dt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ua.makeRotationFromQuaternion(e),this.applyMatrix4(Ua),this}rotateX(e){return Ua.makeRotationX(e),this.applyMatrix4(Ua),this}rotateY(e){return Ua.makeRotationY(e),this.applyMatrix4(Ua),this}rotateZ(e){return Ua.makeRotationZ(e),this.applyMatrix4(Ua),this}translate(e,i,s){return Ua.makeTranslation(e,i,s),this.applyMatrix4(Ua),this}scale(e,i,s){return Ua.makeScale(e,i,s),this.applyMatrix4(Ua),this}lookAt(e){return lp.lookAt(e),lp.updateMatrix(),this.applyMatrix4(lp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ml).negate(),this.translate(ml.x,ml.y,ml.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Ba(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&Et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ie(-1/0,-1/0,-1/0),new ie(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];xa.setFromBufferAttribute(c),this.morphTargetsRelative?(Ti.addVectors(this.boundingBox.min,xa.min),this.boundingBox.expandByPoint(Ti),Ti.addVectors(this.boundingBox.max,xa.max),this.boundingBox.expandByPoint(Ti)):(this.boundingBox.expandByPoint(xa.min),this.boundingBox.expandByPoint(xa.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&sn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ie,1/0);return}if(e){const s=this.boundingSphere.center;if(xa.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];Tc.setFromBufferAttribute(h),this.morphTargetsRelative?(Ti.addVectors(xa.min,Tc.min),xa.expandByPoint(Ti),Ti.addVectors(xa.max,Tc.max),xa.expandByPoint(Ti)):(xa.expandByPoint(Tc.min),xa.expandByPoint(Tc.max))}xa.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)Ti.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Ti));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,_=h.count;p<_;p++)Ti.fromBufferAttribute(h,p),m&&(ml.fromBufferAttribute(e,p),Ti.add(ml)),l=Math.max(l,s.distanceToSquared(Ti))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&sn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){sn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ms(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let A=0;A<s.count;A++)h[A]=new ie,m[A]=new ie;const p=new ie,_=new ie,v=new ie,g=new Ht,E=new Ht,T=new Ht,C=new ie,S=new ie;function y(A,F,$){p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,F),v.fromBufferAttribute(s,$),g.fromBufferAttribute(c,A),E.fromBufferAttribute(c,F),T.fromBufferAttribute(c,$),_.sub(p),v.sub(p),E.sub(g),T.sub(g);const k=1/(E.x*T.y-T.x*E.y);isFinite(k)&&(C.copy(_).multiplyScalar(T.y).addScaledVector(v,-E.y).multiplyScalar(k),S.copy(v).multiplyScalar(E.x).addScaledVector(_,-T.x).multiplyScalar(k),h[A].add(C),h[F].add(C),h[$].add(C),m[A].add(S),m[F].add(S),m[$].add(S))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,F=N.length;A<F;++A){const $=N[A],k=$.start,W=$.count;for(let he=k,oe=k+W;he<oe;he+=3)y(e.getX(he+0),e.getX(he+1),e.getX(he+2))}const I=new ie,D=new ie,V=new ie,L=new ie;function B(A){V.fromBufferAttribute(l,A),L.copy(V);const F=h[A];I.copy(F),I.sub(V.multiplyScalar(V.dot(F))).normalize(),D.crossVectors(L,F);const k=D.dot(m[A])<0?-1:1;f.setXYZW(A,I.x,I.y,I.z,k)}for(let A=0,F=N.length;A<F;++A){const $=N[A],k=$.start,W=$.count;for(let he=k,oe=k+W;he<oe;he+=3)B(e.getX(he+0)),B(e.getX(he+1)),B(e.getX(he+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ms(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,E=s.count;g<E;g++)s.setXYZ(g,0,0,0);const l=new ie,c=new ie,f=new ie,h=new ie,m=new ie,p=new ie,_=new ie,v=new ie;if(e)for(let g=0,E=e.count;g<E;g+=3){const T=e.getX(g+0),C=e.getX(g+1),S=e.getX(g+2);l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,S),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),h.fromBufferAttribute(s,T),m.fromBufferAttribute(s,C),p.fromBufferAttribute(s,S),h.add(_),m.add(_),p.add(_),s.setXYZ(T,h.x,h.y,h.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let g=0,E=i.count;g<E;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Ti.fromBufferAttribute(e,i),Ti.normalize(),e.setXYZ(i,Ti.x,Ti.y,Ti.z)}toNonIndexed(){function e(h,m){const p=h.array,_=h.itemSize,v=h.normalized,g=new p.constructor(m.length*_);let E=0,T=0;for(let C=0,S=m.length;C<S;C++){h.isInterleavedBufferAttribute?E=m[C]*h.data.stride+h.offset:E=m[C]*_;for(let y=0;y<_;y++)g[T++]=p[E++]}return new ms(g,_,v)}if(this.index===null)return Et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new vs,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let _=0,v=p.length;_<v;_++){const g=p[_],E=e(g,s);m.push(E)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let v=0,g=p.length;v<g;v++){const E=p[v];_.push(E.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(i))}const c=e.morphAttributes;for(const p in c){const _=[],v=c[p];for(let g=0,E=v.length;g<E;g++)_.push(v[g].clone(i));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,_=f.length;p<_;p++){const v=f[p];this.addGroup(v.start,v.count,v.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let GM=0;class Bf extends Gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:GM++}),this.uuid=Fc(),this.name="",this.type="Material",this.blending=El,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mp,this.blendDst=Tp,this.blendEquation=ho,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wn(0,0,0),this.blendAlpha=0,this.depthFunc=Tl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=U_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sl,this.stencilZFail=sl,this.stencilZPass=sl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){Et(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){Et(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==El&&(s.blending=this.blending),this.side!==Br&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Mp&&(s.blendSrc=this.blendSrc),this.blendDst!==Tp&&(s.blendDst=this.blendDst),this.blendEquation!==ho&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Tl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==U_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sl&&(s.stencilFail=this.stencilFail),this.stencilZFail!==sl&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==sl&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const $s=new ie,cp=new ie,af=new ie,Or=new ie,up=new ie,sf=new ie,fp=new ie;class db{constructor(e=new ie,i=new ie(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$s)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=$s.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):($s.copy(this.origin).addScaledVector(this.direction,i),$s.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){cp.copy(e).add(i).multiplyScalar(.5),af.copy(i).sub(e).normalize(),Or.copy(this.origin).sub(cp);const c=e.distanceTo(i)*.5,f=-this.direction.dot(af),h=Or.dot(this.direction),m=-Or.dot(af),p=Or.lengthSq(),_=Math.abs(1-f*f);let v,g,E,T;if(_>0)if(v=f*m-h,g=f*h-m,T=c*_,v>=0)if(g>=-T)if(g<=T){const C=1/_;v*=C,g*=C,E=v*(v+f*g+2*h)+g*(f*v+g+2*m)+p}else g=c,v=Math.max(0,-(f*g+h)),E=-v*v+g*(g+2*m)+p;else g=-c,v=Math.max(0,-(f*g+h)),E=-v*v+g*(g+2*m)+p;else g<=-T?(v=Math.max(0,-(-f*c+h)),g=v>0?-c:Math.min(Math.max(-c,-m),c),E=-v*v+g*(g+2*m)+p):g<=T?(v=0,g=Math.min(Math.max(-c,-m),c),E=g*(g+2*m)+p):(v=Math.max(0,-(f*c+h)),g=v>0?c:Math.min(Math.max(-c,-m),c),E=-v*v+g*(g+2*m)+p);else g=f>0?-c:c,v=Math.max(0,-(f*g+h)),E=-v*v+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(cp).addScaledVector(af,g),E}intersectSphere(e,i){$s.subVectors(e.center,this.origin);const s=$s.dot(this.direction),l=$s.dot($s)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),_>=0?(c=(e.min.y-g.y)*_,f=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,f=(e.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),v>=0?(h=(e.min.z-g.z)*v,m=(e.max.z-g.z)*v):(h=(e.max.z-g.z)*v,m=(e.min.z-g.z)*v),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,$s)!==null}intersectTriangle(e,i,s,l,c){up.subVectors(i,e),sf.subVectors(s,e),fp.crossVectors(up,sf);let f=this.direction.dot(fp),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Or.subVectors(this.origin,e);const m=h*this.direction.dot(sf.crossVectors(Or,sf));if(m<0)return null;const p=h*this.direction.dot(up.cross(Or));if(p<0||m+p>f)return null;const _=-h*Or.dot(fp);return _<0?null:this.at(_/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cm extends Bf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bo,this.combine=jv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Z_=new _i,co=new db,rf=new Rm,Q_=new ie,of=new ie,lf=new ie,cf=new ie,dp=new ie,uf=new ie,J_=new ie,ff=new ie;class xs extends va{constructor(e=new vs,i=new Cm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){uf.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=h[m],v=c[m];_!==0&&(dp.fromBufferAttribute(v,e),f?uf.addScaledVector(dp,_):uf.addScaledVector(dp.sub(i),_))}i.add(uf)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),rf.copy(s.boundingSphere),rf.applyMatrix4(c),co.copy(e.ray).recast(e.near),!(rf.containsPoint(co.origin)===!1&&(co.intersectSphere(rf,Q_)===null||co.origin.distanceToSquared(Q_)>(e.far-e.near)**2))&&(Z_.copy(c).invert(),co.copy(e.ray).applyMatrix4(Z_),!(s.boundingBox!==null&&co.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,co)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,E=c.drawRange;if(h!==null)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const S=g[T],y=f[S.materialIndex],N=Math.max(S.start,E.start),I=Math.min(h.count,Math.min(S.start+S.count,E.start+E.count));for(let D=N,V=I;D<V;D+=3){const L=h.getX(D),B=h.getX(D+1),A=h.getX(D+2);l=df(this,y,e,s,p,_,v,L,B,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const T=Math.max(0,E.start),C=Math.min(h.count,E.start+E.count);for(let S=T,y=C;S<y;S+=3){const N=h.getX(S),I=h.getX(S+1),D=h.getX(S+2);l=df(this,f,e,s,p,_,v,N,I,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const S=g[T],y=f[S.materialIndex],N=Math.max(S.start,E.start),I=Math.min(m.count,Math.min(S.start+S.count,E.start+E.count));for(let D=N,V=I;D<V;D+=3){const L=D,B=D+1,A=D+2;l=df(this,y,e,s,p,_,v,L,B,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const T=Math.max(0,E.start),C=Math.min(m.count,E.start+E.count);for(let S=T,y=C;S<y;S+=3){const N=S,I=S+1,D=S+2;l=df(this,f,e,s,p,_,v,N,I,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function HM(r,e,i,s,l,c,f,h){let m;if(e.side===ia?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===Br,h),m===null)return null;ff.copy(h),ff.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(ff);return p<i.near||p>i.far?null:{distance:p,point:ff.clone(),object:r}}function df(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,of),r.getVertexPosition(m,lf),r.getVertexPosition(p,cf);const _=HM(r,e,i,s,of,lf,cf,J_);if(_){const v=new ie;Za.getBarycoord(J_,of,lf,cf,v),l&&(_.uv=Za.getInterpolatedAttribute(l,h,m,p,v,new Ht)),c&&(_.uv1=Za.getInterpolatedAttribute(c,h,m,p,v,new Ht)),f&&(_.normal=Za.getInterpolatedAttribute(f,h,m,p,v,new ie),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new ie,materialIndex:0};Za.getNormal(of,lf,cf,g.normal),_.face=g,_.barycoord=v}return _}class kM extends Hi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=Di,_=Di,v,g){super(null,f,h,m,p,_,l,c,v,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hp=new ie,VM=new ie,jM=new Dt;class Ir{constructor(e=new ie(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=hp.subVectors(s,i).cross(VM.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(hp),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||jM.getNormalMatrix(e),l=this.coplanarPoint(hp).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const uo=new Rm,XM=new Ht(.5,.5),hf=new ie;class hb{constructor(e=new Ir,i=new Ir,s=new Ir,l=new Ir,c=new Ir,f=new Ir){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=ds,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],_=c[4],v=c[5],g=c[6],E=c[7],T=c[8],C=c[9],S=c[10],y=c[11],N=c[12],I=c[13],D=c[14],V=c[15];if(l[0].setComponents(p-f,E-_,y-T,V-N).normalize(),l[1].setComponents(p+f,E+_,y+T,V+N).normalize(),l[2].setComponents(p+h,E+v,y+C,V+I).normalize(),l[3].setComponents(p-h,E-v,y-C,V-I).normalize(),s)l[4].setComponents(m,g,S,D).normalize(),l[5].setComponents(p-m,E-g,y-S,V-D).normalize();else if(l[4].setComponents(p-m,E-g,y-S,V-D).normalize(),i===ds)l[5].setComponents(p+m,E+g,y+S,V+D).normalize();else if(i===Uf)l[5].setComponents(m,g,S,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),uo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),uo.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(uo)}intersectsSprite(e){uo.center.set(0,0,0);const i=XM.distanceTo(e.center);return uo.radius=.7071067811865476+i,uo.applyMatrix4(e.matrixWorld),this.intersectsSphere(uo)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(hf.x=l.normal.x>0?e.max.x:e.min.x,hf.y=l.normal.y>0?e.max.y:e.min.y,hf.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(hf)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pb extends Hi{constructor(e=[],i=_o,s,l,c,f,h,m,p,_){super(e,i,s,l,c,f,h,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wl extends Hi{constructor(e,i,s=gs,l,c,f,h=Di,m=Di,p,_=tr,v=1){if(_!==tr&&_!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:v};super(g,l,c,f,h,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class YM extends wl{constructor(e,i=gs,s=_o,l,c,f=Di,h=Di,m,p=tr){const _={width:e,height:e,depth:1},v=[_,_,_,_,_,_];super(e,e,i,s,l,c,f,h,m,p),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mb extends Hi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zc extends vs{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],_=[],v=[];let g=0,E=0;T("z","y","x",-1,-1,s,i,e,f,c,0),T("z","y","x",1,-1,s,i,-e,f,c,1),T("x","z","y",1,1,e,s,i,l,f,2),T("x","z","y",1,-1,e,s,-i,l,f,3),T("x","y","z",1,-1,e,i,s,l,c,4),T("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Ba(p,3)),this.setAttribute("normal",new Ba(_,3)),this.setAttribute("uv",new Ba(v,2));function T(C,S,y,N,I,D,V,L,B,A,F){const $=D/B,k=V/A,W=D/2,he=V/2,oe=L/2,Y=B+1,U=A+1;let G=0,ee=0;const ge=new ie;for(let Ae=0;Ae<U;Ae++){const P=Ae*k-he;for(let J=0;J<Y;J++){const ye=J*$-W;ge[C]=ye*N,ge[S]=P*I,ge[y]=oe,p.push(ge.x,ge.y,ge.z),ge[C]=0,ge[S]=0,ge[y]=L>0?1:-1,_.push(ge.x,ge.y,ge.z),v.push(J/B),v.push(1-Ae/A),G+=1}}for(let Ae=0;Ae<A;Ae++)for(let P=0;P<B;P++){const J=g+P+Y*Ae,ye=g+P+Y*(Ae+1),Oe=g+(P+1)+Y*(Ae+1),Fe=g+(P+1)+Y*Ae;m.push(J,ye,Fe),m.push(ye,Oe,Fe),ee+=6}h.addGroup(E,ee,F),E+=ee,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zf extends vs{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,_=m+1,v=e/h,g=i/m,E=[],T=[],C=[],S=[];for(let y=0;y<_;y++){const N=y*g-f;for(let I=0;I<p;I++){const D=I*v-c;T.push(D,-N,0),C.push(0,0,1),S.push(I/h),S.push(1-y/m)}}for(let y=0;y<m;y++)for(let N=0;N<h;N++){const I=N+p*y,D=N+p*(y+1),V=N+1+p*(y+1),L=N+1+p*y;E.push(I,D,L),E.push(D,V,L)}this.setIndex(E),this.setAttribute("position",new Ba(T,3)),this.setAttribute("normal",new Ba(C,3)),this.setAttribute("uv",new Ba(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zf(e.width,e.height,e.widthSegments,e.heightSegments)}}class Nm extends vs{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const _=[],v=new ie,g=new ie,E=[],T=[],C=[],S=[];for(let y=0;y<=s;y++){const N=[],I=y/s;let D=0;y===0&&f===0?D=.5/i:y===s&&m===Math.PI&&(D=-.5/i);for(let V=0;V<=i;V++){const L=V/i;v.x=-e*Math.cos(l+L*c)*Math.sin(f+I*h),v.y=e*Math.cos(f+I*h),v.z=e*Math.sin(l+L*c)*Math.sin(f+I*h),T.push(v.x,v.y,v.z),g.copy(v).normalize(),C.push(g.x,g.y,g.z),S.push(L+D,1-I),N.push(p++)}_.push(N)}for(let y=0;y<s;y++)for(let N=0;N<i;N++){const I=_[y][N+1],D=_[y][N],V=_[y+1][N],L=_[y+1][N+1];(y!==0||f>0)&&E.push(I,D,L),(y!==s-1||m<Math.PI)&&E.push(D,V,L)}this.setIndex(E),this.setAttribute("position",new Ba(T,3)),this.setAttribute("normal",new Ba(C,3)),this.setAttribute("uv",new Ba(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Rl(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(ev(l))l.isRenderTargetTexture?(Et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(ev(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Wi(r){const e={};for(let i=0;i<r.length;i++){const s=Rl(r[i]);for(const l in s)e[l]=s[l]}return e}function ev(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function WM(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function gb(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qt.workingColorSpace}const qM={clone:Rl,merge:Wi};var $M=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,KM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _s extends Bf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$M,this.fragmentShader=KM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rl(e.uniforms),this.uniformsGroups=WM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class ZM extends _s{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class QM extends Bf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class JM extends Bf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const pp={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(tv(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!tv(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function tv(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class eT{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(_){h++,c===!1&&l.onStart!==void 0&&l.onStart(_,f,h),c=!0},this.itemEnd=function(_){f++,l.onProgress!==void 0&&l.onProgress(_,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(_){l.onError!==void 0&&l.onError(_)},this.resolveURL=function(_){return m?m(_):_},this.setURLModifier=function(_){return m=_,this},this.addHandler=function(_,v){return p.push(_,v),this},this.removeHandler=function(_){const v=p.indexOf(_);return v!==-1&&p.splice(v,2),this},this.getHandler=function(_){for(let v=0,g=p.length;v<g;v+=2){const E=p[v],T=p[v+1];if(E.global&&(E.lastIndex=0),E.test(_))return T}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const tT=new eT;class Om{constructor(e){this.manager=e!==void 0?e:tT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Om.DEFAULT_MATERIAL_NAME="__DEFAULT";const gl=new WeakMap;class nT extends Om{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=pp.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let v=gl.get(f);v===void 0&&(v=[],gl.set(f,v)),v.push({onLoad:i,onError:l})}return f}const h=Uc("img");function m(){_(),i&&i(this);const v=gl.get(this)||[];for(let g=0;g<v.length;g++){const E=v[g];E.onLoad&&E.onLoad(this)}gl.delete(this),c.manager.itemEnd(e)}function p(v){_(),l&&l(v),pp.remove(`image:${e}`);const g=gl.get(this)||[];for(let E=0;E<g.length;E++){const T=g[E];T.onError&&T.onError(v)}gl.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function _(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),pp.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class iT extends Om{constructor(e){super(e)}load(e,i,s,l){const c=new Hi,f=new nT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const pf=new ie,mf=new zr,ls=new ie;class xb extends va{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _i,this.projectionMatrix=new _i,this.projectionMatrixInverse=new _i,this.coordinateSystem=ds,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pf,mf,ls),ls.x===1&&ls.y===1&&ls.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pf,mf,ls.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(pf,mf,ls),ls.x===1&&ls.y===1&&ls.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pf,mf,ls.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Dr=new ie,nv=new Ht,iv=new Ht;class Pa extends xb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=dm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dm*2*Math.atan(Math.tan(Rf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z),Dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Dr.x,Dr.y).multiplyScalar(-e/Dr.z)}getViewSize(e,i){return this.getViewBounds(e,nv,iv),i.subVectors(iv,nv)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Rf*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class _b extends xb{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=_*this.view.offsetY,m=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const xl=-90,_l=1;class aT extends va{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Pa(xl,_l,e,i);l.layers=this.layers,this.add(l);const c=new Pa(xl,_l,e,i);c.layers=this.layers,this.add(c);const f=new Pa(xl,_l,e,i);f.layers=this.layers,this.add(f);const h=new Pa(xl,_l,e,i);h.layers=this.layers,this.add(h);const m=new Pa(xl,_l,e,i);m.layers=this.layers,this.add(m);const p=new Pa(xl,_l,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===ds)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Uf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,_]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),E=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(v,g,E),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class sT extends Pa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class av{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(qt(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Fm=class Fm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Fm.prototype.isMatrix2=!0;let sv=Fm;class rT extends Gr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Et("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function rv(r,e,i,s){const l=oT(s);switch(i){case ib:return r*e;case sb:return r*e/l.components*l.byteLength;case Em:return r*e/l.components*l.byteLength;case vo:return r*e*2/l.components*l.byteLength;case Sm:return r*e*2/l.components*l.byteLength;case ab:return r*e*3/l.components*l.byteLength;case Qa:return r*e*4/l.components*l.byteLength;case Mm:return r*e*4/l.components*l.byteLength;case Mf:case Tf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Af:case wf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pp:case Bp:return Math.max(r,16)*Math.max(e,8)/4;case Up:case Fp:return Math.max(r,8)*Math.max(e,8)/2;case zp:case Gp:case kp:case Vp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Hp:case Of:case jp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Xp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Yp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Wp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case qp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case $p:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Kp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Zp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Qp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Jp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case em:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case tm:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case nm:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case im:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case am:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case sm:case rm:case om:return Math.ceil(r/4)*Math.ceil(e/4)*16;case lm:case cm:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Df:case um:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function oT(r){switch(r){case Fa:case Jv:return{byteLength:1,components:1};case Lc:case eb:case er:return{byteLength:2,components:1};case bm:case ym:return{byteLength:2,components:4};case gs:case vm:case fs:return{byteLength:4,components:1};case tb:case nb:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_m}}));typeof window<"u"&&(window.__THREE__?Et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_m);function vb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function lT(r){const e=new WeakMap;function i(h,m){const p=h.array,_=h.usage,v=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,_),h.onUploadCallback();let E;if(p instanceof Float32Array)E=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)E=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?E=r.HALF_FLOAT:E=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)E=r.SHORT;else if(p instanceof Uint32Array)E=r.UNSIGNED_INT;else if(p instanceof Int32Array)E=r.INT;else if(p instanceof Int8Array)E=r.BYTE;else if(p instanceof Uint8Array)E=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)E=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:E,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:v}}function s(h,m,p){const _=m.array,v=m.updateRanges;if(r.bindBuffer(p,h),v.length===0)r.bufferSubData(p,0,_);else{v.sort((E,T)=>E.start-T.start);let g=0;for(let E=1;E<v.length;E++){const T=v[g],C=v[E];C.start<=T.start+T.count+1?T.count=Math.max(T.count,C.start+C.count-T.start):(++g,v[g]=C)}v.length=g+1;for(let E=0,T=v.length;E<T;E++){const C=v[E];r.bufferSubData(p,C.start*_.BYTES_PER_ELEMENT,_,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var cT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_T=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ET=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ST=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,MT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,TT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,CT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,NT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,OT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,DT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,LT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,IT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,UT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,PT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,FT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,BT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zT="gl_FragColor = linearToOutputTexel( gl_FragColor );",GT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,HT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,VT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,YT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,WT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$T=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ZT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,e1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,t1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,n1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,i1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,a1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,o1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,l1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,c1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,u1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,f1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,d1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,h1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,g1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,x1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,v1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,E1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,S1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,A1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,R1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,C1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,D1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,L1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,U1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,z1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,G1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,X1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Y1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,W1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,q1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,K1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Z1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,J1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,aA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,oA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_A=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,vA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,EA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,MA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,RA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,NA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,OA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,IA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,BA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:cT,alphahash_pars_fragment:uT,alphamap_fragment:fT,alphamap_pars_fragment:dT,alphatest_fragment:hT,alphatest_pars_fragment:pT,aomap_fragment:mT,aomap_pars_fragment:gT,batching_pars_vertex:xT,batching_vertex:_T,begin_vertex:vT,beginnormal_vertex:bT,bsdfs:yT,iridescence_fragment:ET,bumpmap_pars_fragment:ST,clipping_planes_fragment:MT,clipping_planes_pars_fragment:TT,clipping_planes_pars_vertex:AT,clipping_planes_vertex:wT,color_fragment:RT,color_pars_fragment:CT,color_pars_vertex:NT,color_vertex:OT,common:DT,cube_uv_reflection_fragment:LT,defaultnormal_vertex:IT,displacementmap_pars_vertex:UT,displacementmap_vertex:PT,emissivemap_fragment:FT,emissivemap_pars_fragment:BT,colorspace_fragment:zT,colorspace_pars_fragment:GT,envmap_fragment:HT,envmap_common_pars_fragment:kT,envmap_pars_fragment:VT,envmap_pars_vertex:jT,envmap_physical_pars_fragment:t1,envmap_vertex:XT,fog_vertex:YT,fog_pars_vertex:WT,fog_fragment:qT,fog_pars_fragment:$T,gradientmap_pars_fragment:KT,lightmap_pars_fragment:ZT,lights_lambert_fragment:QT,lights_lambert_pars_fragment:JT,lights_pars_begin:e1,lights_toon_fragment:n1,lights_toon_pars_fragment:i1,lights_phong_fragment:a1,lights_phong_pars_fragment:s1,lights_physical_fragment:r1,lights_physical_pars_fragment:o1,lights_fragment_begin:l1,lights_fragment_maps:c1,lights_fragment_end:u1,lightprobes_pars_fragment:f1,logdepthbuf_fragment:d1,logdepthbuf_pars_fragment:h1,logdepthbuf_pars_vertex:p1,logdepthbuf_vertex:m1,map_fragment:g1,map_pars_fragment:x1,map_particle_fragment:_1,map_particle_pars_fragment:v1,metalnessmap_fragment:b1,metalnessmap_pars_fragment:y1,morphinstance_vertex:E1,morphcolor_vertex:S1,morphnormal_vertex:M1,morphtarget_pars_vertex:T1,morphtarget_vertex:A1,normal_fragment_begin:w1,normal_fragment_maps:R1,normal_pars_fragment:C1,normal_pars_vertex:N1,normal_vertex:O1,normalmap_pars_fragment:D1,clearcoat_normal_fragment_begin:L1,clearcoat_normal_fragment_maps:I1,clearcoat_pars_fragment:U1,iridescence_pars_fragment:P1,opaque_fragment:F1,packing:B1,premultiplied_alpha_fragment:z1,project_vertex:G1,dithering_fragment:H1,dithering_pars_fragment:k1,roughnessmap_fragment:V1,roughnessmap_pars_fragment:j1,shadowmap_pars_fragment:X1,shadowmap_pars_vertex:Y1,shadowmap_vertex:W1,shadowmask_pars_fragment:q1,skinbase_vertex:$1,skinning_pars_vertex:K1,skinning_vertex:Z1,skinnormal_vertex:Q1,specularmap_fragment:J1,specularmap_pars_fragment:eA,tonemapping_fragment:tA,tonemapping_pars_fragment:nA,transmission_fragment:iA,transmission_pars_fragment:aA,uv_pars_fragment:sA,uv_pars_vertex:rA,uv_vertex:oA,worldpos_vertex:lA,background_vert:cA,background_frag:uA,backgroundCube_vert:fA,backgroundCube_frag:dA,cube_vert:hA,cube_frag:pA,depth_vert:mA,depth_frag:gA,distance_vert:xA,distance_frag:_A,equirect_vert:vA,equirect_frag:bA,linedashed_vert:yA,linedashed_frag:EA,meshbasic_vert:SA,meshbasic_frag:MA,meshlambert_vert:TA,meshlambert_frag:AA,meshmatcap_vert:wA,meshmatcap_frag:RA,meshnormal_vert:CA,meshnormal_frag:NA,meshphong_vert:OA,meshphong_frag:DA,meshphysical_vert:LA,meshphysical_frag:IA,meshtoon_vert:UA,meshtoon_frag:PA,points_vert:FA,points_frag:BA,shadow_vert:zA,shadow_frag:GA,sprite_vert:HA,sprite_frag:kA},Ye={common:{diffuse:{value:new wn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ie},probesMax:{value:new ie},probesResolution:{value:new ie}},points:{diffuse:{value:new wn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new wn(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},us={basic:{uniforms:Wi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Wi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new wn(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Wi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new wn(0)},specular:{value:new wn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Wi([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new wn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Wi([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new wn(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Wi([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Wi([Ye.points,Ye.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Wi([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Wi([Ye.common,Ye.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Wi([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Wi([Ye.sprite,Ye.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:Wi([Ye.common,Ye.displacementmap,{referencePosition:{value:new ie},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:Wi([Ye.lights,Ye.fog,{color:{value:new wn(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};us.physical={uniforms:Wi([us.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new wn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new wn(0)},specularColor:{value:new wn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const gf={r:0,b:0,g:0},VA=new _i,bb=new Dt;bb.set(-1,0,0,0,1,0,0,0,1);function jA(r,e,i,s,l,c){const f=new wn(0);let h=l===!0?0:1,m,p,_=null,v=0,g=null;function E(N){let I=N.isScene===!0?N.background:null;if(I&&I.isTexture){const D=N.backgroundBlurriness>0;I=e.get(I,D)}return I}function T(N){let I=!1;const D=E(N);D===null?S(f,h):D&&D.isColor&&(S(D,1),I=!0);const V=r.xr.getEnvironmentBlendMode();V==="additive"?i.buffers.color.setClear(0,0,0,1,c):V==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(N,I){const D=E(I);D&&(D.isCubeTexture||D.mapping===Ff)?(p===void 0&&(p=new xs(new zc(1,1,1),new _s({name:"BackgroundCubeMaterial",uniforms:Rl(us.backgroundCube.uniforms),vertexShader:us.backgroundCube.vertexShader,fragmentShader:us.backgroundCube.fragmentShader,side:ia,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(V,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=D,p.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(VA.makeRotationFromEuler(I.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(bb),p.material.toneMapped=Qt.getTransfer(D.colorSpace)!==En,(_!==D||v!==D.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,_=D,v=D.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):D&&D.isTexture&&(m===void 0&&(m=new xs(new zf(2,2),new _s({name:"BackgroundMaterial",uniforms:Rl(us.background.uniforms),vertexShader:us.background.vertexShader,fragmentShader:us.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=D,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=Qt.getTransfer(D.colorSpace)!==En,D.matrixAutoUpdate===!0&&D.updateMatrix(),m.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||v!==D.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=D,v=D.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function S(N,I){N.getRGB(gf,gb(r)),i.buffers.color.setClear(gf.r,gf.g,gf.b,I,c)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,I=1){f.set(N),h=I,S(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,S(f,h)},render:T,addToRenderList:C,dispose:y}}function XA(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(k,W,he,oe,Y){let U=!1;const G=v(k,oe,he,W);c!==G&&(c=G,p(c.object)),U=E(k,oe,he,Y),U&&T(k,oe,he,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(U||f)&&(f=!1,D(k,W,he,oe),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function m(){return r.createVertexArray()}function p(k){return r.bindVertexArray(k)}function _(k){return r.deleteVertexArray(k)}function v(k,W,he,oe){const Y=oe.wireframe===!0;let U=s[W.id];U===void 0&&(U={},s[W.id]=U);const G=k.isInstancedMesh===!0?k.id:0;let ee=U[G];ee===void 0&&(ee={},U[G]=ee);let ge=ee[he.id];ge===void 0&&(ge={},ee[he.id]=ge);let Ae=ge[Y];return Ae===void 0&&(Ae=g(m()),ge[Y]=Ae),Ae}function g(k){const W=[],he=[],oe=[];for(let Y=0;Y<i;Y++)W[Y]=0,he[Y]=0,oe[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:he,attributeDivisors:oe,object:k,attributes:{},index:null}}function E(k,W,he,oe){const Y=c.attributes,U=W.attributes;let G=0;const ee=he.getAttributes();for(const ge in ee)if(ee[ge].location>=0){const P=Y[ge];let J=U[ge];if(J===void 0&&(ge==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),ge==="instanceColor"&&k.instanceColor&&(J=k.instanceColor)),P===void 0||P.attribute!==J||J&&P.data!==J.data)return!0;G++}return c.attributesNum!==G||c.index!==oe}function T(k,W,he,oe){const Y={},U=W.attributes;let G=0;const ee=he.getAttributes();for(const ge in ee)if(ee[ge].location>=0){let P=U[ge];P===void 0&&(ge==="instanceMatrix"&&k.instanceMatrix&&(P=k.instanceMatrix),ge==="instanceColor"&&k.instanceColor&&(P=k.instanceColor));const J={};J.attribute=P,P&&P.data&&(J.data=P.data),Y[ge]=J,G++}c.attributes=Y,c.attributesNum=G,c.index=oe}function C(){const k=c.newAttributes;for(let W=0,he=k.length;W<he;W++)k[W]=0}function S(k){y(k,0)}function y(k,W){const he=c.newAttributes,oe=c.enabledAttributes,Y=c.attributeDivisors;he[k]=1,oe[k]===0&&(r.enableVertexAttribArray(k),oe[k]=1),Y[k]!==W&&(r.vertexAttribDivisor(k,W),Y[k]=W)}function N(){const k=c.newAttributes,W=c.enabledAttributes;for(let he=0,oe=W.length;he<oe;he++)W[he]!==k[he]&&(r.disableVertexAttribArray(he),W[he]=0)}function I(k,W,he,oe,Y,U,G){G===!0?r.vertexAttribIPointer(k,W,he,Y,U):r.vertexAttribPointer(k,W,he,oe,Y,U)}function D(k,W,he,oe){C();const Y=oe.attributes,U=he.getAttributes(),G=W.defaultAttributeValues;for(const ee in U){const ge=U[ee];if(ge.location>=0){let Ae=Y[ee];if(Ae===void 0&&(ee==="instanceMatrix"&&k.instanceMatrix&&(Ae=k.instanceMatrix),ee==="instanceColor"&&k.instanceColor&&(Ae=k.instanceColor)),Ae!==void 0){const P=Ae.normalized,J=Ae.itemSize,ye=e.get(Ae);if(ye===void 0)continue;const Oe=ye.buffer,Fe=ye.type,ae=ye.bytesPerElement,Me=Fe===r.INT||Fe===r.UNSIGNED_INT||Ae.gpuType===vm;if(Ae.isInterleavedBufferAttribute){const Ee=Ae.data,We=Ee.stride,st=Ae.offset;if(Ee.isInstancedInterleavedBuffer){for(let ut=0;ut<ge.locationSize;ut++)y(ge.location+ut,Ee.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let ut=0;ut<ge.locationSize;ut++)S(ge.location+ut);r.bindBuffer(r.ARRAY_BUFFER,Oe);for(let ut=0;ut<ge.locationSize;ut++)I(ge.location+ut,J/ge.locationSize,Fe,P,We*ae,(st+J/ge.locationSize*ut)*ae,Me)}else{if(Ae.isInstancedBufferAttribute){for(let Ee=0;Ee<ge.locationSize;Ee++)y(ge.location+Ee,Ae.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let Ee=0;Ee<ge.locationSize;Ee++)S(ge.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,Oe);for(let Ee=0;Ee<ge.locationSize;Ee++)I(ge.location+Ee,J/ge.locationSize,Fe,P,J*ae,J/ge.locationSize*Ee*ae,Me)}}else if(G!==void 0){const P=G[ee];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ge.location,P);break;case 3:r.vertexAttrib3fv(ge.location,P);break;case 4:r.vertexAttrib4fv(ge.location,P);break;default:r.vertexAttrib1fv(ge.location,P)}}}}N()}function V(){F();for(const k in s){const W=s[k];for(const he in W){const oe=W[he];for(const Y in oe){const U=oe[Y];for(const G in U)_(U[G].object),delete U[G];delete oe[Y]}}delete s[k]}}function L(k){if(s[k.id]===void 0)return;const W=s[k.id];for(const he in W){const oe=W[he];for(const Y in oe){const U=oe[Y];for(const G in U)_(U[G].object),delete U[G];delete oe[Y]}}delete s[k.id]}function B(k){for(const W in s){const he=s[W];for(const oe in he){const Y=he[oe];if(Y[k.id]===void 0)continue;const U=Y[k.id];for(const G in U)_(U[G].object),delete U[G];delete Y[k.id]}}}function A(k){for(const W in s){const he=s[W],oe=k.isInstancedMesh===!0?k.id:0,Y=he[oe];if(Y!==void 0){for(const U in Y){const G=Y[U];for(const ee in G)_(G[ee].object),delete G[ee];delete Y[U]}delete he[oe],Object.keys(he).length===0&&delete s[W]}}}function F(){$(),f=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:$,dispose:V,releaseStatesOfGeometry:L,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:C,enableAttribute:S,disableUnusedAttributes:N}}function YA(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,_){_!==0&&(r.drawArraysInstanced(s,m,p,_),i.update(p,s,_))}function h(m,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,_);let g=0;for(let E=0;E<_;E++)g+=p[E];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function WA(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==Qa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const A=B===er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==Fa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==fs&&!A)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const _=m(p);_!==p&&(Et("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&Et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),D=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),V=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:E,maxVertexTextures:T,maxTextureSize:C,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:N,maxVaryings:I,maxFragmentUniforms:D,maxSamples:V,samples:L}}function qA(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new Ir,h=new Dt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const E=v.length!==0||g||s!==0||l;return l=g,s=v.length,E},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,E){const T=v.clippingPlanes,C=v.clipIntersection,S=v.clipShadows,y=r.get(v);if(!l||T===null||T.length===0||c&&!S)c?_(null):p();else{const N=c?0:s,I=N*4;let D=y.clippingState||null;m.value=D,D=_(T,g,I,E);for(let V=0;V!==I;++V)D[V]=i[V];y.clippingState=D,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(v,g,E,T){const C=v!==null?v.length:0;let S=null;if(C!==0){if(S=m.value,T!==!0||S===null){const y=E+C*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(S===null||S.length<y)&&(S=new Float32Array(y));for(let I=0,D=E;I!==C;++I,D+=4)f.copy(v[I]).applyMatrix4(N,h),f.normal.toArray(S,D),S[D+3]=f.constant}m.value=S,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,S}}const Pr=4,ov=[.125,.215,.35,.446,.526,.582],po=20,$A=256,Ac=new _b,lv=new wn;let mp=null,gp=0,xp=0,_p=!1;const KA=new ie;class cv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=KA}=c;mp=this._renderer.getRenderTarget(),gp=this._renderer.getActiveCubeFace(),xp=this._renderer.getActiveMipmapLevel(),_p=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(mp,gp,xp),this._renderer.xr.enabled=_p,e.scissorTest=!1,vl(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===_o||e.mapping===Al?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mp=this._renderer.getRenderTarget(),gp=this._renderer.getActiveCubeFace(),xp=this._renderer.getActiveMipmapLevel(),_p=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Gi,minFilter:Gi,generateMipmaps:!1,type:er,format:Qa,colorSpace:Lf,depthBuffer:!1},l=uv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ZA(c)),this._blurMaterial=JA(c,e,i),this._ggxMaterial=QA(c,e,i)}return l}_compileMaterial(e){const i=new xs(new vs,e);this._renderer.compile(i,Ac)}_sceneToCubeUV(e,i,s,l,c){const m=new Pa(90,1,i,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,E=v.toneMapping;v.getClearColor(lv),v.toneMapping=hs,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xs(new zc,new Cm({name:"PMREM.Background",side:ia,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,S=C.material;let y=!1;const N=e.background;N?N.isColor&&(S.color.copy(N),e.background=null,y=!0):(S.color.copy(lv),y=!0);for(let I=0;I<6;I++){const D=I%3;D===0?(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[I],c.y,c.z)):D===1?(m.up.set(0,0,p[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[I],c.z)):(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[I]));const V=this._cubeSize;vl(l,D*V,I>2?V:0,V,V),v.setRenderTarget(l),y&&v.render(C,m),v.render(e,m)}v.toneMapping=E,v.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===_o||e.mapping===Al;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=dv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;vl(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Ac)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(p*p-_*_),g=0+p*1.25,E=v*g,{_lodMax:T}=this,C=this._sizeLods[s],S=3*C*(s>T-Pr?s-T+Pr:0),y=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=E,m.mipInt.value=T-i,vl(c,S,y,3*C,2*C),l.setRenderTarget(c),l.render(h,Ac),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-s,vl(e,S,y,3*C,2*C),l.setRenderTarget(e),l.render(h,Ac)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&sn("blur direction must be either latitudinal or longitudinal!");const _=3,v=this._lodMeshes[l];v.material=p;const g=p.uniforms,E=this._sizeLods[s]-1,T=isFinite(c)?Math.PI/(2*E):2*Math.PI/(2*po-1),C=c/T,S=isFinite(c)?1+Math.floor(_*C):po;S>po&&Et(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${po}`);const y=[];let N=0;for(let B=0;B<po;++B){const A=B/C,F=Math.exp(-A*A/2);y.push(F),B===0?N+=F:B<S&&(N+=2*F)}for(let B=0;B<y.length;B++)y[B]=y[B]/N;g.envMap.value=e.texture,g.samples.value=S,g.weights.value=y,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:I}=this;g.dTheta.value=T,g.mipInt.value=I-s;const D=this._sizeLods[l],V=3*D*(l>I-Pr?l-I+Pr:0),L=4*(this._cubeSize-D);vl(i,V,L,3*D,2*D),m.setRenderTarget(i),m.render(v,Ac)}}function ZA(r){const e=[],i=[],s=[];let l=r;const c=r-Pr+1+ov.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-Pr?m=ov[f-r+Pr-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),_=-p,v=1+p,g=[_,_,v,_,v,v,_,_,v,v,_,v],E=6,T=6,C=3,S=2,y=1,N=new Float32Array(C*T*E),I=new Float32Array(S*T*E),D=new Float32Array(y*T*E);for(let L=0;L<E;L++){const B=L%3*2/3-1,A=L>2?0:-1,F=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];N.set(F,C*T*L),I.set(g,S*T*L);const $=[L,L,L,L,L,L];D.set($,y*T*L)}const V=new vs;V.setAttribute("position",new ms(N,C)),V.setAttribute("uv",new ms(I,S)),V.setAttribute("faceIndex",new ms(D,y)),s.push(new xs(V,null)),l>Pr&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function uv(r,e,i){const s=new ps(r,e,i);return s.texture.mapping=Ff,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function vl(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function QA(r,e,i){return new _s({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$A,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qs,depthTest:!1,depthWrite:!1})}function JA(r,e,i){const s=new Float32Array(po),l=new ie(0,1,0);return new _s({name:"SphericalGaussianBlur",defines:{n:po,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qs,depthTest:!1,depthWrite:!1})}function fv(){return new _s({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qs,depthTest:!1,depthWrite:!1})}function dv(){return new _s({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qs,depthTest:!1,depthWrite:!1})}function Gf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class yb extends ps{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new pb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new zc(5,5,5),c=new _s({name:"CubemapFromEquirect",uniforms:Rl(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ia,blending:Qs});c.uniforms.tEquirect.value=i;const f=new xs(l,c),h=i.minFilter;return i.minFilter===mo&&(i.minFilter=Gi),new aT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function ew(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,E=!1){return g==null?null:E?f(g):c(g)}function c(g){if(g&&g.isTexture){const E=g.mapping;if(E===Sf||E===Vh)if(e.has(g)){const T=e.get(g).texture;return h(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const C=new yb(T.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",p),h(C.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const E=g.mapping,T=E===Sf||E===Vh,C=E===_o||E===Al;if(T||C){let S=i.get(g);const y=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==y)return s===null&&(s=new cv(r)),S=T?s.fromEquirectangular(g,S):s.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),S.texture;if(S!==void 0)return S.texture;{const N=g.image;return T&&N&&N.height>0||C&&N&&m(N)?(s===null&&(s=new cv(r)),S=T?s.fromEquirectangular(g):s.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),g.addEventListener("dispose",_),S.texture):null}}}return g}function h(g,E){return E===Sf?g.mapping=_o:E===Vh&&(g.mapping=Al),g}function m(g){let E=0;const T=6;for(let C=0;C<T;C++)g[C]!==void 0&&E++;return E===T}function p(g){const E=g.target;E.removeEventListener("dispose",p);const T=e.get(E);T!==void 0&&(e.delete(E),T.dispose())}function _(g){const E=g.target;E.removeEventListener("dispose",_);const T=i.get(E);T!==void 0&&(i.delete(E),T.dispose())}function v(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function tw(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&fm("WebGLRenderer: "+s+" extension not supported."),l}}}function nw(r,e,i,s){const l={},c=new WeakMap;function f(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const T in g.attributes)e.remove(g.attributes[T]);g.removeEventListener("dispose",f),delete l[g.id];const E=c.get(g);E&&(e.remove(E),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const E in g)e.update(g[E],r.ARRAY_BUFFER)}function p(v){const g=[],E=v.index,T=v.attributes.position;let C=0;if(T===void 0)return;if(E!==null){const N=E.array;C=E.version;for(let I=0,D=N.length;I<D;I+=3){const V=N[I+0],L=N[I+1],B=N[I+2];g.push(V,L,L,B,B,V)}}else{const N=T.array;C=T.version;for(let I=0,D=N.length/3-1;I<D;I+=3){const V=I+0,L=I+1,B=I+2;g.push(V,L,L,B,B,V)}}const S=new(T.count>=65535?fb:ub)(g,1);S.version=C;const y=c.get(v);y&&e.remove(y),c.set(v,S)}function _(v){const g=c.get(v);if(g){const E=v.index;E!==null&&g.version<E.version&&p(v)}else p(v);return c.get(v)}return{get:h,update:m,getWireframeAttribute:_}}function iw(r,e,i){let s;function l(v){s=v}let c,f;function h(v){c=v.type,f=v.bytesPerElement}function m(v,g){r.drawElements(s,g,c,v*f),i.update(g,s,1)}function p(v,g,E){E!==0&&(r.drawElementsInstanced(s,g,c,v*f,E),i.update(g,s,E))}function _(v,g,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,v,0,E);let C=0;for(let S=0;S<E;S++)C+=g[S];i.update(C,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=_}function aw(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:sn("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function sw(r,e,i){const s=new WeakMap,l=new si;function c(f,h,m){const p=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=_!==void 0?_.length:0;let g=s.get(h);if(g===void 0||g.count!==v){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],y=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let I=0;E===!0&&(I=1),T===!0&&(I=2),C===!0&&(I=3);let D=h.attributes.position.count*I,V=1;D>e.maxTextureSize&&(V=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const L=new Float32Array(D*V*4*v),B=new ob(L,D,V,v);B.type=fs,B.needsUpdate=!0;const A=I*4;for(let $=0;$<v;$++){const k=S[$],W=y[$],he=N[$],oe=D*V*4*$;for(let Y=0;Y<k.count;Y++){const U=Y*A;E===!0&&(l.fromBufferAttribute(k,Y),L[oe+U+0]=l.x,L[oe+U+1]=l.y,L[oe+U+2]=l.z,L[oe+U+3]=0),T===!0&&(l.fromBufferAttribute(W,Y),L[oe+U+4]=l.x,L[oe+U+5]=l.y,L[oe+U+6]=l.z,L[oe+U+7]=0),C===!0&&(l.fromBufferAttribute(he,Y),L[oe+U+8]=l.x,L[oe+U+9]=l.y,L[oe+U+10]=l.z,L[oe+U+11]=he.itemSize===4?l.w:1)}}g={count:v,texture:B,size:new Ht(D,V)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let E=0;for(let C=0;C<p.length;C++)E+=p[C];const T=h.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function rw(r,e,i,s,l){let c=new WeakMap;function f(p){const _=l.render.frame,v=p.geometry,g=e.get(p,v);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==_&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const E=p.skeleton;c.get(E)!==_&&(E.update(),c.set(E,_))}return g}function h(){c=new WeakMap}function m(p){const _=p.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:h}}const ow={[Xv]:"LINEAR_TONE_MAPPING",[Yv]:"REINHARD_TONE_MAPPING",[Wv]:"CINEON_TONE_MAPPING",[qv]:"ACES_FILMIC_TONE_MAPPING",[Kv]:"AGX_TONE_MAPPING",[Zv]:"NEUTRAL_TONE_MAPPING",[$v]:"CUSTOM_TONE_MAPPING"};function lw(r,e,i,s,l){const c=new ps(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new wl(e,i):void 0}),f=new ps(e,i,{type:er,depthBuffer:!1,stencilBuffer:!1}),h=new vs;h.setAttribute("position",new Ba([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ba([0,2,0,0,2,0],2));const m=new ZM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new xs(h,m),_=new _b(-1,1,1,-1,0,1);let v=null,g=null,E=!1,T,C=null,S=[],y=!1;this.setSize=function(N,I){c.setSize(N,I),f.setSize(N,I);for(let D=0;D<S.length;D++){const V=S[D];V.setSize&&V.setSize(N,I)}},this.setEffects=function(N){S=N,y=S.length>0&&S[0].isRenderPass===!0;const I=c.width,D=c.height;for(let V=0;V<S.length;V++){const L=S[V];L.setSize&&L.setSize(I,D)}},this.begin=function(N,I){if(E||N.toneMapping===hs&&S.length===0)return!1;if(C=I,I!==null){const D=I.width,V=I.height;(c.width!==D||c.height!==V)&&this.setSize(D,V)}return y===!1&&N.setRenderTarget(c),T=N.toneMapping,N.toneMapping=hs,!0},this.hasRenderPass=function(){return y},this.end=function(N,I){N.toneMapping=T,E=!0;let D=c,V=f;for(let L=0;L<S.length;L++){const B=S[L];if(B.enabled!==!1&&(B.render(N,V,D,I),B.needsSwap!==!1)){const A=D;D=V,V=A}}if(v!==N.outputColorSpace||g!==N.toneMapping){v=N.outputColorSpace,g=N.toneMapping,m.defines={},Qt.getTransfer(v)===En&&(m.defines.SRGB_TRANSFER="");const L=ow[g];L&&(m.defines[L]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=D.texture,N.setRenderTarget(C),N.render(p,_),C=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const Eb=new Hi,hm=new wl(1,1),Sb=new ob,Mb=new RM,Tb=new pb,hv=[],pv=[],mv=new Float32Array(16),gv=new Float32Array(9),xv=new Float32Array(4);function Cl(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=hv[l];if(c===void 0&&(c=new Float32Array(l),hv[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function vi(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function bi(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Hf(r,e){let i=pv[e];i===void 0&&(i=new Int32Array(e),pv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function cw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function uw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vi(i,e))return;r.uniform2fv(this.addr,e),bi(i,e)}}function fw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(vi(i,e))return;r.uniform3fv(this.addr,e),bi(i,e)}}function dw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vi(i,e))return;r.uniform4fv(this.addr,e),bi(i,e)}}function hw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(vi(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),bi(i,e)}else{if(vi(i,s))return;xv.set(s),r.uniformMatrix2fv(this.addr,!1,xv),bi(i,s)}}function pw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(vi(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),bi(i,e)}else{if(vi(i,s))return;gv.set(s),r.uniformMatrix3fv(this.addr,!1,gv),bi(i,s)}}function mw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(vi(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),bi(i,e)}else{if(vi(i,s))return;mv.set(s),r.uniformMatrix4fv(this.addr,!1,mv),bi(i,s)}}function gw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function xw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vi(i,e))return;r.uniform2iv(this.addr,e),bi(i,e)}}function _w(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(vi(i,e))return;r.uniform3iv(this.addr,e),bi(i,e)}}function vw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vi(i,e))return;r.uniform4iv(this.addr,e),bi(i,e)}}function bw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function yw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vi(i,e))return;r.uniform2uiv(this.addr,e),bi(i,e)}}function Ew(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(vi(i,e))return;r.uniform3uiv(this.addr,e),bi(i,e)}}function Sw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vi(i,e))return;r.uniform4uiv(this.addr,e),bi(i,e)}}function Mw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(hm.compareFunction=i.isReversedDepthBuffer()?Am:Tm,c=hm):c=Eb,i.setTexture2D(e||c,l)}function Tw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Mb,l)}function Aw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||Tb,l)}function ww(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||Sb,l)}function Rw(r){switch(r){case 5126:return cw;case 35664:return uw;case 35665:return fw;case 35666:return dw;case 35674:return hw;case 35675:return pw;case 35676:return mw;case 5124:case 35670:return gw;case 35667:case 35671:return xw;case 35668:case 35672:return _w;case 35669:case 35673:return vw;case 5125:return bw;case 36294:return yw;case 36295:return Ew;case 36296:return Sw;case 35678:case 36198:case 36298:case 36306:case 35682:return Mw;case 35679:case 36299:case 36307:return Tw;case 35680:case 36300:case 36308:case 36293:return Aw;case 36289:case 36303:case 36311:case 36292:return ww}}function Cw(r,e){r.uniform1fv(this.addr,e)}function Nw(r,e){const i=Cl(e,this.size,2);r.uniform2fv(this.addr,i)}function Ow(r,e){const i=Cl(e,this.size,3);r.uniform3fv(this.addr,i)}function Dw(r,e){const i=Cl(e,this.size,4);r.uniform4fv(this.addr,i)}function Lw(r,e){const i=Cl(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function Iw(r,e){const i=Cl(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function Uw(r,e){const i=Cl(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function Pw(r,e){r.uniform1iv(this.addr,e)}function Fw(r,e){r.uniform2iv(this.addr,e)}function Bw(r,e){r.uniform3iv(this.addr,e)}function zw(r,e){r.uniform4iv(this.addr,e)}function Gw(r,e){r.uniform1uiv(this.addr,e)}function Hw(r,e){r.uniform2uiv(this.addr,e)}function kw(r,e){r.uniform3uiv(this.addr,e)}function Vw(r,e){r.uniform4uiv(this.addr,e)}function jw(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);vi(s,c)||(r.uniform1iv(this.addr,c),bi(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=hm:f=Eb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function Xw(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);vi(s,c)||(r.uniform1iv(this.addr,c),bi(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||Mb,c[f])}function Yw(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);vi(s,c)||(r.uniform1iv(this.addr,c),bi(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||Tb,c[f])}function Ww(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);vi(s,c)||(r.uniform1iv(this.addr,c),bi(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||Sb,c[f])}function qw(r){switch(r){case 5126:return Cw;case 35664:return Nw;case 35665:return Ow;case 35666:return Dw;case 35674:return Lw;case 35675:return Iw;case 35676:return Uw;case 5124:case 35670:return Pw;case 35667:case 35671:return Fw;case 35668:case 35672:return Bw;case 35669:case 35673:return zw;case 5125:return Gw;case 36294:return Hw;case 36295:return kw;case 36296:return Vw;case 35678:case 36198:case 36298:case 36306:case 35682:return jw;case 35679:case 36299:case 36307:return Xw;case 35680:case 36300:case 36308:case 36293:return Yw;case 36289:case 36303:case 36311:case 36292:return Ww}}class $w{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Rw(i.type)}}class Kw{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=qw(i.type)}}class Zw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const vp=/(\w+)(\])?(\[|\.)?/g;function _v(r,e){r.seq.push(e),r.map[e.id]=e}function Qw(r,e,i){const s=r.name,l=s.length;for(vp.lastIndex=0;;){const c=vp.exec(s),f=vp.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){_v(i,p===void 0?new $w(h,r,e):new Kw(h,r,e));break}else{let v=i.map[h];v===void 0&&(v=new Zw(h),_v(i,v)),i=v}}}class Cf{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);Qw(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function vv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const Jw=37297;let eR=0;function tR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const bv=new Dt;function nR(r){Qt._getMatrix(bv,Qt.workingColorSpace,r);const e=`mat3( ${bv.elements.map(i=>i.toFixed(4))} )`;switch(Qt.getTransfer(r)){case If:return[e,"LinearTransferOETF"];case En:return[e,"sRGBTransferOETF"];default:return Et("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function yv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+tR(r.getShaderSource(e),h)}else return c}function iR(r,e){const i=nR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const aR={[Xv]:"Linear",[Yv]:"Reinhard",[Wv]:"Cineon",[qv]:"ACESFilmic",[Kv]:"AgX",[Zv]:"Neutral",[$v]:"Custom"};function sR(r,e){const i=aR[e];return i===void 0?(Et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const xf=new ie;function rR(){Qt.getLuminanceCoefficients(xf);const r=xf.x.toFixed(4),e=xf.y.toFixed(4),i=xf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cc).join(`
`)}function lR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function cR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function Cc(r){return r!==""}function Ev(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sv(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uR=/^[ \t]*#include +<([\w\d./]+)>/gm;function pm(r){return r.replace(uR,dR)}const fR=new Map;function dR(r,e){let i=Gt[e];if(i===void 0){const s=fR.get(e);if(s!==void 0)i=Gt[s],Et('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return pm(i)}const hR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mv(r){return r.replace(hR,pR)}function pR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Tv(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const mR={[Ef]:"SHADOWMAP_TYPE_PCF",[Rc]:"SHADOWMAP_TYPE_VSM"};function gR(r){return mR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const xR={[_o]:"ENVMAP_TYPE_CUBE",[Al]:"ENVMAP_TYPE_CUBE",[Ff]:"ENVMAP_TYPE_CUBE_UV"};function _R(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":xR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const vR={[Al]:"ENVMAP_MODE_REFRACTION"};function bR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":vR[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const yR={[jv]:"ENVMAP_BLENDING_MULTIPLY",[rM]:"ENVMAP_BLENDING_MIX",[oM]:"ENVMAP_BLENDING_ADD"};function ER(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":yR[r.combine]||"ENVMAP_BLENDING_NONE"}function SR(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function MR(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=gR(i),p=_R(i),_=bR(i),v=ER(i),g=SR(i),E=oR(i),T=lR(c),C=l.createProgram();let S,y,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Cc).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Cc).join(`
`),y.length>0&&(y+=`
`)):(S=[Tv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cc).join(`
`),y=[Tv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==hs?"#define TONE_MAPPING":"",i.toneMapping!==hs?Gt.tonemapping_pars_fragment:"",i.toneMapping!==hs?sR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,iR("linearToOutputTexel",i.outputColorSpace),rR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Cc).join(`
`)),f=pm(f),f=Ev(f,i),f=Sv(f,i),h=pm(h),h=Ev(h,i),h=Sv(h,i),f=Mv(f),h=Mv(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,S=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",i.glslVersion===F_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===F_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const I=N+S+f,D=N+y+h,V=vv(l,l.VERTEX_SHADER,I),L=vv(l,l.FRAGMENT_SHADER,D);l.attachShader(C,V),l.attachShader(C,L),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function B(k){if(r.debug.checkShaderErrors){const W=l.getProgramInfoLog(C)||"",he=l.getShaderInfoLog(V)||"",oe=l.getShaderInfoLog(L)||"",Y=W.trim(),U=he.trim(),G=oe.trim();let ee=!0,ge=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(ee=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,V,L);else{const Ae=yv(l,V,"vertex"),P=yv(l,L,"fragment");sn("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+Y+`
`+Ae+`
`+P)}else Y!==""?Et("WebGLProgram: Program Info Log:",Y):(U===""||G==="")&&(ge=!1);ge&&(k.diagnostics={runnable:ee,programLog:Y,vertexShader:{log:U,prefix:S},fragmentShader:{log:G,prefix:y}})}l.deleteShader(V),l.deleteShader(L),A=new Cf(l,C),F=cR(l,C)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let $=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return $===!1&&($=l.getProgramParameter(C,Jw)),$},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=eR++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=V,this.fragmentShader=L,this}let TR=0;class AR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new wR(e),i.set(e,s)),s}}class wR{constructor(e){this.id=TR++,this.code=e,this.usedTimes=0}}function RR(r){return r===vo||r===Of||r===Df}function CR(r,e,i,s,l,c){const f=new lb,h=new AR,m=new Set,p=[],_=new Map,v=s.logarithmicDepthBuffer;let g=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(A){return m.add(A),A===0?"uv":`uv${A}`}function C(A,F,$,k,W,he){const oe=k.fog,Y=W.geometry,U=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?k.environment:null,G=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,ee=e.get(A.envMap||U,G),ge=ee&&ee.mapping===Ff?ee.image.height:null,Ae=E[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&Et("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const P=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,J=P!==void 0?P.length:0;let ye=0;Y.morphAttributes.position!==void 0&&(ye=1),Y.morphAttributes.normal!==void 0&&(ye=2),Y.morphAttributes.color!==void 0&&(ye=3);let Oe,Fe,ae,Me;if(Ae){const gt=us[Ae];Oe=gt.vertexShader,Fe=gt.fragmentShader}else Oe=A.vertexShader,Fe=A.fragmentShader,h.update(A),ae=h.getVertexShaderID(A),Me=h.getFragmentShaderID(A);const Ee=r.getRenderTarget(),We=r.state.buffers.depth.getReversed(),st=W.isInstancedMesh===!0,ut=W.isBatchedMesh===!0,kt=!!A.map,Lt=!!A.matcap,Xt=!!ee,rn=!!A.aoMap,Rt=!!A.lightMap,on=!!A.bumpMap,vn=!!A.normalMap,Vt=!!A.displacementMap,X=!!A.emissiveMap,Jt=!!A.metalnessMap,Ut=!!A.roughnessMap,dn=A.anisotropy>0,Ie=A.clearcoat>0,In=A.dispersion>0,O=A.iridescence>0,M=A.sheen>0,Q=A.transmission>0,pe=dn&&!!A.anisotropyMap,Te=Ie&&!!A.clearcoatMap,Ue=Ie&&!!A.clearcoatNormalMap,ze=Ie&&!!A.clearcoatRoughnessMap,ue=O&&!!A.iridescenceMap,me=O&&!!A.iridescenceThicknessMap,Re=M&&!!A.sheenColorMap,Ge=M&&!!A.sheenRoughnessMap,Be=!!A.specularMap,Ne=!!A.specularColorMap,vt=!!A.specularIntensityMap,lt=Q&&!!A.transmissionMap,Bt=Q&&!!A.thicknessMap,H=!!A.gradientMap,De=!!A.alphaMap,fe=A.alphaTest>0,Xe=!!A.alphaHash,Le=!!A.extensions;let we=hs;A.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(we=r.toneMapping);const qe={shaderID:Ae,shaderType:A.type,shaderName:A.name,vertexShader:Oe,fragmentShader:Fe,defines:A.defines,customVertexShaderID:ae,customFragmentShaderID:Me,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:ut,batchingColor:ut&&W._colorsTexture!==null,instancing:st,instancingColor:st&&W.instanceColor!==null,instancingMorph:st&&W.morphTexture!==null,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:kt,matcap:Lt,envMap:Xt,envMapMode:Xt&&ee.mapping,envMapCubeUVHeight:ge,aoMap:rn,lightMap:Rt,bumpMap:on,normalMap:vn,displacementMap:Vt,emissiveMap:X,normalMapObjectSpace:vn&&A.normalMapType===uM,normalMapTangentSpace:vn&&A.normalMapType===I_,packedNormalMap:vn&&A.normalMapType===I_&&RR(A.normalMap.format),metalnessMap:Jt,roughnessMap:Ut,anisotropy:dn,anisotropyMap:pe,clearcoat:Ie,clearcoatMap:Te,clearcoatNormalMap:Ue,clearcoatRoughnessMap:ze,dispersion:In,iridescence:O,iridescenceMap:ue,iridescenceThicknessMap:me,sheen:M,sheenColorMap:Re,sheenRoughnessMap:Ge,specularMap:Be,specularColorMap:Ne,specularIntensityMap:vt,transmission:Q,transmissionMap:lt,thicknessMap:Bt,gradientMap:H,opaque:A.transparent===!1&&A.blending===El&&A.alphaToCoverage===!1,alphaMap:De,alphaTest:fe,alphaHash:Xe,combine:A.combine,mapUv:kt&&T(A.map.channel),aoMapUv:rn&&T(A.aoMap.channel),lightMapUv:Rt&&T(A.lightMap.channel),bumpMapUv:on&&T(A.bumpMap.channel),normalMapUv:vn&&T(A.normalMap.channel),displacementMapUv:Vt&&T(A.displacementMap.channel),emissiveMapUv:X&&T(A.emissiveMap.channel),metalnessMapUv:Jt&&T(A.metalnessMap.channel),roughnessMapUv:Ut&&T(A.roughnessMap.channel),anisotropyMapUv:pe&&T(A.anisotropyMap.channel),clearcoatMapUv:Te&&T(A.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&T(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&T(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&T(A.iridescenceMap.channel),iridescenceThicknessMapUv:me&&T(A.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&T(A.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&T(A.sheenRoughnessMap.channel),specularMapUv:Be&&T(A.specularMap.channel),specularColorMapUv:Ne&&T(A.specularColorMap.channel),specularIntensityMapUv:vt&&T(A.specularIntensityMap.channel),transmissionMapUv:lt&&T(A.transmissionMap.channel),thicknessMapUv:Bt&&T(A.thicknessMap.channel),alphaMapUv:De&&T(A.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(vn||dn),vertexNormals:!!Y.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!Y.attributes.uv&&(kt||De),fog:!!oe,useFog:A.fog===!0,fogExp2:!!oe&&oe.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||Y.attributes.normal===void 0&&vn===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:We,skinning:W.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ye,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:he.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&$.length>0,shadowMapType:r.shadowMap.type,toneMapping:we,decodeVideoTexture:kt&&A.map.isVideoTexture===!0&&Qt.getTransfer(A.map.colorSpace)===En,decodeVideoTextureEmissive:X&&A.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(A.emissiveMap.colorSpace)===En,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Ks,flipSided:A.side===ia,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Le&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&A.extensions.multiDraw===!0||ut)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return qe.vertexUv1s=m.has(1),qe.vertexUv2s=m.has(2),qe.vertexUv3s=m.has(3),m.clear(),qe}function S(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const $ in A.defines)F.push($),F.push(A.defines[$]);return A.isRawShaderMaterial===!1&&(y(F,A),N(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function y(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function N(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function I(A){const F=E[A.type];let $;if(F){const k=us[F];$=qM.clone(k.uniforms)}else $=A.uniforms;return $}function D(A,F){let $=_.get(F);return $!==void 0?++$.usedTimes:($=new MR(r,F,A,l),p.push($),_.set(F,$)),$}function V(A){if(--A.usedTimes===0){const F=p.indexOf(A);p[F]=p[p.length-1],p.pop(),_.delete(A.cacheKey),A.destroy()}}function L(A){h.remove(A)}function B(){h.dispose()}return{getParameters:C,getProgramCacheKey:S,getUniforms:I,acquireProgram:D,releaseProgram:V,releaseShaderCache:L,programs:p,dispose:B}}function NR(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function OR(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Av(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function wv(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let E=0;return g.isInstancedMesh&&(E+=2),g.isSkinnedMesh&&(E+=1),E}function h(g,E,T,C,S,y){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:E,material:T,materialVariant:f(g),groupOrder:C,renderOrder:g.renderOrder,z:S,group:y},r[e]=N):(N.id=g.id,N.object=g,N.geometry=E,N.material=T,N.materialVariant=f(g),N.groupOrder=C,N.renderOrder=g.renderOrder,N.z=S,N.group=y),e++,N}function m(g,E,T,C,S,y){const N=h(g,E,T,C,S,y);T.transmission>0?s.push(N):T.transparent===!0?l.push(N):i.push(N)}function p(g,E,T,C,S,y){const N=h(g,E,T,C,S,y);T.transmission>0?s.unshift(N):T.transparent===!0?l.unshift(N):i.unshift(N)}function _(g,E){i.length>1&&i.sort(g||OR),s.length>1&&s.sort(E||Av),l.length>1&&l.sort(E||Av)}function v(){for(let g=e,E=r.length;g<E;g++){const T=r[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:v,sort:_}}function DR(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new wv,r.set(s,[f])):l>=c.length?(f=new wv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function LR(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ie,color:new wn};break;case"SpotLight":i={position:new ie,direction:new ie,color:new wn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ie,color:new wn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ie,skyColor:new wn,groundColor:new wn};break;case"RectAreaLight":i={color:new wn,position:new ie,halfWidth:new ie,halfHeight:new ie};break}return r[e.id]=i,i}}}function IR(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let UR=0;function PR(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function FR(r){const e=new LR,i=IR(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ie);const l=new ie,c=new _i,f=new _i;function h(p){let _=0,v=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let E=0,T=0,C=0,S=0,y=0,N=0,I=0,D=0,V=0,L=0,B=0;p.sort(PR);for(let F=0,$=p.length;F<$;F++){const k=p[F],W=k.color,he=k.intensity,oe=k.distance;let Y=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===vo?Y=k.shadow.map.texture:Y=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)_+=W.r*he,v+=W.g*he,g+=W.b*he;else if(k.isLightProbe){for(let U=0;U<9;U++)s.probe[U].addScaledVector(k.sh.coefficients[U],he);B++}else if(k.isDirectionalLight){const U=e.get(k);if(U.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.directionalShadow[E]=ee,s.directionalShadowMap[E]=Y,s.directionalShadowMatrix[E]=k.shadow.matrix,N++}s.directional[E]=U,E++}else if(k.isSpotLight){const U=e.get(k);U.position.setFromMatrixPosition(k.matrixWorld),U.color.copy(W).multiplyScalar(he),U.distance=oe,U.coneCos=Math.cos(k.angle),U.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),U.decay=k.decay,s.spot[C]=U;const G=k.shadow;if(k.map&&(s.spotLightMap[V]=k.map,V++,G.updateMatrices(k),k.castShadow&&L++),s.spotLightMatrix[C]=G.matrix,k.castShadow){const ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.spotShadow[C]=ee,s.spotShadowMap[C]=Y,D++}C++}else if(k.isRectAreaLight){const U=e.get(k);U.color.copy(W).multiplyScalar(he),U.halfWidth.set(k.width*.5,0,0),U.halfHeight.set(0,k.height*.5,0),s.rectArea[S]=U,S++}else if(k.isPointLight){const U=e.get(k);if(U.color.copy(k.color).multiplyScalar(k.intensity),U.distance=k.distance,U.decay=k.decay,k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,ee.shadowCameraNear=G.camera.near,ee.shadowCameraFar=G.camera.far,s.pointShadow[T]=ee,s.pointShadowMap[T]=Y,s.pointShadowMatrix[T]=k.shadow.matrix,I++}s.point[T]=U,T++}else if(k.isHemisphereLight){const U=e.get(k);U.skyColor.copy(k.color).multiplyScalar(he),U.groundColor.copy(k.groundColor).multiplyScalar(he),s.hemi[y]=U,y++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ye.LTC_FLOAT_1,s.rectAreaLTC2=Ye.LTC_FLOAT_2):(s.rectAreaLTC1=Ye.LTC_HALF_1,s.rectAreaLTC2=Ye.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=v,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==E||A.pointLength!==T||A.spotLength!==C||A.rectAreaLength!==S||A.hemiLength!==y||A.numDirectionalShadows!==N||A.numPointShadows!==I||A.numSpotShadows!==D||A.numSpotMaps!==V||A.numLightProbes!==B)&&(s.directional.length=E,s.spot.length=C,s.rectArea.length=S,s.point.length=T,s.hemi.length=y,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=D,s.spotShadowMap.length=D,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=D+V-L,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=B,A.directionalLength=E,A.pointLength=T,A.spotLength=C,A.rectAreaLength=S,A.hemiLength=y,A.numDirectionalShadows=N,A.numPointShadows=I,A.numSpotShadows=D,A.numSpotMaps=V,A.numLightProbes=B,s.version=UR++)}function m(p,_){let v=0,g=0,E=0,T=0,C=0;const S=_.matrixWorldInverse;for(let y=0,N=p.length;y<N;y++){const I=p[y];if(I.isDirectionalLight){const D=s.directional[v];D.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(S),v++}else if(I.isSpotLight){const D=s.spot[E];D.position.setFromMatrixPosition(I.matrixWorld),D.position.applyMatrix4(S),D.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(S),E++}else if(I.isRectAreaLight){const D=s.rectArea[T];D.position.setFromMatrixPosition(I.matrixWorld),D.position.applyMatrix4(S),f.identity(),c.copy(I.matrixWorld),c.premultiply(S),f.extractRotation(c),D.halfWidth.set(I.width*.5,0,0),D.halfHeight.set(0,I.height*.5,0),D.halfWidth.applyMatrix4(f),D.halfHeight.applyMatrix4(f),T++}else if(I.isPointLight){const D=s.point[g];D.position.setFromMatrixPosition(I.matrixWorld),D.position.applyMatrix4(S),g++}else if(I.isHemisphereLight){const D=s.hemi[C];D.direction.setFromMatrixPosition(I.matrixWorld),D.direction.transformDirection(S),C++}}}return{setup:h,setupView:m,state:s}}function Rv(r){const e=new FR(r),i=[],s=[],l=[];function c(g){v.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function _(g){e.setupView(i,g)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:p,setupLightsView:_,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function BR(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new Rv(r),e.set(l,[h])):c>=f.length?(h=new Rv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const zR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,HR=[new ie(1,0,0),new ie(-1,0,0),new ie(0,1,0),new ie(0,-1,0),new ie(0,0,1),new ie(0,0,-1)],kR=[new ie(0,-1,0),new ie(0,-1,0),new ie(0,0,1),new ie(0,0,-1),new ie(0,-1,0),new ie(0,-1,0)],Cv=new _i,wc=new ie,bp=new ie;function VR(r,e,i){let s=new hb;const l=new Ht,c=new Ht,f=new si,h=new QM,m=new JM,p={},_=i.maxTextureSize,v={[Br]:ia,[ia]:Br,[Ks]:Ks},g=new _s({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:zR,fragmentShader:GR}),E=g.clone();E.defines.HORIZONTAL_PASS=1;const T=new vs;T.setAttribute("position",new ms(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new xs(T,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ef;let y=this.type;this.render=function(L,B,A){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||L.length===0)return;this.type===HS&&(Et("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ef);const F=r.getRenderTarget(),$=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),W=r.state;W.setBlending(Qs),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const he=y!==this.type;he&&B.traverse(function(oe){oe.material&&(Array.isArray(oe.material)?oe.material.forEach(Y=>Y.needsUpdate=!0):oe.material.needsUpdate=!0)});for(let oe=0,Y=L.length;oe<Y;oe++){const U=L[oe],G=U.shadow;if(G===void 0){Et("WebGLShadowMap:",U,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ee=G.getFrameExtents();l.multiply(ee),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ee.x),l.x=c.x*ee.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ee.y),l.y=c.y*ee.y,G.mapSize.y=c.y));const ge=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ge,G.map===null||he===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Rc){if(U.isPointLight){Et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new ps(l.x,l.y,{format:vo,type:er,minFilter:Gi,magFilter:Gi,generateMipmaps:!1}),G.map.texture.name=U.name+".shadowMap",G.map.depthTexture=new wl(l.x,l.y,fs),G.map.depthTexture.name=U.name+".shadowMapDepth",G.map.depthTexture.format=tr,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Di,G.map.depthTexture.magFilter=Di}else U.isPointLight?(G.map=new yb(l.x),G.map.depthTexture=new YM(l.x,gs)):(G.map=new ps(l.x,l.y),G.map.depthTexture=new wl(l.x,l.y,gs)),G.map.depthTexture.name=U.name+".shadowMap",G.map.depthTexture.format=tr,this.type===Ef?(G.map.depthTexture.compareFunction=ge?Am:Tm,G.map.depthTexture.minFilter=Gi,G.map.depthTexture.magFilter=Gi):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Di,G.map.depthTexture.magFilter=Di);G.camera.updateProjectionMatrix()}const Ae=G.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Ae;P++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,P),r.clear();else{P===0&&(r.setRenderTarget(G.map),r.clear());const J=G.getViewport(P);f.set(c.x*J.x,c.y*J.y,c.x*J.z,c.y*J.w),W.viewport(f)}if(U.isPointLight){const J=G.camera,ye=G.matrix,Oe=U.distance||J.far;Oe!==J.far&&(J.far=Oe,J.updateProjectionMatrix()),wc.setFromMatrixPosition(U.matrixWorld),J.position.copy(wc),bp.copy(J.position),bp.add(HR[P]),J.up.copy(kR[P]),J.lookAt(bp),J.updateMatrixWorld(),ye.makeTranslation(-wc.x,-wc.y,-wc.z),Cv.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Cv,J.coordinateSystem,J.reversedDepth)}else G.updateMatrices(U);s=G.getFrustum(),D(B,A,G.camera,U,this.type)}G.isPointLightShadow!==!0&&this.type===Rc&&N(G,A),G.needsUpdate=!1}y=this.type,S.needsUpdate=!1,r.setRenderTarget(F,$,k)};function N(L,B){const A=e.update(C);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,E.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,E.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new ps(l.x,l.y,{format:vo,type:er})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(B,null,A,g,C,null),E.uniforms.shadow_pass.value=L.mapPass.texture,E.uniforms.resolution.value=L.mapSize,E.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(B,null,A,E,C,null)}function I(L,B,A,F){let $=null;const k=A.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(k!==void 0)$=k;else if($=A.isPointLight===!0?m:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const W=$.uuid,he=B.uuid;let oe=p[W];oe===void 0&&(oe={},p[W]=oe);let Y=oe[he];Y===void 0&&(Y=$.clone(),oe[he]=Y,B.addEventListener("dispose",V)),$=Y}if($.visible=B.visible,$.wireframe=B.wireframe,F===Rc?$.side=B.shadowSide!==null?B.shadowSide:B.side:$.side=B.shadowSide!==null?B.shadowSide:v[B.side],$.alphaMap=B.alphaMap,$.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,$.map=B.map,$.clipShadows=B.clipShadows,$.clippingPlanes=B.clippingPlanes,$.clipIntersection=B.clipIntersection,$.displacementMap=B.displacementMap,$.displacementScale=B.displacementScale,$.displacementBias=B.displacementBias,$.wireframeLinewidth=B.wireframeLinewidth,$.linewidth=B.linewidth,A.isPointLight===!0&&$.isMeshDistanceMaterial===!0){const W=r.properties.get($);W.light=A}return $}function D(L,B,A,F,$){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&$===Rc)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,L.matrixWorld);const he=e.update(L),oe=L.material;if(Array.isArray(oe)){const Y=he.groups;for(let U=0,G=Y.length;U<G;U++){const ee=Y[U],ge=oe[ee.materialIndex];if(ge&&ge.visible){const Ae=I(L,ge,F,$);L.onBeforeShadow(r,L,B,A,he,Ae,ee),r.renderBufferDirect(A,null,he,Ae,L,ee),L.onAfterShadow(r,L,B,A,he,Ae,ee)}}}else if(oe.visible){const Y=I(L,oe,F,$);L.onBeforeShadow(r,L,B,A,he,Y,null),r.renderBufferDirect(A,null,he,Y,L,null),L.onAfterShadow(r,L,B,A,he,Y,null)}}const W=L.children;for(let he=0,oe=W.length;he<oe;he++)D(W[he],B,A,F,$)}function V(L){L.target.removeEventListener("dispose",V);for(const A in p){const F=p[A],$=L.target.uuid;$ in F&&(F[$].dispose(),delete F[$])}}}function jR(r,e){function i(){let H=!1;const De=new si;let fe=null;const Xe=new si(0,0,0,0);return{setMask:function(Le){fe!==Le&&!H&&(r.colorMask(Le,Le,Le,Le),fe=Le)},setLocked:function(Le){H=Le},setClear:function(Le,we,qe,gt,Un){Un===!0&&(Le*=gt,we*=gt,qe*=gt),De.set(Le,we,qe,gt),Xe.equals(De)===!1&&(r.clearColor(Le,we,qe,gt),Xe.copy(De))},reset:function(){H=!1,fe=null,Xe.set(-1,0,0,0)}}}function s(){let H=!1,De=!1,fe=null,Xe=null,Le=null;return{setReversed:function(we){if(De!==we){const qe=e.get("EXT_clip_control");we?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),De=we;const gt=Le;Le=null,this.setClear(gt)}},getReversed:function(){return De},setTest:function(we){we?Ee(r.DEPTH_TEST):We(r.DEPTH_TEST)},setMask:function(we){fe!==we&&!H&&(r.depthMask(we),fe=we)},setFunc:function(we){if(De&&(we=bM[we]),Xe!==we){switch(we){case Ap:r.depthFunc(r.NEVER);break;case wp:r.depthFunc(r.ALWAYS);break;case Rp:r.depthFunc(r.LESS);break;case Tl:r.depthFunc(r.LEQUAL);break;case Cp:r.depthFunc(r.EQUAL);break;case Np:r.depthFunc(r.GEQUAL);break;case Op:r.depthFunc(r.GREATER);break;case Dp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Xe=we}},setLocked:function(we){H=we},setClear:function(we){Le!==we&&(Le=we,De&&(we=1-we),r.clearDepth(we))},reset:function(){H=!1,fe=null,Xe=null,Le=null,De=!1}}}function l(){let H=!1,De=null,fe=null,Xe=null,Le=null,we=null,qe=null,gt=null,Un=null;return{setTest:function(en){H||(en?Ee(r.STENCIL_TEST):We(r.STENCIL_TEST))},setMask:function(en){De!==en&&!H&&(r.stencilMask(en),De=en)},setFunc:function(en,Wn,Li){(fe!==en||Xe!==Wn||Le!==Li)&&(r.stencilFunc(en,Wn,Li),fe=en,Xe=Wn,Le=Li)},setOp:function(en,Wn,Li){(we!==en||qe!==Wn||gt!==Li)&&(r.stencilOp(en,Wn,Li),we=en,qe=Wn,gt=Li)},setLocked:function(en){H=en},setClear:function(en){Un!==en&&(r.clearStencil(en),Un=en)},reset:function(){H=!1,De=null,fe=null,Xe=null,Le=null,we=null,qe=null,gt=null,Un=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let _={},v={},g={},E=new WeakMap,T=[],C=null,S=!1,y=null,N=null,I=null,D=null,V=null,L=null,B=null,A=new wn(0,0,0),F=0,$=!1,k=null,W=null,he=null,oe=null,Y=null;const U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ee=0;const ge=r.getParameter(r.VERSION);ge.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ge)[1]),G=ee>=1):ge.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),G=ee>=2);let Ae=null,P={};const J=r.getParameter(r.SCISSOR_BOX),ye=r.getParameter(r.VIEWPORT),Oe=new si().fromArray(J),Fe=new si().fromArray(ye);function ae(H,De,fe,Xe){const Le=new Uint8Array(4),we=r.createTexture();r.bindTexture(H,we),r.texParameteri(H,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(H,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qe=0;qe<fe;qe++)H===r.TEXTURE_3D||H===r.TEXTURE_2D_ARRAY?r.texImage3D(De,0,r.RGBA,1,1,Xe,0,r.RGBA,r.UNSIGNED_BYTE,Le):r.texImage2D(De+qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Le);return we}const Me={};Me[r.TEXTURE_2D]=ae(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=ae(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=ae(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=ae(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Ee(r.DEPTH_TEST),f.setFunc(Tl),on(!1),vn(N_),Ee(r.CULL_FACE),rn(Qs);function Ee(H){_[H]!==!0&&(r.enable(H),_[H]=!0)}function We(H){_[H]!==!1&&(r.disable(H),_[H]=!1)}function st(H,De){return g[H]!==De?(r.bindFramebuffer(H,De),g[H]=De,H===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=De),H===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=De),!0):!1}function ut(H,De){let fe=T,Xe=!1;if(H){fe=E.get(De),fe===void 0&&(fe=[],E.set(De,fe));const Le=H.textures;if(fe.length!==Le.length||fe[0]!==r.COLOR_ATTACHMENT0){for(let we=0,qe=Le.length;we<qe;we++)fe[we]=r.COLOR_ATTACHMENT0+we;fe.length=Le.length,Xe=!0}}else fe[0]!==r.BACK&&(fe[0]=r.BACK,Xe=!0);Xe&&r.drawBuffers(fe)}function kt(H){return C!==H?(r.useProgram(H),C=H,!0):!1}const Lt={[ho]:r.FUNC_ADD,[VS]:r.FUNC_SUBTRACT,[jS]:r.FUNC_REVERSE_SUBTRACT};Lt[XS]=r.MIN,Lt[YS]=r.MAX;const Xt={[WS]:r.ZERO,[qS]:r.ONE,[$S]:r.SRC_COLOR,[Mp]:r.SRC_ALPHA,[tM]:r.SRC_ALPHA_SATURATE,[JS]:r.DST_COLOR,[ZS]:r.DST_ALPHA,[KS]:r.ONE_MINUS_SRC_COLOR,[Tp]:r.ONE_MINUS_SRC_ALPHA,[eM]:r.ONE_MINUS_DST_COLOR,[QS]:r.ONE_MINUS_DST_ALPHA,[nM]:r.CONSTANT_COLOR,[iM]:r.ONE_MINUS_CONSTANT_COLOR,[aM]:r.CONSTANT_ALPHA,[sM]:r.ONE_MINUS_CONSTANT_ALPHA};function rn(H,De,fe,Xe,Le,we,qe,gt,Un,en){if(H===Qs){S===!0&&(We(r.BLEND),S=!1);return}if(S===!1&&(Ee(r.BLEND),S=!0),H!==kS){if(H!==y||en!==$){if((N!==ho||V!==ho)&&(r.blendEquation(r.FUNC_ADD),N=ho,V=ho),en)switch(H){case El:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case O_:r.blendFunc(r.ONE,r.ONE);break;case D_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case L_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:sn("WebGLState: Invalid blending: ",H);break}else switch(H){case El:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case O_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case D_:sn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case L_:sn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:sn("WebGLState: Invalid blending: ",H);break}I=null,D=null,L=null,B=null,A.set(0,0,0),F=0,y=H,$=en}return}Le=Le||De,we=we||fe,qe=qe||Xe,(De!==N||Le!==V)&&(r.blendEquationSeparate(Lt[De],Lt[Le]),N=De,V=Le),(fe!==I||Xe!==D||we!==L||qe!==B)&&(r.blendFuncSeparate(Xt[fe],Xt[Xe],Xt[we],Xt[qe]),I=fe,D=Xe,L=we,B=qe),(gt.equals(A)===!1||Un!==F)&&(r.blendColor(gt.r,gt.g,gt.b,Un),A.copy(gt),F=Un),y=H,$=!1}function Rt(H,De){H.side===Ks?We(r.CULL_FACE):Ee(r.CULL_FACE);let fe=H.side===ia;De&&(fe=!fe),on(fe),H.blending===El&&H.transparent===!1?rn(Qs):rn(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),f.setFunc(H.depthFunc),f.setTest(H.depthTest),f.setMask(H.depthWrite),c.setMask(H.colorWrite);const Xe=H.stencilWrite;h.setTest(Xe),Xe&&(h.setMask(H.stencilWriteMask),h.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),h.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),X(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Ee(r.SAMPLE_ALPHA_TO_COVERAGE):We(r.SAMPLE_ALPHA_TO_COVERAGE)}function on(H){k!==H&&(H?r.frontFace(r.CW):r.frontFace(r.CCW),k=H)}function vn(H){H!==zS?(Ee(r.CULL_FACE),H!==W&&(H===N_?r.cullFace(r.BACK):H===GS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):We(r.CULL_FACE),W=H}function Vt(H){H!==he&&(G&&r.lineWidth(H),he=H)}function X(H,De,fe){H?(Ee(r.POLYGON_OFFSET_FILL),(oe!==De||Y!==fe)&&(oe=De,Y=fe,f.getReversed()&&(De=-De),r.polygonOffset(De,fe))):We(r.POLYGON_OFFSET_FILL)}function Jt(H){H?Ee(r.SCISSOR_TEST):We(r.SCISSOR_TEST)}function Ut(H){H===void 0&&(H=r.TEXTURE0+U-1),Ae!==H&&(r.activeTexture(H),Ae=H)}function dn(H,De,fe){fe===void 0&&(Ae===null?fe=r.TEXTURE0+U-1:fe=Ae);let Xe=P[fe];Xe===void 0&&(Xe={type:void 0,texture:void 0},P[fe]=Xe),(Xe.type!==H||Xe.texture!==De)&&(Ae!==fe&&(r.activeTexture(fe),Ae=fe),r.bindTexture(H,De||Me[H]),Xe.type=H,Xe.texture=De)}function Ie(){const H=P[Ae];H!==void 0&&H.type!==void 0&&(r.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function In(){try{r.compressedTexImage2D(...arguments)}catch(H){sn("WebGLState:",H)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(H){sn("WebGLState:",H)}}function M(){try{r.texSubImage2D(...arguments)}catch(H){sn("WebGLState:",H)}}function Q(){try{r.texSubImage3D(...arguments)}catch(H){sn("WebGLState:",H)}}function pe(){try{r.compressedTexSubImage2D(...arguments)}catch(H){sn("WebGLState:",H)}}function Te(){try{r.compressedTexSubImage3D(...arguments)}catch(H){sn("WebGLState:",H)}}function Ue(){try{r.texStorage2D(...arguments)}catch(H){sn("WebGLState:",H)}}function ze(){try{r.texStorage3D(...arguments)}catch(H){sn("WebGLState:",H)}}function ue(){try{r.texImage2D(...arguments)}catch(H){sn("WebGLState:",H)}}function me(){try{r.texImage3D(...arguments)}catch(H){sn("WebGLState:",H)}}function Re(H){return v[H]!==void 0?v[H]:r.getParameter(H)}function Ge(H,De){v[H]!==De&&(r.pixelStorei(H,De),v[H]=De)}function Be(H){Oe.equals(H)===!1&&(r.scissor(H.x,H.y,H.z,H.w),Oe.copy(H))}function Ne(H){Fe.equals(H)===!1&&(r.viewport(H.x,H.y,H.z,H.w),Fe.copy(H))}function vt(H,De){let fe=p.get(De);fe===void 0&&(fe=new WeakMap,p.set(De,fe));let Xe=fe.get(H);Xe===void 0&&(Xe=r.getUniformBlockIndex(De,H.name),fe.set(H,Xe))}function lt(H,De){const Xe=p.get(De).get(H);m.get(De)!==Xe&&(r.uniformBlockBinding(De,Xe,H.__bindingPointIndex),m.set(De,Xe))}function Bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},v={},Ae=null,P={},g={},E=new WeakMap,T=[],C=null,S=!1,y=null,N=null,I=null,D=null,V=null,L=null,B=null,A=new wn(0,0,0),F=0,$=!1,k=null,W=null,he=null,oe=null,Y=null,Oe.set(0,0,r.canvas.width,r.canvas.height),Fe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Ee,disable:We,bindFramebuffer:st,drawBuffers:ut,useProgram:kt,setBlending:rn,setMaterial:Rt,setFlipSided:on,setCullFace:vn,setLineWidth:Vt,setPolygonOffset:X,setScissorTest:Jt,activeTexture:Ut,bindTexture:dn,unbindTexture:Ie,compressedTexImage2D:In,compressedTexImage3D:O,texImage2D:ue,texImage3D:me,pixelStorei:Ge,getParameter:Re,updateUBOMapping:vt,uniformBlockBinding:lt,texStorage2D:Ue,texStorage3D:ze,texSubImage2D:M,texSubImage3D:Q,compressedTexSubImage2D:pe,compressedTexSubImage3D:Te,scissor:Be,viewport:Ne,reset:Bt}}function XR(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ht,_=new WeakMap,v=new Set;let g;const E=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(O,M){return T?new OffscreenCanvas(O,M):Uc("canvas")}function S(O,M,Q){let pe=1;const Te=In(O);if((Te.width>Q||Te.height>Q)&&(pe=Q/Math.max(Te.width,Te.height)),pe<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Ue=Math.floor(pe*Te.width),ze=Math.floor(pe*Te.height);g===void 0&&(g=C(Ue,ze));const ue=M?C(Ue,ze):g;return ue.width=Ue,ue.height=ze,ue.getContext("2d").drawImage(O,0,0,Ue,ze),Et("WebGLRenderer: Texture has been resized from ("+Te.width+"x"+Te.height+") to ("+Ue+"x"+ze+")."),ue}else return"data"in O&&Et("WebGLRenderer: Image in DataTexture is too big ("+Te.width+"x"+Te.height+")."),O;return O}function y(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function I(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(O,M,Q,pe,Te,Ue=!1){if(O!==null){if(r[O]!==void 0)return r[O];Et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let ze;pe&&(ze=e.get("EXT_texture_norm16"),ze||Et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=M;if(M===r.RED&&(Q===r.FLOAT&&(ue=r.R32F),Q===r.HALF_FLOAT&&(ue=r.R16F),Q===r.UNSIGNED_BYTE&&(ue=r.R8),Q===r.UNSIGNED_SHORT&&ze&&(ue=ze.R16_EXT),Q===r.SHORT&&ze&&(ue=ze.R16_SNORM_EXT)),M===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.R8UI),Q===r.UNSIGNED_SHORT&&(ue=r.R16UI),Q===r.UNSIGNED_INT&&(ue=r.R32UI),Q===r.BYTE&&(ue=r.R8I),Q===r.SHORT&&(ue=r.R16I),Q===r.INT&&(ue=r.R32I)),M===r.RG&&(Q===r.FLOAT&&(ue=r.RG32F),Q===r.HALF_FLOAT&&(ue=r.RG16F),Q===r.UNSIGNED_BYTE&&(ue=r.RG8),Q===r.UNSIGNED_SHORT&&ze&&(ue=ze.RG16_EXT),Q===r.SHORT&&ze&&(ue=ze.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RG8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RG16UI),Q===r.UNSIGNED_INT&&(ue=r.RG32UI),Q===r.BYTE&&(ue=r.RG8I),Q===r.SHORT&&(ue=r.RG16I),Q===r.INT&&(ue=r.RG32I)),M===r.RGB_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RGB8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RGB16UI),Q===r.UNSIGNED_INT&&(ue=r.RGB32UI),Q===r.BYTE&&(ue=r.RGB8I),Q===r.SHORT&&(ue=r.RGB16I),Q===r.INT&&(ue=r.RGB32I)),M===r.RGBA_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RGBA8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RGBA16UI),Q===r.UNSIGNED_INT&&(ue=r.RGBA32UI),Q===r.BYTE&&(ue=r.RGBA8I),Q===r.SHORT&&(ue=r.RGBA16I),Q===r.INT&&(ue=r.RGBA32I)),M===r.RGB&&(Q===r.UNSIGNED_SHORT&&ze&&(ue=ze.RGB16_EXT),Q===r.SHORT&&ze&&(ue=ze.RGB16_SNORM_EXT),Q===r.UNSIGNED_INT_5_9_9_9_REV&&(ue=r.RGB9_E5),Q===r.UNSIGNED_INT_10F_11F_11F_REV&&(ue=r.R11F_G11F_B10F)),M===r.RGBA){const me=Ue?If:Qt.getTransfer(Te);Q===r.FLOAT&&(ue=r.RGBA32F),Q===r.HALF_FLOAT&&(ue=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(ue=me===En?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT&&ze&&(ue=ze.RGBA16_EXT),Q===r.SHORT&&ze&&(ue=ze.RGBA16_SNORM_EXT),Q===r.UNSIGNED_SHORT_4_4_4_4&&(ue=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(ue=r.RGB5_A1)}return(ue===r.R16F||ue===r.R32F||ue===r.RG16F||ue===r.RG32F||ue===r.RGBA16F||ue===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function V(O,M){let Q;return O?M===null||M===gs||M===Ic?Q=r.DEPTH24_STENCIL8:M===fs?Q=r.DEPTH32F_STENCIL8:M===Lc&&(Q=r.DEPTH24_STENCIL8,Et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===gs||M===Ic?Q=r.DEPTH_COMPONENT24:M===fs?Q=r.DEPTH_COMPONENT32F:M===Lc&&(Q=r.DEPTH_COMPONENT16),Q}function L(O,M){return y(O)===!0||O.isFramebufferTexture&&O.minFilter!==Di&&O.minFilter!==Gi?Math.log2(Math.max(M.width,M.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?M.mipmaps.length:1}function B(O){const M=O.target;M.removeEventListener("dispose",B),F(M),M.isVideoTexture&&_.delete(M),M.isHTMLTexture&&v.delete(M)}function A(O){const M=O.target;M.removeEventListener("dispose",A),k(M)}function F(O){const M=s.get(O);if(M.__webglInit===void 0)return;const Q=O.source,pe=E.get(Q);if(pe){const Te=pe[M.__cacheKey];Te.usedTimes--,Te.usedTimes===0&&$(O),Object.keys(pe).length===0&&E.delete(Q)}s.remove(O)}function $(O){const M=s.get(O);r.deleteTexture(M.__webglTexture);const Q=O.source,pe=E.get(Q);delete pe[M.__cacheKey],f.memory.textures--}function k(O){const M=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(M.__webglFramebuffer[pe]))for(let Te=0;Te<M.__webglFramebuffer[pe].length;Te++)r.deleteFramebuffer(M.__webglFramebuffer[pe][Te]);else r.deleteFramebuffer(M.__webglFramebuffer[pe]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[pe])}else{if(Array.isArray(M.__webglFramebuffer))for(let pe=0;pe<M.__webglFramebuffer.length;pe++)r.deleteFramebuffer(M.__webglFramebuffer[pe]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let pe=0;pe<M.__webglColorRenderbuffer.length;pe++)M.__webglColorRenderbuffer[pe]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[pe]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const Q=O.textures;for(let pe=0,Te=Q.length;pe<Te;pe++){const Ue=s.get(Q[pe]);Ue.__webglTexture&&(r.deleteTexture(Ue.__webglTexture),f.memory.textures--),s.remove(Q[pe])}s.remove(O)}let W=0;function he(){W=0}function oe(){return W}function Y(O){W=O}function U(){const O=W;return O>=l.maxTextures&&Et("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),W+=1,O}function G(O){const M=[];return M.push(O.wrapS),M.push(O.wrapT),M.push(O.wrapR||0),M.push(O.magFilter),M.push(O.minFilter),M.push(O.anisotropy),M.push(O.internalFormat),M.push(O.format),M.push(O.type),M.push(O.generateMipmaps),M.push(O.premultiplyAlpha),M.push(O.flipY),M.push(O.unpackAlignment),M.push(O.colorSpace),M.join()}function ee(O,M){const Q=s.get(O);if(O.isVideoTexture&&dn(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&Q.__version!==O.version){const pe=O.image;if(pe===null)Et("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)Et("WebGLRenderer: Texture marked for update but image is incomplete");else{We(Q,O,M);return}}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+M)}function ge(O,M){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){We(Q,O,M);return}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+M)}function Ae(O,M){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){We(Q,O,M);return}i.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+M)}function P(O,M){const Q=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&Q.__version!==O.version){st(Q,O,M);return}i.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+M)}const J={[Lp]:r.REPEAT,[Zs]:r.CLAMP_TO_EDGE,[Ip]:r.MIRRORED_REPEAT},ye={[Di]:r.NEAREST,[lM]:r.NEAREST_MIPMAP_NEAREST,[qu]:r.NEAREST_MIPMAP_LINEAR,[Gi]:r.LINEAR,[jh]:r.LINEAR_MIPMAP_NEAREST,[mo]:r.LINEAR_MIPMAP_LINEAR},Oe={[fM]:r.NEVER,[gM]:r.ALWAYS,[dM]:r.LESS,[Tm]:r.LEQUAL,[hM]:r.EQUAL,[Am]:r.GEQUAL,[pM]:r.GREATER,[mM]:r.NOTEQUAL};function Fe(O,M){if(M.type===fs&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Gi||M.magFilter===jh||M.magFilter===qu||M.magFilter===mo||M.minFilter===Gi||M.minFilter===jh||M.minFilter===qu||M.minFilter===mo)&&Et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,J[M.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,J[M.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,J[M.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,ye[M.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,ye[M.minFilter]),M.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,Oe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Di||M.minFilter!==qu&&M.minFilter!==mo||M.type===fs&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function ae(O,M){let Q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,M.addEventListener("dispose",B));const pe=M.source;let Te=E.get(pe);Te===void 0&&(Te={},E.set(pe,Te));const Ue=G(M);if(Ue!==O.__cacheKey){Te[Ue]===void 0&&(Te[Ue]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,Q=!0),Te[Ue].usedTimes++;const ze=Te[O.__cacheKey];ze!==void 0&&(Te[O.__cacheKey].usedTimes--,ze.usedTimes===0&&$(M)),O.__cacheKey=Ue,O.__webglTexture=Te[Ue].texture}return Q}function Me(O,M,Q){return Math.floor(Math.floor(O/Q)/M)}function Ee(O,M,Q,pe){const Ue=O.updateRanges;if(Ue.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,Q,pe,M.data);else{Ue.sort((Ge,Be)=>Ge.start-Be.start);let ze=0;for(let Ge=1;Ge<Ue.length;Ge++){const Be=Ue[ze],Ne=Ue[Ge],vt=Be.start+Be.count,lt=Me(Ne.start,M.width,4),Bt=Me(Be.start,M.width,4);Ne.start<=vt+1&&lt===Bt&&Me(Ne.start+Ne.count-1,M.width,4)===lt?Be.count=Math.max(Be.count,Ne.start+Ne.count-Be.start):(++ze,Ue[ze]=Ne)}Ue.length=ze+1;const ue=i.getParameter(r.UNPACK_ROW_LENGTH),me=i.getParameter(r.UNPACK_SKIP_PIXELS),Re=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let Ge=0,Be=Ue.length;Ge<Be;Ge++){const Ne=Ue[Ge],vt=Math.floor(Ne.start/4),lt=Math.ceil(Ne.count/4),Bt=vt%M.width,H=Math.floor(vt/M.width),De=lt,fe=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,Bt),i.pixelStorei(r.UNPACK_SKIP_ROWS,H),i.texSubImage2D(r.TEXTURE_2D,0,Bt,H,De,fe,Q,pe,M.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,ue),i.pixelStorei(r.UNPACK_SKIP_PIXELS,me),i.pixelStorei(r.UNPACK_SKIP_ROWS,Re)}}function We(O,M,Q){let pe=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(pe=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(pe=r.TEXTURE_3D);const Te=ae(O,M),Ue=M.source;i.bindTexture(pe,O.__webglTexture,r.TEXTURE0+Q);const ze=s.get(Ue);if(Ue.version!==ze.__version||Te===!0){if(i.activeTexture(r.TEXTURE0+Q),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const fe=Qt.getPrimaries(Qt.workingColorSpace),Xe=M.colorSpace===Ur?null:Qt.getPrimaries(M.colorSpace),Le=M.colorSpace===Ur||fe===Xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let me=S(M.image,!1,l.maxTextureSize);me=Ie(M,me);const Re=c.convert(M.format,M.colorSpace),Ge=c.convert(M.type);let Be=D(M.internalFormat,Re,Ge,M.normalized,M.colorSpace,M.isVideoTexture);Fe(pe,M);let Ne;const vt=M.mipmaps,lt=M.isVideoTexture!==!0,Bt=ze.__version===void 0||Te===!0,H=Ue.dataReady,De=L(M,me);if(M.isDepthTexture)Be=V(M.format===go,M.type),Bt&&(lt?i.texStorage2D(r.TEXTURE_2D,1,Be,me.width,me.height):i.texImage2D(r.TEXTURE_2D,0,Be,me.width,me.height,0,Re,Ge,null));else if(M.isDataTexture)if(vt.length>0){lt&&Bt&&i.texStorage2D(r.TEXTURE_2D,De,Be,vt[0].width,vt[0].height);for(let fe=0,Xe=vt.length;fe<Xe;fe++)Ne=vt[fe],lt?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ne.width,Ne.height,Re,Ge,Ne.data):i.texImage2D(r.TEXTURE_2D,fe,Be,Ne.width,Ne.height,0,Re,Ge,Ne.data);M.generateMipmaps=!1}else lt?(Bt&&i.texStorage2D(r.TEXTURE_2D,De,Be,me.width,me.height),H&&Ee(M,me,Re,Ge)):i.texImage2D(r.TEXTURE_2D,0,Be,me.width,me.height,0,Re,Ge,me.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){lt&&Bt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,De,Be,vt[0].width,vt[0].height,me.depth);for(let fe=0,Xe=vt.length;fe<Xe;fe++)if(Ne=vt[fe],M.format!==Qa)if(Re!==null)if(lt){if(H)if(M.layerUpdates.size>0){const Le=rv(Ne.width,Ne.height,M.format,M.type);for(const we of M.layerUpdates){const qe=Ne.data.subarray(we*Le/Ne.data.BYTES_PER_ELEMENT,(we+1)*Le/Ne.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,we,Ne.width,Ne.height,1,Re,qe)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ne.width,Ne.height,me.depth,Re,Ne.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,Be,Ne.width,Ne.height,me.depth,0,Ne.data,0,0);else Et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?H&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ne.width,Ne.height,me.depth,Re,Ge,Ne.data):i.texImage3D(r.TEXTURE_2D_ARRAY,fe,Be,Ne.width,Ne.height,me.depth,0,Re,Ge,Ne.data)}else{lt&&Bt&&i.texStorage2D(r.TEXTURE_2D,De,Be,vt[0].width,vt[0].height);for(let fe=0,Xe=vt.length;fe<Xe;fe++)Ne=vt[fe],M.format!==Qa?Re!==null?lt?H&&i.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,Ne.width,Ne.height,Re,Ne.data):i.compressedTexImage2D(r.TEXTURE_2D,fe,Be,Ne.width,Ne.height,0,Ne.data):Et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ne.width,Ne.height,Re,Ge,Ne.data):i.texImage2D(r.TEXTURE_2D,fe,Be,Ne.width,Ne.height,0,Re,Ge,Ne.data)}else if(M.isDataArrayTexture)if(lt){if(Bt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,De,Be,me.width,me.height,me.depth),H)if(M.layerUpdates.size>0){const fe=rv(me.width,me.height,M.format,M.type);for(const Xe of M.layerUpdates){const Le=me.data.subarray(Xe*fe/me.data.BYTES_PER_ELEMENT,(Xe+1)*fe/me.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Xe,me.width,me.height,1,Re,Ge,Le)}M.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Re,Ge,me.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Be,me.width,me.height,me.depth,0,Re,Ge,me.data);else if(M.isData3DTexture)lt?(Bt&&i.texStorage3D(r.TEXTURE_3D,De,Be,me.width,me.height,me.depth),H&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Re,Ge,me.data)):i.texImage3D(r.TEXTURE_3D,0,Be,me.width,me.height,me.depth,0,Re,Ge,me.data);else if(M.isFramebufferTexture){if(Bt)if(lt)i.texStorage2D(r.TEXTURE_2D,De,Be,me.width,me.height);else{let fe=me.width,Xe=me.height;for(let Le=0;Le<De;Le++)i.texImage2D(r.TEXTURE_2D,Le,Be,fe,Xe,0,Re,Ge,null),fe>>=1,Xe>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const fe=r.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),me.parentNode!==fe){fe.appendChild(me),v.add(M),fe.onpaint=gt=>{const Un=gt.changedElements;for(const en of v)Un.includes(en.image)&&(en.needsUpdate=!0)},fe.requestPaint();return}const Xe=0,Le=r.RGBA,we=r.RGBA,qe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Xe,Le,we,qe,me),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(vt.length>0){if(lt&&Bt){const fe=In(vt[0]);i.texStorage2D(r.TEXTURE_2D,De,Be,fe.width,fe.height)}for(let fe=0,Xe=vt.length;fe<Xe;fe++)Ne=vt[fe],lt?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Re,Ge,Ne):i.texImage2D(r.TEXTURE_2D,fe,Be,Re,Ge,Ne);M.generateMipmaps=!1}else if(lt){if(Bt){const fe=In(me);i.texStorage2D(r.TEXTURE_2D,De,Be,fe.width,fe.height)}H&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Re,Ge,me)}else i.texImage2D(r.TEXTURE_2D,0,Be,Re,Ge,me);y(M)&&N(pe),ze.__version=Ue.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function st(O,M,Q){if(M.image.length!==6)return;const pe=ae(O,M),Te=M.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+Q);const Ue=s.get(Te);if(Te.version!==Ue.__version||pe===!0){i.activeTexture(r.TEXTURE0+Q);const ze=Qt.getPrimaries(Qt.workingColorSpace),ue=M.colorSpace===Ur?null:Qt.getPrimaries(M.colorSpace),me=M.colorSpace===Ur||ze===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Re=M.isCompressedTexture||M.image[0].isCompressedTexture,Ge=M.image[0]&&M.image[0].isDataTexture,Be=[];for(let we=0;we<6;we++)!Re&&!Ge?Be[we]=S(M.image[we],!0,l.maxCubemapSize):Be[we]=Ge?M.image[we].image:M.image[we],Be[we]=Ie(M,Be[we]);const Ne=Be[0],vt=c.convert(M.format,M.colorSpace),lt=c.convert(M.type),Bt=D(M.internalFormat,vt,lt,M.normalized,M.colorSpace),H=M.isVideoTexture!==!0,De=Ue.__version===void 0||pe===!0,fe=Te.dataReady;let Xe=L(M,Ne);Fe(r.TEXTURE_CUBE_MAP,M);let Le;if(Re){H&&De&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,Bt,Ne.width,Ne.height);for(let we=0;we<6;we++){Le=Be[we].mipmaps;for(let qe=0;qe<Le.length;qe++){const gt=Le[qe];M.format!==Qa?vt!==null?H?fe&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,0,0,gt.width,gt.height,vt,gt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,Bt,gt.width,gt.height,0,gt.data):Et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,0,0,gt.width,gt.height,vt,lt,gt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,Bt,gt.width,gt.height,0,vt,lt,gt.data)}}}else{if(Le=M.mipmaps,H&&De){Le.length>0&&Xe++;const we=In(Be[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,Bt,we.width,we.height)}for(let we=0;we<6;we++)if(Ge){H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Be[we].width,Be[we].height,vt,lt,Be[we].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Bt,Be[we].width,Be[we].height,0,vt,lt,Be[we].data);for(let qe=0;qe<Le.length;qe++){const Un=Le[qe].image[we].image;H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,0,0,Un.width,Un.height,vt,lt,Un.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,Bt,Un.width,Un.height,0,vt,lt,Un.data)}}else{H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,vt,lt,Be[we]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,Bt,vt,lt,Be[we]);for(let qe=0;qe<Le.length;qe++){const gt=Le[qe];H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,0,0,vt,lt,gt.image[we]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,Bt,vt,lt,gt.image[we])}}}y(M)&&N(r.TEXTURE_CUBE_MAP),Ue.__version=Te.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function ut(O,M,Q,pe,Te,Ue){const ze=c.convert(Q.format,Q.colorSpace),ue=c.convert(Q.type),me=D(Q.internalFormat,ze,ue,Q.normalized,Q.colorSpace),Re=s.get(M),Ge=s.get(Q);if(Ge.__renderTarget=M,!Re.__hasExternalTextures){const Be=Math.max(1,M.width>>Ue),Ne=Math.max(1,M.height>>Ue);Te===r.TEXTURE_3D||Te===r.TEXTURE_2D_ARRAY?i.texImage3D(Te,Ue,me,Be,Ne,M.depth,0,ze,ue,null):i.texImage2D(Te,Ue,me,Be,Ne,0,ze,ue,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),Ut(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,Te,Ge.__webglTexture,0,Jt(M)):(Te===r.TEXTURE_2D||Te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pe,Te,Ge.__webglTexture,Ue),i.bindFramebuffer(r.FRAMEBUFFER,null)}function kt(O,M,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,O),M.depthBuffer){const pe=M.depthTexture,Te=pe&&pe.isDepthTexture?pe.type:null,Ue=V(M.stencilBuffer,Te),ze=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Ut(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Jt(M),Ue,M.width,M.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt(M),Ue,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Ue,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ze,r.RENDERBUFFER,O)}else{const pe=M.textures;for(let Te=0;Te<pe.length;Te++){const Ue=pe[Te],ze=c.convert(Ue.format,Ue.colorSpace),ue=c.convert(Ue.type),me=D(Ue.internalFormat,ze,ue,Ue.normalized,Ue.colorSpace);Ut(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Jt(M),me,M.width,M.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt(M),me,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,me,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Lt(O,M,Q){const pe=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Te=s.get(M.depthTexture);if(Te.__renderTarget=M,(!Te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),pe){if(Te.__webglInit===void 0&&(Te.__webglInit=!0,M.depthTexture.addEventListener("dispose",B)),Te.__webglTexture===void 0){Te.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Te.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,M.depthTexture);const Re=c.convert(M.depthTexture.format),Ge=c.convert(M.depthTexture.type);let Be;M.depthTexture.format===tr?Be=r.DEPTH_COMPONENT24:M.depthTexture.format===go&&(Be=r.DEPTH24_STENCIL8);for(let Ne=0;Ne<6;Ne++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0,Be,M.width,M.height,0,Re,Ge,null)}}else ee(M.depthTexture,0);const Ue=Te.__webglTexture,ze=Jt(M),ue=pe?r.TEXTURE_CUBE_MAP_POSITIVE_X+Q:r.TEXTURE_2D,me=M.depthTexture.format===go?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===tr)Ut(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,ue,Ue,0,ze):r.framebufferTexture2D(r.FRAMEBUFFER,me,ue,Ue,0);else if(M.depthTexture.format===go)Ut(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,ue,Ue,0,ze):r.framebufferTexture2D(r.FRAMEBUFFER,me,ue,Ue,0);else throw new Error("Unknown depthTexture format")}function Xt(O){const M=s.get(O),Q=O.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==O.depthTexture){const pe=O.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),pe){const Te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,pe.removeEventListener("dispose",Te)};pe.addEventListener("dispose",Te),M.__depthDisposeCallback=Te}M.__boundDepthTexture=pe}if(O.depthTexture&&!M.__autoAllocateDepthBuffer)if(Q)for(let pe=0;pe<6;pe++)Lt(M.__webglFramebuffer[pe],O,pe);else{const pe=O.texture.mipmaps;pe&&pe.length>0?Lt(M.__webglFramebuffer[0],O,0):Lt(M.__webglFramebuffer,O,0)}else if(Q){M.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[pe]),M.__webglDepthbuffer[pe]===void 0)M.__webglDepthbuffer[pe]=r.createRenderbuffer(),kt(M.__webglDepthbuffer[pe],O,!1);else{const Te=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=M.__webglDepthbuffer[pe];r.bindRenderbuffer(r.RENDERBUFFER,Ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,Ue)}}else{const pe=O.texture.mipmaps;if(pe&&pe.length>0?i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),kt(M.__webglDepthbuffer,O,!1);else{const Te=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,Ue)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function rn(O,M,Q){const pe=s.get(O);M!==void 0&&ut(pe.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&Xt(O)}function Rt(O){const M=O.texture,Q=s.get(O),pe=s.get(M);O.addEventListener("dispose",A);const Te=O.textures,Ue=O.isWebGLCubeRenderTarget===!0,ze=Te.length>1;if(ze||(pe.__webglTexture===void 0&&(pe.__webglTexture=r.createTexture()),pe.__version=M.version,f.memory.textures++),Ue){Q.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer[ue]=[];for(let me=0;me<M.mipmaps.length;me++)Q.__webglFramebuffer[ue][me]=r.createFramebuffer()}else Q.__webglFramebuffer[ue]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)Q.__webglFramebuffer[ue]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(ze)for(let ue=0,me=Te.length;ue<me;ue++){const Re=s.get(Te[ue]);Re.__webglTexture===void 0&&(Re.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&Ut(O)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let ue=0;ue<Te.length;ue++){const me=Te[ue];Q.__webglColorRenderbuffer[ue]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[ue]);const Re=c.convert(me.format,me.colorSpace),Ge=c.convert(me.type),Be=D(me.internalFormat,Re,Ge,me.normalized,me.colorSpace,O.isXRRenderTarget===!0),Ne=Jt(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ne,Be,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ue,r.RENDERBUFFER,Q.__webglColorRenderbuffer[ue])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),kt(Q.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ue){i.bindTexture(r.TEXTURE_CUBE_MAP,pe.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,M);for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)ut(Q.__webglFramebuffer[ue][me],O,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else ut(Q.__webglFramebuffer[ue],O,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);y(M)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(ze){for(let ue=0,me=Te.length;ue<me;ue++){const Re=Te[ue],Ge=s.get(Re);let Be=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Be=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Be,Ge.__webglTexture),Fe(Be,Re),ut(Q.__webglFramebuffer,O,Re,r.COLOR_ATTACHMENT0+ue,Be,0),y(Re)&&N(Be)}i.unbindTexture()}else{let ue=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(ue=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(ue,pe.__webglTexture),Fe(ue,M),M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)ut(Q.__webglFramebuffer[me],O,M,r.COLOR_ATTACHMENT0,ue,me);else ut(Q.__webglFramebuffer,O,M,r.COLOR_ATTACHMENT0,ue,0);y(M)&&N(ue),i.unbindTexture()}O.depthBuffer&&Xt(O)}function on(O){const M=O.textures;for(let Q=0,pe=M.length;Q<pe;Q++){const Te=M[Q];if(y(Te)){const Ue=I(O),ze=s.get(Te).__webglTexture;i.bindTexture(Ue,ze),N(Ue),i.unbindTexture()}}}const vn=[],Vt=[];function X(O){if(O.samples>0){if(Ut(O)===!1){const M=O.textures,Q=O.width,pe=O.height;let Te=r.COLOR_BUFFER_BIT;const Ue=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ze=s.get(O),ue=M.length>1;if(ue)for(let Re=0;Re<M.length;Re++)i.bindFramebuffer(r.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,ze.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,ze.__webglMultisampledFramebuffer);const me=O.texture.mipmaps;me&&me.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,ze.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let Re=0;Re<M.length;Re++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Te|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Te|=r.STENCIL_BUFFER_BIT)),ue){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ze.__webglColorRenderbuffer[Re]);const Ge=s.get(M[Re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ge,0)}r.blitFramebuffer(0,0,Q,pe,0,0,Q,pe,Te,r.NEAREST),m===!0&&(vn.length=0,Vt.length=0,vn.push(r.COLOR_ATTACHMENT0+Re),O.depthBuffer&&O.resolveDepthBuffer===!1&&(vn.push(Ue),Vt.push(Ue),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Vt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,vn))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ue)for(let Re=0;Re<M.length;Re++){i.bindFramebuffer(r.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,ze.__webglColorRenderbuffer[Re]);const Ge=s.get(M[Re]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,ze.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,Ge,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,ze.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const M=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Jt(O){return Math.min(l.maxSamples,O.samples)}function Ut(O){const M=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function dn(O){const M=f.render.frame;_.get(O)!==M&&(_.set(O,M),O.update())}function Ie(O,M){const Q=O.colorSpace,pe=O.format,Te=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||Q!==Lf&&Q!==Ur&&(Qt.getTransfer(Q)===En?(pe!==Qa||Te!==Fa)&&Et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):sn("WebGLTextures: Unsupported texture color space:",Q)),M}function In(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=U,this.resetTextureUnits=he,this.getTextureUnits=oe,this.setTextureUnits=Y,this.setTexture2D=ee,this.setTexture2DArray=ge,this.setTexture3D=Ae,this.setTextureCube=P,this.rebindTextures=rn,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=on,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function YR(r,e){function i(s,l=Ur){let c;const f=Qt.getTransfer(l);if(s===Fa)return r.UNSIGNED_BYTE;if(s===bm)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ym)return r.UNSIGNED_SHORT_5_5_5_1;if(s===tb)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===nb)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Jv)return r.BYTE;if(s===eb)return r.SHORT;if(s===Lc)return r.UNSIGNED_SHORT;if(s===vm)return r.INT;if(s===gs)return r.UNSIGNED_INT;if(s===fs)return r.FLOAT;if(s===er)return r.HALF_FLOAT;if(s===ib)return r.ALPHA;if(s===ab)return r.RGB;if(s===Qa)return r.RGBA;if(s===tr)return r.DEPTH_COMPONENT;if(s===go)return r.DEPTH_STENCIL;if(s===sb)return r.RED;if(s===Em)return r.RED_INTEGER;if(s===vo)return r.RG;if(s===Sm)return r.RG_INTEGER;if(s===Mm)return r.RGBA_INTEGER;if(s===Mf||s===Tf||s===Af||s===wf)if(f===En)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Mf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Tf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Af)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===wf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Mf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Tf)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Af)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===wf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Up||s===Pp||s===Fp||s===Bp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Up)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Pp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Fp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Bp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===zp||s===Gp||s===Hp||s===kp||s===Vp||s===Of||s===jp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===zp||s===Gp)return f===En?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Hp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===kp)return c.COMPRESSED_R11_EAC;if(s===Vp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Of)return c.COMPRESSED_RG11_EAC;if(s===jp)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Xp||s===Yp||s===Wp||s===qp||s===$p||s===Kp||s===Zp||s===Qp||s===Jp||s===em||s===tm||s===nm||s===im||s===am)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Xp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Yp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Wp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===$p)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Kp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Zp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Jp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===em)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===tm)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===nm)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===im)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===am)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===sm||s===rm||s===om)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===sm)return f===En?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===om)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===lm||s===cm||s===Df||s===um)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===lm)return c.COMPRESSED_RED_RGTC1_EXT;if(s===cm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Df)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===um)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ic?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const WR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $R{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new mb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new _s({vertexShader:WR,fragmentShader:qR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new xs(new zf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class KR extends Gr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,_=null,v=null,g=null,E=null,T=null;const C=typeof XRWebGLBinding<"u",S=new $R,y={},N=i.getContextAttributes();let I=null,D=null;const V=[],L=[],B=new Ht;let A=null;const F=new Pa;F.viewport=new si;const $=new Pa;$.viewport=new si;const k=[F,$],W=new sT;let he=null,oe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let Me=V[ae];return Me===void 0&&(Me=new Zh,V[ae]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ae){let Me=V[ae];return Me===void 0&&(Me=new Zh,V[ae]=Me),Me.getGripSpace()},this.getHand=function(ae){let Me=V[ae];return Me===void 0&&(Me=new Zh,V[ae]=Me),Me.getHandSpace()};function Y(ae){const Me=L.indexOf(ae.inputSource);if(Me===-1)return;const Ee=V[Me];Ee!==void 0&&(Ee.update(ae.inputSource,ae.frame,p||f),Ee.dispatchEvent({type:ae.type,data:ae.inputSource}))}function U(){l.removeEventListener("select",Y),l.removeEventListener("selectstart",Y),l.removeEventListener("selectend",Y),l.removeEventListener("squeeze",Y),l.removeEventListener("squeezestart",Y),l.removeEventListener("squeezeend",Y),l.removeEventListener("end",U),l.removeEventListener("inputsourceschange",G);for(let ae=0;ae<V.length;ae++){const Me=L[ae];Me!==null&&(L[ae]=null,V[ae].disconnect(Me))}he=null,oe=null,S.reset();for(const ae in y)delete y[ae];e.setRenderTarget(I),E=null,g=null,v=null,l=null,D=null,Fe.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,s.isPresenting===!0&&Et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){h=ae,s.isPresenting===!0&&Et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(ae){p=ae},this.getBaseLayer=function(){return g!==null?g:E},this.getBinding=function(){return v===null&&C&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(I=e.getRenderTarget(),l.addEventListener("select",Y),l.addEventListener("selectstart",Y),l.addEventListener("selectend",Y),l.addEventListener("squeeze",Y),l.addEventListener("squeezestart",Y),l.addEventListener("squeezeend",Y),l.addEventListener("end",U),l.addEventListener("inputsourceschange",G),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(B),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,We=null,st=null;N.depth&&(st=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Ee=N.stencil?go:tr,We=N.stencil?Ic:gs);const ut={colorFormat:i.RGBA8,depthFormat:st,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(ut),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),D=new ps(g.textureWidth,g.textureHeight,{format:Qa,type:Fa,depthTexture:new wl(g.textureWidth,g.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Ee={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};E=new XRWebGLLayer(l,i,Ee),l.updateRenderState({baseLayer:E}),e.setPixelRatio(1),e.setSize(E.framebufferWidth,E.framebufferHeight,!1),D=new ps(E.framebufferWidth,E.framebufferHeight,{format:Qa,type:Fa,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Fe.setContext(l),Fe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function G(ae){for(let Me=0;Me<ae.removed.length;Me++){const Ee=ae.removed[Me],We=L.indexOf(Ee);We>=0&&(L[We]=null,V[We].disconnect(Ee))}for(let Me=0;Me<ae.added.length;Me++){const Ee=ae.added[Me];let We=L.indexOf(Ee);if(We===-1){for(let ut=0;ut<V.length;ut++)if(ut>=L.length){L.push(Ee),We=ut;break}else if(L[ut]===null){L[ut]=Ee,We=ut;break}if(We===-1)break}const st=V[We];st&&st.connect(Ee)}}const ee=new ie,ge=new ie;function Ae(ae,Me,Ee){ee.setFromMatrixPosition(Me.matrixWorld),ge.setFromMatrixPosition(Ee.matrixWorld);const We=ee.distanceTo(ge),st=Me.projectionMatrix.elements,ut=Ee.projectionMatrix.elements,kt=st[14]/(st[10]-1),Lt=st[14]/(st[10]+1),Xt=(st[9]+1)/st[5],rn=(st[9]-1)/st[5],Rt=(st[8]-1)/st[0],on=(ut[8]+1)/ut[0],vn=kt*Rt,Vt=kt*on,X=We/(-Rt+on),Jt=X*-Rt;if(Me.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Jt),ae.translateZ(X),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),st[10]===-1)ae.projectionMatrix.copy(Me.projectionMatrix),ae.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{const Ut=kt+X,dn=Lt+X,Ie=vn-Jt,In=Vt+(We-Jt),O=Xt*Lt/dn*Ut,M=rn*Lt/dn*Ut;ae.projectionMatrix.makePerspective(Ie,In,O,M,Ut,dn),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function P(ae,Me){Me===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(Me.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let Me=ae.near,Ee=ae.far;S.texture!==null&&(S.depthNear>0&&(Me=S.depthNear),S.depthFar>0&&(Ee=S.depthFar)),W.near=$.near=F.near=Me,W.far=$.far=F.far=Ee,(he!==W.near||oe!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),he=W.near,oe=W.far),W.layers.mask=ae.layers.mask|6,F.layers.mask=W.layers.mask&-5,$.layers.mask=W.layers.mask&-3;const We=ae.parent,st=W.cameras;P(W,We);for(let ut=0;ut<st.length;ut++)P(st[ut],We);st.length===2?Ae(W,F,$):W.projectionMatrix.copy(F.projectionMatrix),J(ae,W,We)};function J(ae,Me,Ee){Ee===null?ae.matrix.copy(Me.matrixWorld):(ae.matrix.copy(Ee.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(Me.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(Me.projectionMatrix),ae.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=dm*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(g===null&&E===null))return m},this.setFoveation=function(ae){m=ae,g!==null&&(g.fixedFoveation=ae),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=ae)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(W)},this.getCameraTexture=function(ae){return y[ae]};let ye=null;function Oe(ae,Me){if(_=Me.getViewerPose(p||f),T=Me,_!==null){const Ee=_.views;E!==null&&(e.setRenderTargetFramebuffer(D,E.framebuffer),e.setRenderTarget(D));let We=!1;Ee.length!==W.cameras.length&&(W.cameras.length=0,We=!0);for(let Lt=0;Lt<Ee.length;Lt++){const Xt=Ee[Lt];let rn=null;if(E!==null)rn=E.getViewport(Xt);else{const on=v.getViewSubImage(g,Xt);rn=on.viewport,Lt===0&&(e.setRenderTargetTextures(D,on.colorTexture,on.depthStencilTexture),e.setRenderTarget(D))}let Rt=k[Lt];Rt===void 0&&(Rt=new Pa,Rt.layers.enable(Lt),Rt.viewport=new si,k[Lt]=Rt),Rt.matrix.fromArray(Xt.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(Xt.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(rn.x,rn.y,rn.width,rn.height),Lt===0&&(W.matrix.copy(Rt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),We===!0&&W.cameras.push(Rt)}const st=l.enabledFeatures;if(st&&st.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){v=s.getBinding();const Lt=v.getDepthInformation(Ee[0]);Lt&&Lt.isValid&&Lt.texture&&S.init(Lt,l.renderState)}if(st&&st.includes("camera-access")&&C){e.state.unbindTexture(),v=s.getBinding();for(let Lt=0;Lt<Ee.length;Lt++){const Xt=Ee[Lt].camera;if(Xt){let rn=y[Xt];rn||(rn=new mb,y[Xt]=rn);const Rt=v.getCameraImage(Xt);rn.sourceTexture=Rt}}}}for(let Ee=0;Ee<V.length;Ee++){const We=L[Ee],st=V[Ee];We!==null&&st!==void 0&&st.update(We,Me,p||f)}ye&&ye(ae,Me),Me.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Me}),T=null}const Fe=new vb;Fe.setAnimationLoop(Oe),this.setAnimationLoop=function(ae){ye=ae},this.dispose=function(){}}}const ZR=new _i,Ab=new Dt;Ab.set(-1,0,0,0,1,0,0,0,1);function QR(r,e){function i(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function s(S,y){y.color.getRGB(S.fogColor.value,gb(r)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function l(S,y,N,I,D){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(S,y):y.isMeshLambertMaterial?(c(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(S,y),v(S,y)):y.isMeshPhongMaterial?(c(S,y),_(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(S,y),g(S,y),y.isMeshPhysicalMaterial&&E(S,y,D)):y.isMeshMatcapMaterial?(c(S,y),T(S,y)):y.isMeshDepthMaterial?c(S,y):y.isMeshDistanceMaterial?(c(S,y),C(S,y)):y.isMeshNormalMaterial?c(S,y):y.isLineBasicMaterial?(f(S,y),y.isLineDashedMaterial&&h(S,y)):y.isPointsMaterial?m(S,y,N,I):y.isSpriteMaterial?p(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,i(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===ia&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,i(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===ia&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,i(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,i(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const N=e.get(y),I=N.envMap,D=N.envMapRotation;I&&(S.envMap.value=I,S.envMapRotation.value.setFromMatrix4(ZR.makeRotationFromEuler(D)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(Ab),S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,S.aoMapTransform))}function f(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform))}function h(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function m(S,y,N,I){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*N,S.scale.value=I*.5,y.map&&(S.map.value=y.map,i(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function p(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function _(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function v(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function g(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function E(S,y,N){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ia&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=N.texture,S.transmissionSamplerSize.value.set(N.width,N.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,S.specularIntensityMapTransform))}function T(S,y){y.matcap&&(S.matcap.value=y.matcap)}function C(S,y){const N=e.get(y).light;S.referencePosition.value.setFromMatrixPosition(N.matrixWorld),S.nearDistance.value=N.shadow.camera.near,S.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function JR(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,I){const D=I.program;s.uniformBlockBinding(N,D)}function p(N,I){let D=l[N.id];D===void 0&&(T(N),D=_(N),l[N.id]=D,N.addEventListener("dispose",S));const V=I.program;s.updateUBOMapping(N,V);const L=e.render.frame;c[N.id]!==L&&(g(N),c[N.id]=L)}function _(N){const I=v();N.__bindingPointIndex=I;const D=r.createBuffer(),V=N.__size,L=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,D),r.bufferData(r.UNIFORM_BUFFER,V,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,D),D}function v(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return sn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const I=l[N.id],D=N.uniforms,V=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let L=0,B=D.length;L<B;L++){const A=Array.isArray(D[L])?D[L]:[D[L]];for(let F=0,$=A.length;F<$;F++){const k=A[F];if(E(k,L,F,V)===!0){const W=k.__offset,he=Array.isArray(k.value)?k.value:[k.value];let oe=0;for(let Y=0;Y<he.length;Y++){const U=he[Y],G=C(U);typeof U=="number"||typeof U=="boolean"?(k.__data[0]=U,r.bufferSubData(r.UNIFORM_BUFFER,W+oe,k.__data)):U.isMatrix3?(k.__data[0]=U.elements[0],k.__data[1]=U.elements[1],k.__data[2]=U.elements[2],k.__data[3]=0,k.__data[4]=U.elements[3],k.__data[5]=U.elements[4],k.__data[6]=U.elements[5],k.__data[7]=0,k.__data[8]=U.elements[6],k.__data[9]=U.elements[7],k.__data[10]=U.elements[8],k.__data[11]=0):ArrayBuffer.isView(U)?k.__data.set(new U.constructor(U.buffer,U.byteOffset,k.__data.length)):(U.toArray(k.__data,oe),oe+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,W,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function E(N,I,D,V){const L=N.value,B=I+"_"+D;if(V[B]===void 0)return typeof L=="number"||typeof L=="boolean"?V[B]=L:ArrayBuffer.isView(L)?V[B]=L.slice():V[B]=L.clone(),!0;{const A=V[B];if(typeof L=="number"||typeof L=="boolean"){if(A!==L)return V[B]=L,!0}else{if(ArrayBuffer.isView(L))return!0;if(A.equals(L)===!1)return A.copy(L),!0}}return!1}function T(N){const I=N.uniforms;let D=0;const V=16;for(let B=0,A=I.length;B<A;B++){const F=Array.isArray(I[B])?I[B]:[I[B]];for(let $=0,k=F.length;$<k;$++){const W=F[$],he=Array.isArray(W.value)?W.value:[W.value];for(let oe=0,Y=he.length;oe<Y;oe++){const U=he[oe],G=C(U),ee=D%V,ge=ee%G.boundary,Ae=ee+ge;D+=ge,Ae!==0&&V-Ae<G.storage&&(D+=V-Ae),W.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=D,D+=G.storage}}}const L=D%V;return L>0&&(D+=V-L),N.__size=D,N.__cache={},this}function C(N){const I={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(I.boundary=4,I.storage=4):N.isVector2?(I.boundary=8,I.storage=8):N.isVector3||N.isColor?(I.boundary=16,I.storage=12):N.isVector4?(I.boundary=16,I.storage=16):N.isMatrix3?(I.boundary=48,I.storage=48):N.isMatrix4?(I.boundary=64,I.storage=64):N.isTexture?Et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(I.boundary=16,I.storage=N.byteLength):Et("WebGLRenderer: Unsupported uniform value type.",N),I}function S(N){const I=N.target;I.removeEventListener("dispose",S);const D=f.indexOf(I.__bindingPointIndex);f.splice(D,1),r.deleteBuffer(l[I.id]),delete l[I.id],delete c[I.id]}function y(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:p,dispose:y}}const eC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let cs=null;function tC(){return cs===null&&(cs=new kM(eC,16,16,vo,er),cs.name="DFG_LUT",cs.minFilter=Gi,cs.magFilter=Gi,cs.wrapS=Zs,cs.wrapT=Zs,cs.generateMipmaps=!1,cs.needsUpdate=!0),cs}class nC{constructor(e={}){const{canvas:i=_M(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:E=Fa}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=f;const C=E,S=new Set([Mm,Sm,Em]),y=new Set([Fa,gs,Lc,Ic,bm,ym]),N=new Uint32Array(4),I=new Int32Array(4),D=new ie;let V=null,L=null;const B=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const $=this;let k=!1,W=null;this._outputColorSpace=_a;let he=0,oe=0,Y=null,U=-1,G=null;const ee=new si,ge=new si;let Ae=null;const P=new wn(0);let J=0,ye=i.width,Oe=i.height,Fe=1,ae=null,Me=null;const Ee=new si(0,0,ye,Oe),We=new si(0,0,ye,Oe);let st=!1;const ut=new hb;let kt=!1,Lt=!1;const Xt=new _i,rn=new ie,Rt=new si,on={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let vn=!1;function Vt(){return Y===null?Fe:1}let X=s;function Jt(w,q){return i.getContext(w,q)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${_m}`),i.addEventListener("webglcontextlost",we,!1),i.addEventListener("webglcontextrestored",qe,!1),i.addEventListener("webglcontextcreationerror",gt,!1),X===null){const q="webgl2";if(X=Jt(q,w),X===null)throw Jt(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw sn("WebGLRenderer: "+w.message),w}let Ut,dn,Ie,In,O,M,Q,pe,Te,Ue,ze,ue,me,Re,Ge,Be,Ne,vt,lt,Bt,H,De,fe;function Xe(){Ut=new tw(X),Ut.init(),H=new YR(X,Ut),dn=new WA(X,Ut,e,H),Ie=new jR(X,Ut),dn.reversedDepthBuffer&&g&&Ie.buffers.depth.setReversed(!0),In=new aw(X),O=new NR,M=new XR(X,Ut,Ie,O,dn,H,In),Q=new ew($),pe=new lT(X),De=new XA(X,pe),Te=new nw(X,pe,In,De),Ue=new rw(X,Te,pe,De,In),vt=new sw(X,dn,M),Ge=new qA(O),ze=new CR($,Q,Ut,dn,De,Ge),ue=new QR($,O),me=new DR,Re=new BR(Ut),Ne=new jA($,Q,Ie,Ue,T,m),Be=new VR($,Ue,dn),fe=new JR(X,In,dn,Ie),lt=new YA(X,Ut,In),Bt=new iw(X,Ut,In),In.programs=ze.programs,$.capabilities=dn,$.extensions=Ut,$.properties=O,$.renderLists=me,$.shadowMap=Be,$.state=Ie,$.info=In}Xe(),C!==Fa&&(F=new lw(C,i.width,i.height,l,c));const Le=new KR($,X);this.xr=Le,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const w=Ut.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ut.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Fe},this.setPixelRatio=function(w){w!==void 0&&(Fe=w,this.setSize(ye,Oe,!1))},this.getSize=function(w){return w.set(ye,Oe)},this.setSize=function(w,q,K=!0){if(Le.isPresenting){Et("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=w,Oe=q,i.width=Math.floor(w*Fe),i.height=Math.floor(q*Fe),K===!0&&(i.style.width=w+"px",i.style.height=q+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,q)},this.getDrawingBufferSize=function(w){return w.set(ye*Fe,Oe*Fe).floor()},this.setDrawingBufferSize=function(w,q,K){ye=w,Oe=q,Fe=K,i.width=Math.floor(w*K),i.height=Math.floor(q*K),this.setViewport(0,0,w,q)},this.setEffects=function(w){if(C===Fa){sn("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let q=0;q<w.length;q++)if(w[q].isOutputPass===!0){Et("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ee)},this.getViewport=function(w){return w.copy(Ee)},this.setViewport=function(w,q,K,ne){w.isVector4?Ee.set(w.x,w.y,w.z,w.w):Ee.set(w,q,K,ne),Ie.viewport(ee.copy(Ee).multiplyScalar(Fe).round())},this.getScissor=function(w){return w.copy(We)},this.setScissor=function(w,q,K,ne){w.isVector4?We.set(w.x,w.y,w.z,w.w):We.set(w,q,K,ne),Ie.scissor(ge.copy(We).multiplyScalar(Fe).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(w){Ie.setScissorTest(st=w)},this.setOpaqueSort=function(w){ae=w},this.setTransparentSort=function(w){Me=w},this.getClearColor=function(w){return w.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(w=!0,q=!0,K=!0){let ne=0;if(w){let te=!1;if(Y!==null){const je=Y.texture.format;te=S.has(je)}if(te){const je=Y.texture.type,be=y.has(je),He=Ne.getClearColor(),tt=Ne.getClearAlpha(),Ze=He.r,ft=He.g,Ct=He.b;be?(N[0]=Ze,N[1]=ft,N[2]=Ct,N[3]=tt,X.clearBufferuiv(X.COLOR,0,N)):(I[0]=Ze,I[1]=ft,I[2]=Ct,I[3]=tt,X.clearBufferiv(X.COLOR,0,I))}else ne|=X.COLOR_BUFFER_BIT}q&&(ne|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(ne|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&X.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),W=w},this.dispose=function(){i.removeEventListener("webglcontextlost",we,!1),i.removeEventListener("webglcontextrestored",qe,!1),i.removeEventListener("webglcontextcreationerror",gt,!1),Ne.dispose(),me.dispose(),Re.dispose(),O.dispose(),Q.dispose(),Ue.dispose(),De.dispose(),fe.dispose(),ze.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Ja),Le.removeEventListener("sessionend",Hr),Xn.stop()};function we(w){w.preventDefault(),z_("WebGLRenderer: Context Lost."),k=!0}function qe(){z_("WebGLRenderer: Context Restored."),k=!1;const w=In.autoReset,q=Be.enabled,K=Be.autoUpdate,ne=Be.needsUpdate,te=Be.type;Xe(),In.autoReset=w,Be.enabled=q,Be.autoUpdate=K,Be.needsUpdate=ne,Be.type=te}function gt(w){sn("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Un(w){const q=w.target;q.removeEventListener("dispose",Un),en(q)}function en(w){Wn(w),O.remove(w)}function Wn(w){const q=O.get(w).programs;q!==void 0&&(q.forEach(function(K){ze.releaseProgram(K)}),w.isShaderMaterial&&ze.releaseShaderCache(w))}this.renderBufferDirect=function(w,q,K,ne,te,je){q===null&&(q=on);const be=te.isMesh&&te.matrixWorld.determinant()<0,He=ba(w,q,K,ne,te);Ie.setMaterial(ne,be);let tt=K.index,Ze=1;if(ne.wireframe===!0){if(tt=Te.getWireframeAttribute(K),tt===void 0)return;Ze=2}const ft=K.drawRange,Ct=K.attributes.position;let ot=ft.start*Ze,nn=(ft.start+ft.count)*Ze;je!==null&&(ot=Math.max(ot,je.start*Ze),nn=Math.min(nn,(je.start+je.count)*Ze)),tt!==null?(ot=Math.max(ot,0),nn=Math.min(nn,tt.count)):Ct!=null&&(ot=Math.max(ot,0),nn=Math.min(nn,Ct.count));const pt=nn-ot;if(pt<0||pt===1/0)return;De.setup(te,ne,He,K,tt);let xn,ln=lt;if(tt!==null&&(xn=pe.get(tt),ln=Bt,ln.setIndex(xn)),te.isMesh)ne.wireframe===!0?(Ie.setLineWidth(ne.wireframeLinewidth*Vt()),ln.setMode(X.LINES)):ln.setMode(X.TRIANGLES);else if(te.isLine){let an=ne.linewidth;an===void 0&&(an=1),Ie.setLineWidth(an*Vt()),te.isLineSegments?ln.setMode(X.LINES):te.isLineLoop?ln.setMode(X.LINE_LOOP):ln.setMode(X.LINE_STRIP)}else te.isPoints?ln.setMode(X.POINTS):te.isSprite&&ln.setMode(X.TRIANGLES);if(te.isBatchedMesh)if(Ut.get("WEBGL_multi_draw"))ln.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const an=te._multiDrawStarts,ke=te._multiDrawCounts,oi=te._multiDrawCount,Pt=tt?pe.get(tt).bytesPerElement:1,Cn=O.get(ne).currentProgram.getUniforms();for(let Gn=0;Gn<oi;Gn++)Cn.setValue(X,"_gl_DrawID",Gn),ln.render(an[Gn]/Pt,ke[Gn])}else if(te.isInstancedMesh)ln.renderInstances(ot,pt,te.count);else if(K.isInstancedBufferGeometry){const an=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ke=Math.min(K.instanceCount,an);ln.renderInstances(ot,pt,ke)}else ln.render(ot,pt)};function Li(w,q,K){w.transparent===!0&&w.side===Ks&&w.forceSinglePass===!1?(w.side=ia,w.needsUpdate=!0,nr(w,q,K),w.side=Br,w.needsUpdate=!0,nr(w,q,K),w.side=Ks):nr(w,q,K)}this.compile=function(w,q,K=null){K===null&&(K=w),L=Re.get(K),L.init(q),A.push(L),K.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),w!==K&&w.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),L.setupLights();const ne=new Set;return w.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const je=te.material;if(je)if(Array.isArray(je))for(let be=0;be<je.length;be++){const He=je[be];Li(He,K,te),ne.add(He)}else Li(je,K,te),ne.add(je)}),L=A.pop(),ne},this.compileAsync=function(w,q,K=null){const ne=this.compile(w,q,K);return new Promise(te=>{function je(){if(ne.forEach(function(be){O.get(be).currentProgram.isReady()&&ne.delete(be)}),ne.size===0){te(w);return}setTimeout(je,10)}Ut.get("KHR_parallel_shader_compile")!==null?je():setTimeout(je,10)})};let bs=null;function Ai(w){bs&&bs(w)}function Ja(){Xn.stop()}function Hr(){Xn.start()}const Xn=new vb;Xn.setAnimationLoop(Ai),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(w){bs=w,Le.setAnimationLoop(w),w===null?Xn.stop():Xn.start()},Le.addEventListener("sessionstart",Ja),Le.addEventListener("sessionend",Hr),this.render=function(w,q){if(q!==void 0&&q.isCamera!==!0){sn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;W!==null&&W.renderStart(w,q);const K=Le.enabled===!0&&Le.isPresenting===!0,ne=F!==null&&(Y===null||K)&&F.begin($,Y);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(q),q=Le.getCamera()),w.isScene===!0&&w.onBeforeRender($,w,q,Y),L=Re.get(w,A.length),L.init(q),L.state.textureUnits=M.getTextureUnits(),A.push(L),Xt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ut.setFromProjectionMatrix(Xt,ds,q.reversedDepth),Lt=this.localClippingEnabled,kt=Ge.init(this.clippingPlanes,Lt),V=me.get(w,B.length),V.init(),B.push(V),Le.enabled===!0&&Le.isPresenting===!0){const be=$.xr.getDepthSensingMesh();be!==null&&Pn(be,q,-1/0,$.sortObjects)}Pn(w,q,0,$.sortObjects),V.finish(),$.sortObjects===!0&&V.sort(ae,Me),vn=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,vn&&Ne.addToRenderList(V,w),this.info.render.frame++,kt===!0&&Ge.beginShadows();const te=L.state.shadowsArray;if(Be.render(te,w,q),kt===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ne&&F.hasRenderPass())===!1){const be=V.opaque,He=V.transmissive;if(L.setupLights(),q.isArrayCamera){const tt=q.cameras;if(He.length>0)for(let Ze=0,ft=tt.length;Ze<ft;Ze++){const Ct=tt[Ze];aa(be,He,w,Ct)}vn&&Ne.render(w);for(let Ze=0,ft=tt.length;Ze<ft;Ze++){const Ct=tt[Ze];tn(V,w,Ct,Ct.viewport)}}else He.length>0&&aa(be,He,w,q),vn&&Ne.render(w),tn(V,w,q)}Y!==null&&oe===0&&(M.updateMultisampleRenderTarget(Y),M.updateRenderTargetMipmap(Y)),ne&&F.end($),w.isScene===!0&&w.onAfterRender($,w,q),De.resetDefaultState(),U=-1,G=null,A.pop(),A.length>0?(L=A[A.length-1],M.setTextureUnits(L.state.textureUnits),kt===!0&&Ge.setGlobalState($.clippingPlanes,L.state.camera)):L=null,B.pop(),B.length>0?V=B[B.length-1]:V=null,W!==null&&W.renderEnd()};function Pn(w,q,K,ne){if(w.visible===!1)return;if(w.layers.test(q.layers)){if(w.isGroup)K=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(q);else if(w.isLightProbeGrid)L.pushLightProbeGrid(w);else if(w.isLight)L.pushLight(w),w.castShadow&&L.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ut.intersectsSprite(w)){ne&&Rt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Xt);const be=Ue.update(w),He=w.material;He.visible&&V.push(w,be,He,K,Rt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ut.intersectsObject(w))){const be=Ue.update(w),He=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Rt.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Rt.copy(be.boundingSphere.center)),Rt.applyMatrix4(w.matrixWorld).applyMatrix4(Xt)),Array.isArray(He)){const tt=be.groups;for(let Ze=0,ft=tt.length;Ze<ft;Ze++){const Ct=tt[Ze],ot=He[Ct.materialIndex];ot&&ot.visible&&V.push(w,be,ot,K,Rt.z,Ct)}}else He.visible&&V.push(w,be,He,K,Rt.z,null)}}const je=w.children;for(let be=0,He=je.length;be<He;be++)Pn(je[be],q,K,ne)}function tn(w,q,K,ne){const{opaque:te,transmissive:je,transparent:be}=w;L.setupLightsView(K),kt===!0&&Ge.setGlobalState($.clippingPlanes,K),ne&&Ie.viewport(ee.copy(ne)),te.length>0&&Rn(te,q,K),je.length>0&&Rn(je,q,K),be.length>0&&Rn(be,q,K),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function aa(w,q,K,ne){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[ne.id]===void 0){const ot=Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[ne.id]=new ps(1,1,{generateMipmaps:!0,type:ot?er:Fa,minFilter:mo,samples:Math.max(4,dn.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}const je=L.state.transmissionRenderTarget[ne.id],be=ne.viewport||ee;je.setSize(be.z*$.transmissionResolutionScale,be.w*$.transmissionResolutionScale);const He=$.getRenderTarget(),tt=$.getActiveCubeFace(),Ze=$.getActiveMipmapLevel();$.setRenderTarget(je),$.getClearColor(P),J=$.getClearAlpha(),J<1&&$.setClearColor(16777215,.5),$.clear(),vn&&Ne.render(K);const ft=$.toneMapping;$.toneMapping=hs;const Ct=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),L.setupLightsView(ne),kt===!0&&Ge.setGlobalState($.clippingPlanes,ne),Rn(w,K,ne),M.updateMultisampleRenderTarget(je),M.updateRenderTargetMipmap(je),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let nn=0,pt=q.length;nn<pt;nn++){const xn=q[nn],{object:ln,geometry:an,material:ke,group:oi}=xn;if(ke.side===Ks&&ln.layers.test(ne.layers)){const Pt=ke.side;ke.side=ia,ke.needsUpdate=!0,es(ln,K,ne,an,ke,oi),ke.side=Pt,ke.needsUpdate=!0,ot=!0}}ot===!0&&(M.updateMultisampleRenderTarget(je),M.updateRenderTargetMipmap(je))}$.setRenderTarget(He,tt,Ze),$.setClearColor(P,J),Ct!==void 0&&(ne.viewport=Ct),$.toneMapping=ft}function Rn(w,q,K){const ne=q.isScene===!0?q.overrideMaterial:null;for(let te=0,je=w.length;te<je;te++){const be=w[te],{object:He,geometry:tt,group:Ze}=be;let ft=be.material;ft.allowOverride===!0&&ne!==null&&(ft=ne),He.layers.test(K.layers)&&es(He,q,K,tt,ft,Ze)}}function es(w,q,K,ne,te,je){w.onBeforeRender($,q,K,ne,te,je),w.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),te.onBeforeRender($,q,K,ne,w,je),te.transparent===!0&&te.side===Ks&&te.forceSinglePass===!1?(te.side=ia,te.needsUpdate=!0,$.renderBufferDirect(K,q,ne,te,w,je),te.side=Br,te.needsUpdate=!0,$.renderBufferDirect(K,q,ne,te,w,je),te.side=Ks):$.renderBufferDirect(K,q,ne,te,w,je),w.onAfterRender($,q,K,ne,te,je)}function nr(w,q,K){q.isScene!==!0&&(q=on);const ne=O.get(w),te=L.state.lights,je=L.state.shadowsArray,be=te.state.version,He=ze.getParameters(w,te.state,je,q,K,L.state.lightProbeGridArray),tt=ze.getProgramCacheKey(He);let Ze=ne.programs;ne.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?q.environment:null,ne.fog=q.fog;const ft=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ne.envMap=Q.get(w.envMap||ne.environment,ft),ne.envMapRotation=ne.environment!==null&&w.envMap===null?q.environmentRotation:w.envMapRotation,Ze===void 0&&(w.addEventListener("dispose",Un),Ze=new Map,ne.programs=Ze);let Ct=Ze.get(tt);if(Ct!==void 0){if(ne.currentProgram===Ct&&ne.lightsStateVersion===be)return Es(w,He),Ct}else He.uniforms=ze.getUniforms(w),W!==null&&w.isNodeMaterial&&W.build(w,K,He),w.onBeforeCompile(He,$),Ct=ze.acquireProgram(He,tt),Ze.set(tt,Ct),ne.uniforms=He.uniforms;const ot=ne.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ot.clippingPlanes=Ge.uniform),Es(w,He),ne.needsLights=Ga(w),ne.lightsStateVersion=be,ne.needsLights&&(ot.ambientLightColor.value=te.state.ambient,ot.lightProbe.value=te.state.probe,ot.directionalLights.value=te.state.directional,ot.directionalLightShadows.value=te.state.directionalShadow,ot.spotLights.value=te.state.spot,ot.spotLightShadows.value=te.state.spotShadow,ot.rectAreaLights.value=te.state.rectArea,ot.ltc_1.value=te.state.rectAreaLTC1,ot.ltc_2.value=te.state.rectAreaLTC2,ot.pointLights.value=te.state.point,ot.pointLightShadows.value=te.state.pointShadow,ot.hemisphereLights.value=te.state.hemi,ot.directionalShadowMatrix.value=te.state.directionalShadowMatrix,ot.spotLightMatrix.value=te.state.spotLightMatrix,ot.spotLightMap.value=te.state.spotLightMap,ot.pointShadowMatrix.value=te.state.pointShadowMatrix),ne.lightProbeGrid=L.state.lightProbeGridArray.length>0,ne.currentProgram=Ct,ne.uniformsList=null,Ct}function ys(w){if(w.uniformsList===null){const q=w.currentProgram.getUniforms();w.uniformsList=Cf.seqWithValue(q.seq,w.uniforms)}return w.uniformsList}function Es(w,q){const K=O.get(w);K.outputColorSpace=q.outputColorSpace,K.batching=q.batching,K.batchingColor=q.batchingColor,K.instancing=q.instancing,K.instancingColor=q.instancingColor,K.instancingMorph=q.instancingMorph,K.skinning=q.skinning,K.morphTargets=q.morphTargets,K.morphNormals=q.morphNormals,K.morphColors=q.morphColors,K.morphTargetsCount=q.morphTargetsCount,K.numClippingPlanes=q.numClippingPlanes,K.numIntersection=q.numClipIntersection,K.vertexAlphas=q.vertexAlphas,K.vertexTangents=q.vertexTangents,K.toneMapping=q.toneMapping}function yo(w,q){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;D.setFromMatrixPosition(q.matrixWorld);for(let K=0,ne=w.length;K<ne;K++){const te=w[K];if(te.texture!==null&&te.boundingBox.containsPoint(D))return te}return null}function ba(w,q,K,ne,te){q.isScene!==!0&&(q=on),M.resetTextureUnits();const je=q.fog,be=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?q.environment:null,He=Y===null?$.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Qt.workingColorSpace,tt=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ze=Q.get(ne.envMap||be,tt),ft=ne.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ct=!!K.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),ot=!!K.morphAttributes.position,nn=!!K.morphAttributes.normal,pt=!!K.morphAttributes.color;let xn=hs;ne.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(xn=$.toneMapping);const ln=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,an=ln!==void 0?ln.length:0,ke=O.get(ne),oi=L.state.lights;if(kt===!0&&(Lt===!0||w!==G)){const Nt=w===G&&ne.id===U;Ge.setState(ne,w,Nt)}let Pt=!1;ne.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==oi.state.version||ke.outputColorSpace!==He||te.isBatchedMesh&&ke.batching===!1||!te.isBatchedMesh&&ke.batching===!0||te.isBatchedMesh&&ke.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&ke.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&ke.instancing===!1||!te.isInstancedMesh&&ke.instancing===!0||te.isSkinnedMesh&&ke.skinning===!1||!te.isSkinnedMesh&&ke.skinning===!0||te.isInstancedMesh&&ke.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&ke.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&ke.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&ke.instancingMorph===!1&&te.morphTexture!==null||ke.envMap!==Ze||ne.fog===!0&&ke.fog!==je||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Ge.numPlanes||ke.numIntersection!==Ge.numIntersection)||ke.vertexAlphas!==ft||ke.vertexTangents!==Ct||ke.morphTargets!==ot||ke.morphNormals!==nn||ke.morphColors!==pt||ke.toneMapping!==xn||ke.morphTargetsCount!==an||!!ke.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Pt=!0):(Pt=!0,ke.__version=ne.version);let Cn=ke.currentProgram;Pt===!0&&(Cn=nr(ne,q,te),W&&ne.isNodeMaterial&&W.onUpdateProgram(ne,Cn,ke));let Gn=!1,Hn=!1,hi=!1;const hn=Cn.getUniforms(),Nn=ke.uniforms;if(Ie.useProgram(Cn.program)&&(Gn=!0,Hn=!0,hi=!0),ne.id!==U&&(U=ne.id,Hn=!0),ke.needsLights){const Nt=yo(L.state.lightProbeGridArray,te);ke.lightProbeGrid!==Nt&&(ke.lightProbeGrid=Nt,Hn=!0)}if(Gn||G!==w){Ie.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),hn.setValue(X,"projectionMatrix",w.projectionMatrix),hn.setValue(X,"viewMatrix",w.matrixWorldInverse);const ka=hn.map.cameraPosition;ka!==void 0&&ka.setValue(X,rn.setFromMatrixPosition(w.matrixWorld)),dn.logarithmicDepthBuffer&&hn.setValue(X,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&hn.setValue(X,"isOrthographic",w.isOrthographicCamera===!0),G!==w&&(G=w,Hn=!0,hi=!0)}if(ke.needsLights&&(oi.state.directionalShadowMap.length>0&&hn.setValue(X,"directionalShadowMap",oi.state.directionalShadowMap,M),oi.state.spotShadowMap.length>0&&hn.setValue(X,"spotShadowMap",oi.state.spotShadowMap,M),oi.state.pointShadowMap.length>0&&hn.setValue(X,"pointShadowMap",oi.state.pointShadowMap,M)),te.isSkinnedMesh){hn.setOptional(X,te,"bindMatrix"),hn.setOptional(X,te,"bindMatrixInverse");const Nt=te.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),hn.setValue(X,"boneTexture",Nt.boneTexture,M))}te.isBatchedMesh&&(hn.setOptional(X,te,"batchingTexture"),hn.setValue(X,"batchingTexture",te._matricesTexture,M),hn.setOptional(X,te,"batchingIdTexture"),hn.setValue(X,"batchingIdTexture",te._indirectTexture,M),hn.setOptional(X,te,"batchingColorTexture"),te._colorsTexture!==null&&hn.setValue(X,"batchingColorTexture",te._colorsTexture,M));const pi=K.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&vt.update(te,K,Cn),(Hn||ke.receiveShadow!==te.receiveShadow)&&(ke.receiveShadow=te.receiveShadow,hn.setValue(X,"receiveShadow",te.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&q.environment!==null&&(Nn.envMapIntensity.value=q.environmentIntensity),Nn.dfgLUT!==void 0&&(Nn.dfgLUT.value=tC()),Hn){if(hn.setValue(X,"toneMappingExposure",$.toneMappingExposure),ke.needsLights&&za(Nn,hi),je&&ne.fog===!0&&ue.refreshFogUniforms(Nn,je),ue.refreshMaterialUniforms(Nn,ne,Fe,Oe,L.state.transmissionRenderTarget[w.id]),ke.needsLights&&ke.lightProbeGrid){const Nt=ke.lightProbeGrid;Nn.probesSH.value=Nt.texture,Nn.probesMin.value.copy(Nt.boundingBox.min),Nn.probesMax.value.copy(Nt.boundingBox.max),Nn.probesResolution.value.copy(Nt.resolution)}Cf.upload(X,ys(ke),Nn,M)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Cf.upload(X,ys(ke),Nn,M),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&hn.setValue(X,"center",te.center),hn.setValue(X,"modelViewMatrix",te.modelViewMatrix),hn.setValue(X,"normalMatrix",te.normalMatrix),hn.setValue(X,"modelMatrix",te.matrixWorld),ne.uniformsGroups!==void 0){const Nt=ne.uniformsGroups;for(let ka=0,Ss=Nt.length;ka<Ss;ka++){const ts=Nt[ka];fe.update(ts,Cn),fe.bind(ts,Cn)}}return Cn}function za(w,q){w.ambientLightColor.needsUpdate=q,w.lightProbe.needsUpdate=q,w.directionalLights.needsUpdate=q,w.directionalLightShadows.needsUpdate=q,w.pointLights.needsUpdate=q,w.pointLightShadows.needsUpdate=q,w.spotLights.needsUpdate=q,w.spotLightShadows.needsUpdate=q,w.rectAreaLights.needsUpdate=q,w.hemisphereLights.needsUpdate=q}function Ga(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return he},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(w,q,K){const ne=O.get(w);ne.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),O.get(w.texture).__webglTexture=q,O.get(w.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:K,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,q){const K=O.get(w);K.__webglFramebuffer=q,K.__useDefaultFramebuffer=q===void 0};const Ha=X.createFramebuffer();this.setRenderTarget=function(w,q=0,K=0){Y=w,he=q,oe=K;let ne=null,te=!1,je=!1;if(w){const He=O.get(w);if(He.__useDefaultFramebuffer!==void 0){Ie.bindFramebuffer(X.FRAMEBUFFER,He.__webglFramebuffer),ee.copy(w.viewport),ge.copy(w.scissor),Ae=w.scissorTest,Ie.viewport(ee),Ie.scissor(ge),Ie.setScissorTest(Ae),U=-1;return}else if(He.__webglFramebuffer===void 0)M.setupRenderTarget(w);else if(He.__hasExternalTextures)M.rebindTextures(w,O.get(w.texture).__webglTexture,O.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ft=w.depthTexture;if(He.__boundDepthTexture!==ft){if(ft!==null&&O.has(ft)&&(w.width!==ft.image.width||w.height!==ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(w)}}const tt=w.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(je=!0);const Ze=O.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ze[q])?ne=Ze[q][K]:ne=Ze[q],te=!0):w.samples>0&&M.useMultisampledRTT(w)===!1?ne=O.get(w).__webglMultisampledFramebuffer:Array.isArray(Ze)?ne=Ze[K]:ne=Ze,ee.copy(w.viewport),ge.copy(w.scissor),Ae=w.scissorTest}else ee.copy(Ee).multiplyScalar(Fe).floor(),ge.copy(We).multiplyScalar(Fe).floor(),Ae=st;if(K!==0&&(ne=Ha),Ie.bindFramebuffer(X.FRAMEBUFFER,ne)&&Ie.drawBuffers(w,ne),Ie.viewport(ee),Ie.scissor(ge),Ie.setScissorTest(Ae),te){const He=O.get(w.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+q,He.__webglTexture,K)}else if(je){const He=q;for(let tt=0;tt<w.textures.length;tt++){const Ze=O.get(w.textures[tt]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+tt,Ze.__webglTexture,K,He)}}else if(w!==null&&K!==0){const He=O.get(w.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,He.__webglTexture,K)}U=-1},this.readRenderTargetPixels=function(w,q,K,ne,te,je,be,He=0){if(!(w&&w.isWebGLRenderTarget)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let tt=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(tt=tt[be]),tt){Ie.bindFramebuffer(X.FRAMEBUFFER,tt);try{const Ze=w.textures[He],ft=Ze.format,Ct=Ze.type;if(w.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+He),!dn.textureFormatReadable(ft)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dn.textureTypeReadable(Ct)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=w.width-ne&&K>=0&&K<=w.height-te&&X.readPixels(q,K,ne,te,H.convert(ft),H.convert(Ct),je)}finally{const Ze=Y!==null?O.get(Y).__webglFramebuffer:null;Ie.bindFramebuffer(X.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(w,q,K,ne,te,je,be,He=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let tt=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(tt=tt[be]),tt)if(q>=0&&q<=w.width-ne&&K>=0&&K<=w.height-te){Ie.bindFramebuffer(X.FRAMEBUFFER,tt);const Ze=w.textures[He],ft=Ze.format,Ct=Ze.type;if(w.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+He),!dn.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dn.textureTypeReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,ot),X.bufferData(X.PIXEL_PACK_BUFFER,je.byteLength,X.STREAM_READ),X.readPixels(q,K,ne,te,H.convert(ft),H.convert(Ct),0);const nn=Y!==null?O.get(Y).__webglFramebuffer:null;Ie.bindFramebuffer(X.FRAMEBUFFER,nn);const pt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await vM(X,pt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,ot),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,je),X.deleteBuffer(ot),X.deleteSync(pt),je}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,q=null,K=0){const ne=Math.pow(2,-K),te=Math.floor(w.image.width*ne),je=Math.floor(w.image.height*ne),be=q!==null?q.x:0,He=q!==null?q.y:0;M.setTexture2D(w,0),X.copyTexSubImage2D(X.TEXTURE_2D,K,0,0,be,He,te,je),Ie.unbindTexture()};const Ln=X.createFramebuffer(),kr=X.createFramebuffer();this.copyTextureToTexture=function(w,q,K=null,ne=null,te=0,je=0){let be,He,tt,Ze,ft,Ct,ot,nn,pt;const xn=w.isCompressedTexture?w.mipmaps[je]:w.image;if(K!==null)be=K.max.x-K.min.x,He=K.max.y-K.min.y,tt=K.isBox3?K.max.z-K.min.z:1,Ze=K.min.x,ft=K.min.y,Ct=K.isBox3?K.min.z:0;else{const Nn=Math.pow(2,-te);be=Math.floor(xn.width*Nn),He=Math.floor(xn.height*Nn),w.isDataArrayTexture?tt=xn.depth:w.isData3DTexture?tt=Math.floor(xn.depth*Nn):tt=1,Ze=0,ft=0,Ct=0}ne!==null?(ot=ne.x,nn=ne.y,pt=ne.z):(ot=0,nn=0,pt=0);const ln=H.convert(q.format),an=H.convert(q.type);let ke;q.isData3DTexture?(M.setTexture3D(q,0),ke=X.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(M.setTexture2DArray(q,0),ke=X.TEXTURE_2D_ARRAY):(M.setTexture2D(q,0),ke=X.TEXTURE_2D),Ie.activeTexture(X.TEXTURE0),Ie.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,q.flipY),Ie.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),Ie.pixelStorei(X.UNPACK_ALIGNMENT,q.unpackAlignment);const oi=Ie.getParameter(X.UNPACK_ROW_LENGTH),Pt=Ie.getParameter(X.UNPACK_IMAGE_HEIGHT),Cn=Ie.getParameter(X.UNPACK_SKIP_PIXELS),Gn=Ie.getParameter(X.UNPACK_SKIP_ROWS),Hn=Ie.getParameter(X.UNPACK_SKIP_IMAGES);Ie.pixelStorei(X.UNPACK_ROW_LENGTH,xn.width),Ie.pixelStorei(X.UNPACK_IMAGE_HEIGHT,xn.height),Ie.pixelStorei(X.UNPACK_SKIP_PIXELS,Ze),Ie.pixelStorei(X.UNPACK_SKIP_ROWS,ft),Ie.pixelStorei(X.UNPACK_SKIP_IMAGES,Ct);const hi=w.isDataArrayTexture||w.isData3DTexture,hn=q.isDataArrayTexture||q.isData3DTexture;if(w.isDepthTexture){const Nn=O.get(w),pi=O.get(q),Nt=O.get(Nn.__renderTarget),ka=O.get(pi.__renderTarget);Ie.bindFramebuffer(X.READ_FRAMEBUFFER,Nt.__webglFramebuffer),Ie.bindFramebuffer(X.DRAW_FRAMEBUFFER,ka.__webglFramebuffer);for(let Ss=0;Ss<tt;Ss++)hi&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,O.get(w).__webglTexture,te,Ct+Ss),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,O.get(q).__webglTexture,je,pt+Ss)),X.blitFramebuffer(Ze,ft,be,He,ot,nn,be,He,X.DEPTH_BUFFER_BIT,X.NEAREST);Ie.bindFramebuffer(X.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(te!==0||w.isRenderTargetTexture||O.has(w)){const Nn=O.get(w),pi=O.get(q);Ie.bindFramebuffer(X.READ_FRAMEBUFFER,Ln),Ie.bindFramebuffer(X.DRAW_FRAMEBUFFER,kr);for(let Nt=0;Nt<tt;Nt++)hi?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Nn.__webglTexture,te,Ct+Nt):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Nn.__webglTexture,te),hn?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,pi.__webglTexture,je,pt+Nt):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,pi.__webglTexture,je),te!==0?X.blitFramebuffer(Ze,ft,be,He,ot,nn,be,He,X.COLOR_BUFFER_BIT,X.NEAREST):hn?X.copyTexSubImage3D(ke,je,ot,nn,pt+Nt,Ze,ft,be,He):X.copyTexSubImage2D(ke,je,ot,nn,Ze,ft,be,He);Ie.bindFramebuffer(X.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else hn?w.isDataTexture||w.isData3DTexture?X.texSubImage3D(ke,je,ot,nn,pt,be,He,tt,ln,an,xn.data):q.isCompressedArrayTexture?X.compressedTexSubImage3D(ke,je,ot,nn,pt,be,He,tt,ln,xn.data):X.texSubImage3D(ke,je,ot,nn,pt,be,He,tt,ln,an,xn):w.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,je,ot,nn,be,He,ln,an,xn.data):w.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,je,ot,nn,xn.width,xn.height,ln,xn.data):X.texSubImage2D(X.TEXTURE_2D,je,ot,nn,be,He,ln,an,xn);Ie.pixelStorei(X.UNPACK_ROW_LENGTH,oi),Ie.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Pt),Ie.pixelStorei(X.UNPACK_SKIP_PIXELS,Cn),Ie.pixelStorei(X.UNPACK_SKIP_ROWS,Gn),Ie.pixelStorei(X.UNPACK_SKIP_IMAGES,Hn),je===0&&q.generateMipmaps&&X.generateMipmap(ke),Ie.unbindTexture()},this.initRenderTarget=function(w){O.get(w).__webglFramebuffer===void 0&&M.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?M.setTextureCube(w,0):w.isData3DTexture?M.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?M.setTexture2DArray(w,0):M.setTexture2D(w,0),Ie.unbindTexture()},this.resetState=function(){he=0,oe=0,Y=null,Ie.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ds}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Qt._getUnpackColorSpace()}}const Nv={type:"change"},Dm={type:"start"},wb={type:"end"},_f=new db,Ov=new Ir,iC=Math.cos(70*EM.DEG2RAD),xi=new ie,na=2*Math.PI,An={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yp=1e-6;class aC extends rT{constructor(e,i=null){super(e,i),this.state=An.NONE,this.target=new ie,this.cursor=new ie,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yl.ROTATE,MIDDLE:yl.DOLLY,RIGHT:yl.PAN},this.touches={ONE:bl.ROTATE,TWO:bl.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ie,this._lastQuaternion=new zr,this._lastTargetPosition=new ie,this._quat=new zr().setFromUnitVectors(e.up,new ie(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new av,this._sphericalDelta=new av,this._scale=1,this._panOffset=new ie,this._rotateStart=new Ht,this._rotateEnd=new Ht,this._rotateDelta=new Ht,this._panStart=new Ht,this._panEnd=new Ht,this._panDelta=new Ht,this._dollyStart=new Ht,this._dollyEnd=new Ht,this._dollyDelta=new Ht,this._dollyDirection=new ie,this._mouse=new Ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=rC.bind(this),this._onPointerDown=sC.bind(this),this._onPointerUp=oC.bind(this),this._onContextMenu=pC.bind(this),this._onMouseWheel=uC.bind(this),this._onKeyDown=fC.bind(this),this._onTouchStart=dC.bind(this),this._onTouchMove=hC.bind(this),this._onMouseDown=lC.bind(this),this._onMouseMove=cC.bind(this),this._interceptControlDown=mC.bind(this),this._interceptControlUp=gC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nv),this.update(),this.state=An.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;xi.copy(i).sub(this.target),xi.applyQuaternion(this._quat),this._spherical.setFromVector3(xi),this.autoRotate&&this.state===An.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=na:s>Math.PI&&(s-=na),l<-Math.PI?l+=na:l>Math.PI&&(l-=na),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(xi.setFromSpherical(this._spherical),xi.applyQuaternion(this._quatInverse),i.copy(this.target).add(xi),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=xi.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ie(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ie(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=xi.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(_f.origin.copy(this.object.position),_f.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_f.direction))<iC?this.object.lookAt(this.target):(Ov.setFromNormalAndCoplanarPoint(this.object.up,this.target),_f.intersectPlane(Ov,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>yp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yp||this._lastTargetPosition.distanceToSquared(this.target)>yp?(this.dispatchEvent(Nv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?na/60*this.autoRotateSpeed*e:na/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){xi.setFromMatrixColumn(i,0),xi.multiplyScalar(-e),this._panOffset.add(xi)}_panUp(e,i){this.screenSpacePanning===!0?xi.setFromMatrixColumn(i,1):(xi.setFromMatrixColumn(i,0),xi.crossVectors(this.object.up,xi)),xi.multiplyScalar(e),this._panOffset.add(xi)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;xi.copy(l).sub(this.target);let c=xi.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(na*this._rotateDelta.x/i.clientHeight),this._rotateUp(na*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(na*this._rotateDelta.x/i.clientHeight),this._rotateUp(na*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Ht,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function sC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function rC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function oC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wb),this.state=An.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function lC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case yl.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=An.DOLLY;break;case yl.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=An.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=An.ROTATE}break;case yl.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=An.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=An.PAN}break;default:this.state=An.NONE}this.state!==An.NONE&&this.dispatchEvent(Dm)}function cC(r){switch(this.state){case An.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case An.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case An.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function uC(r){this.enabled===!1||this.enableZoom===!1||this.state!==An.NONE||(r.preventDefault(),this.dispatchEvent(Dm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(wb))}function fC(r){this.enabled!==!1&&this._handleKeyDown(r)}function dC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case bl.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=An.TOUCH_ROTATE;break;case bl.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=An.TOUCH_PAN;break;default:this.state=An.NONE}break;case 2:switch(this.touches.TWO){case bl.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=An.TOUCH_DOLLY_PAN;break;case bl.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=An.TOUCH_DOLLY_ROTATE;break;default:this.state=An.NONE}break;default:this.state=An.NONE}this.state!==An.NONE&&this.dispatchEvent(Dm)}function hC(r){switch(this._trackPointer(r),this.state){case An.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case An.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case An.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case An.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=An.NONE}}function pC(r){this.enabled!==!1&&r.preventDefault()}function mC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Dv=({imageSrc:r,height:e=200})=>{const i=Ce.useRef(null);return Ce.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new PM,c=75,f=s.clientWidth/s.clientHeight,h=new Pa(c,f,.1,1100);h.position.set(0,0,.1);const m=new nC({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new aC(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const _=new iT;let v=null;_.load(r,y=>{y.mapping=Sf,y.colorSpace=_a;const N=new Nm(500,60,40);N.scale(-1,1,1);const I=new Cm({map:y});v=new xs(N,I),l.add(v)});let g=c;const E=y=>{y.preventDefault();const N=y.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",E,{passive:!1});const T=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});T.observe(s);let C=null;const S=()=>{C=requestAnimationFrame(S),p.update(),m.render(l,h)};return S(),()=>{cancelAnimationFrame(C),T.disconnect(),s.removeEventListener("wheel",E),v&&(v.geometry.dispose(),v.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),x.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Lv=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=Ce.useState(""),[f,h]=Ce.useState("");if(Ce.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",_=s==="openai",v=p,g=l.trim().startsWith("sk-"),E=_?"OpenAI API Key が必要です":v?"AI Engine を選択":"API Key が必要です",T=v?"Gemini AI Key または OpenAI Key (sk-...) を入力...":_?"sk-proj-...":"Google AI API Key を入力...",C="https://aistudio.google.com/app/apikey",S="https://platform.openai.com/api-keys",y=_?S:C,N=_?"🔑 OpenAI キーを取得":"🔑 キーを取得",I=v&&g||_?"emerald":"blue",D=I==="emerald"?"bg-emerald-600":"bg-blue-600",V=I==="emerald"?"border-emerald-500/30":"border-blue-500/30",L=I==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=I==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",A=I==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=I==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return x.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:x.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:x.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${V} rounded-xl shadow-2xl ${L} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&x.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),x.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[x.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[x.jsx("div",{className:`p-2 ${D} rounded-lg animate-pulse transition-colors duration-300`,children:x.jsx(vf,{size:18,className:"text-white"})}),x.jsxs("div",{children:[x.jsx("p",{className:"text-sm font-bold text-white",children:E}),x.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),x.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[x.jsx("div",{className:"flex gap-2",children:x.jsxs("form",{onSubmit:$=>{$.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[x.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:$=>c($.target.value),placeholder:T,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${A} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:$=>$.key==="Enter"&&m(),autoFocus:!0}),x.jsx("button",{onClick:m,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&x.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),v?x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&x.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),x.jsxs("div",{className:"flex items-center gap-4",children:[x.jsx("a",{href:C,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),x.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),x.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):x.jsx("div",{className:"flex justify-end",children:x.jsx("a",{href:y,target:"_blank",rel:"noreferrer",className:`text-[11px] ${I==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class xC extends Qy.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?x.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[x.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",fo,")"]}),x.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),x.jsx("br",{}),this.state.errorInfo?.componentStack]}),x.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}console.log("HELLO_USER_FIXED_VERSION_2_25");function _C(){console.log("System Version Loaded:",fo);const[r,e]=Ce.useState(""),[i,s]=Ce.useState(!1),[l,c]=Ce.useState("gemini"),[f,h]=Ce.useState("news"),[m,p]=Ce.useState(""),[_,v]=Ce.useState(""),[g,E]=Ce.useState(""),[T,C]=Ce.useState(""),[S,y]=Ce.useState(""),[N,I]=Ce.useState(""),[D,V]=Ce.useState("Auto"),[L,B]=Ce.useState(NS),A=de=>{B(ct=>ct.map(at=>at.id===de?{...at,checked:!at.checked}:at))},F=()=>{const de=new Date;return de.setHours(de.getHours()+9),de.toISOString().split("T")[0]},[$,k]=Ce.useState(F()),[W,he]=Ce.useState(""),[oe,Y]=Ce.useState(""),[U,G]=Ce.useState(""),[ee,ge]=Ce.useState(""),[Ae,P]=Ce.useState(null),[J,ye]=Ce.useState(!1);Ce.useEffect(()=>{const de=xm();de?(yf(de),e(de)):s(!0)},[]);const[Oe,Fe]=Ce.useState([]),[ae,Me]=Ce.useState(!1),[Ee,We]=Ce.useState(!1),[st,ut]=Ce.useState(!1),[kt,Lt]=Ce.useState(!1),[Xt,rn]=Ce.useState(!1),[Rt,on]=Ce.useState(""),[vn,Vt]=Ce.useState(""),[X,Jt]=Ce.useState(""),[Ut,dn]=Ce.useState(""),[Ie,In]=Ce.useState("auto"),[O,M]=Ce.useState(!1),[Q,pe]=Ce.useState([]),[Te,Ue]=Ce.useState(""),[ze,ue]=Ce.useState(!1),[me,Re]=Ce.useState(""),[Ge,Be]=Ce.useState(!1),[Ne,vt]=Ce.useState(!1),[lt,Bt]=Ce.useState(!1),[H,De]=Ce.useState(!1),[fe,Xe]=Ce.useState(!1),[Le,we]=Ce.useState(!1),[qe,gt]=Ce.useState(!1),[Un,en]=Ce.useState(!1),[Wn,Li]=Ce.useState(!1),[bs,Ai]=Ce.useState(""),[Ja,Hr]=Ce.useState(!1),[Xn,Pn]=Ce.useState(""),[tn,aa]=Ce.useState(!1),[Rn,es]=Ce.useState(!1),[nr,ys]=Ce.useState(!1),[Es,yo]=Ce.useState(""),[ba,za]=Ce.useState(!1),[Ga,Ha]=Ce.useState(!1),[Ln,kr]=Ce.useState(!1),[w,q]=Ce.useState(!1),[K,ne]=Ce.useState(null),[te,je]=Ce.useState(null),[be,He]=Ce.useState(null),[tt,Ze]=Ce.useState(!1),[ft,Ct]=Ce.useState(""),[ot,nn]=Ce.useState(!1),[pt,xn]=Ce.useState(!1),[ln,an]=Ce.useState(null),[ke,oi]=Ce.useState(null),[Pt,Cn]=Ce.useState(!1),[Gn,Hn]=Ce.useState(!1),[hi,hn]=Ce.useState(!1),Nn=Ce.useRef(!1),[pi,Nt]=Ce.useState(0),[ka,Ss]=Ce.useState(0),[ts,sa]=Ce.useState(0),ki=Ce.useRef(!1),[Va,Ii]=Ce.useState(!1),Ms=Ce.useRef(null),Nl=Ce.useRef(null),Ol=Ce.useRef(null),Dl=Ce.useRef(null),ns=Ce.useRef(null);Ce.useEffect(()=>{ns.current&&(ns.current.scrollTop=ns.current.scrollHeight)},[Q]),st||!W||W.length<20||!oe||oe.length<20;const[yi,ya]=Ce.useState(""),[Ts,ra]=Ce.useState([]),Ll=de=>{const ct=de.replace(/[^\u0000-\u007F]/g,"").trim();ct!==de&&bt("APIキーに含まれる不要な文字を自動削除しました。"),ct.startsWith("sk-")?(Gh(ct),Hh("openai"),c("openai"),es(!0),aa(!0),e("openai-engine-active"),s(!1),bt("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(yf(ct),e(ct),Hh("gemini"),c("gemini"),s(!1),bt("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},bt=de=>{dn(de),setTimeout(()=>dn(""),4e3)},Eo=async de=>{if(!r){bt("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(de.length===0)return;Me(!0),on(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let ct=0;const at=setInterval(()=>{ct++,on(Je=>{if(ct<=10){const dt=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return Je+dt[Math.floor(Math.random()*dt.length)]}const Ve=`
> ⏳ AI応答を待機中... (${Math.floor(ct*.8)}秒経過)`,Se=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Se.test(Je)?Je.replace(Se,"")+Ve:Je+Ve})},800),yt=[];let St=null;for(let Je=0;Je<de.length;Je++){const Pe=de[Je],Ve=await new Promise(dt=>{const _n=new FileReader;_n.onload=Vi=>{const wo=Vi.target.result,Jn=new Uint8Array(wo);let jt=!1;const ji="equirectangular";let qi=0;for(let Fn=0;Fn<Math.min(Jn.length,65536);Fn++)if(Jn[Fn]===ji.charCodeAt(qi)){if(qi++,qi===ji.length){jt=!0;break}}else qi=0;const $i=new Image;$i.onload=()=>{const Fn=$i.naturalWidth/$i.naturalHeight,ei=Math.abs(Fn-2)<.15;dt(ei&&jt)},$i.onerror=()=>dt(!1),$i.src=URL.createObjectURL(Pe)};const pn=Pe.slice(0,65536);_n.readAsArrayBuffer(pn)}),Se=new FileReader;Se.readAsDataURL(Pe),await new Promise(dt=>{Se.onload=()=>{Ve&&!St?(St={base64:Se.result,mimeType:Pe.type},on(_n=>_n+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(yt.push(Se.result),Fe(_n=>[..._n,Se.result])),dt()}})}if(St)try{xn(!0),ne(St.base64);const Je=St.base64.split(",")[1],Pe={inlineData:{mimeType:St.mimeType,data:Je}};je(Pe),Ze(!0),on(dt=>dt+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const Ve=await ro(US(),[Pe],null,()=>{}),Se=PS(Ve.text);He(Se),E(Se.location),bt(`🌐 360°背景を検出: ${Se.location}`),on(dt=>dt+`
> 🌐 空間解析完了: ${Se.location}`)}catch(Je){console.warn("[360° BG] Analysis failed:",Je),He({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),E("360°パノラマ画像（解析失敗）")}finally{Ze(!1)}if(yt.length===0&&St){clearInterval(at),Me(!1),on(Je=>Je+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),bt("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(yt.length===0){clearInterval(at),Me(!1);return}bt(`思考モード: ${yt.length}枚のキャラクター設定画を同時解析中...${St?"（+ 360°背景1枚検出済み）":""}`);try{const Je=yt.map(Se=>{const dt=Se.split(",")[1];return{inlineData:{mimeType:Se.split(";")[0].split(":")[1],data:dt}}}),Pe=FS(),Ve=await ro(Pe,Je,null,Se=>{on(dt=>dt+`
> ${Se}`)});he(Ve.text),P(Ve.model),on(Se=>{const dt=`

--- ✅ 解析完了 ---
`,_n=Ve.thought&&Ve.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${Ve.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return Se+dt+_n}),bt("全キャラクターの解析が完了しました。"),Gn&&(ki.current?(Hn(!1),Nt(0),Ii(!1),bt("⏹ フルオートを中断しました。")):sa(Se=>Se+1))}catch(Je){console.error(Je);const Pe=kh(Je.message);on(Ve=>Ve+`

[システムエラー]: ${Je.message}
--------------------------------------------------
${Pe}`),bt("解析エラー: "+Je.message),Gn&&(Hn(!1),Nt(0),Ii(!1))}finally{clearInterval(at),Me(!1)}},So=async()=>{if(!oe||oe.length<20)return bt("先にシナリオを生成してください。");if(!(Ne||lt||H||fe||Le||qe||Un))return bt("少なくとも1つの強化カテゴリをONにしてください。");if(Wn)return;Li(!0),Ai("> [START] シナリオ強化を開始します..."),Xn||(Pn(oe),Ai(Je=>Je+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const ct=[];Ne&&ct.push(`【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。
【マンガ表情データベース】
・驚愕・絶望系：瞳孔を開く、白目になる、顔に斜線の影（青ざめる）、滝のような冷や汗、口を大きく開けて震える、髪の毛が逆立ち限界まで見開いた目
・激怒系：額に青筋（血管マーク）、白目のない黒目だけの鋭い眼光、歯を食いしばる、瞳に炎が宿る、顔が真っ赤になり湯気が出る
・歓喜・興奮系：目をキラキラ輝かせる（星マーク）、頬を赤らめる、とろけたような笑顔、鼻息が荒い、顔のパーツが画面からはみ出るほどの満面の笑み
・狂気・シュール系：光の消えたハイライト無しの瞳、不気味な三日月型の笑顔、無表情（点目）で真顔、虚無の目
・泣き系：滝のように噴き出す涙、目尻に涙を浮かべてうるうるさせる、顔をくしゃくしゃにして号泣

微笑みや軽い驚きのような控えめな表現は絶対に禁止し、常軌を逸した激しいリアクションに書き換えてください。

⚠️【セリフ保護ルール - 絶対厳守】⚠️
表情の強化描写は必ず「状況」欄（Visual Action / ト書き）にのみ記述すること。
「」で囲まれたセリフ（Speech Bubble内の台詞テキスト）には、表情の描写文を絶対に書き込まないこと。
セリフ欄には元のセリフをそのまま残すか、セリフとして自然な短い発言のみを書くこと。
悪い例: Speech Bubble 1: "顔が真っ赤になり湯気が出るように…" ← これは描写文であってセリフではない。禁止。
良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。`),lt&&ct.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。"),H&&ct.push(`【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。
⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:
- sparkling light particles → 代わりに soft glow を使え
- glowing dust → 代わりに clean bloom を使え
- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え
- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え`),fe&&ct.push(`【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。
- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。
- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。
- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。
- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。
- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。`),Le&&ct.push(`【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。
- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）
- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）
- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）
- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）
- 引き/ロングショット（宇宙や上空からの空気感）
- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）
⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。
4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。`),qe&&ct.push(`【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。

■ ズレを作る技法（以下から最低2つ適用せよ）:
- 【置換】状況や出来事を全く別の文脈に言い換えてセリフを書き直す（例: 深刻な会議 → 小学生の給食会議のようなセリフに）
- 【誇張】リアクションや感情を極限まで増幅する。「驚く」→「魂が肉体から離脱するレベルで驚愕」
- 【逆転】キャラの普段の立場・力関係を入れ替えたセリフにする（普段クールなキャラが取り乱す、普段バカなキャラが正論を言う等）
- 【不条理】脈絡のない狂った要素を堂々とセリフに混ぜる。多少意味不明でも勢いで笑えればOK
- 【緊張と緩和】3コマ目まで空気を極限まで張り詰めるセリフにし、4コマ目で完全崩壊させる
- 【常識に戻る】全員が暴走する中、1人だけ冷静に「いや普通に考えておかしいだろ」と常識を提示する

■ ズレを見せる構成技法:
- 【フリ】1コマ目のセリフは「普通の予想」を作る前置き。ここでは笑わせなくてよい
- 【ボケ】2コマ目でズレた発言を投入し「あれ？」と思わせる
- 【ツッコミ】ボケで生まれたズレを鋭い一言で指摘して笑いを明確化する。弱い定型ツッコミは禁止、状況に即した具体的な叫び声にせよ
- 【オチ】4コマ目でズレを確定し笑いを完成。全エネルギーをここに集中投下
- 【天丼】1コマ目の小ネタを3コマ目で形を変えて再登場させ、4コマ目で爆発させる（4コマでは最強テクニック）
- 【ノリツッコミ】ツッコミ役が一旦ボケに乗っかってから「いや待てよ！」と自分で崩す
- 【かぶせ】ボケの直後にさらにもう一段ボケを重ねて畳み掛ける

■ セリフの質的ルール:
- セリフは短く鋭く。だらだら説明するセリフは削って、一言で致命傷を与えるセリフにする
- 可能なら言葉遊び、ダブルミーニング、予想の裏切りを仕込む
- 全てのセリフに笑いを無理に入れず、笑いの最大ポイントをオチに集中させる
- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ`),Ai(Je=>Je+`
> [CONFIG] 強化カテゴリ: ${ct.length}個`);let at=0;const yt=setInterval(()=>{at++,Ai(Je=>{if(at<=5){const dt=[`
> [PROCESS] 演出データベースを参照中...`,`
> [PROCESS] 感情ベクトルを計算中...`,`
> [PROCESS] 表現パターンを最適化中...`];return Je+dt[Math.floor(Math.random()*dt.length)]}const Ve=`
> ⏳ AI応答を待機中... (${Math.floor(at*.8)}秒経過)`,Se=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Se.test(Je)?Je.replace(Se,"")+Ve:Je+Ve})},800),St=BS(oe,ct);try{Ai(Pe=>Pe+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const Je=await ro(St,[],W,Pe=>{Ai(Ve=>Ve+`
> [API] ${Pe}`)});Je&&Je.text&&Je.text.length>50?(Y(Je.text.trim()),Ai(Pe=>Pe+`
> [SUCCESS] シナリオを強化しました！（${Je.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),vt(!1),Bt(!1),De(!1),Xe(!1),we(!1),gt(!1),en(!1),bt("シナリオ強化完了！")):(Ai(Pe=>Pe+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),bt("強化失敗: AIの応答が不十分です"))}catch(Je){Ai(Pe=>Pe+`
> [ERROR] ${Je.message}`),bt("強化エラー: "+Je.message)}finally{clearInterval(yt),Li(!1)}},Mo=()=>{Xn&&(Y(Xn),Pn(""),Ai(de=>de+`
> [REVERT] 元のシナリオに復元しました。`),bt("シナリオを元に戻しました"))},Il=async de=>{if(!W)return bt("先にキャラクターを解析してください。");if(Ee)return;const ct=Array.isArray(de)?de:L;if(f==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(f==="news"&&!ct.find(Pe=>Pe.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}We(!0),Vt(""),ge(""),ya(null),Jt(""),pe([]),Pn(""),Ai("");let at="";if(f==="manual")at="手動入力",Y(""),Vt(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const Pe=ct.filter(Ve=>Ve.checked);Pe.length>0?(at=Pe.map(Ve=>Ve.keywords).join(" "),bt(`カテゴリ「${Pe.map(Ve=>Ve.label).join("・")}」で最新ニュースを検索中... (${$})`),Y(""),Vt(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Pe.map(Ve=>Ve.label).join("、")} (キーワード: ${at}) 
 > 対象日付: ${$} 
 > Google Grounding で検索中...`)):at="最新ニュース"}const yt=`${at} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let St=0;const Je=setInterval(()=>{St++,Vt(Pe=>{if(St<=8){const _n=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Pe+_n[Math.floor(Math.random()*_n.length)]}const Se=`
> ⏳ AI応答を待機中... (${Math.floor(St*.8)}秒経過)`,dt=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return dt.test(Pe)?Pe.replace(dt,"")+Se:Pe+Se})},800);try{let Pe="";if(f==="manual"){Pe=`
         【ユーザー提供トピック/URL】:
         ${m}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;const kn=/(https?:\/\/[^\s]+)/g,Ui=m.match(kn);if(Ui&&Ui.length>0){Vt(`> 手動入力内にURLを検出: ${Ui[0]} 
> プロキシ経由でコンテンツを取得中...`);try{const Si=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(Ui[0])}`);if(!Si.ok)throw new Error(`HTTP error! status: ${Si.status}`);const Vn=await Si.text(),ni=new DOMParser().parseFromString(Vn,"text/html");ni.querySelectorAll("script, style").forEach(wi=>wi.remove());const At=ni.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let On="";At.forEach(wi=>{wi.textContent.trim()&&(On+=wi.textContent.trim()+`
`)}),On.trim()||(On=ni.body.textContent||"");const Xi=On.replace(/\s+/g," ").substring(0,3e3);Vt(wi=>wi+`
> コンテンツ抽出完了 (${Xi.length}文字)。注入中...`),Pe=`
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${Xi}
             
             (指示): 上記はユーザーが入力したURL（ ${Ui[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `}catch(Si){console.error("URL Fetch Error: ",Si),Vt(Vn=>Vn+`
> 警告: URLコンテンツの取得に失敗しました (${Si.message})。LLMの内部知識で補完します。`)}}}const Ve=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園のベンチ","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],Se=Ve[Math.floor(Math.random()*Ve.length)];console.log("Forced Location:",Se);const dt=K&&be&&pt?be.location:g.trim()?g.trim():Se,_n=RS(dt),pn=CS(),Vi=`
        【Context Force Reboot】
        Ignore all previous instructions and conversation history.This is a fresh, standalone session.
        (ABSOLUTE PROHIBITION: Repeating topics from the past.You MUST select a FRESH, UNIQUE topic).
        (Topic Lock): Focus strictly on the category: "${at}".
        (Time Machine Lock): The target date is **${$}**. You MUST search for news/events that happened AROUND this date.
        (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

    あなたはプロの風刺漫画脚本家です。
        
        ${f==="manual"?`「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。
 トピック: ${m}

${Pe}`:`「${yt}」に関する、** 指定された日付（${$}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`}

        【選定ルールの絶対厳守】

   1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
    2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
         （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
   3.  抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
   4. **【場所（Location）の選定義務】**:
      - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
      - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
       
       ${K&&be&&pt?`
       4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
           - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
           - AI解析結果: 場所=「${be.location}」、光源=「${be.lighting}」、特徴物=「${be.objects||"なし"}」、雰囲気=「${be.mood||"不明"}」
           - **【カメラワーク・フロアプラン制約】**:
             * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
             * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
           - **【ライティング整合性】**:
             * 各コマのキャラクター描写において、光源方向「${be.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
           - **【背景の部分使用の許可】**:
             * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
             * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
       `:""}
       4. **【強制舞台指定 (Location Lock)】**:
          - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
          - **指定場所: 「${K&&be&&pt?be.location:g.trim()?g.trim():"ニュース内容に即した場所"}」**
          - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
          ${T.trim()?`
       5. **【強制服装指定 (Outfit Lock)】**:
          - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${T.trim()}』に変更して描写・行動させよ。
          - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
          `:`
       5. **【服装の自動選定 (Outfit Auto-Select)】**:
          - ニュースの内容と場所(Location)に**「最も適した服装カテゴリー」**を選定し、Outfit行に出力せよ。
          - **「キャラシート準拠」「デフォルト」等の曖昧な回答は禁止。** 必ず状況に適した服装の「属性」を出力すること。
          - 例: 海辺→「水着（swimwear）」、法廷→「ビジネススーツ（business suit）」、道の駅→「私服（casual wear）」、雪山→「防寒着（winter clothes）」、宇宙→「宇宙服（spacesuit）」
          - **⚠️【重要: クローン化防止】⚠️** 「白のビキニ」「デニムショートパンツ」のように細かく指定しすぎないこと。細かく指定すると全キャラクターが全く同じ服を着てしまうため、必ず**大分類のカテゴリー（ナース服、私服、パジャマなど）**に留め、個々の着こなしは画像AIに委ねよ。
          - 画像生成プロンプトでも選定した服装タグが反映される前提で、シナリオ内のト書き(Action)テキストにもその服装に基づく自然な描写を含めること。
          `}

       6. **【環境・リアクションのディテール注入 (Local RAG)】**:
          以下のデータベースを参照し、指定された場所の小道具や環境、感情に応じた限界突破リアクションを、**シナリオのト書き(Action)に必ず組み込んで描写**せよ。AI特有の抽象的な表現は禁止する。
          
          ${_n}
          
          ${pn}

         【シナリオ構成・演出の絶対厳守 (v2.99 Alpha)】
          0. **全員登場義務 (Mandatory All-Cast)**:
             - CastListに含まれている **全てのキャラクターを必ず1回以上登場させること。**
             - 「メイン2人だけで4コマ全部回す」のような手抜きは禁止。全員に役割を与え、画面を賑やかにすること。
             - **【人数バラエティの義務】**: 4コマで「話者数」を以下のルールで割り振れ:
              ・話者1人のコマ（独白・リアクションショット）を**最低1つ**含めること
              ・話者2人のコマ（掛け合い会話）を**最低1つ**含めること
              ・残り2コマは話者1〜3人を自由に割り当てよ
              ・**4コマ中3コマ以上が同じ話者数になるのは禁止**
              ・CastListの全員が4コマのどこかに最低1回は登場すれば良い（全コマに全員出す必要はない）。
             - **【キャラ設定の完全保持】**: 提供された各キャラクターの属性（例: ギャル、オタク、優等生、ツッコミ役など）や固有の口調を絶対に混同するな。「Aキャラクター」と「Bキャラクター」の口調や性格が入れ替わるなどのエラーを厳格に禁止する。与えられた文字情報（性格設定）に完全に忠実なセリフを書け。
             - **【キャラクター知識境界の遵守 (Knowledge Boundary Lock)】**:
               * 各キャラクターのセリフを書く前に、そのキャラが「何を知っていて、何を知らないか」を確認せよ。
               * CastListの性格設定に「オタク」とあるキャラに政治の専門知識を喋らせたり、「天然」キャラに論理的な分析をさせたりするのは、意図的な逆転ギャグでない限り禁止。
               * あるコマで起きた出来事を、別のコマで「その場にいなかったキャラ」が知っている前提で反応させるのは禁止（伝聞や目撃の描写がない限り）。
               * **ただし「知らない＝登場禁止」ではない。** 知らないなりのリアクション（「えー、なにそれー？」「さっぱり分かんない！」等）で登場させ、全員登場義務と両立させよ。
                * **目的**: キャラの「らしさ」を守り、AIが全キャラを同質化させるハルシネーションを防止する。
 
         1. **「原則: 語るな、見せろ (Show, Don't Tell)」のギャグ特化**:
             - 絵での表現が最優先。説明調のセリフは厳禁。読者の読む気を削ぐな。
             - **【サブテキスト（建前と本音のズレ）の強制】**: 状況をそのまま説明するセリフを完全禁止する。セリフを「建前」や「全く別の話題」にし、絵（ト書き・表情）と矛盾させる（例: 大汗をかいて震えながら「今日の夕飯、ハンバーグでいいかな？」と言う等）ことで、ギャグマンガ特有のシュールな笑いや「間」を演出せよ。
             - **【物理・身体変形アクションの強制】**: 感情のト書きは、具体的な物理アクションに変換せよ。「驚く」ではなく「髪の毛が逆立ち口から魂が抜ける」、「怒る」ではなく「顔から湯気を出して持っている物を手放す」等、画像生成AIが拾いやすい視覚的ダイナミズムを強制せよ。
            - **【構図ルール】ト書き（状況の説明）では、主役の動作を中心に記述しつつ、同じコマにいる他キャラのリアクションや存在も簡潔に描写してよい。** 例: 「アカリがツッコむ。横でリンが呆れ、奥でサエコが爆笑している」のような群像描写は大歓迎。ただし1キャラあたりの描写は1文以内に留め、冗長にならないこと。同じ場面に居合わせている喋らないキャラがいる場合、ト書きの末尾に「（リアクション: キャラ名→表情や動作）」の形式で簡潔に添えよ。例: 「アカリがツッコむ（リアクション: リン→呆れ顔、サエコ→爆笑）」。4コマ中**最低2コマ**にはこのリアクション描写を含めること。
            - **【超重要】汗マークや怒りマークなどの「漫符」を描写する場合、文字ラベル（例: "POPPING VEIN", "LARGE SWEAT DROP"など）や設定資料に書かれるような矢印・注釈テキストを画面内に絶対に描画させないこと。純粋な視覚的シンボルのみを使用し、一切の英単語ラベルを排除せよ。**
 
         2. **テキストの量的制限 (Compact Text Quantity)**:
            - **厳守**: 1コマあたりのフキダシは**「最大3つまで」**。（3人の掛け合いも積極活用せよ）
            - セリフは**「短い一文」**に収めよ（例: 「なんだって！？」OK、「それはつまり...ということなのか？」NG）。
            - **禁止**: セリフ内に「(怒って)」「(笑いながら)」等のト書き・感情描写を入れるな。絵で表現せよ。
             - **句読点・表現ルール**: セリフの末尾は必ず終止記号で締めよ。どの記号を使うかはセリフの感情・キャラの性格・場面の空気で自然に決めること。
               終止記号（単独で文末になれる）: 。/ ！/ ？/ ♪/ ♡/ っ/ ！？
               修飾記号（単独では文末にならない。必ず後ろに終止記号を添えよ）: ……→「……。」「……！」「……？」 / ～→「～！」「～。」 / ー→「ー。」「ー！」
               **【反復禁止】同じ文末表現が3セリフ以上連続してはならない**。「……」系は1シナリオ中2回までに留めよ。
               禁止: 終止記号なしで終わるセリフ。読点の乱用（1セリフに2つ以上は多すぎ）。
           - 画面の80%以上は「絵」でなければならない。文字で埋め尽くすな。

        3. **オチと構図の多様化 (Variety Constraints)**:
           - **必須**: 「手前に大きく顔があるキャラ」「奥で小さく驚くキャラ」など、**遠近感**を強調せよ。棒立ちは厳禁。
           - **オチ**: 「全員泣いて終わり」等のワンパターンを禁止。シュールな静寂、無言の圧力、社会的死など多様にせよ。
           - **【表現・SFXルール】**: 擬音（SFX）は「日本語のみ」を使用せよ。英語の注釈、翻訳、アルファベット併記は一切禁止する。
           - 演出において、パロディや時事ネタの文脈での固有名詞登場は「表現の結果」として許容する。

        3.5 **【笑いの構造設計 (Comedy Structure Engineering)】**:
           - **大原則: 笑いは「予想された流れ」と「実際の流れ」のズレで作る。** 以下の技法を意識的に選択・組み合わせてシナリオを構成せよ。
           - **【GMC+S ギャグ設計 (Goal, Motivation, Conflict, Stakes)】**:
              * **欲求 (Goal)**: キャラクターのしょうもない、または強烈な個人的欲望（例:「どうしてもプリンを食べたい」「誰より目立ちたい」等）を起点にせよ。
              * **代償/危機 (Stakes)**: 「もしその欲求が達成できなかったらどうなるか？（例：社会的に死ぬ、存在が消える等）」という切実なリスクを1〜2コマ目で提示し、読者にオチへの期待（緊張感）を持たせよ。
              * **障害 (Conflict)**: その欲求を阻む、理不尽でスケールの違う障害（例:「店員が宇宙語しか話さない」「隕石が降ってくる」等）をぶつけよ。
              * **決着 (Resolution)**: 欲求が最悪・最高の形で裏切られ、Stakes（代償）が爆発するオチを作れ。
            - **【ズレを作る技法（最低2つ選択せよ）】**:
             * **置換**: ニュースの出来事を全く別の文脈に言い換え、見え方の差を作る（例: 国際会議 → 幼稚園の学級会、宇宙開発 → 町内会の予算会議）
             * **誇張**: 反応・規模・感情を極端にして笑いにする。「ちょっと驚く」ではなく「宇宙の法則が乱れるレベルで驚愕する」
             * **逆転**: 普段のキャラの立場・力関係を入れ替えて意外性を作る（普段クールなキャラが取り乱す、普段おバカなキャラが唯一の正論を言う等）
             * **不条理**: 話の流れに合わない狂った要素を堂々と混ぜる。多少意味不明になっても勢いで笑えればOK。ツッコミ不在の不条理も許可する
             * **緊張と緩和**: 3コマ目まで空気を張り詰めさせて、4コマ目で完全崩壊させる落差で笑いを取る
             * **常識に戻る**: 周囲が全員暴走している中で、1人だけ冷静に「いや普通に考えておかしいだろ」と常識を提示して落差を作る
           - **【4コマへの笑いの構成マッピング】**:
             * **1コマ目 = フリ**: 読者に「普通の予想」を作らせる前置き。ここでは笑わせなくてよい。「こういう流れだろうな」と思わせる
             * **2コマ目 = ボケ開始**: ズレた発言・行動で「あれ？おかしくないか？」と思わせる。予想からの最初の逸脱
             * **3コマ目 = 溜め/かぶせ**: ボケを加速させるか、極限の緊張を作る。**天丼（1コマ目の小ネタを変奏して再登場）も非常に有効**
             * **4コマ目 = オチ**: ズレを確定させて笑いを完成。**全ての笑いのエネルギーをここに集中投下せよ**
           - **【推奨テクニック】**:
             * **天丼**: 同じパターンのボケを少し形を変えて繰り返し、最後に爆発させる。4コマでは1コマ目→3コマ目の変奏→4コマ目で限界突破が黄金パターン
             * **ノリツッコミ**: ツッコミ役が一旦ボケに乗っかってから「いや待てよ！」と自分で崩す。キャラの意外な一面が出て笑いが深まる
             * **かぶせ**: ボケの直後にさらにもう一段ボケを重ねて畳み掛ける。テンポが命
             * **自虐**: キャラが自分の設定・弱点・過去の失敗をネタにする。親近感と笑いを同時に生む
           - **【ギャグ強度の方針】**: 強烈なボケを最優先。おとなしい優等生ギャグは禁止。多少カオスでも「勢い」と「テンション」で笑わせろ。ただし完全な意味不明（読者が何が起きたか理解できない）は避けよ。
            - **【ズレ技法→ビジュアルギャグ自動マッピング】**: 選択したズレ技法に応じて、以下のビジュアル演出を「状況」欄に自動的に仕込め。笑いはテキストだけでなく「絵」でも表現するのが漫画の鉄則。
              * **誇張を使った場合**: → [EMOTION: CHIBI_GAG] または [EMOTION: BLANK] を推奨。身体変形（目が飛び出す、顎が外れる、魂が抜ける）、異常なサイズ比、爆発的リアクション（椅子から吹っ飛ぶ、壁にめり込む）を状況欄に明記せよ
              * **逆転を使った場合**: → 普段と真逆のEMOTIONタグを選べ（普段クールなキャラに[EMOTION: CHIBI_GAG]、普段ふざけたキャラに[EMOTION: GEKIGA]）。ギャップをビジュアルで表現する
              * **緊張と緩和を使った場合**: → 1〜3コマ目は[EMOTION: GEKIGA]や[EMOTION: SHADOW]で極限の緊張感を絵で作り、4コマ目で[EMOTION: BLANK]か[EMOTION: CHIBI_GAG]に急転直下。「絵柄の急変」で落差を最大化する
              * **不条理を使った場合**: → 背景に脈絡のない巨大オブジェクト（巨大バナナ、空飛ぶ鯨、唐突な富士山等）を配置。状況欄に「背景に○○が何の説明もなく存在する」と明記
              * **置換を使った場合**: → 元の文脈と置換先のビジュアル差を最大化。「国際会議の荘厳なテーブルに幼稚園児の工作道具が並んでいる」等、視覚的ミスマッチを明記
              * **常識に戻るを使った場合**: → 暴走キャラに[EMOTION: IMPACT]や[EMOTION: CHIBI_GAG]、常識キャラだけ[EMOTION: NORMAL]で冷静な表情。温度差を絵で表現する
            - ${D==="Auto"?`**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
               * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
               * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: BLANK）
               * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
               * **メタ崩壊型**: 漫画の枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: BLANK, IMPACT）
               * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
               * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
               * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: BLANK）
               * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
               * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: BLANK, CHIBI_GAG）
               * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: BLANK, IMPACT）`:D==="Surreal"?"**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: BLANK":D==="Explosion"?"**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG":D==="FakeEmotion"?"**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。":D==="Metafiction"?"**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。":D==="Unreasonable"?"**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。":D==="RunningGag"?"**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。":D==="Dream"?"**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: BLANK":D==="PsychoHorror"?"**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME":D==="Misunderstanding"?"**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: BLANK, CHIBI_GAG":D==="CanceledEnding"?"**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: BLANK, IMPACT":D==="Documentary"?`**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
              このモードでは、入力された元ネタ（ニュース記事・URL記事・手動入力テキスト）の**事実・内容をそのまま忠実に**4コマ漫画のシナリオに変換する。
              **【1〜3コマ目の厳格ルール】**:
              - 元ネタの情報を「たとえ話」「置換（別の文脈への言い換え）」「誇張」「不条理な設定変更」に変換することを**完全に禁止**する。
              - 元記事の事実・出来事・人物・数字・状況を、登場キャラクターの掛け合い（会話・リアクション）としてそのまま再構成せよ。
              - 1コマ目: 元ネタの導入・背景をキャラが説明または議論する
              - 2コマ目: 元ネタの核心・衝撃ポイントをキャラが知って驚く・議論する
              - 3コマ目: 元ネタの詳細・補足・影響をキャラが掘り下げる（リアクション強め）
              **【4コマ目のみ漫画的オチを許可】**:
              - 4コマ目だけは、元ネタに対するキャラクターたちの**漫画的リアクション・ツッコミ・感想**で締めてよい。
              - ここでのみ、誇張されたリアクション、シュールな沈黙、感動詐欺的な締めなどの漫画的オチ技法の使用を許可する。
              - ただし、元ネタの事実を捏造・改変してオチにすることは禁止。あくまで「事実に対するキャラの反応」でオチを作れ。
              **【禁止事項】**: 舞台を元ネタと無関係な場所（宇宙、異世界、RPGなど）に移すこと。元ネタに登場しない架空の出来事を捏造すること。ニュースの内容を「たとえ話」にすり替えること。`:""}
            - **【ギャグのトーンバリエーション】**: 毎回同じテンションにならないよう、以下3系統のトーンをネタに合わせて使い分けよ:
              * **ハイテンション爆発系**: 叫び・暴走・カオス。勢いで押し切る
              * **シュール静寂系**: 淡々とした狂気。ボケているのに本人は真顔。不気味な静けさが笑いになる
              * **知性派ブラック系**: 皮肉・風刺・ダブルミーニング。「よく考えたら怖い」タイプの笑い
            - **【Anti-Persona-Gravity Protocol（ペルソナ引力抑制）v1.0】**:
              * **問題**: 特定のキャラクター（特に「風紀委員」「委員長」「リーダー」等の権威的ペルソナを持つキャラ）が、そのペルソナの引力に引きずられて4コマ目のオチを毎回独占し、「裁定・没収・制裁・処罰・禁止命令」系のワンパターンなオチになりやすい。
              * **対策（オチ担当キャラの強制分散）**: 4コマ目の「決めゼリフ」または「決定的行動（オチの主導権）」を担当するキャラクターは、CastList内の全キャラに均等に分散させよ。権威的キャラが毎回オチを支配するのは禁止。
              * **具体的な分散パターン（以下を積極的に活用せよ）**:
                - 普段ボケ役のキャラが4コマ目で急に核心を突く正論を言い放つ
                - 普段おとなしい・天然キャラが4コマ目で最も破壊的な行動を取る
                - 権威キャラが4コマ目では逆にツッコまれる側・被害者になる
                - 全員が同時にボケて誰もツッコまないカオスで終わる
                - モブキャラや通行人が最後に一番おいしいセリフを持っていく
              * **注意**: 権威キャラがオチを担当すること自体は禁止しない。ただし連続使用を避け、他キャラにも均等にオチの見せ場を与えること。「いつも同じキャラが裁いて終わり」は読者に飽きられる最大の原因である。

         3.8 **【Guard C: AI定型文とクリシェの完全排除】**:
            - 以下のAI特有の退屈な表現をシナリオ（ト書き・セリフ）から**完全に排除**せよ:
              * **まとめのナレーション禁止**: 「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等でオチを綺麗にまとめるのは絶対禁止。余韻はぶった斬れ。
              * **弱いリアクション禁止**: 「やれやれ」「ふふっ」「まあいいか」「思わず笑ってしまった」等の緊張感のない言葉は禁止。より鋭く、キャラの個性が尖ったリアクションにせよ。
              * **説明ゼリフ禁止**: 「〇〇が××してしまったぞ！」のように状況をそのまま口で説明するな。状況は絵（ト書き）で見せ、セリフは本音の叫びやツッコミに全振りせよ。

         3.9 **【Guard S: 五感バランスの強制（ト書き品質革命）】**:
            - ト書き（状況・アクション描写）が「視覚情報だけ」に偏ることを禁止する。
            - 各コマの状況欄に、以下の非視覚情報を**最低1つ**は含めよ：
              * 聴覚: 足音、ドアが軋む音、遠くの喧騒、衣擦れ、心拍音
              * 触覚: 風の冷たさ、汗の滴り、紙の手触り、握りしめた拳の痛み
              * 嗅覚: 料理の匂い、雨上がりの湿った空気、古い本の匂い
              * 体内感覚: 胃がキュッとする、背筋が凍る、血が頭に昇る
            - **4コマ全体で、聴覚・触覚・嗅覚・体内感覚のうち最低2種類を使用せよ。**
            - **量的制限**: 五感描写は1コマあたり**1文以内**に留めよ。物理アクション・群像リアクションと競合してト書きが肥大化するのを防ぐため、簡潔な挿入に徹すること。
             - これにより画像生成AIが「空気感」を拾い、単なるポーズ集から「生きた場面」に進化する。

         3.10 **【Guard M: 比喩素材の世界観準拠（クリシェ完全排除）】**:
            - ト書きおよびセリフで比喩を使う場合、以下の使い古された定型比喩を**完全禁止**する：
              * 「時間が止まった」「心臓が口から出そう」「鉛のように重い」「雷に打たれたような」
              * 「氷のような視線」「火花が散る」「闇に飲まれる」
            - 代わりに、**そのコマの舞台（Location）や状況に由来する素材**から比喩を構築せよ。
              * 例: ラーメン屋なら「麺のように伸びきった沈黙」「チャーシューが溶けるように崩れ落ちる表情」
              * 例: 法廷なら「判決文のように冷たく響くセリフ」「証拠品のように動かぬ事実」
            - 1シナリオ中の比喩は**最大2つ**に制限。乱用は絵の情報密度を下げる。
            - **ドキュメンタリーモード時の優先順位**: ドキュメンタリーモード（原文忠実モード）が有効な場合、元ネタの事実再現が最優先。Guard Mの比喩制約よりも原文忠実性が上位にあるため、元記事の表現をそのまま再構成する場合は本ガードを緩和してよい。
             - **目的**: AI特有の定型比喩を排除し、世界観に根ざした独自の表現でシナリオの「血の通った感」を強化する。

        4. **4コマ目の演出**:
           - 必ずしもデフォルメ（SD）にする必要はない。ネタがシリアスなら、**劇画調のリアルな絶望顔**で落としても良い。ネタに合わせてスタイルを適応させよ。

        5. **【感情絵柄タグ (Emotion Style Tag)】**:
           - 各コマの冒頭に、そのコマの演出に最適な[EMOTION: XXX]タグを**必ず1つ**付与せよ。
           - 選択肢（この中から選べ）:
             - NORMAL: 通常の美麗アニメ作画。日常会話、穏やかなシーン。
             - CHIBI_GAG: ちびキャラ化。ツッコミ、呆れ、軽いギャグ、恥ずかしさ。等身が2-3頭身に縮む。
             - GEKIGA: 劇画調リアル。本気の怒り、覚悟、緊張、シリアスな決意。影が濃くなり顔が鋭くなる。
             - SHOUJO: 少女漫画風キラキラ。感動、喜び、恋愛的ときめき。花びらや星が舞う。
             - HORROR: ホラー演出。恐怖、ゾッとする瞬間。暗い影とコントラスト。
             - BLANK: 白目・魂抜け。衝撃、絶望、思考停止。目が点になる。
             - IMPACT: インパクトフレーム。大爆笑、大激怒、驚天動地。集中線で画面が爆発。
             - WATERCOLOR: 水彩画風。ノスタルジック、回想シーン。
             - RETRO: レトロ漫画風。昭和テイスト、コミカル。
             - GLITTER: キラキラオーラ。自信満々、ドヤ顔、勝利宣言。
             - SHADOW: シルエット演出。策略、不穏、腹黒。
           - 【重要】毎回同じタグを繰り返すな。4コマの中で少なくとも2種類以上のタグを使い分けよ。
              - THICK_PAINT: 厚塗りアニメ調。質感・光沢・立体感が強調される重厚な表現。政治・経済・軍事等のシリアスなニュースや、決意・覚悟の場面に。
              - PASTEL: パステルアニメ調。淡い色合い、やわらかいタッチ、やさしい空気感。ほのぼの日常・癒し系の話題や、回想・夢の中の描写に。
              - CEL: セル画風。フラットな色面、はっきりした影、くっきりした輪郭。昔のTVアニメのようなノスタルジックかつポップな表現。エンタメ・懐かしい話題に。
              - DARK_ANIME: ダークアニメ調。暗いトーン、深い影、ミステリアスな雰囲気。事件・サスペンス・不穏なニュース・陰謀論的展開に。
              - THIN_LINE: 繊細線画調。極細の描線、髪の毛一本一本まで繊細に描く美麗表現。感動系・エモーショナルな場面、静かな感情の機微に。
              - HIGH_SATURATION: 高彩度ビビッド。鮮やかで目を引くパワフルな色彩。スポーツ・祭り・勝利・興奮等の派手でエネルギッシュな場面に。
           - オチのコマ（4コマ目）は特に、NORMAL以外のタグを優先的に選べ。

        6. **【カメラ演出タグ (Camera Direction Tag) — 極限物理描写モード v2.55】**:
           - 各コマの冒頭に [Camera: XXX] タグを**必ず1つ**付与せよ。
           - **【超重要・カメラ名だけでは不十分】**: [Camera: XXX] タグの直後に、**そのカメラアングルで物理的に何が見えるかの極限描写**を必ず1〜2文書け。
           - カメラ名を書いただけ（例:「[Camera: ローアングル]」のみ）は**絶対に禁止**。
           - **物理描写の書き方（全コマ必須）**: 「カメラがどこにあり」「何が巨大に見え」「何が歪み」「光がどう当たるか」を具体的に書け:
              * 俯瞰/バードアイ → 「成層圏を突き抜け、銀河の果てから地球の一点を凝視するような極限の俯瞰。太陽光が海面で核爆発的な反射を放つ」
              * ローアングル/アオリ → 「膝の高さから見上げ、キャラの全身がそびえ立つ巨人のように見え、背後の天井や空が大きく広がる。逆光が後ろから吹き荒れ、足元から頭頂までパースが効く。※靴だけのアップにはするな、必ずキャラの全身を描画せよ」
              * フィッシュアイ → 「分厚いアクリルガラス越しに見るように世界全体が丸く湾曲し、周囲の空間や背景が飴細工のようにぐにゃりと曲がる。※キャラクターの顔や鼻を歪ませたり大きくしたりする描写は絶対に書くな。背景のみを歪ませよ」
              * ダッチアングル → 「世界が30度傾き、壁も床も天井も重力を忘れて斜めに流れ、キャラが滑り落ちそうな不安定感で画面が崩壊する」
              * 望遠圧縮 → 「100m先の背景が目の前まで迫り、キャラと背景の距離感が消失し、圧迫的な密度で空間が潰れる」
              * ワームズアイ → 「地面すれすれから見上げ、人間が巨人のようにそびえ立つ。足元の地面のディテールが鮮明に描かれつつ、キャラの全身が圧倒的スケールで画面に収まる。※靴だけのアップ画は禁止、必ず全身を描画せよ」
              * パンニング/追跡ショット → 「カメラがキャラの疾走を追いかけ、背景が流星群のようにモーションブラーで崩壊する。手前のキャラが画面を突き破る勢いで奥へ走り抜ける」
              * ⚠️ マクロ特写（顔・目の超接写）は全キャラ描画義務と矛盾するため**使用禁止**。
           - 選択肢: 俯瞰/バードアイ、ローアングル/アオリ、ダッチアングル、超広角/フィッシュアイ、望遠圧縮、ワームズアイ、ドローン俯瞰、パンニング/追跡ショット
           - 【制約】4コマの中で**同じカメラを2回以上使うのは禁止**。必ず4種類の異なるカメラを選べ。


        【出力フォーマット（絶対厳守・会話禁止）】
        返答、挨拶、説明（「分かりました」「以下がシナリオです」等）は **一切出力しないこと**。
        以下の独自フォーマット **のみ** を出力してください。Markdownのコードブロックも不要です。

        Topic: [ニュースの見出し（15文字以内）]
        Logline: [誰が、何を求めて、どうなるかという1〜2行の強力なログライン（軸）。この軸から4コマ目まで絶対にブレないこと]
        Location: [${g.trim()?"必ず『"+g.trim()+"』にせよ":"ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
        Outfit: [${T.trim()?"必ず『"+T.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
        Punchline: [${D!=="Auto"?"必ず『"+C_(D)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
        Scenario:
        [1コマ目: 起]
        [EMOTION: XXX]
        [Camera: XXX]
        (状況とセリフ...)

        [2コマ目: 承]
        [EMOTION: XXX]
        [Camera: XXX]
        (状況とセリフ...)

        [3コマ目: 転]
        [EMOTION: XXX]
        [Camera: XXX]
        (状況とセリフ...)

        [4コマ目: 結]
        [EMOTION: XXX]
        [Camera: XXX]
        (状況とセリフ...)

        シナリオ本文の要件:
        - 登場人物: ** 提供された CastList の全員 ** を使用してください。
        - (禁止事項): AIが勝手に架空のオリジナルキャラクターを独自に創作して出演させることは禁止する。指定されたCastListのキャラクターのみをメインキャストとして扱うこと。
        - (許可事項): ニュースの当事者（スポーツ選手、政治家、怪人、動物、虫など）や名もなきモブキャラは、物語を面白くするために必要であれば自由に登場・発言させて構わない。
        - (ハルシネーション防止): ゲストを登場させる場合でも、画像生成時のVisual Actionに「意味不明な文字」や「描画不可能な複雑すぎる行動」が混入しないよう、シンプルで視覚的にわかりやすい行動に留めること。
        - 構成: 起承転結（4段）。
        - 内容: ニュースに対する辛辣な風刺や、キャラの個性を活かしたドタバタ劇。
        - 文体: 各コマの「状況」「セリフ」が明確にわかる文章。

        ⚠️【最終確認・絶対厳守】⚠️
        全てのセリフの末尾に必ず「。」や「！」等の終止記号がついているか出力前に確認せよ。
        「…」や「～」など、終止記号なしで終わるセリフはシステムエラーとなるため完全禁止とする。
        `,Jn=await ro(Vi,te&&pt?[te]:[],W,kn=>{Vt(Ui=>Ui+`
 > [API] ${kn} `)});P(Jn.model);let jt={topic:at,scenario:""};try{const kn=Jn.text.match(/Topic:\s*(.+)/i),Ui=Jn.text.match(/Logline:\s*(.+)/i),Si=Jn.text.match(/Location:\s*(.+)/i),Vn=Jn.text.match(/Outfit:\s*(.+)/i),oa=Jn.text.match(/Punchline:\s*(.+)/i),ni=Jn.text.match(/Scenario:\s*([\s\S]+)/i);if(ni)jt.topic=kn?kn[1].trim():at,jt.topic=jt.topic.replace(/^Topic:\s*/i,"").trim(),jt.logline=Ui?Ui[1].trim():"",jt.location=Si?Si[1].trim():"Generic Background",jt.outfit=Vn?Vn[1].trim():"",jt.punchline=oa?oa[1].trim():"",jt.scenario=ni[1].trim();else{const la=Jn.text.match(/\{[\s\S]*\}/);if(la){const At=JSON.parse(la[0]);jt.topic=At.topic||at,jt.location=At.location||"Generic Background",jt.scenario=At.scenario||Jn.text}else{if(Jn.text.length<20)throw new Error("AI returned empty or invalid response.");jt.topic=f==="manual"?m||"Custom Scenario":_||"Generated Scenario",jt.scenario=Jn.text}}}catch(kn){console.warn("Parse warning:",kn),jt.scenario=Jn.text,jt.topic="Generated Scenario"}const ji=kn=>kn;jt.scenario=ji(jt.scenario),Y(jt.scenario);const qi=jt.logline?`
Logline: ${jt.logline}`:"",$i=T.trim()||jt.outfit?`
Outfit: ${T.trim()||jt.outfit}`:"",Fn=jt.punchline?`
Punchline: ${jt.punchline}`:"",ei=K?pt?`
🌐 360°背景: ON (${be?.location||"解析済み"} / ${be?.spatialType==="indoor"?"室内":be?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";y(g.trim()||jt.location||"Unspecified"),I(T.trim()||jt.outfit||""),Vt(kn=>kn+`
 > トピック選定: ${jt.topic} 
 > シナリオ構築完了。`),bt("シナリオの生成が完了しました！");let ti="";if(K&&be&&pt&&te)try{Vt(Vn=>Vn+`
 > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`),bt("🎬 360°カメラワーク設計中..."),Cn(!0);const kn=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${jt.scenario}

【360°背景の解析情報】
- 場所: ${be.location}
- 光源: ${be.lighting}
- 空間タイプ: ${be.spatialType}
- 特徴物: ${be.objects||"なし"}
- 雰囲気: ${be.mood||"不明"}

【設計ルール】
1. 各コマは360°空間の**異なる方角**を活用し、空間の立体感を演出すること
2. yawは0°=正面、90°=右、180°=背面、270°=左
3. pitchは0°=水平、正の値=上向き、負の値=下向き（±30°以内推奨）
4. FOVはカメラのショットに合わせて調整（60°=望遠、90°=標準、120°=広角）
5. 光源方向を考慮し、逆光・順光・サイドライトを各コマで使い分けること
6. 4コマ中少なくとも3コマは異なるyaw方向（差が45°以上）にすること

**必ず以下のJSON形式のみで出力してください。それ以外のテキストは一切不要です。**
{
  "panels": [
    {
      "panel": 1,
      "camera": "ショットタイプ（例: establishing_shot, close_up, medium_shot, wide_shot）",
      "yaw": 0,
      "pitch": 0,
      "fov": 90,
      "reasoning": "この方角を選んだ理由（日本語・1文）"
    },
    { "panel": 2, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 3, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 4, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." }
  ]
}`,Si=(await ro(kn,[te],null,Vn=>{Vt(oa=>oa+`
 > [Camera AI] ${Vn}`)})).text.match(/\{[\s\S]*\}/)?.[0];if(Si){const Vn=JSON.parse(Si);an(Vn);const oa=At=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((At%360+360)%360/45)%8],ni=At=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[At]||At;let la=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Vn.panels.forEach(At=>{la+=`
 > 🎬 コマ${At.panel}: ${oa(At.yaw)} (yaw:${At.yaw}°) / ${ni(At.camera)} / FOV:${At.fov}°`,la+=`
 >    └─ ${At.reasoning}`}),la+=`
 > 🎬 ══════════════════════════════════`,Vt(At=>At+la),bt("🎬 360°カメラワーク設計完了！背景クロップを開始...");try{Vt(On=>On+`
 > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...`);const At=[];for(const On of Vn.panels){const Xi=await IS(K,On.yaw,On.pitch||0,On.fov||90);At.push(Xi)}oi(At),Vt(On=>On+`
 > 🔲 [Crop] ✅ ${At.length}枚のクロップ画像を生成しました`),bt("🎬 カメラワーク設計＋背景クロップ完了！"),Cn(!1)}catch(At){console.warn("[360° Crop] Cropping failed:",At),Vt(On=>On+`
 > ⚠️ [Crop] クロップに失敗しました: ${At.message}（スキップ）`),Cn(!1)}ti=`
🎬 360° Camera Work:`,Vn.panels.forEach(At=>{ti+=`
  Panel${At.panel}: ${oa(At.yaw)}(${At.yaw}°) ${ni(At.camera)} FOV${At.fov}° — ${At.reasoning}`})}else console.warn("[360° Camera AI] JSON parse failed, skipping camera work"),Vt(Vn=>Vn+`
 > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）`),Cn(!1)}catch(kn){console.warn("[360° Camera AI] Camera work design failed:",kn),Vt(Ui=>Ui+`
 > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${kn.message}（スキップ — シナリオ生成には影響しません）`),Cn(!1)}const qn=`## タイトル: ${jt.topic} !?${qi}
Location: ${jt.location||"Unspecified"}${$i}${Fn}${ei}${ti}

${jt.scenario} `;return Y(qn),qn}catch(Pe){console.error(Pe);const Ve=kh(Pe.message);return Vt(Se=>Se+`

[システムエラー]: ${Pe.message}
--------------------------------------------------
${Ve}`),bt("シナリオ生成エラー"),null}finally{clearInterval(Je),We(!1)}},Ei=async(de=!1,ct=null)=>{const at=ct||oe;if(!de&&(!W||!at))return bt("キャストとシナリオが必要です。");ut(!0),ge(""),pe([]),Ue(""),Re(""),Be(!1),Jt("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const yt=setInterval(()=>{Jt(St=>{if(St.length>800)return St;const Je=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!st)return St;const Pe=Je[Math.floor(Math.random()*Je.length)];return St+Pe})},600);try{let St=Ie==="monochrome";if(Ie==="auto"){const mt=W.toLowerCase();St=mt.includes("style_tag: monochrome")||mt.includes("monochrome")||mt.includes("greyscale")||mt.includes("screentone")}const Je=St?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",Pe={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Pe.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"},Pe.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"},Pe.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"},Pe.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"},Pe.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"},Pe.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"},Pe.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"},Pe.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"},Pe.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"},Pe.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"},Pe.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"},Pe.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const Ve=mt=>{const Mt=mt.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(Mt){const Qe=Mt[1].toUpperCase();if(Pe[Qe])return Qe}return"NORMAL"},Se=mt=>{const Mt=Ve(mt);if(Mt==="NORMAL")return"";const Qe=Pe[Mt],Ot=[];if(mt.split(`
`).forEach(Ke=>{const nt=Ke.match(/^(.*?)(?:[:：]|「)/);if(nt&&nt[1].trim()){const Tt=nt[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Tt&&!Ot.includes(Tt)&&Ot.push(Tt)}}),Ot.length>=2&&Qe.styleMulti){let Ke=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.styleMulti}`;return Qe.proportionsMulti&&(Ke+=`
PROPORTION OVERRIDE: ${Qe.proportionsMulti}`),Qe.vfxMulti&&(Ke+=`
VFX: ${Qe.vfxMulti}`),Ke}let et=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.style}`;return Qe.proportions&&(et+=`
PROPORTION OVERRIDE: ${Qe.proportions}`),Qe.vfx&&(et+=`
VFX: ${Qe.vfx}`),et},dt=mt=>{const Mt=[];let Qe=null;if(mt.split(`
`).forEach($e=>{const et=$e.replace(/\*\*/g,"").trim();if(et.startsWith("## ")){Qe&&Mt.push(Qe);const xt=et.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();Qe={name:xt,shortName:xt.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!Qe)return;if(et.includes("髪")||et.toLowerCase().includes("hair")){const xt=et.match(/\[WEIGHTS?\]:\s*(.*)/i),mn=xt?xt[1].replace(/\|/g,""):et,Kn=mn.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);Kn&&!Qe.hairColor&&(Qe.hairColor=Kn[1]);const Yn=mn.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),Ma=mn.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);Qe.hairStyle||(Yn?Qe.hairStyle=Yn[1]:Ma&&(Qe.hairStyle=Ma[1]))}const Ke=et.toLowerCase(),nt=/\(no[\s_-]*glasses/i.test(Ke),Tt=/\([^)]*glasses[\s:]/i.test(Ke)&&!nt;Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES"||(nt?Qe.glasses="LOCKED_NO":Tt&&(Qe.glasses="LOCKED_YES")),!(Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES")&&(et.includes("眼鏡")||et.includes("メガネ")||Ke.includes("eyewear"))&&(Ke.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(et)?Qe.glasses="NO":(/(?:あり|有り|有|着用)/i.test(et)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(Ke))&&(Qe.glasses="YES"))}),Qe&&Mt.push(Qe),console.log("[IDENTITY MATRIX] Glasses detection results:"),Mt.forEach($e=>{console.log(`  ${$e.shortName}: glasses=${$e.glasses}, hair=${$e.hairColor} ${$e.hairStyle}`)}),Mt.length===0)return"";let Ot=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return Ot+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,Mt.forEach($e=>{const et=[];$e.hairColor&&et.push(`${$e.hairColor} hair`),$e.hairStyle&&et.push($e.hairStyle),$e.glasses==="YES"||$e.glasses==="LOCKED_YES"?et.push("MUST HAVE glasses (do NOT remove)"):$e.glasses==="NO"||$e.glasses==="LOCKED_NO"?et.push("MUST NOT have glasses (bare eyes)"):et.push("check reference image for glasses status"),Ot+=`- [${$e.shortName}]: ${et.join(", ")||"see reference image"}
`}),Ot+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,Ot+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,Ot},_n=mt=>{const Qe=dt(W).split(`
`).find(Ot=>Ot.includes(`[${mt}]`));return Qe?Qe.split(":").slice(1).join(":").trim():""},pn=`
ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0):

§1. CAMERA DISTORTION WEIGHTS (MANDATORY — Apply these weighted tags to EVERY panel):
(extreme perspective distortion:2.8), (ABSOLUTELY NO eye-level shot:2.9), (NO flat symmetrical composition:2.9), (dramatic severe camera angle:2.7), (extreme visible lens distortion:2.6), (violently tilted horizon line:2.5), (heavily foreshortened body proportions:2.6), (extreme exaggerated depth of field:2.5)

Available lens effects — EACH PANEL MUST USE ONE:
  * (extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5) — Ultra wide-angle spherical distortion
  * (extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6) — Background crushes into foreground
  * (severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6) — Frame tilted 15-45 degrees
  * (ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0) — Camera at ground level looking UP. IMPORTANT: Always show full body, NEVER crop to shoes only.
  * (ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0) — Camera from above looking DOWN

[FLAT SHOT BAN]: (eye-level shot:0.1), (straight-on symmetrical:0.1) — Eye-level/straight compositions are FORBIDDEN. Weight them down to near-zero.
[BODY DEFORMATION]: Characters' body parts closest to camera MUST be drawn 50%+ larger than far-side parts. This distortion is INTENTIONAL.

§2. CAST MANAGEMENT & CLONE PREVENTION (CRITICAL):
- Each named character appears ONLY ONCE per panel. Drawing duplicates (foreground+background copy, reflection, silhouette) is FORBIDDEN.
- Background characters use cast members NOT speaking in that panel.

§3. GAG MANGA INTERACTION RULES:
1. Characters MUST interact with each other or the environment.
2. [NO CAMERA EYE CONTACT]: (absolutely NO looking at camera:2.5), (NO breaking the fourth wall:2.5), (characters always looking at other characters or objects in the scene:1.8), (eyes directed at conversation partner:1.5). Direct eye contact with the viewer is strictly FORBIDDEN. Characters must always look at each other, at objects, or away from the camera.
3. (exaggerated facial expressions:1.3), (emotional reactions:1.2) — Comical expressions: blank white eyes, jaw drops, fury, waterfall tears.
4. (dynamic body language:1.3), (full body reactions:1.2) — Characters physically react with entire bodies.
5. Do NOT overlay floating close-up eyes or ghostly face inserts as background elements.
6. Do NOT draw "adjusting glasses" pose unless the character explicitly wears glasses.

§4. PERSPECTIVE-ALIGNED VFX:
- Speed lines, explosions, lightning MUST follow the panel's perspective distortion.
- If fish-eye: effects curve radially. If dutch angle: effects tilt with the world.
    `;let Vi=at.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||at.split(`
`)[0].substring(0,20);Vi=Vi.replace(/^Topic:\s*/i,"").trim();const wo=at.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),Jn=at.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),jt=wo||"Generic Detailed Background",ji=Jn&&!/^(なし|キャラシート準拠|none|default)/i.test(Jn)?Jn:"",qi=at.replace(/```(?:json|markdown)?/gi,"").trim(),$i=(mt,Mt,Qe)=>{const Ot=new RegExp(`\\[${Mt}.*?\\]([\\s\\S]*?)(?=\\[${Qe}|$)`,"i"),$e=mt.match(Ot);return $e?$e[1].trim():""},Fn=$i(qi,"1コマ目","2コマ目")||qi,ei=$i(qi,"2コマ目","3コマ目"),ti=$i(qi,"3コマ目","4コマ目"),qn=$i(qi,"4コマ目","UNKNOWN"),Si=(mt=>{const Mt=[...mt];for(let Qe=Mt.length-1;Qe>0;Qe--){const Ot=Math.floor(Math.random()*(Qe+1));[Mt[Qe],Mt[Ot]]=[Mt[Ot],Mt[Qe]]}return Mt})(["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"]).slice(0,4);let Vn=0;const oa={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},ni=mt=>{const Mt=mt.match(/\[Camera:\s*(.*?)\]/i);if(Mt&&Mt[1]){const Ot=Mt[1].trim();let $e="";for(const[et,Ke]of Object.entries(oa))if(Ot.includes(et)){$e=Ke;break}return $e?`${$e}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const Qe=Si[Vn%Si.length];return Vn++,Qe},la=mt=>mt.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),At=mt=>{const Mt=mt.match(/\[Camera:\s*(.*?)\]/i);if(Mt&&Mt[1])return Mt[1].trim();const Qe=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return Qe[Vn%Qe.length]},On=mt=>{const Mt=mt.split(`
`),Qe=[];W.split(`
`).forEach(et=>{const Ke=et.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(Ke){const nt=Ke[1].trim();Qe.push(nt);const Tt=nt.split(/[\(]/)[0].trim();Tt&&Tt!==nt&&Qe.push(Tt);const $n=nt.match(/[\(]\s*(.*?)\s*[\)]/);$n&&Qe.push($n[1].trim())}});const Ot=[];let $e=1;if(Mt.forEach(et=>{const Ke=et.match(/^(.*?)(?:[:：]|「)/);let nt=!1,Tt=et;if(Ke&&Ke[1].trim()){let cn=Ke[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const xt=/[がをにでへはもとからまでより]/.test(cn)&&cn.length>5,mn=cn.length>20,Kn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(cn),Yn=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(cn),Ma=/[（(]\s*リアクション/i.test(Ke[1]);xt||mn||Kn||Yn||Ma||(Qe.some(Ta=>{const is=Ta.split(/[（(]/)[0].trim();return cn===Ta||cn===is||is===cn||cn.includes(is)})||cn.includes("全員")||cn==="Speaker"||Ke[0].trim().endsWith(":")||Ke[0].trim().endsWith("："))&&(nt=!0)}else if(et.trim().startsWith("「")){const $n=et.trim();/^「[^」]+」[？！。、!?\s]*$/.test($n)&&(nt=!0)}nt&&(Tt=Tt.replace(/^.*?(?:[:：]|「)\s*/,""),Tt=Tt.trim(),Tt=Tt.replace(/^「+/,"").replace(/」+$/,""),Tt=Tt.replace(/（.*?）|\(.*?\)/g,""),Tt=Tt.trim(),Tt&&(Ot.push(`(Speech Bubble ${$e}: "${Tt}")`),$e++))}),Ot.length===0){const et=mt.match(/「([^」]+)」/g);et&&et.length>0&&et.forEach(Ke=>{let nt=Ke.replace(/^「/,"").replace(/」$/,"").trim();nt=nt.replace(/（.*?）|\(.*?\)/g,"").trim();const Tt=Qe.filter(xt=>{const mn=xt.split(/[\(（]/)[0].trim();return mn&&nt.includes(mn)}),$n=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(nt),cn=Tt.length>=2&&$n&&nt.length>15;nt&&!cn&&(Ot.push(`(Speech Bubble ${$e}: "${nt}")`),$e++)})}return Ot.length===0?"(Characters interact without dialogue in this panel)":Ot.join(", ")},Xi=(mt,Mt="")=>{const Qe=mt.split(`
`),Ot=[];W.split(`
`).forEach(Ke=>{const nt=Ke.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(nt){const Tt=nt[1].trim();Ot.push(Tt);const $n=Tt.split(/[\(]/)[0].trim();$n&&$n!==Tt&&Ot.push($n);const cn=Tt.match(/[\(]\s*(.*?)\s*[\)]/);cn&&Ot.push(cn[1].trim())}});let et=Qe.filter(Ke=>{const nt=Ke.match(/^(.*?)(?:[:：]|「)/);let Tt=!1;if(nt&&nt[1].trim()){let xt=nt[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();xt=xt.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const mn=/[がをにでへはもとからまでより]/.test(xt)&&xt.length>5,Kn=xt.length>12,Yn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(xt),Ma=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(xt.replace(/[（(].*$/,"").trim()),Ta=/[（(]\s*リアクション/i.test(nt[1]);mn||Kn||Yn||Ma||Ta||(Ot.some(is=>xt.includes(is)||is.includes(xt))||xt==="全員"||xt==="Speaker"||nt[0].trim().endsWith(":")||nt[0].trim().endsWith("："))&&(Tt=!0)}else if(Ke.trim().startsWith("「")){const xt=Ke.trim();/^「[^」]+」[？！。、!?\s]*$/.test(xt)&&(Tt=!0)}const $n=Ke.match(/^\[\d+コマ目/),cn=Ke.trim()==="";return!Tt&&!$n&&!cn}).join(" ").trim();return et=et.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),et=et.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),et=et||"Characters interacting dynamically based on dialogue.",Mt&&Ot.forEach(Ke=>{const nt=Ke.split("(")[0].trim();Mt.includes(nt)}),et},wi=mt=>ji?`(All characters are wearing ${ji}) ${mt}`:mt,mi=mt=>{const Qe=mt.split(`
`).filter(et=>{const Ke=et.trim();return/^\[EMOTION:/i.test(Ke)||/^状況[：:]/i.test(Ke)?!1:Ke.includes("：")||Ke.includes(":")||Ke.includes("「")}),Ot=[];W.split(`
`).forEach(et=>{const Ke=et.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(Ke){const nt=Ke[1].trim();Ot.push(nt);const Tt=nt.split(/[（(]/)[0].trim();Tt&&Tt!==nt&&Ot.push(Tt)}});const $e=[];if(Qe.forEach(et=>{const Ke=et.match(/^(.*?)(?:[:：]|「)/);if(Ke&&Ke[1].trim()){let nt=Ke[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const Tt=/[がをにでへはもとからまでより]/.test(nt)&&nt.length>5,$n=nt.length>12,cn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(nt),xt=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(nt.replace(/[（(].*$/,"").trim()),mn=/[（(]\s*リアクション/i.test(Ke[1]);if(Tt||$n||cn||xt||mn)return;nt&&!$e.includes(nt)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(nt)&&(Ot.some(Kn=>{const Yn=Kn.split(/[（(]/)[0].trim();return nt===Kn||nt===Yn||Yn===nt})||Ke[0].trim().endsWith(":")||Ke[0].trim().endsWith("："))&&$e.push(nt)}}),$e.length>=3){const et=_n($e[0]),Ke=_n($e[1]),nt=_n($e[2]);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${$e[0]}] (${et||"see reference"}) — First speaker
- CENTER ZONE: [${$e[1]}] (${Ke||"see reference"}) — Second speaker
- LEFT ZONE: [${$e[2]}] (${nt||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${$e[0]}] MUST be on the RIGHT third of the panel.
- [${$e[1]}] MUST be in the CENTER of the panel.
- [${$e[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${$e[0]}]'s bubble on the RIGHT, [${$e[1]}]'s in CENTER, [${$e[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if($e.length>=2){const et=_n($e[0]),Ke=_n($e[1]);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${$e[0]}] (${et||"see reference"})
- LEFT side: [${$e[1]}] (${Ke||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${et||$e[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${Ke||$e[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${$e[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${$e[0]}]'s head.
- [${$e[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${$e[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if($e.length===1){const et=_n($e[0]);return`CRITICAL PLACEMENT & IDENTITY: [${$e[0]}] (${et||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},ja=mt=>{const Mt=mt.split(`
`),Qe=[],Ot={};W.split(`
`).forEach(xt=>{const mn=xt.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(mn){const Kn=mn[1].trim(),Yn=Kn.split("(")[0].trim().split("（")[0].trim();Yn&&(Qe.push(Yn),Ot[Yn]={name:Yn,full:Kn})}});const $e=[];Mt.forEach(xt=>{const mn=xt.match(/^(.*?)(?:[:：]|「)/);if(mn&&mn[1].trim()){let Kn=mn[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Kn&&!$e.includes(Kn)&&Qe.includes(Kn)&&$e.push(Kn)}});const et=[...$e],Ke=mt;Qe.forEach(xt=>{!et.includes(xt)&&Ke.includes(xt)&&et.push(xt)});let nt=0;Mt.forEach(xt=>{const mn=xt.trim();(mn.includes("「")&&mn.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(mn))&&nt++});const Tt=$e.slice(0,3).map(xt=>`[${xt}]`),$n=Qe.filter(xt=>!et.includes(xt));$n.length>0&&$n.forEach(xt=>{et.includes(xt)||et.push(xt)});const cn=et.map(xt=>`[${xt}]`);if(Tt.length>0){let xt=`ANTI-CLONE REMINDER: ${cn.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;et.length===1&&nt<=1?xt+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${cn[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${cn[0]}. Leave the surrounding space empty rather than adding people.`:et.length===1&&nt>=2&&(xt+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${cn[0]} (monologue/soliloquy). Draw only ${cn[0]} — do NOT add a second character just because there are multiple bubbles.`);const mn=Tt.join(" and "),Kn=cn.filter(Ta=>!Tt.includes(Ta)),Yn=Kn.length>0?Kn.join(", "):"NO ONE ELSE",Ma=`
FOREGROUND MUST CONTAIN ONLY: ${mn}.
BACKGROUND MUST CONTAIN ONLY: ${Yn}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${et.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${mn} are the main focus.
${xt}${Ma}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."};let Sa="",Cs="";const Vc=W.split(`
`);for(let mt=0;mt<Vc.length;mt++){const Mt=Vc[mt].replace(/\*\*/g,"").trim();if(Mt.startsWith("## ")&&(Cs=Mt.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),Sa+=`
- Character [${Cs}]: `),!Cs||ji&&(Mt.includes("服装")||Mt.includes("Outfit")))continue;const Qe=Mt.match(/\[WEIGHTS?\]:\s*(.*)/i);if(Qe){let $e=Qe[1].replace(/\|/g,"").trim();$e&&$e!=="()"&&$e!=="-"&&(Sa+=$e+", ");continue}const Ot=Mt.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);Ot&&Ot.length>=2&&(Sa+=Ot.join(", ")+", ")}Sa.trim()||(Sa=W.trim());const ir=Sa.trim(),jc=tn?la(ir):ir,Fl=jt||"Detailed Background",Ro=Vi||"4-koma Manga",Co=tn?`Generated by ChatGPT with Super FURU AI 4-koma ${fo}`:`Generated by Super FURU AI 4-koma ${fo}`;let ar="";tn?ar=`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${Ro}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads "${Co}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font.
- Draw tiny Japanese watermark text that reads "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor" positioned at the bottom-left corner of the 4th panel.
- Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.
- Exactly 4 EQUAL horizontal panels, stacked vertically with thick white gutters between them. Panels MUST NOT touch.

ART STYLE:
- High-budget TV anime production quality. Pristine clean cel-shading with smooth gradient shadows and rich saturated color palette.
- Cinematic color grading with smooth light diffusion and gentle rim lighting on character edges.
- Foreground characters have bold ink outlines with varied line weight. Add a subtle white glow outside the character's outline to prevent blending with the background.
- Backgrounds should have slightly lower saturation and softer focus (shallow depth of field) to make characters pop.
- NOISE REDUCTION: Strictly avoid intricate micro-textures, grainy noise, rough surfaces, excessive gloss, random sparkling, or muddy overlays. Keep character surfaces incredibly smooth and clean, while maintaining dramatic cel-shading. Prioritize readable silhouettes and bold outlines over excessive micro-details.
- ${Je}
- Setting: ${Fl}
${K&&be&&pt?ke&&ke.length===4&&!tn?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${be.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${be.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`:""}

CAMERA & PERSPECTIVE RULES:
Each of the 4 panels MUST use a DIFFERENT dramatic camera angle. Use specific cinematic techniques:
- Bird's-eye view looking straight down from above
- Worm's-eye view looking up from ground level (characters towering overhead)
- Dutch angle with horizon tilted 30-45 degrees for tension
- Close-up telephoto shot with shallow depth of field and background bokeh
- Wide-angle lens shot (14mm equivalent) with exaggerated perspective
No two panels share the same angle. Standard eye-level shots are FORBIDDEN.
Keep character proportions strictly accurate — dramatic angles yes, anatomical distortion no.

CHARACTERS & IDENTITY:
- Strictly reproduce reference image designs (hair, eyes, skin, accessories). NO feature swapping.
- Reference images are ONLY for face, hair, skin, and accessories.
${ji?`- IGNORE reference clothing. All characters MUST wear exactly: ${ji}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels."}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${jc}
- Identity Anchor: ${dt(W)}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. Preserve exact hair color, eye color, and skin tone in every panel.

PANEL DESCRIPTIONS:

## Panel 1
${Se(Fn)}
${mi(Fn).replace(/\\[/g, '').replace(/\\]/g,"")}
${ja(Fn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${tn?At(Fn):ni(Fn)}
Action: ${wi(Xi(Fn,mi(Fn)))}
Dialogue (Japanese text inside speech bubbles only): ${On(Fn)}

## Panel 2
${Se(ei)}
${mi(ei).replace(/\\[/g, '').replace(/\\]/g,"")}
${ja(ei).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${tn?At(ei):ni(ei)}
Action: ${wi(Xi(ei,mi(ei)))}
Dialogue (Japanese text inside speech bubbles only): ${On(ei)}

## Panel 3
${Se(ti)}
${mi(ti).replace(/\\[/g, '').replace(/\\]/g,"")}
${ja(ti).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${tn?At(ti):ni(ti)}
Action: ${wi(Xi(ti,mi(ti)))}
Dialogue (Japanese text inside speech bubbles only): ${On(ti)}

## Panel 4
${Se(qn)}
${mi(qn).replace(/\\[/g, '').replace(/\\]/g,"")}
${ja(qn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${tn?At(qn):ni(qn)}
Action: ${wi(Xi(qn,mi(qn)))}
Dialogue (Japanese text inside speech bubbles only): ${On(qn)}

THINGS TO AVOID:
- No plastic-looking skin or digital over-sharpening on characters.
- No watermarks or logos other than the specified watermarks above.
- No random English text scattered across panels.
- No floating close-up eyes or ghostly face overlays in backgrounds.
- No character sheet layout, expression grid, or reference sheet appearance.
- No extra characters beyond those specified in each panel.

FINAL COMPLIANCE CHECK:
- Output is a new manga scene with 4 distinct story panels, backgrounds, and vertical Japanese speech bubbles.
- Output is NOT a character sheet.
- No floating close-up eyes or partial face crops in the background. Every character must be drawn as a complete physical presence.
- No anatomical distortion from excessive fisheye lens.
- Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
`:(ar=`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${Ro}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${Co}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor".
Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${Je}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${Fl}.
${K&&be&&pt?ke&&ke.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${be.lighting}), objects (${be.objects||"various"}), and mood (${be.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${be.lighting}), spatial layout, objects (${be.objects||"various"}), and mood (${be.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:""}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${ji?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:""}
Cast:
${ir}
${ji?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${ji}. Apply tags directly.`:""}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${dt(W)}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.

Camera & Comp:
${pn}
ANTI-CLONING: NEVER draw the same character twice in a single panel.
COMPOSITION: Strict 2:3 golden ratio inside each panel.

Tech Dict:
(clean anime illustration background: 2.5)
(Meticulous clean line art, smooth cel shading: 2.5)
(Soft diffused backlight, rim light: 2.4)
(Cinematic depth of field, soft bokeh: 2.3)
(NO text/SFX outside speech bubbles: 2.8)
(NO ENGLISH TEXT outside watermark. NO 'G-pen'/'HA': 3.0)


## Panel 1
${Se(Fn)}
${mi(Fn)}
${ja(Fn)}
Camera: ${ni(Fn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Xi(Fn,mi(Fn)))}.
Dialogue (ONLY inside bubbles): ${On(Fn)}.

## Panel 2
${Se(ei)}
${mi(ei)}
${ja(ei)}
Camera: ${ni(ei)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Xi(ei,mi(ei)))}.
Dialogue (ONLY inside bubbles): ${On(ei)}.

## Panel 3
${Se(ti)}
${mi(ti)}
${ja(ti)}
Camera: ${ni(ti)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Xi(ti,mi(ti)))}.
Dialogue (ONLY inside bubbles): ${On(ti)}.

## Panel 4
${Se(qn)}
${mi(qn)}
${ja(qn)}
Camera: ${ni(qn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Xi(qn,mi(qn)))}.
Dialogue (ONLY inside bubbles): ${On(qn)}.

Important constraints:
- Ensure the characters accurately reflect classic anime styles.
- Do NOT merge panels. Keep 4 distinct panels with white gutters between them.
- ABSOLUTELY NO TEXT OR SFX BETWEEN PANELS. The white gutters separating the panels MUST be completely clean and pure white. Do not draw any labels, narration, or sound effects crossing or sitting inside the panel boundaries.
- Do NOT write situation/narration explanations as text on the screen. The Visual Action must only be illustrated.
- Write the Japanese spoken text clearly inside white manga speech bubbles in a bold sans-serif Japanese font.
- Japanese dialogue MUST end with a period (。). However, do NOT add unnecessary commas (、) inside dialogue. Manga speech bubbles rarely use commas in natural Japanese — line breaks and bubble shape provide natural pauses instead. Only use commas when absolutely necessary to prevent misreading.
- TYPOGRAPHY RULE: Write Japanese text tightly with ZERO spaces between words. Do NOT insert any gaps or spaces between characters. (no letter spacing:1.5), (tight kerning:1.5).
- Do NOT add random English text except for the watermark.
- Maintain character consistency across all 4 panels.
- Flow is from top panel to bottom panel.
- Ensure the watermark is positioned at the absolute bottom edge of the image, with no extra whitespace below it. The text must be oriented horizontally (left-to-right).
- CRITICAL COMPOSITION BAN: Do NOT draw floating close-up eyes, partial face crops, or ghostly face overlays in the background of any panel. Every character must be drawn as a complete physical presence within the scene. No "dramatic eye insert" or "background eye close-up" compositions allowed.

FINAL COMPLIANCE CHECK (MANDATORY BEFORE OUTPUT):
Before generating the final image, mentally verify ALL of the following. If ANY check fails, you MUST redraw the failing panel:
- [ ] Panel 1: Does the camera angle show VISIBLE distortion? Is the horizon/floor NOT perfectly horizontal? Are body proportions warped by perspective?
- [ ] Panel 2: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from Panel 1? Can you see clear perspective deformation?
- [ ] Panel 3: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from Panels 1 and 2? Are architectural lines bending?
- [ ] Panel 4: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from the previous panels? Are near-side body parts oversized?
- [ ] ALL 4 panels use DIFFERENT camera angles from each other — no two panels share the same angle type.
- [ ] ZERO panels look like a flat, normal, eye-level photograph.
- [ ] You did NOT override the distortion for "readability" or "narrative flow" — the extreme distortion is the intended artistic style.
- [ ] Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
      `,ar=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`+ar),await new Promise(mt=>setTimeout(mt,800));let jr=DS(ar.trim());return D==="Documentary"&&(jr=LS(jr),Jt(mt=>mt+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`)),Jt(mt=>mt+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ge(jr),Jt(mt=>mt+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),bt("最終プロンプトの構築が完了しました。画像生成を開始します..."),jr}catch(St){console.error(St);const Je=kh(St.message);return Jt(Pe=>Pe+`

[システムエラー]: ${St.message}
--------------------------------------------------
${Je}`),bt("生成エラー: "+St.message),null}finally{clearInterval(yt),ut(!1)}};Ce.useEffect(()=>{ee&&!st&&zt>=3&&Ei()},[tn]);const As=()=>{Y(""),ge(""),ya(null),Vt(""),Jt(""),pe([]),Hn(!1),Nt(0),E(""),C(""),ne(null),je(null),He(null),an(null),oi(null),Cn(!1),bt("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},To=()=>{he(""),Y(""),ge(""),Fe([]),ya(null),on(""),Vt(""),Jt(""),Hn(!1),Nt(0),E(""),C(""),ne(null),je(null),He(null),an(null),oi(null),Cn(!1),P(null),ra([]),pe([]),e(""),yf(""),Gh(""),Hh(""),c(""),es(!1),aa(!1),s(!0),bt("全データをリセットしました。APIキーを再入力してください。")},[ws,Gc]=Ce.useState(!1),[Vr,Ao]=Ce.useState(!1),[Ea,Rs]=Ce.useState(!1),Ul=()=>{ee&&(navigator.clipboard.writeText(ee),Gc(!0),setTimeout(()=>Gc(!1),2e3),bt("クリップボードにコピーしました！"))},Hc=async(de=!1,ct=null)=>{const at=ct||ee;if(kt||!de&&!at)return!1;Lt(!0),rn(!1);const yt=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];tn&&(l==="openai"?yt.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):yt.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),pe(yt);let St=0;const Je=setInterval(()=>{St++;const Pe=Math.floor(St*1.5);pe(Ve=>{const Se=Ve.findIndex(dt=>dt.startsWith("[WAIT]"));if(Se!==-1){const dt=[...Ve];return dt[Se]=`[WAIT] ⏳ 画像生成API応答を待機中... (${Pe}秒経過)`,dt}return[...Ve,`[WAIT] ⏳ 画像生成API応答を待機中... (${Pe}秒経過)`]})},1500);await new Promise(Pe=>setTimeout(Pe,800));try{bt(Rn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),pe(pn=>[...pn,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(pn=>setTimeout(pn,1e3));const Pe=pn=>{pe(Vi=>[...Vi,pn])};let Ve,Se;if(Rn){Pe("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const pn=await yS(at,Pe);Ve=pn.base64Img,Se=pn.usedModel}else{const pn=ke&&pt&&ke.length===4?ke:[];pn.length>0&&Pe(`[REF] 360°背景クロップ画像 ${pn.length}枚を参照画像として添付`);const Vi=await bS(at,Pe,pn);Ve=Vi.base64Img,Se=Vi.usedModel}pe(pn=>[...pn,`[4/5] データストリーム受信完了 (Model: ${Se})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const dt=`data:image/png;base64,${Ve}`;ya(dt),ra(pn=>[{id:Date.now(),img:dt},...pn]);const _n=Se&&Se.startsWith("gpt-");return Se&&!Se.startsWith("gemini-3")&&!_n?(ye(!0),pe(pn=>[...pn,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${Rn?"ChatGPT":"Gemini"}(Web版)を開く: ${Rn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${Rn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(ye(!1),pe(pn=>[...pn,"[COMPLETE] Image successfully generated."])),bt("画像生成完了！"),!0}catch(Pe){console.error(Pe),rn(!0),ya(null);const Ve=Pe.message||"";let Se=[];return Ve.includes("Unknown parameter")||Ve.includes("invalid")||Ve.includes("Invalid")?Se=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${Rn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Rn?"ChatGPT":"Gemini"} (Web版) を開く: ${Rn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Ve.includes("sensitive")||Ve.includes("Responsible AI")||Ve.includes("400")&&!Ve.includes("Unknown parameter")?(Ue(Ve),Be(!0),Se=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):Ve.includes("not found")||Ve.includes("not supported")||Ve.includes("404")||Ve.includes("403")||Ve.includes("401")?Se=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${Rn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${Rn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Rn?"ChatGPT":"Gemini"} (Web版) を開く: ${Rn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Se=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${Rn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Rn?"ChatGPT":"Gemini"} (Web版) を開く: ${Rn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],pe(dt=>[...dt,`[ERROR] ${Pe.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...Se]),bt(`生成エラー: ${Pe.message} `),!1}finally{clearInterval(Je),Lt(!1)}},kf=async()=>{if(!ee||!Te.trim())return;ue(!0),Re("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let de=0;const ct=setInterval(()=>{de++,Re(at=>{const St=`
> ⏳ AI分析中... (${Math.floor(de*1)}秒経過)`,Je=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return Je.test(at)?at.replace(Je,St):at+St})},1e3);try{Re(Se=>Se+`
> [Phase 1/5] エラーメッセージを解析中...`),Re(Se=>Se+`
> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...`);const at=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${Te.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${ee}

【あなたのタスク】:
上記プロンプトの中から、コンテンツポリシーに抵触している「単語・フレーズ」を全て特定し、それぞれに対して安全な代替表現を提案してください。

【検出すべき問題カテゴリ】:
1. 学校・未成年連想: classroom, 教室, 実習室, 校則, school, academy, sailor uniform, serafuku, student council, school rules, 授業 → オフィス・社会人設定に置換
2. 制服・学生服: sailor-style, pleated skirt（学校文脈で使用時）, school blazer, 制服 → ビジネスウェア/カジュアルオフィスに置換
3. 暴力表現: explosion, blast, 爆風, 叩きつけ, striking, slamming, 衝撃波, 激しく叩く → 劇的だが非暴力的な演出に置換
4. 年齢・体型リスク: short height, loli, petite（未成年を連想させる文脈） → 成人の体型表現に置換
5. 過激カメラ: worm's eye view（制服キャラとの組み合わせ時のみ） → より安全なアングルに置換
6. 威嚇・ハラスメント: 怒りの炎, intense fury, 仁王立ち + 攻撃動作 → 威厳ある態度に変換

【出力フォーマット - 厳守】:
以下のJSON配列形式**のみ**を出力してください。説明文や前置き、マークダウンコードフェンスは一切不要です。
JSON配列の最初の文字は [ 、最後の文字は ] であること。

[
  {"from": "問題のある元の表現（プロンプト内の正確な文字列）", "to": "安全な代替表現", "reason": "簡潔な理由"},
  {"from": "...", "to": "...", "reason": "..."}
]

【重要ルール】:
- "from"の値は、プロンプト内に**実在する正確な部分文字列**でなければならない。存在しない文字列を捏造しないこと。
- 1つの"from"は可能な限り短い単位（単語〜1文程度）にすること。段落丸ごとの置換は禁止。
- 問題のない箇所は絶対に含めないこと。修正が必要な箇所のみ列挙すること。
- 最低3個、最大20個の置換ペアを出力すること。
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,yt=await ro(at,[],null,Se=>{Re(dt=>dt+`
> ${Se}`)});if(Re(Se=>Se+`
> [Phase 3/5] AIの応答を受信・解析中...`),!yt.text||yt.text.trim().length<10){Re(Se=>Se+`
> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。`);return}Re(Se=>Se+`
> [Phase 4/5] 置換テーブルをプロンプトに適用中...`);let St=[];try{let Se=yt.text.trim();const dt=Se.match(/```(?:json)?\s*([\s\S]*?)```/);dt&&(Se=dt[1].trim());const _n=Se.indexOf("["),pn=Se.lastIndexOf("]");_n!==-1&&pn!==-1&&(Se=Se.substring(_n,pn+1)),St=JSON.parse(Se)}catch(Se){console.error("JSON parse error:",Se,"Raw:",yt.text),Re(dt=>dt+`
> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...`),await kc();return}if(!Array.isArray(St)||St.length===0){Re(Se=>Se+`
> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。`);return}let Je=ee,Pe=0,Ve=0;for(const Se of St)!Se.from||!Se.to||(Je.includes(Se.from)?(Je=Je.replace(Se.from,Se.to),Pe++,Re(dt=>dt+`
> ✅ "${Se.from.substring(0,40)}..." → "${Se.to.substring(0,40)}..." (${Se.reason||""})`)):(Ve++,Re(dt=>dt+`
> ⚠️ 未発見（スキップ）: "${Se.from.substring(0,50)}..."`)));Pe>0?(ge(Je),Re(Se=>Se+`
> [Phase 5/5] ✅ ${Pe}箇所を修正しました（${Ve}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`),Re(Se=>Se+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),Ue("")):(Re(Se=>Se+`
> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。`),Re(Se=>Se+`
> [GUIDE] フォールバック（全文再生成）モードに切り替えます...`),await kc())}catch(at){console.error(at),Re(yt=>yt+`
> [ERROR] ${at.message}`)}finally{clearInterval(ct),ue(!1)}},kc=async()=>{Re(de=>de+`
> [Fallback] 全文再生成モードで修正中...`);try{const de=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下のプロンプトがAIの安全基準で拒否されました。以下の置換ルールを厳密に適用して、修正後のプロンプト全文を出力してください。

【必須置換ルール（これらを全て適用）】:
- 学校設定 → オフィス/IT企業/会議室に変更: 教室,実習室,classroom → モダンなIT企業のオフィス
- 校則 → 業務規定/社内規定
- セーラー服/sailor-style → ビジネスブラウス/professional business blouse
- プリーツスカート/pleated skirt → テーラードスラックス/tailored slacks（学校文脈の場合のみ）
- 爆風/explosion/blast → 颯爽と/劇的に/dramatic entrance
- 叩きつけ/striking/slamming → 威風堂々と置く/firmly placing
- 衝撃波 → 気迫/aura of authority
- 怒りの炎/intense fury/rage → 強い決意/fierce determination
- 校則を守りなさい → 業務規定を守りなさい
- short height → petite build

【拒否理由・エラー情報】:
${Te.trim()}

【修正対象のプロンプト】:
${ee}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,ct=await ro(de,[],null,at=>{Re(yt=>yt+`
> ${at}`)});ct.text&&ct.text.length>100?(ge(ct.text.trim()),Re(at=>at+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Ue("")):Re(at=>at+`
> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。`)}catch(de){console.error(de),Re(ct=>ct+`
> [Fallback ERROR] ${de.message}`)}};Ce.useEffect(()=>{ts>0&&!ki.current&&Pl()},[ts]);const Pl=async()=>{if(!W||W.length<20){bt("先にキャラクターシートをアップロードしてください。"),Hn(!1);return}ki.current=!1,Hn(!0),aa(!1),Nt(2);const de=[...L].sort(()=>Math.random()-.5),ct=Math.random()>.5?2:1,at=de.slice(0,ct).map(Ve=>Ve.id),yt=L.map(Ve=>({...Ve,checked:at.includes(Ve.id)}));B(yt),E(""),C(""),h("news"),await new Promise(Ve=>setTimeout(Ve,200)),Ms.current?.scrollIntoView({behavior:"smooth",block:"start"});const St=await Il(yt);if(ki.current||!St){Hn(!1),Nt(0),Ii(!1),ki.current&&bt("⏹ フルオートを中断しました。");return}Nt(3),Nl.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(Ve=>setTimeout(Ve,300));const Je=await Ei(!0,St);if(ki.current||!Je){Hn(!1),Nt(0),Ii(!1),ki.current&&bt("⏹ フルオートを中断しました。");return}Nt(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(Ve=>setTimeout(Ve,300));const Pe=await Hc(!0,Je);await new Promise(Ve=>setTimeout(Ve,800)),Dl.current?.scrollIntoView({behavior:"smooth",block:"center"}),Nn.current?ki.current?(Hn(!1),Nt(0),Ii(!1),bt("⏹ 連続生成を中断しました。")):(bt("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{ki.current||sa(Ve=>Ve+1)},2e3)):(Hn(!1),Nt(0),Ii(!1),Pe&&bt("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},Vf=()=>{if(Gn){ki.current=!0,pi>0||ae||Ee||st||kt?(Ii(!0),bt("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(Hn(!1),Nt(0),Ii(!1),bt("フルオートを解除しました。"));return}ki.current=!1,Ii(!1),Hn(!0),W&&W.length>=20?sa(de=>de+1):bt("🚀 フルオート待機中: キャラクターシートをドロップしてください")},zt=!W||W.length<1?1:!oe||oe.length<1?2:ee?yi?5:4:3;return x.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[x.jsx(Lv,{isOpen:i,onSave:Ll,provider:"google"}),x.jsx(Lv,{isOpen:nr,onSave:de=>{const ct=de.trim(),at=Nf();ct===""&&at?(es(!0),bt("🔑 既存のOpenAI APIキーを適用しました。"),ys(!1)):ct.startsWith("sk-")?(Gh(ct),es(!0),bt("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),ys(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{ys(!1),Nf()||es(!1)},provider:"openai"}),x.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[x.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[x.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[x.jsxs("div",{className:`flex items-center gap-1.5 ${zt>=1?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${zt===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":zt>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:zt>1?x.jsx(il,{size:16}):"1"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),x.jsx(_c,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${zt>=2?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${zt===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":zt>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:zt>2?x.jsx(il,{size:16}):"2"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),x.jsx(_c,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${zt>=3?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${zt===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":zt>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:zt>3?x.jsx(il,{size:16}):"3"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),x.jsx(_c,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${zt>=4?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${zt===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":zt>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:zt>4?x.jsx(il,{size:16}):"4"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),x.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),x.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[x.jsxs("button",{disabled:!r||Va,onClick:()=>{const de=!hi;hn(de),Nn.current=de},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:hi?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${hi?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[x.jsx(o_,{size:14,className:hi?"animate-spin":"",style:{animationDuration:"3s"}}),x.jsx("span",{className:"whitespace-nowrap",children:hi?"無限ループ設定 解除":"無限ループ設定 ON"})]}),x.jsxs("button",{disabled:!r||Va,onClick:Vf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:Gn?Va?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Gn?Va?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!Va?"opacity-50 cursor-not-allowed":""}`,children:[Gn?Va?x.jsx(Ia,{size:14,className:"animate-spin"}):x.jsx(DE,{size:14,fill:"currentColor"}):x.jsx(vf,{size:14}),Gn?Va?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),x.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),x.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[x.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),x.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),x.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(l==="openai"||Rn)&&x.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
You are a world-class anime film director and cinematographer. Your mission is to create a SINGLE breathtaking illustration that makes the viewer FEEL something powerful — not just see a character standing there.

READ the user's instruction carefully. Detect the EMOTIONAL VECTOR (joy, sadness, anger, tension, love, loneliness, triumph, fear, nostalgia, serenity, chaos, comedy, etc.) from their text — even if they only say something simple like "draw her eating ramen." Find the hidden emotion and AMPLIFY it through every visual element below.

If the user gives NO emotional direction at all, DEFAULT to creating an image that radiates warmth, narrative depth, and cinematic beauty — as if this frame is the most emotionally pivotal moment in an anime film.

[ 1. EMOTIONAL ACTING & EXPRESSION — The Soul of the Image ]
- FACE: Characters MUST show rich, layered facial expressions. Use the Facial Action Coding System (FACS): combine specific Action Units (brow furrow + lip tremble + glistening eyes = suppressed tears). NEVER draw a flat, neutral, default expression. Every face tells a story.
- EYES: Eyes are the emotional anchor. Draw large, detailed anime eyes with multiple layers: iris gradient, bright catchlight highlights (circular + star sparkle), visible emotion (tears welling, fire burning, light fading, stars sparkling). Eye moisture level should match the emotion.
- BODY LANGUAGE: The entire body must act. Clenched fists for determination, slumped shoulders for defeat, wind-caught hair for freedom, mid-gesture frozen motion for surprise. Weight distribution must feel natural and dynamic — use contrapposto, dynamic lean, or full-body action poses. NEVER use a stiff T-pose or mannequin stance.
- MICRO-EXPRESSIONS: Add subtle secondary expressions — a slight lip quiver, one eyebrow raised higher than the other, fingers gripping fabric unconsciously. These details create emotional depth that separates masterwork from generic output.

[ 2. CINEMATIC CAMERA & LENS — The Director's Eye ]
Choose the camera angle and lens that BEST serves the emotion. Here is your toolkit:
- INTIMACY/VULNERABILITY: Tight close-up (bust shot or face), shallow depth of field (f/1.4 bokeh), slight Dutch angle for unease, or straight-on for confrontation.
- POWER/TRIUMPH: Extreme low angle (worm's-eye view) looking UP at the character. Wide-angle lens (24mm) for imposing presence. Character dominates the frame.
- LONELINESS/SMALLNESS: Extreme wide shot with the character tiny in a vast environment. High angle (bird's-eye) looking DOWN. The emptiness around them IS the emotion.
- ACTION/CHAOS: Dynamic diagonal composition, motion blur on extremities, speed lines radiating from impact point, camera tilted 15-30° Dutch angle.
- NOSTALGIA/MEMORY: Soft telephoto lens (85-135mm) compression, warm color grading, slight vignette at edges, dreamy shallow focus.
- COMEDY/ABSURDITY: Exaggerated wide-angle (fisheye-adjacent) for comedic distortion, super-deformed reaction shots, dramatic zoom lines.
- EPIC/CINEMATIC: Sweeping wide establishing shot with golden ratio composition, atmospheric perspective, volumetric light shafts.
IMPORTANT: NEVER default to a flat, eye-level, center-framed shot. Every camera choice must be INTENTIONAL and emotion-driven.

[ 3. DRAMATIC LIGHTING & COLOR PSYCHOLOGY ]
Lighting is emotion made visible. Match the lighting setup to the feeling:
- JOY/WARMTH: Golden hour warm key light (3000K), soft fill, orange-pink rim light. Warm color palette dominance.
- SADNESS/MELANCHOLY: Cool blue-grey key light, minimal fill (high shadow ratio), single warm accent light (a streetlamp, a phone screen) as a beacon of hope. Desaturated palette with one warm accent color.
- ANGER/INTENSITY: Hard directional red-orange key light from below or side, deep black shadows, high contrast. Saturated reds and magentas.
- TENSION/SUSPENSE: Single harsh spotlight creating extreme contrast, character half-lit half-shadow (split lighting). Cool teal shadows vs warm highlights.
- LOVE/TENDERNESS: Soft diffused backlight creating a luminous halo, warm fill, cherry-blossom pink and peach tones. Ethereal glow.
- TRIUMPH/GLORY: Dramatic backlight explosion (contre-jour), golden rim light outlining the entire silhouette, lens flare from behind.
- FEAR/HORROR: Underlighting (flashlight-under-chin effect), sickly green or purple color cast, deep vignette swallowing the edges.
- NOSTALGIA: Warm sepia-shifted color grading, soft gaussian glow, muted but harmonious palette.
TECHNIQUE: Always use 3-point anime lighting as a BASE (key + fill + rim), then MODIFY it for emotional effect. Use warm/cool color temperature CONTRAST — never flat uniform lighting.

[ 4. ATMOSPHERIC VFX & ENVIRONMENTAL STORYTELLING ]
The environment and effects must ECHO the character's emotion, not just be a backdrop:
- Wind direction, particle effects (petals, leaves, snow, embers, rain), volumetric fog/mist, god rays, and atmospheric haze should all serve the emotional narrative.
- ENVIRONMENTAL EMPATHY: If the character is sad, the sky could be overcast with a single break in the clouds. If joyful, golden light floods the scene. If angry, the environment reacts (cracking ground, swirling debris).
- DEPTH LAYERS: Create clear foreground (blurred elements close to camera), midground (character in sharp focus), and background (atmospheric depth) for cinematic parallax.
- ANTI-GLITTER RULE: Do NOT add random magical floating particles, sparkles, or fairy dust unless the emotion specifically calls for it (like wonder or magic). Keep the air intentional.

[ 5. ART STYLE & VISUAL FIDELITY ]
- RENDER: High-budget Japanese TV anime feature film quality. Clean cel-shading with rich color depth, sharp ink contour lines, smooth gradients. NO photorealistic texturing, NO film grain, NO noise.
- LINE WEIGHT HIERARCHY: Foreground characters get 3px bold ink outlines. Background objects get 1px thin lines. This creates instant visual depth.
- CHARACTER SEPARATION: Add a subtle 2-3px white glow (compositing rim) outside the character's outline to prevent blending with the background. Characters MUST have higher saturation and contrast than their environment.
- HAIR: Must show a glossy anime-style shine band (angel ring / tenshi no wa). Individual strand detail at edges.
- SKIN: Warm subsurface scattering hint on lit areas. Clean shadows with slight color shift (warm light = cool shadow, cool light = warm shadow).

[ 6. TEXT & OUTPUT RULES ]
- If speech bubbles or text are drawn, ALL text MUST be vertical Japanese. ZERO horizontal text.
- Do not add random background text, floating letters, or unnecessary sound effects unless the scene demands it.
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),Rs(!0),setTimeout(()=>Rs(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${Ea?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[x.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[Ea?x.jsx(il,{size:16}):x.jsx(vc,{size:16}),x.jsx("span",{className:"whitespace-nowrap",children:Ea?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),x.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),x.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:x.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${zt===1?"w-1/4 bg-blue-500":zt===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":zt===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":zt>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),x.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[x.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),x.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),x.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[x.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[x.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),x.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:x.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:x.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[x.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[x.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:x.jsx(Ep,{size:28,className:"text-white"})}),x.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",x.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",x.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:fo})]})]}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[x.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),x.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?l==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?l==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?l==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),r&&x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:As,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[x.jsx(o_,{size:12})," シナリオから再生成"]}),x.jsxs("button",{onClick:To,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[x.jsx(AE,{size:12})," エンジン変更・全リセット"]})]})]}),Ae&&(()=>{const de=OS(Ae);return de?x.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${de.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:de.label}),x.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),x.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:de.desc}),x.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[x.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),x.jsxs("p",{children:["現在 ",x.jsx("span",{className:"font-mono text-blue-300",children:Ae})," を使用中。"]}),de.tier==="Lite"&&x.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[x.jsx(c_,{size:10,className:"absolute top-2 right-2"}),x.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),x.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[x.jsxs("section",{onDragOver:de=>{de.preventDefault(),r&&M(!0)},onDragLeave:()=>M(!1),onDrop:de=>{de.preventDefault(),M(!1),r&&Eo(de.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${O?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
                ${zt===1&&!O?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
                ${zt>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[x.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${zt===1?"text-blue-400":"text-slate-500"} `,children:[x.jsx(pE,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),ae&&x.jsx(Ia,{size:18,className:"animate-spin text-blue-400"}),zt>1&&x.jsx(ma,{size:18,className:"text-blue-500"})]}),x.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[Oe.map((de,ct)=>x.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[x.jsx("img",{src:de,className:"w-full h-full object-cover shadow-sm"}),x.jsx("button",{onClick:()=>Fe(Oe.filter((at,yt)=>yt!==ct)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:x.jsx(Bh,{size:16})})]},ct)),K&&x.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${pt?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[x.jsx("img",{src:K,className:`w-full h-full object-cover shadow-sm ${pt?"opacity-100":"opacity-40 grayscale"}`}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[x.jsx(bc,{size:8})," 360° BACKGROUND"]})]}),x.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[ae?x.jsx(Ia,{size:16,className:"animate-spin"}):x.jsx(x.Fragment,{children:x.jsx(RE,{size:16,className:"group-hover/add:scale-125 transition-transform"})}),x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:de=>Eo(de.target.files),disabled:ae})]}),Oe.length===0&&!ae&&x.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:de=>Eo(de.target.files)}),x.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",x.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),x.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",x.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),x.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[x.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),x.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),ae&&x.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[x.jsxs("span",{className:"relative flex h-3 w-3",children:[x.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),x.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),x.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",Oe.length," chars... ",x.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),x.jsx("div",{className:"mb-4",children:x.jsx(Wu,{thought:Rt})}),x.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),x.jsx("textarea",{value:W,onChange:de=>he(de.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(W),za(!0),setTimeout(()=>za(!1),2e3)},disabled:!W,className:`w-full ${ba?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[ba?x.jsx(ma,{size:20}):x.jsx(vc,{size:20}),ba?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]}),x.jsxs("section",{ref:Ms,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${zt===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
                 ${zt>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(zt<2||ae)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),x.jsx("div",{className:"flex items-center justify-between",children:x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${zt===2?"text-purple-400":"text-slate-500"} `,children:[x.jsx(yE,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),x.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[x.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[x.jsxs("button",{onClick:()=>h("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),x.jsxs("button",{onClick:()=>h("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),f==="news"?x.jsxs("div",{className:"space-y-4",children:[x.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[x.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),x.jsx("input",{type:"date",value:$,onChange:de=>k(de.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsx("div",{className:"col-span-2 lg:col-cols-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),L.map(de=>x.jsxs("label",{className:`
                            relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active: border-b-2 active: translate-y-0.5
                            ${de.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
      `,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:de.checked,onChange:()=>A(de.id)}),de.checked&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-2 ${de.checked?"scale-110":"opacity-70 grayscale"} `,children:de.icon}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:de.label})]})]},de.id))]}),x.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",L.filter(de=>de.checked).map(de=>de.keywords).join(" ")||"なし"," (対象日付: ",$,")"]})]}):x.jsxs("div",{className:"space-y-2",children:[x.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",x.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),x.jsx("textarea",{value:m,onChange:de=>p(de.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),x.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[x.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${K&&pt?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[x.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:K&&pt?"#67e8f9":"#ffffff"},children:[x.jsx(bc,{size:14}),K&&pt?"🌐 360°背景 (ON)":"指定場所 (Location Override)",x.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[tt&&x.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[x.jsx(Ia,{size:10,className:"animate-spin"})," 解析中..."]}),K&&x.jsx("button",{onClick:de=>{de.preventDefault(),xn(!pt),bt(pt?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${pt?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:pt?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:pt?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!K&&x.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),K&&pt?x.jsxs("div",{className:"space-y-2",children:[x.jsx(Dv,{imageSrc:K,height:160}),be&&x.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[x.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",be.location]}),x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",be.lighting]}),x.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:be.spatialType==="indoor"?"🏠 室内":be.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),be.mood&&x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",be.mood]})]}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):x.jsx("input",{type:"text",value:g,onChange:de=>E(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[x.jsx(l_,{size:14})," 指定服装 (Outfit Override) ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),x.jsx("input",{type:"text",value:T,onChange:de=>C(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[x.jsx("span",{children:"🎬"})," オチ・ディレクター ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),x.jsxs("select",{value:D,onChange:de=>V(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[x.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),x.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),x.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),x.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),x.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),x.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),x.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),x.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),x.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),x.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),x.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),x.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),x.jsx("button",{onClick:Il,disabled:Ee||zt<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:Ee?x.jsxs(x.Fragment,{children:[x.jsx(Ia,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(vf,{size:24,className:"fill-yellow-400 text-black"}),x.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),x.jsx(_c,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{className:"space-y-4 mt-6",children:[vn&&x.jsx("div",{className:"mt-4",children:x.jsx(Wu,{thought:vn})}),x.jsxs("div",{className:"flex flex-col gap-2",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),x.jsx("textarea",{value:oe,onChange:de=>Y(de.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(oe),Ha(!0),setTimeout(()=>Ha(!1),2e3)},disabled:!oe,className:`w-full ${Ga?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[Ga?x.jsx(ma,{size:20}):x.jsx(vc,{size:20}),Ga?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),x.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${oe&&oe.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>oe&&oe.length>20&&Hr(!Ja),children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🔥"}),x.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),x.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),Xn&&x.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:oe&&oe.length>20?Ja?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),x.jsx(a_,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${Ja?"rotate-180":""}`})]})]}),Ja&&oe&&oe.length>20&&x.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[x.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",x.jsx("br",{}),x.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),x.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ne?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Ne,onChange:()=>vt(!Ne)}),Ne&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Ne?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${lt?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:lt,onChange:()=>Bt(!lt)}),lt&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${lt?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${H?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:H,onChange:()=>De(!H)}),H&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${H?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${fe?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:fe,onChange:()=>Xe(!fe)}),fe&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${fe?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Le?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Le,onChange:()=>we(!Le)}),Le&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Le?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${qe?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:qe,onChange:()=>gt(!qe)}),qe&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(ma,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${qe?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),x.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[Ne&&"表情",lt&&"身体",H&&"演出",fe&&"背景",Le&&"カメラ",qe&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),x.jsxs("div",{className:"flex gap-2",children:[x.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:So,disabled:Wn||!(Ne||lt||H||fe||Le||qe),children:Wn?x.jsxs(x.Fragment,{children:[x.jsx(Ia,{size:16,className:"animate-spin"})," 強化中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(vf,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),x.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${Xn?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:Mo,disabled:Wn||!Xn,children:"↩️ 強化前に戻す"})]}),x.jsx(Wu,{thought:bs||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})]}),x.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${oe?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[x.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[x.jsx(l_,{size:14})," ",K?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",x.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",x.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",x.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const de=oe?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",ct=oe?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",at=oe?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",yt=!!K&&!!be&&pt,St=yt?"背景 (Background)":"場所 (Location)",Je=yt?de||be?.location||"360°画像":de||g.trim()||"AIおまかせ",Pe=yt?"画像解析":g.trim()?"手入力":"AIおまかせ",Ve=yt?"#67e8f9":g.trim()?"#ffffff":"#93c5fd",Se=yt?"rgba(6,182,212,0.3)":g.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",dt=yt?"#67e8f9":g.trim()?"#d1d5db":"#93c5fd",_n=yt?"rgba(6,182,212,0.4)":g.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return x.jsxs(x.Fragment,{children:[x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[yt?x.jsx(bc,{size:12,className:"text-cyan-400"}):x.jsx(bc,{size:12,className:"text-blue-400"}),x.jsxs("span",{children:[St,":"]}),x.jsx("span",{style:{fontWeight:"bold",color:Ve},children:Je}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:Se,color:dt,border:`1px solid ${_n}`},children:Pe})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[x.jsx("span",{className:"text-green-400",children:"👕"}),x.jsx("span",{children:"服装 (Outfit):"}),x.jsx("span",{style:{fontWeight:"bold",color:T.trim()?"#ffffff":"#93c5fd"},children:ct||T.trim()||"AIおまかせ"}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:T.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:T.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${T.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:T.trim()?"手入力":"AIおまかせ"})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[x.jsx("span",{className:"text-yellow-400",children:"🎬"}),x.jsx("span",{children:"オチ (Punchline):"}),x.jsx("span",{style:{fontWeight:"bold",color:at||D!=="Auto"?"#ffffff":"#93c5fd"},children:at||(D==="Auto"?"AIおまかせ":C_(D))}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:D!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:D!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${D!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:D!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),x.jsxs("section",{ref:Nl,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
              ${zt===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
              ${zt>3?"border border-orange-500/30 opacity-100":""}
          `,children:[(zt<3||Ee||ae||Wn||Pt)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:Pt&&zt>=3&&x.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[x.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),x.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),x.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),x.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${zt===3?"text-orange-400":"text-slate-500"}`,children:[x.jsx(zh,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),!1,x.jsx("button",{onClick:()=>Ei(),disabled:st||Pt,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
                   ${zt===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
              `,children:st?x.jsxs(x.Fragment,{children:[x.jsx(Ia,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(zh,{size:24,className:`text-blue-600 ${zt===3?"animate-bounce":""} `}),x.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),x.jsx(_c,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{ref:Ol,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(zt<3||Ee||ae||Wn)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("section",{className:"relative group h-full",children:[x.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),x.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[x.jsx("div",{className:"flex items-center justify-between mb-4",children:x.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[x.jsx("button",{onClick:Ul,disabled:!ee,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:x.jsx(vc,{size:14})}),x.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),x.jsx(Wu,{thought:X,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),x.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[!1,x.jsx("div",{className:"relative flex-1",children:x.jsx("textarea",{value:ee,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),x.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[K&&be&&pt&&ee&&x.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[x.jsx("div",{className:"flex items-start gap-4",children:x.jsxs("div",{className:"flex-1 space-y-1",children:[x.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[x.jsx(bc,{size:12})," 🌐 360°背景モード (ON)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",x.jsx("br",{}),x.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),x.jsx("br",{}),x.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),x.jsx("br",{}),x.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),x.jsx(Dv,{imageSrc:K,height:120}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),ln&&ke&&ke.length===4&&x.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[x.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),x.jsx("div",{className:"grid grid-cols-4 gap-2",children:ln.panels.map((de,ct)=>{const yt=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((de.yaw%360+360)%360/45)%8];return x.jsxs("div",{className:"relative",children:[x.jsx("img",{src:ke[ct],alt:`Panel ${de.panel} - ${yt}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[x.jsxs("span",{className:"font-bold",children:["コマ",de.panel]})," ",yt," ",x.jsxs("span",{className:"text-slate-400",children:["FOV",de.fov,"°"]})]})]},ct)})}),x.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),x.jsxs("button",{onClick:Ul,disabled:!ee,className:`w-full ${ws?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[ws?x.jsx(ma,{size:20}):x.jsx(vc,{size:20}),ws?"コピー完了":l==="openai"?K&&pt?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":K&&pt?tn?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":tn?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),x.jsxs("button",{onClick:()=>{const de=new Date,ct=l==="openai"?"ChatGPT Engine (自動)":tn?"ChatGPT専用プロンプト":"Gemini用プロンプト",at={ファイル情報:{フォーマットバージョン:1,アプリバージョン:fo,保存日時:de.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:de.toISOString()},プロンプト判別:{モード:ct,AIエンジン:l==="openai"?"ChatGPT":"Gemini",ChatGPTモード:tn,説明:l==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":tn?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:W||"(未解析)",シナリオ:oe||"(未生成)",最終プロンプト:ee||"(未生成)",生成設定:{パンチラインタイプ:D,カラーモード:Ie,強化オプション:{表情強化:Ne,ボディランゲージ強化:lt,"照明・演出強化":H,背景強化:fe,カメラワーク強化:Le,"セリフ・ギャグ強化":qe},"360度背景":{画像読込:!!K,有効:pt,場所:be?.location||"(未解析)",空間タイプ:be?.spatialType||"(未解析)",光源:be?.lighting||"(未解析)"}}},yt=JSON.stringify(at,null,2),St=new Blob([yt],{type:"application/json;charset=utf-8"}),Je=URL.createObjectURL(St),Pe=document.createElement("a");Pe.href=Je;const Ve=oe?.match(/タイトル[:：]\s*(.+)/),Se=Ve?Ve[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",dt=`${String(de.getFullYear()).slice(-2)}${String(de.getMonth()+1).padStart(2,"0")}${String(de.getDate()).padStart(2,"0")}${String(de.getHours()).padStart(2,"0")}${String(de.getMinutes()).padStart(2,"0")}${String(de.getSeconds()).padStart(2,"0")}`;Pe.download=`AI_4-koma_metadata_${Se}_${dt}.json`,document.body.appendChild(Pe),Pe.click(),document.body.removeChild(Pe),URL.revokeObjectURL(Je),kr(!0),setTimeout(()=>kr(!1),2500)},disabled:!ee,className:`w-full ${Ln?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${Ln?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${Ln?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[Ln?x.jsx(ma,{size:16}):x.jsx(s_,{size:16}),Ln?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),x.jsxs("div",{className:"relative mt-2",children:[!st&&!ee&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",x.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),x.jsxs("button",{onClick:()=>{console.log("Regenerating..."),Hc()},disabled:!ee||kt,className:`w-full ${l==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[kt?x.jsx(Ia,{size:20,className:"animate-spin"}):x.jsx(r_,{size:20}),x.jsx("div",{className:"flex flex-col items-center",children:x.jsx("span",{children:kt?"再生成中...":`画像を生成する (STEP 4: ${l==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),x.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",x.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",x.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),x.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:x.jsxs("div",{className:"flex items-start gap-2",children:[x.jsx("div",{className:"mt-0.5 text-orange-400",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("circle",{cx:"12",cy:"12",r:"10"}),x.jsx("path",{d:"M12 16v-4"}),x.jsx("path",{d:"M12 8h.01"})]})}),x.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[x.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),x.jsx("br",{}),l==="openai"?x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&pt?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",x.jsx("br",{}),x.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",x.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&pt?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),l==="openai"&&x.jsx("div",{className:"mt-3 block w-full",children:x.jsxs("button",{className:`mt-2 ${Vr?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const de=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

You MUST discard the previously generated image completely.
DO NOT crop, resize, extend, pad, or reuse any part of the previous image.
This is NOT a correction. This is a FULL REGENERATION.

THIS IS A STRUCTURAL CORRECTION TASK. PRIORITIZE LAYOUT OVER STYLE.

━━━━━━━━━━━━━━━━━━
■ ART STYLE PRESERVATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST maintain the high-quality lighting, shading, and rich details of the original manga style.
- DO NOT simplify the art style or colors. 
- "Prioritizing layout" does NOT mean you can degrade the artistic rendering quality.

━━━━━━━━━━━━━━━━━━
■ CANVAS — HARD LOCK
━━━━━━━━━━━━━━━━━━
- Aspect ratio MUST be EXACTLY 1:1.414 (A4 portrait)
- Resolution MUST be EXACTLY 1024×1448 px
- Any taller-than-A4 output is STRICTLY FORBIDDEN
- Any 3:4, square, or long-strip image is a FAILURE

━━━━━━━━━━━━━━━━━━
■ PANEL SYSTEM — HARD LOCK
━━━━━━━━━━━━━━━━━━
- EXACTLY 4 panels
- Panels MUST be horizontal strips stacked vertically
- ALL panels MUST be identical size (height & width)
- Panels MUST fill ~95% of canvas width
- NO extra margins on ANY edge (top/bottom/left/right)

■ GUTTERS
- Thick white gutters between panels (approx 3% height)
- Gutters MUST be uniform
- Panels MUST NOT touch

━━━━━━━━━━━━━━━━━━
■ WATERMARK RE-APPLICATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST REDRAW the watermarks exactly on the 4th panel.
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${fo}"
- Bottom-Left watermark: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor"
- Both MUST be horizontal text (left-to-right). NEVER rotate 90 degrees.
- Do NOT forget to include them in this new generation.

━━━━━━━━━━━━━━━━━━
■ ANTI-ANTIGRAVITY SAFETY
━━━━━━━━━━━━━━━━━━
- Antigravity / extreme camera distortion MUST NOT change canvas shape
- Perspective distortion is allowed ONLY inside panels
- The OUTER CANVAS must remain perfectly A4 rectangular
- NO vertical stretching of entire image
- NO panel deformation due to camera effects

━━━━━━━━━━━━━━━━━━
■ FULL RE-LAYOUT (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST rebuild ALL panel compositions from scratch
- Recalculate framing, character placement, and camera for A4
- DO NOT reuse previous layout, even partially
- DO NOT "adjust" — COMPLETELY REDRAW

━━━━━━━━━━━━━━━━━━
■ STRICT FAILURE CONDITIONS
━━━━━━━━━━━━━━━━━━
If ANY of the following occurs, REGENERATE AGAIN automatically:
- Canvas ratio is not exactly 1:1.414 → FAIL
- Image is taller than A4 → FAIL
- Panels are uneven → FAIL
- Margins exist → FAIL
- Panels look cropped or stretched → FAIL
- Layout resembles previous image → FAIL
- Watermarks are missing → FAIL

Repeat regeneration until ALL conditions are satisfied.

━━━━━━━━━━━━━━━━━━
■ OUTPUT RULE
━━━━━━━━━━━━━━━━━━
Only output the corrected A4 4-panel manga image.
No explanations. No partial results.`;navigator.clipboard.writeText(de),Ao(!0),setTimeout(()=>Ao(!1),2e3)},children:[x.jsx("span",{style:{visibility:Vr?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),Vr&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),x.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${ee?"":"opacity-40 pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>Be(!Ge),disabled:!ee,children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🛡️"}),x.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!ee&&x.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:Ge?"クリックで閉じる":"クリックで開く"}),x.jsx(a_,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${Ge?"rotate-180":""}`})]})]}),Ge&&x.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[x.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[x.jsxs("p",{children:["下の",x.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),x.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",x.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),x.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),x.jsxs("button",{className:`${Ea?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),Rs(!0),setTimeout(()=>Rs(!1),2e3)},children:[x.jsx("span",{style:{visibility:Ea?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),Ea&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),x.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Te,onChange:de=>Ue(de.target.value),placeholder:l==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),x.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:kf,disabled:ze||!Te.trim()||!ee,children:ze?x.jsxs(x.Fragment,{children:[x.jsx(Ia,{size:16,className:"animate-spin"})," 分析・修正中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(zh,{size:16})," 配慮版プロンプトを再生成する"]})}),x.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:me||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),x.jsxs("div",{ref:ns,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[x.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[x.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),x.jsx("span",{className:l==="openai"?"text-emerald-500":"text-blue-500",children:l==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),Q.length===0?x.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):Q.map((de,ct)=>x.jsxs("div",{className:"mb-1 leading-relaxed",children:[x.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),de]},ct)),kt&&x.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),x.jsxs("section",{ref:Dl,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!ee&&!yi&&!kt||Ee||st||Wn||Gn&&pi>0&&pi<4)&&!kt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(Ee||st||Wn||Gn&&pi>0&&pi<4)&&x.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[x.jsx(Ia,{size:36,className:"animate-spin text-blue-500"}),x.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:Ee||st?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),kt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:x.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[x.jsx(Ia,{size:64,className:"animate-spin text-blue-500 mx-auto"}),x.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),x.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[x.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",x.jsxs("span",{className:"flex space-x-1",children:[x.jsx("span",{className:"animate-bounce delay-75",children:"."}),x.jsx("span",{className:"animate-bounce delay-150",children:"."}),x.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),x.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",x.jsx("br",{}),x.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",x.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),x.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:U?x.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:U}):x.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),x.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:yi?x.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[x.jsx("img",{src:yi,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),J&&x.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:x.jsxs("div",{className:"flex items-start gap-3",children:[x.jsx(c_,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),x.jsxs("div",{className:"text-sm",children:[x.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),x.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",x.jsx("br",{}),x.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),x.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[x.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),x.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[x.jsxs("li",{children:["画面左側の「",x.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),x.jsxs("li",{children:[x.jsx("a",{href:Rn?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:Rn?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),x.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),x.jsxs("div",{className:"w-full px-8 mt-2",children:[x.jsxs("button",{onClick:()=>{const de=document.createElement("a");de.href=yi,de.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(de),de.click(),document.body.removeChild(de)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[x.jsx(s_,{size:20})," 画像をダウンロード (.png)"]}),x.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):x.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[x.jsx(Ep,{size:80,className:"mx-auto"}),x.jsxs("div",{className:"space-y-2 text-center",children:[x.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),x.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),Ts.length>0&&x.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(Ee||st||kt||Wn||Gn&&pi>0&&pi<4)&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:x.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[x.jsx(Ia,{size:12,className:"animate-spin"})," 生成中..."]})}),x.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[x.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[x.jsx(r_,{size:14,className:"text-blue-400"}),"生成履歴 (",Ts.length,")"]}),x.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(ra([]),ya(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[x.jsx(Bh,{size:12})," 全削除"]})]}),x.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:Ts.map(de=>x.jsxs("div",{onClick:()=>ya(de.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${yi===de.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[x.jsx("img",{src:de.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),yi===de.img&&x.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:x.jsx(il,{size:10,strokeWidth:3})}),x.jsx("div",{onClick:ct=>{ct.stopPropagation(),ra(at=>at.filter(yt=>yt.id!==de.id)),yi===de.img&&ya("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:x.jsx(Bh,{size:10})})]},de.id))})]})]})]}),x.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",x.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),Ut&&x.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[x.jsx(ma,{size:18,className:"text-green-600"})," ",Ut]}),x.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function vC(){return x.jsx(xC,{children:x.jsx(_C,{})})}sE.createRoot(document.getElementById("root")).render(x.jsx(Ce.StrictMode,{children:x.jsx(vC,{})}));
