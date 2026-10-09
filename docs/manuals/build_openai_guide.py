from pathlib import Path
from xml.sax.saxutils import escape
import json, re
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

BASE=Path(__file__).resolve().parents[2]/'output'/'pdf'
BASE.mkdir(parents=True,exist_ok=True)
(BASE/'source').mkdir(exist_ok=True)
ASSETS=Path(__file__).resolve().parent/'assets'/'openai'
OUT=BASE/'openai-api-beginner-guide-2026-09-30.pdf'
pdfmetrics.registerFont(TTFont('JP','C:/Windows/Fonts/BIZ-UDGothicR.ttc',subfontIndex=0))
pdfmetrics.registerFont(TTFont('JPB','C:/Windows/Fonts/BIZ-UDGothicB.ttc',subfontIndex=0))
pdfmetrics.registerFontFamily('JP',normal='JP',bold='JPB')
W,H=A4; M=43; CW=W-2*M
INK=HexColor('#142b40'); TEAL=HexColor('#087f80'); LIGHT=HexColor('#eaf6f5'); GRAY=HexColor('#526575'); ORANGE=HexColor('#b45a1b')
styles={
 'body':ParagraphStyle('body',fontName='JP',fontSize=11,leading=17.6,textColor=INK,wordWrap='CJK',spaceAfter=8),
 'small':ParagraphStyle('small',fontName='JP',fontSize=9,leading=14,textColor=GRAY,wordWrap='CJK'),
 'table':ParagraphStyle('table',fontName='JP',fontSize=10,leading=15.5,textColor=INK,wordWrap='CJK'),
 'h2':ParagraphStyle('h2',fontName='JPB',fontSize=14,leading=21,textColor=TEAL,wordWrap='CJK'),
 'url':ParagraphStyle('url',fontName='JP',fontSize=9,leading=14,textColor=TEAL,wordWrap='CJK',splitLongWords=True),
}
c=canvas.Canvas(str(OUT),pagesize=A4,pageCompression=1)
c.setTitle('はじめてのOpenAI API取得・設定ガイド | 2026-10-09')
c.setAuthor('Super FURU AI 4-koma System')
c.setSubject('新規登録からシナリオ作成とGPT Image 2.5のアプリ内画像生成まで')
page=0; y=0; transcript=[]; checks=[]

def p(text,style='body',x=M,width=CW,gap=8):
 global y
 obj=Paragraph(text,styles[style]); _,h=obj.wrap(width,1000)
 if y-h<57: raise ValueError(f'Page {page} overflow at {text[:55]} y={y} h={h}')
 obj.drawOn(c,x,y-h); y-=h+gap; transcript.append(re.sub('<[^>]+>','',text))
def heading(text): p(text,'h2',gap=8)
def new(title,kicker='操作ガイド',sources=''):
 global page,y
 if page: end()
 page+=1; y=H-113
 c.setFillColor(TEAL); c.rect(0,H-8,W,8,fill=1,stroke=0)
 c.setFont('JPB',9); c.drawString(M,H-35,kicker)
 c.setFont('JPB',21); c.setFillColor(INK); c.drawString(M,H-73,title)
 c.setStrokeColor(HexColor('#cfdddf')); c.line(M,H-89,W-M,H-89)
 c.bookmarkPage(f'p{page}'); c.addOutlineEntry(title,f'p{page}',0,False)
 c.setFont('JP',8); c.setFillColor(GRAY); c.drawString(M,31,'v6.9.7対応 | 2026年10月9日更新 | A4 日本語版')
 c.drawRightString(W-M,31,f'{page:02d} / 22')
 if sources: c.setFont('JP',7.5); c.drawString(M,45,'根拠: '+sources+'（出典一覧は20ページ）')
 transcript.append('\n\n'+str(page)+'. '+title)
def end():
 checks.append({'page':page,'bottom_content_y':round(y,1)})
 c.showPage()
def box(title,text,kind='info'):
 global y
 color=LIGHT if kind=='info' else HexColor('#fff3e6')
 a=Paragraph('<b>'+title+'</b><br/>'+text,styles['body']); _,h=a.wrap(CW-26,1000)
 if y-h-24<57: raise ValueError(f'box overflow page {page}')
 c.setFillColor(color);c.roundRect(M,y-h-21,CW,h+21,7,fill=1,stroke=0)
 a.drawOn(c,M+13,y-h-10); y-=h+34; transcript.extend([title,text])
def table(rows,widths=None):
 global y
 data=[[Paragraph(str(v),styles['table']) for v in row] for row in rows]
 t=Table(data,colWidths=widths or [CW*.32,CW*.68],hAlign='LEFT')
 t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),LIGHT),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.45,HexColor('#d5e2e4')),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
 _,h=t.wrap(CW,1000)
 if y-h<57: raise ValueError(f'table overflow page {page}: {h}, {y}')
 t.drawOn(c,M,y-h);y-=h+13
 transcript.extend([' | '.join(row) for row in rows])
def link(label,url):
 p(f'<b>{escape(label)}</b>','small',gap=2)
 p(f'<link href="{url}" color="#087f80">{escape(url)}</link>','url',gap=9)
