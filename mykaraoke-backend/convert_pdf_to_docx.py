import sys
import os
from pdf2docx import Converter

pdf_path = sys.argv[1]

output_path = os.path.splitext(pdf_path)[0] + ".docx"

converter = Converter(pdf_path)
converter.convert(output_path)
converter.close()

print("Conversion completed")
