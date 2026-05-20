(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function iS(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var _h={exports:{}},Zl={};var jx;function aS(){if(jx)return Zl;jx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Zl.Fragment=e,Zl.jsx=i,Zl.jsxs=i,Zl}var Xx;function sS(){return Xx||(Xx=1,_h.exports=aS()),_h.exports}var x=sS(),vh={exports:{}},_t={};var Yx;function rS(){if(Yx)return _t;Yx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function y(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,E={};function S(P,J,be){this.props=P,this.context=J,this.refs=E,this.updater=be||M}S.prototype.isReactComponent={},S.prototype.setState=function(P,J){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,J,"setState")},S.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=S.prototype;function I(P,J,be){this.props=P,this.context=J,this.refs=E,this.updater=be||M}var L=I.prototype=new N;L.constructor=I,C(L,S.prototype),L.isPureReactComponent=!0;var V=Array.isArray;function D(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,J,be){var Ne=be.ref;return{$$typeof:r,type:P,key:J,ref:Ne!==void 0?Ne:null,props:be}}function $(P,J){return F(P.type,J,P.props)}function k(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function X(P){var J={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(be){return J[be]})}var he=/\/+/g;function oe(P,J){return typeof P=="object"&&P!==null&&P.key!=null?X(""+P.key):J.toString(36)}function W(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(D,D):(P.status="pending",P.then(function(J){P.status==="pending"&&(P.status="fulfilled",P.value=J)},function(J){P.status==="pending"&&(P.status="rejected",P.reason=J)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function U(P,J,be,Ne,Pe){var ae=typeof P;(ae==="undefined"||ae==="boolean")&&(P=null);var Se=!1;if(P===null)Se=!0;else switch(ae){case"bigint":case"string":case"number":Se=!0;break;case"object":switch(P.$$typeof){case r:case e:Se=!0;break;case v:return Se=P._init,U(Se(P._payload),J,be,Ne,Pe)}}if(Se)return Pe=Pe(P),Se=Ne===""?"."+oe(P,0):Ne,V(Pe)?(be="",Se!=null&&(be=Se.replace(he,"$&/")+"/"),U(Pe,J,be,"",function(tt){return tt})):Pe!=null&&(k(Pe)&&(Pe=$(Pe,be+(Pe.key==null||P&&P.key===Pe.key?"":(""+Pe.key).replace(he,"$&/")+"/")+Se)),J.push(Pe)),1;Se=0;var ye=Ne===""?".":Ne+":";if(V(P))for(var We=0;We<P.length;We++)Ne=P[We],ae=ye+oe(Ne,We),Se+=U(Ne,J,be,ae,Pe);else if(We=y(P),typeof We=="function")for(P=We.call(P),We=0;!(Ne=P.next()).done;)Ne=Ne.value,ae=ye+oe(Ne,We++),Se+=U(Ne,J,be,ae,Pe);else if(ae==="object"){if(typeof P.then=="function")return U(W(P),J,be,Ne,Pe);throw J=String(P),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return Se}function G(P,J,be){if(P==null)return P;var Ne=[],Pe=0;return U(P,Ne,"","",function(ae){return J.call(be,ae,Pe++)}),Ne}function ee(P){if(P._status===-1){var J=P._result;J=J(),J.then(function(be){(P._status===0||P._status===-1)&&(P._status=1,P._result=be)},function(be){(P._status===0||P._status===-1)&&(P._status=2,P._result=be)}),P._status===-1&&(P._status=0,P._result=J)}if(P._status===1)return P._result.default;throw P._result}var ge=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Me={map:G,forEach:function(P,J,be){G(P,function(){J.apply(this,arguments)},be)},count:function(P){var J=0;return G(P,function(){J++}),J},toArray:function(P){return G(P,function(J){return J})||[]},only:function(P){if(!k(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return _t.Activity=_,_t.Children=Me,_t.Component=S,_t.Fragment=i,_t.Profiler=l,_t.PureComponent=I,_t.StrictMode=s,_t.Suspense=p,_t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,_t.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},_t.cache=function(P){return function(){return P.apply(null,arguments)}},_t.cacheSignal=function(){return null},_t.cloneElement=function(P,J,be){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ne=C({},P.props),Pe=P.key;if(J!=null)for(ae in J.key!==void 0&&(Pe=""+J.key),J)!A.call(J,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&J.ref===void 0||(Ne[ae]=J[ae]);var ae=arguments.length-2;if(ae===1)Ne.children=be;else if(1<ae){for(var Se=Array(ae),ye=0;ye<ae;ye++)Se[ye]=arguments[ye+2];Ne.children=Se}return F(P.type,Pe,Ne)},_t.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},_t.createElement=function(P,J,be){var Ne,Pe={},ae=null;if(J!=null)for(Ne in J.key!==void 0&&(ae=""+J.key),J)A.call(J,Ne)&&Ne!=="key"&&Ne!=="__self"&&Ne!=="__source"&&(Pe[Ne]=J[Ne]);var Se=arguments.length-2;if(Se===1)Pe.children=be;else if(1<Se){for(var ye=Array(Se),We=0;We<Se;We++)ye[We]=arguments[We+2];Pe.children=ye}if(P&&P.defaultProps)for(Ne in Se=P.defaultProps,Se)Pe[Ne]===void 0&&(Pe[Ne]=Se[Ne]);return F(P,ae,Pe)},_t.createRef=function(){return{current:null}},_t.forwardRef=function(P){return{$$typeof:h,render:P}},_t.isValidElement=k,_t.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:ee}},_t.memo=function(P,J){return{$$typeof:m,type:P,compare:J===void 0?null:J}},_t.startTransition=function(P){var J=B.T,be={};B.T=be;try{var Ne=P(),Pe=B.S;Pe!==null&&Pe(be,Ne),typeof Ne=="object"&&Ne!==null&&typeof Ne.then=="function"&&Ne.then(D,ge)}catch(ae){ge(ae)}finally{J!==null&&be.types!==null&&(J.types=be.types),B.T=J}},_t.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},_t.use=function(P){return B.H.use(P)},_t.useActionState=function(P,J,be){return B.H.useActionState(P,J,be)},_t.useCallback=function(P,J){return B.H.useCallback(P,J)},_t.useContext=function(P){return B.H.useContext(P)},_t.useDebugValue=function(){},_t.useDeferredValue=function(P,J){return B.H.useDeferredValue(P,J)},_t.useEffect=function(P,J){return B.H.useEffect(P,J)},_t.useEffectEvent=function(P){return B.H.useEffectEvent(P)},_t.useId=function(){return B.H.useId()},_t.useImperativeHandle=function(P,J,be){return B.H.useImperativeHandle(P,J,be)},_t.useInsertionEffect=function(P,J){return B.H.useInsertionEffect(P,J)},_t.useLayoutEffect=function(P,J){return B.H.useLayoutEffect(P,J)},_t.useMemo=function(P,J){return B.H.useMemo(P,J)},_t.useOptimistic=function(P,J){return B.H.useOptimistic(P,J)},_t.useReducer=function(P,J,be){return B.H.useReducer(P,J,be)},_t.useRef=function(P){return B.H.useRef(P)},_t.useState=function(P){return B.H.useState(P)},_t.useSyncExternalStore=function(P,J,be){return B.H.useSyncExternalStore(P,J,be)},_t.useTransition=function(){return B.H.useTransition()},_t.version="19.2.3",_t}var Wx;function nm(){return Wx||(Wx=1,vh.exports=rS()),vh.exports}var Re=nm();const oS=iS(Re);var bh={exports:{}},Ql={},yh={exports:{}},Sh={};var qx;function lS(){return qx||(qx=1,(function(r){function e(U,G){var ee=U.length;U.push(G);e:for(;0<ee;){var ge=ee-1>>>1,Me=U[ge];if(0<l(Me,G))U[ge]=G,U[ee]=Me,ee=ge;else break e}}function i(U){return U.length===0?null:U[0]}function s(U){if(U.length===0)return null;var G=U[0],ee=U.pop();if(ee!==G){U[0]=ee;e:for(var ge=0,Me=U.length,P=Me>>>1;ge<P;){var J=2*(ge+1)-1,be=U[J],Ne=J+1,Pe=U[Ne];if(0>l(be,ee))Ne<Me&&0>l(Pe,be)?(U[ge]=Pe,U[Ne]=ee,ge=Ne):(U[ge]=be,U[J]=ee,ge=J);else if(Ne<Me&&0>l(Pe,ee))U[ge]=Pe,U[Ne]=ee,ge=Ne;else break e}}return G}function l(U,G){var ee=U.sortIndex-G.sortIndex;return ee!==0?ee:U.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var p=[],m=[],v=1,_=null,g=3,y=!1,M=!1,C=!1,E=!1,S=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function L(U){for(var G=i(m);G!==null;){if(G.callback===null)s(m);else if(G.startTime<=U)s(m),G.sortIndex=G.expirationTime,e(p,G);else break;G=i(m)}}function V(U){if(C=!1,L(U),!M)if(i(p)!==null)M=!0,D||(D=!0,X());else{var G=i(m);G!==null&&W(V,G.startTime-U)}}var D=!1,B=-1,A=5,F=-1;function $(){return E?!0:!(r.unstable_now()-F<A)}function k(){if(E=!1,D){var U=r.unstable_now();F=U;var G=!0;try{e:{M=!1,C&&(C=!1,N(B),B=-1),y=!0;var ee=g;try{t:{for(L(U),_=i(p);_!==null&&!(_.expirationTime>U&&$());){var ge=_.callback;if(typeof ge=="function"){_.callback=null,g=_.priorityLevel;var Me=ge(_.expirationTime<=U);if(U=r.unstable_now(),typeof Me=="function"){_.callback=Me,L(U),G=!0;break t}_===i(p)&&s(p),L(U)}else s(p);_=i(p)}if(_!==null)G=!0;else{var P=i(m);P!==null&&W(V,P.startTime-U),G=!1}}break e}finally{_=null,g=ee,y=!1}G=void 0}}finally{G?X():D=!1}}}var X;if(typeof I=="function")X=function(){I(k)};else if(typeof MessageChannel<"u"){var he=new MessageChannel,oe=he.port2;he.port1.onmessage=k,X=function(){oe.postMessage(null)}}else X=function(){S(k,0)};function W(U,G){B=S(function(){U(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(U){U.callback=null},r.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<U?Math.floor(1e3/U):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(U){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var ee=g;g=G;try{return U()}finally{g=ee}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(U,G){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var ee=g;g=U;try{return G()}finally{g=ee}},r.unstable_scheduleCallback=function(U,G,ee){var ge=r.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?ge+ee:ge):ee=ge,U){case 1:var Me=-1;break;case 2:Me=250;break;case 5:Me=1073741823;break;case 4:Me=1e4;break;default:Me=5e3}return Me=ee+Me,U={id:v++,callback:G,priorityLevel:U,startTime:ee,expirationTime:Me,sortIndex:-1},ee>ge?(U.sortIndex=ee,e(m,U),i(p)===null&&U===i(m)&&(C?(N(B),B=-1):C=!0,W(V,ee-ge))):(U.sortIndex=Me,e(p,U),M||y||(M=!0,D||(D=!0,X()))),U},r.unstable_shouldYield=$,r.unstable_wrapCallback=function(U){var G=g;return function(){var ee=g;g=G;try{return U.apply(this,arguments)}finally{g=ee}}}})(Sh)),Sh}var $x;function cS(){return $x||($x=1,yh.exports=lS()),yh.exports}var Eh={exports:{}},_i={};var Kx;function uS(){if(Kx)return _i;Kx=1;var r=nm();function e(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)m+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return _i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,_i.createPortal=function(p,m){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return c(p,m,null,v)},_i.flushSync=function(p){var m=f.T,v=s.p;try{if(f.T=null,s.p=2,p)return p()}finally{f.T=m,s.p=v,s.d.f()}},_i.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},_i.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},_i.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var v=m.as,_=h(v,m.crossOrigin),g=typeof m.integrity=="string"?m.integrity:void 0,y=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;v==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:y}):v==="script"&&s.d.X(p,{crossOrigin:_,integrity:g,fetchPriority:y,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},_i.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var v=h(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},_i.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var v=m.as,_=h(v,m.crossOrigin);s.d.L(p,v,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},_i.preloadModule=function(p,m){if(typeof p=="string")if(m){var v=h(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},_i.requestFormReset=function(p){s.d.r(p)},_i.unstable_batchedUpdates=function(p,m){return p(m)},_i.useFormState=function(p,m,v){return f.H.useFormState(p,m,v)},_i.useFormStatus=function(){return f.H.useHostTransitionStatus()},_i.version="19.2.3",_i}var Zx;function fS(){if(Zx)return Eh.exports;Zx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Eh.exports=uS(),Eh.exports}var Qx;function dS(){if(Qx)return Ql;Qx=1;var r=cS(),e=nm(),i=fS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(c(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return p(u),t;if(d===o)return p(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var b=!1,R=u.child;R;){if(R===a){b=!0,a=u,o=d;break}if(R===o){b=!0,o=u,a=d;break}R=R.sibling}if(!b){for(R=d.child;R;){if(R===a){b=!0,a=d,o=u;break}if(R===o){b=!0,o=d,a=u;break}R=R.sibling}if(!b)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),I=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),D=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function X(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var he=Symbol.for("react.client.reference");function oe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===he?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case S:return"Profiler";case E:return"StrictMode";case V:return"Suspense";case D:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case I:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case L:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:oe(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return oe(t(n))}catch{}}return null}var W=Array.isArray,U=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},ge=[],Me=-1;function P(t){return{current:t}}function J(t){0>Me||(t.current=ge[Me],ge[Me]=null,Me--)}function be(t,n){Me++,ge[Me]=t.current,t.current=n}var Ne=P(null),Pe=P(null),ae=P(null),Se=P(null);function ye(t,n){switch(be(ae,n),be(Pe,t),be(Ne,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?hx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=hx(n),t=px(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}J(Ne),be(Ne,t)}function We(){J(Ne),J(Pe),J(ae)}function tt(t){t.memoizedState!==null&&be(Se,t);var n=Ne.current,a=px(n,t.type);n!==a&&(be(Pe,t),be(Ne,a))}function rt(t){Pe.current===t&&(J(Ne),J(Pe)),Se.current===t&&(J(Se),Wl._currentValue=ee)}var Dt,Et;function Ut(t){if(Dt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Dt=n&&n[1]||"",Et=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dt+t+Et}var Kt=!1;function vt(t,n){if(!t||Kt)return"";Kt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ve=function(){throw Error()};if(Object.defineProperty(ve.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ve,[])}catch(ce){var le=ce}Reflect.construct(t,[],ve)}else{try{ve.call()}catch(ce){le=ce}t.call(ve.prototype)}}else{try{throw Error()}catch(ce){le=ce}(ve=t())&&typeof ve.catch=="function"&&ve.catch(function(){})}}catch(ce){if(ce&&le&&typeof ce.stack=="string")return[ce.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),b=d[0],R=d[1];if(b&&R){var z=b.split(`
`),re=R.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<re.length&&!re[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===re.length)for(o=z.length-1,u=re.length-1;1<=o&&0<=u&&z[o]!==re[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==re[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==re[u]){var xe=`
`+z[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=u);break}}}finally{Kt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Ut(a):""}function Zt(t,n){switch(t.tag){case 26:case 27:case 5:return Ut(t.type);case 16:return Ut("Lazy");case 13:return t.child!==n&&n!==null?Ut("Suspense Fallback"):Ut("Suspense");case 19:return Ut("SuspenseList");case 0:case 15:return vt(t.type,!1);case 11:return vt(t.type.render,!1);case 1:return vt(t.type,!0);case 31:return Ut("Activity");default:return""}}function rn(t){try{var n="",a=null;do n+=Zt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Lt=Object.prototype.hasOwnProperty,Y=r.unstable_scheduleCallback,Xt=r.unstable_cancelCallback,Tt=r.unstable_shouldYield,tn=r.unstable_requestPaint,Ie=r.unstable_now,Sn=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,Q=r.unstable_NormalPriority,pe=r.unstable_LowPriority,Ee=r.unstable_IdlePriority,Ue=r.log,Be=r.unstable_setDisableYieldValue,ue=null,me=null;function Ae(t){if(typeof Ue=="function"&&Be(t),me&&typeof me.setStrictMode=="function")try{me.setStrictMode(ue,t)}catch{}}var ze=Math.clz32?Math.clz32:ht,Fe=Math.log,Ce=Math.LN2;function ht(t){return t>>>=0,t===0?32:31-(Fe(t)/Ce|0)|0}var at=256,Rt=262144,H=4194304;function Oe(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function fe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,b=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=Oe(o):(b&=R,b!==0?u=Oe(b):a||(a=R&~t,a!==0&&(u=Oe(a))))):(R=o&~d,R!==0?u=Oe(R):b!==0?u=Oe(b):a||(a=o&~t,a!==0&&(u=Oe(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Xe(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Le(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Te(){var t=H;return H<<=1,(H&62914560)===0&&(H=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ut(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function En(t,n,a,o,u,d){var b=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,z=t.expirationTimes,re=t.hiddenUpdates;for(a=b&~a;0<a;){var xe=31-ze(a),ve=1<<xe;R[xe]=0,z[xe]=-1;var le=re[xe];if(le!==null)for(re[xe]=null,xe=0;xe<le.length;xe++){var ce=le[xe];ce!==null&&(ce.lane&=-536870913)}a&=~ve}o!==0&&Yt(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(b&~n))}function Yt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Ln(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function mi(t,n){var a=n&-n;return a=(a&42)!==0?1:Za(a),(a&(t.suspendedLanes|n))!==0?0:a}function Za(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ri(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ca(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:Fx(t.type))}function br(t,n){var a=G.p;try{return G.p=t,n()}finally{G.p=a}}var Dn=Math.random().toString(36).slice(2),Mn="__reactFiber$"+Dn,on="__reactProps$"+Dn,Bi="__reactContainer$"+Dn,gn="__reactEvents$"+Dn,Na="__reactListeners$"+Dn,Is="__reactHandles$"+Dn,Qa="__reactResources$"+Dn,Ja="__reactMarker$"+Dn;function Qr(t){delete t[Mn],delete t[on],delete t[gn],delete t[Na],delete t[Is]}function Ji(t){var n=t[Mn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Bi]||a[Mn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=yx(t);t!==null;){if(a=t[Mn])return a;t=yx(t)}return n}t=a,a=t.parentNode}return null}function ma(t){if(t=t[Mn]||t[Bi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function ga(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function xa(t){var n=t[Qa];return n||(n=t[Qa]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function bn(t){t[Ja]=!0}var yr=new Set,w={};function q(t,n){K(t,n),K(t+"Capture",n)}function K(t,n){for(w[t]=n,t=0;t<n.length;t++)yr.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),te={},ke={};function De(t){return Lt.call(ke,t)?!0:Lt.call(te,t)?!1:ne.test(t)?ke[t]=!0:(te[t]=!0,!1)}function Ge(t,n,a){if(De(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ze(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function $e(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function ot(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function bt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function it(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(b){a=""+b,d.call(this,b)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(b){a=""+b},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Wt(t){if(!t._valueTracker){var n=bt(t)?"checked":"value";t._valueTracker=it(t,n,""+t[n])}}function ft(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=bt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function sn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Qt=/[\n"\\]/g;function qt(t){return t.replace(Qt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ve(t,n,a,o,u,d,b,R){t.name="",b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.type=b:t.removeAttribute("type"),n!=null?b==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+ot(n)):t.value!==""+ot(n)&&(t.value=""+ot(n)):b!=="submit"&&b!=="reset"||t.removeAttribute("value"),n!=null?At(t,b,ot(n)):a!=null?At(t,b,ot(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+ot(R):t.removeAttribute("name")}function Gn(t,n,a,o,u,d,b,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){Wt(t);return}a=a!=null?""+ot(a):"",n=n!=null?""+ot(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"&&(t.name=b),Wt(t)}function At(t,n,a){n==="number"&&sn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function xn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+ot(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Rn(t,n,a){if(n!=null&&(n=""+ot(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+ot(a):""}function Cn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(W(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ot(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Wt(t)}function Yn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var nn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _n(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||nn.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Wn(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&_n(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&_n(t,d,n[d])}function yt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _a=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),es=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Oa(t){return es.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function zi(){}var Mi=null;function va(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var gi=null,ts=null;function ol(t){var n=ma(t);if(n&&(t=n.stateNode)){var a=t[on]||null;e:switch(t=n.stateNode,n.type){case"input":if(Ve(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+qt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[on]||null;if(!u)throw Error(s(90));Ve(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&ft(o)}break e;case"textarea":Rn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&xn(t,!!a.multiple,n,!1)}}}var ll=!1;function cl(t,n,a){if(ll)return t(n,a);ll=!0;try{var o=t(n);return o}finally{if(ll=!1,(gi!==null||ts!==null)&&(su(),gi&&(n=gi,t=ts,ts=gi=null,ol(n),t)))for(n=0;n<t.length;n++)ol(t[n])}}function Da(t,n){var a=t.stateNode;if(a===null)return null;var o=a[on]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ei=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ea=!1;if(ei)try{var ns={};Object.defineProperty(ns,"passive",{get:function(){ea=!0}}),window.addEventListener("test",ns,ns),window.removeEventListener("test",ns,ns)}catch{ea=!1}var Gi=null,ul=null,pt=null;function Jr(){if(pt)return pt;var t,n=ul,a=n.length,o,u="value"in Gi?Gi.value:Gi.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var b=a-t;for(o=1;o<=b&&n[a-o]===u[d-o];o++);return pt=u.slice(t,1<o?1-o:void 0)}function eo(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function to(){return!0}function fl(){return!1}function ti(t){function n(a,o,u,d,b){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=b,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?to:fl,this.isPropagationStopped=fl,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=to)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=to)},persist:function(){},isPersistent:to}),n}var is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},no=ti(is),as=_({},is,{view:0,detail:0}),yc=ti(as),Sr,io,ta,ss=_({},as,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:we,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ta&&(ta&&t.type==="mousemove"?(Sr=t.screenX-ta.screenX,io=t.screenY-ta.screenY):io=Sr=0,ta=t),Sr)},movementY:function(t){return"movementY"in t?t.movementY:io}}),dl=ti(ss),Sc=_({},ss,{dataTransfer:0}),Ef=ti(Sc),Ec=_({},as,{relatedTarget:0}),hl=ti(Ec),Mf=_({},is,{animationName:0,elapsedTime:0,pseudoElement:0}),Ct=ti(Mf),de=_({},is,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),st=ti(de),et=_({},is,{data:0}),mt=ti(et),xt={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ke={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},je={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function He(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=je[t])?!!n[t]:!1}function we(){return He}var lt=_({},as,{key:function(t){if(t.key){var n=xt[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=eo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ke[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:we,charCode:function(t){return t.type==="keypress"?eo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?eo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Tn=ti(lt),kt=_({},ss,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),oi=ti(kt),rs=_({},as,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:we}),qn=ti(rs),It=_({},is,{propertyName:0,elapsedTime:0,pseudoElement:0}),Us=ti(It),La=_({},ss,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ia=ti(La),ba=_({},is,{newState:0,oldState:0}),Ps=ti(ba),os=[9,13,27,32],Fs=ei&&"CompositionEvent"in window,yn=null;ei&&"documentMode"in document&&(yn=document.documentMode);var ni=ei&&"TextEvent"in window&&!yn,ii=ei&&(!Fs||yn&&8<yn&&11>=yn),Nn=" ",wi=!1;function li(t,n){switch(t){case"keyup":return os.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xi(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Qe=!1;function Pt(t,n){switch(t){case"compositionend":return xi(n);case"keypress":return n.which!==32?null:(wi=!0,Nn);case"textInput":return t=n.data,t===Nn&&wi?null:t;default:return null}}function ci(t,n){if(Qe)return t==="compositionend"||!Fs&&li(t,n)?(t=Jr(),pt=ul=Gi=null,Qe=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ii&&n.locale!=="ko"?null:n.data;default:return null}}var Ri={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pl(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Ri[t.type]:n==="textarea"}function Tm(t,n,a,o){gi?ts?ts.push(o):ts=[o]:gi=o,n=du(n,"onChange"),0<n.length&&(a=new no("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var ml=null,gl=null;function Nb(t){ox(t,0)}function Mc(t){var n=ga(t);if(ft(n))return t}function Am(t,n){if(t==="change")return n}var wm=!1;if(ei){var Tf;if(ei){var Af="oninput"in document;if(!Af){var Rm=document.createElement("div");Rm.setAttribute("oninput","return;"),Af=typeof Rm.oninput=="function"}Tf=Af}else Tf=!1;wm=Tf&&(!document.documentMode||9<document.documentMode)}function Cm(){ml&&(ml.detachEvent("onpropertychange",Nm),gl=ml=null)}function Nm(t){if(t.propertyName==="value"&&Mc(gl)){var n=[];Tm(n,gl,t,va(t)),cl(Nb,n)}}function Ob(t,n,a){t==="focusin"?(Cm(),ml=n,gl=a,ml.attachEvent("onpropertychange",Nm)):t==="focusout"&&Cm()}function Db(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Mc(gl)}function Lb(t,n){if(t==="click")return Mc(n)}function Ib(t,n){if(t==="input"||t==="change")return Mc(n)}function Ub(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Hi=typeof Object.is=="function"?Object.is:Ub;function xl(t,n){if(Hi(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Lt.call(n,u)||!Hi(t[u],n[u]))return!1}return!0}function Om(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dm(t,n){var a=Om(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Om(a)}}function Lm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Lm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Im(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=sn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=sn(t.document)}return n}function wf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Pb=ei&&"documentMode"in document&&11>=document.documentMode,ao=null,Rf=null,_l=null,Cf=!1;function Um(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Cf||ao==null||ao!==sn(o)||(o=ao,"selectionStart"in o&&wf(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),_l&&xl(_l,o)||(_l=o,o=du(Rf,"onSelect"),0<o.length&&(n=new no("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=ao)))}function Er(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var so={animationend:Er("Animation","AnimationEnd"),animationiteration:Er("Animation","AnimationIteration"),animationstart:Er("Animation","AnimationStart"),transitionrun:Er("Transition","TransitionRun"),transitionstart:Er("Transition","TransitionStart"),transitioncancel:Er("Transition","TransitionCancel"),transitionend:Er("Transition","TransitionEnd")},Nf={},Pm={};ei&&(Pm=document.createElement("div").style,"AnimationEvent"in window||(delete so.animationend.animation,delete so.animationiteration.animation,delete so.animationstart.animation),"TransitionEvent"in window||delete so.transitionend.transition);function Mr(t){if(Nf[t])return Nf[t];if(!so[t])return t;var n=so[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Pm)return Nf[t]=n[a];return t}var Fm=Mr("animationend"),Bm=Mr("animationiteration"),zm=Mr("animationstart"),Fb=Mr("transitionrun"),Bb=Mr("transitionstart"),zb=Mr("transitioncancel"),Gm=Mr("transitionend"),Hm=new Map,Of="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Of.push("scrollEnd");function ya(t,n){Hm.set(t,n),q(n,[t])}var Tc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},na=[],ro=0,Df=0;function Ac(){for(var t=ro,n=Df=ro=0;n<t;){var a=na[n];na[n++]=null;var o=na[n];na[n++]=null;var u=na[n];na[n++]=null;var d=na[n];if(na[n++]=null,o!==null&&u!==null){var b=o.pending;b===null?u.next=u:(u.next=b.next,b.next=u),o.pending=u}d!==0&&km(a,u,d)}}function wc(t,n,a,o){na[ro++]=t,na[ro++]=n,na[ro++]=a,na[ro++]=o,Df|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Lf(t,n,a,o){return wc(t,n,a,o),Rc(t)}function Tr(t,n){return wc(t,null,null,n),Rc(t)}function km(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-ze(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function Rc(t){if(50<Gl)throw Gl=0,kd=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var oo={};function Gb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ki(t,n,a,o){return new Gb(t,n,a,o)}function If(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ls(t,n){var a=t.alternate;return a===null?(a=ki(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Vm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Cc(t,n,a,o,u,d){var b=0;if(o=t,typeof t=="function")If(t)&&(b=1);else if(typeof t=="string")b=Xy(t,a,Ne.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=ki(31,a,n,u),t.elementType=F,t.lanes=d,t;case C:return Ar(a.children,u,d,n);case E:b=8,u|=24;break;case S:return t=ki(12,a,n,u|2),t.elementType=S,t.lanes=d,t;case V:return t=ki(13,a,n,u),t.elementType=V,t.lanes=d,t;case D:return t=ki(19,a,n,u),t.elementType=D,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case I:b=10;break e;case N:b=9;break e;case L:b=11;break e;case B:b=14;break e;case A:b=16,o=null;break e}b=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=ki(b,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function Ar(t,n,a,o){return t=ki(7,t,o,n),t.lanes=a,t}function Uf(t,n,a){return t=ki(6,t,null,n),t.lanes=a,t}function jm(t){var n=ki(18,null,null,0);return n.stateNode=t,n}function Pf(t,n,a){return n=ki(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Xm=new WeakMap;function ia(t,n){if(typeof t=="object"&&t!==null){var a=Xm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:rn(n)},Xm.set(t,n),n)}return{value:t,source:n,stack:rn(n)}}var lo=[],co=0,Nc=null,vl=0,aa=[],sa=0,Bs=null,Ua=1,Pa="";function cs(t,n){lo[co++]=vl,lo[co++]=Nc,Nc=t,vl=n}function Ym(t,n,a){aa[sa++]=Ua,aa[sa++]=Pa,aa[sa++]=Bs,Bs=t;var o=Ua;t=Pa;var u=32-ze(o)-1;o&=~(1<<u),a+=1;var d=32-ze(n)+u;if(30<d){var b=u-u%5;d=(o&(1<<b)-1).toString(32),o>>=b,u-=b,Ua=1<<32-ze(n)+u|a<<u|o,Pa=d+t}else Ua=1<<d|a<<u|o,Pa=t}function Ff(t){t.return!==null&&(cs(t,1),Ym(t,1,0))}function Bf(t){for(;t===Nc;)Nc=lo[--co],lo[co]=null,vl=lo[--co],lo[co]=null;for(;t===Bs;)Bs=aa[--sa],aa[sa]=null,Pa=aa[--sa],aa[sa]=null,Ua=aa[--sa],aa[sa]=null}function Wm(t,n){aa[sa++]=Ua,aa[sa++]=Pa,aa[sa++]=Bs,Ua=n.id,Pa=n.overflow,Bs=t}var ui=null,An=null,Vt=!1,zs=null,ra=!1,zf=Error(s(519));function Gs(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw bl(ia(n,t)),zf}function qm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[Mn]=t,n[on]=o,a){case"dialog":Bt("cancel",n),Bt("close",n);break;case"iframe":case"object":case"embed":Bt("load",n);break;case"video":case"audio":for(a=0;a<kl.length;a++)Bt(kl[a],n);break;case"source":Bt("error",n);break;case"img":case"image":case"link":Bt("error",n),Bt("load",n);break;case"details":Bt("toggle",n);break;case"input":Bt("invalid",n),Gn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Bt("invalid",n);break;case"textarea":Bt("invalid",n),Cn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||fx(n.textContent,a)?(o.popover!=null&&(Bt("beforetoggle",n),Bt("toggle",n)),o.onScroll!=null&&Bt("scroll",n),o.onScrollEnd!=null&&Bt("scrollend",n),o.onClick!=null&&(n.onclick=zi),n=!0):n=!1,n||Gs(t,!0)}function $m(t){for(ui=t.return;ui;)switch(ui.tag){case 5:case 31:case 13:ra=!1;return;case 27:case 3:ra=!0;return;default:ui=ui.return}}function uo(t){if(t!==ui)return!1;if(!Vt)return $m(t),Vt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ih(t.type,t.memoizedProps)),a=!a),a&&An&&Gs(t),$m(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));An=bx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));An=bx(t)}else n===27?(n=An,er(t.type)?(t=lh,lh=null,An=t):An=n):An=ui?la(t.stateNode.nextSibling):null;return!0}function wr(){An=ui=null,Vt=!1}function Gf(){var t=zs;return t!==null&&(Di===null?Di=t:Di.push.apply(Di,t),zs=null),t}function bl(t){zs===null?zs=[t]:zs.push(t)}var Hf=P(null),Rr=null,us=null;function Hs(t,n,a){be(Hf,n._currentValue),n._currentValue=a}function fs(t){t._currentValue=Hf.current,J(Hf)}function kf(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Vf(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var b=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var z=0;z<n.length;z++)if(R.context===n[z]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),kf(d.return,a,t),o||(b=null);break e}d=R.next}}else if(u.tag===18){if(b=u.return,b===null)throw Error(s(341));b.lanes|=a,d=b.alternate,d!==null&&(d.lanes|=a),kf(b,a,t),b=null}else b=u.child;if(b!==null)b.return=u;else for(b=u;b!==null;){if(b===t){b=null;break}if(u=b.sibling,u!==null){u.return=b.return,b=u;break}b=b.return}u=b}}function fo(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var b=u.alternate;if(b===null)throw Error(s(387));if(b=b.memoizedProps,b!==null){var R=u.type;Hi(u.pendingProps.value,b.value)||(t!==null?t.push(R):t=[R])}}else if(u===Se.current){if(b=u.alternate,b===null)throw Error(s(387));b.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Wl):t=[Wl])}u=u.return}t!==null&&Vf(n,t,a,o),n.flags|=262144}function Oc(t){for(t=t.firstContext;t!==null;){if(!Hi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Cr(t){Rr=t,us=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function fi(t){return Km(Rr,t)}function Dc(t,n){return Rr===null&&Cr(t),Km(t,n)}function Km(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},us===null){if(t===null)throw Error(s(308));us=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else us=us.next=n;return a}var Hb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},kb=r.unstable_scheduleCallback,Vb=r.unstable_NormalPriority,Hn={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function jf(){return{controller:new Hb,data:new Map,refCount:0}}function yl(t){t.refCount--,t.refCount===0&&kb(Vb,function(){t.controller.abort()})}var Sl=null,Xf=0,ho=0,po=null;function jb(t,n){if(Sl===null){var a=Sl=[];Xf=0,ho=qd(),po={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Xf++,n.then(Zm,Zm),n}function Zm(){if(--Xf===0&&Sl!==null){po!==null&&(po.status="fulfilled");var t=Sl;Sl=null,ho=0,po=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Xb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Qm=U.S;U.S=function(t,n){U0=Ie(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&jb(t,n),Qm!==null&&Qm(t,n)};var Nr=P(null);function Yf(){var t=Nr.current;return t!==null?t:vn.pooledCache}function Lc(t,n){n===null?be(Nr,Nr.current):be(Nr,n.pool)}function Jm(){var t=Yf();return t===null?null:{parent:Hn._currentValue,pool:t}}var mo=Error(s(460)),Wf=Error(s(474)),Ic=Error(s(542)),Uc={then:function(){}};function eg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function tg(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(zi,zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ig(t),t;default:if(typeof n.status=="string")n.then(zi,zi);else{if(t=vn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ig(t),t}throw Dr=n,mo}}function Or(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Dr=a,mo):a}}var Dr=null;function ng(){if(Dr===null)throw Error(s(459));var t=Dr;return Dr=null,t}function ig(t){if(t===mo||t===Ic)throw Error(s(483))}var go=null,El=0;function Pc(t){var n=El;return El+=1,go===null&&(go=[]),tg(go,t,n)}function Ml(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Fc(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function ag(t){function n(Z,j){if(t){var se=Z.deletions;se===null?(Z.deletions=[j],Z.flags|=16):se.push(j)}}function a(Z,j){if(!t)return null;for(;j!==null;)n(Z,j),j=j.sibling;return null}function o(Z){for(var j=new Map;Z!==null;)Z.key!==null?j.set(Z.key,Z):j.set(Z.index,Z),Z=Z.sibling;return j}function u(Z,j){return Z=ls(Z,j),Z.index=0,Z.sibling=null,Z}function d(Z,j,se){return Z.index=se,t?(se=Z.alternate,se!==null?(se=se.index,se<j?(Z.flags|=67108866,j):se):(Z.flags|=67108866,j)):(Z.flags|=1048576,j)}function b(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function R(Z,j,se,_e){return j===null||j.tag!==6?(j=Uf(se,Z.mode,_e),j.return=Z,j):(j=u(j,se),j.return=Z,j)}function z(Z,j,se,_e){var ct=se.type;return ct===C?xe(Z,j,se.props.children,_e,se.key):j!==null&&(j.elementType===ct||typeof ct=="object"&&ct!==null&&ct.$$typeof===A&&Or(ct)===j.type)?(j=u(j,se.props),Ml(j,se),j.return=Z,j):(j=Cc(se.type,se.key,se.props,null,Z.mode,_e),Ml(j,se),j.return=Z,j)}function re(Z,j,se,_e){return j===null||j.tag!==4||j.stateNode.containerInfo!==se.containerInfo||j.stateNode.implementation!==se.implementation?(j=Pf(se,Z.mode,_e),j.return=Z,j):(j=u(j,se.children||[]),j.return=Z,j)}function xe(Z,j,se,_e,ct){return j===null||j.tag!==7?(j=Ar(se,Z.mode,_e,ct),j.return=Z,j):(j=u(j,se),j.return=Z,j)}function ve(Z,j,se){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=Uf(""+j,Z.mode,se),j.return=Z,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case y:return se=Cc(j.type,j.key,j.props,null,Z.mode,se),Ml(se,j),se.return=Z,se;case M:return j=Pf(j,Z.mode,se),j.return=Z,j;case A:return j=Or(j),ve(Z,j,se)}if(W(j)||X(j))return j=Ar(j,Z.mode,se,null),j.return=Z,j;if(typeof j.then=="function")return ve(Z,Pc(j),se);if(j.$$typeof===I)return ve(Z,Dc(Z,j),se);Fc(Z,j)}return null}function le(Z,j,se,_e){var ct=j!==null?j.key:null;if(typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint")return ct!==null?null:R(Z,j,""+se,_e);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case y:return se.key===ct?z(Z,j,se,_e):null;case M:return se.key===ct?re(Z,j,se,_e):null;case A:return se=Or(se),le(Z,j,se,_e)}if(W(se)||X(se))return ct!==null?null:xe(Z,j,se,_e,null);if(typeof se.then=="function")return le(Z,j,Pc(se),_e);if(se.$$typeof===I)return le(Z,j,Dc(Z,se),_e);Fc(Z,se)}return null}function ce(Z,j,se,_e,ct){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return Z=Z.get(se)||null,R(j,Z,""+_e,ct);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case y:return Z=Z.get(_e.key===null?se:_e.key)||null,z(j,Z,_e,ct);case M:return Z=Z.get(_e.key===null?se:_e.key)||null,re(j,Z,_e,ct);case A:return _e=Or(_e),ce(Z,j,se,_e,ct)}if(W(_e)||X(_e))return Z=Z.get(se)||null,xe(j,Z,_e,ct,null);if(typeof _e.then=="function")return ce(Z,j,se,Pc(_e),ct);if(_e.$$typeof===I)return ce(Z,j,se,Dc(j,_e),ct);Fc(j,_e)}return null}function Je(Z,j,se,_e){for(var ct=null,Jt=null,nt=j,wt=j=0,Ht=null;nt!==null&&wt<se.length;wt++){nt.index>wt?(Ht=nt,nt=null):Ht=nt.sibling;var en=le(Z,nt,se[wt],_e);if(en===null){nt===null&&(nt=Ht);break}t&&nt&&en.alternate===null&&n(Z,nt),j=d(en,j,wt),Jt===null?ct=en:Jt.sibling=en,Jt=en,nt=Ht}if(wt===se.length)return a(Z,nt),Vt&&cs(Z,wt),ct;if(nt===null){for(;wt<se.length;wt++)nt=ve(Z,se[wt],_e),nt!==null&&(j=d(nt,j,wt),Jt===null?ct=nt:Jt.sibling=nt,Jt=nt);return Vt&&cs(Z,wt),ct}for(nt=o(nt);wt<se.length;wt++)Ht=ce(nt,Z,wt,se[wt],_e),Ht!==null&&(t&&Ht.alternate!==null&&nt.delete(Ht.key===null?wt:Ht.key),j=d(Ht,j,wt),Jt===null?ct=Ht:Jt.sibling=Ht,Jt=Ht);return t&&nt.forEach(function(sr){return n(Z,sr)}),Vt&&cs(Z,wt),ct}function dt(Z,j,se,_e){if(se==null)throw Error(s(151));for(var ct=null,Jt=null,nt=j,wt=j=0,Ht=null,en=se.next();nt!==null&&!en.done;wt++,en=se.next()){nt.index>wt?(Ht=nt,nt=null):Ht=nt.sibling;var sr=le(Z,nt,en.value,_e);if(sr===null){nt===null&&(nt=Ht);break}t&&nt&&sr.alternate===null&&n(Z,nt),j=d(sr,j,wt),Jt===null?ct=sr:Jt.sibling=sr,Jt=sr,nt=Ht}if(en.done)return a(Z,nt),Vt&&cs(Z,wt),ct;if(nt===null){for(;!en.done;wt++,en=se.next())en=ve(Z,en.value,_e),en!==null&&(j=d(en,j,wt),Jt===null?ct=en:Jt.sibling=en,Jt=en);return Vt&&cs(Z,wt),ct}for(nt=o(nt);!en.done;wt++,en=se.next())en=ce(nt,Z,wt,en.value,_e),en!==null&&(t&&en.alternate!==null&&nt.delete(en.key===null?wt:en.key),j=d(en,j,wt),Jt===null?ct=en:Jt.sibling=en,Jt=en);return t&&nt.forEach(function(nS){return n(Z,nS)}),Vt&&cs(Z,wt),ct}function hn(Z,j,se,_e){if(typeof se=="object"&&se!==null&&se.type===C&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case y:e:{for(var ct=se.key;j!==null;){if(j.key===ct){if(ct=se.type,ct===C){if(j.tag===7){a(Z,j.sibling),_e=u(j,se.props.children),_e.return=Z,Z=_e;break e}}else if(j.elementType===ct||typeof ct=="object"&&ct!==null&&ct.$$typeof===A&&Or(ct)===j.type){a(Z,j.sibling),_e=u(j,se.props),Ml(_e,se),_e.return=Z,Z=_e;break e}a(Z,j);break}else n(Z,j);j=j.sibling}se.type===C?(_e=Ar(se.props.children,Z.mode,_e,se.key),_e.return=Z,Z=_e):(_e=Cc(se.type,se.key,se.props,null,Z.mode,_e),Ml(_e,se),_e.return=Z,Z=_e)}return b(Z);case M:e:{for(ct=se.key;j!==null;){if(j.key===ct)if(j.tag===4&&j.stateNode.containerInfo===se.containerInfo&&j.stateNode.implementation===se.implementation){a(Z,j.sibling),_e=u(j,se.children||[]),_e.return=Z,Z=_e;break e}else{a(Z,j);break}else n(Z,j);j=j.sibling}_e=Pf(se,Z.mode,_e),_e.return=Z,Z=_e}return b(Z);case A:return se=Or(se),hn(Z,j,se,_e)}if(W(se))return Je(Z,j,se,_e);if(X(se)){if(ct=X(se),typeof ct!="function")throw Error(s(150));return se=ct.call(se),dt(Z,j,se,_e)}if(typeof se.then=="function")return hn(Z,j,Pc(se),_e);if(se.$$typeof===I)return hn(Z,j,Dc(Z,se),_e);Fc(Z,se)}return typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint"?(se=""+se,j!==null&&j.tag===6?(a(Z,j.sibling),_e=u(j,se),_e.return=Z,Z=_e):(a(Z,j),_e=Uf(se,Z.mode,_e),_e.return=Z,Z=_e),b(Z)):a(Z,j)}return function(Z,j,se,_e){try{El=0;var ct=hn(Z,j,se,_e);return go=null,ct}catch(nt){if(nt===mo||nt===Ic)throw nt;var Jt=ki(29,nt,null,Z.mode);return Jt.lanes=_e,Jt.return=Z,Jt}}}var Lr=ag(!0),sg=ag(!1),ks=!1;function qf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $f(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Vs(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function js(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(an&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Rc(t),km(t,null,a),n}return wc(t,o,n,a),Rc(t)}function Tl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Ln(t,a)}}function Kf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var b={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=b:d=d.next=b,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Zf=!1;function Al(){if(Zf){var t=po;if(t!==null)throw t}}function wl(t,n,a,o){Zf=!1;var u=t.updateQueue;ks=!1;var d=u.firstBaseUpdate,b=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var z=R,re=z.next;z.next=null,b===null?d=re:b.next=re,b=z;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,R=xe.lastBaseUpdate,R!==b&&(R===null?xe.firstBaseUpdate=re:R.next=re,xe.lastBaseUpdate=z))}if(d!==null){var ve=u.baseState;b=0,xe=re=z=null,R=d;do{var le=R.lane&-536870913,ce=le!==R.lane;if(ce?(Gt&le)===le:(o&le)===le){le!==0&&le===ho&&(Zf=!0),xe!==null&&(xe=xe.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var Je=t,dt=R;le=n;var hn=a;switch(dt.tag){case 1:if(Je=dt.payload,typeof Je=="function"){ve=Je.call(hn,ve,le);break e}ve=Je;break e;case 3:Je.flags=Je.flags&-65537|128;case 0:if(Je=dt.payload,le=typeof Je=="function"?Je.call(hn,ve,le):Je,le==null)break e;ve=_({},ve,le);break e;case 2:ks=!0}}le=R.callback,le!==null&&(t.flags|=64,ce&&(t.flags|=8192),ce=u.callbacks,ce===null?u.callbacks=[le]:ce.push(le))}else ce={lane:le,tag:R.tag,payload:R.payload,callback:R.callback,next:null},xe===null?(re=xe=ce,z=ve):xe=xe.next=ce,b|=le;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;ce=R,R=ce.next,ce.next=null,u.lastBaseUpdate=ce,u.shared.pending=null}}while(!0);xe===null&&(z=ve),u.baseState=z,u.firstBaseUpdate=re,u.lastBaseUpdate=xe,d===null&&(u.shared.lanes=0),$s|=b,t.lanes=b,t.memoizedState=ve}}function rg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function og(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)rg(a[t],n)}var xo=P(null),Bc=P(0);function lg(t,n){t=bs,be(Bc,t),be(xo,n),bs=t|n.baseLanes}function Qf(){be(Bc,bs),be(xo,xo.current)}function Jf(){bs=Bc.current,J(xo),J(Bc)}var Vi=P(null),oa=null;function Xs(t){var n=t.alternate;be(Pn,Pn.current&1),be(Vi,t),oa===null&&(n===null||xo.current!==null||n.memoizedState!==null)&&(oa=t)}function ed(t){be(Pn,Pn.current),be(Vi,t),oa===null&&(oa=t)}function cg(t){t.tag===22?(be(Pn,Pn.current),be(Vi,t),oa===null&&(oa=t)):Ys()}function Ys(){be(Pn,Pn.current),be(Vi,Vi.current)}function ji(t){J(Vi),oa===t&&(oa=null),J(Pn)}var Pn=P(0);function zc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||rh(a)||oh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ds=0,Mt=null,fn=null,kn=null,Gc=!1,_o=!1,Ir=!1,Hc=0,Rl=0,vo=null,Yb=0;function In(){throw Error(s(321))}function td(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Hi(t[a],n[a]))return!1;return!0}function nd(t,n,a,o,u,d){return ds=d,Mt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,U.H=t===null||t.memoizedState===null?Yg:xd,Ir=!1,d=a(o,u),Ir=!1,_o&&(d=fg(n,a,o,u)),ug(t),d}function ug(t){U.H=Ol;var n=fn!==null&&fn.next!==null;if(ds=0,kn=fn=Mt=null,Gc=!1,Rl=0,vo=null,n)throw Error(s(300));t===null||Vn||(t=t.dependencies,t!==null&&Oc(t)&&(Vn=!0))}function fg(t,n,a,o){Mt=t;var u=0;do{if(_o&&(vo=null),Rl=0,_o=!1,25<=u)throw Error(s(301));if(u+=1,kn=fn=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=Wg,d=n(a,o)}while(_o);return d}function Wb(){var t=U.H,n=t.useState()[0];return n=typeof n.then=="function"?Cl(n):n,t=t.useState()[0],(fn!==null?fn.memoizedState:null)!==t&&(Mt.flags|=1024),n}function id(){var t=Hc!==0;return Hc=0,t}function ad(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function sd(t){if(Gc){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Gc=!1}ds=0,kn=fn=Mt=null,_o=!1,Rl=Hc=0,vo=null}function Ti(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kn===null?Mt.memoizedState=kn=t:kn=kn.next=t,kn}function Fn(){if(fn===null){var t=Mt.alternate;t=t!==null?t.memoizedState:null}else t=fn.next;var n=kn===null?Mt.memoizedState:kn.next;if(n!==null)kn=n,fn=t;else{if(t===null)throw Mt.alternate===null?Error(s(467)):Error(s(310));fn=t,t={memoizedState:fn.memoizedState,baseState:fn.baseState,baseQueue:fn.baseQueue,queue:fn.queue,next:null},kn===null?Mt.memoizedState=kn=t:kn=kn.next=t}return kn}function kc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Cl(t){var n=Rl;return Rl+=1,vo===null&&(vo=[]),t=tg(vo,t,n),n=Mt,(kn===null?n.memoizedState:kn.next)===null&&(n=n.alternate,U.H=n===null||n.memoizedState===null?Yg:xd),t}function Vc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Cl(t);if(t.$$typeof===I)return fi(t)}throw Error(s(438,String(t)))}function rd(t){var n=null,a=Mt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=Mt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=kc(),Mt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=$;return n.index++,a}function hs(t,n){return typeof n=="function"?n(t):n}function jc(t){var n=Fn();return od(n,fn,t)}function od(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var b=u.next;u.next=d.next,d.next=b}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=b=null,z=null,re=n,xe=!1;do{var ve=re.lane&-536870913;if(ve!==re.lane?(Gt&ve)===ve:(ds&ve)===ve){var le=re.revertLane;if(le===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),ve===ho&&(xe=!0);else if((ds&le)===le){re=re.next,le===ho&&(xe=!0);continue}else ve={lane:0,revertLane:re.revertLane,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=ve,b=d):z=z.next=ve,Mt.lanes|=le,$s|=le;ve=re.action,Ir&&a(d,ve),d=re.hasEagerState?re.eagerState:a(d,ve)}else le={lane:ve,revertLane:re.revertLane,gesture:re.gesture,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=le,b=d):z=z.next=le,Mt.lanes|=ve,$s|=ve;re=re.next}while(re!==null&&re!==n);if(z===null?b=d:z.next=R,!Hi(d,t.memoizedState)&&(Vn=!0,xe&&(a=po,a!==null)))throw a;t.memoizedState=d,t.baseState=b,t.baseQueue=z,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function ld(t){var n=Fn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var b=u=u.next;do d=t(d,b.action),b=b.next;while(b!==u);Hi(d,n.memoizedState)||(Vn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function dg(t,n,a){var o=Mt,u=Fn(),d=Vt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var b=!Hi((fn||u).memoizedState,a);if(b&&(u.memoizedState=a,Vn=!0),u=u.queue,fd(mg.bind(null,o,u,t),[t]),u.getSnapshot!==n||b||kn!==null&&kn.memoizedState.tag&1){if(o.flags|=2048,bo(9,{destroy:void 0},pg.bind(null,o,u,a,n),null),vn===null)throw Error(s(349));d||(ds&127)!==0||hg(o,n,a)}return a}function hg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Mt.updateQueue,n===null?(n=kc(),Mt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function pg(t,n,a,o){n.value=a,n.getSnapshot=o,gg(n)&&xg(t)}function mg(t,n,a){return a(function(){gg(n)&&xg(t)})}function gg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Hi(t,a)}catch{return!0}}function xg(t){var n=Tr(t,2);n!==null&&Li(n,t,2)}function cd(t){var n=Ti();if(typeof t=="function"){var a=t;if(t=a(),Ir){Ae(!0);try{a()}finally{Ae(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:t},n}function _g(t,n,a,o){return t.baseState=a,od(t,fn,typeof o=="function"?o:hs)}function qb(t,n,a,o,u){if(Wc(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(b){d.listeners.push(b)}};U.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,vg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function vg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=U.T,b={};U.T=b;try{var R=a(u,o),z=U.S;z!==null&&z(b,R),bg(t,n,R)}catch(re){ud(t,n,re)}finally{d!==null&&b.types!==null&&(d.types=b.types),U.T=d}}else try{d=a(u,o),bg(t,n,d)}catch(re){ud(t,n,re)}}function bg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){yg(t,n,o)},function(o){return ud(t,n,o)}):yg(t,n,a)}function yg(t,n,a){n.status="fulfilled",n.value=a,Sg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,vg(t,a)))}function ud(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Sg(n),n=n.next;while(n!==o)}t.action=null}function Sg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Eg(t,n){return n}function Mg(t,n){if(Vt){var a=vn.formState;if(a!==null){e:{var o=Mt;if(Vt){if(An){t:{for(var u=An,d=ra;u.nodeType!==8;){if(!d){u=null;break t}if(u=la(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){An=la(u.nextSibling),o=u.data==="F!";break e}}Gs(o)}o=!1}o&&(n=a[0])}}return a=Ti(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Eg,lastRenderedState:n},a.queue=o,a=Vg.bind(null,Mt,o),o.dispatch=a,o=cd(!1),d=gd.bind(null,Mt,!1,o.queue),o=Ti(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=qb.bind(null,Mt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Tg(t){var n=Fn();return Ag(n,fn,t)}function Ag(t,n,a){if(n=od(t,n,Eg)[0],t=jc(hs)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Cl(n)}catch(b){throw b===mo?Ic:b}else o=n;n=Fn();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(Mt.flags|=2048,bo(9,{destroy:void 0},$b.bind(null,u,a),null)),[o,d,t]}function $b(t,n){t.action=n}function wg(t){var n=Fn(),a=fn;if(a!==null)return Ag(n,a,t);Fn(),n=n.memoizedState,a=Fn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function bo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=Mt.updateQueue,n===null&&(n=kc(),Mt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Rg(){return Fn().memoizedState}function Xc(t,n,a,o){var u=Ti();Mt.flags|=t,u.memoizedState=bo(1|n,{destroy:void 0},a,o===void 0?null:o)}function Yc(t,n,a,o){var u=Fn();o=o===void 0?null:o;var d=u.memoizedState.inst;fn!==null&&o!==null&&td(o,fn.memoizedState.deps)?u.memoizedState=bo(n,d,a,o):(Mt.flags|=t,u.memoizedState=bo(1|n,d,a,o))}function Cg(t,n){Xc(8390656,8,t,n)}function fd(t,n){Yc(2048,8,t,n)}function Kb(t){Mt.flags|=4;var n=Mt.updateQueue;if(n===null)n=kc(),Mt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Ng(t){var n=Fn().memoizedState;return Kb({ref:n,nextImpl:t}),function(){if((an&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Og(t,n){return Yc(4,2,t,n)}function Dg(t,n){return Yc(4,4,t,n)}function Lg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Ig(t,n,a){a=a!=null?a.concat([t]):null,Yc(4,4,Lg.bind(null,n,t),a)}function dd(){}function Ug(t,n){var a=Fn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&td(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Pg(t,n){var a=Fn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&td(n,o[1]))return o[0];if(o=t(),Ir){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o}function hd(t,n,a){return a===void 0||(ds&1073741824)!==0&&(Gt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=F0(),Mt.lanes|=t,$s|=t,a)}function Fg(t,n,a,o){return Hi(a,n)?a:xo.current!==null?(t=hd(t,a,o),Hi(t,n)||(Vn=!0),t):(ds&42)===0||(ds&1073741824)!==0&&(Gt&261930)===0?(Vn=!0,t.memoizedState=a):(t=F0(),Mt.lanes|=t,$s|=t,n)}function Bg(t,n,a,o,u){var d=G.p;G.p=d!==0&&8>d?d:8;var b=U.T,R={};U.T=R,gd(t,!1,n,a);try{var z=u(),re=U.S;if(re!==null&&re(R,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var xe=Xb(z,o);Nl(t,n,xe,Wi(t))}else Nl(t,n,o,Wi(t))}catch(ve){Nl(t,n,{then:function(){},status:"rejected",reason:ve},Wi())}finally{G.p=d,b!==null&&R.types!==null&&(b.types=R.types),U.T=b}}function Zb(){}function pd(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=zg(t).queue;Bg(t,u,n,ee,a===null?Zb:function(){return Gg(t),a(o)})}function zg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:ee},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Gg(t){var n=zg(t);n.next===null&&(n=t.alternate.memoizedState),Nl(t,n.next.queue,{},Wi())}function md(){return fi(Wl)}function Hg(){return Fn().memoizedState}function kg(){return Fn().memoizedState}function Qb(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=Wi();t=Vs(a);var o=js(n,t,a);o!==null&&(Li(o,n,a),Tl(o,n,a)),n={cache:jf()},t.payload=n;return}n=n.return}}function Jb(t,n,a){var o=Wi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Wc(t)?jg(n,a):(a=Lf(t,n,a,o),a!==null&&(Li(a,t,o),Xg(a,n,o)))}function Vg(t,n,a){var o=Wi();Nl(t,n,a,o)}function Nl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Wc(t))jg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var b=n.lastRenderedState,R=d(b,a);if(u.hasEagerState=!0,u.eagerState=R,Hi(R,b))return wc(t,n,u,0),vn===null&&Ac(),!1}catch{}if(a=Lf(t,n,u,o),a!==null)return Li(a,t,o),Xg(a,n,o),!0}return!1}function gd(t,n,a,o){if(o={lane:2,revertLane:qd(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Wc(t)){if(n)throw Error(s(479))}else n=Lf(t,a,o,2),n!==null&&Li(n,t,2)}function Wc(t){var n=t.alternate;return t===Mt||n!==null&&n===Mt}function jg(t,n){_o=Gc=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Xg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Ln(t,a)}}var Ol={readContext:fi,use:Vc,useCallback:In,useContext:In,useEffect:In,useImperativeHandle:In,useLayoutEffect:In,useInsertionEffect:In,useMemo:In,useReducer:In,useRef:In,useState:In,useDebugValue:In,useDeferredValue:In,useTransition:In,useSyncExternalStore:In,useId:In,useHostTransitionStatus:In,useFormState:In,useActionState:In,useOptimistic:In,useMemoCache:In,useCacheRefresh:In};Ol.useEffectEvent=In;var Yg={readContext:fi,use:Vc,useCallback:function(t,n){return Ti().memoizedState=[t,n===void 0?null:n],t},useContext:fi,useEffect:Cg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Xc(4194308,4,Lg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Xc(4194308,4,t,n)},useInsertionEffect:function(t,n){Xc(4,2,t,n)},useMemo:function(t,n){var a=Ti();n=n===void 0?null:n;var o=t();if(Ir){Ae(!0);try{t()}finally{Ae(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Ti();if(a!==void 0){var u=a(n);if(Ir){Ae(!0);try{a(n)}finally{Ae(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=Jb.bind(null,Mt,t),[o.memoizedState,t]},useRef:function(t){var n=Ti();return t={current:t},n.memoizedState=t},useState:function(t){t=cd(t);var n=t.queue,a=Vg.bind(null,Mt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:dd,useDeferredValue:function(t,n){var a=Ti();return hd(a,t,n)},useTransition:function(){var t=cd(!1);return t=Bg.bind(null,Mt,t.queue,!0,!1),Ti().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=Mt,u=Ti();if(Vt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),vn===null)throw Error(s(349));(Gt&127)!==0||hg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Cg(mg.bind(null,o,d,t),[t]),o.flags|=2048,bo(9,{destroy:void 0},pg.bind(null,o,d,a,n),null),a},useId:function(){var t=Ti(),n=vn.identifierPrefix;if(Vt){var a=Pa,o=Ua;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Hc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Yb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:md,useFormState:Mg,useActionState:Mg,useOptimistic:function(t){var n=Ti();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=gd.bind(null,Mt,!0,a),a.dispatch=n,[t,n]},useMemoCache:rd,useCacheRefresh:function(){return Ti().memoizedState=Qb.bind(null,Mt)},useEffectEvent:function(t){var n=Ti(),a={impl:t};return n.memoizedState=a,function(){if((an&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},xd={readContext:fi,use:Vc,useCallback:Ug,useContext:fi,useEffect:fd,useImperativeHandle:Ig,useInsertionEffect:Og,useLayoutEffect:Dg,useMemo:Pg,useReducer:jc,useRef:Rg,useState:function(){return jc(hs)},useDebugValue:dd,useDeferredValue:function(t,n){var a=Fn();return Fg(a,fn.memoizedState,t,n)},useTransition:function(){var t=jc(hs)[0],n=Fn().memoizedState;return[typeof t=="boolean"?t:Cl(t),n]},useSyncExternalStore:dg,useId:Hg,useHostTransitionStatus:md,useFormState:Tg,useActionState:Tg,useOptimistic:function(t,n){var a=Fn();return _g(a,fn,t,n)},useMemoCache:rd,useCacheRefresh:kg};xd.useEffectEvent=Ng;var Wg={readContext:fi,use:Vc,useCallback:Ug,useContext:fi,useEffect:fd,useImperativeHandle:Ig,useInsertionEffect:Og,useLayoutEffect:Dg,useMemo:Pg,useReducer:ld,useRef:Rg,useState:function(){return ld(hs)},useDebugValue:dd,useDeferredValue:function(t,n){var a=Fn();return fn===null?hd(a,t,n):Fg(a,fn.memoizedState,t,n)},useTransition:function(){var t=ld(hs)[0],n=Fn().memoizedState;return[typeof t=="boolean"?t:Cl(t),n]},useSyncExternalStore:dg,useId:Hg,useHostTransitionStatus:md,useFormState:wg,useActionState:wg,useOptimistic:function(t,n){var a=Fn();return fn!==null?_g(a,fn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:rd,useCacheRefresh:kg};Wg.useEffectEvent=Ng;function _d(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var vd={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=Wi(),u=Vs(o);u.payload=n,a!=null&&(u.callback=a),n=js(t,u,o),n!==null&&(Li(n,t,o),Tl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=Wi(),u=Vs(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=js(t,u,o),n!==null&&(Li(n,t,o),Tl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=Wi(),o=Vs(a);o.tag=2,n!=null&&(o.callback=n),n=js(t,o,a),n!==null&&(Li(n,t,a),Tl(n,t,a))}};function qg(t,n,a,o,u,d,b){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,b):n.prototype&&n.prototype.isPureReactComponent?!xl(a,o)||!xl(u,d):!0}function $g(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&vd.enqueueReplaceState(n,n.state,null)}function Ur(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Kg(t){Tc(t)}function Zg(t){console.error(t)}function Qg(t){Tc(t)}function qc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Jg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function bd(t,n,a){return a=Vs(a),a.tag=3,a.payload={element:null},a.callback=function(){qc(t,n)},a}function e0(t){return t=Vs(t),t.tag=3,t}function t0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){Jg(n,a,o)}}var b=a.stateNode;b!==null&&typeof b.componentDidCatch=="function"&&(t.callback=function(){Jg(n,a,o),typeof u!="function"&&(Ks===null?Ks=new Set([this]):Ks.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function ey(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&fo(n,a,u,!0),a=Vi.current,a!==null){switch(a.tag){case 31:case 13:return oa===null?ru():a.alternate===null&&Un===0&&(Un=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Uc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Xd(t,o,u)),!1;case 22:return a.flags|=65536,o===Uc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Xd(t,o,u)),!1}throw Error(s(435,a.tag))}return Xd(t,o,u),ru(),!1}if(Vt)return n=Vi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==zf&&(t=Error(s(422),{cause:o}),bl(ia(t,a)))):(o!==zf&&(n=Error(s(423),{cause:o}),bl(ia(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=ia(o,a),u=bd(t.stateNode,o,u),Kf(t,u),Un!==4&&(Un=2)),!1;var d=Error(s(520),{cause:o});if(d=ia(d,a),zl===null?zl=[d]:zl.push(d),Un!==4&&(Un=2),n===null)return!0;o=ia(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=bd(a.stateNode,o,t),Kf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Ks===null||!Ks.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=e0(u),t0(u,t,a,o),Kf(a,u),!1}a=a.return}while(a!==null);return!1}var yd=Error(s(461)),Vn=!1;function di(t,n,a,o){n.child=t===null?sg(n,null,a,o):Lr(n,t.child,a,o)}function n0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var b={};for(var R in o)R!=="ref"&&(b[R]=o[R])}else b=o;return Cr(n),o=nd(t,n,a,b,d,u),R=id(),t!==null&&!Vn?(ad(t,n,u),ps(t,n,u)):(Vt&&R&&Ff(n),n.flags|=1,di(t,n,o,u),n.child)}function i0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!If(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,a0(t,n,d,o,u)):(t=Cc(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Cd(t,u)){var b=d.memoizedProps;if(a=a.compare,a=a!==null?a:xl,a(b,o)&&t.ref===n.ref)return ps(t,n,u)}return n.flags|=1,t=ls(d,o),t.ref=n.ref,t.return=n,n.child=t}function a0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(xl(d,o)&&t.ref===n.ref)if(Vn=!1,n.pendingProps=o=d,Cd(t,u))(t.flags&131072)!==0&&(Vn=!0);else return n.lanes=t.lanes,ps(t,n,u)}return Sd(t,n,a,o,u)}function s0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return r0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Lc(n,d!==null?d.cachePool:null),d!==null?lg(n,d):Qf(),cg(n);else return o=n.lanes=536870912,r0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Lc(n,d.cachePool),lg(n,d),Ys(),n.memoizedState=null):(t!==null&&Lc(n,null),Qf(),Ys());return di(t,n,u,a),n.child}function Dl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function r0(t,n,a,o,u){var d=Yf();return d=d===null?null:{parent:Hn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&Lc(n,null),Qf(),cg(n),t!==null&&fo(t,n,o,!0),n.childLanes=u,null}function $c(t,n){return n=Zc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function o0(t,n,a){return Lr(n,t.child,null,a),t=$c(n,n.pendingProps),t.flags|=2,ji(n),n.memoizedState=null,t}function ty(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Vt){if(o.mode==="hidden")return t=$c(n,o),n.lanes=536870912,Dl(null,t);if(ed(n),(t=An)?(t=vx(t,ra),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Bs!==null?{id:Ua,overflow:Pa}:null,retryLane:536870912,hydrationErrors:null},a=jm(t),a.return=n,n.child=a,ui=n,An=null)):t=null,t===null)throw Gs(n);return n.lanes=536870912,null}return $c(n,o)}var d=t.memoizedState;if(d!==null){var b=d.dehydrated;if(ed(n),u)if(n.flags&256)n.flags&=-257,n=o0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Vn||fo(t,n,a,!1),u=(a&t.childLanes)!==0,Vn||u){if(o=vn,o!==null&&(b=mi(o,a),b!==0&&b!==d.retryLane))throw d.retryLane=b,Tr(t,b),Li(o,t,b),yd;ru(),n=o0(t,n,a)}else t=d.treeContext,An=la(b.nextSibling),ui=n,Vt=!0,zs=null,ra=!1,t!==null&&Wm(n,t),n=$c(n,o),n.flags|=4096;return n}return t=ls(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Kc(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Sd(t,n,a,o,u){return Cr(n),a=nd(t,n,a,o,void 0,u),o=id(),t!==null&&!Vn?(ad(t,n,u),ps(t,n,u)):(Vt&&o&&Ff(n),n.flags|=1,di(t,n,a,u),n.child)}function l0(t,n,a,o,u,d){return Cr(n),n.updateQueue=null,a=fg(n,o,a,u),ug(t),o=id(),t!==null&&!Vn?(ad(t,n,d),ps(t,n,d)):(Vt&&o&&Ff(n),n.flags|=1,di(t,n,a,d),n.child)}function c0(t,n,a,o,u){if(Cr(n),n.stateNode===null){var d=oo,b=a.contextType;typeof b=="object"&&b!==null&&(d=fi(b)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=vd,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},qf(n),b=a.contextType,d.context=typeof b=="object"&&b!==null?fi(b):oo,d.state=n.memoizedState,b=a.getDerivedStateFromProps,typeof b=="function"&&(_d(n,a,b,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(b=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),b!==d.state&&vd.enqueueReplaceState(d,d.state,null),wl(n,o,d,u),Al(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,z=Ur(a,R);d.props=z;var re=d.context,xe=a.contextType;b=oo,typeof xe=="object"&&xe!==null&&(b=fi(xe));var ve=a.getDerivedStateFromProps;xe=typeof ve=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,xe||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||re!==b)&&$g(n,d,o,b),ks=!1;var le=n.memoizedState;d.state=le,wl(n,o,d,u),Al(),re=n.memoizedState,R||le!==re||ks?(typeof ve=="function"&&(_d(n,a,ve,o),re=n.memoizedState),(z=ks||qg(n,a,z,o,le,re,b))?(xe||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=re),d.props=o,d.state=re,d.context=b,o=z):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,$f(t,n),b=n.memoizedProps,xe=Ur(a,b),d.props=xe,ve=n.pendingProps,le=d.context,re=a.contextType,z=oo,typeof re=="object"&&re!==null&&(z=fi(re)),R=a.getDerivedStateFromProps,(re=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(b!==ve||le!==z)&&$g(n,d,o,z),ks=!1,le=n.memoizedState,d.state=le,wl(n,o,d,u),Al();var ce=n.memoizedState;b!==ve||le!==ce||ks||t!==null&&t.dependencies!==null&&Oc(t.dependencies)?(typeof R=="function"&&(_d(n,a,R,o),ce=n.memoizedState),(xe=ks||qg(n,a,xe,o,le,ce,z)||t!==null&&t.dependencies!==null&&Oc(t.dependencies))?(re||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,ce,z),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,ce,z)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ce),d.props=o,d.state=ce,d.context=z,o=xe):(typeof d.componentDidUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Kc(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=Lr(n,t.child,null,u),n.child=Lr(n,null,a,u)):di(t,n,a,u),n.memoizedState=d.state,t=n.child):t=ps(t,n,u),t}function u0(t,n,a,o){return wr(),n.flags|=256,di(t,n,a,o),n.child}var Ed={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Md(t){return{baseLanes:t,cachePool:Jm()}}function Td(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Yi),t}function f0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,b;if((b=d)||(b=t!==null&&t.memoizedState===null?!1:(Pn.current&2)!==0),b&&(u=!0,n.flags&=-129),b=(n.flags&32)!==0,n.flags&=-33,t===null){if(Vt){if(u?Xs(n):Ys(),(t=An)?(t=vx(t,ra),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Bs!==null?{id:Ua,overflow:Pa}:null,retryLane:536870912,hydrationErrors:null},a=jm(t),a.return=n,n.child=a,ui=n,An=null)):t=null,t===null)throw Gs(n);return oh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(Ys(),u=n.mode,R=Zc({mode:"hidden",children:R},u),o=Ar(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Md(a),o.childLanes=Td(t,b,a),n.memoizedState=Ed,Dl(null,o)):(Xs(n),Ad(n,R))}var z=t.memoizedState;if(z!==null&&(R=z.dehydrated,R!==null)){if(d)n.flags&256?(Xs(n),n.flags&=-257,n=wd(t,n,a)):n.memoizedState!==null?(Ys(),n.child=t.child,n.flags|=128,n=null):(Ys(),R=o.fallback,u=n.mode,o=Zc({mode:"visible",children:o.children},u),R=Ar(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,Lr(n,t.child,null,a),o=n.child,o.memoizedState=Md(a),o.childLanes=Td(t,b,a),n.memoizedState=Ed,n=Dl(null,o));else if(Xs(n),oh(R)){if(b=R.nextSibling&&R.nextSibling.dataset,b)var re=b.dgst;b=re,o=Error(s(419)),o.stack="",o.digest=b,bl({value:o,source:null,stack:null}),n=wd(t,n,a)}else if(Vn||fo(t,n,a,!1),b=(a&t.childLanes)!==0,Vn||b){if(b=vn,b!==null&&(o=mi(b,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,Tr(t,o),Li(b,t,o),yd;rh(R)||ru(),n=wd(t,n,a)}else rh(R)?(n.flags|=192,n.child=t.child,n=null):(t=z.treeContext,An=la(R.nextSibling),ui=n,Vt=!0,zs=null,ra=!1,t!==null&&Wm(n,t),n=Ad(n,o.children),n.flags|=4096);return n}return u?(Ys(),R=o.fallback,u=n.mode,z=t.child,re=z.sibling,o=ls(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,re!==null?R=ls(re,R):(R=Ar(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Dl(null,o),o=n.child,R=t.child.memoizedState,R===null?R=Md(a):(u=R.cachePool,u!==null?(z=Hn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=Jm(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Td(t,b,a),n.memoizedState=Ed,Dl(t.child,o)):(Xs(n),a=t.child,t=a.sibling,a=ls(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(b=n.deletions,b===null?(n.deletions=[t],n.flags|=16):b.push(t)),n.child=a,n.memoizedState=null,a)}function Ad(t,n){return n=Zc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Zc(t,n){return t=ki(22,t,null,n),t.lanes=0,t}function wd(t,n,a){return Lr(n,t.child,null,a),t=Ad(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function d0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),kf(t.return,n,a)}function Rd(t,n,a,o,u,d){var b=t.memoizedState;b===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(b.isBackwards=n,b.rendering=null,b.renderingStartTime=0,b.last=o,b.tail=a,b.tailMode=u,b.treeForkCount=d)}function h0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var b=Pn.current,R=(b&2)!==0;if(R?(b=b&1|2,n.flags|=128):b&=1,be(Pn,b),di(t,n,o,a),o=Vt?vl:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&d0(t,a,n);else if(t.tag===19)d0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&zc(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Rd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&zc(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Rd(n,!0,a,null,d,o);break;case"together":Rd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ps(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),$s|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(fo(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=ls(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=ls(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Cd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Oc(t)))}function ny(t,n,a){switch(n.tag){case 3:ye(n,n.stateNode.containerInfo),Hs(n,Hn,t.memoizedState.cache),wr();break;case 27:case 5:tt(n);break;case 4:ye(n,n.stateNode.containerInfo);break;case 10:Hs(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,ed(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Xs(n),n.flags|=128,null):(a&n.child.childLanes)!==0?f0(t,n,a):(Xs(n),t=ps(t,n,a),t!==null?t.sibling:null);Xs(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(fo(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return h0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),be(Pn,Pn.current),o)break;return null;case 22:return n.lanes=0,s0(t,n,a,n.pendingProps);case 24:Hs(n,Hn,t.memoizedState.cache)}return ps(t,n,a)}function p0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Vn=!0;else{if(!Cd(t,a)&&(n.flags&128)===0)return Vn=!1,ny(t,n,a);Vn=(t.flags&131072)!==0}else Vn=!1,Vt&&(n.flags&1048576)!==0&&Ym(n,vl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Or(n.elementType),n.type=t,typeof t=="function")If(t)?(o=Ur(t,o),n.tag=1,n=c0(null,n,t,o,a)):(n.tag=0,n=Sd(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===L){n.tag=11,n=n0(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=i0(null,n,t,o,a);break e}}throw n=oe(t)||t,Error(s(306,n,""))}}return n;case 0:return Sd(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Ur(o,n.pendingProps),c0(t,n,o,u,a);case 3:e:{if(ye(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,$f(t,n),wl(n,o,null,a);var b=n.memoizedState;if(o=b.cache,Hs(n,Hn,o),o!==d.cache&&Vf(n,[Hn],a,!0),Al(),o=b.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:b.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=u0(t,n,o,a);break e}else if(o!==u){u=ia(Error(s(424)),n),bl(u),n=u0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,An=la(t.firstChild),ui=n,Vt=!0,zs=null,ra=!0,a=sg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(wr(),o===u){n=ps(t,n,a);break e}di(t,n,o,a)}n=n.child}return n;case 26:return Kc(t,n),t===null?(a=Tx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Vt||(a=n.type,t=n.pendingProps,o=hu(ae.current).createElement(a),o[Mn]=n,o[on]=t,hi(o,a,t),bn(o),n.stateNode=o):n.memoizedState=Tx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return tt(n),t===null&&Vt&&(o=n.stateNode=Sx(n.type,n.pendingProps,ae.current),ui=n,ra=!0,u=An,er(n.type)?(lh=u,An=la(o.firstChild)):An=u),di(t,n,n.pendingProps.children,a),Kc(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Vt&&((u=o=An)&&(o=Dy(o,n.type,n.pendingProps,ra),o!==null?(n.stateNode=o,ui=n,An=la(o.firstChild),ra=!1,u=!0):u=!1),u||Gs(n)),tt(n),u=n.type,d=n.pendingProps,b=t!==null?t.memoizedProps:null,o=d.children,ih(u,d)?o=null:b!==null&&ih(u,b)&&(n.flags|=32),n.memoizedState!==null&&(u=nd(t,n,Wb,null,null,a),Wl._currentValue=u),Kc(t,n),di(t,n,o,a),n.child;case 6:return t===null&&Vt&&((t=a=An)&&(a=Ly(a,n.pendingProps,ra),a!==null?(n.stateNode=a,ui=n,An=null,t=!0):t=!1),t||Gs(n)),null;case 13:return f0(t,n,a);case 4:return ye(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Lr(n,null,o,a):di(t,n,o,a),n.child;case 11:return n0(t,n,n.type,n.pendingProps,a);case 7:return di(t,n,n.pendingProps,a),n.child;case 8:return di(t,n,n.pendingProps.children,a),n.child;case 12:return di(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Hs(n,n.type,o.value),di(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Cr(n),u=fi(u),o=o(u),n.flags|=1,di(t,n,o,a),n.child;case 14:return i0(t,n,n.type,n.pendingProps,a);case 15:return a0(t,n,n.type,n.pendingProps,a);case 19:return h0(t,n,a);case 31:return ty(t,n,a);case 22:return s0(t,n,a,n.pendingProps);case 24:return Cr(n),o=fi(Hn),t===null?(u=Yf(),u===null&&(u=vn,d=jf(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},qf(n),Hs(n,Hn,u)):((t.lanes&a)!==0&&($f(t,n),wl(n,null,null,a),Al()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Hs(n,Hn,o)):(o=d.cache,Hs(n,Hn,o),o!==u.cache&&Vf(n,[Hn],a,!0))),di(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ms(t){t.flags|=4}function Nd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(H0())t.flags|=8192;else throw Dr=Uc,Wf}else t.flags&=-16777217}function m0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Nx(n))if(H0())t.flags|=8192;else throw Dr=Uc,Wf}function Qc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Te():536870912,t.lanes|=n,Mo|=n)}function Ll(t,n){if(!Vt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function wn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function iy(t,n,a){var o=n.pendingProps;switch(Bf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return wn(n),null;case 1:return wn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),fs(Hn),We(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(uo(n)?ms(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Gf())),wn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(ms(n),d!==null?(wn(n),m0(n,d)):(wn(n),Nd(n,u,null,o,a))):d?d!==t.memoizedState?(ms(n),wn(n),m0(n,d)):(wn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ms(n),wn(n),Nd(n,u,t,o,a)),null;case 27:if(rt(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ms(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return wn(n),null}t=Ne.current,uo(n)?qm(n):(t=Sx(u,o,a),n.stateNode=t,ms(n))}return wn(n),null;case 5:if(rt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ms(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return wn(n),null}if(d=Ne.current,uo(n))qm(n);else{var b=hu(ae.current);switch(d){case 1:d=b.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=b.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=b.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=b.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=b.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?b.createElement("select",{is:o.is}):b.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?b.createElement(u,{is:o.is}):b.createElement(u)}}d[Mn]=n,d[on]=o;e:for(b=n.child;b!==null;){if(b.tag===5||b.tag===6)d.appendChild(b.stateNode);else if(b.tag!==4&&b.tag!==27&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===n)break e;for(;b.sibling===null;){if(b.return===null||b.return===n)break e;b=b.return}b.sibling.return=b.return,b=b.sibling}n.stateNode=d;e:switch(hi(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ms(n)}}return wn(n),Nd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ms(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=ae.current,uo(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=ui,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[Mn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||fx(t.nodeValue,a)),t||Gs(n,!0)}else t=hu(t).createTextNode(o),t[Mn]=n,n.stateNode=t}return wn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=uo(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Mn]=n}else wr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;wn(n),t=!1}else a=Gf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ji(n),n):(ji(n),null);if((n.flags&128)!==0)throw Error(s(558))}return wn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=uo(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Mn]=n}else wr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;wn(n),u=!1}else u=Gf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ji(n),n):(ji(n),null)}return ji(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Qc(n,n.updateQueue),wn(n),null);case 4:return We(),t===null&&Qd(n.stateNode.containerInfo),wn(n),null;case 10:return fs(n.type),wn(n),null;case 19:if(J(Pn),o=n.memoizedState,o===null)return wn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)Ll(o,!1);else{if(Un!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=zc(t),d!==null){for(n.flags|=128,Ll(o,!1),t=d.updateQueue,n.updateQueue=t,Qc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Vm(a,t),a=a.sibling;return be(Pn,Pn.current&1|2),Vt&&cs(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ie()>iu&&(n.flags|=128,u=!0,Ll(o,!1),n.lanes=4194304)}else{if(!u)if(t=zc(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Qc(n,t),Ll(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Vt)return wn(n),null}else 2*Ie()-o.renderingStartTime>iu&&a!==536870912&&(n.flags|=128,u=!0,Ll(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ie(),t.sibling=null,a=Pn.current,be(Pn,u?a&1|2:a&1),Vt&&cs(n,o.treeForkCount),t):(wn(n),null);case 22:case 23:return ji(n),Jf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(wn(n),n.subtreeFlags&6&&(n.flags|=8192)):wn(n),a=n.updateQueue,a!==null&&Qc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&J(Nr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),fs(Hn),wn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function ay(t,n){switch(Bf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return fs(Hn),We(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return rt(n),null;case 31:if(n.memoizedState!==null){if(ji(n),n.alternate===null)throw Error(s(340));wr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ji(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));wr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return J(Pn),null;case 4:return We(),null;case 10:return fs(n.type),null;case 22:case 23:return ji(n),Jf(),t!==null&&J(Nr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return fs(Hn),null;case 25:return null;default:return null}}function g0(t,n){switch(Bf(n),n.tag){case 3:fs(Hn),We();break;case 26:case 27:case 5:rt(n);break;case 4:We();break;case 31:n.memoizedState!==null&&ji(n);break;case 13:ji(n);break;case 19:J(Pn);break;case 10:fs(n.type);break;case 22:case 23:ji(n),Jf(),t!==null&&J(Nr);break;case 24:fs(Hn)}}function Il(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,b=a.inst;o=d(),b.destroy=o}a=a.next}while(a!==u)}}catch(R){cn(n,n.return,R)}}function Ws(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var b=o.inst,R=b.destroy;if(R!==void 0){b.destroy=void 0,u=n;var z=a,re=R;try{re()}catch(xe){cn(u,z,xe)}}}o=o.next}while(o!==d)}}catch(xe){cn(n,n.return,xe)}}function x0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{og(n,a)}catch(o){cn(t,t.return,o)}}}function _0(t,n,a){a.props=Ur(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){cn(t,n,o)}}function Ul(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){cn(t,n,u)}}function Fa(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){cn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){cn(t,n,u)}else a.current=null}function v0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){cn(t,t.return,u)}}function Od(t,n,a){try{var o=t.stateNode;Ay(o,t.type,a,n),o[on]=n}catch(u){cn(t,t.return,u)}}function b0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&er(t.type)||t.tag===4}function Dd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||b0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&er(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ld(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=zi));else if(o!==4&&(o===27&&er(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Ld(t,n,a),t=t.sibling;t!==null;)Ld(t,n,a),t=t.sibling}function Jc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&er(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Jc(t,n,a),t=t.sibling;t!==null;)Jc(t,n,a),t=t.sibling}function y0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);hi(n,o,a),n[Mn]=t,n[on]=a}catch(d){cn(t,t.return,d)}}var gs=!1,jn=!1,Id=!1,S0=typeof WeakSet=="function"?WeakSet:Set,ai=null;function sy(t,n){if(t=t.containerInfo,th=bu,t=Im(t),wf(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var b=0,R=-1,z=-1,re=0,xe=0,ve=t,le=null;t:for(;;){for(var ce;ve!==a||u!==0&&ve.nodeType!==3||(R=b+u),ve!==d||o!==0&&ve.nodeType!==3||(z=b+o),ve.nodeType===3&&(b+=ve.nodeValue.length),(ce=ve.firstChild)!==null;)le=ve,ve=ce;for(;;){if(ve===t)break t;if(le===a&&++re===u&&(R=b),le===d&&++xe===o&&(z=b),(ce=ve.nextSibling)!==null)break;ve=le,le=ve.parentNode}ve=ce}a=R===-1||z===-1?null:{start:R,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(nh={focusedElem:t,selectionRange:a},bu=!1,ai=n;ai!==null;)if(n=ai,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,ai=t;else for(;ai!==null;){switch(n=ai,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var Je=Ur(a.type,u);t=o.getSnapshotBeforeUpdate(Je,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(dt){cn(a,a.return,dt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)sh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":sh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,ai=t;break}ai=n.return}}function E0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:_s(t,a),o&4&&Il(5,a);break;case 1:if(_s(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(b){cn(a,a.return,b)}else{var u=Ur(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(b){cn(a,a.return,b)}}o&64&&x0(a),o&512&&Ul(a,a.return);break;case 3:if(_s(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{og(t,n)}catch(b){cn(a,a.return,b)}}break;case 27:n===null&&o&4&&y0(a);case 26:case 5:_s(t,a),n===null&&o&4&&v0(a),o&512&&Ul(a,a.return);break;case 12:_s(t,a);break;case 31:_s(t,a),o&4&&A0(t,a);break;case 13:_s(t,a),o&4&&w0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=py.bind(null,a),Iy(t,a))));break;case 22:if(o=a.memoizedState!==null||gs,!o){n=n!==null&&n.memoizedState!==null||jn,u=gs;var d=jn;gs=o,(jn=n)&&!d?vs(t,a,(a.subtreeFlags&8772)!==0):_s(t,a),gs=u,jn=d}break;case 30:break;default:_s(t,a)}}function M0(t){var n=t.alternate;n!==null&&(t.alternate=null,M0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Qr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var On=null,Ci=!1;function xs(t,n,a){for(a=a.child;a!==null;)T0(t,n,a),a=a.sibling}function T0(t,n,a){if(me&&typeof me.onCommitFiberUnmount=="function")try{me.onCommitFiberUnmount(ue,a)}catch{}switch(a.tag){case 26:jn||Fa(a,n),xs(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:jn||Fa(a,n);var o=On,u=Ci;er(a.type)&&(On=a.stateNode,Ci=!1),xs(t,n,a),jl(a.stateNode),On=o,Ci=u;break;case 5:jn||Fa(a,n);case 6:if(o=On,u=Ci,On=null,xs(t,n,a),On=o,Ci=u,On!==null)if(Ci)try{(On.nodeType===9?On.body:On.nodeName==="HTML"?On.ownerDocument.body:On).removeChild(a.stateNode)}catch(d){cn(a,n,d)}else try{On.removeChild(a.stateNode)}catch(d){cn(a,n,d)}break;case 18:On!==null&&(Ci?(t=On,xx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Do(t)):xx(On,a.stateNode));break;case 4:o=On,u=Ci,On=a.stateNode.containerInfo,Ci=!0,xs(t,n,a),On=o,Ci=u;break;case 0:case 11:case 14:case 15:Ws(2,a,n),jn||Ws(4,a,n),xs(t,n,a);break;case 1:jn||(Fa(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&_0(a,n,o)),xs(t,n,a);break;case 21:xs(t,n,a);break;case 22:jn=(o=jn)||a.memoizedState!==null,xs(t,n,a),jn=o;break;default:xs(t,n,a)}}function A0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Do(t)}catch(a){cn(n,n.return,a)}}}function w0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Do(t)}catch(a){cn(n,n.return,a)}}function ry(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new S0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new S0),n;default:throw Error(s(435,t.tag))}}function eu(t,n){var a=ry(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=my.bind(null,t,o);o.then(u,u)}})}function Ni(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,b=n,R=b;e:for(;R!==null;){switch(R.tag){case 27:if(er(R.type)){On=R.stateNode,Ci=!1;break e}break;case 5:On=R.stateNode,Ci=!1;break e;case 3:case 4:On=R.stateNode.containerInfo,Ci=!0;break e}R=R.return}if(On===null)throw Error(s(160));T0(d,b,u),On=null,Ci=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)R0(n,t),n=n.sibling}var Sa=null;function R0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ni(n,t),Oi(t),o&4&&(Ws(3,t,t.return),Il(3,t),Ws(5,t,t.return));break;case 1:Ni(n,t),Oi(t),o&512&&(jn||a===null||Fa(a,a.return)),o&64&&gs&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Sa;if(Ni(n,t),Oi(t),o&512&&(jn||a===null||Fa(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Ja]||d[Mn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),hi(d,o,a),d[Mn]=t,bn(d),o=d;break e;case"link":var b=Rx("link","href",u).get(o+(a.href||""));if(b){for(var R=0;R<b.length;R++)if(d=b[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){b.splice(R,1);break t}}d=u.createElement(o),hi(d,o,a),u.head.appendChild(d);break;case"meta":if(b=Rx("meta","content",u).get(o+(a.content||""))){for(R=0;R<b.length;R++)if(d=b[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){b.splice(R,1);break t}}d=u.createElement(o),hi(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[Mn]=t,bn(d),o=d}t.stateNode=o}else Cx(u,t.type,t.stateNode);else t.stateNode=wx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Cx(u,t.type,t.stateNode):wx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Od(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ni(n,t),Oi(t),o&512&&(jn||a===null||Fa(a,a.return)),a!==null&&o&4&&Od(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ni(n,t),Oi(t),o&512&&(jn||a===null||Fa(a,a.return)),t.flags&32){u=t.stateNode;try{Yn(u,"")}catch(Je){cn(t,t.return,Je)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Od(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Id=!0);break;case 6:if(Ni(n,t),Oi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Je){cn(t,t.return,Je)}}break;case 3:if(gu=null,u=Sa,Sa=pu(n.containerInfo),Ni(n,t),Sa=u,Oi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Do(n.containerInfo)}catch(Je){cn(t,t.return,Je)}Id&&(Id=!1,C0(t));break;case 4:o=Sa,Sa=pu(t.stateNode.containerInfo),Ni(n,t),Oi(t),Sa=o;break;case 12:Ni(n,t),Oi(t);break;case 31:Ni(n,t),Oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 13:Ni(n,t),Oi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(nu=Ie()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 22:u=t.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,re=gs,xe=jn;if(gs=re||u,jn=xe||z,Ni(n,t),jn=xe,gs=re,Oi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||gs||jn||Pr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(d=z.stateNode,u)b=d.style,typeof b.setProperty=="function"?b.setProperty("display","none","important"):b.display="none";else{R=z.stateNode;var ve=z.memoizedProps.style,le=ve!=null&&ve.hasOwnProperty("display")?ve.display:null;R.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(Je){cn(z,z.return,Je)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(Je){cn(z,z.return,Je)}}}else if(n.tag===18){if(a===null){z=n;try{var ce=z.stateNode;u?_x(ce,!0):_x(z.stateNode,!1)}catch(Je){cn(z,z.return,Je)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,eu(t,a))));break;case 19:Ni(n,t),Oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 30:break;case 21:break;default:Ni(n,t),Oi(t)}}function Oi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(b0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Dd(t);Jc(t,d,u);break;case 5:var b=a.stateNode;a.flags&32&&(Yn(b,""),a.flags&=-33);var R=Dd(t);Jc(t,R,b);break;case 3:case 4:var z=a.stateNode.containerInfo,re=Dd(t);Ld(t,re,z);break;default:throw Error(s(161))}}catch(xe){cn(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function C0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;C0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function _s(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)E0(t,n.alternate,n),n=n.sibling}function Pr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Ws(4,n,n.return),Pr(n);break;case 1:Fa(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&_0(n,n.return,a),Pr(n);break;case 27:jl(n.stateNode);case 26:case 5:Fa(n,n.return),Pr(n);break;case 22:n.memoizedState===null&&Pr(n);break;case 30:Pr(n);break;default:Pr(n)}t=t.sibling}}function vs(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,b=d.flags;switch(d.tag){case 0:case 11:case 15:vs(u,d,a),Il(4,d);break;case 1:if(vs(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(re){cn(o,o.return,re)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)rg(z[u],R)}catch(re){cn(o,o.return,re)}}a&&b&64&&x0(d),Ul(d,d.return);break;case 27:y0(d);case 26:case 5:vs(u,d,a),a&&o===null&&b&4&&v0(d),Ul(d,d.return);break;case 12:vs(u,d,a);break;case 31:vs(u,d,a),a&&b&4&&A0(u,d);break;case 13:vs(u,d,a),a&&b&4&&w0(u,d);break;case 22:d.memoizedState===null&&vs(u,d,a),Ul(d,d.return);break;case 30:break;default:vs(u,d,a)}n=n.sibling}}function Ud(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&yl(a))}function Pd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&yl(t))}function Ea(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)N0(t,n,a,o),n=n.sibling}function N0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ea(t,n,a,o),u&2048&&Il(9,n);break;case 1:Ea(t,n,a,o);break;case 3:Ea(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&yl(t)));break;case 12:if(u&2048){Ea(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,b=d.id,R=d.onPostCommit;typeof R=="function"&&R(b,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(z){cn(n,n.return,z)}}else Ea(t,n,a,o);break;case 31:Ea(t,n,a,o);break;case 13:Ea(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,b=n.alternate,n.memoizedState!==null?d._visibility&2?Ea(t,n,a,o):Pl(t,n):d._visibility&2?Ea(t,n,a,o):(d._visibility|=2,yo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Ud(b,n);break;case 24:Ea(t,n,a,o),u&2048&&Pd(n.alternate,n);break;default:Ea(t,n,a,o)}}function yo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,b=n,R=a,z=o,re=b.flags;switch(b.tag){case 0:case 11:case 15:yo(d,b,R,z,u),Il(8,b);break;case 23:break;case 22:var xe=b.stateNode;b.memoizedState!==null?xe._visibility&2?yo(d,b,R,z,u):Pl(d,b):(xe._visibility|=2,yo(d,b,R,z,u)),u&&re&2048&&Ud(b.alternate,b);break;case 24:yo(d,b,R,z,u),u&&re&2048&&Pd(b.alternate,b);break;default:yo(d,b,R,z,u)}n=n.sibling}}function Pl(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Pl(a,o),u&2048&&Ud(o.alternate,o);break;case 24:Pl(a,o),u&2048&&Pd(o.alternate,o);break;default:Pl(a,o)}n=n.sibling}}var Fl=8192;function So(t,n,a){if(t.subtreeFlags&Fl)for(t=t.child;t!==null;)O0(t,n,a),t=t.sibling}function O0(t,n,a){switch(t.tag){case 26:So(t,n,a),t.flags&Fl&&t.memoizedState!==null&&Yy(a,Sa,t.memoizedState,t.memoizedProps);break;case 5:So(t,n,a);break;case 3:case 4:var o=Sa;Sa=pu(t.stateNode.containerInfo),So(t,n,a),Sa=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Fl,Fl=16777216,So(t,n,a),Fl=o):So(t,n,a));break;default:So(t,n,a)}}function D0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Bl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];ai=o,I0(o,t)}D0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)L0(t),t=t.sibling}function L0(t){switch(t.tag){case 0:case 11:case 15:Bl(t),t.flags&2048&&Ws(9,t,t.return);break;case 3:Bl(t);break;case 12:Bl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,tu(t)):Bl(t);break;default:Bl(t)}}function tu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];ai=o,I0(o,t)}D0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ws(8,n,n.return),tu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,tu(n));break;default:tu(n)}t=t.sibling}}function I0(t,n){for(;ai!==null;){var a=ai;switch(a.tag){case 0:case 11:case 15:Ws(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:yl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,ai=o;else e:for(a=t;ai!==null;){o=ai;var u=o.sibling,d=o.return;if(M0(o),o===a){ai=null;break e}if(u!==null){u.return=d,ai=u;break e}ai=d}}}var oy={getCacheForType:function(t){var n=fi(Hn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return fi(Hn).controller.signal}},ly=typeof WeakMap=="function"?WeakMap:Map,an=0,vn=null,Ft=null,Gt=0,ln=0,Xi=null,qs=!1,Eo=!1,Fd=!1,bs=0,Un=0,$s=0,Fr=0,Bd=0,Yi=0,Mo=0,zl=null,Di=null,zd=!1,nu=0,U0=0,iu=1/0,au=null,Ks=null,$n=0,Zs=null,To=null,ys=0,Gd=0,Hd=null,P0=null,Gl=0,kd=null;function Wi(){return(an&2)!==0&&Gt!==0?Gt&-Gt:U.T!==null?qd():Ca()}function F0(){if(Yi===0)if((Gt&536870912)===0||Vt){var t=Rt;Rt<<=1,(Rt&3932160)===0&&(Rt=262144),Yi=t}else Yi=536870912;return t=Vi.current,t!==null&&(t.flags|=32),Yi}function Li(t,n,a){(t===vn&&(ln===2||ln===9)||t.cancelPendingCommit!==null)&&(Ao(t,0),Qs(t,Gt,Yi,!1)),ut(t,a),((an&2)===0||t!==vn)&&(t===vn&&((an&2)===0&&(Fr|=a),Un===4&&Qs(t,Gt,Yi,!1)),Ba(t))}function B0(t,n,a){if((an&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Xe(t,n),u=o?fy(t,n):jd(t,n,!0),d=o;do{if(u===0){Eo&&!o&&Qs(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!cy(a)){u=jd(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var b=0;else b=t.pendingLanes&-536870913,b=b!==0?b:b&536870912?536870912:0;if(b!==0){n=b;e:{var R=t;u=zl;var z=R.current.memoizedState.isDehydrated;if(z&&(Ao(R,b).flags|=256),b=jd(R,b,!1),b!==2){if(Fd&&!z){R.errorRecoveryDisabledLanes|=d,Fr|=d,u=4;break e}d=Di,Di=u,d!==null&&(Di===null?Di=d:Di.push.apply(Di,d))}u=b}if(d=!1,u!==2)continue}}if(u===1){Ao(t,0),Qs(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Qs(o,n,Yi,!qs);break e;case 2:Di=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=nu+300-Ie(),10<u)){if(Qs(o,n,Yi,!qs),fe(o,0,!0)!==0)break e;ys=n,o.timeoutHandle=mx(z0.bind(null,o,a,Di,au,zd,n,Yi,Fr,Mo,qs,d,"Throttled",-0,0),u);break e}z0(o,a,Di,au,zd,n,Yi,Fr,Mo,qs,d,null,-0,0)}}break}while(!0);Ba(t)}function z0(t,n,a,o,u,d,b,R,z,re,xe,ve,le,ce){if(t.timeoutHandle=-1,ve=n.subtreeFlags,ve&8192||(ve&16785408)===16785408){ve={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:zi},O0(n,d,ve);var Je=(d&62914560)===d?nu-Ie():(d&4194048)===d?U0-Ie():0;if(Je=Wy(ve,Je),Je!==null){ys=d,t.cancelPendingCommit=Je(W0.bind(null,t,n,d,a,o,u,b,R,z,xe,ve,null,le,ce)),Qs(t,d,b,!re);return}}W0(t,n,d,a,o,u,b,R,z)}function cy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Hi(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Qs(t,n,a,o){n&=~Bd,n&=~Fr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-ze(u),b=1<<d;o[d]=-1,u&=~b}a!==0&&Yt(t,a,n)}function su(){return(an&6)===0?(Hl(0),!1):!0}function Vd(){if(Ft!==null){if(ln===0)var t=Ft.return;else t=Ft,us=Rr=null,sd(t),go=null,El=0,t=Ft;for(;t!==null;)g0(t.alternate,t),t=t.return;Ft=null}}function Ao(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Cy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ys=0,Vd(),vn=t,Ft=a=ls(t.current,null),Gt=n,ln=0,Xi=null,qs=!1,Eo=Xe(t,n),Fd=!1,Mo=Yi=Bd=Fr=$s=Un=0,Di=zl=null,zd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ze(o),d=1<<u;n|=t[u],o&=~d}return bs=n,Ac(),a}function G0(t,n){Mt=null,U.H=Ol,n===mo||n===Ic?(n=ng(),ln=3):n===Wf?(n=ng(),ln=4):ln=n===yd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Xi=n,Ft===null&&(Un=1,qc(t,ia(n,t.current)))}function H0(){var t=Vi.current;return t===null?!0:(Gt&4194048)===Gt?oa===null:(Gt&62914560)===Gt||(Gt&536870912)!==0?t===oa:!1}function k0(){var t=U.H;return U.H=Ol,t===null?Ol:t}function V0(){var t=U.A;return U.A=oy,t}function ru(){Un=4,qs||(Gt&4194048)!==Gt&&Vi.current!==null||(Eo=!0),($s&134217727)===0&&(Fr&134217727)===0||vn===null||Qs(vn,Gt,Yi,!1)}function jd(t,n,a){var o=an;an|=2;var u=k0(),d=V0();(vn!==t||Gt!==n)&&(au=null,Ao(t,n)),n=!1;var b=Un;e:do try{if(ln!==0&&Ft!==null){var R=Ft,z=Xi;switch(ln){case 8:Vd(),b=6;break e;case 3:case 2:case 9:case 6:Vi.current===null&&(n=!0);var re=ln;if(ln=0,Xi=null,wo(t,R,z,re),a&&Eo){b=0;break e}break;default:re=ln,ln=0,Xi=null,wo(t,R,z,re)}}uy(),b=Un;break}catch(xe){G0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,us=Rr=null,an=o,U.H=u,U.A=d,Ft===null&&(vn=null,Gt=0,Ac()),b}function uy(){for(;Ft!==null;)j0(Ft)}function fy(t,n){var a=an;an|=2;var o=k0(),u=V0();vn!==t||Gt!==n?(au=null,iu=Ie()+500,Ao(t,n)):Eo=Xe(t,n);e:do try{if(ln!==0&&Ft!==null){n=Ft;var d=Xi;t:switch(ln){case 1:ln=0,Xi=null,wo(t,n,d,1);break;case 2:case 9:if(eg(d)){ln=0,Xi=null,X0(n);break}n=function(){ln!==2&&ln!==9||vn!==t||(ln=7),Ba(t)},d.then(n,n);break e;case 3:ln=7;break e;case 4:ln=5;break e;case 7:eg(d)?(ln=0,Xi=null,X0(n)):(ln=0,Xi=null,wo(t,n,d,7));break;case 5:var b=null;switch(Ft.tag){case 26:b=Ft.memoizedState;case 5:case 27:var R=Ft;if(b?Nx(b):R.stateNode.complete){ln=0,Xi=null;var z=R.sibling;if(z!==null)Ft=z;else{var re=R.return;re!==null?(Ft=re,ou(re)):Ft=null}break t}}ln=0,Xi=null,wo(t,n,d,5);break;case 6:ln=0,Xi=null,wo(t,n,d,6);break;case 8:Vd(),Un=6;break e;default:throw Error(s(462))}}dy();break}catch(xe){G0(t,xe)}while(!0);return us=Rr=null,U.H=o,U.A=u,an=a,Ft!==null?0:(vn=null,Gt=0,Ac(),Un)}function dy(){for(;Ft!==null&&!Tt();)j0(Ft)}function j0(t){var n=p0(t.alternate,t,bs);t.memoizedProps=t.pendingProps,n===null?ou(t):Ft=n}function X0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=l0(a,n,n.pendingProps,n.type,void 0,Gt);break;case 11:n=l0(a,n,n.pendingProps,n.type.render,n.ref,Gt);break;case 5:sd(n);default:g0(a,n),n=Ft=Vm(n,bs),n=p0(a,n,bs)}t.memoizedProps=t.pendingProps,n===null?ou(t):Ft=n}function wo(t,n,a,o){us=Rr=null,sd(n),go=null,El=0;var u=n.return;try{if(ey(t,u,n,a,Gt)){Un=1,qc(t,ia(a,t.current)),Ft=null;return}}catch(d){if(u!==null)throw Ft=u,d;Un=1,qc(t,ia(a,t.current)),Ft=null;return}n.flags&32768?(Vt||o===1?t=!0:Eo||(Gt&536870912)!==0?t=!1:(qs=t=!0,(o===2||o===9||o===3||o===6)&&(o=Vi.current,o!==null&&o.tag===13&&(o.flags|=16384))),Y0(n,t)):ou(n)}function ou(t){var n=t;do{if((n.flags&32768)!==0){Y0(n,qs);return}t=n.return;var a=iy(n.alternate,n,bs);if(a!==null){Ft=a;return}if(n=n.sibling,n!==null){Ft=n;return}Ft=n=t}while(n!==null);Un===0&&(Un=5)}function Y0(t,n){do{var a=ay(t.alternate,t);if(a!==null){a.flags&=32767,Ft=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Ft=t;return}Ft=t=a}while(t!==null);Un=6,Ft=null}function W0(t,n,a,o,u,d,b,R,z){t.cancelPendingCommit=null;do lu();while($n!==0);if((an&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Df,En(t,a,d,b,R,z),t===vn&&(Ft=vn=null,Gt=0),To=n,Zs=t,ys=a,Gd=d,Hd=u,P0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,gy(Q,function(){return Q0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=U.T,U.T=null,u=G.p,G.p=2,b=an,an|=4;try{sy(t,n,a)}finally{an=b,G.p=u,U.T=o}}$n=1,q0(),$0(),K0()}}function q0(){if($n===1){$n=0;var t=Zs,n=To,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=U.T,U.T=null;var o=G.p;G.p=2;var u=an;an|=4;try{R0(n,t);var d=nh,b=Im(t.containerInfo),R=d.focusedElem,z=d.selectionRange;if(b!==R&&R&&R.ownerDocument&&Lm(R.ownerDocument.documentElement,R)){if(z!==null&&wf(R)){var re=z.start,xe=z.end;if(xe===void 0&&(xe=re),"selectionStart"in R)R.selectionStart=re,R.selectionEnd=Math.min(xe,R.value.length);else{var ve=R.ownerDocument||document,le=ve&&ve.defaultView||window;if(le.getSelection){var ce=le.getSelection(),Je=R.textContent.length,dt=Math.min(z.start,Je),hn=z.end===void 0?dt:Math.min(z.end,Je);!ce.extend&&dt>hn&&(b=hn,hn=dt,dt=b);var Z=Dm(R,dt),j=Dm(R,hn);if(Z&&j&&(ce.rangeCount!==1||ce.anchorNode!==Z.node||ce.anchorOffset!==Z.offset||ce.focusNode!==j.node||ce.focusOffset!==j.offset)){var se=ve.createRange();se.setStart(Z.node,Z.offset),ce.removeAllRanges(),dt>hn?(ce.addRange(se),ce.extend(j.node,j.offset)):(se.setEnd(j.node,j.offset),ce.addRange(se))}}}}for(ve=[],ce=R;ce=ce.parentNode;)ce.nodeType===1&&ve.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ve.length;R++){var _e=ve[R];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}bu=!!th,nh=th=null}finally{an=u,G.p=o,U.T=a}}t.current=n,$n=2}}function $0(){if($n===2){$n=0;var t=Zs,n=To,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=U.T,U.T=null;var o=G.p;G.p=2;var u=an;an|=4;try{E0(t,n.alternate,n)}finally{an=u,G.p=o,U.T=a}}$n=3}}function K0(){if($n===4||$n===3){$n=0,tn();var t=Zs,n=To,a=ys,o=P0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?$n=5:($n=0,To=Zs=null,Z0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Ks=null),ri(a),n=n.stateNode,me&&typeof me.onCommitFiberRoot=="function")try{me.onCommitFiberRoot(ue,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=U.T,u=G.p,G.p=2,U.T=null;try{for(var d=t.onRecoverableError,b=0;b<o.length;b++){var R=o[b];d(R.value,{componentStack:R.stack})}}finally{U.T=n,G.p=u}}(ys&3)!==0&&lu(),Ba(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===kd?Gl++:(Gl=0,kd=t):Gl=0,Hl(0)}}function Z0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,yl(n)))}function lu(){return q0(),$0(),K0(),Q0()}function Q0(){if($n!==5)return!1;var t=Zs,n=Gd;Gd=0;var a=ri(ys),o=U.T,u=G.p;try{G.p=32>a?32:a,U.T=null,a=Hd,Hd=null;var d=Zs,b=ys;if($n=0,To=Zs=null,ys=0,(an&6)!==0)throw Error(s(331));var R=an;if(an|=4,L0(d.current),N0(d,d.current,b,a),an=R,Hl(0,!1),me&&typeof me.onPostCommitFiberRoot=="function")try{me.onPostCommitFiberRoot(ue,d)}catch{}return!0}finally{G.p=u,U.T=o,Z0(t,n)}}function J0(t,n,a){n=ia(a,n),n=bd(t.stateNode,n,2),t=js(t,n,2),t!==null&&(ut(t,2),Ba(t))}function cn(t,n,a){if(t.tag===3)J0(t,t,a);else for(;n!==null;){if(n.tag===3){J0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ks===null||!Ks.has(o))){t=ia(a,t),a=e0(2),o=js(n,a,2),o!==null&&(t0(a,o,n,t),ut(o,2),Ba(o));break}}n=n.return}}function Xd(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new ly;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Fd=!0,u.add(a),t=hy.bind(null,t,n,a),n.then(t,t))}function hy(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,vn===t&&(Gt&a)===a&&(Un===4||Un===3&&(Gt&62914560)===Gt&&300>Ie()-nu?(an&2)===0&&Ao(t,0):Bd|=a,Mo===Gt&&(Mo=0)),Ba(t)}function ex(t,n){n===0&&(n=Te()),t=Tr(t,n),t!==null&&(ut(t,n),Ba(t))}function py(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),ex(t,a)}function my(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),ex(t,a)}function gy(t,n){return Y(t,n)}var cu=null,Ro=null,Yd=!1,uu=!1,Wd=!1,Js=0;function Ba(t){t!==Ro&&t.next===null&&(Ro===null?cu=Ro=t:Ro=Ro.next=t),uu=!0,Yd||(Yd=!0,_y())}function Hl(t,n){if(!Wd&&uu){Wd=!0;do for(var a=!1,o=cu;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var b=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-ze(42|t)+1)-1,d&=u&~(b&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,ax(o,d))}else d=Gt,d=fe(o,o===vn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Xe(o,d)||(a=!0,ax(o,d));o=o.next}while(a);Wd=!1}}function xy(){tx()}function tx(){uu=Yd=!1;var t=0;Js!==0&&Ry()&&(t=Js);for(var n=Ie(),a=null,o=cu;o!==null;){var u=o.next,d=nx(o,n);d===0?(o.next=null,a===null?cu=u:a.next=u,u===null&&(Ro=a)):(a=o,(t!==0||(d&3)!==0)&&(uu=!0)),o=u}$n!==0&&$n!==5||Hl(t),Js!==0&&(Js=0)}function nx(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var b=31-ze(d),R=1<<b,z=u[b];z===-1?((R&a)===0||(R&o)!==0)&&(u[b]=Le(R,n)):z<=n&&(t.expiredLanes|=R),d&=~R}if(n=vn,a=Gt,a=fe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(ln===2||ln===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Xt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Xe(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Xt(o),ri(a)){case 2:case 8:a=T;break;case 32:a=Q;break;case 268435456:a=Ee;break;default:a=Q}return o=ix.bind(null,t),a=Y(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Xt(o),t.callbackPriority=2,t.callbackNode=null,2}function ix(t,n){if($n!==0&&$n!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(lu()&&t.callbackNode!==a)return null;var o=Gt;return o=fe(t,t===vn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(B0(t,o,n),nx(t,Ie()),t.callbackNode!=null&&t.callbackNode===a?ix.bind(null,t):null)}function ax(t,n){if(lu())return null;B0(t,n,!0)}function _y(){Ny(function(){(an&6)!==0?Y(O,xy):tx()})}function qd(){if(Js===0){var t=ho;t===0&&(t=at,at<<=1,(at&261888)===0&&(at=256)),Js=t}return Js}function sx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Oa(""+t)}function rx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function vy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=sx((u[on]||null).action),b=o.submitter;b&&(n=(n=b[on]||null)?sx(n.formAction):b.getAttribute("formAction"),n!==null&&(d=n,b=null));var R=new no("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Js!==0){var z=b?rx(u,b):new FormData(u);pd(a,{pending:!0,data:z,method:u.method,action:d},null,z)}}else typeof d=="function"&&(R.preventDefault(),z=b?rx(u,b):new FormData(u),pd(a,{pending:!0,data:z,method:u.method,action:d},d,z))},currentTarget:u}]})}}for(var $d=0;$d<Of.length;$d++){var Kd=Of[$d],by=Kd.toLowerCase(),yy=Kd[0].toUpperCase()+Kd.slice(1);ya(by,"on"+yy)}ya(Fm,"onAnimationEnd"),ya(Bm,"onAnimationIteration"),ya(zm,"onAnimationStart"),ya("dblclick","onDoubleClick"),ya("focusin","onFocus"),ya("focusout","onBlur"),ya(Fb,"onTransitionRun"),ya(Bb,"onTransitionStart"),ya(zb,"onTransitionCancel"),ya(Gm,"onTransitionEnd"),K("onMouseEnter",["mouseout","mouseover"]),K("onMouseLeave",["mouseout","mouseover"]),K("onPointerEnter",["pointerout","pointerover"]),K("onPointerLeave",["pointerout","pointerover"]),q("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),q("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),q("onBeforeInput",["compositionend","keypress","textInput","paste"]),q("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var kl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Sy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(kl));function ox(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var b=o.length-1;0<=b;b--){var R=o[b],z=R.instance,re=R.currentTarget;if(R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(xe){Tc(xe)}u.currentTarget=null,d=z}else for(b=0;b<o.length;b++){if(R=o[b],z=R.instance,re=R.currentTarget,R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(xe){Tc(xe)}u.currentTarget=null,d=z}}}}function Bt(t,n){var a=n[gn];a===void 0&&(a=n[gn]=new Set);var o=t+"__bubble";a.has(o)||(lx(n,t,2,!1),a.add(o))}function Zd(t,n,a){var o=0;n&&(o|=4),lx(a,t,o,n)}var fu="_reactListening"+Math.random().toString(36).slice(2);function Qd(t){if(!t[fu]){t[fu]=!0,yr.forEach(function(a){a!=="selectionchange"&&(Sy.has(a)||Zd(a,!1,t),Zd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[fu]||(n[fu]=!0,Zd("selectionchange",!1,n))}}function lx(t,n,a,o){switch(Fx(n)){case 2:var u=Ky;break;case 8:u=Zy;break;default:u=hh}a=u.bind(null,n,a,t),u=void 0,!ea||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Jd(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var b=o.tag;if(b===3||b===4){var R=o.stateNode.containerInfo;if(R===u)break;if(b===4)for(b=o.return;b!==null;){var z=b.tag;if((z===3||z===4)&&b.stateNode.containerInfo===u)return;b=b.return}for(;R!==null;){if(b=Ji(R),b===null)return;if(z=b.tag,z===5||z===6||z===26||z===27){o=d=b;continue e}R=R.parentNode}}o=o.return}cl(function(){var re=d,xe=va(a),ve=[];e:{var le=Hm.get(t);if(le!==void 0){var ce=no,Je=t;switch(t){case"keypress":if(eo(a)===0)break e;case"keydown":case"keyup":ce=Tn;break;case"focusin":Je="focus",ce=hl;break;case"focusout":Je="blur",ce=hl;break;case"beforeblur":case"afterblur":ce=hl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ce=dl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ce=Ef;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ce=qn;break;case Fm:case Bm:case zm:ce=Ct;break;case Gm:ce=Us;break;case"scroll":case"scrollend":ce=yc;break;case"wheel":ce=Ia;break;case"copy":case"cut":case"paste":ce=st;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ce=oi;break;case"toggle":case"beforetoggle":ce=Ps}var dt=(n&4)!==0,hn=!dt&&(t==="scroll"||t==="scrollend"),Z=dt?le!==null?le+"Capture":null:le;dt=[];for(var j=re,se;j!==null;){var _e=j;if(se=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||se===null||Z===null||(_e=Da(j,Z),_e!=null&&dt.push(Vl(j,_e,se))),hn)break;j=j.return}0<dt.length&&(le=new ce(le,Je,null,a,xe),ve.push({event:le,listeners:dt}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",ce=t==="mouseout"||t==="pointerout",le&&a!==Mi&&(Je=a.relatedTarget||a.fromElement)&&(Ji(Je)||Je[Bi]))break e;if((ce||le)&&(le=xe.window===xe?xe:(le=xe.ownerDocument)?le.defaultView||le.parentWindow:window,ce?(Je=a.relatedTarget||a.toElement,ce=re,Je=Je?Ji(Je):null,Je!==null&&(hn=c(Je),dt=Je.tag,Je!==hn||dt!==5&&dt!==27&&dt!==6)&&(Je=null)):(ce=null,Je=re),ce!==Je)){if(dt=dl,_e="onMouseLeave",Z="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&(dt=oi,_e="onPointerLeave",Z="onPointerEnter",j="pointer"),hn=ce==null?le:ga(ce),se=Je==null?le:ga(Je),le=new dt(_e,j+"leave",ce,a,xe),le.target=hn,le.relatedTarget=se,_e=null,Ji(xe)===re&&(dt=new dt(Z,j+"enter",Je,a,xe),dt.target=se,dt.relatedTarget=hn,_e=dt),hn=_e,ce&&Je)t:{for(dt=Ey,Z=ce,j=Je,se=0,_e=Z;_e;_e=dt(_e))se++;_e=0;for(var ct=j;ct;ct=dt(ct))_e++;for(;0<se-_e;)Z=dt(Z),se--;for(;0<_e-se;)j=dt(j),_e--;for(;se--;){if(Z===j||j!==null&&Z===j.alternate){dt=Z;break t}Z=dt(Z),j=dt(j)}dt=null}else dt=null;ce!==null&&cx(ve,le,ce,dt,!1),Je!==null&&hn!==null&&cx(ve,hn,Je,dt,!0)}}e:{if(le=re?ga(re):window,ce=le.nodeName&&le.nodeName.toLowerCase(),ce==="select"||ce==="input"&&le.type==="file")var Jt=Am;else if(pl(le))if(wm)Jt=Ib;else{Jt=Db;var nt=Ob}else ce=le.nodeName,!ce||ce.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?re&&yt(re.elementType)&&(Jt=Am):Jt=Lb;if(Jt&&(Jt=Jt(t,re))){Tm(ve,Jt,a,xe);break e}nt&&nt(t,le,re),t==="focusout"&&re&&le.type==="number"&&re.memoizedProps.value!=null&&At(le,"number",le.value)}switch(nt=re?ga(re):window,t){case"focusin":(pl(nt)||nt.contentEditable==="true")&&(ao=nt,Rf=re,_l=null);break;case"focusout":_l=Rf=ao=null;break;case"mousedown":Cf=!0;break;case"contextmenu":case"mouseup":case"dragend":Cf=!1,Um(ve,a,xe);break;case"selectionchange":if(Pb)break;case"keydown":case"keyup":Um(ve,a,xe)}var wt;if(Fs)e:{switch(t){case"compositionstart":var Ht="onCompositionStart";break e;case"compositionend":Ht="onCompositionEnd";break e;case"compositionupdate":Ht="onCompositionUpdate";break e}Ht=void 0}else Qe?li(t,a)&&(Ht="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Ht="onCompositionStart");Ht&&(ii&&a.locale!=="ko"&&(Qe||Ht!=="onCompositionStart"?Ht==="onCompositionEnd"&&Qe&&(wt=Jr()):(Gi=xe,ul="value"in Gi?Gi.value:Gi.textContent,Qe=!0)),nt=du(re,Ht),0<nt.length&&(Ht=new mt(Ht,t,null,a,xe),ve.push({event:Ht,listeners:nt}),wt?Ht.data=wt:(wt=xi(a),wt!==null&&(Ht.data=wt)))),(wt=ni?Pt(t,a):ci(t,a))&&(Ht=du(re,"onBeforeInput"),0<Ht.length&&(nt=new mt("onBeforeInput","beforeinput",null,a,xe),ve.push({event:nt,listeners:Ht}),nt.data=wt)),vy(ve,t,re,a,xe)}ox(ve,n)})}function Vl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function du(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=Da(t,a),u!=null&&o.unshift(Vl(t,u,d)),u=Da(t,n),u!=null&&o.push(Vl(t,u,d))),t.tag===3)return o;t=t.return}return[]}function Ey(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function cx(t,n,a,o,u){for(var d=n._reactName,b=[];a!==null&&a!==o;){var R=a,z=R.alternate,re=R.stateNode;if(R=R.tag,z!==null&&z===o)break;R!==5&&R!==26&&R!==27||re===null||(z=re,u?(re=Da(a,d),re!=null&&b.unshift(Vl(a,re,z))):u||(re=Da(a,d),re!=null&&b.push(Vl(a,re,z)))),a=a.return}b.length!==0&&t.push({event:n,listeners:b})}var My=/\r\n?/g,Ty=/\u0000|\uFFFD/g;function ux(t){return(typeof t=="string"?t:""+t).replace(My,`
`).replace(Ty,"")}function fx(t,n){return n=ux(n),ux(t)===n}function dn(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Yn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Yn(t,""+o);break;case"className":Ze(t,"class",o);break;case"tabIndex":Ze(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ze(t,a,o);break;case"style":Wn(t,o,d);break;case"data":if(n!=="object"){Ze(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Oa(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&dn(t,n,"name",u.name,u,null),dn(t,n,"formEncType",u.formEncType,u,null),dn(t,n,"formMethod",u.formMethod,u,null),dn(t,n,"formTarget",u.formTarget,u,null)):(dn(t,n,"encType",u.encType,u,null),dn(t,n,"method",u.method,u,null),dn(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Oa(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=zi);break;case"onScroll":o!=null&&Bt("scroll",t);break;case"onScrollEnd":o!=null&&Bt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=Oa(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Bt("beforetoggle",t),Bt("toggle",t),Ge(t,"popover",o);break;case"xlinkActuate":$e(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":$e(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":$e(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":$e(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":$e(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":$e(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":$e(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":$e(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":$e(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ge(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=_a.get(a)||a,Ge(t,a,o))}}function eh(t,n,a,o,u,d){switch(a){case"style":Wn(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?Yn(t,o):(typeof o=="number"||typeof o=="bigint")&&Yn(t,""+o);break;case"onScroll":o!=null&&Bt("scroll",t);break;case"onScrollEnd":o!=null&&Bt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[on]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Ge(t,a,o)}}}function hi(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Bt("error",t),Bt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var b=a[d];if(b!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:dn(t,n,d,b,a,null)}}u&&dn(t,n,"srcSet",a.srcSet,a,null),o&&dn(t,n,"src",a.src,a,null);return;case"input":Bt("invalid",t);var R=d=b=u=null,z=null,re=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":u=xe;break;case"type":b=xe;break;case"checked":z=xe;break;case"defaultChecked":re=xe;break;case"value":d=xe;break;case"defaultValue":R=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(s(137,n));break;default:dn(t,n,o,xe,a,null)}}Gn(t,d,R,z,re,b,u,!1);return;case"select":Bt("invalid",t),o=b=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":b=R;break;case"multiple":o=R;default:dn(t,n,u,R,a,null)}n=d,a=b,t.multiple=!!o,n!=null?xn(t,!!o,n,!1):a!=null&&xn(t,!!o,a,!0);return;case"textarea":Bt("invalid",t),d=u=o=null;for(b in a)if(a.hasOwnProperty(b)&&(R=a[b],R!=null))switch(b){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:dn(t,n,b,R,a,null)}Cn(t,o,u,d);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":dn(t,n,z,o,a,null));return;case"dialog":Bt("beforetoggle",t),Bt("toggle",t),Bt("cancel",t),Bt("close",t);break;case"iframe":case"object":Bt("load",t);break;case"video":case"audio":for(o=0;o<kl.length;o++)Bt(kl[o],t);break;case"image":Bt("error",t),Bt("load",t);break;case"details":Bt("toggle",t);break;case"embed":case"source":case"link":Bt("error",t),Bt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(re in a)if(a.hasOwnProperty(re)&&(o=a[re],o!=null))switch(re){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:dn(t,n,re,o,a,null)}return;default:if(yt(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&eh(t,n,xe,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&dn(t,n,R,o,a,null))}function Ay(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,b=null,R=null,z=null,re=null,xe=null;for(ce in a){var ve=a[ce];if(a.hasOwnProperty(ce)&&ve!=null)switch(ce){case"checked":break;case"value":break;case"defaultValue":z=ve;default:o.hasOwnProperty(ce)||dn(t,n,ce,null,o,ve)}}for(var le in o){var ce=o[le];if(ve=a[le],o.hasOwnProperty(le)&&(ce!=null||ve!=null))switch(le){case"type":d=ce;break;case"name":u=ce;break;case"checked":re=ce;break;case"defaultChecked":xe=ce;break;case"value":b=ce;break;case"defaultValue":R=ce;break;case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:ce!==ve&&dn(t,n,le,ce,o,ve)}}Ve(t,b,R,z,re,xe,d,u);return;case"select":ce=b=R=le=null;for(d in a)if(z=a[d],a.hasOwnProperty(d)&&z!=null)switch(d){case"value":break;case"multiple":ce=z;default:o.hasOwnProperty(d)||dn(t,n,d,null,o,z)}for(u in o)if(d=o[u],z=a[u],o.hasOwnProperty(u)&&(d!=null||z!=null))switch(u){case"value":le=d;break;case"defaultValue":R=d;break;case"multiple":b=d;default:d!==z&&dn(t,n,u,d,o,z)}n=R,a=b,o=ce,le!=null?xn(t,!!a,le,!1):!!o!=!!a&&(n!=null?xn(t,!!a,n,!0):xn(t,!!a,a?[]:"",!1));return;case"textarea":ce=le=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:dn(t,n,R,null,o,u)}for(b in o)if(u=o[b],d=a[b],o.hasOwnProperty(b)&&(u!=null||d!=null))switch(b){case"value":le=u;break;case"defaultValue":ce=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&dn(t,n,b,u,o,d)}Rn(t,le,ce);return;case"option":for(var Je in a)le=a[Je],a.hasOwnProperty(Je)&&le!=null&&!o.hasOwnProperty(Je)&&(Je==="selected"?t.selected=!1:dn(t,n,Je,null,o,le));for(z in o)le=o[z],ce=a[z],o.hasOwnProperty(z)&&le!==ce&&(le!=null||ce!=null)&&(z==="selected"?t.selected=le&&typeof le!="function"&&typeof le!="symbol":dn(t,n,z,le,o,ce));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var dt in a)le=a[dt],a.hasOwnProperty(dt)&&le!=null&&!o.hasOwnProperty(dt)&&dn(t,n,dt,null,o,le);for(re in o)if(le=o[re],ce=a[re],o.hasOwnProperty(re)&&le!==ce&&(le!=null||ce!=null))switch(re){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(s(137,n));break;default:dn(t,n,re,le,o,ce)}return;default:if(yt(n)){for(var hn in a)le=a[hn],a.hasOwnProperty(hn)&&le!==void 0&&!o.hasOwnProperty(hn)&&eh(t,n,hn,void 0,o,le);for(xe in o)le=o[xe],ce=a[xe],!o.hasOwnProperty(xe)||le===ce||le===void 0&&ce===void 0||eh(t,n,xe,le,o,ce);return}}for(var Z in a)le=a[Z],a.hasOwnProperty(Z)&&le!=null&&!o.hasOwnProperty(Z)&&dn(t,n,Z,null,o,le);for(ve in o)le=o[ve],ce=a[ve],!o.hasOwnProperty(ve)||le===ce||le==null&&ce==null||dn(t,n,ve,le,o,ce)}function dx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function wy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,b=u.initiatorType,R=u.duration;if(d&&R&&dx(b)){for(b=0,R=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],re=z.startTime;if(re>R)break;var xe=z.transferSize,ve=z.initiatorType;xe&&dx(ve)&&(z=z.responseEnd,b+=xe*(z<R?1:(R-re)/(z-re)))}if(--o,n+=8*(d+b)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var th=null,nh=null;function hu(t){return t.nodeType===9?t:t.ownerDocument}function hx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function px(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ih(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ah=null;function Ry(){var t=window.event;return t&&t.type==="popstate"?t===ah?!1:(ah=t,!0):(ah=null,!1)}var mx=typeof setTimeout=="function"?setTimeout:void 0,Cy=typeof clearTimeout=="function"?clearTimeout:void 0,gx=typeof Promise=="function"?Promise:void 0,Ny=typeof queueMicrotask=="function"?queueMicrotask:typeof gx<"u"?function(t){return gx.resolve(null).then(t).catch(Oy)}:mx;function Oy(t){setTimeout(function(){throw t})}function er(t){return t==="head"}function xx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Do(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")jl(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,jl(a);for(var d=a.firstChild;d;){var b=d.nextSibling,R=d.nodeName;d[Ja]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=b}}else a==="body"&&jl(t.ownerDocument.body);a=u}while(a);Do(n)}function _x(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function sh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":sh(a),Qr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Dy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ja])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=la(t.nextSibling),t===null)break}return null}function Ly(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=la(t.nextSibling),t===null))return null;return t}function vx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=la(t.nextSibling),t===null))return null;return t}function rh(t){return t.data==="$?"||t.data==="$~"}function oh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Iy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function la(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var lh=null;function bx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return la(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function yx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Sx(t,n,a){switch(n=hu(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function jl(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Qr(t)}var ca=new Map,Ex=new Set;function pu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ss=G.d;G.d={f:Uy,r:Py,D:Fy,C:By,L:zy,m:Gy,X:ky,S:Hy,M:Vy};function Uy(){var t=Ss.f(),n=su();return t||n}function Py(t){var n=ma(t);n!==null&&n.tag===5&&n.type==="form"?Gg(n):Ss.r(t)}var Co=typeof document>"u"?null:document;function Mx(t,n,a){var o=Co;if(o&&typeof n=="string"&&n){var u=qt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Ex.has(u)||(Ex.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),hi(n,"link",t),bn(n),o.head.appendChild(n)))}}function Fy(t){Ss.D(t),Mx("dns-prefetch",t,null)}function By(t,n){Ss.C(t,n),Mx("preconnect",t,n)}function zy(t,n,a){Ss.L(t,n,a);var o=Co;if(o&&t&&n){var u='link[rel="preload"][as="'+qt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+qt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+qt(a.imageSizes)+'"]')):u+='[href="'+qt(t)+'"]';var d=u;switch(n){case"style":d=No(t);break;case"script":d=Oo(t)}ca.has(d)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ca.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Xl(d))||n==="script"&&o.querySelector(Yl(d))||(n=o.createElement("link"),hi(n,"link",t),bn(n),o.head.appendChild(n)))}}function Gy(t,n){Ss.m(t,n);var a=Co;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+qt(o)+'"][href="'+qt(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Oo(t)}if(!ca.has(d)&&(t=_({rel:"modulepreload",href:t},n),ca.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Yl(d)))return}o=a.createElement("link"),hi(o,"link",t),bn(o),a.head.appendChild(o)}}}function Hy(t,n,a){Ss.S(t,n,a);var o=Co;if(o&&t){var u=xa(o).hoistableStyles,d=No(t);n=n||"default";var b=u.get(d);if(!b){var R={loading:0,preload:null};if(b=o.querySelector(Xl(d)))R.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ca.get(d))&&ch(t,a);var z=b=o.createElement("link");bn(z),hi(z,"link",t),z._p=new Promise(function(re,xe){z.onload=re,z.onerror=xe}),z.addEventListener("load",function(){R.loading|=1}),z.addEventListener("error",function(){R.loading|=2}),R.loading|=4,mu(b,n,o)}b={type:"stylesheet",instance:b,count:1,state:R},u.set(d,b)}}}function ky(t,n){Ss.X(t,n);var a=Co;if(a&&t){var o=xa(a).hoistableScripts,u=Oo(t),d=o.get(u);d||(d=a.querySelector(Yl(u)),d||(t=_({src:t,async:!0},n),(n=ca.get(u))&&uh(t,n),d=a.createElement("script"),bn(d),hi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Vy(t,n){Ss.M(t,n);var a=Co;if(a&&t){var o=xa(a).hoistableScripts,u=Oo(t),d=o.get(u);d||(d=a.querySelector(Yl(u)),d||(t=_({src:t,async:!0,type:"module"},n),(n=ca.get(u))&&uh(t,n),d=a.createElement("script"),bn(d),hi(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Tx(t,n,a,o){var u=(u=ae.current)?pu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=No(a.href),a=xa(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=No(a.href);var d=xa(u).hoistableStyles,b=d.get(t);if(b||(u=u.ownerDocument||u,b={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,b),(d=u.querySelector(Xl(t)))&&!d._p&&(b.instance=d,b.state.loading=5),ca.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ca.set(t,a),d||jy(u,t,a,b.state))),n&&o===null)throw Error(s(528,""));return b}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Oo(a),a=xa(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function No(t){return'href="'+qt(t)+'"'}function Xl(t){return'link[rel="stylesheet"]['+t+"]"}function Ax(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function jy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),hi(n,"link",a),bn(n),t.head.appendChild(n))}function Oo(t){return'[src="'+qt(t)+'"]'}function Yl(t){return"script[async]"+t}function wx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+qt(a.href)+'"]');if(o)return n.instance=o,bn(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),bn(o),hi(o,"style",u),mu(o,a.precedence,t),n.instance=o;case"stylesheet":u=No(a.href);var d=t.querySelector(Xl(u));if(d)return n.state.loading|=4,n.instance=d,bn(d),d;o=Ax(a),(u=ca.get(u))&&ch(o,u),d=(t.ownerDocument||t).createElement("link"),bn(d);var b=d;return b._p=new Promise(function(R,z){b.onload=R,b.onerror=z}),hi(d,"link",o),n.state.loading|=4,mu(d,a.precedence,t),n.instance=d;case"script":return d=Oo(a.src),(u=t.querySelector(Yl(d)))?(n.instance=u,bn(u),u):(o=a,(u=ca.get(d))&&(o=_({},a),uh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),bn(u),hi(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,mu(o,a.precedence,t));return n.instance}function mu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,b=0;b<o.length;b++){var R=o[b];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function ch(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function uh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var gu=null;function Rx(t,n,a){if(gu===null){var o=new Map,u=gu=new Map;u.set(a,o)}else u=gu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Ja]||d[Mn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var b=d.getAttribute(n)||"";b=t+b;var R=o.get(b);R?R.push(d):o.set(b,[d])}}return o}function Cx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Xy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Nx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Yy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=No(o.href),d=n.querySelector(Xl(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=xu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,bn(d);return}d=n.ownerDocument||n,o=Ax(o),(u=ca.get(u))&&ch(o,u),d=d.createElement("link"),bn(d);var b=d;b._p=new Promise(function(R,z){b.onload=R,b.onerror=z}),hi(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=xu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var fh=0;function Wy(t,n){return t.stylesheets&&t.count===0&&vu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&vu(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&fh===0&&(fh=62500*wy());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&vu(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>fh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function xu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)vu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var _u=null;function vu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,_u=new Map,n.forEach(qy,t),_u=null,xu.call(t))}function qy(t,n){if(!(n.state.loading&4)){var a=_u.get(t);if(a)var o=a.get(null);else{a=new Map,_u.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var b=u[d];(b.nodeName==="LINK"||b.getAttribute("media")!=="not all")&&(a.set(b.dataset.precedence,b),o=b)}o&&a.set(null,o)}u=n.instance,b=u.getAttribute("data-precedence"),d=a.get(b)||o,d===o&&a.set(null,u),a.set(b,u),this.count++,o=xu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Wl={$$typeof:I,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function $y(t,n,a,o,u,d,b,R,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=b,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function Ox(t,n,a,o,u,d,b,R,z,re,xe,ve){return t=new $y(t,n,a,b,z,re,xe,ve,R),n=1,d===!0&&(n|=24),d=ki(3,null,null,n),t.current=d,d.stateNode=t,n=jf(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},qf(d),t}function Dx(t){return t?(t=oo,t):oo}function Lx(t,n,a,o,u,d){u=Dx(u),o.context===null?o.context=u:o.pendingContext=u,o=Vs(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=js(t,o,n),a!==null&&(Li(a,t,n),Tl(a,t,n))}function Ix(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function dh(t,n){Ix(t,n),(t=t.alternate)&&Ix(t,n)}function Ux(t){if(t.tag===13||t.tag===31){var n=Tr(t,67108864);n!==null&&Li(n,t,67108864),dh(t,67108864)}}function Px(t){if(t.tag===13||t.tag===31){var n=Wi();n=Za(n);var a=Tr(t,n);a!==null&&Li(a,t,n),dh(t,n)}}var bu=!0;function Ky(t,n,a,o){var u=U.T;U.T=null;var d=G.p;try{G.p=2,hh(t,n,a,o)}finally{G.p=d,U.T=u}}function Zy(t,n,a,o){var u=U.T;U.T=null;var d=G.p;try{G.p=8,hh(t,n,a,o)}finally{G.p=d,U.T=u}}function hh(t,n,a,o){if(bu){var u=ph(o);if(u===null)Jd(t,n,o,yu,a),Bx(t,o);else if(Jy(u,t,n,a,o))o.stopPropagation();else if(Bx(t,o),n&4&&-1<Qy.indexOf(t)){for(;u!==null;){var d=ma(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var b=Oe(d.pendingLanes);if(b!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;b;){var z=1<<31-ze(b);R.entanglements[1]|=z,b&=~z}Ba(d),(an&6)===0&&(iu=Ie()+500,Hl(0))}}break;case 31:case 13:R=Tr(d,2),R!==null&&Li(R,d,2),su(),dh(d,2)}if(d=ph(o),d===null&&Jd(t,n,o,yu,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else Jd(t,n,o,null,a)}}function ph(t){return t=va(t),mh(t)}var yu=null;function mh(t){if(yu=null,t=Ji(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return yu=t,null}function Fx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Sn()){case O:return 2;case T:return 8;case Q:case pe:return 32;case Ee:return 268435456;default:return 32}default:return 32}}var gh=!1,tr=null,nr=null,ir=null,ql=new Map,$l=new Map,ar=[],Qy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Bx(t,n){switch(t){case"focusin":case"focusout":tr=null;break;case"dragenter":case"dragleave":nr=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":ql.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":$l.delete(n.pointerId)}}function Kl(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=ma(n),n!==null&&Ux(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function Jy(t,n,a,o,u){switch(n){case"focusin":return tr=Kl(tr,t,n,a,o,u),!0;case"dragenter":return nr=Kl(nr,t,n,a,o,u),!0;case"mouseover":return ir=Kl(ir,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return ql.set(d,Kl(ql.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,$l.set(d,Kl($l.get(d)||null,t,n,a,o,u)),!0}return!1}function zx(t){var n=Ji(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,br(t.priority,function(){Px(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,br(t.priority,function(){Px(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Su(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=ph(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Mi=o,a.target.dispatchEvent(o),Mi=null}else return n=ma(a),n!==null&&Ux(n),t.blockedOn=a,!1;n.shift()}return!0}function Gx(t,n,a){Su(t)&&a.delete(n)}function eS(){gh=!1,tr!==null&&Su(tr)&&(tr=null),nr!==null&&Su(nr)&&(nr=null),ir!==null&&Su(ir)&&(ir=null),ql.forEach(Gx),$l.forEach(Gx)}function Eu(t,n){t.blockedOn===n&&(t.blockedOn=null,gh||(gh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,eS)))}var Mu=null;function Hx(t){Mu!==t&&(Mu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Mu===t&&(Mu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(mh(o||a)===null)continue;break}var d=ma(a);d!==null&&(t.splice(n,3),n-=3,pd(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Do(t){function n(z){return Eu(z,t)}tr!==null&&Eu(tr,t),nr!==null&&Eu(nr,t),ir!==null&&Eu(ir,t),ql.forEach(n),$l.forEach(n);for(var a=0;a<ar.length;a++){var o=ar[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ar.length&&(a=ar[0],a.blockedOn===null);)zx(a),a.blockedOn===null&&ar.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],b=u[on]||null;if(typeof d=="function")b||Hx(a);else if(b){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,b=d[on]||null)R=b.formAction;else if(mh(u)!==null)continue}else R=b.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),Hx(a)}}}function kx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(b){return u=b})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function xh(t){this._internalRoot=t}Tu.prototype.render=xh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=Wi();Lx(a,o,t,n,null,null)},Tu.prototype.unmount=xh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Lx(t.current,2,null,t,null,null),su(),n[Bi]=null}};function Tu(t){this._internalRoot=t}Tu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Ca();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ar.length&&n!==0&&n<ar[a].priority;a++);ar.splice(a,0,t),a===0&&zx(t)}};var Vx=e.version;if(Vx!=="19.2.3")throw Error(s(527,Vx,"19.2.3"));G.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var tS={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Au=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Au.isDisabled&&Au.supportsFiber)try{ue=Au.inject(tS),me=Au}catch{}}return Ql.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Kg,d=Zg,b=Qg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(b=n.onRecoverableError)),n=Ox(t,1,!1,null,null,a,o,null,u,d,b,kx),t[Bi]=n.current,Qd(t),new xh(n)},Ql.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Kg,b=Zg,R=Qg,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(b=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=Ox(t,1,!0,n,a??null,o,u,z,d,b,R,kx),n.context=Dx(null),a=n.current,o=Wi(),o=Za(o),u=Vs(o),u.callback=null,js(a,u,o),a=o,n.current.lanes=a,ut(n,a),Ba(n),t[Bi]=n.current,Qd(t),new Tu(n)},Ql.version="19.2.3",Ql}var Jx;function hS(){if(Jx)return bh.exports;Jx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),bh.exports=dS(),bh.exports}var pS=hS();const mS=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),gS=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),e_=r=>{const e=gS(r);return e.charAt(0).toUpperCase()+e.slice(1)},Uv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),xS=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var _S={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const vS=Re.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},p)=>Re.createElement("svg",{ref:p,..._S,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:Uv("lucide",l),...!c&&!xS(h)&&{"aria-hidden":"true"},...h},[...f.map(([m,v])=>Re.createElement(m,v)),...Array.isArray(c)?c:[c]]));const zn=(r,e)=>{const i=Re.forwardRef(({className:s,...l},c)=>Re.createElement(vS,{ref:c,iconNode:e,className:Uv(`lucide-${mS(e_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=e_(r),i};const bS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Jl=zn("arrow-right",bS);const yS=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],lp=zn("brain-circuit",yS);const SS=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],ES=zn("camera",SS);const MS=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Lo=zn("check",MS);const TS=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],t_=zn("chevron-down",TS);const AS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],qi=zn("circle-check",AS);const wS=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],ec=zn("copy",wS);const RS=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],n_=zn("download",RS);const CS=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],NS=zn("file-text",CS);const OS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],tc=zn("globe",OS);const DS=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],i_=zn("image",DS);const LS=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],ua=zn("loader-circle",LS);const IS=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],US=zn("log-out",IS);const PS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],FS=zn("plus",PS);const BS=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],a_=zn("refresh-cw",BS);const zS=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],s_=zn("sparkles",zS);const GS=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],HS=zn("square",GS);const kS=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Mh=zn("trash-2",kS);const VS=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],r_=zn("triangle-alert",VS);const jS=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Th=zn("wand-sparkles",jS);const XS=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Ju=zn("zap",XS);var o_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(o_||(o_={}));var l_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(l_||(l_={}));var c_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(c_||(c_={}));const u_=["user","model","function","system"];var f_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(f_||(f_={}));var d_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(d_||(d_={}));var h_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(h_||(h_={}));var p_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(p_||(p_={}));var fc;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(fc||(fc={}));var m_;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(m_||(m_={}));var g_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(g_||(g_={}));var x_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(x_||(x_={}));class yi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class Io extends yi{constructor(e,i){super(e),this.response=i}}class Pv extends yi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class gr extends yi{}class Fv extends yi{}const YS="https://generativelanguage.googleapis.com",WS="v1beta",qS="0.24.1",$S="genai-js";var qr;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(qr||(qr={}));class KS{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||WS;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||YS}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function ZS(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${$S}/${qS}`),e.join(" ")}async function QS(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",ZS(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new gr(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new gr(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new gr(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function JS(r,e,i,s,l,c){const f=new KS(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},iE(c)),{method:"POST",headers:await QS(f),body:l})}}async function xc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:p}=await JS(r,e,i,s,l,c);return eE(h,p,f)}async function eE(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){tE(l,r)}return s.ok||await nE(s,r),s}function tE(r,e){let i=r;throw i.name==="AbortError"?(i=new Fv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Pv||r instanceof gr||(i=new yi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function nE(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Pv(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function iE(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function im(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),ef(r.candidates[0]))throw new Io(`${dr(r)}`,r);return aE(r)}else if(r.promptFeedback)throw new Io(`Text not available. ${dr(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),ef(r.candidates[0]))throw new Io(`${dr(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),__(r)[0]}else if(r.promptFeedback)throw new Io(`Function call not available. ${dr(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),ef(r.candidates[0]))throw new Io(`${dr(r)}`,r);return __(r)}else if(r.promptFeedback)throw new Io(`Function call not available. ${dr(r)}`,r)},r}function aE(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function __(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const sE=[fc.RECITATION,fc.SAFETY,fc.LANGUAGE];function ef(r){return!!r.finishReason&&sE.includes(r.finishReason)}function dr(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];ef(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function dc(r){return this instanceof dc?(this.v=r,this):new dc(r)}function rE(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(y){return new Promise(function(M,C){c.push([g,y,M,C])>1||h(g,y)})})}function h(g,y){try{p(s[g](y))}catch(M){_(c[0][3],M)}}function p(g){g.value instanceof dc?Promise.resolve(g.value.v).then(m,v):_(c[0][2],g)}function m(g){h("next",g)}function v(g){h("throw",g)}function _(g,y){g(y),c.shift(),c.length&&h(c[0][0],c[0][1])}}const v_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function oE(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=uE(e),[s,l]=i.tee();return{stream:cE(s),response:lE(l)}}async function lE(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return im(fE(e));e.push(l)}}function cE(r){return rE(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield dc(i.read());if(l)break;yield yield dc(im(s))}})}function uE(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new yi("Failed to parse stream"));return}s.close();return}l+=f;let p=l.match(v_),m;for(;p;){try{m=JSON.parse(p[1])}catch{s.error(new yi(`Error parsing JSON response: "${p[1]}"`));return}s.enqueue(m),l=l.substring(p[0].length),p=l.match(v_)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new Fv("Request aborted when reading from the stream"):h=new yi("Error reading from the stream"),h})}}})}function fE(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Bv(r,e,i,s){const l=await xc(e,qr.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return oE(l)}async function zv(r,e,i,s){const c=await(await xc(e,qr.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:im(c)}}function Gv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function hc(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return dE(e)}function dE(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new yi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new yi("No content is provided for sending chat message.");return s?e:i}function hE(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new gr("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=hc(r);s.contents=[c]}return{generateContentRequest:s}}function b_(r){let e;return r.contents?e=r:e={contents:[hc(r)]},r.systemInstruction&&(e.systemInstruction=Gv(r.systemInstruction)),e}function pE(r){return typeof r=="string"||Array.isArray(r)?{content:hc(r)}:r}const y_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],mE={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function gE(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new yi(`First content should be with role 'user', got ${s}`);if(!u_.includes(s))throw new yi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(u_)}`);if(!Array.isArray(l))throw new yi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new yi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const p of y_)p in h&&(c[p]+=1);const f=mE[s];for(const h of y_)if(!f.includes(h)&&c[h]>0)throw new yi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function S_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const E_="SILENT_ERROR";class xE{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(gE(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,p;await this._sendPromise;const m=hc(e),v={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(p=this.params)===null||p===void 0?void 0:p.cachedContent,contents:[...this._history,m]},_=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>zv(this._apiKey,this.model,v,_)).then(y=>{var M;if(S_(y.response)){this._history.push(m);const C=Object.assign({parts:[],role:"model"},(M=y.response.candidates)===null||M===void 0?void 0:M[0].content);this._history.push(C)}else{const C=dr(y.response);C&&console.warn(`sendMessage() was unsuccessful. ${C}. Inspect response object for details.`)}g=y}).catch(y=>{throw this._sendPromise=Promise.resolve(),y}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,p;await this._sendPromise;const m=hc(e),v={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(p=this.params)===null||p===void 0?void 0:p.cachedContent,contents:[...this._history,m]},_=Object.assign(Object.assign({},this._requestOptions),i),g=Bv(this._apiKey,this.model,v,_);return this._sendPromise=this._sendPromise.then(()=>g).catch(y=>{throw new Error(E_)}).then(y=>y.response).then(y=>{if(S_(y)){this._history.push(m);const M=Object.assign({},y.candidates[0].content);M.role||(M.role="model"),this._history.push(M)}else{const M=dr(y);M&&console.warn(`sendMessageStream() was unsuccessful. ${M}. Inspect response object for details.`)}}).catch(y=>{y.message!==E_&&console.error(y)}),g}}async function _E(r,e,i,s){return(await xc(e,qr.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function vE(r,e,i,s){return(await xc(e,qr.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function bE(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await xc(e,qr.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class M_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Gv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=b_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return zv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=b_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Bv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new xE(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=hE(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return _E(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=pE(e),l=Object.assign(Object.assign({},this._requestOptions),i);return vE(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return bE(this.apiKey,this.model,e,s)}}class yE{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new yi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new M_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new gr("Cached content must contain a `name` field.");if(!e.model)throw new gr("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,p=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===p)continue}throw new gr(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new M_(this.apiKey,c,s)}}const Hv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",SE=["gemini-3.5-flash","gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],EE=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3.5-flash","gemini-3-flash-preview","gemini-2.5-flash-lite"];let tl="";const tf=r=>{tl=r},am=()=>tl,kv=async()=>{if(!tl)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Hv}/v1beta/models?key=${tl}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Vv=async(r,e=null,i=null,s)=>{if(!tl)throw new Error("API Key is initialized.");const l=new yE(tl),c=e&&e.length>0?EE:SE;let f=0;for(const m of c){f++;try{console.log(`[Gemini] Attempting connection with ${m} (v1beta)...`),s&&(f===1?s(`> [API] ${m} と交信を開始しました...`):(s(`> [API] 代替モデル ${m} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let v=[];i&&v.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&v.push(...e),v.push({text:r});const _={model:m},g=l.getGenerativeModel(_,{apiVersion:"v1beta",baseUrl:Hv}),y=new Promise((D,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${m} (60s limit)`)),6e4)),M=e&&e.length>0?[]:[{googleSearch:{}}];let C;try{C=await Promise.race([g.generateContent({contents:[{role:"user",parts:v}],tools:M,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),y])}catch(D){if(M.length>0)console.warn(`[API] Grounding failed for ${m} (${D.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),C=await g.generateContent({contents:[{role:"user",parts:v}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw D}const E=C.response,S=E.candidates||[];if(!S.length)throw E.promptFeedback&&(console.warn("Prompt Feedback:",E.promptFeedback),E.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${E.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=S[0];let I="";try{I=E.text()}catch(D){console.warn(D)}const L=N.content?.parts||[];let V="";if(L.forEach(D=>{D.thought&&(V+=D.thought)}),!I){const D=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${D}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${D})`),new Error(`Empty response (FinishReason: ${D}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:I,thought:V||"通常処理が完了しました。",model:m}}catch(v){console.warn(`Model ${m} failed:`,v.message),v.message.includes("429")||v.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!v.message.includes("フィルター検知")&&!v.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${v.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await kv();console.error("DIAGNOSIS RESULT:",h);let p=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?p=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?p="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(p="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(p)},ME=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Vv,diagnoseConnection:kv,getApiKey:am,setApiKey:tf},Symbol.toStringTag,{value:"Module"})),TE="modulepreload",AE=function(r,e){return new URL(r,e).href},T_={},wE=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let m=function(v){return Promise.all(v.map(_=>Promise.resolve(_).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),p=h?.nonce||h?.getAttribute("nonce");l=m(i.map(v=>{if(v=AE(v,s),v in T_)return;T_[v]=!0;const _=v.endsWith(".css"),g=_?'[rel="stylesheet"]':"";if(s)for(let M=f.length-1;M>=0;M--){const C=f[M];if(C.href===v&&(!_||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${v}"]${g}`))return;const y=document.createElement("link");if(y.rel=_?"stylesheet":TE,_||(y.as="script"),y.crossOrigin="",y.href=v,p&&y.setAttribute("nonce",p),document.head.appendChild(y),_)return new Promise((M,C)=>{y.addEventListener("load",M),y.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${v}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},RE=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],CE=async(r,e,i=[])=>{const s=am();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of RE)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,p=setTimeout(()=>h.abort(),12e4);let m,v;if(f.startsWith("gemini")){const _=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(y=>{const M=y.includes(",")?y.split(",")[1]:y,C=y.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:C?C[1]:"image/png",data:M}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),m=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:_}}),signal:h.signal}),clearTimeout(p),v=await m.json(),v.error)throw new Error(`${v.error.message} (Code: ${v.error.code})`);if(v.candidates&&v.candidates.length>0&&v.candidates[0].content&&v.candidates[0].content.parts){const y=v.candidates[0].content.parts.find(M=>M.inlineData);if(y&&y.inlineData&&y.inlineData.data)return{base64Img:y.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(m=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(p),v=await m.json(),v.error)throw new Error(`${v.error.message} (Code: ${v.error.code})`);if(v.predictions&&v.predictions[0]&&v.predictions[0].bytesBase64Encoded)return{base64Img:v.predictions[0].bytesBase64Encoded,usedModel:f};if(v.predictions&&v.predictions[0]&&typeof v.predictions[0]=="string")return{base64Img:v.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let p=h.message;(h.name==="AbortError"||p.includes("aborted"))&&(p="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,p),l=new Error(p),e&&e(`[FAILED] ${f}: ${p}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await wE(async()=>{const{diagnoseConnection:m}=await Promise.resolve().then(()=>ME);return{diagnoseConnection:m}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let p=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?p="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?p="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(p="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(p)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let jv="";const Ah=r=>{jv=r},ff=()=>jv,NE=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=ff();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},OE=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],DE=["gpt-4.1","gpt-4o","gpt-4.1-mini"],LE=async(r,e=null,i=null,s)=>{const l=ff();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?DE:OE;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const p=[];i&&p.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const m=[];if(e&&Array.isArray(e)&&e.length>0)for(const E of e)E.inlineData&&(m.push({type:"image_url",image_url:{url:`data:${E.inlineData.mimeType};base64,${E.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));m.push({type:"text",text:r}),p.push({role:"user",content:m.length===1?r:m});const v=new AbortController,_=setTimeout(()=>v.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:p,temperature:.7,max_tokens:8192}),signal:v.signal})}catch(E){throw E.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):E}finally{clearTimeout(_)}if(!g.ok){const S=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${S}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const M=(await g.json()).choices?.[0];if(!M||!M.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const C=M.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:C,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(p){console.warn(`Model ${h} failed:`,p.message),p.message.includes("429")||p.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):p.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${p.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let cp="gemini";const wh=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),cp="gemini";return}cp=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},Br=async(r,e=null,i=null,s)=>cp==="openai"?LE(r,e,i,s):Vv(r,e,i,s),IE={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},UE={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},PE=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],FE=r=>{const e=UE[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...PE].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},BE=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(IE)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r},Vr="v3.79-alpha",Xv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},zE=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],GE=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,Fi={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Fi.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"};Fi.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"};Fi.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"};Fi.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"};Fi.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"};Fi.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"};Fi.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"};Fi.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"};Fi.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"};Fi.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"};Fi.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"};Fi.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const HE=["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"],kE={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},VE=`
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
    `,jE=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`,Rh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},XE=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},YE=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},WE=(r,e,i,s,l=640,c=480)=>new Promise((f,h)=>{const p=new Image;p.onload=()=>{try{const m=document.createElement("canvas");m.width=l,m.height=c;const v=m.getContext("2d"),_=p.width,g=p.height,M=(e%360+360)%360/360*_,C=s/360*_,E=g/2-i/180*g,S=C*(c/l),N=M-C/2,I=Math.max(0,Math.min(g-S,E-S/2)),L=Math.min(S,g);if(N>=0&&N+C<=_)v.drawImage(p,N,I,C,L,0,0,l,c);else if(N<0){const V=-N,D=C-V,B=D/C;v.drawImage(p,_-V,I,V,L,0,0,l*(1-B),c),v.drawImage(p,0,I,D,L,l*(1-B),0,l*B,c)}else{const V=_-N,D=C-V,B=V/C;v.drawImage(p,N,I,V,L,0,0,l*B,c),v.drawImage(p,0,I,D,L,l*B,0,l*(1-B),c)}f(m.toDataURL("image/jpeg",.85))}catch(m){h(m)}},p.onerror=()=>h(new Error("画像の読み込みに失敗しました")),p.src=r}),qE=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,$E=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},KE=()=>`
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
      `,ZE=(r,e)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

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

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`,QE=({randomCategory:r,targetDate:e,inputMode:i,manualTopic:s,newsContext:l,searchTopicKeywords:c,bg360Image:f,bg360Analysis:h,bg360Enabled:p,customLocation:m,forcedLocation:v,customOutfit:_,ragLocationDetails:g,ragReactions:y,punchlineType:M})=>`
         【Context Force Reboot】
         Ignore all previous instructions and conversation history. This is a fresh, standalone session.
         (ABSOLUTE PROHIBITION: Repeating topics from the past. You MUST select a FRESH, UNIQUE topic).
         (Topic Lock): Focus strictly on the category: "${r}".
         (Time Machine Lock): The target date is **${e}**. You MUST search for news/events that happened AROUND this date.
         (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

         あなたはプロの風刺漫画脚本家です。
         
         ${i==="manual"?`「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。
 トピック: ${s}

${l}`:`「${c}」に関する、** 指定された日付（${e}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`}

         【選定ルールの絶対厳守】

         1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
         2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
            （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
         3. 抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
         4. **【場所（Location）の選定義務】**:
            - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
            - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
        
        ${f&&h&&p?`
        4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
            - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
            - AI解析結果: 場所=「${h.location}」、光源=「${h.lighting}」、特徴物=「${h.objects||"なし"}」、雰囲気=「${h.mood||"不明"}」
            - **【カメラワーク・フロアプラン制約】**:
              * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
              * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
            - **【ライティング整合性】**:
              * 各コマ of キャラクター描写において、光源方向「${h.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
            - **【背景の部分使用の許可】**:
              * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
              * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
        `:""}
        4. **【強制舞台指定 (Location Lock)】**:
           - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
           - **指定場所: 「${f&&h&&p?h.location:m.trim()?m.trim():"ニュース内容に即した場所"}」**
           - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
           ${_.trim()?`
        5. **【強制服装指定 (Outfit Lock)】**:
           - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${_.trim()}』に変更して描写・行動させよ。
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
            
            ${g}
            
            ${y}

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
              - **禁止**: セリフ内に「(怒って)」「(笑いながら)」等のト書き・感情描写を入れるな。絵で表現せよ.
               - **句読点・表現ルール**: セリフの末尾は必ず終止記号で締めよ。どの記号を使うかはセリフの感情・キャラの性格・場面の空気で自然に決めること。
                 終止記号（単読で文末になれる）: 。/ ！/ ？/ ♪/ ♡/ っ/ ！？
                 修飾記号（単独では文末にならない。必ず後ろに終止記号を添えよ）: ……→「……。」「……！」「……？」 / 〜→「〜！」「〜。」 / ー→「ー。」「ー！」
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
               * **4コマ目 = オチ**: ズレを確定させて笑いを完成。**すべての笑いのエネルギーをここに集中投下せよ**
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
             - ${M==="Auto"?`**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
                * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
                * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: BLANK）
                * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
                * **メタ崩壊型**: 漫画 of 枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: BLANK, IMPACT）
                * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
                * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
                * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: BLANK）
                * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
                * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: BLANK, CHIBI_GAG）
                * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: BLANK, IMPACT）`:M==="Surreal"?"**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: BLANK":M==="Explosion"?"**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG":M==="FakeEmotion"?"**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。":M==="Metafiction"?"**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。":M==="Unreasonable"?"**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。":M==="RunningGag"?"**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。":M==="Dream"?"**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: BLANK":M==="PsychoHorror"?"**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME":M==="Misunderstanding"?"**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: BLANK, CHIBI_GAG":M==="CanceledEnding"?"**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: BLANK, IMPACT":M==="Documentary"?`**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
                このモードでは、入力された元ネタ（ニュース記事・URL記事・手動入力テキスト）の**事実・内容をそのまま忠実に**4コマ漫画のシナリオに変換する。
                **【1〜3コマ目の厳格ルール】**:
                - 元ネタの情報を「たとえ話」「置換（別の文脈への言い換え）」「誇張」「不条理な設定変更」に変換することを**完全に禁止**する。
                - 元記事の事実・出来事・人物・状況を、登場キャラクターの掛け合い（会話・リアクション）としてそのまま再構成せよ。
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
                * **説明ゼリフ禁止**: 「〇〇が××してしまったぞ！」のように状況をそのまま口で説明するな。状況は絵（ト書き）で見せ、セリフは感情やツッコミに全振りせよ。

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
              - 代わりに, **そのコマの舞台（Location）や状況に由来する素材**から比喩を構築せよ。
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
          Location: [${m.trim()?"必ず『"+m.trim()+"』にせよ":"ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
          Outfit: [${_.trim()?"必ず『"+_.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
          Punchline: [${M!=="Auto"?"必ず『"+Xv(M)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
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
          - (禁止事項): AIが勝ために架空のオリジナルキャラクターを独自に創作して出演させることは禁止する。指定されたCastListのキャラクターのみをメインキャストとして扱うこと。
          - (許可事項): ニュースの当事者（スポーツ選手、政治家、怪人、動物、虫など）や名もなきモブキャラは、物語を面白くするために必要であれば自由に登場・発言させて構わない。
          - (ハルシネーション防止): ゲストを登場させる場合でも、画像生成時のVisual Actionに「意味不明な文字」や「描画不可能な複雑すぎる行動」が混入しないよう、シンプルで視覚的にわかりやすい行動に留めること。
          - 構成: 起承転結（4段）。
          - 内容: ニュースに対する辛辣な風刺や、キャラの個性を活かしたドタバタ劇。
          - 文体: 各コマの「状況」「セリフ」が明確にわかる文章。

          ⚠️【最終確認・絶対厳守】⚠️
          全てのセリフの末尾に必ず「。」や「！」等の終止記号がついているか出力前に確認せよ。
          「…」や「～」など、終止記号なしで終わるセリフはシステムエラーとなるため完全禁止とする。
          `,JE=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。


以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${r.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${e}

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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,eM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
${r.trim()}

【修正対象のプロンプト】:
${e}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,tM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:p,enableChatGPTMode:m,VAR_CAST_LIST_CHATGPT:v,identityMatrix:_,activeOutfit:g,panelSections:y}=r,M=c&&f&&h?p&&p.length===4&&!m?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${f.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${f.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`:"",C=g?`- IGNORE reference clothing. All characters MUST wear exactly: ${g}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels.";return`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${e}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads "${i}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font.
- Draw tiny Japanese watermark text that reads "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor" positioned at the bottom-left corner of the 4th panel.
- Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.
- Exactly 4 EQUAL horizontal panels, stacked vertically with thick white gutters between them. Panels MUST NOT touch.

ART STYLE:
- High-budget TV anime production quality. Pristine clean cel-shading with smooth gradient shadows and rich saturated color palette.
- Cinematic color grading with smooth light diffusion and gentle rim lighting on character edges.
- Foreground characters have bold ink outlines with varied line weight. Add a subtle white glow outside the character's outline to prevent blending with the background.
- Backgrounds should have slightly lower saturation and softer focus (shallow depth of field) to make characters pop.
- NOISE REDUCTION: Strictly avoid intricate micro-textures, grainy noise, rough surfaces, excessive gloss, random sparkling, or muddy overlays. Keep character surfaces incredibly smooth and clean, while maintaining dramatic cel-shading. Prioritize readable silhouettes and bold outlines over excessive micro-details.
- ${s}
- Setting: ${l}
${M}

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
${C}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${v}
- Identity Anchor: ${_}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. Preserve exact hair color, eye color, and skin tone in every panel.

PANEL DESCRIPTIONS:

${y}

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
`},nM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:p,VAR_CAST_LIST:m,identityMatrix:v,activeOutfit:_,dynamicCamera:g,panelSections:y}=r,M=c&&f&&h?p&&p.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${f.lighting}), objects (${f.objects||"various"}), and mood (${f.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${f.lighting}), spatial layout, objects (${f.objects||"various"}), and mood (${f.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:"",C=_?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:"",E=_?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${_}. Apply tags directly.`:"";return`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${e}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${i}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor".
Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${s}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${l}.
${M}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${C}
Cast:
${m}
${E}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${v}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.

Camera & Comp:
${g}
ANTI-CLONING: NEVER draw the same character twice in a single panel.
COMPOSITION: Strict 2:3 golden ratio inside each panel.

Tech Dict:
(clean anime illustration background: 2.5)
(Meticulous clean line art, smooth cel shading: 2.5)
(Soft diffused backlight, rim light: 2.4)
(Cinematic depth of field, soft bokeh: 2.3)
(NO text/SFX outside speech bubbles: 2.8)
(NO ENGLISH TEXT outside watermark. NO 'G-pen'/'HA': 3.0)


${y}

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
      `},up=r=>{const e=[];let i=null;if(r.split(`
`).forEach(l=>{const c=l.replace(/\*\*/g,"").trim();if(c.startsWith("## ")){i&&e.push(i);const _=c.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();i={name:_,shortName:_.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!i)return;if(c.includes("髪")||c.toLowerCase().includes("hair")){const _=c.match(/\[WEIGHTS?\]:\s*(.*)/i),g=_?_[1].replace(/\|/g,""):c,y=g.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);y&&!i.hairColor&&(i.hairColor=y[1]);const M=g.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),C=g.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);i.hairStyle||(M?i.hairStyle=M[1]:C&&(i.hairStyle=C[1]))}const f=c.toLowerCase(),h=/\(no[\s_-]*glasses/i.test(f),p=/\([^)]*glasses[\s:]/i.test(f)&&!h;i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES"||(h?i.glasses="LOCKED_NO":p&&(i.glasses="LOCKED_YES")),!(i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES")&&(c.includes("眼鏡")||c.includes("メガネ")||f.includes("eyewear"))&&(f.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(c)?i.glasses="NO":(/(?:あり|有り|有|着用)/i.test(c)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(f))&&(i.glasses="YES"))}),i&&e.push(i),console.log("[IDENTITY MATRIX] Glasses detection results:"),e.forEach(l=>{console.log(`  ${l.shortName}: glasses=${l.glasses}, hair=${l.hairColor} ${l.hairStyle}`)}),e.length===0)return"";let s=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return s+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,e.forEach(l=>{const c=[];l.hairColor&&c.push(`${l.hairColor} hair`),l.hairStyle&&c.push(l.hairStyle),l.glasses==="YES"||l.glasses==="LOCKED_YES"?c.push("MUST HAVE glasses (do NOT remove)"):l.glasses==="NO"||l.glasses==="LOCKED_NO"?c.push("MUST NOT have glasses (bare eyes)"):c.push("check reference image for glasses status"),s+=`- [${l.shortName}]: ${c.join(", ")||"see reference image"}
`}),s+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,s+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,s},Uo=(r,e)=>{const s=up(e).split(`
`).find(l=>l.includes(`[${r}]`));return s?s.split(":").slice(1).join(":").trim():""},iM=(r,e,i)=>{const s=r.match(/\[Camera:\s*(.*?)\]/i);if(s&&s[1]){const c=s[1].trim();let f="";for(const[h,p]of Object.entries(kE))if(c.includes(h)){f=p;break}return f?`${f}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const l=e[i.index%e.length];return i.index++,l},aM=r=>r.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),sM=(r,e)=>{const i=r.match(/\[Camera:\s*(.*?)\]/i);if(i&&i[1])return i[1].trim();const s=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return s[e.index%s.length]},A_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const p=h[1].trim();s.push(p);const m=p.split(/[\(]/)[0].trim();m&&m!==p&&s.push(m);const v=p.match(/[\(]\s*(.*?)\s*[\)]/);v&&s.push(v[1].trim())}});const l=[];let c=1;if(i.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);let p=!1,m=f;if(h&&h[1].trim()){let _=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const g=/[がをにでへはもとからまでより]/.test(_)&&_.length>5,y=_.length>20,M=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(_),C=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(_),E=/[（(]\s*リアクション/i.test(h[1]);g||y||M||C||E||(s.some(S=>{const N=S.split(/[（(]/)[0].trim();return _===S||_===N||N===_||_.includes(N)})||_.includes("全員")||_==="Speaker"||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&(p=!0)}else if(f.trim().startsWith("「")){const v=f.trim();/^「[^」]+」[？！。、!?\s]*$/.test(v)&&(p=!0)}p&&(m=m.replace(/^.*?(?:[:：]|「)\s*/,""),m=m.trim(),m=m.replace(/^「+/,"").replace(/」+$/,""),m=m.replace(/（.*?）|\(.*?\)/g,""),m=m.trim(),m&&(l.push(`(Speech Bubble ${c}: "${m}")`),c++))}),l.length===0){const f=r.match(/「([^」]+)」/g);f&&f.length>0&&f.forEach(h=>{let p=h.replace(/^「/,"").replace(/」$/,"").trim();p=p.replace(/（.*?）|\(.*?\)/g,"").trim();const m=s.filter(g=>{const y=g.split(/[\(（]/)[0].trim();return y&&p.includes(y)}),v=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(p),_=m.length>=2&&v&&p.length>15;p&&!_&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++)})}return l.length===0?"(Characters interact without dialogue in this panel)":l.join(", ")},w_=(r,e,i="")=>{const s=r.split(`
`),l=[];e.split(`
`).forEach(h=>{const p=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(p){const m=p[1].trim();l.push(m);const v=m.split(/[\(]/)[0].trim();v&&v!==m&&l.push(v);const _=m.match(/[\(]\s*(.*?)\s*[\)]/);_&&l.push(_[1].trim())}});let f=s.filter(h=>{const p=h.match(/^(.*?)(?:[:：]|「)/);let m=!1;if(p&&p[1].trim()){let g=p[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();g=g.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const y=/[がをにでへはもとからまでより]/.test(g)&&g.length>5,M=g.length>12,C=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(g),E=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(g.replace(/[（(].*$/,"").trim()),S=/[（(]\s*リアクション/i.test(p[1]);y||M||C||E||S||(l.some(N=>g.includes(N)||N.includes(g))||g==="全員"||g==="Speaker"||p[0].trim().endsWith(":")||p[0].trim().endsWith("："))&&(m=!0)}else if(h.trim().startsWith("「")){const g=h.trim();/^「[^」]+」[？！。、!?\s]*$/.test(g)&&(m=!0)}const v=h.match(/^\[\d+コマ目/),_=h.trim()==="";return!m&&!v&&!_}).join(" ").trim();return f=f.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),f=f.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),f=f||"Characters interacting dynamically based on dialogue.",i&&l.forEach(h=>{const p=h.split("(")[0].trim();i.includes(p)}),f},R_=(r,e)=>e?`(All characters are wearing ${e}) ${r}`:r,wu=(r,e)=>{const s=r.split(`
`).filter(f=>{const h=f.trim();return/^\[EMOTION:/i.test(h)||/^状況[：:]/i.test(h)?!1:h.includes("：")||h.includes(":")||h.includes("「")}),l=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const p=h[1].trim();l.push(p);const m=p.split(/[（(]/)[0].trim();m&&m!==p&&l.push(m)}});const c=[];if(s.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){let p=h[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const m=/[がをにでへはもとからまでより]/.test(p)&&p.length>5,v=p.length>12,_=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(p),g=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(p.replace(/[（(].*$/,"").trim()),y=/[（(]\s*リアクション/i.test(h[1]);if(m||v||_||g||y)return;p&&!c.includes(p)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(p)&&(l.some(M=>{const C=M.split(/[（(]/)[0].trim();return p===M||p===C||C===p})||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&c.push(p)}}),c.length>=3){const f=Uo(c[0],e),h=Uo(c[1],e),p=Uo(c[2],e);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${c[0]}] (${f||"see reference"}) — First speaker
- CENTER ZONE: [${c[1]}] (${h||"see reference"}) — Second speaker
- LEFT ZONE: [${c[2]}] (${p||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${c[0]}] MUST be on the RIGHT third of the panel.
- [${c[1]}] MUST be in the CENTER of the panel.
- [${c[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${c[0]}]'s bubble on the RIGHT, [${c[1]}]'s in CENTER, [${c[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(c.length>=2){const f=Uo(c[0],e),h=Uo(c[1],e);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${c[0]}] (${f||"see reference"})
- LEFT side: [${c[1]}] (${h||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${f||c[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${h||c[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${c[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${c[0]}]'s head.
- [${c[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${c[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(c.length===1){const f=Uo(c[0],e);return`CRITICAL PLACEMENT & IDENTITY: [${c[0]}] (${f||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},C_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(_=>{const g=_.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(g){const M=g[1].trim().split("(")[0].trim().split("（")[0].trim();M&&s.push(M)}});const l=[];i.forEach(_=>{const g=_.match(/^(.*?)(?:[:：]|「)/);if(g&&g[1].trim()){let y=g[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();y&&!l.includes(y)&&s.includes(y)&&l.push(y)}});const c=[...l],f=r;s.forEach(_=>{!c.includes(_)&&f.includes(_)&&c.push(_)});let h=0;i.forEach(_=>{const g=_.trim();(g.includes("「")&&g.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(g))&&h++});const p=l.slice(0,3).map(_=>`[${_}]`),m=s.filter(_=>!c.includes(_));m.length>0&&m.forEach(_=>{c.includes(_)||c.push(_)});const v=c.map(_=>`[${_}]`);if(p.length>0){let _=`ANTI-CLONE REMINDER: ${v.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;c.length===1&&h<=1?_+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${v[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${v[0]}. Leave the surrounding space empty rather than adding people.`:c.length===1&&h>=2&&(_+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${v[0]} (monologue/soliloquy). Draw only ${v[0]} — do NOT add a second character just because there are multiple bubbles.`);const g=p.join(" and "),y=v.filter(E=>!p.includes(E)),M=y.length>0?y.join(", "):"NO ONE ELSE",C=`
FOREGROUND MUST CONTAIN ONLY: ${g}.
BACKGROUND MUST CONTAIN ONLY: ${M}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${c.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${g} are the main focus.
${_}${C}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."},rM=r=>{const e=r.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(e){const i=e[1].toUpperCase();if(Fi[i])return i}return"NORMAL"},N_=r=>{const e=rM(r);if(e==="NORMAL")return"";const i=Fi[e],s=[];if(r.split(`
`).forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){const p=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();p&&!s.includes(p)&&s.push(p)}}),s.length>=2&&i.styleMulti){let f=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.styleMulti}`;return i.proportionsMulti&&(f+=`
PROPORTION OVERRIDE: ${i.proportionsMulti}`),i.vfxMulti&&(f+=`
VFX: ${i.vfxMulti}`),f}let c=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.style}`;return i.proportions&&(c+=`
PROPORTION OVERRIDE: ${i.proportions}`),i.vfx&&(c+=`
VFX: ${i.vfx}`),c},oM=(r,e)=>{let i="",s="";const l=r.split(`
`);for(let c=0;c<l.length;c++){const f=l[c].replace(/\*\*/g,"").trim();if(f.startsWith("## ")&&(s=f.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),i+=`
- Character [${s}]: `),!s||e&&(f.includes("服装")||f.includes("Outfit")))continue;const h=f.match(/\[WEIGHTS?\]:\s*(.*)/i);if(h){let m=h[1].replace(/\|/g,"").trim();m&&m!=="()"&&m!=="-"&&(i+=m+", ");continue}const p=f.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);p&&p.length>=2&&(i+=p.join(", ")+", ")}return i.trim()||(i=r.trim()),i.trim()},Ru=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=Re.useRef(null);Re.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:x.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[x.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),x.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[x.jsx(lp,{size:16})," Neural Process (Thinking Mode)"]}),x.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&x.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};const sm="184",Qo={ROTATE:0,DOLLY:1,PAN:2},Zo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lM=0,O_=1,cM=2,nf=1,uM=2,cc=3,xr=0,Pi=1,Rs=2,Ns=0,Jo=1,D_=2,L_=3,I_=4,fM=5,jr=100,dM=101,hM=102,pM=103,mM=104,gM=200,xM=201,_M=202,vM=203,fp=204,dp=205,bM=206,yM=207,SM=208,EM=209,MM=210,TM=211,AM=212,wM=213,RM=214,hp=0,pp=1,mp=2,nl=3,gp=4,xp=5,_p=6,vp=7,Yv=0,CM=1,NM=2,ja=0,Wv=1,qv=2,$v=3,Kv=4,Zv=5,Qv=6,Jv=7,eb=300,$r=301,il=302,af=303,Ch=304,_f=306,bp=1e3,Cs=1001,yp=1002,pi=1003,OM=1004,Cu=1005,Si=1006,Nh=1007,Yr=1008,ha=1009,tb=1010,nb=1011,pc=1012,rm=1013,Wa=1014,ka=1015,Ds=1016,om=1017,lm=1018,mc=1020,ib=35902,ab=35899,sb=1021,rb=1022,Ra=1023,Ls=1026,Wr=1027,ob=1028,cm=1029,Kr=1030,um=1031,fm=1033,sf=33776,rf=33777,of=33778,lf=33779,Sp=35840,Ep=35841,Mp=35842,Tp=35843,Ap=36196,wp=37492,Rp=37496,Cp=37488,Np=37489,df=37490,Op=37491,Dp=37808,Lp=37809,Ip=37810,Up=37811,Pp=37812,Fp=37813,Bp=37814,zp=37815,Gp=37816,Hp=37817,kp=37818,Vp=37819,jp=37820,Xp=37821,Yp=36492,Wp=36494,qp=36495,$p=36283,Kp=36284,hf=36285,Zp=36286,DM=3200,U_=0,LM=1,pr="",Zi="srgb",pf="srgb-linear",mf="linear",un="srgb",Po=7680,P_=519,IM=512,UM=513,PM=514,dm=515,FM=516,BM=517,hm=518,zM=519,F_=35044,B_="300 es",Va=2e3,gf=2001;function GM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function gc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function HM(){const r=gc("canvas");return r.style.display="block",r}const z_={};function G_(...r){const e="THREE."+r.shift();console.log(e,...r)}function lb(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function gt(...r){r=lb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function $t(...r){r=lb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function Qp(...r){const e=r.join(" ");e in z_||(z_[e]=!0,gt(...r))}function kM(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const VM={[hp]:pp,[mp]:_p,[gp]:vp,[nl]:xp,[pp]:hp,[_p]:mp,[vp]:gp,[xp]:nl};class vr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const vi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cf=Math.PI/180,Jp=180/Math.PI;function _c(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(vi[r&255]+vi[r>>8&255]+vi[r>>16&255]+vi[r>>24&255]+"-"+vi[e&255]+vi[e>>8&255]+"-"+vi[e>>16&15|64]+vi[e>>24&255]+"-"+vi[i&63|128]+vi[i>>8&255]+"-"+vi[i>>16&255]+vi[i>>24&255]+vi[s&255]+vi[s>>8&255]+vi[s>>16&255]+vi[s>>24&255]).toLowerCase()}function zt(r,e,i){return Math.max(e,Math.min(i,r))}function jM(r,e){return(r%e+e)%e}function Oh(r,e,i){return(1-i)*r+i*e}function nc(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ii(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const XM={DEG2RAD:cf},bm=class bm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=zt(this.x,e.x,i.x),this.y=zt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=zt(this.x,e,i),this.y=zt(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(zt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(zt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};bm.prototype.isVector2=!0;let Ot=bm;class _r{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let p=s[l+0],m=s[l+1],v=s[l+2],_=s[l+3],g=c[f+0],y=c[f+1],M=c[f+2],C=c[f+3];if(_!==C||p!==g||m!==y||v!==M){let E=p*g+m*y+v*M+_*C;E<0&&(g=-g,y=-y,M=-M,C=-C,E=-E);let S=1-h;if(E<.9995){const N=Math.acos(E),I=Math.sin(N);S=Math.sin(S*N)/I,h=Math.sin(h*N)/I,p=p*S+g*h,m=m*S+y*h,v=v*S+M*h,_=_*S+C*h}else{p=p*S+g*h,m=m*S+y*h,v=v*S+M*h,_=_*S+C*h;const N=1/Math.sqrt(p*p+m*m+v*v+_*_);p*=N,m*=N,v*=N,_*=N}}e[i]=p,e[i+1]=m,e[i+2]=v,e[i+3]=_}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],p=s[l+1],m=s[l+2],v=s[l+3],_=c[f],g=c[f+1],y=c[f+2],M=c[f+3];return e[i]=h*M+v*_+p*y-m*g,e[i+1]=p*M+v*g+m*_-h*y,e[i+2]=m*M+v*y+h*g-p*_,e[i+3]=v*M-h*_-p*g-m*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,p=Math.sin,m=h(s/2),v=h(l/2),_=h(c/2),g=p(s/2),y=p(l/2),M=p(c/2);switch(f){case"XYZ":this._x=g*v*_+m*y*M,this._y=m*y*_-g*v*M,this._z=m*v*M+g*y*_,this._w=m*v*_-g*y*M;break;case"YXZ":this._x=g*v*_+m*y*M,this._y=m*y*_-g*v*M,this._z=m*v*M-g*y*_,this._w=m*v*_+g*y*M;break;case"ZXY":this._x=g*v*_-m*y*M,this._y=m*y*_+g*v*M,this._z=m*v*M+g*y*_,this._w=m*v*_-g*y*M;break;case"ZYX":this._x=g*v*_-m*y*M,this._y=m*y*_+g*v*M,this._z=m*v*M-g*y*_,this._w=m*v*_+g*y*M;break;case"YZX":this._x=g*v*_+m*y*M,this._y=m*y*_+g*v*M,this._z=m*v*M-g*y*_,this._w=m*v*_-g*y*M;break;case"XZY":this._x=g*v*_-m*y*M,this._y=m*y*_-g*v*M,this._z=m*v*M+g*y*_,this._w=m*v*_+g*y*M;break;default:gt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],p=i[9],m=i[2],v=i[6],_=i[10],g=s+h+_;if(g>0){const y=.5/Math.sqrt(g+1);this._w=.25/y,this._x=(v-p)*y,this._y=(c-m)*y,this._z=(f-l)*y}else if(s>h&&s>_){const y=2*Math.sqrt(1+s-h-_);this._w=(v-p)/y,this._x=.25*y,this._y=(l+f)/y,this._z=(c+m)/y}else if(h>_){const y=2*Math.sqrt(1+h-s-_);this._w=(c-m)/y,this._x=(l+f)/y,this._y=.25*y,this._z=(p+v)/y}else{const y=2*Math.sqrt(1+_-s-h);this._w=(f-l)/y,this._x=(c+m)/y,this._y=(p+v)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,p=i._y,m=i._z,v=i._w;return this._x=s*v+f*h+l*m-c*p,this._y=l*v+f*p+c*h-s*m,this._z=c*v+f*m+s*p-l*h,this._w=f*v-s*h-l*p-c*m,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let p=1-i;if(h<.9995){const m=Math.acos(h),v=Math.sin(m);p=Math.sin(p*m)/v,i=Math.sin(i*m)/v,this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+c*i,this._w=this._w*p+f*i,this._onChangeCallback()}else this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+c*i,this._w=this._w*p+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ym=class ym{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(H_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(H_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,p=e.w,m=2*(f*l-h*s),v=2*(h*i-c*l),_=2*(c*s-f*i);return this.x=i+p*m+f*_-h*v,this.y=s+p*v+h*m-c*_,this.z=l+p*_+c*v-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=zt(this.x,e.x,i.x),this.y=zt(this.y,e.y,i.y),this.z=zt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=zt(this.x,e,i),this.y=zt(this.y,e,i),this.z=zt(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(zt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,p=i.z;return this.x=l*p-c*h,this.y=c*f-s*p,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Dh.copy(this).projectOnVector(e),this.sub(Dh)}reflect(e){return this.sub(Dh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(zt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ym.prototype.isVector3=!0;let ie=ym;const Dh=new ie,H_=new _r,Sm=class Sm{constructor(e,i,s,l,c,f,h,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,p,m)}set(e,i,s,l,c,f,h,p,m){const v=this.elements;return v[0]=e,v[1]=l,v[2]=h,v[3]=i,v[4]=c,v[5]=p,v[6]=s,v[7]=f,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],p=s[6],m=s[1],v=s[4],_=s[7],g=s[2],y=s[5],M=s[8],C=l[0],E=l[3],S=l[6],N=l[1],I=l[4],L=l[7],V=l[2],D=l[5],B=l[8];return c[0]=f*C+h*N+p*V,c[3]=f*E+h*I+p*D,c[6]=f*S+h*L+p*B,c[1]=m*C+v*N+_*V,c[4]=m*E+v*I+_*D,c[7]=m*S+v*L+_*B,c[2]=g*C+y*N+M*V,c[5]=g*E+y*I+M*D,c[8]=g*S+y*L+M*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8];return i*f*v-i*h*m-s*c*v+s*h*p+l*c*m-l*f*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8],_=v*f-h*m,g=h*p-v*c,y=m*c-f*p,M=i*_+s*g+l*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/M;return e[0]=_*C,e[1]=(l*m-v*s)*C,e[2]=(h*s-l*f)*C,e[3]=g*C,e[4]=(v*i-l*p)*C,e[5]=(l*c-h*i)*C,e[6]=y*C,e[7]=(s*p-m*i)*C,e[8]=(f*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*f+m*h)+f+e,-l*m,l*p,-l*(-m*f+p*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Lh.makeScale(e,i)),this}rotate(e){return this.premultiply(Lh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Lh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Sm.prototype.isMatrix3=!0;let St=Sm;const Lh=new St,k_=new St().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),V_=new St().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function YM(){const r={enabled:!0,workingColorSpace:pf,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===un&&(l.r=Os(l.r),l.g=Os(l.g),l.b=Os(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===un&&(l.r=el(l.r),l.g=el(l.g),l.b=el(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===pr?mf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Qp("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Qp("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[pf]:{primaries:e,whitePoint:s,transfer:mf,toXYZ:k_,fromXYZ:V_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Zi},outputColorSpaceConfig:{drawingBufferColorSpace:Zi}},[Zi]:{primaries:e,whitePoint:s,transfer:un,toXYZ:k_,fromXYZ:V_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Zi}}}),r}const jt=YM();function Os(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function el(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Fo;class WM{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Fo===void 0&&(Fo=gc("canvas")),Fo.width=e.width,Fo.height=e.height;const l=Fo.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Fo}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=gc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Os(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Os(i[s]/255)*255):i[s]=Os(i[s]);return{data:i,width:e.width,height:e.height}}else return gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qM=0;class pm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qM++}),this.uuid=_c(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Ih(l[f].image)):c.push(Ih(l[f]))}else c=Ih(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Ih(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?WM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(gt("Texture: Unable to serialize Texture."),{})}let $M=0;const Uh=new ie;class Ei extends vr{constructor(e=Ei.DEFAULT_IMAGE,i=Ei.DEFAULT_MAPPING,s=Cs,l=Cs,c=Si,f=Yr,h=Ra,p=ha,m=Ei.DEFAULT_ANISOTROPY,v=pr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=_c(),this.name="",this.source=new pm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new St,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uh).x}get height(){return this.source.getSize(Uh).y}get depth(){return this.source.getSize(Uh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){gt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){gt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eb)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bp:e.x=e.x-Math.floor(e.x);break;case Cs:e.x=e.x<0?0:1;break;case yp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bp:e.y=e.y-Math.floor(e.y);break;case Cs:e.y=e.y<0?0:1;break;case yp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ei.DEFAULT_IMAGE=null;Ei.DEFAULT_MAPPING=eb;Ei.DEFAULT_ANISOTROPY=1;const Em=class Em{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const p=e.elements,m=p[0],v=p[4],_=p[8],g=p[1],y=p[5],M=p[9],C=p[2],E=p[6],S=p[10];if(Math.abs(v-g)<.01&&Math.abs(_-C)<.01&&Math.abs(M-E)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+C)<.1&&Math.abs(M+E)<.1&&Math.abs(m+y+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(m+1)/2,L=(y+1)/2,V=(S+1)/2,D=(v+g)/4,B=(_+C)/4,A=(M+E)/4;return I>L&&I>V?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=D/s,c=B/s):L>V?L<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(L),s=D/l,c=A/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=B/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((E-M)*(E-M)+(_-C)*(_-C)+(g-v)*(g-v));return Math.abs(N)<.001&&(N=1),this.x=(E-M)/N,this.y=(_-C)/N,this.z=(g-v)/N,this.w=Math.acos((m+y+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=zt(this.x,e.x,i.x),this.y=zt(this.y,e.y,i.y),this.z=zt(this.z,e.z,i.z),this.w=zt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=zt(this.x,e,i),this.y=zt(this.y,e,i),this.z=zt(this.z,e,i),this.w=zt(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(zt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Em.prototype.isVector4=!0;let Bn=Em;class KM extends vr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new Bn(0,0,e,i),this.scissorTest=!1,this.viewport=new Bn(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new Ei(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Si,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new pm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xa extends KM{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class cb extends Ei{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=pi,this.minFilter=pi,this.wrapR=Cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ZM extends Ei{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=pi,this.minFilter=pi,this.wrapR=Cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xf=class xf{constructor(e,i,s,l,c,f,h,p,m,v,_,g,y,M,C,E){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,p,m,v,_,g,y,M,C,E)}set(e,i,s,l,c,f,h,p,m,v,_,g,y,M,C,E){const S=this.elements;return S[0]=e,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=h,S[13]=p,S[2]=m,S[6]=v,S[10]=_,S[14]=g,S[3]=y,S[7]=M,S[11]=C,S[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xf().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Bo.setFromMatrixColumn(e,0).length(),c=1/Bo.setFromMatrixColumn(e,1).length(),f=1/Bo.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),v=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=f*v,y=f*_,M=h*v,C=h*_;i[0]=p*v,i[4]=-p*_,i[8]=m,i[1]=y+M*m,i[5]=g-C*m,i[9]=-h*p,i[2]=C-g*m,i[6]=M+y*m,i[10]=f*p}else if(e.order==="YXZ"){const g=p*v,y=p*_,M=m*v,C=m*_;i[0]=g+C*h,i[4]=M*h-y,i[8]=f*m,i[1]=f*_,i[5]=f*v,i[9]=-h,i[2]=y*h-M,i[6]=C+g*h,i[10]=f*p}else if(e.order==="ZXY"){const g=p*v,y=p*_,M=m*v,C=m*_;i[0]=g-C*h,i[4]=-f*_,i[8]=M+y*h,i[1]=y+M*h,i[5]=f*v,i[9]=C-g*h,i[2]=-f*m,i[6]=h,i[10]=f*p}else if(e.order==="ZYX"){const g=f*v,y=f*_,M=h*v,C=h*_;i[0]=p*v,i[4]=M*m-y,i[8]=g*m+C,i[1]=p*_,i[5]=C*m+g,i[9]=y*m-M,i[2]=-m,i[6]=h*p,i[10]=f*p}else if(e.order==="YZX"){const g=f*p,y=f*m,M=h*p,C=h*m;i[0]=p*v,i[4]=C-g*_,i[8]=M*_+y,i[1]=_,i[5]=f*v,i[9]=-h*v,i[2]=-m*v,i[6]=y*_+M,i[10]=g-C*_}else if(e.order==="XZY"){const g=f*p,y=f*m,M=h*p,C=h*m;i[0]=p*v,i[4]=-_,i[8]=m*v,i[1]=g*_+C,i[5]=f*v,i[9]=y*_-M,i[2]=M*_-y,i[6]=h*v,i[10]=C*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(QM,e,JM)}lookAt(e,i,s){const l=this.elements;return $i.subVectors(e,i),$i.lengthSq()===0&&($i.z=1),$i.normalize(),rr.crossVectors(s,$i),rr.lengthSq()===0&&(Math.abs(s.z)===1?$i.x+=1e-4:$i.z+=1e-4,$i.normalize(),rr.crossVectors(s,$i)),rr.normalize(),Nu.crossVectors($i,rr),l[0]=rr.x,l[4]=Nu.x,l[8]=$i.x,l[1]=rr.y,l[5]=Nu.y,l[9]=$i.y,l[2]=rr.z,l[6]=Nu.z,l[10]=$i.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],p=s[8],m=s[12],v=s[1],_=s[5],g=s[9],y=s[13],M=s[2],C=s[6],E=s[10],S=s[14],N=s[3],I=s[7],L=s[11],V=s[15],D=l[0],B=l[4],A=l[8],F=l[12],$=l[1],k=l[5],X=l[9],he=l[13],oe=l[2],W=l[6],U=l[10],G=l[14],ee=l[3],ge=l[7],Me=l[11],P=l[15];return c[0]=f*D+h*$+p*oe+m*ee,c[4]=f*B+h*k+p*W+m*ge,c[8]=f*A+h*X+p*U+m*Me,c[12]=f*F+h*he+p*G+m*P,c[1]=v*D+_*$+g*oe+y*ee,c[5]=v*B+_*k+g*W+y*ge,c[9]=v*A+_*X+g*U+y*Me,c[13]=v*F+_*he+g*G+y*P,c[2]=M*D+C*$+E*oe+S*ee,c[6]=M*B+C*k+E*W+S*ge,c[10]=M*A+C*X+E*U+S*Me,c[14]=M*F+C*he+E*G+S*P,c[3]=N*D+I*$+L*oe+V*ee,c[7]=N*B+I*k+L*W+V*ge,c[11]=N*A+I*X+L*U+V*Me,c[15]=N*F+I*he+L*G+V*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],p=e[9],m=e[13],v=e[2],_=e[6],g=e[10],y=e[14],M=e[3],C=e[7],E=e[11],S=e[15],N=p*y-m*g,I=h*y-m*_,L=h*g-p*_,V=f*y-m*v,D=f*g-p*v,B=f*_-h*v;return i*(C*N-E*I+S*L)-s*(M*N-E*V+S*D)+l*(M*I-C*V+S*B)-c*(M*L-C*D+E*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8],_=e[9],g=e[10],y=e[11],M=e[12],C=e[13],E=e[14],S=e[15],N=i*h-s*f,I=i*p-l*f,L=i*m-c*f,V=s*p-l*h,D=s*m-c*h,B=l*m-c*p,A=v*C-_*M,F=v*E-g*M,$=v*S-y*M,k=_*E-g*C,X=_*S-y*C,he=g*S-y*E,oe=N*he-I*X+L*k+V*$-D*F+B*A;if(oe===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/oe;return e[0]=(h*he-p*X+m*k)*W,e[1]=(l*X-s*he-c*k)*W,e[2]=(C*B-E*D+S*V)*W,e[3]=(g*D-_*B-y*V)*W,e[4]=(p*$-f*he-m*F)*W,e[5]=(i*he-l*$+c*F)*W,e[6]=(E*L-M*B-S*I)*W,e[7]=(v*B-g*L+y*I)*W,e[8]=(f*X-h*$+m*A)*W,e[9]=(s*$-i*X-c*A)*W,e[10]=(M*D-C*L+S*N)*W,e[11]=(_*L-v*D-y*N)*W,e[12]=(h*F-f*k-p*A)*W,e[13]=(i*k-s*F+l*A)*W,e[14]=(C*I-M*V-E*N)*W,e[15]=(v*V-_*I+g*N)*W,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,p=e.z,m=c*f,v=c*h;return this.set(m*f+s,m*h-l*p,m*p+l*h,0,m*h+l*p,v*h+s,v*p-l*f,0,m*p-l*h,v*p+l*f,c*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,p=i._w,m=c+c,v=f+f,_=h+h,g=c*m,y=c*v,M=c*_,C=f*v,E=f*_,S=h*_,N=p*m,I=p*v,L=p*_,V=s.x,D=s.y,B=s.z;return l[0]=(1-(C+S))*V,l[1]=(y+L)*V,l[2]=(M-I)*V,l[3]=0,l[4]=(y-L)*D,l[5]=(1-(g+S))*D,l[6]=(E+N)*D,l[7]=0,l[8]=(M+I)*B,l[9]=(E-N)*B,l[10]=(1-(g+C))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Bo.set(l[0],l[1],l[2]).length();const h=Bo.set(l[4],l[5],l[6]).length(),p=Bo.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Ma.copy(this);const m=1/f,v=1/h,_=1/p;return Ma.elements[0]*=m,Ma.elements[1]*=m,Ma.elements[2]*=m,Ma.elements[4]*=v,Ma.elements[5]*=v,Ma.elements[6]*=v,Ma.elements[8]*=_,Ma.elements[9]*=_,Ma.elements[10]*=_,i.setFromRotationMatrix(Ma),s.x=f,s.y=h,s.z=p,this}makePerspective(e,i,s,l,c,f,h=Va,p=!1){const m=this.elements,v=2*c/(i-e),_=2*c/(s-l),g=(i+e)/(i-e),y=(s+l)/(s-l);let M,C;if(p)M=c/(f-c),C=f*c/(f-c);else if(h===Va)M=-(f+c)/(f-c),C=-2*f*c/(f-c);else if(h===gf)M=-f/(f-c),C=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=v,m[4]=0,m[8]=g,m[12]=0,m[1]=0,m[5]=_,m[9]=y,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=C,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=Va,p=!1){const m=this.elements,v=2/(i-e),_=2/(s-l),g=-(i+e)/(i-e),y=-(s+l)/(s-l);let M,C;if(p)M=1/(f-c),C=f/(f-c);else if(h===Va)M=-2/(f-c),C=-(f+c)/(f-c);else if(h===gf)M=-1/(f-c),C=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=v,m[4]=0,m[8]=0,m[12]=g,m[1]=0,m[5]=_,m[9]=0,m[13]=y,m[2]=0,m[6]=0,m[10]=M,m[14]=C,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};xf.prototype.isMatrix4=!0;let Zn=xf;const Bo=new ie,Ma=new Zn,QM=new ie(0,0,0),JM=new ie(1,1,1),rr=new ie,Nu=new ie,$i=new ie,j_=new Zn,X_=new _r;class Zr{constructor(e=0,i=0,s=0,l=Zr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],p=l[1],m=l[5],v=l[9],_=l[2],g=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin(zt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,y),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,m),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,y),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(zt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,y),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-zt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,y),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(zt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,y));break;case"XZY":this._z=Math.asin(-zt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-v,y),this._y=0);break;default:gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return j_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(j_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return X_.setFromEuler(this),this.setFromQuaternion(X_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zr.DEFAULT_ORDER="XYZ";class ub{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let eT=0;const Y_=new ie,zo=new _r,Es=new Zn,Ou=new ie,ic=new ie,tT=new ie,nT=new _r,W_=new ie(1,0,0),q_=new ie(0,1,0),$_=new ie(0,0,1),K_={type:"added"},iT={type:"removed"},Go={type:"childadded",child:null},Ph={type:"childremoved",child:null};class Qi extends vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eT++}),this.uuid=_c(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qi.DEFAULT_UP.clone();const e=new ie,i=new Zr,s=new _r,l=new ie(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Zn},normalMatrix:{value:new St}}),this.matrix=new Zn,this.matrixWorld=new Zn,this.matrixAutoUpdate=Qi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ub,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return zo.setFromAxisAngle(e,i),this.quaternion.multiply(zo),this}rotateOnWorldAxis(e,i){return zo.setFromAxisAngle(e,i),this.quaternion.premultiply(zo),this}rotateX(e){return this.rotateOnAxis(W_,e)}rotateY(e){return this.rotateOnAxis(q_,e)}rotateZ(e){return this.rotateOnAxis($_,e)}translateOnAxis(e,i){return Y_.copy(e).applyQuaternion(this.quaternion),this.position.add(Y_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(W_,e)}translateY(e){return this.translateOnAxis(q_,e)}translateZ(e){return this.translateOnAxis($_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Es.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Ou.copy(e):Ou.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ic.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Es.lookAt(ic,Ou,this.up):Es.lookAt(Ou,ic,this.up),this.quaternion.setFromRotationMatrix(Es),l&&(Es.extractRotation(l.matrixWorld),zo.setFromRotationMatrix(Es),this.quaternion.premultiply(zo.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?($t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(K_),Go.child=e,this.dispatchEvent(Go),Go.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(iT),Ph.child=e,this.dispatchEvent(Ph),Ph.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Es.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Es.multiply(e.parent.matrixWorld)),e.applyMatrix4(Es),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(K_),Go.child=e,this.dispatchEvent(Go),Go.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,e,tT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,nT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const _=p[m];c(e.shapes,_)}else c(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(e.materials,this.material[p]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(e.animations,p))}}if(i){const h=f(e.geometries),p=f(e.materials),m=f(e.textures),v=f(e.images),_=f(e.shapes),g=f(e.skeletons),y=f(e.animations),M=f(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),_.length>0&&(s.shapes=_),g.length>0&&(s.skeletons=g),y.length>0&&(s.animations=y),M.length>0&&(s.nodes=M)}return s.object=l,s;function f(h){const p=[];for(const m in h){const v=h[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Qi.DEFAULT_UP=new ie(0,1,0);Qi.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Du extends Qi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const aT={type:"move"};class Fh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Du,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Du,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ie,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ie),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Du,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ie,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ie,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const C of e.hand.values()){const E=i.getJointPose(C,s),S=this._getHandJoint(m,C);E!==null&&(S.matrix.fromArray(E.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=E.radius),S.visible=E!==null}const v=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],g=v.position.distanceTo(_.position),y=.02,M=.005;m.inputState.pinching&&g>y+M?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&g<=y-M&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(aT)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Du;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const fb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},or={h:0,s:0,l:0},Lu={h:0,s:0,l:0};function Bh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class mn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Zi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=jt.workingColorSpace){return this.r=e,this.g=i,this.b=s,jt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=jt.workingColorSpace){if(e=jM(e,1),i=zt(i,0,1),s=zt(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Bh(f,c,e+1/3),this.g=Bh(f,c,e),this.b=Bh(f,c,e-1/3)}return jt.colorSpaceToWorking(this,l),this}setStyle(e,i=Zi){function s(c){c!==void 0&&parseFloat(c)<1&&gt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:gt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);gt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Zi){const s=fb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):gt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}copyLinearToSRGB(e){return this.r=el(e.r),this.g=el(e.g),this.b=el(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zi){return jt.workingToColorSpace(bi.copy(this),e),Math.round(zt(bi.r*255,0,255))*65536+Math.round(zt(bi.g*255,0,255))*256+Math.round(zt(bi.b*255,0,255))}getHexString(e=Zi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=jt.workingColorSpace){jt.workingToColorSpace(bi.copy(this),i);const s=bi.r,l=bi.g,c=bi.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let p,m;const v=(h+f)/2;if(h===f)p=0,m=0;else{const _=f-h;switch(m=v<=.5?_/(f+h):_/(2-f-h),f){case s:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-s)/_+2;break;case c:p=(s-l)/_+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,i=jt.workingColorSpace){return jt.workingToColorSpace(bi.copy(this),i),e.r=bi.r,e.g=bi.g,e.b=bi.b,e}getStyle(e=Zi){jt.workingToColorSpace(bi.copy(this),e);const i=bi.r,s=bi.g,l=bi.b;return e!==Zi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(or),this.setHSL(or.h+e,or.s+i,or.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(or),e.getHSL(Lu);const s=Oh(or.h,Lu.h,i),l=Oh(or.s,Lu.s,i),c=Oh(or.l,Lu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bi=new mn;mn.NAMES=fb;class sT extends Qi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zr,this.environmentIntensity=1,this.environmentRotation=new Zr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ta=new ie,Ms=new ie,zh=new ie,Ts=new ie,Ho=new ie,ko=new ie,Z_=new ie,Gh=new ie,Hh=new ie,kh=new ie,Vh=new Bn,jh=new Bn,Xh=new Bn;class wa{constructor(e=new ie,i=new ie,s=new ie){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ta.subVectors(e,i),l.cross(Ta);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ta.subVectors(l,i),Ms.subVectors(s,i),zh.subVectors(e,i);const f=Ta.dot(Ta),h=Ta.dot(Ms),p=Ta.dot(zh),m=Ms.dot(Ms),v=Ms.dot(zh),_=f*m-h*h;if(_===0)return c.set(0,0,0),null;const g=1/_,y=(m*p-h*v)*g,M=(f*v-h*p)*g;return c.set(1-y-M,M,y)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Ts)===null?!1:Ts.x>=0&&Ts.y>=0&&Ts.x+Ts.y<=1}static getInterpolation(e,i,s,l,c,f,h,p){return this.getBarycoord(e,i,s,l,Ts)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,Ts.x),p.addScaledVector(f,Ts.y),p.addScaledVector(h,Ts.z),p)}static getInterpolatedAttribute(e,i,s,l,c,f){return Vh.setScalar(0),jh.setScalar(0),Xh.setScalar(0),Vh.fromBufferAttribute(e,i),jh.fromBufferAttribute(e,s),Xh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Vh,c.x),f.addScaledVector(jh,c.y),f.addScaledVector(Xh,c.z),f}static isFrontFacing(e,i,s,l){return Ta.subVectors(s,i),Ms.subVectors(e,i),Ta.cross(Ms).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ta.subVectors(this.c,this.b),Ms.subVectors(this.a,this.b),Ta.cross(Ms).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wa.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return wa.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return wa.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return wa.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wa.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;Ho.subVectors(l,s),ko.subVectors(c,s),Gh.subVectors(e,s);const p=Ho.dot(Gh),m=ko.dot(Gh);if(p<=0&&m<=0)return i.copy(s);Hh.subVectors(e,l);const v=Ho.dot(Hh),_=ko.dot(Hh);if(v>=0&&_<=v)return i.copy(l);const g=p*_-v*m;if(g<=0&&p>=0&&v<=0)return f=p/(p-v),i.copy(s).addScaledVector(Ho,f);kh.subVectors(e,c);const y=Ho.dot(kh),M=ko.dot(kh);if(M>=0&&y<=M)return i.copy(c);const C=y*m-p*M;if(C<=0&&m>=0&&M<=0)return h=m/(m-M),i.copy(s).addScaledVector(ko,h);const E=v*M-y*_;if(E<=0&&_-v>=0&&y-M>=0)return Z_.subVectors(c,l),h=(_-v)/(_-v+(y-M)),i.copy(l).addScaledVector(Z_,h);const S=1/(E+C+g);return f=C*S,h=g*S,i.copy(s).addScaledVector(Ho,f).addScaledVector(ko,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vc{constructor(e=new ie(1/0,1/0,1/0),i=new ie(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Aa.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Aa.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Aa.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Aa):Aa.fromBufferAttribute(c,f),Aa.applyMatrix4(e.matrixWorld),this.expandByPoint(Aa);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Iu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Iu.copy(s.boundingBox)),Iu.applyMatrix4(e.matrixWorld),this.union(Iu)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Aa),Aa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ac),Uu.subVectors(this.max,ac),Vo.subVectors(e.a,ac),jo.subVectors(e.b,ac),Xo.subVectors(e.c,ac),lr.subVectors(jo,Vo),cr.subVectors(Xo,jo),zr.subVectors(Vo,Xo);let i=[0,-lr.z,lr.y,0,-cr.z,cr.y,0,-zr.z,zr.y,lr.z,0,-lr.x,cr.z,0,-cr.x,zr.z,0,-zr.x,-lr.y,lr.x,0,-cr.y,cr.x,0,-zr.y,zr.x,0];return!Yh(i,Vo,jo,Xo,Uu)||(i=[1,0,0,0,1,0,0,0,1],!Yh(i,Vo,jo,Xo,Uu))?!1:(Pu.crossVectors(lr,cr),i=[Pu.x,Pu.y,Pu.z],Yh(i,Vo,jo,Xo,Uu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Aa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Aa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(As[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),As[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),As[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),As[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),As[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),As[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),As[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),As[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(As),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const As=[new ie,new ie,new ie,new ie,new ie,new ie,new ie,new ie],Aa=new ie,Iu=new vc,Vo=new ie,jo=new ie,Xo=new ie,lr=new ie,cr=new ie,zr=new ie,ac=new ie,Uu=new ie,Pu=new ie,Gr=new ie;function Yh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Gr.fromArray(r,c);const h=l.x*Math.abs(Gr.x)+l.y*Math.abs(Gr.y)+l.z*Math.abs(Gr.z),p=e.dot(Gr),m=i.dot(Gr),v=s.dot(Gr);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>h)return!1}return!0}const Xn=new ie,Fu=new Ot;let rT=0;class Ya extends vr{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=F_,this.updateRanges=[],this.gpuType=ka,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Fu.fromBufferAttribute(this,i),Fu.applyMatrix3(e),this.setXY(i,Fu.x,Fu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)Xn.fromBufferAttribute(this,i),Xn.applyMatrix3(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)Xn.fromBufferAttribute(this,i),Xn.applyMatrix4(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)Xn.fromBufferAttribute(this,i),Xn.applyNormalMatrix(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)Xn.fromBufferAttribute(this,i),Xn.transformDirection(e),this.setXYZ(i,Xn.x,Xn.y,Xn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=nc(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Ii(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=nc(i,this.array)),i}setX(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=nc(i,this.array)),i}setY(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=nc(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=nc(i,this.array)),i}setW(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array),l=Ii(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array),l=Ii(l,this.array),c=Ii(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==F_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class db extends Ya{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class hb extends Ya{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class pa extends Ya{constructor(e,i,s){super(new Float32Array(e),i,s)}}const oT=new vc,sc=new ie,Wh=new ie;class mm{constructor(e=new ie,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):oT.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sc.subVectors(e,this.center);const i=sc.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(sc,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sc.copy(e.center).add(Wh)),this.expandByPoint(sc.copy(e.center).sub(Wh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let lT=0;const fa=new Zn,qh=new Qi,Yo=new ie,Ki=new vc,rc=new vc,si=new ie;class Ka extends vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lT++}),this.uuid=_c(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(GM(e)?hb:db)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new St().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fa.makeRotationFromQuaternion(e),this.applyMatrix4(fa),this}rotateX(e){return fa.makeRotationX(e),this.applyMatrix4(fa),this}rotateY(e){return fa.makeRotationY(e),this.applyMatrix4(fa),this}rotateZ(e){return fa.makeRotationZ(e),this.applyMatrix4(fa),this}translate(e,i,s){return fa.makeTranslation(e,i,s),this.applyMatrix4(fa),this}scale(e,i,s){return fa.makeScale(e,i,s),this.applyMatrix4(fa),this}lookAt(e){return qh.lookAt(e),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yo).negate(),this.translate(Yo.x,Yo.y,Yo.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new pa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ie(-1/0,-1/0,-1/0),new ie(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Ki.setFromBufferAttribute(c),this.morphTargetsRelative?(si.addVectors(this.boundingBox.min,Ki.min),this.boundingBox.expandByPoint(si),si.addVectors(this.boundingBox.max,Ki.max),this.boundingBox.expandByPoint(si)):(this.boundingBox.expandByPoint(Ki.min),this.boundingBox.expandByPoint(Ki.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ie,1/0);return}if(e){const s=this.boundingSphere.center;if(Ki.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];rc.setFromBufferAttribute(h),this.morphTargetsRelative?(si.addVectors(Ki.min,rc.min),Ki.expandByPoint(si),si.addVectors(Ki.max,rc.max),Ki.expandByPoint(si)):(Ki.expandByPoint(rc.min),Ki.expandByPoint(rc.max))}Ki.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)si.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(si));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],p=this.morphTargetsRelative;for(let m=0,v=h.count;m<v;m++)si.fromBufferAttribute(h,m),p&&(Yo.fromBufferAttribute(e,m),si.add(Yo)),l=Math.max(l,s.distanceToSquared(si))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ya(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let A=0;A<s.count;A++)h[A]=new ie,p[A]=new ie;const m=new ie,v=new ie,_=new ie,g=new Ot,y=new Ot,M=new Ot,C=new ie,E=new ie;function S(A,F,$){m.fromBufferAttribute(s,A),v.fromBufferAttribute(s,F),_.fromBufferAttribute(s,$),g.fromBufferAttribute(c,A),y.fromBufferAttribute(c,F),M.fromBufferAttribute(c,$),v.sub(m),_.sub(m),y.sub(g),M.sub(g);const k=1/(y.x*M.y-M.x*y.y);isFinite(k)&&(C.copy(v).multiplyScalar(M.y).addScaledVector(_,-y.y).multiplyScalar(k),E.copy(_).multiplyScalar(y.x).addScaledVector(v,-M.x).multiplyScalar(k),h[A].add(C),h[F].add(C),h[$].add(C),p[A].add(E),p[F].add(E),p[$].add(E))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,F=N.length;A<F;++A){const $=N[A],k=$.start,X=$.count;for(let he=k,oe=k+X;he<oe;he+=3)S(e.getX(he+0),e.getX(he+1),e.getX(he+2))}const I=new ie,L=new ie,V=new ie,D=new ie;function B(A){V.fromBufferAttribute(l,A),D.copy(V);const F=h[A];I.copy(F),I.sub(V.multiplyScalar(V.dot(F))).normalize(),L.crossVectors(D,F);const k=L.dot(p[A])<0?-1:1;f.setXYZW(A,I.x,I.y,I.z,k)}for(let A=0,F=N.length;A<F;++A){const $=N[A],k=$.start,X=$.count;for(let he=k,oe=k+X;he<oe;he+=3)B(e.getX(he+0)),B(e.getX(he+1)),B(e.getX(he+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ya(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,y=s.count;g<y;g++)s.setXYZ(g,0,0,0);const l=new ie,c=new ie,f=new ie,h=new ie,p=new ie,m=new ie,v=new ie,_=new ie;if(e)for(let g=0,y=e.count;g<y;g+=3){const M=e.getX(g+0),C=e.getX(g+1),E=e.getX(g+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,E),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),h.fromBufferAttribute(s,M),p.fromBufferAttribute(s,C),m.fromBufferAttribute(s,E),h.add(v),p.add(v),m.add(v),s.setXYZ(M,h.x,h.y,h.z),s.setXYZ(C,p.x,p.y,p.z),s.setXYZ(E,m.x,m.y,m.z)}else for(let g=0,y=i.count;g<y;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)si.fromBufferAttribute(e,i),si.normalize(),e.setXYZ(i,si.x,si.y,si.z)}toNonIndexed(){function e(h,p){const m=h.array,v=h.itemSize,_=h.normalized,g=new m.constructor(p.length*v);let y=0,M=0;for(let C=0,E=p.length;C<E;C++){h.isInterleavedBufferAttribute?y=p[C]*h.data.stride+h.offset:y=p[C]*v;for(let S=0;S<v;S++)g[M++]=m[y++]}return new Ya(g,v,_)}if(this.index===null)return gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ka,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let v=0,_=m.length;v<_;v++){const g=m[v],y=e(g,s);p.push(y)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let _=0,g=m.length;_<g;_++){const y=m[_];v.push(y.toJSON(e.data))}v.length>0&&(l[p]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(i))}const c=e.morphAttributes;for(const m in c){const v=[],_=c[m];for(let g=0,y=_.length;g<y;g++)v.push(_[g].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,v=f.length;m<v;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cT=0;class vf extends vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=_c(),this.name="",this.type="Material",this.blending=Jo,this.side=xr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fp,this.blendDst=dp,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mn(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=P_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Po,this.stencilZFail=Po,this.stencilZPass=Po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){gt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){gt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Jo&&(s.blending=this.blending),this.side!==xr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==fp&&(s.blendSrc=this.blendSrc),this.blendDst!==dp&&(s.blendDst=this.blendDst),this.blendEquation!==jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==nl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==P_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Po&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Po&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Po&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ws=new ie,$h=new ie,Bu=new ie,ur=new ie,Kh=new ie,zu=new ie,Zh=new ie;class pb{constructor(e=new ie,i=new ie(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ws)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ws.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ws.copy(this.origin).addScaledVector(this.direction,i),ws.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){$h.copy(e).add(i).multiplyScalar(.5),Bu.copy(i).sub(e).normalize(),ur.copy(this.origin).sub($h);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Bu),h=ur.dot(this.direction),p=-ur.dot(Bu),m=ur.lengthSq(),v=Math.abs(1-f*f);let _,g,y,M;if(v>0)if(_=f*p-h,g=f*h-p,M=c*v,_>=0)if(g>=-M)if(g<=M){const C=1/v;_*=C,g*=C,y=_*(_+f*g+2*h)+g*(f*_+g+2*p)+m}else g=c,_=Math.max(0,-(f*g+h)),y=-_*_+g*(g+2*p)+m;else g=-c,_=Math.max(0,-(f*g+h)),y=-_*_+g*(g+2*p)+m;else g<=-M?(_=Math.max(0,-(-f*c+h)),g=_>0?-c:Math.min(Math.max(-c,-p),c),y=-_*_+g*(g+2*p)+m):g<=M?(_=0,g=Math.min(Math.max(-c,-p),c),y=g*(g+2*p)+m):(_=Math.max(0,-(f*c+h)),g=_>0?c:Math.min(Math.max(-c,-p),c),y=-_*_+g*(g+2*p)+m);else g=f>0?-c:c,_=Math.max(0,-(f*g+h)),y=-_*_+g*(g+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy($h).addScaledVector(Bu,g),y}intersectSphere(e,i){ws.subVectors(e.center,this.origin);const s=ws.dot(this.direction),l=ws.dot(ws)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,p=s+f;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,p;const m=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return m>=0?(s=(e.min.x-g.x)*m,l=(e.max.x-g.x)*m):(s=(e.max.x-g.x)*m,l=(e.min.x-g.x)*m),v>=0?(c=(e.min.y-g.y)*v,f=(e.max.y-g.y)*v):(c=(e.max.y-g.y)*v,f=(e.min.y-g.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(e.min.z-g.z)*_,p=(e.max.z-g.z)*_):(h=(e.max.z-g.z)*_,p=(e.min.z-g.z)*_),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ws)!==null}intersectTriangle(e,i,s,l,c){Kh.subVectors(i,e),zu.subVectors(s,e),Zh.crossVectors(Kh,zu);let f=this.direction.dot(Zh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;ur.subVectors(this.origin,e);const p=h*this.direction.dot(zu.crossVectors(ur,zu));if(p<0)return null;const m=h*this.direction.dot(Kh.cross(ur));if(m<0||p+m>f)return null;const v=-h*ur.dot(Zh);return v<0?null:this.at(v/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gm extends vf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zr,this.combine=Yv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Q_=new Zn,Hr=new pb,Gu=new mm,J_=new ie,Hu=new ie,ku=new ie,Vu=new ie,Qh=new ie,ju=new ie,ev=new ie,Xu=new ie;class qa extends Qi{constructor(e=new Ka,i=new gm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){ju.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const v=h[p],_=c[p];v!==0&&(Qh.fromBufferAttribute(_,e),f?ju.addScaledVector(Qh,v):ju.addScaledVector(Qh.sub(i),v))}i.add(ju)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Gu.copy(s.boundingSphere),Gu.applyMatrix4(c),Hr.copy(e.ray).recast(e.near),!(Gu.containsPoint(Hr.origin)===!1&&(Hr.intersectSphere(Gu,J_)===null||Hr.origin.distanceToSquared(J_)>(e.far-e.near)**2))&&(Q_.copy(c).invert(),Hr.copy(e.ray).applyMatrix4(Q_),!(s.boundingBox!==null&&Hr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Hr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,y=c.drawRange;if(h!==null)if(Array.isArray(f))for(let M=0,C=g.length;M<C;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,y.start),I=Math.min(h.count,Math.min(E.start+E.count,y.start+y.count));for(let L=N,V=I;L<V;L+=3){const D=h.getX(L),B=h.getX(L+1),A=h.getX(L+2);l=Yu(this,S,e,s,m,v,_,D,B,A),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,y.start),C=Math.min(h.count,y.start+y.count);for(let E=M,S=C;E<S;E+=3){const N=h.getX(E),I=h.getX(E+1),L=h.getX(E+2);l=Yu(this,f,e,s,m,v,_,N,I,L),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let M=0,C=g.length;M<C;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,y.start),I=Math.min(p.count,Math.min(E.start+E.count,y.start+y.count));for(let L=N,V=I;L<V;L+=3){const D=L,B=L+1,A=L+2;l=Yu(this,S,e,s,m,v,_,D,B,A),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,y.start),C=Math.min(p.count,y.start+y.count);for(let E=M,S=C;E<S;E+=3){const N=E,I=E+1,L=E+2;l=Yu(this,f,e,s,m,v,_,N,I,L),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}}}function uT(r,e,i,s,l,c,f,h){let p;if(e.side===Pi?p=s.intersectTriangle(f,c,l,!0,h):p=s.intersectTriangle(l,c,f,e.side===xr,h),p===null)return null;Xu.copy(h),Xu.applyMatrix4(r.matrixWorld);const m=i.ray.origin.distanceTo(Xu);return m<i.near||m>i.far?null:{distance:m,point:Xu.clone(),object:r}}function Yu(r,e,i,s,l,c,f,h,p,m){r.getVertexPosition(h,Hu),r.getVertexPosition(p,ku),r.getVertexPosition(m,Vu);const v=uT(r,e,i,s,Hu,ku,Vu,ev);if(v){const _=new ie;wa.getBarycoord(ev,Hu,ku,Vu,_),l&&(v.uv=wa.getInterpolatedAttribute(l,h,p,m,_,new Ot)),c&&(v.uv1=wa.getInterpolatedAttribute(c,h,p,m,_,new Ot)),f&&(v.normal=wa.getInterpolatedAttribute(f,h,p,m,_,new ie),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:h,b:p,c:m,normal:new ie,materialIndex:0};wa.getNormal(Hu,ku,Vu,g.normal),v.face=g,v.barycoord=_}return v}class fT extends Ei{constructor(e=null,i=1,s=1,l,c,f,h,p,m=pi,v=pi,_,g){super(null,f,h,p,m,v,l,c,_,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jh=new ie,dT=new ie,hT=new St;class hr{constructor(e=new ie(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Jh.subVectors(s,i).cross(dT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Jh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||hT.getNormalMatrix(e),l=this.coplanarPoint(Jh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kr=new mm,pT=new Ot(.5,.5),Wu=new ie;class mb{constructor(e=new hr,i=new hr,s=new hr,l=new hr,c=new hr,f=new hr){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Va,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],p=c[2],m=c[3],v=c[4],_=c[5],g=c[6],y=c[7],M=c[8],C=c[9],E=c[10],S=c[11],N=c[12],I=c[13],L=c[14],V=c[15];if(l[0].setComponents(m-f,y-v,S-M,V-N).normalize(),l[1].setComponents(m+f,y+v,S+M,V+N).normalize(),l[2].setComponents(m+h,y+_,S+C,V+I).normalize(),l[3].setComponents(m-h,y-_,S-C,V-I).normalize(),s)l[4].setComponents(p,g,E,L).normalize(),l[5].setComponents(m-p,y-g,S-E,V-L).normalize();else if(l[4].setComponents(m-p,y-g,S-E,V-L).normalize(),i===Va)l[5].setComponents(m+p,y+g,S+E,V+L).normalize();else if(i===gf)l[5].setComponents(p,g,E,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kr)}intersectsSprite(e){kr.center.set(0,0,0);const i=pT.distanceTo(e.center);return kr.radius=.7071067811865476+i,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Wu.x=l.normal.x>0?e.max.x:e.min.x,Wu.y=l.normal.y>0?e.max.y:e.min.y,Wu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Wu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gb extends Ei{constructor(e=[],i=$r,s,l,c,f,h,p,m,v){super(e,i,s,l,c,f,h,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class al extends Ei{constructor(e,i,s=Wa,l,c,f,h=pi,p=pi,m,v=Ls,_=1){if(v!==Ls&&v!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:_};super(g,l,c,f,h,p,v,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class mT extends al{constructor(e,i=Wa,s=$r,l,c,f=pi,h=pi,p,m=Ls){const v={width:e,height:e,depth:1},_=[v,v,v,v,v,v];super(e,e,i,s,l,c,f,h,p,m),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xb extends Ei{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class bc extends Ka{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],v=[],_=[];let g=0,y=0;M("z","y","x",-1,-1,s,i,e,f,c,0),M("z","y","x",1,-1,s,i,-e,f,c,1),M("x","z","y",1,1,e,s,i,l,f,2),M("x","z","y",1,-1,e,s,-i,l,f,3),M("x","y","z",1,-1,e,i,s,l,c,4),M("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new pa(m,3)),this.setAttribute("normal",new pa(v,3)),this.setAttribute("uv",new pa(_,2));function M(C,E,S,N,I,L,V,D,B,A,F){const $=L/B,k=V/A,X=L/2,he=V/2,oe=D/2,W=B+1,U=A+1;let G=0,ee=0;const ge=new ie;for(let Me=0;Me<U;Me++){const P=Me*k-he;for(let J=0;J<W;J++){const be=J*$-X;ge[C]=be*N,ge[E]=P*I,ge[S]=oe,m.push(ge.x,ge.y,ge.z),ge[C]=0,ge[E]=0,ge[S]=D>0?1:-1,v.push(ge.x,ge.y,ge.z),_.push(J/B),_.push(1-Me/A),G+=1}}for(let Me=0;Me<A;Me++)for(let P=0;P<B;P++){const J=g+P+W*Me,be=g+P+W*(Me+1),Ne=g+(P+1)+W*(Me+1),Pe=g+(P+1)+W*Me;p.push(J,be,Pe),p.push(be,Ne,Pe),ee+=6}h.addGroup(y,ee,F),y+=ee,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bf extends Ka{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,v=p+1,_=e/h,g=i/p,y=[],M=[],C=[],E=[];for(let S=0;S<v;S++){const N=S*g-f;for(let I=0;I<m;I++){const L=I*_-c;M.push(L,-N,0),C.push(0,0,1),E.push(I/h),E.push(1-S/p)}}for(let S=0;S<p;S++)for(let N=0;N<h;N++){const I=N+m*S,L=N+m*(S+1),V=N+1+m*(S+1),D=N+1+m*S;y.push(I,L,D),y.push(L,V,D)}this.setIndex(y),this.setAttribute("position",new pa(M,3)),this.setAttribute("normal",new pa(C,3)),this.setAttribute("uv",new pa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bf(e.width,e.height,e.widthSegments,e.heightSegments)}}class xm extends Ka{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(f+h,Math.PI);let m=0;const v=[],_=new ie,g=new ie,y=[],M=[],C=[],E=[];for(let S=0;S<=s;S++){const N=[],I=S/s;let L=0;S===0&&f===0?L=.5/i:S===s&&p===Math.PI&&(L=-.5/i);for(let V=0;V<=i;V++){const D=V/i;_.x=-e*Math.cos(l+D*c)*Math.sin(f+I*h),_.y=e*Math.cos(f+I*h),_.z=e*Math.sin(l+D*c)*Math.sin(f+I*h),M.push(_.x,_.y,_.z),g.copy(_).normalize(),C.push(g.x,g.y,g.z),E.push(D+L,1-I),N.push(m++)}v.push(N)}for(let S=0;S<s;S++)for(let N=0;N<i;N++){const I=v[S][N+1],L=v[S][N],V=v[S+1][N],D=v[S+1][N+1];(S!==0||f>0)&&y.push(I,L,D),(S!==s-1||p<Math.PI)&&y.push(L,V,D)}this.setIndex(y),this.setAttribute("position",new pa(M,3)),this.setAttribute("normal",new pa(C,3)),this.setAttribute("uv",new pa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function sl(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(tv(l))l.isRenderTargetTexture?(gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(tv(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Ai(r){const e={};for(let i=0;i<r.length;i++){const s=sl(r[i]);for(const l in s)e[l]=s[l]}return e}function tv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function gT(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function _b(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:jt.workingColorSpace}const xT={clone:sl,merge:Ai};var _T=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $a extends vf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_T,this.fragmentShader=vT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sl(e.uniforms),this.uniformsGroups=gT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class bT extends $a{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yT extends vf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=DM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ST extends vf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ep={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(nv(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!nv(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function nv(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ET{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,p;const m=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(v){h++,c===!1&&l.onStart!==void 0&&l.onStart(v,f,h),c=!0},this.itemEnd=function(v){f++,l.onProgress!==void 0&&l.onProgress(v,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(v){l.onError!==void 0&&l.onError(v)},this.resolveURL=function(v){return p?p(v):v},this.setURLModifier=function(v){return p=v,this},this.addHandler=function(v,_){return m.push(v,_),this},this.removeHandler=function(v){const _=m.indexOf(v);return _!==-1&&m.splice(_,2),this},this.getHandler=function(v){for(let _=0,g=m.length;_<g;_+=2){const y=m[_],M=m[_+1];if(y.global&&(y.lastIndex=0),y.test(v))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const MT=new ET;class _m{constructor(e){this.manager=e!==void 0?e:MT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}_m.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wo=new WeakMap;class TT extends _m{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=ep.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let _=Wo.get(f);_===void 0&&(_=[],Wo.set(f,_)),_.push({onLoad:i,onError:l})}return f}const h=gc("img");function p(){v(),i&&i(this);const _=Wo.get(this)||[];for(let g=0;g<_.length;g++){const y=_[g];y.onLoad&&y.onLoad(this)}Wo.delete(this),c.manager.itemEnd(e)}function m(_){v(),l&&l(_),ep.remove(`image:${e}`);const g=Wo.get(this)||[];for(let y=0;y<g.length;y++){const M=g[y];M.onError&&M.onError(_)}Wo.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function v(){h.removeEventListener("load",p,!1),h.removeEventListener("error",m,!1)}return h.addEventListener("load",p,!1),h.addEventListener("error",m,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),ep.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class AT extends _m{constructor(e){super(e)}load(e,i,s,l){const c=new Ei,f=new TT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const qu=new ie,$u=new _r,za=new ie;class vb extends Qi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zn,this.projectionMatrix=new Zn,this.projectionMatrixInverse=new Zn,this.coordinateSystem=Va,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qu,$u,za),za.x===1&&za.y===1&&za.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qu,$u,za.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(qu,$u,za),za.x===1&&za.y===1&&za.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qu,$u,za.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fr=new ie,iv=new Ot,av=new Ot;class da extends vb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Jp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jp*2*Math.atan(Math.tan(cf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fr.x,fr.y).multiplyScalar(-e/fr.z),fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(fr.x,fr.y).multiplyScalar(-e/fr.z)}getViewSize(e,i){return this.getViewBounds(e,iv,av),i.subVectors(av,iv)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(cf*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,i-=f.offsetY*s/m,l*=f.width/p,s*=f.height/m}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class bb extends vb{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=v*this.view.offsetY,p=h-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const qo=-90,$o=1;class wT extends Qi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new da(qo,$o,e,i);l.layers=this.layers,this.add(l);const c=new da(qo,$o,e,i);c.layers=this.layers,this.add(c);const f=new da(qo,$o,e,i);f.layers=this.layers,this.add(f);const h=new da(qo,$o,e,i);h.layers=this.layers,this.add(h);const p=new da(qo,$o,e,i);p.layers=this.layers,this.add(p);const m=new da(qo,$o,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,p]=i;for(const m of i)this.remove(m);if(e===Va)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===gf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,v]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let E=!1;e.isWebGLRenderer===!0?E=e.state.buffers.depth.getReversed():E=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,4,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,v),e.setRenderTarget(_,g,y),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class RT extends da{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class sv{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(zt(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Mm=class Mm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Mm.prototype.isMatrix2=!0;let rv=Mm;class CT extends vr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){gt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ov(r,e,i,s){const l=NT(s);switch(i){case sb:return r*e;case ob:return r*e/l.components*l.byteLength;case cm:return r*e/l.components*l.byteLength;case Kr:return r*e*2/l.components*l.byteLength;case um:return r*e*2/l.components*l.byteLength;case rb:return r*e*3/l.components*l.byteLength;case Ra:return r*e*4/l.components*l.byteLength;case fm:return r*e*4/l.components*l.byteLength;case sf:case rf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case of:case lf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ep:case Tp:return Math.max(r,16)*Math.max(e,8)/4;case Sp:case Mp:return Math.max(r,8)*Math.max(e,8)/2;case Ap:case wp:case Cp:case Np:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Rp:case df:case Op:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Dp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ip:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Up:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Pp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Fp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Bp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case zp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Gp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Hp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case kp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Vp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case jp:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Xp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Yp:case Wp:case qp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case $p:case Kp:return Math.ceil(r/4)*Math.ceil(e/4)*8;case hf:case Zp:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function NT(r){switch(r){case ha:case tb:return{byteLength:1,components:1};case pc:case nb:case Ds:return{byteLength:2,components:1};case om:case lm:return{byteLength:2,components:4};case Wa:case rm:case ka:return{byteLength:4,components:1};case ib:case ab:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sm}}));typeof window<"u"&&(window.__THREE__?gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sm);function yb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function OT(r){const e=new WeakMap;function i(h,p){const m=h.array,v=h.usage,_=m.byteLength,g=r.createBuffer();r.bindBuffer(p,g),r.bufferData(p,m,v),h.onUploadCallback();let y;if(m instanceof Float32Array)y=r.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)y=r.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?y=r.HALF_FLOAT:y=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)y=r.SHORT;else if(m instanceof Uint32Array)y=r.UNSIGNED_INT;else if(m instanceof Int32Array)y=r.INT;else if(m instanceof Int8Array)y=r.BYTE;else if(m instanceof Uint8Array)y=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)y=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:g,type:y,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:_}}function s(h,p,m){const v=p.array,_=p.updateRanges;if(r.bindBuffer(m,h),_.length===0)r.bufferSubData(m,0,v);else{_.sort((y,M)=>y.start-M.start);let g=0;for(let y=1;y<_.length;y++){const M=_[g],C=_[y];C.start<=M.start+M.count+1?M.count=Math.max(M.count,C.start+C.count-M.start):(++g,_[g]=C)}_.length=g+1;for(let y=0,M=_.length;y<M;y++){const C=_[y];r.bufferSubData(m,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(r.deleteBuffer(p.buffer),e.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=e.get(h);(!v||v.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:f}}var DT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,LT=`#ifdef USE_ALPHAHASH
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
#endif`,IT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,FT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,BT=`#ifdef USE_AOMAP
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
#endif`,zT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,GT=`#ifdef USE_BATCHING
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
#endif`,HT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,VT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,XT=`#ifdef USE_IRIDESCENCE
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
#endif`,YT=`#ifdef USE_BUMPMAP
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
#endif`,WT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$T=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ZT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,QT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,JT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,e1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,t1=`#define PI 3.141592653589793
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
} // validated`,n1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,i1=`vec3 transformedNormal = objectNormal;
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
#endif`,a1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,s1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,r1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,l1="gl_FragColor = linearToOutputTexel( gl_FragColor );",c1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u1=`#ifdef USE_ENVMAP
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
#endif`,f1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,d1=`#ifdef USE_ENVMAP
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
#endif`,h1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,p1=`#ifdef USE_ENVMAP
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
#endif`,m1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,g1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,x1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,v1=`#ifdef USE_GRADIENTMAP
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
}`,b1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,y1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,M1=`#ifdef USE_ENVMAP
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
#endif`,T1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,w1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,R1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,C1=`PhysicalMaterial material;
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
#endif`,N1=`uniform sampler2D dfgLUT;
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
}`,O1=`
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
#endif`,D1=`#if defined( RE_IndirectDiffuse )
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
#endif`,L1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,U1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,z1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,k1=`#if defined( USE_POINTS_UV )
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
#endif`,V1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,X1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q1=`#ifdef USE_MORPHTARGETS
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
#endif`,$1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tA=`#ifdef USE_NORMALMAP
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
#endif`,nA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xA=`float getShadowMask() {
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
}`,_A=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vA=`#ifdef USE_SKINNING
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
#endif`,bA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yA=`#ifdef USE_SKINNING
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
#endif`,SA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,EA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,MA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,TA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,AA=`#ifdef USE_TRANSMISSION
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
#endif`,wA=`#ifdef USE_TRANSMISSION
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
#endif`,RA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,OA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const DA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LA=`uniform sampler2D t2D;
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
}`,IA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,PA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BA=`#include <common>
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
}`,zA=`#if DEPTH_PACKING == 3200
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
}`,GA=`#define DISTANCE
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
}`,HA=`#define DISTANCE
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
}`,kA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,VA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jA=`uniform float scale;
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
}`,XA=`uniform vec3 diffuse;
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
}`,YA=`#include <common>
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
}`,WA=`uniform vec3 diffuse;
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
}`,qA=`#define LAMBERT
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
}`,$A=`#define LAMBERT
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
}`,KA=`#define MATCAP
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
}`,ZA=`#define MATCAP
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
}`,QA=`#define NORMAL
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
}`,JA=`#define NORMAL
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
}`,ew=`#define PHONG
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
}`,tw=`#define PHONG
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
}`,nw=`#define STANDARD
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
}`,iw=`#define STANDARD
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
}`,aw=`#define TOON
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
}`,sw=`#define TOON
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
}`,rw=`uniform float size;
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
}`,ow=`uniform vec3 diffuse;
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
}`,lw=`#include <common>
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
}`,cw=`uniform vec3 color;
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
}`,uw=`uniform float rotation;
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
}`,fw=`uniform vec3 diffuse;
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
}`,Nt={alphahash_fragment:DT,alphahash_pars_fragment:LT,alphamap_fragment:IT,alphamap_pars_fragment:UT,alphatest_fragment:PT,alphatest_pars_fragment:FT,aomap_fragment:BT,aomap_pars_fragment:zT,batching_pars_vertex:GT,batching_vertex:HT,begin_vertex:kT,beginnormal_vertex:VT,bsdfs:jT,iridescence_fragment:XT,bumpmap_pars_fragment:YT,clipping_planes_fragment:WT,clipping_planes_pars_fragment:qT,clipping_planes_pars_vertex:$T,clipping_planes_vertex:KT,color_fragment:ZT,color_pars_fragment:QT,color_pars_vertex:JT,color_vertex:e1,common:t1,cube_uv_reflection_fragment:n1,defaultnormal_vertex:i1,displacementmap_pars_vertex:a1,displacementmap_vertex:s1,emissivemap_fragment:r1,emissivemap_pars_fragment:o1,colorspace_fragment:l1,colorspace_pars_fragment:c1,envmap_fragment:u1,envmap_common_pars_fragment:f1,envmap_pars_fragment:d1,envmap_pars_vertex:h1,envmap_physical_pars_fragment:M1,envmap_vertex:p1,fog_vertex:m1,fog_pars_vertex:g1,fog_fragment:x1,fog_pars_fragment:_1,gradientmap_pars_fragment:v1,lightmap_pars_fragment:b1,lights_lambert_fragment:y1,lights_lambert_pars_fragment:S1,lights_pars_begin:E1,lights_toon_fragment:T1,lights_toon_pars_fragment:A1,lights_phong_fragment:w1,lights_phong_pars_fragment:R1,lights_physical_fragment:C1,lights_physical_pars_fragment:N1,lights_fragment_begin:O1,lights_fragment_maps:D1,lights_fragment_end:L1,lightprobes_pars_fragment:I1,logdepthbuf_fragment:U1,logdepthbuf_pars_fragment:P1,logdepthbuf_pars_vertex:F1,logdepthbuf_vertex:B1,map_fragment:z1,map_pars_fragment:G1,map_particle_fragment:H1,map_particle_pars_fragment:k1,metalnessmap_fragment:V1,metalnessmap_pars_fragment:j1,morphinstance_vertex:X1,morphcolor_vertex:Y1,morphnormal_vertex:W1,morphtarget_pars_vertex:q1,morphtarget_vertex:$1,normal_fragment_begin:K1,normal_fragment_maps:Z1,normal_pars_fragment:Q1,normal_pars_vertex:J1,normal_vertex:eA,normalmap_pars_fragment:tA,clearcoat_normal_fragment_begin:nA,clearcoat_normal_fragment_maps:iA,clearcoat_pars_fragment:aA,iridescence_pars_fragment:sA,opaque_fragment:rA,packing:oA,premultiplied_alpha_fragment:lA,project_vertex:cA,dithering_fragment:uA,dithering_pars_fragment:fA,roughnessmap_fragment:dA,roughnessmap_pars_fragment:hA,shadowmap_pars_fragment:pA,shadowmap_pars_vertex:mA,shadowmap_vertex:gA,shadowmask_pars_fragment:xA,skinbase_vertex:_A,skinning_pars_vertex:vA,skinning_vertex:bA,skinnormal_vertex:yA,specularmap_fragment:SA,specularmap_pars_fragment:EA,tonemapping_fragment:MA,tonemapping_pars_fragment:TA,transmission_fragment:AA,transmission_pars_fragment:wA,uv_pars_fragment:RA,uv_pars_vertex:CA,uv_vertex:NA,worldpos_vertex:OA,background_vert:DA,background_frag:LA,backgroundCube_vert:IA,backgroundCube_frag:UA,cube_vert:PA,cube_frag:FA,depth_vert:BA,depth_frag:zA,distance_vert:GA,distance_frag:HA,equirect_vert:kA,equirect_frag:VA,linedashed_vert:jA,linedashed_frag:XA,meshbasic_vert:YA,meshbasic_frag:WA,meshlambert_vert:qA,meshlambert_frag:$A,meshmatcap_vert:KA,meshmatcap_frag:ZA,meshnormal_vert:QA,meshnormal_frag:JA,meshphong_vert:ew,meshphong_frag:tw,meshphysical_vert:nw,meshphysical_frag:iw,meshtoon_vert:aw,meshtoon_frag:sw,points_vert:rw,points_frag:ow,shadow_vert:lw,shadow_frag:cw,sprite_vert:uw,sprite_frag:fw},Ye={common:{diffuse:{value:new mn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new St}},envmap:{envMap:{value:null},envMapRotation:{value:new St},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new St}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new St}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new St},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new St},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new St},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new St}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new St}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new St}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ie},probesMax:{value:new ie},probesResolution:{value:new ie}},points:{diffuse:{value:new mn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0},uvTransform:{value:new St}},sprite:{diffuse:{value:new mn(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}}},Ha={basic:{uniforms:Ai([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ai([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new mn(0)},envMapIntensity:{value:1}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ai([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new mn(0)},specular:{value:new mn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ai([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new mn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ai([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new mn(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ai([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ai([Ye.points,Ye.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ai([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ai([Ye.common,Ye.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ai([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ai([Ye.sprite,Ye.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new St},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new St}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distance:{uniforms:Ai([Ye.common,Ye.displacementmap,{referencePosition:{value:new ie},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distance_vert,fragmentShader:Nt.distance_frag},shadow:{uniforms:Ai([Ye.lights,Ye.fog,{color:{value:new mn(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Ha.physical={uniforms:Ai([Ha.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new St},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new St},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new St},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new St},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new St},sheen:{value:0},sheenColor:{value:new mn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new St},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new St},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new St},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new St},attenuationDistance:{value:0},attenuationColor:{value:new mn(0)},specularColor:{value:new mn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new St},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new St},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new St}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const Ku={r:0,b:0,g:0},dw=new Zn,Sb=new St;Sb.set(-1,0,0,0,1,0,0,0,1);function hw(r,e,i,s,l,c){const f=new mn(0);let h=l===!0?0:1,p,m,v=null,_=0,g=null;function y(N){let I=N.isScene===!0?N.background:null;if(I&&I.isTexture){const L=N.backgroundBlurriness>0;I=e.get(I,L)}return I}function M(N){let I=!1;const L=y(N);L===null?E(f,h):L&&L.isColor&&(E(L,1),I=!0);const V=r.xr.getEnvironmentBlendMode();V==="additive"?i.buffers.color.setClear(0,0,0,1,c):V==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(N,I){const L=y(I);L&&(L.isCubeTexture||L.mapping===_f)?(m===void 0&&(m=new qa(new bc(1,1,1),new $a({name:"BackgroundCubeMaterial",uniforms:sl(Ha.backgroundCube.uniforms),vertexShader:Ha.backgroundCube.vertexShader,fragmentShader:Ha.backgroundCube.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(V,D,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=L,m.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(dw.makeRotationFromEuler(I.backgroundRotation)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(Sb),m.material.toneMapped=jt.getTransfer(L.colorSpace)!==un,(v!==L||_!==L.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=L,_=L.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null)):L&&L.isTexture&&(p===void 0&&(p=new qa(new bf(2,2),new $a({name:"BackgroundMaterial",uniforms:sl(Ha.background.uniforms),vertexShader:Ha.background.vertexShader,fragmentShader:Ha.background.fragmentShader,side:xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=L,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.toneMapped=jt.getTransfer(L.colorSpace)!==un,L.matrixAutoUpdate===!0&&L.updateMatrix(),p.material.uniforms.uvTransform.value.copy(L.matrix),(v!==L||_!==L.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,v=L,_=L.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function E(N,I){N.getRGB(Ku,_b(r)),i.buffers.color.setClear(Ku.r,Ku.g,Ku.b,I,c)}function S(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,I=1){f.set(N),h=I,E(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,E(f,h)},render:M,addToRenderList:C,dispose:S}}function pw(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(k,X,he,oe,W){let U=!1;const G=_(k,oe,he,X);c!==G&&(c=G,m(c.object)),U=y(k,oe,he,W),U&&M(k,oe,he,W),W!==null&&e.update(W,r.ELEMENT_ARRAY_BUFFER),(U||f)&&(f=!1,L(k,X,he,oe),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function p(){return r.createVertexArray()}function m(k){return r.bindVertexArray(k)}function v(k){return r.deleteVertexArray(k)}function _(k,X,he,oe){const W=oe.wireframe===!0;let U=s[X.id];U===void 0&&(U={},s[X.id]=U);const G=k.isInstancedMesh===!0?k.id:0;let ee=U[G];ee===void 0&&(ee={},U[G]=ee);let ge=ee[he.id];ge===void 0&&(ge={},ee[he.id]=ge);let Me=ge[W];return Me===void 0&&(Me=g(p()),ge[W]=Me),Me}function g(k){const X=[],he=[],oe=[];for(let W=0;W<i;W++)X[W]=0,he[W]=0,oe[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:he,attributeDivisors:oe,object:k,attributes:{},index:null}}function y(k,X,he,oe){const W=c.attributes,U=X.attributes;let G=0;const ee=he.getAttributes();for(const ge in ee)if(ee[ge].location>=0){const P=W[ge];let J=U[ge];if(J===void 0&&(ge==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),ge==="instanceColor"&&k.instanceColor&&(J=k.instanceColor)),P===void 0||P.attribute!==J||J&&P.data!==J.data)return!0;G++}return c.attributesNum!==G||c.index!==oe}function M(k,X,he,oe){const W={},U=X.attributes;let G=0;const ee=he.getAttributes();for(const ge in ee)if(ee[ge].location>=0){let P=U[ge];P===void 0&&(ge==="instanceMatrix"&&k.instanceMatrix&&(P=k.instanceMatrix),ge==="instanceColor"&&k.instanceColor&&(P=k.instanceColor));const J={};J.attribute=P,P&&P.data&&(J.data=P.data),W[ge]=J,G++}c.attributes=W,c.attributesNum=G,c.index=oe}function C(){const k=c.newAttributes;for(let X=0,he=k.length;X<he;X++)k[X]=0}function E(k){S(k,0)}function S(k,X){const he=c.newAttributes,oe=c.enabledAttributes,W=c.attributeDivisors;he[k]=1,oe[k]===0&&(r.enableVertexAttribArray(k),oe[k]=1),W[k]!==X&&(r.vertexAttribDivisor(k,X),W[k]=X)}function N(){const k=c.newAttributes,X=c.enabledAttributes;for(let he=0,oe=X.length;he<oe;he++)X[he]!==k[he]&&(r.disableVertexAttribArray(he),X[he]=0)}function I(k,X,he,oe,W,U,G){G===!0?r.vertexAttribIPointer(k,X,he,W,U):r.vertexAttribPointer(k,X,he,oe,W,U)}function L(k,X,he,oe){C();const W=oe.attributes,U=he.getAttributes(),G=X.defaultAttributeValues;for(const ee in U){const ge=U[ee];if(ge.location>=0){let Me=W[ee];if(Me===void 0&&(ee==="instanceMatrix"&&k.instanceMatrix&&(Me=k.instanceMatrix),ee==="instanceColor"&&k.instanceColor&&(Me=k.instanceColor)),Me!==void 0){const P=Me.normalized,J=Me.itemSize,be=e.get(Me);if(be===void 0)continue;const Ne=be.buffer,Pe=be.type,ae=be.bytesPerElement,Se=Pe===r.INT||Pe===r.UNSIGNED_INT||Me.gpuType===rm;if(Me.isInterleavedBufferAttribute){const ye=Me.data,We=ye.stride,tt=Me.offset;if(ye.isInstancedInterleavedBuffer){for(let rt=0;rt<ge.locationSize;rt++)S(ge.location+rt,ye.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let rt=0;rt<ge.locationSize;rt++)E(ge.location+rt);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let rt=0;rt<ge.locationSize;rt++)I(ge.location+rt,J/ge.locationSize,Pe,P,We*ae,(tt+J/ge.locationSize*rt)*ae,Se)}else{if(Me.isInstancedBufferAttribute){for(let ye=0;ye<ge.locationSize;ye++)S(ge.location+ye,Me.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let ye=0;ye<ge.locationSize;ye++)E(ge.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let ye=0;ye<ge.locationSize;ye++)I(ge.location+ye,J/ge.locationSize,Pe,P,J*ae,J/ge.locationSize*ye*ae,Se)}}else if(G!==void 0){const P=G[ee];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ge.location,P);break;case 3:r.vertexAttrib3fv(ge.location,P);break;case 4:r.vertexAttrib4fv(ge.location,P);break;default:r.vertexAttrib1fv(ge.location,P)}}}}N()}function V(){F();for(const k in s){const X=s[k];for(const he in X){const oe=X[he];for(const W in oe){const U=oe[W];for(const G in U)v(U[G].object),delete U[G];delete oe[W]}}delete s[k]}}function D(k){if(s[k.id]===void 0)return;const X=s[k.id];for(const he in X){const oe=X[he];for(const W in oe){const U=oe[W];for(const G in U)v(U[G].object),delete U[G];delete oe[W]}}delete s[k.id]}function B(k){for(const X in s){const he=s[X];for(const oe in he){const W=he[oe];if(W[k.id]===void 0)continue;const U=W[k.id];for(const G in U)v(U[G].object),delete U[G];delete W[k.id]}}}function A(k){for(const X in s){const he=s[X],oe=k.isInstancedMesh===!0?k.id:0,W=he[oe];if(W!==void 0){for(const U in W){const G=W[U];for(const ee in G)v(G[ee].object),delete G[ee];delete W[U]}delete he[oe],Object.keys(he).length===0&&delete s[X]}}}function F(){$(),f=!0,c!==l&&(c=l,m(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:$,dispose:V,releaseStatesOfGeometry:D,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:C,enableAttribute:E,disableUnusedAttributes:N}}function mw(r,e,i){let s;function l(p){s=p}function c(p,m){r.drawArrays(s,p,m),i.update(m,s,1)}function f(p,m,v){v!==0&&(r.drawArraysInstanced(s,p,m,v),i.update(m,s,v))}function h(p,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,m,0,v);let g=0;for(let y=0;y<v;y++)g+=m[y];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function gw(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==Ra&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const A=B===Ds&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==ha&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==ka&&!A)}function p(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(gt("WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),L=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),V=r.getParameter(r.MAX_SAMPLES),D=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:y,maxVertexTextures:M,maxTextureSize:C,maxCubemapSize:E,maxAttributes:S,maxVertexUniforms:N,maxVaryings:I,maxFragmentUniforms:L,maxSamples:V,samples:D}}function xw(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new hr,h=new St,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const y=_.length!==0||g||s!==0||l;return l=g,s=_.length,y},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=v(_,g,0)},this.setState=function(_,g,y){const M=_.clippingPlanes,C=_.clipIntersection,E=_.clipShadows,S=r.get(_);if(!l||M===null||M.length===0||c&&!E)c?v(null):m();else{const N=c?0:s,I=N*4;let L=S.clippingState||null;p.value=L,L=v(M,g,I,y);for(let V=0;V!==I;++V)L[V]=i[V];S.clippingState=L,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(_,g,y,M){const C=_!==null?_.length:0;let E=null;if(C!==0){if(E=p.value,M!==!0||E===null){const S=y+C*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(E===null||E.length<S)&&(E=new Float32Array(S));for(let I=0,L=y;I!==C;++I,L+=4)f.copy(_[I]).applyMatrix4(N,h),f.normal.toArray(E,L),E[L+3]=f.constant}p.value=E,p.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,E}}const mr=4,lv=[.125,.215,.35,.446,.526,.582],Xr=20,_w=256,oc=new bb,cv=new mn;let tp=null,np=0,ip=0,ap=!1;const vw=new ie;class uv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=vw}=c;tp=this._renderer.getRenderTarget(),np=this._renderer.getActiveCubeFace(),ip=this._renderer.getActiveMipmapLevel(),ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,h),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(tp,np,ip),this._renderer.xr.enabled=ap,e.scissorTest=!1,Ko(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===$r||e.mapping===il?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tp=this._renderer.getRenderTarget(),np=this._renderer.getActiveCubeFace(),ip=this._renderer.getActiveMipmapLevel(),ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:Ds,format:Ra,colorSpace:pf,depthBuffer:!1},l=fv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bw(c)),this._blurMaterial=Sw(c,e,i),this._ggxMaterial=yw(c,e,i)}return l}_compileMaterial(e){const i=new qa(new Ka,e);this._renderer.compile(i,oc)}_sceneToCubeUV(e,i,s,l,c){const p=new da(90,1,i,s),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,y=_.toneMapping;_.getClearColor(cv),_.toneMapping=ja,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qa(new bc,new gm({name:"PMREM.Background",side:Pi,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,E=C.material;let S=!1;const N=e.background;N?N.isColor&&(E.color.copy(N),e.background=null,S=!0):(E.color.copy(cv),S=!0);for(let I=0;I<6;I++){const L=I%3;L===0?(p.up.set(0,m[I],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x+v[I],c.y,c.z)):L===1?(p.up.set(0,0,m[I]),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y+v[I],c.z)):(p.up.set(0,m[I],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y,c.z+v[I]));const V=this._cubeSize;Ko(l,L*V,I>2?V:0,V,V),_.setRenderTarget(l),S&&_.render(C,p),_.render(e,p)}_.toneMapping=y,_.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===$r||e.mapping===il;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=hv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const p=this._cubeSize;Ko(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(f,oc)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const p=f.uniforms,m=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),_=Math.sqrt(m*m-v*v),g=0+m*1.25,y=_*g,{_lodMax:M}=this,C=this._sizeLods[s],E=3*C*(s>M-mr?s-M+mr:0),S=4*(this._cubeSize-C);p.envMap.value=e.texture,p.roughness.value=y,p.mipInt.value=M-i,Ko(c,E,S,3*C,2*C),l.setRenderTarget(c),l.render(h,oc),p.envMap.value=c.texture,p.roughness.value=0,p.mipInt.value=M-s,Ko(e,E,S,3*C,2*C),l.setRenderTarget(e),l.render(h,oc)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&$t("blur direction must be either latitudinal or longitudinal!");const v=3,_=this._lodMeshes[l];_.material=m;const g=m.uniforms,y=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*Xr-1),C=c/M,E=isFinite(c)?1+Math.floor(v*C):Xr;E>Xr&&gt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Xr}`);const S=[];let N=0;for(let B=0;B<Xr;++B){const A=B/C,F=Math.exp(-A*A/2);S.push(F),B===0?N+=F:B<E&&(N+=2*F)}for(let B=0;B<S.length;B++)S[B]=S[B]/N;g.envMap.value=e.texture,g.samples.value=E,g.weights.value=S,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:I}=this;g.dTheta.value=M,g.mipInt.value=I-s;const L=this._sizeLods[l],V=3*L*(l>I-mr?l-I+mr:0),D=4*(this._cubeSize-L);Ko(i,V,D,3*L,2*L),p.setRenderTarget(i),p.render(_,oc)}}function bw(r){const e=[],i=[],s=[];let l=r;const c=r-mr+1+lv.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let p=1/h;f>r-mr?p=lv[f-r+mr-1]:f===0&&(p=0),i.push(p);const m=1/(h-2),v=-m,_=1+m,g=[v,v,_,v,_,_,v,v,_,_,v,_],y=6,M=6,C=3,E=2,S=1,N=new Float32Array(C*M*y),I=new Float32Array(E*M*y),L=new Float32Array(S*M*y);for(let D=0;D<y;D++){const B=D%3*2/3-1,A=D>2?0:-1,F=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];N.set(F,C*M*D),I.set(g,E*M*D);const $=[D,D,D,D,D,D];L.set($,S*M*D)}const V=new Ka;V.setAttribute("position",new Ya(N,C)),V.setAttribute("uv",new Ya(I,E)),V.setAttribute("faceIndex",new Ya(L,S)),s.push(new qa(V,null)),l>mr&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function fv(r,e,i){const s=new Xa(r,e,i);return s.texture.mapping=_f,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Ko(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function yw(r,e,i){return new $a({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_w,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yf(),fragmentShader:`

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
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function Sw(r,e,i){const s=new Float32Array(Xr),l=new ie(0,1,0);return new $a({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:yf(),fragmentShader:`

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
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function dv(){return new $a({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yf(),fragmentShader:`

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
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function hv(){return new $a({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function yf(){return`

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
	`}class Eb extends Xa{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new gb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new bc(5,5,5),c=new $a({name:"CubemapFromEquirect",uniforms:sl(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Pi,blending:Ns});c.uniforms.tEquirect.value=i;const f=new qa(l,c),h=i.minFilter;return i.minFilter===Yr&&(i.minFilter=Si),new wT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function Ew(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,y=!1){return g==null?null:y?f(g):c(g)}function c(g){if(g&&g.isTexture){const y=g.mapping;if(y===af||y===Ch)if(e.has(g)){const M=e.get(g).texture;return h(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const C=new Eb(M.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",m),h(C.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const y=g.mapping,M=y===af||y===Ch,C=y===$r||y===il;if(M||C){let E=i.get(g);const S=E!==void 0?E.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new uv(r)),E=M?s.fromEquirectangular(g,E):s.fromCubemap(g,E),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),E.texture;if(E!==void 0)return E.texture;{const N=g.image;return M&&N&&N.height>0||C&&N&&p(N)?(s===null&&(s=new uv(r)),E=M?s.fromEquirectangular(g):s.fromCubemap(g),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),g.addEventListener("dispose",v),E.texture):null}}}return g}function h(g,y){return y===af?g.mapping=$r:y===Ch&&(g.mapping=il),g}function p(g){let y=0;const M=6;for(let C=0;C<M;C++)g[C]!==void 0&&y++;return y===M}function m(g){const y=g.target;y.removeEventListener("dispose",m);const M=e.get(y);M!==void 0&&(e.delete(y),M.dispose())}function v(g){const y=g.target;y.removeEventListener("dispose",v);const M=i.get(y);M!==void 0&&(i.delete(y),M.dispose())}function _(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:_}}function Mw(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Qp("WebGLRenderer: "+s+" extension not supported."),l}}}function Tw(r,e,i,s){const l={},c=new WeakMap;function f(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",f),delete l[g.id];const y=c.get(g);y&&(e.remove(y),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(_,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function p(_){const g=_.attributes;for(const y in g)e.update(g[y],r.ARRAY_BUFFER)}function m(_){const g=[],y=_.index,M=_.attributes.position;let C=0;if(M===void 0)return;if(y!==null){const N=y.array;C=y.version;for(let I=0,L=N.length;I<L;I+=3){const V=N[I+0],D=N[I+1],B=N[I+2];g.push(V,D,D,B,B,V)}}else{const N=M.array;C=M.version;for(let I=0,L=N.length/3-1;I<L;I+=3){const V=I+0,D=I+1,B=I+2;g.push(V,D,D,B,B,V)}}const E=new(M.count>=65535?hb:db)(g,1);E.version=C;const S=c.get(_);S&&e.remove(S),c.set(_,E)}function v(_){const g=c.get(_);if(g){const y=_.index;y!==null&&g.version<y.version&&m(_)}else m(_);return c.get(_)}return{get:h,update:p,getWireframeAttribute:v}}function Aw(r,e,i){let s;function l(_){s=_}let c,f;function h(_){c=_.type,f=_.bytesPerElement}function p(_,g){r.drawElements(s,g,c,_*f),i.update(g,s,1)}function m(_,g,y){y!==0&&(r.drawElementsInstanced(s,g,c,_*f,y),i.update(g,s,y))}function v(_,g,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,_,0,y);let C=0;for(let E=0;E<y;E++)C+=g[E];i.update(C,s,1)}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=v}function ww(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:$t("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Rw(r,e,i){const s=new WeakMap,l=new Bn;function c(f,h,p){const m=f.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let g=s.get(h);if(g===void 0||g.count!==_){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const y=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let I=0;y===!0&&(I=1),M===!0&&(I=2),C===!0&&(I=3);let L=h.attributes.position.count*I,V=1;L>e.maxTextureSize&&(V=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const D=new Float32Array(L*V*4*_),B=new cb(D,L,V,_);B.type=ka,B.needsUpdate=!0;const A=I*4;for(let $=0;$<_;$++){const k=E[$],X=S[$],he=N[$],oe=L*V*4*$;for(let W=0;W<k.count;W++){const U=W*A;y===!0&&(l.fromBufferAttribute(k,W),D[oe+U+0]=l.x,D[oe+U+1]=l.y,D[oe+U+2]=l.z,D[oe+U+3]=0),M===!0&&(l.fromBufferAttribute(X,W),D[oe+U+4]=l.x,D[oe+U+5]=l.y,D[oe+U+6]=l.z,D[oe+U+7]=0),C===!0&&(l.fromBufferAttribute(he,W),D[oe+U+8]=l.x,D[oe+U+9]=l.y,D[oe+U+10]=l.z,D[oe+U+11]=he.itemSize===4?l.w:1)}}g={count:_,texture:B,size:new Ot(L,V)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let y=0;for(let C=0;C<m.length;C++)y+=m[C];const M=h.morphTargetsRelative?1:1-y;p.getUniforms().setValue(r,"morphTargetBaseInfluence",M),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),p.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function Cw(r,e,i,s,l){let c=new WeakMap;function f(m){const v=l.render.frame,_=m.geometry,g=e.get(m,_);if(c.get(g)!==v&&(e.update(g),c.set(g,v)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),c.get(m)!==v&&(i.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,r.ARRAY_BUFFER),c.set(m,v))),m.isSkinnedMesh){const y=m.skeleton;c.get(y)!==v&&(y.update(),c.set(y,v))}return g}function h(){c=new WeakMap}function p(m){const v=m.target;v.removeEventListener("dispose",p),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:f,dispose:h}}const Nw={[Wv]:"LINEAR_TONE_MAPPING",[qv]:"REINHARD_TONE_MAPPING",[$v]:"CINEON_TONE_MAPPING",[Kv]:"ACES_FILMIC_TONE_MAPPING",[Qv]:"AGX_TONE_MAPPING",[Jv]:"NEUTRAL_TONE_MAPPING",[Zv]:"CUSTOM_TONE_MAPPING"};function Ow(r,e,i,s,l){const c=new Xa(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new al(e,i):void 0}),f=new Xa(e,i,{type:Ds,depthBuffer:!1,stencilBuffer:!1}),h=new Ka;h.setAttribute("position",new pa([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new pa([0,2,0,0,2,0],2));const p=new bT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),m=new qa(h,p),v=new bb(-1,1,1,-1,0,1);let _=null,g=null,y=!1,M,C=null,E=[],S=!1;this.setSize=function(N,I){c.setSize(N,I),f.setSize(N,I);for(let L=0;L<E.length;L++){const V=E[L];V.setSize&&V.setSize(N,I)}},this.setEffects=function(N){E=N,S=E.length>0&&E[0].isRenderPass===!0;const I=c.width,L=c.height;for(let V=0;V<E.length;V++){const D=E[V];D.setSize&&D.setSize(I,L)}},this.begin=function(N,I){if(y||N.toneMapping===ja&&E.length===0)return!1;if(C=I,I!==null){const L=I.width,V=I.height;(c.width!==L||c.height!==V)&&this.setSize(L,V)}return S===!1&&N.setRenderTarget(c),M=N.toneMapping,N.toneMapping=ja,!0},this.hasRenderPass=function(){return S},this.end=function(N,I){N.toneMapping=M,y=!0;let L=c,V=f;for(let D=0;D<E.length;D++){const B=E[D];if(B.enabled!==!1&&(B.render(N,V,L,I),B.needsSwap!==!1)){const A=L;L=V,V=A}}if(_!==N.outputColorSpace||g!==N.toneMapping){_=N.outputColorSpace,g=N.toneMapping,p.defines={},jt.getTransfer(_)===un&&(p.defines.SRGB_TRANSFER="");const D=Nw[g];D&&(p.defines[D]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=L.texture,N.setRenderTarget(C),N.render(m,v),C=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),p.dispose()}}const Mb=new Ei,em=new al(1,1),Tb=new cb,Ab=new ZM,wb=new gb,pv=[],mv=[],gv=new Float32Array(16),xv=new Float32Array(9),_v=new Float32Array(4);function rl(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=pv[l];if(c===void 0&&(c=new Float32Array(l),pv[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function Qn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function Jn(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Sf(r,e){let i=mv[e];i===void 0&&(i=new Int32Array(e),mv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function Dw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function Lw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Qn(i,e))return;r.uniform2fv(this.addr,e),Jn(i,e)}}function Iw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Qn(i,e))return;r.uniform3fv(this.addr,e),Jn(i,e)}}function Uw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Qn(i,e))return;r.uniform4fv(this.addr,e),Jn(i,e)}}function Pw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Qn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),Jn(i,e)}else{if(Qn(i,s))return;_v.set(s),r.uniformMatrix2fv(this.addr,!1,_v),Jn(i,s)}}function Fw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Qn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),Jn(i,e)}else{if(Qn(i,s))return;xv.set(s),r.uniformMatrix3fv(this.addr,!1,xv),Jn(i,s)}}function Bw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Qn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),Jn(i,e)}else{if(Qn(i,s))return;gv.set(s),r.uniformMatrix4fv(this.addr,!1,gv),Jn(i,s)}}function zw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function Gw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Qn(i,e))return;r.uniform2iv(this.addr,e),Jn(i,e)}}function Hw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Qn(i,e))return;r.uniform3iv(this.addr,e),Jn(i,e)}}function kw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Qn(i,e))return;r.uniform4iv(this.addr,e),Jn(i,e)}}function Vw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Qn(i,e))return;r.uniform2uiv(this.addr,e),Jn(i,e)}}function Xw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Qn(i,e))return;r.uniform3uiv(this.addr,e),Jn(i,e)}}function Yw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Qn(i,e))return;r.uniform4uiv(this.addr,e),Jn(i,e)}}function Ww(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(em.compareFunction=i.isReversedDepthBuffer()?hm:dm,c=em):c=Mb,i.setTexture2D(e||c,l)}function qw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Ab,l)}function $w(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||wb,l)}function Kw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||Tb,l)}function Zw(r){switch(r){case 5126:return Dw;case 35664:return Lw;case 35665:return Iw;case 35666:return Uw;case 35674:return Pw;case 35675:return Fw;case 35676:return Bw;case 5124:case 35670:return zw;case 35667:case 35671:return Gw;case 35668:case 35672:return Hw;case 35669:case 35673:return kw;case 5125:return Vw;case 36294:return jw;case 36295:return Xw;case 36296:return Yw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ww;case 35679:case 36299:case 36307:return qw;case 35680:case 36300:case 36308:case 36293:return $w;case 36289:case 36303:case 36311:case 36292:return Kw}}function Qw(r,e){r.uniform1fv(this.addr,e)}function Jw(r,e){const i=rl(e,this.size,2);r.uniform2fv(this.addr,i)}function eR(r,e){const i=rl(e,this.size,3);r.uniform3fv(this.addr,i)}function tR(r,e){const i=rl(e,this.size,4);r.uniform4fv(this.addr,i)}function nR(r,e){const i=rl(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function iR(r,e){const i=rl(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function aR(r,e){const i=rl(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function sR(r,e){r.uniform1iv(this.addr,e)}function rR(r,e){r.uniform2iv(this.addr,e)}function oR(r,e){r.uniform3iv(this.addr,e)}function lR(r,e){r.uniform4iv(this.addr,e)}function cR(r,e){r.uniform1uiv(this.addr,e)}function uR(r,e){r.uniform2uiv(this.addr,e)}function fR(r,e){r.uniform3uiv(this.addr,e)}function dR(r,e){r.uniform4uiv(this.addr,e)}function hR(r,e,i){const s=this.cache,l=e.length,c=Sf(i,l);Qn(s,c)||(r.uniform1iv(this.addr,c),Jn(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=em:f=Mb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function pR(r,e,i){const s=this.cache,l=e.length,c=Sf(i,l);Qn(s,c)||(r.uniform1iv(this.addr,c),Jn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||Ab,c[f])}function mR(r,e,i){const s=this.cache,l=e.length,c=Sf(i,l);Qn(s,c)||(r.uniform1iv(this.addr,c),Jn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||wb,c[f])}function gR(r,e,i){const s=this.cache,l=e.length,c=Sf(i,l);Qn(s,c)||(r.uniform1iv(this.addr,c),Jn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||Tb,c[f])}function xR(r){switch(r){case 5126:return Qw;case 35664:return Jw;case 35665:return eR;case 35666:return tR;case 35674:return nR;case 35675:return iR;case 35676:return aR;case 5124:case 35670:return sR;case 35667:case 35671:return rR;case 35668:case 35672:return oR;case 35669:case 35673:return lR;case 5125:return cR;case 36294:return uR;case 36295:return fR;case 36296:return dR;case 35678:case 36198:case 36298:case 36306:case 35682:return hR;case 35679:case 36299:case 36307:return pR;case 35680:case 36300:case 36308:case 36293:return mR;case 36289:case 36303:case 36311:case 36292:return gR}}class _R{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Zw(i.type)}}class vR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=xR(i.type)}}class bR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const sp=/(\w+)(\])?(\[|\.)?/g;function vv(r,e){r.seq.push(e),r.map[e.id]=e}function yR(r,e,i){const s=r.name,l=s.length;for(sp.lastIndex=0;;){const c=sp.exec(s),f=sp.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){vv(i,m===void 0?new _R(h,r,e):new vR(h,r,e));break}else{let _=i.map[h];_===void 0&&(_=new bR(h),vv(i,_)),i=_}}}class uf{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),p=e.getUniformLocation(i,h.name);yR(h,p,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function bv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const SR=37297;let ER=0;function MR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const yv=new St;function TR(r){jt._getMatrix(yv,jt.workingColorSpace,r);const e=`mat3( ${yv.elements.map(i=>i.toFixed(4))} )`;switch(jt.getTransfer(r)){case mf:return[e,"LinearTransferOETF"];case un:return[e,"sRGBTransferOETF"];default:return gt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Sv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+MR(r.getShaderSource(e),h)}else return c}function AR(r,e){const i=TR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const wR={[Wv]:"Linear",[qv]:"Reinhard",[$v]:"Cineon",[Kv]:"ACESFilmic",[Qv]:"AgX",[Jv]:"Neutral",[Zv]:"Custom"};function RR(r,e){const i=wR[e];return i===void 0?(gt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Zu=new ie;function CR(){jt.getLuminanceCoefficients(Zu);const r=Zu.x.toFixed(4),e=Zu.y.toFixed(4),i=Zu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(uc).join(`
`)}function OR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function DR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function uc(r){return r!==""}function Ev(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mv(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const LR=/^[ \t]*#include +<([\w\d./]+)>/gm;function tm(r){return r.replace(LR,UR)}const IR=new Map;function UR(r,e){let i=Nt[e];if(i===void 0){const s=IR.get(e);if(s!==void 0)i=Nt[s],gt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return tm(i)}const PR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tv(r){return r.replace(PR,FR)}function FR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Av(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const BR={[nf]:"SHADOWMAP_TYPE_PCF",[cc]:"SHADOWMAP_TYPE_VSM"};function zR(r){return BR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const GR={[$r]:"ENVMAP_TYPE_CUBE",[il]:"ENVMAP_TYPE_CUBE",[_f]:"ENVMAP_TYPE_CUBE_UV"};function HR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":GR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const kR={[il]:"ENVMAP_MODE_REFRACTION"};function VR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":kR[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jR={[Yv]:"ENVMAP_BLENDING_MULTIPLY",[CM]:"ENVMAP_BLENDING_MIX",[NM]:"ENVMAP_BLENDING_ADD"};function XR(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":jR[r.combine]||"ENVMAP_BLENDING_NONE"}function YR(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function WR(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const p=zR(i),m=HR(i),v=VR(i),_=XR(i),g=YR(i),y=NR(i),M=OR(c),C=l.createProgram();let E,S,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(uc).join(`
`),E.length>0&&(E+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(uc).join(`
`),S.length>0&&(S+=`
`)):(E=[Av(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uc).join(`
`),S=[Av(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ja?"#define TONE_MAPPING":"",i.toneMapping!==ja?Nt.tonemapping_pars_fragment:"",i.toneMapping!==ja?RR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,AR("linearToOutputTexel",i.outputColorSpace),CR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(uc).join(`
`)),f=tm(f),f=Ev(f,i),f=Mv(f,i),h=tm(h),h=Ev(h,i),h=Mv(h,i),f=Tv(f),h=Tv(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,E=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,S=["#define varying in",i.glslVersion===B_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===B_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const I=N+E+f,L=N+S+h,V=bv(l,l.VERTEX_SHADER,I),D=bv(l,l.FRAGMENT_SHADER,L);l.attachShader(C,V),l.attachShader(C,D),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function B(k){if(r.debug.checkShaderErrors){const X=l.getProgramInfoLog(C)||"",he=l.getShaderInfoLog(V)||"",oe=l.getShaderInfoLog(D)||"",W=X.trim(),U=he.trim(),G=oe.trim();let ee=!0,ge=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(ee=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,V,D);else{const Me=Sv(l,V,"vertex"),P=Sv(l,D,"fragment");$t("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+W+`
`+Me+`
`+P)}else W!==""?gt("WebGLProgram: Program Info Log:",W):(U===""||G==="")&&(ge=!1);ge&&(k.diagnostics={runnable:ee,programLog:W,vertexShader:{log:U,prefix:E},fragmentShader:{log:G,prefix:S}})}l.deleteShader(V),l.deleteShader(D),A=new uf(l,C),F=DR(l,C)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let $=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return $===!1&&($=l.getProgramParameter(C,SR)),$},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=ER++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=V,this.fragmentShader=D,this}let qR=0;class $R{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new KR(e),i.set(e,s)),s}}class KR{constructor(e){this.id=qR++,this.code=e,this.usedTimes=0}}function ZR(r){return r===Kr||r===df||r===hf}function QR(r,e,i,s,l,c){const f=new ub,h=new $R,p=new Set,m=[],v=new Map,_=s.logarithmicDepthBuffer;let g=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return p.add(A),A===0?"uv":`uv${A}`}function C(A,F,$,k,X,he){const oe=k.fog,W=X.geometry,U=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?k.environment:null,G=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,ee=e.get(A.envMap||U,G),ge=ee&&ee.mapping===_f?ee.image.height:null,Me=y[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&gt("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const P=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,J=P!==void 0?P.length:0;let be=0;W.morphAttributes.position!==void 0&&(be=1),W.morphAttributes.normal!==void 0&&(be=2),W.morphAttributes.color!==void 0&&(be=3);let Ne,Pe,ae,Se;if(Me){const ut=Ha[Me];Ne=ut.vertexShader,Pe=ut.fragmentShader}else Ne=A.vertexShader,Pe=A.fragmentShader,h.update(A),ae=h.getVertexShaderID(A),Se=h.getFragmentShaderID(A);const ye=r.getRenderTarget(),We=r.state.buffers.depth.getReversed(),tt=X.isInstancedMesh===!0,rt=X.isBatchedMesh===!0,Dt=!!A.map,Et=!!A.matcap,Ut=!!ee,Kt=!!A.aoMap,vt=!!A.lightMap,Zt=!!A.bumpMap,rn=!!A.normalMap,Lt=!!A.displacementMap,Y=!!A.emissiveMap,Xt=!!A.metalnessMap,Tt=!!A.roughnessMap,tn=A.anisotropy>0,Ie=A.clearcoat>0,Sn=A.dispersion>0,O=A.iridescence>0,T=A.sheen>0,Q=A.transmission>0,pe=tn&&!!A.anisotropyMap,Ee=Ie&&!!A.clearcoatMap,Ue=Ie&&!!A.clearcoatNormalMap,Be=Ie&&!!A.clearcoatRoughnessMap,ue=O&&!!A.iridescenceMap,me=O&&!!A.iridescenceThicknessMap,Ae=T&&!!A.sheenColorMap,ze=T&&!!A.sheenRoughnessMap,Fe=!!A.specularMap,Ce=!!A.specularColorMap,ht=!!A.specularIntensityMap,at=Q&&!!A.transmissionMap,Rt=Q&&!!A.thicknessMap,H=!!A.gradientMap,Oe=!!A.alphaMap,fe=A.alphaTest>0,Xe=!!A.alphaHash,Le=!!A.extensions;let Te=ja;A.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Te=r.toneMapping);const qe={shaderID:Me,shaderType:A.type,shaderName:A.name,vertexShader:Ne,fragmentShader:Pe,defines:A.defines,customVertexShaderID:ae,customFragmentShaderID:Se,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:rt,batchingColor:rt&&X._colorsTexture!==null,instancing:tt,instancingColor:tt&&X.instanceColor!==null,instancingMorph:tt&&X.morphTexture!==null,outputColorSpace:ye===null?r.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:Dt,matcap:Et,envMap:Ut,envMapMode:Ut&&ee.mapping,envMapCubeUVHeight:ge,aoMap:Kt,lightMap:vt,bumpMap:Zt,normalMap:rn,displacementMap:Lt,emissiveMap:Y,normalMapObjectSpace:rn&&A.normalMapType===LM,normalMapTangentSpace:rn&&A.normalMapType===U_,packedNormalMap:rn&&A.normalMapType===U_&&ZR(A.normalMap.format),metalnessMap:Xt,roughnessMap:Tt,anisotropy:tn,anisotropyMap:pe,clearcoat:Ie,clearcoatMap:Ee,clearcoatNormalMap:Ue,clearcoatRoughnessMap:Be,dispersion:Sn,iridescence:O,iridescenceMap:ue,iridescenceThicknessMap:me,sheen:T,sheenColorMap:Ae,sheenRoughnessMap:ze,specularMap:Fe,specularColorMap:Ce,specularIntensityMap:ht,transmission:Q,transmissionMap:at,thicknessMap:Rt,gradientMap:H,opaque:A.transparent===!1&&A.blending===Jo&&A.alphaToCoverage===!1,alphaMap:Oe,alphaTest:fe,alphaHash:Xe,combine:A.combine,mapUv:Dt&&M(A.map.channel),aoMapUv:Kt&&M(A.aoMap.channel),lightMapUv:vt&&M(A.lightMap.channel),bumpMapUv:Zt&&M(A.bumpMap.channel),normalMapUv:rn&&M(A.normalMap.channel),displacementMapUv:Lt&&M(A.displacementMap.channel),emissiveMapUv:Y&&M(A.emissiveMap.channel),metalnessMapUv:Xt&&M(A.metalnessMap.channel),roughnessMapUv:Tt&&M(A.roughnessMap.channel),anisotropyMapUv:pe&&M(A.anisotropyMap.channel),clearcoatMapUv:Ee&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:me&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:ze&&M(A.sheenRoughnessMap.channel),specularMapUv:Fe&&M(A.specularMap.channel),specularColorMapUv:Ce&&M(A.specularColorMap.channel),specularIntensityMapUv:ht&&M(A.specularIntensityMap.channel),transmissionMapUv:at&&M(A.transmissionMap.channel),thicknessMapUv:Rt&&M(A.thicknessMap.channel),alphaMapUv:Oe&&M(A.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(rn||tn),vertexNormals:!!W.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!W.attributes.uv&&(Dt||Oe),fog:!!oe,useFog:A.fog===!0,fogExp2:!!oe&&oe.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||W.attributes.normal===void 0&&rn===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:We,skinning:X.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:be,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:he.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&$.length>0,shadowMapType:r.shadowMap.type,toneMapping:Te,decodeVideoTexture:Dt&&A.map.isVideoTexture===!0&&jt.getTransfer(A.map.colorSpace)===un,decodeVideoTextureEmissive:Y&&A.emissiveMap.isVideoTexture===!0&&jt.getTransfer(A.emissiveMap.colorSpace)===un,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Rs,flipSided:A.side===Pi,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Le&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&A.extensions.multiDraw===!0||rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return qe.vertexUv1s=p.has(1),qe.vertexUv2s=p.has(2),qe.vertexUv3s=p.has(3),p.clear(),qe}function E(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const $ in A.defines)F.push($),F.push(A.defines[$]);return A.isRawShaderMaterial===!1&&(S(F,A),N(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function S(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function N(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function I(A){const F=y[A.type];let $;if(F){const k=Ha[F];$=xT.clone(k.uniforms)}else $=A.uniforms;return $}function L(A,F){let $=v.get(F);return $!==void 0?++$.usedTimes:($=new WR(r,F,A,l),m.push($),v.set(F,$)),$}function V(A){if(--A.usedTimes===0){const F=m.indexOf(A);m[F]=m[m.length-1],m.pop(),v.delete(A.cacheKey),A.destroy()}}function D(A){h.remove(A)}function B(){h.dispose()}return{getParameters:C,getProgramCacheKey:E,getUniforms:I,acquireProgram:L,releaseProgram:V,releaseShaderCache:D,programs:m,dispose:B}}function JR(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,p){r.get(f)[h]=p}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function eC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function wv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Rv(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let y=0;return g.isInstancedMesh&&(y+=2),g.isSkinnedMesh&&(y+=1),y}function h(g,y,M,C,E,S){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:y,material:M,materialVariant:f(g),groupOrder:C,renderOrder:g.renderOrder,z:E,group:S},r[e]=N):(N.id=g.id,N.object=g,N.geometry=y,N.material=M,N.materialVariant=f(g),N.groupOrder=C,N.renderOrder=g.renderOrder,N.z=E,N.group=S),e++,N}function p(g,y,M,C,E,S){const N=h(g,y,M,C,E,S);M.transmission>0?s.push(N):M.transparent===!0?l.push(N):i.push(N)}function m(g,y,M,C,E,S){const N=h(g,y,M,C,E,S);M.transmission>0?s.unshift(N):M.transparent===!0?l.unshift(N):i.unshift(N)}function v(g,y){i.length>1&&i.sort(g||eC),s.length>1&&s.sort(y||wv),l.length>1&&l.sort(y||wv)}function _(){for(let g=e,y=r.length;g<y;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:p,unshift:m,finish:_,sort:v}}function tC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new Rv,r.set(s,[f])):l>=c.length?(f=new Rv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function nC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ie,color:new mn};break;case"SpotLight":i={position:new ie,direction:new ie,color:new mn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ie,color:new mn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ie,skyColor:new mn,groundColor:new mn};break;case"RectAreaLight":i={color:new mn,position:new ie,halfWidth:new ie,halfHeight:new ie};break}return r[e.id]=i,i}}}function iC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let aC=0;function sC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function rC(r){const e=new nC,i=iC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new ie);const l=new ie,c=new Zn,f=new Zn;function h(m){let v=0,_=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let y=0,M=0,C=0,E=0,S=0,N=0,I=0,L=0,V=0,D=0,B=0;m.sort(sC);for(let F=0,$=m.length;F<$;F++){const k=m[F],X=k.color,he=k.intensity,oe=k.distance;let W=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Kr?W=k.shadow.map.texture:W=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)v+=X.r*he,_+=X.g*he,g+=X.b*he;else if(k.isLightProbe){for(let U=0;U<9;U++)s.probe[U].addScaledVector(k.sh.coefficients[U],he);B++}else if(k.isDirectionalLight){const U=e.get(k);if(U.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.directionalShadow[y]=ee,s.directionalShadowMap[y]=W,s.directionalShadowMatrix[y]=k.shadow.matrix,N++}s.directional[y]=U,y++}else if(k.isSpotLight){const U=e.get(k);U.position.setFromMatrixPosition(k.matrixWorld),U.color.copy(X).multiplyScalar(he),U.distance=oe,U.coneCos=Math.cos(k.angle),U.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),U.decay=k.decay,s.spot[C]=U;const G=k.shadow;if(k.map&&(s.spotLightMap[V]=k.map,V++,G.updateMatrices(k),k.castShadow&&D++),s.spotLightMatrix[C]=G.matrix,k.castShadow){const ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,s.spotShadow[C]=ee,s.spotShadowMap[C]=W,L++}C++}else if(k.isRectAreaLight){const U=e.get(k);U.color.copy(X).multiplyScalar(he),U.halfWidth.set(k.width*.5,0,0),U.halfHeight.set(0,k.height*.5,0),s.rectArea[E]=U,E++}else if(k.isPointLight){const U=e.get(k);if(U.color.copy(k.color).multiplyScalar(k.intensity),U.distance=k.distance,U.decay=k.decay,k.castShadow){const G=k.shadow,ee=i.get(k);ee.shadowIntensity=G.intensity,ee.shadowBias=G.bias,ee.shadowNormalBias=G.normalBias,ee.shadowRadius=G.radius,ee.shadowMapSize=G.mapSize,ee.shadowCameraNear=G.camera.near,ee.shadowCameraFar=G.camera.far,s.pointShadow[M]=ee,s.pointShadowMap[M]=W,s.pointShadowMatrix[M]=k.shadow.matrix,I++}s.point[M]=U,M++}else if(k.isHemisphereLight){const U=e.get(k);U.skyColor.copy(k.color).multiplyScalar(he),U.groundColor.copy(k.groundColor).multiplyScalar(he),s.hemi[S]=U,S++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ye.LTC_FLOAT_1,s.rectAreaLTC2=Ye.LTC_FLOAT_2):(s.rectAreaLTC1=Ye.LTC_HALF_1,s.rectAreaLTC2=Ye.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=_,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==y||A.pointLength!==M||A.spotLength!==C||A.rectAreaLength!==E||A.hemiLength!==S||A.numDirectionalShadows!==N||A.numPointShadows!==I||A.numSpotShadows!==L||A.numSpotMaps!==V||A.numLightProbes!==B)&&(s.directional.length=y,s.spot.length=C,s.rectArea.length=E,s.point.length=M,s.hemi.length=S,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=L,s.spotShadowMap.length=L,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=L+V-D,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=B,A.directionalLength=y,A.pointLength=M,A.spotLength=C,A.rectAreaLength=E,A.hemiLength=S,A.numDirectionalShadows=N,A.numPointShadows=I,A.numSpotShadows=L,A.numSpotMaps=V,A.numLightProbes=B,s.version=aC++)}function p(m,v){let _=0,g=0,y=0,M=0,C=0;const E=v.matrixWorldInverse;for(let S=0,N=m.length;S<N;S++){const I=m[S];if(I.isDirectionalLight){const L=s.directional[_];L.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(E),_++}else if(I.isSpotLight){const L=s.spot[y];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(E),L.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(E),y++}else if(I.isRectAreaLight){const L=s.rectArea[M];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(E),f.identity(),c.copy(I.matrixWorld),c.premultiply(E),f.extractRotation(c),L.halfWidth.set(I.width*.5,0,0),L.halfHeight.set(0,I.height*.5,0),L.halfWidth.applyMatrix4(f),L.halfHeight.applyMatrix4(f),M++}else if(I.isPointLight){const L=s.point[g];L.position.setFromMatrixPosition(I.matrixWorld),L.position.applyMatrix4(E),g++}else if(I.isHemisphereLight){const L=s.hemi[C];L.direction.setFromMatrixPosition(I.matrixWorld),L.direction.transformDirection(E),C++}}}return{setup:h,setupView:p,state:s}}function Cv(r){const e=new rC(r),i=[],s=[],l=[];function c(g){_.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function p(g){l.push(g)}function m(){e.setup(i)}function v(g){e.setupView(i,g)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:m,setupLightsView:v,pushLight:f,pushShadow:h,pushLightProbeGrid:p}}function oC(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new Cv(r),e.set(l,[h])):c>=f.length?(h=new Cv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const lC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cC=`uniform sampler2D shadow_pass;
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
}`,uC=[new ie(1,0,0),new ie(-1,0,0),new ie(0,1,0),new ie(0,-1,0),new ie(0,0,1),new ie(0,0,-1)],fC=[new ie(0,-1,0),new ie(0,-1,0),new ie(0,0,1),new ie(0,0,-1),new ie(0,-1,0),new ie(0,-1,0)],Nv=new Zn,lc=new ie,rp=new ie;function dC(r,e,i){let s=new mb;const l=new Ot,c=new Ot,f=new Bn,h=new yT,p=new ST,m={},v=i.maxTextureSize,_={[xr]:Pi,[Pi]:xr,[Rs]:Rs},g=new $a({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:lC,fragmentShader:cC}),y=g.clone();y.defines.HORIZONTAL_PASS=1;const M=new Ka;M.setAttribute("position",new Ya(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new qa(M,g),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nf;let S=this.type;this.render=function(D,B,A){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||D.length===0)return;this.type===uM&&(gt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=nf);const F=r.getRenderTarget(),$=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),X=r.state;X.setBlending(Ns),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const he=S!==this.type;he&&B.traverse(function(oe){oe.material&&(Array.isArray(oe.material)?oe.material.forEach(W=>W.needsUpdate=!0):oe.material.needsUpdate=!0)});for(let oe=0,W=D.length;oe<W;oe++){const U=D[oe],G=U.shadow;if(G===void 0){gt("WebGLShadowMap:",U,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ee=G.getFrameExtents();l.multiply(ee),c.copy(G.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/ee.x),l.x=c.x*ee.x,G.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/ee.y),l.y=c.y*ee.y,G.mapSize.y=c.y));const ge=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ge,G.map===null||he===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===cc){if(U.isPointLight){gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Xa(l.x,l.y,{format:Kr,type:Ds,minFilter:Si,magFilter:Si,generateMipmaps:!1}),G.map.texture.name=U.name+".shadowMap",G.map.depthTexture=new al(l.x,l.y,ka),G.map.depthTexture.name=U.name+".shadowMapDepth",G.map.depthTexture.format=Ls,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=pi,G.map.depthTexture.magFilter=pi}else U.isPointLight?(G.map=new Eb(l.x),G.map.depthTexture=new mT(l.x,Wa)):(G.map=new Xa(l.x,l.y),G.map.depthTexture=new al(l.x,l.y,Wa)),G.map.depthTexture.name=U.name+".shadowMap",G.map.depthTexture.format=Ls,this.type===nf?(G.map.depthTexture.compareFunction=ge?hm:dm,G.map.depthTexture.minFilter=Si,G.map.depthTexture.magFilter=Si):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=pi,G.map.depthTexture.magFilter=pi);G.camera.updateProjectionMatrix()}const Me=G.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Me;P++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,P),r.clear();else{P===0&&(r.setRenderTarget(G.map),r.clear());const J=G.getViewport(P);f.set(c.x*J.x,c.y*J.y,c.x*J.z,c.y*J.w),X.viewport(f)}if(U.isPointLight){const J=G.camera,be=G.matrix,Ne=U.distance||J.far;Ne!==J.far&&(J.far=Ne,J.updateProjectionMatrix()),lc.setFromMatrixPosition(U.matrixWorld),J.position.copy(lc),rp.copy(J.position),rp.add(uC[P]),J.up.copy(fC[P]),J.lookAt(rp),J.updateMatrixWorld(),be.makeTranslation(-lc.x,-lc.y,-lc.z),Nv.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Nv,J.coordinateSystem,J.reversedDepth)}else G.updateMatrices(U);s=G.getFrustum(),L(B,A,G.camera,U,this.type)}G.isPointLightShadow!==!0&&this.type===cc&&N(G,A),G.needsUpdate=!1}S=this.type,E.needsUpdate=!1,r.setRenderTarget(F,$,k)};function N(D,B){const A=e.update(C);g.defines.VSM_SAMPLES!==D.blurSamples&&(g.defines.VSM_SAMPLES=D.blurSamples,y.defines.VSM_SAMPLES=D.blurSamples,g.needsUpdate=!0,y.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Xa(l.x,l.y,{format:Kr,type:Ds})),g.uniforms.shadow_pass.value=D.map.depthTexture,g.uniforms.resolution.value=D.mapSize,g.uniforms.radius.value=D.radius,r.setRenderTarget(D.mapPass),r.clear(),r.renderBufferDirect(B,null,A,g,C,null),y.uniforms.shadow_pass.value=D.mapPass.texture,y.uniforms.resolution.value=D.mapSize,y.uniforms.radius.value=D.radius,r.setRenderTarget(D.map),r.clear(),r.renderBufferDirect(B,null,A,y,C,null)}function I(D,B,A,F){let $=null;const k=A.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(k!==void 0)$=k;else if($=A.isPointLight===!0?p:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const X=$.uuid,he=B.uuid;let oe=m[X];oe===void 0&&(oe={},m[X]=oe);let W=oe[he];W===void 0&&(W=$.clone(),oe[he]=W,B.addEventListener("dispose",V)),$=W}if($.visible=B.visible,$.wireframe=B.wireframe,F===cc?$.side=B.shadowSide!==null?B.shadowSide:B.side:$.side=B.shadowSide!==null?B.shadowSide:_[B.side],$.alphaMap=B.alphaMap,$.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,$.map=B.map,$.clipShadows=B.clipShadows,$.clippingPlanes=B.clippingPlanes,$.clipIntersection=B.clipIntersection,$.displacementMap=B.displacementMap,$.displacementScale=B.displacementScale,$.displacementBias=B.displacementBias,$.wireframeLinewidth=B.wireframeLinewidth,$.linewidth=B.linewidth,A.isPointLight===!0&&$.isMeshDistanceMaterial===!0){const X=r.properties.get($);X.light=A}return $}function L(D,B,A,F,$){if(D.visible===!1)return;if(D.layers.test(B.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&$===cc)&&(!D.frustumCulled||s.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,D.matrixWorld);const he=e.update(D),oe=D.material;if(Array.isArray(oe)){const W=he.groups;for(let U=0,G=W.length;U<G;U++){const ee=W[U],ge=oe[ee.materialIndex];if(ge&&ge.visible){const Me=I(D,ge,F,$);D.onBeforeShadow(r,D,B,A,he,Me,ee),r.renderBufferDirect(A,null,he,Me,D,ee),D.onAfterShadow(r,D,B,A,he,Me,ee)}}}else if(oe.visible){const W=I(D,oe,F,$);D.onBeforeShadow(r,D,B,A,he,W,null),r.renderBufferDirect(A,null,he,W,D,null),D.onAfterShadow(r,D,B,A,he,W,null)}}const X=D.children;for(let he=0,oe=X.length;he<oe;he++)L(X[he],B,A,F,$)}function V(D){D.target.removeEventListener("dispose",V);for(const A in m){const F=m[A],$=D.target.uuid;$ in F&&(F[$].dispose(),delete F[$])}}}function hC(r,e){function i(){let H=!1;const Oe=new Bn;let fe=null;const Xe=new Bn(0,0,0,0);return{setMask:function(Le){fe!==Le&&!H&&(r.colorMask(Le,Le,Le,Le),fe=Le)},setLocked:function(Le){H=Le},setClear:function(Le,Te,qe,ut,En){En===!0&&(Le*=ut,Te*=ut,qe*=ut),Oe.set(Le,Te,qe,ut),Xe.equals(Oe)===!1&&(r.clearColor(Le,Te,qe,ut),Xe.copy(Oe))},reset:function(){H=!1,fe=null,Xe.set(-1,0,0,0)}}}function s(){let H=!1,Oe=!1,fe=null,Xe=null,Le=null;return{setReversed:function(Te){if(Oe!==Te){const qe=e.get("EXT_clip_control");Te?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Oe=Te;const ut=Le;Le=null,this.setClear(ut)}},getReversed:function(){return Oe},setTest:function(Te){Te?ye(r.DEPTH_TEST):We(r.DEPTH_TEST)},setMask:function(Te){fe!==Te&&!H&&(r.depthMask(Te),fe=Te)},setFunc:function(Te){if(Oe&&(Te=VM[Te]),Xe!==Te){switch(Te){case hp:r.depthFunc(r.NEVER);break;case pp:r.depthFunc(r.ALWAYS);break;case mp:r.depthFunc(r.LESS);break;case nl:r.depthFunc(r.LEQUAL);break;case gp:r.depthFunc(r.EQUAL);break;case xp:r.depthFunc(r.GEQUAL);break;case _p:r.depthFunc(r.GREATER);break;case vp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Xe=Te}},setLocked:function(Te){H=Te},setClear:function(Te){Le!==Te&&(Le=Te,Oe&&(Te=1-Te),r.clearDepth(Te))},reset:function(){H=!1,fe=null,Xe=null,Le=null,Oe=!1}}}function l(){let H=!1,Oe=null,fe=null,Xe=null,Le=null,Te=null,qe=null,ut=null,En=null;return{setTest:function(Yt){H||(Yt?ye(r.STENCIL_TEST):We(r.STENCIL_TEST))},setMask:function(Yt){Oe!==Yt&&!H&&(r.stencilMask(Yt),Oe=Yt)},setFunc:function(Yt,Ln,mi){(fe!==Yt||Xe!==Ln||Le!==mi)&&(r.stencilFunc(Yt,Ln,mi),fe=Yt,Xe=Ln,Le=mi)},setOp:function(Yt,Ln,mi){(Te!==Yt||qe!==Ln||ut!==mi)&&(r.stencilOp(Yt,Ln,mi),Te=Yt,qe=Ln,ut=mi)},setLocked:function(Yt){H=Yt},setClear:function(Yt){En!==Yt&&(r.clearStencil(Yt),En=Yt)},reset:function(){H=!1,Oe=null,fe=null,Xe=null,Le=null,Te=null,qe=null,ut=null,En=null}}}const c=new i,f=new s,h=new l,p=new WeakMap,m=new WeakMap;let v={},_={},g={},y=new WeakMap,M=[],C=null,E=!1,S=null,N=null,I=null,L=null,V=null,D=null,B=null,A=new mn(0,0,0),F=0,$=!1,k=null,X=null,he=null,oe=null,W=null;const U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ee=0;const ge=r.getParameter(r.VERSION);ge.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ge)[1]),G=ee>=1):ge.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),G=ee>=2);let Me=null,P={};const J=r.getParameter(r.SCISSOR_BOX),be=r.getParameter(r.VIEWPORT),Ne=new Bn().fromArray(J),Pe=new Bn().fromArray(be);function ae(H,Oe,fe,Xe){const Le=new Uint8Array(4),Te=r.createTexture();r.bindTexture(H,Te),r.texParameteri(H,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(H,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qe=0;qe<fe;qe++)H===r.TEXTURE_3D||H===r.TEXTURE_2D_ARRAY?r.texImage3D(Oe,0,r.RGBA,1,1,Xe,0,r.RGBA,r.UNSIGNED_BYTE,Le):r.texImage2D(Oe+qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Le);return Te}const Se={};Se[r.TEXTURE_2D]=ae(r.TEXTURE_2D,r.TEXTURE_2D,1),Se[r.TEXTURE_CUBE_MAP]=ae(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[r.TEXTURE_2D_ARRAY]=ae(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Se[r.TEXTURE_3D]=ae(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ye(r.DEPTH_TEST),f.setFunc(nl),Zt(!1),rn(O_),ye(r.CULL_FACE),Kt(Ns);function ye(H){v[H]!==!0&&(r.enable(H),v[H]=!0)}function We(H){v[H]!==!1&&(r.disable(H),v[H]=!1)}function tt(H,Oe){return g[H]!==Oe?(r.bindFramebuffer(H,Oe),g[H]=Oe,H===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Oe),H===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Oe),!0):!1}function rt(H,Oe){let fe=M,Xe=!1;if(H){fe=y.get(Oe),fe===void 0&&(fe=[],y.set(Oe,fe));const Le=H.textures;if(fe.length!==Le.length||fe[0]!==r.COLOR_ATTACHMENT0){for(let Te=0,qe=Le.length;Te<qe;Te++)fe[Te]=r.COLOR_ATTACHMENT0+Te;fe.length=Le.length,Xe=!0}}else fe[0]!==r.BACK&&(fe[0]=r.BACK,Xe=!0);Xe&&r.drawBuffers(fe)}function Dt(H){return C!==H?(r.useProgram(H),C=H,!0):!1}const Et={[jr]:r.FUNC_ADD,[dM]:r.FUNC_SUBTRACT,[hM]:r.FUNC_REVERSE_SUBTRACT};Et[pM]=r.MIN,Et[mM]=r.MAX;const Ut={[gM]:r.ZERO,[xM]:r.ONE,[_M]:r.SRC_COLOR,[fp]:r.SRC_ALPHA,[MM]:r.SRC_ALPHA_SATURATE,[SM]:r.DST_COLOR,[bM]:r.DST_ALPHA,[vM]:r.ONE_MINUS_SRC_COLOR,[dp]:r.ONE_MINUS_SRC_ALPHA,[EM]:r.ONE_MINUS_DST_COLOR,[yM]:r.ONE_MINUS_DST_ALPHA,[TM]:r.CONSTANT_COLOR,[AM]:r.ONE_MINUS_CONSTANT_COLOR,[wM]:r.CONSTANT_ALPHA,[RM]:r.ONE_MINUS_CONSTANT_ALPHA};function Kt(H,Oe,fe,Xe,Le,Te,qe,ut,En,Yt){if(H===Ns){E===!0&&(We(r.BLEND),E=!1);return}if(E===!1&&(ye(r.BLEND),E=!0),H!==fM){if(H!==S||Yt!==$){if((N!==jr||V!==jr)&&(r.blendEquation(r.FUNC_ADD),N=jr,V=jr),Yt)switch(H){case Jo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case D_:r.blendFunc(r.ONE,r.ONE);break;case L_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case I_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:$t("WebGLState: Invalid blending: ",H);break}else switch(H){case Jo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case D_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case L_:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case I_:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",H);break}I=null,L=null,D=null,B=null,A.set(0,0,0),F=0,S=H,$=Yt}return}Le=Le||Oe,Te=Te||fe,qe=qe||Xe,(Oe!==N||Le!==V)&&(r.blendEquationSeparate(Et[Oe],Et[Le]),N=Oe,V=Le),(fe!==I||Xe!==L||Te!==D||qe!==B)&&(r.blendFuncSeparate(Ut[fe],Ut[Xe],Ut[Te],Ut[qe]),I=fe,L=Xe,D=Te,B=qe),(ut.equals(A)===!1||En!==F)&&(r.blendColor(ut.r,ut.g,ut.b,En),A.copy(ut),F=En),S=H,$=!1}function vt(H,Oe){H.side===Rs?We(r.CULL_FACE):ye(r.CULL_FACE);let fe=H.side===Pi;Oe&&(fe=!fe),Zt(fe),H.blending===Jo&&H.transparent===!1?Kt(Ns):Kt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),f.setFunc(H.depthFunc),f.setTest(H.depthTest),f.setMask(H.depthWrite),c.setMask(H.colorWrite);const Xe=H.stencilWrite;h.setTest(Xe),Xe&&(h.setMask(H.stencilWriteMask),h.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),h.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Y(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ye(r.SAMPLE_ALPHA_TO_COVERAGE):We(r.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(H){k!==H&&(H?r.frontFace(r.CW):r.frontFace(r.CCW),k=H)}function rn(H){H!==lM?(ye(r.CULL_FACE),H!==X&&(H===O_?r.cullFace(r.BACK):H===cM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):We(r.CULL_FACE),X=H}function Lt(H){H!==he&&(G&&r.lineWidth(H),he=H)}function Y(H,Oe,fe){H?(ye(r.POLYGON_OFFSET_FILL),(oe!==Oe||W!==fe)&&(oe=Oe,W=fe,f.getReversed()&&(Oe=-Oe),r.polygonOffset(Oe,fe))):We(r.POLYGON_OFFSET_FILL)}function Xt(H){H?ye(r.SCISSOR_TEST):We(r.SCISSOR_TEST)}function Tt(H){H===void 0&&(H=r.TEXTURE0+U-1),Me!==H&&(r.activeTexture(H),Me=H)}function tn(H,Oe,fe){fe===void 0&&(Me===null?fe=r.TEXTURE0+U-1:fe=Me);let Xe=P[fe];Xe===void 0&&(Xe={type:void 0,texture:void 0},P[fe]=Xe),(Xe.type!==H||Xe.texture!==Oe)&&(Me!==fe&&(r.activeTexture(fe),Me=fe),r.bindTexture(H,Oe||Se[H]),Xe.type=H,Xe.texture=Oe)}function Ie(){const H=P[Me];H!==void 0&&H.type!==void 0&&(r.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Sn(){try{r.compressedTexImage2D(...arguments)}catch(H){$t("WebGLState:",H)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(H){$t("WebGLState:",H)}}function T(){try{r.texSubImage2D(...arguments)}catch(H){$t("WebGLState:",H)}}function Q(){try{r.texSubImage3D(...arguments)}catch(H){$t("WebGLState:",H)}}function pe(){try{r.compressedTexSubImage2D(...arguments)}catch(H){$t("WebGLState:",H)}}function Ee(){try{r.compressedTexSubImage3D(...arguments)}catch(H){$t("WebGLState:",H)}}function Ue(){try{r.texStorage2D(...arguments)}catch(H){$t("WebGLState:",H)}}function Be(){try{r.texStorage3D(...arguments)}catch(H){$t("WebGLState:",H)}}function ue(){try{r.texImage2D(...arguments)}catch(H){$t("WebGLState:",H)}}function me(){try{r.texImage3D(...arguments)}catch(H){$t("WebGLState:",H)}}function Ae(H){return _[H]!==void 0?_[H]:r.getParameter(H)}function ze(H,Oe){_[H]!==Oe&&(r.pixelStorei(H,Oe),_[H]=Oe)}function Fe(H){Ne.equals(H)===!1&&(r.scissor(H.x,H.y,H.z,H.w),Ne.copy(H))}function Ce(H){Pe.equals(H)===!1&&(r.viewport(H.x,H.y,H.z,H.w),Pe.copy(H))}function ht(H,Oe){let fe=m.get(Oe);fe===void 0&&(fe=new WeakMap,m.set(Oe,fe));let Xe=fe.get(H);Xe===void 0&&(Xe=r.getUniformBlockIndex(Oe,H.name),fe.set(H,Xe))}function at(H,Oe){const Xe=m.get(Oe).get(H);p.get(Oe)!==Xe&&(r.uniformBlockBinding(Oe,Xe,H.__bindingPointIndex),p.set(Oe,Xe))}function Rt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},Me=null,P={},g={},y=new WeakMap,M=[],C=null,E=!1,S=null,N=null,I=null,L=null,V=null,D=null,B=null,A=new mn(0,0,0),F=0,$=!1,k=null,X=null,he=null,oe=null,W=null,Ne.set(0,0,r.canvas.width,r.canvas.height),Pe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ye,disable:We,bindFramebuffer:tt,drawBuffers:rt,useProgram:Dt,setBlending:Kt,setMaterial:vt,setFlipSided:Zt,setCullFace:rn,setLineWidth:Lt,setPolygonOffset:Y,setScissorTest:Xt,activeTexture:Tt,bindTexture:tn,unbindTexture:Ie,compressedTexImage2D:Sn,compressedTexImage3D:O,texImage2D:ue,texImage3D:me,pixelStorei:ze,getParameter:Ae,updateUBOMapping:ht,uniformBlockBinding:at,texStorage2D:Ue,texStorage3D:Be,texSubImage2D:T,texSubImage3D:Q,compressedTexSubImage2D:pe,compressedTexSubImage3D:Ee,scissor:Fe,viewport:Ce,reset:Rt}}function pC(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new Ot,v=new WeakMap,_=new Set;let g;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(O,T){return M?new OffscreenCanvas(O,T):gc("canvas")}function E(O,T,Q){let pe=1;const Ee=Sn(O);if((Ee.width>Q||Ee.height>Q)&&(pe=Q/Math.max(Ee.width,Ee.height)),pe<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Ue=Math.floor(pe*Ee.width),Be=Math.floor(pe*Ee.height);g===void 0&&(g=C(Ue,Be));const ue=T?C(Ue,Be):g;return ue.width=Ue,ue.height=Be,ue.getContext("2d").drawImage(O,0,0,Ue,Be),gt("WebGLRenderer: Texture has been resized from ("+Ee.width+"x"+Ee.height+") to ("+Ue+"x"+Be+")."),ue}else return"data"in O&&gt("WebGLRenderer: Image in DataTexture is too big ("+Ee.width+"x"+Ee.height+")."),O;return O}function S(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function I(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function L(O,T,Q,pe,Ee,Ue=!1){if(O!==null){if(r[O]!==void 0)return r[O];gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Be;pe&&(Be=e.get("EXT_texture_norm16"),Be||gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=T;if(T===r.RED&&(Q===r.FLOAT&&(ue=r.R32F),Q===r.HALF_FLOAT&&(ue=r.R16F),Q===r.UNSIGNED_BYTE&&(ue=r.R8),Q===r.UNSIGNED_SHORT&&Be&&(ue=Be.R16_EXT),Q===r.SHORT&&Be&&(ue=Be.R16_SNORM_EXT)),T===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.R8UI),Q===r.UNSIGNED_SHORT&&(ue=r.R16UI),Q===r.UNSIGNED_INT&&(ue=r.R32UI),Q===r.BYTE&&(ue=r.R8I),Q===r.SHORT&&(ue=r.R16I),Q===r.INT&&(ue=r.R32I)),T===r.RG&&(Q===r.FLOAT&&(ue=r.RG32F),Q===r.HALF_FLOAT&&(ue=r.RG16F),Q===r.UNSIGNED_BYTE&&(ue=r.RG8),Q===r.UNSIGNED_SHORT&&Be&&(ue=Be.RG16_EXT),Q===r.SHORT&&Be&&(ue=Be.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RG8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RG16UI),Q===r.UNSIGNED_INT&&(ue=r.RG32UI),Q===r.BYTE&&(ue=r.RG8I),Q===r.SHORT&&(ue=r.RG16I),Q===r.INT&&(ue=r.RG32I)),T===r.RGB_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RGB8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RGB16UI),Q===r.UNSIGNED_INT&&(ue=r.RGB32UI),Q===r.BYTE&&(ue=r.RGB8I),Q===r.SHORT&&(ue=r.RGB16I),Q===r.INT&&(ue=r.RGB32I)),T===r.RGBA_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ue=r.RGBA8UI),Q===r.UNSIGNED_SHORT&&(ue=r.RGBA16UI),Q===r.UNSIGNED_INT&&(ue=r.RGBA32UI),Q===r.BYTE&&(ue=r.RGBA8I),Q===r.SHORT&&(ue=r.RGBA16I),Q===r.INT&&(ue=r.RGBA32I)),T===r.RGB&&(Q===r.UNSIGNED_SHORT&&Be&&(ue=Be.RGB16_EXT),Q===r.SHORT&&Be&&(ue=Be.RGB16_SNORM_EXT),Q===r.UNSIGNED_INT_5_9_9_9_REV&&(ue=r.RGB9_E5),Q===r.UNSIGNED_INT_10F_11F_11F_REV&&(ue=r.R11F_G11F_B10F)),T===r.RGBA){const me=Ue?mf:jt.getTransfer(Ee);Q===r.FLOAT&&(ue=r.RGBA32F),Q===r.HALF_FLOAT&&(ue=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(ue=me===un?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT&&Be&&(ue=Be.RGBA16_EXT),Q===r.SHORT&&Be&&(ue=Be.RGBA16_SNORM_EXT),Q===r.UNSIGNED_SHORT_4_4_4_4&&(ue=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(ue=r.RGB5_A1)}return(ue===r.R16F||ue===r.R32F||ue===r.RG16F||ue===r.RG32F||ue===r.RGBA16F||ue===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function V(O,T){let Q;return O?T===null||T===Wa||T===mc?Q=r.DEPTH24_STENCIL8:T===ka?Q=r.DEPTH32F_STENCIL8:T===pc&&(Q=r.DEPTH24_STENCIL8,gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Wa||T===mc?Q=r.DEPTH_COMPONENT24:T===ka?Q=r.DEPTH_COMPONENT32F:T===pc&&(Q=r.DEPTH_COMPONENT16),Q}function D(O,T){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==pi&&O.minFilter!==Si?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function B(O){const T=O.target;T.removeEventListener("dispose",B),F(T),T.isVideoTexture&&v.delete(T),T.isHTMLTexture&&_.delete(T)}function A(O){const T=O.target;T.removeEventListener("dispose",A),k(T)}function F(O){const T=s.get(O);if(T.__webglInit===void 0)return;const Q=O.source,pe=y.get(Q);if(pe){const Ee=pe[T.__cacheKey];Ee.usedTimes--,Ee.usedTimes===0&&$(O),Object.keys(pe).length===0&&y.delete(Q)}s.remove(O)}function $(O){const T=s.get(O);r.deleteTexture(T.__webglTexture);const Q=O.source,pe=y.get(Q);delete pe[T.__cacheKey],f.memory.textures--}function k(O){const T=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(T.__webglFramebuffer[pe]))for(let Ee=0;Ee<T.__webglFramebuffer[pe].length;Ee++)r.deleteFramebuffer(T.__webglFramebuffer[pe][Ee]);else r.deleteFramebuffer(T.__webglFramebuffer[pe]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[pe])}else{if(Array.isArray(T.__webglFramebuffer))for(let pe=0;pe<T.__webglFramebuffer.length;pe++)r.deleteFramebuffer(T.__webglFramebuffer[pe]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let pe=0;pe<T.__webglColorRenderbuffer.length;pe++)T.__webglColorRenderbuffer[pe]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[pe]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Q=O.textures;for(let pe=0,Ee=Q.length;pe<Ee;pe++){const Ue=s.get(Q[pe]);Ue.__webglTexture&&(r.deleteTexture(Ue.__webglTexture),f.memory.textures--),s.remove(Q[pe])}s.remove(O)}let X=0;function he(){X=0}function oe(){return X}function W(O){X=O}function U(){const O=X;return O>=l.maxTextures&&gt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),X+=1,O}function G(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function ee(O,T){const Q=s.get(O);if(O.isVideoTexture&&tn(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&Q.__version!==O.version){const pe=O.image;if(pe===null)gt("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)gt("WebGLRenderer: Texture marked for update but image is incomplete");else{We(Q,O,T);return}}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+T)}function ge(O,T){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){We(Q,O,T);return}else O.isExternalTexture&&(Q.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+T)}function Me(O,T){const Q=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&Q.__version!==O.version){We(Q,O,T);return}i.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+T)}function P(O,T){const Q=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&Q.__version!==O.version){tt(Q,O,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+T)}const J={[bp]:r.REPEAT,[Cs]:r.CLAMP_TO_EDGE,[yp]:r.MIRRORED_REPEAT},be={[pi]:r.NEAREST,[OM]:r.NEAREST_MIPMAP_NEAREST,[Cu]:r.NEAREST_MIPMAP_LINEAR,[Si]:r.LINEAR,[Nh]:r.LINEAR_MIPMAP_NEAREST,[Yr]:r.LINEAR_MIPMAP_LINEAR},Ne={[IM]:r.NEVER,[zM]:r.ALWAYS,[UM]:r.LESS,[dm]:r.LEQUAL,[PM]:r.EQUAL,[hm]:r.GEQUAL,[FM]:r.GREATER,[BM]:r.NOTEQUAL};function Pe(O,T){if(T.type===ka&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Si||T.magFilter===Nh||T.magFilter===Cu||T.magFilter===Yr||T.minFilter===Si||T.minFilter===Nh||T.minFilter===Cu||T.minFilter===Yr)&&gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,J[T.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,J[T.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,J[T.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,be[T.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,be[T.minFilter]),T.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,Ne[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===pi||T.minFilter!==Cu&&T.minFilter!==Yr||T.type===ka&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function ae(O,T){let Q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",B));const pe=T.source;let Ee=y.get(pe);Ee===void 0&&(Ee={},y.set(pe,Ee));const Ue=G(T);if(Ue!==O.__cacheKey){Ee[Ue]===void 0&&(Ee[Ue]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,Q=!0),Ee[Ue].usedTimes++;const Be=Ee[O.__cacheKey];Be!==void 0&&(Ee[O.__cacheKey].usedTimes--,Be.usedTimes===0&&$(T)),O.__cacheKey=Ue,O.__webglTexture=Ee[Ue].texture}return Q}function Se(O,T,Q){return Math.floor(Math.floor(O/Q)/T)}function ye(O,T,Q,pe){const Ue=O.updateRanges;if(Ue.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,Q,pe,T.data);else{Ue.sort((ze,Fe)=>ze.start-Fe.start);let Be=0;for(let ze=1;ze<Ue.length;ze++){const Fe=Ue[Be],Ce=Ue[ze],ht=Fe.start+Fe.count,at=Se(Ce.start,T.width,4),Rt=Se(Fe.start,T.width,4);Ce.start<=ht+1&&at===Rt&&Se(Ce.start+Ce.count-1,T.width,4)===at?Fe.count=Math.max(Fe.count,Ce.start+Ce.count-Fe.start):(++Be,Ue[Be]=Ce)}Ue.length=Be+1;const ue=i.getParameter(r.UNPACK_ROW_LENGTH),me=i.getParameter(r.UNPACK_SKIP_PIXELS),Ae=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let ze=0,Fe=Ue.length;ze<Fe;ze++){const Ce=Ue[ze],ht=Math.floor(Ce.start/4),at=Math.ceil(Ce.count/4),Rt=ht%T.width,H=Math.floor(ht/T.width),Oe=at,fe=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,Rt),i.pixelStorei(r.UNPACK_SKIP_ROWS,H),i.texSubImage2D(r.TEXTURE_2D,0,Rt,H,Oe,fe,Q,pe,T.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,ue),i.pixelStorei(r.UNPACK_SKIP_PIXELS,me),i.pixelStorei(r.UNPACK_SKIP_ROWS,Ae)}}function We(O,T,Q){let pe=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(pe=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(pe=r.TEXTURE_3D);const Ee=ae(O,T),Ue=T.source;i.bindTexture(pe,O.__webglTexture,r.TEXTURE0+Q);const Be=s.get(Ue);if(Ue.version!==Be.__version||Ee===!0){if(i.activeTexture(r.TEXTURE0+Q),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const fe=jt.getPrimaries(jt.workingColorSpace),Xe=T.colorSpace===pr?null:jt.getPrimaries(T.colorSpace),Le=T.colorSpace===pr||fe===Xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let me=E(T.image,!1,l.maxTextureSize);me=Ie(T,me);const Ae=c.convert(T.format,T.colorSpace),ze=c.convert(T.type);let Fe=L(T.internalFormat,Ae,ze,T.normalized,T.colorSpace,T.isVideoTexture);Pe(pe,T);let Ce;const ht=T.mipmaps,at=T.isVideoTexture!==!0,Rt=Be.__version===void 0||Ee===!0,H=Ue.dataReady,Oe=D(T,me);if(T.isDepthTexture)Fe=V(T.format===Wr,T.type),Rt&&(at?i.texStorage2D(r.TEXTURE_2D,1,Fe,me.width,me.height):i.texImage2D(r.TEXTURE_2D,0,Fe,me.width,me.height,0,Ae,ze,null));else if(T.isDataTexture)if(ht.length>0){at&&Rt&&i.texStorage2D(r.TEXTURE_2D,Oe,Fe,ht[0].width,ht[0].height);for(let fe=0,Xe=ht.length;fe<Xe;fe++)Ce=ht[fe],at?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ce.width,Ce.height,Ae,ze,Ce.data):i.texImage2D(r.TEXTURE_2D,fe,Fe,Ce.width,Ce.height,0,Ae,ze,Ce.data);T.generateMipmaps=!1}else at?(Rt&&i.texStorage2D(r.TEXTURE_2D,Oe,Fe,me.width,me.height),H&&ye(T,me,Ae,ze)):i.texImage2D(r.TEXTURE_2D,0,Fe,me.width,me.height,0,Ae,ze,me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){at&&Rt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Oe,Fe,ht[0].width,ht[0].height,me.depth);for(let fe=0,Xe=ht.length;fe<Xe;fe++)if(Ce=ht[fe],T.format!==Ra)if(Ae!==null)if(at){if(H)if(T.layerUpdates.size>0){const Le=ov(Ce.width,Ce.height,T.format,T.type);for(const Te of T.layerUpdates){const qe=Ce.data.subarray(Te*Le/Ce.data.BYTES_PER_ELEMENT,(Te+1)*Le/Ce.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,Te,Ce.width,Ce.height,1,Ae,qe)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ce.width,Ce.height,me.depth,Ae,Ce.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,Fe,Ce.width,Ce.height,me.depth,0,Ce.data,0,0);else gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?H&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,Ce.width,Ce.height,me.depth,Ae,ze,Ce.data):i.texImage3D(r.TEXTURE_2D_ARRAY,fe,Fe,Ce.width,Ce.height,me.depth,0,Ae,ze,Ce.data)}else{at&&Rt&&i.texStorage2D(r.TEXTURE_2D,Oe,Fe,ht[0].width,ht[0].height);for(let fe=0,Xe=ht.length;fe<Xe;fe++)Ce=ht[fe],T.format!==Ra?Ae!==null?at?H&&i.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,Ce.width,Ce.height,Ae,Ce.data):i.compressedTexImage2D(r.TEXTURE_2D,fe,Fe,Ce.width,Ce.height,0,Ce.data):gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ce.width,Ce.height,Ae,ze,Ce.data):i.texImage2D(r.TEXTURE_2D,fe,Fe,Ce.width,Ce.height,0,Ae,ze,Ce.data)}else if(T.isDataArrayTexture)if(at){if(Rt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Oe,Fe,me.width,me.height,me.depth),H)if(T.layerUpdates.size>0){const fe=ov(me.width,me.height,T.format,T.type);for(const Xe of T.layerUpdates){const Le=me.data.subarray(Xe*fe/me.data.BYTES_PER_ELEMENT,(Xe+1)*fe/me.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Xe,me.width,me.height,1,Ae,ze,Le)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Ae,ze,me.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,me.width,me.height,me.depth,0,Ae,ze,me.data);else if(T.isData3DTexture)at?(Rt&&i.texStorage3D(r.TEXTURE_3D,Oe,Fe,me.width,me.height,me.depth),H&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Ae,ze,me.data)):i.texImage3D(r.TEXTURE_3D,0,Fe,me.width,me.height,me.depth,0,Ae,ze,me.data);else if(T.isFramebufferTexture){if(Rt)if(at)i.texStorage2D(r.TEXTURE_2D,Oe,Fe,me.width,me.height);else{let fe=me.width,Xe=me.height;for(let Le=0;Le<Oe;Le++)i.texImage2D(r.TEXTURE_2D,Le,Fe,fe,Xe,0,Ae,ze,null),fe>>=1,Xe>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const fe=r.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),me.parentNode!==fe){fe.appendChild(me),_.add(T),fe.onpaint=ut=>{const En=ut.changedElements;for(const Yt of _)En.includes(Yt.image)&&(Yt.needsUpdate=!0)},fe.requestPaint();return}const Xe=0,Le=r.RGBA,Te=r.RGBA,qe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Xe,Le,Te,qe,me),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ht.length>0){if(at&&Rt){const fe=Sn(ht[0]);i.texStorage2D(r.TEXTURE_2D,Oe,Fe,fe.width,fe.height)}for(let fe=0,Xe=ht.length;fe<Xe;fe++)Ce=ht[fe],at?H&&i.texSubImage2D(r.TEXTURE_2D,fe,0,0,Ae,ze,Ce):i.texImage2D(r.TEXTURE_2D,fe,Fe,Ae,ze,Ce);T.generateMipmaps=!1}else if(at){if(Rt){const fe=Sn(me);i.texStorage2D(r.TEXTURE_2D,Oe,Fe,fe.width,fe.height)}H&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Ae,ze,me)}else i.texImage2D(r.TEXTURE_2D,0,Fe,Ae,ze,me);S(T)&&N(pe),Be.__version=Ue.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function tt(O,T,Q){if(T.image.length!==6)return;const pe=ae(O,T),Ee=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+Q);const Ue=s.get(Ee);if(Ee.version!==Ue.__version||pe===!0){i.activeTexture(r.TEXTURE0+Q);const Be=jt.getPrimaries(jt.workingColorSpace),ue=T.colorSpace===pr?null:jt.getPrimaries(T.colorSpace),me=T.colorSpace===pr||Be===ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ae=T.isCompressedTexture||T.image[0].isCompressedTexture,ze=T.image[0]&&T.image[0].isDataTexture,Fe=[];for(let Te=0;Te<6;Te++)!Ae&&!ze?Fe[Te]=E(T.image[Te],!0,l.maxCubemapSize):Fe[Te]=ze?T.image[Te].image:T.image[Te],Fe[Te]=Ie(T,Fe[Te]);const Ce=Fe[0],ht=c.convert(T.format,T.colorSpace),at=c.convert(T.type),Rt=L(T.internalFormat,ht,at,T.normalized,T.colorSpace),H=T.isVideoTexture!==!0,Oe=Ue.__version===void 0||pe===!0,fe=Ee.dataReady;let Xe=D(T,Ce);Pe(r.TEXTURE_CUBE_MAP,T);let Le;if(Ae){H&&Oe&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,Rt,Ce.width,Ce.height);for(let Te=0;Te<6;Te++){Le=Fe[Te].mipmaps;for(let qe=0;qe<Le.length;qe++){const ut=Le[qe];T.format!==Ra?ht!==null?H?fe&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,0,0,ut.width,ut.height,ht,ut.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,Rt,ut.width,ut.height,0,ut.data):gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,0,0,ut.width,ut.height,ht,at,ut.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,Rt,ut.width,ut.height,0,ht,at,ut.data)}}}else{if(Le=T.mipmaps,H&&Oe){Le.length>0&&Xe++;const Te=Sn(Fe[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,Rt,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(ze){H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Fe[Te].width,Fe[Te].height,ht,at,Fe[Te].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Rt,Fe[Te].width,Fe[Te].height,0,ht,at,Fe[Te].data);for(let qe=0;qe<Le.length;qe++){const En=Le[qe].image[Te].image;H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,0,0,En.width,En.height,ht,at,En.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,Rt,En.width,En.height,0,ht,at,En.data)}}else{H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,ht,at,Fe[Te]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Rt,ht,at,Fe[Te]);for(let qe=0;qe<Le.length;qe++){const ut=Le[qe];H?fe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,0,0,ht,at,ut.image[Te]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,Rt,ht,at,ut.image[Te])}}}S(T)&&N(r.TEXTURE_CUBE_MAP),Ue.__version=Ee.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function rt(O,T,Q,pe,Ee,Ue){const Be=c.convert(Q.format,Q.colorSpace),ue=c.convert(Q.type),me=L(Q.internalFormat,Be,ue,Q.normalized,Q.colorSpace),Ae=s.get(T),ze=s.get(Q);if(ze.__renderTarget=T,!Ae.__hasExternalTextures){const Fe=Math.max(1,T.width>>Ue),Ce=Math.max(1,T.height>>Ue);Ee===r.TEXTURE_3D||Ee===r.TEXTURE_2D_ARRAY?i.texImage3D(Ee,Ue,me,Fe,Ce,T.depth,0,Be,ue,null):i.texImage2D(Ee,Ue,me,Fe,Ce,0,Be,ue,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),Tt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,Ee,ze.__webglTexture,0,Xt(T)):(Ee===r.TEXTURE_2D||Ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pe,Ee,ze.__webglTexture,Ue),i.bindFramebuffer(r.FRAMEBUFFER,null)}function Dt(O,T,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,O),T.depthBuffer){const pe=T.depthTexture,Ee=pe&&pe.isDepthTexture?pe.type:null,Ue=V(T.stencilBuffer,Ee),Be=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Tt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xt(T),Ue,T.width,T.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xt(T),Ue,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ue,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Be,r.RENDERBUFFER,O)}else{const pe=T.textures;for(let Ee=0;Ee<pe.length;Ee++){const Ue=pe[Ee],Be=c.convert(Ue.format,Ue.colorSpace),ue=c.convert(Ue.type),me=L(Ue.internalFormat,Be,ue,Ue.normalized,Ue.colorSpace);Tt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xt(T),me,T.width,T.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xt(T),me,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,me,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Et(O,T,Q){const pe=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Ee=s.get(T.depthTexture);if(Ee.__renderTarget=T,(!Ee.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),pe){if(Ee.__webglInit===void 0&&(Ee.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),Ee.__webglTexture===void 0){Ee.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Ee.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,T.depthTexture);const Ae=c.convert(T.depthTexture.format),ze=c.convert(T.depthTexture.type);let Fe;T.depthTexture.format===Ls?Fe=r.DEPTH_COMPONENT24:T.depthTexture.format===Wr&&(Fe=r.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Fe,T.width,T.height,0,Ae,ze,null)}}else ee(T.depthTexture,0);const Ue=Ee.__webglTexture,Be=Xt(T),ue=pe?r.TEXTURE_CUBE_MAP_POSITIVE_X+Q:r.TEXTURE_2D,me=T.depthTexture.format===Wr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ls)Tt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,ue,Ue,0,Be):r.framebufferTexture2D(r.FRAMEBUFFER,me,ue,Ue,0);else if(T.depthTexture.format===Wr)Tt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,ue,Ue,0,Be):r.framebufferTexture2D(r.FRAMEBUFFER,me,ue,Ue,0);else throw new Error("Unknown depthTexture format")}function Ut(O){const T=s.get(O),Q=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const pe=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),pe){const Ee=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,pe.removeEventListener("dispose",Ee)};pe.addEventListener("dispose",Ee),T.__depthDisposeCallback=Ee}T.__boundDepthTexture=pe}if(O.depthTexture&&!T.__autoAllocateDepthBuffer)if(Q)for(let pe=0;pe<6;pe++)Et(T.__webglFramebuffer[pe],O,pe);else{const pe=O.texture.mipmaps;pe&&pe.length>0?Et(T.__webglFramebuffer[0],O,0):Et(T.__webglFramebuffer,O,0)}else if(Q){T.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[pe]),T.__webglDepthbuffer[pe]===void 0)T.__webglDepthbuffer[pe]=r.createRenderbuffer(),Dt(T.__webglDepthbuffer[pe],O,!1);else{const Ee=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=T.__webglDepthbuffer[pe];r.bindRenderbuffer(r.RENDERBUFFER,Ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,Ue)}}else{const pe=O.texture.mipmaps;if(pe&&pe.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),Dt(T.__webglDepthbuffer,O,!1);else{const Ee=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ue),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,Ue)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Kt(O,T,Q){const pe=s.get(O);T!==void 0&&rt(pe.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&Ut(O)}function vt(O){const T=O.texture,Q=s.get(O),pe=s.get(T);O.addEventListener("dispose",A);const Ee=O.textures,Ue=O.isWebGLCubeRenderTarget===!0,Be=Ee.length>1;if(Be||(pe.__webglTexture===void 0&&(pe.__webglTexture=r.createTexture()),pe.__version=T.version,f.memory.textures++),Ue){Q.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer[ue]=[];for(let me=0;me<T.mipmaps.length;me++)Q.__webglFramebuffer[ue][me]=r.createFramebuffer()}else Q.__webglFramebuffer[ue]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer=[];for(let ue=0;ue<T.mipmaps.length;ue++)Q.__webglFramebuffer[ue]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(Be)for(let ue=0,me=Ee.length;ue<me;ue++){const Ae=s.get(Ee[ue]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&Tt(O)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let ue=0;ue<Ee.length;ue++){const me=Ee[ue];Q.__webglColorRenderbuffer[ue]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[ue]);const Ae=c.convert(me.format,me.colorSpace),ze=c.convert(me.type),Fe=L(me.internalFormat,Ae,ze,me.normalized,me.colorSpace,O.isXRRenderTarget===!0),Ce=Xt(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,Fe,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ue,r.RENDERBUFFER,Q.__webglColorRenderbuffer[ue])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),Dt(Q.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ue){i.bindTexture(r.TEXTURE_CUBE_MAP,pe.__webglTexture),Pe(r.TEXTURE_CUBE_MAP,T);for(let ue=0;ue<6;ue++)if(T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)rt(Q.__webglFramebuffer[ue][me],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else rt(Q.__webglFramebuffer[ue],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);S(T)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Be){for(let ue=0,me=Ee.length;ue<me;ue++){const Ae=Ee[ue],ze=s.get(Ae);let Fe=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Fe=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Fe,ze.__webglTexture),Pe(Fe,Ae),rt(Q.__webglFramebuffer,O,Ae,r.COLOR_ATTACHMENT0+ue,Fe,0),S(Ae)&&N(Fe)}i.unbindTexture()}else{let ue=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(ue=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(ue,pe.__webglTexture),Pe(ue,T),T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)rt(Q.__webglFramebuffer[me],O,T,r.COLOR_ATTACHMENT0,ue,me);else rt(Q.__webglFramebuffer,O,T,r.COLOR_ATTACHMENT0,ue,0);S(T)&&N(ue),i.unbindTexture()}O.depthBuffer&&Ut(O)}function Zt(O){const T=O.textures;for(let Q=0,pe=T.length;Q<pe;Q++){const Ee=T[Q];if(S(Ee)){const Ue=I(O),Be=s.get(Ee).__webglTexture;i.bindTexture(Ue,Be),N(Ue),i.unbindTexture()}}}const rn=[],Lt=[];function Y(O){if(O.samples>0){if(Tt(O)===!1){const T=O.textures,Q=O.width,pe=O.height;let Ee=r.COLOR_BUFFER_BIT;const Ue=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Be=s.get(O),ue=T.length>1;if(ue)for(let Ae=0;Ae<T.length;Ae++)i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer);const me=O.texture.mipmaps;me&&me.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let Ae=0;Ae<T.length;Ae++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Ee|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Ee|=r.STENCIL_BUFFER_BIT)),ue){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Be.__webglColorRenderbuffer[Ae]);const ze=s.get(T[Ae]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,Q,pe,0,0,Q,pe,Ee,r.NEAREST),p===!0&&(rn.length=0,Lt.length=0,rn.push(r.COLOR_ATTACHMENT0+Ae),O.depthBuffer&&O.resolveDepthBuffer===!1&&(rn.push(Ue),Lt.push(Ue),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Lt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rn))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ue)for(let Ae=0;Ae<T.length;Ae++){i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.RENDERBUFFER,Be.__webglColorRenderbuffer[Ae]);const ze=s.get(T[Ae]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.TEXTURE_2D,ze,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&p){const T=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Xt(O){return Math.min(l.maxSamples,O.samples)}function Tt(O){const T=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function tn(O){const T=f.render.frame;v.get(O)!==T&&(v.set(O,T),O.update())}function Ie(O,T){const Q=O.colorSpace,pe=O.format,Ee=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||Q!==pf&&Q!==pr&&(jt.getTransfer(Q)===un?(pe!==Ra||Ee!==ha)&&gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",Q)),T}function Sn(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(m.width=O.naturalWidth||O.width,m.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(m.width=O.displayWidth,m.height=O.displayHeight):(m.width=O.width,m.height=O.height),m}this.allocateTextureUnit=U,this.resetTextureUnits=he,this.getTextureUnits=oe,this.setTextureUnits=W,this.setTexture2D=ee,this.setTexture2DArray=ge,this.setTexture3D=Me,this.setTextureCube=P,this.rebindTextures=Kt,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function mC(r,e){function i(s,l=pr){let c;const f=jt.getTransfer(l);if(s===ha)return r.UNSIGNED_BYTE;if(s===om)return r.UNSIGNED_SHORT_4_4_4_4;if(s===lm)return r.UNSIGNED_SHORT_5_5_5_1;if(s===ib)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===ab)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===tb)return r.BYTE;if(s===nb)return r.SHORT;if(s===pc)return r.UNSIGNED_SHORT;if(s===rm)return r.INT;if(s===Wa)return r.UNSIGNED_INT;if(s===ka)return r.FLOAT;if(s===Ds)return r.HALF_FLOAT;if(s===sb)return r.ALPHA;if(s===rb)return r.RGB;if(s===Ra)return r.RGBA;if(s===Ls)return r.DEPTH_COMPONENT;if(s===Wr)return r.DEPTH_STENCIL;if(s===ob)return r.RED;if(s===cm)return r.RED_INTEGER;if(s===Kr)return r.RG;if(s===um)return r.RG_INTEGER;if(s===fm)return r.RGBA_INTEGER;if(s===sf||s===rf||s===of||s===lf)if(f===un)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===sf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===rf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===of)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===lf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===sf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===rf)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===of)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===lf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Sp||s===Ep||s===Mp||s===Tp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Sp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ep)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Mp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Tp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ap||s===wp||s===Rp||s===Cp||s===Np||s===df||s===Op)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Ap||s===wp)return f===un?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Rp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Cp)return c.COMPRESSED_R11_EAC;if(s===Np)return c.COMPRESSED_SIGNED_R11_EAC;if(s===df)return c.COMPRESSED_RG11_EAC;if(s===Op)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Dp||s===Lp||s===Ip||s===Up||s===Pp||s===Fp||s===Bp||s===zp||s===Gp||s===Hp||s===kp||s===Vp||s===jp||s===Xp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Dp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Lp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ip)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Up)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Fp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Gp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Hp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===kp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===jp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xp)return f===un?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Yp||s===Wp||s===qp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Yp)return f===un?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===$p||s===Kp||s===hf||s===Zp)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===$p)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Kp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===hf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===mc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const gC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xC=`
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

}`;class _C{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new xb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new $a({vertexShader:gC,fragmentShader:xC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new qa(new bf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vC extends vr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",p=1,m=null,v=null,_=null,g=null,y=null,M=null;const C=typeof XRWebGLBinding<"u",E=new _C,S={},N=i.getContextAttributes();let I=null,L=null;const V=[],D=[],B=new Ot;let A=null;const F=new da;F.viewport=new Bn;const $=new da;$.viewport=new Bn;const k=[F,$],X=new RT;let he=null,oe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let Se=V[ae];return Se===void 0&&(Se=new Fh,V[ae]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(ae){let Se=V[ae];return Se===void 0&&(Se=new Fh,V[ae]=Se),Se.getGripSpace()},this.getHand=function(ae){let Se=V[ae];return Se===void 0&&(Se=new Fh,V[ae]=Se),Se.getHandSpace()};function W(ae){const Se=D.indexOf(ae.inputSource);if(Se===-1)return;const ye=V[Se];ye!==void 0&&(ye.update(ae.inputSource,ae.frame,m||f),ye.dispatchEvent({type:ae.type,data:ae.inputSource}))}function U(){l.removeEventListener("select",W),l.removeEventListener("selectstart",W),l.removeEventListener("selectend",W),l.removeEventListener("squeeze",W),l.removeEventListener("squeezestart",W),l.removeEventListener("squeezeend",W),l.removeEventListener("end",U),l.removeEventListener("inputsourceschange",G);for(let ae=0;ae<V.length;ae++){const Se=D[ae];Se!==null&&(D[ae]=null,V[ae].disconnect(Se))}he=null,oe=null,E.reset();for(const ae in S)delete S[ae];e.setRenderTarget(I),y=null,g=null,_=null,l=null,L=null,Pe.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,s.isPresenting===!0&&gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){h=ae,s.isPresenting===!0&&gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(ae){m=ae},this.getBaseLayer=function(){return g!==null?g:y},this.getBinding=function(){return _===null&&C&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(I=e.getRenderTarget(),l.addEventListener("select",W),l.addEventListener("selectstart",W),l.addEventListener("selectend",W),l.addEventListener("squeeze",W),l.addEventListener("squeezestart",W),l.addEventListener("squeezeend",W),l.addEventListener("end",U),l.addEventListener("inputsourceschange",G),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(B),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,We=null,tt=null;N.depth&&(tt=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ye=N.stencil?Wr:Ls,We=N.stencil?mc:Wa);const rt={colorFormat:i.RGBA8,depthFormat:tt,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(rt),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),L=new Xa(g.textureWidth,g.textureHeight,{format:Ra,type:ha,depthTexture:new al(g.textureWidth,g.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const ye={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(l,i,ye),l.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),L=new Xa(y.framebufferWidth,y.framebufferHeight,{format:Ra,type:ha,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),Pe.setContext(l),Pe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return E.getDepthTexture()};function G(ae){for(let Se=0;Se<ae.removed.length;Se++){const ye=ae.removed[Se],We=D.indexOf(ye);We>=0&&(D[We]=null,V[We].disconnect(ye))}for(let Se=0;Se<ae.added.length;Se++){const ye=ae.added[Se];let We=D.indexOf(ye);if(We===-1){for(let rt=0;rt<V.length;rt++)if(rt>=D.length){D.push(ye),We=rt;break}else if(D[rt]===null){D[rt]=ye,We=rt;break}if(We===-1)break}const tt=V[We];tt&&tt.connect(ye)}}const ee=new ie,ge=new ie;function Me(ae,Se,ye){ee.setFromMatrixPosition(Se.matrixWorld),ge.setFromMatrixPosition(ye.matrixWorld);const We=ee.distanceTo(ge),tt=Se.projectionMatrix.elements,rt=ye.projectionMatrix.elements,Dt=tt[14]/(tt[10]-1),Et=tt[14]/(tt[10]+1),Ut=(tt[9]+1)/tt[5],Kt=(tt[9]-1)/tt[5],vt=(tt[8]-1)/tt[0],Zt=(rt[8]+1)/rt[0],rn=Dt*vt,Lt=Dt*Zt,Y=We/(-vt+Zt),Xt=Y*-vt;if(Se.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Xt),ae.translateZ(Y),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),tt[10]===-1)ae.projectionMatrix.copy(Se.projectionMatrix),ae.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const Tt=Dt+Y,tn=Et+Y,Ie=rn-Xt,Sn=Lt+(We-Xt),O=Ut*Et/tn*Tt,T=Kt*Et/tn*Tt;ae.projectionMatrix.makePerspective(Ie,Sn,O,T,Tt,tn),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function P(ae,Se){Se===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(Se.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let Se=ae.near,ye=ae.far;E.texture!==null&&(E.depthNear>0&&(Se=E.depthNear),E.depthFar>0&&(ye=E.depthFar)),X.near=$.near=F.near=Se,X.far=$.far=F.far=ye,(he!==X.near||oe!==X.far)&&(l.updateRenderState({depthNear:X.near,depthFar:X.far}),he=X.near,oe=X.far),X.layers.mask=ae.layers.mask|6,F.layers.mask=X.layers.mask&-5,$.layers.mask=X.layers.mask&-3;const We=ae.parent,tt=X.cameras;P(X,We);for(let rt=0;rt<tt.length;rt++)P(tt[rt],We);tt.length===2?Me(X,F,$):X.projectionMatrix.copy(F.projectionMatrix),J(ae,X,We)};function J(ae,Se,ye){ye===null?ae.matrix.copy(Se.matrixWorld):(ae.matrix.copy(ye.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(Se.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(Se.projectionMatrix),ae.projectionMatrixInverse.copy(Se.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Jp*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(g===null&&y===null))return p},this.setFoveation=function(ae){p=ae,g!==null&&(g.fixedFoveation=ae),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=ae)},this.hasDepthSensing=function(){return E.texture!==null},this.getDepthSensingMesh=function(){return E.getMesh(X)},this.getCameraTexture=function(ae){return S[ae]};let be=null;function Ne(ae,Se){if(v=Se.getViewerPose(m||f),M=Se,v!==null){const ye=v.views;y!==null&&(e.setRenderTargetFramebuffer(L,y.framebuffer),e.setRenderTarget(L));let We=!1;ye.length!==X.cameras.length&&(X.cameras.length=0,We=!0);for(let Et=0;Et<ye.length;Et++){const Ut=ye[Et];let Kt=null;if(y!==null)Kt=y.getViewport(Ut);else{const Zt=_.getViewSubImage(g,Ut);Kt=Zt.viewport,Et===0&&(e.setRenderTargetTextures(L,Zt.colorTexture,Zt.depthStencilTexture),e.setRenderTarget(L))}let vt=k[Et];vt===void 0&&(vt=new da,vt.layers.enable(Et),vt.viewport=new Bn,k[Et]=vt),vt.matrix.fromArray(Ut.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(Ut.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Et===0&&(X.matrix.copy(vt.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),We===!0&&X.cameras.push(vt)}const tt=l.enabledFeatures;if(tt&&tt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){_=s.getBinding();const Et=_.getDepthInformation(ye[0]);Et&&Et.isValid&&Et.texture&&E.init(Et,l.renderState)}if(tt&&tt.includes("camera-access")&&C){e.state.unbindTexture(),_=s.getBinding();for(let Et=0;Et<ye.length;Et++){const Ut=ye[Et].camera;if(Ut){let Kt=S[Ut];Kt||(Kt=new xb,S[Ut]=Kt);const vt=_.getCameraImage(Ut);Kt.sourceTexture=vt}}}}for(let ye=0;ye<V.length;ye++){const We=D[ye],tt=V[ye];We!==null&&tt!==void 0&&tt.update(We,Se,m||f)}be&&be(ae,Se),Se.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Se}),M=null}const Pe=new yb;Pe.setAnimationLoop(Ne),this.setAnimationLoop=function(ae){be=ae},this.dispose=function(){}}}const bC=new Zn,Rb=new St;Rb.set(-1,0,0,0,1,0,0,0,1);function yC(r,e){function i(E,S){E.matrixAutoUpdate===!0&&E.updateMatrix(),S.value.copy(E.matrix)}function s(E,S){S.color.getRGB(E.fogColor.value,_b(r)),S.isFog?(E.fogNear.value=S.near,E.fogFar.value=S.far):S.isFogExp2&&(E.fogDensity.value=S.density)}function l(E,S,N,I,L){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(E,S):S.isMeshLambertMaterial?(c(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(E,S),_(E,S)):S.isMeshPhongMaterial?(c(E,S),v(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(E,S),g(E,S),S.isMeshPhysicalMaterial&&y(E,S,L)):S.isMeshMatcapMaterial?(c(E,S),M(E,S)):S.isMeshDepthMaterial?c(E,S):S.isMeshDistanceMaterial?(c(E,S),C(E,S)):S.isMeshNormalMaterial?c(E,S):S.isLineBasicMaterial?(f(E,S),S.isLineDashedMaterial&&h(E,S)):S.isPointsMaterial?p(E,S,N,I):S.isSpriteMaterial?m(E,S):S.isShadowMaterial?(E.color.value.copy(S.color),E.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(E,S){E.opacity.value=S.opacity,S.color&&E.diffuse.value.copy(S.color),S.emissive&&E.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.bumpMap&&(E.bumpMap.value=S.bumpMap,i(S.bumpMap,E.bumpMapTransform),E.bumpScale.value=S.bumpScale,S.side===Pi&&(E.bumpScale.value*=-1)),S.normalMap&&(E.normalMap.value=S.normalMap,i(S.normalMap,E.normalMapTransform),E.normalScale.value.copy(S.normalScale),S.side===Pi&&E.normalScale.value.negate()),S.displacementMap&&(E.displacementMap.value=S.displacementMap,i(S.displacementMap,E.displacementMapTransform),E.displacementScale.value=S.displacementScale,E.displacementBias.value=S.displacementBias),S.emissiveMap&&(E.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,E.emissiveMapTransform)),S.specularMap&&(E.specularMap.value=S.specularMap,i(S.specularMap,E.specularMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest);const N=e.get(S),I=N.envMap,L=N.envMapRotation;I&&(E.envMap.value=I,E.envMapRotation.value.setFromMatrix4(bC.makeRotationFromEuler(L)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&E.envMapRotation.value.premultiply(Rb),E.reflectivity.value=S.reflectivity,E.ior.value=S.ior,E.refractionRatio.value=S.refractionRatio),S.lightMap&&(E.lightMap.value=S.lightMap,E.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,E.lightMapTransform)),S.aoMap&&(E.aoMap.value=S.aoMap,E.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,E.aoMapTransform))}function f(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform))}function h(E,S){E.dashSize.value=S.dashSize,E.totalSize.value=S.dashSize+S.gapSize,E.scale.value=S.scale}function p(E,S,N,I){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.size.value=S.size*N,E.scale.value=I*.5,S.map&&(E.map.value=S.map,i(S.map,E.uvTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function m(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.rotation.value=S.rotation,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function v(E,S){E.specular.value.copy(S.specular),E.shininess.value=Math.max(S.shininess,1e-4)}function _(E,S){S.gradientMap&&(E.gradientMap.value=S.gradientMap)}function g(E,S){E.metalness.value=S.metalness,S.metalnessMap&&(E.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,E.metalnessMapTransform)),E.roughness.value=S.roughness,S.roughnessMap&&(E.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,E.roughnessMapTransform)),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)}function y(E,S,N){E.ior.value=S.ior,S.sheen>0&&(E.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),E.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(E.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,E.sheenColorMapTransform)),S.sheenRoughnessMap&&(E.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,E.sheenRoughnessMapTransform))),S.clearcoat>0&&(E.clearcoat.value=S.clearcoat,E.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(E.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,E.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(E.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Pi&&E.clearcoatNormalScale.value.negate())),S.dispersion>0&&(E.dispersion.value=S.dispersion),S.iridescence>0&&(E.iridescence.value=S.iridescence,E.iridescenceIOR.value=S.iridescenceIOR,E.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(E.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,E.iridescenceMapTransform)),S.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),S.transmission>0&&(E.transmission.value=S.transmission,E.transmissionSamplerMap.value=N.texture,E.transmissionSamplerSize.value.set(N.width,N.height),S.transmissionMap&&(E.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,E.transmissionMapTransform)),E.thickness.value=S.thickness,S.thicknessMap&&(E.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=S.attenuationDistance,E.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(E.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(E.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=S.specularIntensity,E.specularColor.value.copy(S.specularColor),S.specularColorMap&&(E.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,E.specularColorMapTransform)),S.specularIntensityMap&&(E.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,E.specularIntensityMapTransform))}function M(E,S){S.matcap&&(E.matcap.value=S.matcap)}function C(E,S){const N=e.get(S).light;E.referencePosition.value.setFromMatrixPosition(N.matrixWorld),E.nearDistance.value=N.shadow.camera.near,E.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function SC(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(N,I){const L=I.program;s.uniformBlockBinding(N,L)}function m(N,I){let L=l[N.id];L===void 0&&(M(N),L=v(N),l[N.id]=L,N.addEventListener("dispose",E));const V=I.program;s.updateUBOMapping(N,V);const D=e.render.frame;c[N.id]!==D&&(g(N),c[N.id]=D)}function v(N){const I=_();N.__bindingPointIndex=I;const L=r.createBuffer(),V=N.__size,D=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,L),r.bufferData(r.UNIFORM_BUFFER,V,D),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,L),L}function _(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const I=l[N.id],L=N.uniforms,V=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let D=0,B=L.length;D<B;D++){const A=Array.isArray(L[D])?L[D]:[L[D]];for(let F=0,$=A.length;F<$;F++){const k=A[F];if(y(k,D,F,V)===!0){const X=k.__offset,he=Array.isArray(k.value)?k.value:[k.value];let oe=0;for(let W=0;W<he.length;W++){const U=he[W],G=C(U);typeof U=="number"||typeof U=="boolean"?(k.__data[0]=U,r.bufferSubData(r.UNIFORM_BUFFER,X+oe,k.__data)):U.isMatrix3?(k.__data[0]=U.elements[0],k.__data[1]=U.elements[1],k.__data[2]=U.elements[2],k.__data[3]=0,k.__data[4]=U.elements[3],k.__data[5]=U.elements[4],k.__data[6]=U.elements[5],k.__data[7]=0,k.__data[8]=U.elements[6],k.__data[9]=U.elements[7],k.__data[10]=U.elements[8],k.__data[11]=0):ArrayBuffer.isView(U)?k.__data.set(new U.constructor(U.buffer,U.byteOffset,k.__data.length)):(U.toArray(k.__data,oe),oe+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,X,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function y(N,I,L,V){const D=N.value,B=I+"_"+L;if(V[B]===void 0)return typeof D=="number"||typeof D=="boolean"?V[B]=D:ArrayBuffer.isView(D)?V[B]=D.slice():V[B]=D.clone(),!0;{const A=V[B];if(typeof D=="number"||typeof D=="boolean"){if(A!==D)return V[B]=D,!0}else{if(ArrayBuffer.isView(D))return!0;if(A.equals(D)===!1)return A.copy(D),!0}}return!1}function M(N){const I=N.uniforms;let L=0;const V=16;for(let B=0,A=I.length;B<A;B++){const F=Array.isArray(I[B])?I[B]:[I[B]];for(let $=0,k=F.length;$<k;$++){const X=F[$],he=Array.isArray(X.value)?X.value:[X.value];for(let oe=0,W=he.length;oe<W;oe++){const U=he[oe],G=C(U),ee=L%V,ge=ee%G.boundary,Me=ee+ge;L+=ge,Me!==0&&V-Me<G.storage&&(L+=V-Me),X.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=L,L+=G.storage}}}const D=L%V;return D>0&&(L+=V-D),N.__size=L,N.__cache={},this}function C(N){const I={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(I.boundary=4,I.storage=4):N.isVector2?(I.boundary=8,I.storage=8):N.isVector3||N.isColor?(I.boundary=16,I.storage=12):N.isVector4?(I.boundary=16,I.storage=16):N.isMatrix3?(I.boundary=48,I.storage=48):N.isMatrix4?(I.boundary=64,I.storage=64):N.isTexture?gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(I.boundary=16,I.storage=N.byteLength):gt("WebGLRenderer: Unsupported uniform value type.",N),I}function E(N){const I=N.target;I.removeEventListener("dispose",E);const L=f.indexOf(I.__bindingPointIndex);f.splice(L,1),r.deleteBuffer(l[I.id]),delete l[I.id],delete c[I.id]}function S(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:p,update:m,dispose:S}}const EC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ga=null;function MC(){return Ga===null&&(Ga=new fT(EC,16,16,Kr,Ds),Ga.name="DFG_LUT",Ga.minFilter=Si,Ga.magFilter=Si,Ga.wrapS=Cs,Ga.wrapT=Cs,Ga.generateMipmaps=!1,Ga.needsUpdate=!0),Ga}class TC{constructor(e={}){const{canvas:i=HM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:y=ha}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const C=y,E=new Set([fm,um,cm]),S=new Set([ha,Wa,pc,mc,om,lm]),N=new Uint32Array(4),I=new Int32Array(4),L=new ie;let V=null,D=null;const B=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ja,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const $=this;let k=!1,X=null;this._outputColorSpace=Zi;let he=0,oe=0,W=null,U=-1,G=null;const ee=new Bn,ge=new Bn;let Me=null;const P=new mn(0);let J=0,be=i.width,Ne=i.height,Pe=1,ae=null,Se=null;const ye=new Bn(0,0,be,Ne),We=new Bn(0,0,be,Ne);let tt=!1;const rt=new mb;let Dt=!1,Et=!1;const Ut=new Zn,Kt=new ie,vt=new Bn,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rn=!1;function Lt(){return W===null?Pe:1}let Y=s;function Xt(w,q){return i.getContext(w,q)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${sm}`),i.addEventListener("webglcontextlost",Te,!1),i.addEventListener("webglcontextrestored",qe,!1),i.addEventListener("webglcontextcreationerror",ut,!1),Y===null){const q="webgl2";if(Y=Xt(q,w),Y===null)throw Xt(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw $t("WebGLRenderer: "+w.message),w}let Tt,tn,Ie,Sn,O,T,Q,pe,Ee,Ue,Be,ue,me,Ae,ze,Fe,Ce,ht,at,Rt,H,Oe,fe;function Xe(){Tt=new Mw(Y),Tt.init(),H=new mC(Y,Tt),tn=new gw(Y,Tt,e,H),Ie=new hC(Y,Tt),tn.reversedDepthBuffer&&g&&Ie.buffers.depth.setReversed(!0),Sn=new ww(Y),O=new JR,T=new pC(Y,Tt,Ie,O,tn,H,Sn),Q=new Ew($),pe=new OT(Y),Oe=new pw(Y,pe),Ee=new Tw(Y,pe,Sn,Oe),Ue=new Cw(Y,Ee,pe,Oe,Sn),ht=new Rw(Y,tn,T),ze=new xw(O),Be=new QR($,Q,Tt,tn,Oe,ze),ue=new yC($,O),me=new tC,Ae=new oC(Tt),Ce=new hw($,Q,Ie,Ue,M,p),Fe=new dC($,Ue,tn),fe=new SC(Y,Sn,tn,Ie),at=new mw(Y,Tt,Sn),Rt=new Aw(Y,Tt,Sn),Sn.programs=Be.programs,$.capabilities=tn,$.extensions=Tt,$.properties=O,$.renderLists=me,$.shadowMap=Fe,$.state=Ie,$.info=Sn}Xe(),C!==ha&&(F=new Ow(C,i.width,i.height,l,c));const Le=new vC($,Y);this.xr=Le,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const w=Tt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Tt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Pe},this.setPixelRatio=function(w){w!==void 0&&(Pe=w,this.setSize(be,Ne,!1))},this.getSize=function(w){return w.set(be,Ne)},this.setSize=function(w,q,K=!0){if(Le.isPresenting){gt("WebGLRenderer: Can't change size while VR device is presenting.");return}be=w,Ne=q,i.width=Math.floor(w*Pe),i.height=Math.floor(q*Pe),K===!0&&(i.style.width=w+"px",i.style.height=q+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,q)},this.getDrawingBufferSize=function(w){return w.set(be*Pe,Ne*Pe).floor()},this.setDrawingBufferSize=function(w,q,K){be=w,Ne=q,Pe=K,i.width=Math.floor(w*K),i.height=Math.floor(q*K),this.setViewport(0,0,w,q)},this.setEffects=function(w){if(C===ha){$t("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let q=0;q<w.length;q++)if(w[q].isOutputPass===!0){gt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ee)},this.getViewport=function(w){return w.copy(ye)},this.setViewport=function(w,q,K,ne){w.isVector4?ye.set(w.x,w.y,w.z,w.w):ye.set(w,q,K,ne),Ie.viewport(ee.copy(ye).multiplyScalar(Pe).round())},this.getScissor=function(w){return w.copy(We)},this.setScissor=function(w,q,K,ne){w.isVector4?We.set(w.x,w.y,w.z,w.w):We.set(w,q,K,ne),Ie.scissor(ge.copy(We).multiplyScalar(Pe).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(w){Ie.setScissorTest(tt=w)},this.setOpaqueSort=function(w){ae=w},this.setTransparentSort=function(w){Se=w},this.getClearColor=function(w){return w.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(w=!0,q=!0,K=!0){let ne=0;if(w){let te=!1;if(W!==null){const ke=W.texture.format;te=E.has(ke)}if(te){const ke=W.texture.type,De=S.has(ke),Ge=Ce.getClearColor(),Ze=Ce.getClearAlpha(),$e=Ge.r,ot=Ge.g,bt=Ge.b;De?(N[0]=$e,N[1]=ot,N[2]=bt,N[3]=Ze,Y.clearBufferuiv(Y.COLOR,0,N)):(I[0]=$e,I[1]=ot,I[2]=bt,I[3]=Ze,Y.clearBufferiv(Y.COLOR,0,I))}else ne|=Y.COLOR_BUFFER_BIT}q&&(ne|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(ne|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&Y.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),X=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Te,!1),i.removeEventListener("webglcontextrestored",qe,!1),i.removeEventListener("webglcontextcreationerror",ut,!1),Ce.dispose(),me.dispose(),Ae.dispose(),O.dispose(),Q.dispose(),Ue.dispose(),Oe.dispose(),fe.dispose(),Be.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Ca),Le.removeEventListener("sessionend",br),Dn.stop()};function Te(w){w.preventDefault(),G_("WebGLRenderer: Context Lost."),k=!0}function qe(){G_("WebGLRenderer: Context Restored."),k=!1;const w=Sn.autoReset,q=Fe.enabled,K=Fe.autoUpdate,ne=Fe.needsUpdate,te=Fe.type;Xe(),Sn.autoReset=w,Fe.enabled=q,Fe.autoUpdate=K,Fe.needsUpdate=ne,Fe.type=te}function ut(w){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function En(w){const q=w.target;q.removeEventListener("dispose",En),Yt(q)}function Yt(w){Ln(w),O.remove(w)}function Ln(w){const q=O.get(w).programs;q!==void 0&&(q.forEach(function(K){Be.releaseProgram(K)}),w.isShaderMaterial&&Be.releaseShaderCache(w))}this.renderBufferDirect=function(w,q,K,ne,te,ke){q===null&&(q=Zt);const De=te.isMesh&&te.matrixWorld.determinant()<0,Ge=Ji(w,q,K,ne,te);Ie.setMaterial(ne,De);let Ze=K.index,$e=1;if(ne.wireframe===!0){if(Ze=Ee.getWireframeAttribute(K),Ze===void 0)return;$e=2}const ot=K.drawRange,bt=K.attributes.position;let it=ot.start*$e,Wt=(ot.start+ot.count)*$e;ke!==null&&(it=Math.max(it,ke.start*$e),Wt=Math.min(Wt,(ke.start+ke.count)*$e)),Ze!==null?(it=Math.max(it,0),Wt=Math.min(Wt,Ze.count)):bt!=null&&(it=Math.max(it,0),Wt=Math.min(Wt,bt.count));const ft=Wt-it;if(ft<0||ft===1/0)return;Oe.setup(te,ne,Ge,K,Ze);let sn,Qt=at;if(Ze!==null&&(sn=pe.get(Ze),Qt=Rt,Qt.setIndex(sn)),te.isMesh)ne.wireframe===!0?(Ie.setLineWidth(ne.wireframeLinewidth*Lt()),Qt.setMode(Y.LINES)):Qt.setMode(Y.TRIANGLES);else if(te.isLine){let qt=ne.linewidth;qt===void 0&&(qt=1),Ie.setLineWidth(qt*Lt()),te.isLineSegments?Qt.setMode(Y.LINES):te.isLineLoop?Qt.setMode(Y.LINE_LOOP):Qt.setMode(Y.LINE_STRIP)}else te.isPoints?Qt.setMode(Y.POINTS):te.isSprite&&Qt.setMode(Y.TRIANGLES);if(te.isBatchedMesh)if(Tt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const qt=te._multiDrawStarts,Ve=te._multiDrawCounts,Gn=te._multiDrawCount,At=Ze?pe.get(Ze).bytesPerElement:1,xn=O.get(ne).currentProgram.getUniforms();for(let Rn=0;Rn<Gn;Rn++)xn.setValue(Y,"_gl_DrawID",Rn),Qt.render(qt[Rn]/At,Ve[Rn])}else if(te.isInstancedMesh)Qt.renderInstances(it,ft,te.count);else if(K.isInstancedBufferGeometry){const qt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ve=Math.min(K.instanceCount,qt);Qt.renderInstances(it,ft,Ve)}else Qt.render(it,ft)};function mi(w,q,K){w.transparent===!0&&w.side===Rs&&w.forceSinglePass===!1?(w.side=Pi,w.needsUpdate=!0,Is(w,q,K),w.side=xr,w.needsUpdate=!0,Is(w,q,K),w.side=Rs):Is(w,q,K)}this.compile=function(w,q,K=null){K===null&&(K=w),D=Ae.get(K),D.init(q),A.push(D),K.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(D.pushLight(te),te.castShadow&&D.pushShadow(te))}),w!==K&&w.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(D.pushLight(te),te.castShadow&&D.pushShadow(te))}),D.setupLights();const ne=new Set;return w.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const ke=te.material;if(ke)if(Array.isArray(ke))for(let De=0;De<ke.length;De++){const Ge=ke[De];mi(Ge,K,te),ne.add(Ge)}else mi(ke,K,te),ne.add(ke)}),D=A.pop(),ne},this.compileAsync=function(w,q,K=null){const ne=this.compile(w,q,K);return new Promise(te=>{function ke(){if(ne.forEach(function(De){O.get(De).currentProgram.isReady()&&ne.delete(De)}),ne.size===0){te(w);return}setTimeout(ke,10)}Tt.get("KHR_parallel_shader_compile")!==null?ke():setTimeout(ke,10)})};let Za=null;function ri(w){Za&&Za(w)}function Ca(){Dn.stop()}function br(){Dn.start()}const Dn=new yb;Dn.setAnimationLoop(ri),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(w){Za=w,Le.setAnimationLoop(w),w===null?Dn.stop():Dn.start()},Le.addEventListener("sessionstart",Ca),Le.addEventListener("sessionend",br),this.render=function(w,q){if(q!==void 0&&q.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;X!==null&&X.renderStart(w,q);const K=Le.enabled===!0&&Le.isPresenting===!0,ne=F!==null&&(W===null||K)&&F.begin($,W);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(q),q=Le.getCamera()),w.isScene===!0&&w.onBeforeRender($,w,q,W),D=Ae.get(w,A.length),D.init(q),D.state.textureUnits=T.getTextureUnits(),A.push(D),Ut.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),rt.setFromProjectionMatrix(Ut,Va,q.reversedDepth),Et=this.localClippingEnabled,Dt=ze.init(this.clippingPlanes,Et),V=me.get(w,B.length),V.init(),B.push(V),Le.enabled===!0&&Le.isPresenting===!0){const De=$.xr.getDepthSensingMesh();De!==null&&Mn(De,q,-1/0,$.sortObjects)}Mn(w,q,0,$.sortObjects),V.finish(),$.sortObjects===!0&&V.sort(ae,Se),rn=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,rn&&Ce.addToRenderList(V,w),this.info.render.frame++,Dt===!0&&ze.beginShadows();const te=D.state.shadowsArray;if(Fe.render(te,w,q),Dt===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ne&&F.hasRenderPass())===!1){const De=V.opaque,Ge=V.transmissive;if(D.setupLights(),q.isArrayCamera){const Ze=q.cameras;if(Ge.length>0)for(let $e=0,ot=Ze.length;$e<ot;$e++){const bt=Ze[$e];Bi(De,Ge,w,bt)}rn&&Ce.render(w);for(let $e=0,ot=Ze.length;$e<ot;$e++){const bt=Ze[$e];on(V,w,bt,bt.viewport)}}else Ge.length>0&&Bi(De,Ge,w,q),rn&&Ce.render(w),on(V,w,q)}W!==null&&oe===0&&(T.updateMultisampleRenderTarget(W),T.updateRenderTargetMipmap(W)),ne&&F.end($),w.isScene===!0&&w.onAfterRender($,w,q),Oe.resetDefaultState(),U=-1,G=null,A.pop(),A.length>0?(D=A[A.length-1],T.setTextureUnits(D.state.textureUnits),Dt===!0&&ze.setGlobalState($.clippingPlanes,D.state.camera)):D=null,B.pop(),B.length>0?V=B[B.length-1]:V=null,X!==null&&X.renderEnd()};function Mn(w,q,K,ne){if(w.visible===!1)return;if(w.layers.test(q.layers)){if(w.isGroup)K=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(q);else if(w.isLightProbeGrid)D.pushLightProbeGrid(w);else if(w.isLight)D.pushLight(w),w.castShadow&&D.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||rt.intersectsSprite(w)){ne&&vt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ut);const De=Ue.update(w),Ge=w.material;Ge.visible&&V.push(w,De,Ge,K,vt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||rt.intersectsObject(w))){const De=Ue.update(w),Ge=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),vt.copy(w.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),vt.copy(De.boundingSphere.center)),vt.applyMatrix4(w.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ge)){const Ze=De.groups;for(let $e=0,ot=Ze.length;$e<ot;$e++){const bt=Ze[$e],it=Ge[bt.materialIndex];it&&it.visible&&V.push(w,De,it,K,vt.z,bt)}}else Ge.visible&&V.push(w,De,Ge,K,vt.z,null)}}const ke=w.children;for(let De=0,Ge=ke.length;De<Ge;De++)Mn(ke[De],q,K,ne)}function on(w,q,K,ne){const{opaque:te,transmissive:ke,transparent:De}=w;D.setupLightsView(K),Dt===!0&&ze.setGlobalState($.clippingPlanes,K),ne&&Ie.viewport(ee.copy(ne)),te.length>0&&gn(te,q,K),ke.length>0&&gn(ke,q,K),De.length>0&&gn(De,q,K),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Bi(w,q,K,ne){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[ne.id]===void 0){const it=Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[ne.id]=new Xa(1,1,{generateMipmaps:!0,type:it?Ds:ha,minFilter:Yr,samples:Math.max(4,tn.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const ke=D.state.transmissionRenderTarget[ne.id],De=ne.viewport||ee;ke.setSize(De.z*$.transmissionResolutionScale,De.w*$.transmissionResolutionScale);const Ge=$.getRenderTarget(),Ze=$.getActiveCubeFace(),$e=$.getActiveMipmapLevel();$.setRenderTarget(ke),$.getClearColor(P),J=$.getClearAlpha(),J<1&&$.setClearColor(16777215,.5),$.clear(),rn&&Ce.render(K);const ot=$.toneMapping;$.toneMapping=ja;const bt=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),D.setupLightsView(ne),Dt===!0&&ze.setGlobalState($.clippingPlanes,ne),gn(w,K,ne),T.updateMultisampleRenderTarget(ke),T.updateRenderTargetMipmap(ke),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Wt=0,ft=q.length;Wt<ft;Wt++){const sn=q[Wt],{object:Qt,geometry:qt,material:Ve,group:Gn}=sn;if(Ve.side===Rs&&Qt.layers.test(ne.layers)){const At=Ve.side;Ve.side=Pi,Ve.needsUpdate=!0,Na(Qt,K,ne,qt,Ve,Gn),Ve.side=At,Ve.needsUpdate=!0,it=!0}}it===!0&&(T.updateMultisampleRenderTarget(ke),T.updateRenderTargetMipmap(ke))}$.setRenderTarget(Ge,Ze,$e),$.setClearColor(P,J),bt!==void 0&&(ne.viewport=bt),$.toneMapping=ot}function gn(w,q,K){const ne=q.isScene===!0?q.overrideMaterial:null;for(let te=0,ke=w.length;te<ke;te++){const De=w[te],{object:Ge,geometry:Ze,group:$e}=De;let ot=De.material;ot.allowOverride===!0&&ne!==null&&(ot=ne),Ge.layers.test(K.layers)&&Na(Ge,q,K,Ze,ot,$e)}}function Na(w,q,K,ne,te,ke){w.onBeforeRender($,q,K,ne,te,ke),w.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),te.onBeforeRender($,q,K,ne,w,ke),te.transparent===!0&&te.side===Rs&&te.forceSinglePass===!1?(te.side=Pi,te.needsUpdate=!0,$.renderBufferDirect(K,q,ne,te,w,ke),te.side=xr,te.needsUpdate=!0,$.renderBufferDirect(K,q,ne,te,w,ke),te.side=Rs):$.renderBufferDirect(K,q,ne,te,w,ke),w.onAfterRender($,q,K,ne,te,ke)}function Is(w,q,K){q.isScene!==!0&&(q=Zt);const ne=O.get(w),te=D.state.lights,ke=D.state.shadowsArray,De=te.state.version,Ge=Be.getParameters(w,te.state,ke,q,K,D.state.lightProbeGridArray),Ze=Be.getProgramCacheKey(Ge);let $e=ne.programs;ne.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?q.environment:null,ne.fog=q.fog;const ot=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ne.envMap=Q.get(w.envMap||ne.environment,ot),ne.envMapRotation=ne.environment!==null&&w.envMap===null?q.environmentRotation:w.envMapRotation,$e===void 0&&(w.addEventListener("dispose",En),$e=new Map,ne.programs=$e);let bt=$e.get(Ze);if(bt!==void 0){if(ne.currentProgram===bt&&ne.lightsStateVersion===De)return Ja(w,Ge),bt}else Ge.uniforms=Be.getUniforms(w),X!==null&&w.isNodeMaterial&&X.build(w,K,Ge),w.onBeforeCompile(Ge,$),bt=Be.acquireProgram(Ge,Ze),$e.set(Ze,bt),ne.uniforms=Ge.uniforms;const it=ne.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(it.clippingPlanes=ze.uniform),Ja(w,Ge),ne.needsLights=ga(w),ne.lightsStateVersion=De,ne.needsLights&&(it.ambientLightColor.value=te.state.ambient,it.lightProbe.value=te.state.probe,it.directionalLights.value=te.state.directional,it.directionalLightShadows.value=te.state.directionalShadow,it.spotLights.value=te.state.spot,it.spotLightShadows.value=te.state.spotShadow,it.rectAreaLights.value=te.state.rectArea,it.ltc_1.value=te.state.rectAreaLTC1,it.ltc_2.value=te.state.rectAreaLTC2,it.pointLights.value=te.state.point,it.pointLightShadows.value=te.state.pointShadow,it.hemisphereLights.value=te.state.hemi,it.directionalShadowMatrix.value=te.state.directionalShadowMatrix,it.spotLightMatrix.value=te.state.spotLightMatrix,it.spotLightMap.value=te.state.spotLightMap,it.pointShadowMatrix.value=te.state.pointShadowMatrix),ne.lightProbeGrid=D.state.lightProbeGridArray.length>0,ne.currentProgram=bt,ne.uniformsList=null,bt}function Qa(w){if(w.uniformsList===null){const q=w.currentProgram.getUniforms();w.uniformsList=uf.seqWithValue(q.seq,w.uniforms)}return w.uniformsList}function Ja(w,q){const K=O.get(w);K.outputColorSpace=q.outputColorSpace,K.batching=q.batching,K.batchingColor=q.batchingColor,K.instancing=q.instancing,K.instancingColor=q.instancingColor,K.instancingMorph=q.instancingMorph,K.skinning=q.skinning,K.morphTargets=q.morphTargets,K.morphNormals=q.morphNormals,K.morphColors=q.morphColors,K.morphTargetsCount=q.morphTargetsCount,K.numClippingPlanes=q.numClippingPlanes,K.numIntersection=q.numClipIntersection,K.vertexAlphas=q.vertexAlphas,K.vertexTangents=q.vertexTangents,K.toneMapping=q.toneMapping}function Qr(w,q){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;L.setFromMatrixPosition(q.matrixWorld);for(let K=0,ne=w.length;K<ne;K++){const te=w[K];if(te.texture!==null&&te.boundingBox.containsPoint(L))return te}return null}function Ji(w,q,K,ne,te){q.isScene!==!0&&(q=Zt),T.resetTextureUnits();const ke=q.fog,De=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?q.environment:null,Ge=W===null?$.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:jt.workingColorSpace,Ze=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,$e=Q.get(ne.envMap||De,Ze),ot=ne.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,bt=!!K.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),it=!!K.morphAttributes.position,Wt=!!K.morphAttributes.normal,ft=!!K.morphAttributes.color;let sn=ja;ne.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(sn=$.toneMapping);const Qt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,qt=Qt!==void 0?Qt.length:0,Ve=O.get(ne),Gn=D.state.lights;if(Dt===!0&&(Et===!0||w!==G)){const yt=w===G&&ne.id===U;ze.setState(ne,w,yt)}let At=!1;ne.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Gn.state.version||Ve.outputColorSpace!==Ge||te.isBatchedMesh&&Ve.batching===!1||!te.isBatchedMesh&&Ve.batching===!0||te.isBatchedMesh&&Ve.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Ve.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Ve.instancing===!1||!te.isInstancedMesh&&Ve.instancing===!0||te.isSkinnedMesh&&Ve.skinning===!1||!te.isSkinnedMesh&&Ve.skinning===!0||te.isInstancedMesh&&Ve.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Ve.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Ve.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Ve.instancingMorph===!1&&te.morphTexture!==null||Ve.envMap!==$e||ne.fog===!0&&Ve.fog!==ke||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==ot||Ve.vertexTangents!==bt||Ve.morphTargets!==it||Ve.morphNormals!==Wt||Ve.morphColors!==ft||Ve.toneMapping!==sn||Ve.morphTargetsCount!==qt||!!Ve.lightProbeGrid!=D.state.lightProbeGridArray.length>0)&&(At=!0):(At=!0,Ve.__version=ne.version);let xn=Ve.currentProgram;At===!0&&(xn=Is(ne,q,te),X&&ne.isNodeMaterial&&X.onUpdateProgram(ne,xn,Ve));let Rn=!1,Cn=!1,Yn=!1;const nn=xn.getUniforms(),_n=Ve.uniforms;if(Ie.useProgram(xn.program)&&(Rn=!0,Cn=!0,Yn=!0),ne.id!==U&&(U=ne.id,Cn=!0),Ve.needsLights){const yt=Qr(D.state.lightProbeGridArray,te);Ve.lightProbeGrid!==yt&&(Ve.lightProbeGrid=yt,Cn=!0)}if(Rn||G!==w){Ie.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),nn.setValue(Y,"projectionMatrix",w.projectionMatrix),nn.setValue(Y,"viewMatrix",w.matrixWorldInverse);const _a=nn.map.cameraPosition;_a!==void 0&&_a.setValue(Y,Kt.setFromMatrixPosition(w.matrixWorld)),tn.logarithmicDepthBuffer&&nn.setValue(Y,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&nn.setValue(Y,"isOrthographic",w.isOrthographicCamera===!0),G!==w&&(G=w,Cn=!0,Yn=!0)}if(Ve.needsLights&&(Gn.state.directionalShadowMap.length>0&&nn.setValue(Y,"directionalShadowMap",Gn.state.directionalShadowMap,T),Gn.state.spotShadowMap.length>0&&nn.setValue(Y,"spotShadowMap",Gn.state.spotShadowMap,T),Gn.state.pointShadowMap.length>0&&nn.setValue(Y,"pointShadowMap",Gn.state.pointShadowMap,T)),te.isSkinnedMesh){nn.setOptional(Y,te,"bindMatrix"),nn.setOptional(Y,te,"bindMatrixInverse");const yt=te.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),nn.setValue(Y,"boneTexture",yt.boneTexture,T))}te.isBatchedMesh&&(nn.setOptional(Y,te,"batchingTexture"),nn.setValue(Y,"batchingTexture",te._matricesTexture,T),nn.setOptional(Y,te,"batchingIdTexture"),nn.setValue(Y,"batchingIdTexture",te._indirectTexture,T),nn.setOptional(Y,te,"batchingColorTexture"),te._colorsTexture!==null&&nn.setValue(Y,"batchingColorTexture",te._colorsTexture,T));const Wn=K.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&ht.update(te,K,xn),(Cn||Ve.receiveShadow!==te.receiveShadow)&&(Ve.receiveShadow=te.receiveShadow,nn.setValue(Y,"receiveShadow",te.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&q.environment!==null&&(_n.envMapIntensity.value=q.environmentIntensity),_n.dfgLUT!==void 0&&(_n.dfgLUT.value=MC()),Cn){if(nn.setValue(Y,"toneMappingExposure",$.toneMappingExposure),Ve.needsLights&&ma(_n,Yn),ke&&ne.fog===!0&&ue.refreshFogUniforms(_n,ke),ue.refreshMaterialUniforms(_n,ne,Pe,Ne,D.state.transmissionRenderTarget[w.id]),Ve.needsLights&&Ve.lightProbeGrid){const yt=Ve.lightProbeGrid;_n.probesSH.value=yt.texture,_n.probesMin.value.copy(yt.boundingBox.min),_n.probesMax.value.copy(yt.boundingBox.max),_n.probesResolution.value.copy(yt.resolution)}uf.upload(Y,Qa(Ve),_n,T)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(uf.upload(Y,Qa(Ve),_n,T),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&nn.setValue(Y,"center",te.center),nn.setValue(Y,"modelViewMatrix",te.modelViewMatrix),nn.setValue(Y,"normalMatrix",te.normalMatrix),nn.setValue(Y,"modelMatrix",te.matrixWorld),ne.uniformsGroups!==void 0){const yt=ne.uniformsGroups;for(let _a=0,es=yt.length;_a<es;_a++){const Oa=yt[_a];fe.update(Oa,xn),fe.bind(Oa,xn)}}return xn}function ma(w,q){w.ambientLightColor.needsUpdate=q,w.lightProbe.needsUpdate=q,w.directionalLights.needsUpdate=q,w.directionalLightShadows.needsUpdate=q,w.pointLights.needsUpdate=q,w.pointLightShadows.needsUpdate=q,w.spotLights.needsUpdate=q,w.spotLightShadows.needsUpdate=q,w.rectAreaLights.needsUpdate=q,w.hemisphereLights.needsUpdate=q}function ga(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return he},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(w,q,K){const ne=O.get(w);ne.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),O.get(w.texture).__webglTexture=q,O.get(w.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:K,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,q){const K=O.get(w);K.__webglFramebuffer=q,K.__useDefaultFramebuffer=q===void 0};const xa=Y.createFramebuffer();this.setRenderTarget=function(w,q=0,K=0){W=w,he=q,oe=K;let ne=null,te=!1,ke=!1;if(w){const Ge=O.get(w);if(Ge.__useDefaultFramebuffer!==void 0){Ie.bindFramebuffer(Y.FRAMEBUFFER,Ge.__webglFramebuffer),ee.copy(w.viewport),ge.copy(w.scissor),Me=w.scissorTest,Ie.viewport(ee),Ie.scissor(ge),Ie.setScissorTest(Me),U=-1;return}else if(Ge.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Ge.__hasExternalTextures)T.rebindTextures(w,O.get(w.texture).__webglTexture,O.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ot=w.depthTexture;if(Ge.__boundDepthTexture!==ot){if(ot!==null&&O.has(ot)&&(w.width!==ot.image.width||w.height!==ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Ze=w.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(ke=!0);const $e=O.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($e[q])?ne=$e[q][K]:ne=$e[q],te=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?ne=O.get(w).__webglMultisampledFramebuffer:Array.isArray($e)?ne=$e[K]:ne=$e,ee.copy(w.viewport),ge.copy(w.scissor),Me=w.scissorTest}else ee.copy(ye).multiplyScalar(Pe).floor(),ge.copy(We).multiplyScalar(Pe).floor(),Me=tt;if(K!==0&&(ne=xa),Ie.bindFramebuffer(Y.FRAMEBUFFER,ne)&&Ie.drawBuffers(w,ne),Ie.viewport(ee),Ie.scissor(ge),Ie.setScissorTest(Me),te){const Ge=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ge.__webglTexture,K)}else if(ke){const Ge=q;for(let Ze=0;Ze<w.textures.length;Ze++){const $e=O.get(w.textures[Ze]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Ze,$e.__webglTexture,K,Ge)}}else if(w!==null&&K!==0){const Ge=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Ge.__webglTexture,K)}U=-1},this.readRenderTargetPixels=function(w,q,K,ne,te,ke,De,Ge=0){if(!(w&&w.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ze=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&De!==void 0&&(Ze=Ze[De]),Ze){Ie.bindFramebuffer(Y.FRAMEBUFFER,Ze);try{const $e=w.textures[Ge],ot=$e.format,bt=$e.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ge),!tn.textureFormatReadable(ot)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tn.textureTypeReadable(bt)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=w.width-ne&&K>=0&&K<=w.height-te&&Y.readPixels(q,K,ne,te,H.convert(ot),H.convert(bt),ke)}finally{const $e=W!==null?O.get(W).__webglFramebuffer:null;Ie.bindFramebuffer(Y.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(w,q,K,ne,te,ke,De,Ge=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ze=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&De!==void 0&&(Ze=Ze[De]),Ze)if(q>=0&&q<=w.width-ne&&K>=0&&K<=w.height-te){Ie.bindFramebuffer(Y.FRAMEBUFFER,Ze);const $e=w.textures[Ge],ot=$e.format,bt=$e.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Ge),!tn.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tn.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,it),Y.bufferData(Y.PIXEL_PACK_BUFFER,ke.byteLength,Y.STREAM_READ),Y.readPixels(q,K,ne,te,H.convert(ot),H.convert(bt),0);const Wt=W!==null?O.get(W).__webglFramebuffer:null;Ie.bindFramebuffer(Y.FRAMEBUFFER,Wt);const ft=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await kM(Y,ft,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,it),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,ke),Y.deleteBuffer(it),Y.deleteSync(ft),ke}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,q=null,K=0){const ne=Math.pow(2,-K),te=Math.floor(w.image.width*ne),ke=Math.floor(w.image.height*ne),De=q!==null?q.x:0,Ge=q!==null?q.y:0;T.setTexture2D(w,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,K,0,0,De,Ge,te,ke),Ie.unbindTexture()};const bn=Y.createFramebuffer(),yr=Y.createFramebuffer();this.copyTextureToTexture=function(w,q,K=null,ne=null,te=0,ke=0){let De,Ge,Ze,$e,ot,bt,it,Wt,ft;const sn=w.isCompressedTexture?w.mipmaps[ke]:w.image;if(K!==null)De=K.max.x-K.min.x,Ge=K.max.y-K.min.y,Ze=K.isBox3?K.max.z-K.min.z:1,$e=K.min.x,ot=K.min.y,bt=K.isBox3?K.min.z:0;else{const _n=Math.pow(2,-te);De=Math.floor(sn.width*_n),Ge=Math.floor(sn.height*_n),w.isDataArrayTexture?Ze=sn.depth:w.isData3DTexture?Ze=Math.floor(sn.depth*_n):Ze=1,$e=0,ot=0,bt=0}ne!==null?(it=ne.x,Wt=ne.y,ft=ne.z):(it=0,Wt=0,ft=0);const Qt=H.convert(q.format),qt=H.convert(q.type);let Ve;q.isData3DTexture?(T.setTexture3D(q,0),Ve=Y.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(T.setTexture2DArray(q,0),Ve=Y.TEXTURE_2D_ARRAY):(T.setTexture2D(q,0),Ve=Y.TEXTURE_2D),Ie.activeTexture(Y.TEXTURE0),Ie.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,q.flipY),Ie.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),Ie.pixelStorei(Y.UNPACK_ALIGNMENT,q.unpackAlignment);const Gn=Ie.getParameter(Y.UNPACK_ROW_LENGTH),At=Ie.getParameter(Y.UNPACK_IMAGE_HEIGHT),xn=Ie.getParameter(Y.UNPACK_SKIP_PIXELS),Rn=Ie.getParameter(Y.UNPACK_SKIP_ROWS),Cn=Ie.getParameter(Y.UNPACK_SKIP_IMAGES);Ie.pixelStorei(Y.UNPACK_ROW_LENGTH,sn.width),Ie.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,sn.height),Ie.pixelStorei(Y.UNPACK_SKIP_PIXELS,$e),Ie.pixelStorei(Y.UNPACK_SKIP_ROWS,ot),Ie.pixelStorei(Y.UNPACK_SKIP_IMAGES,bt);const Yn=w.isDataArrayTexture||w.isData3DTexture,nn=q.isDataArrayTexture||q.isData3DTexture;if(w.isDepthTexture){const _n=O.get(w),Wn=O.get(q),yt=O.get(_n.__renderTarget),_a=O.get(Wn.__renderTarget);Ie.bindFramebuffer(Y.READ_FRAMEBUFFER,yt.__webglFramebuffer),Ie.bindFramebuffer(Y.DRAW_FRAMEBUFFER,_a.__webglFramebuffer);for(let es=0;es<Ze;es++)Yn&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get(w).__webglTexture,te,bt+es),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get(q).__webglTexture,ke,ft+es)),Y.blitFramebuffer($e,ot,De,Ge,it,Wt,De,Ge,Y.DEPTH_BUFFER_BIT,Y.NEAREST);Ie.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(te!==0||w.isRenderTargetTexture||O.has(w)){const _n=O.get(w),Wn=O.get(q);Ie.bindFramebuffer(Y.READ_FRAMEBUFFER,bn),Ie.bindFramebuffer(Y.DRAW_FRAMEBUFFER,yr);for(let yt=0;yt<Ze;yt++)Yn?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,_n.__webglTexture,te,bt+yt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,_n.__webglTexture,te),nn?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Wn.__webglTexture,ke,ft+yt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Wn.__webglTexture,ke),te!==0?Y.blitFramebuffer($e,ot,De,Ge,it,Wt,De,Ge,Y.COLOR_BUFFER_BIT,Y.NEAREST):nn?Y.copyTexSubImage3D(Ve,ke,it,Wt,ft+yt,$e,ot,De,Ge):Y.copyTexSubImage2D(Ve,ke,it,Wt,$e,ot,De,Ge);Ie.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else nn?w.isDataTexture||w.isData3DTexture?Y.texSubImage3D(Ve,ke,it,Wt,ft,De,Ge,Ze,Qt,qt,sn.data):q.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ve,ke,it,Wt,ft,De,Ge,Ze,Qt,sn.data):Y.texSubImage3D(Ve,ke,it,Wt,ft,De,Ge,Ze,Qt,qt,sn):w.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,ke,it,Wt,De,Ge,Qt,qt,sn.data):w.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,ke,it,Wt,sn.width,sn.height,Qt,sn.data):Y.texSubImage2D(Y.TEXTURE_2D,ke,it,Wt,De,Ge,Qt,qt,sn);Ie.pixelStorei(Y.UNPACK_ROW_LENGTH,Gn),Ie.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,At),Ie.pixelStorei(Y.UNPACK_SKIP_PIXELS,xn),Ie.pixelStorei(Y.UNPACK_SKIP_ROWS,Rn),Ie.pixelStorei(Y.UNPACK_SKIP_IMAGES,Cn),ke===0&&q.generateMipmaps&&Y.generateMipmap(Ve),Ie.unbindTexture()},this.initRenderTarget=function(w){O.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Ie.unbindTexture()},this.resetState=function(){he=0,oe=0,W=null,Ie.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Va}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(e),i.unpackColorSpace=jt._getUnpackColorSpace()}}const Ov={type:"change"},vm={type:"start"},Cb={type:"end"},Qu=new pb,Dv=new hr,AC=Math.cos(70*XM.DEG2RAD),Kn=new ie,Ui=2*Math.PI,pn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},op=1e-6;class wC extends CT{constructor(e,i=null){super(e,i),this.state=pn.NONE,this.target=new ie,this.cursor=new ie,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qo.ROTATE,MIDDLE:Qo.DOLLY,RIGHT:Qo.PAN},this.touches={ONE:Zo.ROTATE,TWO:Zo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ie,this._lastQuaternion=new _r,this._lastTargetPosition=new ie,this._quat=new _r().setFromUnitVectors(e.up,new ie(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sv,this._sphericalDelta=new sv,this._scale=1,this._panOffset=new ie,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new ie,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=CC.bind(this),this._onPointerDown=RC.bind(this),this._onPointerUp=NC.bind(this),this._onContextMenu=FC.bind(this),this._onMouseWheel=LC.bind(this),this._onKeyDown=IC.bind(this),this._onTouchStart=UC.bind(this),this._onTouchMove=PC.bind(this),this._onMouseDown=OC.bind(this),this._onMouseMove=DC.bind(this),this._interceptControlDown=BC.bind(this),this._interceptControlUp=zC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ov),this.update(),this.state=pn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;Kn.copy(i).sub(this.target),Kn.applyQuaternion(this._quat),this._spherical.setFromVector3(Kn),this.autoRotate&&this.state===pn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Ui:s>Math.PI&&(s-=Ui),l<-Math.PI?l+=Ui:l>Math.PI&&(l-=Ui),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(Kn.setFromSpherical(this._spherical),Kn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Kn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=Kn.length();f=this._clampDistance(h*this._scale);const p=h-f;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),c=!!p}else if(this.object.isOrthographicCamera){const h=new ie(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=p!==this.object.zoom;const m=new ie(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),f=Kn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Qu.origin.copy(this.object.position),Qu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qu.direction))<AC?this.object.lookAt(this.target):(Dv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qu.intersectPlane(Dv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>op||8*(1-this._lastQuaternion.dot(this.object.quaternion))>op||this._lastTargetPosition.distanceToSquared(this.target)>op?(this.dispatchEvent(Ov),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ui/60*this.autoRotateSpeed*e:Ui/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){Kn.setFromMatrixColumn(i,0),Kn.multiplyScalar(-e),this._panOffset.add(Kn)}_panUp(e,i){this.screenSpacePanning===!0?Kn.setFromMatrixColumn(i,1):(Kn.setFromMatrixColumn(i,0),Kn.crossVectors(this.object.up,Kn)),Kn.multiplyScalar(e),this._panOffset.add(Kn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Kn.copy(l).sub(this.target);let c=Kn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ui*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ui*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ui*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ui*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Ot,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function RC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function CC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function NC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cb),this.state=pn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function OC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Qo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=pn.DOLLY;break;case Qo.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=pn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=pn.ROTATE}break;case Qo.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=pn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=pn.PAN}break;default:this.state=pn.NONE}this.state!==pn.NONE&&this.dispatchEvent(vm)}function DC(r){switch(this.state){case pn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case pn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case pn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function LC(r){this.enabled===!1||this.enableZoom===!1||this.state!==pn.NONE||(r.preventDefault(),this.dispatchEvent(vm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Cb))}function IC(r){this.enabled!==!1&&this._handleKeyDown(r)}function UC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Zo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=pn.TOUCH_ROTATE;break;case Zo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=pn.TOUCH_PAN;break;default:this.state=pn.NONE}break;case 2:switch(this.touches.TWO){case Zo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=pn.TOUCH_DOLLY_PAN;break;case Zo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=pn.TOUCH_DOLLY_ROTATE;break;default:this.state=pn.NONE}break;default:this.state=pn.NONE}this.state!==pn.NONE&&this.dispatchEvent(vm)}function PC(r){switch(this._trackPointer(r),this.state){case pn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case pn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case pn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case pn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=pn.NONE}}function FC(r){this.enabled!==!1&&r.preventDefault()}function BC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Lv=({imageSrc:r,height:e=200})=>{const i=Re.useRef(null);return Re.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new sT,c=75,f=s.clientWidth/s.clientHeight,h=new da(c,f,.1,1100);h.position.set(0,0,.1);const p=new TC({antialias:!0});p.setSize(s.clientWidth,s.clientHeight),p.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(p.domElement);const m=new wC(h,p.domElement);m.enableDamping=!0,m.dampingFactor=.08,m.rotateSpeed=-.3,m.enableZoom=!1,m.enablePan=!1,m.autoRotate=!1;const v=new AT;let _=null;v.load(r,S=>{S.mapping=af,S.colorSpace=Zi;const N=new xm(500,60,40);N.scale(-1,1,1);const I=new gm({map:S});_=new qa(N,I),l.add(_)});let g=c;const y=S=>{S.preventDefault();const N=S.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",y,{passive:!1});const M=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),p.setSize(s.clientWidth,s.clientHeight))});M.observe(s);let C=null;const E=()=>{C=requestAnimationFrame(E),m.update(),p.render(l,h)};return E(),()=>{cancelAnimationFrame(C),M.disconnect(),s.removeEventListener("wheel",y),_&&(_.geometry.dispose(),_.material.dispose()),p.dispose(),s.contains(p.domElement)&&s.removeChild(p.domElement)}},[r]),x.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Iv=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=Re.useState(""),[f,h]=Re.useState("");if(Re.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const p=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},m=s==="google",v=s==="openai",_=m,g=l.trim().startsWith("sk-"),y=v?"OpenAI API Key が必要です":_?"AI Engine を選択":"API Key が必要です",M=_?"Gemini AI Key または OpenAI Key (sk-...) を入力...":v?"sk-proj-...":"Google AI API Key を入力...",C="https://aistudio.google.com/app/apikey",E="https://platform.openai.com/api-keys",S=v?E:C,N=v?"🔑 OpenAI キーを取得":"🔑 キーを取得",I=_&&g||v?"emerald":"blue",L=I==="emerald"?"bg-emerald-600":"bg-blue-600",V=I==="emerald"?"border-emerald-500/30":"border-blue-500/30",D=I==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=I==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",A=I==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=I==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return x.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:x.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:x.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${V} rounded-xl shadow-2xl ${D} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&x.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),x.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[x.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[x.jsx("div",{className:`p-2 ${L} rounded-lg animate-pulse transition-colors duration-300`,children:x.jsx(Ju,{size:18,className:"text-white"})}),x.jsxs("div",{children:[x.jsx("p",{className:"text-sm font-bold text-white",children:y}),x.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),x.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[x.jsx("div",{className:"flex gap-2",children:x.jsxs("form",{onSubmit:$=>{$.preventDefault(),p()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[x.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:$=>c($.target.value),placeholder:M,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${A} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:$=>$.key==="Enter"&&p(),autoFocus:!0}),x.jsx("button",{onClick:p,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&x.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),_?x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&x.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),x.jsxs("div",{className:"flex items-center gap-4",children:[x.jsx("a",{href:C,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),x.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),x.jsx("a",{href:E,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):x.jsx("div",{className:"flex justify-end",children:x.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:`text-[11px] ${I==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class GC extends oS.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?x.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[x.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",Vr,")"]}),x.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),x.jsx("br",{}),this.state.errorInfo?.componentStack]}),x.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}console.log("HELLO_USER_FIXED_VERSION_2_25");function HC(){console.log("System Version Loaded:",Vr);const[r,e]=Re.useState(""),[i,s]=Re.useState(!1),[l,c]=Re.useState("gemini"),[f,h]=Re.useState("news"),[p,m]=Re.useState(""),[v,_]=Re.useState(""),[g,y]=Re.useState(""),[M,C]=Re.useState(""),[E,S]=Re.useState(""),[N,I]=Re.useState(""),[L,V]=Re.useState("Auto"),[D,B]=Re.useState(zE),A=de=>{B(st=>st.map(et=>et.id===de?{...et,checked:!et.checked}:et))},F=()=>{const de=new Date;return de.setHours(de.getHours()+9),de.toISOString().split("T")[0]},[$,k]=Re.useState(F()),[X,he]=Re.useState(""),[oe,W]=Re.useState(""),[U,G]=Re.useState(""),[ee,ge]=Re.useState(""),[Me,P]=Re.useState(null),[J,be]=Re.useState(!1);Re.useEffect(()=>{const de=am();de?(tf(de),e(de)):s(!0)},[]);const[Ne,Pe]=Re.useState([]),[ae,Se]=Re.useState(!1),[ye,We]=Re.useState(!1),[tt,rt]=Re.useState(!1),[Dt,Et]=Re.useState(!1),[Ut,Kt]=Re.useState(!1),[vt,Zt]=Re.useState(""),[rn,Lt]=Re.useState(""),[Y,Xt]=Re.useState(""),[Tt,tn]=Re.useState(""),[Ie,Sn]=Re.useState("auto"),[O,T]=Re.useState(!1),[Q,pe]=Re.useState([]),[Ee,Ue]=Re.useState(""),[Be,ue]=Re.useState(!1),[me,Ae]=Re.useState(""),[ze,Fe]=Re.useState(!1),[Ce,ht]=Re.useState(!1),[at,Rt]=Re.useState(!1),[H,Oe]=Re.useState(!1),[fe,Xe]=Re.useState(!1),[Le,Te]=Re.useState(!1),[qe,ut]=Re.useState(!1),[En,Yt]=Re.useState(!1),[Ln,mi]=Re.useState(!1),[Za,ri]=Re.useState(""),[Ca,br]=Re.useState(!1),[Dn,Mn]=Re.useState(""),[on,Bi]=Re.useState(!1),[gn,Na]=Re.useState(!1),[Is,Qa]=Re.useState(!1),[Ja,Qr]=Re.useState(""),[Ji,ma]=Re.useState(!1),[ga,xa]=Re.useState(!1),[bn,yr]=Re.useState(!1),[w,q]=Re.useState(!1),[K,ne]=Re.useState(null),[te,ke]=Re.useState(null),[De,Ge]=Re.useState(null),[Ze,$e]=Re.useState(!1),[ot,bt]=Re.useState(""),[it,Wt]=Re.useState(!1),[ft,sn]=Re.useState(!1),[Qt,qt]=Re.useState(null),[Ve,Gn]=Re.useState(null),[At,xn]=Re.useState(!1),[Rn,Cn]=Re.useState(!1),[Yn,nn]=Re.useState(!1),_n=Re.useRef(!1),[Wn,yt]=Re.useState(0),[_a,es]=Re.useState(0),[Oa,zi]=Re.useState(0),Mi=Re.useRef(!1),[va,gi]=Re.useState(!1),ts=Re.useRef(null),ol=Re.useRef(null),ll=Re.useRef(null),cl=Re.useRef(null),Da=Re.useRef(null);Re.useEffect(()=>{Da.current&&(Da.current.scrollTop=Da.current.scrollHeight)},[Q]),tt||!X||X.length<20||!oe||oe.length<20;const[ei,ea]=Re.useState(""),[ns,Gi]=Re.useState([]),ul=de=>{const st=de.replace(/[^\u0000-\u007F]/g,"").trim();st!==de&&pt("APIキーに含まれる不要な文字を自動削除しました。"),st.startsWith("sk-")?(Ah(st),wh("openai"),c("openai"),Na(!0),Bi(!0),e("openai-engine-active"),s(!1),pt("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(tf(st),e(st),wh("gemini"),c("gemini"),s(!1),pt("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},pt=de=>{tn(de),setTimeout(()=>tn(""),4e3)},Jr=async de=>{if(!r){pt("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(de.length===0)return;Se(!0),Zt(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let st=0;const et=setInterval(()=>{st++,Zt(Ke=>{if(st<=10){const lt=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return Ke+lt[Math.floor(Math.random()*lt.length)]}const He=`
> ⏳ AI応答を待機中... (${Math.floor(st*.8)}秒経過)`,we=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return we.test(Ke)?Ke.replace(we,"")+He:Ke+He})},800),mt=[];let xt=null;for(let Ke=0;Ke<de.length;Ke++){const je=de[Ke],He=await new Promise(lt=>{const Tn=new FileReader;Tn.onload=oi=>{const rs=oi.target.result,qn=new Uint8Array(rs);let It=!1;const Us="equirectangular";let La=0;for(let ba=0;ba<Math.min(qn.length,65536);ba++)if(qn[ba]===Us.charCodeAt(La)){if(La++,La===Us.length){It=!0;break}}else La=0;const Ia=new Image;Ia.onload=()=>{const ba=Ia.naturalWidth/Ia.naturalHeight,Ps=Math.abs(ba-2)<.15;lt(Ps&&It)},Ia.onerror=()=>lt(!1),Ia.src=URL.createObjectURL(je)};const kt=je.slice(0,65536);Tn.readAsArrayBuffer(kt)}),we=new FileReader;we.readAsDataURL(je),await new Promise(lt=>{we.onload=()=>{He&&!xt?(xt={base64:we.result,mimeType:je.type},Zt(Tn=>Tn+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(mt.push(we.result),Pe(Tn=>[...Tn,we.result])),lt()}})}if(xt)try{sn(!0),ne(xt.base64);const Ke=xt.base64.split(",")[1],je={inlineData:{mimeType:xt.mimeType,data:Ke}};ke(je),$e(!0),Zt(lt=>lt+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const He=await Br(qE(),[je],null,()=>{}),we=$E(He.text);Ge(we),y(we.location),pt(`🌐 360°背景を検出: ${we.location}`),Zt(lt=>lt+`
> 🌐 空間解析完了: ${we.location}`)}catch(Ke){console.warn("[360° BG] Analysis failed:",Ke),Ge({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),y("360°パノラマ画像（解析失敗）")}finally{$e(!1)}if(mt.length===0&&xt){clearInterval(et),Se(!1),Zt(Ke=>Ke+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),pt("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(mt.length===0){clearInterval(et),Se(!1);return}pt(`思考モード: ${mt.length}枚のキャラクター設定画を同時解析中...${xt?"（+ 360°背景1枚検出済み）":""}`);try{const Ke=mt.map(we=>{const lt=we.split(",")[1];return{inlineData:{mimeType:we.split(";")[0].split(":")[1],data:lt}}}),je=KE(),He=await Br(je,Ke,null,we=>{Zt(lt=>lt+`
> ${we}`)});he(He.text),P(He.model),Zt(we=>{const lt=`

--- ✅ 解析完了 ---
`,Tn=He.thought&&He.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${He.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return we+lt+Tn}),pt("全キャラクターの解析が完了しました。"),Rn&&(Mi.current?(Cn(!1),yt(0),gi(!1),pt("⏹ フルオートを中断しました。")):zi(we=>we+1))}catch(Ke){console.error(Ke);const je=Rh(Ke.message);Zt(He=>He+`

[システムエラー]: ${Ke.message}
--------------------------------------------------
${je}`),pt("解析エラー: "+Ke.message),Rn&&(Cn(!1),yt(0),gi(!1))}finally{clearInterval(et),Se(!1)}},eo=async()=>{if(!oe||oe.length<20)return pt("先にシナリオを生成してください。");if(!(Ce||at||H||fe||Le||qe||En))return pt("少なくとも1つの強化カテゴリをONにしてください。");if(Ln)return;mi(!0),ri("> [START] シナリオ強化を開始します..."),Dn||(Mn(oe),ri(Ke=>Ke+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const st=[];Ce&&st.push(`【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。
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
良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。`),at&&st.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。"),H&&st.push(`【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。
⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:
- sparkling light particles → 代わりに soft glow を使え
- glowing dust → 代わりに clean bloom を使え
- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え
- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え`),fe&&st.push(`【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。
- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。
- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。
- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。
- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。
- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。`),Le&&st.push(`【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。
- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）
- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）
- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）
- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）
- 引き/ロングショット（宇宙や上空からの空気感）
- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）
⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。
4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。`),qe&&st.push(`【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。

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
- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ`),ri(Ke=>Ke+`
> [CONFIG] 強化カテゴリ: ${st.length}個`);let et=0;const mt=setInterval(()=>{et++,ri(Ke=>{if(et<=5){const lt=[`
> [PROCESS] 演出データベースを参照中...`,`
> [PROCESS] 感情ベクトルを計算中...`,`
> [PROCESS] 表現パターンを最適化中...`];return Ke+lt[Math.floor(Math.random()*lt.length)]}const He=`
> ⏳ AI応答を待機中... (${Math.floor(et*.8)}秒経過)`,we=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return we.test(Ke)?Ke.replace(we,"")+He:Ke+He})},800),xt=ZE(oe,st);try{ri(je=>je+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const Ke=await Br(xt,[],X,je=>{ri(He=>He+`
> [API] ${je}`)});Ke&&Ke.text&&Ke.text.length>50?(W(Ke.text.trim()),ri(je=>je+`
> [SUCCESS] シナリオを強化しました！（${Ke.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),ht(!1),Rt(!1),Oe(!1),Xe(!1),Te(!1),ut(!1),Yt(!1),pt("シナリオ強化完了！")):(ri(je=>je+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),pt("強化失敗: AIの応答が不十分です"))}catch(Ke){ri(je=>je+`
> [ERROR] ${Ke.message}`),pt("強化エラー: "+Ke.message)}finally{clearInterval(mt),mi(!1)}},to=()=>{Dn&&(W(Dn),Mn(""),ri(de=>de+`
> [REVERT] 元のシナリオに復元しました。`),pt("シナリオを元に戻しました"))},fl=async de=>{if(!X)return pt("先にキャラクターを解析してください。");if(ye)return;const st=Array.isArray(de)?de:D;if(f==="manual"&&!p.trim()){alert("自由入力トピックを入力してください。");return}if(f==="news"&&!st.find(je=>je.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}We(!0),Lt(""),ge(""),ea(null),Xt(""),pe([]),Mn(""),ri("");let et="";if(f==="manual")et="手動入力",W(""),Lt(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${p.substring(0,30)}...`);else{const je=st.filter(He=>He.checked);je.length>0?(et=je.map(He=>He.keywords).join(" "),pt(`カテゴリ「${je.map(He=>He.label).join("・")}」で最新ニュースを検索中... (${$})`),W(""),Lt(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${je.map(He=>He.label).join("、")} (キーワード: ${et}) 
 > 対象日付: ${$} 
 > Google Grounding で検索中...`)):et="最新ニュース"}const mt=`${et} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let xt=0;const Ke=setInterval(()=>{xt++,Lt(je=>{if(xt<=8){const Tn=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return je+Tn[Math.floor(Math.random()*Tn.length)]}const we=`
> ⏳ AI応答を待機中... (${Math.floor(xt*.8)}秒経過)`,lt=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return lt.test(je)?je.replace(lt,"")+we:je+we})},800);try{let je="";if(f==="manual"){je=`
         【ユーザー提供トピック/URL】:
         ${p}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;const yn=/(https?:\/\/[^\s]+)/g,ni=p.match(yn);if(ni&&ni.length>0){Lt(`> 手動入力内にURLを検出: ${ni[0]} 
> プロキシ経由でコンテンツを取得中...`);try{const ii=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(ni[0])}`);if(!ii.ok)throw new Error(`HTTP error! status: ${ii.status}`);const Nn=await ii.text(),li=new DOMParser().parseFromString(Nn,"text/html");li.querySelectorAll("script, style").forEach(Ri=>Ri.remove());const Qe=li.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let Pt="";Qe.forEach(Ri=>{Ri.textContent.trim()&&(Pt+=Ri.textContent.trim()+`
`)}),Pt.trim()||(Pt=li.body.textContent||"");const ci=Pt.replace(/\s+/g," ").substring(0,3e3);Lt(Ri=>Ri+`
> コンテンツ抽出完了 (${ci.length}文字)。注入中...`),je=`
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${ci}
             
             (指示): 上記はユーザーが入力したURL（ ${ni[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `}catch(ii){console.error("URL Fetch Error: ",ii),Lt(Nn=>Nn+`
> 警告: URLコンテンツの取得に失敗しました (${ii.message})。LLMの内部知識で補完します。`)}}}const He=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園のベンチ","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],we=He[Math.floor(Math.random()*He.length)];console.log("Forced Location:",we);const lt=K&&De&&ft?De.location:g.trim()?g.trim():we,Tn=FE(lt),kt=BE(),oi=QE({randomCategory:et,targetDate:$,inputMode:f,manualTopic:p,newsContext:je,searchTopicKeywords:mt,bg360Image:K,bg360Analysis:De,bg360Enabled:ft,customLocation:g,forcedLocation:we,customOutfit:M,ragLocationDetails:Tn,ragReactions:kt,punchlineType:L}),qn=await Br(oi,te&&ft?[te]:[],X,yn=>{Lt(ni=>ni+`
 > [API] ${yn} `)});P(qn.model);let It={topic:et,scenario:""};try{const yn=qn.text.match(/Topic:\s*(.+)/i),ni=qn.text.match(/Logline:\s*(.+)/i),ii=qn.text.match(/Location:\s*(.+)/i),Nn=qn.text.match(/Outfit:\s*(.+)/i),wi=qn.text.match(/Punchline:\s*(.+)/i),li=qn.text.match(/Scenario:\s*([\s\S]+)/i);if(li)It.topic=yn?yn[1].trim():et,It.topic=It.topic.replace(/^Topic:\s*/i,"").trim(),It.logline=ni?ni[1].trim():"",It.location=ii?ii[1].trim():"Generic Background",It.outfit=Nn?Nn[1].trim():"",It.punchline=wi?wi[1].trim():"",It.scenario=li[1].trim();else{const xi=qn.text.match(/\{[\s\S]*\}/);if(xi){const Qe=JSON.parse(xi[0]);It.topic=Qe.topic||et,It.location=Qe.location||"Generic Background",It.scenario=Qe.scenario||qn.text}else{if(qn.text.length<20)throw new Error("AI returned empty or invalid response.");It.topic=f==="manual"?p||"Custom Scenario":v||"Generated Scenario",It.scenario=qn.text}}}catch(yn){console.warn("Parse warning:",yn),It.scenario=qn.text,It.topic="Generated Scenario"}const Us=yn=>yn;It.scenario=Us(It.scenario),W(It.scenario);const La=It.logline?`
Logline: ${It.logline}`:"",Ia=M.trim()||It.outfit?`
Outfit: ${M.trim()||It.outfit}`:"",ba=It.punchline?`
Punchline: ${It.punchline}`:"",Ps=K?ft?`
🌐 360°背景: ON (${De?.location||"解析済み"} / ${De?.spatialType==="indoor"?"室内":De?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";S(g.trim()||It.location||"Unspecified"),I(M.trim()||It.outfit||""),Lt(yn=>yn+`
 > トピック選定: ${It.topic} 
 > シナリオ構築完了。`),pt("シナリオの生成が完了しました！");let os="";if(K&&De&&ft&&te)try{Lt(Nn=>Nn+`
 > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`),pt("🎬 360°カメラワーク設計中..."),xn(!0);const yn=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${It.scenario}

【360°背景の解析情報】
- 場所: ${De.location}
- 光源: ${De.lighting}
- 空間タイプ: ${De.spatialType}
- 特徴物: ${De.objects||"なし"}
- 雰囲気: ${De.mood||"不明"}

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
}`,ii=(await Br(yn,[te],null,Nn=>{Lt(wi=>wi+`
 > [Camera AI] ${Nn}`)})).text.match(/\{[\s\S]*\}/)?.[0];if(ii){const Nn=JSON.parse(ii);qt(Nn);const wi=Qe=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Qe%360+360)%360/45)%8],li=Qe=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Qe]||Qe;let xi=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Nn.panels.forEach(Qe=>{xi+=`
 > 🎬 コマ${Qe.panel}: ${wi(Qe.yaw)} (yaw:${Qe.yaw}°) / ${li(Qe.camera)} / FOV:${Qe.fov}°`,xi+=`
 >    └─ ${Qe.reasoning}`}),xi+=`
 > 🎬 ══════════════════════════════════`,Lt(Qe=>Qe+xi),pt("🎬 360°カメラワーク設計完了！背景クロップを開始...");try{Lt(Pt=>Pt+`
 > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...`);const Qe=[];for(const Pt of Nn.panels){const ci=await WE(K,Pt.yaw,Pt.pitch||0,Pt.fov||90);Qe.push(ci)}Gn(Qe),Lt(Pt=>Pt+`
 > 🔲 [Crop] ✅ ${Qe.length}枚のクロップ画像を生成しました`),pt("🎬 カメラワーク設計＋背景クロップ完了！"),xn(!1)}catch(Qe){console.warn("[360° Crop] Cropping failed:",Qe),Lt(Pt=>Pt+`
 > ⚠️ [Crop] クロップに失敗しました: ${Qe.message}（スキップ）`),xn(!1)}os=`
🎬 360° Camera Work:`,Nn.panels.forEach(Qe=>{os+=`
  Panel${Qe.panel}: ${wi(Qe.yaw)}(${Qe.yaw}°) ${li(Qe.camera)} FOV${Qe.fov}° — ${Qe.reasoning}`})}else console.warn("[360° Camera AI] JSON parse failed, skipping camera work"),Lt(Nn=>Nn+`
 > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）`),xn(!1)}catch(yn){console.warn("[360° Camera AI] Camera work design failed:",yn),Lt(ni=>ni+`
 > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${yn.message}（スキップ — シナリオ生成には影響しません）`),xn(!1)}const Fs=`## タイトル: ${It.topic} !?${La}
Location: ${It.location||"Unspecified"}${Ia}${ba}${Ps}${os}

${It.scenario} `;return W(Fs),Fs}catch(je){console.error(je);const He=Rh(je.message);return Lt(we=>we+`

[システムエラー]: ${je.message}
--------------------------------------------------
${He}`),pt("シナリオ生成エラー"),null}finally{clearInterval(Ke),We(!1)}},ti=async(de=!1,st=null)=>{const et=st||oe;if(!de&&(!X||!et))return pt("キャストとシナリオが必要です。");rt(!0),ge(""),pe([]),Ue(""),Ae(""),Fe(!1),Xt("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const mt=setInterval(()=>{Xt(xt=>{if(xt.length>800)return xt;const Ke=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!tt)return xt;const je=Ke[Math.floor(Math.random()*Ke.length)];return xt+je})},600);try{let xt=Ie==="monochrome";if(Ie==="auto"){const Qe=X.toLowerCase();xt=Qe.includes("style_tag: monochrome")||Qe.includes("monochrome")||Qe.includes("greyscale")||Qe.includes("screentone")}const Ke=xt?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",je=VE;let He=et.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||et.split(`
`)[0].substring(0,20);He=He.replace(/^Topic:\s*/i,"").trim();const we=et.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),lt=et.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),Tn=we||"Generic Detailed Background",kt=lt&&!/^(なし|キャラシート準拠|none|default)/i.test(lt)?lt:"",oi=et.replace(/```(?:json|markdown)?/gi,"").trim(),rs=(Qe,Pt,ci)=>{const Ri=new RegExp(`\\[${Pt}.*?\\]([\\s\\S]*?)(?=\\[${ci}|$)`,"i"),pl=Qe.match(Ri);return pl?pl[1].trim():""},qn=rs(oi,"1コマ目","2コマ目")||oi,It=rs(oi,"2コマ目","3コマ目"),Us=rs(oi,"3コマ目","4コマ目"),La=rs(oi,"4コマ目","UNKNOWN"),ba=(Qe=>{const Pt=[...Qe];for(let ci=Pt.length-1;ci>0;ci--){const Ri=Math.floor(Math.random()*(ci+1));[Pt[ci],Pt[Ri]]=[Pt[Ri],Pt[ci]]}return Pt})(HE).slice(0,4),Ps={index:0},os=oM(X,kt),Fs=on?aM(os):os,yn=Tn||"Detailed Background",ni=He||"4-koma Manga",ii=on?`Generated by ChatGPT with Super FURU AI 4-koma ${Vr}`:`Generated by Super FURU AI 4-koma ${Vr}`;let Nn="";const wi=[qn,It,Us,La];let li="";on?(li=wi.map((Qe,Pt)=>`## Panel ${Pt+1}
${N_(Qe)}
${wu(Qe,X).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
${C_(Qe,X).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
Camera: ${sM(Qe,Ps)}
Action: ${R_(w_(Qe,X,wu(Qe,X)),kt)}
Dialogue (Japanese text inside speech bubbles only): ${A_(Qe,X)}`).join(`

`),Nn=tM({safeTopic:ni,watermarkEng:ii,styleCore:Ke,safeLocation:yn,bg360Image:K,bg360Analysis:De,bg360Enabled:ft,bg360CroppedPanels:Ve,enableChatGPTMode:on,VAR_CAST_LIST_CHATGPT:Fs,identityMatrix:up(X),activeOutfit:kt,panelSections:li})):(li=wi.map((Pt,ci)=>`## Panel ${ci+1}
${N_(Pt)}
${wu(Pt,X)}
${C_(Pt,X)}
Camera: ${iM(Pt,ba,Ps)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${R_(w_(Pt,X,wu(Pt,X)),kt)}.
Dialogue (ONLY inside bubbles): ${A_(Pt,X)}.`).join(`

`),Nn=jE+nM({safeTopic:ni,watermarkEng:ii,styleCore:Ke,safeLocation:yn,bg360Image:K,bg360Analysis:De,bg360Enabled:ft,bg360CroppedPanels:Ve,VAR_CAST_LIST:os,identityMatrix:up(X),activeOutfit:kt,dynamicCamera:je,panelSections:li})),await new Promise(Qe=>setTimeout(Qe,800));let xi=XE(Nn.trim());return L==="Documentary"&&(xi=YE(xi),Xt(Qe=>Qe+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`)),Xt(Qe=>Qe+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ge(xi),Xt(Qe=>Qe+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),pt("最終プロンプトの構築が完了しました。画像生成を開始します..."),xi}catch(xt){console.error(xt);const Ke=Rh(xt.message);return Xt(je=>je+`

[システムエラー]: ${xt.message}
--------------------------------------------------
${Ke}`),pt("生成エラー: "+xt.message),null}finally{clearInterval(mt),rt(!1)}};Re.useEffect(()=>{ee&&!tt&&Ct>=3&&ti()},[on]);const is=()=>{W(""),ge(""),ea(null),Lt(""),Xt(""),pe([]),Cn(!1),yt(0),y(""),C(""),ne(null),ke(null),Ge(null),qt(null),Gn(null),xn(!1),pt("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},no=()=>{he(""),W(""),ge(""),Pe([]),ea(null),Zt(""),Lt(""),Xt(""),Cn(!1),yt(0),y(""),C(""),ne(null),ke(null),Ge(null),qt(null),Gn(null),xn(!1),P(null),Gi([]),pe([]),e(""),tf(""),Ah(""),wh(""),c(""),Na(!1),Bi(!1),s(!0),pt("全データをリセットしました。APIキーを再入力してください。")},[as,yc]=Re.useState(!1),[Sr,io]=Re.useState(!1),[ta,ss]=Re.useState(!1),dl=()=>{ee&&(navigator.clipboard.writeText(ee),yc(!0),setTimeout(()=>yc(!1),2e3),pt("クリップボードにコピーしました！"))},Sc=async(de=!1,st=null)=>{const et=st||ee;if(Dt||!de&&!et)return!1;Et(!0),Kt(!1);const mt=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];on&&(l==="openai"?mt.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):mt.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),pe(mt);let xt=0;const Ke=setInterval(()=>{xt++;const je=Math.floor(xt*1.5);pe(He=>{const we=He.findIndex(lt=>lt.startsWith("[WAIT]"));if(we!==-1){const lt=[...He];return lt[we]=`[WAIT] ⏳ 画像生成API応答を待機中... (${je}秒経過)`,lt}return[...He,`[WAIT] ⏳ 画像生成API応答を待機中... (${je}秒経過)`]})},1500);await new Promise(je=>setTimeout(je,800));try{pt(gn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),pe(kt=>[...kt,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(kt=>setTimeout(kt,1e3));const je=kt=>{pe(oi=>[...oi,kt])};let He,we;if(gn){je("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const kt=await NE(et,je);He=kt.base64Img,we=kt.usedModel}else{const kt=Ve&&ft&&Ve.length===4?Ve:[];kt.length>0&&je(`[REF] 360°背景クロップ画像 ${kt.length}枚を参照画像として添付`);const oi=await CE(et,je,kt);He=oi.base64Img,we=oi.usedModel}pe(kt=>[...kt,`[4/5] データストリーム受信完了 (Model: ${we})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const lt=`data:image/png;base64,${He}`;ea(lt),Gi(kt=>[{id:Date.now(),img:lt},...kt]);const Tn=we&&we.startsWith("gpt-");return we&&!we.startsWith("gemini-3")&&!Tn?(be(!0),pe(kt=>[...kt,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${gn?"ChatGPT":"Gemini"}(Web版)を開く: ${gn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${gn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(be(!1),pe(kt=>[...kt,"[COMPLETE] Image successfully generated."])),pt("画像生成完了！"),!0}catch(je){console.error(je),Kt(!0),ea(null);const He=je.message||"";let we=[];return He.includes("Unknown parameter")||He.includes("invalid")||He.includes("Invalid")?we=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${gn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${gn?"ChatGPT":"Gemini"} (Web版) を開く: ${gn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:He.includes("sensitive")||He.includes("Responsible AI")||He.includes("400")&&!He.includes("Unknown parameter")?(Ue(He),Fe(!0),we=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):He.includes("not found")||He.includes("not supported")||He.includes("404")||He.includes("403")||He.includes("401")?we=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${gn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${gn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${gn?"ChatGPT":"Gemini"} (Web版) を開く: ${gn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:we=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${gn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${gn?"ChatGPT":"Gemini"} (Web版) を開く: ${gn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],pe(lt=>[...lt,`[ERROR] ${je.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...we]),pt(`生成エラー: ${je.message} `),!1}finally{clearInterval(Ke),Et(!1)}},Ef=async()=>{if(!ee||!Ee.trim())return;ue(!0),Ae("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let de=0;const st=setInterval(()=>{de++,Ae(et=>{const xt=`
> ⏳ AI分析中... (${Math.floor(de*1)}秒経過)`,Ke=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return Ke.test(et)?et.replace(Ke,xt):et+xt})},1e3);try{Ae(we=>we+`
> [Phase 1/5] エラーメッセージを解析中...`),Ae(we=>we+`
> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...`);const et=JE(Ee.trim(),ee),mt=await Br(et,[],null,we=>{Ae(lt=>lt+`
> ${we}`)});if(Ae(we=>we+`
> [Phase 3/5] AIの応答を受信・解析中...`),!mt.text||mt.text.trim().length<10){Ae(we=>we+`
> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。`);return}Ae(we=>we+`
> [Phase 4/5] 置換テーブルをプロンプトに適用中...`);let xt=[];try{let we=mt.text.trim();const lt=we.match(/```(?:json)?\s*([\s\S]*?)```/);lt&&(we=lt[1].trim());const Tn=we.indexOf("["),kt=we.lastIndexOf("]");Tn!==-1&&kt!==-1&&(we=we.substring(Tn,kt+1)),xt=JSON.parse(we)}catch(we){console.error("JSON parse error:",we,"Raw:",mt.text),Ae(lt=>lt+`
> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...`),await Ec();return}if(!Array.isArray(xt)||xt.length===0){Ae(we=>we+`
> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。`);return}let Ke=ee,je=0,He=0;for(const we of xt)!we.from||!we.to||(Ke.includes(we.from)?(Ke=Ke.replace(we.from,we.to),je++,Ae(lt=>lt+`
> ✅ "${we.from.substring(0,40)}..." → "${we.to.substring(0,40)}..." (${we.reason||""})`)):(He++,Ae(lt=>lt+`
> ⚠️ 未発見（スキップ）: "${we.from.substring(0,50)}..."`)));je>0?(ge(Ke),Ae(we=>we+`
> [Phase 5/5] ✅ ${je}箇所を修正しました（${He}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`),Ae(we=>we+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),Ue("")):(Ae(we=>we+`
> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。`),Ae(we=>we+`
> [GUIDE] フォールバック（全文再生成）モードに切り替えます...`),await Ec())}catch(et){console.error(et),Ae(mt=>mt+`
> [ERROR] ${et.message}`)}finally{clearInterval(st),ue(!1)}},Ec=async()=>{Ae(de=>de+`
> [Fallback] 全文再生成モードで修正中...`);try{const de=eM(Ee.trim(),ee),st=await Br(de,[],null,et=>{Ae(mt=>mt+`
> ${et}`)});st.text&&st.text.length>100?(ge(st.text.trim()),Ae(et=>et+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Ue("")):Ae(et=>et+`
> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。`)}catch(de){console.error(de),Ae(st=>st+`
> [Fallback ERROR] ${de.message}`)}};Re.useEffect(()=>{Oa>0&&!Mi.current&&hl()},[Oa]);const hl=async()=>{if(!X||X.length<20){pt("先にキャラクターシートをアップロードしてください。"),Cn(!1);return}Mi.current=!1,Cn(!0),Bi(!1),yt(2);const de=[...D].sort(()=>Math.random()-.5),st=Math.random()>.5?2:1,et=de.slice(0,st).map(He=>He.id),mt=D.map(He=>({...He,checked:et.includes(He.id)}));B(mt),y(""),C(""),h("news"),await new Promise(He=>setTimeout(He,200)),ts.current?.scrollIntoView({behavior:"smooth",block:"start"});const xt=await fl(mt);if(Mi.current||!xt){Cn(!1),yt(0),gi(!1),Mi.current&&pt("⏹ フルオートを中断しました。");return}yt(3),ol.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(He=>setTimeout(He,300));const Ke=await ti(!0,xt);if(Mi.current||!Ke){Cn(!1),yt(0),gi(!1),Mi.current&&pt("⏹ フルオートを中断しました。");return}yt(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(He=>setTimeout(He,300));const je=await Sc(!0,Ke);await new Promise(He=>setTimeout(He,800)),cl.current?.scrollIntoView({behavior:"smooth",block:"center"}),_n.current?Mi.current?(Cn(!1),yt(0),gi(!1),pt("⏹ 連続生成を中断しました。")):(pt("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{Mi.current||zi(He=>He+1)},2e3)):(Cn(!1),yt(0),gi(!1),je&&pt("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},Mf=()=>{if(Rn){Mi.current=!0,Wn>0||ae||ye||tt||Dt?(gi(!0),pt("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(Cn(!1),yt(0),gi(!1),pt("フルオートを解除しました。"));return}Mi.current=!1,gi(!1),Cn(!0),X&&X.length>=20?zi(de=>de+1):pt("🚀 フルオート待機中: キャラクターシートをドロップしてください")},Ct=!X||X.length<1?1:!oe||oe.length<1?2:ee?ei?5:4:3;return x.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[x.jsx(Iv,{isOpen:i,onSave:ul,provider:"google"}),x.jsx(Iv,{isOpen:Is,onSave:de=>{const st=de.trim(),et=ff();st===""&&et?(Na(!0),pt("🔑 既存のOpenAI APIキーを適用しました。"),Qa(!1)):st.startsWith("sk-")?(Ah(st),Na(!0),pt("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Qa(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Qa(!1),ff()||Na(!1)},provider:"openai"}),x.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[x.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[x.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[x.jsxs("div",{className:`flex items-center gap-1.5 ${Ct>=1?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Ct===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":Ct>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:Ct>1?x.jsx(Lo,{size:16}):"1"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),x.jsx(Jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Ct>=2?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Ct===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":Ct>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:Ct>2?x.jsx(Lo,{size:16}):"2"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),x.jsx(Jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Ct>=3?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Ct===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":Ct>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:Ct>3?x.jsx(Lo,{size:16}):"3"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),x.jsx(Jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${Ct>=4?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${Ct===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":Ct>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:Ct>4?x.jsx(Lo,{size:16}):"4"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),x.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),x.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[x.jsxs("button",{disabled:!r||va,onClick:()=>{const de=!Yn;nn(de),_n.current=de},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:Yn?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Yn?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[x.jsx(a_,{size:14,className:Yn?"animate-spin":"",style:{animationDuration:"3s"}}),x.jsx("span",{className:"whitespace-nowrap",children:Yn?"無限ループ設定 解除":"無限ループ設定 ON"})]}),x.jsxs("button",{disabled:!r||va,onClick:Mf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:Rn?va?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Rn?va?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!va?"opacity-50 cursor-not-allowed":""}`,children:[Rn?va?x.jsx(ua,{size:14,className:"animate-spin"}):x.jsx(HS,{size:14,fill:"currentColor"}):x.jsx(Ju,{size:14}),Rn?va?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),x.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),x.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[x.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),x.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),x.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(l==="openai"||gn)&&x.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),ss(!0),setTimeout(()=>ss(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${ta?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[x.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[ta?x.jsx(Lo,{size:16}):x.jsx(ec,{size:16}),x.jsx("span",{className:"whitespace-nowrap",children:ta?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),x.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),x.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:x.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${Ct===1?"w-1/4 bg-blue-500":Ct===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":Ct===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":Ct>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),x.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[x.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),x.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),x.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[x.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[x.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),x.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:x.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:x.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[x.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[x.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:x.jsx(lp,{size:28,className:"text-white"})}),x.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",x.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",x.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:Vr})]})]}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[x.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),x.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?l==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?l==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?l==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),r&&x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:is,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[x.jsx(a_,{size:12})," シナリオから再生成"]}),x.jsxs("button",{onClick:no,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[x.jsx(US,{size:12})," エンジン変更・全リセット"]})]})]}),Me&&(()=>{const de=GE(Me);return de?x.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${de.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:de.label}),x.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),x.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:de.desc}),x.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[x.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),x.jsxs("p",{children:["現在 ",x.jsx("span",{className:"font-mono text-blue-300",children:Me})," を使用中。"]}),de.tier==="Lite"&&x.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[x.jsx(r_,{size:10,className:"absolute top-2 right-2"}),x.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),x.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[x.jsxs("section",{onDragOver:de=>{de.preventDefault(),r&&T(!0)},onDragLeave:()=>T(!1),onDrop:de=>{de.preventDefault(),T(!1),r&&Jr(de.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${O?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
                ${Ct===1&&!O?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
                ${Ct>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[x.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${Ct===1?"text-blue-400":"text-slate-500"} `,children:[x.jsx(ES,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),ae&&x.jsx(ua,{size:18,className:"animate-spin text-blue-400"}),Ct>1&&x.jsx(qi,{size:18,className:"text-blue-500"})]}),x.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[Ne.map((de,st)=>x.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[x.jsx("img",{src:de,className:"w-full h-full object-cover shadow-sm"}),x.jsx("button",{onClick:()=>Pe(Ne.filter((et,mt)=>mt!==st)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:x.jsx(Mh,{size:16})})]},st)),K&&x.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${ft?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[x.jsx("img",{src:K,className:`w-full h-full object-cover shadow-sm ${ft?"opacity-100":"opacity-40 grayscale"}`}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[x.jsx(tc,{size:8})," 360° BACKGROUND"]})]}),x.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[ae?x.jsx(ua,{size:16,className:"animate-spin"}):x.jsx(x.Fragment,{children:x.jsx(FS,{size:16,className:"group-hover/add:scale-125 transition-transform"})}),x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:de=>Jr(de.target.files),disabled:ae})]}),Ne.length===0&&!ae&&x.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:de=>Jr(de.target.files)}),x.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",x.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),x.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",x.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),x.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[x.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),x.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),ae&&x.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[x.jsxs("span",{className:"relative flex h-3 w-3",children:[x.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),x.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),x.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",Ne.length," chars... ",x.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),x.jsx("div",{className:"mb-4",children:x.jsx(Ru,{thought:vt})}),x.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),x.jsx("textarea",{value:X,onChange:de=>he(de.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(X),ma(!0),setTimeout(()=>ma(!1),2e3)},disabled:!X,className:`w-full ${Ji?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[Ji?x.jsx(qi,{size:20}):x.jsx(ec,{size:20}),Ji?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]}),x.jsxs("section",{ref:ts,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${Ct===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
                 ${Ct>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(Ct<2||ae)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),x.jsx("div",{className:"flex items-center justify-between",children:x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${Ct===2?"text-purple-400":"text-slate-500"} `,children:[x.jsx(NS,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),x.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[x.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[x.jsxs("button",{onClick:()=>h("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),x.jsxs("button",{onClick:()=>h("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${f==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),f==="news"?x.jsxs("div",{className:"space-y-4",children:[x.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[x.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),x.jsx("input",{type:"date",value:$,onChange:de=>k(de.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsx("div",{className:"col-span-2 lg:col-cols-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),D.map(de=>x.jsxs("label",{className:`
                            relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active: border-b-2 active: translate-y-0.5
                            ${de.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
      `,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:de.checked,onChange:()=>A(de.id)}),de.checked&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-2 ${de.checked?"scale-110":"opacity-70 grayscale"} `,children:de.icon}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:de.label})]})]},de.id))]}),x.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",D.filter(de=>de.checked).map(de=>de.keywords).join(" ")||"なし"," (対象日付: ",$,")"]})]}):x.jsxs("div",{className:"space-y-2",children:[x.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",x.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),x.jsx("textarea",{value:p,onChange:de=>m(de.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),x.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[x.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${K&&ft?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[x.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:K&&ft?"#67e8f9":"#ffffff"},children:[x.jsx(tc,{size:14}),K&&ft?"🌐 360°背景 (ON)":"指定場所 (Location Override)",x.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[Ze&&x.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[x.jsx(ua,{size:10,className:"animate-spin"})," 解析中..."]}),K&&x.jsx("button",{onClick:de=>{de.preventDefault(),sn(!ft),pt(ft?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${ft?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:ft?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:ft?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!K&&x.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),K&&ft?x.jsxs("div",{className:"space-y-2",children:[x.jsx(Lv,{imageSrc:K,height:160}),De&&x.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[x.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",De.location]}),x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",De.lighting]}),x.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:De.spatialType==="indoor"?"🏠 室内":De.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),De.mood&&x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",De.mood]})]}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):x.jsx("input",{type:"text",value:g,onChange:de=>y(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[x.jsx(s_,{size:14})," 指定服装 (Outfit Override) ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),x.jsx("input",{type:"text",value:M,onChange:de=>C(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[x.jsx("span",{children:"🎬"})," オチ・ディレクター ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),x.jsxs("select",{value:L,onChange:de=>V(de.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[x.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),x.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),x.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),x.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),x.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),x.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),x.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),x.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),x.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),x.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),x.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),x.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),x.jsx("button",{onClick:fl,disabled:ye||Ct<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:ye?x.jsxs(x.Fragment,{children:[x.jsx(ua,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(Ju,{size:24,className:"fill-yellow-400 text-black"}),x.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),x.jsx(Jl,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{className:"space-y-4 mt-6",children:[rn&&x.jsx("div",{className:"mt-4",children:x.jsx(Ru,{thought:rn})}),x.jsxs("div",{className:"flex flex-col gap-2",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),x.jsx("textarea",{value:oe,onChange:de=>W(de.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(oe),xa(!0),setTimeout(()=>xa(!1),2e3)},disabled:!oe,className:`w-full ${ga?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[ga?x.jsx(qi,{size:20}):x.jsx(ec,{size:20}),ga?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),x.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${oe&&oe.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>oe&&oe.length>20&&br(!Ca),children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🔥"}),x.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),x.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),Dn&&x.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:oe&&oe.length>20?Ca?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),x.jsx(t_,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${Ca?"rotate-180":""}`})]})]}),Ca&&oe&&oe.length>20&&x.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[x.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",x.jsx("br",{}),x.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),x.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ce?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Ce,onChange:()=>ht(!Ce)}),Ce&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Ce?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${at?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:at,onChange:()=>Rt(!at)}),at&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${at?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${H?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:H,onChange:()=>Oe(!H)}),H&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${H?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${fe?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:fe,onChange:()=>Xe(!fe)}),fe&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${fe?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Le?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Le,onChange:()=>Te(!Le)}),Le&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Le?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${qe?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:qe,onChange:()=>ut(!qe)}),qe&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(qi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${qe?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),x.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[Ce&&"表情",at&&"身体",H&&"演出",fe&&"背景",Le&&"カメラ",qe&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),x.jsxs("div",{className:"flex gap-2",children:[x.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:eo,disabled:Ln||!(Ce||at||H||fe||Le||qe),children:Ln?x.jsxs(x.Fragment,{children:[x.jsx(ua,{size:16,className:"animate-spin"})," 強化中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(Ju,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),x.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${Dn?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:to,disabled:Ln||!Dn,children:"↩️ 強化前に戻す"})]}),x.jsx(Ru,{thought:Za||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})]}),x.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${oe?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[x.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[x.jsx(s_,{size:14})," ",K?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",x.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",x.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",x.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const de=oe?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",st=oe?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",et=oe?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",mt=!!K&&!!De&&ft,xt=mt?"背景 (Background)":"場所 (Location)",Ke=mt?de||De?.location||"360°画像":de||g.trim()||"AIおまかせ",je=mt?"画像解析":g.trim()?"手入力":"AIおまかせ",He=mt?"#67e8f9":g.trim()?"#ffffff":"#93c5fd",we=mt?"rgba(6,182,212,0.3)":g.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",lt=mt?"#67e8f9":g.trim()?"#d1d5db":"#93c5fd",Tn=mt?"rgba(6,182,212,0.4)":g.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return x.jsxs(x.Fragment,{children:[x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[mt?x.jsx(tc,{size:12,className:"text-cyan-400"}):x.jsx(tc,{size:12,className:"text-blue-400"}),x.jsxs("span",{children:[xt,":"]}),x.jsx("span",{style:{fontWeight:"bold",color:He},children:Ke}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:we,color:lt,border:`1px solid ${Tn}`},children:je})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[x.jsx("span",{className:"text-green-400",children:"👕"}),x.jsx("span",{children:"服装 (Outfit):"}),x.jsx("span",{style:{fontWeight:"bold",color:M.trim()?"#ffffff":"#93c5fd"},children:st||M.trim()||"AIおまかせ"}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:M.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:M.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${M.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:M.trim()?"手入力":"AIおまかせ"})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[x.jsx("span",{className:"text-yellow-400",children:"🎬"}),x.jsx("span",{children:"オチ (Punchline):"}),x.jsx("span",{style:{fontWeight:"bold",color:et||L!=="Auto"?"#ffffff":"#93c5fd"},children:et||(L==="Auto"?"AIおまかせ":Xv(L))}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:L!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:L!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${L!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:L!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),x.jsxs("section",{ref:ol,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
              ${Ct===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
              ${Ct>3?"border border-orange-500/30 opacity-100":""}
          `,children:[(Ct<3||ye||ae||Ln||At)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:At&&Ct>=3&&x.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[x.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),x.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),x.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),x.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${Ct===3?"text-orange-400":"text-slate-500"}`,children:[x.jsx(Th,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),!1,x.jsx("button",{onClick:()=>ti(),disabled:tt||At,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
                   ${Ct===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
              `,children:tt?x.jsxs(x.Fragment,{children:[x.jsx(ua,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(Th,{size:24,className:`text-blue-600 ${Ct===3?"animate-bounce":""} `}),x.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),x.jsx(Jl,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{ref:ll,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(Ct<3||ye||ae||Ln)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("section",{className:"relative group h-full",children:[x.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),x.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[x.jsx("div",{className:"flex items-center justify-between mb-4",children:x.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[x.jsx("button",{onClick:dl,disabled:!ee,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:x.jsx(ec,{size:14})}),x.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),x.jsx(Ru,{thought:Y,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),x.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[!1,x.jsx("div",{className:"relative flex-1",children:x.jsx("textarea",{value:ee,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),x.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[K&&De&&ft&&ee&&x.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[x.jsx("div",{className:"flex items-start gap-4",children:x.jsxs("div",{className:"flex-1 space-y-1",children:[x.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[x.jsx(tc,{size:12})," 🌐 360°背景モード (ON)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",x.jsx("br",{}),x.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),x.jsx("br",{}),x.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),x.jsx("br",{}),x.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),x.jsx(Lv,{imageSrc:K,height:120}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),Qt&&Ve&&Ve.length===4&&x.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[x.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),x.jsx("div",{className:"grid grid-cols-4 gap-2",children:Qt.panels.map((de,st)=>{const mt=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((de.yaw%360+360)%360/45)%8];return x.jsxs("div",{className:"relative",children:[x.jsx("img",{src:Ve[st],alt:`Panel ${de.panel} - ${mt}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[x.jsxs("span",{className:"font-bold",children:["コマ",de.panel]})," ",mt," ",x.jsxs("span",{className:"text-slate-400",children:["FOV",de.fov,"°"]})]})]},st)})}),x.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),x.jsxs("button",{onClick:dl,disabled:!ee,className:`w-full ${as?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[as?x.jsx(qi,{size:20}):x.jsx(ec,{size:20}),as?"コピー完了":l==="openai"?K&&ft?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":K&&ft?on?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":on?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),x.jsxs("button",{onClick:()=>{const de=new Date,st=l==="openai"?"ChatGPT Engine (自動)":on?"ChatGPT専用プロンプト":"Gemini用プロンプト",et={ファイル情報:{フォーマットバージョン:1,アプリバージョン:Vr,保存日時:de.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:de.toISOString()},プロンプト判別:{モード:st,AIエンジン:l==="openai"?"ChatGPT":"Gemini",ChatGPTモード:on,説明:l==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":on?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:X||"(未解析)",シナリオ:oe||"(未生成)",最終プロンプト:ee||"(未生成)",生成設定:{パンチラインタイプ:L,カラーモード:Ie,強化オプション:{表情強化:Ce,ボディランゲージ強化:at,"照明・演出強化":H,背景強化:fe,カメラワーク強化:Le,"セリフ・ギャグ強化":qe},"360度背景":{画像読込:!!K,有効:ft,場所:De?.location||"(未解析)",空間タイプ:De?.spatialType||"(未解析)",光源:De?.lighting||"(未解析)"}}},mt=JSON.stringify(et,null,2),xt=new Blob([mt],{type:"application/json;charset=utf-8"}),Ke=URL.createObjectURL(xt),je=document.createElement("a");je.href=Ke;const He=oe?.match(/タイトル[:：]\s*(.+)/),we=He?He[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",lt=`${String(de.getFullYear()).slice(-2)}${String(de.getMonth()+1).padStart(2,"0")}${String(de.getDate()).padStart(2,"0")}${String(de.getHours()).padStart(2,"0")}${String(de.getMinutes()).padStart(2,"0")}${String(de.getSeconds()).padStart(2,"0")}`;je.download=`AI_4-koma_metadata_${we}_${lt}.json`,document.body.appendChild(je),je.click(),document.body.removeChild(je),URL.revokeObjectURL(Ke),yr(!0),setTimeout(()=>yr(!1),2500)},disabled:!ee,className:`w-full ${bn?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${bn?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${bn?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[bn?x.jsx(qi,{size:16}):x.jsx(n_,{size:16}),bn?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),x.jsxs("div",{className:"relative mt-2",children:[!tt&&!ee&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",x.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),x.jsxs("button",{onClick:()=>{console.log("Regenerating..."),Sc()},disabled:!ee||Dt,className:`w-full ${l==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[Dt?x.jsx(ua,{size:20,className:"animate-spin"}):x.jsx(i_,{size:20}),x.jsx("div",{className:"flex flex-col items-center",children:x.jsx("span",{children:Dt?"再生成中...":`画像を生成する (STEP 4: ${l==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),x.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",x.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",x.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),x.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:x.jsxs("div",{className:"flex items-start gap-2",children:[x.jsx("div",{className:"mt-0.5 text-orange-400",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("circle",{cx:"12",cy:"12",r:"10"}),x.jsx("path",{d:"M12 16v-4"}),x.jsx("path",{d:"M12 8h.01"})]})}),x.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[x.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),x.jsx("br",{}),l==="openai"?x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&ft?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",x.jsx("br",{}),x.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",x.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",x.jsxs("strong",{children:["「元となるキャラシート画像",K&&ft?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),l==="openai"&&x.jsx("div",{className:"mt-3 block w-full",children:x.jsxs("button",{className:`mt-2 ${Sr?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const de=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${Vr}"
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
No explanations. No partial results.`;navigator.clipboard.writeText(de),io(!0),setTimeout(()=>io(!1),2e3)},children:[x.jsx("span",{style:{visibility:Sr?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),Sr&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),x.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${ee?"":"opacity-40 pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>Fe(!ze),disabled:!ee,children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🛡️"}),x.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!ee&&x.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:ze?"クリックで閉じる":"クリックで開く"}),x.jsx(t_,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${ze?"rotate-180":""}`})]})]}),ze&&x.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[x.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[x.jsxs("p",{children:["下の",x.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),x.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",x.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),x.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),x.jsxs("button",{className:`${ta?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),ss(!0),setTimeout(()=>ss(!1),2e3)},children:[x.jsx("span",{style:{visibility:ta?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),ta&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),x.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Ee,onChange:de=>Ue(de.target.value),placeholder:l==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),x.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ef,disabled:Be||!Ee.trim()||!ee,children:Be?x.jsxs(x.Fragment,{children:[x.jsx(ua,{size:16,className:"animate-spin"})," 分析・修正中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(Th,{size:16})," 配慮版プロンプトを再生成する"]})}),x.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:me||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),x.jsxs("div",{ref:Da,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[x.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[x.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),x.jsx("span",{className:l==="openai"?"text-emerald-500":"text-blue-500",children:l==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),Q.length===0?x.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):Q.map((de,st)=>x.jsxs("div",{className:"mb-1 leading-relaxed",children:[x.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),de]},st)),Dt&&x.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),x.jsxs("section",{ref:cl,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!ee&&!ei&&!Dt||ye||tt||Ln||Rn&&Wn>0&&Wn<4)&&!Dt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(ye||tt||Ln||Rn&&Wn>0&&Wn<4)&&x.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[x.jsx(ua,{size:36,className:"animate-spin text-blue-500"}),x.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:ye||tt?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),Dt&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:x.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[x.jsx(ua,{size:64,className:"animate-spin text-blue-500 mx-auto"}),x.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),x.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[x.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",x.jsxs("span",{className:"flex space-x-1",children:[x.jsx("span",{className:"animate-bounce delay-75",children:"."}),x.jsx("span",{className:"animate-bounce delay-150",children:"."}),x.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),x.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",x.jsx("br",{}),x.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",x.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),x.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:U?x.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:U}):x.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),x.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:ei?x.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[x.jsx("img",{src:ei,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),J&&x.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:x.jsxs("div",{className:"flex items-start gap-3",children:[x.jsx(r_,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),x.jsxs("div",{className:"text-sm",children:[x.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),x.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",x.jsx("br",{}),x.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),x.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[x.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),x.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[x.jsxs("li",{children:["画面左側の「",x.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),x.jsxs("li",{children:[x.jsx("a",{href:gn?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:gn?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),x.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),x.jsxs("div",{className:"w-full px-8 mt-2",children:[x.jsxs("button",{onClick:()=>{const de=document.createElement("a");de.href=ei,de.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(de),de.click(),document.body.removeChild(de)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[x.jsx(n_,{size:20})," 画像をダウンロード (.png)"]}),x.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):x.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[x.jsx(lp,{size:80,className:"mx-auto"}),x.jsxs("div",{className:"space-y-2 text-center",children:[x.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),x.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),ns.length>0&&x.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(ye||tt||Dt||Ln||Rn&&Wn>0&&Wn<4)&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:x.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[x.jsx(ua,{size:12,className:"animate-spin"})," 生成中..."]})}),x.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[x.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[x.jsx(i_,{size:14,className:"text-blue-400"}),"生成履歴 (",ns.length,")"]}),x.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Gi([]),ea(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[x.jsx(Mh,{size:12})," 全削除"]})]}),x.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:ns.map(de=>x.jsxs("div",{onClick:()=>ea(de.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${ei===de.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[x.jsx("img",{src:de.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),ei===de.img&&x.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:x.jsx(Lo,{size:10,strokeWidth:3})}),x.jsx("div",{onClick:st=>{st.stopPropagation(),Gi(et=>et.filter(mt=>mt.id!==de.id)),ei===de.img&&ea("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:x.jsx(Mh,{size:10})})]},de.id))})]})]})]}),x.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",x.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),Tt&&x.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[x.jsx(qi,{size:18,className:"text-green-600"})," ",Tt]}),x.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function kC(){return x.jsx(GC,{children:x.jsx(HC,{})})}pS.createRoot(document.getElementById("root")).render(x.jsx(Re.StrictMode,{children:x.jsx(kC,{})}));