def shot(name,caption,maxh=240,width=None,viewport=None,highlight=None):
 global y
 path=ASSETS/name
 im=Image.open(path); iw,ih=im.size
 vx,vy,vw,vh=viewport or (0,0,iw,ih)
 assert 0<=vx<iw and 0<=vy<ih and vx+vw<=iw and vy+vh<=ih
 ww=min(width or CW,CW,vw*maxh/vh); hh=ww*vh/vw; scale=ww/vw
 if y-hh<70: raise ValueError('image overflow')
 xx=M+(CW-ww)/2
 c.setStrokeColor(HexColor('#c4d4d8'));c.rect(xx-1,y-hh-1,ww+2,hh+2,fill=0,stroke=1)
 if viewport:
  c.saveState();clip=c.beginPath();clip.rect(xx,y-hh,ww,hh);c.clipPath(clip,stroke=0)
  c.drawImage(ImageReader(im),xx-vx*scale,y+(vy-ih)*scale,width=iw*scale,height=ih*scale)
  c.restoreState()
 else:
  c.drawImage(ImageReader(im),xx,y-hh,width=ww,height=hh)
 if highlight:
  hx,hy,hw,hh0=highlight
  c.setStrokeColor(ORANGE);c.setLineWidth(1.5)
  c.rect(xx+(hx-vx)*scale,y-(hy-vy+hh0)*scale,hw*scale,hh0*scale,fill=0,stroke=1)
  c.setLineWidth(1)
 y-=hh+7; p('実画面：'+caption,'small',gap=12)
def steps(items):
 for n,(title,body) in enumerate(items,1):p(f'<b>{n}. {title}</b><br/>{body}')
def flow(items):
 global y
 p('説明図（操作の順序を示したものです）','small',gap=7)
 for i,(a,b) in enumerate(items):
  ob=Paragraph('<b>'+a+'</b><br/>'+b,styles['body']);_,hh=ob.wrap(CW-34,1000)
  c.setFillColor(LIGHT);c.roundRect(M,y-hh-16,CW,hh+16,6,fill=1,stroke=0);ob.drawOn(c,M+17,y-hh-8);y-=hh+16
  if i<len(items)-1:
   c.setStrokeColor(TEAL);c.line(W/2,y-3,W/2,y-13);c.line(W/2,y-13,W/2-3,y-9);c.line(W/2,y-13,W/2+3,y-9);y-=19
  else:y-=14
  transcript.extend([a,b])

# 1
new('はじめてのOpenAI API','アカウント作成から、アプリ内で画像を生成するまで')
p('取得・設定ガイド','h2')
p('Super FURU AI 4-koma Systemで、<b>GPT-6.1 Solなどのシナリオ</b>と<b>GPT Image 2.5の画像生成</b>を使うための手順です。パソコンのブラウザーを使って進めます。')
box('ChatGPTは無料プランのままで大丈夫','OpenAIのアカウントは必要です。ChatGPT Plus / Proの契約は不要です。<b>APIの支払い設定と従量課金は、ChatGPTのサブスクとは別</b>です。')
heading('あなたは、どこから始める？')
table([['いまの状態','スタート位置'],['ChatGPTのアカウントもない','① アカウント作成 → 3ページ'],['ChatGPTは使っているがAPIは初めて','② Platformの初回設定 → 4ページ'],['使うProjectを確認済み','④ Billingを開く → 6ページ'],['入金済み。画像モデルの認証が不明','⑧ 本人確認の要否 → 10ページ'],['必要な認証・権限・入金済み','⑩ 電話確認 → 13ページ、⑪ キー作成 → 14ページ'],['使えるキーをすでに持っている','⑫ アプリへの接続 → 16ページ']])
p('順序：①登録 → ②初回設定 → ③Project確認 → ④Billing → ⑤カード → ⑥クレジット → ⑦利用上限 → ⑧本人確認の要否 → ⑨モデル権限 → ⑩電話確認 → ⑪キー → ⑫接続 → ⑬画像生成。','small')
p('番号は操作手順、ページ番号は紙面の位置です。途中の確認が先に表示された場合は該当手順を済ませて戻ります。','small')

# 2
new('最初に知っておくこと','準備 / この資料の読み方','A・B・F・G・H')
flow([('OpenAIアカウント','ログインするための共通アカウント。ChatGPTとAPI Platformで使います。'),('Organization → Project','OrganizationはAPIの請求・権限を管理する単位。Projectはアプリごとの利用を分ける入れ物です。個人でも使います。'),('APIキー → このアプリ','APIキーはアプリからOpenAIへ依頼するときの秘密の鍵。Astra専用キーや画像専用キーを別々に買う仕組みではありません。')])
table([['準備するもの','使うところ'],['使えるメール／ログイン方法','①登録・②ログイン。確認メールを受信できること。'],['SMSを受信できる携帯電話','⑩初回APIキーの電話番号確認。'],['支払い用カード','⑤カード登録・⑥クレジット購入。'],['本人確認書類と撮影できる端末','⑧必要な場合。期限内の原本を用意します。'],['キャラクター設定画像','⑬アプリで最初の漫画を作るとき。']])
p('<b>写真と説明図の区別：</b>「実画面」は2026年9月30日のOpenAI画面と10月3日のアプリ画面から、必要部分を掲載しています。個人名・組織ID・キー一覧・残高・カード末尾などは掲載していません。「説明図」は手順を整理した図で、実画面の写真ではありません。','small')
p('初回登録・初回組織登録・本人確認の提出画面は、既存アカウントでは再表示できず、今回の新規登録による実機検証は行っていません。表示や必須欄の差は各ページに明記します。','small')

