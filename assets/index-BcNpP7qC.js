(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function uS(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var vh={exports:{}},Fl={};var Kx;function fS(){if(Kx)return Fl;Kx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var u=null;if(c!==void 0&&(u=""+c),l.key!==void 0&&(u=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:u,ref:l!==void 0?l:null,props:c}}return Fl.Fragment=e,Fl.jsx=i,Fl.jsxs=i,Fl}var Zx;function dS(){return Zx||(Zx=1,vh.exports=fS()),vh.exports}var _=dS(),bh={exports:{}},bt={};var Qx;function hS(){if(Qx)return bt;Qx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function b(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,S={};function y(P,Z,_e){this.props=P,this.context=Z,this.refs=S,this.updater=_e||M}y.prototype.isReactComponent={},y.prototype.setState=function(P,Z){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Z,"setState")},y.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function R(){}R.prototype=y.prototype;function O(P,Z,_e){this.props=P,this.context=Z,this.refs=S,this.updater=_e||M}var U=O.prototype=new R;U.constructor=O,A(U,y.prototype),U.isPureReactComponent=!0;var G=Array.isArray;function I(){}var B={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function F(P,Z,_e){var Ae=_e.ref;return{$$typeof:r,type:P,key:Z,ref:Ae!==void 0?Ae:null,props:_e}}function $(P,Z){return F(P.type,Z,P.props)}function k(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function X(P){var Z={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(_e){return Z[_e]})}var te=/\/+/g;function oe(P,Z){return typeof P=="object"&&P!==null&&P.key!=null?X(""+P.key):Z.toString(36)}function V(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(I,I):(P.status="pending",P.then(function(Z){P.status==="pending"&&(P.status="fulfilled",P.value=Z)},function(Z){P.status==="pending"&&(P.status="rejected",P.reason=Z)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function L(P,Z,_e,Ae,Oe){var ee=typeof P;(ee==="undefined"||ee==="boolean")&&(P=null);var Ee=!1;if(P===null)Ee=!0;else switch(ee){case"bigint":case"string":case"number":Ee=!0;break;case"object":switch(P.$$typeof){case r:case e:Ee=!0;break;case x:return Ee=P._init,L(Ee(P._payload),Z,_e,Ae,Oe)}}if(Ee)return Oe=Oe(P),Ee=Ae===""?"."+oe(P,0):Ae,G(Oe)?(_e="",Ee!=null&&(_e=Ee.replace(te,"$&/")+"/"),L(Oe,Z,_e,"",function(Ze){return Ze})):Oe!=null&&(k(Oe)&&(Oe=$(Oe,_e+(Oe.key==null||P&&P.key===Oe.key?"":(""+Oe.key).replace(te,"$&/")+"/")+Ee)),Z.push(Oe)),1;Ee=0;var we=Ae===""?".":Ae+":";if(G(P))for(var Ge=0;Ge<P.length;Ge++)Ae=P[Ge],ee=we+oe(Ae,Ge),Ee+=L(Ae,Z,_e,ee,Oe);else if(Ge=b(P),typeof Ge=="function")for(P=Ge.call(P),Ge=0;!(Ae=P.next()).done;)Ae=Ae.value,ee=we+oe(Ae,Ge++),Ee+=L(Ae,Z,_e,ee,Oe);else if(ee==="object"){if(typeof P.then=="function")return L(V(P),Z,_e,Ae,Oe);throw Z=String(P),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return Ee}function z(P,Z,_e){if(P==null)return P;var Ae=[],Oe=0;return L(P,Ae,"","",function(ee){return Z.call(_e,ee,Oe++)}),Ae}function W(P){if(P._status===-1){var Z=P._result;Z=Z(),Z.then(function(_e){(P._status===0||P._status===-1)&&(P._status=1,P._result=_e)},function(_e){(P._status===0||P._status===-1)&&(P._status=2,P._result=_e)}),P._status===-1&&(P._status=0,P._result=Z)}if(P._status===1)return P._result.default;throw P._result}var ce=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},ge={map:z,forEach:function(P,Z,_e){z(P,function(){Z.apply(this,arguments)},_e)},count:function(P){var Z=0;return z(P,function(){Z++}),Z},toArray:function(P){return z(P,function(Z){return Z})||[]},only:function(P){if(!k(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return bt.Activity=v,bt.Children=ge,bt.Component=y,bt.Fragment=i,bt.Profiler=l,bt.PureComponent=O,bt.StrictMode=s,bt.Suspense=m,bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,bt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},bt.cache=function(P){return function(){return P.apply(null,arguments)}},bt.cacheSignal=function(){return null},bt.cloneElement=function(P,Z,_e){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ae=A({},P.props),Oe=P.key;if(Z!=null)for(ee in Z.key!==void 0&&(Oe=""+Z.key),Z)!w.call(Z,ee)||ee==="key"||ee==="__self"||ee==="__source"||ee==="ref"&&Z.ref===void 0||(Ae[ee]=Z[ee]);var ee=arguments.length-2;if(ee===1)Ae.children=_e;else if(1<ee){for(var Ee=Array(ee),we=0;we<ee;we++)Ee[we]=arguments[we+2];Ae.children=Ee}return F(P.type,Oe,Ae)},bt.createContext=function(P){return P={$$typeof:u,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},bt.createElement=function(P,Z,_e){var Ae,Oe={},ee=null;if(Z!=null)for(Ae in Z.key!==void 0&&(ee=""+Z.key),Z)w.call(Z,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Oe[Ae]=Z[Ae]);var Ee=arguments.length-2;if(Ee===1)Oe.children=_e;else if(1<Ee){for(var we=Array(Ee),Ge=0;Ge<Ee;Ge++)we[Ge]=arguments[Ge+2];Oe.children=we}if(P&&P.defaultProps)for(Ae in Ee=P.defaultProps,Ee)Oe[Ae]===void 0&&(Oe[Ae]=Ee[Ae]);return F(P,ee,Oe)},bt.createRef=function(){return{current:null}},bt.forwardRef=function(P){return{$$typeof:h,render:P}},bt.isValidElement=k,bt.lazy=function(P){return{$$typeof:x,_payload:{_status:-1,_result:P},_init:W}},bt.memo=function(P,Z){return{$$typeof:p,type:P,compare:Z===void 0?null:Z}},bt.startTransition=function(P){var Z=B.T,_e={};B.T=_e;try{var Ae=P(),Oe=B.S;Oe!==null&&Oe(_e,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(I,ce)}catch(ee){ce(ee)}finally{Z!==null&&_e.types!==null&&(Z.types=_e.types),B.T=Z}},bt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},bt.use=function(P){return B.H.use(P)},bt.useActionState=function(P,Z,_e){return B.H.useActionState(P,Z,_e)},bt.useCallback=function(P,Z){return B.H.useCallback(P,Z)},bt.useContext=function(P){return B.H.useContext(P)},bt.useDebugValue=function(){},bt.useDeferredValue=function(P,Z){return B.H.useDeferredValue(P,Z)},bt.useEffect=function(P,Z){return B.H.useEffect(P,Z)},bt.useEffectEvent=function(P){return B.H.useEffectEvent(P)},bt.useId=function(){return B.H.useId()},bt.useImperativeHandle=function(P,Z,_e){return B.H.useImperativeHandle(P,Z,_e)},bt.useInsertionEffect=function(P,Z){return B.H.useInsertionEffect(P,Z)},bt.useLayoutEffect=function(P,Z){return B.H.useLayoutEffect(P,Z)},bt.useMemo=function(P,Z){return B.H.useMemo(P,Z)},bt.useOptimistic=function(P,Z){return B.H.useOptimistic(P,Z)},bt.useReducer=function(P,Z,_e){return B.H.useReducer(P,Z,_e)},bt.useRef=function(P){return B.H.useRef(P)},bt.useState=function(P){return B.H.useState(P)},bt.useSyncExternalStore=function(P,Z,_e){return B.H.useSyncExternalStore(P,Z,_e)},bt.useTransition=function(){return B.H.useTransition()},bt.version="19.2.3",bt}var Jx;function sm(){return Jx||(Jx=1,bh.exports=hS()),bh.exports}var Ce=sm();const Uv=uS(Ce);var yh={exports:{}},Bl={},Sh={exports:{}},Eh={};var e_;function pS(){return e_||(e_=1,(function(r){function e(L,z){var W=L.length;L.push(z);e:for(;0<W;){var ce=W-1>>>1,ge=L[ce];if(0<l(ge,z))L[ce]=z,L[W]=ge,W=ce;else break e}}function i(L){return L.length===0?null:L[0]}function s(L){if(L.length===0)return null;var z=L[0],W=L.pop();if(W!==z){L[0]=W;e:for(var ce=0,ge=L.length,P=ge>>>1;ce<P;){var Z=2*(ce+1)-1,_e=L[Z],Ae=Z+1,Oe=L[Ae];if(0>l(_e,W))Ae<ge&&0>l(Oe,_e)?(L[ce]=Oe,L[Ae]=W,ce=Ae):(L[ce]=_e,L[Z]=W,ce=Z);else if(Ae<ge&&0>l(Oe,W))L[ce]=Oe,L[Ae]=W,ce=Ae;else break e}}return z}function l(L,z){var W=L.sortIndex-z.sortIndex;return W!==0?W:L.id-z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();r.unstable_now=function(){return u.now()-h}}var m=[],p=[],x=1,v=null,g=3,b=!1,M=!1,A=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,R=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function U(L){for(var z=i(p);z!==null;){if(z.callback===null)s(p);else if(z.startTime<=L)s(p),z.sortIndex=z.expirationTime,e(m,z);else break;z=i(p)}}function G(L){if(A=!1,U(L),!M)if(i(m)!==null)M=!0,I||(I=!0,X());else{var z=i(p);z!==null&&V(G,z.startTime-L)}}var I=!1,B=-1,w=5,F=-1;function $(){return S?!0:!(r.unstable_now()-F<w)}function k(){if(S=!1,I){var L=r.unstable_now();F=L;var z=!0;try{e:{M=!1,A&&(A=!1,R(B),B=-1),b=!0;var W=g;try{t:{for(U(L),v=i(m);v!==null&&!(v.expirationTime>L&&$());){var ce=v.callback;if(typeof ce=="function"){v.callback=null,g=v.priorityLevel;var ge=ce(v.expirationTime<=L);if(L=r.unstable_now(),typeof ge=="function"){v.callback=ge,U(L),z=!0;break t}v===i(m)&&s(m),U(L)}else s(m);v=i(m)}if(v!==null)z=!0;else{var P=i(p);P!==null&&V(G,P.startTime-L),z=!1}}break e}finally{v=null,g=W,b=!1}z=void 0}}finally{z?X():I=!1}}}var X;if(typeof O=="function")X=function(){O(k)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,oe=te.port2;te.port1.onmessage=k,X=function(){oe.postMessage(null)}}else X=function(){y(k,0)};function V(L,z){B=y(function(){L(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(L){L.callback=null},r.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<L?Math.floor(1e3/L):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(L){switch(g){case 1:case 2:case 3:var z=3;break;default:z=g}var W=g;g=z;try{return L()}finally{g=W}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(L,z){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var W=g;g=L;try{return z()}finally{g=W}},r.unstable_scheduleCallback=function(L,z,W){var ce=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?ce+W:ce):W=ce,L){case 1:var ge=-1;break;case 2:ge=250;break;case 5:ge=1073741823;break;case 4:ge=1e4;break;default:ge=5e3}return ge=W+ge,L={id:x++,callback:z,priorityLevel:L,startTime:W,expirationTime:ge,sortIndex:-1},W>ce?(L.sortIndex=W,e(p,L),i(m)===null&&L===i(p)&&(A?(R(B),B=-1):A=!0,V(G,W-ce))):(L.sortIndex=ge,e(m,L),M||b||(M=!0,I||(I=!0,X()))),L},r.unstable_shouldYield=$,r.unstable_wrapCallback=function(L){var z=g;return function(){var W=g;g=z;try{return L.apply(this,arguments)}finally{g=W}}}})(Eh)),Eh}var t_;function mS(){return t_||(t_=1,Sh.exports=pS()),Sh.exports}var Mh={exports:{}},fi={};var n_;function gS(){if(n_)return fi;n_=1;var r=sm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,x){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:p,implementation:x}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return fi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,fi.createPortal=function(m,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,x)},fi.flushSync=function(m){var p=u.T,x=s.p;try{if(u.T=null,s.p=2,m)return m()}finally{u.T=p,s.p=x,s.d.f()}},fi.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},fi.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},fi.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var x=p.as,v=h(x,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,b=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:b}):x==="script"&&s.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:b,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},fi.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},fi.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,v=h(x,p.crossOrigin);s.d.L(m,x,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},fi.preloadModule=function(m,p){if(typeof m=="string")if(p){var x=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},fi.requestFormReset=function(m){s.d.r(m)},fi.unstable_batchedUpdates=function(m,p){return m(p)},fi.useFormState=function(m,p,x){return u.H.useFormState(m,p,x)},fi.useFormStatus=function(){return u.H.useHostTransitionStatus()},fi.version="19.2.3",fi}var i_;function xS(){if(i_)return Mh.exports;i_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Mh.exports=gS(),Mh.exports}var a_;function _S(){if(a_)return Bl;a_=1;var r=mS(),e=sm(),i=xS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function u(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var f=a.return;if(f===null)break;var d=f.alternate;if(d===null){if(o=f.return,o!==null){a=o;continue}break}if(f.child===d.child){for(d=f.child;d;){if(d===a)return m(f),t;if(d===o)return m(f),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=f,o=d;else{for(var E=!1,N=f.child;N;){if(N===a){E=!0,a=f,o=d;break}if(N===o){E=!0,o=f,a=d;break}N=N.sibling}if(!E){for(N=d.child;N;){if(N===a){E=!0,a=d,o=f;break}if(N===o){E=!0,o=d,a=f;break}N=N.sibling}if(!E)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function x(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=x(t),n!==null)return n;t=t.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),O=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),G=Symbol.for("react.suspense"),I=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function X(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var te=Symbol.for("react.client.reference");function oe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===te?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case A:return"Fragment";case y:return"Profiler";case S:return"StrictMode";case G:return"Suspense";case I:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case O:return t.displayName||"Context";case R:return(t._context.displayName||"Context")+".Consumer";case U:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:oe(t.type)||"Memo";case w:n=t._payload,t=t._init;try{return oe(t(n))}catch{}}return null}var V=Array.isArray,L=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},ce=[],ge=-1;function P(t){return{current:t}}function Z(t){0>ge||(t.current=ce[ge],ce[ge]=null,ge--)}function _e(t,n){ge++,ce[ge]=t.current,t.current=n}var Ae=P(null),Oe=P(null),ee=P(null),Ee=P(null);function we(t,n){switch(_e(ee,n),_e(Oe,t),_e(Ae,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?vx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=vx(n),t=bx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Z(Ae),_e(Ae,t)}function Ge(){Z(Ae),Z(Oe),Z(ee)}function Ze(t){t.memoizedState!==null&&_e(Ee,t);var n=Ae.current,a=bx(n,t.type);n!==a&&(_e(Oe,t),_e(Ae,a))}function Ke(t){Oe.current===t&&(Z(Ae),Z(Oe)),Ee.current===t&&(Z(Ee),Ll._currentValue=W)}var At,ut;function je(t){if(At===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);At=n&&n[1]||"",ut=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+At+t+ut}var Dt=!1;function xt(t,n){if(!t||Dt)return"";Dt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Se=function(){throw Error()};if(Object.defineProperty(Se.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Se,[])}catch(de){var ue=de}Reflect.construct(t,[],Se)}else{try{Se.call()}catch(de){ue=de}t.call(Se.prototype)}}else{try{throw Error()}catch(de){ue=de}(Se=t())&&typeof Se.catch=="function"&&Se.catch(function(){})}}catch(de){if(de&&ue&&typeof de.stack=="string")return[de.stack,ue.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),E=d[0],N=d[1];if(E&&N){var H=E.split(`
`),re=N.split(`
`);for(f=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;f<re.length&&!re[f].includes("DetermineComponentFrameRoot");)f++;if(o===H.length||f===re.length)for(o=H.length-1,f=re.length-1;1<=o&&0<=f&&H[o]!==re[f];)f--;for(;1<=o&&0<=f;o--,f--)if(H[o]!==re[f]){if(o!==1||f!==1)do if(o--,f--,0>f||H[o]!==re[f]){var xe=`
`+H[o].replace(" at new "," at ");return t.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",t.displayName)),xe}while(1<=o&&0<=f);break}}}finally{Dt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?je(a):""}function mn(t,n){switch(t.tag){case 26:case 27:case 5:return je(t.type);case 16:return je("Lazy");case 13:return t.child!==n&&n!==null?je("Suspense Fallback"):je("Suspense");case 19:return je("SuspenseList");case 0:case 15:return xt(t.type,!1);case 11:return xt(t.type.render,!1);case 1:return xt(t.type,!0);case 31:return je("Activity");default:return""}}function Kt(t){try{var n="",a=null;do n+=mn(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var kt=Object.prototype.hasOwnProperty,q=r.unstable_scheduleCallback,yt=r.unstable_cancelCallback,vt=r.unstable_shouldYield,Et=r.unstable_requestPaint,ve=r.unstable_now,Vt=r.unstable_getCurrentPriorityLevel,D=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,J=r.unstable_NormalPriority,me=r.unstable_LowPriority,Te=r.unstable_IdlePriority,ye=r.log,Ue=r.unstable_setDisableYieldValue,fe=null,pe=null;function Le(t){if(typeof ye=="function"&&Ue(t),pe&&typeof pe.setStrictMode=="function")try{pe.setStrictMode(fe,t)}catch{}}var ze=Math.clz32?Math.clz32:rt,Ne=Math.log,Pe=Math.LN2;function rt(t){return t>>>=0,t===0?32:31-(Ne(t)/Pe|0)|0}var ht=256,ct=262144,j=4194304;function De(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function he(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var f=0,d=t.suspendedLanes,E=t.pingedLanes;t=t.warmLanes;var N=o&134217727;return N!==0?(o=N&~d,o!==0?f=De(o):(E&=N,E!==0?f=De(E):a||(a=N&~t,a!==0&&(f=De(a))))):(N=o&~d,N!==0?f=De(N):E!==0?f=De(E):a||(a=o&~t,a!==0&&(f=De(a)))),f===0?0:n!==0&&n!==f&&(n&d)===0&&(d=f&-f,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:f}function Ie(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Fe(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Re(){var t=j;return j<<=1,(j&62914560)===0&&(j=4194304),t}function We(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function it(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function rn(t,n,a,o,f,d){var E=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var N=t.entanglements,H=t.expirationTimes,re=t.hiddenUpdates;for(a=E&~a;0<a;){var xe=31-ze(a),Se=1<<xe;N[xe]=0,H[xe]=-1;var ue=re[xe];if(ue!==null)for(re[xe]=null,xe=0;xe<ue.length;xe++){var de=ue[xe];de!==null&&(de.lane&=-536870913)}a&=~Se}o!==0&&Lt(t,o,0),d!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=d&~(E&~n))}function Lt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Kn(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),f=1<<o;f&n|t[o]&n&&(t[o]|=n),a&=~f}}function In(t,n){var a=n&-n;return a=(a&42)!==0?1:Bi(a),(a&(t.suspendedLanes|n))!==0?0:a}function Bi(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ea(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function ta(){var t=z.p;return t!==0?t:(t=window.event,t===void 0?32:Vx(t.type))}function zi(t,n){var a=z.p;try{return z.p=t,n()}finally{z.p=a}}var Un=Math.random().toString(36).slice(2),gn="__reactFiber$"+Un,En="__reactProps$"+Un,li="__reactContainer$"+Un,na="__reactEvents$"+Un,Cn="__reactListeners$"+Un,wa="__reactHandles$"+Un,xa="__reactResources$"+Un,ci="__reactMarker$"+Un;function Mi(t){delete t[gn],delete t[En],delete t[na],delete t[Cn],delete t[wa]}function xi(t){var n=t[gn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[li]||a[gn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=wx(t);t!==null;){if(a=t[gn])return a;t=wx(t)}return n}t=a,a=t.parentNode}return null}function Ti(t){if(t=t[gn]||t[li]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function xn(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ai(t){var n=t[xa];return n||(n=t[xa]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function yn(t){t[ci]=!0}var Ra=new Set,C={};function K(t,n){le(t,n),le(t+"Capture",n)}function le(t,n){for(C[t]=n,t=0;t<n.length;t++)Ra.add(n[t])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ie={},He={};function Xe(t){return kt.call(He,t)?!0:kt.call(ie,t)?!1:ne.test(t)?He[t]=!0:(ie[t]=!0,!1)}function Be(t,n,a){if(Xe(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function qe(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ye(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function Qe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Je(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return f.call(this)},set:function(E){a=""+E,d.call(this,E)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(E){a=""+E},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function It(t){if(!t._valueTracker){var n=pt(t)?"checked":"value";t._valueTracker=Je(t,n,""+t[n])}}function Wt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=pt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function Ft(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Bt=/[\n"\\]/g;function Ct(t){return t.replace(Bt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ve(t,n,a,o,f,d,E,N){t.name="",E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.type=E:t.removeAttribute("type"),n!=null?E==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+Qe(n)):t.value!==""+Qe(n)&&(t.value=""+Qe(n)):E!=="submit"&&E!=="reset"||t.removeAttribute("value"),n!=null?Ut(t,E,Qe(n)):a!=null?Ut(t,E,Qe(a)):o!=null&&t.removeAttribute("value"),f==null&&d!=null&&(t.defaultChecked=!!d),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),N!=null&&typeof N!="function"&&typeof N!="symbol"&&typeof N!="boolean"?t.name=""+Qe(N):t.removeAttribute("name")}function ei(t,n,a,o,f,d,E,N){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){It(t);return}a=a!=null?""+Qe(a):"",n=n!=null?""+Qe(n):a,N||n===t.value||(t.value=n),t.defaultValue=n}o=o??f,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=N?t.checked:!!o,t.defaultChecked=!!o,E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"&&(t.name=E),It(t)}function Ut(t,n,a){n==="number"&&Ft(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Pn(t,n,a,o){if(t=t.options,n){n={};for(var f=0;f<a.length;f++)n["$"+a[f]]=!0;for(a=0;a<t.length;a++)f=n.hasOwnProperty("$"+t[a].value),t[a].selected!==f&&(t[a].selected=f),f&&o&&(t[a].defaultSelected=!0)}else{for(a=""+Qe(a),n=null,f=0;f<t.length;f++){if(t[f].value===a){t[f].selected=!0,o&&(t[f].defaultSelected=!0);return}n!==null||t[f].disabled||(n=t[f])}n!==null&&(n.selected=!0)}}function jn(t,n,a){if(n!=null&&(n=""+Qe(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+Qe(a):""}function ui(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(V(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Qe(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),It(t)}function _i(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Zt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function sn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Zt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function vi(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var f in n)o=n[f],n.hasOwnProperty(f)&&a[f]!==o&&sn(t,f,o)}else for(var d in n)n.hasOwnProperty(d)&&sn(t,d,n[d])}function en(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),wi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Fn(t){return wi.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Gi(){}var $o=null;function Ko(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var _a=null,vs=null;function bi(t){var n=Ti(t);if(n&&(t=n.stateNode)){var a=t[En]||null;e:switch(t=n.stateNode,n.type){case"input":if(Ve(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ct(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var f=o[En]||null;if(!f)throw Error(s(90));Ve(o,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Wt(o)}break e;case"textarea":jn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&Pn(t,!!a.multiple,n,!1)}}}var lc=!1;function df(t,n,a){if(lc)return t(n,a);lc=!0;try{var o=t(n);return o}finally{if(lc=!1,(_a!==null||vs!==null)&&(Yc(),_a&&(n=_a,t=vs,vs=_a=null,bi(n),t)))for(n=0;n<t.length;n++)bi(t[n])}}function bs(t,n){var a=t.stateNode;if(a===null)return null;var o=a[En]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Hi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ti=!1;if(Hi)try{var ar={};Object.defineProperty(ar,"passive",{get:function(){ti=!0}}),window.addEventListener("test",ar,ar),window.removeEventListener("test",ar,ar)}catch{ti=!1}var ni=null,Hr=null,sr=null;function cc(){if(sr)return sr;var t,n=Hr,a=n.length,o,f="value"in ni?ni.value:ni.textContent,d=f.length;for(t=0;t<a&&n[t]===f[t];t++);var E=a-t;for(o=1;o<=E&&n[a-o]===f[d-o];o++);return sr=f.slice(t,1<o?1-o:void 0)}function rr(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Xa(){return!0}function Zo(){return!1}function Mn(t){function n(a,o,f,d,E){this._reactName=a,this._targetInst=f,this.type=o,this.nativeEvent=d,this.target=E,this.currentTarget=null;for(var N in t)t.hasOwnProperty(N)&&(a=t[N],this[N]=a?a(d):d[N]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Xa:Zo,this.isPropagationStopped=Zo,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Xa)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Xa)},persist:function(){},isPersistent:Xa}),n}var Ya={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ys=Mn(Ya),or=v({},Ya,{view:0,detail:0}),_t=Mn(or),Qo,Jo,lr,cr=v({},or,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:el,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lr&&(lr&&t.type==="mousemove"?(Qo=t.screenX-lr.screenX,Jo=t.screenY-lr.screenY):Jo=Qo=0,lr=t),Qo)},movementY:function(t){return"movementY"in t?t.movementY:Jo}}),kr=Mn(cr),hf=v({},cr,{dataTransfer:0}),pf=Mn(hf),mf=v({},or,{relatedTarget:0}),Vr=Mn(mf),gf=v({},Ya,{animationName:0,elapsedTime:0,pseudoElement:0}),xf=Mn(gf),_f=v({},Ya,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),vf=Mn(_f),bf=v({},Ya,{data:0}),jr=Mn(bf),yf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ef={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Mf(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Ef[t])?!!n[t]:!1}function el(){return Mf}var uc=v({},or,{key:function(t){if(t.key){var n=yf[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=rr(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Sf[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:el,charCode:function(t){return t.type==="keypress"?rr(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?rr(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Mt=Mn(uc),Pt=v({},cr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gt=Mn(Pt),ft=v({},or,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:el}),lt=Mn(ft),wt=v({},Ya,{propertyName:0,elapsedTime:0,pseudoElement:0}),nt=Mn(wt),Me=v({},cr,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),at=Mn(Me),jt=v({},Ya,{newState:0,oldState:0}),et=Mn(jt),st=[9,13,27,32],Qt=Hi&&"CompositionEvent"in window,Ri=null;Hi&&"documentMode"in document&&(Ri=document.documentMode);var Bn=Hi&&"TextEvent"in window&&!Ri,yi=Hi&&(!Qt||Ri&&8<Ri&&11>=Ri),Tn=" ",Nn=!1;function ur(t,n){switch(t){case"keyup":return st.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fr(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ia=!1;function dr(t,n){switch(t){case"compositionend":return fr(n);case"keypress":return n.which!==32?null:(Nn=!0,Tn);case"textInput":return t=n.data,t===Tn&&Nn?null:t;default:return null}}function Tf(t,n){if(ia)return t==="compositionend"||!Qt&&ur(t,n)?(t=cc(),sr=Hr=ni=null,ia=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return yi&&n.locale!=="ko"?null:n.data;default:return null}}var Pb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Pb[t.type]:n==="textarea"}function Om(t,n,a,o){_a?vs?vs.push(o):vs=[o]:_a=o,n=Jc(n,"onChange"),0<n.length&&(a=new ys("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var tl=null,nl=null;function Fb(t){hx(t,0)}function fc(t){var n=xn(t);if(Wt(n))return t}function Dm(t,n){if(t==="change")return n}var Lm=!1;if(Hi){var Af;if(Hi){var wf="oninput"in document;if(!wf){var Im=document.createElement("div");Im.setAttribute("oninput","return;"),wf=typeof Im.oninput=="function"}Af=wf}else Af=!1;Lm=Af&&(!document.documentMode||9<document.documentMode)}function Um(){tl&&(tl.detachEvent("onpropertychange",Pm),nl=tl=null)}function Pm(t){if(t.propertyName==="value"&&fc(nl)){var n=[];Om(n,nl,t,Ko(t)),df(Fb,n)}}function Bb(t,n,a){t==="focusin"?(Um(),tl=n,nl=a,tl.attachEvent("onpropertychange",Pm)):t==="focusout"&&Um()}function zb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fc(nl)}function Gb(t,n){if(t==="click")return fc(n)}function Hb(t,n){if(t==="input"||t==="change")return fc(n)}function kb(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ki=typeof Object.is=="function"?Object.is:kb;function il(t,n){if(ki(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var f=a[o];if(!kt.call(n,f)||!ki(t[f],n[f]))return!1}return!0}function Fm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Bm(t,n){var a=Fm(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Fm(a)}}function zm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?zm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Gm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Ft(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Ft(t.document)}return n}function Rf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Vb=Hi&&"documentMode"in document&&11>=document.documentMode,Xr=null,Cf=null,al=null,Nf=!1;function Hm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Nf||Xr==null||Xr!==Ft(o)||(o=Xr,"selectionStart"in o&&Rf(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),al&&il(al,o)||(al=o,o=Jc(Cf,"onSelect"),0<o.length&&(n=new ys("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Xr)))}function hr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Yr={animationend:hr("Animation","AnimationEnd"),animationiteration:hr("Animation","AnimationIteration"),animationstart:hr("Animation","AnimationStart"),transitionrun:hr("Transition","TransitionRun"),transitionstart:hr("Transition","TransitionStart"),transitioncancel:hr("Transition","TransitionCancel"),transitionend:hr("Transition","TransitionEnd")},Of={},km={};Hi&&(km=document.createElement("div").style,"AnimationEvent"in window||(delete Yr.animationend.animation,delete Yr.animationiteration.animation,delete Yr.animationstart.animation),"TransitionEvent"in window||delete Yr.transitionend.transition);function pr(t){if(Of[t])return Of[t];if(!Yr[t])return t;var n=Yr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in km)return Of[t]=n[a];return t}var Vm=pr("animationend"),jm=pr("animationiteration"),Xm=pr("animationstart"),jb=pr("transitionrun"),Xb=pr("transitionstart"),Yb=pr("transitioncancel"),Ym=pr("transitionend"),Wm=new Map,Df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Df.push("scrollEnd");function va(t,n){Wm.set(t,n),K(n,[t])}var dc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},aa=[],Wr=0,Lf=0;function hc(){for(var t=Wr,n=Lf=Wr=0;n<t;){var a=aa[n];aa[n++]=null;var o=aa[n];aa[n++]=null;var f=aa[n];aa[n++]=null;var d=aa[n];if(aa[n++]=null,o!==null&&f!==null){var E=o.pending;E===null?f.next=f:(f.next=E.next,E.next=f),o.pending=f}d!==0&&qm(a,f,d)}}function pc(t,n,a,o){aa[Wr++]=t,aa[Wr++]=n,aa[Wr++]=a,aa[Wr++]=o,Lf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function If(t,n,a,o){return pc(t,n,a,o),mc(t)}function mr(t,n){return pc(t,null,null,n),mc(t)}function qm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var f=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(f=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,f&&n!==null&&(f=31-ze(a),t=d.hiddenUpdates,o=t[f],o===null?t[f]=[n]:o.push(n),n.lane=a|536870912),d):null}function mc(t){if(50<Al)throw Al=0,Vd=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var qr={};function Wb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Vi(t,n,a,o){return new Wb(t,n,a,o)}function Uf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Wa(t,n){var a=t.alternate;return a===null?(a=Vi(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function $m(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function gc(t,n,a,o,f,d){var E=0;if(o=t,typeof t=="function")Uf(t)&&(E=1);else if(typeof t=="string")E=Qy(t,a,Ae.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=Vi(31,a,n,f),t.elementType=F,t.lanes=d,t;case A:return gr(a.children,f,d,n);case S:E=8,f|=24;break;case y:return t=Vi(12,a,n,f|2),t.elementType=y,t.lanes=d,t;case G:return t=Vi(13,a,n,f),t.elementType=G,t.lanes=d,t;case I:return t=Vi(19,a,n,f),t.elementType=I,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case O:E=10;break e;case R:E=9;break e;case U:E=11;break e;case B:E=14;break e;case w:E=16,o=null;break e}E=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Vi(E,a,n,f),n.elementType=t,n.type=o,n.lanes=d,n}function gr(t,n,a,o){return t=Vi(7,t,o,n),t.lanes=a,t}function Pf(t,n,a){return t=Vi(6,t,null,n),t.lanes=a,t}function Km(t){var n=Vi(18,null,null,0);return n.stateNode=t,n}function Ff(t,n,a){return n=Vi(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Zm=new WeakMap;function sa(t,n){if(typeof t=="object"&&t!==null){var a=Zm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Kt(n)},Zm.set(t,n),n)}return{value:t,source:n,stack:Kt(n)}}var $r=[],Kr=0,xc=null,sl=0,ra=[],oa=0,Ss=null,Ca=1,Na="";function qa(t,n){$r[Kr++]=sl,$r[Kr++]=xc,xc=t,sl=n}function Qm(t,n,a){ra[oa++]=Ca,ra[oa++]=Na,ra[oa++]=Ss,Ss=t;var o=Ca;t=Na;var f=32-ze(o)-1;o&=~(1<<f),a+=1;var d=32-ze(n)+f;if(30<d){var E=f-f%5;d=(o&(1<<E)-1).toString(32),o>>=E,f-=E,Ca=1<<32-ze(n)+f|a<<f|o,Na=d+t}else Ca=1<<d|a<<f|o,Na=t}function Bf(t){t.return!==null&&(qa(t,1),Qm(t,1,0))}function zf(t){for(;t===xc;)xc=$r[--Kr],$r[Kr]=null,sl=$r[--Kr],$r[Kr]=null;for(;t===Ss;)Ss=ra[--oa],ra[oa]=null,Na=ra[--oa],ra[oa]=null,Ca=ra[--oa],ra[oa]=null}function Jm(t,n){ra[oa++]=Ca,ra[oa++]=Na,ra[oa++]=Ss,Ca=n.id,Na=n.overflow,Ss=t}var ii=null,vn=null,qt=!1,Es=null,la=!1,Gf=Error(s(519));function Ms(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw rl(sa(n,t)),Gf}function eg(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[gn]=t,n[En]=o,a){case"dialog":Gt("cancel",n),Gt("close",n);break;case"iframe":case"object":case"embed":Gt("load",n);break;case"video":case"audio":for(a=0;a<Rl.length;a++)Gt(Rl[a],n);break;case"source":Gt("error",n);break;case"img":case"image":case"link":Gt("error",n),Gt("load",n);break;case"details":Gt("toggle",n);break;case"input":Gt("invalid",n),ei(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Gt("invalid",n);break;case"textarea":Gt("invalid",n),ui(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||xx(n.textContent,a)?(o.popover!=null&&(Gt("beforetoggle",n),Gt("toggle",n)),o.onScroll!=null&&Gt("scroll",n),o.onScrollEnd!=null&&Gt("scrollend",n),o.onClick!=null&&(n.onclick=Gi),n=!0):n=!1,n||Ms(t,!0)}function tg(t){for(ii=t.return;ii;)switch(ii.tag){case 5:case 31:case 13:la=!1;return;case 27:case 3:la=!0;return;default:ii=ii.return}}function Zr(t){if(t!==ii)return!1;if(!qt)return tg(t),qt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ah(t.type,t.memoizedProps)),a=!a),a&&vn&&Ms(t),tg(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=Ax(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));vn=Ax(t)}else n===27?(n=vn,Bs(t.type)?(t=ch,ch=null,vn=t):vn=n):vn=ii?ua(t.stateNode.nextSibling):null;return!0}function xr(){vn=ii=null,qt=!1}function Hf(){var t=Es;return t!==null&&(Di===null?Di=t:Di.push.apply(Di,t),Es=null),t}function rl(t){Es===null?Es=[t]:Es.push(t)}var kf=P(null),_r=null,$a=null;function Ts(t,n,a){_e(kf,n._currentValue),n._currentValue=a}function Ka(t){t._currentValue=kf.current,Z(kf)}function Vf(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function jf(t,n,a,o){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var d=f.dependencies;if(d!==null){var E=f.child;d=d.firstContext;e:for(;d!==null;){var N=d;d=f;for(var H=0;H<n.length;H++)if(N.context===n[H]){d.lanes|=a,N=d.alternate,N!==null&&(N.lanes|=a),Vf(d.return,a,t),o||(E=null);break e}d=N.next}}else if(f.tag===18){if(E=f.return,E===null)throw Error(s(341));E.lanes|=a,d=E.alternate,d!==null&&(d.lanes|=a),Vf(E,a,t),E=null}else E=f.child;if(E!==null)E.return=f;else for(E=f;E!==null;){if(E===t){E=null;break}if(f=E.sibling,f!==null){f.return=E.return,E=f;break}E=E.return}f=E}}function Qr(t,n,a,o){t=null;for(var f=n,d=!1;f!==null;){if(!d){if((f.flags&524288)!==0)d=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var E=f.alternate;if(E===null)throw Error(s(387));if(E=E.memoizedProps,E!==null){var N=f.type;ki(f.pendingProps.value,E.value)||(t!==null?t.push(N):t=[N])}}else if(f===Ee.current){if(E=f.alternate,E===null)throw Error(s(387));E.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(Ll):t=[Ll])}f=f.return}t!==null&&jf(n,t,a,o),n.flags|=262144}function _c(t){for(t=t.firstContext;t!==null;){if(!ki(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function vr(t){_r=t,$a=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ai(t){return ng(_r,t)}function vc(t,n){return _r===null&&vr(t),ng(t,n)}function ng(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},$a===null){if(t===null)throw Error(s(308));$a=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else $a=$a.next=n;return a}var qb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},$b=r.unstable_scheduleCallback,Kb=r.unstable_NormalPriority,zn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Xf(){return{controller:new qb,data:new Map,refCount:0}}function ol(t){t.refCount--,t.refCount===0&&$b(Kb,function(){t.controller.abort()})}var ll=null,Yf=0,Jr=0,eo=null;function Zb(t,n){if(ll===null){var a=ll=[];Yf=0,Jr=$d(),eo={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Yf++,n.then(ig,ig),n}function ig(){if(--Yf===0&&ll!==null){eo!==null&&(eo.status="fulfilled");var t=ll;ll=null,Jr=0,eo=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Qb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(f){a.push(f)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var f=0;f<a.length;f++)(0,a[f])(n)},function(f){for(o.status="rejected",o.reason=f,f=0;f<a.length;f++)(0,a[f])(void 0)}),o}var ag=L.S;L.S=function(t,n){H0=ve(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Zb(t,n),ag!==null&&ag(t,n)};var br=P(null);function Wf(){var t=br.current;return t!==null?t:_n.pooledCache}function bc(t,n){n===null?_e(br,br.current):_e(br,n.pool)}function sg(){var t=Wf();return t===null?null:{parent:zn._currentValue,pool:t}}var to=Error(s(460)),qf=Error(s(474)),yc=Error(s(542)),Sc={then:function(){}};function rg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function og(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Gi,Gi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,cg(t),t;default:if(typeof n.status=="string")n.then(Gi,Gi);else{if(t=_n,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var f=n;f.status="fulfilled",f.value=o}},function(o){if(n.status==="pending"){var f=n;f.status="rejected",f.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,cg(t),t}throw Sr=n,to}}function yr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Sr=a,to):a}}var Sr=null;function lg(){if(Sr===null)throw Error(s(459));var t=Sr;return Sr=null,t}function cg(t){if(t===to||t===yc)throw Error(s(483))}var no=null,cl=0;function Ec(t){var n=cl;return cl+=1,no===null&&(no=[]),og(no,t,n)}function ul(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Mc(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function ug(t){function n(Q,Y){if(t){var se=Q.deletions;se===null?(Q.deletions=[Y],Q.flags|=16):se.push(Y)}}function a(Q,Y){if(!t)return null;for(;Y!==null;)n(Q,Y),Y=Y.sibling;return null}function o(Q){for(var Y=new Map;Q!==null;)Q.key!==null?Y.set(Q.key,Q):Y.set(Q.index,Q),Q=Q.sibling;return Y}function f(Q,Y){return Q=Wa(Q,Y),Q.index=0,Q.sibling=null,Q}function d(Q,Y,se){return Q.index=se,t?(se=Q.alternate,se!==null?(se=se.index,se<Y?(Q.flags|=67108866,Y):se):(Q.flags|=67108866,Y)):(Q.flags|=1048576,Y)}function E(Q){return t&&Q.alternate===null&&(Q.flags|=67108866),Q}function N(Q,Y,se,be){return Y===null||Y.tag!==6?(Y=Pf(se,Q.mode,be),Y.return=Q,Y):(Y=f(Y,se),Y.return=Q,Y)}function H(Q,Y,se,be){var ot=se.type;return ot===A?xe(Q,Y,se.props.children,be,se.key):Y!==null&&(Y.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===w&&yr(ot)===Y.type)?(Y=f(Y,se.props),ul(Y,se),Y.return=Q,Y):(Y=gc(se.type,se.key,se.props,null,Q.mode,be),ul(Y,se),Y.return=Q,Y)}function re(Q,Y,se,be){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==se.containerInfo||Y.stateNode.implementation!==se.implementation?(Y=Ff(se,Q.mode,be),Y.return=Q,Y):(Y=f(Y,se.children||[]),Y.return=Q,Y)}function xe(Q,Y,se,be,ot){return Y===null||Y.tag!==7?(Y=gr(se,Q.mode,be,ot),Y.return=Q,Y):(Y=f(Y,se),Y.return=Q,Y)}function Se(Q,Y,se){if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return Y=Pf(""+Y,Q.mode,se),Y.return=Q,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case b:return se=gc(Y.type,Y.key,Y.props,null,Q.mode,se),ul(se,Y),se.return=Q,se;case M:return Y=Ff(Y,Q.mode,se),Y.return=Q,Y;case w:return Y=yr(Y),Se(Q,Y,se)}if(V(Y)||X(Y))return Y=gr(Y,Q.mode,se,null),Y.return=Q,Y;if(typeof Y.then=="function")return Se(Q,Ec(Y),se);if(Y.$$typeof===O)return Se(Q,vc(Q,Y),se);Mc(Q,Y)}return null}function ue(Q,Y,se,be){var ot=Y!==null?Y.key:null;if(typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint")return ot!==null?null:N(Q,Y,""+se,be);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case b:return se.key===ot?H(Q,Y,se,be):null;case M:return se.key===ot?re(Q,Y,se,be):null;case w:return se=yr(se),ue(Q,Y,se,be)}if(V(se)||X(se))return ot!==null?null:xe(Q,Y,se,be,null);if(typeof se.then=="function")return ue(Q,Y,Ec(se),be);if(se.$$typeof===O)return ue(Q,Y,vc(Q,se),be);Mc(Q,se)}return null}function de(Q,Y,se,be,ot){if(typeof be=="string"&&be!==""||typeof be=="number"||typeof be=="bigint")return Q=Q.get(se)||null,N(Y,Q,""+be,ot);if(typeof be=="object"&&be!==null){switch(be.$$typeof){case b:return Q=Q.get(be.key===null?se:be.key)||null,H(Y,Q,be,ot);case M:return Q=Q.get(be.key===null?se:be.key)||null,re(Y,Q,be,ot);case w:return be=yr(be),de(Q,Y,se,be,ot)}if(V(be)||X(be))return Q=Q.get(se)||null,xe(Y,Q,be,ot,null);if(typeof be.then=="function")return de(Q,Y,se,Ec(be),ot);if(be.$$typeof===O)return de(Q,Y,se,vc(Y,be),ot);Mc(Y,be)}return null}function $e(Q,Y,se,be){for(var ot=null,tn=null,tt=Y,Rt=Y=0,Yt=null;tt!==null&&Rt<se.length;Rt++){tt.index>Rt?(Yt=tt,tt=null):Yt=tt.sibling;var nn=ue(Q,tt,se[Rt],be);if(nn===null){tt===null&&(tt=Yt);break}t&&tt&&nn.alternate===null&&n(Q,tt),Y=d(nn,Y,Rt),tn===null?ot=nn:tn.sibling=nn,tn=nn,tt=Yt}if(Rt===se.length)return a(Q,tt),qt&&qa(Q,Rt),ot;if(tt===null){for(;Rt<se.length;Rt++)tt=Se(Q,se[Rt],be),tt!==null&&(Y=d(tt,Y,Rt),tn===null?ot=tt:tn.sibling=tt,tn=tt);return qt&&qa(Q,Rt),ot}for(tt=o(tt);Rt<se.length;Rt++)Yt=de(tt,Q,Rt,se[Rt],be),Yt!==null&&(t&&Yt.alternate!==null&&tt.delete(Yt.key===null?Rt:Yt.key),Y=d(Yt,Y,Rt),tn===null?ot=Yt:tn.sibling=Yt,tn=Yt);return t&&tt.forEach(function(Vs){return n(Q,Vs)}),qt&&qa(Q,Rt),ot}function dt(Q,Y,se,be){if(se==null)throw Error(s(151));for(var ot=null,tn=null,tt=Y,Rt=Y=0,Yt=null,nn=se.next();tt!==null&&!nn.done;Rt++,nn=se.next()){tt.index>Rt?(Yt=tt,tt=null):Yt=tt.sibling;var Vs=ue(Q,tt,nn.value,be);if(Vs===null){tt===null&&(tt=Yt);break}t&&tt&&Vs.alternate===null&&n(Q,tt),Y=d(Vs,Y,Rt),tn===null?ot=Vs:tn.sibling=Vs,tn=Vs,tt=Yt}if(nn.done)return a(Q,tt),qt&&qa(Q,Rt),ot;if(tt===null){for(;!nn.done;Rt++,nn=se.next())nn=Se(Q,nn.value,be),nn!==null&&(Y=d(nn,Y,Rt),tn===null?ot=nn:tn.sibling=nn,tn=nn);return qt&&qa(Q,Rt),ot}for(tt=o(tt);!nn.done;Rt++,nn=se.next())nn=de(tt,Q,Rt,nn.value,be),nn!==null&&(t&&nn.alternate!==null&&tt.delete(nn.key===null?Rt:nn.key),Y=d(nn,Y,Rt),tn===null?ot=nn:tn.sibling=nn,tn=nn);return t&&tt.forEach(function(cS){return n(Q,cS)}),qt&&qa(Q,Rt),ot}function dn(Q,Y,se,be){if(typeof se=="object"&&se!==null&&se.type===A&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case b:e:{for(var ot=se.key;Y!==null;){if(Y.key===ot){if(ot=se.type,ot===A){if(Y.tag===7){a(Q,Y.sibling),be=f(Y,se.props.children),be.return=Q,Q=be;break e}}else if(Y.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===w&&yr(ot)===Y.type){a(Q,Y.sibling),be=f(Y,se.props),ul(be,se),be.return=Q,Q=be;break e}a(Q,Y);break}else n(Q,Y);Y=Y.sibling}se.type===A?(be=gr(se.props.children,Q.mode,be,se.key),be.return=Q,Q=be):(be=gc(se.type,se.key,se.props,null,Q.mode,be),ul(be,se),be.return=Q,Q=be)}return E(Q);case M:e:{for(ot=se.key;Y!==null;){if(Y.key===ot)if(Y.tag===4&&Y.stateNode.containerInfo===se.containerInfo&&Y.stateNode.implementation===se.implementation){a(Q,Y.sibling),be=f(Y,se.children||[]),be.return=Q,Q=be;break e}else{a(Q,Y);break}else n(Q,Y);Y=Y.sibling}be=Ff(se,Q.mode,be),be.return=Q,Q=be}return E(Q);case w:return se=yr(se),dn(Q,Y,se,be)}if(V(se))return $e(Q,Y,se,be);if(X(se)){if(ot=X(se),typeof ot!="function")throw Error(s(150));return se=ot.call(se),dt(Q,Y,se,be)}if(typeof se.then=="function")return dn(Q,Y,Ec(se),be);if(se.$$typeof===O)return dn(Q,Y,vc(Q,se),be);Mc(Q,se)}return typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint"?(se=""+se,Y!==null&&Y.tag===6?(a(Q,Y.sibling),be=f(Y,se),be.return=Q,Q=be):(a(Q,Y),be=Pf(se,Q.mode,be),be.return=Q,Q=be),E(Q)):a(Q,Y)}return function(Q,Y,se,be){try{cl=0;var ot=dn(Q,Y,se,be);return no=null,ot}catch(tt){if(tt===to||tt===yc)throw tt;var tn=Vi(29,tt,null,Q.mode);return tn.lanes=be,tn.return=Q,tn}}}var Er=ug(!0),fg=ug(!1),As=!1;function $f(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Kf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ws(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Rs(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(an&2)!==0){var f=o.pending;return f===null?n.next=n:(n.next=f.next,f.next=n),o.pending=n,n=mc(t),qm(t,null,a),n}return pc(t,o,n,a),mc(t)}function fl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Kn(t,a)}}function Zf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var f=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var E={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?f=d=E:d=d.next=E,a=a.next}while(a!==null);d===null?f=d=n:d=d.next=n}else f=d=n;a={baseState:o.baseState,firstBaseUpdate:f,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Qf=!1;function dl(){if(Qf){var t=eo;if(t!==null)throw t}}function hl(t,n,a,o){Qf=!1;var f=t.updateQueue;As=!1;var d=f.firstBaseUpdate,E=f.lastBaseUpdate,N=f.shared.pending;if(N!==null){f.shared.pending=null;var H=N,re=H.next;H.next=null,E===null?d=re:E.next=re,E=H;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,N=xe.lastBaseUpdate,N!==E&&(N===null?xe.firstBaseUpdate=re:N.next=re,xe.lastBaseUpdate=H))}if(d!==null){var Se=f.baseState;E=0,xe=re=H=null,N=d;do{var ue=N.lane&-536870913,de=ue!==N.lane;if(de?(Xt&ue)===ue:(o&ue)===ue){ue!==0&&ue===Jr&&(Qf=!0),xe!==null&&(xe=xe.next={lane:0,tag:N.tag,payload:N.payload,callback:null,next:null});e:{var $e=t,dt=N;ue=n;var dn=a;switch(dt.tag){case 1:if($e=dt.payload,typeof $e=="function"){Se=$e.call(dn,Se,ue);break e}Se=$e;break e;case 3:$e.flags=$e.flags&-65537|128;case 0:if($e=dt.payload,ue=typeof $e=="function"?$e.call(dn,Se,ue):$e,ue==null)break e;Se=v({},Se,ue);break e;case 2:As=!0}}ue=N.callback,ue!==null&&(t.flags|=64,de&&(t.flags|=8192),de=f.callbacks,de===null?f.callbacks=[ue]:de.push(ue))}else de={lane:ue,tag:N.tag,payload:N.payload,callback:N.callback,next:null},xe===null?(re=xe=de,H=Se):xe=xe.next=de,E|=ue;if(N=N.next,N===null){if(N=f.shared.pending,N===null)break;de=N,N=de.next,de.next=null,f.lastBaseUpdate=de,f.shared.pending=null}}while(!0);xe===null&&(H=Se),f.baseState=H,f.firstBaseUpdate=re,f.lastBaseUpdate=xe,d===null&&(f.shared.lanes=0),Ls|=E,t.lanes=E,t.memoizedState=Se}}function dg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function hg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)dg(a[t],n)}var io=P(null),Tc=P(0);function pg(t,n){t=ss,_e(Tc,t),_e(io,n),ss=t|n.baseLanes}function Jf(){_e(Tc,ss),_e(io,io.current)}function ed(){ss=Tc.current,Z(io),Z(Tc)}var ji=P(null),ca=null;function Cs(t){var n=t.alternate;_e(On,On.current&1),_e(ji,t),ca===null&&(n===null||io.current!==null||n.memoizedState!==null)&&(ca=t)}function td(t){_e(On,On.current),_e(ji,t),ca===null&&(ca=t)}function mg(t){t.tag===22?(_e(On,On.current),_e(ji,t),ca===null&&(ca=t)):Ns()}function Ns(){_e(On,On.current),_e(ji,ji.current)}function Xi(t){Z(ji),ca===t&&(ca=null),Z(On)}var On=P(0);function Ac(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||oh(a)||lh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Za=0,Tt=null,un=null,Gn=null,wc=!1,ao=!1,Mr=!1,Rc=0,pl=0,so=null,Jb=0;function An(){throw Error(s(321))}function nd(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ki(t[a],n[a]))return!1;return!0}function id(t,n,a,o,f,d){return Za=d,Tt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,L.H=t===null||t.memoizedState===null?Qg:_d,Mr=!1,d=a(o,f),Mr=!1,ao&&(d=xg(n,a,o,f)),gg(t),d}function gg(t){L.H=xl;var n=un!==null&&un.next!==null;if(Za=0,Gn=un=Tt=null,wc=!1,pl=0,so=null,n)throw Error(s(300));t===null||Hn||(t=t.dependencies,t!==null&&_c(t)&&(Hn=!0))}function xg(t,n,a,o){Tt=t;var f=0;do{if(ao&&(so=null),pl=0,ao=!1,25<=f)throw Error(s(301));if(f+=1,Gn=un=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}L.H=Jg,d=n(a,o)}while(ao);return d}function ey(){var t=L.H,n=t.useState()[0];return n=typeof n.then=="function"?ml(n):n,t=t.useState()[0],(un!==null?un.memoizedState:null)!==t&&(Tt.flags|=1024),n}function ad(){var t=Rc!==0;return Rc=0,t}function sd(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function rd(t){if(wc){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}wc=!1}Za=0,Gn=un=Tt=null,ao=!1,pl=Rc=0,so=null}function Si(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gn===null?Tt.memoizedState=Gn=t:Gn=Gn.next=t,Gn}function Dn(){if(un===null){var t=Tt.alternate;t=t!==null?t.memoizedState:null}else t=un.next;var n=Gn===null?Tt.memoizedState:Gn.next;if(n!==null)Gn=n,un=t;else{if(t===null)throw Tt.alternate===null?Error(s(467)):Error(s(310));un=t,t={memoizedState:un.memoizedState,baseState:un.baseState,baseQueue:un.baseQueue,queue:un.queue,next:null},Gn===null?Tt.memoizedState=Gn=t:Gn=Gn.next=t}return Gn}function Cc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ml(t){var n=pl;return pl+=1,so===null&&(so=[]),t=og(so,t,n),n=Tt,(Gn===null?n.memoizedState:Gn.next)===null&&(n=n.alternate,L.H=n===null||n.memoizedState===null?Qg:_d),t}function Nc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ml(t);if(t.$$typeof===O)return ai(t)}throw Error(s(438,String(t)))}function od(t){var n=null,a=Tt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=Tt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(f){return f.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Cc(),Tt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=$;return n.index++,a}function Qa(t,n){return typeof n=="function"?n(t):n}function Oc(t){var n=Dn();return ld(n,un,t)}function ld(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var f=t.baseQueue,d=o.pending;if(d!==null){if(f!==null){var E=f.next;f.next=d.next,d.next=E}n.baseQueue=f=d,o.pending=null}if(d=t.baseState,f===null)t.memoizedState=d;else{n=f.next;var N=E=null,H=null,re=n,xe=!1;do{var Se=re.lane&-536870913;if(Se!==re.lane?(Xt&Se)===Se:(Za&Se)===Se){var ue=re.revertLane;if(ue===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),Se===Jr&&(xe=!0);else if((Za&ue)===ue){re=re.next,ue===Jr&&(xe=!0);continue}else Se={lane:0,revertLane:re.revertLane,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},H===null?(N=H=Se,E=d):H=H.next=Se,Tt.lanes|=ue,Ls|=ue;Se=re.action,Mr&&a(d,Se),d=re.hasEagerState?re.eagerState:a(d,Se)}else ue={lane:Se,revertLane:re.revertLane,gesture:re.gesture,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},H===null?(N=H=ue,E=d):H=H.next=ue,Tt.lanes|=Se,Ls|=Se;re=re.next}while(re!==null&&re!==n);if(H===null?E=d:H.next=N,!ki(d,t.memoizedState)&&(Hn=!0,xe&&(a=eo,a!==null)))throw a;t.memoizedState=d,t.baseState=E,t.baseQueue=H,o.lastRenderedState=d}return f===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function cd(t){var n=Dn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,f=a.pending,d=n.memoizedState;if(f!==null){a.pending=null;var E=f=f.next;do d=t(d,E.action),E=E.next;while(E!==f);ki(d,n.memoizedState)||(Hn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function _g(t,n,a){var o=Tt,f=Dn(),d=qt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var E=!ki((un||f).memoizedState,a);if(E&&(f.memoizedState=a,Hn=!0),f=f.queue,dd(yg.bind(null,o,f,t),[t]),f.getSnapshot!==n||E||Gn!==null&&Gn.memoizedState.tag&1){if(o.flags|=2048,ro(9,{destroy:void 0},bg.bind(null,o,f,a,n),null),_n===null)throw Error(s(349));d||(Za&127)!==0||vg(o,n,a)}return a}function vg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Tt.updateQueue,n===null?(n=Cc(),Tt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function bg(t,n,a,o){n.value=a,n.getSnapshot=o,Sg(n)&&Eg(t)}function yg(t,n,a){return a(function(){Sg(n)&&Eg(t)})}function Sg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ki(t,a)}catch{return!0}}function Eg(t){var n=mr(t,2);n!==null&&Li(n,t,2)}function ud(t){var n=Si();if(typeof t=="function"){var a=t;if(t=a(),Mr){Le(!0);try{a()}finally{Le(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qa,lastRenderedState:t},n}function Mg(t,n,a,o){return t.baseState=a,ld(t,un,typeof o=="function"?o:Qa)}function ty(t,n,a,o,f){if(Ic(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(E){d.listeners.push(E)}};L.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,Tg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function Tg(t,n){var a=n.action,o=n.payload,f=t.state;if(n.isTransition){var d=L.T,E={};L.T=E;try{var N=a(f,o),H=L.S;H!==null&&H(E,N),Ag(t,n,N)}catch(re){fd(t,n,re)}finally{d!==null&&E.types!==null&&(d.types=E.types),L.T=d}}else try{d=a(f,o),Ag(t,n,d)}catch(re){fd(t,n,re)}}function Ag(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){wg(t,n,o)},function(o){return fd(t,n,o)}):wg(t,n,a)}function wg(t,n,a){n.status="fulfilled",n.value=a,Rg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Tg(t,a)))}function fd(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Rg(n),n=n.next;while(n!==o)}t.action=null}function Rg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Cg(t,n){return n}function Ng(t,n){if(qt){var a=_n.formState;if(a!==null){e:{var o=Tt;if(qt){if(vn){t:{for(var f=vn,d=la;f.nodeType!==8;){if(!d){f=null;break t}if(f=ua(f.nextSibling),f===null){f=null;break t}}d=f.data,f=d==="F!"||d==="F"?f:null}if(f){vn=ua(f.nextSibling),o=f.data==="F!";break e}}Ms(o)}o=!1}o&&(n=a[0])}}return a=Si(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cg,lastRenderedState:n},a.queue=o,a=$g.bind(null,Tt,o),o.dispatch=a,o=ud(!1),d=xd.bind(null,Tt,!1,o.queue),o=Si(),f={state:n,dispatch:null,action:t,pending:null},o.queue=f,a=ty.bind(null,Tt,f,d,a),f.dispatch=a,o.memoizedState=t,[n,a,!1]}function Og(t){var n=Dn();return Dg(n,un,t)}function Dg(t,n,a){if(n=ld(t,n,Cg)[0],t=Oc(Qa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ml(n)}catch(E){throw E===to?yc:E}else o=n;n=Dn();var f=n.queue,d=f.dispatch;return a!==n.memoizedState&&(Tt.flags|=2048,ro(9,{destroy:void 0},ny.bind(null,f,a),null)),[o,d,t]}function ny(t,n){t.action=n}function Lg(t){var n=Dn(),a=un;if(a!==null)return Dg(n,a,t);Dn(),n=n.memoizedState,a=Dn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function ro(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=Tt.updateQueue,n===null&&(n=Cc(),Tt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Ig(){return Dn().memoizedState}function Dc(t,n,a,o){var f=Si();Tt.flags|=t,f.memoizedState=ro(1|n,{destroy:void 0},a,o===void 0?null:o)}function Lc(t,n,a,o){var f=Dn();o=o===void 0?null:o;var d=f.memoizedState.inst;un!==null&&o!==null&&nd(o,un.memoizedState.deps)?f.memoizedState=ro(n,d,a,o):(Tt.flags|=t,f.memoizedState=ro(1|n,d,a,o))}function Ug(t,n){Dc(8390656,8,t,n)}function dd(t,n){Lc(2048,8,t,n)}function iy(t){Tt.flags|=4;var n=Tt.updateQueue;if(n===null)n=Cc(),Tt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Pg(t){var n=Dn().memoizedState;return iy({ref:n,nextImpl:t}),function(){if((an&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Fg(t,n){return Lc(4,2,t,n)}function Bg(t,n){return Lc(4,4,t,n)}function zg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Gg(t,n,a){a=a!=null?a.concat([t]):null,Lc(4,4,zg.bind(null,n,t),a)}function hd(){}function Hg(t,n){var a=Dn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&nd(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function kg(t,n){var a=Dn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&nd(n,o[1]))return o[0];if(o=t(),Mr){Le(!0);try{t()}finally{Le(!1)}}return a.memoizedState=[o,n],o}function pd(t,n,a){return a===void 0||(Za&1073741824)!==0&&(Xt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=V0(),Tt.lanes|=t,Ls|=t,a)}function Vg(t,n,a,o){return ki(a,n)?a:io.current!==null?(t=pd(t,a,o),ki(t,n)||(Hn=!0),t):(Za&42)===0||(Za&1073741824)!==0&&(Xt&261930)===0?(Hn=!0,t.memoizedState=a):(t=V0(),Tt.lanes|=t,Ls|=t,n)}function jg(t,n,a,o,f){var d=z.p;z.p=d!==0&&8>d?d:8;var E=L.T,N={};L.T=N,xd(t,!1,n,a);try{var H=f(),re=L.S;if(re!==null&&re(N,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var xe=Qb(H,o);gl(t,n,xe,qi(t))}else gl(t,n,o,qi(t))}catch(Se){gl(t,n,{then:function(){},status:"rejected",reason:Se},qi())}finally{z.p=d,E!==null&&N.types!==null&&(E.types=N.types),L.T=E}}function ay(){}function md(t,n,a,o){if(t.tag!==5)throw Error(s(476));var f=Xg(t).queue;jg(t,f,n,W,a===null?ay:function(){return Yg(t),a(o)})}function Xg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qa,lastRenderedState:W},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Yg(t){var n=Xg(t);n.next===null&&(n=t.alternate.memoizedState),gl(t,n.next.queue,{},qi())}function gd(){return ai(Ll)}function Wg(){return Dn().memoizedState}function qg(){return Dn().memoizedState}function sy(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=qi();t=ws(a);var o=Rs(n,t,a);o!==null&&(Li(o,n,a),fl(o,n,a)),n={cache:Xf()},t.payload=n;return}n=n.return}}function ry(t,n,a){var o=qi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ic(t)?Kg(n,a):(a=If(t,n,a,o),a!==null&&(Li(a,t,o),Zg(a,n,o)))}function $g(t,n,a){var o=qi();gl(t,n,a,o)}function gl(t,n,a,o){var f={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ic(t))Kg(n,f);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var E=n.lastRenderedState,N=d(E,a);if(f.hasEagerState=!0,f.eagerState=N,ki(N,E))return pc(t,n,f,0),_n===null&&hc(),!1}catch{}if(a=If(t,n,f,o),a!==null)return Li(a,t,o),Zg(a,n,o),!0}return!1}function xd(t,n,a,o){if(o={lane:2,revertLane:$d(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ic(t)){if(n)throw Error(s(479))}else n=If(t,a,o,2),n!==null&&Li(n,t,2)}function Ic(t){var n=t.alternate;return t===Tt||n!==null&&n===Tt}function Kg(t,n){ao=wc=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Zg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Kn(t,a)}}var xl={readContext:ai,use:Nc,useCallback:An,useContext:An,useEffect:An,useImperativeHandle:An,useLayoutEffect:An,useInsertionEffect:An,useMemo:An,useReducer:An,useRef:An,useState:An,useDebugValue:An,useDeferredValue:An,useTransition:An,useSyncExternalStore:An,useId:An,useHostTransitionStatus:An,useFormState:An,useActionState:An,useOptimistic:An,useMemoCache:An,useCacheRefresh:An};xl.useEffectEvent=An;var Qg={readContext:ai,use:Nc,useCallback:function(t,n){return Si().memoizedState=[t,n===void 0?null:n],t},useContext:ai,useEffect:Ug,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Dc(4194308,4,zg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Dc(4194308,4,t,n)},useInsertionEffect:function(t,n){Dc(4,2,t,n)},useMemo:function(t,n){var a=Si();n=n===void 0?null:n;var o=t();if(Mr){Le(!0);try{t()}finally{Le(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Si();if(a!==void 0){var f=a(n);if(Mr){Le(!0);try{a(n)}finally{Le(!1)}}}else f=n;return o.memoizedState=o.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},o.queue=t,t=t.dispatch=ry.bind(null,Tt,t),[o.memoizedState,t]},useRef:function(t){var n=Si();return t={current:t},n.memoizedState=t},useState:function(t){t=ud(t);var n=t.queue,a=$g.bind(null,Tt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:hd,useDeferredValue:function(t,n){var a=Si();return pd(a,t,n)},useTransition:function(){var t=ud(!1);return t=jg.bind(null,Tt,t.queue,!0,!1),Si().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=Tt,f=Si();if(qt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),_n===null)throw Error(s(349));(Xt&127)!==0||vg(o,n,a)}f.memoizedState=a;var d={value:a,getSnapshot:n};return f.queue=d,Ug(yg.bind(null,o,d,t),[t]),o.flags|=2048,ro(9,{destroy:void 0},bg.bind(null,o,d,a,n),null),a},useId:function(){var t=Si(),n=_n.identifierPrefix;if(qt){var a=Na,o=Ca;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Rc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Jb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:gd,useFormState:Ng,useActionState:Ng,useOptimistic:function(t){var n=Si();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=xd.bind(null,Tt,!0,a),a.dispatch=n,[t,n]},useMemoCache:od,useCacheRefresh:function(){return Si().memoizedState=sy.bind(null,Tt)},useEffectEvent:function(t){var n=Si(),a={impl:t};return n.memoizedState=a,function(){if((an&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},_d={readContext:ai,use:Nc,useCallback:Hg,useContext:ai,useEffect:dd,useImperativeHandle:Gg,useInsertionEffect:Fg,useLayoutEffect:Bg,useMemo:kg,useReducer:Oc,useRef:Ig,useState:function(){return Oc(Qa)},useDebugValue:hd,useDeferredValue:function(t,n){var a=Dn();return Vg(a,un.memoizedState,t,n)},useTransition:function(){var t=Oc(Qa)[0],n=Dn().memoizedState;return[typeof t=="boolean"?t:ml(t),n]},useSyncExternalStore:_g,useId:Wg,useHostTransitionStatus:gd,useFormState:Og,useActionState:Og,useOptimistic:function(t,n){var a=Dn();return Mg(a,un,t,n)},useMemoCache:od,useCacheRefresh:qg};_d.useEffectEvent=Pg;var Jg={readContext:ai,use:Nc,useCallback:Hg,useContext:ai,useEffect:dd,useImperativeHandle:Gg,useInsertionEffect:Fg,useLayoutEffect:Bg,useMemo:kg,useReducer:cd,useRef:Ig,useState:function(){return cd(Qa)},useDebugValue:hd,useDeferredValue:function(t,n){var a=Dn();return un===null?pd(a,t,n):Vg(a,un.memoizedState,t,n)},useTransition:function(){var t=cd(Qa)[0],n=Dn().memoizedState;return[typeof t=="boolean"?t:ml(t),n]},useSyncExternalStore:_g,useId:Wg,useHostTransitionStatus:gd,useFormState:Lg,useActionState:Lg,useOptimistic:function(t,n){var a=Dn();return un!==null?Mg(a,un,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:od,useCacheRefresh:qg};Jg.useEffectEvent=Pg;function vd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var bd={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=qi(),f=ws(o);f.payload=n,a!=null&&(f.callback=a),n=Rs(t,f,o),n!==null&&(Li(n,t,o),fl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=qi(),f=ws(o);f.tag=1,f.payload=n,a!=null&&(f.callback=a),n=Rs(t,f,o),n!==null&&(Li(n,t,o),fl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=qi(),o=ws(a);o.tag=2,n!=null&&(o.callback=n),n=Rs(t,o,a),n!==null&&(Li(n,t,a),fl(n,t,a))}};function e0(t,n,a,o,f,d,E){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,E):n.prototype&&n.prototype.isPureReactComponent?!il(a,o)||!il(f,d):!0}function t0(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&bd.enqueueReplaceState(n,n.state,null)}function Tr(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=v({},a));for(var f in t)a[f]===void 0&&(a[f]=t[f])}return a}function n0(t){dc(t)}function i0(t){console.error(t)}function a0(t){dc(t)}function Uc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function s0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function yd(t,n,a){return a=ws(a),a.tag=3,a.payload={element:null},a.callback=function(){Uc(t,n)},a}function r0(t){return t=ws(t),t.tag=3,t}function o0(t,n,a,o){var f=a.type.getDerivedStateFromError;if(typeof f=="function"){var d=o.value;t.payload=function(){return f(d)},t.callback=function(){s0(n,a,o)}}var E=a.stateNode;E!==null&&typeof E.componentDidCatch=="function"&&(t.callback=function(){s0(n,a,o),typeof f!="function"&&(Is===null?Is=new Set([this]):Is.add(this));var N=o.stack;this.componentDidCatch(o.value,{componentStack:N!==null?N:""})})}function oy(t,n,a,o,f){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Qr(n,a,f,!0),a=ji.current,a!==null){switch(a.tag){case 31:case 13:return ca===null?Wc():a.alternate===null&&wn===0&&(wn=3),a.flags&=-257,a.flags|=65536,a.lanes=f,o===Sc?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Yd(t,o,f)),!1;case 22:return a.flags|=65536,o===Sc?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Yd(t,o,f)),!1}throw Error(s(435,a.tag))}return Yd(t,o,f),Wc(),!1}if(qt)return n=ji.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=f,o!==Gf&&(t=Error(s(422),{cause:o}),rl(sa(t,a)))):(o!==Gf&&(n=Error(s(423),{cause:o}),rl(sa(n,a))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,o=sa(o,a),f=yd(t.stateNode,o,f),Zf(t,f),wn!==4&&(wn=2)),!1;var d=Error(s(520),{cause:o});if(d=sa(d,a),Tl===null?Tl=[d]:Tl.push(d),wn!==4&&(wn=2),n===null)return!0;o=sa(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=f&-f,a.lanes|=t,t=yd(a.stateNode,o,t),Zf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Is===null||!Is.has(d))))return a.flags|=65536,f&=-f,a.lanes|=f,f=r0(f),o0(f,t,a,o),Zf(a,f),!1}a=a.return}while(a!==null);return!1}var Sd=Error(s(461)),Hn=!1;function si(t,n,a,o){n.child=t===null?fg(n,null,a,o):Er(n,t.child,a,o)}function l0(t,n,a,o,f){a=a.render;var d=n.ref;if("ref"in o){var E={};for(var N in o)N!=="ref"&&(E[N]=o[N])}else E=o;return vr(n),o=id(t,n,a,E,d,f),N=ad(),t!==null&&!Hn?(sd(t,n,f),Ja(t,n,f)):(qt&&N&&Bf(n),n.flags|=1,si(t,n,o,f),n.child)}function c0(t,n,a,o,f){if(t===null){var d=a.type;return typeof d=="function"&&!Uf(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,u0(t,n,d,o,f)):(t=gc(a.type,null,o,n,n.mode,f),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Nd(t,f)){var E=d.memoizedProps;if(a=a.compare,a=a!==null?a:il,a(E,o)&&t.ref===n.ref)return Ja(t,n,f)}return n.flags|=1,t=Wa(d,o),t.ref=n.ref,t.return=n,n.child=t}function u0(t,n,a,o,f){if(t!==null){var d=t.memoizedProps;if(il(d,o)&&t.ref===n.ref)if(Hn=!1,n.pendingProps=o=d,Nd(t,f))(t.flags&131072)!==0&&(Hn=!0);else return n.lanes=t.lanes,Ja(t,n,f)}return Ed(t,n,a,o,f)}function f0(t,n,a,o){var f=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,f=0;o!==null;)f=f|o.lanes|o.childLanes,o=o.sibling;o=f&~d}else o=0,n.child=null;return d0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&bc(n,d!==null?d.cachePool:null),d!==null?pg(n,d):Jf(),mg(n);else return o=n.lanes=536870912,d0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(bc(n,d.cachePool),pg(n,d),Ns(),n.memoizedState=null):(t!==null&&bc(n,null),Jf(),Ns());return si(t,n,f,a),n.child}function _l(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function d0(t,n,a,o,f){var d=Wf();return d=d===null?null:{parent:zn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&bc(n,null),Jf(),mg(n),t!==null&&Qr(t,n,o,!0),n.childLanes=f,null}function Pc(t,n){return n=Bc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function h0(t,n,a){return Er(n,t.child,null,a),t=Pc(n,n.pendingProps),t.flags|=2,Xi(n),n.memoizedState=null,t}function ly(t,n,a){var o=n.pendingProps,f=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(qt){if(o.mode==="hidden")return t=Pc(n,o),n.lanes=536870912,_l(null,t);if(td(n),(t=vn)?(t=Tx(t,la),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ss!==null?{id:Ca,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},a=Km(t),a.return=n,n.child=a,ii=n,vn=null)):t=null,t===null)throw Ms(n);return n.lanes=536870912,null}return Pc(n,o)}var d=t.memoizedState;if(d!==null){var E=d.dehydrated;if(td(n),f)if(n.flags&256)n.flags&=-257,n=h0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Hn||Qr(t,n,a,!1),f=(a&t.childLanes)!==0,Hn||f){if(o=_n,o!==null&&(E=In(o,a),E!==0&&E!==d.retryLane))throw d.retryLane=E,mr(t,E),Li(o,t,E),Sd;Wc(),n=h0(t,n,a)}else t=d.treeContext,vn=ua(E.nextSibling),ii=n,qt=!0,Es=null,la=!1,t!==null&&Jm(n,t),n=Pc(n,o),n.flags|=4096;return n}return t=Wa(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Fc(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Ed(t,n,a,o,f){return vr(n),a=id(t,n,a,o,void 0,f),o=ad(),t!==null&&!Hn?(sd(t,n,f),Ja(t,n,f)):(qt&&o&&Bf(n),n.flags|=1,si(t,n,a,f),n.child)}function p0(t,n,a,o,f,d){return vr(n),n.updateQueue=null,a=xg(n,o,a,f),gg(t),o=ad(),t!==null&&!Hn?(sd(t,n,d),Ja(t,n,d)):(qt&&o&&Bf(n),n.flags|=1,si(t,n,a,d),n.child)}function m0(t,n,a,o,f){if(vr(n),n.stateNode===null){var d=qr,E=a.contextType;typeof E=="object"&&E!==null&&(d=ai(E)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=bd,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},$f(n),E=a.contextType,d.context=typeof E=="object"&&E!==null?ai(E):qr,d.state=n.memoizedState,E=a.getDerivedStateFromProps,typeof E=="function"&&(vd(n,a,E,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(E=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),E!==d.state&&bd.enqueueReplaceState(d,d.state,null),hl(n,o,d,f),dl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var N=n.memoizedProps,H=Tr(a,N);d.props=H;var re=d.context,xe=a.contextType;E=qr,typeof xe=="object"&&xe!==null&&(E=ai(xe));var Se=a.getDerivedStateFromProps;xe=typeof Se=="function"||typeof d.getSnapshotBeforeUpdate=="function",N=n.pendingProps!==N,xe||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(N||re!==E)&&t0(n,d,o,E),As=!1;var ue=n.memoizedState;d.state=ue,hl(n,o,d,f),dl(),re=n.memoizedState,N||ue!==re||As?(typeof Se=="function"&&(vd(n,a,Se,o),re=n.memoizedState),(H=As||e0(n,a,H,o,ue,re,E))?(xe||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=re),d.props=o,d.state=re,d.context=E,o=H):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,Kf(t,n),E=n.memoizedProps,xe=Tr(a,E),d.props=xe,Se=n.pendingProps,ue=d.context,re=a.contextType,H=qr,typeof re=="object"&&re!==null&&(H=ai(re)),N=a.getDerivedStateFromProps,(re=typeof N=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(E!==Se||ue!==H)&&t0(n,d,o,H),As=!1,ue=n.memoizedState,d.state=ue,hl(n,o,d,f),dl();var de=n.memoizedState;E!==Se||ue!==de||As||t!==null&&t.dependencies!==null&&_c(t.dependencies)?(typeof N=="function"&&(vd(n,a,N,o),de=n.memoizedState),(xe=As||e0(n,a,xe,o,ue,de,H)||t!==null&&t.dependencies!==null&&_c(t.dependencies))?(re||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,de,H),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,de,H)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||E===t.memoizedProps&&ue===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||E===t.memoizedProps&&ue===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=de),d.props=o,d.state=de,d.context=H,o=xe):(typeof d.componentDidUpdate!="function"||E===t.memoizedProps&&ue===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||E===t.memoizedProps&&ue===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Fc(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=Er(n,t.child,null,f),n.child=Er(n,null,a,f)):si(t,n,a,f),n.memoizedState=d.state,t=n.child):t=Ja(t,n,f),t}function g0(t,n,a,o){return xr(),n.flags|=256,si(t,n,a,o),n.child}var Md={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Td(t){return{baseLanes:t,cachePool:sg()}}function Ad(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Wi),t}function x0(t,n,a){var o=n.pendingProps,f=!1,d=(n.flags&128)!==0,E;if((E=d)||(E=t!==null&&t.memoizedState===null?!1:(On.current&2)!==0),E&&(f=!0,n.flags&=-129),E=(n.flags&32)!==0,n.flags&=-33,t===null){if(qt){if(f?Cs(n):Ns(),(t=vn)?(t=Tx(t,la),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ss!==null?{id:Ca,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},a=Km(t),a.return=n,n.child=a,ii=n,vn=null)):t=null,t===null)throw Ms(n);return lh(t)?n.lanes=32:n.lanes=536870912,null}var N=o.children;return o=o.fallback,f?(Ns(),f=n.mode,N=Bc({mode:"hidden",children:N},f),o=gr(o,f,a,null),N.return=n,o.return=n,N.sibling=o,n.child=N,o=n.child,o.memoizedState=Td(a),o.childLanes=Ad(t,E,a),n.memoizedState=Md,_l(null,o)):(Cs(n),wd(n,N))}var H=t.memoizedState;if(H!==null&&(N=H.dehydrated,N!==null)){if(d)n.flags&256?(Cs(n),n.flags&=-257,n=Rd(t,n,a)):n.memoizedState!==null?(Ns(),n.child=t.child,n.flags|=128,n=null):(Ns(),N=o.fallback,f=n.mode,o=Bc({mode:"visible",children:o.children},f),N=gr(N,f,a,null),N.flags|=2,o.return=n,N.return=n,o.sibling=N,n.child=o,Er(n,t.child,null,a),o=n.child,o.memoizedState=Td(a),o.childLanes=Ad(t,E,a),n.memoizedState=Md,n=_l(null,o));else if(Cs(n),lh(N)){if(E=N.nextSibling&&N.nextSibling.dataset,E)var re=E.dgst;E=re,o=Error(s(419)),o.stack="",o.digest=E,rl({value:o,source:null,stack:null}),n=Rd(t,n,a)}else if(Hn||Qr(t,n,a,!1),E=(a&t.childLanes)!==0,Hn||E){if(E=_n,E!==null&&(o=In(E,a),o!==0&&o!==H.retryLane))throw H.retryLane=o,mr(t,o),Li(E,t,o),Sd;oh(N)||Wc(),n=Rd(t,n,a)}else oh(N)?(n.flags|=192,n.child=t.child,n=null):(t=H.treeContext,vn=ua(N.nextSibling),ii=n,qt=!0,Es=null,la=!1,t!==null&&Jm(n,t),n=wd(n,o.children),n.flags|=4096);return n}return f?(Ns(),N=o.fallback,f=n.mode,H=t.child,re=H.sibling,o=Wa(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,re!==null?N=Wa(re,N):(N=gr(N,f,a,null),N.flags|=2),N.return=n,o.return=n,o.sibling=N,n.child=o,_l(null,o),o=n.child,N=t.child.memoizedState,N===null?N=Td(a):(f=N.cachePool,f!==null?(H=zn._currentValue,f=f.parent!==H?{parent:H,pool:H}:f):f=sg(),N={baseLanes:N.baseLanes|a,cachePool:f}),o.memoizedState=N,o.childLanes=Ad(t,E,a),n.memoizedState=Md,_l(t.child,o)):(Cs(n),a=t.child,t=a.sibling,a=Wa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(E=n.deletions,E===null?(n.deletions=[t],n.flags|=16):E.push(t)),n.child=a,n.memoizedState=null,a)}function wd(t,n){return n=Bc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Bc(t,n){return t=Vi(22,t,null,n),t.lanes=0,t}function Rd(t,n,a){return Er(n,t.child,null,a),t=wd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function _0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Vf(t.return,n,a)}function Cd(t,n,a,o,f,d){var E=t.memoizedState;E===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:f,treeForkCount:d}:(E.isBackwards=n,E.rendering=null,E.renderingStartTime=0,E.last=o,E.tail=a,E.tailMode=f,E.treeForkCount=d)}function v0(t,n,a){var o=n.pendingProps,f=o.revealOrder,d=o.tail;o=o.children;var E=On.current,N=(E&2)!==0;if(N?(E=E&1|2,n.flags|=128):E&=1,_e(On,E),si(t,n,o,a),o=qt?sl:0,!N&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_0(t,a,n);else if(t.tag===19)_0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(f){case"forwards":for(a=n.child,f=null;a!==null;)t=a.alternate,t!==null&&Ac(t)===null&&(f=a),a=a.sibling;a=f,a===null?(f=n.child,n.child=null):(f=a.sibling,a.sibling=null),Cd(n,!1,f,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,f=n.child,n.child=null;f!==null;){if(t=f.alternate,t!==null&&Ac(t)===null){n.child=f;break}t=f.sibling,f.sibling=a,a=f,f=t}Cd(n,!0,a,null,d,o);break;case"together":Cd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ja(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Ls|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Qr(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Wa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Wa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Nd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&_c(t)))}function cy(t,n,a){switch(n.tag){case 3:we(n,n.stateNode.containerInfo),Ts(n,zn,t.memoizedState.cache),xr();break;case 27:case 5:Ze(n);break;case 4:we(n,n.stateNode.containerInfo);break;case 10:Ts(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,td(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Cs(n),n.flags|=128,null):(a&n.child.childLanes)!==0?x0(t,n,a):(Cs(n),t=Ja(t,n,a),t!==null?t.sibling:null);Cs(n);break;case 19:var f=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Qr(t,n,a,!1),o=(a&n.childLanes)!==0),f){if(o)return v0(t,n,a);n.flags|=128}if(f=n.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),_e(On,On.current),o)break;return null;case 22:return n.lanes=0,f0(t,n,a,n.pendingProps);case 24:Ts(n,zn,t.memoizedState.cache)}return Ja(t,n,a)}function b0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Hn=!0;else{if(!Nd(t,a)&&(n.flags&128)===0)return Hn=!1,cy(t,n,a);Hn=(t.flags&131072)!==0}else Hn=!1,qt&&(n.flags&1048576)!==0&&Qm(n,sl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=yr(n.elementType),n.type=t,typeof t=="function")Uf(t)?(o=Tr(t,o),n.tag=1,n=m0(null,n,t,o,a)):(n.tag=0,n=Ed(null,n,t,o,a));else{if(t!=null){var f=t.$$typeof;if(f===U){n.tag=11,n=l0(null,n,t,o,a);break e}else if(f===B){n.tag=14,n=c0(null,n,t,o,a);break e}}throw n=oe(t)||t,Error(s(306,n,""))}}return n;case 0:return Ed(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,f=Tr(o,n.pendingProps),m0(t,n,o,f,a);case 3:e:{if(we(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;f=d.element,Kf(t,n),hl(n,o,null,a);var E=n.memoizedState;if(o=E.cache,Ts(n,zn,o),o!==d.cache&&jf(n,[zn],a,!0),dl(),o=E.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:E.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=g0(t,n,o,a);break e}else if(o!==f){f=sa(Error(s(424)),n),rl(f),n=g0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,vn=ua(t.firstChild),ii=n,qt=!0,Es=null,la=!0,a=fg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(xr(),o===f){n=Ja(t,n,a);break e}si(t,n,o,a)}n=n.child}return n;case 26:return Fc(t,n),t===null?(a=Ox(n.type,null,n.pendingProps,null))?n.memoizedState=a:qt||(a=n.type,t=n.pendingProps,o=eu(ee.current).createElement(a),o[gn]=n,o[En]=t,ri(o,a,t),yn(o),n.stateNode=o):n.memoizedState=Ox(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Ze(n),t===null&&qt&&(o=n.stateNode=Rx(n.type,n.pendingProps,ee.current),ii=n,la=!0,f=vn,Bs(n.type)?(ch=f,vn=ua(o.firstChild)):vn=f),si(t,n,n.pendingProps.children,a),Fc(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&qt&&((f=o=vn)&&(o=zy(o,n.type,n.pendingProps,la),o!==null?(n.stateNode=o,ii=n,vn=ua(o.firstChild),la=!1,f=!0):f=!1),f||Ms(n)),Ze(n),f=n.type,d=n.pendingProps,E=t!==null?t.memoizedProps:null,o=d.children,ah(f,d)?o=null:E!==null&&ah(f,E)&&(n.flags|=32),n.memoizedState!==null&&(f=id(t,n,ey,null,null,a),Ll._currentValue=f),Fc(t,n),si(t,n,o,a),n.child;case 6:return t===null&&qt&&((t=a=vn)&&(a=Gy(a,n.pendingProps,la),a!==null?(n.stateNode=a,ii=n,vn=null,t=!0):t=!1),t||Ms(n)),null;case 13:return x0(t,n,a);case 4:return we(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Er(n,null,o,a):si(t,n,o,a),n.child;case 11:return l0(t,n,n.type,n.pendingProps,a);case 7:return si(t,n,n.pendingProps,a),n.child;case 8:return si(t,n,n.pendingProps.children,a),n.child;case 12:return si(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ts(n,n.type,o.value),si(t,n,o.children,a),n.child;case 9:return f=n.type._context,o=n.pendingProps.children,vr(n),f=ai(f),o=o(f),n.flags|=1,si(t,n,o,a),n.child;case 14:return c0(t,n,n.type,n.pendingProps,a);case 15:return u0(t,n,n.type,n.pendingProps,a);case 19:return v0(t,n,a);case 31:return ly(t,n,a);case 22:return f0(t,n,a,n.pendingProps);case 24:return vr(n),o=ai(zn),t===null?(f=Wf(),f===null&&(f=_n,d=Xf(),f.pooledCache=d,d.refCount++,d!==null&&(f.pooledCacheLanes|=a),f=d),n.memoizedState={parent:o,cache:f},$f(n),Ts(n,zn,f)):((t.lanes&a)!==0&&(Kf(t,n),hl(n,null,null,a),dl()),f=t.memoizedState,d=n.memoizedState,f.parent!==o?(f={parent:o,cache:o},n.memoizedState=f,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=f),Ts(n,zn,o)):(o=d.cache,Ts(n,zn,o),o!==f.cache&&jf(n,[zn],a,!0))),si(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function es(t){t.flags|=4}function Od(t,n,a,o,f){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(f&335544128)===f)if(t.stateNode.complete)t.flags|=8192;else if(W0())t.flags|=8192;else throw Sr=Sc,qf}else t.flags&=-16777217}function y0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Px(n))if(W0())t.flags|=8192;else throw Sr=Sc,qf}function zc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Re():536870912,t.lanes|=n,uo|=n)}function vl(t,n){if(!qt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function bn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var f=t.child;f!==null;)a|=f.lanes|f.childLanes,o|=f.subtreeFlags&65011712,o|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)a|=f.lanes|f.childLanes,o|=f.subtreeFlags,o|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function uy(t,n,a){var o=n.pendingProps;switch(zf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bn(n),null;case 1:return bn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Ka(zn),Ge(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Zr(n)?es(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Hf())),bn(n),null;case 26:var f=n.type,d=n.memoizedState;return t===null?(es(n),d!==null?(bn(n),y0(n,d)):(bn(n),Od(n,f,null,o,a))):d?d!==t.memoizedState?(es(n),bn(n),y0(n,d)):(bn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&es(n),bn(n),Od(n,f,t,o,a)),null;case 27:if(Ke(n),a=ee.current,f=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&es(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}t=Ae.current,Zr(n)?eg(n):(t=Rx(f,o,a),n.stateNode=t,es(n))}return bn(n),null;case 5:if(Ke(n),f=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&es(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return bn(n),null}if(d=Ae.current,Zr(n))eg(n);else{var E=eu(ee.current);switch(d){case 1:d=E.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:d=E.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":d=E.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":d=E.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":d=E.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?E.createElement("select",{is:o.is}):E.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?E.createElement(f,{is:o.is}):E.createElement(f)}}d[gn]=n,d[En]=o;e:for(E=n.child;E!==null;){if(E.tag===5||E.tag===6)d.appendChild(E.stateNode);else if(E.tag!==4&&E.tag!==27&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===n)break e;for(;E.sibling===null;){if(E.return===null||E.return===n)break e;E=E.return}E.sibling.return=E.return,E=E.sibling}n.stateNode=d;e:switch(ri(d,f,o),f){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&es(n)}}return bn(n),Od(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&es(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=ee.current,Zr(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,f=ii,f!==null)switch(f.tag){case 27:case 5:o=f.memoizedProps}t[gn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||xx(t.nodeValue,a)),t||Ms(n,!0)}else t=eu(t).createTextNode(o),t[gn]=n,n.stateNode=t}return bn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Zr(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[gn]=n}else xr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),t=!1}else a=Hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Xi(n),n):(Xi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return bn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=Zr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!f)throw Error(s(318));if(f=n.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(s(317));f[gn]=n}else xr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;bn(n),f=!1}else f=Hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return n.flags&256?(Xi(n),n):(Xi(n),null)}return Xi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,f=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(f=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==f&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),zc(n,n.updateQueue),bn(n),null);case 4:return Ge(),t===null&&Jd(n.stateNode.containerInfo),bn(n),null;case 10:return Ka(n.type),bn(n),null;case 19:if(Z(On),o=n.memoizedState,o===null)return bn(n),null;if(f=(n.flags&128)!==0,d=o.rendering,d===null)if(f)vl(o,!1);else{if(wn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=Ac(t),d!==null){for(n.flags|=128,vl(o,!1),t=d.updateQueue,n.updateQueue=t,zc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)$m(a,t),a=a.sibling;return _e(On,On.current&1|2),qt&&qa(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&ve()>jc&&(n.flags|=128,f=!0,vl(o,!1),n.lanes=4194304)}else{if(!f)if(t=Ac(d),t!==null){if(n.flags|=128,f=!0,t=t.updateQueue,n.updateQueue=t,zc(n,t),vl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!qt)return bn(n),null}else 2*ve()-o.renderingStartTime>jc&&a!==536870912&&(n.flags|=128,f=!0,vl(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ve(),t.sibling=null,a=On.current,_e(On,f?a&1|2:a&1),qt&&qa(n,o.treeForkCount),t):(bn(n),null);case 22:case 23:return Xi(n),ed(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(bn(n),n.subtreeFlags&6&&(n.flags|=8192)):bn(n),a=n.updateQueue,a!==null&&zc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Z(br),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Ka(zn),bn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function fy(t,n){switch(zf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Ka(zn),Ge(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Ke(n),null;case 31:if(n.memoizedState!==null){if(Xi(n),n.alternate===null)throw Error(s(340));xr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Xi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));xr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Z(On),null;case 4:return Ge(),null;case 10:return Ka(n.type),null;case 22:case 23:return Xi(n),ed(),t!==null&&Z(br),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Ka(zn),null;case 25:return null;default:return null}}function S0(t,n){switch(zf(n),n.tag){case 3:Ka(zn),Ge();break;case 26:case 27:case 5:Ke(n);break;case 4:Ge();break;case 31:n.memoizedState!==null&&Xi(n);break;case 13:Xi(n);break;case 19:Z(On);break;case 10:Ka(n.type);break;case 22:case 23:Xi(n),ed(),t!==null&&Z(br);break;case 24:Ka(zn)}}function bl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var f=o.next;a=f;do{if((a.tag&t)===t){o=void 0;var d=a.create,E=a.inst;o=d(),E.destroy=o}a=a.next}while(a!==f)}}catch(N){ln(n,n.return,N)}}function Os(t,n,a){try{var o=n.updateQueue,f=o!==null?o.lastEffect:null;if(f!==null){var d=f.next;o=d;do{if((o.tag&t)===t){var E=o.inst,N=E.destroy;if(N!==void 0){E.destroy=void 0,f=n;var H=a,re=N;try{re()}catch(xe){ln(f,H,xe)}}}o=o.next}while(o!==d)}}catch(xe){ln(n,n.return,xe)}}function E0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{hg(n,a)}catch(o){ln(t,t.return,o)}}}function M0(t,n,a){a.props=Tr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){ln(t,n,o)}}function yl(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(f){ln(t,n,f)}}function Oa(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(f){ln(t,n,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(f){ln(t,n,f)}else a.current=null}function T0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(f){ln(t,t.return,f)}}function Dd(t,n,a){try{var o=t.stateNode;Ly(o,t.type,a,n),o[En]=n}catch(f){ln(t,t.return,f)}}function A0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Bs(t.type)||t.tag===4}function Ld(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||A0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Bs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Id(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Gi));else if(o!==4&&(o===27&&Bs(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Id(t,n,a),t=t.sibling;t!==null;)Id(t,n,a),t=t.sibling}function Gc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Bs(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Gc(t,n,a),t=t.sibling;t!==null;)Gc(t,n,a),t=t.sibling}function w0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,f=n.attributes;f.length;)n.removeAttributeNode(f[0]);ri(n,o,a),n[gn]=t,n[En]=a}catch(d){ln(t,t.return,d)}}var ts=!1,kn=!1,Ud=!1,R0=typeof WeakSet=="function"?WeakSet:Set,Qn=null;function dy(t,n){if(t=t.containerInfo,nh=ou,t=Gm(t),Rf(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var f=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var E=0,N=-1,H=-1,re=0,xe=0,Se=t,ue=null;t:for(;;){for(var de;Se!==a||f!==0&&Se.nodeType!==3||(N=E+f),Se!==d||o!==0&&Se.nodeType!==3||(H=E+o),Se.nodeType===3&&(E+=Se.nodeValue.length),(de=Se.firstChild)!==null;)ue=Se,Se=de;for(;;){if(Se===t)break t;if(ue===a&&++re===f&&(N=E),ue===d&&++xe===o&&(H=E),(de=Se.nextSibling)!==null)break;Se=ue,ue=Se.parentNode}Se=de}a=N===-1||H===-1?null:{start:N,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(ih={focusedElem:t,selectionRange:a},ou=!1,Qn=n;Qn!==null;)if(n=Qn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Qn=t;else for(;Qn!==null;){switch(n=Qn,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)f=t[a],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,f=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var $e=Tr(a.type,f);t=o.getSnapshotBeforeUpdate($e,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(dt){ln(a,a.return,dt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)rh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":rh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Qn=t;break}Qn=n.return}}function C0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:is(t,a),o&4&&bl(5,a);break;case 1:if(is(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(E){ln(a,a.return,E)}else{var f=Tr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(f,n,t.__reactInternalSnapshotBeforeUpdate)}catch(E){ln(a,a.return,E)}}o&64&&E0(a),o&512&&yl(a,a.return);break;case 3:if(is(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{hg(t,n)}catch(E){ln(a,a.return,E)}}break;case 27:n===null&&o&4&&w0(a);case 26:case 5:is(t,a),n===null&&o&4&&T0(a),o&512&&yl(a,a.return);break;case 12:is(t,a);break;case 31:is(t,a),o&4&&D0(t,a);break;case 13:is(t,a),o&4&&L0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=yy.bind(null,a),Hy(t,a))));break;case 22:if(o=a.memoizedState!==null||ts,!o){n=n!==null&&n.memoizedState!==null||kn,f=ts;var d=kn;ts=o,(kn=n)&&!d?as(t,a,(a.subtreeFlags&8772)!==0):is(t,a),ts=f,kn=d}break;case 30:break;default:is(t,a)}}function N0(t){var n=t.alternate;n!==null&&(t.alternate=null,N0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Mi(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Sn=null,Ci=!1;function ns(t,n,a){for(a=a.child;a!==null;)O0(t,n,a),a=a.sibling}function O0(t,n,a){if(pe&&typeof pe.onCommitFiberUnmount=="function")try{pe.onCommitFiberUnmount(fe,a)}catch{}switch(a.tag){case 26:kn||Oa(a,n),ns(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:kn||Oa(a,n);var o=Sn,f=Ci;Bs(a.type)&&(Sn=a.stateNode,Ci=!1),ns(t,n,a),Nl(a.stateNode),Sn=o,Ci=f;break;case 5:kn||Oa(a,n);case 6:if(o=Sn,f=Ci,Sn=null,ns(t,n,a),Sn=o,Ci=f,Sn!==null)if(Ci)try{(Sn.nodeType===9?Sn.body:Sn.nodeName==="HTML"?Sn.ownerDocument.body:Sn).removeChild(a.stateNode)}catch(d){ln(a,n,d)}else try{Sn.removeChild(a.stateNode)}catch(d){ln(a,n,d)}break;case 18:Sn!==null&&(Ci?(t=Sn,Ex(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),vo(t)):Ex(Sn,a.stateNode));break;case 4:o=Sn,f=Ci,Sn=a.stateNode.containerInfo,Ci=!0,ns(t,n,a),Sn=o,Ci=f;break;case 0:case 11:case 14:case 15:Os(2,a,n),kn||Os(4,a,n),ns(t,n,a);break;case 1:kn||(Oa(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&M0(a,n,o)),ns(t,n,a);break;case 21:ns(t,n,a);break;case 22:kn=(o=kn)||a.memoizedState!==null,ns(t,n,a),kn=o;break;default:ns(t,n,a)}}function D0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{vo(t)}catch(a){ln(n,n.return,a)}}}function L0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{vo(t)}catch(a){ln(n,n.return,a)}}function hy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new R0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new R0),n;default:throw Error(s(435,t.tag))}}function Hc(t,n){var a=hy(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var f=Sy.bind(null,t,o);o.then(f,f)}})}function Ni(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var f=a[o],d=t,E=n,N=E;e:for(;N!==null;){switch(N.tag){case 27:if(Bs(N.type)){Sn=N.stateNode,Ci=!1;break e}break;case 5:Sn=N.stateNode,Ci=!1;break e;case 3:case 4:Sn=N.stateNode.containerInfo,Ci=!0;break e}N=N.return}if(Sn===null)throw Error(s(160));O0(d,E,f),Sn=null,Ci=!1,d=f.alternate,d!==null&&(d.return=null),f.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)I0(n,t),n=n.sibling}var ba=null;function I0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ni(n,t),Oi(t),o&4&&(Os(3,t,t.return),bl(3,t),Os(5,t,t.return));break;case 1:Ni(n,t),Oi(t),o&512&&(kn||a===null||Oa(a,a.return)),o&64&&ts&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var f=ba;if(Ni(n,t),Oi(t),o&512&&(kn||a===null||Oa(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,f=f.ownerDocument||f;t:switch(o){case"title":d=f.getElementsByTagName("title")[0],(!d||d[ci]||d[gn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=f.createElement(o),f.head.insertBefore(d,f.querySelector("head > title"))),ri(d,o,a),d[gn]=t,yn(d),o=d;break e;case"link":var E=Ix("link","href",f).get(o+(a.href||""));if(E){for(var N=0;N<E.length;N++)if(d=E[N],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){E.splice(N,1);break t}}d=f.createElement(o),ri(d,o,a),f.head.appendChild(d);break;case"meta":if(E=Ix("meta","content",f).get(o+(a.content||""))){for(N=0;N<E.length;N++)if(d=E[N],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){E.splice(N,1);break t}}d=f.createElement(o),ri(d,o,a),f.head.appendChild(d);break;default:throw Error(s(468,o))}d[gn]=t,yn(d),o=d}t.stateNode=o}else Ux(f,t.type,t.stateNode);else t.stateNode=Lx(f,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Ux(f,t.type,t.stateNode):Lx(f,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Dd(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ni(n,t),Oi(t),o&512&&(kn||a===null||Oa(a,a.return)),a!==null&&o&4&&Dd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ni(n,t),Oi(t),o&512&&(kn||a===null||Oa(a,a.return)),t.flags&32){f=t.stateNode;try{_i(f,"")}catch($e){ln(t,t.return,$e)}}o&4&&t.stateNode!=null&&(f=t.memoizedProps,Dd(t,f,a!==null?a.memoizedProps:f)),o&1024&&(Ud=!0);break;case 6:if(Ni(n,t),Oi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch($e){ln(t,t.return,$e)}}break;case 3:if(iu=null,f=ba,ba=tu(n.containerInfo),Ni(n,t),ba=f,Oi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{vo(n.containerInfo)}catch($e){ln(t,t.return,$e)}Ud&&(Ud=!1,U0(t));break;case 4:o=ba,ba=tu(t.stateNode.containerInfo),Ni(n,t),Oi(t),ba=o;break;case 12:Ni(n,t),Oi(t);break;case 31:Ni(n,t),Oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Hc(t,o)));break;case 13:Ni(n,t),Oi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Vc=ve()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Hc(t,o)));break;case 22:f=t.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,re=ts,xe=kn;if(ts=re||f,kn=xe||H,Ni(n,t),kn=xe,ts=re,Oi(t),o&8192)e:for(n=t.stateNode,n._visibility=f?n._visibility&-2:n._visibility|1,f&&(a===null||H||ts||kn||Ar(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(d=H.stateNode,f)E=d.style,typeof E.setProperty=="function"?E.setProperty("display","none","important"):E.display="none";else{N=H.stateNode;var Se=H.memoizedProps.style,ue=Se!=null&&Se.hasOwnProperty("display")?Se.display:null;N.style.display=ue==null||typeof ue=="boolean"?"":(""+ue).trim()}}catch($e){ln(H,H.return,$e)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=f?"":H.memoizedProps}catch($e){ln(H,H.return,$e)}}}else if(n.tag===18){if(a===null){H=n;try{var de=H.stateNode;f?Mx(de,!0):Mx(H.stateNode,!1)}catch($e){ln(H,H.return,$e)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Hc(t,a))));break;case 19:Ni(n,t),Oi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Hc(t,o)));break;case 30:break;case 21:break;default:Ni(n,t),Oi(t)}}function Oi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(A0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var f=a.stateNode,d=Ld(t);Gc(t,d,f);break;case 5:var E=a.stateNode;a.flags&32&&(_i(E,""),a.flags&=-33);var N=Ld(t);Gc(t,N,E);break;case 3:case 4:var H=a.stateNode.containerInfo,re=Ld(t);Id(t,re,H);break;default:throw Error(s(161))}}catch(xe){ln(t,t.return,xe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function U0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;U0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function is(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)C0(t,n.alternate,n),n=n.sibling}function Ar(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Os(4,n,n.return),Ar(n);break;case 1:Oa(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&M0(n,n.return,a),Ar(n);break;case 27:Nl(n.stateNode);case 26:case 5:Oa(n,n.return),Ar(n);break;case 22:n.memoizedState===null&&Ar(n);break;case 30:Ar(n);break;default:Ar(n)}t=t.sibling}}function as(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,f=t,d=n,E=d.flags;switch(d.tag){case 0:case 11:case 15:as(f,d,a),bl(4,d);break;case 1:if(as(f,d,a),o=d,f=o.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(re){ln(o,o.return,re)}if(o=d,f=o.updateQueue,f!==null){var N=o.stateNode;try{var H=f.shared.hiddenCallbacks;if(H!==null)for(f.shared.hiddenCallbacks=null,f=0;f<H.length;f++)dg(H[f],N)}catch(re){ln(o,o.return,re)}}a&&E&64&&E0(d),yl(d,d.return);break;case 27:w0(d);case 26:case 5:as(f,d,a),a&&o===null&&E&4&&T0(d),yl(d,d.return);break;case 12:as(f,d,a);break;case 31:as(f,d,a),a&&E&4&&D0(f,d);break;case 13:as(f,d,a),a&&E&4&&L0(f,d);break;case 22:d.memoizedState===null&&as(f,d,a),yl(d,d.return);break;case 30:break;default:as(f,d,a)}n=n.sibling}}function Pd(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&ol(a))}function Fd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ol(t))}function ya(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)P0(t,n,a,o),n=n.sibling}function P0(t,n,a,o){var f=n.flags;switch(n.tag){case 0:case 11:case 15:ya(t,n,a,o),f&2048&&bl(9,n);break;case 1:ya(t,n,a,o);break;case 3:ya(t,n,a,o),f&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ol(t)));break;case 12:if(f&2048){ya(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,E=d.id,N=d.onPostCommit;typeof N=="function"&&N(E,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(H){ln(n,n.return,H)}}else ya(t,n,a,o);break;case 31:ya(t,n,a,o);break;case 13:ya(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,E=n.alternate,n.memoizedState!==null?d._visibility&2?ya(t,n,a,o):Sl(t,n):d._visibility&2?ya(t,n,a,o):(d._visibility|=2,oo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),f&2048&&Pd(E,n);break;case 24:ya(t,n,a,o),f&2048&&Fd(n.alternate,n);break;default:ya(t,n,a,o)}}function oo(t,n,a,o,f){for(f=f&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,E=n,N=a,H=o,re=E.flags;switch(E.tag){case 0:case 11:case 15:oo(d,E,N,H,f),bl(8,E);break;case 23:break;case 22:var xe=E.stateNode;E.memoizedState!==null?xe._visibility&2?oo(d,E,N,H,f):Sl(d,E):(xe._visibility|=2,oo(d,E,N,H,f)),f&&re&2048&&Pd(E.alternate,E);break;case 24:oo(d,E,N,H,f),f&&re&2048&&Fd(E.alternate,E);break;default:oo(d,E,N,H,f)}n=n.sibling}}function Sl(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,f=o.flags;switch(o.tag){case 22:Sl(a,o),f&2048&&Pd(o.alternate,o);break;case 24:Sl(a,o),f&2048&&Fd(o.alternate,o);break;default:Sl(a,o)}n=n.sibling}}var El=8192;function lo(t,n,a){if(t.subtreeFlags&El)for(t=t.child;t!==null;)F0(t,n,a),t=t.sibling}function F0(t,n,a){switch(t.tag){case 26:lo(t,n,a),t.flags&El&&t.memoizedState!==null&&Jy(a,ba,t.memoizedState,t.memoizedProps);break;case 5:lo(t,n,a);break;case 3:case 4:var o=ba;ba=tu(t.stateNode.containerInfo),lo(t,n,a),ba=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=El,El=16777216,lo(t,n,a),El=o):lo(t,n,a));break;default:lo(t,n,a)}}function B0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Ml(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Qn=o,G0(o,t)}B0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)z0(t),t=t.sibling}function z0(t){switch(t.tag){case 0:case 11:case 15:Ml(t),t.flags&2048&&Os(9,t,t.return);break;case 3:Ml(t);break;case 12:Ml(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,kc(t)):Ml(t);break;default:Ml(t)}}function kc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Qn=o,G0(o,t)}B0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Os(8,n,n.return),kc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,kc(n));break;default:kc(n)}t=t.sibling}}function G0(t,n){for(;Qn!==null;){var a=Qn;switch(a.tag){case 0:case 11:case 15:Os(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ol(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Qn=o;else e:for(a=t;Qn!==null;){o=Qn;var f=o.sibling,d=o.return;if(N0(o),o===a){Qn=null;break e}if(f!==null){f.return=d,Qn=f;break e}Qn=d}}}var py={getCacheForType:function(t){var n=ai(zn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return ai(zn).controller.signal}},my=typeof WeakMap=="function"?WeakMap:Map,an=0,_n=null,zt=null,Xt=0,on=0,Yi=null,Ds=!1,co=!1,Bd=!1,ss=0,wn=0,Ls=0,wr=0,zd=0,Wi=0,uo=0,Tl=null,Di=null,Gd=!1,Vc=0,H0=0,jc=1/0,Xc=null,Is=null,Xn=0,Us=null,fo=null,rs=0,Hd=0,kd=null,k0=null,Al=0,Vd=null;function qi(){return(an&2)!==0&&Xt!==0?Xt&-Xt:L.T!==null?$d():ta()}function V0(){if(Wi===0)if((Xt&536870912)===0||qt){var t=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),Wi=t}else Wi=536870912;return t=ji.current,t!==null&&(t.flags|=32),Wi}function Li(t,n,a){(t===_n&&(on===2||on===9)||t.cancelPendingCommit!==null)&&(ho(t,0),Ps(t,Xt,Wi,!1)),it(t,a),((an&2)===0||t!==_n)&&(t===_n&&((an&2)===0&&(wr|=a),wn===4&&Ps(t,Xt,Wi,!1)),Da(t))}function j0(t,n,a){if((an&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ie(t,n),f=o?_y(t,n):Xd(t,n,!0),d=o;do{if(f===0){co&&!o&&Ps(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!gy(a)){f=Xd(t,n,!1),d=!1;continue}if(f===2){if(d=n,t.errorRecoveryDisabledLanes&d)var E=0;else E=t.pendingLanes&-536870913,E=E!==0?E:E&536870912?536870912:0;if(E!==0){n=E;e:{var N=t;f=Tl;var H=N.current.memoizedState.isDehydrated;if(H&&(ho(N,E).flags|=256),E=Xd(N,E,!1),E!==2){if(Bd&&!H){N.errorRecoveryDisabledLanes|=d,wr|=d,f=4;break e}d=Di,Di=f,d!==null&&(Di===null?Di=d:Di.push.apply(Di,d))}f=E}if(d=!1,f!==2)continue}}if(f===1){ho(t,0),Ps(t,n,0,!0);break}e:{switch(o=t,d=f,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ps(o,n,Wi,!Ds);break e;case 2:Di=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(f=Vc+300-ve(),10<f)){if(Ps(o,n,Wi,!Ds),he(o,0,!0)!==0)break e;rs=n,o.timeoutHandle=yx(X0.bind(null,o,a,Di,Xc,Gd,n,Wi,wr,uo,Ds,d,"Throttled",-0,0),f);break e}X0(o,a,Di,Xc,Gd,n,Wi,wr,uo,Ds,d,null,-0,0)}}break}while(!0);Da(t)}function X0(t,n,a,o,f,d,E,N,H,re,xe,Se,ue,de){if(t.timeoutHandle=-1,Se=n.subtreeFlags,Se&8192||(Se&16785408)===16785408){Se={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Gi},F0(n,d,Se);var $e=(d&62914560)===d?Vc-ve():(d&4194048)===d?H0-ve():0;if($e=eS(Se,$e),$e!==null){rs=d,t.cancelPendingCommit=$e(J0.bind(null,t,n,d,a,o,f,E,N,H,xe,Se,null,ue,de)),Ps(t,d,E,!re);return}}J0(t,n,d,a,o,f,E,N,H)}function gy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var f=a[o],d=f.getSnapshot;f=f.value;try{if(!ki(d(),f))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ps(t,n,a,o){n&=~zd,n&=~wr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var f=n;0<f;){var d=31-ze(f),E=1<<d;o[d]=-1,f&=~E}a!==0&&Lt(t,a,n)}function Yc(){return(an&6)===0?(wl(0),!1):!0}function jd(){if(zt!==null){if(on===0)var t=zt.return;else t=zt,$a=_r=null,rd(t),no=null,cl=0,t=zt;for(;t!==null;)S0(t.alternate,t),t=t.return;zt=null}}function ho(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Py(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),rs=0,jd(),_n=t,zt=a=Wa(t.current,null),Xt=n,on=0,Yi=null,Ds=!1,co=Ie(t,n),Bd=!1,uo=Wi=zd=wr=Ls=wn=0,Di=Tl=null,Gd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var f=31-ze(o),d=1<<f;n|=t[f],o&=~d}return ss=n,hc(),a}function Y0(t,n){Tt=null,L.H=xl,n===to||n===yc?(n=lg(),on=3):n===qf?(n=lg(),on=4):on=n===Sd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Yi=n,zt===null&&(wn=1,Uc(t,sa(n,t.current)))}function W0(){var t=ji.current;return t===null?!0:(Xt&4194048)===Xt?ca===null:(Xt&62914560)===Xt||(Xt&536870912)!==0?t===ca:!1}function q0(){var t=L.H;return L.H=xl,t===null?xl:t}function $0(){var t=L.A;return L.A=py,t}function Wc(){wn=4,Ds||(Xt&4194048)!==Xt&&ji.current!==null||(co=!0),(Ls&134217727)===0&&(wr&134217727)===0||_n===null||Ps(_n,Xt,Wi,!1)}function Xd(t,n,a){var o=an;an|=2;var f=q0(),d=$0();(_n!==t||Xt!==n)&&(Xc=null,ho(t,n)),n=!1;var E=wn;e:do try{if(on!==0&&zt!==null){var N=zt,H=Yi;switch(on){case 8:jd(),E=6;break e;case 3:case 2:case 9:case 6:ji.current===null&&(n=!0);var re=on;if(on=0,Yi=null,po(t,N,H,re),a&&co){E=0;break e}break;default:re=on,on=0,Yi=null,po(t,N,H,re)}}xy(),E=wn;break}catch(xe){Y0(t,xe)}while(!0);return n&&t.shellSuspendCounter++,$a=_r=null,an=o,L.H=f,L.A=d,zt===null&&(_n=null,Xt=0,hc()),E}function xy(){for(;zt!==null;)K0(zt)}function _y(t,n){var a=an;an|=2;var o=q0(),f=$0();_n!==t||Xt!==n?(Xc=null,jc=ve()+500,ho(t,n)):co=Ie(t,n);e:do try{if(on!==0&&zt!==null){n=zt;var d=Yi;t:switch(on){case 1:on=0,Yi=null,po(t,n,d,1);break;case 2:case 9:if(rg(d)){on=0,Yi=null,Z0(n);break}n=function(){on!==2&&on!==9||_n!==t||(on=7),Da(t)},d.then(n,n);break e;case 3:on=7;break e;case 4:on=5;break e;case 7:rg(d)?(on=0,Yi=null,Z0(n)):(on=0,Yi=null,po(t,n,d,7));break;case 5:var E=null;switch(zt.tag){case 26:E=zt.memoizedState;case 5:case 27:var N=zt;if(E?Px(E):N.stateNode.complete){on=0,Yi=null;var H=N.sibling;if(H!==null)zt=H;else{var re=N.return;re!==null?(zt=re,qc(re)):zt=null}break t}}on=0,Yi=null,po(t,n,d,5);break;case 6:on=0,Yi=null,po(t,n,d,6);break;case 8:jd(),wn=6;break e;default:throw Error(s(462))}}vy();break}catch(xe){Y0(t,xe)}while(!0);return $a=_r=null,L.H=o,L.A=f,an=a,zt!==null?0:(_n=null,Xt=0,hc(),wn)}function vy(){for(;zt!==null&&!vt();)K0(zt)}function K0(t){var n=b0(t.alternate,t,ss);t.memoizedProps=t.pendingProps,n===null?qc(t):zt=n}function Z0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=p0(a,n,n.pendingProps,n.type,void 0,Xt);break;case 11:n=p0(a,n,n.pendingProps,n.type.render,n.ref,Xt);break;case 5:rd(n);default:S0(a,n),n=zt=$m(n,ss),n=b0(a,n,ss)}t.memoizedProps=t.pendingProps,n===null?qc(t):zt=n}function po(t,n,a,o){$a=_r=null,rd(n),no=null,cl=0;var f=n.return;try{if(oy(t,f,n,a,Xt)){wn=1,Uc(t,sa(a,t.current)),zt=null;return}}catch(d){if(f!==null)throw zt=f,d;wn=1,Uc(t,sa(a,t.current)),zt=null;return}n.flags&32768?(qt||o===1?t=!0:co||(Xt&536870912)!==0?t=!1:(Ds=t=!0,(o===2||o===9||o===3||o===6)&&(o=ji.current,o!==null&&o.tag===13&&(o.flags|=16384))),Q0(n,t)):qc(n)}function qc(t){var n=t;do{if((n.flags&32768)!==0){Q0(n,Ds);return}t=n.return;var a=uy(n.alternate,n,ss);if(a!==null){zt=a;return}if(n=n.sibling,n!==null){zt=n;return}zt=n=t}while(n!==null);wn===0&&(wn=5)}function Q0(t,n){do{var a=fy(t.alternate,t);if(a!==null){a.flags&=32767,zt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){zt=t;return}zt=t=a}while(t!==null);wn=6,zt=null}function J0(t,n,a,o,f,d,E,N,H){t.cancelPendingCommit=null;do $c();while(Xn!==0);if((an&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Lf,rn(t,a,d,E,N,H),t===_n&&(zt=_n=null,Xt=0),fo=n,Us=t,rs=a,Hd=d,kd=f,k0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Ey(J,function(){return ax(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=L.T,L.T=null,f=z.p,z.p=2,E=an,an|=4;try{dy(t,n,a)}finally{an=E,z.p=f,L.T=o}}Xn=1,ex(),tx(),nx()}}function ex(){if(Xn===1){Xn=0;var t=Us,n=fo,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=L.T,L.T=null;var o=z.p;z.p=2;var f=an;an|=4;try{I0(n,t);var d=ih,E=Gm(t.containerInfo),N=d.focusedElem,H=d.selectionRange;if(E!==N&&N&&N.ownerDocument&&zm(N.ownerDocument.documentElement,N)){if(H!==null&&Rf(N)){var re=H.start,xe=H.end;if(xe===void 0&&(xe=re),"selectionStart"in N)N.selectionStart=re,N.selectionEnd=Math.min(xe,N.value.length);else{var Se=N.ownerDocument||document,ue=Se&&Se.defaultView||window;if(ue.getSelection){var de=ue.getSelection(),$e=N.textContent.length,dt=Math.min(H.start,$e),dn=H.end===void 0?dt:Math.min(H.end,$e);!de.extend&&dt>dn&&(E=dn,dn=dt,dt=E);var Q=Bm(N,dt),Y=Bm(N,dn);if(Q&&Y&&(de.rangeCount!==1||de.anchorNode!==Q.node||de.anchorOffset!==Q.offset||de.focusNode!==Y.node||de.focusOffset!==Y.offset)){var se=Se.createRange();se.setStart(Q.node,Q.offset),de.removeAllRanges(),dt>dn?(de.addRange(se),de.extend(Y.node,Y.offset)):(se.setEnd(Y.node,Y.offset),de.addRange(se))}}}}for(Se=[],de=N;de=de.parentNode;)de.nodeType===1&&Se.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof N.focus=="function"&&N.focus(),N=0;N<Se.length;N++){var be=Se[N];be.element.scrollLeft=be.left,be.element.scrollTop=be.top}}ou=!!nh,ih=nh=null}finally{an=f,z.p=o,L.T=a}}t.current=n,Xn=2}}function tx(){if(Xn===2){Xn=0;var t=Us,n=fo,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=L.T,L.T=null;var o=z.p;z.p=2;var f=an;an|=4;try{C0(t,n.alternate,n)}finally{an=f,z.p=o,L.T=a}}Xn=3}}function nx(){if(Xn===4||Xn===3){Xn=0,Et();var t=Us,n=fo,a=rs,o=k0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Xn=5:(Xn=0,fo=Us=null,ix(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&(Is=null),ea(a),n=n.stateNode,pe&&typeof pe.onCommitFiberRoot=="function")try{pe.onCommitFiberRoot(fe,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=L.T,f=z.p,z.p=2,L.T=null;try{for(var d=t.onRecoverableError,E=0;E<o.length;E++){var N=o[E];d(N.value,{componentStack:N.stack})}}finally{L.T=n,z.p=f}}(rs&3)!==0&&$c(),Da(t),f=t.pendingLanes,(a&261930)!==0&&(f&42)!==0?t===Vd?Al++:(Al=0,Vd=t):Al=0,wl(0)}}function ix(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,ol(n)))}function $c(){return ex(),tx(),nx(),ax()}function ax(){if(Xn!==5)return!1;var t=Us,n=Hd;Hd=0;var a=ea(rs),o=L.T,f=z.p;try{z.p=32>a?32:a,L.T=null,a=kd,kd=null;var d=Us,E=rs;if(Xn=0,fo=Us=null,rs=0,(an&6)!==0)throw Error(s(331));var N=an;if(an|=4,z0(d.current),P0(d,d.current,E,a),an=N,wl(0,!1),pe&&typeof pe.onPostCommitFiberRoot=="function")try{pe.onPostCommitFiberRoot(fe,d)}catch{}return!0}finally{z.p=f,L.T=o,ix(t,n)}}function sx(t,n,a){n=sa(a,n),n=yd(t.stateNode,n,2),t=Rs(t,n,2),t!==null&&(it(t,2),Da(t))}function ln(t,n,a){if(t.tag===3)sx(t,t,a);else for(;n!==null;){if(n.tag===3){sx(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Is===null||!Is.has(o))){t=sa(a,t),a=r0(2),o=Rs(n,a,2),o!==null&&(o0(a,o,n,t),it(o,2),Da(o));break}}n=n.return}}function Yd(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new my;var f=new Set;o.set(n,f)}else f=o.get(n),f===void 0&&(f=new Set,o.set(n,f));f.has(a)||(Bd=!0,f.add(a),t=by.bind(null,t,n,a),n.then(t,t))}function by(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,_n===t&&(Xt&a)===a&&(wn===4||wn===3&&(Xt&62914560)===Xt&&300>ve()-Vc?(an&2)===0&&ho(t,0):zd|=a,uo===Xt&&(uo=0)),Da(t)}function rx(t,n){n===0&&(n=Re()),t=mr(t,n),t!==null&&(it(t,n),Da(t))}function yy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),rx(t,a)}function Sy(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,f=t.memoizedState;f!==null&&(a=f.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),rx(t,a)}function Ey(t,n){return q(t,n)}var Kc=null,mo=null,Wd=!1,Zc=!1,qd=!1,Fs=0;function Da(t){t!==mo&&t.next===null&&(mo===null?Kc=mo=t:mo=mo.next=t),Zc=!0,Wd||(Wd=!0,Ty())}function wl(t,n){if(!qd&&Zc){qd=!0;do for(var a=!1,o=Kc;o!==null;){if(t!==0){var f=o.pendingLanes;if(f===0)var d=0;else{var E=o.suspendedLanes,N=o.pingedLanes;d=(1<<31-ze(42|t)+1)-1,d&=f&~(E&~N),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,ux(o,d))}else d=Xt,d=he(o,o===_n?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Ie(o,d)||(a=!0,ux(o,d));o=o.next}while(a);qd=!1}}function My(){ox()}function ox(){Zc=Wd=!1;var t=0;Fs!==0&&Uy()&&(t=Fs);for(var n=ve(),a=null,o=Kc;o!==null;){var f=o.next,d=lx(o,n);d===0?(o.next=null,a===null?Kc=f:a.next=f,f===null&&(mo=a)):(a=o,(t!==0||(d&3)!==0)&&(Zc=!0)),o=f}Xn!==0&&Xn!==5||wl(t),Fs!==0&&(Fs=0)}function lx(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,f=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var E=31-ze(d),N=1<<E,H=f[E];H===-1?((N&a)===0||(N&o)!==0)&&(f[E]=Fe(N,n)):H<=n&&(t.expiredLanes|=N),d&=~N}if(n=_n,a=Xt,a=he(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(on===2||on===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&yt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ie(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&yt(o),ea(a)){case 2:case 8:a=T;break;case 32:a=J;break;case 268435456:a=Te;break;default:a=J}return o=cx.bind(null,t),a=q(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&yt(o),t.callbackPriority=2,t.callbackNode=null,2}function cx(t,n){if(Xn!==0&&Xn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if($c()&&t.callbackNode!==a)return null;var o=Xt;return o=he(t,t===_n?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(j0(t,o,n),lx(t,ve()),t.callbackNode!=null&&t.callbackNode===a?cx.bind(null,t):null)}function ux(t,n){if($c())return null;j0(t,n,!0)}function Ty(){Fy(function(){(an&6)!==0?q(D,My):ox()})}function $d(){if(Fs===0){var t=Jr;t===0&&(t=ht,ht<<=1,(ht&261888)===0&&(ht=256)),Fs=t}return Fs}function fx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Fn(""+t)}function dx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Ay(t,n,a,o,f){if(n==="submit"&&a&&a.stateNode===f){var d=fx((f[En]||null).action),E=o.submitter;E&&(n=(n=E[En]||null)?fx(n.formAction):E.getAttribute("formAction"),n!==null&&(d=n,E=null));var N=new ys("action","action",null,o,f);t.push({event:N,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Fs!==0){var H=E?dx(f,E):new FormData(f);md(a,{pending:!0,data:H,method:f.method,action:d},null,H)}}else typeof d=="function"&&(N.preventDefault(),H=E?dx(f,E):new FormData(f),md(a,{pending:!0,data:H,method:f.method,action:d},d,H))},currentTarget:f}]})}}for(var Kd=0;Kd<Df.length;Kd++){var Zd=Df[Kd],wy=Zd.toLowerCase(),Ry=Zd[0].toUpperCase()+Zd.slice(1);va(wy,"on"+Ry)}va(Vm,"onAnimationEnd"),va(jm,"onAnimationIteration"),va(Xm,"onAnimationStart"),va("dblclick","onDoubleClick"),va("focusin","onFocus"),va("focusout","onBlur"),va(jb,"onTransitionRun"),va(Xb,"onTransitionStart"),va(Yb,"onTransitionCancel"),va(Ym,"onTransitionEnd"),le("onMouseEnter",["mouseout","mouseover"]),le("onMouseLeave",["mouseout","mouseover"]),le("onPointerEnter",["pointerout","pointerover"]),le("onPointerLeave",["pointerout","pointerover"]),K("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),K("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),K("onBeforeInput",["compositionend","keypress","textInput","paste"]),K("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),K("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),K("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Rl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rl));function hx(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],f=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var E=o.length-1;0<=E;E--){var N=o[E],H=N.instance,re=N.currentTarget;if(N=N.listener,H!==d&&f.isPropagationStopped())break e;d=N,f.currentTarget=re;try{d(f)}catch(xe){dc(xe)}f.currentTarget=null,d=H}else for(E=0;E<o.length;E++){if(N=o[E],H=N.instance,re=N.currentTarget,N=N.listener,H!==d&&f.isPropagationStopped())break e;d=N,f.currentTarget=re;try{d(f)}catch(xe){dc(xe)}f.currentTarget=null,d=H}}}}function Gt(t,n){var a=n[na];a===void 0&&(a=n[na]=new Set);var o=t+"__bubble";a.has(o)||(px(n,t,2,!1),a.add(o))}function Qd(t,n,a){var o=0;n&&(o|=4),px(a,t,o,n)}var Qc="_reactListening"+Math.random().toString(36).slice(2);function Jd(t){if(!t[Qc]){t[Qc]=!0,Ra.forEach(function(a){a!=="selectionchange"&&(Cy.has(a)||Qd(a,!1,t),Qd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Qc]||(n[Qc]=!0,Qd("selectionchange",!1,n))}}function px(t,n,a,o){switch(Vx(n)){case 2:var f=iS;break;case 8:f=aS;break;default:f=ph}a=f.bind(null,n,a,t),f=void 0,!ti||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(f=!0),o?f!==void 0?t.addEventListener(n,a,{capture:!0,passive:f}):t.addEventListener(n,a,!0):f!==void 0?t.addEventListener(n,a,{passive:f}):t.addEventListener(n,a,!1)}function eh(t,n,a,o,f){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var E=o.tag;if(E===3||E===4){var N=o.stateNode.containerInfo;if(N===f)break;if(E===4)for(E=o.return;E!==null;){var H=E.tag;if((H===3||H===4)&&E.stateNode.containerInfo===f)return;E=E.return}for(;N!==null;){if(E=xi(N),E===null)return;if(H=E.tag,H===5||H===6||H===26||H===27){o=d=E;continue e}N=N.parentNode}}o=o.return}df(function(){var re=d,xe=Ko(a),Se=[];e:{var ue=Wm.get(t);if(ue!==void 0){var de=ys,$e=t;switch(t){case"keypress":if(rr(a)===0)break e;case"keydown":case"keyup":de=Mt;break;case"focusin":$e="focus",de=Vr;break;case"focusout":$e="blur",de=Vr;break;case"beforeblur":case"afterblur":de=Vr;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=kr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=pf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=lt;break;case Vm:case jm:case Xm:de=xf;break;case Ym:de=nt;break;case"scroll":case"scrollend":de=_t;break;case"wheel":de=at;break;case"copy":case"cut":case"paste":de=vf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=gt;break;case"toggle":case"beforetoggle":de=et}var dt=(n&4)!==0,dn=!dt&&(t==="scroll"||t==="scrollend"),Q=dt?ue!==null?ue+"Capture":null:ue;dt=[];for(var Y=re,se;Y!==null;){var be=Y;if(se=be.stateNode,be=be.tag,be!==5&&be!==26&&be!==27||se===null||Q===null||(be=bs(Y,Q),be!=null&&dt.push(Cl(Y,be,se))),dn)break;Y=Y.return}0<dt.length&&(ue=new de(ue,$e,null,a,xe),Se.push({event:ue,listeners:dt}))}}if((n&7)===0){e:{if(ue=t==="mouseover"||t==="pointerover",de=t==="mouseout"||t==="pointerout",ue&&a!==$o&&($e=a.relatedTarget||a.fromElement)&&(xi($e)||$e[li]))break e;if((de||ue)&&(ue=xe.window===xe?xe:(ue=xe.ownerDocument)?ue.defaultView||ue.parentWindow:window,de?($e=a.relatedTarget||a.toElement,de=re,$e=$e?xi($e):null,$e!==null&&(dn=c($e),dt=$e.tag,$e!==dn||dt!==5&&dt!==27&&dt!==6)&&($e=null)):(de=null,$e=re),de!==$e)){if(dt=kr,be="onMouseLeave",Q="onMouseEnter",Y="mouse",(t==="pointerout"||t==="pointerover")&&(dt=gt,be="onPointerLeave",Q="onPointerEnter",Y="pointer"),dn=de==null?ue:xn(de),se=$e==null?ue:xn($e),ue=new dt(be,Y+"leave",de,a,xe),ue.target=dn,ue.relatedTarget=se,be=null,xi(xe)===re&&(dt=new dt(Q,Y+"enter",$e,a,xe),dt.target=se,dt.relatedTarget=dn,be=dt),dn=be,de&&$e)t:{for(dt=Ny,Q=de,Y=$e,se=0,be=Q;be;be=dt(be))se++;be=0;for(var ot=Y;ot;ot=dt(ot))be++;for(;0<se-be;)Q=dt(Q),se--;for(;0<be-se;)Y=dt(Y),be--;for(;se--;){if(Q===Y||Y!==null&&Q===Y.alternate){dt=Q;break t}Q=dt(Q),Y=dt(Y)}dt=null}else dt=null;de!==null&&mx(Se,ue,de,dt,!1),$e!==null&&dn!==null&&mx(Se,dn,$e,dt,!0)}}e:{if(ue=re?xn(re):window,de=ue.nodeName&&ue.nodeName.toLowerCase(),de==="select"||de==="input"&&ue.type==="file")var tn=Dm;else if(Nm(ue))if(Lm)tn=Hb;else{tn=zb;var tt=Bb}else de=ue.nodeName,!de||de.toLowerCase()!=="input"||ue.type!=="checkbox"&&ue.type!=="radio"?re&&en(re.elementType)&&(tn=Dm):tn=Gb;if(tn&&(tn=tn(t,re))){Om(Se,tn,a,xe);break e}tt&&tt(t,ue,re),t==="focusout"&&re&&ue.type==="number"&&re.memoizedProps.value!=null&&Ut(ue,"number",ue.value)}switch(tt=re?xn(re):window,t){case"focusin":(Nm(tt)||tt.contentEditable==="true")&&(Xr=tt,Cf=re,al=null);break;case"focusout":al=Cf=Xr=null;break;case"mousedown":Nf=!0;break;case"contextmenu":case"mouseup":case"dragend":Nf=!1,Hm(Se,a,xe);break;case"selectionchange":if(Vb)break;case"keydown":case"keyup":Hm(Se,a,xe)}var Rt;if(Qt)e:{switch(t){case"compositionstart":var Yt="onCompositionStart";break e;case"compositionend":Yt="onCompositionEnd";break e;case"compositionupdate":Yt="onCompositionUpdate";break e}Yt=void 0}else ia?ur(t,a)&&(Yt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Yt="onCompositionStart");Yt&&(yi&&a.locale!=="ko"&&(ia||Yt!=="onCompositionStart"?Yt==="onCompositionEnd"&&ia&&(Rt=cc()):(ni=xe,Hr="value"in ni?ni.value:ni.textContent,ia=!0)),tt=Jc(re,Yt),0<tt.length&&(Yt=new jr(Yt,t,null,a,xe),Se.push({event:Yt,listeners:tt}),Rt?Yt.data=Rt:(Rt=fr(a),Rt!==null&&(Yt.data=Rt)))),(Rt=Bn?dr(t,a):Tf(t,a))&&(Yt=Jc(re,"onBeforeInput"),0<Yt.length&&(tt=new jr("onBeforeInput","beforeinput",null,a,xe),Se.push({event:tt,listeners:Yt}),tt.data=Rt)),Ay(Se,t,re,a,xe)}hx(Se,n)})}function Cl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Jc(t,n){for(var a=n+"Capture",o=[];t!==null;){var f=t,d=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||d===null||(f=bs(t,a),f!=null&&o.unshift(Cl(t,f,d)),f=bs(t,n),f!=null&&o.push(Cl(t,f,d))),t.tag===3)return o;t=t.return}return[]}function Ny(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function mx(t,n,a,o,f){for(var d=n._reactName,E=[];a!==null&&a!==o;){var N=a,H=N.alternate,re=N.stateNode;if(N=N.tag,H!==null&&H===o)break;N!==5&&N!==26&&N!==27||re===null||(H=re,f?(re=bs(a,d),re!=null&&E.unshift(Cl(a,re,H))):f||(re=bs(a,d),re!=null&&E.push(Cl(a,re,H)))),a=a.return}E.length!==0&&t.push({event:n,listeners:E})}var Oy=/\r\n?/g,Dy=/\u0000|\uFFFD/g;function gx(t){return(typeof t=="string"?t:""+t).replace(Oy,`
`).replace(Dy,"")}function xx(t,n){return n=gx(n),gx(t)===n}function fn(t,n,a,o,f,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||_i(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&_i(t,""+o);break;case"className":qe(t,"class",o);break;case"tabIndex":qe(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":qe(t,a,o);break;case"style":vi(t,o,d);break;case"data":if(n!=="object"){qe(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Fn(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&fn(t,n,"name",f.name,f,null),fn(t,n,"formEncType",f.formEncType,f,null),fn(t,n,"formMethod",f.formMethod,f,null),fn(t,n,"formTarget",f.formTarget,f,null)):(fn(t,n,"encType",f.encType,f,null),fn(t,n,"method",f.method,f,null),fn(t,n,"target",f.target,f,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Fn(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=Gi);break;case"onScroll":o!=null&&Gt("scroll",t);break;case"onScrollEnd":o!=null&&Gt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(f.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=Fn(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":Gt("beforetoggle",t),Gt("toggle",t),Be(t,"popover",o);break;case"xlinkActuate":Ye(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ye(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ye(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ye(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ye(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ye(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ye(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Be(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Zn.get(a)||a,Be(t,a,o))}}function th(t,n,a,o,f,d){switch(a){case"style":vi(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(f.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?_i(t,o):(typeof o=="number"||typeof o=="bigint")&&_i(t,""+o);break;case"onScroll":o!=null&&Gt("scroll",t);break;case"onScrollEnd":o!=null&&Gt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Gi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!C.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(f=a.endsWith("Capture"),n=a.slice(2,f?a.length-7:void 0),d=t[En]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,f),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,f);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Be(t,a,o)}}}function ri(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Gt("error",t),Gt("load",t);var o=!1,f=!1,d;for(d in a)if(a.hasOwnProperty(d)){var E=a[d];if(E!=null)switch(d){case"src":o=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:fn(t,n,d,E,a,null)}}f&&fn(t,n,"srcSet",a.srcSet,a,null),o&&fn(t,n,"src",a.src,a,null);return;case"input":Gt("invalid",t);var N=d=E=f=null,H=null,re=null;for(o in a)if(a.hasOwnProperty(o)){var xe=a[o];if(xe!=null)switch(o){case"name":f=xe;break;case"type":E=xe;break;case"checked":H=xe;break;case"defaultChecked":re=xe;break;case"value":d=xe;break;case"defaultValue":N=xe;break;case"children":case"dangerouslySetInnerHTML":if(xe!=null)throw Error(s(137,n));break;default:fn(t,n,o,xe,a,null)}}ei(t,d,N,H,re,E,f,!1);return;case"select":Gt("invalid",t),o=E=d=null;for(f in a)if(a.hasOwnProperty(f)&&(N=a[f],N!=null))switch(f){case"value":d=N;break;case"defaultValue":E=N;break;case"multiple":o=N;default:fn(t,n,f,N,a,null)}n=d,a=E,t.multiple=!!o,n!=null?Pn(t,!!o,n,!1):a!=null&&Pn(t,!!o,a,!0);return;case"textarea":Gt("invalid",t),d=f=o=null;for(E in a)if(a.hasOwnProperty(E)&&(N=a[E],N!=null))switch(E){case"value":o=N;break;case"defaultValue":f=N;break;case"children":d=N;break;case"dangerouslySetInnerHTML":if(N!=null)throw Error(s(91));break;default:fn(t,n,E,N,a,null)}ui(t,o,f,d);return;case"option":for(H in a)a.hasOwnProperty(H)&&(o=a[H],o!=null)&&(H==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":fn(t,n,H,o,a,null));return;case"dialog":Gt("beforetoggle",t),Gt("toggle",t),Gt("cancel",t),Gt("close",t);break;case"iframe":case"object":Gt("load",t);break;case"video":case"audio":for(o=0;o<Rl.length;o++)Gt(Rl[o],t);break;case"image":Gt("error",t),Gt("load",t);break;case"details":Gt("toggle",t);break;case"embed":case"source":case"link":Gt("error",t),Gt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(re in a)if(a.hasOwnProperty(re)&&(o=a[re],o!=null))switch(re){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:fn(t,n,re,o,a,null)}return;default:if(en(n)){for(xe in a)a.hasOwnProperty(xe)&&(o=a[xe],o!==void 0&&th(t,n,xe,o,a,void 0));return}}for(N in a)a.hasOwnProperty(N)&&(o=a[N],o!=null&&fn(t,n,N,o,a,null))}function Ly(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,d=null,E=null,N=null,H=null,re=null,xe=null;for(de in a){var Se=a[de];if(a.hasOwnProperty(de)&&Se!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":H=Se;default:o.hasOwnProperty(de)||fn(t,n,de,null,o,Se)}}for(var ue in o){var de=o[ue];if(Se=a[ue],o.hasOwnProperty(ue)&&(de!=null||Se!=null))switch(ue){case"type":d=de;break;case"name":f=de;break;case"checked":re=de;break;case"defaultChecked":xe=de;break;case"value":E=de;break;case"defaultValue":N=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(s(137,n));break;default:de!==Se&&fn(t,n,ue,de,o,Se)}}Ve(t,E,N,H,re,xe,d,f);return;case"select":de=E=N=ue=null;for(d in a)if(H=a[d],a.hasOwnProperty(d)&&H!=null)switch(d){case"value":break;case"multiple":de=H;default:o.hasOwnProperty(d)||fn(t,n,d,null,o,H)}for(f in o)if(d=o[f],H=a[f],o.hasOwnProperty(f)&&(d!=null||H!=null))switch(f){case"value":ue=d;break;case"defaultValue":N=d;break;case"multiple":E=d;default:d!==H&&fn(t,n,f,d,o,H)}n=N,a=E,o=de,ue!=null?Pn(t,!!a,ue,!1):!!o!=!!a&&(n!=null?Pn(t,!!a,n,!0):Pn(t,!!a,a?[]:"",!1));return;case"textarea":de=ue=null;for(N in a)if(f=a[N],a.hasOwnProperty(N)&&f!=null&&!o.hasOwnProperty(N))switch(N){case"value":break;case"children":break;default:fn(t,n,N,null,o,f)}for(E in o)if(f=o[E],d=a[E],o.hasOwnProperty(E)&&(f!=null||d!=null))switch(E){case"value":ue=f;break;case"defaultValue":de=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(s(91));break;default:f!==d&&fn(t,n,E,f,o,d)}jn(t,ue,de);return;case"option":for(var $e in a)ue=a[$e],a.hasOwnProperty($e)&&ue!=null&&!o.hasOwnProperty($e)&&($e==="selected"?t.selected=!1:fn(t,n,$e,null,o,ue));for(H in o)ue=o[H],de=a[H],o.hasOwnProperty(H)&&ue!==de&&(ue!=null||de!=null)&&(H==="selected"?t.selected=ue&&typeof ue!="function"&&typeof ue!="symbol":fn(t,n,H,ue,o,de));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var dt in a)ue=a[dt],a.hasOwnProperty(dt)&&ue!=null&&!o.hasOwnProperty(dt)&&fn(t,n,dt,null,o,ue);for(re in o)if(ue=o[re],de=a[re],o.hasOwnProperty(re)&&ue!==de&&(ue!=null||de!=null))switch(re){case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(s(137,n));break;default:fn(t,n,re,ue,o,de)}return;default:if(en(n)){for(var dn in a)ue=a[dn],a.hasOwnProperty(dn)&&ue!==void 0&&!o.hasOwnProperty(dn)&&th(t,n,dn,void 0,o,ue);for(xe in o)ue=o[xe],de=a[xe],!o.hasOwnProperty(xe)||ue===de||ue===void 0&&de===void 0||th(t,n,xe,ue,o,de);return}}for(var Q in a)ue=a[Q],a.hasOwnProperty(Q)&&ue!=null&&!o.hasOwnProperty(Q)&&fn(t,n,Q,null,o,ue);for(Se in o)ue=o[Se],de=a[Se],!o.hasOwnProperty(Se)||ue===de||ue==null&&de==null||fn(t,n,Se,ue,o,de)}function _x(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Iy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var f=a[o],d=f.transferSize,E=f.initiatorType,N=f.duration;if(d&&N&&_x(E)){for(E=0,N=f.responseEnd,o+=1;o<a.length;o++){var H=a[o],re=H.startTime;if(re>N)break;var xe=H.transferSize,Se=H.initiatorType;xe&&_x(Se)&&(H=H.responseEnd,E+=xe*(H<N?1:(N-re)/(H-re)))}if(--o,n+=8*(d+E)/(f.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var nh=null,ih=null;function eu(t){return t.nodeType===9?t:t.ownerDocument}function vx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ah(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var sh=null;function Uy(){var t=window.event;return t&&t.type==="popstate"?t===sh?!1:(sh=t,!0):(sh=null,!1)}var yx=typeof setTimeout=="function"?setTimeout:void 0,Py=typeof clearTimeout=="function"?clearTimeout:void 0,Sx=typeof Promise=="function"?Promise:void 0,Fy=typeof queueMicrotask=="function"?queueMicrotask:typeof Sx<"u"?function(t){return Sx.resolve(null).then(t).catch(By)}:yx;function By(t){setTimeout(function(){throw t})}function Bs(t){return t==="head"}function Ex(t,n){var a=n,o=0;do{var f=a.nextSibling;if(t.removeChild(a),f&&f.nodeType===8)if(a=f.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(f),vo(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Nl(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Nl(a);for(var d=a.firstChild;d;){var E=d.nextSibling,N=d.nodeName;d[ci]||N==="SCRIPT"||N==="STYLE"||N==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=E}}else a==="body"&&Nl(t.ownerDocument.body);a=f}while(a);vo(n)}function Mx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function rh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":rh(a),Mi(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function zy(t,n,a,o){for(;t.nodeType===1;){var f=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[ci])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=ua(t.nextSibling),t===null)break}return null}function Gy(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ua(t.nextSibling),t===null))return null;return t}function Tx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ua(t.nextSibling),t===null))return null;return t}function oh(t){return t.data==="$?"||t.data==="$~"}function lh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Hy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function ua(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var ch=null;function Ax(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return ua(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function wx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Rx(t,n,a){switch(n=eu(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Nl(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Mi(t)}var fa=new Map,Cx=new Set;function tu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var os=z.d;z.d={f:ky,r:Vy,D:jy,C:Xy,L:Yy,m:Wy,X:$y,S:qy,M:Ky};function ky(){var t=os.f(),n=Yc();return t||n}function Vy(t){var n=Ti(t);n!==null&&n.tag===5&&n.type==="form"?Yg(n):os.r(t)}var go=typeof document>"u"?null:document;function Nx(t,n,a){var o=go;if(o&&typeof n=="string"&&n){var f=Ct(n);f='link[rel="'+t+'"][href="'+f+'"]',typeof a=="string"&&(f+='[crossorigin="'+a+'"]'),Cx.has(f)||(Cx.add(f),t={rel:t,crossOrigin:a,href:n},o.querySelector(f)===null&&(n=o.createElement("link"),ri(n,"link",t),yn(n),o.head.appendChild(n)))}}function jy(t){os.D(t),Nx("dns-prefetch",t,null)}function Xy(t,n){os.C(t,n),Nx("preconnect",t,n)}function Yy(t,n,a){os.L(t,n,a);var o=go;if(o&&t&&n){var f='link[rel="preload"][as="'+Ct(n)+'"]';n==="image"&&a&&a.imageSrcSet?(f+='[imagesrcset="'+Ct(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(f+='[imagesizes="'+Ct(a.imageSizes)+'"]')):f+='[href="'+Ct(t)+'"]';var d=f;switch(n){case"style":d=xo(t);break;case"script":d=_o(t)}fa.has(d)||(t=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),fa.set(d,t),o.querySelector(f)!==null||n==="style"&&o.querySelector(Ol(d))||n==="script"&&o.querySelector(Dl(d))||(n=o.createElement("link"),ri(n,"link",t),yn(n),o.head.appendChild(n)))}}function Wy(t,n){os.m(t,n);var a=go;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",f='link[rel="modulepreload"][as="'+Ct(o)+'"][href="'+Ct(t)+'"]',d=f;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=_o(t)}if(!fa.has(d)&&(t=v({rel:"modulepreload",href:t},n),fa.set(d,t),a.querySelector(f)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Dl(d)))return}o=a.createElement("link"),ri(o,"link",t),yn(o),a.head.appendChild(o)}}}function qy(t,n,a){os.S(t,n,a);var o=go;if(o&&t){var f=Ai(o).hoistableStyles,d=xo(t);n=n||"default";var E=f.get(d);if(!E){var N={loading:0,preload:null};if(E=o.querySelector(Ol(d)))N.loading=5;else{t=v({rel:"stylesheet",href:t,"data-precedence":n},a),(a=fa.get(d))&&uh(t,a);var H=E=o.createElement("link");yn(H),ri(H,"link",t),H._p=new Promise(function(re,xe){H.onload=re,H.onerror=xe}),H.addEventListener("load",function(){N.loading|=1}),H.addEventListener("error",function(){N.loading|=2}),N.loading|=4,nu(E,n,o)}E={type:"stylesheet",instance:E,count:1,state:N},f.set(d,E)}}}function $y(t,n){os.X(t,n);var a=go;if(a&&t){var o=Ai(a).hoistableScripts,f=_o(t),d=o.get(f);d||(d=a.querySelector(Dl(f)),d||(t=v({src:t,async:!0},n),(n=fa.get(f))&&fh(t,n),d=a.createElement("script"),yn(d),ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(f,d))}}function Ky(t,n){os.M(t,n);var a=go;if(a&&t){var o=Ai(a).hoistableScripts,f=_o(t),d=o.get(f);d||(d=a.querySelector(Dl(f)),d||(t=v({src:t,async:!0,type:"module"},n),(n=fa.get(f))&&fh(t,n),d=a.createElement("script"),yn(d),ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(f,d))}}function Ox(t,n,a,o){var f=(f=ee.current)?tu(f):null;if(!f)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=xo(a.href),a=Ai(f).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=xo(a.href);var d=Ai(f).hoistableStyles,E=d.get(t);if(E||(f=f.ownerDocument||f,E={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,E),(d=f.querySelector(Ol(t)))&&!d._p&&(E.instance=d,E.state.loading=5),fa.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},fa.set(t,a),d||Zy(f,t,a,E.state))),n&&o===null)throw Error(s(528,""));return E}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=_o(a),a=Ai(f).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function xo(t){return'href="'+Ct(t)+'"'}function Ol(t){return'link[rel="stylesheet"]['+t+"]"}function Dx(t){return v({},t,{"data-precedence":t.precedence,precedence:null})}function Zy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),ri(n,"link",a),yn(n),t.head.appendChild(n))}function _o(t){return'[src="'+Ct(t)+'"]'}function Dl(t){return"script[async]"+t}function Lx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Ct(a.href)+'"]');if(o)return n.instance=o,yn(o),o;var f=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),yn(o),ri(o,"style",f),nu(o,a.precedence,t),n.instance=o;case"stylesheet":f=xo(a.href);var d=t.querySelector(Ol(f));if(d)return n.state.loading|=4,n.instance=d,yn(d),d;o=Dx(a),(f=fa.get(f))&&uh(o,f),d=(t.ownerDocument||t).createElement("link"),yn(d);var E=d;return E._p=new Promise(function(N,H){E.onload=N,E.onerror=H}),ri(d,"link",o),n.state.loading|=4,nu(d,a.precedence,t),n.instance=d;case"script":return d=_o(a.src),(f=t.querySelector(Dl(d)))?(n.instance=f,yn(f),f):(o=a,(f=fa.get(d))&&(o=v({},a),fh(o,f)),t=t.ownerDocument||t,f=t.createElement("script"),yn(f),ri(f,"link",o),t.head.appendChild(f),n.instance=f);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,nu(o,a.precedence,t));return n.instance}function nu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=o.length?o[o.length-1]:null,d=f,E=0;E<o.length;E++){var N=o[E];if(N.dataset.precedence===n)d=N;else if(d!==f)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function uh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function fh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var iu=null;function Ix(t,n,a){if(iu===null){var o=new Map,f=iu=new Map;f.set(a,o)}else f=iu,o=f.get(a),o||(o=new Map,f.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),f=0;f<a.length;f++){var d=a[f];if(!(d[ci]||d[gn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var E=d.getAttribute(n)||"";E=t+E;var N=o.get(E);N?N.push(d):o.set(E,[d])}}return o}function Ux(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Qy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Px(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Jy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var f=xo(o.href),d=n.querySelector(Ol(f));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=au.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,yn(d);return}d=n.ownerDocument||n,o=Dx(o),(f=fa.get(f))&&uh(o,f),d=d.createElement("link"),yn(d);var E=d;E._p=new Promise(function(N,H){E.onload=N,E.onerror=H}),ri(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=au.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var dh=0;function eS(t,n){return t.stylesheets&&t.count===0&&ru(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&ru(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&dh===0&&(dh=62500*Iy());var f=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&ru(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>dh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(f)}}:null}function au(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ru(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var su=null;function ru(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,su=new Map,n.forEach(tS,t),su=null,au.call(t))}function tS(t,n){if(!(n.state.loading&4)){var a=su.get(t);if(a)var o=a.get(null);else{a=new Map,su.set(t,a);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<f.length;d++){var E=f[d];(E.nodeName==="LINK"||E.getAttribute("media")!=="not all")&&(a.set(E.dataset.precedence,E),o=E)}o&&a.set(null,o)}f=n.instance,E=f.getAttribute("data-precedence"),d=a.get(E)||o,d===o&&a.set(null,f),a.set(E,f),this.count++,o=au.bind(this),f.addEventListener("load",o),f.addEventListener("error",o),d?d.parentNode.insertBefore(f,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),n.state.loading|=4}}var Ll={$$typeof:O,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function nS(t,n,a,o,f,d,E,N,H){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=We(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.hiddenUpdates=We(null),this.identifierPrefix=o,this.onUncaughtError=f,this.onCaughtError=d,this.onRecoverableError=E,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function Fx(t,n,a,o,f,d,E,N,H,re,xe,Se){return t=new nS(t,n,a,E,H,re,xe,Se,N),n=1,d===!0&&(n|=24),d=Vi(3,null,null,n),t.current=d,d.stateNode=t,n=Xf(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},$f(d),t}function Bx(t){return t?(t=qr,t):qr}function zx(t,n,a,o,f,d){f=Bx(f),o.context===null?o.context=f:o.pendingContext=f,o=ws(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Rs(t,o,n),a!==null&&(Li(a,t,n),fl(a,t,n))}function Gx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function hh(t,n){Gx(t,n),(t=t.alternate)&&Gx(t,n)}function Hx(t){if(t.tag===13||t.tag===31){var n=mr(t,67108864);n!==null&&Li(n,t,67108864),hh(t,67108864)}}function kx(t){if(t.tag===13||t.tag===31){var n=qi();n=Bi(n);var a=mr(t,n);a!==null&&Li(a,t,n),hh(t,n)}}var ou=!0;function iS(t,n,a,o){var f=L.T;L.T=null;var d=z.p;try{z.p=2,ph(t,n,a,o)}finally{z.p=d,L.T=f}}function aS(t,n,a,o){var f=L.T;L.T=null;var d=z.p;try{z.p=8,ph(t,n,a,o)}finally{z.p=d,L.T=f}}function ph(t,n,a,o){if(ou){var f=mh(o);if(f===null)eh(t,n,o,lu,a),jx(t,o);else if(rS(f,t,n,a,o))o.stopPropagation();else if(jx(t,o),n&4&&-1<sS.indexOf(t)){for(;f!==null;){var d=Ti(f);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var E=De(d.pendingLanes);if(E!==0){var N=d;for(N.pendingLanes|=2,N.entangledLanes|=2;E;){var H=1<<31-ze(E);N.entanglements[1]|=H,E&=~H}Da(d),(an&6)===0&&(jc=ve()+500,wl(0))}}break;case 31:case 13:N=mr(d,2),N!==null&&Li(N,d,2),Yc(),hh(d,2)}if(d=mh(o),d===null&&eh(t,n,o,lu,a),d===f)break;f=d}f!==null&&o.stopPropagation()}else eh(t,n,o,null,a)}}function mh(t){return t=Ko(t),gh(t)}var lu=null;function gh(t){if(lu=null,t=xi(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=u(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return lu=t,null}function Vx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vt()){case D:return 2;case T:return 8;case J:case me:return 32;case Te:return 268435456;default:return 32}default:return 32}}var xh=!1,zs=null,Gs=null,Hs=null,Il=new Map,Ul=new Map,ks=[],sS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jx(t,n){switch(t){case"focusin":case"focusout":zs=null;break;case"dragenter":case"dragleave":Gs=null;break;case"mouseover":case"mouseout":Hs=null;break;case"pointerover":case"pointerout":Il.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(n.pointerId)}}function Pl(t,n,a,o,f,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[f]},n!==null&&(n=Ti(n),n!==null&&Hx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,f!==null&&n.indexOf(f)===-1&&n.push(f),t)}function rS(t,n,a,o,f){switch(n){case"focusin":return zs=Pl(zs,t,n,a,o,f),!0;case"dragenter":return Gs=Pl(Gs,t,n,a,o,f),!0;case"mouseover":return Hs=Pl(Hs,t,n,a,o,f),!0;case"pointerover":var d=f.pointerId;return Il.set(d,Pl(Il.get(d)||null,t,n,a,o,f)),!0;case"gotpointercapture":return d=f.pointerId,Ul.set(d,Pl(Ul.get(d)||null,t,n,a,o,f)),!0}return!1}function Xx(t){var n=xi(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=u(a),n!==null){t.blockedOn=n,zi(t.priority,function(){kx(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,zi(t.priority,function(){kx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function cu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=mh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);$o=o,a.target.dispatchEvent(o),$o=null}else return n=Ti(a),n!==null&&Hx(n),t.blockedOn=a,!1;n.shift()}return!0}function Yx(t,n,a){cu(t)&&a.delete(n)}function oS(){xh=!1,zs!==null&&cu(zs)&&(zs=null),Gs!==null&&cu(Gs)&&(Gs=null),Hs!==null&&cu(Hs)&&(Hs=null),Il.forEach(Yx),Ul.forEach(Yx)}function uu(t,n){t.blockedOn===n&&(t.blockedOn=null,xh||(xh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,oS)))}var fu=null;function Wx(t){fu!==t&&(fu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){fu===t&&(fu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],f=t[n+2];if(typeof o!="function"){if(gh(o||a)===null)continue;break}var d=Ti(a);d!==null&&(t.splice(n,3),n-=3,md(d,{pending:!0,data:f,method:a.method,action:o},o,f))}}))}function vo(t){function n(H){return uu(H,t)}zs!==null&&uu(zs,t),Gs!==null&&uu(Gs,t),Hs!==null&&uu(Hs,t),Il.forEach(n),Ul.forEach(n);for(var a=0;a<ks.length;a++){var o=ks[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ks.length&&(a=ks[0],a.blockedOn===null);)Xx(a),a.blockedOn===null&&ks.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var f=a[o],d=a[o+1],E=f[En]||null;if(typeof d=="function")E||Wx(a);else if(E){var N=null;if(d&&d.hasAttribute("formAction")){if(f=d,E=d[En]||null)N=E.formAction;else if(gh(f)!==null)continue}else N=E.action;typeof N=="function"?a[o+1]=N:(a.splice(o,3),o-=3),Wx(a)}}}function qx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(E){return f=E})},focusReset:"manual",scroll:"manual"})}function n(){f!==null&&(f(),f=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,f=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),f!==null&&(f(),f=null)}}}function _h(t){this._internalRoot=t}du.prototype.render=_h.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=qi();zx(a,o,t,n,null,null)},du.prototype.unmount=_h.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;zx(t.current,2,null,t,null,null),Yc(),n[li]=null}};function du(t){this._internalRoot=t}du.prototype.unstable_scheduleHydration=function(t){if(t){var n=ta();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ks.length&&n!==0&&n<ks[a].priority;a++);ks.splice(a,0,t),a===0&&Xx(t)}};var $x=e.version;if($x!=="19.2.3")throw Error(s(527,$x,"19.2.3"));z.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?x(t):null,t=t===null?null:t.stateNode,t};var lS={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hu.isDisabled&&hu.supportsFiber)try{fe=hu.inject(lS),pe=hu}catch{}}return Bl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",f=n0,d=i0,E=a0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(f=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(E=n.onRecoverableError)),n=Fx(t,1,!1,null,null,a,o,null,f,d,E,qx),t[li]=n.current,Jd(t),new _h(n)},Bl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,f="",d=n0,E=i0,N=a0,H=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(E=a.onCaughtError),a.onRecoverableError!==void 0&&(N=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Fx(t,1,!0,n,a??null,o,f,H,d,E,N,qx),n.context=Bx(null),a=n.current,o=qi(),o=Bi(o),f=ws(o),f.callback=null,Rs(a,f,o),a=o,n.current.lanes=a,it(n,a),Da(n),t[li]=n.current,Jd(t),new du(n)},Bl.version="19.2.3",Bl}var s_;function vS(){if(s_)return yh.exports;s_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),yh.exports=_S(),yh.exports}var bS=vS();const yS=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),SS=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),r_=r=>{const e=SS(r);return e.charAt(0).toUpperCase()+e.slice(1)},Pv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),ES=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var MS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const TS=Ce.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:u,...h},m)=>Ce.createElement("svg",{ref:m,...MS,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:Pv("lucide",l),...!c&&!ES(h)&&{"aria-hidden":"true"},...h},[...u.map(([p,x])=>Ce.createElement(p,x)),...Array.isArray(c)?c:[c]]));const Rn=(r,e)=>{const i=Ce.forwardRef(({className:s,...l},c)=>Ce.createElement(TS,{ref:c,iconNode:e,className:Pv(`lucide-${yS(r_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=r_(r),i};const AS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ql=Rn("arrow-right",AS);const wS=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],rm=Rn("brain-circuit",wS);const RS=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],CS=Rn("camera",RS);const NS=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Fo=Rn("check",NS);const OS=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Fv=Rn("chevron-down",OS);const DS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ha=Rn("circle-check",DS);const LS=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Kl=Rn("copy",LS);const IS=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],US=Rn("download",IS);const PS=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],FS=Rn("external-link",PS);const BS=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],zS=Rn("file-text",BS);const GS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Zl=Rn("globe",GS);const HS=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Bv=Rn("image",HS);const kS=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Qi=Rn("loader-circle",kS);const VS=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],jS=Rn("log-out",VS);const XS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],YS=Rn("plus",XS);const WS=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],om=Rn("refresh-cw",WS);const qS=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],lp=Rn("sparkles",qS);const $S=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],KS=Rn("square",$S);const ZS=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Ku=Rn("trash-2",ZS);const QS=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],cp=Rn("triangle-alert",QS);const JS=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],up=Rn("wand-sparkles",JS);const eE=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Zu=Rn("zap",eE),o_="gpt-image-2";let zv="";const fp=r=>{zv=r},Qu=()=>zv,tE=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=Qu();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:o_,prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const u=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),u.data&&u.data.length>0)return{base64Img:u.data[0].b64_json,usedModel:o_};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},Ql="v4.4.6",Gv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},Th=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],nE=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,Fi={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Fi.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"};Fi.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"};Fi.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"};Fi.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"};Fi.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"};Fi.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"};Fi.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"};Fi.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"};Fi.CEL={style:"In THIS PANEL ONLY, shift to a modern high-budget TV anime cel animation style. Use vibrant, highly saturated colors with clearly defined deep shadow areas. Outlines are bold and distinct to separate characters from the background. The color palette is rich, energetic, and visually popping.",proportions:"",vfx:"(Modern high-budget TV anime cel shading:1.5), (vibrant highly saturated colors:1.5), (clearly defined hard-edge deep shadows:1.4), (bold prominent character outlines:1.4), (rich energetic color palette:1.3)"};Fi.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"};Fi.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"};Fi.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const iE=["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"],aE={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},sE=`
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
3. (exaggerated facial expressions:1.3), (emotional reactions:1.2) — Comical expressions: jaw drops, fury, waterfall tears, funny sweat drops.
4. (dynamic body language:1.3), (full body reactions:1.2) — Characters physically react with entire bodies.
5. Do NOT overlay floating close-up eyes or ghostly face inserts as background elements.
6. Do NOT draw "adjusting glasses" pose unless the character explicitly wears glasses.

§4. PERSPECTIVE-ALIGNED VFX:
- Speed lines, explosions, lightning MUST follow the panel's perspective distortion.
- If fish-eye: effects curve radially. If dutch angle: effects tilt with the world.
    `,rE=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`;var l_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(l_||(l_={}));var c_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(c_||(c_={}));var u_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(u_||(u_={}));const f_=["user","model","function","system"];var d_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(d_||(d_={}));var h_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(h_||(h_={}));var p_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(p_||(p_={}));var m_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(m_||(m_={}));var $l;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})($l||($l={}));var g_;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(g_||(g_={}));var x_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(x_||(x_={}));var __;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(__||(__={}));class pi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class bo extends pi{constructor(e,i){super(e),this.response=i}}class Hv extends pi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class er extends pi{}class kv extends pi{}const oE="https://generativelanguage.googleapis.com",lE="v1beta",cE="0.24.1",uE="genai-js";var Pr;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Pr||(Pr={}));class fE{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||lE;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||oE}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function dE(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${uE}/${cE}`),e.join(" ")}async function hE(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",dE(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new er(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new er(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new er(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function pE(r,e,i,s,l,c){const u=new fE(r,e,i,s,c);return{url:u.toString(),fetchOptions:Object.assign(Object.assign({},_E(c)),{method:"POST",headers:await hE(u),body:l})}}async function ac(r,e,i,s,l,c={},u=fetch){const{url:h,fetchOptions:m}=await pE(r,e,i,s,l,c);return mE(h,m,u)}async function mE(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){gE(l,r)}return s.ok||await xE(s,r),s}function gE(r,e){let i=r;throw i.name==="AbortError"?(i=new kv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Hv||r instanceof er||(i=new pi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function xE(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Hv(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function _E(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function lm(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Gu(r.candidates[0]))throw new bo(`${Ks(r)}`,r);return vE(r)}else if(r.promptFeedback)throw new bo(`Text not available. ${Ks(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Gu(r.candidates[0]))throw new bo(`${Ks(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),v_(r)[0]}else if(r.promptFeedback)throw new bo(`Function call not available. ${Ks(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Gu(r.candidates[0]))throw new bo(`${Ks(r)}`,r);return v_(r)}else if(r.promptFeedback)throw new bo(`Function call not available. ${Ks(r)}`,r)},r}function vE(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const u of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)u.text&&c.push(u.text),u.executableCode&&c.push("\n```"+u.executableCode.language+`
`+u.executableCode.code+"\n```\n"),u.codeExecutionResult&&c.push("\n```\n"+u.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function v_(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const u of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)u.functionCall&&c.push(u.functionCall);if(c.length>0)return c}const bE=[$l.RECITATION,$l.SAFETY,$l.LANGUAGE];function Gu(r){return!!r.finishReason&&bE.includes(r.finishReason)}function Ks(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];Gu(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function Jl(r){return this instanceof Jl?(this.v=r,this):new Jl(r)}function yE(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},u("next"),u("throw"),u("return"),l[Symbol.asyncIterator]=function(){return this},l;function u(g){s[g]&&(l[g]=function(b){return new Promise(function(M,A){c.push([g,b,M,A])>1||h(g,b)})})}function h(g,b){try{m(s[g](b))}catch(M){v(c[0][3],M)}}function m(g){g.value instanceof Jl?Promise.resolve(g.value.v).then(p,x):v(c[0][2],g)}function p(g){h("next",g)}function x(g){h("throw",g)}function v(g,b){g(b),c.shift(),c.length&&h(c[0][0],c[0][1])}}const b_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function SE(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=TE(e),[s,l]=i.tee();return{stream:ME(s),response:EE(l)}}async function EE(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return lm(AE(e));e.push(l)}}function ME(r){return yE(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield Jl(i.read());if(l)break;yield yield Jl(lm(s))}})}function TE(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:u,done:h})=>{if(h){if(l.trim()){s.error(new pi("Failed to parse stream"));return}s.close();return}l+=u;let m=l.match(b_),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new pi(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(b_)}return c()}).catch(u=>{let h=u;throw h.stack=u.stack,h.name==="AbortError"?h=new kv("Request aborted when reading from the stream"):h=new pi("Error reading from the stream"),h})}}})}function AE(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const u={};for(const h of c.content.parts)h.text&&(u.text=h.text),h.functionCall&&(u.functionCall=h.functionCall),h.executableCode&&(u.executableCode=h.executableCode),h.codeExecutionResult&&(u.codeExecutionResult=h.codeExecutionResult),Object.keys(u).length===0&&(u.text=""),i.candidates[l].content.parts.push(u)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Vv(r,e,i,s){const l=await ac(e,Pr.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return SE(l)}async function jv(r,e,i,s){const c=await(await ac(e,Pr.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:lm(c)}}function Xv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function ec(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return wE(e)}function wE(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new pi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new pi("No content is provided for sending chat message.");return s?e:i}function RE(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new er("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=ec(r);s.contents=[c]}return{generateContentRequest:s}}function y_(r){let e;return r.contents?e=r:e={contents:[ec(r)]},r.systemInstruction&&(e.systemInstruction=Xv(r.systemInstruction)),e}function CE(r){return typeof r=="string"||Array.isArray(r)?{content:ec(r)}:r}const S_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],NE={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function OE(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new pi(`First content should be with role 'user', got ${s}`);if(!f_.includes(s))throw new pi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(f_)}`);if(!Array.isArray(l))throw new pi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new pi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of S_)m in h&&(c[m]+=1);const u=NE[s];for(const h of S_)if(!u.includes(h)&&c[h]>0)throw new pi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function E_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const M_="SILENT_ERROR";class DE{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(OE(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,u,h,m;await this._sendPromise;const p=ec(e),x={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(u=this.params)===null||u===void 0?void 0:u.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},v=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>jv(this._apiKey,this.model,x,v)).then(b=>{var M;if(E_(b.response)){this._history.push(p);const A=Object.assign({parts:[],role:"model"},(M=b.response.candidates)===null||M===void 0?void 0:M[0].content);this._history.push(A)}else{const A=Ks(b.response);A&&console.warn(`sendMessage() was unsuccessful. ${A}. Inspect response object for details.`)}g=b}).catch(b=>{throw this._sendPromise=Promise.resolve(),b}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,u,h,m;await this._sendPromise;const p=ec(e),x={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(u=this.params)===null||u===void 0?void 0:u.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},v=Object.assign(Object.assign({},this._requestOptions),i),g=Vv(this._apiKey,this.model,x,v);return this._sendPromise=this._sendPromise.then(()=>g).catch(b=>{throw new Error(M_)}).then(b=>b.response).then(b=>{if(E_(b)){this._history.push(p);const M=Object.assign({},b.candidates[0].content);M.role||(M.role="model"),this._history.push(M)}else{const M=Ks(b);M&&console.warn(`sendMessageStream() was unsuccessful. ${M}. Inspect response object for details.`)}}).catch(b=>{b.message!==M_&&console.error(b)}),g}}async function LE(r,e,i,s){return(await ac(e,Pr.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function IE(r,e,i,s){return(await ac(e,Pr.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function UE(r,e,i,s){const l=i.requests.map(u=>Object.assign(Object.assign({},u),{model:e}));return(await ac(e,Pr.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class T_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Xv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=y_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return jv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=y_(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Vv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new DE(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=RE(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return LE(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=CE(e),l=Object.assign(Object.assign({},this._requestOptions),i);return IE(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return UE(this.apiKey,this.model,e,s)}}class PE{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new pi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new T_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new er("Cached content must contain a `name` field.");if(!e.model)throw new er("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const u of l)if(i?.[u]&&e[u]&&i?.[u]!==e[u]){if(u==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new er(`Different value for "${u}" specified in modelParams (${i[u]}) and cachedContent (${e[u]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new T_(this.apiKey,c,s)}}const Yv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",FE=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"],BE=["gemini-3.5-flash","gemini-2.5-flash","gemini-2.5-pro","gemini-flash-latest","gemini-pro-latest"];let ko="";const Hu=r=>{ko=r},cm=()=>ko,Wv=async()=>{if(!ko)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Yv}/v1beta/models?key=${ko}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},qv=async(r,e=null,i=null,s)=>{if(!ko)throw new Error("API Key is not set.");const l=new PE(ko),c=e&&e.length>0?BE:FE;let u=0;for(const p of c){u++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(u===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${u}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let x=[];i&&x.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&x.push(...e),x.push({text:r});const v={model:p},g=l.getGenerativeModel(v,{apiVersion:"v1beta",baseUrl:Yv}),b=new Promise((I,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),M=e&&e.length>0?[]:[{googleSearch:{}}];let A;try{A=await Promise.race([g.generateContent({contents:[{role:"user",parts:x}],tools:M,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),b])}catch(I){if(M.length>0)console.warn(`[API] Grounding failed for ${p} (${I.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),A=await Promise.race([g.generateContent({contents:[{role:"user",parts:x}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),b]);else throw I}const S=A.response,y=S.candidates||[];if(!y.length)throw S.promptFeedback&&(console.warn("Prompt Feedback:",S.promptFeedback),S.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${S.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const R=y[0];let O="";try{O=S.text()}catch(I){console.warn(I)}const U=R.content?.parts||[];let G="";if(U.forEach(I=>{I.thought&&(G+=I.thought)}),!O){const I=R.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${I}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${I})`),new Error(`Empty response (FinishReason: ${I}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:O,thought:G||"通常処理が完了しました。",model:p}}catch(x){console.warn(`Model ${p} failed:`,x.message),x.message.includes("429")||x.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!x.message.includes("フィルター検知")&&!x.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${x.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await Wv();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},zE=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:qv,diagnoseConnection:Wv,getApiKey:cm,setApiKey:Hu},Symbol.toStringTag,{value:"Module"})),GE="modulepreload",HE=function(r,e){return new URL(r,e).href},A_={},kE=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(x){return Promise.all(x.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const u=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(x=>{if(x=HE(x,s),x in A_)return;A_[x]=!0;const v=x.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(s)for(let M=u.length-1;M>=0;M--){const A=u[M];if(A.href===x&&(!v||A.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${x}"]${g}`))return;const b=document.createElement("link");if(b.rel=v?"stylesheet":GE,v||(b.as="script"),b.crossOrigin="",b.href=x,m&&b.setAttribute("nonce",m),document.head.appendChild(b),v)return new Promise((M,A)=>{b.addEventListener("load",M),b.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${x}`)))})}))}function c(u){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=u,window.dispatchEvent(h),!h.defaultPrevented)throw u}return l.then(u=>{for(const h of u||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},VE=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image"],jE=async(r,e,i=[])=>{const s=cm();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const u of VE)try{console.log(`[ImageGen] Attempting generation with model: ${u}`),c.push(u);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,x;if(u.startsWith("gemini")){const v=u.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(b=>{const M=b.includes(",")?b.split(",")[1]:b,A=b.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:A?A[1]:"image/png",data:M}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:v}}),signal:h.signal}),clearTimeout(m),x=await p.json(),x.error)throw new Error(`${x.error.message} (Code: ${x.error.code})`);if(x.candidates&&x.candidates.length>0&&x.candidates[0].content&&x.candidates[0].content.parts){const b=x.candidates[0].content.parts.find(M=>M.inlineData);if(b&&b.inlineData&&b.inlineData.data)return{base64Img:b.inlineData.data,usedModel:u}}throw new Error(`Unexpected formats from Gemini model ${u}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${u}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),x=await p.json(),x.error)throw new Error(`${x.error.message} (Code: ${x.error.code})`);if(x.predictions&&x.predictions[0]&&x.predictions[0].bytesBase64Encoded)return{base64Img:x.predictions[0].bytesBase64Encoded,usedModel:u};if(x.predictions&&x.predictions[0]&&typeof x.predictions[0]=="string")return{base64Img:x.predictions[0],usedModel:u};throw new Error(`Unexpected response format from Imagen model ${u}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${u} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${u}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:u}=await kE(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>zE);return{diagnoseConnection:p}},void 0,import.meta.url),h=await u();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(u){throw u.message.includes("API制限")||u.message.includes("コンテンツ制限")||u.message.includes("モデル未検出")?u:l||new Error(`All image generation models failed (${c.join(", ")}).`)}},XE=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],YE=["gpt-4.1","gpt-4o","gpt-4.1-mini"],WE=async(r,e=null,i=null,s)=>{const l=Qu();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?YE:XE;let u=0;for(const h of c){u++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(u===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${u}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0){for(const S of e)S.inlineData?p.push({type:"image_url",image_url:{url:`data:${S.inlineData.mimeType};base64,${S.inlineData.data}`,detail:"high"}}):typeof S=="string"&&S.startsWith("data:image/")&&p.push({type:"image_url",image_url:{url:S,detail:"high"}});p.length>0&&s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中...")}p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const x=new AbortController,v=setTimeout(()=>x.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:x.signal})}catch(S){throw S.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):S}finally{clearTimeout(v)}if(!g.ok){const y=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${y}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const M=(await g.json()).choices?.[0];if(!M||!M.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const A=M.message.content;if(A.includes("I'm sorry")||A.includes("cannot assist")||A.includes("can't assist")){console.warn(`[OpenAI] ${h} returned safety refusal: "${A.trim()}"`),s&&s("> [API] セーフティ拒否反応を検出。次のモデルへフォールバックします...");continue}return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:A,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let dp="gemini";const Ah=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),dp="gemini";return}dp=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},Fr=async(r,e=null,i=null,s)=>{let l;if(dp==="openai"?l=await WE(r,e,i,s):l=await qv(r,e,i,s),l&&l.text){const c=/<thought>([\s\S]*?)<\/thought>/i,u=l.text.match(c);if(u){const h=u[1].trim();l.text=l.text.replace(c,"").trim(),l.thought&&l.thought!=="通常処理が完了しました。"&&l.thought!=="通常処理が完了しました（思考トレースは利用不可）。"&&!l.thought.includes("による処理が完了しました。")?l.thought=`${l.thought}

[プロンプト内思考プロセス]
${h}`:l.thought=h}}return l},$v={寂れた商店街:{props:["シャッターの閉まった店舗","色あせたアーケードの看板","錆びた自転車","野良猫"],ambient:"風でカサカサ鳴るビニール袋の音、遠くの寂しいカラスの鳴き声",visual:"剥がれかけたポスター、薄暗い蛍光灯の点滅、ひび割れたアスファルト"},無人島:{props:["ヤシの実","漂着した流木","SOSの文字が書かれた砂浜","手作りの槍"],ambient:"ザザーッという波の音、ジャングルの鳥の鳴き声",visual:"果てしなく広がる水平線、照りつける強烈な太陽、白い砂浜"},ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},首相官邸:{props:["大量のマイク","演台の国章","分厚い赤絨毯","SPのインカム"],ambient:"記者たちのフラッシュのシャッター音、張り詰めた空気",visual:"重厚な木製の壁、無数のカメラのフラッシュ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},コンビニ前:{props:["溢れかけのゴミ箱","アイスのショーケース","ヤンキーのしゃがみ込み","レジ袋"],ambient:"入店時のチャイム音、室外機のブーンという音",visual:"白く明るい店内照明の漏れ、蛾が群がる外灯"},古民家:{props:["囲炉裏","すすけた梁","縁側","風鈴"],ambient:"セミの鳴き声、風鈴のチリンという音",visual:"木漏れ日が差す畳、古い木の質感、土間の薄暗さ"},火星基地:{props:["エアロックの扉","宇宙服のヘルメット","水耕栽培の植物","赤い砂ぼこり"],ambient:"生命維持装置の低い稼働音、無線のノイズ",visual:"窓の外に広がる赤い荒野、無機質な白いパネルの壁"},学校の屋上:{props:["サビついた金網","貯水タンク","捨てられたチョーク","風でめくれる制服"],ambient:"遠くから聞こえる吹奏楽部の練習音、強い風の音",visual:"見渡す限りの青空、立ち入り禁止の看板"},深夜のオフィス:{props:["点滅するPCモニター","飲みかけのエナジードリンク","山積みの書類","バランスボール"],ambient:"キーボードを叩く音、空調の低い稼働音",visual:"誰もいない暗いフロアの奥にだけ点灯しているデスク周り"},結婚式場:{props:["純白のウェディングケーキ","シャンパングラスの塔","フラワーシャワー","スポットライト"],ambient:"拍手喝采、壮大なオーケストラBGM",visual:"きらびやかなシャンデリア、大量の薔薇の装飾"},工事現場:{props:["黄色いヘルメット","鉄骨","ショベルカー","安全第一の看板"],ambient:"ドリルのガガガという爆音、作業員の怒号",visual:"足場と防音シート、土ぼこり、警告灯の赤い点滅"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},豪華客船の甲板:{props:["救命浮輪","デッキチェア","シャンパングラス","船長の帽子"],ambient:"海風の音、遠くの船の汽笛",visual:"見渡す限りの海原、星空、煌びやかなプールサイド"},雪山のロッジ:{props:["燃える暖炉","スキー板","鹿の剥製","厚手のブランケット"],ambient:"薪が爆ぜるパチパチという音、外の吹雪の轟音",visual:"温かいオレンジ色の照明、窓ガラスについた霜"},砂漠の真ん中:{props:["干からびた動物の骨","サボテン","空っぽの水筒","蜃気楼"],ambient:"熱風の音、砂がサラサラと崩れる音",visual:"見渡す限りの砂丘、太陽の強烈な照り返し"},海底トンネル:{props:["分厚いガラス","通り過ぎるサメ","水滴の垂れる配管","非常灯"],ambient:"ゴォーという水圧の低い音、エコーのかかった足音",visual:"青白い光の反射、ガラス越しに見える深海の闇"},裁判所:{props:["裁判官の木槌（ガベル）","証言台","傍聴席の仕切り","六法全書"],ambient:"木槌が叩かれる「静粛に！」という音、張り詰めた沈黙",visual:"厳格な木造の法廷、高くそびえる裁判官の席"},病院の待合室:{props:["順番待ちの電光掲示板","パイプ椅子","古い雑誌","血圧計"],ambient:"名前を呼ぶアナウンス、消毒液の匂い、咳払い",visual:"白い壁、無機質な蛍光灯、不安げな人々の表情"},動物園の檻の中:{props:["太い鉄格子","食べかけの肉の塊","タイヤの遊具","干し草"],ambient:"獣の低い唸り声、観客のザワザワとした声",visual:"鉄格子の隙間から見える人間の群衆、獣臭い空気感"},美術館:{props:["額縁に入った絵画","展示ケース","赤いパーテーションロープ","音声ガイド"],ambient:"静まり返った足音、囁き声",visual:"作品を照らす計算されたスポットライト、広い大理石の床"},映画館の最前列:{props:["ポップコーンのバケツ","3Dメガネ","ジュースのホルダー","巨大なスクリーン"],ambient:"映画の爆音サラウンド、ポップコーンを噛む音",visual:"暗闇に浮かび上がる観客の顔、スクリーンからの強い光の反射"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},温泉旅館:{props:["浴衣","木桶","温泉マークの暖簾","卓球のラケット"],ambient:"お湯がこぼれるチョロチョロという音、遠くの宴会のカラオケ",visual:"立ち込める湯気、和風の障子、岩風呂"},サウナの中:{props:["サウナストーン","ヴィヒタ（白樺の束）","木製のベンチ","砂時計"],ambient:"ロウリュの「ジューッ」という蒸発音、重い呼吸音",visual:"蒸気で霞んだ室内、汗だくの人々、薄暗いオレンジの照明"},エレベーターの中:{props:["階数表示のLED","非常ボタン","鏡","手すり"],ambient:"無機質な昇降の駆動音、沈黙による気まずい空気",visual:"狭く密室感のある金属の箱、気まずそうに目を逸らす人々"},断崖絶壁:{props:["崩れ落ちる小石","強風ではためくコート","手配書","警告の看板"],ambient:"崖下に打ち付ける波の爆音、ビュービューという強風",visual:"足元から広がる恐ろしい高低差、サスペンスドラマのような荒涼とした風景"},廃墟の遊園地:{props:["錆びたメリーゴーランドの馬","割れたピエロの看板","絡まったツタ","落ちているチケット"],ambient:"風で軋む観覧車の金属音、不気味なほどの静寂",visual:"色褪せたパステルカラー、不気味に傾いたアトラクション"},月面:{props:["クレーター","アメリカの国旗","月面探査車","宇宙服"],ambient:"完全な無音、宇宙服内の自分の呼吸音",visual:"真っ黒な宇宙空間に浮かぶ青い地球、低い重力によるフワフワした動き"},飛行機の機内:{props:["シートベルトのサイン","機内食のトレイ","小さな窓","酸素マスク"],ambient:"エンジンの轟音、機内アナウンスの「ポーン」という音",visual:"窮屈なエコノミークラスの座席、窓から見える雲海"},新幹線の座席:{props:["駅弁の空き箱","倒れたシート","車内販売のワゴン","チケットホルダー"],ambient:"高速でレールを滑るゴォーという音、車内チャイム",visual:"流れるような外の景色、リクライニングされた座席"},警察署の取調室:{props:["カツ丼のどんぶり","鉄の机","裸電球","分厚い調書"],ambient:"机を強く叩く音、時計のチクタクという音",visual:"マジックミラーの窓、薄暗く圧迫感のある狭い部屋"},ゴミ捨て場:{props:["カラスの群れ","破れたゴミ袋","粗大ゴミのテレビ","ハエ"],ambient:"カラスの鳴き声、ネズミが這い回るカサカサ音",visual:"腐敗臭を感じるような薄汚れた路地、積み上がった黒い袋"},高級ホテルのスイートルーム:{props:["天蓋付きのベッド","夜景の見える大窓","ルームサービスの銀のドーム","ワインクーラー"],ambient:"静かで優雅なクラシックBGM",visual:"大理石の床、豪華なシャンデリア、広すぎる空間"},スタジアム:{props:["応援メガホン","巨大な電光掲示板","芝生のピッチ","売り子のビール樽"],ambient:"数万人の地鳴りのような歓声、ブラスバンドの演奏",visual:"強烈なカクテル光線、波打つ観客席"},神社の境内:{props:["巨大な鳥居","おみくじの結ばれた木","手水舎","賽銭箱"],ambient:"砂利を踏む音、カラスの鳴き声、風で揺れる木々",visual:"静寂に包まれた深い緑、朱色の柱"},教会の告解室:{props:["木の格子窓","十字架","聖書","跪くためのクッション"],ambient:"小さな囁き声、教会の静寂",visual:"格子の隙間から漏れる細い光、薄暗い密室"},地下アイドルの握手会:{props:["推しのうちわ","剥がしスタッフ","チェキ","大量のCD"],ambient:"熱狂的なファンの声、スタッフの「はいお時間です」という声",visual:"殺風景な貸し会議室、異常な熱気のオタクたち"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},コインランドリー:{props:["回るドラム式洗濯機","洗剤の自動販売機","プラスチックの洗濯かご","古い漫画本"],ambient:"洗濯機の低い回転音と水の音",visual:"無機質な蛍光灯、窓ガラスの結露"},"公園 of the bench":{props:["鳩の群れ","空き缶","散歩中の犬","街灯"],ambient:"子供たちの遊ぶ声、遠くの車の音",visual:"木漏れ日、ちょっとサビたベンチの質感"},洞窟の奥:{props:["鍾乳石","松明","謎の光るキノコ","コウモリ"],ambient:"水滴が落ちるピチョンという音、声の深いエコー",visual:"完全な暗闇、松明の揺れる炎の影"},ジャングルの奥地:{props:["巨大なシダ植物","マチェーテ（山刀）","毒々しい色のカエル","古代遺跡の欠片"],ambient:"未知の鳥や虫の不気味な大合唱、湿気を感じる空気",visual:"鬱蒼と茂る緑、光を遮る巨大な樹木"},南極基地:{props:["分厚い防寒着","雪上車","観測データのアラートモニター","ペンギン"],ambient:"建物を揺るがす猛烈なブリザードの音",visual:"見渡す限りの白い氷原、窓から見えるオーロラ"},国際宇宙ステーション:{props:["宙に浮く水滴","複雑な機器のパネル","マジックテープ","地球の見える窓"],ambient:"ファンの低い稼働音",visual:"無重力で髪がフワフワ浮いている状態、狭いチューブ状のモジュール"},潜水艦の内部:{props:["潜望鏡","赤く光る緊急ランプ","無数のバルブ","ソナーの画面"],ambient:"ソナーの「ピコーン」という音、水圧で軋む金属音",visual:"狭くて息苦しい通路、赤い照明に照らされた緊張感"},戦車の内部:{props:["砲弾","照準器","鉄のハッチ","無線のマイク"],ambient:"キャタピラの爆音、エンジンと排気ガスの振動",visual:"油まみれの狭い鉄の箱、暗闇に光るメーター"},魔法使いの塔:{props:["宙に浮く魔導書","光る水晶玉","怪しい薬品のフラスコ","フクロウ"],ambient:"謎の呪文の囁き、薬品がボコボコ煮える音",visual:"天井まで届く本棚、ステンドグラスから差し込む神秘的な光"},異世界の酒場:{props:["巨大な木製ジョッキ","壁に貼られた手配書","エール酒","冒険者の剣"],ambient:"荒くれ者たちの笑い声、リュートの演奏",visual:"暖炉の炎、粗末な木のテーブル、ファンタジー世界特有の多種族の客"},魔王城の玉座:{props:["禍々しいドクロの装飾","巨大な玉座","赤い絨毯","ワイングラス"],ambient:"地鳴りのような魔力音、不気味な静寂",visual:"ステンドグラスを突き破る雷光、暗黒のオーラ"},RPGのダンジョン:{props:["宝箱（ミミックかもしれない）","落とし穴のスイッチ","骸骨","壁の松明"],ambient:"どこからともなく聞こえる魔物の呻き声",visual:"苔むした石造りの壁、先が見えない闇"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},江戸時代の長屋:{props:["井戸","笠","すだれ","火鉢"],ambient:"虫の音、下駄のカラコロという音",visual:"紙の障子、土間、木造長屋の連なり"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},京都の竹林:{props:["和傘","石畳","人力車","苔むした地蔵"],ambient:"竹が風に揺れて擦れ合うサラサラという音",visual:"空を覆い尽くす高く真っ直ぐな竹、木漏れ日"},大阪の道頓堀:{props:["巨大なカニの看板","たこ焼きの舟","グリ下","ネオンサイン"],ambient:"威勢の良い客引きの声、関西弁の賑やかな会話",visual:"派手で巨大な立体看板、川に反射するネオン"},沖縄のビーチ:{props:["ハイビスカス","シーサーの置物","サングラス","カラフルなカクテル"],ambient:"穏やかな波の音、三線の音色",visual:"エメラルドグリーンの透き通った海、真っ白な砂浜"},北海道のラベンダー畑:{props:["紫色の花畑","麦わら帽子","メロンソフトクリーム","トラクター"],ambient:"穏やかな風の音、トラクターのエンジン音",visual:"丘の向こうまで続く紫色の絨毯、広い空"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"},区役所の待合室:{props:["番号札の紙","パイプ椅子","記入台のボールペン","大量のパンフレット"],ambient:"「ピンポーン、番号札〇〇番の方」という無機質な機械音声",visual:"色褪せたポスター、疲弊してうつむく市民たちの顔"},教習所のコース:{props:["S字クランクのポール","教習車のエンブレム","補助ブレーキ","三角コーン"],ambient:"エンストの「ガクン」という音、教官の舌打ち",visual:"白黒模様の縁石、初心者マークの貼られた無数の車"},コインパーキング:{props:["跳ね上がったロック板","精算機","吸い殻入れ","「空車」のネオンサイン"],ambient:"車のアイドリング音、精算機の「お金を入れてください」という音声",visual:"夜の暗闇に光る緑色の看板、路上の水たまり"},近所のスーパー:{props:["特売のポップ","買い物カート","冷気が出る精肉コーナー","半額シール"],ambient:"「ポポーポポポポ」という呼び込み君のメロディ",visual:"蛍光灯で明るく照らされた陳列棚、カートを押す主婦たち"},美容室のシャンプー台:{props:["顔にかけられる白い布","シャワーヘッド","トリートメントのボトル","美容師のハサミ"],ambient:"「お湯加減どうですか？」という囁き声、シャワーのジャーッという音",visual:"天井の眩しい照明、鏡に映る自分の無防備な顔"},歯医者の診察室:{props:["うがい用の紙コップ","青いエプロン","リクライニングシート","恐ろしいドリルの先端"],ambient:"キュイイイーンという金属を削る不快な高音",visual:"顔を強烈に照らす無影灯、並べられた銀色の器具"},カプセルホテル:{props:["薄っぺらい布団","壁付けの小さなテレビ","耳栓","アラーム時計"],ambient:"隣のブースからのいびき、カサカサと動く音",visual:"蜂の巣のように並んだ四角い穴、黄色がかった薄暗い照明"},深夜のパーキングエリア:{props:["うどんの自動販売機","長距離トラック","自販機コーナーのベンチ","缶コーヒー"],ambient:"大型トラックのアイドリングの重低音",visual:"闇夜にぽつんと浮かび上がる自販機の明かり、疲れた顔のドライバー"},"ドン・キホーテの店内":{props:["手書きの圧縮陳列ポップ","ブランド品のガラスケース","謎のパーティーグッズ","焼き芋の機械"],ambient:"「ドンドンドン、ドンッキー」という無限ループの店内BGM",visual:"天井まで届く商品の山、極彩色で目がチカチカする空間"},銭湯の脱衣所:{props:["体重計","コーヒー牛乳の瓶","鍵付きロッカー","扇風機"],ambient:"ドライヤーの音、風呂場から響いてくる声の反響音",visual:"籐（とう）の床、古いポスター、壁掛け時計"},マグロ漁船の甲板:{props:["巨大なマグロ","血まみれのゴムエプロン","極太の釣り糸","氷のブロック"],ambient:"荒れ狂う荒波の音、男たちの怒号",visual:"凍てつく冷気、船を大きく揺らす巨大な波"},テレビの収録スタジオ:{props:["カンペ","巨大なクレーンカメラ","ピンマイク","ひな壇の椅子"],ambient:"ディレクターの「5秒前、4、3…」というカウントダウン",visual:"異常なほど明るい照明、セットの裏側のベニヤ板"},手術室:{props:["メス","心電図モニター","酸素マスク","血まみれのガーゼ"],ambient:"ピッ、ピッという心拍モニターの規則的な音",visual:"無影灯の下の手術台、青い術着を着た医師たち"},国会答弁の場:{props:["演壇の水差し","原稿用紙","ヤジを飛ばす議員","速記者のペン"],ambient:"「総理！総理！」という怒号、委員長の木槌の音",visual:"重厚感のある木製の議場、テレビカメラの列"},宇宙ステーションの船外活動:{props:["命綱（テザー）","電動ドライバー","バイザーの黄金の反射","太陽電池パネル"],ambient:"完全な無音、自分の荒い呼吸音だけ",visual:"果てしなく暗い宇宙と、美しく輝く巨大な青い地球"},漫画家の修羅場部屋:{props:["ペンタブレット","空っぽの栄養ドリンクの山","丸められたネーム用紙","背景アシスタント"],ambient:"カリカリというペンの音、編集者からの催促の電話の着信音",visual:"太陽の光が遮断されたカーテン、机に突っ伏して寝る人々"},ファストフードのドライブスルー:{props:["インカム","紙袋","ポテトのケース","マイクスタンド"],ambient:"「ご一緒にポテトはいかがですか？」というマイク越しの割れた声",visual:"窓越しに見える運転席の顔、排気ガス"},ドラゴンの巣:{props:["巨大なドラゴンの卵","金貨の山","焦げた冒険者の盾","光る鉱石"],ambient:"ドラゴンの低く響く寝息、硫黄が燃える音",visual:"マグマで赤く照らされた巨大な洞窟の空間"},エルフの隠れ里:{props:["光るキノコ","世界樹の葉","木彫りの弓","泉の水"],ambient:"風のささやき、ハープの美しい音色",visual:"巨大な木の上の住居、神秘的な緑の光"},王様への謁見の間:{props:["豪華な王冠","長い赤絨毯","槍を持った近衛兵","シャンデリア"],ambient:"足音が反響する広大な空間、王の威厳ある低い声",visual:"大理石の柱、金箔で装飾された高い天井"},戦国時代の合戦場:{props:["血塗られた刀","家紋の入った旗印","馬の死骸","火縄銃"],ambient:"「かかれー！」という叫び声、刀がぶつかる金属音",visual:"泥と血で汚れた地面、矢が雨のように降り注ぐ空"},マフィアのアジト:{props:["トンプソン・サブマシンガン","葉巻の煙","トランプ","現金の詰まったアタッシュケース"],ambient:"葉巻を吸い込む音、ジャズのレコード",visual:"ブラインド越しに差し込むシマシマの光、煙る薄暗い部屋"},サイボーグ修理工場:{props:["義手","オイルの缶","スパナ","神経接続用ケーブル"],ambient:"火花が散るバチバチという音、モーターの駆動音",visual:"無造作に吊るされた機械のパーツ、青白いホログラムの設計図"},荒廃したドーム都市:{props:["ガスマスク","汚染測定器","瓦礫","酸性雨を防ぐ傘"],ambient:"ドームの亀裂から漏れる風の音",visual:"灰色に濁った空、崩れかけた高層ビル群"},ワープ航行中の宇宙船:{props:["ワープエンジンのコア","星図のホログラム","キャプテンの椅子","コンソールパネル"],ambient:"空間が歪むようなヴーンという低周波音",visual:"窓の外を猛スピードで流れる光の筋（星々）"},巨大な胃袋の中:{props:["溶けかけた消化物","巨大な胃酸の海","胃壁のヒダ","飲み込まれた靴"],ambient:"グチャァ…という生々しい消化音",visual:"脈打つピンク色の肉壁、ドロドロの胃酸の湯気"},ミクロ化してアリの巣の中:{props:["巨大なアリの顎","運び込まれる巨大な砂糖の粒","土のトンネル","アリの卵"],ambient:"無数のカサカサカサという足音の大群",visual:"そびえ立つ土の壁、真っ暗闇の中で蠢く巨大な昆虫たち"},無限に続くエッシャーの階段:{props:["重力に逆らう水路","上っても下っても同じ場所に戻る階段","だまし絵","顔のない人影"],ambient:"靴音が永遠にループする音、方向感覚を失う静寂",visual:"上下左右の概念が崩壊した幾何学的な空間"},精神と時の部屋:{props:["何もない白い床","時計","水と粉だけ","己の精神"],ambient:"完全な無音、自分の心臓の鼓動だけが響く",visual:"真っ白で果てしなく続く虚無の空間、時間感覚の喪失"},地獄の釜の底:{props:["煮えたぎる血の池","トゲのついた金棒","亡者の群れ","閻魔大王の巻物"],ambient:"阿鼻叫喚の悲鳴、グツグツと沸き立つマグマの音",visual:"燃え盛る炎、真っ赤に染まった空、苦悶の表情の亡者たち"},ブラックホールの事象の地平線:{props:["吸い込まれる光","引き伸ばされた宇宙船","時間の遅れ","特異点"],ambient:"一切の音が消滅した究極の静寂",visual:"光すら歪む漆黒の球体、時間が止まったような異常な景色"},電子基板のミクロ世界:{props:["巨大なコンデンサ","銅線の道路","はんだ付けの山","電子の光"],ambient:"電気が通るチリチリとした音",visual:"緑色の基板の平野、そびえ立つチップの摩天楼"},脳内会議の円卓:{props:["ポジティブな自分","ネガティブな自分","議事録","巨大な脳のシワ"],ambient:"「どうする？」「やめとけ！」という自分自身の声の言い合い",visual:"ピンク色の脳漿に囲まれた不思議な会議室"},天国への階段の途中:{props:["白い雲のステップ","天使の輪","ハープ","眩しすぎる光の扉"],ambient:"神々しいコーラスの歌声、平和な空気",visual:"足元に広がる下界、見上げると果てしない光の階段"},異次元の幾何学空間:{props:["浮遊する立方体","紫色の空","ねじれた空間","光る多面体"],ambient:"不協和音のような電子的な響き",visual:"物理法則を無視してゆっくり回転する巨大な図形たち"}},qE=r=>{const e=$v[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
※指定された場所「${r}」ならではの具体的なディテール（小道具、環境音、視覚的特徴）を文脈から推測し、積極的に描写せよ。`},$E=()=>`【リアクション構築ガイドライン（偏り防止構造）】
1. 感情の起伏は「抽象的な表現」ではなく、具体的な「物理的・身体的アクション」に変換して描写せよ。（例：単に「驚愕する」ではなく「目を見開き、持っている物を落とす」など）
2. 過去の定番ギャグ（パイ投げ、バナナの皮、ダイナマイト、黒歴史ノート等）に依存した安易な描写を禁止する。
3. そのシーンの文脈、キャラクターの性格、および指定された場所（Location）の環境・小道具と論理的に結びついた、独自のリアクションを構築せよ。`,wh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},KE=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const u=i;i=i.replace(l,c),u!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},ZE=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const u=i;i=i.replace(l,c),u!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},QE=(r,e,i,s,l=640,c=480)=>new Promise((u,h)=>{const m=new Image;m.onload=()=>{try{const p=document.createElement("canvas");p.width=l,p.height=c;const x=p.getContext("2d"),v=m.width,g=m.height,M=(e%360+360)%360/360*v,A=s/360*v,S=g/2-i/180*g,y=A*(c/l),R=M-A/2,O=Math.max(0,Math.min(g-y,S-y/2)),U=Math.min(y,g);if(R>=0&&R+A<=v)x.drawImage(m,R,O,A,U,0,0,l,c);else if(R<0){const G=-R,I=A-G,B=I/A;x.drawImage(m,v-G,O,G,U,0,0,l*(1-B),c),x.drawImage(m,0,O,I,U,l*(1-B),0,l*B,c)}else{const G=v-R,I=A-G,B=G/A;x.drawImage(m,R,O,G,U,0,0,l*B,c),x.drawImage(m,0,O,I,U,l*B,0,l*(1-B),c)}u(p.toDataURL("image/jpeg",.85))}catch(p){h(p)}},m.onerror=()=>h(new Error("画像の読み込みに失敗しました")),m.src=r}),JE=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,eM=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},tM=()=>`
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
      `,nM=(r,e,i)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${e.join(`

`)}

${i?`【作風完全上書き指令 (Style Override)】
以下の「作風情報」を最優先事項として適用し、シナリオ全体のトーン、セリフの語彙、空気感を根本的に改変せよ:
- 作風名: ${i.style_name}
- 作風詳細指示:
${i.reproduction_prompt}
${i.anti_patterns?`- 絶対禁止事項:
${i.anti_patterns}`:""}`:""}

【Guard C: AI定型文とクリシェの絶対排除】
以下のAI特有の退屈な表現・クリシェをシナリオ（ト書き・セリフ）から完全に排除・書き換えよ:
- 感想・まとめのナレーション（「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等は絶対禁止。綺麗にまとめず余韻をぶった斬れ）
- 汎用的で弱い感嘆（「ふふっ」「やれやれ」「まあいいか」等は絶対禁止。キャラに合った鋭いリアクションにせよ）
- 状況をそのまま口で説明するセリフ（「〇〇が××してしまったぞ！」等は禁止。絵で状況は見せ, セリフは感情やツッコミに特化せよ）
- オチの表情パターンの多様化（白目オチの偏り防止）（4コマ目のオチとして「全員が白目をむいて唖然とする」「凍りつく」等の『白目・フリーズ反応（BLANK）』ばかりに偏るのを防ぐこと。白目オチ自体は極限 of 絶望や魂抜けとして適した場面でのみ効果的に使用し、それ以外の場面では能動的にツッコむ、爆笑する、冷静に呆れる（NORMALの真顔など）、あるいは怒り狂うなど、状況に合わせた多様な表情や能動的なリアクションでオチを作れ）

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

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。

【出力前思考プロセス：Semi-Formal Reasoning & Verbalized Confidence】
あなたは最終回答（シナリオテキスト）を出力する前に、以下の思考プロセスを内部で必ず実行し、その推論ログ（Thought Trace）を必ず '<thought>' と '</thought>' のタグで囲んで出力の冒頭に残してください。
1. [前提事実と現在の問題点列挙]
   - 元のシナリオにおける課題、および今回選択された強化カテゴリの指示内容を列挙せよ。
2. [実行パスのトレース]
   - 強化カテゴリの指示（表情、アクション、背景、セリフなど）を、どのようにシナリオのト書きや台詞に肉付けするかトレースせよ。
3. [確信度の自己判定]
   - 以下の各項目の確信度を 0-100 で評価せよ：
     - 指示された強化カテゴリがすべて過不足なく反映されているか: (確信度: XX)
     - 4コマ形式の構造や登場キャラクター名、セリフの元の文言（変更が許可されている場合を除く）が完全に維持されているか: (確信度: XX)
     - 演出（FACS、ボディランゲージ、五感、笑い構造）が基準ウェイト2.5〜3.0相当に高められているか: (確信度: XX)
   - 確信度が 80 未満の項目がある場合、演出描写を自己修正（再検証）した上で最終結論を出力せよ。`,iM=({randomCategory:r,targetDate:e,inputMode:i,manualTopic:s,newsContext:l,searchTopicKeywords:c,bg360Image:u,bg360Analysis:h,bg360Enabled:m,customLocation:p,forcedLocation:x,customOutfit:v,ragLocationDetails:g,ragReactions:b,punchlineType:M,comedyTone:A,styleJson:S})=>`
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
        
        ${u&&h&&m?`
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
           - **指定場所: 「${u&&h&&m?h.location:p.trim()?p.trim():"ニュース内容に即した場所"}」**
           - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
           ${v.trim()?`
        5. **【強制服装指定 (Outfit Lock)】**:
           - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${v.trim()}』に変更して描写・行動させよ。
           - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
           `:`
        5. **【服装の自動選定 (Outfit Auto-Select)】**:
           - ニュースの内容と場所(Location)に**「最も適した服装カテゴリー」**を選定し、Outfit行に出力せよ。
           - **「キャラシート準拠」「デフォルト」等の曖昧な回答は禁止。** 必ず状況に適した服装の「属性」を出力すること。
           - 例: 海辺→「水着（swimwear）」、法廷→「ビジネススーツ（business suit）」、道の駅→「私服（casual wear）」、雪山→「防寒着（winter clothes）」、宇宙→「宇宙服（spacesuit）」
           - **⚠️【重要: クローン化防止】⚠️** 「白のビキニ」「デニムショートパンツ」のように細かく指定しすぎないこと。細かく指定すると全キャラクターが全く同じ服を着てしまうため、必ず**大分類のカテゴリー（ナース服、私服、パジャマなど）**に留め、個々の着こなしは画像AIに委ねよ。
           - 画像生成プロンプトでも選定した服装タグが反映される前提で、シナリオ内のト書き(Action)テキストにもその服装に基づく自然な描写を含めること。
           `}

         6. **【環境・リアクションのディテール構築 (Structural Directives)】**:
            以下のガイドラインを参照し、指定された場所の小道具や環境、キャラクターのリアクションを、**シナリオのト書き(Action)として構造的かつ文脈に沿って描写**せよ。AI特有の抽象的な表現は禁止する。
            
            ${g}
            
            ${b}

${S?`         7. **【作風完全適用の義務 (Strict Style Adherence)】**:
            以下の「作風プロンプト」を最優先事項としてシナリオ全体のトーン、セリフ、空気感に完全に適用せよ。
            - 作風名: ${S.style_name}
            - 作風詳細指示:
${S.reproduction_prompt}
${S.anti_patterns?`            - 絶対禁止事項:
${S.anti_patterns}`:""}
            (指示): この作風特有の語彙、リズム、テーマ性を全コマに浸透させよ。`:""}

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
                * **誇張を使った場合**: → [EMOTION: CHIBI_GAG] または [EMOTION: IMPACT] を推奨（BLANKは安易に乱用しないこと）。身体変形（目が飛び出す、顎が外れる、魂が抜ける）、異常なサイズ比、爆発的リアクション（椅子から吹っ飛ぶ、壁にめり込む）を状況欄に明記せよ
                * **逆転を使った場合**: → 普段と真逆のEMOTIONタグを選べ（普段クールなキャラに[EMOTION: CHIBI_GAG]、普段ふざけたキャラに[EMOTION: GEKIGA]）。ギャップをビジュアルで表現する
                * **緊張と緩和を使った場合**: → 1〜3コマ目は[EMOTION: GEKIGA]や[EMOTION: SHADOW]で極限の緊張感を絵で作り、4コマ目で[EMOTION: CHIBI_GAG]や[EMOTION: IMPACT]に急転直下（BLANKも状況に応じて使用可）。「絵柄の急変」で落差を最大化する
                * **不条理を使った場合**: → 背景に脈絡のない巨大オブジェクト（巨大バナナ、空飛ぶ鯨、唐突な富士山等）を配置。状況欄に「背景に○○が何の説明もなく存在する」と明記
                * **置換を使った場合**: → 元の文脈と置換先のビジュアル差を最大化。「国際会議の荘厳なテーブルに幼稚園児の工作道具が並んでいる」等、視覚的ミスマッチを明記
                * **常識に戻るを使った場合**: → 暴走キャラに[EMOTION: IMPACT]や[EMOTION: CHIBI_GAG]、常識キャラだけ[EMOTION: NORMAL]で冷静な表情。温度差を絵で表現する
             - ${M==="Auto"?`**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
                * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
                * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: NORMAL（通常の真顔・呆れ・点目）、CHIBI_GAG（ちび呆れ）。⚠️BLANK（白目）は安易に乱用せず、真顔や呆れ顔とバランスよく選択せよ）
                * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
                * **メタ崩壊型**: 漫画 of 枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止）
                * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
                * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
                * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: SAD, SHADOW, CHIBI_GAG。⚠️BLANKは乱用禁止）
                * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
                * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: CHIBI_GAG, NORMAL。⚠️BLANKは乱用禁止）
                * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止）`:M==="Surreal"?"**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: NORMAL（通常の真顔・呆れ顔・点目など）, CHIBI_GAG（ちびキャラでの呆れ・困惑）。⚠️BLANKは乱用せず、呆れや真顔とバランスよく選択せよ。":M==="Explosion"?"**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG":M==="FakeEmotion"?"**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。":M==="Metafiction"?"**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。":M==="Unreasonable"?"**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。":M==="RunningGag"?"**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。":M==="Dream"?"**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: SAD, SHADOW, CHIBI_GAG（ズッコケ）。⚠️BLANKは乱用を避け、目覚めた後のリアクションはNORMAL等も検討せよ。":M==="PsychoHorror"?"**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME":M==="Misunderstanding"?"**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: CHIBI_GAG, NORMAL。⚠️BLANKは乱用せず、呆れや真顔とバランスよく選択せよ。":M==="CanceledEnding"?"**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止。":M==="Documentary"?`**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
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
              - **【強制コメディトーン指定: ${A==="HighTension"?"ハイテンション爆発系":A==="SurrealQuiet"?"シュール静寂系":A==="IntellectualBlack"?"知性派ブラック系":"自動"}】**:
                ${A==="HighTension"?"今回は「ハイテンション爆発系」のトーンを徹底せよ。キャラクターは激しく叫び、オーバーリアクションをし、物理的または感情的に限界突破して暴走すること。ツッコミは烈火のごとく激しく、ボケは常軌を逸したハイテンションで行うこと。セリフの文末には「！」や「！？」を多用し、勢いを最大化せよ。推奨される感情絵柄タグ: IMPACT, CHIBI_GAG":A==="SurrealQuiet"?"今回は「シュール静寂系」のトーンを徹底せよ。狂った状況やボケに対して、キャラクターはあえて無表情、淡々とした態度、または真顔でリアクションすること。嵐の後のような静けさ、噛み合わない静かな狂気、奇妙な「間」を演出し、台詞も短く淡々としたものにせよ。大騒ぎせず、シュールな静寂で笑いを誘え。推奨される感情絵柄タグ: NORMAL（真顔・呆れ顔・点目など）, CHIBI_GAG, SHADOW。⚠️BLANKは乱用せず、真顔や呆れ顔とバランスよく選択せよ。":A==="IntellectualBlack"?"今回は「知性派ブラック系」のトーンを徹底せよ。現代社会の風刺、ブラックユーア、痛烈な皮肉、ダブルミーニング（裏の意味）を散りばめること。表面的には普通に見えても「よく考えると恐ろしい事実や狂気」が浮かび上がるように構成せよ。キャラクターは冷ややかに、あるいは皮肉たっぷりに会話を交わすこと。推奨される感情絵柄タグ: DARK_ANIME, GEKIGA, SHADOW":"ネタに合わせて最適なコメディトーン（ハイテンション爆発系、シュール静寂系、知性派ブラック系）を自律的に選択し、そのトーンに徹せよ。"}
              - **【Anti-Persona-Gravity Protocol（ペルソナ引力抑制）v2.0 — オチ多様化強制】**:
                * **問題**: 特定のキャラクター（特に「風紀委員」「委員長」「リーダー」等の権威的ペルソナを持つキャラ）が、オチを毎回独占し、「裁定・没収・制裁・処罰・禁止命令」系のワンパターンなオチになりやすい。
                * **対策（オチ担当キャラの強制分散）**: 4コマ目の「決めゼリフ」または「決定的行動（オチの主導権）」を担当するキャラクターは、CastList内の全キャラに均等に分散させよ。権威的キャラが毎回オチを支配するのは禁止。
                * **具体的な分散パターン（以下を積極的に活用せよ）**:
                  - 普段ボケ役のキャラが4コマ目で急に核心を突く正論を言い放つ
                  - 普段おとなしい・天然キャラが4コマ目で最も破壊的な行動を取る
                  - 権威キャラが4コマ目では逆にツッコまれる側・被害者になる
                  - 全員が同時にボケて誰もツッコまないカオスで終わる
                  - モブキャラや通行人が最後に一番おいしいセリフを持っていく
                * **注意**: 権威キャラがオチを担当すること自体は禁止しない。ただし連続使用を避け、他キャラにも均等にオチの見せ場を与えること。「いつも同じキャラが裁いて終わり」は読者に飽きられる最大の原因である。

           3.8 **【Guard C: AI定型文とクリシェの完全排除】**:
               - 以下のAI特有の退屈な表現・クリシェをシナリオ（ト書き・セリフ）から**完全に排除**せよ:
                * **まとめのナレーション禁止**: 「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等でオチを綺麗にまとめるのは絶対禁止。余韻はぶった斬れ。
                * **弱いリアクション禁止**: 「やれやれ」「ふふっ」「まあいいか」「思わず笑ってしまった」等の緊張感のない言葉は禁止。より鋭く、キャラの個性が尖ったリアクションにせよ。
                * **説明ゼリフ禁止**: 「〇〇が××してしまったぞ！」のように状況をそのまま口で説明するな。状況は絵（ト書き）で見せ、セリフは感情やツッコミに全振りせよ。
                * **オチの表情パターンの多様化（白目オチの偏り防止）**: 4コマ目のオチとして「全員が白目をむいて唖然とする」「凍りつく」等の『白目・フリーズ反応（BLANK）』ばかりに偏るのを防ぐこと。白目オチ自体は極限の絶望や魂抜けとして適した場面でのみ効果的に使用し（使用を完全に禁止するものではない）、それ以外の場面では能動的にツッコむ、爆笑する、冷静に呆れる（NORMALの真顔など）、あるいはツッコミ役が怒り狂うなど、状況に合わせた多様な表情や能動的なリアクションでオチを作れ。

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
               - BLANK: 白目・魂抜け。物理的な絶望や、頭から魂が抜けるレベルの衝撃に限定。安易な静寂・オチ・沈黙シーンでの乱用は避け、無言の静寂や呆れは NORMAL の「真顔・点目」や CHIBI_GAG でも表現して表情のバリエーションを確保すること。
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
          Outfit: [${v.trim()?"必ず『"+v.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
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

          【出力前思考プロセス：Semi-Formal Reasoning & Verbalized Confidence】
          あなたは最終回答を出力する前に、以下の思考プロセスを内部で必ず実行し、その推論ログ（Thought Trace）を必ず '<thought>' と '</thought>' のタグで囲んで出力の冒頭に残してください。
          1. [前提事実と現在の問題点列挙]
             - ニュースのトピック、および指定された場所や服装などの制約条件を列挙せよ。
          2. [実行パスのトレース]
             - 4コマの起承転結の各コマで、ズレ技法やコメディトーン、キャラクターたちのセリフや物理アクションをどのように構成するかシミュレーションせよ。
          3. [確信度の自己判定]
             - 以下の各項目の確信度を 0-100 で評価せよ：
               - ニュースの事実またはトピックが面白く反映されているか: (確信度: XX)
               - 全てのキャラクターが1回以上登場し、口調や設定が守られているか: (確信度: XX)
               - セリフの終止記号ルールなどのシステム制約が完全に守られているか: (確信度: XX)
             - 確信度が 80 未満の項目がある場合、設定や展開を自己修正（再検証）した上で最終結論を出力せよ。
          `,aM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。


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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,sM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,rM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:u,bg360Enabled:h,bg360CroppedPanels:m,enableChatGPTMode:p,VAR_CAST_LIST_CHATGPT:x,identityMatrix:v,activeOutfit:g,panelSections:b}=r,M=c&&u&&h?m&&m.length===4&&!p?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${u.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${u.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`:"",A=g?`- IGNORE reference clothing. All characters MUST wear exactly: ${g}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels.";return`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${e}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads "${i}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font.
- Draw tiny Japanese watermark text that reads "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" positioned at the bottom-left corner of the 4th panel, in an extremely small font size to prevent overlapping with the right watermark.
- Watermarks standard horizontal. The Japanese watermark on the left and the English watermark on the right must be small enough and spaced apart so they do not touch or overlap. NO extra white space below panel 4.
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
${A}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${x}
- Identity Anchor: ${v}
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
`},oM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:u,bg360Enabled:h,bg360CroppedPanels:m,VAR_CAST_LIST:p,identityMatrix:x,activeOutfit:v,dynamicCamera:g,panelSections:b}=r,M=c&&u&&h?m&&m.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${u.lighting}), objects (${u.objects||"various"}), and mood (${u.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${u.lighting}), spatial layout, objects (${u.objects||"various"}), and mood (${u.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:"",A=v?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:"",S=v?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${v}. Apply tags directly.`:"";return`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${e}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${i}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" (in an extremely small font size to prevent overlapping with the right watermark).
Watermarks standard horizontal. The Japanese watermark on the left and the English watermark on the right must be small enough and spaced apart so they do not touch or overlap. NO extra white space below panel 4.

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
${A}
Cast:
${p}
${S}
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
      `},hp=r=>{const e=[];let i=null;if(r.split(`
`).forEach(l=>{const c=l.replace(/\*\*/g,"").trim();if(c.startsWith("## ")){i&&e.push(i);const v=c.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();i={name:v,shortName:v.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!i)return;if(c.includes("髪")||c.toLowerCase().includes("hair")){const v=c.match(/\[WEIGHTS?\]:\s*(.*)/i),g=v?v[1].replace(/\|/g,""):c,b=g.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);b&&!i.hairColor&&(i.hairColor=b[1]);const M=g.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),A=g.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);i.hairStyle||(M?i.hairStyle=M[1]:A&&(i.hairStyle=A[1]))}const u=c.toLowerCase(),h=/\(no[\s_-]*glasses/i.test(u),m=/\([^)]*glasses[\s:]/i.test(u)&&!h;i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES"||(h?i.glasses="LOCKED_NO":m&&(i.glasses="LOCKED_YES")),!(i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES")&&(c.includes("眼鏡")||c.includes("メガネ")||u.includes("eyewear"))&&(u.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(c)?i.glasses="NO":(/(?:あり|有り|有|着用)/i.test(c)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(u))&&(i.glasses="YES"))}),i&&e.push(i),console.log("[IDENTITY MATRIX] Glasses detection results:"),e.forEach(l=>{console.log(`  ${l.shortName}: glasses=${l.glasses}, hair=${l.hairColor} ${l.hairStyle}`)}),e.length===0)return"";let s=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return s+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,e.forEach(l=>{const c=[];l.hairColor&&c.push(`${l.hairColor} hair`),l.hairStyle&&c.push(l.hairStyle),l.glasses==="YES"||l.glasses==="LOCKED_YES"?c.push("MUST HAVE glasses (do NOT remove)"):l.glasses==="NO"||l.glasses==="LOCKED_NO"?c.push("MUST NOT have glasses (bare eyes)"):c.push("check reference image for glasses status"),s+=`- [${l.shortName}]: ${c.join(", ")||"see reference image"}
`}),s+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,s+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,s},Vo=(r,e=[])=>{const i=r.replace(/[（(].*?[）)]/g,"").trim();return i?e.some(c=>{const u=c.split(/[（(]/)[0].trim();return i===c||i===u||u===i||i.includes(u)})?!0:/(?:氏|モブ|客|観客|司会|ナレーター|アナウンサー|男性|女性|男|女|スタッフ|社長|主催者|委員長|先生|選手|声|人|キャラ)$/.test(i)||i.toLowerCase().includes("mob")||i.toLowerCase().includes("speaker"):!1},yo=(r,e)=>{const s=hp(e).split(`
`).find(l=>l.includes(`[${r}]`));return s?s.split(":").slice(1).join(":").trim():""},lM=(r,e,i)=>{const s=r.match(/\[Camera:\s*(.*?)\]/i);if(s&&s[1]){const c=s[1].trim();let u="";for(const[h,m]of Object.entries(aE))if(c.includes(h)){u=m;break}return u?`${u}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const l=e[i.index%e.length];return i.index++,l},cM=r=>r.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),uM=(r,e)=>{const i=r.match(/\[Camera:\s*(.*?)\]/i);if(i&&i[1])return i[1].trim();const s=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return s[e.index%s.length]},w_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(u=>{const h=u.replace(/\*\*/g,"").trim();let m=h.match(/^##\s*(?:\d+\.\s*)?(.*)/);if(!m){const p=h.match(/^-?\s*Character\s*\[(.*?)\]/i);p&&(m=p)}if(m){const p=m[1].split(":")[0].trim();s.push(p);const x=p.split(/[\(（]/)[0].trim();x&&x!==p&&s.push(x);const v=p.match(/[\(（]\s*(.*?)\s*[\)）]/);v&&s.push(v[1].trim())}});const l=[];let c=1;if(i.forEach(u=>{const h=u.match(/^(.*?)(?:[:：]|「)/);let m=!1,p=u;if(h&&h[1].trim()){let v=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const g=/(?:が|を|に|で|へ|は|も|と|から|まで|より)/.test(v)&&v.length>5,b=/(?:が|を|に|で|へ|は|も|と|から|まで|より)$/.test(v),M=v.length>20,A=/^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ|聴覚|触覚|嗅覚|体内感覚|視覚|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(v),S=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(v),y=/[（(]\s*リアクション/i.test(h[1]);g||b||M||A||S||y||(Vo(v,s)||v.includes("全員")||v==="Speaker"||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&(m=!0)}else if(u.trim().startsWith("「")){const x=u.trim();if(/^「[^」]+」[？！。、!?\s]*$/.test(x)){const g=x.match(/^「([^」]+)」/)?.[1]||"",b=/(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(g),M=g.length<=4&&!/[がをにでへはもとからよねわ！？!?…。、]/.test(g);!b&&!M&&(m=!0)}}m&&(p=p.replace(/^.*?(?:[:：]|「)\s*/,""),p=p.trim(),p=p.replace(/^「+/,"").replace(/」+$/,""),p=p.replace(/（.*?）|\(.*?\)/g,""),p=p.trim(),p&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++))}),l.length===0){const u=/「([^」]+)」/g;let h,m=0;for(;(h=u.exec(r))!==null;){let p=h[1].trim();p=p.replace(/（.*?）|\(.*?\)/g,"").trim();const x=r.substring(m,h.index);if(m=u.lastIndex,!(Vo(x,s)||s.some(y=>{const R=y.split(/[（(]/)[0].trim();return R&&x.includes(R)})))continue;const g=/^[A-Za-z0-9Ω∩αβγδεζηθικλμνξοπρστυφχψω\s\-\+\*\/\\＝\?？!！]{1,3}$/.test(p),b=/(?:型|字|感|と書かれた|と書く|と書き|と書いた|という|のような|風の|的な|コード|キー|マーク|記号|ラベル|吹き出し|セリフ|ポーズ)$/.test(x.trim());if(g||b)continue;const M=s.filter(y=>{const R=y.split(/[\(（]/)[0].trim();return R&&p.includes(R)}),A=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(p),S=M.length>=2&&A&&p.length>15;p&&!S&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++)}}return l.length===0?"(Characters interact without dialogue in this panel)":l.join(", ")},fM=r=>{if(!r)return r;const e={"POPPING VEIN":'a cartoon popping vein symbol (symbolic representation only, do NOT draw the letters "POPPING VEIN" or any text)',"POPPING VEINS":'cartoon popping vein symbols (symbolic representation only, do NOT draw the letters "POPPING VEINS" or any text)',"LARGE SWEAT DROP":'a cartoon sweat drop symbol on the head (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROP" or any text)',"LARGE SWEAT DROPS":'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROPS" or any text)',"SWEAT DROP":'a cartoon sweat drop symbol (symbolic representation only, do NOT draw the letters "SWEAT DROP" or any text)',"SWEAT DROPS":'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "SWEAT DROPS" or any text)',"ANGER MARK":'a cartoon anger mark (symbolic representation only, do NOT draw the letters "ANGER MARK" or any text)',"ANGER MARKS":'cartoon anger marks (symbolic representation order, do NOT draw the letters "ANGER MARKS" or any text)',"SHOCK LINES":'cartoon shock lines (symbolic representation only, do NOT draw the letters "SHOCK LINES" or any text)',"SPEED LINES":'dynamic speed lines (symbolic representation only, do NOT draw the letters "SPEED LINES" or any text)'};let i=r;for(const[s,l]of Object.entries(e)){const c=new RegExp(`\\b${s}\\b`,"gi");i=i.replace(c,l)}return i},R_=(r,e,i="")=>{const s=r.split(`
`),l=[];e.split(`
`).forEach(h=>{const m=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(m){const p=m[1].trim();l.push(p);const x=p.split(/[\(（]/)[0].trim();x&&x!==p&&l.push(x);const v=p.match(/[\(（]\s*(.*?)\s*[\)）]/);v&&l.push(v[1].trim())}});let u=s.filter(h=>{const m=h.match(/^(.*?)(?:[:：]|「)/);let p=!1;if(m&&m[1].trim()){let g=m[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();g=g.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const b=/[がをにでへはもとからまでより]/.test(g)&&g.length>5,M=g.length>12,A=/^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(g),S=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(g.replace(/[（(].*$/,"").trim()),y=/[（(]\s*リアクション/i.test(m[1]);b||M||A||S||y||(Vo(g,l)||g==="全員"||g==="Speaker"||m[0].trim().endsWith(":")||m[0].trim().endsWith("："))&&(p=!0)}else if(h.trim().startsWith("「")){const g=h.trim();if(/^「[^」]+」[？！。、!?\s]*$/.test(g)){const M=g.match(/^「([^」]+)」/)?.[1]||"",A=/(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(M),S=M.length<=4&&!/[がをにでへはもとからよねわ！？!?…。、]/.test(M);!A&&!S&&(p=!0)}}const x=h.match(/^\[\d+コマ目/),v=h.trim()==="";return!p&&!x&&!v}).join(" ").trim();return u=u.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),u=u.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|背景|Background|カメラワーク|CameraWork|Camera\s*Work)[:：]?\s*(.*?)[)）]/gi,"$1"),u=u||"Characters interacting dynamically based on dialogue.",i&&l.forEach(h=>{const m=h.split("(")[0].trim();i.includes(m)}),fM(u)},C_=(r,e)=>e?`(All characters are wearing ${e}) ${r}`:r,pu=(r,e)=>{const s=r.split(`
`).filter(h=>{const m=h.trim();return/^\[EMOTION:/i.test(m)||/^状況(?:演出)?[：:]/i.test(m)?!1:m.includes("：")||m.includes(":")||m.includes("「")}),l=[],c={};e.split(`
`).forEach(h=>{const m=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(m){const p=m[1].trim(),x=p.split(/[（(]/)[0].trim();if(x){l.includes(x)||l.push(x),c[x]=x;const v=p.match(/[\(（]\s*(.*?)\s*[\)）]/);if(v){const g=v[1].trim();l.includes(g)||l.push(g),c[g]=x}}}});const u=[];if(s.forEach(h=>{const m=h.match(/^(.*?)(?:[:：]|「)/);if(m&&m[1].trim()){let p=m[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|EMOTION|[\(（].*?[\)）]|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const x=/[がをにでへはもとからまでより]/.test(p)&&p.length>5,v=p.length>12,g=/^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(p),b=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(p.replace(/[（(].*$/,"").trim()),M=/[（(]\s*リアクション/i.test(m[1]),A=/^(全員|みんな|Speaker)$/i.test(p);if(x||v||g||b||M||A)return;if(p&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(p)){const S=l.find(y=>p===y||p.includes(y)||y.includes(p));if(S||Vo(p,l)||m[0].trim().endsWith(":")||m[0].trim().endsWith("：")){const y=S?c[S]:p;u.includes(y)||u.push(y)}}}}),u.length>=3){const h=yo(u[0],e),m=yo(u[1],e),p=yo(u[2],e);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${u[0]}] (${h||"see reference"}) — First speaker
- CENTER ZONE: [${u[1]}] (${m||"see reference"}) — Second speaker
- LEFT ZONE: [${u[2]}] (${p||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${u[0]}] MUST be on the RIGHT third of the panel.
- [${u[1]}] MUST be in the CENTER of the panel.
- [${u[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${u[0]}]'s bubble on the RIGHT, [${u[1]}]'s in CENTER, [${u[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(u.length>=2){const h=yo(u[0],e),m=yo(u[1],e);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${u[0]}] (${h||"see reference"})
- LEFT side: [${u[1]}] (${m||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${h||u[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${m||u[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${u[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${u[0]}]'s head.
- [${u[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${u[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(u.length===1){const h=yo(u[0],e);return`CRITICAL PLACEMENT & IDENTITY: [${u[0]}] (${h||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},N_=(r,e)=>{const i=r.split(`
`),s=[],l={};e.split(`
`).forEach(M=>{const A=M.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(A){const S=A[1].trim(),y=S.split("(")[0].trim().split("（")[0].trim();if(y){s.includes(y)||s.push(y),l[y]={name:y,full:S};const R=S.match(/[\(（]\s*(.*?)\s*[\)）]/);if(R){const O=R[1].trim();s.includes(O)||s.push(O),l[O]={name:y,full:S}}}}});const c=[];i.forEach(M=>{const A=M.match(/^(.*?)(?:[:：]|「)/);if(A&&A[1].trim()){let S=A[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|[\(（].*?[\)）])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();if(S){if(S==="全員"||S==="Speaker")return;const y=s.find(R=>S===R||S.includes(R)||R.includes(S));if(y){const R=l[y].name;c.includes(R)||c.push(R)}else Vo(S,s)&&(c.includes(S)||c.push(S))}}});const u=[];i.forEach(M=>{const A=M.match(/^(.*?)(?:[:：]|「)/);let S=!1;if(A&&A[1].trim()){let y=A[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();y=y.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const R=/[がをにでへはもとからまでより]/.test(y)&&y.length>5,O=y.length>12,U=/^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(y),G=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(y.replace(/[（(].*$/,"").trim()),I=/[（(]\s*リアクション/i.test(A[1]);R||O||U||G||I||(Vo(y,s)||y==="全員"||y==="Speaker"||A[0].trim().endsWith(":")||A[0].trim().endsWith("："))&&(S=!0)}else if(!M.trim().startsWith("%NOTHING%")){if(M.trim().startsWith("「")){const y=M.trim();if(/^「[^」]+」[？！。、!?\s]*$/.test(y)){const O=y.match(/^「([^」]+)」/)?.[1]||"",U=/(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(O),G=O.length<=4&&!/[がをにでへはもとからよねわ！？!?…。、]/.test(O);!U&&!G&&(S=!0)}}}S||u.push(M)});const h=u.join(`
`),m=[...c];s.forEach(M=>{const A=l[M].name;!m.includes(A)&&h.includes(M)&&m.push(A)});let p=0;i.forEach(M=>{const A=M.trim();(A.includes("「")&&A.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(A))&&p++});const x=c.slice(0,3).map(M=>`[${M}]`),v=[...new Set(Object.values(l).map(M=>M.name))],g=v.filter(M=>!m.includes(M)),b=m.map(M=>`[${M}]`);if(x.length>0){let M=`ANTI-CLONE REMINDER: ${b.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;m.length===1&&p<=1?M+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${b[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${b[0]}. Leave the surrounding space empty rather than adding people.`:m.length===1&&p>=2&&(M+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${b[0]} (monologue/soliloquy). Draw only ${b[0]} — do NOT add a second character just because there are multiple bubbles.`);const A=x.join(" and "),S=b.filter(U=>!x.includes(U)),y=S.length>0?S.join(", "):"NO ONE ELSE";let R="";g.length>0&&(R=`
Do NOT draw ${g.map(G=>`[${G}]`).join(", ")} in this panel. They are completely absent from this scene.`);const O=`
FOREGROUND MUST CONTAIN ONLY: ${A}.
BACKGROUND MUST CONTAIN ONLY: ${y}.${R}
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${m.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${A} are the main focus.
${M}${O}`}else{let M="";return v.length>0&&(M=`
Do NOT draw ${v.map(S=>`[${S}]`).join(", ")} unless explicitly required.`),`CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice.${M}`}},dM=r=>{const e=r.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(e){const i=e[1].toUpperCase();if(Fi[i])return i}return"NORMAL"},O_=r=>{const e=dM(r);if(e==="NORMAL")return"";const i=Fi[e],s=/^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i,l=[];if(r.split(`
`).forEach(h=>{if(/^\[EMOTION:/i.test(h.trim()))return;const m=h.match(/^(.*?)(?:[:：]|「)/);if(m&&m[1].trim()){const p=m[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();p&&!l.includes(p)&&!s.test(p)&&l.push(p)}}),l.length>=2&&i.styleMulti){let h=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.styleMulti}`;return i.proportionsMulti&&(h+=`
PROPORTION OVERRIDE: ${i.proportionsMulti}`),i.vfxMulti&&(h+=`
VFX: ${i.vfxMulti}`),h}let u=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.style}`;return i.proportions&&(u+=`
PROPORTION OVERRIDE: ${i.proportions}`),i.vfx&&(u+=`
VFX: ${i.vfx}`),u},hM=(r,e)=>{let i="",s="",l=!1;const c=r.split(`
`);for(let u=0;u<c.length;u++){const h=c[u].replace(/\*\*/g,"").trim();if(h.startsWith("## ")&&(s=h.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),i+=`
- Character [${s}]: `,l=!1),!s||((h.includes("**基本")||h.includes("**髪")||h.includes("**顔")||h.includes("**服装")||h.includes("**性格"))&&(l=h.includes("服装")||h.includes("Outfit")),e&&(l||h.includes("服装")||h.includes("Outfit"))))continue;const p=h.match(/\[WEIGHTS?\]:\s*(.*)/i);if(p){let v=p[1].replace(/\|/g,"").trim();v&&v!=="()"&&v!=="-"&&(i+=v+", ");continue}const x=h.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);x&&x.length>=2&&(i+=x.join(", ")+", ")}return i.trim()||(i=r.trim()),i.trim()},pM=r=>{const e=[...r];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e},mu=(r,e,i)=>{const s=new RegExp(`\\[${e}.*?\\]([\\s\\S]*?)(?=\\[${i}|$)`,"i"),l=r.match(s);return l?l[1].trim():""},mM=({scenario:r,castList:e,colorMode:i,enableChatGPTMode:s,bg360Image:l,bg360Analysis:c,bg360Enabled:u,bg360CroppedPanels:h,punchlineType:m,systemVersion:p})=>{let x=i==="monochrome";if(i==="auto"){const W=e.toLowerCase();x=W.includes("style_tag: monochrome")||W.includes("monochrome")||W.includes("greyscale")||W.includes("screentone")}const v=x?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",g=sE;let b=r.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||r.split(`
`)[0].substring(0,20);b=b.replace(/^Topic:\s*/i,"").trim();const M=r.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),A=r.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),S=M||"Generic Detailed Background",y=A&&!/^(なし|キャラシート準拠|none|default)/i.test(A)?A:"";let R=r.replace(/```(?:json|markdown)?/gi,"").trim();R=R.replace(/Generated by.*?$/i,"").trim();const O=mu(R,"1コマ目","2コマ目")||R,U=mu(R,"2コマ目","3コマ目"),G=mu(R,"3コマ目","4コマ目"),I=mu(R,"4コマ目","UNKNOWN"),B=pM(iE).slice(0,4),w={index:0},F=hM(e,y),$=s?cM(F):F,k=S,X=b||"4-koma Manga",te=s?`Generated by ChatGPT with Super FURU AI 4-koma ${p}`:`Generated by Gemini with Super FURU AI 4-koma ${p}`;let oe="";const V=[O,U,G,I];let L="";s?(L=V.map((W,ce)=>`## Panel ${ce+1}
${O_(W)}
${pu(W,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
${N_(W,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
Camera: ${uM(W,w)}
Action: ${C_(R_(W,e,pu(W,e)),y)}
Dialogue (Japanese text inside speech bubbles only): ${w_(W,e)}`).join(`

`),oe=rM({safeTopic:X,watermarkEng:te,styleCore:v,safeLocation:k,bg360Image:l,bg360Analysis:c,bg360Enabled:u,bg360CroppedPanels:h,enableChatGPTMode:s,VAR_CAST_LIST_CHATGPT:$,identityMatrix:hp(e),activeOutfit:y,panelSections:L})):(L=V.map((ce,ge)=>`## Panel ${ge+1}
${O_(ce)}
${pu(ce,e)}
${N_(ce,e)}
Camera: ${lM(ce,B,w)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${C_(R_(ce,e,pu(ce,e)),y)}.
Dialogue (ONLY inside bubbles): ${w_(ce,e)}.`).join(`

`),oe=rE+oM({safeTopic:X,watermarkEng:te,styleCore:v,safeLocation:k,bg360Image:l,bg360Analysis:c,bg360Enabled:u,bg360CroppedPanels:h,VAR_CAST_LIST:F,identityMatrix:hp(e),activeOutfit:y,dynamicCamera:g,panelSections:L}));let z=KE(oe.trim());return m==="Documentary"&&(z=ZE(z)),z};async function gM({castList:r,categories:e,inputMode:i,manualTopic:s,searchTopic:l,targetDate:c,customLocation:u,customOutfit:h,punchlineType:m,bg360Image:p,bg360Analysis:x,bg360Enabled:v,bg360ImageParts:g,styleJson:b,onProgress:M,onCameraProgress:A}){let S="";if(i==="manual")S="手動入力";else{const L=e.filter(z=>z.checked);L.length>0?S=L.map(z=>z.keywords).join(" "):S="最新ニュース"}const y=`${S} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let R="";if(i==="manual"){R=`
    【ユーザー提供トピック/URL】:
    ${s}
    
    (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
    URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
    `;const L=/(https?:\/\/[^\s]+)/g,z=s.match(L);if(z&&z.length>0){M(`手動入力内にURLを検出: ${z[0]}
> プロキシ経由でコンテンツを取得中...`);try{const W=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(z[0])}`);if(!W.ok)throw new Error(`HTTP error! status: ${W.status}`);const ce=await W.text(),P=new DOMParser().parseFromString(ce,"text/html");P.querySelectorAll("script, style").forEach(ee=>ee.remove());const _e=P.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let Ae="";_e.forEach(ee=>{ee.textContent.trim()&&(Ae+=ee.textContent.trim()+`
`)}),Ae.trim()||(Ae=P.body.textContent||"");const Oe=Ae.replace(/\s+/g," ").substring(0,3e3);M(`コンテンツ抽出完了 (${Oe.length}文字)。注入中...`),R=`
        【指定URLから独自のスクレイピングで抽出した内容】:
        ${Oe}
        
        (指示): 上記はユーザーが入力したURL（ ${z[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
        `}catch(W){console.error("URL Fetch Error: ",W),M(`警告: URLコンテンツの取得に失敗しました (${W.message})。LLMの内部知識で補完します。`)}}}const O=Object.keys($v),U=O[Math.floor(Math.random()*O.length)],G=p&&x&&v?x.location:u.trim()?u.trim():U;M(`ローカルRAGにアクセス中...
> 舞台「${G}」に関する演出情報および感情リアクション辞書を取得中...`);const I=qE(G),B=$E();let w=m;if(!m||m==="Auto"){const L=["Explosion","Surreal","FakeEmotion","Metafiction","Unreasonable","RunningGag","Dream","PsychoHorror","Misunderstanding","CanceledEnding"];w=L[Math.floor(Math.random()*L.length)]}const F=["HighTension","SurrealQuiet","IntellectualBlack"],$=F[Math.floor(Math.random()*F.length)];M(`📝 演出設計: [オチ] ${w} / [トーン] ${$}`),b&&M(`📝 [作風適用] 外部JSONの作風『${b.style_name}』をシナリオ構成に注入します...`);const k=iM({randomCategory:S,targetDate:c,inputMode:i,manualTopic:s,newsContext:R,searchTopicKeywords:y,bg360Image:p,bg360Analysis:x,bg360Enabled:v,customLocation:u,forcedLocation:U,customOutfit:h,ragLocationDetails:I,ragReactions:B,punchlineType:w,comedyTone:$,styleJson:b}),X=await Fr(k,[],r,M);let te={topic:S,scenario:""};try{const L=X.text.match(/Topic:\s*(.+)/i),z=X.text.match(/Logline:\s*(.+)/i),W=X.text.match(/Location:\s*(.+)/i),ce=X.text.match(/Outfit:\s*(.+)/i),ge=X.text.match(/Punchline:\s*(.+)/i),P=X.text.match(/Scenario:\s*([\s\S]+)/i);if(P)te.topic=L?L[1].trim():S,te.topic=te.topic.replace(/^Topic:\s*/i,"").trim(),te.logline=z?z[1].trim():"",te.location=W?W[1].trim():"Generic Background",te.outfit=ce?ce[1].trim():"",te.punchline=ge?ge[1].trim():"",te.scenario=P[1].trim();else{const Z=X.text.match(/\{[\s\S]*\}/);if(Z){const _e=JSON.parse(Z[0]);te.topic=_e.topic||S,te.location=_e.location||"Generic Background",te.scenario=_e.scenario||X.text}else{if(X.text.length<20)throw new Error("AI returned empty or invalid response.");te.topic=i==="manual"?s||"Custom Scenario":l||"Generated Scenario",te.scenario=X.text}}}catch(L){console.warn("Parse warning:",L),te.scenario=X.text,te.topic="Generated Scenario"}let oe=null,V=null;if(p&&x&&v&&g)try{A("🎬 [360° Camera AI] カメラワーク自律設計を開始...");const L=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${te.scenario}

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
}`,W=(await Fr(L,[g],null,A)).text.match(/\{[\s\S]*\}/)?.[0];if(W){oe=JSON.parse(W),A("🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中..."),V=[];for(const ce of oe.panels){const ge=await QE(p,ce.yaw,ce.pitch||0,ce.fov||90);V.push(ge)}}}catch(L){console.warn("[360° Camera AI] Camera work design failed:",L),A(`⚠️ [Camera AI] カメラワーク設計に失敗しました: ${L.message}`)}return{topic:te.topic,logline:te.logline,location:te.location,outfit:te.outfit,punchline:te.punchline,scenario:te.scenario,cameraWork:oe,croppedPanels:V,usedModel:X.model,thought:X.thought}}async function xM({scenario:r,enhanceCategories:e,castList:i,styleJson:s,onProgress:l}){const c=nM(r,e,s),u=await Fr(c,[],i,l);return{text:u.text.trim(),usedModel:u.model,thought:u.thought}}async function Rh({finalPrompt:r,policyErrorMsg:e,onProgress:i,selectedEngine:s}){if(!r||!e)throw new Error("プロンプトとエラーメッセージが必要です。");i("[Phase 1/5] エラーメッセージを解析中..."),i("[Phase 2/5] 問題箇所の特定をAIにリクエスト中...");const l=aM(e.trim(),r),c=await Fr(l,[],null,i);if(i("[Phase 3/5] AIの応答を受信・解析中..."),!c.text||c.text.trim().length<10)throw new Error("AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。");i("[Phase 4/5] 置換テーブルをプロンプトに適用中...");let u=[],h=!1;try{let x=c.text.trim();const v=x.match(/```(?:json)?\s*([\s\S]*?)```/);v&&(x=v[1].trim());const g=x.indexOf("["),b=x.lastIndexOf("]");g!==-1&&b!==-1&&(x=x.substring(g,b+1)),u=JSON.parse(x),h=Array.isArray(u)&&u.length>0}catch(x){console.warn("JSON parse error, falling back to full regeneration:",x)}if(h){let x=r,v=0,g=0;for(const b of u)!b.from||!b.to||(x.includes(b.from)?(x=x.replace(b.from,b.to),v++,i(`✅ "${b.from.substring(0,40)}..." → "${b.to.substring(0,40)}..." (${b.reason||""})`)):(g++,i(`⚠️ 未発見（スキップ）: "${b.from.substring(0,50)}..."`)));if(v>0)return{success:!0,method:"replacement",modifiedPrompt:x,appliedCount:v,failedCount:g}}i("[Fallback] 全文再生成モードで修正中...");const m=sM(e.trim(),r),p=await Fr(m,[],null,i);if(p.text&&p.text.length>100)return{success:!0,method:"regeneration",modifiedPrompt:p.text.trim()};throw new Error("フォールバックでも適切な応答が得られませんでした。")}function _M(){console.log("System Version Loaded:",Ql);const[r,e]=Ce.useState(""),[i,s]=Ce.useState(!1),[l,c]=Ce.useState("gemini"),[u,h]=Ce.useState("news"),[m,p]=Ce.useState(""),[x,v]=Ce.useState(""),[g,b]=Ce.useState(""),[M,A]=Ce.useState(""),[S,y]=Ce.useState(""),[R,O]=Ce.useState(""),[U,G]=Ce.useState("Auto"),[I,B]=Ce.useState(Th),w=Mt=>{B(Pt=>Pt.map(gt=>gt.id===Mt?{...gt,checked:!gt.checked}:gt))},F=()=>{const Mt=new Date;return Mt.setHours(Mt.getHours()+9),Mt.toISOString().split("T")[0]},[$,k]=Ce.useState(F()),[X,te]=Ce.useState(""),[oe,V]=Ce.useState(""),[L,z]=Ce.useState(""),[W,ce]=Ce.useState(""),[ge,P]=Ce.useState(null),[Z,_e]=Ce.useState(!1);Ce.useEffect(()=>{const Mt=cm();Mt?(Hu(Mt),e(Mt)):s(!0)},[]);const[Ae,Oe]=Ce.useState([]),[ee,Ee]=Ce.useState(null),[we,Ge]=Ce.useState(!1),[Ze,Ke]=Ce.useState(!1),[At,ut]=Ce.useState(!1),[je,Dt]=Ce.useState(!1),[xt,mn]=Ce.useState(!1),[Kt,kt]=Ce.useState(""),[q,yt]=Ce.useState(""),[vt,Et]=Ce.useState(""),[ve,Vt]=Ce.useState(""),[D,T]=Ce.useState("auto"),[J,me]=Ce.useState(!1),[Te,ye]=Ce.useState([]),[Ue,fe]=Ce.useState(""),[pe,Le]=Ce.useState(!1),[ze,Ne]=Ce.useState(""),[Pe,rt]=Ce.useState(!1),[ht,ct]=Ce.useState(!1),[j,De]=Ce.useState(!1),he=3,Ie=Ce.useRef(""),[Fe,Re]=Ce.useState(!1),[We,it]=Ce.useState(!1),[rn,Lt]=Ce.useState(!1),[Kn,In]=Ce.useState(!1),[Bi,ea]=Ce.useState(!1),[ta,zi]=Ce.useState(!1),[Un,gn]=Ce.useState(!1),[En,li]=Ce.useState(!1),[na,Cn]=Ce.useState(""),[wa,xa]=Ce.useState(!1),[ci,Mi]=Ce.useState(""),[xi,Ti]=Ce.useState(!1),[xn,Ai]=Ce.useState(!1),[yn,Ra]=Ce.useState(!1),[C,K]=Ce.useState(""),[le,ne]=Ce.useState(!1),[ie,He]=Ce.useState(!1),[Xe,Be]=Ce.useState(!1),[qe,Ye]=Ce.useState(!1),[Qe,pt]=Ce.useState(null),[Je,It]=Ce.useState(null),[Wt,Ft]=Ce.useState(null),[Bt,Ct]=Ce.useState(!1),[Ve,ei]=Ce.useState(""),[Ut,Pn]=Ce.useState(!1),[jn,ui]=Ce.useState(!1),[_i,Zt]=Ce.useState(null),[sn,vi]=Ce.useState(null),[en,Zn]=Ce.useState(!1),[wi,Fn]=Ce.useState(!1),Gi=Ce.useRef(!1);Ce.useEffect(()=>{Gi.current=wi},[wi]);const[$o,Ko]=Ce.useState(!1),_a=Ce.useRef(!1),[vs,bi]=Ce.useState(0),[lc,df]=Ce.useState(0),[bs,Hi]=Ce.useState(0),ti=Ce.useRef(!1),[ar,ni]=Ce.useState(!1),Hr=Ce.useRef(null),sr=Ce.useRef(null),cc=Ce.useRef(null),rr=Ce.useRef(null),Xa=Ce.useRef(null);Ce.useEffect(()=>{Xa.current&&(Xa.current.scrollTop=Xa.current.scrollHeight)},[Te]),At||!X||X.length<20||!oe||oe.length<20;const[Zo,Mn]=Ce.useState(""),[Ya,ys]=Ce.useState([]),or=Mt=>{const Pt=Mt.replace(/[^\u0000-\u007F]/g,"").trim();Pt!==Mt&&_t("APIキーに含まれる不要な文字を自動削除しました。"),Pt.startsWith("sk-")?(fp(Pt),Ah("openai"),c("openai"),Ai(!0),Ti(!0),e("openai-engine-active"),s(!1),_t("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(Hu(Pt),e(Pt),Ah("gemini"),c("gemini"),s(!1),_t("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},_t=Mt=>{Vt(Mt),setTimeout(()=>Vt(""),4e3)},Qo=async Mt=>{if(!r){_t("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(Mt.length===0)return;const Pt=X;Ge(!0),kt(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let gt=0;const ft=setInterval(()=>{gt++,kt(Me=>{if(gt<=10){const st=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return Me+st[Math.floor(Math.random()*st.length)]}const jt=`
> ⏳ AI応答を待機中... (${Math.floor(gt*.8)}秒経過)`,et=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return et.test(Me)?Me.replace(et,"")+jt:Me+jt})},800),lt=[];let wt=null,nt=null;for(let Me=0;Me<Mt.length;Me++){const at=Mt[Me];if(at.name.endsWith(".json")||at.type==="application/json"){try{const st=await at.text(),Qt=JSON.parse(st);Qt.style_name&&Qt.reproduction_prompt?(nt=Qt,Ee(Qt),_t(`作風を適用: ${Qt.style_name}`),kt(Ri=>Ri+`
> 🎭 作風JSONを検出: ${Qt.style_name}`)):(_t("⚠️ 無効なJSONです。作風解析エンジンの出力を使用してください。"),kt(Ri=>Ri+`
> ⚠️ 読み込まれたJSONは作風解析エンジン用ではありませんでした。`))}catch{_t("⚠️ JSONファイルの読み込みに失敗しました。")}continue}const jt=await new Promise(st=>{const Qt=new FileReader;Qt.onload=Bn=>{const yi=Bn.target.result,Tn=new Uint8Array(yi);let Nn=!1;const ur="equirectangular";let fr=0;for(let dr=0;dr<Math.min(Tn.length,65536);dr++)if(Tn[dr]===ur.charCodeAt(fr)){if(fr++,fr===ur.length){Nn=!0;break}}else fr=0;const ia=new Image;ia.onload=()=>{const dr=ia.naturalWidth/ia.naturalHeight,Tf=Math.abs(dr-2)<.15;st(Tf&&Nn)},ia.onerror=()=>st(!1),ia.src=URL.createObjectURL(at)};const Ri=at.slice(0,65536);Qt.readAsArrayBuffer(Ri)}),et=new FileReader;et.readAsDataURL(at),await new Promise(st=>{et.onload=()=>{jt&&!wt?(wt={base64:et.result,mimeType:at.type},kt(Qt=>Qt+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(lt.push(et.result),Oe(Qt=>[...Qt,et.result])),st()}})}if(wt)try{ui(!0),pt(wt.base64);const Me=wt.base64.split(",")[1],at={inlineData:{mimeType:wt.mimeType,data:Me}};It(at),Ct(!0),kt(st=>st+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const jt=await Fr(JE(),[at],null,()=>{}),et=eM(jt.text);Ft(et),b(et.location),_t(`🌐 360°背景を検出: ${et.location}`),kt(st=>st+`
> 🌐 空間解析完了: ${et.location}`)}catch(Me){console.warn("[360° BG] Analysis failed:",Me),Ft({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像（解析失敗）")}finally{Ct(!1)}if(lt.length===0&&wt){clearInterval(ft),Ge(!1),kt(Me=>Me+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),_t("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(lt.length===0){clearInterval(ft),Ge(!1),nt&&kt(Me=>Me+`
> ✅ 作風JSONを読み込みました。`);return}_t(`思考モード: ${lt.length}枚のキャラクター設定画を同時解析中...${wt?"（+ 360°背景1枚検出済み）":""}`);try{const Me=lt.map(et=>{const st=et.split(",")[1];return{inlineData:{mimeType:et.split(";")[0].split(":")[1],data:st}}});let at=tM();Pt&&Pt.trim().length>10&&(at+=`


【最重要: 既存キャストリストのマージ指示】
現在、すでに以下のキャストリストが存在します。
既存のキャラクターの設定や、ユーザーによる手動修正内容を一切変更・削除することなく維持してください。
今回新しく提供された画像から解析された新キャラクターの情報を、既存のフォーマットに合わせて重複しないように末尾に追加（マージ）した、最終的なキャストリストを出力してください。
既存のキャラクターが今回追加された画像と同一であると明確に判断できる場合は、既存の設定に新しい特徴をマージ・追記しても構いませんが、基本的には既存の情報を消さないでください。

【既存のキャストリスト】
${Pt}`);const jt=await Fr(at,Me,null,et=>{kt(st=>st+`
> ${et}`)});te(jt.text),P(jt.model),kt(et=>{const st=`

--- ✅ 解析完了 ---
`,Qt=jt.thought&&jt.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${jt.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return et+st+Qt}),_t("全キャラクターの解析が完了しました。"),Gi.current&&(ti.current?(Fn(!1),bi(0),ni(!1),_t("⏹ フルオートを中断しました。")):Hi(et=>et+1))}catch(Me){console.error(Me);const at=wh(Me.message);kt(jt=>jt+`

[システムエラー]: ${Me.message}
--------------------------------------------------
${at}`),_t("解析エラー: "+Me.message),Gi.current&&(Fn(!1),bi(0),ni(!1))}finally{clearInterval(ft),Ge(!1)}},Jo=async()=>{if(!oe||oe.length<20)return _t("先にシナリオを生成してください。");if(!(Fe||We||rn||Kn||Bi||ta||Un))return _t("少なくとも1つの強化カテゴリをONにしてください。");if(En)return;li(!0),Cn("> [START] シナリオ強化を開始します..."),ci||(Mi(oe),Cn(lt=>lt+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const Pt=[];Fe&&Pt.push("【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。..."),We&&Pt.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。"),rn&&Pt.push("【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください。"),Kn&&Pt.push("【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。"),Bi&&Pt.push("【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。"),ta&&Pt.push("【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。"),Cn(lt=>lt+`
> [CONFIG] 強化カテゴリ: ${Pt.length}個`);let gt=0;const ft=setInterval(()=>{gt++,Cn(lt=>{const nt=`
> ⏳ AI応答を待機中... (${Math.floor(gt*.8)}秒経過)`,Me=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return Me.test(lt)?lt.replace(Me,"")+nt:lt+nt})},800);try{Cn(wt=>wt+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const lt=await xM({scenario:oe,enhanceCategories:Pt,castList:X,styleJson:ee,onProgress:wt=>Cn(nt=>nt+`
> [API] ${wt}`)});lt&&lt.text&&lt.text.length>50?(V(lt.text),Cn(wt=>{const nt=wt+`
> [SUCCESS] シナリオを強化しました！（${lt.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`;return lt.thought?nt+`

--- ✅ シナリオ強化完了 (思考トレース) ---
`+lt.thought:nt}),Re(!1),it(!1),Lt(!1),In(!1),ea(!1),zi(!1),gn(!1),_t("シナリオ強化完了！")):(Cn(wt=>wt+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),_t("強化失敗: AIの応答が不十分です"))}catch(lt){Cn(wt=>wt+`
> [ERROR] ${lt.message}`),_t("強化エラー: "+lt.message)}finally{clearInterval(ft),li(!1)}},lr=()=>{ci&&(V(ci),Mi(""),Cn(Mt=>Mt+`
> [REVERT] 元のシナリオに復元しました。`),_t("シナリオを元に戻しました"))},cr=async(Mt,Pt=null)=>{if(!X)return _t("先にキャラクターを解析してください。");if(Ze)return;const gt=Array.isArray(Mt)?Mt:I,ft=Pt||u;if(ft==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(ft==="news"&&!gt.find(Me=>Me.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}Ke(!0),yt(""),ce(""),Mn(null),Et(""),ye([]),Mi(""),Cn("");let lt="";if(ft==="manual")lt="手動入力",V(""),yt(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const Me=gt.filter(at=>at.checked);Me.length>0?(lt=Me.map(at=>at.keywords).join(" "),_t(`カテゴリ「${Me.map(at=>at.label).join("・")}」で最新ニュースを検索中... (${$})`),V(""),yt(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${Me.map(at=>at.label).join("、")} (キーワード: ${lt}) 
 > 対象日付: ${$} 
 > Google Grounding で検索中...`)):lt="最新ニュース"}let wt=0;const nt=setInterval(()=>{wt++,yt(Me=>{if(wt<=8){const st=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return Me+st[Math.floor(Math.random()*st.length)]}const jt=`
> ⏳ AI応答を待機中... (${Math.floor(wt*.8)}秒経過)`,et=/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;return et.test(Me)?Me.replace(et,"")+jt:Me+jt})},800);try{const Me=await gM({castList:X,categories:gt,inputMode:ft,manualTopic:m,searchTopic:x,targetDate:$,customLocation:g,customOutfit:M,punchlineType:U,bg360Image:Qe,bg360Analysis:Wt,bg360Enabled:jn,bg360ImageParts:Je,styleJson:ee,onProgress:Bn=>yt(yi=>yi+`
 > [API] ${Bn} `),onCameraProgress:Bn=>{Bn.startsWith("🎬")?(yt(yi=>yi+`
 > ${Bn}`),Bn.includes("開始")?Zn(!0):(Bn.includes("完了")||Bn.includes("失敗"))&&Zn(!1)):yt(yi=>yi+`
 > [Camera AI] ${Bn}`)}});if(P(Me.usedModel),y(g.trim()||Me.location||"Unspecified"),O(M.trim()||Me.outfit||""),Me.cameraWork){Zt(Me.cameraWork);const Bn=Nn=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Nn%360+360)%360/45)%8],yi=Nn=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Nn]||Nn;let Tn=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Me.cameraWork.panels.forEach(Nn=>{Tn+=`
 > 🎬 コマ${Nn.panel}: ${Bn(Nn.yaw)} (yaw:${Nn.yaw}°) / ${yi(Nn.camera)} / FOV:${Nn.fov}°`,Tn+=`
 >    └─ ${Nn.reasoning}`}),Tn+=`
 > 🎬 ══════════════════════════════════`,yt(Nn=>Nn+Tn)}Me.croppedPanels&&(vi(Me.croppedPanels),yt(Bn=>Bn+`
 > 🔲 [Crop] ✅ ${Me.croppedPanels.length}枚のクロップ画像を生成しました`));const at=Me.logline?`
Logline: ${Me.logline}`:"",jt=M.trim()||Me.outfit?`
Outfit: ${M.trim()||Me.outfit}`:"",et=Me.punchline?`
Punchline: ${Me.punchline}`:"",st=Qe?jn?`
🌐 360°背景: ON (${Wt?.location||"解析済み"} / ${Wt?.spatialType==="indoor"?"室内":Wt?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";let Qt="";if(Me.cameraWork){const Bn=Tn=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Tn%360+360)%360/45)%8],yi=Tn=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Tn]||Tn;Qt=`
🎬 360° Camera Work:`,Me.cameraWork.panels.forEach(Tn=>{Qt+=`
  Panel${Tn.panel}: ${Bn(Tn.yaw)}(${Tn.yaw}°) ${yi(Tn.camera)} FOV${Tn.fov}° — ${Tn.reasoning}`})}const Ri=`## タイトル: ${Me.topic} !?${at}
Location: ${Me.location||"Unspecified"}${jt}${et}${st}${Qt}

${Me.scenario} `;return V(Ri),_t("シナリオの生成が完了しました！"),Zn(!1),Me.thought&&yt(Bn=>Bn+`

--- ✅ シナリオ生成完了 (思考トレース) ---
`+Me.thought),Ri}catch(Me){console.error(Me);const at=wh(Me.message);return yt(jt=>jt+`

[システムエラー]: ${Me.message}
--------------------------------------------------
${at}`),_t("シナリオ生成エラー"),Zn(!1),null}finally{clearInterval(nt),Ke(!1)}},kr=async(Mt=!1,Pt=null,gt=null)=>{const ft=Pt||oe;if(!Mt&&(!X||!ft))return _t("キャストとシナリオが必要です。");ut(!0),ce(""),ye([]),fe(""),Ne(""),rt(!1),ct(!1),Ie.current="",Et("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const lt=typeof gt=="boolean"?gt:xi,wt=setInterval(()=>{Et(nt=>{if(nt.length>800)return nt;const Me=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!At)return nt;const at=Me[Math.floor(Math.random()*Me.length)];return nt+at})},600);try{const nt=mM({scenario:ft,castList:X,colorMode:D,enableChatGPTMode:lt,bg360Image:Qe,bg360Analysis:Wt,bg360Enabled:jn,bg360CroppedPanels:sn,punchlineType:U,systemVersion:Ql});return await new Promise(Me=>setTimeout(Me,800)),U==="Documentary"&&Et(Me=>Me+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`),Et(Me=>Me+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ce(nt),Et(Me=>Me+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),_t("最終プロンプトの構築が完了しました。画像生成を開始します..."),nt}catch(nt){console.error(nt);const Me=wh(nt.message);return Et(at=>at+`

[システムエラー]: ${nt.message}
--------------------------------------------------
${Me}`),_t("生成エラー: "+nt.message),null}finally{clearInterval(wt),ut(!1)}};Ce.useEffect(()=>{W&&!At&&uc>=3&&kr()},[xi]);const hf=()=>{V(""),ce(""),Mn(null),yt(""),Et(""),ye([]),Fn(!1),bi(0),b(""),A(""),pt(null),It(null),Ft(null),Zt(null),vi(null),Zn(!1),B(Th),p(""),v(""),y(""),O(""),ui(!1),G("Auto"),h("news"),Mi(""),Re(!1),it(!1),Lt(!1),In(!1),ea(!1),zi(!1),gn(!1),li(!1),Cn(""),xa(!1),fe(""),Le(!1),Ne(""),rt(!1),ct(!1),Ie.current="",He(!1),Be(!1),_t("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},pf=()=>{te(""),V(""),ce(""),Oe([]),Mn(null),kt(""),yt(""),Et(""),Fn(!1),bi(0),b(""),A(""),pt(null),It(null),Ft(null),Zt(null),vi(null),Zn(!1),P(null),ys([]),ye([]),B(Th),p(""),v(""),y(""),O(""),ui(!1),G("Auto"),h("news"),Mi(""),Re(!1),it(!1),Lt(!1),In(!1),ea(!1),zi(!1),gn(!1),li(!1),Cn(""),xa(!1),fe(""),Le(!1),Ne(""),rt(!1),ct(!1),Ie.current="",ne(!1),He(!1),Be(!1),e(""),Hu(""),fp(""),Ah(""),c(""),Ai(!1),Ti(!1),s(!0),_t("全データをリセットしました。APIキーを再入力してください。")},[mf,Vr]=Ce.useState(!1),[gf,xf]=Ce.useState(!1),[_f,vf]=Ce.useState(!1),bf=()=>{W&&(navigator.clipboard.writeText(W),Vr(!0),setTimeout(()=>Vr(!1),2e3),Ue||Ie.current?(rt(!0),ct(!1),_t("📋 コピーしました → Web版に貼り付けて、下の🛡️救済パネルで手動対応できます")):_t("クリップボードにコピーしました！"))},jr=async(Mt=!1,Pt=null)=>{const gt=Pt||W;if(je||!Mt&&!gt)return!1;Dt(!0),mn(!1),fe(""),Ie.current="",ct(!1);const ft=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];xi&&(l==="openai"?ft.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):ft.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),ye(ft);let lt=0;const wt=setInterval(()=>{lt++;const nt=Math.floor(lt*1.5);ye(Me=>{const at=Me.findIndex(jt=>jt.startsWith("[WAIT]"));if(at!==-1){const jt=[...Me];return jt[at]=`[WAIT] ⏳ 画像生成API応答を待機中... (${nt}秒経過)`,jt}return[...Me,`[WAIT] ⏳ 画像生成API応答を待機中... (${nt}秒経過)`]})},1500);await new Promise(nt=>setTimeout(nt,800));try{_t(xn?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),ye(st=>[...st,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(st=>setTimeout(st,1e3));const nt=st=>{ye(Qt=>[...Qt,st])};let Me,at;if(xn){nt("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const st=await tE(gt,nt);Me=st.base64Img,at=st.usedModel}else{const st=sn&&jn&&sn.length===4?sn:[];st.length>0&&nt(`[REF] 360°背景クロップ画像 ${st.length}枚を参照画像として添付`);const Qt=await jE(gt,nt,st);Me=Qt.base64Img,at=Qt.usedModel}ye(st=>[...st,`[4/5] データストリーム受信完了 (Model: ${at})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const jt=`data:image/png;base64,${Me}`;Mn(jt),ys(st=>[{id:Date.now(),img:jt},...st]);const et=at&&at.startsWith("gpt-");return at&&!at.startsWith("gemini-3")&&!et?(_e(!0),ye(st=>[...st,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${xn?"ChatGPT":"Gemini"}(Web版)を開く: ${xn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${xn?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(_e(!1),ye(st=>[...st,"[COMPLETE] Image successfully generated."])),_t("画像生成完了！"),!0}catch(nt){console.error(nt),mn(!0),Mn(null);const Me=nt.message||"";let at=[];return Me.includes("Unknown parameter")||Me.includes("Invalid parameter")?at=[`[ERROR GUIDE] ⚙️ APIパラメータの形式が不正です（${xn?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】AIモデルの仕様更新により、送信パラメータが合わなくなっている可能性があります。","[ERROR GUIDE] 【対処法】お手数ですが以下の手動手順で画像を生成してください。","[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",`[ERROR GUIDE] 2. ${xn?"ChatGPTウェブ版":"Geminiウェブ版"} を開きます: ${xn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。"]:Me.includes("sensitive")||Me.includes("Responsible AI")||Me.includes("content_policy_violation")||Me.includes("400")&&(Me.includes("safety")||Me.includes("policy")||Me.includes("violation")||Me.includes("sensitive"))?(fe(Me),Ie.current=Me,ct(!0),at=["[ERROR GUIDE] 🚨 表現の一部がAIの安全基準（ポリシー）に触れたため、生成がスキップされました。","[ERROR GUIDE] 【自動修正】「自動修正して再生成する」を押すと、安全な言葉に書き換えて自動で作り直します。","[ERROR GUIDE] 【手動生成】プロンプトをコピーし、公式のウェブ版チャット等に貼り付けて直接お試しください。"]):Me.includes("not found")||Me.includes("not supported")||Me.includes("404")||Me.includes("403")||Me.includes("401")?(wi&&(ti.current=!0),at=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、本アプリ経由での画像生成が許可されていないか、無効になっています（${xn?"OpenAI":"Google"}の権限設定）。`,"[ERROR GUIDE] 【対処法】本アプリでの自動生成は一旦諦め、以下の手順で公式ウェブ版から手動で生成してください。","[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",`[ERROR GUIDE] 2. ${xn?"ChatGPTウェブ版":"Geminiウェブ版"} を開きます: ${xn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。"]):at=[`[ERROR GUIDE] ⏲️ 接続タイムアウト、または一時的な通信エラーで生成に失敗しました（${xn?"OpenAI":"Google"}サーバーの混雑など）。`,"[ERROR GUIDE] 【対処法】数分時間を置いてから「画像を生成する」を再度試すか、以下の手順で公式ウェブ版から生成してください。","[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",`[ERROR GUIDE] 2. ${xn?"ChatGPTウェブ版":"Geminiウェブ版"} を開きます: ${xn?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。"],ye(jt=>[...jt,`[ERROR] ${nt.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...at]),_t(`生成エラー: ${nt.message} `),!1}finally{clearInterval(wt),Dt(!1)}},yf=async()=>{if(!W||!Ue.trim())return;Le(!0),Ne("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let Mt=0;const Pt=setInterval(()=>{Mt++,Ne(gt=>{const lt=`
> ⏳ AI分析中... (${Math.floor(Mt*1)}秒経過)`,wt=/\n> ⏳ AI分析中\.\.\..*\(\d+秒経過\)/;return wt.test(gt)?gt.replace(wt,lt):gt+lt})},1e3);try{const gt=await Rh({finalPrompt:W,policyErrorMsg:Ue,selectedEngine:l,onProgress:ft=>Ne(lt=>lt+`
> ${ft}`)});gt.success&&gt.modifiedPrompt&&(ce(gt.modifiedPrompt),gt.method==="replacement"?Ne(ft=>ft+`
> [Phase 5/5] ✅ ${gt.appliedCount}箇所を修正しました（${gt.failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`):Ne(ft=>ft+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),Ne(ft=>ft+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),fe(""),Ie.current="")}catch(gt){console.error(gt),Ne(ft=>ft+`
> [ERROR] ${gt.message}`)}finally{clearInterval(Pt),Le(!1)}},Sf=async()=>{const Mt=Ie.current||Ue;if(!W||!Mt.trim())return;ct(!1),De(!0),ye(ft=>[...ft,"[POLICY AUTO-FIX] 🔄 自動修正を開始します..."]),Ne("> [AUTO-FIX] コンテンツポリシーアドバイザーを起動中..."),Le(!0);let Pt=0;const gt=setInterval(()=>{Pt++,Ne(ft=>{const wt=`
> ⏳ AI分析中... (${Math.floor(Pt*1)}秒経過)`,nt=/\n> ⏳ AI分析中\.\.\..*\(\d+秒経過\)/;return nt.test(ft)?ft.replace(nt,wt):ft+wt})},1e3);try{const ft=await Rh({finalPrompt:W,policyErrorMsg:Mt,selectedEngine:l,onProgress:lt=>Ne(wt=>wt+`
> ${lt}`)});if(clearInterval(gt),ft.success&&ft.modifiedPrompt){ce(ft.modifiedPrompt);const lt=ft.method==="replacement"?`✅ ${ft.appliedCount}箇所を修正（${ft.failedCount}箇所スキップ）`:"✅ フォールバック方式で配慮版プロンプトを生成";Ne(nt=>nt+`
> ${lt}`),ye(nt=>[...nt,`[POLICY AUTO-FIX] ${lt}。修正プロンプトで再生成します...`]),fe(""),Ie.current="",Le(!1),await jr(!0,ft.modifiedPrompt)&&ye(nt=>[...nt,"[POLICY AUTO-FIX] ✅ 自動修正＆再生成が成功しました！"])}else throw new Error("AIがプロンプトを修正できませんでした。")}catch(ft){clearInterval(gt),console.error("[POLICY AUTO-FIX] Error:",ft),Ne(lt=>lt+`
> [ERROR] ${ft.message}`),ye(lt=>[...lt,`[POLICY AUTO-FIX] ❌ 自動修正に失敗: ${ft.message}`]),ct(!0)}finally{Le(!1),De(!1)}},Ef=()=>{ct(!1),rt(!0),fe(""),Ie.current="",W&&navigator.clipboard.writeText(W);const Mt=xn?"https://chatgpt.com/":"https://gemini.google.com/app",Pt=xn?"ChatGPT":"Gemini";ye(gt=>[...gt,"[POLICY WEB-SWITCH] 📋 プロンプトをクリップボードにコピーしました。",`[POLICY WEB-SWITCH] 🌐 ${Pt} Web版で画像を生成してください: ${Mt}`,"[POLICY WEB-SWITCH] 💡 Web版に貼り付け時、キャラクターシート画像も一緒に添付すると再現性が高まります。"]),_t(`📋 プロンプトをコピーしました → ${Pt} Web版に貼り付けてください`)};Ce.useEffect(()=>{bs>0&&!ti.current&&Mf()},[bs]);const Mf=async()=>{if(!X||X.length<20){_t("先にキャラクターシートをアップロードしてください。"),Fn(!1);return}ti.current=!1,Fn(!0),Ti(!1),V(""),ce(""),Mn(null),yt(""),Et(""),ye([]),Mi(""),Cn(""),fe(""),Ie.current="",ct(!1),bi(2);const Mt=[...I].sort(()=>Math.random()-.5),Pt=Math.random()>.5?2:1,gt=Mt.slice(0,Pt).map(et=>et.id),ft=I.map(et=>({...et,checked:gt.includes(et.id)}));B(ft),b(""),A(""),h("news"),await new Promise(et=>setTimeout(et,400)),Hr.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(et=>setTimeout(et,600));const lt=await cr(ft,"news");if(ti.current||!lt){Fn(!1),bi(0),ni(!1),ti.current&&_t("⏹ フルオートを中断しました。");return}bi(3),sr.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(et=>setTimeout(et,300));const wt=await kr(!0,lt,!1);if(ti.current||!wt){Fn(!1),bi(0),ni(!1),ti.current&&_t("⏹ フルオートを中断しました。");return}bi(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(et=>setTimeout(et,300));let nt=!1,Me=0,at=wt;for(;!nt&&Me<=he&&!ti.current;)if(nt=await jr(!0,at),!nt&&Ie.current&&Me<he){Me++,ct(!1),Le(!0),ye(et=>[...et,`[FULL-AUTO POLICY-FIX] 🔄 コンテンツポリシー自動修正 (${Me}/${he})...`]),Ne(`> [FULL-AUTO ${Me}/${he}] コンテンツポリシーアドバイザーを起動中...`);try{const et=await Rh({finalPrompt:at,policyErrorMsg:Ie.current,selectedEngine:l,onProgress:st=>Ne(Qt=>Qt+`
> ${st}`)});if(et.success&&et.modifiedPrompt){at=et.modifiedPrompt,ce(et.modifiedPrompt),fe(""),Ie.current="",Le(!1);const st=et.method==="replacement"?`✅ ${et.appliedCount}箇所を修正`:"✅ フォールバック方式で修正";ye(Qt=>[...Qt,`[FULL-AUTO POLICY-FIX] ${st}。修正プロンプトで再生成します...`])}else{Le(!1),ye(st=>[...st,"[FULL-AUTO POLICY-FIX] ❌ AIがプロンプトを修正できませんでした。"]);break}}catch(et){Le(!1),console.error("[FULL-AUTO POLICY-FIX] Error:",et),ye(st=>[...st,`[FULL-AUTO POLICY-FIX] ❌ 自動修正エラー: ${et.message}`]);break}}else if(!nt)break;Le(!1);const jt=!!Ie.current;!nt&&jt?(ye(et=>[...et,`[FULL-AUTO POLICY-FIX] ⚠️ ポリシーエラーのため自動生成を停止しました（リトライ: ${Me}/${he}回）。`,_a.current?"[FULL-AUTO] 次の作品に進みます...":"[FULL-AUTO] ユーザーに判断を委ねます。メッセージボックスを表示します。"]),_a.current||ct(!0)):(ct(!1),Ie.current=""),await new Promise(et=>setTimeout(et,800)),rr.current?.scrollIntoView({behavior:"smooth",block:"center"}),_a.current?ti.current?(Fn(!1),bi(0),ni(!1),_t("⏹ 連続生成を中断しました。")):(_t(nt?"🔄 連続生成モードON：次の作品を生成します...":jt?"🔄 ポリシーエラーのため次の作品に進みます...":"🔄 生成エラーのため次の作品に進みます..."),setTimeout(()=>{ti.current||Hi(et=>et+1)},2e3)):(Fn(!1),bi(0),ni(!1),nt&&_t("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},el=()=>{if(wi){ti.current=!0,Ke(!1),ut(!1),Dt(!1),Le(!1),Zn(!1),Fn(!1),bi(0),ni(!1),_t("⏹ フルオートを中断しました。");return}ti.current=!1,ni(!1),Fn(!0),X&&X.length>=20?Hi(Mt=>Mt+1):_t("🚀 フルオート待機中: キャラクターシートをドロップしてください")},uc=!X||X.length<1?1:!oe||oe.length<1?2:W?Zo?5:4:3;return{analyzeThought:Kt,apiKey:r,assemblePrompt:kr,assembleThought:vt,bg360Analysis:Wt,bg360CameraWork:_i,bg360CroppedPanels:sn,bg360Enabled:jn,bg360Image:Qe,castList:X,categories:I,colorMode:D,copyPrompt:bf,currentStep:uc,customLocation:g,customOutfit:M,enableChatGPTMode:xi,enableOpenAIApi:xn,enhanceBackgrounds:Kn,enhanceBodyLang:We,enhanceCameraWork:Bi,enhanceDialogue:ta,enhanceEffects:rn,enhanceExpressions:Fe,enhanceLog:na,enhanceScenario:Jo,finalPrompt:W,fullAutoStep:vs,genLog:Te,genLogRef:Xa,generateScenarioFromNews:cr,generatedImage:Zo,generationHistory:Ya,handleFullAutoToggle:el,handleSetKey:or,hardReset:pf,imageResultRef:rr,images:Ae,inputMode:u,is360Analyzing:Bt,is360CameraWorking:en,isAborting:ar,isAnalyzing:we,isAssembling:At,isCastListCopied:le,isCopied:mf,isDragging:J,isEndlessMode:$o,isEndlessModeRef:_a,isEnhancePanelOpen:wa,isEnhancing:En,isFallbackUsed:Z,isFixPromptCopied:gf,isFixingPolicy:pe,isFullAutoMode:wi,isGeneratingImage:je,isMetaSaved:Xe,isPolicyCopied:_f,isPolicyPanelOpen:Pe,showPolicyChoice:ht,policyAutoRetrying:j,handlePolicyAutoFix:Sf,handlePolicySwitchToWeb:Ef,MAX_POLICY_RETRIES:he,isScenarioCopied:ie,isSearching:Ze,mangaTitle:L,manualTopic:m,originalScenario:ci,outputRef:cc,partialReset:hf,policyErrorMsg:Ue,policyFixLog:ze,processFiles:Qo,punchlineType:U,regenerateImage:jr,regenerateSafePrompt:yf,revertScenario:lr,scenario:oe,scenarioThought:q,selectedEngine:l,setBg360Enabled:ui,setCastList:te,setCustomLocation:b,setCustomOutfit:A,setEnableOpenAIApi:Ai,setEnhanceBackgrounds:In,setEnhanceBodyLang:it,setEnhanceCameraWork:ea,setEnhanceDialogue:zi,setEnhanceEffects:Lt,setEnhanceExpressions:Re,setGeneratedImage:Mn,setGenerationHistory:ys,setImages:Oe,setInputMode:h,setIsCastListCopied:ne,setIsDragging:me,setIsEndlessMode:Ko,setIsEnhancePanelOpen:xa,setIsFixPromptCopied:xf,setIsMetaSaved:Be,setIsPolicyCopied:vf,setIsPolicyPanelOpen:rt,setIsScenarioCopied:He,setManualTopic:p,setPolicyErrorMsg:fe,setPunchlineType:G,setScenario:V,setShowModal:s,setShowOpenAIKeyModal:Ra,setStyleJson:Ee,setTargetDate:k,showModal:i,showOpenAIKeyModal:yn,showStatus:_t,status:ve,step2Ref:Hr,step3Ref:sr,styleJson:ee,targetDate:$,toggleCategory:w,usedModel:ge}}const D_=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=Ce.useState(""),[u,h]=Ce.useState("");if(Ce.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",x=s==="openai",v=p,g=l.trim().startsWith("sk-"),b=x?"OpenAI API Key が必要です":v?"AI Engine を選択":"API Key が必要です",M=v?"Gemini AI Key または OpenAI Key (sk-...) を入力...":x?"sk-proj-...":"Google AI API Key を入力...",A="https://aistudio.google.com/app/apikey",S="https://platform.openai.com/api-keys",y=x?S:A,R=x?"🔑 OpenAI キーを取得":"🔑 キーを取得",O=v&&g||x?"emerald":"blue",U=O==="emerald"?"bg-emerald-600":"bg-blue-600",G=O==="emerald"?"border-emerald-500/30":"border-blue-500/30",I=O==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=O==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",w=O==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=O==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return _.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:_.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:_.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${G} rounded-xl shadow-2xl ${I} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&_.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:_.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[_.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),_.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),_.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[_.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[_.jsx("div",{className:`p-2 ${U} rounded-lg animate-pulse transition-colors duration-300`,children:_.jsx(Zu,{size:18,className:"text-white"})}),_.jsxs("div",{children:[_.jsx("p",{className:"text-sm font-bold text-white",children:b}),_.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),_.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[_.jsx("div",{className:"flex gap-2",children:_.jsxs("form",{onSubmit:$=>{$.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[_.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:$=>c($.target.value),placeholder:M,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${w} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:$=>$.key==="Enter"&&m(),autoFocus:!0}),_.jsx("button",{onClick:m,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),u&&_.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:u})]})]}),v?_.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[_.jsxs("div",{className:"flex items-center gap-3",children:[_.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[_.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&_.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),_.jsxs("div",{className:"flex items-center gap-4",children:[_.jsx("a",{href:A,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),_.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),_.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):_.jsx("div",{className:"flex justify-end",children:_.jsx("a",{href:y,target:"_blank",rel:"noreferrer",className:`text-[11px] ${O==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:R})})]})})})};class Kv extends Uv.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?_.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[_.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",Ql,")"]}),_.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),_.jsx("br",{}),this.state.errorInfo?.componentStack]}),_.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}const Ju=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=Ce.useRef(null);Ce.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:_.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[_.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),_.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[_.jsx(rm,{size:16})," Neural Process (Thinking Mode)"]}),_.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&_.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};function vM({apiKey:r,isDragging:e,setIsDragging:i,processFiles:s,images:l,setImages:c,bg360Image:u,bg360Enabled:h,isAnalyzing:m,analyzeThought:p,castList:x,setCastList:v,isCastListCopied:g,setIsCastListCopied:b,currentStep:M,setShowModal:A,styleJson:S,setStyleJson:y}){return _.jsxs("section",{onDragOver:R=>{R.preventDefault(),r&&i(!0)},onDragLeave:()=>i(!1),onDrop:R=>{R.preventDefault(),i(!1),r&&s(R.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
        ${e?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
        ${M===1&&!e?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
        ${M>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[_.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[_.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${M===1?"text-blue-400":"text-slate-500"} `,children:[_.jsx(CS,{size:18})," STEP 01: キャラクター解析（設定の読み込み）"]}),m&&_.jsx(Qi,{size:18,className:"animate-spin text-blue-400"}),M>1&&_.jsx(ha,{size:18,className:"text-blue-500"})]}),_.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[l.map((R,O)=>_.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[_.jsx("img",{src:R,className:"w-full h-full object-cover shadow-sm",alt:`char-${O}`}),_.jsx("button",{onClick:()=>c(l.filter((U,G)=>G!==O)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:_.jsx(Ku,{size:16})})]},O)),u&&_.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${h?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[_.jsx("img",{src:u,className:`w-full h-full object-cover shadow-sm ${h?"opacity-100":"opacity-40 grayscale"}`,alt:"360 bg"}),_.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[_.jsx(Zl,{size:8})," 360° BACKGROUND"]})]}),S&&_.jsxs("div",{className:"relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-purple-500/50 bg-purple-900/30 flex items-center justify-center group/style transition-all shadow-sm",title:`適用中の作風: ${S.style_name}

クリックして解除`,children:[_.jsxs("div",{className:"text-center p-1 w-full",children:[_.jsx("span",{className:"text-[8px] block opacity-70 text-purple-300 font-bold mb-0.5",children:"適用中の作風"}),_.jsx("div",{className:"text-[10px] text-white font-bold leading-tight line-clamp-2",children:S.style_name})]}),_.jsxs("button",{onClick:()=>y(null),className:"absolute inset-0 bg-black/70 opacity-0 group-hover/style:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[2px]",children:[_.jsx(Ku,{size:16}),_.jsx("span",{className:"text-[10px] ml-1 font-bold",children:"解除"})]})]}),_.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[m?_.jsx(Qi,{size:16,className:"animate-spin"}):_.jsx(YS,{size:16,className:"group-hover/add:scale-125 transition-transform"}),_.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:R=>{r?s(R.target.files):A(!0)},disabled:m})]}),l.length===0&&!m&&_.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[_.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:R=>{r?s(R.target.files):A(!0)}}),_.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクター設定画像（キャラシート）をここにドロップしてください。 ",_.jsx("span",{className:"text-blue-400",children:"（複数枚を同時に、または後から追加ドロップすることも可能です。360°背景画像や、作風設定のJSONファイルも一緒に読み込めます）"})]}),_.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前や性格、特徴が書かれた設定シートを推奨。",_.jsx("br",{}),"※Story Makerなどで出力した「作風json」ファイルを投げ込むと、漫画のタッチや作風が変化します。"]}),_.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[_.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),_.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),m&&_.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[_.jsxs("span",{className:"relative flex h-3 w-3",children:[_.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),_.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),_.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",l.length," chars... ",_.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),_.jsx("div",{className:"mb-4",children:_.jsx(Ju,{thought:p})}),_.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[_.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 抽出されたキャラクター設定 (自由に編集・追加できます)"}),_.jsx("textarea",{value:x,onChange:R=>v(R.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),_.jsx("div",{className:"mt-2 relative z-50",children:_.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(x),b(!0),setTimeout(()=>b(!1),2e3)},disabled:!x,className:`w-full ${g?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[g?_.jsx(ha,{size:20}):_.jsx(Kl,{size:20}),g?"コピー完了":"📋 キャラクター設定をコピー"]})})]})]})}const um="184",zo={ROTATE:0,DOLLY:1,PAN:2},Bo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bM=0,L_=1,yM=2,ku=1,SM=2,Yl=3,tr=0,Pi=1,hs=2,ms=0,Go=1,I_=2,U_=3,P_=4,EM=5,Dr=100,MM=101,TM=102,AM=103,wM=104,RM=200,CM=201,NM=202,OM=203,pp=204,mp=205,DM=206,LM=207,IM=208,UM=209,PM=210,FM=211,BM=212,zM=213,GM=214,gp=0,xp=1,_p=2,jo=3,vp=4,bp=5,yp=6,Sp=7,Zv=0,HM=1,kM=2,Ba=0,Qv=1,Jv=2,eb=3,tb=4,nb=5,ib=6,ab=7,sb=300,Br=301,Xo=302,Vu=303,Ch=304,of=306,Ep=1e3,ps=1001,Mp=1002,oi=1003,VM=1004,gu=1005,mi=1006,Nh=1007,Ir=1008,ma=1009,rb=1010,ob=1011,tc=1012,fm=1013,Ha=1014,Pa=1015,xs=1016,dm=1017,hm=1018,nc=1020,lb=35902,cb=35899,ub=1021,fb=1022,Aa=1023,_s=1026,Ur=1027,db=1028,pm=1029,zr=1030,mm=1031,gm=1033,ju=33776,Xu=33777,Yu=33778,Wu=33779,Tp=35840,Ap=35841,wp=35842,Rp=35843,Cp=36196,Np=37492,Op=37496,Dp=37488,Lp=37489,ef=37490,Ip=37491,Up=37808,Pp=37809,Fp=37810,Bp=37811,zp=37812,Gp=37813,Hp=37814,kp=37815,Vp=37816,jp=37817,Xp=37818,Yp=37819,Wp=37820,qp=37821,$p=36492,Kp=36494,Zp=36495,Qp=36283,Jp=36284,tf=36285,em=36286,jM=3200,F_=0,XM=1,Qs="",Zi="srgb",nf="srgb-linear",af="linear",cn="srgb",So=7680,B_=519,YM=512,WM=513,qM=514,xm=515,$M=516,KM=517,_m=518,ZM=519,z_=35044,G_="300 es",Fa=2e3,sf=2001;function QM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ic(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function JM(){const r=ic("canvas");return r.style.display="block",r}const H_={};function k_(...r){const e="THREE."+r.shift();console.log(e,...r)}function hb(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function mt(...r){r=hb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function Jt(...r){r=hb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function tm(...r){const e=r.join(" ");e in H_||(H_[e]=!0,mt(...r))}function eT(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const tT={[gp]:xp,[_p]:yp,[vp]:Sp,[jo]:bp,[xp]:gp,[yp]:_p,[Sp]:vp,[bp]:jo};class ir{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,u=l.length;c<u;c++)l[c].call(this,e);e.target=null}}}const di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qu=Math.PI/180,nm=180/Math.PI;function sc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(di[r&255]+di[r>>8&255]+di[r>>16&255]+di[r>>24&255]+"-"+di[e&255]+di[e>>8&255]+"-"+di[e>>16&15|64]+di[e>>24&255]+"-"+di[i&63|128]+di[i>>8&255]+"-"+di[i>>16&255]+di[i>>24&255]+di[s&255]+di[s>>8&255]+di[s>>16&255]+di[s>>24&255]).toLowerCase()}function Ht(r,e,i){return Math.max(e,Math.min(i,r))}function nT(r,e){return(r%e+e)%e}function Oh(r,e,i){return(1-i)*r+i*e}function zl(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ii(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const iT={DEG2RAD:qu},Tm=class Tm{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Ht(this.x,e.x,i.x),this.y=Ht(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Ht(this.x,e,i),this.y=Ht(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ht(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ht(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,u=this.y-e.y;return this.x=c*s-u*l+e.x,this.y=c*l+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tm.prototype.isVector2=!0;let Ot=Tm;class nr{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,u,h){let m=s[l+0],p=s[l+1],x=s[l+2],v=s[l+3],g=c[u+0],b=c[u+1],M=c[u+2],A=c[u+3];if(v!==A||m!==g||p!==b||x!==M){let S=m*g+p*b+x*M+v*A;S<0&&(g=-g,b=-b,M=-M,A=-A,S=-S);let y=1-h;if(S<.9995){const R=Math.acos(S),O=Math.sin(R);y=Math.sin(y*R)/O,h=Math.sin(h*R)/O,m=m*y+g*h,p=p*y+b*h,x=x*y+M*h,v=v*y+A*h}else{m=m*y+g*h,p=p*y+b*h,x=x*y+M*h,v=v*y+A*h;const R=1/Math.sqrt(m*m+p*p+x*x+v*v);m*=R,p*=R,x*=R,v*=R}}e[i]=m,e[i+1]=p,e[i+2]=x,e[i+3]=v}static multiplyQuaternionsFlat(e,i,s,l,c,u){const h=s[l],m=s[l+1],p=s[l+2],x=s[l+3],v=c[u],g=c[u+1],b=c[u+2],M=c[u+3];return e[i]=h*M+x*v+m*b-p*g,e[i+1]=m*M+x*g+p*v-h*b,e[i+2]=p*M+x*b+h*g-m*v,e[i+3]=x*M-h*v-m*g-p*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,u=e._order,h=Math.cos,m=Math.sin,p=h(s/2),x=h(l/2),v=h(c/2),g=m(s/2),b=m(l/2),M=m(c/2);switch(u){case"XYZ":this._x=g*x*v+p*b*M,this._y=p*b*v-g*x*M,this._z=p*x*M+g*b*v,this._w=p*x*v-g*b*M;break;case"YXZ":this._x=g*x*v+p*b*M,this._y=p*b*v-g*x*M,this._z=p*x*M-g*b*v,this._w=p*x*v+g*b*M;break;case"ZXY":this._x=g*x*v-p*b*M,this._y=p*b*v+g*x*M,this._z=p*x*M+g*b*v,this._w=p*x*v-g*b*M;break;case"ZYX":this._x=g*x*v-p*b*M,this._y=p*b*v+g*x*M,this._z=p*x*M-g*b*v,this._w=p*x*v+g*b*M;break;case"YZX":this._x=g*x*v+p*b*M,this._y=p*b*v+g*x*M,this._z=p*x*M-g*b*v,this._w=p*x*v-g*b*M;break;case"XZY":this._x=g*x*v-p*b*M,this._y=p*b*v-g*x*M,this._z=p*x*M+g*b*v,this._w=p*x*v+g*b*M;break;default:mt("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],u=i[1],h=i[5],m=i[9],p=i[2],x=i[6],v=i[10],g=s+h+v;if(g>0){const b=.5/Math.sqrt(g+1);this._w=.25/b,this._x=(x-m)*b,this._y=(c-p)*b,this._z=(u-l)*b}else if(s>h&&s>v){const b=2*Math.sqrt(1+s-h-v);this._w=(x-m)/b,this._x=.25*b,this._y=(l+u)/b,this._z=(c+p)/b}else if(h>v){const b=2*Math.sqrt(1+h-s-v);this._w=(c-p)/b,this._x=(l+u)/b,this._y=.25*b,this._z=(m+x)/b}else{const b=2*Math.sqrt(1+v-s-h);this._w=(u-l)/b,this._x=(c+p)/b,this._y=(m+x)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,u=e._w,h=i._x,m=i._y,p=i._z,x=i._w;return this._x=s*x+u*h+l*p-c*m,this._y=l*x+u*m+c*h-s*p,this._z=c*x+u*p+s*m-l*h,this._w=u*x-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,u=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,u=-u,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),x=Math.sin(p);m=Math.sin(m*p)/x,i=Math.sin(i*p)/x,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+u*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+u*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Am=class Am{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(V_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(V_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,u=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*u,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*u,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*u,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,u=e.y,h=e.z,m=e.w,p=2*(u*l-h*s),x=2*(h*i-c*l),v=2*(c*s-u*i);return this.x=i+m*p+u*v-h*x,this.y=s+m*x+h*p-c*v,this.z=l+m*v+c*x-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Ht(this.x,e.x,i.x),this.y=Ht(this.y,e.y,i.y),this.z=Ht(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Ht(this.x,e,i),this.y=Ht(this.y,e,i),this.z=Ht(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ht(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,u=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*u-s*m,this.z=s*h-l*u,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Dh.copy(this).projectOnVector(e),this.sub(Dh)}reflect(e){return this.sub(Dh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ht(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Am.prototype.isVector3=!0;let ae=Am;const Dh=new ae,V_=new nr,wm=class wm{constructor(e,i,s,l,c,u,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,u,h,m,p)}set(e,i,s,l,c,u,h,m,p){const x=this.elements;return x[0]=e,x[1]=l,x[2]=h,x[3]=i,x[4]=c,x[5]=m,x[6]=s,x[7]=u,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,u=s[0],h=s[3],m=s[6],p=s[1],x=s[4],v=s[7],g=s[2],b=s[5],M=s[8],A=l[0],S=l[3],y=l[6],R=l[1],O=l[4],U=l[7],G=l[2],I=l[5],B=l[8];return c[0]=u*A+h*R+m*G,c[3]=u*S+h*O+m*I,c[6]=u*y+h*U+m*B,c[1]=p*A+x*R+v*G,c[4]=p*S+x*O+v*I,c[7]=p*y+x*U+v*B,c[2]=g*A+b*R+M*G,c[5]=g*S+b*O+M*I,c[8]=g*y+b*U+M*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],u=e[4],h=e[5],m=e[6],p=e[7],x=e[8];return i*u*x-i*h*p-s*c*x+s*h*m+l*c*p-l*u*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],u=e[4],h=e[5],m=e[6],p=e[7],x=e[8],v=x*u-h*p,g=h*m-x*c,b=p*c-u*m,M=i*v+s*g+l*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/M;return e[0]=v*A,e[1]=(l*p-x*s)*A,e[2]=(h*s-l*u)*A,e[3]=g*A,e[4]=(x*i-l*m)*A,e[5]=(l*c-h*i)*A,e[6]=b*A,e[7]=(s*m-p*i)*A,e[8]=(u*i-s*c)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,u,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*u+p*h)+u+e,-l*p,l*m,-l*(-p*u+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Lh.makeScale(e,i)),this}rotate(e){return this.premultiply(Lh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Lh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};wm.prototype.isMatrix3=!0;let St=wm;const Lh=new St,j_=new St().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),X_=new St().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function aT(){const r={enabled:!0,workingColorSpace:nf,spaces:{},convert:function(l,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===cn&&(l.r=gs(l.r),l.g=gs(l.g),l.b=gs(l.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===cn&&(l.r=Ho(l.r),l.g=Ho(l.g),l.b=Ho(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Qs?af:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,u){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return tm("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return tm("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[nf]:{primaries:e,whitePoint:s,transfer:af,toXYZ:j_,fromXYZ:X_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Zi},outputColorSpaceConfig:{drawingBufferColorSpace:Zi}},[Zi]:{primaries:e,whitePoint:s,transfer:cn,toXYZ:j_,fromXYZ:X_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Zi}}}),r}const $t=aT();function gs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ho(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Eo;class sT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Eo===void 0&&(Eo=ic("canvas")),Eo.width=e.width,Eo.height=e.height;const l=Eo.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Eo}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=ic("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let u=0;u<c.length;u++)c[u]=gs(c[u]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(gs(i[s]/255)*255):i[s]=gs(i[s]);return{data:i,width:e.width,height:e.height}}else return mt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rT=0;class vm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rT++}),this.uuid=sc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let u=0,h=l.length;u<h;u++)l[u].isDataTexture?c.push(Ih(l[u].image)):c.push(Ih(l[u]))}else c=Ih(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Ih(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sT.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(mt("Texture: Unable to serialize Texture."),{})}let oT=0;const Uh=new ae;class gi extends ir{constructor(e=gi.DEFAULT_IMAGE,i=gi.DEFAULT_MAPPING,s=ps,l=ps,c=mi,u=Ir,h=Aa,m=ma,p=gi.DEFAULT_ANISOTROPY,x=Qs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oT++}),this.uuid=sc(),this.name="",this.source=new vm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new St,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uh).x}get height(){return this.source.getSize(Uh).y}get depth(){return this.source.getSize(Uh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){mt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){mt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sb)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ep:e.x=e.x-Math.floor(e.x);break;case ps:e.x=e.x<0?0:1;break;case Mp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ep:e.y=e.y-Math.floor(e.y);break;case ps:e.y=e.y<0?0:1;break;case Mp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gi.DEFAULT_IMAGE=null;gi.DEFAULT_MAPPING=sb;gi.DEFAULT_ANISOTROPY=1;const Rm=class Rm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,u=e.elements;return this.x=u[0]*i+u[4]*s+u[8]*l+u[12]*c,this.y=u[1]*i+u[5]*s+u[9]*l+u[13]*c,this.z=u[2]*i+u[6]*s+u[10]*l+u[14]*c,this.w=u[3]*i+u[7]*s+u[11]*l+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],x=m[4],v=m[8],g=m[1],b=m[5],M=m[9],A=m[2],S=m[6],y=m[10];if(Math.abs(x-g)<.01&&Math.abs(v-A)<.01&&Math.abs(M-S)<.01){if(Math.abs(x+g)<.1&&Math.abs(v+A)<.1&&Math.abs(M+S)<.1&&Math.abs(p+b+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(p+1)/2,U=(b+1)/2,G=(y+1)/2,I=(x+g)/4,B=(v+A)/4,w=(M+S)/4;return O>U&&O>G?O<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(O),l=I/s,c=B/s):U>G?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=I/l,c=w/l):G<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(G),s=B/c,l=w/c),this.set(s,l,c,i),this}let R=Math.sqrt((S-M)*(S-M)+(v-A)*(v-A)+(g-x)*(g-x));return Math.abs(R)<.001&&(R=1),this.x=(S-M)/R,this.y=(v-A)/R,this.z=(g-x)/R,this.w=Math.acos((p+b+y-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Ht(this.x,e.x,i.x),this.y=Ht(this.y,e.y,i.y),this.z=Ht(this.z,e.z,i.z),this.w=Ht(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Ht(this.x,e,i),this.y=Ht(this.y,e,i),this.z=Ht(this.z,e,i),this.w=Ht(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ht(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Rm.prototype.isVector4=!0;let Ln=Rm;class lT extends ir{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new Ln(0,0,e,i),this.scissorTest=!1,this.viewport=new Ln(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new gi(l),u=s.count;for(let h=0;h<u;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new vm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class za extends lT{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class pb extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=oi,this.minFilter=oi,this.wrapR=ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cT extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=oi,this.minFilter=oi,this.wrapR=ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rf=class rf{constructor(e,i,s,l,c,u,h,m,p,x,v,g,b,M,A,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,u,h,m,p,x,v,g,b,M,A,S)}set(e,i,s,l,c,u,h,m,p,x,v,g,b,M,A,S){const y=this.elements;return y[0]=e,y[4]=i,y[8]=s,y[12]=l,y[1]=c,y[5]=u,y[9]=h,y[13]=m,y[2]=p,y[6]=x,y[10]=v,y[14]=g,y[3]=b,y[7]=M,y[11]=A,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rf().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Mo.setFromMatrixColumn(e,0).length(),c=1/Mo.setFromMatrixColumn(e,1).length(),u=1/Mo.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*u,i[9]=s[9]*u,i[10]=s[10]*u,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,u=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),x=Math.cos(c),v=Math.sin(c);if(e.order==="XYZ"){const g=u*x,b=u*v,M=h*x,A=h*v;i[0]=m*x,i[4]=-m*v,i[8]=p,i[1]=b+M*p,i[5]=g-A*p,i[9]=-h*m,i[2]=A-g*p,i[6]=M+b*p,i[10]=u*m}else if(e.order==="YXZ"){const g=m*x,b=m*v,M=p*x,A=p*v;i[0]=g+A*h,i[4]=M*h-b,i[8]=u*p,i[1]=u*v,i[5]=u*x,i[9]=-h,i[2]=b*h-M,i[6]=A+g*h,i[10]=u*m}else if(e.order==="ZXY"){const g=m*x,b=m*v,M=p*x,A=p*v;i[0]=g-A*h,i[4]=-u*v,i[8]=M+b*h,i[1]=b+M*h,i[5]=u*x,i[9]=A-g*h,i[2]=-u*p,i[6]=h,i[10]=u*m}else if(e.order==="ZYX"){const g=u*x,b=u*v,M=h*x,A=h*v;i[0]=m*x,i[4]=M*p-b,i[8]=g*p+A,i[1]=m*v,i[5]=A*p+g,i[9]=b*p-M,i[2]=-p,i[6]=h*m,i[10]=u*m}else if(e.order==="YZX"){const g=u*m,b=u*p,M=h*m,A=h*p;i[0]=m*x,i[4]=A-g*v,i[8]=M*v+b,i[1]=v,i[5]=u*x,i[9]=-h*x,i[2]=-p*x,i[6]=b*v+M,i[10]=g-A*v}else if(e.order==="XZY"){const g=u*m,b=u*p,M=h*m,A=h*p;i[0]=m*x,i[4]=-v,i[8]=p*x,i[1]=g*v+A,i[5]=u*x,i[9]=b*v-M,i[2]=M*v-b,i[6]=h*x,i[10]=A*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uT,e,fT)}lookAt(e,i,s){const l=this.elements;return $i.subVectors(e,i),$i.lengthSq()===0&&($i.z=1),$i.normalize(),js.crossVectors(s,$i),js.lengthSq()===0&&(Math.abs(s.z)===1?$i.x+=1e-4:$i.z+=1e-4,$i.normalize(),js.crossVectors(s,$i)),js.normalize(),xu.crossVectors($i,js),l[0]=js.x,l[4]=xu.x,l[8]=$i.x,l[1]=js.y,l[5]=xu.y,l[9]=$i.y,l[2]=js.z,l[6]=xu.z,l[10]=$i.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,u=s[0],h=s[4],m=s[8],p=s[12],x=s[1],v=s[5],g=s[9],b=s[13],M=s[2],A=s[6],S=s[10],y=s[14],R=s[3],O=s[7],U=s[11],G=s[15],I=l[0],B=l[4],w=l[8],F=l[12],$=l[1],k=l[5],X=l[9],te=l[13],oe=l[2],V=l[6],L=l[10],z=l[14],W=l[3],ce=l[7],ge=l[11],P=l[15];return c[0]=u*I+h*$+m*oe+p*W,c[4]=u*B+h*k+m*V+p*ce,c[8]=u*w+h*X+m*L+p*ge,c[12]=u*F+h*te+m*z+p*P,c[1]=x*I+v*$+g*oe+b*W,c[5]=x*B+v*k+g*V+b*ce,c[9]=x*w+v*X+g*L+b*ge,c[13]=x*F+v*te+g*z+b*P,c[2]=M*I+A*$+S*oe+y*W,c[6]=M*B+A*k+S*V+y*ce,c[10]=M*w+A*X+S*L+y*ge,c[14]=M*F+A*te+S*z+y*P,c[3]=R*I+O*$+U*oe+G*W,c[7]=R*B+O*k+U*V+G*ce,c[11]=R*w+O*X+U*L+G*ge,c[15]=R*F+O*te+U*z+G*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],u=e[1],h=e[5],m=e[9],p=e[13],x=e[2],v=e[6],g=e[10],b=e[14],M=e[3],A=e[7],S=e[11],y=e[15],R=m*b-p*g,O=h*b-p*v,U=h*g-m*v,G=u*b-p*x,I=u*g-m*x,B=u*v-h*x;return i*(A*R-S*O+y*U)-s*(M*R-S*G+y*I)+l*(M*O-A*G+y*B)-c*(M*U-A*I+S*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],u=e[4],h=e[5],m=e[6],p=e[7],x=e[8],v=e[9],g=e[10],b=e[11],M=e[12],A=e[13],S=e[14],y=e[15],R=i*h-s*u,O=i*m-l*u,U=i*p-c*u,G=s*m-l*h,I=s*p-c*h,B=l*p-c*m,w=x*A-v*M,F=x*S-g*M,$=x*y-b*M,k=v*S-g*A,X=v*y-b*A,te=g*y-b*S,oe=R*te-O*X+U*k+G*$-I*F+B*w;if(oe===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/oe;return e[0]=(h*te-m*X+p*k)*V,e[1]=(l*X-s*te-c*k)*V,e[2]=(A*B-S*I+y*G)*V,e[3]=(g*I-v*B-b*G)*V,e[4]=(m*$-u*te-p*F)*V,e[5]=(i*te-l*$+c*F)*V,e[6]=(S*U-M*B-y*O)*V,e[7]=(x*B-g*U+b*O)*V,e[8]=(u*X-h*$+p*w)*V,e[9]=(s*$-i*X-c*w)*V,e[10]=(M*I-A*U+y*R)*V,e[11]=(v*U-x*I-b*R)*V,e[12]=(h*F-u*k-m*w)*V,e[13]=(i*k-s*F+l*w)*V,e[14]=(A*O-M*G-S*R)*V,e[15]=(x*G-v*O+g*R)*V,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,u=e.x,h=e.y,m=e.z,p=c*u,x=c*h;return this.set(p*u+s,p*h-l*m,p*m+l*h,0,p*h+l*m,x*h+s,x*m-l*u,0,p*m-l*h,x*m+l*u,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,u){return this.set(1,s,c,0,e,1,u,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,u=i._y,h=i._z,m=i._w,p=c+c,x=u+u,v=h+h,g=c*p,b=c*x,M=c*v,A=u*x,S=u*v,y=h*v,R=m*p,O=m*x,U=m*v,G=s.x,I=s.y,B=s.z;return l[0]=(1-(A+y))*G,l[1]=(b+U)*G,l[2]=(M-O)*G,l[3]=0,l[4]=(b-U)*I,l[5]=(1-(g+y))*I,l[6]=(S+R)*I,l[7]=0,l[8]=(M+O)*B,l[9]=(S-R)*B,l[10]=(1-(g+A))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let u=Mo.set(l[0],l[1],l[2]).length();const h=Mo.set(l[4],l[5],l[6]).length(),m=Mo.set(l[8],l[9],l[10]).length();c<0&&(u=-u),Sa.copy(this);const p=1/u,x=1/h,v=1/m;return Sa.elements[0]*=p,Sa.elements[1]*=p,Sa.elements[2]*=p,Sa.elements[4]*=x,Sa.elements[5]*=x,Sa.elements[6]*=x,Sa.elements[8]*=v,Sa.elements[9]*=v,Sa.elements[10]*=v,i.setFromRotationMatrix(Sa),s.x=u,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,u,h=Fa,m=!1){const p=this.elements,x=2*c/(i-e),v=2*c/(s-l),g=(i+e)/(i-e),b=(s+l)/(s-l);let M,A;if(m)M=c/(u-c),A=u*c/(u-c);else if(h===Fa)M=-(u+c)/(u-c),A=-2*u*c/(u-c);else if(h===sf)M=-u/(u-c),A=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=b,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,u,h=Fa,m=!1){const p=this.elements,x=2/(i-e),v=2/(s-l),g=-(i+e)/(i-e),b=-(s+l)/(s-l);let M,A;if(m)M=1/(u-c),A=u/(u-c);else if(h===Fa)M=-2/(u-c),A=-(u+c)/(u-c);else if(h===sf)M=-1/(u-c),A=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=v,p[9]=0,p[13]=b,p[2]=0,p[6]=0,p[10]=M,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};rf.prototype.isMatrix4=!0;let Wn=rf;const Mo=new ae,Sa=new Wn,uT=new ae(0,0,0),fT=new ae(1,1,1),js=new ae,xu=new ae,$i=new ae,Y_=new Wn,W_=new nr;class Gr{constructor(e=0,i=0,s=0,l=Gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],u=l[4],h=l[8],m=l[1],p=l[5],x=l[9],v=l[2],g=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-x,b),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,b),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Ht(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Ht(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-x,b),this._y=0);break;default:mt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Y_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Y_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return W_.setFromEuler(this),this.setFromQuaternion(W_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gr.DEFAULT_ORDER="XYZ";class mb{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dT=0;const q_=new ae,To=new nr,ls=new Wn,_u=new ae,Gl=new ae,hT=new ae,pT=new nr,$_=new ae(1,0,0),K_=new ae(0,1,0),Z_=new ae(0,0,1),Q_={type:"added"},mT={type:"removed"},Ao={type:"childadded",child:null},Ph={type:"childremoved",child:null};class Ji extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dT++}),this.uuid=sc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ji.DEFAULT_UP.clone();const e=new ae,i=new Gr,s=new nr,l=new ae(1,1,1);function c(){s.setFromEuler(i,!1)}function u(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Wn},normalMatrix:{value:new St}}),this.matrix=new Wn,this.matrixWorld=new Wn,this.matrixAutoUpdate=Ji.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ji.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mb,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return To.setFromAxisAngle(e,i),this.quaternion.multiply(To),this}rotateOnWorldAxis(e,i){return To.setFromAxisAngle(e,i),this.quaternion.premultiply(To),this}rotateX(e){return this.rotateOnAxis($_,e)}rotateY(e){return this.rotateOnAxis(K_,e)}rotateZ(e){return this.rotateOnAxis(Z_,e)}translateOnAxis(e,i){return q_.copy(e).applyQuaternion(this.quaternion),this.position.add(q_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis($_,e)}translateY(e){return this.translateOnAxis(K_,e)}translateZ(e){return this.translateOnAxis(Z_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ls.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?_u.copy(e):_u.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Gl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ls.lookAt(Gl,_u,this.up):ls.lookAt(_u,Gl,this.up),this.quaternion.setFromRotationMatrix(ls),l&&(ls.extractRotation(l.matrixWorld),To.setFromRotationMatrix(ls),this.quaternion.premultiply(To.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(Jt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Q_),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(mT),Ph.child=e,this.dispatchEvent(Ph),Ph.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ls.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ls.multiply(e.parent.matrixWorld)),e.applyMatrix4(ls),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Q_),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const u=this.children[s].getObjectByProperty(e,i);if(u!==void 0)return u}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,u=l.length;c<u;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gl,e,hT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gl,pT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,u=l.length;c<u;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,x=m.length;p<x;p++){const v=m[p];c(e.shapes,v)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=u(e.geometries),m=u(e.materials),p=u(e.textures),x=u(e.images),v=u(e.shapes),g=u(e.skeletons),b=u(e.animations),M=u(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),x.length>0&&(s.images=x),v.length>0&&(s.shapes=v),g.length>0&&(s.skeletons=g),b.length>0&&(s.animations=b),M.length>0&&(s.nodes=M)}return s.object=l,s;function u(h){const m=[];for(const p in h){const x=h[p];delete x.metadata,m.push(x)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Ji.DEFAULT_UP=new ae(0,1,0);Ji.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ji.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vu extends Ji{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gT={type:"move"};class Fh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,u=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const A of e.hand.values()){const S=i.getJointPose(A,s),y=this._getHandJoint(p,A);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const x=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],g=x.position.distanceTo(v.position),b=.02,M=.005;p.inputState.pinching&&g>b+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=b-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(gT)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new vu;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const gb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xs={h:0,s:0,l:0},bu={h:0,s:0,l:0};function Bh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class pn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Zi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$t.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=$t.workingColorSpace){return this.r=e,this.g=i,this.b=s,$t.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=$t.workingColorSpace){if(e=nT(e,1),i=Ht(i,0,1),s=Ht(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,u=2*s-c;this.r=Bh(u,c,e+1/3),this.g=Bh(u,c,e),this.b=Bh(u,c,e-1/3)}return $t.colorSpaceToWorking(this,l),this}setStyle(e,i=Zi){function s(c){c!==void 0&&parseFloat(c)<1&&mt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=l[1],h=l[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:mt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(u===6)return this.setHex(parseInt(c,16),i);mt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Zi){const s=gb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):mt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}copyLinearToSRGB(e){return this.r=Ho(e.r),this.g=Ho(e.g),this.b=Ho(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zi){return $t.workingToColorSpace(hi.copy(this),e),Math.round(Ht(hi.r*255,0,255))*65536+Math.round(Ht(hi.g*255,0,255))*256+Math.round(Ht(hi.b*255,0,255))}getHexString(e=Zi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=$t.workingColorSpace){$t.workingToColorSpace(hi.copy(this),i);const s=hi.r,l=hi.g,c=hi.b,u=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const x=(h+u)/2;if(h===u)m=0,p=0;else{const v=u-h;switch(p=x<=.5?v/(u+h):v/(2-u-h),u){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return e.h=m,e.s=p,e.l=x,e}getRGB(e,i=$t.workingColorSpace){return $t.workingToColorSpace(hi.copy(this),i),e.r=hi.r,e.g=hi.g,e.b=hi.b,e}getStyle(e=Zi){$t.workingToColorSpace(hi.copy(this),e);const i=hi.r,s=hi.g,l=hi.b;return e!==Zi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(Xs),this.setHSL(Xs.h+e,Xs.s+i,Xs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(Xs),e.getHSL(bu);const s=Oh(Xs.h,bu.h,i),l=Oh(Xs.s,bu.s,i),c=Oh(Xs.l,bu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hi=new pn;pn.NAMES=gb;class xT extends Ji{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gr,this.environmentIntensity=1,this.environmentRotation=new Gr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ea=new ae,cs=new ae,zh=new ae,us=new ae,wo=new ae,Ro=new ae,J_=new ae,Gh=new ae,Hh=new ae,kh=new ae,Vh=new Ln,jh=new Ln,Xh=new Ln;class Ta{constructor(e=new ae,i=new ae,s=new ae){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ea.subVectors(e,i),l.cross(Ea);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ea.subVectors(l,i),cs.subVectors(s,i),zh.subVectors(e,i);const u=Ea.dot(Ea),h=Ea.dot(cs),m=Ea.dot(zh),p=cs.dot(cs),x=cs.dot(zh),v=u*p-h*h;if(v===0)return c.set(0,0,0),null;const g=1/v,b=(p*m-h*x)*g,M=(u*x-h*m)*g;return c.set(1-b-M,M,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,us)===null?!1:us.x>=0&&us.y>=0&&us.x+us.y<=1}static getInterpolation(e,i,s,l,c,u,h,m){return this.getBarycoord(e,i,s,l,us)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,us.x),m.addScaledVector(u,us.y),m.addScaledVector(h,us.z),m)}static getInterpolatedAttribute(e,i,s,l,c,u){return Vh.setScalar(0),jh.setScalar(0),Xh.setScalar(0),Vh.fromBufferAttribute(e,i),jh.fromBufferAttribute(e,s),Xh.fromBufferAttribute(e,l),u.setScalar(0),u.addScaledVector(Vh,c.x),u.addScaledVector(jh,c.y),u.addScaledVector(Xh,c.z),u}static isFrontFacing(e,i,s,l){return Ea.subVectors(s,i),cs.subVectors(e,i),Ea.cross(cs).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ea.subVectors(this.c,this.b),cs.subVectors(this.a,this.b),Ea.cross(cs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ta.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ta.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return Ta.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return Ta.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ta.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let u,h;wo.subVectors(l,s),Ro.subVectors(c,s),Gh.subVectors(e,s);const m=wo.dot(Gh),p=Ro.dot(Gh);if(m<=0&&p<=0)return i.copy(s);Hh.subVectors(e,l);const x=wo.dot(Hh),v=Ro.dot(Hh);if(x>=0&&v<=x)return i.copy(l);const g=m*v-x*p;if(g<=0&&m>=0&&x<=0)return u=m/(m-x),i.copy(s).addScaledVector(wo,u);kh.subVectors(e,c);const b=wo.dot(kh),M=Ro.dot(kh);if(M>=0&&b<=M)return i.copy(c);const A=b*p-m*M;if(A<=0&&p>=0&&M<=0)return h=p/(p-M),i.copy(s).addScaledVector(Ro,h);const S=x*M-b*v;if(S<=0&&v-x>=0&&b-M>=0)return J_.subVectors(c,l),h=(v-x)/(v-x+(b-M)),i.copy(l).addScaledVector(J_,h);const y=1/(S+A+g);return u=A*y,h=g*y,i.copy(s).addScaledVector(wo,u).addScaledVector(Ro,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class rc{constructor(e=new ae(1/0,1/0,1/0),i=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Ma.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Ma.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Ma.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,h=c.count;u<h;u++)e.isMesh===!0?e.getVertexPosition(u,Ma):Ma.fromBufferAttribute(c,u),Ma.applyMatrix4(e.matrixWorld),this.expandByPoint(Ma);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),yu.copy(s.boundingBox)),yu.applyMatrix4(e.matrixWorld),this.union(yu)}const l=e.children;for(let c=0,u=l.length;c<u;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ma),Ma.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hl),Su.subVectors(this.max,Hl),Co.subVectors(e.a,Hl),No.subVectors(e.b,Hl),Oo.subVectors(e.c,Hl),Ys.subVectors(No,Co),Ws.subVectors(Oo,No),Rr.subVectors(Co,Oo);let i=[0,-Ys.z,Ys.y,0,-Ws.z,Ws.y,0,-Rr.z,Rr.y,Ys.z,0,-Ys.x,Ws.z,0,-Ws.x,Rr.z,0,-Rr.x,-Ys.y,Ys.x,0,-Ws.y,Ws.x,0,-Rr.y,Rr.x,0];return!Yh(i,Co,No,Oo,Su)||(i=[1,0,0,0,1,0,0,0,1],!Yh(i,Co,No,Oo,Su))?!1:(Eu.crossVectors(Ys,Ws),i=[Eu.x,Eu.y,Eu.z],Yh(i,Co,No,Oo,Su))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ma).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ma).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fs=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],Ma=new ae,yu=new rc,Co=new ae,No=new ae,Oo=new ae,Ys=new ae,Ws=new ae,Rr=new ae,Hl=new ae,Su=new ae,Eu=new ae,Cr=new ae;function Yh(r,e,i,s,l){for(let c=0,u=r.length-3;c<=u;c+=3){Cr.fromArray(r,c);const h=l.x*Math.abs(Cr.x)+l.y*Math.abs(Cr.y)+l.z*Math.abs(Cr.z),m=e.dot(Cr),p=i.dot(Cr),x=s.dot(Cr);if(Math.max(-Math.max(m,p,x),Math.min(m,p,x))>h)return!1}return!0}const Vn=new ae,Mu=new Ot;let _T=0;class Ga extends ir{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_T++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=z_,this.updateRanges=[],this.gpuType=Pa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Mu.fromBufferAttribute(this,i),Mu.applyMatrix3(e),this.setXY(i,Mu.x,Mu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyMatrix3(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyMatrix4(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyNormalMatrix(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.transformDirection(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=zl(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Ii(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=zl(i,this.array)),i}setX(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=zl(i,this.array)),i}setY(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=zl(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=zl(i,this.array)),i}setW(e,i){return this.normalized&&(i=Ii(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array),l=Ii(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=Ii(i,this.array),s=Ii(s,this.array),l=Ii(l,this.array),c=Ii(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==z_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class xb extends Ga{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class _b extends Ga{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class ga extends Ga{constructor(e,i,s){super(new Float32Array(e),i,s)}}const vT=new rc,kl=new ae,Wh=new ae;class bm{constructor(e=new ae,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):vT.setFromPoints(e).getCenter(s);let l=0;for(let c=0,u=e.length;c<u;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;kl.subVectors(e,this.center);const i=kl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(kl,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(kl.copy(e.center).add(Wh)),this.expandByPoint(kl.copy(e.center).sub(Wh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let bT=0;const da=new Wn,qh=new Ji,Do=new ae,Ki=new rc,Vl=new rc,Jn=new ae;class ja extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bT++}),this.uuid=sc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(QM(e)?_b:xb)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new St().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return da.makeRotationFromQuaternion(e),this.applyMatrix4(da),this}rotateX(e){return da.makeRotationX(e),this.applyMatrix4(da),this}rotateY(e){return da.makeRotationY(e),this.applyMatrix4(da),this}rotateZ(e){return da.makeRotationZ(e),this.applyMatrix4(da),this}translate(e,i,s){return da.makeTranslation(e,i,s),this.applyMatrix4(da),this}scale(e,i,s){return da.makeScale(e,i,s),this.applyMatrix4(da),this}lookAt(e){return qh.lookAt(e),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Do).negate(),this.translate(Do.x,Do.y,Do.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const u=e[l];s.push(u.x,u.y,u.z||0)}this.setAttribute("position",new ga(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&mt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Ki.setFromBufferAttribute(c),this.morphTargetsRelative?(Jn.addVectors(this.boundingBox.min,Ki.min),this.boundingBox.expandByPoint(Jn),Jn.addVectors(this.boundingBox.max,Ki.max),this.boundingBox.expandByPoint(Jn)):(this.boundingBox.expandByPoint(Ki.min),this.boundingBox.expandByPoint(Ki.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ae,1/0);return}if(e){const s=this.boundingSphere.center;if(Ki.setFromBufferAttribute(e),i)for(let c=0,u=i.length;c<u;c++){const h=i[c];Vl.setFromBufferAttribute(h),this.morphTargetsRelative?(Jn.addVectors(Ki.min,Vl.min),Ki.expandByPoint(Jn),Jn.addVectors(Ki.max,Vl.max),Ki.expandByPoint(Jn)):(Ki.expandByPoint(Vl.min),Ki.expandByPoint(Vl.max))}Ki.getCenter(s);let l=0;for(let c=0,u=e.count;c<u;c++)Jn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Jn));if(i)for(let c=0,u=i.length;c<u;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,x=h.count;p<x;p++)Jn.fromBufferAttribute(h,p),m&&(Do.fromBufferAttribute(e,p),Jn.add(Do)),l=Math.max(l,s.distanceToSquared(Jn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ga(new Float32Array(4*s.count),4));const u=this.getAttribute("tangent"),h=[],m=[];for(let w=0;w<s.count;w++)h[w]=new ae,m[w]=new ae;const p=new ae,x=new ae,v=new ae,g=new Ot,b=new Ot,M=new Ot,A=new ae,S=new ae;function y(w,F,$){p.fromBufferAttribute(s,w),x.fromBufferAttribute(s,F),v.fromBufferAttribute(s,$),g.fromBufferAttribute(c,w),b.fromBufferAttribute(c,F),M.fromBufferAttribute(c,$),x.sub(p),v.sub(p),b.sub(g),M.sub(g);const k=1/(b.x*M.y-M.x*b.y);isFinite(k)&&(A.copy(x).multiplyScalar(M.y).addScaledVector(v,-b.y).multiplyScalar(k),S.copy(v).multiplyScalar(b.x).addScaledVector(x,-M.x).multiplyScalar(k),h[w].add(A),h[F].add(A),h[$].add(A),m[w].add(S),m[F].add(S),m[$].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let w=0,F=R.length;w<F;++w){const $=R[w],k=$.start,X=$.count;for(let te=k,oe=k+X;te<oe;te+=3)y(e.getX(te+0),e.getX(te+1),e.getX(te+2))}const O=new ae,U=new ae,G=new ae,I=new ae;function B(w){G.fromBufferAttribute(l,w),I.copy(G);const F=h[w];O.copy(F),O.sub(G.multiplyScalar(G.dot(F))).normalize(),U.crossVectors(I,F);const k=U.dot(m[w])<0?-1:1;u.setXYZW(w,O.x,O.y,O.z,k)}for(let w=0,F=R.length;w<F;++w){const $=R[w],k=$.start,X=$.count;for(let te=k,oe=k+X;te<oe;te+=3)B(e.getX(te+0)),B(e.getX(te+1)),B(e.getX(te+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ga(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,b=s.count;g<b;g++)s.setXYZ(g,0,0,0);const l=new ae,c=new ae,u=new ae,h=new ae,m=new ae,p=new ae,x=new ae,v=new ae;if(e)for(let g=0,b=e.count;g<b;g+=3){const M=e.getX(g+0),A=e.getX(g+1),S=e.getX(g+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,S),x.subVectors(u,c),v.subVectors(l,c),x.cross(v),h.fromBufferAttribute(s,M),m.fromBufferAttribute(s,A),p.fromBufferAttribute(s,S),h.add(x),m.add(x),p.add(x),s.setXYZ(M,h.x,h.y,h.z),s.setXYZ(A,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let g=0,b=i.count;g<b;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),u.fromBufferAttribute(i,g+2),x.subVectors(u,c),v.subVectors(l,c),x.cross(v),s.setXYZ(g+0,x.x,x.y,x.z),s.setXYZ(g+1,x.x,x.y,x.z),s.setXYZ(g+2,x.x,x.y,x.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Jn.fromBufferAttribute(e,i),Jn.normalize(),e.setXYZ(i,Jn.x,Jn.y,Jn.z)}toNonIndexed(){function e(h,m){const p=h.array,x=h.itemSize,v=h.normalized,g=new p.constructor(m.length*x);let b=0,M=0;for(let A=0,S=m.length;A<S;A++){h.isInterleavedBufferAttribute?b=m[A]*h.data.stride+h.offset:b=m[A]*x;for(let y=0;y<x;y++)g[M++]=p[b++]}return new Ga(g,x,v)}if(this.index===null)return mt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ja,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let x=0,v=p.length;x<v;x++){const g=p[x],b=e(g,s);m.push(b)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let h=0,m=u.length;h<m;h++){const p=u[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],x=[];for(let v=0,g=p.length;v<g;v++){const b=p[v];x.push(b.toJSON(e.data))}x.length>0&&(l[m]=x,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const x=l[p];this.setAttribute(p,x.clone(i))}const c=e.morphAttributes;for(const p in c){const x=[],v=c[p];for(let g=0,b=v.length;g<b;g++)x.push(v[g].clone(i));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,x=u.length;p<x;p++){const v=u[p];this.addGroup(v.start,v.count,v.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let yT=0;class lf extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yT++}),this.uuid=sc(),this.name="",this.type="Material",this.blending=Go,this.side=tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pp,this.blendDst=mp,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pn(0,0,0),this.blendAlpha=0,this.depthFunc=jo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=B_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=So,this.stencilZFail=So,this.stencilZPass=So,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){mt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){mt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Go&&(s.blending=this.blending),this.side!==tr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==pp&&(s.blendSrc=this.blendSrc),this.blendDst!==mp&&(s.blendDst=this.blendDst),this.blendEquation!==Dr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==jo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==B_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==So&&(s.stencilFail=this.stencilFail),this.stencilZFail!==So&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==So&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const u=[];for(const h in c){const m=c[h];delete m.metadata,u.push(m)}return u}if(i){const c=l(e.textures),u=l(e.images);c.length>0&&(s.textures=c),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ds=new ae,$h=new ae,Tu=new ae,qs=new ae,Kh=new ae,Au=new ae,Zh=new ae;class vb{constructor(e=new ae,i=new ae(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ds)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ds.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ds.copy(this.origin).addScaledVector(this.direction,i),ds.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){$h.copy(e).add(i).multiplyScalar(.5),Tu.copy(i).sub(e).normalize(),qs.copy(this.origin).sub($h);const c=e.distanceTo(i)*.5,u=-this.direction.dot(Tu),h=qs.dot(this.direction),m=-qs.dot(Tu),p=qs.lengthSq(),x=Math.abs(1-u*u);let v,g,b,M;if(x>0)if(v=u*m-h,g=u*h-m,M=c*x,v>=0)if(g>=-M)if(g<=M){const A=1/x;v*=A,g*=A,b=v*(v+u*g+2*h)+g*(u*v+g+2*m)+p}else g=c,v=Math.max(0,-(u*g+h)),b=-v*v+g*(g+2*m)+p;else g=-c,v=Math.max(0,-(u*g+h)),b=-v*v+g*(g+2*m)+p;else g<=-M?(v=Math.max(0,-(-u*c+h)),g=v>0?-c:Math.min(Math.max(-c,-m),c),b=-v*v+g*(g+2*m)+p):g<=M?(v=0,g=Math.min(Math.max(-c,-m),c),b=g*(g+2*m)+p):(v=Math.max(0,-(u*c+h)),g=v>0?c:Math.min(Math.max(-c,-m),c),b=-v*v+g*(g+2*m)+p);else g=u>0?-c:c,v=Math.max(0,-(u*g+h)),b=-v*v+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy($h).addScaledVector(Tu,g),b}intersectSphere(e,i){ds.subVectors(e.center,this.origin);const s=ds.dot(this.direction),l=ds.dot(ds)-s*s,c=e.radius*e.radius;if(l>c)return null;const u=Math.sqrt(c-l),h=s-u,m=s+u;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,u,h,m;const p=1/this.direction.x,x=1/this.direction.y,v=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),x>=0?(c=(e.min.y-g.y)*x,u=(e.max.y-g.y)*x):(c=(e.max.y-g.y)*x,u=(e.min.y-g.y)*x),s>u||c>l||((c>s||isNaN(s))&&(s=c),(u<l||isNaN(l))&&(l=u),v>=0?(h=(e.min.z-g.z)*v,m=(e.max.z-g.z)*v):(h=(e.max.z-g.z)*v,m=(e.min.z-g.z)*v),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ds)!==null}intersectTriangle(e,i,s,l,c){Kh.subVectors(i,e),Au.subVectors(s,e),Zh.crossVectors(Kh,Au);let u=this.direction.dot(Zh),h;if(u>0){if(l)return null;h=1}else if(u<0)h=-1,u=-u;else return null;qs.subVectors(this.origin,e);const m=h*this.direction.dot(Au.crossVectors(qs,Au));if(m<0)return null;const p=h*this.direction.dot(Kh.cross(qs));if(p<0||m+p>u)return null;const x=-h*qs.dot(Zh);return x<0?null:this.at(x/u,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ym extends lf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gr,this.combine=Zv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ev=new Wn,Nr=new vb,wu=new bm,tv=new ae,Ru=new ae,Cu=new ae,Nu=new ae,Qh=new ae,Ou=new ae,nv=new ae,Du=new ae;class ka extends Ji{constructor(e=new ja,i=new ym){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=l.length;c<u;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,u=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){Ou.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const x=h[m],v=c[m];x!==0&&(Qh.fromBufferAttribute(v,e),u?Ou.addScaledVector(Qh,x):Ou.addScaledVector(Qh.sub(i),x))}i.add(Ou)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),wu.copy(s.boundingSphere),wu.applyMatrix4(c),Nr.copy(e.ray).recast(e.near),!(wu.containsPoint(Nr.origin)===!1&&(Nr.intersectSphere(wu,tv)===null||Nr.origin.distanceToSquared(tv)>(e.far-e.near)**2))&&(ev.copy(c).invert(),Nr.copy(e.ray).applyMatrix4(ev),!(s.boundingBox!==null&&Nr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Nr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,u=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,x=c.attributes.uv1,v=c.attributes.normal,g=c.groups,b=c.drawRange;if(h!==null)if(Array.isArray(u))for(let M=0,A=g.length;M<A;M++){const S=g[M],y=u[S.materialIndex],R=Math.max(S.start,b.start),O=Math.min(h.count,Math.min(S.start+S.count,b.start+b.count));for(let U=R,G=O;U<G;U+=3){const I=h.getX(U),B=h.getX(U+1),w=h.getX(U+2);l=Lu(this,y,e,s,p,x,v,I,B,w),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),A=Math.min(h.count,b.start+b.count);for(let S=M,y=A;S<y;S+=3){const R=h.getX(S),O=h.getX(S+1),U=h.getX(S+2);l=Lu(this,u,e,s,p,x,v,R,O,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(u))for(let M=0,A=g.length;M<A;M++){const S=g[M],y=u[S.materialIndex],R=Math.max(S.start,b.start),O=Math.min(m.count,Math.min(S.start+S.count,b.start+b.count));for(let U=R,G=O;U<G;U+=3){const I=U,B=U+1,w=U+2;l=Lu(this,y,e,s,p,x,v,I,B,w),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),A=Math.min(m.count,b.start+b.count);for(let S=M,y=A;S<y;S+=3){const R=S,O=S+1,U=S+2;l=Lu(this,u,e,s,p,x,v,R,O,U),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function ST(r,e,i,s,l,c,u,h){let m;if(e.side===Pi?m=s.intersectTriangle(u,c,l,!0,h):m=s.intersectTriangle(l,c,u,e.side===tr,h),m===null)return null;Du.copy(h),Du.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Du);return p<i.near||p>i.far?null:{distance:p,point:Du.clone(),object:r}}function Lu(r,e,i,s,l,c,u,h,m,p){r.getVertexPosition(h,Ru),r.getVertexPosition(m,Cu),r.getVertexPosition(p,Nu);const x=ST(r,e,i,s,Ru,Cu,Nu,nv);if(x){const v=new ae;Ta.getBarycoord(nv,Ru,Cu,Nu,v),l&&(x.uv=Ta.getInterpolatedAttribute(l,h,m,p,v,new Ot)),c&&(x.uv1=Ta.getInterpolatedAttribute(c,h,m,p,v,new Ot)),u&&(x.normal=Ta.getInterpolatedAttribute(u,h,m,p,v,new ae),x.normal.dot(s.direction)>0&&x.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new ae,materialIndex:0};Ta.getNormal(Ru,Cu,Nu,g.normal),x.face=g,x.barycoord=v}return x}class ET extends gi{constructor(e=null,i=1,s=1,l,c,u,h,m,p=oi,x=oi,v,g){super(null,u,h,m,p,x,l,c,v,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jh=new ae,MT=new ae,TT=new St;class Zs{constructor(e=new ae(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Jh.subVectors(s,i).cross(MT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Jh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(u<0||u>1)?null:i.copy(e.start).addScaledVector(l,u)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||TT.getNormalMatrix(e),l=this.coplanarPoint(Jh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Or=new bm,AT=new Ot(.5,.5),Iu=new ae;class bb{constructor(e=new Zs,i=new Zs,s=new Zs,l=new Zs,c=new Zs,u=new Zs){this.planes=[e,i,s,l,c,u]}set(e,i,s,l,c,u){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(u),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Fa,s=!1){const l=this.planes,c=e.elements,u=c[0],h=c[1],m=c[2],p=c[3],x=c[4],v=c[5],g=c[6],b=c[7],M=c[8],A=c[9],S=c[10],y=c[11],R=c[12],O=c[13],U=c[14],G=c[15];if(l[0].setComponents(p-u,b-x,y-M,G-R).normalize(),l[1].setComponents(p+u,b+x,y+M,G+R).normalize(),l[2].setComponents(p+h,b+v,y+A,G+O).normalize(),l[3].setComponents(p-h,b-v,y-A,G-O).normalize(),s)l[4].setComponents(m,g,S,U).normalize(),l[5].setComponents(p-m,b-g,y-S,G-U).normalize();else if(l[4].setComponents(p-m,b-g,y-S,G-U).normalize(),i===Fa)l[5].setComponents(p+m,b+g,y+S,G+U).normalize();else if(i===sf)l[5].setComponents(m,g,S,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Or)}intersectsSprite(e){Or.center.set(0,0,0);const i=AT.distanceTo(e.center);return Or.radius=.7071067811865476+i,Or.applyMatrix4(e.matrixWorld),this.intersectsSphere(Or)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Iu.x=l.normal.x>0?e.max.x:e.min.x,Iu.y=l.normal.y>0?e.max.y:e.min.y,Iu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Iu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yb extends gi{constructor(e=[],i=Br,s,l,c,u,h,m,p,x){super(e,i,s,l,c,u,h,m,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yo extends gi{constructor(e,i,s=Ha,l,c,u,h=oi,m=oi,p,x=_s,v=1){if(x!==_s&&x!==Ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:v};super(g,l,c,u,h,m,x,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class wT extends Yo{constructor(e,i=Ha,s=Br,l,c,u=oi,h=oi,m,p=_s){const x={width:e,height:e,depth:1},v=[x,x,x,x,x,x];super(e,e,i,s,l,c,u,h,m,p),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Sb extends gi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class oc extends ja{constructor(e=1,i=1,s=1,l=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:u};const h=this;l=Math.floor(l),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],x=[],v=[];let g=0,b=0;M("z","y","x",-1,-1,s,i,e,u,c,0),M("z","y","x",1,-1,s,i,-e,u,c,1),M("x","z","y",1,1,e,s,i,l,u,2),M("x","z","y",1,-1,e,s,-i,l,u,3),M("x","y","z",1,-1,e,i,s,l,c,4),M("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new ga(p,3)),this.setAttribute("normal",new ga(x,3)),this.setAttribute("uv",new ga(v,2));function M(A,S,y,R,O,U,G,I,B,w,F){const $=U/B,k=G/w,X=U/2,te=G/2,oe=I/2,V=B+1,L=w+1;let z=0,W=0;const ce=new ae;for(let ge=0;ge<L;ge++){const P=ge*k-te;for(let Z=0;Z<V;Z++){const _e=Z*$-X;ce[A]=_e*R,ce[S]=P*O,ce[y]=oe,p.push(ce.x,ce.y,ce.z),ce[A]=0,ce[S]=0,ce[y]=I>0?1:-1,x.push(ce.x,ce.y,ce.z),v.push(Z/B),v.push(1-ge/w),z+=1}}for(let ge=0;ge<w;ge++)for(let P=0;P<B;P++){const Z=g+P+V*ge,_e=g+P+V*(ge+1),Ae=g+(P+1)+V*(ge+1),Oe=g+(P+1)+V*ge;m.push(Z,_e,Oe),m.push(_e,Ae,Oe),W+=6}h.addGroup(b,W,F),b+=W,g+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class cf extends ja{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,u=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,x=m+1,v=e/h,g=i/m,b=[],M=[],A=[],S=[];for(let y=0;y<x;y++){const R=y*g-u;for(let O=0;O<p;O++){const U=O*v-c;M.push(U,-R,0),A.push(0,0,1),S.push(O/h),S.push(1-y/m)}}for(let y=0;y<m;y++)for(let R=0;R<h;R++){const O=R+p*y,U=R+p*(y+1),G=R+1+p*(y+1),I=R+1+p*y;b.push(O,U,I),b.push(U,G,I)}this.setIndex(b),this.setAttribute("position",new ga(M,3)),this.setAttribute("normal",new ga(A,3)),this.setAttribute("uv",new ga(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cf(e.width,e.height,e.widthSegments,e.heightSegments)}}class Sm extends ja{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,u=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:u,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(u+h,Math.PI);let p=0;const x=[],v=new ae,g=new ae,b=[],M=[],A=[],S=[];for(let y=0;y<=s;y++){const R=[],O=y/s;let U=0;y===0&&u===0?U=.5/i:y===s&&m===Math.PI&&(U=-.5/i);for(let G=0;G<=i;G++){const I=G/i;v.x=-e*Math.cos(l+I*c)*Math.sin(u+O*h),v.y=e*Math.cos(u+O*h),v.z=e*Math.sin(l+I*c)*Math.sin(u+O*h),M.push(v.x,v.y,v.z),g.copy(v).normalize(),A.push(g.x,g.y,g.z),S.push(I+U,1-O),R.push(p++)}x.push(R)}for(let y=0;y<s;y++)for(let R=0;R<i;R++){const O=x[y][R+1],U=x[y][R],G=x[y+1][R],I=x[y+1][R+1];(y!==0||u>0)&&b.push(O,U,I),(y!==s-1||m<Math.PI)&&b.push(U,G,I)}this.setIndex(b),this.setAttribute("position",new ga(M,3)),this.setAttribute("normal",new ga(A,3)),this.setAttribute("uv",new ga(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Wo(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(iv(l))l.isRenderTargetTexture?(mt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(iv(l[0])){const c=[];for(let u=0,h=l.length;u<h;u++)c[u]=l[u].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Ei(r){const e={};for(let i=0;i<r.length;i++){const s=Wo(r[i]);for(const l in s)e[l]=s[l]}return e}function iv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function RT(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function Eb(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$t.workingColorSpace}const CT={clone:Wo,merge:Ei};var NT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,OT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Va extends lf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NT,this.fragmentShader=OT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wo(e.uniforms),this.uniformsGroups=RT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const u=this.uniforms[l].value;u&&u.isTexture?i.uniforms[l]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?i.uniforms[l]={type:"c",value:u.getHex()}:u&&u.isVector2?i.uniforms[l]={type:"v2",value:u.toArray()}:u&&u.isVector3?i.uniforms[l]={type:"v3",value:u.toArray()}:u&&u.isVector4?i.uniforms[l]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?i.uniforms[l]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?i.uniforms[l]={type:"m4",value:u.toArray()}:i.uniforms[l]={value:u}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class DT extends Va{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class LT extends lf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class IT extends lf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ep={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(av(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!av(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function av(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class UT{constructor(e,i,s){const l=this;let c=!1,u=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(x){h++,c===!1&&l.onStart!==void 0&&l.onStart(x,u,h),c=!0},this.itemEnd=function(x){u++,l.onProgress!==void 0&&l.onProgress(x,u,h),u===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(x){l.onError!==void 0&&l.onError(x)},this.resolveURL=function(x){return m?m(x):x},this.setURLModifier=function(x){return m=x,this},this.addHandler=function(x,v){return p.push(x,v),this},this.removeHandler=function(x){const v=p.indexOf(x);return v!==-1&&p.splice(v,2),this},this.getHandler=function(x){for(let v=0,g=p.length;v<g;v+=2){const b=p[v],M=p[v+1];if(b.global&&(b.lastIndex=0),b.test(x))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const PT=new UT;class Em{constructor(e){this.manager=e!==void 0?e:PT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Em.DEFAULT_MATERIAL_NAME="__DEFAULT";const Lo=new WeakMap;class FT extends Em{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,u=ep.get(`image:${e}`);if(u!==void 0){if(u.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(u),c.manager.itemEnd(e)},0);else{let v=Lo.get(u);v===void 0&&(v=[],Lo.set(u,v)),v.push({onLoad:i,onError:l})}return u}const h=ic("img");function m(){x(),i&&i(this);const v=Lo.get(this)||[];for(let g=0;g<v.length;g++){const b=v[g];b.onLoad&&b.onLoad(this)}Lo.delete(this),c.manager.itemEnd(e)}function p(v){x(),l&&l(v),ep.remove(`image:${e}`);const g=Lo.get(this)||[];for(let b=0;b<g.length;b++){const M=g[b];M.onError&&M.onError(v)}Lo.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function x(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),ep.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class BT extends Em{constructor(e){super(e)}load(e,i,s,l){const c=new gi,u=new FT(this.manager);return u.setCrossOrigin(this.crossOrigin),u.setPath(this.path),u.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const Uu=new ae,Pu=new nr,La=new ae;class Mb extends Ji{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wn,this.projectionMatrix=new Wn,this.projectionMatrixInverse=new Wn,this.coordinateSystem=Fa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Uu,Pu,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Pu,La.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(Uu,Pu,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uu,Pu,La.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $s=new ae,sv=new Ot,rv=new Ot;class pa extends Mb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=nm*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nm*2*Math.atan(Math.tan(qu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){$s.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($s.x,$s.y).multiplyScalar(-e/$s.z),$s.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set($s.x,$s.y).multiplyScalar(-e/$s.z)}getViewSize(e,i){return this.getViewBounds(e,sv,rv),i.subVectors(rv,sv)}setViewOffset(e,i,s,l,c,u){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(qu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*l/m,i-=u.offsetY*s/p,l*=u.width/m,s*=u.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Tb extends Mb{constructor(e=-1,i=1,s=1,l=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,u=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,h-=x*this.view.offsetY,m=h-x*this.view.height}this.projectionMatrix.makeOrthographic(c,u,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Io=-90,Uo=1;class zT extends Ji{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new pa(Io,Uo,e,i);l.layers=this.layers,this.add(l);const c=new pa(Io,Uo,e,i);c.layers=this.layers,this.add(c);const u=new pa(Io,Uo,e,i);u.layers=this.layers,this.add(u);const h=new pa(Io,Uo,e,i);h.layers=this.layers,this.add(h);const m=new pa(Io,Uo,e,i);m.layers=this.layers,this.add(m);const p=new pa(Io,Uo,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,u,h,m]=i;for(const p of i)this.remove(p);if(e===Fa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===sf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,h,m,p,x]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,u),e.setRenderTarget(s,2,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=A,e.setRenderTarget(s,5,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,x),e.setRenderTarget(v,g,b),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class GT extends pa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class ov{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Ht(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Cm=class Cm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Cm.prototype.isMatrix2=!0;let lv=Cm;class HT extends ir{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){mt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function cv(r,e,i,s){const l=kT(s);switch(i){case ub:return r*e;case db:return r*e/l.components*l.byteLength;case pm:return r*e/l.components*l.byteLength;case zr:return r*e*2/l.components*l.byteLength;case mm:return r*e*2/l.components*l.byteLength;case fb:return r*e*3/l.components*l.byteLength;case Aa:return r*e*4/l.components*l.byteLength;case gm:return r*e*4/l.components*l.byteLength;case ju:case Xu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Yu:case Wu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ap:case Rp:return Math.max(r,16)*Math.max(e,8)/4;case Tp:case wp:return Math.max(r,8)*Math.max(e,8)/2;case Cp:case Np:case Dp:case Lp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Op:case ef:case Ip:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Up:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Fp:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Bp:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case zp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Gp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Hp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case kp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Vp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case jp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Xp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Yp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Wp:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case qp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case $p:case Kp:case Zp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Qp:case Jp:return Math.ceil(r/4)*Math.ceil(e/4)*8;case tf:case em:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function kT(r){switch(r){case ma:case rb:return{byteLength:1,components:1};case tc:case ob:case xs:return{byteLength:2,components:1};case dm:case hm:return{byteLength:2,components:4};case Ha:case fm:case Pa:return{byteLength:4,components:1};case lb:case cb:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:um}}));typeof window<"u"&&(window.__THREE__?mt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=um);function Ab(){let r=null,e=!1,i=null,s=null;function l(c,u){i(c,u),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function VT(r){const e=new WeakMap;function i(h,m){const p=h.array,x=h.usage,v=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,x),h.onUploadCallback();let b;if(p instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)b=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)b=r.SHORT;else if(p instanceof Uint32Array)b=r.UNSIGNED_INT;else if(p instanceof Int32Array)b=r.INT;else if(p instanceof Int8Array)b=r.BYTE;else if(p instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:b,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:v}}function s(h,m,p){const x=m.array,v=m.updateRanges;if(r.bindBuffer(p,h),v.length===0)r.bufferSubData(p,0,x);else{v.sort((b,M)=>b.start-M.start);let g=0;for(let b=1;b<v.length;b++){const M=v[g],A=v[b];A.start<=M.start+M.count+1?M.count=Math.max(M.count,A.start+A.count-M.start):(++g,v[g]=A)}v.length=g+1;for(let b=0,M=v.length;b<M;b++){const A=v[b];r.bufferSubData(p,A.start*x.BYTES_PER_ELEMENT,x,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function u(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const x=e.get(h);(!x||x.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:u}}var jT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,XT=`#ifdef USE_ALPHAHASH
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
#endif`,YT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,WT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$T=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,KT=`#ifdef USE_AOMAP
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
#endif`,ZT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,QT=`#ifdef USE_BATCHING
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
#endif`,JT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,e1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,n1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,i1=`#ifdef USE_IRIDESCENCE
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
#endif`,a1=`#ifdef USE_BUMPMAP
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
#endif`,s1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,r1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,l1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,c1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,u1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,f1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,d1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,h1=`#define PI 3.141592653589793
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
} // validated`,p1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,m1=`vec3 transformedNormal = objectNormal;
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
#endif`,g1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,x1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,v1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b1="gl_FragColor = linearToOutputTexel( gl_FragColor );",y1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,S1=`#ifdef USE_ENVMAP
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
#endif`,E1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,M1=`#ifdef USE_ENVMAP
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
#endif`,T1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,A1=`#ifdef USE_ENVMAP
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
#endif`,w1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,R1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,C1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,O1=`#ifdef USE_GRADIENTMAP
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
}`,D1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,L1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,U1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,P1=`#ifdef USE_ENVMAP
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
#endif`,F1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,B1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,z1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,H1=`PhysicalMaterial material;
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
#endif`,k1=`uniform sampler2D dfgLUT;
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
}`,V1=`
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
#endif`,j1=`#if defined( RE_IndirectDiffuse )
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
#endif`,X1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Y1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,W1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,q1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Z1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Q1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,J1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,eA=`#if defined( USE_POINTS_UV )
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
#endif`,tA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,aA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rA=`#ifdef USE_MORPHTARGETS
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
#endif`,oA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hA=`#ifdef USE_NORMALMAP
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
#endif`,pA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_A=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,SA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,EA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,MA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,TA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,AA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,RA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,CA=`float getShadowMask() {
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
}`,NA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,OA=`#ifdef USE_SKINNING
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
#endif`,DA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,LA=`#ifdef USE_SKINNING
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
#endif`,IA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,UA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,PA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,FA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,BA=`#ifdef USE_TRANSMISSION
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
#endif`,zA=`#ifdef USE_TRANSMISSION
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
#endif`,GA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,XA=`uniform sampler2D t2D;
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
}`,YA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$A=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KA=`#include <common>
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
}`,ZA=`#if DEPTH_PACKING == 3200
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
}`,QA=`#define DISTANCE
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
}`,JA=`#define DISTANCE
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
}`,ew=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nw=`uniform float scale;
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
}`,iw=`uniform vec3 diffuse;
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
}`,aw=`#include <common>
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
}`,sw=`uniform vec3 diffuse;
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
}`,rw=`#define LAMBERT
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
}`,ow=`#define LAMBERT
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
}`,lw=`#define MATCAP
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
}`,cw=`#define MATCAP
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
}`,uw=`#define NORMAL
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
}`,fw=`#define NORMAL
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
}`,dw=`#define PHONG
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
}`,hw=`#define PHONG
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
}`,pw=`#define STANDARD
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
}`,mw=`#define STANDARD
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
}`,gw=`#define TOON
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
}`,xw=`#define TOON
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
}`,_w=`uniform float size;
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
}`,vw=`uniform vec3 diffuse;
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
}`,bw=`#include <common>
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
}`,yw=`uniform vec3 color;
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
}`,Sw=`uniform float rotation;
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
}`,Ew=`uniform vec3 diffuse;
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
}`,Nt={alphahash_fragment:jT,alphahash_pars_fragment:XT,alphamap_fragment:YT,alphamap_pars_fragment:WT,alphatest_fragment:qT,alphatest_pars_fragment:$T,aomap_fragment:KT,aomap_pars_fragment:ZT,batching_pars_vertex:QT,batching_vertex:JT,begin_vertex:e1,beginnormal_vertex:t1,bsdfs:n1,iridescence_fragment:i1,bumpmap_pars_fragment:a1,clipping_planes_fragment:s1,clipping_planes_pars_fragment:r1,clipping_planes_pars_vertex:o1,clipping_planes_vertex:l1,color_fragment:c1,color_pars_fragment:u1,color_pars_vertex:f1,color_vertex:d1,common:h1,cube_uv_reflection_fragment:p1,defaultnormal_vertex:m1,displacementmap_pars_vertex:g1,displacementmap_vertex:x1,emissivemap_fragment:_1,emissivemap_pars_fragment:v1,colorspace_fragment:b1,colorspace_pars_fragment:y1,envmap_fragment:S1,envmap_common_pars_fragment:E1,envmap_pars_fragment:M1,envmap_pars_vertex:T1,envmap_physical_pars_fragment:P1,envmap_vertex:A1,fog_vertex:w1,fog_pars_vertex:R1,fog_fragment:C1,fog_pars_fragment:N1,gradientmap_pars_fragment:O1,lightmap_pars_fragment:D1,lights_lambert_fragment:L1,lights_lambert_pars_fragment:I1,lights_pars_begin:U1,lights_toon_fragment:F1,lights_toon_pars_fragment:B1,lights_phong_fragment:z1,lights_phong_pars_fragment:G1,lights_physical_fragment:H1,lights_physical_pars_fragment:k1,lights_fragment_begin:V1,lights_fragment_maps:j1,lights_fragment_end:X1,lightprobes_pars_fragment:Y1,logdepthbuf_fragment:W1,logdepthbuf_pars_fragment:q1,logdepthbuf_pars_vertex:$1,logdepthbuf_vertex:K1,map_fragment:Z1,map_pars_fragment:Q1,map_particle_fragment:J1,map_particle_pars_fragment:eA,metalnessmap_fragment:tA,metalnessmap_pars_fragment:nA,morphinstance_vertex:iA,morphcolor_vertex:aA,morphnormal_vertex:sA,morphtarget_pars_vertex:rA,morphtarget_vertex:oA,normal_fragment_begin:lA,normal_fragment_maps:cA,normal_pars_fragment:uA,normal_pars_vertex:fA,normal_vertex:dA,normalmap_pars_fragment:hA,clearcoat_normal_fragment_begin:pA,clearcoat_normal_fragment_maps:mA,clearcoat_pars_fragment:gA,iridescence_pars_fragment:xA,opaque_fragment:_A,packing:vA,premultiplied_alpha_fragment:bA,project_vertex:yA,dithering_fragment:SA,dithering_pars_fragment:EA,roughnessmap_fragment:MA,roughnessmap_pars_fragment:TA,shadowmap_pars_fragment:AA,shadowmap_pars_vertex:wA,shadowmap_vertex:RA,shadowmask_pars_fragment:CA,skinbase_vertex:NA,skinning_pars_vertex:OA,skinning_vertex:DA,skinnormal_vertex:LA,specularmap_fragment:IA,specularmap_pars_fragment:UA,tonemapping_fragment:PA,tonemapping_pars_fragment:FA,transmission_fragment:BA,transmission_pars_fragment:zA,uv_pars_fragment:GA,uv_pars_vertex:HA,uv_vertex:kA,worldpos_vertex:VA,background_vert:jA,background_frag:XA,backgroundCube_vert:YA,backgroundCube_frag:WA,cube_vert:qA,cube_frag:$A,depth_vert:KA,depth_frag:ZA,distance_vert:QA,distance_frag:JA,equirect_vert:ew,equirect_frag:tw,linedashed_vert:nw,linedashed_frag:iw,meshbasic_vert:aw,meshbasic_frag:sw,meshlambert_vert:rw,meshlambert_frag:ow,meshmatcap_vert:lw,meshmatcap_frag:cw,meshnormal_vert:uw,meshnormal_frag:fw,meshphong_vert:dw,meshphong_frag:hw,meshphysical_vert:pw,meshphysical_frag:mw,meshtoon_vert:gw,meshtoon_frag:xw,points_vert:_w,points_frag:vw,shadow_vert:bw,shadow_frag:yw,sprite_vert:Sw,sprite_frag:Ew},ke={common:{diffuse:{value:new pn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new St}},envmap:{envMap:{value:null},envMapRotation:{value:new St},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new St}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new St}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new St},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new St},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new St},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new St}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new St}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new St}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ae},probesMax:{value:new ae},probesResolution:{value:new ae}},points:{diffuse:{value:new pn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0},uvTransform:{value:new St}},sprite:{diffuse:{value:new pn(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}}},Ua={basic:{uniforms:Ei([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Ei([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new pn(0)},envMapIntensity:{value:1}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Ei([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new pn(0)},specular:{value:new pn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Ei([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new pn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Ei([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new pn(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Ei([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Ei([ke.points,ke.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Ei([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Ei([ke.common,ke.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Ei([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Ei([ke.sprite,ke.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new St},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new St}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distance:{uniforms:Ei([ke.common,ke.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distance_vert,fragmentShader:Nt.distance_frag},shadow:{uniforms:Ei([ke.lights,ke.fog,{color:{value:new pn(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Ua.physical={uniforms:Ei([Ua.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new St},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new St},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new St},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new St},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new St},sheen:{value:0},sheenColor:{value:new pn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new St},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new St},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new St},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new St},attenuationDistance:{value:0},attenuationColor:{value:new pn(0)},specularColor:{value:new pn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new St},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new St},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new St}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const Fu={r:0,b:0,g:0},Mw=new Wn,wb=new St;wb.set(-1,0,0,0,1,0,0,0,1);function Tw(r,e,i,s,l,c){const u=new pn(0);let h=l===!0?0:1,m,p,x=null,v=0,g=null;function b(R){let O=R.isScene===!0?R.background:null;if(O&&O.isTexture){const U=R.backgroundBlurriness>0;O=e.get(O,U)}return O}function M(R){let O=!1;const U=b(R);U===null?S(u,h):U&&U.isColor&&(S(U,1),O=!0);const G=r.xr.getEnvironmentBlendMode();G==="additive"?i.buffers.color.setClear(0,0,0,1,c):G==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||O)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function A(R,O){const U=b(O);U&&(U.isCubeTexture||U.mapping===of)?(p===void 0&&(p=new ka(new oc(1,1,1),new Va({name:"BackgroundCubeMaterial",uniforms:Wo(Ua.backgroundCube.uniforms),vertexShader:Ua.backgroundCube.vertexShader,fragmentShader:Ua.backgroundCube.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(G,I,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=U,p.material.uniforms.backgroundBlurriness.value=O.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(Mw.makeRotationFromEuler(O.backgroundRotation)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(wb),p.material.toneMapped=$t.getTransfer(U.colorSpace)!==cn,(x!==U||v!==U.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,x=U,v=U.version,g=r.toneMapping),p.layers.enableAll(),R.unshift(p,p.geometry,p.material,0,0,null)):U&&U.isTexture&&(m===void 0&&(m=new ka(new cf(2,2),new Va({name:"BackgroundMaterial",uniforms:Wo(Ua.background.uniforms),vertexShader:Ua.background.vertexShader,fragmentShader:Ua.background.fragmentShader,side:tr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=U,m.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,m.material.toneMapped=$t.getTransfer(U.colorSpace)!==cn,U.matrixAutoUpdate===!0&&U.updateMatrix(),m.material.uniforms.uvTransform.value.copy(U.matrix),(x!==U||v!==U.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,x=U,v=U.version,g=r.toneMapping),m.layers.enableAll(),R.unshift(m,m.geometry,m.material,0,0,null))}function S(R,O){R.getRGB(Fu,Eb(r)),i.buffers.color.setClear(Fu.r,Fu.g,Fu.b,O,c)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(R,O=1){u.set(R),h=O,S(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(R){h=R,S(u,h)},render:M,addToRenderList:A,dispose:y}}function Aw(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,u=!1;function h(k,X,te,oe,V){let L=!1;const z=v(k,oe,te,X);c!==z&&(c=z,p(c.object)),L=b(k,oe,te,V),L&&M(k,oe,te,V),V!==null&&e.update(V,r.ELEMENT_ARRAY_BUFFER),(L||u)&&(u=!1,U(k,X,te,oe),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function m(){return r.createVertexArray()}function p(k){return r.bindVertexArray(k)}function x(k){return r.deleteVertexArray(k)}function v(k,X,te,oe){const V=oe.wireframe===!0;let L=s[X.id];L===void 0&&(L={},s[X.id]=L);const z=k.isInstancedMesh===!0?k.id:0;let W=L[z];W===void 0&&(W={},L[z]=W);let ce=W[te.id];ce===void 0&&(ce={},W[te.id]=ce);let ge=ce[V];return ge===void 0&&(ge=g(m()),ce[V]=ge),ge}function g(k){const X=[],te=[],oe=[];for(let V=0;V<i;V++)X[V]=0,te[V]=0,oe[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:te,attributeDivisors:oe,object:k,attributes:{},index:null}}function b(k,X,te,oe){const V=c.attributes,L=X.attributes;let z=0;const W=te.getAttributes();for(const ce in W)if(W[ce].location>=0){const P=V[ce];let Z=L[ce];if(Z===void 0&&(ce==="instanceMatrix"&&k.instanceMatrix&&(Z=k.instanceMatrix),ce==="instanceColor"&&k.instanceColor&&(Z=k.instanceColor)),P===void 0||P.attribute!==Z||Z&&P.data!==Z.data)return!0;z++}return c.attributesNum!==z||c.index!==oe}function M(k,X,te,oe){const V={},L=X.attributes;let z=0;const W=te.getAttributes();for(const ce in W)if(W[ce].location>=0){let P=L[ce];P===void 0&&(ce==="instanceMatrix"&&k.instanceMatrix&&(P=k.instanceMatrix),ce==="instanceColor"&&k.instanceColor&&(P=k.instanceColor));const Z={};Z.attribute=P,P&&P.data&&(Z.data=P.data),V[ce]=Z,z++}c.attributes=V,c.attributesNum=z,c.index=oe}function A(){const k=c.newAttributes;for(let X=0,te=k.length;X<te;X++)k[X]=0}function S(k){y(k,0)}function y(k,X){const te=c.newAttributes,oe=c.enabledAttributes,V=c.attributeDivisors;te[k]=1,oe[k]===0&&(r.enableVertexAttribArray(k),oe[k]=1),V[k]!==X&&(r.vertexAttribDivisor(k,X),V[k]=X)}function R(){const k=c.newAttributes,X=c.enabledAttributes;for(let te=0,oe=X.length;te<oe;te++)X[te]!==k[te]&&(r.disableVertexAttribArray(te),X[te]=0)}function O(k,X,te,oe,V,L,z){z===!0?r.vertexAttribIPointer(k,X,te,V,L):r.vertexAttribPointer(k,X,te,oe,V,L)}function U(k,X,te,oe){A();const V=oe.attributes,L=te.getAttributes(),z=X.defaultAttributeValues;for(const W in L){const ce=L[W];if(ce.location>=0){let ge=V[W];if(ge===void 0&&(W==="instanceMatrix"&&k.instanceMatrix&&(ge=k.instanceMatrix),W==="instanceColor"&&k.instanceColor&&(ge=k.instanceColor)),ge!==void 0){const P=ge.normalized,Z=ge.itemSize,_e=e.get(ge);if(_e===void 0)continue;const Ae=_e.buffer,Oe=_e.type,ee=_e.bytesPerElement,Ee=Oe===r.INT||Oe===r.UNSIGNED_INT||ge.gpuType===fm;if(ge.isInterleavedBufferAttribute){const we=ge.data,Ge=we.stride,Ze=ge.offset;if(we.isInstancedInterleavedBuffer){for(let Ke=0;Ke<ce.locationSize;Ke++)y(ce.location+Ke,we.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=we.meshPerAttribute*we.count)}else for(let Ke=0;Ke<ce.locationSize;Ke++)S(ce.location+Ke);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let Ke=0;Ke<ce.locationSize;Ke++)O(ce.location+Ke,Z/ce.locationSize,Oe,P,Ge*ee,(Ze+Z/ce.locationSize*Ke)*ee,Ee)}else{if(ge.isInstancedBufferAttribute){for(let we=0;we<ce.locationSize;we++)y(ce.location+we,ge.meshPerAttribute);k.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let we=0;we<ce.locationSize;we++)S(ce.location+we);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let we=0;we<ce.locationSize;we++)O(ce.location+we,Z/ce.locationSize,Oe,P,Z*ee,Z/ce.locationSize*we*ee,Ee)}}else if(z!==void 0){const P=z[W];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ce.location,P);break;case 3:r.vertexAttrib3fv(ce.location,P);break;case 4:r.vertexAttrib4fv(ce.location,P);break;default:r.vertexAttrib1fv(ce.location,P)}}}}R()}function G(){F();for(const k in s){const X=s[k];for(const te in X){const oe=X[te];for(const V in oe){const L=oe[V];for(const z in L)x(L[z].object),delete L[z];delete oe[V]}}delete s[k]}}function I(k){if(s[k.id]===void 0)return;const X=s[k.id];for(const te in X){const oe=X[te];for(const V in oe){const L=oe[V];for(const z in L)x(L[z].object),delete L[z];delete oe[V]}}delete s[k.id]}function B(k){for(const X in s){const te=s[X];for(const oe in te){const V=te[oe];if(V[k.id]===void 0)continue;const L=V[k.id];for(const z in L)x(L[z].object),delete L[z];delete V[k.id]}}}function w(k){for(const X in s){const te=s[X],oe=k.isInstancedMesh===!0?k.id:0,V=te[oe];if(V!==void 0){for(const L in V){const z=V[L];for(const W in z)x(z[W].object),delete z[W];delete V[L]}delete te[oe],Object.keys(te).length===0&&delete s[X]}}}function F(){$(),u=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:$,dispose:G,releaseStatesOfGeometry:I,releaseStatesOfObject:w,releaseStatesOfProgram:B,initAttributes:A,enableAttribute:S,disableUnusedAttributes:R}}function ww(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function u(m,p,x){x!==0&&(r.drawArraysInstanced(s,m,p,x),i.update(p,s,x))}function h(m,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,x);let g=0;for(let b=0;b<x;b++)g+=p[b];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function Rw(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function u(B){return!(B!==Aa&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const w=B===xs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==ma&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==Pa&&!w)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const x=m(p);x!==p&&(mt("WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&mt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),R=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),G=r.getParameter(r.MAX_SAMPLES),I=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:b,maxVertexTextures:M,maxTextureSize:A,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:R,maxVaryings:O,maxFragmentUniforms:U,maxSamples:G,samples:I}}function Cw(r){const e=this;let i=null,s=0,l=!1,c=!1;const u=new Zs,h=new St,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const b=v.length!==0||g||s!==0||l;return l=g,s=v.length,b},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=x(v,g,0)},this.setState=function(v,g,b){const M=v.clippingPlanes,A=v.clipIntersection,S=v.clipShadows,y=r.get(v);if(!l||M===null||M.length===0||c&&!S)c?x(null):p();else{const R=c?0:s,O=R*4;let U=y.clippingState||null;m.value=U,U=x(M,g,O,b);for(let G=0;G!==O;++G)U[G]=i[G];y.clippingState=U,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=R}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function x(v,g,b,M){const A=v!==null?v.length:0;let S=null;if(A!==0){if(S=m.value,M!==!0||S===null){const y=b+A*4,R=g.matrixWorldInverse;h.getNormalMatrix(R),(S===null||S.length<y)&&(S=new Float32Array(y));for(let O=0,U=b;O!==A;++O,U+=4)u.copy(v[O]).applyMatrix4(R,h),u.normal.toArray(S,U),S[U+3]=u.constant}m.value=S,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,S}}const Js=4,uv=[.125,.215,.35,.446,.526,.582],Lr=20,Nw=256,jl=new Tb,fv=new pn;let tp=null,np=0,ip=0,ap=!1;const Ow=new ae;class dv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:u=256,position:h=Ow}=c;tp=this._renderer.getRenderTarget(),np=this._renderer.getActiveCubeFace(),ip=this._renderer.getActiveMipmapLevel(),ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(tp,np,ip),this._renderer.xr.enabled=ap,e.scissorTest=!1,Po(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Br||e.mapping===Xo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tp=this._renderer.getRenderTarget(),np=this._renderer.getActiveCubeFace(),ip=this._renderer.getActiveMipmapLevel(),ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:xs,format:Aa,colorSpace:nf,depthBuffer:!1},l=hv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Dw(c)),this._blurMaterial=Iw(c,e,i),this._ggxMaterial=Lw(c,e,i)}return l}_compileMaterial(e){const i=new ka(new ja,e);this._renderer.compile(i,jl)}_sceneToCubeUV(e,i,s,l,c){const m=new pa(90,1,i,s),p=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,b=v.toneMapping;v.getClearColor(fv),v.toneMapping=Ba,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ka(new oc,new ym({name:"PMREM.Background",side:Pi,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,S=A.material;let y=!1;const R=e.background;R?R.isColor&&(S.color.copy(R),e.background=null,y=!0):(S.color.copy(fv),y=!0);for(let O=0;O<6;O++){const U=O%3;U===0?(m.up.set(0,p[O],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[O],c.y,c.z)):U===1?(m.up.set(0,0,p[O]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[O],c.z)):(m.up.set(0,p[O],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[O]));const G=this._cubeSize;Po(l,U*G,O>2?G:0,G,G),v.setRenderTarget(l),y&&v.render(A,m),v.render(e,m)}v.toneMapping=b,v.autoClear=g,e.background=R}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Br||e.mapping===Xo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=mv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pv());const c=l?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Po(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(u,jl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,h=this._lodMeshes[s];h.material=u;const m=u.uniforms,p=s/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),v=Math.sqrt(p*p-x*x),g=0+p*1.25,b=v*g,{_lodMax:M}=this,A=this._sizeLods[s],S=3*A*(s>M-Js?s-M+Js:0),y=4*(this._cubeSize-A);m.envMap.value=e.texture,m.roughness.value=b,m.mipInt.value=M-i,Po(c,S,y,3*A,2*A),l.setRenderTarget(c),l.render(h,jl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-s,Po(e,S,y,3*A,2*A),l.setRenderTarget(e),l.render(h,jl)}_blur(e,i,s,l,c){const u=this._pingPongRenderTarget;this._halfBlur(e,u,i,s,l,"latitudinal",c),this._halfBlur(u,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,u,h){const m=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const x=3,v=this._lodMeshes[l];v.material=p;const g=p.uniforms,b=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*Lr-1),A=c/M,S=isFinite(c)?1+Math.floor(x*A):Lr;S>Lr&&mt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Lr}`);const y=[];let R=0;for(let B=0;B<Lr;++B){const w=B/A,F=Math.exp(-w*w/2);y.push(F),B===0?R+=F:B<S&&(R+=2*F)}for(let B=0;B<y.length;B++)y[B]=y[B]/R;g.envMap.value=e.texture,g.samples.value=S,g.weights.value=y,g.latitudinal.value=u==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:O}=this;g.dTheta.value=M,g.mipInt.value=O-s;const U=this._sizeLods[l],G=3*U*(l>O-Js?l-O+Js:0),I=4*(this._cubeSize-U);Po(i,G,I,3*U,2*U),m.setRenderTarget(i),m.render(v,jl)}}function Dw(r){const e=[],i=[],s=[];let l=r;const c=r-Js+1+uv.length;for(let u=0;u<c;u++){const h=Math.pow(2,l);e.push(h);let m=1/h;u>r-Js?m=uv[u-r+Js-1]:u===0&&(m=0),i.push(m);const p=1/(h-2),x=-p,v=1+p,g=[x,x,v,x,v,v,x,x,v,v,x,v],b=6,M=6,A=3,S=2,y=1,R=new Float32Array(A*M*b),O=new Float32Array(S*M*b),U=new Float32Array(y*M*b);for(let I=0;I<b;I++){const B=I%3*2/3-1,w=I>2?0:-1,F=[B,w,0,B+2/3,w,0,B+2/3,w+1,0,B,w,0,B+2/3,w+1,0,B,w+1,0];R.set(F,A*M*I),O.set(g,S*M*I);const $=[I,I,I,I,I,I];U.set($,y*M*I)}const G=new ja;G.setAttribute("position",new Ga(R,A)),G.setAttribute("uv",new Ga(O,S)),G.setAttribute("faceIndex",new Ga(U,y)),s.push(new ka(G,null)),l>Js&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function hv(r,e,i){const s=new za(r,e,i);return s.texture.mapping=of,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Po(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function Lw(r,e,i){return new Va({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Nw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uf(),fragmentShader:`

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
		`,blending:ms,depthTest:!1,depthWrite:!1})}function Iw(r,e,i){const s=new Float32Array(Lr),l=new ae(0,1,0);return new Va({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:uf(),fragmentShader:`

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
		`,blending:ms,depthTest:!1,depthWrite:!1})}function pv(){return new Va({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uf(),fragmentShader:`

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
		`,blending:ms,depthTest:!1,depthWrite:!1})}function mv(){return new Va({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ms,depthTest:!1,depthWrite:!1})}function uf(){return`

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
	`}class Rb extends za{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new yb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new oc(5,5,5),c=new Va({name:"CubemapFromEquirect",uniforms:Wo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Pi,blending:ms});c.uniforms.tEquirect.value=i;const u=new ka(l,c),h=i.minFilter;return i.minFilter===Ir&&(i.minFilter=mi),new zT(1,10,this).update(e,u),i.minFilter=h,u.geometry.dispose(),u.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(i,s,l);e.setRenderTarget(c)}}function Uw(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,b=!1){return g==null?null:b?u(g):c(g)}function c(g){if(g&&g.isTexture){const b=g.mapping;if(b===Vu||b===Ch)if(e.has(g)){const M=e.get(g).texture;return h(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const A=new Rb(M.height);return A.fromEquirectangularTexture(r,g),e.set(g,A),g.addEventListener("dispose",p),h(A.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const b=g.mapping,M=b===Vu||b===Ch,A=b===Br||b===Xo;if(M||A){let S=i.get(g);const y=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==y)return s===null&&(s=new dv(r)),S=M?s.fromEquirectangular(g,S):s.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),S.texture;if(S!==void 0)return S.texture;{const R=g.image;return M&&R&&R.height>0||A&&R&&m(R)?(s===null&&(s=new dv(r)),S=M?s.fromEquirectangular(g):s.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),g.addEventListener("dispose",x),S.texture):null}}}return g}function h(g,b){return b===Vu?g.mapping=Br:b===Ch&&(g.mapping=Xo),g}function m(g){let b=0;const M=6;for(let A=0;A<M;A++)g[A]!==void 0&&b++;return b===M}function p(g){const b=g.target;b.removeEventListener("dispose",p);const M=e.get(b);M!==void 0&&(e.delete(b),M.dispose())}function x(g){const b=g.target;b.removeEventListener("dispose",x);const M=i.get(b);M!==void 0&&(i.delete(b),M.dispose())}function v(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function Pw(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&tm("WebGLRenderer: "+s+" extension not supported."),l}}}function Fw(r,e,i,s){const l={},c=new WeakMap;function u(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",u),delete l[g.id];const b=c.get(g);b&&(e.remove(b),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(v,g){return l[g.id]===!0||(g.addEventListener("dispose",u),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const b in g)e.update(g[b],r.ARRAY_BUFFER)}function p(v){const g=[],b=v.index,M=v.attributes.position;let A=0;if(M===void 0)return;if(b!==null){const R=b.array;A=b.version;for(let O=0,U=R.length;O<U;O+=3){const G=R[O+0],I=R[O+1],B=R[O+2];g.push(G,I,I,B,B,G)}}else{const R=M.array;A=M.version;for(let O=0,U=R.length/3-1;O<U;O+=3){const G=O+0,I=O+1,B=O+2;g.push(G,I,I,B,B,G)}}const S=new(M.count>=65535?_b:xb)(g,1);S.version=A;const y=c.get(v);y&&e.remove(y),c.set(v,S)}function x(v){const g=c.get(v);if(g){const b=v.index;b!==null&&g.version<b.version&&p(v)}else p(v);return c.get(v)}return{get:h,update:m,getWireframeAttribute:x}}function Bw(r,e,i){let s;function l(v){s=v}let c,u;function h(v){c=v.type,u=v.bytesPerElement}function m(v,g){r.drawElements(s,g,c,v*u),i.update(g,s,1)}function p(v,g,b){b!==0&&(r.drawElementsInstanced(s,g,c,v*u,b),i.update(g,s,b))}function x(v,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,v,0,b);let A=0;for(let S=0;S<b;S++)A+=g[S];i.update(A,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=x}function zw(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,u,h){switch(i.calls++,u){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:Jt("WebGLInfo: Unknown draw mode:",u);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Gw(r,e,i){const s=new WeakMap,l=new Ln;function c(u,h,m){const p=u.morphTargetInfluences,x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=x!==void 0?x.length:0;let g=s.get(h);if(g===void 0||g.count!==v){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const b=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],y=h.morphAttributes.normal||[],R=h.morphAttributes.color||[];let O=0;b===!0&&(O=1),M===!0&&(O=2),A===!0&&(O=3);let U=h.attributes.position.count*O,G=1;U>e.maxTextureSize&&(G=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const I=new Float32Array(U*G*4*v),B=new pb(I,U,G,v);B.type=Pa,B.needsUpdate=!0;const w=O*4;for(let $=0;$<v;$++){const k=S[$],X=y[$],te=R[$],oe=U*G*4*$;for(let V=0;V<k.count;V++){const L=V*w;b===!0&&(l.fromBufferAttribute(k,V),I[oe+L+0]=l.x,I[oe+L+1]=l.y,I[oe+L+2]=l.z,I[oe+L+3]=0),M===!0&&(l.fromBufferAttribute(X,V),I[oe+L+4]=l.x,I[oe+L+5]=l.y,I[oe+L+6]=l.z,I[oe+L+7]=0),A===!0&&(l.fromBufferAttribute(te,V),I[oe+L+8]=l.x,I[oe+L+9]=l.y,I[oe+L+10]=l.z,I[oe+L+11]=te.itemSize===4?l.w:1)}}g={count:v,texture:B,size:new Ot(U,G)},s.set(h,g),h.addEventListener("dispose",F)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,i);else{let b=0;for(let A=0;A<p.length;A++)b+=p[A];const M=h.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",M),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function Hw(r,e,i,s,l){let c=new WeakMap;function u(p){const x=l.render.frame,v=p.geometry,g=e.get(p,v);if(c.get(g)!==x&&(e.update(g),c.set(g,x)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==x&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,x))),p.isSkinnedMesh){const b=p.skeleton;c.get(b)!==x&&(b.update(),c.set(b,x))}return g}function h(){c=new WeakMap}function m(p){const x=p.target;x.removeEventListener("dispose",m),s.releaseStatesOfObject(x),i.remove(x.instanceMatrix),x.instanceColor!==null&&i.remove(x.instanceColor)}return{update:u,dispose:h}}const kw={[Qv]:"LINEAR_TONE_MAPPING",[Jv]:"REINHARD_TONE_MAPPING",[eb]:"CINEON_TONE_MAPPING",[tb]:"ACES_FILMIC_TONE_MAPPING",[ib]:"AGX_TONE_MAPPING",[ab]:"NEUTRAL_TONE_MAPPING",[nb]:"CUSTOM_TONE_MAPPING"};function Vw(r,e,i,s,l){const c=new za(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new Yo(e,i):void 0}),u=new za(e,i,{type:xs,depthBuffer:!1,stencilBuffer:!1}),h=new ja;h.setAttribute("position",new ga([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ga([0,2,0,0,2,0],2));const m=new DT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ka(h,m),x=new Tb(-1,1,1,-1,0,1);let v=null,g=null,b=!1,M,A=null,S=[],y=!1;this.setSize=function(R,O){c.setSize(R,O),u.setSize(R,O);for(let U=0;U<S.length;U++){const G=S[U];G.setSize&&G.setSize(R,O)}},this.setEffects=function(R){S=R,y=S.length>0&&S[0].isRenderPass===!0;const O=c.width,U=c.height;for(let G=0;G<S.length;G++){const I=S[G];I.setSize&&I.setSize(O,U)}},this.begin=function(R,O){if(b||R.toneMapping===Ba&&S.length===0)return!1;if(A=O,O!==null){const U=O.width,G=O.height;(c.width!==U||c.height!==G)&&this.setSize(U,G)}return y===!1&&R.setRenderTarget(c),M=R.toneMapping,R.toneMapping=Ba,!0},this.hasRenderPass=function(){return y},this.end=function(R,O){R.toneMapping=M,b=!0;let U=c,G=u;for(let I=0;I<S.length;I++){const B=S[I];if(B.enabled!==!1&&(B.render(R,G,U,O),B.needsSwap!==!1)){const w=U;U=G,G=w}}if(v!==R.outputColorSpace||g!==R.toneMapping){v=R.outputColorSpace,g=R.toneMapping,m.defines={},$t.getTransfer(v)===cn&&(m.defines.SRGB_TRANSFER="");const I=kw[g];I&&(m.defines[I]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=U.texture,R.setRenderTarget(A),R.render(p,x),A=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),u.dispose(),h.dispose(),m.dispose()}}const Cb=new gi,im=new Yo(1,1),Nb=new pb,Ob=new cT,Db=new yb,gv=[],xv=[],_v=new Float32Array(16),vv=new Float32Array(9),bv=new Float32Array(4);function qo(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=gv[l];if(c===void 0&&(c=new Float32Array(l),gv[l]=c),e!==0){s.toArray(c,0);for(let u=1,h=0;u!==e;++u)h+=i,r[u].toArray(c,h)}return c}function qn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function $n(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function ff(r,e){let i=xv[e];i===void 0&&(i=new Int32Array(e),xv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function jw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function Xw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2fv(this.addr,e),$n(i,e)}}function Yw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(qn(i,e))return;r.uniform3fv(this.addr,e),$n(i,e)}}function Ww(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4fv(this.addr,e),$n(i,e)}}function qw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;bv.set(s),r.uniformMatrix2fv(this.addr,!1,bv),$n(i,s)}}function $w(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;vv.set(s),r.uniformMatrix3fv(this.addr,!1,vv),$n(i,s)}}function Kw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;_v.set(s),r.uniformMatrix4fv(this.addr,!1,_v),$n(i,s)}}function Zw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function Qw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2iv(this.addr,e),$n(i,e)}}function Jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(qn(i,e))return;r.uniform3iv(this.addr,e),$n(i,e)}}function eR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4iv(this.addr,e),$n(i,e)}}function tR(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function nR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2uiv(this.addr,e),$n(i,e)}}function iR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(qn(i,e))return;r.uniform3uiv(this.addr,e),$n(i,e)}}function aR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4uiv(this.addr,e),$n(i,e)}}function sR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(im.compareFunction=i.isReversedDepthBuffer()?_m:xm,c=im):c=Cb,i.setTexture2D(e||c,l)}function rR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Ob,l)}function oR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||Db,l)}function lR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||Nb,l)}function cR(r){switch(r){case 5126:return jw;case 35664:return Xw;case 35665:return Yw;case 35666:return Ww;case 35674:return qw;case 35675:return $w;case 35676:return Kw;case 5124:case 35670:return Zw;case 35667:case 35671:return Qw;case 35668:case 35672:return Jw;case 35669:case 35673:return eR;case 5125:return tR;case 36294:return nR;case 36295:return iR;case 36296:return aR;case 35678:case 36198:case 36298:case 36306:case 35682:return sR;case 35679:case 36299:case 36307:return rR;case 35680:case 36300:case 36308:case 36293:return oR;case 36289:case 36303:case 36311:case 36292:return lR}}function uR(r,e){r.uniform1fv(this.addr,e)}function fR(r,e){const i=qo(e,this.size,2);r.uniform2fv(this.addr,i)}function dR(r,e){const i=qo(e,this.size,3);r.uniform3fv(this.addr,i)}function hR(r,e){const i=qo(e,this.size,4);r.uniform4fv(this.addr,i)}function pR(r,e){const i=qo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function mR(r,e){const i=qo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function gR(r,e){const i=qo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function xR(r,e){r.uniform1iv(this.addr,e)}function _R(r,e){r.uniform2iv(this.addr,e)}function vR(r,e){r.uniform3iv(this.addr,e)}function bR(r,e){r.uniform4iv(this.addr,e)}function yR(r,e){r.uniform1uiv(this.addr,e)}function SR(r,e){r.uniform2uiv(this.addr,e)}function ER(r,e){r.uniform3uiv(this.addr,e)}function MR(r,e){r.uniform4uiv(this.addr,e)}function TR(r,e,i){const s=this.cache,l=e.length,c=ff(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=im:u=Cb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||u,c[h])}function AR(r,e,i){const s=this.cache,l=e.length,c=ff(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let u=0;u!==l;++u)i.setTexture3D(e[u]||Ob,c[u])}function wR(r,e,i){const s=this.cache,l=e.length,c=ff(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let u=0;u!==l;++u)i.setTextureCube(e[u]||Db,c[u])}function RR(r,e,i){const s=this.cache,l=e.length,c=ff(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let u=0;u!==l;++u)i.setTexture2DArray(e[u]||Nb,c[u])}function CR(r){switch(r){case 5126:return uR;case 35664:return fR;case 35665:return dR;case 35666:return hR;case 35674:return pR;case 35675:return mR;case 35676:return gR;case 5124:case 35670:return xR;case 35667:case 35671:return _R;case 35668:case 35672:return vR;case 35669:case 35673:return bR;case 5125:return yR;case 36294:return SR;case 36295:return ER;case 36296:return MR;case 35678:case 36198:case 36298:case 36306:case 35682:return TR;case 35679:case 36299:case 36307:return AR;case 35680:case 36300:case 36308:case 36293:return wR;case 36289:case 36303:case 36311:case 36292:return RR}}class NR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=cR(i.type)}}class OR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=CR(i.type)}}class DR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,u=l.length;c!==u;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const sp=/(\w+)(\])?(\[|\.)?/g;function yv(r,e){r.seq.push(e),r.map[e.id]=e}function LR(r,e,i){const s=r.name,l=s.length;for(sp.lastIndex=0;;){const c=sp.exec(s),u=sp.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&u+2===l){yv(i,p===void 0?new NR(h,r,e):new OR(h,r,e));break}else{let v=i.map[h];v===void 0&&(v=new DR(h),yv(i,v)),i=v}}}class $u{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let u=0;u<s;++u){const h=e.getActiveUniform(i,u),m=e.getUniformLocation(i,h.name);LR(h,m,this)}const l=[],c=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(u):c.push(u);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,u=i.length;c!==u;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const u=e[l];u.id in i&&s.push(u)}return s}}function Sv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const IR=37297;let UR=0;function PR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let u=l;u<c;u++){const h=u+1;s.push(`${h===e?">":" "} ${h}: ${i[u]}`)}return s.join(`
`)}const Ev=new St;function FR(r){$t._getMatrix(Ev,$t.workingColorSpace,r);const e=`mat3( ${Ev.elements.map(i=>i.toFixed(4))} )`;switch($t.getTransfer(r)){case af:return[e,"LinearTransferOETF"];case cn:return[e,"sRGBTransferOETF"];default:return mt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Mv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const h=parseInt(u[1]);return i.toUpperCase()+`

`+c+`

`+PR(r.getShaderSource(e),h)}else return c}function BR(r,e){const i=FR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const zR={[Qv]:"Linear",[Jv]:"Reinhard",[eb]:"Cineon",[tb]:"ACESFilmic",[ib]:"AgX",[ab]:"Neutral",[nb]:"Custom"};function GR(r,e){const i=zR[e];return i===void 0?(mt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Bu=new ae;function HR(){$t.getLuminanceCoefficients(Bu);const r=Bu.x.toFixed(4),e=Bu.y.toFixed(4),i=Bu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wl).join(`
`)}function VR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function jR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),u=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[u]={type:c.type,location:r.getAttribLocation(e,u),locationSize:h}}return i}function Wl(r){return r!==""}function Tv(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Av(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const XR=/^[ \t]*#include +<([\w\d./]+)>/gm;function am(r){return r.replace(XR,WR)}const YR=new Map;function WR(r,e){let i=Nt[e];if(i===void 0){const s=YR.get(e);if(s!==void 0)i=Nt[s],mt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return am(i)}const qR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wv(r){return r.replace(qR,$R)}function $R(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Rv(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const KR={[ku]:"SHADOWMAP_TYPE_PCF",[Yl]:"SHADOWMAP_TYPE_VSM"};function ZR(r){return KR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const QR={[Br]:"ENVMAP_TYPE_CUBE",[Xo]:"ENVMAP_TYPE_CUBE",[of]:"ENVMAP_TYPE_CUBE_UV"};function JR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":QR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const eC={[Xo]:"ENVMAP_MODE_REFRACTION"};function tC(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":eC[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const nC={[Zv]:"ENVMAP_BLENDING_MULTIPLY",[HM]:"ENVMAP_BLENDING_MIX",[kM]:"ENVMAP_BLENDING_ADD"};function iC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":nC[r.combine]||"ENVMAP_BLENDING_NONE"}function aC(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function sC(r,e,i,s){const l=r.getContext(),c=i.defines;let u=i.vertexShader,h=i.fragmentShader;const m=ZR(i),p=JR(i),x=tC(i),v=iC(i),g=aC(i),b=kR(i),M=VR(c),A=l.createProgram();let S,y,R=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Wl).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(Wl).join(`
`),y.length>0&&(y+=`
`)):(S=[Rv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wl).join(`
`),y=[Rv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+x:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ba?"#define TONE_MAPPING":"",i.toneMapping!==Ba?Nt.tonemapping_pars_fragment:"",i.toneMapping!==Ba?GR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,BR("linearToOutputTexel",i.outputColorSpace),HR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Wl).join(`
`)),u=am(u),u=Tv(u,i),u=Av(u,i),h=am(h),h=Tv(h,i),h=Av(h,i),u=wv(u),h=wv(h),i.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,S=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",i.glslVersion===G_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===G_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const O=R+S+u,U=R+y+h,G=Sv(l,l.VERTEX_SHADER,O),I=Sv(l,l.FRAGMENT_SHADER,U);l.attachShader(A,G),l.attachShader(A,I),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function B(k){if(r.debug.checkShaderErrors){const X=l.getProgramInfoLog(A)||"",te=l.getShaderInfoLog(G)||"",oe=l.getShaderInfoLog(I)||"",V=X.trim(),L=te.trim(),z=oe.trim();let W=!0,ce=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,A,G,I);else{const ge=Mv(l,G,"vertex"),P=Mv(l,I,"fragment");Jt("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+V+`
`+ge+`
`+P)}else V!==""?mt("WebGLProgram: Program Info Log:",V):(L===""||z==="")&&(ce=!1);ce&&(k.diagnostics={runnable:W,programLog:V,vertexShader:{log:L,prefix:S},fragmentShader:{log:z,prefix:y}})}l.deleteShader(G),l.deleteShader(I),w=new $u(l,A),F=jR(l,A)}let w;this.getUniforms=function(){return w===void 0&&B(this),w};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let $=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return $===!1&&($=l.getProgramParameter(A,IR)),$},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=UR++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=G,this.fragmentShader=I,this}let rC=0;class oC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(l)===!1&&(u.add(l),l.usedTimes++),u.has(c)===!1&&(u.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new lC(e),i.set(e,s)),s}}class lC{constructor(e){this.id=rC++,this.code=e,this.usedTimes=0}}function cC(r){return r===zr||r===ef||r===tf}function uC(r,e,i,s,l,c){const u=new mb,h=new oC,m=new Set,p=[],x=new Map,v=s.logarithmicDepthBuffer;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(w){return m.add(w),w===0?"uv":`uv${w}`}function A(w,F,$,k,X,te){const oe=k.fog,V=X.geometry,L=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,z=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap,W=e.get(w.envMap||L,z),ce=W&&W.mapping===of?W.image.height:null,ge=b[w.type];w.precision!==null&&(g=s.getMaxPrecision(w.precision),g!==w.precision&&mt("WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const P=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Z=P!==void 0?P.length:0;let _e=0;V.morphAttributes.position!==void 0&&(_e=1),V.morphAttributes.normal!==void 0&&(_e=2),V.morphAttributes.color!==void 0&&(_e=3);let Ae,Oe,ee,Ee;if(ge){const it=Ua[ge];Ae=it.vertexShader,Oe=it.fragmentShader}else Ae=w.vertexShader,Oe=w.fragmentShader,h.update(w),ee=h.getVertexShaderID(w),Ee=h.getFragmentShaderID(w);const we=r.getRenderTarget(),Ge=r.state.buffers.depth.getReversed(),Ze=X.isInstancedMesh===!0,Ke=X.isBatchedMesh===!0,At=!!w.map,ut=!!w.matcap,je=!!W,Dt=!!w.aoMap,xt=!!w.lightMap,mn=!!w.bumpMap,Kt=!!w.normalMap,kt=!!w.displacementMap,q=!!w.emissiveMap,yt=!!w.metalnessMap,vt=!!w.roughnessMap,Et=w.anisotropy>0,ve=w.clearcoat>0,Vt=w.dispersion>0,D=w.iridescence>0,T=w.sheen>0,J=w.transmission>0,me=Et&&!!w.anisotropyMap,Te=ve&&!!w.clearcoatMap,ye=ve&&!!w.clearcoatNormalMap,Ue=ve&&!!w.clearcoatRoughnessMap,fe=D&&!!w.iridescenceMap,pe=D&&!!w.iridescenceThicknessMap,Le=T&&!!w.sheenColorMap,ze=T&&!!w.sheenRoughnessMap,Ne=!!w.specularMap,Pe=!!w.specularColorMap,rt=!!w.specularIntensityMap,ht=J&&!!w.transmissionMap,ct=J&&!!w.thicknessMap,j=!!w.gradientMap,De=!!w.alphaMap,he=w.alphaTest>0,Ie=!!w.alphaHash,Fe=!!w.extensions;let Re=Ba;w.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(Re=r.toneMapping);const We={shaderID:ge,shaderType:w.type,shaderName:w.name,vertexShader:Ae,fragmentShader:Oe,defines:w.defines,customVertexShaderID:ee,customFragmentShaderID:Ee,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,batching:Ke,batchingColor:Ke&&X._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&X.instanceColor!==null,instancingMorph:Ze&&X.morphTexture!==null,outputColorSpace:we===null?r.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!w.alphaToCoverage,map:At,matcap:ut,envMap:je,envMapMode:je&&W.mapping,envMapCubeUVHeight:ce,aoMap:Dt,lightMap:xt,bumpMap:mn,normalMap:Kt,displacementMap:kt,emissiveMap:q,normalMapObjectSpace:Kt&&w.normalMapType===XM,normalMapTangentSpace:Kt&&w.normalMapType===F_,packedNormalMap:Kt&&w.normalMapType===F_&&cC(w.normalMap.format),metalnessMap:yt,roughnessMap:vt,anisotropy:Et,anisotropyMap:me,clearcoat:ve,clearcoatMap:Te,clearcoatNormalMap:ye,clearcoatRoughnessMap:Ue,dispersion:Vt,iridescence:D,iridescenceMap:fe,iridescenceThicknessMap:pe,sheen:T,sheenColorMap:Le,sheenRoughnessMap:ze,specularMap:Ne,specularColorMap:Pe,specularIntensityMap:rt,transmission:J,transmissionMap:ht,thicknessMap:ct,gradientMap:j,opaque:w.transparent===!1&&w.blending===Go&&w.alphaToCoverage===!1,alphaMap:De,alphaTest:he,alphaHash:Ie,combine:w.combine,mapUv:At&&M(w.map.channel),aoMapUv:Dt&&M(w.aoMap.channel),lightMapUv:xt&&M(w.lightMap.channel),bumpMapUv:mn&&M(w.bumpMap.channel),normalMapUv:Kt&&M(w.normalMap.channel),displacementMapUv:kt&&M(w.displacementMap.channel),emissiveMapUv:q&&M(w.emissiveMap.channel),metalnessMapUv:yt&&M(w.metalnessMap.channel),roughnessMapUv:vt&&M(w.roughnessMap.channel),anisotropyMapUv:me&&M(w.anisotropyMap.channel),clearcoatMapUv:Te&&M(w.clearcoatMap.channel),clearcoatNormalMapUv:ye&&M(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&M(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&M(w.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&M(w.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&M(w.sheenColorMap.channel),sheenRoughnessMapUv:ze&&M(w.sheenRoughnessMap.channel),specularMapUv:Ne&&M(w.specularMap.channel),specularColorMapUv:Pe&&M(w.specularColorMap.channel),specularIntensityMapUv:rt&&M(w.specularIntensityMap.channel),transmissionMapUv:ht&&M(w.transmissionMap.channel),thicknessMapUv:ct&&M(w.thicknessMap.channel),alphaMapUv:De&&M(w.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Kt||Et),vertexNormals:!!V.attributes.normal,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!V.attributes.uv&&(At||De),fog:!!oe,useFog:w.fog===!0,fogExp2:!!oe&&oe.isFogExp2,flatShading:w.wireframe===!1&&(w.flatShading===!0||V.attributes.normal===void 0&&Kt===!1&&(w.isMeshLambertMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isMeshPhysicalMaterial)),sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Ge,skinning:X.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:_e,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:te.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&$.length>0,shadowMapType:r.shadowMap.type,toneMapping:Re,decodeVideoTexture:At&&w.map.isVideoTexture===!0&&$t.getTransfer(w.map.colorSpace)===cn,decodeVideoTextureEmissive:q&&w.emissiveMap.isVideoTexture===!0&&$t.getTransfer(w.emissiveMap.colorSpace)===cn,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===hs,flipSided:w.side===Pi,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Fe&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&w.extensions.multiDraw===!0||Ke)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return We.vertexUv1s=m.has(1),We.vertexUv2s=m.has(2),We.vertexUv3s=m.has(3),m.clear(),We}function S(w){const F=[];if(w.shaderID?F.push(w.shaderID):(F.push(w.customVertexShaderID),F.push(w.customFragmentShaderID)),w.defines!==void 0)for(const $ in w.defines)F.push($),F.push(w.defines[$]);return w.isRawShaderMaterial===!1&&(y(F,w),R(F,w),F.push(r.outputColorSpace)),F.push(w.customProgramCacheKey),F.join()}function y(w,F){w.push(F.precision),w.push(F.outputColorSpace),w.push(F.envMapMode),w.push(F.envMapCubeUVHeight),w.push(F.mapUv),w.push(F.alphaMapUv),w.push(F.lightMapUv),w.push(F.aoMapUv),w.push(F.bumpMapUv),w.push(F.normalMapUv),w.push(F.displacementMapUv),w.push(F.emissiveMapUv),w.push(F.metalnessMapUv),w.push(F.roughnessMapUv),w.push(F.anisotropyMapUv),w.push(F.clearcoatMapUv),w.push(F.clearcoatNormalMapUv),w.push(F.clearcoatRoughnessMapUv),w.push(F.iridescenceMapUv),w.push(F.iridescenceThicknessMapUv),w.push(F.sheenColorMapUv),w.push(F.sheenRoughnessMapUv),w.push(F.specularMapUv),w.push(F.specularColorMapUv),w.push(F.specularIntensityMapUv),w.push(F.transmissionMapUv),w.push(F.thicknessMapUv),w.push(F.combine),w.push(F.fogExp2),w.push(F.sizeAttenuation),w.push(F.morphTargetsCount),w.push(F.morphAttributeCount),w.push(F.numDirLights),w.push(F.numPointLights),w.push(F.numSpotLights),w.push(F.numSpotLightMaps),w.push(F.numHemiLights),w.push(F.numRectAreaLights),w.push(F.numDirLightShadows),w.push(F.numPointLightShadows),w.push(F.numSpotLightShadows),w.push(F.numSpotLightShadowsWithMaps),w.push(F.numLightProbes),w.push(F.shadowMapType),w.push(F.toneMapping),w.push(F.numClippingPlanes),w.push(F.numClipIntersection),w.push(F.depthPacking)}function R(w,F){u.disableAll(),F.instancing&&u.enable(0),F.instancingColor&&u.enable(1),F.instancingMorph&&u.enable(2),F.matcap&&u.enable(3),F.envMap&&u.enable(4),F.normalMapObjectSpace&&u.enable(5),F.normalMapTangentSpace&&u.enable(6),F.clearcoat&&u.enable(7),F.iridescence&&u.enable(8),F.alphaTest&&u.enable(9),F.vertexColors&&u.enable(10),F.vertexAlphas&&u.enable(11),F.vertexUv1s&&u.enable(12),F.vertexUv2s&&u.enable(13),F.vertexUv3s&&u.enable(14),F.vertexTangents&&u.enable(15),F.anisotropy&&u.enable(16),F.alphaHash&&u.enable(17),F.batching&&u.enable(18),F.dispersion&&u.enable(19),F.batchingColor&&u.enable(20),F.gradientMap&&u.enable(21),F.packedNormalMap&&u.enable(22),F.vertexNormals&&u.enable(23),w.push(u.mask),u.disableAll(),F.fog&&u.enable(0),F.useFog&&u.enable(1),F.flatShading&&u.enable(2),F.logarithmicDepthBuffer&&u.enable(3),F.reversedDepthBuffer&&u.enable(4),F.skinning&&u.enable(5),F.morphTargets&&u.enable(6),F.morphNormals&&u.enable(7),F.morphColors&&u.enable(8),F.premultipliedAlpha&&u.enable(9),F.shadowMapEnabled&&u.enable(10),F.doubleSided&&u.enable(11),F.flipSided&&u.enable(12),F.useDepthPacking&&u.enable(13),F.dithering&&u.enable(14),F.transmission&&u.enable(15),F.sheen&&u.enable(16),F.opaque&&u.enable(17),F.pointsUvs&&u.enable(18),F.decodeVideoTexture&&u.enable(19),F.decodeVideoTextureEmissive&&u.enable(20),F.alphaToCoverage&&u.enable(21),F.numLightProbeGrids>0&&u.enable(22),w.push(u.mask)}function O(w){const F=b[w.type];let $;if(F){const k=Ua[F];$=CT.clone(k.uniforms)}else $=w.uniforms;return $}function U(w,F){let $=x.get(F);return $!==void 0?++$.usedTimes:($=new sC(r,F,w,l),p.push($),x.set(F,$)),$}function G(w){if(--w.usedTimes===0){const F=p.indexOf(w);p[F]=p[p.length-1],p.pop(),x.delete(w.cacheKey),w.destroy()}}function I(w){h.remove(w)}function B(){h.dispose()}return{getParameters:A,getProgramCacheKey:S,getUniforms:O,acquireProgram:U,releaseProgram:G,releaseShaderCache:I,programs:p,dispose:B}}function fC(){let r=new WeakMap;function e(u){return r.has(u)}function i(u){let h=r.get(u);return h===void 0&&(h={},r.set(u,h)),h}function s(u){r.delete(u)}function l(u,h,m){r.get(u)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function dC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Cv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Nv(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function u(g){let b=0;return g.isInstancedMesh&&(b+=2),g.isSkinnedMesh&&(b+=1),b}function h(g,b,M,A,S,y){let R=r[e];return R===void 0?(R={id:g.id,object:g,geometry:b,material:M,materialVariant:u(g),groupOrder:A,renderOrder:g.renderOrder,z:S,group:y},r[e]=R):(R.id=g.id,R.object=g,R.geometry=b,R.material=M,R.materialVariant=u(g),R.groupOrder=A,R.renderOrder=g.renderOrder,R.z=S,R.group=y),e++,R}function m(g,b,M,A,S,y){const R=h(g,b,M,A,S,y);M.transmission>0?s.push(R):M.transparent===!0?l.push(R):i.push(R)}function p(g,b,M,A,S,y){const R=h(g,b,M,A,S,y);M.transmission>0?s.unshift(R):M.transparent===!0?l.unshift(R):i.unshift(R)}function x(g,b){i.length>1&&i.sort(g||dC),s.length>1&&s.sort(b||Cv),l.length>1&&l.sort(b||Cv)}function v(){for(let g=e,b=r.length;g<b;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:v,sort:x}}function hC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let u;return c===void 0?(u=new Nv,r.set(s,[u])):l>=c.length?(u=new Nv,c.push(u)):u=c[l],u}function i(){r=new WeakMap}return{get:e,dispose:i}}function pC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ae,color:new pn};break;case"SpotLight":i={position:new ae,direction:new ae,color:new pn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ae,color:new pn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ae,skyColor:new pn,groundColor:new pn};break;case"RectAreaLight":i={color:new pn,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return r[e.id]=i,i}}}function mC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let gC=0;function xC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function _C(r){const e=new pC,i=mC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ae);const l=new ae,c=new Wn,u=new Wn;function h(p){let x=0,v=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let b=0,M=0,A=0,S=0,y=0,R=0,O=0,U=0,G=0,I=0,B=0;p.sort(xC);for(let F=0,$=p.length;F<$;F++){const k=p[F],X=k.color,te=k.intensity,oe=k.distance;let V=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===zr?V=k.shadow.map.texture:V=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)x+=X.r*te,v+=X.g*te,g+=X.b*te;else if(k.isLightProbe){for(let L=0;L<9;L++)s.probe[L].addScaledVector(k.sh.coefficients[L],te);B++}else if(k.isDirectionalLight){const L=e.get(k);if(L.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const z=k.shadow,W=i.get(k);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,s.directionalShadow[b]=W,s.directionalShadowMap[b]=V,s.directionalShadowMatrix[b]=k.shadow.matrix,R++}s.directional[b]=L,b++}else if(k.isSpotLight){const L=e.get(k);L.position.setFromMatrixPosition(k.matrixWorld),L.color.copy(X).multiplyScalar(te),L.distance=oe,L.coneCos=Math.cos(k.angle),L.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),L.decay=k.decay,s.spot[A]=L;const z=k.shadow;if(k.map&&(s.spotLightMap[G]=k.map,G++,z.updateMatrices(k),k.castShadow&&I++),s.spotLightMatrix[A]=z.matrix,k.castShadow){const W=i.get(k);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,s.spotShadow[A]=W,s.spotShadowMap[A]=V,U++}A++}else if(k.isRectAreaLight){const L=e.get(k);L.color.copy(X).multiplyScalar(te),L.halfWidth.set(k.width*.5,0,0),L.halfHeight.set(0,k.height*.5,0),s.rectArea[S]=L,S++}else if(k.isPointLight){const L=e.get(k);if(L.color.copy(k.color).multiplyScalar(k.intensity),L.distance=k.distance,L.decay=k.decay,k.castShadow){const z=k.shadow,W=i.get(k);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,W.shadowCameraNear=z.camera.near,W.shadowCameraFar=z.camera.far,s.pointShadow[M]=W,s.pointShadowMap[M]=V,s.pointShadowMatrix[M]=k.shadow.matrix,O++}s.point[M]=L,M++}else if(k.isHemisphereLight){const L=e.get(k);L.skyColor.copy(k.color).multiplyScalar(te),L.groundColor.copy(k.groundColor).multiplyScalar(te),s.hemi[y]=L,y++}}S>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ke.LTC_FLOAT_1,s.rectAreaLTC2=ke.LTC_FLOAT_2):(s.rectAreaLTC1=ke.LTC_HALF_1,s.rectAreaLTC2=ke.LTC_HALF_2)),s.ambient[0]=x,s.ambient[1]=v,s.ambient[2]=g;const w=s.hash;(w.directionalLength!==b||w.pointLength!==M||w.spotLength!==A||w.rectAreaLength!==S||w.hemiLength!==y||w.numDirectionalShadows!==R||w.numPointShadows!==O||w.numSpotShadows!==U||w.numSpotMaps!==G||w.numLightProbes!==B)&&(s.directional.length=b,s.spot.length=A,s.rectArea.length=S,s.point.length=M,s.hemi.length=y,s.directionalShadow.length=R,s.directionalShadowMap.length=R,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=R,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=U+G-I,s.spotLightMap.length=G,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=B,w.directionalLength=b,w.pointLength=M,w.spotLength=A,w.rectAreaLength=S,w.hemiLength=y,w.numDirectionalShadows=R,w.numPointShadows=O,w.numSpotShadows=U,w.numSpotMaps=G,w.numLightProbes=B,s.version=gC++)}function m(p,x){let v=0,g=0,b=0,M=0,A=0;const S=x.matrixWorldInverse;for(let y=0,R=p.length;y<R;y++){const O=p[y];if(O.isDirectionalLight){const U=s.directional[v];U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),v++}else if(O.isSpotLight){const U=s.spot[b];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),b++}else if(O.isRectAreaLight){const U=s.rectArea[M];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),u.identity(),c.copy(O.matrixWorld),c.premultiply(S),u.extractRotation(c),U.halfWidth.set(O.width*.5,0,0),U.halfHeight.set(0,O.height*.5,0),U.halfWidth.applyMatrix4(u),U.halfHeight.applyMatrix4(u),M++}else if(O.isPointLight){const U=s.point[g];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),g++}else if(O.isHemisphereLight){const U=s.hemi[A];U.direction.setFromMatrixPosition(O.matrixWorld),U.direction.transformDirection(S),A++}}}return{setup:h,setupView:m,state:s}}function Ov(r){const e=new _C(r),i=[],s=[],l=[];function c(g){v.camera=g,i.length=0,s.length=0,l.length=0}function u(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function x(g){e.setupView(i,g)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:p,setupLightsView:x,pushLight:u,pushShadow:h,pushLightProbeGrid:m}}function vC(r){let e=new WeakMap;function i(l,c=0){const u=e.get(l);let h;return u===void 0?(h=new Ov(r),e.set(l,[h])):c>=u.length?(h=new Ov(r),u.push(h)):h=u[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const bC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yC=`uniform sampler2D shadow_pass;
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
}`,SC=[new ae(1,0,0),new ae(-1,0,0),new ae(0,1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1)],EC=[new ae(0,-1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1),new ae(0,-1,0),new ae(0,-1,0)],Dv=new Wn,Xl=new ae,rp=new ae;function MC(r,e,i){let s=new bb;const l=new Ot,c=new Ot,u=new Ln,h=new LT,m=new IT,p={},x=i.maxTextureSize,v={[tr]:Pi,[Pi]:tr,[hs]:hs},g=new Va({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:bC,fragmentShader:yC}),b=g.clone();b.defines.HORIZONTAL_PASS=1;const M=new ja;M.setAttribute("position",new Ga(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new ka(M,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ku;let y=this.type;this.render=function(I,B,w){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||I.length===0)return;this.type===SM&&(mt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ku);const F=r.getRenderTarget(),$=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),X=r.state;X.setBlending(ms),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const te=y!==this.type;te&&B.traverse(function(oe){oe.material&&(Array.isArray(oe.material)?oe.material.forEach(V=>V.needsUpdate=!0):oe.material.needsUpdate=!0)});for(let oe=0,V=I.length;oe<V;oe++){const L=I[oe],z=L.shadow;if(z===void 0){mt("WebGLShadowMap:",L,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;l.copy(z.mapSize);const W=z.getFrameExtents();l.multiply(W),c.copy(z.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/W.x),l.x=c.x*W.x,z.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/W.y),l.y=c.y*W.y,z.mapSize.y=c.y));const ce=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ce,z.map===null||te===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Yl){if(L.isPointLight){mt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new za(l.x,l.y,{format:zr,type:xs,minFilter:mi,magFilter:mi,generateMipmaps:!1}),z.map.texture.name=L.name+".shadowMap",z.map.depthTexture=new Yo(l.x,l.y,Pa),z.map.depthTexture.name=L.name+".shadowMapDepth",z.map.depthTexture.format=_s,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=oi,z.map.depthTexture.magFilter=oi}else L.isPointLight?(z.map=new Rb(l.x),z.map.depthTexture=new wT(l.x,Ha)):(z.map=new za(l.x,l.y),z.map.depthTexture=new Yo(l.x,l.y,Ha)),z.map.depthTexture.name=L.name+".shadowMap",z.map.depthTexture.format=_s,this.type===ku?(z.map.depthTexture.compareFunction=ce?_m:xm,z.map.depthTexture.minFilter=mi,z.map.depthTexture.magFilter=mi):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=oi,z.map.depthTexture.magFilter=oi);z.camera.updateProjectionMatrix()}const ge=z.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<ge;P++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,P),r.clear();else{P===0&&(r.setRenderTarget(z.map),r.clear());const Z=z.getViewport(P);u.set(c.x*Z.x,c.y*Z.y,c.x*Z.z,c.y*Z.w),X.viewport(u)}if(L.isPointLight){const Z=z.camera,_e=z.matrix,Ae=L.distance||Z.far;Ae!==Z.far&&(Z.far=Ae,Z.updateProjectionMatrix()),Xl.setFromMatrixPosition(L.matrixWorld),Z.position.copy(Xl),rp.copy(Z.position),rp.add(SC[P]),Z.up.copy(EC[P]),Z.lookAt(rp),Z.updateMatrixWorld(),_e.makeTranslation(-Xl.x,-Xl.y,-Xl.z),Dv.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Dv,Z.coordinateSystem,Z.reversedDepth)}else z.updateMatrices(L);s=z.getFrustum(),U(B,w,z.camera,L,this.type)}z.isPointLightShadow!==!0&&this.type===Yl&&R(z,w),z.needsUpdate=!1}y=this.type,S.needsUpdate=!1,r.setRenderTarget(F,$,k)};function R(I,B){const w=e.update(A);g.defines.VSM_SAMPLES!==I.blurSamples&&(g.defines.VSM_SAMPLES=I.blurSamples,b.defines.VSM_SAMPLES=I.blurSamples,g.needsUpdate=!0,b.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new za(l.x,l.y,{format:zr,type:xs})),g.uniforms.shadow_pass.value=I.map.depthTexture,g.uniforms.resolution.value=I.mapSize,g.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(B,null,w,g,A,null),b.uniforms.shadow_pass.value=I.mapPass.texture,b.uniforms.resolution.value=I.mapSize,b.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(B,null,w,b,A,null)}function O(I,B,w,F){let $=null;const k=w.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(k!==void 0)$=k;else if($=w.isPointLight===!0?m:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const X=$.uuid,te=B.uuid;let oe=p[X];oe===void 0&&(oe={},p[X]=oe);let V=oe[te];V===void 0&&(V=$.clone(),oe[te]=V,B.addEventListener("dispose",G)),$=V}if($.visible=B.visible,$.wireframe=B.wireframe,F===Yl?$.side=B.shadowSide!==null?B.shadowSide:B.side:$.side=B.shadowSide!==null?B.shadowSide:v[B.side],$.alphaMap=B.alphaMap,$.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,$.map=B.map,$.clipShadows=B.clipShadows,$.clippingPlanes=B.clippingPlanes,$.clipIntersection=B.clipIntersection,$.displacementMap=B.displacementMap,$.displacementScale=B.displacementScale,$.displacementBias=B.displacementBias,$.wireframeLinewidth=B.wireframeLinewidth,$.linewidth=B.linewidth,w.isPointLight===!0&&$.isMeshDistanceMaterial===!0){const X=r.properties.get($);X.light=w}return $}function U(I,B,w,F,$){if(I.visible===!1)return;if(I.layers.test(B.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&$===Yl)&&(!I.frustumCulled||s.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,I.matrixWorld);const te=e.update(I),oe=I.material;if(Array.isArray(oe)){const V=te.groups;for(let L=0,z=V.length;L<z;L++){const W=V[L],ce=oe[W.materialIndex];if(ce&&ce.visible){const ge=O(I,ce,F,$);I.onBeforeShadow(r,I,B,w,te,ge,W),r.renderBufferDirect(w,null,te,ge,I,W),I.onAfterShadow(r,I,B,w,te,ge,W)}}}else if(oe.visible){const V=O(I,oe,F,$);I.onBeforeShadow(r,I,B,w,te,V,null),r.renderBufferDirect(w,null,te,V,I,null),I.onAfterShadow(r,I,B,w,te,V,null)}}const X=I.children;for(let te=0,oe=X.length;te<oe;te++)U(X[te],B,w,F,$)}function G(I){I.target.removeEventListener("dispose",G);for(const w in p){const F=p[w],$=I.target.uuid;$ in F&&(F[$].dispose(),delete F[$])}}}function TC(r,e){function i(){let j=!1;const De=new Ln;let he=null;const Ie=new Ln(0,0,0,0);return{setMask:function(Fe){he!==Fe&&!j&&(r.colorMask(Fe,Fe,Fe,Fe),he=Fe)},setLocked:function(Fe){j=Fe},setClear:function(Fe,Re,We,it,rn){rn===!0&&(Fe*=it,Re*=it,We*=it),De.set(Fe,Re,We,it),Ie.equals(De)===!1&&(r.clearColor(Fe,Re,We,it),Ie.copy(De))},reset:function(){j=!1,he=null,Ie.set(-1,0,0,0)}}}function s(){let j=!1,De=!1,he=null,Ie=null,Fe=null;return{setReversed:function(Re){if(De!==Re){const We=e.get("EXT_clip_control");Re?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),De=Re;const it=Fe;Fe=null,this.setClear(it)}},getReversed:function(){return De},setTest:function(Re){Re?we(r.DEPTH_TEST):Ge(r.DEPTH_TEST)},setMask:function(Re){he!==Re&&!j&&(r.depthMask(Re),he=Re)},setFunc:function(Re){if(De&&(Re=tT[Re]),Ie!==Re){switch(Re){case gp:r.depthFunc(r.NEVER);break;case xp:r.depthFunc(r.ALWAYS);break;case _p:r.depthFunc(r.LESS);break;case jo:r.depthFunc(r.LEQUAL);break;case vp:r.depthFunc(r.EQUAL);break;case bp:r.depthFunc(r.GEQUAL);break;case yp:r.depthFunc(r.GREATER);break;case Sp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ie=Re}},setLocked:function(Re){j=Re},setClear:function(Re){Fe!==Re&&(Fe=Re,De&&(Re=1-Re),r.clearDepth(Re))},reset:function(){j=!1,he=null,Ie=null,Fe=null,De=!1}}}function l(){let j=!1,De=null,he=null,Ie=null,Fe=null,Re=null,We=null,it=null,rn=null;return{setTest:function(Lt){j||(Lt?we(r.STENCIL_TEST):Ge(r.STENCIL_TEST))},setMask:function(Lt){De!==Lt&&!j&&(r.stencilMask(Lt),De=Lt)},setFunc:function(Lt,Kn,In){(he!==Lt||Ie!==Kn||Fe!==In)&&(r.stencilFunc(Lt,Kn,In),he=Lt,Ie=Kn,Fe=In)},setOp:function(Lt,Kn,In){(Re!==Lt||We!==Kn||it!==In)&&(r.stencilOp(Lt,Kn,In),Re=Lt,We=Kn,it=In)},setLocked:function(Lt){j=Lt},setClear:function(Lt){rn!==Lt&&(r.clearStencil(Lt),rn=Lt)},reset:function(){j=!1,De=null,he=null,Ie=null,Fe=null,Re=null,We=null,it=null,rn=null}}}const c=new i,u=new s,h=new l,m=new WeakMap,p=new WeakMap;let x={},v={},g={},b=new WeakMap,M=[],A=null,S=!1,y=null,R=null,O=null,U=null,G=null,I=null,B=null,w=new pn(0,0,0),F=0,$=!1,k=null,X=null,te=null,oe=null,V=null;const L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const ce=r.getParameter(r.VERSION);ce.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(ce)[1]),z=W>=1):ce.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),z=W>=2);let ge=null,P={};const Z=r.getParameter(r.SCISSOR_BOX),_e=r.getParameter(r.VIEWPORT),Ae=new Ln().fromArray(Z),Oe=new Ln().fromArray(_e);function ee(j,De,he,Ie){const Fe=new Uint8Array(4),Re=r.createTexture();r.bindTexture(j,Re),r.texParameteri(j,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(j,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<he;We++)j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?r.texImage3D(De,0,r.RGBA,1,1,Ie,0,r.RGBA,r.UNSIGNED_BYTE,Fe):r.texImage2D(De+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Fe);return Re}const Ee={};Ee[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),Ee[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ee[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),h.setClear(0),we(r.DEPTH_TEST),u.setFunc(jo),mn(!1),Kt(L_),we(r.CULL_FACE),Dt(ms);function we(j){x[j]!==!0&&(r.enable(j),x[j]=!0)}function Ge(j){x[j]!==!1&&(r.disable(j),x[j]=!1)}function Ze(j,De){return g[j]!==De?(r.bindFramebuffer(j,De),g[j]=De,j===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=De),j===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=De),!0):!1}function Ke(j,De){let he=M,Ie=!1;if(j){he=b.get(De),he===void 0&&(he=[],b.set(De,he));const Fe=j.textures;if(he.length!==Fe.length||he[0]!==r.COLOR_ATTACHMENT0){for(let Re=0,We=Fe.length;Re<We;Re++)he[Re]=r.COLOR_ATTACHMENT0+Re;he.length=Fe.length,Ie=!0}}else he[0]!==r.BACK&&(he[0]=r.BACK,Ie=!0);Ie&&r.drawBuffers(he)}function At(j){return A!==j?(r.useProgram(j),A=j,!0):!1}const ut={[Dr]:r.FUNC_ADD,[MM]:r.FUNC_SUBTRACT,[TM]:r.FUNC_REVERSE_SUBTRACT};ut[AM]=r.MIN,ut[wM]=r.MAX;const je={[RM]:r.ZERO,[CM]:r.ONE,[NM]:r.SRC_COLOR,[pp]:r.SRC_ALPHA,[PM]:r.SRC_ALPHA_SATURATE,[IM]:r.DST_COLOR,[DM]:r.DST_ALPHA,[OM]:r.ONE_MINUS_SRC_COLOR,[mp]:r.ONE_MINUS_SRC_ALPHA,[UM]:r.ONE_MINUS_DST_COLOR,[LM]:r.ONE_MINUS_DST_ALPHA,[FM]:r.CONSTANT_COLOR,[BM]:r.ONE_MINUS_CONSTANT_COLOR,[zM]:r.CONSTANT_ALPHA,[GM]:r.ONE_MINUS_CONSTANT_ALPHA};function Dt(j,De,he,Ie,Fe,Re,We,it,rn,Lt){if(j===ms){S===!0&&(Ge(r.BLEND),S=!1);return}if(S===!1&&(we(r.BLEND),S=!0),j!==EM){if(j!==y||Lt!==$){if((R!==Dr||G!==Dr)&&(r.blendEquation(r.FUNC_ADD),R=Dr,G=Dr),Lt)switch(j){case Go:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case I_:r.blendFunc(r.ONE,r.ONE);break;case U_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case P_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Jt("WebGLState: Invalid blending: ",j);break}else switch(j){case Go:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case I_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case U_:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case P_:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",j);break}O=null,U=null,I=null,B=null,w.set(0,0,0),F=0,y=j,$=Lt}return}Fe=Fe||De,Re=Re||he,We=We||Ie,(De!==R||Fe!==G)&&(r.blendEquationSeparate(ut[De],ut[Fe]),R=De,G=Fe),(he!==O||Ie!==U||Re!==I||We!==B)&&(r.blendFuncSeparate(je[he],je[Ie],je[Re],je[We]),O=he,U=Ie,I=Re,B=We),(it.equals(w)===!1||rn!==F)&&(r.blendColor(it.r,it.g,it.b,rn),w.copy(it),F=rn),y=j,$=!1}function xt(j,De){j.side===hs?Ge(r.CULL_FACE):we(r.CULL_FACE);let he=j.side===Pi;De&&(he=!he),mn(he),j.blending===Go&&j.transparent===!1?Dt(ms):Dt(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),u.setFunc(j.depthFunc),u.setTest(j.depthTest),u.setMask(j.depthWrite),c.setMask(j.colorWrite);const Ie=j.stencilWrite;h.setTest(Ie),Ie&&(h.setMask(j.stencilWriteMask),h.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),h.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),q(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?we(r.SAMPLE_ALPHA_TO_COVERAGE):Ge(r.SAMPLE_ALPHA_TO_COVERAGE)}function mn(j){k!==j&&(j?r.frontFace(r.CW):r.frontFace(r.CCW),k=j)}function Kt(j){j!==bM?(we(r.CULL_FACE),j!==X&&(j===L_?r.cullFace(r.BACK):j===yM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ge(r.CULL_FACE),X=j}function kt(j){j!==te&&(z&&r.lineWidth(j),te=j)}function q(j,De,he){j?(we(r.POLYGON_OFFSET_FILL),(oe!==De||V!==he)&&(oe=De,V=he,u.getReversed()&&(De=-De),r.polygonOffset(De,he))):Ge(r.POLYGON_OFFSET_FILL)}function yt(j){j?we(r.SCISSOR_TEST):Ge(r.SCISSOR_TEST)}function vt(j){j===void 0&&(j=r.TEXTURE0+L-1),ge!==j&&(r.activeTexture(j),ge=j)}function Et(j,De,he){he===void 0&&(ge===null?he=r.TEXTURE0+L-1:he=ge);let Ie=P[he];Ie===void 0&&(Ie={type:void 0,texture:void 0},P[he]=Ie),(Ie.type!==j||Ie.texture!==De)&&(ge!==he&&(r.activeTexture(he),ge=he),r.bindTexture(j,De||Ee[j]),Ie.type=j,Ie.texture=De)}function ve(){const j=P[ge];j!==void 0&&j.type!==void 0&&(r.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function Vt(){try{r.compressedTexImage2D(...arguments)}catch(j){Jt("WebGLState:",j)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(j){Jt("WebGLState:",j)}}function T(){try{r.texSubImage2D(...arguments)}catch(j){Jt("WebGLState:",j)}}function J(){try{r.texSubImage3D(...arguments)}catch(j){Jt("WebGLState:",j)}}function me(){try{r.compressedTexSubImage2D(...arguments)}catch(j){Jt("WebGLState:",j)}}function Te(){try{r.compressedTexSubImage3D(...arguments)}catch(j){Jt("WebGLState:",j)}}function ye(){try{r.texStorage2D(...arguments)}catch(j){Jt("WebGLState:",j)}}function Ue(){try{r.texStorage3D(...arguments)}catch(j){Jt("WebGLState:",j)}}function fe(){try{r.texImage2D(...arguments)}catch(j){Jt("WebGLState:",j)}}function pe(){try{r.texImage3D(...arguments)}catch(j){Jt("WebGLState:",j)}}function Le(j){return v[j]!==void 0?v[j]:r.getParameter(j)}function ze(j,De){v[j]!==De&&(r.pixelStorei(j,De),v[j]=De)}function Ne(j){Ae.equals(j)===!1&&(r.scissor(j.x,j.y,j.z,j.w),Ae.copy(j))}function Pe(j){Oe.equals(j)===!1&&(r.viewport(j.x,j.y,j.z,j.w),Oe.copy(j))}function rt(j,De){let he=p.get(De);he===void 0&&(he=new WeakMap,p.set(De,he));let Ie=he.get(j);Ie===void 0&&(Ie=r.getUniformBlockIndex(De,j.name),he.set(j,Ie))}function ht(j,De){const Ie=p.get(De).get(j);m.get(De)!==Ie&&(r.uniformBlockBinding(De,Ie,j.__bindingPointIndex),m.set(De,Ie))}function ct(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),x={},v={},ge=null,P={},g={},b=new WeakMap,M=[],A=null,S=!1,y=null,R=null,O=null,U=null,G=null,I=null,B=null,w=new pn(0,0,0),F=0,$=!1,k=null,X=null,te=null,oe=null,V=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Oe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),h.reset()}return{buffers:{color:c,depth:u,stencil:h},enable:we,disable:Ge,bindFramebuffer:Ze,drawBuffers:Ke,useProgram:At,setBlending:Dt,setMaterial:xt,setFlipSided:mn,setCullFace:Kt,setLineWidth:kt,setPolygonOffset:q,setScissorTest:yt,activeTexture:vt,bindTexture:Et,unbindTexture:ve,compressedTexImage2D:Vt,compressedTexImage3D:D,texImage2D:fe,texImage3D:pe,pixelStorei:ze,getParameter:Le,updateUBOMapping:rt,uniformBlockBinding:ht,texStorage2D:ye,texStorage3D:Ue,texSubImage2D:T,texSubImage3D:J,compressedTexSubImage2D:me,compressedTexSubImage3D:Te,scissor:Ne,viewport:Pe,reset:ct}}function AC(r,e,i,s,l,c,u){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ot,x=new WeakMap,v=new Set;let g;const b=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(D,T){return M?new OffscreenCanvas(D,T):ic("canvas")}function S(D,T,J){let me=1;const Te=Vt(D);if((Te.width>J||Te.height>J)&&(me=J/Math.max(Te.width,Te.height)),me<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ye=Math.floor(me*Te.width),Ue=Math.floor(me*Te.height);g===void 0&&(g=A(ye,Ue));const fe=T?A(ye,Ue):g;return fe.width=ye,fe.height=Ue,fe.getContext("2d").drawImage(D,0,0,ye,Ue),mt("WebGLRenderer: Texture has been resized from ("+Te.width+"x"+Te.height+") to ("+ye+"x"+Ue+")."),fe}else return"data"in D&&mt("WebGLRenderer: Image in DataTexture is too big ("+Te.width+"x"+Te.height+")."),D;return D}function y(D){return D.generateMipmaps}function R(D){r.generateMipmap(D)}function O(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(D,T,J,me,Te,ye=!1){if(D!==null){if(r[D]!==void 0)return r[D];mt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ue;me&&(Ue=e.get("EXT_texture_norm16"),Ue||mt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let fe=T;if(T===r.RED&&(J===r.FLOAT&&(fe=r.R32F),J===r.HALF_FLOAT&&(fe=r.R16F),J===r.UNSIGNED_BYTE&&(fe=r.R8),J===r.UNSIGNED_SHORT&&Ue&&(fe=Ue.R16_EXT),J===r.SHORT&&Ue&&(fe=Ue.R16_SNORM_EXT)),T===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.R8UI),J===r.UNSIGNED_SHORT&&(fe=r.R16UI),J===r.UNSIGNED_INT&&(fe=r.R32UI),J===r.BYTE&&(fe=r.R8I),J===r.SHORT&&(fe=r.R16I),J===r.INT&&(fe=r.R32I)),T===r.RG&&(J===r.FLOAT&&(fe=r.RG32F),J===r.HALF_FLOAT&&(fe=r.RG16F),J===r.UNSIGNED_BYTE&&(fe=r.RG8),J===r.UNSIGNED_SHORT&&Ue&&(fe=Ue.RG16_EXT),J===r.SHORT&&Ue&&(fe=Ue.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RG8UI),J===r.UNSIGNED_SHORT&&(fe=r.RG16UI),J===r.UNSIGNED_INT&&(fe=r.RG32UI),J===r.BYTE&&(fe=r.RG8I),J===r.SHORT&&(fe=r.RG16I),J===r.INT&&(fe=r.RG32I)),T===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RGB8UI),J===r.UNSIGNED_SHORT&&(fe=r.RGB16UI),J===r.UNSIGNED_INT&&(fe=r.RGB32UI),J===r.BYTE&&(fe=r.RGB8I),J===r.SHORT&&(fe=r.RGB16I),J===r.INT&&(fe=r.RGB32I)),T===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(fe=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(fe=r.RGBA16UI),J===r.UNSIGNED_INT&&(fe=r.RGBA32UI),J===r.BYTE&&(fe=r.RGBA8I),J===r.SHORT&&(fe=r.RGBA16I),J===r.INT&&(fe=r.RGBA32I)),T===r.RGB&&(J===r.UNSIGNED_SHORT&&Ue&&(fe=Ue.RGB16_EXT),J===r.SHORT&&Ue&&(fe=Ue.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(fe=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(fe=r.R11F_G11F_B10F)),T===r.RGBA){const pe=ye?af:$t.getTransfer(Te);J===r.FLOAT&&(fe=r.RGBA32F),J===r.HALF_FLOAT&&(fe=r.RGBA16F),J===r.UNSIGNED_BYTE&&(fe=pe===cn?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Ue&&(fe=Ue.RGBA16_EXT),J===r.SHORT&&Ue&&(fe=Ue.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(fe=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(fe=r.RGB5_A1)}return(fe===r.R16F||fe===r.R32F||fe===r.RG16F||fe===r.RG32F||fe===r.RGBA16F||fe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function G(D,T){let J;return D?T===null||T===Ha||T===nc?J=r.DEPTH24_STENCIL8:T===Pa?J=r.DEPTH32F_STENCIL8:T===tc&&(J=r.DEPTH24_STENCIL8,mt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ha||T===nc?J=r.DEPTH_COMPONENT24:T===Pa?J=r.DEPTH_COMPONENT32F:T===tc&&(J=r.DEPTH_COMPONENT16),J}function I(D,T){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==oi&&D.minFilter!==mi?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function B(D){const T=D.target;T.removeEventListener("dispose",B),F(T),T.isVideoTexture&&x.delete(T),T.isHTMLTexture&&v.delete(T)}function w(D){const T=D.target;T.removeEventListener("dispose",w),k(T)}function F(D){const T=s.get(D);if(T.__webglInit===void 0)return;const J=D.source,me=b.get(J);if(me){const Te=me[T.__cacheKey];Te.usedTimes--,Te.usedTimes===0&&$(D),Object.keys(me).length===0&&b.delete(J)}s.remove(D)}function $(D){const T=s.get(D);r.deleteTexture(T.__webglTexture);const J=D.source,me=b.get(J);delete me[T.__cacheKey],u.memory.textures--}function k(D){const T=s.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),s.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(T.__webglFramebuffer[me]))for(let Te=0;Te<T.__webglFramebuffer[me].length;Te++)r.deleteFramebuffer(T.__webglFramebuffer[me][Te]);else r.deleteFramebuffer(T.__webglFramebuffer[me]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[me])}else{if(Array.isArray(T.__webglFramebuffer))for(let me=0;me<T.__webglFramebuffer.length;me++)r.deleteFramebuffer(T.__webglFramebuffer[me]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let me=0;me<T.__webglColorRenderbuffer.length;me++)T.__webglColorRenderbuffer[me]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[me]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=D.textures;for(let me=0,Te=J.length;me<Te;me++){const ye=s.get(J[me]);ye.__webglTexture&&(r.deleteTexture(ye.__webglTexture),u.memory.textures--),s.remove(J[me])}s.remove(D)}let X=0;function te(){X=0}function oe(){return X}function V(D){X=D}function L(){const D=X;return D>=l.maxTextures&&mt("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+l.maxTextures),X+=1,D}function z(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function W(D,T){const J=s.get(D);if(D.isVideoTexture&&Et(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&J.__version!==D.version){const me=D.image;if(me===null)mt("WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)mt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(J,D,T);return}}else D.isExternalTexture&&(J.__webglTexture=D.sourceTexture?D.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+T)}function ce(D,T){const J=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){Ge(J,D,T);return}else D.isExternalTexture&&(J.__webglTexture=D.sourceTexture?D.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+T)}function ge(D,T){const J=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){Ge(J,D,T);return}i.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+T)}function P(D,T){const J=s.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&J.__version!==D.version){Ze(J,D,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+T)}const Z={[Ep]:r.REPEAT,[ps]:r.CLAMP_TO_EDGE,[Mp]:r.MIRRORED_REPEAT},_e={[oi]:r.NEAREST,[VM]:r.NEAREST_MIPMAP_NEAREST,[gu]:r.NEAREST_MIPMAP_LINEAR,[mi]:r.LINEAR,[Nh]:r.LINEAR_MIPMAP_NEAREST,[Ir]:r.LINEAR_MIPMAP_LINEAR},Ae={[YM]:r.NEVER,[ZM]:r.ALWAYS,[WM]:r.LESS,[xm]:r.LEQUAL,[qM]:r.EQUAL,[_m]:r.GEQUAL,[$M]:r.GREATER,[KM]:r.NOTEQUAL};function Oe(D,T){if(T.type===Pa&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===mi||T.magFilter===Nh||T.magFilter===gu||T.magFilter===Ir||T.minFilter===mi||T.minFilter===Nh||T.minFilter===gu||T.minFilter===Ir)&&mt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,Z[T.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,Z[T.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,Z[T.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,_e[T.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,_e[T.minFilter]),T.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,Ae[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===oi||T.minFilter!==gu&&T.minFilter!==Ir||T.type===Pa&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function ee(D,T){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",B));const me=T.source;let Te=b.get(me);Te===void 0&&(Te={},b.set(me,Te));const ye=z(T);if(ye!==D.__cacheKey){Te[ye]===void 0&&(Te[ye]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,J=!0),Te[ye].usedTimes++;const Ue=Te[D.__cacheKey];Ue!==void 0&&(Te[D.__cacheKey].usedTimes--,Ue.usedTimes===0&&$(T)),D.__cacheKey=ye,D.__webglTexture=Te[ye].texture}return J}function Ee(D,T,J){return Math.floor(Math.floor(D/J)/T)}function we(D,T,J,me){const ye=D.updateRanges;if(ye.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,J,me,T.data);else{ye.sort((ze,Ne)=>ze.start-Ne.start);let Ue=0;for(let ze=1;ze<ye.length;ze++){const Ne=ye[Ue],Pe=ye[ze],rt=Ne.start+Ne.count,ht=Ee(Pe.start,T.width,4),ct=Ee(Ne.start,T.width,4);Pe.start<=rt+1&&ht===ct&&Ee(Pe.start+Pe.count-1,T.width,4)===ht?Ne.count=Math.max(Ne.count,Pe.start+Pe.count-Ne.start):(++Ue,ye[Ue]=Pe)}ye.length=Ue+1;const fe=i.getParameter(r.UNPACK_ROW_LENGTH),pe=i.getParameter(r.UNPACK_SKIP_PIXELS),Le=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let ze=0,Ne=ye.length;ze<Ne;ze++){const Pe=ye[ze],rt=Math.floor(Pe.start/4),ht=Math.ceil(Pe.count/4),ct=rt%T.width,j=Math.floor(rt/T.width),De=ht,he=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ct),i.pixelStorei(r.UNPACK_SKIP_ROWS,j),i.texSubImage2D(r.TEXTURE_2D,0,ct,j,De,he,J,me,T.data)}D.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,fe),i.pixelStorei(r.UNPACK_SKIP_PIXELS,pe),i.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function Ge(D,T,J){let me=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(me=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(me=r.TEXTURE_3D);const Te=ee(D,T),ye=T.source;i.bindTexture(me,D.__webglTexture,r.TEXTURE0+J);const Ue=s.get(ye);if(ye.version!==Ue.__version||Te===!0){if(i.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const he=$t.getPrimaries($t.workingColorSpace),Ie=T.colorSpace===Qs?null:$t.getPrimaries(T.colorSpace),Fe=T.colorSpace===Qs||he===Ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let pe=S(T.image,!1,l.maxTextureSize);pe=ve(T,pe);const Le=c.convert(T.format,T.colorSpace),ze=c.convert(T.type);let Ne=U(T.internalFormat,Le,ze,T.normalized,T.colorSpace,T.isVideoTexture);Oe(me,T);let Pe;const rt=T.mipmaps,ht=T.isVideoTexture!==!0,ct=Ue.__version===void 0||Te===!0,j=ye.dataReady,De=I(T,pe);if(T.isDepthTexture)Ne=G(T.format===Ur,T.type),ct&&(ht?i.texStorage2D(r.TEXTURE_2D,1,Ne,pe.width,pe.height):i.texImage2D(r.TEXTURE_2D,0,Ne,pe.width,pe.height,0,Le,ze,null));else if(T.isDataTexture)if(rt.length>0){ht&&ct&&i.texStorage2D(r.TEXTURE_2D,De,Ne,rt[0].width,rt[0].height);for(let he=0,Ie=rt.length;he<Ie;he++)Pe=rt[he],ht?j&&i.texSubImage2D(r.TEXTURE_2D,he,0,0,Pe.width,Pe.height,Le,ze,Pe.data):i.texImage2D(r.TEXTURE_2D,he,Ne,Pe.width,Pe.height,0,Le,ze,Pe.data);T.generateMipmaps=!1}else ht?(ct&&i.texStorage2D(r.TEXTURE_2D,De,Ne,pe.width,pe.height),j&&we(T,pe,Le,ze)):i.texImage2D(r.TEXTURE_2D,0,Ne,pe.width,pe.height,0,Le,ze,pe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ht&&ct&&i.texStorage3D(r.TEXTURE_2D_ARRAY,De,Ne,rt[0].width,rt[0].height,pe.depth);for(let he=0,Ie=rt.length;he<Ie;he++)if(Pe=rt[he],T.format!==Aa)if(Le!==null)if(ht){if(j)if(T.layerUpdates.size>0){const Fe=cv(Pe.width,Pe.height,T.format,T.type);for(const Re of T.layerUpdates){const We=Pe.data.subarray(Re*Fe/Pe.data.BYTES_PER_ELEMENT,(Re+1)*Fe/Pe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,Re,Pe.width,Pe.height,1,Le,We)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,0,Pe.width,Pe.height,pe.depth,Le,Pe.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,he,Ne,Pe.width,Pe.height,pe.depth,0,Pe.data,0,0);else mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ht?j&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,he,0,0,0,Pe.width,Pe.height,pe.depth,Le,ze,Pe.data):i.texImage3D(r.TEXTURE_2D_ARRAY,he,Ne,Pe.width,Pe.height,pe.depth,0,Le,ze,Pe.data)}else{ht&&ct&&i.texStorage2D(r.TEXTURE_2D,De,Ne,rt[0].width,rt[0].height);for(let he=0,Ie=rt.length;he<Ie;he++)Pe=rt[he],T.format!==Aa?Le!==null?ht?j&&i.compressedTexSubImage2D(r.TEXTURE_2D,he,0,0,Pe.width,Pe.height,Le,Pe.data):i.compressedTexImage2D(r.TEXTURE_2D,he,Ne,Pe.width,Pe.height,0,Pe.data):mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ht?j&&i.texSubImage2D(r.TEXTURE_2D,he,0,0,Pe.width,Pe.height,Le,ze,Pe.data):i.texImage2D(r.TEXTURE_2D,he,Ne,Pe.width,Pe.height,0,Le,ze,Pe.data)}else if(T.isDataArrayTexture)if(ht){if(ct&&i.texStorage3D(r.TEXTURE_2D_ARRAY,De,Ne,pe.width,pe.height,pe.depth),j)if(T.layerUpdates.size>0){const he=cv(pe.width,pe.height,T.format,T.type);for(const Ie of T.layerUpdates){const Fe=pe.data.subarray(Ie*he/pe.data.BYTES_PER_ELEMENT,(Ie+1)*he/pe.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ie,pe.width,pe.height,1,Le,ze,Fe)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Le,ze,pe.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ne,pe.width,pe.height,pe.depth,0,Le,ze,pe.data);else if(T.isData3DTexture)ht?(ct&&i.texStorage3D(r.TEXTURE_3D,De,Ne,pe.width,pe.height,pe.depth),j&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Le,ze,pe.data)):i.texImage3D(r.TEXTURE_3D,0,Ne,pe.width,pe.height,pe.depth,0,Le,ze,pe.data);else if(T.isFramebufferTexture){if(ct)if(ht)i.texStorage2D(r.TEXTURE_2D,De,Ne,pe.width,pe.height);else{let he=pe.width,Ie=pe.height;for(let Fe=0;Fe<De;Fe++)i.texImage2D(r.TEXTURE_2D,Fe,Ne,he,Ie,0,Le,ze,null),he>>=1,Ie>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const he=r.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),pe.parentNode!==he){he.appendChild(pe),v.add(T),he.onpaint=it=>{const rn=it.changedElements;for(const Lt of v)rn.includes(Lt.image)&&(Lt.needsUpdate=!0)},he.requestPaint();return}const Ie=0,Fe=r.RGBA,Re=r.RGBA,We=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Ie,Fe,Re,We,pe),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(rt.length>0){if(ht&&ct){const he=Vt(rt[0]);i.texStorage2D(r.TEXTURE_2D,De,Ne,he.width,he.height)}for(let he=0,Ie=rt.length;he<Ie;he++)Pe=rt[he],ht?j&&i.texSubImage2D(r.TEXTURE_2D,he,0,0,Le,ze,Pe):i.texImage2D(r.TEXTURE_2D,he,Ne,Le,ze,Pe);T.generateMipmaps=!1}else if(ht){if(ct){const he=Vt(pe);i.texStorage2D(r.TEXTURE_2D,De,Ne,he.width,he.height)}j&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Le,ze,pe)}else i.texImage2D(r.TEXTURE_2D,0,Ne,Le,ze,pe);y(T)&&R(me),Ue.__version=ye.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function Ze(D,T,J){if(T.image.length!==6)return;const me=ee(D,T),Te=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+J);const ye=s.get(Te);if(Te.version!==ye.__version||me===!0){i.activeTexture(r.TEXTURE0+J);const Ue=$t.getPrimaries($t.workingColorSpace),fe=T.colorSpace===Qs?null:$t.getPrimaries(T.colorSpace),pe=T.colorSpace===Qs||Ue===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Le=T.isCompressedTexture||T.image[0].isCompressedTexture,ze=T.image[0]&&T.image[0].isDataTexture,Ne=[];for(let Re=0;Re<6;Re++)!Le&&!ze?Ne[Re]=S(T.image[Re],!0,l.maxCubemapSize):Ne[Re]=ze?T.image[Re].image:T.image[Re],Ne[Re]=ve(T,Ne[Re]);const Pe=Ne[0],rt=c.convert(T.format,T.colorSpace),ht=c.convert(T.type),ct=U(T.internalFormat,rt,ht,T.normalized,T.colorSpace),j=T.isVideoTexture!==!0,De=ye.__version===void 0||me===!0,he=Te.dataReady;let Ie=I(T,Pe);Oe(r.TEXTURE_CUBE_MAP,T);let Fe;if(Le){j&&De&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ie,ct,Pe.width,Pe.height);for(let Re=0;Re<6;Re++){Fe=Ne[Re].mipmaps;for(let We=0;We<Fe.length;We++){const it=Fe[We];T.format!==Aa?rt!==null?j?he&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We,0,0,it.width,it.height,rt,it.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We,ct,it.width,it.height,0,it.data):mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?he&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We,0,0,it.width,it.height,rt,ht,it.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We,ct,it.width,it.height,0,rt,ht,it.data)}}}else{if(Fe=T.mipmaps,j&&De){Fe.length>0&&Ie++;const Re=Vt(Ne[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ie,ct,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(ze){j?he&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ne[Re].width,Ne[Re].height,rt,ht,Ne[Re].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,ct,Ne[Re].width,Ne[Re].height,0,rt,ht,Ne[Re].data);for(let We=0;We<Fe.length;We++){const rn=Fe[We].image[Re].image;j?he&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We+1,0,0,rn.width,rn.height,rt,ht,rn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We+1,ct,rn.width,rn.height,0,rt,ht,rn.data)}}else{j?he&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,rt,ht,Ne[Re]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,ct,rt,ht,Ne[Re]);for(let We=0;We<Fe.length;We++){const it=Fe[We];j?he&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We+1,0,0,rt,ht,it.image[Re]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,We+1,ct,rt,ht,it.image[Re])}}}y(T)&&R(r.TEXTURE_CUBE_MAP),ye.__version=Te.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function Ke(D,T,J,me,Te,ye){const Ue=c.convert(J.format,J.colorSpace),fe=c.convert(J.type),pe=U(J.internalFormat,Ue,fe,J.normalized,J.colorSpace),Le=s.get(T),ze=s.get(J);if(ze.__renderTarget=T,!Le.__hasExternalTextures){const Ne=Math.max(1,T.width>>ye),Pe=Math.max(1,T.height>>ye);Te===r.TEXTURE_3D||Te===r.TEXTURE_2D_ARRAY?i.texImage3D(Te,ye,pe,Ne,Pe,T.depth,0,Ue,fe,null):i.texImage2D(Te,ye,pe,Ne,Pe,0,Ue,fe,null)}i.bindFramebuffer(r.FRAMEBUFFER,D),vt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,me,Te,ze.__webglTexture,0,yt(T)):(Te===r.TEXTURE_2D||Te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,me,Te,ze.__webglTexture,ye),i.bindFramebuffer(r.FRAMEBUFFER,null)}function At(D,T,J){if(r.bindRenderbuffer(r.RENDERBUFFER,D),T.depthBuffer){const me=T.depthTexture,Te=me&&me.isDepthTexture?me.type:null,ye=G(T.stencilBuffer,Te),Ue=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;vt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,yt(T),ye,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,yt(T),ye,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ye,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ue,r.RENDERBUFFER,D)}else{const me=T.textures;for(let Te=0;Te<me.length;Te++){const ye=me[Te],Ue=c.convert(ye.format,ye.colorSpace),fe=c.convert(ye.type),pe=U(ye.internalFormat,Ue,fe,ye.normalized,ye.colorSpace);vt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,yt(T),pe,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,yt(T),pe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,pe,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ut(D,T,J){const me=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Te=s.get(T.depthTexture);if(Te.__renderTarget=T,(!Te.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),me){if(Te.__webglInit===void 0&&(Te.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),Te.__webglTexture===void 0){Te.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Te.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T.depthTexture);const Le=c.convert(T.depthTexture.format),ze=c.convert(T.depthTexture.type);let Ne;T.depthTexture.format===_s?Ne=r.DEPTH_COMPONENT24:T.depthTexture.format===Ur&&(Ne=r.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Ne,T.width,T.height,0,Le,ze,null)}}else W(T.depthTexture,0);const ye=Te.__webglTexture,Ue=yt(T),fe=me?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,pe=T.depthTexture.format===Ur?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===_s)vt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,fe,ye,0,Ue):r.framebufferTexture2D(r.FRAMEBUFFER,pe,fe,ye,0);else if(T.depthTexture.format===Ur)vt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,fe,ye,0,Ue):r.framebufferTexture2D(r.FRAMEBUFFER,pe,fe,ye,0);else throw new Error("Unknown depthTexture format")}function je(D){const T=s.get(D),J=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const me=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),me){const Te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,me.removeEventListener("dispose",Te)};me.addEventListener("dispose",Te),T.__depthDisposeCallback=Te}T.__boundDepthTexture=me}if(D.depthTexture&&!T.__autoAllocateDepthBuffer)if(J)for(let me=0;me<6;me++)ut(T.__webglFramebuffer[me],D,me);else{const me=D.texture.mipmaps;me&&me.length>0?ut(T.__webglFramebuffer[0],D,0):ut(T.__webglFramebuffer,D,0)}else if(J){T.__webglDepthbuffer=[];for(let me=0;me<6;me++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[me]),T.__webglDepthbuffer[me]===void 0)T.__webglDepthbuffer[me]=r.createRenderbuffer(),At(T.__webglDepthbuffer[me],D,!1);else{const Te=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=T.__webglDepthbuffer[me];r.bindRenderbuffer(r.RENDERBUFFER,ye),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,ye)}}else{const me=D.texture.mipmaps;if(me&&me.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),At(T.__webglDepthbuffer,D,!1);else{const Te=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ye),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,ye)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Dt(D,T,J){const me=s.get(D);T!==void 0&&Ke(me.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&je(D)}function xt(D){const T=D.texture,J=s.get(D),me=s.get(T);D.addEventListener("dispose",w);const Te=D.textures,ye=D.isWebGLCubeRenderTarget===!0,Ue=Te.length>1;if(Ue||(me.__webglTexture===void 0&&(me.__webglTexture=r.createTexture()),me.__version=T.version,u.memory.textures++),ye){J.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[fe]=[];for(let pe=0;pe<T.mipmaps.length;pe++)J.__webglFramebuffer[fe][pe]=r.createFramebuffer()}else J.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let fe=0;fe<T.mipmaps.length;fe++)J.__webglFramebuffer[fe]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Ue)for(let fe=0,pe=Te.length;fe<pe;fe++){const Le=s.get(Te[fe]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),u.memory.textures++)}if(D.samples>0&&vt(D)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let fe=0;fe<Te.length;fe++){const pe=Te[fe];J.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[fe]);const Le=c.convert(pe.format,pe.colorSpace),ze=c.convert(pe.type),Ne=U(pe.internalFormat,Le,ze,pe.normalized,pe.colorSpace,D.isXRRenderTarget===!0),Pe=yt(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,Pe,Ne,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,J.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),At(J.__webglDepthRenderbuffer,D,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ye){i.bindTexture(r.TEXTURE_CUBE_MAP,me.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T);for(let fe=0;fe<6;fe++)if(T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)Ke(J.__webglFramebuffer[fe][pe],D,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,pe);else Ke(J.__webglFramebuffer[fe],D,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);y(T)&&R(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ue){for(let fe=0,pe=Te.length;fe<pe;fe++){const Le=Te[fe],ze=s.get(Le);let Ne=r.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ne=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ne,ze.__webglTexture),Oe(Ne,Le),Ke(J.__webglFramebuffer,D,Le,r.COLOR_ATTACHMENT0+fe,Ne,0),y(Le)&&R(Ne)}i.unbindTexture()}else{let fe=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(fe=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(fe,me.__webglTexture),Oe(fe,T),T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)Ke(J.__webglFramebuffer[pe],D,T,r.COLOR_ATTACHMENT0,fe,pe);else Ke(J.__webglFramebuffer,D,T,r.COLOR_ATTACHMENT0,fe,0);y(T)&&R(fe),i.unbindTexture()}D.depthBuffer&&je(D)}function mn(D){const T=D.textures;for(let J=0,me=T.length;J<me;J++){const Te=T[J];if(y(Te)){const ye=O(D),Ue=s.get(Te).__webglTexture;i.bindTexture(ye,Ue),R(ye),i.unbindTexture()}}}const Kt=[],kt=[];function q(D){if(D.samples>0){if(vt(D)===!1){const T=D.textures,J=D.width,me=D.height;let Te=r.COLOR_BUFFER_BIT;const ye=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=s.get(D),fe=T.length>1;if(fe)for(let Le=0;Le<T.length;Le++)i.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const pe=D.texture.mipmaps;pe&&pe.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Le=0;Le<T.length;Le++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Te|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Te|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ue.__webglColorRenderbuffer[Le]);const ze=s.get(T[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,J,me,0,0,J,me,Te,r.NEAREST),m===!0&&(Kt.length=0,kt.length=0,Kt.push(r.COLOR_ATTACHMENT0+Le),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Kt.push(ye),kt.push(ye),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,kt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Kt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let Le=0;Le<T.length;Le++){i.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,Ue.__webglColorRenderbuffer[Le]);const ze=s.get(T[Le]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,ze,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&m){const T=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function yt(D){return Math.min(l.maxSamples,D.samples)}function vt(D){const T=s.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Et(D){const T=u.render.frame;x.get(D)!==T&&(x.set(D,T),D.update())}function ve(D,T){const J=D.colorSpace,me=D.format,Te=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==nf&&J!==Qs&&($t.getTransfer(J)===cn?(me!==Aa||Te!==ma)&&mt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",J)),T}function Vt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(p.width=D.naturalWidth||D.width,p.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(p.width=D.displayWidth,p.height=D.displayHeight):(p.width=D.width,p.height=D.height),p}this.allocateTextureUnit=L,this.resetTextureUnits=te,this.getTextureUnits=oe,this.setTextureUnits=V,this.setTexture2D=W,this.setTexture2DArray=ce,this.setTexture3D=ge,this.setTextureCube=P,this.rebindTextures=Dt,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=mn,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Ke,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function wC(r,e){function i(s,l=Qs){let c;const u=$t.getTransfer(l);if(s===ma)return r.UNSIGNED_BYTE;if(s===dm)return r.UNSIGNED_SHORT_4_4_4_4;if(s===hm)return r.UNSIGNED_SHORT_5_5_5_1;if(s===lb)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===cb)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===rb)return r.BYTE;if(s===ob)return r.SHORT;if(s===tc)return r.UNSIGNED_SHORT;if(s===fm)return r.INT;if(s===Ha)return r.UNSIGNED_INT;if(s===Pa)return r.FLOAT;if(s===xs)return r.HALF_FLOAT;if(s===ub)return r.ALPHA;if(s===fb)return r.RGB;if(s===Aa)return r.RGBA;if(s===_s)return r.DEPTH_COMPONENT;if(s===Ur)return r.DEPTH_STENCIL;if(s===db)return r.RED;if(s===pm)return r.RED_INTEGER;if(s===zr)return r.RG;if(s===mm)return r.RG_INTEGER;if(s===gm)return r.RGBA_INTEGER;if(s===ju||s===Xu||s===Yu||s===Wu)if(u===cn)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===ju)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Yu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Wu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===ju)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Xu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Yu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Wu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Tp||s===Ap||s===wp||s===Rp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Tp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ap)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===wp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Cp||s===Np||s===Op||s===Dp||s===Lp||s===ef||s===Ip)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Cp||s===Np)return u===cn?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Op)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Dp)return c.COMPRESSED_R11_EAC;if(s===Lp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===ef)return c.COMPRESSED_RG11_EAC;if(s===Ip)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Up||s===Pp||s===Fp||s===Bp||s===zp||s===Gp||s===Hp||s===kp||s===Vp||s===jp||s===Xp||s===Yp||s===Wp||s===qp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Up)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Pp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Fp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Bp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===zp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Gp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Hp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===kp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Vp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===jp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Xp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Yp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Wp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===qp)return u===cn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===$p||s===Kp||s===Zp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===$p)return u===cn?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Kp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Zp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Qp||s===Jp||s===tf||s===em)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Qp)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Jp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===tf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===em)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===nc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const RC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CC=`
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

}`;class NC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new Sb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Va({vertexShader:RC,fragmentShader:CC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ka(new cf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OC extends ir{constructor(e,i){super();const s=this;let l=null,c=1,u=null,h="local-floor",m=1,p=null,x=null,v=null,g=null,b=null,M=null;const A=typeof XRWebGLBinding<"u",S=new NC,y={},R=i.getContextAttributes();let O=null,U=null;const G=[],I=[],B=new Ot;let w=null;const F=new pa;F.viewport=new Ln;const $=new pa;$.viewport=new Ln;const k=[F,$],X=new GT;let te=null,oe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Ee=G[ee];return Ee===void 0&&(Ee=new Fh,G[ee]=Ee),Ee.getTargetRaySpace()},this.getControllerGrip=function(ee){let Ee=G[ee];return Ee===void 0&&(Ee=new Fh,G[ee]=Ee),Ee.getGripSpace()},this.getHand=function(ee){let Ee=G[ee];return Ee===void 0&&(Ee=new Fh,G[ee]=Ee),Ee.getHandSpace()};function V(ee){const Ee=I.indexOf(ee.inputSource);if(Ee===-1)return;const we=G[Ee];we!==void 0&&(we.update(ee.inputSource,ee.frame,p||u),we.dispatchEvent({type:ee.type,data:ee.inputSource}))}function L(){l.removeEventListener("select",V),l.removeEventListener("selectstart",V),l.removeEventListener("selectend",V),l.removeEventListener("squeeze",V),l.removeEventListener("squeezestart",V),l.removeEventListener("squeezeend",V),l.removeEventListener("end",L),l.removeEventListener("inputsourceschange",z);for(let ee=0;ee<G.length;ee++){const Ee=I[ee];Ee!==null&&(I[ee]=null,G[ee].disconnect(Ee))}te=null,oe=null,S.reset();for(const ee in y)delete y[ee];e.setRenderTarget(O),b=null,g=null,v=null,l=null,U=null,Oe.stop(),s.isPresenting=!1,e.setPixelRatio(w),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){c=ee,s.isPresenting===!0&&mt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){h=ee,s.isPresenting===!0&&mt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(ee){p=ee},this.getBaseLayer=function(){return g!==null?g:b},this.getBinding=function(){return v===null&&A&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(ee){if(l=ee,l!==null){if(O=e.getRenderTarget(),l.addEventListener("select",V),l.addEventListener("selectstart",V),l.addEventListener("selectend",V),l.addEventListener("squeeze",V),l.addEventListener("squeezestart",V),l.addEventListener("squeezeend",V),l.addEventListener("end",L),l.addEventListener("inputsourceschange",z),R.xrCompatible!==!0&&await i.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(B),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Ge=null,Ze=null;R.depth&&(Ze=R.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,we=R.stencil?Ur:_s,Ge=R.stencil?nc:Ha);const Ke={colorFormat:i.RGBA8,depthFormat:Ze,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(Ke),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),U=new za(g.textureWidth,g.textureHeight,{format:Aa,type:ma,depthTexture:new Yo(g.textureWidth,g.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const we={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,we),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),U=new za(b.framebufferWidth,b.framebufferHeight,{format:Aa,type:ma,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await l.requestReferenceSpace(h),Oe.setContext(l),Oe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function z(ee){for(let Ee=0;Ee<ee.removed.length;Ee++){const we=ee.removed[Ee],Ge=I.indexOf(we);Ge>=0&&(I[Ge]=null,G[Ge].disconnect(we))}for(let Ee=0;Ee<ee.added.length;Ee++){const we=ee.added[Ee];let Ge=I.indexOf(we);if(Ge===-1){for(let Ke=0;Ke<G.length;Ke++)if(Ke>=I.length){I.push(we),Ge=Ke;break}else if(I[Ke]===null){I[Ke]=we,Ge=Ke;break}if(Ge===-1)break}const Ze=G[Ge];Ze&&Ze.connect(we)}}const W=new ae,ce=new ae;function ge(ee,Ee,we){W.setFromMatrixPosition(Ee.matrixWorld),ce.setFromMatrixPosition(we.matrixWorld);const Ge=W.distanceTo(ce),Ze=Ee.projectionMatrix.elements,Ke=we.projectionMatrix.elements,At=Ze[14]/(Ze[10]-1),ut=Ze[14]/(Ze[10]+1),je=(Ze[9]+1)/Ze[5],Dt=(Ze[9]-1)/Ze[5],xt=(Ze[8]-1)/Ze[0],mn=(Ke[8]+1)/Ke[0],Kt=At*xt,kt=At*mn,q=Ge/(-xt+mn),yt=q*-xt;if(Ee.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(yt),ee.translateZ(q),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),Ze[10]===-1)ee.projectionMatrix.copy(Ee.projectionMatrix),ee.projectionMatrixInverse.copy(Ee.projectionMatrixInverse);else{const vt=At+q,Et=ut+q,ve=Kt-yt,Vt=kt+(Ge-yt),D=je*ut/Et*vt,T=Dt*ut/Et*vt;ee.projectionMatrix.makePerspective(ve,Vt,D,T,vt,Et),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function P(ee,Ee){Ee===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Ee.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(l===null)return;let Ee=ee.near,we=ee.far;S.texture!==null&&(S.depthNear>0&&(Ee=S.depthNear),S.depthFar>0&&(we=S.depthFar)),X.near=$.near=F.near=Ee,X.far=$.far=F.far=we,(te!==X.near||oe!==X.far)&&(l.updateRenderState({depthNear:X.near,depthFar:X.far}),te=X.near,oe=X.far),X.layers.mask=ee.layers.mask|6,F.layers.mask=X.layers.mask&-5,$.layers.mask=X.layers.mask&-3;const Ge=ee.parent,Ze=X.cameras;P(X,Ge);for(let Ke=0;Ke<Ze.length;Ke++)P(Ze[Ke],Ge);Ze.length===2?ge(X,F,$):X.projectionMatrix.copy(F.projectionMatrix),Z(ee,X,Ge)};function Z(ee,Ee,we){we===null?ee.matrix.copy(Ee.matrixWorld):(ee.matrix.copy(we.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Ee.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Ee.projectionMatrix),ee.projectionMatrixInverse.copy(Ee.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=nm*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(g===null&&b===null))return m},this.setFoveation=function(ee){m=ee,g!==null&&(g.fixedFoveation=ee),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=ee)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(X)},this.getCameraTexture=function(ee){return y[ee]};let _e=null;function Ae(ee,Ee){if(x=Ee.getViewerPose(p||u),M=Ee,x!==null){const we=x.views;b!==null&&(e.setRenderTargetFramebuffer(U,b.framebuffer),e.setRenderTarget(U));let Ge=!1;we.length!==X.cameras.length&&(X.cameras.length=0,Ge=!0);for(let ut=0;ut<we.length;ut++){const je=we[ut];let Dt=null;if(b!==null)Dt=b.getViewport(je);else{const mn=v.getViewSubImage(g,je);Dt=mn.viewport,ut===0&&(e.setRenderTargetTextures(U,mn.colorTexture,mn.depthStencilTexture),e.setRenderTarget(U))}let xt=k[ut];xt===void 0&&(xt=new pa,xt.layers.enable(ut),xt.viewport=new Ln,k[ut]=xt),xt.matrix.fromArray(je.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(je.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),ut===0&&(X.matrix.copy(xt.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ge===!0&&X.cameras.push(xt)}const Ze=l.enabledFeatures;if(Ze&&Ze.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){v=s.getBinding();const ut=v.getDepthInformation(we[0]);ut&&ut.isValid&&ut.texture&&S.init(ut,l.renderState)}if(Ze&&Ze.includes("camera-access")&&A){e.state.unbindTexture(),v=s.getBinding();for(let ut=0;ut<we.length;ut++){const je=we[ut].camera;if(je){let Dt=y[je];Dt||(Dt=new Sb,y[je]=Dt);const xt=v.getCameraImage(je);Dt.sourceTexture=xt}}}}for(let we=0;we<G.length;we++){const Ge=I[we],Ze=G[we];Ge!==null&&Ze!==void 0&&Ze.update(Ge,Ee,p||u)}_e&&_e(ee,Ee),Ee.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Ee}),M=null}const Oe=new Ab;Oe.setAnimationLoop(Ae),this.setAnimationLoop=function(ee){_e=ee},this.dispose=function(){}}}const DC=new Wn,Lb=new St;Lb.set(-1,0,0,0,1,0,0,0,1);function LC(r,e){function i(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function s(S,y){y.color.getRGB(S.fogColor.value,Eb(r)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function l(S,y,R,O,U){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(S,y):y.isMeshLambertMaterial?(c(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(S,y),v(S,y)):y.isMeshPhongMaterial?(c(S,y),x(S,y),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(S,y),g(S,y),y.isMeshPhysicalMaterial&&b(S,y,U)):y.isMeshMatcapMaterial?(c(S,y),M(S,y)):y.isMeshDepthMaterial?c(S,y):y.isMeshDistanceMaterial?(c(S,y),A(S,y)):y.isMeshNormalMaterial?c(S,y):y.isLineBasicMaterial?(u(S,y),y.isLineDashedMaterial&&h(S,y)):y.isPointsMaterial?m(S,y,R,O):y.isSpriteMaterial?p(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,i(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===Pi&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,i(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===Pi&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,i(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,i(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const R=e.get(y),O=R.envMap,U=R.envMapRotation;O&&(S.envMap.value=O,S.envMapRotation.value.setFromMatrix4(DC.makeRotationFromEuler(U)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(Lb),S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,S.aoMapTransform))}function u(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform))}function h(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function m(S,y,R,O){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*R,S.scale.value=O*.5,y.map&&(S.map.value=y.map,i(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function p(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function x(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function v(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function g(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function b(S,y,R){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Pi&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=R.texture,S.transmissionSamplerSize.value.set(R.width,R.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,S.specularIntensityMapTransform))}function M(S,y){y.matcap&&(S.matcap.value=y.matcap)}function A(S,y){const R=e.get(y).light;S.referencePosition.value.setFromMatrixPosition(R.matrixWorld),S.nearDistance.value=R.shadow.camera.near,S.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function IC(r,e,i,s){let l={},c={},u=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(R,O){const U=O.program;s.uniformBlockBinding(R,U)}function p(R,O){let U=l[R.id];U===void 0&&(M(R),U=x(R),l[R.id]=U,R.addEventListener("dispose",S));const G=O.program;s.updateUBOMapping(R,G);const I=e.render.frame;c[R.id]!==I&&(g(R),c[R.id]=I)}function x(R){const O=v();R.__bindingPointIndex=O;const U=r.createBuffer(),G=R.__size,I=R.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,G,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,U),U}function v(){for(let R=0;R<h;R++)if(u.indexOf(R)===-1)return u.push(R),R;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const O=l[R.id],U=R.uniforms,G=R.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let I=0,B=U.length;I<B;I++){const w=Array.isArray(U[I])?U[I]:[U[I]];for(let F=0,$=w.length;F<$;F++){const k=w[F];if(b(k,I,F,G)===!0){const X=k.__offset,te=Array.isArray(k.value)?k.value:[k.value];let oe=0;for(let V=0;V<te.length;V++){const L=te[V],z=A(L);typeof L=="number"||typeof L=="boolean"?(k.__data[0]=L,r.bufferSubData(r.UNIFORM_BUFFER,X+oe,k.__data)):L.isMatrix3?(k.__data[0]=L.elements[0],k.__data[1]=L.elements[1],k.__data[2]=L.elements[2],k.__data[3]=0,k.__data[4]=L.elements[3],k.__data[5]=L.elements[4],k.__data[6]=L.elements[5],k.__data[7]=0,k.__data[8]=L.elements[6],k.__data[9]=L.elements[7],k.__data[10]=L.elements[8],k.__data[11]=0):ArrayBuffer.isView(L)?k.__data.set(new L.constructor(L.buffer,L.byteOffset,k.__data.length)):(L.toArray(k.__data,oe),oe+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,X,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(R,O,U,G){const I=R.value,B=O+"_"+U;if(G[B]===void 0)return typeof I=="number"||typeof I=="boolean"?G[B]=I:ArrayBuffer.isView(I)?G[B]=I.slice():G[B]=I.clone(),!0;{const w=G[B];if(typeof I=="number"||typeof I=="boolean"){if(w!==I)return G[B]=I,!0}else{if(ArrayBuffer.isView(I))return!0;if(w.equals(I)===!1)return w.copy(I),!0}}return!1}function M(R){const O=R.uniforms;let U=0;const G=16;for(let B=0,w=O.length;B<w;B++){const F=Array.isArray(O[B])?O[B]:[O[B]];for(let $=0,k=F.length;$<k;$++){const X=F[$],te=Array.isArray(X.value)?X.value:[X.value];for(let oe=0,V=te.length;oe<V;oe++){const L=te[oe],z=A(L),W=U%G,ce=W%z.boundary,ge=W+ce;U+=ce,ge!==0&&G-ge<z.storage&&(U+=G-ge),X.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=U,U+=z.storage}}}const I=U%G;return I>0&&(U+=G-I),R.__size=U,R.__cache={},this}function A(R){const O={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(O.boundary=4,O.storage=4):R.isVector2?(O.boundary=8,O.storage=8):R.isVector3||R.isColor?(O.boundary=16,O.storage=12):R.isVector4?(O.boundary=16,O.storage=16):R.isMatrix3?(O.boundary=48,O.storage=48):R.isMatrix4?(O.boundary=64,O.storage=64):R.isTexture?mt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(O.boundary=16,O.storage=R.byteLength):mt("WebGLRenderer: Unsupported uniform value type.",R),O}function S(R){const O=R.target;O.removeEventListener("dispose",S);const U=u.indexOf(O.__bindingPointIndex);u.splice(U,1),r.deleteBuffer(l[O.id]),delete l[O.id],delete c[O.id]}function y(){for(const R in l)r.deleteBuffer(l[R]);u=[],l={},c={}}return{bind:m,update:p,dispose:y}}const UC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ia=null;function PC(){return Ia===null&&(Ia=new ET(UC,16,16,zr,xs),Ia.name="DFG_LUT",Ia.minFilter=mi,Ia.magFilter=mi,Ia.wrapS=ps,Ia.wrapT=ps,Ia.generateMipmaps=!1,Ia.needsUpdate=!0),Ia}class FC{constructor(e={}){const{canvas:i=JM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:u=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:b=ma}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=u;const A=b,S=new Set([gm,mm,pm]),y=new Set([ma,Ha,tc,nc,dm,hm]),R=new Uint32Array(4),O=new Int32Array(4),U=new ae;let G=null,I=null;const B=[],w=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ba,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const $=this;let k=!1,X=null;this._outputColorSpace=Zi;let te=0,oe=0,V=null,L=-1,z=null;const W=new Ln,ce=new Ln;let ge=null;const P=new pn(0);let Z=0,_e=i.width,Ae=i.height,Oe=1,ee=null,Ee=null;const we=new Ln(0,0,_e,Ae),Ge=new Ln(0,0,_e,Ae);let Ze=!1;const Ke=new bb;let At=!1,ut=!1;const je=new Wn,Dt=new ae,xt=new Ln,mn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function kt(){return V===null?Oe:1}let q=s;function yt(C,K){return i.getContext(C,K)}try{const C={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${um}`),i.addEventListener("webglcontextlost",Re,!1),i.addEventListener("webglcontextrestored",We,!1),i.addEventListener("webglcontextcreationerror",it,!1),q===null){const K="webgl2";if(q=yt(K,C),q===null)throw yt(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw Jt("WebGLRenderer: "+C.message),C}let vt,Et,ve,Vt,D,T,J,me,Te,ye,Ue,fe,pe,Le,ze,Ne,Pe,rt,ht,ct,j,De,he;function Ie(){vt=new Pw(q),vt.init(),j=new wC(q,vt),Et=new Rw(q,vt,e,j),ve=new TC(q,vt),Et.reversedDepthBuffer&&g&&ve.buffers.depth.setReversed(!0),Vt=new zw(q),D=new fC,T=new AC(q,vt,ve,D,Et,j,Vt),J=new Uw($),me=new VT(q),De=new Aw(q,me),Te=new Fw(q,me,Vt,De),ye=new Hw(q,Te,me,De,Vt),rt=new Gw(q,Et,T),ze=new Cw(D),Ue=new uC($,J,vt,Et,De,ze),fe=new LC($,D),pe=new hC,Le=new vC(vt),Pe=new Tw($,J,ve,ye,M,m),Ne=new MC($,ye,Et),he=new IC(q,Vt,Et,ve),ht=new ww(q,vt,Vt),ct=new Bw(q,vt,Vt),Vt.programs=Ue.programs,$.capabilities=Et,$.extensions=vt,$.properties=D,$.renderLists=pe,$.shadowMap=Ne,$.state=ve,$.info=Vt}Ie(),A!==ma&&(F=new Vw(A,i.width,i.height,l,c));const Fe=new OC($,q);this.xr=Fe,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const C=vt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=vt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(C){C!==void 0&&(Oe=C,this.setSize(_e,Ae,!1))},this.getSize=function(C){return C.set(_e,Ae)},this.setSize=function(C,K,le=!0){if(Fe.isPresenting){mt("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=C,Ae=K,i.width=Math.floor(C*Oe),i.height=Math.floor(K*Oe),le===!0&&(i.style.width=C+"px",i.style.height=K+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,C,K)},this.getDrawingBufferSize=function(C){return C.set(_e*Oe,Ae*Oe).floor()},this.setDrawingBufferSize=function(C,K,le){_e=C,Ae=K,Oe=le,i.width=Math.floor(C*le),i.height=Math.floor(K*le),this.setViewport(0,0,C,K)},this.setEffects=function(C){if(A===ma){Jt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let K=0;K<C.length;K++)if(C[K].isOutputPass===!0){mt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(W)},this.getViewport=function(C){return C.copy(we)},this.setViewport=function(C,K,le,ne){C.isVector4?we.set(C.x,C.y,C.z,C.w):we.set(C,K,le,ne),ve.viewport(W.copy(we).multiplyScalar(Oe).round())},this.getScissor=function(C){return C.copy(Ge)},this.setScissor=function(C,K,le,ne){C.isVector4?Ge.set(C.x,C.y,C.z,C.w):Ge.set(C,K,le,ne),ve.scissor(ce.copy(Ge).multiplyScalar(Oe).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(C){ve.setScissorTest(Ze=C)},this.setOpaqueSort=function(C){ee=C},this.setTransparentSort=function(C){Ee=C},this.getClearColor=function(C){return C.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(C=!0,K=!0,le=!0){let ne=0;if(C){let ie=!1;if(V!==null){const He=V.texture.format;ie=S.has(He)}if(ie){const He=V.texture.type,Xe=y.has(He),Be=Pe.getClearColor(),qe=Pe.getClearAlpha(),Ye=Be.r,Qe=Be.g,pt=Be.b;Xe?(R[0]=Ye,R[1]=Qe,R[2]=pt,R[3]=qe,q.clearBufferuiv(q.COLOR,0,R)):(O[0]=Ye,O[1]=Qe,O[2]=pt,O[3]=qe,q.clearBufferiv(q.COLOR,0,O))}else ne|=q.COLOR_BUFFER_BIT}K&&(ne|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),le&&(ne|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&q.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),X=C},this.dispose=function(){i.removeEventListener("webglcontextlost",Re,!1),i.removeEventListener("webglcontextrestored",We,!1),i.removeEventListener("webglcontextcreationerror",it,!1),Pe.dispose(),pe.dispose(),Le.dispose(),D.dispose(),J.dispose(),ye.dispose(),De.dispose(),he.dispose(),Ue.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",ta),Fe.removeEventListener("sessionend",zi),Un.stop()};function Re(C){C.preventDefault(),k_("WebGLRenderer: Context Lost."),k=!0}function We(){k_("WebGLRenderer: Context Restored."),k=!1;const C=Vt.autoReset,K=Ne.enabled,le=Ne.autoUpdate,ne=Ne.needsUpdate,ie=Ne.type;Ie(),Vt.autoReset=C,Ne.enabled=K,Ne.autoUpdate=le,Ne.needsUpdate=ne,Ne.type=ie}function it(C){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function rn(C){const K=C.target;K.removeEventListener("dispose",rn),Lt(K)}function Lt(C){Kn(C),D.remove(C)}function Kn(C){const K=D.get(C).programs;K!==void 0&&(K.forEach(function(le){Ue.releaseProgram(le)}),C.isShaderMaterial&&Ue.releaseShaderCache(C))}this.renderBufferDirect=function(C,K,le,ne,ie,He){K===null&&(K=mn);const Xe=ie.isMesh&&ie.matrixWorld.determinant()<0,Be=xi(C,K,le,ne,ie);ve.setMaterial(ne,Xe);let qe=le.index,Ye=1;if(ne.wireframe===!0){if(qe=Te.getWireframeAttribute(le),qe===void 0)return;Ye=2}const Qe=le.drawRange,pt=le.attributes.position;let Je=Qe.start*Ye,It=(Qe.start+Qe.count)*Ye;He!==null&&(Je=Math.max(Je,He.start*Ye),It=Math.min(It,(He.start+He.count)*Ye)),qe!==null?(Je=Math.max(Je,0),It=Math.min(It,qe.count)):pt!=null&&(Je=Math.max(Je,0),It=Math.min(It,pt.count));const Wt=It-Je;if(Wt<0||Wt===1/0)return;De.setup(ie,ne,Be,le,qe);let Ft,Bt=ht;if(qe!==null&&(Ft=me.get(qe),Bt=ct,Bt.setIndex(Ft)),ie.isMesh)ne.wireframe===!0?(ve.setLineWidth(ne.wireframeLinewidth*kt()),Bt.setMode(q.LINES)):Bt.setMode(q.TRIANGLES);else if(ie.isLine){let Ct=ne.linewidth;Ct===void 0&&(Ct=1),ve.setLineWidth(Ct*kt()),ie.isLineSegments?Bt.setMode(q.LINES):ie.isLineLoop?Bt.setMode(q.LINE_LOOP):Bt.setMode(q.LINE_STRIP)}else ie.isPoints?Bt.setMode(q.POINTS):ie.isSprite&&Bt.setMode(q.TRIANGLES);if(ie.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))Bt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const Ct=ie._multiDrawStarts,Ve=ie._multiDrawCounts,ei=ie._multiDrawCount,Ut=qe?me.get(qe).bytesPerElement:1,Pn=D.get(ne).currentProgram.getUniforms();for(let jn=0;jn<ei;jn++)Pn.setValue(q,"_gl_DrawID",jn),Bt.render(Ct[jn]/Ut,Ve[jn])}else if(ie.isInstancedMesh)Bt.renderInstances(Je,Wt,ie.count);else if(le.isInstancedBufferGeometry){const Ct=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,Ve=Math.min(le.instanceCount,Ct);Bt.renderInstances(Je,Wt,Ve)}else Bt.render(Je,Wt)};function In(C,K,le){C.transparent===!0&&C.side===hs&&C.forceSinglePass===!1?(C.side=Pi,C.needsUpdate=!0,wa(C,K,le),C.side=tr,C.needsUpdate=!0,wa(C,K,le),C.side=hs):wa(C,K,le)}this.compile=function(C,K,le=null){le===null&&(le=C),I=Le.get(le),I.init(K),w.push(I),le.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(I.pushLight(ie),ie.castShadow&&I.pushShadow(ie))}),C!==le&&C.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(I.pushLight(ie),ie.castShadow&&I.pushShadow(ie))}),I.setupLights();const ne=new Set;return C.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const He=ie.material;if(He)if(Array.isArray(He))for(let Xe=0;Xe<He.length;Xe++){const Be=He[Xe];In(Be,le,ie),ne.add(Be)}else In(He,le,ie),ne.add(He)}),I=w.pop(),ne},this.compileAsync=function(C,K,le=null){const ne=this.compile(C,K,le);return new Promise(ie=>{function He(){if(ne.forEach(function(Xe){D.get(Xe).currentProgram.isReady()&&ne.delete(Xe)}),ne.size===0){ie(C);return}setTimeout(He,10)}vt.get("KHR_parallel_shader_compile")!==null?He():setTimeout(He,10)})};let Bi=null;function ea(C){Bi&&Bi(C)}function ta(){Un.stop()}function zi(){Un.start()}const Un=new Ab;Un.setAnimationLoop(ea),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(C){Bi=C,Fe.setAnimationLoop(C),C===null?Un.stop():Un.start()},Fe.addEventListener("sessionstart",ta),Fe.addEventListener("sessionend",zi),this.render=function(C,K){if(K!==void 0&&K.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;X!==null&&X.renderStart(C,K);const le=Fe.enabled===!0&&Fe.isPresenting===!0,ne=F!==null&&(V===null||le)&&F.begin($,V);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(K),K=Fe.getCamera()),C.isScene===!0&&C.onBeforeRender($,C,K,V),I=Le.get(C,w.length),I.init(K),I.state.textureUnits=T.getTextureUnits(),w.push(I),je.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Ke.setFromProjectionMatrix(je,Fa,K.reversedDepth),ut=this.localClippingEnabled,At=ze.init(this.clippingPlanes,ut),G=pe.get(C,B.length),G.init(),B.push(G),Fe.enabled===!0&&Fe.isPresenting===!0){const Xe=$.xr.getDepthSensingMesh();Xe!==null&&gn(Xe,K,-1/0,$.sortObjects)}gn(C,K,0,$.sortObjects),G.finish(),$.sortObjects===!0&&G.sort(ee,Ee),Kt=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,Kt&&Pe.addToRenderList(G,C),this.info.render.frame++,At===!0&&ze.beginShadows();const ie=I.state.shadowsArray;if(Ne.render(ie,C,K),At===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ne&&F.hasRenderPass())===!1){const Xe=G.opaque,Be=G.transmissive;if(I.setupLights(),K.isArrayCamera){const qe=K.cameras;if(Be.length>0)for(let Ye=0,Qe=qe.length;Ye<Qe;Ye++){const pt=qe[Ye];li(Xe,Be,C,pt)}Kt&&Pe.render(C);for(let Ye=0,Qe=qe.length;Ye<Qe;Ye++){const pt=qe[Ye];En(G,C,pt,pt.viewport)}}else Be.length>0&&li(Xe,Be,C,K),Kt&&Pe.render(C),En(G,C,K)}V!==null&&oe===0&&(T.updateMultisampleRenderTarget(V),T.updateRenderTargetMipmap(V)),ne&&F.end($),C.isScene===!0&&C.onAfterRender($,C,K),De.resetDefaultState(),L=-1,z=null,w.pop(),w.length>0?(I=w[w.length-1],T.setTextureUnits(I.state.textureUnits),At===!0&&ze.setGlobalState($.clippingPlanes,I.state.camera)):I=null,B.pop(),B.length>0?G=B[B.length-1]:G=null,X!==null&&X.renderEnd()};function gn(C,K,le,ne){if(C.visible===!1)return;if(C.layers.test(K.layers)){if(C.isGroup)le=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(K);else if(C.isLightProbeGrid)I.pushLightProbeGrid(C);else if(C.isLight)I.pushLight(C),C.castShadow&&I.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Ke.intersectsSprite(C)){ne&&xt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(je);const Xe=ye.update(C),Be=C.material;Be.visible&&G.push(C,Xe,Be,le,xt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Ke.intersectsObject(C))){const Xe=ye.update(C),Be=C.material;if(ne&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),xt.copy(C.boundingSphere.center)):(Xe.boundingSphere===null&&Xe.computeBoundingSphere(),xt.copy(Xe.boundingSphere.center)),xt.applyMatrix4(C.matrixWorld).applyMatrix4(je)),Array.isArray(Be)){const qe=Xe.groups;for(let Ye=0,Qe=qe.length;Ye<Qe;Ye++){const pt=qe[Ye],Je=Be[pt.materialIndex];Je&&Je.visible&&G.push(C,Xe,Je,le,xt.z,pt)}}else Be.visible&&G.push(C,Xe,Be,le,xt.z,null)}}const He=C.children;for(let Xe=0,Be=He.length;Xe<Be;Xe++)gn(He[Xe],K,le,ne)}function En(C,K,le,ne){const{opaque:ie,transmissive:He,transparent:Xe}=C;I.setupLightsView(le),At===!0&&ze.setGlobalState($.clippingPlanes,le),ne&&ve.viewport(W.copy(ne)),ie.length>0&&na(ie,K,le),He.length>0&&na(He,K,le),Xe.length>0&&na(Xe,K,le),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function li(C,K,le,ne){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[ne.id]===void 0){const Je=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[ne.id]=new za(1,1,{generateMipmaps:!0,type:Je?xs:ma,minFilter:Ir,samples:Math.max(4,Et.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}const He=I.state.transmissionRenderTarget[ne.id],Xe=ne.viewport||W;He.setSize(Xe.z*$.transmissionResolutionScale,Xe.w*$.transmissionResolutionScale);const Be=$.getRenderTarget(),qe=$.getActiveCubeFace(),Ye=$.getActiveMipmapLevel();$.setRenderTarget(He),$.getClearColor(P),Z=$.getClearAlpha(),Z<1&&$.setClearColor(16777215,.5),$.clear(),Kt&&Pe.render(le);const Qe=$.toneMapping;$.toneMapping=Ba;const pt=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),I.setupLightsView(ne),At===!0&&ze.setGlobalState($.clippingPlanes,ne),na(C,le,ne),T.updateMultisampleRenderTarget(He),T.updateRenderTargetMipmap(He),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let It=0,Wt=K.length;It<Wt;It++){const Ft=K[It],{object:Bt,geometry:Ct,material:Ve,group:ei}=Ft;if(Ve.side===hs&&Bt.layers.test(ne.layers)){const Ut=Ve.side;Ve.side=Pi,Ve.needsUpdate=!0,Cn(Bt,le,ne,Ct,Ve,ei),Ve.side=Ut,Ve.needsUpdate=!0,Je=!0}}Je===!0&&(T.updateMultisampleRenderTarget(He),T.updateRenderTargetMipmap(He))}$.setRenderTarget(Be,qe,Ye),$.setClearColor(P,Z),pt!==void 0&&(ne.viewport=pt),$.toneMapping=Qe}function na(C,K,le){const ne=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,He=C.length;ie<He;ie++){const Xe=C[ie],{object:Be,geometry:qe,group:Ye}=Xe;let Qe=Xe.material;Qe.allowOverride===!0&&ne!==null&&(Qe=ne),Be.layers.test(le.layers)&&Cn(Be,K,le,qe,Qe,Ye)}}function Cn(C,K,le,ne,ie,He){C.onBeforeRender($,K,le,ne,ie,He),C.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),ie.onBeforeRender($,K,le,ne,C,He),ie.transparent===!0&&ie.side===hs&&ie.forceSinglePass===!1?(ie.side=Pi,ie.needsUpdate=!0,$.renderBufferDirect(le,K,ne,ie,C,He),ie.side=tr,ie.needsUpdate=!0,$.renderBufferDirect(le,K,ne,ie,C,He),ie.side=hs):$.renderBufferDirect(le,K,ne,ie,C,He),C.onAfterRender($,K,le,ne,ie,He)}function wa(C,K,le){K.isScene!==!0&&(K=mn);const ne=D.get(C),ie=I.state.lights,He=I.state.shadowsArray,Xe=ie.state.version,Be=Ue.getParameters(C,ie.state,He,K,le,I.state.lightProbeGridArray),qe=Ue.getProgramCacheKey(Be);let Ye=ne.programs;ne.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?K.environment:null,ne.fog=K.fog;const Qe=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ne.envMap=J.get(C.envMap||ne.environment,Qe),ne.envMapRotation=ne.environment!==null&&C.envMap===null?K.environmentRotation:C.envMapRotation,Ye===void 0&&(C.addEventListener("dispose",rn),Ye=new Map,ne.programs=Ye);let pt=Ye.get(qe);if(pt!==void 0){if(ne.currentProgram===pt&&ne.lightsStateVersion===Xe)return ci(C,Be),pt}else Be.uniforms=Ue.getUniforms(C),X!==null&&C.isNodeMaterial&&X.build(C,le,Be),C.onBeforeCompile(Be,$),pt=Ue.acquireProgram(Be,qe),Ye.set(qe,pt),ne.uniforms=Be.uniforms;const Je=ne.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Je.clippingPlanes=ze.uniform),ci(C,Be),ne.needsLights=xn(C),ne.lightsStateVersion=Xe,ne.needsLights&&(Je.ambientLightColor.value=ie.state.ambient,Je.lightProbe.value=ie.state.probe,Je.directionalLights.value=ie.state.directional,Je.directionalLightShadows.value=ie.state.directionalShadow,Je.spotLights.value=ie.state.spot,Je.spotLightShadows.value=ie.state.spotShadow,Je.rectAreaLights.value=ie.state.rectArea,Je.ltc_1.value=ie.state.rectAreaLTC1,Je.ltc_2.value=ie.state.rectAreaLTC2,Je.pointLights.value=ie.state.point,Je.pointLightShadows.value=ie.state.pointShadow,Je.hemisphereLights.value=ie.state.hemi,Je.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Je.spotLightMatrix.value=ie.state.spotLightMatrix,Je.spotLightMap.value=ie.state.spotLightMap,Je.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=I.state.lightProbeGridArray.length>0,ne.currentProgram=pt,ne.uniformsList=null,pt}function xa(C){if(C.uniformsList===null){const K=C.currentProgram.getUniforms();C.uniformsList=$u.seqWithValue(K.seq,C.uniforms)}return C.uniformsList}function ci(C,K){const le=D.get(C);le.outputColorSpace=K.outputColorSpace,le.batching=K.batching,le.batchingColor=K.batchingColor,le.instancing=K.instancing,le.instancingColor=K.instancingColor,le.instancingMorph=K.instancingMorph,le.skinning=K.skinning,le.morphTargets=K.morphTargets,le.morphNormals=K.morphNormals,le.morphColors=K.morphColors,le.morphTargetsCount=K.morphTargetsCount,le.numClippingPlanes=K.numClippingPlanes,le.numIntersection=K.numClipIntersection,le.vertexAlphas=K.vertexAlphas,le.vertexTangents=K.vertexTangents,le.toneMapping=K.toneMapping}function Mi(C,K){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;U.setFromMatrixPosition(K.matrixWorld);for(let le=0,ne=C.length;le<ne;le++){const ie=C[le];if(ie.texture!==null&&ie.boundingBox.containsPoint(U))return ie}return null}function xi(C,K,le,ne,ie){K.isScene!==!0&&(K=mn),T.resetTextureUnits();const He=K.fog,Xe=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?K.environment:null,Be=V===null?$.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:$t.workingColorSpace,qe=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ye=J.get(ne.envMap||Xe,qe),Qe=ne.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,pt=!!le.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Je=!!le.morphAttributes.position,It=!!le.morphAttributes.normal,Wt=!!le.morphAttributes.color;let Ft=Ba;ne.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Ft=$.toneMapping);const Bt=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,Ct=Bt!==void 0?Bt.length:0,Ve=D.get(ne),ei=I.state.lights;if(At===!0&&(ut===!0||C!==z)){const en=C===z&&ne.id===L;ze.setState(ne,C,en)}let Ut=!1;ne.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==ei.state.version||Ve.outputColorSpace!==Be||ie.isBatchedMesh&&Ve.batching===!1||!ie.isBatchedMesh&&Ve.batching===!0||ie.isBatchedMesh&&Ve.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&Ve.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&Ve.instancing===!1||!ie.isInstancedMesh&&Ve.instancing===!0||ie.isSkinnedMesh&&Ve.skinning===!1||!ie.isSkinnedMesh&&Ve.skinning===!0||ie.isInstancedMesh&&Ve.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Ve.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Ve.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Ve.instancingMorph===!1&&ie.morphTexture!==null||Ve.envMap!==Ye||ne.fog===!0&&Ve.fog!==He||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==Qe||Ve.vertexTangents!==pt||Ve.morphTargets!==Je||Ve.morphNormals!==It||Ve.morphColors!==Wt||Ve.toneMapping!==Ft||Ve.morphTargetsCount!==Ct||!!Ve.lightProbeGrid!=I.state.lightProbeGridArray.length>0)&&(Ut=!0):(Ut=!0,Ve.__version=ne.version);let Pn=Ve.currentProgram;Ut===!0&&(Pn=wa(ne,K,ie),X&&ne.isNodeMaterial&&X.onUpdateProgram(ne,Pn,Ve));let jn=!1,ui=!1,_i=!1;const Zt=Pn.getUniforms(),sn=Ve.uniforms;if(ve.useProgram(Pn.program)&&(jn=!0,ui=!0,_i=!0),ne.id!==L&&(L=ne.id,ui=!0),Ve.needsLights){const en=Mi(I.state.lightProbeGridArray,ie);Ve.lightProbeGrid!==en&&(Ve.lightProbeGrid=en,ui=!0)}if(jn||z!==C){ve.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Zt.setValue(q,"projectionMatrix",C.projectionMatrix),Zt.setValue(q,"viewMatrix",C.matrixWorldInverse);const Zn=Zt.map.cameraPosition;Zn!==void 0&&Zn.setValue(q,Dt.setFromMatrixPosition(C.matrixWorld)),Et.logarithmicDepthBuffer&&Zt.setValue(q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Zt.setValue(q,"isOrthographic",C.isOrthographicCamera===!0),z!==C&&(z=C,ui=!0,_i=!0)}if(Ve.needsLights&&(ei.state.directionalShadowMap.length>0&&Zt.setValue(q,"directionalShadowMap",ei.state.directionalShadowMap,T),ei.state.spotShadowMap.length>0&&Zt.setValue(q,"spotShadowMap",ei.state.spotShadowMap,T),ei.state.pointShadowMap.length>0&&Zt.setValue(q,"pointShadowMap",ei.state.pointShadowMap,T)),ie.isSkinnedMesh){Zt.setOptional(q,ie,"bindMatrix"),Zt.setOptional(q,ie,"bindMatrixInverse");const en=ie.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Zt.setValue(q,"boneTexture",en.boneTexture,T))}ie.isBatchedMesh&&(Zt.setOptional(q,ie,"batchingTexture"),Zt.setValue(q,"batchingTexture",ie._matricesTexture,T),Zt.setOptional(q,ie,"batchingIdTexture"),Zt.setValue(q,"batchingIdTexture",ie._indirectTexture,T),Zt.setOptional(q,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Zt.setValue(q,"batchingColorTexture",ie._colorsTexture,T));const vi=le.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&rt.update(ie,le,Pn),(ui||Ve.receiveShadow!==ie.receiveShadow)&&(Ve.receiveShadow=ie.receiveShadow,Zt.setValue(q,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&K.environment!==null&&(sn.envMapIntensity.value=K.environmentIntensity),sn.dfgLUT!==void 0&&(sn.dfgLUT.value=PC()),ui){if(Zt.setValue(q,"toneMappingExposure",$.toneMappingExposure),Ve.needsLights&&Ti(sn,_i),He&&ne.fog===!0&&fe.refreshFogUniforms(sn,He),fe.refreshMaterialUniforms(sn,ne,Oe,Ae,I.state.transmissionRenderTarget[C.id]),Ve.needsLights&&Ve.lightProbeGrid){const en=Ve.lightProbeGrid;sn.probesSH.value=en.texture,sn.probesMin.value.copy(en.boundingBox.min),sn.probesMax.value.copy(en.boundingBox.max),sn.probesResolution.value.copy(en.resolution)}$u.upload(q,xa(Ve),sn,T)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&($u.upload(q,xa(Ve),sn,T),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Zt.setValue(q,"center",ie.center),Zt.setValue(q,"modelViewMatrix",ie.modelViewMatrix),Zt.setValue(q,"normalMatrix",ie.normalMatrix),Zt.setValue(q,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){const en=ne.uniformsGroups;for(let Zn=0,wi=en.length;Zn<wi;Zn++){const Fn=en[Zn];he.update(Fn,Pn),he.bind(Fn,Pn)}}return Pn}function Ti(C,K){C.ambientLightColor.needsUpdate=K,C.lightProbe.needsUpdate=K,C.directionalLights.needsUpdate=K,C.directionalLightShadows.needsUpdate=K,C.pointLights.needsUpdate=K,C.pointLightShadows.needsUpdate=K,C.spotLights.needsUpdate=K,C.spotLightShadows.needsUpdate=K,C.rectAreaLights.needsUpdate=K,C.hemisphereLights.needsUpdate=K}function xn(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(C,K,le){const ne=D.get(C);ne.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),D.get(C.texture).__webglTexture=K,D.get(C.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:le,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,K){const le=D.get(C);le.__webglFramebuffer=K,le.__useDefaultFramebuffer=K===void 0};const Ai=q.createFramebuffer();this.setRenderTarget=function(C,K=0,le=0){V=C,te=K,oe=le;let ne=null,ie=!1,He=!1;if(C){const Be=D.get(C);if(Be.__useDefaultFramebuffer!==void 0){ve.bindFramebuffer(q.FRAMEBUFFER,Be.__webglFramebuffer),W.copy(C.viewport),ce.copy(C.scissor),ge=C.scissorTest,ve.viewport(W),ve.scissor(ce),ve.setScissorTest(ge),L=-1;return}else if(Be.__webglFramebuffer===void 0)T.setupRenderTarget(C);else if(Be.__hasExternalTextures)T.rebindTextures(C,D.get(C.texture).__webglTexture,D.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Qe=C.depthTexture;if(Be.__boundDepthTexture!==Qe){if(Qe!==null&&D.has(Qe)&&(C.width!==Qe.image.width||C.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(C)}}const qe=C.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(He=!0);const Ye=D.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ye[K])?ne=Ye[K][le]:ne=Ye[K],ie=!0):C.samples>0&&T.useMultisampledRTT(C)===!1?ne=D.get(C).__webglMultisampledFramebuffer:Array.isArray(Ye)?ne=Ye[le]:ne=Ye,W.copy(C.viewport),ce.copy(C.scissor),ge=C.scissorTest}else W.copy(we).multiplyScalar(Oe).floor(),ce.copy(Ge).multiplyScalar(Oe).floor(),ge=Ze;if(le!==0&&(ne=Ai),ve.bindFramebuffer(q.FRAMEBUFFER,ne)&&ve.drawBuffers(C,ne),ve.viewport(W),ve.scissor(ce),ve.setScissorTest(ge),ie){const Be=D.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+K,Be.__webglTexture,le)}else if(He){const Be=K;for(let qe=0;qe<C.textures.length;qe++){const Ye=D.get(C.textures[qe]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+qe,Ye.__webglTexture,le,Be)}}else if(C!==null&&le!==0){const Be=D.get(C.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Be.__webglTexture,le)}L=-1},this.readRenderTargetPixels=function(C,K,le,ne,ie,He,Xe,Be=0){if(!(C&&C.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=D.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Xe!==void 0&&(qe=qe[Xe]),qe){ve.bindFramebuffer(q.FRAMEBUFFER,qe);try{const Ye=C.textures[Be],Qe=Ye.format,pt=Ye.type;if(C.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Be),!Et.textureFormatReadable(Qe)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(pt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=C.width-ne&&le>=0&&le<=C.height-ie&&q.readPixels(K,le,ne,ie,j.convert(Qe),j.convert(pt),He)}finally{const Ye=V!==null?D.get(V).__webglFramebuffer:null;ve.bindFramebuffer(q.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(C,K,le,ne,ie,He,Xe,Be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=D.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Xe!==void 0&&(qe=qe[Xe]),qe)if(K>=0&&K<=C.width-ne&&le>=0&&le<=C.height-ie){ve.bindFramebuffer(q.FRAMEBUFFER,qe);const Ye=C.textures[Be],Qe=Ye.format,pt=Ye.type;if(C.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Be),!Et.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Je),q.bufferData(q.PIXEL_PACK_BUFFER,He.byteLength,q.STREAM_READ),q.readPixels(K,le,ne,ie,j.convert(Qe),j.convert(pt),0);const It=V!==null?D.get(V).__webglFramebuffer:null;ve.bindFramebuffer(q.FRAMEBUFFER,It);const Wt=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await eT(q,Wt,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Je),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,He),q.deleteBuffer(Je),q.deleteSync(Wt),He}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,K=null,le=0){const ne=Math.pow(2,-le),ie=Math.floor(C.image.width*ne),He=Math.floor(C.image.height*ne),Xe=K!==null?K.x:0,Be=K!==null?K.y:0;T.setTexture2D(C,0),q.copyTexSubImage2D(q.TEXTURE_2D,le,0,0,Xe,Be,ie,He),ve.unbindTexture()};const yn=q.createFramebuffer(),Ra=q.createFramebuffer();this.copyTextureToTexture=function(C,K,le=null,ne=null,ie=0,He=0){let Xe,Be,qe,Ye,Qe,pt,Je,It,Wt;const Ft=C.isCompressedTexture?C.mipmaps[He]:C.image;if(le!==null)Xe=le.max.x-le.min.x,Be=le.max.y-le.min.y,qe=le.isBox3?le.max.z-le.min.z:1,Ye=le.min.x,Qe=le.min.y,pt=le.isBox3?le.min.z:0;else{const sn=Math.pow(2,-ie);Xe=Math.floor(Ft.width*sn),Be=Math.floor(Ft.height*sn),C.isDataArrayTexture?qe=Ft.depth:C.isData3DTexture?qe=Math.floor(Ft.depth*sn):qe=1,Ye=0,Qe=0,pt=0}ne!==null?(Je=ne.x,It=ne.y,Wt=ne.z):(Je=0,It=0,Wt=0);const Bt=j.convert(K.format),Ct=j.convert(K.type);let Ve;K.isData3DTexture?(T.setTexture3D(K,0),Ve=q.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(T.setTexture2DArray(K,0),Ve=q.TEXTURE_2D_ARRAY):(T.setTexture2D(K,0),Ve=q.TEXTURE_2D),ve.activeTexture(q.TEXTURE0),ve.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,K.flipY),ve.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),ve.pixelStorei(q.UNPACK_ALIGNMENT,K.unpackAlignment);const ei=ve.getParameter(q.UNPACK_ROW_LENGTH),Ut=ve.getParameter(q.UNPACK_IMAGE_HEIGHT),Pn=ve.getParameter(q.UNPACK_SKIP_PIXELS),jn=ve.getParameter(q.UNPACK_SKIP_ROWS),ui=ve.getParameter(q.UNPACK_SKIP_IMAGES);ve.pixelStorei(q.UNPACK_ROW_LENGTH,Ft.width),ve.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ft.height),ve.pixelStorei(q.UNPACK_SKIP_PIXELS,Ye),ve.pixelStorei(q.UNPACK_SKIP_ROWS,Qe),ve.pixelStorei(q.UNPACK_SKIP_IMAGES,pt);const _i=C.isDataArrayTexture||C.isData3DTexture,Zt=K.isDataArrayTexture||K.isData3DTexture;if(C.isDepthTexture){const sn=D.get(C),vi=D.get(K),en=D.get(sn.__renderTarget),Zn=D.get(vi.__renderTarget);ve.bindFramebuffer(q.READ_FRAMEBUFFER,en.__webglFramebuffer),ve.bindFramebuffer(q.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let wi=0;wi<qe;wi++)_i&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,D.get(C).__webglTexture,ie,pt+wi),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,D.get(K).__webglTexture,He,Wt+wi)),q.blitFramebuffer(Ye,Qe,Xe,Be,Je,It,Xe,Be,q.DEPTH_BUFFER_BIT,q.NEAREST);ve.bindFramebuffer(q.READ_FRAMEBUFFER,null),ve.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(ie!==0||C.isRenderTargetTexture||D.has(C)){const sn=D.get(C),vi=D.get(K);ve.bindFramebuffer(q.READ_FRAMEBUFFER,yn),ve.bindFramebuffer(q.DRAW_FRAMEBUFFER,Ra);for(let en=0;en<qe;en++)_i?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,sn.__webglTexture,ie,pt+en):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,sn.__webglTexture,ie),Zt?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,vi.__webglTexture,He,Wt+en):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,vi.__webglTexture,He),ie!==0?q.blitFramebuffer(Ye,Qe,Xe,Be,Je,It,Xe,Be,q.COLOR_BUFFER_BIT,q.NEAREST):Zt?q.copyTexSubImage3D(Ve,He,Je,It,Wt+en,Ye,Qe,Xe,Be):q.copyTexSubImage2D(Ve,He,Je,It,Ye,Qe,Xe,Be);ve.bindFramebuffer(q.READ_FRAMEBUFFER,null),ve.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Zt?C.isDataTexture||C.isData3DTexture?q.texSubImage3D(Ve,He,Je,It,Wt,Xe,Be,qe,Bt,Ct,Ft.data):K.isCompressedArrayTexture?q.compressedTexSubImage3D(Ve,He,Je,It,Wt,Xe,Be,qe,Bt,Ft.data):q.texSubImage3D(Ve,He,Je,It,Wt,Xe,Be,qe,Bt,Ct,Ft):C.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,He,Je,It,Xe,Be,Bt,Ct,Ft.data):C.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,He,Je,It,Ft.width,Ft.height,Bt,Ft.data):q.texSubImage2D(q.TEXTURE_2D,He,Je,It,Xe,Be,Bt,Ct,Ft);ve.pixelStorei(q.UNPACK_ROW_LENGTH,ei),ve.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ut),ve.pixelStorei(q.UNPACK_SKIP_PIXELS,Pn),ve.pixelStorei(q.UNPACK_SKIP_ROWS,jn),ve.pixelStorei(q.UNPACK_SKIP_IMAGES,ui),He===0&&K.generateMipmaps&&q.generateMipmap(Ve),ve.unbindTexture()},this.initRenderTarget=function(C){D.get(C).__webglFramebuffer===void 0&&T.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?T.setTextureCube(C,0):C.isData3DTexture?T.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?T.setTexture2DArray(C,0):T.setTexture2D(C,0),ve.unbindTexture()},this.resetState=function(){te=0,oe=0,V=null,ve.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(e),i.unpackColorSpace=$t._getUnpackColorSpace()}}const Lv={type:"change"},Mm={type:"start"},Ib={type:"end"},zu=new vb,Iv=new Zs,BC=Math.cos(70*iT.DEG2RAD),Yn=new ae,Ui=2*Math.PI,hn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},op=1e-6;class zC extends HT{constructor(e,i=null){super(e,i),this.state=hn.NONE,this.target=new ae,this.cursor=new ae,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zo.ROTATE,MIDDLE:zo.DOLLY,RIGHT:zo.PAN},this.touches={ONE:Bo.ROTATE,TWO:Bo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ae,this._lastQuaternion=new nr,this._lastTargetPosition=new ae,this._quat=new nr().setFromUnitVectors(e.up,new ae(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ov,this._sphericalDelta=new ov,this._scale=1,this._panOffset=new ae,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new ae,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=HC.bind(this),this._onPointerDown=GC.bind(this),this._onPointerUp=kC.bind(this),this._onContextMenu=$C.bind(this),this._onMouseWheel=XC.bind(this),this._onKeyDown=YC.bind(this),this._onTouchStart=WC.bind(this),this._onTouchMove=qC.bind(this),this._onMouseDown=VC.bind(this),this._onMouseMove=jC.bind(this),this._interceptControlDown=KC.bind(this),this._interceptControlUp=ZC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lv),this.update(),this.state=hn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;Yn.copy(i).sub(this.target),Yn.applyQuaternion(this._quat),this._spherical.setFromVector3(Yn),this.autoRotate&&this.state===hn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Ui:s>Math.PI&&(s-=Ui),l<-Math.PI?l+=Ui:l>Math.PI&&(l-=Ui),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=u!=this._spherical.radius}if(Yn.setFromSpherical(this._spherical),Yn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Yn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const h=Yn.length();u=this._clampDistance(h*this._scale);const m=h-u;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ae(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ae(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),u=Yn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):(zu.origin.copy(this.object.position),zu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zu.direction))<BC?this.object.lookAt(this.target):(Iv.setFromNormalAndCoplanarPoint(this.object.up,this.target),zu.intersectPlane(Iv,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>op||8*(1-this._lastQuaternion.dot(this.object.quaternion))>op||this._lastTargetPosition.distanceToSquared(this.target)>op?(this.dispatchEvent(Lv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ui/60*this.autoRotateSpeed*e:Ui/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){Yn.setFromMatrixColumn(i,0),Yn.multiplyScalar(-e),this._panOffset.add(Yn)}_panUp(e,i){this.screenSpacePanning===!0?Yn.setFromMatrixColumn(i,1):(Yn.setFromMatrixColumn(i,0),Yn.crossVectors(this.object.up,Yn)),Yn.multiplyScalar(e),this._panOffset.add(Yn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Yn.copy(l).sub(this.target);let c=Yn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,u=s.width,h=s.height;this._mouse.x=l/u*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ui*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ui*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ui*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ui*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ui*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(u,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Ot,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function GC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function HC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function kC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ib),this.state=hn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function VC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=hn.DOLLY;break;case zo.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=hn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=hn.ROTATE}break;case zo.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=hn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=hn.PAN}break;default:this.state=hn.NONE}this.state!==hn.NONE&&this.dispatchEvent(Mm)}function jC(r){switch(this.state){case hn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case hn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case hn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function XC(r){this.enabled===!1||this.enableZoom===!1||this.state!==hn.NONE||(r.preventDefault(),this.dispatchEvent(Mm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ib))}function YC(r){this.enabled!==!1&&this._handleKeyDown(r)}function WC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Bo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=hn.TOUCH_ROTATE;break;case Bo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=hn.TOUCH_PAN;break;default:this.state=hn.NONE}break;case 2:switch(this.touches.TWO){case Bo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=hn.TOUCH_DOLLY_PAN;break;case Bo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=hn.TOUCH_DOLLY_ROTATE;break;default:this.state=hn.NONE}break;default:this.state=hn.NONE}this.state!==hn.NONE&&this.dispatchEvent(Mm)}function qC(r){switch(this._trackPointer(r),this.state){case hn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case hn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case hn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case hn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=hn.NONE}}function $C(r){this.enabled!==!1&&r.preventDefault()}function KC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ZC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ub=({imageSrc:r,height:e=200})=>{const i=Ce.useRef(null),[s,l]=Uv.useState(!1);return Ce.useEffect(()=>{if(!i.current||!r||s)return;const c=i.current,u=new xT,h=75,m=c.clientWidth/c.clientHeight,p=new pa(h,m,.1,1100);p.position.set(0,0,.1);let x;try{x=new FC({antialias:!0})}catch(O){console.error("WebGL Context creation failed:",O),l(!0);return}x.setSize(c.clientWidth,c.clientHeight),x.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.appendChild(x.domElement);const v=new zC(p,x.domElement);v.enableDamping=!0,v.dampingFactor=.08,v.rotateSpeed=-.3,v.enableZoom=!1,v.enablePan=!1,v.autoRotate=!1;const g=new BT;let b=null;g.load(r,O=>{O.mapping=Vu,O.colorSpace=Zi;const U=new Sm(500,60,40);U.scale(-1,1,1);const G=new ym({map:O});b=new ka(U,G),u.add(b)});let M=h;const A=O=>{O.preventDefault();const U=O.deltaY>0?5:-5;M=Math.max(30,Math.min(120,M+U)),p.fov=M,p.updateProjectionMatrix()};c.addEventListener("wheel",A,{passive:!1});const S=new ResizeObserver(()=>{c.clientWidth===0||c.clientHeight===0||(p.aspect=c.clientWidth/c.clientHeight,p.updateProjectionMatrix(),x.setSize(c.clientWidth,c.clientHeight))});S.observe(c);let y=null;const R=()=>{y=requestAnimationFrame(R),v.update(),x.render(u,p)};return R(),()=>{cancelAnimationFrame(y),S.disconnect(),c.removeEventListener("wheel",A),b&&(b.geometry.dispose(),b.material.dispose()),x&&(x.dispose(),x.forceContextLoss(),c.contains(x.domElement)&&c.removeChild(x.domElement))}},[r]),_.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:c=>c.currentTarget.style.cursor="grabbing",onMouseUp:c=>c.currentTarget.style.cursor="grab",onMouseLeave:c=>c.currentTarget.style.cursor="grab",children:s&&_.jsx("img",{src:r,alt:"360 Panorama Fallback",style:{width:"100%",height:"100%",objectFit:"cover"}})})};function QC({step2Ref:r,currentStep:e,isAnalyzing:i,inputMode:s,setInputMode:l,targetDate:c,setTargetDate:u,categories:h,toggleCategory:m,manualTopic:p,setManualTopic:x,bg360Image:v,bg360Enabled:g,setBg360Enabled:b,bg360Analysis:M,is360Analyzing:A,customLocation:S,setCustomLocation:y,customOutfit:R,setCustomOutfit:O,punchlineType:U,setPunchlineType:G,isSearching:I,generateScenarioFromNews:B,scenarioThought:w,scenario:F,setScenario:$,isScenarioCopied:k,setIsScenarioCopied:X,originalScenario:te,isEnhancePanelOpen:oe,setIsEnhancePanelOpen:V,enhanceExpressions:L,setEnhanceExpressions:z,enhanceBodyLang:W,setEnhanceBodyLang:ce,enhanceEffects:ge,setEnhanceEffects:P,enhanceBackgrounds:Z,setEnhanceBackgrounds:_e,enhanceCameraWork:Ae,setEnhanceCameraWork:Oe,enhanceDialogue:ee,setEnhanceDialogue:Ee,isEnhancing:we,enhanceScenario:Ge,revertScenario:Ze,enhanceLog:Ke,showStatus:At,styleJson:ut}){return _.jsxs("section",{ref:r,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
        ${e===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
        ${e>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(e<2||i)&&_.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),_.jsx("div",{className:"flex items-center justify-between",children:_.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${e===2?"text-purple-400":"text-slate-500"} `,children:[_.jsx(zS,{size:18})," STEP 02: シナリオ構築設定（ストーリー設定）"]})}),_.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[_.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[_.jsxs("button",{onClick:()=>l("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[_.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),_.jsxs("button",{onClick:()=>l("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[_.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),s==="news"?_.jsxs("div",{className:"space-y-4",children:[_.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[_.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),_.jsx("input",{type:"date",value:c,onChange:je=>u(je.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),_.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[_.jsx("div",{className:"col-span-2 lg:col-span-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),h.map(je=>_.jsxs("label",{className:`
                    relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5
                    ${je.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
                  `,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:je.checked,onChange:()=>m(je.id)}),je.checked&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-2 ${je.checked?"scale-110":"opacity-70 grayscale"} `,children:je.icon}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:je.label})]})]},je.id))]}),_.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",h.filter(je=>je.checked).map(je=>je.keywords).join(" ")||"なし"," (対象日付: ",c,")"]})]}):_.jsxs("div",{className:"space-y-2",children:[_.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力：描きたいテーマや、ニュースのURLを自由に入力してください (",_.jsx("span",{className:"text-blue-400",children:"URLからの自動読み込みに対応"}),")"]}),_.jsx("textarea",{value:p,onChange:je=>x(je.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※WebサイトのURLを入力すると、AIがそのページの内容を読み込んで漫画化します。\r
ニュース記事を直接コピー＆ペーストするか、作りたいお話のイメージを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),_.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[_.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${v&&g?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[_.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:v&&g?"#67e8f9":"#ffffff"},children:[_.jsx(Zl,{size:14}),v&&g?"🌐 360°背景 (ON)":"指定場所（背景の指定）",_.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[A&&_.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[_.jsx(Qi,{size:10,className:"animate-spin"})," 解析中..."]}),v&&_.jsx("button",{onClick:je=>{je.preventDefault(),b(!g),At(g?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${g?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:g?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:g?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!v&&_.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),v&&g?_.jsxs("div",{className:"space-y-2",children:[_.jsx(Ub,{imageSrc:v,height:160}),M&&_.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[_.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",M.location]}),_.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",M.lighting]}),_.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:M.spatialType==="indoor"?"🏠 室内":M.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),M.mood&&_.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",M.mood]})]}),_.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):_.jsx("input",{type:"text",value:S,onChange:je=>y(je.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船... (空欄ならAIにおまかせ)"})]}),_.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[_.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[_.jsx(lp,{size:14})," 指定服装（コスチューム指定） ",_.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),_.jsx("input",{type:"text",value:R,onChange:je=>O(je.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート通り / 全員水着 / ミリタリー装備... (空欄ならAIにおまかせ)"})]}),_.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[_.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[_.jsx("span",{children:"🎬"})," ストーリーの結末（オチの方向性） ",_.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※ストーリー展開の指定"})]}),_.jsxs("select",{value:U,onChange:je=>G(je.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[_.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),_.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),_.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),_.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),_.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),_.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),_.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),_.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),_.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),_.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),_.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),_.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),_.jsx("button",{onClick:B,disabled:I||e<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:I?_.jsxs(_.Fragment,{children:[_.jsx(Qi,{size:24,className:"animate-spin"}),_.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):_.jsxs(_.Fragment,{children:[_.jsx(Zu,{size:24,className:"fill-yellow-400 text-black"}),_.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),_.jsx(ql,{size:24,className:"opacity-60"})]})})]}),_.jsxs("div",{className:"space-y-4 mt-6",children:[w&&_.jsx("div",{className:"mt-4",children:_.jsx(Ju,{thought:w})}),_.jsxs("div",{className:"flex flex-col gap-2",children:[_.jsxs("div",{className:"flex items-center gap-3",children:[_.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されたシナリオ (自由に編集・書き換えができます)"}),ut&&F&&F.length>20&&_.jsxs("span",{className:"px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-[10px] font-bold border border-purple-500/30 flex items-center gap-1 shadow-sm",children:[_.jsx(lp,{size:10})," 作風適用済: ",ut.style_name]})]}),_.jsx("textarea",{value:F,onChange:je=>$(je.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 他のアプリ（Story Maker等）で作成したシナリオをここに直接貼り付けて進めることもできます。（貼り付ける際は Topic: / Location: / Outfit: / Punchline: / Scenario: などの形式に合わせてください）"}),_.jsx("div",{className:"mt-2 relative z-50",children:_.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(F),X(!0),setTimeout(()=>X(!1),2e3)},disabled:!F,className:`w-full ${k?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[k?_.jsx(ha,{size:20}):_.jsx(Kl,{size:20}),k?"コピー完了":"📋 シナリオをコピー"]})})]}),_.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${F&&F.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[_.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>F&&F.length>20&&V(!oe),children:[_.jsxs("div",{className:"flex items-center gap-2",children:[_.jsx("span",{className:"text-base",children:"🔥"}),_.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),_.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),te&&_.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),_.jsxs("div",{className:"flex items-center gap-2",children:[_.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:F&&F.length>20?oe?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),_.jsx(Fv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${oe?"rotate-180":""}`})]})]}),oe&&F&&F.length>20&&_.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[_.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成されたシナリオの演出（カメラワークや表情など）をさらに大げさ・詳細に強化します。強化したい項目をONにして「シナリオ強化実行」を押してください。",_.jsx("br",{}),_.jsx("span",{className:"text-orange-300 font-bold",children:"💡 何度も実行すると効果が重なり、よりパワフル（カオス）な展開になります。"}),_.jsx("br",{}),"⚠️ 演出を過激にしすぎると、画像生成時に安全基準（ポリシー制限）にかかる場合があります。その際は画像生成画面の救済機能をお使いください。"]}),_.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${L?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:L,onChange:()=>z(!L)}),L&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${L?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${W?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:W,onChange:()=>ce(!W)}),W&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${W?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ge?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:ge,onChange:()=>P(!ge)}),ge&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${ge?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Z?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:Z,onChange:()=>_e(!Z)}),Z&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${Z?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ae?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:Ae,onChange:()=>Oe(!Ae)}),Ae&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${Ae?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),_.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ee?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[_.jsx("input",{type:"checkbox",className:"hidden",checked:ee,onChange:()=>Ee(!ee)}),ee&&_.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:_.jsx(ha,{size:12,strokeWidth:4})}),_.jsxs("div",{className:"text-center",children:[_.jsx("div",{className:`text-2xl mb-1 ${ee?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),_.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),_.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),_.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[L&&"表情",W&&"身体",ge&&"演出",Z&&"背景",Ae&&"カメラ",ee&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),_.jsxs("div",{className:"flex gap-2",children:[_.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:Ge,disabled:we||!(L||W||ge||Z||Ae||ee),children:we?_.jsxs(_.Fragment,{children:[_.jsx(Qi,{size:16,className:"animate-spin"})," 強化中..."]}):_.jsxs(_.Fragment,{children:[_.jsx(Zu,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),_.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${te?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:Ze,disabled:we||!te,children:"↩️ 強化前に戻す"})]}),_.jsx(Ju,{thought:Ke||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})}function JC({step3Ref:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,is360CameraWorking:c,assemblePrompt:u,isAssembling:h}){return _.jsxs("section",{ref:r,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
        ${e===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
        ${e>3?"border border-orange-500/30 opacity-100":""}
      `,children:[(e<3||i||s||l||c)&&_.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:c&&e>=3&&_.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[_.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),_.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),_.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),_.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${e===3?"text-orange-400":"text-slate-500"}`,children:[_.jsx(up,{size:24})," STEP 03: プロンプト生成（画像指示文の構築）"]}),_.jsx("button",{onClick:u,disabled:h||c,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
          ${e===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
        `,children:h?_.jsxs(_.Fragment,{children:[_.jsx(Qi,{size:24,className:"animate-spin"}),_.jsx("span",{className:"animate-pulse",children:"指示文（プロンプト）を構築中..."})]}):_.jsxs(_.Fragment,{children:[_.jsx(up,{size:24,className:`text-blue-600 ${e===3?"animate-bounce":""} `}),_.jsx("span",{children:"画像用の指示文（プロンプト）を構築する (STEP 3)"}),_.jsx(ql,{size:24,className:"opacity-60"})]})})]})}function e2({outputRef:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,finalPrompt:c,copyPrompt:u,assembleThought:h,enableChatGPTMode:m,selectedEngine:p,bg360Image:x,bg360Analysis:v,bg360Enabled:g,bg360CameraWork:b,bg360CroppedPanels:M,isCopied:A,isMetaSaved:S,setIsMetaSaved:y,castList:R,scenario:O,punchlineType:U,colorMode:G,enhanceExpressions:I,enhanceBodyLang:B,enhanceEffects:w,enhanceBackgrounds:F,enhanceCameraWork:$,enhanceDialogue:k,SYSTEM_VERSION:X,isAssembling:te,regenerateImage:oe,isGeneratingImage:V,isFixPromptCopied:L,setIsFixPromptCopied:z,isPolicyPanelOpen:W,setIsPolicyPanelOpen:ce,isPolicyCopied:ge,setIsPolicyCopied:P,policyErrorMsg:Z,setPolicyErrorMsg:_e,regenerateSafePrompt:Ae,isFixingPolicy:Oe,policyFixLog:ee,genLogRef:Ee,genLog:we,imageResultRef:Ge,generatedImage:Ze,isFullAutoMode:Ke,fullAutoStep:At,mangaTitle:ut,isFallbackUsed:je,enableOpenAIApi:Dt,setGeneratedImage:xt,generationHistory:mn,setGenerationHistory:Kt,showPolicyChoice:kt,policyAutoRetrying:q,handlePolicyAutoFix:yt,handlePolicySwitchToWeb:vt,MAX_POLICY_RETRIES:Et}){return _.jsxs("div",{ref:r,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(e<3||i||s||l)&&_.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),_.jsxs("section",{className:"relative group h-full",children:[_.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),_.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[_.jsx("div",{className:"flex items-center justify-between mb-4",children:_.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[_.jsx("button",{onClick:u,disabled:!c,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:_.jsx(Kl,{size:14})}),_.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),_.jsx(Ju,{thought:h,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),_.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[_.jsx("div",{className:"relative flex-1",children:_.jsx("textarea",{value:c,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 上の「画像用の指示文（プロンプト）を構築する」ボタンを押すと、ここに生成された指示文（プロンプト）が表示されます。"})}),_.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[x&&v&&g&&c&&_.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[_.jsx("div",{className:"flex items-start gap-4",children:_.jsxs("div",{className:"flex-1 space-y-1",children:[_.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[_.jsx(Zl,{size:12})," 🌐 360°背景モード (ON)"]}),_.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",_.jsx("br",{}),_.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),_.jsx("br",{}),_.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),_.jsx("br",{}),_.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),_.jsx(Ub,{imageSrc:x,height:120}),_.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),b&&M&&M.length===4&&_.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[_.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),_.jsx("div",{className:"grid grid-cols-4 gap-2",children:b.panels.map((ve,Vt)=>{const T=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((ve.yaw%360+360)%360/45)%8];return _.jsxs("div",{className:"relative",children:[_.jsx("img",{src:M[Vt],alt:`Panel ${ve.panel} - ${T}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),_.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[_.jsxs("span",{className:"font-bold",children:["コマ",ve.panel]})," ",T," ",_.jsxs("span",{className:"text-slate-400",children:["FOV",ve.fov,"°"]})]})]},Vt)})}),_.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),_.jsxs("button",{onClick:u,disabled:!c,className:`w-full ${A?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[A?_.jsx(ha,{size:20}):_.jsx(Kl,{size:20}),A?"コピー完了！":"📋 プロンプトをコピーする"]}),c&&_.jsx("div",{className:"text-[11px] text-slate-400 mt-1 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-white/5",children:p==="openai"?x&&g?_.jsxs("span",{children:["💡 ",_.jsx("strong",{children:"【手動生成用】"})," コピーしたプロンプトを ",_.jsx("strong",{children:"ChatGPT公式Web版"})," に貼り付け、",_.jsx("strong",{children:"キャラクターシート画像"})," と ",_.jsx("strong",{children:"360°背景画像"})," を一緒に添付して送信してください。"]}):_.jsxs("span",{children:["💡 ",_.jsx("strong",{children:"【手動生成用】"})," コピーしたプロンプトを ",_.jsx("strong",{children:"ChatGPT公式Web版"})," に貼り付け、",_.jsx("strong",{children:"キャラクターシート画像"})," を一緒に添付して送信してください。"]}):m?_.jsxs("span",{children:["💡 ",_.jsx("strong",{children:"【手動生成用（ChatGPT専用）】"})," コピーしたプロンプトを ",_.jsx("strong",{children:"ChatGPT公式Web版"})," に貼り付け、",_.jsx("strong",{children:"キャラクターシート画像"}),"（および360°背景画像）を一緒に添付して送信してください。（※毎回新しいチャットで生成することを推奨）"]}):x&&g?_.jsxs("span",{children:["💡 ",_.jsx("strong",{children:"【手動生成用】"})," コピーしたプロンプトを外部の ",_.jsx("strong",{children:"Gemini公式Web版"})," などに貼り付け、",_.jsx("strong",{children:"キャラクターシート画像"})," と ",_.jsx("strong",{children:"360°背景画像"})," を一緒に添付して送信してください。"]}):_.jsxs("span",{children:["💡 ",_.jsx("strong",{children:"【手動生成用】"})," コピーしたプロンプトを外部の ",_.jsx("strong",{children:"Gemini公式Web版"})," などに貼り付け、",_.jsx("strong",{children:"キャラクターシート画像"})," を一緒に添付して送信してください。"]})}),_.jsx("button",{onClick:()=>{const ve=new Date,Vt=p==="openai"?"ChatGPT Engine (自動)":m?"ChatGPT専用プロンプト":"Gemini用プロンプト",D={ファイル情報:{フォーマットバージョン:1,アプリバージョン:X,保存日時:ve.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:ve.toISOString()},プロンプト判別:{モード:Vt,AIエンジン:p==="openai"?"ChatGPT":"Gemini",ChatGPTモード:m,説明:p==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":m?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:R||"(未解析)",シナリオ:O||"(未生成)",最終プロンプト:c||"(未生成)",生成設定:{パンチラインタイプ:U,カラーモード:G,強化オプション:{表情強化:I,ボディランゲージ強化:B,"照明・演出強化":w,背景強化:F,カメラワーク強化:$,"セリフ・ギャグ強化":k},"360度背景":{画像読込:!!x,有効:g,場所:v?.location||"(未解析)",空間タイプ:v?.spatialType||"(未解析)",光源:v?.lighting||"(未解析)"}}},T=JSON.stringify(D,null,2),J=new Blob([T],{type:"application/json;charset=utf-8"}),me=URL.createObjectURL(J),Te=document.createElement("a");Te.href=me;const ye=O?.match(/タイトル[:：]\s*(.+)/),Ue=ye?ye[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",fe=`${String(ve.getFullYear()).slice(-2)}${String(ve.getMonth()+1).padStart(2,"0")}${String(ve.getDate()).padStart(2,"0")}${String(ve.getHours()).padStart(2,"0")}${String(ve.getMinutes()).padStart(2,"0")}${String(ve.getSeconds()).padStart(2,"0")}`;Te.download=`AI_4-koma_metadata_${Ue}_${fe}.json`,document.body.appendChild(Te),Te.click(),document.body.removeChild(Te),URL.revokeObjectURL(me),y(!0),setTimeout(()=>y(!1),2500)},disabled:!c,className:`w-full ${S?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${S?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${S?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:S?"保存完了！":"📂 設定ファイルを保存 (JSON)"})]}),_.jsxs("div",{className:"relative mt-2",children:[!te&&!c&&_.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),_.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",_.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),_.jsxs("button",{onClick:oe,disabled:!c||V||Oe,className:`w-full ${p==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[V?_.jsx(Qi,{size:20,className:"animate-spin"}):_.jsx(Bv,{size:20}),_.jsx("div",{className:"flex flex-col items-center",children:_.jsx("span",{children:V?"画像を生成中...":`画像を生成する (STEP 4: ${p==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),_.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ このアプリ経由の自動生成では、キャラクター設定や背景の画像を直接添付できないため、",_.jsx("span",{className:"text-amber-400/80",children:"文章（テキスト）のみを元にした「おまかせ生成」"}),"になります。 キャラクターの見た目や背景を正確に再現したい場合は、下の ",_.jsx("span",{className:"text-orange-300",children:"💡 コツ（プロのやり方）"})," を参考に、ブラウザ版での手動生成をお試しください。"]}),_.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:_.jsxs("div",{className:"flex items-start gap-2",children:[_.jsx("div",{className:"mt-0.5 text-orange-400",children:_.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[_.jsx("circle",{cx:"12",cy:"12",r:"10"}),_.jsx("path",{d:"M12 16v-4"}),_.jsx("path",{d:"M12 8h.01"})]})}),_.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[_.jsx("span",{className:"font-bold text-orange-300",children:"💡 コツ（プロのやり方）：完璧な4コマ漫画を作りたい時は？"}),_.jsx("br",{}),p==="openai"?_.jsxs(_.Fragment,{children:["キャラクターの見た目が崩れたり、背景がイメージと異なる場合は、上の「コピー」ボタンでプロンプトをコピーし、公式の ",_.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTウェブ版 🤖"})," に",_.jsx("strong",{children:"「元のキャラクター設定画像（および360°背景画像）」"}),"と一緒に直接貼り付けて送信してください。",_.jsx("br",{}),"画像そのものを参照して生成するため、キャラクターのクオリティや再現度が劇的に向上します！",_.jsx("br",{}),_.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",_.jsx("strong",{children:"ChatGPTの仕様上、縦に細長すぎる画像になってしまう場合"}),"は、ChatGPT側の「アスペクト比」ボタンで手動修正するのではなく、以下の「画像比率修正プロンプト」をコピーしてChatGPTに貼り付けてみてください。綺麗な4コマの形に修正されます。"]})]}):_.jsxs(_.Fragment,{children:["キャラクターの見た目が崩れたり、背景がイメージと異なる場合は、上の「コピー」ボタンでプロンプトをコピーし、公式の ",_.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiウェブ版 🤖"})," に",_.jsx("strong",{children:"「元のキャラクター設定画像（および360°背景画像）」"}),"と一緒に直接貼り付けて送信してください。",_.jsx("br",{}),"画像そのものを参照して生成するため、キャラクターのクオリティや再現度が劇的に向上します！"]}),p==="openai"&&_.jsx("div",{className:"mt-3 block w-full",children:_.jsxs("button",{className:`mt-2 ${L?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const ve=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

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
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${X}"
- Bottom-Left watermark: "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" (Use an extremely small font size to prevent it from overlapping with the right watermark)
- Both MUST be horizontal text (left-to-right). NEVER rotate 90 degrees. Make sure they do not overlap.
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
No explanations. No partial results.`;navigator.clipboard.writeText(ve),z(!0),setTimeout(()=>z(!1),2e3)},children:["📋 画像比率修正プロンプトをコピー",L&&_.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),kt&&_.jsxs("div",{className:"mt-4 bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/40 rounded-xl p-5 space-y-3 shadow-lg shadow-red-900/20",children:[_.jsxs("div",{className:"flex items-center gap-2 text-red-300 font-bold",style:{fontSize:"14px"},children:[_.jsx(cp,{size:20,className:"text-red-400 animate-pulse"}),_.jsx("span",{children:"⚠️ 画像生成が制限されました（ポリシー制限）"})]}),_.jsx("p",{className:"text-yellow-200/80 leading-relaxed",style:{fontSize:"12px"},children:"表現の一部がAIの安全基準（ポリシー）に触れたため、画像の生成がスキップされました。以下の方法で解決できます："}),_.jsxs("div",{className:"flex flex-col sm:flex-row gap-2",children:[_.jsx("button",{className:"flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 border border-blue-400/30",style:{fontSize:"12px"},onClick:yt,disabled:q||Oe||V,children:q?_.jsxs(_.Fragment,{children:[_.jsx(Qi,{size:16,className:"animate-spin"})," 自動修正中..."]}):_.jsxs(_.Fragment,{children:[_.jsx(om,{size:16})," 自動修正して再生成する"]})}),_.jsxs("button",{className:"flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10",style:{fontSize:"12px"},onClick:vt,disabled:q||V,children:[_.jsx(FS,{size:16})," Web版に切り替える"]})]}),_.jsx("p",{className:"text-slate-400",style:{fontSize:"10px"},children:"💡 「自動修正して再生成する」を選ぶと、AIが安全な表現に言葉を書き換えて再度作り直します。"})]}),_.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${c?"":"opacity-40 pointer-events-none"}`,children:[_.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>ce(!W),disabled:!c,children:[_.jsxs("div",{className:"flex items-center gap-2",children:[_.jsx("span",{className:"text-base",children:"🛡️"}),_.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"安全基準（ポリシー）に引っかかって画像が出ない場合"}),!c&&_.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),_.jsxs("div",{className:"flex items-center gap-2",children:[_.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:W?"クリックで閉じる":"クリックで開く"}),_.jsx(Fv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${W?"rotate-180":""}`})]})]}),W&&_.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[_.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[_.jsxs("p",{children:["下の ",_.jsx("strong",{className:"text-yellow-100",children:"「質問メッセージをコピー」"})," ボタンを押し、ChatGPTやGeminiのチャット欄に貼り付けて送信すると、具体的な制限の原因を教えてもらえます。"]}),_.jsxs("p",{children:["AIから返ってきた回答を下の入力欄に貼り付けると、 ",_.jsx("strong",{className:"text-yellow-100",children:"「表現を調整したプロンプトを再生成する」"})," ボタンが押せるようになります。"]})]}),_.jsxs("button",{className:`${ge?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),P(!0),setTimeout(()=>P(!1),2e3)},children:[_.jsx("span",{style:{visibility:ge?"hidden":"visible"},children:"📋 制限の理由を尋ねる質問をコピー"}),ge&&_.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),_.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Z,onChange:ve=>_e(ve.target.value),placeholder:p==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),_.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ae,disabled:Oe||V||!Z.trim()||!c,children:Oe?_.jsxs(_.Fragment,{children:[_.jsx(Qi,{size:16,className:"animate-spin"})," 分析・修正中..."]}):_.jsxs(_.Fragment,{children:[_.jsx(up,{size:16})," 表現をマイルドに修正して再生成する"]})}),_.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:ee||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),_.jsxs("div",{ref:Ee,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[_.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[_.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),_.jsx("span",{className:p==="openai"?"text-emerald-500":"text-blue-500",children:p==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),we.length===0?_.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):we.map((ve,Vt)=>_.jsx("div",{className:"mb-1 leading-relaxed",children:ve},Vt)),V&&_.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),_.jsxs("section",{ref:Ge,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!Ze&&!V||i||te||l||Ke&&At>0&&At<4)&&!V&&_.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(i||te||l||Ke&&At>0&&At<4)&&_.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[_.jsx(Qi,{size:36,className:"animate-spin text-blue-500"}),_.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:i||te?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),V&&_.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:_.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[_.jsx(Qi,{size:64,className:"animate-spin text-blue-500 mx-auto"}),_.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),_.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[_.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",_.jsxs("span",{className:"flex space-x-1",children:[_.jsx("span",{className:"animate-bounce delay-75",children:"."}),_.jsx("span",{className:"animate-bounce delay-150",children:"."}),_.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),_.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",_.jsx("br",{}),_.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",_.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),_.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:ut?_.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:ut}):_.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),_.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:Ze?_.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[_.jsx("img",{src:Ze,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),je&&_.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:_.jsxs("div",{className:"flex items-start gap-3",children:[_.jsx(cp,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),_.jsxs("div",{className:"text-sm",children:[_.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【ご案内】混雑のため一時的に簡易モデルで生成されました"}),_.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が大変混み合っているため、一時的に自動バックアップ用のモデルで画像を生成しました。",_.jsx("br",{}),"このため、",_.jsx("span",{className:"text-white font-bold",children:"セリフの文字化けや、キャラクターの見た目のズレ"})," が発生しやすくなっています。"]}),_.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[_.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質・正確なキャラクターで生成する手順："}),_.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[_.jsxs("li",{children:["画面左側の「",_.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピーする"}),"」ボタンを押します。"]}),_.jsxs("li",{children:[_.jsx("a",{href:Dt?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:Dt?"ChatGPTウェブ版":"Geminiウェブ版"})," を開きます。"]}),_.jsx("li",{children:"コピーした文章を貼り付け、元のキャラクターシート画像を一緒に添付して送信してください。"})]})]})]})]})}),_.jsxs("div",{className:"w-full px-8 mt-2",children:[_.jsxs("button",{onClick:()=>{const ve=document.createElement("a");ve.href=Ze,ve.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(ve),ve.click(),document.body.removeChild(ve)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[_.jsx(US,{size:20})," 画像をダウンロード (.png)"]}),_.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):_.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[_.jsx(rm,{size:80,className:"mx-auto"}),_.jsxs("div",{className:"space-y-2 text-center",children:[_.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),_.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]})]})}function t2({controlBarRef:r,currentStep:e,apiKey:i,isEndlessMode:s,setIsEndlessMode:l,isEndlessModeRef:c,isAborting:u,handleFullAutoToggle:h,isFullAutoMode:m,selectedEngine:p,enableOpenAIApi:x,isPolicyCopied:v,setIsPolicyCopied:g,showStatus:b}){return _.jsxs("div",{ref:r,className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[_.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[_.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${i?"opacity-100":"opacity-30"}`,children:[_.jsxs("div",{className:`flex items-center gap-1.5 ${e>=1?"opacity-100":"opacity-40"}`,children:[_.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${e===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":e>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:e>1?_.jsx(Fo,{size:16}):"1"}),_.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),_.jsx(ql,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),_.jsxs("div",{className:`flex items-center gap-1.5 ${e>=2?"opacity-100":"opacity-40"}`,children:[_.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${e===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":e>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:e>2?_.jsx(Fo,{size:16}):"2"}),_.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),_.jsx(ql,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),_.jsxs("div",{className:`flex items-center gap-1.5 ${e>=3?"opacity-100":"opacity-40"}`,children:[_.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${e===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":e>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:e>3?_.jsx(Fo,{size:16}):"3"}),_.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),_.jsx(ql,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),_.jsxs("div",{className:`flex items-center gap-1.5 ${e>=4?"opacity-100":"opacity-40"}`,children:[_.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${e===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":e>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:e>4?_.jsx(Fo,{size:16}):"4"}),_.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),_.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),_.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[_.jsxs("button",{disabled:!i||u,onClick:()=>{const M=!s;l(M),c&&(c.current=M)},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:s?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${s?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[_.jsx(om,{size:14,className:s?"animate-spin":"",style:{animationDuration:"3s"}}),_.jsx("span",{className:"whitespace-nowrap",children:s?"🔁 連続ループ生成を解除":"🔁 連続ループ生成 ON"})]}),_.jsxs("button",{disabled:!i||u,onClick:h,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:m?u?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${m?u?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!i&&!u?"opacity-50 cursor-not-allowed":""}`,children:[m?u?_.jsx(Qi,{size:14,className:"animate-spin"}):_.jsx(KS,{size:14,fill:"currentColor"}):_.jsx(Zu,{size:14}),m?u?"停止処理中...":"全自動モード 中断":"⚡ 全自動モード（フルオート） ON"]}),_.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),_.jsxs("div",{className:`flex flex-col justify-center text-[10px] leading-relaxed max-w-[650px] text-center sm:text-left transition-opacity duration-300 ${i?"text-slate-400":"text-slate-600 opacity-40"}`,children:[_.jsx("span",{className:"whitespace-normal text-slate-300 font-bold",children:"💡 全自動モード（フルオート）の使い方："}),_.jsx("span",{className:"whitespace-normal",children:"・「⚡ 全自動モード ON」にして画像をドロップ（またはドロップ後にON）すると、4コマ漫画を全自動で最後まで生成します。"}),_.jsx("span",{className:"whitespace-normal",children:"・途中で中断したい場合は同じボタンで停止できます。以降は手動（各STEPボタン）で進行可能です。"}),_.jsx("span",{className:"whitespace-normal",children:"・「連続ループ生成」をONにすると、自動生成完了後に自動で次の作品（別のシナリオ）を永遠に作り続けます。"})]})]})]}),(p==="openai"||x)&&_.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:_.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
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
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),g(!0),setTimeout(()=>g(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${v?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[_.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[v?_.jsx(Fo,{size:16}):_.jsx(Kl,{size:16}),_.jsx("span",{className:"whitespace-nowrap",children:v?"コピー完了！":"🎬 ChatGPT用 1枚絵エモーショナルプロンプトをコピー"})]}),_.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】プロンプトをコピーしてChatGPTのチャット欄に貼り付け、元のキャラクター画像と一緒に送信すると、シネマチックで感情豊かなイラストが生成されます。"})]})}),_.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:_.jsx("div",{className:`h-full transition-all duration-700 ease-out
          ${e===1?"w-1/4 bg-blue-500":e===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":e===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":e>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
        `})})]})}function n2({SYSTEM_VERSION:r,apiKey:e,selectedEngine:i,partialReset:s,hardReset:l,usedModel:c,getModelBadgeInfo:u}){return _.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[_.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),_.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:_.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:_.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[_.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[_.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:_.jsx(rm,{size:28,className:"text-white"})}),_.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",_.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",_.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:r})]})]}),_.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[_.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),_.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${e?i==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[_.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${e?i==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),e?i==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),e&&_.jsxs("div",{className:"flex items-center gap-2",children:[_.jsxs("button",{onClick:s,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター設定は残したまま、シナリオ・指示文・画像をリセットして新しく作り直します",children:[_.jsx(om,{size:12})," シナリオから作り直す"]}),_.jsxs("button",{onClick:l,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"すべてのデータを削除し、最初のAPIキー入力画面に戻ります（AIエンジンの切り替えもここで行えます）",children:[_.jsx(jS,{size:12})," 最初からやり直す（設定クリア）"]})]})]}),c&&(()=>{const h=u(c);return h?_.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${h.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[_.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:h.label}),_.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),_.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:h.desc}),_.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[_.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),_.jsxs("p",{children:["現在 ",_.jsx("span",{className:"font-mono text-blue-300",children:c})," を使用中。"]}),h.tier==="Lite"&&_.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[_.jsx(cp,{size:10,className:"absolute top-2 right-2"}),_.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 一時的な接続制限モード"}),"APIアクセス制限を回避するため、自動的に軽量モデル（低消費）に切り替えています。画像やシナリオの品質が一時的に低下する場合がありますが、しばらくお待ちいただくと自動的に元の最高品質に戻ります。"]})]})]}):null})()]})})})]})}function i2({scenario:r,bg360Image:e,bg360Analysis:i,bg360Enabled:s,customLocation:l,customOutfit:c,punchlineType:u,getPunchlineLabel:h}){return _.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
      ${r?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
    `,children:[_.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[_.jsx(lp,{size:14})," ",e?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),_.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",_.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",_.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",_.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const m=r?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",p=r?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",x=r?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",v=!!e&&!!i&&s,g=v?"背景 (Background)":"場所 (Location)",b=v?m||i?.location||"360°画像":m||l.trim()||"AIおまかせ",M=v?"画像解析":l.trim()?"手入力":"AIおまかせ",A=v?"#67e8f9":l.trim()?"#ffffff":"#93c5fd",S=v?"rgba(6,182,212,0.3)":l.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",y=v?"#67e8f9":l.trim()?"#d1d5db":"#93c5fd",R=v?"rgba(6,182,212,0.4)":l.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return _.jsxs(_.Fragment,{children:[_.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[v?_.jsx(Zl,{size:12,className:"text-cyan-400"}):_.jsx(Zl,{size:12,className:"text-blue-400"}),_.jsxs("span",{children:[g,":"]}),_.jsx("span",{style:{fontWeight:"bold",color:A},children:b}),_.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:S,color:y,border:`1px solid ${R}`},children:M})]}),_.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[_.jsx("span",{className:"text-green-400",children:"👕"}),_.jsx("span",{children:"服装 (Outfit):"}),_.jsx("span",{style:{fontWeight:"bold",color:c.trim()?"#ffffff":"#93c5fd"},children:p||c.trim()||"AIおまかせ"}),_.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:c.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:c.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${c.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:c.trim()?"手入力":"AIおまかせ"})]}),_.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[_.jsx("span",{className:"text-yellow-400",children:"🎬"}),_.jsx("span",{children:"オチ (Punchline):"}),_.jsx("span",{style:{fontWeight:"bold",color:x||u!=="Auto"?"#ffffff":"#93c5fd"},children:x||(u==="Auto"?"AIおまかせ":h(u))}),_.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:u!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:u!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${u!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:u!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]})}function a2({generationHistory:r,setGenerationHistory:e,generatedImage:i,setGeneratedImage:s,isSearching:l,isAssembling:c,isGeneratingImage:u,isEnhancing:h,isFullAutoMode:m,fullAutoStep:p}){if(r.length===0)return null;const x=l||c||u||h||m&&p>0&&p<4;return _.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[x&&_.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:_.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[_.jsx(Qi,{size:12,className:"animate-spin"})," 生成中..."]})}),_.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[_.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[_.jsx(Bv,{size:14,className:"text-blue-400"}),"生成履歴 (",r.length,")"]}),_.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(e([]),s(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[_.jsx(Ku,{size:12})," 全削除"]})]}),_.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:r.map(v=>_.jsxs("div",{onClick:()=>s(v.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${i===v.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[_.jsx("img",{src:v.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),i===v.img&&_.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:_.jsx(Fo,{size:10,strokeWidth:3})}),_.jsx("div",{onClick:g=>{g.stopPropagation(),e(b=>b.filter(M=>M.id!==v.id)),i===v.img&&s("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:_.jsx(Ku,{size:10})})]},v.id))})]})}console.log("HELLO_USER_FIXED_VERSION_2_25");function s2(){const{analyzeThought:r,apiKey:e,assemblePrompt:i,assembleThought:s,bg360Analysis:l,bg360CameraWork:c,bg360CroppedPanels:u,bg360Enabled:h,bg360Image:m,castList:p,categories:x,colorMode:v,copyPrompt:g,currentStep:b,customLocation:M,customOutfit:A,enableChatGPTMode:S,enableOpenAIApi:y,enhanceBackgrounds:R,enhanceBodyLang:O,enhanceCameraWork:U,enhanceDialogue:G,enhanceEffects:I,enhanceExpressions:B,enhanceLog:w,enhanceScenario:F,finalPrompt:$,fullAutoStep:k,genLog:X,genLogRef:te,generateScenarioFromNews:oe,generatedImage:V,generationHistory:L,handleFullAutoToggle:z,handleSetKey:W,hardReset:ce,imageResultRef:ge,images:P,inputMode:Z,is360Analyzing:_e,is360CameraWorking:Ae,isAborting:Oe,isAnalyzing:ee,isAssembling:Ee,isCastListCopied:we,isCopied:Ge,isDragging:Ze,isEndlessMode:Ke,isEndlessModeRef:At,isEnhancePanelOpen:ut,isEnhancing:je,isFallbackUsed:Dt,isFixPromptCopied:xt,isFixingPolicy:mn,isFullAutoMode:Kt,isGeneratingImage:kt,isMetaSaved:q,isPolicyCopied:yt,isPolicyPanelOpen:vt,showPolicyChoice:Et,policyAutoRetrying:ve,handlePolicyAutoFix:Vt,handlePolicySwitchToWeb:D,MAX_POLICY_RETRIES:T,isScenarioCopied:J,isSearching:me,mangaTitle:Te,manualTopic:ye,originalScenario:Ue,outputRef:fe,partialReset:pe,policyErrorMsg:Le,policyFixLog:ze,processFiles:Ne,punchlineType:Pe,regenerateImage:rt,regenerateSafePrompt:ht,revertScenario:ct,scenario:j,scenarioThought:De,selectedEngine:he,setBg360Enabled:Ie,setCastList:Fe,setCustomLocation:Re,setCustomOutfit:We,setEnableOpenAIApi:it,setEnhanceBackgrounds:rn,setEnhanceBodyLang:Lt,setEnhanceCameraWork:Kn,setEnhanceDialogue:In,setEnhanceEffects:Bi,setEnhanceExpressions:ea,setGeneratedImage:ta,setGenerationHistory:zi,setImages:Un,setInputMode:gn,setIsCastListCopied:En,setIsDragging:li,setIsEndlessMode:na,setIsEnhancePanelOpen:Cn,setIsFixPromptCopied:wa,setIsMetaSaved:xa,setIsPolicyCopied:ci,setIsPolicyPanelOpen:Mi,setIsScenarioCopied:xi,setManualTopic:Ti,setPolicyErrorMsg:xn,setPunchlineType:Ai,setScenario:yn,setShowOpenAIKeyModal:Ra,setTargetDate:C,showModal:K,showOpenAIKeyModal:le,showStatus:ne,status:ie,step2Ref:He,step3Ref:Xe,styleJson:Be,setStyleJson:qe,targetDate:Ye,toggleCategory:Qe,usedModel:pt}=_M(),[Je,It]=Ce.useState(70),Wt=Ce.useRef(null);return Ce.useEffect(()=>{if(!Wt.current)return;const Ft=new ResizeObserver(Bt=>{for(let Ct of Bt){const Ve=Ct.borderBoxSize&&Ct.borderBoxSize[0]?Ct.borderBoxSize[0].blockSize:Ct.target.getBoundingClientRect().height;It(Ve+12)}});return Ft.observe(Wt.current),()=>{Ft.disconnect()}},[e,he,y,b]),_.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[_.jsx(D_,{isOpen:K,onSave:W,provider:"google"}),_.jsx(D_,{isOpen:le,onSave:Ft=>{const Bt=Ft.trim(),Ct=Qu();Bt===""&&Ct?(it(!0),ne("🔑 既存のOpenAI APIキーを適用しました。"),Ra(!1)):Bt.startsWith("sk-")?(fp(Bt),it(!0),ne("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Ra(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Ra(!1),Qu()||it(!1)},provider:"openai"}),_.jsx(t2,{controlBarRef:Wt,currentStep:b,apiKey:e,isEndlessMode:Ke,setIsEndlessMode:na,isEndlessModeRef:At,isAborting:Oe,handleFullAutoToggle:z,isFullAutoMode:Kt,selectedEngine:he,enableOpenAIApi:y,isPolicyCopied:yt,setIsPolicyCopied:ci,showStatus:ne}),_.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[_.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),_.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),_.jsxs("div",{style:{paddingTop:`${Je}px`},className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 space-y-8 md:px-10 md:pb-10",children:[_.jsx(n2,{SYSTEM_VERSION:Ql,apiKey:e,selectedEngine:he,partialReset:pe,hardReset:ce,usedModel:pt,getModelBadgeInfo:nE}),_.jsxs("main",{className:"space-y-8",style:{filter:e?"none":"blur(10px)",pointerEvents:e?"auto":"none",transition:"filter 0.5s ease"},children:[_.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[_.jsx(vM,{isDragging:Ze,setIsDragging:li,apiKey:e,processFiles:Ne,currentStep:b,isAnalyzing:ee,images:P,setImages:Un,bg360Image:m,bg360Enabled:h,analyzeThought:r,castList:p,setCastList:Fe,isCastListCopied:we,setIsCastListCopied:En,styleJson:Be,setStyleJson:qe}),_.jsx(QC,{step2Ref:He,currentStep:b,isAnalyzing:ee,inputMode:Z,setInputMode:gn,targetDate:Ye,setTargetDate:C,categories:x,toggleCategory:Qe,manualTopic:ye,setManualTopic:Ti,bg360Image:m,bg360Enabled:h,setBg360Enabled:Ie,bg360Analysis:l,is360Analyzing:_e,customLocation:M,setCustomLocation:Re,customOutfit:A,setCustomOutfit:We,punchlineType:Pe,setPunchlineType:Ai,isSearching:me,generateScenarioFromNews:oe,scenarioThought:De,scenario:j,setScenario:yn,isScenarioCopied:J,setIsScenarioCopied:xi,originalScenario:Ue,isEnhancePanelOpen:ut,setIsEnhancePanelOpen:Cn,enhanceExpressions:B,setEnhanceExpressions:ea,enhanceBodyLang:O,setEnhanceBodyLang:Lt,enhanceEffects:I,setEnhanceEffects:Bi,enhanceBackgrounds:R,setEnhanceBackgrounds:rn,enhanceCameraWork:U,setEnhanceCameraWork:Kn,enhanceDialogue:G,setEnhanceDialogue:In,isEnhancing:je,enhanceScenario:F,revertScenario:ct,enhanceLog:w,showStatus:ne,styleJson:Be})]}),_.jsx(i2,{scenario:j,bg360Image:m,bg360Analysis:l,bg360Enabled:h,customLocation:M,customOutfit:A,punchlineType:Pe,getPunchlineLabel:Gv}),_.jsx(JC,{step3Ref:Xe,currentStep:b,isSearching:me,isAnalyzing:ee,isEnhancing:je,is360CameraWorking:Ae,assemblePrompt:i,isAssembling:Ee}),_.jsx(e2,{outputRef:fe,currentStep:b,isSearching:me,isAnalyzing:ee,isEnhancing:je,finalPrompt:$,copyPrompt:g,assembleThought:s,enableChatGPTMode:S,selectedEngine:he,bg360Image:m,bg360Analysis:l,bg360Enabled:h,bg360CameraWork:c,bg360CroppedPanels:u,isCopied:Ge,isMetaSaved:q,setIsMetaSaved:xa,castList:p,scenario:j,punchlineType:Pe,colorMode:v,enhanceExpressions:B,enhanceBodyLang:O,enhanceEffects:I,enhanceBackgrounds:R,enhanceCameraWork:U,enhanceDialogue:G,SYSTEM_VERSION:Ql,isAssembling:Ee,regenerateImage:rt,isGeneratingImage:kt,isFixPromptCopied:xt,setIsFixPromptCopied:wa,isPolicyPanelOpen:vt,setIsPolicyPanelOpen:Mi,isPolicyCopied:yt,setIsPolicyCopied:ci,policyErrorMsg:Le,setPolicyErrorMsg:xn,regenerateSafePrompt:ht,isFixingPolicy:mn,policyFixLog:ze,genLogRef:te,genLog:X,imageResultRef:ge,generatedImage:V,isFullAutoMode:Kt,fullAutoStep:k,mangaTitle:Te,isFallbackUsed:Dt,enableOpenAIApi:y,setGeneratedImage:ta,generationHistory:L,setGenerationHistory:zi,showPolicyChoice:Et,policyAutoRetrying:ve,handlePolicyAutoFix:Vt,handlePolicySwitchToWeb:D,MAX_POLICY_RETRIES:T}),_.jsx(a2,{generationHistory:L,setGenerationHistory:zi,generatedImage:V,setGeneratedImage:ta,isSearching:me,isAssembling:Ee,isGeneratingImage:kt,isEnhancing:je,isFullAutoMode:Kt,fullAutoStep:k})]}),_.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",_.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),ie&&_.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[_.jsx(ha,{size:18,className:"text-green-600"})," ",ie]}),_.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function r2(){return _.jsx(Kv,{children:_.jsx(s2,{})})}bS.createRoot(document.getElementById("root")).render(_.jsx(Ce.StrictMode,{children:_.jsx(Kv,{children:_.jsx(r2,{})})}));
