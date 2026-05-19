(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function qy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Lh={exports:{}},gc={};var Wx;function $y(){if(Wx)return gc;Wx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return gc.Fragment=e,gc.jsx=i,gc.jsxs=i,gc}var qx;function Ky(){return qx||(qx=1,Lh.exports=$y()),Lh.exports}var x=Ky(),Ih={exports:{}},Dt={};var $x;function Zy(){if($x)return Dt;$x=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),g=Symbol.iterator;function y(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,S={};function E(P,J,Te){this.props=P,this.context=J,this.refs=S,this.updater=Te||T}E.prototype.isReactComponent={},E.prototype.setState=function(P,J){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,J,"setState")},E.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=E.prototype;function U(P,J,Te){this.props=P,this.context=J,this.refs=S,this.updater=Te||T}var D=U.prototype=new N;D.constructor=U,C(D,E.prototype),D.isPureReactComponent=!0;var X=Array.isArray;function L(){}var z={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function F(P,J,Te){var De=Te.ref;return{$$typeof:r,type:P,key:J,ref:De!==void 0?De:null,props:Te}}function $(P,J){return F(P.type,J,P.props)}function k(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function W(P){var J={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Te){return J[Te]})}var de=/\/+/g;function se(P,J){return typeof P=="object"&&P!==null&&P.key!=null?W(""+P.key):J.toString(36)}function Y(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(J){P.status==="pending"&&(P.status="fulfilled",P.value=J)},function(J){P.status==="pending"&&(P.status="rejected",P.reason=J)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function I(P,J,Te,De,Pe){var oe=typeof P;(oe==="undefined"||oe==="boolean")&&(P=null);var Ee=!1;if(P===null)Ee=!0;else switch(oe){case"bigint":case"string":case"number":Ee=!0;break;case"object":switch(P.$$typeof){case r:case e:Ee=!0;break;case _:return Ee=P._init,I(Ee(P._payload),J,Te,De,Pe)}}if(Ee)return Pe=Pe(P),Ee=De===""?"."+se(P,0):De,X(Pe)?(Te="",Ee!=null&&(Te=Ee.replace(de,"$&/")+"/"),I(Pe,J,Te,"",function(gt){return gt})):Pe!=null&&(k(Pe)&&(Pe=$(Pe,Te+(Pe.key==null||P&&P.key===Pe.key?"":(""+Pe.key).replace(de,"$&/")+"/")+Ee)),J.push(Pe)),1;Ee=0;var Ce=De===""?".":De+":";if(X(P))for(var Ve=0;Ve<P.length;Ve++)De=P[Ve],oe=Ce+se(De,Ve),Ee+=I(De,J,Te,oe,Pe);else if(Ve=y(P),typeof Ve=="function")for(P=Ve.call(P),Ve=0;!(De=P.next()).done;)De=De.value,oe=Ce+se(De,Ve++),Ee+=I(De,J,Te,oe,Pe);else if(oe==="object"){if(typeof P.then=="function")return I(Y(P),J,Te,De,Pe);throw J=String(P),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return Ee}function G(P,J,Te){if(P==null)return P;var De=[],Pe=0;return I(P,De,"","",function(oe){return J.call(Te,oe,Pe++)}),De}function ee(P){if(P._status===-1){var J=P._result;J=J(),J.then(function(Te){(P._status===0||P._status===-1)&&(P._status=1,P._result=Te)},function(Te){(P._status===0||P._status===-1)&&(P._status=2,P._result=Te)}),P._status===-1&&(P._status=0,P._result=J)}if(P._status===1)return P._result.default;throw P._result}var me=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Ae={map:G,forEach:function(P,J,Te){G(P,function(){J.apply(this,arguments)},Te)},count:function(P){var J=0;return G(P,function(){J++}),J},toArray:function(P){return G(P,function(J){return J})||[]},only:function(P){if(!k(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return Dt.Activity=b,Dt.Children=Ae,Dt.Component=E,Dt.Fragment=i,Dt.Profiler=l,Dt.PureComponent=U,Dt.StrictMode=s,Dt.Suspense=m,Dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,Dt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return z.H.useMemoCache(P)}},Dt.cache=function(P){return function(){return P.apply(null,arguments)}},Dt.cacheSignal=function(){return null},Dt.cloneElement=function(P,J,Te){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var De=C({},P.props),Pe=P.key;if(J!=null)for(oe in J.key!==void 0&&(Pe=""+J.key),J)!w.call(J,oe)||oe==="key"||oe==="__self"||oe==="__source"||oe==="ref"&&J.ref===void 0||(De[oe]=J[oe]);var oe=arguments.length-2;if(oe===1)De.children=Te;else if(1<oe){for(var Ee=Array(oe),Ce=0;Ce<oe;Ce++)Ee[Ce]=arguments[Ce+2];De.children=Ee}return F(P.type,Pe,De)},Dt.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},Dt.createElement=function(P,J,Te){var De,Pe={},oe=null;if(J!=null)for(De in J.key!==void 0&&(oe=""+J.key),J)w.call(J,De)&&De!=="key"&&De!=="__self"&&De!=="__source"&&(Pe[De]=J[De]);var Ee=arguments.length-2;if(Ee===1)Pe.children=Te;else if(1<Ee){for(var Ce=Array(Ee),Ve=0;Ve<Ee;Ve++)Ce[Ve]=arguments[Ve+2];Pe.children=Ce}if(P&&P.defaultProps)for(De in Ee=P.defaultProps,Ee)Pe[De]===void 0&&(Pe[De]=Ee[De]);return F(P,oe,Pe)},Dt.createRef=function(){return{current:null}},Dt.forwardRef=function(P){return{$$typeof:h,render:P}},Dt.isValidElement=k,Dt.lazy=function(P){return{$$typeof:_,_payload:{_status:-1,_result:P},_init:ee}},Dt.memo=function(P,J){return{$$typeof:p,type:P,compare:J===void 0?null:J}},Dt.startTransition=function(P){var J=z.T,Te={};z.T=Te;try{var De=P(),Pe=z.S;Pe!==null&&Pe(Te,De),typeof De=="object"&&De!==null&&typeof De.then=="function"&&De.then(L,me)}catch(oe){me(oe)}finally{J!==null&&Te.types!==null&&(J.types=Te.types),z.T=J}},Dt.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},Dt.use=function(P){return z.H.use(P)},Dt.useActionState=function(P,J,Te){return z.H.useActionState(P,J,Te)},Dt.useCallback=function(P,J){return z.H.useCallback(P,J)},Dt.useContext=function(P){return z.H.useContext(P)},Dt.useDebugValue=function(){},Dt.useDeferredValue=function(P,J){return z.H.useDeferredValue(P,J)},Dt.useEffect=function(P,J){return z.H.useEffect(P,J)},Dt.useEffectEvent=function(P){return z.H.useEffectEvent(P)},Dt.useId=function(){return z.H.useId()},Dt.useImperativeHandle=function(P,J,Te){return z.H.useImperativeHandle(P,J,Te)},Dt.useInsertionEffect=function(P,J){return z.H.useInsertionEffect(P,J)},Dt.useLayoutEffect=function(P,J){return z.H.useLayoutEffect(P,J)},Dt.useMemo=function(P,J){return z.H.useMemo(P,J)},Dt.useOptimistic=function(P,J){return z.H.useOptimistic(P,J)},Dt.useReducer=function(P,J,Te){return z.H.useReducer(P,J,Te)},Dt.useRef=function(P){return z.H.useRef(P)},Dt.useState=function(P){return z.H.useState(P)},Dt.useSyncExternalStore=function(P,J,Te){return z.H.useSyncExternalStore(P,J,Te)},Dt.useTransition=function(){return z.H.useTransition()},Dt.version="19.2.3",Dt}var Kx;function gm(){return Kx||(Kx=1,Ih.exports=Zy()),Ih.exports}var Ne=gm();const Qy=qy(Ne);var Uh={exports:{}},xc={},Ph={exports:{}},Fh={};var Zx;function Jy(){return Zx||(Zx=1,(function(r){function e(I,G){var ee=I.length;I.push(G);e:for(;0<ee;){var me=ee-1>>>1,Ae=I[me];if(0<l(Ae,G))I[me]=G,I[ee]=Ae,ee=me;else break e}}function i(I){return I.length===0?null:I[0]}function s(I){if(I.length===0)return null;var G=I[0],ee=I.pop();if(ee!==G){I[0]=ee;e:for(var me=0,Ae=I.length,P=Ae>>>1;me<P;){var J=2*(me+1)-1,Te=I[J],De=J+1,Pe=I[De];if(0>l(Te,ee))De<Ae&&0>l(Pe,Te)?(I[me]=Pe,I[De]=ee,me=De):(I[me]=Te,I[J]=ee,me=J);else if(De<Ae&&0>l(Pe,ee))I[me]=Pe,I[De]=ee,me=De;else break e}}return G}function l(I,G){var ee=I.sortIndex-G.sortIndex;return ee!==0?ee:I.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],_=1,b=null,g=3,y=!1,T=!1,C=!1,S=!1,E=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function D(I){for(var G=i(p);G!==null;){if(G.callback===null)s(p);else if(G.startTime<=I)s(p),G.sortIndex=G.expirationTime,e(m,G);else break;G=i(p)}}function X(I){if(C=!1,D(I),!T)if(i(m)!==null)T=!0,L||(L=!0,W());else{var G=i(p);G!==null&&Y(X,G.startTime-I)}}var L=!1,z=-1,w=5,F=-1;function $(){return S?!0:!(r.unstable_now()-F<w)}function k(){if(S=!1,L){var I=r.unstable_now();F=I;var G=!0;try{e:{T=!1,C&&(C=!1,N(z),z=-1),y=!0;var ee=g;try{t:{for(D(I),b=i(m);b!==null&&!(b.expirationTime>I&&$());){var me=b.callback;if(typeof me=="function"){b.callback=null,g=b.priorityLevel;var Ae=me(b.expirationTime<=I);if(I=r.unstable_now(),typeof Ae=="function"){b.callback=Ae,D(I),G=!0;break t}b===i(m)&&s(m),D(I)}else s(m);b=i(m)}if(b!==null)G=!0;else{var P=i(p);P!==null&&Y(X,P.startTime-I),G=!1}}break e}finally{b=null,g=ee,y=!1}G=void 0}}finally{G?W():L=!1}}}var W;if(typeof U=="function")W=function(){U(k)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,se=de.port2;de.port1.onmessage=k,W=function(){se.postMessage(null)}}else W=function(){E(k,0)};function Y(I,G){z=E(function(){I(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(I){I.callback=null},r.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<I?Math.floor(1e3/I):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(I){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var ee=g;g=G;try{return I()}finally{g=ee}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(I,G){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var ee=g;g=I;try{return G()}finally{g=ee}},r.unstable_scheduleCallback=function(I,G,ee){var me=r.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?me+ee:me):ee=me,I){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=ee+Ae,I={id:_++,callback:G,priorityLevel:I,startTime:ee,expirationTime:Ae,sortIndex:-1},ee>me?(I.sortIndex=ee,e(p,I),i(m)===null&&I===i(p)&&(C?(N(z),z=-1):C=!0,Y(X,ee-me))):(I.sortIndex=Ae,e(m,I),T||y||(T=!0,L||(L=!0,W()))),I},r.unstable_shouldYield=$,r.unstable_wrapCallback=function(I){var G=g;return function(){var ee=g;g=G;try{return I.apply(this,arguments)}finally{g=ee}}}})(Fh)),Fh}var Qx;function eE(){return Qx||(Qx=1,Ph.exports=Jy()),Ph.exports}var Bh={exports:{}},Hi={};var Jx;function tE(){if(Jx)return Hi;Jx=1;var r=gm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:b==null?null:""+b,children:m,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Hi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Hi.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,_)},Hi.flushSync=function(m){var p=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=_,s.d.f()}},Hi.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Hi.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Hi.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,b=h(_,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,y=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:b,integrity:g,fetchPriority:y}):_==="script"&&s.d.X(m,{crossOrigin:b,integrity:g,fetchPriority:y,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Hi.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Hi.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,b=h(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Hi.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Hi.requestFormReset=function(m){s.d.r(m)},Hi.unstable_batchedUpdates=function(m,p){return m(p)},Hi.useFormState=function(m,p,_){return f.H.useFormState(m,p,_)},Hi.useFormStatus=function(){return f.H.useHostTransitionStatus()},Hi.version="19.2.3",Hi}var e_;function nE(){if(e_)return Bh.exports;e_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Bh.exports=tE(),Bh.exports}var t_;function iE(){if(t_)return xc;t_=1;var r=eE(),e=gm(),i=nE();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var v=!1,R=u.child;R;){if(R===a){v=!0,a=u,o=d;break}if(R===o){v=!0,o=u,a=d;break}R=R.sibling}if(!v){for(R=d.child;R;){if(R===a){v=!0,a=d,o=u;break}if(R===o){v=!0,o=d,a=u;break}R=R.sibling}if(!v)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var b=Object.assign,g=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),U=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function W(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var de=Symbol.for("react.client.reference");function se(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===de?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case E:return"Profiler";case S:return"StrictMode";case X:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case T:return"Portal";case U:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case D:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case z:return n=t.displayName||null,n!==null?n:se(t.type)||"Memo";case w:n=t._payload,t=t._init;try{return se(t(n))}catch{}}return null}var Y=Array.isArray,I=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},me=[],Ae=-1;function P(t){return{current:t}}function J(t){0>Ae||(t.current=me[Ae],me[Ae]=null,Ae--)}function Te(t,n){Ae++,me[Ae]=t.current,t.current=n}var De=P(null),Pe=P(null),oe=P(null),Ee=P(null);function Ce(t,n){switch(Te(oe,n),Te(Pe,t),Te(De,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?gx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=gx(n),t=xx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}J(De),Te(De,t)}function Ve(){J(De),J(Pe),J(oe)}function gt(t){t.memoizedState!==null&&Te(Ee,t);var n=De.current,a=xx(n,t.type);n!==a&&(Te(Pe,t),Te(De,a))}function et(t){Pe.current===t&&(J(De),J(Pe)),Ee.current===t&&(J(Ee),dc._currentValue=ee)}var mn,vt;function Vt(t){if(mn===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);mn=n&&n[1]||"",vt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+mn+t+vt}var gn=!1;function Ct(t,n){if(!t||gn)return"";gn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ye=function(){throw Error()};if(Object.defineProperty(ye.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ye,[])}catch(ue){var ce=ue}Reflect.construct(t,[],ye)}else{try{ye.call()}catch(ue){ce=ue}t.call(ye.prototype)}}else{try{throw Error()}catch(ue){ce=ue}(ye=t())&&typeof ye.catch=="function"&&ye.catch(function(){})}}catch(ue){if(ue&&ce&&typeof ue.stack=="string")return[ue.stack,ce.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),v=d[0],R=d[1];if(v&&R){var B=v.split(`
`),ae=R.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ae.length&&!ae[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===ae.length)for(o=B.length-1,u=ae.length-1;1<=o&&0<=u&&B[o]!==ae[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==ae[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==ae[u]){var ge=`
`+B[o].replace(" at new "," at ");return t.displayName&&ge.includes("<anonymous>")&&(ge=ge.replace("<anonymous>",t.displayName)),ge}while(1<=o&&0<=u);break}}}finally{gn=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Vt(a):""}function Xn(t,n){switch(t.tag){case 26:case 27:case 5:return Vt(t.type);case 16:return Vt("Lazy");case 13:return t.child!==n&&n!==null?Vt("Suspense Fallback"):Vt("Suspense");case 19:return Vt("SuspenseList");case 0:case 15:return Ct(t.type,!1);case 11:return Ct(t.type.render,!1);case 1:return Ct(t.type,!0);case 31:return Vt("Activity");default:return""}}function Yt(t){try{var n="",a=null;do n+=Xn(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ui=Object.prototype.hasOwnProperty,H=r.unstable_scheduleCallback,In=r.unstable_cancelCallback,Mt=r.unstable_shouldYield,dn=r.unstable_requestPaint,Ie=r.unstable_now,Sn=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,M=r.unstable_UserBlockingPriority,Q=r.unstable_NormalPriority,xe=r.unstable_LowPriority,be=r.unstable_IdlePriority,Le=r.log,Fe=r.unstable_setDisableYieldValue,fe=null,he=null;function je(t){if(typeof Le=="function"&&Fe(t),he&&typeof he.setStrictMode=="function")try{he.setStrictMode(fe,t)}catch{}}var we=Math.clz32?Math.clz32:dt,Be=Math.log,Ue=Math.LN2;function dt(t){return t>>>=0,t===0?32:31-(Be(t)/Ue|0)|0}var Et=256,Tt=262144,V=4194304;function Re(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function pe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,v=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=Re(o):(v&=R,v!==0?u=Re(v):a||(a=R&~t,a!==0&&(u=Re(a))))):(R=o&~d,R!==0?u=Re(R):v!==0?u=Re(v):a||(a=o&~t,a!==0&&(u=Re(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Ge(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function ze(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Se(){var t=V;return V<<=1,(V&62914560)===0&&(V=4194304),t}function tt(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ct(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ln(t,n,a,o,u,d){var v=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,B=t.expirationTimes,ae=t.hiddenUpdates;for(a=v&~a;0<a;){var ge=31-we(a),ye=1<<ge;R[ge]=0,B[ge]=-1;var ce=ae[ge];if(ce!==null)for(ae[ge]=null,ge=0;ge<ce.length;ge++){var ue=ce[ge];ue!==null&&(ue.lane&=-536870913)}a&=~ye}o!==0&&tn(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(v&~n))}function tn(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-we(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function $i(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-we(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Yn(t,n){var a=n&-n;return a=(a&42)!==0?1:Za(a),(a&(t.suspendedLanes|n))!==0?0:a}function Za(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Gr(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ni(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:Gx(t.type))}function Qa(t,n){var a=G.p;try{return G.p=t,n()}finally{G.p=a}}var Ei=Math.random().toString(36).slice(2),Mn="__reactFiber$"+Ei,ii="__reactProps$"+Ei,Un="__reactContainer$"+Ei,Ea="__reactEvents$"+Ei,Wn="__reactListeners$"+Ei,Sa="__reactHandles$"+Ei,Hr="__reactResources$"+Ei,Ma="__reactMarker$"+Ei;function Mo(t){delete t[Mn],delete t[ii],delete t[Ea],delete t[Wn],delete t[Sa]}function bs(t){var n=t[Mn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Un]||a[Mn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Mx(t);t!==null;){if(a=t[Mn])return a;t=Mx(t)}return n}t=a,a=t.parentNode}return null}function Ta(t){if(t=t[Mn]||t[Un]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Ja(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Aa(t){var n=t[Hr];return n||(n=t[Hr]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function qn(t){t[Ma]=!0}var es=new Set,A={};function q(t,n){re(t,n),re(t+"Capture",n)}function re(t,n){for(A[t]=n,t=0;t<n.length;t++)es.add(n[t])}var K=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),te={},Xe={};function $e(t){return ui.call(Xe,t)?!0:ui.call(te,t)?!1:K.test(t)?Xe[t]=!0:(te[t]=!0,!1)}function _e(t,n,a){if($e(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ze(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Je(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function ft(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Lt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ut(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){a=""+v,d.call(this,v)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(v){a=""+v},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function nn(t){if(!t._valueTracker){var n=Lt(t)?"checked":"value";t._valueTracker=ut(t,n,""+t[n])}}function Pn(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=Lt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function pt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var on=/[\n"\\]/g;function ln(t){return t.replace(on,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function We(t,n,a,o,u,d,v,R){t.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?t.type=v:t.removeAttribute("type"),n!=null?v==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ft(n)):t.value!==""+ft(n)&&(t.value=""+ft(n)):v!=="submit"&&v!=="reset"||t.removeAttribute("value"),n!=null?Bt(t,v,ft(n)):a!=null?Bt(t,v,ft(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+ft(R):t.removeAttribute("name")}function Nn(t,n,a,o,u,d,v,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){nn(t);return}a=a!=null?""+ft(a):"",n=n!=null?""+ft(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(t.name=v),nn(t)}function Bt(t,n,a){n==="number"&&pt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function $n(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+ft(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function ai(t,n,a){if(n!=null&&(n=""+ft(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ft(a):""}function oa(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(Y(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ft(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),nn(t)}function Hn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Pt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function xn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Pt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function la(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&xn(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&xn(t,d,n[d])}function an(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Si=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),si=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zs(t){return si.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ts(){}var To=null;function kr(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Mi=null,Ki=null;function wa(t){var n=Ta(t);if(n&&(t=n.stateNode)){var a=t[ii]||null;e:switch(t=n.stateNode,n.type){case"input":if(We(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ln(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[ii]||null;if(!u)throw Error(s(90));We(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Pn(o)}break e;case"textarea":ai(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&$n(t,!!a.multiple,n,!1)}}}var Ao=!1;function Dl(t,n,a){if(Ao)return t(n,a);Ao=!0;try{var o=t(n);return o}finally{if(Ao=!1,(Mi!==null||Ki!==null)&&(Tu(),Mi&&(n=Mi,t=Ki,Ki=Mi=null,wa(n),t)))for(n=0;n<t.length;n++)wa(t[n])}}function Vr(t,n){var a=t.stateNode;if(a===null)return null;var o=a[ii]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ra=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Qs=!1;if(Ra)try{var Zi={};Object.defineProperty(Zi,"passive",{get:function(){Qs=!0}}),window.addEventListener("test",Zi,Zi),window.removeEventListener("test",Zi,Zi)}catch{Qs=!1}var Oi=null,jr=null,ys=null;function Gc(){if(ys)return ys;var t,n=jr,a=n.length,o,u="value"in Oi?Oi.value:Oi.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var v=a-t;for(o=1;o<=v&&n[a-o]===u[d-o];o++);return ys=u.slice(t,1<o?1-o:void 0)}function St(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Js(){return!0}function Hc(){return!1}function zi(t){function n(a,o,u,d,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=v,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Js:Hc,this.isPropagationStopped=Hc,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Js)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Js)},persist:function(){},isPersistent:Js}),n}var ns={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},er=zi(ns),Xr=b({},ns,{view:0,detail:0}),kf=zi(Xr),Yr,wo,Es,Wr=b({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Oe,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Es&&(Es&&t.type==="mousemove"?(Yr=t.screenX-Es.screenX,wo=t.screenY-Es.screenY):wo=Yr=0,Es=t),Yr)},movementY:function(t){return"movementY"in t?t.movementY:wo}}),Ss=zi(Wr),Ro=b({},Wr,{dataTransfer:0}),kc=zi(Ro),Vc=b({},Xr,{relatedTarget:0}),Ll=zi(Vc),jc=b({},ns,{animationName:0,elapsedTime:0,pseudoElement:0}),Vf=zi(jc),jf=b({},ns,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Gt=zi(jf),le=b({},ns,{data:0}),lt=zi(le),nt={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},bt={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ht={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ye(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=ht[t])?!!n[t]:!1}function Oe(){return Ye}var He=b({},Xr,{key:function(t){if(t.key){var n=nt[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=St(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?bt[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Oe,charCode:function(t){return t.type==="keypress"?St(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?St(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Me=zi(He),at=b({},Wr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nt=zi(at),jt=b({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Oe}),gi=zi(jt),qr=b({},ns,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kn=zi(qr),wt=b({},Wr,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Di=zi(wt),Ti=b({},ns,{newState:0,oldState:0}),Qn=zi(Ti),hn=[9,13,27,32],_n=Ra&&"CompositionEvent"in window,sn=null;Ra&&"documentMode"in document&&(sn=document.documentMode);var Fn=Ra&&"TextEvent"in window&&!sn,vn=Ra&&(!_n||sn&&8<sn&&11>=sn),Li=" ",Ai=!1;function kn(t,n){switch(t){case"keyup":return hn.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ca(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Bn=!1;function Ca(t,n){switch(t){case"compositionend":return ca(n);case"keypress":return n.which!==32?null:(Ai=!0,Li);case"textInput":return t=n.data,t===Li&&Ai?null:t;default:return null}}function Ht(t,n){if(Bn)return t==="compositionend"||!_n&&kn(t,n)?(t=Gc(),ys=jr=Oi=null,Bn=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return vn&&n.locale!=="ko"?null:n.data;default:return null}}var On={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gi(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!On[t.type]:n==="textarea"}function wi(t,n,a,o){Mi?Ki?Ki.push(o):Ki=[o]:Mi=o,n=Du(n,"onChange"),0<n.length&&(a=new er("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Jn=null,Qi=null;function tr(t){ux(t,0)}function nr(t){var n=Ja(t);if(Pn(n))return t}function Il(t,n){if(t==="change")return n}var Co=!1;if(Ra){var Ul;if(Ra){var No="oninput"in document;if(!No){var Pl=document.createElement("div");Pl.setAttribute("oninput","return;"),No=typeof Pl.oninput=="function"}Ul=No}else Ul=!1;Co=Ul&&(!document.documentMode||9<document.documentMode)}function Fl(){Jn&&(Jn.detachEvent("onpropertychange",ir),Qi=Jn=null)}function ir(t){if(t.propertyName==="value"&&nr(Qi)){var n=[];wi(n,Qi,t,kr(t)),Dl(tr,n)}}function Oo(t,n,a){t==="focusin"?(Fl(),Jn=n,Qi=a,Jn.attachEvent("onpropertychange",ir)):t==="focusout"&&Fl()}function xt(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return nr(Qi)}function Rt(t,n){if(t==="click")return nr(n)}function Qe(t,n){if(t==="input"||t==="change")return nr(n)}function It(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ke=typeof Object.is=="function"?Object.is:It;function Ke(t,n){if(ke(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ui.call(n,u)||!ke(t[u],n[u]))return!1}return!0}function rt(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function st(t,n){var a=rt(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=rt(a)}}function Ot(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Ot(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function cn(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=pt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=pt(t.document)}return n}function Zn(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var yt=Ra&&"documentMode"in document&&11>=document.documentMode,en=null,Vn=null,ei=null,ua=!1;function Ms(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ua||en==null||en!==pt(o)||(o=en,"selectionStart"in o&&Zn(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),ei&&Ke(ei,o)||(ei=o,o=Du(Vn,"onSelect"),0<o.length&&(n=new er("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=en)))}function is(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Do={animationend:is("Animation","AnimationEnd"),animationiteration:is("Animation","AnimationIteration"),animationstart:is("Animation","AnimationStart"),transitionrun:is("Transition","TransitionRun"),transitionstart:is("Transition","TransitionStart"),transitioncancel:is("Transition","TransitionCancel"),transitionend:is("Transition","TransitionEnd")},Xf={},zm={};Ra&&(zm=document.createElement("div").style,"AnimationEvent"in window||(delete Do.animationend.animation,delete Do.animationiteration.animation,delete Do.animationstart.animation),"TransitionEvent"in window||delete Do.transitionend.transition);function $r(t){if(Xf[t])return Xf[t];if(!Do[t])return t;var n=Do[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in zm)return Xf[t]=n[a];return t}var Gm=$r("animationend"),Hm=$r("animationiteration"),km=$r("animationstart"),Rb=$r("transitionrun"),Cb=$r("transitionstart"),Nb=$r("transitioncancel"),Vm=$r("transitionend"),jm=new Map,Yf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Yf.push("scrollEnd");function Va(t,n){jm.set(t,n),q(n,[t])}var Xc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Na=[],Lo=0,Wf=0;function Yc(){for(var t=Lo,n=Wf=Lo=0;n<t;){var a=Na[n];Na[n++]=null;var o=Na[n];Na[n++]=null;var u=Na[n];Na[n++]=null;var d=Na[n];if(Na[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}d!==0&&Xm(a,u,d)}}function Wc(t,n,a,o){Na[Lo++]=t,Na[Lo++]=n,Na[Lo++]=a,Na[Lo++]=o,Wf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function qf(t,n,a,o){return Wc(t,n,a,o),qc(t)}function Kr(t,n){return Wc(t,null,null,n),qc(t)}function Xm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-we(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function qc(t){if(50<sc)throw sc=0,ih=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Io={};function Ob(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fa(t,n,a,o){return new Ob(t,n,a,o)}function $f(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ts(t,n){var a=t.alternate;return a===null?(a=fa(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Ym(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function $c(t,n,a,o,u,d){var v=0;if(o=t,typeof t=="function")$f(t)&&(v=1);else if(typeof t=="string")v=Py(t,a,De.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=fa(31,a,n,u),t.elementType=F,t.lanes=d,t;case C:return Zr(a.children,u,d,n);case S:v=8,u|=24;break;case E:return t=fa(12,a,n,u|2),t.elementType=E,t.lanes=d,t;case X:return t=fa(13,a,n,u),t.elementType=X,t.lanes=d,t;case L:return t=fa(19,a,n,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:v=10;break e;case N:v=9;break e;case D:v=11;break e;case z:v=14;break e;case w:v=16,o=null;break e}v=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=fa(v,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function Zr(t,n,a,o){return t=fa(7,t,o,n),t.lanes=a,t}function Kf(t,n,a){return t=fa(6,t,null,n),t.lanes=a,t}function Wm(t){var n=fa(18,null,null,0);return n.stateNode=t,n}function Zf(t,n,a){return n=fa(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var qm=new WeakMap;function Oa(t,n){if(typeof t=="object"&&t!==null){var a=qm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Yt(n)},qm.set(t,n),n)}return{value:t,source:n,stack:Yt(n)}}var Uo=[],Po=0,Kc=null,Bl=0,Da=[],La=0,ar=null,as=1,ss="";function As(t,n){Uo[Po++]=Bl,Uo[Po++]=Kc,Kc=t,Bl=n}function $m(t,n,a){Da[La++]=as,Da[La++]=ss,Da[La++]=ar,ar=t;var o=as;t=ss;var u=32-we(o)-1;o&=~(1<<u),a+=1;var d=32-we(n)+u;if(30<d){var v=u-u%5;d=(o&(1<<v)-1).toString(32),o>>=v,u-=v,as=1<<32-we(n)+u|a<<u|o,ss=d+t}else as=1<<d|a<<u|o,ss=t}function Qf(t){t.return!==null&&(As(t,1),$m(t,1,0))}function Jf(t){for(;t===Kc;)Kc=Uo[--Po],Uo[Po]=null,Bl=Uo[--Po],Uo[Po]=null;for(;t===ar;)ar=Da[--La],Da[La]=null,ss=Da[--La],Da[La]=null,as=Da[--La],Da[La]=null}function Km(t,n){Da[La++]=as,Da[La++]=ss,Da[La++]=ar,as=n.id,ss=n.overflow,ar=t}var Ii=null,zn=null,Qt=!1,sr=null,Ia=!1,ed=Error(s(519));function rr(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw zl(Oa(n,t)),ed}function Zm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Mn]=t,n[ii]=o,a){case"dialog":qt("cancel",n),qt("close",n);break;case"iframe":case"object":case"embed":qt("load",n);break;case"video":case"audio":for(a=0;a<oc.length;a++)qt(oc[a],n);break;case"source":qt("error",n);break;case"img":case"image":case"link":qt("error",n),qt("load",n);break;case"details":qt("toggle",n);break;case"input":qt("invalid",n),Nn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":qt("invalid",n);break;case"textarea":qt("invalid",n),oa(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||px(n.textContent,a)?(o.popover!=null&&(qt("beforetoggle",n),qt("toggle",n)),o.onScroll!=null&&qt("scroll",n),o.onScrollEnd!=null&&qt("scrollend",n),o.onClick!=null&&(n.onclick=ts),n=!0):n=!1,n||rr(t,!0)}function Qm(t){for(Ii=t.return;Ii;)switch(Ii.tag){case 5:case 31:case 13:Ia=!1;return;case 27:case 3:Ia=!0;return;default:Ii=Ii.return}}function Fo(t){if(t!==Ii)return!1;if(!Qt)return Qm(t),Qt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||_h(t.type,t.memoizedProps)),a=!a),a&&zn&&rr(t),Qm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));zn=Sx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));zn=Sx(t)}else n===27?(n=zn,br(t.type)?(t=Sh,Sh=null,zn=t):zn=n):zn=Ii?Pa(t.stateNode.nextSibling):null;return!0}function Qr(){zn=Ii=null,Qt=!1}function td(){var t=sr;return t!==null&&(na===null?na=t:na.push.apply(na,t),sr=null),t}function zl(t){sr===null?sr=[t]:sr.push(t)}var nd=P(null),Jr=null,ws=null;function or(t,n,a){Te(nd,n._currentValue),n._currentValue=a}function Rs(t){t._currentValue=nd.current,J(nd)}function id(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function ad(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var v=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var B=0;B<n.length;B++)if(R.context===n[B]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),id(d.return,a,t),o||(v=null);break e}d=R.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(s(341));v.lanes|=a,d=v.alternate,d!==null&&(d.lanes|=a),id(v,a,t),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===t){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function Bo(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(s(387));if(v=v.memoizedProps,v!==null){var R=u.type;ke(u.pendingProps.value,v.value)||(t!==null?t.push(R):t=[R])}}else if(u===Ee.current){if(v=u.alternate,v===null)throw Error(s(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(dc):t=[dc])}u=u.return}t!==null&&ad(n,t,a,o),n.flags|=262144}function Zc(t){for(t=t.firstContext;t!==null;){if(!ke(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function eo(t){Jr=t,ws=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ui(t){return Jm(Jr,t)}function Qc(t,n){return Jr===null&&eo(t),Jm(t,n)}function Jm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ws===null){if(t===null)throw Error(s(308));ws=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ws=ws.next=n;return a}var Db=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Lb=r.unstable_scheduleCallback,Ib=r.unstable_NormalPriority,fi={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function sd(){return{controller:new Db,data:new Map,refCount:0}}function Gl(t){t.refCount--,t.refCount===0&&Lb(Ib,function(){t.controller.abort()})}var Hl=null,rd=0,zo=0,Go=null;function Ub(t,n){if(Hl===null){var a=Hl=[];rd=0,zo=ch(),Go={status:"pending",value:void 0,then:function(o){a.push(o)}}}return rd++,n.then(eg,eg),n}function eg(){if(--rd===0&&Hl!==null){Go!==null&&(Go.status="fulfilled");var t=Hl;Hl=null,zo=0,Go=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Pb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var tg=I.S;I.S=function(t,n){B0=Ie(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ub(t,n),tg!==null&&tg(t,n)};var to=P(null);function od(){var t=to.current;return t!==null?t:Dn.pooledCache}function Jc(t,n){n===null?Te(to,to.current):Te(to,n.pool)}function ng(){var t=od();return t===null?null:{parent:fi._currentValue,pool:t}}var Ho=Error(s(460)),ld=Error(s(474)),eu=Error(s(542)),tu={then:function(){}};function ig(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ag(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ts,ts),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,rg(t),t;default:if(typeof n.status=="string")n.then(ts,ts);else{if(t=Dn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,rg(t),t}throw io=n,Ho}}function no(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(io=a,Ho):a}}var io=null;function sg(){if(io===null)throw Error(s(459));var t=io;return io=null,t}function rg(t){if(t===Ho||t===eu)throw Error(s(483))}var ko=null,kl=0;function nu(t){var n=kl;return kl+=1,ko===null&&(ko=[]),ag(ko,t,n)}function Vl(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function iu(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function og(t){function n(Z,j){if(t){var ie=Z.deletions;ie===null?(Z.deletions=[j],Z.flags|=16):ie.push(j)}}function a(Z,j){if(!t)return null;for(;j!==null;)n(Z,j),j=j.sibling;return null}function o(Z){for(var j=new Map;Z!==null;)Z.key!==null?j.set(Z.key,Z):j.set(Z.index,Z),Z=Z.sibling;return j}function u(Z,j){return Z=Ts(Z,j),Z.index=0,Z.sibling=null,Z}function d(Z,j,ie){return Z.index=ie,t?(ie=Z.alternate,ie!==null?(ie=ie.index,ie<j?(Z.flags|=67108866,j):ie):(Z.flags|=67108866,j)):(Z.flags|=1048576,j)}function v(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function R(Z,j,ie,ve){return j===null||j.tag!==6?(j=Kf(ie,Z.mode,ve),j.return=Z,j):(j=u(j,ie),j.return=Z,j)}function B(Z,j,ie,ve){var mt=ie.type;return mt===C?ge(Z,j,ie.props.children,ve,ie.key):j!==null&&(j.elementType===mt||typeof mt=="object"&&mt!==null&&mt.$$typeof===w&&no(mt)===j.type)?(j=u(j,ie.props),Vl(j,ie),j.return=Z,j):(j=$c(ie.type,ie.key,ie.props,null,Z.mode,ve),Vl(j,ie),j.return=Z,j)}function ae(Z,j,ie,ve){return j===null||j.tag!==4||j.stateNode.containerInfo!==ie.containerInfo||j.stateNode.implementation!==ie.implementation?(j=Zf(ie,Z.mode,ve),j.return=Z,j):(j=u(j,ie.children||[]),j.return=Z,j)}function ge(Z,j,ie,ve,mt){return j===null||j.tag!==7?(j=Zr(ie,Z.mode,ve,mt),j.return=Z,j):(j=u(j,ie),j.return=Z,j)}function ye(Z,j,ie){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=Kf(""+j,Z.mode,ie),j.return=Z,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case y:return ie=$c(j.type,j.key,j.props,null,Z.mode,ie),Vl(ie,j),ie.return=Z,ie;case T:return j=Zf(j,Z.mode,ie),j.return=Z,j;case w:return j=no(j),ye(Z,j,ie)}if(Y(j)||W(j))return j=Zr(j,Z.mode,ie,null),j.return=Z,j;if(typeof j.then=="function")return ye(Z,nu(j),ie);if(j.$$typeof===U)return ye(Z,Qc(Z,j),ie);iu(Z,j)}return null}function ce(Z,j,ie,ve){var mt=j!==null?j.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number"||typeof ie=="bigint")return mt!==null?null:R(Z,j,""+ie,ve);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case y:return ie.key===mt?B(Z,j,ie,ve):null;case T:return ie.key===mt?ae(Z,j,ie,ve):null;case w:return ie=no(ie),ce(Z,j,ie,ve)}if(Y(ie)||W(ie))return mt!==null?null:ge(Z,j,ie,ve,null);if(typeof ie.then=="function")return ce(Z,j,nu(ie),ve);if(ie.$$typeof===U)return ce(Z,j,Qc(Z,ie),ve);iu(Z,ie)}return null}function ue(Z,j,ie,ve,mt){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return Z=Z.get(ie)||null,R(j,Z,""+ve,mt);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case y:return Z=Z.get(ve.key===null?ie:ve.key)||null,B(j,Z,ve,mt);case T:return Z=Z.get(ve.key===null?ie:ve.key)||null,ae(j,Z,ve,mt);case w:return ve=no(ve),ue(Z,j,ie,ve,mt)}if(Y(ve)||W(ve))return Z=Z.get(ie)||null,ge(j,Z,ve,mt,null);if(typeof ve.then=="function")return ue(Z,j,ie,nu(ve),mt);if(ve.$$typeof===U)return ue(Z,j,ie,Qc(j,ve),mt);iu(j,ve)}return null}function it(Z,j,ie,ve){for(var mt=null,un=null,ot=j,zt=j=0,Zt=null;ot!==null&&zt<ie.length;zt++){ot.index>zt?(Zt=ot,ot=null):Zt=ot.sibling;var fn=ce(Z,ot,ie[zt],ve);if(fn===null){ot===null&&(ot=Zt);break}t&&ot&&fn.alternate===null&&n(Z,ot),j=d(fn,j,zt),un===null?mt=fn:un.sibling=fn,un=fn,ot=Zt}if(zt===ie.length)return a(Z,ot),Qt&&As(Z,zt),mt;if(ot===null){for(;zt<ie.length;zt++)ot=ye(Z,ie[zt],ve),ot!==null&&(j=d(ot,j,zt),un===null?mt=ot:un.sibling=ot,un=ot);return Qt&&As(Z,zt),mt}for(ot=o(ot);zt<ie.length;zt++)Zt=ue(ot,Z,zt,ie[zt],ve),Zt!==null&&(t&&Zt.alternate!==null&&ot.delete(Zt.key===null?zt:Zt.key),j=d(Zt,j,zt),un===null?mt=Zt:un.sibling=Zt,un=Zt);return t&&ot.forEach(function(Tr){return n(Z,Tr)}),Qt&&As(Z,zt),mt}function _t(Z,j,ie,ve){if(ie==null)throw Error(s(151));for(var mt=null,un=null,ot=j,zt=j=0,Zt=null,fn=ie.next();ot!==null&&!fn.done;zt++,fn=ie.next()){ot.index>zt?(Zt=ot,ot=null):Zt=ot.sibling;var Tr=ce(Z,ot,fn.value,ve);if(Tr===null){ot===null&&(ot=Zt);break}t&&ot&&Tr.alternate===null&&n(Z,ot),j=d(Tr,j,zt),un===null?mt=Tr:un.sibling=Tr,un=Tr,ot=Zt}if(fn.done)return a(Z,ot),Qt&&As(Z,zt),mt;if(ot===null){for(;!fn.done;zt++,fn=ie.next())fn=ye(Z,fn.value,ve),fn!==null&&(j=d(fn,j,zt),un===null?mt=fn:un.sibling=fn,un=fn);return Qt&&As(Z,zt),mt}for(ot=o(ot);!fn.done;zt++,fn=ie.next())fn=ue(ot,Z,zt,fn.value,ve),fn!==null&&(t&&fn.alternate!==null&&ot.delete(fn.key===null?zt:fn.key),j=d(fn,j,zt),un===null?mt=fn:un.sibling=fn,un=fn);return t&&ot.forEach(function(Wy){return n(Z,Wy)}),Qt&&As(Z,zt),mt}function wn(Z,j,ie,ve){if(typeof ie=="object"&&ie!==null&&ie.type===C&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case y:e:{for(var mt=ie.key;j!==null;){if(j.key===mt){if(mt=ie.type,mt===C){if(j.tag===7){a(Z,j.sibling),ve=u(j,ie.props.children),ve.return=Z,Z=ve;break e}}else if(j.elementType===mt||typeof mt=="object"&&mt!==null&&mt.$$typeof===w&&no(mt)===j.type){a(Z,j.sibling),ve=u(j,ie.props),Vl(ve,ie),ve.return=Z,Z=ve;break e}a(Z,j);break}else n(Z,j);j=j.sibling}ie.type===C?(ve=Zr(ie.props.children,Z.mode,ve,ie.key),ve.return=Z,Z=ve):(ve=$c(ie.type,ie.key,ie.props,null,Z.mode,ve),Vl(ve,ie),ve.return=Z,Z=ve)}return v(Z);case T:e:{for(mt=ie.key;j!==null;){if(j.key===mt)if(j.tag===4&&j.stateNode.containerInfo===ie.containerInfo&&j.stateNode.implementation===ie.implementation){a(Z,j.sibling),ve=u(j,ie.children||[]),ve.return=Z,Z=ve;break e}else{a(Z,j);break}else n(Z,j);j=j.sibling}ve=Zf(ie,Z.mode,ve),ve.return=Z,Z=ve}return v(Z);case w:return ie=no(ie),wn(Z,j,ie,ve)}if(Y(ie))return it(Z,j,ie,ve);if(W(ie)){if(mt=W(ie),typeof mt!="function")throw Error(s(150));return ie=mt.call(ie),_t(Z,j,ie,ve)}if(typeof ie.then=="function")return wn(Z,j,nu(ie),ve);if(ie.$$typeof===U)return wn(Z,j,Qc(Z,ie),ve);iu(Z,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"||typeof ie=="bigint"?(ie=""+ie,j!==null&&j.tag===6?(a(Z,j.sibling),ve=u(j,ie),ve.return=Z,Z=ve):(a(Z,j),ve=Kf(ie,Z.mode,ve),ve.return=Z,Z=ve),v(Z)):a(Z,j)}return function(Z,j,ie,ve){try{kl=0;var mt=wn(Z,j,ie,ve);return ko=null,mt}catch(ot){if(ot===Ho||ot===eu)throw ot;var un=fa(29,ot,null,Z.mode);return un.lanes=ve,un.return=Z,un}}}var ao=og(!0),lg=og(!1),lr=!1;function cd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ud(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function cr(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ur(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(pn&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=qc(t),Xm(t,null,a),n}return Wc(t,o,n,a),qc(t)}function jl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,$i(t,a)}}function fd(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=v:d=d.next=v,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var dd=!1;function Xl(){if(dd){var t=Go;if(t!==null)throw t}}function Yl(t,n,a,o){dd=!1;var u=t.updateQueue;lr=!1;var d=u.firstBaseUpdate,v=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var B=R,ae=B.next;B.next=null,v===null?d=ae:v.next=ae,v=B;var ge=t.alternate;ge!==null&&(ge=ge.updateQueue,R=ge.lastBaseUpdate,R!==v&&(R===null?ge.firstBaseUpdate=ae:R.next=ae,ge.lastBaseUpdate=B))}if(d!==null){var ye=u.baseState;v=0,ge=ae=B=null,R=d;do{var ce=R.lane&-536870913,ue=ce!==R.lane;if(ue?(Kt&ce)===ce:(o&ce)===ce){ce!==0&&ce===zo&&(dd=!0),ge!==null&&(ge=ge.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var it=t,_t=R;ce=n;var wn=a;switch(_t.tag){case 1:if(it=_t.payload,typeof it=="function"){ye=it.call(wn,ye,ce);break e}ye=it;break e;case 3:it.flags=it.flags&-65537|128;case 0:if(it=_t.payload,ce=typeof it=="function"?it.call(wn,ye,ce):it,ce==null)break e;ye=b({},ye,ce);break e;case 2:lr=!0}}ce=R.callback,ce!==null&&(t.flags|=64,ue&&(t.flags|=8192),ue=u.callbacks,ue===null?u.callbacks=[ce]:ue.push(ce))}else ue={lane:ce,tag:R.tag,payload:R.payload,callback:R.callback,next:null},ge===null?(ae=ge=ue,B=ye):ge=ge.next=ue,v|=ce;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;ue=R,R=ue.next,ue.next=null,u.lastBaseUpdate=ue,u.shared.pending=null}}while(!0);ge===null&&(B=ye),u.baseState=B,u.firstBaseUpdate=ae,u.lastBaseUpdate=ge,d===null&&(u.shared.lanes=0),mr|=v,t.lanes=v,t.memoizedState=ye}}function cg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function ug(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)cg(a[t],n)}var Vo=P(null),au=P(0);function fg(t,n){t=Fs,Te(au,t),Te(Vo,n),Fs=t|n.baseLanes}function hd(){Te(au,Fs),Te(Vo,Vo.current)}function pd(){Fs=au.current,J(Vo),J(au)}var da=P(null),Ua=null;function fr(t){var n=t.alternate;Te(ri,ri.current&1),Te(da,t),Ua===null&&(n===null||Vo.current!==null||n.memoizedState!==null)&&(Ua=t)}function md(t){Te(ri,ri.current),Te(da,t),Ua===null&&(Ua=t)}function dg(t){t.tag===22?(Te(ri,ri.current),Te(da,t),Ua===null&&(Ua=t)):dr()}function dr(){Te(ri,ri.current),Te(da,da.current)}function ha(t){J(da),Ua===t&&(Ua=null),J(ri)}var ri=P(0);function su(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||yh(a)||Eh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Cs=0,Ft=null,Tn=null,di=null,ru=!1,jo=!1,so=!1,ou=0,Wl=0,Xo=null,Fb=0;function ti(){throw Error(s(321))}function gd(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ke(t[a],n[a]))return!1;return!0}function xd(t,n,a,o,u,d){return Cs=d,Ft=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,I.H=t===null||t.memoizedState===null?$g:Dd,so=!1,d=a(o,u),so=!1,jo&&(d=pg(n,a,o,u)),hg(t),d}function hg(t){I.H=Kl;var n=Tn!==null&&Tn.next!==null;if(Cs=0,di=Tn=Ft=null,ru=!1,Wl=0,Xo=null,n)throw Error(s(300));t===null||hi||(t=t.dependencies,t!==null&&Zc(t)&&(hi=!0))}function pg(t,n,a,o){Ft=t;var u=0;do{if(jo&&(Xo=null),Wl=0,jo=!1,25<=u)throw Error(s(301));if(u+=1,di=Tn=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}I.H=Kg,d=n(a,o)}while(jo);return d}function Bb(){var t=I.H,n=t.useState()[0];return n=typeof n.then=="function"?ql(n):n,t=t.useState()[0],(Tn!==null?Tn.memoizedState:null)!==t&&(Ft.flags|=1024),n}function _d(){var t=ou!==0;return ou=0,t}function vd(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function bd(t){if(ru){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ru=!1}Cs=0,di=Tn=Ft=null,jo=!1,Wl=ou=0,Xo=null}function Wi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return di===null?Ft.memoizedState=di=t:di=di.next=t,di}function oi(){if(Tn===null){var t=Ft.alternate;t=t!==null?t.memoizedState:null}else t=Tn.next;var n=di===null?Ft.memoizedState:di.next;if(n!==null)di=n,Tn=t;else{if(t===null)throw Ft.alternate===null?Error(s(467)):Error(s(310));Tn=t,t={memoizedState:Tn.memoizedState,baseState:Tn.baseState,baseQueue:Tn.baseQueue,queue:Tn.queue,next:null},di===null?Ft.memoizedState=di=t:di=di.next=t}return di}function lu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(t){var n=Wl;return Wl+=1,Xo===null&&(Xo=[]),t=ag(Xo,t,n),n=Ft,(di===null?n.memoizedState:di.next)===null&&(n=n.alternate,I.H=n===null||n.memoizedState===null?$g:Dd),t}function cu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ql(t);if(t.$$typeof===U)return Ui(t)}throw Error(s(438,String(t)))}function yd(t){var n=null,a=Ft.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=Ft.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=lu(),Ft.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=$;return n.index++,a}function Ns(t,n){return typeof n=="function"?n(t):n}function uu(t){var n=oi();return Ed(n,Tn,t)}function Ed(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var v=u.next;u.next=d.next,d.next=v}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=v=null,B=null,ae=n,ge=!1;do{var ye=ae.lane&-536870913;if(ye!==ae.lane?(Kt&ye)===ye:(Cs&ye)===ye){var ce=ae.revertLane;if(ce===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),ye===zo&&(ge=!0);else if((Cs&ce)===ce){ae=ae.next,ce===zo&&(ge=!0);continue}else ye={lane:0,revertLane:ae.revertLane,gesture:null,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null},B===null?(R=B=ye,v=d):B=B.next=ye,Ft.lanes|=ce,mr|=ce;ye=ae.action,so&&a(d,ye),d=ae.hasEagerState?ae.eagerState:a(d,ye)}else ce={lane:ye,revertLane:ae.revertLane,gesture:ae.gesture,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null},B===null?(R=B=ce,v=d):B=B.next=ce,Ft.lanes|=ye,mr|=ye;ae=ae.next}while(ae!==null&&ae!==n);if(B===null?v=d:B.next=R,!ke(d,t.memoizedState)&&(hi=!0,ge&&(a=Go,a!==null)))throw a;t.memoizedState=d,t.baseState=v,t.baseQueue=B,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Sd(t){var n=oi(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do d=t(d,v.action),v=v.next;while(v!==u);ke(d,n.memoizedState)||(hi=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function mg(t,n,a){var o=Ft,u=oi(),d=Qt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var v=!ke((Tn||u).memoizedState,a);if(v&&(u.memoizedState=a,hi=!0),u=u.queue,Ad(_g.bind(null,o,u,t),[t]),u.getSnapshot!==n||v||di!==null&&di.memoizedState.tag&1){if(o.flags|=2048,Yo(9,{destroy:void 0},xg.bind(null,o,u,a,n),null),Dn===null)throw Error(s(349));d||(Cs&127)!==0||gg(o,n,a)}return a}function gg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Ft.updateQueue,n===null?(n=lu(),Ft.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function xg(t,n,a,o){n.value=a,n.getSnapshot=o,vg(n)&&bg(t)}function _g(t,n,a){return a(function(){vg(n)&&bg(t)})}function vg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ke(t,a)}catch{return!0}}function bg(t){var n=Kr(t,2);n!==null&&ia(n,t,2)}function Md(t){var n=Wi();if(typeof t=="function"){var a=t;if(t=a(),so){je(!0);try{a()}finally{je(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ns,lastRenderedState:t},n}function yg(t,n,a,o){return t.baseState=a,Ed(t,Tn,typeof o=="function"?o:Ns)}function zb(t,n,a,o,u){if(hu(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){d.listeners.push(v)}};I.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,Eg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function Eg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=I.T,v={};I.T=v;try{var R=a(u,o),B=I.S;B!==null&&B(v,R),Sg(t,n,R)}catch(ae){Td(t,n,ae)}finally{d!==null&&v.types!==null&&(d.types=v.types),I.T=d}}else try{d=a(u,o),Sg(t,n,d)}catch(ae){Td(t,n,ae)}}function Sg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Mg(t,n,o)},function(o){return Td(t,n,o)}):Mg(t,n,a)}function Mg(t,n,a){n.status="fulfilled",n.value=a,Tg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Eg(t,a)))}function Td(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Tg(n),n=n.next;while(n!==o)}t.action=null}function Tg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Ag(t,n){return n}function wg(t,n){if(Qt){var a=Dn.formState;if(a!==null){e:{var o=Ft;if(Qt){if(zn){t:{for(var u=zn,d=Ia;u.nodeType!==8;){if(!d){u=null;break t}if(u=Pa(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){zn=Pa(u.nextSibling),o=u.data==="F!";break e}}rr(o)}o=!1}o&&(n=a[0])}}return a=Wi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ag,lastRenderedState:n},a.queue=o,a=Yg.bind(null,Ft,o),o.dispatch=a,o=Md(!1),d=Od.bind(null,Ft,!1,o.queue),o=Wi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=zb.bind(null,Ft,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Rg(t){var n=oi();return Cg(n,Tn,t)}function Cg(t,n,a){if(n=Ed(t,n,Ag)[0],t=uu(Ns)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ql(n)}catch(v){throw v===Ho?eu:v}else o=n;n=oi();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(Ft.flags|=2048,Yo(9,{destroy:void 0},Gb.bind(null,u,a),null)),[o,d,t]}function Gb(t,n){t.action=n}function Ng(t){var n=oi(),a=Tn;if(a!==null)return Cg(n,a,t);oi(),n=n.memoizedState,a=oi();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function Yo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=Ft.updateQueue,n===null&&(n=lu(),Ft.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Og(){return oi().memoizedState}function fu(t,n,a,o){var u=Wi();Ft.flags|=t,u.memoizedState=Yo(1|n,{destroy:void 0},a,o===void 0?null:o)}function du(t,n,a,o){var u=oi();o=o===void 0?null:o;var d=u.memoizedState.inst;Tn!==null&&o!==null&&gd(o,Tn.memoizedState.deps)?u.memoizedState=Yo(n,d,a,o):(Ft.flags|=t,u.memoizedState=Yo(1|n,d,a,o))}function Dg(t,n){fu(8390656,8,t,n)}function Ad(t,n){du(2048,8,t,n)}function Hb(t){Ft.flags|=4;var n=Ft.updateQueue;if(n===null)n=lu(),Ft.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Lg(t){var n=oi().memoizedState;return Hb({ref:n,nextImpl:t}),function(){if((pn&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Ig(t,n){return du(4,2,t,n)}function Ug(t,n){return du(4,4,t,n)}function Pg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Fg(t,n,a){a=a!=null?a.concat([t]):null,du(4,4,Pg.bind(null,n,t),a)}function wd(){}function Bg(t,n){var a=oi();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&gd(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function zg(t,n){var a=oi();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&gd(n,o[1]))return o[0];if(o=t(),so){je(!0);try{t()}finally{je(!1)}}return a.memoizedState=[o,n],o}function Rd(t,n,a){return a===void 0||(Cs&1073741824)!==0&&(Kt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=G0(),Ft.lanes|=t,mr|=t,a)}function Gg(t,n,a,o){return ke(a,n)?a:Vo.current!==null?(t=Rd(t,a,o),ke(t,n)||(hi=!0),t):(Cs&42)===0||(Cs&1073741824)!==0&&(Kt&261930)===0?(hi=!0,t.memoizedState=a):(t=G0(),Ft.lanes|=t,mr|=t,n)}function Hg(t,n,a,o,u){var d=G.p;G.p=d!==0&&8>d?d:8;var v=I.T,R={};I.T=R,Od(t,!1,n,a);try{var B=u(),ae=I.S;if(ae!==null&&ae(R,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ge=Pb(B,o);$l(t,n,ge,ga(t))}else $l(t,n,o,ga(t))}catch(ye){$l(t,n,{then:function(){},status:"rejected",reason:ye},ga())}finally{G.p=d,v!==null&&R.types!==null&&(v.types=R.types),I.T=v}}function kb(){}function Cd(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=kg(t).queue;Hg(t,u,n,ee,a===null?kb:function(){return Vg(t),a(o)})}function kg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ns,lastRenderedState:ee},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ns,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Vg(t){var n=kg(t);n.next===null&&(n=t.alternate.memoizedState),$l(t,n.next.queue,{},ga())}function Nd(){return Ui(dc)}function jg(){return oi().memoizedState}function Xg(){return oi().memoizedState}function Vb(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ga();t=cr(a);var o=ur(n,t,a);o!==null&&(ia(o,n,a),jl(o,n,a)),n={cache:sd()},t.payload=n;return}n=n.return}}function jb(t,n,a){var o=ga();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},hu(t)?Wg(n,a):(a=qf(t,n,a,o),a!==null&&(ia(a,t,o),qg(a,n,o)))}function Yg(t,n,a){var o=ga();$l(t,n,a,o)}function $l(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(hu(t))Wg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var v=n.lastRenderedState,R=d(v,a);if(u.hasEagerState=!0,u.eagerState=R,ke(R,v))return Wc(t,n,u,0),Dn===null&&Yc(),!1}catch{}if(a=qf(t,n,u,o),a!==null)return ia(a,t,o),qg(a,n,o),!0}return!1}function Od(t,n,a,o){if(o={lane:2,revertLane:ch(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},hu(t)){if(n)throw Error(s(479))}else n=qf(t,a,o,2),n!==null&&ia(n,t,2)}function hu(t){var n=t.alternate;return t===Ft||n!==null&&n===Ft}function Wg(t,n){jo=ru=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function qg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,$i(t,a)}}var Kl={readContext:Ui,use:cu,useCallback:ti,useContext:ti,useEffect:ti,useImperativeHandle:ti,useLayoutEffect:ti,useInsertionEffect:ti,useMemo:ti,useReducer:ti,useRef:ti,useState:ti,useDebugValue:ti,useDeferredValue:ti,useTransition:ti,useSyncExternalStore:ti,useId:ti,useHostTransitionStatus:ti,useFormState:ti,useActionState:ti,useOptimistic:ti,useMemoCache:ti,useCacheRefresh:ti};Kl.useEffectEvent=ti;var $g={readContext:Ui,use:cu,useCallback:function(t,n){return Wi().memoizedState=[t,n===void 0?null:n],t},useContext:Ui,useEffect:Dg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,fu(4194308,4,Pg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return fu(4194308,4,t,n)},useInsertionEffect:function(t,n){fu(4,2,t,n)},useMemo:function(t,n){var a=Wi();n=n===void 0?null:n;var o=t();if(so){je(!0);try{t()}finally{je(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Wi();if(a!==void 0){var u=a(n);if(so){je(!0);try{a(n)}finally{je(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=jb.bind(null,Ft,t),[o.memoizedState,t]},useRef:function(t){var n=Wi();return t={current:t},n.memoizedState=t},useState:function(t){t=Md(t);var n=t.queue,a=Yg.bind(null,Ft,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:wd,useDeferredValue:function(t,n){var a=Wi();return Rd(a,t,n)},useTransition:function(){var t=Md(!1);return t=Hg.bind(null,Ft,t.queue,!0,!1),Wi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=Ft,u=Wi();if(Qt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Dn===null)throw Error(s(349));(Kt&127)!==0||gg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Dg(_g.bind(null,o,d,t),[t]),o.flags|=2048,Yo(9,{destroy:void 0},xg.bind(null,o,d,a,n),null),a},useId:function(){var t=Wi(),n=Dn.identifierPrefix;if(Qt){var a=ss,o=as;a=(o&~(1<<32-we(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ou++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Fb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Nd,useFormState:wg,useActionState:wg,useOptimistic:function(t){var n=Wi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Od.bind(null,Ft,!0,a),a.dispatch=n,[t,n]},useMemoCache:yd,useCacheRefresh:function(){return Wi().memoizedState=Vb.bind(null,Ft)},useEffectEvent:function(t){var n=Wi(),a={impl:t};return n.memoizedState=a,function(){if((pn&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Dd={readContext:Ui,use:cu,useCallback:Bg,useContext:Ui,useEffect:Ad,useImperativeHandle:Fg,useInsertionEffect:Ig,useLayoutEffect:Ug,useMemo:zg,useReducer:uu,useRef:Og,useState:function(){return uu(Ns)},useDebugValue:wd,useDeferredValue:function(t,n){var a=oi();return Gg(a,Tn.memoizedState,t,n)},useTransition:function(){var t=uu(Ns)[0],n=oi().memoizedState;return[typeof t=="boolean"?t:ql(t),n]},useSyncExternalStore:mg,useId:jg,useHostTransitionStatus:Nd,useFormState:Rg,useActionState:Rg,useOptimistic:function(t,n){var a=oi();return yg(a,Tn,t,n)},useMemoCache:yd,useCacheRefresh:Xg};Dd.useEffectEvent=Lg;var Kg={readContext:Ui,use:cu,useCallback:Bg,useContext:Ui,useEffect:Ad,useImperativeHandle:Fg,useInsertionEffect:Ig,useLayoutEffect:Ug,useMemo:zg,useReducer:Sd,useRef:Og,useState:function(){return Sd(Ns)},useDebugValue:wd,useDeferredValue:function(t,n){var a=oi();return Tn===null?Rd(a,t,n):Gg(a,Tn.memoizedState,t,n)},useTransition:function(){var t=Sd(Ns)[0],n=oi().memoizedState;return[typeof t=="boolean"?t:ql(t),n]},useSyncExternalStore:mg,useId:jg,useHostTransitionStatus:Nd,useFormState:Ng,useActionState:Ng,useOptimistic:function(t,n){var a=oi();return Tn!==null?yg(a,Tn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:yd,useCacheRefresh:Xg};Kg.useEffectEvent=Lg;function Ld(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:b({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Id={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ga(),u=cr(o);u.payload=n,a!=null&&(u.callback=a),n=ur(t,u,o),n!==null&&(ia(n,t,o),jl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ga(),u=cr(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=ur(t,u,o),n!==null&&(ia(n,t,o),jl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ga(),o=cr(a);o.tag=2,n!=null&&(o.callback=n),n=ur(t,o,a),n!==null&&(ia(n,t,a),jl(n,t,a))}};function Zg(t,n,a,o,u,d,v){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,v):n.prototype&&n.prototype.isPureReactComponent?!Ke(a,o)||!Ke(u,d):!0}function Qg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Id.enqueueReplaceState(n,n.state,null)}function ro(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=b({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Jg(t){Xc(t)}function e0(t){console.error(t)}function t0(t){Xc(t)}function pu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function n0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Ud(t,n,a){return a=cr(a),a.tag=3,a.payload={element:null},a.callback=function(){pu(t,n)},a}function i0(t){return t=cr(t),t.tag=3,t}function a0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){n0(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(t.callback=function(){n0(n,a,o),typeof u!="function"&&(gr===null?gr=new Set([this]):gr.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function Xb(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Bo(n,a,u,!0),a=da.current,a!==null){switch(a.tag){case 31:case 13:return Ua===null?Au():a.alternate===null&&ni===0&&(ni=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===tu?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),rh(t,o,u)),!1;case 22:return a.flags|=65536,o===tu?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),rh(t,o,u)),!1}throw Error(s(435,a.tag))}return rh(t,o,u),Au(),!1}if(Qt)return n=da.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==ed&&(t=Error(s(422),{cause:o}),zl(Oa(t,a)))):(o!==ed&&(n=Error(s(423),{cause:o}),zl(Oa(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Oa(o,a),u=Ud(t.stateNode,o,u),fd(t,u),ni!==4&&(ni=2)),!1;var d=Error(s(520),{cause:o});if(d=Oa(d,a),ac===null?ac=[d]:ac.push(d),ni!==4&&(ni=2),n===null)return!0;o=Oa(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Ud(a.stateNode,o,t),fd(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(gr===null||!gr.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=i0(u),a0(u,t,a,o),fd(a,u),!1}a=a.return}while(a!==null);return!1}var Pd=Error(s(461)),hi=!1;function Pi(t,n,a,o){n.child=t===null?lg(n,null,a,o):ao(n,t.child,a,o)}function s0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var v={};for(var R in o)R!=="ref"&&(v[R]=o[R])}else v=o;return eo(n),o=xd(t,n,a,v,d,u),R=_d(),t!==null&&!hi?(vd(t,n,u),Os(t,n,u)):(Qt&&R&&Qf(n),n.flags|=1,Pi(t,n,o,u),n.child)}function r0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!$f(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,o0(t,n,d,o,u)):(t=$c(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!jd(t,u)){var v=d.memoizedProps;if(a=a.compare,a=a!==null?a:Ke,a(v,o)&&t.ref===n.ref)return Os(t,n,u)}return n.flags|=1,t=Ts(d,o),t.ref=n.ref,t.return=n,n.child=t}function o0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(Ke(d,o)&&t.ref===n.ref)if(hi=!1,n.pendingProps=o=d,jd(t,u))(t.flags&131072)!==0&&(hi=!0);else return n.lanes=t.lanes,Os(t,n,u)}return Fd(t,n,a,o,u)}function l0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return c0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Jc(n,d!==null?d.cachePool:null),d!==null?fg(n,d):hd(),dg(n);else return o=n.lanes=536870912,c0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Jc(n,d.cachePool),fg(n,d),dr(),n.memoizedState=null):(t!==null&&Jc(n,null),hd(),dr());return Pi(t,n,u,a),n.child}function Zl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function c0(t,n,a,o,u){var d=od();return d=d===null?null:{parent:fi._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&Jc(n,null),hd(),dg(n),t!==null&&Bo(t,n,o,!0),n.childLanes=u,null}function mu(t,n){return n=xu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function u0(t,n,a){return ao(n,t.child,null,a),t=mu(n,n.pendingProps),t.flags|=2,ha(n),n.memoizedState=null,t}function Yb(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Qt){if(o.mode==="hidden")return t=mu(n,o),n.lanes=536870912,Zl(null,t);if(md(n),(t=zn)?(t=Ex(t,Ia),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ar!==null?{id:as,overflow:ss}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=n,n.child=a,Ii=n,zn=null)):t=null,t===null)throw rr(n);return n.lanes=536870912,null}return mu(n,o)}var d=t.memoizedState;if(d!==null){var v=d.dehydrated;if(md(n),u)if(n.flags&256)n.flags&=-257,n=u0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(hi||Bo(t,n,a,!1),u=(a&t.childLanes)!==0,hi||u){if(o=Dn,o!==null&&(v=Yn(o,a),v!==0&&v!==d.retryLane))throw d.retryLane=v,Kr(t,v),ia(o,t,v),Pd;Au(),n=u0(t,n,a)}else t=d.treeContext,zn=Pa(v.nextSibling),Ii=n,Qt=!0,sr=null,Ia=!1,t!==null&&Km(n,t),n=mu(n,o),n.flags|=4096;return n}return t=Ts(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function gu(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Fd(t,n,a,o,u){return eo(n),a=xd(t,n,a,o,void 0,u),o=_d(),t!==null&&!hi?(vd(t,n,u),Os(t,n,u)):(Qt&&o&&Qf(n),n.flags|=1,Pi(t,n,a,u),n.child)}function f0(t,n,a,o,u,d){return eo(n),n.updateQueue=null,a=pg(n,o,a,u),hg(t),o=_d(),t!==null&&!hi?(vd(t,n,d),Os(t,n,d)):(Qt&&o&&Qf(n),n.flags|=1,Pi(t,n,a,d),n.child)}function d0(t,n,a,o,u){if(eo(n),n.stateNode===null){var d=Io,v=a.contextType;typeof v=="object"&&v!==null&&(d=Ui(v)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Id,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},cd(n),v=a.contextType,d.context=typeof v=="object"&&v!==null?Ui(v):Io,d.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(Ld(n,a,v,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(v=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),v!==d.state&&Id.enqueueReplaceState(d,d.state,null),Yl(n,o,d,u),Xl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,B=ro(a,R);d.props=B;var ae=d.context,ge=a.contextType;v=Io,typeof ge=="object"&&ge!==null&&(v=Ui(ge));var ye=a.getDerivedStateFromProps;ge=typeof ye=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,ge||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||ae!==v)&&Qg(n,d,o,v),lr=!1;var ce=n.memoizedState;d.state=ce,Yl(n,o,d,u),Xl(),ae=n.memoizedState,R||ce!==ae||lr?(typeof ye=="function"&&(Ld(n,a,ye,o),ae=n.memoizedState),(B=lr||Zg(n,a,B,o,ce,ae,v))?(ge||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ae),d.props=o,d.state=ae,d.context=v,o=B):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,ud(t,n),v=n.memoizedProps,ge=ro(a,v),d.props=ge,ye=n.pendingProps,ce=d.context,ae=a.contextType,B=Io,typeof ae=="object"&&ae!==null&&(B=Ui(ae)),R=a.getDerivedStateFromProps,(ae=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(v!==ye||ce!==B)&&Qg(n,d,o,B),lr=!1,ce=n.memoizedState,d.state=ce,Yl(n,o,d,u),Xl();var ue=n.memoizedState;v!==ye||ce!==ue||lr||t!==null&&t.dependencies!==null&&Zc(t.dependencies)?(typeof R=="function"&&(Ld(n,a,R,o),ue=n.memoizedState),(ge=lr||Zg(n,a,ge,o,ce,ue,B)||t!==null&&t.dependencies!==null&&Zc(t.dependencies))?(ae||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,ue,B),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,ue,B)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||v===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ue),d.props=o,d.state=ue,d.context=B,o=ge):(typeof d.componentDidUpdate!="function"||v===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||v===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,gu(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=ao(n,t.child,null,u),n.child=ao(n,null,a,u)):Pi(t,n,a,u),n.memoizedState=d.state,t=n.child):t=Os(t,n,u),t}function h0(t,n,a,o){return Qr(),n.flags|=256,Pi(t,n,a,o),n.child}var Bd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function zd(t){return{baseLanes:t,cachePool:ng()}}function Gd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ma),t}function p0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,v;if((v=d)||(v=t!==null&&t.memoizedState===null?!1:(ri.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,t===null){if(Qt){if(u?fr(n):dr(),(t=zn)?(t=Ex(t,Ia),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:ar!==null?{id:as,overflow:ss}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=n,n.child=a,Ii=n,zn=null)):t=null,t===null)throw rr(n);return Eh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(dr(),u=n.mode,R=xu({mode:"hidden",children:R},u),o=Zr(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=zd(a),o.childLanes=Gd(t,v,a),n.memoizedState=Bd,Zl(null,o)):(fr(n),Hd(n,R))}var B=t.memoizedState;if(B!==null&&(R=B.dehydrated,R!==null)){if(d)n.flags&256?(fr(n),n.flags&=-257,n=kd(t,n,a)):n.memoizedState!==null?(dr(),n.child=t.child,n.flags|=128,n=null):(dr(),R=o.fallback,u=n.mode,o=xu({mode:"visible",children:o.children},u),R=Zr(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,ao(n,t.child,null,a),o=n.child,o.memoizedState=zd(a),o.childLanes=Gd(t,v,a),n.memoizedState=Bd,n=Zl(null,o));else if(fr(n),Eh(R)){if(v=R.nextSibling&&R.nextSibling.dataset,v)var ae=v.dgst;v=ae,o=Error(s(419)),o.stack="",o.digest=v,zl({value:o,source:null,stack:null}),n=kd(t,n,a)}else if(hi||Bo(t,n,a,!1),v=(a&t.childLanes)!==0,hi||v){if(v=Dn,v!==null&&(o=Yn(v,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,Kr(t,o),ia(v,t,o),Pd;yh(R)||Au(),n=kd(t,n,a)}else yh(R)?(n.flags|=192,n.child=t.child,n=null):(t=B.treeContext,zn=Pa(R.nextSibling),Ii=n,Qt=!0,sr=null,Ia=!1,t!==null&&Km(n,t),n=Hd(n,o.children),n.flags|=4096);return n}return u?(dr(),R=o.fallback,u=n.mode,B=t.child,ae=B.sibling,o=Ts(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,ae!==null?R=Ts(ae,R):(R=Zr(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Zl(null,o),o=n.child,R=t.child.memoizedState,R===null?R=zd(a):(u=R.cachePool,u!==null?(B=fi._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=ng(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Gd(t,v,a),n.memoizedState=Bd,Zl(t.child,o)):(fr(n),a=t.child,t=a.sibling,a=Ts(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(v=n.deletions,v===null?(n.deletions=[t],n.flags|=16):v.push(t)),n.child=a,n.memoizedState=null,a)}function Hd(t,n){return n=xu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function xu(t,n){return t=fa(22,t,null,n),t.lanes=0,t}function kd(t,n,a){return ao(n,t.child,null,a),t=Hd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function m0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),id(t.return,n,a)}function Vd(t,n,a,o,u,d){var v=t.memoizedState;v===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(v.isBackwards=n,v.rendering=null,v.renderingStartTime=0,v.last=o,v.tail=a,v.tailMode=u,v.treeForkCount=d)}function g0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var v=ri.current,R=(v&2)!==0;if(R?(v=v&1|2,n.flags|=128):v&=1,Te(ri,v),Pi(t,n,o,a),o=Qt?Bl:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&m0(t,a,n);else if(t.tag===19)m0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&su(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Vd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&su(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Vd(n,!0,a,null,d,o);break;case"together":Vd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Os(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),mr|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Bo(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Ts(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Ts(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function jd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Zc(t)))}function Wb(t,n,a){switch(n.tag){case 3:Ce(n,n.stateNode.containerInfo),or(n,fi,t.memoizedState.cache),Qr();break;case 27:case 5:gt(n);break;case 4:Ce(n,n.stateNode.containerInfo);break;case 10:or(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,md(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(fr(n),n.flags|=128,null):(a&n.child.childLanes)!==0?p0(t,n,a):(fr(n),t=Os(t,n,a),t!==null?t.sibling:null);fr(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Bo(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return g0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Te(ri,ri.current),o)break;return null;case 22:return n.lanes=0,l0(t,n,a,n.pendingProps);case 24:or(n,fi,t.memoizedState.cache)}return Os(t,n,a)}function x0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)hi=!0;else{if(!jd(t,a)&&(n.flags&128)===0)return hi=!1,Wb(t,n,a);hi=(t.flags&131072)!==0}else hi=!1,Qt&&(n.flags&1048576)!==0&&$m(n,Bl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=no(n.elementType),n.type=t,typeof t=="function")$f(t)?(o=ro(t,o),n.tag=1,n=d0(null,n,t,o,a)):(n.tag=0,n=Fd(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===D){n.tag=11,n=s0(null,n,t,o,a);break e}else if(u===z){n.tag=14,n=r0(null,n,t,o,a);break e}}throw n=se(t)||t,Error(s(306,n,""))}}return n;case 0:return Fd(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=ro(o,n.pendingProps),d0(t,n,o,u,a);case 3:e:{if(Ce(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,ud(t,n),Yl(n,o,null,a);var v=n.memoizedState;if(o=v.cache,or(n,fi,o),o!==d.cache&&ad(n,[fi],a,!0),Xl(),o=v.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=h0(t,n,o,a);break e}else if(o!==u){u=Oa(Error(s(424)),n),zl(u),n=h0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,zn=Pa(t.firstChild),Ii=n,Qt=!0,sr=null,Ia=!0,a=lg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Qr(),o===u){n=Os(t,n,a);break e}Pi(t,n,o,a)}n=n.child}return n;case 26:return gu(t,n),t===null?(a=Rx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Qt||(a=n.type,t=n.pendingProps,o=Lu(oe.current).createElement(a),o[Mn]=n,o[ii]=t,Fi(o,a,t),qn(o),n.stateNode=o):n.memoizedState=Rx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return gt(n),t===null&&Qt&&(o=n.stateNode=Tx(n.type,n.pendingProps,oe.current),Ii=n,Ia=!0,u=zn,br(n.type)?(Sh=u,zn=Pa(o.firstChild)):zn=u),Pi(t,n,n.pendingProps.children,a),gu(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Qt&&((u=o=zn)&&(o=Sy(o,n.type,n.pendingProps,Ia),o!==null?(n.stateNode=o,Ii=n,zn=Pa(o.firstChild),Ia=!1,u=!0):u=!1),u||rr(n)),gt(n),u=n.type,d=n.pendingProps,v=t!==null?t.memoizedProps:null,o=d.children,_h(u,d)?o=null:v!==null&&_h(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=xd(t,n,Bb,null,null,a),dc._currentValue=u),gu(t,n),Pi(t,n,o,a),n.child;case 6:return t===null&&Qt&&((t=a=zn)&&(a=My(a,n.pendingProps,Ia),a!==null?(n.stateNode=a,Ii=n,zn=null,t=!0):t=!1),t||rr(n)),null;case 13:return p0(t,n,a);case 4:return Ce(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=ao(n,null,o,a):Pi(t,n,o,a),n.child;case 11:return s0(t,n,n.type,n.pendingProps,a);case 7:return Pi(t,n,n.pendingProps,a),n.child;case 8:return Pi(t,n,n.pendingProps.children,a),n.child;case 12:return Pi(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,or(n,n.type,o.value),Pi(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,eo(n),u=Ui(u),o=o(u),n.flags|=1,Pi(t,n,o,a),n.child;case 14:return r0(t,n,n.type,n.pendingProps,a);case 15:return o0(t,n,n.type,n.pendingProps,a);case 19:return g0(t,n,a);case 31:return Yb(t,n,a);case 22:return l0(t,n,a,n.pendingProps);case 24:return eo(n),o=Ui(fi),t===null?(u=od(),u===null&&(u=Dn,d=sd(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},cd(n),or(n,fi,u)):((t.lanes&a)!==0&&(ud(t,n),Yl(n,null,null,a),Xl()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),or(n,fi,o)):(o=d.cache,or(n,fi,o),o!==u.cache&&ad(n,[fi],a,!0))),Pi(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ds(t){t.flags|=4}function Xd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(j0())t.flags|=8192;else throw io=tu,ld}else t.flags&=-16777217}function _0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Lx(n))if(j0())t.flags|=8192;else throw io=tu,ld}function _u(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Se():536870912,t.lanes|=n,Ko|=n)}function Ql(t,n){if(!Qt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Gn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function qb(t,n,a){var o=n.pendingProps;switch(Jf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Gn(n),null;case 1:return Gn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Rs(fi),Ve(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Fo(n)?Ds(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,td())),Gn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(Ds(n),d!==null?(Gn(n),_0(n,d)):(Gn(n),Xd(n,u,null,o,a))):d?d!==t.memoizedState?(Ds(n),Gn(n),_0(n,d)):(Gn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Ds(n),Gn(n),Xd(n,u,t,o,a)),null;case 27:if(et(n),a=oe.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ds(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Gn(n),null}t=De.current,Fo(n)?Zm(n):(t=Tx(u,o,a),n.stateNode=t,Ds(n))}return Gn(n),null;case 5:if(et(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ds(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Gn(n),null}if(d=De.current,Fo(n))Zm(n);else{var v=Lu(oe.current);switch(d){case 1:d=v.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=v.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=v.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?v.createElement("select",{is:o.is}):v.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?v.createElement(u,{is:o.is}):v.createElement(u)}}d[Mn]=n,d[ii]=o;e:for(v=n.child;v!==null;){if(v.tag===5||v.tag===6)d.appendChild(v.stateNode);else if(v.tag!==4&&v.tag!==27&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===n)break e;for(;v.sibling===null;){if(v.return===null||v.return===n)break e;v=v.return}v.sibling.return=v.return,v=v.sibling}n.stateNode=d;e:switch(Fi(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Ds(n)}}return Gn(n),Xd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Ds(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=oe.current,Fo(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=Ii,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Mn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||px(t.nodeValue,a)),t||rr(n,!0)}else t=Lu(t).createTextNode(o),t[Mn]=n,n.stateNode=t}return Gn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Fo(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Mn]=n}else Qr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Gn(n),t=!1}else a=td(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ha(n),n):(ha(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Gn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Fo(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Mn]=n}else Qr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Gn(n),u=!1}else u=td(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ha(n),n):(ha(n),null)}return ha(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),_u(n,n.updateQueue),Gn(n),null);case 4:return Ve(),t===null&&hh(n.stateNode.containerInfo),Gn(n),null;case 10:return Rs(n.type),Gn(n),null;case 19:if(J(ri),o=n.memoizedState,o===null)return Gn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)Ql(o,!1);else{if(ni!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=su(t),d!==null){for(n.flags|=128,Ql(o,!1),t=d.updateQueue,n.updateQueue=t,_u(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Ym(a,t),a=a.sibling;return Te(ri,ri.current&1|2),Qt&&As(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ie()>Su&&(n.flags|=128,u=!0,Ql(o,!1),n.lanes=4194304)}else{if(!u)if(t=su(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,_u(n,t),Ql(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Qt)return Gn(n),null}else 2*Ie()-o.renderingStartTime>Su&&a!==536870912&&(n.flags|=128,u=!0,Ql(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ie(),t.sibling=null,a=ri.current,Te(ri,u?a&1|2:a&1),Qt&&As(n,o.treeForkCount),t):(Gn(n),null);case 22:case 23:return ha(n),pd(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Gn(n),n.subtreeFlags&6&&(n.flags|=8192)):Gn(n),a=n.updateQueue,a!==null&&_u(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&J(to),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Rs(fi),Gn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function $b(t,n){switch(Jf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Rs(fi),Ve(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return et(n),null;case 31:if(n.memoizedState!==null){if(ha(n),n.alternate===null)throw Error(s(340));Qr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ha(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Qr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return J(ri),null;case 4:return Ve(),null;case 10:return Rs(n.type),null;case 22:case 23:return ha(n),pd(),t!==null&&J(to),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Rs(fi),null;case 25:return null;default:return null}}function v0(t,n){switch(Jf(n),n.tag){case 3:Rs(fi),Ve();break;case 26:case 27:case 5:et(n);break;case 4:Ve();break;case 31:n.memoizedState!==null&&ha(n);break;case 13:ha(n);break;case 19:J(ri);break;case 10:Rs(n.type);break;case 22:case 23:ha(n),pd(),t!==null&&J(to);break;case 24:Rs(fi)}}function Jl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,v=a.inst;o=d(),v.destroy=o}a=a.next}while(a!==u)}}catch(R){yn(n,n.return,R)}}function hr(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var v=o.inst,R=v.destroy;if(R!==void 0){v.destroy=void 0,u=n;var B=a,ae=R;try{ae()}catch(ge){yn(u,B,ge)}}}o=o.next}while(o!==d)}}catch(ge){yn(n,n.return,ge)}}function b0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{ug(n,a)}catch(o){yn(t,t.return,o)}}}function y0(t,n,a){a.props=ro(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){yn(t,n,o)}}function ec(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){yn(t,n,u)}}function rs(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){yn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){yn(t,n,u)}else a.current=null}function E0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){yn(t,t.return,u)}}function Yd(t,n,a){try{var o=t.stateNode;xy(o,t.type,a,n),o[ii]=n}catch(u){yn(t,t.return,u)}}function S0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&br(t.type)||t.tag===4}function Wd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||S0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&br(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function qd(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ts));else if(o!==4&&(o===27&&br(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(qd(t,n,a),t=t.sibling;t!==null;)qd(t,n,a),t=t.sibling}function vu(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&br(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(vu(t,n,a),t=t.sibling;t!==null;)vu(t,n,a),t=t.sibling}function M0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Fi(n,o,a),n[Mn]=t,n[ii]=a}catch(d){yn(t,t.return,d)}}var Ls=!1,pi=!1,$d=!1,T0=typeof WeakSet=="function"?WeakSet:Set,Ri=null;function Kb(t,n){if(t=t.containerInfo,gh=Gu,t=cn(t),Zn(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var v=0,R=-1,B=-1,ae=0,ge=0,ye=t,ce=null;t:for(;;){for(var ue;ye!==a||u!==0&&ye.nodeType!==3||(R=v+u),ye!==d||o!==0&&ye.nodeType!==3||(B=v+o),ye.nodeType===3&&(v+=ye.nodeValue.length),(ue=ye.firstChild)!==null;)ce=ye,ye=ue;for(;;){if(ye===t)break t;if(ce===a&&++ae===u&&(R=v),ce===d&&++ge===o&&(B=v),(ue=ye.nextSibling)!==null)break;ye=ce,ce=ye.parentNode}ye=ue}a=R===-1||B===-1?null:{start:R,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(xh={focusedElem:t,selectionRange:a},Gu=!1,Ri=n;Ri!==null;)if(n=Ri,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Ri=t;else for(;Ri!==null;){switch(n=Ri,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var it=ro(a.type,u);t=o.getSnapshotBeforeUpdate(it,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(_t){yn(a,a.return,_t)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)bh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":bh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Ri=t;break}Ri=n.return}}function A0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Us(t,a),o&4&&Jl(5,a);break;case 1:if(Us(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(v){yn(a,a.return,v)}else{var u=ro(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(v){yn(a,a.return,v)}}o&64&&b0(a),o&512&&ec(a,a.return);break;case 3:if(Us(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ug(t,n)}catch(v){yn(a,a.return,v)}}break;case 27:n===null&&o&4&&M0(a);case 26:case 5:Us(t,a),n===null&&o&4&&E0(a),o&512&&ec(a,a.return);break;case 12:Us(t,a);break;case 31:Us(t,a),o&4&&C0(t,a);break;case 13:Us(t,a),o&4&&N0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=sy.bind(null,a),Ty(t,a))));break;case 22:if(o=a.memoizedState!==null||Ls,!o){n=n!==null&&n.memoizedState!==null||pi,u=Ls;var d=pi;Ls=o,(pi=n)&&!d?Ps(t,a,(a.subtreeFlags&8772)!==0):Us(t,a),Ls=u,pi=d}break;case 30:break;default:Us(t,a)}}function w0(t){var n=t.alternate;n!==null&&(t.alternate=null,w0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Mo(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var jn=null,Ji=!1;function Is(t,n,a){for(a=a.child;a!==null;)R0(t,n,a),a=a.sibling}function R0(t,n,a){if(he&&typeof he.onCommitFiberUnmount=="function")try{he.onCommitFiberUnmount(fe,a)}catch{}switch(a.tag){case 26:pi||rs(a,n),Is(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:pi||rs(a,n);var o=jn,u=Ji;br(a.type)&&(jn=a.stateNode,Ji=!1),Is(t,n,a),cc(a.stateNode),jn=o,Ji=u;break;case 5:pi||rs(a,n);case 6:if(o=jn,u=Ji,jn=null,Is(t,n,a),jn=o,Ji=u,jn!==null)if(Ji)try{(jn.nodeType===9?jn.body:jn.nodeName==="HTML"?jn.ownerDocument.body:jn).removeChild(a.stateNode)}catch(d){yn(a,n,d)}else try{jn.removeChild(a.stateNode)}catch(d){yn(a,n,d)}break;case 18:jn!==null&&(Ji?(t=jn,bx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),al(t)):bx(jn,a.stateNode));break;case 4:o=jn,u=Ji,jn=a.stateNode.containerInfo,Ji=!0,Is(t,n,a),jn=o,Ji=u;break;case 0:case 11:case 14:case 15:hr(2,a,n),pi||hr(4,a,n),Is(t,n,a);break;case 1:pi||(rs(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&y0(a,n,o)),Is(t,n,a);break;case 21:Is(t,n,a);break;case 22:pi=(o=pi)||a.memoizedState!==null,Is(t,n,a),pi=o;break;default:Is(t,n,a)}}function C0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{al(t)}catch(a){yn(n,n.return,a)}}}function N0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{al(t)}catch(a){yn(n,n.return,a)}}function Zb(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new T0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new T0),n;default:throw Error(s(435,t.tag))}}function bu(t,n){var a=Zb(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=ry.bind(null,t,o);o.then(u,u)}})}function ea(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,v=n,R=v;e:for(;R!==null;){switch(R.tag){case 27:if(br(R.type)){jn=R.stateNode,Ji=!1;break e}break;case 5:jn=R.stateNode,Ji=!1;break e;case 3:case 4:jn=R.stateNode.containerInfo,Ji=!0;break e}R=R.return}if(jn===null)throw Error(s(160));R0(d,v,u),jn=null,Ji=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)O0(n,t),n=n.sibling}var ja=null;function O0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ea(n,t),ta(t),o&4&&(hr(3,t,t.return),Jl(3,t),hr(5,t,t.return));break;case 1:ea(n,t),ta(t),o&512&&(pi||a===null||rs(a,a.return)),o&64&&Ls&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=ja;if(ea(n,t),ta(t),o&512&&(pi||a===null||rs(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Ma]||d[Mn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),Fi(d,o,a),d[Mn]=t,qn(d),o=d;break e;case"link":var v=Ox("link","href",u).get(o+(a.href||""));if(v){for(var R=0;R<v.length;R++)if(d=v[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(R,1);break t}}d=u.createElement(o),Fi(d,o,a),u.head.appendChild(d);break;case"meta":if(v=Ox("meta","content",u).get(o+(a.content||""))){for(R=0;R<v.length;R++)if(d=v[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(R,1);break t}}d=u.createElement(o),Fi(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[Mn]=t,qn(d),o=d}t.stateNode=o}else Dx(u,t.type,t.stateNode);else t.stateNode=Nx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Dx(u,t.type,t.stateNode):Nx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Yd(t,t.memoizedProps,a.memoizedProps)}break;case 27:ea(n,t),ta(t),o&512&&(pi||a===null||rs(a,a.return)),a!==null&&o&4&&Yd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(ea(n,t),ta(t),o&512&&(pi||a===null||rs(a,a.return)),t.flags&32){u=t.stateNode;try{Hn(u,"")}catch(it){yn(t,t.return,it)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Yd(t,u,a!==null?a.memoizedProps:u)),o&1024&&($d=!0);break;case 6:if(ea(n,t),ta(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(it){yn(t,t.return,it)}}break;case 3:if(Pu=null,u=ja,ja=Iu(n.containerInfo),ea(n,t),ja=u,ta(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{al(n.containerInfo)}catch(it){yn(t,t.return,it)}$d&&($d=!1,D0(t));break;case 4:o=ja,ja=Iu(t.stateNode.containerInfo),ea(n,t),ta(t),ja=o;break;case 12:ea(n,t),ta(t);break;case 31:ea(n,t),ta(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 13:ea(n,t),ta(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Eu=Ie()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 22:u=t.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,ae=Ls,ge=pi;if(Ls=ae||u,pi=ge||B,ea(n,t),pi=ge,Ls=ae,ta(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||Ls||pi||oo(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(d=B.stateNode,u)v=d.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none";else{R=B.stateNode;var ye=B.memoizedProps.style,ce=ye!=null&&ye.hasOwnProperty("display")?ye.display:null;R.style.display=ce==null||typeof ce=="boolean"?"":(""+ce).trim()}}catch(it){yn(B,B.return,it)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(it){yn(B,B.return,it)}}}else if(n.tag===18){if(a===null){B=n;try{var ue=B.stateNode;u?yx(ue,!0):yx(B.stateNode,!1)}catch(it){yn(B,B.return,it)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,bu(t,a))));break;case 19:ea(n,t),ta(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,bu(t,o)));break;case 30:break;case 21:break;default:ea(n,t),ta(t)}}function ta(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(S0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Wd(t);vu(t,d,u);break;case 5:var v=a.stateNode;a.flags&32&&(Hn(v,""),a.flags&=-33);var R=Wd(t);vu(t,R,v);break;case 3:case 4:var B=a.stateNode.containerInfo,ae=Wd(t);qd(t,ae,B);break;default:throw Error(s(161))}}catch(ge){yn(t,t.return,ge)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function D0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;D0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Us(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)A0(t,n.alternate,n),n=n.sibling}function oo(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:hr(4,n,n.return),oo(n);break;case 1:rs(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&y0(n,n.return,a),oo(n);break;case 27:cc(n.stateNode);case 26:case 5:rs(n,n.return),oo(n);break;case 22:n.memoizedState===null&&oo(n);break;case 30:oo(n);break;default:oo(n)}t=t.sibling}}function Ps(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,v=d.flags;switch(d.tag){case 0:case 11:case 15:Ps(u,d,a),Jl(4,d);break;case 1:if(Ps(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ae){yn(o,o.return,ae)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)cg(B[u],R)}catch(ae){yn(o,o.return,ae)}}a&&v&64&&b0(d),ec(d,d.return);break;case 27:M0(d);case 26:case 5:Ps(u,d,a),a&&o===null&&v&4&&E0(d),ec(d,d.return);break;case 12:Ps(u,d,a);break;case 31:Ps(u,d,a),a&&v&4&&C0(u,d);break;case 13:Ps(u,d,a),a&&v&4&&N0(u,d);break;case 22:d.memoizedState===null&&Ps(u,d,a),ec(d,d.return);break;case 30:break;default:Ps(u,d,a)}n=n.sibling}}function Kd(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Gl(a))}function Zd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Gl(t))}function Xa(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)L0(t,n,a,o),n=n.sibling}function L0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Xa(t,n,a,o),u&2048&&Jl(9,n);break;case 1:Xa(t,n,a,o);break;case 3:Xa(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Gl(t)));break;case 12:if(u&2048){Xa(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,v=d.id,R=d.onPostCommit;typeof R=="function"&&R(v,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(B){yn(n,n.return,B)}}else Xa(t,n,a,o);break;case 31:Xa(t,n,a,o);break;case 13:Xa(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,v=n.alternate,n.memoizedState!==null?d._visibility&2?Xa(t,n,a,o):tc(t,n):d._visibility&2?Xa(t,n,a,o):(d._visibility|=2,Wo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Kd(v,n);break;case 24:Xa(t,n,a,o),u&2048&&Zd(n.alternate,n);break;default:Xa(t,n,a,o)}}function Wo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,v=n,R=a,B=o,ae=v.flags;switch(v.tag){case 0:case 11:case 15:Wo(d,v,R,B,u),Jl(8,v);break;case 23:break;case 22:var ge=v.stateNode;v.memoizedState!==null?ge._visibility&2?Wo(d,v,R,B,u):tc(d,v):(ge._visibility|=2,Wo(d,v,R,B,u)),u&&ae&2048&&Kd(v.alternate,v);break;case 24:Wo(d,v,R,B,u),u&&ae&2048&&Zd(v.alternate,v);break;default:Wo(d,v,R,B,u)}n=n.sibling}}function tc(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:tc(a,o),u&2048&&Kd(o.alternate,o);break;case 24:tc(a,o),u&2048&&Zd(o.alternate,o);break;default:tc(a,o)}n=n.sibling}}var nc=8192;function qo(t,n,a){if(t.subtreeFlags&nc)for(t=t.child;t!==null;)I0(t,n,a),t=t.sibling}function I0(t,n,a){switch(t.tag){case 26:qo(t,n,a),t.flags&nc&&t.memoizedState!==null&&Fy(a,ja,t.memoizedState,t.memoizedProps);break;case 5:qo(t,n,a);break;case 3:case 4:var o=ja;ja=Iu(t.stateNode.containerInfo),qo(t,n,a),ja=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=nc,nc=16777216,qo(t,n,a),nc=o):qo(t,n,a));break;default:qo(t,n,a)}}function U0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function ic(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Ri=o,F0(o,t)}U0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)P0(t),t=t.sibling}function P0(t){switch(t.tag){case 0:case 11:case 15:ic(t),t.flags&2048&&hr(9,t,t.return);break;case 3:ic(t);break;case 12:ic(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,yu(t)):ic(t);break;default:ic(t)}}function yu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Ri=o,F0(o,t)}U0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:hr(8,n,n.return),yu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,yu(n));break;default:yu(n)}t=t.sibling}}function F0(t,n){for(;Ri!==null;){var a=Ri;switch(a.tag){case 0:case 11:case 15:hr(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Gl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Ri=o;else e:for(a=t;Ri!==null;){o=Ri;var u=o.sibling,d=o.return;if(w0(o),o===a){Ri=null;break e}if(u!==null){u.return=d,Ri=u;break e}Ri=d}}}var Qb={getCacheForType:function(t){var n=Ui(fi),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Ui(fi).controller.signal}},Jb=typeof WeakMap=="function"?WeakMap:Map,pn=0,Dn=null,Wt=null,Kt=0,bn=0,pa=null,pr=!1,$o=!1,Qd=!1,Fs=0,ni=0,mr=0,lo=0,Jd=0,ma=0,Ko=0,ac=null,na=null,eh=!1,Eu=0,B0=0,Su=1/0,Mu=null,gr=null,xi=0,xr=null,Zo=null,Bs=0,th=0,nh=null,z0=null,sc=0,ih=null;function ga(){return(pn&2)!==0&&Kt!==0?Kt&-Kt:I.T!==null?ch():Ni()}function G0(){if(ma===0)if((Kt&536870912)===0||Qt){var t=Tt;Tt<<=1,(Tt&3932160)===0&&(Tt=262144),ma=t}else ma=536870912;return t=da.current,t!==null&&(t.flags|=32),ma}function ia(t,n,a){(t===Dn&&(bn===2||bn===9)||t.cancelPendingCommit!==null)&&(Qo(t,0),_r(t,Kt,ma,!1)),ct(t,a),((pn&2)===0||t!==Dn)&&(t===Dn&&((pn&2)===0&&(lo|=a),ni===4&&_r(t,Kt,ma,!1)),os(t))}function H0(t,n,a){if((pn&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ge(t,n),u=o?ny(t,n):sh(t,n,!0),d=o;do{if(u===0){$o&&!o&&_r(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!ey(a)){u=sh(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var v=0;else v=t.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;e:{var R=t;u=ac;var B=R.current.memoizedState.isDehydrated;if(B&&(Qo(R,v).flags|=256),v=sh(R,v,!1),v!==2){if(Qd&&!B){R.errorRecoveryDisabledLanes|=d,lo|=d,u=4;break e}d=na,na=u,d!==null&&(na===null?na=d:na.push.apply(na,d))}u=v}if(d=!1,u!==2)continue}}if(u===1){Qo(t,0),_r(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:_r(o,n,ma,!pr);break e;case 2:na=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Eu+300-Ie(),10<u)){if(_r(o,n,ma,!pr),pe(o,0,!0)!==0)break e;Bs=n,o.timeoutHandle=_x(k0.bind(null,o,a,na,Mu,eh,n,ma,lo,Ko,pr,d,"Throttled",-0,0),u);break e}k0(o,a,na,Mu,eh,n,ma,lo,Ko,pr,d,null,-0,0)}}break}while(!0);os(t)}function k0(t,n,a,o,u,d,v,R,B,ae,ge,ye,ce,ue){if(t.timeoutHandle=-1,ye=n.subtreeFlags,ye&8192||(ye&16785408)===16785408){ye={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ts},I0(n,d,ye);var it=(d&62914560)===d?Eu-Ie():(d&4194048)===d?B0-Ie():0;if(it=By(ye,it),it!==null){Bs=d,t.cancelPendingCommit=it(K0.bind(null,t,n,d,a,o,u,v,R,B,ge,ye,null,ce,ue)),_r(t,d,v,!ae);return}}K0(t,n,d,a,o,u,v,R,B)}function ey(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!ke(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function _r(t,n,a,o){n&=~Jd,n&=~lo,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-we(u),v=1<<d;o[d]=-1,u&=~v}a!==0&&tn(t,a,n)}function Tu(){return(pn&6)===0?(rc(0),!1):!0}function ah(){if(Wt!==null){if(bn===0)var t=Wt.return;else t=Wt,ws=Jr=null,bd(t),ko=null,kl=0,t=Wt;for(;t!==null;)v0(t.alternate,t),t=t.return;Wt=null}}function Qo(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,by(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Bs=0,ah(),Dn=t,Wt=a=Ts(t.current,null),Kt=n,bn=0,pa=null,pr=!1,$o=Ge(t,n),Qd=!1,Ko=ma=Jd=lo=mr=ni=0,na=ac=null,eh=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-we(o),d=1<<u;n|=t[u],o&=~d}return Fs=n,Yc(),a}function V0(t,n){Ft=null,I.H=Kl,n===Ho||n===eu?(n=sg(),bn=3):n===ld?(n=sg(),bn=4):bn=n===Pd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,pa=n,Wt===null&&(ni=1,pu(t,Oa(n,t.current)))}function j0(){var t=da.current;return t===null?!0:(Kt&4194048)===Kt?Ua===null:(Kt&62914560)===Kt||(Kt&536870912)!==0?t===Ua:!1}function X0(){var t=I.H;return I.H=Kl,t===null?Kl:t}function Y0(){var t=I.A;return I.A=Qb,t}function Au(){ni=4,pr||(Kt&4194048)!==Kt&&da.current!==null||($o=!0),(mr&134217727)===0&&(lo&134217727)===0||Dn===null||_r(Dn,Kt,ma,!1)}function sh(t,n,a){var o=pn;pn|=2;var u=X0(),d=Y0();(Dn!==t||Kt!==n)&&(Mu=null,Qo(t,n)),n=!1;var v=ni;e:do try{if(bn!==0&&Wt!==null){var R=Wt,B=pa;switch(bn){case 8:ah(),v=6;break e;case 3:case 2:case 9:case 6:da.current===null&&(n=!0);var ae=bn;if(bn=0,pa=null,Jo(t,R,B,ae),a&&$o){v=0;break e}break;default:ae=bn,bn=0,pa=null,Jo(t,R,B,ae)}}ty(),v=ni;break}catch(ge){V0(t,ge)}while(!0);return n&&t.shellSuspendCounter++,ws=Jr=null,pn=o,I.H=u,I.A=d,Wt===null&&(Dn=null,Kt=0,Yc()),v}function ty(){for(;Wt!==null;)W0(Wt)}function ny(t,n){var a=pn;pn|=2;var o=X0(),u=Y0();Dn!==t||Kt!==n?(Mu=null,Su=Ie()+500,Qo(t,n)):$o=Ge(t,n);e:do try{if(bn!==0&&Wt!==null){n=Wt;var d=pa;t:switch(bn){case 1:bn=0,pa=null,Jo(t,n,d,1);break;case 2:case 9:if(ig(d)){bn=0,pa=null,q0(n);break}n=function(){bn!==2&&bn!==9||Dn!==t||(bn=7),os(t)},d.then(n,n);break e;case 3:bn=7;break e;case 4:bn=5;break e;case 7:ig(d)?(bn=0,pa=null,q0(n)):(bn=0,pa=null,Jo(t,n,d,7));break;case 5:var v=null;switch(Wt.tag){case 26:v=Wt.memoizedState;case 5:case 27:var R=Wt;if(v?Lx(v):R.stateNode.complete){bn=0,pa=null;var B=R.sibling;if(B!==null)Wt=B;else{var ae=R.return;ae!==null?(Wt=ae,wu(ae)):Wt=null}break t}}bn=0,pa=null,Jo(t,n,d,5);break;case 6:bn=0,pa=null,Jo(t,n,d,6);break;case 8:ah(),ni=6;break e;default:throw Error(s(462))}}iy();break}catch(ge){V0(t,ge)}while(!0);return ws=Jr=null,I.H=o,I.A=u,pn=a,Wt!==null?0:(Dn=null,Kt=0,Yc(),ni)}function iy(){for(;Wt!==null&&!Mt();)W0(Wt)}function W0(t){var n=x0(t.alternate,t,Fs);t.memoizedProps=t.pendingProps,n===null?wu(t):Wt=n}function q0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=f0(a,n,n.pendingProps,n.type,void 0,Kt);break;case 11:n=f0(a,n,n.pendingProps,n.type.render,n.ref,Kt);break;case 5:bd(n);default:v0(a,n),n=Wt=Ym(n,Fs),n=x0(a,n,Fs)}t.memoizedProps=t.pendingProps,n===null?wu(t):Wt=n}function Jo(t,n,a,o){ws=Jr=null,bd(n),ko=null,kl=0;var u=n.return;try{if(Xb(t,u,n,a,Kt)){ni=1,pu(t,Oa(a,t.current)),Wt=null;return}}catch(d){if(u!==null)throw Wt=u,d;ni=1,pu(t,Oa(a,t.current)),Wt=null;return}n.flags&32768?(Qt||o===1?t=!0:$o||(Kt&536870912)!==0?t=!1:(pr=t=!0,(o===2||o===9||o===3||o===6)&&(o=da.current,o!==null&&o.tag===13&&(o.flags|=16384))),$0(n,t)):wu(n)}function wu(t){var n=t;do{if((n.flags&32768)!==0){$0(n,pr);return}t=n.return;var a=qb(n.alternate,n,Fs);if(a!==null){Wt=a;return}if(n=n.sibling,n!==null){Wt=n;return}Wt=n=t}while(n!==null);ni===0&&(ni=5)}function $0(t,n){do{var a=$b(t.alternate,t);if(a!==null){a.flags&=32767,Wt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Wt=t;return}Wt=t=a}while(t!==null);ni=6,Wt=null}function K0(t,n,a,o,u,d,v,R,B){t.cancelPendingCommit=null;do Ru();while(xi!==0);if((pn&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Wf,Ln(t,a,d,v,R,B),t===Dn&&(Wt=Dn=null,Kt=0),Zo=n,xr=t,Bs=a,th=d,nh=u,z0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,oy(Q,function(){return tx(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=I.T,I.T=null,u=G.p,G.p=2,v=pn,pn|=4;try{Kb(t,n,a)}finally{pn=v,G.p=u,I.T=o}}xi=1,Z0(),Q0(),J0()}}function Z0(){if(xi===1){xi=0;var t=xr,n=Zo,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=I.T,I.T=null;var o=G.p;G.p=2;var u=pn;pn|=4;try{O0(n,t);var d=xh,v=cn(t.containerInfo),R=d.focusedElem,B=d.selectionRange;if(v!==R&&R&&R.ownerDocument&&Ot(R.ownerDocument.documentElement,R)){if(B!==null&&Zn(R)){var ae=B.start,ge=B.end;if(ge===void 0&&(ge=ae),"selectionStart"in R)R.selectionStart=ae,R.selectionEnd=Math.min(ge,R.value.length);else{var ye=R.ownerDocument||document,ce=ye&&ye.defaultView||window;if(ce.getSelection){var ue=ce.getSelection(),it=R.textContent.length,_t=Math.min(B.start,it),wn=B.end===void 0?_t:Math.min(B.end,it);!ue.extend&&_t>wn&&(v=wn,wn=_t,_t=v);var Z=st(R,_t),j=st(R,wn);if(Z&&j&&(ue.rangeCount!==1||ue.anchorNode!==Z.node||ue.anchorOffset!==Z.offset||ue.focusNode!==j.node||ue.focusOffset!==j.offset)){var ie=ye.createRange();ie.setStart(Z.node,Z.offset),ue.removeAllRanges(),_t>wn?(ue.addRange(ie),ue.extend(j.node,j.offset)):(ie.setEnd(j.node,j.offset),ue.addRange(ie))}}}}for(ye=[],ue=R;ue=ue.parentNode;)ue.nodeType===1&&ye.push({element:ue,left:ue.scrollLeft,top:ue.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ye.length;R++){var ve=ye[R];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}Gu=!!gh,xh=gh=null}finally{pn=u,G.p=o,I.T=a}}t.current=n,xi=2}}function Q0(){if(xi===2){xi=0;var t=xr,n=Zo,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=I.T,I.T=null;var o=G.p;G.p=2;var u=pn;pn|=4;try{A0(t,n.alternate,n)}finally{pn=u,G.p=o,I.T=a}}xi=3}}function J0(){if(xi===4||xi===3){xi=0,dn();var t=xr,n=Zo,a=Bs,o=z0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?xi=5:(xi=0,Zo=xr=null,ex(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(gr=null),Gr(a),n=n.stateNode,he&&typeof he.onCommitFiberRoot=="function")try{he.onCommitFiberRoot(fe,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=I.T,u=G.p,G.p=2,I.T=null;try{for(var d=t.onRecoverableError,v=0;v<o.length;v++){var R=o[v];d(R.value,{componentStack:R.stack})}}finally{I.T=n,G.p=u}}(Bs&3)!==0&&Ru(),os(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===ih?sc++:(sc=0,ih=t):sc=0,rc(0)}}function ex(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Gl(n)))}function Ru(){return Z0(),Q0(),J0(),tx()}function tx(){if(xi!==5)return!1;var t=xr,n=th;th=0;var a=Gr(Bs),o=I.T,u=G.p;try{G.p=32>a?32:a,I.T=null,a=nh,nh=null;var d=xr,v=Bs;if(xi=0,Zo=xr=null,Bs=0,(pn&6)!==0)throw Error(s(331));var R=pn;if(pn|=4,P0(d.current),L0(d,d.current,v,a),pn=R,rc(0,!1),he&&typeof he.onPostCommitFiberRoot=="function")try{he.onPostCommitFiberRoot(fe,d)}catch{}return!0}finally{G.p=u,I.T=o,ex(t,n)}}function nx(t,n,a){n=Oa(a,n),n=Ud(t.stateNode,n,2),t=ur(t,n,2),t!==null&&(ct(t,2),os(t))}function yn(t,n,a){if(t.tag===3)nx(t,t,a);else for(;n!==null;){if(n.tag===3){nx(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(gr===null||!gr.has(o))){t=Oa(a,t),a=i0(2),o=ur(n,a,2),o!==null&&(a0(a,o,n,t),ct(o,2),os(o));break}}n=n.return}}function rh(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new Jb;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Qd=!0,u.add(a),t=ay.bind(null,t,n,a),n.then(t,t))}function ay(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Dn===t&&(Kt&a)===a&&(ni===4||ni===3&&(Kt&62914560)===Kt&&300>Ie()-Eu?(pn&2)===0&&Qo(t,0):Jd|=a,Ko===Kt&&(Ko=0)),os(t)}function ix(t,n){n===0&&(n=Se()),t=Kr(t,n),t!==null&&(ct(t,n),os(t))}function sy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),ix(t,a)}function ry(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),ix(t,a)}function oy(t,n){return H(t,n)}var Cu=null,el=null,oh=!1,Nu=!1,lh=!1,vr=0;function os(t){t!==el&&t.next===null&&(el===null?Cu=el=t:el=el.next=t),Nu=!0,oh||(oh=!0,cy())}function rc(t,n){if(!lh&&Nu){lh=!0;do for(var a=!1,o=Cu;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var v=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-we(42|t)+1)-1,d&=u&~(v&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,ox(o,d))}else d=Kt,d=pe(o,o===Dn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Ge(o,d)||(a=!0,ox(o,d));o=o.next}while(a);lh=!1}}function ly(){ax()}function ax(){Nu=oh=!1;var t=0;vr!==0&&vy()&&(t=vr);for(var n=Ie(),a=null,o=Cu;o!==null;){var u=o.next,d=sx(o,n);d===0?(o.next=null,a===null?Cu=u:a.next=u,u===null&&(el=a)):(a=o,(t!==0||(d&3)!==0)&&(Nu=!0)),o=u}xi!==0&&xi!==5||rc(t),vr!==0&&(vr=0)}function sx(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var v=31-we(d),R=1<<v,B=u[v];B===-1?((R&a)===0||(R&o)!==0)&&(u[v]=ze(R,n)):B<=n&&(t.expiredLanes|=R),d&=~R}if(n=Dn,a=Kt,a=pe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(bn===2||bn===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&In(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ge(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&In(o),Gr(a)){case 2:case 8:a=M;break;case 32:a=Q;break;case 268435456:a=be;break;default:a=Q}return o=rx.bind(null,t),a=H(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&In(o),t.callbackPriority=2,t.callbackNode=null,2}function rx(t,n){if(xi!==0&&xi!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ru()&&t.callbackNode!==a)return null;var o=Kt;return o=pe(t,t===Dn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(H0(t,o,n),sx(t,Ie()),t.callbackNode!=null&&t.callbackNode===a?rx.bind(null,t):null)}function ox(t,n){if(Ru())return null;H0(t,n,!0)}function cy(){yy(function(){(pn&6)!==0?H(O,ly):ax()})}function ch(){if(vr===0){var t=zo;t===0&&(t=Et,Et<<=1,(Et&261888)===0&&(Et=256)),vr=t}return vr}function lx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Zs(""+t)}function cx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function uy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=lx((u[ii]||null).action),v=o.submitter;v&&(n=(n=v[ii]||null)?lx(n.formAction):v.getAttribute("formAction"),n!==null&&(d=n,v=null));var R=new er("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(vr!==0){var B=v?cx(u,v):new FormData(u);Cd(a,{pending:!0,data:B,method:u.method,action:d},null,B)}}else typeof d=="function"&&(R.preventDefault(),B=v?cx(u,v):new FormData(u),Cd(a,{pending:!0,data:B,method:u.method,action:d},d,B))},currentTarget:u}]})}}for(var uh=0;uh<Yf.length;uh++){var fh=Yf[uh],fy=fh.toLowerCase(),dy=fh[0].toUpperCase()+fh.slice(1);Va(fy,"on"+dy)}Va(Gm,"onAnimationEnd"),Va(Hm,"onAnimationIteration"),Va(km,"onAnimationStart"),Va("dblclick","onDoubleClick"),Va("focusin","onFocus"),Va("focusout","onBlur"),Va(Rb,"onTransitionRun"),Va(Cb,"onTransitionStart"),Va(Nb,"onTransitionCancel"),Va(Vm,"onTransitionEnd"),re("onMouseEnter",["mouseout","mouseover"]),re("onMouseLeave",["mouseout","mouseover"]),re("onPointerEnter",["pointerout","pointerover"]),re("onPointerLeave",["pointerout","pointerover"]),q("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),q("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),q("onBeforeInput",["compositionend","keypress","textInput","paste"]),q("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(oc));function ux(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var v=o.length-1;0<=v;v--){var R=o[v],B=R.instance,ae=R.currentTarget;if(R=R.listener,B!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ae;try{d(u)}catch(ge){Xc(ge)}u.currentTarget=null,d=B}else for(v=0;v<o.length;v++){if(R=o[v],B=R.instance,ae=R.currentTarget,R=R.listener,B!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ae;try{d(u)}catch(ge){Xc(ge)}u.currentTarget=null,d=B}}}}function qt(t,n){var a=n[Ea];a===void 0&&(a=n[Ea]=new Set);var o=t+"__bubble";a.has(o)||(fx(n,t,2,!1),a.add(o))}function dh(t,n,a){var o=0;n&&(o|=4),fx(a,t,o,n)}var Ou="_reactListening"+Math.random().toString(36).slice(2);function hh(t){if(!t[Ou]){t[Ou]=!0,es.forEach(function(a){a!=="selectionchange"&&(hy.has(a)||dh(a,!1,t),dh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Ou]||(n[Ou]=!0,dh("selectionchange",!1,n))}}function fx(t,n,a,o){switch(Gx(n)){case 2:var u=Hy;break;case 8:u=ky;break;default:u=Rh}a=u.bind(null,n,a,t),u=void 0,!Qs||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function ph(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var R=o.stateNode.containerInfo;if(R===u)break;if(v===4)for(v=o.return;v!==null;){var B=v.tag;if((B===3||B===4)&&v.stateNode.containerInfo===u)return;v=v.return}for(;R!==null;){if(v=bs(R),v===null)return;if(B=v.tag,B===5||B===6||B===26||B===27){o=d=v;continue e}R=R.parentNode}}o=o.return}Dl(function(){var ae=d,ge=kr(a),ye=[];e:{var ce=jm.get(t);if(ce!==void 0){var ue=er,it=t;switch(t){case"keypress":if(St(a)===0)break e;case"keydown":case"keyup":ue=Me;break;case"focusin":it="focus",ue=Ll;break;case"focusout":it="blur",ue=Ll;break;case"beforeblur":case"afterblur":ue=Ll;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ue=Ss;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ue=kc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ue=gi;break;case Gm:case Hm:case km:ue=Vf;break;case Vm:ue=Kn;break;case"scroll":case"scrollend":ue=kf;break;case"wheel":ue=Di;break;case"copy":case"cut":case"paste":ue=Gt;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ue=Nt;break;case"toggle":case"beforetoggle":ue=Qn}var _t=(n&4)!==0,wn=!_t&&(t==="scroll"||t==="scrollend"),Z=_t?ce!==null?ce+"Capture":null:ce;_t=[];for(var j=ae,ie;j!==null;){var ve=j;if(ie=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||ie===null||Z===null||(ve=Vr(j,Z),ve!=null&&_t.push(lc(j,ve,ie))),wn)break;j=j.return}0<_t.length&&(ce=new ue(ce,it,null,a,ge),ye.push({event:ce,listeners:_t}))}}if((n&7)===0){e:{if(ce=t==="mouseover"||t==="pointerover",ue=t==="mouseout"||t==="pointerout",ce&&a!==To&&(it=a.relatedTarget||a.fromElement)&&(bs(it)||it[Un]))break e;if((ue||ce)&&(ce=ge.window===ge?ge:(ce=ge.ownerDocument)?ce.defaultView||ce.parentWindow:window,ue?(it=a.relatedTarget||a.toElement,ue=ae,it=it?bs(it):null,it!==null&&(wn=c(it),_t=it.tag,it!==wn||_t!==5&&_t!==27&&_t!==6)&&(it=null)):(ue=null,it=ae),ue!==it)){if(_t=Ss,ve="onMouseLeave",Z="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&(_t=Nt,ve="onPointerLeave",Z="onPointerEnter",j="pointer"),wn=ue==null?ce:Ja(ue),ie=it==null?ce:Ja(it),ce=new _t(ve,j+"leave",ue,a,ge),ce.target=wn,ce.relatedTarget=ie,ve=null,bs(ge)===ae&&(_t=new _t(Z,j+"enter",it,a,ge),_t.target=ie,_t.relatedTarget=wn,ve=_t),wn=ve,ue&&it)t:{for(_t=py,Z=ue,j=it,ie=0,ve=Z;ve;ve=_t(ve))ie++;ve=0;for(var mt=j;mt;mt=_t(mt))ve++;for(;0<ie-ve;)Z=_t(Z),ie--;for(;0<ve-ie;)j=_t(j),ve--;for(;ie--;){if(Z===j||j!==null&&Z===j.alternate){_t=Z;break t}Z=_t(Z),j=_t(j)}_t=null}else _t=null;ue!==null&&dx(ye,ce,ue,_t,!1),it!==null&&wn!==null&&dx(ye,wn,it,_t,!0)}}e:{if(ce=ae?Ja(ae):window,ue=ce.nodeName&&ce.nodeName.toLowerCase(),ue==="select"||ue==="input"&&ce.type==="file")var un=Il;else if(Gi(ce))if(Co)un=Qe;else{un=xt;var ot=Oo}else ue=ce.nodeName,!ue||ue.toLowerCase()!=="input"||ce.type!=="checkbox"&&ce.type!=="radio"?ae&&an(ae.elementType)&&(un=Il):un=Rt;if(un&&(un=un(t,ae))){wi(ye,un,a,ge);break e}ot&&ot(t,ce,ae),t==="focusout"&&ae&&ce.type==="number"&&ae.memoizedProps.value!=null&&Bt(ce,"number",ce.value)}switch(ot=ae?Ja(ae):window,t){case"focusin":(Gi(ot)||ot.contentEditable==="true")&&(en=ot,Vn=ae,ei=null);break;case"focusout":ei=Vn=en=null;break;case"mousedown":ua=!0;break;case"contextmenu":case"mouseup":case"dragend":ua=!1,Ms(ye,a,ge);break;case"selectionchange":if(yt)break;case"keydown":case"keyup":Ms(ye,a,ge)}var zt;if(_n)e:{switch(t){case"compositionstart":var Zt="onCompositionStart";break e;case"compositionend":Zt="onCompositionEnd";break e;case"compositionupdate":Zt="onCompositionUpdate";break e}Zt=void 0}else Bn?kn(t,a)&&(Zt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Zt="onCompositionStart");Zt&&(vn&&a.locale!=="ko"&&(Bn||Zt!=="onCompositionStart"?Zt==="onCompositionEnd"&&Bn&&(zt=Gc()):(Oi=ge,jr="value"in Oi?Oi.value:Oi.textContent,Bn=!0)),ot=Du(ae,Zt),0<ot.length&&(Zt=new lt(Zt,t,null,a,ge),ye.push({event:Zt,listeners:ot}),zt?Zt.data=zt:(zt=ca(a),zt!==null&&(Zt.data=zt)))),(zt=Fn?Ca(t,a):Ht(t,a))&&(Zt=Du(ae,"onBeforeInput"),0<Zt.length&&(ot=new lt("onBeforeInput","beforeinput",null,a,ge),ye.push({event:ot,listeners:Zt}),ot.data=zt)),uy(ye,t,ae,a,ge)}ux(ye,n)})}function lc(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Du(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=Vr(t,a),u!=null&&o.unshift(lc(t,u,d)),u=Vr(t,n),u!=null&&o.push(lc(t,u,d))),t.tag===3)return o;t=t.return}return[]}function py(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function dx(t,n,a,o,u){for(var d=n._reactName,v=[];a!==null&&a!==o;){var R=a,B=R.alternate,ae=R.stateNode;if(R=R.tag,B!==null&&B===o)break;R!==5&&R!==26&&R!==27||ae===null||(B=ae,u?(ae=Vr(a,d),ae!=null&&v.unshift(lc(a,ae,B))):u||(ae=Vr(a,d),ae!=null&&v.push(lc(a,ae,B)))),a=a.return}v.length!==0&&t.push({event:n,listeners:v})}var my=/\r\n?/g,gy=/\u0000|\uFFFD/g;function hx(t){return(typeof t=="string"?t:""+t).replace(my,`
`).replace(gy,"")}function px(t,n){return n=hx(n),hx(t)===n}function An(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Hn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Hn(t,""+o);break;case"className":Ze(t,"class",o);break;case"tabIndex":Ze(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ze(t,a,o);break;case"style":la(t,o,d);break;case"data":if(n!=="object"){Ze(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Zs(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&An(t,n,"name",u.name,u,null),An(t,n,"formEncType",u.formEncType,u,null),An(t,n,"formMethod",u.formMethod,u,null),An(t,n,"formTarget",u.formTarget,u,null)):(An(t,n,"encType",u.encType,u,null),An(t,n,"method",u.method,u,null),An(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Zs(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=ts);break;case"onScroll":o!=null&&qt("scroll",t);break;case"onScrollEnd":o!=null&&qt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=Zs(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":qt("beforetoggle",t),qt("toggle",t),_e(t,"popover",o);break;case"xlinkActuate":Je(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Je(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Je(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Je(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Je(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Je(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Je(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":_e(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Si.get(a)||a,_e(t,a,o))}}function mh(t,n,a,o,u,d){switch(a){case"style":la(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?Hn(t,o):(typeof o=="number"||typeof o=="bigint")&&Hn(t,""+o);break;case"onScroll":o!=null&&qt("scroll",t);break;case"onScrollEnd":o!=null&&qt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=ts);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[ii]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):_e(t,a,o)}}}function Fi(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":qt("error",t),qt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var v=a[d];if(v!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:An(t,n,d,v,a,null)}}u&&An(t,n,"srcSet",a.srcSet,a,null),o&&An(t,n,"src",a.src,a,null);return;case"input":qt("invalid",t);var R=d=v=u=null,B=null,ae=null;for(o in a)if(a.hasOwnProperty(o)){var ge=a[o];if(ge!=null)switch(o){case"name":u=ge;break;case"type":v=ge;break;case"checked":B=ge;break;case"defaultChecked":ae=ge;break;case"value":d=ge;break;case"defaultValue":R=ge;break;case"children":case"dangerouslySetInnerHTML":if(ge!=null)throw Error(s(137,n));break;default:An(t,n,o,ge,a,null)}}Nn(t,d,R,B,ae,v,u,!1);return;case"select":qt("invalid",t),o=v=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":v=R;break;case"multiple":o=R;default:An(t,n,u,R,a,null)}n=d,a=v,t.multiple=!!o,n!=null?$n(t,!!o,n,!1):a!=null&&$n(t,!!o,a,!0);return;case"textarea":qt("invalid",t),d=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(R=a[v],R!=null))switch(v){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:An(t,n,v,R,a,null)}oa(t,o,u,d);return;case"option":for(B in a)a.hasOwnProperty(B)&&(o=a[B],o!=null)&&(B==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":An(t,n,B,o,a,null));return;case"dialog":qt("beforetoggle",t),qt("toggle",t),qt("cancel",t),qt("close",t);break;case"iframe":case"object":qt("load",t);break;case"video":case"audio":for(o=0;o<oc.length;o++)qt(oc[o],t);break;case"image":qt("error",t),qt("load",t);break;case"details":qt("toggle",t);break;case"embed":case"source":case"link":qt("error",t),qt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ae in a)if(a.hasOwnProperty(ae)&&(o=a[ae],o!=null))switch(ae){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:An(t,n,ae,o,a,null)}return;default:if(an(n)){for(ge in a)a.hasOwnProperty(ge)&&(o=a[ge],o!==void 0&&mh(t,n,ge,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&An(t,n,R,o,a,null))}function xy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,v=null,R=null,B=null,ae=null,ge=null;for(ue in a){var ye=a[ue];if(a.hasOwnProperty(ue)&&ye!=null)switch(ue){case"checked":break;case"value":break;case"defaultValue":B=ye;default:o.hasOwnProperty(ue)||An(t,n,ue,null,o,ye)}}for(var ce in o){var ue=o[ce];if(ye=a[ce],o.hasOwnProperty(ce)&&(ue!=null||ye!=null))switch(ce){case"type":d=ue;break;case"name":u=ue;break;case"checked":ae=ue;break;case"defaultChecked":ge=ue;break;case"value":v=ue;break;case"defaultValue":R=ue;break;case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(s(137,n));break;default:ue!==ye&&An(t,n,ce,ue,o,ye)}}We(t,v,R,B,ae,ge,d,u);return;case"select":ue=v=R=ce=null;for(d in a)if(B=a[d],a.hasOwnProperty(d)&&B!=null)switch(d){case"value":break;case"multiple":ue=B;default:o.hasOwnProperty(d)||An(t,n,d,null,o,B)}for(u in o)if(d=o[u],B=a[u],o.hasOwnProperty(u)&&(d!=null||B!=null))switch(u){case"value":ce=d;break;case"defaultValue":R=d;break;case"multiple":v=d;default:d!==B&&An(t,n,u,d,o,B)}n=R,a=v,o=ue,ce!=null?$n(t,!!a,ce,!1):!!o!=!!a&&(n!=null?$n(t,!!a,n,!0):$n(t,!!a,a?[]:"",!1));return;case"textarea":ue=ce=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:An(t,n,R,null,o,u)}for(v in o)if(u=o[v],d=a[v],o.hasOwnProperty(v)&&(u!=null||d!=null))switch(v){case"value":ce=u;break;case"defaultValue":ue=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&An(t,n,v,u,o,d)}ai(t,ce,ue);return;case"option":for(var it in a)ce=a[it],a.hasOwnProperty(it)&&ce!=null&&!o.hasOwnProperty(it)&&(it==="selected"?t.selected=!1:An(t,n,it,null,o,ce));for(B in o)ce=o[B],ue=a[B],o.hasOwnProperty(B)&&ce!==ue&&(ce!=null||ue!=null)&&(B==="selected"?t.selected=ce&&typeof ce!="function"&&typeof ce!="symbol":An(t,n,B,ce,o,ue));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _t in a)ce=a[_t],a.hasOwnProperty(_t)&&ce!=null&&!o.hasOwnProperty(_t)&&An(t,n,_t,null,o,ce);for(ae in o)if(ce=o[ae],ue=a[ae],o.hasOwnProperty(ae)&&ce!==ue&&(ce!=null||ue!=null))switch(ae){case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:An(t,n,ae,ce,o,ue)}return;default:if(an(n)){for(var wn in a)ce=a[wn],a.hasOwnProperty(wn)&&ce!==void 0&&!o.hasOwnProperty(wn)&&mh(t,n,wn,void 0,o,ce);for(ge in o)ce=o[ge],ue=a[ge],!o.hasOwnProperty(ge)||ce===ue||ce===void 0&&ue===void 0||mh(t,n,ge,ce,o,ue);return}}for(var Z in a)ce=a[Z],a.hasOwnProperty(Z)&&ce!=null&&!o.hasOwnProperty(Z)&&An(t,n,Z,null,o,ce);for(ye in o)ce=o[ye],ue=a[ye],!o.hasOwnProperty(ye)||ce===ue||ce==null&&ue==null||An(t,n,ye,ce,o,ue)}function mx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _y(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,v=u.initiatorType,R=u.duration;if(d&&R&&mx(v)){for(v=0,R=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],ae=B.startTime;if(ae>R)break;var ge=B.transferSize,ye=B.initiatorType;ge&&mx(ye)&&(B=B.responseEnd,v+=ge*(B<R?1:(R-ae)/(B-ae)))}if(--o,n+=8*(d+v)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var gh=null,xh=null;function Lu(t){return t.nodeType===9?t:t.ownerDocument}function gx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function xx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function _h(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var vh=null;function vy(){var t=window.event;return t&&t.type==="popstate"?t===vh?!1:(vh=t,!0):(vh=null,!1)}var _x=typeof setTimeout=="function"?setTimeout:void 0,by=typeof clearTimeout=="function"?clearTimeout:void 0,vx=typeof Promise=="function"?Promise:void 0,yy=typeof queueMicrotask=="function"?queueMicrotask:typeof vx<"u"?function(t){return vx.resolve(null).then(t).catch(Ey)}:_x;function Ey(t){setTimeout(function(){throw t})}function br(t){return t==="head"}function bx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),al(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")cc(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,cc(a);for(var d=a.firstChild;d;){var v=d.nextSibling,R=d.nodeName;d[Ma]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=v}}else a==="body"&&cc(t.ownerDocument.body);a=u}while(a);al(n)}function yx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function bh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":bh(a),Mo(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Sy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ma])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=Pa(t.nextSibling),t===null)break}return null}function My(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Pa(t.nextSibling),t===null))return null;return t}function Ex(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Pa(t.nextSibling),t===null))return null;return t}function yh(t){return t.data==="$?"||t.data==="$~"}function Eh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Ty(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Pa(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Sh=null;function Sx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Pa(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Mx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Tx(t,n,a){switch(n=Lu(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function cc(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Mo(t)}var Fa=new Map,Ax=new Set;function Iu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var zs=G.d;G.d={f:Ay,r:wy,D:Ry,C:Cy,L:Ny,m:Oy,X:Ly,S:Dy,M:Iy};function Ay(){var t=zs.f(),n=Tu();return t||n}function wy(t){var n=Ta(t);n!==null&&n.tag===5&&n.type==="form"?Vg(n):zs.r(t)}var tl=typeof document>"u"?null:document;function wx(t,n,a){var o=tl;if(o&&typeof n=="string"&&n){var u=ln(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Ax.has(u)||(Ax.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Fi(n,"link",t),qn(n),o.head.appendChild(n)))}}function Ry(t){zs.D(t),wx("dns-prefetch",t,null)}function Cy(t,n){zs.C(t,n),wx("preconnect",t,n)}function Ny(t,n,a){zs.L(t,n,a);var o=tl;if(o&&t&&n){var u='link[rel="preload"][as="'+ln(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ln(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ln(a.imageSizes)+'"]')):u+='[href="'+ln(t)+'"]';var d=u;switch(n){case"style":d=nl(t);break;case"script":d=il(t)}Fa.has(d)||(t=b({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Fa.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(uc(d))||n==="script"&&o.querySelector(fc(d))||(n=o.createElement("link"),Fi(n,"link",t),qn(n),o.head.appendChild(n)))}}function Oy(t,n){zs.m(t,n);var a=tl;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+ln(o)+'"][href="'+ln(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=il(t)}if(!Fa.has(d)&&(t=b({rel:"modulepreload",href:t},n),Fa.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(fc(d)))return}o=a.createElement("link"),Fi(o,"link",t),qn(o),a.head.appendChild(o)}}}function Dy(t,n,a){zs.S(t,n,a);var o=tl;if(o&&t){var u=Aa(o).hoistableStyles,d=nl(t);n=n||"default";var v=u.get(d);if(!v){var R={loading:0,preload:null};if(v=o.querySelector(uc(d)))R.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Fa.get(d))&&Mh(t,a);var B=v=o.createElement("link");qn(B),Fi(B,"link",t),B._p=new Promise(function(ae,ge){B.onload=ae,B.onerror=ge}),B.addEventListener("load",function(){R.loading|=1}),B.addEventListener("error",function(){R.loading|=2}),R.loading|=4,Uu(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:R},u.set(d,v)}}}function Ly(t,n){zs.X(t,n);var a=tl;if(a&&t){var o=Aa(a).hoistableScripts,u=il(t),d=o.get(u);d||(d=a.querySelector(fc(u)),d||(t=b({src:t,async:!0},n),(n=Fa.get(u))&&Th(t,n),d=a.createElement("script"),qn(d),Fi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Iy(t,n){zs.M(t,n);var a=tl;if(a&&t){var o=Aa(a).hoistableScripts,u=il(t),d=o.get(u);d||(d=a.querySelector(fc(u)),d||(t=b({src:t,async:!0,type:"module"},n),(n=Fa.get(u))&&Th(t,n),d=a.createElement("script"),qn(d),Fi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Rx(t,n,a,o){var u=(u=oe.current)?Iu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=nl(a.href),a=Aa(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=nl(a.href);var d=Aa(u).hoistableStyles,v=d.get(t);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,v),(d=u.querySelector(uc(t)))&&!d._p&&(v.instance=d,v.state.loading=5),Fa.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Fa.set(t,a),d||Uy(u,t,a,v.state))),n&&o===null)throw Error(s(528,""));return v}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=il(a),a=Aa(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function nl(t){return'href="'+ln(t)+'"'}function uc(t){return'link[rel="stylesheet"]['+t+"]"}function Cx(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function Uy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Fi(n,"link",a),qn(n),t.head.appendChild(n))}function il(t){return'[src="'+ln(t)+'"]'}function fc(t){return"script[async]"+t}function Nx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+ln(a.href)+'"]');if(o)return n.instance=o,qn(o),o;var u=b({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),qn(o),Fi(o,"style",u),Uu(o,a.precedence,t),n.instance=o;case"stylesheet":u=nl(a.href);var d=t.querySelector(uc(u));if(d)return n.state.loading|=4,n.instance=d,qn(d),d;o=Cx(a),(u=Fa.get(u))&&Mh(o,u),d=(t.ownerDocument||t).createElement("link"),qn(d);var v=d;return v._p=new Promise(function(R,B){v.onload=R,v.onerror=B}),Fi(d,"link",o),n.state.loading|=4,Uu(d,a.precedence,t),n.instance=d;case"script":return d=il(a.src),(u=t.querySelector(fc(d)))?(n.instance=u,qn(u),u):(o=a,(u=Fa.get(d))&&(o=b({},a),Th(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),qn(u),Fi(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Uu(o,a.precedence,t));return n.instance}function Uu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,v=0;v<o.length;v++){var R=o[v];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Th(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Pu=null;function Ox(t,n,a){if(Pu===null){var o=new Map,u=Pu=new Map;u.set(a,o)}else u=Pu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Ma]||d[Mn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var v=d.getAttribute(n)||"";v=t+v;var R=o.get(v);R?R.push(d):o.set(v,[d])}}return o}function Dx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Py(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Lx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Fy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=nl(o.href),d=n.querySelector(uc(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Fu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,qn(d);return}d=n.ownerDocument||n,o=Cx(o),(u=Fa.get(u))&&Mh(o,u),d=d.createElement("link"),qn(d);var v=d;v._p=new Promise(function(R,B){v.onload=R,v.onerror=B}),Fi(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Fu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Ah=0;function By(t,n){return t.stylesheets&&t.count===0&&zu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&zu(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&Ah===0&&(Ah=62500*_y());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&zu(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>Ah?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Fu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Bu=null;function zu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Bu=new Map,n.forEach(zy,t),Bu=null,Fu.call(t))}function zy(t,n){if(!(n.state.loading&4)){var a=Bu.get(t);if(a)var o=a.get(null);else{a=new Map,Bu.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var v=u[d];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),d=a.get(v)||o,d===o&&a.set(null,u),a.set(v,u),this.count++,o=Fu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var dc={$$typeof:U,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function Gy(t,n,a,o,u,d,v,R,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tt(0),this.hiddenUpdates=tt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function Ix(t,n,a,o,u,d,v,R,B,ae,ge,ye){return t=new Gy(t,n,a,v,B,ae,ge,ye,R),n=1,d===!0&&(n|=24),d=fa(3,null,null,n),t.current=d,d.stateNode=t,n=sd(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},cd(d),t}function Ux(t){return t?(t=Io,t):Io}function Px(t,n,a,o,u,d){u=Ux(u),o.context===null?o.context=u:o.pendingContext=u,o=cr(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=ur(t,o,n),a!==null&&(ia(a,t,n),jl(a,t,n))}function Fx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function wh(t,n){Fx(t,n),(t=t.alternate)&&Fx(t,n)}function Bx(t){if(t.tag===13||t.tag===31){var n=Kr(t,67108864);n!==null&&ia(n,t,67108864),wh(t,67108864)}}function zx(t){if(t.tag===13||t.tag===31){var n=ga();n=Za(n);var a=Kr(t,n);a!==null&&ia(a,t,n),wh(t,n)}}var Gu=!0;function Hy(t,n,a,o){var u=I.T;I.T=null;var d=G.p;try{G.p=2,Rh(t,n,a,o)}finally{G.p=d,I.T=u}}function ky(t,n,a,o){var u=I.T;I.T=null;var d=G.p;try{G.p=8,Rh(t,n,a,o)}finally{G.p=d,I.T=u}}function Rh(t,n,a,o){if(Gu){var u=Ch(o);if(u===null)ph(t,n,o,Hu,a),Hx(t,o);else if(jy(u,t,n,a,o))o.stopPropagation();else if(Hx(t,o),n&4&&-1<Vy.indexOf(t)){for(;u!==null;){var d=Ta(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var v=Re(d.pendingLanes);if(v!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;v;){var B=1<<31-we(v);R.entanglements[1]|=B,v&=~B}os(d),(pn&6)===0&&(Su=Ie()+500,rc(0))}}break;case 31:case 13:R=Kr(d,2),R!==null&&ia(R,d,2),Tu(),wh(d,2)}if(d=Ch(o),d===null&&ph(t,n,o,Hu,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else ph(t,n,o,null,a)}}function Ch(t){return t=kr(t),Nh(t)}var Hu=null;function Nh(t){if(Hu=null,t=bs(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Hu=t,null}function Gx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Sn()){case O:return 2;case M:return 8;case Q:case xe:return 32;case be:return 268435456;default:return 32}default:return 32}}var Oh=!1,yr=null,Er=null,Sr=null,hc=new Map,pc=new Map,Mr=[],Vy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Hx(t,n){switch(t){case"focusin":case"focusout":yr=null;break;case"dragenter":case"dragleave":Er=null;break;case"mouseover":case"mouseout":Sr=null;break;case"pointerover":case"pointerout":hc.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":pc.delete(n.pointerId)}}function mc(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=Ta(n),n!==null&&Bx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function jy(t,n,a,o,u){switch(n){case"focusin":return yr=mc(yr,t,n,a,o,u),!0;case"dragenter":return Er=mc(Er,t,n,a,o,u),!0;case"mouseover":return Sr=mc(Sr,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return hc.set(d,mc(hc.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,pc.set(d,mc(pc.get(d)||null,t,n,a,o,u)),!0}return!1}function kx(t){var n=bs(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,Qa(t.priority,function(){zx(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Qa(t.priority,function(){zx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ku(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Ch(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);To=o,a.target.dispatchEvent(o),To=null}else return n=Ta(a),n!==null&&Bx(n),t.blockedOn=a,!1;n.shift()}return!0}function Vx(t,n,a){ku(t)&&a.delete(n)}function Xy(){Oh=!1,yr!==null&&ku(yr)&&(yr=null),Er!==null&&ku(Er)&&(Er=null),Sr!==null&&ku(Sr)&&(Sr=null),hc.forEach(Vx),pc.forEach(Vx)}function Vu(t,n){t.blockedOn===n&&(t.blockedOn=null,Oh||(Oh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Xy)))}var ju=null;function jx(t){ju!==t&&(ju=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){ju===t&&(ju=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Nh(o||a)===null)continue;break}var d=Ta(a);d!==null&&(t.splice(n,3),n-=3,Cd(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function al(t){function n(B){return Vu(B,t)}yr!==null&&Vu(yr,t),Er!==null&&Vu(Er,t),Sr!==null&&Vu(Sr,t),hc.forEach(n),pc.forEach(n);for(var a=0;a<Mr.length;a++){var o=Mr[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Mr.length&&(a=Mr[0],a.blockedOn===null);)kx(a),a.blockedOn===null&&Mr.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],v=u[ii]||null;if(typeof d=="function")v||jx(a);else if(v){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,v=d[ii]||null)R=v.formAction;else if(Nh(u)!==null)continue}else R=v.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),jx(a)}}}function Xx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(v){return u=v})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Dh(t){this._internalRoot=t}Xu.prototype.render=Dh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=ga();Px(a,o,t,n,null,null)},Xu.prototype.unmount=Dh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Px(t.current,2,null,t,null,null),Tu(),n[Un]=null}};function Xu(t){this._internalRoot=t}Xu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Ni();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Mr.length&&n!==0&&n<Mr[a].priority;a++);Mr.splice(a,0,t),a===0&&kx(t)}};var Yx=e.version;if(Yx!=="19.2.3")throw Error(s(527,Yx,"19.2.3"));G.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var Yy={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yu.isDisabled&&Yu.supportsFiber)try{fe=Yu.inject(Yy),he=Yu}catch{}}return xc.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Jg,d=e0,v=t0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError)),n=Ix(t,1,!1,null,null,a,o,null,u,d,v,Xx),t[Un]=n.current,hh(t),new Dh(n)},xc.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Jg,v=e0,R=t0,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=Ix(t,1,!0,n,a??null,o,u,B,d,v,R,Xx),n.context=Ux(null),a=n.current,o=ga(),o=Za(o),u=cr(o),u.callback=null,ur(a,u,o),a=o,n.current.lanes=a,ct(n,a),os(n),t[Un]=n.current,hh(t),new Xu(n)},xc.version="19.2.3",xc}var n_;function aE(){if(n_)return Uh.exports;n_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Uh.exports=iE(),Uh.exports}var sE=aE();const xm="184",Sl={ROTATE:0,DOLLY:1,PAN:2},El={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rE=0,i_=1,oE=2,vf=1,lE=2,Rc=3,Fr=0,ra=1,Xs=2,Ws=0,Ml=1,a_=2,s_=3,r_=4,cE=5,go=100,uE=101,fE=102,dE=103,hE=104,pE=200,mE=201,gE=202,xE=203,Sp=204,Mp=205,_E=206,vE=207,bE=208,yE=209,EE=210,SE=211,ME=212,TE=213,AE=214,Tp=0,Ap=1,wp=2,Al=3,Rp=4,Cp=5,Np=6,Op=7,Iv=0,wE=1,RE=2,hs=0,Uv=1,Pv=2,Fv=3,Bv=4,zv=5,Gv=6,Hv=7,kv=300,bo=301,wl=302,bf=303,zh=304,Ff=306,Dp=1e3,Ys=1001,Lp=1002,Bi=1003,CE=1004,Wu=1005,Xi=1006,Gh=1007,_o=1008,Ha=1009,Vv=1010,jv=1011,Oc=1012,_m=1013,gs=1014,fs=1015,$s=1016,vm=1017,bm=1018,Dc=1020,Xv=35902,Yv=35899,Wv=1021,qv=1022,Ka=1023,Ks=1026,vo=1027,$v=1028,ym=1029,yo=1030,Em=1031,Sm=1033,yf=33776,Ef=33777,Sf=33778,Mf=33779,Ip=35840,Up=35841,Pp=35842,Fp=35843,Bp=36196,zp=37492,Gp=37496,Hp=37488,kp=37489,Nf=37490,Vp=37491,jp=37808,Xp=37809,Yp=37810,Wp=37811,qp=37812,$p=37813,Kp=37814,Zp=37815,Qp=37816,Jp=37817,em=37818,tm=37819,nm=37820,im=37821,am=36492,sm=36494,rm=36495,om=36283,lm=36284,Of=36285,cm=36286,NE=3200,o_=0,OE=1,Ir="",ba="srgb",Df="srgb-linear",Lf="linear",En="srgb",sl=7680,l_=519,DE=512,LE=513,IE=514,Mm=515,UE=516,PE=517,Tm=518,FE=519,c_=35044,u_="300 es",ds=2e3,If=2001;function BE(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Lc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zE(){const r=Lc("canvas");return r.style.display="block",r}const f_={};function d_(...r){const e="THREE."+r.shift();console.log(e,...r)}function Kv(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function At(...r){r=Kv(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function rn(...r){r=Kv(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function um(...r){const e=r.join(" ");e in f_||(f_[e]=!0,At(...r))}function GE(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const HE={[Tp]:Ap,[wp]:Np,[Rp]:Op,[Al]:Cp,[Ap]:Tp,[Np]:wp,[Op]:Rp,[Cp]:Al};class zr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const ki=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tf=Math.PI/180,fm=180/Math.PI;function Pc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(ki[r&255]+ki[r>>8&255]+ki[r>>16&255]+ki[r>>24&255]+"-"+ki[e&255]+ki[e>>8&255]+"-"+ki[e>>16&15|64]+ki[e>>24&255]+"-"+ki[i&63|128]+ki[i>>8&255]+"-"+ki[i>>16&255]+ki[i>>24&255]+ki[s&255]+ki[s>>8&255]+ki[s>>16&255]+ki[s>>24&255]).toLowerCase()}function $t(r,e,i){return Math.max(e,Math.min(i,r))}function kE(r,e){return(r%e+e)%e}function Hh(r,e,i){return(1-i)*r+i*e}function _c(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function aa(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const VE={DEG2RAD:Tf},Im=class Im{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=$t(this.x,e.x,i.x),this.y=$t(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=$t(this.x,e,i),this.y=$t(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar($t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos($t(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Im.prototype.isVector2=!0;let Xt=Im;class Br{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],_=s[l+2],b=s[l+3],g=c[f+0],y=c[f+1],T=c[f+2],C=c[f+3];if(b!==C||m!==g||p!==y||_!==T){let S=m*g+p*y+_*T+b*C;S<0&&(g=-g,y=-y,T=-T,C=-C,S=-S);let E=1-h;if(S<.9995){const N=Math.acos(S),U=Math.sin(N);E=Math.sin(E*N)/U,h=Math.sin(h*N)/U,m=m*E+g*h,p=p*E+y*h,_=_*E+T*h,b=b*E+C*h}else{m=m*E+g*h,p=p*E+y*h,_=_*E+T*h,b=b*E+C*h;const N=1/Math.sqrt(m*m+p*p+_*_+b*b);m*=N,p*=N,_*=N,b*=N}}e[i]=m,e[i+1]=p,e[i+2]=_,e[i+3]=b}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],_=s[l+3],b=c[f],g=c[f+1],y=c[f+2],T=c[f+3];return e[i]=h*T+_*b+m*y-p*g,e[i+1]=m*T+_*g+p*b-h*y,e[i+2]=p*T+_*y+h*g-m*b,e[i+3]=_*T-h*b-m*g-p*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),_=h(l/2),b=h(c/2),g=m(s/2),y=m(l/2),T=m(c/2);switch(f){case"XYZ":this._x=g*_*b+p*y*T,this._y=p*y*b-g*_*T,this._z=p*_*T+g*y*b,this._w=p*_*b-g*y*T;break;case"YXZ":this._x=g*_*b+p*y*T,this._y=p*y*b-g*_*T,this._z=p*_*T-g*y*b,this._w=p*_*b+g*y*T;break;case"ZXY":this._x=g*_*b-p*y*T,this._y=p*y*b+g*_*T,this._z=p*_*T+g*y*b,this._w=p*_*b-g*y*T;break;case"ZYX":this._x=g*_*b-p*y*T,this._y=p*y*b+g*_*T,this._z=p*_*T-g*y*b,this._w=p*_*b+g*y*T;break;case"YZX":this._x=g*_*b+p*y*T,this._y=p*y*b+g*_*T,this._z=p*_*T-g*y*b,this._w=p*_*b-g*y*T;break;case"XZY":this._x=g*_*b-p*y*T,this._y=p*y*b-g*_*T,this._z=p*_*T+g*y*b,this._w=p*_*b+g*y*T;break;default:At("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],_=i[6],b=i[10],g=s+h+b;if(g>0){const y=.5/Math.sqrt(g+1);this._w=.25/y,this._x=(_-m)*y,this._y=(c-p)*y,this._z=(f-l)*y}else if(s>h&&s>b){const y=2*Math.sqrt(1+s-h-b);this._w=(_-m)/y,this._x=.25*y,this._y=(l+f)/y,this._z=(c+p)/y}else if(h>b){const y=2*Math.sqrt(1+h-s-b);this._w=(c-p)/y,this._x=(l+f)/y,this._y=.25*y,this._z=(m+_)/y}else{const y=2*Math.sqrt(1+b-s-h);this._w=(f-l)/y,this._x=(c+p)/y,this._y=(m+_)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($t(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,_=i._w;return this._x=s*_+f*h+l*p-c*m,this._y=l*_+f*m+c*h-s*p,this._z=c*_+f*p+s*m-l*h,this._w=f*_-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),_=Math.sin(p);m=Math.sin(m*p)/_,i=Math.sin(i*p)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Um=class Um{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(h_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(h_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),_=2*(h*i-c*l),b=2*(c*s-f*i);return this.x=i+m*p+f*b-h*_,this.y=s+m*_+h*p-c*b,this.z=l+m*b+c*_-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=$t(this.x,e.x,i.x),this.y=$t(this.y,e.y,i.y),this.z=$t(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=$t(this.x,e,i),this.y=$t(this.y,e,i),this.z=$t(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar($t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return kh.copy(this).projectOnVector(e),this.sub(kh)}reflect(e){return this.sub(kh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos($t(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Um.prototype.isVector3=!0;let ne=Um;const kh=new ne,h_=new Br,Pm=class Pm{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],_=s[4],b=s[7],g=s[2],y=s[5],T=s[8],C=l[0],S=l[3],E=l[6],N=l[1],U=l[4],D=l[7],X=l[2],L=l[5],z=l[8];return c[0]=f*C+h*N+m*X,c[3]=f*S+h*U+m*L,c[6]=f*E+h*D+m*z,c[1]=p*C+_*N+b*X,c[4]=p*S+_*U+b*L,c[7]=p*E+_*D+b*z,c[2]=g*C+y*N+T*X,c[5]=g*S+y*U+T*L,c[8]=g*E+y*D+T*z,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8];return i*f*_-i*h*p-s*c*_+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],b=_*f-h*p,g=h*m-_*c,y=p*c-f*m,T=i*b+s*g+l*y;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=b*C,e[1]=(l*p-_*s)*C,e[2]=(h*s-l*f)*C,e[3]=g*C,e[4]=(_*i-l*m)*C,e[5]=(l*c-h*i)*C,e[6]=y*C,e[7]=(s*m-p*i)*C,e[8]=(f*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Vh.makeScale(e,i)),this}rotate(e){return this.premultiply(Vh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Vh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Pm.prototype.isMatrix3=!0;let Ut=Pm;const Vh=new Ut,p_=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),m_=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jE(){const r={enabled:!0,workingColorSpace:Df,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===En&&(l.r=qs(l.r),l.g=qs(l.g),l.b=qs(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===En&&(l.r=Tl(l.r),l.g=Tl(l.g),l.b=Tl(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ir?Lf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return um("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return um("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Df]:{primaries:e,whitePoint:s,transfer:Lf,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ba},outputColorSpaceConfig:{drawingBufferColorSpace:ba}},[ba]:{primaries:e,whitePoint:s,transfer:En,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ba}}}),r}const Jt=jE();function qs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Tl(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let rl;class XE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{rl===void 0&&(rl=Lc("canvas")),rl.width=e.width,rl.height=e.height;const l=rl.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=rl}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Lc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=qs(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(qs(i[s]/255)*255):i[s]=qs(i[s]);return{data:i,width:e.width,height:e.height}}else return At("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let YE=0;class Am{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:YE++}),this.uuid=Pc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(jh(l[f].image)):c.push(jh(l[f]))}else c=jh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function jh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?XE.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(At("Texture: Unable to serialize Texture."),{})}let WE=0;const Xh=new ne;class Yi extends zr{constructor(e=Yi.DEFAULT_IMAGE,i=Yi.DEFAULT_MAPPING,s=Ys,l=Ys,c=Xi,f=_o,h=Ka,m=Ha,p=Yi.DEFAULT_ANISOTROPY,_=Ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:WE++}),this.uuid=Pc(),this.name="",this.source=new Am(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Xh).x}get height(){return this.source.getSize(Xh).y}get depth(){return this.source.getSize(Xh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){At(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){At(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dp:e.x=e.x-Math.floor(e.x);break;case Ys:e.x=e.x<0?0:1;break;case Lp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dp:e.y=e.y-Math.floor(e.y);break;case Ys:e.y=e.y<0?0:1;break;case Lp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yi.DEFAULT_IMAGE=null;Yi.DEFAULT_MAPPING=kv;Yi.DEFAULT_ANISOTROPY=1;const Fm=class Fm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],_=m[4],b=m[8],g=m[1],y=m[5],T=m[9],C=m[2],S=m[6],E=m[10];if(Math.abs(_-g)<.01&&Math.abs(b-C)<.01&&Math.abs(T-S)<.01){if(Math.abs(_+g)<.1&&Math.abs(b+C)<.1&&Math.abs(T+S)<.1&&Math.abs(p+y+E-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(p+1)/2,D=(y+1)/2,X=(E+1)/2,L=(_+g)/4,z=(b+C)/4,w=(T+S)/4;return U>D&&U>X?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=L/s,c=z/s):D>X?D<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(D),s=L/l,c=w/l):X<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(X),s=z/c,l=w/c),this.set(s,l,c,i),this}let N=Math.sqrt((S-T)*(S-T)+(b-C)*(b-C)+(g-_)*(g-_));return Math.abs(N)<.001&&(N=1),this.x=(S-T)/N,this.y=(b-C)/N,this.z=(g-_)/N,this.w=Math.acos((p+y+E-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=$t(this.x,e.x,i.x),this.y=$t(this.y,e.y,i.y),this.z=$t(this.z,e.z,i.z),this.w=$t(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=$t(this.x,e,i),this.y=$t(this.y,e,i),this.z=$t(this.z,e,i),this.w=$t(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar($t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Fm.prototype.isVector4=!0;let li=Fm;class qE extends zr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new li(0,0,e,i),this.scissorTest=!1,this.viewport=new li(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new Yi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Am(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends qE{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class Zv extends Yi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $E extends Yi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pf=class Pf{constructor(e,i,s,l,c,f,h,m,p,_,b,g,y,T,C,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,_,b,g,y,T,C,S)}set(e,i,s,l,c,f,h,m,p,_,b,g,y,T,C,S){const E=this.elements;return E[0]=e,E[4]=i,E[8]=s,E[12]=l,E[1]=c,E[5]=f,E[9]=h,E[13]=m,E[2]=p,E[6]=_,E[10]=b,E[14]=g,E[3]=y,E[7]=T,E[11]=C,E[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pf().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/ol.setFromMatrixColumn(e,0).length(),c=1/ol.setFromMatrixColumn(e,1).length(),f=1/ol.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),b=Math.sin(c);if(e.order==="XYZ"){const g=f*_,y=f*b,T=h*_,C=h*b;i[0]=m*_,i[4]=-m*b,i[8]=p,i[1]=y+T*p,i[5]=g-C*p,i[9]=-h*m,i[2]=C-g*p,i[6]=T+y*p,i[10]=f*m}else if(e.order==="YXZ"){const g=m*_,y=m*b,T=p*_,C=p*b;i[0]=g+C*h,i[4]=T*h-y,i[8]=f*p,i[1]=f*b,i[5]=f*_,i[9]=-h,i[2]=y*h-T,i[6]=C+g*h,i[10]=f*m}else if(e.order==="ZXY"){const g=m*_,y=m*b,T=p*_,C=p*b;i[0]=g-C*h,i[4]=-f*b,i[8]=T+y*h,i[1]=y+T*h,i[5]=f*_,i[9]=C-g*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const g=f*_,y=f*b,T=h*_,C=h*b;i[0]=m*_,i[4]=T*p-y,i[8]=g*p+C,i[1]=m*b,i[5]=C*p+g,i[9]=y*p-T,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,y=f*p,T=h*m,C=h*p;i[0]=m*_,i[4]=C-g*b,i[8]=T*b+y,i[1]=b,i[5]=f*_,i[9]=-h*_,i[2]=-p*_,i[6]=y*b+T,i[10]=g-C*b}else if(e.order==="XZY"){const g=f*m,y=f*p,T=h*m,C=h*p;i[0]=m*_,i[4]=-b,i[8]=p*_,i[1]=g*b+C,i[5]=f*_,i[9]=y*b-T,i[2]=T*b-y,i[6]=h*_,i[10]=C*b+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(KE,e,ZE)}lookAt(e,i,s){const l=this.elements;return xa.subVectors(e,i),xa.lengthSq()===0&&(xa.z=1),xa.normalize(),Ar.crossVectors(s,xa),Ar.lengthSq()===0&&(Math.abs(s.z)===1?xa.x+=1e-4:xa.z+=1e-4,xa.normalize(),Ar.crossVectors(s,xa)),Ar.normalize(),qu.crossVectors(xa,Ar),l[0]=Ar.x,l[4]=qu.x,l[8]=xa.x,l[1]=Ar.y,l[5]=qu.y,l[9]=xa.y,l[2]=Ar.z,l[6]=qu.z,l[10]=xa.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],_=s[1],b=s[5],g=s[9],y=s[13],T=s[2],C=s[6],S=s[10],E=s[14],N=s[3],U=s[7],D=s[11],X=s[15],L=l[0],z=l[4],w=l[8],F=l[12],$=l[1],k=l[5],W=l[9],de=l[13],se=l[2],Y=l[6],I=l[10],G=l[14],ee=l[3],me=l[7],Ae=l[11],P=l[15];return c[0]=f*L+h*$+m*se+p*ee,c[4]=f*z+h*k+m*Y+p*me,c[8]=f*w+h*W+m*I+p*Ae,c[12]=f*F+h*de+m*G+p*P,c[1]=_*L+b*$+g*se+y*ee,c[5]=_*z+b*k+g*Y+y*me,c[9]=_*w+b*W+g*I+y*Ae,c[13]=_*F+b*de+g*G+y*P,c[2]=T*L+C*$+S*se+E*ee,c[6]=T*z+C*k+S*Y+E*me,c[10]=T*w+C*W+S*I+E*Ae,c[14]=T*F+C*de+S*G+E*P,c[3]=N*L+U*$+D*se+X*ee,c[7]=N*z+U*k+D*Y+X*me,c[11]=N*w+U*W+D*I+X*Ae,c[15]=N*F+U*de+D*G+X*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],_=e[2],b=e[6],g=e[10],y=e[14],T=e[3],C=e[7],S=e[11],E=e[15],N=m*y-p*g,U=h*y-p*b,D=h*g-m*b,X=f*y-p*_,L=f*g-m*_,z=f*b-h*_;return i*(C*N-S*U+E*D)-s*(T*N-S*X+E*L)+l*(T*U-C*X+E*z)-c*(T*D-C*L+S*z)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],b=e[9],g=e[10],y=e[11],T=e[12],C=e[13],S=e[14],E=e[15],N=i*h-s*f,U=i*m-l*f,D=i*p-c*f,X=s*m-l*h,L=s*p-c*h,z=l*p-c*m,w=_*C-b*T,F=_*S-g*T,$=_*E-y*T,k=b*S-g*C,W=b*E-y*C,de=g*E-y*S,se=N*de-U*W+D*k+X*$-L*F+z*w;if(se===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/se;return e[0]=(h*de-m*W+p*k)*Y,e[1]=(l*W-s*de-c*k)*Y,e[2]=(C*z-S*L+E*X)*Y,e[3]=(g*L-b*z-y*X)*Y,e[4]=(m*$-f*de-p*F)*Y,e[5]=(i*de-l*$+c*F)*Y,e[6]=(S*D-T*z-E*U)*Y,e[7]=(_*z-g*D+y*U)*Y,e[8]=(f*W-h*$+p*w)*Y,e[9]=(s*$-i*W-c*w)*Y,e[10]=(T*L-C*D+E*N)*Y,e[11]=(b*D-_*L-y*N)*Y,e[12]=(h*F-f*k-m*w)*Y,e[13]=(i*k-s*F+l*w)*Y,e[14]=(C*U-T*X-S*N)*Y,e[15]=(_*X-b*U+g*N)*Y,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,_=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,_*h+s,_*m-l*f,0,p*m-l*h,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,_=f+f,b=h+h,g=c*p,y=c*_,T=c*b,C=f*_,S=f*b,E=h*b,N=m*p,U=m*_,D=m*b,X=s.x,L=s.y,z=s.z;return l[0]=(1-(C+E))*X,l[1]=(y+D)*X,l[2]=(T-U)*X,l[3]=0,l[4]=(y-D)*L,l[5]=(1-(g+E))*L,l[6]=(S+N)*L,l[7]=0,l[8]=(T+U)*z,l[9]=(S-N)*z,l[10]=(1-(g+C))*z,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=ol.set(l[0],l[1],l[2]).length();const h=ol.set(l[4],l[5],l[6]).length(),m=ol.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Ya.copy(this);const p=1/f,_=1/h,b=1/m;return Ya.elements[0]*=p,Ya.elements[1]*=p,Ya.elements[2]*=p,Ya.elements[4]*=_,Ya.elements[5]*=_,Ya.elements[6]*=_,Ya.elements[8]*=b,Ya.elements[9]*=b,Ya.elements[10]*=b,i.setFromRotationMatrix(Ya),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=ds,m=!1){const p=this.elements,_=2*c/(i-e),b=2*c/(s-l),g=(i+e)/(i-e),y=(s+l)/(s-l);let T,C;if(m)T=c/(f-c),C=f*c/(f-c);else if(h===ds)T=-(f+c)/(f-c),C=-2*f*c/(f-c);else if(h===If)T=-f/(f-c),C=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=b,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=C,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=ds,m=!1){const p=this.elements,_=2/(i-e),b=2/(s-l),g=-(i+e)/(i-e),y=-(s+l)/(s-l);let T,C;if(m)T=1/(f-c),C=f/(f-c);else if(h===ds)T=-2/(f-c),C=-(f+c)/(f-c);else if(h===If)T=-1/(f-c),C=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=b,p[9]=0,p[13]=y,p[2]=0,p[6]=0,p[10]=T,p[14]=C,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};Pf.prototype.isMatrix4=!0;let vi=Pf;const ol=new ne,Ya=new vi,KE=new ne(0,0,0),ZE=new ne(1,1,1),Ar=new ne,qu=new ne,xa=new ne,g_=new vi,x_=new Br;class Eo{constructor(e=0,i=0,s=0,l=Eo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],_=l[9],b=l[2],g=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin($t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,y),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,y),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-b,c),this._z=0);break;case"ZXY":this._x=Math.asin($t(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-b,y),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-$t(b,-1,1)),Math.abs(b)<.9999999?(this._x=Math.atan2(g,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin($t(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-b,c)):(this._x=0,this._y=Math.atan2(h,y));break;case"XZY":this._z=Math.asin(-$t(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,y),this._y=0);break;default:At("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return g_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(g_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return x_.setFromEuler(this),this.setFromQuaternion(x_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Eo.DEFAULT_ORDER="XYZ";class Qv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let QE=0;const __=new ne,ll=new Br,Gs=new vi,$u=new ne,vc=new ne,JE=new ne,eS=new Br,v_=new ne(1,0,0),b_=new ne(0,1,0),y_=new ne(0,0,1),E_={type:"added"},tS={type:"removed"},cl={type:"childadded",child:null},Yh={type:"childremoved",child:null};class ya extends zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=Pc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ya.DEFAULT_UP.clone();const e=new ne,i=new Eo,s=new Br,l=new ne(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new vi},normalMatrix:{value:new Ut}}),this.matrix=new vi,this.matrixWorld=new vi,this.matrixAutoUpdate=ya.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ya.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return ll.setFromAxisAngle(e,i),this.quaternion.multiply(ll),this}rotateOnWorldAxis(e,i){return ll.setFromAxisAngle(e,i),this.quaternion.premultiply(ll),this}rotateX(e){return this.rotateOnAxis(v_,e)}rotateY(e){return this.rotateOnAxis(b_,e)}rotateZ(e){return this.rotateOnAxis(y_,e)}translateOnAxis(e,i){return __.copy(e).applyQuaternion(this.quaternion),this.position.add(__.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(v_,e)}translateY(e){return this.translateOnAxis(b_,e)}translateZ(e){return this.translateOnAxis(y_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gs.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?$u.copy(e):$u.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),vc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gs.lookAt(vc,$u,this.up):Gs.lookAt($u,vc,this.up),this.quaternion.setFromRotationMatrix(Gs),l&&(Gs.extractRotation(l.matrixWorld),ll.setFromRotationMatrix(Gs),this.quaternion.premultiply(ll.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(rn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(E_),cl.child=e,this.dispatchEvent(cl),cl.child=null):rn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(tS),Yh.child=e,this.dispatchEvent(Yh),Yh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gs.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(E_),cl.child=e,this.dispatchEvent(cl),cl.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vc,e,JE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vc,eS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const b=m[p];c(e.shapes,b)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),_=f(e.images),b=f(e.shapes),g=f(e.skeletons),y=f(e.animations),T=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),b.length>0&&(s.shapes=b),g.length>0&&(s.skeletons=g),y.length>0&&(s.animations=y),T.length>0&&(s.nodes=T)}return s.object=l,s;function f(h){const m=[];for(const p in h){const _=h[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}ya.DEFAULT_UP=new ne(0,1,0);ya.DEFAULT_MATRIX_AUTO_UPDATE=!0;ya.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ku extends ya{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nS={type:"move"};class Wh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ku,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ku,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ne,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ne),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ku,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ne,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ne,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const C of e.hand.values()){const S=i.getJointPose(C,s),E=this._getHandJoint(p,C);S!==null&&(E.matrix.fromArray(S.transform.matrix),E.matrix.decompose(E.position,E.rotation,E.scale),E.matrixWorldNeedsUpdate=!0,E.jointRadius=S.radius),E.visible=S!==null}const _=p.joints["index-finger-tip"],b=p.joints["thumb-tip"],g=_.position.distanceTo(b.position),y=.02,T=.005;p.inputState.pinching&&g>y+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=y-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(nS)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Ku;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const Jv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wr={h:0,s:0,l:0},Zu={h:0,s:0,l:0};function qh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class Cn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ba){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Jt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Jt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Jt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Jt.workingColorSpace){if(e=kE(e,1),i=$t(i,0,1),s=$t(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=qh(f,c,e+1/3),this.g=qh(f,c,e),this.b=qh(f,c,e-1/3)}return Jt.colorSpaceToWorking(this,l),this}setStyle(e,i=ba){function s(c){c!==void 0&&parseFloat(c)<1&&At("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:At("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);At("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ba){const s=Jv[e.toLowerCase()];return s!==void 0?this.setHex(s,i):At("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}copyLinearToSRGB(e){return this.r=Tl(e.r),this.g=Tl(e.g),this.b=Tl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ba){return Jt.workingToColorSpace(Vi.copy(this),e),Math.round($t(Vi.r*255,0,255))*65536+Math.round($t(Vi.g*255,0,255))*256+Math.round($t(Vi.b*255,0,255))}getHexString(e=ba){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Jt.workingColorSpace){Jt.workingToColorSpace(Vi.copy(this),i);const s=Vi.r,l=Vi.g,c=Vi.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const _=(h+f)/2;if(h===f)m=0,p=0;else{const b=f-h;switch(p=_<=.5?b/(f+h):b/(2-f-h),f){case s:m=(l-c)/b+(l<c?6:0);break;case l:m=(c-s)/b+2;break;case c:m=(s-l)/b+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,i=Jt.workingColorSpace){return Jt.workingToColorSpace(Vi.copy(this),i),e.r=Vi.r,e.g=Vi.g,e.b=Vi.b,e}getStyle(e=ba){Jt.workingToColorSpace(Vi.copy(this),e);const i=Vi.r,s=Vi.g,l=Vi.b;return e!==ba?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(wr),this.setHSL(wr.h+e,wr.s+i,wr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(wr),e.getHSL(Zu);const s=Hh(wr.h,Zu.h,i),l=Hh(wr.s,Zu.s,i),c=Hh(wr.l,Zu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vi=new Cn;Cn.NAMES=Jv;class iS extends ya{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Eo,this.environmentIntensity=1,this.environmentRotation=new Eo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Wa=new ne,Hs=new ne,$h=new ne,ks=new ne,ul=new ne,fl=new ne,S_=new ne,Kh=new ne,Zh=new ne,Qh=new ne,Jh=new li,ep=new li,tp=new li;class $a{constructor(e=new ne,i=new ne,s=new ne){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Wa.subVectors(e,i),l.cross(Wa);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Wa.subVectors(l,i),Hs.subVectors(s,i),$h.subVectors(e,i);const f=Wa.dot(Wa),h=Wa.dot(Hs),m=Wa.dot($h),p=Hs.dot(Hs),_=Hs.dot($h),b=f*p-h*h;if(b===0)return c.set(0,0,0),null;const g=1/b,y=(p*m-h*_)*g,T=(f*_-h*m)*g;return c.set(1-y-T,T,y)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,ks)===null?!1:ks.x>=0&&ks.y>=0&&ks.x+ks.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,ks)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ks.x),m.addScaledVector(f,ks.y),m.addScaledVector(h,ks.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return Jh.setScalar(0),ep.setScalar(0),tp.setScalar(0),Jh.fromBufferAttribute(e,i),ep.fromBufferAttribute(e,s),tp.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Jh,c.x),f.addScaledVector(ep,c.y),f.addScaledVector(tp,c.z),f}static isFrontFacing(e,i,s,l){return Wa.subVectors(s,i),Hs.subVectors(e,i),Wa.cross(Hs).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wa.subVectors(this.c,this.b),Hs.subVectors(this.a,this.b),Wa.cross(Hs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return $a.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return $a.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return $a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;ul.subVectors(l,s),fl.subVectors(c,s),Kh.subVectors(e,s);const m=ul.dot(Kh),p=fl.dot(Kh);if(m<=0&&p<=0)return i.copy(s);Zh.subVectors(e,l);const _=ul.dot(Zh),b=fl.dot(Zh);if(_>=0&&b<=_)return i.copy(l);const g=m*b-_*p;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(ul,f);Qh.subVectors(e,c);const y=ul.dot(Qh),T=fl.dot(Qh);if(T>=0&&y<=T)return i.copy(c);const C=y*p-m*T;if(C<=0&&p>=0&&T<=0)return h=p/(p-T),i.copy(s).addScaledVector(fl,h);const S=_*T-y*b;if(S<=0&&b-_>=0&&y-T>=0)return S_.subVectors(c,l),h=(b-_)/(b-_+(y-T)),i.copy(l).addScaledVector(S_,h);const E=1/(S+C+g);return f=C*E,h=g*E,i.copy(s).addScaledVector(ul,f).addScaledVector(fl,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fc{constructor(e=new ne(1/0,1/0,1/0),i=new ne(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(qa.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(qa.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=qa.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,qa):qa.fromBufferAttribute(c,f),qa.applyMatrix4(e.matrixWorld),this.expandByPoint(qa);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Qu.copy(s.boundingBox)),Qu.applyMatrix4(e.matrixWorld),this.union(Qu)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qa),qa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bc),Ju.subVectors(this.max,bc),dl.subVectors(e.a,bc),hl.subVectors(e.b,bc),pl.subVectors(e.c,bc),Rr.subVectors(hl,dl),Cr.subVectors(pl,hl),co.subVectors(dl,pl);let i=[0,-Rr.z,Rr.y,0,-Cr.z,Cr.y,0,-co.z,co.y,Rr.z,0,-Rr.x,Cr.z,0,-Cr.x,co.z,0,-co.x,-Rr.y,Rr.x,0,-Cr.y,Cr.x,0,-co.y,co.x,0];return!np(i,dl,hl,pl,Ju)||(i=[1,0,0,0,1,0,0,0,1],!np(i,dl,hl,pl,Ju))?!1:(ef.crossVectors(Rr,Cr),i=[ef.x,ef.y,ef.z],np(i,dl,hl,pl,Ju))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vs=[new ne,new ne,new ne,new ne,new ne,new ne,new ne,new ne],qa=new ne,Qu=new Fc,dl=new ne,hl=new ne,pl=new ne,Rr=new ne,Cr=new ne,co=new ne,bc=new ne,Ju=new ne,ef=new ne,uo=new ne;function np(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){uo.fromArray(r,c);const h=l.x*Math.abs(uo.x)+l.y*Math.abs(uo.y)+l.z*Math.abs(uo.z),m=e.dot(uo),p=i.dot(uo),_=s.dot(uo);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>h)return!1}return!0}const mi=new ne,tf=new Xt;let aS=0;class ms extends zr{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:aS++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=c_,this.updateRanges=[],this.gpuType=fs,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)tf.fromBufferAttribute(this,i),tf.applyMatrix3(e),this.setXY(i,tf.x,tf.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)mi.fromBufferAttribute(this,i),mi.applyMatrix3(e),this.setXYZ(i,mi.x,mi.y,mi.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)mi.fromBufferAttribute(this,i),mi.applyMatrix4(e),this.setXYZ(i,mi.x,mi.y,mi.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)mi.fromBufferAttribute(this,i),mi.applyNormalMatrix(e),this.setXYZ(i,mi.x,mi.y,mi.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)mi.fromBufferAttribute(this,i),mi.transformDirection(e),this.setXYZ(i,mi.x,mi.y,mi.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=_c(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=aa(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=_c(i,this.array)),i}setX(e,i){return this.normalized&&(i=aa(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=_c(i,this.array)),i}setY(e,i){return this.normalized&&(i=aa(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=_c(i,this.array)),i}setZ(e,i){return this.normalized&&(i=aa(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=_c(i,this.array)),i}setW(e,i){return this.normalized&&(i=aa(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=aa(i,this.array),s=aa(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=aa(i,this.array),s=aa(s,this.array),l=aa(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=aa(i,this.array),s=aa(s,this.array),l=aa(l,this.array),c=aa(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==c_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class eb extends ms{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class tb extends ms{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class ka extends ms{constructor(e,i,s){super(new Float32Array(e),i,s)}}const sS=new Fc,yc=new ne,ip=new ne;class wm{constructor(e=new ne,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):sS.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yc.subVectors(e,this.center);const i=yc.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(yc,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ip.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yc.copy(e.center).add(ip)),this.expandByPoint(yc.copy(e.center).sub(ip))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let rS=0;const Ba=new vi,ap=new ya,ml=new ne,_a=new Fc,Ec=new Fc,Ci=new ne;class vs extends zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rS++}),this.uuid=Pc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(BE(e)?tb:eb)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new Ut().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ba.makeRotationFromQuaternion(e),this.applyMatrix4(Ba),this}rotateX(e){return Ba.makeRotationX(e),this.applyMatrix4(Ba),this}rotateY(e){return Ba.makeRotationY(e),this.applyMatrix4(Ba),this}rotateZ(e){return Ba.makeRotationZ(e),this.applyMatrix4(Ba),this}translate(e,i,s){return Ba.makeTranslation(e,i,s),this.applyMatrix4(Ba),this}scale(e,i,s){return Ba.makeScale(e,i,s),this.applyMatrix4(Ba),this}lookAt(e){return ap.lookAt(e),ap.updateMatrix(),this.applyMatrix4(ap.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ml).negate(),this.translate(ml.x,ml.y,ml.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new ka(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&At("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ne(-1/0,-1/0,-1/0),new ne(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];_a.setFromBufferAttribute(c),this.morphTargetsRelative?(Ci.addVectors(this.boundingBox.min,_a.min),this.boundingBox.expandByPoint(Ci),Ci.addVectors(this.boundingBox.max,_a.max),this.boundingBox.expandByPoint(Ci)):(this.boundingBox.expandByPoint(_a.min),this.boundingBox.expandByPoint(_a.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ne,1/0);return}if(e){const s=this.boundingSphere.center;if(_a.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];Ec.setFromBufferAttribute(h),this.morphTargetsRelative?(Ci.addVectors(_a.min,Ec.min),_a.expandByPoint(Ci),Ci.addVectors(_a.max,Ec.max),_a.expandByPoint(Ci)):(_a.expandByPoint(Ec.min),_a.expandByPoint(Ec.max))}_a.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)Ci.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Ci));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,_=h.count;p<_;p++)Ci.fromBufferAttribute(h,p),m&&(ml.fromBufferAttribute(e,p),Ci.add(ml)),l=Math.max(l,s.distanceToSquared(Ci))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&rn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){rn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ms(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let w=0;w<s.count;w++)h[w]=new ne,m[w]=new ne;const p=new ne,_=new ne,b=new ne,g=new Xt,y=new Xt,T=new Xt,C=new ne,S=new ne;function E(w,F,$){p.fromBufferAttribute(s,w),_.fromBufferAttribute(s,F),b.fromBufferAttribute(s,$),g.fromBufferAttribute(c,w),y.fromBufferAttribute(c,F),T.fromBufferAttribute(c,$),_.sub(p),b.sub(p),y.sub(g),T.sub(g);const k=1/(y.x*T.y-T.x*y.y);isFinite(k)&&(C.copy(_).multiplyScalar(T.y).addScaledVector(b,-y.y).multiplyScalar(k),S.copy(b).multiplyScalar(y.x).addScaledVector(_,-T.x).multiplyScalar(k),h[w].add(C),h[F].add(C),h[$].add(C),m[w].add(S),m[F].add(S),m[$].add(S))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let w=0,F=N.length;w<F;++w){const $=N[w],k=$.start,W=$.count;for(let de=k,se=k+W;de<se;de+=3)E(e.getX(de+0),e.getX(de+1),e.getX(de+2))}const U=new ne,D=new ne,X=new ne,L=new ne;function z(w){X.fromBufferAttribute(l,w),L.copy(X);const F=h[w];U.copy(F),U.sub(X.multiplyScalar(X.dot(F))).normalize(),D.crossVectors(L,F);const k=D.dot(m[w])<0?-1:1;f.setXYZW(w,U.x,U.y,U.z,k)}for(let w=0,F=N.length;w<F;++w){const $=N[w],k=$.start,W=$.count;for(let de=k,se=k+W;de<se;de+=3)z(e.getX(de+0)),z(e.getX(de+1)),z(e.getX(de+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ms(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,y=s.count;g<y;g++)s.setXYZ(g,0,0,0);const l=new ne,c=new ne,f=new ne,h=new ne,m=new ne,p=new ne,_=new ne,b=new ne;if(e)for(let g=0,y=e.count;g<y;g+=3){const T=e.getX(g+0),C=e.getX(g+1),S=e.getX(g+2);l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,S),_.subVectors(f,c),b.subVectors(l,c),_.cross(b),h.fromBufferAttribute(s,T),m.fromBufferAttribute(s,C),p.fromBufferAttribute(s,S),h.add(_),m.add(_),p.add(_),s.setXYZ(T,h.x,h.y,h.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let g=0,y=i.count;g<y;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),b.subVectors(l,c),_.cross(b),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Ci.fromBufferAttribute(e,i),Ci.normalize(),e.setXYZ(i,Ci.x,Ci.y,Ci.z)}toNonIndexed(){function e(h,m){const p=h.array,_=h.itemSize,b=h.normalized,g=new p.constructor(m.length*_);let y=0,T=0;for(let C=0,S=m.length;C<S;C++){h.isInterleavedBufferAttribute?y=m[C]*h.data.stride+h.offset:y=m[C]*_;for(let E=0;E<_;E++)g[T++]=p[y++]}return new ms(g,_,b)}if(this.index===null)return At("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new vs,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let _=0,b=p.length;_<b;_++){const g=p[_],y=e(g,s);m.push(y)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let b=0,g=p.length;b<g;b++){const y=p[b];_.push(y.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(i))}const c=e.morphAttributes;for(const p in c){const _=[],b=c[p];for(let g=0,y=b.length;g<y;g++)_.push(b[g].clone(i));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,_=f.length;p<_;p++){const b=f[p];this.addGroup(b.start,b.count,b.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let oS=0;class Bf extends zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oS++}),this.uuid=Pc(),this.name="",this.type="Material",this.blending=Ml,this.side=Fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sp,this.blendDst=Mp,this.blendEquation=go,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Cn(0,0,0),this.blendAlpha=0,this.depthFunc=Al,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sl,this.stencilZFail=sl,this.stencilZPass=sl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){At(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){At(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Ml&&(s.blending=this.blending),this.side!==Fr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Sp&&(s.blendSrc=this.blendSrc),this.blendDst!==Mp&&(s.blendDst=this.blendDst),this.blendEquation!==go&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Al&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==l_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sl&&(s.stencilFail=this.stencilFail),this.stencilZFail!==sl&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==sl&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const js=new ne,sp=new ne,nf=new ne,Nr=new ne,rp=new ne,af=new ne,op=new ne;class nb{constructor(e=new ne,i=new ne(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,js)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=js.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(js.copy(this.origin).addScaledVector(this.direction,i),js.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){sp.copy(e).add(i).multiplyScalar(.5),nf.copy(i).sub(e).normalize(),Nr.copy(this.origin).sub(sp);const c=e.distanceTo(i)*.5,f=-this.direction.dot(nf),h=Nr.dot(this.direction),m=-Nr.dot(nf),p=Nr.lengthSq(),_=Math.abs(1-f*f);let b,g,y,T;if(_>0)if(b=f*m-h,g=f*h-m,T=c*_,b>=0)if(g>=-T)if(g<=T){const C=1/_;b*=C,g*=C,y=b*(b+f*g+2*h)+g*(f*b+g+2*m)+p}else g=c,b=Math.max(0,-(f*g+h)),y=-b*b+g*(g+2*m)+p;else g=-c,b=Math.max(0,-(f*g+h)),y=-b*b+g*(g+2*m)+p;else g<=-T?(b=Math.max(0,-(-f*c+h)),g=b>0?-c:Math.min(Math.max(-c,-m),c),y=-b*b+g*(g+2*m)+p):g<=T?(b=0,g=Math.min(Math.max(-c,-m),c),y=g*(g+2*m)+p):(b=Math.max(0,-(f*c+h)),g=b>0?c:Math.min(Math.max(-c,-m),c),y=-b*b+g*(g+2*m)+p);else g=f>0?-c:c,b=Math.max(0,-(f*g+h)),y=-b*b+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,b),l&&l.copy(sp).addScaledVector(nf,g),y}intersectSphere(e,i){js.subVectors(e.center,this.origin);const s=js.dot(this.direction),l=js.dot(js)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,_=1/this.direction.y,b=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),_>=0?(c=(e.min.y-g.y)*_,f=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,f=(e.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),b>=0?(h=(e.min.z-g.z)*b,m=(e.max.z-g.z)*b):(h=(e.max.z-g.z)*b,m=(e.min.z-g.z)*b),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,js)!==null}intersectTriangle(e,i,s,l,c){rp.subVectors(i,e),af.subVectors(s,e),op.crossVectors(rp,af);let f=this.direction.dot(op),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Nr.subVectors(this.origin,e);const m=h*this.direction.dot(af.crossVectors(Nr,af));if(m<0)return null;const p=h*this.direction.dot(rp.cross(Nr));if(p<0||m+p>f)return null;const _=-h*Nr.dot(op);return _<0?null:this.at(_/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rm extends Bf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Cn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Eo,this.combine=Iv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const M_=new vi,fo=new nb,sf=new wm,T_=new ne,rf=new ne,of=new ne,lf=new ne,lp=new ne,cf=new ne,A_=new ne,uf=new ne;class xs extends ya{constructor(e=new vs,i=new Rm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){cf.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=h[m],b=c[m];_!==0&&(lp.fromBufferAttribute(b,e),f?cf.addScaledVector(lp,_):cf.addScaledVector(lp.sub(i),_))}i.add(cf)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),sf.copy(s.boundingSphere),sf.applyMatrix4(c),fo.copy(e.ray).recast(e.near),!(sf.containsPoint(fo.origin)===!1&&(fo.intersectSphere(sf,T_)===null||fo.origin.distanceToSquared(T_)>(e.far-e.near)**2))&&(M_.copy(c).invert(),fo.copy(e.ray).applyMatrix4(M_),!(s.boundingBox!==null&&fo.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,fo)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,b=c.attributes.normal,g=c.groups,y=c.drawRange;if(h!==null)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const S=g[T],E=f[S.materialIndex],N=Math.max(S.start,y.start),U=Math.min(h.count,Math.min(S.start+S.count,y.start+y.count));for(let D=N,X=U;D<X;D+=3){const L=h.getX(D),z=h.getX(D+1),w=h.getX(D+2);l=ff(this,E,e,s,p,_,b,L,z,w),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const T=Math.max(0,y.start),C=Math.min(h.count,y.start+y.count);for(let S=T,E=C;S<E;S+=3){const N=h.getX(S),U=h.getX(S+1),D=h.getX(S+2);l=ff(this,f,e,s,p,_,b,N,U,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,C=g.length;T<C;T++){const S=g[T],E=f[S.materialIndex],N=Math.max(S.start,y.start),U=Math.min(m.count,Math.min(S.start+S.count,y.start+y.count));for(let D=N,X=U;D<X;D+=3){const L=D,z=D+1,w=D+2;l=ff(this,E,e,s,p,_,b,L,z,w),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const T=Math.max(0,y.start),C=Math.min(m.count,y.start+y.count);for(let S=T,E=C;S<E;S+=3){const N=S,U=S+1,D=S+2;l=ff(this,f,e,s,p,_,b,N,U,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function lS(r,e,i,s,l,c,f,h){let m;if(e.side===ra?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===Fr,h),m===null)return null;uf.copy(h),uf.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(uf);return p<i.near||p>i.far?null:{distance:p,point:uf.clone(),object:r}}function ff(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,rf),r.getVertexPosition(m,of),r.getVertexPosition(p,lf);const _=lS(r,e,i,s,rf,of,lf,A_);if(_){const b=new ne;$a.getBarycoord(A_,rf,of,lf,b),l&&(_.uv=$a.getInterpolatedAttribute(l,h,m,p,b,new Xt)),c&&(_.uv1=$a.getInterpolatedAttribute(c,h,m,p,b,new Xt)),f&&(_.normal=$a.getInterpolatedAttribute(f,h,m,p,b,new ne),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new ne,materialIndex:0};$a.getNormal(rf,of,lf,g.normal),_.face=g,_.barycoord=b}return _}class cS extends Yi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=Bi,_=Bi,b,g){super(null,f,h,m,p,_,l,c,b,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cp=new ne,uS=new ne,fS=new Ut;class Dr{constructor(e=new ne(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=cp.subVectors(s,i).cross(uS.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(cp),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||fS.getNormalMatrix(e),l=this.coplanarPoint(cp).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ho=new wm,dS=new Xt(.5,.5),df=new ne;class ib{constructor(e=new Dr,i=new Dr,s=new Dr,l=new Dr,c=new Dr,f=new Dr){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=ds,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],_=c[4],b=c[5],g=c[6],y=c[7],T=c[8],C=c[9],S=c[10],E=c[11],N=c[12],U=c[13],D=c[14],X=c[15];if(l[0].setComponents(p-f,y-_,E-T,X-N).normalize(),l[1].setComponents(p+f,y+_,E+T,X+N).normalize(),l[2].setComponents(p+h,y+b,E+C,X+U).normalize(),l[3].setComponents(p-h,y-b,E-C,X-U).normalize(),s)l[4].setComponents(m,g,S,D).normalize(),l[5].setComponents(p-m,y-g,E-S,X-D).normalize();else if(l[4].setComponents(p-m,y-g,E-S,X-D).normalize(),i===ds)l[5].setComponents(p+m,y+g,E+S,X+D).normalize();else if(i===If)l[5].setComponents(m,g,S,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ho.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ho.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ho)}intersectsSprite(e){ho.center.set(0,0,0);const i=dS.distanceTo(e.center);return ho.radius=.7071067811865476+i,ho.applyMatrix4(e.matrixWorld),this.intersectsSphere(ho)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(df.x=l.normal.x>0?e.max.x:e.min.x,df.y=l.normal.y>0?e.max.y:e.min.y,df.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(df)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ab extends Yi{constructor(e=[],i=bo,s,l,c,f,h,m,p,_){super(e,i,s,l,c,f,h,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rl extends Yi{constructor(e,i,s=gs,l,c,f,h=Bi,m=Bi,p,_=Ks,b=1){if(_!==Ks&&_!==vo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:b};super(g,l,c,f,h,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Am(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class hS extends Rl{constructor(e,i=gs,s=bo,l,c,f=Bi,h=Bi,m,p=Ks){const _={width:e,height:e,depth:1},b=[_,_,_,_,_,_];super(e,e,i,s,l,c,f,h,m,p),this.image=b,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class sb extends Yi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bc extends vs{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],_=[],b=[];let g=0,y=0;T("z","y","x",-1,-1,s,i,e,f,c,0),T("z","y","x",1,-1,s,i,-e,f,c,1),T("x","z","y",1,1,e,s,i,l,f,2),T("x","z","y",1,-1,e,s,-i,l,f,3),T("x","y","z",1,-1,e,i,s,l,c,4),T("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new ka(p,3)),this.setAttribute("normal",new ka(_,3)),this.setAttribute("uv",new ka(b,2));function T(C,S,E,N,U,D,X,L,z,w,F){const $=D/z,k=X/w,W=D/2,de=X/2,se=L/2,Y=z+1,I=w+1;let G=0,ee=0;const me=new ne;for(let Ae=0;Ae<I;Ae++){const P=Ae*k-de;for(let J=0;J<Y;J++){const Te=J*$-W;me[C]=Te*N,me[S]=P*U,me[E]=se,p.push(me.x,me.y,me.z),me[C]=0,me[S]=0,me[E]=L>0?1:-1,_.push(me.x,me.y,me.z),b.push(J/z),b.push(1-Ae/w),G+=1}}for(let Ae=0;Ae<w;Ae++)for(let P=0;P<z;P++){const J=g+P+Y*Ae,Te=g+P+Y*(Ae+1),De=g+(P+1)+Y*(Ae+1),Pe=g+(P+1)+Y*Ae;m.push(J,Te,Pe),m.push(Te,De,Pe),ee+=6}h.addGroup(y,ee,F),y+=ee,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zf extends vs{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,_=m+1,b=e/h,g=i/m,y=[],T=[],C=[],S=[];for(let E=0;E<_;E++){const N=E*g-f;for(let U=0;U<p;U++){const D=U*b-c;T.push(D,-N,0),C.push(0,0,1),S.push(U/h),S.push(1-E/m)}}for(let E=0;E<m;E++)for(let N=0;N<h;N++){const U=N+p*E,D=N+p*(E+1),X=N+1+p*(E+1),L=N+1+p*E;y.push(U,D,L),y.push(D,X,L)}this.setIndex(y),this.setAttribute("position",new ka(T,3)),this.setAttribute("normal",new ka(C,3)),this.setAttribute("uv",new ka(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zf(e.width,e.height,e.widthSegments,e.heightSegments)}}class Cm extends vs{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const _=[],b=new ne,g=new ne,y=[],T=[],C=[],S=[];for(let E=0;E<=s;E++){const N=[],U=E/s;let D=0;E===0&&f===0?D=.5/i:E===s&&m===Math.PI&&(D=-.5/i);for(let X=0;X<=i;X++){const L=X/i;b.x=-e*Math.cos(l+L*c)*Math.sin(f+U*h),b.y=e*Math.cos(f+U*h),b.z=e*Math.sin(l+L*c)*Math.sin(f+U*h),T.push(b.x,b.y,b.z),g.copy(b).normalize(),C.push(g.x,g.y,g.z),S.push(L+D,1-U),N.push(p++)}_.push(N)}for(let E=0;E<s;E++)for(let N=0;N<i;N++){const U=_[E][N+1],D=_[E][N],X=_[E+1][N],L=_[E+1][N+1];(E!==0||f>0)&&y.push(U,D,L),(E!==s-1||m<Math.PI)&&y.push(D,X,L)}this.setIndex(y),this.setAttribute("position",new ka(T,3)),this.setAttribute("normal",new ka(C,3)),this.setAttribute("uv",new ka(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Cl(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(w_(l))l.isRenderTargetTexture?(At("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(w_(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function qi(r){const e={};for(let i=0;i<r.length;i++){const s=Cl(r[i]);for(const l in s)e[l]=s[l]}return e}function w_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function pS(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function rb(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Jt.workingColorSpace}const mS={clone:Cl,merge:qi};var gS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _s extends Bf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gS,this.fragmentShader=xS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cl(e.uniforms),this.uniformsGroups=pS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class _S extends _s{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class vS extends Bf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=NE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bS extends Bf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const up={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(R_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!R_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function R_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class yS{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(_){h++,c===!1&&l.onStart!==void 0&&l.onStart(_,f,h),c=!0},this.itemEnd=function(_){f++,l.onProgress!==void 0&&l.onProgress(_,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(_){l.onError!==void 0&&l.onError(_)},this.resolveURL=function(_){return m?m(_):_},this.setURLModifier=function(_){return m=_,this},this.addHandler=function(_,b){return p.push(_,b),this},this.removeHandler=function(_){const b=p.indexOf(_);return b!==-1&&p.splice(b,2),this},this.getHandler=function(_){for(let b=0,g=p.length;b<g;b+=2){const y=p[b],T=p[b+1];if(y.global&&(y.lastIndex=0),y.test(_))return T}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ES=new yS;class Nm{constructor(e){this.manager=e!==void 0?e:ES,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Nm.DEFAULT_MATERIAL_NAME="__DEFAULT";const gl=new WeakMap;class SS extends Nm{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=up.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let b=gl.get(f);b===void 0&&(b=[],gl.set(f,b)),b.push({onLoad:i,onError:l})}return f}const h=Lc("img");function m(){_(),i&&i(this);const b=gl.get(this)||[];for(let g=0;g<b.length;g++){const y=b[g];y.onLoad&&y.onLoad(this)}gl.delete(this),c.manager.itemEnd(e)}function p(b){_(),l&&l(b),up.remove(`image:${e}`);const g=gl.get(this)||[];for(let y=0;y<g.length;y++){const T=g[y];T.onError&&T.onError(b)}gl.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function _(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),up.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class MS extends Nm{constructor(e){super(e)}load(e,i,s,l){const c=new Yi,f=new SS(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const hf=new ne,pf=new Br,ls=new ne;let ob=class extends ya{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vi,this.projectionMatrix=new vi,this.projectionMatrixInverse=new vi,this.coordinateSystem=ds,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(hf,pf,ls),ls.x===1&&ls.y===1&&ls.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hf,pf,ls.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(hf,pf,ls),ls.x===1&&ls.y===1&&ls.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hf,pf,ls.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};const Or=new ne,C_=new Xt,N_=new Xt;class Ga extends ob{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=fm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fm*2*Math.atan(Math.tan(Tf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,i){return this.getViewBounds(e,C_,N_),i.subVectors(N_,C_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Tf*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class lb extends ob{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=_*this.view.offsetY,m=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const xl=-90,_l=1;class TS extends ya{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ga(xl,_l,e,i);l.layers=this.layers,this.add(l);const c=new Ga(xl,_l,e,i);c.layers=this.layers,this.add(c);const f=new Ga(xl,_l,e,i);f.layers=this.layers,this.add(f);const h=new Ga(xl,_l,e,i);h.layers=this.layers,this.add(h);const m=new Ga(xl,_l,e,i);m.layers=this.layers,this.add(m);const p=new Ga(xl,_l,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===ds)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===If)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,_]=this.children,b=e.getRenderTarget(),g=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(b,g,y),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class AS extends Ga{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class O_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=$t(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos($t(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Bm=class Bm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Bm.prototype.isMatrix2=!0;let D_=Bm;class wS extends zr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){At("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function L_(r,e,i,s){const l=RS(s);switch(i){case Wv:return r*e;case $v:return r*e/l.components*l.byteLength;case ym:return r*e/l.components*l.byteLength;case yo:return r*e*2/l.components*l.byteLength;case Em:return r*e*2/l.components*l.byteLength;case qv:return r*e*3/l.components*l.byteLength;case Ka:return r*e*4/l.components*l.byteLength;case Sm:return r*e*4/l.components*l.byteLength;case yf:case Ef:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Sf:case Mf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Up:case Fp:return Math.max(r,16)*Math.max(e,8)/4;case Ip:case Pp:return Math.max(r,8)*Math.max(e,8)/2;case Bp:case zp:case Hp:case kp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Gp:case Nf:case Vp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case jp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Xp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Yp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Wp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case qp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case $p:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Kp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Zp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Qp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Jp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case em:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case tm:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case nm:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case im:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case am:case sm:case rm:return Math.ceil(r/4)*Math.ceil(e/4)*16;case om:case lm:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Of:case cm:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function RS(r){switch(r){case Ha:case Vv:return{byteLength:1,components:1};case Oc:case jv:case $s:return{byteLength:2,components:1};case vm:case bm:return{byteLength:2,components:4};case gs:case _m:case fs:return{byteLength:4,components:1};case Xv:case Yv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xm}}));typeof window<"u"&&(window.__THREE__?At("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xm);function cb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function CS(r){const e=new WeakMap;function i(h,m){const p=h.array,_=h.usage,b=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,_),h.onUploadCallback();let y;if(p instanceof Float32Array)y=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)y=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?y=r.HALF_FLOAT:y=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)y=r.SHORT;else if(p instanceof Uint32Array)y=r.UNSIGNED_INT;else if(p instanceof Int32Array)y=r.INT;else if(p instanceof Int8Array)y=r.BYTE;else if(p instanceof Uint8Array)y=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)y=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:y,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:b}}function s(h,m,p){const _=m.array,b=m.updateRanges;if(r.bindBuffer(p,h),b.length===0)r.bufferSubData(p,0,_);else{b.sort((y,T)=>y.start-T.start);let g=0;for(let y=1;y<b.length;y++){const T=b[g],C=b[y];C.start<=T.start+T.count+1?T.count=Math.max(T.count,C.start+C.count-T.start):(++g,b[g]=C)}b.length=g+1;for(let y=0,T=b.length;y<T;y++){const C=b[y];r.bufferSubData(p,C.start*_.BYTES_PER_ELEMENT,_,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var NS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,OS=`#ifdef USE_ALPHAHASH
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
#endif`,DS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,LS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,IS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,US=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,PS=`#ifdef USE_AOMAP
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
#endif`,FS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BS=`#ifdef USE_BATCHING
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
#endif`,zS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,GS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,HS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,VS=`#ifdef USE_IRIDESCENCE
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
#endif`,jS=`#ifdef USE_BUMPMAP
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
#endif`,XS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,YS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$S=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,KS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ZS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,QS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,JS=`#define PI 3.141592653589793
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
} // validated`,eM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tM=`vec3 transformedNormal = objectNormal;
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
#endif`,nM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,iM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,aM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rM="gl_FragColor = linearToOutputTexel( gl_FragColor );",oM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lM=`#ifdef USE_ENVMAP
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
#endif`,cM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uM=`#ifdef USE_ENVMAP
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
#endif`,fM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dM=`#ifdef USE_ENVMAP
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
#endif`,hM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xM=`#ifdef USE_GRADIENTMAP
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
}`,_M=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,EM=`#ifdef USE_ENVMAP
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
#endif`,SM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,MM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,TM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,AM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wM=`PhysicalMaterial material;
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
#endif`,RM=`uniform sampler2D dfgLUT;
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
}`,CM=`
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
#endif`,NM=`#if defined( RE_IndirectDiffuse )
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
#endif`,OM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,DM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,LM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,IM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,UM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,GM=`#if defined( USE_POINTS_UV )
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
#endif`,HM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,VM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,XM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YM=`#ifdef USE_MORPHTARGETS
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
#endif`,WM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$M=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,KM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,JM=`#ifdef USE_NORMALMAP
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
#endif`,eT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mT=`float getShadowMask() {
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
}`,gT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xT=`#ifdef USE_SKINNING
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
#endif`,_T=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vT=`#ifdef USE_SKINNING
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
#endif`,bT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ET=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ST=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MT=`#ifdef USE_TRANSMISSION
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
#endif`,TT=`#ifdef USE_TRANSMISSION
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
#endif`,AT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OT=`uniform sampler2D t2D;
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
}`,DT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,IT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PT=`#include <common>
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
}`,FT=`#if DEPTH_PACKING == 3200
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
}`,BT=`#define DISTANCE
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
}`,zT=`#define DISTANCE
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
}`,GT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,HT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kT=`uniform float scale;
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
}`,VT=`uniform vec3 diffuse;
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
}`,jT=`#include <common>
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
}`,XT=`uniform vec3 diffuse;
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
}`,YT=`#define LAMBERT
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
}`,WT=`#define LAMBERT
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
}`,qT=`#define MATCAP
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
}`,$T=`#define MATCAP
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
}`,KT=`#define NORMAL
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
}`,ZT=`#define NORMAL
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
}`,QT=`#define PHONG
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
}`,JT=`#define PHONG
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
}`,e1=`#define STANDARD
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
}`,t1=`#define STANDARD
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
}`,n1=`#define TOON
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
}`,i1=`#define TOON
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
}`,a1=`uniform float size;
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
}`,s1=`uniform vec3 diffuse;
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
}`,r1=`#include <common>
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
}`,o1=`uniform vec3 color;
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
}`,l1=`uniform float rotation;
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
}`,c1=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:NS,alphahash_pars_fragment:OS,alphamap_fragment:DS,alphamap_pars_fragment:LS,alphatest_fragment:IS,alphatest_pars_fragment:US,aomap_fragment:PS,aomap_pars_fragment:FS,batching_pars_vertex:BS,batching_vertex:zS,begin_vertex:GS,beginnormal_vertex:HS,bsdfs:kS,iridescence_fragment:VS,bumpmap_pars_fragment:jS,clipping_planes_fragment:XS,clipping_planes_pars_fragment:YS,clipping_planes_pars_vertex:WS,clipping_planes_vertex:qS,color_fragment:$S,color_pars_fragment:KS,color_pars_vertex:ZS,color_vertex:QS,common:JS,cube_uv_reflection_fragment:eM,defaultnormal_vertex:tM,displacementmap_pars_vertex:nM,displacementmap_vertex:iM,emissivemap_fragment:aM,emissivemap_pars_fragment:sM,colorspace_fragment:rM,colorspace_pars_fragment:oM,envmap_fragment:lM,envmap_common_pars_fragment:cM,envmap_pars_fragment:uM,envmap_pars_vertex:fM,envmap_physical_pars_fragment:EM,envmap_vertex:dM,fog_vertex:hM,fog_pars_vertex:pM,fog_fragment:mM,fog_pars_fragment:gM,gradientmap_pars_fragment:xM,lightmap_pars_fragment:_M,lights_lambert_fragment:vM,lights_lambert_pars_fragment:bM,lights_pars_begin:yM,lights_toon_fragment:SM,lights_toon_pars_fragment:MM,lights_phong_fragment:TM,lights_phong_pars_fragment:AM,lights_physical_fragment:wM,lights_physical_pars_fragment:RM,lights_fragment_begin:CM,lights_fragment_maps:NM,lights_fragment_end:OM,lightprobes_pars_fragment:DM,logdepthbuf_fragment:LM,logdepthbuf_pars_fragment:IM,logdepthbuf_pars_vertex:UM,logdepthbuf_vertex:PM,map_fragment:FM,map_pars_fragment:BM,map_particle_fragment:zM,map_particle_pars_fragment:GM,metalnessmap_fragment:HM,metalnessmap_pars_fragment:kM,morphinstance_vertex:VM,morphcolor_vertex:jM,morphnormal_vertex:XM,morphtarget_pars_vertex:YM,morphtarget_vertex:WM,normal_fragment_begin:qM,normal_fragment_maps:$M,normal_pars_fragment:KM,normal_pars_vertex:ZM,normal_vertex:QM,normalmap_pars_fragment:JM,clearcoat_normal_fragment_begin:eT,clearcoat_normal_fragment_maps:tT,clearcoat_pars_fragment:nT,iridescence_pars_fragment:iT,opaque_fragment:aT,packing:sT,premultiplied_alpha_fragment:rT,project_vertex:oT,dithering_fragment:lT,dithering_pars_fragment:cT,roughnessmap_fragment:uT,roughnessmap_pars_fragment:fT,shadowmap_pars_fragment:dT,shadowmap_pars_vertex:hT,shadowmap_vertex:pT,shadowmask_pars_fragment:mT,skinbase_vertex:gT,skinning_pars_vertex:xT,skinning_vertex:_T,skinnormal_vertex:vT,specularmap_fragment:bT,specularmap_pars_fragment:yT,tonemapping_fragment:ET,tonemapping_pars_fragment:ST,transmission_fragment:MT,transmission_pars_fragment:TT,uv_pars_fragment:AT,uv_pars_vertex:wT,uv_vertex:RT,worldpos_vertex:CT,background_vert:NT,background_frag:OT,backgroundCube_vert:DT,backgroundCube_frag:LT,cube_vert:IT,cube_frag:UT,depth_vert:PT,depth_frag:FT,distance_vert:BT,distance_frag:zT,equirect_vert:GT,equirect_frag:HT,linedashed_vert:kT,linedashed_frag:VT,meshbasic_vert:jT,meshbasic_frag:XT,meshlambert_vert:YT,meshlambert_frag:WT,meshmatcap_vert:qT,meshmatcap_frag:$T,meshnormal_vert:KT,meshnormal_frag:ZT,meshphong_vert:QT,meshphong_frag:JT,meshphysical_vert:e1,meshphysical_frag:t1,meshtoon_vert:n1,meshtoon_frag:i1,points_vert:a1,points_frag:s1,shadow_vert:r1,shadow_frag:o1,sprite_vert:l1,sprite_frag:c1},qe={common:{diffuse:{value:new Cn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Cn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ne},probesMax:{value:new ne},probesResolution:{value:new ne}},points:{diffuse:{value:new Cn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Cn(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},us={basic:{uniforms:qi([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:qi([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new Cn(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:qi([qe.common,qe.specularmap,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,qe.lights,{emissive:{value:new Cn(0)},specular:{value:new Cn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:qi([qe.common,qe.envmap,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.roughnessmap,qe.metalnessmap,qe.fog,qe.lights,{emissive:{value:new Cn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:qi([qe.common,qe.aomap,qe.lightmap,qe.emissivemap,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.gradientmap,qe.fog,qe.lights,{emissive:{value:new Cn(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:qi([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,qe.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:qi([qe.points,qe.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:qi([qe.common,qe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:qi([qe.common,qe.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:qi([qe.common,qe.bumpmap,qe.normalmap,qe.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:qi([qe.sprite,qe.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:qi([qe.common,qe.displacementmap,{referencePosition:{value:new ne},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:qi([qe.lights,qe.fog,{color:{value:new Cn(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};us.physical={uniforms:qi([us.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Cn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Cn(0)},specularColor:{value:new Cn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const mf={r:0,b:0,g:0},u1=new vi,ub=new Ut;ub.set(-1,0,0,0,1,0,0,0,1);function f1(r,e,i,s,l,c){const f=new Cn(0);let h=l===!0?0:1,m,p,_=null,b=0,g=null;function y(N){let U=N.isScene===!0?N.background:null;if(U&&U.isTexture){const D=N.backgroundBlurriness>0;U=e.get(U,D)}return U}function T(N){let U=!1;const D=y(N);D===null?S(f,h):D&&D.isColor&&(S(D,1),U=!0);const X=r.xr.getEnvironmentBlendMode();X==="additive"?i.buffers.color.setClear(0,0,0,1,c):X==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||U)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(N,U){const D=y(U);D&&(D.isCubeTexture||D.mapping===Ff)?(p===void 0&&(p=new xs(new Bc(1,1,1),new _s({name:"BackgroundCubeMaterial",uniforms:Cl(us.backgroundCube.uniforms),vertexShader:us.backgroundCube.vertexShader,fragmentShader:us.backgroundCube.fragmentShader,side:ra,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(X,L,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=D,p.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(u1.makeRotationFromEuler(U.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(ub),p.material.toneMapped=Jt.getTransfer(D.colorSpace)!==En,(_!==D||b!==D.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,_=D,b=D.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):D&&D.isTexture&&(m===void 0&&(m=new xs(new zf(2,2),new _s({name:"BackgroundMaterial",uniforms:Cl(us.background.uniforms),vertexShader:us.background.vertexShader,fragmentShader:us.background.fragmentShader,side:Fr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=D,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=Jt.getTransfer(D.colorSpace)!==En,D.matrixAutoUpdate===!0&&D.updateMatrix(),m.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||b!==D.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=D,b=D.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function S(N,U){N.getRGB(mf,rb(r)),i.buffers.color.setClear(mf.r,mf.g,mf.b,U,c)}function E(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,U=1){f.set(N),h=U,S(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,S(f,h)},render:T,addToRenderList:C,dispose:E}}function d1(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(k,W,de,se,Y){let I=!1;const G=b(k,se,de,W);c!==G&&(c=G,p(c.object)),I=y(k,se,de,Y),I&&T(k,se,de,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(I||f)&&(f=!1,D(k,W,de,se),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function m(){return r.createVertexArray()}function p(k){return r.bindVertexArray(k)}function _(k){return r.deleteVertexArray(k)}function b(k,W,de,se){const Y=se.wireframe===!0;let I=s[W.id];I===void 0&&(I={},s[W.id]=I);const G=k.isInstancedMesh===!0?k.id:0;let ee=I[G];ee===void 0&&(ee={},I[G]=ee);let me=ee[de.id];me===void 0&&(me={},ee[de.id]=me);let Ae=me[Y];return Ae===void 0&&(Ae=g(m()),me[Y]=Ae),Ae}function g(k){const W=[],de=[],se=[];for(let Y=0;Y<i;Y++)W[Y]=0,de[Y]=0,se[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:de,attributeDivisors:se,object:k,attributes:{},index:null}}function y(k,W,de,se){const Y=c.attributes,I=W.attributes;let G=0;const ee=de.getAttributes();for(const me in ee)if(ee[me].location>=0){const P=Y[me];let J=I[me];if(J===void 0&&(me==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),me==="instanceColor"&&k.instanceColor&&(J=k.instanceColor)),P===void 0||P.attribute!==J||J&&P.data!==J.data)return!0;G++}return c.attributesNum!==G||c.index!==se}function T(k,W,de,se){const Y={},I=W.attributes;let G=0;const ee=de.getAttributes();for(const me in ee)if(ee[me].location>=0){let P=I[me];P===void 0&&(me==="instanceMatrix"&&k.instanceMatrix&&(P=k.instanceMatrix),me==="instanceColor"&&k.instanceColor&&(P=k.instanceColor));const J={};J.attribute=P,P&&P.data&&(J.data=P.data),Y[me]=J,G++}c.attributes=Y,c.attributesNum=G,c.index=se}function C(){const k=c.newAttributes;for(let W=0,de=k.length;W<de;W++)k[W]=0}function S(k){E(k,0)}function E(k,W){const de=c.newAttributes,se=c.enabledAttributes,Y=c.attributeDivisors;de[k]=1,se[k]===0&&(r.enableVertexAttribArray(k),se[k]=1),Y[k]!==W&&(r.vertexAttribDivisor(k,W),Y[k]=W)}function N(){const k=c.newAttributes,W=c.enabledAttributes;for(let de=0,se=W.length;de<se;de++)W[de]!==k[de]&&(r.disableVertexAttribArray(de),W[de]=0)}function U(k,W,de,se,Y,I,G){G===!0?r.vertexAttribIPointer(k,W,de,Y,I):r.vertexAttribPointer(k,W,de,se,Y,I)}function D(k,W,de,se){C();const Y=se.attributes,I=de.getAttributes(),G=W.defaultAttributeValues;for(const ee in I){const me=I[ee];if(me.location>=0){let Ae=Y[ee];if(Ae===void 0&&(ee==="instanceMatrix"&&k.instanceMatrix&&(Ae=k.instanceMatrix),ee==="instanceColor"&&k.instanceColor&&(Ae=k.instanceColor)),Ae!==void 0){const P=Ae.normalized,J=Ae.itemSize,Te=e.get(Ae);if(Te===void 0)continue;const De=Te.buffer,Pe=Te.type,oe=Te.bytesPerElement,Ee=Pe===r.INT||Pe===r.UNSIGNED_INT||Ae.gpuType===_m;if(Ae.isInterleavedBufferAttribute){const Ce=Ae.data,Ve=Ce.stride,gt=Ae.offset;if(Ce.isInstancedInterleavedBuffer){for(let et=0;et<me.locationSize;et++)E(me.location+et,Ce.meshPerAttribute);k.isInstancedMesh!==!0&&se._maxInstanceCount===void 0&&(se._maxInstanceCount=Ce.meshPerAttribute*Ce.count)}else for(let et=0;et<me.locationSize;et++)S(me.location+et);r.bindBuffer(r.ARRAY_BUFFER,De);for(let et=0;et<me.locationSize;et++)U(me.location+et,J/me.locationSize,Pe,P,Ve*oe,(gt+J/me.locationSize*et)*oe,Ee)}else{if(Ae.isInstancedBufferAttribute){for(let Ce=0;Ce<me.locationSize;Ce++)E(me.location+Ce,Ae.meshPerAttribute);k.isInstancedMesh!==!0&&se._maxInstanceCount===void 0&&(se._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let Ce=0;Ce<me.locationSize;Ce++)S(me.location+Ce);r.bindBuffer(r.ARRAY_BUFFER,De);for(let Ce=0;Ce<me.locationSize;Ce++)U(me.location+Ce,J/me.locationSize,Pe,P,J*oe,J/me.locationSize*Ce*oe,Ee)}}else if(G!==void 0){const P=G[ee];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(me.location,P);break;case 3:r.vertexAttrib3fv(me.location,P);break;case 4:r.vertexAttrib4fv(me.location,P);break;default:r.vertexAttrib1fv(me.location,P)}}}}N()}function X(){F();for(const k in s){const W=s[k];for(const de in W){const se=W[de];for(const Y in se){const I=se[Y];for(const G in I)_(I[G].object),delete I[G];delete se[Y]}}delete s[k]}}function L(k){if(s[k.id]===void 0)return;const W=s[k.id];for(const de in W){const se=W[de];for(const Y in se){const I=se[Y];for(const G in I)_(I[G].object),delete I[G];delete se[Y]}}delete s[k.id]}function z(k){for(const W in s){const de=s[W];for(const se in de){const Y=de[se];if(Y[k.id]===void 0)continue;const I=Y[k.id];for(const G in I)_(I[G].object),delete I[G];delete Y[k.id]}}}function w(k){for(const W in s){const de=s[W],se=k.isInstancedMesh===!0?k.id:0,Y=de[se];if(Y!==void 0){for(const I in Y){const G=Y[I];for(const ee in G)_(G[ee].object),delete G[ee];delete Y[I]}delete de[se],Object.keys(de).length===0&&delete s[W]}}}function F(){$(),f=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:$,dispose:X,releaseStatesOfGeometry:L,releaseStatesOfObject:w,releaseStatesOfProgram:z,initAttributes:C,enableAttribute:S,disableUnusedAttributes:N}}function h1(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,_){_!==0&&(r.drawArraysInstanced(s,m,p,_),i.update(p,s,_))}function h(m,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,_);let g=0;for(let y=0;y<_;y++)g+=p[y];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function p1(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(z){return!(z!==Ka&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(z){const w=z===$s&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==Ha&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==fs&&!w)}function m(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const _=m(p);_!==p&&(At("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const b=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&At("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),E=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),D=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),X=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:b,reversedDepthBuffer:g,maxTextures:y,maxVertexTextures:T,maxTextureSize:C,maxCubemapSize:S,maxAttributes:E,maxVertexUniforms:N,maxVaryings:U,maxFragmentUniforms:D,maxSamples:X,samples:L}}function m1(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new Dr,h=new Ut,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(b,g){const y=b.length!==0||g||s!==0||l;return l=g,s=b.length,y},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(b,g){i=_(b,g,0)},this.setState=function(b,g,y){const T=b.clippingPlanes,C=b.clipIntersection,S=b.clipShadows,E=r.get(b);if(!l||T===null||T.length===0||c&&!S)c?_(null):p();else{const N=c?0:s,U=N*4;let D=E.clippingState||null;m.value=D,D=_(T,g,U,y);for(let X=0;X!==U;++X)D[X]=i[X];E.clippingState=D,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(b,g,y,T){const C=b!==null?b.length:0;let S=null;if(C!==0){if(S=m.value,T!==!0||S===null){const E=y+C*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(S===null||S.length<E)&&(S=new Float32Array(E));for(let U=0,D=y;U!==C;++U,D+=4)f.copy(b[U]).applyMatrix4(N,h),f.normal.toArray(S,D),S[D+3]=f.constant}m.value=S,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,S}}const Ur=4,I_=[.125,.215,.35,.446,.526,.582],xo=20,g1=256,Sc=new lb,U_=new Cn;let fp=null,dp=0,hp=0,pp=!1;const x1=new ne;class P_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=x1}=c;fp=this._renderer.getRenderTarget(),dp=this._renderer.getActiveCubeFace(),hp=this._renderer.getActiveMipmapLevel(),pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=z_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=B_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fp,dp,hp),this._renderer.xr.enabled=pp,e.scissorTest=!1,vl(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===bo||e.mapping===wl?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fp=this._renderer.getRenderTarget(),dp=this._renderer.getActiveCubeFace(),hp=this._renderer.getActiveMipmapLevel(),pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Xi,minFilter:Xi,generateMipmaps:!1,type:$s,format:Ka,colorSpace:Df,depthBuffer:!1},l=F_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=F_(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_1(c)),this._blurMaterial=b1(c,e,i),this._ggxMaterial=v1(c,e,i)}return l}_compileMaterial(e){const i=new xs(new vs,e);this._renderer.compile(i,Sc)}_sceneToCubeUV(e,i,s,l,c){const m=new Ga(90,1,i,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],b=this._renderer,g=b.autoClear,y=b.toneMapping;b.getClearColor(U_),b.toneMapping=hs,b.autoClear=!1,b.state.buffers.depth.getReversed()&&(b.setRenderTarget(l),b.clearDepth(),b.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xs(new Bc,new Rm({name:"PMREM.Background",side:ra,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,S=C.material;let E=!1;const N=e.background;N?N.isColor&&(S.color.copy(N),e.background=null,E=!0):(S.color.copy(U_),E=!0);for(let U=0;U<6;U++){const D=U%3;D===0?(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[U],c.y,c.z)):D===1?(m.up.set(0,0,p[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[U],c.z)):(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[U]));const X=this._cubeSize;vl(l,D*X,U>2?X:0,X,X),b.setRenderTarget(l),E&&b.render(C,m),b.render(e,m)}b.toneMapping=y,b.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===bo||e.mapping===wl;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=z_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=B_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;vl(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Sc)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),b=Math.sqrt(p*p-_*_),g=0+p*1.25,y=b*g,{_lodMax:T}=this,C=this._sizeLods[s],S=3*C*(s>T-Ur?s-T+Ur:0),E=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=y,m.mipInt.value=T-i,vl(c,S,E,3*C,2*C),l.setRenderTarget(c),l.render(h,Sc),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-s,vl(e,S,E,3*C,2*C),l.setRenderTarget(e),l.render(h,Sc)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&rn("blur direction must be either latitudinal or longitudinal!");const _=3,b=this._lodMeshes[l];b.material=p;const g=p.uniforms,y=this._sizeLods[s]-1,T=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*xo-1),C=c/T,S=isFinite(c)?1+Math.floor(_*C):xo;S>xo&&At(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${xo}`);const E=[];let N=0;for(let z=0;z<xo;++z){const w=z/C,F=Math.exp(-w*w/2);E.push(F),z===0?N+=F:z<S&&(N+=2*F)}for(let z=0;z<E.length;z++)E[z]=E[z]/N;g.envMap.value=e.texture,g.samples.value=S,g.weights.value=E,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:U}=this;g.dTheta.value=T,g.mipInt.value=U-s;const D=this._sizeLods[l],X=3*D*(l>U-Ur?l-U+Ur:0),L=4*(this._cubeSize-D);vl(i,X,L,3*D,2*D),m.setRenderTarget(i),m.render(b,Sc)}}function _1(r){const e=[],i=[],s=[];let l=r;const c=r-Ur+1+I_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-Ur?m=I_[f-r+Ur-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),_=-p,b=1+p,g=[_,_,b,_,b,b,_,_,b,b,_,b],y=6,T=6,C=3,S=2,E=1,N=new Float32Array(C*T*y),U=new Float32Array(S*T*y),D=new Float32Array(E*T*y);for(let L=0;L<y;L++){const z=L%3*2/3-1,w=L>2?0:-1,F=[z,w,0,z+2/3,w,0,z+2/3,w+1,0,z,w,0,z+2/3,w+1,0,z,w+1,0];N.set(F,C*T*L),U.set(g,S*T*L);const $=[L,L,L,L,L,L];D.set($,E*T*L)}const X=new vs;X.setAttribute("position",new ms(N,C)),X.setAttribute("uv",new ms(U,S)),X.setAttribute("faceIndex",new ms(D,E)),s.push(new xs(X,null)),l>Ur&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function F_(r,e,i){const s=new ps(r,e,i);return s.texture.mapping=Ff,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function vl(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function v1(r,e,i){return new _s({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gf(),fragmentShader:`

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
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function b1(r,e,i){const s=new Float32Array(xo),l=new ne(0,1,0);return new _s({name:"SphericalGaussianBlur",defines:{n:xo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Gf(),fragmentShader:`

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
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function B_(){return new _s({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gf(),fragmentShader:`

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
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function z_(){return new _s({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ws,depthTest:!1,depthWrite:!1})}function Gf(){return`

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
	`}class fb extends ps{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new ab(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Bc(5,5,5),c=new _s({name:"CubemapFromEquirect",uniforms:Cl(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ra,blending:Ws});c.uniforms.tEquirect.value=i;const f=new xs(l,c),h=i.minFilter;return i.minFilter===_o&&(i.minFilter=Xi),new TS(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function y1(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,y=!1){return g==null?null:y?f(g):c(g)}function c(g){if(g&&g.isTexture){const y=g.mapping;if(y===bf||y===zh)if(e.has(g)){const T=e.get(g).texture;return h(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const C=new fb(T.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",p),h(C.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const y=g.mapping,T=y===bf||y===zh,C=y===bo||y===wl;if(T||C){let S=i.get(g);const E=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==E)return s===null&&(s=new P_(r)),S=T?s.fromEquirectangular(g,S):s.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),S.texture;if(S!==void 0)return S.texture;{const N=g.image;return T&&N&&N.height>0||C&&N&&m(N)?(s===null&&(s=new P_(r)),S=T?s.fromEquirectangular(g):s.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),g.addEventListener("dispose",_),S.texture):null}}}return g}function h(g,y){return y===bf?g.mapping=bo:y===zh&&(g.mapping=wl),g}function m(g){let y=0;const T=6;for(let C=0;C<T;C++)g[C]!==void 0&&y++;return y===T}function p(g){const y=g.target;y.removeEventListener("dispose",p);const T=e.get(y);T!==void 0&&(e.delete(y),T.dispose())}function _(g){const y=g.target;y.removeEventListener("dispose",_);const T=i.get(y);T!==void 0&&(i.delete(y),T.dispose())}function b(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:b}}function E1(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&um("WebGLRenderer: "+s+" extension not supported."),l}}}function S1(r,e,i,s){const l={},c=new WeakMap;function f(b){const g=b.target;g.index!==null&&e.remove(g.index);for(const T in g.attributes)e.remove(g.attributes[T]);g.removeEventListener("dispose",f),delete l[g.id];const y=c.get(g);y&&(e.remove(y),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(b,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(b){const g=b.attributes;for(const y in g)e.update(g[y],r.ARRAY_BUFFER)}function p(b){const g=[],y=b.index,T=b.attributes.position;let C=0;if(T===void 0)return;if(y!==null){const N=y.array;C=y.version;for(let U=0,D=N.length;U<D;U+=3){const X=N[U+0],L=N[U+1],z=N[U+2];g.push(X,L,L,z,z,X)}}else{const N=T.array;C=T.version;for(let U=0,D=N.length/3-1;U<D;U+=3){const X=U+0,L=U+1,z=U+2;g.push(X,L,L,z,z,X)}}const S=new(T.count>=65535?tb:eb)(g,1);S.version=C;const E=c.get(b);E&&e.remove(E),c.set(b,S)}function _(b){const g=c.get(b);if(g){const y=b.index;y!==null&&g.version<y.version&&p(b)}else p(b);return c.get(b)}return{get:h,update:m,getWireframeAttribute:_}}function M1(r,e,i){let s;function l(b){s=b}let c,f;function h(b){c=b.type,f=b.bytesPerElement}function m(b,g){r.drawElements(s,g,c,b*f),i.update(g,s,1)}function p(b,g,y){y!==0&&(r.drawElementsInstanced(s,g,c,b*f,y),i.update(g,s,y))}function _(b,g,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,b,0,y);let C=0;for(let S=0;S<y;S++)C+=g[S];i.update(C,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=_}function T1(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:rn("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function A1(r,e,i){const s=new WeakMap,l=new li;function c(f,h,m){const p=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,b=_!==void 0?_.length:0;let g=s.get(h);if(g===void 0||g.count!==b){let F=function(){z.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const y=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let U=0;y===!0&&(U=1),T===!0&&(U=2),C===!0&&(U=3);let D=h.attributes.position.count*U,X=1;D>e.maxTextureSize&&(X=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const L=new Float32Array(D*X*4*b),z=new Zv(L,D,X,b);z.type=fs,z.needsUpdate=!0;const w=U*4;for(let $=0;$<b;$++){const k=S[$],W=E[$],de=N[$],se=D*X*4*$;for(let Y=0;Y<k.count;Y++){const I=Y*w;y===!0&&(l.fromBufferAttribute(k,Y),L[se+I+0]=l.x,L[se+I+1]=l.y,L[se+I+2]=l.z,L[se+I+3]=0),T===!0&&(l.fromBufferAttribute(W,Y),L[se+I+4]=l.x,L[se+I+5]=l.y,L[se+I+6]=l.z,L[se+I+7]=0),C===!0&&(l.fromBufferAttribute(de,Y),L[se+I+8]=l.x,L[se+I+9]=l.y,L[se+I+10]=l.z,L[se+I+11]=de.itemSize===4?l.w:1)}}g={count:b,texture:z,size:new Xt(D,X)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let y=0;for(let C=0;C<p.length;C++)y+=p[C];const T=h.morphTargetsRelative?1:1-y;m.getUniforms().setValue(r,"morphTargetBaseInfluence",T),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function w1(r,e,i,s,l){let c=new WeakMap;function f(p){const _=l.render.frame,b=p.geometry,g=e.get(p,b);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==_&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const y=p.skeleton;c.get(y)!==_&&(y.update(),c.set(y,_))}return g}function h(){c=new WeakMap}function m(p){const _=p.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:h}}const R1={[Uv]:"LINEAR_TONE_MAPPING",[Pv]:"REINHARD_TONE_MAPPING",[Fv]:"CINEON_TONE_MAPPING",[Bv]:"ACES_FILMIC_TONE_MAPPING",[Gv]:"AGX_TONE_MAPPING",[Hv]:"NEUTRAL_TONE_MAPPING",[zv]:"CUSTOM_TONE_MAPPING"};function C1(r,e,i,s,l){const c=new ps(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new Rl(e,i):void 0}),f=new ps(e,i,{type:$s,depthBuffer:!1,stencilBuffer:!1}),h=new vs;h.setAttribute("position",new ka([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ka([0,2,0,0,2,0],2));const m=new _S({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new xs(h,m),_=new lb(-1,1,1,-1,0,1);let b=null,g=null,y=!1,T,C=null,S=[],E=!1;this.setSize=function(N,U){c.setSize(N,U),f.setSize(N,U);for(let D=0;D<S.length;D++){const X=S[D];X.setSize&&X.setSize(N,U)}},this.setEffects=function(N){S=N,E=S.length>0&&S[0].isRenderPass===!0;const U=c.width,D=c.height;for(let X=0;X<S.length;X++){const L=S[X];L.setSize&&L.setSize(U,D)}},this.begin=function(N,U){if(y||N.toneMapping===hs&&S.length===0)return!1;if(C=U,U!==null){const D=U.width,X=U.height;(c.width!==D||c.height!==X)&&this.setSize(D,X)}return E===!1&&N.setRenderTarget(c),T=N.toneMapping,N.toneMapping=hs,!0},this.hasRenderPass=function(){return E},this.end=function(N,U){N.toneMapping=T,y=!0;let D=c,X=f;for(let L=0;L<S.length;L++){const z=S[L];if(z.enabled!==!1&&(z.render(N,X,D,U),z.needsSwap!==!1)){const w=D;D=X,X=w}}if(b!==N.outputColorSpace||g!==N.toneMapping){b=N.outputColorSpace,g=N.toneMapping,m.defines={},Jt.getTransfer(b)===En&&(m.defines.SRGB_TRANSFER="");const L=R1[g];L&&(m.defines[L]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=D.texture,N.setRenderTarget(C),N.render(p,_),C=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const db=new Yi,dm=new Rl(1,1),hb=new Zv,pb=new $E,mb=new ab,G_=[],H_=[],k_=new Float32Array(16),V_=new Float32Array(9),j_=new Float32Array(4);function Ol(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=G_[l];if(c===void 0&&(c=new Float32Array(l),G_[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function bi(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function yi(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Hf(r,e){let i=H_[e];i===void 0&&(i=new Int32Array(e),H_[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function N1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function O1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bi(i,e))return;r.uniform2fv(this.addr,e),yi(i,e)}}function D1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(bi(i,e))return;r.uniform3fv(this.addr,e),yi(i,e)}}function L1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bi(i,e))return;r.uniform4fv(this.addr,e),yi(i,e)}}function I1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(bi(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),yi(i,e)}else{if(bi(i,s))return;j_.set(s),r.uniformMatrix2fv(this.addr,!1,j_),yi(i,s)}}function U1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(bi(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),yi(i,e)}else{if(bi(i,s))return;V_.set(s),r.uniformMatrix3fv(this.addr,!1,V_),yi(i,s)}}function P1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(bi(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),yi(i,e)}else{if(bi(i,s))return;k_.set(s),r.uniformMatrix4fv(this.addr,!1,k_),yi(i,s)}}function F1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function B1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bi(i,e))return;r.uniform2iv(this.addr,e),yi(i,e)}}function z1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bi(i,e))return;r.uniform3iv(this.addr,e),yi(i,e)}}function G1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bi(i,e))return;r.uniform4iv(this.addr,e),yi(i,e)}}function H1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function k1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(bi(i,e))return;r.uniform2uiv(this.addr,e),yi(i,e)}}function V1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(bi(i,e))return;r.uniform3uiv(this.addr,e),yi(i,e)}}function j1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(bi(i,e))return;r.uniform4uiv(this.addr,e),yi(i,e)}}function X1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(dm.compareFunction=i.isReversedDepthBuffer()?Tm:Mm,c=dm):c=db,i.setTexture2D(e||c,l)}function Y1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||pb,l)}function W1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||mb,l)}function q1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||hb,l)}function $1(r){switch(r){case 5126:return N1;case 35664:return O1;case 35665:return D1;case 35666:return L1;case 35674:return I1;case 35675:return U1;case 35676:return P1;case 5124:case 35670:return F1;case 35667:case 35671:return B1;case 35668:case 35672:return z1;case 35669:case 35673:return G1;case 5125:return H1;case 36294:return k1;case 36295:return V1;case 36296:return j1;case 35678:case 36198:case 36298:case 36306:case 35682:return X1;case 35679:case 36299:case 36307:return Y1;case 35680:case 36300:case 36308:case 36293:return W1;case 36289:case 36303:case 36311:case 36292:return q1}}function K1(r,e){r.uniform1fv(this.addr,e)}function Z1(r,e){const i=Ol(e,this.size,2);r.uniform2fv(this.addr,i)}function Q1(r,e){const i=Ol(e,this.size,3);r.uniform3fv(this.addr,i)}function J1(r,e){const i=Ol(e,this.size,4);r.uniform4fv(this.addr,i)}function eA(r,e){const i=Ol(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function tA(r,e){const i=Ol(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function nA(r,e){const i=Ol(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function iA(r,e){r.uniform1iv(this.addr,e)}function aA(r,e){r.uniform2iv(this.addr,e)}function sA(r,e){r.uniform3iv(this.addr,e)}function rA(r,e){r.uniform4iv(this.addr,e)}function oA(r,e){r.uniform1uiv(this.addr,e)}function lA(r,e){r.uniform2uiv(this.addr,e)}function cA(r,e){r.uniform3uiv(this.addr,e)}function uA(r,e){r.uniform4uiv(this.addr,e)}function fA(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);bi(s,c)||(r.uniform1iv(this.addr,c),yi(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=dm:f=db;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function dA(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);bi(s,c)||(r.uniform1iv(this.addr,c),yi(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||pb,c[f])}function hA(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);bi(s,c)||(r.uniform1iv(this.addr,c),yi(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||mb,c[f])}function pA(r,e,i){const s=this.cache,l=e.length,c=Hf(i,l);bi(s,c)||(r.uniform1iv(this.addr,c),yi(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||hb,c[f])}function mA(r){switch(r){case 5126:return K1;case 35664:return Z1;case 35665:return Q1;case 35666:return J1;case 35674:return eA;case 35675:return tA;case 35676:return nA;case 5124:case 35670:return iA;case 35667:case 35671:return aA;case 35668:case 35672:return sA;case 35669:case 35673:return rA;case 5125:return oA;case 36294:return lA;case 36295:return cA;case 36296:return uA;case 35678:case 36198:case 36298:case 36306:case 35682:return fA;case 35679:case 36299:case 36307:return dA;case 35680:case 36300:case 36308:case 36293:return hA;case 36289:case 36303:case 36311:case 36292:return pA}}class gA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=$1(i.type)}}class xA{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=mA(i.type)}}class _A{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const mp=/(\w+)(\])?(\[|\.)?/g;function X_(r,e){r.seq.push(e),r.map[e.id]=e}function vA(r,e,i){const s=r.name,l=s.length;for(mp.lastIndex=0;;){const c=mp.exec(s),f=mp.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){X_(i,p===void 0?new gA(h,r,e):new xA(h,r,e));break}else{let b=i.map[h];b===void 0&&(b=new _A(h),X_(i,b)),i=b}}}class Af{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);vA(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function Y_(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const bA=37297;let yA=0;function EA(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const W_=new Ut;function SA(r){Jt._getMatrix(W_,Jt.workingColorSpace,r);const e=`mat3( ${W_.elements.map(i=>i.toFixed(4))} )`;switch(Jt.getTransfer(r)){case Lf:return[e,"LinearTransferOETF"];case En:return[e,"sRGBTransferOETF"];default:return At("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function q_(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+EA(r.getShaderSource(e),h)}else return c}function MA(r,e){const i=SA(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const TA={[Uv]:"Linear",[Pv]:"Reinhard",[Fv]:"Cineon",[Bv]:"ACESFilmic",[Gv]:"AgX",[Hv]:"Neutral",[zv]:"Custom"};function AA(r,e){const i=TA[e];return i===void 0?(At("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const gf=new ne;function wA(){Jt.getLuminanceCoefficients(gf);const r=gf.x.toFixed(4),e=gf.y.toFixed(4),i=gf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cc).join(`
`)}function CA(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function NA(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function Cc(r){return r!==""}function $_(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function K_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const OA=/^[ \t]*#include +<([\w\d./]+)>/gm;function hm(r){return r.replace(OA,LA)}const DA=new Map;function LA(r,e){let i=kt[e];if(i===void 0){const s=DA.get(e);if(s!==void 0)i=kt[s],At('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return hm(i)}const IA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Z_(r){return r.replace(IA,UA)}function UA(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Q_(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const PA={[vf]:"SHADOWMAP_TYPE_PCF",[Rc]:"SHADOWMAP_TYPE_VSM"};function FA(r){return PA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const BA={[bo]:"ENVMAP_TYPE_CUBE",[wl]:"ENVMAP_TYPE_CUBE",[Ff]:"ENVMAP_TYPE_CUBE_UV"};function zA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":BA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const GA={[wl]:"ENVMAP_MODE_REFRACTION"};function HA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":GA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const kA={[Iv]:"ENVMAP_BLENDING_MULTIPLY",[wE]:"ENVMAP_BLENDING_MIX",[RE]:"ENVMAP_BLENDING_ADD"};function VA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":kA[r.combine]||"ENVMAP_BLENDING_NONE"}function jA(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function XA(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=FA(i),p=zA(i),_=HA(i),b=VA(i),g=jA(i),y=RA(i),T=CA(c),C=l.createProgram();let S,E,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Cc).join(`
`),S.length>0&&(S+=`
`),E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(Cc).join(`
`),E.length>0&&(E+=`
`)):(S=[Q_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cc).join(`
`),E=[Q_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+_:"",i.envMap?"#define "+b:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==hs?"#define TONE_MAPPING":"",i.toneMapping!==hs?kt.tonemapping_pars_fragment:"",i.toneMapping!==hs?AA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,MA("linearToOutputTexel",i.outputColorSpace),wA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Cc).join(`
`)),f=hm(f),f=$_(f,i),f=K_(f,i),h=hm(h),h=$_(h,i),h=K_(h,i),f=Z_(f),h=Z_(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,S=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,E=["#define varying in",i.glslVersion===u_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===u_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const U=N+S+f,D=N+E+h,X=Y_(l,l.VERTEX_SHADER,U),L=Y_(l,l.FRAGMENT_SHADER,D);l.attachShader(C,X),l.attachShader(C,L),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function z(k){if(r.debug.checkShaderErrors){const W=l.getProgramInfoLog(C)||"",de=l.getShaderInfoLog(X)||"",se=l.getShaderInfoLog(L)||"",Y=W.trim(),I=de.trim(),G=se.trim();let ee=!0,me=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(ee=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,X,L);else{const Ae=q_(l,X,"vertex"),P=q_(l,L,"fragment");rn("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+Y+`
`+Ae+`
`+P)}else Y!==""?At("WebGLProgram: Program Info Log:",Y):(I===""||G==="")&&(me=!1);me&&(k.diagnostics={runnable:ee,programLog:Y,vertexShader:{log:I,prefix:S},fragmentShader:{log:G,prefix:E}})}l.deleteShader(X),l.deleteShader(L),w=new Af(l,C),F=NA(l,C)}let w;this.getUniforms=function(){return w===void 0&&z(this),w};let F;this.getAttributes=function(){return F===void 0&&z(this),F};let $=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return $===!1&&($=l.getProgramParameter(C,bA)),$},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=yA++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=X,this.fragmentShader=L,this}let YA=0;class WA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new qA(e),i.set(e,s)),s}}class qA{constructor(e){this.id=YA++,this.code=e,this.usedTimes=0}}function $A(r){return r===yo||r===Nf||r===Of}function KA(r,e,i,s,l,c){const f=new Qv,h=new WA,m=new Set,p=[],_=new Map,b=s.logarithmicDepthBuffer;let g=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(w){return m.add(w),w===0?"uv":`uv${w}`}function C(w,F,$,k,W,de){const se=k.fog,Y=W.geometry,I=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,G=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap,ee=e.get(w.envMap||I,G),me=ee&&ee.mapping===Ff?ee.image.height:null,Ae=y[w.type];w.precision!==null&&(g=s.getMaxPrecision(w.precision),g!==w.precision&&At("WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const P=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,J=P!==void 0?P.length:0;let Te=0;Y.morphAttributes.position!==void 0&&(Te=1),Y.morphAttributes.normal!==void 0&&(Te=2),Y.morphAttributes.color!==void 0&&(Te=3);let De,Pe,oe,Ee;if(Ae){const ct=us[Ae];De=ct.vertexShader,Pe=ct.fragmentShader}else De=w.vertexShader,Pe=w.fragmentShader,h.update(w),oe=h.getVertexShaderID(w),Ee=h.getFragmentShaderID(w);const Ce=r.getRenderTarget(),Ve=r.state.buffers.depth.getReversed(),gt=W.isInstancedMesh===!0,et=W.isBatchedMesh===!0,mn=!!w.map,vt=!!w.matcap,Vt=!!ee,gn=!!w.aoMap,Ct=!!w.lightMap,Xn=!!w.bumpMap,Yt=!!w.normalMap,ui=!!w.displacementMap,H=!!w.emissiveMap,In=!!w.metalnessMap,Mt=!!w.roughnessMap,dn=w.anisotropy>0,Ie=w.clearcoat>0,Sn=w.dispersion>0,O=w.iridescence>0,M=w.sheen>0,Q=w.transmission>0,xe=dn&&!!w.anisotropyMap,be=Ie&&!!w.clearcoatMap,Le=Ie&&!!w.clearcoatNormalMap,Fe=Ie&&!!w.clearcoatRoughnessMap,fe=O&&!!w.iridescenceMap,he=O&&!!w.iridescenceThicknessMap,je=M&&!!w.sheenColorMap,we=M&&!!w.sheenRoughnessMap,Be=!!w.specularMap,Ue=!!w.specularColorMap,dt=!!w.specularIntensityMap,Et=Q&&!!w.transmissionMap,Tt=Q&&!!w.thicknessMap,V=!!w.gradientMap,Re=!!w.alphaMap,pe=w.alphaTest>0,Ge=!!w.alphaHash,ze=!!w.extensions;let Se=hs;w.toneMapped&&(Ce===null||Ce.isXRRenderTarget===!0)&&(Se=r.toneMapping);const tt={shaderID:Ae,shaderType:w.type,shaderName:w.name,vertexShader:De,fragmentShader:Pe,defines:w.defines,customVertexShaderID:oe,customFragmentShaderID:Ee,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,batching:et,batchingColor:et&&W._colorsTexture!==null,instancing:gt,instancingColor:gt&&W.instanceColor!==null,instancingMorph:gt&&W.morphTexture!==null,outputColorSpace:Ce===null?r.outputColorSpace:Ce.isXRRenderTarget===!0?Ce.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!w.alphaToCoverage,map:mn,matcap:vt,envMap:Vt,envMapMode:Vt&&ee.mapping,envMapCubeUVHeight:me,aoMap:gn,lightMap:Ct,bumpMap:Xn,normalMap:Yt,displacementMap:ui,emissiveMap:H,normalMapObjectSpace:Yt&&w.normalMapType===OE,normalMapTangentSpace:Yt&&w.normalMapType===o_,packedNormalMap:Yt&&w.normalMapType===o_&&$A(w.normalMap.format),metalnessMap:In,roughnessMap:Mt,anisotropy:dn,anisotropyMap:xe,clearcoat:Ie,clearcoatMap:be,clearcoatNormalMap:Le,clearcoatRoughnessMap:Fe,dispersion:Sn,iridescence:O,iridescenceMap:fe,iridescenceThicknessMap:he,sheen:M,sheenColorMap:je,sheenRoughnessMap:we,specularMap:Be,specularColorMap:Ue,specularIntensityMap:dt,transmission:Q,transmissionMap:Et,thicknessMap:Tt,gradientMap:V,opaque:w.transparent===!1&&w.blending===Ml&&w.alphaToCoverage===!1,alphaMap:Re,alphaTest:pe,alphaHash:Ge,combine:w.combine,mapUv:mn&&T(w.map.channel),aoMapUv:gn&&T(w.aoMap.channel),lightMapUv:Ct&&T(w.lightMap.channel),bumpMapUv:Xn&&T(w.bumpMap.channel),normalMapUv:Yt&&T(w.normalMap.channel),displacementMapUv:ui&&T(w.displacementMap.channel),emissiveMapUv:H&&T(w.emissiveMap.channel),metalnessMapUv:In&&T(w.metalnessMap.channel),roughnessMapUv:Mt&&T(w.roughnessMap.channel),anisotropyMapUv:xe&&T(w.anisotropyMap.channel),clearcoatMapUv:be&&T(w.clearcoatMap.channel),clearcoatNormalMapUv:Le&&T(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&T(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&T(w.iridescenceMap.channel),iridescenceThicknessMapUv:he&&T(w.iridescenceThicknessMap.channel),sheenColorMapUv:je&&T(w.sheenColorMap.channel),sheenRoughnessMapUv:we&&T(w.sheenRoughnessMap.channel),specularMapUv:Be&&T(w.specularMap.channel),specularColorMapUv:Ue&&T(w.specularColorMap.channel),specularIntensityMapUv:dt&&T(w.specularIntensityMap.channel),transmissionMapUv:Et&&T(w.transmissionMap.channel),thicknessMapUv:Tt&&T(w.thicknessMap.channel),alphaMapUv:Re&&T(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Yt||dn),vertexNormals:!!Y.attributes.normal,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!Y.attributes.uv&&(mn||Re),fog:!!se,useFog:w.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:w.wireframe===!1&&(w.flatShading===!0||Y.attributes.normal===void 0&&Yt===!1&&(w.isMeshLambertMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isMeshPhysicalMaterial)),sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:b,reversedDepthBuffer:Ve,skinning:W.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:Te,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:de.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&$.length>0,shadowMapType:r.shadowMap.type,toneMapping:Se,decodeVideoTexture:mn&&w.map.isVideoTexture===!0&&Jt.getTransfer(w.map.colorSpace)===En,decodeVideoTextureEmissive:H&&w.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(w.emissiveMap.colorSpace)===En,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Xs,flipSided:w.side===ra,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ze&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&w.extensions.multiDraw===!0||et)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return tt.vertexUv1s=m.has(1),tt.vertexUv2s=m.has(2),tt.vertexUv3s=m.has(3),m.clear(),tt}function S(w){const F=[];if(w.shaderID?F.push(w.shaderID):(F.push(w.customVertexShaderID),F.push(w.customFragmentShaderID)),w.defines!==void 0)for(const $ in w.defines)F.push($),F.push(w.defines[$]);return w.isRawShaderMaterial===!1&&(E(F,w),N(F,w),F.push(r.outputColorSpace)),F.push(w.customProgramCacheKey),F.join()}function E(w,F){w.push(F.precision),w.push(F.outputColorSpace),w.push(F.envMapMode),w.push(F.envMapCubeUVHeight),w.push(F.mapUv),w.push(F.alphaMapUv),w.push(F.lightMapUv),w.push(F.aoMapUv),w.push(F.bumpMapUv),w.push(F.normalMapUv),w.push(F.displacementMapUv),w.push(F.emissiveMapUv),w.push(F.metalnessMapUv),w.push(F.roughnessMapUv),w.push(F.anisotropyMapUv),w.push(F.clearcoatMapUv),w.push(F.clearcoatNormalMapUv),w.push(F.clearcoatRoughnessMapUv),w.push(F.iridescenceMapUv),w.push(F.iridescenceThicknessMapUv),w.push(F.sheenColorMapUv),w.push(F.sheenRoughnessMapUv),w.push(F.specularMapUv),w.push(F.specularColorMapUv),w.push(F.specularIntensityMapUv),w.push(F.transmissionMapUv),w.push(F.thicknessMapUv),w.push(F.combine),w.push(F.fogExp2),w.push(F.sizeAttenuation),w.push(F.morphTargetsCount),w.push(F.morphAttributeCount),w.push(F.numDirLights),w.push(F.numPointLights),w.push(F.numSpotLights),w.push(F.numSpotLightMaps),w.push(F.numHemiLights),w.push(F.numRectAreaLights),w.push(F.numDirLightShadows),w.push(F.numPointLightShadows),w.push(F.numSpotLightShadows),w.push(F.numSpotLightShadowsWithMaps),w.push(F.numLightProbes),w.push(F.shadowMapType),w.push(F.toneMapping),w.push(F.numClippingPlanes),w.push(F.numClipIntersection),w.push(F.depthPacking)}function N(w,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),w.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),w.push(f.mask)}function U(w){const F=y[w.type];let $;if(F){const k=us[F];$=mS.clone(k.uniforms)}else $=w.uniforms;return $}function D(w,F){let $=_.get(F);return $!==void 0?++$.usedTimes:($=new XA(r,F,w,l),p.push($),_.set(F,$)),$}function X(w){if(--w.usedTimes===0){const F=p.indexOf(w);p[F]=p[p.length-1],p.pop(),_.delete(w.cacheKey),w.destroy()}}function L(w){h.remove(w)}function z(){h.dispose()}return{getParameters:C,getProgramCacheKey:S,getUniforms:U,acquireProgram:D,releaseProgram:X,releaseShaderCache:L,programs:p,dispose:z}}function ZA(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function QA(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function J_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ev(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let y=0;return g.isInstancedMesh&&(y+=2),g.isSkinnedMesh&&(y+=1),y}function h(g,y,T,C,S,E){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:y,material:T,materialVariant:f(g),groupOrder:C,renderOrder:g.renderOrder,z:S,group:E},r[e]=N):(N.id=g.id,N.object=g,N.geometry=y,N.material=T,N.materialVariant=f(g),N.groupOrder=C,N.renderOrder=g.renderOrder,N.z=S,N.group=E),e++,N}function m(g,y,T,C,S,E){const N=h(g,y,T,C,S,E);T.transmission>0?s.push(N):T.transparent===!0?l.push(N):i.push(N)}function p(g,y,T,C,S,E){const N=h(g,y,T,C,S,E);T.transmission>0?s.unshift(N):T.transparent===!0?l.unshift(N):i.unshift(N)}function _(g,y){i.length>1&&i.sort(g||QA),s.length>1&&s.sort(y||J_),l.length>1&&l.sort(y||J_)}function b(){for(let g=e,y=r.length;g<y;g++){const T=r[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:b,sort:_}}function JA(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new ev,r.set(s,[f])):l>=c.length?(f=new ev,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function ew(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ne,color:new Cn};break;case"SpotLight":i={position:new ne,direction:new ne,color:new Cn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ne,color:new Cn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ne,skyColor:new Cn,groundColor:new Cn};break;case"RectAreaLight":i={color:new Cn,position:new ne,halfWidth:new ne,halfHeight:new ne};break}return r[e.id]=i,i}}}function tw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let nw=0;function iw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function aw(r){const e=new ew,i=tw(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ne);const l=new ne,c=new vi,f=new vi;function h(p){let _=0,b=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let y=0,T=0,C=0,S=0,E=0,N=0,U=0,D=0,X=0,L=0,z=0;p.sort(iw);for(let F=0,$=p.length;F<$;F++){const k=p[F],W=k.color,de=k.intensity,se=k.distance;let Y=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===yo?Y=k.shadow.map.texture:Y=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)_+=W.r*de,b+=W.g*de,g+=W.b*de;else if(k.isLightProbe){for(let I=0;I<9;I++)s.probe[I].addScaledVector(k.sh.coefficients[I],de);z++}else if(k.isDirectionalLight){const I=e.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.directionalShadow[y]=ee,s.directionalShadowMap[y]=Y,s.directionalShadowMatrix[y]=k.shadow.matrix,N++}s.directional[y]=I,y++}else if(k.isSpotLight){const I=e.get(k);I.position.setFromMatrixPosition(k.matrixWorld),I.color.copy(W).multiplyScalar(de),I.distance=se,I.coneCos=Math.cos(k.angle),I.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),I.decay=k.decay,s.spot[C]=I;const G=k.shadow;if(k.map&&(s.spotLightMap[X]=k.map,X++,G.updateMatrices(k),k.castShadow&&L++),s.spotLightMatrix[C]=G.matrix,k.castShadow){const ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.spotShadow[C]=ee,s.spotShadowMap[C]=Y,D++}C++}else if(k.isRectAreaLight){const I=e.get(k);I.color.copy(W).multiplyScalar(de),I.halfWidth.set(k.width*.5,0,0),I.halfHeight.set(0,k.height*.5,0),s.rectArea[S]=I,S++}else if(k.isPointLight){const I=e.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),I.distance=k.distance,I.decay=k.decay,k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,ee.shadowCameraNear=G.camera.near,ee.shadowCameraFar=G.camera.far,s.pointShadow[T]=ee,s.pointShadowMap[T]=Y,s.pointShadowMatrix[T]=k.shadow.matrix,U++}s.point[T]=I,T++}else if(k.isHemisphereLight){const I=e.get(k);I.skyColor.copy(k.color).multiplyScalar(de),I.groundColor.copy(k.groundColor).multiplyScalar(de),s.hemi[E]=I,E++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=qe.LTC_FLOAT_1,s.rectAreaLTC2=qe.LTC_FLOAT_2):(s.rectAreaLTC1=qe.LTC_HALF_1,s.rectAreaLTC2=qe.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=b,s.ambient[2]=g;const w=s.hash;(w.directionalLength!==y||w.pointLength!==T||w.spotLength!==C||w.rectAreaLength!==S||w.hemiLength!==E||w.numDirectionalShadows!==N||w.numPointShadows!==U||w.numSpotShadows!==D||w.numSpotMaps!==X||w.numLightProbes!==z)&&(s.directional.length=y,s.spot.length=C,s.rectArea.length=S,s.point.length=T,s.hemi.length=E,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=D,s.spotShadowMap.length=D,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=D+X-L,s.spotLightMap.length=X,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=z,w.directionalLength=y,w.pointLength=T,w.spotLength=C,w.rectAreaLength=S,w.hemiLength=E,w.numDirectionalShadows=N,w.numPointShadows=U,w.numSpotShadows=D,w.numSpotMaps=X,w.numLightProbes=z,s.version=nw++)}function m(p,_){let b=0,g=0,y=0,T=0,C=0;const S=_.matrixWorldInverse;for(let E=0,N=p.length;E<N;E++){const U=p[E];if(U.isDirectionalLight){const D=s.directional[b];D.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(S),b++}else if(U.isSpotLight){const D=s.spot[y];D.position.setFromMatrixPosition(U.matrixWorld),D.position.applyMatrix4(S),D.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(S),y++}else if(U.isRectAreaLight){const D=s.rectArea[T];D.position.setFromMatrixPosition(U.matrixWorld),D.position.applyMatrix4(S),f.identity(),c.copy(U.matrixWorld),c.premultiply(S),f.extractRotation(c),D.halfWidth.set(U.width*.5,0,0),D.halfHeight.set(0,U.height*.5,0),D.halfWidth.applyMatrix4(f),D.halfHeight.applyMatrix4(f),T++}else if(U.isPointLight){const D=s.point[g];D.position.setFromMatrixPosition(U.matrixWorld),D.position.applyMatrix4(S),g++}else if(U.isHemisphereLight){const D=s.hemi[C];D.direction.setFromMatrixPosition(U.matrixWorld),D.direction.transformDirection(S),C++}}}return{setup:h,setupView:m,state:s}}function tv(r){const e=new aw(r),i=[],s=[],l=[];function c(g){b.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function _(g){e.setupView(i,g)}const b={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:b,setupLights:p,setupLightsView:_,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function sw(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new tv(r),e.set(l,[h])):c>=f.length?(h=new tv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const rw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ow=`uniform sampler2D shadow_pass;
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
}`,lw=[new ne(1,0,0),new ne(-1,0,0),new ne(0,1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1)],cw=[new ne(0,-1,0),new ne(0,-1,0),new ne(0,0,1),new ne(0,0,-1),new ne(0,-1,0),new ne(0,-1,0)],nv=new vi,Mc=new ne,gp=new ne;function uw(r,e,i){let s=new ib;const l=new Xt,c=new Xt,f=new li,h=new vS,m=new bS,p={},_=i.maxTextureSize,b={[Fr]:ra,[ra]:Fr,[Xs]:Xs},g=new _s({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:rw,fragmentShader:ow}),y=g.clone();y.defines.HORIZONTAL_PASS=1;const T=new vs;T.setAttribute("position",new ms(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new xs(T,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vf;let E=this.type;this.render=function(L,z,w){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||L.length===0)return;this.type===lE&&(At("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vf);const F=r.getRenderTarget(),$=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),W=r.state;W.setBlending(Ws),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const de=E!==this.type;de&&z.traverse(function(se){se.material&&(Array.isArray(se.material)?se.material.forEach(Y=>Y.needsUpdate=!0):se.material.needsUpdate=!0)});for(let se=0,Y=L.length;se<Y;se++){const I=L[se],G=I.shadow;if(G===void 0){At("WebGLShadowMap:",I,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ee=G.getFrameExtents();l.multiply(ee),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ee.x),l.x=c.x*ee.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ee.y),l.y=c.y*ee.y,G.mapSize.y=c.y));const me=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=me,G.map===null||de===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Rc){if(I.isPointLight){At("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new ps(l.x,l.y,{format:yo,type:$s,minFilter:Xi,magFilter:Xi,generateMipmaps:!1}),G.map.texture.name=I.name+".shadowMap",G.map.depthTexture=new Rl(l.x,l.y,fs),G.map.depthTexture.name=I.name+".shadowMapDepth",G.map.depthTexture.format=Ks,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Bi,G.map.depthTexture.magFilter=Bi}else I.isPointLight?(G.map=new fb(l.x),G.map.depthTexture=new hS(l.x,gs)):(G.map=new ps(l.x,l.y),G.map.depthTexture=new Rl(l.x,l.y,gs)),G.map.depthTexture.name=I.name+".shadowMap",G.map.depthTexture.format=Ks,this.type===vf?(G.map.depthTexture.compareFunction=me?Tm:Mm,G.map.depthTexture.minFilter=Xi,G.map.depthTexture.magFilter=Xi):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Bi,G.map.depthTexture.magFilter=Bi);G.camera.updateProjectionMatrix()}const Ae=G.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Ae;P++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,P),r.clear();else{P===0&&(r.setRenderTarget(G.map),r.clear());const J=G.getViewport(P);f.set(c.x*J.x,c.y*J.y,c.x*J.z,c.y*J.w),W.viewport(f)}if(I.isPointLight){const J=G.camera,Te=G.matrix,De=I.distance||J.far;De!==J.far&&(J.far=De,J.updateProjectionMatrix()),Mc.setFromMatrixPosition(I.matrixWorld),J.position.copy(Mc),gp.copy(J.position),gp.add(lw[P]),J.up.copy(cw[P]),J.lookAt(gp),J.updateMatrixWorld(),Te.makeTranslation(-Mc.x,-Mc.y,-Mc.z),nv.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),G._frustum.setFromProjectionMatrix(nv,J.coordinateSystem,J.reversedDepth)}else G.updateMatrices(I);s=G.getFrustum(),D(z,w,G.camera,I,this.type)}G.isPointLightShadow!==!0&&this.type===Rc&&N(G,w),G.needsUpdate=!1}E=this.type,S.needsUpdate=!1,r.setRenderTarget(F,$,k)};function N(L,z){const w=e.update(C);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,y.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,y.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new ps(l.x,l.y,{format:yo,type:$s})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(z,null,w,g,C,null),y.uniforms.shadow_pass.value=L.mapPass.texture,y.uniforms.resolution.value=L.mapSize,y.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(z,null,w,y,C,null)}function U(L,z,w,F){let $=null;const k=w.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(k!==void 0)$=k;else if($=w.isPointLight===!0?m:h,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const W=$.uuid,de=z.uuid;let se=p[W];se===void 0&&(se={},p[W]=se);let Y=se[de];Y===void 0&&(Y=$.clone(),se[de]=Y,z.addEventListener("dispose",X)),$=Y}if($.visible=z.visible,$.wireframe=z.wireframe,F===Rc?$.side=z.shadowSide!==null?z.shadowSide:z.side:$.side=z.shadowSide!==null?z.shadowSide:b[z.side],$.alphaMap=z.alphaMap,$.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,$.map=z.map,$.clipShadows=z.clipShadows,$.clippingPlanes=z.clippingPlanes,$.clipIntersection=z.clipIntersection,$.displacementMap=z.displacementMap,$.displacementScale=z.displacementScale,$.displacementBias=z.displacementBias,$.wireframeLinewidth=z.wireframeLinewidth,$.linewidth=z.linewidth,w.isPointLight===!0&&$.isMeshDistanceMaterial===!0){const W=r.properties.get($);W.light=w}return $}function D(L,z,w,F,$){if(L.visible===!1)return;if(L.layers.test(z.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&$===Rc)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,L.matrixWorld);const de=e.update(L),se=L.material;if(Array.isArray(se)){const Y=de.groups;for(let I=0,G=Y.length;I<G;I++){const ee=Y[I],me=se[ee.materialIndex];if(me&&me.visible){const Ae=U(L,me,F,$);L.onBeforeShadow(r,L,z,w,de,Ae,ee),r.renderBufferDirect(w,null,de,Ae,L,ee),L.onAfterShadow(r,L,z,w,de,Ae,ee)}}}else if(se.visible){const Y=U(L,se,F,$);L.onBeforeShadow(r,L,z,w,de,Y,null),r.renderBufferDirect(w,null,de,Y,L,null),L.onAfterShadow(r,L,z,w,de,Y,null)}}const W=L.children;for(let de=0,se=W.length;de<se;de++)D(W[de],z,w,F,$)}function X(L){L.target.removeEventListener("dispose",X);for(const w in p){const F=p[w],$=L.target.uuid;$ in F&&(F[$].dispose(),delete F[$])}}}function fw(r,e){function i(){let V=!1;const Re=new li;let pe=null;const Ge=new li(0,0,0,0);return{setMask:function(ze){pe!==ze&&!V&&(r.colorMask(ze,ze,ze,ze),pe=ze)},setLocked:function(ze){V=ze},setClear:function(ze,Se,tt,ct,Ln){Ln===!0&&(ze*=ct,Se*=ct,tt*=ct),Re.set(ze,Se,tt,ct),Ge.equals(Re)===!1&&(r.clearColor(ze,Se,tt,ct),Ge.copy(Re))},reset:function(){V=!1,pe=null,Ge.set(-1,0,0,0)}}}function s(){let V=!1,Re=!1,pe=null,Ge=null,ze=null;return{setReversed:function(Se){if(Re!==Se){const tt=e.get("EXT_clip_control");Se?tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.ZERO_TO_ONE_EXT):tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.NEGATIVE_ONE_TO_ONE_EXT),Re=Se;const ct=ze;ze=null,this.setClear(ct)}},getReversed:function(){return Re},setTest:function(Se){Se?Ce(r.DEPTH_TEST):Ve(r.DEPTH_TEST)},setMask:function(Se){pe!==Se&&!V&&(r.depthMask(Se),pe=Se)},setFunc:function(Se){if(Re&&(Se=HE[Se]),Ge!==Se){switch(Se){case Tp:r.depthFunc(r.NEVER);break;case Ap:r.depthFunc(r.ALWAYS);break;case wp:r.depthFunc(r.LESS);break;case Al:r.depthFunc(r.LEQUAL);break;case Rp:r.depthFunc(r.EQUAL);break;case Cp:r.depthFunc(r.GEQUAL);break;case Np:r.depthFunc(r.GREATER);break;case Op:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ge=Se}},setLocked:function(Se){V=Se},setClear:function(Se){ze!==Se&&(ze=Se,Re&&(Se=1-Se),r.clearDepth(Se))},reset:function(){V=!1,pe=null,Ge=null,ze=null,Re=!1}}}function l(){let V=!1,Re=null,pe=null,Ge=null,ze=null,Se=null,tt=null,ct=null,Ln=null;return{setTest:function(tn){V||(tn?Ce(r.STENCIL_TEST):Ve(r.STENCIL_TEST))},setMask:function(tn){Re!==tn&&!V&&(r.stencilMask(tn),Re=tn)},setFunc:function(tn,$i,Yn){(pe!==tn||Ge!==$i||ze!==Yn)&&(r.stencilFunc(tn,$i,Yn),pe=tn,Ge=$i,ze=Yn)},setOp:function(tn,$i,Yn){(Se!==tn||tt!==$i||ct!==Yn)&&(r.stencilOp(tn,$i,Yn),Se=tn,tt=$i,ct=Yn)},setLocked:function(tn){V=tn},setClear:function(tn){Ln!==tn&&(r.clearStencil(tn),Ln=tn)},reset:function(){V=!1,Re=null,pe=null,Ge=null,ze=null,Se=null,tt=null,ct=null,Ln=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let _={},b={},g={},y=new WeakMap,T=[],C=null,S=!1,E=null,N=null,U=null,D=null,X=null,L=null,z=null,w=new Cn(0,0,0),F=0,$=!1,k=null,W=null,de=null,se=null,Y=null;const I=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ee=0;const me=r.getParameter(r.VERSION);me.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(me)[1]),G=ee>=1):me.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(me)[1]),G=ee>=2);let Ae=null,P={};const J=r.getParameter(r.SCISSOR_BOX),Te=r.getParameter(r.VIEWPORT),De=new li().fromArray(J),Pe=new li().fromArray(Te);function oe(V,Re,pe,Ge){const ze=new Uint8Array(4),Se=r.createTexture();r.bindTexture(V,Se),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let tt=0;tt<pe;tt++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(Re,0,r.RGBA,1,1,Ge,0,r.RGBA,r.UNSIGNED_BYTE,ze):r.texImage2D(Re+tt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ze);return Se}const Ee={};Ee[r.TEXTURE_2D]=oe(r.TEXTURE_2D,r.TEXTURE_2D,1),Ee[r.TEXTURE_CUBE_MAP]=oe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[r.TEXTURE_2D_ARRAY]=oe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ee[r.TEXTURE_3D]=oe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Ce(r.DEPTH_TEST),f.setFunc(Al),Xn(!1),Yt(i_),Ce(r.CULL_FACE),gn(Ws);function Ce(V){_[V]!==!0&&(r.enable(V),_[V]=!0)}function Ve(V){_[V]!==!1&&(r.disable(V),_[V]=!1)}function gt(V,Re){return g[V]!==Re?(r.bindFramebuffer(V,Re),g[V]=Re,V===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Re),V===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Re),!0):!1}function et(V,Re){let pe=T,Ge=!1;if(V){pe=y.get(Re),pe===void 0&&(pe=[],y.set(Re,pe));const ze=V.textures;if(pe.length!==ze.length||pe[0]!==r.COLOR_ATTACHMENT0){for(let Se=0,tt=ze.length;Se<tt;Se++)pe[Se]=r.COLOR_ATTACHMENT0+Se;pe.length=ze.length,Ge=!0}}else pe[0]!==r.BACK&&(pe[0]=r.BACK,Ge=!0);Ge&&r.drawBuffers(pe)}function mn(V){return C!==V?(r.useProgram(V),C=V,!0):!1}const vt={[go]:r.FUNC_ADD,[uE]:r.FUNC_SUBTRACT,[fE]:r.FUNC_REVERSE_SUBTRACT};vt[dE]=r.MIN,vt[hE]=r.MAX;const Vt={[pE]:r.ZERO,[mE]:r.ONE,[gE]:r.SRC_COLOR,[Sp]:r.SRC_ALPHA,[EE]:r.SRC_ALPHA_SATURATE,[bE]:r.DST_COLOR,[_E]:r.DST_ALPHA,[xE]:r.ONE_MINUS_SRC_COLOR,[Mp]:r.ONE_MINUS_SRC_ALPHA,[yE]:r.ONE_MINUS_DST_COLOR,[vE]:r.ONE_MINUS_DST_ALPHA,[SE]:r.CONSTANT_COLOR,[ME]:r.ONE_MINUS_CONSTANT_COLOR,[TE]:r.CONSTANT_ALPHA,[AE]:r.ONE_MINUS_CONSTANT_ALPHA};function gn(V,Re,pe,Ge,ze,Se,tt,ct,Ln,tn){if(V===Ws){S===!0&&(Ve(r.BLEND),S=!1);return}if(S===!1&&(Ce(r.BLEND),S=!0),V!==cE){if(V!==E||tn!==$){if((N!==go||X!==go)&&(r.blendEquation(r.FUNC_ADD),N=go,X=go),tn)switch(V){case Ml:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case a_:r.blendFunc(r.ONE,r.ONE);break;case s_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case r_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:rn("WebGLState: Invalid blending: ",V);break}else switch(V){case Ml:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case a_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case s_:rn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case r_:rn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rn("WebGLState: Invalid blending: ",V);break}U=null,D=null,L=null,z=null,w.set(0,0,0),F=0,E=V,$=tn}return}ze=ze||Re,Se=Se||pe,tt=tt||Ge,(Re!==N||ze!==X)&&(r.blendEquationSeparate(vt[Re],vt[ze]),N=Re,X=ze),(pe!==U||Ge!==D||Se!==L||tt!==z)&&(r.blendFuncSeparate(Vt[pe],Vt[Ge],Vt[Se],Vt[tt]),U=pe,D=Ge,L=Se,z=tt),(ct.equals(w)===!1||Ln!==F)&&(r.blendColor(ct.r,ct.g,ct.b,Ln),w.copy(ct),F=Ln),E=V,$=!1}function Ct(V,Re){V.side===Xs?Ve(r.CULL_FACE):Ce(r.CULL_FACE);let pe=V.side===ra;Re&&(pe=!pe),Xn(pe),V.blending===Ml&&V.transparent===!1?gn(Ws):gn(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const Ge=V.stencilWrite;h.setTest(Ge),Ge&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),H(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Ce(r.SAMPLE_ALPHA_TO_COVERAGE):Ve(r.SAMPLE_ALPHA_TO_COVERAGE)}function Xn(V){k!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),k=V)}function Yt(V){V!==rE?(Ce(r.CULL_FACE),V!==W&&(V===i_?r.cullFace(r.BACK):V===oE?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ve(r.CULL_FACE),W=V}function ui(V){V!==de&&(G&&r.lineWidth(V),de=V)}function H(V,Re,pe){V?(Ce(r.POLYGON_OFFSET_FILL),(se!==Re||Y!==pe)&&(se=Re,Y=pe,f.getReversed()&&(Re=-Re),r.polygonOffset(Re,pe))):Ve(r.POLYGON_OFFSET_FILL)}function In(V){V?Ce(r.SCISSOR_TEST):Ve(r.SCISSOR_TEST)}function Mt(V){V===void 0&&(V=r.TEXTURE0+I-1),Ae!==V&&(r.activeTexture(V),Ae=V)}function dn(V,Re,pe){pe===void 0&&(Ae===null?pe=r.TEXTURE0+I-1:pe=Ae);let Ge=P[pe];Ge===void 0&&(Ge={type:void 0,texture:void 0},P[pe]=Ge),(Ge.type!==V||Ge.texture!==Re)&&(Ae!==pe&&(r.activeTexture(pe),Ae=pe),r.bindTexture(V,Re||Ee[V]),Ge.type=V,Ge.texture=Re)}function Ie(){const V=P[Ae];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Sn(){try{r.compressedTexImage2D(...arguments)}catch(V){rn("WebGLState:",V)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(V){rn("WebGLState:",V)}}function M(){try{r.texSubImage2D(...arguments)}catch(V){rn("WebGLState:",V)}}function Q(){try{r.texSubImage3D(...arguments)}catch(V){rn("WebGLState:",V)}}function xe(){try{r.compressedTexSubImage2D(...arguments)}catch(V){rn("WebGLState:",V)}}function be(){try{r.compressedTexSubImage3D(...arguments)}catch(V){rn("WebGLState:",V)}}function Le(){try{r.texStorage2D(...arguments)}catch(V){rn("WebGLState:",V)}}function Fe(){try{r.texStorage3D(...arguments)}catch(V){rn("WebGLState:",V)}}function fe(){try{r.texImage2D(...arguments)}catch(V){rn("WebGLState:",V)}}function he(){try{r.texImage3D(...arguments)}catch(V){rn("WebGLState:",V)}}function je(V){return b[V]!==void 0?b[V]:r.getParameter(V)}function we(V,Re){b[V]!==Re&&(r.pixelStorei(V,Re),b[V]=Re)}function Be(V){De.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),De.copy(V))}function Ue(V){Pe.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),Pe.copy(V))}function dt(V,Re){let pe=p.get(Re);pe===void 0&&(pe=new WeakMap,p.set(Re,pe));let Ge=pe.get(V);Ge===void 0&&(Ge=r.getUniformBlockIndex(Re,V.name),pe.set(V,Ge))}function Et(V,Re){const Ge=p.get(Re).get(V);m.get(Re)!==Ge&&(r.uniformBlockBinding(Re,Ge,V.__bindingPointIndex),m.set(Re,Ge))}function Tt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},b={},Ae=null,P={},g={},y=new WeakMap,T=[],C=null,S=!1,E=null,N=null,U=null,D=null,X=null,L=null,z=null,w=new Cn(0,0,0),F=0,$=!1,k=null,W=null,de=null,se=null,Y=null,De.set(0,0,r.canvas.width,r.canvas.height),Pe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Ce,disable:Ve,bindFramebuffer:gt,drawBuffers:et,useProgram:mn,setBlending:gn,setMaterial:Ct,setFlipSided:Xn,setCullFace:Yt,setLineWidth:ui,setPolygonOffset:H,setScissorTest:In,activeTexture:Mt,bindTexture:dn,unbindTexture:Ie,compressedTexImage2D:Sn,compressedTexImage3D:O,texImage2D:fe,texImage3D:he,pixelStorei:we,getParameter:je,updateUBOMapping:dt,uniformBlockBinding:Et,texStorage2D:Le,texStorage3D:Fe,texSubImage2D:M,texSubImage3D:Q,compressedTexSubImage2D:xe,compressedTexSubImage3D:be,scissor:Be,viewport:Ue,reset:Tt}}function dw(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Xt,_=new WeakMap,b=new Set;let g;const y=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(O,M){return T?new OffscreenCanvas(O,M):Lc("canvas")}function S(O,M,Q){let xe=1;const be=Sn(O);if((be.width>Q||be.height>Q)&&(xe=Q/Math.max(be.width,be.height)),xe<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Le=Math.floor(xe*be.width),Fe=Math.floor(xe*be.height);g===void 0&&(g=C(Le,Fe));const fe=M?C(Le,Fe):g;return fe.width=Le,fe.height=Fe,fe.getContext("2d").drawImage(O,0,0,Le,Fe),At("WebGLRenderer: Texture has been resized from ("+be.width+"x"+be.height+") to ("+Le+"x"+Fe+")."),fe}else return"data"in O&&At("WebGLRenderer: Image in DataTexture is too big ("+be.width+"x"+be.height+")."),O;return O}function E(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function U(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(O,M,Q,xe,be,Le=!1){if(O!==null){if(r[O]!==void 0)return r[O];At("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Fe;xe&&(Fe=e.get("EXT_texture_norm16"),Fe||At("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let fe=M;if(M===r.RED&&(Q===r.FLOAT&&(fe=r.R32F),Q===r.HALF_FLOAT&&(fe=r.R16F),Q===r.UNSIGNED_BYTE&&(fe=r.R8),Q===r.UNSIGNED_SHORT&&Fe&&(fe=Fe.R16_EXT),Q===r.SHORT&&Fe&&(fe=Fe.R16_SNORM_EXT)),M===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(fe=r.R8UI),Q===r.UNSIGNED_SHORT&&(fe=r.R16UI),Q===r.UNSIGNED_INT&&(fe=r.R32UI),Q===r.BYTE&&(fe=r.R8I),Q===r.SHORT&&(fe=r.R16I),Q===r.INT&&(fe=r.R32I)),M===r.RG&&(Q===r.FLOAT&&(fe=r.RG32F),Q===r.HALF_FLOAT&&(fe=r.RG16F),Q===r.UNSIGNED_BYTE&&(fe=r.RG8),Q===r.UNSIGNED_SHORT&&Fe&&(fe=Fe.RG16_EXT),Q===r.SHORT&&Fe&&(fe=Fe.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(fe=r.RG8UI),Q===r.UNSIGNED_SHORT&&(fe=r.RG16UI),Q===r.UNSIGNED_INT&&(fe=r.RG32UI),Q===r.BYTE&&(fe=r.RG8I),Q===r.SHORT&&(fe=r.RG16I),Q===r.INT&&(fe=r.RG32I)),M===r.RGB_INTEGER&&(Q===r.UNSIGNED_BYTE&&(fe=r.RGB8UI),Q===r.UNSIGNED_SHORT&&(fe=r.RGB16UI),Q===r.UNSIGNED_INT&&(fe=r.RGB32UI),Q===r.BYTE&&(fe=r.RGB8I),Q===r.SHORT&&(fe=r.RGB16I),Q===r.INT&&(fe=r.RGB32I)),M===r.RGBA_INTEGER&&(Q===r.UNSIGNED_BYTE&&(fe=r.RGBA8UI),Q===r.UNSIGNED_SHORT&&(fe=r.RGBA16UI),Q===r.UNSIGNED_INT&&(fe=r.RGBA32UI),Q===r.BYTE&&(fe=r.RGBA8I),Q===r.SHORT&&(fe=r.RGBA16I),Q===r.INT&&(fe=r.RGBA32I)),M===r.RGB&&(Q===r.UNSIGNED_SHORT&&Fe&&(fe=Fe.RGB16_EXT),Q===r.SHORT&&Fe&&(fe=Fe.RGB16_SNORM_EXT),Q===r.UNSIGNED_INT_5_9_9_9_REV&&(fe=r.RGB9_E5),Q===r.UNSIGNED_INT_10F_11F_11F_REV&&(fe=r.R11F_G11F_B10F)),M===r.RGBA){const he=Le?Lf:Jt.getTransfer(be);Q===r.FLOAT&&(fe=r.RGBA32F),Q===r.HALF_FLOAT&&(fe=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(fe=he===En?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT&&Fe&&(fe=Fe.RGBA16_EXT),Q===r.SHORT&&Fe&&(fe=Fe.RGBA16_SNORM_EXT),Q===r.UNSIGNED_SHORT_4_4_4_4&&(fe=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(fe=r.RGB5_A1)}return(fe===r.R16F||fe===r.R32F||fe===r.RG16F||fe===r.RG32F||fe===r.RGBA16F||fe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function X(O,M){let Q;return O?M===null||M===gs||M===Dc?Q=r.DEPTH24_STENCIL8:M===fs?Q=r.DEPTH32F_STENCIL8:M===Oc&&(Q=r.DEPTH24_STENCIL8,At("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===gs||M===Dc?Q=r.DEPTH_COMPONENT24:M===fs?Q=r.DEPTH_COMPONENT32F:M===Oc&&(Q=r.DEPTH_COMPONENT16),Q}function L(O,M){return E(O)===!0||O.isFramebufferTexture&&O.minFilter!==Bi&&O.minFilter!==Xi?Math.log2(Math.max(M.width,M.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?M.mipmaps.length:1}function z(O){const M=O.target;M.removeEventListener("dispose",z),F(M),M.isVideoTexture&&_.delete(M),M.isHTMLTexture&&b.delete(M)}function w(O){const M=O.target;M.removeEventListener("dispose",w),k(M)}function F(O){const M=s.get(O);if(M.__webglInit===void 0)return;const Q=O.source,xe=y.get(Q);if(xe){const be=xe[M.__cacheKey];be.usedTimes--,be.usedTimes===0&&$(O),Object.keys(xe).length===0&&y.delete(Q)}s.remove(O)}function $(O){const M=s.get(O);r.deleteTexture(M.__webglTexture);const Q=O.source,xe=y.get(Q);delete xe[M.__cacheKey],f.memory.textures--}function k(O){const M=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++){if(Array.isArray(M.__webglFramebuffer[xe]))for(let be=0;be<M.__webglFramebuffer[xe].length;be++)r.deleteFramebuffer(M.__webglFramebuffer[xe][be]);else r.deleteFramebuffer(M.__webglFramebuffer[xe]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[xe])}else{if(Array.isArray(M.__webglFramebuffer))for(let xe=0;xe<M.__webglFramebuffer.length;xe++)r.deleteFramebuffer(M.__webglFramebuffer[xe]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let xe=0;xe<M.__webglColorRenderbuffer.length;xe++)M.__webglColorRenderbuffer[xe]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[xe]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const Q=O.textures;for(let xe=0,be=Q.length;xe<be;xe++){const Le=s.get(Q[xe]);Le.__webglTexture&&(r.deleteTexture(Le.__webglTexture),f.memory.textures--),s.remove(Q[xe])}s.remove(O)}let W=0;function de(){W=0}function se(){return W}function Y(O){W=O}function I(){const O=W;return O>=l.maxTextures&&At("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),W+=1,O}function G(O){const M=[];return M.push(O.wrapS),M.push(O.wrapT),M.push(O.wrapR||0),M.push(O.magFilter),M.push(O.minFilter),M.push(O.anisotropy),M.push(O.internalFormat),M.push(O.format),M.push(O.type),M.push(O.generateMipmaps),M.push(O.premultiplyAlpha),M.push(O.flipY),M.push(O.unpackAlignment),M.push(O.colorSpace),M.join()}function ee(O,M){const Q=s.get(O);if(O.isVideoTexture&&dn(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&Q.__version!==O.version){const xe=O.image;if(xe===null)At("WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)At("WebGLRenderer: Texture marked for update but image is incomplete");else{Ve(Q,O,M);return}}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+M)}function me(O,M){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){Ve(Q,O,M);return}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+M)}function Ae(O,M){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){Ve(Q,O,M);return}i.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+M)}function P(O,M){const Q=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&Q.__version!==O.version){gt(Q,O,M);return}i.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+M)}const J={[Dp]:r.REPEAT,[Ys]:r.CLAMP_TO_EDGE,[Lp]:r.MIRRORED_REPEAT},Te={[Bi]:r.NEAREST,[CE]:r.NEAREST_MIPMAP_NEAREST,[Wu]:r.NEAREST_MIPMAP_LINEAR,[Xi]:r.LINEAR,[Gh]:r.LINEAR_MIPMAP_NEAREST,[_o]:r.LINEAR_MIPMAP_LINEAR},De={[DE]:r.NEVER,[FE]:r.ALWAYS,[LE]:r.LESS,[Mm]:r.LEQUAL,[IE]:r.EQUAL,[Tm]:r.GEQUAL,[UE]:r.GREATER,[PE]:r.NOTEQUAL};function Pe(O,M){if(M.type===fs&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Xi||M.magFilter===Gh||M.magFilter===Wu||M.magFilter===_o||M.minFilter===Xi||M.minFilter===Gh||M.minFilter===Wu||M.minFilter===_o)&&At("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,J[M.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,J[M.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,J[M.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,Te[M.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,Te[M.minFilter]),M.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,De[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Bi||M.minFilter!==Wu&&M.minFilter!==_o||M.type===fs&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function oe(O,M){let Q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,M.addEventListener("dispose",z));const xe=M.source;let be=y.get(xe);be===void 0&&(be={},y.set(xe,be));const Le=G(M);if(Le!==O.__cacheKey){be[Le]===void 0&&(be[Le]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,Q=!0),be[Le].usedTimes++;const Fe=be[O.__cacheKey];Fe!==void 0&&(be[O.__cacheKey].usedTimes--,Fe.usedTimes===0&&$(M)),O.__cacheKey=Le,O.__webglTexture=be[Le].texture}return Q}function Ee(O,M,Q){return Math.floor(Math.floor(O/Q)/M)}function Ce(O,M,Q,xe){const Le=O.updateRanges;if(Le.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,Q,xe,M.data);else{Le.sort((we,Be)=>we.start-Be.start);let Fe=0;for(let we=1;we<Le.length;we++){const Be=Le[Fe],Ue=Le[we],dt=Be.start+Be.count,Et=Ee(Ue.start,M.width,4),Tt=Ee(Be.start,M.width,4);Ue.start<=dt+1&&Et===Tt&&Ee(Ue.start+Ue.count-1,M.width,4)===Et?Be.count=Math.max(Be.count,Ue.start+Ue.count-Be.start):(++Fe,Le[Fe]=Ue)}Le.length=Fe+1;const fe=i.getParameter(r.UNPACK_ROW_LENGTH),he=i.getParameter(r.UNPACK_SKIP_PIXELS),je=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let we=0,Be=Le.length;we<Be;we++){const Ue=Le[we],dt=Math.floor(Ue.start/4),Et=Math.ceil(Ue.count/4),Tt=dt%M.width,V=Math.floor(dt/M.width),Re=Et,pe=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(r.UNPACK_SKIP_ROWS,V),i.texSubImage2D(r.TEXTURE_2D,0,Tt,V,Re,pe,Q,xe,M.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,fe),i.pixelStorei(r.UNPACK_SKIP_PIXELS,he),i.pixelStorei(r.UNPACK_SKIP_ROWS,je)}}function Ve(O,M,Q){let xe=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(xe=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(xe=r.TEXTURE_3D);const be=oe(O,M),Le=M.source;i.bindTexture(xe,O.__webglTexture,r.TEXTURE0+Q);const Fe=s.get(Le);if(Le.version!==Fe.__version||be===!0){if(i.activeTexture(r.TEXTURE0+Q),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const pe=Jt.getPrimaries(Jt.workingColorSpace),Ge=M.colorSpace===Ir?null:Jt.getPrimaries(M.colorSpace),ze=M.colorSpace===Ir||pe===Ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze)}i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let he=S(M.image,!1,l.maxTextureSize);he=Ie(M,he);const je=c.convert(M.format,M.colorSpace),we=c.convert(M.type);let Be=D(M.internalFormat,je,we,M.normalized,M.colorSpace,M.isVideoTexture);Pe(xe,M);let Ue;const dt=M.mipmaps,Et=M.isVideoTexture!==!0,Tt=Fe.__version===void 0||be===!0,V=Le.dataReady,Re=L(M,he);if(M.isDepthTexture)Be=X(M.format===vo,M.type),Tt&&(Et?i.texStorage2D(r.TEXTURE_2D,1,Be,he.width,he.height):i.texImage2D(r.TEXTURE_2D,0,Be,he.width,he.height,0,je,we,null));else if(M.isDataTexture)if(dt.length>0){Et&&Tt&&i.texStorage2D(r.TEXTURE_2D,Re,Be,dt[0].width,dt[0].height);for(let pe=0,Ge=dt.length;pe<Ge;pe++)Ue=dt[pe],Et?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Ue.width,Ue.height,je,we,Ue.data):i.texImage2D(r.TEXTURE_2D,pe,Be,Ue.width,Ue.height,0,je,we,Ue.data);M.generateMipmaps=!1}else Et?(Tt&&i.texStorage2D(r.TEXTURE_2D,Re,Be,he.width,he.height),V&&Ce(M,he,je,we)):i.texImage2D(r.TEXTURE_2D,0,Be,he.width,he.height,0,je,we,he.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Et&&Tt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Be,dt[0].width,dt[0].height,he.depth);for(let pe=0,Ge=dt.length;pe<Ge;pe++)if(Ue=dt[pe],M.format!==Ka)if(je!==null)if(Et){if(V)if(M.layerUpdates.size>0){const ze=L_(Ue.width,Ue.height,M.format,M.type);for(const Se of M.layerUpdates){const tt=Ue.data.subarray(Se*ze/Ue.data.BYTES_PER_ELEMENT,(Se+1)*ze/Ue.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,Se,Ue.width,Ue.height,1,je,tt)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Ue.width,Ue.height,he.depth,je,Ue.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,Be,Ue.width,Ue.height,he.depth,0,Ue.data,0,0);else At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Et?V&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Ue.width,Ue.height,he.depth,je,we,Ue.data):i.texImage3D(r.TEXTURE_2D_ARRAY,pe,Be,Ue.width,Ue.height,he.depth,0,je,we,Ue.data)}else{Et&&Tt&&i.texStorage2D(r.TEXTURE_2D,Re,Be,dt[0].width,dt[0].height);for(let pe=0,Ge=dt.length;pe<Ge;pe++)Ue=dt[pe],M.format!==Ka?je!==null?Et?V&&i.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,Ue.width,Ue.height,je,Ue.data):i.compressedTexImage2D(r.TEXTURE_2D,pe,Be,Ue.width,Ue.height,0,Ue.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Et?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Ue.width,Ue.height,je,we,Ue.data):i.texImage2D(r.TEXTURE_2D,pe,Be,Ue.width,Ue.height,0,je,we,Ue.data)}else if(M.isDataArrayTexture)if(Et){if(Tt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Be,he.width,he.height,he.depth),V)if(M.layerUpdates.size>0){const pe=L_(he.width,he.height,M.format,M.type);for(const Ge of M.layerUpdates){const ze=he.data.subarray(Ge*pe/he.data.BYTES_PER_ELEMENT,(Ge+1)*pe/he.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ge,he.width,he.height,1,je,we,ze)}M.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,je,we,he.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Be,he.width,he.height,he.depth,0,je,we,he.data);else if(M.isData3DTexture)Et?(Tt&&i.texStorage3D(r.TEXTURE_3D,Re,Be,he.width,he.height,he.depth),V&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,je,we,he.data)):i.texImage3D(r.TEXTURE_3D,0,Be,he.width,he.height,he.depth,0,je,we,he.data);else if(M.isFramebufferTexture){if(Tt)if(Et)i.texStorage2D(r.TEXTURE_2D,Re,Be,he.width,he.height);else{let pe=he.width,Ge=he.height;for(let ze=0;ze<Re;ze++)i.texImage2D(r.TEXTURE_2D,ze,Be,pe,Ge,0,je,we,null),pe>>=1,Ge>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const pe=r.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),he.parentNode!==pe){pe.appendChild(he),b.add(M),pe.onpaint=ct=>{const Ln=ct.changedElements;for(const tn of b)Ln.includes(tn.image)&&(tn.needsUpdate=!0)},pe.requestPaint();return}const Ge=0,ze=r.RGBA,Se=r.RGBA,tt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Ge,ze,Se,tt,he),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(dt.length>0){if(Et&&Tt){const pe=Sn(dt[0]);i.texStorage2D(r.TEXTURE_2D,Re,Be,pe.width,pe.height)}for(let pe=0,Ge=dt.length;pe<Ge;pe++)Ue=dt[pe],Et?V&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,je,we,Ue):i.texImage2D(r.TEXTURE_2D,pe,Be,je,we,Ue);M.generateMipmaps=!1}else if(Et){if(Tt){const pe=Sn(he);i.texStorage2D(r.TEXTURE_2D,Re,Be,pe.width,pe.height)}V&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,je,we,he)}else i.texImage2D(r.TEXTURE_2D,0,Be,je,we,he);E(M)&&N(xe),Fe.__version=Le.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function gt(O,M,Q){if(M.image.length!==6)return;const xe=oe(O,M),be=M.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+Q);const Le=s.get(be);if(be.version!==Le.__version||xe===!0){i.activeTexture(r.TEXTURE0+Q);const Fe=Jt.getPrimaries(Jt.workingColorSpace),fe=M.colorSpace===Ir?null:Jt.getPrimaries(M.colorSpace),he=M.colorSpace===Ir||Fe===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const je=M.isCompressedTexture||M.image[0].isCompressedTexture,we=M.image[0]&&M.image[0].isDataTexture,Be=[];for(let Se=0;Se<6;Se++)!je&&!we?Be[Se]=S(M.image[Se],!0,l.maxCubemapSize):Be[Se]=we?M.image[Se].image:M.image[Se],Be[Se]=Ie(M,Be[Se]);const Ue=Be[0],dt=c.convert(M.format,M.colorSpace),Et=c.convert(M.type),Tt=D(M.internalFormat,dt,Et,M.normalized,M.colorSpace),V=M.isVideoTexture!==!0,Re=Le.__version===void 0||xe===!0,pe=be.dataReady;let Ge=L(M,Ue);Pe(r.TEXTURE_CUBE_MAP,M);let ze;if(je){V&&Re&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,Tt,Ue.width,Ue.height);for(let Se=0;Se<6;Se++){ze=Be[Se].mipmaps;for(let tt=0;tt<ze.length;tt++){const ct=ze[tt];M.format!==Ka?dt!==null?V?pe&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,0,0,ct.width,ct.height,dt,ct.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,Tt,ct.width,ct.height,0,ct.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,0,0,ct.width,ct.height,dt,Et,ct.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,Tt,ct.width,ct.height,0,dt,Et,ct.data)}}}else{if(ze=M.mipmaps,V&&Re){ze.length>0&&Ge++;const Se=Sn(Be[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,Tt,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(we){V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Be[Se].width,Be[Se].height,dt,Et,Be[Se].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Tt,Be[Se].width,Be[Se].height,0,dt,Et,Be[Se].data);for(let tt=0;tt<ze.length;tt++){const Ln=ze[tt].image[Se].image;V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,0,0,Ln.width,Ln.height,dt,Et,Ln.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,Tt,Ln.width,Ln.height,0,dt,Et,Ln.data)}}else{V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,dt,Et,Be[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Tt,dt,Et,Be[Se]);for(let tt=0;tt<ze.length;tt++){const ct=ze[tt];V?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,0,0,dt,Et,ct.image[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,Tt,dt,Et,ct.image[Se])}}}E(M)&&N(r.TEXTURE_CUBE_MAP),Le.__version=be.version,M.onUpdate&&M.onUpdate(M)}O.__version=M.version}function et(O,M,Q,xe,be,Le){const Fe=c.convert(Q.format,Q.colorSpace),fe=c.convert(Q.type),he=D(Q.internalFormat,Fe,fe,Q.normalized,Q.colorSpace),je=s.get(M),we=s.get(Q);if(we.__renderTarget=M,!je.__hasExternalTextures){const Be=Math.max(1,M.width>>Le),Ue=Math.max(1,M.height>>Le);be===r.TEXTURE_3D||be===r.TEXTURE_2D_ARRAY?i.texImage3D(be,Le,he,Be,Ue,M.depth,0,Fe,fe,null):i.texImage2D(be,Le,he,Be,Ue,0,Fe,fe,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),Mt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xe,be,we.__webglTexture,0,In(M)):(be===r.TEXTURE_2D||be>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&be<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,xe,be,we.__webglTexture,Le),i.bindFramebuffer(r.FRAMEBUFFER,null)}function mn(O,M,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,O),M.depthBuffer){const xe=M.depthTexture,be=xe&&xe.isDepthTexture?xe.type:null,Le=X(M.stencilBuffer,be),Fe=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Mt(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,In(M),Le,M.width,M.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,In(M),Le,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Le,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Fe,r.RENDERBUFFER,O)}else{const xe=M.textures;for(let be=0;be<xe.length;be++){const Le=xe[be],Fe=c.convert(Le.format,Le.colorSpace),fe=c.convert(Le.type),he=D(Le.internalFormat,Fe,fe,Le.normalized,Le.colorSpace);Mt(M)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,In(M),he,M.width,M.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,In(M),he,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,he,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function vt(O,M,Q){const xe=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const be=s.get(M.depthTexture);if(be.__renderTarget=M,(!be.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),xe){if(be.__webglInit===void 0&&(be.__webglInit=!0,M.depthTexture.addEventListener("dispose",z)),be.__webglTexture===void 0){be.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,be.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,M.depthTexture);const je=c.convert(M.depthTexture.format),we=c.convert(M.depthTexture.type);let Be;M.depthTexture.format===Ks?Be=r.DEPTH_COMPONENT24:M.depthTexture.format===vo&&(Be=r.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,Be,M.width,M.height,0,je,we,null)}}else ee(M.depthTexture,0);const Le=be.__webglTexture,Fe=In(M),fe=xe?r.TEXTURE_CUBE_MAP_POSITIVE_X+Q:r.TEXTURE_2D,he=M.depthTexture.format===vo?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===Ks)Mt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,fe,Le,0,Fe):r.framebufferTexture2D(r.FRAMEBUFFER,he,fe,Le,0);else if(M.depthTexture.format===vo)Mt(M)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,fe,Le,0,Fe):r.framebufferTexture2D(r.FRAMEBUFFER,he,fe,Le,0);else throw new Error("Unknown depthTexture format")}function Vt(O){const M=s.get(O),Q=O.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==O.depthTexture){const xe=O.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),xe){const be=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,xe.removeEventListener("dispose",be)};xe.addEventListener("dispose",be),M.__depthDisposeCallback=be}M.__boundDepthTexture=xe}if(O.depthTexture&&!M.__autoAllocateDepthBuffer)if(Q)for(let xe=0;xe<6;xe++)vt(M.__webglFramebuffer[xe],O,xe);else{const xe=O.texture.mipmaps;xe&&xe.length>0?vt(M.__webglFramebuffer[0],O,0):vt(M.__webglFramebuffer,O,0)}else if(Q){M.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)if(i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[xe]),M.__webglDepthbuffer[xe]===void 0)M.__webglDepthbuffer[xe]=r.createRenderbuffer(),mn(M.__webglDepthbuffer[xe],O,!1);else{const be=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Le=M.__webglDepthbuffer[xe];r.bindRenderbuffer(r.RENDERBUFFER,Le),r.framebufferRenderbuffer(r.FRAMEBUFFER,be,r.RENDERBUFFER,Le)}}else{const xe=O.texture.mipmaps;if(xe&&xe.length>0?i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),mn(M.__webglDepthbuffer,O,!1);else{const be=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Le=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Le),r.framebufferRenderbuffer(r.FRAMEBUFFER,be,r.RENDERBUFFER,Le)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function gn(O,M,Q){const xe=s.get(O);M!==void 0&&et(xe.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&Vt(O)}function Ct(O){const M=O.texture,Q=s.get(O),xe=s.get(M);O.addEventListener("dispose",w);const be=O.textures,Le=O.isWebGLCubeRenderTarget===!0,Fe=be.length>1;if(Fe||(xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture()),xe.__version=M.version,f.memory.textures++),Le){Q.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer[fe]=[];for(let he=0;he<M.mipmaps.length;he++)Q.__webglFramebuffer[fe][he]=r.createFramebuffer()}else Q.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Q.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)Q.__webglFramebuffer[fe]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(Fe)for(let fe=0,he=be.length;fe<he;fe++){const je=s.get(be[fe]);je.__webglTexture===void 0&&(je.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&Mt(O)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let fe=0;fe<be.length;fe++){const he=be[fe];Q.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[fe]);const je=c.convert(he.format,he.colorSpace),we=c.convert(he.type),Be=D(he.internalFormat,je,we,he.normalized,he.colorSpace,O.isXRRenderTarget===!0),Ue=In(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ue,Be,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,Q.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),mn(Q.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Le){i.bindTexture(r.TEXTURE_CUBE_MAP,xe.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)et(Q.__webglFramebuffer[fe][he],O,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,he);else et(Q.__webglFramebuffer[fe],O,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);E(M)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Fe){for(let fe=0,he=be.length;fe<he;fe++){const je=be[fe],we=s.get(je);let Be=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Be=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Be,we.__webglTexture),Pe(Be,je),et(Q.__webglFramebuffer,O,je,r.COLOR_ATTACHMENT0+fe,Be,0),E(je)&&N(Be)}i.unbindTexture()}else{let fe=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(fe=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(fe,xe.__webglTexture),Pe(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)et(Q.__webglFramebuffer[he],O,M,r.COLOR_ATTACHMENT0,fe,he);else et(Q.__webglFramebuffer,O,M,r.COLOR_ATTACHMENT0,fe,0);E(M)&&N(fe),i.unbindTexture()}O.depthBuffer&&Vt(O)}function Xn(O){const M=O.textures;for(let Q=0,xe=M.length;Q<xe;Q++){const be=M[Q];if(E(be)){const Le=U(O),Fe=s.get(be).__webglTexture;i.bindTexture(Le,Fe),N(Le),i.unbindTexture()}}}const Yt=[],ui=[];function H(O){if(O.samples>0){if(Mt(O)===!1){const M=O.textures,Q=O.width,xe=O.height;let be=r.COLOR_BUFFER_BIT;const Le=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Fe=s.get(O),fe=M.length>1;if(fe)for(let je=0;je<M.length;je++)i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+je,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+je,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);const he=O.texture.mipmaps;he&&he.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let je=0;je<M.length;je++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(be|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(be|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[je]);const we=s.get(M[je]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,we,0)}r.blitFramebuffer(0,0,Q,xe,0,0,Q,xe,be,r.NEAREST),m===!0&&(Yt.length=0,ui.length=0,Yt.push(r.COLOR_ATTACHMENT0+je),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Yt.push(Le),ui.push(Le),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ui)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Yt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let je=0;je<M.length;je++){i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+je,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[je]);const we=s.get(M[je]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+je,r.TEXTURE_2D,we,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const M=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function In(O){return Math.min(l.maxSamples,O.samples)}function Mt(O){const M=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function dn(O){const M=f.render.frame;_.get(O)!==M&&(_.set(O,M),O.update())}function Ie(O,M){const Q=O.colorSpace,xe=O.format,be=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||Q!==Df&&Q!==Ir&&(Jt.getTransfer(Q)===En?(xe!==Ka||be!==Ha)&&At("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rn("WebGLTextures: Unsupported texture color space:",Q)),M}function Sn(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=I,this.resetTextureUnits=de,this.getTextureUnits=se,this.setTextureUnits=Y,this.setTexture2D=ee,this.setTexture2DArray=me,this.setTexture3D=Ae,this.setTextureCube=P,this.rebindTextures=gn,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=Xn,this.updateMultisampleRenderTarget=H,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=Mt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function hw(r,e){function i(s,l=Ir){let c;const f=Jt.getTransfer(l);if(s===Ha)return r.UNSIGNED_BYTE;if(s===vm)return r.UNSIGNED_SHORT_4_4_4_4;if(s===bm)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Xv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Yv)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Vv)return r.BYTE;if(s===jv)return r.SHORT;if(s===Oc)return r.UNSIGNED_SHORT;if(s===_m)return r.INT;if(s===gs)return r.UNSIGNED_INT;if(s===fs)return r.FLOAT;if(s===$s)return r.HALF_FLOAT;if(s===Wv)return r.ALPHA;if(s===qv)return r.RGB;if(s===Ka)return r.RGBA;if(s===Ks)return r.DEPTH_COMPONENT;if(s===vo)return r.DEPTH_STENCIL;if(s===$v)return r.RED;if(s===ym)return r.RED_INTEGER;if(s===yo)return r.RG;if(s===Em)return r.RG_INTEGER;if(s===Sm)return r.RGBA_INTEGER;if(s===yf||s===Ef||s===Sf||s===Mf)if(f===En)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===yf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ef)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Sf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Mf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===yf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ef)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Sf)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Mf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ip||s===Up||s===Pp||s===Fp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Ip)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Up)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Pp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Fp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Bp||s===zp||s===Gp||s===Hp||s===kp||s===Nf||s===Vp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Bp||s===zp)return f===En?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Gp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Hp)return c.COMPRESSED_R11_EAC;if(s===kp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Nf)return c.COMPRESSED_RG11_EAC;if(s===Vp)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===jp||s===Xp||s===Yp||s===Wp||s===qp||s===$p||s===Kp||s===Zp||s===Qp||s===Jp||s===em||s===tm||s===nm||s===im)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===jp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Xp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Yp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Wp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$p)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Kp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Zp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Qp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Jp)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===em)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===tm)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===nm)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===im)return f===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===am||s===sm||s===rm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===am)return f===En?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===sm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===rm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===om||s===lm||s===Of||s===cm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===om)return c.COMPRESSED_RED_RGTC1_EXT;if(s===lm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Of)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===cm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Dc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const pw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mw=`
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

}`;class gw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new sb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new _s({vertexShader:pw,fragmentShader:mw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new xs(new zf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xw extends zr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,_=null,b=null,g=null,y=null,T=null;const C=typeof XRWebGLBinding<"u",S=new gw,E={},N=i.getContextAttributes();let U=null,D=null;const X=[],L=[],z=new Xt;let w=null;const F=new Ga;F.viewport=new li;const $=new Ga;$.viewport=new li;const k=[F,$],W=new AS;let de=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let Ee=X[oe];return Ee===void 0&&(Ee=new Wh,X[oe]=Ee),Ee.getTargetRaySpace()},this.getControllerGrip=function(oe){let Ee=X[oe];return Ee===void 0&&(Ee=new Wh,X[oe]=Ee),Ee.getGripSpace()},this.getHand=function(oe){let Ee=X[oe];return Ee===void 0&&(Ee=new Wh,X[oe]=Ee),Ee.getHandSpace()};function Y(oe){const Ee=L.indexOf(oe.inputSource);if(Ee===-1)return;const Ce=X[Ee];Ce!==void 0&&(Ce.update(oe.inputSource,oe.frame,p||f),Ce.dispatchEvent({type:oe.type,data:oe.inputSource}))}function I(){l.removeEventListener("select",Y),l.removeEventListener("selectstart",Y),l.removeEventListener("selectend",Y),l.removeEventListener("squeeze",Y),l.removeEventListener("squeezestart",Y),l.removeEventListener("squeezeend",Y),l.removeEventListener("end",I),l.removeEventListener("inputsourceschange",G);for(let oe=0;oe<X.length;oe++){const Ee=L[oe];Ee!==null&&(L[oe]=null,X[oe].disconnect(Ee))}de=null,se=null,S.reset();for(const oe in E)delete E[oe];e.setRenderTarget(U),y=null,g=null,b=null,l=null,D=null,Pe.stop(),s.isPresenting=!1,e.setPixelRatio(w),e.setSize(z.width,z.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){c=oe,s.isPresenting===!0&&At("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){h=oe,s.isPresenting===!0&&At("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(oe){p=oe},this.getBaseLayer=function(){return g!==null?g:y},this.getBinding=function(){return b===null&&C&&(b=new XRWebGLBinding(l,i)),b},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(oe){if(l=oe,l!==null){if(U=e.getRenderTarget(),l.addEventListener("select",Y),l.addEventListener("selectstart",Y),l.addEventListener("selectend",Y),l.addEventListener("squeeze",Y),l.addEventListener("squeezestart",Y),l.addEventListener("squeezeend",Y),l.addEventListener("end",I),l.addEventListener("inputsourceschange",G),N.xrCompatible!==!0&&await i.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(z),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ce=null,Ve=null,gt=null;N.depth&&(gt=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Ce=N.stencil?vo:Ks,Ve=N.stencil?Dc:gs);const et={colorFormat:i.RGBA8,depthFormat:gt,scaleFactor:c};b=this.getBinding(),g=b.createProjectionLayer(et),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),D=new ps(g.textureWidth,g.textureHeight,{format:Ka,type:Ha,depthTexture:new Rl(g.textureWidth,g.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,Ce),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Ce={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(l,i,Ce),l.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),D=new ps(y.framebufferWidth,y.framebufferHeight,{format:Ka,type:Ha,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Pe.setContext(l),Pe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function G(oe){for(let Ee=0;Ee<oe.removed.length;Ee++){const Ce=oe.removed[Ee],Ve=L.indexOf(Ce);Ve>=0&&(L[Ve]=null,X[Ve].disconnect(Ce))}for(let Ee=0;Ee<oe.added.length;Ee++){const Ce=oe.added[Ee];let Ve=L.indexOf(Ce);if(Ve===-1){for(let et=0;et<X.length;et++)if(et>=L.length){L.push(Ce),Ve=et;break}else if(L[et]===null){L[et]=Ce,Ve=et;break}if(Ve===-1)break}const gt=X[Ve];gt&&gt.connect(Ce)}}const ee=new ne,me=new ne;function Ae(oe,Ee,Ce){ee.setFromMatrixPosition(Ee.matrixWorld),me.setFromMatrixPosition(Ce.matrixWorld);const Ve=ee.distanceTo(me),gt=Ee.projectionMatrix.elements,et=Ce.projectionMatrix.elements,mn=gt[14]/(gt[10]-1),vt=gt[14]/(gt[10]+1),Vt=(gt[9]+1)/gt[5],gn=(gt[9]-1)/gt[5],Ct=(gt[8]-1)/gt[0],Xn=(et[8]+1)/et[0],Yt=mn*Ct,ui=mn*Xn,H=Ve/(-Ct+Xn),In=H*-Ct;if(Ee.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(In),oe.translateZ(H),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),gt[10]===-1)oe.projectionMatrix.copy(Ee.projectionMatrix),oe.projectionMatrixInverse.copy(Ee.projectionMatrixInverse);else{const Mt=mn+H,dn=vt+H,Ie=Yt-In,Sn=ui+(Ve-In),O=Vt*vt/dn*Mt,M=gn*vt/dn*Mt;oe.projectionMatrix.makePerspective(Ie,Sn,O,M,Mt,dn),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function P(oe,Ee){Ee===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(Ee.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(l===null)return;let Ee=oe.near,Ce=oe.far;S.texture!==null&&(S.depthNear>0&&(Ee=S.depthNear),S.depthFar>0&&(Ce=S.depthFar)),W.near=$.near=F.near=Ee,W.far=$.far=F.far=Ce,(de!==W.near||se!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),de=W.near,se=W.far),W.layers.mask=oe.layers.mask|6,F.layers.mask=W.layers.mask&-5,$.layers.mask=W.layers.mask&-3;const Ve=oe.parent,gt=W.cameras;P(W,Ve);for(let et=0;et<gt.length;et++)P(gt[et],Ve);gt.length===2?Ae(W,F,$):W.projectionMatrix.copy(F.projectionMatrix),J(oe,W,Ve)};function J(oe,Ee,Ce){Ce===null?oe.matrix.copy(Ee.matrixWorld):(oe.matrix.copy(Ce.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(Ee.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(Ee.projectionMatrix),oe.projectionMatrixInverse.copy(Ee.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=fm*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(g===null&&y===null))return m},this.setFoveation=function(oe){m=oe,g!==null&&(g.fixedFoveation=oe),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=oe)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(W)},this.getCameraTexture=function(oe){return E[oe]};let Te=null;function De(oe,Ee){if(_=Ee.getViewerPose(p||f),T=Ee,_!==null){const Ce=_.views;y!==null&&(e.setRenderTargetFramebuffer(D,y.framebuffer),e.setRenderTarget(D));let Ve=!1;Ce.length!==W.cameras.length&&(W.cameras.length=0,Ve=!0);for(let vt=0;vt<Ce.length;vt++){const Vt=Ce[vt];let gn=null;if(y!==null)gn=y.getViewport(Vt);else{const Xn=b.getViewSubImage(g,Vt);gn=Xn.viewport,vt===0&&(e.setRenderTargetTextures(D,Xn.colorTexture,Xn.depthStencilTexture),e.setRenderTarget(D))}let Ct=k[vt];Ct===void 0&&(Ct=new Ga,Ct.layers.enable(vt),Ct.viewport=new li,k[vt]=Ct),Ct.matrix.fromArray(Vt.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(Vt.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(gn.x,gn.y,gn.width,gn.height),vt===0&&(W.matrix.copy(Ct.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ve===!0&&W.cameras.push(Ct)}const gt=l.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){b=s.getBinding();const vt=b.getDepthInformation(Ce[0]);vt&&vt.isValid&&vt.texture&&S.init(vt,l.renderState)}if(gt&&gt.includes("camera-access")&&C){e.state.unbindTexture(),b=s.getBinding();for(let vt=0;vt<Ce.length;vt++){const Vt=Ce[vt].camera;if(Vt){let gn=E[Vt];gn||(gn=new sb,E[Vt]=gn);const Ct=b.getCameraImage(Vt);gn.sourceTexture=Ct}}}}for(let Ce=0;Ce<X.length;Ce++){const Ve=L[Ce],gt=X[Ce];Ve!==null&&gt!==void 0&&gt.update(Ve,Ee,p||f)}Te&&Te(oe,Ee),Ee.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Ee}),T=null}const Pe=new cb;Pe.setAnimationLoop(De),this.setAnimationLoop=function(oe){Te=oe},this.dispose=function(){}}}const _w=new vi,gb=new Ut;gb.set(-1,0,0,0,1,0,0,0,1);function vw(r,e){function i(S,E){S.matrixAutoUpdate===!0&&S.updateMatrix(),E.value.copy(S.matrix)}function s(S,E){E.color.getRGB(S.fogColor.value,rb(r)),E.isFog?(S.fogNear.value=E.near,S.fogFar.value=E.far):E.isFogExp2&&(S.fogDensity.value=E.density)}function l(S,E,N,U,D){E.isNodeMaterial?E.uniformsNeedUpdate=!1:E.isMeshBasicMaterial?c(S,E):E.isMeshLambertMaterial?(c(S,E),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)):E.isMeshToonMaterial?(c(S,E),b(S,E)):E.isMeshPhongMaterial?(c(S,E),_(S,E),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)):E.isMeshStandardMaterial?(c(S,E),g(S,E),E.isMeshPhysicalMaterial&&y(S,E,D)):E.isMeshMatcapMaterial?(c(S,E),T(S,E)):E.isMeshDepthMaterial?c(S,E):E.isMeshDistanceMaterial?(c(S,E),C(S,E)):E.isMeshNormalMaterial?c(S,E):E.isLineBasicMaterial?(f(S,E),E.isLineDashedMaterial&&h(S,E)):E.isPointsMaterial?m(S,E,N,U):E.isSpriteMaterial?p(S,E):E.isShadowMaterial?(S.color.value.copy(E.color),S.opacity.value=E.opacity):E.isShaderMaterial&&(E.uniformsNeedUpdate=!1)}function c(S,E){S.opacity.value=E.opacity,E.color&&S.diffuse.value.copy(E.color),E.emissive&&S.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity),E.map&&(S.map.value=E.map,i(E.map,S.mapTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.bumpMap&&(S.bumpMap.value=E.bumpMap,i(E.bumpMap,S.bumpMapTransform),S.bumpScale.value=E.bumpScale,E.side===ra&&(S.bumpScale.value*=-1)),E.normalMap&&(S.normalMap.value=E.normalMap,i(E.normalMap,S.normalMapTransform),S.normalScale.value.copy(E.normalScale),E.side===ra&&S.normalScale.value.negate()),E.displacementMap&&(S.displacementMap.value=E.displacementMap,i(E.displacementMap,S.displacementMapTransform),S.displacementScale.value=E.displacementScale,S.displacementBias.value=E.displacementBias),E.emissiveMap&&(S.emissiveMap.value=E.emissiveMap,i(E.emissiveMap,S.emissiveMapTransform)),E.specularMap&&(S.specularMap.value=E.specularMap,i(E.specularMap,S.specularMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest);const N=e.get(E),U=N.envMap,D=N.envMapRotation;U&&(S.envMap.value=U,S.envMapRotation.value.setFromMatrix4(_w.makeRotationFromEuler(D)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(gb),S.reflectivity.value=E.reflectivity,S.ior.value=E.ior,S.refractionRatio.value=E.refractionRatio),E.lightMap&&(S.lightMap.value=E.lightMap,S.lightMapIntensity.value=E.lightMapIntensity,i(E.lightMap,S.lightMapTransform)),E.aoMap&&(S.aoMap.value=E.aoMap,S.aoMapIntensity.value=E.aoMapIntensity,i(E.aoMap,S.aoMapTransform))}function f(S,E){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,E.map&&(S.map.value=E.map,i(E.map,S.mapTransform))}function h(S,E){S.dashSize.value=E.dashSize,S.totalSize.value=E.dashSize+E.gapSize,S.scale.value=E.scale}function m(S,E,N,U){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,S.size.value=E.size*N,S.scale.value=U*.5,E.map&&(S.map.value=E.map,i(E.map,S.uvTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest)}function p(S,E){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,S.rotation.value=E.rotation,E.map&&(S.map.value=E.map,i(E.map,S.mapTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest)}function _(S,E){S.specular.value.copy(E.specular),S.shininess.value=Math.max(E.shininess,1e-4)}function b(S,E){E.gradientMap&&(S.gradientMap.value=E.gradientMap)}function g(S,E){S.metalness.value=E.metalness,E.metalnessMap&&(S.metalnessMap.value=E.metalnessMap,i(E.metalnessMap,S.metalnessMapTransform)),S.roughness.value=E.roughness,E.roughnessMap&&(S.roughnessMap.value=E.roughnessMap,i(E.roughnessMap,S.roughnessMapTransform)),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)}function y(S,E,N){S.ior.value=E.ior,E.sheen>0&&(S.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),S.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap&&(S.sheenColorMap.value=E.sheenColorMap,i(E.sheenColorMap,S.sheenColorMapTransform)),E.sheenRoughnessMap&&(S.sheenRoughnessMap.value=E.sheenRoughnessMap,i(E.sheenRoughnessMap,S.sheenRoughnessMapTransform))),E.clearcoat>0&&(S.clearcoat.value=E.clearcoat,S.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap&&(S.clearcoatMap.value=E.clearcoatMap,i(E.clearcoatMap,S.clearcoatMapTransform)),E.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,i(E.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),E.clearcoatNormalMap&&(S.clearcoatNormalMap.value=E.clearcoatNormalMap,i(E.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===ra&&S.clearcoatNormalScale.value.negate())),E.dispersion>0&&(S.dispersion.value=E.dispersion),E.iridescence>0&&(S.iridescence.value=E.iridescence,S.iridescenceIOR.value=E.iridescenceIOR,S.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap&&(S.iridescenceMap.value=E.iridescenceMap,i(E.iridescenceMap,S.iridescenceMapTransform)),E.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=E.iridescenceThicknessMap,i(E.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),E.transmission>0&&(S.transmission.value=E.transmission,S.transmissionSamplerMap.value=N.texture,S.transmissionSamplerSize.value.set(N.width,N.height),E.transmissionMap&&(S.transmissionMap.value=E.transmissionMap,i(E.transmissionMap,S.transmissionMapTransform)),S.thickness.value=E.thickness,E.thicknessMap&&(S.thicknessMap.value=E.thicknessMap,i(E.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=E.attenuationDistance,S.attenuationColor.value.copy(E.attenuationColor)),E.anisotropy>0&&(S.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap&&(S.anisotropyMap.value=E.anisotropyMap,i(E.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=E.specularIntensity,S.specularColor.value.copy(E.specularColor),E.specularColorMap&&(S.specularColorMap.value=E.specularColorMap,i(E.specularColorMap,S.specularColorMapTransform)),E.specularIntensityMap&&(S.specularIntensityMap.value=E.specularIntensityMap,i(E.specularIntensityMap,S.specularIntensityMapTransform))}function T(S,E){E.matcap&&(S.matcap.value=E.matcap)}function C(S,E){const N=e.get(E).light;S.referencePosition.value.setFromMatrixPosition(N.matrixWorld),S.nearDistance.value=N.shadow.camera.near,S.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function bw(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,U){const D=U.program;s.uniformBlockBinding(N,D)}function p(N,U){let D=l[N.id];D===void 0&&(T(N),D=_(N),l[N.id]=D,N.addEventListener("dispose",S));const X=U.program;s.updateUBOMapping(N,X);const L=e.render.frame;c[N.id]!==L&&(g(N),c[N.id]=L)}function _(N){const U=b();N.__bindingPointIndex=U;const D=r.createBuffer(),X=N.__size,L=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,D),r.bufferData(r.UNIFORM_BUFFER,X,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,D),D}function b(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return rn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const U=l[N.id],D=N.uniforms,X=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let L=0,z=D.length;L<z;L++){const w=Array.isArray(D[L])?D[L]:[D[L]];for(let F=0,$=w.length;F<$;F++){const k=w[F];if(y(k,L,F,X)===!0){const W=k.__offset,de=Array.isArray(k.value)?k.value:[k.value];let se=0;for(let Y=0;Y<de.length;Y++){const I=de[Y],G=C(I);typeof I=="number"||typeof I=="boolean"?(k.__data[0]=I,r.bufferSubData(r.UNIFORM_BUFFER,W+se,k.__data)):I.isMatrix3?(k.__data[0]=I.elements[0],k.__data[1]=I.elements[1],k.__data[2]=I.elements[2],k.__data[3]=0,k.__data[4]=I.elements[3],k.__data[5]=I.elements[4],k.__data[6]=I.elements[5],k.__data[7]=0,k.__data[8]=I.elements[6],k.__data[9]=I.elements[7],k.__data[10]=I.elements[8],k.__data[11]=0):ArrayBuffer.isView(I)?k.__data.set(new I.constructor(I.buffer,I.byteOffset,k.__data.length)):(I.toArray(k.__data,se),se+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,W,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function y(N,U,D,X){const L=N.value,z=U+"_"+D;if(X[z]===void 0)return typeof L=="number"||typeof L=="boolean"?X[z]=L:ArrayBuffer.isView(L)?X[z]=L.slice():X[z]=L.clone(),!0;{const w=X[z];if(typeof L=="number"||typeof L=="boolean"){if(w!==L)return X[z]=L,!0}else{if(ArrayBuffer.isView(L))return!0;if(w.equals(L)===!1)return w.copy(L),!0}}return!1}function T(N){const U=N.uniforms;let D=0;const X=16;for(let z=0,w=U.length;z<w;z++){const F=Array.isArray(U[z])?U[z]:[U[z]];for(let $=0,k=F.length;$<k;$++){const W=F[$],de=Array.isArray(W.value)?W.value:[W.value];for(let se=0,Y=de.length;se<Y;se++){const I=de[se],G=C(I),ee=D%X,me=ee%G.boundary,Ae=ee+me;D+=me,Ae!==0&&X-Ae<G.storage&&(D+=X-Ae),W.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=D,D+=G.storage}}}const L=D%X;return L>0&&(D+=X-L),N.__size=D,N.__cache={},this}function C(N){const U={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(U.boundary=4,U.storage=4):N.isVector2?(U.boundary=8,U.storage=8):N.isVector3||N.isColor?(U.boundary=16,U.storage=12):N.isVector4?(U.boundary=16,U.storage=16):N.isMatrix3?(U.boundary=48,U.storage=48):N.isMatrix4?(U.boundary=64,U.storage=64):N.isTexture?At("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(U.boundary=16,U.storage=N.byteLength):At("WebGLRenderer: Unsupported uniform value type.",N),U}function S(N){const U=N.target;U.removeEventListener("dispose",S);const D=f.indexOf(U.__bindingPointIndex);f.splice(D,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function E(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:p,dispose:E}}const yw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let cs=null;function Ew(){return cs===null&&(cs=new cS(yw,16,16,yo,$s),cs.name="DFG_LUT",cs.minFilter=Xi,cs.magFilter=Xi,cs.wrapS=Ys,cs.wrapT=Ys,cs.generateMipmaps=!1,cs.needsUpdate=!0),cs}class Sw{constructor(e={}){const{canvas:i=zE(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:b=!1,reversedDepthBuffer:g=!1,outputBufferType:y=Ha}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=f;const C=y,S=new Set([Sm,Em,ym]),E=new Set([Ha,gs,Oc,Dc,vm,bm]),N=new Uint32Array(4),U=new Int32Array(4),D=new ne;let X=null,L=null;const z=[],w=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const $=this;let k=!1,W=null;this._outputColorSpace=ba;let de=0,se=0,Y=null,I=-1,G=null;const ee=new li,me=new li;let Ae=null;const P=new Cn(0);let J=0,Te=i.width,De=i.height,Pe=1,oe=null,Ee=null;const Ce=new li(0,0,Te,De),Ve=new li(0,0,Te,De);let gt=!1;const et=new ib;let mn=!1,vt=!1;const Vt=new vi,gn=new ne,Ct=new li,Xn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function ui(){return Y===null?Pe:1}let H=s;function In(A,q){return i.getContext(A,q)}try{const A={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:b};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${xm}`),i.addEventListener("webglcontextlost",Se,!1),i.addEventListener("webglcontextrestored",tt,!1),i.addEventListener("webglcontextcreationerror",ct,!1),H===null){const q="webgl2";if(H=In(q,A),H===null)throw In(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw rn("WebGLRenderer: "+A.message),A}let Mt,dn,Ie,Sn,O,M,Q,xe,be,Le,Fe,fe,he,je,we,Be,Ue,dt,Et,Tt,V,Re,pe;function Ge(){Mt=new E1(H),Mt.init(),V=new hw(H,Mt),dn=new p1(H,Mt,e,V),Ie=new fw(H,Mt),dn.reversedDepthBuffer&&g&&Ie.buffers.depth.setReversed(!0),Sn=new T1(H),O=new ZA,M=new dw(H,Mt,Ie,O,dn,V,Sn),Q=new y1($),xe=new CS(H),Re=new d1(H,xe),be=new S1(H,xe,Sn,Re),Le=new w1(H,be,xe,Re,Sn),dt=new A1(H,dn,M),we=new m1(O),Fe=new KA($,Q,Mt,dn,Re,we),fe=new vw($,O),he=new JA,je=new sw(Mt),Ue=new f1($,Q,Ie,Le,T,m),Be=new uw($,Le,dn),pe=new bw(H,Sn,dn,Ie),Et=new h1(H,Mt,Sn),Tt=new M1(H,Mt,Sn),Sn.programs=Fe.programs,$.capabilities=dn,$.extensions=Mt,$.properties=O,$.renderLists=he,$.shadowMap=Be,$.state=Ie,$.info=Sn}Ge(),C!==Ha&&(F=new C1(C,i.width,i.height,l,c));const ze=new xw($,H);this.xr=ze,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=Mt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Mt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Pe},this.setPixelRatio=function(A){A!==void 0&&(Pe=A,this.setSize(Te,De,!1))},this.getSize=function(A){return A.set(Te,De)},this.setSize=function(A,q,re=!0){if(ze.isPresenting){At("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=A,De=q,i.width=Math.floor(A*Pe),i.height=Math.floor(q*Pe),re===!0&&(i.style.width=A+"px",i.style.height=q+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,A,q)},this.getDrawingBufferSize=function(A){return A.set(Te*Pe,De*Pe).floor()},this.setDrawingBufferSize=function(A,q,re){Te=A,De=q,Pe=re,i.width=Math.floor(A*re),i.height=Math.floor(q*re),this.setViewport(0,0,A,q)},this.setEffects=function(A){if(C===Ha){rn("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let q=0;q<A.length;q++)if(A[q].isOutputPass===!0){At("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(ee)},this.getViewport=function(A){return A.copy(Ce)},this.setViewport=function(A,q,re,K){A.isVector4?Ce.set(A.x,A.y,A.z,A.w):Ce.set(A,q,re,K),Ie.viewport(ee.copy(Ce).multiplyScalar(Pe).round())},this.getScissor=function(A){return A.copy(Ve)},this.setScissor=function(A,q,re,K){A.isVector4?Ve.set(A.x,A.y,A.z,A.w):Ve.set(A,q,re,K),Ie.scissor(me.copy(Ve).multiplyScalar(Pe).round())},this.getScissorTest=function(){return gt},this.setScissorTest=function(A){Ie.setScissorTest(gt=A)},this.setOpaqueSort=function(A){oe=A},this.setTransparentSort=function(A){Ee=A},this.getClearColor=function(A){return A.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(A=!0,q=!0,re=!0){let K=0;if(A){let te=!1;if(Y!==null){const Xe=Y.texture.format;te=S.has(Xe)}if(te){const Xe=Y.texture.type,$e=E.has(Xe),_e=Ue.getClearColor(),Ze=Ue.getClearAlpha(),Je=_e.r,ft=_e.g,Lt=_e.b;$e?(N[0]=Je,N[1]=ft,N[2]=Lt,N[3]=Ze,H.clearBufferuiv(H.COLOR,0,N)):(U[0]=Je,U[1]=ft,U[2]=Lt,U[3]=Ze,H.clearBufferiv(H.COLOR,0,U))}else K|=H.COLOR_BUFFER_BIT}q&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),re&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),W=A},this.dispose=function(){i.removeEventListener("webglcontextlost",Se,!1),i.removeEventListener("webglcontextrestored",tt,!1),i.removeEventListener("webglcontextcreationerror",ct,!1),Ue.dispose(),he.dispose(),je.dispose(),O.dispose(),Q.dispose(),Le.dispose(),Re.dispose(),pe.dispose(),Fe.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",Ni),ze.removeEventListener("sessionend",Qa),Ei.stop()};function Se(A){A.preventDefault(),d_("WebGLRenderer: Context Lost."),k=!0}function tt(){d_("WebGLRenderer: Context Restored."),k=!1;const A=Sn.autoReset,q=Be.enabled,re=Be.autoUpdate,K=Be.needsUpdate,te=Be.type;Ge(),Sn.autoReset=A,Be.enabled=q,Be.autoUpdate=re,Be.needsUpdate=K,Be.type=te}function ct(A){rn("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ln(A){const q=A.target;q.removeEventListener("dispose",Ln),tn(q)}function tn(A){$i(A),O.remove(A)}function $i(A){const q=O.get(A).programs;q!==void 0&&(q.forEach(function(re){Fe.releaseProgram(re)}),A.isShaderMaterial&&Fe.releaseShaderCache(A))}this.renderBufferDirect=function(A,q,re,K,te,Xe){q===null&&(q=Xn);const $e=te.isMesh&&te.matrixWorld.determinant()<0,_e=bs(A,q,re,K,te);Ie.setMaterial(K,$e);let Ze=re.index,Je=1;if(K.wireframe===!0){if(Ze=be.getWireframeAttribute(re),Ze===void 0)return;Je=2}const ft=re.drawRange,Lt=re.attributes.position;let ut=ft.start*Je,nn=(ft.start+ft.count)*Je;Xe!==null&&(ut=Math.max(ut,Xe.start*Je),nn=Math.min(nn,(Xe.start+Xe.count)*Je)),Ze!==null?(ut=Math.max(ut,0),nn=Math.min(nn,Ze.count)):Lt!=null&&(ut=Math.max(ut,0),nn=Math.min(nn,Lt.count));const Pn=nn-ut;if(Pn<0||Pn===1/0)return;Re.setup(te,K,_e,re,Ze);let pt,on=Et;if(Ze!==null&&(pt=xe.get(Ze),on=Tt,on.setIndex(pt)),te.isMesh)K.wireframe===!0?(Ie.setLineWidth(K.wireframeLinewidth*ui()),on.setMode(H.LINES)):on.setMode(H.TRIANGLES);else if(te.isLine){let ln=K.linewidth;ln===void 0&&(ln=1),Ie.setLineWidth(ln*ui()),te.isLineSegments?on.setMode(H.LINES):te.isLineLoop?on.setMode(H.LINE_LOOP):on.setMode(H.LINE_STRIP)}else te.isPoints?on.setMode(H.POINTS):te.isSprite&&on.setMode(H.TRIANGLES);if(te.isBatchedMesh)if(Mt.get("WEBGL_multi_draw"))on.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const ln=te._multiDrawStarts,We=te._multiDrawCounts,Nn=te._multiDrawCount,Bt=Ze?xe.get(Ze).bytesPerElement:1,$n=O.get(K).currentProgram.getUniforms();for(let ai=0;ai<Nn;ai++)$n.setValue(H,"_gl_DrawID",ai),on.render(ln[ai]/Bt,We[ai])}else if(te.isInstancedMesh)on.renderInstances(ut,Pn,te.count);else if(re.isInstancedBufferGeometry){const ln=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,We=Math.min(re.instanceCount,ln);on.renderInstances(ut,Pn,We)}else on.render(ut,Pn)};function Yn(A,q,re){A.transparent===!0&&A.side===Xs&&A.forceSinglePass===!1?(A.side=ra,A.needsUpdate=!0,Sa(A,q,re),A.side=Fr,A.needsUpdate=!0,Sa(A,q,re),A.side=Xs):Sa(A,q,re)}this.compile=function(A,q,re=null){re===null&&(re=A),L=je.get(re),L.init(q),w.push(L),re.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),A!==re&&A.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(L.pushLight(te),te.castShadow&&L.pushShadow(te))}),L.setupLights();const K=new Set;return A.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const Xe=te.material;if(Xe)if(Array.isArray(Xe))for(let $e=0;$e<Xe.length;$e++){const _e=Xe[$e];Yn(_e,re,te),K.add(_e)}else Yn(Xe,re,te),K.add(Xe)}),L=w.pop(),K},this.compileAsync=function(A,q,re=null){const K=this.compile(A,q,re);return new Promise(te=>{function Xe(){if(K.forEach(function($e){O.get($e).currentProgram.isReady()&&K.delete($e)}),K.size===0){te(A);return}setTimeout(Xe,10)}Mt.get("KHR_parallel_shader_compile")!==null?Xe():setTimeout(Xe,10)})};let Za=null;function Gr(A){Za&&Za(A)}function Ni(){Ei.stop()}function Qa(){Ei.start()}const Ei=new cb;Ei.setAnimationLoop(Gr),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(A){Za=A,ze.setAnimationLoop(A),A===null?Ei.stop():Ei.start()},ze.addEventListener("sessionstart",Ni),ze.addEventListener("sessionend",Qa),this.render=function(A,q){if(q!==void 0&&q.isCamera!==!0){rn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;W!==null&&W.renderStart(A,q);const re=ze.enabled===!0&&ze.isPresenting===!0,K=F!==null&&(Y===null||re)&&F.begin($,Y);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(q),q=ze.getCamera()),A.isScene===!0&&A.onBeforeRender($,A,q,Y),L=je.get(A,w.length),L.init(q),L.state.textureUnits=M.getTextureUnits(),w.push(L),Vt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),et.setFromProjectionMatrix(Vt,ds,q.reversedDepth),vt=this.localClippingEnabled,mn=we.init(this.clippingPlanes,vt),X=he.get(A,z.length),X.init(),z.push(X),ze.enabled===!0&&ze.isPresenting===!0){const $e=$.xr.getDepthSensingMesh();$e!==null&&Mn($e,q,-1/0,$.sortObjects)}Mn(A,q,0,$.sortObjects),X.finish(),$.sortObjects===!0&&X.sort(oe,Ee),Yt=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,Yt&&Ue.addToRenderList(X,A),this.info.render.frame++,mn===!0&&we.beginShadows();const te=L.state.shadowsArray;if(Be.render(te,A,q),mn===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset(),(K&&F.hasRenderPass())===!1){const $e=X.opaque,_e=X.transmissive;if(L.setupLights(),q.isArrayCamera){const Ze=q.cameras;if(_e.length>0)for(let Je=0,ft=Ze.length;Je<ft;Je++){const Lt=Ze[Je];Un($e,_e,A,Lt)}Yt&&Ue.render(A);for(let Je=0,ft=Ze.length;Je<ft;Je++){const Lt=Ze[Je];ii(X,A,Lt,Lt.viewport)}}else _e.length>0&&Un($e,_e,A,q),Yt&&Ue.render(A),ii(X,A,q)}Y!==null&&se===0&&(M.updateMultisampleRenderTarget(Y),M.updateRenderTargetMipmap(Y)),K&&F.end($),A.isScene===!0&&A.onAfterRender($,A,q),Re.resetDefaultState(),I=-1,G=null,w.pop(),w.length>0?(L=w[w.length-1],M.setTextureUnits(L.state.textureUnits),mn===!0&&we.setGlobalState($.clippingPlanes,L.state.camera)):L=null,z.pop(),z.length>0?X=z[z.length-1]:X=null,W!==null&&W.renderEnd()};function Mn(A,q,re,K){if(A.visible===!1)return;if(A.layers.test(q.layers)){if(A.isGroup)re=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(q);else if(A.isLightProbeGrid)L.pushLightProbeGrid(A);else if(A.isLight)L.pushLight(A),A.castShadow&&L.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||et.intersectsSprite(A)){K&&Ct.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Vt);const $e=Le.update(A),_e=A.material;_e.visible&&X.push(A,$e,_e,re,Ct.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||et.intersectsObject(A))){const $e=Le.update(A),_e=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ct.copy(A.boundingSphere.center)):($e.boundingSphere===null&&$e.computeBoundingSphere(),Ct.copy($e.boundingSphere.center)),Ct.applyMatrix4(A.matrixWorld).applyMatrix4(Vt)),Array.isArray(_e)){const Ze=$e.groups;for(let Je=0,ft=Ze.length;Je<ft;Je++){const Lt=Ze[Je],ut=_e[Lt.materialIndex];ut&&ut.visible&&X.push(A,$e,ut,re,Ct.z,Lt)}}else _e.visible&&X.push(A,$e,_e,re,Ct.z,null)}}const Xe=A.children;for(let $e=0,_e=Xe.length;$e<_e;$e++)Mn(Xe[$e],q,re,K)}function ii(A,q,re,K){const{opaque:te,transmissive:Xe,transparent:$e}=A;L.setupLightsView(re),mn===!0&&we.setGlobalState($.clippingPlanes,re),K&&Ie.viewport(ee.copy(K)),te.length>0&&Ea(te,q,re),Xe.length>0&&Ea(Xe,q,re),$e.length>0&&Ea($e,q,re),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Un(A,q,re,K){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[K.id]===void 0){const ut=Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[K.id]=new ps(1,1,{generateMipmaps:!0,type:ut?$s:Ha,minFilter:_o,samples:Math.max(4,dn.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}const Xe=L.state.transmissionRenderTarget[K.id],$e=K.viewport||ee;Xe.setSize($e.z*$.transmissionResolutionScale,$e.w*$.transmissionResolutionScale);const _e=$.getRenderTarget(),Ze=$.getActiveCubeFace(),Je=$.getActiveMipmapLevel();$.setRenderTarget(Xe),$.getClearColor(P),J=$.getClearAlpha(),J<1&&$.setClearColor(16777215,.5),$.clear(),Yt&&Ue.render(re);const ft=$.toneMapping;$.toneMapping=hs;const Lt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),L.setupLightsView(K),mn===!0&&we.setGlobalState($.clippingPlanes,K),Ea(A,re,K),M.updateMultisampleRenderTarget(Xe),M.updateRenderTargetMipmap(Xe),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let ut=!1;for(let nn=0,Pn=q.length;nn<Pn;nn++){const pt=q[nn],{object:on,geometry:ln,material:We,group:Nn}=pt;if(We.side===Xs&&on.layers.test(K.layers)){const Bt=We.side;We.side=ra,We.needsUpdate=!0,Wn(on,re,K,ln,We,Nn),We.side=Bt,We.needsUpdate=!0,ut=!0}}ut===!0&&(M.updateMultisampleRenderTarget(Xe),M.updateRenderTargetMipmap(Xe))}$.setRenderTarget(_e,Ze,Je),$.setClearColor(P,J),Lt!==void 0&&(K.viewport=Lt),$.toneMapping=ft}function Ea(A,q,re){const K=q.isScene===!0?q.overrideMaterial:null;for(let te=0,Xe=A.length;te<Xe;te++){const $e=A[te],{object:_e,geometry:Ze,group:Je}=$e;let ft=$e.material;ft.allowOverride===!0&&K!==null&&(ft=K),_e.layers.test(re.layers)&&Wn(_e,q,re,Ze,ft,Je)}}function Wn(A,q,re,K,te,Xe){A.onBeforeRender($,q,re,K,te,Xe),A.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),te.onBeforeRender($,q,re,K,A,Xe),te.transparent===!0&&te.side===Xs&&te.forceSinglePass===!1?(te.side=ra,te.needsUpdate=!0,$.renderBufferDirect(re,q,K,te,A,Xe),te.side=Fr,te.needsUpdate=!0,$.renderBufferDirect(re,q,K,te,A,Xe),te.side=Xs):$.renderBufferDirect(re,q,K,te,A,Xe),A.onAfterRender($,q,re,K,te,Xe)}function Sa(A,q,re){q.isScene!==!0&&(q=Xn);const K=O.get(A),te=L.state.lights,Xe=L.state.shadowsArray,$e=te.state.version,_e=Fe.getParameters(A,te.state,Xe,q,re,L.state.lightProbeGridArray),Ze=Fe.getProgramCacheKey(_e);let Je=K.programs;K.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?q.environment:null,K.fog=q.fog;const ft=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;K.envMap=Q.get(A.envMap||K.environment,ft),K.envMapRotation=K.environment!==null&&A.envMap===null?q.environmentRotation:A.envMapRotation,Je===void 0&&(A.addEventListener("dispose",Ln),Je=new Map,K.programs=Je);let Lt=Je.get(Ze);if(Lt!==void 0){if(K.currentProgram===Lt&&K.lightsStateVersion===$e)return Ma(A,_e),Lt}else _e.uniforms=Fe.getUniforms(A),W!==null&&A.isNodeMaterial&&W.build(A,re,_e),A.onBeforeCompile(_e,$),Lt=Fe.acquireProgram(_e,Ze),Je.set(Ze,Lt),K.uniforms=_e.uniforms;const ut=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ut.clippingPlanes=we.uniform),Ma(A,_e),K.needsLights=Ja(A),K.lightsStateVersion=$e,K.needsLights&&(ut.ambientLightColor.value=te.state.ambient,ut.lightProbe.value=te.state.probe,ut.directionalLights.value=te.state.directional,ut.directionalLightShadows.value=te.state.directionalShadow,ut.spotLights.value=te.state.spot,ut.spotLightShadows.value=te.state.spotShadow,ut.rectAreaLights.value=te.state.rectArea,ut.ltc_1.value=te.state.rectAreaLTC1,ut.ltc_2.value=te.state.rectAreaLTC2,ut.pointLights.value=te.state.point,ut.pointLightShadows.value=te.state.pointShadow,ut.hemisphereLights.value=te.state.hemi,ut.directionalShadowMatrix.value=te.state.directionalShadowMatrix,ut.spotLightMatrix.value=te.state.spotLightMatrix,ut.spotLightMap.value=te.state.spotLightMap,ut.pointShadowMatrix.value=te.state.pointShadowMatrix),K.lightProbeGrid=L.state.lightProbeGridArray.length>0,K.currentProgram=Lt,K.uniformsList=null,Lt}function Hr(A){if(A.uniformsList===null){const q=A.currentProgram.getUniforms();A.uniformsList=Af.seqWithValue(q.seq,A.uniforms)}return A.uniformsList}function Ma(A,q){const re=O.get(A);re.outputColorSpace=q.outputColorSpace,re.batching=q.batching,re.batchingColor=q.batchingColor,re.instancing=q.instancing,re.instancingColor=q.instancingColor,re.instancingMorph=q.instancingMorph,re.skinning=q.skinning,re.morphTargets=q.morphTargets,re.morphNormals=q.morphNormals,re.morphColors=q.morphColors,re.morphTargetsCount=q.morphTargetsCount,re.numClippingPlanes=q.numClippingPlanes,re.numIntersection=q.numClipIntersection,re.vertexAlphas=q.vertexAlphas,re.vertexTangents=q.vertexTangents,re.toneMapping=q.toneMapping}function Mo(A,q){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;D.setFromMatrixPosition(q.matrixWorld);for(let re=0,K=A.length;re<K;re++){const te=A[re];if(te.texture!==null&&te.boundingBox.containsPoint(D))return te}return null}function bs(A,q,re,K,te){q.isScene!==!0&&(q=Xn),M.resetTextureUnits();const Xe=q.fog,$e=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?q.environment:null,_e=Y===null?$.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Jt.workingColorSpace,Ze=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Je=Q.get(K.envMap||$e,Ze),ft=K.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,Lt=!!re.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),ut=!!re.morphAttributes.position,nn=!!re.morphAttributes.normal,Pn=!!re.morphAttributes.color;let pt=hs;K.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(pt=$.toneMapping);const on=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,ln=on!==void 0?on.length:0,We=O.get(K),Nn=L.state.lights;if(mn===!0&&(vt===!0||A!==G)){const an=A===G&&K.id===I;we.setState(K,A,an)}let Bt=!1;K.version===We.__version?(We.needsLights&&We.lightsStateVersion!==Nn.state.version||We.outputColorSpace!==_e||te.isBatchedMesh&&We.batching===!1||!te.isBatchedMesh&&We.batching===!0||te.isBatchedMesh&&We.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&We.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&We.instancing===!1||!te.isInstancedMesh&&We.instancing===!0||te.isSkinnedMesh&&We.skinning===!1||!te.isSkinnedMesh&&We.skinning===!0||te.isInstancedMesh&&We.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&We.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&We.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&We.instancingMorph===!1&&te.morphTexture!==null||We.envMap!==Je||K.fog===!0&&We.fog!==Xe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==we.numPlanes||We.numIntersection!==we.numIntersection)||We.vertexAlphas!==ft||We.vertexTangents!==Lt||We.morphTargets!==ut||We.morphNormals!==nn||We.morphColors!==Pn||We.toneMapping!==pt||We.morphTargetsCount!==ln||!!We.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Bt=!0):(Bt=!0,We.__version=K.version);let $n=We.currentProgram;Bt===!0&&($n=Sa(K,q,te),W&&K.isNodeMaterial&&W.onUpdateProgram(K,$n,We));let ai=!1,oa=!1,Hn=!1;const Pt=$n.getUniforms(),xn=We.uniforms;if(Ie.useProgram($n.program)&&(ai=!0,oa=!0,Hn=!0),K.id!==I&&(I=K.id,oa=!0),We.needsLights){const an=Mo(L.state.lightProbeGridArray,te);We.lightProbeGrid!==an&&(We.lightProbeGrid=an,oa=!0)}if(ai||G!==A){Ie.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Pt.setValue(H,"projectionMatrix",A.projectionMatrix),Pt.setValue(H,"viewMatrix",A.matrixWorldInverse);const Si=Pt.map.cameraPosition;Si!==void 0&&Si.setValue(H,gn.setFromMatrixPosition(A.matrixWorld)),dn.logarithmicDepthBuffer&&Pt.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Pt.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),G!==A&&(G=A,oa=!0,Hn=!0)}if(We.needsLights&&(Nn.state.directionalShadowMap.length>0&&Pt.setValue(H,"directionalShadowMap",Nn.state.directionalShadowMap,M),Nn.state.spotShadowMap.length>0&&Pt.setValue(H,"spotShadowMap",Nn.state.spotShadowMap,M),Nn.state.pointShadowMap.length>0&&Pt.setValue(H,"pointShadowMap",Nn.state.pointShadowMap,M)),te.isSkinnedMesh){Pt.setOptional(H,te,"bindMatrix"),Pt.setOptional(H,te,"bindMatrixInverse");const an=te.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Pt.setValue(H,"boneTexture",an.boneTexture,M))}te.isBatchedMesh&&(Pt.setOptional(H,te,"batchingTexture"),Pt.setValue(H,"batchingTexture",te._matricesTexture,M),Pt.setOptional(H,te,"batchingIdTexture"),Pt.setValue(H,"batchingIdTexture",te._indirectTexture,M),Pt.setOptional(H,te,"batchingColorTexture"),te._colorsTexture!==null&&Pt.setValue(H,"batchingColorTexture",te._colorsTexture,M));const la=re.morphAttributes;if((la.position!==void 0||la.normal!==void 0||la.color!==void 0)&&dt.update(te,re,$n),(oa||We.receiveShadow!==te.receiveShadow)&&(We.receiveShadow=te.receiveShadow,Pt.setValue(H,"receiveShadow",te.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&q.environment!==null&&(xn.envMapIntensity.value=q.environmentIntensity),xn.dfgLUT!==void 0&&(xn.dfgLUT.value=Ew()),oa){if(Pt.setValue(H,"toneMappingExposure",$.toneMappingExposure),We.needsLights&&Ta(xn,Hn),Xe&&K.fog===!0&&fe.refreshFogUniforms(xn,Xe),fe.refreshMaterialUniforms(xn,K,Pe,De,L.state.transmissionRenderTarget[A.id]),We.needsLights&&We.lightProbeGrid){const an=We.lightProbeGrid;xn.probesSH.value=an.texture,xn.probesMin.value.copy(an.boundingBox.min),xn.probesMax.value.copy(an.boundingBox.max),xn.probesResolution.value.copy(an.resolution)}Af.upload(H,Hr(We),xn,M)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Af.upload(H,Hr(We),xn,M),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Pt.setValue(H,"center",te.center),Pt.setValue(H,"modelViewMatrix",te.modelViewMatrix),Pt.setValue(H,"normalMatrix",te.normalMatrix),Pt.setValue(H,"modelMatrix",te.matrixWorld),K.uniformsGroups!==void 0){const an=K.uniformsGroups;for(let Si=0,si=an.length;Si<si;Si++){const Zs=an[Si];pe.update(Zs,$n),pe.bind(Zs,$n)}}return $n}function Ta(A,q){A.ambientLightColor.needsUpdate=q,A.lightProbe.needsUpdate=q,A.directionalLights.needsUpdate=q,A.directionalLightShadows.needsUpdate=q,A.pointLights.needsUpdate=q,A.pointLightShadows.needsUpdate=q,A.spotLights.needsUpdate=q,A.spotLightShadows.needsUpdate=q,A.rectAreaLights.needsUpdate=q,A.hemisphereLights.needsUpdate=q}function Ja(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return de},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,q,re){const K=O.get(A);K.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),O.get(A.texture).__webglTexture=q,O.get(A.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:re,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,q){const re=O.get(A);re.__webglFramebuffer=q,re.__useDefaultFramebuffer=q===void 0};const Aa=H.createFramebuffer();this.setRenderTarget=function(A,q=0,re=0){Y=A,de=q,se=re;let K=null,te=!1,Xe=!1;if(A){const _e=O.get(A);if(_e.__useDefaultFramebuffer!==void 0){Ie.bindFramebuffer(H.FRAMEBUFFER,_e.__webglFramebuffer),ee.copy(A.viewport),me.copy(A.scissor),Ae=A.scissorTest,Ie.viewport(ee),Ie.scissor(me),Ie.setScissorTest(Ae),I=-1;return}else if(_e.__webglFramebuffer===void 0)M.setupRenderTarget(A);else if(_e.__hasExternalTextures)M.rebindTextures(A,O.get(A.texture).__webglTexture,O.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ft=A.depthTexture;if(_e.__boundDepthTexture!==ft){if(ft!==null&&O.has(ft)&&(A.width!==ft.image.width||A.height!==ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(A)}}const Ze=A.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Xe=!0);const Je=O.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Je[q])?K=Je[q][re]:K=Je[q],te=!0):A.samples>0&&M.useMultisampledRTT(A)===!1?K=O.get(A).__webglMultisampledFramebuffer:Array.isArray(Je)?K=Je[re]:K=Je,ee.copy(A.viewport),me.copy(A.scissor),Ae=A.scissorTest}else ee.copy(Ce).multiplyScalar(Pe).floor(),me.copy(Ve).multiplyScalar(Pe).floor(),Ae=gt;if(re!==0&&(K=Aa),Ie.bindFramebuffer(H.FRAMEBUFFER,K)&&Ie.drawBuffers(A,K),Ie.viewport(ee),Ie.scissor(me),Ie.setScissorTest(Ae),te){const _e=O.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+q,_e.__webglTexture,re)}else if(Xe){const _e=q;for(let Ze=0;Ze<A.textures.length;Ze++){const Je=O.get(A.textures[Ze]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ze,Je.__webglTexture,re,_e)}}else if(A!==null&&re!==0){const _e=O.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,_e.__webglTexture,re)}I=-1},this.readRenderTargetPixels=function(A,q,re,K,te,Xe,$e,_e=0){if(!(A&&A.isWebGLRenderTarget)){rn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=O.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&$e!==void 0&&(Ze=Ze[$e]),Ze){Ie.bindFramebuffer(H.FRAMEBUFFER,Ze);try{const Je=A.textures[_e],ft=Je.format,Lt=Je.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+_e),!dn.textureFormatReadable(ft)){rn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dn.textureTypeReadable(Lt)){rn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=A.width-K&&re>=0&&re<=A.height-te&&H.readPixels(q,re,K,te,V.convert(ft),V.convert(Lt),Xe)}finally{const Je=Y!==null?O.get(Y).__webglFramebuffer:null;Ie.bindFramebuffer(H.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(A,q,re,K,te,Xe,$e,_e=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=O.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&$e!==void 0&&(Ze=Ze[$e]),Ze)if(q>=0&&q<=A.width-K&&re>=0&&re<=A.height-te){Ie.bindFramebuffer(H.FRAMEBUFFER,Ze);const Je=A.textures[_e],ft=Je.format,Lt=Je.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+_e),!dn.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dn.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ut=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,ut),H.bufferData(H.PIXEL_PACK_BUFFER,Xe.byteLength,H.STREAM_READ),H.readPixels(q,re,K,te,V.convert(ft),V.convert(Lt),0);const nn=Y!==null?O.get(Y).__webglFramebuffer:null;Ie.bindFramebuffer(H.FRAMEBUFFER,nn);const Pn=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await GE(H,Pn,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,ut),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Xe),H.deleteBuffer(ut),H.deleteSync(Pn),Xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,q=null,re=0){const K=Math.pow(2,-re),te=Math.floor(A.image.width*K),Xe=Math.floor(A.image.height*K),$e=q!==null?q.x:0,_e=q!==null?q.y:0;M.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,re,0,0,$e,_e,te,Xe),Ie.unbindTexture()};const qn=H.createFramebuffer(),es=H.createFramebuffer();this.copyTextureToTexture=function(A,q,re=null,K=null,te=0,Xe=0){let $e,_e,Ze,Je,ft,Lt,ut,nn,Pn;const pt=A.isCompressedTexture?A.mipmaps[Xe]:A.image;if(re!==null)$e=re.max.x-re.min.x,_e=re.max.y-re.min.y,Ze=re.isBox3?re.max.z-re.min.z:1,Je=re.min.x,ft=re.min.y,Lt=re.isBox3?re.min.z:0;else{const xn=Math.pow(2,-te);$e=Math.floor(pt.width*xn),_e=Math.floor(pt.height*xn),A.isDataArrayTexture?Ze=pt.depth:A.isData3DTexture?Ze=Math.floor(pt.depth*xn):Ze=1,Je=0,ft=0,Lt=0}K!==null?(ut=K.x,nn=K.y,Pn=K.z):(ut=0,nn=0,Pn=0);const on=V.convert(q.format),ln=V.convert(q.type);let We;q.isData3DTexture?(M.setTexture3D(q,0),We=H.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(M.setTexture2DArray(q,0),We=H.TEXTURE_2D_ARRAY):(M.setTexture2D(q,0),We=H.TEXTURE_2D),Ie.activeTexture(H.TEXTURE0),Ie.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),Ie.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),Ie.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);const Nn=Ie.getParameter(H.UNPACK_ROW_LENGTH),Bt=Ie.getParameter(H.UNPACK_IMAGE_HEIGHT),$n=Ie.getParameter(H.UNPACK_SKIP_PIXELS),ai=Ie.getParameter(H.UNPACK_SKIP_ROWS),oa=Ie.getParameter(H.UNPACK_SKIP_IMAGES);Ie.pixelStorei(H.UNPACK_ROW_LENGTH,pt.width),Ie.pixelStorei(H.UNPACK_IMAGE_HEIGHT,pt.height),Ie.pixelStorei(H.UNPACK_SKIP_PIXELS,Je),Ie.pixelStorei(H.UNPACK_SKIP_ROWS,ft),Ie.pixelStorei(H.UNPACK_SKIP_IMAGES,Lt);const Hn=A.isDataArrayTexture||A.isData3DTexture,Pt=q.isDataArrayTexture||q.isData3DTexture;if(A.isDepthTexture){const xn=O.get(A),la=O.get(q),an=O.get(xn.__renderTarget),Si=O.get(la.__renderTarget);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,an.__webglFramebuffer),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let si=0;si<Ze;si++)Hn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,O.get(A).__webglTexture,te,Lt+si),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,O.get(q).__webglTexture,Xe,Pn+si)),H.blitFramebuffer(Je,ft,$e,_e,ut,nn,$e,_e,H.DEPTH_BUFFER_BIT,H.NEAREST);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(te!==0||A.isRenderTargetTexture||O.has(A)){const xn=O.get(A),la=O.get(q);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,qn),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,es);for(let an=0;an<Ze;an++)Hn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,xn.__webglTexture,te,Lt+an):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,xn.__webglTexture,te),Pt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,la.__webglTexture,Xe,Pn+an):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,la.__webglTexture,Xe),te!==0?H.blitFramebuffer(Je,ft,$e,_e,ut,nn,$e,_e,H.COLOR_BUFFER_BIT,H.NEAREST):Pt?H.copyTexSubImage3D(We,Xe,ut,nn,Pn+an,Je,ft,$e,_e):H.copyTexSubImage2D(We,Xe,ut,nn,Je,ft,$e,_e);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Pt?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(We,Xe,ut,nn,Pn,$e,_e,Ze,on,ln,pt.data):q.isCompressedArrayTexture?H.compressedTexSubImage3D(We,Xe,ut,nn,Pn,$e,_e,Ze,on,pt.data):H.texSubImage3D(We,Xe,ut,nn,Pn,$e,_e,Ze,on,ln,pt):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Xe,ut,nn,$e,_e,on,ln,pt.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Xe,ut,nn,pt.width,pt.height,on,pt.data):H.texSubImage2D(H.TEXTURE_2D,Xe,ut,nn,$e,_e,on,ln,pt);Ie.pixelStorei(H.UNPACK_ROW_LENGTH,Nn),Ie.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Bt),Ie.pixelStorei(H.UNPACK_SKIP_PIXELS,$n),Ie.pixelStorei(H.UNPACK_SKIP_ROWS,ai),Ie.pixelStorei(H.UNPACK_SKIP_IMAGES,oa),Xe===0&&q.generateMipmaps&&H.generateMipmap(We),Ie.unbindTexture()},this.initRenderTarget=function(A){O.get(A).__webglFramebuffer===void 0&&M.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?M.setTextureCube(A,0):A.isData3DTexture?M.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?M.setTexture2DArray(A,0):M.setTexture2D(A,0),Ie.unbindTexture()},this.resetState=function(){de=0,se=0,Y=null,Ie.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ds}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Jt._getUnpackColorSpace()}}const iv={type:"change"},Om={type:"start"},xb={type:"end"},xf=new nb,av=new Dr,Mw=Math.cos(70*VE.DEG2RAD),_i=new ne,sa=2*Math.PI,Rn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xp=1e-6;class Tw extends wS{constructor(e,i=null){super(e,i),this.state=Rn.NONE,this.target=new ne,this.cursor=new ne,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Sl.ROTATE,MIDDLE:Sl.DOLLY,RIGHT:Sl.PAN},this.touches={ONE:El.ROTATE,TWO:El.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ne,this._lastQuaternion=new Br,this._lastTargetPosition=new ne,this._quat=new Br().setFromUnitVectors(e.up,new ne(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new O_,this._sphericalDelta=new O_,this._scale=1,this._panOffset=new ne,this._rotateStart=new Xt,this._rotateEnd=new Xt,this._rotateDelta=new Xt,this._panStart=new Xt,this._panEnd=new Xt,this._panDelta=new Xt,this._dollyStart=new Xt,this._dollyEnd=new Xt,this._dollyDelta=new Xt,this._dollyDirection=new ne,this._mouse=new Xt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ww.bind(this),this._onPointerDown=Aw.bind(this),this._onPointerUp=Rw.bind(this),this._onContextMenu=Uw.bind(this),this._onMouseWheel=Ow.bind(this),this._onKeyDown=Dw.bind(this),this._onTouchStart=Lw.bind(this),this._onTouchMove=Iw.bind(this),this._onMouseDown=Cw.bind(this),this._onMouseMove=Nw.bind(this),this._interceptControlDown=Pw.bind(this),this._interceptControlUp=Fw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(iv),this.update(),this.state=Rn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;_i.copy(i).sub(this.target),_i.applyQuaternion(this._quat),this._spherical.setFromVector3(_i),this.autoRotate&&this.state===Rn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=sa:s>Math.PI&&(s-=sa),l<-Math.PI?l+=sa:l>Math.PI&&(l-=sa),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(_i.setFromSpherical(this._spherical),_i.applyQuaternion(this._quatInverse),i.copy(this.target).add(_i),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=_i.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ne(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ne(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=_i.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(xf.origin.copy(this.object.position),xf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xf.direction))<Mw?this.object.lookAt(this.target):(av.setFromNormalAndCoplanarPoint(this.object.up,this.target),xf.intersectPlane(av,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>xp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xp||this._lastTargetPosition.distanceToSquared(this.target)>xp?(this.dispatchEvent(iv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sa/60*this.autoRotateSpeed*e:sa/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){_i.setFromMatrixColumn(i,0),_i.multiplyScalar(-e),this._panOffset.add(_i)}_panUp(e,i){this.screenSpacePanning===!0?_i.setFromMatrixColumn(i,1):(_i.setFromMatrixColumn(i,0),_i.crossVectors(this.object.up,_i)),_i.multiplyScalar(e),this._panOffset.add(_i)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;_i.copy(l).sub(this.target);let c=_i.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(sa*this._rotateDelta.x/i.clientHeight),this._rotateUp(sa*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-sa*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(sa*this._rotateDelta.x/i.clientHeight),this._rotateUp(sa*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Xt,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function Aw(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ww(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Rw(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(xb),this.state=Rn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function Cw(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Sl.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Rn.DOLLY;break;case Sl.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Rn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Rn.ROTATE}break;case Sl.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Rn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Rn.PAN}break;default:this.state=Rn.NONE}this.state!==Rn.NONE&&this.dispatchEvent(Om)}function Nw(r){switch(this.state){case Rn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Rn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Ow(r){this.enabled===!1||this.enableZoom===!1||this.state!==Rn.NONE||(r.preventDefault(),this.dispatchEvent(Om),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(xb))}function Dw(r){this.enabled!==!1&&this._handleKeyDown(r)}function Lw(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case El.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Rn.TOUCH_ROTATE;break;case El.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Rn.TOUCH_PAN;break;default:this.state=Rn.NONE}break;case 2:switch(this.touches.TWO){case El.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Rn.TOUCH_DOLLY_PAN;break;case El.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Rn.TOUCH_DOLLY_ROTATE;break;default:this.state=Rn.NONE}break;default:this.state=Rn.NONE}this.state!==Rn.NONE&&this.dispatchEvent(Om)}function Iw(r){switch(this._trackPointer(r),this.state){case Rn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Rn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Rn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Rn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Rn.NONE}}function Uw(r){this.enabled!==!1&&r.preventDefault()}function Pw(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Fw(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Bw=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),zw=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),sv=r=>{const e=zw(r);return e.charAt(0).toUpperCase()+e.slice(1)},_b=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),Gw=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var Hw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const kw=Ne.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>Ne.createElement("svg",{ref:m,...Hw,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:_b("lucide",l),...!c&&!Gw(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,_])=>Ne.createElement(p,_)),...Array.isArray(c)?c:[c]]));const ci=(r,e)=>{const i=Ne.forwardRef(({className:s,...l},c)=>Ne.createElement(kw,{ref:c,iconNode:e,className:_b(`lucide-${Bw(sv(r))}`,`lucide-${r}`,s),...l}));return i.displayName=sv(r),i};const Vw=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Tc=ci("arrow-right",Vw);const jw=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],pm=ci("brain-circuit",jw);const Xw=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Yw=ci("camera",Xw);const Ww=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],bl=ci("check",Ww);const qw=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],rv=ci("chevron-down",qw);const $w=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],va=ci("circle-check",$w);const Kw=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Ac=ci("copy",Kw);const Zw=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],ov=ci("download",Zw);const Qw=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Jw=ci("file-text",Qw);const eR=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],wc=ci("globe",eR);const tR=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],lv=ci("image",tR);const nR=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],za=ci("loader-circle",nR);const iR=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],aR=ci("log-out",iR);const sR=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],rR=ci("plus",sR);const oR=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],cv=ci("refresh-cw",oR);const lR=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],uv=ci("sparkles",lR);const cR=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],uR=ci("square",cR);const fR=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],_p=ci("trash-2",fR);const dR=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],fv=ci("triangle-alert",dR);const hR=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],vp=ci("wand-sparkles",hR);const pR=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],wf=ci("zap",pR);var dv;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(dv||(dv={}));var hv;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(hv||(hv={}));var pv;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(pv||(pv={}));const mv=["user","model","function","system"];var gv;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(gv||(gv={}));var xv;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(xv||(xv={}));var _v;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(_v||(_v={}));var vv;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(vv||(vv={}));var Nc;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(Nc||(Nc={}));var bv;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(bv||(bv={}));var yv;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(yv||(yv={}));var Ev;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(Ev||(Ev={}));class ji extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class yl extends ji{constructor(e,i){super(e),this.response=i}}class vb extends ji{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class Pr extends ji{}class bb extends ji{}const mR="https://generativelanguage.googleapis.com",gR="v1beta",xR="0.24.1",_R="genai-js";var So;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(So||(So={}));class vR{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||gR;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||mR}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function bR(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${_R}/${xR}`),e.join(" ")}async function yR(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",bR(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new Pr(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new Pr(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new Pr(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function ER(r,e,i,s,l,c){const f=new vR(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},AR(c)),{method:"POST",headers:await yR(f),body:l})}}async function zc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await ER(r,e,i,s,l,c);return SR(h,m,f)}async function SR(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){MR(l,r)}return s.ok||await TR(s,r),s}function MR(r,e){let i=r;throw i.name==="AbortError"?(i=new bb(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof vb||r instanceof Pr||(i=new ji(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function TR(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new vb(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function AR(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function Dm(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Rf(r.candidates[0]))throw new yl(`${Lr(r)}`,r);return wR(r)}else if(r.promptFeedback)throw new yl(`Text not available. ${Lr(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Rf(r.candidates[0]))throw new yl(`${Lr(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Sv(r)[0]}else if(r.promptFeedback)throw new yl(`Function call not available. ${Lr(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Rf(r.candidates[0]))throw new yl(`${Lr(r)}`,r);return Sv(r)}else if(r.promptFeedback)throw new yl(`Function call not available. ${Lr(r)}`,r)},r}function wR(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function Sv(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const RR=[Nc.RECITATION,Nc.SAFETY,Nc.LANGUAGE];function Rf(r){return!!r.finishReason&&RR.includes(r.finishReason)}function Lr(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];Rf(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Ic(r){return this instanceof Ic?(this.v=r,this):new Ic(r)}function CR(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(y){return new Promise(function(T,C){c.push([g,y,T,C])>1||h(g,y)})})}function h(g,y){try{m(s[g](y))}catch(T){b(c[0][3],T)}}function m(g){g.value instanceof Ic?Promise.resolve(g.value.v).then(p,_):b(c[0][2],g)}function p(g){h("next",g)}function _(g){h("throw",g)}function b(g,y){g(y),c.shift(),c.length&&h(c[0][0],c[0][1])}}const Mv=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function NR(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=LR(e),[s,l]=i.tee();return{stream:DR(s),response:OR(l)}}async function OR(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return Dm(IR(e));e.push(l)}}function DR(r){return CR(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Ic(i.read());if(l)break;yield yield Ic(Dm(s))}})}function LR(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new ji("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(Mv),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new ji(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(Mv)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new bb("Request aborted when reading from the stream"):h=new ji("Error reading from the stream"),h})}}})}function IR(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function yb(r,e,i,s){const l=await zc(e,So.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return NR(l)}async function Eb(r,e,i,s){const c=await(await zc(e,So.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:Dm(c)}}function Sb(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Uc(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return UR(e)}function UR(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new ji("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new ji("No content is provided for sending chat message.");return s?e:i}function PR(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new Pr("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=Uc(r);s.contents=[c]}return{generateContentRequest:s}}function Tv(r){let e;return r.contents?e=r:e={contents:[Uc(r)]},r.systemInstruction&&(e.systemInstruction=Sb(r.systemInstruction)),e}function FR(r){return typeof r=="string"||Array.isArray(r)?{content:Uc(r)}:r}const Av=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],BR={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function zR(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new ji(`First content should be with role 'user', got ${s}`);if(!mv.includes(s))throw new ji(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(mv)}`);if(!Array.isArray(l))throw new ji("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new ji("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of Av)m in h&&(c[m]+=1);const f=BR[s];for(const h of Av)if(!f.includes(h)&&c[h]>0)throw new ji(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function wv(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const Rv="SILENT_ERROR";class GR{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(zR(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Uc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},b=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>Eb(this._apiKey,this.model,_,b)).then(y=>{var T;if(wv(y.response)){this._history.push(p);const C=Object.assign({parts:[],role:"model"},(T=y.response.candidates)===null||T===void 0?void 0:T[0].content);this._history.push(C)}else{const C=Lr(y.response);C&&console.warn(`sendMessage() was unsuccessful. ${C}. Inspect response object for details.`)}g=y}).catch(y=>{throw this._sendPromise=Promise.resolve(),y}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Uc(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},b=Object.assign(Object.assign({},this._requestOptions),i),g=yb(this._apiKey,this.model,_,b);return this._sendPromise=this._sendPromise.then(()=>g).catch(y=>{throw new Error(Rv)}).then(y=>y.response).then(y=>{if(wv(y)){this._history.push(p);const T=Object.assign({},y.candidates[0].content);T.role||(T.role="model"),this._history.push(T)}else{const T=Lr(y);T&&console.warn(`sendMessageStream() was unsuccessful. ${T}. Inspect response object for details.`)}}).catch(y=>{y.message!==Rv&&console.error(y)}),g}}async function HR(r,e,i,s){return(await zc(e,So.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function kR(r,e,i,s){return(await zc(e,So.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function VR(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await zc(e,So.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class Cv{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Sb(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=Tv(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Eb(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=Tv(e),c=Object.assign(Object.assign({},this._requestOptions),i);return yb(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new GR(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=PR(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return HR(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=FR(e),l=Object.assign(Object.assign({},this._requestOptions),i);return kR(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return VR(this.apiKey,this.model,e,s)}}class jR{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new ji("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Cv(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new Pr("Cached content must contain a `name` field.");if(!e.model)throw new Pr("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new Pr(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new Cv(this.apiKey,c,s)}}const Mb=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",XR=["gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],YR=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3-flash-preview","gemini-2.5-flash-lite"];let Nl="";const Cf=r=>{Nl=r},Lm=()=>Nl,Tb=async()=>{if(!Nl)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Mb}/v1beta/models?key=${Nl}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Ab=async(r,e=null,i=null,s)=>{if(!Nl)throw new Error("API Key is initialized.");const l=new jR(Nl),c=e&&e.length>0?YR:XR;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let _=[];i&&_.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&_.push(...e),_.push({text:r});const b={model:p},g=l.getGenerativeModel(b,{apiVersion:"v1beta",baseUrl:Mb}),y=new Promise((L,z)=>setTimeout(()=>z(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),T=e&&e.length>0?[]:[{googleSearch:{}}];let C;try{C=await Promise.race([g.generateContent({contents:[{role:"user",parts:_}],tools:T,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),y])}catch(L){if(T.length>0)console.warn(`[API] Grounding failed for ${p} (${L.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),C=await g.generateContent({contents:[{role:"user",parts:_}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw L}const S=C.response,E=S.candidates||[];if(!E.length)throw S.promptFeedback&&(console.warn("Prompt Feedback:",S.promptFeedback),S.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${S.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=E[0];let U="";try{U=S.text()}catch(L){console.warn(L)}const D=N.content?.parts||[];let X="";if(D.forEach(L=>{L.thought&&(X+=L.thought)}),!U){const L=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${L}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${L})`),new Error(`Empty response (FinishReason: ${L}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:U,thought:X||"通常処理が完了しました。",model:p}}catch(_){console.warn(`Model ${p} failed:`,_.message),_.message.includes("429")||_.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!_.message.includes("フィルター検知")&&!_.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${_.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Tb();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},WR=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Ab,diagnoseConnection:Tb,getApiKey:Lm,setApiKey:Cf},Symbol.toStringTag,{value:"Module"})),qR="modulepreload",$R=function(r,e){return new URL(r,e).href},Nv={},KR=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(_){return Promise.all(_.map(b=>Promise.resolve(b).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(_=>{if(_=$R(_,s),_ in Nv)return;Nv[_]=!0;const b=_.endsWith(".css"),g=b?'[rel="stylesheet"]':"";if(s)for(let T=f.length-1;T>=0;T--){const C=f[T];if(C.href===_&&(!b||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${g}`))return;const y=document.createElement("link");if(y.rel=b?"stylesheet":qR,b||(y.as="script"),y.crossOrigin="",y.href=_,m&&y.setAttribute("nonce",m),document.head.appendChild(y),b)return new Promise((T,C)=>{y.addEventListener("load",T),y.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${_}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},ZR=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],QR=async(r,e,i=[])=>{const s=Lm();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of ZR)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,_;if(f.startsWith("gemini")){const b=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(y=>{const T=y.includes(",")?y.split(",")[1]:y,C=y.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:C?C[1]:"image/png",data:T}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:b}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.candidates&&_.candidates.length>0&&_.candidates[0].content&&_.candidates[0].content.parts){const y=_.candidates[0].content.parts.find(T=>T.inlineData);if(y&&y.inlineData&&y.inlineData.data)return{base64Img:y.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.predictions&&_.predictions[0]&&_.predictions[0].bytesBase64Encoded)return{base64Img:_.predictions[0].bytesBase64Encoded,usedModel:f};if(_.predictions&&_.predictions[0]&&typeof _.predictions[0]=="string")return{base64Img:_.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await KR(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>WR);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let wb="";const bp=r=>{wb=r},Uf=()=>wb,JR=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=Uf();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},eC=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],tC=["gpt-4.1","gpt-4o","gpt-4.1-mini"],nC=async(r,e=null,i=null,s)=>{const l=Uf();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?tC:eC;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0)for(const S of e)S.inlineData&&(p.push({type:"image_url",image_url:{url:`data:${S.inlineData.mimeType};base64,${S.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const _=new AbortController,b=setTimeout(()=>_.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:_.signal})}catch(S){throw S.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):S}finally{clearTimeout(b)}if(!g.ok){const E=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${E}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const T=(await g.json()).choices?.[0];if(!T||!T.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const C=T.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:C,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let mm="gemini";const yp=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),mm="gemini";return}mm=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},po=async(r,e=null,i=null,s)=>mm==="openai"?nC(r,e,i,s):Ab(r,e,i,s),iC={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},aC={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},sC=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],rC=r=>{const e=aC[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...sC].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},oC=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(iC)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r};console.log("HELLO_USER_FIXED_VERSION_2_25");const mo="v3.72-alpha",Ep=r=>{const e=r||"";return e.includes("sensitive")||e.includes("Responsible AI")||e.includes("400")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:e.includes("not found")||e.includes("not supported")||e.includes("404")||e.includes("403")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がありません、または制限されています。
[対処法] 時間を置くか、設定を見直してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑している可能性があります。数分時間を置いてから再度お試しください。`},lC=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},cC=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断の実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},_f=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=Ne.useRef(null);Ne.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:x.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[x.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),x.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[x.jsx(pm,{size:16})," Neural Process (Thinking Mode)"]}),x.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&x.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})},Ov=({imageSrc:r,height:e=200})=>{const i=Ne.useRef(null);return Ne.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new iS,c=75,f=s.clientWidth/s.clientHeight,h=new Ga(c,f,.1,1100);h.position.set(0,0,.1);const m=new Sw({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new Tw(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const _=new MS;let b=null;_.load(r,E=>{E.mapping=bf,E.colorSpace=ba;const N=new Cm(500,60,40);N.scale(-1,1,1);const U=new Rm({map:E});b=new xs(N,U),l.add(b)});let g=c;const y=E=>{E.preventDefault();const N=E.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",y,{passive:!1});const T=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});T.observe(s);let C=null;const S=()=>{C=requestAnimationFrame(S),p.update(),m.render(l,h)};return S(),()=>{cancelAnimationFrame(C),T.disconnect(),s.removeEventListener("wheel",y),b&&(b.geometry.dispose(),b.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),x.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Dv=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=Ne.useState(""),[f,h]=Ne.useState("");if(Ne.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",_=s==="openai",b=p,g=l.trim().startsWith("sk-"),y=_?"OpenAI API Key が必要です":b?"AI Engine を選択":"API Key が必要です",T=b?"Gemini AI Key または OpenAI Key (sk-...) を入力...":_?"sk-proj-...":"Google AI API Key を入力...",C="https://aistudio.google.com/app/apikey",S="https://platform.openai.com/api-keys",E=_?S:C,N=_?"🔑 OpenAI キーを取得":"🔑 キーを取得",U=b&&g||_?"emerald":"blue",D=U==="emerald"?"bg-emerald-600":"bg-blue-600",X=U==="emerald"?"border-emerald-500/30":"border-blue-500/30",L=U==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",z=U==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",w=U==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=U==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return x.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:x.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:x.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${X} rounded-xl shadow-2xl ${L} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&x.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),x.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[x.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[x.jsx("div",{className:`p-2 ${D} rounded-lg animate-pulse transition-colors duration-300`,children:x.jsx(wf,{size:18,className:"text-white"})}),x.jsxs("div",{children:[x.jsx("p",{className:"text-sm font-bold text-white",children:y}),x.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),x.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[x.jsx("div",{className:"flex gap-2",children:x.jsxs("form",{onSubmit:$=>{$.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[x.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:$=>c($.target.value),placeholder:T,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${w} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:$=>$.key==="Enter"&&m(),autoFocus:!0}),x.jsx("button",{onClick:m,className:`${z} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&x.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),b?x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&x.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),x.jsxs("div",{className:"flex items-center gap-4",children:[x.jsx("a",{href:C,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),x.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),x.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):x.jsx("div",{className:"flex justify-end",children:x.jsx("a",{href:E,target:"_blank",rel:"noreferrer",className:`text-[11px] ${U==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class uC extends Qy.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?x.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[x.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",mo,")"]}),x.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),x.jsx("br",{}),this.state.errorInfo?.componentStack]}),x.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}const Lv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}};function fC(){console.log("System Version Loaded:",mo);const[r,e]=Ne.useState(""),[i,s]=Ne.useState(!1),[l,c]=Ne.useState("gemini"),[f,h]=Ne.useState("news"),[m,p]=Ne.useState(""),[_,b]=Ne.useState(""),[g,y]=Ne.useState(""),[T,C]=Ne.useState(""),[S,E]=Ne.useState(""),[N,U]=Ne.useState(""),[D,X]=Ne.useState("Auto"),[L,z]=Ne.useState([{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}]),w=le=>{z(lt=>lt.map(nt=>nt.id===le?{...nt,checked:!nt.checked}:nt))},F=()=>{const le=new Date;return le.setHours(le.getHours()+9),le.toISOString().split("T")[0]},[$,k]=Ne.useState(F()),[W,de]=Ne.useState(""),[se,Y]=Ne.useState(""),[I,G]=Ne.useState(""),[ee,me]=Ne.useState(""),[Ae,P]=Ne.useState(null),[J,Te]=Ne.useState(!1);Ne.useEffect(()=>{const le=Lm();le?(Cf(le),e(le)):s(!0)},[]);const De=le=>le?le.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:"Gemini 3.1: 最高品質 (Next Generation)"}:le.includes("3-flash")||le.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:le.includes("2.5-flash")&&!le.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:le.includes("lite")||le.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:le.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:le.includes("gpt-4")||le.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${le}: テキスト生成`}:le.includes("gpt-image")||le.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${le}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:le}:null,[Pe,oe]=Ne.useState([]),[Ee,Ce]=Ne.useState(!1),[Ve,gt]=Ne.useState(!1),[et,mn]=Ne.useState(!1),[vt,Vt]=Ne.useState(!1),[gn,Ct]=Ne.useState(!1),[Xn,Yt]=Ne.useState(""),[ui,H]=Ne.useState(""),[In,Mt]=Ne.useState(""),[dn,Ie]=Ne.useState(""),[Sn,O]=Ne.useState("auto"),[M,Q]=Ne.useState(!1),[xe,be]=Ne.useState([]),[Le,Fe]=Ne.useState(""),[fe,he]=Ne.useState(!1),[je,we]=Ne.useState(""),[Be,Ue]=Ne.useState(!1),[dt,Et]=Ne.useState(!1),[Tt,V]=Ne.useState(!1),[Re,pe]=Ne.useState(!1),[Ge,ze]=Ne.useState(!1),[Se,tt]=Ne.useState(!1),[ct,Ln]=Ne.useState(!1),[tn,$i]=Ne.useState(!1),[Yn,Za]=Ne.useState(!1),[Gr,Ni]=Ne.useState(""),[Qa,Ei]=Ne.useState(!1),[Mn,ii]=Ne.useState(""),[Un,Ea]=Ne.useState(!1),[Wn,Sa]=Ne.useState(!1),[Hr,Ma]=Ne.useState(!1),[Mo,bs]=Ne.useState(""),[Ta,Ja]=Ne.useState(!1),[Aa,qn]=Ne.useState(!1),[es,A]=Ne.useState(!1),[q,re]=Ne.useState(!1),[K,te]=Ne.useState(null),[Xe,$e]=Ne.useState(null),[_e,Ze]=Ne.useState(null),[Je,ft]=Ne.useState(!1),[Lt,ut]=Ne.useState(""),[nn,Pn]=Ne.useState(!1),[pt,on]=Ne.useState(!1),[ln,We]=Ne.useState(null),[Nn,Bt]=Ne.useState(null),[$n,ai]=Ne.useState(!1),oa=(le,lt,nt,bt,ht=640,Ye=480)=>new Promise((Oe,He)=>{const Me=new Image;Me.onload=()=>{try{const at=document.createElement("canvas");at.width=ht,at.height=Ye;const Nt=at.getContext("2d"),jt=Me.width,gi=Me.height,Kn=(lt%360+360)%360/360*jt,wt=bt/360*jt,Di=gi/2-nt/180*gi,Ti=wt*(Ye/ht),Qn=Kn-wt/2,hn=Math.max(0,Math.min(gi-Ti,Di-Ti/2)),_n=Math.min(Ti,gi);if(Qn>=0&&Qn+wt<=jt)Nt.drawImage(Me,Qn,hn,wt,_n,0,0,ht,Ye);else if(Qn<0){const sn=-Qn,Fn=wt-sn,vn=Fn/wt;Nt.drawImage(Me,jt-sn,hn,sn,_n,0,0,ht*(1-vn),Ye),Nt.drawImage(Me,0,hn,Fn,_n,ht*(1-vn),0,ht*vn,Ye)}else{const sn=jt-Qn,Fn=wt-sn,vn=sn/wt;Nt.drawImage(Me,Qn,hn,sn,_n,0,0,ht*vn,Ye),Nt.drawImage(Me,0,hn,Fn,_n,ht*vn,0,ht*(1-vn),Ye)}Oe(at.toDataURL("image/jpeg",.85))}catch(at){He(at)}},Me.onerror=()=>He(new Error("画像の読み込みに失敗しました")),Me.src=le}),[Hn,Pt]=Ne.useState(!1),[xn,la]=Ne.useState(!1),an=Ne.useRef(!1),[Si,si]=Ne.useState(0),[Zs,ts]=Ne.useState(0),[To,kr]=Ne.useState(0),Mi=Ne.useRef(!1),[Ki,wa]=Ne.useState(!1),Ao=Ne.useRef(null),Dl=Ne.useRef(null),Vr=Ne.useRef(null),Ra=Ne.useRef(null),Qs=Ne.useRef(null);Ne.useEffect(()=>{Qs.current&&(Qs.current.scrollTop=Qs.current.scrollHeight)},[xe]),et||!W||W.length<20||!se||se.length<20;const[Zi,Oi]=Ne.useState(""),[jr,ys]=Ne.useState([]),Gc=le=>{const lt=le.replace(/[^\u0000-\u007F]/g,"").trim();lt!==le&&St("APIキーに含まれる不要な文字を自動削除しました。"),lt.startsWith("sk-")?(bp(lt),yp("openai"),c("openai"),Sa(!0),Ea(!0),e("openai-engine-active"),s(!1),St("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(Cf(lt),e(lt),yp("gemini"),c("gemini"),s(!1),St("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},St=le=>{Ie(le),setTimeout(()=>Ie(""),4e3)},Js=async le=>{if(!r){St("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(le.length===0)return;Ce(!0),Yt(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let lt=0;const nt=setInterval(()=>{lt++,Yt(Ye=>{if(lt<=10){const at=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return Ye+at[Math.floor(Math.random()*at.length)]}const He=`
> ⏳ AI応答を待機中... (${Math.floor(lt*.8)}秒経過)`,Me=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Me.test(Ye)?Ye.replace(Me,"")+He:Ye+He})},800),bt=[];let ht=null;for(let Ye=0;Ye<le.length;Ye++){const Oe=le[Ye],He=await new Promise(at=>{const Nt=new FileReader;Nt.onload=gi=>{const qr=gi.target.result,Kn=new Uint8Array(qr);let wt=!1;const Di="equirectangular";let Ti=0;for(let hn=0;hn<Math.min(Kn.length,65536);hn++)if(Kn[hn]===Di.charCodeAt(Ti)){if(Ti++,Ti===Di.length){wt=!0;break}}else Ti=0;const Qn=new Image;Qn.onload=()=>{const hn=Qn.naturalWidth/Qn.naturalHeight,_n=Math.abs(hn-2)<.15;at(_n&&wt)},Qn.onerror=()=>at(!1),Qn.src=URL.createObjectURL(Oe)};const jt=Oe.slice(0,65536);Nt.readAsArrayBuffer(jt)}),Me=new FileReader;Me.readAsDataURL(Oe),await new Promise(at=>{Me.onload=()=>{He&&!ht?(ht={base64:Me.result,mimeType:Oe.type},Yt(Nt=>Nt+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(bt.push(Me.result),oe(Nt=>[...Nt,Me.result])),at()}})}if(ht)try{on(!0),te(ht.base64);const Ye=ht.base64.split(",")[1],Oe={inlineData:{mimeType:ht.mimeType,data:Ye}};$e(Oe),ft(!0),Yt(Nt=>Nt+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const at=(await po(`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,[Oe],null,()=>{})).text.match(/\{[\s\S]*\}/)?.[0];if(at){const Nt=JSON.parse(at);Ze(Nt),y(Nt.location),St(`🌐 360°背景を検出: ${Nt.location}`),Yt(jt=>jt+`
> 🌐 空間解析完了: ${Nt.location}`)}else Ze({location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}),y("360°パノラマ画像")}catch(Ye){console.warn("[360° BG] Analysis failed:",Ye),Ze({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),y("360°パノラマ画像（解析失敗）")}finally{ft(!1)}if(bt.length===0&&ht){clearInterval(nt),Ce(!1),Yt(Ye=>Ye+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),St("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(bt.length===0){clearInterval(nt),Ce(!1);return}St(`思考モード: ${bt.length}枚のキャラクター設定画を同時解析中...${ht?"（+ 360°背景1枚検出済み）":""}`);try{const Ye=bt.map(Me=>{const at=Me.split(",")[1];return{inlineData:{mimeType:Me.split(";")[0].split(":")[1],data:at}}}),He=await po(`
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
      `,Ye,null,Me=>{Yt(at=>at+`
> ${Me}`)});de(He.text),P(He.model),Yt(Me=>{const at=`

--- ✅ 解析完了 ---
`,Nt=He.thought&&He.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${He.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return Me+at+Nt}),St("全キャラクターの解析が完了しました。"),Hn&&(Mi.current?(Pt(!1),si(0),wa(!1),St("⏹ フルオートを中断しました。")):kr(Me=>Me+1))}catch(Ye){console.error(Ye);const Oe=Ep(Ye.message);Yt(He=>He+`

[システムエラー]: ${Ye.message}
--------------------------------------------------
${Oe}`),St("解析エラー: "+Ye.message),Hn&&(Pt(!1),si(0),wa(!1))}finally{clearInterval(nt),Ce(!1)}},Hc=async()=>{if(!se||se.length<20)return St("先にシナリオを生成してください。");if(!(dt||Tt||Re||Ge||Se||ct||tn))return St("少なくとも1つの強化カテゴリをONにしてください。");if(Yn)return;Za(!0),Ni("> [START] シナリオ強化を開始します..."),Mn||(ii(se),Ni(Ye=>Ye+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const lt=[];dt&&lt.push(`【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。
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
良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。`),Tt&&lt.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。"),Re&&lt.push(`【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。
⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:
- sparkling light particles → 代わりに soft glow を使え
- glowing dust → 代わりに clean bloom を使え
- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え
- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え`),Ge&&lt.push(`【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。
- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。
- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。
- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。
- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。
- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。`),Se&&lt.push(`【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。
- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）
- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）
- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）
- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）
- 引き/ロングショット（宇宙や上空からの空気感）
- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）
⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。
4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。`),ct&&lt.push(`【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。

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
- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ`),Ni(Ye=>Ye+`
> [CONFIG] 強化カテゴリ: ${lt.length}個`);let nt=0;const bt=setInterval(()=>{nt++,Ni(Ye=>{if(nt<=5){const at=[`
> [PROCESS] 演出データベースを参照中...`,`
> [PROCESS] 感情ベクトルを計算中...`,`
> [PROCESS] 表現パターンを最適化中...`];return Ye+at[Math.floor(Math.random()*at.length)]}const He=`
> ⏳ AI応答を待機中... (${Math.floor(nt*.8)}秒経過)`,Me=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Me.test(Ye)?Ye.replace(Me,"")+He:Ye+He})},800),ht=`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${lt.join(`

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
${se}

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`;try{Ni(Oe=>Oe+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const Ye=await po(ht,[],W,Oe=>{Ni(He=>He+`
> [API] ${Oe}`)});Ye&&Ye.text&&Ye.text.length>50?(Y(Ye.text.trim()),Ni(Oe=>Oe+`
> [SUCCESS] シナリオを強化しました！（${Ye.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),Et(!1),V(!1),pe(!1),ze(!1),tt(!1),Ln(!1),$i(!1),St("シナリオ強化完了！")):(Ni(Oe=>Oe+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),St("強化失敗: AIの応答が不十分です"))}catch(Ye){Ni(Oe=>Oe+`
> [ERROR] ${Ye.message}`),St("強化エラー: "+Ye.message)}finally{clearInterval(bt),Za(!1)}},zi=()=>{Mn&&(Y(Mn),ii(""),Ni(le=>le+`
> [REVERT] 元のシナリオに復元しました。`),St("シナリオを元に戻しました"))},ns=async le=>{if(!W)return St("先にキャラクターを解析してください。");if(Ve)return;const lt=Array.isArray(le)?le:L;if(f==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(f==="news"&&!lt.find(Oe=>Oe.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}gt(!0),H(""),me(""),Oi(null),Mt(""),be([]),ii(""),Ni("");let nt="";if(f==="manual")nt="手動入力",Y(""),H(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const Oe=lt.filter(He=>He.checked);Oe.length>0?(nt=Oe.map(He=>He.keywords).join(" "),St(`カテゴリ「${Oe.map(He=>He.label).join("・")}」で最新ニュースを検索中... (${$})`),Y(""),H(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Oe.map(He=>He.label).join("、")} (キーワード: ${nt}) 
 > 対象日付: ${$} 
 > Google Grounding で検索中...`)):nt="最新ニュース"}const bt=`${nt} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let ht=0;const Ye=setInterval(()=>{ht++,H(Oe=>{if(ht<=8){const Nt=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Oe+Nt[Math.floor(Math.random()*Nt.length)]}const Me=`
> ⏳ AI応答を待機中... (${Math.floor(ht*.8)}秒経過)`,at=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return at.test(Oe)?Oe.replace(at,"")+Me:Oe+Me})},800);try{let Oe="";if(f==="manual"){Oe=`
         【ユーザー提供トピック/URL】:
         ${m}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;const vn=/(https?:\/\/[^\s]+)/g,Li=m.match(vn);if(Li&&Li.length>0){H(`> 手動入力内にURLを検出: ${Li[0]} 
> プロキシ経由でコンテンツを取得中...`);try{const Ai=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(Li[0])}`);if(!Ai.ok)throw new Error(`HTTP error! status: ${Ai.status}`);const kn=await Ai.text(),Bn=new DOMParser().parseFromString(kn,"text/html");Bn.querySelectorAll("script, style").forEach(wi=>wi.remove());const Ht=Bn.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let On="";Ht.forEach(wi=>{wi.textContent.trim()&&(On+=wi.textContent.trim()+`
`)}),On.trim()||(On=Bn.body.textContent||"");const Gi=On.replace(/\s+/g," ").substring(0,3e3);H(wi=>wi+`
> コンテンツ抽出完了 (${Gi.length}文字)。注入中...`),Oe=`
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${Gi}
             
             (指示): 上記はユーザーが入力したURL（ ${Li[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `}catch(Ai){console.error("URL Fetch Error: ",Ai),H(kn=>kn+`
> 警告: URLコンテンツの取得に失敗しました (${Ai.message})。LLMの内部知識で補完します。`)}}}const He=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園のベンチ","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],Me=He[Math.floor(Math.random()*He.length)];console.log("Forced Location:",Me);const at=K&&_e&&pt?_e.location:g.trim()?g.trim():Me,Nt=rC(at),jt=oC(),gi=`
        【Context Force Reboot】
        Ignore all previous instructions and conversation history.This is a fresh, standalone session.
        (ABSOLUTE PROHIBITION: Repeating topics from the past.You MUST select a FRESH, UNIQUE topic).
        (Topic Lock): Focus strictly on the category: "${nt}".
        (Time Machine Lock): The target date is **${$}**. You MUST search for news/events that happened AROUND this date.
        (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

    あなたはプロの風刺漫画脚本家です。
        
        ${f==="manual"?`「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。
 トピック: ${m}

${Oe}`:`「${bt}」に関する、** 指定された日付（${$}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`}

        【選定ルールの絶対厳守】

   1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
    2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
         （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
   3.  抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
   4. **【場所（Location）の選定義務】**:
      - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
      - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
       
       ${K&&_e&&pt?`
       4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
           - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
           - AI解析結果: 場所=「${_e.location}」、光源=「${_e.lighting}」、特徴物=「${_e.objects||"なし"}」、雰囲気=「${_e.mood||"不明"}」
           - **【カメラワーク・フロアプラン制約】**:
             * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
             * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
           - **【ライティング整合性】**:
             * 各コマのキャラクター描写において、光源方向「${_e.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
           - **【背景の部分使用の許可】**:
             * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
             * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
       `:""}
       4. **【強制舞台指定 (Location Lock)】**:
          - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
          - **指定場所: 「${K&&_e&&pt?_e.location:g.trim()?g.trim():"ニュース内容に即した場所"}」**
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
          
          ${Nt}
          
          ${jt}

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
        Punchline: [${D!=="Auto"?"必ず『"+Lv(D)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
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
        `,Kn=await po(gi,Xe&&pt?[Xe]:[],W,vn=>{H(Li=>Li+`
 > [API] ${vn} `)});P(Kn.model);let wt={topic:nt,scenario:""};try{const vn=Kn.text.match(/Topic:\s*(.+)/i),Li=Kn.text.match(/Logline:\s*(.+)/i),Ai=Kn.text.match(/Location:\s*(.+)/i),kn=Kn.text.match(/Outfit:\s*(.+)/i),ca=Kn.text.match(/Punchline:\s*(.+)/i),Bn=Kn.text.match(/Scenario:\s*([\s\S]+)/i);if(Bn)wt.topic=vn?vn[1].trim():nt,wt.topic=wt.topic.replace(/^Topic:\s*/i,"").trim(),wt.logline=Li?Li[1].trim():"",wt.location=Ai?Ai[1].trim():"Generic Background",wt.outfit=kn?kn[1].trim():"",wt.punchline=ca?ca[1].trim():"",wt.scenario=Bn[1].trim();else{const Ca=Kn.text.match(/\{[\s\S]*\}/);if(Ca){const Ht=JSON.parse(Ca[0]);wt.topic=Ht.topic||nt,wt.location=Ht.location||"Generic Background",wt.scenario=Ht.scenario||Kn.text}else{if(Kn.text.length<20)throw new Error("AI returned empty or invalid response.");wt.topic=f==="manual"?m||"Custom Scenario":_||"Generated Scenario",wt.scenario=Kn.text}}}catch(vn){console.warn("Parse warning:",vn),wt.scenario=Kn.text,wt.topic="Generated Scenario"}const Di=vn=>vn;wt.scenario=Di(wt.scenario),Y(wt.scenario);const Ti=wt.logline?`
Logline: ${wt.logline}`:"",Qn=T.trim()||wt.outfit?`
Outfit: ${T.trim()||wt.outfit}`:"",hn=wt.punchline?`
Punchline: ${wt.punchline}`:"",_n=K?pt?`
🌐 360°背景: ON (${_e?.location||"解析済み"} / ${_e?.spatialType==="indoor"?"室内":_e?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";E(g.trim()||wt.location||"Unspecified"),U(T.trim()||wt.outfit||""),H(vn=>vn+`
 > トピック選定: ${wt.topic} 
 > シナリオ構築完了。`),St("シナリオの生成が完了しました！");let sn="";if(K&&_e&&pt&&Xe)try{H(kn=>kn+`
 > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`),St("🎬 360°カメラワーク設計中..."),ai(!0);const vn=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${wt.scenario}

【360°背景の解析情報】
- 場所: ${_e.location}
- 光源: ${_e.lighting}
- 空間タイプ: ${_e.spatialType}
- 特徴物: ${_e.objects||"なし"}
- 雰囲気: ${_e.mood||"不明"}

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
}`,Ai=(await po(vn,[Xe],null,kn=>{H(ca=>ca+`
 > [Camera AI] ${kn}`)})).text.match(/\{[\s\S]*\}/)?.[0];if(Ai){const kn=JSON.parse(Ai);We(kn);const ca=Ht=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Ht%360+360)%360/45)%8],Bn=Ht=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Ht]||Ht;let Ca=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;kn.panels.forEach(Ht=>{Ca+=`
 > 🎬 コマ${Ht.panel}: ${ca(Ht.yaw)} (yaw:${Ht.yaw}°) / ${Bn(Ht.camera)} / FOV:${Ht.fov}°`,Ca+=`
 >    └─ ${Ht.reasoning}`}),Ca+=`
 > 🎬 ══════════════════════════════════`,H(Ht=>Ht+Ca),St("🎬 360°カメラワーク設計完了！背景クロップを開始...");try{H(On=>On+`
 > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...`);const Ht=[];for(const On of kn.panels){const Gi=await oa(K,On.yaw,On.pitch||0,On.fov||90);Ht.push(Gi)}Bt(Ht),H(On=>On+`
 > 🔲 [Crop] ✅ ${Ht.length}枚のクロップ画像を生成しました`),St("🎬 カメラワーク設計＋背景クロップ完了！"),ai(!1)}catch(Ht){console.warn("[360° Crop] Cropping failed:",Ht),H(On=>On+`
 > ⚠️ [Crop] クロップに失敗しました: ${Ht.message}（スキップ）`),ai(!1)}sn=`
🎬 360° Camera Work:`,kn.panels.forEach(Ht=>{sn+=`
  Panel${Ht.panel}: ${ca(Ht.yaw)}(${Ht.yaw}°) ${Bn(Ht.camera)} FOV${Ht.fov}° — ${Ht.reasoning}`})}else console.warn("[360° Camera AI] JSON parse failed, skipping camera work"),H(kn=>kn+`
 > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）`),ai(!1)}catch(vn){console.warn("[360° Camera AI] Camera work design failed:",vn),H(Li=>Li+`
 > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${vn.message}（スキップ — シナリオ生成には影響しません）`),ai(!1)}const Fn=`## タイトル: ${wt.topic} !?${Ti}
Location: ${wt.location||"Unspecified"}${Qn}${hn}${_n}${sn}

${wt.scenario} `;return Y(Fn),Fn}catch(Oe){console.error(Oe);const He=Ep(Oe.message);return H(Me=>Me+`

[システムエラー]: ${Oe.message}
--------------------------------------------------
${He}`),St("シナリオ生成エラー"),null}finally{clearInterval(Ye),gt(!1)}},er=async(le=!1,lt=null)=>{const nt=lt||se;if(!le&&(!W||!nt))return St("キャストとシナリオが必要です。");mn(!0),me(""),be([]),Fe(""),we(""),Ue(!1),Mt("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const bt=setInterval(()=>{Mt(ht=>{if(ht.length>800)return ht;const Ye=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!et)return ht;const Oe=Ye[Math.floor(Math.random()*Ye.length)];return ht+Oe})},600);try{let ht=Sn==="monochrome";if(Sn==="auto"){const xt=W.toLowerCase();ht=xt.includes("style_tag: monochrome")||xt.includes("monochrome")||xt.includes("greyscale")||xt.includes("screentone")}const Ye=ht?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",Oe={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Oe.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"},Oe.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"},Oe.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"},Oe.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"},Oe.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"},Oe.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"},Oe.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"},Oe.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"},Oe.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"},Oe.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"},Oe.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"},Oe.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const He=xt=>{const Rt=xt.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(Rt){const Qe=Rt[1].toUpperCase();if(Oe[Qe])return Qe}return"NORMAL"},Me=xt=>{const Rt=He(xt);if(Rt==="NORMAL")return"";const Qe=Oe[Rt],It=[];if(xt.split(`
`).forEach(rt=>{const st=rt.match(/^(.*?)(?:[:：]|「)/);if(st&&st[1].trim()){const Ot=st[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Ot&&!It.includes(Ot)&&It.push(Ot)}}),It.length>=2&&Qe.styleMulti){let rt=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.styleMulti}`;return Qe.proportionsMulti&&(rt+=`
PROPORTION OVERRIDE: ${Qe.proportionsMulti}`),Qe.vfxMulti&&(rt+=`
VFX: ${Qe.vfxMulti}`),rt}let Ke=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${Qe.style}`;return Qe.proportions&&(Ke+=`
PROPORTION OVERRIDE: ${Qe.proportions}`),Qe.vfx&&(Ke+=`
VFX: ${Qe.vfx}`),Ke},at=xt=>{const Rt=[];let Qe=null;if(xt.split(`
`).forEach(ke=>{const Ke=ke.replace(/\*\*/g,"").trim();if(Ke.startsWith("## ")){Qe&&Rt.push(Qe);const yt=Ke.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();Qe={name:yt,shortName:yt.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!Qe)return;if(Ke.includes("髪")||Ke.toLowerCase().includes("hair")){const yt=Ke.match(/\[WEIGHTS?\]:\s*(.*)/i),en=yt?yt[1].replace(/\|/g,""):Ke,Vn=en.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);Vn&&!Qe.hairColor&&(Qe.hairColor=Vn[1]);const ei=en.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),ua=en.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);Qe.hairStyle||(ei?Qe.hairStyle=ei[1]:ua&&(Qe.hairStyle=ua[1]))}const rt=Ke.toLowerCase(),st=/\(no[\s_-]*glasses/i.test(rt),Ot=/\([^)]*glasses[\s:]/i.test(rt)&&!st;Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES"||(st?Qe.glasses="LOCKED_NO":Ot&&(Qe.glasses="LOCKED_YES")),!(Qe.glasses==="LOCKED_NO"||Qe.glasses==="LOCKED_YES")&&(Ke.includes("眼鏡")||Ke.includes("メガネ")||rt.includes("eyewear"))&&(rt.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(Ke)?Qe.glasses="NO":(/(?:あり|有り|有|着用)/i.test(Ke)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(rt))&&(Qe.glasses="YES"))}),Qe&&Rt.push(Qe),console.log("[IDENTITY MATRIX] Glasses detection results:"),Rt.forEach(ke=>{console.log(`  ${ke.shortName}: glasses=${ke.glasses}, hair=${ke.hairColor} ${ke.hairStyle}`)}),Rt.length===0)return"";let It=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return It+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,Rt.forEach(ke=>{const Ke=[];ke.hairColor&&Ke.push(`${ke.hairColor} hair`),ke.hairStyle&&Ke.push(ke.hairStyle),ke.glasses==="YES"||ke.glasses==="LOCKED_YES"?Ke.push("MUST HAVE glasses (do NOT remove)"):ke.glasses==="NO"||ke.glasses==="LOCKED_NO"?Ke.push("MUST NOT have glasses (bare eyes)"):Ke.push("check reference image for glasses status"),It+=`- [${ke.shortName}]: ${Ke.join(", ")||"see reference image"}
`}),It+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,It+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,It},Nt=xt=>{const Qe=at(W).split(`
`).find(It=>It.includes(`[${xt}]`));return Qe?Qe.split(":").slice(1).join(":").trim():""},jt=`
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
    `;let gi=nt.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||nt.split(`
`)[0].substring(0,20);gi=gi.replace(/^Topic:\s*/i,"").trim();const qr=nt.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),Kn=nt.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),wt=qr||"Generic Detailed Background",Di=Kn&&!/^(なし|キャラシート準拠|none|default)/i.test(Kn)?Kn:"",Ti=nt.replace(/```(?:json|markdown)?/gi,"").trim(),Qn=(xt,Rt,Qe)=>{const It=new RegExp(`\\[${Rt}.*?\\]([\\s\\S]*?)(?=\\[${Qe}|$)`,"i"),ke=xt.match(It);return ke?ke[1].trim():""},hn=Qn(Ti,"1コマ目","2コマ目")||Ti,_n=Qn(Ti,"2コマ目","3コマ目"),sn=Qn(Ti,"3コマ目","4コマ目"),Fn=Qn(Ti,"4コマ目","UNKNOWN"),Ai=(xt=>{const Rt=[...xt];for(let Qe=Rt.length-1;Qe>0;Qe--){const It=Math.floor(Math.random()*(Qe+1));[Rt[Qe],Rt[It]]=[Rt[It],Rt[Qe]]}return Rt})(["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"]).slice(0,4);let kn=0;const ca={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},Bn=xt=>{const Rt=xt.match(/\[Camera:\s*(.*?)\]/i);if(Rt&&Rt[1]){const It=Rt[1].trim();let ke="";for(const[Ke,rt]of Object.entries(ca))if(It.includes(Ke)){ke=rt;break}return ke?`${ke}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const Qe=Ai[kn%Ai.length];return kn++,Qe},Ca=xt=>xt.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),Ht=xt=>{const Rt=xt.match(/\[Camera:\s*(.*?)\]/i);if(Rt&&Rt[1])return Rt[1].trim();const Qe=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return Qe[kn%Qe.length]},On=xt=>{const Rt=xt.split(`
`),Qe=[];W.split(`
`).forEach(Ke=>{const rt=Ke.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(rt){const st=rt[1].trim();Qe.push(st);const Ot=st.split(/[\(]/)[0].trim();Ot&&Ot!==st&&Qe.push(Ot);const cn=st.match(/[\(]\s*(.*?)\s*[\)]/);cn&&Qe.push(cn[1].trim())}});const It=[];let ke=1;if(Rt.forEach(Ke=>{const rt=Ke.match(/^(.*?)(?:[:：]|「)/);let st=!1,Ot=Ke;if(rt&&rt[1].trim()){let cn=rt[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const Zn=/[がをにでへはもとからまでより]/.test(cn)&&cn.length>5,yt=cn.length>12,en=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(cn),Vn=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(cn.replace(/[（(].*$/,"").trim()),ei=/[（(]\s*リアクション/i.test(rt[1]);Zn||yt||en||Vn||ei||(Qe.some(ua=>{const Ms=ua.split(/[（(]/)[0].trim();return cn===ua||cn===Ms||Ms===cn})||cn==="全員"||cn==="Speaker"||rt[0].trim().endsWith(":")||rt[0].trim().endsWith("："))&&(st=!0)}else if(Ke.trim().startsWith("「")){const cn=Ke.trim();/^「[^」]+」[？！。、!?\s]*$/.test(cn)&&(st=!0)}st&&(Ot=Ot.replace(/^.*?(?:[:：]|「)\s*/,""),Ot=Ot.replace(/^「+/,"").replace(/」+$/,""),Ot=Ot.replace(/（.*?）|\(.*?\)/g,""),Ot=Ot.trim(),Ot&&(It.push(`(Speech Bubble ${ke}: "${Ot}")`),ke++))}),It.length===0){const Ke=xt.match(/「([^」]+)」/g);Ke&&Ke.length>0&&Ke.forEach(rt=>{let st=rt.replace(/^「/,"").replace(/」$/,"").trim();st=st.replace(/（.*?）|\(.*?\)/g,"").trim();const Ot=Qe.filter(yt=>{const en=yt.split(/[\(（]/)[0].trim();return en&&st.includes(en)}),cn=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(st),Zn=Ot.length>=2&&cn&&st.length>15;st&&!Zn&&(It.push(`(Speech Bubble ${ke}: "${st}")`),ke++)})}return It.length===0?"(Characters interact without dialogue in this panel)":It.join(", ")},Gi=(xt,Rt="")=>{const Qe=xt.split(`
`),It=[];W.split(`
`).forEach(rt=>{const st=rt.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(st){const Ot=st[1].trim();It.push(Ot);const cn=Ot.split(/[\(]/)[0].trim();cn&&cn!==Ot&&It.push(cn);const Zn=Ot.match(/[\(]\s*(.*?)\s*[\)]/);Zn&&It.push(Zn[1].trim())}});let Ke=Qe.filter(rt=>{const st=rt.match(/^(.*?)(?:[:：]|「)/);let Ot=!1;if(st&&st[1].trim()){let yt=st[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();yt=yt.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const en=/[がをにでへはもとからまでより]/.test(yt)&&yt.length>5,Vn=yt.length>12,ei=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(yt),ua=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(yt.replace(/[（(].*$/,"").trim()),Ms=/[（(]\s*リアクション/i.test(st[1]);en||Vn||ei||ua||Ms||(It.some(is=>yt.includes(is)||is.includes(yt))||yt==="全員"||yt==="Speaker"||st[0].trim().endsWith(":")||st[0].trim().endsWith("："))&&(Ot=!0)}else if(rt.trim().startsWith("「")){const yt=rt.trim();/^「[^」]+」[？！。、!?\s]*$/.test(yt)&&(Ot=!0)}const cn=rt.match(/^\[\d+コマ目/),Zn=rt.trim()==="";return!Ot&&!cn&&!Zn}).join(" ").trim();return Ke=Ke.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),Ke=Ke.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),Ke=Ke||"Characters interacting dynamically based on dialogue.",Rt&&It.forEach(rt=>{const st=rt.split("(")[0].trim();Rt.includes(st)}),Ke},wi=xt=>Di?`(All characters are wearing ${Di}) ${xt}`:xt,Jn=xt=>{const Qe=xt.split(`
`).filter(Ke=>{const rt=Ke.trim();return/^\[EMOTION:/i.test(rt)||/^状況[：:]/i.test(rt)?!1:rt.includes("：")||rt.includes(":")||rt.includes("「")}),It=[];W.split(`
`).forEach(Ke=>{const rt=Ke.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(rt){const st=rt[1].trim();It.push(st);const Ot=st.split(/[（(]/)[0].trim();Ot&&Ot!==st&&It.push(Ot)}});const ke=[];if(Qe.forEach(Ke=>{const rt=Ke.match(/^(.*?)(?:[:：]|「)/);if(rt&&rt[1].trim()){let st=rt[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const Ot=/[がをにでへはもとからまでより]/.test(st)&&st.length>5,cn=st.length>12,Zn=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(st),yt=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(st.replace(/[（(].*$/,"").trim()),en=/[（(]\s*リアクション/i.test(rt[1]);if(Ot||cn||Zn||yt||en)return;st&&!ke.includes(st)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(st)&&(It.some(Vn=>{const ei=Vn.split(/[（(]/)[0].trim();return st===Vn||st===ei||ei===st})||rt[0].trim().endsWith(":")||rt[0].trim().endsWith("："))&&ke.push(st)}}),ke.length>=3){const Ke=Nt(ke[0]),rt=Nt(ke[1]),st=Nt(ke[2]);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${ke[0]}] (${Ke||"see reference"}) — First speaker
- CENTER ZONE: [${ke[1]}] (${rt||"see reference"}) — Second speaker
- LEFT ZONE: [${ke[2]}] (${st||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${ke[0]}] MUST be on the RIGHT third of the panel.
- [${ke[1]}] MUST be in the CENTER of the panel.
- [${ke[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${ke[0]}]'s bubble on the RIGHT, [${ke[1]}]'s in CENTER, [${ke[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(ke.length>=2){const Ke=Nt(ke[0]),rt=Nt(ke[1]);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${ke[0]}] (${Ke||"see reference"})
- LEFT side: [${ke[1]}] (${rt||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${Ke||ke[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${rt||ke[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${ke[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${ke[0]}]'s head.
- [${ke[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${ke[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(ke.length===1){const Ke=Nt(ke[0]);return`CRITICAL PLACEMENT & IDENTITY: [${ke[0]}] (${Ke||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},Qi=xt=>{const Rt=xt.split(`
`),Qe=[],It={};W.split(`
`).forEach(yt=>{const en=yt.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(en){const Vn=en[1].trim(),ei=Vn.split("(")[0].trim().split("（")[0].trim();ei&&(Qe.push(ei),It[ei]={name:ei,full:Vn})}});const ke=[];Rt.forEach(yt=>{const en=yt.match(/^(.*?)(?:[:：]|「)/);if(en&&en[1].trim()){let Vn=en[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();Vn&&!ke.includes(Vn)&&Qe.includes(Vn)&&ke.push(Vn)}});const Ke=[...ke],rt=xt;Qe.forEach(yt=>{!Ke.includes(yt)&&rt.includes(yt)&&Ke.push(yt)});let st=0;Rt.forEach(yt=>{const en=yt.trim();(en.includes("「")&&en.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(en))&&st++});const Ot=ke.slice(0,3).map(yt=>`[${yt}]`),cn=Qe.filter(yt=>!Ke.includes(yt));cn.length>0&&cn.forEach(yt=>{Ke.includes(yt)||Ke.push(yt)});const Zn=Ke.map(yt=>`[${yt}]`);if(Ot.length>0){let yt=`ANTI-CLONE REMINDER: ${Zn.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;Ke.length===1&&st<=1?yt+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${Zn[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${Zn[0]}. Leave the surrounding space empty rather than adding people.`:Ke.length===1&&st>=2&&(yt+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${Zn[0]} (monologue/soliloquy). Draw only ${Zn[0]} — do NOT add a second character just because there are multiple bubbles.`);const en=Ot.join(" and "),Vn=Zn.filter(Ms=>!Ot.includes(Ms)),ei=Vn.length>0?Vn.join(", "):"NO ONE ELSE",ua=`
FOREGROUND MUST CONTAIN ONLY: ${en}.
BACKGROUND MUST CONTAIN ONLY: ${ei}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${Ke.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${en} are the main focus.
${yt}${ua}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."};let tr="",nr="";const Il=W.split(`
`);for(let xt=0;xt<Il.length;xt++){const Rt=Il[xt].replace(/\*\*/g,"").trim();if(Rt.startsWith("## ")&&(nr=Rt.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),tr+=`
- Character [${nr}]: `),!nr||Di&&(Rt.includes("服装")||Rt.includes("Outfit")))continue;const Qe=Rt.match(/\[WEIGHTS?\]:\s*(.*)/i);if(Qe){let ke=Qe[1].replace(/\|/g,"").trim();ke&&ke!=="()"&&ke!=="-"&&(tr+=ke+", ");continue}const It=Rt.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);It&&It.length>=2&&(tr+=It.join(", ")+", ")}tr.trim()||(tr=W.trim());const Co=tr.trim(),Ul=Un?Ca(Co):Co,No=wt||"Detailed Background",Pl=gi||"4-koma Manga",Fl=Un?`Generated by ChatGPT with Super FURU AI 4-koma ${mo}`:`Generated by Super FURU AI 4-koma ${mo}`;let ir="";Un?ir=`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${Pl}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads "${Fl}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font.
- Draw tiny Japanese watermark text that reads "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor" positioned at the bottom-left corner of the 4th panel.
- Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.
- Exactly 4 EQUAL horizontal panels, stacked vertically with thick white gutters between them. Panels MUST NOT touch.

ART STYLE:
- High-budget TV anime production quality. Pristine clean cel-shading with smooth gradient shadows and rich saturated color palette.
- Cinematic color grading with smooth light diffusion and gentle rim lighting on character edges.
- Foreground characters have bold ink outlines with varied line weight. Add a subtle white glow outside the character's outline to prevent blending with the background.
- Backgrounds should have slightly lower saturation and softer focus (shallow depth of field) to make characters pop.
- NOISE REDUCTION: Strictly avoid intricate micro-textures, grainy noise, rough surfaces, excessive gloss, random sparkling, or muddy overlays. Keep character surfaces incredibly smooth and clean, while maintaining dramatic cel-shading. Prioritize readable silhouettes and bold outlines over excessive micro-details.
- ${Ye}
- Setting: ${No}
${K&&_e&&pt?Nn&&Nn.length===4&&!Un?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${_e.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${_e.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
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
${Di?`- IGNORE reference clothing. All characters MUST wear exactly: ${Di}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels."}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${Ul}
- Identity Anchor: ${at(W)}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. Preserve exact hair color, eye color, and skin tone in every panel.

PANEL DESCRIPTIONS:

## Panel 1
${Me(hn)}
${Jn(hn).replace(/\\[/g, '').replace(/\\]/g,"")}
${Qi(hn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Un?Ht(hn):Bn(hn)}
Action: ${wi(Gi(hn,Jn(hn)))}
Dialogue (Japanese text inside speech bubbles only): ${On(hn)}

## Panel 2
${Me(_n)}
${Jn(_n).replace(/\\[/g, '').replace(/\\]/g,"")}
${Qi(_n).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Un?Ht(_n):Bn(_n)}
Action: ${wi(Gi(_n,Jn(_n)))}
Dialogue (Japanese text inside speech bubbles only): ${On(_n)}

## Panel 3
${Me(sn)}
${Jn(sn).replace(/\\[/g, '').replace(/\\]/g,"")}
${Qi(sn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Un?Ht(sn):Bn(sn)}
Action: ${wi(Gi(sn,Jn(sn)))}
Dialogue (Japanese text inside speech bubbles only): ${On(sn)}

## Panel 4
${Me(Fn)}
${Jn(Fn).replace(/\\[/g, '').replace(/\\]/g,"")}
${Qi(Fn).replace(/\\[/g, '').replace(/\\]/g,"")}
Camera: ${Un?Ht(Fn):Bn(Fn)}
Action: ${wi(Gi(Fn,Jn(Fn)))}
Dialogue (Japanese text inside speech bubbles only): ${On(Fn)}

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
`:(ir=`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${Pl}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${Fl}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor".
Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${Ye}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${No}.
${K&&_e&&pt?Nn&&Nn.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${_e.lighting}), objects (${_e.objects||"various"}), and mood (${_e.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${_e.lighting}), spatial layout, objects (${_e.objects||"various"}), and mood (${_e.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:""}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${Di?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:""}
Cast:
${Co}
${Di?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${Di}. Apply tags directly.`:""}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${at(W)}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.

Camera & Comp:
${jt}
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
${Me(hn)}
${Jn(hn)}
${Qi(hn)}
Camera: ${Bn(hn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Gi(hn,Jn(hn)))}.
Dialogue (ONLY inside bubbles): ${On(hn)}.

## Panel 2
${Me(_n)}
${Jn(_n)}
${Qi(_n)}
Camera: ${Bn(_n)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Gi(_n,Jn(_n)))}.
Dialogue (ONLY inside bubbles): ${On(_n)}.

## Panel 3
${Me(sn)}
${Jn(sn)}
${Qi(sn)}
Camera: ${Bn(sn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Gi(sn,Jn(sn)))}.
Dialogue (ONLY inside bubbles): ${On(sn)}.

## Panel 4
${Me(Fn)}
${Jn(Fn)}
${Qi(Fn)}
Camera: ${Bn(Fn)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${wi(Gi(Fn,Jn(Fn)))}.
Dialogue (ONLY inside bubbles): ${On(Fn)}.

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
      `,ir=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`+ir),await new Promise(xt=>setTimeout(xt,800));let Oo=lC(ir.trim());return D==="Documentary"&&(Oo=cC(Oo),Mt(xt=>xt+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`)),Mt(xt=>xt+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),me(Oo),Mt(xt=>xt+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),St("最終プロンプトの構築が完了しました。画像生成を開始します..."),Oo}catch(ht){console.error(ht);const Ye=Ep(ht.message);return Mt(Oe=>Oe+`

[システムエラー]: ${ht.message}
--------------------------------------------------
${Ye}`),St("生成エラー: "+ht.message),null}finally{clearInterval(bt),mn(!1)}};Ne.useEffect(()=>{ee&&!et&&Gt>=3&&er()},[Un]);const Xr=()=>{Y(""),me(""),Oi(null),H(""),Mt(""),be([]),Pt(!1),si(0),y(""),C(""),te(null),$e(null),Ze(null),We(null),Bt(null),ai(!1),St("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},kf=()=>{de(""),Y(""),me(""),oe([]),Oi(null),Yt(""),H(""),Mt(""),Pt(!1),si(0),y(""),C(""),te(null),$e(null),Ze(null),We(null),Bt(null),ai(!1),P(null),ys([]),be([]),e(""),Cf(""),bp(""),yp(""),c(""),Sa(!1),Ea(!1),s(!0),St("全データをリセットしました。APIキーを再入力してください。")},[Yr,wo]=Ne.useState(!1),[Es,Wr]=Ne.useState(!1),[Ss,Ro]=Ne.useState(!1),kc=()=>{ee&&(navigator.clipboard.writeText(ee),wo(!0),setTimeout(()=>wo(!1),2e3),St("クリップボードにコピーしました！"))},Vc=async(le=!1,lt=null)=>{const nt=lt||ee;if(vt||!le&&!nt)return!1;Vt(!0),Ct(!1);const bt=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];Un&&(l==="openai"?bt.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):bt.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),be(bt);let ht=0;const Ye=setInterval(()=>{ht++;const Oe=Math.floor(ht*1.5);be(He=>{const Me=He.findIndex(at=>at.startsWith("[WAIT]"));if(Me!==-1){const at=[...He];return at[Me]=`[WAIT] ⏳ 画像生成API応答を待機中... (${Oe}秒経過)`,at}return[...He,`[WAIT] ⏳ 画像生成API応答を待機中... (${Oe}秒経過)`]})},1500);await new Promise(Oe=>setTimeout(Oe,800));try{St(Wn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),be(jt=>[...jt,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(jt=>setTimeout(jt,1e3));const Oe=jt=>{be(gi=>[...gi,jt])};let He,Me;if(Wn){Oe("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const jt=await JR(nt,Oe);He=jt.base64Img,Me=jt.usedModel}else{const jt=Nn&&pt&&Nn.length===4?Nn:[];jt.length>0&&Oe(`[REF] 360°背景クロップ画像 ${jt.length}枚を参照画像として添付`);const gi=await QR(nt,Oe,jt);He=gi.base64Img,Me=gi.usedModel}be(jt=>[...jt,`[4/5] データストリーム受信完了 (Model: ${Me})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const at=`data:image/png;base64,${He}`;Oi(at),ys(jt=>[{id:Date.now(),img:at},...jt]);const Nt=Me&&Me.startsWith("gpt-");return Me&&!Me.startsWith("gemini-3")&&!Nt?(Te(!0),be(jt=>[...jt,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${Wn?"ChatGPT":"Gemini"}(Web版)を開く: ${Wn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${Wn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(Te(!1),be(jt=>[...jt,"[COMPLETE] Image successfully generated."])),St("画像生成完了！"),!0}catch(Oe){console.error(Oe),Ct(!0),Oi(null);const He=Oe.message||"";let Me=[];return He.includes("Unknown parameter")||He.includes("invalid")||He.includes("Invalid")?Me=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${Wn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Wn?"ChatGPT":"Gemini"} (Web版) を開く: ${Wn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:He.includes("sensitive")||He.includes("Responsible AI")||He.includes("400")&&!He.includes("Unknown parameter")?(Fe(He),Ue(!0),Me=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):He.includes("not found")||He.includes("not supported")||He.includes("404")||He.includes("403")||He.includes("401")?Me=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${Wn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${Wn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Wn?"ChatGPT":"Gemini"} (Web版) を開く: ${Wn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Me=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${Wn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${Wn?"ChatGPT":"Gemini"} (Web版) を開く: ${Wn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],be(at=>[...at,`[ERROR] ${Oe.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...Me]),St(`生成エラー: ${Oe.message} `),!1}finally{clearInterval(Ye),Vt(!1)}},Ll=async()=>{if(!ee||!Le.trim())return;he(!0),we("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let le=0;const lt=setInterval(()=>{le++,we(nt=>{const ht=`
> ⏳ AI分析中... (${Math.floor(le*1)}秒経過)`,Ye=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return Ye.test(nt)?nt.replace(Ye,ht):nt+ht})},1e3);try{we(Me=>Me+`
> [Phase 1/5] エラーメッセージを解析中...`),we(Me=>Me+`
> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...`);const nt=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${Le.trim()}

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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,bt=await po(nt,[],null,Me=>{we(at=>at+`
> ${Me}`)});if(we(Me=>Me+`
> [Phase 3/5] AIの応答を受信・解析中...`),!bt.text||bt.text.trim().length<10){we(Me=>Me+`
> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。`);return}we(Me=>Me+`
> [Phase 4/5] 置換テーブルをプロンプトに適用中...`);let ht=[];try{let Me=bt.text.trim();const at=Me.match(/```(?:json)?\s*([\s\S]*?)```/);at&&(Me=at[1].trim());const Nt=Me.indexOf("["),jt=Me.lastIndexOf("]");Nt!==-1&&jt!==-1&&(Me=Me.substring(Nt,jt+1)),ht=JSON.parse(Me)}catch(Me){console.error("JSON parse error:",Me,"Raw:",bt.text),we(at=>at+`
> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...`),await jc();return}if(!Array.isArray(ht)||ht.length===0){we(Me=>Me+`
> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。`);return}let Ye=ee,Oe=0,He=0;for(const Me of ht)!Me.from||!Me.to||(Ye.includes(Me.from)?(Ye=Ye.replace(Me.from,Me.to),Oe++,we(at=>at+`
> ✅ "${Me.from.substring(0,40)}..." → "${Me.to.substring(0,40)}..." (${Me.reason||""})`)):(He++,we(at=>at+`
> ⚠️ 未発見（スキップ）: "${Me.from.substring(0,50)}..."`)));Oe>0?(me(Ye),we(Me=>Me+`
> [Phase 5/5] ✅ ${Oe}箇所を修正しました（${He}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`),we(Me=>Me+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),Fe("")):(we(Me=>Me+`
> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。`),we(Me=>Me+`
> [GUIDE] フォールバック（全文再生成）モードに切り替えます...`),await jc())}catch(nt){console.error(nt),we(bt=>bt+`
> [ERROR] ${nt.message}`)}finally{clearInterval(lt),he(!1)}},jc=async()=>{we(le=>le+`
> [Fallback] 全文再生成モードで修正中...`);try{const le=`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
${Le.trim()}

【修正対象のプロンプト】:
${ee}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,lt=await po(le,[],null,nt=>{we(bt=>bt+`
> ${nt}`)});lt.text&&lt.text.length>100?(me(lt.text.trim()),we(nt=>nt+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Fe("")):we(nt=>nt+`
> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。`)}catch(le){console.error(le),we(lt=>lt+`
> [Fallback ERROR] ${le.message}`)}};Ne.useEffect(()=>{To>0&&!Mi.current&&Vf()},[To]);const Vf=async()=>{if(!W||W.length<20){St("先にキャラクターシートをアップロードしてください。"),Pt(!1);return}Mi.current=!1,Pt(!0),Ea(!1),si(2);const le=[...L].sort(()=>Math.random()-.5),lt=Math.random()>.5?2:1,nt=le.slice(0,lt).map(He=>He.id),bt=L.map(He=>({...He,checked:nt.includes(He.id)}));z(bt),y(""),C(""),h("news"),await new Promise(He=>setTimeout(He,200)),Ao.current?.scrollIntoView({behavior:"smooth",block:"start"});const ht=await ns(bt);if(Mi.current||!ht){Pt(!1),si(0),wa(!1),Mi.current&&St("⏹ フルオートを中断しました。");return}si(3),Dl.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(He=>setTimeout(He,300));const Ye=await er(!0,ht);if(Mi.current||!Ye){Pt(!1),si(0),wa(!1),Mi.current&&St("⏹ フルオートを中断しました。");return}si(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(He=>setTimeout(He,300));const Oe=await Vc(!0,Ye);await new Promise(He=>setTimeout(He,800)),Ra.current?.scrollIntoView({behavior:"smooth",block:"center"}),an.current?Mi.current?(Pt(!1),si(0),wa(!1),St("⏹ 連続生成を中断しました。")):(St("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{Mi.current||kr(He=>He+1)},2e3)):(Pt(!1),si(0),wa(!1),Oe&&St("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},jf=()=>{if(Hn){Mi.current=!0,Si>0||Ee||Ve||et||vt?(wa(!0),St("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(Pt(!1),si(0),wa(!1),St("フルオートを解除しました。"));return}Mi.current=!1,wa(!1),Pt(!0),W&&W.length>=20?kr(le=>le+1):St("🚀 フルオート待機中: キャラクターシートをドロップしてください")},Gt=!W||W.length<1?1:!se||se.length<1?2:ee?Zi?5:4:3;return x.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[x.jsx(Dv,{isOpen:i,onSave:Gc,provider:"google"}),x.jsx(Dv,{isOpen:Hr,onSave:le=>{const lt=le.trim(),nt=Uf();lt===""&&nt?(Sa(!0),St("🔑 既存のOpenAI APIキーを適用しました。"),Ma(!1)):lt.startsWith("sk-")?(bp(lt),Sa(!0),St("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Ma(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Ma(!1),Uf()||Sa(!1)},provider:"openai"}),x.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[x.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[x.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[x.jsxs("div",{className:`flex items-center gap-1.5 ${Gt>=1?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Gt===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":Gt>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:Gt>1?x.jsx(bl,{size:16}):"1"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),x.jsx(Tc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Gt>=2?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Gt===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":Gt>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:Gt>2?x.jsx(bl,{size:16}):"2"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),x.jsx(Tc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Gt>=3?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Gt===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":Gt>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:Gt>3?x.jsx(bl,{size:16}):"3"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),x.jsx(Tc,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Gt>=4?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Gt===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":Gt>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:Gt>4?x.jsx(bl,{size:16}):"4"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),x.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),x.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[x.jsxs("button",{disabled:!r||Ki,onClick:()=>{const le=!xn;la(le),an.current=le},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:xn?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${xn?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[x.jsx(cv,{size:14,className:xn?"animate-spin":"",style:{animationDuration:"3s"}}),x.jsx("span",{className:"whitespace-nowrap",children:xn?"無限ループ設定 解除":"無限ループ設定 ON"})]}),x.jsxs("button",{disabled:!r||Ki,onClick:jf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:Hn?Ki?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Hn?Ki?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!Ki?"opacity-50 cursor-not-allowed":""}`,children:[Hn?Ki?x.jsx(za,{size:14,className:"animate-spin"}):x.jsx(uR,{size:14,fill:"currentColor"}):x.jsx(wf,{size:14}),Hn?Ki?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),x.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),x.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[x.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),x.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),x.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(l==="openai"||Wn)&&x.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),Ro(!0),setTimeout(()=>Ro(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${Ss?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[x.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[Ss?x.jsx(bl,{size:16}):x.jsx(Ac,{size:16}),x.jsx("span",{className:"whitespace-nowrap",children:Ss?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),x.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),x.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:x.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${Gt===1?"w-1/4 bg-blue-500":Gt===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":Gt===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":Gt>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),x.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[x.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),x.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),x.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[x.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[x.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),x.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:x.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:x.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[x.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[x.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:x.jsx(pm,{size:28,className:"text-white"})}),x.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",x.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",x.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:mo})]})]}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[x.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),x.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?l==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?l==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?l==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),r&&x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:Xr,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[x.jsx(cv,{size:12})," シナリオから再生成"]}),x.jsxs("button",{onClick:kf,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[x.jsx(aR,{size:12})," エンジン変更・全リセット"]})]})]}),Ae&&(()=>{const le=De(Ae);return le?x.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${le.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:le.label}),x.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),x.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:le.desc}),x.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[x.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),x.jsxs("p",{children:["現在 ",x.jsx("span",{className:"font-mono text-blue-300",children:Ae})," を使用中。"]}),le.tier==="Lite"&&x.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[x.jsx(fv,{size:10,className:"absolute top-2 right-2"}),x.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),x.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[x.jsxs("section",{onDragOver:le=>{le.preventDefault(),r&&Q(!0)},onDragLeave:()=>Q(!1),onDrop:le=>{le.preventDefault(),Q(!1),r&&Js(le.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${M?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
                ${Gt===1&&!M?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
                ${Gt>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[x.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${Gt===1?"text-blue-400":"text-slate-500"} `,children:[x.jsx(Yw,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),Ee&&x.jsx(za,{size:18,className:"animate-spin text-blue-400"}),Gt>1&&x.jsx(va,{size:18,className:"text-blue-500"})]}),x.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[Pe.map((le,lt)=>x.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[x.jsx("img",{src:le,className:"w-full h-full object-cover shadow-sm"}),x.jsx("button",{onClick:()=>oe(Pe.filter((nt,bt)=>bt!==lt)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:x.jsx(_p,{size:16})})]},lt)),K&&x.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${pt?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[x.jsx("img",{src:K,className:`w-full h-full object-cover shadow-sm ${pt?"opacity-100":"opacity-40 grayscale"}`}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[x.jsx(wc,{size:8})," 360° BACKGROUND"]})]}),x.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[Ee?x.jsx(za,{size:16,className:"animate-spin"}):x.jsx(x.Fragment,{children:x.jsx(rR,{size:16,className:"group-hover/add:scale-125 transition-transform"})}),x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:le=>Js(le.target.files),disabled:Ee})]}),Pe.length===0&&!Ee&&x.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:le=>Js(le.target.files)}),x.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",x.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),x.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",x.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),x.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[x.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),x.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),Ee&&x.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[x.jsxs("span",{className:"relative flex h-3 w-3",children:[x.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),x.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),x.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",Pe.length," chars... ",x.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),x.jsx("div",{className:"mb-4",children:x.jsx(_f,{thought:Xn})}),x.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),x.jsx("textarea",{value:W,onChange:le=>de(le.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(W),Ja(!0),setTimeout(()=>Ja(!1),2e3)},disabled:!W,className:`w-full ${Ta?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[Ta?x.jsx(va,{size:20}):x.jsx(Ac,{size:20}),Ta?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]}),x.jsxs("section",{ref:Ao,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${Gt===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
                 ${Gt>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(Gt<2||Ee)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),x.jsx("div",{className:"flex items-center justify-between",children:x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${Gt===2?"text-purple-400":"text-slate-500"} `,children:[x.jsx(Jw,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),x.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[x.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[x.jsxs("button",{onClick:()=>h("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),x.jsxs("button",{onClick:()=>h("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),f==="news"?x.jsxs("div",{className:"space-y-4",children:[x.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[x.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),x.jsx("input",{type:"date",value:$,onChange:le=>k(le.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsx("div",{className:"col-span-2 lg:col-cols-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),L.map(le=>x.jsxs("label",{className:`
                            relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active: border-b-2 active: translate-y-0.5
                            ${le.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
      `,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:le.checked,onChange:()=>w(le.id)}),le.checked&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-2 ${le.checked?"scale-110":"opacity-70 grayscale"} `,children:le.icon}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:le.label})]})]},le.id))]}),x.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",L.filter(le=>le.checked).map(le=>le.keywords).join(" ")||"なし"," (対象日付: ",$,")"]})]}):x.jsxs("div",{className:"space-y-2",children:[x.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",x.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),x.jsx("textarea",{value:m,onChange:le=>p(le.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),x.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[x.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${K&&pt?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[x.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:K&&pt?"#67e8f9":"#ffffff"},children:[x.jsx(wc,{size:14}),K&&pt?"🌐 360°背景 (ON)":"指定場所 (Location Override)",x.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[Je&&x.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[x.jsx(za,{size:10,className:"animate-spin"})," 解析中..."]}),K&&x.jsx("button",{onClick:le=>{le.preventDefault(),on(!pt),St(pt?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${pt?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:pt?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:pt?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!K&&x.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),K&&pt?x.jsxs("div",{className:"space-y-2",children:[x.jsx(Ov,{imageSrc:K,height:160}),_e&&x.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[x.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",_e.location]}),x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",_e.lighting]}),x.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:_e.spatialType==="indoor"?"🏠 室内":_e.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),_e.mood&&x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",_e.mood]})]}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):x.jsx("input",{type:"text",value:g,onChange:le=>y(le.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[x.jsx(uv,{size:14})," 指定服装 (Outfit Override) ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),x.jsx("input",{type:"text",value:T,onChange:le=>C(le.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[x.jsx("span",{children:"🎬"})," オチ・ディレクター ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),x.jsxs("select",{value:D,onChange:le=>X(le.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[x.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),x.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),x.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),x.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),x.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),x.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),x.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),x.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),x.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),x.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),x.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),x.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),x.jsx("button",{onClick:ns,disabled:Ve||Gt<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:Ve?x.jsxs(x.Fragment,{children:[x.jsx(za,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(wf,{size:24,className:"fill-yellow-400 text-black"}),x.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),x.jsx(Tc,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{className:"space-y-4 mt-6",children:[ui&&x.jsx("div",{className:"mt-4",children:x.jsx(_f,{thought:ui})}),x.jsxs("div",{className:"flex flex-col gap-2",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),x.jsx("textarea",{value:se,onChange:le=>Y(le.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(se),qn(!0),setTimeout(()=>qn(!1),2e3)},disabled:!se,className:`w-full ${Aa?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[Aa?x.jsx(va,{size:20}):x.jsx(Ac,{size:20}),Aa?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),x.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${se&&se.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>se&&se.length>20&&Ei(!Qa),children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🔥"}),x.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),x.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),Mn&&x.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:se&&se.length>20?Qa?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),x.jsx(rv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${Qa?"rotate-180":""}`})]})]}),Qa&&se&&se.length>20&&x.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[x.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",x.jsx("br",{}),x.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),x.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${dt?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:dt,onChange:()=>Et(!dt)}),dt&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${dt?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Tt?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Tt,onChange:()=>V(!Tt)}),Tt&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Tt?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Re?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Re,onChange:()=>pe(!Re)}),Re&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Re?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ge?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Ge,onChange:()=>ze(!Ge)}),Ge&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Ge?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Se?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Se,onChange:()=>tt(!Se)}),Se&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Se?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ct?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:ct,onChange:()=>Ln(!ct)}),ct&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(va,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${ct?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),x.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[dt&&"表情",Tt&&"身体",Re&&"演出",Ge&&"背景",Se&&"カメラ",ct&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),x.jsxs("div",{className:"flex gap-2",children:[x.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:Hc,disabled:Yn||!(dt||Tt||Re||Ge||Se||ct),children:Yn?x.jsxs(x.Fragment,{children:[x.jsx(za,{size:16,className:"animate-spin"})," 強化中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(wf,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),x.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${Mn?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:zi,disabled:Yn||!Mn,children:"↩️ 強化前に戻す"})]}),x.jsx(_f,{thought:Gr||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})]}),x.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${se?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[x.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[x.jsx(uv,{size:14})," ",K?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",x.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",x.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",x.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const le=se?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",lt=se?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",nt=se?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",bt=!!K&&!!_e&&pt,ht=bt?"背景 (Background)":"場所 (Location)",Ye=bt?le||_e?.location||"360°画像":le||g.trim()||"AIおまかせ",Oe=bt?"画像解析":g.trim()?"手入力":"AIおまかせ",He=bt?"#67e8f9":g.trim()?"#ffffff":"#93c5fd",Me=bt?"rgba(6,182,212,0.3)":g.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",at=bt?"#67e8f9":g.trim()?"#d1d5db":"#93c5fd",Nt=bt?"rgba(6,182,212,0.4)":g.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return x.jsxs(x.Fragment,{children:[x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[bt?x.jsx(wc,{size:12,className:"text-cyan-400"}):x.jsx(wc,{size:12,className:"text-blue-400"}),x.jsxs("span",{children:[ht,":"]}),x.jsx("span",{style:{fontWeight:"bold",color:He},children:Ye}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:Me,color:at,border:`1px solid ${Nt}`},children:Oe})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[x.jsx("span",{className:"text-green-400",children:"👕"}),x.jsx("span",{children:"服装 (Outfit):"}),x.jsx("span",{style:{fontWeight:"bold",color:T.trim()?"#ffffff":"#93c5fd"},children:lt||T.trim()||"AIおまかせ"}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:T.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:T.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${T.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:T.trim()?"手入力":"AIおまかせ"})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[x.jsx("span",{className:"text-yellow-400",children:"🎬"}),x.jsx("span",{children:"オチ (Punchline):"}),x.jsx("span",{style:{fontWeight:"bold",color:nt||D!=="Auto"?"#ffffff":"#93c5fd"},children:nt||(D==="Auto"?"AIおまかせ":Lv(D))}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:D!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:D!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${D!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:D!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),x.jsxs("section",{ref:Dl,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
              ${Gt===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
              ${Gt>3?"border border-orange-500/30 opacity-100":""}
          `,children:[(Gt<3||Ve||Ee||Yn||$n)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:$n&&Gt>=3&&x.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[x.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),x.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),x.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),x.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${Gt===3?"text-orange-400":"text-slate-500"}`,children:[x.jsx(vp,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),!1,x.jsx("button",{onClick:()=>er(),disabled:et||$n,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
                   ${Gt===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
              `,children:et?x.jsxs(x.Fragment,{children:[x.jsx(za,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(vp,{size:24,className:`text-blue-600 ${Gt===3?"animate-bounce":""} `}),x.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),x.jsx(Tc,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{ref:Vr,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(Gt<3||Ve||Ee||Yn)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("section",{className:"relative group h-full",children:[x.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),x.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[x.jsx("div",{className:"flex items-center justify-between mb-4",children:x.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[x.jsx("button",{onClick:kc,disabled:!ee,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:x.jsx(Ac,{size:14})}),x.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),x.jsx(_f,{thought:In,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),x.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[!1,x.jsx("div",{className:"relative flex-1",children:x.jsx("textarea",{value:ee,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),x.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[K&&_e&&pt&&ee&&x.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[x.jsx("div",{className:"flex items-start gap-4",children:x.jsxs("div",{className:"flex-1 space-y-1",children:[x.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[x.jsx(wc,{size:12})," 🌐 360°背景モード (ON)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",x.jsx("br",{}),x.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),x.jsx("br",{}),x.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),x.jsx("br",{}),x.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),x.jsx(Ov,{imageSrc:K,height:120}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),ln&&Nn&&Nn.length===4&&x.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[x.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),x.jsx("div",{className:"grid grid-cols-4 gap-2",children:ln.panels.map((le,lt)=>{const bt=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((le.yaw%360+360)%360/45)%8];return x.jsxs("div",{className:"relative",children:[x.jsx("img",{src:Nn[lt],alt:`Panel ${le.panel} - ${bt}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[x.jsxs("span",{className:"font-bold",children:["コマ",le.panel]})," ",bt," ",x.jsxs("span",{className:"text-slate-400",children:["FOV",le.fov,"°"]})]})]},lt)})}),x.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),x.jsxs("button",{onClick:kc,disabled:!ee,className:`w-full ${Yr?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[Yr?x.jsx(va,{size:20}):x.jsx(Ac,{size:20}),Yr?"コピー完了":l==="openai"?K&&pt?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":K&&pt?Un?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":Un?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),x.jsxs("button",{onClick:()=>{const le=new Date,lt=l==="openai"?"ChatGPT Engine (自動)":Un?"ChatGPT専用プロンプト":"Gemini用プロンプト",nt={ファイル情報:{フォーマットバージョン:1,アプリバージョン:mo,保存日時:le.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:le.toISOString()},プロンプト判別:{モード:lt,AIエンジン:l==="openai"?"ChatGPT":"Gemini",ChatGPTモード:Un,説明:l==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":Un?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:W||"(未解析)",シナリオ:se||"(未生成)",最終プロンプト:ee||"(未生成)",生成設定:{パンチラインタイプ:D,カラーモード:Sn,強化オプション:{表情強化:dt,ボディランゲージ強化:Tt,"照明・演出強化":Re,背景強化:Ge,カメラワーク強化:Se,"セリフ・ギャグ強化":ct},"360度背景":{画像読込:!!K,有効:pt,場所:_e?.location||"(未解析)",空間タイプ:_e?.spatialType||"(未解析)",光源:_e?.lighting||"(未解析)"}}},bt=JSON.stringify(nt,null,2),ht=new Blob([bt],{type:"application/json;charset=utf-8"}),Ye=URL.createObjectURL(ht),Oe=document.createElement("a");Oe.href=Ye;const He=se?.match(/タイトル[:：]\s*(.+)/),Me=He?He[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",at=`${String(le.getFullYear()).slice(-2)}${String(le.getMonth()+1).padStart(2,"0")}${String(le.getDate()).padStart(2,"0")}${String(le.getHours()).padStart(2,"0")}${String(le.getMinutes()).padStart(2,"0")}${String(le.getSeconds()).padStart(2,"0")}`;Oe.download=`AI_4-koma_metadata_${Me}_${at}.json`,document.body.appendChild(Oe),Oe.click(),document.body.removeChild(Oe),URL.revokeObjectURL(Ye),A(!0),setTimeout(()=>A(!1),2500)},disabled:!ee,className:`w-full ${es?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${es?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${es?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[es?x.jsx(va,{size:16}):x.jsx(ov,{size:16}),es?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),x.jsxs("div",{className:"relative mt-2",children:[!et&&!ee&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",x.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),x.jsxs("button",{onClick:()=>{console.log("Regenerating..."),Vc()},disabled:!ee||vt,className:`w-full ${l==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[vt?x.jsx(za,{size:20,className:"animate-spin"}):x.jsx(lv,{size:20}),x.jsx("div",{className:"flex flex-col items-center",children:x.jsx("span",{children:vt?"再生成中...":`画像を生成する (STEP 4: ${l==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),x.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",x.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",x.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),x.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:x.jsxs("div",{className:"flex items-start gap-2",children:[x.jsx("div",{className:"mt-0.5 text-orange-400",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("circle",{cx:"12",cy:"12",r:"10"}),x.jsx("path",{d:"M12 16v-4"}),x.jsx("path",{d:"M12 8h.01"})]})}),x.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[x.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),x.jsx("br",{}),l==="openai"?x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&pt?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",x.jsx("br",{}),x.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",x.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&pt?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),l==="openai"&&x.jsx("div",{className:"mt-3 block w-full",children:x.jsxs("button",{className:`mt-2 ${Es?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const le=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${mo}"
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
No explanations. No partial results.`;navigator.clipboard.writeText(le),Wr(!0),setTimeout(()=>Wr(!1),2e3)},children:[x.jsx("span",{style:{visibility:Es?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),Es&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),x.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${ee?"":"opacity-40 pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>Ue(!Be),disabled:!ee,children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🛡️"}),x.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!ee&&x.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:Be?"クリックで閉じる":"クリックで開く"}),x.jsx(rv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${Be?"rotate-180":""}`})]})]}),Be&&x.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[x.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[x.jsxs("p",{children:["下の",x.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),x.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",x.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),x.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),x.jsxs("button",{className:`${Ss?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),Ro(!0),setTimeout(()=>Ro(!1),2e3)},children:[x.jsx("span",{style:{visibility:Ss?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),Ss&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),x.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Le,onChange:le=>Fe(le.target.value),placeholder:l==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),x.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ll,disabled:fe||!Le.trim()||!ee,children:fe?x.jsxs(x.Fragment,{children:[x.jsx(za,{size:16,className:"animate-spin"})," 分析・修正中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(vp,{size:16})," 配慮版プロンプトを再生成する"]})}),x.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:je||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),x.jsxs("div",{ref:Qs,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[x.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[x.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),x.jsx("span",{className:l==="openai"?"text-emerald-500":"text-blue-500",children:l==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),xe.length===0?x.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):xe.map((le,lt)=>x.jsxs("div",{className:"mb-1 leading-relaxed",children:[x.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),le]},lt)),vt&&x.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),x.jsxs("section",{ref:Ra,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!ee&&!Zi&&!vt||Ve||et||Yn||Hn&&Si>0&&Si<4)&&!vt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(Ve||et||Yn||Hn&&Si>0&&Si<4)&&x.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[x.jsx(za,{size:36,className:"animate-spin text-blue-500"}),x.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:Ve||et?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),vt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:x.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[x.jsx(za,{size:64,className:"animate-spin text-blue-500 mx-auto"}),x.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),x.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[x.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",x.jsxs("span",{className:"flex space-x-1",children:[x.jsx("span",{className:"animate-bounce delay-75",children:"."}),x.jsx("span",{className:"animate-bounce delay-150",children:"."}),x.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),x.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",x.jsx("br",{}),x.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",x.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),x.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:I?x.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:I}):x.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),x.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:Zi?x.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[x.jsx("img",{src:Zi,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),J&&x.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:x.jsxs("div",{className:"flex items-start gap-3",children:[x.jsx(fv,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),x.jsxs("div",{className:"text-sm",children:[x.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),x.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",x.jsx("br",{}),x.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),x.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[x.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),x.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[x.jsxs("li",{children:["画面左側の「",x.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),x.jsxs("li",{children:[x.jsx("a",{href:Wn?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:Wn?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),x.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),x.jsxs("div",{className:"w-full px-8 mt-2",children:[x.jsxs("button",{onClick:()=>{const le=document.createElement("a");le.href=Zi,le.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(le),le.click(),document.body.removeChild(le)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[x.jsx(ov,{size:20})," 画像をダウンロード (.png)"]}),x.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):x.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[x.jsx(pm,{size:80,className:"mx-auto"}),x.jsxs("div",{className:"space-y-2 text-center",children:[x.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),x.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),jr.length>0&&x.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(Ve||et||vt||Yn||Hn&&Si>0&&Si<4)&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:x.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[x.jsx(za,{size:12,className:"animate-spin"})," 生成中..."]})}),x.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[x.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[x.jsx(lv,{size:14,className:"text-blue-400"}),"生成履歴 (",jr.length,")"]}),x.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(ys([]),Oi(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[x.jsx(_p,{size:12})," 全削除"]})]}),x.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:jr.map(le=>x.jsxs("div",{onClick:()=>Oi(le.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${Zi===le.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[x.jsx("img",{src:le.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),Zi===le.img&&x.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:x.jsx(bl,{size:10,strokeWidth:3})}),x.jsx("div",{onClick:lt=>{lt.stopPropagation(),ys(nt=>nt.filter(bt=>bt.id!==le.id)),Zi===le.img&&Oi("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:x.jsx(_p,{size:10})})]},le.id))})]})]})]}),x.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",x.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),dn&&x.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[x.jsx(va,{size:18,className:"text-green-600"})," ",dn]}),x.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function dC(){return x.jsx(uC,{children:x.jsx(fC,{})})}sE.createRoot(document.getElementById("root")).render(x.jsx(Ne.StrictMode,{children:x.jsx(dC,{})}));