# 3
new('① アカウントを作る','アカウントを持っていない人だけ / ある人は4ページへ','A・I・J')
link('ChatGPTを開く','https://chatgpt.com/')
steps([('「Sign up／無料でサインアップ」を選ぶ','ログイン済みのチャット画面が開けば、アカウントはあります。新しく増やさず、4ページへ進みます。'),('登録方法を選ぶ','画面にあるGoogle・Microsoft・Appleなどの方法、またはメールアドレスで登録します。使い続けられるアカウントを選びます。'),('画面の案内に従って登録を完了する','メール方式では、自分のメールアドレスを入力します。パスワードやメール確認コードを求められたら画面に従います。名前・生年月日等の必須項目には正しい情報を入力し、利用条件を確認します。'),('登録した方法を覚えておく','たとえば「Googleで続行」で作った人は、Platformでも同じGoogleアカウントで続行します。登録方法の取り違えは、別アカウントやログインエラーの原因になります。')])
flow([('初めての人','ChatGPT → Sign up → 登録方法を選択 → 確認 → アカウント完成'),('すでに使っている人','新規登録は不要 → 同じアカウントでOpenAI Platformへ')])
box('ここで有料サブスクに入る必要はありません','APIだけを使うためにPlus／Proを契約する必要はありません。プランの案内が出ても、無料での利用を選べる場合はそのまま進めます。')
p('このページの画面名は公式ログイン案内に基づく説明です。新規登録直後の画面・項目順は今回未撮影です。アカウントはPlatform側のSign upから直接作ることもできます。','small')

# 4
new('② Platformの初回設定をする','ChatGPTアカウントがある人はここから','A・C・I')
link('APIの管理サイトを開く','https://platform.openai.com/')
steps([('「Log in」で同じアカウントに入る','①で使った方法と同じメール／Google／Microsoft／Appleアカウントを使います。ChatGPTの画面とAPI Platformの画面は別のサイトです。'),('初回のAPI利用設定が出たら、先に完了する','組織名・利用目的・地域・規約などが表示された場合は、現在の画面の必須項目を埋めます。個人利用なのに架空の会社情報を入力しないでください。'),('組織の設定ができたらProjectを確認する','通常のダッシュボードとプロジェクト選択が表示されたら③へ進みます。初回画面で先にキー作成・支払い・電話確認を求められたら、対応する番号を参照します。')])
table([['初回画面に出た項目','何を入れるか／選ぶか'],['Organization name／組織名','個人用の管理名。説明例：Personal manga。これは入力例であり必須の名前ではありません。'],['利用目的／用途','個人の漫画・イラスト制作など、自分の実際の用途。選択式なら最も近い項目。'],['国・地域、住所など','自分の正しい情報。後の請求・本人確認とも矛盾しないようにします。'],['招待、会社情報など','個人で使い、任意・スキップ可能な項目なら省略できます。必須欄は画面の案内に従います。']])
box('自分でProjectを作ったことがなくても大丈夫','公式では、各組織にDefault projectが用意されます。まず初回設定を済ませ、③で使うProjectを確認します。追加のProject作成は必須ではありません。')
p('確認範囲：新規アカウントの初回組織登録フォーム自体は未撮影です。上の表は「表示されたときの入力方針」であり、本日すべての新規ユーザーに同じ欄が出るという断定ではありません。','small')

# 5
new('③ 使用するProjectを確認する','確認は全員 / 漫画専用Projectの追加作成は任意','C・実画面')
p('各組織には<b>Default project</b>があります。これを選べば追加作成せず④へ進めます。<b>新旧モデルの違いで、新しいProjectの作成が必須になるわけではありません。</b>利用を分けたい人だけ、以下の例で漫画専用の<b>manga-app</b>を作ります。')
shot('07-project-menu.png','左上のプロジェクト名を押すと「Create project」が現れます。',maxh=130)
steps([('左上のプロジェクト名 →「Create project」','組織側の「Projects」から管理することもできます。'),('Nameに「manga-app」と入力 →「Create」','好きな管理名で構いません。本日確認した作成フォームの入力欄はNameのみです。古い記事にある説明文やWebサイト欄は、この画面にはありません。')])
shot('08-project-create.png','入力例を表示しただけで、撮影時には作成していません。',maxh=177)
box('次へ進む前に','左上で目的のProjectが選ばれているか確認します。Create projectがない・作れない場合は、その組織のOwner権限や参加状態を確認します。')

# 6
new('④ Billingは組織設定の中にある','通常の左メニューにBillingがなくても大丈夫','B・実画面')
box('最短：この直リンクを開く','下記リンクは、ログイン中のAPI組織の支払い概要を開きます。組織が複数ある人は、目的の組織になっているかも確認します。')
link('APIの支払い概要（本日の到達先）','https://platform.openai.com/settings/organization/billing/overview')
p('<b>通常画面から進む順序</b><br/>1. 左メニューの <b>Settings</b> を押す。<br/>2. Project Settings画面の右上にある <b>Organization settings</b> を押す。<br/>3. 組織設定の左メニューに出る <b>Billing</b> を押す。')
shot('02-organization-menu.png','組織設定の左メニュー上部を拡大。枠で示したBillingを押します。',maxh=260,highlight=(9,285,241,33))
p('「Settings」を押しただけではProject Settingsです。そこからもう一段、Organization settingsへ進むことがポイントです。','small')
box('Billingを開けないとき','ログイン先のアカウント・組織を確認してください。請求の管理権限がないメンバーは、組織のOwnerに依頼します。Projectの管理権限だけで請求まで操作できるとは限りません。')

