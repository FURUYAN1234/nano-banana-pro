(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function sS(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ch={exports:{}},Il={};var Hx;function rS(){if(Hx)return Il;Hx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Il.Fragment=e,Il.jsx=i,Il.jsxs=i,Il}var kx;function oS(){return kx||(kx=1,ch.exports=rS()),ch.exports}var v=oS(),uh={exports:{}},_t={};var Vx;function lS(){if(Vx)return _t;Vx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function b(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,E={};function S(P,Z,_e){this.props=P,this.context=Z,this.refs=E,this.updater=_e||M}S.prototype.isReactComponent={},S.prototype.setState=function(P,Z){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Z,"setState")},S.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=S.prototype;function U(P,Z,_e){this.props=P,this.context=Z,this.refs=E,this.updater=_e||M}var I=U.prototype=new N;I.constructor=U,R(I,S.prototype),I.isPureReactComponent=!0;var k=Array.isArray;function L(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,Z,_e){var Ae=_e.ref;return{$$typeof:r,type:P,key:Z,ref:Ae!==void 0?Ae:null,props:_e}}function j(P,Z){return F(P.type,Z,P.props)}function H(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function q(P){var Z={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(_e){return Z[_e]})}var se=/\/+/g;function ee(P,Z){return typeof P=="object"&&P!==null&&P.key!=null?q(""+P.key):Z.toString(36)}function V(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(Z){P.status==="pending"&&(P.status="fulfilled",P.value=Z)},function(Z){P.status==="pending"&&(P.status="rejected",P.reason=Z)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function D(P,Z,_e,Ae,Ne){var te=typeof P;(te==="undefined"||te==="boolean")&&(P=null);var Se=!1;if(P===null)Se=!0;else switch(te){case"bigint":case"string":case"number":Se=!0;break;case"object":switch(P.$$typeof){case r:case e:Se=!0;break;case x:return Se=P._init,D(Se(P._payload),Z,_e,Ae,Ne)}}if(Se)return Ne=Ne(P),Se=Ae===""?"."+ee(P,0):Ae,k(Ne)?(_e="",Se!=null&&(_e=Se.replace(se,"$&/")+"/"),D(Ne,Z,_e,"",function(We){return We})):Ne!=null&&(H(Ne)&&(Ne=j(Ne,_e+(Ne.key==null||P&&P.key===Ne.key?"":(""+Ne.key).replace(se,"$&/")+"/")+Se)),Z.push(Ne)),1;Se=0;var ye=Ae===""?".":Ae+":";if(k(P))for(var Ge=0;Ge<P.length;Ge++)Ae=P[Ge],te=ye+ee(Ae,Ge),Se+=D(Ae,Z,_e,te,Ne);else if(Ge=b(P),typeof Ge=="function")for(P=Ge.call(P),Ge=0;!(Ae=P.next()).done;)Ae=Ae.value,te=ye+ee(Ae,Ge++),Se+=D(Ae,Z,_e,te,Ne);else if(te==="object"){if(typeof P.then=="function")return D(V(P),Z,_e,Ae,Ne);throw Z=String(P),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return Se}function z(P,Z,_e){if(P==null)return P;var Ae=[],Ne=0;return D(P,Ae,"","",function(te){return Z.call(_e,te,Ne++)}),Ae}function K(P){if(P._status===-1){var Z=P._result;Z=Z(),Z.then(function(_e){(P._status===0||P._status===-1)&&(P._status=1,P._result=_e)},function(_e){(P._status===0||P._status===-1)&&(P._status=2,P._result=_e)}),P._status===-1&&(P._status=0,P._result=Z)}if(P._status===1)return P._result.default;throw P._result}var ue=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},ge={map:z,forEach:function(P,Z,_e){z(P,function(){Z.apply(this,arguments)},_e)},count:function(P){var Z=0;return z(P,function(){Z++}),Z},toArray:function(P){return z(P,function(Z){return Z})||[]},only:function(P){if(!H(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return _t.Activity=_,_t.Children=ge,_t.Component=S,_t.Fragment=i,_t.Profiler=l,_t.PureComponent=U,_t.StrictMode=s,_t.Suspense=m,_t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,_t.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},_t.cache=function(P){return function(){return P.apply(null,arguments)}},_t.cacheSignal=function(){return null},_t.cloneElement=function(P,Z,_e){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ae=R({},P.props),Ne=P.key;if(Z!=null)for(te in Z.key!==void 0&&(Ne=""+Z.key),Z)!A.call(Z,te)||te==="key"||te==="__self"||te==="__source"||te==="ref"&&Z.ref===void 0||(Ae[te]=Z[te]);var te=arguments.length-2;if(te===1)Ae.children=_e;else if(1<te){for(var Se=Array(te),ye=0;ye<te;ye++)Se[ye]=arguments[ye+2];Ae.children=Se}return F(P.type,Ne,Ae)},_t.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},_t.createElement=function(P,Z,_e){var Ae,Ne={},te=null;if(Z!=null)for(Ae in Z.key!==void 0&&(te=""+Z.key),Z)A.call(Z,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Ne[Ae]=Z[Ae]);var Se=arguments.length-2;if(Se===1)Ne.children=_e;else if(1<Se){for(var ye=Array(Se),Ge=0;Ge<Se;Ge++)ye[Ge]=arguments[Ge+2];Ne.children=ye}if(P&&P.defaultProps)for(Ae in Se=P.defaultProps,Se)Ne[Ae]===void 0&&(Ne[Ae]=Se[Ae]);return F(P,te,Ne)},_t.createRef=function(){return{current:null}},_t.forwardRef=function(P){return{$$typeof:h,render:P}},_t.isValidElement=H,_t.lazy=function(P){return{$$typeof:x,_payload:{_status:-1,_result:P},_init:K}},_t.memo=function(P,Z){return{$$typeof:p,type:P,compare:Z===void 0?null:Z}},_t.startTransition=function(P){var Z=B.T,_e={};B.T=_e;try{var Ae=P(),Ne=B.S;Ne!==null&&Ne(_e,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(L,ue)}catch(te){ue(te)}finally{Z!==null&&_e.types!==null&&(Z.types=_e.types),B.T=Z}},_t.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},_t.use=function(P){return B.H.use(P)},_t.useActionState=function(P,Z,_e){return B.H.useActionState(P,Z,_e)},_t.useCallback=function(P,Z){return B.H.useCallback(P,Z)},_t.useContext=function(P){return B.H.useContext(P)},_t.useDebugValue=function(){},_t.useDeferredValue=function(P,Z){return B.H.useDeferredValue(P,Z)},_t.useEffect=function(P,Z){return B.H.useEffect(P,Z)},_t.useEffectEvent=function(P){return B.H.useEffectEvent(P)},_t.useId=function(){return B.H.useId()},_t.useImperativeHandle=function(P,Z,_e){return B.H.useImperativeHandle(P,Z,_e)},_t.useInsertionEffect=function(P,Z){return B.H.useInsertionEffect(P,Z)},_t.useLayoutEffect=function(P,Z){return B.H.useLayoutEffect(P,Z)},_t.useMemo=function(P,Z){return B.H.useMemo(P,Z)},_t.useOptimistic=function(P,Z){return B.H.useOptimistic(P,Z)},_t.useReducer=function(P,Z,_e){return B.H.useReducer(P,Z,_e)},_t.useRef=function(P){return B.H.useRef(P)},_t.useState=function(P){return B.H.useState(P)},_t.useSyncExternalStore=function(P,Z,_e){return B.H.useSyncExternalStore(P,Z,_e)},_t.useTransition=function(){return B.H.useTransition()},_t.version="19.2.3",_t}var jx;function Yp(){return jx||(jx=1,uh.exports=lS()),uh.exports}var we=Yp();const cS=sS(we);var fh={exports:{}},Pl={},dh={exports:{}},hh={};var Xx;function uS(){return Xx||(Xx=1,(function(r){function e(D,z){var K=D.length;D.push(z);e:for(;0<K;){var ue=K-1>>>1,ge=D[ue];if(0<l(ge,z))D[ue]=z,D[K]=ge,K=ue;else break e}}function i(D){return D.length===0?null:D[0]}function s(D){if(D.length===0)return null;var z=D[0],K=D.pop();if(K!==z){D[0]=K;e:for(var ue=0,ge=D.length,P=ge>>>1;ue<P;){var Z=2*(ue+1)-1,_e=D[Z],Ae=Z+1,Ne=D[Ae];if(0>l(_e,K))Ae<ge&&0>l(Ne,_e)?(D[ue]=Ne,D[Ae]=K,ue=Ae):(D[ue]=_e,D[Z]=K,ue=Z);else if(Ae<ge&&0>l(Ne,K))D[ue]=Ne,D[Ae]=K,ue=Ae;else break e}}return z}function l(D,z){var K=D.sortIndex-z.sortIndex;return K!==0?K:D.id-z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],x=1,_=null,g=3,b=!1,M=!1,R=!1,E=!1,S=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function I(D){for(var z=i(p);z!==null;){if(z.callback===null)s(p);else if(z.startTime<=D)s(p),z.sortIndex=z.expirationTime,e(m,z);else break;z=i(p)}}function k(D){if(R=!1,I(D),!M)if(i(m)!==null)M=!0,L||(L=!0,q());else{var z=i(p);z!==null&&V(k,z.startTime-D)}}var L=!1,B=-1,A=5,F=-1;function j(){return E?!0:!(r.unstable_now()-F<A)}function H(){if(E=!1,L){var D=r.unstable_now();F=D;var z=!0;try{e:{M=!1,R&&(R=!1,N(B),B=-1),b=!0;var K=g;try{t:{for(I(D),_=i(m);_!==null&&!(_.expirationTime>D&&j());){var ue=_.callback;if(typeof ue=="function"){_.callback=null,g=_.priorityLevel;var ge=ue(_.expirationTime<=D);if(D=r.unstable_now(),typeof ge=="function"){_.callback=ge,I(D),z=!0;break t}_===i(m)&&s(m),I(D)}else s(m);_=i(m)}if(_!==null)z=!0;else{var P=i(p);P!==null&&V(k,P.startTime-D),z=!1}}break e}finally{_=null,g=K,b=!1}z=void 0}}finally{z?q():L=!1}}}var q;if(typeof U=="function")q=function(){U(H)};else if(typeof MessageChannel<"u"){var se=new MessageChannel,ee=se.port2;se.port1.onmessage=H,q=function(){ee.postMessage(null)}}else q=function(){S(H,0)};function V(D,z){B=S(function(){D(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(D){D.callback=null},r.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<D?Math.floor(1e3/D):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(D){switch(g){case 1:case 2:case 3:var z=3;break;default:z=g}var K=g;g=z;try{return D()}finally{g=K}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(D,z){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var K=g;g=D;try{return z()}finally{g=K}},r.unstable_scheduleCallback=function(D,z,K){var ue=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ue+K:ue):K=ue,D){case 1:var ge=-1;break;case 2:ge=250;break;case 5:ge=1073741823;break;case 4:ge=1e4;break;default:ge=5e3}return ge=K+ge,D={id:x++,callback:z,priorityLevel:D,startTime:K,expirationTime:ge,sortIndex:-1},K>ue?(D.sortIndex=K,e(p,D),i(m)===null&&D===i(p)&&(R?(N(B),B=-1):R=!0,V(k,K-ue))):(D.sortIndex=ge,e(m,D),M||b||(M=!0,L||(L=!0,q()))),D},r.unstable_shouldYield=j,r.unstable_wrapCallback=function(D){var z=g;return function(){var K=g;g=z;try{return D.apply(this,arguments)}finally{g=K}}}})(hh)),hh}var Yx;function fS(){return Yx||(Yx=1,dh.exports=uS()),dh.exports}var ph={exports:{}},li={};var Wx;function dS(){if(Wx)return li;Wx=1;var r=Yp();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,x){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:x}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return li.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,li.createPortal=function(m,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,x)},li.flushSync=function(m){var p=f.T,x=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=x,s.d.f()}},li.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},li.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},li.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var x=p.as,_=h(x,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,b=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:b}):x==="script"&&s.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:b,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},li.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},li.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,_=h(x,p.crossOrigin);s.d.L(m,x,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},li.preloadModule=function(m,p){if(typeof m=="string")if(p){var x=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},li.requestFormReset=function(m){s.d.r(m)},li.unstable_batchedUpdates=function(m,p){return m(p)},li.useFormState=function(m,p,x){return f.H.useFormState(m,p,x)},li.useFormStatus=function(){return f.H.useHostTransitionStatus()},li.version="19.2.3",li}var qx;function hS(){if(qx)return ph.exports;qx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),ph.exports=dS(),ph.exports}var $x;function pS(){if($x)return Pl;$x=1;var r=fS(),e=Yp(),i=hS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var y=!1,C=u.child;C;){if(C===a){y=!0,a=u,o=d;break}if(C===o){y=!0,o=u,a=d;break}C=C.sibling}if(!y){for(C=d.child;C;){if(C===a){y=!0,a=d,o=u;break}if(C===o){y=!0,o=d,a=u;break}C=C.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function x(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=x(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),U=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),j=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function q(t){return t===null||typeof t!="object"?null:(t=H&&t[H]||t["@@iterator"],typeof t=="function"?t:null)}var se=Symbol.for("react.client.reference");function ee(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===se?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case R:return"Fragment";case S:return"Profiler";case E:return"StrictMode";case k:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case U:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case I:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:ee(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return ee(t(n))}catch{}}return null}var V=Array.isArray,D=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},ue=[],ge=-1;function P(t){return{current:t}}function Z(t){0>ge||(t.current=ue[ge],ue[ge]=null,ge--)}function _e(t,n){ge++,ue[ge]=t.current,t.current=n}var Ae=P(null),Ne=P(null),te=P(null),Se=P(null);function ye(t,n){switch(_e(te,n),_e(Ne,t),_e(Ae,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?ux(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=ux(n),t=fx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Z(Ae),_e(Ae,t)}function Ge(){Z(Ae),Z(Ne),Z(te)}function We(t){t.memoizedState!==null&&_e(Se,t);var n=Ae.current,a=fx(n,t.type);n!==a&&(_e(Ne,t),_e(Ae,a))}function Qe(t){Ne.current===t&&(Z(Ae),Z(Ne)),Se.current===t&&(Z(Se),Ol._currentValue=K)}var St,Xe;function wt(t){if(St===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);St=n&&n[1]||"",Xe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+St+t+Xe}var Bt=!1;function ht(t,n){if(!t||Bt)return"";Bt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var be=function(){throw Error()};if(Object.defineProperty(be.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(be,[])}catch(fe){var ce=fe}Reflect.construct(t,[],be)}else{try{be.call()}catch(fe){ce=fe}t.call(be.prototype)}}else{try{throw Error()}catch(fe){ce=fe}(be=t())&&typeof be.catch=="function"&&be.catch(function(){})}}catch(fe){if(fe&&ce&&typeof fe.stack=="string")return[fe.stack,ce.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],C=d[1];if(y&&C){var G=y.split(`
`),le=C.split(`
`);for(u=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;u<le.length&&!le[u].includes("DetermineComponentFrameRoot");)u++;if(o===G.length||u===le.length)for(o=G.length-1,u=le.length-1;1<=o&&0<=u&&G[o]!==le[u];)u--;for(;1<=o&&0<=u;o--,u--)if(G[o]!==le[u]){if(o!==1||u!==1)do if(o--,u--,0>u||G[o]!==le[u]){var xe=`
`+G[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=u);break}}}finally{Bt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?wt(a):""}function It(t,n){switch(t.tag){case 26:case 27:case 5:return wt(t.type);case 16:return wt("Lazy");case 13:return t.child!==n&&n!==null?wt("Suspense Fallback"):wt("Suspense");case 19:return wt("SuspenseList");case 0:case 15:return ht(t.type,!1);case 11:return ht(t.type.render,!1);case 1:return ht(t.type,!0);case 31:return wt("Activity");default:return""}}function Zt(t){try{var n="",a=null;do n+=It(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ze=Object.prototype.hasOwnProperty,Y=r.unstable_scheduleCallback,Nt=r.unstable_cancelCallback,ft=r.unstable_shouldYield,Vt=r.unstable_requestPaint,Ce=r.unstable_now,Qt=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,J=r.unstable_NormalPriority,he=r.unstable_LowPriority,Me=r.unstable_IdlePriority,Oe=r.log,Pe=r.unstable_setDisableYieldValue,de=null,pe=null;function Le(t){if(typeof Oe=="function"&&Pe(t),pe&&typeof pe.setStrictMode=="function")try{pe.setStrictMode(de,t)}catch{}}var Be=Math.clz32?Math.clz32:ut,Ie=Math.log,De=Math.LN2;function ut(t){return t>>>=0,t===0?32:31-(Ie(t)/De|0)|0}var rt=256,Mt=262144,X=4194304;function Re(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function me(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var C=o&134217727;return C!==0?(o=C&~d,o!==0?u=Re(o):(y&=C,y!==0?u=Re(y):a||(a=C&~t,a!==0&&(u=Re(a))))):(C=o&~d,C!==0?u=Re(C):y!==0?u=Re(y):a||(a=o&~t,a!==0&&(u=Re(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function He(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ue(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Te(){var t=X;return X<<=1,(X&62914560)===0&&(X=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ot(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function xn(t,n,a,o,u,d){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,G=t.expirationTimes,le=t.hiddenUpdates;for(a=y&~a;0<a;){var xe=31-Be(a),be=1<<xe;C[xe]=0,G[xe]=-1;var ce=le[xe];if(ce!==null)for(le[xe]=null,xe=0;xe<ce.length;xe++){var fe=ce[xe];fe!==null&&(fe.lane&=-536870913)}a&=~be}o!==0&&jt(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(y&~n))}function jt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Be(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function $n(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Be(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ri(t,n){var a=n&-n;return a=(a&42)!==0?1:Ia(a),(a&(t.suspendedLanes|n))!==0?0:a}function Ia(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Qn(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function tr(){var t=z.p;return t!==0?t:(t=window.event,t===void 0?32:Ux(t.type))}function nr(t,n){var a=z.p;try{return z.p=t,n()}finally{z.p=a}}var Nn=Math.random().toString(36).slice(2),_n="__reactFiber$"+Nn,Tn="__reactProps$"+Nn,Oi="__reactContainer$"+Nn,pn="__reactEvents$"+Nn,ma="__reactListeners$"+Nn,gs="__reactHandles$"+Nn,Pa="__reactResources$"+Nn,Fa="__reactMarker$"+Nn;function Pr(t){delete t[_n],delete t[Tn],delete t[pn],delete t[ma],delete t[gs]}function ga(t){var n=t[_n];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Oi]||a[_n]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=_x(t);t!==null;){if(a=t[_n])return a;t=_x(t)}return n}t=a,a=t.parentNode}return null}function xa(t){if(t=t[_n]||t[Oi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Ba(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function _a(t){var n=t[Pa];return n||(n=t[Pa]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function An(t){t[Fa]=!0}var Fr=new Set,w={};function $(t,n){ne(t,n),ne(t+"Capture",n)}function ne(t,n){for(w[t]=n,t=0;t<n.length;t++)Fr.add(n[t])}var ie=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),re={},ze={};function ke(t){return Ze.call(ze,t)?!0:Ze.call(re,t)?!1:ie.test(t)?ze[t]=!0:(re[t]=!0,!1)}function Fe(t,n,a){if(ke(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function $e(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ye(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function it(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function nt(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,d.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Xt(t){if(!t._valueTracker){var n=vt(t)?"checked":"value";t._valueTracker=nt(t,n,""+t[n])}}function Yt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=vt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function tn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Jt=/[\n"\\]/g;function Wt(t){return t.replace(Jt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ve(t,n,a,o,u,d,y,C){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+it(n)):t.value!==""+it(n)&&(t.value=""+it(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?Rt(t,y,it(n)):a!=null?Rt(t,y,it(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+it(C):t.removeAttribute("name")}function Pn(t,n,a,o,u,d,y,C){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){Xt(t);return}a=a!=null?""+it(a):"",n=n!=null?""+it(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=C?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),Xt(t)}function Rt(t,n,a){n==="number"&&tn(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function mn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+it(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function En(t,n,a){if(n!=null&&(n=""+it(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+it(a):""}function yn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(V(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=it(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Xt(t)}function Jn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var zt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function gn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||zt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function _i(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&gn(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&gn(t,d,n[d])}function Gt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Mn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),za=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xs(t){return za.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Wi(){}var ir=null;function pi(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var vi=null,oi=null;function $o(t){var n=xa(t);if(n&&(t=n.stateNode)){var a=t[Tn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Ve(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Wt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[Tn]||null;if(!u)throw Error(s(90));Ve(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Yt(o)}break e;case"textarea":En(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&mn(t,!!a.multiple,n,!1)}}}var Br=!1;function oc(t,n,a){if(Br)return t(n,a);Br=!0;try{var o=t(n);return o}finally{if(Br=!1,(vi!==null||oi!==null)&&(Xc(),vi&&(n=vi,t=oi,oi=vi=null,$o(n),t)))for(n=0;n<t.length;n++)$o(t[n])}}function _s(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Tn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var bi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ga=!1;if(bi)try{var mi={};Object.defineProperty(mi,"passive",{get:function(){Ga=!0}}),window.addEventListener("test",mi,mi),window.removeEventListener("test",mi,mi)}catch{Ga=!1}var Di=null,Ha=null,zr=null;function xt(){if(zr)return zr;var t,n=Ha,a=n.length,o,u="value"in Di?Di.value:Di.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===u[d-o];o++);return zr=u.slice(t,1<o?1-o:void 0)}function Gr(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Hr(){return!0}function lc(){return!1}function ei(t){function n(a,o,u,d,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(d):d[C]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Hr:lc,this.isPropagationStopped=lc,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Hr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Hr)},persist:function(){},isPersistent:Hr}),n}var ra={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kr=ei(ra),ar=_({},ra,{view:0,detail:0}),uf=ei(ar),Vr,Ko,sr,ka=_({},ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Je,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==sr&&(sr&&t.type==="mousemove"?(Vr=t.screenX-sr.screenX,Ko=t.screenY-sr.screenY):Ko=Vr=0,sr=t),Vr)},movementY:function(t){return"movementY"in t?t.movementY:Ko}}),jr=ei(ka),ff=_({},ka,{dataTransfer:0}),cc=ei(ff),df=_({},ar,{relatedTarget:0}),Zo=ei(df),hf=_({},ra,{animationName:0,elapsedTime:0,pseudoElement:0}),dn=ei(hf),tt=_({},ra,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Tt=ei(tt),pt=_({},ra,{data:0}),mt=ei(pt),gt={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ct={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},st={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ee(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=st[t])?!!n[t]:!1}function Je(){return Ee}var Ot=_({},ar,{key:function(t){if(t.key){var n=gt[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Gr(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ct[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Je,charCode:function(t){return t.type==="keypress"?Gr(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Gr(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Fn=ei(Ot),nn=_({},ka,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Li=ei(nn),Xr=_({},ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Je}),Vn=ei(Xr),yi=_({},ra,{propertyName:0,elapsedTime:0,pseudoElement:0}),On=ei(yi),wn=_({},ka,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Va=ei(wn),rr=_({},ra,{newState:0,oldState:0}),pf=ei(rr),wb=[9,13,27,32],mf=bi&&"CompositionEvent"in window,Qo=null;bi&&"documentMode"in document&&(Qo=document.documentMode);var Rb=bi&&"TextEvent"in window&&!Qo,gm=bi&&(!mf||Qo&&8<Qo&&11>=Qo),xm=" ",_m=!1;function vm(t,n){switch(t){case"keyup":return wb.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Yr=!1;function Cb(t,n){switch(t){case"compositionend":return bm(n);case"keypress":return n.which!==32?null:(_m=!0,xm);case"textInput":return t=n.data,t===xm&&_m?null:t;default:return null}}function Nb(t,n){if(Yr)return t==="compositionend"||!mf&&vm(t,n)?(t=xt(),zr=Ha=Di=null,Yr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return gm&&n.locale!=="ko"?null:n.data;default:return null}}var Ob={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ym(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Ob[t.type]:n==="textarea"}function Sm(t,n,a,o){vi?oi?oi.push(o):oi=[o]:vi=o,n=Qc(n,"onChange"),0<n.length&&(a=new kr("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Jo=null,el=null;function Db(t){ax(t,0)}function uc(t){var n=Ba(t);if(Yt(n))return t}function Em(t,n){if(t==="change")return n}var Mm=!1;if(bi){var gf;if(bi){var xf="oninput"in document;if(!xf){var Tm=document.createElement("div");Tm.setAttribute("oninput","return;"),xf=typeof Tm.oninput=="function"}gf=xf}else gf=!1;Mm=gf&&(!document.documentMode||9<document.documentMode)}function Am(){Jo&&(Jo.detachEvent("onpropertychange",wm),el=Jo=null)}function wm(t){if(t.propertyName==="value"&&uc(el)){var n=[];Sm(n,el,t,pi(t)),oc(Db,n)}}function Lb(t,n,a){t==="focusin"?(Am(),Jo=n,el=a,Jo.attachEvent("onpropertychange",wm)):t==="focusout"&&Am()}function Ub(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uc(el)}function Ib(t,n){if(t==="click")return uc(n)}function Pb(t,n){if(t==="input"||t==="change")return uc(n)}function Fb(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Ui=typeof Object.is=="function"?Object.is:Fb;function tl(t,n){if(Ui(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Ze.call(n,u)||!Ui(t[u],n[u]))return!1}return!0}function Rm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Cm(t,n){var a=Rm(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Rm(a)}}function Nm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Nm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Om(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=tn(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=tn(t.document)}return n}function _f(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Bb=bi&&"documentMode"in document&&11>=document.documentMode,Wr=null,vf=null,nl=null,bf=!1;function Dm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;bf||Wr==null||Wr!==tn(o)||(o=Wr,"selectionStart"in o&&_f(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),nl&&tl(nl,o)||(nl=o,o=Qc(vf,"onSelect"),0<o.length&&(n=new kr("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Wr)))}function or(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var qr={animationend:or("Animation","AnimationEnd"),animationiteration:or("Animation","AnimationIteration"),animationstart:or("Animation","AnimationStart"),transitionrun:or("Transition","TransitionRun"),transitionstart:or("Transition","TransitionStart"),transitioncancel:or("Transition","TransitionCancel"),transitionend:or("Transition","TransitionEnd")},yf={},Lm={};bi&&(Lm=document.createElement("div").style,"AnimationEvent"in window||(delete qr.animationend.animation,delete qr.animationiteration.animation,delete qr.animationstart.animation),"TransitionEvent"in window||delete qr.transitionend.transition);function lr(t){if(yf[t])return yf[t];if(!qr[t])return t;var n=qr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Lm)return yf[t]=n[a];return t}var Um=lr("animationend"),Im=lr("animationiteration"),Pm=lr("animationstart"),zb=lr("transitionrun"),Gb=lr("transitionstart"),Hb=lr("transitioncancel"),Fm=lr("transitionend"),Bm=new Map,Sf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Sf.push("scrollEnd");function oa(t,n){Bm.set(t,n),$(n,[t])}var fc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},qi=[],$r=0,Ef=0;function dc(){for(var t=$r,n=Ef=$r=0;n<t;){var a=qi[n];qi[n++]=null;var o=qi[n];qi[n++]=null;var u=qi[n];qi[n++]=null;var d=qi[n];if(qi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&zm(a,u,d)}}function hc(t,n,a,o){qi[$r++]=t,qi[$r++]=n,qi[$r++]=a,qi[$r++]=o,Ef|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Mf(t,n,a,o){return hc(t,n,a,o),pc(t)}function cr(t,n){return hc(t,null,null,n),pc(t)}function zm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-Be(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function pc(t){if(50<Ml)throw Ml=0,Ld=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Kr={};function kb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ii(t,n,a,o){return new kb(t,n,a,o)}function Tf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ja(t,n){var a=t.alternate;return a===null?(a=Ii(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Gm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function mc(t,n,a,o,u,d){var y=0;if(o=t,typeof t=="function")Tf(t)&&(y=1);else if(typeof t=="string")y=Wy(t,a,Ae.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=Ii(31,a,n,u),t.elementType=F,t.lanes=d,t;case R:return ur(a.children,u,d,n);case E:y=8,u|=24;break;case S:return t=Ii(12,a,n,u|2),t.elementType=S,t.lanes=d,t;case k:return t=Ii(13,a,n,u),t.elementType=k,t.lanes=d,t;case L:return t=Ii(19,a,n,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:y=10;break e;case N:y=9;break e;case I:y=11;break e;case B:y=14;break e;case A:y=16,o=null;break e}y=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Ii(y,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function ur(t,n,a,o){return t=Ii(7,t,o,n),t.lanes=a,t}function Af(t,n,a){return t=Ii(6,t,null,n),t.lanes=a,t}function Hm(t){var n=Ii(18,null,null,0);return n.stateNode=t,n}function wf(t,n,a){return n=Ii(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var km=new WeakMap;function $i(t,n){if(typeof t=="object"&&t!==null){var a=km.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Zt(n)},km.set(t,n),n)}return{value:t,source:n,stack:Zt(n)}}var Zr=[],Qr=0,gc=null,il=0,Ki=[],Zi=0,vs=null,va=1,ba="";function Xa(t,n){Zr[Qr++]=il,Zr[Qr++]=gc,gc=t,il=n}function Vm(t,n,a){Ki[Zi++]=va,Ki[Zi++]=ba,Ki[Zi++]=vs,vs=t;var o=va;t=ba;var u=32-Be(o)-1;o&=~(1<<u),a+=1;var d=32-Be(n)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,va=1<<32-Be(n)+u|a<<u|o,ba=d+t}else va=1<<d|a<<u|o,ba=t}function Rf(t){t.return!==null&&(Xa(t,1),Vm(t,1,0))}function Cf(t){for(;t===gc;)gc=Zr[--Qr],Zr[Qr]=null,il=Zr[--Qr],Zr[Qr]=null;for(;t===vs;)vs=Ki[--Zi],Ki[Zi]=null,ba=Ki[--Zi],Ki[Zi]=null,va=Ki[--Zi],Ki[Zi]=null}function jm(t,n){Ki[Zi++]=va,Ki[Zi++]=ba,Ki[Zi++]=vs,va=n.id,ba=n.overflow,vs=t}var ti=null,vn=null,Ht=!1,bs=null,Qi=!1,Nf=Error(s(519));function ys(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw al($i(n,t)),Nf}function Xm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[_n]=t,n[Tn]=o,a){case"dialog":Lt("cancel",n),Lt("close",n);break;case"iframe":case"object":case"embed":Lt("load",n);break;case"video":case"audio":for(a=0;a<Al.length;a++)Lt(Al[a],n);break;case"source":Lt("error",n);break;case"img":case"image":case"link":Lt("error",n),Lt("load",n);break;case"details":Lt("toggle",n);break;case"input":Lt("invalid",n),Pn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Lt("invalid",n);break;case"textarea":Lt("invalid",n),yn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||lx(n.textContent,a)?(o.popover!=null&&(Lt("beforetoggle",n),Lt("toggle",n)),o.onScroll!=null&&Lt("scroll",n),o.onScrollEnd!=null&&Lt("scrollend",n),o.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||ys(t,!0)}function Ym(t){for(ti=t.return;ti;)switch(ti.tag){case 5:case 31:case 13:Qi=!1;return;case 27:case 3:Qi=!0;return;default:ti=ti.return}}function Jr(t){if(t!==ti)return!1;if(!Ht)return Ym(t),Ht=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||qd(t.type,t.memoizedProps)),a=!a),a&&vn&&ys(t),Ym(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=xx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=xx(t)}else n===27?(n=vn,Is(t.type)?(t=Jd,Jd=null,vn=t):vn=n):vn=ti?ea(t.stateNode.nextSibling):null;return!0}function fr(){vn=ti=null,Ht=!1}function Of(){var t=bs;return t!==null&&(Ti===null?Ti=t:Ti.push.apply(Ti,t),bs=null),t}function al(t){bs===null?bs=[t]:bs.push(t)}var Df=P(null),dr=null,Ya=null;function Ss(t,n,a){_e(Df,n._currentValue),n._currentValue=a}function Wa(t){t._currentValue=Df.current,Z(Df)}function Lf(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Uf(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;e:for(;d!==null;){var C=d;d=u;for(var G=0;G<n.length;G++)if(C.context===n[G]){d.lanes|=a,C=d.alternate,C!==null&&(C.lanes|=a),Lf(d.return,a,t),o||(y=null);break e}d=C.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,d=y.alternate,d!==null&&(d.lanes|=a),Lf(y,a,t),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===t){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function eo(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var C=u.type;Ui(u.pendingProps.value,y.value)||(t!==null?t.push(C):t=[C])}}else if(u===Se.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Ol):t=[Ol])}u=u.return}t!==null&&Uf(n,t,a,o),n.flags|=262144}function xc(t){for(t=t.firstContext;t!==null;){if(!Ui(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function hr(t){dr=t,Ya=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ni(t){return Wm(dr,t)}function _c(t,n){return dr===null&&hr(t),Wm(t,n)}function Wm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ya===null){if(t===null)throw Error(s(308));Ya=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Ya=Ya.next=n;return a}var Vb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},jb=r.unstable_scheduleCallback,Xb=r.unstable_NormalPriority,Bn={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function If(){return{controller:new Vb,data:new Map,refCount:0}}function sl(t){t.refCount--,t.refCount===0&&jb(Xb,function(){t.controller.abort()})}var rl=null,Pf=0,to=0,no=null;function Yb(t,n){if(rl===null){var a=rl=[];Pf=0,to=zd(),no={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Pf++,n.then(qm,qm),n}function qm(){if(--Pf===0&&rl!==null){no!==null&&(no.status="fulfilled");var t=rl;rl=null,to=0,no=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Wb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var $m=D.S;D.S=function(t,n){D0=Ce(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Yb(t,n),$m!==null&&$m(t,n)};var pr=P(null);function Ff(){var t=pr.current;return t!==null?t:hn.pooledCache}function vc(t,n){n===null?_e(pr,pr.current):_e(pr,n.pool)}function Km(){var t=Ff();return t===null?null:{parent:Bn._currentValue,pool:t}}var io=Error(s(460)),Bf=Error(s(474)),bc=Error(s(542)),yc={then:function(){}};function Zm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Qm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Wi,Wi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,eg(t),t;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(t=hn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,eg(t),t}throw gr=n,io}}function mr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(gr=a,io):a}}var gr=null;function Jm(){if(gr===null)throw Error(s(459));var t=gr;return gr=null,t}function eg(t){if(t===io||t===bc)throw Error(s(483))}var ao=null,ol=0;function Sc(t){var n=ol;return ol+=1,ao===null&&(ao=[]),Qm(ao,t,n)}function ll(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Ec(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function tg(t){function n(Q,W){if(t){var oe=Q.deletions;oe===null?(Q.deletions=[W],Q.flags|=16):oe.push(W)}}function a(Q,W){if(!t)return null;for(;W!==null;)n(Q,W),W=W.sibling;return null}function o(Q){for(var W=new Map;Q!==null;)Q.key!==null?W.set(Q.key,Q):W.set(Q.index,Q),Q=Q.sibling;return W}function u(Q,W){return Q=ja(Q,W),Q.index=0,Q.sibling=null,Q}function d(Q,W,oe){return Q.index=oe,t?(oe=Q.alternate,oe!==null?(oe=oe.index,oe<W?(Q.flags|=67108866,W):oe):(Q.flags|=67108866,W)):(Q.flags|=1048576,W)}function y(Q){return t&&Q.alternate===null&&(Q.flags|=67108866),Q}function C(Q,W,oe,ve){return W===null||W.tag!==6?(W=Af(oe,Q.mode,ve),W.return=Q,W):(W=u(W,oe),W.return=Q,W)}function G(Q,W,oe,ve){var at=oe.type;return at===R?xe(Q,W,oe.props.children,ve,oe.key):W!==null&&(W.elementType===at||typeof at=="object"&&at!==null&&at.$$typeof===A&&mr(at)===W.type)?(W=u(W,oe.props),ll(W,oe),W.return=Q,W):(W=mc(oe.type,oe.key,oe.props,null,Q.mode,ve),ll(W,oe),W.return=Q,W)}function le(Q,W,oe,ve){return W===null||W.tag!==4||W.stateNode.containerInfo!==oe.containerInfo||W.stateNode.implementation!==oe.implementation?(W=wf(oe,Q.mode,ve),W.return=Q,W):(W=u(W,oe.children||[]),W.return=Q,W)}function xe(Q,W,oe,ve,at){return W===null||W.tag!==7?(W=ur(oe,Q.mode,ve,at),W.return=Q,W):(W=u(W,oe),W.return=Q,W)}function be(Q,W,oe){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=Af(""+W,Q.mode,oe),W.return=Q,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case b:return oe=mc(W.type,W.key,W.props,null,Q.mode,oe),ll(oe,W),oe.return=Q,oe;case M:return W=wf(W,Q.mode,oe),W.return=Q,W;case A:return W=mr(W),be(Q,W,oe)}if(V(W)||q(W))return W=ur(W,Q.mode,oe,null),W.return=Q,W;if(typeof W.then=="function")return be(Q,Sc(W),oe);if(W.$$typeof===U)return be(Q,_c(Q,W),oe);Ec(Q,W)}return null}function ce(Q,W,oe,ve){var at=W!==null?W.key:null;if(typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint")return at!==null?null:C(Q,W,""+oe,ve);if(typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case b:return oe.key===at?G(Q,W,oe,ve):null;case M:return oe.key===at?le(Q,W,oe,ve):null;case A:return oe=mr(oe),ce(Q,W,oe,ve)}if(V(oe)||q(oe))return at!==null?null:xe(Q,W,oe,ve,null);if(typeof oe.then=="function")return ce(Q,W,Sc(oe),ve);if(oe.$$typeof===U)return ce(Q,W,_c(Q,oe),ve);Ec(Q,oe)}return null}function fe(Q,W,oe,ve,at){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return Q=Q.get(oe)||null,C(W,Q,""+ve,at);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case b:return Q=Q.get(ve.key===null?oe:ve.key)||null,G(W,Q,ve,at);case M:return Q=Q.get(ve.key===null?oe:ve.key)||null,le(W,Q,ve,at);case A:return ve=mr(ve),fe(Q,W,oe,ve,at)}if(V(ve)||q(ve))return Q=Q.get(oe)||null,xe(W,Q,ve,at,null);if(typeof ve.then=="function")return fe(Q,W,oe,Sc(ve),at);if(ve.$$typeof===U)return fe(Q,W,oe,_c(W,ve),at);Ec(W,ve)}return null}function Ke(Q,W,oe,ve){for(var at=null,$t=null,et=W,Et=W=0,Ft=null;et!==null&&Et<oe.length;Et++){et.index>Et?(Ft=et,et=null):Ft=et.sibling;var Kt=ce(Q,et,oe[Et],ve);if(Kt===null){et===null&&(et=Ft);break}t&&et&&Kt.alternate===null&&n(Q,et),W=d(Kt,W,Et),$t===null?at=Kt:$t.sibling=Kt,$t=Kt,et=Ft}if(Et===oe.length)return a(Q,et),Ht&&Xa(Q,Et),at;if(et===null){for(;Et<oe.length;Et++)et=be(Q,oe[Et],ve),et!==null&&(W=d(et,W,Et),$t===null?at=et:$t.sibling=et,$t=et);return Ht&&Xa(Q,Et),at}for(et=o(et);Et<oe.length;Et++)Ft=fe(et,Q,Et,oe[Et],ve),Ft!==null&&(t&&Ft.alternate!==null&&et.delete(Ft.key===null?Et:Ft.key),W=d(Ft,W,Et),$t===null?at=Ft:$t.sibling=Ft,$t=Ft);return t&&et.forEach(function(Gs){return n(Q,Gs)}),Ht&&Xa(Q,Et),at}function lt(Q,W,oe,ve){if(oe==null)throw Error(s(151));for(var at=null,$t=null,et=W,Et=W=0,Ft=null,Kt=oe.next();et!==null&&!Kt.done;Et++,Kt=oe.next()){et.index>Et?(Ft=et,et=null):Ft=et.sibling;var Gs=ce(Q,et,Kt.value,ve);if(Gs===null){et===null&&(et=Ft);break}t&&et&&Gs.alternate===null&&n(Q,et),W=d(Gs,W,Et),$t===null?at=Gs:$t.sibling=Gs,$t=Gs,et=Ft}if(Kt.done)return a(Q,et),Ht&&Xa(Q,Et),at;if(et===null){for(;!Kt.done;Et++,Kt=oe.next())Kt=be(Q,Kt.value,ve),Kt!==null&&(W=d(Kt,W,Et),$t===null?at=Kt:$t.sibling=Kt,$t=Kt);return Ht&&Xa(Q,Et),at}for(et=o(et);!Kt.done;Et++,Kt=oe.next())Kt=fe(et,Q,Et,Kt.value,ve),Kt!==null&&(t&&Kt.alternate!==null&&et.delete(Kt.key===null?Et:Kt.key),W=d(Kt,W,Et),$t===null?at=Kt:$t.sibling=Kt,$t=Kt);return t&&et.forEach(function(aS){return n(Q,aS)}),Ht&&Xa(Q,Et),at}function cn(Q,W,oe,ve){if(typeof oe=="object"&&oe!==null&&oe.type===R&&oe.key===null&&(oe=oe.props.children),typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case b:e:{for(var at=oe.key;W!==null;){if(W.key===at){if(at=oe.type,at===R){if(W.tag===7){a(Q,W.sibling),ve=u(W,oe.props.children),ve.return=Q,Q=ve;break e}}else if(W.elementType===at||typeof at=="object"&&at!==null&&at.$$typeof===A&&mr(at)===W.type){a(Q,W.sibling),ve=u(W,oe.props),ll(ve,oe),ve.return=Q,Q=ve;break e}a(Q,W);break}else n(Q,W);W=W.sibling}oe.type===R?(ve=ur(oe.props.children,Q.mode,ve,oe.key),ve.return=Q,Q=ve):(ve=mc(oe.type,oe.key,oe.props,null,Q.mode,ve),ll(ve,oe),ve.return=Q,Q=ve)}return y(Q);case M:e:{for(at=oe.key;W!==null;){if(W.key===at)if(W.tag===4&&W.stateNode.containerInfo===oe.containerInfo&&W.stateNode.implementation===oe.implementation){a(Q,W.sibling),ve=u(W,oe.children||[]),ve.return=Q,Q=ve;break e}else{a(Q,W);break}else n(Q,W);W=W.sibling}ve=wf(oe,Q.mode,ve),ve.return=Q,Q=ve}return y(Q);case A:return oe=mr(oe),cn(Q,W,oe,ve)}if(V(oe))return Ke(Q,W,oe,ve);if(q(oe)){if(at=q(oe),typeof at!="function")throw Error(s(150));return oe=at.call(oe),lt(Q,W,oe,ve)}if(typeof oe.then=="function")return cn(Q,W,Sc(oe),ve);if(oe.$$typeof===U)return cn(Q,W,_c(Q,oe),ve);Ec(Q,oe)}return typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint"?(oe=""+oe,W!==null&&W.tag===6?(a(Q,W.sibling),ve=u(W,oe),ve.return=Q,Q=ve):(a(Q,W),ve=Af(oe,Q.mode,ve),ve.return=Q,Q=ve),y(Q)):a(Q,W)}return function(Q,W,oe,ve){try{ol=0;var at=cn(Q,W,oe,ve);return ao=null,at}catch(et){if(et===io||et===bc)throw et;var $t=Ii(29,et,null,Q.mode);return $t.lanes=ve,$t.return=Q,$t}}}var xr=tg(!0),ng=tg(!1),Es=!1;function zf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Gf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ms(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ts(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(en&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=pc(t),zm(t,null,a),n}return hc(t,o,n,a),pc(t)}function cl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,$n(t,a)}}function Hf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var kf=!1;function ul(){if(kf){var t=no;if(t!==null)throw t}}function fl(t,n,a,o){kf=!1;var u=t.updateQueue;Es=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,C=u.shared.pending;if(C!==null){u.shared.pending=null;var G=C,le=G.next;G.next=null,y===null?d=le:y.next=le,y=G;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,C=xe.lastBaseUpdate,C!==y&&(C===null?xe.firstBaseUpdate=le:C.next=le,xe.lastBaseUpdate=G))}if(d!==null){var be=u.baseState;y=0,xe=le=G=null,C=d;do{var ce=C.lane&-536870913,fe=ce!==C.lane;if(fe?(Pt&ce)===ce:(o&ce)===ce){ce!==0&&ce===to&&(kf=!0),xe!==null&&(xe=xe.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});e:{var Ke=t,lt=C;ce=n;var cn=a;switch(lt.tag){case 1:if(Ke=lt.payload,typeof Ke=="function"){be=Ke.call(cn,be,ce);break e}be=Ke;break e;case 3:Ke.flags=Ke.flags&-65537|128;case 0:if(Ke=lt.payload,ce=typeof Ke=="function"?Ke.call(cn,be,ce):Ke,ce==null)break e;be=_({},be,ce);break e;case 2:Es=!0}}ce=C.callback,ce!==null&&(t.flags|=64,fe&&(t.flags|=8192),fe=u.callbacks,fe===null?u.callbacks=[ce]:fe.push(ce))}else fe={lane:ce,tag:C.tag,payload:C.payload,callback:C.callback,next:null},xe===null?(le=xe=fe,G=be):xe=xe.next=fe,y|=ce;if(C=C.next,C===null){if(C=u.shared.pending,C===null)break;fe=C,C=fe.next,fe.next=null,u.lastBaseUpdate=fe,u.shared.pending=null}}while(!0);xe===null&&(G=be),u.baseState=G,u.firstBaseUpdate=le,u.lastBaseUpdate=xe,d===null&&(u.shared.lanes=0),Ns|=y,t.lanes=y,t.memoizedState=be}}function ig(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function ag(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ig(a[t],n)}var so=P(null),Mc=P(0);function sg(t,n){t=ns,_e(Mc,t),_e(so,n),ns=t|n.baseLanes}function Vf(){_e(Mc,ns),_e(so,so.current)}function jf(){ns=Mc.current,Z(so),Z(Mc)}var Pi=P(null),Ji=null;function As(t){var n=t.alternate;_e(Dn,Dn.current&1),_e(Pi,t),Ji===null&&(n===null||so.current!==null||n.memoizedState!==null)&&(Ji=t)}function Xf(t){_e(Dn,Dn.current),_e(Pi,t),Ji===null&&(Ji=t)}function rg(t){t.tag===22?(_e(Dn,Dn.current),_e(Pi,t),Ji===null&&(Ji=t)):ws()}function ws(){_e(Dn,Dn.current),_e(Pi,Pi.current)}function Fi(t){Z(Pi),Ji===t&&(Ji=null),Z(Dn)}var Dn=P(0);function Tc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Zd(a)||Qd(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var qa=0,yt=null,on=null,zn=null,Ac=!1,ro=!1,_r=!1,wc=0,dl=0,oo=null,qb=0;function Rn(){throw Error(s(321))}function Yf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Ui(t[a],n[a]))return!1;return!0}function Wf(t,n,a,o,u,d){return qa=d,yt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,D.H=t===null||t.memoizedState===null?Vg:ld,_r=!1,d=a(o,u),_r=!1,ro&&(d=lg(n,a,o,u)),og(t),d}function og(t){D.H=ml;var n=on!==null&&on.next!==null;if(qa=0,zn=on=yt=null,Ac=!1,dl=0,oo=null,n)throw Error(s(300));t===null||Gn||(t=t.dependencies,t!==null&&xc(t)&&(Gn=!0))}function lg(t,n,a,o){yt=t;var u=0;do{if(ro&&(oo=null),dl=0,ro=!1,25<=u)throw Error(s(301));if(u+=1,zn=on=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}D.H=jg,d=n(a,o)}while(ro);return d}function $b(){var t=D.H,n=t.useState()[0];return n=typeof n.then=="function"?hl(n):n,t=t.useState()[0],(on!==null?on.memoizedState:null)!==t&&(yt.flags|=1024),n}function qf(){var t=wc!==0;return wc=0,t}function $f(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Kf(t){if(Ac){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Ac=!1}qa=0,zn=on=yt=null,ro=!1,dl=wc=0,oo=null}function gi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zn===null?yt.memoizedState=zn=t:zn=zn.next=t,zn}function Ln(){if(on===null){var t=yt.alternate;t=t!==null?t.memoizedState:null}else t=on.next;var n=zn===null?yt.memoizedState:zn.next;if(n!==null)zn=n,on=t;else{if(t===null)throw yt.alternate===null?Error(s(467)):Error(s(310));on=t,t={memoizedState:on.memoizedState,baseState:on.baseState,baseQueue:on.baseQueue,queue:on.queue,next:null},zn===null?yt.memoizedState=zn=t:zn=zn.next=t}return zn}function Rc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function hl(t){var n=dl;return dl+=1,oo===null&&(oo=[]),t=Qm(oo,t,n),n=yt,(zn===null?n.memoizedState:zn.next)===null&&(n=n.alternate,D.H=n===null||n.memoizedState===null?Vg:ld),t}function Cc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return hl(t);if(t.$$typeof===U)return ni(t)}throw Error(s(438,String(t)))}function Zf(t){var n=null,a=yt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=yt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Rc(),yt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=j;return n.index++,a}function $a(t,n){return typeof n=="function"?n(t):n}function Nc(t){var n=Ln();return Qf(n,on,t)}function Qf(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var C=y=null,G=null,le=n,xe=!1;do{var be=le.lane&-536870913;if(be!==le.lane?(Pt&be)===be:(qa&be)===be){var ce=le.revertLane;if(ce===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),be===to&&(xe=!0);else if((qa&ce)===ce){le=le.next,ce===to&&(xe=!0);continue}else be={lane:0,revertLane:le.revertLane,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},G===null?(C=G=be,y=d):G=G.next=be,yt.lanes|=ce,Ns|=ce;be=le.action,_r&&a(d,be),d=le.hasEagerState?le.eagerState:a(d,be)}else ce={lane:be,revertLane:le.revertLane,gesture:le.gesture,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},G===null?(C=G=ce,y=d):G=G.next=ce,yt.lanes|=be,Ns|=be;le=le.next}while(le!==null&&le!==n);if(G===null?y=d:G.next=C,!Ui(d,t.memoizedState)&&(Gn=!0,xe&&(a=no,a!==null)))throw a;t.memoizedState=d,t.baseState=y,t.baseQueue=G,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Jf(t){var n=Ln(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do d=t(d,y.action),y=y.next;while(y!==u);Ui(d,n.memoizedState)||(Gn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function cg(t,n,a){var o=yt,u=Ln(),d=Ht;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!Ui((on||u).memoizedState,a);if(y&&(u.memoizedState=a,Gn=!0),u=u.queue,nd(dg.bind(null,o,u,t),[t]),u.getSnapshot!==n||y||zn!==null&&zn.memoizedState.tag&1){if(o.flags|=2048,lo(9,{destroy:void 0},fg.bind(null,o,u,a,n),null),hn===null)throw Error(s(349));d||(qa&127)!==0||ug(o,n,a)}return a}function ug(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=yt.updateQueue,n===null?(n=Rc(),yt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function fg(t,n,a,o){n.value=a,n.getSnapshot=o,hg(n)&&pg(t)}function dg(t,n,a){return a(function(){hg(n)&&pg(t)})}function hg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Ui(t,a)}catch{return!0}}function pg(t){var n=cr(t,2);n!==null&&Ai(n,t,2)}function ed(t){var n=gi();if(typeof t=="function"){var a=t;if(t=a(),_r){Le(!0);try{a()}finally{Le(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:t},n}function mg(t,n,a,o){return t.baseState=a,Qf(t,on,typeof o=="function"?o:$a)}function Kb(t,n,a,o,u){if(Lc(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};D.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,gg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function gg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=D.T,y={};D.T=y;try{var C=a(u,o),G=D.S;G!==null&&G(y,C),xg(t,n,C)}catch(le){td(t,n,le)}finally{d!==null&&y.types!==null&&(d.types=y.types),D.T=d}}else try{d=a(u,o),xg(t,n,d)}catch(le){td(t,n,le)}}function xg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){_g(t,n,o)},function(o){return td(t,n,o)}):_g(t,n,a)}function _g(t,n,a){n.status="fulfilled",n.value=a,vg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,gg(t,a)))}function td(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,vg(n),n=n.next;while(n!==o)}t.action=null}function vg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function bg(t,n){return n}function yg(t,n){if(Ht){var a=hn.formState;if(a!==null){e:{var o=yt;if(Ht){if(vn){t:{for(var u=vn,d=Qi;u.nodeType!==8;){if(!d){u=null;break t}if(u=ea(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){vn=ea(u.nextSibling),o=u.data==="F!";break e}}ys(o)}o=!1}o&&(n=a[0])}}return a=gi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:bg,lastRenderedState:n},a.queue=o,a=Gg.bind(null,yt,o),o.dispatch=a,o=ed(!1),d=od.bind(null,yt,!1,o.queue),o=gi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Kb.bind(null,yt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Sg(t){var n=Ln();return Eg(n,on,t)}function Eg(t,n,a){if(n=Qf(t,n,bg)[0],t=Nc($a)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=hl(n)}catch(y){throw y===io?bc:y}else o=n;n=Ln();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(yt.flags|=2048,lo(9,{destroy:void 0},Zb.bind(null,u,a),null)),[o,d,t]}function Zb(t,n){t.action=n}function Mg(t){var n=Ln(),a=on;if(a!==null)return Eg(n,a,t);Ln(),n=n.memoizedState,a=Ln();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function lo(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=yt.updateQueue,n===null&&(n=Rc(),yt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Tg(){return Ln().memoizedState}function Oc(t,n,a,o){var u=gi();yt.flags|=t,u.memoizedState=lo(1|n,{destroy:void 0},a,o===void 0?null:o)}function Dc(t,n,a,o){var u=Ln();o=o===void 0?null:o;var d=u.memoizedState.inst;on!==null&&o!==null&&Yf(o,on.memoizedState.deps)?u.memoizedState=lo(n,d,a,o):(yt.flags|=t,u.memoizedState=lo(1|n,d,a,o))}function Ag(t,n){Oc(8390656,8,t,n)}function nd(t,n){Dc(2048,8,t,n)}function Qb(t){yt.flags|=4;var n=yt.updateQueue;if(n===null)n=Rc(),yt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function wg(t){var n=Ln().memoizedState;return Qb({ref:n,nextImpl:t}),function(){if((en&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Rg(t,n){return Dc(4,2,t,n)}function Cg(t,n){return Dc(4,4,t,n)}function Ng(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Og(t,n,a){a=a!=null?a.concat([t]):null,Dc(4,4,Ng.bind(null,n,t),a)}function id(){}function Dg(t,n){var a=Ln();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Yf(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Lg(t,n){var a=Ln();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Yf(n,o[1]))return o[0];if(o=t(),_r){Le(!0);try{t()}finally{Le(!1)}}return a.memoizedState=[o,n],o}function ad(t,n,a){return a===void 0||(qa&1073741824)!==0&&(Pt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=U0(),yt.lanes|=t,Ns|=t,a)}function Ug(t,n,a,o){return Ui(a,n)?a:so.current!==null?(t=ad(t,a,o),Ui(t,n)||(Gn=!0),t):(qa&42)===0||(qa&1073741824)!==0&&(Pt&261930)===0?(Gn=!0,t.memoizedState=a):(t=U0(),yt.lanes|=t,Ns|=t,n)}function Ig(t,n,a,o,u){var d=z.p;z.p=d!==0&&8>d?d:8;var y=D.T,C={};D.T=C,od(t,!1,n,a);try{var G=u(),le=D.S;if(le!==null&&le(C,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var xe=Wb(G,o);pl(t,n,xe,Gi(t))}else pl(t,n,o,Gi(t))}catch(be){pl(t,n,{then:function(){},status:"rejected",reason:be},Gi())}finally{z.p=d,y!==null&&C.types!==null&&(y.types=C.types),D.T=y}}function Jb(){}function sd(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=Pg(t).queue;Ig(t,u,n,K,a===null?Jb:function(){return Fg(t),a(o)})}function Pg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Fg(t){var n=Pg(t);n.next===null&&(n=t.alternate.memoizedState),pl(t,n.next.queue,{},Gi())}function rd(){return ni(Ol)}function Bg(){return Ln().memoizedState}function zg(){return Ln().memoizedState}function ey(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=Gi();t=Ms(a);var o=Ts(n,t,a);o!==null&&(Ai(o,n,a),cl(o,n,a)),n={cache:If()},t.payload=n;return}n=n.return}}function ty(t,n,a){var o=Gi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Lc(t)?Hg(n,a):(a=Mf(t,n,a,o),a!==null&&(Ai(a,t,o),kg(a,n,o)))}function Gg(t,n,a){var o=Gi();pl(t,n,a,o)}function pl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Lc(t))Hg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var y=n.lastRenderedState,C=d(y,a);if(u.hasEagerState=!0,u.eagerState=C,Ui(C,y))return hc(t,n,u,0),hn===null&&dc(),!1}catch{}if(a=Mf(t,n,u,o),a!==null)return Ai(a,t,o),kg(a,n,o),!0}return!1}function od(t,n,a,o){if(o={lane:2,revertLane:zd(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Lc(t)){if(n)throw Error(s(479))}else n=Mf(t,a,o,2),n!==null&&Ai(n,t,2)}function Lc(t){var n=t.alternate;return t===yt||n!==null&&n===yt}function Hg(t,n){ro=Ac=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function kg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,$n(t,a)}}var ml={readContext:ni,use:Cc,useCallback:Rn,useContext:Rn,useEffect:Rn,useImperativeHandle:Rn,useLayoutEffect:Rn,useInsertionEffect:Rn,useMemo:Rn,useReducer:Rn,useRef:Rn,useState:Rn,useDebugValue:Rn,useDeferredValue:Rn,useTransition:Rn,useSyncExternalStore:Rn,useId:Rn,useHostTransitionStatus:Rn,useFormState:Rn,useActionState:Rn,useOptimistic:Rn,useMemoCache:Rn,useCacheRefresh:Rn};ml.useEffectEvent=Rn;var Vg={readContext:ni,use:Cc,useCallback:function(t,n){return gi().memoizedState=[t,n===void 0?null:n],t},useContext:ni,useEffect:Ag,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Oc(4194308,4,Ng.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Oc(4194308,4,t,n)},useInsertionEffect:function(t,n){Oc(4,2,t,n)},useMemo:function(t,n){var a=gi();n=n===void 0?null:n;var o=t();if(_r){Le(!0);try{t()}finally{Le(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=gi();if(a!==void 0){var u=a(n);if(_r){Le(!0);try{a(n)}finally{Le(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=ty.bind(null,yt,t),[o.memoizedState,t]},useRef:function(t){var n=gi();return t={current:t},n.memoizedState=t},useState:function(t){t=ed(t);var n=t.queue,a=Gg.bind(null,yt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:id,useDeferredValue:function(t,n){var a=gi();return ad(a,t,n)},useTransition:function(){var t=ed(!1);return t=Ig.bind(null,yt,t.queue,!0,!1),gi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=yt,u=gi();if(Ht){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),hn===null)throw Error(s(349));(Pt&127)!==0||ug(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Ag(dg.bind(null,o,d,t),[t]),o.flags|=2048,lo(9,{destroy:void 0},fg.bind(null,o,d,a,n),null),a},useId:function(){var t=gi(),n=hn.identifierPrefix;if(Ht){var a=ba,o=va;a=(o&~(1<<32-Be(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=wc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=qb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:rd,useFormState:yg,useActionState:yg,useOptimistic:function(t){var n=gi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=od.bind(null,yt,!0,a),a.dispatch=n,[t,n]},useMemoCache:Zf,useCacheRefresh:function(){return gi().memoizedState=ey.bind(null,yt)},useEffectEvent:function(t){var n=gi(),a={impl:t};return n.memoizedState=a,function(){if((en&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},ld={readContext:ni,use:Cc,useCallback:Dg,useContext:ni,useEffect:nd,useImperativeHandle:Og,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Lg,useReducer:Nc,useRef:Tg,useState:function(){return Nc($a)},useDebugValue:id,useDeferredValue:function(t,n){var a=Ln();return Ug(a,on.memoizedState,t,n)},useTransition:function(){var t=Nc($a)[0],n=Ln().memoizedState;return[typeof t=="boolean"?t:hl(t),n]},useSyncExternalStore:cg,useId:Bg,useHostTransitionStatus:rd,useFormState:Sg,useActionState:Sg,useOptimistic:function(t,n){var a=Ln();return mg(a,on,t,n)},useMemoCache:Zf,useCacheRefresh:zg};ld.useEffectEvent=wg;var jg={readContext:ni,use:Cc,useCallback:Dg,useContext:ni,useEffect:nd,useImperativeHandle:Og,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Lg,useReducer:Jf,useRef:Tg,useState:function(){return Jf($a)},useDebugValue:id,useDeferredValue:function(t,n){var a=Ln();return on===null?ad(a,t,n):Ug(a,on.memoizedState,t,n)},useTransition:function(){var t=Jf($a)[0],n=Ln().memoizedState;return[typeof t=="boolean"?t:hl(t),n]},useSyncExternalStore:cg,useId:Bg,useHostTransitionStatus:rd,useFormState:Mg,useActionState:Mg,useOptimistic:function(t,n){var a=Ln();return on!==null?mg(a,on,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Zf,useCacheRefresh:zg};jg.useEffectEvent=wg;function cd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var ud={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=Gi(),u=Ms(o);u.payload=n,a!=null&&(u.callback=a),n=Ts(t,u,o),n!==null&&(Ai(n,t,o),cl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=Gi(),u=Ms(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ts(t,u,o),n!==null&&(Ai(n,t,o),cl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=Gi(),o=Ms(a);o.tag=2,n!=null&&(o.callback=n),n=Ts(t,o,a),n!==null&&(Ai(n,t,a),cl(n,t,a))}};function Xg(t,n,a,o,u,d,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,y):n.prototype&&n.prototype.isPureReactComponent?!tl(a,o)||!tl(u,d):!0}function Yg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&ud.enqueueReplaceState(n,n.state,null)}function vr(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Wg(t){fc(t)}function qg(t){console.error(t)}function $g(t){fc(t)}function Uc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Kg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function fd(t,n,a){return a=Ms(a),a.tag=3,a.payload={element:null},a.callback=function(){Uc(t,n)},a}function Zg(t){return t=Ms(t),t.tag=3,t}function Qg(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){Kg(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){Kg(n,a,o),typeof u!="function"&&(Os===null?Os=new Set([this]):Os.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})})}function ny(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&eo(n,a,u,!0),a=Pi.current,a!==null){switch(a.tag){case 31:case 13:return Ji===null?Yc():a.alternate===null&&Cn===0&&(Cn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===yc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Pd(t,o,u)),!1;case 22:return a.flags|=65536,o===yc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Pd(t,o,u)),!1}throw Error(s(435,a.tag))}return Pd(t,o,u),Yc(),!1}if(Ht)return n=Pi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Nf&&(t=Error(s(422),{cause:o}),al($i(t,a)))):(o!==Nf&&(n=Error(s(423),{cause:o}),al($i(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=$i(o,a),u=fd(t.stateNode,o,u),Hf(t,u),Cn!==4&&(Cn=2)),!1;var d=Error(s(520),{cause:o});if(d=$i(d,a),El===null?El=[d]:El.push(d),Cn!==4&&(Cn=2),n===null)return!0;o=$i(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=fd(a.stateNode,o,t),Hf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Os===null||!Os.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Zg(u),Qg(u,t,a,o),Hf(a,u),!1}a=a.return}while(a!==null);return!1}var dd=Error(s(461)),Gn=!1;function ii(t,n,a,o){n.child=t===null?ng(n,null,a,o):xr(n,t.child,a,o)}function Jg(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var y={};for(var C in o)C!=="ref"&&(y[C]=o[C])}else y=o;return hr(n),o=Wf(t,n,a,y,d,u),C=qf(),t!==null&&!Gn?($f(t,n,u),Ka(t,n,u)):(Ht&&C&&Rf(n),n.flags|=1,ii(t,n,o,u),n.child)}function e0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!Tf(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,t0(t,n,d,o,u)):(t=mc(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!bd(t,u)){var y=d.memoizedProps;if(a=a.compare,a=a!==null?a:tl,a(y,o)&&t.ref===n.ref)return Ka(t,n,u)}return n.flags|=1,t=ja(d,o),t.ref=n.ref,t.return=n,n.child=t}function t0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(tl(d,o)&&t.ref===n.ref)if(Gn=!1,n.pendingProps=o=d,bd(t,u))(t.flags&131072)!==0&&(Gn=!0);else return n.lanes=t.lanes,Ka(t,n,u)}return hd(t,n,a,o,u)}function n0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return i0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&vc(n,d!==null?d.cachePool:null),d!==null?sg(n,d):Vf(),rg(n);else return o=n.lanes=536870912,i0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(vc(n,d.cachePool),sg(n,d),ws(),n.memoizedState=null):(t!==null&&vc(n,null),Vf(),ws());return ii(t,n,u,a),n.child}function gl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function i0(t,n,a,o,u){var d=Ff();return d=d===null?null:{parent:Bn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&vc(n,null),Vf(),rg(n),t!==null&&eo(t,n,o,!0),n.childLanes=u,null}function Ic(t,n){return n=Fc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function a0(t,n,a){return xr(n,t.child,null,a),t=Ic(n,n.pendingProps),t.flags|=2,Fi(n),n.memoizedState=null,t}function iy(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ht){if(o.mode==="hidden")return t=Ic(n,o),n.lanes=536870912,gl(null,t);if(Xf(n),(t=vn)?(t=gx(t,Qi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:vs!==null?{id:va,overflow:ba}:null,retryLane:536870912,hydrationErrors:null},a=Hm(t),a.return=n,n.child=a,ti=n,vn=null)):t=null,t===null)throw ys(n);return n.lanes=536870912,null}return Ic(n,o)}var d=t.memoizedState;if(d!==null){var y=d.dehydrated;if(Xf(n),u)if(n.flags&256)n.flags&=-257,n=a0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Gn||eo(t,n,a,!1),u=(a&t.childLanes)!==0,Gn||u){if(o=hn,o!==null&&(y=ri(o,a),y!==0&&y!==d.retryLane))throw d.retryLane=y,cr(t,y),Ai(o,t,y),dd;Yc(),n=a0(t,n,a)}else t=d.treeContext,vn=ea(y.nextSibling),ti=n,Ht=!0,bs=null,Qi=!1,t!==null&&jm(n,t),n=Ic(n,o),n.flags|=4096;return n}return t=ja(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Pc(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function hd(t,n,a,o,u){return hr(n),a=Wf(t,n,a,o,void 0,u),o=qf(),t!==null&&!Gn?($f(t,n,u),Ka(t,n,u)):(Ht&&o&&Rf(n),n.flags|=1,ii(t,n,a,u),n.child)}function s0(t,n,a,o,u,d){return hr(n),n.updateQueue=null,a=lg(n,o,a,u),og(t),o=qf(),t!==null&&!Gn?($f(t,n,d),Ka(t,n,d)):(Ht&&o&&Rf(n),n.flags|=1,ii(t,n,a,d),n.child)}function r0(t,n,a,o,u){if(hr(n),n.stateNode===null){var d=Kr,y=a.contextType;typeof y=="object"&&y!==null&&(d=ni(y)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=ud,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},zf(n),y=a.contextType,d.context=typeof y=="object"&&y!==null?ni(y):Kr,d.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(cd(n,a,y,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&ud.enqueueReplaceState(d,d.state,null),fl(n,o,d,u),ul(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var C=n.memoizedProps,G=vr(a,C);d.props=G;var le=d.context,xe=a.contextType;y=Kr,typeof xe=="object"&&xe!==null&&(y=ni(xe));var be=a.getDerivedStateFromProps;xe=typeof be=="function"||typeof d.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,xe||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(C||le!==y)&&Yg(n,d,o,y),Es=!1;var ce=n.memoizedState;d.state=ce,fl(n,o,d,u),ul(),le=n.memoizedState,C||ce!==le||Es?(typeof be=="function"&&(cd(n,a,be,o),le=n.memoizedState),(G=Es||Xg(n,a,G,o,ce,le,y))?(xe||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=le),d.props=o,d.state=le,d.context=y,o=G):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,Gf(t,n),y=n.memoizedProps,xe=vr(a,y),d.props=xe,be=n.pendingProps,ce=d.context,le=a.contextType,G=Kr,typeof le=="object"&&le!==null&&(G=ni(le)),C=a.getDerivedStateFromProps,(le=typeof C=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==be||ce!==G)&&Yg(n,d,o,G),Es=!1,ce=n.memoizedState,d.state=ce,fl(n,o,d,u),ul();var fe=n.memoizedState;y!==be||ce!==fe||Es||t!==null&&t.dependencies!==null&&xc(t.dependencies)?(typeof C=="function"&&(cd(n,a,C,o),fe=n.memoizedState),(xe=Es||Xg(n,a,xe,o,ce,fe,G)||t!==null&&t.dependencies!==null&&xc(t.dependencies))?(le||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,fe,G),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,fe,G)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=fe),d.props=o,d.state=fe,d.context=G,o=xe):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Pc(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=xr(n,t.child,null,u),n.child=xr(n,null,a,u)):ii(t,n,a,u),n.memoizedState=d.state,t=n.child):t=Ka(t,n,u),t}function o0(t,n,a,o){return fr(),n.flags|=256,ii(t,n,a,o),n.child}var pd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function md(t){return{baseLanes:t,cachePool:Km()}}function gd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=zi),t}function l0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,y;if((y=d)||(y=t!==null&&t.memoizedState===null?!1:(Dn.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ht){if(u?As(n):ws(),(t=vn)?(t=gx(t,Qi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:vs!==null?{id:va,overflow:ba}:null,retryLane:536870912,hydrationErrors:null},a=Hm(t),a.return=n,n.child=a,ti=n,vn=null)):t=null,t===null)throw ys(n);return Qd(t)?n.lanes=32:n.lanes=536870912,null}var C=o.children;return o=o.fallback,u?(ws(),u=n.mode,C=Fc({mode:"hidden",children:C},u),o=ur(o,u,a,null),C.return=n,o.return=n,C.sibling=o,n.child=C,o=n.child,o.memoizedState=md(a),o.childLanes=gd(t,y,a),n.memoizedState=pd,gl(null,o)):(As(n),xd(n,C))}var G=t.memoizedState;if(G!==null&&(C=G.dehydrated,C!==null)){if(d)n.flags&256?(As(n),n.flags&=-257,n=_d(t,n,a)):n.memoizedState!==null?(ws(),n.child=t.child,n.flags|=128,n=null):(ws(),C=o.fallback,u=n.mode,o=Fc({mode:"visible",children:o.children},u),C=ur(C,u,a,null),C.flags|=2,o.return=n,C.return=n,o.sibling=C,n.child=o,xr(n,t.child,null,a),o=n.child,o.memoizedState=md(a),o.childLanes=gd(t,y,a),n.memoizedState=pd,n=gl(null,o));else if(As(n),Qd(C)){if(y=C.nextSibling&&C.nextSibling.dataset,y)var le=y.dgst;y=le,o=Error(s(419)),o.stack="",o.digest=y,al({value:o,source:null,stack:null}),n=_d(t,n,a)}else if(Gn||eo(t,n,a,!1),y=(a&t.childLanes)!==0,Gn||y){if(y=hn,y!==null&&(o=ri(y,a),o!==0&&o!==G.retryLane))throw G.retryLane=o,cr(t,o),Ai(y,t,o),dd;Zd(C)||Yc(),n=_d(t,n,a)}else Zd(C)?(n.flags|=192,n.child=t.child,n=null):(t=G.treeContext,vn=ea(C.nextSibling),ti=n,Ht=!0,bs=null,Qi=!1,t!==null&&jm(n,t),n=xd(n,o.children),n.flags|=4096);return n}return u?(ws(),C=o.fallback,u=n.mode,G=t.child,le=G.sibling,o=ja(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,le!==null?C=ja(le,C):(C=ur(C,u,a,null),C.flags|=2),C.return=n,o.return=n,o.sibling=C,n.child=o,gl(null,o),o=n.child,C=t.child.memoizedState,C===null?C=md(a):(u=C.cachePool,u!==null?(G=Bn._currentValue,u=u.parent!==G?{parent:G,pool:G}:u):u=Km(),C={baseLanes:C.baseLanes|a,cachePool:u}),o.memoizedState=C,o.childLanes=gd(t,y,a),n.memoizedState=pd,gl(t.child,o)):(As(n),a=t.child,t=a.sibling,a=ja(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function xd(t,n){return n=Fc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Fc(t,n){return t=Ii(22,t,null,n),t.lanes=0,t}function _d(t,n,a){return xr(n,t.child,null,a),t=xd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function c0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Lf(t.return,n,a)}function vd(t,n,a,o,u,d){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=d)}function u0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=Dn.current,C=(y&2)!==0;if(C?(y=y&1|2,n.flags|=128):y&=1,_e(Dn,y),ii(t,n,o,a),o=Ht?il:0,!C&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&c0(t,a,n);else if(t.tag===19)c0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Tc(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),vd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Tc(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}vd(n,!0,a,null,d,o);break;case"together":vd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ka(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(eo(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=ja(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=ja(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function bd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&xc(t)))}function ay(t,n,a){switch(n.tag){case 3:ye(n,n.stateNode.containerInfo),Ss(n,Bn,t.memoizedState.cache),fr();break;case 27:case 5:We(n);break;case 4:ye(n,n.stateNode.containerInfo);break;case 10:Ss(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Xf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(As(n),n.flags|=128,null):(a&n.child.childLanes)!==0?l0(t,n,a):(As(n),t=Ka(t,n,a),t!==null?t.sibling:null);As(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(eo(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return u0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),_e(Dn,Dn.current),o)break;return null;case 22:return n.lanes=0,n0(t,n,a,n.pendingProps);case 24:Ss(n,Bn,t.memoizedState.cache)}return Ka(t,n,a)}function f0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Gn=!0;else{if(!bd(t,a)&&(n.flags&128)===0)return Gn=!1,ay(t,n,a);Gn=(t.flags&131072)!==0}else Gn=!1,Ht&&(n.flags&1048576)!==0&&Vm(n,il,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=mr(n.elementType),n.type=t,typeof t=="function")Tf(t)?(o=vr(t,o),n.tag=1,n=r0(null,n,t,o,a)):(n.tag=0,n=hd(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===I){n.tag=11,n=Jg(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=e0(null,n,t,o,a);break e}}throw n=ee(t)||t,Error(s(306,n,""))}}return n;case 0:return hd(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=vr(o,n.pendingProps),r0(t,n,o,u,a);case 3:e:{if(ye(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,Gf(t,n),fl(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Ss(n,Bn,o),o!==d.cache&&Uf(n,[Bn],a,!0),ul(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=o0(t,n,o,a);break e}else if(o!==u){u=$i(Error(s(424)),n),al(u),n=o0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,vn=ea(t.firstChild),ti=n,Ht=!0,bs=null,Qi=!0,a=ng(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(fr(),o===u){n=Ka(t,n,a);break e}ii(t,n,o,a)}n=n.child}return n;case 26:return Pc(t,n),t===null?(a=Sx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ht||(a=n.type,t=n.pendingProps,o=Jc(te.current).createElement(a),o[_n]=n,o[Tn]=t,ai(o,a,t),An(o),n.stateNode=o):n.memoizedState=Sx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return We(n),t===null&&Ht&&(o=n.stateNode=vx(n.type,n.pendingProps,te.current),ti=n,Qi=!0,u=vn,Is(n.type)?(Jd=u,vn=ea(o.firstChild)):vn=u),ii(t,n,n.pendingProps.children,a),Pc(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ht&&((u=o=vn)&&(o=Uy(o,n.type,n.pendingProps,Qi),o!==null?(n.stateNode=o,ti=n,vn=ea(o.firstChild),Qi=!1,u=!0):u=!1),u||ys(n)),We(n),u=n.type,d=n.pendingProps,y=t!==null?t.memoizedProps:null,o=d.children,qd(u,d)?o=null:y!==null&&qd(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=Wf(t,n,$b,null,null,a),Ol._currentValue=u),Pc(t,n),ii(t,n,o,a),n.child;case 6:return t===null&&Ht&&((t=a=vn)&&(a=Iy(a,n.pendingProps,Qi),a!==null?(n.stateNode=a,ti=n,vn=null,t=!0):t=!1),t||ys(n)),null;case 13:return l0(t,n,a);case 4:return ye(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=xr(n,null,o,a):ii(t,n,o,a),n.child;case 11:return Jg(t,n,n.type,n.pendingProps,a);case 7:return ii(t,n,n.pendingProps,a),n.child;case 8:return ii(t,n,n.pendingProps.children,a),n.child;case 12:return ii(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ss(n,n.type,o.value),ii(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,hr(n),u=ni(u),o=o(u),n.flags|=1,ii(t,n,o,a),n.child;case 14:return e0(t,n,n.type,n.pendingProps,a);case 15:return t0(t,n,n.type,n.pendingProps,a);case 19:return u0(t,n,a);case 31:return iy(t,n,a);case 22:return n0(t,n,a,n.pendingProps);case 24:return hr(n),o=ni(Bn),t===null?(u=Ff(),u===null&&(u=hn,d=If(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},zf(n),Ss(n,Bn,u)):((t.lanes&a)!==0&&(Gf(t,n),fl(n,null,null,a),ul()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ss(n,Bn,o)):(o=d.cache,Ss(n,Bn,o),o!==u.cache&&Uf(n,[Bn],a,!0))),ii(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Za(t){t.flags|=4}function yd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(B0())t.flags|=8192;else throw gr=yc,Bf}else t.flags&=-16777217}function d0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!wx(n))if(B0())t.flags|=8192;else throw gr=yc,Bf}function Bc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Te():536870912,t.lanes|=n,ho|=n)}function xl(t,n){if(!Ht)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function bn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function sy(t,n,a){var o=n.pendingProps;switch(Cf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bn(n),null;case 1:return bn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Wa(Bn),Ge(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Jr(n)?Za(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Of())),bn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(Za(n),d!==null?(bn(n),d0(n,d)):(bn(n),yd(n,u,null,o,a))):d?d!==t.memoizedState?(Za(n),bn(n),d0(n,d)):(bn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Za(n),bn(n),yd(n,u,t,o,a)),null;case 27:if(Qe(n),a=te.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Za(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}t=Ae.current,Jr(n)?Xm(n):(t=vx(u,o,a),n.stateNode=t,Za(n))}return bn(n),null;case 5:if(Qe(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Za(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}if(d=Ae.current,Jr(n))Xm(n);else{var y=Jc(te.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[_n]=n,d[Tn]=o;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=d;e:switch(ai(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Za(n)}}return bn(n),yd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Za(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=te.current,Jr(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=ti,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[_n]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||lx(t.nodeValue,a)),t||ys(n,!0)}else t=Jc(t).createTextNode(o),t[_n]=n,n.stateNode=t}return bn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Jr(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[_n]=n}else fr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),t=!1}else a=Of(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Fi(n),n):(Fi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return bn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Jr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[_n]=n}else fr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),u=!1}else u=Of(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Fi(n),n):(Fi(n),null)}return Fi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Bc(n,n.updateQueue),bn(n),null);case 4:return Ge(),t===null&&Vd(n.stateNode.containerInfo),bn(n),null;case 10:return Wa(n.type),bn(n),null;case 19:if(Z(Dn),o=n.memoizedState,o===null)return bn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)xl(o,!1);else{if(Cn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=Tc(t),d!==null){for(n.flags|=128,xl(o,!1),t=d.updateQueue,n.updateQueue=t,Bc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Gm(a,t),a=a.sibling;return _e(Dn,Dn.current&1|2),Ht&&Xa(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ce()>Vc&&(n.flags|=128,u=!0,xl(o,!1),n.lanes=4194304)}else{if(!u)if(t=Tc(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Bc(n,t),xl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ht)return bn(n),null}else 2*Ce()-o.renderingStartTime>Vc&&a!==536870912&&(n.flags|=128,u=!0,xl(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ce(),t.sibling=null,a=Dn.current,_e(Dn,u?a&1|2:a&1),Ht&&Xa(n,o.treeForkCount),t):(bn(n),null);case 22:case 23:return Fi(n),jf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(bn(n),n.subtreeFlags&6&&(n.flags|=8192)):bn(n),a=n.updateQueue,a!==null&&Bc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Z(pr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Wa(Bn),bn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function ry(t,n){switch(Cf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Wa(Bn),Ge(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Qe(n),null;case 31:if(n.memoizedState!==null){if(Fi(n),n.alternate===null)throw Error(s(340));fr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Fi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));fr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Z(Dn),null;case 4:return Ge(),null;case 10:return Wa(n.type),null;case 22:case 23:return Fi(n),jf(),t!==null&&Z(pr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Wa(Bn),null;case 25:return null;default:return null}}function h0(t,n){switch(Cf(n),n.tag){case 3:Wa(Bn),Ge();break;case 26:case 27:case 5:Qe(n);break;case 4:Ge();break;case 31:n.memoizedState!==null&&Fi(n);break;case 13:Fi(n);break;case 19:Z(Dn);break;case 10:Wa(n.type);break;case 22:case 23:Fi(n),jf(),t!==null&&Z(pr);break;case 24:Wa(Bn)}}function _l(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,y=a.inst;o=d(),y.destroy=o}a=a.next}while(a!==u)}}catch(C){sn(n,n.return,C)}}function Rs(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var y=o.inst,C=y.destroy;if(C!==void 0){y.destroy=void 0,u=n;var G=a,le=C;try{le()}catch(xe){sn(u,G,xe)}}}o=o.next}while(o!==d)}}catch(xe){sn(n,n.return,xe)}}function p0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{ag(n,a)}catch(o){sn(t,t.return,o)}}}function m0(t,n,a){a.props=vr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){sn(t,n,o)}}function vl(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){sn(t,n,u)}}function ya(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){sn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){sn(t,n,u)}else a.current=null}function g0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){sn(t,t.return,u)}}function Sd(t,n,a){try{var o=t.stateNode;Ry(o,t.type,a,n),o[Tn]=n}catch(u){sn(t,t.return,u)}}function x0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Is(t.type)||t.tag===4}function Ed(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||x0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Is(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Md(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Wi));else if(o!==4&&(o===27&&Is(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Md(t,n,a),t=t.sibling;t!==null;)Md(t,n,a),t=t.sibling}function zc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Is(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(zc(t,n,a),t=t.sibling;t!==null;)zc(t,n,a),t=t.sibling}function _0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);ai(n,o,a),n[_n]=t,n[Tn]=a}catch(d){sn(t,t.return,d)}}var Qa=!1,Hn=!1,Td=!1,v0=typeof WeakSet=="function"?WeakSet:Set,Kn=null;function oy(t,n){if(t=t.containerInfo,Yd=ru,t=Om(t),_f(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var y=0,C=-1,G=-1,le=0,xe=0,be=t,ce=null;t:for(;;){for(var fe;be!==a||u!==0&&be.nodeType!==3||(C=y+u),be!==d||o!==0&&be.nodeType!==3||(G=y+o),be.nodeType===3&&(y+=be.nodeValue.length),(fe=be.firstChild)!==null;)ce=be,be=fe;for(;;){if(be===t)break t;if(ce===a&&++le===u&&(C=y),ce===d&&++xe===o&&(G=y),(fe=be.nextSibling)!==null)break;be=ce,ce=be.parentNode}be=fe}a=C===-1||G===-1?null:{start:C,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(Wd={focusedElem:t,selectionRange:a},ru=!1,Kn=n;Kn!==null;)if(n=Kn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Kn=t;else for(;Kn!==null;){switch(n=Kn,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var Ke=vr(a.type,u);t=o.getSnapshotBeforeUpdate(Ke,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(lt){sn(a,a.return,lt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Kd(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Kd(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Kn=t;break}Kn=n.return}}function b0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:es(t,a),o&4&&_l(5,a);break;case 1:if(es(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){sn(a,a.return,y)}else{var u=vr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){sn(a,a.return,y)}}o&64&&p0(a),o&512&&vl(a,a.return);break;case 3:if(es(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ag(t,n)}catch(y){sn(a,a.return,y)}}break;case 27:n===null&&o&4&&_0(a);case 26:case 5:es(t,a),n===null&&o&4&&g0(a),o&512&&vl(a,a.return);break;case 12:es(t,a);break;case 31:es(t,a),o&4&&E0(t,a);break;case 13:es(t,a),o&4&&M0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=gy.bind(null,a),Py(t,a))));break;case 22:if(o=a.memoizedState!==null||Qa,!o){n=n!==null&&n.memoizedState!==null||Hn,u=Qa;var d=Hn;Qa=o,(Hn=n)&&!d?ts(t,a,(a.subtreeFlags&8772)!==0):es(t,a),Qa=u,Hn=d}break;case 30:break;default:es(t,a)}}function y0(t){var n=t.alternate;n!==null&&(t.alternate=null,y0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Pr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Sn=null,Si=!1;function Ja(t,n,a){for(a=a.child;a!==null;)S0(t,n,a),a=a.sibling}function S0(t,n,a){if(pe&&typeof pe.onCommitFiberUnmount=="function")try{pe.onCommitFiberUnmount(de,a)}catch{}switch(a.tag){case 26:Hn||ya(a,n),Ja(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Hn||ya(a,n);var o=Sn,u=Si;Is(a.type)&&(Sn=a.stateNode,Si=!1),Ja(t,n,a),Rl(a.stateNode),Sn=o,Si=u;break;case 5:Hn||ya(a,n);case 6:if(o=Sn,u=Si,Sn=null,Ja(t,n,a),Sn=o,Si=u,Sn!==null)if(Si)try{(Sn.nodeType===9?Sn.body:Sn.nodeName==="HTML"?Sn.ownerDocument.body:Sn).removeChild(a.stateNode)}catch(d){sn(a,n,d)}else try{Sn.removeChild(a.stateNode)}catch(d){sn(a,n,d)}break;case 18:Sn!==null&&(Si?(t=Sn,px(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),yo(t)):px(Sn,a.stateNode));break;case 4:o=Sn,u=Si,Sn=a.stateNode.containerInfo,Si=!0,Ja(t,n,a),Sn=o,Si=u;break;case 0:case 11:case 14:case 15:Rs(2,a,n),Hn||Rs(4,a,n),Ja(t,n,a);break;case 1:Hn||(ya(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&m0(a,n,o)),Ja(t,n,a);break;case 21:Ja(t,n,a);break;case 22:Hn=(o=Hn)||a.memoizedState!==null,Ja(t,n,a),Hn=o;break;default:Ja(t,n,a)}}function E0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{yo(t)}catch(a){sn(n,n.return,a)}}}function M0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{yo(t)}catch(a){sn(n,n.return,a)}}function ly(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new v0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new v0),n;default:throw Error(s(435,t.tag))}}function Gc(t,n){var a=ly(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=xy.bind(null,t,o);o.then(u,u)}})}function Ei(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,y=n,C=y;e:for(;C!==null;){switch(C.tag){case 27:if(Is(C.type)){Sn=C.stateNode,Si=!1;break e}break;case 5:Sn=C.stateNode,Si=!1;break e;case 3:case 4:Sn=C.stateNode.containerInfo,Si=!0;break e}C=C.return}if(Sn===null)throw Error(s(160));S0(d,y,u),Sn=null,Si=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)T0(n,t),n=n.sibling}var la=null;function T0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ei(n,t),Mi(t),o&4&&(Rs(3,t,t.return),_l(3,t),Rs(5,t,t.return));break;case 1:Ei(n,t),Mi(t),o&512&&(Hn||a===null||ya(a,a.return)),o&64&&Qa&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=la;if(Ei(n,t),Mi(t),o&512&&(Hn||a===null||ya(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Fa]||d[_n]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),ai(d,o,a),d[_n]=t,An(d),o=d;break e;case"link":var y=Tx("link","href",u).get(o+(a.href||""));if(y){for(var C=0;C<y.length;C++)if(d=y[C],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(C,1);break t}}d=u.createElement(o),ai(d,o,a),u.head.appendChild(d);break;case"meta":if(y=Tx("meta","content",u).get(o+(a.content||""))){for(C=0;C<y.length;C++)if(d=y[C],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(C,1);break t}}d=u.createElement(o),ai(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[_n]=t,An(d),o=d}t.stateNode=o}else Ax(u,t.type,t.stateNode);else t.stateNode=Mx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Ax(u,t.type,t.stateNode):Mx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Sd(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ei(n,t),Mi(t),o&512&&(Hn||a===null||ya(a,a.return)),a!==null&&o&4&&Sd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ei(n,t),Mi(t),o&512&&(Hn||a===null||ya(a,a.return)),t.flags&32){u=t.stateNode;try{Jn(u,"")}catch(Ke){sn(t,t.return,Ke)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Sd(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Td=!0);break;case 6:if(Ei(n,t),Mi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Ke){sn(t,t.return,Ke)}}break;case 3:if(nu=null,u=la,la=eu(n.containerInfo),Ei(n,t),la=u,Mi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{yo(n.containerInfo)}catch(Ke){sn(t,t.return,Ke)}Td&&(Td=!1,A0(t));break;case 4:o=la,la=eu(t.stateNode.containerInfo),Ei(n,t),Mi(t),la=o;break;case 12:Ei(n,t),Mi(t);break;case 31:Ei(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 13:Ei(n,t),Mi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kc=Ce()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 22:u=t.memoizedState!==null;var G=a!==null&&a.memoizedState!==null,le=Qa,xe=Hn;if(Qa=le||u,Hn=xe||G,Ei(n,t),Hn=xe,Qa=le,Mi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||G||Qa||Hn||br(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){G=a=n;try{if(d=G.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{C=G.stateNode;var be=G.memoizedProps.style,ce=be!=null&&be.hasOwnProperty("display")?be.display:null;C.style.display=ce==null||typeof ce=="boolean"?"":(""+ce).trim()}}catch(Ke){sn(G,G.return,Ke)}}}else if(n.tag===6){if(a===null){G=n;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(Ke){sn(G,G.return,Ke)}}}else if(n.tag===18){if(a===null){G=n;try{var fe=G.stateNode;u?mx(fe,!0):mx(G.stateNode,!1)}catch(Ke){sn(G,G.return,Ke)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Gc(t,a))));break;case 19:Ei(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 30:break;case 21:break;default:Ei(n,t),Mi(t)}}function Mi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(x0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Ed(t);zc(t,d,u);break;case 5:var y=a.stateNode;a.flags&32&&(Jn(y,""),a.flags&=-33);var C=Ed(t);zc(t,C,y);break;case 3:case 4:var G=a.stateNode.containerInfo,le=Ed(t);Md(t,le,G);break;default:throw Error(s(161))}}catch(xe){sn(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function A0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;A0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function es(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)b0(t,n.alternate,n),n=n.sibling}function br(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Rs(4,n,n.return),br(n);break;case 1:ya(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&m0(n,n.return,a),br(n);break;case 27:Rl(n.stateNode);case 26:case 5:ya(n,n.return),br(n);break;case 22:n.memoizedState===null&&br(n);break;case 30:br(n);break;default:br(n)}t=t.sibling}}function ts(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,y=d.flags;switch(d.tag){case 0:case 11:case 15:ts(u,d,a),_l(4,d);break;case 1:if(ts(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(le){sn(o,o.return,le)}if(o=d,u=o.updateQueue,u!==null){var C=o.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)ig(G[u],C)}catch(le){sn(o,o.return,le)}}a&&y&64&&p0(d),vl(d,d.return);break;case 27:_0(d);case 26:case 5:ts(u,d,a),a&&o===null&&y&4&&g0(d),vl(d,d.return);break;case 12:ts(u,d,a);break;case 31:ts(u,d,a),a&&y&4&&E0(u,d);break;case 13:ts(u,d,a),a&&y&4&&M0(u,d);break;case 22:d.memoizedState===null&&ts(u,d,a),vl(d,d.return);break;case 30:break;default:ts(u,d,a)}n=n.sibling}}function Ad(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&sl(a))}function wd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&sl(t))}function ca(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)w0(t,n,a,o),n=n.sibling}function w0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:ca(t,n,a,o),u&2048&&_l(9,n);break;case 1:ca(t,n,a,o);break;case 3:ca(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&sl(t)));break;case 12:if(u&2048){ca(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,y=d.id,C=d.onPostCommit;typeof C=="function"&&C(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(G){sn(n,n.return,G)}}else ca(t,n,a,o);break;case 31:ca(t,n,a,o);break;case 13:ca(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,y=n.alternate,n.memoizedState!==null?d._visibility&2?ca(t,n,a,o):bl(t,n):d._visibility&2?ca(t,n,a,o):(d._visibility|=2,co(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Ad(y,n);break;case 24:ca(t,n,a,o),u&2048&&wd(n.alternate,n);break;default:ca(t,n,a,o)}}function co(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,y=n,C=a,G=o,le=y.flags;switch(y.tag){case 0:case 11:case 15:co(d,y,C,G,u),_l(8,y);break;case 23:break;case 22:var xe=y.stateNode;y.memoizedState!==null?xe._visibility&2?co(d,y,C,G,u):bl(d,y):(xe._visibility|=2,co(d,y,C,G,u)),u&&le&2048&&Ad(y.alternate,y);break;case 24:co(d,y,C,G,u),u&&le&2048&&wd(y.alternate,y);break;default:co(d,y,C,G,u)}n=n.sibling}}function bl(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:bl(a,o),u&2048&&Ad(o.alternate,o);break;case 24:bl(a,o),u&2048&&wd(o.alternate,o);break;default:bl(a,o)}n=n.sibling}}var yl=8192;function uo(t,n,a){if(t.subtreeFlags&yl)for(t=t.child;t!==null;)R0(t,n,a),t=t.sibling}function R0(t,n,a){switch(t.tag){case 26:uo(t,n,a),t.flags&yl&&t.memoizedState!==null&&qy(a,la,t.memoizedState,t.memoizedProps);break;case 5:uo(t,n,a);break;case 3:case 4:var o=la;la=eu(t.stateNode.containerInfo),uo(t,n,a),la=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=yl,yl=16777216,uo(t,n,a),yl=o):uo(t,n,a));break;default:uo(t,n,a)}}function C0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Sl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Kn=o,O0(o,t)}C0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)N0(t),t=t.sibling}function N0(t){switch(t.tag){case 0:case 11:case 15:Sl(t),t.flags&2048&&Rs(9,t,t.return);break;case 3:Sl(t);break;case 12:Sl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Hc(t)):Sl(t);break;default:Sl(t)}}function Hc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Kn=o,O0(o,t)}C0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Rs(8,n,n.return),Hc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Hc(n));break;default:Hc(n)}t=t.sibling}}function O0(t,n){for(;Kn!==null;){var a=Kn;switch(a.tag){case 0:case 11:case 15:Rs(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:sl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Kn=o;else e:for(a=t;Kn!==null;){o=Kn;var u=o.sibling,d=o.return;if(y0(o),o===a){Kn=null;break e}if(u!==null){u.return=d,Kn=u;break e}Kn=d}}}var cy={getCacheForType:function(t){var n=ni(Bn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return ni(Bn).controller.signal}},uy=typeof WeakMap=="function"?WeakMap:Map,en=0,hn=null,Dt=null,Pt=0,an=0,Bi=null,Cs=!1,fo=!1,Rd=!1,ns=0,Cn=0,Ns=0,yr=0,Cd=0,zi=0,ho=0,El=null,Ti=null,Nd=!1,kc=0,D0=0,Vc=1/0,jc=null,Os=null,jn=0,Ds=null,po=null,is=0,Od=0,Dd=null,L0=null,Ml=0,Ld=null;function Gi(){return(en&2)!==0&&Pt!==0?Pt&-Pt:D.T!==null?zd():tr()}function U0(){if(zi===0)if((Pt&536870912)===0||Ht){var t=Mt;Mt<<=1,(Mt&3932160)===0&&(Mt=262144),zi=t}else zi=536870912;return t=Pi.current,t!==null&&(t.flags|=32),zi}function Ai(t,n,a){(t===hn&&(an===2||an===9)||t.cancelPendingCommit!==null)&&(mo(t,0),Ls(t,Pt,zi,!1)),ot(t,a),((en&2)===0||t!==hn)&&(t===hn&&((en&2)===0&&(yr|=a),Cn===4&&Ls(t,Pt,zi,!1)),Sa(t))}function I0(t,n,a){if((en&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||He(t,n),u=o?hy(t,n):Id(t,n,!0),d=o;do{if(u===0){fo&&!o&&Ls(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!fy(a)){u=Id(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var C=t;u=El;var G=C.current.memoizedState.isDehydrated;if(G&&(mo(C,y).flags|=256),y=Id(C,y,!1),y!==2){if(Rd&&!G){C.errorRecoveryDisabledLanes|=d,yr|=d,u=4;break e}d=Ti,Ti=u,d!==null&&(Ti===null?Ti=d:Ti.push.apply(Ti,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){mo(t,0),Ls(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ls(o,n,zi,!Cs);break e;case 2:Ti=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=kc+300-Ce(),10<u)){if(Ls(o,n,zi,!Cs),me(o,0,!0)!==0)break e;is=n,o.timeoutHandle=dx(P0.bind(null,o,a,Ti,jc,Nd,n,zi,yr,ho,Cs,d,"Throttled",-0,0),u);break e}P0(o,a,Ti,jc,Nd,n,zi,yr,ho,Cs,d,null,-0,0)}}break}while(!0);Sa(t)}function P0(t,n,a,o,u,d,y,C,G,le,xe,be,ce,fe){if(t.timeoutHandle=-1,be=n.subtreeFlags,be&8192||(be&16785408)===16785408){be={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},R0(n,d,be);var Ke=(d&62914560)===d?kc-Ce():(d&4194048)===d?D0-Ce():0;if(Ke=$y(be,Ke),Ke!==null){is=d,t.cancelPendingCommit=Ke(j0.bind(null,t,n,d,a,o,u,y,C,G,xe,be,null,ce,fe)),Ls(t,d,y,!le);return}}j0(t,n,d,a,o,u,y,C,G)}function fy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Ui(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ls(t,n,a,o){n&=~Cd,n&=~yr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-Be(u),y=1<<d;o[d]=-1,u&=~y}a!==0&&jt(t,a,n)}function Xc(){return(en&6)===0?(Tl(0),!1):!0}function Ud(){if(Dt!==null){if(an===0)var t=Dt.return;else t=Dt,Ya=dr=null,Kf(t),ao=null,ol=0,t=Dt;for(;t!==null;)h0(t.alternate,t),t=t.return;Dt=null}}function mo(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Oy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),is=0,Ud(),hn=t,Dt=a=ja(t.current,null),Pt=n,an=0,Bi=null,Cs=!1,fo=He(t,n),Rd=!1,ho=zi=Cd=yr=Ns=Cn=0,Ti=El=null,Nd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Be(o),d=1<<u;n|=t[u],o&=~d}return ns=n,dc(),a}function F0(t,n){yt=null,D.H=ml,n===io||n===bc?(n=Jm(),an=3):n===Bf?(n=Jm(),an=4):an=n===dd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Bi=n,Dt===null&&(Cn=1,Uc(t,$i(n,t.current)))}function B0(){var t=Pi.current;return t===null?!0:(Pt&4194048)===Pt?Ji===null:(Pt&62914560)===Pt||(Pt&536870912)!==0?t===Ji:!1}function z0(){var t=D.H;return D.H=ml,t===null?ml:t}function G0(){var t=D.A;return D.A=cy,t}function Yc(){Cn=4,Cs||(Pt&4194048)!==Pt&&Pi.current!==null||(fo=!0),(Ns&134217727)===0&&(yr&134217727)===0||hn===null||Ls(hn,Pt,zi,!1)}function Id(t,n,a){var o=en;en|=2;var u=z0(),d=G0();(hn!==t||Pt!==n)&&(jc=null,mo(t,n)),n=!1;var y=Cn;e:do try{if(an!==0&&Dt!==null){var C=Dt,G=Bi;switch(an){case 8:Ud(),y=6;break e;case 3:case 2:case 9:case 6:Pi.current===null&&(n=!0);var le=an;if(an=0,Bi=null,go(t,C,G,le),a&&fo){y=0;break e}break;default:le=an,an=0,Bi=null,go(t,C,G,le)}}dy(),y=Cn;break}catch(xe){F0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,Ya=dr=null,en=o,D.H=u,D.A=d,Dt===null&&(hn=null,Pt=0,dc()),y}function dy(){for(;Dt!==null;)H0(Dt)}function hy(t,n){var a=en;en|=2;var o=z0(),u=G0();hn!==t||Pt!==n?(jc=null,Vc=Ce()+500,mo(t,n)):fo=He(t,n);e:do try{if(an!==0&&Dt!==null){n=Dt;var d=Bi;t:switch(an){case 1:an=0,Bi=null,go(t,n,d,1);break;case 2:case 9:if(Zm(d)){an=0,Bi=null,k0(n);break}n=function(){an!==2&&an!==9||hn!==t||(an=7),Sa(t)},d.then(n,n);break e;case 3:an=7;break e;case 4:an=5;break e;case 7:Zm(d)?(an=0,Bi=null,k0(n)):(an=0,Bi=null,go(t,n,d,7));break;case 5:var y=null;switch(Dt.tag){case 26:y=Dt.memoizedState;case 5:case 27:var C=Dt;if(y?wx(y):C.stateNode.complete){an=0,Bi=null;var G=C.sibling;if(G!==null)Dt=G;else{var le=C.return;le!==null?(Dt=le,Wc(le)):Dt=null}break t}}an=0,Bi=null,go(t,n,d,5);break;case 6:an=0,Bi=null,go(t,n,d,6);break;case 8:Ud(),Cn=6;break e;default:throw Error(s(462))}}py();break}catch(xe){F0(t,xe)}while(!0);return Ya=dr=null,D.H=o,D.A=u,en=a,Dt!==null?0:(hn=null,Pt=0,dc(),Cn)}function py(){for(;Dt!==null&&!ft();)H0(Dt)}function H0(t){var n=f0(t.alternate,t,ns);t.memoizedProps=t.pendingProps,n===null?Wc(t):Dt=n}function k0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=s0(a,n,n.pendingProps,n.type,void 0,Pt);break;case 11:n=s0(a,n,n.pendingProps,n.type.render,n.ref,Pt);break;case 5:Kf(n);default:h0(a,n),n=Dt=Gm(n,ns),n=f0(a,n,ns)}t.memoizedProps=t.pendingProps,n===null?Wc(t):Dt=n}function go(t,n,a,o){Ya=dr=null,Kf(n),ao=null,ol=0;var u=n.return;try{if(ny(t,u,n,a,Pt)){Cn=1,Uc(t,$i(a,t.current)),Dt=null;return}}catch(d){if(u!==null)throw Dt=u,d;Cn=1,Uc(t,$i(a,t.current)),Dt=null;return}n.flags&32768?(Ht||o===1?t=!0:fo||(Pt&536870912)!==0?t=!1:(Cs=t=!0,(o===2||o===9||o===3||o===6)&&(o=Pi.current,o!==null&&o.tag===13&&(o.flags|=16384))),V0(n,t)):Wc(n)}function Wc(t){var n=t;do{if((n.flags&32768)!==0){V0(n,Cs);return}t=n.return;var a=sy(n.alternate,n,ns);if(a!==null){Dt=a;return}if(n=n.sibling,n!==null){Dt=n;return}Dt=n=t}while(n!==null);Cn===0&&(Cn=5)}function V0(t,n){do{var a=ry(t.alternate,t);if(a!==null){a.flags&=32767,Dt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Dt=t;return}Dt=t=a}while(t!==null);Cn=6,Dt=null}function j0(t,n,a,o,u,d,y,C,G){t.cancelPendingCommit=null;do qc();while(jn!==0);if((en&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Ef,xn(t,a,d,y,C,G),t===hn&&(Dt=hn=null,Pt=0),po=n,Ds=t,is=a,Od=d,Dd=u,L0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,_y(J,function(){return $0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=D.T,D.T=null,u=z.p,z.p=2,y=en,en|=4;try{oy(t,n,a)}finally{en=y,z.p=u,D.T=o}}jn=1,X0(),Y0(),W0()}}function X0(){if(jn===1){jn=0;var t=Ds,n=po,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=en;en|=4;try{T0(n,t);var d=Wd,y=Om(t.containerInfo),C=d.focusedElem,G=d.selectionRange;if(y!==C&&C&&C.ownerDocument&&Nm(C.ownerDocument.documentElement,C)){if(G!==null&&_f(C)){var le=G.start,xe=G.end;if(xe===void 0&&(xe=le),"selectionStart"in C)C.selectionStart=le,C.selectionEnd=Math.min(xe,C.value.length);else{var be=C.ownerDocument||document,ce=be&&be.defaultView||window;if(ce.getSelection){var fe=ce.getSelection(),Ke=C.textContent.length,lt=Math.min(G.start,Ke),cn=G.end===void 0?lt:Math.min(G.end,Ke);!fe.extend&&lt>cn&&(y=cn,cn=lt,lt=y);var Q=Cm(C,lt),W=Cm(C,cn);if(Q&&W&&(fe.rangeCount!==1||fe.anchorNode!==Q.node||fe.anchorOffset!==Q.offset||fe.focusNode!==W.node||fe.focusOffset!==W.offset)){var oe=be.createRange();oe.setStart(Q.node,Q.offset),fe.removeAllRanges(),lt>cn?(fe.addRange(oe),fe.extend(W.node,W.offset)):(oe.setEnd(W.node,W.offset),fe.addRange(oe))}}}}for(be=[],fe=C;fe=fe.parentNode;)fe.nodeType===1&&be.push({element:fe,left:fe.scrollLeft,top:fe.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<be.length;C++){var ve=be[C];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}ru=!!Yd,Wd=Yd=null}finally{en=u,z.p=o,D.T=a}}t.current=n,jn=2}}function Y0(){if(jn===2){jn=0;var t=Ds,n=po,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=en;en|=4;try{b0(t,n.alternate,n)}finally{en=u,z.p=o,D.T=a}}jn=3}}function W0(){if(jn===4||jn===3){jn=0,Vt();var t=Ds,n=po,a=is,o=L0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?jn=5:(jn=0,po=Ds=null,q0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Os=null),Qn(a),n=n.stateNode,pe&&typeof pe.onCommitFiberRoot=="function")try{pe.onCommitFiberRoot(de,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=D.T,u=z.p,z.p=2,D.T=null;try{for(var d=t.onRecoverableError,y=0;y<o.length;y++){var C=o[y];d(C.value,{componentStack:C.stack})}}finally{D.T=n,z.p=u}}(is&3)!==0&&qc(),Sa(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Ld?Ml++:(Ml=0,Ld=t):Ml=0,Tl(0)}}function q0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,sl(n)))}function qc(){return X0(),Y0(),W0(),$0()}function $0(){if(jn!==5)return!1;var t=Ds,n=Od;Od=0;var a=Qn(is),o=D.T,u=z.p;try{z.p=32>a?32:a,D.T=null,a=Dd,Dd=null;var d=Ds,y=is;if(jn=0,po=Ds=null,is=0,(en&6)!==0)throw Error(s(331));var C=en;if(en|=4,N0(d.current),w0(d,d.current,y,a),en=C,Tl(0,!1),pe&&typeof pe.onPostCommitFiberRoot=="function")try{pe.onPostCommitFiberRoot(de,d)}catch{}return!0}finally{z.p=u,D.T=o,q0(t,n)}}function K0(t,n,a){n=$i(a,n),n=fd(t.stateNode,n,2),t=Ts(t,n,2),t!==null&&(ot(t,2),Sa(t))}function sn(t,n,a){if(t.tag===3)K0(t,t,a);else for(;n!==null;){if(n.tag===3){K0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Os===null||!Os.has(o))){t=$i(a,t),a=Zg(2),o=Ts(n,a,2),o!==null&&(Qg(a,o,n,t),ot(o,2),Sa(o));break}}n=n.return}}function Pd(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new uy;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Rd=!0,u.add(a),t=my.bind(null,t,n,a),n.then(t,t))}function my(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,hn===t&&(Pt&a)===a&&(Cn===4||Cn===3&&(Pt&62914560)===Pt&&300>Ce()-kc?(en&2)===0&&mo(t,0):Cd|=a,ho===Pt&&(ho=0)),Sa(t)}function Z0(t,n){n===0&&(n=Te()),t=cr(t,n),t!==null&&(ot(t,n),Sa(t))}function gy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Z0(t,a)}function xy(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Z0(t,a)}function _y(t,n){return Y(t,n)}var $c=null,xo=null,Fd=!1,Kc=!1,Bd=!1,Us=0;function Sa(t){t!==xo&&t.next===null&&(xo===null?$c=xo=t:xo=xo.next=t),Kc=!0,Fd||(Fd=!0,by())}function Tl(t,n){if(!Bd&&Kc){Bd=!0;do for(var a=!1,o=$c;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,C=o.pingedLanes;d=(1<<31-Be(42|t)+1)-1,d&=u&~(y&~C),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,tx(o,d))}else d=Pt,d=me(o,o===hn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||He(o,d)||(a=!0,tx(o,d));o=o.next}while(a);Bd=!1}}function vy(){Q0()}function Q0(){Kc=Fd=!1;var t=0;Us!==0&&Ny()&&(t=Us);for(var n=Ce(),a=null,o=$c;o!==null;){var u=o.next,d=J0(o,n);d===0?(o.next=null,a===null?$c=u:a.next=u,u===null&&(xo=a)):(a=o,(t!==0||(d&3)!==0)&&(Kc=!0)),o=u}jn!==0&&jn!==5||Tl(t),Us!==0&&(Us=0)}function J0(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var y=31-Be(d),C=1<<y,G=u[y];G===-1?((C&a)===0||(C&o)!==0)&&(u[y]=Ue(C,n)):G<=n&&(t.expiredLanes|=C),d&=~C}if(n=hn,a=Pt,a=me(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(an===2||an===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Nt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||He(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Nt(o),Qn(a)){case 2:case 8:a=T;break;case 32:a=J;break;case 268435456:a=Me;break;default:a=J}return o=ex.bind(null,t),a=Y(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Nt(o),t.callbackPriority=2,t.callbackNode=null,2}function ex(t,n){if(jn!==0&&jn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(qc()&&t.callbackNode!==a)return null;var o=Pt;return o=me(t,t===hn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(I0(t,o,n),J0(t,Ce()),t.callbackNode!=null&&t.callbackNode===a?ex.bind(null,t):null)}function tx(t,n){if(qc())return null;I0(t,n,!0)}function by(){Dy(function(){(en&6)!==0?Y(O,vy):Q0()})}function zd(){if(Us===0){var t=to;t===0&&(t=rt,rt<<=1,(rt&261888)===0&&(rt=256)),Us=t}return Us}function nx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:xs(""+t)}function ix(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function yy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=nx((u[Tn]||null).action),y=o.submitter;y&&(n=(n=y[Tn]||null)?nx(n.formAction):y.getAttribute("formAction"),n!==null&&(d=n,y=null));var C=new kr("action","action",null,o,u);t.push({event:C,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Us!==0){var G=y?ix(u,y):new FormData(u);sd(a,{pending:!0,data:G,method:u.method,action:d},null,G)}}else typeof d=="function"&&(C.preventDefault(),G=y?ix(u,y):new FormData(u),sd(a,{pending:!0,data:G,method:u.method,action:d},d,G))},currentTarget:u}]})}}for(var Gd=0;Gd<Sf.length;Gd++){var Hd=Sf[Gd],Sy=Hd.toLowerCase(),Ey=Hd[0].toUpperCase()+Hd.slice(1);oa(Sy,"on"+Ey)}oa(Um,"onAnimationEnd"),oa(Im,"onAnimationIteration"),oa(Pm,"onAnimationStart"),oa("dblclick","onDoubleClick"),oa("focusin","onFocus"),oa("focusout","onBlur"),oa(zb,"onTransitionRun"),oa(Gb,"onTransitionStart"),oa(Hb,"onTransitionCancel"),oa(Fm,"onTransitionEnd"),ne("onMouseEnter",["mouseout","mouseover"]),ne("onMouseLeave",["mouseout","mouseover"]),ne("onPointerEnter",["pointerout","pointerover"]),ne("onPointerLeave",["pointerout","pointerover"]),$("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$("onBeforeInput",["compositionend","keypress","textInput","paste"]),$("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Al="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),My=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Al));function ax(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var y=o.length-1;0<=y;y--){var C=o[y],G=C.instance,le=C.currentTarget;if(C=C.listener,G!==d&&u.isPropagationStopped())break e;d=C,u.currentTarget=le;try{d(u)}catch(xe){fc(xe)}u.currentTarget=null,d=G}else for(y=0;y<o.length;y++){if(C=o[y],G=C.instance,le=C.currentTarget,C=C.listener,G!==d&&u.isPropagationStopped())break e;d=C,u.currentTarget=le;try{d(u)}catch(xe){fc(xe)}u.currentTarget=null,d=G}}}}function Lt(t,n){var a=n[pn];a===void 0&&(a=n[pn]=new Set);var o=t+"__bubble";a.has(o)||(sx(n,t,2,!1),a.add(o))}function kd(t,n,a){var o=0;n&&(o|=4),sx(a,t,o,n)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function Vd(t){if(!t[Zc]){t[Zc]=!0,Fr.forEach(function(a){a!=="selectionchange"&&(My.has(a)||kd(a,!1,t),kd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Zc]||(n[Zc]=!0,kd("selectionchange",!1,n))}}function sx(t,n,a,o){switch(Ux(n)){case 2:var u=Qy;break;case 8:u=Jy;break;default:u=ah}a=u.bind(null,n,a,t),u=void 0,!Ga||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function jd(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var C=o.stateNode.containerInfo;if(C===u)break;if(y===4)for(y=o.return;y!==null;){var G=y.tag;if((G===3||G===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;C!==null;){if(y=ga(C),y===null)return;if(G=y.tag,G===5||G===6||G===26||G===27){o=d=y;continue e}C=C.parentNode}}o=o.return}oc(function(){var le=d,xe=pi(a),be=[];e:{var ce=Bm.get(t);if(ce!==void 0){var fe=kr,Ke=t;switch(t){case"keypress":if(Gr(a)===0)break e;case"keydown":case"keyup":fe=Fn;break;case"focusin":Ke="focus",fe=Zo;break;case"focusout":Ke="blur",fe=Zo;break;case"beforeblur":case"afterblur":fe=Zo;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":fe=jr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":fe=cc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":fe=Vn;break;case Um:case Im:case Pm:fe=dn;break;case Fm:fe=On;break;case"scroll":case"scrollend":fe=uf;break;case"wheel":fe=Va;break;case"copy":case"cut":case"paste":fe=Tt;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":fe=Li;break;case"toggle":case"beforetoggle":fe=pf}var lt=(n&4)!==0,cn=!lt&&(t==="scroll"||t==="scrollend"),Q=lt?ce!==null?ce+"Capture":null:ce;lt=[];for(var W=le,oe;W!==null;){var ve=W;if(oe=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||oe===null||Q===null||(ve=_s(W,Q),ve!=null&&lt.push(wl(W,ve,oe))),cn)break;W=W.return}0<lt.length&&(ce=new fe(ce,Ke,null,a,xe),be.push({event:ce,listeners:lt}))}}if((n&7)===0){e:{if(ce=t==="mouseover"||t==="pointerover",fe=t==="mouseout"||t==="pointerout",ce&&a!==ir&&(Ke=a.relatedTarget||a.fromElement)&&(ga(Ke)||Ke[Oi]))break e;if((fe||ce)&&(ce=xe.window===xe?xe:(ce=xe.ownerDocument)?ce.defaultView||ce.parentWindow:window,fe?(Ke=a.relatedTarget||a.toElement,fe=le,Ke=Ke?ga(Ke):null,Ke!==null&&(cn=c(Ke),lt=Ke.tag,Ke!==cn||lt!==5&&lt!==27&&lt!==6)&&(Ke=null)):(fe=null,Ke=le),fe!==Ke)){if(lt=jr,ve="onMouseLeave",Q="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Li,ve="onPointerLeave",Q="onPointerEnter",W="pointer"),cn=fe==null?ce:Ba(fe),oe=Ke==null?ce:Ba(Ke),ce=new lt(ve,W+"leave",fe,a,xe),ce.target=cn,ce.relatedTarget=oe,ve=null,ga(xe)===le&&(lt=new lt(Q,W+"enter",Ke,a,xe),lt.target=oe,lt.relatedTarget=cn,ve=lt),cn=ve,fe&&Ke)t:{for(lt=Ty,Q=fe,W=Ke,oe=0,ve=Q;ve;ve=lt(ve))oe++;ve=0;for(var at=W;at;at=lt(at))ve++;for(;0<oe-ve;)Q=lt(Q),oe--;for(;0<ve-oe;)W=lt(W),ve--;for(;oe--;){if(Q===W||W!==null&&Q===W.alternate){lt=Q;break t}Q=lt(Q),W=lt(W)}lt=null}else lt=null;fe!==null&&rx(be,ce,fe,lt,!1),Ke!==null&&cn!==null&&rx(be,cn,Ke,lt,!0)}}e:{if(ce=le?Ba(le):window,fe=ce.nodeName&&ce.nodeName.toLowerCase(),fe==="select"||fe==="input"&&ce.type==="file")var $t=Em;else if(ym(ce))if(Mm)$t=Pb;else{$t=Ub;var et=Lb}else fe=ce.nodeName,!fe||fe.toLowerCase()!=="input"||ce.type!=="checkbox"&&ce.type!=="radio"?le&&Gt(le.elementType)&&($t=Em):$t=Ib;if($t&&($t=$t(t,le))){Sm(be,$t,a,xe);break e}et&&et(t,ce,le),t==="focusout"&&le&&ce.type==="number"&&le.memoizedProps.value!=null&&Rt(ce,"number",ce.value)}switch(et=le?Ba(le):window,t){case"focusin":(ym(et)||et.contentEditable==="true")&&(Wr=et,vf=le,nl=null);break;case"focusout":nl=vf=Wr=null;break;case"mousedown":bf=!0;break;case"contextmenu":case"mouseup":case"dragend":bf=!1,Dm(be,a,xe);break;case"selectionchange":if(Bb)break;case"keydown":case"keyup":Dm(be,a,xe)}var Et;if(mf)e:{switch(t){case"compositionstart":var Ft="onCompositionStart";break e;case"compositionend":Ft="onCompositionEnd";break e;case"compositionupdate":Ft="onCompositionUpdate";break e}Ft=void 0}else Yr?vm(t,a)&&(Ft="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Ft="onCompositionStart");Ft&&(gm&&a.locale!=="ko"&&(Yr||Ft!=="onCompositionStart"?Ft==="onCompositionEnd"&&Yr&&(Et=xt()):(Di=xe,Ha="value"in Di?Di.value:Di.textContent,Yr=!0)),et=Qc(le,Ft),0<et.length&&(Ft=new mt(Ft,t,null,a,xe),be.push({event:Ft,listeners:et}),Et?Ft.data=Et:(Et=bm(a),Et!==null&&(Ft.data=Et)))),(Et=Rb?Cb(t,a):Nb(t,a))&&(Ft=Qc(le,"onBeforeInput"),0<Ft.length&&(et=new mt("onBeforeInput","beforeinput",null,a,xe),be.push({event:et,listeners:Ft}),et.data=Et)),yy(be,t,le,a,xe)}ax(be,n)})}function wl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Qc(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=_s(t,a),u!=null&&o.unshift(wl(t,u,d)),u=_s(t,n),u!=null&&o.push(wl(t,u,d))),t.tag===3)return o;t=t.return}return[]}function Ty(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function rx(t,n,a,o,u){for(var d=n._reactName,y=[];a!==null&&a!==o;){var C=a,G=C.alternate,le=C.stateNode;if(C=C.tag,G!==null&&G===o)break;C!==5&&C!==26&&C!==27||le===null||(G=le,u?(le=_s(a,d),le!=null&&y.unshift(wl(a,le,G))):u||(le=_s(a,d),le!=null&&y.push(wl(a,le,G)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var Ay=/\r\n?/g,wy=/\u0000|\uFFFD/g;function ox(t){return(typeof t=="string"?t:""+t).replace(Ay,`
`).replace(wy,"")}function lx(t,n){return n=ox(n),ox(t)===n}function ln(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Jn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Jn(t,""+o);break;case"className":$e(t,"class",o);break;case"tabIndex":$e(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":$e(t,a,o);break;case"style":_i(t,o,d);break;case"data":if(n!=="object"){$e(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=xs(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&ln(t,n,"name",u.name,u,null),ln(t,n,"formEncType",u.formEncType,u,null),ln(t,n,"formMethod",u.formMethod,u,null),ln(t,n,"formTarget",u.formTarget,u,null)):(ln(t,n,"encType",u.encType,u,null),ln(t,n,"method",u.method,u,null),ln(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=xs(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=Wi);break;case"onScroll":o!=null&&Lt("scroll",t);break;case"onScrollEnd":o!=null&&Lt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=xs(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Lt("beforetoggle",t),Lt("toggle",t),Fe(t,"popover",o);break;case"xlinkActuate":Ye(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ye(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ye(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ye(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ye(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ye(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Fe(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Mn.get(a)||a,Fe(t,a,o))}}function Xd(t,n,a,o,u,d){switch(a){case"style":_i(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?Jn(t,o):(typeof o=="number"||typeof o=="bigint")&&Jn(t,""+o);break;case"onScroll":o!=null&&Lt("scroll",t);break;case"onScrollEnd":o!=null&&Lt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Wi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[Tn]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Fe(t,a,o)}}}function ai(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Lt("error",t),Lt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var y=a[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:ln(t,n,d,y,a,null)}}u&&ln(t,n,"srcSet",a.srcSet,a,null),o&&ln(t,n,"src",a.src,a,null);return;case"input":Lt("invalid",t);var C=d=y=u=null,G=null,le=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":u=xe;break;case"type":y=xe;break;case"checked":G=xe;break;case"defaultChecked":le=xe;break;case"value":d=xe;break;case"defaultValue":C=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(s(137,n));break;default:ln(t,n,o,xe,a,null)}}Pn(t,d,C,G,le,y,u,!1);return;case"select":Lt("invalid",t),o=y=d=null;for(u in a)if(a.hasOwnProperty(u)&&(C=a[u],C!=null))switch(u){case"value":d=C;break;case"defaultValue":y=C;break;case"multiple":o=C;default:ln(t,n,u,C,a,null)}n=d,a=y,t.multiple=!!o,n!=null?mn(t,!!o,n,!1):a!=null&&mn(t,!!o,a,!0);return;case"textarea":Lt("invalid",t),d=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(C=a[y],C!=null))switch(y){case"value":o=C;break;case"defaultValue":u=C;break;case"children":d=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:ln(t,n,y,C,a,null)}yn(t,o,u,d);return;case"option":for(G in a)a.hasOwnProperty(G)&&(o=a[G],o!=null)&&(G==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":ln(t,n,G,o,a,null));return;case"dialog":Lt("beforetoggle",t),Lt("toggle",t),Lt("cancel",t),Lt("close",t);break;case"iframe":case"object":Lt("load",t);break;case"video":case"audio":for(o=0;o<Al.length;o++)Lt(Al[o],t);break;case"image":Lt("error",t),Lt("load",t);break;case"details":Lt("toggle",t);break;case"embed":case"source":case"link":Lt("error",t),Lt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(le in a)if(a.hasOwnProperty(le)&&(o=a[le],o!=null))switch(le){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:ln(t,n,le,o,a,null)}return;default:if(Gt(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&Xd(t,n,xe,o,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(o=a[C],o!=null&&ln(t,n,C,o,a,null))}function Ry(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,C=null,G=null,le=null,xe=null;for(fe in a){var be=a[fe];if(a.hasOwnProperty(fe)&&be!=null)switch(fe){case"checked":break;case"value":break;case"defaultValue":G=be;default:o.hasOwnProperty(fe)||ln(t,n,fe,null,o,be)}}for(var ce in o){var fe=o[ce];if(be=a[ce],o.hasOwnProperty(ce)&&(fe!=null||be!=null))switch(ce){case"type":d=fe;break;case"name":u=fe;break;case"checked":le=fe;break;case"defaultChecked":xe=fe;break;case"value":y=fe;break;case"defaultValue":C=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(s(137,n));break;default:fe!==be&&ln(t,n,ce,fe,o,be)}}Ve(t,y,C,G,le,xe,d,u);return;case"select":fe=y=C=ce=null;for(d in a)if(G=a[d],a.hasOwnProperty(d)&&G!=null)switch(d){case"value":break;case"multiple":fe=G;default:o.hasOwnProperty(d)||ln(t,n,d,null,o,G)}for(u in o)if(d=o[u],G=a[u],o.hasOwnProperty(u)&&(d!=null||G!=null))switch(u){case"value":ce=d;break;case"defaultValue":C=d;break;case"multiple":y=d;default:d!==G&&ln(t,n,u,d,o,G)}n=C,a=y,o=fe,ce!=null?mn(t,!!a,ce,!1):!!o!=!!a&&(n!=null?mn(t,!!a,n,!0):mn(t,!!a,a?[]:"",!1));return;case"textarea":fe=ce=null;for(C in a)if(u=a[C],a.hasOwnProperty(C)&&u!=null&&!o.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:ln(t,n,C,null,o,u)}for(y in o)if(u=o[y],d=a[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":ce=u;break;case"defaultValue":fe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&ln(t,n,y,u,o,d)}En(t,ce,fe);return;case"option":for(var Ke in a)ce=a[Ke],a.hasOwnProperty(Ke)&&ce!=null&&!o.hasOwnProperty(Ke)&&(Ke==="selected"?t.selected=!1:ln(t,n,Ke,null,o,ce));for(G in o)ce=o[G],fe=a[G],o.hasOwnProperty(G)&&ce!==fe&&(ce!=null||fe!=null)&&(G==="selected"?t.selected=ce&&typeof ce!="function"&&typeof ce!="symbol":ln(t,n,G,ce,o,fe));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in a)ce=a[lt],a.hasOwnProperty(lt)&&ce!=null&&!o.hasOwnProperty(lt)&&ln(t,n,lt,null,o,ce);for(le in o)if(ce=o[le],fe=a[le],o.hasOwnProperty(le)&&ce!==fe&&(ce!=null||fe!=null))switch(le){case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:ln(t,n,le,ce,o,fe)}return;default:if(Gt(n)){for(var cn in a)ce=a[cn],a.hasOwnProperty(cn)&&ce!==void 0&&!o.hasOwnProperty(cn)&&Xd(t,n,cn,void 0,o,ce);for(xe in o)ce=o[xe],fe=a[xe],!o.hasOwnProperty(xe)||ce===fe||ce===void 0&&fe===void 0||Xd(t,n,xe,ce,o,fe);return}}for(var Q in a)ce=a[Q],a.hasOwnProperty(Q)&&ce!=null&&!o.hasOwnProperty(Q)&&ln(t,n,Q,null,o,ce);for(be in o)ce=o[be],fe=a[be],!o.hasOwnProperty(be)||ce===fe||ce==null&&fe==null||ln(t,n,be,ce,o,fe)}function cx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Cy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,y=u.initiatorType,C=u.duration;if(d&&C&&cx(y)){for(y=0,C=u.responseEnd,o+=1;o<a.length;o++){var G=a[o],le=G.startTime;if(le>C)break;var xe=G.transferSize,be=G.initiatorType;xe&&cx(be)&&(G=G.responseEnd,y+=xe*(G<C?1:(C-le)/(G-le)))}if(--o,n+=8*(d+y)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Yd=null,Wd=null;function Jc(t){return t.nodeType===9?t:t.ownerDocument}function ux(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function fx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function qd(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var $d=null;function Ny(){var t=window.event;return t&&t.type==="popstate"?t===$d?!1:($d=t,!0):($d=null,!1)}var dx=typeof setTimeout=="function"?setTimeout:void 0,Oy=typeof clearTimeout=="function"?clearTimeout:void 0,hx=typeof Promise=="function"?Promise:void 0,Dy=typeof queueMicrotask=="function"?queueMicrotask:typeof hx<"u"?function(t){return hx.resolve(null).then(t).catch(Ly)}:dx;function Ly(t){setTimeout(function(){throw t})}function Is(t){return t==="head"}function px(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),yo(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Rl(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Rl(a);for(var d=a.firstChild;d;){var y=d.nextSibling,C=d.nodeName;d[Fa]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=y}}else a==="body"&&Rl(t.ownerDocument.body);a=u}while(a);yo(n)}function mx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function Kd(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Kd(a),Pr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Uy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Fa])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=ea(t.nextSibling),t===null)break}return null}function Iy(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ea(t.nextSibling),t===null))return null;return t}function gx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ea(t.nextSibling),t===null))return null;return t}function Zd(t){return t.data==="$?"||t.data==="$~"}function Qd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Py(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function ea(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Jd=null;function xx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return ea(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function _x(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function vx(t,n,a){switch(n=Jc(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Rl(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Pr(t)}var ta=new Map,bx=new Set;function eu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var as=z.d;z.d={f:Fy,r:By,D:zy,C:Gy,L:Hy,m:ky,X:jy,S:Vy,M:Xy};function Fy(){var t=as.f(),n=Xc();return t||n}function By(t){var n=xa(t);n!==null&&n.tag===5&&n.type==="form"?Fg(n):as.r(t)}var _o=typeof document>"u"?null:document;function yx(t,n,a){var o=_o;if(o&&typeof n=="string"&&n){var u=Wt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),bx.has(u)||(bx.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),ai(n,"link",t),An(n),o.head.appendChild(n)))}}function zy(t){as.D(t),yx("dns-prefetch",t,null)}function Gy(t,n){as.C(t,n),yx("preconnect",t,n)}function Hy(t,n,a){as.L(t,n,a);var o=_o;if(o&&t&&n){var u='link[rel="preload"][as="'+Wt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Wt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Wt(a.imageSizes)+'"]')):u+='[href="'+Wt(t)+'"]';var d=u;switch(n){case"style":d=vo(t);break;case"script":d=bo(t)}ta.has(d)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ta.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Cl(d))||n==="script"&&o.querySelector(Nl(d))||(n=o.createElement("link"),ai(n,"link",t),An(n),o.head.appendChild(n)))}}function ky(t,n){as.m(t,n);var a=_o;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Wt(o)+'"][href="'+Wt(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=bo(t)}if(!ta.has(d)&&(t=_({rel:"modulepreload",href:t},n),ta.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Nl(d)))return}o=a.createElement("link"),ai(o,"link",t),An(o),a.head.appendChild(o)}}}function Vy(t,n,a){as.S(t,n,a);var o=_o;if(o&&t){var u=_a(o).hoistableStyles,d=vo(t);n=n||"default";var y=u.get(d);if(!y){var C={loading:0,preload:null};if(y=o.querySelector(Cl(d)))C.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ta.get(d))&&eh(t,a);var G=y=o.createElement("link");An(G),ai(G,"link",t),G._p=new Promise(function(le,xe){G.onload=le,G.onerror=xe}),G.addEventListener("load",function(){C.loading|=1}),G.addEventListener("error",function(){C.loading|=2}),C.loading|=4,tu(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:C},u.set(d,y)}}}function jy(t,n){as.X(t,n);var a=_o;if(a&&t){var o=_a(a).hoistableScripts,u=bo(t),d=o.get(u);d||(d=a.querySelector(Nl(u)),d||(t=_({src:t,async:!0},n),(n=ta.get(u))&&th(t,n),d=a.createElement("script"),An(d),ai(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Xy(t,n){as.M(t,n);var a=_o;if(a&&t){var o=_a(a).hoistableScripts,u=bo(t),d=o.get(u);d||(d=a.querySelector(Nl(u)),d||(t=_({src:t,async:!0,type:"module"},n),(n=ta.get(u))&&th(t,n),d=a.createElement("script"),An(d),ai(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Sx(t,n,a,o){var u=(u=te.current)?eu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=vo(a.href),a=_a(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=vo(a.href);var d=_a(u).hoistableStyles,y=d.get(t);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,y),(d=u.querySelector(Cl(t)))&&!d._p&&(y.instance=d,y.state.loading=5),ta.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ta.set(t,a),d||Yy(u,t,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=bo(a),a=_a(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function vo(t){return'href="'+Wt(t)+'"'}function Cl(t){return'link[rel="stylesheet"]['+t+"]"}function Ex(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function Yy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),ai(n,"link",a),An(n),t.head.appendChild(n))}function bo(t){return'[src="'+Wt(t)+'"]'}function Nl(t){return"script[async]"+t}function Mx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Wt(a.href)+'"]');if(o)return n.instance=o,An(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),An(o),ai(o,"style",u),tu(o,a.precedence,t),n.instance=o;case"stylesheet":u=vo(a.href);var d=t.querySelector(Cl(u));if(d)return n.state.loading|=4,n.instance=d,An(d),d;o=Ex(a),(u=ta.get(u))&&eh(o,u),d=(t.ownerDocument||t).createElement("link"),An(d);var y=d;return y._p=new Promise(function(C,G){y.onload=C,y.onerror=G}),ai(d,"link",o),n.state.loading|=4,tu(d,a.precedence,t),n.instance=d;case"script":return d=bo(a.src),(u=t.querySelector(Nl(d)))?(n.instance=u,An(u),u):(o=a,(u=ta.get(d))&&(o=_({},a),th(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),An(u),ai(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,tu(o,a.precedence,t));return n.instance}function tu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var C=o[y];if(C.dataset.precedence===n)d=C;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function eh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function th(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var nu=null;function Tx(t,n,a){if(nu===null){var o=new Map,u=nu=new Map;u.set(a,o)}else u=nu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Fa]||d[_n]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(n)||"";y=t+y;var C=o.get(y);C?C.push(d):o.set(y,[d])}}return o}function Ax(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Wy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function wx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function qy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=vo(o.href),d=n.querySelector(Cl(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=iu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,An(d);return}d=n.ownerDocument||n,o=Ex(o),(u=ta.get(u))&&eh(o,u),d=d.createElement("link"),An(d);var y=d;y._p=new Promise(function(C,G){y.onload=C,y.onerror=G}),ai(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=iu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var nh=0;function $y(t,n){return t.stylesheets&&t.count===0&&su(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&su(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&nh===0&&(nh=62500*Cy());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&su(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>nh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)su(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var au=null;function su(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,au=new Map,n.forEach(Ky,t),au=null,iu.call(t))}function Ky(t,n){if(!(n.state.loading&4)){var a=au.get(t);if(a)var o=a.get(null);else{a=new Map,au.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),d=a.get(y)||o,d===o&&a.set(null,u),a.set(y,u),this.count++,o=iu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Ol={$$typeof:U,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Zy(t,n,a,o,u,d,y,C,G){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function Rx(t,n,a,o,u,d,y,C,G,le,xe,be){return t=new Zy(t,n,a,y,G,le,xe,be,C),n=1,d===!0&&(n|=24),d=Ii(3,null,null,n),t.current=d,d.stateNode=t,n=If(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},zf(d),t}function Cx(t){return t?(t=Kr,t):Kr}function Nx(t,n,a,o,u,d){u=Cx(u),o.context===null?o.context=u:o.pendingContext=u,o=Ms(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Ts(t,o,n),a!==null&&(Ai(a,t,n),cl(a,t,n))}function Ox(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function ih(t,n){Ox(t,n),(t=t.alternate)&&Ox(t,n)}function Dx(t){if(t.tag===13||t.tag===31){var n=cr(t,67108864);n!==null&&Ai(n,t,67108864),ih(t,67108864)}}function Lx(t){if(t.tag===13||t.tag===31){var n=Gi();n=Ia(n);var a=cr(t,n);a!==null&&Ai(a,t,n),ih(t,n)}}var ru=!0;function Qy(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=2,ah(t,n,a,o)}finally{z.p=d,D.T=u}}function Jy(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=8,ah(t,n,a,o)}finally{z.p=d,D.T=u}}function ah(t,n,a,o){if(ru){var u=sh(o);if(u===null)jd(t,n,o,ou,a),Ix(t,o);else if(tS(u,t,n,a,o))o.stopPropagation();else if(Ix(t,o),n&4&&-1<eS.indexOf(t)){for(;u!==null;){var d=xa(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Re(d.pendingLanes);if(y!==0){var C=d;for(C.pendingLanes|=2,C.entangledLanes|=2;y;){var G=1<<31-Be(y);C.entanglements[1]|=G,y&=~G}Sa(d),(en&6)===0&&(Vc=Ce()+500,Tl(0))}}break;case 31:case 13:C=cr(d,2),C!==null&&Ai(C,d,2),Xc(),ih(d,2)}if(d=sh(o),d===null&&jd(t,n,o,ou,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else jd(t,n,o,null,a)}}function sh(t){return t=pi(t),rh(t)}var ou=null;function rh(t){if(ou=null,t=ga(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return ou=t,null}function Ux(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Qt()){case O:return 2;case T:return 8;case J:case he:return 32;case Me:return 268435456;default:return 32}default:return 32}}var oh=!1,Ps=null,Fs=null,Bs=null,Dl=new Map,Ll=new Map,zs=[],eS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ix(t,n){switch(t){case"focusin":case"focusout":Ps=null;break;case"dragenter":case"dragleave":Fs=null;break;case"mouseover":case"mouseout":Bs=null;break;case"pointerover":case"pointerout":Dl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ll.delete(n.pointerId)}}function Ul(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=xa(n),n!==null&&Dx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function tS(t,n,a,o,u){switch(n){case"focusin":return Ps=Ul(Ps,t,n,a,o,u),!0;case"dragenter":return Fs=Ul(Fs,t,n,a,o,u),!0;case"mouseover":return Bs=Ul(Bs,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return Dl.set(d,Ul(Dl.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,Ll.set(d,Ul(Ll.get(d)||null,t,n,a,o,u)),!0}return!1}function Px(t){var n=ga(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,nr(t.priority,function(){Lx(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,nr(t.priority,function(){Lx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function lu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=sh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);ir=o,a.target.dispatchEvent(o),ir=null}else return n=xa(a),n!==null&&Dx(n),t.blockedOn=a,!1;n.shift()}return!0}function Fx(t,n,a){lu(t)&&a.delete(n)}function nS(){oh=!1,Ps!==null&&lu(Ps)&&(Ps=null),Fs!==null&&lu(Fs)&&(Fs=null),Bs!==null&&lu(Bs)&&(Bs=null),Dl.forEach(Fx),Ll.forEach(Fx)}function cu(t,n){t.blockedOn===n&&(t.blockedOn=null,oh||(oh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,nS)))}var uu=null;function Bx(t){uu!==t&&(uu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){uu===t&&(uu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(rh(o||a)===null)continue;break}var d=xa(a);d!==null&&(t.splice(n,3),n-=3,sd(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function yo(t){function n(G){return cu(G,t)}Ps!==null&&cu(Ps,t),Fs!==null&&cu(Fs,t),Bs!==null&&cu(Bs,t),Dl.forEach(n),Ll.forEach(n);for(var a=0;a<zs.length;a++){var o=zs[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<zs.length&&(a=zs[0],a.blockedOn===null);)Px(a),a.blockedOn===null&&zs.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],y=u[Tn]||null;if(typeof d=="function")y||Bx(a);else if(y){var C=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[Tn]||null)C=y.formAction;else if(rh(u)!==null)continue}else C=y.action;typeof C=="function"?a[o+1]=C:(a.splice(o,3),o-=3),Bx(a)}}}function zx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function lh(t){this._internalRoot=t}fu.prototype.render=lh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=Gi();Nx(a,o,t,n,null,null)},fu.prototype.unmount=lh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Nx(t.current,2,null,t,null,null),Xc(),n[Oi]=null}};function fu(t){this._internalRoot=t}fu.prototype.unstable_scheduleHydration=function(t){if(t){var n=tr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<zs.length&&n!==0&&n<zs[a].priority;a++);zs.splice(a,0,t),a===0&&Px(t)}};var Gx=e.version;if(Gx!=="19.2.3")throw Error(s(527,Gx,"19.2.3"));z.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?x(t):null,t=t===null?null:t.stateNode,t};var iS={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:D,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var du=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!du.isDisabled&&du.supportsFiber)try{de=du.inject(iS),pe=du}catch{}}return Pl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Wg,d=qg,y=$g;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Rx(t,1,!1,null,null,a,o,null,u,d,y,zx),t[Oi]=n.current,Vd(t),new lh(n)},Pl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Wg,y=qg,C=$g,G=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(G=a.formState)),n=Rx(t,1,!0,n,a??null,o,u,G,d,y,C,zx),n.context=Cx(null),a=n.current,o=Gi(),o=Ia(o),u=Ms(o),u.callback=null,Ts(a,u,o),a=o,n.current.lanes=a,ot(n,a),Sa(n),t[Oi]=n.current,Vd(t),new fu(n)},Pl.version="19.2.3",Pl}var Kx;function mS(){if(Kx)return fh.exports;Kx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),fh.exports=pS(),fh.exports}var gS=mS();const xS=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),_S=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),Zx=r=>{const e=_S(r);return e.charAt(0).toUpperCase()+e.slice(1)},wv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),vS=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var bS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const yS=we.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>we.createElement("svg",{ref:m,...bS,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:wv("lucide",l),...!c&&!vS(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,x])=>we.createElement(p,x)),...Array.isArray(c)?c:[c]]));const In=(r,e)=>{const i=we.forwardRef(({className:s,...l},c)=>we.createElement(yS,{ref:c,iconNode:e,className:wv(`lucide-${xS(Zx(r))}`,`lucide-${r}`,s),...l}));return i.displayName=Zx(r),i};const SS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Wl=In("arrow-right",SS);const ES=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],Wp=In("brain-circuit",ES);const MS=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],TS=In("camera",MS);const AS=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ar=In("check",AS);const wS=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Rv=In("chevron-down",wS);const RS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Vi=In("circle-check",RS);const CS=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],$l=In("copy",CS);const NS=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Qx=In("download",NS);const OS=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],DS=In("file-text",OS);const LS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Kl=In("globe",LS);const US=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Zh=In("image",US);const IS=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Xi=In("loader-circle",IS);const PS=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],FS=In("log-out",PS);const BS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],zS=In("plus",BS);const GS=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Jx=In("refresh-cw",GS);const HS=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Cv=In("sparkles",HS);const kS=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],VS=In("square",kS);const jS=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Zl=In("trash-2",jS);const XS=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Nv=In("triangle-alert",XS);const YS=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Qh=In("wand-sparkles",YS);const WS=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],$u=In("zap",WS);var e_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(e_||(e_={}));var t_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(t_||(t_={}));var n_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(n_||(n_={}));const i_=["user","model","function","system"];var a_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(a_||(a_={}));var s_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(s_||(s_={}));var r_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(r_||(r_={}));var o_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(o_||(o_={}));var ql;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(ql||(ql={}));var l_;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(l_||(l_={}));var c_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(c_||(c_={}));var u_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(u_||(u_={}));class fi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class So extends fi{constructor(e,i){super(e),this.response=i}}class Ov extends fi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class Zs extends fi{}class Dv extends fi{}const qS="https://generativelanguage.googleapis.com",$S="v1beta",KS="0.24.1",ZS="genai-js";var Or;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Or||(Or={}));class QS{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||$S;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||qS}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function JS(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${ZS}/${KS}`),e.join(" ")}async function eE(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",JS(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new Zs(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new Zs(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new Zs(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function tE(r,e,i,s,l,c){const f=new QS(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},sE(c)),{method:"POST",headers:await eE(f),body:l})}}async function ic(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await tE(r,e,i,s,l,c);return nE(h,m,f)}async function nE(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){iE(l,r)}return s.ok||await aE(s,r),s}function iE(r,e){let i=r;throw i.name==="AbortError"?(i=new Dv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Ov||r instanceof Zs||(i=new fi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function aE(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Ov(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function sE(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function qp(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new So(`${Ws(r)}`,r);return rE(r)}else if(r.promptFeedback)throw new So(`Text not available. ${Ws(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new So(`${Ws(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),f_(r)[0]}else if(r.promptFeedback)throw new So(`Function call not available. ${Ws(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new So(`${Ws(r)}`,r);return f_(r)}else if(r.promptFeedback)throw new So(`Function call not available. ${Ws(r)}`,r)},r}function rE(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function f_(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const oE=[ql.RECITATION,ql.SAFETY,ql.LANGUAGE];function zu(r){return!!r.finishReason&&oE.includes(r.finishReason)}function Ws(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];zu(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Ql(r){return this instanceof Ql?(this.v=r,this):new Ql(r)}function lE(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(b){return new Promise(function(M,R){c.push([g,b,M,R])>1||h(g,b)})})}function h(g,b){try{m(s[g](b))}catch(M){_(c[0][3],M)}}function m(g){g.value instanceof Ql?Promise.resolve(g.value.v).then(p,x):_(c[0][2],g)}function p(g){h("next",g)}function x(g){h("throw",g)}function _(g,b){g(b),c.shift(),c.length&&h(c[0][0],c[0][1])}}const d_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function cE(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=dE(e),[s,l]=i.tee();return{stream:fE(s),response:uE(l)}}async function uE(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return qp(hE(e));e.push(l)}}function fE(r){return lE(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Ql(i.read());if(l)break;yield yield Ql(qp(s))}})}function dE(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new fi("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(d_),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new fi(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(d_)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new Dv("Request aborted when reading from the stream"):h=new fi("Error reading from the stream"),h})}}})}function hE(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Lv(r,e,i,s){const l=await ic(e,Or.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return cE(l)}async function Uv(r,e,i,s){const c=await(await ic(e,Or.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:qp(c)}}function Iv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Jl(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return pE(e)}function pE(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new fi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new fi("No content is provided for sending chat message.");return s?e:i}function mE(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new Zs("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=Jl(r);s.contents=[c]}return{generateContentRequest:s}}function h_(r){let e;return r.contents?e=r:e={contents:[Jl(r)]},r.systemInstruction&&(e.systemInstruction=Iv(r.systemInstruction)),e}function gE(r){return typeof r=="string"||Array.isArray(r)?{content:Jl(r)}:r}const p_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],xE={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function _E(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new fi(`First content should be with role 'user', got ${s}`);if(!i_.includes(s))throw new fi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(i_)}`);if(!Array.isArray(l))throw new fi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new fi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of p_)m in h&&(c[m]+=1);const f=xE[s];for(const h of p_)if(!f.includes(h)&&c[h]>0)throw new fi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function m_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const g_="SILENT_ERROR";class vE{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(_E(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Jl(e),x={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},_=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>Uv(this._apiKey,this.model,x,_)).then(b=>{var M;if(m_(b.response)){this._history.push(p);const R=Object.assign({parts:[],role:"model"},(M=b.response.candidates)===null||M===void 0?void 0:M[0].content);this._history.push(R)}else{const R=Ws(b.response);R&&console.warn(`sendMessage() was unsuccessful. ${R}. Inspect response object for details.`)}g=b}).catch(b=>{throw this._sendPromise=Promise.resolve(),b}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Jl(e),x={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},_=Object.assign(Object.assign({},this._requestOptions),i),g=Lv(this._apiKey,this.model,x,_);return this._sendPromise=this._sendPromise.then(()=>g).catch(b=>{throw new Error(g_)}).then(b=>b.response).then(b=>{if(m_(b)){this._history.push(p);const M=Object.assign({},b.candidates[0].content);M.role||(M.role="model"),this._history.push(M)}else{const M=Ws(b);M&&console.warn(`sendMessageStream() was unsuccessful. ${M}. Inspect response object for details.`)}}).catch(b=>{b.message!==g_&&console.error(b)}),g}}async function bE(r,e,i,s){return(await ic(e,Or.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function yE(r,e,i,s){return(await ic(e,Or.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function SE(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await ic(e,Or.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class x_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Iv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=h_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Uv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=h_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Lv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new vE(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=mE(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return bE(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=gE(e),l=Object.assign(Object.assign({},this._requestOptions),i);return yE(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return SE(this.apiKey,this.model,e,s)}}class EE{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new fi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new x_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new Zs("Cached content must contain a `name` field.");if(!e.model)throw new Zs("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new Zs(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new x_(this.apiKey,c,s)}}const Pv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",ME=["gemini-3.5-flash","gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],TE=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3.5-flash","gemini-3-flash-preview","gemini-2.5-flash-lite"];let Vo="";const Gu=r=>{Vo=r},$p=()=>Vo,Fv=async()=>{if(!Vo)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Pv}/v1beta/models?key=${Vo}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Bv=async(r,e=null,i=null,s)=>{if(!Vo)throw new Error("API Key is initialized.");const l=new EE(Vo),c=e&&e.length>0?TE:ME;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let x=[];i&&x.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&x.push(...e),x.push({text:r});const _={model:p},g=l.getGenerativeModel(_,{apiVersion:"v1beta",baseUrl:Pv}),b=new Promise((L,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),M=e&&e.length>0?[]:[{googleSearch:{}}];let R;try{R=await Promise.race([g.generateContent({contents:[{role:"user",parts:x}],tools:M,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),b])}catch(L){if(M.length>0)console.warn(`[API] Grounding failed for ${p} (${L.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),R=await g.generateContent({contents:[{role:"user",parts:x}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw L}const E=R.response,S=E.candidates||[];if(!S.length)throw E.promptFeedback&&(console.warn("Prompt Feedback:",E.promptFeedback),E.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${E.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=S[0];let U="";try{U=E.text()}catch(L){console.warn(L)}const I=N.content?.parts||[];let k="";if(I.forEach(L=>{L.thought&&(k+=L.thought)}),!U){const L=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${L}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${L})`),new Error(`Empty response (FinishReason: ${L}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:U,thought:k||"通常処理が完了しました。",model:p}}catch(x){console.warn(`Model ${p} failed:`,x.message),x.message.includes("429")||x.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!x.message.includes("フィルター検知")&&!x.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${x.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Fv();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},AE=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Bv,diagnoseConnection:Fv,getApiKey:$p,setApiKey:Gu},Symbol.toStringTag,{value:"Module"})),wE="modulepreload",RE=function(r,e){return new URL(r,e).href},__={},CE=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(x){return Promise.all(x.map(_=>Promise.resolve(_).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(x=>{if(x=RE(x,s),x in __)return;__[x]=!0;const _=x.endsWith(".css"),g=_?'[rel="stylesheet"]':"";if(s)for(let M=f.length-1;M>=0;M--){const R=f[M];if(R.href===x&&(!_||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${x}"]${g}`))return;const b=document.createElement("link");if(b.rel=_?"stylesheet":wE,_||(b.as="script"),b.crossOrigin="",b.href=x,m&&b.setAttribute("nonce",m),document.head.appendChild(b),_)return new Promise((M,R)=>{b.addEventListener("load",M),b.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${x}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},NE=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],OE=async(r,e,i=[])=>{const s=$p();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of NE)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,x;if(f.startsWith("gemini")){const _=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(b=>{const M=b.includes(",")?b.split(",")[1]:b,R=b.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:R?R[1]:"image/png",data:M}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:_}}),signal:h.signal}),clearTimeout(m),x=await p.json(),x.error)throw new Error(`${x.error.message} (Code: ${x.error.code})`);if(x.candidates&&x.candidates.length>0&&x.candidates[0].content&&x.candidates[0].content.parts){const b=x.candidates[0].content.parts.find(M=>M.inlineData);if(b&&b.inlineData&&b.inlineData.data)return{base64Img:b.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),x=await p.json(),x.error)throw new Error(`${x.error.message} (Code: ${x.error.code})`);if(x.predictions&&x.predictions[0]&&x.predictions[0].bytesBase64Encoded)return{base64Img:x.predictions[0].bytesBase64Encoded,usedModel:f};if(x.predictions&&x.predictions[0]&&typeof x.predictions[0]=="string")return{base64Img:x.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await CE(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>AE);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let zv="";const mh=r=>{zv=r},Ku=()=>zv,DE=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=Ku();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},LE=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],UE=["gpt-4.1","gpt-4o","gpt-4.1-mini"],IE=async(r,e=null,i=null,s)=>{const l=Ku();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?UE:LE;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0)for(const E of e)E.inlineData&&(p.push({type:"image_url",image_url:{url:`data:${E.inlineData.mimeType};base64,${E.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const x=new AbortController,_=setTimeout(()=>x.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:x.signal})}catch(E){throw E.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):E}finally{clearTimeout(_)}if(!g.ok){const S=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${S}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const M=(await g.json()).choices?.[0];if(!M||!M.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const R=M.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:R,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let Jh="gemini";const gh=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),Jh="gemini";return}Jh=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},Dr=async(r,e=null,i=null,s)=>Jh==="openai"?IE(r,e,i,s):Bv(r,e,i,s),PE={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},FE={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},BE=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],zE=r=>{const e=FE[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...BE].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},GE=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(PE)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r},jl="v3.87-alpha",Gv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},HE=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],kE=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,Ni={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Ni.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"};Ni.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"};Ni.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"};Ni.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"};Ni.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"};Ni.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"};Ni.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"};Ni.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"};Ni.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"};Ni.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"};Ni.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"};Ni.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const VE=["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"],jE={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},XE=`
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
    `,YE=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`,xh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},WE=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},qE=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},$E=(r,e,i,s,l=640,c=480)=>new Promise((f,h)=>{const m=new Image;m.onload=()=>{try{const p=document.createElement("canvas");p.width=l,p.height=c;const x=p.getContext("2d"),_=m.width,g=m.height,M=(e%360+360)%360/360*_,R=s/360*_,E=g/2-i/180*g,S=R*(c/l),N=M-R/2,U=Math.max(0,Math.min(g-S,E-S/2)),I=Math.min(S,g);if(N>=0&&N+R<=_)x.drawImage(m,N,U,R,I,0,0,l,c);else if(N<0){const k=-N,L=R-k,B=L/R;x.drawImage(m,_-k,U,k,I,0,0,l*(1-B),c),x.drawImage(m,0,U,L,I,l*(1-B),0,l*B,c)}else{const k=_-N,L=R-k,B=k/R;x.drawImage(m,N,U,k,I,0,0,l*B,c),x.drawImage(m,0,U,L,I,l*B,0,l*(1-B),c)}f(p.toDataURL("image/jpeg",.85))}catch(p){h(p)}},m.onerror=()=>h(new Error("画像の読み込みに失敗しました")),m.src=r}),KE=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,ZE=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},QE=()=>`
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
      `,JE=(r,e)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

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

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`,eM=({randomCategory:r,targetDate:e,inputMode:i,manualTopic:s,newsContext:l,searchTopicKeywords:c,bg360Image:f,bg360Analysis:h,bg360Enabled:m,customLocation:p,forcedLocation:x,customOutfit:_,ragLocationDetails:g,ragReactions:b,punchlineType:M})=>`
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
        
        ${f&&h&&m?`
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
           - **指定場所: 「${f&&h&&m?h.location:p.trim()?p.trim():"ニュース内容に即した場所"}」**
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
            
            ${b}

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
          Location: [${p.trim()?"必ず『"+p.trim()+"』にせよ":"ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
          Outfit: [${_.trim()?"必ず『"+_.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
          Punchline: [${M!=="Auto"?"必ず『"+Gv(M)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
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
          `,tM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。


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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,nM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,iM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,enableChatGPTMode:p,VAR_CAST_LIST_CHATGPT:x,identityMatrix:_,activeOutfit:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4&&!p?`
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
`:"",R=g?`- IGNORE reference clothing. All characters MUST wear exactly: ${g}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels.";return`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

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
${R}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${x}
- Identity Anchor: ${_}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. Preserve exact hair color, eye color, and skin tone in every panel.

PANEL DESCRIPTIONS:

${b}

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
`},aM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,VAR_CAST_LIST:p,identityMatrix:x,activeOutfit:_,dynamicCamera:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4?`
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
`:"",R=_?`
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
${R}
Cast:
${p}
${E}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${x}
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


${b}

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
      `},ep=r=>{const e=[];let i=null;if(r.split(`
`).forEach(l=>{const c=l.replace(/\*\*/g,"").trim();if(c.startsWith("## ")){i&&e.push(i);const _=c.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();i={name:_,shortName:_.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!i)return;if(c.includes("髪")||c.toLowerCase().includes("hair")){const _=c.match(/\[WEIGHTS?\]:\s*(.*)/i),g=_?_[1].replace(/\|/g,""):c,b=g.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);b&&!i.hairColor&&(i.hairColor=b[1]);const M=g.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),R=g.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);i.hairStyle||(M?i.hairStyle=M[1]:R&&(i.hairStyle=R[1]))}const f=c.toLowerCase(),h=/\(no[\s_-]*glasses/i.test(f),m=/\([^)]*glasses[\s:]/i.test(f)&&!h;i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES"||(h?i.glasses="LOCKED_NO":m&&(i.glasses="LOCKED_YES")),!(i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES")&&(c.includes("眼鏡")||c.includes("メガネ")||f.includes("eyewear"))&&(f.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(c)?i.glasses="NO":(/(?:あり|有り|有|着用)/i.test(c)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(f))&&(i.glasses="YES"))}),i&&e.push(i),console.log("[IDENTITY MATRIX] Glasses detection results:"),e.forEach(l=>{console.log(`  ${l.shortName}: glasses=${l.glasses}, hair=${l.hairColor} ${l.hairStyle}`)}),e.length===0)return"";let s=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return s+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,e.forEach(l=>{const c=[];l.hairColor&&c.push(`${l.hairColor} hair`),l.hairStyle&&c.push(l.hairStyle),l.glasses==="YES"||l.glasses==="LOCKED_YES"?c.push("MUST HAVE glasses (do NOT remove)"):l.glasses==="NO"||l.glasses==="LOCKED_NO"?c.push("MUST NOT have glasses (bare eyes)"):c.push("check reference image for glasses status"),s+=`- [${l.shortName}]: ${c.join(", ")||"see reference image"}
`}),s+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,s+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,s},Eo=(r,e)=>{const s=ep(e).split(`
`).find(l=>l.includes(`[${r}]`));return s?s.split(":").slice(1).join(":").trim():""},sM=(r,e,i)=>{const s=r.match(/\[Camera:\s*(.*?)\]/i);if(s&&s[1]){const c=s[1].trim();let f="";for(const[h,m]of Object.entries(jE))if(c.includes(h)){f=m;break}return f?`${f}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const l=e[i.index%e.length];return i.index++,l},rM=r=>r.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),oM=(r,e)=>{const i=r.match(/\[Camera:\s*(.*?)\]/i);if(i&&i[1])return i[1].trim();const s=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return s[e.index%s.length]},v_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();s.push(m);const p=m.split(/[\(]/)[0].trim();p&&p!==m&&s.push(p);const x=m.match(/[\(]\s*(.*?)\s*[\)]/);x&&s.push(x[1].trim())}});const l=[];let c=1;if(i.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);let m=!1,p=f;if(h&&h[1].trim()){let _=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const g=/[がをにでへはもとからまでより]/.test(_)&&_.length>5,b=_.length>20,M=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(_),R=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(_),E=/[（(]\s*リアクション/i.test(h[1]);g||b||M||R||E||(s.some(S=>{const N=S.split(/[（(]/)[0].trim();return _===S||_===N||N===_||_.includes(N)})||_.includes("全員")||_==="Speaker"||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&(m=!0)}else if(f.trim().startsWith("「")){const x=f.trim();/^「[^」]+」[？！。、!?\s]*$/.test(x)&&(m=!0)}m&&(p=p.replace(/^.*?(?:[:：]|「)\s*/,""),p=p.trim(),p=p.replace(/^「+/,"").replace(/」+$/,""),p=p.replace(/（.*?）|\(.*?\)/g,""),p=p.trim(),p&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++))}),l.length===0){const f=r.match(/「([^」]+)」/g);f&&f.length>0&&f.forEach(h=>{let m=h.replace(/^「/,"").replace(/」$/,"").trim();m=m.replace(/（.*?）|\(.*?\)/g,"").trim();const p=s.filter(g=>{const b=g.split(/[\(（]/)[0].trim();return b&&m.includes(b)}),x=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(m),_=p.length>=2&&x&&m.length>15;m&&!_&&(l.push(`(Speech Bubble ${c}: "${m}")`),c++)})}return l.length===0?"(Characters interact without dialogue in this panel)":l.join(", ")},b_=(r,e,i="")=>{const s=r.split(`
`),l=[];e.split(`
`).forEach(h=>{const m=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(m){const p=m[1].trim();l.push(p);const x=p.split(/[\(]/)[0].trim();x&&x!==p&&l.push(x);const _=p.match(/[\(]\s*(.*?)\s*[\)]/);_&&l.push(_[1].trim())}});let f=s.filter(h=>{const m=h.match(/^(.*?)(?:[:：]|「)/);let p=!1;if(m&&m[1].trim()){let g=m[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();g=g.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const b=/[がをにでへはもとからまでより]/.test(g)&&g.length>5,M=g.length>12,R=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(g),E=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(g.replace(/[（(].*$/,"").trim()),S=/[（(]\s*リアクション/i.test(m[1]);b||M||R||E||S||(l.some(N=>g.includes(N)||N.includes(g))||g==="全員"||g==="Speaker"||m[0].trim().endsWith(":")||m[0].trim().endsWith("："))&&(p=!0)}else if(h.trim().startsWith("「")){const g=h.trim();/^「[^」]+」[？！。、!?\s]*$/.test(g)&&(p=!0)}const x=h.match(/^\[\d+コマ目/),_=h.trim()==="";return!p&&!x&&!_}).join(" ").trim();return f=f.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),f=f.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),f=f||"Characters interacting dynamically based on dialogue.",i&&l.forEach(h=>{const m=h.split("(")[0].trim();i.includes(m)}),f},y_=(r,e)=>e?`(All characters are wearing ${e}) ${r}`:r,hu=(r,e)=>{const s=r.split(`
`).filter(f=>{const h=f.trim();return/^\[EMOTION:/i.test(h)||/^状況[：:]/i.test(h)?!1:h.includes("：")||h.includes(":")||h.includes("「")}),l=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();l.push(m);const p=m.split(/[（(]/)[0].trim();p&&p!==m&&l.push(p)}});const c=[];if(s.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){let m=h[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const p=/[がをにでへはもとからまでより]/.test(m)&&m.length>5,x=m.length>12,_=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(m),g=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(m.replace(/[（(].*$/,"").trim()),b=/[（(]\s*リアクション/i.test(h[1]);if(p||x||_||g||b)return;m&&!c.includes(m)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(m)&&(l.some(M=>{const R=M.split(/[（(]/)[0].trim();return m===M||m===R||R===m})||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&c.push(m)}}),c.length>=3){const f=Eo(c[0],e),h=Eo(c[1],e),m=Eo(c[2],e);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${c[0]}] (${f||"see reference"}) — First speaker
- CENTER ZONE: [${c[1]}] (${h||"see reference"}) — Second speaker
- LEFT ZONE: [${c[2]}] (${m||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${c[0]}] MUST be on the RIGHT third of the panel.
- [${c[1]}] MUST be in the CENTER of the panel.
- [${c[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${c[0]}]'s bubble on the RIGHT, [${c[1]}]'s in CENTER, [${c[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(c.length>=2){const f=Eo(c[0],e),h=Eo(c[1],e);return`CRITICAL PLACEMENT & IDENTITY:
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
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(c.length===1){const f=Eo(c[0],e);return`CRITICAL PLACEMENT & IDENTITY: [${c[0]}] (${f||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},S_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(_=>{const g=_.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(g){const M=g[1].trim().split("(")[0].trim().split("（")[0].trim();M&&s.push(M)}});const l=[];i.forEach(_=>{const g=_.match(/^(.*?)(?:[:：]|「)/);if(g&&g[1].trim()){let b=g[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();b&&!l.includes(b)&&s.includes(b)&&l.push(b)}});const c=[...l],f=r;s.forEach(_=>{!c.includes(_)&&f.includes(_)&&c.push(_)});let h=0;i.forEach(_=>{const g=_.trim();(g.includes("「")&&g.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(g))&&h++});const m=l.slice(0,3).map(_=>`[${_}]`),p=s.filter(_=>!c.includes(_));p.length>0&&p.forEach(_=>{c.includes(_)||c.push(_)});const x=c.map(_=>`[${_}]`);if(m.length>0){let _=`ANTI-CLONE REMINDER: ${x.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;c.length===1&&h<=1?_+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${x[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${x[0]}. Leave the surrounding space empty rather than adding people.`:c.length===1&&h>=2&&(_+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${x[0]} (monologue/soliloquy). Draw only ${x[0]} — do NOT add a second character just because there are multiple bubbles.`);const g=m.join(" and "),b=x.filter(E=>!m.includes(E)),M=b.length>0?b.join(", "):"NO ONE ELSE",R=`
FOREGROUND MUST CONTAIN ONLY: ${g}.
BACKGROUND MUST CONTAIN ONLY: ${M}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${c.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${g} are the main focus.
${_}${R}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."},lM=r=>{const e=r.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(e){const i=e[1].toUpperCase();if(Ni[i])return i}return"NORMAL"},E_=r=>{const e=lM(r);if(e==="NORMAL")return"";const i=Ni[e],s=[];if(r.split(`
`).forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){const m=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();m&&!s.includes(m)&&s.push(m)}}),s.length>=2&&i.styleMulti){let f=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.styleMulti}`;return i.proportionsMulti&&(f+=`
PROPORTION OVERRIDE: ${i.proportionsMulti}`),i.vfxMulti&&(f+=`
VFX: ${i.vfxMulti}`),f}let c=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.style}`;return i.proportions&&(c+=`
PROPORTION OVERRIDE: ${i.proportions}`),i.vfx&&(c+=`
VFX: ${i.vfx}`),c},cM=(r,e)=>{let i="",s="";const l=r.split(`
`);for(let c=0;c<l.length;c++){const f=l[c].replace(/\*\*/g,"").trim();if(f.startsWith("## ")&&(s=f.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),i+=`
- Character [${s}]: `),!s||e&&(f.includes("服装")||f.includes("Outfit")))continue;const h=f.match(/\[WEIGHTS?\]:\s*(.*)/i);if(h){let p=h[1].replace(/\|/g,"").trim();p&&p!=="()"&&p!=="-"&&(i+=p+", ");continue}const m=f.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);m&&m.length>=2&&(i+=m.join(", ")+", ")}return i.trim()||(i=r.trim()),i.trim()},uM=r=>{const e=[...r];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e},pu=(r,e,i)=>{const s=new RegExp(`\\[${e}.*?\\]([\\s\\S]*?)(?=\\[${i}|$)`,"i"),l=r.match(s);return l?l[1].trim():""},fM=({scenario:r,castList:e,colorMode:i,enableChatGPTMode:s,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,punchlineType:m,systemVersion:p})=>{let x=i==="monochrome";if(i==="auto"){const K=e.toLowerCase();x=K.includes("style_tag: monochrome")||K.includes("monochrome")||K.includes("greyscale")||K.includes("screentone")}const _=x?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",g=XE;let b=r.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||r.split(`
`)[0].substring(0,20);b=b.replace(/^Topic:\s*/i,"").trim();const M=r.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),R=r.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),E=M||"Generic Detailed Background",S=R&&!/^(なし|キャラシート準拠|none|default)/i.test(R)?R:"",N=r.replace(/```(?:json|markdown)?/gi,"").trim(),U=pu(N,"1コマ目","2コマ目")||N,I=pu(N,"2コマ目","3コマ目"),k=pu(N,"3コマ目","4コマ目"),L=pu(N,"4コマ目","UNKNOWN"),B=uM(VE).slice(0,4),A={index:0},F=cM(e,S),j=s?rM(F):F,H=E,q=b||"4-koma Manga",se=s?`Generated by ChatGPT with Super FURU AI 4-koma ${p}`:`Generated by Super FURU AI 4-koma ${p}`;let ee="";const V=[U,I,k,L];let D="";s?(D=V.map((K,ue)=>`## Panel ${ue+1}
${E_(K)}
${hu(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
${S_(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
Camera: ${oM(K,A)}
Action: ${y_(b_(K,e,hu(K,e)),S)}
Dialogue (Japanese text inside speech bubbles only): ${v_(K,e)}`).join(`

`),ee=iM({safeTopic:q,watermarkEng:se,styleCore:_,safeLocation:H,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,enableChatGPTMode:s,VAR_CAST_LIST_CHATGPT:j,identityMatrix:ep(e),activeOutfit:S,panelSections:D})):(D=V.map((ue,ge)=>`## Panel ${ge+1}
${E_(ue)}
${hu(ue,e)}
${S_(ue,e)}
Camera: ${sM(ue,B,A)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${y_(b_(ue,e,hu(ue,e)),S)}.
Dialogue (ONLY inside bubbles): ${v_(ue,e)}.`).join(`

`),ee=YE+aM({safeTopic:q,watermarkEng:se,styleCore:_,safeLocation:H,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,VAR_CAST_LIST:F,identityMatrix:ep(e),activeOutfit:S,dynamicCamera:g,panelSections:D}));let z=WE(ee.trim());return m==="Documentary"&&(z=qE(z)),z};async function dM({castList:r,categories:e,inputMode:i,manualTopic:s,searchTopic:l,targetDate:c,customLocation:f,customOutfit:h,punchlineType:m,bg360Image:p,bg360Analysis:x,bg360Enabled:_,bg360ImageParts:g,onProgress:b,onCameraProgress:M}){let R="";if(i==="manual")R="手動入力";else{const se=e.filter(ee=>ee.checked);se.length>0?R=se.map(ee=>ee.keywords).join(" "):R="最新ニュース"}const E=`${R} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let S="";if(i==="manual"){S=`
    【ユーザー提供トピック/URL】:
    ${s}
    
    (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
    URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
    `;const se=/(https?:\/\/[^\s]+)/g,ee=s.match(se);if(ee&&ee.length>0){b(`手動入力内にURLを検出: ${ee[0]}
> プロキシ経由でコンテンツを取得中...`);try{const V=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(ee[0])}`);if(!V.ok)throw new Error(`HTTP error! status: ${V.status}`);const D=await V.text(),K=new DOMParser().parseFromString(D,"text/html");K.querySelectorAll("script, style").forEach(_e=>_e.remove());const ge=K.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let P="";ge.forEach(_e=>{_e.textContent.trim()&&(P+=_e.textContent.trim()+`
`)}),P.trim()||(P=K.body.textContent||"");const Z=P.replace(/\s+/g," ").substring(0,3e3);b(`コンテンツ抽出完了 (${Z.length}文字)。注入中...`),S=`
        【指定URLから独自のスクレイピングで抽出した内容】:
        ${Z}
        
        (指示): 上記はユーザーが入力したURL（ ${ee[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
        `}catch(V){console.error("URL Fetch Error: ",V),b(`警告: URLコンテンツの取得に失敗しました (${V.message})。LLMの内部知識で補完します。`)}}}const N=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園 of the bench","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],U=N[Math.floor(Math.random()*N.length)],I=p&&x&&_?x.location:f.trim()?f.trim():U,k=zE(I),L=GE(),B=eM({randomCategory:R,targetDate:c,inputMode:i,manualTopic:s,newsContext:S,searchTopicKeywords:E,bg360Image:p,bg360Analysis:x,bg360Enabled:_,customLocation:f,forcedLocation:U,customOutfit:h,ragLocationDetails:k,ragReactions:L,punchlineType:m}),F=await Dr(B,g&&_?[g]:[],r,b);let j={topic:R,scenario:""};try{const se=F.text.match(/Topic:\s*(.+)/i),ee=F.text.match(/Logline:\s*(.+)/i),V=F.text.match(/Location:\s*(.+)/i),D=F.text.match(/Outfit:\s*(.+)/i),z=F.text.match(/Punchline:\s*(.+)/i),K=F.text.match(/Scenario:\s*([\s\S]+)/i);if(K)j.topic=se?se[1].trim():R,j.topic=j.topic.replace(/^Topic:\s*/i,"").trim(),j.logline=ee?ee[1].trim():"",j.location=V?V[1].trim():"Generic Background",j.outfit=D?D[1].trim():"",j.punchline=z?z[1].trim():"",j.scenario=K[1].trim();else{const ue=F.text.match(/\{[\s\S]*\}/);if(ue){const ge=JSON.parse(ue[0]);j.topic=ge.topic||R,j.location=ge.location||"Generic Background",j.scenario=ge.scenario||F.text}else{if(F.text.length<20)throw new Error("AI returned empty or invalid response.");j.topic=i==="manual"?s||"Custom Scenario":l||"Generated Scenario",j.scenario=F.text}}}catch(se){console.warn("Parse warning:",se),j.scenario=F.text,j.topic="Generated Scenario"}let H=null,q=null;if(p&&x&&_&&g)try{M("🎬 [360° Camera AI] カメラワーク自律設計を開始...");const se=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${j.scenario}

【360°背景の解析情報】
- 場所: ${x.location}
- 光源: ${x.lighting}
- 空間タイプ: ${x.spatialType}
- 特徴物: ${x.objects||"なし"}
- 雰囲気: ${x.mood||"不明"}

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
}`,V=(await Dr(se,[g],null,M)).text.match(/\{[\s\S]*\}/)?.[0];if(V){H=JSON.parse(V),M("🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中..."),q=[];for(const D of H.panels){const z=await $E(p,D.yaw,D.pitch||0,D.fov||90);q.push(z)}}}catch(se){console.warn("[360° Camera AI] Camera work design failed:",se),M(`⚠️ [Camera AI] カメラワーク設計に失敗しました: ${se.message}`)}return{topic:j.topic,logline:j.logline,location:j.location,outfit:j.outfit,punchline:j.punchline,scenario:j.scenario,cameraWork:H,croppedPanels:q,usedModel:F.model}}async function hM({scenario:r,enhanceCategories:e,castList:i,onProgress:s}){const l=JE(r,e),c=await Dr(l,[],i,s);return{text:c.text.trim(),usedModel:c.model}}async function pM({finalPrompt:r,policyErrorMsg:e,onProgress:i,selectedEngine:s}){if(!r||!e)throw new Error("プロンプトとエラーメッセージが必要です。");i("[Phase 1/5] エラーメッセージを解析中..."),i("[Phase 2/5] 問題箇所の特定をAIにリクエスト中...");const l=tM(e.trim(),r),c=await Dr(l,[],null,i);if(i("[Phase 3/5] AIの応答を受信・解析中..."),!c.text||c.text.trim().length<10)throw new Error("AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。");i("[Phase 4/5] 置換テーブルをプロンプトに適用中...");let f=[],h=!1;try{let x=c.text.trim();const _=x.match(/```(?:json)?\s*([\s\S]*?)```/);_&&(x=_[1].trim());const g=x.indexOf("["),b=x.lastIndexOf("]");g!==-1&&b!==-1&&(x=x.substring(g,b+1)),f=JSON.parse(x),h=Array.isArray(f)&&f.length>0}catch(x){console.warn("JSON parse error, falling back to full regeneration:",x)}if(h){let x=r,_=0,g=0;for(const b of f)!b.from||!b.to||(x.includes(b.from)?(x=x.replace(b.from,b.to),_++,i(`✅ "${b.from.substring(0,40)}..." → "${b.to.substring(0,40)}..." (${b.reason||""})`)):(g++,i(`⚠️ 未発見（スキップ）: "${b.from.substring(0,50)}..."`)));if(_>0)return{success:!0,method:"replacement",modifiedPrompt:x,appliedCount:_,failedCount:g}}i("[Fallback] 全文再生成モードで修正中...");const m=nM(e.trim(),r),p=await Dr(m,[],null,i);if(p.text&&p.text.length>100)return{success:!0,method:"regeneration",modifiedPrompt:p.text.trim()};throw new Error("フォールバックでも適切な応答が得られませんでした。")}const Zu=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=we.useRef(null);we.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:v.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[v.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),v.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[v.jsx(Wp,{size:16})," Neural Process (Thinking Mode)"]}),v.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&v.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};const Kp="184",Go={ROTATE:0,DOLLY:1,PAN:2},zo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mM=0,M_=1,gM=2,Hu=1,xM=2,Xl=3,Qs=0,Ci=1,us=2,ds=0,Ho=1,T_=2,A_=3,w_=4,_M=5,wr=100,vM=101,bM=102,yM=103,SM=104,EM=200,MM=201,TM=202,AM=203,tp=204,np=205,wM=206,RM=207,CM=208,NM=209,OM=210,DM=211,LM=212,UM=213,IM=214,ip=0,ap=1,sp=2,jo=3,rp=4,op=5,lp=6,cp=7,Hv=0,PM=1,FM=2,Ra=0,kv=1,Vv=2,jv=3,Xv=4,Yv=5,Wv=6,qv=7,$v=300,Lr=301,Xo=302,ku=303,_h=304,sf=306,up=1e3,fs=1001,fp=1002,si=1003,BM=1004,mu=1005,di=1006,vh=1007,Cr=1008,aa=1009,Kv=1010,Zv=1011,ec=1012,Zp=1013,Oa=1014,Aa=1015,ps=1016,Qp=1017,Jp=1018,tc=1020,Qv=35902,Jv=35899,eb=1021,tb=1022,pa=1023,ms=1026,Nr=1027,nb=1028,em=1029,Ur=1030,tm=1031,nm=1033,Vu=33776,ju=33777,Xu=33778,Yu=33779,dp=35840,hp=35841,pp=35842,mp=35843,gp=36196,xp=37492,_p=37496,vp=37488,bp=37489,Qu=37490,yp=37491,Sp=37808,Ep=37809,Mp=37810,Tp=37811,Ap=37812,wp=37813,Rp=37814,Cp=37815,Np=37816,Op=37817,Dp=37818,Lp=37819,Up=37820,Ip=37821,Pp=36492,Fp=36494,Bp=36495,zp=36283,Gp=36284,Ju=36285,Hp=36286,zM=3200,R_=0,GM=1,$s="",ji="srgb",ef="srgb-linear",tf="linear",rn="srgb",Mo=7680,C_=519,HM=512,kM=513,VM=514,im=515,jM=516,XM=517,am=518,YM=519,N_=35044,O_="300 es",wa=2e3,nf=2001;function WM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function nc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function qM(){const r=nc("canvas");return r.style.display="block",r}const D_={};function L_(...r){const e="THREE."+r.shift();console.log(e,...r)}function ib(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function dt(...r){r=ib(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function qt(...r){r=ib(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function kp(...r){const e=r.join(" ");e in D_||(D_[e]=!0,dt(...r))}function $M(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const KM={[ip]:ap,[sp]:lp,[rp]:cp,[jo]:op,[ap]:ip,[lp]:sp,[cp]:rp,[op]:jo};class er{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const ci=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wu=Math.PI/180,Vp=180/Math.PI;function ac(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(ci[r&255]+ci[r>>8&255]+ci[r>>16&255]+ci[r>>24&255]+"-"+ci[e&255]+ci[e>>8&255]+"-"+ci[e>>16&15|64]+ci[e>>24&255]+"-"+ci[i&63|128]+ci[i>>8&255]+"-"+ci[i>>16&255]+ci[i>>24&255]+ci[s&255]+ci[s>>8&255]+ci[s>>16&255]+ci[s>>24&255]).toLowerCase()}function Ut(r,e,i){return Math.max(e,Math.min(i,r))}function ZM(r,e){return(r%e+e)%e}function bh(r,e,i){return(1-i)*r+i*e}function Fl(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const QM={DEG2RAD:Wu},fm=class fm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Ut(this.x,e.x,i.x),this.y=Ut(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Ut(this.x,e,i),this.y=Ut(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ut(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ut(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fm.prototype.isVector2=!0;let Ct=fm;class Js{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],x=s[l+2],_=s[l+3],g=c[f+0],b=c[f+1],M=c[f+2],R=c[f+3];if(_!==R||m!==g||p!==b||x!==M){let E=m*g+p*b+x*M+_*R;E<0&&(g=-g,b=-b,M=-M,R=-R,E=-E);let S=1-h;if(E<.9995){const N=Math.acos(E),U=Math.sin(N);S=Math.sin(S*N)/U,h=Math.sin(h*N)/U,m=m*S+g*h,p=p*S+b*h,x=x*S+M*h,_=_*S+R*h}else{m=m*S+g*h,p=p*S+b*h,x=x*S+M*h,_=_*S+R*h;const N=1/Math.sqrt(m*m+p*p+x*x+_*_);m*=N,p*=N,x*=N,_*=N}}e[i]=m,e[i+1]=p,e[i+2]=x,e[i+3]=_}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],x=s[l+3],_=c[f],g=c[f+1],b=c[f+2],M=c[f+3];return e[i]=h*M+x*_+m*b-p*g,e[i+1]=m*M+x*g+p*_-h*b,e[i+2]=p*M+x*b+h*g-m*_,e[i+3]=x*M-h*_-m*g-p*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),x=h(l/2),_=h(c/2),g=m(s/2),b=m(l/2),M=m(c/2);switch(f){case"XYZ":this._x=g*x*_+p*b*M,this._y=p*b*_-g*x*M,this._z=p*x*M+g*b*_,this._w=p*x*_-g*b*M;break;case"YXZ":this._x=g*x*_+p*b*M,this._y=p*b*_-g*x*M,this._z=p*x*M-g*b*_,this._w=p*x*_+g*b*M;break;case"ZXY":this._x=g*x*_-p*b*M,this._y=p*b*_+g*x*M,this._z=p*x*M+g*b*_,this._w=p*x*_-g*b*M;break;case"ZYX":this._x=g*x*_-p*b*M,this._y=p*b*_+g*x*M,this._z=p*x*M-g*b*_,this._w=p*x*_+g*b*M;break;case"YZX":this._x=g*x*_+p*b*M,this._y=p*b*_+g*x*M,this._z=p*x*M-g*b*_,this._w=p*x*_-g*b*M;break;case"XZY":this._x=g*x*_-p*b*M,this._y=p*b*_-g*x*M,this._z=p*x*M+g*b*_,this._w=p*x*_+g*b*M;break;default:dt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],x=i[6],_=i[10],g=s+h+_;if(g>0){const b=.5/Math.sqrt(g+1);this._w=.25/b,this._x=(x-m)*b,this._y=(c-p)*b,this._z=(f-l)*b}else if(s>h&&s>_){const b=2*Math.sqrt(1+s-h-_);this._w=(x-m)/b,this._x=.25*b,this._y=(l+f)/b,this._z=(c+p)/b}else if(h>_){const b=2*Math.sqrt(1+h-s-_);this._w=(c-p)/b,this._x=(l+f)/b,this._y=.25*b,this._z=(m+x)/b}else{const b=2*Math.sqrt(1+_-s-h);this._w=(f-l)/b,this._x=(c+p)/b,this._y=(m+x)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,x=i._w;return this._x=s*x+f*h+l*p-c*m,this._y=l*x+f*m+c*h-s*p,this._z=c*x+f*p+s*m-l*h,this._w=f*x-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),x=Math.sin(p);m=Math.sin(m*p)/x,i=Math.sin(i*p)/x,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const dm=class dm{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(U_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(U_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),x=2*(h*i-c*l),_=2*(c*s-f*i);return this.x=i+m*p+f*_-h*x,this.y=s+m*x+h*p-c*_,this.z=l+m*_+c*x-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Ut(this.x,e.x,i.x),this.y=Ut(this.y,e.y,i.y),this.z=Ut(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Ut(this.x,e,i),this.y=Ut(this.y,e,i),this.z=Ut(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ut(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return yh.copy(this).projectOnVector(e),this.sub(yh)}reflect(e){return this.sub(yh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ut(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dm.prototype.isVector3=!0;let ae=dm;const yh=new ae,U_=new Js,hm=class hm{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const x=this.elements;return x[0]=e,x[1]=l,x[2]=h,x[3]=i,x[4]=c,x[5]=m,x[6]=s,x[7]=f,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],x=s[4],_=s[7],g=s[2],b=s[5],M=s[8],R=l[0],E=l[3],S=l[6],N=l[1],U=l[4],I=l[7],k=l[2],L=l[5],B=l[8];return c[0]=f*R+h*N+m*k,c[3]=f*E+h*U+m*L,c[6]=f*S+h*I+m*B,c[1]=p*R+x*N+_*k,c[4]=p*E+x*U+_*L,c[7]=p*S+x*I+_*B,c[2]=g*R+b*N+M*k,c[5]=g*E+b*U+M*L,c[8]=g*S+b*I+M*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8];return i*f*x-i*h*p-s*c*x+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8],_=x*f-h*p,g=h*m-x*c,b=p*c-f*m,M=i*_+s*g+l*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/M;return e[0]=_*R,e[1]=(l*p-x*s)*R,e[2]=(h*s-l*f)*R,e[3]=g*R,e[4]=(x*i-l*m)*R,e[5]=(l*c-h*i)*R,e[6]=b*R,e[7]=(s*m-p*i)*R,e[8]=(f*i-s*c)*R,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Sh.makeScale(e,i)),this}rotate(e){return this.premultiply(Sh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Sh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hm.prototype.isMatrix3=!0;let bt=hm;const Sh=new bt,I_=new bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),P_=new bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function JM(){const r={enabled:!0,workingColorSpace:ef,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===rn&&(l.r=hs(l.r),l.g=hs(l.g),l.b=hs(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===rn&&(l.r=ko(l.r),l.g=ko(l.g),l.b=ko(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===$s?tf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return kp("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return kp("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[ef]:{primaries:e,whitePoint:s,transfer:tf,toXYZ:I_,fromXYZ:P_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ji},outputColorSpaceConfig:{drawingBufferColorSpace:ji}},[ji]:{primaries:e,whitePoint:s,transfer:rn,toXYZ:I_,fromXYZ:P_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ji}}}),r}const kt=JM();function hs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ko(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let To;class eT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{To===void 0&&(To=nc("canvas")),To.width=e.width,To.height=e.height;const l=To.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=To}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=nc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=hs(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(hs(i[s]/255)*255):i[s]=hs(i[s]);return{data:i,width:e.width,height:e.height}}else return dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let tT=0;class sm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tT++}),this.uuid=ac(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Eh(l[f].image)):c.push(Eh(l[f]))}else c=Eh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Eh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?eT.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(dt("Texture: Unable to serialize Texture."),{})}let nT=0;const Mh=new ae;class hi extends er{constructor(e=hi.DEFAULT_IMAGE,i=hi.DEFAULT_MAPPING,s=fs,l=fs,c=di,f=Cr,h=pa,m=aa,p=hi.DEFAULT_ANISOTROPY,x=$s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=ac(),this.name="",this.source=new sm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mh).x}get height(){return this.source.getSize(Mh).y}get depth(){return this.source.getSize(Mh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){dt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$v)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case up:e.x=e.x-Math.floor(e.x);break;case fs:e.x=e.x<0?0:1;break;case fp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case up:e.y=e.y-Math.floor(e.y);break;case fs:e.y=e.y<0?0:1;break;case fp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hi.DEFAULT_IMAGE=null;hi.DEFAULT_MAPPING=$v;hi.DEFAULT_ANISOTROPY=1;const pm=class pm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],x=m[4],_=m[8],g=m[1],b=m[5],M=m[9],R=m[2],E=m[6],S=m[10];if(Math.abs(x-g)<.01&&Math.abs(_-R)<.01&&Math.abs(M-E)<.01){if(Math.abs(x+g)<.1&&Math.abs(_+R)<.1&&Math.abs(M+E)<.1&&Math.abs(p+b+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(p+1)/2,I=(b+1)/2,k=(S+1)/2,L=(x+g)/4,B=(_+R)/4,A=(M+E)/4;return U>I&&U>k?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=L/s,c=B/s):I>k?I<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(I),s=L/l,c=A/l):k<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(k),s=B/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((E-M)*(E-M)+(_-R)*(_-R)+(g-x)*(g-x));return Math.abs(N)<.001&&(N=1),this.x=(E-M)/N,this.y=(_-R)/N,this.z=(g-x)/N,this.w=Math.acos((p+b+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Ut(this.x,e.x,i.x),this.y=Ut(this.y,e.y,i.y),this.z=Ut(this.z,e.z,i.z),this.w=Ut(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Ut(this.x,e,i),this.y=Ut(this.y,e,i),this.z=Ut(this.z,e,i),this.w=Ut(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ut(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pm.prototype.isVector4=!0;let Un=pm;class iT extends er{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new Un(0,0,e,i),this.scissorTest=!1,this.viewport=new Un(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new hi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:di,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new sm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ca extends iT{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class ab extends hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class aT extends hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const af=class af{constructor(e,i,s,l,c,f,h,m,p,x,_,g,b,M,R,E){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,x,_,g,b,M,R,E)}set(e,i,s,l,c,f,h,m,p,x,_,g,b,M,R,E){const S=this.elements;return S[0]=e,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=h,S[13]=m,S[2]=p,S[6]=x,S[10]=_,S[14]=g,S[3]=b,S[7]=M,S[11]=R,S[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new af().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Ao.setFromMatrixColumn(e,0).length(),c=1/Ao.setFromMatrixColumn(e,1).length(),f=1/Ao.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),x=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=f*x,b=f*_,M=h*x,R=h*_;i[0]=m*x,i[4]=-m*_,i[8]=p,i[1]=b+M*p,i[5]=g-R*p,i[9]=-h*m,i[2]=R-g*p,i[6]=M+b*p,i[10]=f*m}else if(e.order==="YXZ"){const g=m*x,b=m*_,M=p*x,R=p*_;i[0]=g+R*h,i[4]=M*h-b,i[8]=f*p,i[1]=f*_,i[5]=f*x,i[9]=-h,i[2]=b*h-M,i[6]=R+g*h,i[10]=f*m}else if(e.order==="ZXY"){const g=m*x,b=m*_,M=p*x,R=p*_;i[0]=g-R*h,i[4]=-f*_,i[8]=M+b*h,i[1]=b+M*h,i[5]=f*x,i[9]=R-g*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const g=f*x,b=f*_,M=h*x,R=h*_;i[0]=m*x,i[4]=M*p-b,i[8]=g*p+R,i[1]=m*_,i[5]=R*p+g,i[9]=b*p-M,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,b=f*p,M=h*m,R=h*p;i[0]=m*x,i[4]=R-g*_,i[8]=M*_+b,i[1]=_,i[5]=f*x,i[9]=-h*x,i[2]=-p*x,i[6]=b*_+M,i[10]=g-R*_}else if(e.order==="XZY"){const g=f*m,b=f*p,M=h*m,R=h*p;i[0]=m*x,i[4]=-_,i[8]=p*x,i[1]=g*_+R,i[5]=f*x,i[9]=b*_-M,i[2]=M*_-b,i[6]=h*x,i[10]=R*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sT,e,rT)}lookAt(e,i,s){const l=this.elements;return Hi.subVectors(e,i),Hi.lengthSq()===0&&(Hi.z=1),Hi.normalize(),Hs.crossVectors(s,Hi),Hs.lengthSq()===0&&(Math.abs(s.z)===1?Hi.x+=1e-4:Hi.z+=1e-4,Hi.normalize(),Hs.crossVectors(s,Hi)),Hs.normalize(),gu.crossVectors(Hi,Hs),l[0]=Hs.x,l[4]=gu.x,l[8]=Hi.x,l[1]=Hs.y,l[5]=gu.y,l[9]=Hi.y,l[2]=Hs.z,l[6]=gu.z,l[10]=Hi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],x=s[1],_=s[5],g=s[9],b=s[13],M=s[2],R=s[6],E=s[10],S=s[14],N=s[3],U=s[7],I=s[11],k=s[15],L=l[0],B=l[4],A=l[8],F=l[12],j=l[1],H=l[5],q=l[9],se=l[13],ee=l[2],V=l[6],D=l[10],z=l[14],K=l[3],ue=l[7],ge=l[11],P=l[15];return c[0]=f*L+h*j+m*ee+p*K,c[4]=f*B+h*H+m*V+p*ue,c[8]=f*A+h*q+m*D+p*ge,c[12]=f*F+h*se+m*z+p*P,c[1]=x*L+_*j+g*ee+b*K,c[5]=x*B+_*H+g*V+b*ue,c[9]=x*A+_*q+g*D+b*ge,c[13]=x*F+_*se+g*z+b*P,c[2]=M*L+R*j+E*ee+S*K,c[6]=M*B+R*H+E*V+S*ue,c[10]=M*A+R*q+E*D+S*ge,c[14]=M*F+R*se+E*z+S*P,c[3]=N*L+U*j+I*ee+k*K,c[7]=N*B+U*H+I*V+k*ue,c[11]=N*A+U*q+I*D+k*ge,c[15]=N*F+U*se+I*z+k*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],x=e[2],_=e[6],g=e[10],b=e[14],M=e[3],R=e[7],E=e[11],S=e[15],N=m*b-p*g,U=h*b-p*_,I=h*g-m*_,k=f*b-p*x,L=f*g-m*x,B=f*_-h*x;return i*(R*N-E*U+S*I)-s*(M*N-E*k+S*L)+l*(M*U-R*k+S*B)-c*(M*I-R*L+E*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8],_=e[9],g=e[10],b=e[11],M=e[12],R=e[13],E=e[14],S=e[15],N=i*h-s*f,U=i*m-l*f,I=i*p-c*f,k=s*m-l*h,L=s*p-c*h,B=l*p-c*m,A=x*R-_*M,F=x*E-g*M,j=x*S-b*M,H=_*E-g*R,q=_*S-b*R,se=g*S-b*E,ee=N*se-U*q+I*H+k*j-L*F+B*A;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/ee;return e[0]=(h*se-m*q+p*H)*V,e[1]=(l*q-s*se-c*H)*V,e[2]=(R*B-E*L+S*k)*V,e[3]=(g*L-_*B-b*k)*V,e[4]=(m*j-f*se-p*F)*V,e[5]=(i*se-l*j+c*F)*V,e[6]=(E*I-M*B-S*U)*V,e[7]=(x*B-g*I+b*U)*V,e[8]=(f*q-h*j+p*A)*V,e[9]=(s*j-i*q-c*A)*V,e[10]=(M*L-R*I+S*N)*V,e[11]=(_*I-x*L-b*N)*V,e[12]=(h*F-f*H-m*A)*V,e[13]=(i*H-s*F+l*A)*V,e[14]=(R*U-M*k-E*N)*V,e[15]=(x*k-_*U+g*N)*V,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,x=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,x*h+s,x*m-l*f,0,p*m-l*h,x*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,x=f+f,_=h+h,g=c*p,b=c*x,M=c*_,R=f*x,E=f*_,S=h*_,N=m*p,U=m*x,I=m*_,k=s.x,L=s.y,B=s.z;return l[0]=(1-(R+S))*k,l[1]=(b+I)*k,l[2]=(M-U)*k,l[3]=0,l[4]=(b-I)*L,l[5]=(1-(g+S))*L,l[6]=(E+N)*L,l[7]=0,l[8]=(M+U)*B,l[9]=(E-N)*B,l[10]=(1-(g+R))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Ao.set(l[0],l[1],l[2]).length();const h=Ao.set(l[4],l[5],l[6]).length(),m=Ao.set(l[8],l[9],l[10]).length();c<0&&(f=-f),ua.copy(this);const p=1/f,x=1/h,_=1/m;return ua.elements[0]*=p,ua.elements[1]*=p,ua.elements[2]*=p,ua.elements[4]*=x,ua.elements[5]*=x,ua.elements[6]*=x,ua.elements[8]*=_,ua.elements[9]*=_,ua.elements[10]*=_,i.setFromRotationMatrix(ua),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=wa,m=!1){const p=this.elements,x=2*c/(i-e),_=2*c/(s-l),g=(i+e)/(i-e),b=(s+l)/(s-l);let M,R;if(m)M=c/(f-c),R=f*c/(f-c);else if(h===wa)M=-(f+c)/(f-c),R=-2*f*c/(f-c);else if(h===nf)M=-f/(f-c),R=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=b,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=R,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=wa,m=!1){const p=this.elements,x=2/(i-e),_=2/(s-l),g=-(i+e)/(i-e),b=-(s+l)/(s-l);let M,R;if(m)M=1/(f-c),R=f/(f-c);else if(h===wa)M=-2/(f-c),R=-(f+c)/(f-c);else if(h===nf)M=-1/(f-c),R=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=_,p[9]=0,p[13]=b,p[2]=0,p[6]=0,p[10]=M,p[14]=R,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};af.prototype.isMatrix4=!0;let Yn=af;const Ao=new ae,ua=new Yn,sT=new ae(0,0,0),rT=new ae(1,1,1),Hs=new ae,gu=new ae,Hi=new ae,F_=new Yn,B_=new Js;class Ir{constructor(e=0,i=0,s=0,l=Ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],x=l[9],_=l[2],g=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-x,b),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,b),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Ut(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Ut(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-Ut(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-x,b),this._y=0);break;default:dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return F_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(F_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return B_.setFromEuler(this),this.setFromQuaternion(B_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ir.DEFAULT_ORDER="XYZ";class sb{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let oT=0;const z_=new ae,wo=new Js,ss=new Yn,xu=new ae,Bl=new ae,lT=new ae,cT=new Js,G_=new ae(1,0,0),H_=new ae(0,1,0),k_=new ae(0,0,1),V_={type:"added"},uT={type:"removed"},Ro={type:"childadded",child:null},Th={type:"childremoved",child:null};class Yi extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oT++}),this.uuid=ac(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yi.DEFAULT_UP.clone();const e=new ae,i=new Ir,s=new Js,l=new ae(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Yn},normalMatrix:{value:new bt}}),this.matrix=new Yn,this.matrixWorld=new Yn,this.matrixAutoUpdate=Yi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sb,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return wo.setFromAxisAngle(e,i),this.quaternion.multiply(wo),this}rotateOnWorldAxis(e,i){return wo.setFromAxisAngle(e,i),this.quaternion.premultiply(wo),this}rotateX(e){return this.rotateOnAxis(G_,e)}rotateY(e){return this.rotateOnAxis(H_,e)}rotateZ(e){return this.rotateOnAxis(k_,e)}translateOnAxis(e,i){return z_.copy(e).applyQuaternion(this.quaternion),this.position.add(z_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(G_,e)}translateY(e){return this.translateOnAxis(H_,e)}translateZ(e){return this.translateOnAxis(k_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ss.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?xu.copy(e):xu.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Bl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ss.lookAt(Bl,xu,this.up):ss.lookAt(xu,Bl,this.up),this.quaternion.setFromRotationMatrix(ss),l&&(ss.extractRotation(l.matrixWorld),wo.setFromRotationMatrix(ss),this.quaternion.premultiply(wo.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(qt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(V_),Ro.child=e,this.dispatchEvent(Ro),Ro.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(uT),Th.child=e,this.dispatchEvent(Th),Th.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ss.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ss.multiply(e.parent.matrixWorld)),e.applyMatrix4(ss),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(V_),Ro.child=e,this.dispatchEvent(Ro),Ro.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bl,e,lT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bl,cT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,x=m.length;p<x;p++){const _=m[p];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),x=f(e.images),_=f(e.shapes),g=f(e.skeletons),b=f(e.animations),M=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),x.length>0&&(s.images=x),_.length>0&&(s.shapes=_),g.length>0&&(s.skeletons=g),b.length>0&&(s.animations=b),M.length>0&&(s.nodes=M)}return s.object=l,s;function f(h){const m=[];for(const p in h){const x=h[p];delete x.metadata,m.push(x)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Yi.DEFAULT_UP=new ae(0,1,0);Yi.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _u extends Yi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fT={type:"move"};class Ah{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _u,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _u,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _u,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const R of e.hand.values()){const E=i.getJointPose(R,s),S=this._getHandJoint(p,R);E!==null&&(S.matrix.fromArray(E.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=E.radius),S.visible=E!==null}const x=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],g=x.position.distanceTo(_.position),b=.02,M=.005;p.inputState.pinching&&g>b+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=b-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(fT)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new _u;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const rb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ks={h:0,s:0,l:0},vu={h:0,s:0,l:0};function wh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class fn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=ji){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=kt.workingColorSpace){return this.r=e,this.g=i,this.b=s,kt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=kt.workingColorSpace){if(e=ZM(e,1),i=Ut(i,0,1),s=Ut(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=wh(f,c,e+1/3),this.g=wh(f,c,e),this.b=wh(f,c,e-1/3)}return kt.colorSpaceToWorking(this,l),this}setStyle(e,i=ji){function s(c){c!==void 0&&parseFloat(c)<1&&dt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:dt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);dt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=ji){const s=rb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):dt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}copyLinearToSRGB(e){return this.r=ko(e.r),this.g=ko(e.g),this.b=ko(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ji){return kt.workingToColorSpace(ui.copy(this),e),Math.round(Ut(ui.r*255,0,255))*65536+Math.round(Ut(ui.g*255,0,255))*256+Math.round(Ut(ui.b*255,0,255))}getHexString(e=ji){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=kt.workingColorSpace){kt.workingToColorSpace(ui.copy(this),i);const s=ui.r,l=ui.g,c=ui.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const x=(h+f)/2;if(h===f)m=0,p=0;else{const _=f-h;switch(p=x<=.5?_/(f+h):_/(2-f-h),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return e.h=m,e.s=p,e.l=x,e}getRGB(e,i=kt.workingColorSpace){return kt.workingToColorSpace(ui.copy(this),i),e.r=ui.r,e.g=ui.g,e.b=ui.b,e}getStyle(e=ji){kt.workingToColorSpace(ui.copy(this),e);const i=ui.r,s=ui.g,l=ui.b;return e!==ji?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(ks),this.setHSL(ks.h+e,ks.s+i,ks.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ks),e.getHSL(vu);const s=bh(ks.h,vu.h,i),l=bh(ks.s,vu.s,i),c=bh(ks.l,vu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ui=new fn;fn.NAMES=rb;class dT extends Yi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ir,this.environmentIntensity=1,this.environmentRotation=new Ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const fa=new ae,rs=new ae,Rh=new ae,os=new ae,Co=new ae,No=new ae,j_=new ae,Ch=new ae,Nh=new ae,Oh=new ae,Dh=new Un,Lh=new Un,Uh=new Un;class ha{constructor(e=new ae,i=new ae,s=new ae){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),fa.subVectors(e,i),l.cross(fa);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){fa.subVectors(l,i),rs.subVectors(s,i),Rh.subVectors(e,i);const f=fa.dot(fa),h=fa.dot(rs),m=fa.dot(Rh),p=rs.dot(rs),x=rs.dot(Rh),_=f*p-h*h;if(_===0)return c.set(0,0,0),null;const g=1/_,b=(p*m-h*x)*g,M=(f*x-h*m)*g;return c.set(1-b-M,M,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,os)===null?!1:os.x>=0&&os.y>=0&&os.x+os.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,os)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,os.x),m.addScaledVector(f,os.y),m.addScaledVector(h,os.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return Dh.setScalar(0),Lh.setScalar(0),Uh.setScalar(0),Dh.fromBufferAttribute(e,i),Lh.fromBufferAttribute(e,s),Uh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Dh,c.x),f.addScaledVector(Lh,c.y),f.addScaledVector(Uh,c.z),f}static isFrontFacing(e,i,s,l){return fa.subVectors(s,i),rs.subVectors(e,i),fa.cross(rs).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fa.subVectors(this.c,this.b),rs.subVectors(this.a,this.b),fa.cross(rs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ha.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return ha.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return ha.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return ha.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ha.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;Co.subVectors(l,s),No.subVectors(c,s),Ch.subVectors(e,s);const m=Co.dot(Ch),p=No.dot(Ch);if(m<=0&&p<=0)return i.copy(s);Nh.subVectors(e,l);const x=Co.dot(Nh),_=No.dot(Nh);if(x>=0&&_<=x)return i.copy(l);const g=m*_-x*p;if(g<=0&&m>=0&&x<=0)return f=m/(m-x),i.copy(s).addScaledVector(Co,f);Oh.subVectors(e,c);const b=Co.dot(Oh),M=No.dot(Oh);if(M>=0&&b<=M)return i.copy(c);const R=b*p-m*M;if(R<=0&&p>=0&&M<=0)return h=p/(p-M),i.copy(s).addScaledVector(No,h);const E=x*M-b*_;if(E<=0&&_-x>=0&&b-M>=0)return j_.subVectors(c,l),h=(_-x)/(_-x+(b-M)),i.copy(l).addScaledVector(j_,h);const S=1/(E+R+g);return f=R*S,h=g*S,i.copy(s).addScaledVector(Co,f).addScaledVector(No,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class sc{constructor(e=new ae(1/0,1/0,1/0),i=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(da.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(da.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=da.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,da):da.fromBufferAttribute(c,f),da.applyMatrix4(e.matrixWorld),this.expandByPoint(da);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),bu.copy(s.boundingBox)),bu.applyMatrix4(e.matrixWorld),this.union(bu)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,da),da.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zl),yu.subVectors(this.max,zl),Oo.subVectors(e.a,zl),Do.subVectors(e.b,zl),Lo.subVectors(e.c,zl),Vs.subVectors(Do,Oo),js.subVectors(Lo,Do),Sr.subVectors(Oo,Lo);let i=[0,-Vs.z,Vs.y,0,-js.z,js.y,0,-Sr.z,Sr.y,Vs.z,0,-Vs.x,js.z,0,-js.x,Sr.z,0,-Sr.x,-Vs.y,Vs.x,0,-js.y,js.x,0,-Sr.y,Sr.x,0];return!Ih(i,Oo,Do,Lo,yu)||(i=[1,0,0,0,1,0,0,0,1],!Ih(i,Oo,Do,Lo,yu))?!1:(Su.crossVectors(Vs,js),i=[Su.x,Su.y,Su.z],Ih(i,Oo,Do,Lo,yu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,da).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(da).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ls[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ls[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ls[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ls[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ls[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ls[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ls[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ls[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ls),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ls=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],da=new ae,bu=new sc,Oo=new ae,Do=new ae,Lo=new ae,Vs=new ae,js=new ae,Sr=new ae,zl=new ae,yu=new ae,Su=new ae,Er=new ae;function Ih(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Er.fromArray(r,c);const h=l.x*Math.abs(Er.x)+l.y*Math.abs(Er.y)+l.z*Math.abs(Er.z),m=e.dot(Er),p=i.dot(Er),x=s.dot(Er);if(Math.max(-Math.max(m,p,x),Math.min(m,p,x))>h)return!1}return!0}const kn=new ae,Eu=new Ct;let hT=0;class Na extends er{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=N_,this.updateRanges=[],this.gpuType=Aa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Eu.fromBufferAttribute(this,i),Eu.applyMatrix3(e),this.setXY(i,Eu.x,Eu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)kn.fromBufferAttribute(this,i),kn.applyMatrix3(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)kn.fromBufferAttribute(this,i),kn.applyMatrix4(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)kn.fromBufferAttribute(this,i),kn.applyNormalMatrix(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)kn.fromBufferAttribute(this,i),kn.transformDirection(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=Fl(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=wi(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Fl(i,this.array)),i}setX(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Fl(i,this.array)),i}setY(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Fl(i,this.array)),i}setZ(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Fl(i,this.array)),i}setW(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array),l=wi(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array),l=wi(l,this.array),c=wi(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==N_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ob extends Na{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class lb extends Na{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class sa extends Na{constructor(e,i,s){super(new Float32Array(e),i,s)}}const pT=new sc,Gl=new ae,Ph=new ae;class rm{constructor(e=new ae,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):pT.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gl.subVectors(e,this.center);const i=Gl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Gl,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ph.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gl.copy(e.center).add(Ph)),this.expandByPoint(Gl.copy(e.center).sub(Ph))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let mT=0;const na=new Yn,Fh=new Yi,Uo=new ae,ki=new sc,Hl=new sc,Zn=new ae;class Ua extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mT++}),this.uuid=ac(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(WM(e)?lb:ob)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new bt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return na.makeRotationFromQuaternion(e),this.applyMatrix4(na),this}rotateX(e){return na.makeRotationX(e),this.applyMatrix4(na),this}rotateY(e){return na.makeRotationY(e),this.applyMatrix4(na),this}rotateZ(e){return na.makeRotationZ(e),this.applyMatrix4(na),this}translate(e,i,s){return na.makeTranslation(e,i,s),this.applyMatrix4(na),this}scale(e,i,s){return na.makeScale(e,i,s),this.applyMatrix4(na),this}lookAt(e){return Fh.lookAt(e),Fh.updateMatrix(),this.applyMatrix4(Fh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Uo).negate(),this.translate(Uo.x,Uo.y,Uo.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new sa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ki.setFromBufferAttribute(c),this.morphTargetsRelative?(Zn.addVectors(this.boundingBox.min,ki.min),this.boundingBox.expandByPoint(Zn),Zn.addVectors(this.boundingBox.max,ki.max),this.boundingBox.expandByPoint(Zn)):(this.boundingBox.expandByPoint(ki.min),this.boundingBox.expandByPoint(ki.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ae,1/0);return}if(e){const s=this.boundingSphere.center;if(ki.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];Hl.setFromBufferAttribute(h),this.morphTargetsRelative?(Zn.addVectors(ki.min,Hl.min),ki.expandByPoint(Zn),Zn.addVectors(ki.max,Hl.max),ki.expandByPoint(Zn)):(ki.expandByPoint(Hl.min),ki.expandByPoint(Hl.max))}ki.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)Zn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Zn));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,x=h.count;p<x;p++)Zn.fromBufferAttribute(h,p),m&&(Uo.fromBufferAttribute(e,p),Zn.add(Uo)),l=Math.max(l,s.distanceToSquared(Zn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Na(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let A=0;A<s.count;A++)h[A]=new ae,m[A]=new ae;const p=new ae,x=new ae,_=new ae,g=new Ct,b=new Ct,M=new Ct,R=new ae,E=new ae;function S(A,F,j){p.fromBufferAttribute(s,A),x.fromBufferAttribute(s,F),_.fromBufferAttribute(s,j),g.fromBufferAttribute(c,A),b.fromBufferAttribute(c,F),M.fromBufferAttribute(c,j),x.sub(p),_.sub(p),b.sub(g),M.sub(g);const H=1/(b.x*M.y-M.x*b.y);isFinite(H)&&(R.copy(x).multiplyScalar(M.y).addScaledVector(_,-b.y).multiplyScalar(H),E.copy(_).multiplyScalar(b.x).addScaledVector(x,-M.x).multiplyScalar(H),h[A].add(R),h[F].add(R),h[j].add(R),m[A].add(E),m[F].add(E),m[j].add(E))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,F=N.length;A<F;++A){const j=N[A],H=j.start,q=j.count;for(let se=H,ee=H+q;se<ee;se+=3)S(e.getX(se+0),e.getX(se+1),e.getX(se+2))}const U=new ae,I=new ae,k=new ae,L=new ae;function B(A){k.fromBufferAttribute(l,A),L.copy(k);const F=h[A];U.copy(F),U.sub(k.multiplyScalar(k.dot(F))).normalize(),I.crossVectors(L,F);const H=I.dot(m[A])<0?-1:1;f.setXYZW(A,U.x,U.y,U.z,H)}for(let A=0,F=N.length;A<F;++A){const j=N[A],H=j.start,q=j.count;for(let se=H,ee=H+q;se<ee;se+=3)B(e.getX(se+0)),B(e.getX(se+1)),B(e.getX(se+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Na(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,b=s.count;g<b;g++)s.setXYZ(g,0,0,0);const l=new ae,c=new ae,f=new ae,h=new ae,m=new ae,p=new ae,x=new ae,_=new ae;if(e)for(let g=0,b=e.count;g<b;g+=3){const M=e.getX(g+0),R=e.getX(g+1),E=e.getX(g+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,E),x.subVectors(f,c),_.subVectors(l,c),x.cross(_),h.fromBufferAttribute(s,M),m.fromBufferAttribute(s,R),p.fromBufferAttribute(s,E),h.add(x),m.add(x),p.add(x),s.setXYZ(M,h.x,h.y,h.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(E,p.x,p.y,p.z)}else for(let g=0,b=i.count;g<b;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),x.subVectors(f,c),_.subVectors(l,c),x.cross(_),s.setXYZ(g+0,x.x,x.y,x.z),s.setXYZ(g+1,x.x,x.y,x.z),s.setXYZ(g+2,x.x,x.y,x.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Zn.fromBufferAttribute(e,i),Zn.normalize(),e.setXYZ(i,Zn.x,Zn.y,Zn.z)}toNonIndexed(){function e(h,m){const p=h.array,x=h.itemSize,_=h.normalized,g=new p.constructor(m.length*x);let b=0,M=0;for(let R=0,E=m.length;R<E;R++){h.isInterleavedBufferAttribute?b=m[R]*h.data.stride+h.offset:b=m[R]*x;for(let S=0;S<x;S++)g[M++]=p[b++]}return new Na(g,x,_)}if(this.index===null)return dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ua,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let x=0,_=p.length;x<_;x++){const g=p[x],b=e(g,s);m.push(b)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],x=[];for(let _=0,g=p.length;_<g;_++){const b=p[_];x.push(b.toJSON(e.data))}x.length>0&&(l[m]=x,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const x=l[p];this.setAttribute(p,x.clone(i))}const c=e.morphAttributes;for(const p in c){const x=[],_=c[p];for(let g=0,b=_.length;g<b;g++)x.push(_[g].clone(i));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,x=f.length;p<x;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let gT=0;class rf extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=ac(),this.name="",this.type="Material",this.blending=Ho,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tp,this.blendDst=np,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fn(0,0,0),this.blendAlpha=0,this.depthFunc=jo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=C_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mo,this.stencilZFail=Mo,this.stencilZPass=Mo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){dt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Ho&&(s.blending=this.blending),this.side!==Qs&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==tp&&(s.blendSrc=this.blendSrc),this.blendDst!==np&&(s.blendDst=this.blendDst),this.blendEquation!==wr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==jo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==C_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mo&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Mo&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Mo&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const cs=new ae,Bh=new ae,Mu=new ae,Xs=new ae,zh=new ae,Tu=new ae,Gh=new ae;class cb{constructor(e=new ae,i=new ae(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cs)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=cs.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(cs.copy(this.origin).addScaledVector(this.direction,i),cs.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Bh.copy(e).add(i).multiplyScalar(.5),Mu.copy(i).sub(e).normalize(),Xs.copy(this.origin).sub(Bh);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Mu),h=Xs.dot(this.direction),m=-Xs.dot(Mu),p=Xs.lengthSq(),x=Math.abs(1-f*f);let _,g,b,M;if(x>0)if(_=f*m-h,g=f*h-m,M=c*x,_>=0)if(g>=-M)if(g<=M){const R=1/x;_*=R,g*=R,b=_*(_+f*g+2*h)+g*(f*_+g+2*m)+p}else g=c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;else g=-c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;else g<=-M?(_=Math.max(0,-(-f*c+h)),g=_>0?-c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+p):g<=M?(_=0,g=Math.min(Math.max(-c,-m),c),b=g*(g+2*m)+p):(_=Math.max(0,-(f*c+h)),g=_>0?c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+p);else g=f>0?-c:c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Bh).addScaledVector(Mu,g),b}intersectSphere(e,i){cs.subVectors(e.center,this.origin);const s=cs.dot(this.direction),l=cs.dot(cs)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,x=1/this.direction.y,_=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),x>=0?(c=(e.min.y-g.y)*x,f=(e.max.y-g.y)*x):(c=(e.max.y-g.y)*x,f=(e.min.y-g.y)*x),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(h=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,cs)!==null}intersectTriangle(e,i,s,l,c){zh.subVectors(i,e),Tu.subVectors(s,e),Gh.crossVectors(zh,Tu);let f=this.direction.dot(Gh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Xs.subVectors(this.origin,e);const m=h*this.direction.dot(Tu.crossVectors(Xs,Tu));if(m<0)return null;const p=h*this.direction.dot(zh.cross(Xs));if(p<0||m+p>f)return null;const x=-h*Xs.dot(Gh);return x<0?null:this.at(x/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class om extends rf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ir,this.combine=Hv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const X_=new Yn,Mr=new cb,Au=new rm,Y_=new ae,wu=new ae,Ru=new ae,Cu=new ae,Hh=new ae,Nu=new ae,W_=new ae,Ou=new ae;class Da extends Yi{constructor(e=new Ua,i=new om){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){Nu.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const x=h[m],_=c[m];x!==0&&(Hh.fromBufferAttribute(_,e),f?Nu.addScaledVector(Hh,x):Nu.addScaledVector(Hh.sub(i),x))}i.add(Nu)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Au.copy(s.boundingSphere),Au.applyMatrix4(c),Mr.copy(e.ray).recast(e.near),!(Au.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Au,Y_)===null||Mr.origin.distanceToSquared(Y_)>(e.far-e.near)**2))&&(X_.copy(c).invert(),Mr.copy(e.ray).applyMatrix4(X_),!(s.boundingBox!==null&&Mr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Mr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,x=c.attributes.uv1,_=c.attributes.normal,g=c.groups,b=c.drawRange;if(h!==null)if(Array.isArray(f))for(let M=0,R=g.length;M<R;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,b.start),U=Math.min(h.count,Math.min(E.start+E.count,b.start+b.count));for(let I=N,k=U;I<k;I+=3){const L=h.getX(I),B=h.getX(I+1),A=h.getX(I+2);l=Du(this,S,e,s,p,x,_,L,B,A),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),R=Math.min(h.count,b.start+b.count);for(let E=M,S=R;E<S;E+=3){const N=h.getX(E),U=h.getX(E+1),I=h.getX(E+2);l=Du(this,f,e,s,p,x,_,N,U,I),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let M=0,R=g.length;M<R;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,b.start),U=Math.min(m.count,Math.min(E.start+E.count,b.start+b.count));for(let I=N,k=U;I<k;I+=3){const L=I,B=I+1,A=I+2;l=Du(this,S,e,s,p,x,_,L,B,A),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),R=Math.min(m.count,b.start+b.count);for(let E=M,S=R;E<S;E+=3){const N=E,U=E+1,I=E+2;l=Du(this,f,e,s,p,x,_,N,U,I),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}}}function xT(r,e,i,s,l,c,f,h){let m;if(e.side===Ci?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===Qs,h),m===null)return null;Ou.copy(h),Ou.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Ou);return p<i.near||p>i.far?null:{distance:p,point:Ou.clone(),object:r}}function Du(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,wu),r.getVertexPosition(m,Ru),r.getVertexPosition(p,Cu);const x=xT(r,e,i,s,wu,Ru,Cu,W_);if(x){const _=new ae;ha.getBarycoord(W_,wu,Ru,Cu,_),l&&(x.uv=ha.getInterpolatedAttribute(l,h,m,p,_,new Ct)),c&&(x.uv1=ha.getInterpolatedAttribute(c,h,m,p,_,new Ct)),f&&(x.normal=ha.getInterpolatedAttribute(f,h,m,p,_,new ae),x.normal.dot(s.direction)>0&&x.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new ae,materialIndex:0};ha.getNormal(wu,Ru,Cu,g.normal),x.face=g,x.barycoord=_}return x}class _T extends hi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=si,x=si,_,g){super(null,f,h,m,p,x,l,c,_,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const kh=new ae,vT=new ae,bT=new bt;class qs{constructor(e=new ae(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=kh.subVectors(s,i).cross(vT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(kh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||bT.getNormalMatrix(e),l=this.coplanarPoint(kh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new rm,yT=new Ct(.5,.5),Lu=new ae;class ub{constructor(e=new qs,i=new qs,s=new qs,l=new qs,c=new qs,f=new qs){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=wa,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],x=c[4],_=c[5],g=c[6],b=c[7],M=c[8],R=c[9],E=c[10],S=c[11],N=c[12],U=c[13],I=c[14],k=c[15];if(l[0].setComponents(p-f,b-x,S-M,k-N).normalize(),l[1].setComponents(p+f,b+x,S+M,k+N).normalize(),l[2].setComponents(p+h,b+_,S+R,k+U).normalize(),l[3].setComponents(p-h,b-_,S-R,k-U).normalize(),s)l[4].setComponents(m,g,E,I).normalize(),l[5].setComponents(p-m,b-g,S-E,k-I).normalize();else if(l[4].setComponents(p-m,b-g,S-E,k-I).normalize(),i===wa)l[5].setComponents(p+m,b+g,S+E,k+I).normalize();else if(i===nf)l[5].setComponents(m,g,E,I).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(e){Tr.center.set(0,0,0);const i=yT.distanceTo(e.center);return Tr.radius=.7071067811865476+i,Tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Lu.x=l.normal.x>0?e.max.x:e.min.x,Lu.y=l.normal.y>0?e.max.y:e.min.y,Lu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Lu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fb extends hi{constructor(e=[],i=Lr,s,l,c,f,h,m,p,x){super(e,i,s,l,c,f,h,m,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yo extends hi{constructor(e,i,s=Oa,l,c,f,h=si,m=si,p,x=ms,_=1){if(x!==ms&&x!==Nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:_};super(g,l,c,f,h,m,x,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class ST extends Yo{constructor(e,i=Oa,s=Lr,l,c,f=si,h=si,m,p=ms){const x={width:e,height:e,depth:1},_=[x,x,x,x,x,x];super(e,e,i,s,l,c,f,h,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class db extends hi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rc extends Ua{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],x=[],_=[];let g=0,b=0;M("z","y","x",-1,-1,s,i,e,f,c,0),M("z","y","x",1,-1,s,i,-e,f,c,1),M("x","z","y",1,1,e,s,i,l,f,2),M("x","z","y",1,-1,e,s,-i,l,f,3),M("x","y","z",1,-1,e,i,s,l,c,4),M("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new sa(p,3)),this.setAttribute("normal",new sa(x,3)),this.setAttribute("uv",new sa(_,2));function M(R,E,S,N,U,I,k,L,B,A,F){const j=I/B,H=k/A,q=I/2,se=k/2,ee=L/2,V=B+1,D=A+1;let z=0,K=0;const ue=new ae;for(let ge=0;ge<D;ge++){const P=ge*H-se;for(let Z=0;Z<V;Z++){const _e=Z*j-q;ue[R]=_e*N,ue[E]=P*U,ue[S]=ee,p.push(ue.x,ue.y,ue.z),ue[R]=0,ue[E]=0,ue[S]=L>0?1:-1,x.push(ue.x,ue.y,ue.z),_.push(Z/B),_.push(1-ge/A),z+=1}}for(let ge=0;ge<A;ge++)for(let P=0;P<B;P++){const Z=g+P+V*ge,_e=g+P+V*(ge+1),Ae=g+(P+1)+V*(ge+1),Ne=g+(P+1)+V*ge;m.push(Z,_e,Ne),m.push(_e,Ae,Ne),K+=6}h.addGroup(b,K,F),b+=K,g+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class of extends Ua{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,x=m+1,_=e/h,g=i/m,b=[],M=[],R=[],E=[];for(let S=0;S<x;S++){const N=S*g-f;for(let U=0;U<p;U++){const I=U*_-c;M.push(I,-N,0),R.push(0,0,1),E.push(U/h),E.push(1-S/m)}}for(let S=0;S<m;S++)for(let N=0;N<h;N++){const U=N+p*S,I=N+p*(S+1),k=N+1+p*(S+1),L=N+1+p*S;b.push(U,I,L),b.push(I,k,L)}this.setIndex(b),this.setAttribute("position",new sa(M,3)),this.setAttribute("normal",new sa(R,3)),this.setAttribute("uv",new sa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new of(e.width,e.height,e.widthSegments,e.heightSegments)}}class lm extends Ua{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const x=[],_=new ae,g=new ae,b=[],M=[],R=[],E=[];for(let S=0;S<=s;S++){const N=[],U=S/s;let I=0;S===0&&f===0?I=.5/i:S===s&&m===Math.PI&&(I=-.5/i);for(let k=0;k<=i;k++){const L=k/i;_.x=-e*Math.cos(l+L*c)*Math.sin(f+U*h),_.y=e*Math.cos(f+U*h),_.z=e*Math.sin(l+L*c)*Math.sin(f+U*h),M.push(_.x,_.y,_.z),g.copy(_).normalize(),R.push(g.x,g.y,g.z),E.push(L+I,1-U),N.push(p++)}x.push(N)}for(let S=0;S<s;S++)for(let N=0;N<i;N++){const U=x[S][N+1],I=x[S][N],k=x[S+1][N],L=x[S+1][N+1];(S!==0||f>0)&&b.push(U,I,L),(S!==s-1||m<Math.PI)&&b.push(I,k,L)}this.setIndex(b),this.setAttribute("position",new sa(M,3)),this.setAttribute("normal",new sa(R,3)),this.setAttribute("uv",new sa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Wo(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(q_(l))l.isRenderTargetTexture?(dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(q_(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function xi(r){const e={};for(let i=0;i<r.length;i++){const s=Wo(r[i]);for(const l in s)e[l]=s[l]}return e}function q_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ET(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function hb(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}const MT={clone:Wo,merge:xi};var TT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,AT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class La extends rf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=TT,this.fragmentShader=AT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wo(e.uniforms),this.uniformsGroups=ET(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class wT extends La{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class RT extends rf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class CT extends rf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vh={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&($_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!$_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function $_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class NT{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(x){h++,c===!1&&l.onStart!==void 0&&l.onStart(x,f,h),c=!0},this.itemEnd=function(x){f++,l.onProgress!==void 0&&l.onProgress(x,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(x){l.onError!==void 0&&l.onError(x)},this.resolveURL=function(x){return m?m(x):x},this.setURLModifier=function(x){return m=x,this},this.addHandler=function(x,_){return p.push(x,_),this},this.removeHandler=function(x){const _=p.indexOf(x);return _!==-1&&p.splice(_,2),this},this.getHandler=function(x){for(let _=0,g=p.length;_<g;_+=2){const b=p[_],M=p[_+1];if(b.global&&(b.lastIndex=0),b.test(x))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const OT=new NT;class cm{constructor(e){this.manager=e!==void 0?e:OT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}cm.DEFAULT_MATERIAL_NAME="__DEFAULT";const Io=new WeakMap;class DT extends cm{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=Vh.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let _=Io.get(f);_===void 0&&(_=[],Io.set(f,_)),_.push({onLoad:i,onError:l})}return f}const h=nc("img");function m(){x(),i&&i(this);const _=Io.get(this)||[];for(let g=0;g<_.length;g++){const b=_[g];b.onLoad&&b.onLoad(this)}Io.delete(this),c.manager.itemEnd(e)}function p(_){x(),l&&l(_),Vh.remove(`image:${e}`);const g=Io.get(this)||[];for(let b=0;b<g.length;b++){const M=g[b];M.onError&&M.onError(_)}Io.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function x(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),Vh.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class LT extends cm{constructor(e){super(e)}load(e,i,s,l){const c=new hi,f=new DT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const Uu=new ae,Iu=new Js,Ea=new ae;class pb extends Yi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yn,this.projectionMatrix=new Yn,this.projectionMatrixInverse=new Yn,this.coordinateSystem=wa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Uu,Iu,Ea),Ea.x===1&&Ea.y===1&&Ea.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Iu,Ea.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(Uu,Iu,Ea),Ea.x===1&&Ea.y===1&&Ea.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Iu,Ea.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ys=new ae,K_=new Ct,Z_=new Ct;class ia extends pb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Vp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vp*2*Math.atan(Math.tan(Wu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z),Ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z)}getViewSize(e,i){return this.getViewBounds(e,K_,Z_),i.subVectors(Z_,K_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Wu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class mb extends pb{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=x*this.view.offsetY,m=h-x*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Po=-90,Fo=1;class UT extends Yi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ia(Po,Fo,e,i);l.layers=this.layers,this.add(l);const c=new ia(Po,Fo,e,i);c.layers=this.layers,this.add(c);const f=new ia(Po,Fo,e,i);f.layers=this.layers,this.add(f);const h=new ia(Po,Fo,e,i);h.layers=this.layers,this.add(h);const m=new ia(Po,Fo,e,i);m.layers=this.layers,this.add(m);const p=new ia(Po,Fo,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===wa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===nf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,x]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let E=!1;e.isWebGLRenderer===!0?E=e.state.buffers.depth.getReversed():E=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=R,e.setRenderTarget(s,5,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,x),e.setRenderTarget(_,g,b),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class IT extends ia{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Q_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Ut(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const mm=class mm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};mm.prototype.isMatrix2=!0;let J_=mm;class PT extends er{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){dt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function ev(r,e,i,s){const l=FT(s);switch(i){case eb:return r*e;case nb:return r*e/l.components*l.byteLength;case em:return r*e/l.components*l.byteLength;case Ur:return r*e*2/l.components*l.byteLength;case tm:return r*e*2/l.components*l.byteLength;case tb:return r*e*3/l.components*l.byteLength;case pa:return r*e*4/l.components*l.byteLength;case nm:return r*e*4/l.components*l.byteLength;case Vu:case ju:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xu:case Yu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case hp:case mp:return Math.max(r,16)*Math.max(e,8)/4;case dp:case pp:return Math.max(r,8)*Math.max(e,8)/2;case gp:case xp:case vp:case bp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case _p:case Qu:case yp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ep:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Mp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Ap:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case wp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Rp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Cp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Np:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Op:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Dp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Lp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Up:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ip:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Pp:case Fp:case Bp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case zp:case Gp:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ju:case Hp:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function FT(r){switch(r){case aa:case Kv:return{byteLength:1,components:1};case ec:case Zv:case ps:return{byteLength:2,components:1};case Qp:case Jp:return{byteLength:2,components:4};case Oa:case Zp:case Aa:return{byteLength:4,components:1};case Qv:case Jv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kp}}));typeof window<"u"&&(window.__THREE__?dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kp);function gb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function BT(r){const e=new WeakMap;function i(h,m){const p=h.array,x=h.usage,_=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,x),h.onUploadCallback();let b;if(p instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)b=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)b=r.SHORT;else if(p instanceof Uint32Array)b=r.UNSIGNED_INT;else if(p instanceof Int32Array)b=r.INT;else if(p instanceof Int8Array)b=r.BYTE;else if(p instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:b,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function s(h,m,p){const x=m.array,_=m.updateRanges;if(r.bindBuffer(p,h),_.length===0)r.bufferSubData(p,0,x);else{_.sort((b,M)=>b.start-M.start);let g=0;for(let b=1;b<_.length;b++){const M=_[g],R=_[b];R.start<=M.start+M.count+1?M.count=Math.max(M.count,R.start+R.count-M.start):(++g,_[g]=R)}_.length=g+1;for(let b=0,M=_.length;b<M;b++){const R=_[b];r.bufferSubData(p,R.start*x.BYTES_PER_ELEMENT,x,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const x=e.get(h);(!x||x.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var zT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GT=`#ifdef USE_ALPHAHASH
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
#endif`,HT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,XT=`#ifdef USE_AOMAP
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
#endif`,YT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,WT=`#ifdef USE_BATCHING
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
#endif`,qT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$T=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,KT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ZT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,QT=`#ifdef USE_IRIDESCENCE
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
#endif`,JT=`#ifdef USE_BUMPMAP
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
#endif`,e1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,t1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,n1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,i1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,a1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,s1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,o1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,l1=`#define PI 3.141592653589793
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
} // validated`,c1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,u1=`vec3 transformedNormal = objectNormal;
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
#endif`,f1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,d1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,p1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,m1="gl_FragColor = linearToOutputTexel( gl_FragColor );",g1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,x1=`#ifdef USE_ENVMAP
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
#endif`,_1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,v1=`#ifdef USE_ENVMAP
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
#endif`,b1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y1=`#ifdef USE_ENVMAP
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
#endif`,S1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,E1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,M1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,T1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,A1=`#ifdef USE_GRADIENTMAP
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
}`,w1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,C1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,N1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,O1=`#ifdef USE_ENVMAP
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
#endif`,D1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P1=`PhysicalMaterial material;
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
#endif`,F1=`uniform sampler2D dfgLUT;
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
}`,B1=`
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
#endif`,z1=`#if defined( RE_IndirectDiffuse )
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
#endif`,G1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,H1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,k1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,V1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,q1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$1=`#if defined( USE_POINTS_UV )
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
#endif`,K1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tA=`#ifdef USE_MORPHTARGETS
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
#endif`,nA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lA=`#ifdef USE_NORMALMAP
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
#endif`,cA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_A=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,SA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,EA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,MA=`float getShadowMask() {
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
}`,TA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,AA=`#ifdef USE_SKINNING
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
#endif`,wA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,RA=`#ifdef USE_SKINNING
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
#endif`,CA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,NA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,OA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,LA=`#ifdef USE_TRANSMISSION
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
#endif`,UA=`#ifdef USE_TRANSMISSION
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
#endif`,IA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,FA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,GA=`uniform sampler2D t2D;
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
}`,HA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,VA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XA=`#include <common>
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
}`,YA=`#if DEPTH_PACKING == 3200
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
}`,WA=`#define DISTANCE
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
}`,qA=`#define DISTANCE
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
}`,$A=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,KA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZA=`uniform float scale;
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
}`,QA=`uniform vec3 diffuse;
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
}`,JA=`#include <common>
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
}`,ew=`uniform vec3 diffuse;
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
}`,tw=`#define LAMBERT
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
}`,nw=`#define LAMBERT
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
}`,iw=`#define MATCAP
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
}`,aw=`#define MATCAP
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
}`,sw=`#define NORMAL
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
}`,rw=`#define NORMAL
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
}`,ow=`#define PHONG
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
}`,lw=`#define PHONG
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
}`,cw=`#define STANDARD
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
}`,uw=`#define STANDARD
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
}`,fw=`#define TOON
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
}`,dw=`#define TOON
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
}`,hw=`uniform float size;
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
}`,pw=`uniform vec3 diffuse;
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
}`,mw=`#include <common>
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
}`,gw=`uniform vec3 color;
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
}`,xw=`uniform float rotation;
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
}`,_w=`uniform vec3 diffuse;
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
}`,At={alphahash_fragment:zT,alphahash_pars_fragment:GT,alphamap_fragment:HT,alphamap_pars_fragment:kT,alphatest_fragment:VT,alphatest_pars_fragment:jT,aomap_fragment:XT,aomap_pars_fragment:YT,batching_pars_vertex:WT,batching_vertex:qT,begin_vertex:$T,beginnormal_vertex:KT,bsdfs:ZT,iridescence_fragment:QT,bumpmap_pars_fragment:JT,clipping_planes_fragment:e1,clipping_planes_pars_fragment:t1,clipping_planes_pars_vertex:n1,clipping_planes_vertex:i1,color_fragment:a1,color_pars_fragment:s1,color_pars_vertex:r1,color_vertex:o1,common:l1,cube_uv_reflection_fragment:c1,defaultnormal_vertex:u1,displacementmap_pars_vertex:f1,displacementmap_vertex:d1,emissivemap_fragment:h1,emissivemap_pars_fragment:p1,colorspace_fragment:m1,colorspace_pars_fragment:g1,envmap_fragment:x1,envmap_common_pars_fragment:_1,envmap_pars_fragment:v1,envmap_pars_vertex:b1,envmap_physical_pars_fragment:O1,envmap_vertex:y1,fog_vertex:S1,fog_pars_vertex:E1,fog_fragment:M1,fog_pars_fragment:T1,gradientmap_pars_fragment:A1,lightmap_pars_fragment:w1,lights_lambert_fragment:R1,lights_lambert_pars_fragment:C1,lights_pars_begin:N1,lights_toon_fragment:D1,lights_toon_pars_fragment:L1,lights_phong_fragment:U1,lights_phong_pars_fragment:I1,lights_physical_fragment:P1,lights_physical_pars_fragment:F1,lights_fragment_begin:B1,lights_fragment_maps:z1,lights_fragment_end:G1,lightprobes_pars_fragment:H1,logdepthbuf_fragment:k1,logdepthbuf_pars_fragment:V1,logdepthbuf_pars_vertex:j1,logdepthbuf_vertex:X1,map_fragment:Y1,map_pars_fragment:W1,map_particle_fragment:q1,map_particle_pars_fragment:$1,metalnessmap_fragment:K1,metalnessmap_pars_fragment:Z1,morphinstance_vertex:Q1,morphcolor_vertex:J1,morphnormal_vertex:eA,morphtarget_pars_vertex:tA,morphtarget_vertex:nA,normal_fragment_begin:iA,normal_fragment_maps:aA,normal_pars_fragment:sA,normal_pars_vertex:rA,normal_vertex:oA,normalmap_pars_fragment:lA,clearcoat_normal_fragment_begin:cA,clearcoat_normal_fragment_maps:uA,clearcoat_pars_fragment:fA,iridescence_pars_fragment:dA,opaque_fragment:hA,packing:pA,premultiplied_alpha_fragment:mA,project_vertex:gA,dithering_fragment:xA,dithering_pars_fragment:_A,roughnessmap_fragment:vA,roughnessmap_pars_fragment:bA,shadowmap_pars_fragment:yA,shadowmap_pars_vertex:SA,shadowmap_vertex:EA,shadowmask_pars_fragment:MA,skinbase_vertex:TA,skinning_pars_vertex:AA,skinning_vertex:wA,skinnormal_vertex:RA,specularmap_fragment:CA,specularmap_pars_fragment:NA,tonemapping_fragment:OA,tonemapping_pars_fragment:DA,transmission_fragment:LA,transmission_pars_fragment:UA,uv_pars_fragment:IA,uv_pars_vertex:PA,uv_vertex:FA,worldpos_vertex:BA,background_vert:zA,background_frag:GA,backgroundCube_vert:HA,backgroundCube_frag:kA,cube_vert:VA,cube_frag:jA,depth_vert:XA,depth_frag:YA,distance_vert:WA,distance_frag:qA,equirect_vert:$A,equirect_frag:KA,linedashed_vert:ZA,linedashed_frag:QA,meshbasic_vert:JA,meshbasic_frag:ew,meshlambert_vert:tw,meshlambert_frag:nw,meshmatcap_vert:iw,meshmatcap_frag:aw,meshnormal_vert:sw,meshnormal_frag:rw,meshphong_vert:ow,meshphong_frag:lw,meshphysical_vert:cw,meshphysical_frag:uw,meshtoon_vert:fw,meshtoon_frag:dw,points_vert:hw,points_frag:pw,shadow_vert:mw,shadow_frag:gw,sprite_vert:xw,sprite_frag:_w},je={common:{diffuse:{value:new fn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new bt},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new bt}},envmap:{envMap:{value:null},envMapRotation:{value:new bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new bt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ae},probesMax:{value:new ae},probesResolution:{value:new ae}},points:{diffuse:{value:new fn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0},uvTransform:{value:new bt}},sprite:{diffuse:{value:new fn(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new bt},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0}}},Ta={basic:{uniforms:xi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:At.meshbasic_vert,fragmentShader:At.meshbasic_frag},lambert:{uniforms:xi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new fn(0)},envMapIntensity:{value:1}}]),vertexShader:At.meshlambert_vert,fragmentShader:At.meshlambert_frag},phong:{uniforms:xi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new fn(0)},specular:{value:new fn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:At.meshphong_vert,fragmentShader:At.meshphong_frag},standard:{uniforms:xi([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new fn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:At.meshphysical_vert,fragmentShader:At.meshphysical_frag},toon:{uniforms:xi([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new fn(0)}}]),vertexShader:At.meshtoon_vert,fragmentShader:At.meshtoon_frag},matcap:{uniforms:xi([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:At.meshmatcap_vert,fragmentShader:At.meshmatcap_frag},points:{uniforms:xi([je.points,je.fog]),vertexShader:At.points_vert,fragmentShader:At.points_frag},dashed:{uniforms:xi([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:At.linedashed_vert,fragmentShader:At.linedashed_frag},depth:{uniforms:xi([je.common,je.displacementmap]),vertexShader:At.depth_vert,fragmentShader:At.depth_frag},normal:{uniforms:xi([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:At.meshnormal_vert,fragmentShader:At.meshnormal_frag},sprite:{uniforms:xi([je.sprite,je.fog]),vertexShader:At.sprite_vert,fragmentShader:At.sprite_frag},background:{uniforms:{uvTransform:{value:new bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:At.background_vert,fragmentShader:At.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new bt}},vertexShader:At.backgroundCube_vert,fragmentShader:At.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:At.cube_vert,fragmentShader:At.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:At.equirect_vert,fragmentShader:At.equirect_frag},distance:{uniforms:xi([je.common,je.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:At.distance_vert,fragmentShader:At.distance_frag},shadow:{uniforms:xi([je.lights,je.fog,{color:{value:new fn(0)},opacity:{value:1}}]),vertexShader:At.shadow_vert,fragmentShader:At.shadow_frag}};Ta.physical={uniforms:xi([Ta.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new bt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new bt},sheen:{value:0},sheenColor:{value:new fn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new bt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new bt},attenuationDistance:{value:0},attenuationColor:{value:new fn(0)},specularColor:{value:new fn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new bt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new bt}}]),vertexShader:At.meshphysical_vert,fragmentShader:At.meshphysical_frag};const Pu={r:0,b:0,g:0},vw=new Yn,xb=new bt;xb.set(-1,0,0,0,1,0,0,0,1);function bw(r,e,i,s,l,c){const f=new fn(0);let h=l===!0?0:1,m,p,x=null,_=0,g=null;function b(N){let U=N.isScene===!0?N.background:null;if(U&&U.isTexture){const I=N.backgroundBlurriness>0;U=e.get(U,I)}return U}function M(N){let U=!1;const I=b(N);I===null?E(f,h):I&&I.isColor&&(E(I,1),U=!0);const k=r.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,c):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||U)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(N,U){const I=b(U);I&&(I.isCubeTexture||I.mapping===sf)?(p===void 0&&(p=new Da(new rc(1,1,1),new La({name:"BackgroundCubeMaterial",uniforms:Wo(Ta.backgroundCube.uniforms),vertexShader:Ta.backgroundCube.vertexShader,fragmentShader:Ta.backgroundCube.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(k,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=I,p.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(vw.makeRotationFromEuler(U.backgroundRotation)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(xb),p.material.toneMapped=kt.getTransfer(I.colorSpace)!==rn,(x!==I||_!==I.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,x=I,_=I.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):I&&I.isTexture&&(m===void 0&&(m=new Da(new of(2,2),new La({name:"BackgroundMaterial",uniforms:Wo(Ta.background.uniforms),vertexShader:Ta.background.vertexShader,fragmentShader:Ta.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=I,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=kt.getTransfer(I.colorSpace)!==rn,I.matrixAutoUpdate===!0&&I.updateMatrix(),m.material.uniforms.uvTransform.value.copy(I.matrix),(x!==I||_!==I.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,x=I,_=I.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function E(N,U){N.getRGB(Pu,hb(r)),i.buffers.color.setClear(Pu.r,Pu.g,Pu.b,U,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,U=1){f.set(N),h=U,E(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,E(f,h)},render:M,addToRenderList:R,dispose:S}}function yw(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(H,q,se,ee,V){let D=!1;const z=_(H,ee,se,q);c!==z&&(c=z,p(c.object)),D=b(H,ee,se,V),D&&M(H,ee,se,V),V!==null&&e.update(V,r.ELEMENT_ARRAY_BUFFER),(D||f)&&(f=!1,I(H,q,se,ee),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function m(){return r.createVertexArray()}function p(H){return r.bindVertexArray(H)}function x(H){return r.deleteVertexArray(H)}function _(H,q,se,ee){const V=ee.wireframe===!0;let D=s[q.id];D===void 0&&(D={},s[q.id]=D);const z=H.isInstancedMesh===!0?H.id:0;let K=D[z];K===void 0&&(K={},D[z]=K);let ue=K[se.id];ue===void 0&&(ue={},K[se.id]=ue);let ge=ue[V];return ge===void 0&&(ge=g(m()),ue[V]=ge),ge}function g(H){const q=[],se=[],ee=[];for(let V=0;V<i;V++)q[V]=0,se[V]=0,ee[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:se,attributeDivisors:ee,object:H,attributes:{},index:null}}function b(H,q,se,ee){const V=c.attributes,D=q.attributes;let z=0;const K=se.getAttributes();for(const ue in K)if(K[ue].location>=0){const P=V[ue];let Z=D[ue];if(Z===void 0&&(ue==="instanceMatrix"&&H.instanceMatrix&&(Z=H.instanceMatrix),ue==="instanceColor"&&H.instanceColor&&(Z=H.instanceColor)),P===void 0||P.attribute!==Z||Z&&P.data!==Z.data)return!0;z++}return c.attributesNum!==z||c.index!==ee}function M(H,q,se,ee){const V={},D=q.attributes;let z=0;const K=se.getAttributes();for(const ue in K)if(K[ue].location>=0){let P=D[ue];P===void 0&&(ue==="instanceMatrix"&&H.instanceMatrix&&(P=H.instanceMatrix),ue==="instanceColor"&&H.instanceColor&&(P=H.instanceColor));const Z={};Z.attribute=P,P&&P.data&&(Z.data=P.data),V[ue]=Z,z++}c.attributes=V,c.attributesNum=z,c.index=ee}function R(){const H=c.newAttributes;for(let q=0,se=H.length;q<se;q++)H[q]=0}function E(H){S(H,0)}function S(H,q){const se=c.newAttributes,ee=c.enabledAttributes,V=c.attributeDivisors;se[H]=1,ee[H]===0&&(r.enableVertexAttribArray(H),ee[H]=1),V[H]!==q&&(r.vertexAttribDivisor(H,q),V[H]=q)}function N(){const H=c.newAttributes,q=c.enabledAttributes;for(let se=0,ee=q.length;se<ee;se++)q[se]!==H[se]&&(r.disableVertexAttribArray(se),q[se]=0)}function U(H,q,se,ee,V,D,z){z===!0?r.vertexAttribIPointer(H,q,se,V,D):r.vertexAttribPointer(H,q,se,ee,V,D)}function I(H,q,se,ee){R();const V=ee.attributes,D=se.getAttributes(),z=q.defaultAttributeValues;for(const K in D){const ue=D[K];if(ue.location>=0){let ge=V[K];if(ge===void 0&&(K==="instanceMatrix"&&H.instanceMatrix&&(ge=H.instanceMatrix),K==="instanceColor"&&H.instanceColor&&(ge=H.instanceColor)),ge!==void 0){const P=ge.normalized,Z=ge.itemSize,_e=e.get(ge);if(_e===void 0)continue;const Ae=_e.buffer,Ne=_e.type,te=_e.bytesPerElement,Se=Ne===r.INT||Ne===r.UNSIGNED_INT||ge.gpuType===Zp;if(ge.isInterleavedBufferAttribute){const ye=ge.data,Ge=ye.stride,We=ge.offset;if(ye.isInstancedInterleavedBuffer){for(let Qe=0;Qe<ue.locationSize;Qe++)S(ue.location+Qe,ye.meshPerAttribute);H.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Qe=0;Qe<ue.locationSize;Qe++)E(ue.location+Qe);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let Qe=0;Qe<ue.locationSize;Qe++)U(ue.location+Qe,Z/ue.locationSize,Ne,P,Ge*te,(We+Z/ue.locationSize*Qe)*te,Se)}else{if(ge.isInstancedBufferAttribute){for(let ye=0;ye<ue.locationSize;ye++)S(ue.location+ye,ge.meshPerAttribute);H.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let ye=0;ye<ue.locationSize;ye++)E(ue.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let ye=0;ye<ue.locationSize;ye++)U(ue.location+ye,Z/ue.locationSize,Ne,P,Z*te,Z/ue.locationSize*ye*te,Se)}}else if(z!==void 0){const P=z[K];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ue.location,P);break;case 3:r.vertexAttrib3fv(ue.location,P);break;case 4:r.vertexAttrib4fv(ue.location,P);break;default:r.vertexAttrib1fv(ue.location,P)}}}}N()}function k(){F();for(const H in s){const q=s[H];for(const se in q){const ee=q[se];for(const V in ee){const D=ee[V];for(const z in D)x(D[z].object),delete D[z];delete ee[V]}}delete s[H]}}function L(H){if(s[H.id]===void 0)return;const q=s[H.id];for(const se in q){const ee=q[se];for(const V in ee){const D=ee[V];for(const z in D)x(D[z].object),delete D[z];delete ee[V]}}delete s[H.id]}function B(H){for(const q in s){const se=s[q];for(const ee in se){const V=se[ee];if(V[H.id]===void 0)continue;const D=V[H.id];for(const z in D)x(D[z].object),delete D[z];delete V[H.id]}}}function A(H){for(const q in s){const se=s[q],ee=H.isInstancedMesh===!0?H.id:0,V=se[ee];if(V!==void 0){for(const D in V){const z=V[D];for(const K in z)x(z[K].object),delete z[K];delete V[D]}delete se[ee],Object.keys(se).length===0&&delete s[q]}}}function F(){j(),f=!0,c!==l&&(c=l,p(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:j,dispose:k,releaseStatesOfGeometry:L,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:R,enableAttribute:E,disableUnusedAttributes:N}}function Sw(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,x){x!==0&&(r.drawArraysInstanced(s,m,p,x),i.update(p,s,x))}function h(m,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,x);let g=0;for(let b=0;b<x;b++)g+=p[b];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function Ew(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==pa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const A=B===ps&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==aa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==Aa&&!A)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const x=m(p);x!==p&&(dt("WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),I=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),k=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:b,maxVertexTextures:M,maxTextureSize:R,maxCubemapSize:E,maxAttributes:S,maxVertexUniforms:N,maxVaryings:U,maxFragmentUniforms:I,maxSamples:k,samples:L}}function Mw(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new qs,h=new bt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const b=_.length!==0||g||s!==0||l;return l=g,s=_.length,b},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=x(_,g,0)},this.setState=function(_,g,b){const M=_.clippingPlanes,R=_.clipIntersection,E=_.clipShadows,S=r.get(_);if(!l||M===null||M.length===0||c&&!E)c?x(null):p();else{const N=c?0:s,U=N*4;let I=S.clippingState||null;m.value=I,I=x(M,g,U,b);for(let k=0;k!==U;++k)I[k]=i[k];S.clippingState=I,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function x(_,g,b,M){const R=_!==null?_.length:0;let E=null;if(R!==0){if(E=m.value,M!==!0||E===null){const S=b+R*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(E===null||E.length<S)&&(E=new Float32Array(S));for(let U=0,I=b;U!==R;++U,I+=4)f.copy(_[U]).applyMatrix4(N,h),f.normal.toArray(E,I),E[I+3]=f.constant}m.value=E,m.needsUpdate=!0}return e.numPlanes=R,e.numIntersection=0,E}}const Ks=4,tv=[.125,.215,.35,.446,.526,.582],Rr=20,Tw=256,kl=new mb,nv=new fn;let jh=null,Xh=0,Yh=0,Wh=!1;const Aw=new ae;class iv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=Aw}=c;jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),Wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(jh,Xh,Yh),this._renderer.xr.enabled=Wh,e.scissorTest=!1,Bo(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Lr||e.mapping===Xo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),Wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:di,minFilter:di,generateMipmaps:!1,type:ps,format:pa,colorSpace:ef,depthBuffer:!1},l=av(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=av(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ww(c)),this._blurMaterial=Cw(c,e,i),this._ggxMaterial=Rw(c,e,i)}return l}_compileMaterial(e){const i=new Da(new Ua,e);this._renderer.compile(i,kl)}_sceneToCubeUV(e,i,s,l,c){const m=new ia(90,1,i,s),p=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,b=_.toneMapping;_.getClearColor(nv),_.toneMapping=Ra,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Da(new rc,new om({name:"PMREM.Background",side:Ci,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,E=R.material;let S=!1;const N=e.background;N?N.isColor&&(E.color.copy(N),e.background=null,S=!0):(E.color.copy(nv),S=!0);for(let U=0;U<6;U++){const I=U%3;I===0?(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[U],c.y,c.z)):I===1?(m.up.set(0,0,p[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[U],c.z)):(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[U]));const k=this._cubeSize;Bo(l,I*k,U>2?k:0,k,k),_.setRenderTarget(l),S&&_.render(R,m),_.render(e,m)}_.toneMapping=b,_.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Lr||e.mapping===Xo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=rv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Bo(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,kl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),_=Math.sqrt(p*p-x*x),g=0+p*1.25,b=_*g,{_lodMax:M}=this,R=this._sizeLods[s],E=3*R*(s>M-Ks?s-M+Ks:0),S=4*(this._cubeSize-R);m.envMap.value=e.texture,m.roughness.value=b,m.mipInt.value=M-i,Bo(c,E,S,3*R,2*R),l.setRenderTarget(c),l.render(h,kl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-s,Bo(e,E,S,3*R,2*R),l.setRenderTarget(e),l.render(h,kl)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&qt("blur direction must be either latitudinal or longitudinal!");const x=3,_=this._lodMeshes[l];_.material=p;const g=p.uniforms,b=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*Rr-1),R=c/M,E=isFinite(c)?1+Math.floor(x*R):Rr;E>Rr&&dt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Rr}`);const S=[];let N=0;for(let B=0;B<Rr;++B){const A=B/R,F=Math.exp(-A*A/2);S.push(F),B===0?N+=F:B<E&&(N+=2*F)}for(let B=0;B<S.length;B++)S[B]=S[B]/N;g.envMap.value=e.texture,g.samples.value=E,g.weights.value=S,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:U}=this;g.dTheta.value=M,g.mipInt.value=U-s;const I=this._sizeLods[l],k=3*I*(l>U-Ks?l-U+Ks:0),L=4*(this._cubeSize-I);Bo(i,k,L,3*I,2*I),m.setRenderTarget(i),m.render(_,kl)}}function ww(r){const e=[],i=[],s=[];let l=r;const c=r-Ks+1+tv.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-Ks?m=tv[f-r+Ks-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),x=-p,_=1+p,g=[x,x,_,x,_,_,x,x,_,_,x,_],b=6,M=6,R=3,E=2,S=1,N=new Float32Array(R*M*b),U=new Float32Array(E*M*b),I=new Float32Array(S*M*b);for(let L=0;L<b;L++){const B=L%3*2/3-1,A=L>2?0:-1,F=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];N.set(F,R*M*L),U.set(g,E*M*L);const j=[L,L,L,L,L,L];I.set(j,S*M*L)}const k=new Ua;k.setAttribute("position",new Na(N,R)),k.setAttribute("uv",new Na(U,E)),k.setAttribute("faceIndex",new Na(I,S)),s.push(new Da(k,null)),l>Ks&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function av(r,e,i){const s=new Ca(r,e,i);return s.texture.mapping=sf,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Bo(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function Rw(r,e,i){return new La({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Tw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lf(),fragmentShader:`

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
		`,blending:ds,depthTest:!1,depthWrite:!1})}function Cw(r,e,i){const s=new Float32Array(Rr),l=new ae(0,1,0);return new La({name:"SphericalGaussianBlur",defines:{n:Rr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:lf(),fragmentShader:`

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
		`,blending:ds,depthTest:!1,depthWrite:!1})}function sv(){return new La({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lf(),fragmentShader:`

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
		`,blending:ds,depthTest:!1,depthWrite:!1})}function rv(){return new La({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ds,depthTest:!1,depthWrite:!1})}function lf(){return`

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
	`}class _b extends Ca{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new fb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new rc(5,5,5),c=new La({name:"CubemapFromEquirect",uniforms:Wo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Ci,blending:ds});c.uniforms.tEquirect.value=i;const f=new Da(l,c),h=i.minFilter;return i.minFilter===Cr&&(i.minFilter=di),new UT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function Nw(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,b=!1){return g==null?null:b?f(g):c(g)}function c(g){if(g&&g.isTexture){const b=g.mapping;if(b===ku||b===_h)if(e.has(g)){const M=e.get(g).texture;return h(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const R=new _b(M.height);return R.fromEquirectangularTexture(r,g),e.set(g,R),g.addEventListener("dispose",p),h(R.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const b=g.mapping,M=b===ku||b===_h,R=b===Lr||b===Xo;if(M||R){let E=i.get(g);const S=E!==void 0?E.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new iv(r)),E=M?s.fromEquirectangular(g,E):s.fromCubemap(g,E),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),E.texture;if(E!==void 0)return E.texture;{const N=g.image;return M&&N&&N.height>0||R&&N&&m(N)?(s===null&&(s=new iv(r)),E=M?s.fromEquirectangular(g):s.fromCubemap(g),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),g.addEventListener("dispose",x),E.texture):null}}}return g}function h(g,b){return b===ku?g.mapping=Lr:b===_h&&(g.mapping=Xo),g}function m(g){let b=0;const M=6;for(let R=0;R<M;R++)g[R]!==void 0&&b++;return b===M}function p(g){const b=g.target;b.removeEventListener("dispose",p);const M=e.get(b);M!==void 0&&(e.delete(b),M.dispose())}function x(g){const b=g.target;b.removeEventListener("dispose",x);const M=i.get(b);M!==void 0&&(i.delete(b),M.dispose())}function _(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:_}}function Ow(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&kp("WebGLRenderer: "+s+" extension not supported."),l}}}function Dw(r,e,i,s){const l={},c=new WeakMap;function f(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",f),delete l[g.id];const b=c.get(g);b&&(e.remove(b),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(_,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(_){const g=_.attributes;for(const b in g)e.update(g[b],r.ARRAY_BUFFER)}function p(_){const g=[],b=_.index,M=_.attributes.position;let R=0;if(M===void 0)return;if(b!==null){const N=b.array;R=b.version;for(let U=0,I=N.length;U<I;U+=3){const k=N[U+0],L=N[U+1],B=N[U+2];g.push(k,L,L,B,B,k)}}else{const N=M.array;R=M.version;for(let U=0,I=N.length/3-1;U<I;U+=3){const k=U+0,L=U+1,B=U+2;g.push(k,L,L,B,B,k)}}const E=new(M.count>=65535?lb:ob)(g,1);E.version=R;const S=c.get(_);S&&e.remove(S),c.set(_,E)}function x(_){const g=c.get(_);if(g){const b=_.index;b!==null&&g.version<b.version&&p(_)}else p(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:x}}function Lw(r,e,i){let s;function l(_){s=_}let c,f;function h(_){c=_.type,f=_.bytesPerElement}function m(_,g){r.drawElements(s,g,c,_*f),i.update(g,s,1)}function p(_,g,b){b!==0&&(r.drawElementsInstanced(s,g,c,_*f,b),i.update(g,s,b))}function x(_,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,_,0,b);let R=0;for(let E=0;E<b;E++)R+=g[E];i.update(R,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=x}function Uw(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:qt("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Iw(r,e,i){const s=new WeakMap,l=new Un;function c(f,h,m){const p=f.morphTargetInfluences,x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=x!==void 0?x.length:0;let g=s.get(h);if(g===void 0||g.count!==_){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const b=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let U=0;b===!0&&(U=1),M===!0&&(U=2),R===!0&&(U=3);let I=h.attributes.position.count*U,k=1;I>e.maxTextureSize&&(k=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const L=new Float32Array(I*k*4*_),B=new ab(L,I,k,_);B.type=Aa,B.needsUpdate=!0;const A=U*4;for(let j=0;j<_;j++){const H=E[j],q=S[j],se=N[j],ee=I*k*4*j;for(let V=0;V<H.count;V++){const D=V*A;b===!0&&(l.fromBufferAttribute(H,V),L[ee+D+0]=l.x,L[ee+D+1]=l.y,L[ee+D+2]=l.z,L[ee+D+3]=0),M===!0&&(l.fromBufferAttribute(q,V),L[ee+D+4]=l.x,L[ee+D+5]=l.y,L[ee+D+6]=l.z,L[ee+D+7]=0),R===!0&&(l.fromBufferAttribute(se,V),L[ee+D+8]=l.x,L[ee+D+9]=l.y,L[ee+D+10]=l.z,L[ee+D+11]=se.itemSize===4?l.w:1)}}g={count:_,texture:B,size:new Ct(I,k)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let b=0;for(let R=0;R<p.length;R++)b+=p[R];const M=h.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",M),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function Pw(r,e,i,s,l){let c=new WeakMap;function f(p){const x=l.render.frame,_=p.geometry,g=e.get(p,_);if(c.get(g)!==x&&(e.update(g),c.set(g,x)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==x&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,x))),p.isSkinnedMesh){const b=p.skeleton;c.get(b)!==x&&(b.update(),c.set(b,x))}return g}function h(){c=new WeakMap}function m(p){const x=p.target;x.removeEventListener("dispose",m),s.releaseStatesOfObject(x),i.remove(x.instanceMatrix),x.instanceColor!==null&&i.remove(x.instanceColor)}return{update:f,dispose:h}}const Fw={[kv]:"LINEAR_TONE_MAPPING",[Vv]:"REINHARD_TONE_MAPPING",[jv]:"CINEON_TONE_MAPPING",[Xv]:"ACES_FILMIC_TONE_MAPPING",[Wv]:"AGX_TONE_MAPPING",[qv]:"NEUTRAL_TONE_MAPPING",[Yv]:"CUSTOM_TONE_MAPPING"};function Bw(r,e,i,s,l){const c=new Ca(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new Yo(e,i):void 0}),f=new Ca(e,i,{type:ps,depthBuffer:!1,stencilBuffer:!1}),h=new Ua;h.setAttribute("position",new sa([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new sa([0,2,0,0,2,0],2));const m=new wT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Da(h,m),x=new mb(-1,1,1,-1,0,1);let _=null,g=null,b=!1,M,R=null,E=[],S=!1;this.setSize=function(N,U){c.setSize(N,U),f.setSize(N,U);for(let I=0;I<E.length;I++){const k=E[I];k.setSize&&k.setSize(N,U)}},this.setEffects=function(N){E=N,S=E.length>0&&E[0].isRenderPass===!0;const U=c.width,I=c.height;for(let k=0;k<E.length;k++){const L=E[k];L.setSize&&L.setSize(U,I)}},this.begin=function(N,U){if(b||N.toneMapping===Ra&&E.length===0)return!1;if(R=U,U!==null){const I=U.width,k=U.height;(c.width!==I||c.height!==k)&&this.setSize(I,k)}return S===!1&&N.setRenderTarget(c),M=N.toneMapping,N.toneMapping=Ra,!0},this.hasRenderPass=function(){return S},this.end=function(N,U){N.toneMapping=M,b=!0;let I=c,k=f;for(let L=0;L<E.length;L++){const B=E[L];if(B.enabled!==!1&&(B.render(N,k,I,U),B.needsSwap!==!1)){const A=I;I=k,k=A}}if(_!==N.outputColorSpace||g!==N.toneMapping){_=N.outputColorSpace,g=N.toneMapping,m.defines={},kt.getTransfer(_)===rn&&(m.defines.SRGB_TRANSFER="");const L=Fw[g];L&&(m.defines[L]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=I.texture,N.setRenderTarget(R),N.render(p,x),R=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const vb=new hi,jp=new Yo(1,1),bb=new ab,yb=new aT,Sb=new fb,ov=[],lv=[],cv=new Float32Array(16),uv=new Float32Array(9),fv=new Float32Array(4);function qo(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=ov[l];if(c===void 0&&(c=new Float32Array(l),ov[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function Wn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function qn(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function cf(r,e){let i=lv[e];i===void 0&&(i=new Int32Array(e),lv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function zw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function Gw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Wn(i,e))return;r.uniform2fv(this.addr,e),qn(i,e)}}function Hw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Wn(i,e))return;r.uniform3fv(this.addr,e),qn(i,e)}}function kw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Wn(i,e))return;r.uniform4fv(this.addr,e),qn(i,e)}}function Vw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Wn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),qn(i,e)}else{if(Wn(i,s))return;fv.set(s),r.uniformMatrix2fv(this.addr,!1,fv),qn(i,s)}}function jw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Wn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),qn(i,e)}else{if(Wn(i,s))return;uv.set(s),r.uniformMatrix3fv(this.addr,!1,uv),qn(i,s)}}function Xw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Wn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),qn(i,e)}else{if(Wn(i,s))return;cv.set(s),r.uniformMatrix4fv(this.addr,!1,cv),qn(i,s)}}function Yw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function Ww(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Wn(i,e))return;r.uniform2iv(this.addr,e),qn(i,e)}}function qw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Wn(i,e))return;r.uniform3iv(this.addr,e),qn(i,e)}}function $w(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Wn(i,e))return;r.uniform4iv(this.addr,e),qn(i,e)}}function Kw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function Zw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Wn(i,e))return;r.uniform2uiv(this.addr,e),qn(i,e)}}function Qw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Wn(i,e))return;r.uniform3uiv(this.addr,e),qn(i,e)}}function Jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Wn(i,e))return;r.uniform4uiv(this.addr,e),qn(i,e)}}function eR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(jp.compareFunction=i.isReversedDepthBuffer()?am:im,c=jp):c=vb,i.setTexture2D(e||c,l)}function tR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||yb,l)}function nR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||Sb,l)}function iR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||bb,l)}function aR(r){switch(r){case 5126:return zw;case 35664:return Gw;case 35665:return Hw;case 35666:return kw;case 35674:return Vw;case 35675:return jw;case 35676:return Xw;case 5124:case 35670:return Yw;case 35667:case 35671:return Ww;case 35668:case 35672:return qw;case 35669:case 35673:return $w;case 5125:return Kw;case 36294:return Zw;case 36295:return Qw;case 36296:return Jw;case 35678:case 36198:case 36298:case 36306:case 35682:return eR;case 35679:case 36299:case 36307:return tR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}function sR(r,e){r.uniform1fv(this.addr,e)}function rR(r,e){const i=qo(e,this.size,2);r.uniform2fv(this.addr,i)}function oR(r,e){const i=qo(e,this.size,3);r.uniform3fv(this.addr,i)}function lR(r,e){const i=qo(e,this.size,4);r.uniform4fv(this.addr,i)}function cR(r,e){const i=qo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function uR(r,e){const i=qo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function fR(r,e){const i=qo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function dR(r,e){r.uniform1iv(this.addr,e)}function hR(r,e){r.uniform2iv(this.addr,e)}function pR(r,e){r.uniform3iv(this.addr,e)}function mR(r,e){r.uniform4iv(this.addr,e)}function gR(r,e){r.uniform1uiv(this.addr,e)}function xR(r,e){r.uniform2uiv(this.addr,e)}function _R(r,e){r.uniform3uiv(this.addr,e)}function vR(r,e){r.uniform4uiv(this.addr,e)}function bR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Wn(s,c)||(r.uniform1iv(this.addr,c),qn(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=jp:f=vb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function yR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Wn(s,c)||(r.uniform1iv(this.addr,c),qn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||yb,c[f])}function SR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Wn(s,c)||(r.uniform1iv(this.addr,c),qn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||Sb,c[f])}function ER(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Wn(s,c)||(r.uniform1iv(this.addr,c),qn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||bb,c[f])}function MR(r){switch(r){case 5126:return sR;case 35664:return rR;case 35665:return oR;case 35666:return lR;case 35674:return cR;case 35675:return uR;case 35676:return fR;case 5124:case 35670:return dR;case 35667:case 35671:return hR;case 35668:case 35672:return pR;case 35669:case 35673:return mR;case 5125:return gR;case 36294:return xR;case 36295:return _R;case 36296:return vR;case 35678:case 36198:case 36298:case 36306:case 35682:return bR;case 35679:case 36299:case 36307:return yR;case 35680:case 36300:case 36308:case 36293:return SR;case 36289:case 36303:case 36311:case 36292:return ER}}class TR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=aR(i.type)}}class AR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=MR(i.type)}}class wR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const qh=/(\w+)(\])?(\[|\.)?/g;function dv(r,e){r.seq.push(e),r.map[e.id]=e}function RR(r,e,i){const s=r.name,l=s.length;for(qh.lastIndex=0;;){const c=qh.exec(s),f=qh.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){dv(i,p===void 0?new TR(h,r,e):new AR(h,r,e));break}else{let _=i.map[h];_===void 0&&(_=new wR(h),dv(i,_)),i=_}}}class qu{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);RR(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function hv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const CR=37297;let NR=0;function OR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const pv=new bt;function DR(r){kt._getMatrix(pv,kt.workingColorSpace,r);const e=`mat3( ${pv.elements.map(i=>i.toFixed(4))} )`;switch(kt.getTransfer(r)){case tf:return[e,"LinearTransferOETF"];case rn:return[e,"sRGBTransferOETF"];default:return dt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function mv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+OR(r.getShaderSource(e),h)}else return c}function LR(r,e){const i=DR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const UR={[kv]:"Linear",[Vv]:"Reinhard",[jv]:"Cineon",[Xv]:"ACESFilmic",[Wv]:"AgX",[qv]:"Neutral",[Yv]:"Custom"};function IR(r,e){const i=UR[e];return i===void 0?(dt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Fu=new ae;function PR(){kt.getLuminanceCoefficients(Fu);const r=Fu.x.toFixed(4),e=Fu.y.toFixed(4),i=Fu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function FR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yl).join(`
`)}function BR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function zR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function Yl(r){return r!==""}function gv(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xv(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xp(r){return r.replace(GR,kR)}const HR=new Map;function kR(r,e){let i=At[e];if(i===void 0){const s=HR.get(e);if(s!==void 0)i=At[s],dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Xp(i)}const VR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _v(r){return r.replace(VR,jR)}function jR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function vv(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const XR={[Hu]:"SHADOWMAP_TYPE_PCF",[Xl]:"SHADOWMAP_TYPE_VSM"};function YR(r){return XR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const WR={[Lr]:"ENVMAP_TYPE_CUBE",[Xo]:"ENVMAP_TYPE_CUBE",[sf]:"ENVMAP_TYPE_CUBE_UV"};function qR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":WR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const $R={[Xo]:"ENVMAP_MODE_REFRACTION"};function KR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":$R[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ZR={[Hv]:"ENVMAP_BLENDING_MULTIPLY",[PM]:"ENVMAP_BLENDING_MIX",[FM]:"ENVMAP_BLENDING_ADD"};function QR(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":ZR[r.combine]||"ENVMAP_BLENDING_NONE"}function JR(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function eC(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=YR(i),p=qR(i),x=KR(i),_=QR(i),g=JR(i),b=FR(i),M=BR(c),R=l.createProgram();let E,S,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Yl).join(`
`),E.length>0&&(E+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Yl).join(`
`),S.length>0&&(S+=`
`)):(E=[vv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yl).join(`
`),S=[vv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+x:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ra?"#define TONE_MAPPING":"",i.toneMapping!==Ra?At.tonemapping_pars_fragment:"",i.toneMapping!==Ra?IR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",At.colorspace_pars_fragment,LR("linearToOutputTexel",i.outputColorSpace),PR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Yl).join(`
`)),f=Xp(f),f=gv(f,i),f=xv(f,i),h=Xp(h),h=gv(h,i),h=xv(h,i),f=_v(f),h=_v(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,E=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,S=["#define varying in",i.glslVersion===O_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===O_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const U=N+E+f,I=N+S+h,k=hv(l,l.VERTEX_SHADER,U),L=hv(l,l.FRAGMENT_SHADER,I);l.attachShader(R,k),l.attachShader(R,L),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function B(H){if(r.debug.checkShaderErrors){const q=l.getProgramInfoLog(R)||"",se=l.getShaderInfoLog(k)||"",ee=l.getShaderInfoLog(L)||"",V=q.trim(),D=se.trim(),z=ee.trim();let K=!0,ue=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,k,L);else{const ge=mv(l,k,"vertex"),P=mv(l,L,"fragment");qt("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+V+`
`+ge+`
`+P)}else V!==""?dt("WebGLProgram: Program Info Log:",V):(D===""||z==="")&&(ue=!1);ue&&(H.diagnostics={runnable:K,programLog:V,vertexShader:{log:D,prefix:E},fragmentShader:{log:z,prefix:S}})}l.deleteShader(k),l.deleteShader(L),A=new qu(l,R),F=zR(l,R)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let j=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=l.getProgramParameter(R,CR)),j},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=NR++,this.cacheKey=e,this.usedTimes=1,this.program=R,this.vertexShader=k,this.fragmentShader=L,this}let tC=0;class nC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new iC(e),i.set(e,s)),s}}class iC{constructor(e){this.id=tC++,this.code=e,this.usedTimes=0}}function aC(r){return r===Ur||r===Qu||r===Ju}function sC(r,e,i,s,l,c){const f=new sb,h=new nC,m=new Set,p=[],x=new Map,_=s.logarithmicDepthBuffer;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return m.add(A),A===0?"uv":`uv${A}`}function R(A,F,j,H,q,se){const ee=H.fog,V=q.geometry,D=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,z=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,K=e.get(A.envMap||D,z),ue=K&&K.mapping===sf?K.image.height:null,ge=b[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&dt("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const P=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Z=P!==void 0?P.length:0;let _e=0;V.morphAttributes.position!==void 0&&(_e=1),V.morphAttributes.normal!==void 0&&(_e=2),V.morphAttributes.color!==void 0&&(_e=3);let Ae,Ne,te,Se;if(ge){const ot=Ta[ge];Ae=ot.vertexShader,Ne=ot.fragmentShader}else Ae=A.vertexShader,Ne=A.fragmentShader,h.update(A),te=h.getVertexShaderID(A),Se=h.getFragmentShaderID(A);const ye=r.getRenderTarget(),Ge=r.state.buffers.depth.getReversed(),We=q.isInstancedMesh===!0,Qe=q.isBatchedMesh===!0,St=!!A.map,Xe=!!A.matcap,wt=!!K,Bt=!!A.aoMap,ht=!!A.lightMap,It=!!A.bumpMap,Zt=!!A.normalMap,Ze=!!A.displacementMap,Y=!!A.emissiveMap,Nt=!!A.metalnessMap,ft=!!A.roughnessMap,Vt=A.anisotropy>0,Ce=A.clearcoat>0,Qt=A.dispersion>0,O=A.iridescence>0,T=A.sheen>0,J=A.transmission>0,he=Vt&&!!A.anisotropyMap,Me=Ce&&!!A.clearcoatMap,Oe=Ce&&!!A.clearcoatNormalMap,Pe=Ce&&!!A.clearcoatRoughnessMap,de=O&&!!A.iridescenceMap,pe=O&&!!A.iridescenceThicknessMap,Le=T&&!!A.sheenColorMap,Be=T&&!!A.sheenRoughnessMap,Ie=!!A.specularMap,De=!!A.specularColorMap,ut=!!A.specularIntensityMap,rt=J&&!!A.transmissionMap,Mt=J&&!!A.thicknessMap,X=!!A.gradientMap,Re=!!A.alphaMap,me=A.alphaTest>0,He=!!A.alphaHash,Ue=!!A.extensions;let Te=Ra;A.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Te=r.toneMapping);const qe={shaderID:ge,shaderType:A.type,shaderName:A.name,vertexShader:Ae,fragmentShader:Ne,defines:A.defines,customVertexShaderID:te,customFragmentShaderID:Se,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&q._colorsTexture!==null,instancing:We,instancingColor:We&&q.instanceColor!==null,instancingMorph:We&&q.morphTexture!==null,outputColorSpace:ye===null?r.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:St,matcap:Xe,envMap:wt,envMapMode:wt&&K.mapping,envMapCubeUVHeight:ue,aoMap:Bt,lightMap:ht,bumpMap:It,normalMap:Zt,displacementMap:Ze,emissiveMap:Y,normalMapObjectSpace:Zt&&A.normalMapType===GM,normalMapTangentSpace:Zt&&A.normalMapType===R_,packedNormalMap:Zt&&A.normalMapType===R_&&aC(A.normalMap.format),metalnessMap:Nt,roughnessMap:ft,anisotropy:Vt,anisotropyMap:he,clearcoat:Ce,clearcoatMap:Me,clearcoatNormalMap:Oe,clearcoatRoughnessMap:Pe,dispersion:Qt,iridescence:O,iridescenceMap:de,iridescenceThicknessMap:pe,sheen:T,sheenColorMap:Le,sheenRoughnessMap:Be,specularMap:Ie,specularColorMap:De,specularIntensityMap:ut,transmission:J,transmissionMap:rt,thicknessMap:Mt,gradientMap:X,opaque:A.transparent===!1&&A.blending===Ho&&A.alphaToCoverage===!1,alphaMap:Re,alphaTest:me,alphaHash:He,combine:A.combine,mapUv:St&&M(A.map.channel),aoMapUv:Bt&&M(A.aoMap.channel),lightMapUv:ht&&M(A.lightMap.channel),bumpMapUv:It&&M(A.bumpMap.channel),normalMapUv:Zt&&M(A.normalMap.channel),displacementMapUv:Ze&&M(A.displacementMap.channel),emissiveMapUv:Y&&M(A.emissiveMap.channel),metalnessMapUv:Nt&&M(A.metalnessMap.channel),roughnessMapUv:ft&&M(A.roughnessMap.channel),anisotropyMapUv:he&&M(A.anisotropyMap.channel),clearcoatMapUv:Me&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:Be&&M(A.sheenRoughnessMap.channel),specularMapUv:Ie&&M(A.specularMap.channel),specularColorMapUv:De&&M(A.specularColorMap.channel),specularIntensityMapUv:ut&&M(A.specularIntensityMap.channel),transmissionMapUv:rt&&M(A.transmissionMap.channel),thicknessMapUv:Mt&&M(A.thicknessMap.channel),alphaMapUv:Re&&M(A.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Zt||Vt),vertexNormals:!!V.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!V.attributes.uv&&(St||Re),fog:!!ee,useFog:A.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||V.attributes.normal===void 0&&Zt===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Ge,skinning:q.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:_e,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:se.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&j.length>0,shadowMapType:r.shadowMap.type,toneMapping:Te,decodeVideoTexture:St&&A.map.isVideoTexture===!0&&kt.getTransfer(A.map.colorSpace)===rn,decodeVideoTextureEmissive:Y&&A.emissiveMap.isVideoTexture===!0&&kt.getTransfer(A.emissiveMap.colorSpace)===rn,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===us,flipSided:A.side===Ci,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ue&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&A.extensions.multiDraw===!0||Qe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return qe.vertexUv1s=m.has(1),qe.vertexUv2s=m.has(2),qe.vertexUv3s=m.has(3),m.clear(),qe}function E(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const j in A.defines)F.push(j),F.push(A.defines[j]);return A.isRawShaderMaterial===!1&&(S(F,A),N(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function S(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function N(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function U(A){const F=b[A.type];let j;if(F){const H=Ta[F];j=MT.clone(H.uniforms)}else j=A.uniforms;return j}function I(A,F){let j=x.get(F);return j!==void 0?++j.usedTimes:(j=new eC(r,F,A,l),p.push(j),x.set(F,j)),j}function k(A){if(--A.usedTimes===0){const F=p.indexOf(A);p[F]=p[p.length-1],p.pop(),x.delete(A.cacheKey),A.destroy()}}function L(A){h.remove(A)}function B(){h.dispose()}return{getParameters:R,getProgramCacheKey:E,getUniforms:U,acquireProgram:I,releaseProgram:k,releaseShaderCache:L,programs:p,dispose:B}}function rC(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function oC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function bv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function yv(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let b=0;return g.isInstancedMesh&&(b+=2),g.isSkinnedMesh&&(b+=1),b}function h(g,b,M,R,E,S){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:b,material:M,materialVariant:f(g),groupOrder:R,renderOrder:g.renderOrder,z:E,group:S},r[e]=N):(N.id=g.id,N.object=g,N.geometry=b,N.material=M,N.materialVariant=f(g),N.groupOrder=R,N.renderOrder=g.renderOrder,N.z=E,N.group=S),e++,N}function m(g,b,M,R,E,S){const N=h(g,b,M,R,E,S);M.transmission>0?s.push(N):M.transparent===!0?l.push(N):i.push(N)}function p(g,b,M,R,E,S){const N=h(g,b,M,R,E,S);M.transmission>0?s.unshift(N):M.transparent===!0?l.unshift(N):i.unshift(N)}function x(g,b){i.length>1&&i.sort(g||oC),s.length>1&&s.sort(b||bv),l.length>1&&l.sort(b||bv)}function _(){for(let g=e,b=r.length;g<b;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:_,sort:x}}function lC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new yv,r.set(s,[f])):l>=c.length?(f=new yv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function cC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ae,color:new fn};break;case"SpotLight":i={position:new ae,direction:new ae,color:new fn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ae,color:new fn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ae,skyColor:new fn,groundColor:new fn};break;case"RectAreaLight":i={color:new fn,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return r[e.id]=i,i}}}function uC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let fC=0;function dC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function hC(r){const e=new cC,i=uC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ae);const l=new ae,c=new Yn,f=new Yn;function h(p){let x=0,_=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let b=0,M=0,R=0,E=0,S=0,N=0,U=0,I=0,k=0,L=0,B=0;p.sort(dC);for(let F=0,j=p.length;F<j;F++){const H=p[F],q=H.color,se=H.intensity,ee=H.distance;let V=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===Ur?V=H.shadow.map.texture:V=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)x+=q.r*se,_+=q.g*se,g+=q.b*se;else if(H.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(H.sh.coefficients[D],se);B++}else if(H.isDirectionalLight){const D=e.get(H);if(D.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const z=H.shadow,K=i.get(H);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,s.directionalShadow[b]=K,s.directionalShadowMap[b]=V,s.directionalShadowMatrix[b]=H.shadow.matrix,N++}s.directional[b]=D,b++}else if(H.isSpotLight){const D=e.get(H);D.position.setFromMatrixPosition(H.matrixWorld),D.color.copy(q).multiplyScalar(se),D.distance=ee,D.coneCos=Math.cos(H.angle),D.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),D.decay=H.decay,s.spot[R]=D;const z=H.shadow;if(H.map&&(s.spotLightMap[k]=H.map,k++,z.updateMatrices(H),H.castShadow&&L++),s.spotLightMatrix[R]=z.matrix,H.castShadow){const K=i.get(H);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,s.spotShadow[R]=K,s.spotShadowMap[R]=V,I++}R++}else if(H.isRectAreaLight){const D=e.get(H);D.color.copy(q).multiplyScalar(se),D.halfWidth.set(H.width*.5,0,0),D.halfHeight.set(0,H.height*.5,0),s.rectArea[E]=D,E++}else if(H.isPointLight){const D=e.get(H);if(D.color.copy(H.color).multiplyScalar(H.intensity),D.distance=H.distance,D.decay=H.decay,H.castShadow){const z=H.shadow,K=i.get(H);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,K.shadowCameraNear=z.camera.near,K.shadowCameraFar=z.camera.far,s.pointShadow[M]=K,s.pointShadowMap[M]=V,s.pointShadowMatrix[M]=H.shadow.matrix,U++}s.point[M]=D,M++}else if(H.isHemisphereLight){const D=e.get(H);D.skyColor.copy(H.color).multiplyScalar(se),D.groundColor.copy(H.groundColor).multiplyScalar(se),s.hemi[S]=D,S++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=je.LTC_FLOAT_1,s.rectAreaLTC2=je.LTC_FLOAT_2):(s.rectAreaLTC1=je.LTC_HALF_1,s.rectAreaLTC2=je.LTC_HALF_2)),s.ambient[0]=x,s.ambient[1]=_,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==b||A.pointLength!==M||A.spotLength!==R||A.rectAreaLength!==E||A.hemiLength!==S||A.numDirectionalShadows!==N||A.numPointShadows!==U||A.numSpotShadows!==I||A.numSpotMaps!==k||A.numLightProbes!==B)&&(s.directional.length=b,s.spot.length=R,s.rectArea.length=E,s.point.length=M,s.hemi.length=S,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=I,s.spotShadowMap.length=I,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=I+k-L,s.spotLightMap.length=k,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=B,A.directionalLength=b,A.pointLength=M,A.spotLength=R,A.rectAreaLength=E,A.hemiLength=S,A.numDirectionalShadows=N,A.numPointShadows=U,A.numSpotShadows=I,A.numSpotMaps=k,A.numLightProbes=B,s.version=fC++)}function m(p,x){let _=0,g=0,b=0,M=0,R=0;const E=x.matrixWorldInverse;for(let S=0,N=p.length;S<N;S++){const U=p[S];if(U.isDirectionalLight){const I=s.directional[_];I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(E),_++}else if(U.isSpotLight){const I=s.spot[b];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(E),b++}else if(U.isRectAreaLight){const I=s.rectArea[M];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),f.identity(),c.copy(U.matrixWorld),c.premultiply(E),f.extractRotation(c),I.halfWidth.set(U.width*.5,0,0),I.halfHeight.set(0,U.height*.5,0),I.halfWidth.applyMatrix4(f),I.halfHeight.applyMatrix4(f),M++}else if(U.isPointLight){const I=s.point[g];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),g++}else if(U.isHemisphereLight){const I=s.hemi[R];I.direction.setFromMatrixPosition(U.matrixWorld),I.direction.transformDirection(E),R++}}}return{setup:h,setupView:m,state:s}}function Sv(r){const e=new hC(r),i=[],s=[],l=[];function c(g){_.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function x(g){e.setupView(i,g)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:x,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function pC(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new Sv(r),e.set(l,[h])):c>=f.length?(h=new Sv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const mC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gC=`uniform sampler2D shadow_pass;
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
}`,xC=[new ae(1,0,0),new ae(-1,0,0),new ae(0,1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1)],_C=[new ae(0,-1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1),new ae(0,-1,0),new ae(0,-1,0)],Ev=new Yn,Vl=new ae,$h=new ae;function vC(r,e,i){let s=new ub;const l=new Ct,c=new Ct,f=new Un,h=new RT,m=new CT,p={},x=i.maxTextureSize,_={[Qs]:Ci,[Ci]:Qs,[us]:us},g=new La({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:mC,fragmentShader:gC}),b=g.clone();b.defines.HORIZONTAL_PASS=1;const M=new Ua;M.setAttribute("position",new Na(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Da(M,g),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let S=this.type;this.render=function(L,B,A){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||L.length===0)return;this.type===xM&&(dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hu);const F=r.getRenderTarget(),j=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),q=r.state;q.setBlending(ds),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const se=S!==this.type;se&&B.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(V=>V.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,V=L.length;ee<V;ee++){const D=L[ee],z=D.shadow;if(z===void 0){dt("WebGLShadowMap:",D,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;l.copy(z.mapSize);const K=z.getFrameExtents();l.multiply(K),c.copy(z.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/K.x),l.x=c.x*K.x,z.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/K.y),l.y=c.y*K.y,z.mapSize.y=c.y));const ue=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ue,z.map===null||se===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Xl){if(D.isPointLight){dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Ca(l.x,l.y,{format:Ur,type:ps,minFilter:di,magFilter:di,generateMipmaps:!1}),z.map.texture.name=D.name+".shadowMap",z.map.depthTexture=new Yo(l.x,l.y,Aa),z.map.depthTexture.name=D.name+".shadowMapDepth",z.map.depthTexture.format=ms,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=si,z.map.depthTexture.magFilter=si}else D.isPointLight?(z.map=new _b(l.x),z.map.depthTexture=new ST(l.x,Oa)):(z.map=new Ca(l.x,l.y),z.map.depthTexture=new Yo(l.x,l.y,Oa)),z.map.depthTexture.name=D.name+".shadowMap",z.map.depthTexture.format=ms,this.type===Hu?(z.map.depthTexture.compareFunction=ue?am:im,z.map.depthTexture.minFilter=di,z.map.depthTexture.magFilter=di):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=si,z.map.depthTexture.magFilter=si);z.camera.updateProjectionMatrix()}const ge=z.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<ge;P++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,P),r.clear();else{P===0&&(r.setRenderTarget(z.map),r.clear());const Z=z.getViewport(P);f.set(c.x*Z.x,c.y*Z.y,c.x*Z.z,c.y*Z.w),q.viewport(f)}if(D.isPointLight){const Z=z.camera,_e=z.matrix,Ae=D.distance||Z.far;Ae!==Z.far&&(Z.far=Ae,Z.updateProjectionMatrix()),Vl.setFromMatrixPosition(D.matrixWorld),Z.position.copy(Vl),$h.copy(Z.position),$h.add(xC[P]),Z.up.copy(_C[P]),Z.lookAt($h),Z.updateMatrixWorld(),_e.makeTranslation(-Vl.x,-Vl.y,-Vl.z),Ev.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Ev,Z.coordinateSystem,Z.reversedDepth)}else z.updateMatrices(D);s=z.getFrustum(),I(B,A,z.camera,D,this.type)}z.isPointLightShadow!==!0&&this.type===Xl&&N(z,A),z.needsUpdate=!1}S=this.type,E.needsUpdate=!1,r.setRenderTarget(F,j,H)};function N(L,B){const A=e.update(R);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,b.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,b.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Ca(l.x,l.y,{format:Ur,type:ps})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(B,null,A,g,R,null),b.uniforms.shadow_pass.value=L.mapPass.texture,b.uniforms.resolution.value=L.mapSize,b.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(B,null,A,b,R,null)}function U(L,B,A,F){let j=null;const H=A.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(H!==void 0)j=H;else if(j=A.isPointLight===!0?m:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const q=j.uuid,se=B.uuid;let ee=p[q];ee===void 0&&(ee={},p[q]=ee);let V=ee[se];V===void 0&&(V=j.clone(),ee[se]=V,B.addEventListener("dispose",k)),j=V}if(j.visible=B.visible,j.wireframe=B.wireframe,F===Xl?j.side=B.shadowSide!==null?B.shadowSide:B.side:j.side=B.shadowSide!==null?B.shadowSide:_[B.side],j.alphaMap=B.alphaMap,j.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,j.map=B.map,j.clipShadows=B.clipShadows,j.clippingPlanes=B.clippingPlanes,j.clipIntersection=B.clipIntersection,j.displacementMap=B.displacementMap,j.displacementScale=B.displacementScale,j.displacementBias=B.displacementBias,j.wireframeLinewidth=B.wireframeLinewidth,j.linewidth=B.linewidth,A.isPointLight===!0&&j.isMeshDistanceMaterial===!0){const q=r.properties.get(j);q.light=A}return j}function I(L,B,A,F,j){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&j===Xl)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,L.matrixWorld);const se=e.update(L),ee=L.material;if(Array.isArray(ee)){const V=se.groups;for(let D=0,z=V.length;D<z;D++){const K=V[D],ue=ee[K.materialIndex];if(ue&&ue.visible){const ge=U(L,ue,F,j);L.onBeforeShadow(r,L,B,A,se,ge,K),r.renderBufferDirect(A,null,se,ge,L,K),L.onAfterShadow(r,L,B,A,se,ge,K)}}}else if(ee.visible){const V=U(L,ee,F,j);L.onBeforeShadow(r,L,B,A,se,V,null),r.renderBufferDirect(A,null,se,V,L,null),L.onAfterShadow(r,L,B,A,se,V,null)}}const q=L.children;for(let se=0,ee=q.length;se<ee;se++)I(q[se],B,A,F,j)}function k(L){L.target.removeEventListener("dispose",k);for(const A in p){const F=p[A],j=L.target.uuid;j in F&&(F[j].dispose(),delete F[j])}}}function bC(r,e){function i(){let X=!1;const Re=new Un;let me=null;const He=new Un(0,0,0,0);return{setMask:function(Ue){me!==Ue&&!X&&(r.colorMask(Ue,Ue,Ue,Ue),me=Ue)},setLocked:function(Ue){X=Ue},setClear:function(Ue,Te,qe,ot,xn){xn===!0&&(Ue*=ot,Te*=ot,qe*=ot),Re.set(Ue,Te,qe,ot),He.equals(Re)===!1&&(r.clearColor(Ue,Te,qe,ot),He.copy(Re))},reset:function(){X=!1,me=null,He.set(-1,0,0,0)}}}function s(){let X=!1,Re=!1,me=null,He=null,Ue=null;return{setReversed:function(Te){if(Re!==Te){const qe=e.get("EXT_clip_control");Te?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Re=Te;const ot=Ue;Ue=null,this.setClear(ot)}},getReversed:function(){return Re},setTest:function(Te){Te?ye(r.DEPTH_TEST):Ge(r.DEPTH_TEST)},setMask:function(Te){me!==Te&&!X&&(r.depthMask(Te),me=Te)},setFunc:function(Te){if(Re&&(Te=KM[Te]),He!==Te){switch(Te){case ip:r.depthFunc(r.NEVER);break;case ap:r.depthFunc(r.ALWAYS);break;case sp:r.depthFunc(r.LESS);break;case jo:r.depthFunc(r.LEQUAL);break;case rp:r.depthFunc(r.EQUAL);break;case op:r.depthFunc(r.GEQUAL);break;case lp:r.depthFunc(r.GREATER);break;case cp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}He=Te}},setLocked:function(Te){X=Te},setClear:function(Te){Ue!==Te&&(Ue=Te,Re&&(Te=1-Te),r.clearDepth(Te))},reset:function(){X=!1,me=null,He=null,Ue=null,Re=!1}}}function l(){let X=!1,Re=null,me=null,He=null,Ue=null,Te=null,qe=null,ot=null,xn=null;return{setTest:function(jt){X||(jt?ye(r.STENCIL_TEST):Ge(r.STENCIL_TEST))},setMask:function(jt){Re!==jt&&!X&&(r.stencilMask(jt),Re=jt)},setFunc:function(jt,$n,ri){(me!==jt||He!==$n||Ue!==ri)&&(r.stencilFunc(jt,$n,ri),me=jt,He=$n,Ue=ri)},setOp:function(jt,$n,ri){(Te!==jt||qe!==$n||ot!==ri)&&(r.stencilOp(jt,$n,ri),Te=jt,qe=$n,ot=ri)},setLocked:function(jt){X=jt},setClear:function(jt){xn!==jt&&(r.clearStencil(jt),xn=jt)},reset:function(){X=!1,Re=null,me=null,He=null,Ue=null,Te=null,qe=null,ot=null,xn=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let x={},_={},g={},b=new WeakMap,M=[],R=null,E=!1,S=null,N=null,U=null,I=null,k=null,L=null,B=null,A=new fn(0,0,0),F=0,j=!1,H=null,q=null,se=null,ee=null,V=null;const D=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const ue=r.getParameter(r.VERSION);ue.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ue)[1]),z=K>=1):ue.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),z=K>=2);let ge=null,P={};const Z=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),Ae=new Un().fromArray(Z),Ne=new Un().fromArray(_e);function te(X,Re,me,He){const Ue=new Uint8Array(4),Te=r.createTexture();r.bindTexture(X,Te),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qe=0;qe<me;qe++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(Re,0,r.RGBA,1,1,He,0,r.RGBA,r.UNSIGNED_BYTE,Ue):r.texImage2D(Re+qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ue);return Te}const Se={};Se[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),Se[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Se[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ye(r.DEPTH_TEST),f.setFunc(jo),It(!1),Zt(M_),ye(r.CULL_FACE),Bt(ds);function ye(X){x[X]!==!0&&(r.enable(X),x[X]=!0)}function Ge(X){x[X]!==!1&&(r.disable(X),x[X]=!1)}function We(X,Re){return g[X]!==Re?(r.bindFramebuffer(X,Re),g[X]=Re,X===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Re),X===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Re),!0):!1}function Qe(X,Re){let me=M,He=!1;if(X){me=b.get(Re),me===void 0&&(me=[],b.set(Re,me));const Ue=X.textures;if(me.length!==Ue.length||me[0]!==r.COLOR_ATTACHMENT0){for(let Te=0,qe=Ue.length;Te<qe;Te++)me[Te]=r.COLOR_ATTACHMENT0+Te;me.length=Ue.length,He=!0}}else me[0]!==r.BACK&&(me[0]=r.BACK,He=!0);He&&r.drawBuffers(me)}function St(X){return R!==X?(r.useProgram(X),R=X,!0):!1}const Xe={[wr]:r.FUNC_ADD,[vM]:r.FUNC_SUBTRACT,[bM]:r.FUNC_REVERSE_SUBTRACT};Xe[yM]=r.MIN,Xe[SM]=r.MAX;const wt={[EM]:r.ZERO,[MM]:r.ONE,[TM]:r.SRC_COLOR,[tp]:r.SRC_ALPHA,[OM]:r.SRC_ALPHA_SATURATE,[CM]:r.DST_COLOR,[wM]:r.DST_ALPHA,[AM]:r.ONE_MINUS_SRC_COLOR,[np]:r.ONE_MINUS_SRC_ALPHA,[NM]:r.ONE_MINUS_DST_COLOR,[RM]:r.ONE_MINUS_DST_ALPHA,[DM]:r.CONSTANT_COLOR,[LM]:r.ONE_MINUS_CONSTANT_COLOR,[UM]:r.CONSTANT_ALPHA,[IM]:r.ONE_MINUS_CONSTANT_ALPHA};function Bt(X,Re,me,He,Ue,Te,qe,ot,xn,jt){if(X===ds){E===!0&&(Ge(r.BLEND),E=!1);return}if(E===!1&&(ye(r.BLEND),E=!0),X!==_M){if(X!==S||jt!==j){if((N!==wr||k!==wr)&&(r.blendEquation(r.FUNC_ADD),N=wr,k=wr),jt)switch(X){case Ho:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case T_:r.blendFunc(r.ONE,r.ONE);break;case A_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case w_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:qt("WebGLState: Invalid blending: ",X);break}else switch(X){case Ho:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case T_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case A_:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case w_:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",X);break}U=null,I=null,L=null,B=null,A.set(0,0,0),F=0,S=X,j=jt}return}Ue=Ue||Re,Te=Te||me,qe=qe||He,(Re!==N||Ue!==k)&&(r.blendEquationSeparate(Xe[Re],Xe[Ue]),N=Re,k=Ue),(me!==U||He!==I||Te!==L||qe!==B)&&(r.blendFuncSeparate(wt[me],wt[He],wt[Te],wt[qe]),U=me,I=He,L=Te,B=qe),(ot.equals(A)===!1||xn!==F)&&(r.blendColor(ot.r,ot.g,ot.b,xn),A.copy(ot),F=xn),S=X,j=!1}function ht(X,Re){X.side===us?Ge(r.CULL_FACE):ye(r.CULL_FACE);let me=X.side===Ci;Re&&(me=!me),It(me),X.blending===Ho&&X.transparent===!1?Bt(ds):Bt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),c.setMask(X.colorWrite);const He=X.stencilWrite;h.setTest(He),He&&(h.setMask(X.stencilWriteMask),h.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),h.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Y(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ye(r.SAMPLE_ALPHA_TO_COVERAGE):Ge(r.SAMPLE_ALPHA_TO_COVERAGE)}function It(X){H!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),H=X)}function Zt(X){X!==mM?(ye(r.CULL_FACE),X!==q&&(X===M_?r.cullFace(r.BACK):X===gM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ge(r.CULL_FACE),q=X}function Ze(X){X!==se&&(z&&r.lineWidth(X),se=X)}function Y(X,Re,me){X?(ye(r.POLYGON_OFFSET_FILL),(ee!==Re||V!==me)&&(ee=Re,V=me,f.getReversed()&&(Re=-Re),r.polygonOffset(Re,me))):Ge(r.POLYGON_OFFSET_FILL)}function Nt(X){X?ye(r.SCISSOR_TEST):Ge(r.SCISSOR_TEST)}function ft(X){X===void 0&&(X=r.TEXTURE0+D-1),ge!==X&&(r.activeTexture(X),ge=X)}function Vt(X,Re,me){me===void 0&&(ge===null?me=r.TEXTURE0+D-1:me=ge);let He=P[me];He===void 0&&(He={type:void 0,texture:void 0},P[me]=He),(He.type!==X||He.texture!==Re)&&(ge!==me&&(r.activeTexture(me),ge=me),r.bindTexture(X,Re||Se[X]),He.type=X,He.texture=Re)}function Ce(){const X=P[ge];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Qt(){try{r.compressedTexImage2D(...arguments)}catch(X){qt("WebGLState:",X)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(X){qt("WebGLState:",X)}}function T(){try{r.texSubImage2D(...arguments)}catch(X){qt("WebGLState:",X)}}function J(){try{r.texSubImage3D(...arguments)}catch(X){qt("WebGLState:",X)}}function he(){try{r.compressedTexSubImage2D(...arguments)}catch(X){qt("WebGLState:",X)}}function Me(){try{r.compressedTexSubImage3D(...arguments)}catch(X){qt("WebGLState:",X)}}function Oe(){try{r.texStorage2D(...arguments)}catch(X){qt("WebGLState:",X)}}function Pe(){try{r.texStorage3D(...arguments)}catch(X){qt("WebGLState:",X)}}function de(){try{r.texImage2D(...arguments)}catch(X){qt("WebGLState:",X)}}function pe(){try{r.texImage3D(...arguments)}catch(X){qt("WebGLState:",X)}}function Le(X){return _[X]!==void 0?_[X]:r.getParameter(X)}function Be(X,Re){_[X]!==Re&&(r.pixelStorei(X,Re),_[X]=Re)}function Ie(X){Ae.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),Ae.copy(X))}function De(X){Ne.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),Ne.copy(X))}function ut(X,Re){let me=p.get(Re);me===void 0&&(me=new WeakMap,p.set(Re,me));let He=me.get(X);He===void 0&&(He=r.getUniformBlockIndex(Re,X.name),me.set(X,He))}function rt(X,Re){const He=p.get(Re).get(X);m.get(Re)!==He&&(r.uniformBlockBinding(Re,He,X.__bindingPointIndex),m.set(Re,He))}function Mt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),x={},_={},ge=null,P={},g={},b=new WeakMap,M=[],R=null,E=!1,S=null,N=null,U=null,I=null,k=null,L=null,B=null,A=new fn(0,0,0),F=0,j=!1,H=null,q=null,se=null,ee=null,V=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Ne.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ye,disable:Ge,bindFramebuffer:We,drawBuffers:Qe,useProgram:St,setBlending:Bt,setMaterial:ht,setFlipSided:It,setCullFace:Zt,setLineWidth:Ze,setPolygonOffset:Y,setScissorTest:Nt,activeTexture:ft,bindTexture:Vt,unbindTexture:Ce,compressedTexImage2D:Qt,compressedTexImage3D:O,texImage2D:de,texImage3D:pe,pixelStorei:Be,getParameter:Le,updateUBOMapping:ut,uniformBlockBinding:rt,texStorage2D:Oe,texStorage3D:Pe,texSubImage2D:T,texSubImage3D:J,compressedTexSubImage2D:he,compressedTexSubImage3D:Me,scissor:Ie,viewport:De,reset:Mt}}function yC(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ct,x=new WeakMap,_=new Set;let g;const b=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(O,T){return M?new OffscreenCanvas(O,T):nc("canvas")}function E(O,T,J){let he=1;const Me=Qt(O);if((Me.width>J||Me.height>J)&&(he=J/Math.max(Me.width,Me.height)),he<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Oe=Math.floor(he*Me.width),Pe=Math.floor(he*Me.height);g===void 0&&(g=R(Oe,Pe));const de=T?R(Oe,Pe):g;return de.width=Oe,de.height=Pe,de.getContext("2d").drawImage(O,0,0,Oe,Pe),dt("WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+Oe+"x"+Pe+")."),de}else return"data"in O&&dt("WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),O;return O}function S(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function U(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function I(O,T,J,he,Me,Oe=!1){if(O!==null){if(r[O]!==void 0)return r[O];dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Pe;he&&(Pe=e.get("EXT_texture_norm16"),Pe||dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let de=T;if(T===r.RED&&(J===r.FLOAT&&(de=r.R32F),J===r.HALF_FLOAT&&(de=r.R16F),J===r.UNSIGNED_BYTE&&(de=r.R8),J===r.UNSIGNED_SHORT&&Pe&&(de=Pe.R16_EXT),J===r.SHORT&&Pe&&(de=Pe.R16_SNORM_EXT)),T===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.R8UI),J===r.UNSIGNED_SHORT&&(de=r.R16UI),J===r.UNSIGNED_INT&&(de=r.R32UI),J===r.BYTE&&(de=r.R8I),J===r.SHORT&&(de=r.R16I),J===r.INT&&(de=r.R32I)),T===r.RG&&(J===r.FLOAT&&(de=r.RG32F),J===r.HALF_FLOAT&&(de=r.RG16F),J===r.UNSIGNED_BYTE&&(de=r.RG8),J===r.UNSIGNED_SHORT&&Pe&&(de=Pe.RG16_EXT),J===r.SHORT&&Pe&&(de=Pe.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RG8UI),J===r.UNSIGNED_SHORT&&(de=r.RG16UI),J===r.UNSIGNED_INT&&(de=r.RG32UI),J===r.BYTE&&(de=r.RG8I),J===r.SHORT&&(de=r.RG16I),J===r.INT&&(de=r.RG32I)),T===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RGB8UI),J===r.UNSIGNED_SHORT&&(de=r.RGB16UI),J===r.UNSIGNED_INT&&(de=r.RGB32UI),J===r.BYTE&&(de=r.RGB8I),J===r.SHORT&&(de=r.RGB16I),J===r.INT&&(de=r.RGB32I)),T===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(de=r.RGBA16UI),J===r.UNSIGNED_INT&&(de=r.RGBA32UI),J===r.BYTE&&(de=r.RGBA8I),J===r.SHORT&&(de=r.RGBA16I),J===r.INT&&(de=r.RGBA32I)),T===r.RGB&&(J===r.UNSIGNED_SHORT&&Pe&&(de=Pe.RGB16_EXT),J===r.SHORT&&Pe&&(de=Pe.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(de=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(de=r.R11F_G11F_B10F)),T===r.RGBA){const pe=Oe?tf:kt.getTransfer(Me);J===r.FLOAT&&(de=r.RGBA32F),J===r.HALF_FLOAT&&(de=r.RGBA16F),J===r.UNSIGNED_BYTE&&(de=pe===rn?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Pe&&(de=Pe.RGBA16_EXT),J===r.SHORT&&Pe&&(de=Pe.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(de=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(de=r.RGB5_A1)}return(de===r.R16F||de===r.R32F||de===r.RG16F||de===r.RG32F||de===r.RGBA16F||de===r.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function k(O,T){let J;return O?T===null||T===Oa||T===tc?J=r.DEPTH24_STENCIL8:T===Aa?J=r.DEPTH32F_STENCIL8:T===ec&&(J=r.DEPTH24_STENCIL8,dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Oa||T===tc?J=r.DEPTH_COMPONENT24:T===Aa?J=r.DEPTH_COMPONENT32F:T===ec&&(J=r.DEPTH_COMPONENT16),J}function L(O,T){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==si&&O.minFilter!==di?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function B(O){const T=O.target;T.removeEventListener("dispose",B),F(T),T.isVideoTexture&&x.delete(T),T.isHTMLTexture&&_.delete(T)}function A(O){const T=O.target;T.removeEventListener("dispose",A),H(T)}function F(O){const T=s.get(O);if(T.__webglInit===void 0)return;const J=O.source,he=b.get(J);if(he){const Me=he[T.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&j(O),Object.keys(he).length===0&&b.delete(J)}s.remove(O)}function j(O){const T=s.get(O);r.deleteTexture(T.__webglTexture);const J=O.source,he=b.get(J);delete he[T.__cacheKey],f.memory.textures--}function H(O){const T=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(T.__webglFramebuffer[he]))for(let Me=0;Me<T.__webglFramebuffer[he].length;Me++)r.deleteFramebuffer(T.__webglFramebuffer[he][Me]);else r.deleteFramebuffer(T.__webglFramebuffer[he]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[he])}else{if(Array.isArray(T.__webglFramebuffer))for(let he=0;he<T.__webglFramebuffer.length;he++)r.deleteFramebuffer(T.__webglFramebuffer[he]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let he=0;he<T.__webglColorRenderbuffer.length;he++)T.__webglColorRenderbuffer[he]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[he]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=O.textures;for(let he=0,Me=J.length;he<Me;he++){const Oe=s.get(J[he]);Oe.__webglTexture&&(r.deleteTexture(Oe.__webglTexture),f.memory.textures--),s.remove(J[he])}s.remove(O)}let q=0;function se(){q=0}function ee(){return q}function V(O){q=O}function D(){const O=q;return O>=l.maxTextures&&dt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),q+=1,O}function z(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function K(O,T){const J=s.get(O);if(O.isVideoTexture&&Vt(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const he=O.image;if(he===null)dt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)dt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(J,O,T);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+T)}function ue(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){Ge(J,O,T);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+T)}function ge(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){Ge(J,O,T);return}i.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+T)}function P(O,T){const J=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&J.__version!==O.version){We(J,O,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+T)}const Z={[up]:r.REPEAT,[fs]:r.CLAMP_TO_EDGE,[fp]:r.MIRRORED_REPEAT},_e={[si]:r.NEAREST,[BM]:r.NEAREST_MIPMAP_NEAREST,[mu]:r.NEAREST_MIPMAP_LINEAR,[di]:r.LINEAR,[vh]:r.LINEAR_MIPMAP_NEAREST,[Cr]:r.LINEAR_MIPMAP_LINEAR},Ae={[HM]:r.NEVER,[YM]:r.ALWAYS,[kM]:r.LESS,[im]:r.LEQUAL,[VM]:r.EQUAL,[am]:r.GEQUAL,[jM]:r.GREATER,[XM]:r.NOTEQUAL};function Ne(O,T){if(T.type===Aa&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===di||T.magFilter===vh||T.magFilter===mu||T.magFilter===Cr||T.minFilter===di||T.minFilter===vh||T.minFilter===mu||T.minFilter===Cr)&&dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,Z[T.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,Z[T.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,Z[T.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,_e[T.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,_e[T.minFilter]),T.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,Ae[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===si||T.minFilter!==mu&&T.minFilter!==Cr||T.type===Aa&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function te(O,T){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",B));const he=T.source;let Me=b.get(he);Me===void 0&&(Me={},b.set(he,Me));const Oe=z(T);if(Oe!==O.__cacheKey){Me[Oe]===void 0&&(Me[Oe]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),Me[Oe].usedTimes++;const Pe=Me[O.__cacheKey];Pe!==void 0&&(Me[O.__cacheKey].usedTimes--,Pe.usedTimes===0&&j(T)),O.__cacheKey=Oe,O.__webglTexture=Me[Oe].texture}return J}function Se(O,T,J){return Math.floor(Math.floor(O/J)/T)}function ye(O,T,J,he){const Oe=O.updateRanges;if(Oe.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,J,he,T.data);else{Oe.sort((Be,Ie)=>Be.start-Ie.start);let Pe=0;for(let Be=1;Be<Oe.length;Be++){const Ie=Oe[Pe],De=Oe[Be],ut=Ie.start+Ie.count,rt=Se(De.start,T.width,4),Mt=Se(Ie.start,T.width,4);De.start<=ut+1&&rt===Mt&&Se(De.start+De.count-1,T.width,4)===rt?Ie.count=Math.max(Ie.count,De.start+De.count-Ie.start):(++Pe,Oe[Pe]=De)}Oe.length=Pe+1;const de=i.getParameter(r.UNPACK_ROW_LENGTH),pe=i.getParameter(r.UNPACK_SKIP_PIXELS),Le=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Be=0,Ie=Oe.length;Be<Ie;Be++){const De=Oe[Be],ut=Math.floor(De.start/4),rt=Math.ceil(De.count/4),Mt=ut%T.width,X=Math.floor(ut/T.width),Re=rt,me=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,X),i.texSubImage2D(r.TEXTURE_2D,0,Mt,X,Re,me,J,he,T.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,de),i.pixelStorei(r.UNPACK_SKIP_PIXELS,pe),i.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function Ge(O,T,J){let he=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(he=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(he=r.TEXTURE_3D);const Me=te(O,T),Oe=T.source;i.bindTexture(he,O.__webglTexture,r.TEXTURE0+J);const Pe=s.get(Oe);if(Oe.version!==Pe.__version||Me===!0){if(i.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const me=kt.getPrimaries(kt.workingColorSpace),He=T.colorSpace===$s?null:kt.getPrimaries(T.colorSpace),Ue=T.colorSpace===$s||me===He?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let pe=E(T.image,!1,l.maxTextureSize);pe=Ce(T,pe);const Le=c.convert(T.format,T.colorSpace),Be=c.convert(T.type);let Ie=I(T.internalFormat,Le,Be,T.normalized,T.colorSpace,T.isVideoTexture);Ne(he,T);let De;const ut=T.mipmaps,rt=T.isVideoTexture!==!0,Mt=Pe.__version===void 0||Me===!0,X=Oe.dataReady,Re=L(T,pe);if(T.isDepthTexture)Ie=k(T.format===Nr,T.type),Mt&&(rt?i.texStorage2D(r.TEXTURE_2D,1,Ie,pe.width,pe.height):i.texImage2D(r.TEXTURE_2D,0,Ie,pe.width,pe.height,0,Le,Be,null));else if(T.isDataTexture)if(ut.length>0){rt&&Mt&&i.texStorage2D(r.TEXTURE_2D,Re,Ie,ut[0].width,ut[0].height);for(let me=0,He=ut.length;me<He;me++)De=ut[me],rt?X&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,De.width,De.height,Le,Be,De.data):i.texImage2D(r.TEXTURE_2D,me,Ie,De.width,De.height,0,Le,Be,De.data);T.generateMipmaps=!1}else rt?(Mt&&i.texStorage2D(r.TEXTURE_2D,Re,Ie,pe.width,pe.height),X&&ye(T,pe,Le,Be)):i.texImage2D(r.TEXTURE_2D,0,Ie,pe.width,pe.height,0,Le,Be,pe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){rt&&Mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Ie,ut[0].width,ut[0].height,pe.depth);for(let me=0,He=ut.length;me<He;me++)if(De=ut[me],T.format!==pa)if(Le!==null)if(rt){if(X)if(T.layerUpdates.size>0){const Ue=ev(De.width,De.height,T.format,T.type);for(const Te of T.layerUpdates){const qe=De.data.subarray(Te*Ue/De.data.BYTES_PER_ELEMENT,(Te+1)*Ue/De.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,Te,De.width,De.height,1,Le,qe)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,De.width,De.height,pe.depth,Le,De.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,me,Ie,De.width,De.height,pe.depth,0,De.data,0,0);else dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?X&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,De.width,De.height,pe.depth,Le,Be,De.data):i.texImage3D(r.TEXTURE_2D_ARRAY,me,Ie,De.width,De.height,pe.depth,0,Le,Be,De.data)}else{rt&&Mt&&i.texStorage2D(r.TEXTURE_2D,Re,Ie,ut[0].width,ut[0].height);for(let me=0,He=ut.length;me<He;me++)De=ut[me],T.format!==pa?Le!==null?rt?X&&i.compressedTexSubImage2D(r.TEXTURE_2D,me,0,0,De.width,De.height,Le,De.data):i.compressedTexImage2D(r.TEXTURE_2D,me,Ie,De.width,De.height,0,De.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?X&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,De.width,De.height,Le,Be,De.data):i.texImage2D(r.TEXTURE_2D,me,Ie,De.width,De.height,0,Le,Be,De.data)}else if(T.isDataArrayTexture)if(rt){if(Mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Ie,pe.width,pe.height,pe.depth),X)if(T.layerUpdates.size>0){const me=ev(pe.width,pe.height,T.format,T.type);for(const He of T.layerUpdates){const Ue=pe.data.subarray(He*me/pe.data.BYTES_PER_ELEMENT,(He+1)*me/pe.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,He,pe.width,pe.height,1,Le,Be,Ue)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Le,Be,pe.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,pe.width,pe.height,pe.depth,0,Le,Be,pe.data);else if(T.isData3DTexture)rt?(Mt&&i.texStorage3D(r.TEXTURE_3D,Re,Ie,pe.width,pe.height,pe.depth),X&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Le,Be,pe.data)):i.texImage3D(r.TEXTURE_3D,0,Ie,pe.width,pe.height,pe.depth,0,Le,Be,pe.data);else if(T.isFramebufferTexture){if(Mt)if(rt)i.texStorage2D(r.TEXTURE_2D,Re,Ie,pe.width,pe.height);else{let me=pe.width,He=pe.height;for(let Ue=0;Ue<Re;Ue++)i.texImage2D(r.TEXTURE_2D,Ue,Ie,me,He,0,Le,Be,null),me>>=1,He>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const me=r.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),pe.parentNode!==me){me.appendChild(pe),_.add(T),me.onpaint=ot=>{const xn=ot.changedElements;for(const jt of _)xn.includes(jt.image)&&(jt.needsUpdate=!0)},me.requestPaint();return}const He=0,Ue=r.RGBA,Te=r.RGBA,qe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,He,Ue,Te,qe,pe),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ut.length>0){if(rt&&Mt){const me=Qt(ut[0]);i.texStorage2D(r.TEXTURE_2D,Re,Ie,me.width,me.height)}for(let me=0,He=ut.length;me<He;me++)De=ut[me],rt?X&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,Le,Be,De):i.texImage2D(r.TEXTURE_2D,me,Ie,Le,Be,De);T.generateMipmaps=!1}else if(rt){if(Mt){const me=Qt(pe);i.texStorage2D(r.TEXTURE_2D,Re,Ie,me.width,me.height)}X&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Le,Be,pe)}else i.texImage2D(r.TEXTURE_2D,0,Ie,Le,Be,pe);S(T)&&N(he),Pe.__version=Oe.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function We(O,T,J){if(T.image.length!==6)return;const he=te(O,T),Me=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+J);const Oe=s.get(Me);if(Me.version!==Oe.__version||he===!0){i.activeTexture(r.TEXTURE0+J);const Pe=kt.getPrimaries(kt.workingColorSpace),de=T.colorSpace===$s?null:kt.getPrimaries(T.colorSpace),pe=T.colorSpace===$s||Pe===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Le=T.isCompressedTexture||T.image[0].isCompressedTexture,Be=T.image[0]&&T.image[0].isDataTexture,Ie=[];for(let Te=0;Te<6;Te++)!Le&&!Be?Ie[Te]=E(T.image[Te],!0,l.maxCubemapSize):Ie[Te]=Be?T.image[Te].image:T.image[Te],Ie[Te]=Ce(T,Ie[Te]);const De=Ie[0],ut=c.convert(T.format,T.colorSpace),rt=c.convert(T.type),Mt=I(T.internalFormat,ut,rt,T.normalized,T.colorSpace),X=T.isVideoTexture!==!0,Re=Oe.__version===void 0||he===!0,me=Me.dataReady;let He=L(T,De);Ne(r.TEXTURE_CUBE_MAP,T);let Ue;if(Le){X&&Re&&i.texStorage2D(r.TEXTURE_CUBE_MAP,He,Mt,De.width,De.height);for(let Te=0;Te<6;Te++){Ue=Ie[Te].mipmaps;for(let qe=0;qe<Ue.length;qe++){const ot=Ue[qe];T.format!==pa?ut!==null?X?me&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,0,0,ot.width,ot.height,ut,ot.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,Mt,ot.width,ot.height,0,ot.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,0,0,ot.width,ot.height,ut,rt,ot.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe,Mt,ot.width,ot.height,0,ut,rt,ot.data)}}}else{if(Ue=T.mipmaps,X&&Re){Ue.length>0&&He++;const Te=Qt(Ie[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,He,Mt,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(Be){X?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Ie[Te].width,Ie[Te].height,ut,rt,Ie[Te].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Mt,Ie[Te].width,Ie[Te].height,0,ut,rt,Ie[Te].data);for(let qe=0;qe<Ue.length;qe++){const xn=Ue[qe].image[Te].image;X?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,0,0,xn.width,xn.height,ut,rt,xn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,Mt,xn.width,xn.height,0,ut,rt,xn.data)}}else{X?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,ut,rt,Ie[Te]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Mt,ut,rt,Ie[Te]);for(let qe=0;qe<Ue.length;qe++){const ot=Ue[qe];X?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,0,0,ut,rt,ot.image[Te]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,qe+1,Mt,ut,rt,ot.image[Te])}}}S(T)&&N(r.TEXTURE_CUBE_MAP),Oe.__version=Me.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Qe(O,T,J,he,Me,Oe){const Pe=c.convert(J.format,J.colorSpace),de=c.convert(J.type),pe=I(J.internalFormat,Pe,de,J.normalized,J.colorSpace),Le=s.get(T),Be=s.get(J);if(Be.__renderTarget=T,!Le.__hasExternalTextures){const Ie=Math.max(1,T.width>>Oe),De=Math.max(1,T.height>>Oe);Me===r.TEXTURE_3D||Me===r.TEXTURE_2D_ARRAY?i.texImage3D(Me,Oe,pe,Ie,De,T.depth,0,Pe,de,null):i.texImage2D(Me,Oe,pe,Ie,De,0,Pe,de,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),ft(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,Me,Be.__webglTexture,0,Nt(T)):(Me===r.TEXTURE_2D||Me>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,he,Me,Be.__webglTexture,Oe),i.bindFramebuffer(r.FRAMEBUFFER,null)}function St(O,T,J){if(r.bindRenderbuffer(r.RENDERBUFFER,O),T.depthBuffer){const he=T.depthTexture,Me=he&&he.isDepthTexture?he.type:null,Oe=k(T.stencilBuffer,Me),Pe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ft(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Nt(T),Oe,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt(T),Oe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Oe,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Pe,r.RENDERBUFFER,O)}else{const he=T.textures;for(let Me=0;Me<he.length;Me++){const Oe=he[Me],Pe=c.convert(Oe.format,Oe.colorSpace),de=c.convert(Oe.type),pe=I(Oe.internalFormat,Pe,de,Oe.normalized,Oe.colorSpace);ft(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Nt(T),pe,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt(T),pe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,pe,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Xe(O,T,J){const he=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Me=s.get(T.depthTexture);if(Me.__renderTarget=T,(!Me.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),he){if(Me.__webglInit===void 0&&(Me.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),Me.__webglTexture===void 0){Me.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Me.__webglTexture),Ne(r.TEXTURE_CUBE_MAP,T.depthTexture);const Le=c.convert(T.depthTexture.format),Be=c.convert(T.depthTexture.type);let Ie;T.depthTexture.format===ms?Ie=r.DEPTH_COMPONENT24:T.depthTexture.format===Nr&&(Ie=r.DEPTH24_STENCIL8);for(let De=0;De<6;De++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Ie,T.width,T.height,0,Le,Be,null)}}else K(T.depthTexture,0);const Oe=Me.__webglTexture,Pe=Nt(T),de=he?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,pe=T.depthTexture.format===Nr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===ms)ft(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,de,Oe,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,pe,de,Oe,0);else if(T.depthTexture.format===Nr)ft(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,de,Oe,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,pe,de,Oe,0);else throw new Error("Unknown depthTexture format")}function wt(O){const T=s.get(O),J=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const he=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),he){const Me=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,he.removeEventListener("dispose",Me)};he.addEventListener("dispose",Me),T.__depthDisposeCallback=Me}T.__boundDepthTexture=he}if(O.depthTexture&&!T.__autoAllocateDepthBuffer)if(J)for(let he=0;he<6;he++)Xe(T.__webglFramebuffer[he],O,he);else{const he=O.texture.mipmaps;he&&he.length>0?Xe(T.__webglFramebuffer[0],O,0):Xe(T.__webglFramebuffer,O,0)}else if(J){T.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[he]),T.__webglDepthbuffer[he]===void 0)T.__webglDepthbuffer[he]=r.createRenderbuffer(),St(T.__webglDepthbuffer[he],O,!1);else{const Me=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Oe=T.__webglDepthbuffer[he];r.bindRenderbuffer(r.RENDERBUFFER,Oe),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,Oe)}}else{const he=O.texture.mipmaps;if(he&&he.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),St(T.__webglDepthbuffer,O,!1);else{const Me=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Oe=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Oe),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,Oe)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(O,T,J){const he=s.get(O);T!==void 0&&Qe(he.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&wt(O)}function ht(O){const T=O.texture,J=s.get(O),he=s.get(T);O.addEventListener("dispose",A);const Me=O.textures,Oe=O.isWebGLCubeRenderTarget===!0,Pe=Me.length>1;if(Pe||(he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture()),he.__version=T.version,f.memory.textures++),Oe){J.__webglFramebuffer=[];for(let de=0;de<6;de++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[de]=[];for(let pe=0;pe<T.mipmaps.length;pe++)J.__webglFramebuffer[de][pe]=r.createFramebuffer()}else J.__webglFramebuffer[de]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let de=0;de<T.mipmaps.length;de++)J.__webglFramebuffer[de]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Pe)for(let de=0,pe=Me.length;de<pe;de++){const Le=s.get(Me[de]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&ft(O)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let de=0;de<Me.length;de++){const pe=Me[de];J.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[de]);const Le=c.convert(pe.format,pe.colorSpace),Be=c.convert(pe.type),Ie=I(pe.internalFormat,Le,Be,pe.normalized,pe.colorSpace,O.isXRRenderTarget===!0),De=Nt(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,De,Ie,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,J.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),St(J.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Oe){i.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),Ne(r.TEXTURE_CUBE_MAP,T);for(let de=0;de<6;de++)if(T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)Qe(J.__webglFramebuffer[de][pe],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,pe);else Qe(J.__webglFramebuffer[de],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);S(T)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Pe){for(let de=0,pe=Me.length;de<pe;de++){const Le=Me[de],Be=s.get(Le);let Ie=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ie=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ie,Be.__webglTexture),Ne(Ie,Le),Qe(J.__webglFramebuffer,O,Le,r.COLOR_ATTACHMENT0+de,Ie,0),S(Le)&&N(Ie)}i.unbindTexture()}else{let de=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(de=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(de,he.__webglTexture),Ne(de,T),T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)Qe(J.__webglFramebuffer[pe],O,T,r.COLOR_ATTACHMENT0,de,pe);else Qe(J.__webglFramebuffer,O,T,r.COLOR_ATTACHMENT0,de,0);S(T)&&N(de),i.unbindTexture()}O.depthBuffer&&wt(O)}function It(O){const T=O.textures;for(let J=0,he=T.length;J<he;J++){const Me=T[J];if(S(Me)){const Oe=U(O),Pe=s.get(Me).__webglTexture;i.bindTexture(Oe,Pe),N(Oe),i.unbindTexture()}}}const Zt=[],Ze=[];function Y(O){if(O.samples>0){if(ft(O)===!1){const T=O.textures,J=O.width,he=O.height;let Me=r.COLOR_BUFFER_BIT;const Oe=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=s.get(O),de=T.length>1;if(de)for(let Le=0;Le<T.length;Le++)i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const pe=O.texture.mipmaps;pe&&pe.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Le=0;Le<T.length;Le++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Me|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Me|=r.STENCIL_BUFFER_BIT)),de){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const Be=s.get(T[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Be,0)}r.blitFramebuffer(0,0,J,he,0,0,J,he,Me,r.NEAREST),m===!0&&(Zt.length=0,Ze.length=0,Zt.push(r.COLOR_ATTACHMENT0+Le),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Zt.push(Oe),Ze.push(Oe),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ze)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Zt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let Le=0;Le<T.length;Le++){i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[Le]);const Be=s.get(T[Le]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,Be,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const T=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Nt(O){return Math.min(l.maxSamples,O.samples)}function ft(O){const T=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Vt(O){const T=f.render.frame;x.get(O)!==T&&(x.set(O,T),O.update())}function Ce(O,T){const J=O.colorSpace,he=O.format,Me=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==ef&&J!==$s&&(kt.getTransfer(J)===rn?(he!==pa||Me!==aa)&&dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",J)),T}function Qt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=D,this.resetTextureUnits=se,this.getTextureUnits=ee,this.setTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=ue,this.setTexture3D=ge,this.setTextureCube=P,this.rebindTextures=Bt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function SC(r,e){function i(s,l=$s){let c;const f=kt.getTransfer(l);if(s===aa)return r.UNSIGNED_BYTE;if(s===Qp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Jp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Qv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Jv)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Kv)return r.BYTE;if(s===Zv)return r.SHORT;if(s===ec)return r.UNSIGNED_SHORT;if(s===Zp)return r.INT;if(s===Oa)return r.UNSIGNED_INT;if(s===Aa)return r.FLOAT;if(s===ps)return r.HALF_FLOAT;if(s===eb)return r.ALPHA;if(s===tb)return r.RGB;if(s===pa)return r.RGBA;if(s===ms)return r.DEPTH_COMPONENT;if(s===Nr)return r.DEPTH_STENCIL;if(s===nb)return r.RED;if(s===em)return r.RED_INTEGER;if(s===Ur)return r.RG;if(s===tm)return r.RG_INTEGER;if(s===nm)return r.RGBA_INTEGER;if(s===Vu||s===ju||s===Xu||s===Yu)if(f===rn)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Vu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ju)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Yu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Vu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ju)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Yu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===dp||s===hp||s===pp||s===mp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===dp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===hp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===pp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===mp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===gp||s===xp||s===_p||s===vp||s===bp||s===Qu||s===yp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===gp||s===xp)return f===rn?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===_p)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===vp)return c.COMPRESSED_R11_EAC;if(s===bp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Qu)return c.COMPRESSED_RG11_EAC;if(s===yp)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Sp||s===Ep||s===Mp||s===Tp||s===Ap||s===wp||s===Rp||s===Cp||s===Np||s===Op||s===Dp||s===Lp||s===Up||s===Ip)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Sp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ep)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Mp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Tp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ap)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===wp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Rp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Cp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Np)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Op)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Dp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Lp)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Up)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ip)return f===rn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Pp||s===Fp||s===Bp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Pp)return f===rn?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Fp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Bp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===zp||s===Gp||s===Ju||s===Hp)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===zp)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Gp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ju)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Hp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===tc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const EC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MC=`
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

}`;class TC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new db(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new La({vertexShader:EC,fragmentShader:MC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Da(new of(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class AC extends er{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,x=null,_=null,g=null,b=null,M=null;const R=typeof XRWebGLBinding<"u",E=new TC,S={},N=i.getContextAttributes();let U=null,I=null;const k=[],L=[],B=new Ct;let A=null;const F=new ia;F.viewport=new Un;const j=new ia;j.viewport=new Un;const H=[F,j],q=new IT;let se=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Se=k[te];return Se===void 0&&(Se=new Ah,k[te]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(te){let Se=k[te];return Se===void 0&&(Se=new Ah,k[te]=Se),Se.getGripSpace()},this.getHand=function(te){let Se=k[te];return Se===void 0&&(Se=new Ah,k[te]=Se),Se.getHandSpace()};function V(te){const Se=L.indexOf(te.inputSource);if(Se===-1)return;const ye=k[Se];ye!==void 0&&(ye.update(te.inputSource,te.frame,p||f),ye.dispatchEvent({type:te.type,data:te.inputSource}))}function D(){l.removeEventListener("select",V),l.removeEventListener("selectstart",V),l.removeEventListener("selectend",V),l.removeEventListener("squeeze",V),l.removeEventListener("squeezestart",V),l.removeEventListener("squeezeend",V),l.removeEventListener("end",D),l.removeEventListener("inputsourceschange",z);for(let te=0;te<k.length;te++){const Se=L[te];Se!==null&&(L[te]=null,k[te].disconnect(Se))}se=null,ee=null,E.reset();for(const te in S)delete S[te];e.setRenderTarget(U),b=null,g=null,_=null,l=null,I=null,Ne.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){c=te,s.isPresenting===!0&&dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){h=te,s.isPresenting===!0&&dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(te){p=te},this.getBaseLayer=function(){return g!==null?g:b},this.getBinding=function(){return _===null&&R&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(te){if(l=te,l!==null){if(U=e.getRenderTarget(),l.addEventListener("select",V),l.addEventListener("selectstart",V),l.addEventListener("selectend",V),l.addEventListener("squeeze",V),l.addEventListener("squeezestart",V),l.addEventListener("squeezeend",V),l.addEventListener("end",D),l.addEventListener("inputsourceschange",z),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(B),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ge=null,We=null;N.depth&&(We=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ye=N.stencil?Nr:ms,Ge=N.stencil?tc:Oa);const Qe={colorFormat:i.RGBA8,depthFormat:We,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(Qe),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),I=new Ca(g.textureWidth,g.textureHeight,{format:pa,type:aa,depthTexture:new Yo(g.textureWidth,g.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const ye={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,ye),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),I=new Ca(b.framebufferWidth,b.framebufferHeight,{format:pa,type:aa,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Ne.setContext(l),Ne.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return E.getDepthTexture()};function z(te){for(let Se=0;Se<te.removed.length;Se++){const ye=te.removed[Se],Ge=L.indexOf(ye);Ge>=0&&(L[Ge]=null,k[Ge].disconnect(ye))}for(let Se=0;Se<te.added.length;Se++){const ye=te.added[Se];let Ge=L.indexOf(ye);if(Ge===-1){for(let Qe=0;Qe<k.length;Qe++)if(Qe>=L.length){L.push(ye),Ge=Qe;break}else if(L[Qe]===null){L[Qe]=ye,Ge=Qe;break}if(Ge===-1)break}const We=k[Ge];We&&We.connect(ye)}}const K=new ae,ue=new ae;function ge(te,Se,ye){K.setFromMatrixPosition(Se.matrixWorld),ue.setFromMatrixPosition(ye.matrixWorld);const Ge=K.distanceTo(ue),We=Se.projectionMatrix.elements,Qe=ye.projectionMatrix.elements,St=We[14]/(We[10]-1),Xe=We[14]/(We[10]+1),wt=(We[9]+1)/We[5],Bt=(We[9]-1)/We[5],ht=(We[8]-1)/We[0],It=(Qe[8]+1)/Qe[0],Zt=St*ht,Ze=St*It,Y=Ge/(-ht+It),Nt=Y*-ht;if(Se.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Nt),te.translateZ(Y),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),We[10]===-1)te.projectionMatrix.copy(Se.projectionMatrix),te.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const ft=St+Y,Vt=Xe+Y,Ce=Zt-Nt,Qt=Ze+(Ge-Nt),O=wt*Xe/Vt*ft,T=Bt*Xe/Vt*ft;te.projectionMatrix.makePerspective(Ce,Qt,O,T,ft,Vt),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function P(te,Se){Se===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Se.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(l===null)return;let Se=te.near,ye=te.far;E.texture!==null&&(E.depthNear>0&&(Se=E.depthNear),E.depthFar>0&&(ye=E.depthFar)),q.near=j.near=F.near=Se,q.far=j.far=F.far=ye,(se!==q.near||ee!==q.far)&&(l.updateRenderState({depthNear:q.near,depthFar:q.far}),se=q.near,ee=q.far),q.layers.mask=te.layers.mask|6,F.layers.mask=q.layers.mask&-5,j.layers.mask=q.layers.mask&-3;const Ge=te.parent,We=q.cameras;P(q,Ge);for(let Qe=0;Qe<We.length;Qe++)P(We[Qe],Ge);We.length===2?ge(q,F,j):q.projectionMatrix.copy(F.projectionMatrix),Z(te,q,Ge)};function Z(te,Se,ye){ye===null?te.matrix.copy(Se.matrixWorld):(te.matrix.copy(ye.matrixWorld),te.matrix.invert(),te.matrix.multiply(Se.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Se.projectionMatrix),te.projectionMatrixInverse.copy(Se.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Vp*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(g===null&&b===null))return m},this.setFoveation=function(te){m=te,g!==null&&(g.fixedFoveation=te),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=te)},this.hasDepthSensing=function(){return E.texture!==null},this.getDepthSensingMesh=function(){return E.getMesh(q)},this.getCameraTexture=function(te){return S[te]};let _e=null;function Ae(te,Se){if(x=Se.getViewerPose(p||f),M=Se,x!==null){const ye=x.views;b!==null&&(e.setRenderTargetFramebuffer(I,b.framebuffer),e.setRenderTarget(I));let Ge=!1;ye.length!==q.cameras.length&&(q.cameras.length=0,Ge=!0);for(let Xe=0;Xe<ye.length;Xe++){const wt=ye[Xe];let Bt=null;if(b!==null)Bt=b.getViewport(wt);else{const It=_.getViewSubImage(g,wt);Bt=It.viewport,Xe===0&&(e.setRenderTargetTextures(I,It.colorTexture,It.depthStencilTexture),e.setRenderTarget(I))}let ht=H[Xe];ht===void 0&&(ht=new ia,ht.layers.enable(Xe),ht.viewport=new Un,H[Xe]=ht),ht.matrix.fromArray(wt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(wt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),Xe===0&&(q.matrix.copy(ht.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ge===!0&&q.cameras.push(ht)}const We=l.enabledFeatures;if(We&&We.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){_=s.getBinding();const Xe=_.getDepthInformation(ye[0]);Xe&&Xe.isValid&&Xe.texture&&E.init(Xe,l.renderState)}if(We&&We.includes("camera-access")&&R){e.state.unbindTexture(),_=s.getBinding();for(let Xe=0;Xe<ye.length;Xe++){const wt=ye[Xe].camera;if(wt){let Bt=S[wt];Bt||(Bt=new db,S[wt]=Bt);const ht=_.getCameraImage(wt);Bt.sourceTexture=ht}}}}for(let ye=0;ye<k.length;ye++){const Ge=L[ye],We=k[ye];Ge!==null&&We!==void 0&&We.update(Ge,Se,p||f)}_e&&_e(te,Se),Se.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Se}),M=null}const Ne=new gb;Ne.setAnimationLoop(Ae),this.setAnimationLoop=function(te){_e=te},this.dispose=function(){}}}const wC=new Yn,Eb=new bt;Eb.set(-1,0,0,0,1,0,0,0,1);function RC(r,e){function i(E,S){E.matrixAutoUpdate===!0&&E.updateMatrix(),S.value.copy(E.matrix)}function s(E,S){S.color.getRGB(E.fogColor.value,hb(r)),S.isFog?(E.fogNear.value=S.near,E.fogFar.value=S.far):S.isFogExp2&&(E.fogDensity.value=S.density)}function l(E,S,N,U,I){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(E,S):S.isMeshLambertMaterial?(c(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(E,S),_(E,S)):S.isMeshPhongMaterial?(c(E,S),x(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(E,S),g(E,S),S.isMeshPhysicalMaterial&&b(E,S,I)):S.isMeshMatcapMaterial?(c(E,S),M(E,S)):S.isMeshDepthMaterial?c(E,S):S.isMeshDistanceMaterial?(c(E,S),R(E,S)):S.isMeshNormalMaterial?c(E,S):S.isLineBasicMaterial?(f(E,S),S.isLineDashedMaterial&&h(E,S)):S.isPointsMaterial?m(E,S,N,U):S.isSpriteMaterial?p(E,S):S.isShadowMaterial?(E.color.value.copy(S.color),E.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(E,S){E.opacity.value=S.opacity,S.color&&E.diffuse.value.copy(S.color),S.emissive&&E.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.bumpMap&&(E.bumpMap.value=S.bumpMap,i(S.bumpMap,E.bumpMapTransform),E.bumpScale.value=S.bumpScale,S.side===Ci&&(E.bumpScale.value*=-1)),S.normalMap&&(E.normalMap.value=S.normalMap,i(S.normalMap,E.normalMapTransform),E.normalScale.value.copy(S.normalScale),S.side===Ci&&E.normalScale.value.negate()),S.displacementMap&&(E.displacementMap.value=S.displacementMap,i(S.displacementMap,E.displacementMapTransform),E.displacementScale.value=S.displacementScale,E.displacementBias.value=S.displacementBias),S.emissiveMap&&(E.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,E.emissiveMapTransform)),S.specularMap&&(E.specularMap.value=S.specularMap,i(S.specularMap,E.specularMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest);const N=e.get(S),U=N.envMap,I=N.envMapRotation;U&&(E.envMap.value=U,E.envMapRotation.value.setFromMatrix4(wC.makeRotationFromEuler(I)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&E.envMapRotation.value.premultiply(Eb),E.reflectivity.value=S.reflectivity,E.ior.value=S.ior,E.refractionRatio.value=S.refractionRatio),S.lightMap&&(E.lightMap.value=S.lightMap,E.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,E.lightMapTransform)),S.aoMap&&(E.aoMap.value=S.aoMap,E.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,E.aoMapTransform))}function f(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform))}function h(E,S){E.dashSize.value=S.dashSize,E.totalSize.value=S.dashSize+S.gapSize,E.scale.value=S.scale}function m(E,S,N,U){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.size.value=S.size*N,E.scale.value=U*.5,S.map&&(E.map.value=S.map,i(S.map,E.uvTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function p(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.rotation.value=S.rotation,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function x(E,S){E.specular.value.copy(S.specular),E.shininess.value=Math.max(S.shininess,1e-4)}function _(E,S){S.gradientMap&&(E.gradientMap.value=S.gradientMap)}function g(E,S){E.metalness.value=S.metalness,S.metalnessMap&&(E.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,E.metalnessMapTransform)),E.roughness.value=S.roughness,S.roughnessMap&&(E.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,E.roughnessMapTransform)),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)}function b(E,S,N){E.ior.value=S.ior,S.sheen>0&&(E.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),E.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(E.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,E.sheenColorMapTransform)),S.sheenRoughnessMap&&(E.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,E.sheenRoughnessMapTransform))),S.clearcoat>0&&(E.clearcoat.value=S.clearcoat,E.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(E.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,E.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(E.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Ci&&E.clearcoatNormalScale.value.negate())),S.dispersion>0&&(E.dispersion.value=S.dispersion),S.iridescence>0&&(E.iridescence.value=S.iridescence,E.iridescenceIOR.value=S.iridescenceIOR,E.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(E.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,E.iridescenceMapTransform)),S.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),S.transmission>0&&(E.transmission.value=S.transmission,E.transmissionSamplerMap.value=N.texture,E.transmissionSamplerSize.value.set(N.width,N.height),S.transmissionMap&&(E.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,E.transmissionMapTransform)),E.thickness.value=S.thickness,S.thicknessMap&&(E.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=S.attenuationDistance,E.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(E.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(E.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=S.specularIntensity,E.specularColor.value.copy(S.specularColor),S.specularColorMap&&(E.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,E.specularColorMapTransform)),S.specularIntensityMap&&(E.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,E.specularIntensityMapTransform))}function M(E,S){S.matcap&&(E.matcap.value=S.matcap)}function R(E,S){const N=e.get(S).light;E.referencePosition.value.setFromMatrixPosition(N.matrixWorld),E.nearDistance.value=N.shadow.camera.near,E.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function CC(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,U){const I=U.program;s.uniformBlockBinding(N,I)}function p(N,U){let I=l[N.id];I===void 0&&(M(N),I=x(N),l[N.id]=I,N.addEventListener("dispose",E));const k=U.program;s.updateUBOMapping(N,k);const L=e.render.frame;c[N.id]!==L&&(g(N),c[N.id]=L)}function x(N){const U=_();N.__bindingPointIndex=U;const I=r.createBuffer(),k=N.__size,L=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,I),r.bufferData(r.UNIFORM_BUFFER,k,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,I),I}function _(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const U=l[N.id],I=N.uniforms,k=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let L=0,B=I.length;L<B;L++){const A=Array.isArray(I[L])?I[L]:[I[L]];for(let F=0,j=A.length;F<j;F++){const H=A[F];if(b(H,L,F,k)===!0){const q=H.__offset,se=Array.isArray(H.value)?H.value:[H.value];let ee=0;for(let V=0;V<se.length;V++){const D=se[V],z=R(D);typeof D=="number"||typeof D=="boolean"?(H.__data[0]=D,r.bufferSubData(r.UNIFORM_BUFFER,q+ee,H.__data)):D.isMatrix3?(H.__data[0]=D.elements[0],H.__data[1]=D.elements[1],H.__data[2]=D.elements[2],H.__data[3]=0,H.__data[4]=D.elements[3],H.__data[5]=D.elements[4],H.__data[6]=D.elements[5],H.__data[7]=0,H.__data[8]=D.elements[6],H.__data[9]=D.elements[7],H.__data[10]=D.elements[8],H.__data[11]=0):ArrayBuffer.isView(D)?H.__data.set(new D.constructor(D.buffer,D.byteOffset,H.__data.length)):(D.toArray(H.__data,ee),ee+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,q,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(N,U,I,k){const L=N.value,B=U+"_"+I;if(k[B]===void 0)return typeof L=="number"||typeof L=="boolean"?k[B]=L:ArrayBuffer.isView(L)?k[B]=L.slice():k[B]=L.clone(),!0;{const A=k[B];if(typeof L=="number"||typeof L=="boolean"){if(A!==L)return k[B]=L,!0}else{if(ArrayBuffer.isView(L))return!0;if(A.equals(L)===!1)return A.copy(L),!0}}return!1}function M(N){const U=N.uniforms;let I=0;const k=16;for(let B=0,A=U.length;B<A;B++){const F=Array.isArray(U[B])?U[B]:[U[B]];for(let j=0,H=F.length;j<H;j++){const q=F[j],se=Array.isArray(q.value)?q.value:[q.value];for(let ee=0,V=se.length;ee<V;ee++){const D=se[ee],z=R(D),K=I%k,ue=K%z.boundary,ge=K+ue;I+=ue,ge!==0&&k-ge<z.storage&&(I+=k-ge),q.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=I,I+=z.storage}}}const L=I%k;return L>0&&(I+=k-L),N.__size=I,N.__cache={},this}function R(N){const U={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(U.boundary=4,U.storage=4):N.isVector2?(U.boundary=8,U.storage=8):N.isVector3||N.isColor?(U.boundary=16,U.storage=12):N.isVector4?(U.boundary=16,U.storage=16):N.isMatrix3?(U.boundary=48,U.storage=48):N.isMatrix4?(U.boundary=64,U.storage=64):N.isTexture?dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(U.boundary=16,U.storage=N.byteLength):dt("WebGLRenderer: Unsupported uniform value type.",N),U}function E(N){const U=N.target;U.removeEventListener("dispose",E);const I=f.indexOf(U.__bindingPointIndex);f.splice(I,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function S(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:p,dispose:S}}const NC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ma=null;function OC(){return Ma===null&&(Ma=new _T(NC,16,16,Ur,ps),Ma.name="DFG_LUT",Ma.minFilter=di,Ma.magFilter=di,Ma.wrapS=fs,Ma.wrapT=fs,Ma.generateMipmaps=!1,Ma.needsUpdate=!0),Ma}class DC{constructor(e={}){const{canvas:i=qM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:b=aa}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const R=b,E=new Set([nm,tm,em]),S=new Set([aa,Oa,ec,tc,Qp,Jp]),N=new Uint32Array(4),U=new Int32Array(4),I=new ae;let k=null,L=null;const B=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ra,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const j=this;let H=!1,q=null;this._outputColorSpace=ji;let se=0,ee=0,V=null,D=-1,z=null;const K=new Un,ue=new Un;let ge=null;const P=new fn(0);let Z=0,_e=i.width,Ae=i.height,Ne=1,te=null,Se=null;const ye=new Un(0,0,_e,Ae),Ge=new Un(0,0,_e,Ae);let We=!1;const Qe=new ub;let St=!1,Xe=!1;const wt=new Yn,Bt=new ae,ht=new Un,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function Ze(){return V===null?Ne:1}let Y=s;function Nt(w,$){return i.getContext(w,$)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Kp}`),i.addEventListener("webglcontextlost",Te,!1),i.addEventListener("webglcontextrestored",qe,!1),i.addEventListener("webglcontextcreationerror",ot,!1),Y===null){const $="webgl2";if(Y=Nt($,w),Y===null)throw Nt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw qt("WebGLRenderer: "+w.message),w}let ft,Vt,Ce,Qt,O,T,J,he,Me,Oe,Pe,de,pe,Le,Be,Ie,De,ut,rt,Mt,X,Re,me;function He(){ft=new Ow(Y),ft.init(),X=new SC(Y,ft),Vt=new Ew(Y,ft,e,X),Ce=new bC(Y,ft),Vt.reversedDepthBuffer&&g&&Ce.buffers.depth.setReversed(!0),Qt=new Uw(Y),O=new rC,T=new yC(Y,ft,Ce,O,Vt,X,Qt),J=new Nw(j),he=new BT(Y),Re=new yw(Y,he),Me=new Dw(Y,he,Qt,Re),Oe=new Pw(Y,Me,he,Re,Qt),ut=new Iw(Y,Vt,T),Be=new Mw(O),Pe=new sC(j,J,ft,Vt,Re,Be),de=new RC(j,O),pe=new lC,Le=new pC(ft),De=new bw(j,J,Ce,Oe,M,m),Ie=new vC(j,Oe,Vt),me=new CC(Y,Qt,Vt,Ce),rt=new Sw(Y,ft,Qt),Mt=new Lw(Y,ft,Qt),Qt.programs=Pe.programs,j.capabilities=Vt,j.extensions=ft,j.properties=O,j.renderLists=pe,j.shadowMap=Ie,j.state=Ce,j.info=Qt}He(),R!==aa&&(F=new Bw(R,i.width,i.height,l,c));const Ue=new AC(j,Y);this.xr=Ue,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const w=ft.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ft.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Ne},this.setPixelRatio=function(w){w!==void 0&&(Ne=w,this.setSize(_e,Ae,!1))},this.getSize=function(w){return w.set(_e,Ae)},this.setSize=function(w,$,ne=!0){if(Ue.isPresenting){dt("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=w,Ae=$,i.width=Math.floor(w*Ne),i.height=Math.floor($*Ne),ne===!0&&(i.style.width=w+"px",i.style.height=$+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,$)},this.getDrawingBufferSize=function(w){return w.set(_e*Ne,Ae*Ne).floor()},this.setDrawingBufferSize=function(w,$,ne){_e=w,Ae=$,Ne=ne,i.width=Math.floor(w*ne),i.height=Math.floor($*ne),this.setViewport(0,0,w,$)},this.setEffects=function(w){if(R===aa){qt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let $=0;$<w.length;$++)if(w[$].isOutputPass===!0){dt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(K)},this.getViewport=function(w){return w.copy(ye)},this.setViewport=function(w,$,ne,ie){w.isVector4?ye.set(w.x,w.y,w.z,w.w):ye.set(w,$,ne,ie),Ce.viewport(K.copy(ye).multiplyScalar(Ne).round())},this.getScissor=function(w){return w.copy(Ge)},this.setScissor=function(w,$,ne,ie){w.isVector4?Ge.set(w.x,w.y,w.z,w.w):Ge.set(w,$,ne,ie),Ce.scissor(ue.copy(Ge).multiplyScalar(Ne).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(w){Ce.setScissorTest(We=w)},this.setOpaqueSort=function(w){te=w},this.setTransparentSort=function(w){Se=w},this.getClearColor=function(w){return w.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(w=!0,$=!0,ne=!0){let ie=0;if(w){let re=!1;if(V!==null){const ze=V.texture.format;re=E.has(ze)}if(re){const ze=V.texture.type,ke=S.has(ze),Fe=De.getClearColor(),$e=De.getClearAlpha(),Ye=Fe.r,it=Fe.g,vt=Fe.b;ke?(N[0]=Ye,N[1]=it,N[2]=vt,N[3]=$e,Y.clearBufferuiv(Y.COLOR,0,N)):(U[0]=Ye,U[1]=it,U[2]=vt,U[3]=$e,Y.clearBufferiv(Y.COLOR,0,U))}else ie|=Y.COLOR_BUFFER_BIT}$&&(ie|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(ie|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&Y.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Te,!1),i.removeEventListener("webglcontextrestored",qe,!1),i.removeEventListener("webglcontextcreationerror",ot,!1),De.dispose(),pe.dispose(),Le.dispose(),O.dispose(),J.dispose(),Oe.dispose(),Re.dispose(),me.dispose(),Pe.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",tr),Ue.removeEventListener("sessionend",nr),Nn.stop()};function Te(w){w.preventDefault(),L_("WebGLRenderer: Context Lost."),H=!0}function qe(){L_("WebGLRenderer: Context Restored."),H=!1;const w=Qt.autoReset,$=Ie.enabled,ne=Ie.autoUpdate,ie=Ie.needsUpdate,re=Ie.type;He(),Qt.autoReset=w,Ie.enabled=$,Ie.autoUpdate=ne,Ie.needsUpdate=ie,Ie.type=re}function ot(w){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function xn(w){const $=w.target;$.removeEventListener("dispose",xn),jt($)}function jt(w){$n(w),O.remove(w)}function $n(w){const $=O.get(w).programs;$!==void 0&&($.forEach(function(ne){Pe.releaseProgram(ne)}),w.isShaderMaterial&&Pe.releaseShaderCache(w))}this.renderBufferDirect=function(w,$,ne,ie,re,ze){$===null&&($=It);const ke=re.isMesh&&re.matrixWorld.determinant()<0,Fe=ga(w,$,ne,ie,re);Ce.setMaterial(ie,ke);let $e=ne.index,Ye=1;if(ie.wireframe===!0){if($e=Me.getWireframeAttribute(ne),$e===void 0)return;Ye=2}const it=ne.drawRange,vt=ne.attributes.position;let nt=it.start*Ye,Xt=(it.start+it.count)*Ye;ze!==null&&(nt=Math.max(nt,ze.start*Ye),Xt=Math.min(Xt,(ze.start+ze.count)*Ye)),$e!==null?(nt=Math.max(nt,0),Xt=Math.min(Xt,$e.count)):vt!=null&&(nt=Math.max(nt,0),Xt=Math.min(Xt,vt.count));const Yt=Xt-nt;if(Yt<0||Yt===1/0)return;Re.setup(re,ie,Fe,ne,$e);let tn,Jt=rt;if($e!==null&&(tn=he.get($e),Jt=Mt,Jt.setIndex(tn)),re.isMesh)ie.wireframe===!0?(Ce.setLineWidth(ie.wireframeLinewidth*Ze()),Jt.setMode(Y.LINES)):Jt.setMode(Y.TRIANGLES);else if(re.isLine){let Wt=ie.linewidth;Wt===void 0&&(Wt=1),Ce.setLineWidth(Wt*Ze()),re.isLineSegments?Jt.setMode(Y.LINES):re.isLineLoop?Jt.setMode(Y.LINE_LOOP):Jt.setMode(Y.LINE_STRIP)}else re.isPoints?Jt.setMode(Y.POINTS):re.isSprite&&Jt.setMode(Y.TRIANGLES);if(re.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))Jt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else{const Wt=re._multiDrawStarts,Ve=re._multiDrawCounts,Pn=re._multiDrawCount,Rt=$e?he.get($e).bytesPerElement:1,mn=O.get(ie).currentProgram.getUniforms();for(let En=0;En<Pn;En++)mn.setValue(Y,"_gl_DrawID",En),Jt.render(Wt[En]/Rt,Ve[En])}else if(re.isInstancedMesh)Jt.renderInstances(nt,Yt,re.count);else if(ne.isInstancedBufferGeometry){const Wt=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ve=Math.min(ne.instanceCount,Wt);Jt.renderInstances(nt,Yt,Ve)}else Jt.render(nt,Yt)};function ri(w,$,ne){w.transparent===!0&&w.side===us&&w.forceSinglePass===!1?(w.side=Ci,w.needsUpdate=!0,gs(w,$,ne),w.side=Qs,w.needsUpdate=!0,gs(w,$,ne),w.side=us):gs(w,$,ne)}this.compile=function(w,$,ne=null){ne===null&&(ne=w),L=Le.get(ne),L.init($),A.push(L),ne.traverseVisible(function(re){re.isLight&&re.layers.test($.layers)&&(L.pushLight(re),re.castShadow&&L.pushShadow(re))}),w!==ne&&w.traverseVisible(function(re){re.isLight&&re.layers.test($.layers)&&(L.pushLight(re),re.castShadow&&L.pushShadow(re))}),L.setupLights();const ie=new Set;return w.traverse(function(re){if(!(re.isMesh||re.isPoints||re.isLine||re.isSprite))return;const ze=re.material;if(ze)if(Array.isArray(ze))for(let ke=0;ke<ze.length;ke++){const Fe=ze[ke];ri(Fe,ne,re),ie.add(Fe)}else ri(ze,ne,re),ie.add(ze)}),L=A.pop(),ie},this.compileAsync=function(w,$,ne=null){const ie=this.compile(w,$,ne);return new Promise(re=>{function ze(){if(ie.forEach(function(ke){O.get(ke).currentProgram.isReady()&&ie.delete(ke)}),ie.size===0){re(w);return}setTimeout(ze,10)}ft.get("KHR_parallel_shader_compile")!==null?ze():setTimeout(ze,10)})};let Ia=null;function Qn(w){Ia&&Ia(w)}function tr(){Nn.stop()}function nr(){Nn.start()}const Nn=new gb;Nn.setAnimationLoop(Qn),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(w){Ia=w,Ue.setAnimationLoop(w),w===null?Nn.stop():Nn.start()},Ue.addEventListener("sessionstart",tr),Ue.addEventListener("sessionend",nr),this.render=function(w,$){if($!==void 0&&$.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;q!==null&&q.renderStart(w,$);const ne=Ue.enabled===!0&&Ue.isPresenting===!0,ie=F!==null&&(V===null||ne)&&F.begin(j,V);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera($),$=Ue.getCamera()),w.isScene===!0&&w.onBeforeRender(j,w,$,V),L=Le.get(w,A.length),L.init($),L.state.textureUnits=T.getTextureUnits(),A.push(L),wt.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),Qe.setFromProjectionMatrix(wt,wa,$.reversedDepth),Xe=this.localClippingEnabled,St=Be.init(this.clippingPlanes,Xe),k=pe.get(w,B.length),k.init(),B.push(k),Ue.enabled===!0&&Ue.isPresenting===!0){const ke=j.xr.getDepthSensingMesh();ke!==null&&_n(ke,$,-1/0,j.sortObjects)}_n(w,$,0,j.sortObjects),k.finish(),j.sortObjects===!0&&k.sort(te,Se),Zt=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Zt&&De.addToRenderList(k,w),this.info.render.frame++,St===!0&&Be.beginShadows();const re=L.state.shadowsArray;if(Ie.render(re,w,$),St===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ie&&F.hasRenderPass())===!1){const ke=k.opaque,Fe=k.transmissive;if(L.setupLights(),$.isArrayCamera){const $e=$.cameras;if(Fe.length>0)for(let Ye=0,it=$e.length;Ye<it;Ye++){const vt=$e[Ye];Oi(ke,Fe,w,vt)}Zt&&De.render(w);for(let Ye=0,it=$e.length;Ye<it;Ye++){const vt=$e[Ye];Tn(k,w,vt,vt.viewport)}}else Fe.length>0&&Oi(ke,Fe,w,$),Zt&&De.render(w),Tn(k,w,$)}V!==null&&ee===0&&(T.updateMultisampleRenderTarget(V),T.updateRenderTargetMipmap(V)),ie&&F.end(j),w.isScene===!0&&w.onAfterRender(j,w,$),Re.resetDefaultState(),D=-1,z=null,A.pop(),A.length>0?(L=A[A.length-1],T.setTextureUnits(L.state.textureUnits),St===!0&&Be.setGlobalState(j.clippingPlanes,L.state.camera)):L=null,B.pop(),B.length>0?k=B[B.length-1]:k=null,q!==null&&q.renderEnd()};function _n(w,$,ne,ie){if(w.visible===!1)return;if(w.layers.test($.layers)){if(w.isGroup)ne=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update($);else if(w.isLightProbeGrid)L.pushLightProbeGrid(w);else if(w.isLight)L.pushLight(w),w.castShadow&&L.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Qe.intersectsSprite(w)){ie&&ht.setFromMatrixPosition(w.matrixWorld).applyMatrix4(wt);const ke=Oe.update(w),Fe=w.material;Fe.visible&&k.push(w,ke,Fe,ne,ht.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Qe.intersectsObject(w))){const ke=Oe.update(w),Fe=w.material;if(ie&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ht.copy(w.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),ht.copy(ke.boundingSphere.center)),ht.applyMatrix4(w.matrixWorld).applyMatrix4(wt)),Array.isArray(Fe)){const $e=ke.groups;for(let Ye=0,it=$e.length;Ye<it;Ye++){const vt=$e[Ye],nt=Fe[vt.materialIndex];nt&&nt.visible&&k.push(w,ke,nt,ne,ht.z,vt)}}else Fe.visible&&k.push(w,ke,Fe,ne,ht.z,null)}}const ze=w.children;for(let ke=0,Fe=ze.length;ke<Fe;ke++)_n(ze[ke],$,ne,ie)}function Tn(w,$,ne,ie){const{opaque:re,transmissive:ze,transparent:ke}=w;L.setupLightsView(ne),St===!0&&Be.setGlobalState(j.clippingPlanes,ne),ie&&Ce.viewport(K.copy(ie)),re.length>0&&pn(re,$,ne),ze.length>0&&pn(ze,$,ne),ke.length>0&&pn(ke,$,ne),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Oi(w,$,ne,ie){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[ie.id]===void 0){const nt=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[ie.id]=new Ca(1,1,{generateMipmaps:!0,type:nt?ps:aa,minFilter:Cr,samples:Math.max(4,Vt.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace})}const ze=L.state.transmissionRenderTarget[ie.id],ke=ie.viewport||K;ze.setSize(ke.z*j.transmissionResolutionScale,ke.w*j.transmissionResolutionScale);const Fe=j.getRenderTarget(),$e=j.getActiveCubeFace(),Ye=j.getActiveMipmapLevel();j.setRenderTarget(ze),j.getClearColor(P),Z=j.getClearAlpha(),Z<1&&j.setClearColor(16777215,.5),j.clear(),Zt&&De.render(ne);const it=j.toneMapping;j.toneMapping=Ra;const vt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),L.setupLightsView(ie),St===!0&&Be.setGlobalState(j.clippingPlanes,ie),pn(w,ne,ie),T.updateMultisampleRenderTarget(ze),T.updateRenderTargetMipmap(ze),ft.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Xt=0,Yt=$.length;Xt<Yt;Xt++){const tn=$[Xt],{object:Jt,geometry:Wt,material:Ve,group:Pn}=tn;if(Ve.side===us&&Jt.layers.test(ie.layers)){const Rt=Ve.side;Ve.side=Ci,Ve.needsUpdate=!0,ma(Jt,ne,ie,Wt,Ve,Pn),Ve.side=Rt,Ve.needsUpdate=!0,nt=!0}}nt===!0&&(T.updateMultisampleRenderTarget(ze),T.updateRenderTargetMipmap(ze))}j.setRenderTarget(Fe,$e,Ye),j.setClearColor(P,Z),vt!==void 0&&(ie.viewport=vt),j.toneMapping=it}function pn(w,$,ne){const ie=$.isScene===!0?$.overrideMaterial:null;for(let re=0,ze=w.length;re<ze;re++){const ke=w[re],{object:Fe,geometry:$e,group:Ye}=ke;let it=ke.material;it.allowOverride===!0&&ie!==null&&(it=ie),Fe.layers.test(ne.layers)&&ma(Fe,$,ne,$e,it,Ye)}}function ma(w,$,ne,ie,re,ze){w.onBeforeRender(j,$,ne,ie,re,ze),w.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),re.onBeforeRender(j,$,ne,ie,w,ze),re.transparent===!0&&re.side===us&&re.forceSinglePass===!1?(re.side=Ci,re.needsUpdate=!0,j.renderBufferDirect(ne,$,ie,re,w,ze),re.side=Qs,re.needsUpdate=!0,j.renderBufferDirect(ne,$,ie,re,w,ze),re.side=us):j.renderBufferDirect(ne,$,ie,re,w,ze),w.onAfterRender(j,$,ne,ie,re,ze)}function gs(w,$,ne){$.isScene!==!0&&($=It);const ie=O.get(w),re=L.state.lights,ze=L.state.shadowsArray,ke=re.state.version,Fe=Pe.getParameters(w,re.state,ze,$,ne,L.state.lightProbeGridArray),$e=Pe.getProgramCacheKey(Fe);let Ye=ie.programs;ie.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?$.environment:null,ie.fog=$.fog;const it=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ie.envMap=J.get(w.envMap||ie.environment,it),ie.envMapRotation=ie.environment!==null&&w.envMap===null?$.environmentRotation:w.envMapRotation,Ye===void 0&&(w.addEventListener("dispose",xn),Ye=new Map,ie.programs=Ye);let vt=Ye.get($e);if(vt!==void 0){if(ie.currentProgram===vt&&ie.lightsStateVersion===ke)return Fa(w,Fe),vt}else Fe.uniforms=Pe.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,ne,Fe),w.onBeforeCompile(Fe,j),vt=Pe.acquireProgram(Fe,$e),Ye.set($e,vt),ie.uniforms=Fe.uniforms;const nt=ie.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(nt.clippingPlanes=Be.uniform),Fa(w,Fe),ie.needsLights=Ba(w),ie.lightsStateVersion=ke,ie.needsLights&&(nt.ambientLightColor.value=re.state.ambient,nt.lightProbe.value=re.state.probe,nt.directionalLights.value=re.state.directional,nt.directionalLightShadows.value=re.state.directionalShadow,nt.spotLights.value=re.state.spot,nt.spotLightShadows.value=re.state.spotShadow,nt.rectAreaLights.value=re.state.rectArea,nt.ltc_1.value=re.state.rectAreaLTC1,nt.ltc_2.value=re.state.rectAreaLTC2,nt.pointLights.value=re.state.point,nt.pointLightShadows.value=re.state.pointShadow,nt.hemisphereLights.value=re.state.hemi,nt.directionalShadowMatrix.value=re.state.directionalShadowMatrix,nt.spotLightMatrix.value=re.state.spotLightMatrix,nt.spotLightMap.value=re.state.spotLightMap,nt.pointShadowMatrix.value=re.state.pointShadowMatrix),ie.lightProbeGrid=L.state.lightProbeGridArray.length>0,ie.currentProgram=vt,ie.uniformsList=null,vt}function Pa(w){if(w.uniformsList===null){const $=w.currentProgram.getUniforms();w.uniformsList=qu.seqWithValue($.seq,w.uniforms)}return w.uniformsList}function Fa(w,$){const ne=O.get(w);ne.outputColorSpace=$.outputColorSpace,ne.batching=$.batching,ne.batchingColor=$.batchingColor,ne.instancing=$.instancing,ne.instancingColor=$.instancingColor,ne.instancingMorph=$.instancingMorph,ne.skinning=$.skinning,ne.morphTargets=$.morphTargets,ne.morphNormals=$.morphNormals,ne.morphColors=$.morphColors,ne.morphTargetsCount=$.morphTargetsCount,ne.numClippingPlanes=$.numClippingPlanes,ne.numIntersection=$.numClipIntersection,ne.vertexAlphas=$.vertexAlphas,ne.vertexTangents=$.vertexTangents,ne.toneMapping=$.toneMapping}function Pr(w,$){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;I.setFromMatrixPosition($.matrixWorld);for(let ne=0,ie=w.length;ne<ie;ne++){const re=w[ne];if(re.texture!==null&&re.boundingBox.containsPoint(I))return re}return null}function ga(w,$,ne,ie,re){$.isScene!==!0&&($=It),T.resetTextureUnits();const ze=$.fog,ke=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?$.environment:null,Fe=V===null?j.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:kt.workingColorSpace,$e=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,Ye=J.get(ie.envMap||ke,$e),it=ie.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,vt=!!ne.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),nt=!!ne.morphAttributes.position,Xt=!!ne.morphAttributes.normal,Yt=!!ne.morphAttributes.color;let tn=Ra;ie.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(tn=j.toneMapping);const Jt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Wt=Jt!==void 0?Jt.length:0,Ve=O.get(ie),Pn=L.state.lights;if(St===!0&&(Xe===!0||w!==z)){const Gt=w===z&&ie.id===D;Be.setState(ie,w,Gt)}let Rt=!1;ie.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Pn.state.version||Ve.outputColorSpace!==Fe||re.isBatchedMesh&&Ve.batching===!1||!re.isBatchedMesh&&Ve.batching===!0||re.isBatchedMesh&&Ve.batchingColor===!0&&re.colorTexture===null||re.isBatchedMesh&&Ve.batchingColor===!1&&re.colorTexture!==null||re.isInstancedMesh&&Ve.instancing===!1||!re.isInstancedMesh&&Ve.instancing===!0||re.isSkinnedMesh&&Ve.skinning===!1||!re.isSkinnedMesh&&Ve.skinning===!0||re.isInstancedMesh&&Ve.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&Ve.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&Ve.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&Ve.instancingMorph===!1&&re.morphTexture!==null||Ve.envMap!==Ye||ie.fog===!0&&Ve.fog!==ze||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Be.numPlanes||Ve.numIntersection!==Be.numIntersection)||Ve.vertexAlphas!==it||Ve.vertexTangents!==vt||Ve.morphTargets!==nt||Ve.morphNormals!==Xt||Ve.morphColors!==Yt||Ve.toneMapping!==tn||Ve.morphTargetsCount!==Wt||!!Ve.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(Rt=!0):(Rt=!0,Ve.__version=ie.version);let mn=Ve.currentProgram;Rt===!0&&(mn=gs(ie,$,re),q&&ie.isNodeMaterial&&q.onUpdateProgram(ie,mn,Ve));let En=!1,yn=!1,Jn=!1;const zt=mn.getUniforms(),gn=Ve.uniforms;if(Ce.useProgram(mn.program)&&(En=!0,yn=!0,Jn=!0),ie.id!==D&&(D=ie.id,yn=!0),Ve.needsLights){const Gt=Pr(L.state.lightProbeGridArray,re);Ve.lightProbeGrid!==Gt&&(Ve.lightProbeGrid=Gt,yn=!0)}if(En||z!==w){Ce.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),zt.setValue(Y,"projectionMatrix",w.projectionMatrix),zt.setValue(Y,"viewMatrix",w.matrixWorldInverse);const Mn=zt.map.cameraPosition;Mn!==void 0&&Mn.setValue(Y,Bt.setFromMatrixPosition(w.matrixWorld)),Vt.logarithmicDepthBuffer&&zt.setValue(Y,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&zt.setValue(Y,"isOrthographic",w.isOrthographicCamera===!0),z!==w&&(z=w,yn=!0,Jn=!0)}if(Ve.needsLights&&(Pn.state.directionalShadowMap.length>0&&zt.setValue(Y,"directionalShadowMap",Pn.state.directionalShadowMap,T),Pn.state.spotShadowMap.length>0&&zt.setValue(Y,"spotShadowMap",Pn.state.spotShadowMap,T),Pn.state.pointShadowMap.length>0&&zt.setValue(Y,"pointShadowMap",Pn.state.pointShadowMap,T)),re.isSkinnedMesh){zt.setOptional(Y,re,"bindMatrix"),zt.setOptional(Y,re,"bindMatrixInverse");const Gt=re.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),zt.setValue(Y,"boneTexture",Gt.boneTexture,T))}re.isBatchedMesh&&(zt.setOptional(Y,re,"batchingTexture"),zt.setValue(Y,"batchingTexture",re._matricesTexture,T),zt.setOptional(Y,re,"batchingIdTexture"),zt.setValue(Y,"batchingIdTexture",re._indirectTexture,T),zt.setOptional(Y,re,"batchingColorTexture"),re._colorsTexture!==null&&zt.setValue(Y,"batchingColorTexture",re._colorsTexture,T));const _i=ne.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&ut.update(re,ne,mn),(yn||Ve.receiveShadow!==re.receiveShadow)&&(Ve.receiveShadow=re.receiveShadow,zt.setValue(Y,"receiveShadow",re.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&$.environment!==null&&(gn.envMapIntensity.value=$.environmentIntensity),gn.dfgLUT!==void 0&&(gn.dfgLUT.value=OC()),yn){if(zt.setValue(Y,"toneMappingExposure",j.toneMappingExposure),Ve.needsLights&&xa(gn,Jn),ze&&ie.fog===!0&&de.refreshFogUniforms(gn,ze),de.refreshMaterialUniforms(gn,ie,Ne,Ae,L.state.transmissionRenderTarget[w.id]),Ve.needsLights&&Ve.lightProbeGrid){const Gt=Ve.lightProbeGrid;gn.probesSH.value=Gt.texture,gn.probesMin.value.copy(Gt.boundingBox.min),gn.probesMax.value.copy(Gt.boundingBox.max),gn.probesResolution.value.copy(Gt.resolution)}qu.upload(Y,Pa(Ve),gn,T)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(qu.upload(Y,Pa(Ve),gn,T),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&zt.setValue(Y,"center",re.center),zt.setValue(Y,"modelViewMatrix",re.modelViewMatrix),zt.setValue(Y,"normalMatrix",re.normalMatrix),zt.setValue(Y,"modelMatrix",re.matrixWorld),ie.uniformsGroups!==void 0){const Gt=ie.uniformsGroups;for(let Mn=0,za=Gt.length;Mn<za;Mn++){const xs=Gt[Mn];me.update(xs,mn),me.bind(xs,mn)}}return mn}function xa(w,$){w.ambientLightColor.needsUpdate=$,w.lightProbe.needsUpdate=$,w.directionalLights.needsUpdate=$,w.directionalLightShadows.needsUpdate=$,w.pointLights.needsUpdate=$,w.pointLightShadows.needsUpdate=$,w.spotLights.needsUpdate=$,w.spotLightShadows.needsUpdate=$,w.rectAreaLights.needsUpdate=$,w.hemisphereLights.needsUpdate=$}function Ba(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(w,$,ne){const ie=O.get(w);ie.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),O.get(w.texture).__webglTexture=$,O.get(w.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:ne,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,$){const ne=O.get(w);ne.__webglFramebuffer=$,ne.__useDefaultFramebuffer=$===void 0};const _a=Y.createFramebuffer();this.setRenderTarget=function(w,$=0,ne=0){V=w,se=$,ee=ne;let ie=null,re=!1,ze=!1;if(w){const Fe=O.get(w);if(Fe.__useDefaultFramebuffer!==void 0){Ce.bindFramebuffer(Y.FRAMEBUFFER,Fe.__webglFramebuffer),K.copy(w.viewport),ue.copy(w.scissor),ge=w.scissorTest,Ce.viewport(K),Ce.scissor(ue),Ce.setScissorTest(ge),D=-1;return}else if(Fe.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Fe.__hasExternalTextures)T.rebindTextures(w,O.get(w.texture).__webglTexture,O.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const it=w.depthTexture;if(Fe.__boundDepthTexture!==it){if(it!==null&&O.has(it)&&(w.width!==it.image.width||w.height!==it.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const $e=w.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(ze=!0);const Ye=O.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ye[$])?ie=Ye[$][ne]:ie=Ye[$],re=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?ie=O.get(w).__webglMultisampledFramebuffer:Array.isArray(Ye)?ie=Ye[ne]:ie=Ye,K.copy(w.viewport),ue.copy(w.scissor),ge=w.scissorTest}else K.copy(ye).multiplyScalar(Ne).floor(),ue.copy(Ge).multiplyScalar(Ne).floor(),ge=We;if(ne!==0&&(ie=_a),Ce.bindFramebuffer(Y.FRAMEBUFFER,ie)&&Ce.drawBuffers(w,ie),Ce.viewport(K),Ce.scissor(ue),Ce.setScissorTest(ge),re){const Fe=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+$,Fe.__webglTexture,ne)}else if(ze){const Fe=$;for(let $e=0;$e<w.textures.length;$e++){const Ye=O.get(w.textures[$e]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+$e,Ye.__webglTexture,ne,Fe)}}else if(w!==null&&ne!==0){const Fe=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Fe.__webglTexture,ne)}D=-1},this.readRenderTargetPixels=function(w,$,ne,ie,re,ze,ke,Fe=0){if(!(w&&w.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $e=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ke!==void 0&&($e=$e[ke]),$e){Ce.bindFramebuffer(Y.FRAMEBUFFER,$e);try{const Ye=w.textures[Fe],it=Ye.format,vt=Ye.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Vt.textureFormatReadable(it)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(vt)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=w.width-ie&&ne>=0&&ne<=w.height-re&&Y.readPixels($,ne,ie,re,X.convert(it),X.convert(vt),ze)}finally{const Ye=V!==null?O.get(V).__webglFramebuffer:null;Ce.bindFramebuffer(Y.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(w,$,ne,ie,re,ze,ke,Fe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let $e=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ke!==void 0&&($e=$e[ke]),$e)if($>=0&&$<=w.width-ie&&ne>=0&&ne<=w.height-re){Ce.bindFramebuffer(Y.FRAMEBUFFER,$e);const Ye=w.textures[Fe],it=Ye.format,vt=Ye.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Vt.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,nt),Y.bufferData(Y.PIXEL_PACK_BUFFER,ze.byteLength,Y.STREAM_READ),Y.readPixels($,ne,ie,re,X.convert(it),X.convert(vt),0);const Xt=V!==null?O.get(V).__webglFramebuffer:null;Ce.bindFramebuffer(Y.FRAMEBUFFER,Xt);const Yt=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await $M(Y,Yt,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,nt),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,ze),Y.deleteBuffer(nt),Y.deleteSync(Yt),ze}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,$=null,ne=0){const ie=Math.pow(2,-ne),re=Math.floor(w.image.width*ie),ze=Math.floor(w.image.height*ie),ke=$!==null?$.x:0,Fe=$!==null?$.y:0;T.setTexture2D(w,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ne,0,0,ke,Fe,re,ze),Ce.unbindTexture()};const An=Y.createFramebuffer(),Fr=Y.createFramebuffer();this.copyTextureToTexture=function(w,$,ne=null,ie=null,re=0,ze=0){let ke,Fe,$e,Ye,it,vt,nt,Xt,Yt;const tn=w.isCompressedTexture?w.mipmaps[ze]:w.image;if(ne!==null)ke=ne.max.x-ne.min.x,Fe=ne.max.y-ne.min.y,$e=ne.isBox3?ne.max.z-ne.min.z:1,Ye=ne.min.x,it=ne.min.y,vt=ne.isBox3?ne.min.z:0;else{const gn=Math.pow(2,-re);ke=Math.floor(tn.width*gn),Fe=Math.floor(tn.height*gn),w.isDataArrayTexture?$e=tn.depth:w.isData3DTexture?$e=Math.floor(tn.depth*gn):$e=1,Ye=0,it=0,vt=0}ie!==null?(nt=ie.x,Xt=ie.y,Yt=ie.z):(nt=0,Xt=0,Yt=0);const Jt=X.convert($.format),Wt=X.convert($.type);let Ve;$.isData3DTexture?(T.setTexture3D($,0),Ve=Y.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(T.setTexture2DArray($,0),Ve=Y.TEXTURE_2D_ARRAY):(T.setTexture2D($,0),Ve=Y.TEXTURE_2D),Ce.activeTexture(Y.TEXTURE0),Ce.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,$.flipY),Ce.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),Ce.pixelStorei(Y.UNPACK_ALIGNMENT,$.unpackAlignment);const Pn=Ce.getParameter(Y.UNPACK_ROW_LENGTH),Rt=Ce.getParameter(Y.UNPACK_IMAGE_HEIGHT),mn=Ce.getParameter(Y.UNPACK_SKIP_PIXELS),En=Ce.getParameter(Y.UNPACK_SKIP_ROWS),yn=Ce.getParameter(Y.UNPACK_SKIP_IMAGES);Ce.pixelStorei(Y.UNPACK_ROW_LENGTH,tn.width),Ce.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,tn.height),Ce.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ye),Ce.pixelStorei(Y.UNPACK_SKIP_ROWS,it),Ce.pixelStorei(Y.UNPACK_SKIP_IMAGES,vt);const Jn=w.isDataArrayTexture||w.isData3DTexture,zt=$.isDataArrayTexture||$.isData3DTexture;if(w.isDepthTexture){const gn=O.get(w),_i=O.get($),Gt=O.get(gn.__renderTarget),Mn=O.get(_i.__renderTarget);Ce.bindFramebuffer(Y.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Ce.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let za=0;za<$e;za++)Jn&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get(w).__webglTexture,re,vt+za),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get($).__webglTexture,ze,Yt+za)),Y.blitFramebuffer(Ye,it,ke,Fe,nt,Xt,ke,Fe,Y.DEPTH_BUFFER_BIT,Y.NEAREST);Ce.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(re!==0||w.isRenderTargetTexture||O.has(w)){const gn=O.get(w),_i=O.get($);Ce.bindFramebuffer(Y.READ_FRAMEBUFFER,An),Ce.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Fr);for(let Gt=0;Gt<$e;Gt++)Jn?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,gn.__webglTexture,re,vt+Gt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,gn.__webglTexture,re),zt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,_i.__webglTexture,ze,Yt+Gt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,_i.__webglTexture,ze),re!==0?Y.blitFramebuffer(Ye,it,ke,Fe,nt,Xt,ke,Fe,Y.COLOR_BUFFER_BIT,Y.NEAREST):zt?Y.copyTexSubImage3D(Ve,ze,nt,Xt,Yt+Gt,Ye,it,ke,Fe):Y.copyTexSubImage2D(Ve,ze,nt,Xt,Ye,it,ke,Fe);Ce.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else zt?w.isDataTexture||w.isData3DTexture?Y.texSubImage3D(Ve,ze,nt,Xt,Yt,ke,Fe,$e,Jt,Wt,tn.data):$.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ve,ze,nt,Xt,Yt,ke,Fe,$e,Jt,tn.data):Y.texSubImage3D(Ve,ze,nt,Xt,Yt,ke,Fe,$e,Jt,Wt,tn):w.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,ze,nt,Xt,ke,Fe,Jt,Wt,tn.data):w.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,ze,nt,Xt,tn.width,tn.height,Jt,tn.data):Y.texSubImage2D(Y.TEXTURE_2D,ze,nt,Xt,ke,Fe,Jt,Wt,tn);Ce.pixelStorei(Y.UNPACK_ROW_LENGTH,Pn),Ce.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Rt),Ce.pixelStorei(Y.UNPACK_SKIP_PIXELS,mn),Ce.pixelStorei(Y.UNPACK_SKIP_ROWS,En),Ce.pixelStorei(Y.UNPACK_SKIP_IMAGES,yn),ze===0&&$.generateMipmaps&&Y.generateMipmap(Ve),Ce.unbindTexture()},this.initRenderTarget=function(w){O.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Ce.unbindTexture()},this.resetState=function(){se=0,ee=0,V=null,Ce.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),i.unpackColorSpace=kt._getUnpackColorSpace()}}const Mv={type:"change"},um={type:"start"},Mb={type:"end"},Bu=new cb,Tv=new qs,LC=Math.cos(70*QM.DEG2RAD),Xn=new ae,Ri=2*Math.PI,un={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Kh=1e-6;class UC extends PT{constructor(e,i=null){super(e,i),this.state=un.NONE,this.target=new ae,this.cursor=new ae,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Go.ROTATE,MIDDLE:Go.DOLLY,RIGHT:Go.PAN},this.touches={ONE:zo.ROTATE,TWO:zo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ae,this._lastQuaternion=new Js,this._lastTargetPosition=new ae,this._quat=new Js().setFromUnitVectors(e.up,new ae(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Q_,this._sphericalDelta=new Q_,this._scale=1,this._panOffset=new ae,this._rotateStart=new Ct,this._rotateEnd=new Ct,this._rotateDelta=new Ct,this._panStart=new Ct,this._panEnd=new Ct,this._panDelta=new Ct,this._dollyStart=new Ct,this._dollyEnd=new Ct,this._dollyDelta=new Ct,this._dollyDirection=new ae,this._mouse=new Ct,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=PC.bind(this),this._onPointerDown=IC.bind(this),this._onPointerUp=FC.bind(this),this._onContextMenu=jC.bind(this),this._onMouseWheel=GC.bind(this),this._onKeyDown=HC.bind(this),this._onTouchStart=kC.bind(this),this._onTouchMove=VC.bind(this),this._onMouseDown=BC.bind(this),this._onMouseMove=zC.bind(this),this._interceptControlDown=XC.bind(this),this._interceptControlUp=YC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mv),this.update(),this.state=un.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;Xn.copy(i).sub(this.target),Xn.applyQuaternion(this._quat),this._spherical.setFromVector3(Xn),this.autoRotate&&this.state===un.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Ri:s>Math.PI&&(s-=Ri),l<-Math.PI?l+=Ri:l>Math.PI&&(l-=Ri),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(Xn.setFromSpherical(this._spherical),Xn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Xn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=Xn.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ae(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ae(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=Xn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Bu.origin.copy(this.object.position),Bu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Bu.direction))<LC?this.object.lookAt(this.target):(Tv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Bu.intersectPlane(Tv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Kh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Kh||this._lastTargetPosition.distanceToSquared(this.target)>Kh?(this.dispatchEvent(Mv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ri/60*this.autoRotateSpeed*e:Ri/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){Xn.setFromMatrixColumn(i,0),Xn.multiplyScalar(-e),this._panOffset.add(Xn)}_panUp(e,i){this.screenSpacePanning===!0?Xn.setFromMatrixColumn(i,1):(Xn.setFromMatrixColumn(i,0),Xn.crossVectors(this.object.up,Xn)),Xn.multiplyScalar(e),this._panOffset.add(Xn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Xn.copy(l).sub(this.target);let c=Xn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ri*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ri*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ri*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ri*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Ct,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function IC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function PC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function FC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mb),this.state=un.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function BC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Go.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=un.DOLLY;break;case Go.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=un.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=un.ROTATE}break;case Go.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=un.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=un.PAN}break;default:this.state=un.NONE}this.state!==un.NONE&&this.dispatchEvent(um)}function zC(r){switch(this.state){case un.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case un.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case un.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function GC(r){this.enabled===!1||this.enableZoom===!1||this.state!==un.NONE||(r.preventDefault(),this.dispatchEvent(um),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Mb))}function HC(r){this.enabled!==!1&&this._handleKeyDown(r)}function kC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case zo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=un.TOUCH_ROTATE;break;case zo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=un.TOUCH_PAN;break;default:this.state=un.NONE}break;case 2:switch(this.touches.TWO){case zo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=un.TOUCH_DOLLY_PAN;break;case zo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=un.TOUCH_DOLLY_ROTATE;break;default:this.state=un.NONE}break;default:this.state=un.NONE}this.state!==un.NONE&&this.dispatchEvent(um)}function VC(r){switch(this._trackPointer(r),this.state){case un.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case un.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case un.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case un.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=un.NONE}}function jC(r){this.enabled!==!1&&r.preventDefault()}function XC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function YC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Tb=({imageSrc:r,height:e=200})=>{const i=we.useRef(null);return we.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new dT,c=75,f=s.clientWidth/s.clientHeight,h=new ia(c,f,.1,1100);h.position.set(0,0,.1);const m=new DC({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new UC(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const x=new LT;let _=null;x.load(r,S=>{S.mapping=ku,S.colorSpace=ji;const N=new lm(500,60,40);N.scale(-1,1,1);const U=new om({map:S});_=new Da(N,U),l.add(_)});let g=c;const b=S=>{S.preventDefault();const N=S.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",b,{passive:!1});const M=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});M.observe(s);let R=null;const E=()=>{R=requestAnimationFrame(E),p.update(),m.render(l,h)};return E(),()=>{cancelAnimationFrame(R),M.disconnect(),s.removeEventListener("wheel",b),_&&(_.geometry.dispose(),_.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),v.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Av=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=we.useState(""),[f,h]=we.useState("");if(we.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",x=s==="openai",_=p,g=l.trim().startsWith("sk-"),b=x?"OpenAI API Key が必要です":_?"AI Engine を選択":"API Key が必要です",M=_?"Gemini AI Key または OpenAI Key (sk-...) を入力...":x?"sk-proj-...":"Google AI API Key を入力...",R="https://aistudio.google.com/app/apikey",E="https://platform.openai.com/api-keys",S=x?E:R,N=x?"🔑 OpenAI キーを取得":"🔑 キーを取得",U=_&&g||x?"emerald":"blue",I=U==="emerald"?"bg-emerald-600":"bg-blue-600",k=U==="emerald"?"border-emerald-500/30":"border-blue-500/30",L=U==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=U==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",A=U==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=U==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return v.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:v.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:v.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${k} rounded-xl shadow-2xl ${L} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&v.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),v.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),v.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[v.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[v.jsx("div",{className:`p-2 ${I} rounded-lg animate-pulse transition-colors duration-300`,children:v.jsx($u,{size:18,className:"text-white"})}),v.jsxs("div",{children:[v.jsx("p",{className:"text-sm font-bold text-white",children:b}),v.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),v.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[v.jsx("div",{className:"flex gap-2",children:v.jsxs("form",{onSubmit:j=>{j.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[v.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:j=>c(j.target.value),placeholder:M,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${A} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:j=>j.key==="Enter"&&m(),autoFocus:!0}),v.jsx("button",{onClick:m,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&v.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),_?v.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[v.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&v.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),v.jsxs("div",{className:"flex items-center gap-4",children:[v.jsx("a",{href:R,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),v.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),v.jsx("a",{href:E,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):v.jsx("div",{className:"flex justify-end",children:v.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:`text-[11px] ${U==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class Ab extends cS.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?v.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[v.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",jl,")"]}),v.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),v.jsx("br",{}),this.state.errorInfo?.componentStack]}),v.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}function WC({apiKey:r,isDragging:e,setIsDragging:i,processFiles:s,images:l,setImages:c,bg360Image:f,bg360Enabled:h,isAnalyzing:m,analyzeThought:p,castList:x,setCastList:_,isCastListCopied:g,setIsCastListCopied:b,currentStep:M,setShowModal:R}){return v.jsxs("section",{onDragOver:E=>{E.preventDefault(),r&&i(!0)},onDragLeave:()=>i(!1),onDrop:E=>{E.preventDefault(),i(!1),r&&s(E.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
        ${e?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
        ${M===1&&!e?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
        ${M>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[v.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[v.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${M===1?"text-blue-400":"text-slate-500"} `,children:[v.jsx(TS,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),m&&v.jsx(Xi,{size:18,className:"animate-spin text-blue-400"}),M>1&&v.jsx(Vi,{size:18,className:"text-blue-500"})]}),v.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[l.map((E,S)=>v.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[v.jsx("img",{src:E,className:"w-full h-full object-cover shadow-sm",alt:`char-${S}`}),v.jsx("button",{onClick:()=>c(l.filter((N,U)=>U!==S)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:v.jsx(Zl,{size:16})})]},S)),f&&v.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${h?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[v.jsx("img",{src:f,className:`w-full h-full object-cover shadow-sm ${h?"opacity-100":"opacity-40 grayscale"}`,alt:"360 bg"}),v.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[v.jsx(Kl,{size:8})," 360° BACKGROUND"]})]}),v.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[m?v.jsx(Xi,{size:16,className:"animate-spin"}):v.jsx(zS,{size:16,className:"group-hover/add:scale-125 transition-transform"}),v.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:E=>{r?s(E.target.files):R(!0)},disabled:m})]}),l.length===0&&!m&&v.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[v.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:E=>{r?s(E.target.files):R(!0)}}),v.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",v.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),v.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",v.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),v.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[v.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),v.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),m&&v.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[v.jsxs("span",{className:"relative flex h-3 w-3",children:[v.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),v.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),v.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",l.length," chars... ",v.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),v.jsx("div",{className:"mb-4",children:v.jsx(Zu,{thought:p})}),v.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[v.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),v.jsx("textarea",{value:x,onChange:E=>_(E.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),v.jsx("div",{className:"mt-2 relative z-50",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(x),b(!0),setTimeout(()=>b(!1),2e3)},disabled:!x,className:`w-full ${g?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[g?v.jsx(Vi,{size:20}):v.jsx($l,{size:20}),g?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]})}function qC({step2Ref:r,currentStep:e,isAnalyzing:i,inputMode:s,setInputMode:l,targetDate:c,setTargetDate:f,categories:h,toggleCategory:m,manualTopic:p,setManualTopic:x,bg360Image:_,bg360Enabled:g,setBg360Enabled:b,bg360Analysis:M,is360Analyzing:R,customLocation:E,setCustomLocation:S,customOutfit:N,setCustomOutfit:U,punchlineType:I,setPunchlineType:k,isSearching:L,generateScenarioFromNews:B,scenarioThought:A,scenario:F,setScenario:j,isScenarioCopied:H,setIsScenarioCopied:q,originalScenario:se,isEnhancePanelOpen:ee,setIsEnhancePanelOpen:V,enhanceExpressions:D,setEnhanceExpressions:z,enhanceBodyLang:K,setEnhanceBodyLang:ue,enhanceEffects:ge,setEnhanceEffects:P,enhanceBackgrounds:Z,setEnhanceBackgrounds:_e,enhanceCameraWork:Ae,setEnhanceCameraWork:Ne,enhanceDialogue:te,setEnhanceDialogue:Se,isEnhancing:ye,enhanceScenario:Ge,revertScenario:We,enhanceLog:Qe,showStatus:St}){return v.jsxs("section",{ref:r,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
        ${e===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
        ${e>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(e<2||i)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),v.jsx("div",{className:"flex items-center justify-between",children:v.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${e===2?"text-purple-400":"text-slate-500"} `,children:[v.jsx(DS,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),v.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[v.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[v.jsxs("button",{onClick:()=>l("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[v.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),v.jsxs("button",{onClick:()=>l("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[v.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),s==="news"?v.jsxs("div",{className:"space-y-4",children:[v.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[v.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),v.jsx("input",{type:"date",value:c,onChange:Xe=>f(Xe.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),v.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[v.jsx("div",{className:"col-span-2 lg:col-span-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),h.map(Xe=>v.jsxs("label",{className:`
                    relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5
                    ${Xe.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
                  `,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Xe.checked,onChange:()=>m(Xe.id)}),Xe.checked&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-2 ${Xe.checked?"scale-110":"opacity-70 grayscale"} `,children:Xe.icon}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:Xe.label})]})]},Xe.id))]}),v.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",h.filter(Xe=>Xe.checked).map(Xe=>Xe.keywords).join(" ")||"なし"," (対象日付: ",c,")"]})]}):v.jsxs("div",{className:"space-y-2",children:[v.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",v.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),v.jsx("textarea",{value:p,onChange:Xe=>x(Xe.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),v.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[v.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${_&&g?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[v.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:_&&g?"#67e8f9":"#ffffff"},children:[v.jsx(Kl,{size:14}),_&&g?"🌐 360°背景 (ON)":"指定場所 (Location Override)",v.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[R&&v.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[v.jsx(Xi,{size:10,className:"animate-spin"})," 解析中..."]}),_&&v.jsx("button",{onClick:Xe=>{Xe.preventDefault(),b(!g),St(g?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${g?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:g?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:g?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!_&&v.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),_&&g?v.jsxs("div",{className:"space-y-2",children:[v.jsx(Tb,{imageSrc:_,height:160}),M&&v.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[v.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",M.location]}),v.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",M.lighting]}),v.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:M.spatialType==="indoor"?"🏠 室内":M.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),M.mood&&v.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",M.mood]})]}),v.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):v.jsx("input",{type:"text",value:E,onChange:Xe=>S(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),v.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[v.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[v.jsx(Cv,{size:14})," 指定服装 (Outfit Override) ",v.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),v.jsx("input",{type:"text",value:N,onChange:Xe=>U(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),v.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[v.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[v.jsx("span",{children:"🎬"})," オチ・ディレクター ",v.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),v.jsxs("select",{value:I,onChange:Xe=>k(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[v.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),v.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),v.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),v.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),v.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),v.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),v.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),v.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),v.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),v.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),v.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),v.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),v.jsx("button",{onClick:B,disabled:L||e<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:L?v.jsxs(v.Fragment,{children:[v.jsx(Xi,{size:24,className:"animate-spin"}),v.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):v.jsxs(v.Fragment,{children:[v.jsx($u,{size:24,className:"fill-yellow-400 text-black"}),v.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),v.jsx(Wl,{size:24,className:"opacity-60"})]})})]}),v.jsxs("div",{className:"space-y-4 mt-6",children:[A&&v.jsx("div",{className:"mt-4",children:v.jsx(Zu,{thought:A})}),v.jsxs("div",{className:"flex flex-col gap-2",children:[v.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),v.jsx("textarea",{value:F,onChange:Xe=>j(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),v.jsx("div",{className:"mt-2 relative z-50",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(F),q(!0),setTimeout(()=>q(!1),2e3)},disabled:!F,className:`w-full ${H?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[H?v.jsx(Vi,{size:20}):v.jsx($l,{size:20}),H?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),v.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${F&&F.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[v.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>F&&F.length>20&&V(!ee),children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-base",children:"🔥"}),v.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),v.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),se&&v.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:F&&F.length>20?ee?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),v.jsx(Rv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${ee?"rotate-180":""}`})]})]}),ee&&F&&F.length>20&&v.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[v.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",v.jsx("br",{}),v.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),v.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),v.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${D?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:D,onChange:()=>z(!D)}),D&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${D?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${K?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:K,onChange:()=>ue(!K)}),K&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${K?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ge?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:ge,onChange:()=>P(!ge)}),ge&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${ge?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Z?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Z,onChange:()=>_e(!Z)}),Z&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${Z?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ae?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Ae,onChange:()=>Ne(!Ae)}),Ae&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${Ae?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${te?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:te,onChange:()=>Se(!te)}),te&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(Vi,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${te?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),v.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[D&&"表情",K&&"身体",ge&&"演出",Z&&"背景",Ae&&"カメラ",te&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),v.jsxs("div",{className:"flex gap-2",children:[v.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:Ge,disabled:ye||!(D||K||ge||Z||Ae||te),children:ye?v.jsxs(v.Fragment,{children:[v.jsx(Xi,{size:16,className:"animate-spin"})," 強化中..."]}):v.jsxs(v.Fragment,{children:[v.jsx($u,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),v.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${se?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:We,disabled:ye||!se,children:"↩️ 強化前に戻す"})]}),v.jsx(Zu,{thought:Qe||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})}function $C({step3Ref:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,is360CameraWorking:c,assemblePrompt:f,isAssembling:h}){return v.jsxs("section",{ref:r,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
        ${e===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
        ${e>3?"border border-orange-500/30 opacity-100":""}
      `,children:[(e<3||i||s||l||c)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:c&&e>=3&&v.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[v.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),v.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),v.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),v.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${e===3?"text-orange-400":"text-slate-500"}`,children:[v.jsx(Qh,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),v.jsx("button",{onClick:f,disabled:h||c,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
          ${e===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
        `,children:h?v.jsxs(v.Fragment,{children:[v.jsx(Xi,{size:24,className:"animate-spin"}),v.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):v.jsxs(v.Fragment,{children:[v.jsx(Qh,{size:24,className:`text-blue-600 ${e===3?"animate-bounce":""} `}),v.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),v.jsx(Wl,{size:24,className:"opacity-60"})]})})]})}function KC({outputRef:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,finalPrompt:c,copyPrompt:f,assembleThought:h,enableChatGPTMode:m,selectedEngine:p,bg360Image:x,bg360Analysis:_,bg360Enabled:g,bg360CameraWork:b,bg360CroppedPanels:M,isCopied:R,isMetaSaved:E,setIsMetaSaved:S,castList:N,scenario:U,punchlineType:I,colorMode:k,enhanceExpressions:L,enhanceBodyLang:B,enhanceEffects:A,enhanceBackgrounds:F,enhanceCameraWork:j,enhanceDialogue:H,SYSTEM_VERSION:q,isAssembling:se,regenerateImage:ee,isGeneratingImage:V,isFixPromptCopied:D,setIsFixPromptCopied:z,isPolicyPanelOpen:K,setIsPolicyPanelOpen:ue,isPolicyCopied:ge,setIsPolicyCopied:P,policyErrorMsg:Z,setPolicyErrorMsg:_e,regenerateSafePrompt:Ae,isFixingPolicy:Ne,policyFixLog:te,genLogRef:Se,genLog:ye,imageResultRef:Ge,generatedImage:We,isFullAutoMode:Qe,fullAutoStep:St,mangaTitle:Xe,isFallbackUsed:wt,enableOpenAIApi:Bt,setGeneratedImage:ht,generationHistory:It,setGenerationHistory:Zt}){return v.jsxs("div",{ref:r,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(e<3||i||s||l)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),v.jsxs("section",{className:"relative group h-full",children:[v.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),v.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[v.jsx("div",{className:"flex items-center justify-between mb-4",children:v.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[v.jsx("button",{onClick:f,disabled:!c,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:v.jsx($l,{size:14})}),v.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),v.jsx(Zu,{thought:h,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),v.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[v.jsx("div",{className:"relative flex-1",children:v.jsx("textarea",{value:c,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),v.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[x&&_&&g&&c&&v.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[v.jsx("div",{className:"flex items-start gap-4",children:v.jsxs("div",{className:"flex-1 space-y-1",children:[v.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[v.jsx(Kl,{size:12})," 🌐 360°背景モード (ON)"]}),v.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",v.jsx("br",{}),v.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),v.jsx("br",{}),v.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),v.jsx("br",{}),v.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),v.jsx(Tb,{imageSrc:x,height:120}),v.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),b&&M&&M.length===4&&v.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[v.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),v.jsx("div",{className:"grid grid-cols-4 gap-2",children:b.panels.map((Ze,Y)=>{const ft=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Ze.yaw%360+360)%360/45)%8];return v.jsxs("div",{className:"relative",children:[v.jsx("img",{src:M[Y],alt:`Panel ${Ze.panel} - ${ft}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),v.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[v.jsxs("span",{className:"font-bold",children:["コマ",Ze.panel]})," ",ft," ",v.jsxs("span",{className:"text-slate-400",children:["FOV",Ze.fov,"°"]})]})]},Y)})}),v.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),v.jsxs("button",{onClick:f,disabled:!c,className:`w-full ${R?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[R?v.jsx(Vi,{size:20}):v.jsx($l,{size:20}),R?"コピー完了":p==="openai"?x&&g?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":x&&g?m?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":m?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),v.jsxs("button",{onClick:()=>{const Ze=new Date,Y=p==="openai"?"ChatGPT Engine (自動)":m?"ChatGPT専用プロンプト":"Gemini用プロンプト",Nt={ファイル情報:{フォーマットバージョン:1,アプリバージョン:q,保存日時:Ze.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:Ze.toISOString()},プロンプト判別:{モード:Y,AIエンジン:p==="openai"?"ChatGPT":"Gemini",ChatGPTモード:m,説明:p==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":m?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:N||"(未解析)",シナリオ:U||"(未生成)",最終プロンプト:c||"(未生成)",生成設定:{パンチラインタイプ:I,カラーモード:k,強化オプション:{表情強化:L,ボディランゲージ強化:B,"照明・演出強化":A,背景強化:F,カメラワーク強化:j,"セリフ・ギャグ強化":H},"360度背景":{画像読込:!!x,有効:g,場所:_?.location||"(未解析)",空間タイプ:_?.spatialType||"(未解析)",光源:_?.lighting||"(未解析)"}}},ft=JSON.stringify(Nt,null,2),Vt=new Blob([ft],{type:"application/json;charset=utf-8"}),Ce=URL.createObjectURL(Vt),Qt=document.createElement("a");Qt.href=Ce;const O=U?.match(/タイトル[:：]\s*(.+)/),T=O?O[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",J=`${String(Ze.getFullYear()).slice(-2)}${String(Ze.getMonth()+1).padStart(2,"0")}${String(Ze.getDate()).padStart(2,"0")}${String(Ze.getHours()).padStart(2,"0")}${String(Ze.getMinutes()).padStart(2,"0")}${String(Ze.getSeconds()).padStart(2,"0")}`;Qt.download=`AI_4-koma_metadata_${T}_${J}.json`,document.body.appendChild(Qt),Qt.click(),document.body.removeChild(Qt),URL.revokeObjectURL(Ce),S(!0),setTimeout(()=>S(!1),2500)},disabled:!c,className:`w-full ${E?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${E?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${E?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[E?v.jsx(Vi,{size:16}):v.jsx(Qx,{size:16}),E?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),v.jsxs("div",{className:"relative mt-2",children:[!se&&!c&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),v.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",v.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),v.jsxs("button",{onClick:ee,disabled:!c||V,className:`w-full ${p==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[V?v.jsx(Xi,{size:20,className:"animate-spin"}):v.jsx(Zh,{size:20}),v.jsx("div",{className:"flex flex-col items-center",children:v.jsx("span",{children:V?"再生成中...":`画像を生成する (STEP 4: ${p==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),v.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",v.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",v.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),v.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:v.jsxs("div",{className:"flex items-start gap-2",children:[v.jsx("div",{className:"mt-0.5 text-orange-400",children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("circle",{cx:"12",cy:"12",r:"10"}),v.jsx("path",{d:"M12 16v-4"}),v.jsx("path",{d:"M12 8h.01"})]})}),v.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[v.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),v.jsx("br",{}),p==="openai"?v.jsxs(v.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",v.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",v.jsxs("strong",{children:["「元となるキャラシート画像",x&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",v.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",v.jsx("br",{}),v.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",v.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):v.jsxs(v.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",v.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",v.jsxs("strong",{children:["「元となるキャラシート画像",x&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",v.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),p==="openai"&&v.jsx("div",{className:"mt-3 block w-full",children:v.jsxs("button",{className:`mt-2 ${D?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const Ze=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${q}"
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
No explanations. No partial results.`;navigator.clipboard.writeText(Ze),z(!0),setTimeout(()=>z(!1),2e3)},children:[v.jsx("span",{style:{visibility:D?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),D&&v.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),v.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${c?"":"opacity-40 pointer-events-none"}`,children:[v.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>ue(!K),disabled:!c,children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-base",children:"🛡️"}),v.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!c&&v.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:K?"クリックで閉じる":"クリックで開く"}),v.jsx(Rv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${K?"rotate-180":""}`})]})]}),K&&v.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[v.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[v.jsxs("p",{children:["下の",v.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),v.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",v.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),v.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),v.jsxs("button",{className:`${ge?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),P(!0),setTimeout(()=>P(!1),2e3)},children:[v.jsx("span",{style:{visibility:ge?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),ge&&v.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),v.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Z,onChange:Ze=>_e(Ze.target.value),placeholder:p==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),v.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ae,disabled:Ne||!Z.trim()||!c,children:Ne?v.jsxs(v.Fragment,{children:[v.jsx(Xi,{size:16,className:"animate-spin"})," 分析・修正中..."]}):v.jsxs(v.Fragment,{children:[v.jsx(Qh,{size:16})," 配慮版プロンプトを再生成する"]})}),v.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:te||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),v.jsxs("div",{ref:Se,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[v.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[v.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),v.jsx("span",{className:p==="openai"?"text-emerald-500":"text-blue-500",children:p==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),ye.length===0?v.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):ye.map((Ze,Y)=>v.jsxs("div",{className:"mb-1 leading-relaxed",children:[v.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),Ze]},Y)),V&&v.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),v.jsxs("section",{ref:Ge,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!We&&!V||i||se||l||Qe&&St>0&&St<4)&&!V&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(i||se||l||Qe&&St>0&&St<4)&&v.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[v.jsx(Xi,{size:36,className:"animate-spin text-blue-500"}),v.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:i||se?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),V&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:v.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[v.jsx(Xi,{size:64,className:"animate-spin text-blue-500 mx-auto"}),v.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),v.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[v.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",v.jsxs("span",{className:"flex space-x-1",children:[v.jsx("span",{className:"animate-bounce delay-75",children:"."}),v.jsx("span",{className:"animate-bounce delay-150",children:"."}),v.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),v.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",v.jsx("br",{}),v.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",v.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),v.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:Xe?v.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:Xe}):v.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),v.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:We?v.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[v.jsx("img",{src:We,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),wt&&v.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:v.jsxs("div",{className:"flex items-start gap-3",children:[v.jsx(Nv,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),v.jsxs("div",{className:"text-sm",children:[v.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),v.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",v.jsx("br",{}),v.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),v.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[v.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),v.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[v.jsxs("li",{children:["画面左側の「",v.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),v.jsxs("li",{children:[v.jsx("a",{href:Bt?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:Bt?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),v.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),v.jsxs("div",{className:"w-full px-8 mt-2",children:[v.jsxs("button",{onClick:()=>{const Ze=document.createElement("a");Ze.href=We,Ze.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(Ze),Ze.click(),document.body.removeChild(Ze)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[v.jsx(Qx,{size:20})," 画像をダウンロード (.png)"]}),v.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):v.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[v.jsx(Wp,{size:80,className:"mx-auto"}),v.jsxs("div",{className:"space-y-2 text-center",children:[v.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),v.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),It.length>0&&v.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(i||se||V||l||Qe&&St>0&&St<4)&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:v.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[v.jsx(Xi,{size:12,className:"animate-spin"})," 生成中..."]})}),v.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[v.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[v.jsx(Zh,{size:14,className:"text-blue-400"}),"生成履歴 (",It.length,")"]}),v.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Zt([]),ht(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[v.jsx(Zl,{size:12})," 全削除"]})]}),v.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:It.map(Ze=>v.jsxs("div",{onClick:()=>ht(Ze.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${We===Ze.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[v.jsx("img",{src:Ze.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),We===Ze.img&&v.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:v.jsx(Ar,{size:10,strokeWidth:3})}),v.jsx("div",{onClick:Y=>{Y.stopPropagation(),Zt(Nt=>Nt.filter(ft=>ft.id!==Ze.id)),We===Ze.img&&ht("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:v.jsx(Zl,{size:10})})]},Ze.id))})]})]})}console.log("HELLO_USER_FIXED_VERSION_2_25");function ZC(){console.log("System Version Loaded:",jl);const[r,e]=we.useState(""),[i,s]=we.useState(!1),[l,c]=we.useState("gemini"),[f,h]=we.useState("news"),[m,p]=we.useState(""),[x,_]=we.useState(""),[g,b]=we.useState(""),[M,R]=we.useState(""),[E,S]=we.useState(""),[N,U]=we.useState(""),[I,k]=we.useState("Auto"),[L,B]=we.useState(HE),A=tt=>{B(Tt=>Tt.map(pt=>pt.id===tt?{...pt,checked:!pt.checked}:pt))},F=()=>{const tt=new Date;return tt.setHours(tt.getHours()+9),tt.toISOString().split("T")[0]},[j,H]=we.useState(F()),[q,se]=we.useState(""),[ee,V]=we.useState(""),[D,z]=we.useState(""),[K,ue]=we.useState(""),[ge,P]=we.useState(null),[Z,_e]=we.useState(!1);we.useEffect(()=>{const tt=$p();tt?(Gu(tt),e(tt)):s(!0)},[]);const[Ae,Ne]=we.useState([]),[te,Se]=we.useState(!1),[ye,Ge]=we.useState(!1),[We,Qe]=we.useState(!1),[St,Xe]=we.useState(!1),[wt,Bt]=we.useState(!1),[ht,It]=we.useState(""),[Zt,Ze]=we.useState(""),[Y,Nt]=we.useState(""),[ft,Vt]=we.useState(""),[Ce,Qt]=we.useState("auto"),[O,T]=we.useState(!1),[J,he]=we.useState([]),[Me,Oe]=we.useState(""),[Pe,de]=we.useState(!1),[pe,Le]=we.useState(""),[Be,Ie]=we.useState(!1),[De,ut]=we.useState(!1),[rt,Mt]=we.useState(!1),[X,Re]=we.useState(!1),[me,He]=we.useState(!1),[Ue,Te]=we.useState(!1),[qe,ot]=we.useState(!1),[xn,jt]=we.useState(!1),[$n,ri]=we.useState(!1),[Ia,Qn]=we.useState(""),[tr,nr]=we.useState(!1),[Nn,_n]=we.useState(""),[Tn,Oi]=we.useState(!1),[pn,ma]=we.useState(!1),[gs,Pa]=we.useState(!1),[Fa,Pr]=we.useState(""),[ga,xa]=we.useState(!1),[Ba,_a]=we.useState(!1),[An,Fr]=we.useState(!1),[w,$]=we.useState(!1),[ne,ie]=we.useState(null),[re,ze]=we.useState(null),[ke,Fe]=we.useState(null),[$e,Ye]=we.useState(!1),[it,vt]=we.useState(""),[nt,Xt]=we.useState(!1),[Yt,tn]=we.useState(!1),[Jt,Wt]=we.useState(null),[Ve,Pn]=we.useState(null),[Rt,mn]=we.useState(!1),[En,yn]=we.useState(!1),Jn=we.useRef(!1);we.useEffect(()=>{Jn.current=En},[En]);const[zt,gn]=we.useState(!1),_i=we.useRef(!1),[Gt,Mn]=we.useState(0),[za,xs]=we.useState(0),[Wi,ir]=we.useState(0),pi=we.useRef(!1),[vi,oi]=we.useState(!1),$o=we.useRef(null),Br=we.useRef(null),oc=we.useRef(null),_s=we.useRef(null),bi=we.useRef(null);we.useEffect(()=>{bi.current&&(bi.current.scrollTop=bi.current.scrollHeight)},[J]),We||!q||q.length<20||!ee||ee.length<20;const[Ga,mi]=we.useState(""),[Di,Ha]=we.useState([]),zr=tt=>{const Tt=tt.replace(/[^\u0000-\u007F]/g,"").trim();Tt!==tt&&xt("APIキーに含まれる不要な文字を自動削除しました。"),Tt.startsWith("sk-")?(mh(Tt),gh("openai"),c("openai"),ma(!0),Oi(!0),e("openai-engine-active"),s(!1),xt("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(Gu(Tt),e(Tt),gh("gemini"),c("gemini"),s(!1),xt("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},xt=tt=>{Vt(tt),setTimeout(()=>Vt(""),4e3)},Gr=async tt=>{if(!r){xt("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(tt.length===0)return;Se(!0),It(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let Tt=0;const pt=setInterval(()=>{Tt++,It(ct=>{if(Tt<=10){const Ot=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return ct+Ot[Math.floor(Math.random()*Ot.length)]}const Ee=`
> ⏳ AI応答を待機中... (${Math.floor(Tt*.8)}秒経過)`,Je=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Je.test(ct)?ct.replace(Je,"")+Ee:ct+Ee})},800),mt=[];let gt=null;for(let ct=0;ct<tt.length;ct++){const st=tt[ct],Ee=await new Promise(Ot=>{const Fn=new FileReader;Fn.onload=Li=>{const Xr=Li.target.result,Vn=new Uint8Array(Xr);let yi=!1;const On="equirectangular";let wn=0;for(let rr=0;rr<Math.min(Vn.length,65536);rr++)if(Vn[rr]===On.charCodeAt(wn)){if(wn++,wn===On.length){yi=!0;break}}else wn=0;const Va=new Image;Va.onload=()=>{const rr=Va.naturalWidth/Va.naturalHeight,pf=Math.abs(rr-2)<.15;Ot(pf&&yi)},Va.onerror=()=>Ot(!1),Va.src=URL.createObjectURL(st)};const nn=st.slice(0,65536);Fn.readAsArrayBuffer(nn)}),Je=new FileReader;Je.readAsDataURL(st),await new Promise(Ot=>{Je.onload=()=>{Ee&&!gt?(gt={base64:Je.result,mimeType:st.type},It(Fn=>Fn+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(mt.push(Je.result),Ne(Fn=>[...Fn,Je.result])),Ot()}})}if(gt)try{tn(!0),ie(gt.base64);const ct=gt.base64.split(",")[1],st={inlineData:{mimeType:gt.mimeType,data:ct}};ze(st),Ye(!0),It(Ot=>Ot+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const Ee=await Dr(KE(),[st],null,()=>{}),Je=ZE(Ee.text);Fe(Je),b(Je.location),xt(`🌐 360°背景を検出: ${Je.location}`),It(Ot=>Ot+`
> 🌐 空間解析完了: ${Je.location}`)}catch(ct){console.warn("[360° BG] Analysis failed:",ct),Fe({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像（解析失敗）")}finally{Ye(!1)}if(mt.length===0&&gt){clearInterval(pt),Se(!1),It(ct=>ct+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),xt("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(mt.length===0){clearInterval(pt),Se(!1);return}xt(`思考モード: ${mt.length}枚のキャラクター設定画を同時解析中...${gt?"（+ 360°背景1枚検出済み）":""}`);try{const ct=mt.map(Je=>{const Ot=Je.split(",")[1];return{inlineData:{mimeType:Je.split(";")[0].split(":")[1],data:Ot}}}),st=QE(),Ee=await Dr(st,ct,null,Je=>{It(Ot=>Ot+`
> ${Je}`)});se(Ee.text),P(Ee.model),It(Je=>{const Ot=`

--- ✅ 解析完了 ---
`,Fn=Ee.thought&&Ee.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${Ee.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return Je+Ot+Fn}),xt("全キャラクターの解析が完了しました。"),Jn.current&&(pi.current?(yn(!1),Mn(0),oi(!1),xt("⏹ フルオートを中断しました。")):ir(Je=>Je+1))}catch(ct){console.error(ct);const st=xh(ct.message);It(Ee=>Ee+`

[システムエラー]: ${ct.message}
--------------------------------------------------
${st}`),xt("解析エラー: "+ct.message),Jn.current&&(yn(!1),Mn(0),oi(!1))}finally{clearInterval(pt),Se(!1)}},Hr=async()=>{if(!ee||ee.length<20)return xt("先にシナリオを生成してください。");if(!(De||rt||X||me||Ue||qe||xn))return xt("少なくとも1つの強化カテゴリをONにしてください。");if($n)return;ri(!0),Qn("> [START] シナリオ強化を開始します..."),Nn||(_n(ee),Qn(gt=>gt+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const Tt=[];De&&Tt.push("【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。..."),rt&&Tt.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。"),X&&Tt.push("【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください。"),me&&Tt.push("【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。"),Ue&&Tt.push("【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。"),qe&&Tt.push("【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。"),Qn(gt=>gt+`
> [CONFIG] 強化カテゴリ: ${Tt.length}個`);let pt=0;const mt=setInterval(()=>{pt++,Qn(gt=>{const st=`
> ⏳ AI応答を待機中... (${Math.floor(pt*.8)}秒経過)`,Ee=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Ee.test(gt)?gt.replace(Ee,"")+st:gt+st})},800);try{Qn(ct=>ct+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const gt=await hM({scenario:ee,enhanceCategories:Tt,castList:q,onProgress:ct=>Qn(st=>st+`
> [API] ${ct}`)});gt&&gt.text&&gt.text.length>50?(V(gt.text),Qn(ct=>ct+`
> [SUCCESS] シナリオを強化しました！（${gt.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),ut(!1),Mt(!1),Re(!1),He(!1),Te(!1),ot(!1),jt(!1),xt("シナリオ強化完了！")):(Qn(ct=>ct+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),xt("強化失敗: AIの応答が不十分です"))}catch(gt){Qn(ct=>ct+`
> [ERROR] ${gt.message}`),xt("強化エラー: "+gt.message)}finally{clearInterval(mt),ri(!1)}},lc=()=>{Nn&&(V(Nn),_n(""),Qn(tt=>tt+`
> [REVERT] 元のシナリオに復元しました。`),xt("シナリオを元に戻しました"))},ei=async(tt,Tt=null)=>{if(!q)return xt("先にキャラクターを解析してください。");if(ye)return;const pt=Array.isArray(tt)?tt:L,mt=Tt||f;if(mt==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(mt==="news"&&!pt.find(Ee=>Ee.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}Ge(!0),Ze(""),ue(""),mi(null),Nt(""),he([]),_n(""),Qn("");let gt="";if(mt==="manual")gt="手動入力",V(""),Ze(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const Ee=pt.filter(Je=>Je.checked);Ee.length>0?(gt=Ee.map(Je=>Je.keywords).join(" "),xt(`カテゴリ「${Ee.map(Je=>Je.label).join("・")}」で最新ニュースを検索中... (${j})`),V(""),Ze(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Ee.map(Je=>Je.label).join("、")} (キーワード: ${gt}) 
 > 対象日付: ${j} 
 > Google Grounding で検索中...`)):gt="最新ニュース"}let ct=0;const st=setInterval(()=>{ct++,Ze(Ee=>{if(ct<=8){const nn=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Ee+nn[Math.floor(Math.random()*nn.length)]}const Ot=`
> ⏳ AI応答を待機中... (${Math.floor(ct*.8)}秒経過)`,Fn=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Fn.test(Ee)?Ee.replace(Fn,"")+Ot:Ee+Ot})},800);try{const Ee=await dM({castList:q,categories:pt,inputMode:mt,manualTopic:m,searchTopic:x,targetDate:j,customLocation:g,customOutfit:M,punchlineType:I,bg360Image:ne,bg360Analysis:ke,bg360Enabled:Yt,bg360ImageParts:re,onProgress:Vn=>Ze(yi=>yi+`
 > [API] ${Vn} `),onCameraProgress:Vn=>{Vn.startsWith("🎬")?(Ze(yi=>yi+`
 > ${Vn}`),Vn.includes("開始")?mn(!0):(Vn.includes("完了")||Vn.includes("失敗"))&&mn(!1)):Ze(yi=>yi+`
 > [Camera AI] ${Vn}`)}});if(P(Ee.usedModel),S(g.trim()||Ee.location||"Unspecified"),U(M.trim()||Ee.outfit||""),Ee.cameraWork){Wt(Ee.cameraWork);const Vn=wn=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((wn%360+360)%360/45)%8],yi=wn=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[wn]||wn;let On=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Ee.cameraWork.panels.forEach(wn=>{On+=`
 > 🎬 コマ${wn.panel}: ${Vn(wn.yaw)} (yaw:${wn.yaw}°) / ${yi(wn.camera)} / FOV:${wn.fov}°`,On+=`
 >    └─ ${wn.reasoning}`}),On+=`
 > 🎬 ══════════════════════════════════`,Ze(wn=>wn+On)}Ee.croppedPanels&&(Pn(Ee.croppedPanels),Ze(Vn=>Vn+`
 > 🔲 [Crop] ✅ ${Ee.croppedPanels.length}枚のクロップ画像を生成しました`));const Je=Ee.logline?`
Logline: ${Ee.logline}`:"",Ot=M.trim()||Ee.outfit?`
Outfit: ${M.trim()||Ee.outfit}`:"",Fn=Ee.punchline?`
Punchline: ${Ee.punchline}`:"",nn=ne?Yt?`
🌐 360°背景: ON (${ke?.location||"解析済み"} / ${ke?.spatialType==="indoor"?"室内":ke?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";let Li="";if(Ee.cameraWork){const Vn=On=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((On%360+360)%360/45)%8],yi=On=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[On]||On;Li=`
🎬 360° Camera Work:`,Ee.cameraWork.panels.forEach(On=>{Li+=`
  Panel${On.panel}: ${Vn(On.yaw)}(${On.yaw}°) ${yi(On.camera)} FOV${On.fov}° — ${On.reasoning}`})}const Xr=`## タイトル: ${Ee.topic} !?${Je}
Location: ${Ee.location||"Unspecified"}${Ot}${Fn}${nn}${Li}

${Ee.scenario} `;return V(Xr),xt("シナリオの生成が完了しました！"),mn(!1),Xr}catch(Ee){console.error(Ee);const Je=xh(Ee.message);return Ze(Ot=>Ot+`

[システムエラー]: ${Ee.message}
--------------------------------------------------
${Je}`),xt("シナリオ生成エラー"),mn(!1),null}finally{clearInterval(st),Ge(!1)}},ra=async(tt=!1,Tt=null,pt=null)=>{const mt=Tt||ee;if(!tt&&(!q||!mt))return xt("キャストとシナリオが必要です。");Qe(!0),ue(""),he([]),Oe(""),Le(""),Ie(!1),Nt("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const gt=pt!==null?pt:Tn,ct=setInterval(()=>{Nt(st=>{if(st.length>800)return st;const Ee=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!We)return st;const Je=Ee[Math.floor(Math.random()*Ee.length)];return st+Je})},600);try{const st=fM({scenario:mt,castList:q,colorMode:Ce,enableChatGPTMode:gt,bg360Image:ne,bg360Analysis:ke,bg360Enabled:Yt,bg360CroppedPanels:Ve,punchlineType:I,systemVersion:jl});return await new Promise(Ee=>setTimeout(Ee,800)),I==="Documentary"&&Nt(Ee=>Ee+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`),Nt(Ee=>Ee+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ue(st),Nt(Ee=>Ee+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),xt("最終プロンプトの構築が完了しました。画像生成を開始します..."),st}catch(st){console.error(st);const Ee=xh(st.message);return Nt(Je=>Je+`

[システムエラー]: ${st.message}
--------------------------------------------------
${Ee}`),xt("生成エラー: "+st.message),null}finally{clearInterval(ct),Qe(!1)}};we.useEffect(()=>{K&&!We&&dn>=3&&ra()},[Tn]);const kr=()=>{V(""),ue(""),mi(null),Ze(""),Nt(""),he([]),yn(!1),Mn(0),b(""),R(""),ie(null),ze(null),Fe(null),Wt(null),Pn(null),mn(!1),xt("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},ar=()=>{se(""),V(""),ue(""),Ne([]),mi(null),It(""),Ze(""),Nt(""),yn(!1),Mn(0),b(""),R(""),ie(null),ze(null),Fe(null),Wt(null),Pn(null),mn(!1),P(null),Ha([]),he([]),e(""),Gu(""),mh(""),gh(""),c(""),ma(!1),Oi(!1),s(!0),xt("全データをリセットしました。APIキーを再入力してください。")},[uf,Vr]=we.useState(!1),[Ko,sr]=we.useState(!1),[ka,jr]=we.useState(!1),ff=()=>{K&&(navigator.clipboard.writeText(K),Vr(!0),setTimeout(()=>Vr(!1),2e3),xt("クリップボードにコピーしました！"))},cc=async(tt=!1,Tt=null)=>{const pt=Tt||K;if(St||!tt&&!pt)return!1;Xe(!0),Bt(!1);const mt=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];Tn&&(l==="openai"?mt.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):mt.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),he(mt);let gt=0;const ct=setInterval(()=>{gt++;const st=Math.floor(gt*1.5);he(Ee=>{const Je=Ee.findIndex(Ot=>Ot.startsWith("[WAIT]"));if(Je!==-1){const Ot=[...Ee];return Ot[Je]=`[WAIT] ⏳ 画像生成API応答を待機中... (${st}秒経過)`,Ot}return[...Ee,`[WAIT] ⏳ 画像生成API応答を待機中... (${st}秒経過)`]})},1500);await new Promise(st=>setTimeout(st,800));try{xt(pn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),he(nn=>[...nn,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(nn=>setTimeout(nn,1e3));const st=nn=>{he(Li=>[...Li,nn])};let Ee,Je;if(pn){st("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const nn=await DE(pt,st);Ee=nn.base64Img,Je=nn.usedModel}else{const nn=Ve&&Yt&&Ve.length===4?Ve:[];nn.length>0&&st(`[REF] 360°背景クロップ画像 ${nn.length}枚を参照画像として添付`);const Li=await OE(pt,st,nn);Ee=Li.base64Img,Je=Li.usedModel}he(nn=>[...nn,`[4/5] データストリーム受信完了 (Model: ${Je})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const Ot=`data:image/png;base64,${Ee}`;mi(Ot),Ha(nn=>[{id:Date.now(),img:Ot},...nn]);const Fn=Je&&Je.startsWith("gpt-");return Je&&!Je.startsWith("gemini-3")&&!Fn?(_e(!0),he(nn=>[...nn,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${pn?"ChatGPT":"Gemini"}(Web版)を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${pn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(_e(!1),he(nn=>[...nn,"[COMPLETE] Image successfully generated."])),xt("画像生成完了！"),!0}catch(st){console.error(st),Bt(!0),mi(null);const Ee=st.message||"";let Je=[];return Ee.includes("Unknown parameter")||Ee.includes("invalid")||Ee.includes("Invalid")?Je=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${pn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Ee.includes("sensitive")||Ee.includes("Responsible AI")||Ee.includes("400")&&!Ee.includes("Unknown parameter")?(Oe(Ee),Ie(!0),Je=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):Ee.includes("not found")||Ee.includes("not supported")||Ee.includes("404")||Ee.includes("403")||Ee.includes("401")?Je=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${pn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${pn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Je=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${pn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],he(Ot=>[...Ot,`[ERROR] ${st.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...Je]),xt(`生成エラー: ${st.message} `),!1}finally{clearInterval(ct),Xe(!1)}},df=async()=>{if(!K||!Me.trim())return;de(!0),Le("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let tt=0;const Tt=setInterval(()=>{tt++,Le(pt=>{const gt=`
> ⏳ AI分析中... (${Math.floor(tt*1)}秒経過)`,ct=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return ct.test(pt)?pt.replace(ct,gt):pt+gt})},1e3);try{const pt=await pM({finalPrompt:K,policyErrorMsg:Me,selectedEngine:l,onProgress:mt=>Le(gt=>gt+`
> ${mt}`)});pt.success&&pt.modifiedPrompt&&(ue(pt.modifiedPrompt),pt.method==="replacement"?Le(mt=>mt+`
> [Phase 5/5] ✅ ${pt.appliedCount}箇所を修正しました（${pt.failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`):Le(mt=>mt+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Le(mt=>mt+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),Oe(""))}catch(pt){console.error(pt),Le(mt=>mt+`
> [ERROR] ${pt.message}`)}finally{clearInterval(Tt),de(!1)}};we.useEffect(()=>{Wi>0&&!pi.current&&Zo()},[Wi]);const Zo=async()=>{if(!q||q.length<20){xt("先にキャラクターシートをアップロードしてください。"),yn(!1);return}pi.current=!1,yn(!0),Oi(!1),Mn(2);const tt=[...L].sort(()=>Math.random()-.5),Tt=Math.random()>.5?2:1,pt=tt.slice(0,Tt).map(Ee=>Ee.id),mt=L.map(Ee=>({...Ee,checked:pt.includes(Ee.id)}));B(mt),b(""),R(""),h("news"),await new Promise(Ee=>setTimeout(Ee,200)),$o.current?.scrollIntoView({behavior:"smooth",block:"start"});const gt=await ei(mt,"news");if(pi.current||!gt){yn(!1),Mn(0),oi(!1),pi.current&&xt("⏹ フルオートを中断しました。");return}Mn(3),Br.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(Ee=>setTimeout(Ee,300));const ct=await ra(!0,gt,!1);if(pi.current||!ct){yn(!1),Mn(0),oi(!1),pi.current&&xt("⏹ フルオートを中断しました。");return}Mn(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(Ee=>setTimeout(Ee,300));const st=await cc(!0,ct);await new Promise(Ee=>setTimeout(Ee,800)),_s.current?.scrollIntoView({behavior:"smooth",block:"center"}),_i.current?pi.current?(yn(!1),Mn(0),oi(!1),xt("⏹ 連続生成を中断しました。")):(xt("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{pi.current||ir(Ee=>Ee+1)},2e3)):(yn(!1),Mn(0),oi(!1),st&&xt("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},hf=()=>{if(En){pi.current=!0,Gt>0||te||ye||We||St?(oi(!0),xt("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(yn(!1),Mn(0),oi(!1),xt("フルオートを解除しました。"));return}pi.current=!1,oi(!1),yn(!0),q&&q.length>=20?ir(tt=>tt+1):xt("🚀 フルオート待機中: キャラクターシートをドロップしてください")},dn=!q||q.length<1?1:!ee||ee.length<1?2:K?Ga?5:4:3;return v.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[v.jsx(Av,{isOpen:i,onSave:zr,provider:"google"}),v.jsx(Av,{isOpen:gs,onSave:tt=>{const Tt=tt.trim(),pt=Ku();Tt===""&&pt?(ma(!0),xt("🔑 既存のOpenAI APIキーを適用しました。"),Pa(!1)):Tt.startsWith("sk-")?(mh(Tt),ma(!0),xt("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Pa(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Pa(!1),Ku()||ma(!1)},provider:"openai"}),v.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[v.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[v.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[v.jsxs("div",{className:`flex items-center gap-1.5 ${dn>=1?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${dn===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":dn>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:dn>1?v.jsx(Ar,{size:16}):"1"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),v.jsx(Wl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${dn>=2?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${dn===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":dn>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:dn>2?v.jsx(Ar,{size:16}):"2"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),v.jsx(Wl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${dn>=3?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${dn===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":dn>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:dn>3?v.jsx(Ar,{size:16}):"3"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),v.jsx(Wl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${dn>=4?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${dn===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":dn>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:dn>4?v.jsx(Ar,{size:16}):"4"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),v.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),v.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[v.jsxs("button",{disabled:!r||vi,onClick:()=>{const tt=!zt;gn(tt),_i.current=tt},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:zt?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${zt?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[v.jsx(Jx,{size:14,className:zt?"animate-spin":"",style:{animationDuration:"3s"}}),v.jsx("span",{className:"whitespace-nowrap",children:zt?"無限ループ設定 解除":"無限ループ設定 ON"})]}),v.jsxs("button",{disabled:!r||vi,onClick:hf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:En?vi?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${En?vi?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!vi?"opacity-50 cursor-not-allowed":""}`,children:[En?vi?v.jsx(Xi,{size:14,className:"animate-spin"}):v.jsx(VS,{size:14,fill:"currentColor"}):v.jsx($u,{size:14}),En?vi?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),v.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),v.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[v.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),v.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),v.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(l==="openai"||pn)&&v.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),jr(!0),setTimeout(()=>jr(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${ka?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[v.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[ka?v.jsx(Ar,{size:16}):v.jsx($l,{size:16}),v.jsx("span",{className:"whitespace-nowrap",children:ka?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),v.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),v.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:v.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${dn===1?"w-1/4 bg-blue-500":dn===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":dn===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":dn>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),v.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[v.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),v.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),v.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[v.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[v.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),v.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:v.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:v.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[v.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[v.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:v.jsx(Wp,{size:28,className:"text-white"})}),v.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",v.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",v.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:jl})]})]}),v.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[v.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),v.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?l==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[v.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?l==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?l==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),r&&v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsxs("button",{onClick:kr,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[v.jsx(Jx,{size:12})," シナリオから再生成"]}),v.jsxs("button",{onClick:ar,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[v.jsx(FS,{size:12})," エンジン変更・全リセット"]})]})]}),ge&&(()=>{const tt=kE(ge);return tt?v.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${tt.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:tt.label}),v.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),v.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:tt.desc}),v.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[v.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),v.jsxs("p",{children:["現在 ",v.jsx("span",{className:"font-mono text-blue-300",children:ge})," を使用中。"]}),tt.tier==="Lite"&&v.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[v.jsx(Nv,{size:10,className:"absolute top-2 right-2"}),v.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),v.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[v.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[v.jsx(WC,{isDragging:O,setIsDragging:T,apiKey:r,processFiles:Gr,currentStep:dn,isAnalyzing:te,images:Ae,setImages:Ne,bg360Image:ne,bg360Enabled:Yt,analyzeThought:ht,castList:q,setCastList:se,isCastListCopied:ga,setIsCastListCopied:xa}),v.jsx(qC,{step2Ref:$o,currentStep:dn,isAnalyzing:te,inputMode:f,setInputMode:h,targetDate:j,setTargetDate:H,categories:L,toggleCategory:A,manualTopic:m,setManualTopic:p,bg360Image:ne,bg360Enabled:Yt,setBg360Enabled:tn,bg360Analysis:ke,is360Analyzing:$e,customLocation:g,setCustomLocation:b,customOutfit:M,setCustomOutfit:R,punchlineType:I,setPunchlineType:k,isSearching:ye,generateScenarioFromNews:ei,scenarioThought:Zt,scenario:ee,setScenario:V,isScenarioCopied:Ba,setIsScenarioCopied:_a,originalScenario:Nn,isEnhancePanelOpen:tr,setIsEnhancePanelOpen:nr,enhanceExpressions:De,setEnhanceExpressions:ut,enhanceBodyLang:rt,setEnhanceBodyLang:Mt,enhanceEffects:X,setEnhanceEffects:Re,enhanceBackgrounds:me,setEnhanceBackgrounds:He,enhanceCameraWork:Ue,setEnhanceCameraWork:Te,enhanceDialogue:qe,setEnhanceDialogue:ot,isEnhancing:$n,enhanceScenario:Hr,revertScenario:lc,enhanceLog:Ia,showStatus:xt})]}),v.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${ee?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[v.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[v.jsx(Cv,{size:14})," ",ne?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),v.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",v.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",v.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",v.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const tt=ee?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",Tt=ee?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",pt=ee?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",mt=!!ne&&!!ke&&Yt,gt=mt?"背景 (Background)":"場所 (Location)",ct=mt?tt||ke?.location||"360°画像":tt||g.trim()||"AIおまかせ",st=mt?"画像解析":g.trim()?"手入力":"AIおまかせ",Ee=mt?"#67e8f9":g.trim()?"#ffffff":"#93c5fd",Je=mt?"rgba(6,182,212,0.3)":g.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",Ot=mt?"#67e8f9":g.trim()?"#d1d5db":"#93c5fd",Fn=mt?"rgba(6,182,212,0.4)":g.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return v.jsxs(v.Fragment,{children:[v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[mt?v.jsx(Kl,{size:12,className:"text-cyan-400"}):v.jsx(Kl,{size:12,className:"text-blue-400"}),v.jsxs("span",{children:[gt,":"]}),v.jsx("span",{style:{fontWeight:"bold",color:Ee},children:ct}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:Je,color:Ot,border:`1px solid ${Fn}`},children:st})]}),v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[v.jsx("span",{className:"text-green-400",children:"👕"}),v.jsx("span",{children:"服装 (Outfit):"}),v.jsx("span",{style:{fontWeight:"bold",color:M.trim()?"#ffffff":"#93c5fd"},children:Tt||M.trim()||"AIおまかせ"}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:M.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:M.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${M.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:M.trim()?"手入力":"AIおまかせ"})]}),v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[v.jsx("span",{className:"text-yellow-400",children:"🎬"}),v.jsx("span",{children:"オチ (Punchline):"}),v.jsx("span",{style:{fontWeight:"bold",color:pt||I!=="Auto"?"#ffffff":"#93c5fd"},children:pt||(I==="Auto"?"AIおまかせ":Gv(I))}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:I!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:I!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${I!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:I!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),v.jsx($C,{step3Ref:Br,currentStep:dn,isSearching:ye,isAnalyzing:te,isEnhancing:$n,is360CameraWorking:Rt,assemblePrompt:ra,isAssembling:We}),v.jsx(KC,{outputRef:oc,currentStep:dn,isSearching:ye,isAnalyzing:te,isEnhancing:$n,finalPrompt:K,copyPrompt:ff,assembleThought:Y,enableChatGPTMode:Tn,selectedEngine:l,bg360Image:ne,bg360Analysis:ke,bg360Enabled:Yt,bg360CameraWork:Jt,bg360CroppedPanels:Ve,isCopied:uf,isMetaSaved:An,setIsMetaSaved:Fr,castList:q,scenario:ee,punchlineType:I,colorMode:Ce,enhanceExpressions:De,enhanceBodyLang:rt,enhanceEffects:X,enhanceBackgrounds:me,enhanceCameraWork:Ue,enhanceDialogue:qe,SYSTEM_VERSION:jl,isAssembling:We,regenerateImage:cc,isGeneratingImage:St,isFixPromptCopied:Ko,setIsFixPromptCopied:sr,isPolicyPanelOpen:Be,setIsPolicyPanelOpen:Ie,isPolicyCopied:ka,setIsPolicyCopied:jr,policyErrorMsg:Me,setPolicyErrorMsg:Oe,regenerateSafePrompt:df,isFixingPolicy:Pe,policyFixLog:pe,genLogRef:bi,genLog:J,imageResultRef:_s,generatedImage:Ga,isFullAutoMode:En,fullAutoStep:Gt,mangaTitle:D,isFallbackUsed:Z,enableOpenAIApi:pn,setGeneratedImage:mi,generationHistory:Di,setGenerationHistory:Ha}),Di.length>0&&v.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(ye||We||St||$n||En&&Gt>0&&Gt<4)&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:v.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[v.jsx(Xi,{size:12,className:"animate-spin"})," 生成中..."]})}),v.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[v.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[v.jsx(Zh,{size:14,className:"text-blue-400"}),"生成履歴 (",Di.length,")"]}),v.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Ha([]),mi(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[v.jsx(Zl,{size:12})," 全削除"]})]}),v.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:Di.map(tt=>v.jsxs("div",{onClick:()=>mi(tt.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${Ga===tt.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[v.jsx("img",{src:tt.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),Ga===tt.img&&v.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:v.jsx(Ar,{size:10,strokeWidth:3})}),v.jsx("div",{onClick:Tt=>{Tt.stopPropagation(),Ha(pt=>pt.filter(mt=>mt.id!==tt.id)),Ga===tt.img&&mi("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:v.jsx(Zl,{size:10})})]},tt.id))})]})]}),v.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",v.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),ft&&v.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[v.jsx(Vi,{size:18,className:"text-green-600"})," ",ft]}),v.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function QC(){return v.jsx(Ab,{children:v.jsx(ZC,{})})}gS.createRoot(document.getElementById("root")).render(v.jsx(we.StrictMode,{children:v.jsx(Ab,{children:v.jsx(QC,{})})}));
