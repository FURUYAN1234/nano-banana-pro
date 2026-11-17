import test from 'node:test';
import assert from 'node:assert/strict';
import {buildBookIllustrationPrompt} from '../src/lib/book-presentation.js';
import {isMonochromePrompt} from '../src/lib/manga-render-mode.js';
import {buildImageEditRequest} from '../src/lib/image-edit.js';
const marker='[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]';
const options={direction:'Approved outfit illustration',castList:'## Original adult\nSTYLE_TAG:COLOR\nReference hair and eye colors are identity data.',showTitle:false,showWatermarks:false,mosaicCopyrightedCharacters:false,pageIndex:1};
test('monochrome illustration exposes its actual mode to metadata, QA and subsequent edit',()=>{
 const prompt=buildBookIllustrationPrompt({...options,colorMode:'monochrome'});
 assert.equal(isMonochromePrompt(prompt),true);
 assert.equal(prompt.split(marker).length-1,1);
 const generationColorMode=isMonochromePrompt(prompt)?'monochrome':'color';
 assert.equal(generationColorMode,'monochrome');
 const request=buildImageEditRequest('data:image/png;base64,aGVsbG8=','Keep identity; adjust the cape.',{colorMode:generationColorMode});
 assert.equal(isMonochromePrompt(request.prompt),true);
 assert.doesNotMatch(prompt,/縦長フキダシ。空間より縦書き優先。/);
});
test('color illustration remains color despite source monochrome labels or requested grayscale clothing',()=>{
 const prompt=buildBookIllustrationPrompt({...options,colorMode:'color',castList:'## Original adult\nSTYLE_TAG:MONOCHROME\nWhite and black clothing.'});
 assert.equal(isMonochromePrompt(prompt),false);
 assert.equal(prompt.includes(marker),false);
 assert.match(prompt,/Use the approved color palette/);
});