# 7
new('⑤ API用のカードを登録する','ChatGPTに登録済みのカードと混同しないでください','B・D・実画面')
p('初めてのAPI支払い設定では、Billing内の<b>Add payment details</b>から進みます。設定済みのアカウントでは<b>Payment methods → Add payment method</b>などの表示になります。')
shot('09-payment-form.png','「Add a payment method」の空欄画面。カード情報は一切入力していません。',maxh=223)
table([['欄の名前','入力する内容'],['カード番号','自分の支払いカードに記載された番号。サンプル番号を入れないでください。'],['有効期限／MM・YY','カードにある「月／年」。APIキーの有効期限とは別です。'],['セキュリティコード／CVC','カードの案内に従う3桁または4桁の番号。暗証番号ではありません。'],['名義・請求先住所などが出た場合','カード会社へ届けている正しい名義・住所・国・郵便番号を入力します。表示されない欄を探す必要はありません。']])
p('入力内容を確認し、画面の登録・次へ進むボタンを押します。カード会社の追加認証（3Dセキュア等）が出たら、カード会社の案内に従います。カードを登録しただけでは、クレジット購入が完了していない場合があります。')
p('名義・請求先住所を含む初回専用の支払いフォームは今回未撮影です。写真は支払い方法追加フォームです。カード番号・CVC・住所を、アプリのAPIキー欄へ入力しないでください。','small')

# 8
new('⑥ 最初のクレジットを購入する','クレジット＝APIの前払い残高 / 金額例は本資料の提案','D・実画面')
table([['迷ったときの例','考え方'],['まずは5米ドル','公式の最小購入額。少額から始め、実際の消費を見て追加します。'],['少し余裕を持つなら10米ドル','公式の初期表示額。10ドルが必須という意味ではありません。'],['何枚作れる？','モデル・入力画像・品質・サイズ・検査・再生成で変わります。5ドルや10ドルでの保証枚数はありません。']])
steps([('初回の購入額を確認する','Amount／Initial credit balanceなどの金額欄に、購入したい米ドル額を入れます。円換算額は為替・カード会社・税等で変わります。'),('「Use auto-reload」を必ず確認する','公式案内では初回設定時にONが既定です。<b>初めてで自動追加購入を望まない場合はOFF</b>にします。画面名がAuto recharge等の場合も同じ意味です。'),('注文の最終金額を確認して購入する','クレジット額、税などを含む請求額、支払い方法、自動チャージの状態を確認して確定します。購入後は数分待って残高表示を確認します。')])
shot('04-billing-actions.png','設定済みアカウントでは「Buy credits」。残高・カード情報は撮影範囲外です。',maxh=140)
box('購入前に知っておくこと','購入クレジットの有効期限は1年です。返金は原則不可（法令・契約・承認された例外を除く）。残高切れの停止には遅延があり、前払い額をわずかに超える利用が生じる場合があります。','warn')

# 9
new('⑦ 自動チャージと上限を分けて考える','「自動購入を止める」と「API利用を止める」は別の設定です','D・E')
table([['設定','何を制御するか'],['Auto-reload／Auto recharge','残高が減ったときにカードから追加購入するか。初回はOFFを提案。'],['Monthly reload limit','自動購入する金額の月上限。手動購入や既存残高の消費上限ではありません。'],['Spend alert／利用額アラート','指定した利用額を知らせるだけ。これだけではAPIは止まりません。'],['Enforce a hard limit','設定した月額に達した後、対象のAPI呼び出しをエラーにする設定。反映遅延による小さな超過はあり得ます。']])
link('組織の利用上限','https://platform.openai.com/settings/organization/limits')
steps([('まず自動チャージをOFFにしたか確認','Billing → Overview → Manage auto-reloadで状態を確認します。継続利用のためONにする場合は、残高の発動条件・補充後残高・月の購入上限を理解してから設定します。'),('月額上限を設定したい場合','Organization limitsのSpend → Edit spend limit（未設定ならSet spend limit等）へ進みます。Monthly spend limitに自分の許容額を入力します。例：初月5米ドル。'),('止めたい場合は「Enforce a hard limit」をON → Save','公式の現行案内で確認した項目です。表示が異なる場合は、上限の数字だけで「自動停止する」と判断しないでください。')])
box('Project側にも上限があります','Project Settings → Limits → Spendにも設定できます。組織上限は全Project、Project上限はそのProjectの利用に適用されます。残高があっても別の上限で止まることがあります。')
p('このページは現行公式説明に基づく設定図解です。実際の個人の上限額や利用履歴は掲載していません。','small')

# 10
new('⑧ 本人確認の要否を確認する','難所 1 / 要求された人は次ページの詳しい手順へ','F・G・現行アプリ')
p('公式は、GPT Image利用前に認証が<b>必要になる場合がある</b>と案内しています。AstraやGPT Image 2.5の新規利用者全員に必須とする公式情報は確認できません。認証済み、または要求されず利用可能なら⑨へ進みます。','small')
link('組織の一般設定','https://platform.openai.com/settings/organization/general')
flow([('General → Verifications','API組織の一般設定を開きます。今回の既存アカウントでは、ここにVerifiedの表示を確認しました。'),('認証を要求された個人利用者','現行アプリの案内は「Verifications → Individual → Start」。公式の要求・エラーのリンクから開始する場合もあります。'),('公式の認証先で手続きする','身分証・顔写真はPlatformから開始した認証先に提出します。アプリの案内ではPersonaを使うフローです。')])
table([['表示状態','次の行動'],['未認証＋認証を要求された','11ページの準備をして開始します。'],['確認中・審査中','画面の案内に従って待ちます。完了時間は保証できません。'],['Verified／要求なしで利用可','同じ組織か確認して⑨へ進みます。'],['入口がない／権限がない','認証を要求された場合は組織・Owner権限を確認し、要求元のリンクへ戻ります。']])
p('<b>個人でも利用できます。</b>Organizationは管理単位の名前です。法人確認を求められた場合は公式案内に従い、架空の会社を登録しないでください。','small')
p('初回提出画面は未撮影です。Individual／Startは現行アプリの案内、条件は公式ヘルプに基づきます。表示名・認証業者の画面は状態により異なります。','small')

