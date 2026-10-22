import unittest
from pathlib import Path
from pypdf import PdfReader
from build_manuals import validate_manual_scope

class ManualScopeTests(unittest.TestCase):
    def test_api_setup_and_model_access_are_allowed(self):
        for provider in ['gemini','openai']:
            validate_manual_scope(provider+'-api-beginner-guide.pdf','APIキーの取得、課金、権限、gpt-image-2.5-sunburstの利用可否、接続確認。')

    def test_application_operations_are_rejected_in_both_api_guides(self):
        for provider in ['gemini','openai']:
            for operation in ['STEP3','タイトルを表示','画像枚数','コマ修正','全自動','画風']:
                with self.subTest(provider=provider,operation=operation), self.assertRaises(AssertionError):
                    validate_manual_scope(provider+'-api-beginner-guide.pdf','APIキー・課金・接続確認。'+operation)

    def test_full_manual_keeps_application_operations(self):
        validate_manual_scope('full-manual.pdf','タイトルを表示 STEP1 STEP2 STEP3 STEP4 コマごと 全自動 制作情報')
        with self.assertRaises(AssertionError):
            validate_manual_scope('full-manual.pdf','APIキー取得と接続だけ。')

    def test_current_three_pdf_contents_obey_their_roles(self):
        root=Path(__file__).resolve().parents[2]
        for path in sorted((root/'public/downloads').glob('*.pdf')):
            with self.subTest(path=path.name):
                validate_manual_scope(path.name,'\n'.join(page.extract_text() for page in PdfReader(path).pages))

if __name__=='__main__':unittest.main()
