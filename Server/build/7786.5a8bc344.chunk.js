"use strict";(self.webpackChunkbongo_space_server=self.webpackChunkbongo_space_server||[]).push([[7786],{17786:(W,s,_)=>{_.r(s),_.d(s,{HomePageEE:()=>m});var a=_(92132),P=_(36437),n=_(11013),A=_(21272),C=_(55506),R=_(14718),i=_(36577),v=_(55151),U=_(79077),B=_(9310),t=_(15126),l=_(63299),L=_(67014),d=_(59080),I=_(79275),o=_(82437),T=_(61535),O=_(5790),E=_(12083),M=_(35223),K=_(5409),D=_(74930),h=_(2600),r=_(48940),f=_(41286),g=_(56336),S=_(13426),y=_(84624),N=_(77965),j=_(54257),H=_(71210),e=_(51187),V=_(39404),c=_(58692),x=_(501),F=_(57646),J=_(23120),$=_(44414),G=_(25962),z=_(14664),Y=_(42588),X=_(90325),Z=_(62785),Q=_(87443),u=_(41032),p=_(22957),k=_(93179),w=_(73055),b=_(15747),q=_(85306),__=_(26509),E_=_(32058),t_=_(81185),s_=_(82261),o_=_(40025),O_=_(67031);const m=()=>((0,n.u)(),(0,a.jsx)(P.HomePageCE,{}))},11013:(W,s,_)=>{_.d(s,{u:()=>B});var a=_(21272),P=_(55506),n=_(67031),A=_(54894),C=_(17703),R=_(9310);const i="strapi-notification-seat-limit",v="https://cloud.strapi.io/profile/billing",U="https://strapi.io/billing/request-seats",B=()=>{const{formatMessage:t}=(0,A.A)(),{license:l,isError:L,isLoading:d}=(0,R.m)(),I=(0,P.hN)(),{pathname:o}=(0,C.zy)(),{enforcementUserCount:T,permittedSeats:O,licenseLimitStatus:E,isHostedOnStrapiCloud:M}=l??{};a.useEffect(()=>{if(L||d)return;const K=!n(O)&&!window.sessionStorage.getItem(`${i}-${o}`)&&(E==="AT_LIMIT"||E==="OVER_LIMIT");let D;E==="OVER_LIMIT"?D="warning":E==="AT_LIMIT"&&(D="softWarning"),K&&I({type:D,message:t({id:"notification.ee.warning.over-.message",defaultMessage:"Add seats to {licenseLimitStatus, select, OVER_LIMIT {invite} other {re-enable}} Users. If you already did it but it's not reflected in Strapi yet, make sure to restart your app."},{licenseLimitStatus:E}),title:t({id:"notification.ee.warning.at-seat-limit.title",defaultMessage:"{licenseLimitStatus, select, OVER_LIMIT {Over} other {At}} seat limit ({enforcementUserCount}/{permittedSeats})"},{licenseLimitStatus:E,enforcementUserCount:T,permittedSeats:O}),link:{url:M?v:U,label:t({id:"notification.ee.warning.seat-limit.link",defaultMessage:"{isHostedOnStrapiCloud, select, true {ADD SEATS} other {CONTACT SALES}}"},{isHostedOnStrapiCloud:M})},blockTransition:!0,onClose(){window.sessionStorage.setItem(`${i}-${o}`,"true")}})},[I,l,o,t,d,O,E,T,M,L])}}}]);
