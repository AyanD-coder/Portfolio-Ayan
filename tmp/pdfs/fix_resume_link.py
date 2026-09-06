from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject


source = Path("public/ayan-dutta-cv-2026.pdf")
output = Path("tmp/pdfs/ayan-dutta-cv-2026.updated.pdf")

reader = PdfReader(source)
writer = PdfWriter()
writer.clone_document_from_reader(reader)

changed = 0
for page in writer.pages:
    for annotation_ref in page.get("/Annots", []):
        annotation = annotation_ref.get_object()
        action = annotation.get("/A")
        if action and action.get("/URI") == "mailto:ayandutta@gmail.com":
            action[NameObject("/URI")] = TextStringObject(
                "mailto:ad.ayandutta@gmail.com"
            )
            changed += 1

metadata = dict(reader.metadata or {})
metadata.update(
    {
        "/Title": "Ayan Dutta - Software Engineer Resume",
        "/Author": "Ayan Dutta",
        "/Subject": "Full-stack software engineer resume and project experience",
        "/Keywords": (
            "Ayan Dutta, software engineer, full-stack developer, React, Node.js, "
            "Python, PostgreSQL"
        ),
    }
)
writer.add_metadata(metadata)

with output.open("wb") as handle:
    writer.write(handle)

print(
    {
        "annotations_updated": changed,
        "output": str(output),
        "bytes": output.stat().st_size,
    }
)

if changed != 1:
    raise SystemExit("Expected exactly one email annotation to be updated")
