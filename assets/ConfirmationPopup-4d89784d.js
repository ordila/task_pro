import{r as $,d as v,u as c,k as w,b as E,bY as F,bi as B,f as z,o as T,j as e,bZ as D,b_ as M,b$ as A,c0 as R,c1 as N,c2 as O,c3 as g,c4 as x,c5 as m,c6 as j,c7 as S,I as P,c8 as U,g as I,c9 as Y,ca as _,cb as K,s as V,cc as W,cd as Z,ce as q,cf as b}from"./index-5d498084.js";import{a as G,I as H}from"./Image-ee123f25.js";import{B as J}from"./Button-b50e0bd8.js";const se=()=>{const[a,o]=$.useState(!1);return[a,(i=!a)=>{o(i)}]},y=["project","star","loading","puzzle-piece","container","lightning","colors","hexagon"],te=({boardId:a,handleCloseModal:o})=>{var h;const n=v(),i=c(w),r=E(),t=c(s=>F(s,a)),k=c(B),p=G.filter(s=>s.themes.includes(i)),{register:l,handleSubmit:f,formState:{errors:d,dirtyFields:C}}=z({resolver:T(Y),defaultValues:{title:t==null?void 0:t.title,icon:(t==null?void 0:t.icon)||y[0],backgroundImage:(t==null?void 0:t.backgroundImage)||p[0].key},mode:"onChange"}),u={width:28,height:28},L=s=>{a?r(_({newBoardBody:s,id:a})).unwrap().then(()=>{n(`/home/${s.title}`),o()}):r(K(s)).unwrap().then(()=>{n(`/home/${s.title}`),o()})};return e.jsxs(D,{children:[e.jsxs(M,{onSubmit:f(L),children:[e.jsx(A,{children:t?"Edit board":"New board"}),e.jsxs(R,{children:[e.jsx(N,{type:"text",autoFocus:!0,...l("title"),placeholder:"Title",$hasError:!!d.title}),((h=d.title)==null?void 0:h.message)&&C&&e.jsx(O,{children:d.title.message})]}),e.jsxs(g,{children:[e.jsx(x,{children:"Icons"}),e.jsx(m,{$gap:"11px",children:y.map(s=>e.jsxs(j,{children:[e.jsx(S,{type:"radio",...l("icon"),value:s}),e.jsx(P,{id:s,size:18})]},s))})]}),e.jsxs(g,{children:[e.jsx(x,{children:"Background"}),e.jsx(m,{$width:"252px",$gap:"4px",children:p.map(s=>e.jsxs(j,{children:[e.jsx(S,{type:"radio",...l("backgroundImage"),value:s.key}),e.jsx(H,{desktop:u,tablet:u,mobile:u,type:"image/png",pathKey:s.key,alt:s.alt,imageCategory:"boardIcons"})]},s.key))})]}),e.jsx(U,{children:e.jsx(J,{type:"submit",title:t?"Edit":"Create",icon:!0,size:"large",style:{width:3340}})})]}),k&&e.jsx(I,{})]})},ae=({closeModal:a,approveModal:o,action:n,logout:i=!1})=>{const r=c(B),t=c(V);return e.jsxs(W,{children:[e.jsxs(Z,{children:["Are you sure you want to ",n,"?"]}),e.jsxs(q,{children:[e.jsx(b,{type:"button",onClick:o,disabled:r,children:i?"Log out":"Yes"}),e.jsx(b,{type:"button",onClick:()=>a(),children:"Cancel"})]}),(r||t)&&e.jsx(I,{})]})};export{te as B,ae as C,se as u};