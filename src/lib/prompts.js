import { getPunchlineLabel } from './constants';

// --- プロンプトテンプレート (prompts.js) ---
// App.jsx から抽出された大規模プロンプト文字列テンプレート群
// 各STEP用のAIプロンプトをここに集約し、App.jsx の行数を削減する

/**
 * STEP1: キャラクター解析プロンプト
 * キャラクターシート画像からキャラクターの特徴を超精密に解析するプロンプト
 * @returns {string} Gemini/OpenAI API用のプロンプト文字列
 */
export const getCharacterAnalysisPrompt = () => {
  return `
        /* SYSTEM: ABSOLUTE CONTEXT RESET. FORGET ALL PREVIOUS CHARACTERS. */
        /* TARGET: Analyze ALL currently uploaded images. Do not recall past sessions. */
        
        あなたはプロの漫画家兼キャラクターデザイナー（解析特化）です。
        以下の「絶対厳守ルール」に従い、現在の全ての画像を解析してください。

        【0. 画像スタイル判定 (Style Detection)】
        ・**最初に必ず「STYLE_TAG: MONOCHROME」または「STYLE_TAG: COLOR」と出力せよ。**

        【1. キャラクター数と同一性の完全一致 (Count & Identity)】
        ・画像内の**「固有名を持つキャラ」**を全てリストアップせよ。入力画像が複数ある場合、**全ての画像を確認し、全キャラクターを抽出せよ**。絶対に1人で止まるな。
        ・**名前らしくないものは名前ではない**。人物名または人物を指すラベルとして成立していないOCR文字列（タイトル、作品名、シリーズ名、年号、比較ラベル、ロゴ、看板・車両・背景の文字など）をキャラクター名として使うな。
        ・キャラクター本人の名前が書かれていない場合は、人物以外の文字を名前に流用せず、見た目と役割から**仮の人物名**を付けて分けよ。仮名でもよいので、見えている人物ごとに必ず別の ## セクションを作ること。
        ・1つの ## セクション内に男性タグと女性タグ、黒髪タグと金髪タグ、メガネありタグとメガネなしタグを混在させるな。複数人物が見える場合は人物ごとに分割して解析せよ。

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
        ・見出し ## n. ... は人物名または仮人物名だけにすること。人物ではないOCR文字列や補足用の見出しを ## 見出しにしないこと。
        ・備考が必要な場合でも ## # 備考 のようなキャラクター扱いされる見出しは使わず、人物セクション内の通常文で短く補足すること。
        
        ## 1. [OCRで読み取った正確な名前]

        | カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |
        | :--- | :--- | :--- |
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** （※眼鏡無しなら **(no glasses:1.5)** を絶対付与） |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (formal outfit:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | **[WEIGHTS]: (cheerful:1.3), (energetic:1.2)** （※英語の性格タグを必須で記述） |
      `;
};

/**
 * シナリオ強化プロンプトのガードルール部分
 * @param {string} scenario - 元のシナリオテキスト
 * @param {string[]} enhanceCategories - 強化カテゴリの配列
 * @returns {string} 強化プロンプト
 */
export const getScenarioEnhancePrompt = (scenario, enhanceCategories, styleJson) => {
  return `あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${enhanceCategories.join("\n\n")}

${styleJson ? `【作風完全上書き指令 (Style Override)】
以下の「作風情報」を最優先事項として適用し、シナリオ全体のトーン、セリフの語彙、空気感を根本的に改変せよ:
- 作風名: ${styleJson.style_name}
- 作風詳細指示:
${styleJson.reproduction_prompt}
${styleJson.anti_patterns ? `- 絶対禁止事項:\n${styleJson.anti_patterns}` : ''}` : ''}

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
${scenario}

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
   - 確信度が 80 未満の項目がある場合、演出描写を自己修正（再検証）した上で最終結論を出力せよ。`;
};