# 11
new('⑧ 本人確認：書類・撮影・承認後','難所 1 続き / 認証が必要な人のみ / 電話確認とは別','F・G')
heading('始める前の準備')
p('期限内で、政府発行の<b>原本</b>を用意します。公式例にはパスポート、運転免許証、国の身分証、在留許可証などがあります。<b>実際に選べる書類は認証画面の国・種類の選択肢を優先</b>してください。国ごとの全書類の対応はこの資料では断定しません。')
p('氏名・生年月日・顔写真が明瞭に確認できる状態にします。コピー、スキャン、スクリーンショット、期限切れ、加工した画像は使いません。必要な書類面を全部撮れるようにしてください。')
steps([('国・書類の種類を選ぶ','書類が発行された国と、手元の書類に対応する種類を選択します。画面が請求先国を聞いている場合と混同しないでください。'),('スマホでの操作に切り替える場合','PCにQRコードやスマホへ送るリンクが表示された場合のみ、その案内を使います。現在の公式フローから進んだ画面であることを確認します。'),('カメラを許可し、枠に合わせて原本を撮る','明るい場所で、反射・ぼけ・指による隠れを避けます。表裏を求められたら両方撮ります。撮り直しが必要なら提出前にやり直します。'),('顔の撮影を求められたら画面の動作指示に従う','自撮り等が必要な場合があります。必要な撮影方法はその認証画面を優先します。'),('提出後、Platformへ戻って状態を確認する','同じアカウント・同じ組織のVerificationsを見ます。審査中なら待機し、追加情報が求められたらその案内に従います。')])
box('認証済みなのに使えないとき','承認の反映に時間がかかる場合があります。同じ組織・Projectのキーか、モデル権限と残高があるかを次ページで確認します。<b>認証済みという表示だけで、すべてのモデル利用が保証されるわけではありません。</b>')
p('公式では、個人の本人確認で確認できるアカウント／組織は1つとされています。別アカウントを次々作って認証を繰り返さないでください。書類や自撮り、QRコードを解説者・SNS・漫画アプリへ送る必要はありません。','small')

# 12
new('⑨ モデルの利用権限を確認する','難所 2 / 課金・本人確認・Projectの許可はそれぞれ別','C・F・G・実画面')
steps([('漫画用Projectを選び「Settings → Limits」','まず左上で③のProjectを選択します。組織全体のLimitsとは別の、Project SettingsのLimitsを開きます。'),('「Model usage」の「Allow or block models」へ','その説明に対応する<b>Select models</b>を押します。同じページにRate limits用のSelect modelsもあるので、取り違えないでください。'),('対象モデルが禁止されていないか確認する','設定の選択肢は下表の3つです。すでに許可されているなら変更不要です。会社・共有組織の制限は管理者へ依頼します。')])
table([['モデルの許可設定','意味'],['Allow all models','現在と将来のモデルをProject側で許可。OpenAI側の制限を解除する操作ではありません。'],['Allow all except selected models','選択したモデルだけ禁止。Astraや画像モデルが禁止リストにないか確認。'],['Allow only selected models','選択したモデルだけ許可。画像モデルだけ許可しても解析・シナリオ処理は動きません。']])
box('最低限、どの名前を探す？','主に<b>gpt-6.1-sol</b>（シナリオの初期選択）、選択する場合は<b>gpt-6-astra</b>、<b>gpt-image-2.5-sunburst</b>（画像）、必要に応じて<b>gpt-image-2.5-flare</b>。解析・検査には<b>gpt-4.1</b>なども使います。')
p('<b>許可範囲を絞る場合：</b>選択したシナリオモデル、解析・検査モデル、画像モデルを確認します。アプリのModel Chainで失敗時の代替モデルも確認し、必要な範囲を管理者と相談してください。画像の2.0を使う場合はgpt-image-2も対象です。','small')
p('許可設定を変更する場合はSaveで保存し、反映を待ちます。AllowedはProject内の設定です。OpenAI側の制限を解除する購入ボタンではありません。キー権限、残高、要求された認証の完了も確認します。','small')

# 13
new('⑩ 初回APIキーの電話確認','初回だけの確認 / 本人確認書類の手続きとは別です','H')
link('APIキー作成ページ','https://platform.openai.com/api-keys')
p('公式ヘルプでは、<b>最初のAPIキーを作る際に電話番号確認が必要</b>です。2本目以降のキー作成では通常、同じ初回確認を繰り返しません。ChatGPTの新規登録自体の電話確認とは区別してください。')
flow([('国番号を確認','日本の携帯番号を使う場合はJapan／+81を選びます。米国の+1のまま入力しないでください。'),('自分の携帯番号を入力','画面の書式に従います。+81が別欄なら先頭0を除く国際形式が一般的です。表示される入力例やエラーを優先します。'),('SMSの確認コードを入力','表示された送信方法でコードを受け取り、公式画面に入力します。地域によってWhatsAppが選べる場合があります。')])
table([['困ったこと','確認すること'],['コードが来ない','国番号・番号・SMS受信可否を確認。短時間に何度も再送せず、画面の待機時間に従います。'],['メールで受け取りたい','公式案内では、この電話確認コードはメールや音声通話では受け取れません。'],['番号が対応していない','対応番号の条件を公式ヘルプで確認。進めない場合はエラー文を添えて公式サポートへ。']])
box('コードを他人へ教えないでください','電話番号、SMSコード、本人確認リンクは、必要な公式画面にだけ入力します。漫画アプリのAPIキー欄へSMSコードを貼らないでください。')
p('公式の初回APIキー案内に基づく説明図です。','small')

