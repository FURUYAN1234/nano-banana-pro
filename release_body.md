## 🚀 v3.09-alpha: API Parameter HotFix

### 🚑 HotFix / 緊急修正

*   **[HotFix]** OpenAI `gpt-image-2` モデルへの移行に伴い、画像生成時に 400 Bad Request（`Unknown parameter: 'response_format'`）が発生してAI安全基準エラーと誤認されるバグを修正しました。新仕様に合わせて無効なパラメータを削除しました。 / Fixed a 400 Bad Request error occurring during image generation with the new `gpt-image-2` model by removing deprecated parameters (`response_format`, `style`), which were previously misidentified as a safety/NSFW policy violation.