/**
 * STEP2: シナリオ生成プロンプト
 * 指定された日付、カテゴリ、入力モードなどに基づいて4コマ漫画のシナリオを生成する
 */
export const getScenarioPrompt = ({
  randomCategory,
  targetDate,
  inputMode,
  manualTopic,
  newsContext,
  searchTopicKeywords,
  bg360Image,
  bg360Analysis,
  bg360Enabled,
  customLocation,
  customOutfit,
  ragLocationDetails,
  ragReactions,
  punchlineType,
  comedyTone,
  styleJson
}) => {
  return `
         【Context Force Reboot】
         Ignore all previous instructions and conversation history. This is a fresh, standalone session.
         (ABSOLUTE PROHIBITION: Repeating topics from the past. You MUST select a FRESH, UNIQUE topic).
         (Topic Lock): Focus strictly on the category: "${randomCategory}".
         (Time Machine Lock): The target date is **${targetDate}**. You MUST search for news/events that happened AROUND this date.
         (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

         あなたはプロの風刺漫画脚本家です。
         
         ${inputMode === 'manual'
           ? `「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。\n トピック: ${manualTopic}\n\n${newsContext}`
           : `「${searchTopicKeywords}」に関する、** 指定された日付（${targetDate}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`
         }

         【選定ルールの絶対厳守】

         1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
         2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
            （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
         3. 抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
         4. **【場所（Location）の選定義務】**:
            - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
            - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
        
        ${bg360Image && bg360Analysis && bg360Enabled ? `
        4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
            - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
            - AI解析結果: 場所=「${bg360Analysis.location}」、光源=「${bg360Analysis.lighting}」、特徴物=「${bg360Analysis.objects || 'なし'}」、雰囲気=「${bg360Analysis.mood || '不明'}」
            - **【カメラワーク・フロアプラン制約】**:
              * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
              * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
            - **【ライティング整合性】**:
              * 各コマ of キャラクター描写において、光源方向「${bg360Analysis.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
            - **【背景の部分使用の許可】**:
              * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
              * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
        ` : ''}
        4. **【強制舞台指定 (Location Lock)】**:
           - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
           - **指定場所: 「${bg360Image && bg360Analysis && bg360Enabled ? bg360Analysis.location : (customLocation.trim() ? customLocation.trim() : "ニュース内容に即した場所")}」**
           - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
           ${customOutfit.trim() ? `
        5. **【強制服装指定 (Outfit Lock)】**:
           - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${customOutfit.trim()}』に変更して描写・行動させよ。
           - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
           ` : `
        5. **【服装の自動選定 (Outfit Auto-Select)】**:
           - ニュースの内容と場所(Location)に**「最も適した服装カテゴリー」**を選定し、Outfit行に出力せよ。
           - **「キャラシート準拠」「デフォルト」等の曖昧な回答は禁止。** 必ず状況に適した服装の「属性」を出力すること。
           - 例: 海辺→「水着（swimwear）」、法廷→「ビジネススーツ（business suit）」、道の駅→「私服（casual wear）」、雪山→「防寒着（winter clothes）」、宇宙→「宇宙服（spacesuit）」
           - **⚠️【重要: クローン化防止】⚠️** 「白のビキニ」「デニムショートパンツ」のように細かく指定しすぎないこと。細かく指定すると全キャラクターが全く同じ服を着てしまうため、必ず**大分類のカテゴリー（ナース服、私服、パジャマなど）**に留め、個々の着こなしは画像AIに委ねよ。
           - 画像生成プロンプトでも選定した服装タグが反映される前提で、シナリオ内のト書き(Action)テキストにもその服装に基づく自然な描写を含めること。
           `}

         6. **【環境・リアクションのディテール構築 (Structural Directives)】**:
            以下のガイドラインを参照し、指定された場所の小道具や環境、キャラクターのリアクションを、**シナリオのト書き(Action)として構造的かつ文脈に沿って描写**せよ。AI特有の抽象的な表現は禁止する。
            
            ${ragLocationDetails}
            
            ${ragReactions}

${styleJson ? `         7. **【作風完全適用の義務 (Strict Style Adherence)】**:
            以下の「作風プロンプト」を最優先事項としてシナリオ全体のトーン、セリフ、空気感に完全に適用せよ。
            - 作風名: ${styleJson.style_name}
            - 作風詳細指示:
${styleJson.reproduction_prompt}
${styleJson.anti_patterns ? `            - 絶対禁止事項:\n${styleJson.anti_patterns}` : ''}
            (指示): この作風特有の語彙、リズム、テーマ性を全コマに浸透させよ。` : ''}

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
             - ${punchlineType === 'Auto' ? `**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
                * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
                * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: NORMAL（通常の真顔・呆れ・点目）、CHIBI_GAG（ちび呆れ）。⚠️BLANK（白目）は安易に乱用せず、真顔や呆れ顔とバランスよく選択せよ）
                * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
                * **メタ崩壊型**: 漫画 of 枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止）
                * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
                * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
                * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: SAD, SHADOW, CHIBI_GAG。⚠️BLANKは乱用禁止）
                * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
                * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: CHIBI_GAG, NORMAL。⚠️BLANKは乱用禁止）
                * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止）` : 
                punchlineType === 'Surreal' ? `**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: NORMAL（通常の真顔・呆れ顔・点目など）, CHIBI_GAG（ちびキャラでの呆れ・困惑）。⚠️BLANKは乱用せず、呆れや真顔とバランスよく選択せよ。` :
                punchlineType === 'Explosion' ? `**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG` :
                punchlineType === 'FakeEmotion' ? `**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。` :
                punchlineType === 'Metafiction' ? `**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。` :
                punchlineType === 'Unreasonable' ? `**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。` :
                punchlineType === 'RunningGag' ? `**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。` :
                punchlineType === 'Dream' ? `**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: SAD, SHADOW, CHIBI_GAG（ズッコケ）。⚠️BLANKは乱用を避け、目覚めた後のリアクションはNORMAL等も検討せよ。` :
                punchlineType === 'PsychoHorror' ? `**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME` :
                punchlineType === 'Misunderstanding' ? `**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: CHIBI_GAG, NORMAL。⚠️BLANKは乱用せず、呆れや真顔とバランスよく選択せよ。` :
                punchlineType === 'CanceledEnding' ? `**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: IMPACT, NORMAL。⚠️BLANKは乱用禁止。` :
                punchlineType === 'Documentary' ? `**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
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
                **【禁止事項】**: 舞台を元ネタと無関係な場所（宇宙、異世界、RPGなど）に移すこと。元ネタに登場しない架空の出来事を捏造すること。ニュースの内容を「たとえ話」にすり替えること。` : ''}
              - **【ギャグのトーンバリエーション】**: 毎回同じテンションにならないよう、以下3系統のトーンをネタに合わせて使い分けよ:
                * **ハイテンション爆発系**: 叫び・暴走・カオス。勢いで押し切る
                * **シュール静寂系**: 淡々とした狂気。ボケているのに本人は真顔。不気味な静けさが笑いになる
                * **知性派ブラック系**: 皮肉・風刺・ダブルミーニング。「よく考えたら怖い」タイプの笑い
              - **【強制コメディトーン指定: ${
                comedyTone === 'HighTension' ? 'ハイテンション爆発系' :
                comedyTone === 'SurrealQuiet' ? 'シュール静寂系' :
                comedyTone === 'IntellectualBlack' ? '知性派ブラック系' : '自動'
              }】**:
                ${
                  comedyTone === 'HighTension' ? `今回は「ハイテンション爆発系」のトーンを徹底せよ。キャラクターは激しく叫び、オーバーリアクションをし、物理的または感情的に限界突破して暴走すること。ツッコミは烈火のごとく激しく、ボケは常軌を逸したハイテンションで行うこと。セリフの文末には「！」や「！？」を多用し、勢いを最大化せよ。推奨される感情絵柄タグ: IMPACT, CHIBI_GAG` :
                  comedyTone === 'SurrealQuiet' ? `今回は「シュール静寂系」のトーンを徹底せよ。狂った状況やボケに対して、キャラクターはあえて無表情、淡々とした態度、または真顔でリアクションすること。嵐の後のような静けさ、噛み合わない静かな狂気、奇妙な「間」を演出し、台詞も短く淡々としたものにせよ。大騒ぎせず、シュールな静寂で笑いを誘え。推奨される感情絵柄タグ: NORMAL（真顔・呆れ顔・点目など）, CHIBI_GAG, SHADOW。⚠️BLANKは乱用せず、真顔や呆れ顔とバランスよく選択せよ。` :
                  comedyTone === 'IntellectualBlack' ? `今回は「知性派ブラック系」のトーンを徹底せよ。現代社会の風刺、ブラックユーア、痛烈な皮肉、ダブルミーニング（裏の意味）を散りばめること。表面的には普通に見えても「よく考えると恐ろしい事実や狂気」が浮かび上がるように構成せよ。キャラクターは冷ややかに、あるいは皮肉たっぷりに会話を交わすこと。推奨される感情絵柄タグ: DARK_ANIME, GEKIGA, SHADOW` :
                  `ネタに合わせて最適なコメディトーン（ハイテンション爆発系、シュール静寂系、知性派ブラック系）を自律的に選択し、そのトーンに徹せよ。`
                }
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

          6. **【カメラ演出タグ (Camera Direction Tag) — 極限物理描写 & シネマティック構図 v4.5】**:
             - 各コマの冒頭に [Camera: XXX] タグを**必ず1つ**付与せよ。
             - シーンの文脈（アクションか、エモーショナルか）に応じて、**【A. アクション向け極限カメラ】** または **【B. シネマティック構図10選】** のいずれかから最適なものを1つ選べ。
             
             **【A. アクション向け極限カメラ（歪み重視）】**: 激しい動き、狂気、ギャグの爆発シーンに使用。
             - 選択肢: 俯瞰/バードアイ、ローアングル/アオリ、ダッチアングル、超広角/フィッシュアイ、望遠圧縮、ワームズアイ、ドローン俯瞰、パンニング/追跡ショット
             - 物理描写の書き方（全コマ必須）: 「カメラがどこにあり」「何が巨大に見え」「何が歪み」「光がどう当たるか」を具体的に書け。
                * 例（ローアングル）: 「膝の高さから見上げ、キャラの全身がそびえ立つ巨人のように見え、背後の天井や空が大きく広がる。逆光が後ろから吹き荒れる」
             
             **【B. シネマティック構図10選（美しさ・感情重視）】**: 歪ませず、プロの写真のような美しい構図で感情や空気を表現するシーンに使用。
             - 選択肢（この通りに英語名で書くこと）: 
                1. Epic Wide（壮大な背景・スケール感）
                2. Dominant Low（強者感・見下し・ヒロイック）
                3. Innocent High（あざと可愛い・上目遣い・弱さ）
                4. Hyper Perspective（臨場感マックス・パース強調）
                5. Aesthetic Thirds（黄金比の余白・プロの写真構図）
                6. Over The Shoulder（振り返り美人・肩越しの視線）
                7. Deep Emotion Close（瞳の奥の感情・顔のクローズアップ・背景ボケ）
                8. Cinematic Slant（シネマティックな傾き・緊張感・疾走感）
                9. Graceful Full Shot（美しい全身立ち絵・モデル体勢）
                10. Bokeh Depth（手前ボケの立体感・没入感）
             - 物理描写の書き方: 「どういう構図で」「光とボケがどう美しく演出しているか」を具体的に書け。
                * 例（Aesthetic Thirds）: 「画面の三分の一にキャラクターを配置し、豊かな余白が美しい空気感を生む。プロの写真のような計算された構図」
             
             - 【制約】4コマの中で**同じカメラを2回以上使うのは禁止**。必ず4種類の異なるカメラを選べ。⚠️ マクロ特写（目だけの超接写等）は使用禁止。


          【出力フォーマット（絶対厳守・会話禁止）】
          返答、挨拶、説明（「分かりました」「以下がシナリオです」等）は **一切出力しないこと**。
          以下の独自フォーマット **のみ** を出力してください。Markdownのコードブロックも不要です。

          Topic: [ニュースの見出し（15文字以内）]
          Logline: [誰が、何を求めて、どうなるかという1〜2行の強力なログライン（軸）。この軸から4コマ目まで絶対にブレないこと]
          Location: [${customLocation.trim() ? "必ず『" + customLocation.trim() + "』にせよ" : "ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
          Outfit: [${customOutfit.trim() ? "必ず『" + customOutfit.trim() + "』にせよ" : "場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
          Punchline: [${punchlineType !== 'Auto' ? "必ず『" + getPunchlineLabel(punchlineType) + "』と記載せよ" : "適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
          Scenario:
          [1コマ目: 起]
          [EMOTION: XXX]
          [Camera: XXX]
          状況: (視覚的な状況...)
          キャラ名「短いセリフ。」

          [2コマ目: 承]
          [EMOTION: XXX]
          [Camera: XXX]
          状況: (視覚的な状況...)
          キャラ名「短いセリフ。」

          [3コマ目: 転]
          [EMOTION: XXX]
          [Camera: XXX]
          状況: (視覚的な状況...)
          キャラ名「短いセリフ。」

          [4コマ目: 結]
          [EMOTION: XXX]
          [Camera: XXX]
          状況: (視覚的な状況...)
          キャラ名「短いセリフ。」

          シナリオ本文の要件:
          - 登場人物: ** 提供された CastList の全員 ** を使用してください。
          - 台詞必須: [1コマ目]〜[4コマ目]の全コマに、必ず最低1つの「キャラ名「セリフ。」」形式のセリフを入れること。
          - 台詞なし禁止: 「無言」「セリフなし」「台詞なし」「Characters interact without dialogue」のような無台詞指定は禁止。全コマで吹き出し用セリフを作ること。
          - 途中終了禁止: [4コマ目: 結]の状況とセリフまで完全に書き切ること。2コマ目や3コマ目で出力を終えてはならない。
          - (禁止事項): AIが勝ために架空のオリジナルキャラクターを独自に創作して出演させることは禁止する。指定されたCastListのキャラクターのみをメインキャストとして扱うこと。
          - (許可事項): ニュースの当事者（スポーツ選手、政治家、怪人、動物、虫など）や名もなきモブキャラは、物語を面白くするために必要であれば自由に登場・発言させて構わない。
          - (ハルシネーション防止): ゲストを登場させる場合でも、画像生成時のVisual Actionに「意味不明な文字」や「描画不可能な複雑すぎる行動」が混入しないよう、シンプルで視覚的にわかりやすい行動に留めること。
          - 構成: 起承転結（4段）。
          - 内容: ニュースに対する辛辣な風刺や、キャラの個性を活かしたドタバタ劇。
          - 文体: 各コマの「状況」「セリフ」が明確にわかる文章。

          ⚠️【最終確認・絶対厳守】⚠️
          [1コマ目] [2コマ目] [3コマ目] [4コマ目] がすべて存在し、各コマに最低1つの「」付きセリフがあるか出力前に確認せよ。
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
          `;
};


// --- ポリシー修正分析プロンプト (App.jsx -> externalized) ---
// Phase 1: 問題箇所の特定と置換テーブルの生成
export const getPolicyAnalysisPrompt = (policyErrorMsg, finalPrompt) => {
  return `あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。


以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${policyErrorMsg.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${finalPrompt}

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
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`;
};


// --- ポリシー修正フォールバックプロンプト (App.jsx -> externalized) ---
// 全文再生成方式（JSONパース失敗時の保険）
export const getPolicyFallbackPrompt = (policyErrorMsg, finalPrompt) => {
  return `あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

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
${policyErrorMsg.trim()}

【修正対象のプロンプト】:
${finalPrompt}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`;
};


// --- Manga Prompt Builder Functions (Phase 3-C: assemblePrompt -> externalized) ---
// ChatGPT / Gemini 用の巨大プロンプトテンプレートを App.jsx から分離

const FOUR_KOMA_SELF_AUDIT_BLOCK = `
FINAL SELF-AUDIT BEFORE DISPLAYING THE IMAGE (MANDATORY, INTERNAL ONLY):
- Inspect Panel 1, Panel 2, Panel 3, and Panel 4 one by one. Do not skip any panel.
- For EACH panel, compare the finished drawing against that panel's Action, camera/composition, character placement, cast limit, outfit, background, and Dialogue instructions.
- Every Speech Bubble listed in a panel's Dialogue line MUST appear in that same panel exactly once. No dialogue may be missing, moved to another panel, merged into a different speaker's bubble, or converted into narration/caption text.
- Every speech bubble tail MUST point to the correct speaker in that panel. If the speaker is centered, the bubble must stay near that centered speaker; do not push it to an unrelated edge or character.
- Every visible non-dialogue text element must be justified by the prompt: title, watermarks, explicit signage/label/screen/handwriting, or the listed Dialogue only. Remove any random labels, captions, SFX, floating letters, gutter text, or background text not explicitly requested.
- Check all drawn content, not only text: no extra characters, no missing required characters, no duplicated/cloned characters, no wrong outfit, no wrong glasses state, no character-sheet layout, no floating eye/face overlays, no merged panels, and no dirty gutters.
- If ANY panel fails this audit, redraw only the failing panel content internally and run the audit again before finalizing.
- Do not print this audit, checklist, JSON, explanations, or correction notes. Output only the finished manga image.
`;

/**
 * ChatGPT (gpt-image-2) 用の4コマ漫画プロンプトを構築する
 * @param {Object} p - パラメータオブジェクト
 */
export const buildChatGPTMangaPrompt = (p) => {
  const {
    safeTopic, watermarkEng, styleCore, safeLocation,
    bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels, enableChatGPTMode,
    VAR_CAST_LIST_CHATGPT, identityMatrix, activeOutfit,
    panelSections // 事前にビルドされた4パネル分のセクション文字列
  } = p;

  const bg360Block = (bg360Image && bg360Analysis && bg360Enabled) ? (
    (bg360CroppedPanels && bg360CroppedPanels.length === 4 && !enableChatGPTMode)
    ? `
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${bg360Analysis.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`
    : `
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${bg360Analysis.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`
  ) : '';

  const outfitRule = activeOutfit
    ? `- IGNORE reference clothing. All characters MUST wear exactly: ${activeOutfit}.`
    : '- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels.';

  return `🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${safeTopic}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads EXACTLY "${watermarkEng}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font. VERBATIM COPY — do NOT paraphrase or alter any word.
- Draw tiny Japanese watermark text that reads EXACTLY "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" positioned at the bottom-left corner of the 4th panel, in an extremely small font size to prevent overlapping with the right watermark. ⚠️ CRITICAL: The word "自律式" must appear EXACTLY as written. Do NOT replace it with topic-related words (e.g. do NOT write "高齢式" or any other variation). Copy the watermark string character-by-character.
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
- ${styleCore}
- Setting: ${safeLocation}
${bg360Block}

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
${outfitRule}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${VAR_CAST_LIST_CHATGPT}
- Identity Anchor: ${identityMatrix}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. If a character does NOT have glasses, they MUST NOT gain glasses in any panel. Preserve exact hair color, eye color, and skin tone in every panel.
- GLASSES VERIFICATION (MANDATORY): Before finalizing EACH panel, count the number of characters wearing glasses. Compare against the Identity Matrix above. If the count does not match, you have made an error — redraw the offending characters. Characters without glasses must have fully visible bare eyes with NO frames on their face.

TEXT RENDERING RULES:
- Only Dialogue entries may become white manga speech bubbles.
- ALL text inside speech bubbles MUST be vertical Japanese tategaki: characters flow top-to-bottom, columns ordered right-to-left. ZERO horizontal yokogaki text inside speech bubbles.
- If any speech bubble text would be horizontal, redraw that bubble as vertical text before finalizing. Horizontal speech-bubble text is a failure condition.
- Make speech bubbles tall/narrow enough for vertical Japanese columns while keeping the tails pointed at the correct speaker.
- DIALOGUE TEXT IS VERBATIM: The Japanese text inside each Speech Bubble MUST be copied EXACTLY as written in the Dialogue section — character by character, punctuation by punctuation. Do NOT paraphrase, rephrase, summarize, add words, remove words, or substitute synonyms. If the dialogue says "甘い" you MUST write "甘い", NOT "ないはずよ" or any other rewording.
- Action text is NOT visible lettering by default. Quoted ambience, SFX names, mood words, aura names, emotion labels, and narration terms must be illustrated through objects, lighting, motion, poses, and atmosphere only.
- Render Action words as physical scene text ONLY when Action explicitly asks for handwriting, finger-writing, air-writing, signage, board text, label text, printed text, or screen text. Do NOT wrap visual scene text in a speech bubble, caption box, narration box, or tail.
- Never move Action text into speech bubbles, captions, labels, or floating SFX. Keep any explicitly requested visual writing attached to the hand/object/surface that creates it.

PANEL DESCRIPTIONS:

${panelSections}

${FOUR_KOMA_SELF_AUDIT_BLOCK}

THINGS TO AVOID:
- No plastic-looking skin or digital over-sharpening on characters.
- No watermarks or logos other than the specified watermarks above.
- No random English text scattered across panels.
- No floating close-up eyes or ghostly face overlays in backgrounds.
- No character sheet layout, expression grid, or reference sheet appearance.
- No extra characters beyond those specified in each panel.
- No sparkling light particles, no glowing dust, no magical particles, no floating embers, no volumetric dust.
- No film grain, paper grain, canvas texture, or rough textures.
`;
};

/**
 * Gemini / Imagen 4 用の4コマ漫画プロンプトを構築する
 * @param {Object} p - パラメータオブジェクト
 */
export const buildGeminiMangaPrompt = (p) => {
  const {
    safeTopic, watermarkEng, styleCore, safeLocation,
    bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
    VAR_CAST_LIST, identityMatrix, activeOutfit,
    dynamicCamera, panelSections // 事前にビルドされた4パネル分のセクション文字列
  } = p;

  const bg360Block = (bg360Image && bg360Analysis && bg360Enabled) ? (
    (bg360CroppedPanels && bg360CroppedPanels.length === 4)
    ? `
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${bg360Analysis.lighting}), objects (${bg360Analysis.objects || 'various'}), and mood (${bg360Analysis.mood || 'contextual'}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`
    : `
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${bg360Analysis.lighting}), spatial layout, objects (${bg360Analysis.objects || 'various'}), and mood (${bg360Analysis.mood || 'contextual'}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`
  ) : '';

  const outfitSection = activeOutfit ? `
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.` : '';

  const outfitOverride = activeOutfit
    ? `OUTFIT OVERRIDE: All characters MUST wear exactly: ${activeOutfit}. Apply tags directly.`
    : '';

  return `[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${safeTopic}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${watermarkEng}" (clean sans-serif). VERBATIM COPY — do NOT paraphrase or alter any word.
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" (in an extremely small font size to prevent overlapping with the right watermark). ⚠️ CRITICAL: The word "自律式" must appear EXACTLY as written. Do NOT replace it with topic-related words. Copy character-by-character.
Watermarks standard horizontal. The Japanese watermark on the left and the English watermark on the right must be small enough and spaced apart so they do not touch or overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${styleCore}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${safeLocation}.
${bg360Block}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${outfitSection}
Cast:
${VAR_CAST_LIST}
${outfitOverride}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${identityMatrix}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.
GLASSES VERIFICATION (MANDATORY): Before finalizing EACH panel, count the number of characters wearing glasses. Compare against the Identity Matrix. If the count does not match, redraw. Characters without glasses must have fully visible bare eyes with NO frames.

Camera & Comp:
${dynamicCamera}
ANTI-CLONING: NEVER draw the same character twice in a single panel.
COMPOSITION: Strict 2:3 golden ratio inside each panel.

Tech Dict:
(clean anime illustration background: 2.5)
(Meticulous clean line art, smooth cel shading: 2.5)
(Soft diffused backlight, rim light: 2.4)
(Cinematic depth of field, soft bokeh: 2.3)
(chic cinematic color grading, elegant deep colors: 1.4)
(NO random text/SFX outside speech bubbles: 2.8)
(Action ambience words, SFX names, mood words, aura names, and emotion labels are NOT visible lettering: 2.8)
(EXCEPT explicit visual scene text requested by Action, such as handwriting, air-writing, signs, labels, printed text, screen text, or board text: 2.8)
(NO ENGLISH TEXT outside watermark. NO 'G-pen'/'HA': 3.0)


${panelSections}

${FOUR_KOMA_SELF_AUDIT_BLOCK}

Important constraints:
- Ensure the characters accurately reflect classic anime styles.
- Do NOT merge panels. Keep 4 distinct panels with white gutters between them.
- ABSOLUTELY NO TEXT OR SFX BETWEEN PANELS. The white gutters separating the panels MUST be completely clean and pure white. Do not draw any labels, narration, or sound effects crossing or sitting inside the panel boundaries.
- Do NOT write situation/narration explanations as text on the screen. The Visual Action must only be illustrated, except explicit visual scene text requested by the action, such as handwriting, air-writing, signs, labels, printed text, screen text, or board text.
- Only Dialogue entries may become white manga speech bubbles. Quoted ambience, SFX names, mood words, aura names, emotion labels, and narration terms in Visual Action are NOT visible text. Render quoted Action words as physical scene text ONLY when the action explicitly requests visible writing.
- Write the Japanese spoken text clearly inside white manga speech bubbles in a bold sans-serif Japanese font.
- DIALOGUE TEXT IS VERBATIM: The text inside each Speech Bubble MUST be copied EXACTLY as written in the Dialogue section — character by character. Do NOT paraphrase, rephrase, or substitute synonyms.
- Japanese dialogue MUST end with a period (。). However, do NOT add unnecessary commas (、) inside dialogue. Manga speech bubbles rarely use commas in natural Japanese — line breaks and bubble shape provide natural pauses instead. Only use commas when absolutely necessary to prevent misreading.
- TYPOGRAPHY RULE: Write Japanese text tightly with ZERO spaces between words. Do NOT insert any gaps or spaces between characters. (no letter spacing:1.5), (tight kerning:1.5).
- Do NOT add random English text except for the watermark.
- Maintain character consistency across all 4 panels.
- Flow is from top panel to bottom panel.
- Ensure the watermark is positioned at the absolute bottom edge of the image, with no extra whitespace below it. The text must be oriented horizontally (left-to-right).
- CRITICAL COMPOSITION BAN: Do NOT draw floating close-up eyes, partial face crops, or ghostly face overlays in the background of any panel. Every character must be drawn as a complete physical presence within the scene. No "dramatic eye insert" or "background eye close-up" compositions allowed.
      `;
};
