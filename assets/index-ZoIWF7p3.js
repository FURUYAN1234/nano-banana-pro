(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function jy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Nh={exports:{}},hc={};var jx;function Xy(){if(jx)return hc;jx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return hc.Fragment=e,hc.jsx=i,hc.jsxs=i,hc}var Xx;function Yy(){return Xx||(Xx=1,Nh.exports=Xy()),Nh.exports}var g=Yy(),Oh={exports:{}},Dt={};var Yx;function Wy(){if(Yx)return Dt;Yx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),x=Symbol.iterator;function S(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,E={};function y(P,Q,Ee){this.props=P,this.context=Q,this.refs=E,this.updater=Ee||T}y.prototype.isReactComponent={},y.prototype.setState=function(P,Q){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Q,"setState")},y.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function C(){}C.prototype=y.prototype;function I(P,Q,Ee){this.props=P,this.context=Q,this.refs=E,this.updater=Ee||T}var U=I.prototype=new C;U.constructor=I,O(U,y.prototype),U.isPureReactComponent=!0;var j=Array.isArray;function L(){}var G={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,Q,Ee){var Ne=Ee.ref;return{$$typeof:r,type:P,key:Q,ref:Ne!==void 0?Ne:null,props:Ee}}function W(P,Q){return F(P.type,Q,P.props)}function H(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function q(P){var Q={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Ee){return Q[Ee]})}var fe=/\/+/g;function he(P,Q){return typeof P=="object"&&P!==null&&P.key!=null?q(""+P.key):Q.toString(36)}function $(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(Q){P.status==="pending"&&(P.status="fulfilled",P.value=Q)},function(Q){P.status==="pending"&&(P.status="rejected",P.reason=Q)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function D(P,Q,Ee,Ne,Oe){var se=typeof P;(se==="undefined"||se==="boolean")&&(P=null);var be=!1;if(P===null)be=!0;else switch(se){case"bigint":case"string":case"number":be=!0;break;case"object":switch(P.$$typeof){case r:case e:be=!0;break;case _:return be=P._init,D(be(P._payload),Q,Ee,Ne,Oe)}}if(be)return Oe=Oe(P),be=Ne===""?"."+he(P,0):Ne,j(Oe)?(Ee="",be!=null&&(Ee=be.replace(fe,"$&/")+"/"),D(Oe,Q,Ee,"",function(gt){return gt})):Oe!=null&&(H(Oe)&&(Oe=W(Oe,Ee+(Oe.key==null||P&&P.key===Oe.key?"":(""+Oe.key).replace(fe,"$&/")+"/")+be)),Q.push(Oe)),1;be=0;var Re=Ne===""?".":Ne+":";if(j(P))for(var ke=0;ke<P.length;ke++)Ne=P[ke],se=Re+he(Ne,ke),be+=D(Ne,Q,Ee,se,Oe);else if(ke=S(P),typeof ke=="function")for(P=ke.call(P),ke=0;!(Ne=P.next()).done;)Ne=Ne.value,se=Re+he(Ne,ke++),be+=D(Ne,Q,Ee,se,Oe);else if(se==="object"){if(typeof P.then=="function")return D($(P),Q,Ee,Ne,Oe);throw Q=String(P),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return be}function z(P,Q,Ee){if(P==null)return P;var Ne=[],Oe=0;return D(P,Ne,"","",function(se){return Q.call(Ee,se,Oe++)}),Ne}function ce(P){if(P._status===-1){var Q=P._result;Q=Q(),Q.then(function(Ee){(P._status===0||P._status===-1)&&(P._status=1,P._result=Ee)},function(Ee){(P._status===0||P._status===-1)&&(P._status=2,P._result=Ee)}),P._status===-1&&(P._status=0,P._result=Q)}if(P._status===1)return P._result.default;throw P._result}var xe=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Ae={map:z,forEach:function(P,Q,Ee){z(P,function(){Q.apply(this,arguments)},Ee)},count:function(P){var Q=0;return z(P,function(){Q++}),Q},toArray:function(P){return z(P,function(Q){return Q})||[]},only:function(P){if(!H(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return Dt.Activity=b,Dt.Children=Ae,Dt.Component=y,Dt.Fragment=i,Dt.Profiler=l,Dt.PureComponent=I,Dt.StrictMode=s,Dt.Suspense=m,Dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=G,Dt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return G.H.useMemoCache(P)}},Dt.cache=function(P){return function(){return P.apply(null,arguments)}},Dt.cacheSignal=function(){return null},Dt.cloneElement=function(P,Q,Ee){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ne=O({},P.props),Oe=P.key;if(Q!=null)for(se in Q.key!==void 0&&(Oe=""+Q.key),Q)!A.call(Q,se)||se==="key"||se==="__self"||se==="__source"||se==="ref"&&Q.ref===void 0||(Ne[se]=Q[se]);var se=arguments.length-2;if(se===1)Ne.children=Ee;else if(1<se){for(var be=Array(se),Re=0;Re<se;Re++)be[Re]=arguments[Re+2];Ne.children=be}return F(P.type,Oe,Ne)},Dt.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},Dt.createElement=function(P,Q,Ee){var Ne,Oe={},se=null;if(Q!=null)for(Ne in Q.key!==void 0&&(se=""+Q.key),Q)A.call(Q,Ne)&&Ne!=="key"&&Ne!=="__self"&&Ne!=="__source"&&(Oe[Ne]=Q[Ne]);var be=arguments.length-2;if(be===1)Oe.children=Ee;else if(1<be){for(var Re=Array(be),ke=0;ke<be;ke++)Re[ke]=arguments[ke+2];Oe.children=Re}if(P&&P.defaultProps)for(Ne in be=P.defaultProps,be)Oe[Ne]===void 0&&(Oe[Ne]=be[Ne]);return F(P,se,Oe)},Dt.createRef=function(){return{current:null}},Dt.forwardRef=function(P){return{$$typeof:h,render:P}},Dt.isValidElement=H,Dt.lazy=function(P){return{$$typeof:_,_payload:{_status:-1,_result:P},_init:ce}},Dt.memo=function(P,Q){return{$$typeof:p,type:P,compare:Q===void 0?null:Q}},Dt.startTransition=function(P){var Q=G.T,Ee={};G.T=Ee;try{var Ne=P(),Oe=G.S;Oe!==null&&Oe(Ee,Ne),typeof Ne=="object"&&Ne!==null&&typeof Ne.then=="function"&&Ne.then(L,xe)}catch(se){xe(se)}finally{Q!==null&&Ee.types!==null&&(Q.types=Ee.types),G.T=Q}},Dt.unstable_useCacheRefresh=function(){return G.H.useCacheRefresh()},Dt.use=function(P){return G.H.use(P)},Dt.useActionState=function(P,Q,Ee){return G.H.useActionState(P,Q,Ee)},Dt.useCallback=function(P,Q){return G.H.useCallback(P,Q)},Dt.useContext=function(P){return G.H.useContext(P)},Dt.useDebugValue=function(){},Dt.useDeferredValue=function(P,Q){return G.H.useDeferredValue(P,Q)},Dt.useEffect=function(P,Q){return G.H.useEffect(P,Q)},Dt.useEffectEvent=function(P){return G.H.useEffectEvent(P)},Dt.useId=function(){return G.H.useId()},Dt.useImperativeHandle=function(P,Q,Ee){return G.H.useImperativeHandle(P,Q,Ee)},Dt.useInsertionEffect=function(P,Q){return G.H.useInsertionEffect(P,Q)},Dt.useLayoutEffect=function(P,Q){return G.H.useLayoutEffect(P,Q)},Dt.useMemo=function(P,Q){return G.H.useMemo(P,Q)},Dt.useOptimistic=function(P,Q){return G.H.useOptimistic(P,Q)},Dt.useReducer=function(P,Q,Ee){return G.H.useReducer(P,Q,Ee)},Dt.useRef=function(P){return G.H.useRef(P)},Dt.useState=function(P){return G.H.useState(P)},Dt.useSyncExternalStore=function(P,Q,Ee){return G.H.useSyncExternalStore(P,Q,Ee)},Dt.useTransition=function(){return G.H.useTransition()},Dt.version="19.2.3",Dt}var Wx;function dm(){return Wx||(Wx=1,Oh.exports=Wy()),Oh.exports}var Ce=dm();const qy=jy(Ce);var Dh={exports:{}},pc={},Lh={exports:{}},Uh={};var qx;function $y(){return qx||(qx=1,(function(r){function e(D,z){var ce=D.length;D.push(z);e:for(;0<ce;){var xe=ce-1>>>1,Ae=D[xe];if(0<l(Ae,z))D[xe]=z,D[ce]=Ae,ce=xe;else break e}}function i(D){return D.length===0?null:D[0]}function s(D){if(D.length===0)return null;var z=D[0],ce=D.pop();if(ce!==z){D[0]=ce;e:for(var xe=0,Ae=D.length,P=Ae>>>1;xe<P;){var Q=2*(xe+1)-1,Ee=D[Q],Ne=Q+1,Oe=D[Ne];if(0>l(Ee,ce))Ne<Ae&&0>l(Oe,Ee)?(D[xe]=Oe,D[Ne]=ce,xe=Ne):(D[xe]=Ee,D[Q]=ce,xe=Q);else if(Ne<Ae&&0>l(Oe,ce))D[xe]=Oe,D[Ne]=ce,xe=Ne;else break e}}return z}function l(D,z){var ce=D.sortIndex-z.sortIndex;return ce!==0?ce:D.id-z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],_=1,b=null,x=3,S=!1,T=!1,O=!1,E=!1,y=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function U(D){for(var z=i(p);z!==null;){if(z.callback===null)s(p);else if(z.startTime<=D)s(p),z.sortIndex=z.expirationTime,e(m,z);else break;z=i(p)}}function j(D){if(O=!1,U(D),!T)if(i(m)!==null)T=!0,L||(L=!0,q());else{var z=i(p);z!==null&&$(j,z.startTime-D)}}var L=!1,G=-1,A=5,F=-1;function W(){return E?!0:!(r.unstable_now()-F<A)}function H(){if(E=!1,L){var D=r.unstable_now();F=D;var z=!0;try{e:{T=!1,O&&(O=!1,C(G),G=-1),S=!0;var ce=x;try{t:{for(U(D),b=i(m);b!==null&&!(b.expirationTime>D&&W());){var xe=b.callback;if(typeof xe=="function"){b.callback=null,x=b.priorityLevel;var Ae=xe(b.expirationTime<=D);if(D=r.unstable_now(),typeof Ae=="function"){b.callback=Ae,U(D),z=!0;break t}b===i(m)&&s(m),U(D)}else s(m);b=i(m)}if(b!==null)z=!0;else{var P=i(p);P!==null&&$(j,P.startTime-D),z=!1}}break e}finally{b=null,x=ce,S=!1}z=void 0}}finally{z?q():L=!1}}}var q;if(typeof I=="function")q=function(){I(H)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,he=fe.port2;fe.port1.onmessage=H,q=function(){he.postMessage(null)}}else q=function(){y(H,0)};function $(D,z){G=y(function(){D(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(D){D.callback=null},r.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<D?Math.floor(1e3/D):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(D){switch(x){case 1:case 2:case 3:var z=3;break;default:z=x}var ce=x;x=z;try{return D()}finally{x=ce}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(D,z){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var ce=x;x=D;try{return z()}finally{x=ce}},r.unstable_scheduleCallback=function(D,z,ce){var xe=r.unstable_now();switch(typeof ce=="object"&&ce!==null?(ce=ce.delay,ce=typeof ce=="number"&&0<ce?xe+ce:xe):ce=xe,D){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=ce+Ae,D={id:_++,callback:z,priorityLevel:D,startTime:ce,expirationTime:Ae,sortIndex:-1},ce>xe?(D.sortIndex=ce,e(p,D),i(m)===null&&D===i(p)&&(O?(C(G),G=-1):O=!0,$(j,ce-xe))):(D.sortIndex=Ae,e(m,D),T||S||(T=!0,L||(L=!0,q()))),D},r.unstable_shouldYield=W,r.unstable_wrapCallback=function(D){var z=x;return function(){var ce=x;x=z;try{return D.apply(this,arguments)}finally{x=ce}}}})(Uh)),Uh}var $x;function Ky(){return $x||($x=1,Lh.exports=$y()),Lh.exports}var Ih={exports:{}},Di={};var Kx;function Zy(){if(Kx)return Di;Kx=1;var r=dm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:b==null?null:""+b,children:m,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Di.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Di.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,_)},Di.flushSync=function(m){var p=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=_,s.d.f()}},Di.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Di.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Di.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,b=h(_,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:b,integrity:x,fetchPriority:S}):_==="script"&&s.d.X(m,{crossOrigin:b,integrity:x,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Di.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Di.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,b=h(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Di.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Di.requestFormReset=function(m){s.d.r(m)},Di.unstable_batchedUpdates=function(m,p){return m(p)},Di.useFormState=function(m,p,_){return f.H.useFormState(m,p,_)},Di.useFormStatus=function(){return f.H.useHostTransitionStatus()},Di.version="19.2.3",Di}var Zx;function Qy(){if(Zx)return Ih.exports;Zx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ih.exports=Zy(),Ih.exports}var Qx;function Jy(){if(Qx)return pc;Qx=1;var r=Ky(),e=dm(),i=Qy();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var v=!1,R=u.child;R;){if(R===a){v=!0,a=u,o=d;break}if(R===o){v=!0,o=u,a=d;break}R=R.sibling}if(!v){for(R=d.child;R;){if(R===a){v=!0,a=d,o=u;break}if(R===o){v=!0,o=d,a=u;break}R=R.sibling}if(!v)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var b=Object.assign,x=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),I=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function q(t){return t===null||typeof t!="object"?null:(t=H&&t[H]||t["@@iterator"],typeof t=="function"?t:null)}var fe=Symbol.for("react.client.reference");function he(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===fe?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case O:return"Fragment";case y:return"Profiler";case E:return"StrictMode";case j:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case T:return"Portal";case I:return t.displayName||"Context";case C:return(t._context.displayName||"Context")+".Consumer";case U:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case G:return n=t.displayName||null,n!==null?n:he(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return he(t(n))}catch{}}return null}var $=Array.isArray,D=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce={pending:!1,data:null,method:null,action:null},xe=[],Ae=-1;function P(t){return{current:t}}function Q(t){0>Ae||(t.current=xe[Ae],xe[Ae]=null,Ae--)}function Ee(t,n){Ae++,xe[Ae]=t.current,t.current=n}var Ne=P(null),Oe=P(null),se=P(null),be=P(null);function Re(t,n){switch(Ee(se,n),Ee(Oe,t),Ee(Ne,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?hx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=hx(n),t=px(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Ne),Ee(Ne,t)}function ke(){Q(Ne),Q(Oe),Q(se)}function gt(t){t.memoizedState!==null&&Ee(be,t);var n=Ne.current,a=px(n,t.type);n!==a&&(Ee(Oe,t),Ee(Ne,a))}function it(t){Oe.current===t&&(Q(Ne),Q(Oe)),be.current===t&&(Q(be),cc._currentValue=ce)}var _n,kt;function Yt(t){if(_n===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);_n=n&&n[1]||"",kt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+_n+t+kt}var mn=!1;function xt(t,n){if(!t||mn)return"";mn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ye=function(){throw Error()};if(Object.defineProperty(ye.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ye,[])}catch(ue){var le=ue}Reflect.construct(t,[],ye)}else{try{ye.call()}catch(ue){le=ue}t.call(ye.prototype)}}else{try{throw Error()}catch(ue){le=ue}(ye=t())&&typeof ye.catch=="function"&&ye.catch(function(){})}}catch(ue){if(ue&&le&&typeof ue.stack=="string")return[ue.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),v=d[0],R=d[1];if(v&&R){var B=v.split(`
`),ie=R.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ie.length&&!ie[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===ie.length)for(o=B.length-1,u=ie.length-1;1<=o&&0<=u&&B[o]!==ie[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==ie[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==ie[u]){var me=`
`+B[o].replace(" at new "," at ");return t.displayName&&me.includes("<anonymous>")&&(me=me.replace("<anonymous>",t.displayName)),me}while(1<=o&&0<=u);break}}}finally{mn=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Yt(a):""}function Gn(t,n){switch(t.tag){case 26:case 27:case 5:return Yt(t.type);case 16:return Yt("Lazy");case 13:return t.child!==n&&n!==null?Yt("Suspense Fallback"):Yt("Suspense");case 19:return Yt("SuspenseList");case 0:case 15:return xt(t.type,!1);case 11:return xt(t.type.render,!1);case 1:return xt(t.type,!0);case 31:return Yt("Activity");default:return""}}function At(t){try{var n="",a=null;do n+=Gn(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ui=Object.prototype.hasOwnProperty,Y=r.unstable_scheduleCallback,Ln=r.unstable_cancelCallback,zt=r.unstable_shouldYield,un=r.unstable_requestPaint,Ue=r.unstable_now,Nn=r.unstable_getCurrentPriorityLevel,N=r.unstable_ImmediatePriority,M=r.unstable_UserBlockingPriority,K=r.unstable_NormalPriority,ge=r.unstable_LowPriority,Te=r.unstable_IdlePriority,Ie=r.log,Be=r.unstable_setDisableYieldValue,de=null,re=null;function ze(t){if(typeof Ie=="function"&&Be(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(de,t)}catch{}}var He=Math.clz32?Math.clz32:ut,De=Math.log,Pe=Math.LN2;function ut(t){return t>>>=0,t===0?32:31-(De(t)/Pe|0)|0}var St=256,Mt=262144,V=4194304;function we(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function pe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,v=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=we(o):(v&=R,v!==0?u=we(v):a||(a=R&~t,a!==0&&(u=we(a))))):(R=o&~d,R!==0?u=we(R):v!==0?u=we(v):a||(a=o&~t,a!==0&&(u=we(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Ge(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Fe(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Se(){var t=V;return V<<=1,(V&62914560)===0&&(V=4194304),t}function et(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function bt(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function In(t,n,a,o,u,d){var v=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,B=t.expirationTimes,ie=t.hiddenUpdates;for(a=v&~a;0<a;){var me=31-He(a),ye=1<<me;R[me]=0,B[me]=-1;var le=ie[me];if(le!==null)for(ie[me]=null,me=0;me<le.length;me++){var ue=le[me];ue!==null&&(ue.lane&=-536870913)}a&=~ye}o!==0&&Gt(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(v&~n))}function Gt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-He(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Bi(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-He(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function zi(t,n){var a=n&-n;return a=(a&42)!==0?1:fi(a),(a&(t.suspendedLanes|n))!==0?0:a}function fi(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ka(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Hr(){var t=z.p;return t!==0?t:(t=window.event,t===void 0?32:Fx(t.type))}function _a(t,n){var a=z.p;try{return z.p=t,n()}finally{z.p=a}}var ti=Math.random().toString(36).slice(2),Zt="__reactFiber$"+ti,ni="__reactProps$"+ti,Vn="__reactContainer$"+ti,aa="__reactEvents$"+ti,yo="__reactListeners$"+ti,Ba="__reactHandles$"+ti,So="__reactResources$"+ti,Za="__reactMarker$"+ti;function xs(t){delete t[Zt],delete t[ni],delete t[aa],delete t[yo],delete t[Ba]}function za(t){var n=t[Zt];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Vn]||a[Zt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=yx(t);t!==null;){if(a=t[Zt])return a;t=yx(t)}return n}t=a,a=t.parentNode}return null}function va(t){if(t=t[Zt]||t[Vn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Qa(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Xi(t){var n=t[So];return n||(n=t[So]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function jn(t){t[Za]=!0}var Cl=new Set,w={};function k(t,n){ae(t,n),ae(t+"Capture",n)}function ae(t,n){for(w[t]=n,t=0;t<n.length;t++)Cl.add(n[t])}var J=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),te={},ve={};function qe(t){return ui.call(ve,t)?!0:ui.call(te,t)?!1:J.test(t)?ve[t]=!0:(te[t]=!0,!1)}function Ve(t,n,a){if(qe(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ke(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ze(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function ht(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Lt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ct(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){a=""+v,d.call(this,v)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(v){a=""+v},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function pt(t){if(!t._valueTracker){var n=Lt(t)?"checked":"value";t._valueTracker=ct(t,n,""+t[n])}}function On(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=Lt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function vn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var fn=/[\n"\\]/g;function Vt(t){return t.replace(fn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function We(t,n,a,o,u,d,v,R){t.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?t.type=v:t.removeAttribute("type"),n!=null?v==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ht(n)):t.value!==""+ht(n)&&(t.value=""+ht(n)):v!=="submit"&&v!=="reset"||t.removeAttribute("value"),n!=null?Ct(t,v,ht(n)):a!=null?Ct(t,v,ht(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+ht(R):t.removeAttribute("name")}function ii(t,n,a,o,u,d,v,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){pt(t);return}a=a!=null?""+ht(a):"",n=n!=null?""+ht(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(t.name=v),pt(t)}function Ct(t,n,a){n==="number"&&vn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Zn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+ht(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Gi(t,n,a){if(n!=null&&(n=""+ht(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ht(a):""}function Yn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if($(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ht(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),pt(t)}function Pn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var sn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Un(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||sn.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Yi(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Un(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&Un(t,d,n[d])}function qt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_s=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function $s(t){return _s.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ba(){}var kr=null;function Hi(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Wi=null,Ni=null;function Nl(t){var n=va(t);if(n&&(t=n.stateNode)){var a=t[ni]||null;e:switch(t=n.stateNode,n.type){case"input":if(We(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Vt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[ni]||null;if(!u)throw Error(s(90));We(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&On(o)}break e;case"textarea":Gi(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&Zn(t,!!a.multiple,n,!1)}}}var Eo=!1;function Fc(t,n,a){if(Eo)return t(n,a);Eo=!0;try{var o=t(n);return o}finally{if(Eo=!1,(Wi!==null||Ni!==null)&&(Eu(),Wi&&(n=Wi,t=Ni,Ni=Wi=null,Nl(n),t)))for(n=0;n<t.length;n++)Nl(t[n])}}function Ks(t,n){var a=t.stateNode;if(a===null)return null;var o=a[ni]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ya=!1;if(qi)try{var sa={};Object.defineProperty(sa,"passive",{get:function(){ya=!0}}),window.addEventListener("test",sa,sa),window.removeEventListener("test",sa,sa)}catch{ya=!1}var Sa=null,Vr=null,Mo=null;function wt(){if(Mo)return Mo;var t,n=Vr,a=n.length,o,u="value"in Sa?Sa.value:Sa.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var v=a-t;for(o=1;o<=v&&n[a-o]===u[d-o];o++);return Mo=u.slice(t,1<o?1-o:void 0)}function Zs(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function To(){return!0}function Bc(){return!1}function Si(t){function n(a,o,u,d,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=v,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?To:Bc,this.isPropagationStopped=Bc,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=To)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=To)},persist:function(){},isPersistent:To}),n}var Ga={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ao=Si(Ga),vs=b({},Ga,{view:0,detail:0}),zc=Si(vs),jr,wo,Ea,bs=b({},vs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Me,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ea&&(Ea&&t.type==="mousemove"?(jr=t.screenX-Ea.screenX,wo=t.screenY-Ea.screenY):wo=jr=0,Ea=t),jr)},movementY:function(t){return"movementY"in t?t.movementY:wo}}),Ol=Si(bs),Gc=b({},bs,{dataTransfer:0}),Bf=Si(Gc),Hc=b({},vs,{relatedTarget:0}),Dl=Si(Hc),zf=b({},Ga,{animationName:0,elapsedTime:0,pseudoElement:0}),jt=Si(zf),oe=b({},Ga,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ft=Si(oe),tt=b({},Ga,{data:0}),yt=Si(tt),dt={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xe={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Le={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function je(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Le[t])?!!n[t]:!1}function Me(){return je}var at=b({},vs,{key:function(t){if(t.key){var n=dt[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Zs(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Xe[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Me,charCode:function(t){return t.type==="keypress"?Zs(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zs(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),st=Si(at),ln=b({},bs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rt=Si(ln),Qs=b({},vs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Me}),Ma=Si(Qs),Ei=b({},Ga,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mi=Si(Ei),_i=b({},bs,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Hn=Si(_i),gn=b({},Ga,{newState:0,oldState:0}),Ft=Si(gn),$t=[9,13,27,32],tn=qi&&"CompositionEvent"in window,dn=null;qi&&"documentMode"in document&&(dn=document.documentMode);var Ha=qi&&"TextEvent"in window&&!dn,ki=qi&&(!tn||dn&&8<dn&&11>=dn),$i=" ",Kt=!1;function Mn(t,n){switch(t){case"keyup":return $t.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Oi(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qn=!1;function Ja(t,n){switch(t){case"compositionend":return Oi(n);case"keypress":return n.which!==32?null:(Kt=!0,$i);case"textInput":return t=n.data,t===$i&&Kt?null:t;default:return null}}function vi(t,n){if(qn)return t==="compositionend"||!tn&&Mn(t,n)?(t=wt(),Mo=Vr=Sa=null,qn=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ki&&n.locale!=="ko"?null:n.data;default:return null}}var es={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ys(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!es[t.type]:n==="textarea"}function Ro(t,n,a,o){Wi?Ni?Ni.push(o):Ni=[o]:Wi=o,n=Nu(n,"onChange"),0<n.length&&(a=new Ao("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Js=null,er=null;function kc(t){ox(t,0)}function Xr(t){var n=Qa(t);if(On(n))return t}function Ll(t,n){if(t==="change")return n}var tr=!1;if(qi){var nr;if(qi){var Et="oninput"in document;if(!Et){var Nt=document.createElement("div");Nt.setAttribute("oninput","return;"),Et=typeof Nt.oninput=="function"}nr=Et}else nr=!1;tr=nr&&(!document.documentMode||9<document.documentMode)}function Qe(){Js&&(Js.detachEvent("onpropertychange",Ot),er=Js=null)}function Ot(t){if(t.propertyName==="value"&&Xr(er)){var n=[];Ro(n,er,t,Hi(t)),Fc(kc,n)}}function $e(t,n,a){t==="focusin"?(Qe(),Js=n,er=a,Js.attachEvent("onpropertychange",Ot)):t==="focusout"&&Qe()}function Je(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Xr(er)}function lt(t,n){if(t==="click")return Xr(n)}function rt(t,n){if(t==="input"||t==="change")return Xr(n)}function Ut(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var It=typeof Object.is=="function"?Object.is:Ut;function Fn(t,n){if(It(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ui.call(n,u)||!It(t[u],n[u]))return!1}return!0}function _t(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function bn(t,n){var a=_t(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=_t(a)}}function Xn(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Xn(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function di(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=vn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=vn(t.document)}return n}function ra(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var ir=qi&&"documentMode"in document&&11>=document.documentMode,Ss=null,Gf=null,Ul=null,Hf=!1;function Im(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Hf||Ss==null||Ss!==vn(o)||(o=Ss,"selectionStart"in o&&ra(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Ul&&Fn(Ul,o)||(Ul=o,o=Nu(Gf,"onSelect"),0<o.length&&(n=new Ao("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Ss)))}function Yr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Co={animationend:Yr("Animation","AnimationEnd"),animationiteration:Yr("Animation","AnimationIteration"),animationstart:Yr("Animation","AnimationStart"),transitionrun:Yr("Transition","TransitionRun"),transitionstart:Yr("Transition","TransitionStart"),transitioncancel:Yr("Transition","TransitionCancel"),transitionend:Yr("Transition","TransitionEnd")},kf={},Pm={};qi&&(Pm=document.createElement("div").style,"AnimationEvent"in window||(delete Co.animationend.animation,delete Co.animationiteration.animation,delete Co.animationstart.animation),"TransitionEvent"in window||delete Co.transitionend.transition);function Wr(t){if(kf[t])return kf[t];if(!Co[t])return t;var n=Co[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Pm)return kf[t]=n[a];return t}var Fm=Wr("animationend"),Bm=Wr("animationiteration"),zm=Wr("animationstart"),Mb=Wr("transitionrun"),Tb=Wr("transitionstart"),Ab=Wr("transitioncancel"),Gm=Wr("transitionend"),Hm=new Map,Vf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Vf.push("scrollEnd");function ka(t,n){Hm.set(t,n),k(n,[t])}var Vc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ta=[],No=0,jf=0;function jc(){for(var t=No,n=jf=No=0;n<t;){var a=Ta[n];Ta[n++]=null;var o=Ta[n];Ta[n++]=null;var u=Ta[n];Ta[n++]=null;var d=Ta[n];if(Ta[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}d!==0&&km(a,u,d)}}function Xc(t,n,a,o){Ta[No++]=t,Ta[No++]=n,Ta[No++]=a,Ta[No++]=o,jf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Xf(t,n,a,o){return Xc(t,n,a,o),Yc(t)}function qr(t,n){return Xc(t,null,null,n),Yc(t)}function km(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-He(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function Yc(t){if(50<nc)throw nc=0,eh=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Oo={};function wb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oa(t,n,a,o){return new wb(t,n,a,o)}function Yf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Es(t,n){var a=t.alternate;return a===null?(a=oa(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Vm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Wc(t,n,a,o,u,d){var v=0;if(o=t,typeof t=="function")Yf(t)&&(v=1);else if(typeof t=="string")v=Dy(t,a,Ne.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=oa(31,a,n,u),t.elementType=F,t.lanes=d,t;case O:return $r(a.children,u,d,n);case E:v=8,u|=24;break;case y:return t=oa(12,a,n,u|2),t.elementType=y,t.lanes=d,t;case j:return t=oa(13,a,n,u),t.elementType=j,t.lanes=d,t;case L:return t=oa(19,a,n,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case I:v=10;break e;case C:v=9;break e;case U:v=11;break e;case G:v=14;break e;case A:v=16,o=null;break e}v=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=oa(v,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function $r(t,n,a,o){return t=oa(7,t,o,n),t.lanes=a,t}function Wf(t,n,a){return t=oa(6,t,null,n),t.lanes=a,t}function jm(t){var n=oa(18,null,null,0);return n.stateNode=t,n}function qf(t,n,a){return n=oa(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Xm=new WeakMap;function Aa(t,n){if(typeof t=="object"&&t!==null){var a=Xm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:At(n)},Xm.set(t,n),n)}return{value:t,source:n,stack:At(n)}}var Do=[],Lo=0,qc=null,Il=0,wa=[],Ra=0,ar=null,ts=1,ns="";function Ms(t,n){Do[Lo++]=Il,Do[Lo++]=qc,qc=t,Il=n}function Ym(t,n,a){wa[Ra++]=ts,wa[Ra++]=ns,wa[Ra++]=ar,ar=t;var o=ts;t=ns;var u=32-He(o)-1;o&=~(1<<u),a+=1;var d=32-He(n)+u;if(30<d){var v=u-u%5;d=(o&(1<<v)-1).toString(32),o>>=v,u-=v,ts=1<<32-He(n)+u|a<<u|o,ns=d+t}else ts=1<<d|a<<u|o,ns=t}function $f(t){t.return!==null&&(Ms(t,1),Ym(t,1,0))}function Kf(t){for(;t===qc;)qc=Do[--Lo],Do[Lo]=null,Il=Do[--Lo],Do[Lo]=null;for(;t===ar;)ar=wa[--Ra],wa[Ra]=null,ns=wa[--Ra],wa[Ra]=null,ts=wa[--Ra],wa[Ra]=null}function Wm(t,n){wa[Ra++]=ts,wa[Ra++]=ns,wa[Ra++]=ar,ts=n.id,ns=n.overflow,ar=t}var Ti=null,Bn=null,rn=!1,sr=null,Ca=!1,Zf=Error(s(519));function rr(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pl(Aa(n,t)),Zf}function qm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Zt]=t,n[ni]=o,a){case"dialog":Jt("cancel",n),Jt("close",n);break;case"iframe":case"object":case"embed":Jt("load",n);break;case"video":case"audio":for(a=0;a<ac.length;a++)Jt(ac[a],n);break;case"source":Jt("error",n);break;case"img":case"image":case"link":Jt("error",n),Jt("load",n);break;case"details":Jt("toggle",n);break;case"input":Jt("invalid",n),ii(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Jt("invalid",n);break;case"textarea":Jt("invalid",n),Yn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||fx(n.textContent,a)?(o.popover!=null&&(Jt("beforetoggle",n),Jt("toggle",n)),o.onScroll!=null&&Jt("scroll",n),o.onScrollEnd!=null&&Jt("scrollend",n),o.onClick!=null&&(n.onclick=ba),n=!0):n=!1,n||rr(t,!0)}function $m(t){for(Ti=t.return;Ti;)switch(Ti.tag){case 5:case 31:case 13:Ca=!1;return;case 27:case 3:Ca=!0;return;default:Ti=Ti.return}}function Uo(t){if(t!==Ti)return!1;if(!rn)return $m(t),rn=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||mh(t.type,t.memoizedProps)),a=!a),a&&Bn&&rr(t),$m(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Bn=bx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Bn=bx(t)}else n===27?(n=Bn,br(t.type)?(t=bh,bh=null,Bn=t):Bn=n):Bn=Ti?Oa(t.stateNode.nextSibling):null;return!0}function Kr(){Bn=Ti=null,rn=!1}function Qf(){var t=sr;return t!==null&&(Ji===null?Ji=t:Ji.push.apply(Ji,t),sr=null),t}function Pl(t){sr===null?sr=[t]:sr.push(t)}var Jf=P(null),Zr=null,Ts=null;function or(t,n,a){Ee(Jf,n._currentValue),n._currentValue=a}function As(t){t._currentValue=Jf.current,Q(Jf)}function ed(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function td(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var v=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var B=0;B<n.length;B++)if(R.context===n[B]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),ed(d.return,a,t),o||(v=null);break e}d=R.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(s(341));v.lanes|=a,d=v.alternate,d!==null&&(d.lanes|=a),ed(v,a,t),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===t){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function Io(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(s(387));if(v=v.memoizedProps,v!==null){var R=u.type;It(u.pendingProps.value,v.value)||(t!==null?t.push(R):t=[R])}}else if(u===be.current){if(v=u.alternate,v===null)throw Error(s(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(cc):t=[cc])}u=u.return}t!==null&&td(n,t,a,o),n.flags|=262144}function $c(t){for(t=t.firstContext;t!==null;){if(!It(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Qr(t){Zr=t,Ts=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ai(t){return Km(Zr,t)}function Kc(t,n){return Zr===null&&Qr(t),Km(t,n)}function Km(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ts===null){if(t===null)throw Error(s(308));Ts=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Ts=Ts.next=n;return a}var Rb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Cb=r.unstable_scheduleCallback,Nb=r.unstable_NormalPriority,ai={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function nd(){return{controller:new Rb,data:new Map,refCount:0}}function Fl(t){t.refCount--,t.refCount===0&&Cb(Nb,function(){t.controller.abort()})}var Bl=null,id=0,Po=0,Fo=null;function Ob(t,n){if(Bl===null){var a=Bl=[];id=0,Po=rh(),Fo={status:"pending",value:void 0,then:function(o){a.push(o)}}}return id++,n.then(Zm,Zm),n}function Zm(){if(--id===0&&Bl!==null){Fo!==null&&(Fo.status="fulfilled");var t=Bl;Bl=null,Po=0,Fo=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Db(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Qm=D.S;D.S=function(t,n){I0=Ue(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ob(t,n),Qm!==null&&Qm(t,n)};var Jr=P(null);function ad(){var t=Jr.current;return t!==null?t:Dn.pooledCache}function Zc(t,n){n===null?Ee(Jr,Jr.current):Ee(Jr,n.pool)}function Jm(){var t=ad();return t===null?null:{parent:ai._currentValue,pool:t}}var Bo=Error(s(460)),sd=Error(s(474)),Qc=Error(s(542)),Jc={then:function(){}};function eg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function tg(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ba,ba),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ig(t),t;default:if(typeof n.status=="string")n.then(ba,ba);else{if(t=Dn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ig(t),t}throw to=n,Bo}}function eo(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(to=a,Bo):a}}var to=null;function ng(){if(to===null)throw Error(s(459));var t=to;return to=null,t}function ig(t){if(t===Bo||t===Qc)throw Error(s(483))}var zo=null,zl=0;function eu(t){var n=zl;return zl+=1,zo===null&&(zo=[]),tg(zo,t,n)}function Gl(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function tu(t,n){throw n.$$typeof===x?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function ag(t){function n(Z,X){if(t){var ne=Z.deletions;ne===null?(Z.deletions=[X],Z.flags|=16):ne.push(X)}}function a(Z,X){if(!t)return null;for(;X!==null;)n(Z,X),X=X.sibling;return null}function o(Z){for(var X=new Map;Z!==null;)Z.key!==null?X.set(Z.key,Z):X.set(Z.index,Z),Z=Z.sibling;return X}function u(Z,X){return Z=Es(Z,X),Z.index=0,Z.sibling=null,Z}function d(Z,X,ne){return Z.index=ne,t?(ne=Z.alternate,ne!==null?(ne=ne.index,ne<X?(Z.flags|=67108866,X):ne):(Z.flags|=67108866,X)):(Z.flags|=1048576,X)}function v(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function R(Z,X,ne,_e){return X===null||X.tag!==6?(X=Wf(ne,Z.mode,_e),X.return=Z,X):(X=u(X,ne),X.return=Z,X)}function B(Z,X,ne,_e){var mt=ne.type;return mt===O?me(Z,X,ne.props.children,_e,ne.key):X!==null&&(X.elementType===mt||typeof mt=="object"&&mt!==null&&mt.$$typeof===A&&eo(mt)===X.type)?(X=u(X,ne.props),Gl(X,ne),X.return=Z,X):(X=Wc(ne.type,ne.key,ne.props,null,Z.mode,_e),Gl(X,ne),X.return=Z,X)}function ie(Z,X,ne,_e){return X===null||X.tag!==4||X.stateNode.containerInfo!==ne.containerInfo||X.stateNode.implementation!==ne.implementation?(X=qf(ne,Z.mode,_e),X.return=Z,X):(X=u(X,ne.children||[]),X.return=Z,X)}function me(Z,X,ne,_e,mt){return X===null||X.tag!==7?(X=$r(ne,Z.mode,_e,mt),X.return=Z,X):(X=u(X,ne),X.return=Z,X)}function ye(Z,X,ne){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Wf(""+X,Z.mode,ne),X.return=Z,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case S:return ne=Wc(X.type,X.key,X.props,null,Z.mode,ne),Gl(ne,X),ne.return=Z,ne;case T:return X=qf(X,Z.mode,ne),X.return=Z,X;case A:return X=eo(X),ye(Z,X,ne)}if($(X)||q(X))return X=$r(X,Z.mode,ne,null),X.return=Z,X;if(typeof X.then=="function")return ye(Z,eu(X),ne);if(X.$$typeof===I)return ye(Z,Kc(Z,X),ne);tu(Z,X)}return null}function le(Z,X,ne,_e){var mt=X!==null?X.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number"||typeof ne=="bigint")return mt!==null?null:R(Z,X,""+ne,_e);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case S:return ne.key===mt?B(Z,X,ne,_e):null;case T:return ne.key===mt?ie(Z,X,ne,_e):null;case A:return ne=eo(ne),le(Z,X,ne,_e)}if($(ne)||q(ne))return mt!==null?null:me(Z,X,ne,_e,null);if(typeof ne.then=="function")return le(Z,X,eu(ne),_e);if(ne.$$typeof===I)return le(Z,X,Kc(Z,ne),_e);tu(Z,ne)}return null}function ue(Z,X,ne,_e,mt){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return Z=Z.get(ne)||null,R(X,Z,""+_e,mt);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case S:return Z=Z.get(_e.key===null?ne:_e.key)||null,B(X,Z,_e,mt);case T:return Z=Z.get(_e.key===null?ne:_e.key)||null,ie(X,Z,_e,mt);case A:return _e=eo(_e),ue(Z,X,ne,_e,mt)}if($(_e)||q(_e))return Z=Z.get(ne)||null,me(X,Z,_e,mt,null);if(typeof _e.then=="function")return ue(Z,X,ne,eu(_e),mt);if(_e.$$typeof===I)return ue(Z,X,ne,Kc(X,_e),mt);tu(X,_e)}return null}function nt(Z,X,ne,_e){for(var mt=null,hn=null,ot=X,Ht=X=0,an=null;ot!==null&&Ht<ne.length;Ht++){ot.index>Ht?(an=ot,ot=null):an=ot.sibling;var pn=le(Z,ot,ne[Ht],_e);if(pn===null){ot===null&&(ot=an);break}t&&ot&&pn.alternate===null&&n(Z,ot),X=d(pn,X,Ht),hn===null?mt=pn:hn.sibling=pn,hn=pn,ot=an}if(Ht===ne.length)return a(Z,ot),rn&&Ms(Z,Ht),mt;if(ot===null){for(;Ht<ne.length;Ht++)ot=ye(Z,ne[Ht],_e),ot!==null&&(X=d(ot,X,Ht),hn===null?mt=ot:hn.sibling=ot,hn=ot);return rn&&Ms(Z,Ht),mt}for(ot=o(ot);Ht<ne.length;Ht++)an=ue(ot,Z,Ht,ne[Ht],_e),an!==null&&(t&&an.alternate!==null&&ot.delete(an.key===null?Ht:an.key),X=d(an,X,Ht),hn===null?mt=an:hn.sibling=an,hn=an);return t&&ot.forEach(function(Tr){return n(Z,Tr)}),rn&&Ms(Z,Ht),mt}function vt(Z,X,ne,_e){if(ne==null)throw Error(s(151));for(var mt=null,hn=null,ot=X,Ht=X=0,an=null,pn=ne.next();ot!==null&&!pn.done;Ht++,pn=ne.next()){ot.index>Ht?(an=ot,ot=null):an=ot.sibling;var Tr=le(Z,ot,pn.value,_e);if(Tr===null){ot===null&&(ot=an);break}t&&ot&&Tr.alternate===null&&n(Z,ot),X=d(Tr,X,Ht),hn===null?mt=Tr:hn.sibling=Tr,hn=Tr,ot=an}if(pn.done)return a(Z,ot),rn&&Ms(Z,Ht),mt;if(ot===null){for(;!pn.done;Ht++,pn=ne.next())pn=ye(Z,pn.value,_e),pn!==null&&(X=d(pn,X,Ht),hn===null?mt=pn:hn.sibling=pn,hn=pn);return rn&&Ms(Z,Ht),mt}for(ot=o(ot);!pn.done;Ht++,pn=ne.next())pn=ue(ot,Z,Ht,pn.value,_e),pn!==null&&(t&&pn.alternate!==null&&ot.delete(pn.key===null?Ht:pn.key),X=d(pn,X,Ht),hn===null?mt=pn:hn.sibling=pn,hn=pn);return t&&ot.forEach(function(Vy){return n(Z,Vy)}),rn&&Ms(Z,Ht),mt}function wn(Z,X,ne,_e){if(typeof ne=="object"&&ne!==null&&ne.type===O&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case S:e:{for(var mt=ne.key;X!==null;){if(X.key===mt){if(mt=ne.type,mt===O){if(X.tag===7){a(Z,X.sibling),_e=u(X,ne.props.children),_e.return=Z,Z=_e;break e}}else if(X.elementType===mt||typeof mt=="object"&&mt!==null&&mt.$$typeof===A&&eo(mt)===X.type){a(Z,X.sibling),_e=u(X,ne.props),Gl(_e,ne),_e.return=Z,Z=_e;break e}a(Z,X);break}else n(Z,X);X=X.sibling}ne.type===O?(_e=$r(ne.props.children,Z.mode,_e,ne.key),_e.return=Z,Z=_e):(_e=Wc(ne.type,ne.key,ne.props,null,Z.mode,_e),Gl(_e,ne),_e.return=Z,Z=_e)}return v(Z);case T:e:{for(mt=ne.key;X!==null;){if(X.key===mt)if(X.tag===4&&X.stateNode.containerInfo===ne.containerInfo&&X.stateNode.implementation===ne.implementation){a(Z,X.sibling),_e=u(X,ne.children||[]),_e.return=Z,Z=_e;break e}else{a(Z,X);break}else n(Z,X);X=X.sibling}_e=qf(ne,Z.mode,_e),_e.return=Z,Z=_e}return v(Z);case A:return ne=eo(ne),wn(Z,X,ne,_e)}if($(ne))return nt(Z,X,ne,_e);if(q(ne)){if(mt=q(ne),typeof mt!="function")throw Error(s(150));return ne=mt.call(ne),vt(Z,X,ne,_e)}if(typeof ne.then=="function")return wn(Z,X,eu(ne),_e);if(ne.$$typeof===I)return wn(Z,X,Kc(Z,ne),_e);tu(Z,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"||typeof ne=="bigint"?(ne=""+ne,X!==null&&X.tag===6?(a(Z,X.sibling),_e=u(X,ne),_e.return=Z,Z=_e):(a(Z,X),_e=Wf(ne,Z.mode,_e),_e.return=Z,Z=_e),v(Z)):a(Z,X)}return function(Z,X,ne,_e){try{zl=0;var mt=wn(Z,X,ne,_e);return zo=null,mt}catch(ot){if(ot===Bo||ot===Qc)throw ot;var hn=oa(29,ot,null,Z.mode);return hn.lanes=_e,hn.return=Z,hn}}}var no=ag(!0),sg=ag(!1),lr=!1;function rd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function od(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function cr(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ur(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(xn&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Yc(t),km(t,null,a),n}return Xc(t,o,n,a),Yc(t)}function Hl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Bi(t,a)}}function ld(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=v:d=d.next=v,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var cd=!1;function kl(){if(cd){var t=Fo;if(t!==null)throw t}}function Vl(t,n,a,o){cd=!1;var u=t.updateQueue;lr=!1;var d=u.firstBaseUpdate,v=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var B=R,ie=B.next;B.next=null,v===null?d=ie:v.next=ie,v=B;var me=t.alternate;me!==null&&(me=me.updateQueue,R=me.lastBaseUpdate,R!==v&&(R===null?me.firstBaseUpdate=ie:R.next=ie,me.lastBaseUpdate=B))}if(d!==null){var ye=u.baseState;v=0,me=ie=B=null,R=d;do{var le=R.lane&-536870913,ue=le!==R.lane;if(ue?(nn&le)===le:(o&le)===le){le!==0&&le===Po&&(cd=!0),me!==null&&(me=me.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var nt=t,vt=R;le=n;var wn=a;switch(vt.tag){case 1:if(nt=vt.payload,typeof nt=="function"){ye=nt.call(wn,ye,le);break e}ye=nt;break e;case 3:nt.flags=nt.flags&-65537|128;case 0:if(nt=vt.payload,le=typeof nt=="function"?nt.call(wn,ye,le):nt,le==null)break e;ye=b({},ye,le);break e;case 2:lr=!0}}le=R.callback,le!==null&&(t.flags|=64,ue&&(t.flags|=8192),ue=u.callbacks,ue===null?u.callbacks=[le]:ue.push(le))}else ue={lane:le,tag:R.tag,payload:R.payload,callback:R.callback,next:null},me===null?(ie=me=ue,B=ye):me=me.next=ue,v|=le;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;ue=R,R=ue.next,ue.next=null,u.lastBaseUpdate=ue,u.shared.pending=null}}while(!0);me===null&&(B=ye),u.baseState=B,u.firstBaseUpdate=ie,u.lastBaseUpdate=me,d===null&&(u.shared.lanes=0),mr|=v,t.lanes=v,t.memoizedState=ye}}function rg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function og(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)rg(a[t],n)}var Go=P(null),nu=P(0);function lg(t,n){t=Is,Ee(nu,t),Ee(Go,n),Is=t|n.baseLanes}function ud(){Ee(nu,Is),Ee(Go,Go.current)}function fd(){Is=nu.current,Q(Go),Q(nu)}var la=P(null),Na=null;function fr(t){var n=t.alternate;Ee(Qn,Qn.current&1),Ee(la,t),Na===null&&(n===null||Go.current!==null||n.memoizedState!==null)&&(Na=t)}function dd(t){Ee(Qn,Qn.current),Ee(la,t),Na===null&&(Na=t)}function cg(t){t.tag===22?(Ee(Qn,Qn.current),Ee(la,t),Na===null&&(Na=t)):dr()}function dr(){Ee(Qn,Qn.current),Ee(la,la.current)}function ca(t){Q(la),Na===t&&(Na=null),Q(Qn)}var Qn=P(0);function iu(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||_h(a)||vh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ws=0,Bt=null,Tn=null,si=null,au=!1,Ho=!1,io=!1,su=0,jl=0,ko=null,Lb=0;function $n(){throw Error(s(321))}function hd(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!It(t[a],n[a]))return!1;return!0}function pd(t,n,a,o,u,d){return ws=d,Bt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,D.H=t===null||t.memoizedState===null?Yg:Cd,io=!1,d=a(o,u),io=!1,Ho&&(d=fg(n,a,o,u)),ug(t),d}function ug(t){D.H=Wl;var n=Tn!==null&&Tn.next!==null;if(ws=0,si=Tn=Bt=null,au=!1,jl=0,ko=null,n)throw Error(s(300));t===null||ri||(t=t.dependencies,t!==null&&$c(t)&&(ri=!0))}function fg(t,n,a,o){Bt=t;var u=0;do{if(Ho&&(ko=null),jl=0,Ho=!1,25<=u)throw Error(s(301));if(u+=1,si=Tn=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}D.H=Wg,d=n(a,o)}while(Ho);return d}function Ub(){var t=D.H,n=t.useState()[0];return n=typeof n.then=="function"?Xl(n):n,t=t.useState()[0],(Tn!==null?Tn.memoizedState:null)!==t&&(Bt.flags|=1024),n}function md(){var t=su!==0;return su=0,t}function gd(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function xd(t){if(au){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}au=!1}ws=0,si=Tn=Bt=null,Ho=!1,jl=su=0,ko=null}function Vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return si===null?Bt.memoizedState=si=t:si=si.next=t,si}function Jn(){if(Tn===null){var t=Bt.alternate;t=t!==null?t.memoizedState:null}else t=Tn.next;var n=si===null?Bt.memoizedState:si.next;if(n!==null)si=n,Tn=t;else{if(t===null)throw Bt.alternate===null?Error(s(467)):Error(s(310));Tn=t,t={memoizedState:Tn.memoizedState,baseState:Tn.baseState,baseQueue:Tn.baseQueue,queue:Tn.queue,next:null},si===null?Bt.memoizedState=si=t:si=si.next=t}return si}function ru(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xl(t){var n=jl;return jl+=1,ko===null&&(ko=[]),t=tg(ko,t,n),n=Bt,(si===null?n.memoizedState:si.next)===null&&(n=n.alternate,D.H=n===null||n.memoizedState===null?Yg:Cd),t}function ou(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Xl(t);if(t.$$typeof===I)return Ai(t)}throw Error(s(438,String(t)))}function _d(t){var n=null,a=Bt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=Bt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ru(),Bt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=W;return n.index++,a}function Rs(t,n){return typeof n=="function"?n(t):n}function lu(t){var n=Jn();return vd(n,Tn,t)}function vd(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var v=u.next;u.next=d.next,d.next=v}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=v=null,B=null,ie=n,me=!1;do{var ye=ie.lane&-536870913;if(ye!==ie.lane?(nn&ye)===ye:(ws&ye)===ye){var le=ie.revertLane;if(le===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null}),ye===Po&&(me=!0);else if((ws&le)===le){ie=ie.next,le===Po&&(me=!0);continue}else ye={lane:0,revertLane:ie.revertLane,gesture:null,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},B===null?(R=B=ye,v=d):B=B.next=ye,Bt.lanes|=le,mr|=le;ye=ie.action,io&&a(d,ye),d=ie.hasEagerState?ie.eagerState:a(d,ye)}else le={lane:ye,revertLane:ie.revertLane,gesture:ie.gesture,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null},B===null?(R=B=le,v=d):B=B.next=le,Bt.lanes|=ye,mr|=ye;ie=ie.next}while(ie!==null&&ie!==n);if(B===null?v=d:B.next=R,!It(d,t.memoizedState)&&(ri=!0,me&&(a=Fo,a!==null)))throw a;t.memoizedState=d,t.baseState=v,t.baseQueue=B,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function bd(t){var n=Jn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do d=t(d,v.action),v=v.next;while(v!==u);It(d,n.memoizedState)||(ri=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function dg(t,n,a){var o=Bt,u=Jn(),d=rn;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var v=!It((Tn||u).memoizedState,a);if(v&&(u.memoizedState=a,ri=!0),u=u.queue,Ed(mg.bind(null,o,u,t),[t]),u.getSnapshot!==n||v||si!==null&&si.memoizedState.tag&1){if(o.flags|=2048,Vo(9,{destroy:void 0},pg.bind(null,o,u,a,n),null),Dn===null)throw Error(s(349));d||(ws&127)!==0||hg(o,n,a)}return a}function hg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Bt.updateQueue,n===null?(n=ru(),Bt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function pg(t,n,a,o){n.value=a,n.getSnapshot=o,gg(n)&&xg(t)}function mg(t,n,a){return a(function(){gg(n)&&xg(t)})}function gg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!It(t,a)}catch{return!0}}function xg(t){var n=qr(t,2);n!==null&&ea(n,t,2)}function yd(t){var n=Vi();if(typeof t=="function"){var a=t;if(t=a(),io){ze(!0);try{a()}finally{ze(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rs,lastRenderedState:t},n}function _g(t,n,a,o){return t.baseState=a,vd(t,Tn,typeof o=="function"?o:Rs)}function Ib(t,n,a,o,u){if(fu(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){d.listeners.push(v)}};D.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,vg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function vg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=D.T,v={};D.T=v;try{var R=a(u,o),B=D.S;B!==null&&B(v,R),bg(t,n,R)}catch(ie){Sd(t,n,ie)}finally{d!==null&&v.types!==null&&(d.types=v.types),D.T=d}}else try{d=a(u,o),bg(t,n,d)}catch(ie){Sd(t,n,ie)}}function bg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){yg(t,n,o)},function(o){return Sd(t,n,o)}):yg(t,n,a)}function yg(t,n,a){n.status="fulfilled",n.value=a,Sg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,vg(t,a)))}function Sd(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Sg(n),n=n.next;while(n!==o)}t.action=null}function Sg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Eg(t,n){return n}function Mg(t,n){if(rn){var a=Dn.formState;if(a!==null){e:{var o=Bt;if(rn){if(Bn){t:{for(var u=Bn,d=Ca;u.nodeType!==8;){if(!d){u=null;break t}if(u=Oa(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Bn=Oa(u.nextSibling),o=u.data==="F!";break e}}rr(o)}o=!1}o&&(n=a[0])}}return a=Vi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Eg,lastRenderedState:n},a.queue=o,a=Vg.bind(null,Bt,o),o.dispatch=a,o=yd(!1),d=Rd.bind(null,Bt,!1,o.queue),o=Vi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Ib.bind(null,Bt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Tg(t){var n=Jn();return Ag(n,Tn,t)}function Ag(t,n,a){if(n=vd(t,n,Eg)[0],t=lu(Rs)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Xl(n)}catch(v){throw v===Bo?Qc:v}else o=n;n=Jn();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(Bt.flags|=2048,Vo(9,{destroy:void 0},Pb.bind(null,u,a),null)),[o,d,t]}function Pb(t,n){t.action=n}function wg(t){var n=Jn(),a=Tn;if(a!==null)return Ag(n,a,t);Jn(),n=n.memoizedState,a=Jn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function Vo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=Bt.updateQueue,n===null&&(n=ru(),Bt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Rg(){return Jn().memoizedState}function cu(t,n,a,o){var u=Vi();Bt.flags|=t,u.memoizedState=Vo(1|n,{destroy:void 0},a,o===void 0?null:o)}function uu(t,n,a,o){var u=Jn();o=o===void 0?null:o;var d=u.memoizedState.inst;Tn!==null&&o!==null&&hd(o,Tn.memoizedState.deps)?u.memoizedState=Vo(n,d,a,o):(Bt.flags|=t,u.memoizedState=Vo(1|n,d,a,o))}function Cg(t,n){cu(8390656,8,t,n)}function Ed(t,n){uu(2048,8,t,n)}function Fb(t){Bt.flags|=4;var n=Bt.updateQueue;if(n===null)n=ru(),Bt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Ng(t){var n=Jn().memoizedState;return Fb({ref:n,nextImpl:t}),function(){if((xn&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Og(t,n){return uu(4,2,t,n)}function Dg(t,n){return uu(4,4,t,n)}function Lg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Ug(t,n,a){a=a!=null?a.concat([t]):null,uu(4,4,Lg.bind(null,n,t),a)}function Md(){}function Ig(t,n){var a=Jn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&hd(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Pg(t,n){var a=Jn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&hd(n,o[1]))return o[0];if(o=t(),io){ze(!0);try{t()}finally{ze(!1)}}return a.memoizedState=[o,n],o}function Td(t,n,a){return a===void 0||(ws&1073741824)!==0&&(nn&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=F0(),Bt.lanes|=t,mr|=t,a)}function Fg(t,n,a,o){return It(a,n)?a:Go.current!==null?(t=Td(t,a,o),It(t,n)||(ri=!0),t):(ws&42)===0||(ws&1073741824)!==0&&(nn&261930)===0?(ri=!0,t.memoizedState=a):(t=F0(),Bt.lanes|=t,mr|=t,n)}function Bg(t,n,a,o,u){var d=z.p;z.p=d!==0&&8>d?d:8;var v=D.T,R={};D.T=R,Rd(t,!1,n,a);try{var B=u(),ie=D.S;if(ie!==null&&ie(R,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var me=Db(B,o);Yl(t,n,me,da(t))}else Yl(t,n,o,da(t))}catch(ye){Yl(t,n,{then:function(){},status:"rejected",reason:ye},da())}finally{z.p=d,v!==null&&R.types!==null&&(v.types=R.types),D.T=v}}function Bb(){}function Ad(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=zg(t).queue;Bg(t,u,n,ce,a===null?Bb:function(){return Gg(t),a(o)})}function zg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ce,baseState:ce,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rs,lastRenderedState:ce},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rs,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Gg(t){var n=zg(t);n.next===null&&(n=t.alternate.memoizedState),Yl(t,n.next.queue,{},da())}function wd(){return Ai(cc)}function Hg(){return Jn().memoizedState}function kg(){return Jn().memoizedState}function zb(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=da();t=cr(a);var o=ur(n,t,a);o!==null&&(ea(o,n,a),Hl(o,n,a)),n={cache:nd()},t.payload=n;return}n=n.return}}function Gb(t,n,a){var o=da();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},fu(t)?jg(n,a):(a=Xf(t,n,a,o),a!==null&&(ea(a,t,o),Xg(a,n,o)))}function Vg(t,n,a){var o=da();Yl(t,n,a,o)}function Yl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(fu(t))jg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var v=n.lastRenderedState,R=d(v,a);if(u.hasEagerState=!0,u.eagerState=R,It(R,v))return Xc(t,n,u,0),Dn===null&&jc(),!1}catch{}if(a=Xf(t,n,u,o),a!==null)return ea(a,t,o),Xg(a,n,o),!0}return!1}function Rd(t,n,a,o){if(o={lane:2,revertLane:rh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},fu(t)){if(n)throw Error(s(479))}else n=Xf(t,a,o,2),n!==null&&ea(n,t,2)}function fu(t){var n=t.alternate;return t===Bt||n!==null&&n===Bt}function jg(t,n){Ho=au=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Xg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Bi(t,a)}}var Wl={readContext:Ai,use:ou,useCallback:$n,useContext:$n,useEffect:$n,useImperativeHandle:$n,useLayoutEffect:$n,useInsertionEffect:$n,useMemo:$n,useReducer:$n,useRef:$n,useState:$n,useDebugValue:$n,useDeferredValue:$n,useTransition:$n,useSyncExternalStore:$n,useId:$n,useHostTransitionStatus:$n,useFormState:$n,useActionState:$n,useOptimistic:$n,useMemoCache:$n,useCacheRefresh:$n};Wl.useEffectEvent=$n;var Yg={readContext:Ai,use:ou,useCallback:function(t,n){return Vi().memoizedState=[t,n===void 0?null:n],t},useContext:Ai,useEffect:Cg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,cu(4194308,4,Lg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return cu(4194308,4,t,n)},useInsertionEffect:function(t,n){cu(4,2,t,n)},useMemo:function(t,n){var a=Vi();n=n===void 0?null:n;var o=t();if(io){ze(!0);try{t()}finally{ze(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Vi();if(a!==void 0){var u=a(n);if(io){ze(!0);try{a(n)}finally{ze(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=Gb.bind(null,Bt,t),[o.memoizedState,t]},useRef:function(t){var n=Vi();return t={current:t},n.memoizedState=t},useState:function(t){t=yd(t);var n=t.queue,a=Vg.bind(null,Bt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Md,useDeferredValue:function(t,n){var a=Vi();return Td(a,t,n)},useTransition:function(){var t=yd(!1);return t=Bg.bind(null,Bt,t.queue,!0,!1),Vi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=Bt,u=Vi();if(rn){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Dn===null)throw Error(s(349));(nn&127)!==0||hg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Cg(mg.bind(null,o,d,t),[t]),o.flags|=2048,Vo(9,{destroy:void 0},pg.bind(null,o,d,a,n),null),a},useId:function(){var t=Vi(),n=Dn.identifierPrefix;if(rn){var a=ns,o=ts;a=(o&~(1<<32-He(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=su++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Lb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:wd,useFormState:Mg,useActionState:Mg,useOptimistic:function(t){var n=Vi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Rd.bind(null,Bt,!0,a),a.dispatch=n,[t,n]},useMemoCache:_d,useCacheRefresh:function(){return Vi().memoizedState=zb.bind(null,Bt)},useEffectEvent:function(t){var n=Vi(),a={impl:t};return n.memoizedState=a,function(){if((xn&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Cd={readContext:Ai,use:ou,useCallback:Ig,useContext:Ai,useEffect:Ed,useImperativeHandle:Ug,useInsertionEffect:Og,useLayoutEffect:Dg,useMemo:Pg,useReducer:lu,useRef:Rg,useState:function(){return lu(Rs)},useDebugValue:Md,useDeferredValue:function(t,n){var a=Jn();return Fg(a,Tn.memoizedState,t,n)},useTransition:function(){var t=lu(Rs)[0],n=Jn().memoizedState;return[typeof t=="boolean"?t:Xl(t),n]},useSyncExternalStore:dg,useId:Hg,useHostTransitionStatus:wd,useFormState:Tg,useActionState:Tg,useOptimistic:function(t,n){var a=Jn();return _g(a,Tn,t,n)},useMemoCache:_d,useCacheRefresh:kg};Cd.useEffectEvent=Ng;var Wg={readContext:Ai,use:ou,useCallback:Ig,useContext:Ai,useEffect:Ed,useImperativeHandle:Ug,useInsertionEffect:Og,useLayoutEffect:Dg,useMemo:Pg,useReducer:bd,useRef:Rg,useState:function(){return bd(Rs)},useDebugValue:Md,useDeferredValue:function(t,n){var a=Jn();return Tn===null?Td(a,t,n):Fg(a,Tn.memoizedState,t,n)},useTransition:function(){var t=bd(Rs)[0],n=Jn().memoizedState;return[typeof t=="boolean"?t:Xl(t),n]},useSyncExternalStore:dg,useId:Hg,useHostTransitionStatus:wd,useFormState:wg,useActionState:wg,useOptimistic:function(t,n){var a=Jn();return Tn!==null?_g(a,Tn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:_d,useCacheRefresh:kg};Wg.useEffectEvent=Ng;function Nd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:b({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Od={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=da(),u=cr(o);u.payload=n,a!=null&&(u.callback=a),n=ur(t,u,o),n!==null&&(ea(n,t,o),Hl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=da(),u=cr(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=ur(t,u,o),n!==null&&(ea(n,t,o),Hl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=da(),o=cr(a);o.tag=2,n!=null&&(o.callback=n),n=ur(t,o,a),n!==null&&(ea(n,t,a),Hl(n,t,a))}};function qg(t,n,a,o,u,d,v){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,v):n.prototype&&n.prototype.isPureReactComponent?!Fn(a,o)||!Fn(u,d):!0}function $g(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Od.enqueueReplaceState(n,n.state,null)}function ao(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=b({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Kg(t){Vc(t)}function Zg(t){console.error(t)}function Qg(t){Vc(t)}function du(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Jg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Dd(t,n,a){return a=cr(a),a.tag=3,a.payload={element:null},a.callback=function(){du(t,n)},a}function e0(t){return t=cr(t),t.tag=3,t}function t0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){Jg(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(t.callback=function(){Jg(n,a,o),typeof u!="function"&&(gr===null?gr=new Set([this]):gr.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function Hb(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Io(n,a,u,!0),a=la.current,a!==null){switch(a.tag){case 31:case 13:return Na===null?Mu():a.alternate===null&&Kn===0&&(Kn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Jc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),ih(t,o,u)),!1;case 22:return a.flags|=65536,o===Jc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),ih(t,o,u)),!1}throw Error(s(435,a.tag))}return ih(t,o,u),Mu(),!1}if(rn)return n=la.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Zf&&(t=Error(s(422),{cause:o}),Pl(Aa(t,a)))):(o!==Zf&&(n=Error(s(423),{cause:o}),Pl(Aa(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Aa(o,a),u=Dd(t.stateNode,o,u),ld(t,u),Kn!==4&&(Kn=2)),!1;var d=Error(s(520),{cause:o});if(d=Aa(d,a),tc===null?tc=[d]:tc.push(d),Kn!==4&&(Kn=2),n===null)return!0;o=Aa(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Dd(a.stateNode,o,t),ld(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(gr===null||!gr.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=e0(u),t0(u,t,a,o),ld(a,u),!1}a=a.return}while(a!==null);return!1}var Ld=Error(s(461)),ri=!1;function wi(t,n,a,o){n.child=t===null?sg(n,null,a,o):no(n,t.child,a,o)}function n0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var v={};for(var R in o)R!=="ref"&&(v[R]=o[R])}else v=o;return Qr(n),o=pd(t,n,a,v,d,u),R=md(),t!==null&&!ri?(gd(t,n,u),Cs(t,n,u)):(rn&&R&&$f(n),n.flags|=1,wi(t,n,o,u),n.child)}function i0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!Yf(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,a0(t,n,d,o,u)):(t=Wc(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Hd(t,u)){var v=d.memoizedProps;if(a=a.compare,a=a!==null?a:Fn,a(v,o)&&t.ref===n.ref)return Cs(t,n,u)}return n.flags|=1,t=Es(d,o),t.ref=n.ref,t.return=n,n.child=t}function a0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(Fn(d,o)&&t.ref===n.ref)if(ri=!1,n.pendingProps=o=d,Hd(t,u))(t.flags&131072)!==0&&(ri=!0);else return n.lanes=t.lanes,Cs(t,n,u)}return Ud(t,n,a,o,u)}function s0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return r0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Zc(n,d!==null?d.cachePool:null),d!==null?lg(n,d):ud(),cg(n);else return o=n.lanes=536870912,r0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Zc(n,d.cachePool),lg(n,d),dr(),n.memoizedState=null):(t!==null&&Zc(n,null),ud(),dr());return wi(t,n,u,a),n.child}function ql(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function r0(t,n,a,o,u){var d=ad();return d=d===null?null:{parent:ai._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&Zc(n,null),ud(),cg(n),t!==null&&Io(t,n,o,!0),n.childLanes=u,null}function hu(t,n){return n=mu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function o0(t,n,a){return no(n,t.child,null,a),t=hu(n,n.pendingProps),t.flags|=2,ca(n),n.memoizedState=null,t}function kb(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(rn){if(o.mode==="hidden")return t=hu(n,o),n.lanes=536870912,ql(null,t);if(dd(n),(t=Bn)?(t=vx(t,Ca),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ar!==null?{id:ts,overflow:ns}:null,retryLane:536870912,hydrationErrors:null},a=jm(t),a.return=n,n.child=a,Ti=n,Bn=null)):t=null,t===null)throw rr(n);return n.lanes=536870912,null}return hu(n,o)}var d=t.memoizedState;if(d!==null){var v=d.dehydrated;if(dd(n),u)if(n.flags&256)n.flags&=-257,n=o0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(ri||Io(t,n,a,!1),u=(a&t.childLanes)!==0,ri||u){if(o=Dn,o!==null&&(v=zi(o,a),v!==0&&v!==d.retryLane))throw d.retryLane=v,qr(t,v),ea(o,t,v),Ld;Mu(),n=o0(t,n,a)}else t=d.treeContext,Bn=Oa(v.nextSibling),Ti=n,rn=!0,sr=null,Ca=!1,t!==null&&Wm(n,t),n=hu(n,o),n.flags|=4096;return n}return t=Es(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function pu(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Ud(t,n,a,o,u){return Qr(n),a=pd(t,n,a,o,void 0,u),o=md(),t!==null&&!ri?(gd(t,n,u),Cs(t,n,u)):(rn&&o&&$f(n),n.flags|=1,wi(t,n,a,u),n.child)}function l0(t,n,a,o,u,d){return Qr(n),n.updateQueue=null,a=fg(n,o,a,u),ug(t),o=md(),t!==null&&!ri?(gd(t,n,d),Cs(t,n,d)):(rn&&o&&$f(n),n.flags|=1,wi(t,n,a,d),n.child)}function c0(t,n,a,o,u){if(Qr(n),n.stateNode===null){var d=Oo,v=a.contextType;typeof v=="object"&&v!==null&&(d=Ai(v)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Od,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},rd(n),v=a.contextType,d.context=typeof v=="object"&&v!==null?Ai(v):Oo,d.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(Nd(n,a,v,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(v=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),v!==d.state&&Od.enqueueReplaceState(d,d.state,null),Vl(n,o,d,u),kl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,B=ao(a,R);d.props=B;var ie=d.context,me=a.contextType;v=Oo,typeof me=="object"&&me!==null&&(v=Ai(me));var ye=a.getDerivedStateFromProps;me=typeof ye=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,me||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||ie!==v)&&$g(n,d,o,v),lr=!1;var le=n.memoizedState;d.state=le,Vl(n,o,d,u),kl(),ie=n.memoizedState,R||le!==ie||lr?(typeof ye=="function"&&(Nd(n,a,ye,o),ie=n.memoizedState),(B=lr||qg(n,a,B,o,le,ie,v))?(me||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ie),d.props=o,d.state=ie,d.context=v,o=B):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,od(t,n),v=n.memoizedProps,me=ao(a,v),d.props=me,ye=n.pendingProps,le=d.context,ie=a.contextType,B=Oo,typeof ie=="object"&&ie!==null&&(B=Ai(ie)),R=a.getDerivedStateFromProps,(ie=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(v!==ye||le!==B)&&$g(n,d,o,B),lr=!1,le=n.memoizedState,d.state=le,Vl(n,o,d,u),kl();var ue=n.memoizedState;v!==ye||le!==ue||lr||t!==null&&t.dependencies!==null&&$c(t.dependencies)?(typeof R=="function"&&(Nd(n,a,R,o),ue=n.memoizedState),(me=lr||qg(n,a,me,o,le,ue,B)||t!==null&&t.dependencies!==null&&$c(t.dependencies))?(ie||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,ue,B),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,ue,B)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ue),d.props=o,d.state=ue,d.context=B,o=me):(typeof d.componentDidUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,pu(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=no(n,t.child,null,u),n.child=no(n,null,a,u)):wi(t,n,a,u),n.memoizedState=d.state,t=n.child):t=Cs(t,n,u),t}function u0(t,n,a,o){return Kr(),n.flags|=256,wi(t,n,a,o),n.child}var Id={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Pd(t){return{baseLanes:t,cachePool:Jm()}}function Fd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=fa),t}function f0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,v;if((v=d)||(v=t!==null&&t.memoizedState===null?!1:(Qn.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,t===null){if(rn){if(u?fr(n):dr(),(t=Bn)?(t=vx(t,Ca),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ar!==null?{id:ts,overflow:ns}:null,retryLane:536870912,hydrationErrors:null},a=jm(t),a.return=n,n.child=a,Ti=n,Bn=null)):t=null,t===null)throw rr(n);return vh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(dr(),u=n.mode,R=mu({mode:"hidden",children:R},u),o=$r(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Pd(a),o.childLanes=Fd(t,v,a),n.memoizedState=Id,ql(null,o)):(fr(n),Bd(n,R))}var B=t.memoizedState;if(B!==null&&(R=B.dehydrated,R!==null)){if(d)n.flags&256?(fr(n),n.flags&=-257,n=zd(t,n,a)):n.memoizedState!==null?(dr(),n.child=t.child,n.flags|=128,n=null):(dr(),R=o.fallback,u=n.mode,o=mu({mode:"visible",children:o.children},u),R=$r(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,no(n,t.child,null,a),o=n.child,o.memoizedState=Pd(a),o.childLanes=Fd(t,v,a),n.memoizedState=Id,n=ql(null,o));else if(fr(n),vh(R)){if(v=R.nextSibling&&R.nextSibling.dataset,v)var ie=v.dgst;v=ie,o=Error(s(419)),o.stack="",o.digest=v,Pl({value:o,source:null,stack:null}),n=zd(t,n,a)}else if(ri||Io(t,n,a,!1),v=(a&t.childLanes)!==0,ri||v){if(v=Dn,v!==null&&(o=zi(v,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,qr(t,o),ea(v,t,o),Ld;_h(R)||Mu(),n=zd(t,n,a)}else _h(R)?(n.flags|=192,n.child=t.child,n=null):(t=B.treeContext,Bn=Oa(R.nextSibling),Ti=n,rn=!0,sr=null,Ca=!1,t!==null&&Wm(n,t),n=Bd(n,o.children),n.flags|=4096);return n}return u?(dr(),R=o.fallback,u=n.mode,B=t.child,ie=B.sibling,o=Es(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,ie!==null?R=Es(ie,R):(R=$r(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,ql(null,o),o=n.child,R=t.child.memoizedState,R===null?R=Pd(a):(u=R.cachePool,u!==null?(B=ai._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=Jm(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Fd(t,v,a),n.memoizedState=Id,ql(t.child,o)):(fr(n),a=t.child,t=a.sibling,a=Es(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(v=n.deletions,v===null?(n.deletions=[t],n.flags|=16):v.push(t)),n.child=a,n.memoizedState=null,a)}function Bd(t,n){return n=mu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function mu(t,n){return t=oa(22,t,null,n),t.lanes=0,t}function zd(t,n,a){return no(n,t.child,null,a),t=Bd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function d0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),ed(t.return,n,a)}function Gd(t,n,a,o,u,d){var v=t.memoizedState;v===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(v.isBackwards=n,v.rendering=null,v.renderingStartTime=0,v.last=o,v.tail=a,v.tailMode=u,v.treeForkCount=d)}function h0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var v=Qn.current,R=(v&2)!==0;if(R?(v=v&1|2,n.flags|=128):v&=1,Ee(Qn,v),wi(t,n,o,a),o=rn?Il:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&d0(t,a,n);else if(t.tag===19)d0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&iu(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Gd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&iu(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Gd(n,!0,a,null,d,o);break;case"together":Gd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Cs(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),mr|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Io(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Es(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Es(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Hd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&$c(t)))}function Vb(t,n,a){switch(n.tag){case 3:Re(n,n.stateNode.containerInfo),or(n,ai,t.memoizedState.cache),Kr();break;case 27:case 5:gt(n);break;case 4:Re(n,n.stateNode.containerInfo);break;case 10:or(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,dd(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(fr(n),n.flags|=128,null):(a&n.child.childLanes)!==0?f0(t,n,a):(fr(n),t=Cs(t,n,a),t!==null?t.sibling:null);fr(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Io(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return h0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Ee(Qn,Qn.current),o)break;return null;case 22:return n.lanes=0,s0(t,n,a,n.pendingProps);case 24:or(n,ai,t.memoizedState.cache)}return Cs(t,n,a)}function p0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)ri=!0;else{if(!Hd(t,a)&&(n.flags&128)===0)return ri=!1,Vb(t,n,a);ri=(t.flags&131072)!==0}else ri=!1,rn&&(n.flags&1048576)!==0&&Ym(n,Il,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=eo(n.elementType),n.type=t,typeof t=="function")Yf(t)?(o=ao(t,o),n.tag=1,n=c0(null,n,t,o,a)):(n.tag=0,n=Ud(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===U){n.tag=11,n=n0(null,n,t,o,a);break e}else if(u===G){n.tag=14,n=i0(null,n,t,o,a);break e}}throw n=he(t)||t,Error(s(306,n,""))}}return n;case 0:return Ud(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=ao(o,n.pendingProps),c0(t,n,o,u,a);case 3:e:{if(Re(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,od(t,n),Vl(n,o,null,a);var v=n.memoizedState;if(o=v.cache,or(n,ai,o),o!==d.cache&&td(n,[ai],a,!0),kl(),o=v.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=u0(t,n,o,a);break e}else if(o!==u){u=Aa(Error(s(424)),n),Pl(u),n=u0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Bn=Oa(t.firstChild),Ti=n,rn=!0,sr=null,Ca=!0,a=sg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Kr(),o===u){n=Cs(t,n,a);break e}wi(t,n,o,a)}n=n.child}return n;case 26:return pu(t,n),t===null?(a=Tx(n.type,null,n.pendingProps,null))?n.memoizedState=a:rn||(a=n.type,t=n.pendingProps,o=Ou(se.current).createElement(a),o[Zt]=n,o[ni]=t,Ri(o,a,t),jn(o),n.stateNode=o):n.memoizedState=Tx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return gt(n),t===null&&rn&&(o=n.stateNode=Sx(n.type,n.pendingProps,se.current),Ti=n,Ca=!0,u=Bn,br(n.type)?(bh=u,Bn=Oa(o.firstChild)):Bn=u),wi(t,n,n.pendingProps.children,a),pu(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&rn&&((u=o=Bn)&&(o=vy(o,n.type,n.pendingProps,Ca),o!==null?(n.stateNode=o,Ti=n,Bn=Oa(o.firstChild),Ca=!1,u=!0):u=!1),u||rr(n)),gt(n),u=n.type,d=n.pendingProps,v=t!==null?t.memoizedProps:null,o=d.children,mh(u,d)?o=null:v!==null&&mh(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=pd(t,n,Ub,null,null,a),cc._currentValue=u),pu(t,n),wi(t,n,o,a),n.child;case 6:return t===null&&rn&&((t=a=Bn)&&(a=by(a,n.pendingProps,Ca),a!==null?(n.stateNode=a,Ti=n,Bn=null,t=!0):t=!1),t||rr(n)),null;case 13:return f0(t,n,a);case 4:return Re(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=no(n,null,o,a):wi(t,n,o,a),n.child;case 11:return n0(t,n,n.type,n.pendingProps,a);case 7:return wi(t,n,n.pendingProps,a),n.child;case 8:return wi(t,n,n.pendingProps.children,a),n.child;case 12:return wi(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,or(n,n.type,o.value),wi(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Qr(n),u=Ai(u),o=o(u),n.flags|=1,wi(t,n,o,a),n.child;case 14:return i0(t,n,n.type,n.pendingProps,a);case 15:return a0(t,n,n.type,n.pendingProps,a);case 19:return h0(t,n,a);case 31:return kb(t,n,a);case 22:return s0(t,n,a,n.pendingProps);case 24:return Qr(n),o=Ai(ai),t===null?(u=ad(),u===null&&(u=Dn,d=nd(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},rd(n),or(n,ai,u)):((t.lanes&a)!==0&&(od(t,n),Vl(n,null,null,a),kl()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),or(n,ai,o)):(o=d.cache,or(n,ai,o),o!==u.cache&&td(n,[ai],a,!0))),wi(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ns(t){t.flags|=4}function kd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(H0())t.flags|=8192;else throw to=Jc,sd}else t.flags&=-16777217}function m0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Nx(n))if(H0())t.flags|=8192;else throw to=Jc,sd}function gu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Se():536870912,t.lanes|=n,Wo|=n)}function $l(t,n){if(!rn)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function zn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function jb(t,n,a){var o=n.pendingProps;switch(Kf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zn(n),null;case 1:return zn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),As(ai),ke(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Uo(n)?Ns(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Qf())),zn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(Ns(n),d!==null?(zn(n),m0(n,d)):(zn(n),kd(n,u,null,o,a))):d?d!==t.memoizedState?(Ns(n),zn(n),m0(n,d)):(zn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Ns(n),zn(n),kd(n,u,t,o,a)),null;case 27:if(it(n),a=se.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ns(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return zn(n),null}t=Ne.current,Uo(n)?qm(n):(t=Sx(u,o,a),n.stateNode=t,Ns(n))}return zn(n),null;case 5:if(it(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ns(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return zn(n),null}if(d=Ne.current,Uo(n))qm(n);else{var v=Ou(se.current);switch(d){case 1:d=v.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=v.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=v.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?v.createElement("select",{is:o.is}):v.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?v.createElement(u,{is:o.is}):v.createElement(u)}}d[Zt]=n,d[ni]=o;e:for(v=n.child;v!==null;){if(v.tag===5||v.tag===6)d.appendChild(v.stateNode);else if(v.tag!==4&&v.tag!==27&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===n)break e;for(;v.sibling===null;){if(v.return===null||v.return===n)break e;v=v.return}v.sibling.return=v.return,v=v.sibling}n.stateNode=d;e:switch(Ri(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Ns(n)}}return zn(n),kd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Ns(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=se.current,Uo(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Ti,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Zt]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||fx(t.nodeValue,a)),t||rr(n,!0)}else t=Ou(t).createTextNode(o),t[Zt]=n,n.stateNode=t}return zn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Uo(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Zt]=n}else Kr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;zn(n),t=!1}else a=Qf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ca(n),n):(ca(n),null);if((n.flags&128)!==0)throw Error(s(558))}return zn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Uo(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Zt]=n}else Kr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;zn(n),u=!1}else u=Qf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ca(n),n):(ca(n),null)}return ca(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),gu(n,n.updateQueue),zn(n),null);case 4:return ke(),t===null&&uh(n.stateNode.containerInfo),zn(n),null;case 10:return As(n.type),zn(n),null;case 19:if(Q(Qn),o=n.memoizedState,o===null)return zn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)$l(o,!1);else{if(Kn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=iu(t),d!==null){for(n.flags|=128,$l(o,!1),t=d.updateQueue,n.updateQueue=t,gu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Vm(a,t),a=a.sibling;return Ee(Qn,Qn.current&1|2),rn&&Ms(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ue()>yu&&(n.flags|=128,u=!0,$l(o,!1),n.lanes=4194304)}else{if(!u)if(t=iu(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,gu(n,t),$l(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!rn)return zn(n),null}else 2*Ue()-o.renderingStartTime>yu&&a!==536870912&&(n.flags|=128,u=!0,$l(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ue(),t.sibling=null,a=Qn.current,Ee(Qn,u?a&1|2:a&1),rn&&Ms(n,o.treeForkCount),t):(zn(n),null);case 22:case 23:return ca(n),fd(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(zn(n),n.subtreeFlags&6&&(n.flags|=8192)):zn(n),a=n.updateQueue,a!==null&&gu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Q(Jr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),As(ai),zn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Xb(t,n){switch(Kf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return As(ai),ke(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return it(n),null;case 31:if(n.memoizedState!==null){if(ca(n),n.alternate===null)throw Error(s(340));Kr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ca(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Kr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Q(Qn),null;case 4:return ke(),null;case 10:return As(n.type),null;case 22:case 23:return ca(n),fd(),t!==null&&Q(Jr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return As(ai),null;case 25:return null;default:return null}}function g0(t,n){switch(Kf(n),n.tag){case 3:As(ai),ke();break;case 26:case 27:case 5:it(n);break;case 4:ke();break;case 31:n.memoizedState!==null&&ca(n);break;case 13:ca(n);break;case 19:Q(Qn);break;case 10:As(n.type);break;case 22:case 23:ca(n),fd(),t!==null&&Q(Jr);break;case 24:As(ai)}}function Kl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,v=a.inst;o=d(),v.destroy=o}a=a.next}while(a!==u)}}catch(R){Sn(n,n.return,R)}}function hr(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var v=o.inst,R=v.destroy;if(R!==void 0){v.destroy=void 0,u=n;var B=a,ie=R;try{ie()}catch(me){Sn(u,B,me)}}}o=o.next}while(o!==d)}}catch(me){Sn(n,n.return,me)}}function x0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{og(n,a)}catch(o){Sn(t,t.return,o)}}}function _0(t,n,a){a.props=ao(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Sn(t,n,o)}}function Zl(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){Sn(t,n,u)}}function is(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Sn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Sn(t,n,u)}else a.current=null}function v0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Sn(t,t.return,u)}}function Vd(t,n,a){try{var o=t.stateNode;hy(o,t.type,a,n),o[ni]=n}catch(u){Sn(t,t.return,u)}}function b0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&br(t.type)||t.tag===4}function jd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||b0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&br(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Xd(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ba));else if(o!==4&&(o===27&&br(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Xd(t,n,a),t=t.sibling;t!==null;)Xd(t,n,a),t=t.sibling}function xu(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&br(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(xu(t,n,a),t=t.sibling;t!==null;)xu(t,n,a),t=t.sibling}function y0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Ri(n,o,a),n[Zt]=t,n[ni]=a}catch(d){Sn(t,t.return,d)}}var Os=!1,oi=!1,Yd=!1,S0=typeof WeakSet=="function"?WeakSet:Set,bi=null;function Yb(t,n){if(t=t.containerInfo,hh=Bu,t=di(t),ra(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var v=0,R=-1,B=-1,ie=0,me=0,ye=t,le=null;t:for(;;){for(var ue;ye!==a||u!==0&&ye.nodeType!==3||(R=v+u),ye!==d||o!==0&&ye.nodeType!==3||(B=v+o),ye.nodeType===3&&(v+=ye.nodeValue.length),(ue=ye.firstChild)!==null;)le=ye,ye=ue;for(;;){if(ye===t)break t;if(le===a&&++ie===u&&(R=v),le===d&&++me===o&&(B=v),(ue=ye.nextSibling)!==null)break;ye=le,le=ye.parentNode}ye=ue}a=R===-1||B===-1?null:{start:R,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(ph={focusedElem:t,selectionRange:a},Bu=!1,bi=n;bi!==null;)if(n=bi,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,bi=t;else for(;bi!==null;){switch(n=bi,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var nt=ao(a.type,u);t=o.getSnapshotBeforeUpdate(nt,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(vt){Sn(a,a.return,vt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)xh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":xh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,bi=t;break}bi=n.return}}function E0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ls(t,a),o&4&&Kl(5,a);break;case 1:if(Ls(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(v){Sn(a,a.return,v)}else{var u=ao(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(v){Sn(a,a.return,v)}}o&64&&x0(a),o&512&&Zl(a,a.return);break;case 3:if(Ls(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{og(t,n)}catch(v){Sn(a,a.return,v)}}break;case 27:n===null&&o&4&&y0(a);case 26:case 5:Ls(t,a),n===null&&o&4&&v0(a),o&512&&Zl(a,a.return);break;case 12:Ls(t,a);break;case 31:Ls(t,a),o&4&&A0(t,a);break;case 13:Ls(t,a),o&4&&w0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=ty.bind(null,a),yy(t,a))));break;case 22:if(o=a.memoizedState!==null||Os,!o){n=n!==null&&n.memoizedState!==null||oi,u=Os;var d=oi;Os=o,(oi=n)&&!d?Us(t,a,(a.subtreeFlags&8772)!==0):Ls(t,a),Os=u,oi=d}break;case 30:break;default:Ls(t,a)}}function M0(t){var n=t.alternate;n!==null&&(t.alternate=null,M0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&xs(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var kn=null,Ki=!1;function Ds(t,n,a){for(a=a.child;a!==null;)T0(t,n,a),a=a.sibling}function T0(t,n,a){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(de,a)}catch{}switch(a.tag){case 26:oi||is(a,n),Ds(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:oi||is(a,n);var o=kn,u=Ki;br(a.type)&&(kn=a.stateNode,Ki=!1),Ds(t,n,a),rc(a.stateNode),kn=o,Ki=u;break;case 5:oi||is(a,n);case 6:if(o=kn,u=Ki,kn=null,Ds(t,n,a),kn=o,Ki=u,kn!==null)if(Ki)try{(kn.nodeType===9?kn.body:kn.nodeName==="HTML"?kn.ownerDocument.body:kn).removeChild(a.stateNode)}catch(d){Sn(a,n,d)}else try{kn.removeChild(a.stateNode)}catch(d){Sn(a,n,d)}break;case 18:kn!==null&&(Ki?(t=kn,xx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),tl(t)):xx(kn,a.stateNode));break;case 4:o=kn,u=Ki,kn=a.stateNode.containerInfo,Ki=!0,Ds(t,n,a),kn=o,Ki=u;break;case 0:case 11:case 14:case 15:hr(2,a,n),oi||hr(4,a,n),Ds(t,n,a);break;case 1:oi||(is(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&_0(a,n,o)),Ds(t,n,a);break;case 21:Ds(t,n,a);break;case 22:oi=(o=oi)||a.memoizedState!==null,Ds(t,n,a),oi=o;break;default:Ds(t,n,a)}}function A0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{tl(t)}catch(a){Sn(n,n.return,a)}}}function w0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{tl(t)}catch(a){Sn(n,n.return,a)}}function Wb(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new S0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new S0),n;default:throw Error(s(435,t.tag))}}function _u(t,n){var a=Wb(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=ny.bind(null,t,o);o.then(u,u)}})}function Zi(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,v=n,R=v;e:for(;R!==null;){switch(R.tag){case 27:if(br(R.type)){kn=R.stateNode,Ki=!1;break e}break;case 5:kn=R.stateNode,Ki=!1;break e;case 3:case 4:kn=R.stateNode.containerInfo,Ki=!0;break e}R=R.return}if(kn===null)throw Error(s(160));T0(d,v,u),kn=null,Ki=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)R0(n,t),n=n.sibling}var Va=null;function R0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Zi(n,t),Qi(t),o&4&&(hr(3,t,t.return),Kl(3,t),hr(5,t,t.return));break;case 1:Zi(n,t),Qi(t),o&512&&(oi||a===null||is(a,a.return)),o&64&&Os&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Va;if(Zi(n,t),Qi(t),o&512&&(oi||a===null||is(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Za]||d[Zt]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Ri(d,o,a),d[Zt]=t,jn(d),o=d;break e;case"link":var v=Rx("link","href",u).get(o+(a.href||""));if(v){for(var R=0;R<v.length;R++)if(d=v[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(R,1);break t}}d=u.createElement(o),Ri(d,o,a),u.head.appendChild(d);break;case"meta":if(v=Rx("meta","content",u).get(o+(a.content||""))){for(R=0;R<v.length;R++)if(d=v[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(R,1);break t}}d=u.createElement(o),Ri(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[Zt]=t,jn(d),o=d}t.stateNode=o}else Cx(u,t.type,t.stateNode);else t.stateNode=wx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Cx(u,t.type,t.stateNode):wx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Vd(t,t.memoizedProps,a.memoizedProps)}break;case 27:Zi(n,t),Qi(t),o&512&&(oi||a===null||is(a,a.return)),a!==null&&o&4&&Vd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Zi(n,t),Qi(t),o&512&&(oi||a===null||is(a,a.return)),t.flags&32){u=t.stateNode;try{Pn(u,"")}catch(nt){Sn(t,t.return,nt)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Vd(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Yd=!0);break;case 6:if(Zi(n,t),Qi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(nt){Sn(t,t.return,nt)}}break;case 3:if(Uu=null,u=Va,Va=Du(n.containerInfo),Zi(n,t),Va=u,Qi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{tl(n.containerInfo)}catch(nt){Sn(t,t.return,nt)}Yd&&(Yd=!1,C0(t));break;case 4:o=Va,Va=Du(t.stateNode.containerInfo),Zi(n,t),Qi(t),Va=o;break;case 12:Zi(n,t),Qi(t);break;case 31:Zi(n,t),Qi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,_u(t,o)));break;case 13:Zi(n,t),Qi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(bu=Ue()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,_u(t,o)));break;case 22:u=t.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,ie=Os,me=oi;if(Os=ie||u,oi=me||B,Zi(n,t),oi=me,Os=ie,Qi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||Os||oi||so(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(d=B.stateNode,u)v=d.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none";else{R=B.stateNode;var ye=B.memoizedProps.style,le=ye!=null&&ye.hasOwnProperty("display")?ye.display:null;R.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(nt){Sn(B,B.return,nt)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(nt){Sn(B,B.return,nt)}}}else if(n.tag===18){if(a===null){B=n;try{var ue=B.stateNode;u?_x(ue,!0):_x(B.stateNode,!1)}catch(nt){Sn(B,B.return,nt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,_u(t,a))));break;case 19:Zi(n,t),Qi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,_u(t,o)));break;case 30:break;case 21:break;default:Zi(n,t),Qi(t)}}function Qi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(b0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=jd(t);xu(t,d,u);break;case 5:var v=a.stateNode;a.flags&32&&(Pn(v,""),a.flags&=-33);var R=jd(t);xu(t,R,v);break;case 3:case 4:var B=a.stateNode.containerInfo,ie=jd(t);Xd(t,ie,B);break;default:throw Error(s(161))}}catch(me){Sn(t,t.return,me)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function C0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;C0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Ls(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)E0(t,n.alternate,n),n=n.sibling}function so(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:hr(4,n,n.return),so(n);break;case 1:is(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&_0(n,n.return,a),so(n);break;case 27:rc(n.stateNode);case 26:case 5:is(n,n.return),so(n);break;case 22:n.memoizedState===null&&so(n);break;case 30:so(n);break;default:so(n)}t=t.sibling}}function Us(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,v=d.flags;switch(d.tag){case 0:case 11:case 15:Us(u,d,a),Kl(4,d);break;case 1:if(Us(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ie){Sn(o,o.return,ie)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)rg(B[u],R)}catch(ie){Sn(o,o.return,ie)}}a&&v&64&&x0(d),Zl(d,d.return);break;case 27:y0(d);case 26:case 5:Us(u,d,a),a&&o===null&&v&4&&v0(d),Zl(d,d.return);break;case 12:Us(u,d,a);break;case 31:Us(u,d,a),a&&v&4&&A0(u,d);break;case 13:Us(u,d,a),a&&v&4&&w0(u,d);break;case 22:d.memoizedState===null&&Us(u,d,a),Zl(d,d.return);break;case 30:break;default:Us(u,d,a)}n=n.sibling}}function Wd(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Fl(a))}function qd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Fl(t))}function ja(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)N0(t,n,a,o),n=n.sibling}function N0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:ja(t,n,a,o),u&2048&&Kl(9,n);break;case 1:ja(t,n,a,o);break;case 3:ja(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Fl(t)));break;case 12:if(u&2048){ja(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,v=d.id,R=d.onPostCommit;typeof R=="function"&&R(v,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(B){Sn(n,n.return,B)}}else ja(t,n,a,o);break;case 31:ja(t,n,a,o);break;case 13:ja(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,v=n.alternate,n.memoizedState!==null?d._visibility&2?ja(t,n,a,o):Ql(t,n):d._visibility&2?ja(t,n,a,o):(d._visibility|=2,jo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Wd(v,n);break;case 24:ja(t,n,a,o),u&2048&&qd(n.alternate,n);break;default:ja(t,n,a,o)}}function jo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,v=n,R=a,B=o,ie=v.flags;switch(v.tag){case 0:case 11:case 15:jo(d,v,R,B,u),Kl(8,v);break;case 23:break;case 22:var me=v.stateNode;v.memoizedState!==null?me._visibility&2?jo(d,v,R,B,u):Ql(d,v):(me._visibility|=2,jo(d,v,R,B,u)),u&&ie&2048&&Wd(v.alternate,v);break;case 24:jo(d,v,R,B,u),u&&ie&2048&&qd(v.alternate,v);break;default:jo(d,v,R,B,u)}n=n.sibling}}function Ql(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Ql(a,o),u&2048&&Wd(o.alternate,o);break;case 24:Ql(a,o),u&2048&&qd(o.alternate,o);break;default:Ql(a,o)}n=n.sibling}}var Jl=8192;function Xo(t,n,a){if(t.subtreeFlags&Jl)for(t=t.child;t!==null;)O0(t,n,a),t=t.sibling}function O0(t,n,a){switch(t.tag){case 26:Xo(t,n,a),t.flags&Jl&&t.memoizedState!==null&&Ly(a,Va,t.memoizedState,t.memoizedProps);break;case 5:Xo(t,n,a);break;case 3:case 4:var o=Va;Va=Du(t.stateNode.containerInfo),Xo(t,n,a),Va=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Jl,Jl=16777216,Xo(t,n,a),Jl=o):Xo(t,n,a));break;default:Xo(t,n,a)}}function D0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function ec(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bi=o,U0(o,t)}D0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)L0(t),t=t.sibling}function L0(t){switch(t.tag){case 0:case 11:case 15:ec(t),t.flags&2048&&hr(9,t,t.return);break;case 3:ec(t);break;case 12:ec(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,vu(t)):ec(t);break;default:ec(t)}}function vu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bi=o,U0(o,t)}D0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:hr(8,n,n.return),vu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,vu(n));break;default:vu(n)}t=t.sibling}}function U0(t,n){for(;bi!==null;){var a=bi;switch(a.tag){case 0:case 11:case 15:hr(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Fl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,bi=o;else e:for(a=t;bi!==null;){o=bi;var u=o.sibling,d=o.return;if(M0(o),o===a){bi=null;break e}if(u!==null){u.return=d,bi=u;break e}bi=d}}}var qb={getCacheForType:function(t){var n=Ai(ai),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Ai(ai).controller.signal}},$b=typeof WeakMap=="function"?WeakMap:Map,xn=0,Dn=null,Qt=null,nn=0,yn=0,ua=null,pr=!1,Yo=!1,$d=!1,Is=0,Kn=0,mr=0,ro=0,Kd=0,fa=0,Wo=0,tc=null,Ji=null,Zd=!1,bu=0,I0=0,yu=1/0,Su=null,gr=null,hi=0,xr=null,qo=null,Ps=0,Qd=0,Jd=null,P0=null,nc=0,eh=null;function da(){return(xn&2)!==0&&nn!==0?nn&-nn:D.T!==null?rh():Hr()}function F0(){if(fa===0)if((nn&536870912)===0||rn){var t=Mt;Mt<<=1,(Mt&3932160)===0&&(Mt=262144),fa=t}else fa=536870912;return t=la.current,t!==null&&(t.flags|=32),fa}function ea(t,n,a){(t===Dn&&(yn===2||yn===9)||t.cancelPendingCommit!==null)&&($o(t,0),_r(t,nn,fa,!1)),bt(t,a),((xn&2)===0||t!==Dn)&&(t===Dn&&((xn&2)===0&&(ro|=a),Kn===4&&_r(t,nn,fa,!1)),as(t))}function B0(t,n,a){if((xn&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ge(t,n),u=o?Qb(t,n):nh(t,n,!0),d=o;do{if(u===0){Yo&&!o&&_r(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!Kb(a)){u=nh(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var v=0;else v=t.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;e:{var R=t;u=tc;var B=R.current.memoizedState.isDehydrated;if(B&&($o(R,v).flags|=256),v=nh(R,v,!1),v!==2){if($d&&!B){R.errorRecoveryDisabledLanes|=d,ro|=d,u=4;break e}d=Ji,Ji=u,d!==null&&(Ji===null?Ji=d:Ji.push.apply(Ji,d))}u=v}if(d=!1,u!==2)continue}}if(u===1){$o(t,0),_r(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:_r(o,n,fa,!pr);break e;case 2:Ji=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=bu+300-Ue(),10<u)){if(_r(o,n,fa,!pr),pe(o,0,!0)!==0)break e;Ps=n,o.timeoutHandle=mx(z0.bind(null,o,a,Ji,Su,Zd,n,fa,ro,Wo,pr,d,"Throttled",-0,0),u);break e}z0(o,a,Ji,Su,Zd,n,fa,ro,Wo,pr,d,null,-0,0)}}break}while(!0);as(t)}function z0(t,n,a,o,u,d,v,R,B,ie,me,ye,le,ue){if(t.timeoutHandle=-1,ye=n.subtreeFlags,ye&8192||(ye&16785408)===16785408){ye={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ba},O0(n,d,ye);var nt=(d&62914560)===d?bu-Ue():(d&4194048)===d?I0-Ue():0;if(nt=Uy(ye,nt),nt!==null){Ps=d,t.cancelPendingCommit=nt(W0.bind(null,t,n,d,a,o,u,v,R,B,me,ye,null,le,ue)),_r(t,d,v,!ie);return}}W0(t,n,d,a,o,u,v,R,B)}function Kb(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!It(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function _r(t,n,a,o){n&=~Kd,n&=~ro,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-He(u),v=1<<d;o[d]=-1,u&=~v}a!==0&&Gt(t,a,n)}function Eu(){return(xn&6)===0?(ic(0),!1):!0}function th(){if(Qt!==null){if(yn===0)var t=Qt.return;else t=Qt,Ts=Zr=null,xd(t),zo=null,zl=0,t=Qt;for(;t!==null;)g0(t.alternate,t),t=t.return;Qt=null}}function $o(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,gy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Ps=0,th(),Dn=t,Qt=a=Es(t.current,null),nn=n,yn=0,ua=null,pr=!1,Yo=Ge(t,n),$d=!1,Wo=fa=Kd=ro=mr=Kn=0,Ji=tc=null,Zd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-He(o),d=1<<u;n|=t[u],o&=~d}return Is=n,jc(),a}function G0(t,n){Bt=null,D.H=Wl,n===Bo||n===Qc?(n=ng(),yn=3):n===sd?(n=ng(),yn=4):yn=n===Ld?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ua=n,Qt===null&&(Kn=1,du(t,Aa(n,t.current)))}function H0(){var t=la.current;return t===null?!0:(nn&4194048)===nn?Na===null:(nn&62914560)===nn||(nn&536870912)!==0?t===Na:!1}function k0(){var t=D.H;return D.H=Wl,t===null?Wl:t}function V0(){var t=D.A;return D.A=qb,t}function Mu(){Kn=4,pr||(nn&4194048)!==nn&&la.current!==null||(Yo=!0),(mr&134217727)===0&&(ro&134217727)===0||Dn===null||_r(Dn,nn,fa,!1)}function nh(t,n,a){var o=xn;xn|=2;var u=k0(),d=V0();(Dn!==t||nn!==n)&&(Su=null,$o(t,n)),n=!1;var v=Kn;e:do try{if(yn!==0&&Qt!==null){var R=Qt,B=ua;switch(yn){case 8:th(),v=6;break e;case 3:case 2:case 9:case 6:la.current===null&&(n=!0);var ie=yn;if(yn=0,ua=null,Ko(t,R,B,ie),a&&Yo){v=0;break e}break;default:ie=yn,yn=0,ua=null,Ko(t,R,B,ie)}}Zb(),v=Kn;break}catch(me){G0(t,me)}while(!0);return n&&t.shellSuspendCounter++,Ts=Zr=null,xn=o,D.H=u,D.A=d,Qt===null&&(Dn=null,nn=0,jc()),v}function Zb(){for(;Qt!==null;)j0(Qt)}function Qb(t,n){var a=xn;xn|=2;var o=k0(),u=V0();Dn!==t||nn!==n?(Su=null,yu=Ue()+500,$o(t,n)):Yo=Ge(t,n);e:do try{if(yn!==0&&Qt!==null){n=Qt;var d=ua;t:switch(yn){case 1:yn=0,ua=null,Ko(t,n,d,1);break;case 2:case 9:if(eg(d)){yn=0,ua=null,X0(n);break}n=function(){yn!==2&&yn!==9||Dn!==t||(yn=7),as(t)},d.then(n,n);break e;case 3:yn=7;break e;case 4:yn=5;break e;case 7:eg(d)?(yn=0,ua=null,X0(n)):(yn=0,ua=null,Ko(t,n,d,7));break;case 5:var v=null;switch(Qt.tag){case 26:v=Qt.memoizedState;case 5:case 27:var R=Qt;if(v?Nx(v):R.stateNode.complete){yn=0,ua=null;var B=R.sibling;if(B!==null)Qt=B;else{var ie=R.return;ie!==null?(Qt=ie,Tu(ie)):Qt=null}break t}}yn=0,ua=null,Ko(t,n,d,5);break;case 6:yn=0,ua=null,Ko(t,n,d,6);break;case 8:th(),Kn=6;break e;default:throw Error(s(462))}}Jb();break}catch(me){G0(t,me)}while(!0);return Ts=Zr=null,D.H=o,D.A=u,xn=a,Qt!==null?0:(Dn=null,nn=0,jc(),Kn)}function Jb(){for(;Qt!==null&&!zt();)j0(Qt)}function j0(t){var n=p0(t.alternate,t,Is);t.memoizedProps=t.pendingProps,n===null?Tu(t):Qt=n}function X0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=l0(a,n,n.pendingProps,n.type,void 0,nn);break;case 11:n=l0(a,n,n.pendingProps,n.type.render,n.ref,nn);break;case 5:xd(n);default:g0(a,n),n=Qt=Vm(n,Is),n=p0(a,n,Is)}t.memoizedProps=t.pendingProps,n===null?Tu(t):Qt=n}function Ko(t,n,a,o){Ts=Zr=null,xd(n),zo=null,zl=0;var u=n.return;try{if(Hb(t,u,n,a,nn)){Kn=1,du(t,Aa(a,t.current)),Qt=null;return}}catch(d){if(u!==null)throw Qt=u,d;Kn=1,du(t,Aa(a,t.current)),Qt=null;return}n.flags&32768?(rn||o===1?t=!0:Yo||(nn&536870912)!==0?t=!1:(pr=t=!0,(o===2||o===9||o===3||o===6)&&(o=la.current,o!==null&&o.tag===13&&(o.flags|=16384))),Y0(n,t)):Tu(n)}function Tu(t){var n=t;do{if((n.flags&32768)!==0){Y0(n,pr);return}t=n.return;var a=jb(n.alternate,n,Is);if(a!==null){Qt=a;return}if(n=n.sibling,n!==null){Qt=n;return}Qt=n=t}while(n!==null);Kn===0&&(Kn=5)}function Y0(t,n){do{var a=Xb(t.alternate,t);if(a!==null){a.flags&=32767,Qt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Qt=t;return}Qt=t=a}while(t!==null);Kn=6,Qt=null}function W0(t,n,a,o,u,d,v,R,B){t.cancelPendingCommit=null;do Au();while(hi!==0);if((xn&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=jf,In(t,a,d,v,R,B),t===Dn&&(Qt=Dn=null,nn=0),qo=n,xr=t,Ps=a,Qd=d,Jd=u,P0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,iy(K,function(){return Q0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=D.T,D.T=null,u=z.p,z.p=2,v=xn,xn|=4;try{Yb(t,n,a)}finally{xn=v,z.p=u,D.T=o}}hi=1,q0(),$0(),K0()}}function q0(){if(hi===1){hi=0;var t=xr,n=qo,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=xn;xn|=4;try{R0(n,t);var d=ph,v=di(t.containerInfo),R=d.focusedElem,B=d.selectionRange;if(v!==R&&R&&R.ownerDocument&&Xn(R.ownerDocument.documentElement,R)){if(B!==null&&ra(R)){var ie=B.start,me=B.end;if(me===void 0&&(me=ie),"selectionStart"in R)R.selectionStart=ie,R.selectionEnd=Math.min(me,R.value.length);else{var ye=R.ownerDocument||document,le=ye&&ye.defaultView||window;if(le.getSelection){var ue=le.getSelection(),nt=R.textContent.length,vt=Math.min(B.start,nt),wn=B.end===void 0?vt:Math.min(B.end,nt);!ue.extend&&vt>wn&&(v=wn,wn=vt,vt=v);var Z=bn(R,vt),X=bn(R,wn);if(Z&&X&&(ue.rangeCount!==1||ue.anchorNode!==Z.node||ue.anchorOffset!==Z.offset||ue.focusNode!==X.node||ue.focusOffset!==X.offset)){var ne=ye.createRange();ne.setStart(Z.node,Z.offset),ue.removeAllRanges(),vt>wn?(ue.addRange(ne),ue.extend(X.node,X.offset)):(ne.setEnd(X.node,X.offset),ue.addRange(ne))}}}}for(ye=[],ue=R;ue=ue.parentNode;)ue.nodeType===1&&ye.push({element:ue,left:ue.scrollLeft,top:ue.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ye.length;R++){var _e=ye[R];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}Bu=!!hh,ph=hh=null}finally{xn=u,z.p=o,D.T=a}}t.current=n,hi=2}}function $0(){if(hi===2){hi=0;var t=xr,n=qo,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=xn;xn|=4;try{E0(t,n.alternate,n)}finally{xn=u,z.p=o,D.T=a}}hi=3}}function K0(){if(hi===4||hi===3){hi=0,un();var t=xr,n=qo,a=Ps,o=P0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hi=5:(hi=0,qo=xr=null,Z0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(gr=null),Ka(a),n=n.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(de,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=D.T,u=z.p,z.p=2,D.T=null;try{for(var d=t.onRecoverableError,v=0;v<o.length;v++){var R=o[v];d(R.value,{componentStack:R.stack})}}finally{D.T=n,z.p=u}}(Ps&3)!==0&&Au(),as(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===eh?nc++:(nc=0,eh=t):nc=0,ic(0)}}function Z0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Fl(n)))}function Au(){return q0(),$0(),K0(),Q0()}function Q0(){if(hi!==5)return!1;var t=xr,n=Qd;Qd=0;var a=Ka(Ps),o=D.T,u=z.p;try{z.p=32>a?32:a,D.T=null,a=Jd,Jd=null;var d=xr,v=Ps;if(hi=0,qo=xr=null,Ps=0,(xn&6)!==0)throw Error(s(331));var R=xn;if(xn|=4,L0(d.current),N0(d,d.current,v,a),xn=R,ic(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(de,d)}catch{}return!0}finally{z.p=u,D.T=o,Z0(t,n)}}function J0(t,n,a){n=Aa(a,n),n=Dd(t.stateNode,n,2),t=ur(t,n,2),t!==null&&(bt(t,2),as(t))}function Sn(t,n,a){if(t.tag===3)J0(t,t,a);else for(;n!==null;){if(n.tag===3){J0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(gr===null||!gr.has(o))){t=Aa(a,t),a=e0(2),o=ur(n,a,2),o!==null&&(t0(a,o,n,t),bt(o,2),as(o));break}}n=n.return}}function ih(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new $b;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||($d=!0,u.add(a),t=ey.bind(null,t,n,a),n.then(t,t))}function ey(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Dn===t&&(nn&a)===a&&(Kn===4||Kn===3&&(nn&62914560)===nn&&300>Ue()-bu?(xn&2)===0&&$o(t,0):Kd|=a,Wo===nn&&(Wo=0)),as(t)}function ex(t,n){n===0&&(n=Se()),t=qr(t,n),t!==null&&(bt(t,n),as(t))}function ty(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),ex(t,a)}function ny(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),ex(t,a)}function iy(t,n){return Y(t,n)}var wu=null,Zo=null,ah=!1,Ru=!1,sh=!1,vr=0;function as(t){t!==Zo&&t.next===null&&(Zo===null?wu=Zo=t:Zo=Zo.next=t),Ru=!0,ah||(ah=!0,sy())}function ic(t,n){if(!sh&&Ru){sh=!0;do for(var a=!1,o=wu;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var v=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-He(42|t)+1)-1,d&=u&~(v&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,ax(o,d))}else d=nn,d=pe(o,o===Dn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Ge(o,d)||(a=!0,ax(o,d));o=o.next}while(a);sh=!1}}function ay(){tx()}function tx(){Ru=ah=!1;var t=0;vr!==0&&my()&&(t=vr);for(var n=Ue(),a=null,o=wu;o!==null;){var u=o.next,d=nx(o,n);d===0?(o.next=null,a===null?wu=u:a.next=u,u===null&&(Zo=a)):(a=o,(t!==0||(d&3)!==0)&&(Ru=!0)),o=u}hi!==0&&hi!==5||ic(t),vr!==0&&(vr=0)}function nx(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var v=31-He(d),R=1<<v,B=u[v];B===-1?((R&a)===0||(R&o)!==0)&&(u[v]=Fe(R,n)):B<=n&&(t.expiredLanes|=R),d&=~R}if(n=Dn,a=nn,a=pe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(yn===2||yn===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Ln(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ge(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Ln(o),Ka(a)){case 2:case 8:a=M;break;case 32:a=K;break;case 268435456:a=Te;break;default:a=K}return o=ix.bind(null,t),a=Y(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Ln(o),t.callbackPriority=2,t.callbackNode=null,2}function ix(t,n){if(hi!==0&&hi!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Au()&&t.callbackNode!==a)return null;var o=nn;return o=pe(t,t===Dn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(B0(t,o,n),nx(t,Ue()),t.callbackNode!=null&&t.callbackNode===a?ix.bind(null,t):null)}function ax(t,n){if(Au())return null;B0(t,n,!0)}function sy(){xy(function(){(xn&6)!==0?Y(N,ay):tx()})}function rh(){if(vr===0){var t=Po;t===0&&(t=St,St<<=1,(St&261888)===0&&(St=256)),vr=t}return vr}function sx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:$s(""+t)}function rx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function ry(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=sx((u[ni]||null).action),v=o.submitter;v&&(n=(n=v[ni]||null)?sx(n.formAction):v.getAttribute("formAction"),n!==null&&(d=n,v=null));var R=new Ao("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(vr!==0){var B=v?rx(u,v):new FormData(u);Ad(a,{pending:!0,data:B,method:u.method,action:d},null,B)}}else typeof d=="function"&&(R.preventDefault(),B=v?rx(u,v):new FormData(u),Ad(a,{pending:!0,data:B,method:u.method,action:d},d,B))},currentTarget:u}]})}}for(var oh=0;oh<Vf.length;oh++){var lh=Vf[oh],oy=lh.toLowerCase(),ly=lh[0].toUpperCase()+lh.slice(1);ka(oy,"on"+ly)}ka(Fm,"onAnimationEnd"),ka(Bm,"onAnimationIteration"),ka(zm,"onAnimationStart"),ka("dblclick","onDoubleClick"),ka("focusin","onFocus"),ka("focusout","onBlur"),ka(Mb,"onTransitionRun"),ka(Tb,"onTransitionStart"),ka(Ab,"onTransitionCancel"),ka(Gm,"onTransitionEnd"),ae("onMouseEnter",["mouseout","mouseover"]),ae("onMouseLeave",["mouseout","mouseover"]),ae("onPointerEnter",["pointerout","pointerover"]),ae("onPointerLeave",["pointerout","pointerover"]),k("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),k("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),k("onBeforeInput",["compositionend","keypress","textInput","paste"]),k("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),k("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),k("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ac="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ac));function ox(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var v=o.length-1;0<=v;v--){var R=o[v],B=R.instance,ie=R.currentTarget;if(R=R.listener,B!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ie;try{d(u)}catch(me){Vc(me)}u.currentTarget=null,d=B}else for(v=0;v<o.length;v++){if(R=o[v],B=R.instance,ie=R.currentTarget,R=R.listener,B!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ie;try{d(u)}catch(me){Vc(me)}u.currentTarget=null,d=B}}}}function Jt(t,n){var a=n[aa];a===void 0&&(a=n[aa]=new Set);var o=t+"__bubble";a.has(o)||(lx(n,t,2,!1),a.add(o))}function ch(t,n,a){var o=0;n&&(o|=4),lx(a,t,o,n)}var Cu="_reactListening"+Math.random().toString(36).slice(2);function uh(t){if(!t[Cu]){t[Cu]=!0,Cl.forEach(function(a){a!=="selectionchange"&&(cy.has(a)||ch(a,!1,t),ch(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Cu]||(n[Cu]=!0,ch("selectionchange",!1,n))}}function lx(t,n,a,o){switch(Fx(n)){case 2:var u=Fy;break;case 8:u=By;break;default:u=Th}a=u.bind(null,n,a,t),u=void 0,!ya||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function fh(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var R=o.stateNode.containerInfo;if(R===u)break;if(v===4)for(v=o.return;v!==null;){var B=v.tag;if((B===3||B===4)&&v.stateNode.containerInfo===u)return;v=v.return}for(;R!==null;){if(v=za(R),v===null)return;if(B=v.tag,B===5||B===6||B===26||B===27){o=d=v;continue e}R=R.parentNode}}o=o.return}Fc(function(){var ie=d,me=Hi(a),ye=[];e:{var le=Hm.get(t);if(le!==void 0){var ue=Ao,nt=t;switch(t){case"keypress":if(Zs(a)===0)break e;case"keydown":case"keyup":ue=st;break;case"focusin":nt="focus",ue=Dl;break;case"focusout":nt="blur",ue=Dl;break;case"beforeblur":case"afterblur":ue=Dl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ue=Ol;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ue=Bf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ue=Ma;break;case Fm:case Bm:case zm:ue=jt;break;case Gm:ue=Mi;break;case"scroll":case"scrollend":ue=zc;break;case"wheel":ue=Hn;break;case"copy":case"cut":case"paste":ue=ft;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ue=Rt;break;case"toggle":case"beforetoggle":ue=Ft}var vt=(n&4)!==0,wn=!vt&&(t==="scroll"||t==="scrollend"),Z=vt?le!==null?le+"Capture":null:le;vt=[];for(var X=ie,ne;X!==null;){var _e=X;if(ne=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||ne===null||Z===null||(_e=Ks(X,Z),_e!=null&&vt.push(sc(X,_e,ne))),wn)break;X=X.return}0<vt.length&&(le=new ue(le,nt,null,a,me),ye.push({event:le,listeners:vt}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",ue=t==="mouseout"||t==="pointerout",le&&a!==kr&&(nt=a.relatedTarget||a.fromElement)&&(za(nt)||nt[Vn]))break e;if((ue||le)&&(le=me.window===me?me:(le=me.ownerDocument)?le.defaultView||le.parentWindow:window,ue?(nt=a.relatedTarget||a.toElement,ue=ie,nt=nt?za(nt):null,nt!==null&&(wn=c(nt),vt=nt.tag,nt!==wn||vt!==5&&vt!==27&&vt!==6)&&(nt=null)):(ue=null,nt=ie),ue!==nt)){if(vt=Ol,_e="onMouseLeave",Z="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(vt=Rt,_e="onPointerLeave",Z="onPointerEnter",X="pointer"),wn=ue==null?le:Qa(ue),ne=nt==null?le:Qa(nt),le=new vt(_e,X+"leave",ue,a,me),le.target=wn,le.relatedTarget=ne,_e=null,za(me)===ie&&(vt=new vt(Z,X+"enter",nt,a,me),vt.target=ne,vt.relatedTarget=wn,_e=vt),wn=_e,ue&&nt)t:{for(vt=uy,Z=ue,X=nt,ne=0,_e=Z;_e;_e=vt(_e))ne++;_e=0;for(var mt=X;mt;mt=vt(mt))_e++;for(;0<ne-_e;)Z=vt(Z),ne--;for(;0<_e-ne;)X=vt(X),_e--;for(;ne--;){if(Z===X||X!==null&&Z===X.alternate){vt=Z;break t}Z=vt(Z),X=vt(X)}vt=null}else vt=null;ue!==null&&cx(ye,le,ue,vt,!1),nt!==null&&wn!==null&&cx(ye,wn,nt,vt,!0)}}e:{if(le=ie?Qa(ie):window,ue=le.nodeName&&le.nodeName.toLowerCase(),ue==="select"||ue==="input"&&le.type==="file")var hn=Ll;else if(ys(le))if(tr)hn=rt;else{hn=Je;var ot=$e}else ue=le.nodeName,!ue||ue.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?ie&&qt(ie.elementType)&&(hn=Ll):hn=lt;if(hn&&(hn=hn(t,ie))){Ro(ye,hn,a,me);break e}ot&&ot(t,le,ie),t==="focusout"&&ie&&le.type==="number"&&ie.memoizedProps.value!=null&&Ct(le,"number",le.value)}switch(ot=ie?Qa(ie):window,t){case"focusin":(ys(ot)||ot.contentEditable==="true")&&(Ss=ot,Gf=ie,Ul=null);break;case"focusout":Ul=Gf=Ss=null;break;case"mousedown":Hf=!0;break;case"contextmenu":case"mouseup":case"dragend":Hf=!1,Im(ye,a,me);break;case"selectionchange":if(ir)break;case"keydown":case"keyup":Im(ye,a,me)}var Ht;if(tn)e:{switch(t){case"compositionstart":var an="onCompositionStart";break e;case"compositionend":an="onCompositionEnd";break e;case"compositionupdate":an="onCompositionUpdate";break e}an=void 0}else qn?Mn(t,a)&&(an="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(an="onCompositionStart");an&&(ki&&a.locale!=="ko"&&(qn||an!=="onCompositionStart"?an==="onCompositionEnd"&&qn&&(Ht=wt()):(Sa=me,Vr="value"in Sa?Sa.value:Sa.textContent,qn=!0)),ot=Nu(ie,an),0<ot.length&&(an=new yt(an,t,null,a,me),ye.push({event:an,listeners:ot}),Ht?an.data=Ht:(Ht=Oi(a),Ht!==null&&(an.data=Ht)))),(Ht=Ha?Ja(t,a):vi(t,a))&&(an=Nu(ie,"onBeforeInput"),0<an.length&&(ot=new yt("onBeforeInput","beforeinput",null,a,me),ye.push({event:ot,listeners:an}),ot.data=Ht)),ry(ye,t,ie,a,me)}ox(ye,n)})}function sc(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Nu(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=Ks(t,a),u!=null&&o.unshift(sc(t,u,d)),u=Ks(t,n),u!=null&&o.push(sc(t,u,d))),t.tag===3)return o;t=t.return}return[]}function uy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function cx(t,n,a,o,u){for(var d=n._reactName,v=[];a!==null&&a!==o;){var R=a,B=R.alternate,ie=R.stateNode;if(R=R.tag,B!==null&&B===o)break;R!==5&&R!==26&&R!==27||ie===null||(B=ie,u?(ie=Ks(a,d),ie!=null&&v.unshift(sc(a,ie,B))):u||(ie=Ks(a,d),ie!=null&&v.push(sc(a,ie,B)))),a=a.return}v.length!==0&&t.push({event:n,listeners:v})}var fy=/\r\n?/g,dy=/\u0000|\uFFFD/g;function ux(t){return(typeof t=="string"?t:""+t).replace(fy,`
`).replace(dy,"")}function fx(t,n){return n=ux(n),ux(t)===n}function An(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Pn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Pn(t,""+o);break;case"className":Ke(t,"class",o);break;case"tabIndex":Ke(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ke(t,a,o);break;case"style":Yi(t,o,d);break;case"data":if(n!=="object"){Ke(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=$s(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&An(t,n,"name",u.name,u,null),An(t,n,"formEncType",u.formEncType,u,null),An(t,n,"formMethod",u.formMethod,u,null),An(t,n,"formTarget",u.formTarget,u,null)):(An(t,n,"encType",u.encType,u,null),An(t,n,"method",u.method,u,null),An(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=$s(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=ba);break;case"onScroll":o!=null&&Jt("scroll",t);break;case"onScrollEnd":o!=null&&Jt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=$s(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Jt("beforetoggle",t),Jt("toggle",t),Ve(t,"popover",o);break;case"xlinkActuate":Ze(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ze(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ze(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ze(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ze(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ze(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ze(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ve(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Wn.get(a)||a,Ve(t,a,o))}}function dh(t,n,a,o,u,d){switch(a){case"style":Yi(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?Pn(t,o):(typeof o=="number"||typeof o=="bigint")&&Pn(t,""+o);break;case"onScroll":o!=null&&Jt("scroll",t);break;case"onScrollEnd":o!=null&&Jt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[ni]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Ve(t,a,o)}}}function Ri(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Jt("error",t),Jt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var v=a[d];if(v!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:An(t,n,d,v,a,null)}}u&&An(t,n,"srcSet",a.srcSet,a,null),o&&An(t,n,"src",a.src,a,null);return;case"input":Jt("invalid",t);var R=d=v=u=null,B=null,ie=null;for(o in a)if(a.hasOwnProperty(o)){var me=a[o];if(me!=null)switch(o){case"name":u=me;break;case"type":v=me;break;case"checked":B=me;break;case"defaultChecked":ie=me;break;case"value":d=me;break;case"defaultValue":R=me;break;case"children":case"dangerouslySetInnerHTML":if(me!=null)throw Error(s(137,n));break;default:An(t,n,o,me,a,null)}}ii(t,d,R,B,ie,v,u,!1);return;case"select":Jt("invalid",t),o=v=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":v=R;break;case"multiple":o=R;default:An(t,n,u,R,a,null)}n=d,a=v,t.multiple=!!o,n!=null?Zn(t,!!o,n,!1):a!=null&&Zn(t,!!o,a,!0);return;case"textarea":Jt("invalid",t),d=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(R=a[v],R!=null))switch(v){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:An(t,n,v,R,a,null)}Yn(t,o,u,d);return;case"option":for(B in a)a.hasOwnProperty(B)&&(o=a[B],o!=null)&&(B==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":An(t,n,B,o,a,null));return;case"dialog":Jt("beforetoggle",t),Jt("toggle",t),Jt("cancel",t),Jt("close",t);break;case"iframe":case"object":Jt("load",t);break;case"video":case"audio":for(o=0;o<ac.length;o++)Jt(ac[o],t);break;case"image":Jt("error",t),Jt("load",t);break;case"details":Jt("toggle",t);break;case"embed":case"source":case"link":Jt("error",t),Jt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ie in a)if(a.hasOwnProperty(ie)&&(o=a[ie],o!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:An(t,n,ie,o,a,null)}return;default:if(qt(n)){for(me in a)a.hasOwnProperty(me)&&(o=a[me],o!==void 0&&dh(t,n,me,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&An(t,n,R,o,a,null))}function hy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,v=null,R=null,B=null,ie=null,me=null;for(ue in a){var ye=a[ue];if(a.hasOwnProperty(ue)&&ye!=null)switch(ue){case"checked":break;case"value":break;case"defaultValue":B=ye;default:o.hasOwnProperty(ue)||An(t,n,ue,null,o,ye)}}for(var le in o){var ue=o[le];if(ye=a[le],o.hasOwnProperty(le)&&(ue!=null||ye!=null))switch(le){case"type":d=ue;break;case"name":u=ue;break;case"checked":ie=ue;break;case"defaultChecked":me=ue;break;case"value":v=ue;break;case"defaultValue":R=ue;break;case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(s(137,n));break;default:ue!==ye&&An(t,n,le,ue,o,ye)}}We(t,v,R,B,ie,me,d,u);return;case"select":ue=v=R=le=null;for(d in a)if(B=a[d],a.hasOwnProperty(d)&&B!=null)switch(d){case"value":break;case"multiple":ue=B;default:o.hasOwnProperty(d)||An(t,n,d,null,o,B)}for(u in o)if(d=o[u],B=a[u],o.hasOwnProperty(u)&&(d!=null||B!=null))switch(u){case"value":le=d;break;case"defaultValue":R=d;break;case"multiple":v=d;default:d!==B&&An(t,n,u,d,o,B)}n=R,a=v,o=ue,le!=null?Zn(t,!!a,le,!1):!!o!=!!a&&(n!=null?Zn(t,!!a,n,!0):Zn(t,!!a,a?[]:"",!1));return;case"textarea":ue=le=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:An(t,n,R,null,o,u)}for(v in o)if(u=o[v],d=a[v],o.hasOwnProperty(v)&&(u!=null||d!=null))switch(v){case"value":le=u;break;case"defaultValue":ue=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&An(t,n,v,u,o,d)}Gi(t,le,ue);return;case"option":for(var nt in a)le=a[nt],a.hasOwnProperty(nt)&&le!=null&&!o.hasOwnProperty(nt)&&(nt==="selected"?t.selected=!1:An(t,n,nt,null,o,le));for(B in o)le=o[B],ue=a[B],o.hasOwnProperty(B)&&le!==ue&&(le!=null||ue!=null)&&(B==="selected"?t.selected=le&&typeof le!="function"&&typeof le!="symbol":An(t,n,B,le,o,ue));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var vt in a)le=a[vt],a.hasOwnProperty(vt)&&le!=null&&!o.hasOwnProperty(vt)&&An(t,n,vt,null,o,le);for(ie in o)if(le=o[ie],ue=a[ie],o.hasOwnProperty(ie)&&le!==ue&&(le!=null||ue!=null))switch(ie){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(s(137,n));break;default:An(t,n,ie,le,o,ue)}return;default:if(qt(n)){for(var wn in a)le=a[wn],a.hasOwnProperty(wn)&&le!==void 0&&!o.hasOwnProperty(wn)&&dh(t,n,wn,void 0,o,le);for(me in o)le=o[me],ue=a[me],!o.hasOwnProperty(me)||le===ue||le===void 0&&ue===void 0||dh(t,n,me,le,o,ue);return}}for(var Z in a)le=a[Z],a.hasOwnProperty(Z)&&le!=null&&!o.hasOwnProperty(Z)&&An(t,n,Z,null,o,le);for(ye in o)le=o[ye],ue=a[ye],!o.hasOwnProperty(ye)||le===ue||le==null&&ue==null||An(t,n,ye,le,o,ue)}function dx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function py(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,v=u.initiatorType,R=u.duration;if(d&&R&&dx(v)){for(v=0,R=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],ie=B.startTime;if(ie>R)break;var me=B.transferSize,ye=B.initiatorType;me&&dx(ye)&&(B=B.responseEnd,v+=me*(B<R?1:(R-ie)/(B-ie)))}if(--o,n+=8*(d+v)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var hh=null,ph=null;function Ou(t){return t.nodeType===9?t:t.ownerDocument}function hx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function px(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function mh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var gh=null;function my(){var t=window.event;return t&&t.type==="popstate"?t===gh?!1:(gh=t,!0):(gh=null,!1)}var mx=typeof setTimeout=="function"?setTimeout:void 0,gy=typeof clearTimeout=="function"?clearTimeout:void 0,gx=typeof Promise=="function"?Promise:void 0,xy=typeof queueMicrotask=="function"?queueMicrotask:typeof gx<"u"?function(t){return gx.resolve(null).then(t).catch(_y)}:mx;function _y(t){setTimeout(function(){throw t})}function br(t){return t==="head"}function xx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),tl(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")rc(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,rc(a);for(var d=a.firstChild;d;){var v=d.nextSibling,R=d.nodeName;d[Za]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=v}}else a==="body"&&rc(t.ownerDocument.body);a=u}while(a);tl(n)}function _x(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function xh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":xh(a),xs(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function vy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Za])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=Oa(t.nextSibling),t===null)break}return null}function by(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Oa(t.nextSibling),t===null))return null;return t}function vx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Oa(t.nextSibling),t===null))return null;return t}function _h(t){return t.data==="$?"||t.data==="$~"}function vh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function yy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Oa(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var bh=null;function bx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Oa(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function yx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Sx(t,n,a){switch(n=Ou(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function rc(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);xs(t)}var Da=new Map,Ex=new Set;function Du(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Fs=z.d;z.d={f:Sy,r:Ey,D:My,C:Ty,L:Ay,m:wy,X:Cy,S:Ry,M:Ny};function Sy(){var t=Fs.f(),n=Eu();return t||n}function Ey(t){var n=va(t);n!==null&&n.tag===5&&n.type==="form"?Gg(n):Fs.r(t)}var Qo=typeof document>"u"?null:document;function Mx(t,n,a){var o=Qo;if(o&&typeof n=="string"&&n){var u=Vt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Ex.has(u)||(Ex.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Ri(n,"link",t),jn(n),o.head.appendChild(n)))}}function My(t){Fs.D(t),Mx("dns-prefetch",t,null)}function Ty(t,n){Fs.C(t,n),Mx("preconnect",t,n)}function Ay(t,n,a){Fs.L(t,n,a);var o=Qo;if(o&&t&&n){var u='link[rel="preload"][as="'+Vt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Vt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Vt(a.imageSizes)+'"]')):u+='[href="'+Vt(t)+'"]';var d=u;switch(n){case"style":d=Jo(t);break;case"script":d=el(t)}Da.has(d)||(t=b({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Da.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(oc(d))||n==="script"&&o.querySelector(lc(d))||(n=o.createElement("link"),Ri(n,"link",t),jn(n),o.head.appendChild(n)))}}function wy(t,n){Fs.m(t,n);var a=Qo;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Vt(o)+'"][href="'+Vt(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=el(t)}if(!Da.has(d)&&(t=b({rel:"modulepreload",href:t},n),Da.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(lc(d)))return}o=a.createElement("link"),Ri(o,"link",t),jn(o),a.head.appendChild(o)}}}function Ry(t,n,a){Fs.S(t,n,a);var o=Qo;if(o&&t){var u=Xi(o).hoistableStyles,d=Jo(t);n=n||"default";var v=u.get(d);if(!v){var R={loading:0,preload:null};if(v=o.querySelector(oc(d)))R.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Da.get(d))&&yh(t,a);var B=v=o.createElement("link");jn(B),Ri(B,"link",t),B._p=new Promise(function(ie,me){B.onload=ie,B.onerror=me}),B.addEventListener("load",function(){R.loading|=1}),B.addEventListener("error",function(){R.loading|=2}),R.loading|=4,Lu(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:R},u.set(d,v)}}}function Cy(t,n){Fs.X(t,n);var a=Qo;if(a&&t){var o=Xi(a).hoistableScripts,u=el(t),d=o.get(u);d||(d=a.querySelector(lc(u)),d||(t=b({src:t,async:!0},n),(n=Da.get(u))&&Sh(t,n),d=a.createElement("script"),jn(d),Ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Ny(t,n){Fs.M(t,n);var a=Qo;if(a&&t){var o=Xi(a).hoistableScripts,u=el(t),d=o.get(u);d||(d=a.querySelector(lc(u)),d||(t=b({src:t,async:!0,type:"module"},n),(n=Da.get(u))&&Sh(t,n),d=a.createElement("script"),jn(d),Ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Tx(t,n,a,o){var u=(u=se.current)?Du(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Jo(a.href),a=Xi(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Jo(a.href);var d=Xi(u).hoistableStyles,v=d.get(t);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,v),(d=u.querySelector(oc(t)))&&!d._p&&(v.instance=d,v.state.loading=5),Da.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Da.set(t,a),d||Oy(u,t,a,v.state))),n&&o===null)throw Error(s(528,""));return v}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=el(a),a=Xi(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Jo(t){return'href="'+Vt(t)+'"'}function oc(t){return'link[rel="stylesheet"]['+t+"]"}function Ax(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function Oy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Ri(n,"link",a),jn(n),t.head.appendChild(n))}function el(t){return'[src="'+Vt(t)+'"]'}function lc(t){return"script[async]"+t}function wx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Vt(a.href)+'"]');if(o)return n.instance=o,jn(o),o;var u=b({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),jn(o),Ri(o,"style",u),Lu(o,a.precedence,t),n.instance=o;case"stylesheet":u=Jo(a.href);var d=t.querySelector(oc(u));if(d)return n.state.loading|=4,n.instance=d,jn(d),d;o=Ax(a),(u=Da.get(u))&&yh(o,u),d=(t.ownerDocument||t).createElement("link"),jn(d);var v=d;return v._p=new Promise(function(R,B){v.onload=R,v.onerror=B}),Ri(d,"link",o),n.state.loading|=4,Lu(d,a.precedence,t),n.instance=d;case"script":return d=el(a.src),(u=t.querySelector(lc(d)))?(n.instance=u,jn(u),u):(o=a,(u=Da.get(d))&&(o=b({},a),Sh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),jn(u),Ri(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Lu(o,a.precedence,t));return n.instance}function Lu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,v=0;v<o.length;v++){var R=o[v];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function yh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Sh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Uu=null;function Rx(t,n,a){if(Uu===null){var o=new Map,u=Uu=new Map;u.set(a,o)}else u=Uu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Za]||d[Zt]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var v=d.getAttribute(n)||"";v=t+v;var R=o.get(v);R?R.push(d):o.set(v,[d])}}return o}function Cx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Dy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Nx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Ly(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Jo(o.href),d=n.querySelector(oc(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Iu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,jn(d);return}d=n.ownerDocument||n,o=Ax(o),(u=Da.get(u))&&yh(o,u),d=d.createElement("link"),jn(d);var v=d;v._p=new Promise(function(R,B){v.onload=R,v.onerror=B}),Ri(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Iu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Eh=0;function Uy(t,n){return t.stylesheets&&t.count===0&&Fu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&Fu(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&Eh===0&&(Eh=62500*py());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Fu(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>Eh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Fu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Pu=null;function Fu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Pu=new Map,n.forEach(Iy,t),Pu=null,Iu.call(t))}function Iy(t,n){if(!(n.state.loading&4)){var a=Pu.get(t);if(a)var o=a.get(null);else{a=new Map,Pu.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var v=u[d];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),d=a.get(v)||o,d===o&&a.set(null,u),a.set(v,u),this.count++,o=Iu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var cc={$$typeof:I,Provider:null,Consumer:null,_currentValue:ce,_currentValue2:ce,_threadCount:0};function Py(t,n,a,o,u,d,v,R,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=et(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=et(0),this.hiddenUpdates=et(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function Ox(t,n,a,o,u,d,v,R,B,ie,me,ye){return t=new Py(t,n,a,v,B,ie,me,ye,R),n=1,d===!0&&(n|=24),d=oa(3,null,null,n),t.current=d,d.stateNode=t,n=nd(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},rd(d),t}function Dx(t){return t?(t=Oo,t):Oo}function Lx(t,n,a,o,u,d){u=Dx(u),o.context===null?o.context=u:o.pendingContext=u,o=cr(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=ur(t,o,n),a!==null&&(ea(a,t,n),Hl(a,t,n))}function Ux(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Mh(t,n){Ux(t,n),(t=t.alternate)&&Ux(t,n)}function Ix(t){if(t.tag===13||t.tag===31){var n=qr(t,67108864);n!==null&&ea(n,t,67108864),Mh(t,67108864)}}function Px(t){if(t.tag===13||t.tag===31){var n=da();n=fi(n);var a=qr(t,n);a!==null&&ea(a,t,n),Mh(t,n)}}var Bu=!0;function Fy(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=2,Th(t,n,a,o)}finally{z.p=d,D.T=u}}function By(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=8,Th(t,n,a,o)}finally{z.p=d,D.T=u}}function Th(t,n,a,o){if(Bu){var u=Ah(o);if(u===null)fh(t,n,o,zu,a),Bx(t,o);else if(Gy(u,t,n,a,o))o.stopPropagation();else if(Bx(t,o),n&4&&-1<zy.indexOf(t)){for(;u!==null;){var d=va(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var v=we(d.pendingLanes);if(v!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;v;){var B=1<<31-He(v);R.entanglements[1]|=B,v&=~B}as(d),(xn&6)===0&&(yu=Ue()+500,ic(0))}}break;case 31:case 13:R=qr(d,2),R!==null&&ea(R,d,2),Eu(),Mh(d,2)}if(d=Ah(o),d===null&&fh(t,n,o,zu,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else fh(t,n,o,null,a)}}function Ah(t){return t=Hi(t),wh(t)}var zu=null;function wh(t){if(zu=null,t=za(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return zu=t,null}function Fx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Nn()){case N:return 2;case M:return 8;case K:case ge:return 32;case Te:return 268435456;default:return 32}default:return 32}}var Rh=!1,yr=null,Sr=null,Er=null,uc=new Map,fc=new Map,Mr=[],zy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Bx(t,n){switch(t){case"focusin":case"focusout":yr=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":Er=null;break;case"pointerover":case"pointerout":uc.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":fc.delete(n.pointerId)}}function dc(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=va(n),n!==null&&Ix(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function Gy(t,n,a,o,u){switch(n){case"focusin":return yr=dc(yr,t,n,a,o,u),!0;case"dragenter":return Sr=dc(Sr,t,n,a,o,u),!0;case"mouseover":return Er=dc(Er,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return uc.set(d,dc(uc.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,fc.set(d,dc(fc.get(d)||null,t,n,a,o,u)),!0}return!1}function zx(t){var n=za(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,_a(t.priority,function(){Px(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,_a(t.priority,function(){Px(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Gu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Ah(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);kr=o,a.target.dispatchEvent(o),kr=null}else return n=va(a),n!==null&&Ix(n),t.blockedOn=a,!1;n.shift()}return!0}function Gx(t,n,a){Gu(t)&&a.delete(n)}function Hy(){Rh=!1,yr!==null&&Gu(yr)&&(yr=null),Sr!==null&&Gu(Sr)&&(Sr=null),Er!==null&&Gu(Er)&&(Er=null),uc.forEach(Gx),fc.forEach(Gx)}function Hu(t,n){t.blockedOn===n&&(t.blockedOn=null,Rh||(Rh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Hy)))}var ku=null;function Hx(t){ku!==t&&(ku=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){ku===t&&(ku=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(wh(o||a)===null)continue;break}var d=va(a);d!==null&&(t.splice(n,3),n-=3,Ad(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function tl(t){function n(B){return Hu(B,t)}yr!==null&&Hu(yr,t),Sr!==null&&Hu(Sr,t),Er!==null&&Hu(Er,t),uc.forEach(n),fc.forEach(n);for(var a=0;a<Mr.length;a++){var o=Mr[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Mr.length&&(a=Mr[0],a.blockedOn===null);)zx(a),a.blockedOn===null&&Mr.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],v=u[ni]||null;if(typeof d=="function")v||Hx(a);else if(v){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,v=d[ni]||null)R=v.formAction;else if(wh(u)!==null)continue}else R=v.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),Hx(a)}}}function kx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(v){return u=v})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Ch(t){this._internalRoot=t}Vu.prototype.render=Ch.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=da();Lx(a,o,t,n,null,null)},Vu.prototype.unmount=Ch.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Lx(t.current,2,null,t,null,null),Eu(),n[Vn]=null}};function Vu(t){this._internalRoot=t}Vu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Hr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Mr.length&&n!==0&&n<Mr[a].priority;a++);Mr.splice(a,0,t),a===0&&zx(t)}};var Vx=e.version;if(Vx!=="19.2.3")throw Error(s(527,Vx,"19.2.3"));z.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var ky={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:D,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ju=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ju.isDisabled&&ju.supportsFiber)try{de=ju.inject(ky),re=ju}catch{}}return pc.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Kg,d=Zg,v=Qg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError)),n=Ox(t,1,!1,null,null,a,o,null,u,d,v,kx),t[Vn]=n.current,uh(t),new Ch(n)},pc.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Kg,v=Zg,R=Qg,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=Ox(t,1,!0,n,a??null,o,u,B,d,v,R,kx),n.context=Dx(null),a=n.current,o=da(),o=fi(o),u=cr(o),u.callback=null,ur(a,u,o),a=o,n.current.lanes=a,bt(n,a),as(n),t[Vn]=n.current,uh(t),new Vu(n)},pc.version="19.2.3",pc}var Jx;function eS(){if(Jx)return Dh.exports;Jx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Dh.exports=Jy(),Dh.exports}var tS=eS();const hm="184",bl={ROTATE:0,DOLLY:1,PAN:2},vl={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nS=0,e_=1,iS=2,xf=1,aS=2,Tc=3,Br=0,ia=1,Vs=2,Xs=0,yl=1,t_=2,n_=3,i_=4,sS=5,ho=100,rS=101,oS=102,lS=103,cS=104,uS=200,fS=201,dS=202,hS=203,_p=204,vp=205,pS=206,mS=207,gS=208,xS=209,_S=210,vS=211,bS=212,yS=213,SS=214,bp=0,yp=1,Sp=2,El=3,Ep=4,Mp=5,Tp=6,Ap=7,Ov=0,ES=1,MS=2,us=0,Dv=1,Lv=2,Uv=3,Iv=4,Pv=5,Fv=6,Bv=7,zv=300,xo=301,Ml=302,_f=303,Ph=304,Lf=306,wp=1e3,js=1001,Rp=1002,Ci=1003,TS=1004,Xu=1005,Pi=1006,Fh=1007,mo=1008,Pa=1009,Gv=1010,Hv=1011,Rc=1012,pm=1013,hs=1014,ls=1015,Ws=1016,mm=1017,gm=1018,Cc=1020,kv=35902,Vv=35899,jv=1021,Xv=1022,$a=1023,qs=1026,go=1027,Yv=1028,xm=1029,_o=1030,_m=1031,vm=1033,vf=33776,bf=33777,yf=33778,Sf=33779,Cp=35840,Np=35841,Op=35842,Dp=35843,Lp=36196,Up=37492,Ip=37496,Pp=37488,Fp=37489,wf=37490,Bp=37491,zp=37808,Gp=37809,Hp=37810,kp=37811,Vp=37812,jp=37813,Xp=37814,Yp=37815,Wp=37816,qp=37817,$p=37818,Kp=37819,Zp=37820,Qp=37821,Jp=36492,em=36494,tm=36495,nm=36283,im=36284,Rf=36285,am=36286,AS=3200,a_=0,wS=1,Ir="",ga="srgb",Cf="srgb-linear",Nf="linear",En="srgb",nl=7680,s_=519,RS=512,CS=513,NS=514,bm=515,OS=516,DS=517,ym=518,LS=519,r_=35044,o_="300 es",cs=2e3,Of=2001;function US(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Nc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function IS(){const r=Nc("canvas");return r.style.display="block",r}const l_={};function c_(...r){const e="THREE."+r.shift();console.log(e,...r)}function Wv(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Tt(...r){r=Wv(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function cn(...r){r=Wv(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function sm(...r){const e=r.join(" ");e in l_||(l_[e]=!0,Tt(...r))}function PS(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const FS={[bp]:yp,[Sp]:Tp,[Ep]:Ap,[El]:Mp,[yp]:bp,[Tp]:Sp,[Ap]:Ep,[Mp]:El};class Gr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const Li=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ef=Math.PI/180,rm=180/Math.PI;function Lc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Li[r&255]+Li[r>>8&255]+Li[r>>16&255]+Li[r>>24&255]+"-"+Li[e&255]+Li[e>>8&255]+"-"+Li[e>>16&15|64]+Li[e>>24&255]+"-"+Li[i&63|128]+Li[i>>8&255]+"-"+Li[i>>16&255]+Li[i>>24&255]+Li[s&255]+Li[s>>8&255]+Li[s>>16&255]+Li[s>>24&255]).toLowerCase()}function en(r,e,i){return Math.max(e,Math.min(i,r))}function BS(r,e){return(r%e+e)%e}function Bh(r,e,i){return(1-i)*r+i*e}function mc(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ta(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const zS={DEG2RAD:Ef},Nm=class Nm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=en(this.x,e.x,i.x),this.y=en(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=en(this.x,e,i),this.y=en(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(en(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(en(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Nm.prototype.isVector2=!0;let Wt=Nm;class zr{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],_=s[l+2],b=s[l+3],x=c[f+0],S=c[f+1],T=c[f+2],O=c[f+3];if(b!==O||m!==x||p!==S||_!==T){let E=m*x+p*S+_*T+b*O;E<0&&(x=-x,S=-S,T=-T,O=-O,E=-E);let y=1-h;if(E<.9995){const C=Math.acos(E),I=Math.sin(C);y=Math.sin(y*C)/I,h=Math.sin(h*C)/I,m=m*y+x*h,p=p*y+S*h,_=_*y+T*h,b=b*y+O*h}else{m=m*y+x*h,p=p*y+S*h,_=_*y+T*h,b=b*y+O*h;const C=1/Math.sqrt(m*m+p*p+_*_+b*b);m*=C,p*=C,_*=C,b*=C}}e[i]=m,e[i+1]=p,e[i+2]=_,e[i+3]=b}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],_=s[l+3],b=c[f],x=c[f+1],S=c[f+2],T=c[f+3];return e[i]=h*T+_*b+m*S-p*x,e[i+1]=m*T+_*x+p*b-h*S,e[i+2]=p*T+_*S+h*x-m*b,e[i+3]=_*T-h*b-m*x-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),_=h(l/2),b=h(c/2),x=m(s/2),S=m(l/2),T=m(c/2);switch(f){case"XYZ":this._x=x*_*b+p*S*T,this._y=p*S*b-x*_*T,this._z=p*_*T+x*S*b,this._w=p*_*b-x*S*T;break;case"YXZ":this._x=x*_*b+p*S*T,this._y=p*S*b-x*_*T,this._z=p*_*T-x*S*b,this._w=p*_*b+x*S*T;break;case"ZXY":this._x=x*_*b-p*S*T,this._y=p*S*b+x*_*T,this._z=p*_*T+x*S*b,this._w=p*_*b-x*S*T;break;case"ZYX":this._x=x*_*b-p*S*T,this._y=p*S*b+x*_*T,this._z=p*_*T-x*S*b,this._w=p*_*b+x*S*T;break;case"YZX":this._x=x*_*b+p*S*T,this._y=p*S*b+x*_*T,this._z=p*_*T-x*S*b,this._w=p*_*b-x*S*T;break;case"XZY":this._x=x*_*b-p*S*T,this._y=p*S*b-x*_*T,this._z=p*_*T+x*S*b,this._w=p*_*b+x*S*T;break;default:Tt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],_=i[6],b=i[10],x=s+h+b;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(_-m)*S,this._y=(c-p)*S,this._z=(f-l)*S}else if(s>h&&s>b){const S=2*Math.sqrt(1+s-h-b);this._w=(_-m)/S,this._x=.25*S,this._y=(l+f)/S,this._z=(c+p)/S}else if(h>b){const S=2*Math.sqrt(1+h-s-b);this._w=(c-p)/S,this._x=(l+f)/S,this._y=.25*S,this._z=(m+_)/S}else{const S=2*Math.sqrt(1+b-s-h);this._w=(f-l)/S,this._x=(c+p)/S,this._y=(m+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,_=i._w;return this._x=s*_+f*h+l*p-c*m,this._y=l*_+f*m+c*h-s*p,this._z=c*_+f*p+s*m-l*h,this._w=f*_-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),_=Math.sin(p);m=Math.sin(m*p)/_,i=Math.sin(i*p)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Om=class Om{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(u_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(u_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),_=2*(h*i-c*l),b=2*(c*s-f*i);return this.x=i+m*p+f*b-h*_,this.y=s+m*_+h*p-c*b,this.z=l+m*b+c*_-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=en(this.x,e.x,i.x),this.y=en(this.y,e.y,i.y),this.z=en(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=en(this.x,e,i),this.y=en(this.y,e,i),this.z=en(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(en(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return zh.copy(this).projectOnVector(e),this.sub(zh)}reflect(e){return this.sub(zh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(en(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Om.prototype.isVector3=!0;let ee=Om;const zh=new ee,u_=new zr,Dm=class Dm{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],_=s[4],b=s[7],x=s[2],S=s[5],T=s[8],O=l[0],E=l[3],y=l[6],C=l[1],I=l[4],U=l[7],j=l[2],L=l[5],G=l[8];return c[0]=f*O+h*C+m*j,c[3]=f*E+h*I+m*L,c[6]=f*y+h*U+m*G,c[1]=p*O+_*C+b*j,c[4]=p*E+_*I+b*L,c[7]=p*y+_*U+b*G,c[2]=x*O+S*C+T*j,c[5]=x*E+S*I+T*L,c[8]=x*y+S*U+T*G,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8];return i*f*_-i*h*p-s*c*_+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],b=_*f-h*p,x=h*m-_*c,S=p*c-f*m,T=i*b+s*x+l*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const O=1/T;return e[0]=b*O,e[1]=(l*p-_*s)*O,e[2]=(h*s-l*f)*O,e[3]=x*O,e[4]=(_*i-l*m)*O,e[5]=(l*c-h*i)*O,e[6]=S*O,e[7]=(s*m-p*i)*O,e[8]=(f*i-s*c)*O,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Gh.makeScale(e,i)),this}rotate(e){return this.premultiply(Gh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Gh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Dm.prototype.isMatrix3=!0;let Pt=Dm;const Gh=new Pt,f_=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),d_=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function GS(){const r={enabled:!0,workingColorSpace:Cf,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===En&&(l.r=Ys(l.r),l.g=Ys(l.g),l.b=Ys(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===En&&(l.r=Sl(l.r),l.g=Sl(l.g),l.b=Sl(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ir?Nf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return sm("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return sm("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Cf]:{primaries:e,whitePoint:s,transfer:Nf,toXYZ:f_,fromXYZ:d_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ga},outputColorSpaceConfig:{drawingBufferColorSpace:ga}},[ga]:{primaries:e,whitePoint:s,transfer:En,toXYZ:f_,fromXYZ:d_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ga}}}),r}const on=GS();function Ys(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Sl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let il;class HS{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{il===void 0&&(il=Nc("canvas")),il.width=e.width,il.height=e.height;const l=il.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=il}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Nc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ys(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ys(i[s]/255)*255):i[s]=Ys(i[s]);return{data:i,width:e.width,height:e.height}}else return Tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kS=0;class Sm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kS++}),this.uuid=Lc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Hh(l[f].image)):c.push(Hh(l[f]))}else c=Hh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Hh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?HS.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Tt("Texture: Unable to serialize Texture."),{})}let VS=0;const kh=new ee;class Fi extends Gr{constructor(e=Fi.DEFAULT_IMAGE,i=Fi.DEFAULT_MAPPING,s=js,l=js,c=Pi,f=mo,h=$a,m=Pa,p=Fi.DEFAULT_ANISOTROPY,_=Ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VS++}),this.uuid=Lc(),this.name="",this.source=new Sm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(kh).x}get height(){return this.source.getSize(kh).y}get depth(){return this.source.getSize(kh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){Tt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){Tt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wp:e.x=e.x-Math.floor(e.x);break;case js:e.x=e.x<0?0:1;break;case Rp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wp:e.y=e.y-Math.floor(e.y);break;case js:e.y=e.y<0?0:1;break;case Rp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Fi.DEFAULT_IMAGE=null;Fi.DEFAULT_MAPPING=zv;Fi.DEFAULT_ANISOTROPY=1;const Lm=class Lm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],_=m[4],b=m[8],x=m[1],S=m[5],T=m[9],O=m[2],E=m[6],y=m[10];if(Math.abs(_-x)<.01&&Math.abs(b-O)<.01&&Math.abs(T-E)<.01){if(Math.abs(_+x)<.1&&Math.abs(b+O)<.1&&Math.abs(T+E)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(p+1)/2,U=(S+1)/2,j=(y+1)/2,L=(_+x)/4,G=(b+O)/4,A=(T+E)/4;return I>U&&I>j?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=L/s,c=G/s):U>j?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=L/l,c=A/l):j<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(j),s=G/c,l=A/c),this.set(s,l,c,i),this}let C=Math.sqrt((E-T)*(E-T)+(b-O)*(b-O)+(x-_)*(x-_));return Math.abs(C)<.001&&(C=1),this.x=(E-T)/C,this.y=(b-O)/C,this.z=(x-_)/C,this.w=Math.acos((p+S+y-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=en(this.x,e.x,i.x),this.y=en(this.y,e.y,i.y),this.z=en(this.z,e.z,i.z),this.w=en(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=en(this.x,e,i),this.y=en(this.y,e,i),this.z=en(this.z,e,i),this.w=en(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(en(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Lm.prototype.isVector4=!0;let ei=Lm;class jS extends Gr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new ei(0,0,e,i),this.scissorTest=!1,this.viewport=new ei(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new Fi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Pi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Sm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fs extends jS{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class qv extends Fi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Ci,this.minFilter=Ci,this.wrapR=js,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class XS extends Fi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Ci,this.minFilter=Ci,this.wrapR=js,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Df=class Df{constructor(e,i,s,l,c,f,h,m,p,_,b,x,S,T,O,E){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,_,b,x,S,T,O,E)}set(e,i,s,l,c,f,h,m,p,_,b,x,S,T,O,E){const y=this.elements;return y[0]=e,y[4]=i,y[8]=s,y[12]=l,y[1]=c,y[5]=f,y[9]=h,y[13]=m,y[2]=p,y[6]=_,y[10]=b,y[14]=x,y[3]=S,y[7]=T,y[11]=O,y[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Df().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/al.setFromMatrixColumn(e,0).length(),c=1/al.setFromMatrixColumn(e,1).length(),f=1/al.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),b=Math.sin(c);if(e.order==="XYZ"){const x=f*_,S=f*b,T=h*_,O=h*b;i[0]=m*_,i[4]=-m*b,i[8]=p,i[1]=S+T*p,i[5]=x-O*p,i[9]=-h*m,i[2]=O-x*p,i[6]=T+S*p,i[10]=f*m}else if(e.order==="YXZ"){const x=m*_,S=m*b,T=p*_,O=p*b;i[0]=x+O*h,i[4]=T*h-S,i[8]=f*p,i[1]=f*b,i[5]=f*_,i[9]=-h,i[2]=S*h-T,i[6]=O+x*h,i[10]=f*m}else if(e.order==="ZXY"){const x=m*_,S=m*b,T=p*_,O=p*b;i[0]=x-O*h,i[4]=-f*b,i[8]=T+S*h,i[1]=S+T*h,i[5]=f*_,i[9]=O-x*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const x=f*_,S=f*b,T=h*_,O=h*b;i[0]=m*_,i[4]=T*p-S,i[8]=x*p+O,i[1]=m*b,i[5]=O*p+x,i[9]=S*p-T,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const x=f*m,S=f*p,T=h*m,O=h*p;i[0]=m*_,i[4]=O-x*b,i[8]=T*b+S,i[1]=b,i[5]=f*_,i[9]=-h*_,i[2]=-p*_,i[6]=S*b+T,i[10]=x-O*b}else if(e.order==="XZY"){const x=f*m,S=f*p,T=h*m,O=h*p;i[0]=m*_,i[4]=-b,i[8]=p*_,i[1]=x*b+O,i[5]=f*_,i[9]=S*b-T,i[2]=T*b-S,i[6]=h*_,i[10]=O*b+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(YS,e,WS)}lookAt(e,i,s){const l=this.elements;return ha.subVectors(e,i),ha.lengthSq()===0&&(ha.z=1),ha.normalize(),Ar.crossVectors(s,ha),Ar.lengthSq()===0&&(Math.abs(s.z)===1?ha.x+=1e-4:ha.z+=1e-4,ha.normalize(),Ar.crossVectors(s,ha)),Ar.normalize(),Yu.crossVectors(ha,Ar),l[0]=Ar.x,l[4]=Yu.x,l[8]=ha.x,l[1]=Ar.y,l[5]=Yu.y,l[9]=ha.y,l[2]=Ar.z,l[6]=Yu.z,l[10]=ha.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],_=s[1],b=s[5],x=s[9],S=s[13],T=s[2],O=s[6],E=s[10],y=s[14],C=s[3],I=s[7],U=s[11],j=s[15],L=l[0],G=l[4],A=l[8],F=l[12],W=l[1],H=l[5],q=l[9],fe=l[13],he=l[2],$=l[6],D=l[10],z=l[14],ce=l[3],xe=l[7],Ae=l[11],P=l[15];return c[0]=f*L+h*W+m*he+p*ce,c[4]=f*G+h*H+m*$+p*xe,c[8]=f*A+h*q+m*D+p*Ae,c[12]=f*F+h*fe+m*z+p*P,c[1]=_*L+b*W+x*he+S*ce,c[5]=_*G+b*H+x*$+S*xe,c[9]=_*A+b*q+x*D+S*Ae,c[13]=_*F+b*fe+x*z+S*P,c[2]=T*L+O*W+E*he+y*ce,c[6]=T*G+O*H+E*$+y*xe,c[10]=T*A+O*q+E*D+y*Ae,c[14]=T*F+O*fe+E*z+y*P,c[3]=C*L+I*W+U*he+j*ce,c[7]=C*G+I*H+U*$+j*xe,c[11]=C*A+I*q+U*D+j*Ae,c[15]=C*F+I*fe+U*z+j*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],_=e[2],b=e[6],x=e[10],S=e[14],T=e[3],O=e[7],E=e[11],y=e[15],C=m*S-p*x,I=h*S-p*b,U=h*x-m*b,j=f*S-p*_,L=f*x-m*_,G=f*b-h*_;return i*(O*C-E*I+y*U)-s*(T*C-E*j+y*L)+l*(T*I-O*j+y*G)-c*(T*U-O*L+E*G)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],b=e[9],x=e[10],S=e[11],T=e[12],O=e[13],E=e[14],y=e[15],C=i*h-s*f,I=i*m-l*f,U=i*p-c*f,j=s*m-l*h,L=s*p-c*h,G=l*p-c*m,A=_*O-b*T,F=_*E-x*T,W=_*y-S*T,H=b*E-x*O,q=b*y-S*O,fe=x*y-S*E,he=C*fe-I*q+U*H+j*W-L*F+G*A;if(he===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/he;return e[0]=(h*fe-m*q+p*H)*$,e[1]=(l*q-s*fe-c*H)*$,e[2]=(O*G-E*L+y*j)*$,e[3]=(x*L-b*G-S*j)*$,e[4]=(m*W-f*fe-p*F)*$,e[5]=(i*fe-l*W+c*F)*$,e[6]=(E*U-T*G-y*I)*$,e[7]=(_*G-x*U+S*I)*$,e[8]=(f*q-h*W+p*A)*$,e[9]=(s*W-i*q-c*A)*$,e[10]=(T*L-O*U+y*C)*$,e[11]=(b*U-_*L-S*C)*$,e[12]=(h*F-f*H-m*A)*$,e[13]=(i*H-s*F+l*A)*$,e[14]=(O*I-T*j-E*C)*$,e[15]=(_*j-b*I+x*C)*$,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,_=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,_*h+s,_*m-l*f,0,p*m-l*h,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,_=f+f,b=h+h,x=c*p,S=c*_,T=c*b,O=f*_,E=f*b,y=h*b,C=m*p,I=m*_,U=m*b,j=s.x,L=s.y,G=s.z;return l[0]=(1-(O+y))*j,l[1]=(S+U)*j,l[2]=(T-I)*j,l[3]=0,l[4]=(S-U)*L,l[5]=(1-(x+y))*L,l[6]=(E+C)*L,l[7]=0,l[8]=(T+I)*G,l[9]=(E-C)*G,l[10]=(1-(x+O))*G,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=al.set(l[0],l[1],l[2]).length();const h=al.set(l[4],l[5],l[6]).length(),m=al.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Xa.copy(this);const p=1/f,_=1/h,b=1/m;return Xa.elements[0]*=p,Xa.elements[1]*=p,Xa.elements[2]*=p,Xa.elements[4]*=_,Xa.elements[5]*=_,Xa.elements[6]*=_,Xa.elements[8]*=b,Xa.elements[9]*=b,Xa.elements[10]*=b,i.setFromRotationMatrix(Xa),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=cs,m=!1){const p=this.elements,_=2*c/(i-e),b=2*c/(s-l),x=(i+e)/(i-e),S=(s+l)/(s-l);let T,O;if(m)T=c/(f-c),O=f*c/(f-c);else if(h===cs)T=-(f+c)/(f-c),O=-2*f*c/(f-c);else if(h===Of)T=-f/(f-c),O=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=x,p[12]=0,p[1]=0,p[5]=b,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=O,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=cs,m=!1){const p=this.elements,_=2/(i-e),b=2/(s-l),x=-(i+e)/(i-e),S=-(s+l)/(s-l);let T,O;if(m)T=1/(f-c),O=f/(f-c);else if(h===cs)T=-2/(f-c),O=-(f+c)/(f-c);else if(h===Of)T=-1/(f-c),O=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=0,p[12]=x,p[1]=0,p[5]=b,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=T,p[14]=O,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};Df.prototype.isMatrix4=!0;let mi=Df;const al=new ee,Xa=new mi,YS=new ee(0,0,0),WS=new ee(1,1,1),Ar=new ee,Yu=new ee,ha=new ee,h_=new mi,p_=new zr;class vo{constructor(e=0,i=0,s=0,l=vo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],_=l[9],b=l[2],x=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(en(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-en(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-b,c),this._z=0);break;case"ZXY":this._x=Math.asin(en(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-b,S),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-en(b,-1,1)),Math.abs(b)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(en(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-b,c)):(this._x=0,this._y=Math.atan2(h,S));break;case"XZY":this._z=Math.asin(-en(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,S),this._y=0);break;default:Tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return h_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(h_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return p_.setFromEuler(this),this.setFromQuaternion(p_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vo.DEFAULT_ORDER="XYZ";class $v{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qS=0;const m_=new ee,sl=new zr,Bs=new mi,Wu=new ee,gc=new ee,$S=new ee,KS=new zr,g_=new ee(1,0,0),x_=new ee(0,1,0),__=new ee(0,0,1),v_={type:"added"},ZS={type:"removed"},rl={type:"childadded",child:null},Vh={type:"childremoved",child:null};class xa extends Gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qS++}),this.uuid=Lc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xa.DEFAULT_UP.clone();const e=new ee,i=new vo,s=new zr,l=new ee(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new mi},normalMatrix:{value:new Pt}}),this.matrix=new mi,this.matrixWorld=new mi,this.matrixAutoUpdate=xa.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $v,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return sl.setFromAxisAngle(e,i),this.quaternion.multiply(sl),this}rotateOnWorldAxis(e,i){return sl.setFromAxisAngle(e,i),this.quaternion.premultiply(sl),this}rotateX(e){return this.rotateOnAxis(g_,e)}rotateY(e){return this.rotateOnAxis(x_,e)}rotateZ(e){return this.rotateOnAxis(__,e)}translateOnAxis(e,i){return m_.copy(e).applyQuaternion(this.quaternion),this.position.add(m_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(g_,e)}translateY(e){return this.translateOnAxis(x_,e)}translateZ(e){return this.translateOnAxis(__,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bs.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Wu.copy(e):Wu.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),gc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bs.lookAt(gc,Wu,this.up):Bs.lookAt(Wu,gc,this.up),this.quaternion.setFromRotationMatrix(Bs),l&&(Bs.extractRotation(l.matrixWorld),sl.setFromRotationMatrix(Bs),this.quaternion.premultiply(sl.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(cn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(v_),rl.child=e,this.dispatchEvent(rl),rl.child=null):cn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(ZS),Vh.child=e,this.dispatchEvent(Vh),Vh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bs.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(v_),rl.child=e,this.dispatchEvent(rl),rl.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gc,e,$S),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gc,KS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const b=m[p];c(e.shapes,b)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),_=f(e.images),b=f(e.shapes),x=f(e.skeletons),S=f(e.animations),T=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),b.length>0&&(s.shapes=b),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),T.length>0&&(s.nodes=T)}return s.object=l,s;function f(h){const m=[];for(const p in h){const _=h[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}xa.DEFAULT_UP=new ee(0,1,0);xa.DEFAULT_MATRIX_AUTO_UPDATE=!0;xa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class qu extends xa{constructor(){super(),this.isGroup=!0,this.type="Group"}}const QS={type:"move"};class jh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const O of e.hand.values()){const E=i.getJointPose(O,s),y=this._getHandJoint(p,O);E!==null&&(y.matrix.fromArray(E.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=E.radius),y.visible=E!==null}const _=p.joints["index-finger-tip"],b=p.joints["thumb-tip"],x=_.position.distanceTo(b.position),S=.02,T=.005;p.inputState.pinching&&x>S+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&x<=S-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(QS)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new qu;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const Kv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wr={h:0,s:0,l:0},$u={h:0,s:0,l:0};function Xh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class Cn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ga){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,on.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=on.workingColorSpace){return this.r=e,this.g=i,this.b=s,on.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=on.workingColorSpace){if(e=BS(e,1),i=en(i,0,1),s=en(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Xh(f,c,e+1/3),this.g=Xh(f,c,e),this.b=Xh(f,c,e-1/3)}return on.colorSpaceToWorking(this,l),this}setStyle(e,i=ga){function s(c){c!==void 0&&parseFloat(c)<1&&Tt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:Tt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);Tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ga){const s=Kv[e.toLowerCase()];return s!==void 0?this.setHex(s,i):Tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}copyLinearToSRGB(e){return this.r=Sl(e.r),this.g=Sl(e.g),this.b=Sl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ga){return on.workingToColorSpace(Ui.copy(this),e),Math.round(en(Ui.r*255,0,255))*65536+Math.round(en(Ui.g*255,0,255))*256+Math.round(en(Ui.b*255,0,255))}getHexString(e=ga){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=on.workingColorSpace){on.workingToColorSpace(Ui.copy(this),i);const s=Ui.r,l=Ui.g,c=Ui.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const _=(h+f)/2;if(h===f)m=0,p=0;else{const b=f-h;switch(p=_<=.5?b/(f+h):b/(2-f-h),f){case s:m=(l-c)/b+(l<c?6:0);break;case l:m=(c-s)/b+2;break;case c:m=(s-l)/b+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,i=on.workingColorSpace){return on.workingToColorSpace(Ui.copy(this),i),e.r=Ui.r,e.g=Ui.g,e.b=Ui.b,e}getStyle(e=ga){on.workingToColorSpace(Ui.copy(this),e);const i=Ui.r,s=Ui.g,l=Ui.b;return e!==ga?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(wr),this.setHSL(wr.h+e,wr.s+i,wr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(wr),e.getHSL($u);const s=Bh(wr.h,$u.h,i),l=Bh(wr.s,$u.s,i),c=Bh(wr.l,$u.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ui=new Cn;Cn.NAMES=Kv;class JS extends xa{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vo,this.environmentIntensity=1,this.environmentRotation=new vo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ya=new ee,zs=new ee,Yh=new ee,Gs=new ee,ol=new ee,ll=new ee,b_=new ee,Wh=new ee,qh=new ee,$h=new ee,Kh=new ei,Zh=new ei,Qh=new ei;class qa{constructor(e=new ee,i=new ee,s=new ee){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ya.subVectors(e,i),l.cross(Ya);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ya.subVectors(l,i),zs.subVectors(s,i),Yh.subVectors(e,i);const f=Ya.dot(Ya),h=Ya.dot(zs),m=Ya.dot(Yh),p=zs.dot(zs),_=zs.dot(Yh),b=f*p-h*h;if(b===0)return c.set(0,0,0),null;const x=1/b,S=(p*m-h*_)*x,T=(f*_-h*m)*x;return c.set(1-S-T,T,S)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Gs)===null?!1:Gs.x>=0&&Gs.y>=0&&Gs.x+Gs.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,Gs)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Gs.x),m.addScaledVector(f,Gs.y),m.addScaledVector(h,Gs.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return Kh.setScalar(0),Zh.setScalar(0),Qh.setScalar(0),Kh.fromBufferAttribute(e,i),Zh.fromBufferAttribute(e,s),Qh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Kh,c.x),f.addScaledVector(Zh,c.y),f.addScaledVector(Qh,c.z),f}static isFrontFacing(e,i,s,l){return Ya.subVectors(s,i),zs.subVectors(e,i),Ya.cross(zs).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ya.subVectors(this.c,this.b),zs.subVectors(this.a,this.b),Ya.cross(zs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qa.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return qa.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return qa.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return qa.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qa.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;ol.subVectors(l,s),ll.subVectors(c,s),Wh.subVectors(e,s);const m=ol.dot(Wh),p=ll.dot(Wh);if(m<=0&&p<=0)return i.copy(s);qh.subVectors(e,l);const _=ol.dot(qh),b=ll.dot(qh);if(_>=0&&b<=_)return i.copy(l);const x=m*b-_*p;if(x<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(ol,f);$h.subVectors(e,c);const S=ol.dot($h),T=ll.dot($h);if(T>=0&&S<=T)return i.copy(c);const O=S*p-m*T;if(O<=0&&p>=0&&T<=0)return h=p/(p-T),i.copy(s).addScaledVector(ll,h);const E=_*T-S*b;if(E<=0&&b-_>=0&&S-T>=0)return b_.subVectors(c,l),h=(b-_)/(b-_+(S-T)),i.copy(l).addScaledVector(b_,h);const y=1/(E+O+x);return f=O*y,h=x*y,i.copy(s).addScaledVector(ol,f).addScaledVector(ll,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Uc{constructor(e=new ee(1/0,1/0,1/0),i=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Wa.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Wa.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Wa.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Wa):Wa.fromBufferAttribute(c,f),Wa.applyMatrix4(e.matrixWorld),this.expandByPoint(Wa);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ku.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Ku.copy(s.boundingBox)),Ku.applyMatrix4(e.matrixWorld),this.union(Ku)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wa),Wa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xc),Zu.subVectors(this.max,xc),cl.subVectors(e.a,xc),ul.subVectors(e.b,xc),fl.subVectors(e.c,xc),Rr.subVectors(ul,cl),Cr.subVectors(fl,ul),oo.subVectors(cl,fl);let i=[0,-Rr.z,Rr.y,0,-Cr.z,Cr.y,0,-oo.z,oo.y,Rr.z,0,-Rr.x,Cr.z,0,-Cr.x,oo.z,0,-oo.x,-Rr.y,Rr.x,0,-Cr.y,Cr.x,0,-oo.y,oo.x,0];return!Jh(i,cl,ul,fl,Zu)||(i=[1,0,0,0,1,0,0,0,1],!Jh(i,cl,ul,fl,Zu))?!1:(Qu.crossVectors(Rr,Cr),i=[Qu.x,Qu.y,Qu.z],Jh(i,cl,ul,fl,Zu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hs=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],Wa=new ee,Ku=new Uc,cl=new ee,ul=new ee,fl=new ee,Rr=new ee,Cr=new ee,oo=new ee,xc=new ee,Zu=new ee,Qu=new ee,lo=new ee;function Jh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){lo.fromArray(r,c);const h=l.x*Math.abs(lo.x)+l.y*Math.abs(lo.y)+l.z*Math.abs(lo.z),m=e.dot(lo),p=i.dot(lo),_=s.dot(lo);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>h)return!1}return!0}const li=new ee,Ju=new Wt;let eE=0;class ds extends Gr{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eE++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=r_,this.updateRanges=[],this.gpuType=ls,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Ju.fromBufferAttribute(this,i),Ju.applyMatrix3(e),this.setXY(i,Ju.x,Ju.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)li.fromBufferAttribute(this,i),li.applyMatrix3(e),this.setXYZ(i,li.x,li.y,li.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)li.fromBufferAttribute(this,i),li.applyMatrix4(e),this.setXYZ(i,li.x,li.y,li.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)li.fromBufferAttribute(this,i),li.applyNormalMatrix(e),this.setXYZ(i,li.x,li.y,li.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)li.fromBufferAttribute(this,i),li.transformDirection(e),this.setXYZ(i,li.x,li.y,li.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=mc(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=ta(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=mc(i,this.array)),i}setX(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=mc(i,this.array)),i}setY(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=mc(i,this.array)),i}setZ(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=mc(i,this.array)),i}setW(e,i){return this.normalized&&(i=ta(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array),l=ta(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=ta(i,this.array),s=ta(s,this.array),l=ta(l,this.array),c=ta(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==r_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Zv extends ds{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class Qv extends ds{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Fa extends ds{constructor(e,i,s){super(new Float32Array(e),i,s)}}const tE=new Uc,_c=new ee,ep=new ee;class Em{constructor(e=new ee,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):tE.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_c.subVectors(e,this.center);const i=_c.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(_c,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ep.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_c.copy(e.center).add(ep)),this.expandByPoint(_c.copy(e.center).sub(ep))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let nE=0;const La=new mi,tp=new xa,dl=new ee,pa=new Uc,vc=new Uc,yi=new ee;class gs extends Gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nE++}),this.uuid=Lc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(US(e)?Qv:Zv)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new Pt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return La.makeRotationFromQuaternion(e),this.applyMatrix4(La),this}rotateX(e){return La.makeRotationX(e),this.applyMatrix4(La),this}rotateY(e){return La.makeRotationY(e),this.applyMatrix4(La),this}rotateZ(e){return La.makeRotationZ(e),this.applyMatrix4(La),this}translate(e,i,s){return La.makeTranslation(e,i,s),this.applyMatrix4(La),this}scale(e,i,s){return La.makeScale(e,i,s),this.applyMatrix4(La),this}lookAt(e){return tp.lookAt(e),tp.updateMatrix(),this.applyMatrix4(tp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dl).negate(),this.translate(dl.x,dl.y,dl.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Fa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&Tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Uc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){cn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];pa.setFromBufferAttribute(c),this.morphTargetsRelative?(yi.addVectors(this.boundingBox.min,pa.min),this.boundingBox.expandByPoint(yi),yi.addVectors(this.boundingBox.max,pa.max),this.boundingBox.expandByPoint(yi)):(this.boundingBox.expandByPoint(pa.min),this.boundingBox.expandByPoint(pa.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&cn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Em);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){cn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ee,1/0);return}if(e){const s=this.boundingSphere.center;if(pa.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];vc.setFromBufferAttribute(h),this.morphTargetsRelative?(yi.addVectors(pa.min,vc.min),pa.expandByPoint(yi),yi.addVectors(pa.max,vc.max),pa.expandByPoint(yi)):(pa.expandByPoint(vc.min),pa.expandByPoint(vc.max))}pa.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)yi.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(yi));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,_=h.count;p<_;p++)yi.fromBufferAttribute(h,p),m&&(dl.fromBufferAttribute(e,p),yi.add(dl)),l=Math.max(l,s.distanceToSquared(yi))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&cn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){cn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ds(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let A=0;A<s.count;A++)h[A]=new ee,m[A]=new ee;const p=new ee,_=new ee,b=new ee,x=new Wt,S=new Wt,T=new Wt,O=new ee,E=new ee;function y(A,F,W){p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,F),b.fromBufferAttribute(s,W),x.fromBufferAttribute(c,A),S.fromBufferAttribute(c,F),T.fromBufferAttribute(c,W),_.sub(p),b.sub(p),S.sub(x),T.sub(x);const H=1/(S.x*T.y-T.x*S.y);isFinite(H)&&(O.copy(_).multiplyScalar(T.y).addScaledVector(b,-S.y).multiplyScalar(H),E.copy(b).multiplyScalar(S.x).addScaledVector(_,-T.x).multiplyScalar(H),h[A].add(O),h[F].add(O),h[W].add(O),m[A].add(E),m[F].add(E),m[W].add(E))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let A=0,F=C.length;A<F;++A){const W=C[A],H=W.start,q=W.count;for(let fe=H,he=H+q;fe<he;fe+=3)y(e.getX(fe+0),e.getX(fe+1),e.getX(fe+2))}const I=new ee,U=new ee,j=new ee,L=new ee;function G(A){j.fromBufferAttribute(l,A),L.copy(j);const F=h[A];I.copy(F),I.sub(j.multiplyScalar(j.dot(F))).normalize(),U.crossVectors(L,F);const H=U.dot(m[A])<0?-1:1;f.setXYZW(A,I.x,I.y,I.z,H)}for(let A=0,F=C.length;A<F;++A){const W=C[A],H=W.start,q=W.count;for(let fe=H,he=H+q;fe<he;fe+=3)G(e.getX(fe+0)),G(e.getX(fe+1)),G(e.getX(fe+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ds(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const l=new ee,c=new ee,f=new ee,h=new ee,m=new ee,p=new ee,_=new ee,b=new ee;if(e)for(let x=0,S=e.count;x<S;x+=3){const T=e.getX(x+0),O=e.getX(x+1),E=e.getX(x+2);l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,O),f.fromBufferAttribute(i,E),_.subVectors(f,c),b.subVectors(l,c),_.cross(b),h.fromBufferAttribute(s,T),m.fromBufferAttribute(s,O),p.fromBufferAttribute(s,E),h.add(_),m.add(_),p.add(_),s.setXYZ(T,h.x,h.y,h.z),s.setXYZ(O,m.x,m.y,m.z),s.setXYZ(E,p.x,p.y,p.z)}else for(let x=0,S=i.count;x<S;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),f.fromBufferAttribute(i,x+2),_.subVectors(f,c),b.subVectors(l,c),_.cross(b),s.setXYZ(x+0,_.x,_.y,_.z),s.setXYZ(x+1,_.x,_.y,_.z),s.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)yi.fromBufferAttribute(e,i),yi.normalize(),e.setXYZ(i,yi.x,yi.y,yi.z)}toNonIndexed(){function e(h,m){const p=h.array,_=h.itemSize,b=h.normalized,x=new p.constructor(m.length*_);let S=0,T=0;for(let O=0,E=m.length;O<E;O++){h.isInterleavedBufferAttribute?S=m[O]*h.data.stride+h.offset:S=m[O]*_;for(let y=0;y<_;y++)x[T++]=p[S++]}return new ds(x,_,b)}if(this.index===null)return Tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new gs,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let _=0,b=p.length;_<b;_++){const x=p[_],S=e(x,s);m.push(S)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let b=0,x=p.length;b<x;b++){const S=p[b];_.push(S.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(i))}const c=e.morphAttributes;for(const p in c){const _=[],b=c[p];for(let x=0,S=b.length;x<S;x++)_.push(b[x].clone(i));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,_=f.length;p<_;p++){const b=f[p];this.addGroup(b.start,b.count,b.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let iE=0;class Uf extends Gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iE++}),this.uuid=Lc(),this.name="",this.type="Material",this.blending=yl,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_p,this.blendDst=vp,this.blendEquation=ho,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Cn(0,0,0),this.blendAlpha=0,this.depthFunc=El,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=s_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nl,this.stencilZFail=nl,this.stencilZPass=nl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){Tt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){Tt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==yl&&(s.blending=this.blending),this.side!==Br&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==_p&&(s.blendSrc=this.blendSrc),this.blendDst!==vp&&(s.blendDst=this.blendDst),this.blendEquation!==ho&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==El&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==s_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nl&&(s.stencilFail=this.stencilFail),this.stencilZFail!==nl&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==nl&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ks=new ee,np=new ee,ef=new ee,Nr=new ee,ip=new ee,tf=new ee,ap=new ee;class Jv{constructor(e=new ee,i=new ee(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ks)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ks.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ks.copy(this.origin).addScaledVector(this.direction,i),ks.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){np.copy(e).add(i).multiplyScalar(.5),ef.copy(i).sub(e).normalize(),Nr.copy(this.origin).sub(np);const c=e.distanceTo(i)*.5,f=-this.direction.dot(ef),h=Nr.dot(this.direction),m=-Nr.dot(ef),p=Nr.lengthSq(),_=Math.abs(1-f*f);let b,x,S,T;if(_>0)if(b=f*m-h,x=f*h-m,T=c*_,b>=0)if(x>=-T)if(x<=T){const O=1/_;b*=O,x*=O,S=b*(b+f*x+2*h)+x*(f*b+x+2*m)+p}else x=c,b=Math.max(0,-(f*x+h)),S=-b*b+x*(x+2*m)+p;else x=-c,b=Math.max(0,-(f*x+h)),S=-b*b+x*(x+2*m)+p;else x<=-T?(b=Math.max(0,-(-f*c+h)),x=b>0?-c:Math.min(Math.max(-c,-m),c),S=-b*b+x*(x+2*m)+p):x<=T?(b=0,x=Math.min(Math.max(-c,-m),c),S=x*(x+2*m)+p):(b=Math.max(0,-(f*c+h)),x=b>0?c:Math.min(Math.max(-c,-m),c),S=-b*b+x*(x+2*m)+p);else x=f>0?-c:c,b=Math.max(0,-(f*x+h)),S=-b*b+x*(x+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,b),l&&l.copy(np).addScaledVector(ef,x),S}intersectSphere(e,i){ks.subVectors(e.center,this.origin);const s=ks.dot(this.direction),l=ks.dot(ks)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,_=1/this.direction.y,b=1/this.direction.z,x=this.origin;return p>=0?(s=(e.min.x-x.x)*p,l=(e.max.x-x.x)*p):(s=(e.max.x-x.x)*p,l=(e.min.x-x.x)*p),_>=0?(c=(e.min.y-x.y)*_,f=(e.max.y-x.y)*_):(c=(e.max.y-x.y)*_,f=(e.min.y-x.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),b>=0?(h=(e.min.z-x.z)*b,m=(e.max.z-x.z)*b):(h=(e.max.z-x.z)*b,m=(e.min.z-x.z)*b),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ks)!==null}intersectTriangle(e,i,s,l,c){ip.subVectors(i,e),tf.subVectors(s,e),ap.crossVectors(ip,tf);let f=this.direction.dot(ap),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Nr.subVectors(this.origin,e);const m=h*this.direction.dot(tf.crossVectors(Nr,tf));if(m<0)return null;const p=h*this.direction.dot(ip.cross(Nr));if(p<0||m+p>f)return null;const _=-h*Nr.dot(ap);return _<0?null:this.at(_/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mm extends Uf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Cn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vo,this.combine=Ov,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const y_=new mi,co=new Jv,nf=new Em,S_=new ee,af=new ee,sf=new ee,rf=new ee,sp=new ee,of=new ee,E_=new ee,lf=new ee;class ps extends xa{constructor(e=new gs,i=new Mm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){of.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=h[m],b=c[m];_!==0&&(sp.fromBufferAttribute(b,e),f?of.addScaledVector(sp,_):of.addScaledVector(sp.sub(i),_))}i.add(of)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),nf.copy(s.boundingSphere),nf.applyMatrix4(c),co.copy(e.ray).recast(e.near),!(nf.containsPoint(co.origin)===!1&&(co.intersectSphere(nf,S_)===null||co.origin.distanceToSquared(S_)>(e.far-e.near)**2))&&(y_.copy(c).invert(),co.copy(e.ray).applyMatrix4(y_),!(s.boundingBox!==null&&co.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,co)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,b=c.attributes.normal,x=c.groups,S=c.drawRange;if(h!==null)if(Array.isArray(f))for(let T=0,O=x.length;T<O;T++){const E=x[T],y=f[E.materialIndex],C=Math.max(E.start,S.start),I=Math.min(h.count,Math.min(E.start+E.count,S.start+S.count));for(let U=C,j=I;U<j;U+=3){const L=h.getX(U),G=h.getX(U+1),A=h.getX(U+2);l=cf(this,y,e,s,p,_,b,L,G,A),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const T=Math.max(0,S.start),O=Math.min(h.count,S.start+S.count);for(let E=T,y=O;E<y;E+=3){const C=h.getX(E),I=h.getX(E+1),U=h.getX(E+2);l=cf(this,f,e,s,p,_,b,C,I,U),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,O=x.length;T<O;T++){const E=x[T],y=f[E.materialIndex],C=Math.max(E.start,S.start),I=Math.min(m.count,Math.min(E.start+E.count,S.start+S.count));for(let U=C,j=I;U<j;U+=3){const L=U,G=U+1,A=U+2;l=cf(this,y,e,s,p,_,b,L,G,A),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const T=Math.max(0,S.start),O=Math.min(m.count,S.start+S.count);for(let E=T,y=O;E<y;E+=3){const C=E,I=E+1,U=E+2;l=cf(this,f,e,s,p,_,b,C,I,U),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}}}function aE(r,e,i,s,l,c,f,h){let m;if(e.side===ia?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===Br,h),m===null)return null;lf.copy(h),lf.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(lf);return p<i.near||p>i.far?null:{distance:p,point:lf.clone(),object:r}}function cf(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,af),r.getVertexPosition(m,sf),r.getVertexPosition(p,rf);const _=aE(r,e,i,s,af,sf,rf,E_);if(_){const b=new ee;qa.getBarycoord(E_,af,sf,rf,b),l&&(_.uv=qa.getInterpolatedAttribute(l,h,m,p,b,new Wt)),c&&(_.uv1=qa.getInterpolatedAttribute(c,h,m,p,b,new Wt)),f&&(_.normal=qa.getInterpolatedAttribute(f,h,m,p,b,new ee),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const x={a:h,b:m,c:p,normal:new ee,materialIndex:0};qa.getNormal(af,sf,rf,x.normal),_.face=x,_.barycoord=b}return _}class sE extends Fi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=Ci,_=Ci,b,x){super(null,f,h,m,p,_,l,c,b,x),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rp=new ee,rE=new ee,oE=new Pt;class Lr{constructor(e=new ee(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=rp.subVectors(s,i).cross(rE.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(rp),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||oE.getNormalMatrix(e),l=this.coplanarPoint(rp).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const uo=new Em,lE=new Wt(.5,.5),uf=new ee;class eb{constructor(e=new Lr,i=new Lr,s=new Lr,l=new Lr,c=new Lr,f=new Lr){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=cs,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],_=c[4],b=c[5],x=c[6],S=c[7],T=c[8],O=c[9],E=c[10],y=c[11],C=c[12],I=c[13],U=c[14],j=c[15];if(l[0].setComponents(p-f,S-_,y-T,j-C).normalize(),l[1].setComponents(p+f,S+_,y+T,j+C).normalize(),l[2].setComponents(p+h,S+b,y+O,j+I).normalize(),l[3].setComponents(p-h,S-b,y-O,j-I).normalize(),s)l[4].setComponents(m,x,E,U).normalize(),l[5].setComponents(p-m,S-x,y-E,j-U).normalize();else if(l[4].setComponents(p-m,S-x,y-E,j-U).normalize(),i===cs)l[5].setComponents(p+m,S+x,y+E,j+U).normalize();else if(i===Of)l[5].setComponents(m,x,E,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),uo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),uo.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(uo)}intersectsSprite(e){uo.center.set(0,0,0);const i=lE.distanceTo(e.center);return uo.radius=.7071067811865476+i,uo.applyMatrix4(e.matrixWorld),this.intersectsSphere(uo)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(uf.x=l.normal.x>0?e.max.x:e.min.x,uf.y=l.normal.y>0?e.max.y:e.min.y,uf.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(uf)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class tb extends Fi{constructor(e=[],i=xo,s,l,c,f,h,m,p,_){super(e,i,s,l,c,f,h,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tl extends Fi{constructor(e,i,s=hs,l,c,f,h=Ci,m=Ci,p,_=qs,b=1){if(_!==qs&&_!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:i,depth:b};super(x,l,c,f,h,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Sm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class cE extends Tl{constructor(e,i=hs,s=xo,l,c,f=Ci,h=Ci,m,p=qs){const _={width:e,height:e,depth:1},b=[_,_,_,_,_,_];super(e,e,i,s,l,c,f,h,m,p),this.image=b,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class nb extends Fi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ic extends gs{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],_=[],b=[];let x=0,S=0;T("z","y","x",-1,-1,s,i,e,f,c,0),T("z","y","x",1,-1,s,i,-e,f,c,1),T("x","z","y",1,1,e,s,i,l,f,2),T("x","z","y",1,-1,e,s,-i,l,f,3),T("x","y","z",1,-1,e,i,s,l,c,4),T("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Fa(p,3)),this.setAttribute("normal",new Fa(_,3)),this.setAttribute("uv",new Fa(b,2));function T(O,E,y,C,I,U,j,L,G,A,F){const W=U/G,H=j/A,q=U/2,fe=j/2,he=L/2,$=G+1,D=A+1;let z=0,ce=0;const xe=new ee;for(let Ae=0;Ae<D;Ae++){const P=Ae*H-fe;for(let Q=0;Q<$;Q++){const Ee=Q*W-q;xe[O]=Ee*C,xe[E]=P*I,xe[y]=he,p.push(xe.x,xe.y,xe.z),xe[O]=0,xe[E]=0,xe[y]=L>0?1:-1,_.push(xe.x,xe.y,xe.z),b.push(Q/G),b.push(1-Ae/A),z+=1}}for(let Ae=0;Ae<A;Ae++)for(let P=0;P<G;P++){const Q=x+P+$*Ae,Ee=x+P+$*(Ae+1),Ne=x+(P+1)+$*(Ae+1),Oe=x+(P+1)+$*Ae;m.push(Q,Ee,Oe),m.push(Ee,Ne,Oe),ce+=6}h.addGroup(S,ce,F),S+=ce,x+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ic(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class If extends gs{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,_=m+1,b=e/h,x=i/m,S=[],T=[],O=[],E=[];for(let y=0;y<_;y++){const C=y*x-f;for(let I=0;I<p;I++){const U=I*b-c;T.push(U,-C,0),O.push(0,0,1),E.push(I/h),E.push(1-y/m)}}for(let y=0;y<m;y++)for(let C=0;C<h;C++){const I=C+p*y,U=C+p*(y+1),j=C+1+p*(y+1),L=C+1+p*y;S.push(I,U,L),S.push(U,j,L)}this.setIndex(S),this.setAttribute("position",new Fa(T,3)),this.setAttribute("normal",new Fa(O,3)),this.setAttribute("uv",new Fa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new If(e.width,e.height,e.widthSegments,e.heightSegments)}}class Tm extends gs{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const _=[],b=new ee,x=new ee,S=[],T=[],O=[],E=[];for(let y=0;y<=s;y++){const C=[],I=y/s;let U=0;y===0&&f===0?U=.5/i:y===s&&m===Math.PI&&(U=-.5/i);for(let j=0;j<=i;j++){const L=j/i;b.x=-e*Math.cos(l+L*c)*Math.sin(f+I*h),b.y=e*Math.cos(f+I*h),b.z=e*Math.sin(l+L*c)*Math.sin(f+I*h),T.push(b.x,b.y,b.z),x.copy(b).normalize(),O.push(x.x,x.y,x.z),E.push(L+U,1-I),C.push(p++)}_.push(C)}for(let y=0;y<s;y++)for(let C=0;C<i;C++){const I=_[y][C+1],U=_[y][C],j=_[y+1][C],L=_[y+1][C+1];(y!==0||f>0)&&S.push(I,U,L),(y!==s-1||m<Math.PI)&&S.push(U,j,L)}this.setIndex(S),this.setAttribute("position",new Fa(T,3)),this.setAttribute("normal",new Fa(O,3)),this.setAttribute("uv",new Fa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Al(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(M_(l))l.isRenderTargetTexture?(Tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(M_(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function ji(r){const e={};for(let i=0;i<r.length;i++){const s=Al(r[i]);for(const l in s)e[l]=s[l]}return e}function M_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function uE(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function ib(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:on.workingColorSpace}const fE={clone:Al,merge:ji};var dE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ms extends Uf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dE,this.fragmentShader=hE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Al(e.uniforms),this.uniformsGroups=uE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class pE extends ms{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mE extends Uf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=AS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gE extends Uf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const op={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(T_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!T_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function T_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class xE{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(_){h++,c===!1&&l.onStart!==void 0&&l.onStart(_,f,h),c=!0},this.itemEnd=function(_){f++,l.onProgress!==void 0&&l.onProgress(_,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(_){l.onError!==void 0&&l.onError(_)},this.resolveURL=function(_){return m?m(_):_},this.setURLModifier=function(_){return m=_,this},this.addHandler=function(_,b){return p.push(_,b),this},this.removeHandler=function(_){const b=p.indexOf(_);return b!==-1&&p.splice(b,2),this},this.getHandler=function(_){for(let b=0,x=p.length;b<x;b+=2){const S=p[b],T=p[b+1];if(S.global&&(S.lastIndex=0),S.test(_))return T}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const _E=new xE;class Am{constructor(e){this.manager=e!==void 0?e:_E,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Am.DEFAULT_MATERIAL_NAME="__DEFAULT";const hl=new WeakMap;class vE extends Am{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=op.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let b=hl.get(f);b===void 0&&(b=[],hl.set(f,b)),b.push({onLoad:i,onError:l})}return f}const h=Nc("img");function m(){_(),i&&i(this);const b=hl.get(this)||[];for(let x=0;x<b.length;x++){const S=b[x];S.onLoad&&S.onLoad(this)}hl.delete(this),c.manager.itemEnd(e)}function p(b){_(),l&&l(b),op.remove(`image:${e}`);const x=hl.get(this)||[];for(let S=0;S<x.length;S++){const T=x[S];T.onError&&T.onError(b)}hl.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function _(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),op.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class bE extends Am{constructor(e){super(e)}load(e,i,s,l){const c=new Fi,f=new vE(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const ff=new ee,df=new zr,ss=new ee;let ab=class extends xa{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mi,this.projectionMatrix=new mi,this.projectionMatrixInverse=new mi,this.coordinateSystem=cs,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ff,df,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ff,df,ss.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(ff,df,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ff,df,ss.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};const Or=new ee,A_=new Wt,w_=new Wt;class Ia extends ab{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=rm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ef*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rm*2*Math.atan(Math.tan(Ef*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,i){return this.getViewBounds(e,A_,w_),i.subVectors(w_,A_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Ef*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class sb extends ab{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=_*this.view.offsetY,m=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const pl=-90,ml=1;class yE extends xa{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ia(pl,ml,e,i);l.layers=this.layers,this.add(l);const c=new Ia(pl,ml,e,i);c.layers=this.layers,this.add(c);const f=new Ia(pl,ml,e,i);f.layers=this.layers,this.add(f);const h=new Ia(pl,ml,e,i);h.layers=this.layers,this.add(h);const m=new Ia(pl,ml,e,i);m.layers=this.layers,this.add(m);const p=new Ia(pl,ml,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===cs)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Of)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,_]=this.children,b=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const O=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let E=!1;e.isWebGLRenderer===!0?E=e.state.buffers.depth.getReversed():E=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=O,e.setRenderTarget(s,5,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(b,x,S),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class SE extends Ia{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class R_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=en(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(en(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Um=class Um{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Um.prototype.isMatrix2=!0;let C_=Um;class EE extends Gr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Tt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function N_(r,e,i,s){const l=ME(s);switch(i){case jv:return r*e;case Yv:return r*e/l.components*l.byteLength;case xm:return r*e/l.components*l.byteLength;case _o:return r*e*2/l.components*l.byteLength;case _m:return r*e*2/l.components*l.byteLength;case Xv:return r*e*3/l.components*l.byteLength;case $a:return r*e*4/l.components*l.byteLength;case vm:return r*e*4/l.components*l.byteLength;case vf:case bf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case yf:case Sf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Np:case Dp:return Math.max(r,16)*Math.max(e,8)/4;case Cp:case Op:return Math.max(r,8)*Math.max(e,8)/2;case Lp:case Up:case Pp:case Fp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ip:case wf:case Bp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case zp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Gp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Hp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case kp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Vp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case jp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Xp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Yp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Wp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case qp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $p:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Kp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Zp:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Qp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Jp:case em:case tm:return Math.ceil(r/4)*Math.ceil(e/4)*16;case nm:case im:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Rf:case am:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function ME(r){switch(r){case Pa:case Gv:return{byteLength:1,components:1};case Rc:case Hv:case Ws:return{byteLength:2,components:1};case mm:case gm:return{byteLength:2,components:4};case hs:case pm:case ls:return{byteLength:4,components:1};case kv:case Vv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hm}}));typeof window<"u"&&(window.__THREE__?Tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hm);function rb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function TE(r){const e=new WeakMap;function i(h,m){const p=h.array,_=h.usage,b=p.byteLength,x=r.createBuffer();r.bindBuffer(m,x),r.bufferData(m,p,_),h.onUploadCallback();let S;if(p instanceof Float32Array)S=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=r.SHORT;else if(p instanceof Uint32Array)S=r.UNSIGNED_INT;else if(p instanceof Int32Array)S=r.INT;else if(p instanceof Int8Array)S=r.BYTE;else if(p instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:b}}function s(h,m,p){const _=m.array,b=m.updateRanges;if(r.bindBuffer(p,h),b.length===0)r.bufferSubData(p,0,_);else{b.sort((S,T)=>S.start-T.start);let x=0;for(let S=1;S<b.length;S++){const T=b[x],O=b[S];O.start<=T.start+T.count+1?T.count=Math.max(T.count,O.start+O.count-T.start):(++x,b[x]=O)}b.length=x+1;for(let S=0,T=b.length;S<T;S++){const O=b[S];r.bufferSubData(p,O.start*_.BYTES_PER_ELEMENT,_,O.start,O.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var AE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wE=`#ifdef USE_ALPHAHASH
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
#endif`,RE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,OE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,DE=`#ifdef USE_AOMAP
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
#endif`,LE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,UE=`#ifdef USE_BATCHING
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
#endif`,IE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,PE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,BE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zE=`#ifdef USE_IRIDESCENCE
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
#endif`,GE=`#ifdef USE_BUMPMAP
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
#endif`,HE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,VE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,XE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,YE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,WE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$E=`#define PI 3.141592653589793
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
} // validated`,KE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ZE=`vec3 transformedNormal = objectNormal;
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
#endif`,QE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nM="gl_FragColor = linearToOutputTexel( gl_FragColor );",iM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,aM=`#ifdef USE_ENVMAP
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
#endif`,sM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rM=`#ifdef USE_ENVMAP
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
#endif`,oM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lM=`#ifdef USE_ENVMAP
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
#endif`,cM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hM=`#ifdef USE_GRADIENTMAP
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
}`,pM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_M=`#ifdef USE_ENVMAP
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
#endif`,vM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,SM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,EM=`PhysicalMaterial material;
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
#endif`,MM=`uniform sampler2D dfgLUT;
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
}`,TM=`
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
#endif`,AM=`#if defined( RE_IndirectDiffuse )
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
#endif`,wM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,RM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,CM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,NM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,LM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,UM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,IM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,PM=`#if defined( USE_POINTS_UV )
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
#endif`,FM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,BM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,GM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,HM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kM=`#ifdef USE_MORPHTARGETS
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
#endif`,VM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,XM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,YM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$M=`#ifdef USE_NORMALMAP
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
#endif`,KM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,QM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,aT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fT=`float getShadowMask() {
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
}`,dT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hT=`#ifdef USE_SKINNING
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
#endif`,pT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mT=`#ifdef USE_SKINNING
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
#endif`,gT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_T=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bT=`#ifdef USE_TRANSMISSION
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
#endif`,yT=`#ifdef USE_TRANSMISSION
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
#endif`,ST=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ET=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,MT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const AT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wT=`uniform sampler2D t2D;
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
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,NT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DT=`#include <common>
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
}`,LT=`#if DEPTH_PACKING == 3200
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
}`,UT=`#define DISTANCE
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
}`,IT=`#define DISTANCE
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
}`,PT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`uniform float scale;
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
}`,zT=`uniform vec3 diffuse;
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
}`,GT=`#include <common>
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
}`,HT=`uniform vec3 diffuse;
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
}`,kT=`#define LAMBERT
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
}`,VT=`#define LAMBERT
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
}`,jT=`#define MATCAP
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
}`,XT=`#define MATCAP
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
}`,YT=`#define NORMAL
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
}`,WT=`#define NORMAL
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
}`,qT=`#define PHONG
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
}`,$T=`#define PHONG
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
}`,KT=`#define STANDARD
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
}`,ZT=`#define STANDARD
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
}`,QT=`#define TOON
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
}`,JT=`#define TOON
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
}`,e1=`uniform float size;
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
}`,t1=`uniform vec3 diffuse;
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
}`,n1=`#include <common>
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
}`,i1=`uniform vec3 color;
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
}`,a1=`uniform float rotation;
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
}`,s1=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:AE,alphahash_pars_fragment:wE,alphamap_fragment:RE,alphamap_pars_fragment:CE,alphatest_fragment:NE,alphatest_pars_fragment:OE,aomap_fragment:DE,aomap_pars_fragment:LE,batching_pars_vertex:UE,batching_vertex:IE,begin_vertex:PE,beginnormal_vertex:FE,bsdfs:BE,iridescence_fragment:zE,bumpmap_pars_fragment:GE,clipping_planes_fragment:HE,clipping_planes_pars_fragment:kE,clipping_planes_pars_vertex:VE,clipping_planes_vertex:jE,color_fragment:XE,color_pars_fragment:YE,color_pars_vertex:WE,color_vertex:qE,common:$E,cube_uv_reflection_fragment:KE,defaultnormal_vertex:ZE,displacementmap_pars_vertex:QE,displacementmap_vertex:JE,emissivemap_fragment:eM,emissivemap_pars_fragment:tM,colorspace_fragment:nM,colorspace_pars_fragment:iM,envmap_fragment:aM,envmap_common_pars_fragment:sM,envmap_pars_fragment:rM,envmap_pars_vertex:oM,envmap_physical_pars_fragment:_M,envmap_vertex:lM,fog_vertex:cM,fog_pars_vertex:uM,fog_fragment:fM,fog_pars_fragment:dM,gradientmap_pars_fragment:hM,lightmap_pars_fragment:pM,lights_lambert_fragment:mM,lights_lambert_pars_fragment:gM,lights_pars_begin:xM,lights_toon_fragment:vM,lights_toon_pars_fragment:bM,lights_phong_fragment:yM,lights_phong_pars_fragment:SM,lights_physical_fragment:EM,lights_physical_pars_fragment:MM,lights_fragment_begin:TM,lights_fragment_maps:AM,lights_fragment_end:wM,lightprobes_pars_fragment:RM,logdepthbuf_fragment:CM,logdepthbuf_pars_fragment:NM,logdepthbuf_pars_vertex:OM,logdepthbuf_vertex:DM,map_fragment:LM,map_pars_fragment:UM,map_particle_fragment:IM,map_particle_pars_fragment:PM,metalnessmap_fragment:FM,metalnessmap_pars_fragment:BM,morphinstance_vertex:zM,morphcolor_vertex:GM,morphnormal_vertex:HM,morphtarget_pars_vertex:kM,morphtarget_vertex:VM,normal_fragment_begin:jM,normal_fragment_maps:XM,normal_pars_fragment:YM,normal_pars_vertex:WM,normal_vertex:qM,normalmap_pars_fragment:$M,clearcoat_normal_fragment_begin:KM,clearcoat_normal_fragment_maps:ZM,clearcoat_pars_fragment:QM,iridescence_pars_fragment:JM,opaque_fragment:eT,packing:tT,premultiplied_alpha_fragment:nT,project_vertex:iT,dithering_fragment:aT,dithering_pars_fragment:sT,roughnessmap_fragment:rT,roughnessmap_pars_fragment:oT,shadowmap_pars_fragment:lT,shadowmap_pars_vertex:cT,shadowmap_vertex:uT,shadowmask_pars_fragment:fT,skinbase_vertex:dT,skinning_pars_vertex:hT,skinning_vertex:pT,skinnormal_vertex:mT,specularmap_fragment:gT,specularmap_pars_fragment:xT,tonemapping_fragment:_T,tonemapping_pars_fragment:vT,transmission_fragment:bT,transmission_pars_fragment:yT,uv_pars_fragment:ST,uv_pars_vertex:ET,uv_vertex:MT,worldpos_vertex:TT,background_vert:AT,background_frag:wT,backgroundCube_vert:RT,backgroundCube_frag:CT,cube_vert:NT,cube_frag:OT,depth_vert:DT,depth_frag:LT,distance_vert:UT,distance_frag:IT,equirect_vert:PT,equirect_frag:FT,linedashed_vert:BT,linedashed_frag:zT,meshbasic_vert:GT,meshbasic_frag:HT,meshlambert_vert:kT,meshlambert_frag:VT,meshmatcap_vert:jT,meshmatcap_frag:XT,meshnormal_vert:YT,meshnormal_frag:WT,meshphong_vert:qT,meshphong_frag:$T,meshphysical_vert:KT,meshphysical_frag:ZT,meshtoon_vert:QT,meshtoon_frag:JT,points_vert:e1,points_frag:t1,shadow_vert:n1,shadow_frag:i1,sprite_vert:a1,sprite_frag:s1},Ye={common:{diffuse:{value:new Cn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Cn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ee},probesMax:{value:new ee},probesResolution:{value:new ee}},points:{diffuse:{value:new Cn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new Cn(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},os={basic:{uniforms:ji([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:ji([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Cn(0)},envMapIntensity:{value:1}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:ji([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Cn(0)},specular:{value:new Cn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:ji([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new Cn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:ji([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new Cn(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:ji([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:ji([Ye.points,Ye.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:ji([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:ji([Ye.common,Ye.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:ji([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:ji([Ye.sprite,Ye.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distance:{uniforms:ji([Ye.common,Ye.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distance_vert,fragmentShader:Xt.distance_frag},shadow:{uniforms:ji([Ye.lights,Ye.fog,{color:{value:new Cn(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};os.physical={uniforms:ji([os.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new Cn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new Cn(0)},specularColor:{value:new Cn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const hf={r:0,b:0,g:0},r1=new mi,ob=new Pt;ob.set(-1,0,0,0,1,0,0,0,1);function o1(r,e,i,s,l,c){const f=new Cn(0);let h=l===!0?0:1,m,p,_=null,b=0,x=null;function S(C){let I=C.isScene===!0?C.background:null;if(I&&I.isTexture){const U=C.backgroundBlurriness>0;I=e.get(I,U)}return I}function T(C){let I=!1;const U=S(C);U===null?E(f,h):U&&U.isColor&&(E(U,1),I=!0);const j=r.xr.getEnvironmentBlendMode();j==="additive"?i.buffers.color.setClear(0,0,0,1,c):j==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function O(C,I){const U=S(I);U&&(U.isCubeTexture||U.mapping===Lf)?(p===void 0&&(p=new ps(new Ic(1,1,1),new ms({name:"BackgroundCubeMaterial",uniforms:Al(os.backgroundCube.uniforms),vertexShader:os.backgroundCube.vertexShader,fragmentShader:os.backgroundCube.fragmentShader,side:ia,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(j,L,G){this.matrixWorld.copyPosition(G.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=U,p.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(r1.makeRotationFromEuler(I.backgroundRotation)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(ob),p.material.toneMapped=on.getTransfer(U.colorSpace)!==En,(_!==U||b!==U.version||x!==r.toneMapping)&&(p.material.needsUpdate=!0,_=U,b=U.version,x=r.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null)):U&&U.isTexture&&(m===void 0&&(m=new ps(new If(2,2),new ms({name:"BackgroundMaterial",uniforms:Al(os.background.uniforms),vertexShader:os.background.vertexShader,fragmentShader:os.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=U,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=on.getTransfer(U.colorSpace)!==En,U.matrixAutoUpdate===!0&&U.updateMatrix(),m.material.uniforms.uvTransform.value.copy(U.matrix),(_!==U||b!==U.version||x!==r.toneMapping)&&(m.material.needsUpdate=!0,_=U,b=U.version,x=r.toneMapping),m.layers.enableAll(),C.unshift(m,m.geometry,m.material,0,0,null))}function E(C,I){C.getRGB(hf,ib(r)),i.buffers.color.setClear(hf.r,hf.g,hf.b,I,c)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(C,I=1){f.set(C),h=I,E(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(C){h=C,E(f,h)},render:T,addToRenderList:O,dispose:y}}function l1(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,f=!1;function h(H,q,fe,he,$){let D=!1;const z=b(H,he,fe,q);c!==z&&(c=z,p(c.object)),D=S(H,he,fe,$),D&&T(H,he,fe,$),$!==null&&e.update($,r.ELEMENT_ARRAY_BUFFER),(D||f)&&(f=!1,U(H,q,fe,he),$!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function m(){return r.createVertexArray()}function p(H){return r.bindVertexArray(H)}function _(H){return r.deleteVertexArray(H)}function b(H,q,fe,he){const $=he.wireframe===!0;let D=s[q.id];D===void 0&&(D={},s[q.id]=D);const z=H.isInstancedMesh===!0?H.id:0;let ce=D[z];ce===void 0&&(ce={},D[z]=ce);let xe=ce[fe.id];xe===void 0&&(xe={},ce[fe.id]=xe);let Ae=xe[$];return Ae===void 0&&(Ae=x(m()),xe[$]=Ae),Ae}function x(H){const q=[],fe=[],he=[];for(let $=0;$<i;$++)q[$]=0,fe[$]=0,he[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:fe,attributeDivisors:he,object:H,attributes:{},index:null}}function S(H,q,fe,he){const $=c.attributes,D=q.attributes;let z=0;const ce=fe.getAttributes();for(const xe in ce)if(ce[xe].location>=0){const P=$[xe];let Q=D[xe];if(Q===void 0&&(xe==="instanceMatrix"&&H.instanceMatrix&&(Q=H.instanceMatrix),xe==="instanceColor"&&H.instanceColor&&(Q=H.instanceColor)),P===void 0||P.attribute!==Q||Q&&P.data!==Q.data)return!0;z++}return c.attributesNum!==z||c.index!==he}function T(H,q,fe,he){const $={},D=q.attributes;let z=0;const ce=fe.getAttributes();for(const xe in ce)if(ce[xe].location>=0){let P=D[xe];P===void 0&&(xe==="instanceMatrix"&&H.instanceMatrix&&(P=H.instanceMatrix),xe==="instanceColor"&&H.instanceColor&&(P=H.instanceColor));const Q={};Q.attribute=P,P&&P.data&&(Q.data=P.data),$[xe]=Q,z++}c.attributes=$,c.attributesNum=z,c.index=he}function O(){const H=c.newAttributes;for(let q=0,fe=H.length;q<fe;q++)H[q]=0}function E(H){y(H,0)}function y(H,q){const fe=c.newAttributes,he=c.enabledAttributes,$=c.attributeDivisors;fe[H]=1,he[H]===0&&(r.enableVertexAttribArray(H),he[H]=1),$[H]!==q&&(r.vertexAttribDivisor(H,q),$[H]=q)}function C(){const H=c.newAttributes,q=c.enabledAttributes;for(let fe=0,he=q.length;fe<he;fe++)q[fe]!==H[fe]&&(r.disableVertexAttribArray(fe),q[fe]=0)}function I(H,q,fe,he,$,D,z){z===!0?r.vertexAttribIPointer(H,q,fe,$,D):r.vertexAttribPointer(H,q,fe,he,$,D)}function U(H,q,fe,he){O();const $=he.attributes,D=fe.getAttributes(),z=q.defaultAttributeValues;for(const ce in D){const xe=D[ce];if(xe.location>=0){let Ae=$[ce];if(Ae===void 0&&(ce==="instanceMatrix"&&H.instanceMatrix&&(Ae=H.instanceMatrix),ce==="instanceColor"&&H.instanceColor&&(Ae=H.instanceColor)),Ae!==void 0){const P=Ae.normalized,Q=Ae.itemSize,Ee=e.get(Ae);if(Ee===void 0)continue;const Ne=Ee.buffer,Oe=Ee.type,se=Ee.bytesPerElement,be=Oe===r.INT||Oe===r.UNSIGNED_INT||Ae.gpuType===pm;if(Ae.isInterleavedBufferAttribute){const Re=Ae.data,ke=Re.stride,gt=Ae.offset;if(Re.isInstancedInterleavedBuffer){for(let it=0;it<xe.locationSize;it++)y(xe.location+it,Re.meshPerAttribute);H.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let it=0;it<xe.locationSize;it++)E(xe.location+it);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let it=0;it<xe.locationSize;it++)I(xe.location+it,Q/xe.locationSize,Oe,P,ke*se,(gt+Q/xe.locationSize*it)*se,be)}else{if(Ae.isInstancedBufferAttribute){for(let Re=0;Re<xe.locationSize;Re++)y(xe.location+Re,Ae.meshPerAttribute);H.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let Re=0;Re<xe.locationSize;Re++)E(xe.location+Re);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let Re=0;Re<xe.locationSize;Re++)I(xe.location+Re,Q/xe.locationSize,Oe,P,Q*se,Q/xe.locationSize*Re*se,be)}}else if(z!==void 0){const P=z[ce];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(xe.location,P);break;case 3:r.vertexAttrib3fv(xe.location,P);break;case 4:r.vertexAttrib4fv(xe.location,P);break;default:r.vertexAttrib1fv(xe.location,P)}}}}C()}function j(){F();for(const H in s){const q=s[H];for(const fe in q){const he=q[fe];for(const $ in he){const D=he[$];for(const z in D)_(D[z].object),delete D[z];delete he[$]}}delete s[H]}}function L(H){if(s[H.id]===void 0)return;const q=s[H.id];for(const fe in q){const he=q[fe];for(const $ in he){const D=he[$];for(const z in D)_(D[z].object),delete D[z];delete he[$]}}delete s[H.id]}function G(H){for(const q in s){const fe=s[q];for(const he in fe){const $=fe[he];if($[H.id]===void 0)continue;const D=$[H.id];for(const z in D)_(D[z].object),delete D[z];delete $[H.id]}}}function A(H){for(const q in s){const fe=s[q],he=H.isInstancedMesh===!0?H.id:0,$=fe[he];if($!==void 0){for(const D in $){const z=$[D];for(const ce in z)_(z[ce].object),delete z[ce];delete $[D]}delete fe[he],Object.keys(fe).length===0&&delete s[q]}}}function F(){W(),f=!0,c!==l&&(c=l,p(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:W,dispose:j,releaseStatesOfGeometry:L,releaseStatesOfObject:A,releaseStatesOfProgram:G,initAttributes:O,enableAttribute:E,disableUnusedAttributes:C}}function c1(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,_){_!==0&&(r.drawArraysInstanced(s,m,p,_),i.update(p,s,_))}function h(m,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,_);let x=0;for(let S=0;S<_;S++)x+=p[S];i.update(x,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function u1(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const G=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(G.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(G){return!(G!==$a&&s.convert(G)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(G){const A=G===Ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(G!==Pa&&s.convert(G)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&G!==ls&&!A)}function m(G){if(G==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";G="mediump"}return G==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const _=m(p);_!==p&&(Tt("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const b=i.logarithmicDepthBuffer===!0,x=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&x===!1&&Tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),O=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),C=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),j=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:b,reversedDepthBuffer:x,maxTextures:S,maxVertexTextures:T,maxTextureSize:O,maxCubemapSize:E,maxAttributes:y,maxVertexUniforms:C,maxVaryings:I,maxFragmentUniforms:U,maxSamples:j,samples:L}}function f1(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new Lr,h=new Pt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(b,x){const S=b.length!==0||x||s!==0||l;return l=x,s=b.length,S},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(b,x){i=_(b,x,0)},this.setState=function(b,x,S){const T=b.clippingPlanes,O=b.clipIntersection,E=b.clipShadows,y=r.get(b);if(!l||T===null||T.length===0||c&&!E)c?_(null):p();else{const C=c?0:s,I=C*4;let U=y.clippingState||null;m.value=U,U=_(T,x,I,S);for(let j=0;j!==I;++j)U[j]=i[j];y.clippingState=U,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=C}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(b,x,S,T){const O=b!==null?b.length:0;let E=null;if(O!==0){if(E=m.value,T!==!0||E===null){const y=S+O*4,C=x.matrixWorldInverse;h.getNormalMatrix(C),(E===null||E.length<y)&&(E=new Float32Array(y));for(let I=0,U=S;I!==O;++I,U+=4)f.copy(b[I]).applyMatrix4(C,h),f.normal.toArray(E,U),E[U+3]=f.constant}m.value=E,m.needsUpdate=!0}return e.numPlanes=O,e.numIntersection=0,E}}const Pr=4,O_=[.125,.215,.35,.446,.526,.582],po=20,d1=256,bc=new sb,D_=new Cn;let lp=null,cp=0,up=0,fp=!1;const h1=new ee;class L_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=h1}=c;lp=this._renderer.getRenderTarget(),cp=this._renderer.getActiveCubeFace(),up=this._renderer.getActiveMipmapLevel(),fp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=P_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=I_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(lp,cp,up),this._renderer.xr.enabled=fp,e.scissorTest=!1,gl(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===xo||e.mapping===Ml?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lp=this._renderer.getRenderTarget(),cp=this._renderer.getActiveCubeFace(),up=this._renderer.getActiveMipmapLevel(),fp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Pi,minFilter:Pi,generateMipmaps:!1,type:Ws,format:$a,colorSpace:Cf,depthBuffer:!1},l=U_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=U_(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=p1(c)),this._blurMaterial=g1(c,e,i),this._ggxMaterial=m1(c,e,i)}return l}_compileMaterial(e){const i=new ps(new gs,e);this._renderer.compile(i,bc)}_sceneToCubeUV(e,i,s,l,c){const m=new Ia(90,1,i,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],b=this._renderer,x=b.autoClear,S=b.toneMapping;b.getClearColor(D_),b.toneMapping=us,b.autoClear=!1,b.state.buffers.depth.getReversed()&&(b.setRenderTarget(l),b.clearDepth(),b.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ps(new Ic,new Mm({name:"PMREM.Background",side:ia,depthWrite:!1,depthTest:!1})));const O=this._backgroundBox,E=O.material;let y=!1;const C=e.background;C?C.isColor&&(E.color.copy(C),e.background=null,y=!0):(E.color.copy(D_),y=!0);for(let I=0;I<6;I++){const U=I%3;U===0?(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[I],c.y,c.z)):U===1?(m.up.set(0,0,p[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[I],c.z)):(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[I]));const j=this._cubeSize;gl(l,U*j,I>2?j:0,j,j),b.setRenderTarget(l),y&&b.render(O,m),b.render(e,m)}b.toneMapping=S,b.autoClear=x,e.background=C}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===xo||e.mapping===Ml;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=P_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=I_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;gl(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,bc)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),b=Math.sqrt(p*p-_*_),x=0+p*1.25,S=b*x,{_lodMax:T}=this,O=this._sizeLods[s],E=3*O*(s>T-Pr?s-T+Pr:0),y=4*(this._cubeSize-O);m.envMap.value=e.texture,m.roughness.value=S,m.mipInt.value=T-i,gl(c,E,y,3*O,2*O),l.setRenderTarget(c),l.render(h,bc),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-s,gl(e,E,y,3*O,2*O),l.setRenderTarget(e),l.render(h,bc)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&cn("blur direction must be either latitudinal or longitudinal!");const _=3,b=this._lodMeshes[l];b.material=p;const x=p.uniforms,S=this._sizeLods[s]-1,T=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*po-1),O=c/T,E=isFinite(c)?1+Math.floor(_*O):po;E>po&&Tt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${po}`);const y=[];let C=0;for(let G=0;G<po;++G){const A=G/O,F=Math.exp(-A*A/2);y.push(F),G===0?C+=F:G<E&&(C+=2*F)}for(let G=0;G<y.length;G++)y[G]=y[G]/C;x.envMap.value=e.texture,x.samples.value=E,x.weights.value=y,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:I}=this;x.dTheta.value=T,x.mipInt.value=I-s;const U=this._sizeLods[l],j=3*U*(l>I-Pr?l-I+Pr:0),L=4*(this._cubeSize-U);gl(i,j,L,3*U,2*U),m.setRenderTarget(i),m.render(b,bc)}}function p1(r){const e=[],i=[],s=[];let l=r;const c=r-Pr+1+O_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-Pr?m=O_[f-r+Pr-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),_=-p,b=1+p,x=[_,_,b,_,b,b,_,_,b,b,_,b],S=6,T=6,O=3,E=2,y=1,C=new Float32Array(O*T*S),I=new Float32Array(E*T*S),U=new Float32Array(y*T*S);for(let L=0;L<S;L++){const G=L%3*2/3-1,A=L>2?0:-1,F=[G,A,0,G+2/3,A,0,G+2/3,A+1,0,G,A,0,G+2/3,A+1,0,G,A+1,0];C.set(F,O*T*L),I.set(x,E*T*L);const W=[L,L,L,L,L,L];U.set(W,y*T*L)}const j=new gs;j.setAttribute("position",new ds(C,O)),j.setAttribute("uv",new ds(I,E)),j.setAttribute("faceIndex",new ds(U,y)),s.push(new ps(j,null)),l>Pr&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function U_(r,e,i){const s=new fs(r,e,i);return s.texture.mapping=Lf,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function gl(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function m1(r,e,i){return new ms({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:d1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pf(),fragmentShader:`

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
		`,blending:Xs,depthTest:!1,depthWrite:!1})}function g1(r,e,i){const s=new Float32Array(po),l=new ee(0,1,0);return new ms({name:"SphericalGaussianBlur",defines:{n:po,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Pf(),fragmentShader:`

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
		`,blending:Xs,depthTest:!1,depthWrite:!1})}function I_(){return new ms({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pf(),fragmentShader:`

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
		`,blending:Xs,depthTest:!1,depthWrite:!1})}function P_(){return new ms({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xs,depthTest:!1,depthWrite:!1})}function Pf(){return`

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
	`}class lb extends fs{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new tb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ic(5,5,5),c=new ms({name:"CubemapFromEquirect",uniforms:Al(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ia,blending:Xs});c.uniforms.tEquirect.value=i;const f=new ps(l,c),h=i.minFilter;return i.minFilter===mo&&(i.minFilter=Pi),new yE(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function x1(r){let e=new WeakMap,i=new WeakMap,s=null;function l(x,S=!1){return x==null?null:S?f(x):c(x)}function c(x){if(x&&x.isTexture){const S=x.mapping;if(S===_f||S===Ph)if(e.has(x)){const T=e.get(x).texture;return h(T,x.mapping)}else{const T=x.image;if(T&&T.height>0){const O=new lb(T.height);return O.fromEquirectangularTexture(r,x),e.set(x,O),x.addEventListener("dispose",p),h(O.texture,x.mapping)}else return null}}return x}function f(x){if(x&&x.isTexture){const S=x.mapping,T=S===_f||S===Ph,O=S===xo||S===Ml;if(T||O){let E=i.get(x);const y=E!==void 0?E.texture.pmremVersion:0;if(x.isRenderTargetTexture&&x.pmremVersion!==y)return s===null&&(s=new L_(r)),E=T?s.fromEquirectangular(x,E):s.fromCubemap(x,E),E.texture.pmremVersion=x.pmremVersion,i.set(x,E),E.texture;if(E!==void 0)return E.texture;{const C=x.image;return T&&C&&C.height>0||O&&C&&m(C)?(s===null&&(s=new L_(r)),E=T?s.fromEquirectangular(x):s.fromCubemap(x),E.texture.pmremVersion=x.pmremVersion,i.set(x,E),x.addEventListener("dispose",_),E.texture):null}}}return x}function h(x,S){return S===_f?x.mapping=xo:S===Ph&&(x.mapping=Ml),x}function m(x){let S=0;const T=6;for(let O=0;O<T;O++)x[O]!==void 0&&S++;return S===T}function p(x){const S=x.target;S.removeEventListener("dispose",p);const T=e.get(S);T!==void 0&&(e.delete(S),T.dispose())}function _(x){const S=x.target;S.removeEventListener("dispose",_);const T=i.get(S);T!==void 0&&(i.delete(S),T.dispose())}function b(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:b}}function _1(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&sm("WebGLRenderer: "+s+" extension not supported."),l}}}function v1(r,e,i,s){const l={},c=new WeakMap;function f(b){const x=b.target;x.index!==null&&e.remove(x.index);for(const T in x.attributes)e.remove(x.attributes[T]);x.removeEventListener("dispose",f),delete l[x.id];const S=c.get(x);S&&(e.remove(S),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function h(b,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,i.memory.geometries++),x}function m(b){const x=b.attributes;for(const S in x)e.update(x[S],r.ARRAY_BUFFER)}function p(b){const x=[],S=b.index,T=b.attributes.position;let O=0;if(T===void 0)return;if(S!==null){const C=S.array;O=S.version;for(let I=0,U=C.length;I<U;I+=3){const j=C[I+0],L=C[I+1],G=C[I+2];x.push(j,L,L,G,G,j)}}else{const C=T.array;O=T.version;for(let I=0,U=C.length/3-1;I<U;I+=3){const j=I+0,L=I+1,G=I+2;x.push(j,L,L,G,G,j)}}const E=new(T.count>=65535?Qv:Zv)(x,1);E.version=O;const y=c.get(b);y&&e.remove(y),c.set(b,E)}function _(b){const x=c.get(b);if(x){const S=b.index;S!==null&&x.version<S.version&&p(b)}else p(b);return c.get(b)}return{get:h,update:m,getWireframeAttribute:_}}function b1(r,e,i){let s;function l(b){s=b}let c,f;function h(b){c=b.type,f=b.bytesPerElement}function m(b,x){r.drawElements(s,x,c,b*f),i.update(x,s,1)}function p(b,x,S){S!==0&&(r.drawElementsInstanced(s,x,c,b*f,S),i.update(x,s,S))}function _(b,x,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,x,0,c,b,0,S);let O=0;for(let E=0;E<S;E++)O+=x[E];i.update(O,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=_}function y1(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:cn("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function S1(r,e,i){const s=new WeakMap,l=new ei;function c(f,h,m){const p=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,b=_!==void 0?_.length:0;let x=s.get(h);if(x===void 0||x.count!==b){let F=function(){G.dispose(),s.delete(h),h.removeEventListener("dispose",F)};x!==void 0&&x.texture.dispose();const S=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,O=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],y=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let I=0;S===!0&&(I=1),T===!0&&(I=2),O===!0&&(I=3);let U=h.attributes.position.count*I,j=1;U>e.maxTextureSize&&(j=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const L=new Float32Array(U*j*4*b),G=new qv(L,U,j,b);G.type=ls,G.needsUpdate=!0;const A=I*4;for(let W=0;W<b;W++){const H=E[W],q=y[W],fe=C[W],he=U*j*4*W;for(let $=0;$<H.count;$++){const D=$*A;S===!0&&(l.fromBufferAttribute(H,$),L[he+D+0]=l.x,L[he+D+1]=l.y,L[he+D+2]=l.z,L[he+D+3]=0),T===!0&&(l.fromBufferAttribute(q,$),L[he+D+4]=l.x,L[he+D+5]=l.y,L[he+D+6]=l.z,L[he+D+7]=0),O===!0&&(l.fromBufferAttribute(fe,$),L[he+D+8]=l.x,L[he+D+9]=l.y,L[he+D+10]=l.z,L[he+D+11]=fe.itemSize===4?l.w:1)}}x={count:b,texture:G,size:new Wt(U,j)},s.set(h,x),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let S=0;for(let O=0;O<p.length;O++)S+=p[O];const T=h.morphTargetsRelative?1:1-S;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function E1(r,e,i,s,l){let c=new WeakMap;function f(p){const _=l.render.frame,b=p.geometry,x=e.get(p,b);if(c.get(x)!==_&&(e.update(x),c.set(x,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==_&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const S=p.skeleton;c.get(S)!==_&&(S.update(),c.set(S,_))}return x}function h(){c=new WeakMap}function m(p){const _=p.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:h}}const M1={[Dv]:"LINEAR_TONE_MAPPING",[Lv]:"REINHARD_TONE_MAPPING",[Uv]:"CINEON_TONE_MAPPING",[Iv]:"ACES_FILMIC_TONE_MAPPING",[Fv]:"AGX_TONE_MAPPING",[Bv]:"NEUTRAL_TONE_MAPPING",[Pv]:"CUSTOM_TONE_MAPPING"};function T1(r,e,i,s,l){const c=new fs(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new Tl(e,i):void 0}),f=new fs(e,i,{type:Ws,depthBuffer:!1,stencilBuffer:!1}),h=new gs;h.setAttribute("position",new Fa([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Fa([0,2,0,0,2,0],2));const m=new pE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ps(h,m),_=new sb(-1,1,1,-1,0,1);let b=null,x=null,S=!1,T,O=null,E=[],y=!1;this.setSize=function(C,I){c.setSize(C,I),f.setSize(C,I);for(let U=0;U<E.length;U++){const j=E[U];j.setSize&&j.setSize(C,I)}},this.setEffects=function(C){E=C,y=E.length>0&&E[0].isRenderPass===!0;const I=c.width,U=c.height;for(let j=0;j<E.length;j++){const L=E[j];L.setSize&&L.setSize(I,U)}},this.begin=function(C,I){if(S||C.toneMapping===us&&E.length===0)return!1;if(O=I,I!==null){const U=I.width,j=I.height;(c.width!==U||c.height!==j)&&this.setSize(U,j)}return y===!1&&C.setRenderTarget(c),T=C.toneMapping,C.toneMapping=us,!0},this.hasRenderPass=function(){return y},this.end=function(C,I){C.toneMapping=T,S=!0;let U=c,j=f;for(let L=0;L<E.length;L++){const G=E[L];if(G.enabled!==!1&&(G.render(C,j,U,I),G.needsSwap!==!1)){const A=U;U=j,j=A}}if(b!==C.outputColorSpace||x!==C.toneMapping){b=C.outputColorSpace,x=C.toneMapping,m.defines={},on.getTransfer(b)===En&&(m.defines.SRGB_TRANSFER="");const L=M1[x];L&&(m.defines[L]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=U.texture,C.setRenderTarget(O),C.render(p,_),O=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const cb=new Fi,om=new Tl(1,1),ub=new qv,fb=new XS,db=new tb,F_=[],B_=[],z_=new Float32Array(16),G_=new Float32Array(9),H_=new Float32Array(4);function Rl(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=F_[l];if(c===void 0&&(c=new Float32Array(l),F_[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function gi(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function xi(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Ff(r,e){let i=B_[e];i===void 0&&(i=new Int32Array(e),B_[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function A1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function w1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gi(i,e))return;r.uniform2fv(this.addr,e),xi(i,e)}}function R1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(gi(i,e))return;r.uniform3fv(this.addr,e),xi(i,e)}}function C1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gi(i,e))return;r.uniform4fv(this.addr,e),xi(i,e)}}function N1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(gi(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),xi(i,e)}else{if(gi(i,s))return;H_.set(s),r.uniformMatrix2fv(this.addr,!1,H_),xi(i,s)}}function O1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(gi(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),xi(i,e)}else{if(gi(i,s))return;G_.set(s),r.uniformMatrix3fv(this.addr,!1,G_),xi(i,s)}}function D1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(gi(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),xi(i,e)}else{if(gi(i,s))return;z_.set(s),r.uniformMatrix4fv(this.addr,!1,z_),xi(i,s)}}function L1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function U1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gi(i,e))return;r.uniform2iv(this.addr,e),xi(i,e)}}function I1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gi(i,e))return;r.uniform3iv(this.addr,e),xi(i,e)}}function P1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gi(i,e))return;r.uniform4iv(this.addr,e),xi(i,e)}}function F1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function B1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gi(i,e))return;r.uniform2uiv(this.addr,e),xi(i,e)}}function z1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gi(i,e))return;r.uniform3uiv(this.addr,e),xi(i,e)}}function G1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gi(i,e))return;r.uniform4uiv(this.addr,e),xi(i,e)}}function H1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(om.compareFunction=i.isReversedDepthBuffer()?ym:bm,c=om):c=cb,i.setTexture2D(e||c,l)}function k1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||fb,l)}function V1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||db,l)}function j1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||ub,l)}function X1(r){switch(r){case 5126:return A1;case 35664:return w1;case 35665:return R1;case 35666:return C1;case 35674:return N1;case 35675:return O1;case 35676:return D1;case 5124:case 35670:return L1;case 35667:case 35671:return U1;case 35668:case 35672:return I1;case 35669:case 35673:return P1;case 5125:return F1;case 36294:return B1;case 36295:return z1;case 36296:return G1;case 35678:case 36198:case 36298:case 36306:case 35682:return H1;case 35679:case 36299:case 36307:return k1;case 35680:case 36300:case 36308:case 36293:return V1;case 36289:case 36303:case 36311:case 36292:return j1}}function Y1(r,e){r.uniform1fv(this.addr,e)}function W1(r,e){const i=Rl(e,this.size,2);r.uniform2fv(this.addr,i)}function q1(r,e){const i=Rl(e,this.size,3);r.uniform3fv(this.addr,i)}function $1(r,e){const i=Rl(e,this.size,4);r.uniform4fv(this.addr,i)}function K1(r,e){const i=Rl(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function Z1(r,e){const i=Rl(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function Q1(r,e){const i=Rl(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function J1(r,e){r.uniform1iv(this.addr,e)}function eA(r,e){r.uniform2iv(this.addr,e)}function tA(r,e){r.uniform3iv(this.addr,e)}function nA(r,e){r.uniform4iv(this.addr,e)}function iA(r,e){r.uniform1uiv(this.addr,e)}function aA(r,e){r.uniform2uiv(this.addr,e)}function sA(r,e){r.uniform3uiv(this.addr,e)}function rA(r,e){r.uniform4uiv(this.addr,e)}function oA(r,e,i){const s=this.cache,l=e.length,c=Ff(i,l);gi(s,c)||(r.uniform1iv(this.addr,c),xi(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=om:f=cb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function lA(r,e,i){const s=this.cache,l=e.length,c=Ff(i,l);gi(s,c)||(r.uniform1iv(this.addr,c),xi(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||fb,c[f])}function cA(r,e,i){const s=this.cache,l=e.length,c=Ff(i,l);gi(s,c)||(r.uniform1iv(this.addr,c),xi(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||db,c[f])}function uA(r,e,i){const s=this.cache,l=e.length,c=Ff(i,l);gi(s,c)||(r.uniform1iv(this.addr,c),xi(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||ub,c[f])}function fA(r){switch(r){case 5126:return Y1;case 35664:return W1;case 35665:return q1;case 35666:return $1;case 35674:return K1;case 35675:return Z1;case 35676:return Q1;case 5124:case 35670:return J1;case 35667:case 35671:return eA;case 35668:case 35672:return tA;case 35669:case 35673:return nA;case 5125:return iA;case 36294:return aA;case 36295:return sA;case 36296:return rA;case 35678:case 36198:case 36298:case 36306:case 35682:return oA;case 35679:case 36299:case 36307:return lA;case 35680:case 36300:case 36308:case 36293:return cA;case 36289:case 36303:case 36311:case 36292:return uA}}class dA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=X1(i.type)}}class hA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=fA(i.type)}}class pA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const dp=/(\w+)(\])?(\[|\.)?/g;function k_(r,e){r.seq.push(e),r.map[e.id]=e}function mA(r,e,i){const s=r.name,l=s.length;for(dp.lastIndex=0;;){const c=dp.exec(s),f=dp.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){k_(i,p===void 0?new dA(h,r,e):new hA(h,r,e));break}else{let b=i.map[h];b===void 0&&(b=new pA(h),k_(i,b)),i=b}}}class Mf{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);mA(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function V_(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const gA=37297;let xA=0;function _A(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const j_=new Pt;function vA(r){on._getMatrix(j_,on.workingColorSpace,r);const e=`mat3( ${j_.elements.map(i=>i.toFixed(4))} )`;switch(on.getTransfer(r)){case Nf:return[e,"LinearTransferOETF"];case En:return[e,"sRGBTransferOETF"];default:return Tt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function X_(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+_A(r.getShaderSource(e),h)}else return c}function bA(r,e){const i=vA(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const yA={[Dv]:"Linear",[Lv]:"Reinhard",[Uv]:"Cineon",[Iv]:"ACESFilmic",[Fv]:"AgX",[Bv]:"Neutral",[Pv]:"Custom"};function SA(r,e){const i=yA[e];return i===void 0?(Tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const pf=new ee;function EA(){on.getLuminanceCoefficients(pf);const r=pf.x.toFixed(4),e=pf.y.toFixed(4),i=pf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ac).join(`
`)}function TA(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function AA(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function Ac(r){return r!==""}function Y_(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function W_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wA=/^[ \t]*#include +<([\w\d./]+)>/gm;function lm(r){return r.replace(wA,CA)}const RA=new Map;function CA(r,e){let i=Xt[e];if(i===void 0){const s=RA.get(e);if(s!==void 0)i=Xt[s],Tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return lm(i)}const NA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function q_(r){return r.replace(NA,OA)}function OA(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function $_(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const DA={[xf]:"SHADOWMAP_TYPE_PCF",[Tc]:"SHADOWMAP_TYPE_VSM"};function LA(r){return DA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const UA={[xo]:"ENVMAP_TYPE_CUBE",[Ml]:"ENVMAP_TYPE_CUBE",[Lf]:"ENVMAP_TYPE_CUBE_UV"};function IA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":UA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const PA={[Ml]:"ENVMAP_MODE_REFRACTION"};function FA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":PA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const BA={[Ov]:"ENVMAP_BLENDING_MULTIPLY",[ES]:"ENVMAP_BLENDING_MIX",[MS]:"ENVMAP_BLENDING_ADD"};function zA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":BA[r.combine]||"ENVMAP_BLENDING_NONE"}function GA(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function HA(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=LA(i),p=IA(i),_=FA(i),b=zA(i),x=GA(i),S=MA(i),T=TA(c),O=l.createProgram();let E,y,C=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Ac).join(`
`),E.length>0&&(E+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Ac).join(`
`),y.length>0&&(y+=`
`)):(E=[$_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ac).join(`
`),y=[$_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+_:"",i.envMap?"#define "+b:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==us?"#define TONE_MAPPING":"",i.toneMapping!==us?Xt.tonemapping_pars_fragment:"",i.toneMapping!==us?SA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,bA("linearToOutputTexel",i.outputColorSpace),EA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ac).join(`
`)),f=lm(f),f=Y_(f,i),f=W_(f,i),h=lm(h),h=Y_(h,i),h=W_(h,i),f=q_(f),h=q_(h),i.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,E=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,y=["#define varying in",i.glslVersion===o_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===o_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const I=C+E+f,U=C+y+h,j=V_(l,l.VERTEX_SHADER,I),L=V_(l,l.FRAGMENT_SHADER,U);l.attachShader(O,j),l.attachShader(O,L),i.index0AttributeName!==void 0?l.bindAttribLocation(O,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(O,0,"position"),l.linkProgram(O);function G(H){if(r.debug.checkShaderErrors){const q=l.getProgramInfoLog(O)||"",fe=l.getShaderInfoLog(j)||"",he=l.getShaderInfoLog(L)||"",$=q.trim(),D=fe.trim(),z=he.trim();let ce=!0,xe=!0;if(l.getProgramParameter(O,l.LINK_STATUS)===!1)if(ce=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,O,j,L);else{const Ae=X_(l,j,"vertex"),P=X_(l,L,"fragment");cn("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(O,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+$+`
`+Ae+`
`+P)}else $!==""?Tt("WebGLProgram: Program Info Log:",$):(D===""||z==="")&&(xe=!1);xe&&(H.diagnostics={runnable:ce,programLog:$,vertexShader:{log:D,prefix:E},fragmentShader:{log:z,prefix:y}})}l.deleteShader(j),l.deleteShader(L),A=new Mf(l,O),F=AA(l,O)}let A;this.getUniforms=function(){return A===void 0&&G(this),A};let F;this.getAttributes=function(){return F===void 0&&G(this),F};let W=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=l.getProgramParameter(O,gA)),W},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(O),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=xA++,this.cacheKey=e,this.usedTimes=1,this.program=O,this.vertexShader=j,this.fragmentShader=L,this}let kA=0;class VA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new jA(e),i.set(e,s)),s}}class jA{constructor(e){this.id=kA++,this.code=e,this.usedTimes=0}}function XA(r){return r===_o||r===wf||r===Rf}function YA(r,e,i,s,l,c){const f=new $v,h=new VA,m=new Set,p=[],_=new Map,b=s.logarithmicDepthBuffer;let x=s.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(A){return m.add(A),A===0?"uv":`uv${A}`}function O(A,F,W,H,q,fe){const he=H.fog,$=q.geometry,D=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,z=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,ce=e.get(A.envMap||D,z),xe=ce&&ce.mapping===Lf?ce.image.height:null,Ae=S[A.type];A.precision!==null&&(x=s.getMaxPrecision(A.precision),x!==A.precision&&Tt("WebGLProgram.getParameters:",A.precision,"not supported, using",x,"instead."));const P=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Q=P!==void 0?P.length:0;let Ee=0;$.morphAttributes.position!==void 0&&(Ee=1),$.morphAttributes.normal!==void 0&&(Ee=2),$.morphAttributes.color!==void 0&&(Ee=3);let Ne,Oe,se,be;if(Ae){const bt=os[Ae];Ne=bt.vertexShader,Oe=bt.fragmentShader}else Ne=A.vertexShader,Oe=A.fragmentShader,h.update(A),se=h.getVertexShaderID(A),be=h.getFragmentShaderID(A);const Re=r.getRenderTarget(),ke=r.state.buffers.depth.getReversed(),gt=q.isInstancedMesh===!0,it=q.isBatchedMesh===!0,_n=!!A.map,kt=!!A.matcap,Yt=!!ce,mn=!!A.aoMap,xt=!!A.lightMap,Gn=!!A.bumpMap,At=!!A.normalMap,ui=!!A.displacementMap,Y=!!A.emissiveMap,Ln=!!A.metalnessMap,zt=!!A.roughnessMap,un=A.anisotropy>0,Ue=A.clearcoat>0,Nn=A.dispersion>0,N=A.iridescence>0,M=A.sheen>0,K=A.transmission>0,ge=un&&!!A.anisotropyMap,Te=Ue&&!!A.clearcoatMap,Ie=Ue&&!!A.clearcoatNormalMap,Be=Ue&&!!A.clearcoatRoughnessMap,de=N&&!!A.iridescenceMap,re=N&&!!A.iridescenceThicknessMap,ze=M&&!!A.sheenColorMap,He=M&&!!A.sheenRoughnessMap,De=!!A.specularMap,Pe=!!A.specularColorMap,ut=!!A.specularIntensityMap,St=K&&!!A.transmissionMap,Mt=K&&!!A.thicknessMap,V=!!A.gradientMap,we=!!A.alphaMap,pe=A.alphaTest>0,Ge=!!A.alphaHash,Fe=!!A.extensions;let Se=us;A.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(Se=r.toneMapping);const et={shaderID:Ae,shaderType:A.type,shaderName:A.name,vertexShader:Ne,fragmentShader:Oe,defines:A.defines,customVertexShaderID:se,customFragmentShaderID:be,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:x,batching:it,batchingColor:it&&q._colorsTexture!==null,instancing:gt,instancingColor:gt&&q.instanceColor!==null,instancingMorph:gt&&q.morphTexture!==null,outputColorSpace:Re===null?r.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:on.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:_n,matcap:kt,envMap:Yt,envMapMode:Yt&&ce.mapping,envMapCubeUVHeight:xe,aoMap:mn,lightMap:xt,bumpMap:Gn,normalMap:At,displacementMap:ui,emissiveMap:Y,normalMapObjectSpace:At&&A.normalMapType===wS,normalMapTangentSpace:At&&A.normalMapType===a_,packedNormalMap:At&&A.normalMapType===a_&&XA(A.normalMap.format),metalnessMap:Ln,roughnessMap:zt,anisotropy:un,anisotropyMap:ge,clearcoat:Ue,clearcoatMap:Te,clearcoatNormalMap:Ie,clearcoatRoughnessMap:Be,dispersion:Nn,iridescence:N,iridescenceMap:de,iridescenceThicknessMap:re,sheen:M,sheenColorMap:ze,sheenRoughnessMap:He,specularMap:De,specularColorMap:Pe,specularIntensityMap:ut,transmission:K,transmissionMap:St,thicknessMap:Mt,gradientMap:V,opaque:A.transparent===!1&&A.blending===yl&&A.alphaToCoverage===!1,alphaMap:we,alphaTest:pe,alphaHash:Ge,combine:A.combine,mapUv:_n&&T(A.map.channel),aoMapUv:mn&&T(A.aoMap.channel),lightMapUv:xt&&T(A.lightMap.channel),bumpMapUv:Gn&&T(A.bumpMap.channel),normalMapUv:At&&T(A.normalMap.channel),displacementMapUv:ui&&T(A.displacementMap.channel),emissiveMapUv:Y&&T(A.emissiveMap.channel),metalnessMapUv:Ln&&T(A.metalnessMap.channel),roughnessMapUv:zt&&T(A.roughnessMap.channel),anisotropyMapUv:ge&&T(A.anisotropyMap.channel),clearcoatMapUv:Te&&T(A.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&T(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&T(A.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&T(A.iridescenceMap.channel),iridescenceThicknessMapUv:re&&T(A.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&T(A.sheenColorMap.channel),sheenRoughnessMapUv:He&&T(A.sheenRoughnessMap.channel),specularMapUv:De&&T(A.specularMap.channel),specularColorMapUv:Pe&&T(A.specularColorMap.channel),specularIntensityMapUv:ut&&T(A.specularIntensityMap.channel),transmissionMapUv:St&&T(A.transmissionMap.channel),thicknessMapUv:Mt&&T(A.thicknessMap.channel),alphaMapUv:we&&T(A.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(At||un),vertexNormals:!!$.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!$.attributes.uv&&(_n||we),fog:!!he,useFog:A.fog===!0,fogExp2:!!he&&he.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||$.attributes.normal===void 0&&At===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:b,reversedDepthBuffer:ke,skinning:q.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Ee,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:fe.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:Se,decodeVideoTexture:_n&&A.map.isVideoTexture===!0&&on.getTransfer(A.map.colorSpace)===En,decodeVideoTextureEmissive:Y&&A.emissiveMap.isVideoTexture===!0&&on.getTransfer(A.emissiveMap.colorSpace)===En,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Vs,flipSided:A.side===ia,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Fe&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&A.extensions.multiDraw===!0||it)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return et.vertexUv1s=m.has(1),et.vertexUv2s=m.has(2),et.vertexUv3s=m.has(3),m.clear(),et}function E(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const W in A.defines)F.push(W),F.push(A.defines[W]);return A.isRawShaderMaterial===!1&&(y(F,A),C(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function y(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function C(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function I(A){const F=S[A.type];let W;if(F){const H=os[F];W=fE.clone(H.uniforms)}else W=A.uniforms;return W}function U(A,F){let W=_.get(F);return W!==void 0?++W.usedTimes:(W=new HA(r,F,A,l),p.push(W),_.set(F,W)),W}function j(A){if(--A.usedTimes===0){const F=p.indexOf(A);p[F]=p[p.length-1],p.pop(),_.delete(A.cacheKey),A.destroy()}}function L(A){h.remove(A)}function G(){h.dispose()}return{getParameters:O,getProgramCacheKey:E,getUniforms:I,acquireProgram:U,releaseProgram:j,releaseShaderCache:L,programs:p,dispose:G}}function WA(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function qA(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function K_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Z_(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(x){let S=0;return x.isInstancedMesh&&(S+=2),x.isSkinnedMesh&&(S+=1),S}function h(x,S,T,O,E,y){let C=r[e];return C===void 0?(C={id:x.id,object:x,geometry:S,material:T,materialVariant:f(x),groupOrder:O,renderOrder:x.renderOrder,z:E,group:y},r[e]=C):(C.id=x.id,C.object=x,C.geometry=S,C.material=T,C.materialVariant=f(x),C.groupOrder=O,C.renderOrder=x.renderOrder,C.z=E,C.group=y),e++,C}function m(x,S,T,O,E,y){const C=h(x,S,T,O,E,y);T.transmission>0?s.push(C):T.transparent===!0?l.push(C):i.push(C)}function p(x,S,T,O,E,y){const C=h(x,S,T,O,E,y);T.transmission>0?s.unshift(C):T.transparent===!0?l.unshift(C):i.unshift(C)}function _(x,S){i.length>1&&i.sort(x||qA),s.length>1&&s.sort(S||K_),l.length>1&&l.sort(S||K_)}function b(){for(let x=e,S=r.length;x<S;x++){const T=r[x];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:b,sort:_}}function $A(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new Z_,r.set(s,[f])):l>=c.length?(f=new Z_,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function KA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ee,color:new Cn};break;case"SpotLight":i={position:new ee,direction:new ee,color:new Cn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ee,color:new Cn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ee,skyColor:new Cn,groundColor:new Cn};break;case"RectAreaLight":i={color:new Cn,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return r[e.id]=i,i}}}function ZA(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let QA=0;function JA(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ew(r){const e=new KA,i=ZA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ee);const l=new ee,c=new mi,f=new mi;function h(p){let _=0,b=0,x=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let S=0,T=0,O=0,E=0,y=0,C=0,I=0,U=0,j=0,L=0,G=0;p.sort(JA);for(let F=0,W=p.length;F<W;F++){const H=p[F],q=H.color,fe=H.intensity,he=H.distance;let $=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===_o?$=H.shadow.map.texture:$=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)_+=q.r*fe,b+=q.g*fe,x+=q.b*fe;else if(H.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(H.sh.coefficients[D],fe);G++}else if(H.isDirectionalLight){const D=e.get(H);if(D.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const z=H.shadow,ce=i.get(H);ce.shadowIntensity=z.intensity,ce.shadowBias=z.bias,ce.shadowNormalBias=z.normalBias,ce.shadowRadius=z.radius,ce.shadowMapSize=z.mapSize,s.directionalShadow[S]=ce,s.directionalShadowMap[S]=$,s.directionalShadowMatrix[S]=H.shadow.matrix,C++}s.directional[S]=D,S++}else if(H.isSpotLight){const D=e.get(H);D.position.setFromMatrixPosition(H.matrixWorld),D.color.copy(q).multiplyScalar(fe),D.distance=he,D.coneCos=Math.cos(H.angle),D.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),D.decay=H.decay,s.spot[O]=D;const z=H.shadow;if(H.map&&(s.spotLightMap[j]=H.map,j++,z.updateMatrices(H),H.castShadow&&L++),s.spotLightMatrix[O]=z.matrix,H.castShadow){const ce=i.get(H);ce.shadowIntensity=z.intensity,ce.shadowBias=z.bias,ce.shadowNormalBias=z.normalBias,ce.shadowRadius=z.radius,ce.shadowMapSize=z.mapSize,s.spotShadow[O]=ce,s.spotShadowMap[O]=$,U++}O++}else if(H.isRectAreaLight){const D=e.get(H);D.color.copy(q).multiplyScalar(fe),D.halfWidth.set(H.width*.5,0,0),D.halfHeight.set(0,H.height*.5,0),s.rectArea[E]=D,E++}else if(H.isPointLight){const D=e.get(H);if(D.color.copy(H.color).multiplyScalar(H.intensity),D.distance=H.distance,D.decay=H.decay,H.castShadow){const z=H.shadow,ce=i.get(H);ce.shadowIntensity=z.intensity,ce.shadowBias=z.bias,ce.shadowNormalBias=z.normalBias,ce.shadowRadius=z.radius,ce.shadowMapSize=z.mapSize,ce.shadowCameraNear=z.camera.near,ce.shadowCameraFar=z.camera.far,s.pointShadow[T]=ce,s.pointShadowMap[T]=$,s.pointShadowMatrix[T]=H.shadow.matrix,I++}s.point[T]=D,T++}else if(H.isHemisphereLight){const D=e.get(H);D.skyColor.copy(H.color).multiplyScalar(fe),D.groundColor.copy(H.groundColor).multiplyScalar(fe),s.hemi[y]=D,y++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ye.LTC_FLOAT_1,s.rectAreaLTC2=Ye.LTC_FLOAT_2):(s.rectAreaLTC1=Ye.LTC_HALF_1,s.rectAreaLTC2=Ye.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=b,s.ambient[2]=x;const A=s.hash;(A.directionalLength!==S||A.pointLength!==T||A.spotLength!==O||A.rectAreaLength!==E||A.hemiLength!==y||A.numDirectionalShadows!==C||A.numPointShadows!==I||A.numSpotShadows!==U||A.numSpotMaps!==j||A.numLightProbes!==G)&&(s.directional.length=S,s.spot.length=O,s.rectArea.length=E,s.point.length=T,s.hemi.length=y,s.directionalShadow.length=C,s.directionalShadowMap.length=C,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=C,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=U+j-L,s.spotLightMap.length=j,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=G,A.directionalLength=S,A.pointLength=T,A.spotLength=O,A.rectAreaLength=E,A.hemiLength=y,A.numDirectionalShadows=C,A.numPointShadows=I,A.numSpotShadows=U,A.numSpotMaps=j,A.numLightProbes=G,s.version=QA++)}function m(p,_){let b=0,x=0,S=0,T=0,O=0;const E=_.matrixWorldInverse;for(let y=0,C=p.length;y<C;y++){const I=p[y];if(I.isDirectionalLight){const U=s.directional[b];U.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(E),b++}else if(I.isSpotLight){const U=s.spot[S];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(E),U.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(E),S++}else if(I.isRectAreaLight){const U=s.rectArea[T];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(E),f.identity(),c.copy(I.matrixWorld),c.premultiply(E),f.extractRotation(c),U.halfWidth.set(I.width*.5,0,0),U.halfHeight.set(0,I.height*.5,0),U.halfWidth.applyMatrix4(f),U.halfHeight.applyMatrix4(f),T++}else if(I.isPointLight){const U=s.point[x];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(E),x++}else if(I.isHemisphereLight){const U=s.hemi[O];U.direction.setFromMatrixPosition(I.matrixWorld),U.direction.transformDirection(E),O++}}}return{setup:h,setupView:m,state:s}}function Q_(r){const e=new ew(r),i=[],s=[],l=[];function c(x){b.camera=x,i.length=0,s.length=0,l.length=0}function f(x){i.push(x)}function h(x){s.push(x)}function m(x){l.push(x)}function p(){e.setup(i)}function _(x){e.setupView(i,x)}const b={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:b,setupLights:p,setupLightsView:_,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function tw(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new Q_(r),e.set(l,[h])):c>=f.length?(h=new Q_(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const nw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iw=`uniform sampler2D shadow_pass;
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
}`,aw=[new ee(1,0,0),new ee(-1,0,0),new ee(0,1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1)],sw=[new ee(0,-1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1),new ee(0,-1,0),new ee(0,-1,0)],J_=new mi,yc=new ee,hp=new ee;function rw(r,e,i){let s=new eb;const l=new Wt,c=new Wt,f=new ei,h=new mE,m=new gE,p={},_=i.maxTextureSize,b={[Br]:ia,[ia]:Br,[Vs]:Vs},x=new ms({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:nw,fragmentShader:iw}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const T=new gs;T.setAttribute("position",new ds(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const O=new ps(T,x),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xf;let y=this.type;this.render=function(L,G,A){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||L.length===0)return;this.type===aS&&(Tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xf);const F=r.getRenderTarget(),W=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),q=r.state;q.setBlending(Xs),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const fe=y!==this.type;fe&&G.traverse(function(he){he.material&&(Array.isArray(he.material)?he.material.forEach($=>$.needsUpdate=!0):he.material.needsUpdate=!0)});for(let he=0,$=L.length;he<$;he++){const D=L[he],z=D.shadow;if(z===void 0){Tt("WebGLShadowMap:",D,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;l.copy(z.mapSize);const ce=z.getFrameExtents();l.multiply(ce),c.copy(z.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ce.x),l.x=c.x*ce.x,z.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ce.y),l.y=c.y*ce.y,z.mapSize.y=c.y));const xe=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=xe,z.map===null||fe===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Tc){if(D.isPointLight){Tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new fs(l.x,l.y,{format:_o,type:Ws,minFilter:Pi,magFilter:Pi,generateMipmaps:!1}),z.map.texture.name=D.name+".shadowMap",z.map.depthTexture=new Tl(l.x,l.y,ls),z.map.depthTexture.name=D.name+".shadowMapDepth",z.map.depthTexture.format=qs,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ci,z.map.depthTexture.magFilter=Ci}else D.isPointLight?(z.map=new lb(l.x),z.map.depthTexture=new cE(l.x,hs)):(z.map=new fs(l.x,l.y),z.map.depthTexture=new Tl(l.x,l.y,hs)),z.map.depthTexture.name=D.name+".shadowMap",z.map.depthTexture.format=qs,this.type===xf?(z.map.depthTexture.compareFunction=xe?ym:bm,z.map.depthTexture.minFilter=Pi,z.map.depthTexture.magFilter=Pi):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ci,z.map.depthTexture.magFilter=Ci);z.camera.updateProjectionMatrix()}const Ae=z.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Ae;P++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,P),r.clear();else{P===0&&(r.setRenderTarget(z.map),r.clear());const Q=z.getViewport(P);f.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),q.viewport(f)}if(D.isPointLight){const Q=z.camera,Ee=z.matrix,Ne=D.distance||Q.far;Ne!==Q.far&&(Q.far=Ne,Q.updateProjectionMatrix()),yc.setFromMatrixPosition(D.matrixWorld),Q.position.copy(yc),hp.copy(Q.position),hp.add(aw[P]),Q.up.copy(sw[P]),Q.lookAt(hp),Q.updateMatrixWorld(),Ee.makeTranslation(-yc.x,-yc.y,-yc.z),J_.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),z._frustum.setFromProjectionMatrix(J_,Q.coordinateSystem,Q.reversedDepth)}else z.updateMatrices(D);s=z.getFrustum(),U(G,A,z.camera,D,this.type)}z.isPointLightShadow!==!0&&this.type===Tc&&C(z,A),z.needsUpdate=!1}y=this.type,E.needsUpdate=!1,r.setRenderTarget(F,W,H)};function C(L,G){const A=e.update(O);x.defines.VSM_SAMPLES!==L.blurSamples&&(x.defines.VSM_SAMPLES=L.blurSamples,S.defines.VSM_SAMPLES=L.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new fs(l.x,l.y,{format:_o,type:Ws})),x.uniforms.shadow_pass.value=L.map.depthTexture,x.uniforms.resolution.value=L.mapSize,x.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(G,null,A,x,O,null),S.uniforms.shadow_pass.value=L.mapPass.texture,S.uniforms.resolution.value=L.mapSize,S.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(G,null,A,S,O,null)}function I(L,G,A,F){let W=null;const H=A.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(H!==void 0)W=H;else if(W=A.isPointLight===!0?m:h,r.localClippingEnabled&&G.clipShadows===!0&&Array.isArray(G.clippingPlanes)&&G.clippingPlanes.length!==0||G.displacementMap&&G.displacementScale!==0||G.alphaMap&&G.alphaTest>0||G.map&&G.alphaTest>0||G.alphaToCoverage===!0){const q=W.uuid,fe=G.uuid;let he=p[q];he===void 0&&(he={},p[q]=he);let $=he[fe];$===void 0&&($=W.clone(),he[fe]=$,G.addEventListener("dispose",j)),W=$}if(W.visible=G.visible,W.wireframe=G.wireframe,F===Tc?W.side=G.shadowSide!==null?G.shadowSide:G.side:W.side=G.shadowSide!==null?G.shadowSide:b[G.side],W.alphaMap=G.alphaMap,W.alphaTest=G.alphaToCoverage===!0?.5:G.alphaTest,W.map=G.map,W.clipShadows=G.clipShadows,W.clippingPlanes=G.clippingPlanes,W.clipIntersection=G.clipIntersection,W.displacementMap=G.displacementMap,W.displacementScale=G.displacementScale,W.displacementBias=G.displacementBias,W.wireframeLinewidth=G.wireframeLinewidth,W.linewidth=G.linewidth,A.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const q=r.properties.get(W);q.light=A}return W}function U(L,G,A,F,W){if(L.visible===!1)return;if(L.layers.test(G.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&W===Tc)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,L.matrixWorld);const fe=e.update(L),he=L.material;if(Array.isArray(he)){const $=fe.groups;for(let D=0,z=$.length;D<z;D++){const ce=$[D],xe=he[ce.materialIndex];if(xe&&xe.visible){const Ae=I(L,xe,F,W);L.onBeforeShadow(r,L,G,A,fe,Ae,ce),r.renderBufferDirect(A,null,fe,Ae,L,ce),L.onAfterShadow(r,L,G,A,fe,Ae,ce)}}}else if(he.visible){const $=I(L,he,F,W);L.onBeforeShadow(r,L,G,A,fe,$,null),r.renderBufferDirect(A,null,fe,$,L,null),L.onAfterShadow(r,L,G,A,fe,$,null)}}const q=L.children;for(let fe=0,he=q.length;fe<he;fe++)U(q[fe],G,A,F,W)}function j(L){L.target.removeEventListener("dispose",j);for(const A in p){const F=p[A],W=L.target.uuid;W in F&&(F[W].dispose(),delete F[W])}}}function ow(r,e){function i(){let V=!1;const we=new ei;let pe=null;const Ge=new ei(0,0,0,0);return{setMask:function(Fe){pe!==Fe&&!V&&(r.colorMask(Fe,Fe,Fe,Fe),pe=Fe)},setLocked:function(Fe){V=Fe},setClear:function(Fe,Se,et,bt,In){In===!0&&(Fe*=bt,Se*=bt,et*=bt),we.set(Fe,Se,et,bt),Ge.equals(we)===!1&&(r.clearColor(Fe,Se,et,bt),Ge.copy(we))},reset:function(){V=!1,pe=null,Ge.set(-1,0,0,0)}}}function s(){let V=!1,we=!1,pe=null,Ge=null,Fe=null;return{setReversed:function(Se){if(we!==Se){const et=e.get("EXT_clip_control");Se?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT),we=Se;const bt=Fe;Fe=null,this.setClear(bt)}},getReversed:function(){return we},setTest:function(Se){Se?Re(r.DEPTH_TEST):ke(r.DEPTH_TEST)},setMask:function(Se){pe!==Se&&!V&&(r.depthMask(Se),pe=Se)},setFunc:function(Se){if(we&&(Se=FS[Se]),Ge!==Se){switch(Se){case bp:r.depthFunc(r.NEVER);break;case yp:r.depthFunc(r.ALWAYS);break;case Sp:r.depthFunc(r.LESS);break;case El:r.depthFunc(r.LEQUAL);break;case Ep:r.depthFunc(r.EQUAL);break;case Mp:r.depthFunc(r.GEQUAL);break;case Tp:r.depthFunc(r.GREATER);break;case Ap:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ge=Se}},setLocked:function(Se){V=Se},setClear:function(Se){Fe!==Se&&(Fe=Se,we&&(Se=1-Se),r.clearDepth(Se))},reset:function(){V=!1,pe=null,Ge=null,Fe=null,we=!1}}}function l(){let V=!1,we=null,pe=null,Ge=null,Fe=null,Se=null,et=null,bt=null,In=null;return{setTest:function(Gt){V||(Gt?Re(r.STENCIL_TEST):ke(r.STENCIL_TEST))},setMask:function(Gt){we!==Gt&&!V&&(r.stencilMask(Gt),we=Gt)},setFunc:function(Gt,Bi,zi){(pe!==Gt||Ge!==Bi||Fe!==zi)&&(r.stencilFunc(Gt,Bi,zi),pe=Gt,Ge=Bi,Fe=zi)},setOp:function(Gt,Bi,zi){(Se!==Gt||et!==Bi||bt!==zi)&&(r.stencilOp(Gt,Bi,zi),Se=Gt,et=Bi,bt=zi)},setLocked:function(Gt){V=Gt},setClear:function(Gt){In!==Gt&&(r.clearStencil(Gt),In=Gt)},reset:function(){V=!1,we=null,pe=null,Ge=null,Fe=null,Se=null,et=null,bt=null,In=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let _={},b={},x={},S=new WeakMap,T=[],O=null,E=!1,y=null,C=null,I=null,U=null,j=null,L=null,G=null,A=new Cn(0,0,0),F=0,W=!1,H=null,q=null,fe=null,he=null,$=null;const D=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,ce=0;const xe=r.getParameter(r.VERSION);xe.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(xe)[1]),z=ce>=1):xe.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(xe)[1]),z=ce>=2);let Ae=null,P={};const Q=r.getParameter(r.SCISSOR_BOX),Ee=r.getParameter(r.VIEWPORT),Ne=new ei().fromArray(Q),Oe=new ei().fromArray(Ee);function se(V,we,pe,Ge){const Fe=new Uint8Array(4),Se=r.createTexture();r.bindTexture(V,Se),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let et=0;et<pe;et++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(we,0,r.RGBA,1,1,Ge,0,r.RGBA,r.UNSIGNED_BYTE,Fe):r.texImage2D(we+et,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Fe);return Se}const be={};be[r.TEXTURE_2D]=se(r.TEXTURE_2D,r.TEXTURE_2D,1),be[r.TEXTURE_CUBE_MAP]=se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[r.TEXTURE_2D_ARRAY]=se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),be[r.TEXTURE_3D]=se(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Re(r.DEPTH_TEST),f.setFunc(El),Gn(!1),At(e_),Re(r.CULL_FACE),mn(Xs);function Re(V){_[V]!==!0&&(r.enable(V),_[V]=!0)}function ke(V){_[V]!==!1&&(r.disable(V),_[V]=!1)}function gt(V,we){return x[V]!==we?(r.bindFramebuffer(V,we),x[V]=we,V===r.DRAW_FRAMEBUFFER&&(x[r.FRAMEBUFFER]=we),V===r.FRAMEBUFFER&&(x[r.DRAW_FRAMEBUFFER]=we),!0):!1}function it(V,we){let pe=T,Ge=!1;if(V){pe=S.get(we),pe===void 0&&(pe=[],S.set(we,pe));const Fe=V.textures;if(pe.length!==Fe.length||pe[0]!==r.COLOR_ATTACHMENT0){for(let Se=0,et=Fe.length;Se<et;Se++)pe[Se]=r.COLOR_ATTACHMENT0+Se;pe.length=Fe.length,Ge=!0}}else pe[0]!==r.BACK&&(pe[0]=r.BACK,Ge=!0);Ge&&r.drawBuffers(pe)}function _n(V){return O!==V?(r.useProgram(V),O=V,!0):!1}const kt={[ho]:r.FUNC_ADD,[rS]:r.FUNC_SUBTRACT,[oS]:r.FUNC_REVERSE_SUBTRACT};kt[lS]=r.MIN,kt[cS]=r.MAX;const Yt={[uS]:r.ZERO,[fS]:r.ONE,[dS]:r.SRC_COLOR,[_p]:r.SRC_ALPHA,[_S]:r.SRC_ALPHA_SATURATE,[gS]:r.DST_COLOR,[pS]:r.DST_ALPHA,[hS]:r.ONE_MINUS_SRC_COLOR,[vp]:r.ONE_MINUS_SRC_ALPHA,[xS]:r.ONE_MINUS_DST_COLOR,[mS]:r.ONE_MINUS_DST_ALPHA,[vS]:r.CONSTANT_COLOR,[bS]:r.ONE_MINUS_CONSTANT_COLOR,[yS]:r.CONSTANT_ALPHA,[SS]:r.ONE_MINUS_CONSTANT_ALPHA};function mn(V,we,pe,Ge,Fe,Se,et,bt,In,Gt){if(V===Xs){E===!0&&(ke(r.BLEND),E=!1);return}if(E===!1&&(Re(r.BLEND),E=!0),V!==sS){if(V!==y||Gt!==W){if((C!==ho||j!==ho)&&(r.blendEquation(r.FUNC_ADD),C=ho,j=ho),Gt)switch(V){case yl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case t_:r.blendFunc(r.ONE,r.ONE);break;case n_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case i_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:cn("WebGLState: Invalid blending: ",V);break}else switch(V){case yl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case t_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case n_:cn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case i_:cn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:cn("WebGLState: Invalid blending: ",V);break}I=null,U=null,L=null,G=null,A.set(0,0,0),F=0,y=V,W=Gt}return}Fe=Fe||we,Se=Se||pe,et=et||Ge,(we!==C||Fe!==j)&&(r.blendEquationSeparate(kt[we],kt[Fe]),C=we,j=Fe),(pe!==I||Ge!==U||Se!==L||et!==G)&&(r.blendFuncSeparate(Yt[pe],Yt[Ge],Yt[Se],Yt[et]),I=pe,U=Ge,L=Se,G=et),(bt.equals(A)===!1||In!==F)&&(r.blendColor(bt.r,bt.g,bt.b,In),A.copy(bt),F=In),y=V,W=!1}function xt(V,we){V.side===Vs?ke(r.CULL_FACE):Re(r.CULL_FACE);let pe=V.side===ia;we&&(pe=!pe),Gn(pe),V.blending===yl&&V.transparent===!1?mn(Xs):mn(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const Ge=V.stencilWrite;h.setTest(Ge),Ge&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Y(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Re(r.SAMPLE_ALPHA_TO_COVERAGE):ke(r.SAMPLE_ALPHA_TO_COVERAGE)}function Gn(V){H!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),H=V)}function At(V){V!==nS?(Re(r.CULL_FACE),V!==q&&(V===e_?r.cullFace(r.BACK):V===iS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ke(r.CULL_FACE),q=V}function ui(V){V!==fe&&(z&&r.lineWidth(V),fe=V)}function Y(V,we,pe){V?(Re(r.POLYGON_OFFSET_FILL),(he!==we||$!==pe)&&(he=we,$=pe,f.getReversed()&&(we=-we),r.polygonOffset(we,pe))):ke(r.POLYGON_OFFSET_FILL)}function Ln(V){V?Re(r.SCISSOR_TEST):ke(r.SCISSOR_TEST)}function zt(V){V===void 0&&(V=r.TEXTURE0+D-1),Ae!==V&&(r.activeTexture(V),Ae=V)}function un(V,we,pe){pe===void 0&&(Ae===null?pe=r.TEXTURE0+D-1:pe=Ae);let Ge=P[pe];Ge===void 0&&(Ge={type:void 0,texture:void 0},P[pe]=Ge),(Ge.type!==V||Ge.texture!==we)&&(Ae!==pe&&(r.activeTexture(pe),Ae=pe),r.bindTexture(V,we||be[V]),Ge.type=V,Ge.texture=we)}function Ue(){const V=P[Ae];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Nn(){try{r.compressedTexImage2D(...arguments)}catch(V){cn("WebGLState:",V)}}function N(){try{r.compressedTexImage3D(...arguments)}catch(V){cn("WebGLState:",V)}}function M(){try{r.texSubImage2D(...arguments)}catch(V){cn("WebGLState:",V)}}function K(){try{r.texSubImage3D(...arguments)}catch(V){cn("WebGLState:",V)}}function ge(){try{r.compressedTexSubImage2D(...arguments)}catch(V){cn("WebGLState:",V)}}function Te(){try{r.compressedTexSubImage3D(...arguments)}catch(V){cn("WebGLState:",V)}}function Ie(){try{r.texStorage2D(...arguments)}catch(V){cn("WebGLState:",V)}}function Be(){try{r.texStorage3D(...arguments)}catch(V){cn("WebGLState:",V)}}function de(){try{r.texImage2D(...arguments)}catch(V){cn("WebGLState:",V)}}function re(){try{r.texImage3D(...arguments)}catch(V){cn("WebGLState:",V)}}function ze(V){return b[V]!==void 0?b[V]:r.getParameter(V)}function He(V,we){b[V]!==we&&(r.pixelStorei(V,we),b[V]=we)}function De(V){Ne.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),Ne.copy(V))}function Pe(V){Oe.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),Oe.copy(V))}function ut(V,we){let pe=p.get(we);pe===void 0&&(pe=new WeakMap,p.set(we,pe));let Ge=pe.get(V);Ge===void 0&&(Ge=r.getUniformBlockIndex(we,V.name),pe.set(V,Ge))}function St(V,we){const Ge=p.get(we).get(V);m.get(we)!==Ge&&(r.uniformBlockBinding(we,Ge,V.__bindingPointIndex),m.set(we,Ge))}function Mt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},b={},Ae=null,P={},x={},S=new WeakMap,T=[],O=null,E=!1,y=null,C=null,I=null,U=null,j=null,L=null,G=null,A=new Cn(0,0,0),F=0,W=!1,H=null,q=null,fe=null,he=null,$=null,Ne.set(0,0,r.canvas.width,r.canvas.height),Oe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Re,disable:ke,bindFramebuffer:gt,drawBuffers:it,useProgram:_n,setBlending:mn,setMaterial:xt,setFlipSided:Gn,setCullFace:At,setLineWidth:ui,setPolygonOffset:Y,setScissorTest:Ln,activeTexture:zt,bindTexture:un,unbindTexture:Ue,compressedTexImage2D:Nn,compressedTexImage3D:N,texImage2D:de,texImage3D:re,pixelStorei:He,getParameter:ze,updateUBOMapping:ut,uniformBlockBinding:St,texStorage2D:Ie,texStorage3D:Be,texSubImage2D:M,texSubImage3D:K,compressedTexSubImage2D:ge,compressedTexSubImage3D:Te,scissor:De,viewport:Pe,reset:Mt}}function lw(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Wt,_=new WeakMap,b=new Set;let x;const S=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function O(N,M){return T?new OffscreenCanvas(N,M):Nc("canvas")}function E(N,M,K){let ge=1;const Te=Nn(N);if((Te.width>K||Te.height>K)&&(ge=K/Math.max(Te.width,Te.height)),ge<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const Ie=Math.floor(ge*Te.width),Be=Math.floor(ge*Te.height);x===void 0&&(x=O(Ie,Be));const de=M?O(Ie,Be):x;return de.width=Ie,de.height=Be,de.getContext("2d").drawImage(N,0,0,Ie,Be),Tt("WebGLRenderer: Texture has been resized from ("+Te.width+"x"+Te.height+") to ("+Ie+"x"+Be+")."),de}else return"data"in N&&Tt("WebGLRenderer: Image in DataTexture is too big ("+Te.width+"x"+Te.height+")."),N;return N}function y(N){return N.generateMipmaps}function C(N){r.generateMipmap(N)}function I(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(N,M,K,ge,Te,Ie=!1){if(N!==null){if(r[N]!==void 0)return r[N];Tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Be;ge&&(Be=e.get("EXT_texture_norm16"),Be||Tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let de=M;if(M===r.RED&&(K===r.FLOAT&&(de=r.R32F),K===r.HALF_FLOAT&&(de=r.R16F),K===r.UNSIGNED_BYTE&&(de=r.R8),K===r.UNSIGNED_SHORT&&Be&&(de=Be.R16_EXT),K===r.SHORT&&Be&&(de=Be.R16_SNORM_EXT)),M===r.RED_INTEGER&&(K===r.UNSIGNED_BYTE&&(de=r.R8UI),K===r.UNSIGNED_SHORT&&(de=r.R16UI),K===r.UNSIGNED_INT&&(de=r.R32UI),K===r.BYTE&&(de=r.R8I),K===r.SHORT&&(de=r.R16I),K===r.INT&&(de=r.R32I)),M===r.RG&&(K===r.FLOAT&&(de=r.RG32F),K===r.HALF_FLOAT&&(de=r.RG16F),K===r.UNSIGNED_BYTE&&(de=r.RG8),K===r.UNSIGNED_SHORT&&Be&&(de=Be.RG16_EXT),K===r.SHORT&&Be&&(de=Be.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(K===r.UNSIGNED_BYTE&&(de=r.RG8UI),K===r.UNSIGNED_SHORT&&(de=r.RG16UI),K===r.UNSIGNED_INT&&(de=r.RG32UI),K===r.BYTE&&(de=r.RG8I),K===r.SHORT&&(de=r.RG16I),K===r.INT&&(de=r.RG32I)),M===r.RGB_INTEGER&&(K===r.UNSIGNED_BYTE&&(de=r.RGB8UI),K===r.UNSIGNED_SHORT&&(de=r.RGB16UI),K===r.UNSIGNED_INT&&(de=r.RGB32UI),K===r.BYTE&&(de=r.RGB8I),K===r.SHORT&&(de=r.RGB16I),K===r.INT&&(de=r.RGB32I)),M===r.RGBA_INTEGER&&(K===r.UNSIGNED_BYTE&&(de=r.RGBA8UI),K===r.UNSIGNED_SHORT&&(de=r.RGBA16UI),K===r.UNSIGNED_INT&&(de=r.RGBA32UI),K===r.BYTE&&(de=r.RGBA8I),K===r.SHORT&&(de=r.RGBA16I),K===r.INT&&(de=r.RGBA32I)),M===r.RGB&&(K===r.UNSIGNED_SHORT&&Be&&(de=Be.RGB16_EXT),K===r.SHORT&&Be&&(de=Be.RGB16_SNORM_EXT),K===r.UNSIGNED_INT_5_9_9_9_REV&&(de=r.RGB9_E5),K===r.UNSIGNED_INT_10F_11F_11F_REV&&(de=r.R11F_G11F_B10F)),M===r.RGBA){const re=Ie?Nf:on.getTransfer(Te);K===r.FLOAT&&(de=r.RGBA32F),K===r.HALF_FLOAT&&(de=r.RGBA16F),K===r.UNSIGNED_BYTE&&(de=re===En?r.SRGB8_ALPHA8:r.RGBA8),K===r.UNSIGNED_SHORT&&Be&&(de=Be.RGBA16_EXT),K===r.SHORT&&Be&&(de=Be.RGBA16_SNORM_EXT),K===r.UNSIGNED_SHORT_4_4_4_4&&(de=r.RGBA4),K===r.UNSIGNED_SHORT_5_5_5_1&&(de=r.RGB5_A1)}return(de===r.R16F||de===r.R32F||de===r.RG16F||de===r.RG32F||de===r.RGBA16F||de===r.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function j(N,M){let K;return N?M===null||M===hs||M===Cc?K=r.DEPTH24_STENCIL8:M===ls?K=r.DEPTH32F_STENCIL8:M===Rc&&(K=r.DEPTH24_STENCIL8,Tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===hs||M===Cc?K=r.DEPTH_COMPONENT24:M===ls?K=r.DEPTH_COMPONENT32F:M===Rc&&(K=r.DEPTH_COMPONENT16),K}function L(N,M){return y(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ci&&N.minFilter!==Pi?Math.log2(Math.max(M.width,M.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?M.mipmaps.length:1}function G(N){const M=N.target;M.removeEventListener("dispose",G),F(M),M.isVideoTexture&&_.delete(M),M.isHTMLTexture&&b.delete(M)}function A(N){const M=N.target;M.removeEventListener("dispose",A),H(M)}function F(N){const M=s.get(N);if(M.__webglInit===void 0)return;const K=N.source,ge=S.get(K);if(ge){const Te=ge[M.__cacheKey];Te.usedTimes--,Te.usedTimes===0&&W(N),Object.keys(ge).length===0&&S.delete(K)}s.remove(N)}function W(N){const M=s.get(N);r.deleteTexture(M.__webglTexture);const K=N.source,ge=S.get(K);delete ge[M.__cacheKey],f.memory.textures--}function H(N){const M=s.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),s.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let ge=0;ge<6;ge++){if(Array.isArray(M.__webglFramebuffer[ge]))for(let Te=0;Te<M.__webglFramebuffer[ge].length;Te++)r.deleteFramebuffer(M.__webglFramebuffer[ge][Te]);else r.deleteFramebuffer(M.__webglFramebuffer[ge]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[ge])}else{if(Array.isArray(M.__webglFramebuffer))for(let ge=0;ge<M.__webglFramebuffer.length;ge++)r.deleteFramebuffer(M.__webglFramebuffer[ge]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ge=0;ge<M.__webglColorRenderbuffer.length;ge++)M.__webglColorRenderbuffer[ge]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[ge]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const K=N.textures;for(let ge=0,Te=K.length;ge<Te;ge++){const Ie=s.get(K[ge]);Ie.__webglTexture&&(r.deleteTexture(Ie.__webglTexture),f.memory.textures--),s.remove(K[ge])}s.remove(N)}let q=0;function fe(){q=0}function he(){return q}function $(N){q=N}function D(){const N=q;return N>=l.maxTextures&&Tt("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+l.maxTextures),q+=1,N}function z(N){const M=[];return M.push(N.wrapS),M.push(N.wrapT),M.push(N.wrapR||0),M.push(N.magFilter),M.push(N.minFilter),M.push(N.anisotropy),M.push(N.internalFormat),M.push(N.format),M.push(N.type),M.push(N.generateMipmaps),M.push(N.premultiplyAlpha),M.push(N.flipY),M.push(N.unpackAlignment),M.push(N.colorSpace),M.join()}function ce(N,M){const K=s.get(N);if(N.isVideoTexture&&un(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&K.__version!==N.version){const ge=N.image;if(ge===null)Tt("WebGLRenderer: Texture marked for update but no image data found.");else if(ge.complete===!1)Tt("WebGLRenderer: Texture marked for update but image is incomplete");else{ke(K,N,M);return}}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,K.__webglTexture,r.TEXTURE0+M)}function xe(N,M){const K=s.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){ke(K,N,M);return}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,K.__webglTexture,r.TEXTURE0+M)}function Ae(N,M){const K=s.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){ke(K,N,M);return}i.bindTexture(r.TEXTURE_3D,K.__webglTexture,r.TEXTURE0+M)}function P(N,M){const K=s.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&K.__version!==N.version){gt(K,N,M);return}i.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture,r.TEXTURE0+M)}const Q={[wp]:r.REPEAT,[js]:r.CLAMP_TO_EDGE,[Rp]:r.MIRRORED_REPEAT},Ee={[Ci]:r.NEAREST,[TS]:r.NEAREST_MIPMAP_NEAREST,[Xu]:r.NEAREST_MIPMAP_LINEAR,[Pi]:r.LINEAR,[Fh]:r.LINEAR_MIPMAP_NEAREST,[mo]:r.LINEAR_MIPMAP_LINEAR},Ne={[RS]:r.NEVER,[LS]:r.ALWAYS,[CS]:r.LESS,[bm]:r.LEQUAL,[NS]:r.EQUAL,[ym]:r.GEQUAL,[OS]:r.GREATER,[DS]:r.NOTEQUAL};function Oe(N,M){if(M.type===ls&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Pi||M.magFilter===Fh||M.magFilter===Xu||M.magFilter===mo||M.minFilter===Pi||M.minFilter===Fh||M.minFilter===Xu||M.minFilter===mo)&&Tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,Q[M.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,Q[M.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,Q[M.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Ee[M.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Ee[M.minFilter]),M.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,Ne[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ci||M.minFilter!==Xu&&M.minFilter!==mo||M.type===ls&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const K=e.get("EXT_texture_filter_anisotropic");r.texParameterf(N,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function se(N,M){let K=!1;N.__webglInit===void 0&&(N.__webglInit=!0,M.addEventListener("dispose",G));const ge=M.source;let Te=S.get(ge);Te===void 0&&(Te={},S.set(ge,Te));const Ie=z(M);if(Ie!==N.__cacheKey){Te[Ie]===void 0&&(Te[Ie]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,K=!0),Te[Ie].usedTimes++;const Be=Te[N.__cacheKey];Be!==void 0&&(Te[N.__cacheKey].usedTimes--,Be.usedTimes===0&&W(M)),N.__cacheKey=Ie,N.__webglTexture=Te[Ie].texture}return K}function be(N,M,K){return Math.floor(Math.floor(N/K)/M)}function Re(N,M,K,ge){const Ie=N.updateRanges;if(Ie.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,K,ge,M.data);else{Ie.sort((He,De)=>He.start-De.start);let Be=0;for(let He=1;He<Ie.length;He++){const De=Ie[Be],Pe=Ie[He],ut=De.start+De.count,St=be(Pe.start,M.width,4),Mt=be(De.start,M.width,4);Pe.start<=ut+1&&St===Mt&&be(Pe.start+Pe.count-1,M.width,4)===St?De.count=Math.max(De.count,Pe.start+Pe.count-De.start):(++Be,Ie[Be]=Pe)}Ie.length=Be+1;const de=i.getParameter(r.UNPACK_ROW_LENGTH),re=i.getParameter(r.UNPACK_SKIP_PIXELS),ze=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let He=0,De=Ie.length;He<De;He++){const Pe=Ie[He],ut=Math.floor(Pe.start/4),St=Math.ceil(Pe.count/4),Mt=ut%M.width,V=Math.floor(ut/M.width),we=St,pe=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,V),i.texSubImage2D(r.TEXTURE_2D,0,Mt,V,we,pe,K,ge,M.data)}N.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,de),i.pixelStorei(r.UNPACK_SKIP_PIXELS,re),i.pixelStorei(r.UNPACK_SKIP_ROWS,ze)}}function ke(N,M,K){let ge=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ge=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ge=r.TEXTURE_3D);const Te=se(N,M),Ie=M.source;i.bindTexture(ge,N.__webglTexture,r.TEXTURE0+K);const Be=s.get(Ie);if(Ie.version!==Be.__version||Te===!0){if(i.activeTexture(r.TEXTURE0+K),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const pe=on.getPrimaries(on.workingColorSpace),Ge=M.colorSpace===Ir?null:on.getPrimaries(M.colorSpace),Fe=M.colorSpace===Ir||pe===Ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe)}i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let re=E(M.image,!1,l.maxTextureSize);re=Ue(M,re);const ze=c.convert(M.format,M.colorSpace),He=c.convert(M.type);let De=U(M.internalFormat,ze,He,M.normalized,M.colorSpace,M.isVideoTexture);Oe(ge,M);let Pe;const ut=M.mipmaps,St=M.isVideoTexture!==!0,Mt=Be.__version===void 0||Te===!0,V=Ie.dataReady,we=L(M,re);if(M.isDepthTexture)De=j(M.format===go,M.type),Mt&&(St?i.texStorage2D(r.TEXTURE_2D,1,De,re.width,re.height):i.texImage2D(r.TEXTURE_2D,0,De,re.width,re.height,0,ze,He,null));else if(M.isDataTexture)if(ut.length>0){St&&Mt&&i.texStorage2D(r.TEXTURE_2D,we,De,ut[0].width,ut[0].height);for(let pe=0,Ge=ut.length;pe<Ge;pe++)Pe=ut[pe],St?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Pe.width,Pe.height,ze,He,Pe.data):i.texImage2D(r.TEXTURE_2D,pe,De,Pe.width,Pe.height,0,ze,He,Pe.data);M.generateMipmaps=!1}else St?(Mt&&i.texStorage2D(r.TEXTURE_2D,we,De,re.width,re.height),V&&Re(M,re,ze,He)):i.texImage2D(r.TEXTURE_2D,0,De,re.width,re.height,0,ze,He,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){St&&Mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,we,De,ut[0].width,ut[0].height,re.depth);for(let pe=0,Ge=ut.length;pe<Ge;pe++)if(Pe=ut[pe],M.format!==$a)if(ze!==null)if(St){if(V)if(M.layerUpdates.size>0){const Fe=N_(Pe.width,Pe.height,M.format,M.type);for(const Se of M.layerUpdates){const et=Pe.data.subarray(Se*Fe/Pe.data.BYTES_PER_ELEMENT,(Se+1)*Fe/Pe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,Se,Pe.width,Pe.height,1,ze,et)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Pe.width,Pe.height,re.depth,ze,Pe.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,De,Pe.width,Pe.height,re.depth,0,Pe.data,0,0);else Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else St?V&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Pe.width,Pe.height,re.depth,ze,He,Pe.data):i.texImage3D(r.TEXTURE_2D_ARRAY,pe,De,Pe.width,Pe.height,re.depth,0,ze,He,Pe.data)}else{St&&Mt&&i.texStorage2D(r.TEXTURE_2D,we,De,ut[0].width,ut[0].height);for(let pe=0,Ge=ut.length;pe<Ge;pe++)Pe=ut[pe],M.format!==$a?ze!==null?St?V&&i.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,Pe.width,Pe.height,ze,Pe.data):i.compressedTexImage2D(r.TEXTURE_2D,pe,De,Pe.width,Pe.height,0,Pe.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):St?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Pe.width,Pe.height,ze,He,Pe.data):i.texImage2D(r.TEXTURE_2D,pe,De,Pe.width,Pe.height,0,ze,He,Pe.data)}else if(M.isDataArrayTexture)if(St){if(Mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,we,De,re.width,re.height,re.depth),V)if(M.layerUpdates.size>0){const pe=N_(re.width,re.height,M.format,M.type);for(const Ge of M.layerUpdates){const Fe=re.data.subarray(Ge*pe/re.data.BYTES_PER_ELEMENT,(Ge+1)*pe/re.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ge,re.width,re.height,1,ze,He,Fe)}M.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ze,He,re.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,De,re.width,re.height,re.depth,0,ze,He,re.data);else if(M.isData3DTexture)St?(Mt&&i.texStorage3D(r.TEXTURE_3D,we,De,re.width,re.height,re.depth),V&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ze,He,re.data)):i.texImage3D(r.TEXTURE_3D,0,De,re.width,re.height,re.depth,0,ze,He,re.data);else if(M.isFramebufferTexture){if(Mt)if(St)i.texStorage2D(r.TEXTURE_2D,we,De,re.width,re.height);else{let pe=re.width,Ge=re.height;for(let Fe=0;Fe<we;Fe++)i.texImage2D(r.TEXTURE_2D,Fe,De,pe,Ge,0,ze,He,null),pe>>=1,Ge>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const pe=r.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),re.parentNode!==pe){pe.appendChild(re),b.add(M),pe.onpaint=bt=>{const In=bt.changedElements;for(const Gt of b)In.includes(Gt.image)&&(Gt.needsUpdate=!0)},pe.requestPaint();return}const Ge=0,Fe=r.RGBA,Se=r.RGBA,et=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Ge,Fe,Se,et,re),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ut.length>0){if(St&&Mt){const pe=Nn(ut[0]);i.texStorage2D(r.TEXTURE_2D,we,De,pe.width,pe.height)}for(let pe=0,Ge=ut.length;pe<Ge;pe++)Pe=ut[pe],St?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,ze,He,Pe):i.texImage2D(r.TEXTURE_2D,pe,De,ze,He,Pe);M.generateMipmaps=!1}else if(St){if(Mt){const pe=Nn(re);i.texStorage2D(r.TEXTURE_2D,we,De,pe.width,pe.height)}V&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,ze,He,re)}else i.texImage2D(r.TEXTURE_2D,0,De,ze,He,re);y(M)&&C(ge),Be.__version=Ie.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function gt(N,M,K){if(M.image.length!==6)return;const ge=se(N,M),Te=M.source;i.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+K);const Ie=s.get(Te);if(Te.version!==Ie.__version||ge===!0){i.activeTexture(r.TEXTURE0+K);const Be=on.getPrimaries(on.workingColorSpace),de=M.colorSpace===Ir?null:on.getPrimaries(M.colorSpace),re=M.colorSpace===Ir||Be===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const ze=M.isCompressedTexture||M.image[0].isCompressedTexture,He=M.image[0]&&M.image[0].isDataTexture,De=[];for(let Se=0;Se<6;Se++)!ze&&!He?De[Se]=E(M.image[Se],!0,l.maxCubemapSize):De[Se]=He?M.image[Se].image:M.image[Se],De[Se]=Ue(M,De[Se]);const Pe=De[0],ut=c.convert(M.format,M.colorSpace),St=c.convert(M.type),Mt=U(M.internalFormat,ut,St,M.normalized,M.colorSpace),V=M.isVideoTexture!==!0,we=Ie.__version===void 0||ge===!0,pe=Te.dataReady;let Ge=L(M,Pe);Oe(r.TEXTURE_CUBE_MAP,M);let Fe;if(ze){V&&we&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,Mt,Pe.width,Pe.height);for(let Se=0;Se<6;Se++){Fe=De[Se].mipmaps;for(let et=0;et<Fe.length;et++){const bt=Fe[et];M.format!==$a?ut!==null?V?pe&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,0,0,bt.width,bt.height,ut,bt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,Mt,bt.width,bt.height,0,bt.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,0,0,bt.width,bt.height,ut,St,bt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,Mt,bt.width,bt.height,0,ut,St,bt.data)}}}else{if(Fe=M.mipmaps,V&&we){Fe.length>0&&Ge++;const Se=Nn(De[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,Mt,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(He){V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,De[Se].width,De[Se].height,ut,St,De[Se].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Mt,De[Se].width,De[Se].height,0,ut,St,De[Se].data);for(let et=0;et<Fe.length;et++){const In=Fe[et].image[Se].image;V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,0,0,In.width,In.height,ut,St,In.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,Mt,In.width,In.height,0,ut,St,In.data)}}else{V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,ut,St,De[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Mt,ut,St,De[Se]);for(let et=0;et<Fe.length;et++){const bt=Fe[et];V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,0,0,ut,St,bt.image[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,Mt,ut,St,bt.image[Se])}}}y(M)&&C(r.TEXTURE_CUBE_MAP),Ie.__version=Te.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function it(N,M,K,ge,Te,Ie){const Be=c.convert(K.format,K.colorSpace),de=c.convert(K.type),re=U(K.internalFormat,Be,de,K.normalized,K.colorSpace),ze=s.get(M),He=s.get(K);if(He.__renderTarget=M,!ze.__hasExternalTextures){const De=Math.max(1,M.width>>Ie),Pe=Math.max(1,M.height>>Ie);Te===r.TEXTURE_3D||Te===r.TEXTURE_2D_ARRAY?i.texImage3D(Te,Ie,re,De,Pe,M.depth,0,Be,de,null):i.texImage2D(Te,Ie,re,De,Pe,0,Be,de,null)}i.bindFramebuffer(r.FRAMEBUFFER,N),zt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ge,Te,He.__webglTexture,0,Ln(M)):(Te===r.TEXTURE_2D||Te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ge,Te,He.__webglTexture,Ie),i.bindFramebuffer(r.FRAMEBUFFER,null)}function _n(N,M,K){if(r.bindRenderbuffer(r.RENDERBUFFER,N),M.depthBuffer){const ge=M.depthTexture,Te=ge&&ge.isDepthTexture?ge.type:null,Ie=j(M.stencilBuffer,Te),Be=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;zt(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ln(M),Ie,M.width,M.height):K?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ln(M),Ie,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Ie,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Be,r.RENDERBUFFER,N)}else{const ge=M.textures;for(let Te=0;Te<ge.length;Te++){const Ie=ge[Te],Be=c.convert(Ie.format,Ie.colorSpace),de=c.convert(Ie.type),re=U(Ie.internalFormat,Be,de,Ie.normalized,Ie.colorSpace);zt(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ln(M),re,M.width,M.height):K?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ln(M),re,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,re,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function kt(N,M,K){const ge=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,N),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Te=s.get(M.depthTexture);if(Te.__renderTarget=M,(!Te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),ge){if(Te.__webglInit===void 0&&(Te.__webglInit=!0,M.depthTexture.addEventListener("dispose",G)),Te.__webglTexture===void 0){Te.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Te.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,M.depthTexture);const ze=c.convert(M.depthTexture.format),He=c.convert(M.depthTexture.type);let De;M.depthTexture.format===qs?De=r.DEPTH_COMPONENT24:M.depthTexture.format===go&&(De=r.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,De,M.width,M.height,0,ze,He,null)}}else ce(M.depthTexture,0);const Ie=Te.__webglTexture,Be=Ln(M),de=ge?r.TEXTURE_CUBE_MAP_POSITIVE_X+K:r.TEXTURE_2D,re=M.depthTexture.format===go?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===qs)zt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,re,de,Ie,0,Be):r.framebufferTexture2D(r.FRAMEBUFFER,re,de,Ie,0);else if(M.depthTexture.format===go)zt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,re,de,Ie,0,Be):r.framebufferTexture2D(r.FRAMEBUFFER,re,de,Ie,0);else throw new Error("Unknown depthTexture format")}function Yt(N){const M=s.get(N),K=N.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==N.depthTexture){const ge=N.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ge){const Te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ge.removeEventListener("dispose",Te)};ge.addEventListener("dispose",Te),M.__depthDisposeCallback=Te}M.__boundDepthTexture=ge}if(N.depthTexture&&!M.__autoAllocateDepthBuffer)if(K)for(let ge=0;ge<6;ge++)kt(M.__webglFramebuffer[ge],N,ge);else{const ge=N.texture.mipmaps;ge&&ge.length>0?kt(M.__webglFramebuffer[0],N,0):kt(M.__webglFramebuffer,N,0)}else if(K){M.__webglDepthbuffer=[];for(let ge=0;ge<6;ge++)if(i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[ge]),M.__webglDepthbuffer[ge]===void 0)M.__webglDepthbuffer[ge]=r.createRenderbuffer(),_n(M.__webglDepthbuffer[ge],N,!1);else{const Te=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=M.__webglDepthbuffer[ge];r.bindRenderbuffer(r.RENDERBUFFER,Ie),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,Ie)}}else{const ge=N.texture.mipmaps;if(ge&&ge.length>0?i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),_n(M.__webglDepthbuffer,N,!1);else{const Te=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ie),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,Ie)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function mn(N,M,K){const ge=s.get(N);M!==void 0&&it(ge.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),K!==void 0&&Yt(N)}function xt(N){const M=N.texture,K=s.get(N),ge=s.get(M);N.addEventListener("dispose",A);const Te=N.textures,Ie=N.isWebGLCubeRenderTarget===!0,Be=Te.length>1;if(Be||(ge.__webglTexture===void 0&&(ge.__webglTexture=r.createTexture()),ge.__version=M.version,f.memory.textures++),Ie){K.__webglFramebuffer=[];for(let de=0;de<6;de++)if(M.mipmaps&&M.mipmaps.length>0){K.__webglFramebuffer[de]=[];for(let re=0;re<M.mipmaps.length;re++)K.__webglFramebuffer[de][re]=r.createFramebuffer()}else K.__webglFramebuffer[de]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){K.__webglFramebuffer=[];for(let de=0;de<M.mipmaps.length;de++)K.__webglFramebuffer[de]=r.createFramebuffer()}else K.__webglFramebuffer=r.createFramebuffer();if(Be)for(let de=0,re=Te.length;de<re;de++){const ze=s.get(Te[de]);ze.__webglTexture===void 0&&(ze.__webglTexture=r.createTexture(),f.memory.textures++)}if(N.samples>0&&zt(N)===!1){K.__webglMultisampledFramebuffer=r.createFramebuffer(),K.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let de=0;de<Te.length;de++){const re=Te[de];K.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,K.__webglColorRenderbuffer[de]);const ze=c.convert(re.format,re.colorSpace),He=c.convert(re.type),De=U(re.internalFormat,ze,He,re.normalized,re.colorSpace,N.isXRRenderTarget===!0),Pe=Ln(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Pe,De,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,K.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(K.__webglDepthRenderbuffer=r.createRenderbuffer(),_n(K.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ie){i.bindTexture(r.TEXTURE_CUBE_MAP,ge.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,M);for(let de=0;de<6;de++)if(M.mipmaps&&M.mipmaps.length>0)for(let re=0;re<M.mipmaps.length;re++)it(K.__webglFramebuffer[de][re],N,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,re);else it(K.__webglFramebuffer[de],N,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);y(M)&&C(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Be){for(let de=0,re=Te.length;de<re;de++){const ze=Te[de],He=s.get(ze);let De=r.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(De=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(De,He.__webglTexture),Oe(De,ze),it(K.__webglFramebuffer,N,ze,r.COLOR_ATTACHMENT0+de,De,0),y(ze)&&C(De)}i.unbindTexture()}else{let de=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(de=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(de,ge.__webglTexture),Oe(de,M),M.mipmaps&&M.mipmaps.length>0)for(let re=0;re<M.mipmaps.length;re++)it(K.__webglFramebuffer[re],N,M,r.COLOR_ATTACHMENT0,de,re);else it(K.__webglFramebuffer,N,M,r.COLOR_ATTACHMENT0,de,0);y(M)&&C(de),i.unbindTexture()}N.depthBuffer&&Yt(N)}function Gn(N){const M=N.textures;for(let K=0,ge=M.length;K<ge;K++){const Te=M[K];if(y(Te)){const Ie=I(N),Be=s.get(Te).__webglTexture;i.bindTexture(Ie,Be),C(Ie),i.unbindTexture()}}}const At=[],ui=[];function Y(N){if(N.samples>0){if(zt(N)===!1){const M=N.textures,K=N.width,ge=N.height;let Te=r.COLOR_BUFFER_BIT;const Ie=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Be=s.get(N),de=M.length>1;if(de)for(let ze=0;ze<M.length;ze++)i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ze,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ze,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer);const re=N.texture.mipmaps;re&&re.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let ze=0;ze<M.length;ze++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Te|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Te|=r.STENCIL_BUFFER_BIT)),de){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Be.__webglColorRenderbuffer[ze]);const He=s.get(M[ze]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,He,0)}r.blitFramebuffer(0,0,K,ge,0,0,K,ge,Te,r.NEAREST),m===!0&&(At.length=0,ui.length=0,At.push(r.COLOR_ATTACHMENT0+ze),N.depthBuffer&&N.resolveDepthBuffer===!1&&(At.push(Ie),ui.push(Ie),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ui)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,At))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let ze=0;ze<M.length;ze++){i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ze,r.RENDERBUFFER,Be.__webglColorRenderbuffer[ze]);const He=s.get(M[ze]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ze,r.TEXTURE_2D,He,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&m){const M=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Ln(N){return Math.min(l.maxSamples,N.samples)}function zt(N){const M=s.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function un(N){const M=f.render.frame;_.get(N)!==M&&(_.set(N,M),N.update())}function Ue(N,M){const K=N.colorSpace,ge=N.format,Te=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||K!==Cf&&K!==Ir&&(on.getTransfer(K)===En?(ge!==$a||Te!==Pa)&&Tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):cn("WebGLTextures: Unsupported texture color space:",K)),M}function Nn(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=D,this.resetTextureUnits=fe,this.getTextureUnits=he,this.setTextureUnits=$,this.setTexture2D=ce,this.setTexture2DArray=xe,this.setTexture3D=Ae,this.setTextureCube=P,this.rebindTextures=mn,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=Gn,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=zt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function cw(r,e){function i(s,l=Ir){let c;const f=on.getTransfer(l);if(s===Pa)return r.UNSIGNED_BYTE;if(s===mm)return r.UNSIGNED_SHORT_4_4_4_4;if(s===gm)return r.UNSIGNED_SHORT_5_5_5_1;if(s===kv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Vv)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Gv)return r.BYTE;if(s===Hv)return r.SHORT;if(s===Rc)return r.UNSIGNED_SHORT;if(s===pm)return r.INT;if(s===hs)return r.UNSIGNED_INT;if(s===ls)return r.FLOAT;if(s===Ws)return r.HALF_FLOAT;if(s===jv)return r.ALPHA;if(s===Xv)return r.RGB;if(s===$a)return r.RGBA;if(s===qs)return r.DEPTH_COMPONENT;if(s===go)return r.DEPTH_STENCIL;if(s===Yv)return r.RED;if(s===xm)return r.RED_INTEGER;if(s===_o)return r.RG;if(s===_m)return r.RG_INTEGER;if(s===vm)return r.RGBA_INTEGER;if(s===vf||s===bf||s===yf||s===Sf)if(f===En)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===vf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===bf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===yf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Sf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===vf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===bf)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===yf)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Sf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Cp||s===Np||s===Op||s===Dp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Cp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Np)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Op)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Dp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Lp||s===Up||s===Ip||s===Pp||s===Fp||s===wf||s===Bp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Lp||s===Up)return f===En?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Ip)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Pp)return c.COMPRESSED_R11_EAC;if(s===Fp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===wf)return c.COMPRESSED_RG11_EAC;if(s===Bp)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===zp||s===Gp||s===Hp||s===kp||s===Vp||s===jp||s===Xp||s===Yp||s===Wp||s===qp||s===$p||s===Kp||s===Zp||s===Qp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===zp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Gp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Hp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===kp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Vp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===jp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Xp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Yp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Wp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===$p)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Kp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Zp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Jp||s===em||s===tm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Jp)return f===En?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===em)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===tm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===nm||s===im||s===Rf||s===am)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===nm)return c.COMPRESSED_RED_RGTC1_EXT;if(s===im)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Rf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===am)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Cc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const uw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fw=`
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

}`;class dw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new nb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new ms({vertexShader:uw,fragmentShader:fw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ps(new If(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hw extends Gr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,_=null,b=null,x=null,S=null,T=null;const O=typeof XRWebGLBinding<"u",E=new dw,y={},C=i.getContextAttributes();let I=null,U=null;const j=[],L=[],G=new Wt;let A=null;const F=new Ia;F.viewport=new ei;const W=new Ia;W.viewport=new ei;const H=[F,W],q=new SE;let fe=null,he=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let be=j[se];return be===void 0&&(be=new jh,j[se]=be),be.getTargetRaySpace()},this.getControllerGrip=function(se){let be=j[se];return be===void 0&&(be=new jh,j[se]=be),be.getGripSpace()},this.getHand=function(se){let be=j[se];return be===void 0&&(be=new jh,j[se]=be),be.getHandSpace()};function $(se){const be=L.indexOf(se.inputSource);if(be===-1)return;const Re=j[be];Re!==void 0&&(Re.update(se.inputSource,se.frame,p||f),Re.dispatchEvent({type:se.type,data:se.inputSource}))}function D(){l.removeEventListener("select",$),l.removeEventListener("selectstart",$),l.removeEventListener("selectend",$),l.removeEventListener("squeeze",$),l.removeEventListener("squeezestart",$),l.removeEventListener("squeezeend",$),l.removeEventListener("end",D),l.removeEventListener("inputsourceschange",z);for(let se=0;se<j.length;se++){const be=L[se];be!==null&&(L[se]=null,j[se].disconnect(be))}fe=null,he=null,E.reset();for(const se in y)delete y[se];e.setRenderTarget(I),S=null,x=null,b=null,l=null,U=null,Oe.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(G.width,G.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){c=se,s.isPresenting===!0&&Tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){h=se,s.isPresenting===!0&&Tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(se){p=se},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return b===null&&O&&(b=new XRWebGLBinding(l,i)),b},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(se){if(l=se,l!==null){if(I=e.getRenderTarget(),l.addEventListener("select",$),l.addEventListener("selectstart",$),l.addEventListener("selectend",$),l.addEventListener("squeeze",$),l.addEventListener("squeezestart",$),l.addEventListener("squeezeend",$),l.addEventListener("end",D),l.addEventListener("inputsourceschange",z),C.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(G),O&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,ke=null,gt=null;C.depth&&(gt=C.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Re=C.stencil?go:qs,ke=C.stencil?Cc:hs);const it={colorFormat:i.RGBA8,depthFormat:gt,scaleFactor:c};b=this.getBinding(),x=b.createProjectionLayer(it),l.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),U=new fs(x.textureWidth,x.textureHeight,{format:$a,type:Pa,depthTexture:new Tl(x.textureWidth,x.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const Re={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,Re),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),U=new fs(S.framebufferWidth,S.framebufferHeight,{format:$a,type:Pa,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Oe.setContext(l),Oe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return E.getDepthTexture()};function z(se){for(let be=0;be<se.removed.length;be++){const Re=se.removed[be],ke=L.indexOf(Re);ke>=0&&(L[ke]=null,j[ke].disconnect(Re))}for(let be=0;be<se.added.length;be++){const Re=se.added[be];let ke=L.indexOf(Re);if(ke===-1){for(let it=0;it<j.length;it++)if(it>=L.length){L.push(Re),ke=it;break}else if(L[it]===null){L[it]=Re,ke=it;break}if(ke===-1)break}const gt=j[ke];gt&&gt.connect(Re)}}const ce=new ee,xe=new ee;function Ae(se,be,Re){ce.setFromMatrixPosition(be.matrixWorld),xe.setFromMatrixPosition(Re.matrixWorld);const ke=ce.distanceTo(xe),gt=be.projectionMatrix.elements,it=Re.projectionMatrix.elements,_n=gt[14]/(gt[10]-1),kt=gt[14]/(gt[10]+1),Yt=(gt[9]+1)/gt[5],mn=(gt[9]-1)/gt[5],xt=(gt[8]-1)/gt[0],Gn=(it[8]+1)/it[0],At=_n*xt,ui=_n*Gn,Y=ke/(-xt+Gn),Ln=Y*-xt;if(be.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Ln),se.translateZ(Y),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),gt[10]===-1)se.projectionMatrix.copy(be.projectionMatrix),se.projectionMatrixInverse.copy(be.projectionMatrixInverse);else{const zt=_n+Y,un=kt+Y,Ue=At-Ln,Nn=ui+(ke-Ln),N=Yt*kt/un*zt,M=mn*kt/un*zt;se.projectionMatrix.makePerspective(Ue,Nn,N,M,zt,un),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function P(se,be){be===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(be.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(l===null)return;let be=se.near,Re=se.far;E.texture!==null&&(E.depthNear>0&&(be=E.depthNear),E.depthFar>0&&(Re=E.depthFar)),q.near=W.near=F.near=be,q.far=W.far=F.far=Re,(fe!==q.near||he!==q.far)&&(l.updateRenderState({depthNear:q.near,depthFar:q.far}),fe=q.near,he=q.far),q.layers.mask=se.layers.mask|6,F.layers.mask=q.layers.mask&-5,W.layers.mask=q.layers.mask&-3;const ke=se.parent,gt=q.cameras;P(q,ke);for(let it=0;it<gt.length;it++)P(gt[it],ke);gt.length===2?Ae(q,F,W):q.projectionMatrix.copy(F.projectionMatrix),Q(se,q,ke)};function Q(se,be,Re){Re===null?se.matrix.copy(be.matrixWorld):(se.matrix.copy(Re.matrixWorld),se.matrix.invert(),se.matrix.multiply(be.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(be.projectionMatrix),se.projectionMatrixInverse.copy(be.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=rm*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(x===null&&S===null))return m},this.setFoveation=function(se){m=se,x!==null&&(x.fixedFoveation=se),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=se)},this.hasDepthSensing=function(){return E.texture!==null},this.getDepthSensingMesh=function(){return E.getMesh(q)},this.getCameraTexture=function(se){return y[se]};let Ee=null;function Ne(se,be){if(_=be.getViewerPose(p||f),T=be,_!==null){const Re=_.views;S!==null&&(e.setRenderTargetFramebuffer(U,S.framebuffer),e.setRenderTarget(U));let ke=!1;Re.length!==q.cameras.length&&(q.cameras.length=0,ke=!0);for(let kt=0;kt<Re.length;kt++){const Yt=Re[kt];let mn=null;if(S!==null)mn=S.getViewport(Yt);else{const Gn=b.getViewSubImage(x,Yt);mn=Gn.viewport,kt===0&&(e.setRenderTargetTextures(U,Gn.colorTexture,Gn.depthStencilTexture),e.setRenderTarget(U))}let xt=H[kt];xt===void 0&&(xt=new Ia,xt.layers.enable(kt),xt.viewport=new ei,H[kt]=xt),xt.matrix.fromArray(Yt.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(Yt.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(mn.x,mn.y,mn.width,mn.height),kt===0&&(q.matrix.copy(xt.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),ke===!0&&q.cameras.push(xt)}const gt=l.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&O){b=s.getBinding();const kt=b.getDepthInformation(Re[0]);kt&&kt.isValid&&kt.texture&&E.init(kt,l.renderState)}if(gt&&gt.includes("camera-access")&&O){e.state.unbindTexture(),b=s.getBinding();for(let kt=0;kt<Re.length;kt++){const Yt=Re[kt].camera;if(Yt){let mn=y[Yt];mn||(mn=new nb,y[Yt]=mn);const xt=b.getCameraImage(Yt);mn.sourceTexture=xt}}}}for(let Re=0;Re<j.length;Re++){const ke=L[Re],gt=j[Re];ke!==null&&gt!==void 0&&gt.update(ke,be,p||f)}Ee&&Ee(se,be),be.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:be}),T=null}const Oe=new rb;Oe.setAnimationLoop(Ne),this.setAnimationLoop=function(se){Ee=se},this.dispose=function(){}}}const pw=new mi,hb=new Pt;hb.set(-1,0,0,0,1,0,0,0,1);function mw(r,e){function i(E,y){E.matrixAutoUpdate===!0&&E.updateMatrix(),y.value.copy(E.matrix)}function s(E,y){y.color.getRGB(E.fogColor.value,ib(r)),y.isFog?(E.fogNear.value=y.near,E.fogFar.value=y.far):y.isFogExp2&&(E.fogDensity.value=y.density)}function l(E,y,C,I,U){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(E,y):y.isMeshLambertMaterial?(c(E,y),y.envMap&&(E.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(E,y),b(E,y)):y.isMeshPhongMaterial?(c(E,y),_(E,y),y.envMap&&(E.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(E,y),x(E,y),y.isMeshPhysicalMaterial&&S(E,y,U)):y.isMeshMatcapMaterial?(c(E,y),T(E,y)):y.isMeshDepthMaterial?c(E,y):y.isMeshDistanceMaterial?(c(E,y),O(E,y)):y.isMeshNormalMaterial?c(E,y):y.isLineBasicMaterial?(f(E,y),y.isLineDashedMaterial&&h(E,y)):y.isPointsMaterial?m(E,y,C,I):y.isSpriteMaterial?p(E,y):y.isShadowMaterial?(E.color.value.copy(y.color),E.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(E,y){E.opacity.value=y.opacity,y.color&&E.diffuse.value.copy(y.color),y.emissive&&E.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(E.map.value=y.map,i(y.map,E.mapTransform)),y.alphaMap&&(E.alphaMap.value=y.alphaMap,i(y.alphaMap,E.alphaMapTransform)),y.bumpMap&&(E.bumpMap.value=y.bumpMap,i(y.bumpMap,E.bumpMapTransform),E.bumpScale.value=y.bumpScale,y.side===ia&&(E.bumpScale.value*=-1)),y.normalMap&&(E.normalMap.value=y.normalMap,i(y.normalMap,E.normalMapTransform),E.normalScale.value.copy(y.normalScale),y.side===ia&&E.normalScale.value.negate()),y.displacementMap&&(E.displacementMap.value=y.displacementMap,i(y.displacementMap,E.displacementMapTransform),E.displacementScale.value=y.displacementScale,E.displacementBias.value=y.displacementBias),y.emissiveMap&&(E.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,E.emissiveMapTransform)),y.specularMap&&(E.specularMap.value=y.specularMap,i(y.specularMap,E.specularMapTransform)),y.alphaTest>0&&(E.alphaTest.value=y.alphaTest);const C=e.get(y),I=C.envMap,U=C.envMapRotation;I&&(E.envMap.value=I,E.envMapRotation.value.setFromMatrix4(pw.makeRotationFromEuler(U)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&E.envMapRotation.value.premultiply(hb),E.reflectivity.value=y.reflectivity,E.ior.value=y.ior,E.refractionRatio.value=y.refractionRatio),y.lightMap&&(E.lightMap.value=y.lightMap,E.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,E.lightMapTransform)),y.aoMap&&(E.aoMap.value=y.aoMap,E.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,E.aoMapTransform))}function f(E,y){E.diffuse.value.copy(y.color),E.opacity.value=y.opacity,y.map&&(E.map.value=y.map,i(y.map,E.mapTransform))}function h(E,y){E.dashSize.value=y.dashSize,E.totalSize.value=y.dashSize+y.gapSize,E.scale.value=y.scale}function m(E,y,C,I){E.diffuse.value.copy(y.color),E.opacity.value=y.opacity,E.size.value=y.size*C,E.scale.value=I*.5,y.map&&(E.map.value=y.map,i(y.map,E.uvTransform)),y.alphaMap&&(E.alphaMap.value=y.alphaMap,i(y.alphaMap,E.alphaMapTransform)),y.alphaTest>0&&(E.alphaTest.value=y.alphaTest)}function p(E,y){E.diffuse.value.copy(y.color),E.opacity.value=y.opacity,E.rotation.value=y.rotation,y.map&&(E.map.value=y.map,i(y.map,E.mapTransform)),y.alphaMap&&(E.alphaMap.value=y.alphaMap,i(y.alphaMap,E.alphaMapTransform)),y.alphaTest>0&&(E.alphaTest.value=y.alphaTest)}function _(E,y){E.specular.value.copy(y.specular),E.shininess.value=Math.max(y.shininess,1e-4)}function b(E,y){y.gradientMap&&(E.gradientMap.value=y.gradientMap)}function x(E,y){E.metalness.value=y.metalness,y.metalnessMap&&(E.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,E.metalnessMapTransform)),E.roughness.value=y.roughness,y.roughnessMap&&(E.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,E.roughnessMapTransform)),y.envMap&&(E.envMapIntensity.value=y.envMapIntensity)}function S(E,y,C){E.ior.value=y.ior,y.sheen>0&&(E.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),E.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(E.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,E.sheenColorMapTransform)),y.sheenRoughnessMap&&(E.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,E.sheenRoughnessMapTransform))),y.clearcoat>0&&(E.clearcoat.value=y.clearcoat,E.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(E.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,E.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(E.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ia&&E.clearcoatNormalScale.value.negate())),y.dispersion>0&&(E.dispersion.value=y.dispersion),y.iridescence>0&&(E.iridescence.value=y.iridescence,E.iridescenceIOR.value=y.iridescenceIOR,E.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(E.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,E.iridescenceMapTransform)),y.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),y.transmission>0&&(E.transmission.value=y.transmission,E.transmissionSamplerMap.value=C.texture,E.transmissionSamplerSize.value.set(C.width,C.height),y.transmissionMap&&(E.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,E.transmissionMapTransform)),E.thickness.value=y.thickness,y.thicknessMap&&(E.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=y.attenuationDistance,E.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(E.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(E.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=y.specularIntensity,E.specularColor.value.copy(y.specularColor),y.specularColorMap&&(E.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,E.specularColorMapTransform)),y.specularIntensityMap&&(E.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,E.specularIntensityMapTransform))}function T(E,y){y.matcap&&(E.matcap.value=y.matcap)}function O(E,y){const C=e.get(y).light;E.referencePosition.value.setFromMatrixPosition(C.matrixWorld),E.nearDistance.value=C.shadow.camera.near,E.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function gw(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,I){const U=I.program;s.uniformBlockBinding(C,U)}function p(C,I){let U=l[C.id];U===void 0&&(T(C),U=_(C),l[C.id]=U,C.addEventListener("dispose",E));const j=I.program;s.updateUBOMapping(C,j);const L=e.render.frame;c[C.id]!==L&&(x(C),c[C.id]=L)}function _(C){const I=b();C.__bindingPointIndex=I;const U=r.createBuffer(),j=C.__size,L=C.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,j,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,U),U}function b(){for(let C=0;C<h;C++)if(f.indexOf(C)===-1)return f.push(C),C;return cn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(C){const I=l[C.id],U=C.uniforms,j=C.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let L=0,G=U.length;L<G;L++){const A=Array.isArray(U[L])?U[L]:[U[L]];for(let F=0,W=A.length;F<W;F++){const H=A[F];if(S(H,L,F,j)===!0){const q=H.__offset,fe=Array.isArray(H.value)?H.value:[H.value];let he=0;for(let $=0;$<fe.length;$++){const D=fe[$],z=O(D);typeof D=="number"||typeof D=="boolean"?(H.__data[0]=D,r.bufferSubData(r.UNIFORM_BUFFER,q+he,H.__data)):D.isMatrix3?(H.__data[0]=D.elements[0],H.__data[1]=D.elements[1],H.__data[2]=D.elements[2],H.__data[3]=0,H.__data[4]=D.elements[3],H.__data[5]=D.elements[4],H.__data[6]=D.elements[5],H.__data[7]=0,H.__data[8]=D.elements[6],H.__data[9]=D.elements[7],H.__data[10]=D.elements[8],H.__data[11]=0):ArrayBuffer.isView(D)?H.__data.set(new D.constructor(D.buffer,D.byteOffset,H.__data.length)):(D.toArray(H.__data,he),he+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,q,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(C,I,U,j){const L=C.value,G=I+"_"+U;if(j[G]===void 0)return typeof L=="number"||typeof L=="boolean"?j[G]=L:ArrayBuffer.isView(L)?j[G]=L.slice():j[G]=L.clone(),!0;{const A=j[G];if(typeof L=="number"||typeof L=="boolean"){if(A!==L)return j[G]=L,!0}else{if(ArrayBuffer.isView(L))return!0;if(A.equals(L)===!1)return A.copy(L),!0}}return!1}function T(C){const I=C.uniforms;let U=0;const j=16;for(let G=0,A=I.length;G<A;G++){const F=Array.isArray(I[G])?I[G]:[I[G]];for(let W=0,H=F.length;W<H;W++){const q=F[W],fe=Array.isArray(q.value)?q.value:[q.value];for(let he=0,$=fe.length;he<$;he++){const D=fe[he],z=O(D),ce=U%j,xe=ce%z.boundary,Ae=ce+xe;U+=xe,Ae!==0&&j-Ae<z.storage&&(U+=j-Ae),q.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=U,U+=z.storage}}}const L=U%j;return L>0&&(U+=j-L),C.__size=U,C.__cache={},this}function O(C){const I={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(I.boundary=4,I.storage=4):C.isVector2?(I.boundary=8,I.storage=8):C.isVector3||C.isColor?(I.boundary=16,I.storage=12):C.isVector4?(I.boundary=16,I.storage=16):C.isMatrix3?(I.boundary=48,I.storage=48):C.isMatrix4?(I.boundary=64,I.storage=64):C.isTexture?Tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(I.boundary=16,I.storage=C.byteLength):Tt("WebGLRenderer: Unsupported uniform value type.",C),I}function E(C){const I=C.target;I.removeEventListener("dispose",E);const U=f.indexOf(I.__bindingPointIndex);f.splice(U,1),r.deleteBuffer(l[I.id]),delete l[I.id],delete c[I.id]}function y(){for(const C in l)r.deleteBuffer(l[C]);f=[],l={},c={}}return{bind:m,update:p,dispose:y}}const xw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let rs=null;function _w(){return rs===null&&(rs=new sE(xw,16,16,_o,Ws),rs.name="DFG_LUT",rs.minFilter=Pi,rs.magFilter=Pi,rs.wrapS=js,rs.wrapT=js,rs.generateMipmaps=!1,rs.needsUpdate=!0),rs}class vw{constructor(e={}){const{canvas:i=IS(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:b=!1,reversedDepthBuffer:x=!1,outputBufferType:S=Pa}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=f;const O=S,E=new Set([vm,_m,xm]),y=new Set([Pa,hs,Rc,Cc,mm,gm]),C=new Uint32Array(4),I=new Int32Array(4),U=new ee;let j=null,L=null;const G=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=us,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const W=this;let H=!1,q=null;this._outputColorSpace=ga;let fe=0,he=0,$=null,D=-1,z=null;const ce=new ei,xe=new ei;let Ae=null;const P=new Cn(0);let Q=0,Ee=i.width,Ne=i.height,Oe=1,se=null,be=null;const Re=new ei(0,0,Ee,Ne),ke=new ei(0,0,Ee,Ne);let gt=!1;const it=new eb;let _n=!1,kt=!1;const Yt=new mi,mn=new ee,xt=new ei,Gn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let At=!1;function ui(){return $===null?Oe:1}let Y=s;function Ln(w,k){return i.getContext(w,k)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:b};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${hm}`),i.addEventListener("webglcontextlost",Se,!1),i.addEventListener("webglcontextrestored",et,!1),i.addEventListener("webglcontextcreationerror",bt,!1),Y===null){const k="webgl2";if(Y=Ln(k,w),Y===null)throw Ln(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw cn("WebGLRenderer: "+w.message),w}let zt,un,Ue,Nn,N,M,K,ge,Te,Ie,Be,de,re,ze,He,De,Pe,ut,St,Mt,V,we,pe;function Ge(){zt=new _1(Y),zt.init(),V=new cw(Y,zt),un=new u1(Y,zt,e,V),Ue=new ow(Y,zt),un.reversedDepthBuffer&&x&&Ue.buffers.depth.setReversed(!0),Nn=new y1(Y),N=new WA,M=new lw(Y,zt,Ue,N,un,V,Nn),K=new x1(W),ge=new TE(Y),we=new l1(Y,ge),Te=new v1(Y,ge,Nn,we),Ie=new E1(Y,Te,ge,we,Nn),ut=new S1(Y,un,M),He=new f1(N),Be=new YA(W,K,zt,un,we,He),de=new mw(W,N),re=new $A,ze=new tw(zt),Pe=new o1(W,K,Ue,Ie,T,m),De=new rw(W,Ie,un),pe=new gw(Y,Nn,un,Ue),St=new c1(Y,zt,Nn),Mt=new b1(Y,zt,Nn),Nn.programs=Be.programs,W.capabilities=un,W.extensions=zt,W.properties=N,W.renderLists=re,W.shadowMap=De,W.state=Ue,W.info=Nn}Ge(),O!==Pa&&(F=new T1(O,i.width,i.height,l,c));const Fe=new hw(W,Y);this.xr=Fe,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const w=zt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=zt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(w){w!==void 0&&(Oe=w,this.setSize(Ee,Ne,!1))},this.getSize=function(w){return w.set(Ee,Ne)},this.setSize=function(w,k,ae=!0){if(Fe.isPresenting){Tt("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=w,Ne=k,i.width=Math.floor(w*Oe),i.height=Math.floor(k*Oe),ae===!0&&(i.style.width=w+"px",i.style.height=k+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(Ee*Oe,Ne*Oe).floor()},this.setDrawingBufferSize=function(w,k,ae){Ee=w,Ne=k,Oe=ae,i.width=Math.floor(w*ae),i.height=Math.floor(k*ae),this.setViewport(0,0,w,k)},this.setEffects=function(w){if(O===Pa){cn("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let k=0;k<w.length;k++)if(w[k].isOutputPass===!0){Tt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ce)},this.getViewport=function(w){return w.copy(Re)},this.setViewport=function(w,k,ae,J){w.isVector4?Re.set(w.x,w.y,w.z,w.w):Re.set(w,k,ae,J),Ue.viewport(ce.copy(Re).multiplyScalar(Oe).round())},this.getScissor=function(w){return w.copy(ke)},this.setScissor=function(w,k,ae,J){w.isVector4?ke.set(w.x,w.y,w.z,w.w):ke.set(w,k,ae,J),Ue.scissor(xe.copy(ke).multiplyScalar(Oe).round())},this.getScissorTest=function(){return gt},this.setScissorTest=function(w){Ue.setScissorTest(gt=w)},this.setOpaqueSort=function(w){se=w},this.setTransparentSort=function(w){be=w},this.getClearColor=function(w){return w.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,ae=!0){let J=0;if(w){let te=!1;if($!==null){const ve=$.texture.format;te=E.has(ve)}if(te){const ve=$.texture.type,qe=y.has(ve),Ve=Pe.getClearColor(),Ke=Pe.getClearAlpha(),Ze=Ve.r,ht=Ve.g,Lt=Ve.b;qe?(C[0]=Ze,C[1]=ht,C[2]=Lt,C[3]=Ke,Y.clearBufferuiv(Y.COLOR,0,C)):(I[0]=Ze,I[1]=ht,I[2]=Lt,I[3]=Ke,Y.clearBufferiv(Y.COLOR,0,I))}else J|=Y.COLOR_BUFFER_BIT}k&&(J|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(J|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&Y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Se,!1),i.removeEventListener("webglcontextrestored",et,!1),i.removeEventListener("webglcontextcreationerror",bt,!1),Pe.dispose(),re.dispose(),ze.dispose(),N.dispose(),K.dispose(),Ie.dispose(),we.dispose(),pe.dispose(),Be.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Hr),Fe.removeEventListener("sessionend",_a),ti.stop()};function Se(w){w.preventDefault(),c_("WebGLRenderer: Context Lost."),H=!0}function et(){c_("WebGLRenderer: Context Restored."),H=!1;const w=Nn.autoReset,k=De.enabled,ae=De.autoUpdate,J=De.needsUpdate,te=De.type;Ge(),Nn.autoReset=w,De.enabled=k,De.autoUpdate=ae,De.needsUpdate=J,De.type=te}function bt(w){cn("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function In(w){const k=w.target;k.removeEventListener("dispose",In),Gt(k)}function Gt(w){Bi(w),N.remove(w)}function Bi(w){const k=N.get(w).programs;k!==void 0&&(k.forEach(function(ae){Be.releaseProgram(ae)}),w.isShaderMaterial&&Be.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,ae,J,te,ve){k===null&&(k=Gn);const qe=te.isMesh&&te.matrixWorld.determinant()<0,Ve=za(w,k,ae,J,te);Ue.setMaterial(J,qe);let Ke=ae.index,Ze=1;if(J.wireframe===!0){if(Ke=Te.getWireframeAttribute(ae),Ke===void 0)return;Ze=2}const ht=ae.drawRange,Lt=ae.attributes.position;let ct=ht.start*Ze,pt=(ht.start+ht.count)*Ze;ve!==null&&(ct=Math.max(ct,ve.start*Ze),pt=Math.min(pt,(ve.start+ve.count)*Ze)),Ke!==null?(ct=Math.max(ct,0),pt=Math.min(pt,Ke.count)):Lt!=null&&(ct=Math.max(ct,0),pt=Math.min(pt,Lt.count));const On=pt-ct;if(On<0||On===1/0)return;we.setup(te,J,Ve,ae,Ke);let vn,fn=St;if(Ke!==null&&(vn=ge.get(Ke),fn=Mt,fn.setIndex(vn)),te.isMesh)J.wireframe===!0?(Ue.setLineWidth(J.wireframeLinewidth*ui()),fn.setMode(Y.LINES)):fn.setMode(Y.TRIANGLES);else if(te.isLine){let Vt=J.linewidth;Vt===void 0&&(Vt=1),Ue.setLineWidth(Vt*ui()),te.isLineSegments?fn.setMode(Y.LINES):te.isLineLoop?fn.setMode(Y.LINE_LOOP):fn.setMode(Y.LINE_STRIP)}else te.isPoints?fn.setMode(Y.POINTS):te.isSprite&&fn.setMode(Y.TRIANGLES);if(te.isBatchedMesh)if(zt.get("WEBGL_multi_draw"))fn.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Vt=te._multiDrawStarts,We=te._multiDrawCounts,ii=te._multiDrawCount,Ct=Ke?ge.get(Ke).bytesPerElement:1,Zn=N.get(J).currentProgram.getUniforms();for(let Gi=0;Gi<ii;Gi++)Zn.setValue(Y,"_gl_DrawID",Gi),fn.render(Vt[Gi]/Ct,We[Gi])}else if(te.isInstancedMesh)fn.renderInstances(ct,On,te.count);else if(ae.isInstancedBufferGeometry){const Vt=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,We=Math.min(ae.instanceCount,Vt);fn.renderInstances(ct,On,We)}else fn.render(ct,On)};function zi(w,k,ae){w.transparent===!0&&w.side===Vs&&w.forceSinglePass===!1?(w.side=ia,w.needsUpdate=!0,Ba(w,k,ae),w.side=Br,w.needsUpdate=!0,Ba(w,k,ae),w.side=Vs):Ba(w,k,ae)}this.compile=function(w,k,ae=null){ae===null&&(ae=w),L=ze.get(ae),L.init(k),A.push(L),ae.traverseVisible(function(te){te.isLight&&te.layers.test(k.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),w!==ae&&w.traverseVisible(function(te){te.isLight&&te.layers.test(k.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),L.setupLights();const J=new Set;return w.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const ve=te.material;if(ve)if(Array.isArray(ve))for(let qe=0;qe<ve.length;qe++){const Ve=ve[qe];zi(Ve,ae,te),J.add(Ve)}else zi(ve,ae,te),J.add(ve)}),L=A.pop(),J},this.compileAsync=function(w,k,ae=null){const J=this.compile(w,k,ae);return new Promise(te=>{function ve(){if(J.forEach(function(qe){N.get(qe).currentProgram.isReady()&&J.delete(qe)}),J.size===0){te(w);return}setTimeout(ve,10)}zt.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let fi=null;function Ka(w){fi&&fi(w)}function Hr(){ti.stop()}function _a(){ti.start()}const ti=new rb;ti.setAnimationLoop(Ka),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(w){fi=w,Fe.setAnimationLoop(w),w===null?ti.stop():ti.start()},Fe.addEventListener("sessionstart",Hr),Fe.addEventListener("sessionend",_a),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){cn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;q!==null&&q.renderStart(w,k);const ae=Fe.enabled===!0&&Fe.isPresenting===!0,J=F!==null&&($===null||ae)&&F.begin(W,$);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(k),k=Fe.getCamera()),w.isScene===!0&&w.onBeforeRender(W,w,k,$),L=ze.get(w,A.length),L.init(k),L.state.textureUnits=M.getTextureUnits(),A.push(L),Yt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),it.setFromProjectionMatrix(Yt,cs,k.reversedDepth),kt=this.localClippingEnabled,_n=He.init(this.clippingPlanes,kt),j=re.get(w,G.length),j.init(),G.push(j),Fe.enabled===!0&&Fe.isPresenting===!0){const qe=W.xr.getDepthSensingMesh();qe!==null&&Zt(qe,k,-1/0,W.sortObjects)}Zt(w,k,0,W.sortObjects),j.finish(),W.sortObjects===!0&&j.sort(se,be),At=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,At&&Pe.addToRenderList(j,w),this.info.render.frame++,_n===!0&&He.beginShadows();const te=L.state.shadowsArray;if(De.render(te,w,k),_n===!0&&He.endShadows(),this.info.autoReset===!0&&this.info.reset(),(J&&F.hasRenderPass())===!1){const qe=j.opaque,Ve=j.transmissive;if(L.setupLights(),k.isArrayCamera){const Ke=k.cameras;if(Ve.length>0)for(let Ze=0,ht=Ke.length;Ze<ht;Ze++){const Lt=Ke[Ze];Vn(qe,Ve,w,Lt)}At&&Pe.render(w);for(let Ze=0,ht=Ke.length;Ze<ht;Ze++){const Lt=Ke[Ze];ni(j,w,Lt,Lt.viewport)}}else Ve.length>0&&Vn(qe,Ve,w,k),At&&Pe.render(w),ni(j,w,k)}$!==null&&he===0&&(M.updateMultisampleRenderTarget($),M.updateRenderTargetMipmap($)),J&&F.end(W),w.isScene===!0&&w.onAfterRender(W,w,k),we.resetDefaultState(),D=-1,z=null,A.pop(),A.length>0?(L=A[A.length-1],M.setTextureUnits(L.state.textureUnits),_n===!0&&He.setGlobalState(W.clippingPlanes,L.state.camera)):L=null,G.pop(),G.length>0?j=G[G.length-1]:j=null,q!==null&&q.renderEnd()};function Zt(w,k,ae,J){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)ae=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLightProbeGrid)L.pushLightProbeGrid(w);else if(w.isLight)L.pushLight(w),w.castShadow&&L.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||it.intersectsSprite(w)){J&&xt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Yt);const qe=Ie.update(w),Ve=w.material;Ve.visible&&j.push(w,qe,Ve,ae,xt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||it.intersectsObject(w))){const qe=Ie.update(w),Ve=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),xt.copy(w.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),xt.copy(qe.boundingSphere.center)),xt.applyMatrix4(w.matrixWorld).applyMatrix4(Yt)),Array.isArray(Ve)){const Ke=qe.groups;for(let Ze=0,ht=Ke.length;Ze<ht;Ze++){const Lt=Ke[Ze],ct=Ve[Lt.materialIndex];ct&&ct.visible&&j.push(w,qe,ct,ae,xt.z,Lt)}}else Ve.visible&&j.push(w,qe,Ve,ae,xt.z,null)}}const ve=w.children;for(let qe=0,Ve=ve.length;qe<Ve;qe++)Zt(ve[qe],k,ae,J)}function ni(w,k,ae,J){const{opaque:te,transmissive:ve,transparent:qe}=w;L.setupLightsView(ae),_n===!0&&He.setGlobalState(W.clippingPlanes,ae),J&&Ue.viewport(ce.copy(J)),te.length>0&&aa(te,k,ae),ve.length>0&&aa(ve,k,ae),qe.length>0&&aa(qe,k,ae),Ue.buffers.depth.setTest(!0),Ue.buffers.depth.setMask(!0),Ue.buffers.color.setMask(!0),Ue.setPolygonOffset(!1)}function Vn(w,k,ae,J){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[J.id]===void 0){const ct=zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[J.id]=new fs(1,1,{generateMipmaps:!0,type:ct?Ws:Pa,minFilter:mo,samples:Math.max(4,un.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:on.workingColorSpace})}const ve=L.state.transmissionRenderTarget[J.id],qe=J.viewport||ce;ve.setSize(qe.z*W.transmissionResolutionScale,qe.w*W.transmissionResolutionScale);const Ve=W.getRenderTarget(),Ke=W.getActiveCubeFace(),Ze=W.getActiveMipmapLevel();W.setRenderTarget(ve),W.getClearColor(P),Q=W.getClearAlpha(),Q<1&&W.setClearColor(16777215,.5),W.clear(),At&&Pe.render(ae);const ht=W.toneMapping;W.toneMapping=us;const Lt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),L.setupLightsView(J),_n===!0&&He.setGlobalState(W.clippingPlanes,J),aa(w,ae,J),M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve),zt.has("WEBGL_multisampled_render_to_texture")===!1){let ct=!1;for(let pt=0,On=k.length;pt<On;pt++){const vn=k[pt],{object:fn,geometry:Vt,material:We,group:ii}=vn;if(We.side===Vs&&fn.layers.test(J.layers)){const Ct=We.side;We.side=ia,We.needsUpdate=!0,yo(fn,ae,J,Vt,We,ii),We.side=Ct,We.needsUpdate=!0,ct=!0}}ct===!0&&(M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve))}W.setRenderTarget(Ve,Ke,Ze),W.setClearColor(P,Q),Lt!==void 0&&(J.viewport=Lt),W.toneMapping=ht}function aa(w,k,ae){const J=k.isScene===!0?k.overrideMaterial:null;for(let te=0,ve=w.length;te<ve;te++){const qe=w[te],{object:Ve,geometry:Ke,group:Ze}=qe;let ht=qe.material;ht.allowOverride===!0&&J!==null&&(ht=J),Ve.layers.test(ae.layers)&&yo(Ve,k,ae,Ke,ht,Ze)}}function yo(w,k,ae,J,te,ve){w.onBeforeRender(W,k,ae,J,te,ve),w.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),te.onBeforeRender(W,k,ae,J,w,ve),te.transparent===!0&&te.side===Vs&&te.forceSinglePass===!1?(te.side=ia,te.needsUpdate=!0,W.renderBufferDirect(ae,k,J,te,w,ve),te.side=Br,te.needsUpdate=!0,W.renderBufferDirect(ae,k,J,te,w,ve),te.side=Vs):W.renderBufferDirect(ae,k,J,te,w,ve),w.onAfterRender(W,k,ae,J,te,ve)}function Ba(w,k,ae){k.isScene!==!0&&(k=Gn);const J=N.get(w),te=L.state.lights,ve=L.state.shadowsArray,qe=te.state.version,Ve=Be.getParameters(w,te.state,ve,k,ae,L.state.lightProbeGridArray),Ke=Be.getProgramCacheKey(Ve);let Ze=J.programs;J.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,J.fog=k.fog;const ht=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;J.envMap=K.get(w.envMap||J.environment,ht),J.envMapRotation=J.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Ze===void 0&&(w.addEventListener("dispose",In),Ze=new Map,J.programs=Ze);let Lt=Ze.get(Ke);if(Lt!==void 0){if(J.currentProgram===Lt&&J.lightsStateVersion===qe)return Za(w,Ve),Lt}else Ve.uniforms=Be.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,ae,Ve),w.onBeforeCompile(Ve,W),Lt=Be.acquireProgram(Ve,Ke),Ze.set(Ke,Lt),J.uniforms=Ve.uniforms;const ct=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ct.clippingPlanes=He.uniform),Za(w,Ve),J.needsLights=Qa(w),J.lightsStateVersion=qe,J.needsLights&&(ct.ambientLightColor.value=te.state.ambient,ct.lightProbe.value=te.state.probe,ct.directionalLights.value=te.state.directional,ct.directionalLightShadows.value=te.state.directionalShadow,ct.spotLights.value=te.state.spot,ct.spotLightShadows.value=te.state.spotShadow,ct.rectAreaLights.value=te.state.rectArea,ct.ltc_1.value=te.state.rectAreaLTC1,ct.ltc_2.value=te.state.rectAreaLTC2,ct.pointLights.value=te.state.point,ct.pointLightShadows.value=te.state.pointShadow,ct.hemisphereLights.value=te.state.hemi,ct.directionalShadowMatrix.value=te.state.directionalShadowMatrix,ct.spotLightMatrix.value=te.state.spotLightMatrix,ct.spotLightMap.value=te.state.spotLightMap,ct.pointShadowMatrix.value=te.state.pointShadowMatrix),J.lightProbeGrid=L.state.lightProbeGridArray.length>0,J.currentProgram=Lt,J.uniformsList=null,Lt}function So(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Mf.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Za(w,k){const ae=N.get(w);ae.outputColorSpace=k.outputColorSpace,ae.batching=k.batching,ae.batchingColor=k.batchingColor,ae.instancing=k.instancing,ae.instancingColor=k.instancingColor,ae.instancingMorph=k.instancingMorph,ae.skinning=k.skinning,ae.morphTargets=k.morphTargets,ae.morphNormals=k.morphNormals,ae.morphColors=k.morphColors,ae.morphTargetsCount=k.morphTargetsCount,ae.numClippingPlanes=k.numClippingPlanes,ae.numIntersection=k.numClipIntersection,ae.vertexAlphas=k.vertexAlphas,ae.vertexTangents=k.vertexTangents,ae.toneMapping=k.toneMapping}function xs(w,k){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;U.setFromMatrixPosition(k.matrixWorld);for(let ae=0,J=w.length;ae<J;ae++){const te=w[ae];if(te.texture!==null&&te.boundingBox.containsPoint(U))return te}return null}function za(w,k,ae,J,te){k.isScene!==!0&&(k=Gn),M.resetTextureUnits();const ve=k.fog,qe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?k.environment:null,Ve=$===null?W.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:on.workingColorSpace,Ke=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Ze=K.get(J.envMap||qe,Ke),ht=J.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,Lt=!!ae.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),ct=!!ae.morphAttributes.position,pt=!!ae.morphAttributes.normal,On=!!ae.morphAttributes.color;let vn=us;J.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(vn=W.toneMapping);const fn=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Vt=fn!==void 0?fn.length:0,We=N.get(J),ii=L.state.lights;if(_n===!0&&(kt===!0||w!==z)){const qt=w===z&&J.id===D;He.setState(J,w,qt)}let Ct=!1;J.version===We.__version?(We.needsLights&&We.lightsStateVersion!==ii.state.version||We.outputColorSpace!==Ve||te.isBatchedMesh&&We.batching===!1||!te.isBatchedMesh&&We.batching===!0||te.isBatchedMesh&&We.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&We.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&We.instancing===!1||!te.isInstancedMesh&&We.instancing===!0||te.isSkinnedMesh&&We.skinning===!1||!te.isSkinnedMesh&&We.skinning===!0||te.isInstancedMesh&&We.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&We.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&We.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&We.instancingMorph===!1&&te.morphTexture!==null||We.envMap!==Ze||J.fog===!0&&We.fog!==ve||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==He.numPlanes||We.numIntersection!==He.numIntersection)||We.vertexAlphas!==ht||We.vertexTangents!==Lt||We.morphTargets!==ct||We.morphNormals!==pt||We.morphColors!==On||We.toneMapping!==vn||We.morphTargetsCount!==Vt||!!We.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Ct=!0):(Ct=!0,We.__version=J.version);let Zn=We.currentProgram;Ct===!0&&(Zn=Ba(J,k,te),q&&J.isNodeMaterial&&q.onUpdateProgram(J,Zn,We));let Gi=!1,Yn=!1,Pn=!1;const sn=Zn.getUniforms(),Un=We.uniforms;if(Ue.useProgram(Zn.program)&&(Gi=!0,Yn=!0,Pn=!0),J.id!==D&&(D=J.id,Yn=!0),We.needsLights){const qt=xs(L.state.lightProbeGridArray,te);We.lightProbeGrid!==qt&&(We.lightProbeGrid=qt,Yn=!0)}if(Gi||z!==w){Ue.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),sn.setValue(Y,"projectionMatrix",w.projectionMatrix),sn.setValue(Y,"viewMatrix",w.matrixWorldInverse);const Wn=sn.map.cameraPosition;Wn!==void 0&&Wn.setValue(Y,mn.setFromMatrixPosition(w.matrixWorld)),un.logarithmicDepthBuffer&&sn.setValue(Y,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&sn.setValue(Y,"isOrthographic",w.isOrthographicCamera===!0),z!==w&&(z=w,Yn=!0,Pn=!0)}if(We.needsLights&&(ii.state.directionalShadowMap.length>0&&sn.setValue(Y,"directionalShadowMap",ii.state.directionalShadowMap,M),ii.state.spotShadowMap.length>0&&sn.setValue(Y,"spotShadowMap",ii.state.spotShadowMap,M),ii.state.pointShadowMap.length>0&&sn.setValue(Y,"pointShadowMap",ii.state.pointShadowMap,M)),te.isSkinnedMesh){sn.setOptional(Y,te,"bindMatrix"),sn.setOptional(Y,te,"bindMatrixInverse");const qt=te.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),sn.setValue(Y,"boneTexture",qt.boneTexture,M))}te.isBatchedMesh&&(sn.setOptional(Y,te,"batchingTexture"),sn.setValue(Y,"batchingTexture",te._matricesTexture,M),sn.setOptional(Y,te,"batchingIdTexture"),sn.setValue(Y,"batchingIdTexture",te._indirectTexture,M),sn.setOptional(Y,te,"batchingColorTexture"),te._colorsTexture!==null&&sn.setValue(Y,"batchingColorTexture",te._colorsTexture,M));const Yi=ae.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&ut.update(te,ae,Zn),(Yn||We.receiveShadow!==te.receiveShadow)&&(We.receiveShadow=te.receiveShadow,sn.setValue(Y,"receiveShadow",te.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&k.environment!==null&&(Un.envMapIntensity.value=k.environmentIntensity),Un.dfgLUT!==void 0&&(Un.dfgLUT.value=_w()),Yn){if(sn.setValue(Y,"toneMappingExposure",W.toneMappingExposure),We.needsLights&&va(Un,Pn),ve&&J.fog===!0&&de.refreshFogUniforms(Un,ve),de.refreshMaterialUniforms(Un,J,Oe,Ne,L.state.transmissionRenderTarget[w.id]),We.needsLights&&We.lightProbeGrid){const qt=We.lightProbeGrid;Un.probesSH.value=qt.texture,Un.probesMin.value.copy(qt.boundingBox.min),Un.probesMax.value.copy(qt.boundingBox.max),Un.probesResolution.value.copy(qt.resolution)}Mf.upload(Y,So(We),Un,M)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Mf.upload(Y,So(We),Un,M),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&sn.setValue(Y,"center",te.center),sn.setValue(Y,"modelViewMatrix",te.modelViewMatrix),sn.setValue(Y,"normalMatrix",te.normalMatrix),sn.setValue(Y,"modelMatrix",te.matrixWorld),J.uniformsGroups!==void 0){const qt=J.uniformsGroups;for(let Wn=0,_s=qt.length;Wn<_s;Wn++){const $s=qt[Wn];pe.update($s,Zn),pe.bind($s,Zn)}}return Zn}function va(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Qa(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return fe},this.getActiveMipmapLevel=function(){return he},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(w,k,ae){const J=N.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),N.get(w.texture).__webglTexture=k,N.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ae,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){const ae=N.get(w);ae.__webglFramebuffer=k,ae.__useDefaultFramebuffer=k===void 0};const Xi=Y.createFramebuffer();this.setRenderTarget=function(w,k=0,ae=0){$=w,fe=k,he=ae;let J=null,te=!1,ve=!1;if(w){const Ve=N.get(w);if(Ve.__useDefaultFramebuffer!==void 0){Ue.bindFramebuffer(Y.FRAMEBUFFER,Ve.__webglFramebuffer),ce.copy(w.viewport),xe.copy(w.scissor),Ae=w.scissorTest,Ue.viewport(ce),Ue.scissor(xe),Ue.setScissorTest(Ae),D=-1;return}else if(Ve.__webglFramebuffer===void 0)M.setupRenderTarget(w);else if(Ve.__hasExternalTextures)M.rebindTextures(w,N.get(w.texture).__webglTexture,N.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ht=w.depthTexture;if(Ve.__boundDepthTexture!==ht){if(ht!==null&&N.has(ht)&&(w.width!==ht.image.width||w.height!==ht.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(w)}}const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(ve=!0);const Ze=N.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ze[k])?J=Ze[k][ae]:J=Ze[k],te=!0):w.samples>0&&M.useMultisampledRTT(w)===!1?J=N.get(w).__webglMultisampledFramebuffer:Array.isArray(Ze)?J=Ze[ae]:J=Ze,ce.copy(w.viewport),xe.copy(w.scissor),Ae=w.scissorTest}else ce.copy(Re).multiplyScalar(Oe).floor(),xe.copy(ke).multiplyScalar(Oe).floor(),Ae=gt;if(ae!==0&&(J=Xi),Ue.bindFramebuffer(Y.FRAMEBUFFER,J)&&Ue.drawBuffers(w,J),Ue.viewport(ce),Ue.scissor(xe),Ue.setScissorTest(Ae),te){const Ve=N.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ve.__webglTexture,ae)}else if(ve){const Ve=k;for(let Ke=0;Ke<w.textures.length;Ke++){const Ze=N.get(w.textures[Ke]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Ke,Ze.__webglTexture,ae,Ve)}}else if(w!==null&&ae!==0){const Ve=N.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ve.__webglTexture,ae)}D=-1},this.readRenderTargetPixels=function(w,k,ae,J,te,ve,qe,Ve=0){if(!(w&&w.isWebGLRenderTarget)){cn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=N.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&qe!==void 0&&(Ke=Ke[qe]),Ke){Ue.bindFramebuffer(Y.FRAMEBUFFER,Ke);try{const Ze=w.textures[Ve],ht=Ze.format,Lt=Ze.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ve),!un.textureFormatReadable(ht)){cn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!un.textureTypeReadable(Lt)){cn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-J&&ae>=0&&ae<=w.height-te&&Y.readPixels(k,ae,J,te,V.convert(ht),V.convert(Lt),ve)}finally{const Ze=$!==null?N.get($).__webglFramebuffer:null;Ue.bindFramebuffer(Y.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(w,k,ae,J,te,ve,qe,Ve=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ke=N.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&qe!==void 0&&(Ke=Ke[qe]),Ke)if(k>=0&&k<=w.width-J&&ae>=0&&ae<=w.height-te){Ue.bindFramebuffer(Y.FRAMEBUFFER,Ke);const Ze=w.textures[Ve],ht=Ze.format,Lt=Ze.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ve),!un.textureFormatReadable(ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!un.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ct=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,ct),Y.bufferData(Y.PIXEL_PACK_BUFFER,ve.byteLength,Y.STREAM_READ),Y.readPixels(k,ae,J,te,V.convert(ht),V.convert(Lt),0);const pt=$!==null?N.get($).__webglFramebuffer:null;Ue.bindFramebuffer(Y.FRAMEBUFFER,pt);const On=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await PS(Y,On,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,ct),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,ve),Y.deleteBuffer(ct),Y.deleteSync(On),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,ae=0){const J=Math.pow(2,-ae),te=Math.floor(w.image.width*J),ve=Math.floor(w.image.height*J),qe=k!==null?k.x:0,Ve=k!==null?k.y:0;M.setTexture2D(w,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ae,0,0,qe,Ve,te,ve),Ue.unbindTexture()};const jn=Y.createFramebuffer(),Cl=Y.createFramebuffer();this.copyTextureToTexture=function(w,k,ae=null,J=null,te=0,ve=0){let qe,Ve,Ke,Ze,ht,Lt,ct,pt,On;const vn=w.isCompressedTexture?w.mipmaps[ve]:w.image;if(ae!==null)qe=ae.max.x-ae.min.x,Ve=ae.max.y-ae.min.y,Ke=ae.isBox3?ae.max.z-ae.min.z:1,Ze=ae.min.x,ht=ae.min.y,Lt=ae.isBox3?ae.min.z:0;else{const Un=Math.pow(2,-te);qe=Math.floor(vn.width*Un),Ve=Math.floor(vn.height*Un),w.isDataArrayTexture?Ke=vn.depth:w.isData3DTexture?Ke=Math.floor(vn.depth*Un):Ke=1,Ze=0,ht=0,Lt=0}J!==null?(ct=J.x,pt=J.y,On=J.z):(ct=0,pt=0,On=0);const fn=V.convert(k.format),Vt=V.convert(k.type);let We;k.isData3DTexture?(M.setTexture3D(k,0),We=Y.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(M.setTexture2DArray(k,0),We=Y.TEXTURE_2D_ARRAY):(M.setTexture2D(k,0),We=Y.TEXTURE_2D),Ue.activeTexture(Y.TEXTURE0),Ue.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,k.flipY),Ue.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),Ue.pixelStorei(Y.UNPACK_ALIGNMENT,k.unpackAlignment);const ii=Ue.getParameter(Y.UNPACK_ROW_LENGTH),Ct=Ue.getParameter(Y.UNPACK_IMAGE_HEIGHT),Zn=Ue.getParameter(Y.UNPACK_SKIP_PIXELS),Gi=Ue.getParameter(Y.UNPACK_SKIP_ROWS),Yn=Ue.getParameter(Y.UNPACK_SKIP_IMAGES);Ue.pixelStorei(Y.UNPACK_ROW_LENGTH,vn.width),Ue.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,vn.height),Ue.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ze),Ue.pixelStorei(Y.UNPACK_SKIP_ROWS,ht),Ue.pixelStorei(Y.UNPACK_SKIP_IMAGES,Lt);const Pn=w.isDataArrayTexture||w.isData3DTexture,sn=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){const Un=N.get(w),Yi=N.get(k),qt=N.get(Un.__renderTarget),Wn=N.get(Yi.__renderTarget);Ue.bindFramebuffer(Y.READ_FRAMEBUFFER,qt.__webglFramebuffer),Ue.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let _s=0;_s<Ke;_s++)Pn&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,N.get(w).__webglTexture,te,Lt+_s),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,N.get(k).__webglTexture,ve,On+_s)),Y.blitFramebuffer(Ze,ht,qe,Ve,ct,pt,qe,Ve,Y.DEPTH_BUFFER_BIT,Y.NEAREST);Ue.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(te!==0||w.isRenderTargetTexture||N.has(w)){const Un=N.get(w),Yi=N.get(k);Ue.bindFramebuffer(Y.READ_FRAMEBUFFER,jn),Ue.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Cl);for(let qt=0;qt<Ke;qt++)Pn?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Un.__webglTexture,te,Lt+qt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Un.__webglTexture,te),sn?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Yi.__webglTexture,ve,On+qt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Yi.__webglTexture,ve),te!==0?Y.blitFramebuffer(Ze,ht,qe,Ve,ct,pt,qe,Ve,Y.COLOR_BUFFER_BIT,Y.NEAREST):sn?Y.copyTexSubImage3D(We,ve,ct,pt,On+qt,Ze,ht,qe,Ve):Y.copyTexSubImage2D(We,ve,ct,pt,Ze,ht,qe,Ve);Ue.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ue.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else sn?w.isDataTexture||w.isData3DTexture?Y.texSubImage3D(We,ve,ct,pt,On,qe,Ve,Ke,fn,Vt,vn.data):k.isCompressedArrayTexture?Y.compressedTexSubImage3D(We,ve,ct,pt,On,qe,Ve,Ke,fn,vn.data):Y.texSubImage3D(We,ve,ct,pt,On,qe,Ve,Ke,fn,Vt,vn):w.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,ve,ct,pt,qe,Ve,fn,Vt,vn.data):w.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,ve,ct,pt,vn.width,vn.height,fn,vn.data):Y.texSubImage2D(Y.TEXTURE_2D,ve,ct,pt,qe,Ve,fn,Vt,vn);Ue.pixelStorei(Y.UNPACK_ROW_LENGTH,ii),Ue.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Ct),Ue.pixelStorei(Y.UNPACK_SKIP_PIXELS,Zn),Ue.pixelStorei(Y.UNPACK_SKIP_ROWS,Gi),Ue.pixelStorei(Y.UNPACK_SKIP_IMAGES,Yn),ve===0&&k.generateMipmaps&&Y.generateMipmap(We),Ue.unbindTexture()},this.initRenderTarget=function(w){N.get(w).__webglFramebuffer===void 0&&M.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?M.setTextureCube(w,0):w.isData3DTexture?M.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?M.setTexture2DArray(w,0):M.setTexture2D(w,0),Ue.unbindTexture()},this.resetState=function(){fe=0,he=0,$=null,Ue.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cs}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=on._getDrawingBufferColorSpace(e),i.unpackColorSpace=on._getUnpackColorSpace()}}const ev={type:"change"},wm={type:"start"},pb={type:"end"},mf=new Jv,tv=new Lr,bw=Math.cos(70*zS.DEG2RAD),pi=new ee,na=2*Math.PI,Rn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pp=1e-6;class yw extends EE{constructor(e,i=null){super(e,i),this.state=Rn.NONE,this.target=new ee,this.cursor=new ee,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bl.ROTATE,MIDDLE:bl.DOLLY,RIGHT:bl.PAN},this.touches={ONE:vl.ROTATE,TWO:vl.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ee,this._lastQuaternion=new zr,this._lastTargetPosition=new ee,this._quat=new zr().setFromUnitVectors(e.up,new ee(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new R_,this._sphericalDelta=new R_,this._scale=1,this._panOffset=new ee,this._rotateStart=new Wt,this._rotateEnd=new Wt,this._rotateDelta=new Wt,this._panStart=new Wt,this._panEnd=new Wt,this._panDelta=new Wt,this._dollyStart=new Wt,this._dollyEnd=new Wt,this._dollyDelta=new Wt,this._dollyDirection=new ee,this._mouse=new Wt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ew.bind(this),this._onPointerDown=Sw.bind(this),this._onPointerUp=Mw.bind(this),this._onContextMenu=Ow.bind(this),this._onMouseWheel=ww.bind(this),this._onKeyDown=Rw.bind(this),this._onTouchStart=Cw.bind(this),this._onTouchMove=Nw.bind(this),this._onMouseDown=Tw.bind(this),this._onMouseMove=Aw.bind(this),this._interceptControlDown=Dw.bind(this),this._interceptControlUp=Lw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ev),this.update(),this.state=Rn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;pi.copy(i).sub(this.target),pi.applyQuaternion(this._quat),this._spherical.setFromVector3(pi),this.autoRotate&&this.state===Rn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=na:s>Math.PI&&(s-=na),l<-Math.PI?l+=na:l>Math.PI&&(l-=na),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(pi.setFromSpherical(this._spherical),pi.applyQuaternion(this._quatInverse),i.copy(this.target).add(pi),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=pi.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ee(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ee(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=pi.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(mf.origin.copy(this.object.position),mf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(mf.direction))<bw?this.object.lookAt(this.target):(tv.setFromNormalAndCoplanarPoint(this.object.up,this.target),mf.intersectPlane(tv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>pp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pp||this._lastTargetPosition.distanceToSquared(this.target)>pp?(this.dispatchEvent(ev),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?na/60*this.autoRotateSpeed*e:na/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){pi.setFromMatrixColumn(i,0),pi.multiplyScalar(-e),this._panOffset.add(pi)}_panUp(e,i){this.screenSpacePanning===!0?pi.setFromMatrixColumn(i,1):(pi.setFromMatrixColumn(i,0),pi.crossVectors(this.object.up,pi)),pi.multiplyScalar(e),this._panOffset.add(pi)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;pi.copy(l).sub(this.target);let c=pi.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(na*this._rotateDelta.x/i.clientHeight),this._rotateUp(na*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-na*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(na*this._rotateDelta.x/i.clientHeight),this._rotateUp(na*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Wt,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function Sw(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Ew(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Mw(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pb),this.state=Rn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function Tw(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bl.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Rn.DOLLY;break;case bl.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Rn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Rn.ROTATE}break;case bl.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Rn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Rn.PAN}break;default:this.state=Rn.NONE}this.state!==Rn.NONE&&this.dispatchEvent(wm)}function Aw(r){switch(this.state){case Rn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Rn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function ww(r){this.enabled===!1||this.enableZoom===!1||this.state!==Rn.NONE||(r.preventDefault(),this.dispatchEvent(wm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(pb))}function Rw(r){this.enabled!==!1&&this._handleKeyDown(r)}function Cw(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case vl.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Rn.TOUCH_ROTATE;break;case vl.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Rn.TOUCH_PAN;break;default:this.state=Rn.NONE}break;case 2:switch(this.touches.TWO){case vl.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Rn.TOUCH_DOLLY_PAN;break;case vl.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Rn.TOUCH_DOLLY_ROTATE;break;default:this.state=Rn.NONE}break;default:this.state=Rn.NONE}this.state!==Rn.NONE&&this.dispatchEvent(wm)}function Nw(r){switch(this._trackPointer(r),this.state){case Rn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Rn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Rn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Rn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Rn.NONE}}function Ow(r){this.enabled!==!1&&r.preventDefault()}function Dw(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lw(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Uw=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Iw=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),nv=r=>{const e=Iw(r);return e.charAt(0).toUpperCase()+e.slice(1)},mb=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),Pw=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var Fw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Bw=Ce.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>Ce.createElement("svg",{ref:m,...Fw,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:mb("lucide",l),...!c&&!Pw(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,_])=>Ce.createElement(p,_)),...Array.isArray(c)?c:[c]]));const ci=(r,e)=>{const i=Ce.forwardRef(({className:s,...l},c)=>Ce.createElement(Bw,{ref:c,iconNode:e,className:mb(`lucide-${Uw(nv(r))}`,`lucide-${r}`,s),...l}));return i.displayName=nv(r),i};const zw=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Sc=ci("arrow-right",zw);const Gw=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],cm=ci("brain-circuit",Gw);const Hw=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],kw=ci("camera",Hw);const Vw=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],xl=ci("check",Vw);const jw=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],iv=ci("chevron-down",jw);const Xw=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ma=ci("circle-check",Xw);const Yw=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Ec=ci("copy",Yw);const Ww=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],av=ci("download",Ww);const qw=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],$w=ci("file-text",qw);const Kw=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Mc=ci("globe",Kw);const Zw=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],sv=ci("image",Zw);const Qw=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ua=ci("loader-circle",Qw);const Jw=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],eR=ci("plus",Jw);const tR=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],rv=ci("refresh-cw",tR);const nR=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],ov=ci("sparkles",nR);const iR=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],aR=ci("square",iR);const sR=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],mp=ci("trash-2",sR);const rR=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],lv=ci("triangle-alert",rR);const oR=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],gp=ci("wand-sparkles",oR);const lR=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Tf=ci("zap",lR);var cv;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(cv||(cv={}));var uv;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(uv||(uv={}));var fv;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(fv||(fv={}));const dv=["user","model","function","system"];var hv;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(hv||(hv={}));var pv;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(pv||(pv={}));var mv;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(mv||(mv={}));var gv;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(gv||(gv={}));var wc;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(wc||(wc={}));var xv;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(xv||(xv={}));var _v;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(_v||(_v={}));var vv;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(vv||(vv={}));class Ii extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class _l extends Ii{constructor(e,i){super(e),this.response=i}}class gb extends Ii{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class Fr extends Ii{}class xb extends Ii{}const cR="https://generativelanguage.googleapis.com",uR="v1beta",fR="0.24.1",dR="genai-js";var bo;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(bo||(bo={}));class hR{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||uR;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||cR}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function pR(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${dR}/${fR}`),e.join(" ")}async function mR(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",pR(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new Fr(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new Fr(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new Fr(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function gR(r,e,i,s,l,c){const f=new hR(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},bR(c)),{method:"POST",headers:await mR(f),body:l})}}async function Pc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await gR(r,e,i,s,l,c);return xR(h,m,f)}async function xR(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){_R(l,r)}return s.ok||await vR(s,r),s}function _R(r,e){let i=r;throw i.name==="AbortError"?(i=new xb(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof gb||r instanceof Fr||(i=new Ii(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function vR(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new gb(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function bR(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function Rm(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Af(r.candidates[0]))throw new _l(`${Ur(r)}`,r);return yR(r)}else if(r.promptFeedback)throw new _l(`Text not available. ${Ur(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Af(r.candidates[0]))throw new _l(`${Ur(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),bv(r)[0]}else if(r.promptFeedback)throw new _l(`Function call not available. ${Ur(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Af(r.candidates[0]))throw new _l(`${Ur(r)}`,r);return bv(r)}else if(r.promptFeedback)throw new _l(`Function call not available. ${Ur(r)}`,r)},r}function yR(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function bv(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const SR=[wc.RECITATION,wc.SAFETY,wc.LANGUAGE];function Af(r){return!!r.finishReason&&SR.includes(r.finishReason)}function Ur(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];Af(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Oc(r){return this instanceof Oc?(this.v=r,this):new Oc(r)}function ER(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(x){s[x]&&(l[x]=function(S){return new Promise(function(T,O){c.push([x,S,T,O])>1||h(x,S)})})}function h(x,S){try{m(s[x](S))}catch(T){b(c[0][3],T)}}function m(x){x.value instanceof Oc?Promise.resolve(x.value.v).then(p,_):b(c[0][2],x)}function p(x){h("next",x)}function _(x){h("throw",x)}function b(x,S){x(S),c.shift(),c.length&&h(c[0][0],c[0][1])}}const yv=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function MR(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=wR(e),[s,l]=i.tee();return{stream:AR(s),response:TR(l)}}async function TR(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return Rm(RR(e));e.push(l)}}function AR(r){return ER(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Oc(i.read());if(l)break;yield yield Oc(Rm(s))}})}function wR(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new Ii("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(yv),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new Ii(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(yv)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new xb("Request aborted when reading from the stream"):h=new Ii("Error reading from the stream"),h})}}})}function RR(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function _b(r,e,i,s){const l=await Pc(e,bo.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return MR(l)}async function vb(r,e,i,s){const c=await(await Pc(e,bo.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:Rm(c)}}function bb(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Dc(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return CR(e)}function CR(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new Ii("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new Ii("No content is provided for sending chat message.");return s?e:i}function NR(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new Fr("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=Dc(r);s.contents=[c]}return{generateContentRequest:s}}function Sv(r){let e;return r.contents?e=r:e={contents:[Dc(r)]},r.systemInstruction&&(e.systemInstruction=bb(r.systemInstruction)),e}function OR(r){return typeof r=="string"||Array.isArray(r)?{content:Dc(r)}:r}const Ev=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],DR={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function LR(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new Ii(`First content should be with role 'user', got ${s}`);if(!dv.includes(s))throw new Ii(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(dv)}`);if(!Array.isArray(l))throw new Ii("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new Ii("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of Ev)m in h&&(c[m]+=1);const f=DR[s];for(const h of Ev)if(!f.includes(h)&&c[h]>0)throw new Ii(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function Mv(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const Tv="SILENT_ERROR";class UR{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(LR(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Dc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},b=Object.assign(Object.assign({},this._requestOptions),i);let x;return this._sendPromise=this._sendPromise.then(()=>vb(this._apiKey,this.model,_,b)).then(S=>{var T;if(Mv(S.response)){this._history.push(p);const O=Object.assign({parts:[],role:"model"},(T=S.response.candidates)===null||T===void 0?void 0:T[0].content);this._history.push(O)}else{const O=Ur(S.response);O&&console.warn(`sendMessage() was unsuccessful. ${O}. Inspect response object for details.`)}x=S}).catch(S=>{throw this._sendPromise=Promise.resolve(),S}),await this._sendPromise,x}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Dc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},b=Object.assign(Object.assign({},this._requestOptions),i),x=_b(this._apiKey,this.model,_,b);return this._sendPromise=this._sendPromise.then(()=>x).catch(S=>{throw new Error(Tv)}).then(S=>S.response).then(S=>{if(Mv(S)){this._history.push(p);const T=Object.assign({},S.candidates[0].content);T.role||(T.role="model"),this._history.push(T)}else{const T=Ur(S);T&&console.warn(`sendMessageStream() was unsuccessful. ${T}. Inspect response object for details.`)}}).catch(S=>{S.message!==Tv&&console.error(S)}),x}}async function IR(r,e,i,s){return(await Pc(e,bo.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function PR(r,e,i,s){return(await Pc(e,bo.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function FR(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await Pc(e,bo.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class Av{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=bb(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=Sv(e),c=Object.assign(Object.assign({},this._requestOptions),i);return vb(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=Sv(e),c=Object.assign(Object.assign({},this._requestOptions),i);return _b(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new UR(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=NR(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return IR(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=OR(e),l=Object.assign(Object.assign({},this._requestOptions),i);return PR(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return FR(this.apiKey,this.model,e,s)}}class BR{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new Ii("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Av(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new Fr("Cached content must contain a `name` field.");if(!e.model)throw new Fr("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new Fr(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new Av(this.apiKey,c,s)}}const yb=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",zR=["gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],GR=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3-flash-preview","gemini-2.5-flash-lite"];let wl="";const um=r=>{wl=r},Cm=()=>wl,Sb=async()=>{if(!wl)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${yb}/v1beta/models?key=${wl}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Dr=async(r,e=null,i=null,s)=>{if(!wl)throw new Error("API Key is initialized.");const l=new BR(wl),c=e&&e.length>0?GR:zR;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let _=[];i&&_.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&_.push(...e),_.push({text:r});const b={model:p},x=l.getGenerativeModel(b,{apiVersion:"v1beta",baseUrl:yb}),S=new Promise((L,G)=>setTimeout(()=>G(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),T=e&&e.length>0?[]:[{googleSearch:{}}];let O;try{O=await Promise.race([x.generateContent({contents:[{role:"user",parts:_}],tools:T,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),S])}catch(L){if(T.length>0)console.warn(`[API] Grounding failed for ${p} (${L.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),O=await x.generateContent({contents:[{role:"user",parts:_}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw L}const E=O.response,y=E.candidates||[];if(!y.length)throw E.promptFeedback&&(console.warn("Prompt Feedback:",E.promptFeedback),E.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${E.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const C=y[0];let I="";try{I=E.text()}catch(L){console.warn(L)}const U=C.content?.parts||[];let j="";if(U.forEach(L=>{L.thought&&(j+=L.thought)}),!I){const L=C.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${L}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${L})`),new Error(`Empty response (FinishReason: ${L}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:I,thought:j||"通常処理が完了しました。",model:p}}catch(_){console.warn(`Model ${p} failed:`,_.message),_.message.includes("429")||_.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!_.message.includes("フィルター検知")&&!_.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${_.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Sb();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},HR=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Dr,diagnoseConnection:Sb,getApiKey:Cm,setApiKey:um},Symbol.toStringTag,{value:"Module"})),kR="modulepreload",VR=function(r,e){return new URL(r,e).href},wv={},jR=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(_){return Promise.all(_.map(b=>Promise.resolve(b).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(_=>{if(_=VR(_,s),_ in wv)return;wv[_]=!0;const b=_.endsWith(".css"),x=b?'[rel="stylesheet"]':"";if(s)for(let T=f.length-1;T>=0;T--){const O=f[T];if(O.href===_&&(!b||O.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${x}`))return;const S=document.createElement("link");if(S.rel=b?"stylesheet":kR,b||(S.as="script"),S.crossOrigin="",S.href=_,m&&S.setAttribute("nonce",m),document.head.appendChild(S),b)return new Promise((T,O)=>{S.addEventListener("load",T),S.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${_}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},XR=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],YR=async(r,e,i=[])=>{const s=Cm();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of XR)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,_;if(f.startsWith("gemini")){const b=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],x=i.map(S=>{const T=S.includes(",")?S.split(",")[1]:S,O=S.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:O?O[1]:"image/png",data:T}}});if(x.length>0&&e&&e(`[REF] ${x.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...x]}],generationConfig:{responseModalities:b}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.candidates&&_.candidates.length>0&&_.candidates[0].content&&_.candidates[0].content.parts){const S=_.candidates[0].content.parts.find(T=>T.inlineData);if(S&&S.inlineData&&S.inlineData.data)return{base64Img:S.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.predictions&&_.predictions[0]&&_.predictions[0].bytesBase64Encoded)return{base64Img:_.predictions[0].bytesBase64Encoded,usedModel:f};if(_.predictions&&_.predictions[0]&&typeof _.predictions[0]=="string")return{base64Img:_.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await jR(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>HR);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let Eb="";const WR=r=>{Eb=r},fm=()=>Eb,qR=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=fm();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),18e4);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (180秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")};console.log("HELLO_USER_FIXED_VERSION_2_25");const fo="v3.54-alpha",xp=r=>{const e=r||"";return e.includes("sensitive")||e.includes("Responsible AI")||e.includes("400")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:e.includes("not found")||e.includes("not supported")||e.includes("404")||e.includes("403")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がありません、または制限されています。
[対処法] 時間を置くか、設定を見直してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑している可能性があります。数分時間を置いてから再度お試しください。`},$R=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},KR=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断の実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},gf=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=Ce.useRef(null);Ce.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:g.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[g.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),g.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[g.jsx(cm,{size:16})," Neural Process (Thinking Mode)"]}),g.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&g.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})},Rv=({imageSrc:r,height:e=200})=>{const i=Ce.useRef(null);return Ce.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new JS,c=75,f=s.clientWidth/s.clientHeight,h=new Ia(c,f,.1,1100);h.position.set(0,0,.1);const m=new vw({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new yw(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const _=new bE;let b=null;_.load(r,y=>{y.mapping=_f,y.colorSpace=ga;const C=new Tm(500,60,40);C.scale(-1,1,1);const I=new Mm({map:y});b=new ps(C,I),l.add(b)});let x=c;const S=y=>{y.preventDefault();const C=y.deltaY>0?5:-5;x=Math.max(30,Math.min(120,x+C)),h.fov=x,h.updateProjectionMatrix()};s.addEventListener("wheel",S,{passive:!1});const T=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});T.observe(s);let O=null;const E=()=>{O=requestAnimationFrame(E),p.update(),m.render(l,h)};return E(),()=>{cancelAnimationFrame(O),T.disconnect(),s.removeEventListener("wheel",S),b&&(b.geometry.dispose(),b.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),g.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Cv=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=Ce.useState(""),[f,h]=Ce.useState("");if(!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l),c("")},p=s==="google",_=p?"API Key が必要です":"OpenAI API Key が必要です",b=p?"Google AI API Key を入力...":"sk-proj-...",x=p?"https://aistudio.google.com/app/apikey":"https://platform.openai.com/api-keys",S=p?"🔑 キーを取得":"🔑 OpenAI キーを取得",T=p?"bg-blue-600":"bg-emerald-600",O=p?"border-blue-500/30":"border-emerald-500/30",E=p?"shadow-blue-500/10":"shadow-emerald-500/10",y=p?"bg-blue-600 hover:bg-blue-500":"bg-emerald-600 hover:bg-emerald-500",C=p?"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30":"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30",I=p?"focus:border-blue-500":"focus:border-emerald-500",U=p?"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]":"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]";return g.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:g.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:g.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${O} rounded-xl shadow-2xl ${E} p-4 flex flex-col md:flex-row items-center gap-4 relative pr-10`,children:[i&&g.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:g.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[g.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),g.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),g.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[g.jsx("div",{className:`p-2 ${T} rounded-lg animate-pulse`,children:g.jsx(Tf,{size:18,className:"text-white"})}),g.jsxs("div",{children:[g.jsx("p",{className:"text-sm font-bold text-white",children:_}),g.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),g.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[g.jsxs("div",{className:"flex gap-2",children:[g.jsx("input",{type:"password",value:l,onChange:j=>c(j.target.value),placeholder:b,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${I} outline-none font-mono text-sm tracking-wider transition-all ${U}`,onKeyDown:j=>j.key==="Enter"&&m(),autoFocus:!0}),g.jsx("button",{onClick:m,className:`${y} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]}),f&&g.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]}),g.jsx("a",{href:x,target:"_blank",rel:"noreferrer",className:`text-[11px] ${C} underline whitespace-nowrap shrink-0`,children:S})]})})})};class ZR extends qy.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?g.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[g.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",fo,")"]}),g.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),g.jsx("br",{}),this.state.errorInfo?.componentStack]}),g.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}const Nv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}};function QR(){console.log("System Version Loaded:",fo);const[r,e]=Ce.useState(""),[i,s]=Ce.useState(!1),[l,c]=Ce.useState("news"),[f,h]=Ce.useState(""),[m,p]=Ce.useState(""),[_,b]=Ce.useState(""),[x,S]=Ce.useState(""),[T,O]=Ce.useState(""),[E,y]=Ce.useState(""),[C,I]=Ce.useState("Auto"),[U,j]=Ce.useState([{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}]),L=oe=>{j(ft=>ft.map(tt=>tt.id===oe?{...tt,checked:!tt.checked}:tt))},G=()=>{const oe=new Date;return oe.setHours(oe.getHours()+9),oe.toISOString().split("T")[0]},[A,F]=Ce.useState(G()),[W,H]=Ce.useState(""),[q,fe]=Ce.useState(""),[he,$]=Ce.useState(""),[D,z]=Ce.useState(""),[ce,xe]=Ce.useState(null),[Ae,P]=Ce.useState(!1);Ce.useEffect(()=>{const oe=Cm();oe?(um(oe),e(oe)):s(!0)},[]);const Q=oe=>oe?oe.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:"Gemini 3.1: 最高品質 (Next Generation)"}:oe.includes("3-flash")||oe.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:oe.includes("2.5-flash")&&!oe.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:oe.includes("lite")||oe.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:oe.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:oe}:null,[Ee,Ne]=Ce.useState([]),[Oe,se]=Ce.useState(!1),[be,Re]=Ce.useState(!1),[ke,gt]=Ce.useState(!1),[it,_n]=Ce.useState(!1),[kt,Yt]=Ce.useState(!1),[mn,xt]=Ce.useState(""),[Gn,At]=Ce.useState(""),[ui,Y]=Ce.useState(""),[Ln,zt]=Ce.useState(""),[un,Ue]=Ce.useState("auto"),[Nn,N]=Ce.useState(!1),[M,K]=Ce.useState([]),[ge,Te]=Ce.useState(""),[Ie,Be]=Ce.useState(!1),[de,re]=Ce.useState(""),[ze,He]=Ce.useState(!1),[De,Pe]=Ce.useState(!1),[ut,St]=Ce.useState(!1),[Mt,V]=Ce.useState(!1),[we,pe]=Ce.useState(!1),[Ge,Fe]=Ce.useState(!1),[Se,et]=Ce.useState(!1),[bt,In]=Ce.useState(!1),[Gt,Bi]=Ce.useState(!1),[zi,fi]=Ce.useState(""),[Ka,Hr]=Ce.useState(!1),[_a,ti]=Ce.useState(""),[Zt,ni]=Ce.useState(!1),[Vn,aa]=Ce.useState(!1),[yo,Ba]=Ce.useState(!1),[So,Za]=Ce.useState(""),[xs,za]=Ce.useState(!1),[va,Qa]=Ce.useState(!1),[Xi,jn]=Ce.useState(!1),[Cl,w]=Ce.useState(!1),[k,ae]=Ce.useState(null),[J,te]=Ce.useState(null),[ve,qe]=Ce.useState(null),[Ve,Ke]=Ce.useState(!1),[Ze,ht]=Ce.useState(""),[Lt,ct]=Ce.useState(!1),[pt,On]=Ce.useState(!1),[vn,fn]=Ce.useState(null),[Vt,We]=Ce.useState(null),[ii,Ct]=Ce.useState(!1),Zn=(oe,ft,tt,yt,dt=640,Xe=480)=>new Promise((Le,je)=>{const Me=new Image;Me.onload=()=>{try{const at=document.createElement("canvas");at.width=dt,at.height=Xe;const st=at.getContext("2d"),ln=Me.width,Rt=Me.height,Ma=(ft%360+360)%360/360*ln,Ei=yt/360*ln,Mi=Rt/2-tt/180*Rt,_i=Ei*(Xe/dt),Hn=Ma-Ei/2,gn=Math.max(0,Math.min(Rt-_i,Mi-_i/2)),Ft=Math.min(_i,Rt);if(Hn>=0&&Hn+Ei<=ln)st.drawImage(Me,Hn,gn,Ei,Ft,0,0,dt,Xe);else if(Hn<0){const $t=-Hn,tn=Ei-$t,dn=tn/Ei;st.drawImage(Me,ln-$t,gn,$t,Ft,0,0,dt*(1-dn),Xe),st.drawImage(Me,0,gn,tn,Ft,dt*(1-dn),0,dt*dn,Xe)}else{const $t=ln-Hn,tn=Ei-$t,dn=$t/Ei;st.drawImage(Me,Hn,gn,$t,Ft,0,0,dt*dn,Xe),st.drawImage(Me,0,gn,tn,Ft,dt*dn,0,dt*(1-dn),Xe)}Le(at.toDataURL("image/jpeg",.85))}catch(at){je(at)}},Me.onerror=()=>je(new Error("画像の読み込みに失敗しました")),Me.src=oe}),Gi=oe=>{oe?(Za(""),Ba(!0)):aa(!1)},[Yn,Pn]=Ce.useState(!1),[sn,Un]=Ce.useState(!1),Yi=Ce.useRef(!1),[qt,Wn]=Ce.useState(0),[_s,$s]=Ce.useState(0),[ba,kr]=Ce.useState(0),Hi=Ce.useRef(!1),[Wi,Ni]=Ce.useState(!1),Nl=Ce.useRef(null),Eo=Ce.useRef(null),Fc=Ce.useRef(null),Ks=Ce.useRef(null),qi=Ce.useRef(null);Ce.useEffect(()=>{qi.current&&(qi.current.scrollTop=qi.current.scrollHeight)},[M]),ke||!W||W.length<20||!q||q.length<20;const[ya,sa]=Ce.useState(""),[Sa,Vr]=Ce.useState([]),Mo=oe=>{const ft=oe.replace(/[^\u0000-\u007F]/g,"").trim();ft!==oe&&wt("APIキーに含まれる不要な文字を自動削除しました。"),um(ft),e(ft),s(!1),wt("✅ API接続完了！キャラクターシートをアップロードして開始してください。"),window.scrollTo({top:0,behavior:"instant"})},wt=oe=>{zt(oe),setTimeout(()=>zt(""),4e3)},Zs=async oe=>{if(!r){wt("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(oe.length===0)return;se(!0),xt(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let ft=0;const tt=setInterval(()=>{ft++,xt(Xe=>{if(ft<=10){const at=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return Xe+at[Math.floor(Math.random()*at.length)]}const je=`
> ⏳ AI応答を待機中... (${Math.floor(ft*.8)}秒経過)`,Me=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Me.test(Xe)?Xe.replace(Me,"")+je:Xe+je})},800),yt=[];let dt=null;for(let Xe=0;Xe<oe.length;Xe++){const Le=oe[Xe],je=await new Promise(at=>{const st=new FileReader;st.onload=Rt=>{const Qs=Rt.target.result,Ma=new Uint8Array(Qs);let Ei=!1;const Mi="equirectangular";let _i=0;for(let gn=0;gn<Math.min(Ma.length,65536);gn++)if(Ma[gn]===Mi.charCodeAt(_i)){if(_i++,_i===Mi.length){Ei=!0;break}}else _i=0;const Hn=new Image;Hn.onload=()=>{const gn=Hn.naturalWidth/Hn.naturalHeight,Ft=Math.abs(gn-2)<.15;at(Ft&&Ei)},Hn.onerror=()=>at(!1),Hn.src=URL.createObjectURL(Le)};const ln=Le.slice(0,65536);st.readAsArrayBuffer(ln)}),Me=new FileReader;Me.readAsDataURL(Le),await new Promise(at=>{Me.onload=()=>{je&&!dt?(dt={base64:Me.result,mimeType:Le.type},xt(st=>st+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(yt.push(Me.result),Ne(st=>[...st,Me.result])),at()}})}if(dt)try{On(!0),ae(dt.base64);const Xe=dt.base64.split(",")[1],Le={inlineData:{mimeType:dt.mimeType,data:Xe}};te(Le),Ke(!0),xt(st=>st+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const at=(await Dr(`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,[Le],null,()=>{})).text.match(/\{[\s\S]*\}/)?.[0];if(at){const st=JSON.parse(at);qe(st),b(st.location),wt(`🌐 360°背景を検出: ${st.location}`),xt(ln=>ln+`
> 🌐 空間解析完了: ${st.location}`)}else qe({location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像")}catch(Xe){console.warn("[360° BG] Analysis failed:",Xe),qe({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像（解析失敗）")}finally{Ke(!1)}if(yt.length===0&&dt){clearInterval(tt),se(!1),xt(Xe=>Xe+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),wt("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(yt.length===0){clearInterval(tt),se(!1);return}wt(`思考モード: ${yt.length}枚のキャラクター設定画を同時解析中...${dt?"（+ 360°背景1枚検出済み）":""}`);try{const Xe=yt.map(Me=>{const at=Me.split(",")[1];return{inlineData:{mimeType:Me.split(";")[0].split(":")[1],data:at}}}),je=await Dr(`
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
      `,Xe,null,Me=>{xt(at=>at+`
> ${Me}`)});H(je.text),xe(je.model),xt(Me=>{const at=`

--- ✅ 解析完了 ---
`,st=je.thought&&je.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${je.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return Me+at+st}),wt("全キャラクターの解析が完了しました。"),Yn&&(Hi.current?(Pn(!1),Wn(0),Ni(!1),wt("⏹ フルオートを中断しました。")):kr(Me=>Me+1))}catch(Xe){console.error(Xe);const Le=xp(Xe.message);xt(je=>je+`

[システムエラー]: ${Xe.message}
--------------------------------------------------
${Le}`),wt("解析エラー: "+Xe.message),Yn&&(Pn(!1),Wn(0),Ni(!1))}finally{clearInterval(tt),se(!1)}},To=async()=>{if(!q||q.length<20)return wt("先にシナリオを生成してください。");if(!(De||ut||Mt||we||Ge||Se||bt))return wt("少なくとも1つの強化カテゴリをONにしてください。");if(Gt)return;Bi(!0),fi("> [START] シナリオ強化を開始します..."),_a||(ti(q),fi(Xe=>Xe+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const ft=[];De&&ft.push(`【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。
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
良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。`),ut&&ft.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。"),Mt&&ft.push(`【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。
⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:
- sparkling light particles → 代わりに soft glow を使え
- glowing dust → 代わりに clean bloom を使え
- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え
- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え`),we&&ft.push(`【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。
- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。
- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。
- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。
- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。
- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。`),Ge&&ft.push(`【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。
- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）
- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）
- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）
- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）
- 引き/ロングショット（宇宙や上空からの空気感）
- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）
⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。
4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。`),Se&&ft.push(`【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。

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
- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ`),fi(Xe=>Xe+`
> [CONFIG] 強化カテゴリ: ${ft.length}個`);let tt=0;const yt=setInterval(()=>{tt++,fi(Xe=>{if(tt<=5){const at=[`
> [PROCESS] 演出データベースを参照中...`,`
> [PROCESS] 感情ベクトルを計算中...`,`
> [PROCESS] 表現パターンを最適化中...`];return Xe+at[Math.floor(Math.random()*at.length)]}const je=`
> ⏳ AI応答を待機中... (${Math.floor(tt*.8)}秒経過)`,Me=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Me.test(Xe)?Xe.replace(Me,"")+je:Xe+je})},800),dt=`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${ft.join(`

`)}

【Guard C: AI定型文の絶対排除】
以下のAI特有の退屈な表現をシナリオ（ト書き・セリフ）から完全に排除・書き換えよ:
- 感想・まとめのナレーション（「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等は絶対禁止。綺麗にまとめず余韻をぶった斬れ）
- 汎用的で弱い感嘆（「ふふっ」「やれやれ」「まあいいか」等は絶対禁止。キャラに合った鋭いリアクションにせよ）
- 状況をそのまま口で説明するセリフ（「〇〇が××してしまったぞ！」等は禁止。絵で状況は見せ、セリフは感情やツッコミに特化せよ）

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
${q}

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`;try{fi(Le=>Le+`
> [API] Gemini にシナリオ強化をリクエスト中...`);const Xe=await Dr(dt,[],W,Le=>{fi(je=>je+`
> [API] ${Le}`)});Xe&&Xe.text&&Xe.text.length>50?(fe(Xe.text.trim()),fi(Le=>Le+`
> [SUCCESS] シナリオを強化しました！（${Xe.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),Pe(!1),St(!1),V(!1),pe(!1),Fe(!1),et(!1),In(!1),wt("シナリオ強化完了！")):(fi(Le=>Le+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),wt("強化失敗: AIの応答が不十分です"))}catch(Xe){fi(Le=>Le+`
> [ERROR] ${Xe.message}`),wt("強化エラー: "+Xe.message)}finally{clearInterval(yt),Bi(!1)}},Bc=()=>{_a&&(fe(_a),ti(""),fi(oe=>oe+`
> [REVERT] 元のシナリオに復元しました。`),wt("シナリオを元に戻しました"))},Si=async oe=>{if(!W)return wt("先にキャラクターを解析してください。");if(be)return;const ft=Array.isArray(oe)?oe:U;if(l==="manual"&&!f.trim()){alert("自由入力トピックを入力してください。");return}if(l==="news"&&!ft.find(Le=>Le.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}Re(!0),At(""),z(""),sa(null),Y(""),K([]),ti(""),fi("");let tt="";if(l==="manual")tt="手動入力",fe(""),At(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${f.substring(0,30)}...`);else{const Le=ft.filter(je=>je.checked);Le.length>0?(tt=Le.map(je=>je.keywords).join(" "),wt(`カテゴリ「${Le.map(je=>je.label).join("・")}」で最新ニュースを検索中... (${A})`),fe(""),At(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Le.map(je=>je.label).join("、")} (キーワード: ${tt}) 
 > 対象日付: ${A} 
 > Google Grounding で検索中...`)):tt="最新ニュース"}const yt=`${tt} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let dt=0;const Xe=setInterval(()=>{dt++,At(Le=>{if(dt<=8){const st=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Le+st[Math.floor(Math.random()*st.length)]}const Me=`
> ⏳ AI応答を待機中... (${Math.floor(dt*.8)}秒経過)`,at=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return at.test(Le)?Le.replace(at,"")+Me:Le+Me})},800);try{let Le="";if(l==="manual"){Le=`
         【ユーザー提供トピック/URL】:
         ${f}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;const Ft=/(https?:\/\/[^\s]+)/g,$t=f.match(Ft);if($t&&$t.length>0){At(`> 手動入力内にURLを検出: ${$t[0]} 
> プロキシ経由でコンテンツを取得中...`);try{const tn=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent($t[0])}`);if(!tn.ok)throw new Error(`HTTP error! status: ${tn.status}`);const dn=await tn.text(),ki=new DOMParser().parseFromString(dn,"text/html");ki.querySelectorAll("script, style").forEach(qn=>qn.remove());const Kt=ki.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let Mn="";Kt.forEach(qn=>{qn.textContent.trim()&&(Mn+=qn.textContent.trim()+`
`)}),Mn.trim()||(Mn=ki.body.textContent||"");const Oi=Mn.replace(/\s+/g," ").substring(0,3e3);At(qn=>qn+`
> コンテンツ抽出完了 (${Oi.length}文字)。注入中...`),Le=`
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${Oi}
             
             (指示): 上記はユーザーが入力したURL（ ${$t[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `}catch(tn){console.error("URL Fetch Error: ",tn),At(dn=>dn+`
> 警告: URLコンテンツの取得に失敗しました (${tn.message})。LLMの内部知識で補完します。`)}}}const je=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園のベンチ","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],Me=je[Math.floor(Math.random()*je.length)];console.log("Forced Location:",Me);const at=`
        【Context Force Reboot】
        Ignore all previous instructions and conversation history.This is a fresh, standalone session.
        (ABSOLUTE PROHIBITION: Repeating topics from the past.You MUST select a FRESH, UNIQUE topic).
        (Topic Lock): Focus strictly on the category: "${tt}".
        (Time Machine Lock): The target date is **${A}**. You MUST search for news/events that happened AROUND this date.
        (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

    あなたはプロの風刺漫画脚本家です。
        
        ${l==="manual"?`「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。
 トピック: ${f}

${Le}`:`「${yt}」に関する、** 指定された日付（${A}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`}

        【選定ルールの絶対厳守】

   1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
    2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
         （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
   3.  抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
   4. **【場所（Location）の選定義務】**:
      - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
      - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
       
       ${k&&ve&&pt?`
       4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
           - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
           - AI解析結果: 場所=「${ve.location}」、光源=「${ve.lighting}」、特徴物=「${ve.objects||"なし"}」、雰囲気=「${ve.mood||"不明"}」
           - **【カメラワーク・フロアプラン制約】**:
             * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
             * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
           - **【ライティング整合性】**:
             * 各コマのキャラクター描写において、光源方向「${ve.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
           - **【背景の部分使用の許可】**:
             * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
             * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
       `:""}
       4. **【強制舞台指定 (Location Lock)】**:
          - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
          - **指定場所: 「${k&&ve&&pt?ve.location:_.trim()?_.trim():"ニュース内容に即した場所"}」**
          - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
          ${x.trim()?`
       5. **【強制服装指定 (Outfit Lock)】**:
          - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${x.trim()}』に変更して描写・行動させよ。
          - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
          `:`
       5. **【服装の自動選定 (Outfit Auto-Select)】**:
          - ニュースの内容と場所(Location)に**「最も適した服装カテゴリー」**を選定し、Outfit行に出力せよ。
          - **「キャラシート準拠」「デフォルト」等の曖昧な回答は禁止。** 必ず状況に適した服装の「属性」を出力すること。
          - 例: 海辺→「水着（swimwear）」、法廷→「ビジネススーツ（business suit）」、道の駅→「私服（casual wear）」、雪山→「防寒着（winter clothes）」、宇宙→「宇宙服（spacesuit）」
          - **⚠️【重要: クローン化防止】⚠️** 「白のビキニ」「デニムショートパンツ」のように細かく指定しすぎないこと。細かく指定すると全キャラクターが全く同じ服を着てしまうため、必ず**大分類のカテゴリー（ナース服、私服、パジャマなど）**に留め、個々の着こなしは画像AIに委ねよ。
          - 画像生成プロンプトでも選定した服装タグが反映される前提で、シナリオ内のト書き(Action)テキストにもその服装に基づく自然な描写を含めること。
          `}

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
            - ${C==="Auto"?`**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
               * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
               * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: BLANK）
               * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
               * **メタ崩壊型**: 漫画の枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: BLANK, IMPACT）
               * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
               * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
               * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: BLANK）
               * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
               * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: BLANK, CHIBI_GAG）
               * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: BLANK, IMPACT）`:C==="Surreal"?"**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: BLANK":C==="Explosion"?"**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG":C==="FakeEmotion"?"**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。":C==="Metafiction"?"**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。":C==="Unreasonable"?"**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。":C==="RunningGag"?"**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。":C==="Dream"?"**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: BLANK":C==="PsychoHorror"?"**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME":C==="Misunderstanding"?"**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: BLANK, CHIBI_GAG":C==="CanceledEnding"?"**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: BLANK, IMPACT":C==="Documentary"?`**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
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
        Location: [${_.trim()?"必ず『"+_.trim()+"』にせよ":"ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
        Outfit: [${x.trim()?"必ず『"+x.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
        Punchline: [${C!=="Auto"?"必ず『"+Nv(C)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
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
        `,ln=await Dr(at,J&&pt?[J]:[],W,Ft=>{At($t=>$t+`
 > [API] ${Ft} `)});xe(ln.model);let Rt={topic:tt,scenario:""};try{const Ft=ln.text.match(/Topic:\s*(.+)/i),$t=ln.text.match(/Logline:\s*(.+)/i),tn=ln.text.match(/Location:\s*(.+)/i),dn=ln.text.match(/Outfit:\s*(.+)/i),Ha=ln.text.match(/Punchline:\s*(.+)/i),ki=ln.text.match(/Scenario:\s*([\s\S]+)/i);if(ki)Rt.topic=Ft?Ft[1].trim():tt,Rt.topic=Rt.topic.replace(/^Topic:\s*/i,"").trim(),Rt.logline=$t?$t[1].trim():"",Rt.location=tn?tn[1].trim():"Generic Background",Rt.outfit=dn?dn[1].trim():"",Rt.punchline=Ha?Ha[1].trim():"",Rt.scenario=ki[1].trim();else{const $i=ln.text.match(/\{[\s\S]*\}/);if($i){const Kt=JSON.parse($i[0]);Rt.topic=Kt.topic||tt,Rt.location=Kt.location||"Generic Background",Rt.scenario=Kt.scenario||ln.text}else{if(ln.text.length<20)throw new Error("AI returned empty or invalid response.");Rt.topic=l==="manual"?f||"Custom Scenario":m||"Generated Scenario",Rt.scenario=ln.text}}}catch(Ft){console.warn("Parse warning:",Ft),Rt.scenario=ln.text,Rt.topic="Generated Scenario"}const Qs=Ft=>Ft;Rt.scenario=Qs(Rt.scenario),fe(Rt.scenario);const Ma=Rt.logline?`
Logline: ${Rt.logline}`:"",Ei=x.trim()||Rt.outfit?`
Outfit: ${x.trim()||Rt.outfit}`:"",Mi=Rt.punchline?`
Punchline: ${Rt.punchline}`:"",_i=k?pt?`
🌐 360°背景: ON (${ve?.location||"解析済み"} / ${ve?.spatialType==="indoor"?"室内":ve?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";O(_.trim()||Rt.location||"Unspecified"),y(x.trim()||Rt.outfit||""),At(Ft=>Ft+`
 > トピック選定: ${Rt.topic} 
 > シナリオ構築完了。`),wt("シナリオの生成が完了しました！");let Hn="";if(k&&ve&&pt&&J)try{At(dn=>dn+`
 > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`),wt("🎬 360°カメラワーク設計中..."),Ct(!0);const Ft=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${Rt.scenario}

【360°背景の解析情報】
- 場所: ${ve.location}
- 光源: ${ve.lighting}
- 空間タイプ: ${ve.spatialType}
- 特徴物: ${ve.objects||"なし"}
- 雰囲気: ${ve.mood||"不明"}

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
}`,tn=(await Dr(Ft,[J],null,dn=>{At(Ha=>Ha+`
 > [Camera AI] ${dn}`)})).text.match(/\{[\s\S]*\}/)?.[0];if(tn){const dn=JSON.parse(tn);fn(dn);const Ha=Kt=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Kt%360+360)%360/45)%8],ki=Kt=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Kt]||Kt;let $i=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;dn.panels.forEach(Kt=>{$i+=`
 > 🎬 コマ${Kt.panel}: ${Ha(Kt.yaw)} (yaw:${Kt.yaw}°) / ${ki(Kt.camera)} / FOV:${Kt.fov}°`,$i+=`
 >    └─ ${Kt.reasoning}`}),$i+=`
 > 🎬 ══════════════════════════════════`,At(Kt=>Kt+$i),wt("🎬 360°カメラワーク設計完了！背景クロップを開始...");try{At(Mn=>Mn+`
 > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...`);const Kt=[];for(const Mn of dn.panels){const Oi=await Zn(k,Mn.yaw,Mn.pitch||0,Mn.fov||90);Kt.push(Oi)}We(Kt),At(Mn=>Mn+`
 > 🔲 [Crop] ✅ ${Kt.length}枚のクロップ画像を生成しました`),wt("🎬 カメラワーク設計＋背景クロップ完了！"),Ct(!1)}catch(Kt){console.warn("[360° Crop] Cropping failed:",Kt),At(Mn=>Mn+`
 > ⚠️ [Crop] クロップに失敗しました: ${Kt.message}（スキップ）`),Ct(!1)}Hn=`
🎬 360° Camera Work:`,dn.panels.forEach(Kt=>{Hn+=`
  Panel${Kt.panel}: ${Ha(Kt.yaw)}(${Kt.yaw}°) ${ki(Kt.camera)} FOV${Kt.fov}° — ${Kt.reasoning}`})}else console.warn("[360° Camera AI] JSON parse failed, skipping camera work"),At(dn=>dn+`
 > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）`),Ct(!1)}catch(Ft){console.warn("[360° Camera AI] Camera work design failed:",Ft),At($t=>$t+`
 > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${Ft.message}（スキップ — シナリオ生成には影響しません）`),Ct(!1)}const gn=`## タイトル: ${Rt.topic} !?${Ma}
Location: ${Rt.location||"Unspecified"}${Ei}${Mi}${_i}${Hn}

${Rt.scenario} `;return fe(gn),gn}catch(Le){console.error(Le);const je=xp(Le.message);return At(Me=>Me+`

[システムエラー]: ${Le.message}
--------------------------------------------------
${je}`),wt("シナリオ生成エラー"),null}finally{clearInterval(Xe),Re(!1)}},Ga=async(oe=!1,ft=null)=>{const tt=ft||q;if(!oe&&(!W||!tt))return wt("キャストとシナリオが必要です。");gt(!0),z(""),K([]),Te(""),re(""),He(!1),Y("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const yt=setInterval(()=>{Y(dt=>{if(dt.length>800)return dt;const Xe=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!ke)return dt;const Le=Xe[Math.floor(Math.random()*Xe.length)];return dt+Le})},600);try{let dt=un==="monochrome";if(un==="auto"){const Et=W.toLowerCase();dt=Et.includes("style_tag: monochrome")||Et.includes("monochrome")||Et.includes("greyscale")||Et.includes("screentone")}const Xe=dt?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",Le={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Le.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"},Le.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"},Le.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"},Le.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"},Le.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"},Le.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"},Le.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"},Le.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"},Le.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"},Le.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"},Le.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"},Le.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const je=Et=>{const Nt=Et.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(Nt){const Qe=Nt[1].toUpperCase();if(Le[Qe])return Qe}return"NORMAL"},Me=Et=>{const Nt=je(Et);if(Nt==="NORMAL")return"";const Qe=Le[Nt],Ot=[];if(Et.split(`
`).forEach(lt=>{const rt=lt.match(/^(.*?)(?:[:：]|「)/);if(rt&&rt[1].trim()){const Ut=rt[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Ut&&!Ot.includes(Ut)&&Ot.push(Ut)}}),Ot.length>=2&&Qe.styleMulti){let lt=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.styleMulti}`;return Qe.proportionsMulti&&(lt+=`
PROPORTION OVERRIDE: ${Qe.proportionsMulti}`),Qe.vfxMulti&&(lt+=`
VFX: ${Qe.vfxMulti}`),lt}let Je=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.style}`;return Qe.proportions&&(Je+=`
PROPORTION OVERRIDE: ${Qe.proportions}`),Qe.vfx&&(Je+=`
VFX: ${Qe.vfx}`),Je},at=Et=>{const Nt=[];let Qe=null;if(Et.split(`
`).forEach($e=>{const Je=$e.replace(/\*\*/g,"").trim();if(Je.startsWith("## ")){Qe&&Nt.push(Qe);const _t=Je.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();Qe={name:_t,shortName:_t.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!Qe)return;if(Je.includes("髪")||Je.toLowerCase().includes("hair")){const _t=Je.match(/\[WEIGHTS?\]:\s*(.*)/i),bn=_t?_t[1].replace(/\|/g,""):Je,Xn=bn.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);Xn&&!Qe.hairColor&&(Qe.hairColor=Xn[1]);const di=bn.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),ra=bn.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);Qe.hairStyle||(di?Qe.hairStyle=di[1]:ra&&(Qe.hairStyle=ra[1]))}const lt=Je.toLowerCase(),rt=/\(no[\s_-]*glasses/i.test(lt),Ut=/\([^)]*glasses[\s:]/i.test(lt)&&!rt;Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES"||(rt?Qe.glasses="LOCKED_NO":Ut&&(Qe.glasses="LOCKED_YES")),!(Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES")&&(Je.includes("眼鏡")||Je.includes("メガネ")||lt.includes("eyewear"))&&(lt.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(Je)?Qe.glasses="NO":(/(?:あり|有り|有|着用)/i.test(Je)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(lt))&&(Qe.glasses="YES"))}),Qe&&Nt.push(Qe),console.log("[IDENTITY MATRIX] Glasses detection results:"),Nt.forEach($e=>{console.log(`  ${$e.shortName}: glasses=${$e.glasses}, hair=${$e.hairColor} ${$e.hairStyle}`)}),Nt.length===0)return"";let Ot=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return Ot+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,Nt.forEach($e=>{const Je=[];$e.hairColor&&Je.push(`${$e.hairColor} hair`),$e.hairStyle&&Je.push($e.hairStyle),$e.glasses==="YES"||$e.glasses==="LOCKED_YES"?Je.push("MUST HAVE glasses (do NOT remove)"):$e.glasses==="NO"||$e.glasses==="LOCKED_NO"?Je.push("MUST NOT have glasses (bare eyes)"):Je.push("check reference image for glasses status"),Ot+=`- [${$e.shortName}]: ${Je.join(", ")||"see reference image"}
`}),Ot+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,Ot+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,Ot},st=Et=>{const Qe=at(W).split(`
`).find(Ot=>Ot.includes(`[${Et}]`));return Qe?Qe.split(":").slice(1).join(":").trim():""},ln=`
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
    `;let Rt=tt.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||tt.split(`
`)[0].substring(0,20);Rt=Rt.replace(/^Topic:\s*/i,"").trim();const Qs=tt.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),Ma=tt.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),Ei=Qs||"Generic Detailed Background",Mi=Ma&&!/^(なし|キャラシート準拠|none|default)/i.test(Ma)?Ma:"",_i=tt.replace(/```(?:json|markdown)?/gi,"").trim(),Hn=(Et,Nt,Qe)=>{const Ot=new RegExp(`\\[${Nt}.*?\\]([\\s\\S]*?)(?=\\[${Qe}|$)`,"i"),$e=Et.match(Ot);return $e?$e[1].trim():""},gn=Hn(_i,"1コマ目","2コマ目")||_i,Ft=Hn(_i,"2コマ目","3コマ目"),$t=Hn(_i,"3コマ目","4コマ目"),tn=Hn(_i,"4コマ目","UNKNOWN"),ki=(Et=>{const Nt=[...Et];for(let Qe=Nt.length-1;Qe>0;Qe--){const Ot=Math.floor(Math.random()*(Qe+1));[Nt[Qe],Nt[Ot]]=[Nt[Ot],Nt[Qe]]}return Nt})(["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"]).slice(0,4);let $i=0;const Kt={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},Mn=Et=>{const Nt=Et.match(/\[Camera:\s*(.*?)\]/i);if(Nt&&Nt[1]){const Ot=Nt[1].trim();let $e="";for(const[Je,lt]of Object.entries(Kt))if(Ot.includes(Je)){$e=lt;break}return $e?`${$e}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const Qe=ki[$i%ki.length];return $i++,Qe},Oi=Et=>{const Nt=Et.split(`
`),Qe=[];W.split(`
`).forEach(Je=>{const lt=Je.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(lt){const rt=lt[1].trim();Qe.push(rt);const Ut=rt.split(/[\(]/)[0].trim();Ut&&Ut!==rt&&Qe.push(Ut);const It=rt.match(/[\(]\s*(.*?)\s*[\)]/);It&&Qe.push(It[1].trim())}});const Ot=[];let $e=1;if(Nt.forEach(Je=>{const lt=Je.match(/^(.*?)(?:[:：]|「)/);let rt=!1,Ut=Je;if(lt&&lt[1].trim()){let It=lt[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const Fn=/[がをにでへはもとからまでより]/.test(It)&&It.length>5,_t=It.length>12,bn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(It),Xn=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(It.replace(/[（(].*$/,"").trim()),di=/[（(]\s*リアクション/i.test(lt[1]);Fn||_t||bn||Xn||di||(Qe.some(ra=>{const ir=ra.split(/[（(]/)[0].trim();return It===ra||It===ir||ir===It})||It==="全員"||It==="Speaker"||lt[0].trim().endsWith(":")||lt[0].trim().endsWith("："))&&(rt=!0)}else if(Je.trim().startsWith("「")){const It=Je.trim();/^「[^」]+」[？！。、!?\s]*$/.test(It)&&(rt=!0)}rt&&(Ut=Ut.replace(/^.*?(?:[:：]|「)\s*/,""),Ut=Ut.replace(/^「+/,"").replace(/」+$/,""),Ut=Ut.replace(/（.*?）|\(.*?\)/g,""),Ut=Ut.trim(),Ut&&(Ot.push(`(Speech Bubble ${$e}: "${Ut}")`),$e++))}),Ot.length===0){const Je=Et.match(/「([^」]+)」/g);Je&&Je.length>0&&Je.forEach(lt=>{let rt=lt.replace(/^「/,"").replace(/」$/,"").trim();rt=rt.replace(/（.*?）|\(.*?\)/g,"").trim();const Ut=Qe.filter(_t=>{const bn=_t.split(/[\(（]/)[0].trim();return bn&&rt.includes(bn)}),It=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(rt),Fn=Ut.length>=2&&It&&rt.length>15;rt&&!Fn&&(Ot.push(`(Speech Bubble ${$e}: "${rt}")`),$e++)})}return Ot.length===0?"(Characters interact without dialogue in this panel)":Ot.join(", ")},qn=(Et,Nt="")=>{const Qe=Et.split(`
`),Ot=[];W.split(`
`).forEach(lt=>{const rt=lt.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(rt){const Ut=rt[1].trim();Ot.push(Ut);const It=Ut.split(/[\(]/)[0].trim();It&&It!==Ut&&Ot.push(It);const Fn=Ut.match(/[\(]\s*(.*?)\s*[\)]/);Fn&&Ot.push(Fn[1].trim())}});let Je=Qe.filter(lt=>{const rt=lt.match(/^(.*?)(?:[:：]|「)/);let Ut=!1;if(rt&&rt[1].trim()){let _t=rt[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();_t=_t.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const bn=/[がをにでへはもとからまでより]/.test(_t)&&_t.length>5,Xn=_t.length>12,di=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(_t),ra=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(_t.replace(/[（(].*$/,"").trim()),ir=/[（(]\s*リアクション/i.test(rt[1]);bn||Xn||di||ra||ir||(Ot.some(Ss=>_t.includes(Ss)||Ss.includes(_t))||_t==="全員"||_t==="Speaker"||rt[0].trim().endsWith(":")||rt[0].trim().endsWith("："))&&(Ut=!0)}else if(lt.trim().startsWith("「")){const _t=lt.trim();/^「[^」]+」[？！。、!?\s]*$/.test(_t)&&(Ut=!0)}const It=lt.match(/^\[\d+コマ目/),Fn=lt.trim()==="";return!Ut&&!It&&!Fn}).join(" ").trim();return Je=Je.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),Je=Je.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),Je=Je||"Characters interacting dynamically based on dialogue.",Nt&&Ot.forEach(lt=>{const rt=lt.split("(")[0].trim();Nt.includes(rt)}),Je},Ja=Et=>Mi?`(All characters are wearing ${Mi}) ${Et}`:Et,vi=Et=>{const Qe=Et.split(`
`).filter(Je=>{const lt=Je.trim();return/^\[EMOTION:/i.test(lt)||/^状況[：:]/i.test(lt)?!1:lt.includes("：")||lt.includes(":")||lt.includes("「")}),Ot=[];W.split(`
`).forEach(Je=>{const lt=Je.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(lt){const rt=lt[1].trim();Ot.push(rt);const Ut=rt.split(/[（(]/)[0].trim();Ut&&Ut!==rt&&Ot.push(Ut)}});const $e=[];if(Qe.forEach(Je=>{const lt=Je.match(/^(.*?)(?:[:：]|「)/);if(lt&&lt[1].trim()){let rt=lt[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const Ut=/[がをにでへはもとからまでより]/.test(rt)&&rt.length>5,It=rt.length>12,Fn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(rt),_t=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(rt.replace(/[（(].*$/,"").trim()),bn=/[（(]\s*リアクション/i.test(lt[1]);if(Ut||It||Fn||_t||bn)return;rt&&!$e.includes(rt)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(rt)&&(Ot.some(Xn=>{const di=Xn.split(/[（(]/)[0].trim();return rt===Xn||rt===di||di===rt})||lt[0].trim().endsWith(":")||lt[0].trim().endsWith("："))&&$e.push(rt)}}),$e.length>=3){const Je=st($e[0]),lt=st($e[1]),rt=st($e[2]);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${$e[0]}] (${Je||"see reference"}) — First speaker
- CENTER ZONE: [${$e[1]}] (${lt||"see reference"}) — Second speaker
- LEFT ZONE: [${$e[2]}] (${rt||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${$e[0]}] MUST be on the RIGHT third of the panel.
- [${$e[1]}] MUST be in the CENTER of the panel.
- [${$e[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${$e[0]}]'s bubble on the RIGHT, [${$e[1]}]'s in CENTER, [${$e[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if($e.length>=2){const Je=st($e[0]),lt=st($e[1]);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${$e[0]}] (${Je||"see reference"})
- LEFT side: [${$e[1]}] (${lt||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${Je||$e[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${lt||$e[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${$e[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${$e[0]}]'s head.
- [${$e[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${$e[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if($e.length===1){const Je=st($e[0]);return`CRITICAL PLACEMENT & IDENTITY: [${$e[0]}] (${Je||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},es=Et=>{const Nt=Et.split(`
`),Qe=[],Ot={};W.split(`
`).forEach(_t=>{const bn=_t.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(bn){const Xn=bn[1].trim(),di=Xn.split("(")[0].trim().split("（")[0].trim();di&&(Qe.push(di),Ot[di]={name:di,full:Xn})}});const $e=[];Nt.forEach(_t=>{const bn=_t.match(/^(.*?)(?:[:：]|「)/);if(bn&&bn[1].trim()){let Xn=bn[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Xn&&!$e.includes(Xn)&&Qe.includes(Xn)&&$e.push(Xn)}});const Je=[...$e],lt=Et;Qe.forEach(_t=>{!Je.includes(_t)&&lt.includes(_t)&&Je.push(_t)});let rt=0;Nt.forEach(_t=>{const bn=_t.trim();(bn.includes("「")&&bn.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(bn))&&rt++});const Ut=$e.slice(0,3).map(_t=>`[${_t}]`),It=Qe.filter(_t=>!Je.includes(_t));It.length>0&&It.forEach(_t=>{Je.includes(_t)||Je.push(_t)});const Fn=Je.map(_t=>`[${_t}]`);if(Ut.length>0){let _t=`ANTI-CLONE REMINDER: ${Fn.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;Je.length===1&&rt<=1?_t+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${Fn[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${Fn[0]}. Leave the surrounding space empty rather than adding people.`:Je.length===1&&rt>=2&&(_t+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${Fn[0]} (monologue/soliloquy). Draw only ${Fn[0]} — do NOT add a second character just because there are multiple bubbles.`);const bn=Ut.join(" and "),Xn=Fn.filter(ir=>!Ut.includes(ir)),di=Xn.length>0?Xn.join(", "):"NO ONE ELSE",ra=`
FOREGROUND MUST CONTAIN ONLY: ${bn}.
BACKGROUND MUST CONTAIN ONLY: ${di}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${Je.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${bn} are the main focus.
${_t}${ra}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."};let ys="",Ro="";const Js=W.split(`
`);for(let Et=0;Et<Js.length;Et++){const Nt=Js[Et].replace(/\*\*/g,"").trim();if(Nt.startsWith("## ")&&(Ro=Nt.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),ys+=`
- Character [${Ro}]: `),!Ro||Mi&&(Nt.includes("服装")||Nt.includes("Outfit")))continue;const Qe=Nt.match(/\[WEIGHTS?\]:\s*(.*)/i);if(Qe){let $e=Qe[1].replace(/\|/g,"").trim();$e&&$e!=="()"&&$e!=="-"&&(ys+=$e+", ");continue}const Ot=Nt.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);Ot&&Ot.length>=2&&(ys+=Ot.join(", ")+", ")}ys.trim()||(ys=W.trim());const er=ys.trim(),kc=Ei||"Detailed Background",Xr=Rt||"4-koma Manga",Ll=Zt?`Generated by ChatGPT with Super FURU AI 4-koma ${fo}`:`Generated by Super FURU AI 4-koma ${fo}`;let tr="";Zt?tr=`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text title: "${Xr}"
- Draw tiny English watermark ON bottom-right border of 4th panel: "${Ll}"
- Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor"
- Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.
- Exactly 4 EQUAL horizontal panels, stacked vertically with thick white gutters between them. Panels MUST NOT touch.

ART STYLE:
- Pristine TV anime style. Clean cel-shading, dynamic lighting, no photorealistic textures.
- Foreground characters have bold ink outlines. Add a subtle white glow outside the character's outline to prevent blending with the background.
- Backgrounds should have slightly lower saturation and softer focus to make characters pop.
- ${Xe}
- Setting: ${kc}
${k&&ve&&pt?Vt&&Vt.length===4&&!Zt?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${ve.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${ve.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`:""}

CAMERA & PERSPECTIVE RULES:
Each of the 4 panels MUST use a DIFFERENT extreme camera angle (Bird's-eye, Worm's-eye, Dutch angle, Telephoto, etc.). No two panels share the same angle. Eye-level shots are FORBIDDEN.
However, AVOID extreme fisheye distortion that warps human anatomy (no gigantic noses, bulging limbs, or anatomical collapse). Keep character proportions strictly accurate while still using dramatic angles.

CHARACTERS & IDENTITY:
- Strictly reproduce reference image designs (hair, eyes, skin, accessories). NO feature swapping.
- Reference images are ONLY for face, hair, skin, and accessories.
${Mi?`- IGNORE reference clothing. All characters MUST wear exactly: ${Mi}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels."}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${er}
- Identity Anchor: ${at(W)}

PANEL DESCRIPTIONS:

## Panel 1
${Me(gn)}
${vi(gn).replace(/\\[/g, '').replace(/\\]/g,"")}
${es(gn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Mn(gn)}
Action: ${Ja(qn(gn,vi(gn)))}
Dialogue (Japanese text inside speech bubbles only): ${Oi(gn)}

## Panel 2
${Me(Ft)}
${vi(Ft).replace(/\\[/g, '').replace(/\\]/g,"")}
${es(Ft).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Mn(Ft)}
Action: ${Ja(qn(Ft,vi(Ft)))}
Dialogue (Japanese text inside speech bubbles only): ${Oi(Ft)}

## Panel 3
${Me($t)}
${vi($t).replace(/\\[/g, '').replace(/\\]/g,"")}
${es($t).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Mn($t)}
Action: ${Ja(qn($t,vi($t)))}
Dialogue (Japanese text inside speech bubbles only): ${Oi($t)}

## Panel 4
${Me(tn)}
${vi(tn).replace(/\\[/g, '').replace(/\\]/g,"")}
${es(tn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Mn(tn)}
Action: ${Ja(qn(tn,vi(tn)))}
Dialogue (Japanese text inside speech bubbles only): ${Oi(tn)}

FINAL COMPLIANCE CHECK:
- Output is a new manga scene with 4 distinct story panels, backgrounds, and vertical Japanese speech bubbles.
- Output is NOT a character sheet.
- No floating close-up eyes or partial face crops in the background. Every character must be drawn as a complete physical presence.
- No anatomical distortion from excessive fisheye lens.
- Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
`:(tr=`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${Xr}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${Ll}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor".
Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${Xe}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${kc}.
${k&&ve&&pt?Vt&&Vt.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${ve.lighting}), objects (${ve.objects||"various"}), and mood (${ve.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${ve.lighting}), spatial layout, objects (${ve.objects||"various"}), and mood (${ve.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:""}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${Mi?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:""}
Cast:
${er}
${Mi?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${Mi}. Apply tags directly.`:""}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${at(W)}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.

Camera & Comp:
${ln}
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
${Me(gn)}
${vi(gn)}
${es(gn)}
Camera: ${Mn(gn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${Ja(qn(gn,vi(gn)))}.
Dialogue (ONLY inside bubbles): ${Oi(gn)}.

## Panel 2
${Me(Ft)}
${vi(Ft)}
${es(Ft)}
Camera: ${Mn(Ft)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${Ja(qn(Ft,vi(Ft)))}.
Dialogue (ONLY inside bubbles): ${Oi(Ft)}.

## Panel 3
${Me($t)}
${vi($t)}
${es($t)}
Camera: ${Mn($t)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${Ja(qn($t,vi($t)))}.
Dialogue (ONLY inside bubbles): ${Oi($t)}.

## Panel 4
${Me(tn)}
${vi(tn)}
${es(tn)}
Camera: ${Mn(tn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${Ja(qn(tn,vi(tn)))}.
Dialogue (ONLY inside bubbles): ${Oi(tn)}.

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
      `,tr=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`+tr),await new Promise(Et=>setTimeout(Et,800));let nr=$R(tr.trim());return C==="Documentary"&&(nr=KR(nr),Y(Et=>Et+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`)),Y(Et=>Et+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),z(nr),Y(Et=>Et+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),wt("最終プロンプトの構築が完了しました。画像生成を開始します..."),nr}catch(dt){console.error(dt);const Xe=xp(dt.message);return Y(Le=>Le+`

[システムエラー]: ${dt.message}
--------------------------------------------------
${Xe}`),wt("生成エラー: "+dt.message),null}finally{clearInterval(yt),gt(!1)}};Ce.useEffect(()=>{D&&!ke&&jt>=3&&Ga()},[Zt]);const Ao=()=>{H(""),fe(""),z(""),Ne([]),sa(null),xt(""),At(""),Y(""),Pn(!1),Wn(0),b(""),S(""),ae(null),te(null),qe(null),fn(null),We(null),Ct(!1),wt("入力と解析結果をリセットしました。")},[vs,zc]=Ce.useState(!1),[jr,wo]=Ce.useState(!1),[Ea,bs]=Ce.useState(!1),Ol=()=>{D&&(navigator.clipboard.writeText(D),zc(!0),setTimeout(()=>zc(!1),2e3),wt("クリップボードにコピーしました！"))},Gc=async(oe=!1,ft=null)=>{const tt=ft||D;if(it||!oe&&!tt)return!1;_n(!0),Yt(!1);const yt=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];Zt&&yt.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中..."),K(yt);let dt=0;const Xe=setInterval(()=>{dt++;const Le=Math.floor(dt*1.5);K(je=>{const Me=je.findIndex(at=>at.startsWith("[WAIT]"));if(Me!==-1){const at=[...je];return at[Me]=`[WAIT] ⏳ 画像生成API応答を待機中... (${Le}秒経過)`,at}return[...je,`[WAIT] ⏳ 画像生成API応答を待機中... (${Le}秒経過)`]})},1500);await new Promise(Le=>setTimeout(Le,800));try{wt(Vn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),K(st=>[...st,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(st=>setTimeout(st,1e3));const Le=st=>{K(ln=>[...ln,st])};let je,Me;if(Vn){const st=await qR(tt,Le);je=st.base64Img,Me=st.usedModel}else{const st=Vt&&pt&&Vt.length===4?Vt:[];st.length>0&&Le(`[REF] 360°背景クロップ画像 ${st.length}枚を参照画像として添付`);const ln=await YR(tt,Le,st);je=ln.base64Img,Me=ln.usedModel}K(st=>[...st,`[4/5] データストリーム受信完了 (Model: ${Me})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const at=`data:image/png;base64,${je}`;return sa(at),Vr(st=>[{id:Date.now(),img:at},...st]),Me&&!Me.startsWith("gemini-3")?(P(!0),K(st=>[...st,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す","[GUIDE] 2. Gemini(Web版)を開く: https://gemini.google.com/app","[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する","[GUIDE] 4. 貼り付けて「思考モード」で送信する","[COMPLETE] Image successfully generated (with warnings)."])):(P(!1),K(st=>[...st,"[COMPLETE] Image successfully generated."])),wt("画像生成完了！"),!0}catch(Le){console.error(Le),Yt(!0),sa(null);const je=Le.message||"";let Me=[];return je.includes("sensitive")||je.includes("Responsible AI")||je.includes("400")?(Te(je),He(!0),Me=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):je.includes("not found")||je.includes("not supported")||je.includes("404")||je.includes("403")||je.includes("401")?Me=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${Vn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${Vn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Vn?"ChatGPT":"Gemini"} (Web版) を開く: ${Vn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Me=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${Vn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Vn?"ChatGPT":"Gemini"} (Web版) を開く: ${Vn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],K(at=>[...at,`[ERROR] ${Le.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...Me]),wt(`生成エラー: ${Le.message} `),!1}finally{clearInterval(Xe),_n(!1)}},Bf=async()=>{if(!D||!ge.trim())return;Be(!0),re("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let oe=0;const ft=setInterval(()=>{oe++,re(tt=>{const dt=`
> ⏳ AI分析中... (${Math.floor(oe*1)}秒経過)`,Xe=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return Xe.test(tt)?tt.replace(Xe,dt):tt+dt})},1e3);try{re(Me=>Me+`
> [Phase 1/5] エラーメッセージを解析中...`),re(Me=>Me+`
> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...`);const tt=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${ge.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${D}

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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,yt=await Dr(tt,[],null,Me=>{re(at=>at+`
> ${Me}`)});if(re(Me=>Me+`
> [Phase 3/5] AIの応答を受信・解析中...`),!yt.text||yt.text.trim().length<10){re(Me=>Me+`
> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。`);return}re(Me=>Me+`
> [Phase 4/5] 置換テーブルをプロンプトに適用中...`);let dt=[];try{let Me=yt.text.trim();const at=Me.match(/```(?:json)?\s*([\s\S]*?)```/);at&&(Me=at[1].trim());const st=Me.indexOf("["),ln=Me.lastIndexOf("]");st!==-1&&ln!==-1&&(Me=Me.substring(st,ln+1)),dt=JSON.parse(Me)}catch(Me){console.error("JSON parse error:",Me,"Raw:",yt.text),re(at=>at+`
> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...`),await Hc();return}if(!Array.isArray(dt)||dt.length===0){re(Me=>Me+`
> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。`);return}let Xe=D,Le=0,je=0;for(const Me of dt)!Me.from||!Me.to||(Xe.includes(Me.from)?(Xe=Xe.replace(Me.from,Me.to),Le++,re(at=>at+`
> ✅ "${Me.from.substring(0,40)}..." → "${Me.to.substring(0,40)}..." (${Me.reason||""})`)):(je++,re(at=>at+`
> ⚠️ 未発見（スキップ）: "${Me.from.substring(0,50)}..."`)));Le>0?(z(Xe),re(Me=>Me+`
> [Phase 5/5] ✅ ${Le}箇所を修正しました（${je}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`),re(Me=>Me+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」してGemini Web版で生成してください。`),Te("")):(re(Me=>Me+`
> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。`),re(Me=>Me+`
> [GUIDE] フォールバック（全文再生成）モードに切り替えます...`),await Hc())}catch(tt){console.error(tt),re(yt=>yt+`
> [ERROR] ${tt.message}`)}finally{clearInterval(ft),Be(!1)}},Hc=async()=>{re(oe=>oe+`
> [Fallback] 全文再生成モードで修正中...`);try{const oe=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
${ge.trim()}

【修正対象のプロンプト】:
${D}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,ft=await Dr(oe,[],null,tt=>{re(yt=>yt+`
> ${tt}`)});ft.text&&ft.text.length>100?(z(ft.text.trim()),re(tt=>tt+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Te("")):re(tt=>tt+`
> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。`)}catch(oe){console.error(oe),re(ft=>ft+`
> [Fallback ERROR] ${oe.message}`)}};Ce.useEffect(()=>{ba>0&&!Hi.current&&Dl()},[ba]);const Dl=async()=>{if(!W||W.length<20){wt("先にキャラクターシートをアップロードしてください。"),Pn(!1);return}Hi.current=!1,Pn(!0),ni(!1),Wn(2);const oe=[...U].sort(()=>Math.random()-.5),ft=Math.random()>.5?2:1,tt=oe.slice(0,ft).map(je=>je.id),yt=U.map(je=>({...je,checked:tt.includes(je.id)}));j(yt),b(""),S(""),c("news"),await new Promise(je=>setTimeout(je,200)),Nl.current?.scrollIntoView({behavior:"smooth",block:"start"});const dt=await Si(yt);if(Hi.current||!dt){Pn(!1),Wn(0),Ni(!1),Hi.current&&wt("⏹ フルオートを中断しました。");return}Wn(3),Eo.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(je=>setTimeout(je,300));const Xe=await Ga(!0,dt);if(Hi.current||!Xe){Pn(!1),Wn(0),Ni(!1),Hi.current&&wt("⏹ フルオートを中断しました。");return}Wn(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(je=>setTimeout(je,300));const Le=await Gc(!0,Xe);await new Promise(je=>setTimeout(je,800)),Ks.current?.scrollIntoView({behavior:"smooth",block:"center"}),Yi.current?Hi.current?(Pn(!1),Wn(0),Ni(!1),wt("⏹ 連続生成を中断しました。")):(wt("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{Hi.current||kr(je=>je+1)},2e3)):(Pn(!1),Wn(0),Ni(!1),Le&&wt("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},zf=()=>{if(Yn){Hi.current=!0,qt>0||Oe||be||ke||it?(Ni(!0),wt("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(Pn(!1),Wn(0),Ni(!1),wt("フルオートを解除しました。"));return}Hi.current=!1,Ni(!1),Pn(!0),W&&W.length>=20?kr(oe=>oe+1):wt("🚀 フルオート待機中: キャラクターシートをドロップしてください")},jt=!W||W.length<1?1:!q||q.length<1?2:D?ya?5:4:3;return g.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[g.jsx(Cv,{isOpen:i,onSave:Mo,provider:"google"}),g.jsx(Cv,{isOpen:yo,onSave:oe=>{const ft=oe.trim(),tt=fm();ft===""&&tt?(aa(!0),wt("🔑 既存のOpenAI APIキーを適用しました。"),Ba(!1)):ft.startsWith("sk-")?(WR(ft),aa(!0),wt("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Ba(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Ba(!1),fm()||aa(!1)},provider:"openai"}),g.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[g.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[g.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[g.jsxs("div",{className:`flex items-center gap-1.5 ${jt>=1?"opacity-100":"opacity-40"}`,children:[g.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${jt===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":jt>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:jt>1?g.jsx(xl,{size:16}):"1"}),g.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),g.jsx(Sc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),g.jsxs("div",{className:`flex items-center gap-1.5 ${jt>=2?"opacity-100":"opacity-40"}`,children:[g.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${jt===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":jt>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:jt>2?g.jsx(xl,{size:16}):"2"}),g.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),g.jsx(Sc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),g.jsxs("div",{className:`flex items-center gap-1.5 ${jt>=3?"opacity-100":"opacity-40"}`,children:[g.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${jt===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":jt>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:jt>3?g.jsx(xl,{size:16}):"3"}),g.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),g.jsx(Sc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),g.jsxs("div",{className:`flex items-center gap-1.5 ${jt>=4?"opacity-100":"opacity-40"}`,children:[g.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${jt===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":jt>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:jt>4?g.jsx(xl,{size:16}):"4"}),g.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),g.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),g.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[g.jsxs("button",{disabled:!r||Wi,onClick:()=>{const oe=!sn;Un(oe),Yi.current=oe},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:sn?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${sn?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[g.jsx(rv,{size:14,className:sn?"animate-spin":"",style:{animationDuration:"3s"}}),g.jsx("span",{className:"whitespace-nowrap",children:sn?"無限ループ設定 解除":"無限ループ設定 ON"})]}),g.jsxs("button",{disabled:!r||Wi,onClick:zf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:Yn?Wi?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Yn?Wi?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!Wi?"opacity-50 cursor-not-allowed":""}`,children:[Yn?Wi?g.jsx(Ua,{size:14,className:"animate-spin"}):g.jsx(aR,{size:14,fill:"currentColor"}):g.jsx(Tf,{size:14}),Yn?Wi?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),g.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),g.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[g.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),g.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),g.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),g.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:g.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),bs(!0),setTimeout(()=>bs(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${Ea?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[g.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[Ea?g.jsx(xl,{size:16}):g.jsx(Ec,{size:16}),g.jsx("span",{className:"whitespace-nowrap",children:Ea?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),g.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),g.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:g.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${jt===1?"w-1/4 bg-blue-500":jt===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":jt===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":jt>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),g.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[g.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),g.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),g.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[g.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[g.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),g.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:g.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:g.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[g.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[g.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:g.jsx(cm,{size:28,className:"text-white"})}),g.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",g.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",g.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:fo})]})]}),g.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[g.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),g.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[g.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?"✅ API認証済":"⚠ 未接続"]}),r&&g.jsxs("button",{onClick:Ao,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター設定を維持したまま、シナリオ以降をやり直す",children:[g.jsx(rv,{size:14})," 入力をリセット"]})]}),ce&&(()=>{const oe=Q(ce);return oe?g.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${oe.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[g.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:oe.label}),g.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),g.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:oe.desc}),g.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[g.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),g.jsxs("p",{children:["現在 ",g.jsx("span",{className:"font-mono text-blue-300",children:ce})," を使用中。"]}),oe.tier==="Lite"&&g.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[g.jsx(lv,{size:10,className:"absolute top-2 right-2"}),g.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),g.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[g.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[g.jsxs("section",{onDragOver:oe=>{oe.preventDefault(),r&&N(!0)},onDragLeave:()=>N(!1),onDrop:oe=>{oe.preventDefault(),N(!1),r&&Zs(oe.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${Nn?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
                ${jt===1&&!Nn?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
                ${jt>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[g.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[g.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${jt===1?"text-blue-400":"text-slate-500"} `,children:[g.jsx(kw,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),Oe&&g.jsx(Ua,{size:18,className:"animate-spin text-blue-400"}),jt>1&&g.jsx(ma,{size:18,className:"text-blue-500"})]}),g.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[Ee.map((oe,ft)=>g.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[g.jsx("img",{src:oe,className:"w-full h-full object-cover shadow-sm"}),g.jsx("button",{onClick:()=>Ne(Ee.filter((tt,yt)=>yt!==ft)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:g.jsx(mp,{size:16})})]},ft)),k&&g.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${pt?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[g.jsx("img",{src:k,className:`w-full h-full object-cover shadow-sm ${pt?"opacity-100":"opacity-40 grayscale"}`}),g.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[g.jsx(Mc,{size:8})," 360° BACKGROUND"]})]}),g.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[Oe?g.jsx(Ua,{size:16,className:"animate-spin"}):g.jsx(g.Fragment,{children:g.jsx(eR,{size:16,className:"group-hover/add:scale-125 transition-transform"})}),g.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:oe=>Zs(oe.target.files),disabled:Oe})]}),Ee.length===0&&!Oe&&g.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[g.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:oe=>Zs(oe.target.files)}),g.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",g.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),g.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",g.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),g.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[g.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),g.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),Oe&&g.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[g.jsxs("span",{className:"relative flex h-3 w-3",children:[g.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),g.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),g.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",Ee.length," chars... ",g.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),g.jsx("div",{className:"mb-4",children:g.jsx(gf,{thought:mn})}),g.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[g.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),g.jsx("textarea",{value:W,onChange:oe=>H(oe.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),g.jsx("div",{className:"mt-2 relative z-50",children:g.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(W),za(!0),setTimeout(()=>za(!1),2e3)},disabled:!W,className:`w-full ${xs?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[xs?g.jsx(ma,{size:20}):g.jsx(Ec,{size:20}),xs?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]}),g.jsxs("section",{ref:Nl,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${jt===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
                 ${jt>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(jt<2||Oe)&&g.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),g.jsx("div",{className:"flex items-center justify-between",children:g.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${jt===2?"text-purple-400":"text-slate-500"} `,children:[g.jsx($w,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),g.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[g.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[g.jsxs("button",{onClick:()=>c("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${l==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[g.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),g.jsxs("button",{onClick:()=>c("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${l==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[g.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),l==="news"?g.jsxs("div",{className:"space-y-4",children:[g.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[g.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),g.jsx("input",{type:"date",value:A,onChange:oe=>F(oe.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),g.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[g.jsx("div",{className:"col-span-2 lg:col-cols-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),U.map(oe=>g.jsxs("label",{className:`
                            relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active: border-b-2 active: translate-y-0.5
                            ${oe.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
      `,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:oe.checked,onChange:()=>L(oe.id)}),oe.checked&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-2 ${oe.checked?"scale-110":"opacity-70 grayscale"} `,children:oe.icon}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:oe.label})]})]},oe.id))]}),g.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",U.filter(oe=>oe.checked).map(oe=>oe.keywords).join(" ")||"なし"," (対象日付: ",A,")"]})]}):g.jsxs("div",{className:"space-y-2",children:[g.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",g.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),g.jsx("textarea",{value:f,onChange:oe=>h(oe.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),g.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[g.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${k&&pt?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[g.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:k&&pt?"#67e8f9":"#ffffff"},children:[g.jsx(Mc,{size:14}),k&&pt?"🌐 360°背景 (ON)":"指定場所 (Location Override)",g.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[Ve&&g.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[g.jsx(Ua,{size:10,className:"animate-spin"})," 解析中..."]}),k&&g.jsx("button",{onClick:oe=>{oe.preventDefault(),On(!pt),wt(pt?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${pt?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:pt?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:pt?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!k&&g.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),k&&pt?g.jsxs("div",{className:"space-y-2",children:[g.jsx(Rv,{imageSrc:k,height:160}),ve&&g.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[g.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",ve.location]}),g.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",ve.lighting]}),g.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:ve.spatialType==="indoor"?"🏠 室内":ve.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),ve.mood&&g.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",ve.mood]})]}),g.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):g.jsx("input",{type:"text",value:_,onChange:oe=>b(oe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),g.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[g.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[g.jsx(ov,{size:14})," 指定服装 (Outfit Override) ",g.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),g.jsx("input",{type:"text",value:x,onChange:oe=>S(oe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),g.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[g.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[g.jsx("span",{children:"🎬"})," オチ・ディレクター ",g.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),g.jsxs("select",{value:C,onChange:oe=>I(oe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[g.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),g.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),g.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),g.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),g.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),g.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),g.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),g.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),g.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),g.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),g.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),g.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),g.jsx("button",{onClick:Si,disabled:be||jt<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:be?g.jsxs(g.Fragment,{children:[g.jsx(Ua,{size:24,className:"animate-spin"}),g.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):g.jsxs(g.Fragment,{children:[g.jsx(Tf,{size:24,className:"fill-yellow-400 text-black"}),g.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),g.jsx(Sc,{size:24,className:"opacity-60"})]})})]}),g.jsxs("div",{className:"space-y-4 mt-6",children:[Gn&&g.jsx("div",{className:"mt-4",children:g.jsx(gf,{thought:Gn})}),g.jsxs("div",{className:"flex flex-col gap-2",children:[g.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可)"}),g.jsx("textarea",{value:q,onChange:oe=>fe(oe.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます..."}),g.jsx("div",{className:"mt-2 relative z-50",children:g.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(q),Qa(!0),setTimeout(()=>Qa(!1),2e3)},disabled:!q,className:`w-full ${va?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[va?g.jsx(ma,{size:20}):g.jsx(Ec,{size:20}),va?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),g.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${q&&q.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[g.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>q&&q.length>20&&Hr(!Ka),children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"text-base",children:"🔥"}),g.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),g.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),_a&&g.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:q&&q.length>20?Ka?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),g.jsx(iv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${Ka?"rotate-180":""}`})]})]}),Ka&&q&&q.length>20&&g.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[g.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",g.jsx("br",{}),g.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),g.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),g.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${De?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:De,onChange:()=>Pe(!De)}),De&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${De?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ut?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:ut,onChange:()=>St(!ut)}),ut&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${ut?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Mt?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:Mt,onChange:()=>V(!Mt)}),Mt&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${Mt?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${we?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:we,onChange:()=>pe(!we)}),we&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${we?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ge?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:Ge,onChange:()=>Fe(!Ge)}),Ge&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${Ge?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),g.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Se?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[g.jsx("input",{type:"checkbox",className:"hidden",checked:Se,onChange:()=>et(!Se)}),Se&&g.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:g.jsx(ma,{size:12,strokeWidth:4})}),g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:`text-2xl mb-1 ${Se?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),g.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),g.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),g.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[De&&"表情",ut&&"身体",Mt&&"演出",we&&"背景",Ge&&"カメラ",Se&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),g.jsxs("div",{className:"flex gap-2",children:[g.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:To,disabled:Gt||!(De||ut||Mt||we||Ge||Se),children:Gt?g.jsxs(g.Fragment,{children:[g.jsx(Ua,{size:16,className:"animate-spin"})," 強化中..."]}):g.jsxs(g.Fragment,{children:[g.jsx(Tf,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),g.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${_a?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:Bc,disabled:Gt||!_a,children:"↩️ 強化前に戻す"})]}),g.jsx(gf,{thought:zi||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})]}),g.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${q?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[g.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[g.jsx(ov,{size:14})," ",k?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),g.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",g.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",g.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",g.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const oe=q?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",ft=q?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",tt=q?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",yt=!!k&&!!ve&&pt,dt=yt?"背景 (Background)":"場所 (Location)",Xe=yt?oe||ve?.location||"360°画像":oe||_.trim()||"AIおまかせ",Le=yt?"画像解析":_.trim()?"手入力":"AIおまかせ",je=yt?"#67e8f9":_.trim()?"#ffffff":"#93c5fd",Me=yt?"rgba(6,182,212,0.3)":_.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",at=yt?"#67e8f9":_.trim()?"#d1d5db":"#93c5fd",st=yt?"rgba(6,182,212,0.4)":_.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[yt?g.jsx(Mc,{size:12,className:"text-cyan-400"}):g.jsx(Mc,{size:12,className:"text-blue-400"}),g.jsxs("span",{children:[dt,":"]}),g.jsx("span",{style:{fontWeight:"bold",color:je},children:Xe}),g.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:Me,color:at,border:`1px solid ${st}`},children:Le})]}),g.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[g.jsx("span",{className:"text-green-400",children:"👕"}),g.jsx("span",{children:"服装 (Outfit):"}),g.jsx("span",{style:{fontWeight:"bold",color:x.trim()?"#ffffff":"#93c5fd"},children:ft||x.trim()||"AIおまかせ"}),g.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:x.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:x.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${x.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:x.trim()?"手入力":"AIおまかせ"})]}),g.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[g.jsx("span",{className:"text-yellow-400",children:"🎬"}),g.jsx("span",{children:"オチ (Punchline):"}),g.jsx("span",{style:{fontWeight:"bold",color:tt||C!=="Auto"?"#ffffff":"#93c5fd"},children:tt||(C==="Auto"?"AIおまかせ":Nv(C))}),g.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:C!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:C!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${C!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:C!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),g.jsxs("section",{ref:Eo,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
              ${jt===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
              ${jt>3?"border border-orange-500/30 opacity-100":""}
          `,children:[(jt<3||be||Oe||Gt||ii)&&g.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:ii&&jt>=3&&g.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[g.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),g.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),g.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),g.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${jt===3?"text-orange-400":"text-slate-500"}`,children:[g.jsx(gp,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),g.jsxs("label",{className:"flex items-center gap-3 px-3 py-2 bg-slate-800/50 border border-white/5 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors group/chatgpt",children:[g.jsx("input",{type:"checkbox",checked:Zt,onChange:oe=>ni(oe.target.checked),className:"w-4 h-4 accent-orange-500 cursor-pointer"}),g.jsxs("div",{className:"flex flex-col",children:[g.jsx("span",{className:"text-xs font-bold text-slate-300 group-hover/chatgpt:text-white transition-colors",children:"🛡️ ChatGPT専用プロンプトモード (v3.04)"}),g.jsx("span",{className:"text-[10px] text-slate-500 text-orange-400/80",children:"※ChatGPT向けの超圧縮プロンプトに切り替えます。このモードのままGemini APIやWeb版Geminiで生成すると、指定フォーマットが合わず画像が著しく乱れる可能性があります。"})]})]}),g.jsx("button",{onClick:()=>Ga(),disabled:ke||ii,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
                   ${jt===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
              `,children:ke?g.jsxs(g.Fragment,{children:[g.jsx(Ua,{size:24,className:"animate-spin"}),g.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):g.jsxs(g.Fragment,{children:[g.jsx(gp,{size:24,className:`text-blue-600 ${jt===3?"animate-bounce":""} `}),g.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),g.jsx(Sc,{size:24,className:"opacity-60"})]})})]}),g.jsxs("div",{ref:Fc,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(jt<3||be||Oe||Gt)&&g.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),g.jsxs("section",{className:"relative group h-full",children:[g.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),g.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[g.jsx("div",{className:"flex items-center justify-between mb-4",children:g.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[g.jsx("button",{onClick:Ol,disabled:!D,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:g.jsx(Ec,{size:14})}),g.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),g.jsx(gf,{thought:ui,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),g.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[Zt&&D&&g.jsxs("div",{className:"bg-orange-950 border-2 border-orange-500 rounded-lg p-3 flex flex-col items-center justify-center gap-1 text-orange-400 shadow-xl mt-2 mb-2 animate-pulse z-50 relative",children:[g.jsxs("div",{className:"font-bold text-sm flex items-center gap-2",children:[g.jsx("span",{children:"🛡️"}),g.jsx("span",{children:"ChatGPT専用 短縮プロンプトモード動作中"})]}),g.jsx("div",{className:"text-xs text-orange-300",children:"※このプロンプトでGemini API(STEP4)を実行すると、制約不足によりレイアウト崩れが発生する可能性があります。"})]}),g.jsx("div",{className:"relative flex-1",children:g.jsx("textarea",{value:D,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),g.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[k&&ve&&pt&&D&&g.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[g.jsx("div",{className:"flex items-start gap-4",children:g.jsxs("div",{className:"flex-1 space-y-1",children:[g.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[g.jsx(Mc,{size:12})," 🌐 360°背景モード (ON)"]}),g.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",g.jsx("br",{}),g.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),g.jsx("br",{}),g.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),g.jsx("br",{}),g.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),g.jsx(Rv,{imageSrc:k,height:120}),g.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),vn&&Vt&&Vt.length===4&&g.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[g.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),g.jsx("div",{className:"grid grid-cols-4 gap-2",children:vn.panels.map((oe,ft)=>{const yt=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((oe.yaw%360+360)%360/45)%8];return g.jsxs("div",{className:"relative",children:[g.jsx("img",{src:Vt[ft],alt:`Panel ${oe.panel} - ${yt}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),g.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[g.jsxs("span",{className:"font-bold",children:["コマ",oe.panel]})," ",yt," ",g.jsxs("span",{className:"text-slate-400",children:["FOV",oe.fov,"°"]})]})]},ft)})}),g.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),g.jsxs("button",{onClick:Ol,disabled:!D,className:`w-full ${vs?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[vs?g.jsx(ma,{size:20}):g.jsx(Ec,{size:20}),vs?"コピー完了":k&&pt?Zt?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":Zt?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),g.jsxs("button",{onClick:()=>{const oe=new Date,ft=Zt?"ChatGPT専用プロンプト":"Gemini用プロンプト",tt={ファイル情報:{フォーマットバージョン:1,アプリバージョン:fo,保存日時:oe.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:oe.toISOString()},プロンプト判別:{モード:ft,ChatGPTモード:Zt,説明:Zt?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:W||"(未解析)",シナリオ:q||"(未生成)",最終プロンプト:D||"(未生成)",生成設定:{パンチラインタイプ:C,カラーモード:un,強化オプション:{表情強化:De,ボディランゲージ強化:ut,"照明・演出強化":Mt,背景強化:we,カメラワーク強化:Ge,"セリフ・ギャグ強化":Se},"360度背景":{画像読込:!!k,有効:pt,場所:ve?.location||"(未解析)",空間タイプ:ve?.spatialType||"(未解析)",光源:ve?.lighting||"(未解析)"}}},yt=JSON.stringify(tt,null,2),dt=new Blob([yt],{type:"application/json;charset=utf-8"}),Xe=URL.createObjectURL(dt),Le=document.createElement("a");Le.href=Xe;const je=q?.match(/タイトル[:：]\s*(.+)/),Me=je?je[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",at=`${String(oe.getFullYear()).slice(-2)}${String(oe.getMonth()+1).padStart(2,"0")}${String(oe.getDate()).padStart(2,"0")}${String(oe.getHours()).padStart(2,"0")}${String(oe.getMinutes()).padStart(2,"0")}${String(oe.getSeconds()).padStart(2,"0")}`;Le.download=`AI_4-koma_metadata_${Me}_${at}.json`,document.body.appendChild(Le),Le.click(),document.body.removeChild(Le),URL.revokeObjectURL(Xe),jn(!0),setTimeout(()=>jn(!1),2500)},disabled:!D,className:`w-full ${Xi?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${Xi?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${Xi?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[Xi?g.jsx(ma,{size:16}):g.jsx(av,{size:16}),Xi?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),g.jsxs("div",{className:"relative mt-2",children:[!ke&&!D&&g.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),g.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",g.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),g.jsxs("label",{className:"flex items-center gap-3 px-3 py-3 mt-4 bg-slate-800/50 border border-white/10 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors",children:[g.jsx("input",{type:"checkbox",checked:Vn,onChange:oe=>Gi(oe.target.checked),className:"w-5 h-5 accent-blue-500 cursor-pointer"}),g.jsxs("div",{className:"flex flex-col opacity-60",children:[g.jsx("span",{className:"text-sm font-bold text-slate-600",children:"🧪 テスト機能：OpenAI API (ChatGPT Images 2.0) で直接画像生成する"}),g.jsxs("span",{className:"text-[11px] text-slate-600 mt-1 leading-relaxed",children:["【⚠現在API制限により実質非対応】OpenAIの画像APIは現段階では、開発アプリ経由の画像生成が許可されていない為、エラーになります。",g.jsx("br",{}),"「プロンプトをコピー」を押し、キャラクター設定と共にブラウザ版ChatGPTへ手動で貼り付けてご使用ください。",g.jsx("br",{}),g.jsx("span",{className:"text-slate-700 text-[10px]",children:"※チェックを入れ直すことで別のAPIキーに変更可能です。"})]})]})]}),g.jsxs("button",{onClick:()=>{console.log("Regenerating..."),Gc()},disabled:!D||it,className:`w-full ${Vn?"bg-blue-600 hover:bg-blue-500":Zt?"bg-red-800 hover:bg-red-700":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[it?g.jsx(Ua,{size:20,className:"animate-spin"}):g.jsx(sv,{size:20}),g.jsxs("div",{className:"flex flex-col items-center",children:[g.jsx("span",{children:it?"再生成中...":`画像を生成する (STEP 4: ${Vn?"ChatGPT Images 2.0 API":Zt?"Gemini API [強引な生成]":"Google AI"})`}),!Vn&&Zt&&g.jsx("span",{className:"text-[10px] text-red-200 mt-1",children:"※このプロンプトでGemini API(STEP4)を実行すると、制約不足によりレイアウト崩れが発生する可能性があります。"})]})]}),g.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:g.jsxs("div",{className:"flex items-start gap-2",children:[g.jsx("div",{className:"mt-0.5 text-orange-400",children:g.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[g.jsx("circle",{cx:"12",cy:"12",r:"10"}),g.jsx("path",{d:"M12 16v-4"}),g.jsx("path",{d:"M12 8h.01"})]})}),g.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[g.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),g.jsx("br",{}),"キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",g.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",g.jsx("strong",{children:"「元となるキャラシート画像」"}),"と一緒に直接貼り付けて生成させてください。",g.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",g.jsx("br",{}),g.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["🧪 ",g.jsx("strong",{children:"ChatGPT対応（テスト）:"})," STEP3の「ChatGPT Images 2.0 強化プロンプト追加」チェックをONにしてプロンプトを構築して、",g.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に「元となるキャラシート画像」と一緒に貼り付ければ、ChatGPTでもマンガ生成が可能です。",g.jsx("br",{}),"※プロンプトを貼り付け後、必ず「テキストフィールドに表示」をクリックして、全文表示させてください。そのまま送信すると、勝手にプロンプトの解説を始めてしまいます。",g.jsx("br",{}),"🛡️ ",g.jsx("strong",{children:"レイアウト安定化:"})," チェックON時、A4縦比率ロック＋パネル剛体制約がプロンプトに自動埋込されます。",g.jsx("br",{}),"⚠️ それでも",g.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある、「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]}),g.jsx("div",{className:"mt-3 block w-full",children:g.jsxs("button",{className:`mt-2 ${jr?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const oe=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
No explanations. No partial results.`;navigator.clipboard.writeText(oe),wo(!0),setTimeout(()=>wo(!1),2e3)},children:[g.jsx("span",{style:{visibility:jr?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),jr&&g.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),g.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${D?"":"opacity-40 pointer-events-none"}`,children:[g.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>He(!ze),disabled:!D,children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"text-base",children:"🛡️"}),g.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!D&&g.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:ze?"クリックで閉じる":"クリックで開く"}),g.jsx(iv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${ze?"rotate-180":""}`})]})]}),ze&&g.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[g.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[g.jsxs("p",{children:["下の",g.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),g.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",g.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),g.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),g.jsxs("button",{className:`${Ea?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),bs(!0),setTimeout(()=>bs(!1),2e3)},children:[g.jsx("span",{style:{visibility:Ea?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),Ea&&g.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),g.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:ge,onChange:oe=>Te(oe.target.value),placeholder:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),g.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Bf,disabled:Ie||!ge.trim()||!D,children:Ie?g.jsxs(g.Fragment,{children:[g.jsx(Ua,{size:16,className:"animate-spin"})," 分析・修正中..."]}):g.jsxs(g.Fragment,{children:[g.jsx(gp,{size:16})," 配慮版プロンプトを再生成する"]})}),g.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:de||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),g.jsxs("div",{ref:qi,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[g.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[g.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),g.jsx("span",{className:"text-blue-500",children:"v1.3.5 (Gemini 2.0 Native)"})]}),M.length===0?g.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):M.map((oe,ft)=>g.jsxs("div",{className:"mb-1 leading-relaxed",children:[g.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),oe]},ft)),it&&g.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),g.jsxs("section",{ref:Ks,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!D&&!ya&&!it||be||ke||Gt||Yn&&qt>0&&qt<4)&&!it&&g.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(be||ke||Gt||Yn&&qt>0&&qt<4)&&g.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[g.jsx(Ua,{size:36,className:"animate-spin text-blue-500"}),g.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:be||ke?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),it&&g.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:g.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[g.jsx(Ua,{size:64,className:"animate-spin text-blue-500 mx-auto"}),g.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),g.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[g.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",g.jsxs("span",{className:"flex space-x-1",children:[g.jsx("span",{className:"animate-bounce delay-75",children:"."}),g.jsx("span",{className:"animate-bounce delay-150",children:"."}),g.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),g.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",g.jsx("br",{}),g.jsxs("span",{className:"text-orange-400",children:["※最大1〜2分程度かかる場合があります。",g.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),g.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:he?g.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:he}):g.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),g.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:ya?g.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[g.jsx("img",{src:ya,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),Ae&&g.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:g.jsxs("div",{className:"flex items-start gap-3",children:[g.jsx(lv,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),g.jsxs("div",{className:"text-sm",children:[g.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),g.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",g.jsx("br",{}),g.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),g.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[g.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),g.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[g.jsxs("li",{children:["画面左側の「",g.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),g.jsxs("li",{children:[g.jsx("a",{href:"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Gemini公式ウェブ版"}),"を開く"]}),g.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),g.jsxs("div",{className:"w-full px-8 mt-2",children:[g.jsxs("button",{onClick:()=>{const oe=document.createElement("a");oe.href=ya,oe.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(oe),oe.click(),document.body.removeChild(oe)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[g.jsx(av,{size:20})," 画像をダウンロード (.png)"]}),g.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):g.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[g.jsx(cm,{size:80,className:"mx-auto"}),g.jsxs("div",{className:"space-y-2 text-center",children:[g.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),g.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),Sa.length>0&&g.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(be||ke||it||Gt||Yn&&qt>0&&qt<4)&&g.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:g.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[g.jsx(Ua,{size:12,className:"animate-spin"})," 生成中..."]})}),g.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[g.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[g.jsx(sv,{size:14,className:"text-blue-400"}),"生成履歴 (",Sa.length,")"]}),g.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Vr([]),sa(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[g.jsx(mp,{size:12})," 全削除"]})]}),g.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:Sa.map(oe=>g.jsxs("div",{onClick:()=>sa(oe.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${ya===oe.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[g.jsx("img",{src:oe.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),ya===oe.img&&g.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:g.jsx(xl,{size:10,strokeWidth:3})}),g.jsx("div",{onClick:ft=>{ft.stopPropagation(),Vr(tt=>tt.filter(yt=>yt.id!==oe.id)),ya===oe.img&&sa("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:g.jsx(mp,{size:10})})]},oe.id))})]})]})]}),g.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",g.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),Ln&&g.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[g.jsx(ma,{size:18,className:"text-green-600"})," ",Ln]}),g.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function JR(){return g.jsx(ZR,{children:g.jsx(QR,{})})}tS.createRoot(document.getElementById("root")).render(g.jsx(Ce.StrictMode,{children:g.jsx(JR,{})}));