# 14
new('⑪ APIキーを新しく作る','Name・Project・有効期限・Permissionsを確認','C・K・実画面')
p('API keysページで<b>Create new secret key</b>を押します。次の画面の項目を確認してください。作るのはProjectの通常のAPIキーです。<b>Admin keysではありません。</b>')
shot('06-key-input-example.png','Nameと30日の入力例。実際のキーは発行していません。',maxh=285)
table([['項目','この手順での入力・選択'],['Owned by','<b>You</b>。個人で使う通常のキーです。Service accountはチームのシステム運用向け。'],['Name（Optional）','例：<b>manga-app</b>。識別用の名前。名前をAstraにしてもモデル権限は増えません。'],['Project','③で選んだ<b>Default project</b>、または追加した<b>manga-app</b>。写真はDefault projectです。'],['有効期限','例：<b>30日</b>。1日・7日・30日・期限なし・カスタムなどから選択します。30日は説明用の提案です。'],['Permissions','初回の簡単な設定例は<b>All</b>。そのProject内で広いAPI権限を持つため、自分専用に管理します。詳しくは次ページ。']])

# 15
new('⑪ キーの権限・コピー・保管','作成ボタンを押した後が大切です','C・K・現行アプリ')
heading('権限を理解してから作る')
table([['設定','このアプリでの意味'],['All','そのキーに全API権限を与える既定設定。簡単な初回設定例ですが、誰にでも渡してよいキーではありません。'],['Read only','読み取り用。文章や画像を生成する目的には足りません。'],['Restricted','必要なAPIだけ許可する設定。管理に慣れた人向け。Modelsの読み取り、Responses／Chat Completionsの生成、Imagesの生成・編集等が必要です。画面の資源別の権限に対応させます。']])
p('Project側でモデルを許可しても、キー側の権限が不足すれば使えません。逆にAllにしても、本人確認やOpenAI側の利用制限は解除されません。')
steps([('「Create secret key」を押す','選んだProject・期限・権限に誤りがないか確認します。ボタンが押せない場合は、有効期限を選んだか、必須項目や組織のキー作成制限を確認します。'),('表示された秘密のキーをコピーする','作成直後の表示から、Copyボタンなどで全文をコピーします。キー一覧の「sk-...」という省略表示やTracking IDは使用できません。'),('自分用のパスワード管理アプリ等で安全に保管する','あとで全文を再表示できない前提で扱います。SNS、メール、共有資料、スクリーンショットへ載せないでください。紛失したら新しいキーを作成します。'),('⑫で漫画アプリへ貼り付ける','保存・入力できたことを確認してから作成画面を閉じます。利用期限が来たら新しいキーへ更新します。')])
box('漏れたキーは使い続けない','公開・共有してしまった場合は、API keysで該当キーを失効させ、新しく作り直してアプリへ接続し直します。失効前に他の自分のアプリでも使っていないか確認してください。','warn')
p('キーにはsk-で始まる形式があります。本資料には有効なキー、実際のキーの一部、キーIDは掲載していません。','small')

# 16
new('⑫ 漫画アプリへキーを接続する','ここからアプリ内の操作です','公開アプリ・現行ソース')
link('Super FURU AI 4-koma Systemを開く','https://furuyan1234.github.io/nano-banana-pro/')
shot('app-connected-header.jpg','前版の実画面（操作配置は共通）：OpenAI接続表示を確認してSTEP1へ進みます。',maxh=143,width=350)
steps([('最初のAPIキー入力欄を押す','「Gemini AI Key または OpenAI Key (sk-...)」とある欄に、⑪でコピーした<b>OpenAIの秘密キー全文</b>を貼り付けます。WindowsはCtrl+Vです。'),('「接続」を押す','入力の先頭でOpenAI形式と判定されます。「形式（未検証）」だけでは接続完了ではありません。接続確認が終わるまで待ちます。'),('「ChatGPT Engine」などOpenAIの接続表示を確認','このアプリの表示名にChatGPTとあっても、ここではOpenAI APIを使用します。ChatGPTサブスク枠の消費ではありません。')])
box('接続成功＝画像モデルの利用成功、ではありません','現行アプリの接続確認はモデル一覧へのアクセスを確認します。GPT Image 2.5で本当に生成できるかは、モデル権限・認証・残高を整えたうえで⑬の実際の画像生成で確認します。')
p('キーは現行アプリのブラウザーメモリーで保持されます。再読み込み・終了後は再入力が必要です。信頼できる配布先と自分の端末で使ってください。キーは認証のためOpenAIへ送信され、API処理では選んだ文章・画像も送信されます。','small')
p('すでに作業中の場合、「最初からやり直す（設定クリア）」は制作中データも消します。キーを入れ直すために押す前に、必要な画像・文章を保存してください。','small')

