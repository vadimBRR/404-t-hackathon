import difflib
import re


class DiffText:
    def __init__(self, file1, file2, output_file):
        self.file1 = file1
        self.file2 = file2
        self.output_file = output_file

    def _highlight_changed_text(self) -> str:
        try:
            with open(self.file1, 'r', encoding='utf-8') as file1, open(self.file2, 'r', encoding='utf-8') as file2:
                file1_lines = file1.readlines()
                file2_lines = file2.readlines()

            diff = difflib.ndiff(file1_lines, file2_lines)

            diff_output = []

            for line in diff:
                if line.startswith(' '):
                    diff_output.append(line[2:])
                # elif line.startswith('-'):  # Line removed
                #     diff_output.append(f"- {line[2:]}")
                elif line.startswith('+'):
                    diff_output.append(f"+++ {line[2:]} +++")

            return ''.join(diff_output)

        except FileNotFoundError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")

    def single_line_text(self) -> str:
        diff_text = self._highlight_changed_text()
        return re.sub(r'\s+', ' ', diff_text).strip()
