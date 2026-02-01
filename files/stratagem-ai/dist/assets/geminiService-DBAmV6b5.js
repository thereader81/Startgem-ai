var R;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(R||(R={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(S||(S={}));var T;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(T||(T={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=["user","model","function","system"];var M;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(M||(M={}));var x;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(x||(x={}));var L;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(L||(L={}));var k;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(k||(k={}));var _;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(_||(_={}));var G;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(G||(G={}));var P;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(P||(P={}));var D;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(D||(D={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class y extends d{constructor(t,n){super(t),this.response=n}}class V extends d{constructor(t,n,i,o){super(t),this.status=n,this.statusText=i,this.errorDetails=o}}class m extends d{}class q extends d{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J="https://generativelanguage.googleapis.com",X="v1beta",Q="0.24.1",Z="genai-js";var p;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(p||(p={}));class ee{constructor(t,n,i,o,s){this.model=t,this.task=n,this.apiKey=i,this.stream=o,this.requestOptions=s}toString(){var t,n;const i=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||X;let s=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||J}/${i}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function te(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${Z}/${Q}`),t.join(" ")}async function ne(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",te(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let i=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(i){if(!(i instanceof Headers))try{i=new Headers(i)}catch(o){throw new m(`unable to convert customHeaders value ${JSON.stringify(i)} to Headers: ${o.message}`)}for(const[o,s]of i.entries()){if(o==="x-goog-api-key")throw new m(`Cannot set reserved header name ${o}`);if(o==="x-goog-api-client")throw new m(`Header name ${o} can only be set using the apiClient field`);n.append(o,s)}}return n}async function ie(e,t,n,i,o,s){const a=new ee(e,t,n,i,s);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},re(s)),{method:"POST",headers:await ne(a),body:o})}}async function A(e,t,n,i,o,s={},a=fetch){const{url:r,fetchOptions:c}=await ie(e,t,n,i,o,s);return oe(r,c,a)}async function oe(e,t,n=fetch){let i;try{i=await n(e,t)}catch(o){se(o,e)}return i.ok||await ae(i,e),i}function se(e,t){let n=e;throw n.name==="AbortError"?(n=new q(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof V||e instanceof m||(n=new d(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function ae(e,t){let n="",i;try{const o=await e.json();n=o.error.message,o.error.details&&(n+=` ${JSON.stringify(o.error.details)}`,i=o.error.details)}catch{}throw new V(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,i)}function re(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),b(e.candidates[0]))throw new y(`${g(e)}`,e);return ce(e)}else if(e.promptFeedback)throw new y(`Text not available. ${g(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),b(e.candidates[0]))throw new y(`${g(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),$(e)[0]}else if(e.promptFeedback)throw new y(`Function call not available. ${g(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),b(e.candidates[0]))throw new y(`${g(e)}`,e);return $(e)}else if(e.promptFeedback)throw new y(`Function call not available. ${g(e)}`,e)},e}function ce(e){var t,n,i,o;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(o=(i=e.candidates)===null||i===void 0?void 0:i[0].content)===null||o===void 0?void 0:o.parts)a.text&&s.push(a.text),a.executableCode&&s.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&s.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}function $(e){var t,n,i,o;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(o=(i=e.candidates)===null||i===void 0?void 0:i[0].content)===null||o===void 0?void 0:o.parts)a.functionCall&&s.push(a.functionCall);if(s.length>0)return s}const le=[_.RECITATION,_.SAFETY,_.LANGUAGE];function b(e){return!!e.finishReason&&le.includes(e.finishReason)}function g(e){var t,n,i;let o="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)o+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(o+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((i=e.candidates)===null||i===void 0)&&i[0]){const s=e.candidates[0];b(s)&&(o+=`Candidate was blocked due to ${s.finishReason}`,s.finishMessage&&(o+=`: ${s.finishMessage}`))}return o}function I(e){return this instanceof I?(this.v=e,this):new I(e)}function ue(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=n.apply(e,t||[]),o,s=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(u){i[u]&&(o[u]=function(l){return new Promise(function(h,v){s.push([u,l,h,v])>1||r(u,l)})})}function r(u,l){try{c(i[u](l))}catch(h){E(s[0][3],h)}}function c(u){u.value instanceof I?Promise.resolve(u.value.v).then(f,C):E(s[0][2],u)}function f(u){r("next",u)}function C(u){r("throw",u)}function E(u,l){u(l),s.shift(),s.length&&r(s[0][0],s[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function de(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=ge(t),[i,o]=n.tee();return{stream:fe(i),response:he(o)}}async function he(e){const t=[],n=e.getReader();for(;;){const{done:i,value:o}=await n.read();if(i)return O(me(t));t.push(o)}}function fe(e){return ue(this,arguments,function*(){const n=e.getReader();for(;;){const{value:i,done:o}=yield I(n.read());if(o)break;yield yield I(O(i))}})}function ge(e){const t=e.getReader();return new ReadableStream({start(i){let o="";return s();function s(){return t.read().then(({value:a,done:r})=>{if(r){if(o.trim()){i.error(new d("Failed to parse stream"));return}i.close();return}o+=a;let c=o.match(U),f;for(;c;){try{f=JSON.parse(c[1])}catch{i.error(new d(`Error parsing JSON response: "${c[1]}"`));return}i.enqueue(f),o=o.substring(c[0].length),c=o.match(U)}return s()}).catch(a=>{let r=a;throw r.stack=a.stack,r.name==="AbortError"?r=new q("Request aborted when reading from the stream"):r=new d("Error reading from the stream"),r})}}})}function me(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const i of e){if(i.candidates){let o=0;for(const s of i.candidates)if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:o}),n.candidates[o].citationMetadata=s.citationMetadata,n.candidates[o].groundingMetadata=s.groundingMetadata,n.candidates[o].finishReason=s.finishReason,n.candidates[o].finishMessage=s.finishMessage,n.candidates[o].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[o].content||(n.candidates[o].content={role:s.content.role||"user",parts:[]});const a={};for(const r of s.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[o].content.parts.push(a)}o++}i.usageMetadata&&(n.usageMetadata=i.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B(e,t,n,i){const o=await A(t,p.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),i);return de(o)}async function W(e,t,n,i){const s=await(await A(t,p.GENERATE_CONTENT,e,!1,JSON.stringify(n),i)).json();return{response:O(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function w(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return pe(t)}function pe(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let i=!1,o=!1;for(const s of e)"functionResponse"in s?(n.parts.push(s),o=!0):(t.parts.push(s),i=!0);if(i&&o)throw new d("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!i&&!o)throw new d("No content is provided for sending chat message.");return i?t:n}function Ce(e,t){var n;let i={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const o=e.generateContentRequest!=null;if(e.contents){if(o)throw new m("CountTokensRequest must have one of contents or generateContentRequest, not both.");i.contents=e.contents}else if(o)i=Object.assign(Object.assign({},i),e.generateContentRequest);else{const s=w(e);i.contents=[s]}return{generateContentRequest:i}}function F(e){let t;return e.contents?t=e:t={contents:[w(e)]},e.systemInstruction&&(t.systemInstruction=z(e.systemInstruction)),t}function Ee(e){return typeof e=="string"||Array.isArray(e)?{content:w(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],ve={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function ye(e){let t=!1;for(const n of e){const{role:i,parts:o}=n;if(!t&&i!=="user")throw new d(`First content should be with role 'user', got ${i}`);if(!N.includes(i))throw new d(`Each item should include role field. Got ${i} but valid roles are: ${JSON.stringify(N)}`);if(!Array.isArray(o))throw new d("Content should have 'parts' property with an array of Parts");if(o.length===0)throw new d("Each Content should have at least one part");const s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of o)for(const c of H)c in r&&(s[c]+=1);const a=ve[i];for(const r of H)if(!a.includes(r)&&s[r]>0)throw new d(`Content with role '${i}' can't contain '${r}' part`);t=!0}}function K(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const i of n.parts)if(i===void 0||Object.keys(i).length===0||i.text!==void 0&&i.text==="")return!1;return!0}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y="SILENT_ERROR";class _e{constructor(t,n,i,o={}){this.model=n,this.params=i,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,i!=null&&i.history&&(ye(i.history),this._history=i.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var i,o,s,a,r,c;await this._sendPromise;const f=w(t),C={safetySettings:(i=this.params)===null||i===void 0?void 0:i.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,f]},E=Object.assign(Object.assign({},this._requestOptions),n);let u;return this._sendPromise=this._sendPromise.then(()=>W(this._apiKey,this.model,C,E)).then(l=>{var h;if(K(l.response)){this._history.push(f);const v=Object.assign({parts:[],role:"model"},(h=l.response.candidates)===null||h===void 0?void 0:h[0].content);this._history.push(v)}else{const v=g(l.response);v&&console.warn(`sendMessage() was unsuccessful. ${v}. Inspect response object for details.`)}u=l}).catch(l=>{throw this._sendPromise=Promise.resolve(),l}),await this._sendPromise,u}async sendMessageStream(t,n={}){var i,o,s,a,r,c;await this._sendPromise;const f=w(t),C={safetySettings:(i=this.params)===null||i===void 0?void 0:i.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,f]},E=Object.assign(Object.assign({},this._requestOptions),n),u=B(this._apiKey,this.model,C,E);return this._sendPromise=this._sendPromise.then(()=>u).catch(l=>{throw new Error(Y)}).then(l=>l.response).then(l=>{if(K(l)){this._history.push(f);const h=Object.assign({},l.candidates[0].content);h.role||(h.role="model"),this._history.push(h)}else{const h=g(l);h&&console.warn(`sendMessageStream() was unsuccessful. ${h}. Inspect response object for details.`)}}).catch(l=>{l.message!==Y&&console.error(l)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ie(e,t,n,i){return(await A(t,p.COUNT_TOKENS,e,!1,JSON.stringify(n),i)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function we(e,t,n,i){return(await A(t,p.EMBED_CONTENT,e,!1,JSON.stringify(n),i)).json()}async function Ae(e,t,n,i){const o=n.requests.map(a=>Object.assign(Object.assign({},a),{model:t}));return(await A(t,p.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),i)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t,n,i={}){this.apiKey=t,this._requestOptions=i,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=z(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var i;const o=F(t),s=Object.assign(Object.assign({},this._requestOptions),n);return W(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},o),s)}async generateContentStream(t,n={}){var i;const o=F(t),s=Object.assign(Object.assign({},this._requestOptions),n);return B(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},o),s)}startChat(t){var n;return new _e(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const i=Ce(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),n);return Ie(this.apiKey,this.model,i,o)}async embedContent(t,n={}){const i=Ee(t),o=Object.assign(Object.assign({},this._requestOptions),n);return we(this.apiKey,this.model,i,o)}async batchEmbedContents(t,n={}){const i=Object.assign(Object.assign({},this._requestOptions),n);return Ae(this.apiKey,this.model,t,i)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new d("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new j(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,i){if(!t.name)throw new m("Cached content must contain a `name` field.");if(!t.model)throw new m("Cached content must contain a `model` field.");const o=["model","systemInstruction"];for(const a of o)if(n!=null&&n[a]&&t[a]&&(n==null?void 0:n[a])!==t[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,c=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(r===c)continue}throw new m(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${t[a]})`)}const s=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new j(this.apiKey,s,i)}}const Oe=`You are a world-class senior strategy consultant with 20+ years of experience at McKinsey, BCG, or Bain. Your analyses are known for their precision, clarity, and executive polish.

## Core Principles
1. **Structured Thinking**: Use MECE (Mutually Exclusive, Collectively Exhaustive) logic in all analyses
2. **So-What Orientation**: Every observation must lead to a clear implication - never state facts without explaining why they matter
3. **Quantification**: Ground arguments in numbers wherever possible. Use ranges when precise data isn't available
4. **Actionability**: Conclude with concrete, specific recommendations that a client could act on Monday morning
5. **Executive Communication**: Use the Pyramid Principle - lead with the answer, support with evidence

## CRITICAL: Follow the User's Prompt Exactly
- The user will provide a SPECIFIC prompt template (e.g., "Create a stakeholder map", "Build an issue tree", "Analyze unit economics")
- You MUST follow that specific prompt's instructions precisely
- Do NOT generate generic strategic analysis when asked for a specific deliverable
- If asked for a stakeholder map, provide ONLY stakeholder analysis
- If asked for financial analysis, provide ONLY financial metrics
- If asked for a SWOT, provide ONLY SWOT analysis
- Respect the requested output format (e.g., "2x2 matrix", "table", "tree structure")

## Formatting Requirements
**CRITICAL**: You MUST use the following markdown structure for ALL outputs:

### Document Structure
1. Start with an executive summary in a blockquote:
   > **Executive Summary**
   > 
   > [2-3 sentences capturing the core insight and recommendation]

2. Use clear hierarchical headings:
   - # for main title
   - ## for major sections
   - ### for subsections

3. Use bullet points extensively for:
   - Key insights (prefix with ▪ or •)
   - Supporting evidence
   - Recommendations

4. Highlight critical insights using **bold** for emphasis

5. Use numbered lists ONLY for sequential steps or prioritized recommendations

6. Include "So What?" callouts for key implications:
   > **💡 So What?**
   > 
   > [Clear implication statement]

7. Use tables when comparing options, listing assumptions, or presenting structured data

### Content Guidelines
- Keep paragraphs to 2-3 sentences maximum
- Use subheadings every 3-4 paragraphs
- Include specific metrics and percentages where relevant
- Frame recommendations with clear rationale
- Use consulting terminology appropriately (e.g., "value levers", "strategic imperatives", "critical path")

Remember: Every analysis should be board-ready and partner-approved in quality.`,Re=e=>new Promise(t=>setTimeout(t,e));function Se(e,t){return e.replace(/\{\{\s*scenario\s*\}\}/gi,t.trim())}async function*Te(e,t){const n=e.toLowerCase();let i="";n.includes("stakeholder")?i=`# Stakeholder Map

> **Executive Summary**
> 
> The stakeholder landscape reveals three high-power actors with competing interests, two critical enablers with moderate influence, and one potential blocker. Success requires securing early alignment with the CFO and Product VP while neutralizing resistance from the Legacy Systems team.

## Power-Interest Matrix

### High Power, High Interest (Manage Closely)
- **CFO (Sarah Chen)**: Primary decision-maker, focused on ROI and risk mitigation. Strong advocate if business case is solid.
- **VP Product (James Liu)**: Controls roadmap prioritization. Concerned about technical debt and customer impact.
- **CTO (Maria Garcia)**: Owns technical architecture decisions. Skeptical of vendor solutions, prefers build over buy.

### High Power, Low Interest (Keep Satisfied)
- **CEO (Robert Kim)**: Cares about strategic outcomes, not implementation details. Needs quarterly updates only.

### Low Power, High Interest (Keep Informed)
- **Engineering Leads (5 managers)**: Will execute the work. Need clear technical specs and timeline certainty.
- **Customer Success VP (Amanda Patel)**: Worried about customer disruption during transition.

### Low Power, Low Interest (Monitor)
- **IT Operations**: Routine involvement for infrastructure support.

> **💡 So What?**
> 
> The decision hinges on securing a coalition between Finance (CFO) and Product (VP Product). Without their joint sponsorship, the CTO's skepticism will stall progress.

## Key Conflicts & Alignment Points

### Likely Conflicts
1. **Build vs. Buy**: CTO prefers in-house development; CFO wants faster time-to-value via vendor solution
2. **Timeline Pressure**: Product VP needs Q2 delivery; Engineering estimates Q3 at earliest
3. **Budget Allocation**: Customer Success wants dedicated migration support; CFO wants to minimize services spend

### Alignment Opportunities
1. **Risk Mitigation**: All executives agree on need for phased rollout with rollback capability
2. **Customer Impact**: Shared concern about minimizing disruption to top 20% of revenue-generating accounts
3. **Technical Debt**: Consensus that current system is unsustainable beyond 18 months

## Recommended Engagement Strategy

### Phase 1: Build the Coalition (Weeks 1-2)
- **CFO + VP Product alignment session**: Present unified business case showing ROI and customer benefit
- **CTO technical deep-dive**: Address build-vs-buy with objective vendor evaluation criteria

### Phase 2: Neutralize Resistance (Weeks 3-4)
- **Engineering Leads workshops**: Co-create technical implementation plan to build buy-in
- **Customer Success playbook**: Develop migration communication templates and support model

### Phase 3: Secure Executive Approval (Week 5)
- **Steering committee review**: Present consensus recommendation with clear risk mitigations

---
${t?"_Note: Falling back to mock output because AI generation failed._":"_Note: Configure VITE_GEMINI_API_KEY to enable live generation._"}
`:n.includes("swot")?i=`# SWOT Analysis

> **Executive Summary**
> 
> The organization has strong brand equity and technical capabilities but faces margin pressure from emerging competitors and regulatory uncertainty. The priority is to leverage existing customer relationships to expand into adjacent markets while modernizing the cost structure.

## Strengths
- **Market Position**: #2 player with 23% market share and 85% brand recognition in core segment
- **Customer Loyalty**: 78% retention rate, NPS of 42 (industry avg: 28)
- **Technical Capabilities**: Proprietary platform with 3-year competitive moat
- **Talent Density**: 40% of engineering team from top-tier tech companies

## Weaknesses
- **Cost Structure**: COGS 12 points above industry benchmark due to legacy infrastructure
- **Geographic Concentration**: 68% of revenue from single region, high exposure to local economic cycles
- **Product Velocity**: 18-month release cycles vs. 6-month competitor average
- **Sales Efficiency**: CAC increased 35% YoY while LTV remained flat

## Opportunities
- **Market Expansion**: Adjacent segment growing at 22% CAGR with low competitive intensity
- **Platform Monetization**: Current customers willing to pay 15-20% premium for integrated solutions
- **M&A Targets**: 3 distressed competitors available at 0.8x revenue multiples
- **Regulatory Tailwinds**: New compliance requirements favor established players with scale

## Threats
- **Competitive Disruption**: Two well-funded startups targeting core segment with 40% lower pricing
- **Technology Shift**: Cloud-native architectures making legacy platform less defensible
- **Talent Attrition**: 18% annual turnover in engineering, up from 12% two years ago
- **Margin Compression**: Pricing power eroding as product reaches maturity

> **💡 So What?**
> 
> The window to act is 12-18 months. The company must simultaneously defend the core (cost reduction, product velocity) while expanding into adjacencies before competitors establish beachheads.

## Strategic Implications

### Immediate Priorities (0-6 months)
1. **Cost Reset**: Target 8-10 point COGS reduction through infrastructure modernization
2. **Product Acceleration**: Shift to agile delivery model to halve release cycles
3. **Talent Retention**: Implement targeted retention program for top 20% of engineering talent

### Growth Initiatives (6-18 months)
1. **Adjacent Market Entry**: Launch integrated solution in fastest-growing segment
2. **M&A Evaluation**: Conduct diligence on top 2 acquisition targets for capability fill

---
${t?"_Note: Falling back to mock output because AI generation failed._":"_Note: Configure VITE_GEMINI_API_KEY to enable live generation._"}
`:n.includes("unit economics")||n.includes("financial")?i=`# Unit Economics Analysis

> **Executive Summary**
> 
> Current unit economics are marginally profitable with 18-month payback, but sensitivity analysis reveals high vulnerability to CAC inflation and churn. The business model requires 15-20% improvement in either acquisition efficiency or retention to achieve venture-scale returns.

## Core Metrics

| Metric | Current | Target | Industry Benchmark |
|--------|---------|--------|-------------------|
| **CAC** | $1,240 | $950 | $800-1,100 |
| **LTV** | $2,180 | $3,200 | $2,500-3,500 |
| **LTV:CAC Ratio** | 1.76x | 3.0x+ | 3.0x+ |
| **Payback Period** | 18 months | 12 months | 12-15 months |
| **Gross Margin** | 68% | 75% | 70-80% |
| **Monthly Churn** | 4.2% | 2.5% | 2-3% |

## Detailed Breakdown

### Customer Acquisition Cost (CAC)
- **Paid Marketing**: $720 (58% of CAC)
  - Google/Meta ads: $520
  - Retargeting: $200
- **Sales & Marketing Overhead**: $380 (31%)
  - SDR/AE salaries allocated per deal
- **Tools & Technology**: $140 (11%)
  - CRM, analytics, attribution stack

### Lifetime Value (LTV)
- **Average Contract Value**: $180/month
- **Average Customer Lifespan**: 24 months (inverse of 4.2% monthly churn)
- **Gross Margin**: 68%
- **LTV Calculation**: $180 × 24 × 0.68 = $2,937 (before discounting)
- **Discounted LTV** (15% discount rate): $2,180

> **💡 So What?**
> 
> At 1.76x LTV:CAC, the business is barely profitable on a unit basis. A 10% increase in churn or CAC would push the model underwater. This requires immediate action on retention and acquisition efficiency.

## Sensitivity Analysis

### Impact of 10% Changes
| Variable | LTV Impact | Payback Impact |
|----------|------------|----------------|
| +10% Monthly Churn | -$340 (-16%) | +3 months |
| -10% CAC | No change | -2 months |
| +10% ACV | +$218 (+10%) | -2 months |
| +10% Gross Margin | +$218 (+10%) | -1 month |

### Break-Even Scenarios
- **Scenario A** (Retention-led): Reduce churn to 2.8% → LTV increases to $3,100, ratio improves to 2.5x
- **Scenario B** (Efficiency-led): Reduce CAC to $950 → Ratio improves to 2.3x, payback drops to 14 months
- **Scenario C** (Pricing-led): Increase ACV to $210 → LTV increases to $2,540, ratio improves to 2.0x

## Recommended Actions

### Immediate (0-3 months)
1. **Retention Program**: Launch proactive customer success outreach for at-risk accounts (churn score >70)
   - Expected impact: Reduce churn by 0.8-1.2 points → +$280-420 LTV
2. **CAC Optimization**: Reallocate 30% of paid spend to higher-converting channels
   - Expected impact: Reduce CAC by $120-180

### Medium-term (3-9 months)
1. **Product-Led Growth**: Introduce freemium tier to reduce sales-assisted CAC
   - Expected impact: Create second cohort with $400-600 CAC
2. **Pricing Optimization**: Test 15% price increase for new customers
   - Expected impact: +$27/month ACV → +$440 LTV (assuming 5% conversion impact)

## Assumptions & Risks

### Key Assumptions
- Churn rate remains stable across customer cohorts
- CAC is fully loaded including overhead allocation
- Gross margin excludes customer success costs (treated as operating expense)
- Discount rate of 15% reflects cost of capital

### Data Gaps
- Cohort-level retention curves (currently using blended average)
- CAC by acquisition channel (need better attribution)
- Expansion revenue potential from existing customers

---
${t?"_Note: Falling back to mock output because AI generation failed._":"_Note: Configure VITE_GEMINI_API_KEY to enable live generation._"}
`:i=`# Analysis

> **Executive Summary**
> 
> Based on the scenario provided, the analysis reveals critical decision points that require immediate attention. The recommended path balances short-term execution with long-term strategic positioning.

## Context
${e.slice(0,200).replace(/\n/g," ")}...

## Key Findings
- **Finding 1**: [Analysis would be generated based on your specific scenario and prompt]
- **Finding 2**: [Tailored insights would appear here]
- **Finding 3**: [Context-specific recommendations would follow]

> **💡 So What?**
> 
> [Implications would be drawn from the specific scenario you provided]

## Recommendations
1. **Immediate Action**: [Specific to your scenario]
2. **Medium-term Initiative**: [Based on your context]
3. **Long-term Strategy**: [Aligned with your objectives]

---
${t?"_Note: Falling back to mock output because AI generation failed._":"_Note: Configure VITE_GEMINI_API_KEY to enable live generation._"}
`;const o=i.match(/.{1,180}/g)??[i];for(const s of o)yield s,await Re(30)}async function*Ne(e,t){const n=Se(e,t),i="AIzaSyCpnR2IuHTb94zwUyFxmQRVOqCWhwlF26o";try{const s=new be(i).getGenerativeModel({model:"gemini-2.0-flash"}),a=`${Oe}

---

User Request:
${n}`,r=await s.generateContentStream({contents:[{role:"user",parts:[{text:a}]}],generationConfig:{temperature:.7,topP:.95,maxOutputTokens:4096}});for await(const c of r.stream){const f=c.text();f&&(yield f)}}catch(o){console.error("AI Generation Error:",o),yield*Te(n,o)}}export{Ne as g};