# 17
new('⑬ GPT-6から画像生成まで進める','1枚ずつ手動で進める初回向けの設定例','現行アプリv6.9.7・現行ソース・G')
box('最初は連続実行を使わない','全自動モードと連続ループ生成は有効にせず、各STEPを手動で進めます。「ON」と書かれたボタンが有効化の操作名になっている場合もあるため、ボタン名だけで動作中と判断しないでください。')
steps([('STEP1：人物・背景・小物の画像を読み込む','「キャラクター設定画像を選択（STEP1）」から自分の画像を選び、解析完了を待ちます。解析にもAPI料金が発生します。'),('STEP2：題材とシナリオモデルを選ぶ','「自由入力」へ描きたい内容を入れます。「OpenAIシナリオモデル」の初期選択は<b>GPT-6.1 Sol</b>です。必要に応じてAstraなどを選び、「シナリオ作成を実行（STEP2）」を押します。失敗時に下位モデルへ移る場合はログの最終採用モデルを確認します。'),('STEP3：画像用プロンプトを作る','シナリオを確認して「画像用の指示文（プロンプト）を構築する（STEP3）」を押し、完了を待ちます。'),('STEP4：品質とサイズを確認する','「API生成時の品質・サイズ」を開きます。「API画像生成の品質」を<b>GPT Image 2.5 Sunburst / max</b>にします。画像サイズは初回の確認なら<b>A4標準：1120×1584</b>を提案。既定はA4大：2240×3168です。'),('自動修正を外してから、1回だけ画像生成する','初回の課金を把握しやすくするため、「最大3回修正する（初回込み最大4枚）」のチェックを外します。そのうえで<b>「APIで新しい画像を生成する（STEP4）」</b>を押し、完了を待ちます。')])
box('生成完了の確認と保存','アプリ内に画像が表示され、画像生成ログのモデルが<b>GPT Image 2.5 Sunburst</b>等になっていることを確認します。2.0で成功しただけでは、2.5の利用確認にはなりません。出来上がった画像は保存します。')
p('初回接続で2.5 Sunburstが利用可能と判定されない場合、2.0 / highが初期選択されます。⑧⑨を確認して2.5を選び直してください。GPT-6はシナリオ用、GPT Image 2.5は描画用です。1枚の漫画でも解析・検査など複数のAPI処理が課金されます。','small')

# 18
new('止まったときの確認表','同じボタンを連打する前に、表示された原因を確認','B・D・E・F・G・I・現行アプリ')
table([['症状・表示','確認と次の操作'],['Billingが見つからない','6ページの直リンク、またはSettings → Organization settings → Billing。組織とOwner権限も確認。'],['クレジットが反映されない','同じ組織へ購入したか確認し、数分待つ。購入成功の表示がなければ、重複購入する前にBillingを確認。'],['401／invalid_api_key','秘密キーの全文・前後の空白・失効・有効期限を確認。省略キーやProject IDでは接続できません。'],['403／permission denied','Projectの許可モデル、キー権限、本人確認、組織やProjectの所属を確認。入金だけでは解決しません。'],['organization must be verified','10・11ページ。正しい組織の本人確認と承認の反映を確認。承認時間の保証はありません。'],['model_not_found／モデル利用不可','モデル名・利用権限を確認。GPT-6 Astraと画像モデルは別に確認。現在の契約・審査で使えない可能性もあります。'],['429／残高・月額上限のエラー','credit_balance_exhaustedは残高。project／organization_spend_limit_exceededは利用上限。レート制限とは別です。'],['429／rate limit','短時間の回数・トークン制限。表示された待機時間を守る。入金の繰り返しでは直らない場合があります。'],['接続はできたが画像が出ない','⑧⑨の確認、STEP4のモデル、エラー文を確認。モデル一覧の取得成功は描画成功の証明ではありません。'],['再読込後に未接続','このアプリのメモリー保持によるものです。保管したキーを再入力。制作途中の再読込は避けます。']])
p('解決しない場合は、操作番号・発生日時・モデル名・エラー文を控えて公式サポートへ。APIキー、本人確認書類、カード情報は公開しないでください。画面写真を共有するときは、個人情報を復元できない形で除きます。','small')
link('OpenAI公式ヘルプ','https://help.openai.com/')

# 19
new('迷ったら使う直リンク集','PDFではリンクをクリックできます / 紙ではアドレスを入力')
links=[('① ChatGPTの登録・ログイン入口','https://chatgpt.com/'),('② OpenAI Platform','https://platform.openai.com/'),('② Platformから直接新規登録する場合','https://platform.openai.com/signup'),('③ 組織のProject一覧','https://platform.openai.com/settings/organization/projects'),('④⑥ APIのBilling概要','https://platform.openai.com/settings/organization/billing/overview'),('④ 公式ヘルプが案内するBilling入口','https://platform.openai.com/account/billing'),('⑤ 支払い方法','https://platform.openai.com/settings/organization/billing/payment-methods'),('⑦ 組織の利用上限','https://platform.openai.com/settings/organization/limits'),('⑧ 本人確認のある組織設定','https://platform.openai.com/settings/organization/general'),('⑩⑪ APIキー作成・管理','https://platform.openai.com/api-keys'),('⑫ 漫画アプリ','https://furuyan1234.github.io/nano-banana-pro/'),('利用後のAPI使用状況','https://platform.openai.com/usage')]
for label,url in links:link(label,url)
p('リンク先はログイン状態・権限により初回設定へ戻る場合があります。正しい組織を選んでから進めてください。Project固有のURLに入るIDは人ごとに異なるため、この資料には書いていません。','small')

