(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function rE(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ch={exports:{}},Ll={};var kx;function oE(){if(kx)return Ll;kx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Ll.Fragment=e,Ll.jsx=i,Ll.jsxs=i,Ll}var Vx;function lE(){return Vx||(Vx=1,ch.exports=oE()),ch.exports}var v=lE(),uh={exports:{}},gt={};var jx;function cE(){if(jx)return gt;jx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),g=Symbol.iterator;function b(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,S={};function E(P,Z,_e){this.props=P,this.context=Z,this.refs=S,this.updater=_e||M}E.prototype.isReactComponent={},E.prototype.setState=function(P,Z){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Z,"setState")},E.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=E.prototype;function I(P,Z,_e){this.props=P,this.context=Z,this.refs=S,this.updater=_e||M}var U=I.prototype=new N;U.constructor=I,R(U,E.prototype),U.isPureReactComponent=!0;var k=Array.isArray;function L(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,Z,_e){var Ae=_e.ref;return{$$typeof:r,type:P,key:Z,ref:Ae!==void 0?Ae:null,props:_e}}function j(P,Z){return F(P.type,Z,P.props)}function G(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function q(P){var Z={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(_e){return Z[_e]})}var ie=/\/+/g;function ee(P,Z){return typeof P=="object"&&P!==null&&P.key!=null?q(""+P.key):Z.toString(36)}function V(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(Z){P.status==="pending"&&(P.status="fulfilled",P.value=Z)},function(Z){P.status==="pending"&&(P.status="rejected",P.reason=Z)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function D(P,Z,_e,Ae,Oe){var te=typeof P;(te==="undefined"||te==="boolean")&&(P=null);var be=!1;if(P===null)be=!0;else switch(te){case"bigint":case"string":case"number":be=!0;break;case"object":switch(P.$$typeof){case r:case e:be=!0;break;case _:return be=P._init,D(be(P._payload),Z,_e,Ae,Oe)}}if(be)return Oe=Oe(P),be=Ae===""?"."+ee(P,0):Ae,k(Oe)?(_e="",be!=null&&(_e=be.replace(ie,"$&/")+"/"),D(Oe,Z,_e,"",function(qe){return qe})):Oe!=null&&(G(Oe)&&(Oe=j(Oe,_e+(Oe.key==null||P&&P.key===Oe.key?"":(""+Oe.key).replace(ie,"$&/")+"/")+be)),Z.push(Oe)),1;be=0;var Ee=Ae===""?".":Ae+":";if(k(P))for(var He=0;He<P.length;He++)Ae=P[He],te=Ee+ee(Ae,He),be+=D(Ae,Z,_e,te,Oe);else if(He=b(P),typeof He=="function")for(P=He.call(P),He=0;!(Ae=P.next()).done;)Ae=Ae.value,te=Ee+ee(Ae,He++),be+=D(Ae,Z,_e,te,Oe);else if(te==="object"){if(typeof P.then=="function")return D(V(P),Z,_e,Ae,Oe);throw Z=String(P),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return be}function z(P,Z,_e){if(P==null)return P;var Ae=[],Oe=0;return D(P,Ae,"","",function(te){return Z.call(_e,te,Oe++)}),Ae}function K(P){if(P._status===-1){var Z=P._result;Z=Z(),Z.then(function(_e){(P._status===0||P._status===-1)&&(P._status=1,P._result=_e)},function(_e){(P._status===0||P._status===-1)&&(P._status=2,P._result=_e)}),P._status===-1&&(P._status=0,P._result=Z)}if(P._status===1)return P._result.default;throw P._result}var ue=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},ge={map:z,forEach:function(P,Z,_e){z(P,function(){Z.apply(this,arguments)},_e)},count:function(P){var Z=0;return z(P,function(){Z++}),Z},toArray:function(P){return z(P,function(Z){return Z})||[]},only:function(P){if(!G(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return gt.Activity=x,gt.Children=ge,gt.Component=E,gt.Fragment=i,gt.Profiler=l,gt.PureComponent=I,gt.StrictMode=s,gt.Suspense=m,gt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,gt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},gt.cache=function(P){return function(){return P.apply(null,arguments)}},gt.cacheSignal=function(){return null},gt.cloneElement=function(P,Z,_e){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ae=R({},P.props),Oe=P.key;if(Z!=null)for(te in Z.key!==void 0&&(Oe=""+Z.key),Z)!A.call(Z,te)||te==="key"||te==="__self"||te==="__source"||te==="ref"&&Z.ref===void 0||(Ae[te]=Z[te]);var te=arguments.length-2;if(te===1)Ae.children=_e;else if(1<te){for(var be=Array(te),Ee=0;Ee<te;Ee++)be[Ee]=arguments[Ee+2];Ae.children=be}return F(P.type,Oe,Ae)},gt.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},gt.createElement=function(P,Z,_e){var Ae,Oe={},te=null;if(Z!=null)for(Ae in Z.key!==void 0&&(te=""+Z.key),Z)A.call(Z,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Oe[Ae]=Z[Ae]);var be=arguments.length-2;if(be===1)Oe.children=_e;else if(1<be){for(var Ee=Array(be),He=0;He<be;He++)Ee[He]=arguments[He+2];Oe.children=Ee}if(P&&P.defaultProps)for(Ae in be=P.defaultProps,be)Oe[Ae]===void 0&&(Oe[Ae]=be[Ae]);return F(P,te,Oe)},gt.createRef=function(){return{current:null}},gt.forwardRef=function(P){return{$$typeof:h,render:P}},gt.isValidElement=G,gt.lazy=function(P){return{$$typeof:_,_payload:{_status:-1,_result:P},_init:K}},gt.memo=function(P,Z){return{$$typeof:p,type:P,compare:Z===void 0?null:Z}},gt.startTransition=function(P){var Z=B.T,_e={};B.T=_e;try{var Ae=P(),Oe=B.S;Oe!==null&&Oe(_e,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(L,ue)}catch(te){ue(te)}finally{Z!==null&&_e.types!==null&&(Z.types=_e.types),B.T=Z}},gt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},gt.use=function(P){return B.H.use(P)},gt.useActionState=function(P,Z,_e){return B.H.useActionState(P,Z,_e)},gt.useCallback=function(P,Z){return B.H.useCallback(P,Z)},gt.useContext=function(P){return B.H.useContext(P)},gt.useDebugValue=function(){},gt.useDeferredValue=function(P,Z){return B.H.useDeferredValue(P,Z)},gt.useEffect=function(P,Z){return B.H.useEffect(P,Z)},gt.useEffectEvent=function(P){return B.H.useEffectEvent(P)},gt.useId=function(){return B.H.useId()},gt.useImperativeHandle=function(P,Z,_e){return B.H.useImperativeHandle(P,Z,_e)},gt.useInsertionEffect=function(P,Z){return B.H.useInsertionEffect(P,Z)},gt.useLayoutEffect=function(P,Z){return B.H.useLayoutEffect(P,Z)},gt.useMemo=function(P,Z){return B.H.useMemo(P,Z)},gt.useOptimistic=function(P,Z){return B.H.useOptimistic(P,Z)},gt.useReducer=function(P,Z,_e){return B.H.useReducer(P,Z,_e)},gt.useRef=function(P){return B.H.useRef(P)},gt.useState=function(P){return B.H.useState(P)},gt.useSyncExternalStore=function(P,Z,_e){return B.H.useSyncExternalStore(P,Z,_e)},gt.useTransition=function(){return B.H.useTransition()},gt.version="19.2.3",gt}var Xx;function Wp(){return Xx||(Xx=1,uh.exports=cE()),uh.exports}var we=Wp();const uE=rE(we);var fh={exports:{}},Il={},dh={exports:{}},hh={};var Yx;function fE(){return Yx||(Yx=1,(function(r){function e(D,z){var K=D.length;D.push(z);e:for(;0<K;){var ue=K-1>>>1,ge=D[ue];if(0<l(ge,z))D[ue]=z,D[K]=ge,K=ue;else break e}}function i(D){return D.length===0?null:D[0]}function s(D){if(D.length===0)return null;var z=D[0],K=D.pop();if(K!==z){D[0]=K;e:for(var ue=0,ge=D.length,P=ge>>>1;ue<P;){var Z=2*(ue+1)-1,_e=D[Z],Ae=Z+1,Oe=D[Ae];if(0>l(_e,K))Ae<ge&&0>l(Oe,_e)?(D[ue]=Oe,D[Ae]=K,ue=Ae):(D[ue]=_e,D[Z]=K,ue=Z);else if(Ae<ge&&0>l(Oe,K))D[ue]=Oe,D[Ae]=K,ue=Ae;else break e}}return z}function l(D,z){var K=D.sortIndex-z.sortIndex;return K!==0?K:D.id-z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],_=1,x=null,g=3,b=!1,M=!1,R=!1,S=!1,E=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function U(D){for(var z=i(p);z!==null;){if(z.callback===null)s(p);else if(z.startTime<=D)s(p),z.sortIndex=z.expirationTime,e(m,z);else break;z=i(p)}}function k(D){if(R=!1,U(D),!M)if(i(m)!==null)M=!0,L||(L=!0,q());else{var z=i(p);z!==null&&V(k,z.startTime-D)}}var L=!1,B=-1,A=5,F=-1;function j(){return S?!0:!(r.unstable_now()-F<A)}function G(){if(S=!1,L){var D=r.unstable_now();F=D;var z=!0;try{e:{M=!1,R&&(R=!1,N(B),B=-1),b=!0;var K=g;try{t:{for(U(D),x=i(m);x!==null&&!(x.expirationTime>D&&j());){var ue=x.callback;if(typeof ue=="function"){x.callback=null,g=x.priorityLevel;var ge=ue(x.expirationTime<=D);if(D=r.unstable_now(),typeof ge=="function"){x.callback=ge,U(D),z=!0;break t}x===i(m)&&s(m),U(D)}else s(m);x=i(m)}if(x!==null)z=!0;else{var P=i(p);P!==null&&V(k,P.startTime-D),z=!1}}break e}finally{x=null,g=K,b=!1}z=void 0}}finally{z?q():L=!1}}}var q;if(typeof I=="function")q=function(){I(G)};else if(typeof MessageChannel<"u"){var ie=new MessageChannel,ee=ie.port2;ie.port1.onmessage=G,q=function(){ee.postMessage(null)}}else q=function(){E(G,0)};function V(D,z){B=E(function(){D(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(D){D.callback=null},r.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<D?Math.floor(1e3/D):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(D){switch(g){case 1:case 2:case 3:var z=3;break;default:z=g}var K=g;g=z;try{return D()}finally{g=K}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(D,z){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var K=g;g=D;try{return z()}finally{g=K}},r.unstable_scheduleCallback=function(D,z,K){var ue=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ue+K:ue):K=ue,D){case 1:var ge=-1;break;case 2:ge=250;break;case 5:ge=1073741823;break;case 4:ge=1e4;break;default:ge=5e3}return ge=K+ge,D={id:_++,callback:z,priorityLevel:D,startTime:K,expirationTime:ge,sortIndex:-1},K>ue?(D.sortIndex=K,e(p,D),i(m)===null&&D===i(p)&&(R?(N(B),B=-1):R=!0,V(k,K-ue))):(D.sortIndex=ge,e(m,D),M||b||(M=!0,L||(L=!0,q()))),D},r.unstable_shouldYield=j,r.unstable_wrapCallback=function(D){var z=g;return function(){var K=g;g=z;try{return D.apply(this,arguments)}finally{g=K}}}})(hh)),hh}var Wx;function dE(){return Wx||(Wx=1,dh.exports=fE()),dh.exports}var ph={exports:{}},li={};var qx;function hE(){if(qx)return li;qx=1;var r=Wp();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return li.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,li.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,_)},li.flushSync=function(m){var p=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=_,s.d.f()}},li.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},li.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},li.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,x=h(_,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,b=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:g,fetchPriority:b}):_==="script"&&s.d.X(m,{crossOrigin:x,integrity:g,fetchPriority:b,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},li.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},li.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,x=h(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},li.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},li.requestFormReset=function(m){s.d.r(m)},li.unstable_batchedUpdates=function(m,p){return m(p)},li.useFormState=function(m,p,_){return f.H.useFormState(m,p,_)},li.useFormStatus=function(){return f.H.useHostTransitionStatus()},li.version="19.2.3",li}var $x;function pE(){if($x)return ph.exports;$x=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),ph.exports=hE(),ph.exports}var Kx;function mE(){if(Kx)return Il;Kx=1;var r=dE(),e=Wp(),i=pE();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var y=!1,C=u.child;C;){if(C===a){y=!0,a=u,o=d;break}if(C===o){y=!0,o=u,a=d;break}C=C.sibling}if(!y){for(C=d.child;C;){if(C===a){y=!0,a=d,o=u;break}if(C===o){y=!0,o=d,a=u;break}C=C.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var x=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),I=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),j=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function q(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var ie=Symbol.for("react.client.reference");function ee(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ie?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case R:return"Fragment";case E:return"Profiler";case S:return"StrictMode";case k:return"Suspense";case L:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case I:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case U:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:ee(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return ee(t(n))}catch{}}return null}var V=Array.isArray,D=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},ue=[],ge=-1;function P(t){return{current:t}}function Z(t){0>ge||(t.current=ue[ge],ue[ge]=null,ge--)}function _e(t,n){ge++,ue[ge]=t.current,t.current=n}var Ae=P(null),Oe=P(null),te=P(null),be=P(null);function Ee(t,n){switch(_e(te,n),_e(Oe,t),_e(Ae,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?fx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=fx(n),t=dx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Z(Ae),_e(Ae,t)}function He(){Z(Ae),Z(Oe),Z(te)}function qe(t){t.memoizedState!==null&&_e(be,t);var n=Ae.current,a=dx(n,t.type);n!==a&&(_e(Oe,t),_e(Ae,a))}function Qe(t){Oe.current===t&&(Z(Ae),Z(Oe)),be.current===t&&(Z(be),Cl._currentValue=K)}var vt,Xe;function pt(t){if(vt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);vt=n&&n[1]||"",Xe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+vt+t+Xe}var Nt=!1;function ct(t,n){if(!t||Nt)return"";Nt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ye=function(){throw Error()};if(Object.defineProperty(ye.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ye,[])}catch(de){var ce=de}Reflect.construct(t,[],ye)}else{try{ye.call()}catch(de){ce=de}t.call(ye.prototype)}}else{try{throw Error()}catch(de){ce=de}(ye=t())&&typeof ye.catch=="function"&&ye.catch(function(){})}}catch(de){if(de&&ce&&typeof de.stack=="string")return[de.stack,ce.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],C=d[1];if(y&&C){var H=y.split(`
`),le=C.split(`
`);for(u=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;u<le.length&&!le[u].includes("DetermineComponentFrameRoot");)u++;if(o===H.length||u===le.length)for(o=H.length-1,u=le.length-1;1<=o&&0<=u&&H[o]!==le[u];)u--;for(;1<=o&&0<=u;o--,u--)if(H[o]!==le[u]){if(o!==1||u!==1)do if(o--,u--,0>u||H[o]!==le[u]){var xe=`
`+H[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=u);break}}}finally{Nt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?pt(a):""}function Rt(t,n){switch(t.tag){case 26:case 27:case 5:return pt(t.type);case 16:return pt("Lazy");case 13:return t.child!==n&&n!==null?pt("Suspense Fallback"):pt("Suspense");case 19:return pt("SuspenseList");case 0:case 15:return ct(t.type,!1);case 11:return ct(t.type.render,!1);case 1:return ct(t.type,!0);case 31:return pt("Activity");default:return""}}function zt(t){try{var n="",a=null;do n+=Rt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var $e=Object.prototype.hasOwnProperty,Y=r.unstable_scheduleCallback,Et=r.unstable_cancelCallback,ut=r.unstable_shouldYield,Gt=r.unstable_requestPaint,Re=r.unstable_now,Vt=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,J=r.unstable_NormalPriority,he=r.unstable_LowPriority,Me=r.unstable_IdlePriority,Ne=r.log,Pe=r.unstable_setDisableYieldValue,fe=null,me=null;function De(t){if(typeof Ne=="function"&&Pe(t),me&&typeof me.setStrictMode=="function")try{me.setStrictMode(fe,t)}catch{}}var Be=Math.clz32?Math.clz32:it,Le=Math.log,Ie=Math.LN2;function it(t){return t>>>=0,t===0?32:31-(Le(t)/Ie|0)|0}var rt=256,mt=262144,X=4194304;function Ce(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function pe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var C=o&134217727;return C!==0?(o=C&~d,o!==0?u=Ce(o):(y&=C,y!==0?u=Ce(y):a||(a=C&~t,a!==0&&(u=Ce(a))))):(C=o&~d,C!==0?u=Ce(C):y!==0?u=Ce(y):a||(a=o&~t,a!==0&&(u=Ce(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function ze(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ue(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Se(){var t=X;return X<<=1,(X&62914560)===0&&(X=4194304),t}function We(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function at(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function hn(t,n,a,o,u,d){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,H=t.expirationTimes,le=t.hiddenUpdates;for(a=y&~a;0<a;){var xe=31-Be(a),ye=1<<xe;C[xe]=0,H[xe]=-1;var ce=le[xe];if(ce!==null)for(le[xe]=null,xe=0;xe<ce.length;xe++){var de=ce[xe];de!==null&&(de.lane&=-536870913)}a&=~ye}o!==0&&Ct(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(y&~n))}function Ct(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Be(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function qn(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Be(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Un(t,n){var a=n&-n;return a=(a&42)!==0?1:ra(a),(a&(t.suspendedLanes|n))!==0?0:a}function ra(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Cn(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function za(){var t=z.p;return t!==0?t:(t=window.event,t===void 0?32:Ux(t.type))}function oa(t,n){var a=z.p;try{return z.p=t,n()}finally{z.p=a}}var Mn=Math.random().toString(36).slice(2),nn="__reactFiber$"+Mn,yn="__reactProps$"+Mn,ri="__reactContainer$"+Mn,pn="__reactEvents$"+Mn,ba="__reactListeners$"+Mn,ya="__reactHandles$"+Mn,Ga="__reactResources$"+Mn,la="__reactMarker$"+Mn;function ms(t){delete t[nn],delete t[yn],delete t[pn],delete t[ba],delete t[ya]}function xi(t){var n=t[nn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[ri]||a[nn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=vx(t);t!==null;){if(a=t[nn])return a;t=vx(t)}return n}t=a,a=t.parentNode}return null}function Oi(t){if(t=t[nn]||t[ri]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function ca(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function _i(t){var n=t[Ga];return n||(n=t[Ga]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function mn(t){t[la]=!0}var ua=new Set,w={};function $(t,n){re(t,n),re(t+"Capture",n)}function re(t,n){for(w[t]=n,t=0;t<n.length;t++)ua.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ae={},Ge={};function ke(t){return $e.call(Ge,t)?!0:$e.call(ae,t)?!1:ne.test(t)?Ge[t]=!0:(ae[t]=!0,!1)}function Fe(t,n,a){if(ke(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ke(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ye(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function nt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function xt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function tt(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,d.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function jt(t){if(!t._valueTracker){var n=xt(t)?"checked":"value";t._valueTracker=tt(t,n,""+t[n])}}function tn(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=xt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function qt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Qt=/[\n"\\]/g;function Xt(t){return t.replace(Qt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ve(t,n,a,o,u,d,y,C){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+nt(n)):t.value!==""+nt(n)&&(t.value=""+nt(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?At(t,y,nt(n)):a!=null?At(t,y,nt(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+nt(C):t.removeAttribute("name")}function Pn(t,n,a,o,u,d,y,C){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){jt(t);return}a=a!=null?""+nt(a):"",n=n!=null?""+nt(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=C?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),jt(t)}function At(t,n,a){n==="number"&&qt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function xn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+nt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function $n(t,n,a){if(n!=null&&(n=""+nt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+nt(a):""}function En(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(V(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=nt(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),jt(t)}function Jn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Jt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _n(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Jt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function vi(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&_n(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&_n(t,d,n[d])}function Yt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Tn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ha=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function gs(t){return Ha.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Yi(){}var tr=null;function pi(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xs=null,oi=null;function Wo(t){var n=Oi(t);if(n&&(t=n.stateNode)){var a=t[yn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Ve(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Xt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[yn]||null;if(!u)throw Error(s(90));Ve(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&tn(o)}break e;case"textarea":$n(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&xn(t,!!a.multiple,n,!1)}}}var Ur=!1;function sc(t,n,a){if(Ur)return t(n,a);Ur=!0;try{var o=t(n);return o}finally{if(Ur=!1,(xs!==null||oi!==null)&&(Xc(),xs&&(n=xs,t=oi,oi=xs=null,Wo(n),t)))for(n=0;n<t.length;n++)Wo(t[n])}}function _s(t,n){var a=t.stateNode;if(a===null)return null;var o=a[yn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var bi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Pr=!1;if(bi)try{var Wi={};Object.defineProperty(Wi,"passive",{get:function(){Pr=!0}}),window.addEventListener("test",Wi,Wi),window.removeEventListener("test",Wi,Wi)}catch{Pr=!1}var Ea=null,nr=null,Fr=null;function bt(){if(Fr)return Fr;var t,n=nr,a=n.length,o,u="value"in Ea?Ea.value:Ea.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===u[d-o];o++);return Fr=u.slice(t,1<o?1-o:void 0)}function Br(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function zr(){return!0}function rc(){return!1}function ei(t){function n(a,o,u,d,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(d):d[C]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?zr:rc,this.isPropagationStopped=rc,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=zr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=zr)},persist:function(){},isPersistent:zr}),n}var fa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gr=ei(fa),ir=x({},fa,{view:0,detail:0}),uf=ei(ir),Hr,qo,ar,kr=x({},ir,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:et,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ar&&(ar&&t.type==="mousemove"?(Hr=t.screenX-ar.screenX,qo=t.screenY-ar.screenY):qo=Hr=0,ar=t),Hr)},movementY:function(t){return"movementY"in t?t.movementY:qo}}),oc=ei(kr),ff=x({},kr,{dataTransfer:0}),lc=ei(ff),df=x({},ir,{relatedTarget:0}),$o=ei(df),hf=x({},fa,{animationName:0,elapsedTime:0,pseudoElement:0}),cc=ei(hf),Ot=x({},fa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),$t=ei(Ot),Mt=x({},fa,{data:0}),Ut=ei(Mt),ht={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ft={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ot={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Te(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=ot[t])?!!n[t]:!1}function et(){return Te}var Pt=x({},ir,{key:function(t){if(t.key){var n=ht[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Br(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ft[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:et,charCode:function(t){return t.type==="keypress"?Br(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Br(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Kn=ei(Pt),an=x({},kr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Di=ei(an),Vr=x({},ir,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:et}),kn=ei(Vr),yi=x({},fa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Nn=ei(yi),An=x({},kr,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ka=ei(An),sr=x({},fa,{newState:0,oldState:0}),pf=ei(sr),Rb=[9,13,27,32],mf=bi&&"CompositionEvent"in window,Ko=null;bi&&"documentMode"in document&&(Ko=document.documentMode);var Cb=bi&&"TextEvent"in window&&!Ko,xm=bi&&(!mf||Ko&&8<Ko&&11>=Ko),_m=" ",vm=!1;function bm(t,n){switch(t){case"keyup":return Rb.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ym(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var jr=!1;function Nb(t,n){switch(t){case"compositionend":return ym(n);case"keypress":return n.which!==32?null:(vm=!0,_m);case"textInput":return t=n.data,t===_m&&vm?null:t;default:return null}}function Ob(t,n){if(jr)return t==="compositionend"||!mf&&bm(t,n)?(t=bt(),Fr=nr=Ea=null,jr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return xm&&n.locale!=="ko"?null:n.data;default:return null}}var Db={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Em(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Db[t.type]:n==="textarea"}function Sm(t,n,a,o){xs?oi?oi.push(o):oi=[o]:xs=o,n=Qc(n,"onChange"),0<n.length&&(a=new Gr("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Zo=null,Qo=null;function Lb(t){sx(t,0)}function uc(t){var n=ca(t);if(tn(n))return t}function Mm(t,n){if(t==="change")return n}var Tm=!1;if(bi){var gf;if(bi){var xf="oninput"in document;if(!xf){var Am=document.createElement("div");Am.setAttribute("oninput","return;"),xf=typeof Am.oninput=="function"}gf=xf}else gf=!1;Tm=gf&&(!document.documentMode||9<document.documentMode)}function wm(){Zo&&(Zo.detachEvent("onpropertychange",Rm),Qo=Zo=null)}function Rm(t){if(t.propertyName==="value"&&uc(Qo)){var n=[];Sm(n,Qo,t,pi(t)),sc(Lb,n)}}function Ib(t,n,a){t==="focusin"?(wm(),Zo=n,Qo=a,Zo.attachEvent("onpropertychange",Rm)):t==="focusout"&&wm()}function Ub(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uc(Qo)}function Pb(t,n){if(t==="click")return uc(n)}function Fb(t,n){if(t==="input"||t==="change")return uc(n)}function Bb(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Li=typeof Object.is=="function"?Object.is:Bb;function Jo(t,n){if(Li(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!$e.call(n,u)||!Li(t[u],n[u]))return!1}return!0}function Cm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Nm(t,n){var a=Cm(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Cm(a)}}function Om(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Om(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Dm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=qt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=qt(t.document)}return n}function _f(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var zb=bi&&"documentMode"in document&&11>=document.documentMode,Xr=null,vf=null,el=null,bf=!1;function Lm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;bf||Xr==null||Xr!==qt(o)||(o=Xr,"selectionStart"in o&&_f(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),el&&Jo(el,o)||(el=o,o=Qc(vf,"onSelect"),0<o.length&&(n=new Gr("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Xr)))}function rr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Yr={animationend:rr("Animation","AnimationEnd"),animationiteration:rr("Animation","AnimationIteration"),animationstart:rr("Animation","AnimationStart"),transitionrun:rr("Transition","TransitionRun"),transitionstart:rr("Transition","TransitionStart"),transitioncancel:rr("Transition","TransitionCancel"),transitionend:rr("Transition","TransitionEnd")},yf={},Im={};bi&&(Im=document.createElement("div").style,"AnimationEvent"in window||(delete Yr.animationend.animation,delete Yr.animationiteration.animation,delete Yr.animationstart.animation),"TransitionEvent"in window||delete Yr.transitionend.transition);function or(t){if(yf[t])return yf[t];if(!Yr[t])return t;var n=Yr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Im)return yf[t]=n[a];return t}var Um=or("animationend"),Pm=or("animationiteration"),Fm=or("animationstart"),Gb=or("transitionrun"),Hb=or("transitionstart"),kb=or("transitioncancel"),Bm=or("transitionend"),zm=new Map,Ef="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ef.push("scrollEnd");function da(t,n){zm.set(t,n),$(n,[t])}var fc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},qi=[],Wr=0,Sf=0;function dc(){for(var t=Wr,n=Sf=Wr=0;n<t;){var a=qi[n];qi[n++]=null;var o=qi[n];qi[n++]=null;var u=qi[n];qi[n++]=null;var d=qi[n];if(qi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&Gm(a,u,d)}}function hc(t,n,a,o){qi[Wr++]=t,qi[Wr++]=n,qi[Wr++]=a,qi[Wr++]=o,Sf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Mf(t,n,a,o){return hc(t,n,a,o),pc(t)}function lr(t,n){return hc(t,null,null,n),pc(t)}function Gm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-Be(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function pc(t){if(50<El)throw El=0,Ld=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var qr={};function Vb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ii(t,n,a,o){return new Vb(t,n,a,o)}function Tf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Va(t,n){var a=t.alternate;return a===null?(a=Ii(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Hm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function mc(t,n,a,o,u,d){var y=0;if(o=t,typeof t=="function")Tf(t)&&(y=1);else if(typeof t=="string")y=qy(t,a,Ae.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=Ii(31,a,n,u),t.elementType=F,t.lanes=d,t;case R:return cr(a.children,u,d,n);case S:y=8,u|=24;break;case E:return t=Ii(12,a,n,u|2),t.elementType=E,t.lanes=d,t;case k:return t=Ii(13,a,n,u),t.elementType=k,t.lanes=d,t;case L:return t=Ii(19,a,n,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case I:y=10;break e;case N:y=9;break e;case U:y=11;break e;case B:y=14;break e;case A:y=16,o=null;break e}y=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Ii(y,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function cr(t,n,a,o){return t=Ii(7,t,o,n),t.lanes=a,t}function Af(t,n,a){return t=Ii(6,t,null,n),t.lanes=a,t}function km(t){var n=Ii(18,null,null,0);return n.stateNode=t,n}function wf(t,n,a){return n=Ii(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Vm=new WeakMap;function $i(t,n){if(typeof t=="object"&&t!==null){var a=Vm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:zt(n)},Vm.set(t,n),n)}return{value:t,source:n,stack:zt(n)}}var $r=[],Kr=0,gc=null,tl=0,Ki=[],Zi=0,vs=null,Sa=1,Ma="";function ja(t,n){$r[Kr++]=tl,$r[Kr++]=gc,gc=t,tl=n}function jm(t,n,a){Ki[Zi++]=Sa,Ki[Zi++]=Ma,Ki[Zi++]=vs,vs=t;var o=Sa;t=Ma;var u=32-Be(o)-1;o&=~(1<<u),a+=1;var d=32-Be(n)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Sa=1<<32-Be(n)+u|a<<u|o,Ma=d+t}else Sa=1<<d|a<<u|o,Ma=t}function Rf(t){t.return!==null&&(ja(t,1),jm(t,1,0))}function Cf(t){for(;t===gc;)gc=$r[--Kr],$r[Kr]=null,tl=$r[--Kr],$r[Kr]=null;for(;t===vs;)vs=Ki[--Zi],Ki[Zi]=null,Ma=Ki[--Zi],Ki[Zi]=null,Sa=Ki[--Zi],Ki[Zi]=null}function Xm(t,n){Ki[Zi++]=Sa,Ki[Zi++]=Ma,Ki[Zi++]=vs,Sa=n.id,Ma=n.overflow,vs=t}var ti=null,vn=null,Ht=!1,bs=null,Qi=!1,Nf=Error(s(519));function ys(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw nl($i(n,t)),Nf}function Ym(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[nn]=t,n[yn]=o,a){case"dialog":Lt("cancel",n),Lt("close",n);break;case"iframe":case"object":case"embed":Lt("load",n);break;case"video":case"audio":for(a=0;a<Ml.length;a++)Lt(Ml[a],n);break;case"source":Lt("error",n);break;case"img":case"image":case"link":Lt("error",n),Lt("load",n);break;case"details":Lt("toggle",n);break;case"input":Lt("invalid",n),Pn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Lt("invalid",n);break;case"textarea":Lt("invalid",n),En(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||cx(n.textContent,a)?(o.popover!=null&&(Lt("beforetoggle",n),Lt("toggle",n)),o.onScroll!=null&&Lt("scroll",n),o.onScrollEnd!=null&&Lt("scrollend",n),o.onClick!=null&&(n.onclick=Yi),n=!0):n=!1,n||ys(t,!0)}function Wm(t){for(ti=t.return;ti;)switch(ti.tag){case 5:case 31:case 13:Qi=!1;return;case 27:case 3:Qi=!0;return;default:ti=ti.return}}function Zr(t){if(t!==ti)return!1;if(!Ht)return Wm(t),Ht=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||qd(t.type,t.memoizedProps)),a=!a),a&&vn&&ys(t),Wm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=_x(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=_x(t)}else n===27?(n=vn,Us(t.type)?(t=Jd,Jd=null,vn=t):vn=n):vn=ti?ea(t.stateNode.nextSibling):null;return!0}function ur(){vn=ti=null,Ht=!1}function Of(){var t=bs;return t!==null&&(Ti===null?Ti=t:Ti.push.apply(Ti,t),bs=null),t}function nl(t){bs===null?bs=[t]:bs.push(t)}var Df=P(null),fr=null,Xa=null;function Es(t,n,a){_e(Df,n._currentValue),n._currentValue=a}function Ya(t){t._currentValue=Df.current,Z(Df)}function Lf(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function If(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;e:for(;d!==null;){var C=d;d=u;for(var H=0;H<n.length;H++)if(C.context===n[H]){d.lanes|=a,C=d.alternate,C!==null&&(C.lanes|=a),Lf(d.return,a,t),o||(y=null);break e}d=C.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,d=y.alternate,d!==null&&(d.lanes|=a),Lf(y,a,t),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===t){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function Qr(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var C=u.type;Li(u.pendingProps.value,y.value)||(t!==null?t.push(C):t=[C])}}else if(u===be.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Cl):t=[Cl])}u=u.return}t!==null&&If(n,t,a,o),n.flags|=262144}function xc(t){for(t=t.firstContext;t!==null;){if(!Li(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function dr(t){fr=t,Xa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ni(t){return qm(fr,t)}function _c(t,n){return fr===null&&dr(t),qm(t,n)}function qm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Xa===null){if(t===null)throw Error(s(308));Xa=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Xa=Xa.next=n;return a}var jb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Xb=r.unstable_scheduleCallback,Yb=r.unstable_NormalPriority,Fn={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Uf(){return{controller:new jb,data:new Map,refCount:0}}function il(t){t.refCount--,t.refCount===0&&Xb(Yb,function(){t.controller.abort()})}var al=null,Pf=0,Jr=0,eo=null;function Wb(t,n){if(al===null){var a=al=[];Pf=0,Jr=zd(),eo={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Pf++,n.then($m,$m),n}function $m(){if(--Pf===0&&al!==null){eo!==null&&(eo.status="fulfilled");var t=al;al=null,Jr=0,eo=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function qb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Km=D.S;D.S=function(t,n){L0=Re(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Wb(t,n),Km!==null&&Km(t,n)};var hr=P(null);function Ff(){var t=hr.current;return t!==null?t:gn.pooledCache}function vc(t,n){n===null?_e(hr,hr.current):_e(hr,n.pool)}function Zm(){var t=Ff();return t===null?null:{parent:Fn._currentValue,pool:t}}var to=Error(s(460)),Bf=Error(s(474)),bc=Error(s(542)),yc={then:function(){}};function Qm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Jm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Yi,Yi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,tg(t),t;default:if(typeof n.status=="string")n.then(Yi,Yi);else{if(t=gn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,tg(t),t}throw mr=n,to}}function pr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(mr=a,to):a}}var mr=null;function eg(){if(mr===null)throw Error(s(459));var t=mr;return mr=null,t}function tg(t){if(t===to||t===bc)throw Error(s(483))}var no=null,sl=0;function Ec(t){var n=sl;return sl+=1,no===null&&(no=[]),Jm(no,t,n)}function rl(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Sc(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function ng(t){function n(Q,W){if(t){var oe=Q.deletions;oe===null?(Q.deletions=[W],Q.flags|=16):oe.push(W)}}function a(Q,W){if(!t)return null;for(;W!==null;)n(Q,W),W=W.sibling;return null}function o(Q){for(var W=new Map;Q!==null;)Q.key!==null?W.set(Q.key,Q):W.set(Q.index,Q),Q=Q.sibling;return W}function u(Q,W){return Q=Va(Q,W),Q.index=0,Q.sibling=null,Q}function d(Q,W,oe){return Q.index=oe,t?(oe=Q.alternate,oe!==null?(oe=oe.index,oe<W?(Q.flags|=67108866,W):oe):(Q.flags|=67108866,W)):(Q.flags|=1048576,W)}function y(Q){return t&&Q.alternate===null&&(Q.flags|=67108866),Q}function C(Q,W,oe,ve){return W===null||W.tag!==6?(W=Af(oe,Q.mode,ve),W.return=Q,W):(W=u(W,oe),W.return=Q,W)}function H(Q,W,oe,ve){var st=oe.type;return st===R?xe(Q,W,oe.props.children,ve,oe.key):W!==null&&(W.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===A&&pr(st)===W.type)?(W=u(W,oe.props),rl(W,oe),W.return=Q,W):(W=mc(oe.type,oe.key,oe.props,null,Q.mode,ve),rl(W,oe),W.return=Q,W)}function le(Q,W,oe,ve){return W===null||W.tag!==4||W.stateNode.containerInfo!==oe.containerInfo||W.stateNode.implementation!==oe.implementation?(W=wf(oe,Q.mode,ve),W.return=Q,W):(W=u(W,oe.children||[]),W.return=Q,W)}function xe(Q,W,oe,ve,st){return W===null||W.tag!==7?(W=cr(oe,Q.mode,ve,st),W.return=Q,W):(W=u(W,oe),W.return=Q,W)}function ye(Q,W,oe){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=Af(""+W,Q.mode,oe),W.return=Q,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case b:return oe=mc(W.type,W.key,W.props,null,Q.mode,oe),rl(oe,W),oe.return=Q,oe;case M:return W=wf(W,Q.mode,oe),W.return=Q,W;case A:return W=pr(W),ye(Q,W,oe)}if(V(W)||q(W))return W=cr(W,Q.mode,oe,null),W.return=Q,W;if(typeof W.then=="function")return ye(Q,Ec(W),oe);if(W.$$typeof===I)return ye(Q,_c(Q,W),oe);Sc(Q,W)}return null}function ce(Q,W,oe,ve){var st=W!==null?W.key:null;if(typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint")return st!==null?null:C(Q,W,""+oe,ve);if(typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case b:return oe.key===st?H(Q,W,oe,ve):null;case M:return oe.key===st?le(Q,W,oe,ve):null;case A:return oe=pr(oe),ce(Q,W,oe,ve)}if(V(oe)||q(oe))return st!==null?null:xe(Q,W,oe,ve,null);if(typeof oe.then=="function")return ce(Q,W,Ec(oe),ve);if(oe.$$typeof===I)return ce(Q,W,_c(Q,oe),ve);Sc(Q,oe)}return null}function de(Q,W,oe,ve,st){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return Q=Q.get(oe)||null,C(W,Q,""+ve,st);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case b:return Q=Q.get(ve.key===null?oe:ve.key)||null,H(W,Q,ve,st);case M:return Q=Q.get(ve.key===null?oe:ve.key)||null,le(W,Q,ve,st);case A:return ve=pr(ve),de(Q,W,oe,ve,st)}if(V(ve)||q(ve))return Q=Q.get(oe)||null,xe(W,Q,ve,st,null);if(typeof ve.then=="function")return de(Q,W,oe,Ec(ve),st);if(ve.$$typeof===I)return de(Q,W,oe,_c(W,ve),st);Sc(W,ve)}return null}function Ze(Q,W,oe,ve){for(var st=null,Kt=null,Je=W,St=W=0,Bt=null;Je!==null&&St<oe.length;St++){Je.index>St?(Bt=Je,Je=null):Bt=Je.sibling;var Zt=ce(Q,Je,oe[St],ve);if(Zt===null){Je===null&&(Je=Bt);break}t&&Je&&Zt.alternate===null&&n(Q,Je),W=d(Zt,W,St),Kt===null?st=Zt:Kt.sibling=Zt,Kt=Zt,Je=Bt}if(St===oe.length)return a(Q,Je),Ht&&ja(Q,St),st;if(Je===null){for(;St<oe.length;St++)Je=ye(Q,oe[St],ve),Je!==null&&(W=d(Je,W,St),Kt===null?st=Je:Kt.sibling=Je,Kt=Je);return Ht&&ja(Q,St),st}for(Je=o(Je);St<oe.length;St++)Bt=de(Je,Q,St,oe[St],ve),Bt!==null&&(t&&Bt.alternate!==null&&Je.delete(Bt.key===null?St:Bt.key),W=d(Bt,W,St),Kt===null?st=Bt:Kt.sibling=Bt,Kt=Bt);return t&&Je.forEach(function(Gs){return n(Q,Gs)}),Ht&&ja(Q,St),st}function lt(Q,W,oe,ve){if(oe==null)throw Error(s(151));for(var st=null,Kt=null,Je=W,St=W=0,Bt=null,Zt=oe.next();Je!==null&&!Zt.done;St++,Zt=oe.next()){Je.index>St?(Bt=Je,Je=null):Bt=Je.sibling;var Gs=ce(Q,Je,Zt.value,ve);if(Gs===null){Je===null&&(Je=Bt);break}t&&Je&&Gs.alternate===null&&n(Q,Je),W=d(Gs,W,St),Kt===null?st=Gs:Kt.sibling=Gs,Kt=Gs,Je=Bt}if(Zt.done)return a(Q,Je),Ht&&ja(Q,St),st;if(Je===null){for(;!Zt.done;St++,Zt=oe.next())Zt=ye(Q,Zt.value,ve),Zt!==null&&(W=d(Zt,W,St),Kt===null?st=Zt:Kt.sibling=Zt,Kt=Zt);return Ht&&ja(Q,St),st}for(Je=o(Je);!Zt.done;St++,Zt=oe.next())Zt=de(Je,Q,St,Zt.value,ve),Zt!==null&&(t&&Zt.alternate!==null&&Je.delete(Zt.key===null?St:Zt.key),W=d(Zt,W,St),Kt===null?st=Zt:Kt.sibling=Zt,Kt=Zt);return t&&Je.forEach(function(sE){return n(Q,sE)}),Ht&&ja(Q,St),st}function un(Q,W,oe,ve){if(typeof oe=="object"&&oe!==null&&oe.type===R&&oe.key===null&&(oe=oe.props.children),typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case b:e:{for(var st=oe.key;W!==null;){if(W.key===st){if(st=oe.type,st===R){if(W.tag===7){a(Q,W.sibling),ve=u(W,oe.props.children),ve.return=Q,Q=ve;break e}}else if(W.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===A&&pr(st)===W.type){a(Q,W.sibling),ve=u(W,oe.props),rl(ve,oe),ve.return=Q,Q=ve;break e}a(Q,W);break}else n(Q,W);W=W.sibling}oe.type===R?(ve=cr(oe.props.children,Q.mode,ve,oe.key),ve.return=Q,Q=ve):(ve=mc(oe.type,oe.key,oe.props,null,Q.mode,ve),rl(ve,oe),ve.return=Q,Q=ve)}return y(Q);case M:e:{for(st=oe.key;W!==null;){if(W.key===st)if(W.tag===4&&W.stateNode.containerInfo===oe.containerInfo&&W.stateNode.implementation===oe.implementation){a(Q,W.sibling),ve=u(W,oe.children||[]),ve.return=Q,Q=ve;break e}else{a(Q,W);break}else n(Q,W);W=W.sibling}ve=wf(oe,Q.mode,ve),ve.return=Q,Q=ve}return y(Q);case A:return oe=pr(oe),un(Q,W,oe,ve)}if(V(oe))return Ze(Q,W,oe,ve);if(q(oe)){if(st=q(oe),typeof st!="function")throw Error(s(150));return oe=st.call(oe),lt(Q,W,oe,ve)}if(typeof oe.then=="function")return un(Q,W,Ec(oe),ve);if(oe.$$typeof===I)return un(Q,W,_c(Q,oe),ve);Sc(Q,oe)}return typeof oe=="string"&&oe!==""||typeof oe=="number"||typeof oe=="bigint"?(oe=""+oe,W!==null&&W.tag===6?(a(Q,W.sibling),ve=u(W,oe),ve.return=Q,Q=ve):(a(Q,W),ve=Af(oe,Q.mode,ve),ve.return=Q,Q=ve),y(Q)):a(Q,W)}return function(Q,W,oe,ve){try{sl=0;var st=un(Q,W,oe,ve);return no=null,st}catch(Je){if(Je===to||Je===bc)throw Je;var Kt=Ii(29,Je,null,Q.mode);return Kt.lanes=ve,Kt.return=Q,Kt}}}var gr=ng(!0),ig=ng(!1),Ss=!1;function zf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Gf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ms(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ts(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(en&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=pc(t),Gm(t,null,a),n}return hc(t,o,n,a),pc(t)}function ol(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,qn(t,a)}}function Hf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var kf=!1;function ll(){if(kf){var t=eo;if(t!==null)throw t}}function cl(t,n,a,o){kf=!1;var u=t.updateQueue;Ss=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,C=u.shared.pending;if(C!==null){u.shared.pending=null;var H=C,le=H.next;H.next=null,y===null?d=le:y.next=le,y=H;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,C=xe.lastBaseUpdate,C!==y&&(C===null?xe.firstBaseUpdate=le:C.next=le,xe.lastBaseUpdate=H))}if(d!==null){var ye=u.baseState;y=0,xe=le=H=null,C=d;do{var ce=C.lane&-536870913,de=ce!==C.lane;if(de?(Ft&ce)===ce:(o&ce)===ce){ce!==0&&ce===Jr&&(kf=!0),xe!==null&&(xe=xe.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});e:{var Ze=t,lt=C;ce=n;var un=a;switch(lt.tag){case 1:if(Ze=lt.payload,typeof Ze=="function"){ye=Ze.call(un,ye,ce);break e}ye=Ze;break e;case 3:Ze.flags=Ze.flags&-65537|128;case 0:if(Ze=lt.payload,ce=typeof Ze=="function"?Ze.call(un,ye,ce):Ze,ce==null)break e;ye=x({},ye,ce);break e;case 2:Ss=!0}}ce=C.callback,ce!==null&&(t.flags|=64,de&&(t.flags|=8192),de=u.callbacks,de===null?u.callbacks=[ce]:de.push(ce))}else de={lane:ce,tag:C.tag,payload:C.payload,callback:C.callback,next:null},xe===null?(le=xe=de,H=ye):xe=xe.next=de,y|=ce;if(C=C.next,C===null){if(C=u.shared.pending,C===null)break;de=C,C=de.next,de.next=null,u.lastBaseUpdate=de,u.shared.pending=null}}while(!0);xe===null&&(H=ye),u.baseState=H,u.firstBaseUpdate=le,u.lastBaseUpdate=xe,d===null&&(u.shared.lanes=0),Ns|=y,t.lanes=y,t.memoizedState=ye}}function ag(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function sg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ag(a[t],n)}var io=P(null),Mc=P(0);function rg(t,n){t=ts,_e(Mc,t),_e(io,n),ts=t|n.baseLanes}function Vf(){_e(Mc,ts),_e(io,io.current)}function jf(){ts=Mc.current,Z(io),Z(Mc)}var Ui=P(null),Ji=null;function As(t){var n=t.alternate;_e(On,On.current&1),_e(Ui,t),Ji===null&&(n===null||io.current!==null||n.memoizedState!==null)&&(Ji=t)}function Xf(t){_e(On,On.current),_e(Ui,t),Ji===null&&(Ji=t)}function og(t){t.tag===22?(_e(On,On.current),_e(Ui,t),Ji===null&&(Ji=t)):ws()}function ws(){_e(On,On.current),_e(Ui,Ui.current)}function Pi(t){Z(Ui),Ji===t&&(Ji=null),Z(On)}var On=P(0);function Tc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Zd(a)||Qd(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Wa=0,yt=null,ln=null,Bn=null,Ac=!1,ao=!1,xr=!1,wc=0,ul=0,so=null,$b=0;function wn(){throw Error(s(321))}function Yf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Li(t[a],n[a]))return!1;return!0}function Wf(t,n,a,o,u,d){return Wa=d,yt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,D.H=t===null||t.memoizedState===null?jg:ld,xr=!1,d=a(o,u),xr=!1,ao&&(d=cg(n,a,o,u)),lg(t),d}function lg(t){D.H=hl;var n=ln!==null&&ln.next!==null;if(Wa=0,Bn=ln=yt=null,Ac=!1,ul=0,so=null,n)throw Error(s(300));t===null||zn||(t=t.dependencies,t!==null&&xc(t)&&(zn=!0))}function cg(t,n,a,o){yt=t;var u=0;do{if(ao&&(so=null),ul=0,ao=!1,25<=u)throw Error(s(301));if(u+=1,Bn=ln=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}D.H=Xg,d=n(a,o)}while(ao);return d}function Kb(){var t=D.H,n=t.useState()[0];return n=typeof n.then=="function"?fl(n):n,t=t.useState()[0],(ln!==null?ln.memoizedState:null)!==t&&(yt.flags|=1024),n}function qf(){var t=wc!==0;return wc=0,t}function $f(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Kf(t){if(Ac){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Ac=!1}Wa=0,Bn=ln=yt=null,ao=!1,ul=wc=0,so=null}function mi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bn===null?yt.memoizedState=Bn=t:Bn=Bn.next=t,Bn}function Dn(){if(ln===null){var t=yt.alternate;t=t!==null?t.memoizedState:null}else t=ln.next;var n=Bn===null?yt.memoizedState:Bn.next;if(n!==null)Bn=n,ln=t;else{if(t===null)throw yt.alternate===null?Error(s(467)):Error(s(310));ln=t,t={memoizedState:ln.memoizedState,baseState:ln.baseState,baseQueue:ln.baseQueue,queue:ln.queue,next:null},Bn===null?yt.memoizedState=Bn=t:Bn=Bn.next=t}return Bn}function Rc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function fl(t){var n=ul;return ul+=1,so===null&&(so=[]),t=Jm(so,t,n),n=yt,(Bn===null?n.memoizedState:Bn.next)===null&&(n=n.alternate,D.H=n===null||n.memoizedState===null?jg:ld),t}function Cc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return fl(t);if(t.$$typeof===I)return ni(t)}throw Error(s(438,String(t)))}function Zf(t){var n=null,a=yt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=yt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Rc(),yt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=j;return n.index++,a}function qa(t,n){return typeof n=="function"?n(t):n}function Nc(t){var n=Dn();return Qf(n,ln,t)}function Qf(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var C=y=null,H=null,le=n,xe=!1;do{var ye=le.lane&-536870913;if(ye!==le.lane?(Ft&ye)===ye:(Wa&ye)===ye){var ce=le.revertLane;if(ce===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),ye===Jr&&(xe=!0);else if((Wa&ce)===ce){le=le.next,ce===Jr&&(xe=!0);continue}else ye={lane:0,revertLane:le.revertLane,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},H===null?(C=H=ye,y=d):H=H.next=ye,yt.lanes|=ce,Ns|=ce;ye=le.action,xr&&a(d,ye),d=le.hasEagerState?le.eagerState:a(d,ye)}else ce={lane:ye,revertLane:le.revertLane,gesture:le.gesture,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},H===null?(C=H=ce,y=d):H=H.next=ce,yt.lanes|=ye,Ns|=ye;le=le.next}while(le!==null&&le!==n);if(H===null?y=d:H.next=C,!Li(d,t.memoizedState)&&(zn=!0,xe&&(a=eo,a!==null)))throw a;t.memoizedState=d,t.baseState=y,t.baseQueue=H,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Jf(t){var n=Dn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do d=t(d,y.action),y=y.next;while(y!==u);Li(d,n.memoizedState)||(zn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function ug(t,n,a){var o=yt,u=Dn(),d=Ht;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!Li((ln||u).memoizedState,a);if(y&&(u.memoizedState=a,zn=!0),u=u.queue,nd(hg.bind(null,o,u,t),[t]),u.getSnapshot!==n||y||Bn!==null&&Bn.memoizedState.tag&1){if(o.flags|=2048,ro(9,{destroy:void 0},dg.bind(null,o,u,a,n),null),gn===null)throw Error(s(349));d||(Wa&127)!==0||fg(o,n,a)}return a}function fg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=yt.updateQueue,n===null?(n=Rc(),yt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function dg(t,n,a,o){n.value=a,n.getSnapshot=o,pg(n)&&mg(t)}function hg(t,n,a){return a(function(){pg(n)&&mg(t)})}function pg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Li(t,a)}catch{return!0}}function mg(t){var n=lr(t,2);n!==null&&Ai(n,t,2)}function ed(t){var n=mi();if(typeof t=="function"){var a=t;if(t=a(),xr){De(!0);try{a()}finally{De(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qa,lastRenderedState:t},n}function gg(t,n,a,o){return t.baseState=a,Qf(t,ln,typeof o=="function"?o:qa)}function Zb(t,n,a,o,u){if(Lc(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};D.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,xg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function xg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=D.T,y={};D.T=y;try{var C=a(u,o),H=D.S;H!==null&&H(y,C),_g(t,n,C)}catch(le){td(t,n,le)}finally{d!==null&&y.types!==null&&(d.types=y.types),D.T=d}}else try{d=a(u,o),_g(t,n,d)}catch(le){td(t,n,le)}}function _g(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){vg(t,n,o)},function(o){return td(t,n,o)}):vg(t,n,a)}function vg(t,n,a){n.status="fulfilled",n.value=a,bg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,xg(t,a)))}function td(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,bg(n),n=n.next;while(n!==o)}t.action=null}function bg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function yg(t,n){return n}function Eg(t,n){if(Ht){var a=gn.formState;if(a!==null){e:{var o=yt;if(Ht){if(vn){t:{for(var u=vn,d=Qi;u.nodeType!==8;){if(!d){u=null;break t}if(u=ea(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){vn=ea(u.nextSibling),o=u.data==="F!";break e}}ys(o)}o=!1}o&&(n=a[0])}}return a=mi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yg,lastRenderedState:n},a.queue=o,a=Hg.bind(null,yt,o),o.dispatch=a,o=ed(!1),d=od.bind(null,yt,!1,o.queue),o=mi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Zb.bind(null,yt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Sg(t){var n=Dn();return Mg(n,ln,t)}function Mg(t,n,a){if(n=Qf(t,n,yg)[0],t=Nc(qa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=fl(n)}catch(y){throw y===to?bc:y}else o=n;n=Dn();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(yt.flags|=2048,ro(9,{destroy:void 0},Qb.bind(null,u,a),null)),[o,d,t]}function Qb(t,n){t.action=n}function Tg(t){var n=Dn(),a=ln;if(a!==null)return Mg(n,a,t);Dn(),n=n.memoizedState,a=Dn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ro(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=yt.updateQueue,n===null&&(n=Rc(),yt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Ag(){return Dn().memoizedState}function Oc(t,n,a,o){var u=mi();yt.flags|=t,u.memoizedState=ro(1|n,{destroy:void 0},a,o===void 0?null:o)}function Dc(t,n,a,o){var u=Dn();o=o===void 0?null:o;var d=u.memoizedState.inst;ln!==null&&o!==null&&Yf(o,ln.memoizedState.deps)?u.memoizedState=ro(n,d,a,o):(yt.flags|=t,u.memoizedState=ro(1|n,d,a,o))}function wg(t,n){Oc(8390656,8,t,n)}function nd(t,n){Dc(2048,8,t,n)}function Jb(t){yt.flags|=4;var n=yt.updateQueue;if(n===null)n=Rc(),yt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Rg(t){var n=Dn().memoizedState;return Jb({ref:n,nextImpl:t}),function(){if((en&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Cg(t,n){return Dc(4,2,t,n)}function Ng(t,n){return Dc(4,4,t,n)}function Og(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Dg(t,n,a){a=a!=null?a.concat([t]):null,Dc(4,4,Og.bind(null,n,t),a)}function id(){}function Lg(t,n){var a=Dn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Yf(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Ig(t,n){var a=Dn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Yf(n,o[1]))return o[0];if(o=t(),xr){De(!0);try{t()}finally{De(!1)}}return a.memoizedState=[o,n],o}function ad(t,n,a){return a===void 0||(Wa&1073741824)!==0&&(Ft&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=U0(),yt.lanes|=t,Ns|=t,a)}function Ug(t,n,a,o){return Li(a,n)?a:io.current!==null?(t=ad(t,a,o),Li(t,n)||(zn=!0),t):(Wa&42)===0||(Wa&1073741824)!==0&&(Ft&261930)===0?(zn=!0,t.memoizedState=a):(t=U0(),yt.lanes|=t,Ns|=t,n)}function Pg(t,n,a,o,u){var d=z.p;z.p=d!==0&&8>d?d:8;var y=D.T,C={};D.T=C,od(t,!1,n,a);try{var H=u(),le=D.S;if(le!==null&&le(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var xe=qb(H,o);dl(t,n,xe,zi(t))}else dl(t,n,o,zi(t))}catch(ye){dl(t,n,{then:function(){},status:"rejected",reason:ye},zi())}finally{z.p=d,y!==null&&C.types!==null&&(y.types=C.types),D.T=y}}function ey(){}function sd(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=Fg(t).queue;Pg(t,u,n,K,a===null?ey:function(){return Bg(t),a(o)})}function Fg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:qa,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:qa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Bg(t){var n=Fg(t);n.next===null&&(n=t.alternate.memoizedState),dl(t,n.next.queue,{},zi())}function rd(){return ni(Cl)}function zg(){return Dn().memoizedState}function Gg(){return Dn().memoizedState}function ty(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=zi();t=Ms(a);var o=Ts(n,t,a);o!==null&&(Ai(o,n,a),ol(o,n,a)),n={cache:Uf()},t.payload=n;return}n=n.return}}function ny(t,n,a){var o=zi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Lc(t)?kg(n,a):(a=Mf(t,n,a,o),a!==null&&(Ai(a,t,o),Vg(a,n,o)))}function Hg(t,n,a){var o=zi();dl(t,n,a,o)}function dl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Lc(t))kg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var y=n.lastRenderedState,C=d(y,a);if(u.hasEagerState=!0,u.eagerState=C,Li(C,y))return hc(t,n,u,0),gn===null&&dc(),!1}catch{}if(a=Mf(t,n,u,o),a!==null)return Ai(a,t,o),Vg(a,n,o),!0}return!1}function od(t,n,a,o){if(o={lane:2,revertLane:zd(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Lc(t)){if(n)throw Error(s(479))}else n=Mf(t,a,o,2),n!==null&&Ai(n,t,2)}function Lc(t){var n=t.alternate;return t===yt||n!==null&&n===yt}function kg(t,n){ao=Ac=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Vg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,qn(t,a)}}var hl={readContext:ni,use:Cc,useCallback:wn,useContext:wn,useEffect:wn,useImperativeHandle:wn,useLayoutEffect:wn,useInsertionEffect:wn,useMemo:wn,useReducer:wn,useRef:wn,useState:wn,useDebugValue:wn,useDeferredValue:wn,useTransition:wn,useSyncExternalStore:wn,useId:wn,useHostTransitionStatus:wn,useFormState:wn,useActionState:wn,useOptimistic:wn,useMemoCache:wn,useCacheRefresh:wn};hl.useEffectEvent=wn;var jg={readContext:ni,use:Cc,useCallback:function(t,n){return mi().memoizedState=[t,n===void 0?null:n],t},useContext:ni,useEffect:wg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Oc(4194308,4,Og.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Oc(4194308,4,t,n)},useInsertionEffect:function(t,n){Oc(4,2,t,n)},useMemo:function(t,n){var a=mi();n=n===void 0?null:n;var o=t();if(xr){De(!0);try{t()}finally{De(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=mi();if(a!==void 0){var u=a(n);if(xr){De(!0);try{a(n)}finally{De(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=ny.bind(null,yt,t),[o.memoizedState,t]},useRef:function(t){var n=mi();return t={current:t},n.memoizedState=t},useState:function(t){t=ed(t);var n=t.queue,a=Hg.bind(null,yt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:id,useDeferredValue:function(t,n){var a=mi();return ad(a,t,n)},useTransition:function(){var t=ed(!1);return t=Pg.bind(null,yt,t.queue,!0,!1),mi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=yt,u=mi();if(Ht){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),gn===null)throw Error(s(349));(Ft&127)!==0||fg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,wg(hg.bind(null,o,d,t),[t]),o.flags|=2048,ro(9,{destroy:void 0},dg.bind(null,o,d,a,n),null),a},useId:function(){var t=mi(),n=gn.identifierPrefix;if(Ht){var a=Ma,o=Sa;a=(o&~(1<<32-Be(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=wc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=$b++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:rd,useFormState:Eg,useActionState:Eg,useOptimistic:function(t){var n=mi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=od.bind(null,yt,!0,a),a.dispatch=n,[t,n]},useMemoCache:Zf,useCacheRefresh:function(){return mi().memoizedState=ty.bind(null,yt)},useEffectEvent:function(t){var n=mi(),a={impl:t};return n.memoizedState=a,function(){if((en&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},ld={readContext:ni,use:Cc,useCallback:Lg,useContext:ni,useEffect:nd,useImperativeHandle:Dg,useInsertionEffect:Cg,useLayoutEffect:Ng,useMemo:Ig,useReducer:Nc,useRef:Ag,useState:function(){return Nc(qa)},useDebugValue:id,useDeferredValue:function(t,n){var a=Dn();return Ug(a,ln.memoizedState,t,n)},useTransition:function(){var t=Nc(qa)[0],n=Dn().memoizedState;return[typeof t=="boolean"?t:fl(t),n]},useSyncExternalStore:ug,useId:zg,useHostTransitionStatus:rd,useFormState:Sg,useActionState:Sg,useOptimistic:function(t,n){var a=Dn();return gg(a,ln,t,n)},useMemoCache:Zf,useCacheRefresh:Gg};ld.useEffectEvent=Rg;var Xg={readContext:ni,use:Cc,useCallback:Lg,useContext:ni,useEffect:nd,useImperativeHandle:Dg,useInsertionEffect:Cg,useLayoutEffect:Ng,useMemo:Ig,useReducer:Jf,useRef:Ag,useState:function(){return Jf(qa)},useDebugValue:id,useDeferredValue:function(t,n){var a=Dn();return ln===null?ad(a,t,n):Ug(a,ln.memoizedState,t,n)},useTransition:function(){var t=Jf(qa)[0],n=Dn().memoizedState;return[typeof t=="boolean"?t:fl(t),n]},useSyncExternalStore:ug,useId:zg,useHostTransitionStatus:rd,useFormState:Tg,useActionState:Tg,useOptimistic:function(t,n){var a=Dn();return ln!==null?gg(a,ln,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Zf,useCacheRefresh:Gg};Xg.useEffectEvent=Rg;function cd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:x({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var ud={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=zi(),u=Ms(o);u.payload=n,a!=null&&(u.callback=a),n=Ts(t,u,o),n!==null&&(Ai(n,t,o),ol(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=zi(),u=Ms(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ts(t,u,o),n!==null&&(Ai(n,t,o),ol(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=zi(),o=Ms(a);o.tag=2,n!=null&&(o.callback=n),n=Ts(t,o,a),n!==null&&(Ai(n,t,a),ol(n,t,a))}};function Yg(t,n,a,o,u,d,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,y):n.prototype&&n.prototype.isPureReactComponent?!Jo(a,o)||!Jo(u,d):!0}function Wg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&ud.enqueueReplaceState(n,n.state,null)}function _r(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=x({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function qg(t){fc(t)}function $g(t){console.error(t)}function Kg(t){fc(t)}function Ic(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Zg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function fd(t,n,a){return a=Ms(a),a.tag=3,a.payload={element:null},a.callback=function(){Ic(t,n)},a}function Qg(t){return t=Ms(t),t.tag=3,t}function Jg(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){Zg(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){Zg(n,a,o),typeof u!="function"&&(Os===null?Os=new Set([this]):Os.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})})}function iy(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Qr(n,a,u,!0),a=Ui.current,a!==null){switch(a.tag){case 31:case 13:return Ji===null?Yc():a.alternate===null&&Rn===0&&(Rn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===yc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Pd(t,o,u)),!1;case 22:return a.flags|=65536,o===yc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Pd(t,o,u)),!1}throw Error(s(435,a.tag))}return Pd(t,o,u),Yc(),!1}if(Ht)return n=Ui.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Nf&&(t=Error(s(422),{cause:o}),nl($i(t,a)))):(o!==Nf&&(n=Error(s(423),{cause:o}),nl($i(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=$i(o,a),u=fd(t.stateNode,o,u),Hf(t,u),Rn!==4&&(Rn=2)),!1;var d=Error(s(520),{cause:o});if(d=$i(d,a),yl===null?yl=[d]:yl.push(d),Rn!==4&&(Rn=2),n===null)return!0;o=$i(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=fd(a.stateNode,o,t),Hf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Os===null||!Os.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Qg(u),Jg(u,t,a,o),Hf(a,u),!1}a=a.return}while(a!==null);return!1}var dd=Error(s(461)),zn=!1;function ii(t,n,a,o){n.child=t===null?ig(n,null,a,o):gr(n,t.child,a,o)}function e0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var y={};for(var C in o)C!=="ref"&&(y[C]=o[C])}else y=o;return dr(n),o=Wf(t,n,a,y,d,u),C=qf(),t!==null&&!zn?($f(t,n,u),$a(t,n,u)):(Ht&&C&&Rf(n),n.flags|=1,ii(t,n,o,u),n.child)}function t0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!Tf(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,n0(t,n,d,o,u)):(t=mc(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!bd(t,u)){var y=d.memoizedProps;if(a=a.compare,a=a!==null?a:Jo,a(y,o)&&t.ref===n.ref)return $a(t,n,u)}return n.flags|=1,t=Va(d,o),t.ref=n.ref,t.return=n,n.child=t}function n0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(Jo(d,o)&&t.ref===n.ref)if(zn=!1,n.pendingProps=o=d,bd(t,u))(t.flags&131072)!==0&&(zn=!0);else return n.lanes=t.lanes,$a(t,n,u)}return hd(t,n,a,o,u)}function i0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return a0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&vc(n,d!==null?d.cachePool:null),d!==null?rg(n,d):Vf(),og(n);else return o=n.lanes=536870912,a0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(vc(n,d.cachePool),rg(n,d),ws(),n.memoizedState=null):(t!==null&&vc(n,null),Vf(),ws());return ii(t,n,u,a),n.child}function pl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function a0(t,n,a,o,u){var d=Ff();return d=d===null?null:{parent:Fn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&vc(n,null),Vf(),og(n),t!==null&&Qr(t,n,o,!0),n.childLanes=u,null}function Uc(t,n){return n=Fc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function s0(t,n,a){return gr(n,t.child,null,a),t=Uc(n,n.pendingProps),t.flags|=2,Pi(n),n.memoizedState=null,t}function ay(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ht){if(o.mode==="hidden")return t=Uc(n,o),n.lanes=536870912,pl(null,t);if(Xf(n),(t=vn)?(t=xx(t,Qi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:vs!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},a=km(t),a.return=n,n.child=a,ti=n,vn=null)):t=null,t===null)throw ys(n);return n.lanes=536870912,null}return Uc(n,o)}var d=t.memoizedState;if(d!==null){var y=d.dehydrated;if(Xf(n),u)if(n.flags&256)n.flags&=-257,n=s0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(zn||Qr(t,n,a,!1),u=(a&t.childLanes)!==0,zn||u){if(o=gn,o!==null&&(y=Un(o,a),y!==0&&y!==d.retryLane))throw d.retryLane=y,lr(t,y),Ai(o,t,y),dd;Yc(),n=s0(t,n,a)}else t=d.treeContext,vn=ea(y.nextSibling),ti=n,Ht=!0,bs=null,Qi=!1,t!==null&&Xm(n,t),n=Uc(n,o),n.flags|=4096;return n}return t=Va(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Pc(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function hd(t,n,a,o,u){return dr(n),a=Wf(t,n,a,o,void 0,u),o=qf(),t!==null&&!zn?($f(t,n,u),$a(t,n,u)):(Ht&&o&&Rf(n),n.flags|=1,ii(t,n,a,u),n.child)}function r0(t,n,a,o,u,d){return dr(n),n.updateQueue=null,a=cg(n,o,a,u),lg(t),o=qf(),t!==null&&!zn?($f(t,n,d),$a(t,n,d)):(Ht&&o&&Rf(n),n.flags|=1,ii(t,n,a,d),n.child)}function o0(t,n,a,o,u){if(dr(n),n.stateNode===null){var d=qr,y=a.contextType;typeof y=="object"&&y!==null&&(d=ni(y)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=ud,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},zf(n),y=a.contextType,d.context=typeof y=="object"&&y!==null?ni(y):qr,d.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(cd(n,a,y,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&ud.enqueueReplaceState(d,d.state,null),cl(n,o,d,u),ll(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var C=n.memoizedProps,H=_r(a,C);d.props=H;var le=d.context,xe=a.contextType;y=qr,typeof xe=="object"&&xe!==null&&(y=ni(xe));var ye=a.getDerivedStateFromProps;xe=typeof ye=="function"||typeof d.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,xe||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(C||le!==y)&&Wg(n,d,o,y),Ss=!1;var ce=n.memoizedState;d.state=ce,cl(n,o,d,u),ll(),le=n.memoizedState,C||ce!==le||Ss?(typeof ye=="function"&&(cd(n,a,ye,o),le=n.memoizedState),(H=Ss||Yg(n,a,H,o,ce,le,y))?(xe||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=le),d.props=o,d.state=le,d.context=y,o=H):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,Gf(t,n),y=n.memoizedProps,xe=_r(a,y),d.props=xe,ye=n.pendingProps,ce=d.context,le=a.contextType,H=qr,typeof le=="object"&&le!==null&&(H=ni(le)),C=a.getDerivedStateFromProps,(le=typeof C=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==ye||ce!==H)&&Wg(n,d,o,H),Ss=!1,ce=n.memoizedState,d.state=ce,cl(n,o,d,u),ll();var de=n.memoizedState;y!==ye||ce!==de||Ss||t!==null&&t.dependencies!==null&&xc(t.dependencies)?(typeof C=="function"&&(cd(n,a,C,o),de=n.memoizedState),(xe=Ss||Yg(n,a,xe,o,ce,de,H)||t!==null&&t.dependencies!==null&&xc(t.dependencies))?(le||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,de,H),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,de,H)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=de),d.props=o,d.state=de,d.context=H,o=xe):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&ce===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Pc(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=gr(n,t.child,null,u),n.child=gr(n,null,a,u)):ii(t,n,a,u),n.memoizedState=d.state,t=n.child):t=$a(t,n,u),t}function l0(t,n,a,o){return ur(),n.flags|=256,ii(t,n,a,o),n.child}var pd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function md(t){return{baseLanes:t,cachePool:Zm()}}function gd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Bi),t}function c0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,y;if((y=d)||(y=t!==null&&t.memoizedState===null?!1:(On.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ht){if(u?As(n):ws(),(t=vn)?(t=xx(t,Qi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:vs!==null?{id:Sa,overflow:Ma}:null,retryLane:536870912,hydrationErrors:null},a=km(t),a.return=n,n.child=a,ti=n,vn=null)):t=null,t===null)throw ys(n);return Qd(t)?n.lanes=32:n.lanes=536870912,null}var C=o.children;return o=o.fallback,u?(ws(),u=n.mode,C=Fc({mode:"hidden",children:C},u),o=cr(o,u,a,null),C.return=n,o.return=n,C.sibling=o,n.child=C,o=n.child,o.memoizedState=md(a),o.childLanes=gd(t,y,a),n.memoizedState=pd,pl(null,o)):(As(n),xd(n,C))}var H=t.memoizedState;if(H!==null&&(C=H.dehydrated,C!==null)){if(d)n.flags&256?(As(n),n.flags&=-257,n=_d(t,n,a)):n.memoizedState!==null?(ws(),n.child=t.child,n.flags|=128,n=null):(ws(),C=o.fallback,u=n.mode,o=Fc({mode:"visible",children:o.children},u),C=cr(C,u,a,null),C.flags|=2,o.return=n,C.return=n,o.sibling=C,n.child=o,gr(n,t.child,null,a),o=n.child,o.memoizedState=md(a),o.childLanes=gd(t,y,a),n.memoizedState=pd,n=pl(null,o));else if(As(n),Qd(C)){if(y=C.nextSibling&&C.nextSibling.dataset,y)var le=y.dgst;y=le,o=Error(s(419)),o.stack="",o.digest=y,nl({value:o,source:null,stack:null}),n=_d(t,n,a)}else if(zn||Qr(t,n,a,!1),y=(a&t.childLanes)!==0,zn||y){if(y=gn,y!==null&&(o=Un(y,a),o!==0&&o!==H.retryLane))throw H.retryLane=o,lr(t,o),Ai(y,t,o),dd;Zd(C)||Yc(),n=_d(t,n,a)}else Zd(C)?(n.flags|=192,n.child=t.child,n=null):(t=H.treeContext,vn=ea(C.nextSibling),ti=n,Ht=!0,bs=null,Qi=!1,t!==null&&Xm(n,t),n=xd(n,o.children),n.flags|=4096);return n}return u?(ws(),C=o.fallback,u=n.mode,H=t.child,le=H.sibling,o=Va(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,le!==null?C=Va(le,C):(C=cr(C,u,a,null),C.flags|=2),C.return=n,o.return=n,o.sibling=C,n.child=o,pl(null,o),o=n.child,C=t.child.memoizedState,C===null?C=md(a):(u=C.cachePool,u!==null?(H=Fn._currentValue,u=u.parent!==H?{parent:H,pool:H}:u):u=Zm(),C={baseLanes:C.baseLanes|a,cachePool:u}),o.memoizedState=C,o.childLanes=gd(t,y,a),n.memoizedState=pd,pl(t.child,o)):(As(n),a=t.child,t=a.sibling,a=Va(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function xd(t,n){return n=Fc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Fc(t,n){return t=Ii(22,t,null,n),t.lanes=0,t}function _d(t,n,a){return gr(n,t.child,null,a),t=xd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function u0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Lf(t.return,n,a)}function vd(t,n,a,o,u,d){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=d)}function f0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=On.current,C=(y&2)!==0;if(C?(y=y&1|2,n.flags|=128):y&=1,_e(On,y),ii(t,n,o,a),o=Ht?tl:0,!C&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&u0(t,a,n);else if(t.tag===19)u0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Tc(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),vd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Tc(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}vd(n,!0,a,null,d,o);break;case"together":vd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function $a(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Qr(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Va(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Va(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function bd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&xc(t)))}function sy(t,n,a){switch(n.tag){case 3:Ee(n,n.stateNode.containerInfo),Es(n,Fn,t.memoizedState.cache),ur();break;case 27:case 5:qe(n);break;case 4:Ee(n,n.stateNode.containerInfo);break;case 10:Es(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Xf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(As(n),n.flags|=128,null):(a&n.child.childLanes)!==0?c0(t,n,a):(As(n),t=$a(t,n,a),t!==null?t.sibling:null);As(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Qr(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return f0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),_e(On,On.current),o)break;return null;case 22:return n.lanes=0,i0(t,n,a,n.pendingProps);case 24:Es(n,Fn,t.memoizedState.cache)}return $a(t,n,a)}function d0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)zn=!0;else{if(!bd(t,a)&&(n.flags&128)===0)return zn=!1,sy(t,n,a);zn=(t.flags&131072)!==0}else zn=!1,Ht&&(n.flags&1048576)!==0&&jm(n,tl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=pr(n.elementType),n.type=t,typeof t=="function")Tf(t)?(o=_r(t,o),n.tag=1,n=o0(null,n,t,o,a)):(n.tag=0,n=hd(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===U){n.tag=11,n=e0(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=t0(null,n,t,o,a);break e}}throw n=ee(t)||t,Error(s(306,n,""))}}return n;case 0:return hd(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=_r(o,n.pendingProps),o0(t,n,o,u,a);case 3:e:{if(Ee(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,Gf(t,n),cl(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Es(n,Fn,o),o!==d.cache&&If(n,[Fn],a,!0),ll(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=l0(t,n,o,a);break e}else if(o!==u){u=$i(Error(s(424)),n),nl(u),n=l0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,vn=ea(t.firstChild),ti=n,Ht=!0,bs=null,Qi=!0,a=ig(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ur(),o===u){n=$a(t,n,a);break e}ii(t,n,o,a)}n=n.child}return n;case 26:return Pc(t,n),t===null?(a=Sx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ht||(a=n.type,t=n.pendingProps,o=Jc(te.current).createElement(a),o[nn]=n,o[yn]=t,ai(o,a,t),mn(o),n.stateNode=o):n.memoizedState=Sx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return qe(n),t===null&&Ht&&(o=n.stateNode=bx(n.type,n.pendingProps,te.current),ti=n,Qi=!0,u=vn,Us(n.type)?(Jd=u,vn=ea(o.firstChild)):vn=u),ii(t,n,n.pendingProps.children,a),Pc(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ht&&((u=o=vn)&&(o=Uy(o,n.type,n.pendingProps,Qi),o!==null?(n.stateNode=o,ti=n,vn=ea(o.firstChild),Qi=!1,u=!0):u=!1),u||ys(n)),qe(n),u=n.type,d=n.pendingProps,y=t!==null?t.memoizedProps:null,o=d.children,qd(u,d)?o=null:y!==null&&qd(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=Wf(t,n,Kb,null,null,a),Cl._currentValue=u),Pc(t,n),ii(t,n,o,a),n.child;case 6:return t===null&&Ht&&((t=a=vn)&&(a=Py(a,n.pendingProps,Qi),a!==null?(n.stateNode=a,ti=n,vn=null,t=!0):t=!1),t||ys(n)),null;case 13:return c0(t,n,a);case 4:return Ee(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=gr(n,null,o,a):ii(t,n,o,a),n.child;case 11:return e0(t,n,n.type,n.pendingProps,a);case 7:return ii(t,n,n.pendingProps,a),n.child;case 8:return ii(t,n,n.pendingProps.children,a),n.child;case 12:return ii(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Es(n,n.type,o.value),ii(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,dr(n),u=ni(u),o=o(u),n.flags|=1,ii(t,n,o,a),n.child;case 14:return t0(t,n,n.type,n.pendingProps,a);case 15:return n0(t,n,n.type,n.pendingProps,a);case 19:return f0(t,n,a);case 31:return ay(t,n,a);case 22:return i0(t,n,a,n.pendingProps);case 24:return dr(n),o=ni(Fn),t===null?(u=Ff(),u===null&&(u=gn,d=Uf(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},zf(n),Es(n,Fn,u)):((t.lanes&a)!==0&&(Gf(t,n),cl(n,null,null,a),ll()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Es(n,Fn,o)):(o=d.cache,Es(n,Fn,o),o!==u.cache&&If(n,[Fn],a,!0))),ii(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ka(t){t.flags|=4}function yd(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(z0())t.flags|=8192;else throw mr=yc,Bf}else t.flags&=-16777217}function h0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Rx(n))if(z0())t.flags|=8192;else throw mr=yc,Bf}function Bc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Se():536870912,t.lanes|=n,uo|=n)}function ml(t,n){if(!Ht)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function bn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function ry(t,n,a){var o=n.pendingProps;switch(Cf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bn(n),null;case 1:return bn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Ya(Fn),He(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Zr(n)?Ka(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Of())),bn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(Ka(n),d!==null?(bn(n),h0(n,d)):(bn(n),yd(n,u,null,o,a))):d?d!==t.memoizedState?(Ka(n),bn(n),h0(n,d)):(bn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Ka(n),bn(n),yd(n,u,t,o,a)),null;case 27:if(Qe(n),a=te.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ka(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}t=Ae.current,Zr(n)?Ym(n):(t=bx(u,o,a),n.stateNode=t,Ka(n))}return bn(n),null;case 5:if(Qe(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Ka(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}if(d=Ae.current,Zr(n))Ym(n);else{var y=Jc(te.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[nn]=n,d[yn]=o;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=d;e:switch(ai(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Ka(n)}}return bn(n),yd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Ka(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=te.current,Zr(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=ti,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[nn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||cx(t.nodeValue,a)),t||ys(n,!0)}else t=Jc(t).createTextNode(o),t[nn]=n,n.stateNode=t}return bn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Zr(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[nn]=n}else ur(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),t=!1}else a=Of(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Pi(n),n):(Pi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return bn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Zr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[nn]=n}else ur(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),u=!1}else u=Of(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Pi(n),n):(Pi(n),null)}return Pi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Bc(n,n.updateQueue),bn(n),null);case 4:return He(),t===null&&Vd(n.stateNode.containerInfo),bn(n),null;case 10:return Ya(n.type),bn(n),null;case 19:if(Z(On),o=n.memoizedState,o===null)return bn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)ml(o,!1);else{if(Rn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=Tc(t),d!==null){for(n.flags|=128,ml(o,!1),t=d.updateQueue,n.updateQueue=t,Bc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Hm(a,t),a=a.sibling;return _e(On,On.current&1|2),Ht&&ja(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Re()>Vc&&(n.flags|=128,u=!0,ml(o,!1),n.lanes=4194304)}else{if(!u)if(t=Tc(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Bc(n,t),ml(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Ht)return bn(n),null}else 2*Re()-o.renderingStartTime>Vc&&a!==536870912&&(n.flags|=128,u=!0,ml(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Re(),t.sibling=null,a=On.current,_e(On,u?a&1|2:a&1),Ht&&ja(n,o.treeForkCount),t):(bn(n),null);case 22:case 23:return Pi(n),jf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(bn(n),n.subtreeFlags&6&&(n.flags|=8192)):bn(n),a=n.updateQueue,a!==null&&Bc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Z(hr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Ya(Fn),bn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function oy(t,n){switch(Cf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Ya(Fn),He(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Qe(n),null;case 31:if(n.memoizedState!==null){if(Pi(n),n.alternate===null)throw Error(s(340));ur()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Pi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ur()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Z(On),null;case 4:return He(),null;case 10:return Ya(n.type),null;case 22:case 23:return Pi(n),jf(),t!==null&&Z(hr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Ya(Fn),null;case 25:return null;default:return null}}function p0(t,n){switch(Cf(n),n.tag){case 3:Ya(Fn),He();break;case 26:case 27:case 5:Qe(n);break;case 4:He();break;case 31:n.memoizedState!==null&&Pi(n);break;case 13:Pi(n);break;case 19:Z(On);break;case 10:Ya(n.type);break;case 22:case 23:Pi(n),jf(),t!==null&&Z(hr);break;case 24:Ya(Fn)}}function gl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,y=a.inst;o=d(),y.destroy=o}a=a.next}while(a!==u)}}catch(C){rn(n,n.return,C)}}function Rs(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var y=o.inst,C=y.destroy;if(C!==void 0){y.destroy=void 0,u=n;var H=a,le=C;try{le()}catch(xe){rn(u,H,xe)}}}o=o.next}while(o!==d)}}catch(xe){rn(n,n.return,xe)}}function m0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{sg(n,a)}catch(o){rn(t,t.return,o)}}}function g0(t,n,a){a.props=_r(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){rn(t,n,o)}}function xl(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){rn(t,n,u)}}function Ta(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){rn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){rn(t,n,u)}else a.current=null}function x0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){rn(t,t.return,u)}}function Ed(t,n,a){try{var o=t.stateNode;Cy(o,t.type,a,n),o[yn]=n}catch(u){rn(t,t.return,u)}}function _0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Us(t.type)||t.tag===4}function Sd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||_0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Us(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Md(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Yi));else if(o!==4&&(o===27&&Us(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Md(t,n,a),t=t.sibling;t!==null;)Md(t,n,a),t=t.sibling}function zc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Us(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(zc(t,n,a),t=t.sibling;t!==null;)zc(t,n,a),t=t.sibling}function v0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);ai(n,o,a),n[nn]=t,n[yn]=a}catch(d){rn(t,t.return,d)}}var Za=!1,Gn=!1,Td=!1,b0=typeof WeakSet=="function"?WeakSet:Set,Zn=null;function ly(t,n){if(t=t.containerInfo,Yd=ru,t=Dm(t),_f(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var y=0,C=-1,H=-1,le=0,xe=0,ye=t,ce=null;t:for(;;){for(var de;ye!==a||u!==0&&ye.nodeType!==3||(C=y+u),ye!==d||o!==0&&ye.nodeType!==3||(H=y+o),ye.nodeType===3&&(y+=ye.nodeValue.length),(de=ye.firstChild)!==null;)ce=ye,ye=de;for(;;){if(ye===t)break t;if(ce===a&&++le===u&&(C=y),ce===d&&++xe===o&&(H=y),(de=ye.nextSibling)!==null)break;ye=ce,ce=ye.parentNode}ye=de}a=C===-1||H===-1?null:{start:C,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(Wd={focusedElem:t,selectionRange:a},ru=!1,Zn=n;Zn!==null;)if(n=Zn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Zn=t;else for(;Zn!==null;){switch(n=Zn,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var Ze=_r(a.type,u);t=o.getSnapshotBeforeUpdate(Ze,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(lt){rn(a,a.return,lt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Kd(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Kd(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Zn=t;break}Zn=n.return}}function y0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ja(t,a),o&4&&gl(5,a);break;case 1:if(Ja(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){rn(a,a.return,y)}else{var u=_r(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){rn(a,a.return,y)}}o&64&&m0(a),o&512&&xl(a,a.return);break;case 3:if(Ja(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{sg(t,n)}catch(y){rn(a,a.return,y)}}break;case 27:n===null&&o&4&&v0(a);case 26:case 5:Ja(t,a),n===null&&o&4&&x0(a),o&512&&xl(a,a.return);break;case 12:Ja(t,a);break;case 31:Ja(t,a),o&4&&M0(t,a);break;case 13:Ja(t,a),o&4&&T0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=xy.bind(null,a),Fy(t,a))));break;case 22:if(o=a.memoizedState!==null||Za,!o){n=n!==null&&n.memoizedState!==null||Gn,u=Za;var d=Gn;Za=o,(Gn=n)&&!d?es(t,a,(a.subtreeFlags&8772)!==0):Ja(t,a),Za=u,Gn=d}break;case 30:break;default:Ja(t,a)}}function E0(t){var n=t.alternate;n!==null&&(t.alternate=null,E0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&ms(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Sn=null,Ei=!1;function Qa(t,n,a){for(a=a.child;a!==null;)S0(t,n,a),a=a.sibling}function S0(t,n,a){if(me&&typeof me.onCommitFiberUnmount=="function")try{me.onCommitFiberUnmount(fe,a)}catch{}switch(a.tag){case 26:Gn||Ta(a,n),Qa(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Gn||Ta(a,n);var o=Sn,u=Ei;Us(a.type)&&(Sn=a.stateNode,Ei=!1),Qa(t,n,a),Al(a.stateNode),Sn=o,Ei=u;break;case 5:Gn||Ta(a,n);case 6:if(o=Sn,u=Ei,Sn=null,Qa(t,n,a),Sn=o,Ei=u,Sn!==null)if(Ei)try{(Sn.nodeType===9?Sn.body:Sn.nodeName==="HTML"?Sn.ownerDocument.body:Sn).removeChild(a.stateNode)}catch(d){rn(a,n,d)}else try{Sn.removeChild(a.stateNode)}catch(d){rn(a,n,d)}break;case 18:Sn!==null&&(Ei?(t=Sn,mx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),vo(t)):mx(Sn,a.stateNode));break;case 4:o=Sn,u=Ei,Sn=a.stateNode.containerInfo,Ei=!0,Qa(t,n,a),Sn=o,Ei=u;break;case 0:case 11:case 14:case 15:Rs(2,a,n),Gn||Rs(4,a,n),Qa(t,n,a);break;case 1:Gn||(Ta(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&g0(a,n,o)),Qa(t,n,a);break;case 21:Qa(t,n,a);break;case 22:Gn=(o=Gn)||a.memoizedState!==null,Qa(t,n,a),Gn=o;break;default:Qa(t,n,a)}}function M0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{vo(t)}catch(a){rn(n,n.return,a)}}}function T0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{vo(t)}catch(a){rn(n,n.return,a)}}function cy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new b0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new b0),n;default:throw Error(s(435,t.tag))}}function Gc(t,n){var a=cy(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=_y.bind(null,t,o);o.then(u,u)}})}function Si(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,y=n,C=y;e:for(;C!==null;){switch(C.tag){case 27:if(Us(C.type)){Sn=C.stateNode,Ei=!1;break e}break;case 5:Sn=C.stateNode,Ei=!1;break e;case 3:case 4:Sn=C.stateNode.containerInfo,Ei=!0;break e}C=C.return}if(Sn===null)throw Error(s(160));S0(d,y,u),Sn=null,Ei=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)A0(n,t),n=n.sibling}var ha=null;function A0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Si(n,t),Mi(t),o&4&&(Rs(3,t,t.return),gl(3,t),Rs(5,t,t.return));break;case 1:Si(n,t),Mi(t),o&512&&(Gn||a===null||Ta(a,a.return)),o&64&&Za&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=ha;if(Si(n,t),Mi(t),o&512&&(Gn||a===null||Ta(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[la]||d[nn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),ai(d,o,a),d[nn]=t,mn(d),o=d;break e;case"link":var y=Ax("link","href",u).get(o+(a.href||""));if(y){for(var C=0;C<y.length;C++)if(d=y[C],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(C,1);break t}}d=u.createElement(o),ai(d,o,a),u.head.appendChild(d);break;case"meta":if(y=Ax("meta","content",u).get(o+(a.content||""))){for(C=0;C<y.length;C++)if(d=y[C],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(C,1);break t}}d=u.createElement(o),ai(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[nn]=t,mn(d),o=d}t.stateNode=o}else wx(u,t.type,t.stateNode);else t.stateNode=Tx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?wx(u,t.type,t.stateNode):Tx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Ed(t,t.memoizedProps,a.memoizedProps)}break;case 27:Si(n,t),Mi(t),o&512&&(Gn||a===null||Ta(a,a.return)),a!==null&&o&4&&Ed(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Si(n,t),Mi(t),o&512&&(Gn||a===null||Ta(a,a.return)),t.flags&32){u=t.stateNode;try{Jn(u,"")}catch(Ze){rn(t,t.return,Ze)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Ed(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Td=!0);break;case 6:if(Si(n,t),Mi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Ze){rn(t,t.return,Ze)}}break;case 3:if(nu=null,u=ha,ha=eu(n.containerInfo),Si(n,t),ha=u,Mi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{vo(n.containerInfo)}catch(Ze){rn(t,t.return,Ze)}Td&&(Td=!1,w0(t));break;case 4:o=ha,ha=eu(t.stateNode.containerInfo),Si(n,t),Mi(t),ha=o;break;case 12:Si(n,t),Mi(t);break;case 31:Si(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 13:Si(n,t),Mi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kc=Re()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 22:u=t.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,le=Za,xe=Gn;if(Za=le||u,Gn=xe||H,Si(n,t),Gn=xe,Za=le,Mi(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||H||Za||Gn||vr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(d=H.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{C=H.stateNode;var ye=H.memoizedProps.style,ce=ye!=null&&ye.hasOwnProperty("display")?ye.display:null;C.style.display=ce==null||typeof ce=="boolean"?"":(""+ce).trim()}}catch(Ze){rn(H,H.return,Ze)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=u?"":H.memoizedProps}catch(Ze){rn(H,H.return,Ze)}}}else if(n.tag===18){if(a===null){H=n;try{var de=H.stateNode;u?gx(de,!0):gx(H.stateNode,!1)}catch(Ze){rn(H,H.return,Ze)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Gc(t,a))));break;case 19:Si(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Gc(t,o)));break;case 30:break;case 21:break;default:Si(n,t),Mi(t)}}function Mi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(_0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Sd(t);zc(t,d,u);break;case 5:var y=a.stateNode;a.flags&32&&(Jn(y,""),a.flags&=-33);var C=Sd(t);zc(t,C,y);break;case 3:case 4:var H=a.stateNode.containerInfo,le=Sd(t);Md(t,le,H);break;default:throw Error(s(161))}}catch(xe){rn(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function w0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;w0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function Ja(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)y0(t,n.alternate,n),n=n.sibling}function vr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Rs(4,n,n.return),vr(n);break;case 1:Ta(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&g0(n,n.return,a),vr(n);break;case 27:Al(n.stateNode);case 26:case 5:Ta(n,n.return),vr(n);break;case 22:n.memoizedState===null&&vr(n);break;case 30:vr(n);break;default:vr(n)}t=t.sibling}}function es(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,y=d.flags;switch(d.tag){case 0:case 11:case 15:es(u,d,a),gl(4,d);break;case 1:if(es(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(le){rn(o,o.return,le)}if(o=d,u=o.updateQueue,u!==null){var C=o.stateNode;try{var H=u.shared.hiddenCallbacks;if(H!==null)for(u.shared.hiddenCallbacks=null,u=0;u<H.length;u++)ag(H[u],C)}catch(le){rn(o,o.return,le)}}a&&y&64&&m0(d),xl(d,d.return);break;case 27:v0(d);case 26:case 5:es(u,d,a),a&&o===null&&y&4&&x0(d),xl(d,d.return);break;case 12:es(u,d,a);break;case 31:es(u,d,a),a&&y&4&&M0(u,d);break;case 13:es(u,d,a),a&&y&4&&T0(u,d);break;case 22:d.memoizedState===null&&es(u,d,a),xl(d,d.return);break;case 30:break;default:es(u,d,a)}n=n.sibling}}function Ad(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&il(a))}function wd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&il(t))}function pa(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)R0(t,n,a,o),n=n.sibling}function R0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:pa(t,n,a,o),u&2048&&gl(9,n);break;case 1:pa(t,n,a,o);break;case 3:pa(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&il(t)));break;case 12:if(u&2048){pa(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,y=d.id,C=d.onPostCommit;typeof C=="function"&&C(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(H){rn(n,n.return,H)}}else pa(t,n,a,o);break;case 31:pa(t,n,a,o);break;case 13:pa(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,y=n.alternate,n.memoizedState!==null?d._visibility&2?pa(t,n,a,o):_l(t,n):d._visibility&2?pa(t,n,a,o):(d._visibility|=2,oo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Ad(y,n);break;case 24:pa(t,n,a,o),u&2048&&wd(n.alternate,n);break;default:pa(t,n,a,o)}}function oo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,y=n,C=a,H=o,le=y.flags;switch(y.tag){case 0:case 11:case 15:oo(d,y,C,H,u),gl(8,y);break;case 23:break;case 22:var xe=y.stateNode;y.memoizedState!==null?xe._visibility&2?oo(d,y,C,H,u):_l(d,y):(xe._visibility|=2,oo(d,y,C,H,u)),u&&le&2048&&Ad(y.alternate,y);break;case 24:oo(d,y,C,H,u),u&&le&2048&&wd(y.alternate,y);break;default:oo(d,y,C,H,u)}n=n.sibling}}function _l(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:_l(a,o),u&2048&&Ad(o.alternate,o);break;case 24:_l(a,o),u&2048&&wd(o.alternate,o);break;default:_l(a,o)}n=n.sibling}}var vl=8192;function lo(t,n,a){if(t.subtreeFlags&vl)for(t=t.child;t!==null;)C0(t,n,a),t=t.sibling}function C0(t,n,a){switch(t.tag){case 26:lo(t,n,a),t.flags&vl&&t.memoizedState!==null&&$y(a,ha,t.memoizedState,t.memoizedProps);break;case 5:lo(t,n,a);break;case 3:case 4:var o=ha;ha=eu(t.stateNode.containerInfo),lo(t,n,a),ha=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=vl,vl=16777216,lo(t,n,a),vl=o):lo(t,n,a));break;default:lo(t,n,a)}}function N0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function bl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Zn=o,D0(o,t)}N0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)O0(t),t=t.sibling}function O0(t){switch(t.tag){case 0:case 11:case 15:bl(t),t.flags&2048&&Rs(9,t,t.return);break;case 3:bl(t);break;case 12:bl(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Hc(t)):bl(t);break;default:bl(t)}}function Hc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Zn=o,D0(o,t)}N0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Rs(8,n,n.return),Hc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Hc(n));break;default:Hc(n)}t=t.sibling}}function D0(t,n){for(;Zn!==null;){var a=Zn;switch(a.tag){case 0:case 11:case 15:Rs(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:il(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Zn=o;else e:for(a=t;Zn!==null;){o=Zn;var u=o.sibling,d=o.return;if(E0(o),o===a){Zn=null;break e}if(u!==null){u.return=d,Zn=u;break e}Zn=d}}}var uy={getCacheForType:function(t){var n=ni(Fn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return ni(Fn).controller.signal}},fy=typeof WeakMap=="function"?WeakMap:Map,en=0,gn=null,Dt=null,Ft=0,sn=0,Fi=null,Cs=!1,co=!1,Rd=!1,ts=0,Rn=0,Ns=0,br=0,Cd=0,Bi=0,uo=0,yl=null,Ti=null,Nd=!1,kc=0,L0=0,Vc=1/0,jc=null,Os=null,Vn=0,Ds=null,fo=null,ns=0,Od=0,Dd=null,I0=null,El=0,Ld=null;function zi(){return(en&2)!==0&&Ft!==0?Ft&-Ft:D.T!==null?zd():za()}function U0(){if(Bi===0)if((Ft&536870912)===0||Ht){var t=mt;mt<<=1,(mt&3932160)===0&&(mt=262144),Bi=t}else Bi=536870912;return t=Ui.current,t!==null&&(t.flags|=32),Bi}function Ai(t,n,a){(t===gn&&(sn===2||sn===9)||t.cancelPendingCommit!==null)&&(ho(t,0),Ls(t,Ft,Bi,!1)),at(t,a),((en&2)===0||t!==gn)&&(t===gn&&((en&2)===0&&(br|=a),Rn===4&&Ls(t,Ft,Bi,!1)),Aa(t))}function P0(t,n,a){if((en&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||ze(t,n),u=o?py(t,n):Ud(t,n,!0),d=o;do{if(u===0){co&&!o&&Ls(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!dy(a)){u=Ud(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var C=t;u=yl;var H=C.current.memoizedState.isDehydrated;if(H&&(ho(C,y).flags|=256),y=Ud(C,y,!1),y!==2){if(Rd&&!H){C.errorRecoveryDisabledLanes|=d,br|=d,u=4;break e}d=Ti,Ti=u,d!==null&&(Ti===null?Ti=d:Ti.push.apply(Ti,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){ho(t,0),Ls(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ls(o,n,Bi,!Cs);break e;case 2:Ti=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=kc+300-Re(),10<u)){if(Ls(o,n,Bi,!Cs),pe(o,0,!0)!==0)break e;ns=n,o.timeoutHandle=hx(F0.bind(null,o,a,Ti,jc,Nd,n,Bi,br,uo,Cs,d,"Throttled",-0,0),u);break e}F0(o,a,Ti,jc,Nd,n,Bi,br,uo,Cs,d,null,-0,0)}}break}while(!0);Aa(t)}function F0(t,n,a,o,u,d,y,C,H,le,xe,ye,ce,de){if(t.timeoutHandle=-1,ye=n.subtreeFlags,ye&8192||(ye&16785408)===16785408){ye={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Yi},C0(n,d,ye);var Ze=(d&62914560)===d?kc-Re():(d&4194048)===d?L0-Re():0;if(Ze=Ky(ye,Ze),Ze!==null){ns=d,t.cancelPendingCommit=Ze(X0.bind(null,t,n,d,a,o,u,y,C,H,xe,ye,null,ce,de)),Ls(t,d,y,!le);return}}X0(t,n,d,a,o,u,y,C,H)}function dy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Li(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ls(t,n,a,o){n&=~Cd,n&=~br,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-Be(u),y=1<<d;o[d]=-1,u&=~y}a!==0&&Ct(t,a,n)}function Xc(){return(en&6)===0?(Sl(0),!1):!0}function Id(){if(Dt!==null){if(sn===0)var t=Dt.return;else t=Dt,Xa=fr=null,Kf(t),no=null,sl=0,t=Dt;for(;t!==null;)p0(t.alternate,t),t=t.return;Dt=null}}function ho(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Dy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ns=0,Id(),gn=t,Dt=a=Va(t.current,null),Ft=n,sn=0,Fi=null,Cs=!1,co=ze(t,n),Rd=!1,uo=Bi=Cd=br=Ns=Rn=0,Ti=yl=null,Nd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Be(o),d=1<<u;n|=t[u],o&=~d}return ts=n,dc(),a}function B0(t,n){yt=null,D.H=hl,n===to||n===bc?(n=eg(),sn=3):n===Bf?(n=eg(),sn=4):sn=n===dd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Fi=n,Dt===null&&(Rn=1,Ic(t,$i(n,t.current)))}function z0(){var t=Ui.current;return t===null?!0:(Ft&4194048)===Ft?Ji===null:(Ft&62914560)===Ft||(Ft&536870912)!==0?t===Ji:!1}function G0(){var t=D.H;return D.H=hl,t===null?hl:t}function H0(){var t=D.A;return D.A=uy,t}function Yc(){Rn=4,Cs||(Ft&4194048)!==Ft&&Ui.current!==null||(co=!0),(Ns&134217727)===0&&(br&134217727)===0||gn===null||Ls(gn,Ft,Bi,!1)}function Ud(t,n,a){var o=en;en|=2;var u=G0(),d=H0();(gn!==t||Ft!==n)&&(jc=null,ho(t,n)),n=!1;var y=Rn;e:do try{if(sn!==0&&Dt!==null){var C=Dt,H=Fi;switch(sn){case 8:Id(),y=6;break e;case 3:case 2:case 9:case 6:Ui.current===null&&(n=!0);var le=sn;if(sn=0,Fi=null,po(t,C,H,le),a&&co){y=0;break e}break;default:le=sn,sn=0,Fi=null,po(t,C,H,le)}}hy(),y=Rn;break}catch(xe){B0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,Xa=fr=null,en=o,D.H=u,D.A=d,Dt===null&&(gn=null,Ft=0,dc()),y}function hy(){for(;Dt!==null;)k0(Dt)}function py(t,n){var a=en;en|=2;var o=G0(),u=H0();gn!==t||Ft!==n?(jc=null,Vc=Re()+500,ho(t,n)):co=ze(t,n);e:do try{if(sn!==0&&Dt!==null){n=Dt;var d=Fi;t:switch(sn){case 1:sn=0,Fi=null,po(t,n,d,1);break;case 2:case 9:if(Qm(d)){sn=0,Fi=null,V0(n);break}n=function(){sn!==2&&sn!==9||gn!==t||(sn=7),Aa(t)},d.then(n,n);break e;case 3:sn=7;break e;case 4:sn=5;break e;case 7:Qm(d)?(sn=0,Fi=null,V0(n)):(sn=0,Fi=null,po(t,n,d,7));break;case 5:var y=null;switch(Dt.tag){case 26:y=Dt.memoizedState;case 5:case 27:var C=Dt;if(y?Rx(y):C.stateNode.complete){sn=0,Fi=null;var H=C.sibling;if(H!==null)Dt=H;else{var le=C.return;le!==null?(Dt=le,Wc(le)):Dt=null}break t}}sn=0,Fi=null,po(t,n,d,5);break;case 6:sn=0,Fi=null,po(t,n,d,6);break;case 8:Id(),Rn=6;break e;default:throw Error(s(462))}}my();break}catch(xe){B0(t,xe)}while(!0);return Xa=fr=null,D.H=o,D.A=u,en=a,Dt!==null?0:(gn=null,Ft=0,dc(),Rn)}function my(){for(;Dt!==null&&!ut();)k0(Dt)}function k0(t){var n=d0(t.alternate,t,ts);t.memoizedProps=t.pendingProps,n===null?Wc(t):Dt=n}function V0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=r0(a,n,n.pendingProps,n.type,void 0,Ft);break;case 11:n=r0(a,n,n.pendingProps,n.type.render,n.ref,Ft);break;case 5:Kf(n);default:p0(a,n),n=Dt=Hm(n,ts),n=d0(a,n,ts)}t.memoizedProps=t.pendingProps,n===null?Wc(t):Dt=n}function po(t,n,a,o){Xa=fr=null,Kf(n),no=null,sl=0;var u=n.return;try{if(iy(t,u,n,a,Ft)){Rn=1,Ic(t,$i(a,t.current)),Dt=null;return}}catch(d){if(u!==null)throw Dt=u,d;Rn=1,Ic(t,$i(a,t.current)),Dt=null;return}n.flags&32768?(Ht||o===1?t=!0:co||(Ft&536870912)!==0?t=!1:(Cs=t=!0,(o===2||o===9||o===3||o===6)&&(o=Ui.current,o!==null&&o.tag===13&&(o.flags|=16384))),j0(n,t)):Wc(n)}function Wc(t){var n=t;do{if((n.flags&32768)!==0){j0(n,Cs);return}t=n.return;var a=ry(n.alternate,n,ts);if(a!==null){Dt=a;return}if(n=n.sibling,n!==null){Dt=n;return}Dt=n=t}while(n!==null);Rn===0&&(Rn=5)}function j0(t,n){do{var a=oy(t.alternate,t);if(a!==null){a.flags&=32767,Dt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Dt=t;return}Dt=t=a}while(t!==null);Rn=6,Dt=null}function X0(t,n,a,o,u,d,y,C,H){t.cancelPendingCommit=null;do qc();while(Vn!==0);if((en&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Sf,hn(t,a,d,y,C,H),t===gn&&(Dt=gn=null,Ft=0),fo=n,Ds=t,ns=a,Od=d,Dd=u,I0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,vy(J,function(){return K0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=D.T,D.T=null,u=z.p,z.p=2,y=en,en|=4;try{ly(t,n,a)}finally{en=y,z.p=u,D.T=o}}Vn=1,Y0(),W0(),q0()}}function Y0(){if(Vn===1){Vn=0;var t=Ds,n=fo,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=en;en|=4;try{A0(n,t);var d=Wd,y=Dm(t.containerInfo),C=d.focusedElem,H=d.selectionRange;if(y!==C&&C&&C.ownerDocument&&Om(C.ownerDocument.documentElement,C)){if(H!==null&&_f(C)){var le=H.start,xe=H.end;if(xe===void 0&&(xe=le),"selectionStart"in C)C.selectionStart=le,C.selectionEnd=Math.min(xe,C.value.length);else{var ye=C.ownerDocument||document,ce=ye&&ye.defaultView||window;if(ce.getSelection){var de=ce.getSelection(),Ze=C.textContent.length,lt=Math.min(H.start,Ze),un=H.end===void 0?lt:Math.min(H.end,Ze);!de.extend&&lt>un&&(y=un,un=lt,lt=y);var Q=Nm(C,lt),W=Nm(C,un);if(Q&&W&&(de.rangeCount!==1||de.anchorNode!==Q.node||de.anchorOffset!==Q.offset||de.focusNode!==W.node||de.focusOffset!==W.offset)){var oe=ye.createRange();oe.setStart(Q.node,Q.offset),de.removeAllRanges(),lt>un?(de.addRange(oe),de.extend(W.node,W.offset)):(oe.setEnd(W.node,W.offset),de.addRange(oe))}}}}for(ye=[],de=C;de=de.parentNode;)de.nodeType===1&&ye.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<ye.length;C++){var ve=ye[C];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}ru=!!Yd,Wd=Yd=null}finally{en=u,z.p=o,D.T=a}}t.current=n,Vn=2}}function W0(){if(Vn===2){Vn=0;var t=Ds,n=fo,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=D.T,D.T=null;var o=z.p;z.p=2;var u=en;en|=4;try{y0(t,n.alternate,n)}finally{en=u,z.p=o,D.T=a}}Vn=3}}function q0(){if(Vn===4||Vn===3){Vn=0,Gt();var t=Ds,n=fo,a=ns,o=I0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Vn=5:(Vn=0,fo=Ds=null,$0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Os=null),Cn(a),n=n.stateNode,me&&typeof me.onCommitFiberRoot=="function")try{me.onCommitFiberRoot(fe,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=D.T,u=z.p,z.p=2,D.T=null;try{for(var d=t.onRecoverableError,y=0;y<o.length;y++){var C=o[y];d(C.value,{componentStack:C.stack})}}finally{D.T=n,z.p=u}}(ns&3)!==0&&qc(),Aa(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Ld?El++:(El=0,Ld=t):El=0,Sl(0)}}function $0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,il(n)))}function qc(){return Y0(),W0(),q0(),K0()}function K0(){if(Vn!==5)return!1;var t=Ds,n=Od;Od=0;var a=Cn(ns),o=D.T,u=z.p;try{z.p=32>a?32:a,D.T=null,a=Dd,Dd=null;var d=Ds,y=ns;if(Vn=0,fo=Ds=null,ns=0,(en&6)!==0)throw Error(s(331));var C=en;if(en|=4,O0(d.current),R0(d,d.current,y,a),en=C,Sl(0,!1),me&&typeof me.onPostCommitFiberRoot=="function")try{me.onPostCommitFiberRoot(fe,d)}catch{}return!0}finally{z.p=u,D.T=o,$0(t,n)}}function Z0(t,n,a){n=$i(a,n),n=fd(t.stateNode,n,2),t=Ts(t,n,2),t!==null&&(at(t,2),Aa(t))}function rn(t,n,a){if(t.tag===3)Z0(t,t,a);else for(;n!==null;){if(n.tag===3){Z0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Os===null||!Os.has(o))){t=$i(a,t),a=Qg(2),o=Ts(n,a,2),o!==null&&(Jg(a,o,n,t),at(o,2),Aa(o));break}}n=n.return}}function Pd(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new fy;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Rd=!0,u.add(a),t=gy.bind(null,t,n,a),n.then(t,t))}function gy(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,gn===t&&(Ft&a)===a&&(Rn===4||Rn===3&&(Ft&62914560)===Ft&&300>Re()-kc?(en&2)===0&&ho(t,0):Cd|=a,uo===Ft&&(uo=0)),Aa(t)}function Q0(t,n){n===0&&(n=Se()),t=lr(t,n),t!==null&&(at(t,n),Aa(t))}function xy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Q0(t,a)}function _y(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Q0(t,a)}function vy(t,n){return Y(t,n)}var $c=null,mo=null,Fd=!1,Kc=!1,Bd=!1,Is=0;function Aa(t){t!==mo&&t.next===null&&(mo===null?$c=mo=t:mo=mo.next=t),Kc=!0,Fd||(Fd=!0,yy())}function Sl(t,n){if(!Bd&&Kc){Bd=!0;do for(var a=!1,o=$c;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,C=o.pingedLanes;d=(1<<31-Be(42|t)+1)-1,d&=u&~(y&~C),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,nx(o,d))}else d=Ft,d=pe(o,o===gn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ze(o,d)||(a=!0,nx(o,d));o=o.next}while(a);Bd=!1}}function by(){J0()}function J0(){Kc=Fd=!1;var t=0;Is!==0&&Oy()&&(t=Is);for(var n=Re(),a=null,o=$c;o!==null;){var u=o.next,d=ex(o,n);d===0?(o.next=null,a===null?$c=u:a.next=u,u===null&&(mo=a)):(a=o,(t!==0||(d&3)!==0)&&(Kc=!0)),o=u}Vn!==0&&Vn!==5||Sl(t),Is!==0&&(Is=0)}function ex(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var y=31-Be(d),C=1<<y,H=u[y];H===-1?((C&a)===0||(C&o)!==0)&&(u[y]=Ue(C,n)):H<=n&&(t.expiredLanes|=C),d&=~C}if(n=gn,a=Ft,a=pe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(sn===2||sn===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Et(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ze(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Et(o),Cn(a)){case 2:case 8:a=T;break;case 32:a=J;break;case 268435456:a=Me;break;default:a=J}return o=tx.bind(null,t),a=Y(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Et(o),t.callbackPriority=2,t.callbackNode=null,2}function tx(t,n){if(Vn!==0&&Vn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(qc()&&t.callbackNode!==a)return null;var o=Ft;return o=pe(t,t===gn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(P0(t,o,n),ex(t,Re()),t.callbackNode!=null&&t.callbackNode===a?tx.bind(null,t):null)}function nx(t,n){if(qc())return null;P0(t,n,!0)}function yy(){Ly(function(){(en&6)!==0?Y(O,by):J0()})}function zd(){if(Is===0){var t=Jr;t===0&&(t=rt,rt<<=1,(rt&261888)===0&&(rt=256)),Is=t}return Is}function ix(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:gs(""+t)}function ax(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Ey(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=ix((u[yn]||null).action),y=o.submitter;y&&(n=(n=y[yn]||null)?ix(n.formAction):y.getAttribute("formAction"),n!==null&&(d=n,y=null));var C=new Gr("action","action",null,o,u);t.push({event:C,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Is!==0){var H=y?ax(u,y):new FormData(u);sd(a,{pending:!0,data:H,method:u.method,action:d},null,H)}}else typeof d=="function"&&(C.preventDefault(),H=y?ax(u,y):new FormData(u),sd(a,{pending:!0,data:H,method:u.method,action:d},d,H))},currentTarget:u}]})}}for(var Gd=0;Gd<Ef.length;Gd++){var Hd=Ef[Gd],Sy=Hd.toLowerCase(),My=Hd[0].toUpperCase()+Hd.slice(1);da(Sy,"on"+My)}da(Um,"onAnimationEnd"),da(Pm,"onAnimationIteration"),da(Fm,"onAnimationStart"),da("dblclick","onDoubleClick"),da("focusin","onFocus"),da("focusout","onBlur"),da(Gb,"onTransitionRun"),da(Hb,"onTransitionStart"),da(kb,"onTransitionCancel"),da(Bm,"onTransitionEnd"),re("onMouseEnter",["mouseout","mouseover"]),re("onMouseLeave",["mouseout","mouseover"]),re("onPointerEnter",["pointerout","pointerover"]),re("onPointerLeave",["pointerout","pointerover"]),$("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$("onBeforeInput",["compositionend","keypress","textInput","paste"]),$("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ml="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ty=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ml));function sx(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var y=o.length-1;0<=y;y--){var C=o[y],H=C.instance,le=C.currentTarget;if(C=C.listener,H!==d&&u.isPropagationStopped())break e;d=C,u.currentTarget=le;try{d(u)}catch(xe){fc(xe)}u.currentTarget=null,d=H}else for(y=0;y<o.length;y++){if(C=o[y],H=C.instance,le=C.currentTarget,C=C.listener,H!==d&&u.isPropagationStopped())break e;d=C,u.currentTarget=le;try{d(u)}catch(xe){fc(xe)}u.currentTarget=null,d=H}}}}function Lt(t,n){var a=n[pn];a===void 0&&(a=n[pn]=new Set);var o=t+"__bubble";a.has(o)||(rx(n,t,2,!1),a.add(o))}function kd(t,n,a){var o=0;n&&(o|=4),rx(a,t,o,n)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function Vd(t){if(!t[Zc]){t[Zc]=!0,ua.forEach(function(a){a!=="selectionchange"&&(Ty.has(a)||kd(a,!1,t),kd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Zc]||(n[Zc]=!0,kd("selectionchange",!1,n))}}function rx(t,n,a,o){switch(Ux(n)){case 2:var u=Jy;break;case 8:u=eE;break;default:u=ah}a=u.bind(null,n,a,t),u=void 0,!Pr||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function jd(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var C=o.stateNode.containerInfo;if(C===u)break;if(y===4)for(y=o.return;y!==null;){var H=y.tag;if((H===3||H===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;C!==null;){if(y=xi(C),y===null)return;if(H=y.tag,H===5||H===6||H===26||H===27){o=d=y;continue e}C=C.parentNode}}o=o.return}sc(function(){var le=d,xe=pi(a),ye=[];e:{var ce=zm.get(t);if(ce!==void 0){var de=Gr,Ze=t;switch(t){case"keypress":if(Br(a)===0)break e;case"keydown":case"keyup":de=Kn;break;case"focusin":Ze="focus",de=$o;break;case"focusout":Ze="blur",de=$o;break;case"beforeblur":case"afterblur":de=$o;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=oc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=lc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=kn;break;case Um:case Pm:case Fm:de=cc;break;case Bm:de=Nn;break;case"scroll":case"scrollend":de=uf;break;case"wheel":de=ka;break;case"copy":case"cut":case"paste":de=$t;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=Di;break;case"toggle":case"beforetoggle":de=pf}var lt=(n&4)!==0,un=!lt&&(t==="scroll"||t==="scrollend"),Q=lt?ce!==null?ce+"Capture":null:ce;lt=[];for(var W=le,oe;W!==null;){var ve=W;if(oe=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||oe===null||Q===null||(ve=_s(W,Q),ve!=null&&lt.push(Tl(W,ve,oe))),un)break;W=W.return}0<lt.length&&(ce=new de(ce,Ze,null,a,xe),ye.push({event:ce,listeners:lt}))}}if((n&7)===0){e:{if(ce=t==="mouseover"||t==="pointerover",de=t==="mouseout"||t==="pointerout",ce&&a!==tr&&(Ze=a.relatedTarget||a.fromElement)&&(xi(Ze)||Ze[ri]))break e;if((de||ce)&&(ce=xe.window===xe?xe:(ce=xe.ownerDocument)?ce.defaultView||ce.parentWindow:window,de?(Ze=a.relatedTarget||a.toElement,de=le,Ze=Ze?xi(Ze):null,Ze!==null&&(un=c(Ze),lt=Ze.tag,Ze!==un||lt!==5&&lt!==27&&lt!==6)&&(Ze=null)):(de=null,Ze=le),de!==Ze)){if(lt=oc,ve="onMouseLeave",Q="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(lt=Di,ve="onPointerLeave",Q="onPointerEnter",W="pointer"),un=de==null?ce:ca(de),oe=Ze==null?ce:ca(Ze),ce=new lt(ve,W+"leave",de,a,xe),ce.target=un,ce.relatedTarget=oe,ve=null,xi(xe)===le&&(lt=new lt(Q,W+"enter",Ze,a,xe),lt.target=oe,lt.relatedTarget=un,ve=lt),un=ve,de&&Ze)t:{for(lt=Ay,Q=de,W=Ze,oe=0,ve=Q;ve;ve=lt(ve))oe++;ve=0;for(var st=W;st;st=lt(st))ve++;for(;0<oe-ve;)Q=lt(Q),oe--;for(;0<ve-oe;)W=lt(W),ve--;for(;oe--;){if(Q===W||W!==null&&Q===W.alternate){lt=Q;break t}Q=lt(Q),W=lt(W)}lt=null}else lt=null;de!==null&&ox(ye,ce,de,lt,!1),Ze!==null&&un!==null&&ox(ye,un,Ze,lt,!0)}}e:{if(ce=le?ca(le):window,de=ce.nodeName&&ce.nodeName.toLowerCase(),de==="select"||de==="input"&&ce.type==="file")var Kt=Mm;else if(Em(ce))if(Tm)Kt=Fb;else{Kt=Ub;var Je=Ib}else de=ce.nodeName,!de||de.toLowerCase()!=="input"||ce.type!=="checkbox"&&ce.type!=="radio"?le&&Yt(le.elementType)&&(Kt=Mm):Kt=Pb;if(Kt&&(Kt=Kt(t,le))){Sm(ye,Kt,a,xe);break e}Je&&Je(t,ce,le),t==="focusout"&&le&&ce.type==="number"&&le.memoizedProps.value!=null&&At(ce,"number",ce.value)}switch(Je=le?ca(le):window,t){case"focusin":(Em(Je)||Je.contentEditable==="true")&&(Xr=Je,vf=le,el=null);break;case"focusout":el=vf=Xr=null;break;case"mousedown":bf=!0;break;case"contextmenu":case"mouseup":case"dragend":bf=!1,Lm(ye,a,xe);break;case"selectionchange":if(zb)break;case"keydown":case"keyup":Lm(ye,a,xe)}var St;if(mf)e:{switch(t){case"compositionstart":var Bt="onCompositionStart";break e;case"compositionend":Bt="onCompositionEnd";break e;case"compositionupdate":Bt="onCompositionUpdate";break e}Bt=void 0}else jr?bm(t,a)&&(Bt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Bt="onCompositionStart");Bt&&(xm&&a.locale!=="ko"&&(jr||Bt!=="onCompositionStart"?Bt==="onCompositionEnd"&&jr&&(St=bt()):(Ea=xe,nr="value"in Ea?Ea.value:Ea.textContent,jr=!0)),Je=Qc(le,Bt),0<Je.length&&(Bt=new Ut(Bt,t,null,a,xe),ye.push({event:Bt,listeners:Je}),St?Bt.data=St:(St=ym(a),St!==null&&(Bt.data=St)))),(St=Cb?Nb(t,a):Ob(t,a))&&(Bt=Qc(le,"onBeforeInput"),0<Bt.length&&(Je=new Ut("onBeforeInput","beforeinput",null,a,xe),ye.push({event:Je,listeners:Bt}),Je.data=St)),Ey(ye,t,le,a,xe)}sx(ye,n)})}function Tl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Qc(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=_s(t,a),u!=null&&o.unshift(Tl(t,u,d)),u=_s(t,n),u!=null&&o.push(Tl(t,u,d))),t.tag===3)return o;t=t.return}return[]}function Ay(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function ox(t,n,a,o,u){for(var d=n._reactName,y=[];a!==null&&a!==o;){var C=a,H=C.alternate,le=C.stateNode;if(C=C.tag,H!==null&&H===o)break;C!==5&&C!==26&&C!==27||le===null||(H=le,u?(le=_s(a,d),le!=null&&y.unshift(Tl(a,le,H))):u||(le=_s(a,d),le!=null&&y.push(Tl(a,le,H)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var wy=/\r\n?/g,Ry=/\u0000|\uFFFD/g;function lx(t){return(typeof t=="string"?t:""+t).replace(wy,`
`).replace(Ry,"")}function cx(t,n){return n=lx(n),lx(t)===n}function cn(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Jn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Jn(t,""+o);break;case"className":Ke(t,"class",o);break;case"tabIndex":Ke(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ke(t,a,o);break;case"style":vi(t,o,d);break;case"data":if(n!=="object"){Ke(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=gs(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&cn(t,n,"name",u.name,u,null),cn(t,n,"formEncType",u.formEncType,u,null),cn(t,n,"formMethod",u.formMethod,u,null),cn(t,n,"formTarget",u.formTarget,u,null)):(cn(t,n,"encType",u.encType,u,null),cn(t,n,"method",u.method,u,null),cn(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=gs(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=Yi);break;case"onScroll":o!=null&&Lt("scroll",t);break;case"onScrollEnd":o!=null&&Lt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=gs(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Lt("beforetoggle",t),Lt("toggle",t),Fe(t,"popover",o);break;case"xlinkActuate":Ye(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ye(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ye(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ye(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ye(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ye(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Fe(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Tn.get(a)||a,Fe(t,a,o))}}function Xd(t,n,a,o,u,d){switch(a){case"style":vi(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?Jn(t,o):(typeof o=="number"||typeof o=="bigint")&&Jn(t,""+o);break;case"onScroll":o!=null&&Lt("scroll",t);break;case"onScrollEnd":o!=null&&Lt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Yi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[yn]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Fe(t,a,o)}}}function ai(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Lt("error",t),Lt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var y=a[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:cn(t,n,d,y,a,null)}}u&&cn(t,n,"srcSet",a.srcSet,a,null),o&&cn(t,n,"src",a.src,a,null);return;case"input":Lt("invalid",t);var C=d=y=u=null,H=null,le=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":u=xe;break;case"type":y=xe;break;case"checked":H=xe;break;case"defaultChecked":le=xe;break;case"value":d=xe;break;case"defaultValue":C=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(s(137,n));break;default:cn(t,n,o,xe,a,null)}}Pn(t,d,C,H,le,y,u,!1);return;case"select":Lt("invalid",t),o=y=d=null;for(u in a)if(a.hasOwnProperty(u)&&(C=a[u],C!=null))switch(u){case"value":d=C;break;case"defaultValue":y=C;break;case"multiple":o=C;default:cn(t,n,u,C,a,null)}n=d,a=y,t.multiple=!!o,n!=null?xn(t,!!o,n,!1):a!=null&&xn(t,!!o,a,!0);return;case"textarea":Lt("invalid",t),d=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(C=a[y],C!=null))switch(y){case"value":o=C;break;case"defaultValue":u=C;break;case"children":d=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:cn(t,n,y,C,a,null)}En(t,o,u,d);return;case"option":for(H in a)a.hasOwnProperty(H)&&(o=a[H],o!=null)&&(H==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":cn(t,n,H,o,a,null));return;case"dialog":Lt("beforetoggle",t),Lt("toggle",t),Lt("cancel",t),Lt("close",t);break;case"iframe":case"object":Lt("load",t);break;case"video":case"audio":for(o=0;o<Ml.length;o++)Lt(Ml[o],t);break;case"image":Lt("error",t),Lt("load",t);break;case"details":Lt("toggle",t);break;case"embed":case"source":case"link":Lt("error",t),Lt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(le in a)if(a.hasOwnProperty(le)&&(o=a[le],o!=null))switch(le){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:cn(t,n,le,o,a,null)}return;default:if(Yt(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&Xd(t,n,xe,o,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(o=a[C],o!=null&&cn(t,n,C,o,a,null))}function Cy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,C=null,H=null,le=null,xe=null;for(de in a){var ye=a[de];if(a.hasOwnProperty(de)&&ye!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":H=ye;default:o.hasOwnProperty(de)||cn(t,n,de,null,o,ye)}}for(var ce in o){var de=o[ce];if(ye=a[ce],o.hasOwnProperty(ce)&&(de!=null||ye!=null))switch(ce){case"type":d=de;break;case"name":u=de;break;case"checked":le=de;break;case"defaultChecked":xe=de;break;case"value":y=de;break;case"defaultValue":C=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(s(137,n));break;default:de!==ye&&cn(t,n,ce,de,o,ye)}}Ve(t,y,C,H,le,xe,d,u);return;case"select":de=y=C=ce=null;for(d in a)if(H=a[d],a.hasOwnProperty(d)&&H!=null)switch(d){case"value":break;case"multiple":de=H;default:o.hasOwnProperty(d)||cn(t,n,d,null,o,H)}for(u in o)if(d=o[u],H=a[u],o.hasOwnProperty(u)&&(d!=null||H!=null))switch(u){case"value":ce=d;break;case"defaultValue":C=d;break;case"multiple":y=d;default:d!==H&&cn(t,n,u,d,o,H)}n=C,a=y,o=de,ce!=null?xn(t,!!a,ce,!1):!!o!=!!a&&(n!=null?xn(t,!!a,n,!0):xn(t,!!a,a?[]:"",!1));return;case"textarea":de=ce=null;for(C in a)if(u=a[C],a.hasOwnProperty(C)&&u!=null&&!o.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:cn(t,n,C,null,o,u)}for(y in o)if(u=o[y],d=a[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":ce=u;break;case"defaultValue":de=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&cn(t,n,y,u,o,d)}$n(t,ce,de);return;case"option":for(var Ze in a)ce=a[Ze],a.hasOwnProperty(Ze)&&ce!=null&&!o.hasOwnProperty(Ze)&&(Ze==="selected"?t.selected=!1:cn(t,n,Ze,null,o,ce));for(H in o)ce=o[H],de=a[H],o.hasOwnProperty(H)&&ce!==de&&(ce!=null||de!=null)&&(H==="selected"?t.selected=ce&&typeof ce!="function"&&typeof ce!="symbol":cn(t,n,H,ce,o,de));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var lt in a)ce=a[lt],a.hasOwnProperty(lt)&&ce!=null&&!o.hasOwnProperty(lt)&&cn(t,n,lt,null,o,ce);for(le in o)if(ce=o[le],de=a[le],o.hasOwnProperty(le)&&ce!==de&&(ce!=null||de!=null))switch(le){case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:cn(t,n,le,ce,o,de)}return;default:if(Yt(n)){for(var un in a)ce=a[un],a.hasOwnProperty(un)&&ce!==void 0&&!o.hasOwnProperty(un)&&Xd(t,n,un,void 0,o,ce);for(xe in o)ce=o[xe],de=a[xe],!o.hasOwnProperty(xe)||ce===de||ce===void 0&&de===void 0||Xd(t,n,xe,ce,o,de);return}}for(var Q in a)ce=a[Q],a.hasOwnProperty(Q)&&ce!=null&&!o.hasOwnProperty(Q)&&cn(t,n,Q,null,o,ce);for(ye in o)ce=o[ye],de=a[ye],!o.hasOwnProperty(ye)||ce===de||ce==null&&de==null||cn(t,n,ye,ce,o,de)}function ux(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Ny(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,y=u.initiatorType,C=u.duration;if(d&&C&&ux(y)){for(y=0,C=u.responseEnd,o+=1;o<a.length;o++){var H=a[o],le=H.startTime;if(le>C)break;var xe=H.transferSize,ye=H.initiatorType;xe&&ux(ye)&&(H=H.responseEnd,y+=xe*(H<C?1:(C-le)/(H-le)))}if(--o,n+=8*(d+y)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Yd=null,Wd=null;function Jc(t){return t.nodeType===9?t:t.ownerDocument}function fx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function dx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function qd(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var $d=null;function Oy(){var t=window.event;return t&&t.type==="popstate"?t===$d?!1:($d=t,!0):($d=null,!1)}var hx=typeof setTimeout=="function"?setTimeout:void 0,Dy=typeof clearTimeout=="function"?clearTimeout:void 0,px=typeof Promise=="function"?Promise:void 0,Ly=typeof queueMicrotask=="function"?queueMicrotask:typeof px<"u"?function(t){return px.resolve(null).then(t).catch(Iy)}:hx;function Iy(t){setTimeout(function(){throw t})}function Us(t){return t==="head"}function mx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),vo(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Al(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Al(a);for(var d=a.firstChild;d;){var y=d.nextSibling,C=d.nodeName;d[la]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=y}}else a==="body"&&Al(t.ownerDocument.body);a=u}while(a);vo(n)}function gx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function Kd(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Kd(a),ms(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Uy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[la])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=ea(t.nextSibling),t===null)break}return null}function Py(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ea(t.nextSibling),t===null))return null;return t}function xx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ea(t.nextSibling),t===null))return null;return t}function Zd(t){return t.data==="$?"||t.data==="$~"}function Qd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Fy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function ea(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Jd=null;function _x(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return ea(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function vx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function bx(t,n,a){switch(n=Jc(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Al(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);ms(t)}var ta=new Map,yx=new Set;function eu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var is=z.d;z.d={f:By,r:zy,D:Gy,C:Hy,L:ky,m:Vy,X:Xy,S:jy,M:Yy};function By(){var t=is.f(),n=Xc();return t||n}function zy(t){var n=Oi(t);n!==null&&n.tag===5&&n.type==="form"?Bg(n):is.r(t)}var go=typeof document>"u"?null:document;function Ex(t,n,a){var o=go;if(o&&typeof n=="string"&&n){var u=Xt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),yx.has(u)||(yx.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),ai(n,"link",t),mn(n),o.head.appendChild(n)))}}function Gy(t){is.D(t),Ex("dns-prefetch",t,null)}function Hy(t,n){is.C(t,n),Ex("preconnect",t,n)}function ky(t,n,a){is.L(t,n,a);var o=go;if(o&&t&&n){var u='link[rel="preload"][as="'+Xt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Xt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Xt(a.imageSizes)+'"]')):u+='[href="'+Xt(t)+'"]';var d=u;switch(n){case"style":d=xo(t);break;case"script":d=_o(t)}ta.has(d)||(t=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ta.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(wl(d))||n==="script"&&o.querySelector(Rl(d))||(n=o.createElement("link"),ai(n,"link",t),mn(n),o.head.appendChild(n)))}}function Vy(t,n){is.m(t,n);var a=go;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Xt(o)+'"][href="'+Xt(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=_o(t)}if(!ta.has(d)&&(t=x({rel:"modulepreload",href:t},n),ta.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Rl(d)))return}o=a.createElement("link"),ai(o,"link",t),mn(o),a.head.appendChild(o)}}}function jy(t,n,a){is.S(t,n,a);var o=go;if(o&&t){var u=_i(o).hoistableStyles,d=xo(t);n=n||"default";var y=u.get(d);if(!y){var C={loading:0,preload:null};if(y=o.querySelector(wl(d)))C.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ta.get(d))&&eh(t,a);var H=y=o.createElement("link");mn(H),ai(H,"link",t),H._p=new Promise(function(le,xe){H.onload=le,H.onerror=xe}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,tu(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:C},u.set(d,y)}}}function Xy(t,n){is.X(t,n);var a=go;if(a&&t){var o=_i(a).hoistableScripts,u=_o(t),d=o.get(u);d||(d=a.querySelector(Rl(u)),d||(t=x({src:t,async:!0},n),(n=ta.get(u))&&th(t,n),d=a.createElement("script"),mn(d),ai(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Yy(t,n){is.M(t,n);var a=go;if(a&&t){var o=_i(a).hoistableScripts,u=_o(t),d=o.get(u);d||(d=a.querySelector(Rl(u)),d||(t=x({src:t,async:!0,type:"module"},n),(n=ta.get(u))&&th(t,n),d=a.createElement("script"),mn(d),ai(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Sx(t,n,a,o){var u=(u=te.current)?eu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=xo(a.href),a=_i(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=xo(a.href);var d=_i(u).hoistableStyles,y=d.get(t);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,y),(d=u.querySelector(wl(t)))&&!d._p&&(y.instance=d,y.state.loading=5),ta.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ta.set(t,a),d||Wy(u,t,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=_o(a),a=_i(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function xo(t){return'href="'+Xt(t)+'"'}function wl(t){return'link[rel="stylesheet"]['+t+"]"}function Mx(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function Wy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),ai(n,"link",a),mn(n),t.head.appendChild(n))}function _o(t){return'[src="'+Xt(t)+'"]'}function Rl(t){return"script[async]"+t}function Tx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Xt(a.href)+'"]');if(o)return n.instance=o,mn(o),o;var u=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),mn(o),ai(o,"style",u),tu(o,a.precedence,t),n.instance=o;case"stylesheet":u=xo(a.href);var d=t.querySelector(wl(u));if(d)return n.state.loading|=4,n.instance=d,mn(d),d;o=Mx(a),(u=ta.get(u))&&eh(o,u),d=(t.ownerDocument||t).createElement("link"),mn(d);var y=d;return y._p=new Promise(function(C,H){y.onload=C,y.onerror=H}),ai(d,"link",o),n.state.loading|=4,tu(d,a.precedence,t),n.instance=d;case"script":return d=_o(a.src),(u=t.querySelector(Rl(d)))?(n.instance=u,mn(u),u):(o=a,(u=ta.get(d))&&(o=x({},a),th(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),mn(u),ai(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,tu(o,a.precedence,t));return n.instance}function tu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var C=o[y];if(C.dataset.precedence===n)d=C;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function eh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function th(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var nu=null;function Ax(t,n,a){if(nu===null){var o=new Map,u=nu=new Map;u.set(a,o)}else u=nu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[la]||d[nn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(n)||"";y=t+y;var C=o.get(y);C?C.push(d):o.set(y,[d])}}return o}function wx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function qy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Rx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function $y(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=xo(o.href),d=n.querySelector(wl(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=iu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,mn(d);return}d=n.ownerDocument||n,o=Mx(o),(u=ta.get(u))&&eh(o,u),d=d.createElement("link"),mn(d);var y=d;y._p=new Promise(function(C,H){y.onload=C,y.onerror=H}),ai(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=iu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var nh=0;function Ky(t,n){return t.stylesheets&&t.count===0&&su(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&su(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&nh===0&&(nh=62500*Ny());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&su(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>nh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)su(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var au=null;function su(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,au=new Map,n.forEach(Zy,t),au=null,iu.call(t))}function Zy(t,n){if(!(n.state.loading&4)){var a=au.get(t);if(a)var o=a.get(null);else{a=new Map,au.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),d=a.get(y)||o,d===o&&a.set(null,u),a.set(y,u),this.count++,o=iu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Cl={$$typeof:I,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Qy(t,n,a,o,u,d,y,C,H){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=We(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.hiddenUpdates=We(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function Cx(t,n,a,o,u,d,y,C,H,le,xe,ye){return t=new Qy(t,n,a,y,H,le,xe,ye,C),n=1,d===!0&&(n|=24),d=Ii(3,null,null,n),t.current=d,d.stateNode=t,n=Uf(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},zf(d),t}function Nx(t){return t?(t=qr,t):qr}function Ox(t,n,a,o,u,d){u=Nx(u),o.context===null?o.context=u:o.pendingContext=u,o=Ms(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Ts(t,o,n),a!==null&&(Ai(a,t,n),ol(a,t,n))}function Dx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function ih(t,n){Dx(t,n),(t=t.alternate)&&Dx(t,n)}function Lx(t){if(t.tag===13||t.tag===31){var n=lr(t,67108864);n!==null&&Ai(n,t,67108864),ih(t,67108864)}}function Ix(t){if(t.tag===13||t.tag===31){var n=zi();n=ra(n);var a=lr(t,n);a!==null&&Ai(a,t,n),ih(t,n)}}var ru=!0;function Jy(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=2,ah(t,n,a,o)}finally{z.p=d,D.T=u}}function eE(t,n,a,o){var u=D.T;D.T=null;var d=z.p;try{z.p=8,ah(t,n,a,o)}finally{z.p=d,D.T=u}}function ah(t,n,a,o){if(ru){var u=sh(o);if(u===null)jd(t,n,o,ou,a),Px(t,o);else if(nE(u,t,n,a,o))o.stopPropagation();else if(Px(t,o),n&4&&-1<tE.indexOf(t)){for(;u!==null;){var d=Oi(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ce(d.pendingLanes);if(y!==0){var C=d;for(C.pendingLanes|=2,C.entangledLanes|=2;y;){var H=1<<31-Be(y);C.entanglements[1]|=H,y&=~H}Aa(d),(en&6)===0&&(Vc=Re()+500,Sl(0))}}break;case 31:case 13:C=lr(d,2),C!==null&&Ai(C,d,2),Xc(),ih(d,2)}if(d=sh(o),d===null&&jd(t,n,o,ou,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else jd(t,n,o,null,a)}}function sh(t){return t=pi(t),rh(t)}var ou=null;function rh(t){if(ou=null,t=xi(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return ou=t,null}function Ux(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vt()){case O:return 2;case T:return 8;case J:case he:return 32;case Me:return 268435456;default:return 32}default:return 32}}var oh=!1,Ps=null,Fs=null,Bs=null,Nl=new Map,Ol=new Map,zs=[],tE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Px(t,n){switch(t){case"focusin":case"focusout":Ps=null;break;case"dragenter":case"dragleave":Fs=null;break;case"mouseover":case"mouseout":Bs=null;break;case"pointerover":case"pointerout":Nl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ol.delete(n.pointerId)}}function Dl(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=Oi(n),n!==null&&Lx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function nE(t,n,a,o,u){switch(n){case"focusin":return Ps=Dl(Ps,t,n,a,o,u),!0;case"dragenter":return Fs=Dl(Fs,t,n,a,o,u),!0;case"mouseover":return Bs=Dl(Bs,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return Nl.set(d,Dl(Nl.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,Ol.set(d,Dl(Ol.get(d)||null,t,n,a,o,u)),!0}return!1}function Fx(t){var n=xi(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,oa(t.priority,function(){Ix(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,oa(t.priority,function(){Ix(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function lu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=sh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);tr=o,a.target.dispatchEvent(o),tr=null}else return n=Oi(a),n!==null&&Lx(n),t.blockedOn=a,!1;n.shift()}return!0}function Bx(t,n,a){lu(t)&&a.delete(n)}function iE(){oh=!1,Ps!==null&&lu(Ps)&&(Ps=null),Fs!==null&&lu(Fs)&&(Fs=null),Bs!==null&&lu(Bs)&&(Bs=null),Nl.forEach(Bx),Ol.forEach(Bx)}function cu(t,n){t.blockedOn===n&&(t.blockedOn=null,oh||(oh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,iE)))}var uu=null;function zx(t){uu!==t&&(uu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){uu===t&&(uu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(rh(o||a)===null)continue;break}var d=Oi(a);d!==null&&(t.splice(n,3),n-=3,sd(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function vo(t){function n(H){return cu(H,t)}Ps!==null&&cu(Ps,t),Fs!==null&&cu(Fs,t),Bs!==null&&cu(Bs,t),Nl.forEach(n),Ol.forEach(n);for(var a=0;a<zs.length;a++){var o=zs[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<zs.length&&(a=zs[0],a.blockedOn===null);)Fx(a),a.blockedOn===null&&zs.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],y=u[yn]||null;if(typeof d=="function")y||zx(a);else if(y){var C=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[yn]||null)C=y.formAction;else if(rh(u)!==null)continue}else C=y.action;typeof C=="function"?a[o+1]=C:(a.splice(o,3),o-=3),zx(a)}}}function Gx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function lh(t){this._internalRoot=t}fu.prototype.render=lh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=zi();Ox(a,o,t,n,null,null)},fu.prototype.unmount=lh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Ox(t.current,2,null,t,null,null),Xc(),n[ri]=null}};function fu(t){this._internalRoot=t}fu.prototype.unstable_scheduleHydration=function(t){if(t){var n=za();t={blockedOn:null,target:t,priority:n};for(var a=0;a<zs.length&&n!==0&&n<zs[a].priority;a++);zs.splice(a,0,t),a===0&&Fx(t)}};var Hx=e.version;if(Hx!=="19.2.3")throw Error(s(527,Hx,"19.2.3"));z.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var aE={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:D,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var du=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!du.isDisabled&&du.supportsFiber)try{fe=du.inject(aE),me=du}catch{}}return Il.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=qg,d=$g,y=Kg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Cx(t,1,!1,null,null,a,o,null,u,d,y,Gx),t[ri]=n.current,Vd(t),new lh(n)},Il.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=qg,y=$g,C=Kg,H=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Cx(t,1,!0,n,a??null,o,u,H,d,y,C,Gx),n.context=Nx(null),a=n.current,o=zi(),o=ra(o),u=Ms(o),u.callback=null,Ts(a,u,o),a=o,n.current.lanes=a,at(n,a),Aa(n),t[ri]=n.current,Vd(t),new fu(n)},Il.version="19.2.3",Il}var Zx;function gE(){if(Zx)return fh.exports;Zx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),fh.exports=mE(),fh.exports}var xE=gE();const _E=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),vE=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),Qx=r=>{const e=vE(r);return e.charAt(0).toUpperCase()+e.slice(1)},wv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),bE=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var yE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const EE=we.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>we.createElement("svg",{ref:m,...yE,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:wv("lucide",l),...!c&&!bE(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,_])=>we.createElement(p,_)),...Array.isArray(c)?c:[c]]));const In=(r,e)=>{const i=we.forwardRef(({className:s,...l},c)=>we.createElement(EE,{ref:c,iconNode:e,className:wv(`lucide-${_E(Qx(r))}`,`lucide-${r}`,s),...l}));return i.displayName=Qx(r),i};const SE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],jl=In("arrow-right",SE);const ME=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],qp=In("brain-circuit",ME);const TE=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],AE=In("camera",TE);const wE=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Tr=In("check",wE);const RE=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Rv=In("chevron-down",RE);const CE=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ki=In("circle-check",CE);const NE=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Yl=In("copy",NE);const OE=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Jx=In("download",OE);const DE=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],LE=In("file-text",DE);const IE=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Wl=In("globe",IE);const UE=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Zh=In("image",UE);const PE=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],ji=In("loader-circle",PE);const FE=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],BE=In("log-out",FE);const zE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],GE=In("plus",zE);const HE=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Cv=In("refresh-cw",HE);const kE=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Nv=In("sparkles",kE);const VE=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],jE=In("square",VE);const XE=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],ql=In("trash-2",XE);const YE=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Ov=In("triangle-alert",YE);const WE=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Qh=In("wand-sparkles",WE);const qE=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],$u=In("zap",qE);let Dv="";const Jh=r=>{Dv=r},Ku=()=>Dv,$E=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=Ku();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},$l="v4.0.1",Lv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},mh=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],KE=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,Ni={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Ni.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"};Ni.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"};Ni.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"};Ni.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"};Ni.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"};Ni.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"};Ni.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"};Ni.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"};Ni.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"};Ni.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"};Ni.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"};Ni.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const ZE=["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"],QE={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},JE=`
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
    `,eS=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`;var e_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(e_||(e_={}));var t_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(t_||(t_={}));var n_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(n_||(n_={}));const i_=["user","model","function","system"];var a_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(a_||(a_={}));var s_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(s_||(s_={}));var r_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(r_||(r_={}));var o_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(o_||(o_={}));var Xl;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(Xl||(Xl={}));var l_;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(l_||(l_={}));var c_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(c_||(c_={}));var u_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(u_||(u_={}));class fi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class bo extends fi{constructor(e,i){super(e),this.response=i}}class Iv extends fi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class Zs extends fi{}class Uv extends fi{}const tS="https://generativelanguage.googleapis.com",nS="v1beta",iS="0.24.1",aS="genai-js";var Nr;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Nr||(Nr={}));class sS{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||nS;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||tS}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function rS(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${aS}/${iS}`),e.join(" ")}async function oS(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",rS(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new Zs(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new Zs(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new Zs(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function lS(r,e,i,s,l,c){const f=new sS(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},dS(c)),{method:"POST",headers:await oS(f),body:l})}}async function tc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await lS(r,e,i,s,l,c);return cS(h,m,f)}async function cS(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){uS(l,r)}return s.ok||await fS(s,r),s}function uS(r,e){let i=r;throw i.name==="AbortError"?(i=new Uv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Iv||r instanceof Zs||(i=new fi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function fS(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Iv(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function dS(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function $p(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new bo(`${Ws(r)}`,r);return hS(r)}else if(r.promptFeedback)throw new bo(`Text not available. ${Ws(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new bo(`${Ws(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),f_(r)[0]}else if(r.promptFeedback)throw new bo(`Function call not available. ${Ws(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),zu(r.candidates[0]))throw new bo(`${Ws(r)}`,r);return f_(r)}else if(r.promptFeedback)throw new bo(`Function call not available. ${Ws(r)}`,r)},r}function hS(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function f_(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const pS=[Xl.RECITATION,Xl.SAFETY,Xl.LANGUAGE];function zu(r){return!!r.finishReason&&pS.includes(r.finishReason)}function Ws(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];zu(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Kl(r){return this instanceof Kl?(this.v=r,this):new Kl(r)}function mS(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(b){return new Promise(function(M,R){c.push([g,b,M,R])>1||h(g,b)})})}function h(g,b){try{m(s[g](b))}catch(M){x(c[0][3],M)}}function m(g){g.value instanceof Kl?Promise.resolve(g.value.v).then(p,_):x(c[0][2],g)}function p(g){h("next",g)}function _(g){h("throw",g)}function x(g,b){g(b),c.shift(),c.length&&h(c[0][0],c[0][1])}}const d_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function gS(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=vS(e),[s,l]=i.tee();return{stream:_S(s),response:xS(l)}}async function xS(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return $p(bS(e));e.push(l)}}function _S(r){return mS(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Kl(i.read());if(l)break;yield yield Kl($p(s))}})}function vS(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new fi("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(d_),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new fi(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(d_)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new Uv("Request aborted when reading from the stream"):h=new fi("Error reading from the stream"),h})}}})}function bS(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Pv(r,e,i,s){const l=await tc(e,Nr.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return gS(l)}async function Fv(r,e,i,s){const c=await(await tc(e,Nr.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:$p(c)}}function Bv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Zl(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return yS(e)}function yS(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new fi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new fi("No content is provided for sending chat message.");return s?e:i}function ES(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new Zs("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=Zl(r);s.contents=[c]}return{generateContentRequest:s}}function h_(r){let e;return r.contents?e=r:e={contents:[Zl(r)]},r.systemInstruction&&(e.systemInstruction=Bv(r.systemInstruction)),e}function SS(r){return typeof r=="string"||Array.isArray(r)?{content:Zl(r)}:r}const p_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],MS={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function TS(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new fi(`First content should be with role 'user', got ${s}`);if(!i_.includes(s))throw new fi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(i_)}`);if(!Array.isArray(l))throw new fi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new fi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of p_)m in h&&(c[m]+=1);const f=MS[s];for(const h of p_)if(!f.includes(h)&&c[h]>0)throw new fi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function m_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const g_="SILENT_ERROR";class AS{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(TS(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Zl(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},x=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>Fv(this._apiKey,this.model,_,x)).then(b=>{var M;if(m_(b.response)){this._history.push(p);const R=Object.assign({parts:[],role:"model"},(M=b.response.candidates)===null||M===void 0?void 0:M[0].content);this._history.push(R)}else{const R=Ws(b.response);R&&console.warn(`sendMessage() was unsuccessful. ${R}. Inspect response object for details.`)}g=b}).catch(b=>{throw this._sendPromise=Promise.resolve(),b}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=Zl(e),_={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},x=Object.assign(Object.assign({},this._requestOptions),i),g=Pv(this._apiKey,this.model,_,x);return this._sendPromise=this._sendPromise.then(()=>g).catch(b=>{throw new Error(g_)}).then(b=>b.response).then(b=>{if(m_(b)){this._history.push(p);const M=Object.assign({},b.candidates[0].content);M.role||(M.role="model"),this._history.push(M)}else{const M=Ws(b);M&&console.warn(`sendMessageStream() was unsuccessful. ${M}. Inspect response object for details.`)}}).catch(b=>{b.message!==g_&&console.error(b)}),g}}async function wS(r,e,i,s){return(await tc(e,Nr.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function RS(r,e,i,s){return(await tc(e,Nr.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function CS(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await tc(e,Nr.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class x_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Bv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=h_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Fv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=h_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Pv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new AS(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=ES(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return wS(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=SS(e),l=Object.assign(Object.assign({},this._requestOptions),i);return RS(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return CS(this.apiKey,this.model,e,s)}}class NS{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new fi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new x_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new Zs("Cached content must contain a `name` field.");if(!e.model)throw new Zs("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new Zs(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new x_(this.apiKey,c,s)}}const zv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",OS=["gemini-3.5-flash","gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],DS=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3.5-flash","gemini-3-flash-preview","gemini-2.5-flash-lite"];let Ho="";const Gu=r=>{Ho=r},Kp=()=>Ho,Gv=async()=>{if(!Ho)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${zv}/v1beta/models?key=${Ho}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Hv=async(r,e=null,i=null,s)=>{if(!Ho)throw new Error("API Key is initialized.");const l=new NS(Ho),c=e&&e.length>0?DS:OS;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let _=[];i&&_.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&_.push(...e),_.push({text:r});const x={model:p},g=l.getGenerativeModel(x,{apiVersion:"v1beta",baseUrl:zv}),b=new Promise((L,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),M=e&&e.length>0?[]:[{googleSearch:{}}];let R;try{R=await Promise.race([g.generateContent({contents:[{role:"user",parts:_}],tools:M,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),b])}catch(L){if(M.length>0)console.warn(`[API] Grounding failed for ${p} (${L.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),R=await g.generateContent({contents:[{role:"user",parts:_}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw L}const S=R.response,E=S.candidates||[];if(!E.length)throw S.promptFeedback&&(console.warn("Prompt Feedback:",S.promptFeedback),S.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${S.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=E[0];let I="";try{I=S.text()}catch(L){console.warn(L)}const U=N.content?.parts||[];let k="";if(U.forEach(L=>{L.thought&&(k+=L.thought)}),!I){const L=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${L}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${L})`),new Error(`Empty response (FinishReason: ${L}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:I,thought:k||"通常処理が完了しました。",model:p}}catch(_){console.warn(`Model ${p} failed:`,_.message),_.message.includes("429")||_.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!_.message.includes("フィルター検知")&&!_.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${_.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Gv();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},LS=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Hv,diagnoseConnection:Gv,getApiKey:Kp,setApiKey:Gu},Symbol.toStringTag,{value:"Module"})),IS="modulepreload",US=function(r,e){return new URL(r,e).href},__={},PS=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(_){return Promise.all(_.map(x=>Promise.resolve(x).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(_=>{if(_=US(_,s),_ in __)return;__[_]=!0;const x=_.endsWith(".css"),g=x?'[rel="stylesheet"]':"";if(s)for(let M=f.length-1;M>=0;M--){const R=f[M];if(R.href===_&&(!x||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${g}`))return;const b=document.createElement("link");if(b.rel=x?"stylesheet":IS,x||(b.as="script"),b.crossOrigin="",b.href=_,m&&b.setAttribute("nonce",m),document.head.appendChild(b),x)return new Promise((M,R)=>{b.addEventListener("load",M),b.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${_}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},FS=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],BS=async(r,e,i=[])=>{const s=Kp();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of FS)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,_;if(f.startsWith("gemini")){const x=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(b=>{const M=b.includes(",")?b.split(",")[1]:b,R=b.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:R?R[1]:"image/png",data:M}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:x}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.candidates&&_.candidates.length>0&&_.candidates[0].content&&_.candidates[0].content.parts){const b=_.candidates[0].content.parts.find(M=>M.inlineData);if(b&&b.inlineData&&b.inlineData.data)return{base64Img:b.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),_=await p.json(),_.error)throw new Error(`${_.error.message} (Code: ${_.error.code})`);if(_.predictions&&_.predictions[0]&&_.predictions[0].bytesBase64Encoded)return{base64Img:_.predictions[0].bytesBase64Encoded,usedModel:f};if(_.predictions&&_.predictions[0]&&typeof _.predictions[0]=="string")return{base64Img:_.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await PS(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>LS);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}},zS=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],GS=["gpt-4.1","gpt-4o","gpt-4.1-mini"],HS=async(r,e=null,i=null,s)=>{const l=Ku();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?GS:zS;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0)for(const S of e)S.inlineData&&(p.push({type:"image_url",image_url:{url:`data:${S.inlineData.mimeType};base64,${S.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const _=new AbortController,x=setTimeout(()=>_.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:_.signal})}catch(S){throw S.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):S}finally{clearTimeout(x)}if(!g.ok){const E=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${E}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const M=(await g.json()).choices?.[0];if(!M||!M.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const R=M.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:R,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let ep="gemini";const gh=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),ep="gemini";return}ep=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},Or=async(r,e=null,i=null,s)=>ep==="openai"?HS(r,e,i,s):Hv(r,e,i,s),kS={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},VS={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},jS=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],XS=r=>{const e=VS[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...jS].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},YS=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(kS)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r},xh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},WS=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},qS=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},$S=(r,e,i,s,l=640,c=480)=>new Promise((f,h)=>{const m=new Image;m.onload=()=>{try{const p=document.createElement("canvas");p.width=l,p.height=c;const _=p.getContext("2d"),x=m.width,g=m.height,M=(e%360+360)%360/360*x,R=s/360*x,S=g/2-i/180*g,E=R*(c/l),N=M-R/2,I=Math.max(0,Math.min(g-E,S-E/2)),U=Math.min(E,g);if(N>=0&&N+R<=x)_.drawImage(m,N,I,R,U,0,0,l,c);else if(N<0){const k=-N,L=R-k,B=L/R;_.drawImage(m,x-k,I,k,U,0,0,l*(1-B),c),_.drawImage(m,0,I,L,U,l*(1-B),0,l*B,c)}else{const k=x-N,L=R-k,B=k/R;_.drawImage(m,N,I,k,U,0,0,l*B,c),_.drawImage(m,0,I,L,U,l*B,0,l*(1-B),c)}f(p.toDataURL("image/jpeg",.85))}catch(p){h(p)}},m.onerror=()=>h(new Error("画像の読み込みに失敗しました")),m.src=r}),KS=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,ZS=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},QS=()=>`
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
      `,JS=(r,e)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

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

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`,eM=({randomCategory:r,targetDate:e,inputMode:i,manualTopic:s,newsContext:l,searchTopicKeywords:c,bg360Image:f,bg360Analysis:h,bg360Enabled:m,customLocation:p,forcedLocation:_,customOutfit:x,ragLocationDetails:g,ragReactions:b,punchlineType:M})=>`
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
          Outfit: [${x.trim()?"必ず『"+x.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
          Punchline: [${M!=="Auto"?"必ず『"+Lv(M)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
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
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,iM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,enableChatGPTMode:p,VAR_CAST_LIST_CHATGPT:_,identityMatrix:x,activeOutfit:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4&&!p?`
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
- NOISE REDUCTION (Anti-Glitter & Anti-Noise Protocol):
  * ABSOLUTELY NO ChatGPT-style magical floating particles, NO glittering/sparkling effects, NO dust motes, NO lens flares, NO moiré patterns. Keep the air completely clean and empty.
  * ZERO NOISE TOLERANCE: The final image MUST be completely free of visual noise, grain, micro-texture artifacts, dithering patterns, and any speckle-like artifacts. Every surface must be CLEAN and SMOOTH.
  * NO MICRO-DETAIL CLUTTER: Do NOT fill empty areas with random tiny dots, scratches, dust particles, or halftone-like noise patterns. Clean color fills and smooth gradients ONLY.
  * NO OVER-RENDERING: Do NOT apply photorealistic texture rendering (cloth weave, skin pores, hair strand noise) to anime-style characters. Keep surfaces FLAT and CLEAN as in professional TV anime cel-shading.
- [ POSITIVE SAFE RENDERING BLOCK — APPLY THESE STYLES ]
  Clean anime illustration finish, smooth cel shading, soft clean shading, smooth gradients, clean color surfaces, low texture density, refined but not overly detailed material response, controlled exposure, soft diffused lighting, no visible grain, no speckled texture, no pointillism, no stippling, no dithering, no halftone dots, no noisy particles, no glitter dust, no gritty film grain, no rough paper texture, no canvas grain, no over-sharpened details.
- [ BANNED PROMPT WORD COMBINATIONS — NEVER USE THESE ]
  * Do NOT combine: ultra-detailed + film grain + cinematic
  * Do NOT combine: realistic texture + micro details
  * Do NOT combine: magical particles + glowing dust
  * Do NOT combine: high contrast + sharp details (use clean contrast + smooth edges instead)
  * Do NOT combine: illustrative realism + gritty texture
  * Do NOT use: paper grain, canvas texture, rough texture, grainy texture, overly crisp
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
- Cast details: ${_}
- Identity Anchor: ${x}
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
- No sparkling light particles, no glowing dust, no magical particles, no floating embers, no volumetric dust.
- No film grain, paper grain, canvas texture, or rough textures.

FINAL COMPLIANCE CHECK:
- Output is a new manga scene with 4 distinct story panels, backgrounds, and vertical Japanese speech bubbles.
- Output is NOT a character sheet.
- No floating close-up eyes or partial face crops in the background. Every character must be drawn as a complete physical presence.
- No anatomical distortion from excessive fisheye lens.
- Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
`},aM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,VAR_CAST_LIST:p,identityMatrix:_,activeOutfit:x,dynamicCamera:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4?`
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
`:"",R=x?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:"",S=x?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${x}. Apply tags directly.`:"";return`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
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
${S}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${_}
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
      `},tp=r=>{const e=[];let i=null;if(r.split(`
`).forEach(l=>{const c=l.replace(/\*\*/g,"").trim();if(c.startsWith("## ")){i&&e.push(i);const x=c.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();i={name:x,shortName:x.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!i)return;if(c.includes("髪")||c.toLowerCase().includes("hair")){const x=c.match(/\[WEIGHTS?\]:\s*(.*)/i),g=x?x[1].replace(/\|/g,""):c,b=g.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);b&&!i.hairColor&&(i.hairColor=b[1]);const M=g.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),R=g.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);i.hairStyle||(M?i.hairStyle=M[1]:R&&(i.hairStyle=R[1]))}const f=c.toLowerCase(),h=/\(no[\s_-]*glasses/i.test(f),m=/\([^)]*glasses[\s:]/i.test(f)&&!h;i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES"||(h?i.glasses="LOCKED_NO":m&&(i.glasses="LOCKED_YES")),!(i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES")&&(c.includes("眼鏡")||c.includes("メガネ")||f.includes("eyewear"))&&(f.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(c)?i.glasses="NO":(/(?:あり|有り|有|着用)/i.test(c)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(f))&&(i.glasses="YES"))}),i&&e.push(i),console.log("[IDENTITY MATRIX] Glasses detection results:"),e.forEach(l=>{console.log(`  ${l.shortName}: glasses=${l.glasses}, hair=${l.hairColor} ${l.hairStyle}`)}),e.length===0)return"";let s=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return s+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,e.forEach(l=>{const c=[];l.hairColor&&c.push(`${l.hairColor} hair`),l.hairStyle&&c.push(l.hairStyle),l.glasses==="YES"||l.glasses==="LOCKED_YES"?c.push("MUST HAVE glasses (do NOT remove)"):l.glasses==="NO"||l.glasses==="LOCKED_NO"?c.push("MUST NOT have glasses (bare eyes)"):c.push("check reference image for glasses status"),s+=`- [${l.shortName}]: ${c.join(", ")||"see reference image"}
`}),s+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,s+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,s},yo=(r,e)=>{const s=tp(e).split(`
`).find(l=>l.includes(`[${r}]`));return s?s.split(":").slice(1).join(":").trim():""},sM=(r,e,i)=>{const s=r.match(/\[Camera:\s*(.*?)\]/i);if(s&&s[1]){const c=s[1].trim();let f="";for(const[h,m]of Object.entries(QE))if(c.includes(h)){f=m;break}return f?`${f}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const l=e[i.index%e.length];return i.index++,l},rM=r=>r.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),oM=(r,e)=>{const i=r.match(/\[Camera:\s*(.*?)\]/i);if(i&&i[1])return i[1].trim();const s=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return s[e.index%s.length]},v_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();s.push(m);const p=m.split(/[\(]/)[0].trim();p&&p!==m&&s.push(p);const _=m.match(/[\(]\s*(.*?)\s*[\)]/);_&&s.push(_[1].trim())}});const l=[];let c=1;if(i.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);let m=!1,p=f;if(h&&h[1].trim()){let x=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const g=/[がをにでへはもとからまでより]/.test(x)&&x.length>5,b=x.length>20,M=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(x),R=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(x),S=/[（(]\s*リアクション/i.test(h[1]);g||b||M||R||S||(s.some(E=>{const N=E.split(/[（(]/)[0].trim();return x===E||x===N||N===x||x.includes(N)})||x.includes("全員")||x==="Speaker"||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&(m=!0)}else if(f.trim().startsWith("「")){const _=f.trim();/^「[^」]+」[？！。、!?\s]*$/.test(_)&&(m=!0)}m&&(p=p.replace(/^.*?(?:[:：]|「)\s*/,""),p=p.trim(),p=p.replace(/^「+/,"").replace(/」+$/,""),p=p.replace(/（.*?）|\(.*?\)/g,""),p=p.trim(),p&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++))}),l.length===0){const f=r.match(/「([^」]+)」/g);f&&f.length>0&&f.forEach(h=>{let m=h.replace(/^「/,"").replace(/」$/,"").trim();m=m.replace(/（.*?）|\(.*?\)/g,"").trim();const p=s.filter(g=>{const b=g.split(/[\(（]/)[0].trim();return b&&m.includes(b)}),_=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(m),x=p.length>=2&&_&&m.length>15;m&&!x&&(l.push(`(Speech Bubble ${c}: "${m}")`),c++)})}return l.length===0?"(Characters interact without dialogue in this panel)":l.join(", ")},b_=(r,e,i="")=>{const s=r.split(`
`),l=[];e.split(`
`).forEach(h=>{const m=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(m){const p=m[1].trim();l.push(p);const _=p.split(/[\(]/)[0].trim();_&&_!==p&&l.push(_);const x=p.match(/[\(]\s*(.*?)\s*[\)]/);x&&l.push(x[1].trim())}});let f=s.filter(h=>{const m=h.match(/^(.*?)(?:[:：]|「)/);let p=!1;if(m&&m[1].trim()){let g=m[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();g=g.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const b=/[がをにでへはもとからまでより]/.test(g)&&g.length>5,M=g.length>12,R=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(g),S=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(g.replace(/[（(].*$/,"").trim()),E=/[（(]\s*リアクション/i.test(m[1]);b||M||R||S||E||(l.some(N=>g.includes(N)||N.includes(g))||g==="全員"||g==="Speaker"||m[0].trim().endsWith(":")||m[0].trim().endsWith("："))&&(p=!0)}else if(h.trim().startsWith("「")){const g=h.trim();/^「[^」]+」[？！。、!?\s]*$/.test(g)&&(p=!0)}const _=h.match(/^\[\d+コマ目/),x=h.trim()==="";return!p&&!_&&!x}).join(" ").trim();return f=f.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),f=f.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),f=f||"Characters interacting dynamically based on dialogue.",i&&l.forEach(h=>{const m=h.split("(")[0].trim();i.includes(m)}),f},y_=(r,e)=>e?`(All characters are wearing ${e}) ${r}`:r,hu=(r,e)=>{const s=r.split(`
`).filter(f=>{const h=f.trim();return/^\[EMOTION:/i.test(h)||/^状況[：:]/i.test(h)?!1:h.includes("：")||h.includes(":")||h.includes("「")}),l=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();l.push(m);const p=m.split(/[（(]/)[0].trim();p&&p!==m&&l.push(p)}});const c=[];if(s.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){let m=h[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const p=/[がをにでへはもとからまでより]/.test(m)&&m.length>5,_=m.length>12,x=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(m),g=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(m.replace(/[（(].*$/,"").trim()),b=/[（(]\s*リアクション/i.test(h[1]);if(p||_||x||g||b)return;m&&!c.includes(m)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(m)&&(l.some(M=>{const R=M.split(/[（(]/)[0].trim();return m===M||m===R||R===m})||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&c.push(m)}}),c.length>=3){const f=yo(c[0],e),h=yo(c[1],e),m=yo(c[2],e);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
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
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(c.length>=2){const f=yo(c[0],e),h=yo(c[1],e);return`CRITICAL PLACEMENT & IDENTITY:
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
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(c.length===1){const f=yo(c[0],e);return`CRITICAL PLACEMENT & IDENTITY: [${c[0]}] (${f||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},E_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(x=>{const g=x.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(g){const M=g[1].trim().split("(")[0].trim().split("（")[0].trim();M&&s.push(M)}});const l=[];i.forEach(x=>{const g=x.match(/^(.*?)(?:[:：]|「)/);if(g&&g[1].trim()){let b=g[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();b&&!l.includes(b)&&s.includes(b)&&l.push(b)}});const c=[...l],f=r;s.forEach(x=>{!c.includes(x)&&f.includes(x)&&c.push(x)});let h=0;i.forEach(x=>{const g=x.trim();(g.includes("「")&&g.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(g))&&h++});const m=l.slice(0,3).map(x=>`[${x}]`),p=s.filter(x=>!c.includes(x));p.length>0&&p.forEach(x=>{c.includes(x)||c.push(x)});const _=c.map(x=>`[${x}]`);if(m.length>0){let x=`ANTI-CLONE REMINDER: ${_.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;c.length===1&&h<=1?x+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${_[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${_[0]}. Leave the surrounding space empty rather than adding people.`:c.length===1&&h>=2&&(x+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${_[0]} (monologue/soliloquy). Draw only ${_[0]} — do NOT add a second character just because there are multiple bubbles.`);const g=m.join(" and "),b=_.filter(S=>!m.includes(S)),M=b.length>0?b.join(", "):"NO ONE ELSE",R=`
FOREGROUND MUST CONTAIN ONLY: ${g}.
BACKGROUND MUST CONTAIN ONLY: ${M}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${c.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${g} are the main focus.
${x}${R}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."},lM=r=>{const e=r.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(e){const i=e[1].toUpperCase();if(Ni[i])return i}return"NORMAL"},S_=r=>{const e=lM(r);if(e==="NORMAL")return"";const i=Ni[e],s=[];if(r.split(`
`).forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){const m=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();m&&!s.includes(m)&&s.push(m)}}),s.length>=2&&i.styleMulti){let f=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.styleMulti}`;return i.proportionsMulti&&(f+=`
PROPORTION OVERRIDE: ${i.proportionsMulti}`),i.vfxMulti&&(f+=`
VFX: ${i.vfxMulti}`),f}let c=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.style}`;return i.proportions&&(c+=`
PROPORTION OVERRIDE: ${i.proportions}`),i.vfx&&(c+=`
VFX: ${i.vfx}`),c},cM=(r,e)=>{let i="",s="";const l=r.split(`
`);for(let c=0;c<l.length;c++){const f=l[c].replace(/\*\*/g,"").trim();if(f.startsWith("## ")&&(s=f.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),i+=`
- Character [${s}]: `),!s||e&&(f.includes("服装")||f.includes("Outfit")))continue;const h=f.match(/\[WEIGHTS?\]:\s*(.*)/i);if(h){let p=h[1].replace(/\|/g,"").trim();p&&p!=="()"&&p!=="-"&&(i+=p+", ");continue}const m=f.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);m&&m.length>=2&&(i+=m.join(", ")+", ")}return i.trim()||(i=r.trim()),i.trim()},uM=r=>{const e=[...r];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e},pu=(r,e,i)=>{const s=new RegExp(`\\[${e}.*?\\]([\\s\\S]*?)(?=\\[${i}|$)`,"i"),l=r.match(s);return l?l[1].trim():""},fM=({scenario:r,castList:e,colorMode:i,enableChatGPTMode:s,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,punchlineType:m,systemVersion:p})=>{let _=i==="monochrome";if(i==="auto"){const K=e.toLowerCase();_=K.includes("style_tag: monochrome")||K.includes("monochrome")||K.includes("greyscale")||K.includes("screentone")}const x=_?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",g=JE;let b=r.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||r.split(`
`)[0].substring(0,20);b=b.replace(/^Topic:\s*/i,"").trim();const M=r.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),R=r.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),S=M||"Generic Detailed Background",E=R&&!/^(なし|キャラシート準拠|none|default)/i.test(R)?R:"",N=r.replace(/```(?:json|markdown)?/gi,"").trim(),I=pu(N,"1コマ目","2コマ目")||N,U=pu(N,"2コマ目","3コマ目"),k=pu(N,"3コマ目","4コマ目"),L=pu(N,"4コマ目","UNKNOWN"),B=uM(ZE).slice(0,4),A={index:0},F=cM(e,E),j=s?rM(F):F,G=S,q=b||"4-koma Manga",ie=s?`Generated by ChatGPT with Super FURU AI 4-koma ${p}`:`Generated by Super FURU AI 4-koma ${p}`;let ee="";const V=[I,U,k,L];let D="";s?(D=V.map((K,ue)=>`## Panel ${ue+1}
${S_(K)}
${hu(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
${E_(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
Camera: ${oM(K,A)}
Action: ${y_(b_(K,e,hu(K,e)),E)}
Dialogue (Japanese text inside speech bubbles only): ${v_(K,e)}`).join(`

`),ee=iM({safeTopic:q,watermarkEng:ie,styleCore:x,safeLocation:G,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,enableChatGPTMode:s,VAR_CAST_LIST_CHATGPT:j,identityMatrix:tp(e),activeOutfit:E,panelSections:D})):(D=V.map((ue,ge)=>`## Panel ${ge+1}
${S_(ue)}
${hu(ue,e)}
${E_(ue,e)}
Camera: ${sM(ue,B,A)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${y_(b_(ue,e,hu(ue,e)),E)}.
Dialogue (ONLY inside bubbles): ${v_(ue,e)}.`).join(`

`),ee=eS+aM({safeTopic:q,watermarkEng:ie,styleCore:x,safeLocation:G,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,VAR_CAST_LIST:F,identityMatrix:tp(e),activeOutfit:E,dynamicCamera:g,panelSections:D}));let z=WS(ee.trim());return m==="Documentary"&&(z=qS(z)),z};async function dM({castList:r,categories:e,inputMode:i,manualTopic:s,searchTopic:l,targetDate:c,customLocation:f,customOutfit:h,punchlineType:m,bg360Image:p,bg360Analysis:_,bg360Enabled:x,bg360ImageParts:g,onProgress:b,onCameraProgress:M}){let R="";if(i==="manual")R="手動入力";else{const ie=e.filter(ee=>ee.checked);ie.length>0?R=ie.map(ee=>ee.keywords).join(" "):R="最新ニュース"}const S=`${R} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let E="";if(i==="manual"){E=`
    【ユーザー提供トピック/URL】:
    ${s}
    
    (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
    URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
    `;const ie=/(https?:\/\/[^\s]+)/g,ee=s.match(ie);if(ee&&ee.length>0){b(`手動入力内にURLを検出: ${ee[0]}
> プロキシ経由でコンテンツを取得中...`);try{const V=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(ee[0])}`);if(!V.ok)throw new Error(`HTTP error! status: ${V.status}`);const D=await V.text(),K=new DOMParser().parseFromString(D,"text/html");K.querySelectorAll("script, style").forEach(_e=>_e.remove());const ge=K.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let P="";ge.forEach(_e=>{_e.textContent.trim()&&(P+=_e.textContent.trim()+`
`)}),P.trim()||(P=K.body.textContent||"");const Z=P.replace(/\s+/g," ").substring(0,3e3);b(`コンテンツ抽出完了 (${Z.length}文字)。注入中...`),E=`
        【指定URLから独自のスクレイピングで抽出した内容】:
        ${Z}
        
        (指示): 上記はユーザーが入力したURL（ ${ee[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
        `}catch(V){console.error("URL Fetch Error: ",V),b(`警告: URLコンテンツの取得に失敗しました (${V.message})。LLMの内部知識で補完します。`)}}}const N=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園 of the bench","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],I=N[Math.floor(Math.random()*N.length)],U=p&&_&&x?_.location:f.trim()?f.trim():I,k=XS(U),L=YS(),B=eM({randomCategory:R,targetDate:c,inputMode:i,manualTopic:s,newsContext:E,searchTopicKeywords:S,bg360Image:p,bg360Analysis:_,bg360Enabled:x,customLocation:f,forcedLocation:I,customOutfit:h,ragLocationDetails:k,ragReactions:L,punchlineType:m}),F=await Or(B,g&&x?[g]:[],r,b);let j={topic:R,scenario:""};try{const ie=F.text.match(/Topic:\s*(.+)/i),ee=F.text.match(/Logline:\s*(.+)/i),V=F.text.match(/Location:\s*(.+)/i),D=F.text.match(/Outfit:\s*(.+)/i),z=F.text.match(/Punchline:\s*(.+)/i),K=F.text.match(/Scenario:\s*([\s\S]+)/i);if(K)j.topic=ie?ie[1].trim():R,j.topic=j.topic.replace(/^Topic:\s*/i,"").trim(),j.logline=ee?ee[1].trim():"",j.location=V?V[1].trim():"Generic Background",j.outfit=D?D[1].trim():"",j.punchline=z?z[1].trim():"",j.scenario=K[1].trim();else{const ue=F.text.match(/\{[\s\S]*\}/);if(ue){const ge=JSON.parse(ue[0]);j.topic=ge.topic||R,j.location=ge.location||"Generic Background",j.scenario=ge.scenario||F.text}else{if(F.text.length<20)throw new Error("AI returned empty or invalid response.");j.topic=i==="manual"?s||"Custom Scenario":l||"Generated Scenario",j.scenario=F.text}}}catch(ie){console.warn("Parse warning:",ie),j.scenario=F.text,j.topic="Generated Scenario"}let G=null,q=null;if(p&&_&&x&&g)try{M("🎬 [360° Camera AI] カメラワーク自律設計を開始...");const ie=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${j.scenario}

【360°背景の解析情報】
- 場所: ${_.location}
- 光源: ${_.lighting}
- 空間タイプ: ${_.spatialType}
- 特徴物: ${_.objects||"なし"}
- 雰囲気: ${_.mood||"不明"}

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
}`,V=(await Or(ie,[g],null,M)).text.match(/\{[\s\S]*\}/)?.[0];if(V){G=JSON.parse(V),M("🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中..."),q=[];for(const D of G.panels){const z=await $S(p,D.yaw,D.pitch||0,D.fov||90);q.push(z)}}}catch(ie){console.warn("[360° Camera AI] Camera work design failed:",ie),M(`⚠️ [Camera AI] カメラワーク設計に失敗しました: ${ie.message}`)}return{topic:j.topic,logline:j.logline,location:j.location,outfit:j.outfit,punchline:j.punchline,scenario:j.scenario,cameraWork:G,croppedPanels:q,usedModel:F.model}}async function hM({scenario:r,enhanceCategories:e,castList:i,onProgress:s}){const l=JS(r,e),c=await Or(l,[],i,s);return{text:c.text.trim(),usedModel:c.model}}async function pM({finalPrompt:r,policyErrorMsg:e,onProgress:i,selectedEngine:s}){if(!r||!e)throw new Error("プロンプトとエラーメッセージが必要です。");i("[Phase 1/5] エラーメッセージを解析中..."),i("[Phase 2/5] 問題箇所の特定をAIにリクエスト中...");const l=tM(e.trim(),r),c=await Or(l,[],null,i);if(i("[Phase 3/5] AIの応答を受信・解析中..."),!c.text||c.text.trim().length<10)throw new Error("AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。");i("[Phase 4/5] 置換テーブルをプロンプトに適用中...");let f=[],h=!1;try{let _=c.text.trim();const x=_.match(/```(?:json)?\s*([\s\S]*?)```/);x&&(_=x[1].trim());const g=_.indexOf("["),b=_.lastIndexOf("]");g!==-1&&b!==-1&&(_=_.substring(g,b+1)),f=JSON.parse(_),h=Array.isArray(f)&&f.length>0}catch(_){console.warn("JSON parse error, falling back to full regeneration:",_)}if(h){let _=r,x=0,g=0;for(const b of f)!b.from||!b.to||(_.includes(b.from)?(_=_.replace(b.from,b.to),x++,i(`✅ "${b.from.substring(0,40)}..." → "${b.to.substring(0,40)}..." (${b.reason||""})`)):(g++,i(`⚠️ 未発見（スキップ）: "${b.from.substring(0,50)}..."`)));if(x>0)return{success:!0,method:"replacement",modifiedPrompt:_,appliedCount:x,failedCount:g}}i("[Fallback] 全文再生成モードで修正中...");const m=nM(e.trim(),r),p=await Or(m,[],null,i);if(p.text&&p.text.length>100)return{success:!0,method:"regeneration",modifiedPrompt:p.text.trim()};throw new Error("フォールバックでも適切な応答が得られませんでした。")}function mM(){console.log("System Version Loaded:",$l);const[r,e]=we.useState(""),[i,s]=we.useState(!1),[l,c]=we.useState("gemini"),[f,h]=we.useState("news"),[m,p]=we.useState(""),[_,x]=we.useState(""),[g,b]=we.useState(""),[M,R]=we.useState(""),[S,E]=we.useState(""),[N,I]=we.useState(""),[U,k]=we.useState("Auto"),[L,B]=we.useState(mh),A=Ot=>{B($t=>$t.map(Mt=>Mt.id===Ot?{...Mt,checked:!Mt.checked}:Mt))},F=()=>{const Ot=new Date;return Ot.setHours(Ot.getHours()+9),Ot.toISOString().split("T")[0]},[j,G]=we.useState(F()),[q,ie]=we.useState(""),[ee,V]=we.useState(""),[D,z]=we.useState(""),[K,ue]=we.useState(""),[ge,P]=we.useState(null),[Z,_e]=we.useState(!1);we.useEffect(()=>{const Ot=Kp();Ot?(Gu(Ot),e(Ot)):s(!0)},[]);const[Ae,Oe]=we.useState([]),[te,be]=we.useState(!1),[Ee,He]=we.useState(!1),[qe,Qe]=we.useState(!1),[vt,Xe]=we.useState(!1),[pt,Nt]=we.useState(!1),[ct,Rt]=we.useState(""),[zt,$e]=we.useState(""),[Y,Et]=we.useState(""),[ut,Gt]=we.useState(""),[Re,Vt]=we.useState("auto"),[O,T]=we.useState(!1),[J,he]=we.useState([]),[Me,Ne]=we.useState(""),[Pe,fe]=we.useState(!1),[me,De]=we.useState(""),[Be,Le]=we.useState(!1),[Ie,it]=we.useState(!1),[rt,mt]=we.useState(!1),[X,Ce]=we.useState(!1),[pe,ze]=we.useState(!1),[Ue,Se]=we.useState(!1),[We,at]=we.useState(!1),[hn,Ct]=we.useState(!1),[qn,Un]=we.useState(!1),[ra,Cn]=we.useState(""),[za,oa]=we.useState(!1),[Mn,nn]=we.useState(""),[yn,ri]=we.useState(!1),[pn,ba]=we.useState(!1),[ya,Ga]=we.useState(!1),[la,ms]=we.useState(""),[xi,Oi]=we.useState(!1),[ca,_i]=we.useState(!1),[mn,ua]=we.useState(!1),[w,$]=we.useState(!1),[re,ne]=we.useState(null),[ae,Ge]=we.useState(null),[ke,Fe]=we.useState(null),[Ke,Ye]=we.useState(!1),[nt,xt]=we.useState(""),[tt,jt]=we.useState(!1),[tn,qt]=we.useState(!1),[Qt,Xt]=we.useState(null),[Ve,Pn]=we.useState(null),[At,xn]=we.useState(!1),[$n,En]=we.useState(!1),Jn=we.useRef(!1);we.useEffect(()=>{Jn.current=$n},[$n]);const[Jt,_n]=we.useState(!1),vi=we.useRef(!1),[Yt,Tn]=we.useState(0),[Ha,gs]=we.useState(0),[Yi,tr]=we.useState(0),pi=we.useRef(!1),[xs,oi]=we.useState(!1),Wo=we.useRef(null),Ur=we.useRef(null),sc=we.useRef(null),_s=we.useRef(null),bi=we.useRef(null);we.useEffect(()=>{bi.current&&(bi.current.scrollTop=bi.current.scrollHeight)},[J]),qe||!q||q.length<20||!ee||ee.length<20;const[Pr,Wi]=we.useState(""),[Ea,nr]=we.useState([]),Fr=Ot=>{const $t=Ot.replace(/[^\u0000-\u007F]/g,"").trim();$t!==Ot&&bt("APIキーに含まれる不要な文字を自動削除しました。"),$t.startsWith("sk-")?(Jh($t),gh("openai"),c("openai"),ba(!0),ri(!0),e("openai-engine-active"),s(!1),bt("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(Gu($t),e($t),gh("gemini"),c("gemini"),s(!1),bt("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},bt=Ot=>{Gt(Ot),setTimeout(()=>Gt(""),4e3)},Br=async Ot=>{if(!r){bt("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(Ot.length===0)return;be(!0),Rt(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let $t=0;const Mt=setInterval(()=>{$t++,Rt(ft=>{if($t<=10){const Pt=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return ft+Pt[Math.floor(Math.random()*Pt.length)]}const Te=`
> ⏳ AI応答を待機中... (${Math.floor($t*.8)}秒経過)`,et=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return et.test(ft)?ft.replace(et,"")+Te:ft+Te})},800),Ut=[];let ht=null;for(let ft=0;ft<Ot.length;ft++){const ot=Ot[ft],Te=await new Promise(Pt=>{const Kn=new FileReader;Kn.onload=Di=>{const Vr=Di.target.result,kn=new Uint8Array(Vr);let yi=!1;const Nn="equirectangular";let An=0;for(let sr=0;sr<Math.min(kn.length,65536);sr++)if(kn[sr]===Nn.charCodeAt(An)){if(An++,An===Nn.length){yi=!0;break}}else An=0;const ka=new Image;ka.onload=()=>{const sr=ka.naturalWidth/ka.naturalHeight,pf=Math.abs(sr-2)<.15;Pt(pf&&yi)},ka.onerror=()=>Pt(!1),ka.src=URL.createObjectURL(ot)};const an=ot.slice(0,65536);Kn.readAsArrayBuffer(an)}),et=new FileReader;et.readAsDataURL(ot),await new Promise(Pt=>{et.onload=()=>{Te&&!ht?(ht={base64:et.result,mimeType:ot.type},Rt(Kn=>Kn+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(Ut.push(et.result),Oe(Kn=>[...Kn,et.result])),Pt()}})}if(ht)try{qt(!0),ne(ht.base64);const ft=ht.base64.split(",")[1],ot={inlineData:{mimeType:ht.mimeType,data:ft}};Ge(ot),Ye(!0),Rt(Pt=>Pt+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const Te=await Or(KS(),[ot],null,()=>{}),et=ZS(Te.text);Fe(et),b(et.location),bt(`🌐 360°背景を検出: ${et.location}`),Rt(Pt=>Pt+`
> 🌐 空間解析完了: ${et.location}`)}catch(ft){console.warn("[360° BG] Analysis failed:",ft),Fe({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像（解析失敗）")}finally{Ye(!1)}if(Ut.length===0&&ht){clearInterval(Mt),be(!1),Rt(ft=>ft+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),bt("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(Ut.length===0){clearInterval(Mt),be(!1);return}bt(`思考モード: ${Ut.length}枚のキャラクター設定画を同時解析中...${ht?"（+ 360°背景1枚検出済み）":""}`);try{const ft=Ut.map(et=>{const Pt=et.split(",")[1];return{inlineData:{mimeType:et.split(";")[0].split(":")[1],data:Pt}}}),ot=QS(),Te=await Or(ot,ft,null,et=>{Rt(Pt=>Pt+`
> ${et}`)});ie(Te.text),P(Te.model),Rt(et=>{const Pt=`

--- ✅ 解析完了 ---
`,Kn=Te.thought&&Te.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${Te.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return et+Pt+Kn}),bt("全キャラクターの解析が完了しました。"),Jn.current&&(pi.current?(En(!1),Tn(0),oi(!1),bt("⏹ フルオートを中断しました。")):tr(et=>et+1))}catch(ft){console.error(ft);const ot=xh(ft.message);Rt(Te=>Te+`

[システムエラー]: ${ft.message}
--------------------------------------------------
${ot}`),bt("解析エラー: "+ft.message),Jn.current&&(En(!1),Tn(0),oi(!1))}finally{clearInterval(Mt),be(!1)}},zr=async()=>{if(!ee||ee.length<20)return bt("先にシナリオを生成してください。");if(!(Ie||rt||X||pe||Ue||We||hn))return bt("少なくとも1つの強化カテゴリをONにしてください。");if(qn)return;Un(!0),Cn("> [START] シナリオ強化を開始します..."),Mn||(nn(ee),Cn(ht=>ht+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const $t=[];Ie&&$t.push("【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。..."),rt&&$t.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。"),X&&$t.push("【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください。"),pe&&$t.push("【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。"),Ue&&$t.push("【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。"),We&&$t.push("【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。"),Cn(ht=>ht+`
> [CONFIG] 強化カテゴリ: ${$t.length}個`);let Mt=0;const Ut=setInterval(()=>{Mt++,Cn(ht=>{const ot=`
> ⏳ AI応答を待機中... (${Math.floor(Mt*.8)}秒経過)`,Te=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return Te.test(ht)?ht.replace(Te,"")+ot:ht+ot})},800);try{Cn(ft=>ft+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const ht=await hM({scenario:ee,enhanceCategories:$t,castList:q,onProgress:ft=>Cn(ot=>ot+`
> [API] ${ft}`)});ht&&ht.text&&ht.text.length>50?(V(ht.text),Cn(ft=>ft+`
> [SUCCESS] シナリオを強化しました！（${ht.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),it(!1),mt(!1),Ce(!1),ze(!1),Se(!1),at(!1),Ct(!1),bt("シナリオ強化完了！")):(Cn(ft=>ft+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),bt("強化失敗: AIの応答が不十分です"))}catch(ht){Cn(ft=>ft+`
> [ERROR] ${ht.message}`),bt("強化エラー: "+ht.message)}finally{clearInterval(Ut),Un(!1)}},rc=()=>{Mn&&(V(Mn),nn(""),Cn(Ot=>Ot+`
> [REVERT] 元のシナリオに復元しました。`),bt("シナリオを元に戻しました"))},ei=async(Ot,$t=null)=>{if(!q)return bt("先にキャラクターを解析してください。");if(Ee)return;const Mt=Array.isArray(Ot)?Ot:L,Ut=$t||f;if(Ut==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(Ut==="news"&&!Mt.find(Te=>Te.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}He(!0),$e(""),ue(""),Wi(null),Et(""),he([]),nn(""),Cn("");let ht="";if(Ut==="manual")ht="手動入力",V(""),$e(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const Te=Mt.filter(et=>et.checked);Te.length>0?(ht=Te.map(et=>et.keywords).join(" "),bt(`カテゴリ「${Te.map(et=>et.label).join("・")}」で最新ニュースを検索中... (${j})`),V(""),$e(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Te.map(et=>et.label).join("、")} (キーワード: ${ht}) 
 > 対象日付: ${j} 
 > Google Grounding で検索中...`)):ht="最新ニュース"}let ft=0;const ot=setInterval(()=>{ft++,$e(Te=>{if(ft<=8){const an=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Te+an[Math.floor(Math.random()*an.length)]}const Pt=`
> ⏳ AI応答を待機中... (${Math.floor(ft*.8)}秒経過)`,Kn=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return Kn.test(Te)?Te.replace(Kn,"")+Pt:Te+Pt})},800);try{const Te=await dM({castList:q,categories:Mt,inputMode:Ut,manualTopic:m,searchTopic:_,targetDate:j,customLocation:g,customOutfit:M,punchlineType:U,bg360Image:re,bg360Analysis:ke,bg360Enabled:tn,bg360ImageParts:ae,onProgress:kn=>$e(yi=>yi+`
 > [API] ${kn} `),onCameraProgress:kn=>{kn.startsWith("🎬")?($e(yi=>yi+`
 > ${kn}`),kn.includes("開始")?xn(!0):(kn.includes("完了")||kn.includes("失敗"))&&xn(!1)):$e(yi=>yi+`
 > [Camera AI] ${kn}`)}});if(P(Te.usedModel),E(g.trim()||Te.location||"Unspecified"),I(M.trim()||Te.outfit||""),Te.cameraWork){Xt(Te.cameraWork);const kn=An=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((An%360+360)%360/45)%8],yi=An=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[An]||An;let Nn=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Te.cameraWork.panels.forEach(An=>{Nn+=`
 > 🎬 コマ${An.panel}: ${kn(An.yaw)} (yaw:${An.yaw}°) / ${yi(An.camera)} / FOV:${An.fov}°`,Nn+=`
 >    └─ ${An.reasoning}`}),Nn+=`
 > 🎬 ══════════════════════════════════`,$e(An=>An+Nn)}Te.croppedPanels&&(Pn(Te.croppedPanels),$e(kn=>kn+`
 > 🔲 [Crop] ✅ ${Te.croppedPanels.length}枚のクロップ画像を生成しました`));const et=Te.logline?`
Logline: ${Te.logline}`:"",Pt=M.trim()||Te.outfit?`
Outfit: ${M.trim()||Te.outfit}`:"",Kn=Te.punchline?`
Punchline: ${Te.punchline}`:"",an=re?tn?`
🌐 360°背景: ON (${ke?.location||"解析済み"} / ${ke?.spatialType==="indoor"?"室内":ke?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";let Di="";if(Te.cameraWork){const kn=Nn=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Nn%360+360)%360/45)%8],yi=Nn=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Nn]||Nn;Di=`
🎬 360° Camera Work:`,Te.cameraWork.panels.forEach(Nn=>{Di+=`
  Panel${Nn.panel}: ${kn(Nn.yaw)}(${Nn.yaw}°) ${yi(Nn.camera)} FOV${Nn.fov}° — ${Nn.reasoning}`})}const Vr=`## タイトル: ${Te.topic} !?${et}
Location: ${Te.location||"Unspecified"}${Pt}${Kn}${an}${Di}

${Te.scenario} `;return V(Vr),bt("シナリオの生成が完了しました！"),xn(!1),Vr}catch(Te){console.error(Te);const et=xh(Te.message);return $e(Pt=>Pt+`

[システムエラー]: ${Te.message}
--------------------------------------------------
${et}`),bt("シナリオ生成エラー"),xn(!1),null}finally{clearInterval(ot),He(!1)}},fa=async(Ot=!1,$t=null,Mt=null)=>{const Ut=$t||ee;if(!Ot&&(!q||!Ut))return bt("キャストとシナリオが必要です。");Qe(!0),ue(""),he([]),Ne(""),De(""),Le(!1),Et("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const ht=Mt!==null?Mt:yn,ft=setInterval(()=>{Et(ot=>{if(ot.length>800)return ot;const Te=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!qe)return ot;const et=Te[Math.floor(Math.random()*Te.length)];return ot+et})},600);try{const ot=fM({scenario:Ut,castList:q,colorMode:Re,enableChatGPTMode:ht,bg360Image:re,bg360Analysis:ke,bg360Enabled:tn,bg360CroppedPanels:Ve,punchlineType:U,systemVersion:$l});return await new Promise(Te=>setTimeout(Te,800)),U==="Documentary"&&Et(Te=>Te+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`),Et(Te=>Te+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ue(ot),Et(Te=>Te+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),bt("最終プロンプトの構築が完了しました。画像生成を開始します..."),ot}catch(ot){console.error(ot);const Te=xh(ot.message);return Et(et=>et+`

[システムエラー]: ${ot.message}
--------------------------------------------------
${Te}`),bt("生成エラー: "+ot.message),null}finally{clearInterval(ft),Qe(!1)}};we.useEffect(()=>{K&&!qe&&cc>=3&&fa()},[yn]);const Gr=()=>{V(""),ue(""),Wi(null),$e(""),Et(""),he([]),En(!1),Tn(0),b(""),R(""),ne(null),Ge(null),Fe(null),Xt(null),Pn(null),xn(!1),B(mh),p(""),x(""),E(""),I(""),qt(!1),k("Auto"),h("news"),nn(""),it(!1),mt(!1),Ce(!1),ze(!1),Se(!1),at(!1),Ct(!1),Un(!1),Cn(""),oa(!1),Ne(""),fe(!1),De(""),Le(!1),_i(!1),ua(!1),bt("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},ir=()=>{ie(""),V(""),ue(""),Oe([]),Wi(null),Rt(""),$e(""),Et(""),En(!1),Tn(0),b(""),R(""),ne(null),Ge(null),Fe(null),Xt(null),Pn(null),xn(!1),P(null),nr([]),he([]),B(mh),p(""),x(""),E(""),I(""),qt(!1),k("Auto"),h("news"),nn(""),it(!1),mt(!1),Ce(!1),ze(!1),Se(!1),at(!1),Ct(!1),Un(!1),Cn(""),oa(!1),Ne(""),fe(!1),De(""),Le(!1),Oi(!1),_i(!1),ua(!1),e(""),Gu(""),Jh(""),gh(""),c(""),ba(!1),ri(!1),s(!0),bt("全データをリセットしました。APIキーを再入力してください。")},[uf,Hr]=we.useState(!1),[qo,ar]=we.useState(!1),[kr,oc]=we.useState(!1),ff=()=>{K&&(navigator.clipboard.writeText(K),Hr(!0),setTimeout(()=>Hr(!1),2e3),bt("クリップボードにコピーしました！"))},lc=async(Ot=!1,$t=null)=>{const Mt=$t||K;if(vt||!Ot&&!Mt)return!1;Xe(!0),Nt(!1);const Ut=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];yn&&(l==="openai"?Ut.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):Ut.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),he(Ut);let ht=0;const ft=setInterval(()=>{ht++;const ot=Math.floor(ht*1.5);he(Te=>{const et=Te.findIndex(Pt=>Pt.startsWith("[WAIT]"));if(et!==-1){const Pt=[...Te];return Pt[et]=`[WAIT] ⏳ 画像生成API応答を待機中... (${ot}秒経過)`,Pt}return[...Te,`[WAIT] ⏳ 画像生成API応答を待機中... (${ot}秒経過)`]})},1500);await new Promise(ot=>setTimeout(ot,800));try{bt(pn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),he(an=>[...an,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(an=>setTimeout(an,1e3));const ot=an=>{he(Di=>[...Di,an])};let Te,et;if(pn){ot("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const an=await $E(Mt,ot);Te=an.base64Img,et=an.usedModel}else{const an=Ve&&tn&&Ve.length===4?Ve:[];an.length>0&&ot(`[REF] 360°背景クロップ画像 ${an.length}枚を参照画像として添付`);const Di=await BS(Mt,ot,an);Te=Di.base64Img,et=Di.usedModel}he(an=>[...an,`[4/5] データストリーム受信完了 (Model: ${et})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const Pt=`data:image/png;base64,${Te}`;Wi(Pt),nr(an=>[{id:Date.now(),img:Pt},...an]);const Kn=et&&et.startsWith("gpt-");return et&&!et.startsWith("gemini-3")&&!Kn?(_e(!0),he(an=>[...an,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${pn?"ChatGPT":"Gemini"}(Web版)を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${pn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(_e(!1),he(an=>[...an,"[COMPLETE] Image successfully generated."])),bt("画像生成完了！"),!0}catch(ot){console.error(ot),Nt(!0),Wi(null);const Te=ot.message||"";let et=[];return Te.includes("Unknown parameter")||Te.includes("invalid")||Te.includes("Invalid")?et=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${pn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Te.includes("sensitive")||Te.includes("Responsible AI")||Te.includes("400")&&!Te.includes("Unknown parameter")?(Ne(Te),Le(!0),et=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):Te.includes("not found")||Te.includes("not supported")||Te.includes("404")||Te.includes("403")||Te.includes("401")?et=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${pn?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${pn?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:et=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${pn?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${pn?"ChatGPT":"Gemini"} (Web版) を開く: ${pn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],he(Pt=>[...Pt,`[ERROR] ${ot.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...et]),bt(`生成エラー: ${ot.message} `),!1}finally{clearInterval(ft),Xe(!1)}},df=async()=>{if(!K||!Me.trim())return;fe(!0),De("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let Ot=0;const $t=setInterval(()=>{Ot++,De(Mt=>{const ht=`
> ⏳ AI分析中... (${Math.floor(Ot*1)}秒経過)`,ft=/\n> ⏳ AI分析中\.\.\..*\(\d+秒経過\)/;return ft.test(Mt)?Mt.replace(ft,ht):Mt+ht})},1e3);try{const Mt=await pM({finalPrompt:K,policyErrorMsg:Me,selectedEngine:l,onProgress:Ut=>De(ht=>ht+`
> ${Ut}`)});Mt.success&&Mt.modifiedPrompt&&(ue(Mt.modifiedPrompt),Mt.method==="replacement"?De(Ut=>Ut+`
> [Phase 5/5] ✅ ${Mt.appliedCount}箇所を修正しました（${Mt.failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`):De(Ut=>Ut+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),De(Ut=>Ut+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),Ne(""))}catch(Mt){console.error(Mt),De(Ut=>Ut+`
> [ERROR] ${Mt.message}`)}finally{clearInterval($t),fe(!1)}};we.useEffect(()=>{Yi>0&&!pi.current&&$o()},[Yi]);const $o=async()=>{if(!q||q.length<20){bt("先にキャラクターシートをアップロードしてください。"),En(!1);return}pi.current=!1,En(!0),ri(!1),Tn(2);const Ot=[...L].sort(()=>Math.random()-.5),$t=Math.random()>.5?2:1,Mt=Ot.slice(0,$t).map(Te=>Te.id),Ut=L.map(Te=>({...Te,checked:Mt.includes(Te.id)}));B(Ut),b(""),R(""),h("news"),await new Promise(Te=>setTimeout(Te,200)),Wo.current?.scrollIntoView({behavior:"smooth",block:"start"});const ht=await ei(Ut,"news");if(pi.current||!ht){En(!1),Tn(0),oi(!1),pi.current&&bt("⏹ フルオートを中断しました。");return}Tn(3),Ur.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(Te=>setTimeout(Te,300));const ft=await fa(!0,ht,!1);if(pi.current||!ft){En(!1),Tn(0),oi(!1),pi.current&&bt("⏹ フルオートを中断しました。");return}Tn(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(Te=>setTimeout(Te,300));const ot=await lc(!0,ft);await new Promise(Te=>setTimeout(Te,800)),_s.current?.scrollIntoView({behavior:"smooth",block:"center"}),vi.current?pi.current?(En(!1),Tn(0),oi(!1),bt("⏹ 連続生成を中断しました。")):(bt("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{pi.current||tr(Te=>Te+1)},2e3)):(En(!1),Tn(0),oi(!1),ot&&bt("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},hf=()=>{if($n){pi.current=!0,Yt>0||te||Ee||qe||vt?(oi(!0),bt("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(En(!1),Tn(0),oi(!1),bt("フルオートを解除しました。"));return}pi.current=!1,oi(!1),En(!0),q&&q.length>=20?tr(Ot=>Ot+1):bt("🚀 フルオート待機中: キャラクターシートをドロップしてください")},cc=!q||q.length<1?1:!ee||ee.length<1?2:K?Pr?5:4:3;return{analyzeThought:ct,apiKey:r,assemblePrompt:fa,assembleThought:Y,bg360Analysis:ke,bg360CameraWork:Qt,bg360CroppedPanels:Ve,bg360Enabled:tn,bg360Image:re,castList:q,categories:L,colorMode:Re,copyPrompt:ff,currentStep:cc,customLocation:g,customOutfit:M,enableChatGPTMode:yn,enableOpenAIApi:pn,enhanceBackgrounds:pe,enhanceBodyLang:rt,enhanceCameraWork:Ue,enhanceDialogue:We,enhanceEffects:X,enhanceExpressions:Ie,enhanceLog:ra,enhanceScenario:zr,finalPrompt:K,fullAutoStep:Yt,genLog:J,genLogRef:bi,generateScenarioFromNews:ei,generatedImage:Pr,generationHistory:Ea,handleFullAutoToggle:hf,handleSetKey:Fr,hardReset:ir,imageResultRef:_s,images:Ae,inputMode:f,is360Analyzing:Ke,is360CameraWorking:At,isAborting:xs,isAnalyzing:te,isAssembling:qe,isCastListCopied:xi,isCopied:uf,isDragging:O,isEndlessMode:Jt,isEndlessModeRef:vi,isEnhancePanelOpen:za,isEnhancing:qn,isFallbackUsed:Z,isFixPromptCopied:qo,isFixingPolicy:Pe,isFullAutoMode:$n,isGeneratingImage:vt,isMetaSaved:mn,isPolicyCopied:kr,isPolicyPanelOpen:Be,isScenarioCopied:ca,isSearching:Ee,mangaTitle:D,manualTopic:m,originalScenario:Mn,outputRef:sc,partialReset:Gr,policyErrorMsg:Me,policyFixLog:me,processFiles:Br,punchlineType:U,regenerateImage:lc,regenerateSafePrompt:df,revertScenario:rc,scenario:ee,scenarioThought:zt,selectedEngine:l,setBg360Enabled:qt,setCastList:ie,setCustomLocation:b,setCustomOutfit:R,setEnableOpenAIApi:ba,setEnhanceBackgrounds:ze,setEnhanceBodyLang:mt,setEnhanceCameraWork:Se,setEnhanceDialogue:at,setEnhanceEffects:Ce,setEnhanceExpressions:it,setGeneratedImage:Wi,setGenerationHistory:nr,setImages:Oe,setInputMode:h,setIsCastListCopied:Oi,setIsDragging:T,setIsEndlessMode:_n,setIsEnhancePanelOpen:oa,setIsFixPromptCopied:ar,setIsMetaSaved:ua,setIsPolicyCopied:oc,setIsPolicyPanelOpen:Le,setIsScenarioCopied:_i,setManualTopic:p,setPolicyErrorMsg:Ne,setPunchlineType:k,setScenario:V,setShowModal:s,setShowOpenAIKeyModal:Ga,setTargetDate:G,showModal:i,showOpenAIKeyModal:ya,showStatus:bt,status:ut,step2Ref:Wo,step3Ref:Ur,targetDate:j,toggleCategory:A,usedModel:ge}}const M_=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=we.useState(""),[f,h]=we.useState("");if(we.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",_=s==="openai",x=p,g=l.trim().startsWith("sk-"),b=_?"OpenAI API Key が必要です":x?"AI Engine を選択":"API Key が必要です",M=x?"Gemini AI Key または OpenAI Key (sk-...) を入力...":_?"sk-proj-...":"Google AI API Key を入力...",R="https://aistudio.google.com/app/apikey",S="https://platform.openai.com/api-keys",E=_?S:R,N=_?"🔑 OpenAI キーを取得":"🔑 キーを取得",I=x&&g||_?"emerald":"blue",U=I==="emerald"?"bg-emerald-600":"bg-blue-600",k=I==="emerald"?"border-emerald-500/30":"border-blue-500/30",L=I==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=I==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",A=I==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=I==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return v.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:v.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:v.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${k} rounded-xl shadow-2xl ${L} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&v.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),v.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),v.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[v.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[v.jsx("div",{className:`p-2 ${U} rounded-lg animate-pulse transition-colors duration-300`,children:v.jsx($u,{size:18,className:"text-white"})}),v.jsxs("div",{children:[v.jsx("p",{className:"text-sm font-bold text-white",children:b}),v.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),v.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[v.jsx("div",{className:"flex gap-2",children:v.jsxs("form",{onSubmit:j=>{j.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[v.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:j=>c(j.target.value),placeholder:M,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${A} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:j=>j.key==="Enter"&&m(),autoFocus:!0}),v.jsx("button",{onClick:m,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&v.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),x?v.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[v.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&v.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),v.jsxs("div",{className:"flex items-center gap-4",children:[v.jsx("a",{href:R,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),v.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),v.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):v.jsx("div",{className:"flex justify-end",children:v.jsx("a",{href:E,target:"_blank",rel:"noreferrer",className:`text-[11px] ${I==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class kv extends uE.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?v.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[v.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",$l,")"]}),v.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),v.jsx("br",{}),this.state.errorInfo?.componentStack]}),v.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}const Zu=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=we.useRef(null);we.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:v.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[v.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),v.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[v.jsx(qp,{size:16})," Neural Process (Thinking Mode)"]}),v.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&v.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};function gM({apiKey:r,isDragging:e,setIsDragging:i,processFiles:s,images:l,setImages:c,bg360Image:f,bg360Enabled:h,isAnalyzing:m,analyzeThought:p,castList:_,setCastList:x,isCastListCopied:g,setIsCastListCopied:b,currentStep:M,setShowModal:R}){return v.jsxs("section",{onDragOver:S=>{S.preventDefault(),r&&i(!0)},onDragLeave:()=>i(!1),onDrop:S=>{S.preventDefault(),i(!1),r&&s(S.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
        ${e?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
        ${M===1&&!e?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
        ${M>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[v.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[v.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${M===1?"text-blue-400":"text-slate-500"} `,children:[v.jsx(AE,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),m&&v.jsx(ji,{size:18,className:"animate-spin text-blue-400"}),M>1&&v.jsx(ki,{size:18,className:"text-blue-500"})]}),v.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[l.map((S,E)=>v.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[v.jsx("img",{src:S,className:"w-full h-full object-cover shadow-sm",alt:`char-${E}`}),v.jsx("button",{onClick:()=>c(l.filter((N,I)=>I!==E)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:v.jsx(ql,{size:16})})]},E)),f&&v.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${h?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[v.jsx("img",{src:f,className:`w-full h-full object-cover shadow-sm ${h?"opacity-100":"opacity-40 grayscale"}`,alt:"360 bg"}),v.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[v.jsx(Wl,{size:8})," 360° BACKGROUND"]})]}),v.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[m?v.jsx(ji,{size:16,className:"animate-spin"}):v.jsx(GE,{size:16,className:"group-hover/add:scale-125 transition-transform"}),v.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:S=>{r?s(S.target.files):R(!0)},disabled:m})]}),l.length===0&&!m&&v.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[v.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:S=>{r?s(S.target.files):R(!0)}}),v.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",v.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),v.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",v.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),v.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[v.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),v.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),m&&v.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[v.jsxs("span",{className:"relative flex h-3 w-3",children:[v.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),v.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),v.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",l.length," chars... ",v.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),v.jsx("div",{className:"mb-4",children:v.jsx(Zu,{thought:p})}),v.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[v.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),v.jsx("textarea",{value:_,onChange:S=>x(S.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),v.jsx("div",{className:"mt-2 relative z-50",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(_),b(!0),setTimeout(()=>b(!1),2e3)},disabled:!_,className:`w-full ${g?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[g?v.jsx(ki,{size:20}):v.jsx(Yl,{size:20}),g?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]})}const Zp="184",Bo={ROTATE:0,DOLLY:1,PAN:2},Fo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xM=0,T_=1,_M=2,Hu=1,vM=2,kl=3,Qs=0,Ci=1,cs=2,fs=0,zo=1,A_=2,w_=3,R_=4,bM=5,Ar=100,yM=101,EM=102,SM=103,MM=104,TM=200,AM=201,wM=202,RM=203,np=204,ip=205,CM=206,NM=207,OM=208,DM=209,LM=210,IM=211,UM=212,PM=213,FM=214,ap=0,sp=1,rp=2,ko=3,op=4,lp=5,cp=6,up=7,Vv=0,BM=1,zM=2,Da=0,jv=1,Xv=2,Yv=3,Wv=4,qv=5,$v=6,Kv=7,Zv=300,Dr=301,Vo=302,ku=303,_h=304,sf=306,fp=1e3,us=1001,dp=1002,si=1003,GM=1004,mu=1005,di=1006,vh=1007,Rr=1008,aa=1009,Qv=1010,Jv=1011,Ql=1012,Qp=1013,Ua=1014,Na=1015,hs=1016,Jp=1017,em=1018,Jl=1020,eb=35902,tb=35899,nb=1021,ib=1022,va=1023,ps=1026,Cr=1027,ab=1028,tm=1029,Lr=1030,nm=1031,im=1033,Vu=33776,ju=33777,Xu=33778,Yu=33779,hp=35840,pp=35841,mp=35842,gp=35843,xp=36196,_p=37492,vp=37496,bp=37488,yp=37489,Qu=37490,Ep=37491,Sp=37808,Mp=37809,Tp=37810,Ap=37811,wp=37812,Rp=37813,Cp=37814,Np=37815,Op=37816,Dp=37817,Lp=37818,Ip=37819,Up=37820,Pp=37821,Fp=36492,Bp=36494,zp=36495,Gp=36283,Hp=36284,Ju=36285,kp=36286,HM=3200,C_=0,kM=1,$s="",Vi="srgb",ef="srgb-linear",tf="linear",on="srgb",Eo=7680,N_=519,VM=512,jM=513,XM=514,am=515,YM=516,WM=517,sm=518,qM=519,O_=35044,D_="300 es",Oa=2e3,nf=2001;function $M(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ec(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function KM(){const r=ec("canvas");return r.style.display="block",r}const L_={};function I_(...r){const e="THREE."+r.shift();console.log(e,...r)}function sb(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function dt(...r){r=sb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function Wt(...r){r=sb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function Vp(...r){const e=r.join(" ");e in L_||(L_[e]=!0,dt(...r))}function ZM(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const QM={[ap]:sp,[rp]:cp,[op]:up,[ko]:lp,[sp]:ap,[cp]:rp,[up]:op,[lp]:ko};class er{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const ci=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wu=Math.PI/180,jp=180/Math.PI;function nc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(ci[r&255]+ci[r>>8&255]+ci[r>>16&255]+ci[r>>24&255]+"-"+ci[e&255]+ci[e>>8&255]+"-"+ci[e>>16&15|64]+ci[e>>24&255]+"-"+ci[i&63|128]+ci[i>>8&255]+"-"+ci[i>>16&255]+ci[i>>24&255]+ci[s&255]+ci[s>>8&255]+ci[s>>16&255]+ci[s>>24&255]).toLowerCase()}function It(r,e,i){return Math.max(e,Math.min(i,r))}function JM(r,e){return(r%e+e)%e}function bh(r,e,i){return(1-i)*r+i*e}function Ul(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const eT={DEG2RAD:Wu},dm=class dm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=It(this.x,e.x,i.x),this.y=It(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=It(this.x,e,i),this.y=It(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(It(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(It(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};dm.prototype.isVector2=!0;let wt=dm;class Js{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],_=s[l+2],x=s[l+3],g=c[f+0],b=c[f+1],M=c[f+2],R=c[f+3];if(x!==R||m!==g||p!==b||_!==M){let S=m*g+p*b+_*M+x*R;S<0&&(g=-g,b=-b,M=-M,R=-R,S=-S);let E=1-h;if(S<.9995){const N=Math.acos(S),I=Math.sin(N);E=Math.sin(E*N)/I,h=Math.sin(h*N)/I,m=m*E+g*h,p=p*E+b*h,_=_*E+M*h,x=x*E+R*h}else{m=m*E+g*h,p=p*E+b*h,_=_*E+M*h,x=x*E+R*h;const N=1/Math.sqrt(m*m+p*p+_*_+x*x);m*=N,p*=N,_*=N,x*=N}}e[i]=m,e[i+1]=p,e[i+2]=_,e[i+3]=x}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],_=s[l+3],x=c[f],g=c[f+1],b=c[f+2],M=c[f+3];return e[i]=h*M+_*x+m*b-p*g,e[i+1]=m*M+_*g+p*x-h*b,e[i+2]=p*M+_*b+h*g-m*x,e[i+3]=_*M-h*x-m*g-p*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),_=h(l/2),x=h(c/2),g=m(s/2),b=m(l/2),M=m(c/2);switch(f){case"XYZ":this._x=g*_*x+p*b*M,this._y=p*b*x-g*_*M,this._z=p*_*M+g*b*x,this._w=p*_*x-g*b*M;break;case"YXZ":this._x=g*_*x+p*b*M,this._y=p*b*x-g*_*M,this._z=p*_*M-g*b*x,this._w=p*_*x+g*b*M;break;case"ZXY":this._x=g*_*x-p*b*M,this._y=p*b*x+g*_*M,this._z=p*_*M+g*b*x,this._w=p*_*x-g*b*M;break;case"ZYX":this._x=g*_*x-p*b*M,this._y=p*b*x+g*_*M,this._z=p*_*M-g*b*x,this._w=p*_*x+g*b*M;break;case"YZX":this._x=g*_*x+p*b*M,this._y=p*b*x+g*_*M,this._z=p*_*M-g*b*x,this._w=p*_*x-g*b*M;break;case"XZY":this._x=g*_*x-p*b*M,this._y=p*b*x-g*_*M,this._z=p*_*M+g*b*x,this._w=p*_*x+g*b*M;break;default:dt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],_=i[6],x=i[10],g=s+h+x;if(g>0){const b=.5/Math.sqrt(g+1);this._w=.25/b,this._x=(_-m)*b,this._y=(c-p)*b,this._z=(f-l)*b}else if(s>h&&s>x){const b=2*Math.sqrt(1+s-h-x);this._w=(_-m)/b,this._x=.25*b,this._y=(l+f)/b,this._z=(c+p)/b}else if(h>x){const b=2*Math.sqrt(1+h-s-x);this._w=(c-p)/b,this._x=(l+f)/b,this._y=.25*b,this._z=(m+_)/b}else{const b=2*Math.sqrt(1+x-s-h);this._w=(f-l)/b,this._x=(c+p)/b,this._y=(m+_)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,_=i._w;return this._x=s*_+f*h+l*p-c*m,this._y=l*_+f*m+c*h-s*p,this._z=c*_+f*p+s*m-l*h,this._w=f*_-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),_=Math.sin(p);m=Math.sin(m*p)/_,i=Math.sin(i*p)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const hm=class hm{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(U_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(U_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),_=2*(h*i-c*l),x=2*(c*s-f*i);return this.x=i+m*p+f*x-h*_,this.y=s+m*_+h*p-c*x,this.z=l+m*x+c*_-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=It(this.x,e.x,i.x),this.y=It(this.y,e.y,i.y),this.z=It(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=It(this.x,e,i),this.y=It(this.y,e,i),this.z=It(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(It(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return yh.copy(this).projectOnVector(e),this.sub(yh)}reflect(e){return this.sub(yh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(It(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hm.prototype.isVector3=!0;let se=hm;const yh=new se,U_=new Js,pm=class pm{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],_=s[4],x=s[7],g=s[2],b=s[5],M=s[8],R=l[0],S=l[3],E=l[6],N=l[1],I=l[4],U=l[7],k=l[2],L=l[5],B=l[8];return c[0]=f*R+h*N+m*k,c[3]=f*S+h*I+m*L,c[6]=f*E+h*U+m*B,c[1]=p*R+_*N+x*k,c[4]=p*S+_*I+x*L,c[7]=p*E+_*U+x*B,c[2]=g*R+b*N+M*k,c[5]=g*S+b*I+M*L,c[8]=g*E+b*U+M*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8];return i*f*_-i*h*p-s*c*_+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],x=_*f-h*p,g=h*m-_*c,b=p*c-f*m,M=i*x+s*g+l*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/M;return e[0]=x*R,e[1]=(l*p-_*s)*R,e[2]=(h*s-l*f)*R,e[3]=g*R,e[4]=(_*i-l*m)*R,e[5]=(l*c-h*i)*R,e[6]=b*R,e[7]=(s*m-p*i)*R,e[8]=(f*i-s*c)*R,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Eh.makeScale(e,i)),this}rotate(e){return this.premultiply(Eh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Eh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};pm.prototype.isMatrix3=!0;let _t=pm;const Eh=new _t,P_=new _t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),F_=new _t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tT(){const r={enabled:!0,workingColorSpace:ef,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===on&&(l.r=ds(l.r),l.g=ds(l.g),l.b=ds(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===on&&(l.r=Go(l.r),l.g=Go(l.g),l.b=Go(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===$s?tf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Vp("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Vp("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[ef]:{primaries:e,whitePoint:s,transfer:tf,toXYZ:P_,fromXYZ:F_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Vi},outputColorSpaceConfig:{drawingBufferColorSpace:Vi}},[Vi]:{primaries:e,whitePoint:s,transfer:on,toXYZ:P_,fromXYZ:F_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Vi}}}),r}const kt=tT();function ds(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Go(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let So;class nT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{So===void 0&&(So=ec("canvas")),So.width=e.width,So.height=e.height;const l=So.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=So}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=ec("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=ds(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ds(i[s]/255)*255):i[s]=ds(i[s]);return{data:i,width:e.width,height:e.height}}else return dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iT=0;class rm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iT++}),this.uuid=nc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Sh(l[f].image)):c.push(Sh(l[f]))}else c=Sh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Sh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?nT.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(dt("Texture: Unable to serialize Texture."),{})}let aT=0;const Mh=new se;class hi extends er{constructor(e=hi.DEFAULT_IMAGE,i=hi.DEFAULT_MAPPING,s=us,l=us,c=di,f=Rr,h=va,m=aa,p=hi.DEFAULT_ANISOTROPY,_=$s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=nc(),this.name="",this.source=new rm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mh).x}get height(){return this.source.getSize(Mh).y}get depth(){return this.source.getSize(Mh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){dt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fp:e.x=e.x-Math.floor(e.x);break;case us:e.x=e.x<0?0:1;break;case dp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fp:e.y=e.y-Math.floor(e.y);break;case us:e.y=e.y<0?0:1;break;case dp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hi.DEFAULT_IMAGE=null;hi.DEFAULT_MAPPING=Zv;hi.DEFAULT_ANISOTROPY=1;const mm=class mm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],_=m[4],x=m[8],g=m[1],b=m[5],M=m[9],R=m[2],S=m[6],E=m[10];if(Math.abs(_-g)<.01&&Math.abs(x-R)<.01&&Math.abs(M-S)<.01){if(Math.abs(_+g)<.1&&Math.abs(x+R)<.1&&Math.abs(M+S)<.1&&Math.abs(p+b+E-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(p+1)/2,U=(b+1)/2,k=(E+1)/2,L=(_+g)/4,B=(x+R)/4,A=(M+S)/4;return I>U&&I>k?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=L/s,c=B/s):U>k?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=L/l,c=A/l):k<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(k),s=B/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((S-M)*(S-M)+(x-R)*(x-R)+(g-_)*(g-_));return Math.abs(N)<.001&&(N=1),this.x=(S-M)/N,this.y=(x-R)/N,this.z=(g-_)/N,this.w=Math.acos((p+b+E-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=It(this.x,e.x,i.x),this.y=It(this.y,e.y,i.y),this.z=It(this.z,e.z,i.z),this.w=It(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=It(this.x,e,i),this.y=It(this.y,e,i),this.z=It(this.z,e,i),this.w=It(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(It(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};mm.prototype.isVector4=!0;let Ln=mm;class sT extends er{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new Ln(0,0,e,i),this.scissorTest=!1,this.viewport=new Ln(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new hi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:di,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new rm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class La extends sT{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class rb extends hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class rT extends hi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const af=class af{constructor(e,i,s,l,c,f,h,m,p,_,x,g,b,M,R,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,_,x,g,b,M,R,S)}set(e,i,s,l,c,f,h,m,p,_,x,g,b,M,R,S){const E=this.elements;return E[0]=e,E[4]=i,E[8]=s,E[12]=l,E[1]=c,E[5]=f,E[9]=h,E[13]=m,E[2]=p,E[6]=_,E[10]=x,E[14]=g,E[3]=b,E[7]=M,E[11]=R,E[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new af().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Mo.setFromMatrixColumn(e,0).length(),c=1/Mo.setFromMatrixColumn(e,1).length(),f=1/Mo.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),x=Math.sin(c);if(e.order==="XYZ"){const g=f*_,b=f*x,M=h*_,R=h*x;i[0]=m*_,i[4]=-m*x,i[8]=p,i[1]=b+M*p,i[5]=g-R*p,i[9]=-h*m,i[2]=R-g*p,i[6]=M+b*p,i[10]=f*m}else if(e.order==="YXZ"){const g=m*_,b=m*x,M=p*_,R=p*x;i[0]=g+R*h,i[4]=M*h-b,i[8]=f*p,i[1]=f*x,i[5]=f*_,i[9]=-h,i[2]=b*h-M,i[6]=R+g*h,i[10]=f*m}else if(e.order==="ZXY"){const g=m*_,b=m*x,M=p*_,R=p*x;i[0]=g-R*h,i[4]=-f*x,i[8]=M+b*h,i[1]=b+M*h,i[5]=f*_,i[9]=R-g*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const g=f*_,b=f*x,M=h*_,R=h*x;i[0]=m*_,i[4]=M*p-b,i[8]=g*p+R,i[1]=m*x,i[5]=R*p+g,i[9]=b*p-M,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,b=f*p,M=h*m,R=h*p;i[0]=m*_,i[4]=R-g*x,i[8]=M*x+b,i[1]=x,i[5]=f*_,i[9]=-h*_,i[2]=-p*_,i[6]=b*x+M,i[10]=g-R*x}else if(e.order==="XZY"){const g=f*m,b=f*p,M=h*m,R=h*p;i[0]=m*_,i[4]=-x,i[8]=p*_,i[1]=g*x+R,i[5]=f*_,i[9]=b*x-M,i[2]=M*x-b,i[6]=h*_,i[10]=R*x+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oT,e,lT)}lookAt(e,i,s){const l=this.elements;return Gi.subVectors(e,i),Gi.lengthSq()===0&&(Gi.z=1),Gi.normalize(),Hs.crossVectors(s,Gi),Hs.lengthSq()===0&&(Math.abs(s.z)===1?Gi.x+=1e-4:Gi.z+=1e-4,Gi.normalize(),Hs.crossVectors(s,Gi)),Hs.normalize(),gu.crossVectors(Gi,Hs),l[0]=Hs.x,l[4]=gu.x,l[8]=Gi.x,l[1]=Hs.y,l[5]=gu.y,l[9]=Gi.y,l[2]=Hs.z,l[6]=gu.z,l[10]=Gi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],_=s[1],x=s[5],g=s[9],b=s[13],M=s[2],R=s[6],S=s[10],E=s[14],N=s[3],I=s[7],U=s[11],k=s[15],L=l[0],B=l[4],A=l[8],F=l[12],j=l[1],G=l[5],q=l[9],ie=l[13],ee=l[2],V=l[6],D=l[10],z=l[14],K=l[3],ue=l[7],ge=l[11],P=l[15];return c[0]=f*L+h*j+m*ee+p*K,c[4]=f*B+h*G+m*V+p*ue,c[8]=f*A+h*q+m*D+p*ge,c[12]=f*F+h*ie+m*z+p*P,c[1]=_*L+x*j+g*ee+b*K,c[5]=_*B+x*G+g*V+b*ue,c[9]=_*A+x*q+g*D+b*ge,c[13]=_*F+x*ie+g*z+b*P,c[2]=M*L+R*j+S*ee+E*K,c[6]=M*B+R*G+S*V+E*ue,c[10]=M*A+R*q+S*D+E*ge,c[14]=M*F+R*ie+S*z+E*P,c[3]=N*L+I*j+U*ee+k*K,c[7]=N*B+I*G+U*V+k*ue,c[11]=N*A+I*q+U*D+k*ge,c[15]=N*F+I*ie+U*z+k*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],_=e[2],x=e[6],g=e[10],b=e[14],M=e[3],R=e[7],S=e[11],E=e[15],N=m*b-p*g,I=h*b-p*x,U=h*g-m*x,k=f*b-p*_,L=f*g-m*_,B=f*x-h*_;return i*(R*N-S*I+E*U)-s*(M*N-S*k+E*L)+l*(M*I-R*k+E*B)-c*(M*U-R*L+S*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],_=e[8],x=e[9],g=e[10],b=e[11],M=e[12],R=e[13],S=e[14],E=e[15],N=i*h-s*f,I=i*m-l*f,U=i*p-c*f,k=s*m-l*h,L=s*p-c*h,B=l*p-c*m,A=_*R-x*M,F=_*S-g*M,j=_*E-b*M,G=x*S-g*R,q=x*E-b*R,ie=g*E-b*S,ee=N*ie-I*q+U*G+k*j-L*F+B*A;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/ee;return e[0]=(h*ie-m*q+p*G)*V,e[1]=(l*q-s*ie-c*G)*V,e[2]=(R*B-S*L+E*k)*V,e[3]=(g*L-x*B-b*k)*V,e[4]=(m*j-f*ie-p*F)*V,e[5]=(i*ie-l*j+c*F)*V,e[6]=(S*U-M*B-E*I)*V,e[7]=(_*B-g*U+b*I)*V,e[8]=(f*q-h*j+p*A)*V,e[9]=(s*j-i*q-c*A)*V,e[10]=(M*L-R*U+E*N)*V,e[11]=(x*U-_*L-b*N)*V,e[12]=(h*F-f*G-m*A)*V,e[13]=(i*G-s*F+l*A)*V,e[14]=(R*I-M*k-S*N)*V,e[15]=(_*k-x*I+g*N)*V,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,_=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,_*h+s,_*m-l*f,0,p*m-l*h,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,_=f+f,x=h+h,g=c*p,b=c*_,M=c*x,R=f*_,S=f*x,E=h*x,N=m*p,I=m*_,U=m*x,k=s.x,L=s.y,B=s.z;return l[0]=(1-(R+E))*k,l[1]=(b+U)*k,l[2]=(M-I)*k,l[3]=0,l[4]=(b-U)*L,l[5]=(1-(g+E))*L,l[6]=(S+N)*L,l[7]=0,l[8]=(M+I)*B,l[9]=(S-N)*B,l[10]=(1-(g+R))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Mo.set(l[0],l[1],l[2]).length();const h=Mo.set(l[4],l[5],l[6]).length(),m=Mo.set(l[8],l[9],l[10]).length();c<0&&(f=-f),ma.copy(this);const p=1/f,_=1/h,x=1/m;return ma.elements[0]*=p,ma.elements[1]*=p,ma.elements[2]*=p,ma.elements[4]*=_,ma.elements[5]*=_,ma.elements[6]*=_,ma.elements[8]*=x,ma.elements[9]*=x,ma.elements[10]*=x,i.setFromRotationMatrix(ma),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=Oa,m=!1){const p=this.elements,_=2*c/(i-e),x=2*c/(s-l),g=(i+e)/(i-e),b=(s+l)/(s-l);let M,R;if(m)M=c/(f-c),R=f*c/(f-c);else if(h===Oa)M=-(f+c)/(f-c),R=-2*f*c/(f-c);else if(h===nf)M=-f/(f-c),R=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=x,p[9]=b,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=R,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=Oa,m=!1){const p=this.elements,_=2/(i-e),x=2/(s-l),g=-(i+e)/(i-e),b=-(s+l)/(s-l);let M,R;if(m)M=1/(f-c),R=f/(f-c);else if(h===Oa)M=-2/(f-c),R=-(f+c)/(f-c);else if(h===nf)M=-1/(f-c),R=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=_,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=x,p[9]=0,p[13]=b,p[2]=0,p[6]=0,p[10]=M,p[14]=R,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};af.prototype.isMatrix4=!0;let Xn=af;const Mo=new se,ma=new Xn,oT=new se(0,0,0),lT=new se(1,1,1),Hs=new se,gu=new se,Gi=new se,B_=new Xn,z_=new Js;class Ir{constructor(e=0,i=0,s=0,l=Ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],_=l[9],x=l[2],g=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,b),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-It(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(It(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,b),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-It(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(It(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-It(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,b),this._y=0);break;default:dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return B_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(B_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return z_.setFromEuler(this),this.setFromQuaternion(z_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ir.DEFAULT_ORDER="XYZ";class ob{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cT=0;const G_=new se,To=new Js,as=new Xn,xu=new se,Pl=new se,uT=new se,fT=new Js,H_=new se(1,0,0),k_=new se(0,1,0),V_=new se(0,0,1),j_={type:"added"},dT={type:"removed"},Ao={type:"childadded",child:null},Th={type:"childremoved",child:null};class Xi extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=nc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xi.DEFAULT_UP.clone();const e=new se,i=new Ir,s=new Js,l=new se(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Xn},normalMatrix:{value:new _t}}),this.matrix=new Xn,this.matrixWorld=new Xn,this.matrixAutoUpdate=Xi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ob,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return To.setFromAxisAngle(e,i),this.quaternion.multiply(To),this}rotateOnWorldAxis(e,i){return To.setFromAxisAngle(e,i),this.quaternion.premultiply(To),this}rotateX(e){return this.rotateOnAxis(H_,e)}rotateY(e){return this.rotateOnAxis(k_,e)}rotateZ(e){return this.rotateOnAxis(V_,e)}translateOnAxis(e,i){return G_.copy(e).applyQuaternion(this.quaternion),this.position.add(G_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(H_,e)}translateY(e){return this.translateOnAxis(k_,e)}translateZ(e){return this.translateOnAxis(V_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(as.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?xu.copy(e):xu.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Pl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?as.lookAt(Pl,xu,this.up):as.lookAt(xu,Pl,this.up),this.quaternion.setFromRotationMatrix(as),l&&(as.extractRotation(l.matrixWorld),To.setFromRotationMatrix(as),this.quaternion.premultiply(To.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(j_),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(dT),Th.child=e,this.dispatchEvent(Th),Th.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),as.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),as.multiply(e.parent.matrixWorld)),e.applyMatrix4(as),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(j_),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pl,e,uT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pl,fT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const x=m[p];c(e.shapes,x)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),_=f(e.images),x=f(e.shapes),g=f(e.skeletons),b=f(e.animations),M=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),x.length>0&&(s.shapes=x),g.length>0&&(s.skeletons=g),b.length>0&&(s.animations=b),M.length>0&&(s.nodes=M)}return s.object=l,s;function f(h){const m=[];for(const p in h){const _=h[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Xi.DEFAULT_UP=new se(0,1,0);Xi.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _u extends Xi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hT={type:"move"};class Ah{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _u,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _u,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new se,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new se),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _u,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new se,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new se,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const R of e.hand.values()){const S=i.getJointPose(R,s),E=this._getHandJoint(p,R);S!==null&&(E.matrix.fromArray(S.transform.matrix),E.matrix.decompose(E.position,E.rotation,E.scale),E.matrixWorldNeedsUpdate=!0,E.jointRadius=S.radius),E.visible=S!==null}const _=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],g=_.position.distanceTo(x.position),b=.02,M=.005;p.inputState.pinching&&g>b+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=b-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(hT)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new _u;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const lb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ks={h:0,s:0,l:0},vu={h:0,s:0,l:0};function wh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class dn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Vi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=kt.workingColorSpace){return this.r=e,this.g=i,this.b=s,kt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=kt.workingColorSpace){if(e=JM(e,1),i=It(i,0,1),s=It(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=wh(f,c,e+1/3),this.g=wh(f,c,e),this.b=wh(f,c,e-1/3)}return kt.colorSpaceToWorking(this,l),this}setStyle(e,i=Vi){function s(c){c!==void 0&&parseFloat(c)<1&&dt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:dt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);dt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Vi){const s=lb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):dt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}copyLinearToSRGB(e){return this.r=Go(e.r),this.g=Go(e.g),this.b=Go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vi){return kt.workingToColorSpace(ui.copy(this),e),Math.round(It(ui.r*255,0,255))*65536+Math.round(It(ui.g*255,0,255))*256+Math.round(It(ui.b*255,0,255))}getHexString(e=Vi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=kt.workingColorSpace){kt.workingToColorSpace(ui.copy(this),i);const s=ui.r,l=ui.g,c=ui.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const _=(h+f)/2;if(h===f)m=0,p=0;else{const x=f-h;switch(p=_<=.5?x/(f+h):x/(2-f-h),f){case s:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-s)/x+2;break;case c:m=(s-l)/x+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,i=kt.workingColorSpace){return kt.workingToColorSpace(ui.copy(this),i),e.r=ui.r,e.g=ui.g,e.b=ui.b,e}getStyle(e=Vi){kt.workingToColorSpace(ui.copy(this),e);const i=ui.r,s=ui.g,l=ui.b;return e!==Vi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(ks),this.setHSL(ks.h+e,ks.s+i,ks.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ks),e.getHSL(vu);const s=bh(ks.h,vu.h,i),l=bh(ks.s,vu.s,i),c=bh(ks.l,vu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ui=new dn;dn.NAMES=lb;class pT extends Xi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ir,this.environmentIntensity=1,this.environmentRotation=new Ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const ga=new se,ss=new se,Rh=new se,rs=new se,wo=new se,Ro=new se,X_=new se,Ch=new se,Nh=new se,Oh=new se,Dh=new Ln,Lh=new Ln,Ih=new Ln;class _a{constructor(e=new se,i=new se,s=new se){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),ga.subVectors(e,i),l.cross(ga);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){ga.subVectors(l,i),ss.subVectors(s,i),Rh.subVectors(e,i);const f=ga.dot(ga),h=ga.dot(ss),m=ga.dot(Rh),p=ss.dot(ss),_=ss.dot(Rh),x=f*p-h*h;if(x===0)return c.set(0,0,0),null;const g=1/x,b=(p*m-h*_)*g,M=(f*_-h*m)*g;return c.set(1-b-M,M,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,rs)===null?!1:rs.x>=0&&rs.y>=0&&rs.x+rs.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,rs)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,rs.x),m.addScaledVector(f,rs.y),m.addScaledVector(h,rs.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return Dh.setScalar(0),Lh.setScalar(0),Ih.setScalar(0),Dh.fromBufferAttribute(e,i),Lh.fromBufferAttribute(e,s),Ih.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Dh,c.x),f.addScaledVector(Lh,c.y),f.addScaledVector(Ih,c.z),f}static isFrontFacing(e,i,s,l){return ga.subVectors(s,i),ss.subVectors(e,i),ga.cross(ss).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ga.subVectors(this.c,this.b),ss.subVectors(this.a,this.b),ga.cross(ss).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return _a.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return _a.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return _a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;wo.subVectors(l,s),Ro.subVectors(c,s),Ch.subVectors(e,s);const m=wo.dot(Ch),p=Ro.dot(Ch);if(m<=0&&p<=0)return i.copy(s);Nh.subVectors(e,l);const _=wo.dot(Nh),x=Ro.dot(Nh);if(_>=0&&x<=_)return i.copy(l);const g=m*x-_*p;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(wo,f);Oh.subVectors(e,c);const b=wo.dot(Oh),M=Ro.dot(Oh);if(M>=0&&b<=M)return i.copy(c);const R=b*p-m*M;if(R<=0&&p>=0&&M<=0)return h=p/(p-M),i.copy(s).addScaledVector(Ro,h);const S=_*M-b*x;if(S<=0&&x-_>=0&&b-M>=0)return X_.subVectors(c,l),h=(x-_)/(x-_+(b-M)),i.copy(l).addScaledVector(X_,h);const E=1/(S+R+g);return f=R*E,h=g*E,i.copy(s).addScaledVector(wo,f).addScaledVector(Ro,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ic{constructor(e=new se(1/0,1/0,1/0),i=new se(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(xa.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(xa.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=xa.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,xa):xa.fromBufferAttribute(c,f),xa.applyMatrix4(e.matrixWorld),this.expandByPoint(xa);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),bu.copy(s.boundingBox)),bu.applyMatrix4(e.matrixWorld),this.union(bu)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xa),xa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fl),yu.subVectors(this.max,Fl),Co.subVectors(e.a,Fl),No.subVectors(e.b,Fl),Oo.subVectors(e.c,Fl),Vs.subVectors(No,Co),js.subVectors(Oo,No),yr.subVectors(Co,Oo);let i=[0,-Vs.z,Vs.y,0,-js.z,js.y,0,-yr.z,yr.y,Vs.z,0,-Vs.x,js.z,0,-js.x,yr.z,0,-yr.x,-Vs.y,Vs.x,0,-js.y,js.x,0,-yr.y,yr.x,0];return!Uh(i,Co,No,Oo,yu)||(i=[1,0,0,0,1,0,0,0,1],!Uh(i,Co,No,Oo,yu))?!1:(Eu.crossVectors(Vs,js),i=[Eu.x,Eu.y,Eu.z],Uh(i,Co,No,Oo,yu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(os[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),os[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),os[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),os[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),os[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),os[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),os[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),os[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(os),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const os=[new se,new se,new se,new se,new se,new se,new se,new se],xa=new se,bu=new ic,Co=new se,No=new se,Oo=new se,Vs=new se,js=new se,yr=new se,Fl=new se,yu=new se,Eu=new se,Er=new se;function Uh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Er.fromArray(r,c);const h=l.x*Math.abs(Er.x)+l.y*Math.abs(Er.y)+l.z*Math.abs(Er.z),m=e.dot(Er),p=i.dot(Er),_=s.dot(Er);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>h)return!1}return!0}const Hn=new se,Su=new wt;let mT=0;class Ia extends er{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=O_,this.updateRanges=[],this.gpuType=Na,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Su.fromBufferAttribute(this,i),Su.applyMatrix3(e),this.setXY(i,Su.x,Su.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)Hn.fromBufferAttribute(this,i),Hn.applyMatrix3(e),this.setXYZ(i,Hn.x,Hn.y,Hn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)Hn.fromBufferAttribute(this,i),Hn.applyMatrix4(e),this.setXYZ(i,Hn.x,Hn.y,Hn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)Hn.fromBufferAttribute(this,i),Hn.applyNormalMatrix(e),this.setXYZ(i,Hn.x,Hn.y,Hn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)Hn.fromBufferAttribute(this,i),Hn.transformDirection(e),this.setXYZ(i,Hn.x,Hn.y,Hn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=Ul(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=wi(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Ul(i,this.array)),i}setX(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Ul(i,this.array)),i}setY(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Ul(i,this.array)),i}setZ(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Ul(i,this.array)),i}setW(e,i){return this.normalized&&(i=wi(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array),l=wi(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=wi(i,this.array),s=wi(s,this.array),l=wi(l,this.array),c=wi(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==O_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cb extends Ia{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class ub extends Ia{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class sa extends Ia{constructor(e,i,s){super(new Float32Array(e),i,s)}}const gT=new ic,Bl=new se,Ph=new se;class om{constructor(e=new se,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):gT.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bl.subVectors(e,this.center);const i=Bl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Bl,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ph.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bl.copy(e.center).add(Ph)),this.expandByPoint(Bl.copy(e.center).sub(Ph))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xT=0;const na=new Xn,Fh=new Xi,Do=new se,Hi=new ic,zl=new ic,Qn=new se;class Ba extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=nc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($M(e)?ub:cb)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new _t().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return na.makeRotationFromQuaternion(e),this.applyMatrix4(na),this}rotateX(e){return na.makeRotationX(e),this.applyMatrix4(na),this}rotateY(e){return na.makeRotationY(e),this.applyMatrix4(na),this}rotateZ(e){return na.makeRotationZ(e),this.applyMatrix4(na),this}translate(e,i,s){return na.makeTranslation(e,i,s),this.applyMatrix4(na),this}scale(e,i,s){return na.makeScale(e,i,s),this.applyMatrix4(na),this}lookAt(e){return Fh.lookAt(e),Fh.updateMatrix(),this.applyMatrix4(Fh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Do).negate(),this.translate(Do.x,Do.y,Do.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new sa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ic);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new se(-1/0,-1/0,-1/0),new se(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Hi.setFromBufferAttribute(c),this.morphTargetsRelative?(Qn.addVectors(this.boundingBox.min,Hi.min),this.boundingBox.expandByPoint(Qn),Qn.addVectors(this.boundingBox.max,Hi.max),this.boundingBox.expandByPoint(Qn)):(this.boundingBox.expandByPoint(Hi.min),this.boundingBox.expandByPoint(Hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new om);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new se,1/0);return}if(e){const s=this.boundingSphere.center;if(Hi.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];zl.setFromBufferAttribute(h),this.morphTargetsRelative?(Qn.addVectors(Hi.min,zl.min),Hi.expandByPoint(Qn),Qn.addVectors(Hi.max,zl.max),Hi.expandByPoint(Qn)):(Hi.expandByPoint(zl.min),Hi.expandByPoint(zl.max))}Hi.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)Qn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Qn));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,_=h.count;p<_;p++)Qn.fromBufferAttribute(h,p),m&&(Do.fromBufferAttribute(e,p),Qn.add(Do)),l=Math.max(l,s.distanceToSquared(Qn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ia(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let A=0;A<s.count;A++)h[A]=new se,m[A]=new se;const p=new se,_=new se,x=new se,g=new wt,b=new wt,M=new wt,R=new se,S=new se;function E(A,F,j){p.fromBufferAttribute(s,A),_.fromBufferAttribute(s,F),x.fromBufferAttribute(s,j),g.fromBufferAttribute(c,A),b.fromBufferAttribute(c,F),M.fromBufferAttribute(c,j),_.sub(p),x.sub(p),b.sub(g),M.sub(g);const G=1/(b.x*M.y-M.x*b.y);isFinite(G)&&(R.copy(_).multiplyScalar(M.y).addScaledVector(x,-b.y).multiplyScalar(G),S.copy(x).multiplyScalar(b.x).addScaledVector(_,-M.x).multiplyScalar(G),h[A].add(R),h[F].add(R),h[j].add(R),m[A].add(S),m[F].add(S),m[j].add(S))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,F=N.length;A<F;++A){const j=N[A],G=j.start,q=j.count;for(let ie=G,ee=G+q;ie<ee;ie+=3)E(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}const I=new se,U=new se,k=new se,L=new se;function B(A){k.fromBufferAttribute(l,A),L.copy(k);const F=h[A];I.copy(F),I.sub(k.multiplyScalar(k.dot(F))).normalize(),U.crossVectors(L,F);const G=U.dot(m[A])<0?-1:1;f.setXYZW(A,I.x,I.y,I.z,G)}for(let A=0,F=N.length;A<F;++A){const j=N[A],G=j.start,q=j.count;for(let ie=G,ee=G+q;ie<ee;ie+=3)B(e.getX(ie+0)),B(e.getX(ie+1)),B(e.getX(ie+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ia(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,b=s.count;g<b;g++)s.setXYZ(g,0,0,0);const l=new se,c=new se,f=new se,h=new se,m=new se,p=new se,_=new se,x=new se;if(e)for(let g=0,b=e.count;g<b;g+=3){const M=e.getX(g+0),R=e.getX(g+1),S=e.getX(g+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,S),_.subVectors(f,c),x.subVectors(l,c),_.cross(x),h.fromBufferAttribute(s,M),m.fromBufferAttribute(s,R),p.fromBufferAttribute(s,S),h.add(_),m.add(_),p.add(_),s.setXYZ(M,h.x,h.y,h.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let g=0,b=i.count;g<b;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),x.subVectors(l,c),_.cross(x),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Qn.fromBufferAttribute(e,i),Qn.normalize(),e.setXYZ(i,Qn.x,Qn.y,Qn.z)}toNonIndexed(){function e(h,m){const p=h.array,_=h.itemSize,x=h.normalized,g=new p.constructor(m.length*_);let b=0,M=0;for(let R=0,S=m.length;R<S;R++){h.isInterleavedBufferAttribute?b=m[R]*h.data.stride+h.offset:b=m[R]*_;for(let E=0;E<_;E++)g[M++]=p[b++]}return new Ia(g,_,x)}if(this.index===null)return dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ba,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let _=0,x=p.length;_<x;_++){const g=p[_],b=e(g,s);m.push(b)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let x=0,g=p.length;x<g;x++){const b=p[x];_.push(b.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(i))}const c=e.morphAttributes;for(const p in c){const _=[],x=c[p];for(let g=0,b=x.length;g<b;g++)_.push(x[g].clone(i));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,_=f.length;p<_;p++){const x=f[p];this.addGroup(x.start,x.count,x.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let _T=0;class rf extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_T++}),this.uuid=nc(),this.name="",this.type="Material",this.blending=zo,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=np,this.blendDst=ip,this.blendEquation=Ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dn(0,0,0),this.blendAlpha=0,this.depthFunc=ko,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=N_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){dt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){dt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==zo&&(s.blending=this.blending),this.side!==Qs&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==np&&(s.blendSrc=this.blendSrc),this.blendDst!==ip&&(s.blendDst=this.blendDst),this.blendEquation!==Ar&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==ko&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==N_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Eo&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Eo&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Eo&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ls=new se,Bh=new se,Mu=new se,Xs=new se,zh=new se,Tu=new se,Gh=new se;class fb{constructor(e=new se,i=new se(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ls)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ls.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ls.copy(this.origin).addScaledVector(this.direction,i),ls.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Bh.copy(e).add(i).multiplyScalar(.5),Mu.copy(i).sub(e).normalize(),Xs.copy(this.origin).sub(Bh);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Mu),h=Xs.dot(this.direction),m=-Xs.dot(Mu),p=Xs.lengthSq(),_=Math.abs(1-f*f);let x,g,b,M;if(_>0)if(x=f*m-h,g=f*h-m,M=c*_,x>=0)if(g>=-M)if(g<=M){const R=1/_;x*=R,g*=R,b=x*(x+f*g+2*h)+g*(f*x+g+2*m)+p}else g=c,x=Math.max(0,-(f*g+h)),b=-x*x+g*(g+2*m)+p;else g=-c,x=Math.max(0,-(f*g+h)),b=-x*x+g*(g+2*m)+p;else g<=-M?(x=Math.max(0,-(-f*c+h)),g=x>0?-c:Math.min(Math.max(-c,-m),c),b=-x*x+g*(g+2*m)+p):g<=M?(x=0,g=Math.min(Math.max(-c,-m),c),b=g*(g+2*m)+p):(x=Math.max(0,-(f*c+h)),g=x>0?c:Math.min(Math.max(-c,-m),c),b=-x*x+g*(g+2*m)+p);else g=f>0?-c:c,x=Math.max(0,-(f*g+h)),b=-x*x+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(Bh).addScaledVector(Mu,g),b}intersectSphere(e,i){ls.subVectors(e.center,this.origin);const s=ls.dot(this.direction),l=ls.dot(ls)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,_=1/this.direction.y,x=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),_>=0?(c=(e.min.y-g.y)*_,f=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,f=(e.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),x>=0?(h=(e.min.z-g.z)*x,m=(e.max.z-g.z)*x):(h=(e.max.z-g.z)*x,m=(e.min.z-g.z)*x),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ls)!==null}intersectTriangle(e,i,s,l,c){zh.subVectors(i,e),Tu.subVectors(s,e),Gh.crossVectors(zh,Tu);let f=this.direction.dot(Gh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Xs.subVectors(this.origin,e);const m=h*this.direction.dot(Tu.crossVectors(Xs,Tu));if(m<0)return null;const p=h*this.direction.dot(zh.cross(Xs));if(p<0||m+p>f)return null;const _=-h*Xs.dot(Gh);return _<0?null:this.at(_/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lm extends rf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ir,this.combine=Vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Y_=new Xn,Sr=new fb,Au=new om,W_=new se,wu=new se,Ru=new se,Cu=new se,Hh=new se,Nu=new se,q_=new se,Ou=new se;class Pa extends Xi{constructor(e=new Ba,i=new lm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){Nu.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=h[m],x=c[m];_!==0&&(Hh.fromBufferAttribute(x,e),f?Nu.addScaledVector(Hh,_):Nu.addScaledVector(Hh.sub(i),_))}i.add(Nu)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Au.copy(s.boundingSphere),Au.applyMatrix4(c),Sr.copy(e.ray).recast(e.near),!(Au.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(Au,W_)===null||Sr.origin.distanceToSquared(W_)>(e.far-e.near)**2))&&(Y_.copy(c).invert(),Sr.copy(e.ray).applyMatrix4(Y_),!(s.boundingBox!==null&&Sr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Sr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,x=c.attributes.normal,g=c.groups,b=c.drawRange;if(h!==null)if(Array.isArray(f))for(let M=0,R=g.length;M<R;M++){const S=g[M],E=f[S.materialIndex],N=Math.max(S.start,b.start),I=Math.min(h.count,Math.min(S.start+S.count,b.start+b.count));for(let U=N,k=I;U<k;U+=3){const L=h.getX(U),B=h.getX(U+1),A=h.getX(U+2);l=Du(this,E,e,s,p,_,x,L,B,A),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),R=Math.min(h.count,b.start+b.count);for(let S=M,E=R;S<E;S+=3){const N=h.getX(S),I=h.getX(S+1),U=h.getX(S+2);l=Du(this,f,e,s,p,_,x,N,I,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let M=0,R=g.length;M<R;M++){const S=g[M],E=f[S.materialIndex],N=Math.max(S.start,b.start),I=Math.min(m.count,Math.min(S.start+S.count,b.start+b.count));for(let U=N,k=I;U<k;U+=3){const L=U,B=U+1,A=U+2;l=Du(this,E,e,s,p,_,x,L,B,A),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),R=Math.min(m.count,b.start+b.count);for(let S=M,E=R;S<E;S+=3){const N=S,I=S+1,U=S+2;l=Du(this,f,e,s,p,_,x,N,I,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function vT(r,e,i,s,l,c,f,h){let m;if(e.side===Ci?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===Qs,h),m===null)return null;Ou.copy(h),Ou.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Ou);return p<i.near||p>i.far?null:{distance:p,point:Ou.clone(),object:r}}function Du(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,wu),r.getVertexPosition(m,Ru),r.getVertexPosition(p,Cu);const _=vT(r,e,i,s,wu,Ru,Cu,q_);if(_){const x=new se;_a.getBarycoord(q_,wu,Ru,Cu,x),l&&(_.uv=_a.getInterpolatedAttribute(l,h,m,p,x,new wt)),c&&(_.uv1=_a.getInterpolatedAttribute(c,h,m,p,x,new wt)),f&&(_.normal=_a.getInterpolatedAttribute(f,h,m,p,x,new se),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new se,materialIndex:0};_a.getNormal(wu,Ru,Cu,g.normal),_.face=g,_.barycoord=x}return _}class bT extends hi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=si,_=si,x,g){super(null,f,h,m,p,_,l,c,x,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const kh=new se,yT=new se,ET=new _t;class qs{constructor(e=new se(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=kh.subVectors(s,i).cross(yT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(kh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||ET.getNormalMatrix(e),l=this.coplanarPoint(kh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new om,ST=new wt(.5,.5),Lu=new se;class db{constructor(e=new qs,i=new qs,s=new qs,l=new qs,c=new qs,f=new qs){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Oa,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],_=c[4],x=c[5],g=c[6],b=c[7],M=c[8],R=c[9],S=c[10],E=c[11],N=c[12],I=c[13],U=c[14],k=c[15];if(l[0].setComponents(p-f,b-_,E-M,k-N).normalize(),l[1].setComponents(p+f,b+_,E+M,k+N).normalize(),l[2].setComponents(p+h,b+x,E+R,k+I).normalize(),l[3].setComponents(p-h,b-x,E-R,k-I).normalize(),s)l[4].setComponents(m,g,S,U).normalize(),l[5].setComponents(p-m,b-g,E-S,k-U).normalize();else if(l[4].setComponents(p-m,b-g,E-S,k-U).normalize(),i===Oa)l[5].setComponents(p+m,b+g,E+S,k+U).normalize();else if(i===nf)l[5].setComponents(m,g,S,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Mr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(e){Mr.center.set(0,0,0);const i=ST.distanceTo(e.center);return Mr.radius=.7071067811865476+i,Mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Lu.x=l.normal.x>0?e.max.x:e.min.x,Lu.y=l.normal.y>0?e.max.y:e.min.y,Lu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Lu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hb extends hi{constructor(e=[],i=Dr,s,l,c,f,h,m,p,_){super(e,i,s,l,c,f,h,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jo extends hi{constructor(e,i,s=Ua,l,c,f,h=si,m=si,p,_=ps,x=1){if(_!==ps&&_!==Cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:x};super(g,l,c,f,h,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class MT extends jo{constructor(e,i=Ua,s=Dr,l,c,f=si,h=si,m,p=ps){const _={width:e,height:e,depth:1},x=[_,_,_,_,_,_];super(e,e,i,s,l,c,f,h,m,p),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class pb extends hi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ac extends Ba{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],_=[],x=[];let g=0,b=0;M("z","y","x",-1,-1,s,i,e,f,c,0),M("z","y","x",1,-1,s,i,-e,f,c,1),M("x","z","y",1,1,e,s,i,l,f,2),M("x","z","y",1,-1,e,s,-i,l,f,3),M("x","y","z",1,-1,e,i,s,l,c,4),M("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new sa(p,3)),this.setAttribute("normal",new sa(_,3)),this.setAttribute("uv",new sa(x,2));function M(R,S,E,N,I,U,k,L,B,A,F){const j=U/B,G=k/A,q=U/2,ie=k/2,ee=L/2,V=B+1,D=A+1;let z=0,K=0;const ue=new se;for(let ge=0;ge<D;ge++){const P=ge*G-ie;for(let Z=0;Z<V;Z++){const _e=Z*j-q;ue[R]=_e*N,ue[S]=P*I,ue[E]=ee,p.push(ue.x,ue.y,ue.z),ue[R]=0,ue[S]=0,ue[E]=L>0?1:-1,_.push(ue.x,ue.y,ue.z),x.push(Z/B),x.push(1-ge/A),z+=1}}for(let ge=0;ge<A;ge++)for(let P=0;P<B;P++){const Z=g+P+V*ge,_e=g+P+V*(ge+1),Ae=g+(P+1)+V*(ge+1),Oe=g+(P+1)+V*ge;m.push(Z,_e,Oe),m.push(_e,Ae,Oe),K+=6}h.addGroup(b,K,F),b+=K,g+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class of extends Ba{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,_=m+1,x=e/h,g=i/m,b=[],M=[],R=[],S=[];for(let E=0;E<_;E++){const N=E*g-f;for(let I=0;I<p;I++){const U=I*x-c;M.push(U,-N,0),R.push(0,0,1),S.push(I/h),S.push(1-E/m)}}for(let E=0;E<m;E++)for(let N=0;N<h;N++){const I=N+p*E,U=N+p*(E+1),k=N+1+p*(E+1),L=N+1+p*E;b.push(I,U,L),b.push(U,k,L)}this.setIndex(b),this.setAttribute("position",new sa(M,3)),this.setAttribute("normal",new sa(R,3)),this.setAttribute("uv",new sa(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new of(e.width,e.height,e.widthSegments,e.heightSegments)}}class cm extends Ba{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const _=[],x=new se,g=new se,b=[],M=[],R=[],S=[];for(let E=0;E<=s;E++){const N=[],I=E/s;let U=0;E===0&&f===0?U=.5/i:E===s&&m===Math.PI&&(U=-.5/i);for(let k=0;k<=i;k++){const L=k/i;x.x=-e*Math.cos(l+L*c)*Math.sin(f+I*h),x.y=e*Math.cos(f+I*h),x.z=e*Math.sin(l+L*c)*Math.sin(f+I*h),M.push(x.x,x.y,x.z),g.copy(x).normalize(),R.push(g.x,g.y,g.z),S.push(L+U,1-I),N.push(p++)}_.push(N)}for(let E=0;E<s;E++)for(let N=0;N<i;N++){const I=_[E][N+1],U=_[E][N],k=_[E+1][N],L=_[E+1][N+1];(E!==0||f>0)&&b.push(I,U,L),(E!==s-1||m<Math.PI)&&b.push(U,k,L)}this.setIndex(b),this.setAttribute("position",new sa(M,3)),this.setAttribute("normal",new sa(R,3)),this.setAttribute("uv",new sa(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Xo(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if($_(l))l.isRenderTargetTexture?(dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if($_(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function gi(r){const e={};for(let i=0;i<r.length;i++){const s=Xo(r[i]);for(const l in s)e[l]=s[l]}return e}function $_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function TT(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function mb(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}const AT={clone:Xo,merge:gi};var wT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fa extends rf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wT,this.fragmentShader=RT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xo(e.uniforms),this.uniformsGroups=TT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class CT extends Fa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class NT extends rf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=HM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OT extends rf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vh={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(K_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!K_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function K_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class DT{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(_){h++,c===!1&&l.onStart!==void 0&&l.onStart(_,f,h),c=!0},this.itemEnd=function(_){f++,l.onProgress!==void 0&&l.onProgress(_,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(_){l.onError!==void 0&&l.onError(_)},this.resolveURL=function(_){return m?m(_):_},this.setURLModifier=function(_){return m=_,this},this.addHandler=function(_,x){return p.push(_,x),this},this.removeHandler=function(_){const x=p.indexOf(_);return x!==-1&&p.splice(x,2),this},this.getHandler=function(_){for(let x=0,g=p.length;x<g;x+=2){const b=p[x],M=p[x+1];if(b.global&&(b.lastIndex=0),b.test(_))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const LT=new DT;class um{constructor(e){this.manager=e!==void 0?e:LT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}um.DEFAULT_MATERIAL_NAME="__DEFAULT";const Lo=new WeakMap;class IT extends um{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=Vh.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let x=Lo.get(f);x===void 0&&(x=[],Lo.set(f,x)),x.push({onLoad:i,onError:l})}return f}const h=ec("img");function m(){_(),i&&i(this);const x=Lo.get(this)||[];for(let g=0;g<x.length;g++){const b=x[g];b.onLoad&&b.onLoad(this)}Lo.delete(this),c.manager.itemEnd(e)}function p(x){_(),l&&l(x),Vh.remove(`image:${e}`);const g=Lo.get(this)||[];for(let b=0;b<g.length;b++){const M=g[b];M.onError&&M.onError(x)}Lo.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function _(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),Vh.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class UT extends um{constructor(e){super(e)}load(e,i,s,l){const c=new hi,f=new IT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const Iu=new se,Uu=new Js,wa=new se;class gb extends Xi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xn,this.projectionMatrix=new Xn,this.projectionMatrixInverse=new Xn,this.coordinateSystem=Oa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Iu,Uu,wa),wa.x===1&&wa.y===1&&wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Iu,Uu,wa.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(Iu,Uu,wa),wa.x===1&&wa.y===1&&wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Iu,Uu,wa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ys=new se,Z_=new wt,Q_=new wt;class ia extends gb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=jp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jp*2*Math.atan(Math.tan(Wu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z),Ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ys.x,Ys.y).multiplyScalar(-e/Ys.z)}getViewSize(e,i){return this.getViewBounds(e,Z_,Q_),i.subVectors(Q_,Z_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Wu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class xb extends gb{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=_*this.view.offsetY,m=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Io=-90,Uo=1;class PT extends Xi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ia(Io,Uo,e,i);l.layers=this.layers,this.add(l);const c=new ia(Io,Uo,e,i);c.layers=this.layers,this.add(c);const f=new ia(Io,Uo,e,i);f.layers=this.layers,this.add(f);const h=new ia(Io,Uo,e,i);h.layers=this.layers,this.add(h);const m=new ia(Io,Uo,e,i);m.layers=this.layers,this.add(m);const p=new ia(Io,Uo,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===Oa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===nf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,_]=this.children,x=e.getRenderTarget(),g=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=R,e.setRenderTarget(s,5,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(x,g,b),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class FT extends ia{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class J_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=It(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(It(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const gm=class gm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};gm.prototype.isMatrix2=!0;let ev=gm;class BT extends er{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){dt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function tv(r,e,i,s){const l=zT(s);switch(i){case nb:return r*e;case ab:return r*e/l.components*l.byteLength;case tm:return r*e/l.components*l.byteLength;case Lr:return r*e*2/l.components*l.byteLength;case nm:return r*e*2/l.components*l.byteLength;case ib:return r*e*3/l.components*l.byteLength;case va:return r*e*4/l.components*l.byteLength;case im:return r*e*4/l.components*l.byteLength;case Vu:case ju:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xu:case Yu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case pp:case gp:return Math.max(r,16)*Math.max(e,8)/4;case hp:case mp:return Math.max(r,8)*Math.max(e,8)/2;case xp:case _p:case bp:case yp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case vp:case Qu:case Ep:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Mp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Tp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ap:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case wp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Rp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Cp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Np:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Op:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Dp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Lp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ip:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Up:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Pp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Fp:case Bp:case zp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Gp:case Hp:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ju:case kp:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function zT(r){switch(r){case aa:case Qv:return{byteLength:1,components:1};case Ql:case Jv:case hs:return{byteLength:2,components:1};case Jp:case em:return{byteLength:2,components:4};case Ua:case Qp:case Na:return{byteLength:4,components:1};case eb:case tb:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zp}}));typeof window<"u"&&(window.__THREE__?dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zp);function _b(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function GT(r){const e=new WeakMap;function i(h,m){const p=h.array,_=h.usage,x=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,_),h.onUploadCallback();let b;if(p instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)b=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)b=r.SHORT;else if(p instanceof Uint32Array)b=r.UNSIGNED_INT;else if(p instanceof Int32Array)b=r.INT;else if(p instanceof Int8Array)b=r.BYTE;else if(p instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:b,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:x}}function s(h,m,p){const _=m.array,x=m.updateRanges;if(r.bindBuffer(p,h),x.length===0)r.bufferSubData(p,0,_);else{x.sort((b,M)=>b.start-M.start);let g=0;for(let b=1;b<x.length;b++){const M=x[g],R=x[b];R.start<=M.start+M.count+1?M.count=Math.max(M.count,R.start+R.count-M.start):(++g,x[g]=R)}x.length=g+1;for(let b=0,M=x.length;b<M;b++){const R=x[b];r.bufferSubData(p,R.start*_.BYTES_PER_ELEMENT,_,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var HT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kT=`#ifdef USE_ALPHAHASH
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
#endif`,VT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,YT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,WT=`#ifdef USE_AOMAP
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
#endif`,qT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$T=`#ifdef USE_BATCHING
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
#endif`,KT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ZT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,QT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,e1=`#ifdef USE_IRIDESCENCE
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
#endif`,t1=`#ifdef USE_BUMPMAP
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
#endif`,n1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,i1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,a1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,o1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,l1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,c1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,u1=`#define PI 3.141592653589793
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
} // validated`,f1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,d1=`vec3 transformedNormal = objectNormal;
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
#endif`,h1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,p1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,m1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,g1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,x1="gl_FragColor = linearToOutputTexel( gl_FragColor );",_1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v1=`#ifdef USE_ENVMAP
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
#endif`,b1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,y1=`#ifdef USE_ENVMAP
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
#endif`,E1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S1=`#ifdef USE_ENVMAP
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
#endif`,M1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,A1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,R1=`#ifdef USE_GRADIENTMAP
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
}`,C1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,N1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,L1=`#ifdef USE_ENVMAP
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
#endif`,I1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,P1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,B1=`PhysicalMaterial material;
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
#endif`,z1=`uniform sampler2D dfgLUT;
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
}`,G1=`
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
#endif`,H1=`#if defined( RE_IndirectDiffuse )
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
#endif`,k1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,j1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,X1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,q1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z1=`#if defined( USE_POINTS_UV )
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
#endif`,Q1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iA=`#ifdef USE_MORPHTARGETS
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
#endif`,aA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,oA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uA=`#ifdef USE_NORMALMAP
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
#endif`,fA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_A=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,EA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,SA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,TA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,AA=`float getShadowMask() {
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
}`,wA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,RA=`#ifdef USE_SKINNING
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
#endif`,CA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NA=`#ifdef USE_SKINNING
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
#endif`,OA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,DA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,LA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,IA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,UA=`#ifdef USE_TRANSMISSION
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
#endif`,PA=`#ifdef USE_TRANSMISSION
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
#endif`,FA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,GA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const HA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kA=`uniform sampler2D t2D;
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
}`,VA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,XA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WA=`#include <common>
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
}`,qA=`#if DEPTH_PACKING == 3200
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
}`,$A=`#define DISTANCE
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
}`,KA=`#define DISTANCE
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
}`,ZA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JA=`uniform float scale;
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
}`,ew=`uniform vec3 diffuse;
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
}`,tw=`#include <common>
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
}`,nw=`uniform vec3 diffuse;
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
}`,iw=`#define LAMBERT
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
}`,aw=`#define LAMBERT
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
}`,sw=`#define MATCAP
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
}`,rw=`#define MATCAP
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
}`,ow=`#define NORMAL
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
}`,lw=`#define NORMAL
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
}`,cw=`#define PHONG
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
}`,uw=`#define PHONG
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
}`,fw=`#define STANDARD
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
}`,dw=`#define STANDARD
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
}`,hw=`#define TOON
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
}`,pw=`#define TOON
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
}`,mw=`uniform float size;
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
}`,gw=`uniform vec3 diffuse;
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
}`,xw=`#include <common>
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
}`,_w=`uniform vec3 color;
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
}`,vw=`uniform float rotation;
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
}`,bw=`uniform vec3 diffuse;
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
}`,Tt={alphahash_fragment:HT,alphahash_pars_fragment:kT,alphamap_fragment:VT,alphamap_pars_fragment:jT,alphatest_fragment:XT,alphatest_pars_fragment:YT,aomap_fragment:WT,aomap_pars_fragment:qT,batching_pars_vertex:$T,batching_vertex:KT,begin_vertex:ZT,beginnormal_vertex:QT,bsdfs:JT,iridescence_fragment:e1,bumpmap_pars_fragment:t1,clipping_planes_fragment:n1,clipping_planes_pars_fragment:i1,clipping_planes_pars_vertex:a1,clipping_planes_vertex:s1,color_fragment:r1,color_pars_fragment:o1,color_pars_vertex:l1,color_vertex:c1,common:u1,cube_uv_reflection_fragment:f1,defaultnormal_vertex:d1,displacementmap_pars_vertex:h1,displacementmap_vertex:p1,emissivemap_fragment:m1,emissivemap_pars_fragment:g1,colorspace_fragment:x1,colorspace_pars_fragment:_1,envmap_fragment:v1,envmap_common_pars_fragment:b1,envmap_pars_fragment:y1,envmap_pars_vertex:E1,envmap_physical_pars_fragment:L1,envmap_vertex:S1,fog_vertex:M1,fog_pars_vertex:T1,fog_fragment:A1,fog_pars_fragment:w1,gradientmap_pars_fragment:R1,lightmap_pars_fragment:C1,lights_lambert_fragment:N1,lights_lambert_pars_fragment:O1,lights_pars_begin:D1,lights_toon_fragment:I1,lights_toon_pars_fragment:U1,lights_phong_fragment:P1,lights_phong_pars_fragment:F1,lights_physical_fragment:B1,lights_physical_pars_fragment:z1,lights_fragment_begin:G1,lights_fragment_maps:H1,lights_fragment_end:k1,lightprobes_pars_fragment:V1,logdepthbuf_fragment:j1,logdepthbuf_pars_fragment:X1,logdepthbuf_pars_vertex:Y1,logdepthbuf_vertex:W1,map_fragment:q1,map_pars_fragment:$1,map_particle_fragment:K1,map_particle_pars_fragment:Z1,metalnessmap_fragment:Q1,metalnessmap_pars_fragment:J1,morphinstance_vertex:eA,morphcolor_vertex:tA,morphnormal_vertex:nA,morphtarget_pars_vertex:iA,morphtarget_vertex:aA,normal_fragment_begin:sA,normal_fragment_maps:rA,normal_pars_fragment:oA,normal_pars_vertex:lA,normal_vertex:cA,normalmap_pars_fragment:uA,clearcoat_normal_fragment_begin:fA,clearcoat_normal_fragment_maps:dA,clearcoat_pars_fragment:hA,iridescence_pars_fragment:pA,opaque_fragment:mA,packing:gA,premultiplied_alpha_fragment:xA,project_vertex:_A,dithering_fragment:vA,dithering_pars_fragment:bA,roughnessmap_fragment:yA,roughnessmap_pars_fragment:EA,shadowmap_pars_fragment:SA,shadowmap_pars_vertex:MA,shadowmap_vertex:TA,shadowmask_pars_fragment:AA,skinbase_vertex:wA,skinning_pars_vertex:RA,skinning_vertex:CA,skinnormal_vertex:NA,specularmap_fragment:OA,specularmap_pars_fragment:DA,tonemapping_fragment:LA,tonemapping_pars_fragment:IA,transmission_fragment:UA,transmission_pars_fragment:PA,uv_pars_fragment:FA,uv_pars_vertex:BA,uv_vertex:zA,worldpos_vertex:GA,background_vert:HA,background_frag:kA,backgroundCube_vert:VA,backgroundCube_frag:jA,cube_vert:XA,cube_frag:YA,depth_vert:WA,depth_frag:qA,distance_vert:$A,distance_frag:KA,equirect_vert:ZA,equirect_frag:QA,linedashed_vert:JA,linedashed_frag:ew,meshbasic_vert:tw,meshbasic_frag:nw,meshlambert_vert:iw,meshlambert_frag:aw,meshmatcap_vert:sw,meshmatcap_frag:rw,meshnormal_vert:ow,meshnormal_frag:lw,meshphong_vert:cw,meshphong_frag:uw,meshphysical_vert:fw,meshphysical_frag:dw,meshtoon_vert:hw,meshtoon_frag:pw,points_vert:mw,points_frag:gw,shadow_vert:xw,shadow_frag:_w,sprite_vert:vw,sprite_frag:bw},je={common:{diffuse:{value:new dn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _t}},envmap:{envMap:{value:null},envMapRotation:{value:new _t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _t},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new se},probesMax:{value:new se},probesResolution:{value:new se}},points:{diffuse:{value:new dn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0},uvTransform:{value:new _t}},sprite:{diffuse:{value:new dn(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}}},Ca={basic:{uniforms:gi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:Tt.meshbasic_vert,fragmentShader:Tt.meshbasic_frag},lambert:{uniforms:gi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new dn(0)},envMapIntensity:{value:1}}]),vertexShader:Tt.meshlambert_vert,fragmentShader:Tt.meshlambert_frag},phong:{uniforms:gi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new dn(0)},specular:{value:new dn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Tt.meshphong_vert,fragmentShader:Tt.meshphong_frag},standard:{uniforms:gi([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new dn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag},toon:{uniforms:gi([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new dn(0)}}]),vertexShader:Tt.meshtoon_vert,fragmentShader:Tt.meshtoon_frag},matcap:{uniforms:gi([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:Tt.meshmatcap_vert,fragmentShader:Tt.meshmatcap_frag},points:{uniforms:gi([je.points,je.fog]),vertexShader:Tt.points_vert,fragmentShader:Tt.points_frag},dashed:{uniforms:gi([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Tt.linedashed_vert,fragmentShader:Tt.linedashed_frag},depth:{uniforms:gi([je.common,je.displacementmap]),vertexShader:Tt.depth_vert,fragmentShader:Tt.depth_frag},normal:{uniforms:gi([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:Tt.meshnormal_vert,fragmentShader:Tt.meshnormal_frag},sprite:{uniforms:gi([je.sprite,je.fog]),vertexShader:Tt.sprite_vert,fragmentShader:Tt.sprite_frag},background:{uniforms:{uvTransform:{value:new _t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Tt.background_vert,fragmentShader:Tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _t}},vertexShader:Tt.backgroundCube_vert,fragmentShader:Tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Tt.cube_vert,fragmentShader:Tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Tt.equirect_vert,fragmentShader:Tt.equirect_frag},distance:{uniforms:gi([je.common,je.displacementmap,{referencePosition:{value:new se},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Tt.distance_vert,fragmentShader:Tt.distance_frag},shadow:{uniforms:gi([je.lights,je.fog,{color:{value:new dn(0)},opacity:{value:1}}]),vertexShader:Tt.shadow_vert,fragmentShader:Tt.shadow_frag}};Ca.physical={uniforms:gi([Ca.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _t},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _t},sheen:{value:0},sheenColor:{value:new dn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _t},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _t},attenuationDistance:{value:0},attenuationColor:{value:new dn(0)},specularColor:{value:new dn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _t},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _t}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag};const Pu={r:0,b:0,g:0},yw=new Xn,vb=new _t;vb.set(-1,0,0,0,1,0,0,0,1);function Ew(r,e,i,s,l,c){const f=new dn(0);let h=l===!0?0:1,m,p,_=null,x=0,g=null;function b(N){let I=N.isScene===!0?N.background:null;if(I&&I.isTexture){const U=N.backgroundBlurriness>0;I=e.get(I,U)}return I}function M(N){let I=!1;const U=b(N);U===null?S(f,h):U&&U.isColor&&(S(U,1),I=!0);const k=r.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,c):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(N,I){const U=b(I);U&&(U.isCubeTexture||U.mapping===sf)?(p===void 0&&(p=new Pa(new ac(1,1,1),new Fa({name:"BackgroundCubeMaterial",uniforms:Xo(Ca.backgroundCube.uniforms),vertexShader:Ca.backgroundCube.vertexShader,fragmentShader:Ca.backgroundCube.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(k,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=U,p.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(yw.makeRotationFromEuler(I.backgroundRotation)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(vb),p.material.toneMapped=kt.getTransfer(U.colorSpace)!==on,(_!==U||x!==U.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,_=U,x=U.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):U&&U.isTexture&&(m===void 0&&(m=new Pa(new of(2,2),new Fa({name:"BackgroundMaterial",uniforms:Xo(Ca.background.uniforms),vertexShader:Ca.background.vertexShader,fragmentShader:Ca.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=U,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=kt.getTransfer(U.colorSpace)!==on,U.matrixAutoUpdate===!0&&U.updateMatrix(),m.material.uniforms.uvTransform.value.copy(U.matrix),(_!==U||x!==U.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=U,x=U.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function S(N,I){N.getRGB(Pu,mb(r)),i.buffers.color.setClear(Pu.r,Pu.g,Pu.b,I,c)}function E(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,I=1){f.set(N),h=I,S(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,S(f,h)},render:M,addToRenderList:R,dispose:E}}function Sw(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(G,q,ie,ee,V){let D=!1;const z=x(G,ee,ie,q);c!==z&&(c=z,p(c.object)),D=b(G,ee,ie,V),D&&M(G,ee,ie,V),V!==null&&e.update(V,r.ELEMENT_ARRAY_BUFFER),(D||f)&&(f=!1,U(G,q,ie,ee),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function m(){return r.createVertexArray()}function p(G){return r.bindVertexArray(G)}function _(G){return r.deleteVertexArray(G)}function x(G,q,ie,ee){const V=ee.wireframe===!0;let D=s[q.id];D===void 0&&(D={},s[q.id]=D);const z=G.isInstancedMesh===!0?G.id:0;let K=D[z];K===void 0&&(K={},D[z]=K);let ue=K[ie.id];ue===void 0&&(ue={},K[ie.id]=ue);let ge=ue[V];return ge===void 0&&(ge=g(m()),ue[V]=ge),ge}function g(G){const q=[],ie=[],ee=[];for(let V=0;V<i;V++)q[V]=0,ie[V]=0,ee[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ie,attributeDivisors:ee,object:G,attributes:{},index:null}}function b(G,q,ie,ee){const V=c.attributes,D=q.attributes;let z=0;const K=ie.getAttributes();for(const ue in K)if(K[ue].location>=0){const P=V[ue];let Z=D[ue];if(Z===void 0&&(ue==="instanceMatrix"&&G.instanceMatrix&&(Z=G.instanceMatrix),ue==="instanceColor"&&G.instanceColor&&(Z=G.instanceColor)),P===void 0||P.attribute!==Z||Z&&P.data!==Z.data)return!0;z++}return c.attributesNum!==z||c.index!==ee}function M(G,q,ie,ee){const V={},D=q.attributes;let z=0;const K=ie.getAttributes();for(const ue in K)if(K[ue].location>=0){let P=D[ue];P===void 0&&(ue==="instanceMatrix"&&G.instanceMatrix&&(P=G.instanceMatrix),ue==="instanceColor"&&G.instanceColor&&(P=G.instanceColor));const Z={};Z.attribute=P,P&&P.data&&(Z.data=P.data),V[ue]=Z,z++}c.attributes=V,c.attributesNum=z,c.index=ee}function R(){const G=c.newAttributes;for(let q=0,ie=G.length;q<ie;q++)G[q]=0}function S(G){E(G,0)}function E(G,q){const ie=c.newAttributes,ee=c.enabledAttributes,V=c.attributeDivisors;ie[G]=1,ee[G]===0&&(r.enableVertexAttribArray(G),ee[G]=1),V[G]!==q&&(r.vertexAttribDivisor(G,q),V[G]=q)}function N(){const G=c.newAttributes,q=c.enabledAttributes;for(let ie=0,ee=q.length;ie<ee;ie++)q[ie]!==G[ie]&&(r.disableVertexAttribArray(ie),q[ie]=0)}function I(G,q,ie,ee,V,D,z){z===!0?r.vertexAttribIPointer(G,q,ie,V,D):r.vertexAttribPointer(G,q,ie,ee,V,D)}function U(G,q,ie,ee){R();const V=ee.attributes,D=ie.getAttributes(),z=q.defaultAttributeValues;for(const K in D){const ue=D[K];if(ue.location>=0){let ge=V[K];if(ge===void 0&&(K==="instanceMatrix"&&G.instanceMatrix&&(ge=G.instanceMatrix),K==="instanceColor"&&G.instanceColor&&(ge=G.instanceColor)),ge!==void 0){const P=ge.normalized,Z=ge.itemSize,_e=e.get(ge);if(_e===void 0)continue;const Ae=_e.buffer,Oe=_e.type,te=_e.bytesPerElement,be=Oe===r.INT||Oe===r.UNSIGNED_INT||ge.gpuType===Qp;if(ge.isInterleavedBufferAttribute){const Ee=ge.data,He=Ee.stride,qe=ge.offset;if(Ee.isInstancedInterleavedBuffer){for(let Qe=0;Qe<ue.locationSize;Qe++)E(ue.location+Qe,Ee.meshPerAttribute);G.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Qe=0;Qe<ue.locationSize;Qe++)S(ue.location+Qe);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let Qe=0;Qe<ue.locationSize;Qe++)I(ue.location+Qe,Z/ue.locationSize,Oe,P,He*te,(qe+Z/ue.locationSize*Qe)*te,be)}else{if(ge.isInstancedBufferAttribute){for(let Ee=0;Ee<ue.locationSize;Ee++)E(ue.location+Ee,ge.meshPerAttribute);G.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ee=0;Ee<ue.locationSize;Ee++)S(ue.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let Ee=0;Ee<ue.locationSize;Ee++)I(ue.location+Ee,Z/ue.locationSize,Oe,P,Z*te,Z/ue.locationSize*Ee*te,be)}}else if(z!==void 0){const P=z[K];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ue.location,P);break;case 3:r.vertexAttrib3fv(ue.location,P);break;case 4:r.vertexAttrib4fv(ue.location,P);break;default:r.vertexAttrib1fv(ue.location,P)}}}}N()}function k(){F();for(const G in s){const q=s[G];for(const ie in q){const ee=q[ie];for(const V in ee){const D=ee[V];for(const z in D)_(D[z].object),delete D[z];delete ee[V]}}delete s[G]}}function L(G){if(s[G.id]===void 0)return;const q=s[G.id];for(const ie in q){const ee=q[ie];for(const V in ee){const D=ee[V];for(const z in D)_(D[z].object),delete D[z];delete ee[V]}}delete s[G.id]}function B(G){for(const q in s){const ie=s[q];for(const ee in ie){const V=ie[ee];if(V[G.id]===void 0)continue;const D=V[G.id];for(const z in D)_(D[z].object),delete D[z];delete V[G.id]}}}function A(G){for(const q in s){const ie=s[q],ee=G.isInstancedMesh===!0?G.id:0,V=ie[ee];if(V!==void 0){for(const D in V){const z=V[D];for(const K in z)_(z[K].object),delete z[K];delete V[D]}delete ie[ee],Object.keys(ie).length===0&&delete s[q]}}}function F(){j(),f=!0,c!==l&&(c=l,p(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:j,dispose:k,releaseStatesOfGeometry:L,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:R,enableAttribute:S,disableUnusedAttributes:N}}function Mw(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,_){_!==0&&(r.drawArraysInstanced(s,m,p,_),i.update(p,s,_))}function h(m,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,_);let g=0;for(let b=0;b<_;b++)g+=p[b];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function Tw(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==va&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const A=B===hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==aa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==Na&&!A)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const _=m(p);_!==p&&(dt("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const x=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),E=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),k=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:b,maxVertexTextures:M,maxTextureSize:R,maxCubemapSize:S,maxAttributes:E,maxVertexUniforms:N,maxVaryings:I,maxFragmentUniforms:U,maxSamples:k,samples:L}}function Aw(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new qs,h=new _t,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const b=x.length!==0||g||s!==0||l;return l=g,s=x.length,b},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,g){i=_(x,g,0)},this.setState=function(x,g,b){const M=x.clippingPlanes,R=x.clipIntersection,S=x.clipShadows,E=r.get(x);if(!l||M===null||M.length===0||c&&!S)c?_(null):p();else{const N=c?0:s,I=N*4;let U=E.clippingState||null;m.value=U,U=_(M,g,I,b);for(let k=0;k!==I;++k)U[k]=i[k];E.clippingState=U,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(x,g,b,M){const R=x!==null?x.length:0;let S=null;if(R!==0){if(S=m.value,M!==!0||S===null){const E=b+R*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(S===null||S.length<E)&&(S=new Float32Array(E));for(let I=0,U=b;I!==R;++I,U+=4)f.copy(x[I]).applyMatrix4(N,h),f.normal.toArray(S,U),S[U+3]=f.constant}m.value=S,m.needsUpdate=!0}return e.numPlanes=R,e.numIntersection=0,S}}const Ks=4,nv=[.125,.215,.35,.446,.526,.582],wr=20,ww=256,Gl=new xb,iv=new dn;let jh=null,Xh=0,Yh=0,Wh=!1;const Rw=new se;class av{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=Rw}=c;jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),Wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ov(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(jh,Xh,Yh),this._renderer.xr.enabled=Wh,e.scissorTest=!1,Po(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Dr||e.mapping===Vo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),Wh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:di,minFilter:di,generateMipmaps:!1,type:hs,format:va,colorSpace:ef,depthBuffer:!1},l=sv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cw(c)),this._blurMaterial=Ow(c,e,i),this._ggxMaterial=Nw(c,e,i)}return l}_compileMaterial(e){const i=new Pa(new Ba,e);this._renderer.compile(i,Gl)}_sceneToCubeUV(e,i,s,l,c){const m=new ia(90,1,i,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,b=x.toneMapping;x.getClearColor(iv),x.toneMapping=Da,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pa(new ac,new lm({name:"PMREM.Background",side:Ci,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,S=R.material;let E=!1;const N=e.background;N?N.isColor&&(S.color.copy(N),e.background=null,E=!0):(S.color.copy(iv),E=!0);for(let I=0;I<6;I++){const U=I%3;U===0?(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[I],c.y,c.z)):U===1?(m.up.set(0,0,p[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[I],c.z)):(m.up.set(0,p[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[I]));const k=this._cubeSize;Po(l,U*k,I>2?k:0,k,k),x.setRenderTarget(l),E&&x.render(R,m),x.render(e,m)}x.toneMapping=b,x.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Dr||e.mapping===Vo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=ov()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Po(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Gl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),x=Math.sqrt(p*p-_*_),g=0+p*1.25,b=x*g,{_lodMax:M}=this,R=this._sizeLods[s],S=3*R*(s>M-Ks?s-M+Ks:0),E=4*(this._cubeSize-R);m.envMap.value=e.texture,m.roughness.value=b,m.mipInt.value=M-i,Po(c,S,E,3*R,2*R),l.setRenderTarget(c),l.render(h,Gl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-s,Po(e,S,E,3*R,2*R),l.setRenderTarget(e),l.render(h,Gl)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&Wt("blur direction must be either latitudinal or longitudinal!");const _=3,x=this._lodMeshes[l];x.material=p;const g=p.uniforms,b=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*wr-1),R=c/M,S=isFinite(c)?1+Math.floor(_*R):wr;S>wr&&dt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${wr}`);const E=[];let N=0;for(let B=0;B<wr;++B){const A=B/R,F=Math.exp(-A*A/2);E.push(F),B===0?N+=F:B<S&&(N+=2*F)}for(let B=0;B<E.length;B++)E[B]=E[B]/N;g.envMap.value=e.texture,g.samples.value=S,g.weights.value=E,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:I}=this;g.dTheta.value=M,g.mipInt.value=I-s;const U=this._sizeLods[l],k=3*U*(l>I-Ks?l-I+Ks:0),L=4*(this._cubeSize-U);Po(i,k,L,3*U,2*U),m.setRenderTarget(i),m.render(x,Gl)}}function Cw(r){const e=[],i=[],s=[];let l=r;const c=r-Ks+1+nv.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-Ks?m=nv[f-r+Ks-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),_=-p,x=1+p,g=[_,_,x,_,x,x,_,_,x,x,_,x],b=6,M=6,R=3,S=2,E=1,N=new Float32Array(R*M*b),I=new Float32Array(S*M*b),U=new Float32Array(E*M*b);for(let L=0;L<b;L++){const B=L%3*2/3-1,A=L>2?0:-1,F=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];N.set(F,R*M*L),I.set(g,S*M*L);const j=[L,L,L,L,L,L];U.set(j,E*M*L)}const k=new Ba;k.setAttribute("position",new Ia(N,R)),k.setAttribute("uv",new Ia(I,S)),k.setAttribute("faceIndex",new Ia(U,E)),s.push(new Pa(k,null)),l>Ks&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function sv(r,e,i){const s=new La(r,e,i);return s.texture.mapping=sf,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Po(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function Nw(r,e,i){return new Fa({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ww,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lf(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Ow(r,e,i){const s=new Float32Array(wr),l=new se(0,1,0);return new Fa({name:"SphericalGaussianBlur",defines:{n:wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:lf(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function rv(){return new Fa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lf(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function ov(){return new Fa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function lf(){return`

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
	`}class bb extends La{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new hb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new ac(5,5,5),c=new Fa({name:"CubemapFromEquirect",uniforms:Xo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Ci,blending:fs});c.uniforms.tEquirect.value=i;const f=new Pa(l,c),h=i.minFilter;return i.minFilter===Rr&&(i.minFilter=di),new PT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function Dw(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,b=!1){return g==null?null:b?f(g):c(g)}function c(g){if(g&&g.isTexture){const b=g.mapping;if(b===ku||b===_h)if(e.has(g)){const M=e.get(g).texture;return h(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const R=new bb(M.height);return R.fromEquirectangularTexture(r,g),e.set(g,R),g.addEventListener("dispose",p),h(R.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const b=g.mapping,M=b===ku||b===_h,R=b===Dr||b===Vo;if(M||R){let S=i.get(g);const E=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==E)return s===null&&(s=new av(r)),S=M?s.fromEquirectangular(g,S):s.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),S.texture;if(S!==void 0)return S.texture;{const N=g.image;return M&&N&&N.height>0||R&&N&&m(N)?(s===null&&(s=new av(r)),S=M?s.fromEquirectangular(g):s.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),g.addEventListener("dispose",_),S.texture):null}}}return g}function h(g,b){return b===ku?g.mapping=Dr:b===_h&&(g.mapping=Vo),g}function m(g){let b=0;const M=6;for(let R=0;R<M;R++)g[R]!==void 0&&b++;return b===M}function p(g){const b=g.target;b.removeEventListener("dispose",p);const M=e.get(b);M!==void 0&&(e.delete(b),M.dispose())}function _(g){const b=g.target;b.removeEventListener("dispose",_);const M=i.get(b);M!==void 0&&(i.delete(b),M.dispose())}function x(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:x}}function Lw(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Vp("WebGLRenderer: "+s+" extension not supported."),l}}}function Iw(r,e,i,s){const l={},c=new WeakMap;function f(x){const g=x.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",f),delete l[g.id];const b=c.get(g);b&&(e.remove(b),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(x,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(x){const g=x.attributes;for(const b in g)e.update(g[b],r.ARRAY_BUFFER)}function p(x){const g=[],b=x.index,M=x.attributes.position;let R=0;if(M===void 0)return;if(b!==null){const N=b.array;R=b.version;for(let I=0,U=N.length;I<U;I+=3){const k=N[I+0],L=N[I+1],B=N[I+2];g.push(k,L,L,B,B,k)}}else{const N=M.array;R=M.version;for(let I=0,U=N.length/3-1;I<U;I+=3){const k=I+0,L=I+1,B=I+2;g.push(k,L,L,B,B,k)}}const S=new(M.count>=65535?ub:cb)(g,1);S.version=R;const E=c.get(x);E&&e.remove(E),c.set(x,S)}function _(x){const g=c.get(x);if(g){const b=x.index;b!==null&&g.version<b.version&&p(x)}else p(x);return c.get(x)}return{get:h,update:m,getWireframeAttribute:_}}function Uw(r,e,i){let s;function l(x){s=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function m(x,g){r.drawElements(s,g,c,x*f),i.update(g,s,1)}function p(x,g,b){b!==0&&(r.drawElementsInstanced(s,g,c,x*f,b),i.update(g,s,b))}function _(x,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,x,0,b);let R=0;for(let S=0;S<b;S++)R+=g[S];i.update(R,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=_}function Pw(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:Wt("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Fw(r,e,i){const s=new WeakMap,l=new Ln;function c(f,h,m){const p=f.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=_!==void 0?_.length:0;let g=s.get(h);if(g===void 0||g.count!==x){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const b=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let I=0;b===!0&&(I=1),M===!0&&(I=2),R===!0&&(I=3);let U=h.attributes.position.count*I,k=1;U>e.maxTextureSize&&(k=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const L=new Float32Array(U*k*4*x),B=new rb(L,U,k,x);B.type=Na,B.needsUpdate=!0;const A=I*4;for(let j=0;j<x;j++){const G=S[j],q=E[j],ie=N[j],ee=U*k*4*j;for(let V=0;V<G.count;V++){const D=V*A;b===!0&&(l.fromBufferAttribute(G,V),L[ee+D+0]=l.x,L[ee+D+1]=l.y,L[ee+D+2]=l.z,L[ee+D+3]=0),M===!0&&(l.fromBufferAttribute(q,V),L[ee+D+4]=l.x,L[ee+D+5]=l.y,L[ee+D+6]=l.z,L[ee+D+7]=0),R===!0&&(l.fromBufferAttribute(ie,V),L[ee+D+8]=l.x,L[ee+D+9]=l.y,L[ee+D+10]=l.z,L[ee+D+11]=ie.itemSize===4?l.w:1)}}g={count:x,texture:B,size:new wt(U,k)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let b=0;for(let R=0;R<p.length;R++)b+=p[R];const M=h.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",M),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function Bw(r,e,i,s,l){let c=new WeakMap;function f(p){const _=l.render.frame,x=p.geometry,g=e.get(p,x);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==_&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const b=p.skeleton;c.get(b)!==_&&(b.update(),c.set(b,_))}return g}function h(){c=new WeakMap}function m(p){const _=p.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:h}}const zw={[jv]:"LINEAR_TONE_MAPPING",[Xv]:"REINHARD_TONE_MAPPING",[Yv]:"CINEON_TONE_MAPPING",[Wv]:"ACES_FILMIC_TONE_MAPPING",[$v]:"AGX_TONE_MAPPING",[Kv]:"NEUTRAL_TONE_MAPPING",[qv]:"CUSTOM_TONE_MAPPING"};function Gw(r,e,i,s,l){const c=new La(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new jo(e,i):void 0}),f=new La(e,i,{type:hs,depthBuffer:!1,stencilBuffer:!1}),h=new Ba;h.setAttribute("position",new sa([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new sa([0,2,0,0,2,0],2));const m=new CT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Pa(h,m),_=new xb(-1,1,1,-1,0,1);let x=null,g=null,b=!1,M,R=null,S=[],E=!1;this.setSize=function(N,I){c.setSize(N,I),f.setSize(N,I);for(let U=0;U<S.length;U++){const k=S[U];k.setSize&&k.setSize(N,I)}},this.setEffects=function(N){S=N,E=S.length>0&&S[0].isRenderPass===!0;const I=c.width,U=c.height;for(let k=0;k<S.length;k++){const L=S[k];L.setSize&&L.setSize(I,U)}},this.begin=function(N,I){if(b||N.toneMapping===Da&&S.length===0)return!1;if(R=I,I!==null){const U=I.width,k=I.height;(c.width!==U||c.height!==k)&&this.setSize(U,k)}return E===!1&&N.setRenderTarget(c),M=N.toneMapping,N.toneMapping=Da,!0},this.hasRenderPass=function(){return E},this.end=function(N,I){N.toneMapping=M,b=!0;let U=c,k=f;for(let L=0;L<S.length;L++){const B=S[L];if(B.enabled!==!1&&(B.render(N,k,U,I),B.needsSwap!==!1)){const A=U;U=k,k=A}}if(x!==N.outputColorSpace||g!==N.toneMapping){x=N.outputColorSpace,g=N.toneMapping,m.defines={},kt.getTransfer(x)===on&&(m.defines.SRGB_TRANSFER="");const L=zw[g];L&&(m.defines[L]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=U.texture,N.setRenderTarget(R),N.render(p,_),R=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const yb=new hi,Xp=new jo(1,1),Eb=new rb,Sb=new rT,Mb=new hb,lv=[],cv=[],uv=new Float32Array(16),fv=new Float32Array(9),dv=new Float32Array(4);function Yo(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=lv[l];if(c===void 0&&(c=new Float32Array(l),lv[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function Yn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function Wn(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function cf(r,e){let i=cv[e];i===void 0&&(i=new Int32Array(e),cv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function Hw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function kw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Yn(i,e))return;r.uniform2fv(this.addr,e),Wn(i,e)}}function Vw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Yn(i,e))return;r.uniform3fv(this.addr,e),Wn(i,e)}}function jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Yn(i,e))return;r.uniform4fv(this.addr,e),Wn(i,e)}}function Xw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Yn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),Wn(i,e)}else{if(Yn(i,s))return;dv.set(s),r.uniformMatrix2fv(this.addr,!1,dv),Wn(i,s)}}function Yw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Yn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),Wn(i,e)}else{if(Yn(i,s))return;fv.set(s),r.uniformMatrix3fv(this.addr,!1,fv),Wn(i,s)}}function Ww(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Yn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),Wn(i,e)}else{if(Yn(i,s))return;uv.set(s),r.uniformMatrix4fv(this.addr,!1,uv),Wn(i,s)}}function qw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function $w(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Yn(i,e))return;r.uniform2iv(this.addr,e),Wn(i,e)}}function Kw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Yn(i,e))return;r.uniform3iv(this.addr,e),Wn(i,e)}}function Zw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Yn(i,e))return;r.uniform4iv(this.addr,e),Wn(i,e)}}function Qw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function Jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Yn(i,e))return;r.uniform2uiv(this.addr,e),Wn(i,e)}}function eR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Yn(i,e))return;r.uniform3uiv(this.addr,e),Wn(i,e)}}function tR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Yn(i,e))return;r.uniform4uiv(this.addr,e),Wn(i,e)}}function nR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Xp.compareFunction=i.isReversedDepthBuffer()?sm:am,c=Xp):c=yb,i.setTexture2D(e||c,l)}function iR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Sb,l)}function aR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||Mb,l)}function sR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||Eb,l)}function rR(r){switch(r){case 5126:return Hw;case 35664:return kw;case 35665:return Vw;case 35666:return jw;case 35674:return Xw;case 35675:return Yw;case 35676:return Ww;case 5124:case 35670:return qw;case 35667:case 35671:return $w;case 35668:case 35672:return Kw;case 35669:case 35673:return Zw;case 5125:return Qw;case 36294:return Jw;case 36295:return eR;case 36296:return tR;case 35678:case 36198:case 36298:case 36306:case 35682:return nR;case 35679:case 36299:case 36307:return iR;case 35680:case 36300:case 36308:case 36293:return aR;case 36289:case 36303:case 36311:case 36292:return sR}}function oR(r,e){r.uniform1fv(this.addr,e)}function lR(r,e){const i=Yo(e,this.size,2);r.uniform2fv(this.addr,i)}function cR(r,e){const i=Yo(e,this.size,3);r.uniform3fv(this.addr,i)}function uR(r,e){const i=Yo(e,this.size,4);r.uniform4fv(this.addr,i)}function fR(r,e){const i=Yo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function dR(r,e){const i=Yo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function hR(r,e){const i=Yo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function pR(r,e){r.uniform1iv(this.addr,e)}function mR(r,e){r.uniform2iv(this.addr,e)}function gR(r,e){r.uniform3iv(this.addr,e)}function xR(r,e){r.uniform4iv(this.addr,e)}function _R(r,e){r.uniform1uiv(this.addr,e)}function vR(r,e){r.uniform2uiv(this.addr,e)}function bR(r,e){r.uniform3uiv(this.addr,e)}function yR(r,e){r.uniform4uiv(this.addr,e)}function ER(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Yn(s,c)||(r.uniform1iv(this.addr,c),Wn(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Xp:f=yb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function SR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Yn(s,c)||(r.uniform1iv(this.addr,c),Wn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||Sb,c[f])}function MR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Yn(s,c)||(r.uniform1iv(this.addr,c),Wn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||Mb,c[f])}function TR(r,e,i){const s=this.cache,l=e.length,c=cf(i,l);Yn(s,c)||(r.uniform1iv(this.addr,c),Wn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||Eb,c[f])}function AR(r){switch(r){case 5126:return oR;case 35664:return lR;case 35665:return cR;case 35666:return uR;case 35674:return fR;case 35675:return dR;case 35676:return hR;case 5124:case 35670:return pR;case 35667:case 35671:return mR;case 35668:case 35672:return gR;case 35669:case 35673:return xR;case 5125:return _R;case 36294:return vR;case 36295:return bR;case 36296:return yR;case 35678:case 36198:case 36298:case 36306:case 35682:return ER;case 35679:case 36299:case 36307:return SR;case 35680:case 36300:case 36308:case 36293:return MR;case 36289:case 36303:case 36311:case 36292:return TR}}class wR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=rR(i.type)}}class RR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=AR(i.type)}}class CR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const qh=/(\w+)(\])?(\[|\.)?/g;function hv(r,e){r.seq.push(e),r.map[e.id]=e}function NR(r,e,i){const s=r.name,l=s.length;for(qh.lastIndex=0;;){const c=qh.exec(s),f=qh.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){hv(i,p===void 0?new wR(h,r,e):new RR(h,r,e));break}else{let x=i.map[h];x===void 0&&(x=new CR(h),hv(i,x)),i=x}}}class qu{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);NR(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function pv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const OR=37297;let DR=0;function LR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const mv=new _t;function IR(r){kt._getMatrix(mv,kt.workingColorSpace,r);const e=`mat3( ${mv.elements.map(i=>i.toFixed(4))} )`;switch(kt.getTransfer(r)){case tf:return[e,"LinearTransferOETF"];case on:return[e,"sRGBTransferOETF"];default:return dt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function gv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+LR(r.getShaderSource(e),h)}else return c}function UR(r,e){const i=IR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const PR={[jv]:"Linear",[Xv]:"Reinhard",[Yv]:"Cineon",[Wv]:"ACESFilmic",[$v]:"AgX",[Kv]:"Neutral",[qv]:"Custom"};function FR(r,e){const i=PR[e];return i===void 0?(dt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Fu=new se;function BR(){kt.getLuminanceCoefficients(Fu);const r=Fu.x.toFixed(4),e=Fu.y.toFixed(4),i=Fu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vl).join(`
`)}function GR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function HR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function Vl(r){return r!==""}function xv(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _v(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yp(r){return r.replace(kR,jR)}const VR=new Map;function jR(r,e){let i=Tt[e];if(i===void 0){const s=VR.get(e);if(s!==void 0)i=Tt[s],dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Yp(i)}const XR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vv(r){return r.replace(XR,YR)}function YR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function bv(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const WR={[Hu]:"SHADOWMAP_TYPE_PCF",[kl]:"SHADOWMAP_TYPE_VSM"};function qR(r){return WR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $R={[Dr]:"ENVMAP_TYPE_CUBE",[Vo]:"ENVMAP_TYPE_CUBE",[sf]:"ENVMAP_TYPE_CUBE_UV"};function KR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":$R[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const ZR={[Vo]:"ENVMAP_MODE_REFRACTION"};function QR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":ZR[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const JR={[Vv]:"ENVMAP_BLENDING_MULTIPLY",[BM]:"ENVMAP_BLENDING_MIX",[zM]:"ENVMAP_BLENDING_ADD"};function eC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":JR[r.combine]||"ENVMAP_BLENDING_NONE"}function tC(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function nC(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=qR(i),p=KR(i),_=QR(i),x=eC(i),g=tC(i),b=zR(i),M=GR(c),R=l.createProgram();let S,E,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Vl).join(`
`),S.length>0&&(S+=`
`),E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Vl).join(`
`),E.length>0&&(E+=`
`)):(S=[bv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vl).join(`
`),E=[bv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+_:"",i.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Da?"#define TONE_MAPPING":"",i.toneMapping!==Da?Tt.tonemapping_pars_fragment:"",i.toneMapping!==Da?FR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Tt.colorspace_pars_fragment,UR("linearToOutputTexel",i.outputColorSpace),BR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Vl).join(`
`)),f=Yp(f),f=xv(f,i),f=_v(f,i),h=Yp(h),h=xv(h,i),h=_v(h,i),f=vv(f),h=vv(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,S=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,E=["#define varying in",i.glslVersion===D_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===D_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const I=N+S+f,U=N+E+h,k=pv(l,l.VERTEX_SHADER,I),L=pv(l,l.FRAGMENT_SHADER,U);l.attachShader(R,k),l.attachShader(R,L),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function B(G){if(r.debug.checkShaderErrors){const q=l.getProgramInfoLog(R)||"",ie=l.getShaderInfoLog(k)||"",ee=l.getShaderInfoLog(L)||"",V=q.trim(),D=ie.trim(),z=ee.trim();let K=!0,ue=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,k,L);else{const ge=gv(l,k,"vertex"),P=gv(l,L,"fragment");Wt("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+V+`
`+ge+`
`+P)}else V!==""?dt("WebGLProgram: Program Info Log:",V):(D===""||z==="")&&(ue=!1);ue&&(G.diagnostics={runnable:K,programLog:V,vertexShader:{log:D,prefix:S},fragmentShader:{log:z,prefix:E}})}l.deleteShader(k),l.deleteShader(L),A=new qu(l,R),F=HR(l,R)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let j=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=l.getProgramParameter(R,OR)),j},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=DR++,this.cacheKey=e,this.usedTimes=1,this.program=R,this.vertexShader=k,this.fragmentShader=L,this}let iC=0;class aC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new sC(e),i.set(e,s)),s}}class sC{constructor(e){this.id=iC++,this.code=e,this.usedTimes=0}}function rC(r){return r===Lr||r===Qu||r===Ju}function oC(r,e,i,s,l,c){const f=new ob,h=new aC,m=new Set,p=[],_=new Map,x=s.logarithmicDepthBuffer;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return m.add(A),A===0?"uv":`uv${A}`}function R(A,F,j,G,q,ie){const ee=G.fog,V=q.geometry,D=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?G.environment:null,z=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,K=e.get(A.envMap||D,z),ue=K&&K.mapping===sf?K.image.height:null,ge=b[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&dt("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const P=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Z=P!==void 0?P.length:0;let _e=0;V.morphAttributes.position!==void 0&&(_e=1),V.morphAttributes.normal!==void 0&&(_e=2),V.morphAttributes.color!==void 0&&(_e=3);let Ae,Oe,te,be;if(ge){const at=Ca[ge];Ae=at.vertexShader,Oe=at.fragmentShader}else Ae=A.vertexShader,Oe=A.fragmentShader,h.update(A),te=h.getVertexShaderID(A),be=h.getFragmentShaderID(A);const Ee=r.getRenderTarget(),He=r.state.buffers.depth.getReversed(),qe=q.isInstancedMesh===!0,Qe=q.isBatchedMesh===!0,vt=!!A.map,Xe=!!A.matcap,pt=!!K,Nt=!!A.aoMap,ct=!!A.lightMap,Rt=!!A.bumpMap,zt=!!A.normalMap,$e=!!A.displacementMap,Y=!!A.emissiveMap,Et=!!A.metalnessMap,ut=!!A.roughnessMap,Gt=A.anisotropy>0,Re=A.clearcoat>0,Vt=A.dispersion>0,O=A.iridescence>0,T=A.sheen>0,J=A.transmission>0,he=Gt&&!!A.anisotropyMap,Me=Re&&!!A.clearcoatMap,Ne=Re&&!!A.clearcoatNormalMap,Pe=Re&&!!A.clearcoatRoughnessMap,fe=O&&!!A.iridescenceMap,me=O&&!!A.iridescenceThicknessMap,De=T&&!!A.sheenColorMap,Be=T&&!!A.sheenRoughnessMap,Le=!!A.specularMap,Ie=!!A.specularColorMap,it=!!A.specularIntensityMap,rt=J&&!!A.transmissionMap,mt=J&&!!A.thicknessMap,X=!!A.gradientMap,Ce=!!A.alphaMap,pe=A.alphaTest>0,ze=!!A.alphaHash,Ue=!!A.extensions;let Se=Da;A.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(Se=r.toneMapping);const We={shaderID:ge,shaderType:A.type,shaderName:A.name,vertexShader:Ae,fragmentShader:Oe,defines:A.defines,customVertexShaderID:te,customFragmentShaderID:be,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&q._colorsTexture!==null,instancing:qe,instancingColor:qe&&q.instanceColor!==null,instancingMorph:qe&&q.morphTexture!==null,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:vt,matcap:Xe,envMap:pt,envMapMode:pt&&K.mapping,envMapCubeUVHeight:ue,aoMap:Nt,lightMap:ct,bumpMap:Rt,normalMap:zt,displacementMap:$e,emissiveMap:Y,normalMapObjectSpace:zt&&A.normalMapType===kM,normalMapTangentSpace:zt&&A.normalMapType===C_,packedNormalMap:zt&&A.normalMapType===C_&&rC(A.normalMap.format),metalnessMap:Et,roughnessMap:ut,anisotropy:Gt,anisotropyMap:he,clearcoat:Re,clearcoatMap:Me,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Pe,dispersion:Vt,iridescence:O,iridescenceMap:fe,iridescenceThicknessMap:me,sheen:T,sheenColorMap:De,sheenRoughnessMap:Be,specularMap:Le,specularColorMap:Ie,specularIntensityMap:it,transmission:J,transmissionMap:rt,thicknessMap:mt,gradientMap:X,opaque:A.transparent===!1&&A.blending===zo&&A.alphaToCoverage===!1,alphaMap:Ce,alphaTest:pe,alphaHash:ze,combine:A.combine,mapUv:vt&&M(A.map.channel),aoMapUv:Nt&&M(A.aoMap.channel),lightMapUv:ct&&M(A.lightMap.channel),bumpMapUv:Rt&&M(A.bumpMap.channel),normalMapUv:zt&&M(A.normalMap.channel),displacementMapUv:$e&&M(A.displacementMap.channel),emissiveMapUv:Y&&M(A.emissiveMap.channel),metalnessMapUv:Et&&M(A.metalnessMap.channel),roughnessMapUv:ut&&M(A.roughnessMap.channel),anisotropyMapUv:he&&M(A.anisotropyMap.channel),clearcoatMapUv:Me&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:me&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:De&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:Be&&M(A.sheenRoughnessMap.channel),specularMapUv:Le&&M(A.specularMap.channel),specularColorMapUv:Ie&&M(A.specularColorMap.channel),specularIntensityMapUv:it&&M(A.specularIntensityMap.channel),transmissionMapUv:rt&&M(A.transmissionMap.channel),thicknessMapUv:mt&&M(A.thicknessMap.channel),alphaMapUv:Ce&&M(A.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(zt||Gt),vertexNormals:!!V.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!V.attributes.uv&&(vt||Ce),fog:!!ee,useFog:A.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||V.attributes.normal===void 0&&zt===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:He,skinning:q.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:_e,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:ie.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&j.length>0,shadowMapType:r.shadowMap.type,toneMapping:Se,decodeVideoTexture:vt&&A.map.isVideoTexture===!0&&kt.getTransfer(A.map.colorSpace)===on,decodeVideoTextureEmissive:Y&&A.emissiveMap.isVideoTexture===!0&&kt.getTransfer(A.emissiveMap.colorSpace)===on,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===cs,flipSided:A.side===Ci,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ue&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&A.extensions.multiDraw===!0||Qe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return We.vertexUv1s=m.has(1),We.vertexUv2s=m.has(2),We.vertexUv3s=m.has(3),m.clear(),We}function S(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const j in A.defines)F.push(j),F.push(A.defines[j]);return A.isRawShaderMaterial===!1&&(E(F,A),N(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function E(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function N(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function I(A){const F=b[A.type];let j;if(F){const G=Ca[F];j=AT.clone(G.uniforms)}else j=A.uniforms;return j}function U(A,F){let j=_.get(F);return j!==void 0?++j.usedTimes:(j=new nC(r,F,A,l),p.push(j),_.set(F,j)),j}function k(A){if(--A.usedTimes===0){const F=p.indexOf(A);p[F]=p[p.length-1],p.pop(),_.delete(A.cacheKey),A.destroy()}}function L(A){h.remove(A)}function B(){h.dispose()}return{getParameters:R,getProgramCacheKey:S,getUniforms:I,acquireProgram:U,releaseProgram:k,releaseShaderCache:L,programs:p,dispose:B}}function lC(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function cC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function yv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ev(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let b=0;return g.isInstancedMesh&&(b+=2),g.isSkinnedMesh&&(b+=1),b}function h(g,b,M,R,S,E){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:b,material:M,materialVariant:f(g),groupOrder:R,renderOrder:g.renderOrder,z:S,group:E},r[e]=N):(N.id=g.id,N.object=g,N.geometry=b,N.material=M,N.materialVariant=f(g),N.groupOrder=R,N.renderOrder=g.renderOrder,N.z=S,N.group=E),e++,N}function m(g,b,M,R,S,E){const N=h(g,b,M,R,S,E);M.transmission>0?s.push(N):M.transparent===!0?l.push(N):i.push(N)}function p(g,b,M,R,S,E){const N=h(g,b,M,R,S,E);M.transmission>0?s.unshift(N):M.transparent===!0?l.unshift(N):i.unshift(N)}function _(g,b){i.length>1&&i.sort(g||cC),s.length>1&&s.sort(b||yv),l.length>1&&l.sort(b||yv)}function x(){for(let g=e,b=r.length;g<b;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:x,sort:_}}function uC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new Ev,r.set(s,[f])):l>=c.length?(f=new Ev,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function fC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new se,color:new dn};break;case"SpotLight":i={position:new se,direction:new se,color:new dn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new se,color:new dn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new se,skyColor:new dn,groundColor:new dn};break;case"RectAreaLight":i={color:new dn,position:new se,halfWidth:new se,halfHeight:new se};break}return r[e.id]=i,i}}}function dC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let hC=0;function pC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function mC(r){const e=new fC,i=dC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new se);const l=new se,c=new Xn,f=new Xn;function h(p){let _=0,x=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let b=0,M=0,R=0,S=0,E=0,N=0,I=0,U=0,k=0,L=0,B=0;p.sort(pC);for(let F=0,j=p.length;F<j;F++){const G=p[F],q=G.color,ie=G.intensity,ee=G.distance;let V=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Lr?V=G.shadow.map.texture:V=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)_+=q.r*ie,x+=q.g*ie,g+=q.b*ie;else if(G.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(G.sh.coefficients[D],ie);B++}else if(G.isDirectionalLight){const D=e.get(G);if(D.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const z=G.shadow,K=i.get(G);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,s.directionalShadow[b]=K,s.directionalShadowMap[b]=V,s.directionalShadowMatrix[b]=G.shadow.matrix,N++}s.directional[b]=D,b++}else if(G.isSpotLight){const D=e.get(G);D.position.setFromMatrixPosition(G.matrixWorld),D.color.copy(q).multiplyScalar(ie),D.distance=ee,D.coneCos=Math.cos(G.angle),D.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),D.decay=G.decay,s.spot[R]=D;const z=G.shadow;if(G.map&&(s.spotLightMap[k]=G.map,k++,z.updateMatrices(G),G.castShadow&&L++),s.spotLightMatrix[R]=z.matrix,G.castShadow){const K=i.get(G);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,s.spotShadow[R]=K,s.spotShadowMap[R]=V,U++}R++}else if(G.isRectAreaLight){const D=e.get(G);D.color.copy(q).multiplyScalar(ie),D.halfWidth.set(G.width*.5,0,0),D.halfHeight.set(0,G.height*.5,0),s.rectArea[S]=D,S++}else if(G.isPointLight){const D=e.get(G);if(D.color.copy(G.color).multiplyScalar(G.intensity),D.distance=G.distance,D.decay=G.decay,G.castShadow){const z=G.shadow,K=i.get(G);K.shadowIntensity=z.intensity,K.shadowBias=z.bias,K.shadowNormalBias=z.normalBias,K.shadowRadius=z.radius,K.shadowMapSize=z.mapSize,K.shadowCameraNear=z.camera.near,K.shadowCameraFar=z.camera.far,s.pointShadow[M]=K,s.pointShadowMap[M]=V,s.pointShadowMatrix[M]=G.shadow.matrix,I++}s.point[M]=D,M++}else if(G.isHemisphereLight){const D=e.get(G);D.skyColor.copy(G.color).multiplyScalar(ie),D.groundColor.copy(G.groundColor).multiplyScalar(ie),s.hemi[E]=D,E++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=je.LTC_FLOAT_1,s.rectAreaLTC2=je.LTC_FLOAT_2):(s.rectAreaLTC1=je.LTC_HALF_1,s.rectAreaLTC2=je.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=x,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==b||A.pointLength!==M||A.spotLength!==R||A.rectAreaLength!==S||A.hemiLength!==E||A.numDirectionalShadows!==N||A.numPointShadows!==I||A.numSpotShadows!==U||A.numSpotMaps!==k||A.numLightProbes!==B)&&(s.directional.length=b,s.spot.length=R,s.rectArea.length=S,s.point.length=M,s.hemi.length=E,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=U+k-L,s.spotLightMap.length=k,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=B,A.directionalLength=b,A.pointLength=M,A.spotLength=R,A.rectAreaLength=S,A.hemiLength=E,A.numDirectionalShadows=N,A.numPointShadows=I,A.numSpotShadows=U,A.numSpotMaps=k,A.numLightProbes=B,s.version=hC++)}function m(p,_){let x=0,g=0,b=0,M=0,R=0;const S=_.matrixWorldInverse;for(let E=0,N=p.length;E<N;E++){const I=p[E];if(I.isDirectionalLight){const U=s.directional[x];U.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),x++}else if(I.isSpotLight){const U=s.spot[b];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),b++}else if(I.isRectAreaLight){const U=s.rectArea[M];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(S),f.identity(),c.copy(I.matrixWorld),c.premultiply(S),f.extractRotation(c),U.halfWidth.set(I.width*.5,0,0),U.halfHeight.set(0,I.height*.5,0),U.halfWidth.applyMatrix4(f),U.halfHeight.applyMatrix4(f),M++}else if(I.isPointLight){const U=s.point[g];U.position.setFromMatrixPosition(I.matrixWorld),U.position.applyMatrix4(S),g++}else if(I.isHemisphereLight){const U=s.hemi[R];U.direction.setFromMatrixPosition(I.matrixWorld),U.direction.transformDirection(S),R++}}}return{setup:h,setupView:m,state:s}}function Sv(r){const e=new mC(r),i=[],s=[],l=[];function c(g){x.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function _(g){e.setupView(i,g)}const x={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:x,setupLights:p,setupLightsView:_,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function gC(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new Sv(r),e.set(l,[h])):c>=f.length?(h=new Sv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const xC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_C=`uniform sampler2D shadow_pass;
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
}`,vC=[new se(1,0,0),new se(-1,0,0),new se(0,1,0),new se(0,-1,0),new se(0,0,1),new se(0,0,-1)],bC=[new se(0,-1,0),new se(0,-1,0),new se(0,0,1),new se(0,0,-1),new se(0,-1,0),new se(0,-1,0)],Mv=new Xn,Hl=new se,$h=new se;function yC(r,e,i){let s=new db;const l=new wt,c=new wt,f=new Ln,h=new NT,m=new OT,p={},_=i.maxTextureSize,x={[Qs]:Ci,[Ci]:Qs,[cs]:cs},g=new Fa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:xC,fragmentShader:_C}),b=g.clone();b.defines.HORIZONTAL_PASS=1;const M=new Ba;M.setAttribute("position",new Ia(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Pa(M,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let E=this.type;this.render=function(L,B,A){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||L.length===0)return;this.type===vM&&(dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hu);const F=r.getRenderTarget(),j=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),q=r.state;q.setBlending(fs),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ie=E!==this.type;ie&&B.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(V=>V.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,V=L.length;ee<V;ee++){const D=L[ee],z=D.shadow;if(z===void 0){dt("WebGLShadowMap:",D,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;l.copy(z.mapSize);const K=z.getFrameExtents();l.multiply(K),c.copy(z.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/K.x),l.x=c.x*K.x,z.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/K.y),l.y=c.y*K.y,z.mapSize.y=c.y));const ue=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ue,z.map===null||ie===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===kl){if(D.isPointLight){dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new La(l.x,l.y,{format:Lr,type:hs,minFilter:di,magFilter:di,generateMipmaps:!1}),z.map.texture.name=D.name+".shadowMap",z.map.depthTexture=new jo(l.x,l.y,Na),z.map.depthTexture.name=D.name+".shadowMapDepth",z.map.depthTexture.format=ps,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=si,z.map.depthTexture.magFilter=si}else D.isPointLight?(z.map=new bb(l.x),z.map.depthTexture=new MT(l.x,Ua)):(z.map=new La(l.x,l.y),z.map.depthTexture=new jo(l.x,l.y,Ua)),z.map.depthTexture.name=D.name+".shadowMap",z.map.depthTexture.format=ps,this.type===Hu?(z.map.depthTexture.compareFunction=ue?sm:am,z.map.depthTexture.minFilter=di,z.map.depthTexture.magFilter=di):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=si,z.map.depthTexture.magFilter=si);z.camera.updateProjectionMatrix()}const ge=z.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<ge;P++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,P),r.clear();else{P===0&&(r.setRenderTarget(z.map),r.clear());const Z=z.getViewport(P);f.set(c.x*Z.x,c.y*Z.y,c.x*Z.z,c.y*Z.w),q.viewport(f)}if(D.isPointLight){const Z=z.camera,_e=z.matrix,Ae=D.distance||Z.far;Ae!==Z.far&&(Z.far=Ae,Z.updateProjectionMatrix()),Hl.setFromMatrixPosition(D.matrixWorld),Z.position.copy(Hl),$h.copy(Z.position),$h.add(vC[P]),Z.up.copy(bC[P]),Z.lookAt($h),Z.updateMatrixWorld(),_e.makeTranslation(-Hl.x,-Hl.y,-Hl.z),Mv.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Mv,Z.coordinateSystem,Z.reversedDepth)}else z.updateMatrices(D);s=z.getFrustum(),U(B,A,z.camera,D,this.type)}z.isPointLightShadow!==!0&&this.type===kl&&N(z,A),z.needsUpdate=!1}E=this.type,S.needsUpdate=!1,r.setRenderTarget(F,j,G)};function N(L,B){const A=e.update(R);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,b.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,b.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new La(l.x,l.y,{format:Lr,type:hs})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(B,null,A,g,R,null),b.uniforms.shadow_pass.value=L.mapPass.texture,b.uniforms.resolution.value=L.mapSize,b.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(B,null,A,b,R,null)}function I(L,B,A,F){let j=null;const G=A.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(G!==void 0)j=G;else if(j=A.isPointLight===!0?m:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const q=j.uuid,ie=B.uuid;let ee=p[q];ee===void 0&&(ee={},p[q]=ee);let V=ee[ie];V===void 0&&(V=j.clone(),ee[ie]=V,B.addEventListener("dispose",k)),j=V}if(j.visible=B.visible,j.wireframe=B.wireframe,F===kl?j.side=B.shadowSide!==null?B.shadowSide:B.side:j.side=B.shadowSide!==null?B.shadowSide:x[B.side],j.alphaMap=B.alphaMap,j.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,j.map=B.map,j.clipShadows=B.clipShadows,j.clippingPlanes=B.clippingPlanes,j.clipIntersection=B.clipIntersection,j.displacementMap=B.displacementMap,j.displacementScale=B.displacementScale,j.displacementBias=B.displacementBias,j.wireframeLinewidth=B.wireframeLinewidth,j.linewidth=B.linewidth,A.isPointLight===!0&&j.isMeshDistanceMaterial===!0){const q=r.properties.get(j);q.light=A}return j}function U(L,B,A,F,j){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&j===kl)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,L.matrixWorld);const ie=e.update(L),ee=L.material;if(Array.isArray(ee)){const V=ie.groups;for(let D=0,z=V.length;D<z;D++){const K=V[D],ue=ee[K.materialIndex];if(ue&&ue.visible){const ge=I(L,ue,F,j);L.onBeforeShadow(r,L,B,A,ie,ge,K),r.renderBufferDirect(A,null,ie,ge,L,K),L.onAfterShadow(r,L,B,A,ie,ge,K)}}}else if(ee.visible){const V=I(L,ee,F,j);L.onBeforeShadow(r,L,B,A,ie,V,null),r.renderBufferDirect(A,null,ie,V,L,null),L.onAfterShadow(r,L,B,A,ie,V,null)}}const q=L.children;for(let ie=0,ee=q.length;ie<ee;ie++)U(q[ie],B,A,F,j)}function k(L){L.target.removeEventListener("dispose",k);for(const A in p){const F=p[A],j=L.target.uuid;j in F&&(F[j].dispose(),delete F[j])}}}function EC(r,e){function i(){let X=!1;const Ce=new Ln;let pe=null;const ze=new Ln(0,0,0,0);return{setMask:function(Ue){pe!==Ue&&!X&&(r.colorMask(Ue,Ue,Ue,Ue),pe=Ue)},setLocked:function(Ue){X=Ue},setClear:function(Ue,Se,We,at,hn){hn===!0&&(Ue*=at,Se*=at,We*=at),Ce.set(Ue,Se,We,at),ze.equals(Ce)===!1&&(r.clearColor(Ue,Se,We,at),ze.copy(Ce))},reset:function(){X=!1,pe=null,ze.set(-1,0,0,0)}}}function s(){let X=!1,Ce=!1,pe=null,ze=null,Ue=null;return{setReversed:function(Se){if(Ce!==Se){const We=e.get("EXT_clip_control");Se?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),Ce=Se;const at=Ue;Ue=null,this.setClear(at)}},getReversed:function(){return Ce},setTest:function(Se){Se?Ee(r.DEPTH_TEST):He(r.DEPTH_TEST)},setMask:function(Se){pe!==Se&&!X&&(r.depthMask(Se),pe=Se)},setFunc:function(Se){if(Ce&&(Se=QM[Se]),ze!==Se){switch(Se){case ap:r.depthFunc(r.NEVER);break;case sp:r.depthFunc(r.ALWAYS);break;case rp:r.depthFunc(r.LESS);break;case ko:r.depthFunc(r.LEQUAL);break;case op:r.depthFunc(r.EQUAL);break;case lp:r.depthFunc(r.GEQUAL);break;case cp:r.depthFunc(r.GREATER);break;case up:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ze=Se}},setLocked:function(Se){X=Se},setClear:function(Se){Ue!==Se&&(Ue=Se,Ce&&(Se=1-Se),r.clearDepth(Se))},reset:function(){X=!1,pe=null,ze=null,Ue=null,Ce=!1}}}function l(){let X=!1,Ce=null,pe=null,ze=null,Ue=null,Se=null,We=null,at=null,hn=null;return{setTest:function(Ct){X||(Ct?Ee(r.STENCIL_TEST):He(r.STENCIL_TEST))},setMask:function(Ct){Ce!==Ct&&!X&&(r.stencilMask(Ct),Ce=Ct)},setFunc:function(Ct,qn,Un){(pe!==Ct||ze!==qn||Ue!==Un)&&(r.stencilFunc(Ct,qn,Un),pe=Ct,ze=qn,Ue=Un)},setOp:function(Ct,qn,Un){(Se!==Ct||We!==qn||at!==Un)&&(r.stencilOp(Ct,qn,Un),Se=Ct,We=qn,at=Un)},setLocked:function(Ct){X=Ct},setClear:function(Ct){hn!==Ct&&(r.clearStencil(Ct),hn=Ct)},reset:function(){X=!1,Ce=null,pe=null,ze=null,Ue=null,Se=null,We=null,at=null,hn=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let _={},x={},g={},b=new WeakMap,M=[],R=null,S=!1,E=null,N=null,I=null,U=null,k=null,L=null,B=null,A=new dn(0,0,0),F=0,j=!1,G=null,q=null,ie=null,ee=null,V=null;const D=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const ue=r.getParameter(r.VERSION);ue.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ue)[1]),z=K>=1):ue.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),z=K>=2);let ge=null,P={};const Z=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),Ae=new Ln().fromArray(Z),Oe=new Ln().fromArray(_e);function te(X,Ce,pe,ze){const Ue=new Uint8Array(4),Se=r.createTexture();r.bindTexture(X,Se),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<pe;We++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(Ce,0,r.RGBA,1,1,ze,0,r.RGBA,r.UNSIGNED_BYTE,Ue):r.texImage2D(Ce+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ue);return Se}const be={};be[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),be[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),be[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Ee(r.DEPTH_TEST),f.setFunc(ko),Rt(!1),zt(T_),Ee(r.CULL_FACE),Nt(fs);function Ee(X){_[X]!==!0&&(r.enable(X),_[X]=!0)}function He(X){_[X]!==!1&&(r.disable(X),_[X]=!1)}function qe(X,Ce){return g[X]!==Ce?(r.bindFramebuffer(X,Ce),g[X]=Ce,X===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Ce),X===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Qe(X,Ce){let pe=M,ze=!1;if(X){pe=b.get(Ce),pe===void 0&&(pe=[],b.set(Ce,pe));const Ue=X.textures;if(pe.length!==Ue.length||pe[0]!==r.COLOR_ATTACHMENT0){for(let Se=0,We=Ue.length;Se<We;Se++)pe[Se]=r.COLOR_ATTACHMENT0+Se;pe.length=Ue.length,ze=!0}}else pe[0]!==r.BACK&&(pe[0]=r.BACK,ze=!0);ze&&r.drawBuffers(pe)}function vt(X){return R!==X?(r.useProgram(X),R=X,!0):!1}const Xe={[Ar]:r.FUNC_ADD,[yM]:r.FUNC_SUBTRACT,[EM]:r.FUNC_REVERSE_SUBTRACT};Xe[SM]=r.MIN,Xe[MM]=r.MAX;const pt={[TM]:r.ZERO,[AM]:r.ONE,[wM]:r.SRC_COLOR,[np]:r.SRC_ALPHA,[LM]:r.SRC_ALPHA_SATURATE,[OM]:r.DST_COLOR,[CM]:r.DST_ALPHA,[RM]:r.ONE_MINUS_SRC_COLOR,[ip]:r.ONE_MINUS_SRC_ALPHA,[DM]:r.ONE_MINUS_DST_COLOR,[NM]:r.ONE_MINUS_DST_ALPHA,[IM]:r.CONSTANT_COLOR,[UM]:r.ONE_MINUS_CONSTANT_COLOR,[PM]:r.CONSTANT_ALPHA,[FM]:r.ONE_MINUS_CONSTANT_ALPHA};function Nt(X,Ce,pe,ze,Ue,Se,We,at,hn,Ct){if(X===fs){S===!0&&(He(r.BLEND),S=!1);return}if(S===!1&&(Ee(r.BLEND),S=!0),X!==bM){if(X!==E||Ct!==j){if((N!==Ar||k!==Ar)&&(r.blendEquation(r.FUNC_ADD),N=Ar,k=Ar),Ct)switch(X){case zo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case A_:r.blendFunc(r.ONE,r.ONE);break;case w_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case R_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Wt("WebGLState: Invalid blending: ",X);break}else switch(X){case zo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case A_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case w_:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case R_:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",X);break}I=null,U=null,L=null,B=null,A.set(0,0,0),F=0,E=X,j=Ct}return}Ue=Ue||Ce,Se=Se||pe,We=We||ze,(Ce!==N||Ue!==k)&&(r.blendEquationSeparate(Xe[Ce],Xe[Ue]),N=Ce,k=Ue),(pe!==I||ze!==U||Se!==L||We!==B)&&(r.blendFuncSeparate(pt[pe],pt[ze],pt[Se],pt[We]),I=pe,U=ze,L=Se,B=We),(at.equals(A)===!1||hn!==F)&&(r.blendColor(at.r,at.g,at.b,hn),A.copy(at),F=hn),E=X,j=!1}function ct(X,Ce){X.side===cs?He(r.CULL_FACE):Ee(r.CULL_FACE);let pe=X.side===Ci;Ce&&(pe=!pe),Rt(pe),X.blending===zo&&X.transparent===!1?Nt(fs):Nt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),c.setMask(X.colorWrite);const ze=X.stencilWrite;h.setTest(ze),ze&&(h.setMask(X.stencilWriteMask),h.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),h.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Y(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Ee(r.SAMPLE_ALPHA_TO_COVERAGE):He(r.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(X){G!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),G=X)}function zt(X){X!==xM?(Ee(r.CULL_FACE),X!==q&&(X===T_?r.cullFace(r.BACK):X===_M?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):He(r.CULL_FACE),q=X}function $e(X){X!==ie&&(z&&r.lineWidth(X),ie=X)}function Y(X,Ce,pe){X?(Ee(r.POLYGON_OFFSET_FILL),(ee!==Ce||V!==pe)&&(ee=Ce,V=pe,f.getReversed()&&(Ce=-Ce),r.polygonOffset(Ce,pe))):He(r.POLYGON_OFFSET_FILL)}function Et(X){X?Ee(r.SCISSOR_TEST):He(r.SCISSOR_TEST)}function ut(X){X===void 0&&(X=r.TEXTURE0+D-1),ge!==X&&(r.activeTexture(X),ge=X)}function Gt(X,Ce,pe){pe===void 0&&(ge===null?pe=r.TEXTURE0+D-1:pe=ge);let ze=P[pe];ze===void 0&&(ze={type:void 0,texture:void 0},P[pe]=ze),(ze.type!==X||ze.texture!==Ce)&&(ge!==pe&&(r.activeTexture(pe),ge=pe),r.bindTexture(X,Ce||be[X]),ze.type=X,ze.texture=Ce)}function Re(){const X=P[ge];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Vt(){try{r.compressedTexImage2D(...arguments)}catch(X){Wt("WebGLState:",X)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(X){Wt("WebGLState:",X)}}function T(){try{r.texSubImage2D(...arguments)}catch(X){Wt("WebGLState:",X)}}function J(){try{r.texSubImage3D(...arguments)}catch(X){Wt("WebGLState:",X)}}function he(){try{r.compressedTexSubImage2D(...arguments)}catch(X){Wt("WebGLState:",X)}}function Me(){try{r.compressedTexSubImage3D(...arguments)}catch(X){Wt("WebGLState:",X)}}function Ne(){try{r.texStorage2D(...arguments)}catch(X){Wt("WebGLState:",X)}}function Pe(){try{r.texStorage3D(...arguments)}catch(X){Wt("WebGLState:",X)}}function fe(){try{r.texImage2D(...arguments)}catch(X){Wt("WebGLState:",X)}}function me(){try{r.texImage3D(...arguments)}catch(X){Wt("WebGLState:",X)}}function De(X){return x[X]!==void 0?x[X]:r.getParameter(X)}function Be(X,Ce){x[X]!==Ce&&(r.pixelStorei(X,Ce),x[X]=Ce)}function Le(X){Ae.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),Ae.copy(X))}function Ie(X){Oe.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),Oe.copy(X))}function it(X,Ce){let pe=p.get(Ce);pe===void 0&&(pe=new WeakMap,p.set(Ce,pe));let ze=pe.get(X);ze===void 0&&(ze=r.getUniformBlockIndex(Ce,X.name),pe.set(X,ze))}function rt(X,Ce){const ze=p.get(Ce).get(X);m.get(Ce)!==ze&&(r.uniformBlockBinding(Ce,ze,X.__bindingPointIndex),m.set(Ce,ze))}function mt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},x={},ge=null,P={},g={},b=new WeakMap,M=[],R=null,S=!1,E=null,N=null,I=null,U=null,k=null,L=null,B=null,A=new dn(0,0,0),F=0,j=!1,G=null,q=null,ie=null,ee=null,V=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Oe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Ee,disable:He,bindFramebuffer:qe,drawBuffers:Qe,useProgram:vt,setBlending:Nt,setMaterial:ct,setFlipSided:Rt,setCullFace:zt,setLineWidth:$e,setPolygonOffset:Y,setScissorTest:Et,activeTexture:ut,bindTexture:Gt,unbindTexture:Re,compressedTexImage2D:Vt,compressedTexImage3D:O,texImage2D:fe,texImage3D:me,pixelStorei:Be,getParameter:De,updateUBOMapping:it,uniformBlockBinding:rt,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:T,texSubImage3D:J,compressedTexSubImage2D:he,compressedTexSubImage3D:Me,scissor:Le,viewport:Ie,reset:mt}}function SC(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new wt,_=new WeakMap,x=new Set;let g;const b=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(O,T){return M?new OffscreenCanvas(O,T):ec("canvas")}function S(O,T,J){let he=1;const Me=Vt(O);if((Me.width>J||Me.height>J)&&(he=J/Math.max(Me.width,Me.height)),he<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const Ne=Math.floor(he*Me.width),Pe=Math.floor(he*Me.height);g===void 0&&(g=R(Ne,Pe));const fe=T?R(Ne,Pe):g;return fe.width=Ne,fe.height=Pe,fe.getContext("2d").drawImage(O,0,0,Ne,Pe),dt("WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+Ne+"x"+Pe+")."),fe}else return"data"in O&&dt("WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),O;return O}function E(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function I(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(O,T,J,he,Me,Ne=!1){if(O!==null){if(r[O]!==void 0)return r[O];dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Pe;he&&(Pe=e.get("EXT_texture_norm16"),Pe||dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let fe=T;if(T===r.RED&&(J===r.FLOAT&&(fe=r.R32F),J===r.HALF_FLOAT&&(fe=r.R16F),J===r.UNSIGNED_BYTE&&(fe=r.R8),J===r.UNSIGNED_SHORT&&Pe&&(fe=Pe.R16_EXT),J===r.SHORT&&Pe&&(fe=Pe.R16_SNORM_EXT)),T===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.R8UI),J===r.UNSIGNED_SHORT&&(fe=r.R16UI),J===r.UNSIGNED_INT&&(fe=r.R32UI),J===r.BYTE&&(fe=r.R8I),J===r.SHORT&&(fe=r.R16I),J===r.INT&&(fe=r.R32I)),T===r.RG&&(J===r.FLOAT&&(fe=r.RG32F),J===r.HALF_FLOAT&&(fe=r.RG16F),J===r.UNSIGNED_BYTE&&(fe=r.RG8),J===r.UNSIGNED_SHORT&&Pe&&(fe=Pe.RG16_EXT),J===r.SHORT&&Pe&&(fe=Pe.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RG8UI),J===r.UNSIGNED_SHORT&&(fe=r.RG16UI),J===r.UNSIGNED_INT&&(fe=r.RG32UI),J===r.BYTE&&(fe=r.RG8I),J===r.SHORT&&(fe=r.RG16I),J===r.INT&&(fe=r.RG32I)),T===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RGB8UI),J===r.UNSIGNED_SHORT&&(fe=r.RGB16UI),J===r.UNSIGNED_INT&&(fe=r.RGB32UI),J===r.BYTE&&(fe=r.RGB8I),J===r.SHORT&&(fe=r.RGB16I),J===r.INT&&(fe=r.RGB32I)),T===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(fe=r.RGBA16UI),J===r.UNSIGNED_INT&&(fe=r.RGBA32UI),J===r.BYTE&&(fe=r.RGBA8I),J===r.SHORT&&(fe=r.RGBA16I),J===r.INT&&(fe=r.RGBA32I)),T===r.RGB&&(J===r.UNSIGNED_SHORT&&Pe&&(fe=Pe.RGB16_EXT),J===r.SHORT&&Pe&&(fe=Pe.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(fe=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(fe=r.R11F_G11F_B10F)),T===r.RGBA){const me=Ne?tf:kt.getTransfer(Me);J===r.FLOAT&&(fe=r.RGBA32F),J===r.HALF_FLOAT&&(fe=r.RGBA16F),J===r.UNSIGNED_BYTE&&(fe=me===on?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Pe&&(fe=Pe.RGBA16_EXT),J===r.SHORT&&Pe&&(fe=Pe.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(fe=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(fe=r.RGB5_A1)}return(fe===r.R16F||fe===r.R32F||fe===r.RG16F||fe===r.RG32F||fe===r.RGBA16F||fe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function k(O,T){let J;return O?T===null||T===Ua||T===Jl?J=r.DEPTH24_STENCIL8:T===Na?J=r.DEPTH32F_STENCIL8:T===Ql&&(J=r.DEPTH24_STENCIL8,dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ua||T===Jl?J=r.DEPTH_COMPONENT24:T===Na?J=r.DEPTH_COMPONENT32F:T===Ql&&(J=r.DEPTH_COMPONENT16),J}function L(O,T){return E(O)===!0||O.isFramebufferTexture&&O.minFilter!==si&&O.minFilter!==di?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function B(O){const T=O.target;T.removeEventListener("dispose",B),F(T),T.isVideoTexture&&_.delete(T),T.isHTMLTexture&&x.delete(T)}function A(O){const T=O.target;T.removeEventListener("dispose",A),G(T)}function F(O){const T=s.get(O);if(T.__webglInit===void 0)return;const J=O.source,he=b.get(J);if(he){const Me=he[T.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&j(O),Object.keys(he).length===0&&b.delete(J)}s.remove(O)}function j(O){const T=s.get(O);r.deleteTexture(T.__webglTexture);const J=O.source,he=b.get(J);delete he[T.__cacheKey],f.memory.textures--}function G(O){const T=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(T.__webglFramebuffer[he]))for(let Me=0;Me<T.__webglFramebuffer[he].length;Me++)r.deleteFramebuffer(T.__webglFramebuffer[he][Me]);else r.deleteFramebuffer(T.__webglFramebuffer[he]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[he])}else{if(Array.isArray(T.__webglFramebuffer))for(let he=0;he<T.__webglFramebuffer.length;he++)r.deleteFramebuffer(T.__webglFramebuffer[he]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let he=0;he<T.__webglColorRenderbuffer.length;he++)T.__webglColorRenderbuffer[he]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[he]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=O.textures;for(let he=0,Me=J.length;he<Me;he++){const Ne=s.get(J[he]);Ne.__webglTexture&&(r.deleteTexture(Ne.__webglTexture),f.memory.textures--),s.remove(J[he])}s.remove(O)}let q=0;function ie(){q=0}function ee(){return q}function V(O){q=O}function D(){const O=q;return O>=l.maxTextures&&dt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),q+=1,O}function z(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function K(O,T){const J=s.get(O);if(O.isVideoTexture&&Gt(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const he=O.image;if(he===null)dt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)dt("WebGLRenderer: Texture marked for update but image is incomplete");else{He(J,O,T);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+T)}function ue(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){He(J,O,T);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+T)}function ge(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){He(J,O,T);return}i.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+T)}function P(O,T){const J=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&J.__version!==O.version){qe(J,O,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+T)}const Z={[fp]:r.REPEAT,[us]:r.CLAMP_TO_EDGE,[dp]:r.MIRRORED_REPEAT},_e={[si]:r.NEAREST,[GM]:r.NEAREST_MIPMAP_NEAREST,[mu]:r.NEAREST_MIPMAP_LINEAR,[di]:r.LINEAR,[vh]:r.LINEAR_MIPMAP_NEAREST,[Rr]:r.LINEAR_MIPMAP_LINEAR},Ae={[VM]:r.NEVER,[qM]:r.ALWAYS,[jM]:r.LESS,[am]:r.LEQUAL,[XM]:r.EQUAL,[sm]:r.GEQUAL,[YM]:r.GREATER,[WM]:r.NOTEQUAL};function Oe(O,T){if(T.type===Na&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===di||T.magFilter===vh||T.magFilter===mu||T.magFilter===Rr||T.minFilter===di||T.minFilter===vh||T.minFilter===mu||T.minFilter===Rr)&&dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,Z[T.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,Z[T.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,Z[T.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,_e[T.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,_e[T.minFilter]),T.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,Ae[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===si||T.minFilter!==mu&&T.minFilter!==Rr||T.type===Na&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function te(O,T){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",B));const he=T.source;let Me=b.get(he);Me===void 0&&(Me={},b.set(he,Me));const Ne=z(T);if(Ne!==O.__cacheKey){Me[Ne]===void 0&&(Me[Ne]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),Me[Ne].usedTimes++;const Pe=Me[O.__cacheKey];Pe!==void 0&&(Me[O.__cacheKey].usedTimes--,Pe.usedTimes===0&&j(T)),O.__cacheKey=Ne,O.__webglTexture=Me[Ne].texture}return J}function be(O,T,J){return Math.floor(Math.floor(O/J)/T)}function Ee(O,T,J,he){const Ne=O.updateRanges;if(Ne.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,J,he,T.data);else{Ne.sort((Be,Le)=>Be.start-Le.start);let Pe=0;for(let Be=1;Be<Ne.length;Be++){const Le=Ne[Pe],Ie=Ne[Be],it=Le.start+Le.count,rt=be(Ie.start,T.width,4),mt=be(Le.start,T.width,4);Ie.start<=it+1&&rt===mt&&be(Ie.start+Ie.count-1,T.width,4)===rt?Le.count=Math.max(Le.count,Ie.start+Ie.count-Le.start):(++Pe,Ne[Pe]=Ie)}Ne.length=Pe+1;const fe=i.getParameter(r.UNPACK_ROW_LENGTH),me=i.getParameter(r.UNPACK_SKIP_PIXELS),De=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Be=0,Le=Ne.length;Be<Le;Be++){const Ie=Ne[Be],it=Math.floor(Ie.start/4),rt=Math.ceil(Ie.count/4),mt=it%T.width,X=Math.floor(it/T.width),Ce=rt,pe=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,X),i.texSubImage2D(r.TEXTURE_2D,0,mt,X,Ce,pe,J,he,T.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,fe),i.pixelStorei(r.UNPACK_SKIP_PIXELS,me),i.pixelStorei(r.UNPACK_SKIP_ROWS,De)}}function He(O,T,J){let he=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(he=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(he=r.TEXTURE_3D);const Me=te(O,T),Ne=T.source;i.bindTexture(he,O.__webglTexture,r.TEXTURE0+J);const Pe=s.get(Ne);if(Ne.version!==Pe.__version||Me===!0){if(i.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const pe=kt.getPrimaries(kt.workingColorSpace),ze=T.colorSpace===$s?null:kt.getPrimaries(T.colorSpace),Ue=T.colorSpace===$s||pe===ze?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let me=S(T.image,!1,l.maxTextureSize);me=Re(T,me);const De=c.convert(T.format,T.colorSpace),Be=c.convert(T.type);let Le=U(T.internalFormat,De,Be,T.normalized,T.colorSpace,T.isVideoTexture);Oe(he,T);let Ie;const it=T.mipmaps,rt=T.isVideoTexture!==!0,mt=Pe.__version===void 0||Me===!0,X=Ne.dataReady,Ce=L(T,me);if(T.isDepthTexture)Le=k(T.format===Cr,T.type),mt&&(rt?i.texStorage2D(r.TEXTURE_2D,1,Le,me.width,me.height):i.texImage2D(r.TEXTURE_2D,0,Le,me.width,me.height,0,De,Be,null));else if(T.isDataTexture)if(it.length>0){rt&&mt&&i.texStorage2D(r.TEXTURE_2D,Ce,Le,it[0].width,it[0].height);for(let pe=0,ze=it.length;pe<ze;pe++)Ie=it[pe],rt?X&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Ie.width,Ie.height,De,Be,Ie.data):i.texImage2D(r.TEXTURE_2D,pe,Le,Ie.width,Ie.height,0,De,Be,Ie.data);T.generateMipmaps=!1}else rt?(mt&&i.texStorage2D(r.TEXTURE_2D,Ce,Le,me.width,me.height),X&&Ee(T,me,De,Be)):i.texImage2D(r.TEXTURE_2D,0,Le,me.width,me.height,0,De,Be,me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){rt&&mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Le,it[0].width,it[0].height,me.depth);for(let pe=0,ze=it.length;pe<ze;pe++)if(Ie=it[pe],T.format!==va)if(De!==null)if(rt){if(X)if(T.layerUpdates.size>0){const Ue=tv(Ie.width,Ie.height,T.format,T.type);for(const Se of T.layerUpdates){const We=Ie.data.subarray(Se*Ue/Ie.data.BYTES_PER_ELEMENT,(Se+1)*Ue/Ie.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,Se,Ie.width,Ie.height,1,De,We)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Ie.width,Ie.height,me.depth,De,Ie.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,Le,Ie.width,Ie.height,me.depth,0,Ie.data,0,0);else dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?X&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,Ie.width,Ie.height,me.depth,De,Be,Ie.data):i.texImage3D(r.TEXTURE_2D_ARRAY,pe,Le,Ie.width,Ie.height,me.depth,0,De,Be,Ie.data)}else{rt&&mt&&i.texStorage2D(r.TEXTURE_2D,Ce,Le,it[0].width,it[0].height);for(let pe=0,ze=it.length;pe<ze;pe++)Ie=it[pe],T.format!==va?De!==null?rt?X&&i.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,Ie.width,Ie.height,De,Ie.data):i.compressedTexImage2D(r.TEXTURE_2D,pe,Le,Ie.width,Ie.height,0,Ie.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?X&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,Ie.width,Ie.height,De,Be,Ie.data):i.texImage2D(r.TEXTURE_2D,pe,Le,Ie.width,Ie.height,0,De,Be,Ie.data)}else if(T.isDataArrayTexture)if(rt){if(mt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Le,me.width,me.height,me.depth),X)if(T.layerUpdates.size>0){const pe=tv(me.width,me.height,T.format,T.type);for(const ze of T.layerUpdates){const Ue=me.data.subarray(ze*pe/me.data.BYTES_PER_ELEMENT,(ze+1)*pe/me.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ze,me.width,me.height,1,De,Be,Ue)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,De,Be,me.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Le,me.width,me.height,me.depth,0,De,Be,me.data);else if(T.isData3DTexture)rt?(mt&&i.texStorage3D(r.TEXTURE_3D,Ce,Le,me.width,me.height,me.depth),X&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,De,Be,me.data)):i.texImage3D(r.TEXTURE_3D,0,Le,me.width,me.height,me.depth,0,De,Be,me.data);else if(T.isFramebufferTexture){if(mt)if(rt)i.texStorage2D(r.TEXTURE_2D,Ce,Le,me.width,me.height);else{let pe=me.width,ze=me.height;for(let Ue=0;Ue<Ce;Ue++)i.texImage2D(r.TEXTURE_2D,Ue,Le,pe,ze,0,De,Be,null),pe>>=1,ze>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const pe=r.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),me.parentNode!==pe){pe.appendChild(me),x.add(T),pe.onpaint=at=>{const hn=at.changedElements;for(const Ct of x)hn.includes(Ct.image)&&(Ct.needsUpdate=!0)},pe.requestPaint();return}const ze=0,Ue=r.RGBA,Se=r.RGBA,We=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,ze,Ue,Se,We,me),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(it.length>0){if(rt&&mt){const pe=Vt(it[0]);i.texStorage2D(r.TEXTURE_2D,Ce,Le,pe.width,pe.height)}for(let pe=0,ze=it.length;pe<ze;pe++)Ie=it[pe],rt?X&&i.texSubImage2D(r.TEXTURE_2D,pe,0,0,De,Be,Ie):i.texImage2D(r.TEXTURE_2D,pe,Le,De,Be,Ie);T.generateMipmaps=!1}else if(rt){if(mt){const pe=Vt(me);i.texStorage2D(r.TEXTURE_2D,Ce,Le,pe.width,pe.height)}X&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,De,Be,me)}else i.texImage2D(r.TEXTURE_2D,0,Le,De,Be,me);E(T)&&N(he),Pe.__version=Ne.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function qe(O,T,J){if(T.image.length!==6)return;const he=te(O,T),Me=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+J);const Ne=s.get(Me);if(Me.version!==Ne.__version||he===!0){i.activeTexture(r.TEXTURE0+J);const Pe=kt.getPrimaries(kt.workingColorSpace),fe=T.colorSpace===$s?null:kt.getPrimaries(T.colorSpace),me=T.colorSpace===$s||Pe===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const De=T.isCompressedTexture||T.image[0].isCompressedTexture,Be=T.image[0]&&T.image[0].isDataTexture,Le=[];for(let Se=0;Se<6;Se++)!De&&!Be?Le[Se]=S(T.image[Se],!0,l.maxCubemapSize):Le[Se]=Be?T.image[Se].image:T.image[Se],Le[Se]=Re(T,Le[Se]);const Ie=Le[0],it=c.convert(T.format,T.colorSpace),rt=c.convert(T.type),mt=U(T.internalFormat,it,rt,T.normalized,T.colorSpace),X=T.isVideoTexture!==!0,Ce=Ne.__version===void 0||he===!0,pe=Me.dataReady;let ze=L(T,Ie);Oe(r.TEXTURE_CUBE_MAP,T);let Ue;if(De){X&&Ce&&i.texStorage2D(r.TEXTURE_CUBE_MAP,ze,mt,Ie.width,Ie.height);for(let Se=0;Se<6;Se++){Ue=Le[Se].mipmaps;for(let We=0;We<Ue.length;We++){const at=Ue[We];T.format!==va?it!==null?X?pe&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,0,0,at.width,at.height,it,at.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,mt,at.width,at.height,0,at.data):dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,0,0,at.width,at.height,it,rt,at.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We,mt,at.width,at.height,0,it,rt,at.data)}}}else{if(Ue=T.mipmaps,X&&Ce){Ue.length>0&&ze++;const Se=Vt(Le[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,ze,mt,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Be){X?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Le[Se].width,Le[Se].height,it,rt,Le[Se].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,mt,Le[Se].width,Le[Se].height,0,it,rt,Le[Se].data);for(let We=0;We<Ue.length;We++){const hn=Ue[We].image[Se].image;X?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,0,0,hn.width,hn.height,it,rt,hn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,mt,hn.width,hn.height,0,it,rt,hn.data)}}else{X?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,it,rt,Le[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,mt,it,rt,Le[Se]);for(let We=0;We<Ue.length;We++){const at=Ue[We];X?pe&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,0,0,it,rt,at.image[Se]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Se,We+1,mt,it,rt,at.image[Se])}}}E(T)&&N(r.TEXTURE_CUBE_MAP),Ne.__version=Me.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Qe(O,T,J,he,Me,Ne){const Pe=c.convert(J.format,J.colorSpace),fe=c.convert(J.type),me=U(J.internalFormat,Pe,fe,J.normalized,J.colorSpace),De=s.get(T),Be=s.get(J);if(Be.__renderTarget=T,!De.__hasExternalTextures){const Le=Math.max(1,T.width>>Ne),Ie=Math.max(1,T.height>>Ne);Me===r.TEXTURE_3D||Me===r.TEXTURE_2D_ARRAY?i.texImage3D(Me,Ne,me,Le,Ie,T.depth,0,Pe,fe,null):i.texImage2D(Me,Ne,me,Le,Ie,0,Pe,fe,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),ut(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,Me,Be.__webglTexture,0,Et(T)):(Me===r.TEXTURE_2D||Me>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,he,Me,Be.__webglTexture,Ne),i.bindFramebuffer(r.FRAMEBUFFER,null)}function vt(O,T,J){if(r.bindRenderbuffer(r.RENDERBUFFER,O),T.depthBuffer){const he=T.depthTexture,Me=he&&he.isDepthTexture?he.type:null,Ne=k(T.stencilBuffer,Me),Pe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ut(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Et(T),Ne,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Et(T),Ne,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ne,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Pe,r.RENDERBUFFER,O)}else{const he=T.textures;for(let Me=0;Me<he.length;Me++){const Ne=he[Me],Pe=c.convert(Ne.format,Ne.colorSpace),fe=c.convert(Ne.type),me=U(Ne.internalFormat,Pe,fe,Ne.normalized,Ne.colorSpace);ut(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Et(T),me,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Et(T),me,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,me,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Xe(O,T,J){const he=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Me=s.get(T.depthTexture);if(Me.__renderTarget=T,(!Me.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),he){if(Me.__webglInit===void 0&&(Me.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),Me.__webglTexture===void 0){Me.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Me.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T.depthTexture);const De=c.convert(T.depthTexture.format),Be=c.convert(T.depthTexture.type);let Le;T.depthTexture.format===ps?Le=r.DEPTH_COMPONENT24:T.depthTexture.format===Cr&&(Le=r.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Le,T.width,T.height,0,De,Be,null)}}else K(T.depthTexture,0);const Ne=Me.__webglTexture,Pe=Et(T),fe=he?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,me=T.depthTexture.format===Cr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===ps)ut(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,fe,Ne,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,me,fe,Ne,0);else if(T.depthTexture.format===Cr)ut(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,fe,Ne,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,me,fe,Ne,0);else throw new Error("Unknown depthTexture format")}function pt(O){const T=s.get(O),J=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const he=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),he){const Me=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,he.removeEventListener("dispose",Me)};he.addEventListener("dispose",Me),T.__depthDisposeCallback=Me}T.__boundDepthTexture=he}if(O.depthTexture&&!T.__autoAllocateDepthBuffer)if(J)for(let he=0;he<6;he++)Xe(T.__webglFramebuffer[he],O,he);else{const he=O.texture.mipmaps;he&&he.length>0?Xe(T.__webglFramebuffer[0],O,0):Xe(T.__webglFramebuffer,O,0)}else if(J){T.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[he]),T.__webglDepthbuffer[he]===void 0)T.__webglDepthbuffer[he]=r.createRenderbuffer(),vt(T.__webglDepthbuffer[he],O,!1);else{const Me=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ne=T.__webglDepthbuffer[he];r.bindRenderbuffer(r.RENDERBUFFER,Ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,Ne)}}else{const he=O.texture.mipmaps;if(he&&he.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),vt(T.__webglDepthbuffer,O,!1);else{const Me=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ne=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,Ne)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Nt(O,T,J){const he=s.get(O);T!==void 0&&Qe(he.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&pt(O)}function ct(O){const T=O.texture,J=s.get(O),he=s.get(T);O.addEventListener("dispose",A);const Me=O.textures,Ne=O.isWebGLCubeRenderTarget===!0,Pe=Me.length>1;if(Pe||(he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture()),he.__version=T.version,f.memory.textures++),Ne){J.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[fe]=[];for(let me=0;me<T.mipmaps.length;me++)J.__webglFramebuffer[fe][me]=r.createFramebuffer()}else J.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let fe=0;fe<T.mipmaps.length;fe++)J.__webglFramebuffer[fe]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Pe)for(let fe=0,me=Me.length;fe<me;fe++){const De=s.get(Me[fe]);De.__webglTexture===void 0&&(De.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&ut(O)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let fe=0;fe<Me.length;fe++){const me=Me[fe];J.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[fe]);const De=c.convert(me.format,me.colorSpace),Be=c.convert(me.type),Le=U(me.internalFormat,De,Be,me.normalized,me.colorSpace,O.isXRRenderTarget===!0),Ie=Et(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,Le,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,J.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),vt(J.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ne){i.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T);for(let fe=0;fe<6;fe++)if(T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Qe(J.__webglFramebuffer[fe][me],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else Qe(J.__webglFramebuffer[fe],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);E(T)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Pe){for(let fe=0,me=Me.length;fe<me;fe++){const De=Me[fe],Be=s.get(De);let Le=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Le=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Le,Be.__webglTexture),Oe(Le,De),Qe(J.__webglFramebuffer,O,De,r.COLOR_ATTACHMENT0+fe,Le,0),E(De)&&N(Le)}i.unbindTexture()}else{let fe=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(fe=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(fe,he.__webglTexture),Oe(fe,T),T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)Qe(J.__webglFramebuffer[me],O,T,r.COLOR_ATTACHMENT0,fe,me);else Qe(J.__webglFramebuffer,O,T,r.COLOR_ATTACHMENT0,fe,0);E(T)&&N(fe),i.unbindTexture()}O.depthBuffer&&pt(O)}function Rt(O){const T=O.textures;for(let J=0,he=T.length;J<he;J++){const Me=T[J];if(E(Me)){const Ne=I(O),Pe=s.get(Me).__webglTexture;i.bindTexture(Ne,Pe),N(Ne),i.unbindTexture()}}}const zt=[],$e=[];function Y(O){if(O.samples>0){if(ut(O)===!1){const T=O.textures,J=O.width,he=O.height;let Me=r.COLOR_BUFFER_BIT;const Ne=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=s.get(O),fe=T.length>1;if(fe)for(let De=0;De<T.length;De++)i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const me=O.texture.mipmaps;me&&me.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let De=0;De<T.length;De++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Me|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Me|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[De]);const Be=s.get(T[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Be,0)}r.blitFramebuffer(0,0,J,he,0,0,J,he,Me,r.NEAREST),m===!0&&(zt.length=0,$e.length=0,zt.push(r.COLOR_ATTACHMENT0+De),O.depthBuffer&&O.resolveDepthBuffer===!1&&(zt.push(Ne),$e.push(Ne),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,$e)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,zt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let De=0;De<T.length;De++){i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[De]);const Be=s.get(T[De]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,Be,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const T=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Et(O){return Math.min(l.maxSamples,O.samples)}function ut(O){const T=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Gt(O){const T=f.render.frame;_.get(O)!==T&&(_.set(O,T),O.update())}function Re(O,T){const J=O.colorSpace,he=O.format,Me=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==ef&&J!==$s&&(kt.getTransfer(J)===on?(he!==va||Me!==aa)&&dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",J)),T}function Vt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=D,this.resetTextureUnits=ie,this.getTextureUnits=ee,this.setTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=ue,this.setTexture3D=ge,this.setTextureCube=P,this.rebindTextures=Nt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=ut,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function MC(r,e){function i(s,l=$s){let c;const f=kt.getTransfer(l);if(s===aa)return r.UNSIGNED_BYTE;if(s===Jp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===em)return r.UNSIGNED_SHORT_5_5_5_1;if(s===eb)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===tb)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Qv)return r.BYTE;if(s===Jv)return r.SHORT;if(s===Ql)return r.UNSIGNED_SHORT;if(s===Qp)return r.INT;if(s===Ua)return r.UNSIGNED_INT;if(s===Na)return r.FLOAT;if(s===hs)return r.HALF_FLOAT;if(s===nb)return r.ALPHA;if(s===ib)return r.RGB;if(s===va)return r.RGBA;if(s===ps)return r.DEPTH_COMPONENT;if(s===Cr)return r.DEPTH_STENCIL;if(s===ab)return r.RED;if(s===tm)return r.RED_INTEGER;if(s===Lr)return r.RG;if(s===nm)return r.RG_INTEGER;if(s===im)return r.RGBA_INTEGER;if(s===Vu||s===ju||s===Xu||s===Yu)if(f===on)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Vu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ju)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Yu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Vu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ju)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Yu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===hp||s===pp||s===mp||s===gp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===hp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===pp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===mp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===gp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===xp||s===_p||s===vp||s===bp||s===yp||s===Qu||s===Ep)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===xp||s===_p)return f===on?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===vp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===bp)return c.COMPRESSED_R11_EAC;if(s===yp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Qu)return c.COMPRESSED_RG11_EAC;if(s===Ep)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Sp||s===Mp||s===Tp||s===Ap||s===wp||s===Rp||s===Cp||s===Np||s===Op||s===Dp||s===Lp||s===Ip||s===Up||s===Pp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Sp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Mp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Tp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ap)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Rp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Cp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Np)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Op)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Dp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Lp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ip)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Up)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Pp)return f===on?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fp||s===Bp||s===zp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Fp)return f===on?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Bp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===zp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Gp||s===Hp||s===Ju||s===kp)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Gp)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Hp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ju)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===kp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Jl?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const TC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,AC=`
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

}`;class wC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new pb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Fa({vertexShader:TC,fragmentShader:AC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Pa(new of(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RC extends er{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,_=null,x=null,g=null,b=null,M=null;const R=typeof XRWebGLBinding<"u",S=new wC,E={},N=i.getContextAttributes();let I=null,U=null;const k=[],L=[],B=new wt;let A=null;const F=new ia;F.viewport=new Ln;const j=new ia;j.viewport=new Ln;const G=[F,j],q=new FT;let ie=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let be=k[te];return be===void 0&&(be=new Ah,k[te]=be),be.getTargetRaySpace()},this.getControllerGrip=function(te){let be=k[te];return be===void 0&&(be=new Ah,k[te]=be),be.getGripSpace()},this.getHand=function(te){let be=k[te];return be===void 0&&(be=new Ah,k[te]=be),be.getHandSpace()};function V(te){const be=L.indexOf(te.inputSource);if(be===-1)return;const Ee=k[be];Ee!==void 0&&(Ee.update(te.inputSource,te.frame,p||f),Ee.dispatchEvent({type:te.type,data:te.inputSource}))}function D(){l.removeEventListener("select",V),l.removeEventListener("selectstart",V),l.removeEventListener("selectend",V),l.removeEventListener("squeeze",V),l.removeEventListener("squeezestart",V),l.removeEventListener("squeezeend",V),l.removeEventListener("end",D),l.removeEventListener("inputsourceschange",z);for(let te=0;te<k.length;te++){const be=L[te];be!==null&&(L[te]=null,k[te].disconnect(be))}ie=null,ee=null,S.reset();for(const te in E)delete E[te];e.setRenderTarget(I),b=null,g=null,x=null,l=null,U=null,Oe.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){c=te,s.isPresenting===!0&&dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){h=te,s.isPresenting===!0&&dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(te){p=te},this.getBaseLayer=function(){return g!==null?g:b},this.getBinding=function(){return x===null&&R&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(te){if(l=te,l!==null){if(I=e.getRenderTarget(),l.addEventListener("select",V),l.addEventListener("selectstart",V),l.addEventListener("selectend",V),l.addEventListener("squeeze",V),l.addEventListener("squeezestart",V),l.addEventListener("squeezeend",V),l.addEventListener("end",D),l.addEventListener("inputsourceschange",z),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(B),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,He=null,qe=null;N.depth&&(qe=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Ee=N.stencil?Cr:ps,He=N.stencil?Jl:Ua);const Qe={colorFormat:i.RGBA8,depthFormat:qe,scaleFactor:c};x=this.getBinding(),g=x.createProjectionLayer(Qe),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),U=new La(g.textureWidth,g.textureHeight,{format:va,type:aa,depthTexture:new jo(g.textureWidth,g.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Ee={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,Ee),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),U=new La(b.framebufferWidth,b.framebufferHeight,{format:va,type:aa,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Oe.setContext(l),Oe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function z(te){for(let be=0;be<te.removed.length;be++){const Ee=te.removed[be],He=L.indexOf(Ee);He>=0&&(L[He]=null,k[He].disconnect(Ee))}for(let be=0;be<te.added.length;be++){const Ee=te.added[be];let He=L.indexOf(Ee);if(He===-1){for(let Qe=0;Qe<k.length;Qe++)if(Qe>=L.length){L.push(Ee),He=Qe;break}else if(L[Qe]===null){L[Qe]=Ee,He=Qe;break}if(He===-1)break}const qe=k[He];qe&&qe.connect(Ee)}}const K=new se,ue=new se;function ge(te,be,Ee){K.setFromMatrixPosition(be.matrixWorld),ue.setFromMatrixPosition(Ee.matrixWorld);const He=K.distanceTo(ue),qe=be.projectionMatrix.elements,Qe=Ee.projectionMatrix.elements,vt=qe[14]/(qe[10]-1),Xe=qe[14]/(qe[10]+1),pt=(qe[9]+1)/qe[5],Nt=(qe[9]-1)/qe[5],ct=(qe[8]-1)/qe[0],Rt=(Qe[8]+1)/Qe[0],zt=vt*ct,$e=vt*Rt,Y=He/(-ct+Rt),Et=Y*-ct;if(be.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Et),te.translateZ(Y),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),qe[10]===-1)te.projectionMatrix.copy(be.projectionMatrix),te.projectionMatrixInverse.copy(be.projectionMatrixInverse);else{const ut=vt+Y,Gt=Xe+Y,Re=zt-Et,Vt=$e+(He-Et),O=pt*Xe/Gt*ut,T=Nt*Xe/Gt*ut;te.projectionMatrix.makePerspective(Re,Vt,O,T,ut,Gt),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function P(te,be){be===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(be.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(l===null)return;let be=te.near,Ee=te.far;S.texture!==null&&(S.depthNear>0&&(be=S.depthNear),S.depthFar>0&&(Ee=S.depthFar)),q.near=j.near=F.near=be,q.far=j.far=F.far=Ee,(ie!==q.near||ee!==q.far)&&(l.updateRenderState({depthNear:q.near,depthFar:q.far}),ie=q.near,ee=q.far),q.layers.mask=te.layers.mask|6,F.layers.mask=q.layers.mask&-5,j.layers.mask=q.layers.mask&-3;const He=te.parent,qe=q.cameras;P(q,He);for(let Qe=0;Qe<qe.length;Qe++)P(qe[Qe],He);qe.length===2?ge(q,F,j):q.projectionMatrix.copy(F.projectionMatrix),Z(te,q,He)};function Z(te,be,Ee){Ee===null?te.matrix.copy(be.matrixWorld):(te.matrix.copy(Ee.matrixWorld),te.matrix.invert(),te.matrix.multiply(be.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(be.projectionMatrix),te.projectionMatrixInverse.copy(be.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=jp*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(g===null&&b===null))return m},this.setFoveation=function(te){m=te,g!==null&&(g.fixedFoveation=te),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=te)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(q)},this.getCameraTexture=function(te){return E[te]};let _e=null;function Ae(te,be){if(_=be.getViewerPose(p||f),M=be,_!==null){const Ee=_.views;b!==null&&(e.setRenderTargetFramebuffer(U,b.framebuffer),e.setRenderTarget(U));let He=!1;Ee.length!==q.cameras.length&&(q.cameras.length=0,He=!0);for(let Xe=0;Xe<Ee.length;Xe++){const pt=Ee[Xe];let Nt=null;if(b!==null)Nt=b.getViewport(pt);else{const Rt=x.getViewSubImage(g,pt);Nt=Rt.viewport,Xe===0&&(e.setRenderTargetTextures(U,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(U))}let ct=G[Xe];ct===void 0&&(ct=new ia,ct.layers.enable(Xe),ct.viewport=new Ln,G[Xe]=ct),ct.matrix.fromArray(pt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(pt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),Xe===0&&(q.matrix.copy(ct.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),He===!0&&q.cameras.push(ct)}const qe=l.enabledFeatures;if(qe&&qe.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){x=s.getBinding();const Xe=x.getDepthInformation(Ee[0]);Xe&&Xe.isValid&&Xe.texture&&S.init(Xe,l.renderState)}if(qe&&qe.includes("camera-access")&&R){e.state.unbindTexture(),x=s.getBinding();for(let Xe=0;Xe<Ee.length;Xe++){const pt=Ee[Xe].camera;if(pt){let Nt=E[pt];Nt||(Nt=new pb,E[pt]=Nt);const ct=x.getCameraImage(pt);Nt.sourceTexture=ct}}}}for(let Ee=0;Ee<k.length;Ee++){const He=L[Ee],qe=k[Ee];He!==null&&qe!==void 0&&qe.update(He,be,p||f)}_e&&_e(te,be),be.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:be}),M=null}const Oe=new _b;Oe.setAnimationLoop(Ae),this.setAnimationLoop=function(te){_e=te},this.dispose=function(){}}}const CC=new Xn,Tb=new _t;Tb.set(-1,0,0,0,1,0,0,0,1);function NC(r,e){function i(S,E){S.matrixAutoUpdate===!0&&S.updateMatrix(),E.value.copy(S.matrix)}function s(S,E){E.color.getRGB(S.fogColor.value,mb(r)),E.isFog?(S.fogNear.value=E.near,S.fogFar.value=E.far):E.isFogExp2&&(S.fogDensity.value=E.density)}function l(S,E,N,I,U){E.isNodeMaterial?E.uniformsNeedUpdate=!1:E.isMeshBasicMaterial?c(S,E):E.isMeshLambertMaterial?(c(S,E),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)):E.isMeshToonMaterial?(c(S,E),x(S,E)):E.isMeshPhongMaterial?(c(S,E),_(S,E),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)):E.isMeshStandardMaterial?(c(S,E),g(S,E),E.isMeshPhysicalMaterial&&b(S,E,U)):E.isMeshMatcapMaterial?(c(S,E),M(S,E)):E.isMeshDepthMaterial?c(S,E):E.isMeshDistanceMaterial?(c(S,E),R(S,E)):E.isMeshNormalMaterial?c(S,E):E.isLineBasicMaterial?(f(S,E),E.isLineDashedMaterial&&h(S,E)):E.isPointsMaterial?m(S,E,N,I):E.isSpriteMaterial?p(S,E):E.isShadowMaterial?(S.color.value.copy(E.color),S.opacity.value=E.opacity):E.isShaderMaterial&&(E.uniformsNeedUpdate=!1)}function c(S,E){S.opacity.value=E.opacity,E.color&&S.diffuse.value.copy(E.color),E.emissive&&S.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity),E.map&&(S.map.value=E.map,i(E.map,S.mapTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.bumpMap&&(S.bumpMap.value=E.bumpMap,i(E.bumpMap,S.bumpMapTransform),S.bumpScale.value=E.bumpScale,E.side===Ci&&(S.bumpScale.value*=-1)),E.normalMap&&(S.normalMap.value=E.normalMap,i(E.normalMap,S.normalMapTransform),S.normalScale.value.copy(E.normalScale),E.side===Ci&&S.normalScale.value.negate()),E.displacementMap&&(S.displacementMap.value=E.displacementMap,i(E.displacementMap,S.displacementMapTransform),S.displacementScale.value=E.displacementScale,S.displacementBias.value=E.displacementBias),E.emissiveMap&&(S.emissiveMap.value=E.emissiveMap,i(E.emissiveMap,S.emissiveMapTransform)),E.specularMap&&(S.specularMap.value=E.specularMap,i(E.specularMap,S.specularMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest);const N=e.get(E),I=N.envMap,U=N.envMapRotation;I&&(S.envMap.value=I,S.envMapRotation.value.setFromMatrix4(CC.makeRotationFromEuler(U)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(Tb),S.reflectivity.value=E.reflectivity,S.ior.value=E.ior,S.refractionRatio.value=E.refractionRatio),E.lightMap&&(S.lightMap.value=E.lightMap,S.lightMapIntensity.value=E.lightMapIntensity,i(E.lightMap,S.lightMapTransform)),E.aoMap&&(S.aoMap.value=E.aoMap,S.aoMapIntensity.value=E.aoMapIntensity,i(E.aoMap,S.aoMapTransform))}function f(S,E){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,E.map&&(S.map.value=E.map,i(E.map,S.mapTransform))}function h(S,E){S.dashSize.value=E.dashSize,S.totalSize.value=E.dashSize+E.gapSize,S.scale.value=E.scale}function m(S,E,N,I){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,S.size.value=E.size*N,S.scale.value=I*.5,E.map&&(S.map.value=E.map,i(E.map,S.uvTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest)}function p(S,E){S.diffuse.value.copy(E.color),S.opacity.value=E.opacity,S.rotation.value=E.rotation,E.map&&(S.map.value=E.map,i(E.map,S.mapTransform)),E.alphaMap&&(S.alphaMap.value=E.alphaMap,i(E.alphaMap,S.alphaMapTransform)),E.alphaTest>0&&(S.alphaTest.value=E.alphaTest)}function _(S,E){S.specular.value.copy(E.specular),S.shininess.value=Math.max(E.shininess,1e-4)}function x(S,E){E.gradientMap&&(S.gradientMap.value=E.gradientMap)}function g(S,E){S.metalness.value=E.metalness,E.metalnessMap&&(S.metalnessMap.value=E.metalnessMap,i(E.metalnessMap,S.metalnessMapTransform)),S.roughness.value=E.roughness,E.roughnessMap&&(S.roughnessMap.value=E.roughnessMap,i(E.roughnessMap,S.roughnessMapTransform)),E.envMap&&(S.envMapIntensity.value=E.envMapIntensity)}function b(S,E,N){S.ior.value=E.ior,E.sheen>0&&(S.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),S.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap&&(S.sheenColorMap.value=E.sheenColorMap,i(E.sheenColorMap,S.sheenColorMapTransform)),E.sheenRoughnessMap&&(S.sheenRoughnessMap.value=E.sheenRoughnessMap,i(E.sheenRoughnessMap,S.sheenRoughnessMapTransform))),E.clearcoat>0&&(S.clearcoat.value=E.clearcoat,S.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap&&(S.clearcoatMap.value=E.clearcoatMap,i(E.clearcoatMap,S.clearcoatMapTransform)),E.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,i(E.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),E.clearcoatNormalMap&&(S.clearcoatNormalMap.value=E.clearcoatNormalMap,i(E.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===Ci&&S.clearcoatNormalScale.value.negate())),E.dispersion>0&&(S.dispersion.value=E.dispersion),E.iridescence>0&&(S.iridescence.value=E.iridescence,S.iridescenceIOR.value=E.iridescenceIOR,S.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap&&(S.iridescenceMap.value=E.iridescenceMap,i(E.iridescenceMap,S.iridescenceMapTransform)),E.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=E.iridescenceThicknessMap,i(E.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),E.transmission>0&&(S.transmission.value=E.transmission,S.transmissionSamplerMap.value=N.texture,S.transmissionSamplerSize.value.set(N.width,N.height),E.transmissionMap&&(S.transmissionMap.value=E.transmissionMap,i(E.transmissionMap,S.transmissionMapTransform)),S.thickness.value=E.thickness,E.thicknessMap&&(S.thicknessMap.value=E.thicknessMap,i(E.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=E.attenuationDistance,S.attenuationColor.value.copy(E.attenuationColor)),E.anisotropy>0&&(S.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap&&(S.anisotropyMap.value=E.anisotropyMap,i(E.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=E.specularIntensity,S.specularColor.value.copy(E.specularColor),E.specularColorMap&&(S.specularColorMap.value=E.specularColorMap,i(E.specularColorMap,S.specularColorMapTransform)),E.specularIntensityMap&&(S.specularIntensityMap.value=E.specularIntensityMap,i(E.specularIntensityMap,S.specularIntensityMapTransform))}function M(S,E){E.matcap&&(S.matcap.value=E.matcap)}function R(S,E){const N=e.get(E).light;S.referencePosition.value.setFromMatrixPosition(N.matrixWorld),S.nearDistance.value=N.shadow.camera.near,S.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function OC(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,I){const U=I.program;s.uniformBlockBinding(N,U)}function p(N,I){let U=l[N.id];U===void 0&&(M(N),U=_(N),l[N.id]=U,N.addEventListener("dispose",S));const k=I.program;s.updateUBOMapping(N,k);const L=e.render.frame;c[N.id]!==L&&(g(N),c[N.id]=L)}function _(N){const I=x();N.__bindingPointIndex=I;const U=r.createBuffer(),k=N.__size,L=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,k,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,U),U}function x(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const I=l[N.id],U=N.uniforms,k=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let L=0,B=U.length;L<B;L++){const A=Array.isArray(U[L])?U[L]:[U[L]];for(let F=0,j=A.length;F<j;F++){const G=A[F];if(b(G,L,F,k)===!0){const q=G.__offset,ie=Array.isArray(G.value)?G.value:[G.value];let ee=0;for(let V=0;V<ie.length;V++){const D=ie[V],z=R(D);typeof D=="number"||typeof D=="boolean"?(G.__data[0]=D,r.bufferSubData(r.UNIFORM_BUFFER,q+ee,G.__data)):D.isMatrix3?(G.__data[0]=D.elements[0],G.__data[1]=D.elements[1],G.__data[2]=D.elements[2],G.__data[3]=0,G.__data[4]=D.elements[3],G.__data[5]=D.elements[4],G.__data[6]=D.elements[5],G.__data[7]=0,G.__data[8]=D.elements[6],G.__data[9]=D.elements[7],G.__data[10]=D.elements[8],G.__data[11]=0):ArrayBuffer.isView(D)?G.__data.set(new D.constructor(D.buffer,D.byteOffset,G.__data.length)):(D.toArray(G.__data,ee),ee+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,q,G.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(N,I,U,k){const L=N.value,B=I+"_"+U;if(k[B]===void 0)return typeof L=="number"||typeof L=="boolean"?k[B]=L:ArrayBuffer.isView(L)?k[B]=L.slice():k[B]=L.clone(),!0;{const A=k[B];if(typeof L=="number"||typeof L=="boolean"){if(A!==L)return k[B]=L,!0}else{if(ArrayBuffer.isView(L))return!0;if(A.equals(L)===!1)return A.copy(L),!0}}return!1}function M(N){const I=N.uniforms;let U=0;const k=16;for(let B=0,A=I.length;B<A;B++){const F=Array.isArray(I[B])?I[B]:[I[B]];for(let j=0,G=F.length;j<G;j++){const q=F[j],ie=Array.isArray(q.value)?q.value:[q.value];for(let ee=0,V=ie.length;ee<V;ee++){const D=ie[ee],z=R(D),K=U%k,ue=K%z.boundary,ge=K+ue;U+=ue,ge!==0&&k-ge<z.storage&&(U+=k-ge),q.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=U,U+=z.storage}}}const L=U%k;return L>0&&(U+=k-L),N.__size=U,N.__cache={},this}function R(N){const I={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(I.boundary=4,I.storage=4):N.isVector2?(I.boundary=8,I.storage=8):N.isVector3||N.isColor?(I.boundary=16,I.storage=12):N.isVector4?(I.boundary=16,I.storage=16):N.isMatrix3?(I.boundary=48,I.storage=48):N.isMatrix4?(I.boundary=64,I.storage=64):N.isTexture?dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(I.boundary=16,I.storage=N.byteLength):dt("WebGLRenderer: Unsupported uniform value type.",N),I}function S(N){const I=N.target;I.removeEventListener("dispose",S);const U=f.indexOf(I.__bindingPointIndex);f.splice(U,1),r.deleteBuffer(l[I.id]),delete l[I.id],delete c[I.id]}function E(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:p,dispose:E}}const DC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ra=null;function LC(){return Ra===null&&(Ra=new bT(DC,16,16,Lr,hs),Ra.name="DFG_LUT",Ra.minFilter=di,Ra.magFilter=di,Ra.wrapS=us,Ra.wrapT=us,Ra.generateMipmaps=!1,Ra.needsUpdate=!0),Ra}class IC{constructor(e={}){const{canvas:i=KM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:b=aa}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const R=b,S=new Set([im,nm,tm]),E=new Set([aa,Ua,Ql,Jl,Jp,em]),N=new Uint32Array(4),I=new Int32Array(4),U=new se;let k=null,L=null;const B=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Da,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const j=this;let G=!1,q=null;this._outputColorSpace=Vi;let ie=0,ee=0,V=null,D=-1,z=null;const K=new Ln,ue=new Ln;let ge=null;const P=new dn(0);let Z=0,_e=i.width,Ae=i.height,Oe=1,te=null,be=null;const Ee=new Ln(0,0,_e,Ae),He=new Ln(0,0,_e,Ae);let qe=!1;const Qe=new db;let vt=!1,Xe=!1;const pt=new Xn,Nt=new se,ct=new Ln,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function $e(){return V===null?Oe:1}let Y=s;function Et(w,$){return i.getContext(w,$)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Zp}`),i.addEventListener("webglcontextlost",Se,!1),i.addEventListener("webglcontextrestored",We,!1),i.addEventListener("webglcontextcreationerror",at,!1),Y===null){const $="webgl2";if(Y=Et($,w),Y===null)throw Et($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw Wt("WebGLRenderer: "+w.message),w}let ut,Gt,Re,Vt,O,T,J,he,Me,Ne,Pe,fe,me,De,Be,Le,Ie,it,rt,mt,X,Ce,pe;function ze(){ut=new Lw(Y),ut.init(),X=new MC(Y,ut),Gt=new Tw(Y,ut,e,X),Re=new EC(Y,ut),Gt.reversedDepthBuffer&&g&&Re.buffers.depth.setReversed(!0),Vt=new Pw(Y),O=new lC,T=new SC(Y,ut,Re,O,Gt,X,Vt),J=new Dw(j),he=new GT(Y),Ce=new Sw(Y,he),Me=new Iw(Y,he,Vt,Ce),Ne=new Bw(Y,Me,he,Ce,Vt),it=new Fw(Y,Gt,T),Be=new Aw(O),Pe=new oC(j,J,ut,Gt,Ce,Be),fe=new NC(j,O),me=new uC,De=new gC(ut),Ie=new Ew(j,J,Re,Ne,M,m),Le=new yC(j,Ne,Gt),pe=new OC(Y,Vt,Gt,Re),rt=new Mw(Y,ut,Vt),mt=new Uw(Y,ut,Vt),Vt.programs=Pe.programs,j.capabilities=Gt,j.extensions=ut,j.properties=O,j.renderLists=me,j.shadowMap=Le,j.state=Re,j.info=Vt}ze(),R!==aa&&(F=new Gw(R,i.width,i.height,l,c));const Ue=new RC(j,Y);this.xr=Ue,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const w=ut.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ut.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(w){w!==void 0&&(Oe=w,this.setSize(_e,Ae,!1))},this.getSize=function(w){return w.set(_e,Ae)},this.setSize=function(w,$,re=!0){if(Ue.isPresenting){dt("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=w,Ae=$,i.width=Math.floor(w*Oe),i.height=Math.floor($*Oe),re===!0&&(i.style.width=w+"px",i.style.height=$+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,$)},this.getDrawingBufferSize=function(w){return w.set(_e*Oe,Ae*Oe).floor()},this.setDrawingBufferSize=function(w,$,re){_e=w,Ae=$,Oe=re,i.width=Math.floor(w*re),i.height=Math.floor($*re),this.setViewport(0,0,w,$)},this.setEffects=function(w){if(R===aa){Wt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let $=0;$<w.length;$++)if(w[$].isOutputPass===!0){dt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(K)},this.getViewport=function(w){return w.copy(Ee)},this.setViewport=function(w,$,re,ne){w.isVector4?Ee.set(w.x,w.y,w.z,w.w):Ee.set(w,$,re,ne),Re.viewport(K.copy(Ee).multiplyScalar(Oe).round())},this.getScissor=function(w){return w.copy(He)},this.setScissor=function(w,$,re,ne){w.isVector4?He.set(w.x,w.y,w.z,w.w):He.set(w,$,re,ne),Re.scissor(ue.copy(He).multiplyScalar(Oe).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(w){Re.setScissorTest(qe=w)},this.setOpaqueSort=function(w){te=w},this.setTransparentSort=function(w){be=w},this.getClearColor=function(w){return w.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(w=!0,$=!0,re=!0){let ne=0;if(w){let ae=!1;if(V!==null){const Ge=V.texture.format;ae=S.has(Ge)}if(ae){const Ge=V.texture.type,ke=E.has(Ge),Fe=Ie.getClearColor(),Ke=Ie.getClearAlpha(),Ye=Fe.r,nt=Fe.g,xt=Fe.b;ke?(N[0]=Ye,N[1]=nt,N[2]=xt,N[3]=Ke,Y.clearBufferuiv(Y.COLOR,0,N)):(I[0]=Ye,I[1]=nt,I[2]=xt,I[3]=Ke,Y.clearBufferiv(Y.COLOR,0,I))}else ne|=Y.COLOR_BUFFER_BIT}$&&(ne|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),re&&(ne|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&Y.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Se,!1),i.removeEventListener("webglcontextrestored",We,!1),i.removeEventListener("webglcontextcreationerror",at,!1),Ie.dispose(),me.dispose(),De.dispose(),O.dispose(),J.dispose(),Ne.dispose(),Ce.dispose(),pe.dispose(),Pe.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",za),Ue.removeEventListener("sessionend",oa),Mn.stop()};function Se(w){w.preventDefault(),I_("WebGLRenderer: Context Lost."),G=!0}function We(){I_("WebGLRenderer: Context Restored."),G=!1;const w=Vt.autoReset,$=Le.enabled,re=Le.autoUpdate,ne=Le.needsUpdate,ae=Le.type;ze(),Vt.autoReset=w,Le.enabled=$,Le.autoUpdate=re,Le.needsUpdate=ne,Le.type=ae}function at(w){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function hn(w){const $=w.target;$.removeEventListener("dispose",hn),Ct($)}function Ct(w){qn(w),O.remove(w)}function qn(w){const $=O.get(w).programs;$!==void 0&&($.forEach(function(re){Pe.releaseProgram(re)}),w.isShaderMaterial&&Pe.releaseShaderCache(w))}this.renderBufferDirect=function(w,$,re,ne,ae,Ge){$===null&&($=Rt);const ke=ae.isMesh&&ae.matrixWorld.determinant()<0,Fe=xi(w,$,re,ne,ae);Re.setMaterial(ne,ke);let Ke=re.index,Ye=1;if(ne.wireframe===!0){if(Ke=Me.getWireframeAttribute(re),Ke===void 0)return;Ye=2}const nt=re.drawRange,xt=re.attributes.position;let tt=nt.start*Ye,jt=(nt.start+nt.count)*Ye;Ge!==null&&(tt=Math.max(tt,Ge.start*Ye),jt=Math.min(jt,(Ge.start+Ge.count)*Ye)),Ke!==null?(tt=Math.max(tt,0),jt=Math.min(jt,Ke.count)):xt!=null&&(tt=Math.max(tt,0),jt=Math.min(jt,xt.count));const tn=jt-tt;if(tn<0||tn===1/0)return;Ce.setup(ae,ne,Fe,re,Ke);let qt,Qt=rt;if(Ke!==null&&(qt=he.get(Ke),Qt=mt,Qt.setIndex(qt)),ae.isMesh)ne.wireframe===!0?(Re.setLineWidth(ne.wireframeLinewidth*$e()),Qt.setMode(Y.LINES)):Qt.setMode(Y.TRIANGLES);else if(ae.isLine){let Xt=ne.linewidth;Xt===void 0&&(Xt=1),Re.setLineWidth(Xt*$e()),ae.isLineSegments?Qt.setMode(Y.LINES):ae.isLineLoop?Qt.setMode(Y.LINE_LOOP):Qt.setMode(Y.LINE_STRIP)}else ae.isPoints?Qt.setMode(Y.POINTS):ae.isSprite&&Qt.setMode(Y.TRIANGLES);if(ae.isBatchedMesh)if(ut.get("WEBGL_multi_draw"))Qt.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else{const Xt=ae._multiDrawStarts,Ve=ae._multiDrawCounts,Pn=ae._multiDrawCount,At=Ke?he.get(Ke).bytesPerElement:1,xn=O.get(ne).currentProgram.getUniforms();for(let $n=0;$n<Pn;$n++)xn.setValue(Y,"_gl_DrawID",$n),Qt.render(Xt[$n]/At,Ve[$n])}else if(ae.isInstancedMesh)Qt.renderInstances(tt,tn,ae.count);else if(re.isInstancedBufferGeometry){const Xt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,Ve=Math.min(re.instanceCount,Xt);Qt.renderInstances(tt,tn,Ve)}else Qt.render(tt,tn)};function Un(w,$,re){w.transparent===!0&&w.side===cs&&w.forceSinglePass===!1?(w.side=Ci,w.needsUpdate=!0,ya(w,$,re),w.side=Qs,w.needsUpdate=!0,ya(w,$,re),w.side=cs):ya(w,$,re)}this.compile=function(w,$,re=null){re===null&&(re=w),L=De.get(re),L.init($),A.push(L),re.traverseVisible(function(ae){ae.isLight&&ae.layers.test($.layers)&&(L.pushLight(ae),ae.castShadow&&L.pushShadow(ae))}),w!==re&&w.traverseVisible(function(ae){ae.isLight&&ae.layers.test($.layers)&&(L.pushLight(ae),ae.castShadow&&L.pushShadow(ae))}),L.setupLights();const ne=new Set;return w.traverse(function(ae){if(!(ae.isMesh||ae.isPoints||ae.isLine||ae.isSprite))return;const Ge=ae.material;if(Ge)if(Array.isArray(Ge))for(let ke=0;ke<Ge.length;ke++){const Fe=Ge[ke];Un(Fe,re,ae),ne.add(Fe)}else Un(Ge,re,ae),ne.add(Ge)}),L=A.pop(),ne},this.compileAsync=function(w,$,re=null){const ne=this.compile(w,$,re);return new Promise(ae=>{function Ge(){if(ne.forEach(function(ke){O.get(ke).currentProgram.isReady()&&ne.delete(ke)}),ne.size===0){ae(w);return}setTimeout(Ge,10)}ut.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let ra=null;function Cn(w){ra&&ra(w)}function za(){Mn.stop()}function oa(){Mn.start()}const Mn=new _b;Mn.setAnimationLoop(Cn),typeof self<"u"&&Mn.setContext(self),this.setAnimationLoop=function(w){ra=w,Ue.setAnimationLoop(w),w===null?Mn.stop():Mn.start()},Ue.addEventListener("sessionstart",za),Ue.addEventListener("sessionend",oa),this.render=function(w,$){if($!==void 0&&$.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;q!==null&&q.renderStart(w,$);const re=Ue.enabled===!0&&Ue.isPresenting===!0,ne=F!==null&&(V===null||re)&&F.begin(j,V);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera($),$=Ue.getCamera()),w.isScene===!0&&w.onBeforeRender(j,w,$,V),L=De.get(w,A.length),L.init($),L.state.textureUnits=T.getTextureUnits(),A.push(L),pt.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),Qe.setFromProjectionMatrix(pt,Oa,$.reversedDepth),Xe=this.localClippingEnabled,vt=Be.init(this.clippingPlanes,Xe),k=me.get(w,B.length),k.init(),B.push(k),Ue.enabled===!0&&Ue.isPresenting===!0){const ke=j.xr.getDepthSensingMesh();ke!==null&&nn(ke,$,-1/0,j.sortObjects)}nn(w,$,0,j.sortObjects),k.finish(),j.sortObjects===!0&&k.sort(te,be),zt=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,zt&&Ie.addToRenderList(k,w),this.info.render.frame++,vt===!0&&Be.beginShadows();const ae=L.state.shadowsArray;if(Le.render(ae,w,$),vt===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ne&&F.hasRenderPass())===!1){const ke=k.opaque,Fe=k.transmissive;if(L.setupLights(),$.isArrayCamera){const Ke=$.cameras;if(Fe.length>0)for(let Ye=0,nt=Ke.length;Ye<nt;Ye++){const xt=Ke[Ye];ri(ke,Fe,w,xt)}zt&&Ie.render(w);for(let Ye=0,nt=Ke.length;Ye<nt;Ye++){const xt=Ke[Ye];yn(k,w,xt,xt.viewport)}}else Fe.length>0&&ri(ke,Fe,w,$),zt&&Ie.render(w),yn(k,w,$)}V!==null&&ee===0&&(T.updateMultisampleRenderTarget(V),T.updateRenderTargetMipmap(V)),ne&&F.end(j),w.isScene===!0&&w.onAfterRender(j,w,$),Ce.resetDefaultState(),D=-1,z=null,A.pop(),A.length>0?(L=A[A.length-1],T.setTextureUnits(L.state.textureUnits),vt===!0&&Be.setGlobalState(j.clippingPlanes,L.state.camera)):L=null,B.pop(),B.length>0?k=B[B.length-1]:k=null,q!==null&&q.renderEnd()};function nn(w,$,re,ne){if(w.visible===!1)return;if(w.layers.test($.layers)){if(w.isGroup)re=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update($);else if(w.isLightProbeGrid)L.pushLightProbeGrid(w);else if(w.isLight)L.pushLight(w),w.castShadow&&L.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Qe.intersectsSprite(w)){ne&&ct.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pt);const ke=Ne.update(w),Fe=w.material;Fe.visible&&k.push(w,ke,Fe,re,ct.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Qe.intersectsObject(w))){const ke=Ne.update(w),Fe=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ct.copy(w.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),ct.copy(ke.boundingSphere.center)),ct.applyMatrix4(w.matrixWorld).applyMatrix4(pt)),Array.isArray(Fe)){const Ke=ke.groups;for(let Ye=0,nt=Ke.length;Ye<nt;Ye++){const xt=Ke[Ye],tt=Fe[xt.materialIndex];tt&&tt.visible&&k.push(w,ke,tt,re,ct.z,xt)}}else Fe.visible&&k.push(w,ke,Fe,re,ct.z,null)}}const Ge=w.children;for(let ke=0,Fe=Ge.length;ke<Fe;ke++)nn(Ge[ke],$,re,ne)}function yn(w,$,re,ne){const{opaque:ae,transmissive:Ge,transparent:ke}=w;L.setupLightsView(re),vt===!0&&Be.setGlobalState(j.clippingPlanes,re),ne&&Re.viewport(K.copy(ne)),ae.length>0&&pn(ae,$,re),Ge.length>0&&pn(Ge,$,re),ke.length>0&&pn(ke,$,re),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function ri(w,$,re,ne){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[ne.id]===void 0){const tt=ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[ne.id]=new La(1,1,{generateMipmaps:!0,type:tt?hs:aa,minFilter:Rr,samples:Math.max(4,Gt.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace})}const Ge=L.state.transmissionRenderTarget[ne.id],ke=ne.viewport||K;Ge.setSize(ke.z*j.transmissionResolutionScale,ke.w*j.transmissionResolutionScale);const Fe=j.getRenderTarget(),Ke=j.getActiveCubeFace(),Ye=j.getActiveMipmapLevel();j.setRenderTarget(Ge),j.getClearColor(P),Z=j.getClearAlpha(),Z<1&&j.setClearColor(16777215,.5),j.clear(),zt&&Ie.render(re);const nt=j.toneMapping;j.toneMapping=Da;const xt=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),L.setupLightsView(ne),vt===!0&&Be.setGlobalState(j.clippingPlanes,ne),pn(w,re,ne),T.updateMultisampleRenderTarget(Ge),T.updateRenderTargetMipmap(Ge),ut.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let jt=0,tn=$.length;jt<tn;jt++){const qt=$[jt],{object:Qt,geometry:Xt,material:Ve,group:Pn}=qt;if(Ve.side===cs&&Qt.layers.test(ne.layers)){const At=Ve.side;Ve.side=Ci,Ve.needsUpdate=!0,ba(Qt,re,ne,Xt,Ve,Pn),Ve.side=At,Ve.needsUpdate=!0,tt=!0}}tt===!0&&(T.updateMultisampleRenderTarget(Ge),T.updateRenderTargetMipmap(Ge))}j.setRenderTarget(Fe,Ke,Ye),j.setClearColor(P,Z),xt!==void 0&&(ne.viewport=xt),j.toneMapping=nt}function pn(w,$,re){const ne=$.isScene===!0?$.overrideMaterial:null;for(let ae=0,Ge=w.length;ae<Ge;ae++){const ke=w[ae],{object:Fe,geometry:Ke,group:Ye}=ke;let nt=ke.material;nt.allowOverride===!0&&ne!==null&&(nt=ne),Fe.layers.test(re.layers)&&ba(Fe,$,re,Ke,nt,Ye)}}function ba(w,$,re,ne,ae,Ge){w.onBeforeRender(j,$,re,ne,ae,Ge),w.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ae.onBeforeRender(j,$,re,ne,w,Ge),ae.transparent===!0&&ae.side===cs&&ae.forceSinglePass===!1?(ae.side=Ci,ae.needsUpdate=!0,j.renderBufferDirect(re,$,ne,ae,w,Ge),ae.side=Qs,ae.needsUpdate=!0,j.renderBufferDirect(re,$,ne,ae,w,Ge),ae.side=cs):j.renderBufferDirect(re,$,ne,ae,w,Ge),w.onAfterRender(j,$,re,ne,ae,Ge)}function ya(w,$,re){$.isScene!==!0&&($=Rt);const ne=O.get(w),ae=L.state.lights,Ge=L.state.shadowsArray,ke=ae.state.version,Fe=Pe.getParameters(w,ae.state,Ge,$,re,L.state.lightProbeGridArray),Ke=Pe.getProgramCacheKey(Fe);let Ye=ne.programs;ne.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?$.environment:null,ne.fog=$.fog;const nt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ne.envMap=J.get(w.envMap||ne.environment,nt),ne.envMapRotation=ne.environment!==null&&w.envMap===null?$.environmentRotation:w.envMapRotation,Ye===void 0&&(w.addEventListener("dispose",hn),Ye=new Map,ne.programs=Ye);let xt=Ye.get(Ke);if(xt!==void 0){if(ne.currentProgram===xt&&ne.lightsStateVersion===ke)return la(w,Fe),xt}else Fe.uniforms=Pe.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,re,Fe),w.onBeforeCompile(Fe,j),xt=Pe.acquireProgram(Fe,Ke),Ye.set(Ke,xt),ne.uniforms=Fe.uniforms;const tt=ne.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(tt.clippingPlanes=Be.uniform),la(w,Fe),ne.needsLights=ca(w),ne.lightsStateVersion=ke,ne.needsLights&&(tt.ambientLightColor.value=ae.state.ambient,tt.lightProbe.value=ae.state.probe,tt.directionalLights.value=ae.state.directional,tt.directionalLightShadows.value=ae.state.directionalShadow,tt.spotLights.value=ae.state.spot,tt.spotLightShadows.value=ae.state.spotShadow,tt.rectAreaLights.value=ae.state.rectArea,tt.ltc_1.value=ae.state.rectAreaLTC1,tt.ltc_2.value=ae.state.rectAreaLTC2,tt.pointLights.value=ae.state.point,tt.pointLightShadows.value=ae.state.pointShadow,tt.hemisphereLights.value=ae.state.hemi,tt.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,tt.spotLightMatrix.value=ae.state.spotLightMatrix,tt.spotLightMap.value=ae.state.spotLightMap,tt.pointShadowMatrix.value=ae.state.pointShadowMatrix),ne.lightProbeGrid=L.state.lightProbeGridArray.length>0,ne.currentProgram=xt,ne.uniformsList=null,xt}function Ga(w){if(w.uniformsList===null){const $=w.currentProgram.getUniforms();w.uniformsList=qu.seqWithValue($.seq,w.uniforms)}return w.uniformsList}function la(w,$){const re=O.get(w);re.outputColorSpace=$.outputColorSpace,re.batching=$.batching,re.batchingColor=$.batchingColor,re.instancing=$.instancing,re.instancingColor=$.instancingColor,re.instancingMorph=$.instancingMorph,re.skinning=$.skinning,re.morphTargets=$.morphTargets,re.morphNormals=$.morphNormals,re.morphColors=$.morphColors,re.morphTargetsCount=$.morphTargetsCount,re.numClippingPlanes=$.numClippingPlanes,re.numIntersection=$.numClipIntersection,re.vertexAlphas=$.vertexAlphas,re.vertexTangents=$.vertexTangents,re.toneMapping=$.toneMapping}function ms(w,$){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;U.setFromMatrixPosition($.matrixWorld);for(let re=0,ne=w.length;re<ne;re++){const ae=w[re];if(ae.texture!==null&&ae.boundingBox.containsPoint(U))return ae}return null}function xi(w,$,re,ne,ae){$.isScene!==!0&&($=Rt),T.resetTextureUnits();const Ge=$.fog,ke=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?$.environment:null,Fe=V===null?j.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:kt.workingColorSpace,Ke=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ye=J.get(ne.envMap||ke,Ke),nt=ne.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,xt=!!re.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),tt=!!re.morphAttributes.position,jt=!!re.morphAttributes.normal,tn=!!re.morphAttributes.color;let qt=Da;ne.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(qt=j.toneMapping);const Qt=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Xt=Qt!==void 0?Qt.length:0,Ve=O.get(ne),Pn=L.state.lights;if(vt===!0&&(Xe===!0||w!==z)){const Yt=w===z&&ne.id===D;Be.setState(ne,w,Yt)}let At=!1;ne.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Pn.state.version||Ve.outputColorSpace!==Fe||ae.isBatchedMesh&&Ve.batching===!1||!ae.isBatchedMesh&&Ve.batching===!0||ae.isBatchedMesh&&Ve.batchingColor===!0&&ae.colorTexture===null||ae.isBatchedMesh&&Ve.batchingColor===!1&&ae.colorTexture!==null||ae.isInstancedMesh&&Ve.instancing===!1||!ae.isInstancedMesh&&Ve.instancing===!0||ae.isSkinnedMesh&&Ve.skinning===!1||!ae.isSkinnedMesh&&Ve.skinning===!0||ae.isInstancedMesh&&Ve.instancingColor===!0&&ae.instanceColor===null||ae.isInstancedMesh&&Ve.instancingColor===!1&&ae.instanceColor!==null||ae.isInstancedMesh&&Ve.instancingMorph===!0&&ae.morphTexture===null||ae.isInstancedMesh&&Ve.instancingMorph===!1&&ae.morphTexture!==null||Ve.envMap!==Ye||ne.fog===!0&&Ve.fog!==Ge||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Be.numPlanes||Ve.numIntersection!==Be.numIntersection)||Ve.vertexAlphas!==nt||Ve.vertexTangents!==xt||Ve.morphTargets!==tt||Ve.morphNormals!==jt||Ve.morphColors!==tn||Ve.toneMapping!==qt||Ve.morphTargetsCount!==Xt||!!Ve.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(At=!0):(At=!0,Ve.__version=ne.version);let xn=Ve.currentProgram;At===!0&&(xn=ya(ne,$,ae),q&&ne.isNodeMaterial&&q.onUpdateProgram(ne,xn,Ve));let $n=!1,En=!1,Jn=!1;const Jt=xn.getUniforms(),_n=Ve.uniforms;if(Re.useProgram(xn.program)&&($n=!0,En=!0,Jn=!0),ne.id!==D&&(D=ne.id,En=!0),Ve.needsLights){const Yt=ms(L.state.lightProbeGridArray,ae);Ve.lightProbeGrid!==Yt&&(Ve.lightProbeGrid=Yt,En=!0)}if($n||z!==w){Re.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Jt.setValue(Y,"projectionMatrix",w.projectionMatrix),Jt.setValue(Y,"viewMatrix",w.matrixWorldInverse);const Tn=Jt.map.cameraPosition;Tn!==void 0&&Tn.setValue(Y,Nt.setFromMatrixPosition(w.matrixWorld)),Gt.logarithmicDepthBuffer&&Jt.setValue(Y,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Jt.setValue(Y,"isOrthographic",w.isOrthographicCamera===!0),z!==w&&(z=w,En=!0,Jn=!0)}if(Ve.needsLights&&(Pn.state.directionalShadowMap.length>0&&Jt.setValue(Y,"directionalShadowMap",Pn.state.directionalShadowMap,T),Pn.state.spotShadowMap.length>0&&Jt.setValue(Y,"spotShadowMap",Pn.state.spotShadowMap,T),Pn.state.pointShadowMap.length>0&&Jt.setValue(Y,"pointShadowMap",Pn.state.pointShadowMap,T)),ae.isSkinnedMesh){Jt.setOptional(Y,ae,"bindMatrix"),Jt.setOptional(Y,ae,"bindMatrixInverse");const Yt=ae.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Jt.setValue(Y,"boneTexture",Yt.boneTexture,T))}ae.isBatchedMesh&&(Jt.setOptional(Y,ae,"batchingTexture"),Jt.setValue(Y,"batchingTexture",ae._matricesTexture,T),Jt.setOptional(Y,ae,"batchingIdTexture"),Jt.setValue(Y,"batchingIdTexture",ae._indirectTexture,T),Jt.setOptional(Y,ae,"batchingColorTexture"),ae._colorsTexture!==null&&Jt.setValue(Y,"batchingColorTexture",ae._colorsTexture,T));const vi=re.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&it.update(ae,re,xn),(En||Ve.receiveShadow!==ae.receiveShadow)&&(Ve.receiveShadow=ae.receiveShadow,Jt.setValue(Y,"receiveShadow",ae.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&$.environment!==null&&(_n.envMapIntensity.value=$.environmentIntensity),_n.dfgLUT!==void 0&&(_n.dfgLUT.value=LC()),En){if(Jt.setValue(Y,"toneMappingExposure",j.toneMappingExposure),Ve.needsLights&&Oi(_n,Jn),Ge&&ne.fog===!0&&fe.refreshFogUniforms(_n,Ge),fe.refreshMaterialUniforms(_n,ne,Oe,Ae,L.state.transmissionRenderTarget[w.id]),Ve.needsLights&&Ve.lightProbeGrid){const Yt=Ve.lightProbeGrid;_n.probesSH.value=Yt.texture,_n.probesMin.value.copy(Yt.boundingBox.min),_n.probesMax.value.copy(Yt.boundingBox.max),_n.probesResolution.value.copy(Yt.resolution)}qu.upload(Y,Ga(Ve),_n,T)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(qu.upload(Y,Ga(Ve),_n,T),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Jt.setValue(Y,"center",ae.center),Jt.setValue(Y,"modelViewMatrix",ae.modelViewMatrix),Jt.setValue(Y,"normalMatrix",ae.normalMatrix),Jt.setValue(Y,"modelMatrix",ae.matrixWorld),ne.uniformsGroups!==void 0){const Yt=ne.uniformsGroups;for(let Tn=0,Ha=Yt.length;Tn<Ha;Tn++){const gs=Yt[Tn];pe.update(gs,xn),pe.bind(gs,xn)}}return xn}function Oi(w,$){w.ambientLightColor.needsUpdate=$,w.lightProbe.needsUpdate=$,w.directionalLights.needsUpdate=$,w.directionalLightShadows.needsUpdate=$,w.pointLights.needsUpdate=$,w.pointLightShadows.needsUpdate=$,w.spotLights.needsUpdate=$,w.spotLightShadows.needsUpdate=$,w.rectAreaLights.needsUpdate=$,w.hemisphereLights.needsUpdate=$}function ca(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(w,$,re){const ne=O.get(w);ne.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),O.get(w.texture).__webglTexture=$,O.get(w.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:re,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,$){const re=O.get(w);re.__webglFramebuffer=$,re.__useDefaultFramebuffer=$===void 0};const _i=Y.createFramebuffer();this.setRenderTarget=function(w,$=0,re=0){V=w,ie=$,ee=re;let ne=null,ae=!1,Ge=!1;if(w){const Fe=O.get(w);if(Fe.__useDefaultFramebuffer!==void 0){Re.bindFramebuffer(Y.FRAMEBUFFER,Fe.__webglFramebuffer),K.copy(w.viewport),ue.copy(w.scissor),ge=w.scissorTest,Re.viewport(K),Re.scissor(ue),Re.setScissorTest(ge),D=-1;return}else if(Fe.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Fe.__hasExternalTextures)T.rebindTextures(w,O.get(w.texture).__webglTexture,O.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const nt=w.depthTexture;if(Fe.__boundDepthTexture!==nt){if(nt!==null&&O.has(nt)&&(w.width!==nt.image.width||w.height!==nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Ke=w.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Ge=!0);const Ye=O.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ye[$])?ne=Ye[$][re]:ne=Ye[$],ae=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?ne=O.get(w).__webglMultisampledFramebuffer:Array.isArray(Ye)?ne=Ye[re]:ne=Ye,K.copy(w.viewport),ue.copy(w.scissor),ge=w.scissorTest}else K.copy(Ee).multiplyScalar(Oe).floor(),ue.copy(He).multiplyScalar(Oe).floor(),ge=qe;if(re!==0&&(ne=_i),Re.bindFramebuffer(Y.FRAMEBUFFER,ne)&&Re.drawBuffers(w,ne),Re.viewport(K),Re.scissor(ue),Re.setScissorTest(ge),ae){const Fe=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+$,Fe.__webglTexture,re)}else if(Ge){const Fe=$;for(let Ke=0;Ke<w.textures.length;Ke++){const Ye=O.get(w.textures[Ke]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Ke,Ye.__webglTexture,re,Fe)}}else if(w!==null&&re!==0){const Fe=O.get(w.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Fe.__webglTexture,re)}D=-1},this.readRenderTargetPixels=function(w,$,re,ne,ae,Ge,ke,Fe=0){if(!(w&&w.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ke!==void 0&&(Ke=Ke[ke]),Ke){Re.bindFramebuffer(Y.FRAMEBUFFER,Ke);try{const Ye=w.textures[Fe],nt=Ye.format,xt=Ye.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Gt.textureFormatReadable(nt)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(xt)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=w.width-ne&&re>=0&&re<=w.height-ae&&Y.readPixels($,re,ne,ae,X.convert(nt),X.convert(xt),Ge)}finally{const Ye=V!==null?O.get(V).__webglFramebuffer:null;Re.bindFramebuffer(Y.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(w,$,re,ne,ae,Ge,ke,Fe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ke=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ke!==void 0&&(Ke=Ke[ke]),Ke)if($>=0&&$<=w.width-ne&&re>=0&&re<=w.height-ae){Re.bindFramebuffer(Y.FRAMEBUFFER,Ke);const Ye=w.textures[Fe],nt=Ye.format,xt=Ye.type;if(w.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Gt.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,tt),Y.bufferData(Y.PIXEL_PACK_BUFFER,Ge.byteLength,Y.STREAM_READ),Y.readPixels($,re,ne,ae,X.convert(nt),X.convert(xt),0);const jt=V!==null?O.get(V).__webglFramebuffer:null;Re.bindFramebuffer(Y.FRAMEBUFFER,jt);const tn=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await ZM(Y,tn,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,tt),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Ge),Y.deleteBuffer(tt),Y.deleteSync(tn),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,$=null,re=0){const ne=Math.pow(2,-re),ae=Math.floor(w.image.width*ne),Ge=Math.floor(w.image.height*ne),ke=$!==null?$.x:0,Fe=$!==null?$.y:0;T.setTexture2D(w,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,re,0,0,ke,Fe,ae,Ge),Re.unbindTexture()};const mn=Y.createFramebuffer(),ua=Y.createFramebuffer();this.copyTextureToTexture=function(w,$,re=null,ne=null,ae=0,Ge=0){let ke,Fe,Ke,Ye,nt,xt,tt,jt,tn;const qt=w.isCompressedTexture?w.mipmaps[Ge]:w.image;if(re!==null)ke=re.max.x-re.min.x,Fe=re.max.y-re.min.y,Ke=re.isBox3?re.max.z-re.min.z:1,Ye=re.min.x,nt=re.min.y,xt=re.isBox3?re.min.z:0;else{const _n=Math.pow(2,-ae);ke=Math.floor(qt.width*_n),Fe=Math.floor(qt.height*_n),w.isDataArrayTexture?Ke=qt.depth:w.isData3DTexture?Ke=Math.floor(qt.depth*_n):Ke=1,Ye=0,nt=0,xt=0}ne!==null?(tt=ne.x,jt=ne.y,tn=ne.z):(tt=0,jt=0,tn=0);const Qt=X.convert($.format),Xt=X.convert($.type);let Ve;$.isData3DTexture?(T.setTexture3D($,0),Ve=Y.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(T.setTexture2DArray($,0),Ve=Y.TEXTURE_2D_ARRAY):(T.setTexture2D($,0),Ve=Y.TEXTURE_2D),Re.activeTexture(Y.TEXTURE0),Re.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,$.flipY),Re.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),Re.pixelStorei(Y.UNPACK_ALIGNMENT,$.unpackAlignment);const Pn=Re.getParameter(Y.UNPACK_ROW_LENGTH),At=Re.getParameter(Y.UNPACK_IMAGE_HEIGHT),xn=Re.getParameter(Y.UNPACK_SKIP_PIXELS),$n=Re.getParameter(Y.UNPACK_SKIP_ROWS),En=Re.getParameter(Y.UNPACK_SKIP_IMAGES);Re.pixelStorei(Y.UNPACK_ROW_LENGTH,qt.width),Re.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,qt.height),Re.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ye),Re.pixelStorei(Y.UNPACK_SKIP_ROWS,nt),Re.pixelStorei(Y.UNPACK_SKIP_IMAGES,xt);const Jn=w.isDataArrayTexture||w.isData3DTexture,Jt=$.isDataArrayTexture||$.isData3DTexture;if(w.isDepthTexture){const _n=O.get(w),vi=O.get($),Yt=O.get(_n.__renderTarget),Tn=O.get(vi.__renderTarget);Re.bindFramebuffer(Y.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Re.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Tn.__webglFramebuffer);for(let Ha=0;Ha<Ke;Ha++)Jn&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get(w).__webglTexture,ae,xt+Ha),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,O.get($).__webglTexture,Ge,tn+Ha)),Y.blitFramebuffer(Ye,nt,ke,Fe,tt,jt,ke,Fe,Y.DEPTH_BUFFER_BIT,Y.NEAREST);Re.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Re.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(ae!==0||w.isRenderTargetTexture||O.has(w)){const _n=O.get(w),vi=O.get($);Re.bindFramebuffer(Y.READ_FRAMEBUFFER,mn),Re.bindFramebuffer(Y.DRAW_FRAMEBUFFER,ua);for(let Yt=0;Yt<Ke;Yt++)Jn?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,_n.__webglTexture,ae,xt+Yt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,_n.__webglTexture,ae),Jt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,vi.__webglTexture,Ge,tn+Yt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,vi.__webglTexture,Ge),ae!==0?Y.blitFramebuffer(Ye,nt,ke,Fe,tt,jt,ke,Fe,Y.COLOR_BUFFER_BIT,Y.NEAREST):Jt?Y.copyTexSubImage3D(Ve,Ge,tt,jt,tn+Yt,Ye,nt,ke,Fe):Y.copyTexSubImage2D(Ve,Ge,tt,jt,Ye,nt,ke,Fe);Re.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Re.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Jt?w.isDataTexture||w.isData3DTexture?Y.texSubImage3D(Ve,Ge,tt,jt,tn,ke,Fe,Ke,Qt,Xt,qt.data):$.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ve,Ge,tt,jt,tn,ke,Fe,Ke,Qt,qt.data):Y.texSubImage3D(Ve,Ge,tt,jt,tn,ke,Fe,Ke,Qt,Xt,qt):w.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Ge,tt,jt,ke,Fe,Qt,Xt,qt.data):w.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Ge,tt,jt,qt.width,qt.height,Qt,qt.data):Y.texSubImage2D(Y.TEXTURE_2D,Ge,tt,jt,ke,Fe,Qt,Xt,qt);Re.pixelStorei(Y.UNPACK_ROW_LENGTH,Pn),Re.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,At),Re.pixelStorei(Y.UNPACK_SKIP_PIXELS,xn),Re.pixelStorei(Y.UNPACK_SKIP_ROWS,$n),Re.pixelStorei(Y.UNPACK_SKIP_IMAGES,En),Ge===0&&$.generateMipmaps&&Y.generateMipmap(Ve),Re.unbindTexture()},this.initRenderTarget=function(w){O.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Re.unbindTexture()},this.resetState=function(){ie=0,ee=0,V=null,Re.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),i.unpackColorSpace=kt._getUnpackColorSpace()}}const Tv={type:"change"},fm={type:"start"},Ab={type:"end"},Bu=new fb,Av=new qs,UC=Math.cos(70*eT.DEG2RAD),jn=new se,Ri=2*Math.PI,fn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Kh=1e-6;class PC extends BT{constructor(e,i=null){super(e,i),this.state=fn.NONE,this.target=new se,this.cursor=new se,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bo.ROTATE,MIDDLE:Bo.DOLLY,RIGHT:Bo.PAN},this.touches={ONE:Fo.ROTATE,TWO:Fo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new se,this._lastQuaternion=new Js,this._lastTargetPosition=new se,this._quat=new Js().setFromUnitVectors(e.up,new se(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new J_,this._sphericalDelta=new J_,this._scale=1,this._panOffset=new se,this._rotateStart=new wt,this._rotateEnd=new wt,this._rotateDelta=new wt,this._panStart=new wt,this._panEnd=new wt,this._panDelta=new wt,this._dollyStart=new wt,this._dollyEnd=new wt,this._dollyDelta=new wt,this._dollyDirection=new se,this._mouse=new wt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=BC.bind(this),this._onPointerDown=FC.bind(this),this._onPointerUp=zC.bind(this),this._onContextMenu=YC.bind(this),this._onMouseWheel=kC.bind(this),this._onKeyDown=VC.bind(this),this._onTouchStart=jC.bind(this),this._onTouchMove=XC.bind(this),this._onMouseDown=GC.bind(this),this._onMouseMove=HC.bind(this),this._interceptControlDown=WC.bind(this),this._interceptControlUp=qC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tv),this.update(),this.state=fn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;jn.copy(i).sub(this.target),jn.applyQuaternion(this._quat),this._spherical.setFromVector3(jn),this.autoRotate&&this.state===fn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Ri:s>Math.PI&&(s-=Ri),l<-Math.PI?l+=Ri:l>Math.PI&&(l-=Ri),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(jn.setFromSpherical(this._spherical),jn.applyQuaternion(this._quatInverse),i.copy(this.target).add(jn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=jn.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new se(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new se(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=jn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Bu.origin.copy(this.object.position),Bu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Bu.direction))<UC?this.object.lookAt(this.target):(Av.setFromNormalAndCoplanarPoint(this.object.up,this.target),Bu.intersectPlane(Av,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Kh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Kh||this._lastTargetPosition.distanceToSquared(this.target)>Kh?(this.dispatchEvent(Tv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ri/60*this.autoRotateSpeed*e:Ri/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){jn.setFromMatrixColumn(i,0),jn.multiplyScalar(-e),this._panOffset.add(jn)}_panUp(e,i){this.screenSpacePanning===!0?jn.setFromMatrixColumn(i,1):(jn.setFromMatrixColumn(i,0),jn.crossVectors(this.object.up,jn)),jn.multiplyScalar(e),this._panOffset.add(jn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;jn.copy(l).sub(this.target);let c=jn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ri*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ri*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ri*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ri*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new wt,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function FC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function BC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function zC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ab),this.state=fn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function GC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Bo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=fn.DOLLY;break;case Bo.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=fn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=fn.ROTATE}break;case Bo.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=fn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=fn.PAN}break;default:this.state=fn.NONE}this.state!==fn.NONE&&this.dispatchEvent(fm)}function HC(r){switch(this.state){case fn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case fn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case fn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function kC(r){this.enabled===!1||this.enableZoom===!1||this.state!==fn.NONE||(r.preventDefault(),this.dispatchEvent(fm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ab))}function VC(r){this.enabled!==!1&&this._handleKeyDown(r)}function jC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Fo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=fn.TOUCH_ROTATE;break;case Fo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=fn.TOUCH_PAN;break;default:this.state=fn.NONE}break;case 2:switch(this.touches.TWO){case Fo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=fn.TOUCH_DOLLY_PAN;break;case Fo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=fn.TOUCH_DOLLY_ROTATE;break;default:this.state=fn.NONE}break;default:this.state=fn.NONE}this.state!==fn.NONE&&this.dispatchEvent(fm)}function XC(r){switch(this._trackPointer(r),this.state){case fn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case fn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case fn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case fn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=fn.NONE}}function YC(r){this.enabled!==!1&&r.preventDefault()}function WC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wb=({imageSrc:r,height:e=200})=>{const i=we.useRef(null);return we.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new pT,c=75,f=s.clientWidth/s.clientHeight,h=new ia(c,f,.1,1100);h.position.set(0,0,.1);const m=new IC({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new PC(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const _=new UT;let x=null;_.load(r,E=>{E.mapping=ku,E.colorSpace=Vi;const N=new cm(500,60,40);N.scale(-1,1,1);const I=new lm({map:E});x=new Pa(N,I),l.add(x)});let g=c;const b=E=>{E.preventDefault();const N=E.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",b,{passive:!1});const M=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});M.observe(s);let R=null;const S=()=>{R=requestAnimationFrame(S),p.update(),m.render(l,h)};return S(),()=>{cancelAnimationFrame(R),M.disconnect(),s.removeEventListener("wheel",b),x&&(x.geometry.dispose(),x.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),v.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})};function $C({step2Ref:r,currentStep:e,isAnalyzing:i,inputMode:s,setInputMode:l,targetDate:c,setTargetDate:f,categories:h,toggleCategory:m,manualTopic:p,setManualTopic:_,bg360Image:x,bg360Enabled:g,setBg360Enabled:b,bg360Analysis:M,is360Analyzing:R,customLocation:S,setCustomLocation:E,customOutfit:N,setCustomOutfit:I,punchlineType:U,setPunchlineType:k,isSearching:L,generateScenarioFromNews:B,scenarioThought:A,scenario:F,setScenario:j,isScenarioCopied:G,setIsScenarioCopied:q,originalScenario:ie,isEnhancePanelOpen:ee,setIsEnhancePanelOpen:V,enhanceExpressions:D,setEnhanceExpressions:z,enhanceBodyLang:K,setEnhanceBodyLang:ue,enhanceEffects:ge,setEnhanceEffects:P,enhanceBackgrounds:Z,setEnhanceBackgrounds:_e,enhanceCameraWork:Ae,setEnhanceCameraWork:Oe,enhanceDialogue:te,setEnhanceDialogue:be,isEnhancing:Ee,enhanceScenario:He,revertScenario:qe,enhanceLog:Qe,showStatus:vt}){return v.jsxs("section",{ref:r,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
        ${e===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
        ${e>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(e<2||i)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),v.jsx("div",{className:"flex items-center justify-between",children:v.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${e===2?"text-purple-400":"text-slate-500"} `,children:[v.jsx(LE,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),v.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[v.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[v.jsxs("button",{onClick:()=>l("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[v.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),v.jsxs("button",{onClick:()=>l("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[v.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),s==="news"?v.jsxs("div",{className:"space-y-4",children:[v.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[v.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),v.jsx("input",{type:"date",value:c,onChange:Xe=>f(Xe.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),v.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[v.jsx("div",{className:"col-span-2 lg:col-span-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),h.map(Xe=>v.jsxs("label",{className:`
                    relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5
                    ${Xe.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
                  `,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Xe.checked,onChange:()=>m(Xe.id)}),Xe.checked&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-2 ${Xe.checked?"scale-110":"opacity-70 grayscale"} `,children:Xe.icon}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:Xe.label})]})]},Xe.id))]}),v.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",h.filter(Xe=>Xe.checked).map(Xe=>Xe.keywords).join(" ")||"なし"," (対象日付: ",c,")"]})]}):v.jsxs("div",{className:"space-y-2",children:[v.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",v.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),v.jsx("textarea",{value:p,onChange:Xe=>_(Xe.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),v.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[v.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${x&&g?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[v.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:x&&g?"#67e8f9":"#ffffff"},children:[v.jsx(Wl,{size:14}),x&&g?"🌐 360°背景 (ON)":"指定場所 (Location Override)",v.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[R&&v.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[v.jsx(ji,{size:10,className:"animate-spin"})," 解析中..."]}),x&&v.jsx("button",{onClick:Xe=>{Xe.preventDefault(),b(!g),vt(g?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${g?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:g?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:g?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!x&&v.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),x&&g?v.jsxs("div",{className:"space-y-2",children:[v.jsx(wb,{imageSrc:x,height:160}),M&&v.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[v.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",M.location]}),v.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",M.lighting]}),v.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:M.spatialType==="indoor"?"🏠 室内":M.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),M.mood&&v.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",M.mood]})]}),v.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):v.jsx("input",{type:"text",value:S,onChange:Xe=>E(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),v.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[v.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[v.jsx(Nv,{size:14})," 指定服装 (Outfit Override) ",v.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),v.jsx("input",{type:"text",value:N,onChange:Xe=>I(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),v.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[v.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[v.jsx("span",{children:"🎬"})," オチ・ディレクター ",v.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),v.jsxs("select",{value:U,onChange:Xe=>k(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[v.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),v.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),v.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),v.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),v.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),v.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),v.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),v.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),v.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),v.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),v.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),v.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),v.jsx("button",{onClick:B,disabled:L||e<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:L?v.jsxs(v.Fragment,{children:[v.jsx(ji,{size:24,className:"animate-spin"}),v.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):v.jsxs(v.Fragment,{children:[v.jsx($u,{size:24,className:"fill-yellow-400 text-black"}),v.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),v.jsx(jl,{size:24,className:"opacity-60"})]})})]}),v.jsxs("div",{className:"space-y-4 mt-6",children:[A&&v.jsx("div",{className:"mt-4",children:v.jsx(Zu,{thought:A})}),v.jsxs("div",{className:"flex flex-col gap-2",children:[v.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),v.jsx("textarea",{value:F,onChange:Xe=>j(Xe.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),v.jsx("div",{className:"mt-2 relative z-50",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(F),q(!0),setTimeout(()=>q(!1),2e3)},disabled:!F,className:`w-full ${G?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[G?v.jsx(ki,{size:20}):v.jsx(Yl,{size:20}),G?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),v.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${F&&F.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[v.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>F&&F.length>20&&V(!ee),children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-base",children:"🔥"}),v.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),v.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),ie&&v.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:F&&F.length>20?ee?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),v.jsx(Rv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${ee?"rotate-180":""}`})]})]}),ee&&F&&F.length>20&&v.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[v.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",v.jsx("br",{}),v.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),v.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),v.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${D?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:D,onChange:()=>z(!D)}),D&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${D?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${K?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:K,onChange:()=>ue(!K)}),K&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${K?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ge?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:ge,onChange:()=>P(!ge)}),ge&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${ge?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Z?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Z,onChange:()=>_e(!Z)}),Z&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${Z?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ae?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:Ae,onChange:()=>Oe(!Ae)}),Ae&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${Ae?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),v.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${te?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[v.jsx("input",{type:"checkbox",className:"hidden",checked:te,onChange:()=>be(!te)}),te&&v.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:v.jsx(ki,{size:12,strokeWidth:4})}),v.jsxs("div",{className:"text-center",children:[v.jsx("div",{className:`text-2xl mb-1 ${te?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),v.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),v.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),v.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[D&&"表情",K&&"身体",ge&&"演出",Z&&"背景",Ae&&"カメラ",te&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),v.jsxs("div",{className:"flex gap-2",children:[v.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:He,disabled:Ee||!(D||K||ge||Z||Ae||te),children:Ee?v.jsxs(v.Fragment,{children:[v.jsx(ji,{size:16,className:"animate-spin"})," 強化中..."]}):v.jsxs(v.Fragment,{children:[v.jsx($u,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),v.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${ie?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:qe,disabled:Ee||!ie,children:"↩️ 強化前に戻す"})]}),v.jsx(Zu,{thought:Qe||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})}function KC({step3Ref:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,is360CameraWorking:c,assemblePrompt:f,isAssembling:h}){return v.jsxs("section",{ref:r,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
        ${e===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
        ${e>3?"border border-orange-500/30 opacity-100":""}
      `,children:[(e<3||i||s||l||c)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:c&&e>=3&&v.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[v.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),v.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),v.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),v.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${e===3?"text-orange-400":"text-slate-500"}`,children:[v.jsx(Qh,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),v.jsx("button",{onClick:f,disabled:h||c,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
          ${e===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
        `,children:h?v.jsxs(v.Fragment,{children:[v.jsx(ji,{size:24,className:"animate-spin"}),v.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):v.jsxs(v.Fragment,{children:[v.jsx(Qh,{size:24,className:`text-blue-600 ${e===3?"animate-bounce":""} `}),v.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),v.jsx(jl,{size:24,className:"opacity-60"})]})})]})}function ZC({outputRef:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,finalPrompt:c,copyPrompt:f,assembleThought:h,enableChatGPTMode:m,selectedEngine:p,bg360Image:_,bg360Analysis:x,bg360Enabled:g,bg360CameraWork:b,bg360CroppedPanels:M,isCopied:R,isMetaSaved:S,setIsMetaSaved:E,castList:N,scenario:I,punchlineType:U,colorMode:k,enhanceExpressions:L,enhanceBodyLang:B,enhanceEffects:A,enhanceBackgrounds:F,enhanceCameraWork:j,enhanceDialogue:G,SYSTEM_VERSION:q,isAssembling:ie,regenerateImage:ee,isGeneratingImage:V,isFixPromptCopied:D,setIsFixPromptCopied:z,isPolicyPanelOpen:K,setIsPolicyPanelOpen:ue,isPolicyCopied:ge,setIsPolicyCopied:P,policyErrorMsg:Z,setPolicyErrorMsg:_e,regenerateSafePrompt:Ae,isFixingPolicy:Oe,policyFixLog:te,genLogRef:be,genLog:Ee,imageResultRef:He,generatedImage:qe,isFullAutoMode:Qe,fullAutoStep:vt,mangaTitle:Xe,isFallbackUsed:pt,enableOpenAIApi:Nt,setGeneratedImage:ct,generationHistory:Rt,setGenerationHistory:zt}){return v.jsxs("div",{ref:r,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(e<3||i||s||l)&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),v.jsxs("section",{className:"relative group h-full",children:[v.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),v.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[v.jsx("div",{className:"flex items-center justify-between mb-4",children:v.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[v.jsx("button",{onClick:f,disabled:!c,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:v.jsx(Yl,{size:14})}),v.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),v.jsx(Zu,{thought:h,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),v.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[v.jsx("div",{className:"relative flex-1",children:v.jsx("textarea",{value:c,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),v.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[_&&x&&g&&c&&v.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[v.jsx("div",{className:"flex items-start gap-4",children:v.jsxs("div",{className:"flex-1 space-y-1",children:[v.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[v.jsx(Wl,{size:12})," 🌐 360°背景モード (ON)"]}),v.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",v.jsx("br",{}),v.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),v.jsx("br",{}),v.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),v.jsx("br",{}),v.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),v.jsx(wb,{imageSrc:_,height:120}),v.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),b&&M&&M.length===4&&v.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[v.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),v.jsx("div",{className:"grid grid-cols-4 gap-2",children:b.panels.map(($e,Y)=>{const ut=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round(($e.yaw%360+360)%360/45)%8];return v.jsxs("div",{className:"relative",children:[v.jsx("img",{src:M[Y],alt:`Panel ${$e.panel} - ${ut}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),v.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[v.jsxs("span",{className:"font-bold",children:["コマ",$e.panel]})," ",ut," ",v.jsxs("span",{className:"text-slate-400",children:["FOV",$e.fov,"°"]})]})]},Y)})}),v.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),v.jsxs("button",{onClick:f,disabled:!c,className:`w-full ${R?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[R?v.jsx(ki,{size:20}):v.jsx(Yl,{size:20}),R?"コピー完了":p==="openai"?_&&g?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":_&&g?m?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":m?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),v.jsxs("button",{onClick:()=>{const $e=new Date,Y=p==="openai"?"ChatGPT Engine (自動)":m?"ChatGPT専用プロンプト":"Gemini用プロンプト",Et={ファイル情報:{フォーマットバージョン:1,アプリバージョン:q,保存日時:$e.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:$e.toISOString()},プロンプト判別:{モード:Y,AIエンジン:p==="openai"?"ChatGPT":"Gemini",ChatGPTモード:m,説明:p==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":m?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:N||"(未解析)",シナリオ:I||"(未生成)",最終プロンプト:c||"(未生成)",生成設定:{パンチラインタイプ:U,カラーモード:k,強化オプション:{表情強化:L,ボディランゲージ強化:B,"照明・演出強化":A,背景強化:F,カメラワーク強化:j,"セリフ・ギャグ強化":G},"360度背景":{画像読込:!!_,有効:g,場所:x?.location||"(未解析)",空間タイプ:x?.spatialType||"(未解析)",光源:x?.lighting||"(未解析)"}}},ut=JSON.stringify(Et,null,2),Gt=new Blob([ut],{type:"application/json;charset=utf-8"}),Re=URL.createObjectURL(Gt),Vt=document.createElement("a");Vt.href=Re;const O=I?.match(/タイトル[:：]\s*(.+)/),T=O?O[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",J=`${String($e.getFullYear()).slice(-2)}${String($e.getMonth()+1).padStart(2,"0")}${String($e.getDate()).padStart(2,"0")}${String($e.getHours()).padStart(2,"0")}${String($e.getMinutes()).padStart(2,"0")}${String($e.getSeconds()).padStart(2,"0")}`;Vt.download=`AI_4-koma_metadata_${T}_${J}.json`,document.body.appendChild(Vt),Vt.click(),document.body.removeChild(Vt),URL.revokeObjectURL(Re),E(!0),setTimeout(()=>E(!1),2500)},disabled:!c,className:`w-full ${S?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${S?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${S?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[S?v.jsx(ki,{size:16}):v.jsx(Jx,{size:16}),S?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),v.jsxs("div",{className:"relative mt-2",children:[!ie&&!c&&v.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),v.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",v.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),v.jsxs("button",{onClick:ee,disabled:!c||V,className:`w-full ${p==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[V?v.jsx(ji,{size:20,className:"animate-spin"}):v.jsx(Zh,{size:20}),v.jsx("div",{className:"flex flex-col items-center",children:v.jsx("span",{children:V?"再生成中...":`画像を生成する (STEP 4: ${p==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),v.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",v.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",v.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),v.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:v.jsxs("div",{className:"flex items-start gap-2",children:[v.jsx("div",{className:"mt-0.5 text-orange-400",children:v.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[v.jsx("circle",{cx:"12",cy:"12",r:"10"}),v.jsx("path",{d:"M12 16v-4"}),v.jsx("path",{d:"M12 8h.01"})]})}),v.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[v.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),v.jsx("br",{}),p==="openai"?v.jsxs(v.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",v.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",v.jsxs("strong",{children:["「元となるキャラシート画像",_&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",v.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",v.jsx("br",{}),v.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",v.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):v.jsxs(v.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",v.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",v.jsxs("strong",{children:["「元となるキャラシート画像",_&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",v.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),p==="openai"&&v.jsx("div",{className:"mt-3 block w-full",children:v.jsxs("button",{className:`mt-2 ${D?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const $e=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
No explanations. No partial results.`;navigator.clipboard.writeText($e),z(!0),setTimeout(()=>z(!1),2e3)},children:[v.jsx("span",{style:{visibility:D?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),D&&v.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),v.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${c?"":"opacity-40 pointer-events-none"}`,children:[v.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>ue(!K),disabled:!c,children:[v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-base",children:"🛡️"}),v.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!c&&v.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:K?"クリックで閉じる":"クリックで開く"}),v.jsx(Rv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${K?"rotate-180":""}`})]})]}),K&&v.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[v.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[v.jsxs("p",{children:["下の",v.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),v.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",v.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),v.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),v.jsxs("button",{className:`${ge?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),P(!0),setTimeout(()=>P(!1),2e3)},children:[v.jsx("span",{style:{visibility:ge?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),ge&&v.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),v.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Z,onChange:$e=>_e($e.target.value),placeholder:p==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),v.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ae,disabled:Oe||!Z.trim()||!c,children:Oe?v.jsxs(v.Fragment,{children:[v.jsx(ji,{size:16,className:"animate-spin"})," 分析・修正中..."]}):v.jsxs(v.Fragment,{children:[v.jsx(Qh,{size:16})," 配慮版プロンプトを再生成する"]})}),v.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:te||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),v.jsxs("div",{ref:be,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[v.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[v.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),v.jsx("span",{className:p==="openai"?"text-emerald-500":"text-blue-500",children:p==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),Ee.length===0?v.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):Ee.map(($e,Y)=>v.jsxs("div",{className:"mb-1 leading-relaxed",children:[v.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),$e]},Y)),V&&v.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),v.jsxs("section",{ref:He,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!qe&&!V||i||ie||l||Qe&&vt>0&&vt<4)&&!V&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(i||ie||l||Qe&&vt>0&&vt<4)&&v.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[v.jsx(ji,{size:36,className:"animate-spin text-blue-500"}),v.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:i||ie?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),V&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:v.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[v.jsx(ji,{size:64,className:"animate-spin text-blue-500 mx-auto"}),v.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),v.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[v.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",v.jsxs("span",{className:"flex space-x-1",children:[v.jsx("span",{className:"animate-bounce delay-75",children:"."}),v.jsx("span",{className:"animate-bounce delay-150",children:"."}),v.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),v.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",v.jsx("br",{}),v.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",v.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),v.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:Xe?v.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:Xe}):v.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),v.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:qe?v.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[v.jsx("img",{src:qe,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),pt&&v.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:v.jsxs("div",{className:"flex items-start gap-3",children:[v.jsx(Ov,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),v.jsxs("div",{className:"text-sm",children:[v.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),v.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",v.jsx("br",{}),v.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),v.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[v.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),v.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[v.jsxs("li",{children:["画面左側の「",v.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),v.jsxs("li",{children:[v.jsx("a",{href:Nt?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:Nt?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),v.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),v.jsxs("div",{className:"w-full px-8 mt-2",children:[v.jsxs("button",{onClick:()=>{const $e=document.createElement("a");$e.href=qe,$e.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild($e),$e.click(),document.body.removeChild($e)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[v.jsx(Jx,{size:20})," 画像をダウンロード (.png)"]}),v.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):v.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[v.jsx(qp,{size:80,className:"mx-auto"}),v.jsxs("div",{className:"space-y-2 text-center",children:[v.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),v.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),Rt.length>0&&v.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(i||ie||V||l||Qe&&vt>0&&vt<4)&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:v.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[v.jsx(ji,{size:12,className:"animate-spin"})," 生成中..."]})}),v.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[v.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[v.jsx(Zh,{size:14,className:"text-blue-400"}),"生成履歴 (",Rt.length,")"]}),v.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(zt([]),ct(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[v.jsx(ql,{size:12})," 全削除"]})]}),v.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:Rt.map($e=>v.jsxs("div",{onClick:()=>ct($e.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${qe===$e.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[v.jsx("img",{src:$e.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),qe===$e.img&&v.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:v.jsx(Tr,{size:10,strokeWidth:3})}),v.jsx("div",{onClick:Y=>{Y.stopPropagation(),zt(Et=>Et.filter(ut=>ut.id!==$e.id)),qe===$e.img&&ct("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:v.jsx(ql,{size:10})})]},$e.id))})]})]})}function QC({currentStep:r,apiKey:e,isEndlessMode:i,setIsEndlessMode:s,isEndlessModeRef:l,isAborting:c,handleFullAutoToggle:f,isFullAutoMode:h,selectedEngine:m,enableOpenAIApi:p,isPolicyCopied:_,setIsPolicyCopied:x,showStatus:g}){return v.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[v.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[v.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${e?"opacity-100":"opacity-30"}`,children:[v.jsxs("div",{className:`flex items-center gap-1.5 ${r>=1?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${r===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":r>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:r>1?v.jsx(Tr,{size:16}):"1"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),v.jsx(jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${r>=2?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${r===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":r>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:r>2?v.jsx(Tr,{size:16}):"2"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),v.jsx(jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${r>=3?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${r===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":r>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:r>3?v.jsx(Tr,{size:16}):"3"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),v.jsx(jl,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),v.jsxs("div",{className:`flex items-center gap-1.5 ${r>=4?"opacity-100":"opacity-40"}`,children:[v.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${r===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":r>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:r>4?v.jsx(Tr,{size:16}):"4"}),v.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),v.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),v.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[v.jsxs("button",{disabled:!e||c,onClick:()=>{const b=!i;s(b),l&&(l.current=b)},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:i?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${i?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[v.jsx(Cv,{size:14,className:i?"animate-spin":"",style:{animationDuration:"3s"}}),v.jsx("span",{className:"whitespace-nowrap",children:i?"無限ループ設定 解除":"無限ループ設定 ON"})]}),v.jsxs("button",{disabled:!e||c,onClick:f,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:h?c?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${h?c?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!e&&!c?"opacity-50 cursor-not-allowed":""}`,children:[h?c?v.jsx(ji,{size:14,className:"animate-spin"}):v.jsx(jE,{size:14,fill:"currentColor"}):v.jsx($u,{size:14}),h?c?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),v.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),v.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${e?"text-slate-400":"text-slate-600 opacity-40"}`,children:[v.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),v.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),v.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(m==="openai"||p)&&v.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:v.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- ANTI-GLITTER & ANTI-NOISE PROTOCOL:
  * ABSOLUTELY NO ChatGPT-style magical floating particles, NO glittering/sparkling effects, NO dust motes, NO lens flares, NO moiré patterns. Keep the air completely clean and empty.
  * ZERO NOISE TOLERANCE: The final image MUST be completely free of visual noise, grain, micro-texture artifacts, dithering patterns, and any speckle-like artifacts. Every surface must be CLEAN and SMOOTH.
  * NO MICRO-DETAIL CLUTTER: Do NOT fill empty areas with random tiny dots, scratches, dust particles, or halftone-like noise patterns. Clean color fills and smooth gradients ONLY.
  * NO OVER-RENDERING: Do NOT apply photorealistic texture rendering (cloth weave, skin pores, hair strand noise) to anime-style characters. Keep surfaces FLAT and CLEAN as in professional TV anime cel-shading.

[ 5. ART STYLE & VISUAL FIDELITY ]
- RENDER: High-budget Japanese TV anime feature film quality. Clean cel-shading with rich color depth, sharp ink contour lines, smooth gradients. NO photorealistic texturing, NO film grain, NO noise.
- POSITIVE SAFE RENDERING STYLE: Clean anime illustration finish, smooth cel shading, soft clean shading, smooth gradients, clean color surfaces, low texture density, refined but not overly detailed material response, controlled exposure, soft diffused lighting, no visible grain, no speckled texture, no pointillism, no stippling, no dithering, no halftone dots, no noisy particles, no glitter dust, no gritty film grain, no rough paper texture, no canvas grain, no over-sharpened details.
- BANNED PROMPT WORD COMBINATIONS — NEVER USE THESE:
  * Do NOT combine: ultra-detailed + film grain + cinematic
  * Do NOT combine: realistic texture + micro details
  * Do NOT combine: magical particles + glowing dust
  * Do NOT combine: high contrast + sharp details (use clean contrast + smooth edges instead)
  * Do NOT combine: illustrative realism + gritty texture
  * Do NOT use: paper grain, canvas texture, rough texture, grainy texture, overly crisp
- LINE WEIGHT HIERARCHY: Foreground characters get 3px bold ink outlines. Background objects get 1px thin lines. This creates instant visual depth.
- CHARACTER SEPARATION: Add a subtle 2-3px white glow (compositing rim) outside the character's outline to prevent blending with the background. Characters MUST have higher saturation and contrast than their environment.
- HAIR: Must show a glossy anime-style shine band (angel ring / tenshi no wa). Individual strand detail at edges.
- SKIN: Warm subsurface scattering hint on lit areas. Clean shadows with slight color shift (warm light = cool shadow, cool light = warm shadow).
- THINGS TO AVOID:
  * No floating close-up eyes or ghostly face overlays in backgrounds.
  * No character sheet layout, expression grid, or reference sheet appearance.
  * No extra characters beyond those specified.
  * No sparkling light particles, no glowing dust, no magical particles, no floating embers, no volumetric dust.
  * No film grain, paper grain, canvas texture, or rough textures.

[ 6. TEXT & OUTPUT RULES ]
- If speech bubbles or text are drawn, ALL text MUST be vertical Japanese. ZERO horizontal text.
- Do not add random background text, floating letters, or unnecessary sound effects unless the scene demands it.
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),x(!0),setTimeout(()=>x(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${_?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[v.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[_?v.jsx(Tr,{size:16}):v.jsx(Yl,{size:16}),v.jsx("span",{className:"whitespace-nowrap",children:_?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),v.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),v.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:v.jsx("div",{className:`h-full transition-all duration-700 ease-out
          ${r===1?"w-1/4 bg-blue-500":r===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":r===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":r>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
        `})})]})}function JC({SYSTEM_VERSION:r,apiKey:e,selectedEngine:i,partialReset:s,hardReset:l,usedModel:c,getModelBadgeInfo:f}){return v.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[v.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),v.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:v.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:v.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[v.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[v.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:v.jsx(qp,{size:28,className:"text-white"})}),v.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",v.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",v.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:r})]})]}),v.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[v.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),v.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${e?i==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[v.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${e?i==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),e?i==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),e&&v.jsxs("div",{className:"flex items-center gap-2",children:[v.jsxs("button",{onClick:s,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[v.jsx(Cv,{size:12})," シナリオから再生成"]}),v.jsxs("button",{onClick:l,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[v.jsx(BE,{size:12})," エンジン変更・全リセット"]})]})]}),c&&(()=>{const h=f(c);return h?v.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${h.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[v.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:h.label}),v.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),v.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:h.desc}),v.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[v.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),v.jsxs("p",{children:["現在 ",v.jsx("span",{className:"font-mono text-blue-300",children:c})," を使用中。"]}),h.tier==="Lite"&&v.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[v.jsx(Ov,{size:10,className:"absolute top-2 right-2"}),v.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]})}function e2({scenario:r,bg360Image:e,bg360Analysis:i,bg360Enabled:s,customLocation:l,customOutfit:c,punchlineType:f,getPunchlineLabel:h}){return v.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
      ${r?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
    `,children:[v.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[v.jsx(Nv,{size:14})," ",e?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),v.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",v.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",v.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",v.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const m=r?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",p=r?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",_=r?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",x=!!e&&!!i&&s,g=x?"背景 (Background)":"場所 (Location)",b=x?m||i?.location||"360°画像":m||l.trim()||"AIおまかせ",M=x?"画像解析":l.trim()?"手入力":"AIおまかせ",R=x?"#67e8f9":l.trim()?"#ffffff":"#93c5fd",S=x?"rgba(6,182,212,0.3)":l.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",E=x?"#67e8f9":l.trim()?"#d1d5db":"#93c5fd",N=x?"rgba(6,182,212,0.4)":l.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return v.jsxs(v.Fragment,{children:[v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[x?v.jsx(Wl,{size:12,className:"text-cyan-400"}):v.jsx(Wl,{size:12,className:"text-blue-400"}),v.jsxs("span",{children:[g,":"]}),v.jsx("span",{style:{fontWeight:"bold",color:R},children:b}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:S,color:E,border:`1px solid ${N}`},children:M})]}),v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[v.jsx("span",{className:"text-green-400",children:"👕"}),v.jsx("span",{children:"服装 (Outfit):"}),v.jsx("span",{style:{fontWeight:"bold",color:c.trim()?"#ffffff":"#93c5fd"},children:p||c.trim()||"AIおまかせ"}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:c.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:c.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${c.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:c.trim()?"手入力":"AIおまかせ"})]}),v.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[v.jsx("span",{className:"text-yellow-400",children:"🎬"}),v.jsx("span",{children:"オチ (Punchline):"}),v.jsx("span",{style:{fontWeight:"bold",color:_||f!=="Auto"?"#ffffff":"#93c5fd"},children:_||(f==="Auto"?"AIおまかせ":h(f))}),v.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:f!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:f!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${f!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:f!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]})}function t2({generationHistory:r,setGenerationHistory:e,generatedImage:i,setGeneratedImage:s,isSearching:l,isAssembling:c,isGeneratingImage:f,isEnhancing:h,isFullAutoMode:m,fullAutoStep:p}){if(r.length===0)return null;const _=l||c||f||h||m&&p>0&&p<4;return v.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[_&&v.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:v.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[v.jsx(ji,{size:12,className:"animate-spin"})," 生成中..."]})}),v.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[v.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[v.jsx(Zh,{size:14,className:"text-blue-400"}),"生成履歴 (",r.length,")"]}),v.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(e([]),s(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[v.jsx(ql,{size:12})," 全削除"]})]}),v.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:r.map(x=>v.jsxs("div",{onClick:()=>s(x.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${i===x.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[v.jsx("img",{src:x.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),i===x.img&&v.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:v.jsx(Tr,{size:10,strokeWidth:3})}),v.jsx("div",{onClick:g=>{g.stopPropagation(),e(b=>b.filter(M=>M.id!==x.id)),i===x.img&&s("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:v.jsx(ql,{size:10})})]},x.id))})]})}console.log("HELLO_USER_FIXED_VERSION_2_25");function n2(){const{analyzeThought:r,apiKey:e,assemblePrompt:i,assembleThought:s,bg360Analysis:l,bg360CameraWork:c,bg360CroppedPanels:f,bg360Enabled:h,bg360Image:m,castList:p,categories:_,colorMode:x,copyPrompt:g,currentStep:b,customLocation:M,customOutfit:R,enableChatGPTMode:S,enableOpenAIApi:E,enhanceBackgrounds:N,enhanceBodyLang:I,enhanceCameraWork:U,enhanceDialogue:k,enhanceEffects:L,enhanceExpressions:B,enhanceLog:A,enhanceScenario:F,finalPrompt:j,fullAutoStep:G,genLog:q,genLogRef:ie,generateScenarioFromNews:ee,generatedImage:V,generationHistory:D,handleFullAutoToggle:z,handleSetKey:K,hardReset:ue,imageResultRef:ge,images:P,inputMode:Z,is360Analyzing:_e,is360CameraWorking:Ae,isAborting:Oe,isAnalyzing:te,isAssembling:be,isCastListCopied:Ee,isCopied:He,isDragging:qe,isEndlessMode:Qe,isEndlessModeRef:vt,isEnhancePanelOpen:Xe,isEnhancing:pt,isFallbackUsed:Nt,isFixPromptCopied:ct,isFixingPolicy:Rt,isFullAutoMode:zt,isGeneratingImage:$e,isMetaSaved:Y,isPolicyCopied:Et,isPolicyPanelOpen:ut,isScenarioCopied:Gt,isSearching:Re,mangaTitle:Vt,manualTopic:O,originalScenario:T,outputRef:J,partialReset:he,policyErrorMsg:Me,policyFixLog:Ne,processFiles:Pe,punchlineType:fe,regenerateImage:me,regenerateSafePrompt:De,revertScenario:Be,scenario:Le,scenarioThought:Ie,selectedEngine:it,setBg360Enabled:rt,setCastList:mt,setCustomLocation:X,setCustomOutfit:Ce,setEnableOpenAIApi:pe,setEnhanceBackgrounds:ze,setEnhanceBodyLang:Ue,setEnhanceCameraWork:Se,setEnhanceDialogue:We,setEnhanceEffects:at,setEnhanceExpressions:hn,setGeneratedImage:Ct,setGenerationHistory:qn,setImages:Un,setInputMode:ra,setIsCastListCopied:Cn,setIsDragging:za,setIsEndlessMode:oa,setIsEnhancePanelOpen:Mn,setIsFixPromptCopied:nn,setIsMetaSaved:yn,setIsPolicyCopied:ri,setIsPolicyPanelOpen:pn,setIsScenarioCopied:ba,setManualTopic:ya,setPolicyErrorMsg:Ga,setPunchlineType:la,setScenario:ms,setShowOpenAIKeyModal:xi,setTargetDate:Oi,showModal:ca,showOpenAIKeyModal:_i,showStatus:mn,status:ua,step2Ref:w,step3Ref:$,targetDate:re,toggleCategory:ne,usedModel:ae}=mM();return v.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[v.jsx(M_,{isOpen:ca,onSave:K,provider:"google"}),v.jsx(M_,{isOpen:_i,onSave:Ge=>{const ke=Ge.trim(),Fe=Ku();ke===""&&Fe?(pe(!0),mn("🔑 既存のOpenAI APIキーを適用しました。"),xi(!1)):ke.startsWith("sk-")?(Jh(ke),pe(!0),mn("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),xi(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{xi(!1),Ku()||pe(!1)},provider:"openai"}),v.jsx(QC,{currentStep:b,apiKey:e,isEndlessMode:Qe,setIsEndlessMode:oa,isEndlessModeRef:vt,isAborting:Oe,handleFullAutoToggle:z,isFullAutoMode:zt,selectedEngine:it,enableOpenAIApi:E,isPolicyCopied:Et,setIsPolicyCopied:ri,showStatus:mn}),v.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[v.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),v.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),v.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[v.jsx(JC,{SYSTEM_VERSION:$l,apiKey:e,selectedEngine:it,partialReset:he,hardReset:ue,usedModel:ae,getModelBadgeInfo:KE}),v.jsxs("main",{className:"space-y-8",style:{filter:e?"none":"blur(10px)",pointerEvents:e?"auto":"none",transition:"filter 0.5s ease"},children:[v.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[v.jsx(gM,{isDragging:qe,setIsDragging:za,apiKey:e,processFiles:Pe,currentStep:b,isAnalyzing:te,images:P,setImages:Un,bg360Image:m,bg360Enabled:h,analyzeThought:r,castList:p,setCastList:mt,isCastListCopied:Ee,setIsCastListCopied:Cn}),v.jsx($C,{step2Ref:w,currentStep:b,isAnalyzing:te,inputMode:Z,setInputMode:ra,targetDate:re,setTargetDate:Oi,categories:_,toggleCategory:ne,manualTopic:O,setManualTopic:ya,bg360Image:m,bg360Enabled:h,setBg360Enabled:rt,bg360Analysis:l,is360Analyzing:_e,customLocation:M,setCustomLocation:X,customOutfit:R,setCustomOutfit:Ce,punchlineType:fe,setPunchlineType:la,isSearching:Re,generateScenarioFromNews:ee,scenarioThought:Ie,scenario:Le,setScenario:ms,isScenarioCopied:Gt,setIsScenarioCopied:ba,originalScenario:T,isEnhancePanelOpen:Xe,setIsEnhancePanelOpen:Mn,enhanceExpressions:B,setEnhanceExpressions:hn,enhanceBodyLang:I,setEnhanceBodyLang:Ue,enhanceEffects:L,setEnhanceEffects:at,enhanceBackgrounds:N,setEnhanceBackgrounds:ze,enhanceCameraWork:U,setEnhanceCameraWork:Se,enhanceDialogue:k,setEnhanceDialogue:We,isEnhancing:pt,enhanceScenario:F,revertScenario:Be,enhanceLog:A,showStatus:mn})]}),v.jsx(e2,{scenario:Le,bg360Image:m,bg360Analysis:l,bg360Enabled:h,customLocation:M,customOutfit:R,punchlineType:fe,getPunchlineLabel:Lv}),v.jsx(KC,{step3Ref:$,currentStep:b,isSearching:Re,isAnalyzing:te,isEnhancing:pt,is360CameraWorking:Ae,assemblePrompt:i,isAssembling:be}),v.jsx(ZC,{outputRef:J,currentStep:b,isSearching:Re,isAnalyzing:te,isEnhancing:pt,finalPrompt:j,copyPrompt:g,assembleThought:s,enableChatGPTMode:S,selectedEngine:it,bg360Image:m,bg360Analysis:l,bg360Enabled:h,bg360CameraWork:c,bg360CroppedPanels:f,isCopied:He,isMetaSaved:Y,setIsMetaSaved:yn,castList:p,scenario:Le,punchlineType:fe,colorMode:x,enhanceExpressions:B,enhanceBodyLang:I,enhanceEffects:L,enhanceBackgrounds:N,enhanceCameraWork:U,enhanceDialogue:k,SYSTEM_VERSION:$l,isAssembling:be,regenerateImage:me,isGeneratingImage:$e,isFixPromptCopied:ct,setIsFixPromptCopied:nn,isPolicyPanelOpen:ut,setIsPolicyPanelOpen:pn,isPolicyCopied:Et,setIsPolicyCopied:ri,policyErrorMsg:Me,setPolicyErrorMsg:Ga,regenerateSafePrompt:De,isFixingPolicy:Rt,policyFixLog:Ne,genLogRef:ie,genLog:q,imageResultRef:ge,generatedImage:V,isFullAutoMode:zt,fullAutoStep:G,mangaTitle:Vt,isFallbackUsed:Nt,enableOpenAIApi:E,setGeneratedImage:Ct,generationHistory:D,setGenerationHistory:qn}),v.jsx(t2,{generationHistory:D,setGenerationHistory:qn,generatedImage:V,setGeneratedImage:Ct,isSearching:Re,isAssembling:be,isGeneratingImage:$e,isEnhancing:pt,isFullAutoMode:zt,fullAutoStep:G})]}),v.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",v.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),ua&&v.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[v.jsx(ki,{size:18,className:"text-green-600"})," ",ua]}),v.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function i2(){return v.jsx(kv,{children:v.jsx(n2,{})})}xE.createRoot(document.getElementById("root")).render(v.jsx(we.StrictMode,{children:v.jsx(kv,{children:v.jsx(i2,{})})}));
