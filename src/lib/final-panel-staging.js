export const SCENARIO_EXPRESSIVE_STAGING_CONTRACT = `【漫画の表現優先】
- 美しく、見やすく、楽しく、人物が生きて見える漫画を最優先する。説明を並べるだけにせず、感情・関係・帰結を読める視覚的な見せ場にする。
- 通常の演技は漫画としてオーバー目に設計する。重心の移動、全身の動勢、明瞭なシルエット、表情の強弱、主役と反応役の対比を具体的に描く。台本で指定された静止・真顔・沈黙は対比として生かす。
- 目の高さの平凡な対面図を既定にしない。カメラの高低、傾き、距離、奥行きと画面内の大小差で視線誘導を設計する。明示されたカメラ・反復構図は守る。
- 画風は描線・顔の面構成・陰影・材質でも違いを読ませる。自動のちび化はカメラ・身体演技・表情より下位とし、それらが弱まるなら変形を控えるか別の画風を選ぶ。ユーザーの明示的な頭身・画風指定は保持する。
- 各コマは動作の意味が伝わる一瞬を選び、カメラから見える身体の向き、支持、接触、小道具の面を整理する。背面は後頭部の傾き・肩・重心で演じ、顔を見せるための横顔化・振り向きを追加しない。明示された振り向き・横顔は保持する。頭や身体に固定された付属品も同じ回転・投影に従い、見える表・裏・側面を揃える。動線だけで動作を代用せず、手順を同時に詰め込まない。画面・紙の表は実際の使用者へ向け、読者への見せやすさのために反転しない。
- 人物は同じ時間と空間を生きている。前コマからの位置・動作・小道具の状態を引き継ぎ、働きかけ→受け手の反応→次の行動が読めるようにする。共通の注視や意図的な静止は保ち、反応を全員に複製しない。
- 顔・手・台詞へ読者の視線を導く余白を取り、人物と背後の明暗・色温度・輪郭の差で演技を浮かび上がらせる。背景の奥行き・材質・光源は残し、白く消して分離を代用しない。
- 強化では選択された編集カテゴリ内に限って適用し、事実・台詞・人物・結末・指定画風は変えない。これは生成時の演出目標であり、動作数・派手さのノルマや軽微な差による再生成条件ではない。`;

export const FINAL_PANEL_ACTIVE_STAGING_SCENARIO_CONTRACT = `【4コマ目の演出】
- 4コマ目は、人物の行動・反応・間・構図のいずれかで、話の帰結を絵として読めるようにする。
- 群像を描く場合は、各人物の役割が話に合うように配置する。無意味な横一列の集合写真や、同じポーズの反復を既定にしない。
- 静止や沈黙がオチ、余韻、緊張に効く場合は保つ。脇役全員に手の動作を追加したり、画面を過密にしたりしない。
- 前景・中景・後景、表情、手、小道具は、必要なものを読み取れるように整理する。`;

export const FINAL_PANEL_ACTIVE_STAGING_IMAGE_LOCK = `FINAL-PANEL STORY STAGING: vivid scripted payoff through decisive action, individual reactions, depth/silhouette/scale contrast. Show movement in actual poses/space, not speed lines around a group portrait. Keep intentional stillness and silence, including deadpan, without flattening surrounding action. Do not invent extra hand actions or crowding to occupy every actor. Preserve cast/camera/dialogue/focal action.`;