# 20
new('公式出典・この資料の範囲','v6.9.7の操作とAPI設定をまとめたガイド')
p('実画面はProject作成、組織側のBillingメニュー、Billingのタブと操作、カード追加の空欄、キー作成フォーム、アプリの接続表示を掲載しています。初回専用の画面はアカウントの状態によって異なります。','small')
p('新規登録・支払い・本人確認・キー発行の説明は公式情報に基づきます。ご自身のアカウントに表示された条件を確認して進めてください。各利用者での認証・利用可否を保証するものではありません。','small')
sources=[
 ('A 共通アカウント','https://help.openai.com/en/articles/7242619'),
 ('B ChatGPTとAPIの別請求','https://help.openai.com/en/articles/9039756'),
 ('C Project・権限の管理','https://help.openai.com/en/articles/9186755'),
 ('D 前払い・自動チャージ','https://help.openai.com/en/articles/8264644'),
 ('E 利用額の通知と強制上限','https://developers.openai.com/api/docs/guides/spend-limits'),
 ('F API Organization Verification','https://help.openai.com/en/articles/10910291'),
 ('G GPT Image生成と認証','https://developers.openai.com/api/docs/guides/image-generation'),
 ('H 初回APIキーの電話確認','https://help.openai.com/en/articles/8983040'),
 ('I Platformログイン','https://help.openai.com/en/articles/6613629'),
 ('J ChatGPTログイン','https://help.openai.com/en/articles/7426629'),
 ('K APIキーの権限','https://help.openai.com/en/articles/8867743'),
 ('L GPT-6 Astra','https://developers.openai.com/api/docs/models/gpt-6-astra'),
 ('M GPT Image 2.5 Sunburst','https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst'),
]
for label,url in sources:
 p(f'<b>{escape(label)}</b>　<link href="{url}" color="#087f80">{escape(url)}</link>','small',gap=7)
p('入力例のmanga-app／Personal manga、初回5～10米ドル、30日のキー期限、初回の小さい画像サイズ・自動修正OFFは本資料の説明例・提案です。OpenAIの必須条件とは区別しています。','small')
new('画像枚数と登場人物の人数','STEP1で確認する上限と資料の選び方')
p('STEP1の解析中は進捗窓までを表示します。認識結果とコピーは完了後に表示し、未解析の素材はコピーできません。狭い画面でも見本画像は素材欄の幅に収まります。','small')
box('アプリの共通上限','人物・表情集・三面図・通常背景・小物を合わせて14枚まで。360°背景ONではその他の素材10枚＋元の360°背景1枚、合計11枚までです。Gemini API用に背景切り出し4枚の枠を確保します。通常背景だけなら4枚の予約枠は使いません。作風JSONは数えません。')
p('STEP1に枚数と残り枠を表示します。超過する追加全体を解析APIの呼び出し前に拒否し、既存の画像・作風・背景を保持します。背景をONにして10枚を超える場合も切り替えを拒否します。不要な資料を減らして選び直してください。画像データが同一の重複は1枚です。')
box('画像枚数と人数は別','1枚に複数人が載っていても画像入力は1枚です。アプリは人数による固定上限で処理を拒否しません。ただし多人数や情報が密集したシートでは、人物の混同・欠落・描き分け・台詞対応の誤りが起こり得ます。枚数上限内でも、全員の正確な生成を保証しません。')
new('素材の使い方とWebへの添付順','STEP1の表示順・STEP2の自由入力')
p('右フッターは画像生成エンジン名とシナリオモデル名を併記します。例：ChatGPT Images 2.5 / GPT-6.1 Sol / FURU AI 4-koma v6.9.7。画像モデルの選択をAPI・Webコピー用の表記へ反映します。生成済み画像は書き換えません。')
p('2D背景と360°背景が両方ある場合、未指定の舞台は360°背景を基準にします。自由入力の素材・コマ別指定を優先し、2D背景も場面に合う範囲で使います。添付順は画像番号との対応づけのためで、背景の使用優先度を決めるものではありません。')
p('STEP2の自由入力では、素材名や現在の画像番号で採用・除外、持ち主、動作・状態を指定できます。AIが主な希望と明確な禁止を守り、曖昧・矛盾する要望をできる範囲で成立する場面へ整理し、未指定部分を調整します。全要望の実現は保証しません。')
p('「素材画像を選択」ボタン、またはSTEP1の枠内全体へのドロップで追加します。認識結果欄に人物・背景・小物をまとめて表示し、編集・コピーできます。AIが種類、同じ人物、関係、使いどころを判断し、シナリオとAPI／Webの描画指示へ極力反映します。表情集・三面図は同一人物にまとめます。認識できない場合や取り違える場合、今回のまんがには使用しない場合もあります。素材全点の登場や完全再現は保証しません。ChatGPTやGeminiのWeb版で生成するときは、STEP1で読み込んだ素材画像をもう一度添付します。順番はSTEP1に現在表示されている「1、2、3…」の番号順です。360°背景は途中で追加しても最後に表示され、通常素材を後から追加すると最後へ繰り下がり、番号も更新されます。投入した順番ではなく、現在の表示番号に合わせて添付してください。API画像生成ではアプリが対応づけて送信するので、並べ直しや再添付は不要です。')
p('公式仕様（2026-10-09確認）：OpenAI画像編集は背景・修正元を含め最大16枚、gemini-nano-banana-2.1は参照画像最大14枚です。アプリの共通上限とは区別してください。','small')
link('OpenAI公式：画像編集の入力仕様','https://developers.openai.com/api/reference/resources/images/methods/edit')
link('Google公式：画像モデルの参照画像仕様','https://ai.google.dev/gemini-api/docs/models/gemini-nano-banana-2.1')
end();c.save()
(BASE/'source'/'guide-text.txt').write_text('\n'.join(transcript),encoding='utf-8')
(BASE/'source'/'layout-check.json').write_text(json.dumps({'pages':page,'layout':checks,'date':'2026-10-09'},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'CREATED {OUT} pages={page}')

# Reuse the shared manual gate: render every page and reject stale versions,
# private identifiers, broken dimensions and text outside the page.
from build_manuals import verify_and_render
report=verify_and_render(OUT,[dict(page=item["page"],bottom_y=item["bottom_content_y"]) for item in checks],[None]*page)
(BASE/"source"/"openai-guide-qa.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
